import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { t as InternalUserForm } from "./internal-user-form-D7xf9saE.mjs";
import { t as createInternalUser } from "./internal-users-BgPtnBI9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users.new-DfZvrLmO.js
var import_jsx_runtime = require_jsx_runtime();
function NewUserPage() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "New user",
		description: "Create an internal employee account."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalUserForm, {
			mode: "create",
			onCancel: () => navigate({ to: "/admin/users" }),
			onSubmit: async (payload) => {
				try {
					const user = await createInternalUser(payload);
					toast.success("User created and invitation sent.");
					navigate({
						to: "/admin/users/$userId",
						params: { userId: user.id ?? user._id }
					});
				} catch (error) {
					toast.error(getApiErrorMessage(error, "Failed to create user"));
					throw error;
				}
			}
		})
	}) })] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewUserPage, {})
});
//#endregion
export { SplitComponent as component };
