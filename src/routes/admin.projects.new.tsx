import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";

export const Route = createFileRoute("/admin/projects/new")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "New Project — Helpdesk Admin" },
      { name: "description", content: "Create a new customer project with dates, hours and status." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <NewProjectRedirect />
    </RequireRole>
  ),
});

function NewProjectRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/admin/projects", search: { action: "create" }, replace: true });
  }, [navigate]);

  return null;
}
