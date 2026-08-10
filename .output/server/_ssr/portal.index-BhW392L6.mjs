import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as useAuth, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, f as StatusBadge, n as KpiCard, o as PriorityBadge, p as TableSkeleton, t as EmptyState, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate } from "./store-rjYLW1Ml.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as TableRow, J as Table, Q as TableHeader, V as PrimaryCell, X as TableCell, Y as TableBody, Z as TableHead, ct as fetchPortalDashboard } from "./router-DLFu5c1a.mjs";
import { f as ClientRoute } from "./guard-Da2hUi3G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.index-BhW392L6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PortalHome() {
	const { user } = useAuth();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["portal-dashboard"],
		queryFn: fetchPortalDashboard
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load dashboard"));
	}, [isError, error]);
	const summary = data?.summary;
	const tickets = data?.recentTickets ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `Welcome back, ${user?.name?.split(" ")[0] ?? user?.firstName ?? ""}`,
			description: "Your support activity at a glance.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/portal/tickets/new",
					children: "New ticket"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Open tickets",
					value: isLoading ? "…" : summary?.openTickets ?? 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "In progress",
					value: isLoading ? "…" : summary?.inProgress ?? 0,
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Resolved",
					value: isLoading ? "…" : summary?.resolved ?? 0,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "My projects",
					value: "View",
					to: "/portal/projects"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Recent tickets",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/portal/tickets",
				className: "text-sm text-primary hover:underline",
				children: "View all"
			}),
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
				rows: 4,
				cols: 5
			}) : tickets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No tickets yet",
				description: "Raise your first ticket and our team will respond within SLA."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				className: "min-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					className: "hover:bg-transparent",
					children: [
						"Ticket",
						"Priority",
						"Status",
						"Last update"
					].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: heading }, heading))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: tickets.slice(0, 6).map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
						id: String(ticket.number),
						title: String(ticket.subject),
						to: "/portal/tickets/$ticketId",
						params: { ticketId: String(ticket._id) }
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: ticket.priority }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: ticket.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "whitespace-nowrap text-muted-foreground",
						children: formatDate(String(ticket.updatedAt), true)
					})
				] }, String(ticket._id))) })]
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalHome, {}) });
//#endregion
export { PortalHome, SplitComponent as component };
