import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as Route$10 } from "./router-DyQZnl_T.mjs";
import { v as RequireRole } from "./guard-BCYPieem.mjs";
import { t as ProjectOverview } from "./project-overview-CpNJCe6O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.projects._projectId-D30QYbKh.js
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
