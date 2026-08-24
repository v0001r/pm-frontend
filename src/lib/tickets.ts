import { api } from "./api";
import type {
  ApiResponse,
  CreateTicketPayload,
  PaginatedResult,
  TicketActivity,
  TicketEvent,
  TicketMessage,
  TicketQueryParams,
  TicketRecord,
  TicketSlaCycleHistory,
  TicketSlaSummary,
  TicketUserRef,
  TransitionTicketPayload,
  UpdateTicketPayload,
} from "./types";
import { fullName } from "./types";

export type SlaDisplayState = "On Track" | "Approaching" | "Breached" | "Met";

export async function fetchTickets(params?: TicketQueryParams) {
  const { data } = await api.get<ApiResponse<PaginatedResult<TicketRecord> | TicketRecord[]>>("/tickets", {
    params,
  });
  return data.data;
}

export async function fetchTicketsPage(params: TicketQueryParams) {
  const result = await fetchTickets({ page: 1, limit: 20, ...params });
  if (Array.isArray(result)) {
    return {
      items: result,
      meta: { page: 1, limit: result.length, total: result.length, totalPages: 1 },
    } satisfies PaginatedResult<TicketRecord>;
  }
  return result;
}

export async function fetchTicket(id: string) {
  const { data } = await api.get<ApiResponse<TicketRecord>>(`/tickets/${id}`);
  return data.data;
}

export async function createTicket(payload: CreateTicketPayload) {
  const { data } = await api.post<ApiResponse<TicketRecord>>("/tickets", payload);
  return data.data;
}

export async function updateTicket(id: string, payload: UpdateTicketPayload) {
  const { data } = await api.patch<ApiResponse<TicketRecord>>(`/tickets/${id}`, payload);
  return data.data;
}

export async function transitionTicket(id: string, payload: TransitionTicketPayload) {
  const { data } = await api.post<ApiResponse<TicketRecord>>(`/tickets/${id}/transition`, payload);
  return data.data;
}

export async function fetchTicketMessages(ticketId: string) {
  const { data } = await api.get<ApiResponse<TicketMessage[]>>(`/tickets/${ticketId}/messages`);
  return data.data;
}

export async function postTicketMessage(
  ticketId: string,
  body: string,
  isInternal = false,
  attachments: { name: string; size: string; url: string; key: string; contentType?: string }[] = [],
) {
  const { data } = await api.post<ApiResponse<TicketMessage>>(`/tickets/${ticketId}/messages`, {
    body,
    isInternal,
    attachments,
  });
  return data.data;
}

export async function fetchTicketEvents(ticketId: string) {
  const { data } = await api.get<ApiResponse<TicketEvent[] | PaginatedResult<TicketEvent>>>(
    `/tickets/${ticketId}/events`,
  );
  const payload = data.data;
  return Array.isArray(payload) ? payload : (payload?.items ?? []);
}

export async function fetchTicketActivities(ticketId: string) {
  const { data } = await api.get<ApiResponse<TicketActivity[] | PaginatedResult<TicketActivity>>>(
    `/tickets/${ticketId}/activities`,
  );
  const payload = data.data;
  return Array.isArray(payload) ? payload : (payload?.items ?? []);
}

export function mapSlaStatus(status?: string | null): SlaDisplayState {
  switch (status) {
    case "Within SLA":
      return "On Track";
    case "Near Breach":
      return "Approaching";
    case "Breached":
      return "Breached";
    case "Met":
      return "Met";
    default:
      return "On Track";
  }
}

export function getTicketSlaState(ticket: TicketRecord): SlaDisplayState {
  if (ticket.status === "Resolved" || ticket.status === "Closed") return "Met";
  const slaStatus = ticket.sla?.resolutionSlaStatus ?? ticket.sla?.assignmentSlaStatus;
  if (slaStatus) return mapSlaStatus(slaStatus);
  if (!ticket.dueAt) return "On Track";
  const left = new Date(ticket.dueAt).getTime() - Date.now();
  if (left < 0) return "Breached";
  if (left < 4 * 60 * 60 * 1000) return "Approaching";
  return "On Track";
}

export function getTicketSlaDueAt(ticket: TicketRecord) {
  return ticket.sla?.resolutionSlaDueAt ?? ticket.sla?.assignmentSlaDueAt ?? ticket.dueAt ?? null;
}

export type TicketHistoryEntry = {
  id: string;
  kind: "event" | "sla";
  type: string;
  date: string;
  action: string;
  performer: string;
  details: string;
  slaState?: SlaDisplayState;
};

function historyAssigneeLabel(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return getTicketUserLabel(value as TicketUserRef);
  }
  return String(value);
}

function splitHistoryTypeAction(type: string, action: string) {
  const trimmedAction = action.trim();
  if (trimmedAction.toLowerCase() === type.toLowerCase()) {
    return { type, action: trimmedAction };
  }
  const prefix = new RegExp(`^${type}\\s+`, "i");
  if (prefix.test(trimmedAction)) {
    const rest = trimmedAction.replace(prefix, "").trim();
    if (rest) return { type, action: rest };
  }
  return { type, action: trimmedAction };
}

function activityToHistoryEntry(activity: TicketActivity): TicketHistoryEntry {
  const rawAction = activity.action || "Update";
  const newValue = activity.newValue ?? {};
  const oldValue = activity.oldValue ?? {};
  let type = "Update";
  let action = rawAction;
  let details = "";

  if (/status/i.test(rawAction)) {
    type = "Status";
    const status = newValue["status"];
    action = status ? `Changed to ${String(status)}` : rawAction;
    details = oldValue["status"] ? `Previously ${String(oldValue["status"])}` : "";
  } else if (/priority/i.test(rawAction)) {
    type = "Priority";
    const priority = newValue["priority"];
    action = priority ? `Changed to ${String(priority)}` : rawAction;
    details = oldValue["priority"] ? `Previously ${String(oldValue["priority"])}` : "";
  } else if (/assign/i.test(rawAction)) {
    type = "Assignment";
    const assignee = historyAssigneeLabel(newValue["assignedTo"] ?? newValue["assigneeName"] ?? newValue["name"]);
    action = assignee ? `Assigned to ${assignee}` : rawAction;
    const previous = historyAssigneeLabel(oldValue["assignedTo"] ?? oldValue["assigneeName"]);
    details = previous ? `Previously ${previous}` : "";
  } else if (/comment|note|message/i.test(rawAction)) {
    type = "Comment";
    action = /internal/i.test(rawAction) ? "Internal Note Added" : rawAction;
  } else if (/subject/i.test(rawAction)) {
    type = "Subject";
    action = newValue["subject"] ? `Changed to ${String(newValue["subject"])}` : rawAction;
  } else {
    action = activityDescription(activity);
  }

  const split = splitHistoryTypeAction(type, action);

  return {
    id: activity._id,
    kind: "event",
    type: split.type,
    date: activity.createdAt,
    action: split.action,
    performer: getTicketUserLabel(activity.actorId),
    details: details || "—",
  };
}

function eventToHistoryEntry(event: TicketEvent): TicketHistoryEntry {
  const text = event.description?.trim() || "Update";
  let type = "Update";
  let action = text;

  if (/status/i.test(text)) {
    type = "Status";
    const match = text.match(/to\s+(.+)$/i);
    action = match?.[1] ? `Changed to ${match[1].trim()}` : text;
  } else if (/priority/i.test(text)) {
    type = "Priority";
    const match = text.match(/to\s+(.+)$/i);
    action = match?.[1] ? `Changed to ${match[1].trim()}` : text;
  } else if (/assign/i.test(text)) {
    type = "Assignment";
    action = /assigned to/i.test(text) ? text.replace(/^.*?(Assigned to)/i, "Assigned to") : text;
  } else if (/internal note|comment/i.test(text)) {
    type = "Comment";
    action = /internal/i.test(text) ? "Internal Note Added" : text;
  }

  const split = splitHistoryTypeAction(type, action);

  return {
    id: event._id,
    kind: "event",
    type: split.type,
    date: event.createdAt,
    action: split.action,
    performer: getTicketUserLabel(event.actorId),
    details: text,
  };
}

function historyFingerprint(entry: TicketHistoryEntry) {
  return `${entry.date}|${entry.type}|${entry.action}|${entry.performer}`;
}

export function dedupeHistoryEntries(entries: TicketHistoryEntry[]) {
  const seenIds = new Set<string>();
  const seenFingerprints = new Set<string>();
  return entries.filter((entry) => {
    if (entry.id) {
      if (seenIds.has(entry.id)) return false;
      seenIds.add(entry.id);
    }
    const fingerprint = historyFingerprint(entry);
    if (seenFingerprints.has(fingerprint)) return false;
    seenFingerprints.add(fingerprint);
    return true;
  });
}

export function buildSlaHistoryEntries(cycles: TicketSlaCycleHistory[]): TicketHistoryEntry[] {
  const entries: TicketHistoryEntry[] = [];

  for (const cycle of cycles) {
    entries.push({
      id: `sla-${cycle._id}-start`,
      kind: "sla",
      type: "SLA",
      date: cycle.startedAt,
      action: `SLA cycle ${cycle.cycleNumber} started`,
      performer: "System",
      details: `Assignment target due by ${formatSlaTimestamp(cycle.assignmentSlaDueAt)}`,
    });

    if (cycle.assignmentSlaMetAt) {
      const assignmentState = mapSlaStatus(cycle.assignmentSlaStatus);
      entries.push({
        id: `sla-${cycle._id}-assignment`,
        kind: "sla",
        type: "SLA",
        date: cycle.assignmentSlaMetAt,
        action: `Assignment SLA ${assignmentState}`,
        performer: "System",
        details: [
          `Target was ${formatSlaTimestamp(cycle.assignmentSlaDueAt)}`,
          cycle.resolutionSlaDueAt ? `Resolution target set to ${formatSlaTimestamp(cycle.resolutionSlaDueAt)}` : null,
        ]
          .filter(Boolean)
          .join(" · "),
        slaState: assignmentState,
      });
    }

    if (cycle.resolutionSlaMetAt) {
      const resolutionState = mapSlaStatus(cycle.resolutionSlaStatus);
      entries.push({
        id: `sla-${cycle._id}-resolution`,
        kind: "sla",
        type: "SLA",
        date: cycle.resolutionSlaMetAt,
        action: `Resolution SLA ${resolutionState}`,
        performer: "System",
        details: cycle.resolutionSlaDueAt
          ? `Target was ${formatSlaTimestamp(cycle.resolutionSlaDueAt)}`
          : "Ticket closed",
        slaState: resolutionState,
      });
    }

    if (cycle.endedAt) {
      entries.push({
        id: `sla-${cycle._id}-ended`,
        kind: "sla",
        type: "SLA",
        date: cycle.endedAt,
        action: `SLA cycle ${cycle.cycleNumber} closed`,
        performer: "System",
        details: "SLA tracking ended for this cycle",
      });
    }
  }

  return entries;
}

export function mergeTicketHistory(
  activities: TicketActivity[],
  events: TicketEvent[] = [],
): TicketHistoryEntry[] {
  const fromActivities = activities.map(activityToHistoryEntry);
  const source = fromActivities.length > 0 ? fromActivities : events.map(eventToHistoryEntry);

  return dedupeHistoryEntries(source).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function formatSlaTimestamp(value?: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTicketProjectLabel(ticket: TicketRecord) {
  if (!ticket.projectId) return "—";
  if (typeof ticket.projectId === "string") return ticket.projectId;
  return ticket.projectId.name ?? ticket.projectId.projectId ?? "—";
}

export function getTicketCategoryLabel(ticket: TicketRecord) {
  if (typeof ticket.categoryId === "string") return ticket.categoryId;
  return ticket.categoryId.name ?? "—";
}

export function getTicketUserLabel(user: string | TicketUserRef | null | undefined) {
  if (!user) return "—";
  if (typeof user === "string") return user;
  return fullName(user);
}

export function getTicketUserId(user: string | TicketUserRef | null | undefined) {
  if (!user) return null;
  return typeof user === "string" ? user : user._id;
}

export function activityDescription(activity: TicketActivity) {
  if (activity.action === "Status Changed" && activity.newValue?.["status"]) {
    return `Status changed to ${String(activity.newValue["status"])}`;
  }
  if (activity.action === "Priority Changed" && activity.newValue?.["priority"]) {
    return `Priority changed to ${String(activity.newValue["priority"])}`;
  }
  return activity.action;
}
