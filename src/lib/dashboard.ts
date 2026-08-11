import { api } from "./api";
import type { ApiResponse, TicketRecord } from "./types";

export type DashboardKpiMetric = {
  value: number;
  trend: number;
};

export type DashboardChartPoint = {
  name: string;
  value: number;
};

export type DashboardTrendPoint = {
  day: string;
  created: number;
  resolved: number;
};

export type DashboardQueryParams = {
  customerId?: string;
  projectId?: string;
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type AdminDashboardData = {
  kpis: {
    total: DashboardKpiMetric;
    new: DashboardKpiMetric;
    inProgress: DashboardKpiMetric;
    assigned: DashboardKpiMetric;
    resolved: DashboardKpiMetric;
    closed: DashboardKpiMetric;
    highPriority: DashboardKpiMetric;
    overdue: DashboardKpiMetric;
  };
  charts: {
    trend: DashboardTrendPoint[];
    byStatus: DashboardChartPoint[];
    byPriority: DashboardChartPoint[];
    byCategory: DashboardChartPoint[];
  };
  recentTickets: TicketRecord[];
  filters?: {
    dateFrom: string;
    dateTo: string;
  };
};

export function formatDashboardInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function defaultDashboardDateRange() {
  const dateTo = new Date();
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - 6);
  return {
    dateFrom: formatDashboardInputDate(dateFrom),
    dateTo: formatDashboardInputDate(dateTo),
  };
}

export async function fetchAdminDashboard(params: DashboardQueryParams = {}) {
  const { data } = await api.get<ApiResponse<AdminDashboardData>>("/dashboard/admin", { params });
  return data.data;
}
