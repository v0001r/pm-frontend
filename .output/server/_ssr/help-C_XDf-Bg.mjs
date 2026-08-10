import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime, a as Trigger2, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn } from "./button-DTh0UNAt.mjs";
import { dt as ChevronDown } from "../_libs/lucide-react.mjs";
import { a as PageHeader, d as SectionCard } from "./primitives-CPmujTLD.mjs";
import { y as RequireRole } from "./guard-BUVsJOD-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/help-C_XDf-Bg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var faqs = [
	["How do I raise a support ticket?", "Open Create Ticket, describe the issue, choose a category and priority, attach any evidence and submit. You'll receive a unique ticket number such as TKT-2026-000125."],
	["What do the SLA states mean?", "On Track means the resolution deadline is comfortably ahead, Approaching means under four hours remain and Breached means the deadline has passed."],
	["Who can see internal notes?", "Internal notes are visible only to support agents and administrators. Clients never see them in the ticket conversation."],
	["How do I reopen a resolved ticket?", "Open the ticket and choose Reopen. The ticket returns to Open and the assigned agent is notified."],
	["How do I change my password?", "Go to Profile → Security → Change Password. You'll need your current password and a new password meeting all listed requirements."]
];
function HelpPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Help & Support",
			description: "Answers to the most common questions about the support portal."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
			type: "single",
			collapsible: true,
			className: "px-4",
			children: faqs.map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
				value: q,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
					className: "text-sm",
					children: q
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
					className: "text-sm text-muted-foreground",
					children: a
				})]
			}, q))
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Contact the support desk",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 p-4 sm:grid-cols-3",
				children: [
					["Email", "support@helpdesk.io"],
					["Phone", "+1 800 555 0110"],
					["Hours", "24/7 for Critical issues"]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground uppercase",
					children: k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm font-medium",
					children: v
				})] }, k))
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: [
		"Admin",
		"Staff",
		"Client"
	],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpPage, {})
});
//#endregion
export { SplitComponent as component };
