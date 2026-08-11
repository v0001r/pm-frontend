import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn } from "./button-vnqCGuCs.mjs";
import { G as Eye, K as EyeOff, lt as Check, t as X } from "../_libs/lucide-react.mjs";
import { n as Input } from "./primitives-BAq0jd4Y.mjs";
import { mt as Label } from "./router-CZIJBryQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/password-BwiHqT0z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function fieldInputClass(error) {
	return error ? "border-destructive focus-visible:ring-destructive/20" : "";
}
function RequiredMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-destructive",
		"aria-hidden": "true",
		children: [" ", "*"]
	});
}
function FieldLabel({ required, children, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
		className,
		...props,
		children: [children, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequiredMark, {}) : null]
	});
}
function FormField({ label, htmlFor, error, children, className, hint, required = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-1.5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor,
				className: error ? "text-destructive" : void 0,
				required,
				children: label
			}),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.8125rem] font-medium text-destructive",
				children: error
			}) : null,
			!error && hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
var passwordRules = [
	{
		label: "At least 8 characters",
		test: (v) => v.length >= 8
	},
	{
		label: "One uppercase letter",
		test: (v) => /[A-Z]/.test(v)
	},
	{
		label: "One lowercase letter",
		test: (v) => /[a-z]/.test(v)
	},
	{
		label: "One number",
		test: (v) => /\d/.test(v)
	},
	{
		label: "One special character",
		test: (v) => /[^A-Za-z0-9]/.test(v)
	}
];
var passwordValid = (v) => passwordRules.every((r) => r.test(v));
function PasswordField({ id, label, value, onChange, autoComplete = "new-password", error, required = false }) {
	const [show, setShow] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: id,
				className: error ? "text-destructive" : void 0,
				required,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id,
					type: show ? "text" : "password",
					autoComplete,
					value,
					onChange: (e) => onChange(e.target.value),
					className: cn("pr-10", fieldInputClass(error))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setShow((s) => !s),
					"aria-label": show ? "Hide password" : "Show password",
					className: "absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground",
					children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.8125rem] font-medium text-destructive",
				children: error
			}) : null
		]
	});
}
function PasswordStrength({ value }) {
	const passed = (0, import_react.useMemo)(() => passwordRules.filter((r) => r.test(value)).length, [value]);
	const label = passed <= 2 ? "Weak" : passed <= 4 ? "Fair" : "Strong";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 flex-1 overflow-hidden rounded-full bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("h-full transition-all", passed <= 2 ? "bg-destructive" : passed <= 4 ? "bg-warning" : "bg-success"),
					style: { width: `${passed / 5 * 100}%` }
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-12 text-xs text-muted-foreground",
				children: value ? label : ""
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-1 sm:grid-cols-2",
			children: passwordRules.map((r) => {
				const ok = r.test(value);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("flex items-center gap-1.5 text-xs", ok ? "text-success" : "text-muted-foreground"),
					children: [ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), r.label]
				}, r.label);
			})
		})]
	});
}
//#endregion
export { fieldInputClass as a, PasswordStrength as i, FormField as n, passwordValid as o, PasswordField as r, FieldLabel as t };
