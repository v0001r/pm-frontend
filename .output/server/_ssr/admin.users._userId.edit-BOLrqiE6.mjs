import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, d as SectionCard, m as TableSkeleton } from "./primitives-CPmujTLD.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route } from "./router-FFtXCDLz.mjs";
import { v as RequireRole } from "./guard-BCYPieem.mjs";
import { t as InternalUserForm } from "./internal-user-form-BZfjUU5x.mjs";
import { r as fetchInternalUser, u as updateInternalUser } from "./internal-users-DxEAVk7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users._userId.edit-BOLrqiE6.js
var import_jsx_runtime = require_jsx_runtime();
function EditUserPage() {
	const { userId } = Route.useParams();
	const navigate = useNavigate();
	const userQuery = useQuery({
		queryKey: ["internal-user", userId],
		queryFn: () => fetchInternalUser(userId)
	});
	if (userQuery.isLoading || !userQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Edit user" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 8,
		cols: 2
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Edit user",
		description: userQuery.data.email
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalUserForm, {
			mode: "edit",
			initial: userQuery.data,
			onCancel: () => navigate({
				to: "/admin/users/$userId",
				params: { userId }
			}),
			onSubmit: async (payload) => {
				try {
					await updateInternalUser(userId, payload);
					toast.success("User updated.");
					navigate({
						to: "/admin/users/$userId",
						params: { userId }
					});
				} catch (error) {
					toast.error(getApiErrorMessage(error, "Failed to update user"));
					throw error;
				}
			}
		})
	}) })] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditUserPage, {})
});
//#endregion
export { SplitComponent as component };
