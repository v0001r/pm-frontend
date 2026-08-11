import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, FolderKanban } from "lucide-react";
import {
  DataTableActions,
  DataTableHead,
  DataTablePagination,
  DataTableRowMenu,
  DateCell,
  IdLinkCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import {
  ListingCardHeader,
  ListingFilterField,
  ListingFilterSelect,
  ListingPage,
  useListingFilters,
} from "@/components/listing-page";
import { EmptyState, ProjectStatusBadge, TableSkeleton } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getApiErrorMessage } from "@/lib/api";
import { fetchInternalUserProjects } from "@/lib/internal-users";
import { formatDate } from "@/lib/store";
import { PROJECT_STATUSES, type ProjectStatus } from "@/lib/types";

const PAGE_SIZE = 10;
const ANY = "all";
const FILTER_DEFAULTS = { status: ANY };

const TABLE_COLUMNS = ["Project ID", "Project name", "Customer", "Status", "Start date", "End date", "Action"] as const;

interface UserProjectRow {
  _id: string;
  projectId: string;
  name: string;
  customerName: string;
  customerId: string;
  startDate?: string;
  endDate?: string;
  status: ProjectStatus;
}

export function UserProjectsTab({ userId }: { userId: string }) {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQ, filters.status, limit]);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(debouncedQ && { search: debouncedQ }),
      ...(filters.status !== ANY && { status: filters.status }),
    }),
    [page, limit, debouncedQ, filters.status],
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["internal-user-projects", userId, queryParams],
    queryFn: () => fetchInternalUserProjects(userId, queryParams),
  });

  useEffect(() => {
    if (isError) {
      toast.error(getApiErrorMessage(error, "Failed to load projects"));
    }
  }, [isError, error]);

  const items = (data?.items ?? []) as UserProjectRow[];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const currentPage = meta?.page ?? page;
  const hasFilters = debouncedQ || filters.status !== ANY;

  const clearFilters = () => {
    setQ("");
    setDebouncedQ("");
    clear();
    setPage(1);
  };

  return (
    <>
      <ListingPage>
        <ListingCardHeader
          title="Projects"
          description={meta ? `Total ${meta.total} projects` : "Loading projects…"}
          value={q}
          onChange={setQ}
          placeholder="Search by project ID or name…"
          filterOpen={open}
          onFilterOpenChange={setOpen}
          activeFilterCount={activeCount}
          onFilterApply={apply}
          onFilterClear={clearFilters}
          filterContent={
            <ListingFilterField label="Status">
              <ListingFilterSelect
                value={draft.status}
                onChange={(value) => patchDraft({ status: value })}
                options={PROJECT_STATUSES.map((value) => [value, value])}
                allLabel="All statuses"
              />
            </ListingFilterField>
          }
        />

        {isLoading ? (
          <TableSkeleton rows={6} cols={7} />
        ) : items.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No projects found"
            description={
              hasFilters ? "Try adjusting your search or filters." : "Assigned projects will appear here when this user is added to a project team."
            }
            secondaryAction={
              hasFilters ? (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear filters
                </Button>
              ) : undefined
            }
          />
        ) : (
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
              {items.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <IdLinkCell
                      id={project.projectId}
                      to="/admin/projects/$projectId"
                      params={{ projectId: project._id }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.customerName || "—"}</TableCell>
                  <TableCell>
                    <ProjectStatusBadge status={project.status} />
                  </TableCell>
                  <TableCell>
                    <DateCell value={project.startDate ? formatDate(project.startDate) : "—"} />
                  </TableCell>
                  <TableCell>
                    <DateCell value={project.endDate ? formatDate(project.endDate) : "—"} />
                  </TableCell>
                  <TableCell>
                    <DataTableActions>
                      <DataTableRowMenu>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/projects/$projectId" params={{ projectId: project._id }}>
                            <Eye className="size-4" /> View
                          </Link>
                        </DropdownMenuItem>
                      </DataTableRowMenu>
                    </DataTableActions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {!isLoading && items.length > 0 && meta && (
          <DataTablePagination
            page={currentPage}
            limit={meta.limit}
            total={meta.total}
            totalPages={totalPages}
            entityLabel="projects"
            isFetching={isFetching && !isLoading}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        )}
      </ListingPage>

      {isError && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )}
    </>
  );
}
