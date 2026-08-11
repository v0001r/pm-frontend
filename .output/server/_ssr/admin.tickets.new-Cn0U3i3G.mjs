import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Route$15 } from "./router-CZIJBryQ.mjs";
import { t as AdminOrStaffRoute } from "./guard-BbFIUcOG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tickets.new-Cn0U3i3G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewTicketRedirect() {
	const navigate = useNavigate();
	const { projectId } = Route$15.useSearch();
	(0, import_react.useEffect)(() => {
		navigate({
			to: "/admin/tickets",
			search: {
				action: "create",
				...projectId ? { projectId } : {}
			},
			replace: true
		});
	}, [navigate, projectId]);
	return null;
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminOrStaffRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewTicketRedirect, {}) });
//#endregion
export { SplitComponent as component };
