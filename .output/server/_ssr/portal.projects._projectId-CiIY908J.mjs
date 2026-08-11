import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as Route$10 } from "./router-CZIJBryQ.mjs";
import { h as RequireRole } from "./guard-BbFIUcOG.mjs";
import { t as ProjectOverview } from "./project-overview-CO7txvgT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.projects._projectId-CiIY908J.js
var import_jsx_runtime = require_jsx_runtime();
function PortalProjectDetailPage() {
	const { projectId } = Route$10.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectOverview, {
		projectId,
		mode: "client"
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Client"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProjectDetailPage, {})
});
//#endregion
export { SplitComponent as component };
