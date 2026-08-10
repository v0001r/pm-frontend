import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";

export const Route = createFileRoute("/admin/users/$userId/edit")({
  ssr: false,
  component: () => (
    <RequireRole roles={["Admin"]}>
      <EditUserRedirect />
    </RequireRole>
  ),
});

function EditUserRedirect() {
  const navigate = useNavigate();
  const { userId } = Route.useParams();

  useEffect(() => {
    navigate({
      to: "/admin/users/$userId",
      params: { userId },
      search: { edit: true },
      replace: true,
    });
  }, [navigate, userId]);

  return null;
}
