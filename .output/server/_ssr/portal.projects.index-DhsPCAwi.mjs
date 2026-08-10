import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as FolderKanban, U as Eye } from "../_libs/lucide-react.mjs";
import { p as TableSkeleton, s as ProjectStatusBadge, t as EmptyState } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate } from "./store-rjYLW1Ml.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as TableRow, F as DataTableIconButton, H as ProgressCell, I as DataTablePagination, J as Table, P as DataTableActions, Q as TableHeader, V as PrimaryCell, X as TableCell, Y as TableBody, Z as TableHead } from "./router-DLFu5c1a.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { a as ListingSearchRow, i as ListingPageHeader, r as ListingPage } from "./listing-page-DNRqAcLr.mjs";
import { s as fetchProjects } from "./projects-JQDAMoYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.projects.index-DhsPCAwi.js
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, {
		header: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPageHeader, {
			title: "My projects",
			description: "Projects linked to your organization account.",
			breadcrumbs: [{
				label: "Portal",
				to: "/portal"
			}, { label: "Projects" }],
			addAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				className: "rounded-xl",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/portal/tickets/new",
					children: "Raise a ticket"
				})
			})
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingSearchRow, {
			value: search,
			onChange: setSearch,
			placeholder: "Search projects…",
			filterOpen: false,
			onFilterOpenChange: () => void 0,
			onFilterApply: () => void 0,
			onFilterClear: () => setSearch(""),
			showFilters: false
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
					"Project",
					"Status",
					"Progress",
					"End date",
					"Actions"
				].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: heading === "Actions" ? "text-right" : void 0,
					children: heading
				}, heading))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: items.map((project) => {
				const progressTone = project.status === "Open" ? "success" : project.status === "On Hold" ? "warning" : project.status === "Completed" ? "violet" : "primary";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
						id: project.projectId,
						title: project.name,
						to: "/portal/projects/$projectId",
						params: { projectId: project._id }
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectStatusBadge, { status: project.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressCell, {
						value: project.progressPercentage,
						tone: progressTone
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-muted-foreground",
						children: project.endDate ? formatDate(project.endDate) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
						label: "View",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/portal/projects/$projectId",
							params: { projectId: project._id },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
						})
					}) }) })
				] }, project._id);
			}) })]
		}), meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
			page: currentPage,
			limit: meta.limit,
			total: meta.total,
			totalPages,
			entityLabel: "projects",
			onPageChange: setPage
		})] })]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Client"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProjectsPage, {})
});
//#endregion
export { SplitComponent as component };
