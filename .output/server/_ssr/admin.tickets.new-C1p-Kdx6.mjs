import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as Route$15 } from "./router-B2W8Gmeh.mjs";
import { t as AdminOrStaffRoute } from "./guard-BAnzMztv.mjs";
import { t as CreateTicketForm } from "./create-ticket-form-CzriI5Js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tickets.new-C1p-Kdx6.js
var import_jsx_runtime = require_jsx_runtime();
function AdminNewTicket() {
	const { projectId } = Route$15.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateTicketForm, {
		initialProjectId: projectId,
		cancelTo: "/admin/tickets",
		successTo: "/admin/tickets/$ticketId"
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminOrStaffRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminNewTicket, {}) });
//#endregion
export { SplitComponent as component };
