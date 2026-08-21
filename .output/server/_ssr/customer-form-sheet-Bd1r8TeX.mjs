import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as getApiFieldErrors, u as getApiErrorMessage } from "./button-Du-Bk9Wl.mjs";
import { m as TableSkeleton, n as Input } from "./primitives-BE889lfB.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { St as Label, ct as fetchCustomer, mt as updateCustomer, ot as createCustomer } from "./router-DC97nFe7.mjs";
import { E as hasConsecutiveSpaces, M as mapCustomerApiFieldErrors, S as focusFirstInvalidField, p as constrainInternationalPhoneInput, r as FormField, t as FIELD_LIMITS, v as customerCreateSchema, x as fieldInputClass, y as customerEditSchema } from "./form-validation-CtBmYCtB.mjs";
import { t as Switch } from "./switch-BncIaIFJ.mjs";
import { t as FormActions } from "./form-actions-glquDVsK.mjs";
import { t as useZodForm } from "./use-zod-form-Dm4FjREe.mjs";
import { t as FormSheet } from "./form-sheet-CicRVy3u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer-form-sheet-Bd1r8TeX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomerForm({ initial, onSubmit, onCancel, submitLabel = "Save customer", isEdit = false }) {
	const { errors, handleBlur, handleChange, setFieldErrors, clearAllErrors, validateAll } = useZodForm(isEdit ? customerEditSchema : customerCreateSchema);
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
	function formValues() {
		const addressFields = {
			address,
			city,
			state,
			postalCode,
			country
		};
		return isEdit ? {
			companyName,
			email,
			phone,
			website,
			...addressFields
		} : {
			companyName,
			email,
			phone,
			website,
			...addressFields,
			contactName,
			contactEmail,
			contactMobile,
			contactTitle
		};
	}
	function fieldHandlers(field, setter) {
		return {
			onChange: (e) => {
				if (submitting) return;
				let next = e.target.value;
				if (field === "phone" || field === "contactMobile") next = constrainInternationalPhoneInput(next);
				setter(next);
				if (field === "companyName" && hasConsecutiveSpaces(next)) {
					handleBlur(field, next);
					return;
				}
				handleChange(field, next);
			},
			onBlur: (e) => {
				if (submitting) return;
				const next = e.target.value.trim();
				setter(next);
				handleBlur(field, next);
			}
		};
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-5",
		noValidate: true,
		onSubmit: async (event) => {
			event.preventDefault();
			const validation = validateAll(formValues());
			if (!validation.success) {
				focusFirstInvalidField(validation.errors, [
					"companyName",
					"email",
					"phone",
					"website",
					"address",
					"city",
					"state",
					"postalCode",
					"country",
					"contactName",
					"contactTitle",
					"contactEmail",
					"contactMobile"
				]);
				return;
			}
			setSubmitting(true);
			try {
				if (isEdit) {
					const data = validation.data;
					await onSubmit({
						companyName: data.companyName.trim(),
						email: data.email.trim() || void 0,
						phone: data.phone || void 0,
						address: data.address || void 0,
						city: data.city || void 0,
						state: data.state || void 0,
						postalCode: data.postalCode || void 0,
						country: data.country || void 0,
						website: data.website || void 0,
						portalEnabled
					});
				} else {
					const data = validation.data;
					await onSubmit({
						companyName: data.companyName.trim(),
						email: data.email.trim() || void 0,
						phone: data.phone || void 0,
						address: data.address || void 0,
						city: data.city || void 0,
						state: data.state || void 0,
						postalCode: data.postalCode || void 0,
						country: data.country || void 0,
						website: data.website || void 0,
						portalEnabled,
						primaryContact: {
							name: data.contactName,
							email: data.contactEmail,
							mobile: data.contactMobile || void 0,
							jobTitle: data.contactTitle || void 0
						}
					});
				}
				clearAllErrors();
			} catch (error) {
				const fieldErrors = mapCustomerApiFieldErrors(getApiFieldErrors(error));
				if (Object.keys(fieldErrors).length > 0) {
					setFieldErrors(fieldErrors);
					focusFirstInvalidField(fieldErrors, [
						"companyName",
						"email",
						"phone",
						"website",
						"address",
						"city",
						"state",
						"postalCode",
						"country",
						"contactName",
						"contactTitle",
						"contactEmail",
						"contactMobile"
					]);
					return;
				}
				throw error;
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
						htmlFor: "companyName",
						error: errors.companyName,
						className: "sm:col-span-2",
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "companyName",
							value: companyName,
							...fieldHandlers("companyName", setCompanyName),
							"aria-invalid": Boolean(errors.companyName),
							"aria-describedby": errors.companyName ? "companyName-error" : void 0,
							className: fieldInputClass(errors.companyName)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Organization email",
						htmlFor: "email",
						error: errors.email,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "text",
							inputMode: "email",
							autoComplete: "email",
							spellCheck: false,
							maxLength: FIELD_LIMITS.EMAIL_MAX,
							value: email,
							...fieldHandlers("email", setEmail),
							"aria-invalid": Boolean(errors.email),
							"aria-describedby": errors.email ? "email-error" : void 0,
							className: fieldInputClass(errors.email)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Phone",
						htmlFor: "phone",
						error: errors.phone,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "phone",
							type: "text",
							inputMode: "tel",
							autoComplete: "tel",
							value: phone,
							...fieldHandlers("phone", setPhone),
							placeholder: "+14155552671",
							"aria-invalid": Boolean(errors.phone),
							"aria-describedby": errors.phone ? "phone-error" : void 0,
							className: fieldInputClass(errors.phone)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Address",
						htmlFor: "address",
						error: errors.address,
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "address",
							value: address,
							...fieldHandlers("address", setAddress),
							"aria-invalid": Boolean(errors.address),
							"aria-describedby": errors.address ? "address-error" : void 0,
							className: fieldInputClass(errors.address)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Postal code",
						htmlFor: "postalCode",
						error: errors.postalCode,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "postalCode",
							value: postalCode,
							...fieldHandlers("postalCode", setPostalCode),
							"aria-invalid": Boolean(errors.postalCode),
							"aria-describedby": errors.postalCode ? "postalCode-error" : void 0,
							className: fieldInputClass(errors.postalCode)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Country",
						htmlFor: "country",
						error: errors.country,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "country",
							value: country,
							...fieldHandlers("country", setCountry),
							"aria-invalid": Boolean(errors.country),
							"aria-describedby": errors.country ? "country-error" : void 0,
							className: fieldInputClass(errors.country)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "State",
						htmlFor: "state",
						error: errors.state,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "state",
							value: state,
							...fieldHandlers("state", setState),
							"aria-invalid": Boolean(errors.state),
							"aria-describedby": errors.state ? "state-error" : void 0,
							className: fieldInputClass(errors.state)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "City",
						htmlFor: "city",
						error: errors.city,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "city",
							value: city,
							...fieldHandlers("city", setCity),
							"aria-invalid": Boolean(errors.city),
							"aria-describedby": errors.city ? "city-error" : void 0,
							className: fieldInputClass(errors.city)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Website",
						htmlFor: "website",
						error: errors.website,
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "website",
							type: "text",
							inputMode: "url",
							autoComplete: "url",
							value: website,
							...fieldHandlers("website", setWebsite),
							placeholder: "https://example.com",
							"aria-invalid": Boolean(errors.website),
							"aria-describedby": errors.website ? "website-error" : void 0,
							className: fieldInputClass(errors.website)
						})
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
							htmlFor: "contactName",
							error: errors.contactName,
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "contactName",
								value: contactName,
								...fieldHandlers("contactName", setContactName),
								maxLength: FIELD_LIMITS.NAME_MAX,
								"aria-invalid": Boolean(errors.contactName),
								"aria-describedby": errors.contactName ? "contactName-error" : void 0,
								className: fieldInputClass(errors.contactName)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Job title",
							htmlFor: "contactTitle",
							error: errors.contactTitle,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "contactTitle",
								value: contactTitle,
								...fieldHandlers("contactTitle", setContactTitle),
								maxLength: FIELD_LIMITS.TITLE_MAX,
								"aria-invalid": Boolean(errors.contactTitle),
								"aria-describedby": errors.contactTitle ? "contactTitle-error" : void 0,
								className: fieldInputClass(errors.contactTitle)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Email",
							htmlFor: "contactEmail",
							error: errors.contactEmail,
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "contactEmail",
								type: "text",
								inputMode: "email",
								autoComplete: "email",
								spellCheck: false,
								maxLength: FIELD_LIMITS.EMAIL_MAX,
								value: contactEmail,
								...fieldHandlers("contactEmail", setContactEmail),
								"aria-invalid": Boolean(errors.contactEmail),
								"aria-describedby": errors.contactEmail ? "contactEmail-error" : void 0,
								className: fieldInputClass(errors.contactEmail)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Mobile",
							htmlFor: "contactMobile",
							error: errors.contactMobile,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "contactMobile",
								type: "text",
								inputMode: "tel",
								autoComplete: "tel",
								value: contactMobile,
								...fieldHandlers("contactMobile", setContactMobile),
								placeholder: "+14155552671",
								"aria-invalid": Boolean(errors.contactMobile),
								"aria-describedby": errors.contactMobile ? "contactMobile-error" : void 0,
								className: fieldInputClass(errors.contactMobile)
							})
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
					if (Object.keys(getApiFieldErrors(error)).length === 0) toast.error(getApiErrorMessage(error, mode === "create" ? "Failed to create customer" : "Failed to update customer"));
					throw error;
				}
			}
		}, mode === "edit" ? customerId : "create")
	});
}
//#endregion
export { CustomerFormSheet as t };
