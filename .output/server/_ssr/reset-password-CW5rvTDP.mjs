import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as resetPassword, n as Button, s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { b as useSearch, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as LoaderCircle, rt as CircleCheck, z as LifeBuoy } from "../_libs/lucide-react.mjs";
import { n as PasswordField, r as PasswordStrength } from "./password-Cq9Yhv-5.mjs";
import { n as AlertDescription, t as Alert } from "./alert-RArkaWol.mjs";
import { m as GuestRoute } from "./guard-BCYPieem.mjs";
import { d as resetPasswordSchema, f as validateForm } from "./form-validation-Baqh5cQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-CW5rvTDP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPassword() {
	const { token } = useSearch({ from: "/reset-password" });
	const [pw, setPw] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [apiError, setApiError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	function clearError(field) {
		setErrors((current) => {
			if (!current[field]) return current;
			const next = { ...current };
			delete next[field];
			return next;
		});
	}
	async function submit(e) {
		e.preventDefault();
		if (!token) {
			setApiError("Reset token is missing or invalid.");
			return;
		}
		setApiError("");
		const validation = validateForm(resetPasswordSchema, {
			password: pw,
			confirm
		});
		if (!validation.success) {
			setErrors(validation.errors);
			return;
		}
		setErrors({});
		setLoading(true);
		try {
			await resetPassword(token, pw);
			setDone(true);
		} catch (err) {
			setApiError(getApiErrorMessage(err, "Unable to reset password."));
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
						apiError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
							variant: "destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: apiError })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
							id: "new",
							label: "New password",
							value: pw,
							onChange: (value) => {
								setPw(value);
								clearError("password");
							},
							error: errors.password
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordStrength, { value: pw }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
							id: "confirm",
							label: "Confirm password",
							value: confirm,
							onChange: (value) => {
								setConfirm(value);
								clearError("confirm");
							},
							error: errors.confirm
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
