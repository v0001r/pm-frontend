import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Plus, Search, Trash2, Users } from "lucide-react";
import { AssignProjectMemberDialog } from "@/components/assign-project-member-dialog";
import { RequireRole } from "@/components/guard";
import { EmptyState, PageHeader, SectionCard, TableSkeleton } from "@/components/primitives";
import {
  DataTableActions,
  DataTableIconButton,
  DataTablePagination,
  DataTableToolbar,
  EntityCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";
import { fetchProject, fetchProjectMembers, removeProjectMember } from "@/lib/projects";
import { formatDate } from "@/lib/store";
import type { ProjectMember } from "@/lib/types";

export const Route = createFileRoute("/admin/projects/$projectId/members")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Project Members — Helpdesk Admin" },
      { name: "description", content: "Assign and manage employees on a project with hour allocation." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff", "Client"]}>
      <ProjectMembersPage />
    </RequireRole>
  ),
});

const PAGE_SIZE = 10;

function ProjectMembersPage() {
  const { projectId } = Route.useParams();
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [assignOpen, setAssignOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<ProjectMember | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const projectQuery = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProject(projectId),
  });

  const membersQuery = useQuery({
    queryKey: ["project-members", projectId, { page, search: debouncedSearch }],
    queryFn: () =>
      fetchProjectMembers(projectId, {
        page,
        limit: PAGE_SIZE,
        ...(debouncedSearch && { search: debouncedSearch }),
      }),
    enabled: !!projectQuery.data,
  });

  const allMembersQuery = useQuery({
    queryKey: ["project-members", projectId, "all"],
    queryFn: () => fetchProjectMembers(projectId, { page: 1, limit: 100 }),
    enabled: !!projectQuery.data,
  });

  const removeMutation = useMutation({
    mutationFn: (memberId: string) => removeProjectMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-members", projectId] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["project-activities", projectId] });
      toast.success("Member removed successfully");
      setMemberToRemove(null);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to remove member"));
    },
  });

  useEffect(() => {
    if (projectQuery.isError) {
      toast.error(getApiErrorMessage(projectQuery.error, "Failed to load project"));
    }
  }, [projectQuery.isError, projectQuery.error]);

  const project = projectQuery.data;
  const members = membersQuery.data?.items ?? [];
  const meta = membersQuery.data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const currentPage = meta?.page ?? page;

  const allocatedHours = useMemo(
    () =>
      (allMembersQuery.data?.items ?? []).reduce(
        (sum, member) => sum + member.internalHours + member.externalHours,
        0,
      ),
    [allMembersQuery.data],
  );

  const assignedEmployeeIds = useMemo(
    () => (allMembersQuery.data?.items ?? []).map((member) => member.employeeId),
    [allMembersQuery.data],
  );

  if (projectQuery.isLoading) {
    return (
      <>
        <PageHeader title="Project members" description="Loading..." />
        <TableSkeleton rows={6} cols={5} />
      </>
    );
  }

  if (projectQuery.isError || !project) {
    return (
      <EmptyState
        icon={Users}
        title="Project not found"
        description="Unable to load member management for this project."
        action={
          <Button size="sm" variant="outline" asChild>
            <Link to="/admin/projects">Back to projects</Link>
          </Button>
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Project members"
        description={`${project.name} · ${project.projectId}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/admin/projects/$projectId" params={{ projectId }}>
                <ArrowLeft className="size-4" />
                Overview
              </Link>
            </Button>
            {isAdmin ? (
              <Button size="sm" onClick={() => setAssignOpen(true)}>
                <Plus className="size-4" />
                Assign member
              </Button>
            ) : null}
          </div>
        }
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <div className="panel rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase">Team size</p>
          <p className="tabular mt-1 text-2xl font-bold">{project.overview?.totalMembers ?? meta?.total ?? 0}</p>
        </div>
        <div className="panel rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase">Allocated hours</p>
          <p className="tabular mt-1 text-2xl font-bold">
            {allocatedHours}h <span className="text-base font-normal text-muted-foreground">/ {project.maxHours}h</span>
          </p>
        </div>
        <div className="panel rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase">Remaining budget</p>
          <p className="tabular mt-1 text-2xl font-bold">{Math.max(project.maxHours - allocatedHours, 0)}h</p>
        </div>
      </div>

      <SectionCard className="overflow-hidden">
        <DataTableToolbar>
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search members by name or designation…"
              className="h-10 rounded-xl border-border/60 bg-surface pl-10"
            />
          </div>
        </DataTableToolbar>

        {membersQuery.isLoading ? (
          <TableSkeleton rows={6} cols={5} />
        ) : members.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No members assigned"
            description={
              isAdmin
                ? "Assign employees to start tracking work on this project."
                : "No team members have been assigned yet."
            }
            action={
              isAdmin ? (
                <Button size="sm" onClick={() => setAssignOpen(true)}>
                  <Plus className="size-4" />
                  Assign member
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <Table className="min-w-4xl">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {["Member", "Designation", "Internal", "External", "Total", "Assigned", "Actions"].map((heading) => (
                  <TableHead key={heading} className={heading === "Actions" ? "text-right" : undefined}>
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member._id}>
                  <TableCell>
                    <EntityCell name={member.employeeName} subtitle={member.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.designation || "—"}</TableCell>
                  <TableCell className="tabular">{member.internalHours}h</TableCell>
                  <TableCell className="tabular">{member.externalHours}h</TableCell>
                  <TableCell className="tabular font-semibold">
                    {member.internalHours + member.externalHours}h
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.assignedDate ? formatDate(member.assignedDate) : "—"}
                  </TableCell>
                  <TableCell>
                    {isAdmin ? (
                      <DataTableActions>
                        <DataTableIconButton
                          label="Remove member"
                          onClick={() => setMemberToRemove(member)}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </DataTableIconButton>
                      </DataTableActions>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {meta && (
            <DataTablePagination
              page={currentPage}
              limit={meta.limit}
              total={meta.total}
              totalPages={totalPages}
              entityLabel="members"
              onPageChange={setPage}
            />
          )}
          </>
        )}
      </SectionCard>

      {isAdmin ? (
        <AssignProjectMemberDialog
          projectId={projectId}
          open={assignOpen}
          onOpenChange={setAssignOpen}
          assignedEmployeeIds={assignedEmployeeIds}
          maxHours={project.maxHours}
          allocatedHours={allocatedHours}
        />
      ) : null}

      <AlertDialog open={!!memberToRemove} onOpenChange={(open) => !open && setMemberToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove team member?</AlertDialogTitle>
            <AlertDialogDescription>
              {memberToRemove
                ? `${memberToRemove.employeeName} will be removed from this project. They cannot be removed if they have pending tickets or active timesheets.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={removeMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={removeMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                if (memberToRemove) {
                  removeMutation.mutate(memberToRemove._id);
                }
              }}
            >
              {removeMutation.isPending ? "Removing..." : "Remove member"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
