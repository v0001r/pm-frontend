import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as Route$7 } from "./router-DC97nFe7.mjs";
import { h as RequireRole } from "./guard-DY-g-DXD.mjs";
import { t as CreateTicketForm } from "./create-ticket-form-jMzELgBW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.tickets.new-BHKzrna_.js
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
