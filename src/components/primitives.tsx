import { cn } from "@/lib/utils";
import { initials } from "@/lib/types";
import type { ProjectStatus } from "@/lib/types";
import type { ComponentType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Inbox, Minus, type LucideProps } from "lucide-react";

const badgeBase =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors duration-150";

const statusStyles: Record<string, string> = {
  New: "bg-info/10 text-info border-info/20",
  Assigned: "bg-primary/10 text-primary border-primary/20",
  "In Progress": "bg-warning/10 text-warning border-warning/25",
  Resolved: "bg-success/10 text-success border-success/25",
  Closed: "bg-muted text-muted-foreground border-border",
  Reopened: "bg-info/10 text-info border-info/20",
  Cancelled: "bg-muted text-muted-foreground border-border",
  Active: "bg-success/10 text-success border-success/25",
  Inactive: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn(badgeBase, statusStyles[status] ?? "bg-muted text-muted-foreground border-border", className)}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}

const priorityStyles: Record<string, string> = {
  P1: "bg-destructive/10 text-destructive border-destructive/20",
  P2: "bg-destructive/10 text-destructive border-destructive/20",
  P3: "bg-warning/10 text-warning border-warning/25",
  P4: "bg-info/10 text-info border-info/20",
  Low: "bg-info/10 text-info border-info/20",
  Medium: "bg-warning/10 text-warning border-warning/25",
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
};

export function PriorityBadge({ priority }: { priority: string }) {
  return (
    <span className={cn(badgeBase, priorityStyles[priority] ?? "bg-muted text-muted-foreground border-border")}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
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
  Open: "bg-info/10 text-info border-info/20",
  "On Hold": "bg-warning/10 text-warning border-warning/25",
  Completed: "bg-success/10 text-success border-success/25",
  Cancelled: "bg-muted text-muted-foreground border-border",
};

export function ProjectStatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const label = status === "Open" ? "In Progress" : status;
  return (
    <span className={cn(badgeBase, projectStatusStyles[status], className)}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {label}
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
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold ring-2 ring-surface",
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
  tone?: "default" | "danger" | "warning" | "success" | "primary" | "info";
  icon?: ComponentType<LucideProps>;
  trend?: number | null | undefined;
}) {
  const toneClass = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    info: "bg-info/10 text-info",
    danger: "bg-destructive/10 text-destructive",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
  }[tone];

  const hasTrend = trend !== undefined && trend !== null;
  const up = (trend ?? 0) >= 0;

  const body = (
    <div className="panel relative h-full overflow-hidden rounded-lg p-4">
      {hasTrend && (
        <span
          className={cn(
            "absolute top-3 right-3 inline-flex items-center gap-0.5 text-xs font-semibold",
            trend === 0 ? "text-muted-foreground" : up ? "text-success" : "text-destructive",
          )}
        >
          {trend === 0 ? (
            <Minus className="size-3.5" />
          ) : up ? (
            <ArrowUpRight className="size-3.5" />
          ) : (
            <ArrowDownRight className="size-3.5" />
          )}
          {trend === 0 ? "—" : `${up ? "+" : ""}${trend}%`}
        </span>
      )}

      <div className="flex items-center gap-3">
        {Icon && (
          <span className={cn("grid size-10 shrink-0 place-items-center rounded-md", toneClass)}>
            <Icon className="size-[18px]" strokeWidth={1.75} />
          </span>
        )}
        <div className="min-w-0 flex-1 pr-10">
          <p className="text-body-sm font-medium text-foreground">{label}</p>
          <p className="tabular mt-0.5 text-2xl font-bold leading-none tracking-tight text-foreground">
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
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
    <div className="flex flex-col gap-3">
      {breadcrumbs}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-page-title truncate text-foreground">{title}</h1>
          {description && (
            <p className="mt-1 max-w-2xl text-body-sm text-subtle">{description}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
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
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span
        aria-hidden
        className="grid size-12 place-items-center rounded-lg bg-muted text-muted-foreground"
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-section-title text-foreground">{title}</p>
        {description && (
          <p className="mx-auto mt-1 max-w-sm text-body-sm text-subtle">{description}</p>
        )}
      </div>
      {(action || secondaryAction) && (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
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
    <div className="divide-y divide-border/70 bg-card">
      <div className="flex gap-4 border-b border-border px-4 py-3">
        {Array.from({ length: cols }, (_, c) => (
          <Shimmer key={c} className={cn("h-3", c === 0 ? "w-24" : "w-16")} />
        ))}
      </div>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex h-[52px] items-center gap-4 px-4">
          {Array.from({ length: cols }, (_, c) => (
            <Shimmer key={c} className={cn("h-3.5", c === 0 ? "w-40" : "w-24")} />
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
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-3.5">
          <div className="min-w-0">
            {title && <h2 className="text-section-title">{title}</h2>}
            {description && <p className="mt-0.5 text-body-sm text-subtle">{description}</p>}
          </div>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
