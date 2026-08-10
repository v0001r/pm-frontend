import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { initials } from "@/lib/types";
import { cn } from "@/lib/utils";

/* ── Toolbar ─────────────────────────────────────────────── */

export function DataTableToolbar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5 border-b border-border bg-card px-4 py-3", className)}>
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
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-card px-4 py-3.5 text-sm">
      <p className="text-[13px] text-muted-foreground">
        Showing <span className="tabular font-medium text-foreground">{from}</span> to{" "}
        <span className="tabular font-medium text-foreground">{to}</span> of{" "}
        <span className="tabular font-medium text-foreground">{total}</span> {entityLabel}
        {isFetching ? <span className="ml-2 text-xs">Refreshing…</span> : null}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {onLimitChange && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Rows per page</span>
            <Select value={String(limit)} onValueChange={(v) => onLimitChange(Number(v))}>
              <SelectTrigger className="h-9 w-[4.5rem] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-md"
            disabled={page <= 1}
            onClick={() => onPageChange(1)}
            aria-label="First page"
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-md"
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
                className={cn("size-8 rounded-md text-xs font-semibold", p === page && "shadow-sm")}
                onClick={() => onPageChange(p as number)}
              >
                {p}
              </Button>
            ),
          )}
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-md"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-md"
            disabled={page >= totalPages}
            onClick={() => onPageChange(totalPages)}
            aria-label="Last page"
          >
            <ChevronsRight className="size-4" />
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

export function DataTableHead({
  children,
  className,
  sortable = true,
}: {
  children: ReactNode;
  className?: string;
  sortable?: boolean;
}) {
  return (
    <TableHead className={className}>
      <span className="inline-flex items-center gap-1.5">
        {children}
        {sortable ? <ChevronsUpDown className="size-3.5 opacity-40" /> : null}
      </span>
    </TableHead>
  );
}

export function IdLinkCell({
  id,
  to,
  params,
}: {
  id: string;
  to?: string;
  params?: Record<string, string>;
}) {
  if (!to) {
    return <span className="text-sm font-medium text-primary tabular-nums">{id}</span>;
  }
  return (
    <Link to={to} params={params as never} className="text-sm font-medium text-primary hover:underline tabular-nums">
      {id}
    </Link>
  );
}

export function TeamAvatarStack({
  members,
  extra = 0,
}: {
  members: { name: string; hue?: number }[];
  extra?: number;
}) {
  if (members.length === 0 && extra === 0) {
    return <span className="text-muted-foreground">—</span>;
  }
  const visible = members.slice(0, 2);
  const overflow = extra > 0 ? extra : Math.max(0, members.length - visible.length);

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {visible.map((member, index) => (
          <UserAvatar key={`${member.name}-${index}`} name={member.name} hue={member.hue ?? 200 + index * 40} size={28} />
        ))}
        {overflow > 0 ? (
          <span className="grid size-7 place-items-center rounded-full border-2 border-card bg-muted text-[10px] font-semibold text-muted-foreground">
            +{overflow}
          </span>
        ) : null}
      </div>
    </div>
  );
}

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
      <p className="truncate text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-0.5 truncate text-xs text-muted-foreground tabular-nums">{id}</p>
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
  showAvatar = false,
}: {
  name: string;
  subtitle?: string;
  hue?: number;
  showAvatar?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {showAvatar ? (
        <UserAvatar name={name} hue={hue} size={40} />
      ) : (
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-xs font-semibold tracking-wide text-muted-foreground">
          {initials(name)}
        </span>
      )}
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
    <div className="flex min-w-[8.5rem] items-center gap-3">
      <span className="tabular w-9 shrink-0 text-sm font-semibold text-foreground">{value}%</span>
      <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full transition-all", barColor)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}

export function DateStack({ start, end }: { start: string; end?: string | null }) {
  return <span className="whitespace-nowrap text-sm text-foreground">{start}</span>;
}

export function DateCell({ value }: { value: string }) {
  return <span className="whitespace-nowrap text-sm text-foreground">{value}</span>;
}

export function DataTableActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

const actionButtonClassName =
  "size-8 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground";

export function DataTableRowMenu({ children }: { children: ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={actionButtonClassName} aria-label="More actions">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-md">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}

/** @deprecated Use DataTableRowMenu */
export function DataTableMoreButton({ children }: { children: ReactNode }) {
  return <DataTableRowMenu>{children}</DataTableRowMenu>;
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
  const className = actionButtonClassName;
  if (asChild) {
    return (
      <Button variant="ghost" size="icon" className={className} asChild aria-label={label}>
        {children}
      </Button>
    );
  }
  return (
    <Button variant="ghost" size="icon" className={className} onClick={onClick} aria-label={label}>
      {children}
    </Button>
  );
}

/* ── Re-export table primitives with premium defaults ───── */

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
