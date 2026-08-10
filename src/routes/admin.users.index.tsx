import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Download, Eye, MoreHorizontal, Pencil, Plus, Users } from "lucide-react";
import { RequireRole } from "@/components/guard";
import {
  DataTableActions,
  DataTableIconButton,
  DataTablePagination,
  PrimaryCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import {
  ListingFilterField,
  ListingFilterSelect,
  ListingPage,
  ListingPageHeader,
  ListingSearchRow,
  useListingFilters,
} from "@/components/listing-page";
import { EmptyState, StatusBadge, TableSkeleton } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getApiErrorMessage } from "@/lib/api";
import {
  exportInternalUsers,
  fetchInternalUsers,
  resendInternalUserInvitation,
  resetInternalUserPassword,
  updateInternalUserStatus,
} from "@/lib/internal-users";
import { fetchDepartments } from "@/lib/org";
import type { AccountStatus, InternalUser, PaginatedResult, Role } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/admin/users/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Users — Helpdesk Admin" }] }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <UsersPage />
    </RequireRole>
  ),
});

const PAGE_SIZE = 10;
const ANY = "all";

const FILTER_DEFAULTS = { status: ANY, role: ANY, departmentId: ANY };

function UsersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => setPage(1), [debouncedSearch, filters.status, filters.role, filters.departmentId]);

  const departmentsQuery = useQuery({ queryKey: ["departments"], queryFn: fetchDepartments });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["internal-users", { page, search: debouncedSearch, filters }],
    queryFn: async () => {
      const result = await fetchInternalUsers({
        page,
        limit: PAGE_SIZE,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(filters.status !== ANY && { status: filters.status as AccountStatus }),
        ...(filters.role !== ANY && { role: filters.role as Role }),
        ...(filters.departmentId !== ANY && { departmentId: filters.departmentId }),
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

  const items = data?.items ?? [];
  const meta = data?.meta;

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    clear();
    setPage(1);
  };

  const exportUsers = async () => {
    try {
      const blob = await exportInternalUsers({
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(filters.status !== ANY && { status: filters.status as AccountStatus }),
        ...(filters.role !== ANY && { role: filters.role as Role }),
        ...(filters.departmentId !== ANY && { departmentId: filters.departmentId }),
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "users.csv";
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Export failed"));
    }
  };

  return (
    <ListingPage
      header={
        <ListingPageHeader
          title="Internal users"
          description="Manage employees, roles, and portal access."
          breadcrumbs={[{ label: "Admin", to: "/admin" }, { label: "Users" }]}
          exportAction={
            <Button size="sm" variant="outline" className="rounded-xl" onClick={exportUsers}>
              <Download className="size-4" /> Export
            </Button>
          }
          addAction={
            <Button size="sm" className="rounded-xl" asChild>
              <Link to="/admin/users/new"><Plus className="size-4" /> New user</Link>
            </Button>
          }
        />
      }
    >
      <ListingSearchRow
        value={search}
        onChange={setSearch}
        placeholder="Search users…"
        filterOpen={open}
        onFilterOpenChange={setOpen}
        activeFilterCount={activeCount}
        onFilterApply={apply}
        onFilterClear={clearFilters}
        filterContent={
          <>
            <ListingFilterField label="Department">
              <ListingFilterSelect
                value={draft.departmentId}
                onChange={(value) => patchDraft({ departmentId: value })}
                options={(departmentsQuery.data ?? []).map((d) => [d._id, d.name])}
                allLabel="All departments"
              />
            </ListingFilterField>
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
          <TableSkeleton rows={6} cols={7} />
        ) : items.length === 0 ? (
          <EmptyState icon={Users} title="No users found" description="Create your first internal user." />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {["Employee", "Designation", "Department", "Team", "Email", "Status", "Actions"].map((h) => (
                    <TableHead key={h} className={h === "Actions" ? "text-right" : undefined}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((user) => (
                  <TableRow key={user.id ?? user._id}>
                    <TableCell>
                      <PrimaryCell
                        id={user.employeeId ?? "—"}
                        title={user.name ?? `${user.firstName} ${user.lastName}`}
                        to="/admin/users/$userId"
                        params={{ userId: user.id ?? user._id! }}
                      />
                    </TableCell>
                    <TableCell>{user.designation || "—"}</TableCell>
                    <TableCell>{user.departmentName ?? user.department ?? "—"}</TableCell>
                    <TableCell>{user.teamName ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell><StatusBadge status={user.status} /></TableCell>
                    <TableCell>
                      <DataTableActions>
                        <DataTableIconButton label="View" asChild>
                          <Link to="/admin/users/$userId" params={{ userId: user.id ?? user._id! }}>
                            <Eye className="size-4" />
                          </Link>
                        </DataTableIconButton>
                        <DataTableIconButton label="Edit" asChild>
                          <Link to="/admin/users/$userId/edit" params={{ userId: user.id ?? user._id! }}>
                            <Pencil className="size-4" />
                          </Link>
                        </DataTableIconButton>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground hover:text-foreground" aria-label="More actions">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => inviteMutation.mutate(user.id ?? user._id!)}>
                              Resend invitation
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => resetMutation.mutate(user.id ?? user._id!)}>
                              Reset password
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
              />
            )}
          </>
        )}
    </ListingPage>
  );
}
