import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as getApiFieldErrors, i as activateAccount, n as Button, u as getApiErrorMessage, x as validateActivationToken } from "./button-Du-Bk9Wl.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as LoaderCircle, tt as CircleCheck } from "../_libs/lucide-react.mjs";
import { d as SectionCard, o as PageHeader } from "./primitives-BE889lfB.mjs";
import { T as Route$42 } from "./router-DC97nFe7.mjs";
import { L as validateForm, i as PasswordField, o as PasswordStrength, s as activateAccountSchema } from "./form-validation-CtBmYCtB.mjs";
import { n as AlertDescription, t as Alert } from "./alert-CKyo1Fu5.mjs";
import { m as GuestRoute } from "./guard-DY-g-DXD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activate-B2LHQmy6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ActivatePage() {
	const { token } = Route$42.useSearch();
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [tokenError, setTokenError] = (0, import_react.useState)("");
	const [tokenInfo, setTokenInfo] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [checkingToken, setCheckingToken] = (0, import_react.useState)(true);
	const [done, setDone] = (0, import_react.useState)(false);
	const tokenReady = Boolean(token.trim()) && !tokenError && !checkingToken;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function checkToken() {
			if (!token.trim()) {
				setTokenError("This activation link is invalid.");
				setTokenInfo("");
				setCheckingToken(false);
				return;
			}
			setCheckingToken(true);
			setTokenError("");
			setTokenInfo("");
			try {
				const result = await validateActivationToken(token);
				if (cancelled) return;
				if (result.valid) {
					setTokenInfo(result.message ?? `This activation link is valid for ${result.expiresInHours ?? 72} hours from when it was sent.`);
					return;
				}
				setTokenError(result.message ?? "This activation link is invalid.");
			} catch {
				if (!cancelled) setTokenError("Unable to validate this activation link.");
			} finally {
				if (!cancelled) setCheckingToken(false);
			}
		}
		checkToken();
		return () => {
			cancelled = true;
		};
	}, [token]);
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
				title: "Activate your account",
				description: "Set a secure password to finish setting up your account."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: "Your account has been activated. You can now sign in." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						replace: true,
						children: "Continue to sign in"
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4 p-4",
				noValidate: true,
				onSubmit: async (event) => {
					event.preventDefault();
					if (!tokenReady) return;
					const validation = validateForm(activateAccountSchema, {
						password,
						confirm
					});
					if (!validation.success) {
						setErrors(validation.errors);
						return;
					}
					setErrors({});
					setLoading(true);
					try {
						await activateAccount(token, password);
						setDone(true);
					} catch (err) {
						const fieldErrors = getApiFieldErrors(err);
						if (Object.keys(fieldErrors).length > 0) {
							setErrors(fieldErrors);
							return;
						}
						const message = getApiErrorMessage(err, "Activation failed.");
						if (message.includes("activation link") || message.includes("invitation link")) {
							setTokenError(message);
							return;
						}
						setErrors({ password: message });
					} finally {
						setLoading(false);
					}
				},
				children: [
					checkingToken ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Checking activation link…"
					}) : null,
					tokenInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: tokenInfo }) }) : null,
					tokenError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						variant: "destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: tokenError })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
						id: "password",
						label: "New password",
						value: password,
						onChange: (value) => {
							setPassword(value);
							clearError("password");
						},
						error: errors.password,
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordStrength, { value: password }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
						id: "confirm",
						label: "Confirm password",
						value: confirm,
						onChange: (value) => {
							setConfirm(value);
							clearError("confirm");
						},
						error: errors.confirm,
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: loading || !tokenReady,
						children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Activate account"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-center text-sm text-primary hover:underline",
						children: "Back to sign in"
					})
				]
			}) })]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivatePage, {}) });
//#endregion
export { SplitComponent as component };
