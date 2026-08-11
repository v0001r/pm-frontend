import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, n as Button, s as getApiErrorMessage } from "./button-vnqCGuCs.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as CirclePause, F as LoaderCircle, H as Inbox, _t as AlarmClock, et as CircleDot, gt as Archive, l as TriangleAlert, tt as CircleCheck } from "../_libs/lucide-react.mjs";
import { _ as fullName, b as statusChartColor, d as SectionCard, g as categoryChartColor, m as TableSkeleton, n as Input, p as StatusBadge, r as KpiCard, s as PriorityBadge, y as priorityChartColor } from "./primitives-BAq0jd4Y.mjs";
import { m as formatDate } from "./store-C1539MgZ.mjs";
import { _ as TableHead, c as EntityCell, d as PrimaryCell, g as TableCell, h as TableBody, m as Table, v as TableHeader, y as TableRow } from "./data-table-CCefV4l1.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
import { H as getTicketUserLabel, J as fetchEmployees, L as getTicketCategoryLabel, at as defaultDashboardDateRange, ft as ListingToolbarActions, lt as ListingFilterField, nt as fetchProjects, ot as fetchAdminDashboard, ut as ListingFilterSelect, xt as fetchCustomers } from "./router-CZIJBryQ.mjs";
import { t as AdminOrStaffRoute } from "./guard-BbFIUcOG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-C5EAnSkH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTER_ANY = "all";
function buildDashboardQuery(filters) {
	const params = {
		dateFrom: filters.dateFrom,
		dateTo: filters.dateTo
	};
	if (filters.customerId !== FILTER_ANY) params.customerId = filters.customerId;
	if (filters.projectId !== FILTER_ANY) params.projectId = filters.projectId;
	if (filters.assignedTo !== FILTER_ANY) params.assignedTo = filters.assignedTo;
	return params;
}
function formatDashboardRangeLabel(dateFrom, dateTo) {
	const from = /* @__PURE__ */ new Date(`${dateFrom}T00:00:00`);
	const to = /* @__PURE__ */ new Date(`${dateTo}T00:00:00`);
	const sameYear = from.getFullYear() === to.getFullYear();
	const formatter = new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		...sameYear ? {} : { year: "numeric" }
	});
	const toFormatter = new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
	return `${formatter.format(from)} – ${toFormatter.format(to)}`;
}
function AdminDashboard() {
	const defaultRange = defaultDashboardDateRange();
	const defaultFilters = {
		customerId: FILTER_ANY,
		projectId: FILTER_ANY,
		assignedTo: FILTER_ANY,
		dateFrom: defaultRange.dateFrom,
		dateTo: defaultRange.dateTo
	};
	const [filters, setFilters] = (0, import_react.useState)(defaultFilters);
	const [draft, setDraft] = (0, import_react.useState)(defaultFilters);
	const [filterOpen, setFilterOpen] = (0, import_react.useState)(false);
	const queryParams = (0, import_react.useMemo)(() => buildDashboardQuery(filters), [filters]);
	const { data, isLoading, isError, error, isFetching } = useQuery({
		queryKey: ["admin-dashboard", queryParams],
		queryFn: () => fetchAdminDashboard(queryParams)
	});
	const customersQuery = useQuery({
		queryKey: ["dashboard-customers"],
		queryFn: () => fetchCustomers({
			page: 1,
			limit: 100,
			sortBy: "companyName",
			sortOrder: "asc"
		})
	});
	const projectsQuery = useQuery({
		queryKey: ["dashboard-projects", draft.customerId],
		queryFn: () => fetchProjects({
			page: 1,
			limit: 100,
			sortBy: "name",
			sortOrder: "asc",
			...draft.customerId !== FILTER_ANY ? { customerId: draft.customerId } : {}
		})
	});
	const employeesQuery = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees
	});
	(0, import_react.useEffect)(() => {
		if (filterOpen) setDraft(filters);
	}, [filterOpen, filters]);
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load dashboard"));
	}, [isError, error]);
	const kpis = data?.kpis;
	const charts = data?.charts;
	const recent = data?.recentTickets ?? [];
	const rangeLabel = formatDashboardRangeLabel(filters.dateFrom, filters.dateTo);
	const kpiValue = (value) => isLoading ? "…" : value ?? 0;
	const activeFilterCount = [
		filters.customerId !== FILTER_ANY,
		filters.projectId !== FILTER_ANY,
		filters.assignedTo !== FILTER_ANY,
		filters.dateFrom !== defaultFilters.dateFrom || filters.dateTo !== defaultFilters.dateTo
	].filter(Boolean).length;
	const applyFilters = () => {
		if (draft.dateFrom && draft.dateTo && draft.dateFrom > draft.dateTo) {
			toast.error("Start date must be on or before end date.");
			return;
		}
		setFilters(draft);
		setFilterOpen(false);
	};
	const resetFilters = () => {
		setDraft(defaultFilters);
		setFilters(defaultFilters);
		setFilterOpen(false);
	};
	const patchDraft = (patch) => {
		setDraft((current) => {
			const next = {
				...current,
				...patch
			};
			if (patch.customerId !== void 0 && patch.customerId !== current.customerId) next.projectId = FILTER_ANY;
			return next;
		});
	};
	const customers = customersQuery.data?.items ?? [];
	const projects = projectsQuery.data?.items ?? [];
	const employees = employeesQuery.data ?? [];
	const filterContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "Customer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
				value: draft.customerId,
				onChange: (value) => patchDraft({ customerId: value }),
				options: customers.map((customer) => [customer._id, customer.companyName]),
				allLabel: "All customers",
				allValue: FILTER_ANY
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "Project",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
				value: draft.projectId,
				onChange: (value) => patchDraft({ projectId: value }),
				options: projects.map((project) => [project._id, project.name]),
				allLabel: "All projects",
				allValue: FILTER_ANY
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "Assigned agent",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
				value: draft.assignedTo,
				onChange: (value) => patchDraft({ assignedTo: value }),
				options: employees.map((employee) => [employee._id ?? employee.id, fullName(employee)]),
				allLabel: "All agents",
				allValue: FILTER_ANY
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "From",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "date",
				value: draft.dateFrom,
				onChange: (event) => patchDraft({ dateFrom: event.target.value }),
				className: "h-9"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "To",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "date",
				value: draft.dateTo,
				onChange: (event) => patchDraft({ dateTo: event.target.value }),
				className: "h-9"
			})
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("sticky top-14 z-10 -mt-2 mb-2 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/95 px-4 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/85"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-foreground",
					children: "Support dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [rangeLabel, activeFilterCount > 0 ? ` · ${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} active` : ""]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-2",
				children: [isFetching && !isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), "Updating…"]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingToolbarActions, {
					filterOpen,
					onFilterOpenChange: setFilterOpen,
					activeFilterCount,
					onFilterApply: applyFilters,
					onFilterClear: resetFilters,
					filterContent,
					filterTitle: "Dashboard filters"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Total tickets",
					value: kpiValue(kpis?.total.value),
					icon: Inbox,
					tone: "success",
					trend: kpis?.total.trend,
					to: "/admin/tickets"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "New",
					value: kpiValue(kpis?.new.value),
					icon: CircleDot,
					tone: "primary",
					trend: kpis?.new.trend,
					to: "/admin/tickets",
					search: { status: "New" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "In progress",
					value: kpiValue(kpis?.inProgress.value),
					icon: LoaderCircle,
					tone: "warning",
					trend: kpis?.inProgress.trend,
					to: "/admin/tickets",
					search: { status: "In Progress" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Assigned",
					value: kpiValue(kpis?.assigned.value),
					icon: CirclePause,
					tone: "info",
					trend: kpis?.assigned.trend,
					to: "/admin/tickets",
					search: { status: "Assigned" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Resolved",
					value: kpiValue(kpis?.resolved.value),
					icon: CircleCheck,
					tone: "success",
					trend: kpis?.resolved.trend,
					to: "/admin/tickets",
					search: { status: "Resolved" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Closed",
					value: kpiValue(kpis?.closed.value),
					icon: Archive,
					tone: "default",
					trend: kpis?.closed.trend,
					to: "/admin/tickets",
					search: { status: "Closed" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "High priority",
					value: kpiValue(kpis?.highPriority.value),
					icon: TriangleAlert,
					tone: "warning",
					trend: kpis?.highPriority.trend,
					to: "/admin/tickets",
					search: { priority: "High" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Overdue",
					value: kpiValue(kpis?.overdue.value),
					icon: AlarmClock,
					tone: "danger",
					trend: kpis?.overdue.trend,
					to: "/admin/tickets",
					search: { sla: "Breached" }
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Tickets created vs resolved",
			description: rangeLabel,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-72 p-4",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center text-sm text-muted-foreground",
					children: "Loading chart…"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: charts?.trend ?? [],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--color-border)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "day",
								tickLine: false,
								axisLine: false,
								fontSize: 12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tickLine: false,
								axisLine: false,
								fontSize: 12,
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
								fillOpacity: .12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "resolved",
								stroke: "var(--color-success)",
								fill: "var(--color-success)",
								fillOpacity: .12
							})
						]
					})
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Tickets by status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64 p-4",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center text-sm text-muted-foreground",
							children: "Loading…"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: charts?.byStatus ?? [],
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tickLine: false,
										axisLine: false,
										fontSize: 11,
										interval: 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tickLine: false,
										axisLine: false,
										fontSize: 12,
										allowDecimals: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										fontSize: 12,
										borderRadius: 8
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "value",
										radius: [
											4,
											4,
											0,
											0
										],
										children: (charts?.byStatus ?? []).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: statusChartColor(entry.name) }, entry.name))
									})
								]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Tickets by priority",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64 p-4",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center text-sm text-muted-foreground",
							children: "Loading…"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: charts?.byPriority ?? [],
									dataKey: "value",
									nameKey: "name",
									cx: "50%",
									cy: "45%",
									innerRadius: 48,
									outerRadius: 78,
									paddingAngle: 2,
									isAnimationActive: false,
									children: (charts?.byPriority ?? []).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: priorityChartColor(entry.name) }, entry.name))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									fontSize: 12,
									borderRadius: 8
								} })
							] })
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Tickets by category",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64 p-4",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center text-sm text-muted-foreground",
							children: "Loading…"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: charts?.byCategory ?? [],
								layout: "vertical",
								margin: { left: 8 },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)",
										horizontal: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										tickLine: false,
										axisLine: false,
										fontSize: 12,
										allowDecimals: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "name",
										tickLine: false,
										axisLine: false,
										fontSize: 11,
										width: 100
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										fontSize: 12,
										borderRadius: 8
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "value",
										radius: [
											0,
											4,
											4,
											0
										],
										children: (charts?.byCategory ?? []).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: categoryChartColor(entry.name) }, entry.name))
									})
								]
							})
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Recently updated tickets",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/tickets",
					children: "View all"
				})
			}),
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
				rows: 6,
				cols: 6
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: [
					"Ticket",
					"Client",
					"Priority",
					"Status",
					"Agent",
					"Updated"
				].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: heading }, heading))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: recent.map((ticket) => {
				const client = ticket.clientId;
				const agent = ticket.assignedTo;
				const clientName = getTicketUserLabel(client);
				const clientHue = client && typeof client !== "string" ? client.avatarHue ?? 265 : 265;
				const company = client && typeof client !== "string" ? client.company : void 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
						id: String(ticket.number),
						title: String(ticket.subject),
						to: "/admin/tickets/$ticketId",
						params: { ticketId: String(ticket._id ?? ticket.id) }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: getTicketCategoryLabel(ticket)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
						name: clientName,
						...company ? { subtitle: company } : {},
						hue: clientHue
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: String(ticket.priority) }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: String(ticket.status) }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: agent ? getTicketUserLabel(agent) : "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-muted-foreground",
						children: formatDate(String(ticket.updatedAt ?? ticket.createdAt))
					})
				] }, String(ticket._id ?? ticket.id));
			}) })] })
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminOrStaffRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {}) });
//#endregion
export { AdminDashboard, SplitComponent as component };
