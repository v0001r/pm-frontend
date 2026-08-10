import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { S as Search } from "../_libs/lucide-react.mjs";
import { a as PageHeader, d as SectionCard, g as fullName, t as EmptyState } from "./primitives-BneTjl1i.mjs";
import { d as formatDate, m as useStore, u as findUser } from "./store-CZmg1Lwb.mjs";
import { $ as Table, B as DataTableToolbar, H as EntityCell, et as TableBody, it as TableRow, nt as TableHead, rt as TableHeader, tt as TableCell } from "./router-B2W8Gmeh.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { _ as RequireRole } from "./guard-BAnzMztv.mjs";
import { t as Badge } from "./badge-sRl3_xpk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.audit-a61N1Zxm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuditPage() {
	const store = useStore((s) => s);
	const [q, setQ] = (0, import_react.useState)("");
	const rows = store.audit.filter((a) => `${a.action} ${a.module} ${a.description}`.toLowerCase().includes(q.trim().toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Audit logs",
		description: "Every security and ticket-affecting action, with actor and origin."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
		className: "overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableToolbar, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-md flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search actions…",
					className: "h-10 rounded-xl border-border/60 bg-surface pl-10"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				className: "min-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					className: "hover:bg-transparent",
					children: [
						"User",
						"Action",
						"Module",
						"Description",
						"IP address",
						"Date & time"
					].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: heading }, heading))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((a) => {
					const actor = findUser(store, a.userId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
							name: actor ? fullName(actor) : "System",
							subtitle: actor?.email,
							hue: actor?.avatarHue
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: a.action
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: a.module }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "max-w-xs text-muted-foreground",
							children: a.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "tabular text-muted-foreground",
							children: a.ip
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap text-muted-foreground",
							children: formatDate(a.createdAt, true)
						})
					] }, a.id);
				}) })]
			}),
			rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No audit entries found." })
		]
	})] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditPage, {})
});
//#endregion
export { SplitComponent as component };
