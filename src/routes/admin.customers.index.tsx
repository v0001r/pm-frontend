import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, Pencil, Plus, Users } from "lucide-react";
import { RequireRole } from "@/components/guard";
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
import { CustomerFormSheet } from "@/components/customer-form-sheet";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getApiErrorMessage } from "@/lib/api";
import { fetchCustomers } from "@/lib/customers";
import { formatDate } from "@/lib/store";
import type { AccountStatus, InvitationStatus } from "@/lib/types";

interface CustomerSearch {
  action?: "create";
  edit?: string;
}

export const Route = createFileRoute("/admin/customers/")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): CustomerSearch => ({
    action: search["action"] === "create" ? "create" : undefined,
    edit: typeof search["edit"] === "string" ? search["edit"] : undefined,
  }),
  head: () => ({ meta: [{ title: "Customers — Helpdesk Admin" }] }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <CustomersPage />
    </RequireRole>
  ),
});

const PAGE_SIZE = 10;
const ANY = "all";
const FILTER_DEFAULTS = { status: ANY, invitationStatus: ANY };

const TABLE_COLUMNS = ["Customer ID", "Company", "Primary contact", "Status", "Invitation", "Portal", "Created", "Action"] as const;

function CustomersPage() {
  const navigate = useNavigate();
  const routeSearch = Route.useSearch();
  const [createOpen, setCreateOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    if (routeSearch.action === "create") {
      setCreateOpen(true);
      navigate({ to: "/admin/customers", search: {}, replace: true });
    }
    if (routeSearch.edit) {
      setEditId(routeSearch.edit);
      navigate({ to: "/admin/customers", search: {}, replace: true });
    }
  }, [routeSearch.action, routeSearch.edit, navigate]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => setPage(1), [debouncedSearch, filters.status, filters.invitationStatus, limit]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customers", { page, limit, search: debouncedSearch, filters }],
    queryFn: () =>
      fetchCustomers({
        page,
        limit,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(filters.status !== ANY && { status: filters.status as AccountStatus }),
        ...(filters.invitationStatus !== ANY && { invitationStatus: filters.invitationStatus as InvitationStatus }),
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
  });

  useEffect(() => {
    if (isError) toast.error(getApiErrorMessage(error, "Failed to load customers"));
  }, [isError, error]);

  const items = data?.items ?? [];
  const meta = data?.meta;
  const hasFilters = debouncedSearch || filters.status !== ANY || filters.invitationStatus !== ANY;

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    clear();
    setPage(1);
  };

  return (
    <ListingPage>
      <ListingCardHeader
        title="Customers"
        description={meta ? `Total ${meta.total} customers` : "Loading customers…"}
        value={search}
        onChange={setSearch}
        placeholder="Search by customer ID, company or contact…"
        filterOpen={open}
        onFilterOpenChange={setOpen}
        activeFilterCount={activeCount}
        onFilterApply={apply}
        onFilterClear={clearFilters}
        onExport={() => toast.info("Export coming soon.")}
        primaryAction={
          <Button size="sm" className="rounded-md" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" /> New customer
          </Button>
        }
        filterContent={
          <>
            <ListingFilterField label="Status">
              <ListingFilterSelect
                value={draft.status}
                onChange={(value) => patchDraft({ status: value })}
                options={[["Active", "Active"], ["Inactive", "Inactive"]]}
                allLabel="All statuses"
              />
            </ListingFilterField>
            <ListingFilterField label="Invitation">
              <ListingFilterSelect
                value={draft.invitationStatus}
                onChange={(value) => patchDraft({ invitationStatus: value })}
                options={["Not Sent", "Pending", "Accepted", "Expired", "Resent"].map((value) => [value, value])}
                allLabel="All invitations"
              />
            </ListingFilterField>
          </>
        }
      />

      {isLoading ? (
        <TableSkeleton rows={6} cols={8} />
      ) : items.length === 0 ? (
        <EmptyState icon={Users} title="No customers found" description="Create your first customer organization." />
      ) : (
        <>
          <Table className="min-w-5xl">
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
              {items.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>
                    <IdLinkCell
                      id={customer.customerId}
                      to="/admin/customers/$customerId"
                      params={{ customerId: customer._id }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{customer.companyName}</TableCell>
                  <TableCell>
                    <EntityCell
                      name={customer.primaryContactName ?? "—"}
                      subtitle={customer.primaryContactEmail}
                      hue={155}
                      showAvatar
                    />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={customer.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.invitationStatus ?? "—"}</TableCell>
                  <TableCell>
                    <span className={customer.portalEnabled ? "font-medium text-emerald-600" : "text-muted-foreground"}>
                      {customer.portalEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DateCell value={formatDate(customer.createdAt)} />
                  </TableCell>
                  <TableCell>
                    <DataTableActions>
                      <DataTableRowMenu>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/customers/$customerId" params={{ customerId: customer._id }}>
                            <Eye className="size-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditId(customer._id)}>
                          <Pencil className="size-4" /> Edit
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
              entityLabel="customers"
              onPageChange={setPage}
              onLimitChange={setLimit}
            />
          )}
        </>
      )}

      <CustomerFormSheet open={createOpen} onOpenChange={setCreateOpen} mode="create" />
      {editId ? (
        <CustomerFormSheet
          open
          onOpenChange={(open) => {
            if (!open) setEditId(null);
          }}
          mode="edit"
          customerId={editId}
        />
      ) : null}
    </ListingPage>
  );
}
