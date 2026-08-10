import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as useAuth, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus, G as Ellipsis, H as FolderKanban, U as Eye, w as Pencil } from "../_libs/lucide-react.mjs";
import { i as PROJECT_STATUSES, p as TableSkeleton, s as ProjectStatusBadge, t as EmptyState } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate } from "./store-rjYLW1Ml.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as TableRow, B as LabelPill, F as DataTableIconButton, H as ProgressCell, I as DataTablePagination, J as Table, P as DataTableActions, Q as TableHeader, R as DateStack, V as PrimaryCell, X as TableCell, Y as TableBody, Z as TableHead, z as EntityCell } from "./router-DLFu5c1a.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { a as ListingSearchRow, i as ListingPageHeader, n as ListingFilterSelect, o as useListingFilters, r as ListingPage, t as ListingFilterField } from "./listing-page-DNRqAcLr.mjs";
import { s as fetchProjects } from "./projects-JQDAMoYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects.index-BqRqN9AJ.js
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
function ProjectsPage() {
	const { user } = useAuth();
	const isAdmin = user?.role === "Admin";
	const [q, setQ] = (0, import_react.useState)("");
	const [debouncedQ, setDebouncedQ] = (0, import_react.useState)("");
	const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
	const [page, setPage] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedQ(q.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [q]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		debouncedQ,
		filters.status,
		filters.sort
	]);
	const sortConfig = SORT_OPTIONS.find((option) => option.value === filters.sort) ?? SORT_OPTIONS[0];
	const queryParams = (0, import_react.useMemo)(() => ({
		page,
		limit: PAGE_SIZE,
		...debouncedQ && { search: debouncedQ },
		...filters.status !== ANY && { status: filters.status },
		sortBy: sortConfig.sortBy,
		sortOrder: sortConfig.sortOrder
	}), [
		page,
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, {
		header: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPageHeader, {
			title: "Projects",
			description: "",
			breadcrumbs: [{
				label: "Admin",
				to: "/admin"
			}, { label: "Projects" }],
			addAction: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				className: "rounded-xl",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/projects/new",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New project"]
				})
			}) : void 0
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingSearchRow, {
				value: q,
				onChange: setQ,
				placeholder: "Search by project ID, name or customer…",
				filterOpen: open,
				onFilterOpenChange: setOpen,
				activeFilterCount: activeCount,
				onFilterApply: apply,
				onFilterClear: clearFilters,
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
				cols: 7
			}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: FolderKanban,
				title: "No projects found",
				description: hasFilters ? "Try adjusting your search or filters." : "Create your first project to start tracking work.",
				action: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
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
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					className: "min-w-5xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
						className: "hover:bg-transparent",
						children: [
							"Project",
							"Customer",
							"Status",
							"Progress",
							"Hours",
							"Dates",
							"Label",
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
								to: "/admin/projects/$projectId",
								params: { projectId: project._id }
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
								name: project.customerName ?? "—",
								subtitle: project.customerName ? "Customer" : void 0,
								hue: 42
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectStatusBadge, { status: project.status }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressCell, {
								value: project.progressPercentage,
								tone: progressTone
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "tabular font-medium text-foreground",
								children: [project.maxHours, "h"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateStack, {
								start: formatDate(project.startDate),
								end: project.endDate ? formatDate(project.endDate) : void 0
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelPill, { label: project.label || "—" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DataTableActions, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
									label: "View",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/admin/projects/$projectId",
										params: { projectId: project._id },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
									label: "Edit",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/admin/projects/$projectId/edit",
										params: { projectId: project._id },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
									label: "More",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
								})
							] }) })
						] }, project._id);
					}) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y lg:hidden",
				children: items.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "space-y-3 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: project.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: project.projectId
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectStatusBadge, { status: project.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Customer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: project.customerName ?? "—" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Max hours"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular",
								children: [project.maxHours, "h"]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular",
								children: [project.progressPercentage, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary",
								style: { width: `${project.progressPercentage}%` }
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin/projects/$projectId",
									params: { projectId: project._id },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), "View"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin/projects/$projectId/edit",
									params: { projectId: project._id },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Edit"]
								})
							})]
						})
					]
				}, project._id))
			})] }),
			!isLoading && items.length > 0 && meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
				page: currentPage,
				limit: meta.limit,
				total: meta.total,
				totalPages,
				entityLabel: "projects",
				isFetching: isFetching && !isLoading,
				onPageChange: setPage
			})
		]
	}), isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
