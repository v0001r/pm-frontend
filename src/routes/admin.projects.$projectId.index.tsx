import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { RequireRole } from "@/components/guard";
import { ProjectOverview } from "@/components/project-overview";

export const Route = createFileRoute("/admin/projects/$projectId/")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    edit: search["edit"] === true || search["edit"] === "true",
  }),
  head: () => ({
    meta: [
      { title: "Project Overview — Helpdesk Admin" },
      { name: "description", content: "Project overview with stats, team members and activity timeline." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <AdminProjectDetailPage />
    </RequireRole>
  ),
});

function AdminProjectDetailPage() {
  const { projectId } = Route.useParams();
  const routeSearch = Route.useSearch();
  const navigate = useNavigate();
  const initialEditOpen = routeSearch.edit;

  useEffect(() => {
    if (routeSearch.edit) {
      navigate({ to: "/admin/projects/$projectId", params: { projectId }, search: {}, replace: true });
    }
  }, [routeSearch.edit, navigate, projectId]);

  return <ProjectOverview projectId={projectId} mode="admin" initialEditOpen={initialEditOpen} />;
}
