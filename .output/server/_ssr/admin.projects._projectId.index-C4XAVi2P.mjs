import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as Route$4 } from "./router-DyQZnl_T.mjs";
import { v as RequireRole } from "./guard-BCYPieem.mjs";
import { t as ProjectOverview } from "./project-overview-CpNJCe6O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects._projectId.index-C4XAVi2P.js
var import_jsx_runtime = require_jsx_runtime();
function AdminProjectDetailPage() {
	const { projectId } = Route$4.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectOverview, {
		projectId,
		mode: "admin"
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminProjectDetailPage, {})
});
//#endregion
export { SplitComponent as component };
