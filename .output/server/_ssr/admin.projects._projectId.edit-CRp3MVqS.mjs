import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, p as TableSkeleton, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Route$3 } from "./router-DLFu5c1a.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { i as fetchProject } from "./projects-JQDAMoYA.mjs";
import { n as projectToFormValues, t as ProjectForm } from "./project-form-BVedDx40.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects._projectId.edit-CRp3MVqS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditProjectPage() {
	const navigate = useNavigate();
	const { projectId } = Route$3.useParams();
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ["project", projectId],
		queryFn: () => fetchProject(projectId)
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load project"));
	}, [isError, error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: data ? `Edit ${data.name}` : "Edit project",
		description: data ? `${data.projectId} · ${data.customerName ?? "Customer project"}` : "Update project details"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 8,
		cols: 2
	}) : isError || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-3 p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Unable to load this project."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			size: "sm",
			onClick: () => refetch(),
			children: "Retry"
		})]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectForm, {
		mode: "edit",
		projectId,
		initialValues: projectToFormValues(data),
		customerName: data.customerName,
		onCancel: () => navigate({ to: "/admin/projects" }),
		onSuccess: () => navigate({
			to: "/admin/projects/$projectId",
			params: { projectId }
		})
	}, data._id) })] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditProjectPage, {})
});
//#endregion
export { SplitComponent as component };
