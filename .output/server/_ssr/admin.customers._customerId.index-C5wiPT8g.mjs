import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as isStaff, a as api, b as useAuth, c as cn, d as getApiFieldErrors, m as isAdmin, n as Button, u as getApiErrorMessage } from "./button-Du-Bk9Wl.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Mail, G as Eye, S as Pencil, U as FolderKanban, V as Info, c as UserCheck, d as Ticket, dt as Building2, i as UserX, m as Star, mt as ArrowLeft, n as Users, u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { _ as fullName, a as PROJECT_STATUSES, c as ProjectStatusBadge, d as SectionCard, f as SlaBadge, i as PRIORITIES, m as TableSkeleton, n as Input, p as StatusBadge, s as PriorityBadge, t as EmptyState, u as STATUSES } from "./primitives-BE889lfB.mjs";
import { a as DropdownMenuSeparator, m as formatDate, r as DropdownMenuItem } from "./store-Cwl19Diw.mjs";
import { _ as TableHead, a as DataTableRowMenu, c as EntityCell, d as PrimaryCell, f as ProgressCell, g as TableCell, h as TableBody, i as DataTablePagination, l as IdLinkCell, m as Table, n as DataTableHead, p as TeamAvatarStack, s as DateCell, t as DataTableActions, u as LabelPill, v as TableHeader, y as TableRow } from "./data-table-CNAlrDoP.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as getTicketUserLabel, I as getTicketProjectLabel, K as fetchEmployees, P as fetchTicketsPage, R as getTicketSlaState, St as Label, _t as ListingFilterField, et as fetchProjects, gt as ListingCardHeader, ht as updateCustomerStatus, lt as fetchCustomerContacts, pt as resendCustomerInvitation, s as Route$6, st as deleteCustomer, ut as fetchCustomerOverview, vt as ListingFilterSelect, xt as useListingFilters, yt as ListingPage, z as getTicketUserId } from "./router-DC97nFe7.mjs";
import { S as focusFirstInvalidField, g as contactFormSchema, h as constrainPersonNameInput, j as mapContactApiFieldErrors, r as FormField, t as FIELD_LIMITS, u as constrainContactMobileInput, x as fieldInputClass } from "./form-validation-CtBmYCtB.mjs";
import { h as RequireRole } from "./guard-DY-g-DXD.mjs";
import { t as Switch } from "./switch-BncIaIFJ.mjs";
import { t as FormActions } from "./form-actions-glquDVsK.mjs";
import { t as useZodForm } from "./use-zod-form-Dm4FjREe.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-C17NDc5r.mjs";
import { t as DeleteEntityDialog } from "./delete-entity-dialog-CtPWR2Cp.mjs";
import { t as CustomerFormSheet } from "./customer-form-sheet-Bd1r8TeX.mjs";
import { t as ProjectFormSheet } from "./project-form-sheet-CaYswj43.mjs";
import { t as fetchCategories } from "./categories-0r8IUY6G.mjs";
import { t as TicketFormSheet } from "./ticket-form-sheet-I6lNazLg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers._customerId.index-C5wiPT8g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactForm({ initial, mode, onSubmit, onCancel, submitLabel = mode === "create" ? "Add contact" : "Save changes" }) {
	const { errors, handleBlur, handleChange, setFieldErrors, validateAll } = useZodForm(contactFormSchema);
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [jobTitle, setJobTitle] = (0, import_react.useState)(initial?.jobTitle ?? "");
	const [email, setEmail] = (0, import_react.useState)(initial?.email ?? "");
	const [mobile, setMobile] = (0, import_react.useState)(initial?.mobile ?? "");
	const [isPrimary, setIsPrimary] = (0, import_react.useState)(initial?.isPrimary ?? false);
	const [portalAccess, setPortalAccess] = (0, import_react.useState)(initial?.portalAccess ?? false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	function fieldHandlers(field, setter) {
		return {
			onChange: (event) => {
				let next = event.target.value;
				if (field === "name") {
					next = constrainPersonNameInput(next);
					if (next.length > FIELD_LIMITS.NAME_MAX) {
						setter(next.slice(0, FIELD_LIMITS.NAME_MAX));
						handleBlur(field, next);
						return;
					}
				} else if (field === "mobile") next = constrainContactMobileInput(next);
				setter(next);
				handleChange(field, next);
			},
			onBlur: (event) => {
				const next = field === "name" ? event.target.value.trim() : event.target.value;
				if (field === "name") setter(next);
				handleBlur(field, next);
			}
		};
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-4",
		noValidate: true,
		onSubmit: async (event) => {
			event.preventDefault();
			const validation = validateAll({
				name,
				email,
				mobile,
				jobTitle
			});
			if (!validation.success) {
				focusFirstInvalidField(validation.errors, [
					"name",
					"jobTitle",
					"email",
					"mobile"
				]);
				return;
			}
			const data = validation.data;
			setSubmitting(true);
			try {
				if (mode === "create") await onSubmit({
					name: data.name,
					jobTitle: data.jobTitle.trim() || void 0,
					email: data.email,
					mobile: data.mobile || void 0,
					isPrimary,
					portalAccess
				});
				else await onSubmit({
					name: data.name,
					jobTitle: data.jobTitle.trim(),
					email: data.email,
					mobile: data.mobile || "",
					portalAccess
				});
			} catch (error) {
				const fieldErrors = mapContactApiFieldErrors(getApiFieldErrors(error));
				if (Object.keys(fieldErrors).length > 0) {
					setFieldErrors(fieldErrors);
					focusFirstInvalidField(fieldErrors, [
						"name",
						"jobTitle",
						"email",
						"mobile"
					]);
					return;
				}
				throw error;
			} finally {
				setSubmitting(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Name",
				htmlFor: "contact-name",
				error: errors.name,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "contact-name",
					value: name,
					...fieldHandlers("name", setName),
					maxLength: FIELD_LIMITS.NAME_MAX + 1,
					"aria-invalid": Boolean(errors.name),
					"aria-describedby": errors.name ? "contact-name-error" : void 0,
					className: fieldInputClass(errors.name)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Job title",
				htmlFor: "contact-title",
				error: errors.jobTitle,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "contact-title",
					value: jobTitle,
					...fieldHandlers("jobTitle", setJobTitle),
					maxLength: FIELD_LIMITS.TITLE_MAX,
					placeholder: "Operations Manager",
					"aria-invalid": Boolean(errors.jobTitle),
					"aria-describedby": errors.jobTitle ? "contact-title-error" : void 0,
					className: fieldInputClass(errors.jobTitle)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Email",
				htmlFor: "contact-email",
				error: errors.email,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "contact-email",
					type: "text",
					inputMode: "email",
					autoComplete: "email",
					spellCheck: false,
					maxLength: FIELD_LIMITS.EMAIL_MAX,
					value: email,
					...fieldHandlers("email", setEmail),
					"aria-invalid": Boolean(errors.email),
					"aria-describedby": errors.email ? "contact-email-error" : void 0,
					className: fieldInputClass(errors.email)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Mobile",
				htmlFor: "contact-mobile",
				error: errors.mobile,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "contact-mobile",
					type: "text",
					inputMode: "tel",
					autoComplete: "tel",
					maxLength: FIELD_LIMITS.MOBILE_MAX_DIGITS,
					value: mobile,
					...fieldHandlers("mobile", setMobile),
					placeholder: "9876543210",
					"aria-invalid": Boolean(errors.mobile),
					"aria-describedby": errors.mobile ? "contact-mobile-error" : void 0,
					className: fieldInputClass(errors.mobile)
				})
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
		onError: (error) => {
			if (Object.keys(getApiFieldErrors(error)).length === 0) toast.error(getApiErrorMessage(error, "Failed to add contact"));
		}
	});
	const updateMutation = useMutation({
		mutationFn: ({ contactId, payload }) => updateContact(customerId, contactId, payload),
		onSuccess: () => {
			invalidateContacts();
			setEditingContact(null);
			toast.success("Contact updated.");
		},
		onError: (error) => {
			if (Object.keys(getApiFieldErrors(error)).length === 0) toast.error(getApiErrorMessage(error, "Failed to update contact"));
		}
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
				canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DataTableRowMenu, { children: [
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
				] }) }) })
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
var PAGE_SIZE$1 = 10;
var ANY$1 = "all";
var SORT_OPTIONS = [
	{
		value: "updated",
		label: "Recently updated",
		sortBy: "createdAt",
		sortOrder: "desc"
	},
	{
		value: "name-asc",
		label: "Name (A–Z)",
		sortBy: "name",
		sortOrder: "asc"
	},
	{
		value: "name-desc",
		label: "Name (Z–A)",
		sortBy: "name",
		sortOrder: "desc"
	},
	{
		value: "start",
		label: "Start date",
		sortBy: "startDate",
		sortOrder: "desc"
	},
	{
		value: "end",
		label: "End date",
		sortBy: "endDate",
		sortOrder: "asc"
	}
];
var FILTER_DEFAULTS$1 = {
	status: ANY$1,
	sort: "updated"
};
var TABLE_COLUMNS$1 = [
	"Project ID",
	"Project name",
	"Status",
	"Team members",
	"Start date",
	"End date",
	"Progress",
	"Action"
];
function CustomerProjectsTab({ customerId }) {
	const { user } = useAuth();
	const canManage = isStaff(user?.role);
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	const [debouncedQ, setDebouncedQ] = (0, import_react.useState)("");
	const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS$1);
	const [page, setPage] = (0, import_react.useState)(1);
	const [limit, setLimit] = (0, import_react.useState)(PAGE_SIZE$1);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedQ(q.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [q]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		debouncedQ,
		filters.status,
		filters.sort,
		limit
	]);
	const sortConfig = SORT_OPTIONS.find((option) => option.value === filters.sort) ?? SORT_OPTIONS[0];
	const queryParams = (0, import_react.useMemo)(() => ({
		page,
		limit,
		customerId,
		...debouncedQ && { search: debouncedQ },
		...filters.status !== ANY$1 && { status: filters.status },
		sortBy: sortConfig.sortBy,
		sortOrder: sortConfig.sortOrder
	}), [
		page,
		limit,
		customerId,
		debouncedQ,
		filters.status,
		sortConfig
	]);
	const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
		queryKey: [
			"customer-projects",
			customerId,
			queryParams
		],
		queryFn: () => fetchProjects(queryParams)
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load projects"));
	}, [isError, error]);
	const items = data?.items ?? [];
	const meta = data?.meta;
	const totalPages = meta?.totalPages ?? 1;
	const currentPage = meta?.page ?? page;
	const clearFilters = () => {
		setQ("");
		setDebouncedQ("");
		clear();
		setPage(1);
	};
	const hasFilters = debouncedQ || filters.status !== ANY$1 || filters.sort !== "updated";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCardHeader, {
			title: "Projects",
			description: meta ? `Total ${meta.total} projects` : "Loading projects…",
			value: q,
			onChange: setQ,
			placeholder: "Search by project ID or name…",
			filterOpen: open,
			onFilterOpenChange: setOpen,
			activeFilterCount: activeCount,
			onFilterApply: apply,
			onFilterClear: clearFilters,
			primaryAction: canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				className: "rounded-md",
				onClick: () => setCreateOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New project"]
			}) : void 0,
			filterContent: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
				label: "Status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
					value: draft.status,
					onChange: (value) => patchDraft({ status: value }),
					options: PROJECT_STATUSES.map((value) => [value, value]),
					allLabel: "All statuses"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
				label: "Sort by",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
					value: draft.sort,
					onChange: (value) => patchDraft({ sort: value }),
					allValue: "updated",
					allLabel: "Recently updated",
					options: SORT_OPTIONS.filter((option) => option.value !== "updated").map((option) => [option.value, option.label])
				})
			})] })
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
			rows: 6,
			cols: 8
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FolderKanban,
			title: "No projects found",
			description: hasFilters ? "Try adjusting your search or filters." : "Create a project for this customer to start tracking work.",
			action: canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => setCreateOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New project"]
			}) : void 0,
			secondaryAction: hasFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				onClick: clearFilters,
				children: "Clear filters"
			}) : void 0
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				className: cn("min-w-6xl", isFetching && !isLoading && "opacity-70"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					className: "hover:bg-transparent",
					children: TABLE_COLUMNS$1.map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, {
						className: heading === "Action" ? "text-right" : void 0,
						sortable: heading !== "Action",
						children: heading
					}, heading))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: items.map((project) => {
					const progressTone = project.status === "Open" ? "primary" : project.status === "On Hold" ? "warning" : project.status === "Completed" ? "success" : "violet";
					const preview = project.memberPreview ?? [];
					const extra = Math.max(0, (project.memberCount ?? preview.length) - Math.min(2, preview.length));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdLinkCell, {
							id: project.projectId,
							to: "/admin/projects/$projectId",
							params: { projectId: project._id }
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: project.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectStatusBadge, { status: project.status }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamAvatarStack, {
							members: preview.map((member) => ({ name: member.name })),
							extra
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCell, { value: formatDate(project.startDate) }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCell, { value: project.endDate ? formatDate(project.endDate) : "—" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressCell, {
							value: project.progressPercentage,
							tone: progressTone
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DataTableRowMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/projects/$projectId",
								params: { projectId: project._id },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), " View"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => setEditId(project._id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " Edit"]
						})] }) }) })
					] }, project._id);
				}) })]
			})
		}), meta && meta.total > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
			page: currentPage,
			limit: meta.limit,
			total: meta.total,
			totalPages,
			entityLabel: "projects",
			isFetching: isFetching && !isLoading,
			onPageChange: setPage,
			onLimitChange: setLimit
		}) : null] })] }),
		isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => refetch(),
				children: "Retry"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectFormSheet, {
			open: createOpen,
			onOpenChange: setCreateOpen,
			mode: "create",
			defaultCustomerId: customerId,
			onSaved: () => refetch()
		}),
		editId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectFormSheet, {
			open: true,
			onOpenChange: (open) => {
				if (!open) setEditId(null);
			},
			mode: "edit",
			projectId: editId,
			onSaved: () => refetch()
		}) : null
	] });
}
var PAGE_SIZE = 10;
var ANY = "all";
var FILTER_DEFAULTS = {
	status: ANY,
	priority: ANY,
	category: ANY,
	client: ANY,
	agent: ANY,
	sla: ANY,
	sort: "updated"
};
var TABLE_COLUMNS = [
	"Ticket",
	"Client",
	"Project",
	"Priority",
	"Status",
	"Assigned to",
	"Created",
	"SLA",
	"Action"
];
function CustomerTicketsTab({ customerId }) {
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [debouncedQ, setDebouncedQ] = (0, import_react.useState)("");
	const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
	const [page, setPage] = (0, import_react.useState)(1);
	const [limit, setLimit] = (0, import_react.useState)(PAGE_SIZE);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedQ(q.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [q]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		debouncedQ,
		filters.status,
		filters.priority,
		filters.category,
		filters.client,
		filters.agent,
		filters.sla,
		filters.sort,
		limit
	]);
	const sortParams = (0, import_react.useMemo)(() => {
		switch (filters.sort) {
			case "created": return {
				sortBy: "createdAt",
				sortOrder: "desc"
			};
			case "priority": return {
				sortBy: "priority",
				sortOrder: "asc"
			};
			case "due": return {
				sortBy: "dueAt",
				sortOrder: "asc"
			};
			default: return {
				sortBy: "lastActivityAt",
				sortOrder: "desc"
			};
		}
	}, [filters.sort]);
	const categoriesQuery = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories
	});
	const employeesQuery = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees
	});
	const ticketsQuery = useQuery({
		queryKey: [
			"customer-tickets",
			customerId,
			{
				page,
				limit,
				debouncedQ,
				filters,
				sortParams
			}
		],
		queryFn: () => fetchTicketsPage({
			page,
			limit,
			customerId,
			...debouncedQ && { search: debouncedQ },
			...filters.status !== ANY && { status: filters.status },
			...filters.priority !== ANY && { priority: filters.priority },
			...filters.category !== ANY && { categoryId: filters.category },
			...filters.client !== ANY && { clientId: filters.client },
			...filters.agent === "unassigned" ? { unassigned: true } : filters.agent !== ANY ? { assignedTo: filters.agent } : {},
			...sortParams
		})
	});
	(0, import_react.useEffect)(() => {
		if (ticketsQuery.isError) toast.error(getApiErrorMessage(ticketsQuery.error, "Failed to load tickets"));
	}, [ticketsQuery.isError, ticketsQuery.error]);
	const categories = categoriesQuery.data ?? [];
	const employees = employeesQuery.data ?? [];
	const meta = ticketsQuery.data?.meta ?? {
		page: 1,
		limit: PAGE_SIZE,
		total: 0,
		totalPages: 1
	};
	const rows = (0, import_react.useMemo)(() => {
		const items = ticketsQuery.data?.items ?? [];
		if (filters.sla === ANY) return items;
		return items.filter((ticket) => getTicketSlaState(ticket) === filters.sla);
	}, [ticketsQuery.data?.items, filters.sla]);
	const clientOptions = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const ticket of ticketsQuery.data?.items ?? []) {
			const id = getTicketUserId(ticket.clientId);
			if (id) map.set(id, getTicketUserLabel(ticket.clientId));
		}
		return [...map.entries()];
	}, [ticketsQuery.data?.items]);
	const pages = Math.max(1, meta.totalPages);
	const current = Math.min(page, pages);
	const clearFilters = () => {
		setQ("");
		setDebouncedQ("");
		clear();
		setPage(1);
	};
	const loading = ticketsQuery.isLoading || ticketsQuery.isFetching;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCardHeader, {
			title: "Tickets",
			description: `Total ${meta.total} tickets`,
			value: q,
			onChange: setQ,
			placeholder: "Search ticket ID, subject or client…",
			filterOpen: open,
			onFilterOpenChange: setOpen,
			activeFilterCount: activeCount,
			onFilterApply: apply,
			onFilterClear: clearFilters,
			primaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				className: "rounded-md",
				onClick: () => setCreateOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New ticket"]
			}),
			filterContent: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
					label: "Status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
						value: draft.status,
						onChange: (value) => patchDraft({ status: value }),
						options: STATUSES.map((s) => [s, s]),
						allLabel: "All statuses"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
					label: "Priority",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
						value: draft.priority,
						onChange: (value) => patchDraft({ priority: value }),
						options: PRIORITIES.map((p) => [p, p]),
						allLabel: "All priorities"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
					label: "Category",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
						value: draft.category,
						onChange: (value) => patchDraft({ category: value }),
						options: categories.map((c) => [c._id, c.name]),
						allLabel: "All categories"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
					label: "Client",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
						value: draft.client,
						onChange: (value) => patchDraft({ client: value }),
						options: clientOptions,
						allLabel: "All clients"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
					label: "Agent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
						value: draft.agent,
						onChange: (value) => patchDraft({ agent: value }),
						options: [["unassigned", "Unassigned"]].concat(employees.map((u) => [u.id ?? u._id ?? "", fullName(u)])),
						allLabel: "All agents"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
					label: "SLA",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
						value: draft.sla,
						onChange: (value) => patchDraft({ sla: value }),
						options: [
							["On Track", "On Track"],
							["Approaching", "Approaching"],
							["Breached", "Breached"],
							["Met", "Met"]
						],
						allLabel: "All SLA states"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
					label: "Sort by",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
						value: draft.sort,
						onChange: (value) => patchDraft({ sort: value }),
						allValue: "updated",
						allLabel: "Last updated",
						options: [
							["created", "Created date"],
							["priority", "Priority"],
							["due", "SLA due date"]
						]
					})
				})
			] })
		}),
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
			rows: 8,
			cols: 9
		}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No tickets match these filters",
			description: "Try a different search term, or reset the filters to see all tickets for this customer.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: clearFilters,
				children: "Reset filters"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "min-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: TABLE_COLUMNS.map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, {
					className: heading === "Action" ? "text-right" : void 0,
					sortable: heading !== "Action",
					children: heading
				}, heading))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketRow, { ticket }, ticket._id)) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
			page: current,
			limit,
			total: meta.total,
			totalPages: pages,
			entityLabel: "tickets",
			onPageChange: setPage,
			onLimitChange: setLimit
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketFormSheet, {
			open: createOpen,
			onOpenChange: setCreateOpen,
			onSaved: () => ticketsQuery.refetch()
		})
	] });
}
function TicketRow({ ticket }) {
	const client = ticket.clientId;
	const agent = ticket.assignedTo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "max-w-80",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
				id: ticket.number,
				title: ticket.subject,
				to: "/admin/tickets/$ticketId",
				params: { ticketId: ticket._id }
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
			name: getTicketUserLabel(client),
			subtitle: client?.email ?? "",
			hue: 42,
			showAvatar: true
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "whitespace-nowrap",
			children: getTicketProjectLabel(ticket)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: ticket.priority }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: ticket.status }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "whitespace-nowrap",
			children: agent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
				name: getTicketUserLabel(agent),
				hue: 155,
				showAvatar: true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: "Unassigned"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCell, { value: formatDate(ticket.createdAt) }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "whitespace-nowrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { state: getTicketSlaState(ticket) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableRowMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/tickets/$ticketId",
				params: { ticketId: ticket._id },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), " View"]
			})
		}) }) }) })
	] });
}
var customerTabs = [
	{
		id: "contacts",
		label: "Contacts",
		icon: Users
	},
	{
		id: "info",
		label: "Information",
		icon: Info
	},
	{
		id: "projects",
		label: "Projects",
		icon: FolderKanban
	},
	{
		id: "tickets",
		label: "Tickets",
		icon: Ticket
	}
];
function CustomerDetailPage() {
	const { customerId } = Route$6.useParams();
	const routeSearch = Route$6.useSearch();
	const navigate = useNavigate();
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [tab, setTab] = (0, import_react.useState)("contacts");
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (routeSearch.edit) {
			setEditOpen(true);
			navigate({
				to: "/admin/customers/$customerId",
				params: { customerId },
				search: {},
				replace: true
			});
		}
	}, [
		routeSearch.edit,
		navigate,
		customerId
	]);
	const overviewQuery = useQuery({
		queryKey: ["customer-overview", customerId],
		queryFn: () => fetchCustomerOverview(customerId)
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
	const deleteMutation = useMutation({
		mutationFn: () => deleteCustomer(customerId),
		onSuccess: () => {
			toast.success("Customer deleted.");
			navigate({ to: "/admin/customers" });
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to delete customer"))
	});
	if (overviewQuery.isLoading || !overviewQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 6,
		cols: 4
	});
	const { customer } = overviewQuery.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-md border border-border/60 bg-card shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4 p-5",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => setEditOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Edit Customer"]
							}),
							isAdmin(user?.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									disabled: inviteMutation.isPending,
									onClick: () => inviteMutation.mutate(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), "Resend invite"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									disabled: statusMutation.isPending,
									onClick: () => statusMutation.mutate(customer.status === "Active" ? "Inactive" : "Active"),
									children: customer.status === "Active" ? "Deactivate" : "Activate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									className: "text-destructive hover:text-destructive",
									onClick: () => setDeleteOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Delete"]
								})
							] })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto border-t border-border/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex min-w-max items-center gap-1 px-2",
						children: customerTabs.map((item) => {
							const Icon = item.icon;
							const active = tab === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTab(item.id),
								className: cn("inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors", active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
							}, item.id);
						})
					})
				})]
			}),
			tab === "contacts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerContactsTab, {
				customerId,
				canManage: isStaff(user?.role)
			}),
			tab === "info" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
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
			}),
			tab === "projects" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerProjectsTab, { customerId }),
			tab === "tickets" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerTicketsTab, { customerId }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerFormSheet, {
				open: editOpen,
				onOpenChange: setEditOpen,
				mode: "edit",
				customerId,
				onSaved: () => overviewQuery.refetch()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteEntityDialog, {
				open: deleteOpen,
				onOpenChange: setDeleteOpen,
				title: "Delete customer?",
				description: `${customer.companyName} will be permanently removed. Customers with projects or tickets cannot be deleted.`,
				isPending: deleteMutation.isPending,
				onConfirm: () => deleteMutation.mutate()
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
