import { createFileRoute } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";
import { NotificationsPanel } from "@/components/notifications-panel";

export const Route = createFileRoute("/admin/notifications")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Notifications — Helpdesk Admin" },
      { name: "description", content: "New tickets, client replies, escalations and SLA alerts for the support team." },
      { property: "og:title", content: "Notifications — Helpdesk Admin" },
      { property: "og:description", content: "New tickets, replies, escalations and SLA alerts." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <NotificationsPanel />
    </RequireRole>
  ),
});
