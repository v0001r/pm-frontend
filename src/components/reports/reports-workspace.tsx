import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, Loader2 } from "lucide-react";
import { ReportFilterBar } from "@/components/reports/report-filter-bar";
import {
  drilldownAgingBucket,
  drilldownByAgent,
  drilldownByCategory,
  drilldownByCustomer,
  drilldownByPriority,
  drilldownByProject,
  drilldownBySla,
  drilldownByStatus,
  drilldownByTag,
  workloadTone,
  type TicketDrilldownSearch,
} from "@/components/reports/report-drilldown";
import {
  EmptyState,
  KpiCard,
  PriorityBadge,
  SectionCard,
  StatusBadge,
  TableSkeleton,
  categoryChartColor,
  priorityChartColor,
} from "@/components/primitives";
import {
  DataTableHead,
  PrimaryCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getApiErrorMessage } from "@/lib/api";
import { fetchCategories } from "@/lib/categories";
import { fetchCustomers } from "@/lib/customers";
import { fetchTeams } from "@/lib/org";
import { fetchProjects } from "@/lib/projects";
import {
  buildReportsParams,
  defaultReportsFilters,
  exportReportCsv,
  fetchAgentPerformance,
  fetchCategoryPriorityAnalytics,
  fetchCustomerAnalytics,
  fetchEscalationsReport,
  fetchProjectAnalytics,
  fetchReopenedReport,
  fetchReportsOverview,
  fetchTicketAnalytics,
  fetchWorkloadReport,
  REPORT_TABS,
  type ReportExportSection,
  type ReportGranularity,
  type ReportKpiMetric,
  type ReportTab,
  type ReportsFilterState,
} from "@/lib/reports";
import { fetchEmployees } from "@/lib/users";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/primitives";

function DrillLink({
  search,
  children,
  className,
}: {
  search: TicketDrilldownSearch;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to="/admin/tickets" search={search as never} className={className ?? "hover:text-primary"}>
      {children}
    </Link>
  );
}

function formatKpi(metric?: ReportKpiMetric, loading?: boolean) {
  if (loading) return "…";
  if (metric?.formatted) return metric.formatted;
  return metric?.value ?? 0;
}

function ReportEmpty({ message }: { message?: string }) {
  return (
    <EmptyState
      title="No data available"
      description={message ?? "No data available for the selected filters."}
    />
  );
}

function ReportError() {
  return <EmptyState title="Unable to load report data" description="Please try again or adjust your filters." />;
}

export function ReportsWorkspace() {
  const [filters, setFilters] = useState<ReportsFilterState>(defaultReportsFilters());
  const [draft, setDraft] = useState<ReportsFilterState>(filters);
  const [tab, setTab] = useState<ReportTab>("overview");
  const [exporting, setExporting] = useState(false);

  const queryParams = useMemo(() => buildReportsParams(filters), [filters]);

  const customersQuery = useQuery({
    queryKey: ["report-customers"],
    queryFn: () => fetchCustomers({ page: 1, limit: 200, sortBy: "companyName", sortOrder: "asc" }),
  });
  const projectsQuery = useQuery({
    queryKey: ["report-projects", draft.customerId],
    queryFn: () =>
      fetchProjects({
        page: 1,
        limit: 200,
        sortBy: "name",
        sortOrder: "asc",
        ...(draft.customerId !== "all" ? { customerId: draft.customerId } : {}),
      }),
  });
  const employeesQuery = useQuery({ queryKey: ["employees"], queryFn: fetchEmployees });
  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const teamsQuery = useQuery({ queryKey: ["teams"], queryFn: () => fetchTeams() });

  const overviewQuery = useQuery({
    queryKey: ["reports-overview", queryParams],
    queryFn: () => fetchReportsOverview(queryParams),
    enabled: tab === "overview",
  });

  const ticketAnalyticsQuery = useQuery({
    queryKey: ["reports-ticket-analytics", queryParams],
    queryFn: () => fetchTicketAnalytics(queryParams),
    enabled: tab === "ticket-analytics",
  });

  const agentsQuery = useQuery({
    queryKey: ["reports-agents", queryParams],
    queryFn: () => fetchAgentPerformance(queryParams),
    enabled: tab === "agents",
  });

  const workloadQuery = useQuery({
    queryKey: ["reports-workload", queryParams],
    queryFn: () => fetchWorkloadReport(queryParams),
    enabled: tab === "workload",
  });

  const customersReportQuery = useQuery({
    queryKey: ["reports-customers", queryParams],
    queryFn: () => fetchCustomerAnalytics(queryParams),
    enabled: tab === "customers",
  });

  const projectsReportQuery = useQuery({
    queryKey: ["reports-projects", queryParams],
    queryFn: () => fetchProjectAnalytics(queryParams),
    enabled: tab === "projects",
  });

  const categoriesQuery2 = useQuery({
    queryKey: ["reports-categories", queryParams],
    queryFn: () => fetchCategoryPriorityAnalytics(queryParams),
    enabled: tab === "categories",
  });

  const reopenedQuery = useQuery({
    queryKey: ["reports-reopened", queryParams],
    queryFn: () => fetchReopenedReport(queryParams),
    enabled: tab === "escalations",
  });

  const escalationsQuery = useQuery({
    queryKey: ["reports-escalations", queryParams],
    queryFn: () => fetchEscalationsReport(queryParams),
    enabled: tab === "escalations",
  });

  const applyFilters = () => {
    if (draft.dateFrom && draft.dateTo && draft.dateFrom > draft.dateTo) {
      toast.error("Start date must be on or before end date.");
      return;
    }
    setFilters(draft);
  };

  const clearFilters = () => {
    const next = defaultReportsFilters();
    setDraft(next);
    setFilters(next);
  };

  const removeFilter = (patch: Partial<ReportsFilterState>) => {
    const next = { ...filters, ...patch };
    setDraft(next);
    setFilters(next);
  };

  const patchDraft = (patch: Partial<ReportsFilterState>) => {
    setDraft((c) => {
      const next = { ...c, ...patch };
      if (patch.customerId !== undefined && patch.customerId !== c.customerId) next.projectId = "all";
      return next;
    });
  };

  const setGranularity = (granularity: ReportGranularity) => {
    const next = { ...filters, granularity };
    setFilters(next);
    setDraft(next);
  };

  const handleExport = async () => {
    const sectionMap: Record<ReportTab, ReportExportSection | null> = {
      overview: "overview",
      "ticket-analytics": "ticket-analytics",
      agents: "agents",
      workload: "workload",
      customers: "customers",
      projects: "projects",
      categories: "categories",
      escalations: "escalations",
      custom: null,
    };
    const section = sectionMap[tab];
    if (!section) {
      toast.message("Select a report tab with export support, or use Custom Reports.");
      return;
    }
    try {
      setExporting(true);
      await exportReportCsv(section, queryParams);
      toast.success("Report exported to CSV.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Export failed"));
    } finally {
      setExporting(false);
    }
  };

  const customers = customersQuery.data?.items ?? [];
  const projects = projectsQuery.data?.items ?? [];
  const employees = employeesQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const teams = teamsQuery.data ?? [];

  return (
    <>
      <PageHeader
        title="Reports & Analytics"
        description="Monitor ticket volume, SLA performance, workload and support quality."
        actions={
          <Button variant="outline" size="sm" onClick={handleExport} disabled={exporting}>
            {exporting ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
            Export
          </Button>
        }
      />

      <ReportFilterBar
        filters={filters}
        draft={draft}
        onDraftChange={patchDraft}
        onApply={applyFilters}
        onClear={clearFilters}
        onRemoveFilter={removeFilter}
        customers={customers}
        projects={projects}
        employees={employees}
        categories={categories}
        teams={teams}
      />

      <Tabs value={tab} onValueChange={(v) => setTab(v as ReportTab)} className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
            {REPORT_TABS.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="rounded-md border border-transparent px-3 py-1.5 text-xs data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-0 space-y-4">
          <OverviewTab query={overviewQuery} onGranularityChange={setGranularity} granularity={filters.granularity} />
        </TabsContent>

        <TabsContent value="ticket-analytics" className="mt-0 space-y-4">
          <TicketAnalyticsTab query={ticketAnalyticsQuery} onGranularityChange={setGranularity} granularity={filters.granularity} />
        </TabsContent>

        <TabsContent value="agents" className="mt-0 space-y-4">
          <AgentsTab query={agentsQuery} />
        </TabsContent>

        <TabsContent value="workload" className="mt-0 space-y-4">
          <WorkloadTab query={workloadQuery} />
        </TabsContent>

        <TabsContent value="customers" className="mt-0 space-y-4">
          <CustomersTab query={customersReportQuery} />
        </TabsContent>

        <TabsContent value="projects" className="mt-0 space-y-4">
          <ProjectsTab query={projectsReportQuery} />
        </TabsContent>

        <TabsContent value="categories" className="mt-0 space-y-4">
          <CategoriesTab query={categoriesQuery2} />
        </TabsContent>

        <TabsContent value="escalations" className="mt-0 space-y-4">
          <EscalationsTab escalationsQuery={escalationsQuery} reopenedQuery={reopenedQuery} />
        </TabsContent>

        <TabsContent value="custom" className="mt-0 space-y-4">
          <SectionCard title="Custom Reports" description="Export filtered report data as CSV.">
            <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  ["overview", "Overview KPIs"],
                  ["agents", "Agent performance"],
                  ["customers", "Customer analytics"],
                ] as [ReportExportSection, string][]
              ).map(([section, label]) => (
                <Button
                  key={section}
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={async () => {
                    try {
                      await exportReportCsv(section, queryParams);
                      toast.success(`${label} exported.`);
                    } catch (e) {
                      toast.error(getApiErrorMessage(e, "Export failed"));
                    }
                  }}
                >
                  <Download className="size-4" />
                  {label}
                </Button>
              ))}
            </div>
            <p className="px-5 pb-5 text-body-sm text-subtle">
              Channel analytics are not available — the application does not store ticket source/channel data.
            </p>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </>
  );
}

function OverviewTab({
  query,
  granularity,
  onGranularityChange,
}: {
  query: ReturnType<typeof useQuery>;
  granularity: ReportGranularity;
  onGranularityChange: (g: ReportGranularity) => void;
}) {
  const data = query.data as Awaited<ReturnType<typeof fetchReportsOverview>> | undefined;
  const loading = query.isLoading;
  const isError = query.isError;

  if (isError) return <ReportError />;
  if (!loading && !data) return <ReportEmpty />;

  const kpis = data?.kpis;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        <KpiCard label="Total tickets" value={formatKpi(kpis?.totalTickets, loading)} trend={kpis?.totalTickets.trend} to="/admin/tickets" />
        <KpiCard label="Open tickets" value={formatKpi(kpis?.openTickets, loading)} to="/admin/tickets" search={drilldownByStatus("New")} />
        <KpiCard label="Backlog" value={formatKpi(kpis?.backlog, loading)} tone="warning" to="/admin/tickets" />
        <KpiCard label="Resolved" value={formatKpi(kpis?.resolvedTickets, loading)} trend={kpis?.resolvedTickets.trend} tone="success" to="/admin/tickets" search={drilldownByStatus("Resolved")} />
        <KpiCard label="Resolution rate" value={formatKpi(kpis?.resolutionRate, loading)} />
        <KpiCard label="SLA compliance" value={formatKpi(kpis?.slaCompliance, loading)} trend={kpis?.slaCompliance.trend} tone="success" />
        <KpiCard label="SLA breaches" value={formatKpi(kpis?.slaBreaches, loading)} trend={kpis?.slaBreaches.trend} tone="danger" to="/admin/tickets" search={drilldownBySla("Breached")} />
        <KpiCard label="Avg first response" value={formatKpi(kpis?.avgFirstResponse, loading)} />
        <KpiCard label="Avg resolution" value={formatKpi(kpis?.avgResolutionTime, loading)} />
        <KpiCard label="Reopened" value={formatKpi(kpis?.reopenedTickets, loading)} trend={kpis?.reopenedTickets.trend} tone="warning" to="/admin/tickets" search={drilldownByStatus("Reopened")} />
        <KpiCard label="Escalations" value={formatKpi(kpis?.escalations, loading)} trend={kpis?.escalations.trend} tone="danger" to="/admin/tickets" search={drilldownByTag("escalated")} />
      </div>

      <SectionCard
        title="Ticket volume"
        actions={
          <Select value={granularity} onValueChange={(v) => onGranularityChange(v as ReportGranularity)}>
            <SelectTrigger className="h-8 w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        }
      >
        <div className="h-64 p-4">
          {loading ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading…</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.volumeTrend ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="created" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.1} name="Created" />
                <Area type="monotone" dataKey="resolved" stroke="var(--color-success)" fill="var(--color-success)" fillOpacity={0.1} name="Resolved" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Created vs resolved">
          <div className="space-y-2 p-5">
            <div className="flex justify-between text-sm">
              <span>Tickets created</span>
              <span className="font-semibold tabular">{data?.createdVsResolved.created ?? 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tickets resolved</span>
              <span className="font-semibold tabular">{data?.createdVsResolved.resolved ?? 0}</span>
            </div>
            <div className="border-t border-border/60 pt-2 flex justify-between text-sm font-medium">
              <span>Net backlog change</span>
              <span className={data?.createdVsResolved.netChange > 0 ? "text-destructive" : "text-success"}>
                {data?.createdVsResolved.netChange > 0 ? "+" : ""}{data?.createdVsResolved.netChange ?? 0} tickets
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Backlog analysis">
          <div className="grid grid-cols-2 gap-3 p-5 text-sm">
            <div><span className="text-muted-foreground">Current backlog</span><p className="text-lg font-semibold tabular">{data?.backlog.current ?? 0}</p></div>
            <div><span className="text-muted-foreground">Open</span><p className="text-lg font-semibold tabular">{data?.backlog.open ?? 0}</p></div>
            <div><span className="text-muted-foreground">Overdue</span><p className="text-lg font-semibold tabular">{data?.backlog.overdue ?? 0}</p></div>
            <div><span className="text-muted-foreground">Unassigned</span><p className="text-lg font-semibold tabular">{data?.backlog.unassigned ?? 0}</p></div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Ticket aging">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Age bucket</TableHead>
              <TableHead className="text-right">Tickets</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.backlog.aging ?? []).map((bucket) => (
              <TableRow key={bucket.key}>
                <TableCell>{bucket.label}</TableCell>
                <TableCell className="text-right tabular font-semibold">
                  <DrillLink search={drilldownAgingBucket(bucket.minHours, bucket.maxHours)}>
                    {bucket.count}
                  </DrillLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <SectionCard title="Status funnel">
        <div className="flex flex-wrap items-center justify-center gap-2 p-5">
          {(data?.statusFunnel ?? []).map((step, i) => (
            <div key={step.status} className="flex items-center gap-2">
              <div className="rounded-md border border-border px-3 py-2 text-center">
                <p className="text-xs text-muted-foreground">{step.status}</p>
                <DrillLink search={drilldownByStatus(step.status)} className="text-lg font-bold tabular">
                  {step.count}
                </DrillLink>
              </div>
              {i < (data?.statusFunnel.length ?? 0) - 1 ? <span className="text-muted-foreground">↓</span> : null}
            </div>
          ))}
        </div>
      </SectionCard>

      {data?.peakHours ? (
        <SectionCard title="Support peak hours">
          <div className="h-48 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.peakHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="hour" tickFormatter={(h) => `${h}:00`} fontSize={10} />
                <YAxis allowDecimals={false} fontSize={10} />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      ) : null}
    </>
  );
}

function TicketAnalyticsTab({
  query,
  granularity,
  onGranularityChange,
}: {
  query: ReturnType<typeof useQuery>;
  granularity: ReportGranularity;
  onGranularityChange: (g: ReportGranularity) => void;
}) {
  const data = query.data as Awaited<ReturnType<typeof fetchTicketAnalytics>> | undefined;
  if (query.isError) return <ReportError />;
  if (!query.isLoading && !data) return <ReportEmpty />;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <KpiCard label="Created" value={query.isLoading ? "…" : data?.summary.created ?? 0} />
        <KpiCard label="Resolved" value={query.isLoading ? "…" : data?.summary.resolved ?? 0} tone="success" />
        <KpiCard label="Closed" value={query.isLoading ? "…" : data?.summary.closed ?? 0} />
        <KpiCard label="Reopened" value={query.isLoading ? "…" : data?.summary.reopened ?? 0} tone="warning" />
        <KpiCard label="Net change" value={query.isLoading ? "…" : data?.summary.netChange ?? 0} />
      </div>
      <SectionCard
        title="Volume trend"
        actions={
          <Select value={granularity} onValueChange={(v) => onGranularityChange(v as ReportGranularity)}>
            <SelectTrigger className="h-8 w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        }
      >
        <div className="h-72 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.trend ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="label" fontSize={11} />
              <YAxis allowDecimals={false} fontSize={11} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="created" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.1} />
              <Area type="monotone" dataKey="resolved" stroke="var(--color-success)" fill="var(--color-success)" fillOpacity={0.1} />
              <Area type="monotone" dataKey="closed" stroke="var(--color-muted-foreground)" fill="var(--color-muted-foreground)" fillOpacity={0.08} />
              <Area type="monotone" dataKey="reopened" stroke="var(--color-warning)" fill="var(--color-warning)" fillOpacity={0.08} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </>
  );
}

function AgentsTab({ query }: { query: ReturnType<typeof useQuery> }) {
  const data = query.data as Awaited<ReturnType<typeof fetchAgentPerformance>> | undefined;
  if (query.isError) return <ReportError />;
  if (query.isLoading) return <TableSkeleton rows={8} cols={10} />;
  if (!data?.agents.length) return <ReportEmpty />;

  return (
    <SectionCard title="Agent performance">
      <Table className="min-w-5xl">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {["Agent", "Assigned", "Open", "In progress", "Resolved", "Closed", "SLA %", "Avg response", "Avg resolution", "Reopened", "Escalations", "Workload"].map((h) => (
              <DataTableHead key={h} sortable={false}>{h}</DataTableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.agents.map((row) => (
            <TableRow key={row.agentId}>
              <TableCell>
                <DrillLink search={drilldownByAgent(row.agentId)} className="font-medium">
                  {row.name}
                </DrillLink>
              </TableCell>
              <TableCell className="tabular">{row.assigned}</TableCell>
              <TableCell className="tabular">{row.open}</TableCell>
              <TableCell className="tabular">{row.inProgress}</TableCell>
              <TableCell className="tabular">{row.resolved}</TableCell>
              <TableCell className="tabular">{row.closed}</TableCell>
              <TableCell className="tabular">{row.slaPercent}%</TableCell>
              <TableCell>{row.avgFirstResponseFormatted ?? "—"}</TableCell>
              <TableCell>{row.avgResolutionFormatted ?? "—"}</TableCell>
              <TableCell className="tabular">{row.reopened}</TableCell>
              <TableCell className="tabular">{row.escalations}</TableCell>
              <TableCell>
                <Badge variant={workloadTone(row.workload) === "success" ? "success" : workloadTone(row.workload) === "warning" ? "warning" : "destructive"}>
                  {row.workload}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionCard>
  );
}

function WorkloadTab({ query }: { query: ReturnType<typeof useQuery> }) {
  const data = query.data as Awaited<ReturnType<typeof fetchWorkloadReport>> | undefined;
  if (query.isError) return <ReportError />;
  if (query.isLoading) return <TableSkeleton rows={6} cols={4} />;
  if (!data) return <ReportEmpty />;

  return (
    <>
      <KpiCard label="Unassigned tickets" value={data.unassigned} to="/admin/tickets" search={{ agent: "unassigned" }} />
      <SectionCard title="Agent workload" description={`Healthy ≤${data.thresholds.healthyMax} · Busy ≤${data.thresholds.busyMax} open tickets`}>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <DataTableHead>Agent</DataTableHead>
              <DataTableHead>Open tickets</DataTableHead>
              <DataTableHead>SLA breaches</DataTableHead>
              <DataTableHead>Workload</DataTableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.agents.map((row) => (
              <TableRow key={row.agentId}>
                <TableCell>
                  <DrillLink search={drilldownByAgent(row.agentId)}>{row.name}</DrillLink>
                </TableCell>
                <TableCell className="tabular">{row.open}</TableCell>
                <TableCell className="tabular">{row.slaBreaches}</TableCell>
                <TableCell>
                  <Badge variant={workloadTone(row.workload) === "success" ? "success" : workloadTone(row.workload) === "warning" ? "warning" : "destructive"}>
                    {row.workload}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </>
  );
}

function CustomersTab({ query }: { query: ReturnType<typeof useQuery> }) {
  const data = query.data as Awaited<ReturnType<typeof fetchCustomerAnalytics>> | undefined;
  if (query.isError) return <ReportError />;
  if (query.isLoading) return <TableSkeleton rows={8} cols={9} />;
  if (!data?.customers.length) return <ReportEmpty />;

  return (
    <SectionCard title="Customer analytics">
      <Table className="min-w-5xl">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {["Customer", "Total", "Open", "Resolved", "SLA breaches", "Avg response", "Avg resolution", "Reopened", "Escalations", "Health"].map((h) => (
              <DataTableHead key={h}>{h}</DataTableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.customers.map((row) => (
            <TableRow key={row.customerId}>
              <TableCell>
                <DrillLink search={drilldownByCustomer(row.customerId)} className="font-medium">{row.name}</DrillLink>
              </TableCell>
              <TableCell className="tabular">{row.total}</TableCell>
              <TableCell className="tabular">{row.open}</TableCell>
              <TableCell className="tabular">{row.resolved}</TableCell>
              <TableCell className="tabular">{row.slaBreaches}</TableCell>
              <TableCell>{row.avgFirstResponseFormatted ?? "—"}</TableCell>
              <TableCell>{row.avgResolutionFormatted ?? "—"}</TableCell>
              <TableCell className="tabular">{row.reopened}</TableCell>
              <TableCell className="tabular">{row.escalations}</TableCell>
              <TableCell>{row.health ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionCard>
  );
}

function ProjectsTab({ query }: { query: ReturnType<typeof useQuery> }) {
  const data = query.data as Awaited<ReturnType<typeof fetchProjectAnalytics>> | undefined;
  if (query.isError) return <ReportError />;
  if (query.isLoading) return <TableSkeleton rows={8} cols={8} />;
  if (!data?.projects.length) return <ReportEmpty />;

  return (
    <SectionCard title="Project analytics">
      <Table className="min-w-5xl">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {["Project", "Customer", "Total", "Open", "Resolved", "SLA %", "Avg response", "Avg resolution", "Reopened"].map((h) => (
              <DataTableHead key={h}>{h}</DataTableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.projects.map((row) => (
            <TableRow key={row.projectId}>
              <TableCell>
                <Link to="/admin/projects/$projectId" params={{ projectId: row.projectId }} className="font-medium hover:text-primary">
                  {row.name}
                </Link>
                <DrillLink search={drilldownByProject(row.projectId)} className="ml-2 text-xs text-muted-foreground">
                  Tickets
                </DrillLink>
              </TableCell>
              <TableCell>{row.customerName}</TableCell>
              <TableCell className="tabular">{row.total}</TableCell>
              <TableCell className="tabular">{row.open}</TableCell>
              <TableCell className="tabular">{row.resolved}</TableCell>
              <TableCell className="tabular">{row.slaPercent}%</TableCell>
              <TableCell>{row.avgResponseFormatted ?? "—"}</TableCell>
              <TableCell>{row.avgResolutionFormatted ?? "—"}</TableCell>
              <TableCell className="tabular">{row.reopened}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionCard>
  );
}

function CategoriesTab({ query }: { query: ReturnType<typeof useQuery> }) {
  const data = query.data as Awaited<ReturnType<typeof fetchCategoryPriorityAnalytics>> | undefined;
  if (query.isError) return <ReportError />;
  if (query.isLoading) return <TableSkeleton rows={8} cols={8} />;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title="Category performance">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {["Category", "Volume", "Open", "Resolved", "SLA %"].map((h) => (
                <DataTableHead key={h}>{h}</DataTableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.categories ?? []).map((row) => (
              <TableRow key={row.categoryId}>
                <TableCell>
                  <DrillLink search={drilldownByCategory(row.categoryId)}>{row.name}</DrillLink>
                </TableCell>
                <TableCell className="tabular">{row.volume}</TableCell>
                <TableCell className="tabular">{row.open}</TableCell>
                <TableCell className="tabular">{row.resolved}</TableCell>
                <TableCell className="tabular">{row.slaPercent}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="h-48 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.categories ?? []} layout="vertical">
              <XAxis type="number" fontSize={10} />
              <YAxis type="category" dataKey="name" width={90} fontSize={10} />
              <Tooltip />
              <Bar dataKey="volume" radius={[0, 4, 4, 0]}>
                {(data?.categories ?? []).map((entry) => (
                  <Cell key={entry.categoryId} fill={categoryChartColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Priority analytics">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {["Priority", "Volume", "Open", "Resolved", "SLA breaches", "Avg resolution"].map((h) => (
                <DataTableHead key={h}>{h}</DataTableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.priorities ?? []).map((row) => (
              <TableRow key={row.priority}>
                <TableCell>
                  <DrillLink search={drilldownByPriority(row.priority)}>
                    <PriorityBadge priority={row.priority} />
                    <span className="ml-1 text-muted-foreground">{row.label}</span>
                  </DrillLink>
                </TableCell>
                <TableCell className="tabular">{row.volume}</TableCell>
                <TableCell className="tabular">{row.open}</TableCell>
                <TableCell className="tabular">{row.resolved}</TableCell>
                <TableCell className="tabular">{row.slaBreaches}</TableCell>
                <TableCell>{row.avgResolutionFormatted ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="h-48 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.priorities ?? []}>
              <XAxis dataKey="label" fontSize={10} />
              <YAxis fontSize={10} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
                {(data?.priorities ?? []).map((entry) => (
                  <Cell key={entry.priority} fill={priorityChartColor(entry.priority)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}

function EscalationsTab({
  escalationsQuery,
  reopenedQuery,
}: {
  escalationsQuery: ReturnType<typeof useQuery>;
  reopenedQuery: ReturnType<typeof useQuery>;
}) {
  const escalations = escalationsQuery.data as Awaited<ReturnType<typeof fetchEscalationsReport>> | undefined;
  const reopened = reopenedQuery.data as Awaited<ReturnType<typeof fetchReopenedReport>> | undefined;

  return (
    <div className="space-y-4">
      <SectionCard title="Reopened tickets">
        {reopenedQuery.isLoading ? (
          <TableSkeleton rows={4} cols={4} />
        ) : reopenedQuery.isError ? (
          <ReportError />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-2">
              <KpiCard label="Total reopened" value={reopened?.summary.totalReopened ?? 0} />
              <KpiCard label="Reopen rate" value={`${reopened?.summary.reopenRate ?? 0}%`} />
            </div>
            <TicketListTable tickets={reopened?.tickets ?? []} />
          </>
        )}
      </SectionCard>

      <SectionCard title="Escalation analytics">
        {escalationsQuery.isLoading ? (
          <TableSkeleton rows={4} cols={4} />
        ) : escalationsQuery.isError ? (
          <ReportError />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
              <KpiCard label="Total escalations" value={escalations?.summary.total ?? 0} to="/admin/tickets" search={drilldownByTag("escalated")} />
              <KpiCard label="Pending" value={escalations?.summary.pending ?? 0} tone="warning" />
              <KpiCard label="Resolved" value={escalations?.summary.resolved ?? 0} tone="success" />
              <KpiCard label="Critical" value={escalations?.summary.critical ?? 0} tone="danger" />
            </div>
            <TicketListTable tickets={escalations?.tickets ?? []} />
          </>
        )}
      </SectionCard>
    </div>
  );
}

function TicketListTable({
  tickets,
}: {
  tickets: {
    ticketId: string;
    number: string;
    subject: string;
    status: string;
    priority: string;
    agentName: string;
    customerName: string;
    categoryName: string;
    projectName: string;
  }[];
}) {
  if (!tickets.length) return <ReportEmpty />;
  return (
    <Table className="min-w-4xl">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {["Ticket", "Customer", "Project", "Agent", "Priority", "Status", "Category"].map((h) => (
            <DataTableHead key={h}>{h}</DataTableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((t) => (
          <TableRow key={t.ticketId}>
            <TableCell>
              <PrimaryCell id={t.number} title={t.subject} to="/admin/tickets/$ticketId" params={{ ticketId: t.ticketId }} />
            </TableCell>
            <TableCell>{t.customerName}</TableCell>
            <TableCell>{t.projectName}</TableCell>
            <TableCell>{t.agentName}</TableCell>
            <TableCell><PriorityBadge priority={t.priority} /></TableCell>
            <TableCell><StatusBadge status={t.status} /></TableCell>
            <TableCell>{t.categoryName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
