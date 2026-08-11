import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn } from "./button-vnqCGuCs.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tabs-CnsCxU5q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var tabsListVariants = cva("", {
	variants: { variant: {
		panel: "flex h-auto w-full items-stretch overflow-x-auto rounded-md border border-border bg-card p-0 text-muted-foreground",
		compact: "inline-flex h-9 w-auto items-center gap-1 rounded-md border border-border bg-muted/40 p-1 text-muted-foreground"
	} },
	defaultVariants: { variant: "panel" }
});
var TabsList = import_react.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn(tabsListVariants({ variant }), className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsPanelTrigger = import_react.forwardRef(({ className, icon, title, description, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger, {
	ref,
	className: cn("group flex min-w-[9.5rem] flex-1 items-start gap-3 border-r border-border/60 px-4 py-3.5 text-left transition-colors duration-150 last:border-r-0", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "data-[state=active]:border-y-2 data-[state=active]:border-y-primary data-[state=active]:bg-primary-soft data-[state=active]:text-primary", "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mt-0.5 shrink-0 text-muted-foreground group-data-[state=active]:text-primary [&_svg]:size-5",
		children: icon
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm font-semibold leading-tight text-foreground group-data-[state=active]:text-primary",
			children: title
		}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-xs leading-snug text-muted-foreground group-data-[state=active]:text-primary/75",
			children: description
		}) : null]
	})]
}));
TabsPanelTrigger.displayName = "TabsPanelTrigger";
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
//#endregion
export { TabsTrigger as a, TabsPanelTrigger as i, TabsContent as n, TabsList as r, Tabs as t };
