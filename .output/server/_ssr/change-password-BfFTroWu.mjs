import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as homeFor, f as useAuth, n as Button, s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as PageHeader, d as SectionCard } from "./primitives-CPmujTLD.mjs";
import { t as Input } from "./input-DantDJEY.mjs";
import { i as fieldInputClass, t as FormField } from "./password-Cq9Yhv-5.mjs";
import { n as AlertDescription, t as Alert } from "./alert-RArkaWol.mjs";
import { f as validateForm, n as changePasswordSchema } from "./form-validation-Baqh5cQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/change-password-BfFTroWu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChangePasswordPage() {
	const { user, changePassword, refresh } = useAuth();
	const navigate = useNavigate();
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [apiError, setApiError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	if (!user) {
		navigate({
			to: "/",
			replace: true
		});
		return null;
	}
	function clearError(field) {
		setErrors((current) => {
			if (!current[field]) return current;
			const next = { ...current };
			delete next[field];
			return next;
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-screen max-w-md items-center px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Change your password",
				description: "You must set a new password before continuing."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4 p-4",
				noValidate: true,
				onSubmit: async (event) => {
					event.preventDefault();
					setApiError("");
					const validation = validateForm(changePasswordSchema, {
						currentPassword,
						newPassword,
						confirm
					});
					if (!validation.success) {
						setErrors(validation.errors);
						return;
					}
					setErrors({});
					setLoading(true);
					try {
						await changePassword(currentPassword, newPassword);
						await refresh();
						navigate({
							to: homeFor(user.role),
							replace: true
						});
					} catch (err) {
						setApiError(getApiErrorMessage(err, "Unable to change password."));
					} finally {
						setLoading(false);
					}
				},
				children: [
					apiError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						variant: "destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: apiError })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Current / temporary password",
						htmlFor: "current",
						error: errors.currentPassword,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "current",
							type: "password",
							value: currentPassword,
							onChange: (e) => {
								setCurrentPassword(e.target.value);
								clearError("currentPassword");
							},
							className: fieldInputClass(errors.currentPassword)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "New password",
						htmlFor: "new",
						error: errors.newPassword,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "new",
							type: "password",
							value: newPassword,
							onChange: (e) => {
								setNewPassword(e.target.value);
								clearError("newPassword");
							},
							className: fieldInputClass(errors.newPassword)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Confirm new password",
						htmlFor: "confirm",
						error: errors.confirm,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "confirm",
							type: "password",
							value: confirm,
							onChange: (e) => {
								setConfirm(e.target.value);
								clearError("confirm");
							},
							className: fieldInputClass(errors.confirm)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: loading,
						children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Update password"]
					})
				]
			}) })]
		})
	});
}
//#endregion
export { ChangePasswordPage as component };
