import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, f as useAuth, n as Button } from "./button-vnqCGuCs.mjs";
import { ft as Bell } from "../_libs/lucide-react.mjs";
import { d as SectionCard, o as PageHeader, t as EmptyState } from "./primitives-BAq0jd4Y.mjs";
import { d as actions, g as useStore, m as formatDate } from "./store-C1539MgZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-panel-Cn5bCCsY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPanel() {
	const { user } = useAuth();
	const all = useStore((s) => s.notifications);
	const notifications = (0, import_react.useMemo)(() => all.filter((n) => n.userId === user?.id), [all, user?.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Notifications",
		description: "Ticket activity and account alerts.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "outline",
			onClick: () => {
				if (user) actions.markNotificationsRead(user.id);
				toast.success("All notifications marked as read.");
			},
			children: "Mark all as read"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No notifications yet.",
		description: "Ticket activity will appear here."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: cn("flex items-start gap-3 border-b px-4 py-3 last:border-0", !n.read && "bg-primary-soft"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "mt-0.5 size-4 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: n.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: n.message
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs whitespace-nowrap text-muted-foreground",
				children: formatDate(n.createdAt, true)
			})
		]
	}, n.id)) }) })] });
}
//#endregion
export { NotificationsPanel as t };
