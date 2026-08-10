import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button } from "./button-Cc9Bh2Gp.mjs";
import { a as PageHeader, h as fullName, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate, c as useStore, n as actions } from "./store-rjYLW1Ml.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as TableRow, F as DataTableIconButton, J as Table, P as DataTableActions, Q as TableHeader, X as TableCell, Y as TableBody, Z as TableHead, z as EntityCell } from "./router-DLFu5c1a.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { t as Badge } from "./badge-sRl3_xpk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.team-8NQpJtBv.js
var import_jsx_runtime = require_jsx_runtime();
function TeamPage() {
	const store = useStore((s) => s);
	const staff = store.users.filter((u) => u.role === "Staff" || u.role === "Admin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Support team",
			description: "Agent roster, workload and resolution performance.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => toast.info("Agent invitation flow connects to the backend later."),
				children: "Add agent"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				className: "min-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					className: "hover:bg-transparent",
					children: [
						"Agent",
						"Email",
						"Role",
						"Active tickets",
						"Resolved",
						"Avg. resolution",
						"Status",
						"Actions"
					].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: heading === "Actions" ? "text-right" : void 0,
						children: heading
					}, heading))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: staff.map((u, i) => {
					const assigned = store.tickets.filter((t) => t.assignedTo === u.id);
					const active = assigned.filter((t) => !["Resolved", "Closed"].includes(t.status)).length;
					const resolved = assigned.length - active;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
							name: fullName(u),
							subtitle: u.department,
							hue: u.avatarHue
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground",
							children: u.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: u.role === "Admin" ? "Super Admin" : "Support Agent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "tabular",
							children: active
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "tabular",
							children: resolved
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "tabular",
							children: [
								8 + i * 3,
								"h ",
								12 + i,
								"m"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: u.status === "Active" ? "secondary" : "outline",
							children: u.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DataTableActions, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
							label: u.status === "Active" ? "Deactivate" : "Activate",
							onClick: () => {
								const next = u.status === "Active" ? "Inactive" : "Active";
								actions.updateUser(u.id, { status: next });
								toast.success(`${fullName(u)} ${next === "Active" ? "activated" : "deactivated"}.`);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-1 text-xs",
								children: u.status === "Active" ? "Deactivate" : "Activate"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
							label: "Reset password",
							onClick: () => toast.success("Password reset link sent."),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-1 text-xs",
								children: "Reset"
							})
						})] }) })
					] }, u.id);
				}) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Recent staff activity",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2 p-4 text-sm",
				children: store.audit.slice(0, 5).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.description }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: formatDate(a.createdAt, true)
					})]
				}, a.id))
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamPage, {})
});
//#endregion
export { SplitComponent as component };
