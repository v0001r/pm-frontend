import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { RequireRole } from "@/components/guard";
import {
  DataTablePagination,
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
import { EmptyState, PriorityBadge, StatusBadge, TableSkeleton } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api";
import { formatDate } from "@/lib/store";
import { fetchTickets, getTicketCategoryLabel } from "@/lib/tickets";
import { STATUSES } from "@/lib/types";

export const Route = createFileRoute("/portal/tickets/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Tickets — Helpdesk" },
      { name: "description", content: "Browse, search and filter every support ticket you have submitted." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Client"]}>
      <MyTickets />
    </RequireRole>
  ),
});

const ANY = "all";
const FILTER_DEFAULTS = { status: ANY };

function MyTickets() {
  const [q, setQ] = useState("");
  const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);

  const { data: tickets = [], isLoading, isError, error } = useQuery({
    queryKey: ["tickets", { portal: true }],
    queryFn: fetchTickets,
  });

  useEffect(() => {
    if (isError) {
      toast.error(getApiErrorMessage(error, "Failed to load tickets"));
    }
  }, [isError, error]);

  const filtered = useMemo(() => {
    const list = Array.isArray(tickets) ? tickets : tickets.items;
    const term = q.trim().toLowerCase();
    return list
      .filter((ticket) => (filters.status === ANY ? true : ticket.status === filters.status))
      .filter((ticket) => `${ticket.number} ${ticket.subject}`.toLowerCase().includes(term));
  }, [tickets, q, filters.status]);

  const clearFilters = () => {
    setQ("");
    clear();
  };

  return (
    <ListingPage
      header={
        <ListingPageHeader
          title="My tickets"
          description="All requests you have raised with the support team."
          breadcrumbs={[{ label: "Portal", to: "/portal" }, { label: "Tickets" }]}
          addAction={
            <Button asChild size="sm" className="rounded-xl">
              <Link to="/portal/tickets/new">
                <Plus className="size-4" /> New ticket
              </Link>
            </Button>
          }
        />
      }
    >
      <ListingSearchRow
        value={q}
        onChange={setQ}
        placeholder="Search by ID or subject…"
        filterOpen={open}
        onFilterOpenChange={setOpen}
        activeFilterCount={activeCount}
        onFilterApply={apply}
        onFilterClear={clearFilters}
        filterContent={
          <ListingFilterField label="Status">
            <ListingFilterSelect
              value={draft.status}
              onChange={(value) => patchDraft({ status: value })}
              options={STATUSES.map((value) => [value, value])}
              allLabel="All statuses"
            />
          </ListingFilterField>
        }
      />
      {isLoading ? (
        <TableSkeleton rows={6} cols={7} />
      ) : filtered.length === 0 ? (
        <EmptyState title="No tickets match your filters." />
      ) : (
        <>
          <Table className="min-w-3xl">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {["Ticket", "Category", "Priority", "Status", "Created", "Last update"].map((heading) => (
                  <TableHead key={heading}>{heading}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((ticket) => (
                <TableRow key={ticket._id}>
                  <TableCell>
                    <PrimaryCell
                      id={ticket.number}
                      title={ticket.subject}
                      to="/portal/tickets/$ticketId"
                      params={{ ticketId: ticket._id }}
                    />
                  </TableCell>
                  <TableCell className="max-w-sm truncate text-muted-foreground">{getTicketCategoryLabel(ticket)}</TableCell>
                  <TableCell>
                    <PriorityBadge priority={ticket.priority} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={ticket.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(ticket.createdAt)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(ticket.updatedAt, true)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DataTablePagination
            page={1}
            limit={filtered.length}
            total={filtered.length}
            totalPages={1}
            entityLabel="tickets"
            onPageChange={() => undefined}
          />
        </>
      )}
    </ListingPage>
  );
}
