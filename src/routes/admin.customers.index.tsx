import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, MoreHorizontal, Pencil, Plus, Users } from "lucide-react";
import { RequireRole } from "@/components/guard";
import {
  DataTableActions,
  DataTableIconButton,
  DataTablePagination,
  EntityCell,
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
import { getApiErrorMessage } from "@/lib/api";
import { fetchCustomers } from "@/lib/customers";
import { formatDate } from "@/lib/store";
import type { AccountStatus, InvitationStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/customers/")({
  ssr: false,
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

function CustomersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => setPage(1), [debouncedSearch, filters.status, filters.invitationStatus]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customers", { page, search: debouncedSearch, filters }],
    queryFn: () =>
      fetchCustomers({
        page,
        limit: PAGE_SIZE,
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
    <ListingPage
      header={
        <ListingPageHeader
          title="Customers"
          description="Manage organizations, contacts and portal access."
          breadcrumbs={[{ label: "Admin", to: "/admin" }, { label: "Customers" }]}
          addAction={
            <Button size="sm" className="rounded-xl" asChild>
              <Link to="/admin/customers/new">
                <Plus className="size-4" /> New customer
              </Link>
            </Button>
          }
        />
      }
    >
      <ListingSearchRow
        value={search}
        onChange={setSearch}
        placeholder="Search customers…"
        filterOpen={open}
        onFilterOpenChange={setOpen}
        activeFilterCount={activeCount}
        onFilterApply={apply}
        onFilterClear={clearFilters}
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
          <TableSkeleton rows={6} cols={7} />
        ) : items.length === 0 ? (
          <EmptyState icon={Users} title="No customers found" description="Create your first customer organization." />
        ) : (
          <>
            <Table className="min-w-3xl">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {["Customer", "Primary contact", "Status", "Invitation", "Portal", "Created", "Actions"].map((h) => (
                    <TableHead key={h} className={h === "Actions" ? "text-right" : undefined}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>
                      <PrimaryCell
                        id={customer.customerId}
                        title={customer.companyName}
                        to="/admin/customers/$customerId"
                        params={{ customerId: customer._id }}
                      />
                    </TableCell>
                    <TableCell>
                      <EntityCell
                        name={customer.primaryContactName ?? "—"}
                        subtitle={customer.primaryContactEmail}
                        hue={155}
                      />
                    </TableCell>
                    <TableCell><StatusBadge status={customer.status} /></TableCell>
                    <TableCell className="text-muted-foreground">{customer.invitationStatus ?? "—"}</TableCell>
                    <TableCell>
                      <span className={customer.portalEnabled ? "text-emerald-600 font-medium" : "text-muted-foreground"}>
                        {customer.portalEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(customer.createdAt)}</TableCell>
                    <TableCell>
                      <DataTableActions>
                        <DataTableIconButton label="View" asChild>
                          <Link to="/admin/customers/$customerId" params={{ customerId: customer._id }}>
                            <Eye className="size-4" />
                          </Link>
                        </DataTableIconButton>
                        <DataTableIconButton label="Edit" asChild>
                          <Link to="/admin/customers/$customerId/edit" params={{ customerId: customer._id }}>
                            <Pencil className="size-4" />
                          </Link>
                        </DataTableIconButton>
                        <DataTableIconButton label="More">
                          <MoreHorizontal className="size-4" />
                        </DataTableIconButton>
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
              />
            )}
          </>
        )}
    </ListingPage>
  );
}
