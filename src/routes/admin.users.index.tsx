import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, Pencil, Plus, Trash2, Users } from "lucide-react";
import { RequireRole } from "@/components/guard";
import { DeleteEntityDialog } from "@/components/delete-entity-dialog";
import {
  DataTableActions,
  DataTableHead,
  DataTablePagination,
  DataTableRowMenu,
  DateCell,
  EntityCell,
  IdLinkCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import {
  ListingFilterField,
  ListingFilterSelect,
  ListingCardHeader,
  ListingPage,
  useListingFilters,
} from "@/components/listing-page";
import { EmptyState, StatusBadge, TableSkeleton } from "@/components/primitives";
import { InternalUserFormSheet } from "@/components/internal-user-form-sheet";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { getApiErrorMessage } from "@/lib/api";
import { canAdminResetPassword } from "@/lib/user-activation";
import {
  deleteInternalUser,
  fetchInternalUsers,
  resendInternalUserInvitation,
  resetInternalUserPassword,
  updateInternalUserStatus,
} from "@/lib/internal-users";
import type { AccountStatus, InternalUser, PaginatedResult, Role } from "@/lib/types";

interface UserSearch {
  action?: "create";
  edit?: string;
}

export const Route = createFileRoute("/admin/users/")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): UserSearch => ({
    action: search["action"] === "create" ? "create" : undefined,
    edit: typeof search["edit"] === "string" ? search["edit"] : undefined,
  }),
  head: () => ({ meta: [{ title: "Users — Helpdesk Admin" }] }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <UsersPage />
    </RequireRole>
  ),
});

const PAGE_SIZE = 10;
const ANY = "all";
const FILTER_DEFAULTS = { status: ANY, role: ANY };

const TABLE_COLUMNS = ["Employee ID", "Employee", "Email", "Status", "Action"] as const;

function UsersPage() {
  const navigate = useNavigate();
  const routeSearch = Route.useSearch();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (routeSearch.action === "create") {
      setCreateOpen(true);
      navigate({ to: "/admin/users", search: {}, replace: true });
    }
    if (routeSearch.edit) {
      setEditId(routeSearch.edit);
      navigate({ to: "/admin/users", search: {}, replace: true });
    }
  }, [routeSearch.action, routeSearch.edit, navigate]);

  useEffect(() => setPage(1), [debouncedSearch, filters.status, filters.role, limit]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["internal-users", { page, limit, search: debouncedSearch, filters }],
    queryFn: async () => {
      const result = await fetchInternalUsers({
        page,
        limit,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(filters.status !== ANY && { status: filters.status as AccountStatus }),
        ...(filters.role !== ANY && { role: filters.role as Role }),
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      if (Array.isArray(result)) {
        return { items: result, meta: { page: 1, limit: result.length, total: result.length, totalPages: 1 } };
      }
      return result as PaginatedResult<InternalUser>;
    },
  });

  useEffect(() => {
    if (isError) toast.error(getApiErrorMessage(error, "Failed to load users"));
  }, [isError, error]);

  const statusMutation = useMutation({
    mutationFn: ({ id, next }: { id: string; next: AccountStatus }) => updateInternalUserStatus(id, next),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internal-users"] });
      toast.success("User status updated.");
    },
    onError: (err) => toast.error(getApiErrorMessage(err, "Failed to update status")),
  });

  const inviteMutation = useMutation({
    mutationFn: resendInternalUserInvitation,
    onSuccess: () => toast.success("Invitation sent."),
    onError: (err) => toast.error(getApiErrorMessage(err, "Failed to send invitation")),
  });

  const resetMutation = useMutation({
    mutationFn: resetInternalUserPassword,
    onSuccess: () => toast.success("Password reset email sent."),
    onError: (err) => toast.error(getApiErrorMessage(err, "Failed to reset password")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteInternalUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internal-users"] });
      setDeleteTarget(null);
      toast.success("User deleted.");
    },
    onError: (err) => toast.error(getApiErrorMessage(err, "Failed to delete user")),
  });

  const items = data?.items ?? [];
  const meta = data?.meta;

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    clear();
    setPage(1);
  };

  return (
    <ListingPage>
      <ListingCardHeader
        title="Users"
        description={meta ? `Total ${meta.total} users` : "Loading users…"}
        value={search}
        onChange={setSearch}
        placeholder="Search by employee ID, name or email…"
        filterOpen={open}
        onFilterOpenChange={setOpen}
        activeFilterCount={activeCount}
        onFilterApply={apply}
        onFilterClear={clearFilters}
        primaryAction={
          <Button size="sm" className="rounded-md" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" /> New user
          </Button>
        }
        filterContent={
          <>
            <ListingFilterField label="Role">
              <ListingFilterSelect
                value={draft.role}
                onChange={(value) => patchDraft({ role: value })}
                options={[["Admin", "Admin"], ["Staff", "Staff"]]}
                allLabel="All roles"
              />
            </ListingFilterField>
            <ListingFilterField label="Status">
              <ListingFilterSelect
                value={draft.status}
                onChange={(value) => patchDraft({ status: value })}
                options={["Active", "Inactive", "Suspended"].map((s) => [s, s])}
                allLabel="All status"
              />
            </ListingFilterField>
          </>
        }
      />

      {isLoading ? (
        <TableSkeleton rows={6} cols={5} />
      ) : items.length === 0 ? (
        <EmptyState icon={Users} title="No users found" description="Create your first internal user." />
      ) : (
        <>
          <Table className="min-w-6xl">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {TABLE_COLUMNS.map((heading) => (
                  <DataTableHead key={heading} className={heading === "Action" ? "text-right" : undefined} sortable={heading !== "Action"}>
                    {heading}
                  </DataTableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((user) => (
                <TableRow key={user.id ?? user._id}>
                  <TableCell>
                    <IdLinkCell
                      id={user.employeeId ?? "—"}
                      to="/admin/users/$userId"
                      params={{ userId: user.id ?? user._id! }}
                    />
                  </TableCell>
                  <TableCell>
                    <EntityCell
                      name={user.name ?? `${user.firstName} ${user.lastName}`}
                      hue={220}
                      showAvatar
                    />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell>
                    <DataTableActions>
                      <DataTableRowMenu>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/users/$userId" params={{ userId: user.id ?? user._id! }}>
                            <Eye className="size-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditId(user.id ?? user._id!)}>
                          <Pencil className="size-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            statusMutation.mutate({
                              id: user.id ?? user._id!,
                              next: user.status === "Active" ? "Inactive" : "Active",
                            })
                          }
                        >
                          {user.status === "Active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => inviteMutation.mutate(user.id ?? user._id!)}>
                          Resend invitation
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={!canAdminResetPassword(user.invitationStatus)}
                          onClick={() => resetMutation.mutate(user.id ?? user._id!)}
                        >
                          Reset password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() =>
                            setDeleteTarget({
                              id: user.id ?? user._id!,
                              name: user.name ?? `${user.firstName} ${user.lastName}`,
                            })
                          }
                        >
                          <Trash2 className="size-4" /> Delete
                        </DropdownMenuItem>
                      </DataTableRowMenu>
                    </DataTableActions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {meta && (
            <DataTablePagination
              page={meta.page}
              limit={meta.limit}
              total={meta.total}
              totalPages={meta.totalPages}
              entityLabel="users"
              onPageChange={setPage}
              onLimitChange={setLimit}
            />
          )}
        </>
      )}

      <InternalUserFormSheet
        open={createOpen}
        onOpenChange={setCreateOpen}
        mode="create"
        onSaved={(userId) => navigate({ to: "/admin/users/$userId", params: { userId } })}
      />
      {editId ? (
        <InternalUserFormSheet
          open
          onOpenChange={(open) => {
            if (!open) setEditId(null);
          }}
          mode="edit"
          userId={editId}
          onSaved={() => queryClient.invalidateQueries({ queryKey: ["internal-users"] })}
        />
      ) : null}

      <DeleteEntityDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete user?"
        description={
          deleteTarget
            ? `${deleteTarget.name} will be permanently removed. Users with assigned tickets cannot be deleted.`
            : ""
        }
        isPending={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
        }}
      />
    </ListingPage>
  );
}
