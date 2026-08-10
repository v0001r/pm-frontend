import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage, u as resetPassword } from "./button-Cc9Bh2Gp.mjs";
import { b as useSearch, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as LoaderCircle, L as LifeBuoy, Q as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as AlertDescription, t as Alert } from "./alert-DN-UJeN7.mjs";
import { v as GuestRoute } from "./guard-Da2hUi3G.mjs";
import { n as PasswordStrength, r as passwordValid, t as PasswordField } from "./password-DB11OHyl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-CyK8-tRe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPassword() {
	const { token } = useSearch({ from: "/reset-password" });
	const [pw, setPw] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		if (!token) return setError("Reset token is missing or invalid.");
		if (!passwordValid(pw)) return setError("Your password does not meet all requirements.");
		if (pw !== confirm) return setError("Passwords do not match.");
		setError("");
		setLoading(true);
		try {
			await resetPassword(token, pw);
			setDone(true);
		} catch (err) {
			setError(getApiErrorMessage(err, "Unable to reset password."));
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-5 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-9 place-items-center rounded-sm bg-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "size-5" })
			}), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-2xl font-semibold",
					children: "Password reset"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: "Your password has been reset successfully." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-5 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Return to login"
					})
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-2xl font-semibold",
					children: "Set a new password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm text-muted-foreground",
					children: "Choose a strong password you haven't used before."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-6 flex flex-col gap-4",
					noValidate: true,
					children: [
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
							variant: "destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: error })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
							id: "new",
							label: "New password",
							value: pw,
							onChange: setPw
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordStrength, { value: pw }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
							id: "confirm",
							label: "Confirm password",
							value: confirm,
							onChange: setConfirm
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: loading || !token,
							children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Reset password"]
						})
					]
				})
			] })]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetPassword, {}) });
//#endregion
export { SplitComponent as component };
