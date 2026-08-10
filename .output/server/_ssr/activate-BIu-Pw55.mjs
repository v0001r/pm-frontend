import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as PageHeader, d as SectionCard } from "./primitives-CPmujTLD.mjs";
import { D as Route$42, _t as activateAccount } from "./router-CtVrCs4M.mjs";
import { t as Input } from "./input-DantDJEY.mjs";
import { a as fieldInputClass, n as FormField } from "./password-CG809Zkb.mjs";
import { n as AlertDescription, t as Alert } from "./alert-RArkaWol.mjs";
import { m as GuestRoute } from "./guard-BUVsJOD-.mjs";
import { f as validateForm, t as activateAccountSchema } from "./form-validation-n0pRSGP6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activate-BIu-Pw55.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ActivatePage() {
	const { token } = Route$42.useSearch();
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [apiError, setApiError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
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
				description: "Set a secure password to access the customer portal."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4 p-4",
				noValidate: true,
				onSubmit: async (event) => {
					event.preventDefault();
					setApiError("");
					if (!token) {
						setApiError("Invalid or missing invitation link.");
						return;
					}
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
						navigate({
							to: "/",
							replace: true
						});
					} catch (err) {
						setApiError(getApiErrorMessage(err, "Activation failed."));
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
						label: "New password",
						htmlFor: "password",
						error: errors.password,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "password",
							type: "password",
							value: password,
							onChange: (e) => {
								setPassword(e.target.value);
								clearError("password");
							},
							className: fieldInputClass(errors.password)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Confirm password",
						htmlFor: "confirm",
						error: errors.confirm,
						required: true,
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
