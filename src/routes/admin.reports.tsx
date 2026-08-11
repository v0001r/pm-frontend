import { createFileRoute } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";
import { ReportsWorkspace } from "@/components/reports/reports-workspace";

export const Route = createFileRoute("/admin/reports")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reports & Analytics — Helpdesk Admin" },
      { name: "description", content: "Ticket volume, SLA performance, workload and support quality reporting." },
      { property: "og:title", content: "Reports & Analytics — Helpdesk Admin" },
      { property: "og:description", content: "Enterprise ticket intelligence and operations reporting." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <ReportsWorkspace />
    </RequireRole>
  ),
});
