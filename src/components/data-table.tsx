import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserAvatar } from "@/components/primitives";
import { cn } from "@/lib/utils";

/* ── Toolbar ─────────────────────────────────────────────── */

export function DataTableToolbar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5 border-b border-border/60 bg-muted/20 px-5 py-4", className)}>
      {children}
    </div>
  );
}

/* ── Pagination ──────────────────────────────────────────── */

export function DataTablePagination({
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  onLimitChange,
  entityLabel = "items",
  isFetching,
}: {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  entityLabel?: string;
  isFetching?: boolean;
}) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const pages = buildPageList(page, totalPages);

  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 bg-muted/10 px-5 py-3.5 text-sm">
      <p className="text-[13px] text-muted-foreground">
        Showing <span className="tabular font-medium text-foreground">{from}</span> to{" "}
        <span className="tabular font-medium text-foreground">{to}</span> of{" "}
        <span className="tabular font-medium text-foreground">{total}</span> {entityLabel}
        {isFetching ? <span className="ml-2 text-xs">Refreshing…</span> : null}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {onLimitChange && (
          <Select value={String(limit)} onValueChange={(v) => onLimitChange(Number(v))}>
            <SelectTrigger className="h-9 w-[7.5rem] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-lg"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Button>
          {pages.map((p, i) =>
            p === "…" ? (
              <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground">
                …
              </span>
            ) : (
              <Button
                key={p}
                variant={p === page ? "default" : "ghost"}
                size="icon"
                className={cn("size-8 rounded-lg text-xs font-semibold", p === page && "shadow-sm")}
                onClick={() => onPageChange(p as number)}
              >
                {p}
              </Button>
            ),
          )}
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-lg"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

/* ── Cell helpers ────────────────────────────────────────── */

export function PrimaryCell({
  id,
  title,
  to,
  params,
}: {
  id: string;
  title: string;
  to?: string;
  params?: Record<string, string>;
}) {
  const content = (
    <div className="min-w-0">
      <p className="tabular text-[13px] font-bold text-primary">{id}</p>
      <p className="mt-0.5 truncate text-sm font-medium text-foreground">{title}</p>
    </div>
  );
  if (!to) return content;
  return (
    <Link to={to} params={params as never} className="block min-w-0 transition-opacity hover:opacity-80">
      {content}
    </Link>
  );
}

export function EntityCell({
  name,
  subtitle,
  hue = 265,
}: {
  name: string;
  subtitle?: string;
  hue?: number;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <UserAvatar name={name} hue={hue} size={32} />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{name}</p>
        {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  );
}

const LABEL_COLORS = [
  "bg-violet-50 text-violet-700 ring-violet-100",
  "bg-sky-50 text-sky-700 ring-sky-100",
  "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "bg-amber-50 text-amber-700 ring-amber-100",
  "bg-rose-50 text-rose-700 ring-rose-100",
  "bg-indigo-50 text-indigo-700 ring-indigo-100",
];

export function LabelPill({ label }: { label: string }) {
  if (!label || label === "—") return <span className="text-muted-foreground">—</span>;
  const color = LABEL_COLORS[label.length % LABEL_COLORS.length];
  return (
    <span className={cn("inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset", color)}>
      {label}
    </span>
  );
}

export function ProgressCell({
  value,
  tone = "primary",
}: {
  value: number;
  tone?: "primary" | "success" | "warning" | "violet";
}) {
  const barColor = {
    primary: "bg-primary",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    violet: "bg-violet-500",
  }[tone];

  return (
    <div className="min-w-[7rem]">
      <p className="tabular mb-1.5 text-xs font-semibold text-foreground">{value}%</p>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full transition-all", barColor)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}

export function DateStack({ start, end }: { start: string; end?: string | null }) {
  return (
    <div className="space-y-1 text-xs text-muted-foreground">
      <p className="flex items-center gap-1.5">
        <Calendar className="size-3 shrink-0" />
        <span>{start}</span>
      </p>
      {end ? (
        <p className="flex items-center gap-1.5">
          <Calendar className="size-3 shrink-0" />
          <span>{end}</span>
        </p>
      ) : null}
    </div>
  );
}

export function DataTableActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-end gap-0.5">{children}</div>;
}

export function DataTableIconButton({
  children,
  label,
  onClick,
  asChild,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
  asChild?: boolean;
}) {
  const className = "size-8 rounded-lg text-muted-foreground hover:text-foreground";
  if (asChild) {
    return (
      <Button variant="ghost" size="icon" className={className} asChild aria-label={label}>
        {children}
      </Button>
    );
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </Button>
  );
}

export function DataTableMoreButton({ children }: { children: ReactNode }) {
  return (
    <Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground hover:text-foreground" aria-label="More actions">
      <MoreHorizontal className="size-4" />
      {children}
    </Button>
  );
}

/* ── Re-export table primitives with premium defaults ───── */

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
