import { createFileRoute } from "@tanstack/react-router";
import { AdminOrStaffRoute } from "@/components/guard";
import { CreateTicketForm } from "@/components/create-ticket-form";

interface NewTicketSearch {
  projectId?: string;
}

export const Route = createFileRoute("/admin/tickets/new")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): NewTicketSearch => ({
    projectId: typeof search["projectId"] === "string" ? search["projectId"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Create Ticket — Helpdesk Admin" },
      { name: "description", content: "Create a support ticket for any accessible project." },
    ],
  }),
  component: () => (
    <AdminOrStaffRoute>
      <AdminNewTicket />
    </AdminOrStaffRoute>
  ),
});

function AdminNewTicket() {
  const { projectId } = Route.useSearch();
  return (
    <CreateTicketForm
      initialProjectId={projectId}
      cancelTo="/admin/tickets"
      successTo="/admin/tickets/$ticketId"
    />
  );
}
