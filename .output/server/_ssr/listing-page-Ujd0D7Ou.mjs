import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, n as Button } from "./button-DTh0UNAt.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Search, ct as ChevronRight, g as SlidersHorizontal, l as Upload } from "../_libs/lucide-react.mjs";
import { d as SectionCard } from "./primitives-CPmujTLD.mjs";
import { J as Select, Q as SelectValue, X as SelectItem, Y as SelectContent, Z as SelectTrigger } from "./router-DyQZnl_T.mjs";
import { t as Label } from "./label-cyeiyrNV.mjs";
import { t as Input } from "./input-DantDJEY.mjs";
import { _ as PopoverTrigger, g as PopoverContent, h as Popover } from "./guard-BCYPieem.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listing-page-Ujd0D7Ou.js
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
function ListingPage({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		className: cn("overflow-hidden", className),
		children
	});
}
function ListingCardHeader({ title, description, breadcrumbs, value, onChange, placeholder = "Search…", filterOpen, onFilterOpenChange, activeFilterCount = 0, onFilterApply, onFilterClear, filterContent, filterTitle = "Filters", showFilters = true, onExport, exportLabel = "Export", primaryAction, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap items-center gap-3 border-b border-border/60 bg-card px-4 py-3", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-[7.5rem] shrink-0",
				children: [
					breadcrumbs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingBreadcrumbs, { items: breadcrumbs }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-section-title text-foreground",
						children: title
					}),
					description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-body-sm text-subtle",
						children: description
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-[10rem] flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value,
					onChange: (event) => onChange(event.target.value),
					placeholder,
					className: "h-9 pl-9"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingToolbarActions, {
				filterOpen,
				onFilterOpenChange,
				activeFilterCount,
				onFilterApply,
				onFilterClear,
				filterContent,
				filterTitle,
				showFilters,
				onExport,
				exportLabel,
				primaryAction
			})
		]
	});
}
function ListingToolbarActions({ filterOpen, onFilterOpenChange, activeFilterCount = 0, onFilterApply, onFilterClear, filterContent, filterTitle = "Filters", showFilters = true, onExport, exportLabel = "Export", primaryAction }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex shrink-0 flex-wrap items-center gap-2",
		children: [
			showFilters && filterContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
				open: filterOpen,
				onOpenChange: onFilterOpenChange,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }),
							"Filters",
							activeFilterCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground",
								children: activeFilterCount
							}) : null
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
					align: "end",
					className: "w-[min(100vw-2rem,22rem)] p-0",
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
								className: "flex-1",
								onClick: onFilterClear,
								children: "Clear"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								className: "flex-1",
								onClick: onFilterApply,
								children: "Apply"
							})]
						})
					]
				})]
			}) : null,
			onExport ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: onExport,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), exportLabel]
			}) : null,
			primaryAction
		]
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
			className: "h-9 w-full",
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
export { useListingFilters as a, ListingPage as i, ListingFilterField as n, ListingFilterSelect as r, ListingCardHeader as t };
