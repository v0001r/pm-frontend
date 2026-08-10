import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { m as TableSkeleton } from "./primitives-CPmujTLD.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { O as Switch, Tt as updateCustomer, vt as createCustomer, yt as fetchCustomer } from "./router-CtVrCs4M.mjs";
import { t as Label } from "./label-cyeiyrNV.mjs";
import { t as Input } from "./input-DantDJEY.mjs";
import { a as fieldInputClass, n as FormField } from "./password-CG809Zkb.mjs";
import { a as customerCreateSchema, f as validateForm, o as customerEditSchema } from "./form-validation-n0pRSGP6.mjs";
import { t as FormActions } from "./form-actions-D3Bj8QF1.mjs";
import { t as FormSheet } from "./form-sheet-RyuhCokR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer-form-sheet-D2Fux76g.js
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
	const [errors, setErrors] = (0, import_react.useState)({});
	function clearError(field) {
		setErrors((current) => {
			if (!current[field]) return current;
			const next = { ...current };
			delete next[field];
			return next;
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-5",
		noValidate: true,
		onSubmit: async (event) => {
			event.preventDefault();
			const validation = validateForm(isEdit ? customerEditSchema : customerCreateSchema, isEdit ? {
				companyName,
				email
			} : {
				companyName,
				email,
				contactName,
				contactEmail
			});
			if (!validation.success) {
				setErrors(validation.errors);
				return;
			}
			setErrors({});
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Company name",
						error: errors.companyName,
						className: "sm:col-span-2",
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: companyName,
							onChange: (e) => {
								setCompanyName(e.target.value);
								clearError("companyName");
							},
							className: fieldInputClass(errors.companyName)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Organization email",
						error: errors.email,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: email,
							onChange: (e) => {
								setEmail(e.target.value);
								clearError("email");
							},
							className: fieldInputClass(errors.email)
						})
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Name",
							error: errors.contactName,
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: contactName,
								onChange: (e) => {
									setContactName(e.target.value);
									clearError("contactName");
								},
								className: fieldInputClass(errors.contactName)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Job title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: contactTitle,
								onChange: (e) => setContactTitle(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Email",
							error: errors.contactEmail,
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: contactEmail,
								onChange: (e) => {
									setContactEmail(e.target.value);
									clearError("contactEmail");
								},
								className: fieldInputClass(errors.contactEmail)
							})
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
function CustomerFormSheet({ open, onOpenChange, mode, customerId, onSaved }) {
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery({
		queryKey: ["customer", customerId],
		queryFn: () => fetchCustomer(customerId),
		enabled: mode === "edit" && !!customerId && open
	});
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ["customers"] });
		if (customerId) {
			queryClient.invalidateQueries({ queryKey: ["customer", customerId] });
			queryClient.invalidateQueries({ queryKey: ["customer-overview", customerId] });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSheet, {
		open,
		onOpenChange,
		title: mode === "create" ? "New customer" : `Edit ${data?.companyName ?? "customer"}`,
		description: mode === "create" ? "Create an organization and primary contact." : data?.customerId ?? "Update customer information.",
		children: mode === "edit" && isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
			rows: 8,
			cols: 2
		}) : mode === "edit" && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Unable to load customer."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerForm, {
			isEdit: mode === "edit",
			initial: mode === "edit" ? data : void 0,
			submitLabel: mode === "create" ? "Create customer" : "Save changes",
			onCancel: () => onOpenChange(false),
			onSubmit: async (payload) => {
				try {
					if (mode === "create") {
						const customer = await createCustomer(payload);
						invalidate();
						toast.success(`${customer.companyName} created.`);
						onOpenChange(false);
						onSaved?.(customer._id);
					} else if (customerId) {
						await updateCustomer(customerId, payload);
						invalidate();
						toast.success("Customer updated.");
						onOpenChange(false);
						onSaved?.(customerId);
					}
				} catch (error) {
					toast.error(getApiErrorMessage(error, mode === "create" ? "Failed to create customer" : "Failed to update customer"));
					throw error;
				}
			}
		}, mode === "edit" ? customerId : "create")
	});
}
//#endregion
export { CustomerFormSheet as t };
