import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AdminOrStaffRoute } from "@/components/guard";
import { KpiCard, PageHeader, PriorityBadge, SectionCard, StatusBadge, TableSkeleton } from "@/components/primitives";
import {
  EntityCell,
  PrimaryCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { getApiErrorMessage } from "@/lib/api";
import { fetchAdminDashboard } from "@/lib/dashboard";
import { formatDate } from "@/lib/store";
import {
  getTicketCategoryLabel,
  getTicketUserLabel,
} from "@/lib/tickets";
import { Button } from "@/components/ui/button";
import {
  AlarmClock,
  Archive,
  CheckCircle2,
  CircleDot,
  Inbox,
  Loader2,
  PauseCircle,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Support Dashboard — Helpdesk Admin" },
      { name: "description", content: "Live overview of ticket volume, SLA health, workload and resolution performance." },
      { property: "og:title", content: "Support Dashboard — Helpdesk Admin" },
      { property: "og:description", content: "Live overview of ticket volume, SLA health and resolution performance." },
    ],
  }),
  component: () => (
    <AdminOrStaffRoute>
      <AdminDashboard />
    </AdminOrStaffRoute>
  ),
});

const chartColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function AdminDashboard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: fetchAdminDashboard,
  });

  useEffect(() => {
    if (isError) toast.error(getApiErrorMessage(error, "Failed to load dashboard"));
  }, [isError, error]);

  const kpis = data?.kpis;
  const charts = data?.charts;
  const recent = data?.recentTickets ?? [];

  const kpiValue = (value?: number) => (isLoading ? "…" : (value ?? 0));

  return (
    <>
      {/* <PageHeader
        title="Support dashboard"
        description="Operational health across every client, queue and agent."
        actions={
          <Button asChild size="sm" variant="outline">
            <Link to="/admin/reports">View reports</Link>
          </Button>
        }
      /> */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total tickets"
          value={kpiValue(kpis?.total.value)}
          icon={Inbox}
          tone="success"
          trend={kpis?.total.trend}
          to="/admin/tickets"
        />
        <KpiCard
          label="New"
          value={kpiValue(kpis?.new.value)}
          icon={CircleDot}
          tone="primary"
          trend={kpis?.new.trend}
          to="/admin/tickets"
          search={{ status: "New" }}
        />
        <KpiCard
          label="In progress"
          value={kpiValue(kpis?.inProgress.value)}
          icon={Loader2}
          tone="warning"
          trend={kpis?.inProgress.trend}
          to="/admin/tickets"
          search={{ status: "In Progress" }}
        />
        <KpiCard
          label="Assigned"
          value={kpiValue(kpis?.assigned.value)}
          icon={PauseCircle}
          tone="info"
          trend={kpis?.assigned.trend}
          to="/admin/tickets"
          search={{ status: "Assigned" }}
        />
        <KpiCard
          label="Resolved"
          value={kpiValue(kpis?.resolved.value)}
          icon={CheckCircle2}
          tone="success"
          trend={kpis?.resolved.trend}
          to="/admin/tickets"
          search={{ status: "Resolved" }}
        />
        <KpiCard
          label="Closed"
          value={kpiValue(kpis?.closed.value)}
          icon={Archive}
          tone="default"
          trend={kpis?.closed.trend}
          to="/admin/tickets"
          search={{ status: "Closed" }}
        />
        <KpiCard
          label="High priority"
          value={kpiValue(kpis?.highPriority.value)}
          icon={AlertTriangle}
          tone="warning"
          trend={kpis?.highPriority.trend}
          to="/admin/tickets"
          search={{ priority: "High" }}
        />
        <KpiCard
          label="Overdue"
          value={kpiValue(kpis?.overdue.value)}
          icon={AlarmClock}
          tone="danger"
          trend={kpis?.overdue.trend}
          to="/admin/tickets"
          search={{ sla: "Breached" }}
        />
      </div>

      <SectionCard title="Tickets created vs resolved" description="Last 7 days">
        <div className="h-72 p-4">
          {isLoading ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading chart…</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts?.trend ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="created" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.12} />
                <Area type="monotone" dataKey="resolved" stroke="var(--color-chart-3)" fill="var(--color-chart-3)" fillOpacity={0.12} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Tickets by status">
          <div className="h-64 p-4">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading…</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts?.byStatus ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} interval={0} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="value" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Tickets by priority">
          <div className="h-64 p-4">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading…</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts?.byPriority ?? []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={48}
                    outerRadius={78}
                    paddingAngle={2}
                    isAnimationActive={false}
                  >
                    {(charts?.byPriority ?? []).map((_, i) => (
                      <Cell key={i} fill={chartColors[i % chartColors.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Tickets by category">
          <div className="h-64 p-4">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading…</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts?.byCategory ?? []} layout="vertical" margin={{ left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} fontSize={11} width={100} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="value" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Recently updated tickets"
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/tickets">View all</Link>
          </Button>
        }
      >
        {isLoading ? (
          <TableSkeleton rows={6} cols={6} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {["Ticket", "Client", "Priority", "Status", "Agent", "Updated"].map((heading) => (
                  <TableHead key={heading}>{heading}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((ticket) => {
                const client = ticket.clientId;
                const agent = ticket.assignedTo;
                const clientName = getTicketUserLabel(client);
                const clientHue =
                  client && typeof client !== "string"
                    ? ((client as { avatarHue?: number }).avatarHue ?? 265)
                    : 265;
                const company =
                  client && typeof client !== "string" ? client.company : undefined;

                return (
                  <TableRow key={String(ticket._id ?? ticket.id)}>
                    <TableCell>
                      <PrimaryCell
                        id={String(ticket.number)}
                        title={String(ticket.subject)}
                        to="/admin/tickets/$ticketId"
                        params={{ ticketId: String(ticket._id ?? ticket.id) }}
                      />
                      <p className="mt-1 text-xs text-muted-foreground">{getTicketCategoryLabel(ticket)}</p>
                    </TableCell>
                    <TableCell>
                      <EntityCell
                        name={clientName}
                        {...(company ? { subtitle: company } : {})}
                        hue={clientHue}
                      />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={String(ticket.priority)} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={String(ticket.status)} />
                    </TableCell>
                    <TableCell>{agent ? getTicketUserLabel(agent) : "—"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(String(ticket.updatedAt ?? ticket.createdAt))}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </>
  );
}
