import { useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CalendarRange,
  CheckCircle2,
  Clock3,
  Copy,
  FolderKanban,
  MoreHorizontal,
  Pencil,
  Ticket,
  UserPlus,
  Users,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { LucideProps } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { RequireRole } from "@/components/guard";
import {
  DataTableActions,
  DataTableIconButton,
  EntityCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { EmptyState, ProjectStatusBadge, StatusBadge, TableSkeleton, UserAvatar } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";
import { describeProjectActivity } from "@/lib/project-activity";
import { fetchProject, fetchProjectActivities, fetchProjectMembers } from "@/lib/projects";
import { fetchTicketsPage } from "@/lib/tickets";
import { formatDate, relativeTime } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { TicketStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/projects/$projectId/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Project Overview — Helpdesk Admin" },
      { name: "description", content: "Project overview with stats, team members and activity timeline." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff", "Client"]}>
      <ProjectDetailPage />
    </RequireRole>
  ),
});

const chartColors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-4)", "var(--color-chart-3)"];

function OverviewStatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: ComponentType<LucideProps>;
  tone?: "default" | "primary" | "success" | "warning";
}) {
  const toneClass = {
    default: "bg-slate-100 text-slate-600",
    primary: "bg-violet-100 text-violet-600",
    success: "bg-emerald-100 text-emerald-600",
    warning: "bg-amber-100 text-amber-600",
  }[tone];

  return (
    <div className="rounded-md border border-border/60 bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{value}</p>
          {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        <span className={cn("grid size-9 shrink-0 place-items-center rounded-md", toneClass)}>
          <Icon className="size-4" />
        </span>
      </div>
    </div>
  );
}

function PanelCard({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("overflow-hidden rounded-md border border-border/60 bg-card shadow-sm", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          {description ? <p className="mt-0.5 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

function groupTicketStatuses(items: { status: TicketStatus }[]) {
  const groups = {
    Open: 0,
    "In Progress": 0,
    "On Hold": 0,
    Completed: 0,
  };

  for (const ticket of items) {
    if (ticket.status === "In Progress") {
      groups["In Progress"] += 1;
    } else if (ticket.status === "Resolved" || ticket.status === "Closed") {
      groups.Completed += 1;
    } else if (ticket.status === "Cancelled") {
      groups["On Hold"] += 1;
    } else {
      groups.Open += 1;
    }
  }

  return Object.entries(groups).map(([name, value]) => ({ name, value }));
}

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const { user } = useAuth();
  const canEdit = user?.role === "Admin" || user?.role === "Staff";

  const projectQuery = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProject(projectId),
  });

  const membersQuery = useQuery({
    queryKey: ["project-members", projectId, { preview: true }],
    queryFn: () => fetchProjectMembers(projectId, { page: 1, limit: 10 }),
    enabled: !!projectQuery.data,
  });

  const activitiesQuery = useQuery({
    queryKey: ["project-activities", projectId],
    queryFn: () => fetchProjectActivities(projectId, { page: 1, limit: 10 }),
    enabled: !!projectQuery.data,
  });

  const ticketsQuery = useQuery({
    queryKey: ["project-tickets-summary", projectId],
    queryFn: () => fetchTicketsPage({ projectId, page: 1, limit: 200 }),
    enabled: !!projectQuery.data,
  });

  useEffect(() => {
    if (projectQuery.isError) {
      toast.error(getApiErrorMessage(projectQuery.error, "Failed to load project"));
    }
  }, [projectQuery.isError, projectQuery.error]);

  const project = projectQuery.data;
  const overview = project?.overview;
  const members = membersQuery.data?.items ?? [];
  const activities = activitiesQuery.data?.items ?? [];
  const ticketItems = ticketsQuery.data?.items ?? [];
  const ticketChartData = useMemo(() => groupTicketStatuses(ticketItems), [ticketItems]);
  const ticketTotal = overview?.totalTickets ?? ticketItems.length;

  if (projectQuery.isLoading) {
    return <TableSkeleton rows={10} cols={4} />;
  }

  if (projectQuery.isError || !project) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="Project not found"
        description="The project may have been removed or you do not have access."
        action={
          <Button size="sm" variant="outline" asChild>
            <Link to="/admin/projects">Back to projects</Link>
          </Button>
        }
        secondaryAction={
          <Button size="sm" onClick={() => projectQuery.refetch()}>
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-md border border-border/60 bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <Building2 className="size-7" />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{project.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.projectId}
                {project.customerName ? ` · ${project.customerName}` : ""}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <ProjectStatusBadge status={project.status} />
                {project.label ? (
                  <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
                    {project.label}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/admin/projects">
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>
            {canEdit ? (
              <Button size="sm" asChild>
                <Link to="/admin/projects/$projectId/edit" params={{ projectId }}>
                  <Pencil className="size-4" />
                  Edit Project
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <OverviewStatCard label="Team Members" value={overview?.totalMembers ?? 0} icon={Users} tone="primary" />
        <OverviewStatCard label="Total Tickets" value={overview?.totalTickets ?? 0} icon={Ticket} />
        <OverviewStatCard
          label="Open Tickets"
          value={overview?.openTickets ?? 0}
          icon={Ticket}
          tone={overview?.openTickets ? "warning" : "default"}
        />
        <OverviewStatCard
          label="Completed Tickets"
          value={overview?.completedTickets ?? 0}
          icon={CheckCircle2}
          tone="success"
        />
        <OverviewStatCard
          label="Consumed Hours"
          value={`${overview?.consumedHours ?? 0}h`}
          hint={`of ${project.maxHours}h budget`}
          icon={Clock3}
        />
        <OverviewStatCard
          label="Remaining Hours"
          value={`${overview?.remainingHours ?? 0}h`}
          icon={Clock3}
          tone="primary"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <PanelCard title="Project Details" description="Schedule, customer and scope">
          <div className="space-y-5 p-5 text-sm">
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Customer</p>
              <p className="mt-1 font-medium text-foreground">{project.customerName ?? "—"}</p>
              {project.customerEmail ? <p className="text-muted-foreground">{project.customerEmail}</p> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Start Date</p>
                <p className="mt-1 flex items-center gap-2 font-medium">
                  <CalendarRange className="size-4 text-muted-foreground" />
                  {formatDate(project.startDate)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">End Date</p>
                <p className="mt-1 flex items-center gap-2 font-medium">
                  <CalendarRange className="size-4 text-muted-foreground" />
                  {project.endDate ? formatDate(project.endDate) : "No end date"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Maximum Hours</p>
              <p className="tabular mt-1 font-medium">{project.maxHours}h</p>
            </div>

            {project.creatorName ? (
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Created By</p>
                <p className="mt-1 font-medium">{project.creatorName}</p>
              </div>
            ) : null}

            {project.description ? (
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Description</p>
                <p className="mt-1 leading-6 text-muted-foreground">{project.description}</p>
              </div>
            ) : null}

            <div>
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Overall Progress</p>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${project.progressPercentage}%` }}
                  />
                </div>
                <span className="tabular text-sm font-medium text-muted-foreground">{project.progressPercentage}%</span>
              </div>
            </div>
          </div>
        </PanelCard>

        <PanelCard
          title="Team Members"
          description="Assigned employees on this project"
          actions={
            canEdit ? (
              <Button size="sm" variant="outline" asChild>
                <Link to="/admin/projects/$projectId/members" params={{ projectId }}>
                  Manage Members
                </Link>
              </Button>
            ) : null
          }
        >
          {membersQuery.isLoading ? (
            <TableSkeleton rows={4} cols={5} />
          ) : members.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No members yet"
              description="Assign employees to this project to start tracking work."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {["Member", "Role", "Status", "Hours", "Assigned On", ""].map((heading) => (
                    <TableHead key={heading || "actions"}>{heading}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <UserAvatar name={member.employeeName} size={32} />
                        <EntityCell name={member.employeeName} subtitle={member.designation || member.status} />
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.designation || "—"}</TableCell>
                    <TableCell>
                      <StatusBadge status={member.status} />
                    </TableCell>
                    <TableCell className="tabular text-muted-foreground">
                      {member.internalHours + member.externalHours}h
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {member.assignedDate ? formatDate(member.assignedDate) : "—"}
                    </TableCell>
                    <TableCell>
                      {canEdit ? (
                        <DataTableActions>
                          <DataTableIconButton asChild>
                            <Link to="/admin/projects/$projectId/members" params={{ projectId }}>
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">Manage member</span>
                            </Link>
                          </DataTableIconButton>
                        </DataTableActions>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </PanelCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <PanelCard title="Activity Timeline" description="Recent changes on this project">
          {activitiesQuery.isLoading ? (
            <TableSkeleton rows={5} cols={2} />
          ) : activities.length === 0 ? (
            <EmptyState icon={FolderKanban} title="No activity yet" description="Project changes will appear here." />
          ) : (
            <ol className="divide-y">
              {activities.map((activity) => (
                <li key={activity._id} className="flex gap-4 px-5 py-4">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-foreground">{activity.action}</p>
                      <span className="text-xs text-muted-foreground">{relativeTime(activity.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{describeProjectActivity(activity)}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {activity.performerName ?? "System"}
                      {activity.performerEmail ? ` · ${activity.performerEmail}` : ""}
                      {" · "}
                      {formatDate(activity.createdAt, true)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </PanelCard>

        <PanelCard title="Key Information & Quick Actions">
          <div className="space-y-5 p-5">
            <dl className="grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
                <dt className="text-muted-foreground">Project ID</dt>
                <dd className="flex items-center gap-2 font-medium">
                  {project.projectId}
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="size-7"
                    onClick={async () => {
                      await navigator.clipboard.writeText(project.projectId);
                      toast.success("Project ID copied.");
                    }}
                  >
                    <Copy className="size-3.5" />
                    <span className="sr-only">Copy project ID</span>
                  </Button>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
                <dt className="text-muted-foreground">Status</dt>
                <dd>
                  <ProjectStatusBadge status={project.status} />
                </dd>
              </div>
              {project.label ? (
                <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Environment</dt>
                  <dd className="font-medium">{project.label}</dd>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
                <dt className="text-muted-foreground">Customer</dt>
                <dd className="text-right font-medium">{project.customerName ?? "—"}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Created On</dt>
                <dd className="text-right font-medium">{formatDate(project.createdAt, true)}</dd>
              </div>
            </dl>

            {canEdit ? (
              <div>
                <p className="mb-3 text-sm font-semibold text-foreground">Quick Actions</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="h-auto flex-col gap-2 py-4" asChild>
                    <Link to="/admin/tickets/new" search={{ projectId }}>
                      <Ticket className="size-5 text-primary" />
                      <span>Add Ticket</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto flex-col gap-2 py-4" asChild>
                    <Link to="/admin/projects/$projectId/members" params={{ projectId }}>
                      <UserPlus className="size-5 text-primary" />
                      <span>Add Member</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto flex-col gap-2 py-4" asChild>
                    <Link to="/admin/tickets" search={{ projectId }}>
                      <FolderKanban className="size-5 text-primary" />
                      <span>View Tickets</span>
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-2 py-4">
                        <MoreHorizontal className="size-5 text-primary" />
                        <span>More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/admin/projects/$projectId/edit" params={{ projectId }}>
                          Edit project
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/projects/$projectId/members" params={{ projectId }}>
                          Manage members
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : null}
          </div>
        </PanelCard>

        <PanelCard title="Ticket Summary" description="Status breakdown for this project">
          {ticketsQuery.isLoading ? (
            <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Loading tickets…</div>
          ) : ticketTotal === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center gap-2 px-5 text-center">
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[{ name: "No tickets", value: 1 }]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={72}
                      fill="var(--color-muted)"
                      isAnimationActive={false}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm font-medium text-foreground">0 Total</p>
              <p className="text-xs text-muted-foreground">No tickets found for this project.</p>
            </div>
          ) : (
            <div className="grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_auto]">
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ticketChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={78}
                      paddingAngle={2}
                      isAnimationActive={false}
                    >
                      {ticketChartData.map((entry, index) => (
                        <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <p className="text-center text-2xl font-bold md:text-left">
                  {ticketTotal}
                  <span className="ml-1 text-sm font-medium text-muted-foreground">Total</span>
                </p>
                <ul className="space-y-2 text-sm">
                  {ticketChartData.map((item, index) => (
                    <li key={item.name} className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <span
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: chartColors[index % chartColors.length] }}
                        />
                        {item.name}
                      </span>
                      <span className="font-semibold tabular-nums text-foreground">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </PanelCard>
      </div>
    </div>
  );
}
