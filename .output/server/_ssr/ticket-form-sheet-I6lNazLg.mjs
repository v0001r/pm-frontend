import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as FormSheet } from "./form-sheet-CicRVy3u.mjs";
import { t as CreateTicketForm } from "./create-ticket-form-jMzELgBW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ticket-form-sheet-I6lNazLg.js
var import_jsx_runtime = require_jsx_runtime();
function TicketFormSheet({ open, onOpenChange, initialProjectId, onSaved }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSheet, {
		open,
		onOpenChange,
		title: "Create ticket",
		description: "Log a support request for any project.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateTicketForm, {
			embedded: true,
			initialProjectId,
			onCancel: () => onOpenChange(false),
			onSuccess: (ticketId) => {
				onOpenChange(false);
				onSaved?.(ticketId);
				navigate({
					to: "/admin/tickets/$ticketId",
					params: { ticketId }
				});
			}
		})
	});
}
//#endregion
export { TicketFormSheet as t };
