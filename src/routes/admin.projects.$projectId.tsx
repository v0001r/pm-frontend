import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  CalendarRange,
  Clock3,
  FolderKanban,
  Pencil,
  Ticket,
  Users,
} from "lucide-react";
import { RequireRole } from "@/components/guard";
import {
  EmptyState,
  KpiCard,
  PageHeader,
  ProjectStatusBadge,
  SectionCard,
  TableSkeleton,
} from "@/components/primitives";
import {
  EntityCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";
import { describeProjectActivity } from "@/lib/project-activity";
import { fetchProject, fetchProjectActivities, fetchProjectMembers } from "@/lib/projects";
import { formatDate, relativeTime } from "@/lib/store";

export const Route = createFileRoute("/admin/projects/$projectId")({
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
    queryFn: () => fetchProjectMembers(projectId, { page: 1, limit: 5 }),
    enabled: !!projectQuery.data,
  });

  const activitiesQuery = useQuery({
    queryKey: ["project-activities", projectId],
    queryFn: () => fetchProjectActivities(projectId, { page: 1, limit: 10 }),
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

  if (projectQuery.isLoading) {
    return (
      <>
        <PageHeader title="Project overview" description="Loading project details..." />
        <TableSkeleton rows={8} cols={4} />
      </>
    );
  }

  if (projectQuery.isError || !project) {
    return (
      <>
        <PageHeader title="Project overview" description="Unable to load this project." />
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
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={project.name}
        description={`${project.projectId} · ${project.customerName ?? "Customer project"}`}
        actions={
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
                  Edit
                </Link>
              </Button>
            ) : null}
          </div>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <ProjectStatusBadge status={project.status} />
        {project.label ? (
          <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">{project.label}</span>
        ) : null}
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Team members" value={overview?.totalMembers ?? 0} icon={Users} />
        <KpiCard label="Total tickets" value={overview?.totalTickets ?? 0} icon={Ticket} />
        <KpiCard
          label="Open tickets"
          value={overview?.openTickets ?? 0}
          tone={overview?.openTickets ? "warning" : "default"}
          icon={Ticket}
        />
        <KpiCard label="Completed tickets" value={overview?.completedTickets ?? 0} tone="success" icon={Ticket} />
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiCard
          label="Consumed hours"
          value={`${overview?.consumedHours ?? 0}h`}
          hint={`of ${project.maxHours}h budget`}
          icon={Clock3}
        />
        <KpiCard label="Remaining hours" value={`${overview?.remainingHours ?? 0}h`} icon={Clock3} tone="primary" />
        <KpiCard label="Progress" value={`${project.progressPercentage}%`} icon={FolderKanban} tone="primary" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <SectionCard title="Project details" description="Schedule, customer and scope">
          <div className="space-y-4 p-5 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase">Customer</p>
              <p className="mt-1 font-medium">{project.customerName ?? "—"}</p>
              {project.customerEmail ? <p className="text-muted-foreground">{project.customerEmail}</p> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Start date</p>
                <p className="mt-1 flex items-center gap-2">
                  <CalendarRange className="size-4 text-muted-foreground" />
                  {formatDate(project.startDate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">End date</p>
                <p className="mt-1 flex items-center gap-2">
                  <CalendarRange className="size-4 text-muted-foreground" />
                  {project.endDate ? formatDate(project.endDate) : "No end date"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase">Maximum hours</p>
              <p className="tabular mt-1 font-medium">{project.maxHours}h</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-muted-foreground uppercase">Progress</p>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${project.progressPercentage}%` }}
                  />
                </div>
                <span className="tabular text-sm text-muted-foreground">{project.progressPercentage}%</span>
              </div>
            </div>

            {project.description ? (
              <div>
                <p className="text-xs text-muted-foreground uppercase">Description</p>
                <p className="mt-1 leading-6 text-muted-foreground">{project.description}</p>
              </div>
            ) : null}

            {project.creatorName ? (
              <div>
                <p className="text-xs text-muted-foreground uppercase">Created by</p>
                <p className="mt-1">{project.creatorName}</p>
              </div>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard
          title="Team members"
          description="Assigned employees on this project"
          actions={
            <Button size="sm" variant="outline" asChild>
              <Link to="/admin/projects/$projectId/members" params={{ projectId }}>
                Manage members
              </Link>
            </Button>
          }
        >
          {membersQuery.isLoading ? (
            <TableSkeleton rows={4} cols={3} />
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
                  {["Member", "Role", "Hours", "Assigned"].map((heading) => (
                    <TableHead key={heading}>{heading}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>
                      <EntityCell name={member.employeeName} subtitle={member.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.designation || "—"}</TableCell>
                    <TableCell className="tabular text-muted-foreground">
                      {member.internalHours + member.externalHours}h
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {member.assignedDate ? formatDate(member.assignedDate) : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </SectionCard>
      </div>

      <SectionCard title="Activity timeline" description="Recent changes on this project">
        {activitiesQuery.isLoading ? (
          <TableSkeleton rows={5} cols={2} />
        ) : activities.length === 0 ? (
          <EmptyState icon={FolderKanban} title="No activity yet" description="Project changes will appear here." />
        ) : (
          <ol className="divide-y">
            {activities.map((activity) => (
              <li key={activity._id} className="flex gap-4 px-5 py-4">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{activity.action}</p>
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
      </SectionCard>
    </>
  );
}
