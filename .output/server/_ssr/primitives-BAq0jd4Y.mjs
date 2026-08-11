import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn } from "./button-vnqCGuCs.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Minus, H as Inbox, ht as ArrowDownRight, pt as ArrowUpRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/primitives-BAq0jd4Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-surface px-3 py-1 text-sm shadow-sm transition-all duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var STATUSES = [
	"New",
	"Assigned",
	"In Progress",
	"Resolved",
	"Closed",
	"Reopened",
	"Cancelled"
];
/** Statuses users can pick manually — assignment sets "Assigned" automatically. */
var SETTABLE_STATUSES = STATUSES.filter((status) => status !== "Assigned");
var PRIORITIES = [
	"P1",
	"P2",
	"P3",
	"P4"
];
var PROJECT_STATUSES = [
	"Open",
	"On Hold",
	"Completed",
	"Cancelled"
];
function fullName(u) {
	if (u.name) return u.name;
	return `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
}
function initials(name) {
	return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}
var badgeBase = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors duration-150";
var statusStyles = {
	New: "bg-info/10 text-info border-info/20",
	Assigned: "bg-primary/10 text-primary border-primary/20",
	"In Progress": "bg-warning/10 text-warning border-warning/25",
	Resolved: "bg-success/10 text-success border-success/25",
	Closed: "bg-muted text-muted-foreground border-border",
	Reopened: "bg-info/10 text-info border-info/20",
	Cancelled: "bg-muted text-muted-foreground border-border",
	Active: "bg-success/10 text-success border-success/25",
	Inactive: "bg-muted text-muted-foreground border-border"
};
function StatusBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(badgeBase, statusStyles[status] ?? "bg-muted text-muted-foreground border-border", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-1.5 rounded-full bg-current",
			"aria-hidden": true
		}), status]
	});
}
var priorityStyles = {
	P1: "bg-destructive/10 text-destructive border-destructive/20",
	P2: "bg-destructive/10 text-destructive border-destructive/20",
	P3: "bg-warning/10 text-warning border-warning/25",
	P4: "bg-info/10 text-info border-info/20",
	Low: "bg-info/10 text-info border-info/20",
	Medium: "bg-warning/10 text-warning border-warning/25",
	High: "bg-destructive/10 text-destructive border-destructive/20",
	Critical: "bg-destructive/10 text-destructive border-destructive/20"
};
/** Solid fills for charts — aligned with StatusBadge semantic colors. */
var statusChartColors = {
	New: "var(--color-info)",
	Assigned: "var(--color-primary)",
	"In Progress": "var(--color-warning)",
	Resolved: "var(--color-success)",
	Closed: "var(--color-muted-foreground)",
	Reopened: "var(--color-info)",
	Cancelled: "var(--color-muted-foreground)"
};
/** Solid fills for charts — aligned with PriorityBadge semantic colors. */
var priorityChartColors = {
	P1: "var(--color-destructive)",
	P2: "var(--color-destructive)",
	P3: "var(--color-warning)",
	P4: "var(--color-info)",
	Low: "var(--color-info)",
	Medium: "var(--color-warning)",
	High: "var(--color-destructive)",
	Critical: "var(--color-destructive)"
};
var categoryChartPalette = [
	"var(--color-primary)",
	"var(--color-info)",
	"var(--color-success)",
	"var(--color-warning)",
	"var(--color-destructive)"
];
function statusChartColor(status) {
	return statusChartColors[status] ?? "var(--color-muted-foreground)";
}
function priorityChartColor(priority) {
	return priorityChartColors[priority] ?? "var(--color-muted-foreground)";
}
function categoryChartColor(name) {
	let hash = 0;
	for (let i = 0; i < name.length; i += 1) hash = hash * 31 + name.charCodeAt(i) >>> 0;
	return categoryChartPalette[hash % categoryChartPalette.length];
}
function PriorityBadge({ priority }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(badgeBase, priorityStyles[priority] ?? "bg-muted text-muted-foreground border-border"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-1.5 rounded-full bg-current",
			"aria-hidden": true
		}), priority]
	});
}
var slaStyles = {
	"On Track": "bg-success/10 text-success border-success/25",
	Approaching: "bg-warning/10 text-warning border-warning/25",
	Breached: "bg-destructive/10 text-destructive border-destructive/20",
	Met: "bg-muted text-muted-foreground border-border"
};
function SlaBadge({ state }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeBase, slaStyles[state]),
		children: state
	});
}
var projectStatusStyles = {
	Open: "bg-info/10 text-info border-info/20",
	"On Hold": "bg-warning/10 text-warning border-warning/25",
	Completed: "bg-success/10 text-success border-success/25",
	Cancelled: "bg-muted text-muted-foreground border-border"
};
function ProjectStatusBadge({ status, className }) {
	const label = status === "Open" ? "In Progress" : status;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(badgeBase, projectStatusStyles[status], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-1.5 rounded-full bg-current",
			"aria-hidden": true
		}), label]
	});
}
function UserAvatar({ name, hue = 265, size = 28, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold ring-2 ring-surface", className),
		style: {
			width: size,
			height: size,
			fontSize: size * .36,
			backgroundColor: `oklch(0.94 0.04 ${hue})`,
			color: `oklch(0.42 0.12 ${hue})`
		},
		children: initials(name)
	});
}
function KpiCard({ label, value, hint, to, search, tone = "default", icon: Icon, trend }) {
	const toneClass = {
		default: "bg-muted text-muted-foreground",
		primary: "bg-primary/10 text-primary",
		info: "bg-info/10 text-info",
		danger: "bg-destructive/10 text-destructive",
		warning: "bg-warning/10 text-warning",
		success: "bg-success/10 text-success"
	}[tone];
	const hasTrend = trend !== void 0 && trend !== null;
	const up = (trend ?? 0) >= 0;
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel relative h-full overflow-hidden rounded-lg p-4",
		children: [hasTrend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("absolute top-3 right-3 inline-flex items-center gap-0.5 text-xs font-semibold", trend === 0 ? "text-muted-foreground" : up ? "text-success" : "text-destructive"),
			children: [trend === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" }) : up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "size-3.5" }), trend === 0 ? "—" : `${up ? "+" : ""}${trend}%`]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("grid size-10 shrink-0 place-items-center rounded-md", toneClass),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-[18px]",
					strokeWidth: 1.75
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 pr-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-body-sm font-medium text-foreground",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tabular mt-0.5 text-2xl font-bold leading-none tracking-tight text-foreground",
						children: value
					}),
					hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: hint
					})
				]
			})]
		})]
	});
	if (!to) return body;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		search,
		className: "block rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
		children: body
	});
}
function PageHeader({ title, description, actions, breadcrumbs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [breadcrumbs, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-page-title truncate text-foreground",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-body-sm text-subtle",
					children: description
				})]
			}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: actions
			})]
		})]
	});
}
function EmptyState({ title, description, action, secondaryAction, icon: Icon = Inbox }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "grid size-12 place-items-center rounded-lg bg-muted text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-5",
					strokeWidth: 1.75
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-section-title text-foreground",
				children: title
			}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-1 max-w-sm text-body-sm text-subtle",
				children: description
			})] }),
			(action || secondaryAction) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex flex-wrap items-center justify-center gap-2",
				children: [action, secondaryAction]
			})
		]
	});
}
function Shimmer({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("shimmer block rounded-md", className) });
}
function TableSkeleton({ rows = 6, cols = 5 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "divide-y divide-border/70 bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-4 border-b border-border px-4 py-3",
			children: Array.from({ length: cols }, (_, c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, { className: cn("h-3", c === 0 ? "w-24" : "w-16") }, c))
		}), Array.from({ length: rows }, (_, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-[52px] items-center gap-4 px-4",
			children: Array.from({ length: cols }, (_, c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, { className: cn("h-3.5", c === 0 ? "w-40" : "w-24") }, c))
		}, r))]
	});
}
function SectionCard({ title, description, actions, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("panel overflow-hidden", className),
		children: [(title || actions) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-3.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-section-title",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-body-sm text-subtle",
					children: description
				})]
			}), actions]
		}), children]
	});
}
//#endregion
export { fullName as _, PROJECT_STATUSES as a, statusChartColor as b, ProjectStatusBadge as c, SectionCard as d, SlaBadge as f, categoryChartColor as g, UserAvatar as h, PRIORITIES as i, SETTABLE_STATUSES as l, TableSkeleton as m, Input as n, PageHeader as o, StatusBadge as p, KpiCard as r, PriorityBadge as s, EmptyState as t, STATUSES as u, initials as v, priorityChartColor as y };
