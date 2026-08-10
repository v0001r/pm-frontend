import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as useAuth, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Paperclip, t as X } from "../_libs/lucide-react.mjs";
import { a as PageHeader, c as SLA_MATRIX, h as fullName, r as PRIORITIES, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { G as SelectItem, K as SelectTrigger, U as Select, W as SelectContent, q as SelectValue, v as createTicket } from "./router-DLFu5c1a.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { t as Label } from "./label-BZKlnMd2.mjs";
import { s as fetchProjects } from "./projects-JQDAMoYA.mjs";
import { t as Textarea } from "./textarea-BeI_74_b.mjs";
import { t as fetchClientUsers } from "./users-CDxzt4hY.mjs";
import { t as fetchCategories } from "./categories-gqIh7DFz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-ticket-form-EJ_z6S6k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreateTicketForm({ initialProjectId, cancelTo, successTo }) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const isClient = user?.role === "Client";
	const [subject, setSubject] = (0, import_react.useState)("");
	const [projectId, setProjectId] = (0, import_react.useState)(initialProjectId ?? "");
	const [categoryId, setCategoryId] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)("P3");
	const [description, setDescription] = (0, import_react.useState)("");
	const [requesterId, setRequesterId] = (0, import_react.useState)(user?.id ?? "");
	const [files, setFiles] = (0, import_react.useState)([]);
	const projectsQuery = useQuery({
		queryKey: ["projects", {
			createTicket: true,
			role: user?.role
		}],
		queryFn: () => fetchProjects({
			page: 1,
			limit: 100,
			sortBy: "name",
			sortOrder: "asc"
		}),
		enabled: Boolean(user)
	});
	const categoriesQuery = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories
	});
	const clientsQuery = useQuery({
		queryKey: ["client-users"],
		queryFn: fetchClientUsers,
		enabled: !isClient
	});
	const projects = projectsQuery.data?.items ?? [];
	const categories = categoriesQuery.data ?? [];
	const clientUsers = clientsQuery.data ?? [];
	(0, import_react.useEffect)(() => {
		if (user?.id) setRequesterId(user.id);
	}, [user?.id]);
	(0, import_react.useEffect)(() => {
		if (!projectId && projects[0]) setProjectId(projects[0]._id);
	}, [projects, projectId]);
	(0, import_react.useEffect)(() => {
		if (!categoryId && categories[0]) setCategoryId(categories[0]._id);
	}, [categories, categoryId]);
	(0, import_react.useEffect)(() => {
		if (initialProjectId) setProjectId(initialProjectId);
	}, [initialProjectId]);
	const selectedProject = (0, import_react.useMemo)(() => projects.find((project) => project._id === projectId), [projects, projectId]);
	const requesterOptions = (0, import_react.useMemo)(() => {
		if (isClient || !user) return [];
		const options = clientUsers.map((client) => ({
			id: client._id,
			label: client.company ? `${fullName(client)} · ${client.company}` : fullName(client)
		}));
		const selfLabel = `${fullName(user)} (me)`;
		if (!options.some((option) => option.id === user.id)) options.unshift({
			id: user.id,
			label: selfLabel
		});
		return options;
	}, [
		clientUsers,
		isClient,
		user
	]);
	const mutation = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("You must be signed in to create a ticket");
			if (!projectId) throw new Error("Select a project for this ticket");
			if (!categoryId) throw new Error("Select a category for this ticket");
			if (!isClient && !requesterId) throw new Error("Select who this ticket is for");
			if (subject.trim().length < 5) throw new Error("Subject must be at least 5 characters");
			if (description.trim().length < 20) throw new Error("Please describe the issue in at least 20 characters");
			return createTicket({
				subject: subject.trim(),
				description: description.trim(),
				clientId: isClient ? user.id : requesterId,
				projectId,
				categoryId,
				priority
			});
		},
		onSuccess: (ticket) => {
			toast.success(`Ticket ${ticket.number} submitted.`);
			navigate({
				to: successTo,
				params: { ticketId: ticket._id }
			});
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error, "Failed to submit ticket"));
		}
	});
	const loading = projectsQuery.isLoading || categoriesQuery.isLoading || !isClient && clientsQuery.isLoading;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Create ticket",
		description: isClient ? "Select a project and describe the issue. Our team will respond within your SLA." : "Log a support request for any project you can access."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-4 p-4",
		onSubmit: (event) => {
			event.preventDefault();
			mutation.mutate();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "subject",
					children: "Subject"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "subject",
					value: subject,
					onChange: (event) => setSubject(event.target.value),
					placeholder: "Short summary of the issue",
					maxLength: 120,
					required: true
				})]
			}),
			!isClient ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Requester" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: requesterId,
					onValueChange: setRequesterId,
					disabled: loading || requesterOptions.length === 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: loading ? "Loading users..." : "Select requester" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: requesterOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: option.id,
						children: option.label
					}, option.id)) })]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Project" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: projectId,
							onValueChange: setProjectId,
							disabled: loading || projects.length === 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: loading ? "Loading projects..." : "Select project" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
						}),
						selectedProject ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Status: ",
								selectedProject.status,
								" · Progress: ",
								selectedProject.progressPercentage,
								"%"
							]
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: categoryId,
						onValueChange: setCategoryId,
						disabled: loading || categories.length === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: loading ? "Loading categories..." : "Select category" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: category._id,
							children: category.name
						}, category._id)) })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5 sm:max-w-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Priority" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: priority,
						onValueChange: (value) => setPriority(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: PRIORITIES.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value,
							children: value
						}, value)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Response within ",
							SLA_MATRIX[priority].response,
							" · Resolution within ",
							SLA_MATRIX[priority].resolution
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "description",
						children: "Description"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "description",
						value: description,
						onChange: (event) => setDescription(event.target.value),
						rows: 8,
						maxLength: 4e3,
						placeholder: "Steps to reproduce, what you expected and what happened instead.",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [description.length, "/4000 characters"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Attachments" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-center gap-2 rounded-sm border border-dashed px-3 py-4 text-sm text-muted-foreground hover:bg-accent/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" }),
							"Attach screenshots or documents (max 5 files, 10MB each)",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								multiple: true,
								className: "hidden",
								onChange: (event) => {
									const picked = Array.from(event.target.files ?? []).map((file) => ({
										name: file.name,
										size: `${Math.max(1, Math.round(file.size / 1024))} KB`
									}));
									setFiles((previous) => [...previous, ...picked].slice(0, 5));
								}
							})
						]
					}),
					files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap gap-2",
						children: files.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs",
							children: [
								file.name,
								" · ",
								file.size,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setFiles(files.filter((_, fileIndex) => fileIndex !== index)),
									"aria-label": `Remove ${file.name}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
								})
							]
						}, `${file.name}-${index}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "File uploads are stored locally in this demo UI only."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: () => navigate({ to: cancelTo }),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "sm",
					disabled: mutation.isPending || projects.length === 0 || categories.length === 0,
					children: mutation.isPending ? "Submitting..." : "Submit ticket"
				})]
			})
		]
	}) })] });
}
//#endregion
export { CreateTicketForm as t };
