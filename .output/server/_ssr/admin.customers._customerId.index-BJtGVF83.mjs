import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as useAuth, l as isAdmin, n as Button, r as api, s as getApiErrorMessage, u as isStaff } from "./button-DTh0UNAt.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus, H as Info, J as Ellipsis, M as Mail, W as FolderKanban, _t as ArrowLeft, c as UserCheck, f as Ticket, h as Star, i as UserX, n as Users, pt as Building2, w as Pencil } from "../_libs/lucide-react.mjs";
import { d as SectionCard, m as TableSkeleton, n as KpiCard, p as StatusBadge, t as EmptyState } from "./primitives-CPmujTLD.mjs";
import { a as DropdownMenuSeparator, d as formatDate, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./store-Daxm1pxW.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as Table, F as DataTableActions, H as EntityCell, L as DataTableIconButton, W as LabelPill, ct as fetchCustomerContacts, dt as fetchCustomerTickets, et as TableBody, gt as updateCustomerStatus, it as TableRow, lt as fetchCustomerOverview, mt as resendCustomerInvitation, nt as TableHead, rt as TableHeader, s as Route$6, tt as TableCell, ut as fetchCustomerProjects } from "./router-DyQZnl_T.mjs";
import { t as Label } from "./label-cyeiyrNV.mjs";
import { t as Input } from "./input-DantDJEY.mjs";
import { i as fieldInputClass, t as FormField } from "./password-Cq9Yhv-5.mjs";
import { v as RequireRole } from "./guard-BCYPieem.mjs";
import { f as validateForm, r as contactFormSchema } from "./form-validation-Baqh5cQX.mjs";
import { t as FormActions } from "./form-actions-D3Bj8QF1.mjs";
import { t as Switch } from "./switch-BA5zYRcE.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CaNfSW6z.mjs";
import { i as TabsPanelTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-D5rpSCDC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers._customerId.index-BJtGVF83.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactForm({ initial, mode, onSubmit, onCancel, submitLabel = mode === "create" ? "Add contact" : "Save changes" }) {
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [jobTitle, setJobTitle] = (0, import_react.useState)(initial?.jobTitle ?? "");
	const [email, setEmail] = (0, import_react.useState)(initial?.email ?? "");
	const [mobile, setMobile] = (0, import_react.useState)(initial?.mobile ?? "");
	const [isPrimary, setIsPrimary] = (0, import_react.useState)(initial?.isPrimary ?? false);
	const [portalAccess, setPortalAccess] = (0, import_react.useState)(initial?.portalAccess ?? false);
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
		className: "grid gap-4",
		noValidate: true,
		onSubmit: async (event) => {
			event.preventDefault();
			const validation = validateForm(contactFormSchema, {
				name,
				email
			});
			if (!validation.success) {
				setErrors(validation.errors);
				return;
			}
			setErrors({});
			setSubmitting(true);
			try {
				if (mode === "create") await onSubmit({
					name: name.trim(),
					jobTitle: jobTitle.trim() || void 0,
					email: email.trim(),
					mobile: mobile.trim() || void 0,
					isPrimary,
					portalAccess
				});
				else await onSubmit({
					name: name.trim(),
					jobTitle: jobTitle.trim(),
					email: email.trim(),
					mobile: mobile.trim(),
					portalAccess
				});
			} finally {
				setSubmitting(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Name",
				htmlFor: "contact-name",
				error: errors.name,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "contact-name",
					value: name,
					onChange: (event) => {
						setName(event.target.value);
						clearError("name");
					},
					className: fieldInputClass(errors.name)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "contact-title",
					children: "Job title"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "contact-title",
					value: jobTitle,
					onChange: (event) => setJobTitle(event.target.value),
					placeholder: "Operations Manager"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Email",
				htmlFor: "contact-email",
				error: errors.email,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "contact-email",
					value: email,
					onChange: (event) => {
						setEmail(event.target.value);
						clearError("email");
					},
					className: fieldInputClass(errors.email)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "contact-mobile",
					children: "Mobile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "contact-mobile",
					value: mobile,
					onChange: (event) => setMobile(event.target.value),
					placeholder: "+1 555 0100"
				})]
			}),
			mode === "create" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-lg border px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "contact-primary",
					children: "Primary contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Mark as the main point of contact"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					id: "contact-primary",
					checked: isPrimary,
					onCheckedChange: setIsPrimary
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-lg border px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "contact-portal",
					children: "Portal access"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Allow this contact to log into the portal"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					id: "contact-portal",
					checked: portalAccess,
					onCheckedChange: setPortalAccess
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				submitLabel,
				submitting,
				onCancel
			})
		]
	});
}
async function createContact(customerId, payload) {
	const { data } = await api.post(`/customers/${customerId}/contacts`, payload);
	return data.data;
}
async function updateContact(customerId, contactId, payload) {
	const { data } = await api.patch(`/customers/${customerId}/contacts/${contactId}`, payload);
	return data.data;
}
async function updateContactStatus(customerId, contactId, status) {
	const { data } = await api.patch(`/customers/${customerId}/contacts/${contactId}/status`, { status });
	return data.data;
}
async function setPrimaryContact(customerId, contactId) {
	const { data } = await api.patch(`/customers/${customerId}/contacts/${contactId}/primary`);
	return data.data;
}
async function inviteContact(customerId, contactId) {
	const { data } = await api.post(`/customers/${customerId}/contacts/${contactId}/invite`);
	return data.data;
}
function invitationLabel(status) {
	if (!status || status === "Not Sent") return "Send invite";
	if (status === "Accepted") return "Invitation accepted";
	return "Resend invite";
}
function CustomerContactsTab({ customerId, canManage }) {
	const queryClient = useQueryClient();
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [editingContact, setEditingContact] = (0, import_react.useState)(null);
	const contactsQuery = useQuery({
		queryKey: ["customer-contacts", customerId],
		queryFn: () => fetchCustomerContacts(customerId)
	});
	const invalidateContacts = () => {
		queryClient.invalidateQueries({ queryKey: ["customer-contacts", customerId] });
		queryClient.invalidateQueries({ queryKey: ["customer-overview", customerId] });
	};
	const createMutation = useMutation({
		mutationFn: (payload) => createContact(customerId, payload),
		onSuccess: () => {
			invalidateContacts();
			setCreateOpen(false);
			toast.success("Contact added.");
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to add contact"))
	});
	const updateMutation = useMutation({
		mutationFn: ({ contactId, payload }) => updateContact(customerId, contactId, payload),
		onSuccess: () => {
			invalidateContacts();
			setEditingContact(null);
			toast.success("Contact updated.");
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update contact"))
	});
	const statusMutation = useMutation({
		mutationFn: ({ contactId, status }) => updateContactStatus(customerId, contactId, status),
		onSuccess: () => {
			invalidateContacts();
			toast.success("Contact status updated.");
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update contact status"))
	});
	const primaryMutation = useMutation({
		mutationFn: (contactId) => setPrimaryContact(customerId, contactId),
		onSuccess: () => {
			invalidateContacts();
			toast.success("Primary contact updated.");
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to set primary contact"))
	});
	const inviteMutation = useMutation({
		mutationFn: (contactId) => inviteContact(customerId, contactId),
		onSuccess: () => {
			invalidateContacts();
			toast.success("Invitation sent.");
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to send invitation"))
	});
	const contacts = contactsQuery.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Contacts",
			actions: canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => setCreateOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add contact"]
			}) : void 0,
			children: contactsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
				rows: 4,
				cols: 5
			}) : contacts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Users,
				title: "No contacts",
				description: "Add contacts for this customer to manage portal access and invitations.",
				action: canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setCreateOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add contact"]
				}) : void 0
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: [
					"Contact",
					"Email",
					"Portal",
					"Invitation",
					"Status",
					...canManage ? ["Actions"] : []
				].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: heading === "Actions" ? "text-right" : void 0,
					children: heading
				}, heading))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: contacts.map((contact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
						name: contact.name,
						subtitle: contact.jobTitle
					}), contact.isPrimary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelPill, { label: "Primary" }) : null]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-muted-foreground",
					children: contact.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: contact.portalAccess ? "Yes" : "No" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-muted-foreground",
					children: contact.portalAccess ? contact.invitationStatus ?? "Not Sent" : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: contact.status }) }),
				canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
						label: "More actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => setEditingContact(contact),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " Edit"]
						}),
						!contact.isPrimary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							disabled: primaryMutation.isPending,
							onClick: () => primaryMutation.mutate(contact._id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4" }), " Set as primary"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							disabled: statusMutation.isPending,
							onClick: () => statusMutation.mutate({
								contactId: contact._id,
								status: contact.status === "Active" ? "Inactive" : "Active"
							}),
							children: contact.status === "Active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "size-4" }), " Deactivate"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-4" }), " Activate"] })
						}),
						contact.portalAccess && contact.invitationStatus !== "Accepted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							disabled: inviteMutation.isPending,
							onClick: () => inviteMutation.mutate(contact._id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }),
								" ",
								invitationLabel(contact.invitationStatus)
							]
						})] })
					]
				})] }) }) })
			] }, contact._id)) })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: createOpen,
			onOpenChange: setCreateOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add contact" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Create a new contact for this customer." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {
				mode: "create",
				onCancel: () => setCreateOpen(false),
				onSubmit: async (payload) => {
					await createMutation.mutateAsync(payload);
				}
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(editingContact),
			onOpenChange: (open) => !open && setEditingContact(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Edit contact" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Update contact details and portal access." })] }), editingContact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {
				mode: "edit",
				initial: editingContact,
				onCancel: () => setEditingContact(null),
				onSubmit: async (payload) => {
					await updateMutation.mutateAsync({
						contactId: editingContact._id,
						payload
					});
				}
			}, editingContact._id)] })
		})
	] });
}
function CustomerDetailPage() {
	const { customerId } = Route$6.useParams();
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [tab, setTab] = (0, import_react.useState)("contacts");
	const overviewQuery = useQuery({
		queryKey: ["customer-overview", customerId],
		queryFn: () => fetchCustomerOverview(customerId)
	});
	const projectsQuery = useQuery({
		queryKey: ["customer-projects", customerId],
		queryFn: () => fetchCustomerProjects(customerId, {
			page: 1,
			limit: 10
		}),
		enabled: tab === "projects"
	});
	const ticketsQuery = useQuery({
		queryKey: ["customer-tickets", customerId],
		queryFn: () => fetchCustomerTickets(customerId, {
			page: 1,
			limit: 10
		}),
		enabled: tab === "tickets"
	});
	const statusMutation = useMutation({
		mutationFn: (status) => updateCustomerStatus(customerId, status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customer-overview", customerId] });
			toast.success("Customer status updated.");
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update status"))
	});
	const inviteMutation = useMutation({
		mutationFn: () => resendCustomerInvitation(customerId),
		onSuccess: () => toast.success("Invitation sent."),
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to send invitation"))
	});
	if (overviewQuery.isLoading || !overviewQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 6,
		cols: 4
	});
	const { customer, summary } = overviewQuery.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-md border border-border/60 bg-card p-5 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-14 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-7" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold tracking-tight text-foreground",
									children: customer.companyName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										customer.customerId,
										" · ",
										customer.primaryContactEmail
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: customer.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground",
										children: customer.invitationStatus ?? "Not Sent"
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin/customers",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin/customers/$customerId/edit",
									params: { customerId },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Edit Customer"]
								})
							}),
							isAdmin(user?.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								disabled: inviteMutation.isPending,
								onClick: () => inviteMutation.mutate(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), "Resend invite"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								disabled: statusMutation.isPending,
								onClick: () => statusMutation.mutate(customer.status === "Active" ? "Inactive" : "Active"),
								children: customer.status === "Active" ? "Deactivate" : "Activate"
							})] })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Projects",
						value: summary.totalProjects
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Tickets",
						value: summary.totalTickets
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Open tickets",
						value: summary.openTickets,
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Closed tickets",
						value: summary.closedTickets,
						tone: "success"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: tab,
				onValueChange: setTab,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
							value: "contacts",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
							title: "Contacts",
							description: "Customer contacts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
							value: "info",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {}),
							title: "Information",
							description: "Company details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
							value: "projects",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, {}),
							title: "Projects",
							description: "Customer projects"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
							value: "tickets",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, {}),
							title: "Tickets",
							description: "Support tickets"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "contacts",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerContactsTab, {
							customerId,
							canManage: isStaff(user?.role)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "info",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
							title: "Customer information",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
								className: "grid gap-3 p-4 text-sm sm:grid-cols-2",
								children: [
									["Address", customer.address || "—"],
									["City", customer.city || "—"],
									["State", customer.state || "—"],
									["Postal code", customer.postalCode || "—"],
									["Country", customer.country || "—"],
									["Phone", customer.phone || "—"],
									["Website", customer.website || "—"],
									["Created", formatDate(customer.createdAt)]
								].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-medium",
									children: value
								})] }, label))
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "projects",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: (projectsQuery.data?.items ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No projects",
							description: "Projects for this customer will appear here."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y",
							children: (projectsQuery.data?.items ?? []).map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between px-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: String(project.name)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: String(project.projectId)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/admin/projects/$projectId",
										params: { projectId: String(project._id) },
										children: "View"
									})
								})]
							}, String(project._id)))
						}) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "tickets",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: (ticketsQuery.data?.items ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No tickets" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y",
							children: (ticketsQuery.data?.items ?? []).map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "px-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: String(ticket.subject)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										String(ticket.number),
										" · ",
										String(ticket.status)
									]
								})]
							}, String(ticket._id)))
						}) })
					})
				]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerDetailPage, {})
});
//#endregion
export { SplitComponent as component };
