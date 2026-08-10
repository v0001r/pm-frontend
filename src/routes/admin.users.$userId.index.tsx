import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, FolderKanban, KeyRound, Mail, Pencil, Settings, User, UserCheck, UserX } from "lucide-react";
import { RequireRole } from "@/components/guard";
import { InternalUserFormSheet } from "@/components/internal-user-form-sheet";
import { EmptyState, KpiCard, SectionCard, StatusBadge, TableSkeleton } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsPanelTrigger } from "@/components/ui/tabs";
import { getApiErrorMessage } from "@/lib/api";
import {
  fetchInternalUserOverview,
  fetchInternalUserProjects,
  resendInternalUserInvitation,
  resetInternalUserPassword,
  updateInternalUserLogin,
  updateInternalUserStatus,
} from "@/lib/internal-users";
import { formatDate } from "@/lib/store";

export const Route = createFileRoute("/admin/users/$userId/")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    edit: search["edit"] === true || search["edit"] === "true",
  }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <UserDetailPage />
    </RequireRole>
  ),
});

function UserDetailPage() {
  const { userId } = Route.useParams();
  const routeSearch = Route.useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("general");
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (routeSearch.edit) {
      setEditOpen(true);
      navigate({ to: "/admin/users/$userId", params: { userId }, search: {}, replace: true });
    }
  }, [routeSearch.edit, navigate, userId]);

  const overviewQuery = useQuery({
    queryKey: ["internal-user-overview", userId],
    queryFn: () => fetchInternalUserOverview(userId),
  });

  const projectsQuery = useQuery({
    queryKey: ["internal-user-projects", userId],
    queryFn: () => fetchInternalUserProjects(userId, { page: 1, limit: 10 }),
    enabled: tab === "projects",
  });

  const statusMutation = useMutation({
    mutationFn: (status: "Active" | "Inactive") => updateInternalUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internal-user-overview", userId] });
      toast.success("Status updated.");
    },
    onError: (err) => toast.error(getApiErrorMessage(err, "Failed to update status")),
  });

  const loginMutation = useMutation({
    mutationFn: (loginEnabled: boolean) => updateInternalUserLogin(userId, loginEnabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internal-user-overview", userId] });
      toast.success("Login setting updated.");
    },
    onError: (err) => toast.error(getApiErrorMessage(err, "Failed to update login")),
  });

  const inviteMutation = useMutation({
    mutationFn: () => resendInternalUserInvitation(userId),
    onSuccess: () => toast.success("Invitation sent."),
    onError: (err) => toast.error(getApiErrorMessage(err, "Failed to send invitation")),
  });

  const resetMutation = useMutation({
    mutationFn: () => resetInternalUserPassword(userId),
    onSuccess: () => toast.success("Password reset sent."),
    onError: (err) => toast.error(getApiErrorMessage(err, "Failed to reset password")),
  });

  if (overviewQuery.isLoading || !overviewQuery.data) {
    return <TableSkeleton rows={6} cols={4} />;
  }

  const { user, summary } = overviewQuery.data;

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-md border border-border/60 bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <User className="size-7" />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {user.name ?? `${user.firstName} ${user.lastName}`}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {user.employeeId ?? "—"} · {user.email}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge status={user.status} />
                <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {user.invitationStatus ?? "Not Sent"}
                </span>
                {user.loginEnabled === false && (
                  <span className="rounded-full border border-destructive/30 px-2.5 py-0.5 text-xs text-destructive">
                    Login disabled
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/admin/users">
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>
            <Button size="sm" onClick={() => setEditOpen(true)}>
              <Pencil className="size-4" />
              Edit User
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Assigned projects" value={summary.assignedProjects} />
        <KpiCard label="Open projects" value={summary.openProjects} tone="warning" />
        <KpiCard label="Completed projects" value={summary.completedProjects} tone="success" />
        <KpiCard label="Pending tickets" value={summary.pendingTickets} />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsPanelTrigger
            value="general"
            icon={<User />}
            title="General"
            description="Employee information"
          />
          <TabsPanelTrigger
            value="account"
            icon={<Settings />}
            title="Account settings"
            description="Login and invitations"
          />
          <TabsPanelTrigger
            value="projects"
            icon={<FolderKanban />}
            title="Projects"
            description="Assigned projects"
          />
        </TabsList>

        <TabsContent value="general">
          <SectionCard title="General information">
            <dl className="grid gap-3 p-4 text-sm sm:grid-cols-2">
              {[
                ["Employee ID", user.employeeId || "—"],
                ["Full name", user.name ?? `${user.firstName} ${user.lastName}`],
                ["Email", user.email],
                ["Mobile", user.phone || "—"],
                ["Department", user.departmentName ?? user.department ?? "—"],
                ["Designation", user.designation || "—"],
                ["Team", user.teamName ?? "—"],
                ["Reporting manager", user.reportingManagerName ?? "—"],
                ["Joining date", user.dateOfJoining ? formatDate(user.dateOfJoining) : "—"],
                ["Status", user.status],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>
        </TabsContent>

        <TabsContent value="account">
          <SectionCard title="Account settings">
            <dl className="grid gap-3 p-4 text-sm sm:grid-cols-2">
              {[
                ["Login email", user.email],
                ["Role", user.role],
                ["Login status", user.loginEnabled === false ? "Disabled" : "Enabled"],
                ["Account status", user.status],
                ["Last login", user.lastLogin ? formatDate(user.lastLogin) : "—"],
                ["Invitation status", user.invitationStatus ?? "Not Sent"],
                ["First login completed", user.firstLoginCompleted ? "Yes" : "No"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-2 border-t p-4">
              <Button size="sm" variant="outline" disabled={resetMutation.isPending} onClick={() => resetMutation.mutate()}>
                <KeyRound className="size-4" /> Reset password
              </Button>
              <Button size="sm" variant="outline" disabled={inviteMutation.isPending} onClick={() => inviteMutation.mutate()}>
                <Mail className="size-4" /> Resend invitation
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={loginMutation.isPending}
                onClick={() => loginMutation.mutate(user.loginEnabled !== false ? false : true)}
              >
                {user.loginEnabled === false ? <UserCheck className="size-4" /> : <UserX className="size-4" />}
                {user.loginEnabled === false ? "Enable login" : "Disable login"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={statusMutation.isPending}
                onClick={() => statusMutation.mutate(user.status === "Active" ? "Inactive" : "Active")}
              >
                {user.status === "Active" ? "Deactivate" : "Activate"}
              </Button>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="projects">
          <SectionCard>
            {(projectsQuery.data?.items ?? []).length === 0 ? (
              <EmptyState title="No projects" description="Assigned projects will appear here." />
            ) : (
              <ul className="divide-y">
                {(projectsQuery.data?.items ?? []).map((project) => (
                  <li key={String(project._id)} className="flex items-center justify-between px-4 py-3 text-sm">
                    <div>
                      <p className="font-medium">{String(project.name)}</p>
                      <p className="text-xs text-muted-foreground">
                        {String(project.projectId)} · {String(project.customerName)}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link to="/admin/projects/$projectId" params={{ projectId: String(project._id) }}>View</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </TabsContent>
      </Tabs>

      <InternalUserFormSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        mode="edit"
        userId={userId}
        onSaved={() => overviewQuery.refetch()}
      />
    </div>
  );
}
