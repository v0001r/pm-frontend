import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, FolderKanban, Pencil, Plus } from "lucide-react";
import { RequireRole } from "@/components/guard";
import {
  DataTableActions,
  DataTableHead,
  DataTablePagination,
  DataTableRowMenu,
  DateCell,
  IdLinkCell,
  ProgressCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TeamAvatarStack,
} from "@/components/data-table";
import {
  ListingFilterField,
  ListingFilterSelect,
  ListingCardHeader,
  ListingPage,
  useListingFilters,
} from "@/components/listing-page";
import { EmptyState, ProjectStatusBadge, TableSkeleton } from "@/components/primitives";
import { ProjectFormSheet } from "@/components/project-form-sheet";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAuth, isStaff } from "@/lib/auth";
import { fetchProjects } from "@/lib/projects";
import { formatDate } from "@/lib/store";
import { PROJECT_STATUSES, type ProjectStatus } from "@/lib/types";
import { getApiErrorMessage } from "@/lib/api";

interface ProjectSearch {
  page?: number;
  status?: string;
  sort?: string;
  q?: string;
  action?: "create";
  edit?: string;
}

export const Route = createFileRoute("/admin/projects/")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): ProjectSearch => ({
    page: typeof search["page"] === "number" ? search["page"] : Number(search["page"]) || undefined,
    status: typeof search["status"] === "string" ? search["status"] : undefined,
    sort: typeof search["sort"] === "string" ? search["sort"] : undefined,
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    action: search["action"] === "create" ? "create" : undefined,
    edit: typeof search["edit"] === "string" ? search["edit"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Projects — Helpdesk Admin" },
      { name: "description", content: "Browse and manage customer projects with progress, status and deadlines." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <ProjectsPage />
    </RequireRole>
  ),
});

const PAGE_SIZE = 10;
const ANY = "all";

const SORT_OPTIONS = [
  { value: "updated", label: "Recently updated", sortBy: "createdAt" as const, sortOrder: "desc" as const },
  { value: "name-asc", label: "Name (A–Z)", sortBy: "name" as const, sortOrder: "asc" as const },
  { value: "name-desc", label: "Name (Z–A)", sortBy: "name" as const, sortOrder: "desc" as const },
  { value: "start", label: "Start date", sortBy: "startDate" as const, sortOrder: "desc" as const },
  { value: "end", label: "End date", sortBy: "endDate" as const, sortOrder: "asc" as const },
];

const FILTER_DEFAULTS = { status: ANY, sort: "updated" };

const TABLE_COLUMNS = [
  "Project ID",
  "Project name",
  "Customer",
  "Status",
  "Team members",
  "Start date",
  "End date",
  "Progress",
  "Action",
] as const;

function ProjectsPage() {
  const navigate = useNavigate();
  const routeSearch = Route.useSearch();
  const { user } = useAuth();
  const canManage = isStaff(user?.role);
  const [createOpen, setCreateOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

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
    if (routeSearch.action === "create") {
      setCreateOpen(true);
      navigate({ to: "/admin/projects", search: {}, replace: true });
    }
    if (routeSearch.edit) {
      setEditId(routeSearch.edit);
      navigate({ to: "/admin/projects", search: {}, replace: true });
    }
  }, [routeSearch.action, routeSearch.edit, navigate]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQ, filters.status, filters.sort, limit]);

  const sortConfig = SORT_OPTIONS.find((option) => option.value === filters.sort) ?? SORT_OPTIONS[0]!;

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(debouncedQ && { search: debouncedQ }),
      ...(filters.status !== ANY && { status: filters.status as ProjectStatus }),
      sortBy: sortConfig.sortBy,
      sortOrder: sortConfig.sortOrder,
    }),
    [page, limit, debouncedQ, filters.status, sortConfig],
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["projects", queryParams],
    queryFn: () => fetchProjects(queryParams),
  });

  useEffect(() => {
    if (isError) {
      toast.error(getApiErrorMessage(error, "Failed to load projects"));
    }
  }, [isError, error]);

  const items = data?.items ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const currentPage = meta?.page ?? page;

  const clearFilters = () => {
    setQ("");
    setDebouncedQ("");
    clear();
    setPage(1);
  };

  const hasFilters = debouncedQ || filters.status !== ANY || filters.sort !== "updated";

  return (
    <>
      <ListingPage>
        <ListingCardHeader
          title="Projects"
          description={meta ? `Total ${meta.total} projects` : "Loading projects…"}
          value={q}
          onChange={setQ}
          placeholder="Search by project ID, name or customer…"
          filterOpen={open}
          onFilterOpenChange={setOpen}
          activeFilterCount={activeCount}
          onFilterApply={apply}
          onFilterClear={clearFilters}
          onExport={() => toast.info("Export coming soon.")}
          primaryAction={
            canManage ? (
              <Button size="sm" className="rounded-md" onClick={() => setCreateOpen(true)}>
                <Plus className="size-4" />
                New project
              </Button>
            ) : undefined
          }
          filterContent={
            <>
              <ListingFilterField label="Status">
                <ListingFilterSelect
                  value={draft.status}
                  onChange={(value) => patchDraft({ status: value })}
                  options={PROJECT_STATUSES.map((value) => [value, value])}
                  allLabel="All statuses"
                />
              </ListingFilterField>
              <ListingFilterField label="Sort by">
                <ListingFilterSelect
                  value={draft.sort}
                  onChange={(value) => patchDraft({ sort: value })}
                  allValue="updated"
                  allLabel="Recently updated"
                  options={SORT_OPTIONS.filter((option) => option.value !== "updated").map((option) => [
                    option.value,
                    option.label,
                  ])}
                />
              </ListingFilterField>
            </>
          }
        />

        {isLoading ? (
          <TableSkeleton rows={6} cols={9} />
        ) : items.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No projects found"
            description={
              hasFilters ? "Try adjusting your search or filters." : "Create your first project to start tracking work."
            }
            action={
              canManage ? (
                <Button size="sm" onClick={() => setCreateOpen(true)}>
                  <Plus className="size-4" />
                  New project
                </Button>
              ) : undefined
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
              {items.map((project) => {
                const progressTone =
                  project.status === "Open"
                    ? "primary"
                    : project.status === "On Hold"
                      ? "warning"
                      : project.status === "Completed"
                        ? "success"
                        : "violet";
                const preview = project.memberPreview ?? [];
                const extra = Math.max(0, (project.memberCount ?? preview.length) - Math.min(2, preview.length));

                return (
                  <TableRow key={project._id}>
                    <TableCell>
                      <IdLinkCell
                        id={project.projectId}
                        to="/admin/projects/$projectId"
                        params={{ projectId: project._id }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.customerName ?? "—"}</TableCell>
                    <TableCell>
                      <ProjectStatusBadge status={project.status} />
                    </TableCell>
                    <TableCell>
                      <TeamAvatarStack
                        members={preview.map((member) => ({ name: member.name }))}
                        extra={extra}
                      />
                    </TableCell>
                    <TableCell>
                      <DateCell value={formatDate(project.startDate)} />
                    </TableCell>
                    <TableCell>
                      <DateCell value={project.endDate ? formatDate(project.endDate) : "—"} />
                    </TableCell>
                    <TableCell>
                      <ProgressCell value={project.progressPercentage} tone={progressTone} />
                    </TableCell>
                    <TableCell>
                      <DataTableActions>
                        <DataTableRowMenu>
                          <DropdownMenuItem asChild>
                            <Link to="/admin/projects/$projectId" params={{ projectId: project._id }}>
                              <Eye className="size-4" /> View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditId(project._id)}>
                            <Pencil className="size-4" /> Edit
                          </DropdownMenuItem>
                        </DataTableRowMenu>
                      </DataTableActions>
                    </TableCell>
                  </TableRow>
                );
              })}
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

      <ProjectFormSheet open={createOpen} onOpenChange={setCreateOpen} mode="create" />
      {editId ? (
        <ProjectFormSheet
          open
          onOpenChange={(open) => {
            if (!open) setEditId(null);
          }}
          mode="edit"
          projectId={editId}
        />
      ) : null}
    </>
  );
}
