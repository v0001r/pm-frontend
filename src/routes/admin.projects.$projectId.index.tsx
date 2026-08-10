import { createFileRoute } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";
import { ProjectOverview } from "@/components/project-overview";

export const Route = createFileRoute("/admin/projects/$projectId/")({
  ssr: false,
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
  return <ProjectOverview projectId={projectId} mode="admin" />;
}
