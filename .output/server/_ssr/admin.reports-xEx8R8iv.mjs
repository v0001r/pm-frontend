import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as api, n as Button, u as getApiErrorMessage } from "./button-Du-Bk9Wl.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as LoaderCircle, Y as Download, t as X } from "../_libs/lucide-react.mjs";
import { _ as fullName, d as SectionCard, g as categoryChartColor, i as PRIORITIES, m as TableSkeleton, n as Input, o as PageHeader, p as StatusBadge, r as KpiCard, s as PriorityBadge, t as EmptyState, u as STATUSES, y as priorityChartColor } from "./primitives-BE889lfB.mjs";
import { c as PopoverContent, l as PopoverTrigger, s as Popover } from "./store-Cwl19Diw.mjs";
import { C as SelectTrigger, S as SelectItem, _ as TableHead, b as Select, d as PrimaryCell, g as TableCell, h as TableBody, m as Table, n as DataTableHead, v as TableHeader, w as SelectValue, x as SelectContent, y as TableRow } from "./data-table-CNAlrDoP.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
import { K as fetchEmployees, _t as ListingFilterField, at as formatDashboardInputDate, dt as fetchCustomers, et as fetchProjects, vt as ListingFilterSelect } from "./router-DC97nFe7.mjs";
import { h as RequireRole } from "./guard-DY-g-DXD.mjs";
import { t as Badge } from "./badge-obH5Kl5R.mjs";
import { t as fetchCategories } from "./categories-0r8IUY6G.mjs";
import { a as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BOmgTBGK.mjs";
import { r as fetchTeams } from "./org-CS5p3MIU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reports-xEx8R8iv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REPORT_TABS = [
	{
		id: "overview",
		label: "Overview"
	},
	{
		id: "ticket-analytics",
		label: "Ticket Analytics"
	},
	{
		id: "agents",
		label: "Agent Performance"
	},
	{
		id: "workload",
		label: "Workload"
	},
	{
		id: "customers",
		label: "Customer Analytics"
	},
	{
		id: "projects",
		label: "Project Analytics"
	},
	{
		id: "categories",
		label: "Category & Priority"
	},
	{
		id: "escalations",
		label: "Escalations"
	},
	{
		id: "custom",
		label: "Custom Reports"
	}
];
function dateRangeFromShortcut(shortcut) {
	const dateTo = /* @__PURE__ */ new Date();
	const dateFrom = /* @__PURE__ */ new Date();
	switch (shortcut) {
		case "today": break;
		case "7d":
			dateFrom.setDate(dateFrom.getDate() - 6);
			break;
		case "30d":
			dateFrom.setDate(dateFrom.getDate() - 29);
			break;
		case "90d":
			dateFrom.setDate(dateFrom.getDate() - 89);
			break;
		case "year":
			dateFrom.setMonth(0, 1);
			break;
		default: dateFrom.setDate(dateFrom.getDate() - 29);
	}
	return {
		dateFrom: formatDashboardInputDate(dateFrom),
		dateTo: formatDashboardInputDate(dateTo)
	};
}
function buildReportsParams(filters) {
	const params = {
		dateFrom: filters.dateFrom,
		dateTo: filters.dateTo
	};
	if (filters.customerId !== "all") params.customerId = filters.customerId;
	if (filters.projectId !== "all") params.projectId = filters.projectId;
	if (filters.assignedTo !== "all") params.assignedTo = filters.assignedTo;
	if (filters.assignmentGroupId !== "all") params.assignmentGroupId = filters.assignmentGroupId;
	if (filters.status !== "all") params.status = filters.status;
	if (filters.priority !== "all") params.priority = filters.priority;
	if (filters.categoryId !== "all") params.categoryId = filters.categoryId;
	if (filters.tag !== "all") params.tag = filters.tag;
	if (filters.granularity) params.granularity = filters.granularity;
	return params;
}
function defaultReportsFilters() {
	const range = dateRangeFromShortcut("30d");
	return {
		customerId: "all",
		projectId: "all",
		assignedTo: "all",
		assignmentGroupId: "all",
		status: "all",
		priority: "all",
		categoryId: "all",
		tag: "all",
		dateFrom: range.dateFrom,
		dateTo: range.dateTo,
		dateShortcut: "30d",
		granularity: "daily"
	};
}
async function fetchReportsOverview(params) {
	const { data } = await api.get("/reports/overview", { params });
	return data.data;
}
async function fetchTicketAnalytics(params) {
	const { data } = await api.get("/reports/ticket-analytics", { params });
	return data.data;
}
async function fetchAgentPerformance(params) {
	const { data } = await api.get("/reports/agents", { params });
	return data.data;
}
async function fetchWorkloadReport(params) {
	const { data } = await api.get("/reports/workload", { params });
	return data.data;
}
async function fetchCustomerAnalytics(params) {
	const { data } = await api.get("/reports/customers", { params });
	return data.data;
}
async function fetchProjectAnalytics(params) {
	const { data } = await api.get("/reports/projects", { params });
	return data.data;
}
async function fetchCategoryPriorityAnalytics(params) {
	const { data } = await api.get("/reports/categories-priorities", { params });
	return data.data;
}
async function fetchReopenedReport(params) {
	const { data } = await api.get("/reports/reopened", { params });
	return data.data;
}
async function fetchEscalationsReport(params) {
	const { data } = await api.get("/reports/escalations", { params });
	return data.data;
}
async function exportReportCsv(section, params) {
	const blob = (await api.get("/reports/export", {
		params: {
			...params,
			section,
			format: "csv"
		},
		responseType: "blob"
	})).data;
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `report-${section}.csv`;
	link.click();
	URL.revokeObjectURL(url);
}
var TAG_OPTIONS = [["escalated", "Escalated"], ["vip", "VIP"]];
function ReportFilterBar({ filters, draft, onDraftChange, onApply, onClear, onRemoveFilter, customers, projects, employees, categories, teams }) {
	const activeChips = buildActiveChips(filters, customers, projects, employees, categories, teams, onRemoveFilter);
	const applyShortcut = (shortcut) => {
		if (shortcut === "custom") {
			onDraftChange({ dateShortcut: "custom" });
			return;
		}
		onDraftChange({
			...dateRangeFromShortcut(shortcut),
			dateShortcut: shortcut
		});
		onApply();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel space-y-3 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: filters.dateShortcut,
					onValueChange: (v) => applyShortcut(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-8 w-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Date range" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "today",
							children: "Today"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "7d",
							children: "Last 7 days"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "30d",
							children: "Last 30 days"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "90d",
							children: "Last 90 days"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "year",
							children: "This year"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "custom",
							children: "Custom"
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "h-8",
						children: ["Filters", activeChips.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 rounded-full bg-primary/10 px-1.5 text-xs font-semibold text-primary",
							children: activeChips.length
						}) : null]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
					className: "w-80 p-0",
					align: "start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
								label: "Project",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
									value: draft.projectId,
									onChange: (v) => onDraftChange({ projectId: v }),
									options: projects.map((p) => [p._id, p.name]),
									allLabel: "All projects"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
								label: "Customer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
									value: draft.customerId,
									onChange: (v) => onDraftChange({
										customerId: v,
										projectId: "all"
									}),
									options: customers.map((c) => [c._id, c.companyName]),
									allLabel: "All customers"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
								label: "Agent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
									value: draft.assignedTo,
									onChange: (v) => onDraftChange({ assignedTo: v }),
									options: employees.map((e) => [e._id ?? e.id, fullName(e)]),
									allLabel: "All agents"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
								label: "Team",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
									value: draft.assignmentGroupId,
									onChange: (v) => onDraftChange({ assignmentGroupId: v }),
									options: teams.map((t) => [t._id, t.name]),
									allLabel: "All teams"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
								label: "Status",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
									value: draft.status,
									onChange: (v) => onDraftChange({ status: v }),
									options: STATUSES.map((s) => [s, s]),
									allLabel: "All statuses"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
								label: "Priority",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
									value: draft.priority,
									onChange: (v) => onDraftChange({ priority: v }),
									options: PRIORITIES.map((p) => [p, p]),
									allLabel: "All priorities"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
								label: "Category",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
									value: draft.categoryId,
									onChange: (v) => onDraftChange({ categoryId: v }),
									options: categories.map((c) => [c._id, c.name]),
									allLabel: "All categories"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
								label: "Tag",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
									value: draft.tag,
									onChange: (v) => onDraftChange({ tag: v }),
									options: TAG_OPTIONS.map(([k, v]) => [k, v]),
									allLabel: "All tags"
								})
							}),
							draft.dateShortcut === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
								label: "From",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									className: "h-9",
									value: draft.dateFrom,
									onChange: (e) => onDraftChange({ dateFrom: e.target.value })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
								label: "To",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									className: "h-9",
									value: draft.dateTo,
									onChange: (e) => onDraftChange({ dateTo: e.target.value })
								})
							})] }) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 border-t border-border/60 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: onClear,
							children: "Clear"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: onApply,
							children: "Apply"
						})]
					})]
				})] })]
			})
		}), activeChips.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [activeChips.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-foreground",
				children: [
					chip.label,
					": ",
					chip.value,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-full p-0.5 text-muted-foreground hover:text-foreground",
						onClick: () => chip.onRemove(),
						"aria-label": `Remove ${chip.label} filter`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
					})
				]
			}, chip.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				className: "h-7 text-xs",
				onClick: onClear,
				children: "Clear all"
			})]
		}) : null]
	});
}
function buildActiveChips(filters, customers, projects, employees, categories, teams, onRemove) {
	const chips = [];
	if (filters.customerId !== "all") {
		const name = customers.find((c) => c._id === filters.customerId)?.companyName ?? filters.customerId;
		chips.push({
			key: "customer",
			label: "Customer",
			value: name,
			onRemove: () => onRemove({ customerId: "all" })
		});
	}
	if (filters.projectId !== "all") {
		const name = projects.find((p) => p._id === filters.projectId)?.name ?? filters.projectId;
		chips.push({
			key: "project",
			label: "Project",
			value: name,
			onRemove: () => onRemove({ projectId: "all" })
		});
	}
	if (filters.assignedTo !== "all") {
		const emp = employees.find((e) => (e._id ?? e.id) === filters.assignedTo);
		chips.push({
			key: "agent",
			label: "Agent",
			value: emp ? fullName(emp) : filters.assignedTo,
			onRemove: () => onRemove({ assignedTo: "all" })
		});
	}
	if (filters.assignmentGroupId !== "all") {
		const team = teams.find((t) => t._id === filters.assignmentGroupId);
		chips.push({
			key: "team",
			label: "Team",
			value: team?.name ?? filters.assignmentGroupId,
			onRemove: () => onRemove({ assignmentGroupId: "all" })
		});
	}
	if (filters.status !== "all") chips.push({
		key: "status",
		label: "Status",
		value: filters.status,
		onRemove: () => onRemove({ status: "all" })
	});
	if (filters.priority !== "all") chips.push({
		key: "priority",
		label: "Priority",
		value: filters.priority,
		onRemove: () => onRemove({ priority: "all" })
	});
	if (filters.categoryId !== "all") {
		const cat = categories.find((c) => c._id === filters.categoryId);
		chips.push({
			key: "category",
			label: "Category",
			value: cat?.name ?? filters.categoryId,
			onRemove: () => onRemove({ categoryId: "all" })
		});
	}
	if (filters.tag !== "all") chips.push({
		key: "tag",
		label: "Tag",
		value: filters.tag,
		onRemove: () => onRemove({ tag: "all" })
	});
	return chips;
}
function drilldownByStatus(status) {
	return { status };
}
function drilldownByPriority(priority) {
	return { priority };
}
function drilldownByCategory(categoryId) {
	return { category: categoryId };
}
function drilldownByAgent(agentId) {
	return { agent: agentId };
}
function drilldownByProject(projectId) {
	return { projectId };
}
function drilldownBySla(sla) {
	return { sla };
}
function drilldownByTag(tag) {
	return { tag };
}
function drilldownByCustomer(customerId) {
	return { customerId };
}
function drilldownAgingBucket(minHours, maxHours) {
	const now = /* @__PURE__ */ new Date();
	const search = {
		status: "New",
		createdTo: formatDateInput(/* @__PURE__ */ new Date(now.getTime() - minHours * 36e5))
	};
	if (maxHours != null) search.createdFrom = formatDateInput(/* @__PURE__ */ new Date(now.getTime() - maxHours * 36e5));
	return search;
}
function formatDateInput(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function workloadTone(workload) {
	switch (workload) {
		case "Healthy": return "success";
		case "Busy": return "warning";
		case "Overloaded": return "danger";
		default: return "default";
	}
}
function DrillLink({ search, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/admin/tickets",
		search,
		className: className ?? "hover:text-primary",
		children
	});
}
function formatKpi(metric, loading) {
	if (loading) return "…";
	if (metric?.formatted) return metric.formatted;
	return metric?.value ?? 0;
}
function ReportEmpty({ message }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No data available",
		description: message ?? "No data available for the selected filters."
	});
}
function ReportError() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Unable to load report data",
		description: "Please try again or adjust your filters."
	});
}
function ReportsWorkspace() {
	const [filters, setFilters] = (0, import_react.useState)(defaultReportsFilters());
	const [draft, setDraft] = (0, import_react.useState)(filters);
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const queryParams = (0, import_react.useMemo)(() => buildReportsParams(filters), [filters]);
	const customersQuery = useQuery({
		queryKey: ["report-customers"],
		queryFn: () => fetchCustomers({
			page: 1,
			limit: 200,
			sortBy: "companyName",
			sortOrder: "asc"
		})
	});
	const projectsQuery = useQuery({
		queryKey: ["report-projects", draft.customerId],
		queryFn: () => fetchProjects({
			page: 1,
			limit: 200,
			sortBy: "name",
			sortOrder: "asc",
			...draft.customerId !== "all" ? { customerId: draft.customerId } : {}
		})
	});
	const employeesQuery = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees
	});
	const categoriesQuery = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories
	});
	const teamsQuery = useQuery({
		queryKey: ["teams"],
		queryFn: () => fetchTeams()
	});
	const overviewQuery = useQuery({
		queryKey: ["reports-overview", queryParams],
		queryFn: () => fetchReportsOverview(queryParams),
		enabled: tab === "overview"
	});
	const ticketAnalyticsQuery = useQuery({
		queryKey: ["reports-ticket-analytics", queryParams],
		queryFn: () => fetchTicketAnalytics(queryParams),
		enabled: tab === "ticket-analytics"
	});
	const agentsQuery = useQuery({
		queryKey: ["reports-agents", queryParams],
		queryFn: () => fetchAgentPerformance(queryParams),
		enabled: tab === "agents"
	});
	const workloadQuery = useQuery({
		queryKey: ["reports-workload", queryParams],
		queryFn: () => fetchWorkloadReport(queryParams),
		enabled: tab === "workload"
	});
	const customersReportQuery = useQuery({
		queryKey: ["reports-customers", queryParams],
		queryFn: () => fetchCustomerAnalytics(queryParams),
		enabled: tab === "customers"
	});
	const projectsReportQuery = useQuery({
		queryKey: ["reports-projects", queryParams],
		queryFn: () => fetchProjectAnalytics(queryParams),
		enabled: tab === "projects"
	});
	const categoriesQuery2 = useQuery({
		queryKey: ["reports-categories", queryParams],
		queryFn: () => fetchCategoryPriorityAnalytics(queryParams),
		enabled: tab === "categories"
	});
	const reopenedQuery = useQuery({
		queryKey: ["reports-reopened", queryParams],
		queryFn: () => fetchReopenedReport(queryParams),
		enabled: tab === "escalations"
	});
	const escalationsQuery = useQuery({
		queryKey: ["reports-escalations", queryParams],
		queryFn: () => fetchEscalationsReport(queryParams),
		enabled: tab === "escalations"
	});
	const applyFilters = () => {
		if (draft.dateFrom && draft.dateTo && draft.dateFrom > draft.dateTo) {
			toast.error("Start date must be on or before end date.");
			return;
		}
		setFilters(draft);
	};
	const clearFilters = () => {
		const next = defaultReportsFilters();
		setDraft(next);
		setFilters(next);
	};
	const removeFilter = (patch) => {
		const next = {
			...filters,
			...patch
		};
		setDraft(next);
		setFilters(next);
	};
	const patchDraft = (patch) => {
		setDraft((c) => {
			const next = {
				...c,
				...patch
			};
			if (patch.customerId !== void 0 && patch.customerId !== c.customerId) next.projectId = "all";
			return next;
		});
	};
	const setGranularity = (granularity) => {
		const next = {
			...filters,
			granularity
		};
		setFilters(next);
		setDraft(next);
	};
	const handleExport = async () => {
		const section = {
			overview: "overview",
			"ticket-analytics": "ticket-analytics",
			agents: "agents",
			workload: "workload",
			customers: "customers",
			projects: "projects",
			categories: "categories",
			escalations: "escalations",
			custom: null
		}[tab];
		if (!section) {
			toast.message("Select a report tab with export support, or use Custom Reports.");
			return;
		}
		try {
			setExporting(true);
			await exportReportCsv(section, queryParams);
			toast.success("Report exported to CSV.");
		} catch (error) {
			toast.error(getApiErrorMessage(error, "Export failed"));
		} finally {
			setExporting(false);
		}
	};
	const customers = customersQuery.data?.items ?? [];
	const projects = projectsQuery.data?.items ?? [];
	const employees = employeesQuery.data ?? [];
	const categories = categoriesQuery.data ?? [];
	const teams = teamsQuery.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Reports & Analytics",
			description: "Monitor ticket volume, SLA performance, workload and support quality.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: handleExport,
				disabled: exporting,
				children: [exporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Export"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportFilterBar, {
			filters,
			draft,
			onDraftChange: patchDraft,
			onApply: applyFilters,
			onClear: clearFilters,
			onRemoveFilter: removeFilter,
			customers,
			projects,
			employees,
			categories,
			teams
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: tab,
			onValueChange: (v) => setTab(v),
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
						className: "h-auto flex-wrap justify-start gap-1 bg-transparent p-0",
						children: REPORT_TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: t.id,
							className: "rounded-md border border-transparent px-3 py-1.5 text-xs data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-sm",
							children: t.label
						}, t.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "overview",
					className: "mt-0 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewTab, {
						query: overviewQuery,
						onGranularityChange: setGranularity,
						granularity: filters.granularity
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "ticket-analytics",
					className: "mt-0 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketAnalyticsTab, {
						query: ticketAnalyticsQuery,
						onGranularityChange: setGranularity,
						granularity: filters.granularity
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "agents",
					className: "mt-0 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentsTab, { query: agentsQuery })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "workload",
					className: "mt-0 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkloadTab, { query: workloadQuery })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "customers",
					className: "mt-0 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomersTab, { query: customersReportQuery })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "projects",
					className: "mt-0 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsTab, { query: projectsReportQuery })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "categories",
					className: "mt-0 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesTab, { query: categoriesQuery2 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "escalations",
					className: "mt-0 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EscalationsTab, {
						escalationsQuery,
						reopenedQuery
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "custom",
					className: "mt-0 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						title: "Custom Reports",
						description: "Export filtered report data as CSV.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3",
							children: [
								["overview", "Overview KPIs"],
								["agents", "Agent performance"],
								["customers", "Customer analytics"]
							].map(([section, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "justify-start",
								onClick: async () => {
									try {
										await exportReportCsv(section, queryParams);
										toast.success(`${label} exported.`);
									} catch (e) {
										toast.error(getApiErrorMessage(e, "Export failed"));
									}
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), label]
							}, section))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-5 pb-5 text-body-sm text-subtle",
							children: "Channel analytics are not available — the application does not store ticket source/channel data."
						})]
					})
				})
			]
		})
	] });
}
function OverviewTab({ query, granularity, onGranularityChange }) {
	const data = query.data;
	const loading = query.isLoading;
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportError, {});
	if (!loading && !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportEmpty, {});
	const kpis = data?.kpis;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Total tickets",
					value: formatKpi(kpis?.totalTickets, loading),
					trend: kpis?.totalTickets.trend,
					to: "/admin/tickets"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Open tickets",
					value: formatKpi(kpis?.openTickets, loading),
					to: "/admin/tickets",
					search: drilldownByStatus("New")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Backlog",
					value: formatKpi(kpis?.backlog, loading),
					tone: "warning",
					to: "/admin/tickets"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Resolved",
					value: formatKpi(kpis?.resolvedTickets, loading),
					trend: kpis?.resolvedTickets.trend,
					tone: "success",
					to: "/admin/tickets",
					search: drilldownByStatus("Resolved")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Resolution rate",
					value: formatKpi(kpis?.resolutionRate, loading)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "SLA compliance",
					value: formatKpi(kpis?.slaCompliance, loading),
					trend: kpis?.slaCompliance.trend,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "SLA breaches",
					value: formatKpi(kpis?.slaBreaches, loading),
					trend: kpis?.slaBreaches.trend,
					tone: "danger",
					to: "/admin/tickets",
					search: drilldownBySla("Breached")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Avg first response",
					value: formatKpi(kpis?.avgFirstResponse, loading)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Avg resolution",
					value: formatKpi(kpis?.avgResolutionTime, loading)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Reopened",
					value: formatKpi(kpis?.reopenedTickets, loading),
					trend: kpis?.reopenedTickets.trend,
					tone: "warning",
					to: "/admin/tickets",
					search: drilldownByStatus("Reopened")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Escalations",
					value: formatKpi(kpis?.escalations, loading),
					trend: kpis?.escalations.trend,
					tone: "danger",
					to: "/admin/tickets",
					search: drilldownByTag("escalated")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Ticket volume",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: granularity,
				onValueChange: (v) => onGranularityChange(v),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "h-8 w-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "daily",
						children: "Daily"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "weekly",
						children: "Weekly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "monthly",
						children: "Monthly"
					})
				] })]
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-64 p-4",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center text-sm text-muted-foreground",
					children: "Loading…"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: data?.volumeTrend ?? [],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--color-border)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								tickLine: false,
								axisLine: false,
								fontSize: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tickLine: false,
								axisLine: false,
								fontSize: 11,
								allowDecimals: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								fontSize: 12,
								borderRadius: 8
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "created",
								stroke: "var(--color-primary)",
								fill: "var(--color-primary)",
								fillOpacity: .1,
								name: "Created"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "resolved",
								stroke: "var(--color-success)",
								fill: "var(--color-success)",
								fillOpacity: .1,
								name: "Resolved"
							})
						]
					})
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Created vs resolved",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tickets created" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold tabular",
								children: data?.createdVsResolved.created ?? 0
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tickets resolved" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold tabular",
								children: data?.createdVsResolved.resolved ?? 0
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border/60 pt-2 flex justify-between text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Net backlog change" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: data?.createdVsResolved.netChange > 0 ? "text-destructive" : "text-success",
								children: [
									data?.createdVsResolved.netChange > 0 ? "+" : "",
									data?.createdVsResolved.netChange ?? 0,
									" tickets"
								]
							})]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Backlog analysis",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 p-5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Current backlog"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold tabular",
							children: data?.backlog.current ?? 0
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Open"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold tabular",
							children: data?.backlog.open ?? 0
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Overdue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold tabular",
							children: data?.backlog.overdue ?? 0
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Unassigned"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold tabular",
							children: data?.backlog.unassigned ?? 0
						})] })
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Ticket aging",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
				className: "hover:bg-transparent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Age bucket" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Tickets"
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (data?.backlog.aging ?? []).map((bucket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: bucket.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-right tabular font-semibold",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillLink, {
					search: drilldownAgingBucket(bucket.minHours, bucket.maxHours),
					children: bucket.count
				})
			})] }, bucket.key)) })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Status funnel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center justify-center gap-2 p-5",
				children: (data?.statusFunnel ?? []).map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border px-3 py-2 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: step.status
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillLink, {
							search: drilldownByStatus(step.status),
							className: "text-lg font-bold tabular",
							children: step.count
						})]
					}), i < (data?.statusFunnel.length ?? 0) - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "↓"
					}) : null]
				}, step.status))
			})
		}),
		data?.peakHours ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Support peak hours",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-48 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: data.peakHours,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--color-border)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "hour",
								tickFormatter: (h) => `${h}:00`,
								fontSize: 10
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								allowDecimals: false,
								fontSize: 10
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "count",
								fill: "var(--color-primary)",
								radius: [
									4,
									4,
									0,
									0
								]
							})
						]
					})
				})
			})
		}) : null
	] });
}
function TicketAnalyticsTab({ query, granularity, onGranularityChange }) {
	const data = query.data;
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportError, {});
	if (!query.isLoading && !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportEmpty, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-3 md:grid-cols-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
				label: "Created",
				value: query.isLoading ? "…" : data?.summary.created ?? 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
				label: "Resolved",
				value: query.isLoading ? "…" : data?.summary.resolved ?? 0,
				tone: "success"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
				label: "Closed",
				value: query.isLoading ? "…" : data?.summary.closed ?? 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
				label: "Reopened",
				value: query.isLoading ? "…" : data?.summary.reopened ?? 0,
				tone: "warning"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
				label: "Net change",
				value: query.isLoading ? "…" : data?.summary.netChange ?? 0
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		title: "Volume trend",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			value: granularity,
			onValueChange: (v) => onGranularityChange(v),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
				className: "h-8 w-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: "daily",
					children: "Daily"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: "weekly",
					children: "Weekly"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: "monthly",
					children: "Monthly"
				})
			] })]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-72 p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
					data: data?.trend ?? [],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--color-border)",
							vertical: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "label",
							fontSize: 11
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							allowDecimals: false,
							fontSize: 11
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "created",
							stroke: "var(--color-primary)",
							fill: "var(--color-primary)",
							fillOpacity: .1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "resolved",
							stroke: "var(--color-success)",
							fill: "var(--color-success)",
							fillOpacity: .1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "closed",
							stroke: "var(--color-muted-foreground)",
							fill: "var(--color-muted-foreground)",
							fillOpacity: .08
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "reopened",
							stroke: "var(--color-warning)",
							fill: "var(--color-warning)",
							fillOpacity: .08
						})
					]
				})
			})
		})
	})] });
}
function AgentsTab({ query }) {
	const data = query.data;
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportError, {});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 8,
		cols: 10
	});
	if (!data?.agents.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportEmpty, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		title: "Agent performance",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "min-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: [
					"Agent",
					"Assigned",
					"Open",
					"In progress",
					"Resolved",
					"Closed",
					"SLA %",
					"Avg response",
					"Avg resolution",
					"Reopened",
					"Escalations",
					"Workload"
				].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, {
					sortable: false,
					children: h
				}, h))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: data.agents.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillLink, {
					search: drilldownByAgent(row.agentId),
					className: "font-medium",
					children: row.name
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.assigned
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.open
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.inProgress
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.resolved
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.closed
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "tabular",
					children: [row.slaPercent, "%"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.avgFirstResponseFormatted ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.avgResolutionFormatted ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.reopened
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.escalations
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: workloadTone(row.workload) === "success" ? "success" : workloadTone(row.workload) === "warning" ? "warning" : "destructive",
					children: row.workload
				}) })
			] }, row.agentId)) })]
		})
	});
}
function WorkloadTab({ query }) {
	const data = query.data;
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportError, {});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 6,
		cols: 4
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportEmpty, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
		label: "Unassigned tickets",
		value: data.unassigned,
		to: "/admin/tickets",
		search: { agent: "unassigned" }
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		title: "Agent workload",
		description: `Healthy ≤${data.thresholds.healthyMax} · Busy ≤${data.thresholds.busyMax} open tickets`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
			className: "hover:bg-transparent",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, { children: "Agent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, { children: "Open tickets" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, { children: "SLA breaches" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, { children: "Workload" })
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: data.agents.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillLink, {
				search: drilldownByAgent(row.agentId),
				children: row.name
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "tabular",
				children: row.open
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "tabular",
				children: row.slaBreaches
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: workloadTone(row.workload) === "success" ? "success" : workloadTone(row.workload) === "warning" ? "warning" : "destructive",
				children: row.workload
			}) })
		] }, row.agentId)) })] })
	})] });
}
function CustomersTab({ query }) {
	const data = query.data;
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportError, {});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 8,
		cols: 9
	});
	if (!data?.customers.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportEmpty, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		title: "Customer analytics",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "min-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: [
					"Customer",
					"Total",
					"Open",
					"Resolved",
					"SLA breaches",
					"Avg response",
					"Avg resolution",
					"Reopened",
					"Escalations",
					"Health"
				].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, { children: h }, h))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: data.customers.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillLink, {
					search: drilldownByCustomer(row.customerId),
					className: "font-medium",
					children: row.name
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.total
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.open
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.resolved
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.slaBreaches
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.avgFirstResponseFormatted ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.avgResolutionFormatted ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.reopened
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.escalations
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.health ?? "—" })
			] }, row.customerId)) })]
		})
	});
}
function ProjectsTab({ query }) {
	const data = query.data;
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportError, {});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 8,
		cols: 8
	});
	if (!data?.projects.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportEmpty, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		title: "Project analytics",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "min-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: [
					"Project",
					"Customer",
					"Total",
					"Open",
					"Resolved",
					"SLA %",
					"Avg response",
					"Avg resolution",
					"Reopened"
				].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, { children: h }, h))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: data.projects.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/projects/$projectId",
					params: { projectId: row.projectId },
					className: "font-medium hover:text-primary",
					children: row.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillLink, {
					search: drilldownByProject(row.projectId),
					className: "ml-2 text-xs text-muted-foreground",
					children: "Tickets"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.customerName }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.total
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.open
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.resolved
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "tabular",
					children: [row.slaPercent, "%"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.avgResponseFormatted ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.avgResolutionFormatted ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.reopened
				})
			] }, row.projectId)) })]
		})
	});
}
function CategoriesTab({ query }) {
	const data = query.data;
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportError, {});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 8,
		cols: 8
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
			title: "Category performance",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: [
					"Category",
					"Volume",
					"Open",
					"Resolved",
					"SLA %"
				].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, { children: h }, h))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (data?.categories ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillLink, {
					search: drilldownByCategory(row.categoryId),
					children: row.name
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.volume
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.open
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.resolved
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "tabular",
					children: [row.slaPercent, "%"]
				})
			] }, row.categoryId)) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-48 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: data?.categories ?? [],
						layout: "vertical",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								type: "number",
								fontSize: 10
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								type: "category",
								dataKey: "name",
								width: 90,
								fontSize: 10
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "volume",
								radius: [
									0,
									4,
									4,
									0
								],
								children: (data?.categories ?? []).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: categoryChartColor(entry.name) }, entry.categoryId))
							})
						]
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
			title: "Priority analytics",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: [
					"Priority",
					"Volume",
					"Open",
					"Resolved",
					"SLA breaches",
					"Avg resolution"
				].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, { children: h }, h))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (data?.priorities ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrillLink, {
					search: drilldownByPriority(row.priority),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: row.priority }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-muted-foreground",
						children: row.label
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.volume
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.open
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.resolved
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "tabular",
					children: row.slaBreaches
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.avgResolutionFormatted ?? "—" })
			] }, row.priority)) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-48 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: data?.priorities ?? [],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								fontSize: 10
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								fontSize: 10,
								allowDecimals: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "volume",
								radius: [
									4,
									4,
									0,
									0
								],
								children: (data?.priorities ?? []).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: priorityChartColor(entry.priority) }, entry.priority))
							})
						]
					})
				})
			})]
		})]
	});
}
function EscalationsTab({ escalationsQuery, reopenedQuery }) {
	const escalations = escalationsQuery.data;
	const reopened = reopenedQuery.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Reopened tickets",
			children: reopenedQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
				rows: 4,
				cols: 4
			}) : reopenedQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportError, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 p-5 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Total reopened",
					value: reopened?.summary.totalReopened ?? 0
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Reopen rate",
					value: `${reopened?.summary.reopenRate ?? 0}%`
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketListTable, { tickets: reopened?.tickets ?? [] })] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Escalation analytics",
			children: escalationsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
				rows: 4,
				cols: 4
			}) : escalationsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportError, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 p-5 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Total escalations",
						value: escalations?.summary.total ?? 0,
						to: "/admin/tickets",
						search: drilldownByTag("escalated")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Pending",
						value: escalations?.summary.pending ?? 0,
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Resolved",
						value: escalations?.summary.resolved ?? 0,
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Critical",
						value: escalations?.summary.critical ?? 0,
						tone: "danger"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketListTable, { tickets: escalations?.tickets ?? [] })] })
		})]
	});
}
function TicketListTable({ tickets }) {
	if (!tickets.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportEmpty, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
		className: "min-w-4xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
			className: "hover:bg-transparent",
			children: [
				"Ticket",
				"Customer",
				"Project",
				"Agent",
				"Priority",
				"Status",
				"Category"
			].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, { children: h }, h))
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
				id: t.number,
				title: t.subject,
				to: "/admin/tickets/$ticketId",
				params: { ticketId: t.ticketId }
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.customerName }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.projectName }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.agentName }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: t.priority }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: t.status }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.categoryName })
		] }, t.ticketId)) })]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportsWorkspace, {})
});
//#endregion
export { SplitComponent as component };
