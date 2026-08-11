import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, FolderKanban, Info, KeyRound, Mail, Pencil, Settings, Ticket, Trash2, User, UserCheck, UserX } from "lucide-react";
import { RequireRole } from "@/components/guard";
import { DeleteEntityDialog } from "@/components/delete-entity-dialog";
import { InternalUserFormSheet } from "@/components/internal-user-form-sheet";
import { SectionCard, StatusBadge, TableSkeleton } from "@/components/primitives";
import { UserProjectsTab } from "@/components/user-projects-tab";
import { UserTicketsTab } from "@/components/user-tickets-tab";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api";
import { isAdmin, useAuth } from "@/lib/auth";
import {
  deleteInternalUser,
  fetchInternalUserOverview,
  resendInternalUserInvitation,
  resetInternalUserPassword,
  updateInternalUserLogin,
  updateInternalUserStatus,
} from "@/lib/internal-users";
import { formatDate } from "@/lib/store";
import { cn } from "@/lib/utils";

type UserTab = "information" | "account" | "projects" | "tickets";

const userTabs: { id: UserTab; label: string; icon: typeof User }[] = [
  { id: "information", label: "Information", icon: Info },
  { id: "account", label: "Account", icon: Settings },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "tickets", label: "Tickets", icon: Ticket },
];

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
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<UserTab>("information");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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

  const deleteMutation = useMutation({
    mutationFn: () => deleteInternalUser(userId),
    onSuccess: () => {
      toast.success("User deleted.");
      navigate({ to: "/admin/users" });
    },
    onError: (err) => toast.error(getApiErrorMessage(err, "Failed to delete user")),
  });

  if (overviewQuery.isLoading || !overviewQuery.data) {
    return <TableSkeleton rows={6} cols={4} />;
  }

  const { user } = overviewQuery.data;
  const displayName = user.name ?? `${user.firstName} ${user.lastName}`;

  return (
    <div className="flex flex-col gap-5">
      <section className="overflow-hidden rounded-md border border-border/60 bg-card shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 p-5">
          <div className="flex min-w-0 items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <User className="size-7" />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{displayName}</h1>
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
            {isAdmin(currentUser?.role) && (
              <>
                <Button size="sm" variant="outline" disabled={inviteMutation.isPending} onClick={() => inviteMutation.mutate()}>
                  <Mail className="size-4" />
                  Resend invite
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={statusMutation.isPending}
                  onClick={() => statusMutation.mutate(user.status === "Active" ? "Inactive" : "Active")}
                >
                  {user.status === "Active" ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto border-t border-border/60">
          <nav className="flex min-w-max items-center gap-1 px-2">
            {userTabs.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {tab === "information" && (
        <SectionCard title="User information">
          <dl className="grid gap-3 p-4 text-sm sm:grid-cols-2">
            {[
              ["Employee ID", user.employeeId || "—"],
              ["Full name", displayName],
              ["Email", user.email],
              ["Mobile", user.phone || "—"],
              ["Department", user.departmentName ?? user.department ?? "—"],
              ["Designation", user.designation || "—"],
              ["Team", user.teamName ?? "—"],
              ["Reporting manager", user.reportingManagerName ?? "—"],
              ["Joining date", user.dateOfJoining ? formatDate(user.dateOfJoining) : "—"],
              ["Role", user.role],
              ["Created", user.createdAt ? formatDate(user.createdAt) : "—"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </SectionCard>
      )}

      {tab === "account" && (
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
          {isAdmin(currentUser?.role) && (
            <div className="flex flex-wrap gap-2 border-t p-4">
              <Button size="sm" variant="outline" disabled={resetMutation.isPending} onClick={() => resetMutation.mutate()}>
                <KeyRound className="size-4" /> Reset password
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
            </div>
          )}
        </SectionCard>
      )}

      {tab === "projects" && <UserProjectsTab userId={userId} />}

      {tab === "tickets" && <UserTicketsTab userId={userId} />}

      <InternalUserFormSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        mode="edit"
        userId={userId}
        onSaved={() => overviewQuery.refetch()}
      />

      <DeleteEntityDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete user?"
        description={`${displayName} will be permanently removed. Users with assigned tickets cannot be deleted.`}
        isPending={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate()}
      />
    </div>
  );
}
