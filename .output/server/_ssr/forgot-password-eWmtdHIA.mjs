import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, o as forgotPassword, s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as LoaderCircle, N as MailCheck, _t as ArrowLeft, z as LifeBuoy } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-DantDJEY.mjs";
import { i as fieldInputClass, t as FormField } from "./password-Cq9Yhv-5.mjs";
import { n as AlertDescription, t as Alert } from "./alert-RArkaWol.mjs";
import { m as GuestRoute } from "./guard-BCYPieem.mjs";
import { f as validateForm, s as forgotPasswordSchema } from "./form-validation-Baqh5cQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-eWmtdHIA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPassword() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [apiError, setApiError] = (0, import_react.useState)("");
	async function submit(e) {
		e.preventDefault();
		setApiError("");
		const validation = validateForm(forgotPasswordSchema, { email });
		if (!validation.success) {
			setErrors(validation.errors);
			return;
		}
		setErrors({});
		setLoading(true);
		try {
			await forgotPassword(email);
			setSent(true);
		} catch (err) {
			setApiError(getApiErrorMessage(err, "Unable to process request."));
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
			}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-2xl font-semibold",
					children: "Check your inbox"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: "If an account exists with this email address, a password reset link has been sent." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex flex-col gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Return to login"]
						})
					})
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-2xl font-semibold",
					children: "Forgot password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm text-muted-foreground",
					children: "Enter the email address linked to your account and we'll send a reset link."
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Email address",
							htmlFor: "email",
							error: errors.email,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								value: email,
								onChange: (e) => {
									setEmail(e.target.value);
									setErrors((current) => {
										if (!current.email) return current;
										const next = { ...current };
										delete next.email;
										return next;
									});
								},
								placeholder: "you@company.com",
								className: fieldInputClass(errors.email)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: loading,
							children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Send reset link"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Return to login"]
							})
						})
					]
				})
			] })]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotPassword, {}) });
//#endregion
export { SplitComponent as component };
