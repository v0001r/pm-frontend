import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";

export const Route = createFileRoute("/admin/projects/$projectId/edit")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Edit Project — Helpdesk Admin" },
      { name: "description", content: "Update project details, schedule, hours and status." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <EditProjectRedirect />
    </RequireRole>
  ),
});

function EditProjectRedirect() {
  const navigate = useNavigate();
  const { projectId } = Route.useParams();

  useEffect(() => {
    navigate({
      to: "/admin/projects/$projectId",
      params: { projectId },
      search: { edit: true },
      replace: true,
    });
  }, [navigate, projectId]);

  return null;
}
