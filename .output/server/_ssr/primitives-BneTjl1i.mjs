import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { U as Inbox, _t as ArrowUpRight, k as Minus, yt as ArrowDownRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/primitives-BneTjl1i.js
var import_jsx_runtime = require_jsx_runtime();
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
var SLA_MATRIX = {
	P1: {
		response: "15 minutes",
		resolution: "4 hours"
	},
	P2: {
		response: "1 hour",
		resolution: "12 hours"
	},
	P3: {
		response: "8 hours",
		resolution: "24 hours"
	},
	P4: {
		response: "24 hours",
		resolution: "72 hours"
	},
	Critical: {
		response: "1 hour",
		resolution: "4 hours"
	},
	High: {
		response: "4 hours",
		resolution: "12 hours"
	},
	Medium: {
		response: "8 hours",
		resolution: "24 hours"
	},
	Low: {
		response: "24 hours",
		resolution: "72 hours"
	}
};
function fullName(u) {
	if (u.name) return u.name;
	return `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
}
function initials(name) {
	return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}
var badgeBase = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors shadow-sm";
var statusStyles = {
	New: "bg-info/10 text-info border-info/20",
	Assigned: "bg-primary/10 text-primary border-primary/20",
	"In Progress": "bg-warning/10 text-warning border-warning/25",
	Resolved: "bg-success/10 text-success border-success/25",
	Closed: "bg-muted text-muted-foreground border-border",
	Reopened: "bg-info/10 text-info border-info/20",
	Cancelled: "bg-muted text-muted-foreground border-border"
};
function StatusBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(badgeBase, statusStyles[status] ?? "bg-muted text-muted-foreground border-border", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-current" }), status]
	});
}
var priorityStyles = {
	P1: "bg-destructive text-destructive-foreground border-destructive",
	P2: "bg-destructive/10 text-destructive border-destructive/20",
	P3: "bg-warning/10 text-warning border-warning/25",
	P4: "bg-info/10 text-info border-info/20",
	Low: "bg-info/10 text-info border-info/20",
	Medium: "bg-warning/10 text-warning border-warning/25",
	High: "bg-destructive/10 text-destructive border-destructive/20",
	Critical: "bg-destructive text-destructive-foreground border-destructive"
};
function PriorityBadge({ priority }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(badgeBase, priorityStyles[priority] ?? "bg-muted text-muted-foreground border-border"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-current" }), priority]
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
	Open: "bg-sky-50 text-sky-700 border-sky-200",
	"On Hold": "bg-amber-50 text-amber-700 border-amber-200",
	Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
	Cancelled: "bg-slate-50 text-slate-600 border-slate-200"
};
function ProjectStatusBadge({ status, className }) {
	const label = status === "Open" ? "In Progress" : status;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(badgeBase, projectStatusStyles[status], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-current" }), label]
	});
}
function UserAvatar({ name, hue = 265, size = 28, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold shadow-sm ring-2 ring-surface", className),
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
		default: "bg-slate-100 text-slate-600",
		primary: "bg-violet-100 text-violet-600",
		info: "bg-sky-100 text-sky-600",
		teal: "bg-teal-100 text-teal-600",
		lime: "bg-lime-100 text-lime-600",
		danger: "bg-rose-100 text-rose-600",
		warning: "bg-amber-100 text-amber-600",
		success: "bg-emerald-100 text-emerald-600"
	}[tone];
	const hasTrend = trend !== void 0 && trend !== null;
	const up = (trend ?? 0) >= 0;
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm",
		children: [hasTrend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("absolute top-4 right-4 inline-flex items-center gap-0.5 text-[13px] font-semibold", trend === 0 ? "text-muted-foreground" : up ? "text-emerald-600" : "text-rose-600"),
			children: [trend === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" }) : up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "size-3.5" }), trend === 0 ? "—" : `${up ? "+" : ""}${trend}%`]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("grid size-12 shrink-0 place-items-center rounded-xl", toneClass),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 pr-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted-foreground",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tabular mt-1 text-[1.75rem] leading-none font-bold tracking-tight text-foreground",
						children: value
					}),
					hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-muted-foreground",
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
		className: "block rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
		children: body
	});
}
function PageHeader({ title, description, actions, breadcrumbs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [breadcrumbs, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "truncate text-[1.75rem] font-bold tracking-tight text-foreground sm:text-[2rem]",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground",
					children: description
				})]
			}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-2.5",
				children: actions
			})]
		})]
	});
}
function EmptyState({ title, description, action, secondaryAction, icon: Icon = Inbox }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-4 px-6 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "relative grid size-[72px] place-items-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm ring-1 ring-primary/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-8 text-primary/70" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-semibold tracking-tight text-foreground",
				children: title
			}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground",
				children: description
			})] }),
			(action || secondaryAction) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center justify-center gap-2",
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
			className: "flex gap-4 border-b border-border px-4 py-3.5",
			children: Array.from({ length: cols }, (_, c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, { className: cn("h-3.5", c === 0 ? "w-24" : "w-16") }, c))
		}), Array.from({ length: rows }, (_, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-4 px-4 py-5",
			children: Array.from({ length: cols }, (_, c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, { className: cn("h-4", c === 0 ? "w-40" : "w-24") }, c))
		}, r))]
	});
}
function SectionCard({ title, description, actions, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("panel overflow-hidden", className),
		children: [(title || actions) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-gradient-to-b from-muted/30 to-transparent px-6 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold tracking-tight text-foreground",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[13px] leading-relaxed text-muted-foreground",
					children: description
				})]
			}), actions]
		}), children]
	});
}
//#endregion
export { initials as _, PageHeader as a, SETTABLE_STATUSES as c, SectionCard as d, SlaBadge as f, fullName as g, UserAvatar as h, PROJECT_STATUSES as i, SLA_MATRIX as l, TableSkeleton as m, KpiCard as n, PriorityBadge as o, StatusBadge as p, PRIORITIES as r, ProjectStatusBadge as s, EmptyState as t, STATUSES as u };
