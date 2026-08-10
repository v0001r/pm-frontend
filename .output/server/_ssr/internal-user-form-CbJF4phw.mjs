import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Shield, ht as Briefcase, r as User } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { J as Select, Q as SelectValue, X as SelectItem, Y as SelectContent, Z as SelectTrigger } from "./router-B2W8Gmeh.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { t as Label } from "./label-BZKlnMd2.mjs";
import { t as FormActions } from "./form-actions-6tK-7ehz.mjs";
import { i as TabsPanelTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-5bUW-pkO.mjs";
import { t as fetchEmployees } from "./users-qW6Jl6p_.mjs";
import { n as fetchDesignations, r as fetchTeams, t as fetchDepartments } from "./org-5q5rz7Q2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/internal-user-form-CbJF4phw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InternalUserForm({ initial, mode, onSubmit, onCancel, submitLabel = mode === "create" ? "Create user" : "Save changes" }) {
	const [tab, setTab] = (0, import_react.useState)("general");
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-5",
		onSubmit: async (event) => {
			event.preventDefault();
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: tab,
			onValueChange: setTab,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "grid w-full grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
							value: "general",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {}),
							title: "General",
							description: "Name, email and contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
							value: "job",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, {}),
							title: "Job",
							description: "Department and reporting"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
							value: "account",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {}),
							title: "Account",
							description: "Role, status and access"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "general",
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "First name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: firstName,
								onChange: (e) => setFirstName(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Last name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: lastName,
								onChange: (e) => setLastName(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mobile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								required: true
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "job",
					className: "mt-4 grid gap-4 sm:grid-cols-2",
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "account",
					className: "mt-4 grid gap-4 sm:grid-cols-2",
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
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
			submitLabel,
			submitting,
			onCancel
		})]
	});
}
//#endregion
export { InternalUserForm as t };
