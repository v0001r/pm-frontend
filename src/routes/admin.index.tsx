import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RequireRole, AdminOrStaffRoute } from "@/components/guard";
import { KpiCard, PageHeader, PriorityBadge, SectionCard, StatusBadge } from "@/components/primitives";
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
import { categoryName, findUser, formatDate, slaState, useStore } from "@/lib/store";
import { PRIORITIES, STATUSES, fullName } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { AlarmClock, CheckCircle2, CircleDot, Inbox, Loader2, PauseCircle, Archive, AlertTriangle } from "lucide-react";

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

const chartColors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

export function AdminDashboard() {
  const store = useStore((s) => s);
  const tickets = store.tickets;
  const count = (fn: (t: (typeof tickets)[number]) => boolean) => tickets.filter(fn).length;

  const byStatus = STATUSES.map((s) => ({ name: s, value: count((t) => t.status === s) }));
  const byPriority = PRIORITIES.map((p) => ({ name: p, value: count((t) => t.priority === p) }));
  const byCategory = store.categories
    .map((c) => ({ name: c.name, value: count((t) => t.categoryId === c.id) }))
    .filter((d) => d.value > 0);
  const byClient = store.users
    .filter((u) => u.role === "Client")
    .map((u) => ({ name: u.company ?? fullName(u), value: count((t) => t.clientId === u.id) }));

  const trend = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(Date.now() - (6 - i) * 86400000);
    const key = day.toISOString().slice(0, 10);
    return {
      day: day.toLocaleDateString("en-GB", { weekday: "short" }),
      created: tickets.filter((t) => t.createdAt.slice(0, 10) === key).length,
      resolved: tickets.filter((t) => t.resolvedAt?.slice(0, 10) === key).length,
    };
  });

  const resolutionTrend = trend.map((d, i) => ({ day: d.day, hours: 9 + ((i * 5) % 7) }));
  const recent = [...tickets].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 6);

  return (
    <>
      <PageHeader
        title="Support dashboard"
        description="Operational health across every client, queue and agent."
        actions={
          <Button asChild size="sm" variant="outline">
            <Link to="/admin/reports">View reports</Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total tickets" value={tickets.length} icon={Inbox} tone="primary" trend={8} hint="vs last week" to="/admin/tickets" />
        <KpiCard label="New" value={count((t) => t.status === "New")} icon={CircleDot} tone="primary" trend={4} hint="vs last week" to="/admin/tickets" search={{ status: "New" }} />
        <KpiCard label="In progress" value={count((t) => t.status === "In Progress")} icon={Loader2} tone="warning" trend={-3} hint="vs last week" to="/admin/tickets" search={{ status: "In Progress" }} />
        <KpiCard label="Assigned" value={count((t) => t.status === "Assigned")} icon={PauseCircle} trend={-6} hint="vs last week" to="/admin/tickets" search={{ status: "Assigned" }} />
        <KpiCard label="Resolved" value={count((t) => t.status === "Resolved")} icon={CheckCircle2} tone="success" trend={12} hint="vs last week" to="/admin/tickets" search={{ status: "Resolved" }} />
        <KpiCard label="Closed" value={count((t) => t.status === "Closed")} icon={Archive} trend={5} hint="vs last week" to="/admin/tickets" search={{ status: "Closed" }} />
        <KpiCard label="High priority" value={count((t) => t.priority === "High" || t.priority === "Critical")} icon={AlertTriangle} tone="warning" trend={-2} hint="vs last week" to="/admin/tickets" search={{ priority: "High" }} />
        <KpiCard label="Overdue" value={count((t) => slaState(t) === "Breached")} icon={AlarmClock} tone="danger" trend={-9} hint="vs last week" to="/admin/tickets" search={{ sla: "Breached" }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Tickets created vs resolved" description="Last 7 days">
          <div className="h-64 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="created" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.15} />
                <Area type="monotone" dataKey="resolved" stroke="var(--color-chart-3)" fill="var(--color-chart-3)" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Average resolution time" description="Hours per day">
          <div className="h-64 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resolutionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                <Line type="monotone" dataKey="hours" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Tickets by status">
          <div className="h-56 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} interval={0} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                <Bar dataKey="value" fill="var(--color-chart-1)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Tickets by priority">
          <div className="h-56 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byPriority} dataKey="value" nameKey="name" cx="50%" cy="45%" innerRadius={45} outerRadius={75} paddingAngle={2} isAnimationActive={false}>
                  {byPriority.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Tickets by category">
          <div className="h-64 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCategory} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} fontSize={11} width={110} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                <Bar dataKey="value" fill="var(--color-chart-2)" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Tickets by client">
          <div className="h-64 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byClient}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                <Bar dataKey="value" fill="var(--color-chart-3)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {["Ticket", "Client", "Priority", "Status", "Agent", "Updated"].map((heading) => (
                <TableHead key={heading}>{heading}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.map((t) => {
              const client = findUser(store, t.clientId)!;
              const agent = findUser(store, t.assignedTo);
              return (
                <TableRow key={t.id}>
                  <TableCell>
                    <PrimaryCell
                      id={t.number}
                      title={t.subject}
                      to="/admin/tickets/$ticketId"
                      params={{ ticketId: t.id }}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">{categoryName(store, t.categoryId)}</p>
                  </TableCell>
                  <TableCell>
                    <EntityCell name={fullName(client)} subtitle={client.company} hue={client.avatarHue} />
                  </TableCell>
                  <TableCell><PriorityBadge priority={t.priority} /></TableCell>
                  <TableCell><StatusBadge status={t.status} /></TableCell>
                  <TableCell>{agent ? fullName(agent) : "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(t.updatedAt)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </SectionCard>
    </>
  );
}
