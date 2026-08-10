import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, n as Button } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Search, et as ChevronRight, g as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { G as SelectItem, K as SelectTrigger, U as Select, W as SelectContent, q as SelectValue } from "./router-DLFu5c1a.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { t as Label } from "./label-BZKlnMd2.mjs";
import { b as PopoverContent, x as PopoverTrigger, y as Popover } from "./guard-Da2hUi3G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listing-page-DNRqAcLr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ListingBreadcrumbs({ items }) {
	if (items.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Breadcrumb",
		className: "mb-1 flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground",
		children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [index > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
			className: "size-3.5 shrink-0 opacity-40",
			"aria-hidden": true
		}) : null, item.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: item.to,
			className: "transition-colors hover:text-foreground",
			children: item.label
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground/80",
			children: item.label
		})] }, `${item.label}-${index}`))
	});
}
function ListingPageHeader({ title, description, breadcrumbs, exportAction, addAction, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-wrap items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				breadcrumbs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingBreadcrumbs, { items: breadcrumbs }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight text-foreground",
					children: title
				}),
				description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: description
				}) : null
			]
		}), exportAction || addAction || actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 flex-wrap items-center gap-2",
			children: [
				exportAction,
				addAction,
				actions
			]
		}) : null]
	});
}
function ListingPage({ header, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-4", className),
		children: [header, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			className: "overflow-hidden",
			children
		})]
	});
}
function ListingSearchRow({ value, onChange, placeholder = "Search…", filterOpen, onFilterOpenChange, activeFilterCount = 0, onFilterApply, onFilterClear, filterContent, filterTitle = "Filters", showFilters = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5 border-b border-border/60 px-4 py-3 sm:px-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value,
				onChange: (event) => onChange(event.target.value),
				placeholder,
				className: "h-10 rounded-xl border-border/60 bg-surface pl-10"
			})]
		}), showFilters && filterContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
			open: filterOpen,
			onOpenChange: onFilterOpenChange,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "icon",
					className: "relative size-10 shrink-0 rounded-xl",
					"aria-label": "Open filters",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }), activeFilterCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground",
						children: activeFilterCount
					}) : null]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
				align: "end",
				className: "w-[min(100vw-2rem,22rem)] rounded-xl p-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b px-4 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-foreground",
							children: filterTitle
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[min(70vh,24rem)] space-y-4 overflow-y-auto p-4",
						children: filterContent
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 border-t p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "flex-1 rounded-xl",
							onClick: onFilterClear,
							children: "Clear"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							className: "flex-1 rounded-xl",
							onClick: onFilterApply,
							children: "Apply"
						})]
					})
				]
			})]
		}) : null]
	});
}
function ListingFilterField({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
			children: label
		}), children]
	});
}
function ListingFilterSelect({ value, onChange, placeholder, options, allLabel = "All", allValue = "all" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: onChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
			className: "h-10 w-full rounded-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: allValue,
			children: allLabel
		}), options.map(([optionValue, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: optionValue,
			children: label
		}, optionValue))] })]
	});
}
function useListingFilters(defaults, initial) {
	const initialApplied = {
		...defaults,
		...initial
	};
	const [applied, setApplied] = (0, import_react.useState)(initialApplied);
	const [draft, setDraft] = (0, import_react.useState)(initialApplied);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open) setDraft(applied);
	}, [open, applied]);
	const apply = () => {
		setApplied(draft);
		setOpen(false);
	};
	const clear = () => {
		setDraft(defaults);
		setApplied(defaults);
		setOpen(false);
	};
	const activeCount = Object.keys(defaults).filter((key) => applied[key] !== defaults[key]).length;
	const patchDraft = (patch) => setDraft((current) => ({
		...current,
		...patch
	}));
	return {
		applied,
		setApplied,
		draft,
		setDraft,
		patchDraft,
		apply,
		clear,
		open,
		setOpen,
		activeCount
	};
}
//#endregion
export { ListingSearchRow as a, ListingPageHeader as i, ListingFilterSelect as n, useListingFilters as o, ListingPage as r, ListingFilterField as t };
