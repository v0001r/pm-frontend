import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as api, s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { m as TableSkeleton } from "./primitives-CPmujTLD.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { ct as SelectItem, lt as SelectTrigger, ot as Select, st as SelectContent, ut as SelectValue } from "./router-CtVrCs4M.mjs";
import { t as Label } from "./label-cyeiyrNV.mjs";
import { t as Input } from "./input-DantDJEY.mjs";
import { a as fieldInputClass, n as FormField } from "./password-CG809Zkb.mjs";
import { c as internalUserSchema, f as validateForm } from "./form-validation-n0pRSGP6.mjs";
import { t as FormActions } from "./form-actions-D3Bj8QF1.mjs";
import { t as FormSheet } from "./form-sheet-RyuhCokR.mjs";
import { t as fetchEmployees } from "./users-D9q6nKAD.mjs";
import { r as fetchInternalUser, t as createInternalUser, u as updateInternalUser } from "./internal-users-DxEAVk7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/internal-user-form-sheet-CBRRHK9-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function fetchDepartments() {
	const { data } = await api.get("/departments");
	return data.data;
}
async function fetchDesignations(departmentId) {
	const { data } = await api.get("/designations", { params: departmentId ? { departmentId } : void 0 });
	return data.data;
}
async function fetchTeams(departmentId) {
	const { data } = await api.get("/teams", { params: departmentId ? { departmentId } : void 0 });
	return data.data;
}
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
function InternalUserForm({ initial, mode, onSubmit, onCancel, submitLabel = mode === "create" ? "Create user" : "Save changes" }) {
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
	const [dateOfJoining, setDateOfJoining] = (0, import_react.useState)(initial?.dateOfJoining ? initial.dateOfJoining.slice(0, 10) : "");
	const [role, setRole] = (0, import_react.useState)(initial?.role ?? "Staff");
	const [status, setStatus] = (0, import_react.useState)(initial?.status ?? "Active");
	const [temporaryPassword, setTemporaryPassword] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const departmentsQuery = useQuery({
		queryKey: ["departments"],
		queryFn: fetchDepartments
	});
	const designationsQuery = useQuery({
		queryKey: ["designations", departmentId],
		queryFn: () => fetchDesignations(departmentId || void 0),
		enabled: Boolean(departmentId)
	});
	const teamsQuery = useQuery({
		queryKey: ["teams", departmentId],
		queryFn: () => fetchTeams(departmentId || void 0),
		enabled: Boolean(departmentId)
	});
	const managersQuery = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees
	});
	(0, import_react.useEffect)(() => {
		if (!departmentId) {
			setDesignationId("");
			setTeamId("");
		}
	}, [departmentId]);
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
			const validation = validateForm(internalUserSchema, {
				firstName,
				lastName,
				email,
				phone
			});
			if (!validation.success) {
				setErrors(validation.errors);
				return;
			}
			setErrors({});
			setSubmitting(true);
			try {
				if (mode === "create") await onSubmit({
					firstName: firstName.trim(),
					lastName: lastName.trim(),
					email: email.trim(),
					phone: phone.trim(),
					address: address.trim() || void 0,
					gender: gender || void 0,
					employeeId: employeeId.trim() || void 0,
					departmentId,
					designationId,
					teamId,
					reportingManagerId: reportingManagerId || void 0,
					dateOfJoining: dateOfJoining || void 0,
					role,
					status,
					temporaryPassword: temporaryPassword.trim() || void 0,
					sendInvitation: true
				});
				else await onSubmit({
					firstName: firstName.trim(),
					lastName: lastName.trim(),
					email: email.trim(),
					phone: phone.trim(),
					address: address.trim(),
					gender: gender || void 0,
					employeeId: employeeId.trim() || void 0,
					departmentId: departmentId || void 0,
					designationId: designationId || void 0,
					teamId: teamId || void 0,
					reportingManagerId: reportingManagerId || null,
					dateOfJoining: dateOfJoining || void 0,
					role,
					status
				});
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
						error: errors.firstName,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: firstName,
							onChange: (e) => {
								setFirstName(e.target.value);
								clearError("firstName");
							},
							className: fieldInputClass(errors.firstName)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Last name",
						error: errors.lastName,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: lastName,
							onChange: (e) => {
								setLastName(e.target.value);
								clearError("lastName");
							},
							className: fieldInputClass(errors.lastName)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Email",
						error: errors.email,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: email,
							onChange: (e) => {
								setEmail(e.target.value);
								clearError("email");
							},
							className: fieldInputClass(errors.email)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Mobile",
						error: errors.phone,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: phone,
							onChange: (e) => {
								setPhone(e.target.value);
								clearError("phone");
							},
							className: fieldInputClass(errors.phone)
						})
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
				description: "Department, team and reporting structure",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Employee ID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: employeeId,
							onChange: (e) => setEmployeeId(e.target.value),
							placeholder: "Auto-generated if empty"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date of joining" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: dateOfJoining,
							onChange: (e) => setDateOfJoining(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Department" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: departmentId,
							onValueChange: setDepartmentId,
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
							disabled: !departmentId,
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
							disabled: !departmentId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select team" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (teamsQuery.data ?? []).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: t._id,
								children: t.name
							}, t._id)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Reporting manager" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: reportingManagerId || "none",
							onValueChange: (v) => setReportingManagerId(v === "none" ? "" : v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select manager" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "none",
								children: "None"
							}), (managersQuery.data ?? []).filter((m) => m.id !== initial?.id && m._id !== initial?._id).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: m.id,
								children: m.name ?? `${m.firstName} ${m.lastName}`
							}, m.id))] })]
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "password",
								value: temporaryPassword,
								onChange: (e) => setTemporaryPassword(e.target.value),
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
	const invalidate = (id) => {
		queryClient.invalidateQueries({ queryKey: ["internal-users"] });
		queryClient.invalidateQueries({ queryKey: ["internal-user", id] });
		queryClient.invalidateQueries({ queryKey: ["internal-user-overview", id] });
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
						const user = await createInternalUser(payload);
						const id = user.id ?? user._id;
						invalidate(id);
						toast.success("User created and invitation sent.");
						onOpenChange(false);
						onSaved?.(id);
					} else if (userId) {
						await updateInternalUser(userId, payload);
						invalidate(userId);
						toast.success("User updated.");
						onOpenChange(false);
						onSaved?.(userId);
					}
				} catch (error) {
					toast.error(getApiErrorMessage(error, mode === "create" ? "Failed to create user" : "Failed to update user"));
					throw error;
				}
			}
		}, mode === "edit" ? userId : "create")
	});
}
//#endregion
export { fetchDepartments as n, InternalUserFormSheet as t };
