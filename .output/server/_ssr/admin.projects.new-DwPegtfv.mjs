import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, d as SectionCard } from "./primitives-CPmujTLD.mjs";
import { v as RequireRole } from "./guard-BCYPieem.mjs";
import { t as ProjectForm } from "./project-form-mnizkSz4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects.new-DwPegtfv.js
var import_jsx_runtime = require_jsx_runtime();
function NewProjectPage() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "New project",
		description: "Create a project for a customer and define its schedule, hours and status."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectForm, {
		mode: "create",
		onCancel: () => navigate({ to: "/admin/projects" }),
		onSuccess: () => navigate({ to: "/admin/projects" })
	}) })] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewProjectPage, {})
});
//#endregion
export { SplitComponent as component };
