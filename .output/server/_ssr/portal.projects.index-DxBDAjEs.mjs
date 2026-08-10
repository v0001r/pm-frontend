import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as FolderKanban, q as Eye } from "../_libs/lucide-react.mjs";
import { m as TableSkeleton, s as ProjectStatusBadge, t as EmptyState } from "./primitives-CPmujTLD.mjs";
import { d as formatDate, r as DropdownMenuItem } from "./store-Daxm1pxW.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as DateCell, J as DataTableHead, X as DataTablePagination, Z as DataTableRowMenu, dt as Table, ft as TableBody, gt as TableRow, ht as TableHeader, it as ProgressCell, pt as TableCell, q as DataTableActions, tt as IdLinkCell } from "./router-CtVrCs4M.mjs";
import { y as RequireRole } from "./guard-BUVsJOD-.mjs";
import { i as ListingPage, t as ListingCardHeader } from "./listing-page-b0dxV9ts.mjs";
import { s as fetchProjects } from "./projects-Bfyc4c9H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.projects.index-DxBDAjEs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 10;
function PortalProjectsPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [debouncedSearch]);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["projects", {
			page,
			search: debouncedSearch,
			portal: true
		}],
		queryFn: () => fetchProjects({
			page,
			limit: PAGE_SIZE,
			...debouncedSearch && { search: debouncedSearch },
			sortBy: "createdAt",
			sortOrder: "desc"
		})
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load projects"));
	}, [isError, error]);
	const items = data?.items ?? [];
	const meta = data?.meta;
	const totalPages = meta?.totalPages ?? 1;
	const currentPage = meta?.page ?? page;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCardHeader, {
		title: "My projects",
		description: meta ? `Total ${meta.total} projects` : "Loading projects…",
		value: search,
		onChange: setSearch,
		placeholder: "Search projects…",
		filterOpen: false,
		onFilterOpenChange: () => void 0,
		onFilterApply: () => void 0,
		onFilterClear: () => setSearch(""),
		showFilters: false,
		primaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "outline",
			className: "rounded-md",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/portal/tickets/new",
				children: "Raise a ticket"
			})
		})
	}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 5,
		cols: 5
	}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: FolderKanban,
		title: "No projects found",
		description: "Your organization does not have any active projects yet."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
		className: "min-w-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
			className: "hover:bg-transparent",
			children: [
				"Project ID",
				"Project name",
				"Status",
				"Progress",
				"End date",
				"Action"
			].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, {
				className: heading === "Action" ? "text-right" : void 0,
				sortable: heading !== "Action",
				children: heading
			}, heading))
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: items.map((project) => {
			const progressTone = project.status === "Open" ? "success" : project.status === "On Hold" ? "warning" : project.status === "Completed" ? "violet" : "primary";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdLinkCell, {
					id: project.projectId,
					to: "/portal/projects/$projectId",
					params: { projectId: project._id }
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: project.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectStatusBadge, { status: project.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressCell, {
					value: project.progressPercentage,
					tone: progressTone
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCell, { value: project.endDate ? formatDate(project.endDate) : "—" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableRowMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/portal/projects/$projectId",
						params: { projectId: project._id },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), " View"]
					})
				}) }) }) })
			] }, project._id);
		}) })]
	}), meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
		page: currentPage,
		limit: meta.limit,
		total: meta.total,
		totalPages,
		entityLabel: "projects",
		onPageChange: setPage
	})] })] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Client"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProjectsPage, {})
});
//#endregion
export { SplitComponent as component };
