import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as useAuth, n as Button, s as getApiErrorMessage, u as isStaff } from "./button-DTh0UNAt.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus, K as Eye, W as FolderKanban, w as Pencil } from "../_libs/lucide-react.mjs";
import { i as PROJECT_STATUSES, m as TableSkeleton, s as ProjectStatusBadge, t as EmptyState } from "./primitives-CPmujTLD.mjs";
import { d as formatDate, r as DropdownMenuItem } from "./store-Daxm1pxW.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as Table, F as DataTableActions, I as DataTableHead, K as ProgressCell, R as DataTablePagination, U as IdLinkCell, V as DateCell, et as TableBody, it as TableRow, q as TeamAvatarStack, rt as TableHeader, tt as TableCell, z as DataTableRowMenu } from "./router-FFtXCDLz.mjs";
import { v as RequireRole } from "./guard-BCYPieem.mjs";
import { a as useListingFilters, i as ListingPage, n as ListingFilterField, r as ListingFilterSelect, t as ListingCardHeader } from "./listing-page-Ujd0D7Ou.mjs";
import { s as fetchProjects } from "./projects-Bfyc4c9H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects.index-B_-nhJFf.js
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
	const { user } = useAuth();
	const canManage = isStaff(user?.role);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCardHeader, {
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
			onExport: () => toast.info("Export coming soon."),
			primaryAction: canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				className: "rounded-md",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/projects/new",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New project"]
				})
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
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
			rows: 6,
			cols: 9
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FolderKanban,
			title: "No projects found",
			description: hasFilters ? "Try adjusting your search or filters." : "Create your first project to start tracking work.",
			action: canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/projects/new",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New project"]
				})
			}) : void 0,
			secondaryAction: hasFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				onClick: clearFilters,
				children: "Clear filters"
			}) : void 0
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "min-w-6xl",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DataTableRowMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/projects/$projectId",
							params: { projectId: project._id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), " View"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/projects/$projectId/edit",
							params: { projectId: project._id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " Edit"]
						})
					})] }) }) })
				] }, project._id);
			}) })]
		}),
		!isLoading && items.length > 0 && meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
			page: currentPage,
			limit: meta.limit,
			total: meta.total,
			totalPages,
			entityLabel: "projects",
			isFetching: isFetching && !isLoading,
			onPageChange: setPage,
			onLimitChange: setLimit
		})
	] }), isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			onClick: () => refetch(),
			children: "Retry"
		})
	})] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsPage, {})
});
//#endregion
export { SplitComponent as component };
