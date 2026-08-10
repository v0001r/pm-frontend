import { createFileRoute } from "@tanstack/react-router";
import { AdminRoute } from "@/components/guard";
import { AdminDashboard } from "./admin.index";

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Admin Dashboard — Helpdesk" }],
  }),
  component: () => (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  ),
});
