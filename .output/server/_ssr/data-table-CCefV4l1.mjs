import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, n as Button } from "./button-vnqCGuCs.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { at as ChevronUp, ct as ChevronDown, it as ChevronsLeft, lt as Check, nt as ChevronsUpDown, ot as ChevronRight, q as Ellipsis, rt as ChevronsRight, st as ChevronLeft } from "../_libs/lucide-react.mjs";
import { h as UserAvatar, v as initials } from "./primitives-BAq0jd4Y.mjs";
import { n as DropdownMenuContent, o as DropdownMenuTrigger, t as DropdownMenu } from "./store-C1539MgZ.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/select-ZLUb5Kns.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-surface px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer transition-all duration-150 data-[placeholder]:text-muted-foreground/70 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
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
//#region node_modules/.nitro/vite/services/ssr/assets/table-tt144Emh.js
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
	className: cn("border-b border-border bg-muted/30 [&_tr]:border-0", className),
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
	className: cn("h-[52px] border-b border-border/60 transition-colors duration-150 hover:bg-muted/30 data-[state=selected]:bg-primary/5", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-4 text-left align-middle text-table-header text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("px-4 py-3 align-middle text-sm text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
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
//#region node_modules/.nitro/vite/services/ssr/assets/data-table-CCefV4l1.js
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
var LABEL_VARIANTS = [
	"bg-primary/10 text-primary ring-primary/15",
	"bg-info/10 text-info ring-info/15",
	"bg-success/10 text-success ring-success/15",
	"bg-warning/10 text-warning ring-warning/15",
	"bg-destructive/10 text-destructive ring-destructive/15"
];
function LabelPill({ label }) {
	if (!label || label === "—") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground",
		children: "—"
	});
	const color = LABEL_VARIANTS[label.length % LABEL_VARIANTS.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset", color),
		children: label
	});
}
function ProgressCell({ value, tone = "primary" }) {
	const barColor = {
		primary: "bg-primary",
		success: "bg-success",
		warning: "bg-warning",
		info: "bg-info"
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
export { SelectTrigger as C, SelectItem as S, TableHead as _, DataTableRowMenu as a, Select as b, EntityCell as c, PrimaryCell as d, ProgressCell as f, TableCell as g, TableBody as h, DataTablePagination as i, IdLinkCell as l, Table as m, DataTableHead as n, DataTableToolbar as o, TeamAvatarStack as p, DataTableIconButton as r, DateCell as s, DataTableActions as t, LabelPill as u, TableHeader as v, SelectValue as w, SelectContent as x, TableRow as y };
