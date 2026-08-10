import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as PageHeader, d as SectionCard } from "./primitives-BneTjl1i.mjs";
import { at as activateAccount, g as Route$42 } from "./router-B2W8Gmeh.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { t as Label } from "./label-BZKlnMd2.mjs";
import { n as AlertDescription, t as Alert } from "./alert-DN-UJeN7.mjs";
import { p as GuestRoute } from "./guard-BAnzMztv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activate-B6zA48uY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ActivatePage() {
	const { token } = Route$42.useSearch();
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-screen max-w-md items-center px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Activate your account",
				description: "Set a secure password to access the customer portal."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4 p-4",
				onSubmit: async (event) => {
					event.preventDefault();
					setError("");
					if (!token) return setError("Invalid or missing invitation link.");
					if (password.length < 8) return setError("Password must be at least 8 characters.");
					if (password !== confirm) return setError("Passwords do not match.");
					setLoading(true);
					try {
						await activateAccount(token, password);
						navigate({
							to: "/",
							replace: true
						});
					} catch (err) {
						setError(getApiErrorMessage(err, "Activation failed."));
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
							htmlFor: "password",
							children: "New password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "password",
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "confirm",
							children: "Confirm password"
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
