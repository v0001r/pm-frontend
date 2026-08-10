import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus, K as Eye } from "../_libs/lucide-react.mjs";
import { f as SlaBadge, g as fullName, m as TableSkeleton, o as PriorityBadge, p as StatusBadge, r as PRIORITIES, t as EmptyState, u as STATUSES } from "./primitives-BneTjl1i.mjs";
import { d as formatDate, r as DropdownMenuItem } from "./store-CZmg1Lwb.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as Table, A as getTicketUserLabel, D as getTicketSlaDueAt, E as getTicketProjectLabel, F as DataTableActions, H as EntityCell, I as DataTableHead, O as getTicketSlaState, R as DataTablePagination, T as getTicketCategoryLabel, U as IdLinkCell, V as DateCell, et as TableBody, it as TableRow, k as getTicketUserId, p as Route$17, rt as TableHeader, tt as TableCell, w as fetchTicketsPage, z as DataTableRowMenu } from "./router-B2W8Gmeh.mjs";
import { _ as RequireRole } from "./guard-BAnzMztv.mjs";
import { a as useListingFilters, i as ListingPage, n as ListingFilterField, r as ListingFilterSelect, t as ListingCardHeader } from "./listing-page-BeTiHD1f.mjs";
import { t as fetchEmployees } from "./users-qW6Jl6p_.mjs";
import { t as fetchCategories } from "./categories-gqIh7DFz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tickets.index-BAaghbq0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	"Ticket ID",
	"Subject",
	"Client",
	"Project",
	"Priority",
	"Status",
	"Assigned to",
	"Created",
	"SLA",
	"Action"
];
function TicketsPage() {
	const initial = Route$17.useSearch();
	const [q, setQ] = (0, import_react.useState)("");
	const [debouncedQ, setDebouncedQ] = (0, import_react.useState)("");
	const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS, {
		status: initial.status ?? ANY,
		priority: initial.priority ?? ANY,
		client: initial.client ?? ANY,
		agent: initial.agent ?? ANY,
		sla: initial.sla ?? ANY
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [limit, setLimit] = (0, import_react.useState)(PAGE_SIZE);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedQ(q.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [q]);
	(0, import_react.useEffect)(() => setPage(1), [
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
		queryKey: ["admin-tickets", {
			page,
			limit,
			debouncedQ,
			filters,
			sortParams,
			projectId: initial.projectId
		}],
		queryFn: () => fetchTicketsPage({
			page,
			limit,
			...debouncedQ && { search: debouncedQ },
			...initial.projectId && { projectId: initial.projectId },
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
	const exportCsv = () => {
		const header = "Ticket,Subject,Client,Project,Category,Priority,Status,Agent,Created,Due\n";
		const body = rows.map((ticket) => {
			const due = getTicketSlaDueAt(ticket);
			return [
				ticket.number,
				`"${ticket.subject}"`,
				getTicketUserLabel(ticket.clientId),
				getTicketProjectLabel(ticket),
				getTicketCategoryLabel(ticket),
				ticket.priority,
				ticket.status,
				getTicketUserLabel(ticket.assignedTo),
				formatDate(ticket.createdAt),
				due ? formatDate(due) : ""
			].join(",");
		}).join("\n");
		const url = URL.createObjectURL(new Blob([header + body], { type: "text/csv" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = "tickets.csv";
		link.click();
		URL.revokeObjectURL(url);
		toast.success(`Exported ${rows.length} tickets to CSV.`);
	};
	const loading = ticketsQuery.isLoading || ticketsQuery.isFetching;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCardHeader, {
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
		onExport: exportCsv,
		primaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			className: "rounded-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/tickets/new",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New ticket"]
			})
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
	}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 8,
		cols: 10
	}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No tickets match these filters",
		description: "Try a different search term, or reset the filters to see the full queue.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			onClick: clearFilters,
			children: "Reset filters"
		}),
		secondaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "outline",
			onClick: exportCsv,
			children: "Export current view"
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
	})] })] });
}
function TicketRow({ ticket }) {
	const client = ticket.clientId;
	const agent = ticket.assignedTo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdLinkCell, {
			id: ticket.number,
			to: "/admin/tickets/$ticketId",
			params: { ticketId: ticket._id }
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "max-w-72 font-medium",
			children: ticket.subject
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
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketsPage, {})
});
//#endregion
export { SplitComponent as component };
