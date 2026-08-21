import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$4 } from "./router-DC97nFe7.mjs";
import { h as RequireRole } from "./guard-DY-g-DXD.mjs";
import { t as ProjectOverview } from "./project-overview-CDtY1U4Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects._projectId.index-MLsBt7IA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminProjectDetailPage() {
	const { projectId } = Route$4.useParams();
	const routeSearch = Route$4.useSearch();
	const navigate = useNavigate();
	const initialEditOpen = routeSearch.edit;
	(0, import_react.useEffect)(() => {
		if (routeSearch.edit) navigate({
			to: "/admin/projects/$projectId",
			params: { projectId },
			search: {},
			replace: true
		});
	}, [
		routeSearch.edit,
		navigate,
		projectId
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectOverview, {
		projectId,
		mode: "admin",
		initialEditOpen
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminProjectDetailPage, {})
});
//#endregion
export { SplitComponent as component };
