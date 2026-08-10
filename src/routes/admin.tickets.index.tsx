import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Download, Eye, MessageSquare, MoreHorizontal, Plus, Upload } from "lucide-react";
import { RequireRole } from "@/components/guard";
import {
  DataTableActions,
  DataTableIconButton,
  DataTablePagination,
  EntityCell,
  PrimaryCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import {
  ListingFilterField,
  ListingFilterSelect,
  ListingPage,
  ListingPageHeader,
  ListingSearchRow,
  useListingFilters,
} from "@/components/listing-page";
import { EmptyState, PriorityBadge, SlaBadge, StatusBadge, TableSkeleton } from "@/components/primitives";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api";
import { fetchCategories } from "@/lib/categories";
import { formatDate } from "@/lib/store";
import { fetchEmployees } from "@/lib/users";
import {
  fetchTicketsPage,
  getTicketCategoryLabel,
  getTicketProjectLabel,
  getTicketSlaDueAt,
  getTicketSlaState,
  getTicketUserId,
  getTicketUserLabel,
} from "@/lib/tickets";
import { PRIORITIES, STATUSES, fullName, type Priority, type TicketRecord, type TicketStatus, type TicketUserRef } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TicketSearch {
  status?: string;
  priority?: string;
  sla?: string;
  client?: string;
  agent?: string;
  projectId?: string;
}

export const Route = createFileRoute("/admin/tickets/")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): TicketSearch => ({
    status: typeof search["status"] === "string" ? search["status"] : undefined,
    priority: typeof search["priority"] === "string" ? search["priority"] : undefined,
    sla: typeof search["sla"] === "string" ? search["sla"] : undefined,
    client: typeof search["client"] === "string" ? search["client"] : undefined,
    agent: typeof search["agent"] === "string" ? search["agent"] : undefined,
    projectId: typeof search["projectId"] === "string" ? search["projectId"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Ticket Management — Helpdesk Admin" },
      { name: "description", content: "Filter, sort, assign and triage every support ticket across all clients." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <TicketsPage />
    </RequireRole>
  ),
});

const PAGE_SIZE = 8;
const ANY = "all";

const FILTER_DEFAULTS = {
  status: ANY,
  priority: ANY,
  category: ANY,
  client: ANY,
  agent: ANY,
  sla: ANY,
  sort: "updated",
};

function TicketsPage() {
  const initial = Route.useSearch();
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(
    FILTER_DEFAULTS,
    {
      status: initial.status ?? ANY,
      priority: initial.priority ?? ANY,
      client: initial.client ?? ANY,
      agent: initial.agent ?? ANY,
      sla: initial.sla ?? ANY,
    },
  );
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [q]);

  useEffect(() => setPage(1), [debouncedQ, filters.status, filters.priority, filters.category, filters.client, filters.agent, filters.sla, filters.sort]);

  const sortParams = useMemo(() => {
    switch (filters.sort) {
      case "created":
        return { sortBy: "createdAt", sortOrder: "desc" as const };
      case "priority":
        return { sortBy: "priority", sortOrder: "asc" as const };
      case "due":
        return { sortBy: "dueAt", sortOrder: "asc" as const };
      default:
        return { sortBy: "lastActivityAt", sortOrder: "desc" as const };
    }
  }, [filters.sort]);

  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const employeesQuery = useQuery({ queryKey: ["employees"], queryFn: fetchEmployees });

  const ticketsQuery = useQuery({
    queryKey: ["admin-tickets", { page, debouncedQ, filters, sortParams, projectId: initial.projectId }],
    queryFn: () =>
      fetchTicketsPage({
        page,
        limit: PAGE_SIZE,
        ...(debouncedQ && { search: debouncedQ }),
        ...(initial.projectId && { projectId: initial.projectId }),
        ...(filters.status !== ANY && { status: filters.status as TicketStatus }),
        ...(filters.priority !== ANY && { priority: filters.priority as Priority }),
        ...(filters.category !== ANY && { categoryId: filters.category }),
        ...(filters.client !== ANY && { clientId: filters.client }),
        ...(filters.agent === "unassigned" ? { unassigned: true } : filters.agent !== ANY ? { assignedTo: filters.agent } : {}),
        ...sortParams,
      }),
  });

  useEffect(() => {
    if (ticketsQuery.isError) {
      toast.error(getApiErrorMessage(ticketsQuery.error, "Failed to load tickets"));
    }
  }, [ticketsQuery.isError, ticketsQuery.error]);

  const categories = categoriesQuery.data ?? [];
  const employees = employeesQuery.data ?? [];
  const meta = ticketsQuery.data?.meta ?? { page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 };
  const rows = useMemo(() => {
    const items = ticketsQuery.data?.items ?? [];
    if (filters.sla === ANY) return items;
    return items.filter((ticket) => getTicketSlaState(ticket) === filters.sla);
  }, [ticketsQuery.data?.items, filters.sla]);

  const clientOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const ticket of ticketsQuery.data?.items ?? []) {
      const id = getTicketUserId(ticket.clientId);
      if (id) map.set(id, getTicketUserLabel(ticket.clientId));
    }
    return [...map.entries()];
  }, [ticketsQuery.data?.items]);

  const pages = Math.max(1, meta.totalPages);
  const current = Math.min(page, pages);

  const clearFilters = () => {
    setQ("");
    setDebouncedQ("");
    clear();
    setPage(1);
  };

  const exportCsv = () => {
    const header = "Ticket,Subject,Client,Project,Category,Priority,Status,Agent,Created,Due\n";
    const body = rows
      .map((ticket) => {
        const due = getTicketSlaDueAt(ticket);
        return [
          ticket.number,
          `"${ticket.subject}"`,
          getTicketUserLabel(ticket.clientId),
          getTicketProjectLabel(ticket),
          getTicketCategoryLabel(ticket),
          ticket.priority,
          ticket.status,
          getTicketUserLabel(ticket.assignedTo),
          formatDate(ticket.createdAt),
          due ? formatDate(due) : "",
        ].join(",");
      })
      .join("\n");
    const url = URL.createObjectURL(new Blob([header + body], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "tickets.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${rows.length} tickets to CSV.`);
  };

  const allOnPageSelected = rows.length > 0 && rows.every((ticket) => selected.includes(ticket._id));
  const toggleRow = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const togglePage = () =>
    setSelected((prev) =>
      allOnPageSelected ? prev.filter((id) => !rows.some((ticket) => ticket._id === id)) : [...new Set([...prev, ...rows.map((ticket) => ticket._id)])],
    );

  const loading = ticketsQuery.isLoading || ticketsQuery.isFetching;

  return (
    <TooltipProvider delayDuration={200}>
      <ListingPage
        header={
          <ListingPageHeader
            title="Tickets"
            description={`${meta.total} tickets in the queue.`}
            breadcrumbs={[{ label: "Admin", to: "/admin" }, { label: "Tickets" }]}
            exportAction={
              <>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={() => toast.info("Import is available to super admins via Settings.")}>
                  <Upload className="size-4" /> Import
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={exportCsv}>
                  <Download className="size-4" /> Export CSV
                </Button>
              </>
            }
            addAction={
              <Button asChild size="sm" className="rounded-xl">
                <Link to="/admin/tickets/new">
                  <Plus className="size-4" /> Create ticket
                </Link>
              </Button>
            }
          />
        }
      >
        <ListingSearchRow
          value={q}
          onChange={setQ}
          placeholder="Search ticket ID, subject or client…"
          filterOpen={open}
          onFilterOpenChange={setOpen}
          activeFilterCount={activeCount}
          onFilterApply={apply}
          onFilterClear={clearFilters}
          filterContent={
            <>
              <ListingFilterField label="Status">
                <ListingFilterSelect value={draft.status} onChange={(value) => patchDraft({ status: value })} options={STATUSES.map((s) => [s, s])} allLabel="All statuses" />
              </ListingFilterField>
              <ListingFilterField label="Priority">
                <ListingFilterSelect value={draft.priority} onChange={(value) => patchDraft({ priority: value })} options={PRIORITIES.map((p) => [p, p])} allLabel="All priorities" />
              </ListingFilterField>
              <ListingFilterField label="Category">
                <ListingFilterSelect value={draft.category} onChange={(value) => patchDraft({ category: value })} options={categories.map((c) => [c._id, c.name])} allLabel="All categories" />
              </ListingFilterField>
              <ListingFilterField label="Client">
                <ListingFilterSelect value={draft.client} onChange={(value) => patchDraft({ client: value })} options={clientOptions} allLabel="All clients" />
              </ListingFilterField>
              <ListingFilterField label="Agent">
                <ListingFilterSelect
                  value={draft.agent}
                  onChange={(value) => patchDraft({ agent: value })}
                  options={[["unassigned", "Unassigned"] as [string, string]].concat(
                    employees.map((u) => [u.id ?? u._id ?? "", fullName(u)] as [string, string]),
                  )}
                  allLabel="All agents"
                />
              </ListingFilterField>
              <ListingFilterField label="SLA">
                <ListingFilterSelect
                  value={draft.sla}
                  onChange={(value) => patchDraft({ sla: value })}
                  options={[["On Track", "On Track"], ["Approaching", "Approaching"], ["Breached", "Breached"], ["Met", "Met"]]}
                  allLabel="All SLA states"
                />
              </ListingFilterField>
              <ListingFilterField label="Sort by">
                <ListingFilterSelect
                  value={draft.sort}
                  onChange={(value) => patchDraft({ sort: value })}
                  allValue="updated"
                  allLabel="Last updated"
                  options={[
                    ["created", "Created date"],
                    ["priority", "Priority"],
                    ["due", "SLA due date"],
                  ]}
                />
              </ListingFilterField>
            </>
          }
        />

        {selected.length > 0 ? (
          <div className="border-b border-border/60 bg-primary/5 px-5 py-2 text-[13px] font-medium text-primary">
            {selected.length} selected
          </div>
        ) : null}

        {loading ? (
          <TableSkeleton rows={8} cols={10} />
        ) : (
          <>
            <div className="hidden max-h-[70vh] overflow-auto lg:block">
              <Table className="min-w-5xl">
                <TableHeader className="sticky top-0 z-10 backdrop-blur-sm">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12">
                      <Checkbox checked={allOnPageSelected} onCheckedChange={togglePage} aria-label="Select all rows on this page" />
                    </TableHead>
                    {["Ticket", "Client", "Project", "Priority", "Status", "Assigned to", "Created", "Updated", "SLA", "Actions"].map((h) => (
                      <TableHead key={h} className={h === "Actions" ? "text-right" : "whitespace-nowrap"}>{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((ticket, i) => (
                    <TicketRow
                      key={ticket._id}
                      ticket={ticket}
                      index={i}
                      selected={selected.includes(ticket._id)}
                      onToggle={() => toggleRow(ticket._id)}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="divide-y border-t lg:hidden">
              {rows.map((ticket) => (
                <Link
                  key={ticket._id}
                  to="/admin/tickets/$ticketId"
                  params={{ ticketId: ticket._id }}
                  className="block p-4 transition-colors hover:bg-hover"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{ticket.subject}</p>
                      <p className="tabular text-xs text-muted-foreground">
                        {ticket.number} · {getTicketCategoryLabel(ticket)}
                      </p>
                    </div>
                    <StatusBadge status={ticket.status} />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <PriorityBadge priority={ticket.priority} />
                    <SlaBadge state={getTicketSlaState(ticket)} />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {!loading && rows.length === 0 && (
          <EmptyState
            title="No tickets match these filters"
            description="Try a different search term, or reset the filters to see the full queue."
            action={<Button size="sm" onClick={clearFilters}>Reset filters</Button>}
            secondaryAction={<Button size="sm" variant="outline" onClick={exportCsv}>Export current view</Button>}
          />
        )}

        {!loading && rows.length > 0 && (
          <DataTablePagination
            page={current}
            limit={PAGE_SIZE}
            total={meta.total}
            totalPages={pages}
            entityLabel="tickets"
            onPageChange={setPage}
          />
        )}
      </ListingPage>
    </TooltipProvider>
  );
}

function TicketRow({
  ticket,
  index,
  selected,
  onToggle,
}: {
  ticket: TicketRecord;
  index: number;
  selected: boolean;
  onToggle: () => void;
}) {
  const client = ticket.clientId as TicketUserRef;
  const agent = ticket.assignedTo as TicketUserRef | null | undefined;
  const due = getTicketSlaDueAt(ticket);

  return (
    <TableRow className={cn(selected && "bg-primary/5")}>
      <TableCell>
        <Checkbox checked={selected} onCheckedChange={onToggle} aria-label={`Select ticket ${ticket.number}`} />
      </TableCell>
      <TableCell className="max-w-72">
        <PrimaryCell
          id={ticket.number}
          title={ticket.subject}
          to="/admin/tickets/$ticketId"
          params={{ ticketId: ticket._id }}
        />
      </TableCell>
      <TableCell>
        <EntityCell
          name={getTicketUserLabel(client)}
          subtitle={client?.email ?? ""}
          hue={42}
        />
      </TableCell>
      <TableCell className="whitespace-nowrap">{getTicketProjectLabel(ticket)}</TableCell>
      <TableCell><PriorityBadge priority={ticket.priority} /></TableCell>
      <TableCell><StatusBadge status={ticket.status} /></TableCell>
      <TableCell className="whitespace-nowrap">
        {agent ? (
          <EntityCell name={getTicketUserLabel(agent)} hue={155} />
        ) : (
          <span className="text-muted-foreground">Unassigned</span>
        )}
      </TableCell>
      <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(ticket.createdAt)}</TableCell>
      <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(ticket.updatedAt)}</TableCell>
      <TableCell className="whitespace-nowrap">
        <SlaBadge state={getTicketSlaState(ticket)} />
        {due ? <span className="mt-1 block text-xs text-muted-foreground">{formatDate(due)}</span> : null}
      </TableCell>
      <TableCell>
        <DataTableActions>
          <DataTableIconButton label="View ticket" asChild>
            <Link to="/admin/tickets/$ticketId" params={{ ticketId: ticket._id }}>
              <Eye className="size-4" />
            </Link>
          </DataTableIconButton>
          <DataTableIconButton label="Reply" asChild>
            <Link to="/admin/tickets/$ticketId" params={{ ticketId: ticket._id }}>
              <MessageSquare className="size-4" />
            </Link>
          </DataTableIconButton>
          <DataTableIconButton label="More">
            <MoreHorizontal className="size-4" />
          </DataTableIconButton>
        </DataTableActions>
      </TableCell>
    </TableRow>
  );
}
