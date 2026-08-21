import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as isStaff, b as useAuth, c as cn, m as isAdmin, n as Button, u as getApiErrorMessage } from "./button-Du-Bk9Wl.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as Eye, S as Pencil, U as FolderKanban, u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { a as PROJECT_STATUSES, c as ProjectStatusBadge, m as TableSkeleton, t as EmptyState } from "./primitives-BE889lfB.mjs";
import { a as DropdownMenuSeparator, m as formatDate, r as DropdownMenuItem } from "./store-Cwl19Diw.mjs";
import { a as DataTableRowMenu, f as ProgressCell, g as TableCell, h as TableBody, i as DataTablePagination, l as IdLinkCell, m as Table, n as DataTableHead, p as TeamAvatarStack, s as DateCell, t as DataTableActions, v as TableHeader, y as TableRow } from "./data-table-CNAlrDoP.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Y as deleteProject, _t as ListingFilterField, et as fetchProjects, gt as ListingCardHeader, h as Route$20, vt as ListingFilterSelect, xt as useListingFilters, yt as ListingPage } from "./router-DC97nFe7.mjs";
import { h as RequireRole } from "./guard-DY-g-DXD.mjs";
import { t as DeleteEntityDialog } from "./delete-entity-dialog-CtPWR2Cp.mjs";
import { t as ProjectFormSheet } from "./project-form-sheet-CaYswj43.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects.index-BvIkgrtG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 10;
var ANY = "all";
var SORT_OPTIONS = [
	{
		value: "updated",
		label: "Recently updated",
		sortBy: "createdAt",
		sortOrder: "desc"
	},
	{
		value: "name-asc",
		label: "Name (A–Z)",
		sortBy: "name",
		sortOrder: "asc"
	},
	{
		value: "name-desc",
		label: "Name (Z–A)",
		sortBy: "name",
		sortOrder: "desc"
	},
	{
		value: "start",
		label: "Start date",
		sortBy: "startDate",
		sortOrder: "desc"
	},
	{
		value: "end",
		label: "End date",
		sortBy: "endDate",
		sortOrder: "asc"
	}
];
var FILTER_DEFAULTS = {
	status: ANY,
	sort: "updated"
};
var TABLE_COLUMNS = [
	"Project ID",
	"Project name",
	"Customer",
	"Status",
	"Team members",
	"Start date",
	"End date",
	"Progress",
	"Action"
];
function ProjectsPage() {
	const navigate = useNavigate();
	const routeSearch = Route$20.useSearch();
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const canManage = isStaff(user?.role);
	const canDelete = isAdmin(user?.role);
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	const [debouncedQ, setDebouncedQ] = (0, import_react.useState)("");
	const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
	const [page, setPage] = (0, import_react.useState)(1);
	const [limit, setLimit] = (0, import_react.useState)(PAGE_SIZE);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedQ(q.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [q]);
	(0, import_react.useEffect)(() => {
		if (routeSearch.action === "create") {
			setCreateOpen(true);
			navigate({
				to: "/admin/projects",
				search: {},
				replace: true
			});
		}
		if (routeSearch.edit) {
			setEditId(routeSearch.edit);
			navigate({
				to: "/admin/projects",
				search: {},
				replace: true
			});
		}
	}, [
		routeSearch.action,
		routeSearch.edit,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		debouncedQ,
		filters.status,
		filters.sort,
		limit
	]);
	const sortConfig = SORT_OPTIONS.find((option) => option.value === filters.sort) ?? SORT_OPTIONS[0];
	const queryParams = (0, import_react.useMemo)(() => ({
		page,
		limit,
		...debouncedQ && { search: debouncedQ },
		...filters.status !== ANY && { status: filters.status },
		sortBy: sortConfig.sortBy,
		sortOrder: sortConfig.sortOrder
	}), [
		page,
		limit,
		debouncedQ,
		filters.status,
		sortConfig
	]);
	const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
		queryKey: ["projects", queryParams],
		queryFn: () => fetchProjects(queryParams)
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load projects"));
	}, [isError, error]);
	const deleteMutation = useMutation({
		mutationFn: (id) => deleteProject(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			setDeleteTarget(null);
			toast.success("Project deleted.");
		},
		onError: (err) => toast.error(getApiErrorMessage(err, "Failed to delete project"))
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCardHeader, {
			title: "Projects",
			description: meta ? `Total ${meta.total} projects` : "Loading projects…",
			value: q,
			onChange: setQ,
			placeholder: "Search by project ID, name or customer…",
			filterOpen: open,
			onFilterOpenChange: setOpen,
			activeFilterCount: activeCount,
			onFilterApply: apply,
			onFilterClear: clearFilters,
			primaryAction: canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				className: "rounded-md",
				onClick: () => setCreateOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New project"]
			}) : void 0,
			filterContent: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
				label: "Status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
					value: draft.status,
					onChange: (value) => patchDraft({ status: value }),
					options: PROJECT_STATUSES.map((value) => [value, value]),
					allLabel: "All statuses"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
				label: "Sort by",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
					value: draft.sort,
					onChange: (value) => patchDraft({ sort: value }),
					allValue: "updated",
					allLabel: "Recently updated",
					options: SORT_OPTIONS.filter((option) => option.value !== "updated").map((option) => [option.value, option.label])
				})
			})] })
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
			rows: 6,
			cols: 9
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FolderKanban,
			title: "No projects found",
			description: hasFilters ? "Try adjusting your search or filters." : "Create your first project to start tracking work.",
			action: canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => setCreateOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New project"]
			}) : void 0,
			secondaryAction: hasFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				onClick: clearFilters,
				children: "Clear filters"
			}) : void 0
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				className: cn("min-w-6xl", isFetching && !isLoading && "opacity-70"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					className: "hover:bg-transparent",
					children: TABLE_COLUMNS.map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, {
						className: heading === "Action" ? "text-right" : void 0,
						sortable: heading !== "Action",
						children: heading
					}, heading))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: items.map((project) => {
					const progressTone = project.status === "Open" ? "primary" : project.status === "On Hold" ? "warning" : project.status === "Completed" ? "success" : "violet";
					const preview = project.memberPreview ?? [];
					const extra = Math.max(0, (project.memberCount ?? preview.length) - Math.min(2, preview.length));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdLinkCell, {
							id: project.projectId,
							to: "/admin/projects/$projectId",
							params: { projectId: project._id }
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: project.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: project.customerName ?? "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectStatusBadge, { status: project.status }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamAvatarStack, {
							members: preview.map((member) => ({ name: member.name })),
							extra
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCell, { value: formatDate(project.startDate) }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCell, { value: project.endDate ? formatDate(project.endDate) : "—" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressCell, {
							value: project.progressPercentage,
							tone: progressTone
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DataTableRowMenu, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin/projects/$projectId",
									params: { projectId: project._id },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), " View"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => setEditId(project._id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " Edit"]
							}),
							canDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								className: "text-destructive focus:text-destructive",
								onClick: () => setDeleteTarget({
									id: project._id,
									name: project.name
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Delete"]
							})] }) : null
						] }) }) })
					] }, project._id);
				}) })]
			})
		}), meta && meta.total > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
			page: currentPage,
			limit: meta.limit,
			total: meta.total,
			totalPages,
			entityLabel: "projects",
			isFetching: isFetching && !isLoading,
			onPageChange: setPage,
			onLimitChange: setLimit
		}) : null] })] }),
		isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => refetch(),
				children: "Retry"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectFormSheet, {
			open: createOpen,
			onOpenChange: setCreateOpen,
			mode: "create"
		}),
		editId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectFormSheet, {
			open: true,
			onOpenChange: (open) => {
				if (!open) setEditId(null);
			},
			mode: "edit",
			projectId: editId
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteEntityDialog, {
			open: Boolean(deleteTarget),
			onOpenChange: (open) => {
				if (!open) setDeleteTarget(null);
			},
			title: "Delete project?",
			description: deleteTarget ? `${deleteTarget.name} will be permanently removed. Projects with tickets cannot be deleted.` : "",
			isPending: deleteMutation.isPending,
			onConfirm: () => {
				if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
			}
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsPage, {})
});
//#endregion
export { SplitComponent as component };
