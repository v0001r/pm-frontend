import { X } from "lucide-react";
import { ListingFilterField, ListingFilterSelect } from "@/components/listing-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  dateRangeFromShortcut,
  type DateShortcut,
  type ReportsFilterState,
} from "@/lib/reports";
import { PRIORITIES, STATUSES } from "@/lib/types";
import { fullName } from "@/lib/types";
import type { CategoryRecord, CustomerRecord, ProjectRecord } from "@/lib/types";
import type { User } from "@/lib/types";
import type { OrgLookup } from "@/lib/org";

const TAG_OPTIONS = [
  ["escalated", "Escalated"],
  ["vip", "VIP"],
] as const;

type ReportFilterBarProps = {
  filters: ReportsFilterState;
  draft: ReportsFilterState;
  onDraftChange: (patch: Partial<ReportsFilterState>) => void;
  onApply: () => void;
  onClear: () => void;
  onRemoveFilter: (patch: Partial<ReportsFilterState>) => void;
  customers: CustomerRecord[];
  projects: ProjectRecord[];
  employees: User[];
  categories: CategoryRecord[];
  teams: OrgLookup[];
};

export function ReportFilterBar({
  filters,
  draft,
  onDraftChange,
  onApply,
  onClear,
  onRemoveFilter,
  customers,
  projects,
  employees,
  categories,
  teams,
}: ReportFilterBarProps) {
  const activeChips = buildActiveChips(filters, customers, projects, employees, categories, teams, onRemoveFilter);

  const applyShortcut = (shortcut: DateShortcut) => {
    if (shortcut === "custom") {
      onDraftChange({ dateShortcut: "custom" });
      return;
    }
    const range = dateRangeFromShortcut(shortcut);
    onDraftChange({ ...range, dateShortcut: shortcut });
    onApply();
  };

  return (
    <div className="panel space-y-3 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={filters.dateShortcut} onValueChange={(v) => applyShortcut(v as DateShortcut)}>
            <SelectTrigger className="h-8 w-40">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Filters
                {activeChips.length > 0 ? (
                  <span className="ml-1 rounded-full bg-primary/10 px-1.5 text-xs font-semibold text-primary">
                    {activeChips.length}
                  </span>
                ) : null}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="space-y-3 p-4">
                <ListingFilterField label="Project">
                  <ListingFilterSelect
                    value={draft.projectId}
                    onChange={(v) => onDraftChange({ projectId: v })}
                    options={projects.map((p) => [p._id, p.name])}
                    allLabel="All projects"
                  />
                </ListingFilterField>
                <ListingFilterField label="Customer">
                  <ListingFilterSelect
                    value={draft.customerId}
                    onChange={(v) => onDraftChange({ customerId: v, projectId: "all" })}
                    options={customers.map((c) => [c._id, c.companyName])}
                    allLabel="All customers"
                  />
                </ListingFilterField>
                <ListingFilterField label="Agent">
                  <ListingFilterSelect
                    value={draft.assignedTo}
                    onChange={(v) => onDraftChange({ assignedTo: v })}
                    options={employees.map((e) => [e._id ?? e.id, fullName(e)])}
                    allLabel="All agents"
                  />
                </ListingFilterField>
                <ListingFilterField label="Team">
                  <ListingFilterSelect
                    value={draft.assignmentGroupId}
                    onChange={(v) => onDraftChange({ assignmentGroupId: v })}
                    options={teams.map((t) => [t._id, t.name])}
                    allLabel="All teams"
                  />
                </ListingFilterField>
                <ListingFilterField label="Status">
                  <ListingFilterSelect
                    value={draft.status}
                    onChange={(v) => onDraftChange({ status: v })}
                    options={STATUSES.map((s) => [s, s])}
                    allLabel="All statuses"
                  />
                </ListingFilterField>
                <ListingFilterField label="Priority">
                  <ListingFilterSelect
                    value={draft.priority}
                    onChange={(v) => onDraftChange({ priority: v })}
                    options={PRIORITIES.map((p) => [p, p])}
                    allLabel="All priorities"
                  />
                </ListingFilterField>
                <ListingFilterField label="Category">
                  <ListingFilterSelect
                    value={draft.categoryId}
                    onChange={(v) => onDraftChange({ categoryId: v })}
                    options={categories.map((c) => [c._id, c.name])}
                    allLabel="All categories"
                  />
                </ListingFilterField>
                <ListingFilterField label="Tag">
                  <ListingFilterSelect
                    value={draft.tag}
                    onChange={(v) => onDraftChange({ tag: v })}
                    options={TAG_OPTIONS.map(([k, v]) => [k, v])}
                    allLabel="All tags"
                  />
                </ListingFilterField>
                {draft.dateShortcut === "custom" ? (
                  <>
                    <ListingFilterField label="From">
                      <Input
                        type="date"
                        className="h-9"
                        value={draft.dateFrom}
                        onChange={(e) => onDraftChange({ dateFrom: e.target.value })}
                      />
                    </ListingFilterField>
                    <ListingFilterField label="To">
                      <Input
                        type="date"
                        className="h-9"
                        value={draft.dateTo}
                        onChange={(e) => onDraftChange({ dateTo: e.target.value })}
                      />
                    </ListingFilterField>
                  </>
                ) : null}
              </div>
              <div className="flex justify-end gap-2 border-t border-border/60 px-4 py-3">
                <Button variant="outline" size="sm" onClick={onClear}>Clear</Button>
                <Button size="sm" onClick={onApply}>Apply</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {activeChips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-foreground"
            >
              {chip.label}: {chip.value}
              <button
                type="button"
                className="rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                onClick={() => chip.onRemove()}
                aria-label={`Remove ${chip.label} filter`}
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={onClear}>
            Clear all
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function buildActiveChips(
  filters: ReportsFilterState,
  customers: CustomerRecord[],
  projects: ProjectRecord[],
  employees: User[],
  categories: CategoryRecord[],
  teams: OrgLookup[],
  onRemove: (patch: Partial<ReportsFilterState>) => void,
) {
  const chips: { key: string; label: string; value: string; onRemove: () => void }[] = [];

  if (filters.customerId !== "all") {
    const name = customers.find((c) => c._id === filters.customerId)?.companyName ?? filters.customerId;
    chips.push({ key: "customer", label: "Customer", value: name, onRemove: () => onRemove({ customerId: "all" }) });
  }
  if (filters.projectId !== "all") {
    const name = projects.find((p) => p._id === filters.projectId)?.name ?? filters.projectId;
    chips.push({ key: "project", label: "Project", value: name, onRemove: () => onRemove({ projectId: "all" }) });
  }
  if (filters.assignedTo !== "all") {
    const emp = employees.find((e) => (e._id ?? e.id) === filters.assignedTo);
    chips.push({
      key: "agent",
      label: "Agent",
      value: emp ? fullName(emp) : filters.assignedTo,
      onRemove: () => onRemove({ assignedTo: "all" }),
    });
  }
  if (filters.assignmentGroupId !== "all") {
    const team = teams.find((t) => t._id === filters.assignmentGroupId);
    chips.push({
      key: "team",
      label: "Team",
      value: team?.name ?? filters.assignmentGroupId,
      onRemove: () => onRemove({ assignmentGroupId: "all" }),
    });
  }
  if (filters.status !== "all") {
    chips.push({ key: "status", label: "Status", value: filters.status, onRemove: () => onRemove({ status: "all" }) });
  }
  if (filters.priority !== "all") {
    chips.push({ key: "priority", label: "Priority", value: filters.priority, onRemove: () => onRemove({ priority: "all" }) });
  }
  if (filters.categoryId !== "all") {
    const cat = categories.find((c) => c._id === filters.categoryId);
    chips.push({
      key: "category",
      label: "Category",
      value: cat?.name ?? filters.categoryId,
      onRemove: () => onRemove({ categoryId: "all" }),
    });
  }
  if (filters.tag !== "all") {
    chips.push({ key: "tag", label: "Tag", value: filters.tag, onRemove: () => onRemove({ tag: "all" }) });
  }

  return chips;
}
