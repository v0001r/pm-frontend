import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as cn } from "./button-Du-Bk9Wl.mjs";
import { G as Eye, K as EyeOff, lt as Check, t as X } from "../_libs/lucide-react.mjs";
import { n as Input } from "./primitives-BE889lfB.mjs";
import { St as Label } from "./router-DC97nFe7.mjs";
import { i as unionType, n as objectType, r as stringType, t as literalType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/form-validation-CtBmYCtB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getScrollParent(element) {
	let parent = element.parentElement;
	while (parent && parent !== document.body) {
		const overflowY = window.getComputedStyle(parent).overflowY;
		if ((overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") && parent.scrollHeight > parent.clientHeight) return parent;
		parent = parent.parentElement;
	}
	return null;
}
/** Scrolls to and focuses the first field in `fieldOrder` that has a validation error. */
function focusFirstInvalidField(errors, fieldOrder) {
	const field = fieldOrder.find((key) => errors[key]);
	if (!field) return;
	const el = document.getElementById(field);
	if (!(el instanceof HTMLElement)) return;
	const scrollParent = getScrollParent(el);
	if (scrollParent) {
		const parentRect = scrollParent.getBoundingClientRect();
		const elRect = el.getBoundingClientRect();
		const top = scrollParent.scrollTop + (elRect.top - parentRect.top) - 16;
		scrollParent.scrollTo({
			top: Math.max(0, top),
			behavior: "smooth"
		});
	} else el.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "nearest"
	});
	requestAnimationFrame(() => {
		el.focus({ preventScroll: true });
	});
}
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
				required,
				className: "text-foreground",
				children: label
			}),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: htmlFor ? `${htmlFor}-error` : void 0,
				role: "alert",
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
var PasswordInput = (0, import_react.forwardRef)(function PasswordInput({ className, ...props }, ref) {
	const [show, setShow] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			ref,
			type: show ? "text" : "password",
			className: cn("pr-10", className),
			...props
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setShow((s) => !s),
			"aria-label": show ? "Hide password" : "Show password",
			className: "absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground",
			children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
		})]
	});
});
function PasswordField({ id, label, value, onChange, autoComplete = "new-password", error, required = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: id,
				className: "text-foreground",
				required,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
				id,
				autoComplete,
				value,
				onChange: (e) => onChange(e.target.value),
				className: fieldInputClass(error)
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
var FIELD_LIMITS = {
	EMAIL_MAX: 100,
	NAME_MIN: 3,
	NAME_MAX: 75,
	TITLE_MIN: 3,
	TITLE_MAX: 100,
	SUBJECT_MIN: 3,
	SUBJECT_MAX: 250,
	PROJECT_NAME_MAX: 120,
	MOBILE_LENGTH: 10,
	MOBILE_REGEX: /^[6-9]\d{9}$/,
	NAME_REGEX: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
	EMAIL_REGEX: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/,
	MOBILE_MAX_DIGITS: 16
};
var EMAIL_INVALID_MESSAGE = "Please enter a valid email address.";
var WEBSITE_INVALID_MESSAGE = "Please enter a valid website URL.";
var NAME_MAX_MESSAGE = "Maximum 75 characters are allowed.";
var WHITESPACE_INVALID_MESSAGE = "Please enter a valid value. Empty or consecutive spaces are not allowed.";
var MOBILE_INVALID_MESSAGE = "Please enter a valid 10-digit mobile number.";
var INTERNATIONAL_PHONE_INVALID_MESSAGE = "Please enter a valid phone number.";
var CONTACT_MOBILE_LENGTH_ERROR = `Mobile number cannot exceed ${FIELD_LIMITS.MOBILE_MAX_DIGITS} digits`;
var CUSTOMER_EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
var GLUED_EMAIL_TLD_PATTERN = /^(com|net|org|edu|gov|info|co|io|in|uk|us|au|de|fr|me|tv|biz)([a-z]{2,})$/i;
var INTERNATIONAL_PHONE_ALLOWED_CHARS = /^\+?[0-9\s\-().]*$/;
function getZodErrorMessage(error) {
	return error.issues.find((issue) => issue.message && issue.message !== "Invalid input")?.message ?? error.issues[0]?.message ?? "Invalid value";
}
function normalizeMobileInput(value) {
	const digits = value.replace(/\D/g, "");
	if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
	return digits;
}
function constrainPersonNameInput(value) {
	return value.replace(/[^A-Za-z ]/g, "").replace(/^ +/, "");
}
function constrainFreeTextInput(value) {
	return value.replace(/^ +/, "");
}
function hasConsecutiveSpaces(value) {
	return /\s{2,}/.test(value);
}
function hasAnyWhitespace(value) {
	return /\s/.test(value);
}
function constrainInternationalPhoneInput(value) {
	let next = "";
	for (const char of value) {
		if (char === "+" && next.length === 0) {
			next += char;
			continue;
		}
		if (/[0-9\s\-().]/.test(char)) next += char;
	}
	return next;
}
function constrainMobileInput(value) {
	return value.replace(/\D/g, "").slice(0, FIELD_LIMITS.MOBILE_LENGTH);
}
function constrainContactMobileInput(value) {
	return value.replace(/\D/g, "").slice(0, FIELD_LIMITS.MOBILE_MAX_DIGITS);
}
function isValidCustomerEmail(value) {
	const email = value.trim().toLowerCase();
	if (!CUSTOMER_EMAIL_PATTERN.test(email)) return false;
	const domain = email.split("@")[1] ?? "";
	const lastDot = domain.lastIndexOf(".");
	if (lastDot <= 0) return false;
	const tld = domain.slice(lastDot + 1);
	if (!/^[a-z]{2,63}$/.test(tld)) return false;
	return !GLUED_EMAIL_TLD_PATTERN.test(tld);
}
function isValidWebsiteUrl(value) {
	const trimmed = value.trim();
	if (!trimmed) return true;
	try {
		const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
		const url = new URL(candidate);
		if (url.protocol !== "http:" && url.protocol !== "https:") return false;
		return /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(url.hostname);
	} catch {
		return false;
	}
}
function isValidInternationalPhone(value) {
	const trimmed = value.trim();
	if (!trimmed) return true;
	if (/[A-Za-z]/.test(trimmed)) return false;
	if (!INTERNATIONAL_PHONE_ALLOWED_CHARS.test(trimmed)) return false;
	if (trimmed.includes("+") && !trimmed.startsWith("+")) return false;
	return /\d/.test(trimmed);
}
function isValidMobilePrefix(digits) {
	return digits === "" || /^[6-9]/.test(digits);
}
function constrainDdMmYyyyInput(value) {
	const digits = value.replace(/\D/g, "").slice(0, 8);
	const day = digits.slice(0, 2);
	const month = digits.slice(2, 4);
	const year = digits.slice(4, 8);
	if (digits.length <= 2) return day;
	if (digits.length <= 4) return `${day}-${month}`;
	return `${day}-${month}-${year}`;
}
function isoToDdMmYyyy(value) {
	const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
	if (!match) return "";
	return `${match[3]}-${match[2]}-${match[1]}`;
}
function ddMmYyyyToIso(value) {
	const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
	if (!match) return "";
	const day = Number(match[1]);
	const month = Number(match[2]);
	const year = Number(match[3]);
	const date = new Date(year, month - 1, day);
	if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return "";
	return `${match[3]}-${match[2]}-${match[1]}`;
}
function mapFieldErrors(error) {
	const errors = {};
	for (const issue of error.issues) {
		const key = String(issue.path[0] ?? "");
		if (!key || key in errors) continue;
		if (!issue.message || issue.message === "Invalid input") continue;
		errors[key] = issue.message;
	}
	return errors;
}
function validateForm(schema, values) {
	const result = schema.safeParse(values);
	if (result.success) return {
		success: true,
		data: result.data
	};
	return {
		success: false,
		errors: mapFieldErrors(result.error)
	};
}
var emailField = stringType().trim().min(1, "Email is required").max(FIELD_LIMITS.EMAIL_MAX, "Email cannot exceed 100 characters").refine((value) => !value || FIELD_LIMITS.EMAIL_REGEX.test(value), { message: EMAIL_INVALID_MESSAGE });
var optionalEmailField = unionType([literalType(""), stringType().trim().max(FIELD_LIMITS.EMAIL_MAX, "Email cannot exceed 100 characters").refine((value) => FIELD_LIMITS.EMAIL_REGEX.test(value), { message: EMAIL_INVALID_MESSAGE })]);
var customerEmailField = stringType().trim().min(1, "Email is required").max(FIELD_LIMITS.EMAIL_MAX, "Email cannot exceed 100 characters").refine((value) => isValidCustomerEmail(value), { message: EMAIL_INVALID_MESSAGE });
var optionalCustomerEmailField = stringType().trim().max(FIELD_LIMITS.EMAIL_MAX, "Email cannot exceed 100 characters").refine((value) => value === "" || isValidCustomerEmail(value), { message: EMAIL_INVALID_MESSAGE });
var companyNameField = stringType().refine((value) => !(value.length > 0 && value.trim() === ""), { message: WHITESPACE_INVALID_MESSAGE }).refine((value) => value.trim().length > 0, { message: "Company name is required" }).refine((value) => !/\s{2,}/.test(value), { message: WHITESPACE_INVALID_MESSAGE }).transform((value) => value.trim());
var projectNameField = stringType().refine((value) => !(value.length > 0 && value.trim() === ""), { message: WHITESPACE_INVALID_MESSAGE }).refine((value) => value.trim().length > 0, { message: "Project name is required" }).refine((value) => value.trim().length <= FIELD_LIMITS.PROJECT_NAME_MAX, { message: `Project name cannot exceed ${FIELD_LIMITS.PROJECT_NAME_MAX} characters` }).refine((value) => !/\s{2,}/.test(value.trim()), { message: WHITESPACE_INVALID_MESSAGE }).transform((value) => value.trim());
function internationalPhoneField(required = false) {
	let schema = stringType().trim();
	if (required) schema = schema.min(1, "Mobile number is required");
	return schema.refine((value) => isValidInternationalPhone(value), { message: INTERNATIONAL_PHONE_INVALID_MESSAGE });
}
var optionalWebsiteField = stringType().trim().refine((value) => isValidWebsiteUrl(value), { message: WEBSITE_INVALID_MESSAGE });
function noConsecutiveSpaces(value) {
	return value.trim() === "" || !/\s{2,}/.test(value);
}
var optionalTextField = stringType().refine((value) => !(value.length > 0 && value.trim() === ""), { message: WHITESPACE_INVALID_MESSAGE }).refine(noConsecutiveSpaces, { message: WHITESPACE_INVALID_MESSAGE }).transform((value) => value.trim());
var employeeIdField = stringType().refine((value) => value === "" || (!value.trim() ? false : !/\s/.test(value)), { message: WHITESPACE_INVALID_MESSAGE }).transform((value) => value.trim());
function personNameField(label = "Name", required = true) {
	const contentRules = stringType().min(FIELD_LIMITS.NAME_MIN, `${label} must be at least 3 characters`).max(FIELD_LIMITS.NAME_MAX, NAME_MAX_MESSAGE).refine((value) => FIELD_LIMITS.NAME_REGEX.test(value), { message: `${label} can only contain letters and spaces` });
	const schema = stringType().refine((value) => !(value.length > 0 && value.trim() === ""), { message: WHITESPACE_INVALID_MESSAGE }).refine((value) => !required || value.trim().length > 0, { message: `${label} is required` }).refine((value) => value.trim() === "" || !/\s{2,}/.test(value), { message: WHITESPACE_INVALID_MESSAGE }).transform((value) => value.trim());
	if (required) return schema.pipe(contentRules);
	return schema.pipe(unionType([literalType(""), contentRules]));
}
function titleField(required = false) {
	const contentRules = stringType().min(FIELD_LIMITS.TITLE_MIN, "Title must be at least 3 characters").max(FIELD_LIMITS.TITLE_MAX, "Title cannot exceed 100 characters");
	if (required) return stringType().trim().min(1, "Title is required").pipe(contentRules);
	return stringType().trim().pipe(unionType([literalType(""), contentRules]));
}
function mobileField(required = true) {
	let schema = stringType().trim();
	if (required) schema = schema.min(1, "Mobile number is required");
	return schema.refine((value) => value === "" || FIELD_LIMITS.MOBILE_REGEX.test(normalizeMobileInput(value)), { message: MOBILE_INVALID_MESSAGE }).transform((value) => value === "" ? "" : normalizeMobileInput(value));
}
function contactMobileField() {
	return stringType().trim().refine((value) => value === "" || normalizeMobileInput(value).length <= FIELD_LIMITS.MOBILE_MAX_DIGITS, { message: CONTACT_MOBILE_LENGTH_ERROR }).transform((value) => value === "" ? "" : normalizeMobileInput(value));
}
var subjectField = stringType().trim().min(FIELD_LIMITS.SUBJECT_MIN, "Subject must be at least 3 characters").max(FIELD_LIMITS.SUBJECT_MAX, "Subject cannot exceed 250 characters");
var customerCreateSchema = objectType({
	companyName: companyNameField,
	email: optionalCustomerEmailField,
	phone: internationalPhoneField(false),
	website: optionalWebsiteField,
	address: optionalTextField,
	city: optionalTextField,
	state: optionalTextField,
	postalCode: optionalTextField,
	country: optionalTextField,
	contactName: personNameField("Name"),
	contactEmail: customerEmailField,
	contactMobile: internationalPhoneField(false),
	contactTitle: titleField(false)
});
var customerEditSchema = objectType({
	companyName: companyNameField,
	email: optionalCustomerEmailField,
	phone: internationalPhoneField(false),
	website: optionalWebsiteField,
	address: optionalTextField,
	city: optionalTextField,
	state: optionalTextField,
	postalCode: optionalTextField,
	country: optionalTextField
});
var projectFormSchema = objectType({
	name: projectNameField,
	customerId: stringType().min(1, "Customer is required"),
	startDate: stringType().min(1, "Start date is required"),
	maxHours: stringType().trim().min(1, "Maximum hours is required").refine((value) => Number(value) > 0, "Maximum hours must be greater than zero").refine((value) => Number.isInteger(Number(value)), "Maximum hours must be a whole number"),
	endDate: stringType()
}).refine((data) => !data.endDate || data.startDate <= data.endDate, {
	message: "End date cannot be before start date",
	path: ["endDate"]
});
var contactFormSchema = objectType({
	name: personNameField("Name"),
	email: customerEmailField,
	mobile: contactMobileField(),
	jobTitle: titleField(false)
});
var createTicketSchema = objectType({
	subject: subjectField,
	projectId: stringType().min(1, "Select a project"),
	categoryId: stringType().min(1, "Select a category"),
	description: stringType().trim().min(20, "Please describe the issue in at least 20 characters").max(4e3, "Description cannot exceed 4000 characters")
});
var internalUserSchema = objectType({
	firstName: personNameField("First name"),
	lastName: personNameField("Last name"),
	email: emailField,
	phone: mobileField(),
	address: optionalTextField,
	employeeId: employeeIdField
});
var profilePhoneSchema = objectType({ phone: mobileField(false) });
var companySettingsSchema = objectType({
	companyName: stringType().trim().min(1, "Company name is required"),
	supportEmail: optionalEmailField,
	contactNumber: mobileField(false)
});
var loginSchema = objectType({
	email: emailField,
	password: stringType().min(1, "Password is required")
});
var forgotPasswordSchema = objectType({ email: emailField });
var activateAccountSchema = objectType({
	password: stringType().refine(passwordValid, "Your password does not meet all requirements"),
	confirm: stringType().min(1, "Please confirm your password")
}).refine((data) => data.password === data.confirm, {
	message: "Passwords do not match",
	path: ["confirm"]
});
var changePasswordSchema = objectType({
	currentPassword: stringType().min(1, "Current password is required"),
	newPassword: stringType().refine(passwordValid, "Your password does not meet all requirements"),
	confirm: stringType().min(1, "Please confirm your new password")
}).refine((data) => data.newPassword === data.confirm, {
	message: "Passwords do not match",
	path: ["confirm"]
});
function mapContactApiFieldErrors(fieldErrors) {
	const mapped = {};
	for (const [key, message] of Object.entries(fieldErrors)) {
		if (key === "contactEmail") {
			mapped.email = message;
			continue;
		}
		mapped[key] = message;
	}
	return mapped;
}
function mapCustomerApiFieldErrors(fieldErrors) {
	const mapped = {};
	for (const [key, message] of Object.entries(fieldErrors)) {
		if (key === "primaryContact.email") {
			mapped.contactEmail = message;
			continue;
		}
		mapped[key] = message;
	}
	return mapped;
}
function mapInternalUserApiFieldErrors(fieldErrors) {
	const mapped = {};
	for (const [key, message] of Object.entries(fieldErrors)) {
		if (key === "mobile") {
			mapped.phone = message;
			continue;
		}
		mapped[key] = message;
	}
	return mapped;
}
var resetPasswordSchema = objectType({
	password: stringType().refine(passwordValid, "Your password does not meet all requirements"),
	confirm: stringType().min(1, "Please confirm your password")
}).refine((data) => data.password === data.confirm, {
	message: "Passwords do not match",
	path: ["confirm"]
});
//#endregion
export { loginSchema as A, forgotPasswordSchema as C, internalUserSchema as D, hasConsecutiveSpaces as E, projectFormSchema as F, resetPasswordSchema as I, validateForm as L, mapCustomerApiFieldErrors as M, mapInternalUserApiFieldErrors as N, isValidMobilePrefix as O, profilePhoneSchema as P, focusFirstInvalidField as S, hasAnyWhitespace as T, createTicketSchema as _, PasswordInput as a, ddMmYyyyToIso as b, changePasswordSchema as c, constrainDdMmYyyyInput as d, constrainFreeTextInput as f, contactFormSchema as g, constrainPersonNameInput as h, PasswordField as i, mapContactApiFieldErrors as j, isoToDdMmYyyy as k, companySettingsSchema as l, constrainMobileInput as m, FieldLabel as n, PasswordStrength as o, constrainInternationalPhoneInput as p, FormField as r, activateAccountSchema as s, FIELD_LIMITS as t, constrainContactMobileInput as u, customerCreateSchema as v, getZodErrorMessage as w, fieldInputClass as x, customerEditSchema as y };
