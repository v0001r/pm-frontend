import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { S as Search } from "../_libs/lucide-react.mjs";
import { i as PROJECT_STATUSES } from "./primitives-rWqtcPGP.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { G as SelectItem, K as SelectTrigger, U as Select, W as SelectContent, q as SelectValue } from "./router-DLFu5c1a.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { t as Label } from "./label-BZKlnMd2.mjs";
import { l as updateProject, n as createProject, r as fetchCustomers } from "./projects-JQDAMoYA.mjs";
import { t as Textarea } from "./textarea-BeI_74_b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-form-BVedDx40.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var defaultValues = {
	name: "",
	customerId: "",
	description: "",
	startDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
	endDate: "",
	maxHours: "40",
	label: "",
	status: "Open"
};
function toDateInput(value) {
	if (!value) return "";
	return value.slice(0, 10);
}
function projectToFormValues(project) {
	const customerId = typeof project.customerId === "string" ? project.customerId : project.customerId?.toString?.() ?? "";
	return {
		name: project.name,
		customerId,
		description: project.description ?? "",
		startDate: toDateInput(project.startDate),
		endDate: toDateInput(project.endDate),
		maxHours: String(project.maxHours),
		label: project.label ?? "",
		status: project.status
	};
}
function ProjectForm({ mode, projectId, initialValues, customerName, onCancel, onSuccess }) {
	const queryClient = useQueryClient();
	const [values, setValues] = (0, import_react.useState)({
		...defaultValues,
		...initialValues
	});
	const [customerSearch, setCustomerSearch] = (0, import_react.useState)("");
	const [debouncedCustomerSearch, setDebouncedCustomerSearch] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedCustomerSearch(customerSearch.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [customerSearch]);
	const { data: customers = [], isLoading: customersLoading } = useQuery({
		queryKey: ["customers", debouncedCustomerSearch],
		queryFn: () => fetchCustomers(debouncedCustomerSearch || void 0)
	});
	const customerOptions = (0, import_react.useMemo)(() => {
		const options = [...customers];
		if (values.customerId && !options.some((customer) => customer._id === values.customerId) && customerName) options.unshift({
			_id: values.customerId,
			name: customerName,
			email: ""
		});
		return options;
	}, [
		customers,
		values.customerId,
		customerName
	]);
	const mutation = useMutation({
		mutationFn: async () => {
			const maxHours = Number(values.maxHours);
			if (!values.name.trim()) throw new Error("Project name is required");
			if (!values.customerId) throw new Error("Customer is required");
			if (!values.startDate) throw new Error("Start date is required");
			if (!values.maxHours.trim()) throw new Error("Maximum hours is required");
			if (values.endDate && values.startDate > values.endDate) throw new Error("End date cannot be before start date");
			if (mode === "create") {
				const payload = {
					name: values.name.trim(),
					customerId: values.customerId,
					description: values.description.trim() || void 0,
					startDate: values.startDate,
					endDate: values.endDate || void 0,
					maxHours,
					label: values.label.trim() || void 0,
					status: values.status
				};
				return createProject(payload);
			}
			const payload = {
				name: values.name.trim(),
				customerId: values.customerId,
				description: values.description.trim(),
				startDate: values.startDate,
				endDate: values.endDate ? values.endDate : null,
				maxHours,
				label: values.label.trim(),
				status: values.status
			};
			return updateProject(projectId, payload);
		},
		onSuccess: (project) => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			queryClient.invalidateQueries({ queryKey: ["project", project._id] });
			toast.success(mode === "create" ? "Project created successfully" : "Project updated successfully");
			onSuccess(project._id);
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error, "Failed to save project"));
		}
	});
	function updateField(field, value) {
		setValues((current) => ({
			...current,
			[field]: value
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-5 p-4",
		onSubmit: (event) => {
			event.preventDefault();
			mutation.mutate();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "project-name",
						children: "Project name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "project-name",
						value: values.name,
						onChange: (event) => updateField("name", event.target.value),
						placeholder: "Website redesign",
						maxLength: 120,
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5 sm:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "customer-search",
							children: "Customer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "customer-search",
								value: customerSearch,
								onChange: (event) => setCustomerSearch(event.target.value),
								placeholder: "Search customers by name or email",
								className: "mb-2 h-9 pl-9"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: values.customerId,
							onValueChange: (value) => updateField("customerId", value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: customersLoading ? "Loading customers..." : "Select customer" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: customerOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-2 py-6 text-center text-sm text-muted-foreground",
								children: "No customers found"
							}) : customerOptions.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: customer._id,
								children: [customer.name, customer.email ? ` · ${customer.email}` : ""]
							}, customer._id)) })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "start-date",
						children: "Start date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "start-date",
						type: "date",
						value: values.startDate,
						onChange: (event) => updateField("startDate", event.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "end-date",
						children: "End date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "end-date",
						type: "date",
						value: values.endDate,
						onChange: (event) => updateField("endDate", event.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "max-hours",
						children: "Maximum hours"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "max-hours",
						type: "number",
						value: values.maxHours,
						onChange: (event) => updateField("maxHours", event.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: values.status,
						onValueChange: (value) => updateField("status", value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: PROJECT_STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: status,
							children: status
						}, status)) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "label",
						children: "Label"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "label",
						value: values.label,
						onChange: (event) => updateField("label", event.target.value),
						placeholder: "High priority, internal, etc.",
						maxLength: 80
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "description",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "description",
						value: values.description,
						onChange: (event) => updateField("description", event.target.value),
						rows: 5,
						placeholder: "Scope, goals, and key deliverables for this project."
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-end gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: "outline",
				onClick: onCancel,
				disabled: mutation.isPending,
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "sm",
				disabled: mutation.isPending,
				children: mutation.isPending ? "Saving..." : mode === "create" ? "Create project" : "Save changes"
			})]
		})]
	});
}
//#endregion
export { projectToFormValues as n, ProjectForm as t };
