import { createFileRoute } from "@tanstack/react-router";
import { ClientRoute } from "@/components/guard";
import { PortalHome } from "./portal.index";

export const Route = createFileRoute("/client/dashboard")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Client Dashboard — Helpdesk" }],
  }),
  component: () => (
    <ClientRoute>
      <PortalHome />
    </ClientRoute>
  ),
});
