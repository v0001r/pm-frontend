import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, FolderKanban, MoreHorizontal, Pencil, Plus } from "lucide-react";
import { RequireRole } from "@/components/guard";
import {
  DataTableActions,
  DataTableIconButton,
  DataTablePagination,
  DateStack,
  EntityCell,
  LabelPill,
  PrimaryCell,
  ProgressCell,
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
import {
  EmptyState,
  ProjectStatusBadge,
  TableSkeleton,
} from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { fetchProjects } from "@/lib/projects";
import { formatDate } from "@/lib/store";
import { PROJECT_STATUSES, type ProjectStatus } from "@/lib/types";
import { getApiErrorMessage } from "@/lib/api";

interface ProjectSearch {
  page?: number;
  status?: string;
  sort?: string;
  q?: string;
}

export const Route = createFileRoute("/admin/projects/")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): ProjectSearch => ({
    page: typeof search["page"] === "number" ? search["page"] : Number(search["page"]) || undefined,
    status: typeof search["status"] === "string" ? search["status"] : undefined,
    sort: typeof search["sort"] === "string" ? search["sort"] : undefined,
    q: typeof search["q"] === "string" ? search["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Projects — Helpdesk Admin" },
      { name: "description", content: "Browse and manage customer projects with progress, status and deadlines." },
      { property: "og:title", content: "Projects — Helpdesk Admin" },
      { property: "og:description", content: "Browse and manage customer projects." },
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

function ProjectsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";

  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQ, filters.status, filters.sort]);

  const sortConfig = SORT_OPTIONS.find((option) => option.value === filters.sort) ?? SORT_OPTIONS[0]!;

  const queryParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      ...(debouncedQ && { search: debouncedQ }),
      ...(filters.status !== ANY && { status: filters.status as ProjectStatus }),
      sortBy: sortConfig.sortBy,
      sortOrder: sortConfig.sortOrder,
    }),
    [page, debouncedQ, filters.status, sortConfig],
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
    <ListingPage
      header={
        <ListingPageHeader
          title="Projects"
          description=""
          breadcrumbs={[{ label: "Admin", to: "/admin" }, { label: "Projects" }]}
          addAction={
            isAdmin ? (
              <Button size="sm" className="rounded-xl" asChild>
                <Link to="/admin/projects/new">
                  <Plus className="size-4" />
                  New project
                </Link>
              </Button>
            ) : undefined
          }
        />
      }
    >
      <ListingSearchRow
        value={q}
        onChange={setQ}
        placeholder="Search by project ID, name or customer…"
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
                options={SORT_OPTIONS.filter((option) => option.value !== "updated").map((option) => [option.value, option.label])}
              />
            </ListingFilterField>
          </>
        }
      />

        {isLoading ? (
          <TableSkeleton rows={6} cols={7} />
        ) : items.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No projects found"
            description={
              hasFilters
                ? "Try adjusting your search or filters."
                : "Create your first project to start tracking work."
            }
            action={
              isAdmin ? (
                <Button size="sm" asChild>
                  <Link to="/admin/projects/new">
                    <Plus className="size-4" />
                    New project
                  </Link>
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
          <>
            <div className="hidden lg:block">
              <Table className="min-w-5xl">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    {["Project", "Customer", "Status", "Progress", "Hours", "Dates", "Label", "Actions"].map((heading) => (
                      <TableHead key={heading} className={heading === "Actions" ? "text-right" : undefined}>
                        {heading}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((project) => {
                    const progressTone =
                      project.status === "Open"
                        ? "success"
                        : project.status === "On Hold"
                          ? "warning"
                          : project.status === "Completed"
                            ? "violet"
                            : "primary";
                    return (
                      <TableRow key={project._id}>
                        <TableCell>
                          <PrimaryCell
                            id={project.projectId}
                            title={project.name}
                            to="/admin/projects/$projectId"
                            params={{ projectId: project._id }}
                          />
                        </TableCell>
                        <TableCell>
                          <EntityCell
                            name={project.customerName ?? "—"}
                            subtitle={project.customerName ? "Customer" : undefined}
                            hue={42}
                          />
                        </TableCell>
                        <TableCell>
                          <ProjectStatusBadge status={project.status} />
                        </TableCell>
                        <TableCell>
                          <ProgressCell value={project.progressPercentage} tone={progressTone} />
                        </TableCell>
                        <TableCell className="tabular font-medium text-foreground">{project.maxHours}h</TableCell>
                        <TableCell>
                          <DateStack
                            start={formatDate(project.startDate)}
                            end={project.endDate ? formatDate(project.endDate) : undefined}
                          />
                        </TableCell>
                        <TableCell>
                          <LabelPill label={project.label || "—"} />
                        </TableCell>
                        <TableCell>
                          <DataTableActions>
                            <DataTableIconButton label="View" asChild>
                              <Link to="/admin/projects/$projectId" params={{ projectId: project._id }}>
                                <Eye className="size-4" />
                              </Link>
                            </DataTableIconButton>
                            <DataTableIconButton label="Edit" asChild>
                              <Link to="/admin/projects/$projectId/edit" params={{ projectId: project._id }}>
                                <Pencil className="size-4" />
                              </Link>
                            </DataTableIconButton>
                            <DataTableIconButton label="More">
                              <MoreHorizontal className="size-4" />
                            </DataTableIconButton>
                          </DataTableActions>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="divide-y lg:hidden">
              {items.map((project) => (
                <article key={project._id} className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">{project.projectId}</p>
                    </div>
                    <ProjectStatusBadge status={project.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Customer</p>
                      <p>{project.customerName ?? "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Max hours</p>
                      <p className="tabular">{project.maxHours}h</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span className="tabular">{project.progressPercentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${project.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/admin/projects/$projectId" params={{ projectId: project._id }}>
                        <Eye className="size-4" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/admin/projects/$projectId/edit" params={{ projectId: project._id }}>
                        <Pencil className="size-4" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </>
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
