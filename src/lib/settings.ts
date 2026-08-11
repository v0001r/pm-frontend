import { api, getApiErrorMessage } from "./api";
import type { ApiResponse, CompanySettings } from "./types";

export type { CompanySettings };

export type NotificationEventKey =
  | "new_ticket"
  | "ticket_reply"
  | "status_change"
  | "ticket_assignment"
  | "ticket_resolution"
  | "sla_breach";

export interface NotificationEventSetting {
  key: NotificationEventKey;
  label: string;
  email: boolean;
}

export interface EmailDeliveryStatus {
  available: boolean;
  mode: "live" | "log-only" | "disabled";
  message: string;
}

export interface NotificationSettings {
  events: NotificationEventSetting[];
  emailDelivery: EmailDeliveryStatus;
  updatedAt?: string;
}

export async function fetchCompanySettings() {
  const { data } = await api.get<ApiResponse<CompanySettings>>("/settings/company");
  return data.data;
}

export async function updateCompanySettings(payload: CompanySettings) {
  const { updatedAt: _updatedAt, ...body } = payload;
  const { data } = await api.patch<ApiResponse<CompanySettings>>("/settings/company", body);
  return data.data;
}

export async function fetchNotificationSettings() {
  const { data } = await api.get<ApiResponse<NotificationSettings>>("/settings/notifications");
  return data.data;
}

export async function updateNotificationSettings(payload: Pick<NotificationSettings, "events">) {
  const { data } = await api.patch<ApiResponse<NotificationSettings>>("/settings/notifications", payload);
  return data.data;
}

export { getApiErrorMessage };
