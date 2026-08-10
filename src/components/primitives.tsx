import { cn } from "@/lib/utils";
import { initials } from "@/lib/types";
import type { ProjectStatus } from "@/lib/types";
import type { ComponentType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Inbox, type LucideProps } from "lucide-react";

const badgeBase =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors shadow-sm";

const statusStyles: Record<string, string> = {
  New: "bg-info/10 text-info border-info/20",
  Assigned: "bg-primary/10 text-primary border-primary/20",
  "In Progress": "bg-warning/10 text-warning border-warning/25",
  Resolved: "bg-success/10 text-success border-success/25",
  Closed: "bg-muted text-muted-foreground border-border",
  Reopened: "bg-info/10 text-info border-info/20",
  Cancelled: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn(badgeBase, statusStyles[status] ?? "bg-muted text-muted-foreground border-border", className)}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

const priorityStyles: Record<string, string> = {
  P1: "bg-destructive text-destructive-foreground border-destructive",
  P2: "bg-destructive/10 text-destructive border-destructive/20",
  P3: "bg-warning/10 text-warning border-warning/25",
  P4: "bg-info/10 text-info border-info/20",
  Low: "bg-info/10 text-info border-info/20",
  Medium: "bg-warning/10 text-warning border-warning/25",
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Critical: "bg-destructive text-destructive-foreground border-destructive",
};

export function PriorityBadge({ priority }: { priority: string }) {
  return (
    <span className={cn(badgeBase, priorityStyles[priority] ?? "bg-muted text-muted-foreground border-border")}>
      <span className="size-1.5 rounded-full bg-current" />
      {priority}
    </span>
  );
}

const slaStyles: Record<string, string> = {
  "On Track": "bg-success/10 text-success border-success/25",
  Approaching: "bg-warning/10 text-warning border-warning/25",
  Breached: "bg-destructive/10 text-destructive border-destructive/20",
  Met: "bg-muted text-muted-foreground border-border",
};

export function SlaBadge({ state }: { state: string }) {
  return <span className={cn(badgeBase, slaStyles[state])}>{state}</span>;
}

const projectStatusStyles: Record<ProjectStatus, string> = {
  Open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "On Hold": "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-violet-50 text-violet-700 border-violet-200",
  Cancelled: "bg-slate-50 text-slate-600 border-slate-200",
};

export function ProjectStatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span className={cn(badgeBase, projectStatusStyles[status], className)}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function UserAvatar({
  name,
  hue = 265,
  size = 28,
  className,
}: {
  name: string;
  hue?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold shadow-sm ring-2 ring-surface",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        backgroundColor: `oklch(0.94 0.04 ${hue})`,
        color: `oklch(0.42 0.12 ${hue})`,
      }}
    >
      {initials(name)}
    </span>
  );
}

export function KpiCard({
  label,
  value,
  hint,
  to,
  search,
  tone = "default",
  icon: Icon,
  trend,
}: {
  label: string;
  value: string | number;
  hint?: string;
  to?: string;
  search?: Record<string, string>;
  tone?: "default" | "danger" | "warning" | "success" | "primary";
  icon?: ComponentType<LucideProps>;
  trend?: number;
}) {
  const toneClass = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    danger: "bg-destructive/10 text-destructive",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
  }[tone];

  const up = (trend ?? 0) >= 0;

  const body = (
    <div className="panel lift group relative h-full overflow-hidden p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
        {Icon && (
          <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl shadow-sm", toneClass)}>
            <Icon className="size-[18px]" />
          </span>
        )}
      </div>
      <p className="tabular mt-4 text-[32px] leading-none font-bold tracking-tight text-foreground">{value}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {trend !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[12px] font-semibold",
              up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
            )}
          >
            {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {Math.abs(trend)}%
          </span>
        )}
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );

  if (!to) return body;
  return (
    <Link
      to={to}
      search={search as never}
      className="block rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {body}
    </Link>
  );
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      {breadcrumbs}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-[1.75rem] font-bold tracking-tight text-foreground sm:text-[2rem]">{title}</h1>
          {description && (
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  secondaryAction,
  icon: Icon = Inbox,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  icon?: ComponentType<LucideProps>;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
      <span aria-hidden className="relative grid size-[72px] place-items-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm ring-1 ring-primary/10">
        <Icon className="size-8 text-primary/70" />
      </span>
      <div>
        <p className="text-lg font-semibold tracking-tight text-foreground">{title}</p>
        {description && <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {(action || secondaryAction) && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}

export function Shimmer({ className }: { className?: string }) {
  return <span className={cn("shimmer block rounded-md", className)} />;
}

export function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="divide-y divide-border/50">
      <div className="flex gap-4 bg-muted/40 px-5 py-3">
        {Array.from({ length: cols }, (_, c) => (
          <Shimmer key={c} className={cn("h-3", c === 0 ? "w-24" : "w-16")} />
        ))}
      </div>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex items-center gap-4 px-5 py-5">
          {Array.from({ length: cols }, (_, c) => (
            <Shimmer key={c} className={cn("h-4", c === 0 ? "w-40" : "w-24")} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel overflow-hidden", className)}>
      {(title || actions) && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-gradient-to-b from-muted/30 to-transparent px-6 py-4">
          <div className="min-w-0">
            {title && <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>}
            {description && <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{description}</p>}
          </div>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
