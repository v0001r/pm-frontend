import { useEffect, useMemo, useState } from "react";
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
import { ListingFilterField, ListingFilterSelect, ListingToolbarActions } from "@/components/listing-page";
import { KpiCard, PriorityBadge, SectionCard, StatusBadge, TableSkeleton, categoryChartColor, priorityChartColor, statusChartColor } from "@/components/primitives";
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
import { fetchCustomers } from "@/lib/customers";
import { defaultDashboardDateRange, fetchAdminDashboard, type DashboardQueryParams } from "@/lib/dashboard";
import { fetchProjects } from "@/lib/projects";
import { formatDate } from "@/lib/store";
import { fetchEmployees } from "@/lib/users";
import {
  getTicketCategoryLabel,
  getTicketUserLabel,
} from "@/lib/tickets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fullName } from "@/lib/types";
import { cn } from "@/lib/utils";
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

const FILTER_ANY = "all";

type DashboardFilterState = {
  customerId: string;
  projectId: string;
  assignedTo: string;
  dateFrom: string;
  dateTo: string;
};

function buildDashboardQuery(filters: DashboardFilterState): DashboardQueryParams {
  const params: DashboardQueryParams = {
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
  };
  if (filters.customerId !== FILTER_ANY) params.customerId = filters.customerId;
  if (filters.projectId !== FILTER_ANY) params.projectId = filters.projectId;
  if (filters.assignedTo !== FILTER_ANY) params.assignedTo = filters.assignedTo;
  return params;
}

function formatDashboardRangeLabel(dateFrom: string, dateTo: string) {
  const from = new Date(`${dateFrom}T00:00:00`);
  const to = new Date(`${dateTo}T00:00:00`);
  const sameYear = from.getFullYear() === to.getFullYear();
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
  });
  const toFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${formatter.format(from)} – ${toFormatter.format(to)}`;
}

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

export function AdminDashboard() {
  const defaultRange = defaultDashboardDateRange();
  const defaultFilters: DashboardFilterState = {
    customerId: FILTER_ANY,
    projectId: FILTER_ANY,
    assignedTo: FILTER_ANY,
    dateFrom: defaultRange.dateFrom,
    dateTo: defaultRange.dateTo,
  };
  const [filters, setFilters] = useState<DashboardFilterState>(defaultFilters);
  const [draft, setDraft] = useState<DashboardFilterState>(defaultFilters);
  const [filterOpen, setFilterOpen] = useState(false);

  const queryParams = useMemo(() => buildDashboardQuery(filters), [filters]);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["admin-dashboard", queryParams],
    queryFn: () => fetchAdminDashboard(queryParams),
  });

  const customersQuery = useQuery({
    queryKey: ["dashboard-customers"],
    queryFn: () => fetchCustomers({ page: 1, limit: 100, sortBy: "companyName", sortOrder: "asc" }),
  });

  const projectsQuery = useQuery({
    queryKey: ["dashboard-projects", draft.customerId],
    queryFn: () =>
      fetchProjects({
        page: 1,
        limit: 100,
        sortBy: "name",
        sortOrder: "asc",
        ...(draft.customerId !== FILTER_ANY ? { customerId: draft.customerId } : {}),
      }),
  });

  const employeesQuery = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  useEffect(() => {
    if (filterOpen) setDraft(filters);
  }, [filterOpen, filters]);

  useEffect(() => {
    if (isError) toast.error(getApiErrorMessage(error, "Failed to load dashboard"));
  }, [isError, error]);

  const kpis = data?.kpis;
  const charts = data?.charts;
  const recent = data?.recentTickets ?? [];
  const rangeLabel = formatDashboardRangeLabel(filters.dateFrom, filters.dateTo);

  const kpiValue = (value?: number) => (isLoading ? "…" : (value ?? 0));

  const activeFilterCount = [
    filters.customerId !== FILTER_ANY,
    filters.projectId !== FILTER_ANY,
    filters.assignedTo !== FILTER_ANY,
    filters.dateFrom !== defaultFilters.dateFrom || filters.dateTo !== defaultFilters.dateTo,
  ].filter(Boolean).length;

  const applyFilters = () => {
    if (draft.dateFrom && draft.dateTo && draft.dateFrom > draft.dateTo) {
      toast.error("Start date must be on or before end date.");
      return;
    }
    setFilters(draft);
    setFilterOpen(false);
  };

  const resetFilters = () => {
    setDraft(defaultFilters);
    setFilters(defaultFilters);
    setFilterOpen(false);
  };

  const patchDraft = (patch: Partial<DashboardFilterState>) => {
    setDraft((current) => {
      const next = { ...current, ...patch };
      if (patch.customerId !== undefined && patch.customerId !== current.customerId) {
        next.projectId = FILTER_ANY;
      }
      return next;
    });
  };

  const customers = customersQuery.data?.items ?? [];
  const projects = projectsQuery.data?.items ?? [];
  const employees = employeesQuery.data ?? [];

  const filterContent = (
    <>
      <ListingFilterField label="Customer">
        <ListingFilterSelect
          value={draft.customerId}
          onChange={(value) => patchDraft({ customerId: value })}
          options={customers.map((customer) => [customer._id, customer.companyName])}
          allLabel="All customers"
          allValue={FILTER_ANY}
        />
      </ListingFilterField>
      <ListingFilterField label="Project">
        <ListingFilterSelect
          value={draft.projectId}
          onChange={(value) => patchDraft({ projectId: value })}
          options={projects.map((project) => [project._id, project.name])}
          allLabel="All projects"
          allValue={FILTER_ANY}
        />
      </ListingFilterField>
      <ListingFilterField label="Assigned agent">
        <ListingFilterSelect
          value={draft.assignedTo}
          onChange={(value) => patchDraft({ assignedTo: value })}
          options={employees.map((employee) => [employee._id ?? employee.id, fullName(employee)])}
          allLabel="All agents"
          allValue={FILTER_ANY}
        />
      </ListingFilterField>
      <ListingFilterField label="From">
        <Input
          type="date"
          value={draft.dateFrom}
          onChange={(event) => patchDraft({ dateFrom: event.target.value })}
          className="h-9"
        />
      </ListingFilterField>
      <ListingFilterField label="To">
        <Input
          type="date"
          value={draft.dateTo}
          onChange={(event) => patchDraft({ dateTo: event.target.value })}
          className="h-9"
        />
      </ListingFilterField>
    </>
  );

  return (
    <>
      <div
        className={cn(
          "sticky top-14 z-10 -mt-2 mb-2 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/95 px-4 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/85",
        )}
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Support dashboard</p>
          <p className="text-xs text-muted-foreground">
            {rangeLabel}
            {activeFilterCount > 0 ? ` · ${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} active` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {isFetching && !isLoading ? (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="size-3.5 animate-spin" />
              Updating…
            </span>
          ) : null}
          <ListingToolbarActions
            filterOpen={filterOpen}
            onFilterOpenChange={setFilterOpen}
            activeFilterCount={activeFilterCount}
            onFilterApply={applyFilters}
            onFilterClear={resetFilters}
            filterContent={filterContent}
            filterTitle="Dashboard filters"
          />
        </div>
      </div>

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

      <SectionCard title="Tickets created vs resolved" description={rangeLabel}>
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
                <Area type="monotone" dataKey="created" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.12} />
                <Area type="monotone" dataKey="resolved" stroke="var(--color-success)" fill="var(--color-success)" fillOpacity={0.12} />
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
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {(charts?.byStatus ?? []).map((entry) => (
                      <Cell key={entry.name} fill={statusChartColor(entry.name)} />
                    ))}
                  </Bar>
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
                    {(charts?.byPriority ?? []).map((entry) => (
                      <Cell key={entry.name} fill={priorityChartColor(entry.name)} />
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
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {(charts?.byCategory ?? []).map((entry) => (
                      <Cell key={entry.name} fill={categoryChartColor(entry.name)} />
                    ))}
                  </Bar>
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
