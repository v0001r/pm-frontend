import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as homeFor, d as useAuth, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as PageHeader, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { t as Label } from "./label-BZKlnMd2.mjs";
import { n as AlertDescription, t as Alert } from "./alert-DN-UJeN7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/change-password-DT7FlKI_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChangePasswordPage() {
	const { user, changePassword, refresh } = useAuth();
	const navigate = useNavigate();
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	if (!user) {
		navigate({
			to: "/",
			replace: true
		});
		return null;
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
				onSubmit: async (event) => {
					event.preventDefault();
					setError("");
					if (newPassword.length < 8) return setError("Password must be at least 8 characters.");
					if (newPassword !== confirm) return setError("Passwords do not match.");
					setLoading(true);
					try {
						await changePassword(currentPassword, newPassword);
						await refresh();
						navigate({
							to: homeFor(user.role),
							replace: true
						});
					} catch (err) {
						setError(getApiErrorMessage(err, "Unable to change password."));
					} finally {
						setLoading(false);
					}
				},
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						variant: "destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: error })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "current",
							children: "Current / temporary password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "current",
							type: "password",
							value: currentPassword,
							onChange: (e) => setCurrentPassword(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "new",
							children: "New password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "new",
							type: "password",
							value: newPassword,
							onChange: (e) => setNewPassword(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "confirm",
							children: "Confirm new password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "confirm",
							type: "password",
							value: confirm,
							onChange: (e) => setConfirm(e.target.value),
							required: true
						})]
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
