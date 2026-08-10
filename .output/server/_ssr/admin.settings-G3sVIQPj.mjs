import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button } from "./button-Cc9Bh2Gp.mjs";
import { J as Clock3, b as Settings, f as Ticket, lt as Bell, n as Users } from "../_libs/lucide-react.mjs";
import { a as PageHeader, c as SLA_MATRIX, l as STATUSES, r as PRIORITIES, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { t as TICKET_CATEGORIES } from "./store-rjYLW1Ml.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as TableRow, J as Table, Q as TableHeader, X as TableCell, Y as TableBody, Z as TableHead } from "./router-DLFu5c1a.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { t as Label } from "./label-BZKlnMd2.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { t as Badge } from "./badge-sRl3_xpk.mjs";
import { t as Switch } from "./switch-BQW7U6lF.mjs";
import { i as TabsPanelTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-5bUW-pkO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-G3sVIQPj.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Settings",
		description: "Manage your account preferences, settings and workspace."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "general",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
					value: "general",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {}),
					title: "General",
					description: "Company details and branding"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
					value: "tickets",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, {}),
					title: "Tickets",
					description: "Defaults and categories"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
					value: "sla",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
					title: "SLA",
					description: "Response and resolution targets"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
					value: "notifications",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {}),
					title: "Notifications",
					description: "Email and in-app alerts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
					value: "roles",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
					title: "Users & roles",
					description: "Roles and permissions"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "general",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Company information",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-4 p-4 sm:grid-cols-2",
						onSubmit: (e) => {
							e.preventDefault();
							toast.success("Settings saved.");
						},
						children: [[
							["Company name", "Helpdesk Enterprise"],
							["Support email", "support@helpdesk.io"],
							["Contact number", "+1 800 555 0110"],
							["Logo URL", "/favicon.ico"]
						].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: value })]
						}, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "sm",
								children: "Save changes"
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "tickets",
				className: "mt-4 flex flex-col gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Ticket defaults",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 p-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Ticket ID format" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: "TKT-{YYYY}-{000000}" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Default priority" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: PRIORITIES[1] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Default status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: STATUSES[0] })]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Categories",
					description: "Fixed ticket categories used across the helpdesk.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: TICKET_CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 border-b px-4 py-2.5 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: category.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: category.description
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: "Active"
						})]
					}, category.id)) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "sla",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Priority-based SLA targets",
					className: "overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
						className: "hover:bg-transparent",
						children: [
							"Priority",
							"Response time",
							"Resolution time"
						].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: heading }, heading))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: PRIORITIES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-semibold",
							children: p
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: SLA_MATRIX[p].response }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: SLA_MATRIX[p].resolution })
					] }, p)) })] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "notifications",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Notification channels",
					description: "Email delivery connects to a provider later.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: [
						"New ticket",
						"Ticket reply",
						"Status change",
						"Ticket assignment",
						"Ticket resolution",
						"SLA breach"
					].map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between border-b px-4 py-2.5 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: ["Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: i !== 5 })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: ["In-app ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true })]
							})]
						})]
					}, n)) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "roles",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Roles and permissions",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-3 p-4 text-sm",
						children: [
							["Super Admin", "Full access to tickets, clients, agents, reports, audit logs and settings."],
							["Support Agent", "Access to assigned queues, ticket triage, replies and internal notes."],
							["Client", "Access limited strictly to their own tickets, replies and profile."]
						].map(([role, desc]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-sm border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: role
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: desc
							})]
						}, role))
					})
				})
			})
		]
	})] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, {})
});
//#endregion
export { SplitComponent as component };
