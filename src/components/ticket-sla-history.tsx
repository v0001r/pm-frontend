import { Clock, Timer } from "lucide-react";
import { EmptyState, SlaBadge } from "@/components/primitives";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/store";
import type { SlaClockView, SlaWorkflowLabel } from "@/lib/ticket-sla";
import type { TicketHistoryEntry } from "@/lib/tickets";
import { mapSlaStatus } from "@/lib/tickets";
import type { TicketSlaCycleHistory } from "@/lib/types";
import { cn } from "@/lib/utils";

const workflowStyles: Record<SlaWorkflowLabel, string> = {
  Active: "bg-success/10 text-success border-success/25",
  Breached: "bg-destructive/10 text-destructive border-destructive/20",
  "Resolved Within SLA": "bg-success/10 text-success border-success/25",
  "Closed Within SLA": "bg-muted text-muted-foreground border-border",
  Cancelled: "bg-muted text-muted-foreground border-border",
  "Closed by Requester": "bg-muted text-muted-foreground border-border",
  "Resolved by Requester": "bg-muted text-muted-foreground border-border",
  Stopped: "bg-muted text-muted-foreground border-border",
  "No SLA rule": "bg-warning/10 text-warning border-warning/25",
};

export function SlaWorkflowBadge({ state }: { state: SlaWorkflowLabel | string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold",
        workflowStyles[state as SlaWorkflowLabel] ?? "bg-muted text-muted-foreground border-border",
      )}
    >
      {state}
    </span>
  );
}

export function SlaClockCard({ clock, target }: { clock: SlaClockView; target: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{clock.title}</p>
      <p className="mt-2 text-lg font-semibold tabular-nums tracking-tight text-foreground">{clock.text}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <SlaWorkflowBadge state={clock.statusLabel} />
        {clock.dueAt ? (
          <span className="text-muted-foreground">Due {formatDate(clock.dueAt, true)}</span>
        ) : null}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Target {target}</p>
    </div>
  );
}

export function TicketSlaHistorySection({
  workflow,
  hasRule,
  noRuleMessage,
  deadlinesPending,
  cycleNumber,
  reopenedCount,
  matrix,
  assignment,
  resolution,
  assignmentTarget,
  resolutionTarget,
  cycles,
  events,
}: {
  workflow: SlaWorkflowLabel;
  hasRule: boolean;
  noRuleMessage: string | null;
  deadlinesPending: boolean;
  cycleNumber: number;
  reopenedCount: number;
  matrix: string | null;
  assignment: SlaClockView;
  resolution: SlaClockView;
  assignmentTarget: string;
  resolutionTarget: string;
  cycles: TicketSlaCycleHistory[];
  events: TicketHistoryEntry[];
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">SLA History</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {hasRule
                ? `Cycle ${cycleNumber || 1}${reopenedCount ? ` · Reopened ${reopenedCount}` : ""}`
                : "Assignment and resolution clocks for this ticket"}
              {matrix ? ` · ${matrix}` : ""}
            </p>
          </div>
          <SlaWorkflowBadge state={workflow} />
        </div>
      </div>

      {!hasRule ? (
        <div className="p-5">
          <EmptyState
            title="No SLA rule found"
            description={noRuleMessage ?? "No assignment or resolution target is configured for this priority."}
            icon={Timer}
          />
        </div>
      ) : (
        <>
          <div className="grid gap-3 p-5 sm:grid-cols-2">
            <SlaClockCard clock={assignment} target={assignmentTarget} />
            <SlaClockCard clock={resolution} target={resolutionTarget} />
          </div>
          {deadlinesPending ? (
            <p className="px-5 pb-5 text-sm text-muted-foreground">
              A priority SLA rule exists, but this ticket does not have UTC deadlines yet. Clocks will start once
              the backend applies the assignment and resolution due times.
            </p>
          ) : null}

          <div className="border-t border-border">
            <div className="px-5 py-3">
              <h3 className="text-sm font-semibold text-foreground">SLA cycles</h3>
            </div>
            {cycles.length === 0 ? (
              <p className="px-5 pb-5 text-sm text-muted-foreground">No SLA cycles recorded yet.</p>
            ) : (
              <div className="max-h-[min(20rem,45vh)] overflow-y-auto overscroll-contain">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-card">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Cycle</TableHead>
                      <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Started</TableHead>
                      <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Assignment</TableHead>
                      <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Resolution</TableHead>
                      <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Ended</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cycles.map((cycle) => (
                      <TableRow key={cycle._id}>
                        <TableCell className="font-medium">{cycle.cycleNumber}</TableCell>
                        <TableCell className="text-muted-foreground">{formatDate(cycle.startedAt, true)}</TableCell>
                        <TableCell>
                          <CycleClockCell
                            status={cycle.assignmentSlaStatus ?? null}
                            dueAt={cycle.assignmentSlaDueAt ?? null}
                            metAt={cycle.assignmentSlaMetAt ?? null}
                            breached={cycle.assignmentSlaBreached ?? false}
                          />
                        </TableCell>
                        <TableCell>
                          <CycleClockCell
                            status={cycle.resolutionSlaStatus ?? null}
                            dueAt={cycle.resolutionSlaDueAt ?? null}
                            metAt={cycle.resolutionSlaMetAt ?? cycle.slaResolutionFrozenAt ?? null}
                            breached={cycle.resolutionSlaBreached ?? false}
                          />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {cycle.endedAt ? formatDate(cycle.endedAt, true) : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <div className="border-t border-border">
            <div className="px-5 py-3">
              <h3 className="text-sm font-semibold text-foreground">SLA events</h3>
            </div>
            {events.length === 0 ? (
              <div className="px-5 pb-5">
                <EmptyState
                  title="No SLA events yet"
                  description="Cycle start, assignment complete, freeze, and breach events will appear here."
                  icon={Clock}
                />
              </div>
            ) : (
              <div className="max-h-[min(20rem,45vh)] overflow-y-auto overscroll-contain">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-card">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Date & time</TableHead>
                      <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Action</TableHead>
                      <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="text-muted-foreground">{formatDate(entry.date, true)}</TableCell>
                        <TableCell className="font-medium">
                          <span className="flex flex-wrap items-center gap-2">
                            {entry.action}
                            {entry.slaState ? <SlaBadge state={entry.slaState} /> : null}
                          </span>
                        </TableCell>
                        <TableCell>{entry.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

function CycleClockCell({
  status,
  dueAt,
  metAt,
  breached,
}: {
  status?: string | null;
  dueAt?: string | null;
  metAt?: string | null;
  breached?: boolean;
}) {
  const label = breached ? "Breached" : status ? mapSlaStatus(status) : dueAt ? "On Track" : "—";
  return (
    <div className="grid gap-1">
      <SlaBadge state={label} />
      <span className="text-xs text-muted-foreground">
        {metAt ? `Closed ${formatDate(metAt, true)}` : dueAt ? `Due ${formatDate(dueAt, true)}` : "—"}
      </span>
    </div>
  );
}
