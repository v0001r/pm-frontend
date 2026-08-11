import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { p as Route$16 } from "./router-CZIJBryQ.mjs";
import { h as RequireRole } from "./guard-BbFIUcOG.mjs";
import { t as TicketWorkspace } from "./ticket-workspace-DlSddPCT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tickets._ticketId-1UHXX-Xg.js
var import_jsx_runtime = require_jsx_runtime();
function AdminTicketDetail() {
	const { ticketId } = Route$16.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketWorkspace, {
		ticketId,
		mode: "admin"
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTicketDetail, {})
});
//#endregion
export { SplitComponent as component };
