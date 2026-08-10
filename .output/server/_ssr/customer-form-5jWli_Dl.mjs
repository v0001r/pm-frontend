import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { t as Label } from "./label-BZKlnMd2.mjs";
import { t as FormActions } from "./form-actions-6tK-7ehz.mjs";
import { t as Switch } from "./switch-BQW7U6lF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer-form-5jWli_Dl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomerForm({ initial, onSubmit, onCancel, submitLabel = "Save customer", isEdit = false }) {
	const [companyName, setCompanyName] = (0, import_react.useState)(initial?.companyName ?? initial?.name ?? "");
	const [email, setEmail] = (0, import_react.useState)(initial?.email ?? "");
	const [phone, setPhone] = (0, import_react.useState)(initial?.phone ?? "");
	const [address, setAddress] = (0, import_react.useState)(initial?.address ?? "");
	const [city, setCity] = (0, import_react.useState)(initial?.city ?? "");
	const [state, setState] = (0, import_react.useState)(initial?.state ?? "");
	const [postalCode, setPostalCode] = (0, import_react.useState)(initial?.postalCode ?? "");
	const [country, setCountry] = (0, import_react.useState)(initial?.country ?? "");
	const [website, setWebsite] = (0, import_react.useState)(initial?.website ?? "");
	const [portalEnabled, setPortalEnabled] = (0, import_react.useState)(initial?.portalEnabled ?? true);
	const [contactName, setContactName] = (0, import_react.useState)(initial?.primaryContactName ?? "");
	const [contactEmail, setContactEmail] = (0, import_react.useState)(initial?.primaryContactEmail ?? "");
	const [contactMobile, setContactMobile] = (0, import_react.useState)(initial?.primaryContactMobile ?? "");
	const [contactTitle, setContactTitle] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-5",
		onSubmit: async (event) => {
			event.preventDefault();
			setSubmitting(true);
			try {
				if (isEdit) await onSubmit({
					companyName: companyName.trim(),
					email: email.trim() || void 0,
					phone,
					address,
					city,
					state,
					postalCode,
					country,
					website: website || void 0,
					portalEnabled
				});
				else await onSubmit({
					companyName: companyName.trim(),
					email: email.trim() || void 0,
					phone,
					address,
					city,
					state,
					postalCode,
					country,
					website: website || void 0,
					portalEnabled,
					primaryContact: {
						name: contactName.trim(),
						email: contactEmail.trim(),
						mobile: contactMobile,
						jobTitle: contactTitle
					}
				});
			} finally {
				setSubmitting(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Company name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: companyName,
							onChange: (e) => setCompanyName(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Organization email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: phone,
							onChange: (e) => setPhone(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: address,
							onChange: (e) => setAddress(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "City" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: city,
							onChange: (e) => setCity(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "State" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: state,
							onChange: (e) => setState(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Postal code" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: postalCode,
							onChange: (e) => setPostalCode(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Country" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: country,
							onChange: (e) => setCountry(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Website" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: website,
							onChange: (e) => setWebsite(e.target.value),
							placeholder: "https://example.com"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: portalEnabled,
							onCheckedChange: setPortalEnabled,
							id: "portal-enabled"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "portal-enabled",
							children: "Enable customer portal"
						})]
					})
				]
			}),
			!isEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm font-medium",
					children: "Primary contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: contactName,
								onChange: (e) => setContactName(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Job title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: contactTitle,
								onChange: (e) => setContactTitle(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								value: contactEmail,
								onChange: (e) => setContactEmail(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mobile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: contactMobile,
								onChange: (e) => setContactMobile(e.target.value)
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				submitLabel,
				submitting,
				submittingLabel: "Saving…",
				onCancel
			})
		]
	});
}
//#endregion
export { CustomerForm as t };
