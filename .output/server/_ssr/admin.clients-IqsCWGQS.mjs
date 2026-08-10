import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Search } from "../_libs/lucide-react.mjs";
import { a as PageHeader, f as StatusBadge, h as fullName, m as UserAvatar, t as EmptyState, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate, c as useStore, n as actions } from "./store-rjYLW1Ml.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as TableRow, F as DataTableIconButton, J as Table, L as DataTableToolbar, P as DataTableActions, Q as TableHeader, X as TableCell, Y as TableBody, Z as TableHead, z as EntityCell } from "./router-DLFu5c1a.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { t as Badge } from "./badge-sRl3_xpk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.clients-IqsCWGQS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientsPage() {
	const store = useStore((s) => s);
	const [q, setQ] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const clients = store.users.filter((u) => u.role === "Client").filter((u) => `${fullName(u)} ${u.email} ${u.company}`.toLowerCase().includes(q.trim().toLowerCase()));
	const detail = store.users.find((u) => u.id === selected);
	const clientTickets = store.tickets.filter((t) => t.clientId === selected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Clients",
		description: "Every client account with support history and access controls.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			onClick: () => toast.info("Client creation form opens here in the connected build."),
			children: "Add client"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
			className: "overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableToolbar, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-md flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search clients…",
						className: "h-10 rounded-xl border-border/60 bg-surface pl-10"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					className: "min-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
						className: "hover:bg-transparent",
						children: [
							"Client",
							"Company",
							"Email",
							"Tickets",
							"Status",
							"Created",
							"Actions"
						].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: heading === "Actions" ? "text-right" : void 0,
							children: heading
						}, heading))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: selected === c.id ? "bg-primary/5" : void 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
								name: fullName(c),
								subtitle: c.designation,
								hue: c.avatarHue
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: c.company }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: c.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "tabular",
								children: store.tickets.filter((t) => t.clientId === c.id).length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: c.status === "Active" ? "secondary" : "outline",
								children: c.status
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: formatDate(c.createdAt)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
								label: "View client",
								onClick: () => setSelected(c.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-1 text-xs",
									children: "View"
								})
							}) }) })
						]
					}, c.id)) })]
				}),
				clients.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No clients have been added yet." })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Client details",
			children: !detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Select a client",
				description: "Choose a client to view their profile and ticket history."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
							name: fullName(detail),
							hue: detail.avatarHue,
							size: 44
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: fullName(detail)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								detail.designation,
								" · ",
								detail.company
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "grid gap-2 text-sm",
						children: [
							["Email", detail.email],
							["Phone", detail.phone],
							["Status", detail.status],
							["Last login", formatDate(detail.lastLogin, true)],
							["Member since", formatDate(detail.createdAt)]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-right font-medium",
								children: v
							})]
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2 text-center",
						children: [
							["Total", clientTickets.length],
							["Open", clientTickets.filter((t) => !["Resolved", "Closed"].includes(t.status)).length],
							["Resolved", clientTickets.filter((t) => t.status === "Resolved").length]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-sm border p-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular text-lg font-semibold",
								children: v
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: k
							})]
						}, String(k)))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted-foreground uppercase",
							children: "Recent tickets"
						}), clientTickets.slice(0, 4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/tickets/$ticketId",
							params: { ticketId: t.id },
							className: "flex items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: t.subject
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: t.status })]
						}, t.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => toast.success("Password reset link sent."),
							children: "Reset password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								const next = detail.status === "Active" ? "Inactive" : "Active";
								actions.updateUser(detail.id, { status: next });
								toast.success(`Client ${next === "Active" ? "activated" : "deactivated"}.`);
							},
							children: detail.status === "Active" ? "Deactivate" : "Activate"
						})]
					})
				]
			})
		})]
	})] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientsPage, {})
});
//#endregion
export { SplitComponent as component };
