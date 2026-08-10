import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button } from "./button-Cc9Bh2Gp.mjs";
import { K as Download } from "../_libs/lucide-react.mjs";
import { a as PageHeader, h as fullName, n as KpiCard, r as PRIORITIES, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { c as useStore, i as findUser, r as categoryName, s as slaState } from "./store-rjYLW1Ml.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as TableRow, G as SelectItem, J as Table, K as SelectTrigger, Q as TableHeader, U as Select, V as PrimaryCell, W as SelectContent, X as TableCell, Y as TableBody, Z as TableHead, q as SelectValue, z as EntityCell } from "./router-DLFu5c1a.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reports-D8VJRl2E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const store = useStore((s) => s);
	const [range, setRange] = (0, import_react.useState)("30");
	const tickets = store.tickets;
	const table = (rows) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
		className: "text-muted-foreground",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
		className: "tabular text-right font-semibold",
		children: v
	})] }, k)) }) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Reports & analytics",
			description: "Performance across volume, responsiveness and SLA compliance.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: range,
					onValueChange: setRange,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-9 w-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "today",
							children: "Today"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "7",
							children: "Last 7 days"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "30",
							children: "Last 30 days"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "month",
							children: "This month"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "last-month",
							children: "Last month"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "custom",
							children: "Custom range"
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => toast.success("Report exported to CSV."),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export"]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Tickets created",
					value: tickets.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Tickets resolved",
					value: tickets.filter((t) => t.status === "Resolved").length,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Tickets closed",
					value: tickets.filter((t) => t.status === "Closed").length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Open tickets",
					value: tickets.filter((t) => !["Resolved", "Closed"].includes(t.status)).length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Avg. first response",
					value: "42m",
					hint: "Target 1h"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Avg. resolution",
					value: "11h 24m",
					hint: "Target 24h"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "SLA breaches",
					value: tickets.filter((t) => slaState(t) === "Breached").length,
					tone: "danger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Reopened",
					value: 2,
					tone: "warning"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Tickets by category",
					children: table(store.categories.map((c) => [c.name, tickets.filter((t) => t.categoryId === c.id).length]))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Tickets by priority",
					children: table(PRIORITIES.map((p) => [p, tickets.filter((t) => t.priority === p).length]))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Tickets by client",
					children: table(store.users.filter((u) => u.role === "Client").map((u) => [`${fullName(u)} · ${u.company}`, tickets.filter((t) => t.clientId === u.id).length]))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Tickets by support agent",
					children: table(store.users.filter((u) => u.role === "Staff" || u.role === "Admin").map((u) => [fullName(u), tickets.filter((t) => t.assignedTo === u.id).length]))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "SLA breach detail",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				className: "min-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					className: "hover:bg-transparent",
					children: [
						"Ticket",
						"Client",
						"Category",
						"Priority",
						"SLA"
					].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: heading }, heading))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: tickets.filter((t) => slaState(t) !== "On Track" && slaState(t) !== "Met").slice(0, 8).map((t) => {
					const client = findUser(store, t.clientId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
							id: t.number,
							title: t.subject
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
							name: fullName(client),
							subtitle: client.company,
							hue: client.avatarHue
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: categoryName(store, t.categoryId) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.priority }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: slaState(t) })
					] }, t.id);
				}) })]
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportsPage, {})
});
//#endregion
export { SplitComponent as component };
