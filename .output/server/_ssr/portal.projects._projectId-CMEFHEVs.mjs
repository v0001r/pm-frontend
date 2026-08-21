import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as Route$10 } from "./router-DC97nFe7.mjs";
import { h as RequireRole } from "./guard-DY-g-DXD.mjs";
import { t as ProjectOverview } from "./project-overview-CDtY1U4Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.projects._projectId-CMEFHEVs.js
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
