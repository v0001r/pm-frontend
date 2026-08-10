import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as RequireRole } from "./guard-BUVsJOD-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users.new-DUFlaOD1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewUserRedirect() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		navigate({
			to: "/admin/users",
			search: { action: "create" },
			replace: true
		});
	}, [navigate]);
	return null;
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewUserRedirect, {})
});
//#endregion
export { SplitComponent as component };
