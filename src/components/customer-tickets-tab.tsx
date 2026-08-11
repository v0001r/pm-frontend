import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, Plus } from "lucide-react";
import {
  DataTableActions,
  DataTableHead,
  DataTablePagination,
  DataTableRowMenu,
  DateCell,
  EntityCell,
  PrimaryCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import {
  ListingCardHeader,
  ListingFilterField,
  ListingFilterSelect,
  ListingPage,
  useListingFilters,
} from "@/components/listing-page";
import { EmptyState, PriorityBadge, SlaBadge, StatusBadge, TableSkeleton } from "@/components/primitives";
import { TicketFormSheet } from "@/components/ticket-form-sheet";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getApiErrorMessage } from "@/lib/api";
import { fetchCategories } from "@/lib/categories";
import { formatDate } from "@/lib/store";
import {
  fetchTicketsPage,
  getTicketCategoryLabel,
  getTicketProjectLabel,
  getTicketSlaDueAt,
  getTicketSlaState,
  getTicketUserId,
  getTicketUserLabel,
} from "@/lib/tickets";
import { fetchEmployees } from "@/lib/users";
import { PRIORITIES, STATUSES, fullName, type Priority, type TicketRecord, type TicketStatus, type TicketUserRef } from "@/lib/types";

const PAGE_SIZE = 10;
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

const TABLE_COLUMNS = [
  "Ticket",
  "Client",
  "Project",
  "Priority",
  "Status",
  "Assigned to",
  "Created",
  "SLA",
  "Action",
] as const;

export function CustomerTicketsTab({ customerId }: { customerId: string }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQ, filters.status, filters.priority, filters.category, filters.client, filters.agent, filters.sla, filters.sort, limit]);

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
    queryKey: ["customer-tickets", customerId, { page, limit, debouncedQ, filters, sortParams }],
    queryFn: () =>
      fetchTicketsPage({
        page,
        limit,
        customerId,
        ...(debouncedQ && { search: debouncedQ }),
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

  const loading = ticketsQuery.isLoading || ticketsQuery.isFetching;

  return (
    <ListingPage>
      <ListingCardHeader
        title="Tickets"
        description={`Total ${meta.total} tickets`}
        value={q}
        onChange={setQ}
        placeholder="Search ticket ID, subject or client…"
        filterOpen={open}
        onFilterOpenChange={setOpen}
        activeFilterCount={activeCount}
        onFilterApply={apply}
        onFilterClear={clearFilters}
        primaryAction={
          <Button size="sm" className="rounded-md" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" /> New ticket
          </Button>
        }
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

      {loading ? (
        <TableSkeleton rows={8} cols={9} />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No tickets match these filters"
          description="Try a different search term, or reset the filters to see all tickets for this customer."
          action={<Button size="sm" onClick={clearFilters}>Reset filters</Button>}
        />
      ) : (
        <>
          <Table className="min-w-6xl">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {TABLE_COLUMNS.map((heading) => (
                  <DataTableHead key={heading} className={heading === "Action" ? "text-right" : undefined} sortable={heading !== "Action"}>
                    {heading}
                  </DataTableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((ticket) => (
                <TicketRow key={ticket._id} ticket={ticket} />
              ))}
            </TableBody>
          </Table>

          <DataTablePagination
            page={current}
            limit={limit}
            total={meta.total}
            totalPages={pages}
            entityLabel="tickets"
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </>
      )}

      <TicketFormSheet open={createOpen} onOpenChange={setCreateOpen} onSaved={() => ticketsQuery.refetch()} />
    </ListingPage>
  );
}

function TicketRow({ ticket }: { ticket: TicketRecord }) {
  const client = ticket.clientId as TicketUserRef;
  const agent = ticket.assignedTo as TicketUserRef | null | undefined;

  return (
    <TableRow>
      <TableCell className="max-w-80">
        <PrimaryCell
          id={ticket.number}
          title={ticket.subject}
          to="/admin/tickets/$ticketId"
          params={{ ticketId: ticket._id }}
        />
      </TableCell>
      <TableCell>
        <EntityCell name={getTicketUserLabel(client)} subtitle={client?.email ?? ""} hue={42} showAvatar />
      </TableCell>
      <TableCell className="whitespace-nowrap">{getTicketProjectLabel(ticket)}</TableCell>
      <TableCell>
        <PriorityBadge priority={ticket.priority} />
      </TableCell>
      <TableCell>
        <StatusBadge status={ticket.status} />
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {agent ? (
          <EntityCell name={getTicketUserLabel(agent)} hue={155} showAvatar />
        ) : (
          <span className="text-muted-foreground">Unassigned</span>
        )}
      </TableCell>
      <TableCell>
        <DateCell value={formatDate(ticket.createdAt)} />
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <SlaBadge state={getTicketSlaState(ticket)} />
      </TableCell>
      <TableCell>
        <DataTableActions>
          <DataTableRowMenu>
            <DropdownMenuItem asChild>
              <Link to="/admin/tickets/$ticketId" params={{ ticketId: ticket._id }}>
                <Eye className="size-4" /> View
              </Link>
            </DropdownMenuItem>
          </DataTableRowMenu>
        </DataTableActions>
      </TableCell>
    </TableRow>
  );
}
