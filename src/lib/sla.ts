import { api } from "./api";
import type { ApiResponse, Priority } from "./types";

export interface SlaPolicy {
  _id: string;
  name: string;
  priority: Priority;
  subscriptionType: string;
  assignmentSlaMinutes: number;
  resolutionSlaMinutes: number;
  isDefault: boolean;
  status: string;
}

export interface UpdateSlaPolicyPayload {
  assignmentSlaMinutes?: number;
  resolutionSlaMinutes?: number;
}

export interface UpdateSlaSettingsPayload {
  policies: Array<{
    priority: Priority;
    assignmentSlaMinutes: number;
    resolutionSlaMinutes: number;
  }>;
}

export async function fetchSlaPolicies() {
  const { data } = await api.get<ApiResponse<SlaPolicy[]>>("/sla-policies");
  return data.data;
}

export async function fetchSlaSettings() {
  const { data } = await api.get<ApiResponse<SlaPolicy[]>>("/settings/sla");
  return data.data;
}

export async function updateSlaSettings(payload: UpdateSlaSettingsPayload) {
  const { data } = await api.patch<ApiResponse<SlaPolicy[]>>("/settings/sla", payload);
  return data.data;
}

export async function updateSlaPolicy(id: string, payload: UpdateSlaPolicyPayload) {
  const { data } = await api.patch<ApiResponse<SlaPolicy>>(`/sla-policies/${id}`, payload);
  return data.data;
}

export function formatSlaMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }
  if (minutes % 60 === 0) {
    const hours = minutes / 60;
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours} ${hours === 1 ? "hour" : "hours"} ${mins} ${mins === 1 ? "minute" : "minutes"}`;
}

export const SLA_HOUR_OPTIONS = [
  0,
  ...Array.from({ length: 24 }, (_, index) => index + 1),
  48,
  72,
] as const;

export const SLA_MINUTE_OPTIONS = [0, 15, 30, 45] as const;

export function snapSlaHours(hours: number) {
  return SLA_HOUR_OPTIONS.reduce((closest, option) =>
    Math.abs(option - hours) < Math.abs(closest - hours) ? option : closest,
  );
}

export function snapSlaMinutes(minutes: number) {
  return SLA_MINUTE_OPTIONS.reduce((closest, option) =>
    Math.abs(option - minutes) < Math.abs(closest - minutes) ? option : closest,
  );
}

export function toSlaMinuteOption(minutes: number) {
  return String(snapSlaMinutes(minutes)).padStart(2, "0");
}

export function fromSlaMinuteOption(value: string) {
  return Number(value);
}

export function splitSlaMinutes(totalMinutes: number) {
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
}

export function combineSlaMinutes(hours: number, minutes: number): number | null {
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  if (!SLA_HOUR_OPTIONS.includes(hours as (typeof SLA_HOUR_OPTIONS)[number])) return null;
  if (!SLA_MINUTE_OPTIONS.includes(minutes as (typeof SLA_MINUTE_OPTIONS)[number])) return null;
  const total = hours * 60 + minutes;
  return total >= 1 ? total : null;
}

export function parseSlaDuration(input: string): number | null {
  const normalized = input.trim().toLowerCase().replace(/\s+/g, " ");
  if (!normalized) return null;

  if (/^\d+(\.\d+)?$/.test(normalized)) {
    const value = Number(normalized);
    return value > 0 ? Math.round(value) : null;
  }

  const hourMatch = normalized.match(/^(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h)$/);
  if (hourMatch) {
    const value = Number(hourMatch[1]) * 60;
    return value > 0 ? Math.round(value) : null;
  }

  const minuteMatch = normalized.match(/^(\d+)\s*(?:minutes?|mins?|m)$/);
  if (minuteMatch) {
    const value = Number(minuteMatch[1]);
    return value > 0 ? value : null;
  }

  return null;
}

export function slaTargetsFromPolicy(policy: SlaPolicy) {
  return {
    response: formatSlaMinutes(policy.assignmentSlaMinutes),
    resolution: formatSlaMinutes(policy.resolutionSlaMinutes),
  };
}

export function findSlaPolicyForPriority(policies: SlaPolicy[] | undefined, priority: Priority) {
  return policies?.find((policy) => policy.priority === priority);
}
