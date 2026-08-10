import { createFileRoute } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";
import { NotificationsPanel } from "@/components/notifications-panel";

export const Route = createFileRoute("/portal/notifications")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Notifications — Helpdesk" },
      { name: "description", content: "Replies, status changes and resolution alerts for your support tickets." },
      { property: "og:title", content: "Notifications — Helpdesk" },
      { property: "og:description", content: "Replies, status changes and resolution alerts." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Client"]}>
      <NotificationsPanel />
    </RequireRole>
  ),
});
