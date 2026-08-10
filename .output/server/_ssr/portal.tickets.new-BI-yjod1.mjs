import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { l as Route$7 } from "./router-DLFu5c1a.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { t as CreateTicketForm } from "./create-ticket-form-EJ_z6S6k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.tickets.new-BI-yjod1.js
var import_jsx_runtime = require_jsx_runtime();
function PortalNewTicket() {
	const { projectId } = Route$7.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateTicketForm, {
		initialProjectId: projectId,
		cancelTo: "/portal/tickets",
		successTo: "/portal/tickets/$ticketId"
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: [
		"Admin",
		"Staff",
		"Client"
	],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalNewTicket, {})
});
//#endregion
export { SplitComponent as component };
