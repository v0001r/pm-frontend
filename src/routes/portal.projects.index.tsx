import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, FolderKanban } from "lucide-react";
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
} from "@/components/data-table";
import { ListingCardHeader, ListingPage } from "@/components/listing-page";
import {
  EmptyState,
  ProjectStatusBadge,
  TableSkeleton,
} from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getApiErrorMessage } from "@/lib/api";
import { fetchProjects } from "@/lib/projects";
import { formatDate } from "@/lib/store";
import type { ProjectStatus } from "@/lib/types";

export const Route = createFileRoute("/portal/projects/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Projects — Helpdesk" },
      { name: "description", content: "View projects associated with your organization." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Client"]}>
      <PortalProjectsPage />
    </RequireRole>
  ),
});

const PAGE_SIZE = 10;

function PortalProjectsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects", { page, search: debouncedSearch, portal: true }],
    queryFn: () =>
      fetchProjects({
        page,
        limit: PAGE_SIZE,
        ...(debouncedSearch && { search: debouncedSearch }),
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
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

  return (
    <ListingPage>
      <ListingCardHeader
        title="My projects"
        description={meta ? `Total ${meta.total} projects` : "Loading projects…"}
        value={search}
        onChange={setSearch}
        placeholder="Search projects…"
        filterOpen={false}
        onFilterOpenChange={() => undefined}
        onFilterApply={() => undefined}
        onFilterClear={() => setSearch("")}
        showFilters={false}
        primaryAction={
          <Button size="sm" variant="outline" className="rounded-md" asChild>
            <Link to="/portal/tickets/new">Raise a ticket</Link>
          </Button>
        }
      />

        {isLoading ? (
          <TableSkeleton rows={5} cols={5} />
        ) : items.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No projects found"
            description="Your organization does not have any active projects yet."
          />
        ) : (
          <>
            <Table className="min-w-3xl">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {["Project ID", "Project name", "Status", "Progress", "End date", "Action"].map((heading) => (
                    <DataTableHead key={heading} className={heading === "Action" ? "text-right" : undefined} sortable={heading !== "Action"}>
                      {heading}
                    </DataTableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((project) => {
                  const progressTone =
                    project.status === "Open" ? "success" : project.status === "On Hold" ? "warning" : project.status === "Completed" ? "violet" : "primary";
                  return (
                    <TableRow key={project._id}>
                      <TableCell>
                        <IdLinkCell
                          id={project.projectId}
                          to="/portal/projects/$projectId"
                          params={{ projectId: project._id }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>
                        <ProjectStatusBadge status={project.status as ProjectStatus} />
                      </TableCell>
                      <TableCell>
                        <ProgressCell value={project.progressPercentage} tone={progressTone} />
                      </TableCell>
                      <TableCell>
                        <DateCell value={project.endDate ? formatDate(project.endDate) : "—"} />
                      </TableCell>
                      <TableCell>
                        <DataTableActions>
                          <DataTableRowMenu>
                            <DropdownMenuItem asChild>
                              <Link to="/portal/projects/$projectId" params={{ projectId: project._id }}>
                                <Eye className="size-4" /> View
                              </Link>
                            </DropdownMenuItem>
                          </DataTableRowMenu>
                        </DataTableActions>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {meta && (
              <DataTablePagination
                page={currentPage}
                limit={meta.limit}
                total={meta.total}
                totalPages={totalPages}
                entityLabel="projects"
                onPageChange={setPage}
              />
            )}
          </>
        )}
    </ListingPage>
  );
}
