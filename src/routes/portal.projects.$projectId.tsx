import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, CalendarRange, Clock3, FolderKanban, Plus, Ticket } from "lucide-react";
import { RequireRole } from "@/components/guard";
import {
  EmptyState,
  KpiCard,
  PageHeader,
  ProjectStatusBadge,
  SectionCard,
  TableSkeleton,
} from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api";
import { describeProjectActivity } from "@/lib/project-activity";
import { fetchProject, fetchProjectActivities } from "@/lib/projects";
import { formatDate, relativeTime } from "@/lib/store";

export const Route = createFileRoute("/portal/projects/$projectId")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Project Details — Helpdesk" }],
  }),
  component: () => (
    <RequireRole roles={["Client"]}>
      <PortalProjectDetailPage />
    </RequireRole>
  ),
});

function PortalProjectDetailPage() {
  const { projectId } = Route.useParams();

  const projectQuery = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProject(projectId),
  });

  const activitiesQuery = useQuery({
    queryKey: ["project-activities", projectId, { portal: true }],
    queryFn: () => fetchProjectActivities(projectId, { page: 1, limit: 5 }),
    enabled: !!projectQuery.data,
  });

  useEffect(() => {
    if (projectQuery.isError) {
      toast.error(getApiErrorMessage(projectQuery.error, "Failed to load project"));
    }
  }, [projectQuery.isError, projectQuery.error]);

  const project = projectQuery.data;
  const overview = project?.overview;
  const activities = activitiesQuery.data?.items ?? [];

  if (projectQuery.isLoading) {
    return (
      <>
        <PageHeader title="Project details" description="Loading..." />
        <TableSkeleton rows={6} cols={3} />
      </>
    );
  }

  if (projectQuery.isError || !project) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="Project not found"
        description="This project is unavailable or you do not have access."
        action={
          <Button size="sm" variant="outline" asChild>
            <Link to="/portal/projects">Back to projects</Link>
          </Button>
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        title={project.name}
        description={`${project.projectId} · ${project.customerName ?? "Your organization"}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/portal/projects">
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/portal/tickets/new" search={{ projectId }}>
                <Plus className="size-4" />
                Raise ticket
              </Link>
            </Button>
          </div>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <ProjectStatusBadge status={project.status} />
        {project.label ? (
          <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">{project.label}</span>
        ) : null}
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Open tickets" value={overview?.openTickets ?? 0} icon={Ticket} tone="warning" />
        <KpiCard label="Completed tickets" value={overview?.completedTickets ?? 0} icon={Ticket} tone="success" />
        <KpiCard label="Consumed hours" value={`${overview?.consumedHours ?? 0}h`} icon={Clock3} />
        <KpiCard label="Progress" value={`${project.progressPercentage}%`} icon={FolderKanban} tone="primary" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Overview">
          <div className="space-y-4 p-5 text-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Start date</p>
                <p className="mt-1 flex items-center gap-2">
                  <CalendarRange className="size-4 text-muted-foreground" />
                  {formatDate(project.startDate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">End date</p>
                <p className="mt-1 flex items-center gap-2">
                  <CalendarRange className="size-4 text-muted-foreground" />
                  {project.endDate ? formatDate(project.endDate) : "No end date"}
                </p>
              </div>
            </div>
            {project.description ? (
              <div>
                <p className="text-xs text-muted-foreground uppercase">Description</p>
                <p className="mt-1 leading-6 text-muted-foreground">{project.description}</p>
              </div>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard title="Recent activity">
          {activitiesQuery.isLoading ? (
            <TableSkeleton rows={4} cols={1} />
          ) : activities.length === 0 ? (
            <EmptyState title="No activity yet" description="Updates to this project will appear here." />
          ) : (
            <ol className="divide-y">
              {activities.map((activity) => (
                <li key={activity._id} className="px-5 py-4">
                  <p className="font-medium">{activity.action}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{describeProjectActivity(activity)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{relativeTime(activity.createdAt)}</p>
                </li>
              ))}
            </ol>
          )}
        </SectionCard>
      </div>
    </>
  );
}
