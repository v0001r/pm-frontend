import { createFileRoute } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";
import { TicketWorkspace } from "@/components/ticket-workspace";

export const Route = createFileRoute("/admin/tickets/$ticketId")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Ticket workspace — Helpdesk Admin" },
      { name: "description", content: "Full ticket workspace with conversation, internal notes, SLA tracking and assignment." },
      { property: "og:title", content: "Ticket workspace — Helpdesk Admin" },
      { property: "og:description", content: "Conversation, internal notes, SLA tracking and assignment in one view." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <AdminTicketDetail />
    </RequireRole>
  ),
});

function AdminTicketDetail() {
  const { ticketId } = Route.useParams();
  return <TicketWorkspace ticketId={ticketId} mode="admin" />;
}
