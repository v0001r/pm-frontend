import { api } from "./api";
import { formatDashboardInputDate, type DashboardQueryParams } from "./dashboard";
import type { ApiResponse } from "./types";

export type ReportGranularity = "daily" | "weekly" | "monthly";

export type ReportExportSection =
  | "overview"
  | "ticket-analytics"
  | "sla"
  | "agents"
  | "workload"
  | "customers"
  | "projects"
  | "categories"
  | "reopened"
  | "escalations";

export type ReportsQueryParams = DashboardQueryParams & {
  assignmentGroupId?: string;
  status?: string;
  priority?: string;
  categoryId?: string;
  tag?: string;
  granularity?: ReportGranularity;
};

export type ReportKpiMetric = {
  value: number;
  trend?: number | null;
  formatted?: string | null;
};

export type ReportsOverviewData = {
  kpis: {
    totalTickets: ReportKpiMetric;
    openTickets: ReportKpiMetric;
    backlog: ReportKpiMetric;
    resolvedTickets: ReportKpiMetric;
    resolutionRate: ReportKpiMetric;
    slaCompliance: ReportKpiMetric;
    slaBreaches: ReportKpiMetric;
    avgFirstResponse: ReportKpiMetric;
    avgResolutionTime: ReportKpiMetric;
    reopenedTickets: ReportKpiMetric;
    escalations: ReportKpiMetric;
  };
  createdVsResolved: { created: number; resolved: number; netChange: number };
  volumeTrend: { label: string; created: number; resolved: number; closed: number; reopened: number }[];
  backlog: {
    current: number;
    open: number;
    overdue: number;
    unassigned: number;
    aging: { key: string; label: string; minHours: number; maxHours: number | null; count: number }[];
  };
  statusFunnel: { status: string; count: number }[];
  peakHours: { hour: number; count: number }[] | null;
  peakDays: { day: string; count: number }[] | null;
  filters: { dateFrom: string; dateTo: string };
};

export type TicketAnalyticsData = {
  summary: { created: number; resolved: number; closed: number; reopened: number; netChange: number };
  trend: ReportsOverviewData["volumeTrend"];
  filters: { dateFrom: string; dateTo: string };
};

export type AgentPerformanceRow = {
  agentId: string;
  name: string;
  assigned: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  slaPercent: number;
  avgFirstResponseMinutes: number | null;
  avgFirstResponseFormatted: string | null;
  avgResolutionMinutes: number | null;
  avgResolutionFormatted: string | null;
  reopened: number;
  escalations: number;
  workload: "Healthy" | "Busy" | "Overloaded";
};

export type WorkloadData = {
  agents: { agentId: string; name: string; open: number; slaBreaches: number; workload: string }[];
  grouped: { healthy: unknown[]; busy: unknown[]; overloaded: unknown[] };
  unassigned: number;
  thresholds: { healthyMax: number; busyMax: number };
  filters: { dateFrom: string; dateTo: string };
};

export type CustomerAnalyticsRow = {
  customerId: string;
  name: string;
  total: number;
  open: number;
  resolved: number;
  slaBreaches: number;
  avgFirstResponseMinutes: number | null;
  avgFirstResponseFormatted: string | null;
  avgResolutionMinutes: number | null;
  avgResolutionFormatted: string | null;
  reopened: number;
  escalations: number;
  health: string | null;
};

export type ProjectAnalyticsRow = {
  projectId: string;
  name: string;
  customerId: string;
  customerName: string;
  total: number;
  open: number;
  resolved: number;
  slaPercent: number;
  avgResponseMinutes: number | null;
  avgResponseFormatted: string | null;
  avgResolutionMinutes: number | null;
  avgResolutionFormatted: string | null;
  reopened: number;
};

export type CategoryAnalyticsRow = {
  categoryId: string;
  name: string;
  volume: number;
  open: number;
  resolved: number;
  slaPercent: number;
  avgResponseMinutes: number | null;
  avgResponseFormatted: string | null;
  avgResolutionMinutes: number | null;
  avgResolutionFormatted: string | null;
  reopened: number;
};

export type PriorityAnalyticsRow = {
  priority: string;
  label: string;
  volume: number;
  open: number;
  resolved: number;
  slaBreaches: number;
  avgResolutionMinutes: number | null;
  avgResolutionFormatted: string | null;
};

export type ReopenedReportData = {
  summary: { totalReopened: number; reopenRate: number };
  breakdown: {
    byAgent: { id: string; count: number }[];
    byCustomer: { id: string; count: number }[];
    byCategory: { id: string; count: number }[];
    byPriority: { id: string; count: number }[];
    byProject: { id: string; count: number }[];
  };
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
    createdAt: string;
  }[];
  filters: { dateFrom: string; dateTo: string };
};

export type EscalationsReportData = {
  summary: { total: number; pending: number; resolved: number; critical: number };
  breakdown: {
    byAgent: { id: string; count: number }[];
    byCategory: { id: string; count: number }[];
    byCustomer: { id: string; count: number }[];
    byPriority: { id: string; count: number }[];
    byProject: { id: string; count: number }[];
  };
  tickets: ReopenedReportData["tickets"];
  filters: { dateFrom: string; dateTo: string };
};

export type ReportTab =
  | "overview"
  | "ticket-analytics"
  | "agents"
  | "workload"
  | "customers"
  | "projects"
  | "categories"
  | "escalations"
  | "custom";

export const REPORT_TABS: { id: ReportTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "ticket-analytics", label: "Ticket Analytics" },
  { id: "agents", label: "Agent Performance" },
  { id: "workload", label: "Workload" },
  { id: "customers", label: "Customer Analytics" },
  { id: "projects", label: "Project Analytics" },
  { id: "categories", label: "Category & Priority" },
  { id: "escalations", label: "Escalations" },
  { id: "custom", label: "Custom Reports" },
];

export type DateShortcut = "today" | "7d" | "30d" | "90d" | "year" | "custom";

export function dateRangeFromShortcut(shortcut: DateShortcut): { dateFrom: string; dateTo: string } {
  const dateTo = new Date();
  const dateFrom = new Date();
  switch (shortcut) {
    case "today":
      break;
    case "7d":
      dateFrom.setDate(dateFrom.getDate() - 6);
      break;
    case "30d":
      dateFrom.setDate(dateFrom.getDate() - 29);
      break;
    case "90d":
      dateFrom.setDate(dateFrom.getDate() - 89);
      break;
    case "year":
      dateFrom.setMonth(0, 1);
      break;
    default:
      dateFrom.setDate(dateFrom.getDate() - 29);
  }
  return { dateFrom: formatDashboardInputDate(dateFrom), dateTo: formatDashboardInputDate(dateTo) };
}

export function buildReportsParams(filters: ReportsFilterState): ReportsQueryParams {
  const params: ReportsQueryParams = {
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
  };
  if (filters.customerId !== "all") params.customerId = filters.customerId;
  if (filters.projectId !== "all") params.projectId = filters.projectId;
  if (filters.assignedTo !== "all") params.assignedTo = filters.assignedTo;
  if (filters.assignmentGroupId !== "all") params.assignmentGroupId = filters.assignmentGroupId;
  if (filters.status !== "all") params.status = filters.status;
  if (filters.priority !== "all") params.priority = filters.priority;
  if (filters.categoryId !== "all") params.categoryId = filters.categoryId;
  if (filters.tag !== "all") params.tag = filters.tag;
  if (filters.granularity) params.granularity = filters.granularity;
  return params;
}

export type ReportsFilterState = {
  customerId: string;
  projectId: string;
  assignedTo: string;
  assignmentGroupId: string;
  status: string;
  priority: string;
  categoryId: string;
  tag: string;
  dateFrom: string;
  dateTo: string;
  dateShortcut: DateShortcut;
  granularity: ReportGranularity;
};

export function defaultReportsFilters(): ReportsFilterState {
  const range = dateRangeFromShortcut("30d");
  return {
    customerId: "all",
    projectId: "all",
    assignedTo: "all",
    assignmentGroupId: "all",
    status: "all",
    priority: "all",
    categoryId: "all",
    tag: "all",
    dateFrom: range.dateFrom,
    dateTo: range.dateTo,
    dateShortcut: "30d",
    granularity: "daily",
  };
}

export async function fetchReportsOverview(params: ReportsQueryParams) {
  const { data } = await api.get<ApiResponse<ReportsOverviewData>>("/reports/overview", { params });
  return data.data;
}

export async function fetchTicketAnalytics(params: ReportsQueryParams) {
  const { data } = await api.get<ApiResponse<TicketAnalyticsData>>("/reports/ticket-analytics", { params });
  return data.data;
}

export async function fetchAgentPerformance(params: ReportsQueryParams) {
  const { data } = await api.get<ApiResponse<{ agents: AgentPerformanceRow[] }>>("/reports/agents", { params });
  return data.data;
}

export async function fetchWorkloadReport(params: ReportsQueryParams) {
  const { data } = await api.get<ApiResponse<WorkloadData>>("/reports/workload", { params });
  return data.data;
}

export async function fetchCustomerAnalytics(params: ReportsQueryParams) {
  const { data } = await api.get<ApiResponse<{ customers: CustomerAnalyticsRow[] }>>("/reports/customers", { params });
  return data.data;
}

export async function fetchProjectAnalytics(params: ReportsQueryParams) {
  const { data } = await api.get<ApiResponse<{ projects: ProjectAnalyticsRow[] }>>("/reports/projects", { params });
  return data.data;
}

export async function fetchCategoryPriorityAnalytics(params: ReportsQueryParams) {
  const { data } = await api.get<ApiResponse<{ categories: CategoryAnalyticsRow[]; priorities: PriorityAnalyticsRow[] }>>(
    "/reports/categories-priorities",
    { params },
  );
  return data.data;
}

export async function fetchReopenedReport(params: ReportsQueryParams) {
  const { data } = await api.get<ApiResponse<ReopenedReportData>>("/reports/reopened", { params });
  return data.data;
}

export async function fetchEscalationsReport(params: ReportsQueryParams) {
  const { data } = await api.get<ApiResponse<EscalationsReportData>>("/reports/escalations", { params });
  return data.data;
}

export async function exportReportCsv(section: ReportExportSection, params: ReportsQueryParams) {
  const response = await api.get("/reports/export", {
    params: { ...params, section, format: "csv" },
    responseType: "blob",
  });
  const blob = response.data as Blob;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `report-${section}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
