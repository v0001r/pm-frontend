import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as cn, d as getApiFieldErrors, n as Button, u as getApiErrorMessage } from "./button-Du-Bk9Wl.mjs";
import { lt as Check, nt as ChevronsUpDown, t as X } from "../_libs/lucide-react.mjs";
import { a as PROJECT_STATUSES, m as TableSkeleton, n as Input } from "./primitives-BE889lfB.mjs";
import { c as PopoverContent, l as PopoverTrigger, s as Popover } from "./store-Cwl19Diw.mjs";
import { C as SelectTrigger, S as SelectItem, b as Select, w as SelectValue, x as SelectContent } from "./data-table-CNAlrDoP.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { J as createProject, Q as fetchProjectCustomerOptions, St as Label, X as fetchProject, nt as updateProject } from "./router-DC97nFe7.mjs";
import { F as projectFormSchema, L as validateForm, r as FormField, t as FIELD_LIMITS, x as fieldInputClass } from "./form-validation-CtBmYCtB.mjs";
import { t as FormSheet } from "./form-sheet-CicRVy3u.mjs";
import { t as Textarea } from "./textarea-kx88_2GP.mjs";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, t as Command$1 } from "./command-BFBytP_t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-form-sheet-CaYswj43.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var defaultValues = {
	name: "",
	customerId: "",
	description: "",
	startDate: "",
	endDate: "",
	maxHours: "",
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
function CustomerSearchSelect({ value, onChange, customerName, options, loading, error, search, onSearchChange }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const selected = options.find((customer) => customer._id === value);
	const displayName = selected ? selected.companyName || selected.name : customerName ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
			modal: true,
			open,
			onOpenChange: (next) => {
				setOpen(next);
				if (next) onSearchChange("");
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					role: "combobox",
					"aria-expanded": open,
					"aria-label": "Select customer",
					className: cn("h-9 min-w-0 flex-1 justify-between font-normal", fieldInputClass(error)),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("truncate", !displayName && "text-muted-foreground"),
						children: displayName || "Search customer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "ml-2 size-4 shrink-0 opacity-50" })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
				className: "z-70 w-(--radix-popover-trigger-width) p-0",
				align: "start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, {
					shouldFilter: false,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
						placeholder: "Search by company, email or ID",
						value: search,
						onValueChange: onSearchChange
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandList, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 py-6 text-center text-sm text-muted-foreground",
						children: "Searching customers…"
					}) : options.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "No customers found" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: options.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
						value: `${customer.companyName || customer.name} ${customer.email ?? ""} ${customer._id}`,
						onSelect: () => {
							onChange(customer._id);
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("size-4", value === customer._id ? "opacity-100" : "opacity-0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex min-w-0 flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: customer.companyName || customer.name
							}), customer.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-xs text-muted-foreground",
								children: customer.email
							}) : null]
						})]
					}, customer._id)) }) })]
				})
			})]
		}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			size: "icon",
			className: "size-9 shrink-0 text-muted-foreground hover:text-foreground",
			"aria-label": "Clear customer selection",
			title: "Clear selection",
			onClick: () => onChange(""),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		}) : null]
	});
}
function ProjectForm({ mode, projectId, initialValues, customerName, onCancel, onSuccess }) {
	const queryClient = useQueryClient();
	const [values, setValues] = (0, import_react.useState)({
		...defaultValues,
		...initialValues
	});
	const [customerSearch, setCustomerSearch] = (0, import_react.useState)("");
	const [debouncedCustomerSearch, setDebouncedCustomerSearch] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedCustomerSearch(customerSearch.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [customerSearch]);
	const { data: customers = [], isLoading: customersLoading, isFetching: customersFetching } = useQuery({
		queryKey: [
			"customers",
			"project-picker",
			debouncedCustomerSearch
		],
		queryFn: () => fetchProjectCustomerOptions(debouncedCustomerSearch || void 0),
		refetchOnWindowFocus: false,
		staleTime: 3e4
	});
	const customerOptions = (0, import_react.useMemo)(() => {
		const options = customersFetching ? [] : [...customers];
		if (values.customerId && !options.some((customer) => customer._id === values.customerId) && customerName) options.unshift({
			_id: values.customerId,
			name: customerName,
			companyName: customerName,
			email: ""
		});
		return options;
	}, [
		customers,
		customersFetching,
		values.customerId,
		customerName
	]);
	const mutation = useMutation({
		mutationFn: async () => {
			const maxHours = Number(values.maxHours);
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
			const fieldErrors = getApiFieldErrors(error);
			if (Object.keys(fieldErrors).length > 0) {
				setErrors((current) => ({
					...current,
					...fieldErrors
				}));
				return;
			}
			toast.error(getApiErrorMessage(error, "Failed to save project"));
		}
	});
	function updateField(field, value) {
		setValues((current) => ({
			...current,
			[field]: value
		}));
		setErrors((current) => {
			if (!current[field]) return current;
			const next = { ...current };
			delete next[field];
			return next;
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-5 p-4",
		noValidate: true,
		onSubmit: (event) => {
			event.preventDefault();
			const validation = validateForm(projectFormSchema, {
				name: values.name,
				customerId: values.customerId,
				startDate: values.startDate,
				maxHours: values.maxHours,
				endDate: values.endDate
			});
			if (!validation.success) {
				setErrors(validation.errors);
				return;
			}
			setErrors({});
			mutation.mutate();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Project name",
					htmlFor: "project-name",
					error: errors.name,
					className: "sm:col-span-2",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "project-name",
						value: values.name,
						onChange: (event) => updateField("name", event.target.value),
						onBlur: (event) => updateField("name", event.target.value.trim()),
						placeholder: "Website redesign",
						maxLength: FIELD_LIMITS.PROJECT_NAME_MAX,
						className: fieldInputClass(errors.name)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Customer",
					htmlFor: "customer-search",
					error: errors.customerId,
					className: "sm:col-span-2",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerSearchSelect, {
						value: values.customerId,
						onChange: (customerId) => updateField("customerId", customerId),
						customerName,
						options: customerOptions,
						loading: customersLoading || customersFetching,
						error: errors.customerId,
						search: customerSearch,
						onSearchChange: setCustomerSearch
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Start date",
					htmlFor: "start-date",
					error: errors.startDate,
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "start-date",
						type: "date",
						value: values.startDate,
						onChange: (event) => updateField("startDate", event.target.value),
						className: fieldInputClass(errors.startDate)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "End date",
					htmlFor: "end-date",
					error: errors.endDate,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "end-date",
						type: "date",
						value: values.endDate,
						onChange: (event) => updateField("endDate", event.target.value),
						className: fieldInputClass(errors.endDate)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Maximum hours",
					htmlFor: "max-hours",
					error: errors.maxHours,
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "max-hours",
						type: "number",
						min: 0,
						step: 1,
						value: values.maxHours,
						onChange: (event) => {
							const next = event.target.value;
							if (next === "" || /^\d+$/.test(next)) updateField("maxHours", next);
						},
						className: fieldInputClass(errors.maxHours)
					})
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
function ProjectFormSheet({ open, onOpenChange, mode, projectId, defaultCustomerId, onSaved }) {
	const queryClient = useQueryClient();
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["project", projectId],
		queryFn: () => fetchProject(projectId),
		enabled: mode === "edit" && !!projectId && open
	});
	const invalidate = (id) => {
		queryClient.invalidateQueries({ queryKey: ["projects"] });
		queryClient.invalidateQueries({ queryKey: ["project", id] });
		queryClient.invalidateQueries({ queryKey: ["customer-projects"] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSheet, {
		open,
		onOpenChange,
		title: mode === "create" ? "New project" : `Edit ${data?.name ?? "project"}`,
		description: mode === "create" ? "Create a project for a customer and define its schedule, hours and status." : data ? `${data.projectId} · ${data.customerName ?? "Customer project"}` : "Update project details.",
		children: mode === "edit" && isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
			rows: 8,
			cols: 2
		}) : mode === "edit" && (isError || !data) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3 py-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Unable to load this project."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				onClick: () => refetch(),
				children: "Retry"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectForm, {
			mode,
			projectId,
			initialValues: mode === "edit" && data ? projectToFormValues(data) : defaultCustomerId ? { customerId: defaultCustomerId } : void 0,
			customerName: data?.customerName,
			onCancel: () => onOpenChange(false),
			onSuccess: (id) => {
				invalidate(id);
				onOpenChange(false);
				onSaved?.(id);
			}
		}, mode === "edit" ? projectId : `create-${defaultCustomerId ?? "new"}`)
	});
}
//#endregion
export { ProjectFormSheet as t };
