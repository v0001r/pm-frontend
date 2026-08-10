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
};

export async function fetchAdminDashboard() {
  const { data } = await api.get<ApiResponse<AdminDashboardData>>("/dashboard/admin");
  return data.data;
}
