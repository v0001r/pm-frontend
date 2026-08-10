import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, d as useAuth, n as Button, r as api, s as getApiErrorMessage, t as AuthProvider } from "./button-Cc9Bh2Gp.mjs";
import { R as redirect, _ as createRootRouteWithContext, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as LoaderCircle, J as Ellipsis, U as Inbox, at as ChevronsRight, bt as Archive, ct as ChevronRight, dt as Check, it as ChevronsUpDown, lt as ChevronLeft, nt as CircleDot, ot as ChevronsLeft, rt as CircleCheck, st as ChevronUp, tt as CirclePause, u as TriangleAlert, ut as ChevronDown, xt as AlarmClock } from "../_libs/lucide-react.mjs";
import { _ as initials, a as PageHeader, d as SectionCard, g as fullName, h as UserAvatar, m as TableSkeleton, n as KpiCard, o as PriorityBadge, p as StatusBadge, t as EmptyState } from "./primitives-BneTjl1i.mjs";
import { d as formatDate, n as DropdownMenuContent, o as DropdownMenuTrigger, t as DropdownMenu } from "./store-CZmg1Lwb.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-DVl2QHjZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function fetchCustomers(params = {}) {
	const { data } = await api.get("/customers", { params });
	return data.data;
}
async function fetchCustomer(id) {
	const { data } = await api.get(`/customers/${id}`);
	return data.data;
}
async function createCustomer(payload) {
	const { data } = await api.post("/customers", payload);
	return data.data;
}
async function updateCustomer(id, payload) {
	const { data } = await api.patch(`/customers/${id}`, payload);
	return data.data;
}
async function updateCustomerStatus(id, status) {
	const { data } = await api.patch(`/customers/${id}/status`, { status });
	return data.data;
}
async function fetchCustomerOverview(id) {
	const { data } = await api.get(`/customers/${id}/overview`);
	return data.data;
}
async function fetchCustomerContacts(customerId) {
	const { data } = await api.get(`/customers/${customerId}/contacts`);
	return data.data;
}
async function fetchCustomerProjects(customerId, params = {}) {
	const { data } = await api.get(`/customers/${customerId}/projects`, { params });
	return data.data;
}
async function fetchCustomerTickets(customerId, params = {}) {
	const { data } = await api.get(`/customers/${customerId}/tickets`, { params });
	return data.data;
}
async function resendCustomerInvitation(customerId) {
	const { data } = await api.post(`/customers/${customerId}/invite/resend`);
	return data.data;
}
async function activateAccount(token, password) {
	const { data } = await api.post("/auth/activate", {
		token,
		password
	});
	return data.data;
}
async function fetchPortalDashboard() {
	const { data } = await api.get("/portal/dashboard");
	return data.data;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/table-Fg6wurDN.js
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("border-b border-border bg-card [&_tr]:border-0", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("bg-card [&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t border-border bg-card font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b border-border/70 transition-colors hover:bg-muted/25 data-[state=selected]:bg-primary/5", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-12 px-4 text-left align-middle text-[11px] font-semibold uppercase tracking-wider text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("px-4 py-5 align-middle text-sm text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/select-BDkZgq8P.js
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-10 w-full items-center justify-between whitespace-nowrap rounded-lg border border-border/80 bg-surface px-3.5 py-2 text-sm shadow-sm ring-offset-background cursor-pointer transition-all duration-200 data-[placeholder]:text-muted-foreground/70 focus:outline-none focus:border-primary/30 focus:ring-[3px] focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/data-table-DMzzJx3j.js
function DataTableToolbar({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-wrap items-center gap-2.5 border-b border-border bg-card px-4 py-3", className),
		children
	});
}
function DataTablePagination({ page, limit, total, totalPages, onPageChange, onLimitChange, entityLabel = "items", isFetching }) {
	const from = total === 0 ? 0 : (page - 1) * limit + 1;
	const to = Math.min(page * limit, total);
	const pages = buildPageList(page, totalPages);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "flex flex-wrap items-center justify-between gap-4 border-t border-border bg-card px-4 py-3.5 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-[13px] text-muted-foreground",
			children: [
				"Showing ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular font-medium text-foreground",
					children: from
				}),
				" to",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular font-medium text-foreground",
					children: to
				}),
				" of",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular font-medium text-foreground",
					children: total
				}),
				" ",
				entityLabel,
				isFetching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-xs",
					children: "Refreshing…"
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3",
			children: [onLimitChange && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rows per page" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: String(limit),
					onValueChange: (v) => onLimitChange(Number(v)),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-9 w-[4.5rem] text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
						10,
						20,
						50
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: String(n),
						children: n
					}, n)) })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						className: "size-8 rounded-md",
						disabled: page <= 1,
						onClick: () => onPageChange(1),
						"aria-label": "First page",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						className: "size-8 rounded-md",
						disabled: page <= 1,
						onClick: () => onPageChange(page - 1),
						"aria-label": "Previous page",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
					}),
					pages.map((p, i) => p === "…" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-1 text-muted-foreground",
						children: "…"
					}, `ellipsis-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: p === page ? "default" : "ghost",
						size: "icon",
						className: cn("size-8 rounded-md text-xs font-semibold", p === page && "shadow-sm"),
						onClick: () => onPageChange(p),
						children: p
					}, p)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						className: "size-8 rounded-md",
						disabled: page >= totalPages,
						onClick: () => onPageChange(page + 1),
						"aria-label": "Next page",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						className: "size-8 rounded-md",
						disabled: page >= totalPages,
						onClick: () => onPageChange(totalPages),
						"aria-label": "Last page",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { className: "size-4" })
					})
				]
			})]
		})]
	});
}
function buildPageList(current, total) {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
	const pages = [1];
	if (current > 3) pages.push("…");
	for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
	if (current < total - 2) pages.push("…");
	pages.push(total);
	return pages;
}
function DataTableHead({ children, className, sortable = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5",
			children: [children, sortable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "size-3.5 opacity-40" }) : null]
		})
	});
}
function IdLinkCell({ id, to, params }) {
	if (!to) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-sm font-medium text-primary tabular-nums",
		children: id
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		params,
		className: "text-sm font-medium text-primary hover:underline tabular-nums",
		children: id
	});
}
function TeamAvatarStack({ members, extra = 0 }) {
	if (members.length === 0 && extra === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground",
		children: "—"
	});
	const visible = members.slice(0, 2);
	const overflow = extra > 0 ? extra : Math.max(0, members.length - visible.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex -space-x-2",
			children: [visible.map((member, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
				name: member.name,
				hue: member.hue ?? 200 + index * 40,
				size: 28
			}, `${member.name}-${index}`)), overflow > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "grid size-7 place-items-center rounded-full border-2 border-card bg-muted text-[10px] font-semibold text-muted-foreground",
				children: ["+", overflow]
			}) : null]
		})
	});
}
function PrimaryCell({ id, title, to, params }) {
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "truncate text-sm font-semibold text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 truncate text-xs text-muted-foreground tabular-nums",
			children: id
		})]
	});
	if (!to) return content;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		params,
		className: "block min-w-0 transition-opacity hover:opacity-80",
		children: content
	});
}
function EntityCell({ name, subtitle, hue = 265, showAvatar = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 items-center gap-3",
		children: [showAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
			name,
			hue,
			size: 40
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-xs font-semibold tracking-wide text-muted-foreground",
			children: initials(name)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-semibold text-foreground",
				children: name
			}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-xs text-muted-foreground",
				children: subtitle
			}) : null]
		})]
	});
}
var LABEL_COLORS = [
	"bg-violet-50 text-violet-700 ring-violet-100",
	"bg-sky-50 text-sky-700 ring-sky-100",
	"bg-emerald-50 text-emerald-700 ring-emerald-100",
	"bg-amber-50 text-amber-700 ring-amber-100",
	"bg-rose-50 text-rose-700 ring-rose-100",
	"bg-indigo-50 text-indigo-700 ring-indigo-100"
];
function LabelPill({ label }) {
	if (!label || label === "—") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground",
		children: "—"
	});
	const color = LABEL_COLORS[label.length % LABEL_COLORS.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset", color),
		children: label
	});
}
function ProgressCell({ value, tone = "primary" }) {
	const barColor = {
		primary: "bg-primary",
		success: "bg-emerald-500",
		warning: "bg-amber-500",
		violet: "bg-violet-500"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-[8.5rem] items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "tabular w-9 shrink-0 text-sm font-semibold text-foreground",
			children: [value, "%"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full rounded-full transition-all", barColor),
				style: { width: `${Math.min(100, Math.max(0, value))}%` }
			})
		})]
	});
}
function DateCell({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "whitespace-nowrap text-sm text-foreground",
		children: value
	});
}
function DataTableActions({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-end",
		children
	});
}
var actionButtonClassName = "size-8 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground";
function DataTableRowMenu({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			className: actionButtonClassName,
			"aria-label": "More actions",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		align: "end",
		className: "rounded-md",
		children
	})] });
}
function DataTableIconButton({ children, label, onClick, asChild }) {
	const className = actionButtonClassName;
	if (asChild) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		className,
		asChild: true,
		"aria-label": label,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		className,
		onClick,
		"aria-label": label,
		children
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CGWsqUGP.js
async function fetchAdminDashboard() {
	const { data } = await api.get("/dashboard/admin");
	return data.data;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/tickets-C4Zs1Yho.js
async function fetchTickets(params) {
	const { data } = await api.get("/tickets", { params });
	return data.data;
}
async function fetchTicketsPage(params) {
	const result = await fetchTickets({
		page: 1,
		limit: 20,
		...params
	});
	if (Array.isArray(result)) return {
		items: result,
		meta: {
			page: 1,
			limit: result.length,
			total: result.length,
			totalPages: 1
		}
	};
	return result;
}
async function fetchTicket(id) {
	const { data } = await api.get(`/tickets/${id}`);
	return data.data;
}
async function createTicket(payload) {
	const { data } = await api.post("/tickets", payload);
	return data.data;
}
async function updateTicket(id, payload) {
	const { data } = await api.patch(`/tickets/${id}`, payload);
	return data.data;
}
async function transitionTicket(id, payload) {
	const { data } = await api.post(`/tickets/${id}/transition`, payload);
	return data.data;
}
async function fetchTicketMessages(ticketId) {
	const { data } = await api.get(`/tickets/${ticketId}/messages`);
	return data.data;
}
async function postTicketMessage(ticketId, body, isInternal = false) {
	const { data } = await api.post(`/tickets/${ticketId}/messages`, {
		body,
		isInternal
	});
	return data.data;
}
async function fetchTicketEvents(ticketId) {
	const { data } = await api.get(`/tickets/${ticketId}/events`);
	return data.data;
}
async function fetchTicketActivities(ticketId) {
	const { data } = await api.get(`/tickets/${ticketId}/activities`);
	return data.data;
}
function mapSlaStatus(status) {
	switch (status) {
		case "Within SLA": return "On Track";
		case "Near Breach": return "Approaching";
		case "Breached": return "Breached";
		case "Met": return "Met";
		default: return "On Track";
	}
}
function getTicketSlaState(ticket) {
	if (ticket.status === "Resolved" || ticket.status === "Closed") return "Met";
	const slaStatus = ticket.sla?.resolutionSlaStatus ?? ticket.sla?.assignmentSlaStatus;
	if (slaStatus) return mapSlaStatus(slaStatus);
	if (!ticket.dueAt) return "On Track";
	const left = new Date(ticket.dueAt).getTime() - Date.now();
	if (left < 0) return "Breached";
	if (left < 144e5) return "Approaching";
	return "On Track";
}
function getTicketSlaDueAt(ticket) {
	return ticket.sla?.resolutionSlaDueAt ?? ticket.sla?.assignmentSlaDueAt ?? ticket.dueAt ?? null;
}
function getTicketProjectLabel(ticket) {
	if (!ticket.projectId) return "—";
	if (typeof ticket.projectId === "string") return ticket.projectId;
	return ticket.projectId.name ?? ticket.projectId.projectId ?? "—";
}
function getTicketCategoryLabel(ticket) {
	if (typeof ticket.categoryId === "string") return ticket.categoryId;
	return ticket.categoryId.name ?? "—";
}
function getTicketUserLabel(user) {
	if (!user) return "—";
	if (typeof user === "string") return user;
	return fullName(user);
}
function getTicketUserId(user) {
	if (!user) return null;
	return typeof user === "string" ? user : user._id;
}
function activityDescription(activity) {
	if (activity.action === "Status Changed" && activity.newValue?.status) return `Status changed to ${String(activity.newValue.status)}`;
	if (activity.action === "Priority Changed" && activity.newValue?.priority) return `Priority changed to ${String(activity.newValue.priority)}`;
	return activity.action;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-B2W8Gmeh.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-DTh4w-09.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-surface group-[.toaster]:text-foreground group-[.toaster]:border-border/60 group-[.toaster]:shadow-raised group-[.toaster]:rounded-xl",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$44 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Helpdesk — Enterprise Support Ticket Platform" },
			{
				name: "description",
				content: "Enterprise support ticket management for clients and support teams: SLA tracking, assignments, reports and audit logs."
			},
			{
				property: "og:title",
				content: "Helpdesk — Enterprise Support Ticket Platform"
			},
			{
				property: "og:description",
				content: "Raise, triage and resolve support tickets with SLA tracking and role-based access."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$44.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-right",
			richColors: true
		})] })
	});
}
var $$splitComponentImporter$42 = () => import("./routes-D1p-ikha.mjs");
var Route$43 = createFileRoute("/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Sign in — Helpdesk Support Portal" },
		{
			name: "description",
			content: "Sign in to the Helpdesk support portal to raise and manage support tickets."
		},
		{
			property: "og:title",
			content: "Sign in — Helpdesk Support Portal"
		},
		{
			property: "og:description",
			content: "Secure sign-in for clients, support agents and administrators."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$42, "component")
});
var $$splitComponentImporter$41 = () => import("./activate-B6zA48uY.mjs");
var Route$42 = createFileRoute("/activate")({
	ssr: false,
	validateSearch: (search) => ({ token: typeof search.token === "string" ? search.token : "" }),
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var $$splitComponentImporter$40 = () => import("./change-password-BDB1WNGs.mjs");
var Route$41 = createFileRoute("/change-password")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var $$splitComponentImporter$39 = () => import("./forgot-password-CbY0USmj.mjs");
var Route$40 = createFileRoute("/forgot-password")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Forgot password — Helpdesk Support Portal" },
		{
			name: "description",
			content: "Request a secure password reset link for your Helpdesk support account."
		},
		{
			property: "og:title",
			content: "Forgot password — Helpdesk"
		},
		{
			property: "og:description",
			content: "Request a secure password reset link for your support account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var $$splitComponentImporter$38 = () => import("./help-cRZ_UJdf.mjs");
var Route$39 = createFileRoute("/help")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Help & Support — Helpdesk" },
		{
			name: "description",
			content: "Guidance on raising tickets, SLA targets and account security in Helpdesk."
		},
		{
			property: "og:title",
			content: "Help & Support — Helpdesk"
		},
		{
			property: "og:description",
			content: "Guidance on tickets, SLA targets and account security."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./profile-DuRPpT5Q.mjs");
var Route$38 = createFileRoute("/profile")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Profile & Settings — Helpdesk" },
		{
			name: "description",
			content: "Update your details, change your password and manage notification preferences."
		},
		{
			property: "og:title",
			content: "Profile & Settings — Helpdesk"
		},
		{
			property: "og:description",
			content: "Update details, password and notification preferences."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./reset-password-O4sVRZAf.mjs");
var Route$37 = createFileRoute("/reset-password")({
	ssr: false,
	validateSearch: (search) => ({ token: typeof search.token === "string" ? search.token : "" }),
	head: () => ({ meta: [
		{ title: "Reset password — Helpdesk Support Portal" },
		{
			name: "description",
			content: "Choose a new password for your Helpdesk support account."
		},
		{
			property: "og:title",
			content: "Reset password — Helpdesk"
		},
		{
			property: "og:description",
			content: "Choose a new password for your Helpdesk support account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./unauthorized-IR5v40RA.mjs");
var Route$36 = createFileRoute("/unauthorized")({
	ssr: false,
	head: () => ({ meta: [{ title: "Unauthorized — Helpdesk" }] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./admin.index-CyAOde_a.mjs");
var Route$35 = createFileRoute("/admin/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Support Dashboard — Helpdesk Admin" },
		{
			name: "description",
			content: "Live overview of ticket volume, SLA health, workload and resolution performance."
		},
		{
			property: "og:title",
			content: "Support Dashboard — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Live overview of ticket volume, SLA health and resolution performance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
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
					tone: "teal",
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
					tone: "lime",
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
var $$splitComponentImporter$33 = () => import("./admin.audit-a61N1Zxm.mjs");
var Route$34 = createFileRoute("/admin/audit")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Audit Logs — Helpdesk Admin" },
		{
			name: "description",
			content: "Immutable record of logins, ticket changes, assignments and account administration."
		},
		{
			property: "og:title",
			content: "Audit Logs — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Record of logins, ticket changes and account administration."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./admin.clients-Byt2Gbaj.mjs");
var Route$33 = createFileRoute("/admin/clients")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Client Management — Helpdesk Admin" },
		{
			name: "description",
			content: "Manage client accounts, activation status and their full support ticket history."
		},
		{
			property: "og:title",
			content: "Client Management — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Manage client accounts, status and ticket history."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./admin.dashboard-CJdJxwa1.mjs");
var Route$32 = createFileRoute("/admin/dashboard")({
	ssr: false,
	head: () => ({ meta: [{ title: "Admin Dashboard — Helpdesk" }] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./admin.notifications-BceN_4-H.mjs");
var Route$31 = createFileRoute("/admin/notifications")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Notifications — Helpdesk Admin" },
		{
			name: "description",
			content: "New tickets, client replies, escalations and SLA alerts for the support team."
		},
		{
			property: "og:title",
			content: "Notifications — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "New tickets, replies, escalations and SLA alerts."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./admin.reports-CCg1OmHP.mjs");
var Route$30 = createFileRoute("/admin/reports")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Reports & Analytics — Helpdesk Admin" },
		{
			name: "description",
			content: "Ticket volume, response and resolution times, SLA breaches and workload reports."
		},
		{
			property: "og:title",
			content: "Reports & Analytics — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Volume, response times, SLA breaches and workload reporting."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./admin.settings-CovdNN31.mjs");
var Route$29 = createFileRoute("/admin/settings")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Settings — Helpdesk Admin" },
		{
			name: "description",
			content: "Configure company details, ticket defaults, categories, SLA targets and notifications."
		},
		{
			property: "og:title",
			content: "Settings — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Company details, ticket defaults, categories and SLA targets."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./admin.team-DG_CaXyH.mjs");
var Route$28 = createFileRoute("/admin/team")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Support Team — Helpdesk Admin" },
		{
			name: "description",
			content: "Manage support agents, roles, workload and resolution performance."
		},
		{
			property: "og:title",
			content: "Support Team — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Manage support agents, roles, workload and performance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./client.dashboard-6WBsRn2D.mjs");
var Route$27 = createFileRoute("/client/dashboard")({
	ssr: false,
	head: () => ({ meta: [{ title: "Client Dashboard — Helpdesk" }] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./portal.index-BFdRJRgg.mjs");
var Route$26 = createFileRoute("/portal/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "My Support Dashboard — Helpdesk" },
		{
			name: "description",
			content: "Track your open support tickets, replies awaiting you and recent resolutions."
		},
		{
			property: "og:title",
			content: "My Support Dashboard — Helpdesk"
		},
		{
			property: "og:description",
			content: "Track your open tickets, replies and recent resolutions."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
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
var $$splitComponentImporter$24 = () => import("./portal.notifications-DIdFiIxH.mjs");
var Route$25 = createFileRoute("/portal/notifications")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Notifications — Helpdesk" },
		{
			name: "description",
			content: "Replies, status changes and resolution alerts for your support tickets."
		},
		{
			property: "og:title",
			content: "Notifications — Helpdesk"
		},
		{
			property: "og:description",
			content: "Replies, status changes and resolution alerts."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./staff.dashboard-CGvAPlrU.mjs");
var Route$24 = createFileRoute("/staff/dashboard")({
	ssr: false,
	head: () => ({ meta: [{ title: "Staff Dashboard — Helpdesk" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./admin.customers.index-DqtHpeXG.mjs");
var Route$23 = createFileRoute("/admin/customers/")({
	ssr: false,
	head: () => ({ meta: [{ title: "Customers — Helpdesk Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./admin.customers._customerId-xakL9oKB.mjs");
var Route$22 = createFileRoute("/admin/customers/$customerId")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./admin.customers.new-D0e9kz8-.mjs");
var Route$21 = createFileRoute("/admin/customers/new")({
	ssr: false,
	head: () => ({ meta: [{ title: "New Customer — Helpdesk Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./admin.projects.index-YMtgEyCw.mjs");
var Route$20 = createFileRoute("/admin/projects/")({
	ssr: false,
	validateSearch: (search) => ({
		page: typeof search["page"] === "number" ? search["page"] : Number(search["page"]) || void 0,
		status: typeof search["status"] === "string" ? search["status"] : void 0,
		sort: typeof search["sort"] === "string" ? search["sort"] : void 0,
		q: typeof search["q"] === "string" ? search["q"] : void 0
	}),
	head: () => ({ meta: [{ title: "Projects — Helpdesk Admin" }, {
		name: "description",
		content: "Browse and manage customer projects with progress, status and deadlines."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./admin.projects._projectId-BbrzYGgl.mjs");
var Route$19 = createFileRoute("/admin/projects/$projectId")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./admin.projects.new-PjvcPR6E.mjs");
var Route$18 = createFileRoute("/admin/projects/new")({
	ssr: false,
	head: () => ({ meta: [{ title: "New Project — Helpdesk Admin" }, {
		name: "description",
		content: "Create a new customer project with dates, hours and status."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./admin.tickets.index-BAaghbq0.mjs");
var Route$17 = createFileRoute("/admin/tickets/")({
	ssr: false,
	validateSearch: (search) => ({
		status: typeof search["status"] === "string" ? search["status"] : void 0,
		priority: typeof search["priority"] === "string" ? search["priority"] : void 0,
		sla: typeof search["sla"] === "string" ? search["sla"] : void 0,
		client: typeof search["client"] === "string" ? search["client"] : void 0,
		agent: typeof search["agent"] === "string" ? search["agent"] : void 0,
		projectId: typeof search["projectId"] === "string" ? search["projectId"] : void 0
	}),
	head: () => ({ meta: [{ title: "Ticket Management — Helpdesk Admin" }, {
		name: "description",
		content: "Filter, sort, assign and triage every support ticket across all clients."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./admin.tickets._ticketId-B7V4VvRe.mjs");
var Route$16 = createFileRoute("/admin/tickets/$ticketId")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Ticket workspace — Helpdesk Admin" },
		{
			name: "description",
			content: "Full ticket workspace with conversation, internal notes, SLA tracking and assignment."
		},
		{
			property: "og:title",
			content: "Ticket workspace — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Conversation, internal notes, SLA tracking and assignment in one view."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./admin.tickets.new-C1p-Kdx6.mjs");
var Route$15 = createFileRoute("/admin/tickets/new")({
	ssr: false,
	validateSearch: (search) => ({ projectId: typeof search["projectId"] === "string" ? search["projectId"] : void 0 }),
	head: () => ({ meta: [{ title: "Create Ticket — Helpdesk Admin" }, {
		name: "description",
		content: "Create a support ticket for any accessible project."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./admin.users.index-Bbsd0LuC.mjs");
var Route$14 = createFileRoute("/admin/users/")({
	ssr: false,
	head: () => ({ meta: [{ title: "Users — Helpdesk Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./admin.users._userId-hcdhYiZ-.mjs");
var Route$13 = createFileRoute("/admin/users/$userId")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin.users.new-CpFWWGmZ.mjs");
var Route$12 = createFileRoute("/admin/users/new")({
	ssr: false,
	head: () => ({ meta: [{ title: "New User — Helpdesk Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./portal.projects.index-HsnwmQM8.mjs");
var Route$11 = createFileRoute("/portal/projects/")({
	ssr: false,
	head: () => ({ meta: [{ title: "My Projects — Helpdesk" }, {
		name: "description",
		content: "View projects associated with your organization."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./portal.projects._projectId-Ovl_g_p0.mjs");
var Route$10 = createFileRoute("/portal/projects/$projectId")({
	ssr: false,
	head: () => ({ meta: [{ title: "Project Details — Helpdesk" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./portal.tickets.index-jzwOh5Pc.mjs");
var Route$9 = createFileRoute("/portal/tickets/")({
	ssr: false,
	head: () => ({ meta: [{ title: "My Tickets — Helpdesk" }, {
		name: "description",
		content: "Browse, search and filter every support ticket you have submitted."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./portal.tickets._ticketId-BuVyjyuI.mjs");
var Route$8 = createFileRoute("/portal/tickets/$ticketId")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Ticket Details — Helpdesk" },
		{
			name: "description",
			content: "Follow the conversation, status and SLA timeline for your support ticket."
		},
		{
			property: "og:title",
			content: "Ticket Details — Helpdesk"
		},
		{
			property: "og:description",
			content: "Conversation, status and SLA timeline for your ticket."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./portal.tickets.new-DaUYZ57J.mjs");
var Route$7 = createFileRoute("/portal/tickets/new")({
	ssr: false,
	validateSearch: (search) => ({ projectId: typeof search["projectId"] === "string" ? search["projectId"] : void 0 }),
	head: () => ({ meta: [{ title: "Create Ticket — Helpdesk" }, {
		name: "description",
		content: "Submit a new support request with project, category, priority and attachments."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.customers._customerId.index-B0PvRFzn.mjs");
var Route$6 = createFileRoute("/admin/customers/$customerId/")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.customers._customerId.edit-CjcariCL.mjs");
var Route$5 = createFileRoute("/admin/customers/$customerId/edit")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.projects._projectId.index-vxG_U_Eb.mjs");
var Route$4 = createFileRoute("/admin/projects/$projectId/")({
	ssr: false,
	head: () => ({ meta: [{ title: "Project Overview — Helpdesk Admin" }, {
		name: "description",
		content: "Project overview with stats, team members and activity timeline."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.projects._projectId.edit-CWtDWZbu.mjs");
var Route$3 = createFileRoute("/admin/projects/$projectId/edit")({
	ssr: false,
	head: () => ({ meta: [{ title: "Edit Project — Helpdesk Admin" }, {
		name: "description",
		content: "Update project details, schedule, hours and status."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var Route$2 = createFileRoute("/admin/projects/$projectId/members")({ beforeLoad: ({ params }) => {
	throw redirect({
		to: "/admin/projects/$projectId",
		params: { projectId: params.projectId }
	});
} });
var $$splitComponentImporter$1 = () => import("./admin.users._userId.index-CQUqbPpo.mjs");
var Route$1 = createFileRoute("/admin/users/$userId/")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.users._userId.edit-BOlU_xY1.mjs");
var Route = createFileRoute("/admin/users/$userId/edit")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$43.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$44
});
var ActivateRoute = Route$42.update({
	id: "/activate",
	path: "/activate",
	getParentRoute: () => Route$44
});
var ChangePasswordRoute = Route$41.update({
	id: "/change-password",
	path: "/change-password",
	getParentRoute: () => Route$44
});
var ForgotPasswordRoute = Route$40.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$44
});
var HelpRoute = Route$39.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => Route$44
});
var ProfileRoute = Route$38.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$44
});
var ResetPasswordRoute = Route$37.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$44
});
var UnauthorizedRoute = Route$36.update({
	id: "/unauthorized",
	path: "/unauthorized",
	getParentRoute: () => Route$44
});
var AdminIndexRoute = Route$35.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$44
});
var AdminAuditRoute = Route$34.update({
	id: "/admin/audit",
	path: "/admin/audit",
	getParentRoute: () => Route$44
});
var AdminClientsRoute = Route$33.update({
	id: "/admin/clients",
	path: "/admin/clients",
	getParentRoute: () => Route$44
});
var AdminDashboardRoute = Route$32.update({
	id: "/admin/dashboard",
	path: "/admin/dashboard",
	getParentRoute: () => Route$44
});
var AdminNotificationsRoute = Route$31.update({
	id: "/admin/notifications",
	path: "/admin/notifications",
	getParentRoute: () => Route$44
});
var AdminReportsRoute = Route$30.update({
	id: "/admin/reports",
	path: "/admin/reports",
	getParentRoute: () => Route$44
});
var AdminSettingsRoute = Route$29.update({
	id: "/admin/settings",
	path: "/admin/settings",
	getParentRoute: () => Route$44
});
var AdminTeamRoute = Route$28.update({
	id: "/admin/team",
	path: "/admin/team",
	getParentRoute: () => Route$44
});
var ClientDashboardRoute = Route$27.update({
	id: "/client/dashboard",
	path: "/client/dashboard",
	getParentRoute: () => Route$44
});
var PortalIndexRoute = Route$26.update({
	id: "/portal/",
	path: "/portal/",
	getParentRoute: () => Route$44
});
var PortalNotificationsRoute = Route$25.update({
	id: "/portal/notifications",
	path: "/portal/notifications",
	getParentRoute: () => Route$44
});
var StaffDashboardRoute = Route$24.update({
	id: "/staff/dashboard",
	path: "/staff/dashboard",
	getParentRoute: () => Route$44
});
var AdminCustomersIndexRoute = Route$23.update({
	id: "/admin/customers/",
	path: "/admin/customers/",
	getParentRoute: () => Route$44
});
var AdminCustomersCustomerIdRoute = Route$22.update({
	id: "/admin/customers/$customerId",
	path: "/admin/customers/$customerId",
	getParentRoute: () => Route$44
});
var AdminCustomersNewRoute = Route$21.update({
	id: "/admin/customers/new",
	path: "/admin/customers/new",
	getParentRoute: () => Route$44
});
var AdminProjectsIndexRoute = Route$20.update({
	id: "/admin/projects/",
	path: "/admin/projects/",
	getParentRoute: () => Route$44
});
var AdminProjectsProjectIdRoute = Route$19.update({
	id: "/admin/projects/$projectId",
	path: "/admin/projects/$projectId",
	getParentRoute: () => Route$44
});
var AdminProjectsNewRoute = Route$18.update({
	id: "/admin/projects/new",
	path: "/admin/projects/new",
	getParentRoute: () => Route$44
});
var AdminTicketsIndexRoute = Route$17.update({
	id: "/admin/tickets/",
	path: "/admin/tickets/",
	getParentRoute: () => Route$44
});
var AdminTicketsTicketIdRoute = Route$16.update({
	id: "/admin/tickets/$ticketId",
	path: "/admin/tickets/$ticketId",
	getParentRoute: () => Route$44
});
var AdminTicketsNewRoute = Route$15.update({
	id: "/admin/tickets/new",
	path: "/admin/tickets/new",
	getParentRoute: () => Route$44
});
var AdminUsersIndexRoute = Route$14.update({
	id: "/admin/users/",
	path: "/admin/users/",
	getParentRoute: () => Route$44
});
var AdminUsersUserIdRoute = Route$13.update({
	id: "/admin/users/$userId",
	path: "/admin/users/$userId",
	getParentRoute: () => Route$44
});
var AdminUsersNewRoute = Route$12.update({
	id: "/admin/users/new",
	path: "/admin/users/new",
	getParentRoute: () => Route$44
});
var PortalProjectsIndexRoute = Route$11.update({
	id: "/portal/projects/",
	path: "/portal/projects/",
	getParentRoute: () => Route$44
});
var PortalProjectsProjectIdRoute = Route$10.update({
	id: "/portal/projects/$projectId",
	path: "/portal/projects/$projectId",
	getParentRoute: () => Route$44
});
var PortalTicketsIndexRoute = Route$9.update({
	id: "/portal/tickets/",
	path: "/portal/tickets/",
	getParentRoute: () => Route$44
});
var PortalTicketsTicketIdRoute = Route$8.update({
	id: "/portal/tickets/$ticketId",
	path: "/portal/tickets/$ticketId",
	getParentRoute: () => Route$44
});
var PortalTicketsNewRoute = Route$7.update({
	id: "/portal/tickets/new",
	path: "/portal/tickets/new",
	getParentRoute: () => Route$44
});
var AdminCustomersCustomerIdIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminCustomersCustomerIdRoute
});
var AdminCustomersCustomerIdEditRoute = Route$5.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => AdminCustomersCustomerIdRoute
});
var AdminProjectsProjectIdIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminProjectsProjectIdRoute
});
var AdminProjectsProjectIdEditRoute = Route$3.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => AdminProjectsProjectIdRoute
});
var AdminProjectsProjectIdMembersRoute = Route$2.update({
	id: "/members",
	path: "/members",
	getParentRoute: () => AdminProjectsProjectIdRoute
});
var AdminUsersUserIdIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminUsersUserIdRoute
});
var AdminUsersUserIdEditRoute = Route.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => AdminUsersUserIdRoute
});
var AdminCustomersCustomerIdRouteChildren = {
	AdminCustomersCustomerIdEditRoute,
	AdminCustomersCustomerIdIndexRoute
};
var AdminCustomersCustomerIdRouteWithChildren = AdminCustomersCustomerIdRoute._addFileChildren(AdminCustomersCustomerIdRouteChildren);
var AdminProjectsProjectIdRouteChildren = {
	AdminProjectsProjectIdEditRoute,
	AdminProjectsProjectIdMembersRoute,
	AdminProjectsProjectIdIndexRoute
};
var AdminProjectsProjectIdRouteWithChildren = AdminProjectsProjectIdRoute._addFileChildren(AdminProjectsProjectIdRouteChildren);
var AdminUsersUserIdRouteChildren = {
	AdminUsersUserIdEditRoute,
	AdminUsersUserIdIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	ActivateRoute,
	ChangePasswordRoute,
	ForgotPasswordRoute,
	HelpRoute,
	ProfileRoute,
	ResetPasswordRoute,
	UnauthorizedRoute,
	AdminAuditRoute,
	AdminClientsRoute,
	AdminDashboardRoute,
	AdminNotificationsRoute,
	AdminReportsRoute,
	AdminSettingsRoute,
	AdminTeamRoute,
	ClientDashboardRoute,
	PortalNotificationsRoute,
	StaffDashboardRoute,
	AdminIndexRoute,
	PortalIndexRoute,
	AdminCustomersCustomerIdRoute: AdminCustomersCustomerIdRouteWithChildren,
	AdminCustomersNewRoute,
	AdminProjectsProjectIdRoute: AdminProjectsProjectIdRouteWithChildren,
	AdminProjectsNewRoute,
	AdminTicketsTicketIdRoute,
	AdminTicketsNewRoute,
	AdminUsersUserIdRoute: AdminUsersUserIdRoute._addFileChildren(AdminUsersUserIdRouteChildren),
	AdminUsersNewRoute,
	PortalProjectsProjectIdRoute,
	PortalTicketsTicketIdRoute,
	PortalTicketsNewRoute,
	AdminCustomersIndexRoute,
	AdminProjectsIndexRoute,
	AdminTicketsIndexRoute,
	AdminUsersIndexRoute,
	PortalProjectsIndexRoute,
	PortalTicketsIndexRoute
};
var routeTree = Route$44._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Table as $, getTicketUserLabel as A, DataTableToolbar as B, fetchTickets as C, getTicketSlaDueAt as D, getTicketProjectLabel as E, DataTableActions as F, PrimaryCell as G, EntityCell as H, DataTableHead as I, Select as J, ProgressCell as K, DataTableIconButton as L, transitionTicket as M, updateTicket as N, getTicketSlaState as O, fetchAdminDashboard as P, SelectValue as Q, DataTablePagination as R, fetchTicketMessages as S, getTicketCategoryLabel as T, IdLinkCell as U, DateCell as V, LabelPill as W, SelectItem as X, SelectContent as Y, SelectTrigger as Z, activityDescription as _, Route$4 as a, activateAccount as at, fetchTicketActivities as b, Route$7 as c, fetchCustomerContacts as ct, Route$15 as d, fetchCustomerTickets as dt, TableBody as et, Route$16 as f, fetchCustomers as ft, Route$42 as g, updateCustomerStatus as gt, AdminDashboard as h, updateCustomer as ht, Route$3 as i, TableRow as it, postTicketMessage as j, getTicketUserId as k, Route$8 as l, fetchCustomerOverview as lt, PortalHome as m, resendCustomerInvitation as mt, Route as n, TableHead as nt, Route$5 as o, createCustomer as ot, Route$17 as p, fetchPortalDashboard as pt, TeamAvatarStack as q, Route$1 as r, TableHeader as rt, Route$6 as s, fetchCustomer as st, router_exports as t, TableCell as tt, Route$10 as u, fetchCustomerProjects as ut, createTicket as v, fetchTicketsPage as w, fetchTicketEvents as x, fetchTicket as y, DataTableRowMenu as z };
