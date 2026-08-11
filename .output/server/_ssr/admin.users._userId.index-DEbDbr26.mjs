import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, f as useAuth, l as isAdmin, n as Button, s as getApiErrorMessage } from "./button-vnqCGuCs.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Mail, B as KeyRound, G as Eye, S as Pencil, V as Info, W as FolderKanban, c as UserCheck, d as Ticket, i as UserX, mt as ArrowLeft, r as User, u as Trash2, v as Settings, x as Plus } from "../_libs/lucide-react.mjs";
import { a as PROJECT_STATUSES, c as ProjectStatusBadge, d as SectionCard, f as SlaBadge, i as PRIORITIES, m as TableSkeleton, p as StatusBadge, s as PriorityBadge, t as EmptyState, u as STATUSES } from "./primitives-BAq0jd4Y.mjs";
import { m as formatDate, r as DropdownMenuItem } from "./store-C1539MgZ.mjs";
import { a as DataTableRowMenu, d as PrimaryCell, g as TableCell, h as TableBody, i as DataTablePagination, l as IdLinkCell, m as Table, n as DataTableHead, s as DateCell, t as DataTableActions, v as TableHeader, y as TableRow } from "./data-table-CCefV4l1.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as getTicketSlaState, I as fetchTicketsPage, R as getTicketProjectLabel, ct as ListingCardHeader, dt as ListingPage, lt as ListingFilterField, pt as useListingFilters, r as Route$1, ut as ListingFilterSelect } from "./router-CZIJBryQ.mjs";
import { h as RequireRole } from "./guard-BbFIUcOG.mjs";
import { t as DeleteEntityDialog } from "./delete-entity-dialog-wqY7EtXM.mjs";
import { t as fetchCategories } from "./categories-DyXz_9LF.mjs";
import { t as TicketFormSheet } from "./ticket-form-sheet-DtHYqH2x.mjs";
import { a as fetchInternalUserProjects, c as resendInternalUserInvitation, d as updateInternalUserLogin, f as updateInternalUserStatus, i as fetchInternalUserOverview, l as resetInternalUserPassword, n as deleteInternalUser } from "./internal-users-Mmt9i5-2.mjs";
import { t as InternalUserFormSheet } from "./internal-user-form-sheet-Dlkh5hPo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users._userId.index-DEbDbr26.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE$1 = 10;
var ANY$1 = "all";
var FILTER_DEFAULTS$1 = { status: ANY$1 };
var TABLE_COLUMNS$1 = [
	"Project ID",
	"Project name",
	"Customer",
	"Status",
	"Start date",
	"End date",
	"Action"
];
function UserProjectsTab({ userId }) {
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
		limit
	]);
	const queryParams = (0, import_react.useMemo)(() => ({
		page,
		limit,
		...debouncedQ && { search: debouncedQ },
		...filters.status !== ANY$1 && { status: filters.status }
	}), [
		page,
		limit,
		debouncedQ,
		filters.status
	]);
	const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
		queryKey: [
			"internal-user-projects",
			userId,
			queryParams
		],
		queryFn: () => fetchInternalUserProjects(userId, queryParams)
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load projects"));
	}, [isError, error]);
	const items = data?.items ?? [];
	const meta = data?.meta;
	const totalPages = meta?.totalPages ?? 1;
	const currentPage = meta?.page ?? page;
	const hasFilters = debouncedQ || filters.status !== ANY$1;
	const clearFilters = () => {
		setQ("");
		setDebouncedQ("");
		clear();
		setPage(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCardHeader, {
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
			filterContent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
				label: "Status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
					value: draft.status,
					onChange: (value) => patchDraft({ status: value }),
					options: PROJECT_STATUSES.map((value) => [value, value]),
					allLabel: "All statuses"
				})
			})
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
			rows: 6,
			cols: 7
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FolderKanban,
			title: "No projects found",
			description: hasFilters ? "Try adjusting your search or filters." : "Assigned projects will appear here when this user is added to a project team.",
			secondaryAction: hasFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				onClick: clearFilters,
				children: "Clear filters"
			}) : void 0
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "min-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: TABLE_COLUMNS$1.map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, {
					className: heading === "Action" ? "text-right" : void 0,
					sortable: heading !== "Action",
					children: heading
				}, heading))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: items.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdLinkCell, {
					id: project.projectId,
					to: "/admin/projects/$projectId",
					params: { projectId: project._id }
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: project.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: project.customerName || "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectStatusBadge, { status: project.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCell, { value: project.startDate ? formatDate(project.startDate) : "—" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCell, { value: project.endDate ? formatDate(project.endDate) : "—" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableRowMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/projects/$projectId",
						params: { projectId: project._id },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), " View"]
					})
				}) }) }) })
			] }, project._id)) })]
		}),
		!isLoading && items.length > 0 && meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
			page: currentPage,
			limit: meta.limit,
			total: meta.total,
			totalPages,
			entityLabel: "projects",
			isFetching: isFetching && !isLoading,
			onPageChange: setPage,
			onLimitChange: setLimit
		})
	] }), isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			onClick: () => refetch(),
			children: "Retry"
		})
	})] });
}
var PAGE_SIZE = 10;
var ANY = "all";
var FILTER_DEFAULTS = {
	status: ANY,
	priority: ANY,
	category: ANY,
	sla: ANY,
	sort: "updated"
};
var TABLE_COLUMNS = [
	"Ticket",
	"Project",
	"Priority",
	"Status",
	"Created",
	"SLA",
	"Action"
];
function UserTicketsTab({ userId }) {
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
	const ticketsQuery = useQuery({
		queryKey: [
			"user-tickets",
			userId,
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
			assignedTo: userId,
			...debouncedQ && { search: debouncedQ },
			...filters.status !== ANY && { status: filters.status },
			...filters.priority !== ANY && { priority: filters.priority },
			...filters.category !== ANY && { categoryId: filters.category },
			...sortParams
		})
	});
	(0, import_react.useEffect)(() => {
		if (ticketsQuery.isError) toast.error(getApiErrorMessage(ticketsQuery.error, "Failed to load tickets"));
	}, [ticketsQuery.isError, ticketsQuery.error]);
	const categories = categoriesQuery.data ?? [];
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
			placeholder: "Search ticket ID or subject…",
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
			cols: 7
		}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No tickets match these filters",
			description: "Try a different search term, or reset the filters to see all tickets assigned to this user.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: clearFilters,
				children: "Reset filters"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "min-w-5xl",
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "whitespace-nowrap",
			children: getTicketProjectLabel(ticket)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: ticket.priority }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: ticket.status }) }),
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
var userTabs = [
	{
		id: "information",
		label: "Information",
		icon: Info
	},
	{
		id: "account",
		label: "Account",
		icon: Settings
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
function UserDetailPage() {
	const { userId } = Route$1.useParams();
	const routeSearch = Route$1.useSearch();
	const navigate = useNavigate();
	const { user: currentUser } = useAuth();
	const queryClient = useQueryClient();
	const [tab, setTab] = (0, import_react.useState)("information");
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (routeSearch.edit) {
			setEditOpen(true);
			navigate({
				to: "/admin/users/$userId",
				params: { userId },
				search: {},
				replace: true
			});
		}
	}, [
		routeSearch.edit,
		navigate,
		userId
	]);
	const overviewQuery = useQuery({
		queryKey: ["internal-user-overview", userId],
		queryFn: () => fetchInternalUserOverview(userId)
	});
	const statusMutation = useMutation({
		mutationFn: (status) => updateInternalUserStatus(userId, status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["internal-user-overview", userId] });
			toast.success("Status updated.");
		},
		onError: (err) => toast.error(getApiErrorMessage(err, "Failed to update status"))
	});
	const loginMutation = useMutation({
		mutationFn: (loginEnabled) => updateInternalUserLogin(userId, loginEnabled),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["internal-user-overview", userId] });
			toast.success("Login setting updated.");
		},
		onError: (err) => toast.error(getApiErrorMessage(err, "Failed to update login"))
	});
	const inviteMutation = useMutation({
		mutationFn: () => resendInternalUserInvitation(userId),
		onSuccess: () => toast.success("Invitation sent."),
		onError: (err) => toast.error(getApiErrorMessage(err, "Failed to send invitation"))
	});
	const resetMutation = useMutation({
		mutationFn: () => resetInternalUserPassword(userId),
		onSuccess: () => toast.success("Password reset sent."),
		onError: (err) => toast.error(getApiErrorMessage(err, "Failed to reset password"))
	});
	const deleteMutation = useMutation({
		mutationFn: () => deleteInternalUser(userId),
		onSuccess: () => {
			toast.success("User deleted.");
			navigate({ to: "/admin/users" });
		},
		onError: (err) => toast.error(getApiErrorMessage(err, "Failed to delete user"))
	});
	if (overviewQuery.isLoading || !overviewQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 6,
		cols: 4
	});
	const { user } = overviewQuery.data;
	const displayName = user.name ?? `${user.firstName} ${user.lastName}`;
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-7" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold tracking-tight text-foreground",
									children: displayName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										user.employeeId ?? "—",
										" · ",
										user.email
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: user.status }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground",
											children: user.invitationStatus ?? "Not Sent"
										}),
										user.loginEnabled === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full border border-destructive/30 px-2.5 py-0.5 text-xs text-destructive",
											children: "Login disabled"
										})
									]
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
									to: "/admin/users",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => setEditOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Edit User"]
							}),
							isAdmin(currentUser?.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
									onClick: () => statusMutation.mutate(user.status === "Active" ? "Inactive" : "Active"),
									children: user.status === "Active" ? "Deactivate" : "Activate"
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
						children: userTabs.map((item) => {
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
			tab === "information" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "User information",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid gap-3 p-4 text-sm sm:grid-cols-2",
					children: [
						["Employee ID", user.employeeId || "—"],
						["Full name", displayName],
						["Email", user.email],
						["Mobile", user.phone || "—"],
						["Department", user.departmentName ?? user.department ?? "—"],
						["Designation", user.designation || "—"],
						["Team", user.teamName ?? "—"],
						["Reporting manager", user.reportingManagerName ?? "—"],
						["Joining date", user.dateOfJoining ? formatDate(user.dateOfJoining) : "—"],
						["Role", user.role],
						["Created", user.createdAt ? formatDate(user.createdAt) : "—"]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-medium",
						children: value
					})] }, label))
				})
			}),
			tab === "account" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: "Account settings",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid gap-3 p-4 text-sm sm:grid-cols-2",
					children: [
						["Login email", user.email],
						["Role", user.role],
						["Login status", user.loginEnabled === false ? "Disabled" : "Enabled"],
						["Account status", user.status],
						["Last login", user.lastLogin ? formatDate(user.lastLogin) : "—"],
						["Invitation status", user.invitationStatus ?? "Not Sent"],
						["First login completed", user.firstLoginCompleted ? "Yes" : "No"]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-medium",
						children: value
					})] }, label))
				}), isAdmin(currentUser?.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 border-t p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						disabled: resetMutation.isPending,
						onClick: () => resetMutation.mutate(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }), " Reset password"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						disabled: loginMutation.isPending,
						onClick: () => loginMutation.mutate(user.loginEnabled !== false ? false : true),
						children: [user.loginEnabled === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "size-4" }), user.loginEnabled === false ? "Enable login" : "Disable login"]
					})]
				})]
			}),
			tab === "projects" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserProjectsTab, { userId }),
			tab === "tickets" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserTicketsTab, { userId }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalUserFormSheet, {
				open: editOpen,
				onOpenChange: setEditOpen,
				mode: "edit",
				userId,
				onSaved: () => overviewQuery.refetch()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteEntityDialog, {
				open: deleteOpen,
				onOpenChange: setDeleteOpen,
				title: "Delete user?",
				description: `${displayName} will be permanently removed. Users with assigned tickets cannot be deleted.`,
				isPending: deleteMutation.isPending,
				onConfirm: () => deleteMutation.mutate()
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserDetailPage, {})
});
//#endregion
export { SplitComponent as component };
