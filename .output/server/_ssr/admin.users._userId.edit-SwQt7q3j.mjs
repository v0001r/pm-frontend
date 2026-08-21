import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-DC97nFe7.mjs";
import { h as RequireRole } from "./guard-DY-g-DXD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users._userId.edit-SwQt7q3j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditUserRedirect() {
	const navigate = useNavigate();
	const { userId } = Route.useParams();
	(0, import_react.useEffect)(() => {
		navigate({
			to: "/admin/users/$userId",
			params: { userId },
			search: { edit: true },
			replace: true
		});
	}, [navigate, userId]);
	return null;
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditUserRedirect, {})
});
//#endregion
export { SplitComponent as component };
