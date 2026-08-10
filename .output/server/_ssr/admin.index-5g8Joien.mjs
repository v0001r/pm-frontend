import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as LoaderCircle, U as Inbox, bt as Archive, nt as CircleDot, rt as CircleCheck, tt as CirclePause, u as TriangleAlert, xt as AlarmClock } from "../_libs/lucide-react.mjs";
import { d as SectionCard, m as TableSkeleton, n as KpiCard, o as PriorityBadge, p as StatusBadge } from "./primitives-CPmujTLD.mjs";
import { d as formatDate } from "./store-Daxm1pxW.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
import { $ as Table, A as getTicketUserLabel, G as PrimaryCell, H as EntityCell, P as fetchAdminDashboard, T as getTicketCategoryLabel, et as TableBody, it as TableRow, nt as TableHead, rt as TableHeader, tt as TableCell } from "./router-FFtXCDLz.mjs";
import { t as AdminOrStaffRoute } from "./guard-BCYPieem.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-5g8Joien.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var chartColors = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)",
	"var(--color-chart-4)",
	"var(--color-chart-5)"
];
function AdminDashboard() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["admin-dashboard"],
		queryFn: fetchAdminDashboard
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load dashboard"));
	}, [isError, error]);
	const kpis = data?.kpis;
	const charts = data?.charts;
	const recent = data?.recentTickets ?? [];
	const kpiValue = (value) => isLoading ? "…" : value ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
			description: "Last 7 days",
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
								stroke: "var(--color-chart-1)",
								fill: "var(--color-chart-1)",
								fillOpacity: .12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "resolved",
								stroke: "var(--color-chart-3)",
								fill: "var(--color-chart-3)",
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
										fill: "var(--color-chart-1)",
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
									children: (charts?.byPriority ?? []).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: chartColors[i % chartColors.length] }, i))
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
										fill: "var(--color-chart-2)",
										radius: [
											0,
											4,
											4,
											0
										]
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
