import { useEffect, useMemo, useRef, useState } from "react";
import type { SlaPolicy } from "./sla";
import {
  buildSlaClockView,
  getSlaWorkflowLabel,
  noSlaRuleMessage,
  slaClocksShouldTick,
  slaCycleRows,
  slaHasRule,
  slaTargetLabels,
  type SlaClockView,
  type SlaWorkflowLabel,
} from "./ticket-sla";
import { buildSlaHistoryEntries } from "./tickets";
import type { TicketRecord } from "./types";

export function useSyncedNow(enabled: boolean, serverNowMs?: number | null) {
  const offsetRef = useRef(0);
  const captured = useRef(false);
  if (serverNowMs != null && !captured.current) {
    offsetRef.current = serverNowMs - Date.now();
    captured.current = true;
  }

  const [wallNow, setWallNow] = useState(() => Date.now());

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => setWallNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [enabled]);

  return wallNow + offsetRef.current;
}

export function useTicketSlaPanel(ticket?: TicketRecord | null, policy?: SlaPolicy | null) {
  const hasRule = ticket ? slaHasRule(ticket, policy) : false;
  const previewWorkflow: SlaWorkflowLabel = ticket ? getSlaWorkflowLabel(ticket) : "Active";
  const shouldTick = Boolean(ticket && hasRule && slaClocksShouldTick(ticket, previewWorkflow));
  const nowMs = useSyncedNow(shouldTick, ticket?.sla?.serverNowMs);

  return useMemo(() => {
    if (!ticket) {
      return {
        hasRule: false,
        noRuleMessage: null as string | null,
        deadlinesPending: false,
        workflow: "Active" as SlaWorkflowLabel,
        cycleNumber: 0,
        reopenedCount: 0,
        targets: { assignment: "—", resolution: "—", matrix: null },
        assignment: {
          kind: "assignment",
          title: "Assignment SLA",
          text: "—",
          dueAt: null,
          statusLabel: "—",
          ticking: false,
        } satisfies SlaClockView,
        resolution: {
          kind: "resolution",
          title: "Resolution SLA",
          text: "—",
          dueAt: null,
          statusLabel: "—",
          ticking: false,
        } satisfies SlaClockView,
        cycles: [],
        events: [],
      };
    }

    const workflow = hasRule ? getSlaWorkflowLabel(ticket, nowMs) : "No SLA rule";
    const cycles = slaCycleRows(ticket);
    const hasDeadlines = Boolean(
      ticket.sla?.assignmentSlaDueAt || ticket.sla?.resolutionSlaDueAt || ticket.sla?.slaResolutionFrozenAt,
    );

    return {
      hasRule,
      noRuleMessage: hasRule ? null : noSlaRuleMessage(ticket),
      deadlinesPending: hasRule && !hasDeadlines && cycles.length === 0,
      workflow,
      cycleNumber: ticket.sla?.cycleNumber ?? 0,
      reopenedCount: ticket.sla?.reopenedCount ?? 0,
      targets: slaTargetLabels(ticket, policy),
      assignment: buildSlaClockView({ kind: "assignment", ticket, workflow, nowMs, hasRule }),
      resolution: buildSlaClockView({ kind: "resolution", ticket, workflow, nowMs, hasRule }),
      cycles,
      events: buildSlaHistoryEntries(cycles),
    };
  }, [ticket, policy, hasRule, nowMs]);
}
