import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as cn, d as getApiFieldErrors, n as Button, u as getApiErrorMessage } from "./button-Du-Bk9Wl.mjs";
import { lt as Check, nt as ChevronsUpDown } from "../_libs/lucide-react.mjs";
import { _ as fullName, m as TableSkeleton, n as Input } from "./primitives-BE889lfB.mjs";
import { c as PopoverContent, l as PopoverTrigger, s as Popover } from "./store-Cwl19Diw.mjs";
import { C as SelectTrigger, S as SelectItem, b as Select, w as SelectValue, x as SelectContent } from "./data-table-CNAlrDoP.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { K as fetchEmployees, St as Label } from "./router-DC97nFe7.mjs";
import { D as internalUserSchema, E as hasConsecutiveSpaces, N as mapInternalUserApiFieldErrors, O as isValidMobilePrefix, S as focusFirstInvalidField, T as hasAnyWhitespace, a as PasswordInput, b as ddMmYyyyToIso, d as constrainDdMmYyyyInput, f as constrainFreeTextInput, h as constrainPersonNameInput, k as isoToDdMmYyyy, m as constrainMobileInput, r as FormField, t as FIELD_LIMITS, x as fieldInputClass } from "./form-validation-CtBmYCtB.mjs";
import { t as FormActions } from "./form-actions-glquDVsK.mjs";
import { t as useZodForm } from "./use-zod-form-Dm4FjREe.mjs";
import { t as FormSheet } from "./form-sheet-CicRVy3u.mjs";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command$1 } from "./command-BFBytP_t.mjs";
import { n as fetchDesignations, r as fetchTeams, t as fetchDepartments } from "./org-CS5p3MIU.mjs";
import { r as fetchInternalUser, t as createInternalUser, u as updateInternalUser } from "./internal-users-U1g-KNWR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-activation-Bd6UdQZr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FormSection({ title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 rounded-md border border-border/60 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-foreground",
			children: title
		}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-xs text-muted-foreground",
			children: description
		}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children
		})]
	});
}
function managerId(user) {
	return user.id || user._id || "";
}
function ReportingManagerSearch({ value, onChange, managers, excludeIds }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const eligible = (0, import_react.useMemo)(() => {
		const active = managers.filter((manager) => {
			const id = managerId(manager);
			if (!id || excludeIds.includes(id)) return false;
			return manager.status === "Active";
		});
		const selectedManager = managers.find((manager) => managerId(manager) === value);
		if (selectedManager && !active.some((manager) => managerId(manager) === value)) return [selectedManager, ...active];
		return active;
	}, [
		managers,
		excludeIds,
		value
	]);
	const selected = managers.find((manager) => managerId(manager) === value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		modal: true,
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				role: "combobox",
				"aria-expanded": open,
				"aria-label": "Reporting manager",
				className: "h-9 w-full justify-between font-normal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("truncate", !selected && "text-muted-foreground"),
					children: selected ? fullName(selected) : value ? "Selected manager" : "Search reporting manager"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "ml-2 size-4 shrink-0 opacity-50" })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			className: "z-70 w-(--radix-popover-trigger-width) p-0",
			align: "start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "Search by name, email or employee ID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "No matching users found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
				value: "none",
				onSelect: () => {
					onChange("");
					setOpen(false);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("size-4", value ? "opacity-0" : "opacity-100") }), "None"]
			}), eligible.map((manager) => {
				const id = managerId(manager);
				const name = fullName(manager);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
					value: `${name} ${manager.email} ${manager.employeeId ?? ""} ${id}`,
					onSelect: () => {
						onChange(id);
						setOpen(false);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("size-4", value === id ? "opacity-100" : "opacity-0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-xs text-muted-foreground",
							children: [manager.employeeId, manager.email].filter(Boolean).join(" · ")
						})]
					})]
				}, id);
			})] })] })] })
		})]
	});
}
function InternalUserForm({ initial, mode, onSubmit, onCancel, submitLabel = mode === "create" ? "Create user" : "Save changes" }) {
	const isEdit = mode === "edit";
	const { errors, handleBlur, handleChange, setFieldErrors, validateAll } = useZodForm(internalUserSchema);
	const [firstName, setFirstName] = (0, import_react.useState)(initial?.firstName ?? "");
	const [lastName, setLastName] = (0, import_react.useState)(initial?.lastName ?? "");
	const [email, setEmail] = (0, import_react.useState)(initial?.email ?? "");
	const [phone, setPhone] = (0, import_react.useState)(initial?.phone ?? "");
	const [address, setAddress] = (0, import_react.useState)(initial?.address ?? "");
	const [gender, setGender] = (0, import_react.useState)(initial?.gender ?? "");
	const [employeeId, setEmployeeId] = (0, import_react.useState)(initial?.employeeId ?? "");
	const [departmentId, setDepartmentId] = (0, import_react.useState)(initial?.departmentId ?? "");
	const [designationId, setDesignationId] = (0, import_react.useState)(initial?.designationId ?? "");
	const [teamId, setTeamId] = (0, import_react.useState)(initial?.teamId ?? "");
	const [reportingManagerId, setReportingManagerId] = (0, import_react.useState)(initial?.reportingManagerId ?? "");
	const [dateOfJoining, setDateOfJoining] = (0, import_react.useState)(initial?.dateOfJoining ? isoToDdMmYyyy(initial.dateOfJoining) : "");
	const [role, setRole] = (0, import_react.useState)(initial?.role ?? "Staff");
	const [status, setStatus] = (0, import_react.useState)(initial?.status ?? "Active");
	const [temporaryPassword, setTemporaryPassword] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [dateError, setDateError] = (0, import_react.useState)("");
	const departmentsQuery = useQuery({
		queryKey: ["departments"],
		queryFn: fetchDepartments,
		enabled: isEdit
	});
	const designationsQuery = useQuery({
		queryKey: ["designations", departmentId],
		queryFn: () => fetchDesignations(departmentId || void 0),
		enabled: isEdit && Boolean(departmentId)
	});
	const teamsQuery = useQuery({
		queryKey: ["teams", departmentId],
		queryFn: () => fetchTeams(departmentId || void 0),
		enabled: isEdit && Boolean(departmentId)
	});
	const managersQuery = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees
	});
	(0, import_react.useEffect)(() => {
		if (!isEdit || departmentId) return;
		setDesignationId("");
		setTeamId("");
	}, [departmentId, isEdit]);
	function fieldHandlers(field, setter) {
		return {
			onChange: (e) => {
				let next = e.target.value;
				if (field === "firstName" || field === "lastName") {
					next = constrainPersonNameInput(next);
					if (next.length > FIELD_LIMITS.NAME_MAX) {
						setter(next.slice(0, FIELD_LIMITS.NAME_MAX));
						handleBlur(field, next);
						return;
					}
				} else if (field === "email") next = constrainFreeTextInput(next);
				setter(next);
				if (field === "employeeId") {
					if (next.length > 0 && (next.trim() === "" || hasAnyWhitespace(next))) {
						handleBlur(field, next);
						return;
					}
				} else if (field === "address") {
					if (next.length > 0 && (next.trim() === "" || hasConsecutiveSpaces(next))) {
						handleBlur(field, next);
						return;
					}
				} else if (hasConsecutiveSpaces(next)) {
					handleBlur(field, next);
					return;
				}
				handleChange(field, next);
			},
			onBlur: (e) => {
				const raw = e.target.value;
				if (field === "employeeId") {
					if (raw.length > 0 && (raw.trim() === "" || hasAnyWhitespace(raw))) {
						handleBlur(field, raw);
						return;
					}
				}
				if (field === "address") {
					if (raw.length > 0 && (raw.trim() === "" || hasConsecutiveSpaces(raw))) {
						handleBlur(field, raw);
						return;
					}
				}
				const next = raw.trim();
				setter(next);
				handleBlur(field, next);
			}
		};
	}
	function onPhoneChange(raw) {
		const digits = constrainMobileInput(raw);
		if (!isValidMobilePrefix(digits)) {
			handleBlur("phone", digits);
			return;
		}
		setPhone(digits);
		if (digits.length === FIELD_LIMITS.MOBILE_LENGTH) {
			handleBlur("phone", digits);
			return;
		}
		if (digits.length > 0 && errors["phone"]) {
			handleBlur("phone", digits);
			return;
		}
		handleChange("phone", digits);
	}
	function onPhoneKeyDown(event) {
		if (event.ctrlKey || event.metaKey || event.altKey) return;
		if ([
			"Backspace",
			"Delete",
			"ArrowLeft",
			"ArrowRight",
			"Tab",
			"Home",
			"End"
		].includes(event.key)) return;
		if (!/^\d$/.test(event.key)) {
			event.preventDefault();
			return;
		}
		const input = event.currentTarget;
		const start = input.selectionStart ?? 0;
		const end = input.selectionEnd ?? 0;
		const nextDigits = `${phone.slice(0, start)}${event.key}${phone.slice(end)}`.replace(/\D/g, "");
		if (nextDigits.length > 0 && !/^[6-9]/.test(nextDigits)) {
			event.preventDefault();
			handleBlur("phone", nextDigits);
			return;
		}
		if (phone.length >= FIELD_LIMITS.MOBILE_LENGTH && end === start) event.preventDefault();
	}
	function onPhonePaste(event) {
		event.preventDefault();
		onPhoneChange(event.clipboardData.getData("text"));
	}
	function onJoiningDateChange(raw) {
		const next = constrainDdMmYyyyInput(raw);
		setDateOfJoining(next);
		if (!dateError) return;
		setDateError(next === "" || ddMmYyyyToIso(next) ? "" : "Please enter a valid date as DD-MM-YYYY");
	}
	function joiningDateIso() {
		if (!dateOfJoining.trim()) return "";
		return ddMmYyyyToIso(dateOfJoining);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-5",
		noValidate: true,
		onSubmit: async (event) => {
			event.preventDefault();
			const isoJoiningDate = joiningDateIso();
			if (dateOfJoining.trim() && !isoJoiningDate) {
				setDateError("Please enter a valid date as DD-MM-YYYY");
				focusFirstInvalidField({ dateOfJoining: "invalid" }, ["dateOfJoining"]);
				return;
			}
			setDateError("");
			const validation = validateAll({
				firstName,
				lastName,
				email,
				phone,
				address,
				employeeId
			});
			if (!validation.success) {
				focusFirstInvalidField(validation.errors, [
					"firstName",
					"lastName",
					"email",
					"phone",
					"address",
					"employeeId",
					"dateOfJoining"
				]);
				return;
			}
			const { firstName: validFirstName, lastName: validLastName, email: validEmail, phone: validPhone, address: validAddress, employeeId: validEmployeeId } = validation.data;
			const optionalOrNull = (value) => value.trim() ? value : null;
			setSubmitting(true);
			try {
				if (mode === "create") await onSubmit({
					firstName: validFirstName,
					lastName: validLastName,
					email: validEmail,
					phone: validPhone,
					address: validAddress || void 0,
					gender: gender || void 0,
					employeeId: validEmployeeId || void 0,
					reportingManagerId: reportingManagerId || void 0,
					dateOfJoining: isoJoiningDate || void 0,
					role,
					status,
					temporaryPassword: temporaryPassword.trim() || void 0,
					sendInvitation: true
				});
				else await onSubmit({
					firstName: validFirstName,
					lastName: validLastName,
					email: validEmail,
					phone: validPhone,
					address: optionalOrNull(validAddress),
					gender: optionalOrNull(gender),
					employeeId: optionalOrNull(validEmployeeId),
					departmentId: departmentId || void 0,
					designationId: designationId || void 0,
					teamId: teamId || void 0,
					reportingManagerId: reportingManagerId || null,
					dateOfJoining: optionalOrNull(isoJoiningDate),
					role,
					status
				});
			} catch (error) {
				const fieldErrors = mapInternalUserApiFieldErrors(getApiFieldErrors(error));
				if (Object.keys(fieldErrors).length > 0) {
					setFieldErrors(fieldErrors);
					focusFirstInvalidField(fieldErrors, [
						"firstName",
						"lastName",
						"email",
						"phone",
						"address",
						"employeeId",
						"dateOfJoining"
					]);
					return;
				}
				throw error;
			} finally {
				setSubmitting(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormSection, {
				title: "Personal information",
				description: "Name, email and contact details",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "First name",
						htmlFor: "firstName",
						error: errors.firstName,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "firstName",
							value: firstName,
							...fieldHandlers("firstName", setFirstName),
							maxLength: FIELD_LIMITS.NAME_MAX + 1,
							"aria-invalid": Boolean(errors.firstName),
							"aria-describedby": errors.firstName ? "firstName-error" : void 0,
							className: fieldInputClass(errors.firstName)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Last name",
						htmlFor: "lastName",
						error: errors.lastName,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "lastName",
							value: lastName,
							...fieldHandlers("lastName", setLastName),
							maxLength: FIELD_LIMITS.NAME_MAX + 1,
							"aria-invalid": Boolean(errors.lastName),
							"aria-describedby": errors.lastName ? "lastName-error" : void 0,
							className: fieldInputClass(errors.lastName)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Email",
						htmlFor: "email",
						error: errors.email,
						required: true,
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
						label: "Mobile",
						htmlFor: "phone",
						error: errors.phone,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "phone",
							type: "text",
							inputMode: "numeric",
							autoComplete: "tel",
							value: phone,
							onChange: (e) => onPhoneChange(e.target.value),
							onKeyDown: onPhoneKeyDown,
							onPaste: onPhonePaste,
							onBlur: () => handleBlur("phone", phone),
							maxLength: FIELD_LIMITS.MOBILE_LENGTH,
							placeholder: "9876543210",
							"aria-invalid": Boolean(errors.phone),
							"aria-describedby": errors.phone ? "phone-error" : void 0,
							className: fieldInputClass(errors.phone)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Address",
						htmlFor: "address",
						error: errors["address"],
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "address",
							value: address,
							...fieldHandlers("address", setAddress),
							"aria-invalid": Boolean(errors["address"]),
							"aria-describedby": errors["address"] ? "address-error" : void 0,
							className: fieldInputClass(errors["address"])
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Gender" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: gender || "none",
							onValueChange: (v) => setGender(v === "none" ? "" : v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select gender" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "none",
								children: "Not specified"
							}), [
								"Male",
								"Female",
								"Other",
								"Prefer not to say"
							].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: g,
								children: g
							}, g))] })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormSection, {
				title: "Job details",
				description: isEdit ? "Department, team and reporting structure" : "Employee details and reporting structure",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Employee ID",
						htmlFor: "employeeId",
						error: errors["employeeId"],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "employeeId",
							value: employeeId,
							...fieldHandlers("employeeId", setEmployeeId),
							placeholder: "Auto-generated if empty",
							"aria-invalid": Boolean(errors["employeeId"]),
							"aria-describedby": errors["employeeId"] ? "employeeId-error" : void 0,
							className: fieldInputClass(errors["employeeId"])
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Date of joining",
						htmlFor: "dateOfJoining",
						error: dateError || void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "dateOfJoining",
							type: "text",
							inputMode: "numeric",
							autoComplete: "off",
							placeholder: "DD-MM-YYYY",
							maxLength: 10,
							value: dateOfJoining,
							onChange: (e) => onJoiningDateChange(e.target.value),
							onBlur: () => {
								if (!dateOfJoining.trim()) {
									setDateError("");
									return;
								}
								setDateError(ddMmYyyyToIso(dateOfJoining) ? "" : "Please enter a valid date as DD-MM-YYYY");
							},
							"aria-invalid": Boolean(dateError),
							"aria-describedby": dateError ? "dateOfJoining-error" : void 0,
							className: fieldInputClass(dateError || void 0)
						})
					}),
					isEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Department" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: departmentId,
								onValueChange: setDepartmentId,
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select department" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (departmentsQuery.data ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: d._id,
									children: d.name
								}, d._id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Designation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: designationId,
								onValueChange: setDesignationId,
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select designation" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (designationsQuery.data ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: d._id,
									children: d.name
								}, d._id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Team" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: teamId,
								onValueChange: setTeamId,
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select team" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (teamsQuery.data ?? []).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t._id,
									children: t.name
								}, t._id)) })]
							})]
						})
					] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Reporting manager" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportingManagerSearch, {
							value: reportingManagerId,
							onChange: setReportingManagerId,
							managers: managersQuery.data ?? [],
							excludeIds: [initial?.id, initial?._id].filter((id) => Boolean(id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormSection, {
				title: "Account",
				description: "Role, status and access",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: role,
							onValueChange: (v) => setRole(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Admin",
								children: "Admin"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Staff",
								children: "Staff"
							})] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: status,
							onValueChange: setStatus,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
								"Active",
								"Inactive",
								"Suspended"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s,
								children: s
							}, s)) })]
						})]
					}),
					mode === "create" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5 sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Temporary password" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
								value: temporaryPassword,
								onChange: (e) => setTemporaryPassword(e.target.value),
								autoComplete: "new-password",
								placeholder: "Auto-generated if empty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "An invitation email will be sent automatically."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				submitLabel,
				submitting,
				onCancel
			})
		]
	});
}
function InternalUserFormSheet({ open, onOpenChange, mode, userId, onSaved }) {
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery({
		queryKey: ["internal-user", userId],
		queryFn: () => fetchInternalUser(userId),
		enabled: mode === "edit" && !!userId && open
	});
	const invalidate = async (id) => {
		await Promise.all([
			queryClient.invalidateQueries({ queryKey: ["internal-users"] }),
			queryClient.invalidateQueries({ queryKey: ["internal-user", id] }),
			queryClient.invalidateQueries({ queryKey: ["internal-user-overview", id] })
		]);
	};
	const displayName = data?.name ?? (data?.firstName && data?.lastName ? `${data.firstName} ${data.lastName}` : data?.email);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSheet, {
		open,
		onOpenChange,
		title: mode === "create" ? "New user" : `Edit ${displayName ?? "user"}`,
		description: mode === "create" ? "Create an internal employee account." : data?.email ?? "Update employee information.",
		children: mode === "edit" && isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
			rows: 8,
			cols: 2
		}) : mode === "edit" && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Unable to load user."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalUserForm, {
			mode,
			initial: mode === "edit" ? data : void 0,
			submitLabel: mode === "create" ? "Create user" : "Save changes",
			onCancel: () => onOpenChange(false),
			onSubmit: async (payload) => {
				try {
					if (mode === "create") {
						const createPayload = payload;
						const user = await createInternalUser(createPayload);
						const id = user.id ?? user._id;
						await invalidate(id);
						toast.success(createPayload.temporaryPassword ? "User created Succesfully." : "User created Succesfully.");
						onOpenChange(false);
						onSaved?.(id);
					} else if (userId) {
						await updateInternalUser(userId, payload);
						await invalidate(userId);
						toast.success("User updated.");
						onOpenChange(false);
						onSaved?.(userId);
					}
				} catch (error) {
					if (Object.keys(getApiFieldErrors(error)).length === 0) toast.error(getApiErrorMessage(error, mode === "create" ? "Failed to create user" : "Failed to update user"));
					throw error;
				}
			}
		}, mode === "edit" ? userId : "create")
	});
}
function isUserActivationPending(invitationStatus) {
	return invitationStatus !== "Accepted";
}
function canAdminResetPassword(invitationStatus) {
	return !isUserActivationPending(invitationStatus);
}
//#endregion
export { canAdminResetPassword as n, InternalUserFormSheet as t };
