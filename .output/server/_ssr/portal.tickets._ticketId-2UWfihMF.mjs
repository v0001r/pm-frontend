import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as Route$8 } from "./router-FFtXCDLz.mjs";
import { v as RequireRole } from "./guard-BCYPieem.mjs";
import { t as TicketWorkspace } from "./ticket-workspace-CIREi8Es.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.tickets._ticketId-2UWfihMF.js
var import_jsx_runtime = require_jsx_runtime();
function ClientTicket() {
	const { ticketId } = Route$8.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketWorkspace, {
		ticketId,
		mode: "client"
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Client"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientTicket, {})
});
//#endregion
export { SplitComponent as component };
