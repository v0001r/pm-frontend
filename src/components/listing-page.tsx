import { Fragment, useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Search, SlidersHorizontal, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionCard } from "@/components/primitives";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = { label: string; to?: string };

export function ListingBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-1 flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground">
      {items.map((item, index) => (
        <Fragment key={`${item.label}-${index}`}>
          {index > 0 ? <ChevronRight className="size-3.5 shrink-0 opacity-40" aria-hidden /> : null}
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground/80">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export function ListingPageHeader({
  title,
  description,
  breadcrumbs,
  exportAction,
  addAction,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  exportAction?: ReactNode;
  addAction?: ReactNode;
  actions?: ReactNode;
}) {
  const hasActions = exportAction || addAction || actions;
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 px-4 pt-5 pb-3">
      <div className="min-w-0">
        {breadcrumbs ? <ListingBreadcrumbs items={breadcrumbs} /> : null}
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {hasActions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {exportAction}
          {addAction}
          {actions}
        </div>
      ) : null}
    </header>
  );
}

export function ListingPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <SectionCard className={cn("overflow-hidden border border-border/70 bg-card shadow-sm", className)}>
      {children}
    </SectionCard>
  );
}

type ListingSearchRowProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  filterOpen: boolean;
  onFilterOpenChange: (open: boolean) => void;
  activeFilterCount?: number;
  onFilterApply: () => void;
  onFilterClear: () => void;
  filterContent?: ReactNode;
  filterTitle?: string;
  showFilters?: boolean;
  onExport?: () => void;
  exportLabel?: string;
  primaryAction?: ReactNode;
  className?: string;
  embedded?: boolean;
};

export function ListingCardHeader({
  title,
  description,
  breadcrumbs,
  value,
  onChange,
  placeholder = "Search…",
  filterOpen,
  onFilterOpenChange,
  activeFilterCount = 0,
  onFilterApply,
  onFilterClear,
  filterContent,
  filterTitle = "Filters",
  showFilters = true,
  onExport,
  exportLabel = "Export",
  primaryAction,
  className,
}: {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
} & ListingSearchRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-3",
        className,
      )}
    >
      <div className="min-w-[7.5rem] shrink-0">
        {breadcrumbs ? <ListingBreadcrumbs items={breadcrumbs} /> : null}
        <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </div>

      <div className="relative min-w-[10rem] flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-10 rounded-md border-border bg-background pl-9"
        />
      </div>

      <ListingToolbarActions
        filterOpen={filterOpen}
        onFilterOpenChange={onFilterOpenChange}
        activeFilterCount={activeFilterCount}
        onFilterApply={onFilterApply}
        onFilterClear={onFilterClear}
        filterContent={filterContent}
        filterTitle={filterTitle}
        showFilters={showFilters}
        onExport={onExport}
        exportLabel={exportLabel}
        primaryAction={primaryAction}
      />
    </div>
  );
}

function ListingToolbarActions({
  filterOpen,
  onFilterOpenChange,
  activeFilterCount = 0,
  onFilterApply,
  onFilterClear,
  filterContent,
  filterTitle = "Filters",
  showFilters = true,
  onExport,
  exportLabel = "Export",
  primaryAction,
}: Pick<
  ListingSearchRowProps,
  | "filterOpen"
  | "onFilterOpenChange"
  | "activeFilterCount"
  | "onFilterApply"
  | "onFilterClear"
  | "filterContent"
  | "filterTitle"
  | "showFilters"
  | "onExport"
  | "exportLabel"
  | "primaryAction"
>) {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2">
      {showFilters && filterContent ? (
        <Popover open={filterOpen} onOpenChange={onFilterOpenChange}>
          <PopoverTrigger asChild>
            <Button type="button" variant="outline" size="sm" className="relative rounded-md">
              <SlidersHorizontal className="size-4" />
              Filters
              {activeFilterCount > 0 ? (
                <span className="ml-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[min(100vw-2rem,22rem)] rounded-xl p-0">
            <div className="border-b px-4 py-3">
              <p className="text-sm font-semibold text-foreground">{filterTitle}</p>
            </div>
            <div className="max-h-[min(70vh,24rem)] space-y-4 overflow-y-auto p-4">{filterContent}</div>
            <div className="flex gap-2 border-t p-3">
              <Button type="button" variant="outline" className="flex-1 rounded-md" onClick={onFilterClear}>
                Clear
              </Button>
              <Button type="button" className="flex-1 rounded-md" onClick={onFilterApply}>
                Apply
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : null}
      {onExport ? (
        <Button type="button" variant="outline" size="sm" className="rounded-md" onClick={onExport}>
          <Upload className="size-4" />
          {exportLabel}
        </Button>
      ) : null}
      {primaryAction}
    </div>
  );
}

export function ListingSearchRow({
  value,
  onChange,
  placeholder = "Search…",
  filterOpen,
  onFilterOpenChange,
  activeFilterCount = 0,
  onFilterApply,
  onFilterClear,
  filterContent,
  filterTitle = "Filters",
  showFilters = true,
  onExport,
  exportLabel = "Export",
  primaryAction,
  className,
  embedded = false,
}: ListingSearchRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 bg-card px-4 py-3",
        embedded ? "pt-0" : "border-b border-border",
        className,
      )}
    >
      <div className="relative min-w-[12rem] flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-10 rounded-md border-border bg-background pl-9"
        />
      </div>
      <ListingToolbarActions
        filterOpen={filterOpen}
        onFilterOpenChange={onFilterOpenChange}
        activeFilterCount={activeFilterCount}
        onFilterApply={onFilterApply}
        onFilterClear={onFilterClear}
        filterContent={filterContent}
        filterTitle={filterTitle}
        showFilters={showFilters}
        onExport={onExport}
        exportLabel={exportLabel}
        primaryAction={primaryAction}
      />
    </div>
  );
}

/** @deprecated Use ListingSearchRow — kept for compatibility */
export function ListingToolbar(props: Parameters<typeof ListingSearchRow>[0]) {
  return <ListingSearchRow {...props} />;
}

export function ListingFilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export function ListingFilterSelect({
  value,
  onChange,
  placeholder,
  options,
  allLabel = "All",
  allValue = "all",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: [string, string][];
  allLabel?: string;
  allValue?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 w-full rounded-xl">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={allValue}>{allLabel}</SelectItem>
        {options.map(([optionValue, label]) => (
          <SelectItem key={optionValue} value={optionValue}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function useListingFilters<T extends Record<string, string>>(defaults: T, initial?: Partial<T>) {
  const initialApplied = { ...defaults, ...initial };
  const [applied, setApplied] = useState(initialApplied);
  const [draft, setDraft] = useState(initialApplied);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setDraft(applied);
  }, [open, applied]);

  const apply = () => {
    setApplied(draft);
    setOpen(false);
  };

  const clear = () => {
    setDraft(defaults);
    setApplied(defaults);
    setOpen(false);
  };

  const activeCount = Object.keys(defaults).filter((key) => applied[key] !== defaults[key]).length;

  const patchDraft = (patch: Partial<T>) => setDraft((current) => ({ ...current, ...patch }));

  return { applied, setApplied, draft, setDraft, patchDraft, apply, clear, open, setOpen, activeCount };
}

export function countActiveFilters(values: Record<string, string>, defaults: Record<string, string>) {
  return Object.keys(defaults).filter((key) => values[key] !== defaults[key]).length;
}
