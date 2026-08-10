import { createFileRoute } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";
import { ProjectOverview } from "@/components/project-overview";

export const Route = createFileRoute("/portal/projects/$projectId")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Project Overview — Helpdesk" }],
  }),
  component: () => (
    <RequireRole roles={["Client"]}>
      <PortalProjectDetailPage />
    </RequireRole>
  ),
});

function PortalProjectDetailPage() {
  const { projectId } = Route.useParams();
  return <ProjectOverview projectId={projectId} mode="client" />;
}
