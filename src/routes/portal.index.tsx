import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ClientRoute } from "@/components/guard";
import { EmptyState, KpiCard, PageHeader, PriorityBadge, SectionCard, StatusBadge, TableSkeleton } from "@/components/primitives";
import {
  PrimaryCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api";
import { fetchPortalDashboard } from "@/lib/customers";
import { formatDate } from "@/lib/store";
import type { Priority, TicketStatus } from "@/lib/types";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/portal/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Support Dashboard — Helpdesk" },
      { name: "description", content: "Track your open support tickets, replies awaiting you and recent resolutions." },
      { property: "og:title", content: "My Support Dashboard — Helpdesk" },
      { property: "og:description", content: "Track your open tickets, replies and recent resolutions." },
    ],
  }),
  component: () => (
    <ClientRoute>
      <PortalHome />
    </ClientRoute>
  ),
});

export function PortalHome() {
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["portal-dashboard"],
    queryFn: fetchPortalDashboard,
  });

  useEffect(() => {
    if (isError) toast.error(getApiErrorMessage(error, "Failed to load dashboard"));
  }, [isError, error]);

  const summary = data?.summary;
  const tickets = data?.recentTickets ?? [];

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? user?.firstName ?? ""}`}
        description="Your support activity at a glance."
        actions={
          <Button asChild size="sm">
            <Link to="/portal/tickets/new">New ticket</Link>
          </Button>
        }
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Open tickets" value={isLoading ? "…" : summary?.openTickets ?? 0} />
        <KpiCard label="In progress" value={isLoading ? "…" : summary?.inProgress ?? 0} tone="warning" />
        <KpiCard label="Resolved" value={isLoading ? "…" : summary?.resolved ?? 0} tone="success" />
        <KpiCard label="My projects" value="View" to="/portal/projects" />
      </div>

      <SectionCard
        title="Recent tickets"
        actions={
          <Link to="/portal/tickets" className="text-sm text-primary hover:underline">
            View all
          </Link>
        }
      >
        {isLoading ? (
          <TableSkeleton rows={4} cols={5} />
        ) : tickets.length === 0 ? (
          <EmptyState title="No tickets yet" description="Raise your first ticket and our team will respond within SLA." />
        ) : (
          <Table className="min-w-2xl">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {["Ticket", "Priority", "Status", "Last update"].map((heading) => (
                  <TableHead key={heading}>{heading}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.slice(0, 6).map((ticket) => (
                <TableRow key={String(ticket._id)}>
                  <TableCell>
                    <PrimaryCell
                      id={String(ticket.number)}
                      title={String(ticket.subject)}
                      to="/portal/tickets/$ticketId"
                      params={{ ticketId: String(ticket._id) }}
                    />
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={ticket.priority as Priority} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={ticket.status as TicketStatus} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDate(String(ticket.updatedAt), true)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </>
  );
}
