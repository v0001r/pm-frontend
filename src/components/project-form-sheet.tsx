import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FormSheet } from "@/components/form-sheet";
import { ProjectForm, projectToFormValues } from "@/components/project-form";
import { TableSkeleton } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api";
import { fetchProject } from "@/lib/projects";

interface ProjectFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  projectId?: string;
  defaultCustomerId?: string;
  onSaved?: (projectId: string) => void;
}

export function ProjectFormSheet({
  open,
  onOpenChange,
  mode,
  projectId,
  defaultCustomerId,
  onSaved,
}: ProjectFormSheetProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProject(projectId!),
    enabled: mode === "edit" && !!projectId && open,
  });

  const invalidate = (id: string) => {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    queryClient.invalidateQueries({ queryKey: ["project", id] });
    queryClient.invalidateQueries({ queryKey: ["customer-projects"] });
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      title={mode === "create" ? "New project" : `Edit ${data?.name ?? "project"}`}
      description={
        mode === "create"
          ? "Create a project for a customer and define its schedule, hours and status."
          : (data ? `${data.projectId} · ${data.customerName ?? "Customer project"}` : "Update project details.")
      }
    >
      {mode === "edit" && isLoading ? (
        <TableSkeleton rows={8} cols={2} />
      ) : mode === "edit" && (isError || !data) ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <p className="text-sm text-muted-foreground">Unable to load this project.</p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <ProjectForm
          key={mode === "edit" ? projectId : `create-${defaultCustomerId ?? "new"}`}
          mode={mode}
          projectId={projectId}
          initialValues={
            mode === "edit" && data
              ? projectToFormValues(data)
              : defaultCustomerId
                ? { customerId: defaultCustomerId }
                : undefined
          }
          customerName={data?.customerName}
          onCancel={() => onOpenChange(false)}
          onSuccess={(id) => {
            invalidate(id);
            onOpenChange(false);
            onSaved?.(id);
          }}
        />
      )}
    </FormSheet>
  );
}
