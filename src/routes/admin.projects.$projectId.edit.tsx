import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { RequireRole } from "@/components/guard";
import { PageHeader, SectionCard, TableSkeleton } from "@/components/primitives";
import { ProjectForm, projectToFormValues } from "@/components/project-form";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api";
import { fetchProject } from "@/lib/projects";

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
      <EditProjectPage />
    </RequireRole>
  ),
});

function EditProjectPage() {
  const navigate = useNavigate();
  const { projectId } = Route.useParams();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProject(projectId),
  });

  useEffect(() => {
    if (isError) {
      toast.error(getApiErrorMessage(error, "Failed to load project"));
    }
  }, [isError, error]);

  return (
    <>
      <PageHeader
        title={data ? `Edit ${data.name}` : "Edit project"}
        description={data ? `${data.projectId} · ${data.customerName ?? "Customer project"}` : "Update project details"}
      />
      <SectionCard>
        {isLoading ? (
          <TableSkeleton rows={8} cols={2} />
        ) : isError || !data ? (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <p className="text-sm text-muted-foreground">Unable to load this project.</p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : (
          <ProjectForm
            key={data._id}
            mode="edit"
            projectId={projectId}
            initialValues={projectToFormValues(data)}
            customerName={data.customerName}
            onCancel={() => navigate({ to: "/admin/projects" })}
            onSuccess={() => navigate({ to: "/admin/projects/$projectId", params: { projectId } })}
          />
        )}
      </SectionCard>
    </>
  );
}
