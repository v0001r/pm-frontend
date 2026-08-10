import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";

export const Route = createFileRoute("/admin/customers/new")({
  ssr: false,
  head: () => ({ meta: [{ title: "New Customer — Helpdesk Admin" }] }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <NewCustomerRedirect />
    </RequireRole>
  ),
});

function NewCustomerRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/admin/customers", search: { action: "create" }, replace: true });
  }, [navigate]);

  return null;
}
