import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$3 } from "./router-CZIJBryQ.mjs";
import { h as RequireRole } from "./guard-BbFIUcOG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects._projectId.edit-BwrW2fWy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditProjectRedirect() {
	const navigate = useNavigate();
	const { projectId } = Route$3.useParams();
	(0, import_react.useEffect)(() => {
		navigate({
			to: "/admin/projects/$projectId",
			params: { projectId },
			search: { edit: true },
			replace: true
		});
	}, [navigate, projectId]);
	return null;
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditProjectRedirect, {})
});
//#endregion
export { SplitComponent as component };
