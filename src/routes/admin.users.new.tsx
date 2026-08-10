import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";

export const Route = createFileRoute("/admin/users/new")({
  ssr: false,
  head: () => ({ meta: [{ title: "New User — Helpdesk Admin" }] }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <NewUserRedirect />
    </RequireRole>
  ),
});

function NewUserRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/admin/users", search: { action: "create" }, replace: true });
  }, [navigate]);

  return null;
}
