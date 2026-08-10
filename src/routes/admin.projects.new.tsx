import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";
import { PageHeader, SectionCard } from "@/components/primitives";
import { ProjectForm } from "@/components/project-form";

export const Route = createFileRoute("/admin/projects/new")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "New Project — Helpdesk Admin" },
      { name: "description", content: "Create a new customer project with dates, hours and status." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <NewProjectPage />
    </RequireRole>
  ),
});

function NewProjectPage() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="New project"
        description="Create a project for a customer and define its schedule, hours and status."
      />
      <SectionCard>
        <ProjectForm
          mode="create"
          onCancel={() => navigate({ to: "/admin/projects" })}
          onSuccess={() => navigate({ to: "/admin/projects" })}
        />
      </SectionCard>
    </>
  );
}
