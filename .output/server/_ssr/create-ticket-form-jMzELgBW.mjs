import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useAuth, n as Button, u as getApiErrorMessage } from "./button-Du-Bk9Wl.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as fullName, d as SectionCard, i as PRIORITIES, l as SETTABLE_STATUSES, n as Input, o as PageHeader } from "./primitives-BE889lfB.mjs";
import { C as SelectTrigger, S as SelectItem, b as Select, w as SelectValue, x as SelectContent } from "./data-table-CNAlrDoP.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { K as fetchEmployees, O as createTicket, St as Label, et as fetchProjects } from "./router-DC97nFe7.mjs";
import { L as validateForm, _ as createTicketSchema, r as FormField, t as FIELD_LIMITS, x as fieldInputClass } from "./form-validation-CtBmYCtB.mjs";
import { t as Textarea } from "./textarea-kx88_2GP.mjs";
import { t as fetchCategories } from "./categories-0r8IUY6G.mjs";
import { t as FileUploadField } from "./file-upload-field-B_oTtA2E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-ticket-form-jMzELgBW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreateTicketForm({ initialProjectId, cancelTo = "/admin/tickets", successTo = "/admin/tickets/$ticketId", embedded = false, onCancel, onSuccess }) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const isClient = user?.role === "Client";
	const isStaffOrAdmin = user?.role === "Admin" || user?.role === "Staff";
	const [subject, setSubject] = (0, import_react.useState)("");
	const [projectId, setProjectId] = (0, import_react.useState)(initialProjectId ?? "");
	const [categoryId, setCategoryId] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)("P3");
	const [status, setStatus] = (0, import_react.useState)("New");
	const [description, setDescription] = (0, import_react.useState)("");
	const [assignedTo, setAssignedTo] = (0, import_react.useState)("");
	const [files, setFiles] = (0, import_react.useState)([]);
	const [errors, setErrors] = (0, import_react.useState)({});
	const projectsQuery = useQuery({
		queryKey: ["projects", {
			createTicket: true,
			role: user?.role,
			unscoped: isStaffOrAdmin
		}],
		queryFn: () => fetchProjects({
			page: 1,
			limit: 100,
			sortBy: "name",
			sortOrder: "asc",
			...isStaffOrAdmin ? { unscoped: true } : {}
		}),
		enabled: Boolean(user)
	});
	const categoriesQuery = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories
	});
	const employeesQuery = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees,
		enabled: isStaffOrAdmin
	});
	const projects = projectsQuery.data?.items ?? [];
	const categories = categoriesQuery.data ?? [];
	const employees = employeesQuery.data ?? [];
	(0, import_react.useEffect)(() => {
		if (!projectId && projects[0]) setProjectId(projects[0]._id);
	}, [projects, projectId]);
	(0, import_react.useEffect)(() => {
		if (!categoryId && categories[0]) setCategoryId(categories[0]._id);
	}, [categories, categoryId]);
	(0, import_react.useEffect)(() => {
		if (initialProjectId) setProjectId(initialProjectId);
	}, [initialProjectId]);
	const mutation = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("You must be signed in to create a ticket");
			return createTicket({
				subject: subject.trim(),
				description: description.trim(),
				...isClient ? { clientId: user.id } : {},
				projectId,
				categoryId,
				priority,
				...isStaffOrAdmin && !(assignedTo && status === "New") ? { status } : {},
				...isStaffOrAdmin && assignedTo ? { assignedTo } : {},
				...files.length > 0 ? { attachments: files } : {}
			});
		},
		onSuccess: (ticket) => {
			toast.success(`Ticket ${ticket.number} submitted.`);
			if (onSuccess) onSuccess(ticket._id);
			else navigate({
				to: successTo,
				params: { ticketId: ticket._id }
			});
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error, "Failed to submit ticket"));
		}
	});
	function clearError(field) {
		setErrors((current) => {
			if (!current[field]) return current;
			const next = { ...current };
			delete next[field];
			return next;
		});
	}
	const loading = projectsQuery.isLoading || categoriesQuery.isLoading || isStaffOrAdmin && employeesQuery.isLoading;
	const form = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: embedded ? "grid gap-4" : "grid gap-4 p-4",
		noValidate: true,
		onSubmit: (event) => {
			event.preventDefault();
			const validation = validateForm(createTicketSchema, {
				subject,
				projectId,
				categoryId,
				description
			});
			if (!validation.success) {
				setErrors(validation.errors);
				return;
			}
			setErrors({});
			mutation.mutate();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Subject",
				htmlFor: "subject",
				error: errors["subject"],
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "subject",
					value: subject,
					onChange: (event) => {
						setSubject(event.target.value);
						clearError("subject");
					},
					placeholder: "Short summary of the issue",
					maxLength: FIELD_LIMITS.SUBJECT_MAX,
					className: fieldInputClass(errors["subject"])
				})
			}),
			isStaffOrAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Assign to" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: assignedTo || "unassigned",
						onValueChange: (value) => setAssignedTo(value === "unassigned" ? "" : value),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: loading ? "Loading users..." : "Select assignee" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "unassigned",
							children: "Unassigned"
						}), employees.map((employee) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: employee.id,
							children: [fullName(employee), employee.designation ? ` · ${employee.designation}` : ""]
						}, employee.id))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Assigning a user marks the ticket as assigned automatically."
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Project",
					error: errors["projectId"],
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: projectId,
						onValueChange: (value) => {
							setProjectId(value);
							clearError("projectId");
						},
						disabled: loading || projects.length === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: fieldInputClass(errors["projectId"]),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: loading ? "Loading projects..." : "Select project" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-2 py-6 text-center text-sm text-muted-foreground",
							children: "No projects available for your account"
						}) : projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: project._id,
							children: [
								project.name,
								" · ",
								project.projectId
							]
						}, project._id)) })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Category",
					error: errors["categoryId"],
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: categoryId,
						onValueChange: (value) => {
							setCategoryId(value);
							clearError("categoryId");
						},
						disabled: loading || categories.length === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: fieldInputClass(errors["categoryId"]),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: loading ? "Loading categories..." : "Select category" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: category._id,
							children: category.name
						}, category._id)) })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `grid gap-4 ${isStaffOrAdmin ? "sm:grid-cols-2" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Priority" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: priority,
						onValueChange: (value) => setPriority(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: PRIORITIES.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value,
							children: value
						}, value)) })]
					})]
				}), isStaffOrAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: status,
						onValueChange: (value) => setStatus(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SETTABLE_STATUSES.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value,
							children: value
						}, value)) })]
					})]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Description",
				htmlFor: "description",
				error: errors["description"],
				hint: `${description.length}/4000 characters`,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "description",
					value: description,
					onChange: (event) => {
						setDescription(event.target.value);
						clearError("description");
					},
					rows: 8,
					maxLength: 4e3,
					placeholder: "Steps to reproduce, what you expected and what happened instead.",
					className: fieldInputClass(errors["description"])
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploadField, {
				context: "ticket-attachment",
				files,
				onChange: setFiles,
				label: "Attachments",
				hint: "Max 5 files, 10MB each"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: () => onCancel ? onCancel() : navigate({ to: cancelTo }),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "sm",
					disabled: mutation.isPending || projects.length === 0 || categories.length === 0,
					children: mutation.isPending ? "Submitting..." : "Submit ticket"
				})]
			})
		]
	});
	if (embedded) return form;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Create ticket",
		description: isClient ? "Select a project and describe the issue. Our team will respond within your SLA." : "Log a support request for any project."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: form })] });
}
//#endregion
export { CreateTicketForm as t };
