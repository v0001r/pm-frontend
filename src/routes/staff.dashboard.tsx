import { createFileRoute } from "@tanstack/react-router";
import { StaffRoute } from "@/components/guard";
import { AdminDashboard } from "./admin.index";

export const Route = createFileRoute("/staff/dashboard")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Staff Dashboard — Helpdesk" }],
  }),
  component: () => (
    <StaffRoute>
      <AdminDashboard />
    </StaffRoute>
  ),
});
