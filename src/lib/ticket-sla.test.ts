import { describe, expect, it } from "vitest";
import {
  buildSlaClockView,
  formatSlaClockText,
  getResolutionFreezeAtMs,
  getSlaWorkflowLabel,
  slaHasRule,
} from "./ticket-sla";
import type { TicketRecord } from "./types";

function ticket(overrides: Partial<TicketRecord> = {}): TicketRecord {
  return {
    _id: "t1",
    number: "TKT-001",
    subject: "Test",
    description: "Desc",
    clientId: "c1",
    categoryId: "cat1",
    priority: "P2",
    status: "New",
    createdAt: "2026-08-24T08:00:00.000Z",
    updatedAt: "2026-08-24T08:00:00.000Z",
    ...overrides,
  };
}

describe("SLA workflow labels", () => {
  it("marks cancelled tickets as Cancelled", () => {
    expect(getSlaWorkflowLabel(ticket({ status: "Cancelled" }))).toBe("Cancelled");
  });

  it("does not count SLA for requester close or resolve while unassigned", () => {
    expect(getSlaWorkflowLabel(ticket({ status: "Closed" }))).toBe("Closed by Requester");
    expect(getSlaWorkflowLabel(ticket({ status: "Resolved" }))).toBe("Resolved by Requester");
  });

  it("freezes resolved tickets against freeze time, not close time", () => {
    const resolved = ticket({
      status: "Resolved",
      assignedTo: "u1",
      resolvedAt: "2026-08-24T09:00:00.000Z",
      sla: {
        cycleNumber: 1,
        resolutionSlaDueAt: "2026-08-24T12:00:00.000Z",
        slaResolutionFrozenAt: "2026-08-24T09:00:00.000Z",
      },
    });
    expect(getSlaWorkflowLabel(resolved)).toBe("Resolved Within SLA");
    expect(getResolutionFreezeAtMs(resolved)).toBe(Date.parse("2026-08-24T09:00:00.000Z"));
  });

  it("marks live tickets breached after the resolution deadline", () => {
    expect(
      getSlaWorkflowLabel(
        ticket({
          status: "In Progress",
          assignedTo: "u1",
          sla: { cycleNumber: 1, resolutionSlaDueAt: "2026-08-24T10:00:00.000Z" },
        }),
        Date.parse("2026-08-24T11:00:00.000Z"),
      ),
    ).toBe("Breached");
  });

  it("keeps live tickets Active while the resolution clock is running", () => {
    expect(
      getSlaWorkflowLabel(
        ticket({
          status: "Assigned",
          assignedTo: "u1",
          sla: { cycleNumber: 1, resolutionSlaDueAt: "2026-08-24T12:00:00.000Z" },
        }),
        Date.parse("2026-08-24T10:00:00.000Z"),
      ),
    ).toBe("Active");
  });
});

describe("SLA clocks", () => {
  it("shows Assignment complete after the first assignee", () => {
    const view = buildSlaClockView({
      kind: "assignment",
      ticket: ticket({
        status: "Assigned",
        assignedTo: "u1",
        sla: { cycleNumber: 1, assignmentSlaDueAt: null, resolutionSlaDueAt: "2026-08-24T12:00:00.000Z" },
      }),
      workflow: "Active",
      nowMs: Date.parse("2026-08-24T09:00:00.000Z"),
      hasRule: true,
    });
    expect(view.text).toBe("Assignment complete");
    expect(view.ticking).toBe(false);
  });

  it("does not restart resolution text from assign time", () => {
    const view = buildSlaClockView({
      kind: "resolution",
      ticket: ticket({
        status: "Assigned",
        assignedTo: "u1",
        sla: { cycleNumber: 1, resolutionSlaDueAt: "2026-08-24T12:00:00.000Z" },
      }),
      workflow: "Active",
      nowMs: Date.parse("2026-08-24T10:00:00.000Z"),
      hasRule: true,
    });
    expect(view.text).toBe("02h 00m 00s remaining");
  });

  it("uses freeze time for resolved tickets", () => {
    const view = buildSlaClockView({
      kind: "resolution",
      ticket: ticket({
        status: "Resolved",
        assignedTo: "u1",
        resolvedAt: "2026-08-24T09:30:00.000Z",
        sla: {
          cycleNumber: 1,
          resolutionSlaDueAt: "2026-08-24T12:00:00.000Z",
          slaResolutionFrozenAt: "2026-08-24T09:30:00.000Z",
        },
      }),
      workflow: "Resolved Within SLA",
      nowMs: Date.parse("2026-08-24T18:00:00.000Z"),
      hasRule: true,
    });
    expect(view.text).toBe("Resolved in 02h 30m");
    expect(view.ticking).toBe(false);
  });

  it("shows N/A when the requester closes an unassigned ticket", () => {
    const view = buildSlaClockView({
      kind: "resolution",
      ticket: ticket({ status: "Closed" }),
      workflow: "Closed by Requester",
      nowMs: Date.parse("2026-08-24T09:00:00.000Z"),
      hasRule: true,
    });
    expect(view.text).toBe("N/A");
  });

  it("formats running and exceeded copy", () => {
    expect(
      formatSlaClockText({
        deadlineMs: Date.parse("2026-08-24T12:00:00.000Z"),
        compareAtMs: Date.parse("2026-08-24T10:00:00.000Z"),
        frozen: false,
      }),
    ).toBe("02h 00m 00s remaining");
    expect(
      formatSlaClockText({
        deadlineMs: Date.parse("2026-08-24T12:00:00.000Z"),
        compareAtMs: Date.parse("2026-08-24T13:15:00.000Z"),
        frozen: false,
      }),
    ).toBe("Exceeded by 01h 15m 00s");
  });

  it("requires a policy or ticket deadlines before treating SLA as configured", () => {
    expect(slaHasRule(ticket({ sla: { cycleNumber: 1 } }))).toBe(false);
    expect(
      slaHasRule(
        ticket({ sla: { cycleNumber: 1, resolutionSlaDueAt: "2026-08-24T12:00:00.000Z" } }),
      ),
    ).toBe(true);
  });
});
