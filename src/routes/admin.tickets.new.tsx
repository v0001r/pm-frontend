import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminOrStaffRoute } from "@/components/guard";

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
      <NewTicketRedirect />
    </AdminOrStaffRoute>
  ),
});

function NewTicketRedirect() {
  const navigate = useNavigate();
  const { projectId } = Route.useSearch();

  useEffect(() => {
    navigate({
      to: "/admin/tickets",
      search: { action: "create", ...(projectId ? { projectId } : {}) },
      replace: true,
    });
  }, [navigate, projectId]);

  return null;
}
