import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Route$5 } from "./router-DC97nFe7.mjs";
import { h as RequireRole } from "./guard-DY-g-DXD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers._customerId.edit-C8cWDxoT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditCustomerRedirect() {
	const navigate = useNavigate();
	const { customerId } = Route$5.useParams();
	(0, import_react.useEffect)(() => {
		navigate({
			to: "/admin/customers/$customerId",
			params: { customerId },
			search: { edit: true },
			replace: true
		});
	}, [navigate, customerId]);
	return null;
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditCustomerRedirect, {})
});
//#endregion
export { SplitComponent as component };
