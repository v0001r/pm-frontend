import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/projects/$projectId/members")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/admin/projects/$projectId",
      params: { projectId: params.projectId },
    });
  },
});
