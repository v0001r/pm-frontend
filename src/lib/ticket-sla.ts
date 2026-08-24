import type { SlaPolicy } from "./sla";
import { formatSlaMinutes } from "./sla";
import { extractRecordId, type TicketRecord, type TicketSlaCycleHistory } from "./types";

/** Workflow labels for ticket details / SLA History. Listing badges stay On Track / Approaching / Breached / Met. */
export type SlaWorkflowLabel =
  | "Active"
  | "Breached"
  | "Resolved Within SLA"
  | "Closed Within SLA"
  | "Cancelled"
  | "Closed by Requester"
  | "Resolved by Requester"
  | "Stopped"
  | "No SLA rule";

export type SlaClockKind = "assignment" | "resolution";

export interface SlaClockView {
  kind: SlaClockKind;
  title: string;
  text: string;
  dueAt: string | null;
  statusLabel: string;
  ticking: boolean;
}

const TERMINAL_WORKFLOW: SlaWorkflowLabel[] = [
  "Stopped",
  "Cancelled",
  "Closed by Requester",
  "Resolved by Requester",
  "Resolved Within SLA",
  "Closed Within SLA",
];

const FROZEN_STATUSES = new Set(["Resolved", "Closed", "Cancelled"]);

export function parseSlaTime(value?: string | number | null): number | null {
  if (value == null || value === "") return null;
  const ms = typeof value === "number" ? value : Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

export function ticketIsAssigned(ticket: TicketRecord) {
  return Boolean(extractRecordId(ticket.assignedTo));
}

export function getResolutionFreezeAtMs(ticket: TicketRecord): number | null {
  const sla = ticket.sla;
  const fromSla =
    parseSlaTime(sla?.slaResolutionFrozenAt) ?? parseSlaTime(sla?.pendingApprovalAt) ?? parseSlaTime(sla?.resolutionSlaMetAt);
  if (fromSla != null) return fromSla;
  if (!FROZEN_STATUSES.has(ticket.status)) return null;
  return parseSlaTime(ticket.resolvedAt) ?? parseSlaTime(ticket.closedAt) ?? parseSlaTime(ticket.updatedAt);
}

export function formatSlaHms(ms: number, withSeconds = true) {
  const totalSec = Math.max(0, Math.floor(Math.abs(ms) / 1000));
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return withSeconds ? `${hh}h ${mm}m ${ss}s` : `${hh}h ${mm}m`;
}

export function formatSlaClockText(options: {
  deadlineMs: number | null;
  compareAtMs: number;
  frozen: boolean;
  na?: boolean;
  cancelled?: boolean;
  assignmentComplete?: boolean;
}) {
  if (options.na) return "N/A";
  if (options.cancelled) return "Cancelled";
  if (options.assignmentComplete) return "Assignment complete";
  if (options.deadlineMs == null) return "—";

  const delta = options.deadlineMs - options.compareAtMs;
  if (options.frozen) {
    if (delta >= 0) return `Resolved in ${formatSlaHms(delta, false)}`;
    return `Exceeded by ${formatSlaHms(delta, false)}`;
  }
  if (delta >= 0) return `${formatSlaHms(delta, true)} remaining`;
  return `Exceeded by ${formatSlaHms(delta, true)}`;
}

export function slaHasRule(ticket: TicketRecord, policy?: SlaPolicy | null) {
  if (policy) return true;
  const sla = ticket.sla;
  if (!sla) return false;
  return Boolean(
    sla.assignmentSlaDueAt ||
      sla.resolutionSlaDueAt ||
      sla.assignmentSlaMinutes ||
      sla.resolutionSlaMinutes ||
      sla.slaResolutionFrozenAt ||
      sla.history?.length,
  );
}

export function noSlaRuleMessage(ticket: TicketRecord) {
  return `No SLA rule found for ${ticket.priority}.`;
}

export function getSlaWorkflowLabel(ticket: TicketRecord, nowMs = Date.now()): SlaWorkflowLabel {
  if (ticket.status === "Cancelled") return "Cancelled";

  const assigned = ticketIsAssigned(ticket);
  if (!assigned && ticket.status === "Closed") return "Closed by Requester";
  if (!assigned && ticket.status === "Resolved") return "Resolved by Requester";

  const stored = (ticket.sla?.slaStatus ?? "").trim();
  if (/^stopped$/i.test(stored)) return "Stopped";

  const resolutionDueMs = parseSlaTime(ticket.sla?.resolutionSlaDueAt);
  const freezeAtMs = getResolutionFreezeAtMs(ticket);
  const frozen = freezeAtMs != null && FROZEN_STATUSES.has(ticket.status);

  const withinAt = (atMs: number) => resolutionDueMs == null || atMs <= resolutionDueMs;

  if (ticket.status === "Resolved" && frozen) {
    return withinAt(freezeAtMs!) ? "Resolved Within SLA" : "Breached";
  }
  if (ticket.status === "Closed" && frozen) {
    return withinAt(freezeAtMs!) ? "Closed Within SLA" : "Breached";
  }

  if (frozen && freezeAtMs != null && resolutionDueMs != null && freezeAtMs > resolutionDueMs) {
    return "Breached";
  }

  if (!frozen && resolutionDueMs != null && nowMs > resolutionDueMs) return "Breached";
  if (ticket.sla?.resolutionSlaStatus === "Breached") return "Breached";
  if (ticket.sla?.breachStatus === 1 || ticket.sla?.breachStatus === true) return "Breached";

  return "Active";
}

export function slaClocksShouldTick(ticket: TicketRecord, workflow: SlaWorkflowLabel) {
  if (TERMINAL_WORKFLOW.includes(workflow)) return false;
  if (workflow !== "Active" && workflow !== "Breached") return false;
  const freezeAtMs = getResolutionFreezeAtMs(ticket);
  if (freezeAtMs != null && FROZEN_STATUSES.has(ticket.status)) return false;
  return true;
}

export function slaClockStatusLabel(options: {
  kind: SlaClockKind;
  workflow: SlaWorkflowLabel;
  assigned: boolean;
  frozen: boolean;
  deadlineMs: number | null;
  compareAtMs: number;
  storedStatus?: string | null;
}) {
  if (options.workflow === "Cancelled") return "Cancelled";
  if (options.workflow === "Closed by Requester" || options.workflow === "Resolved by Requester") return "N/A";
  if (options.kind === "assignment" && options.assigned) return "Assignment complete";
  if (options.deadlineMs == null) return options.storedStatus || "—";
  if (options.compareAtMs > options.deadlineMs) return "Breached";
  if (options.frozen) return "Met";
  return "Active";
}

export function buildSlaClockView(options: {
  kind: SlaClockKind;
  ticket: TicketRecord;
  workflow: SlaWorkflowLabel;
  nowMs: number;
  hasRule: boolean;
}): SlaClockView {
  const assigned = ticketIsAssigned(options.ticket);
  const requesterPath =
    options.workflow === "Closed by Requester" || options.workflow === "Resolved by Requester";
  const cancelled = options.workflow === "Cancelled";
  const freezeAtMs = getResolutionFreezeAtMs(options.ticket);
  const frozenResolution = freezeAtMs != null && FROZEN_STATUSES.has(options.ticket.status);

  if (options.kind === "assignment") {
    const deadlineMs = parseSlaTime(options.ticket.sla?.assignmentSlaDueAt);
    const complete = assigned;
    const compareAtMs = options.nowMs;
    const ticking = options.hasRule && !complete && !requesterPath && !cancelled && deadlineMs != null;
    return {
      kind: "assignment",
      title: "Assignment SLA",
      text: formatSlaClockText({
        deadlineMs,
        compareAtMs,
        frozen: false,
        na: requesterPath || !options.hasRule,
        cancelled,
        assignmentComplete: complete && !requesterPath && !cancelled,
      }),
      dueAt: complete ? null : (options.ticket.sla?.assignmentSlaDueAt ?? null),
      statusLabel: slaClockStatusLabel({
        kind: "assignment",
        workflow: options.workflow,
        assigned,
        frozen: false,
        deadlineMs,
        compareAtMs,
        storedStatus: options.ticket.sla?.assignmentSlaStatus ?? null,
      }),
      ticking,
    };
  }

  const deadlineMs = parseSlaTime(options.ticket.sla?.resolutionSlaDueAt);
  const compareAtMs = frozenResolution && freezeAtMs != null ? freezeAtMs : options.nowMs;
  const ticking = options.hasRule && !frozenResolution && !requesterPath && !cancelled && deadlineMs != null;

  return {
    kind: "resolution",
    title: "Resolution SLA",
    text: formatSlaClockText({
      deadlineMs,
      compareAtMs,
      frozen: frozenResolution,
      na: requesterPath || !options.hasRule,
      cancelled,
    }),
    dueAt: options.ticket.sla?.resolutionSlaDueAt ?? null,
    statusLabel: slaClockStatusLabel({
      kind: "resolution",
      workflow: options.workflow,
      assigned,
      frozen: frozenResolution,
      deadlineMs,
      compareAtMs,
        storedStatus: options.ticket.sla?.resolutionSlaStatus ?? null,
    }),
    ticking,
  };
}

export function slaTargetLabels(ticket: TicketRecord, policy?: SlaPolicy | null) {
  const assignmentMinutes = policy?.assignmentSlaMinutes ?? ticket.sla?.assignmentSlaMinutes;
  const resolutionMinutes = policy?.resolutionSlaMinutes ?? ticket.sla?.resolutionSlaMinutes;
  return {
    assignment: assignmentMinutes ? formatSlaMinutes(assignmentMinutes) : "—",
    resolution: resolutionMinutes ? formatSlaMinutes(resolutionMinutes) : "—",
    matrix:
      assignmentMinutes && resolutionMinutes
        ? `Assign ${formatSlaHoursShort(assignmentMinutes)} / Resolve ${formatSlaHoursShort(resolutionMinutes)}`
        : null,
  };
}

function formatSlaHoursShort(minutes: number) {
  if (minutes % 60 === 0) return `${minutes / 60}hr`;
  return formatSlaMinutes(minutes);
}

export function slaCycleRows(ticket: TicketRecord): TicketSlaCycleHistory[] {
  const history = [...(ticket.sla?.history ?? [])];
  const currentNumber = ticket.sla?.cycleNumber;
  if (!ticket.sla) return history.sort(sortCycles);
  if (currentNumber != null && history.some((cycle) => cycle.cycleNumber === currentNumber)) {
    return history.sort(sortCycles);
  }

  const freezeAtMs = getResolutionFreezeAtMs(ticket);
  history.push({
    _id: ticket.sla.history ? "current-cycle" : `cycle-${currentNumber ?? 1}`,
    cycleNumber: currentNumber ?? 1,
    assignmentSlaDueAt: ticket.sla.assignmentSlaDueAt ?? null,
    assignmentSlaMetAt: ticket.sla.assignmentSlaMetAt ?? null,
    ...(ticket.sla.assignmentSlaStatus ? { assignmentSlaStatus: ticket.sla.assignmentSlaStatus } : {}),
    resolutionSlaDueAt: ticket.sla.resolutionSlaDueAt ?? null,
    resolutionSlaMetAt: ticket.sla.resolutionSlaMetAt ?? null,
    ...(ticket.sla.resolutionSlaStatus ? { resolutionSlaStatus: ticket.sla.resolutionSlaStatus } : {}),
    slaResolutionFrozenAt: ticket.sla.slaResolutionFrozenAt ?? null,
    startedAt: ticket.createdAt,
    endedAt: freezeAtMs ? new Date(freezeAtMs).toISOString() : null,
  });
  return history.sort(sortCycles);
}

function sortCycles(a: TicketSlaCycleHistory, b: TicketSlaCycleHistory) {
  return b.cycleNumber - a.cycleNumber;
}
