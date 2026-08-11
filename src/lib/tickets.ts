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
  const { data } = await api.get<ApiResponse<TicketEvent[]>>(`/tickets/${ticketId}/events`);
  return data.data;
}

export async function fetchTicketActivities(ticketId: string) {
  const { data } = await api.get<ApiResponse<TicketActivity[]>>(`/tickets/${ticketId}/activities`);
  return data.data;
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
  date: string;
  action: string;
  performer: string;
  details: string;
  slaState?: SlaDisplayState;
};

export function buildSlaHistoryEntries(cycles: TicketSlaCycleHistory[]): TicketHistoryEntry[] {
  const entries: TicketHistoryEntry[] = [];

  for (const cycle of cycles) {
    entries.push({
      id: `sla-${cycle._id}-start`,
      kind: "sla",
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
  events: TicketEvent[],
  sla?: TicketSlaSummary | null,
): TicketHistoryEntry[] {
  const eventEntries: TicketHistoryEntry[] = events.map((event) => ({
    id: event._id,
    kind: "event",
    date: event.createdAt,
    action: "Update",
    performer: getTicketUserLabel(event.actorId),
    details: event.description,
  }));

  const slaEntries = buildSlaHistoryEntries(sla?.history ?? []);

  return [...eventEntries, ...slaEntries].sort(
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
  if (activity.action === "Status Changed" && activity.newValue?.status) {
    return `Status changed to ${String(activity.newValue.status)}`;
  }
  if (activity.action === "Priority Changed" && activity.newValue?.priority) {
    return `Priority changed to ${String(activity.newValue.priority)}`;
  }
  return activity.action;
}
