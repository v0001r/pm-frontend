import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";

export const Route = createFileRoute("/admin/customers/$customerId/edit")({
  ssr: false,
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <EditCustomerRedirect />
    </RequireRole>
  ),
});

function EditCustomerRedirect() {
  const navigate = useNavigate();
  const { customerId } = Route.useParams();

  useEffect(() => {
    navigate({
      to: "/admin/customers/$customerId",
      params: { customerId },
      search: { edit: true },
      replace: true,
    });
  }, [navigate, customerId]);

  return null;
}
