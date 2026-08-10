import { createFileRoute } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";
import { TicketWorkspace } from "@/components/ticket-workspace";

export const Route = createFileRoute("/portal/tickets/$ticketId")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Ticket Details — Helpdesk" },
      { name: "description", content: "Follow the conversation, status and SLA timeline for your support ticket." },
      { property: "og:title", content: "Ticket Details — Helpdesk" },
      { property: "og:description", content: "Conversation, status and SLA timeline for your ticket." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Client"]}>
      <ClientTicket />
    </RequireRole>
  ),
});

function ClientTicket() {
  const { ticketId } = Route.useParams();
  return <TicketWorkspace ticketId={ticketId} mode="client" />;
}
