import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, u as getApiErrorMessage } from "./button-Du-Bk9Wl.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { x as Plus } from "../_libs/lucide-react.mjs";
import { m as TableSkeleton, p as StatusBadge, s as PriorityBadge, t as EmptyState, u as STATUSES } from "./primitives-BE889lfB.mjs";
import { m as formatDate } from "./store-Cwl19Diw.mjs";
import { d as PrimaryCell, g as TableCell, h as TableBody, i as DataTablePagination, m as Table, n as DataTableHead, s as DateCell, v as TableHeader, y as TableRow } from "./data-table-CNAlrDoP.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as getTicketCategoryLabel, N as fetchTickets, _t as ListingFilterField, gt as ListingCardHeader, vt as ListingFilterSelect, xt as useListingFilters, yt as ListingPage } from "./router-DC97nFe7.mjs";
import { h as RequireRole } from "./guard-DY-g-DXD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.tickets.index-D5ZSX0Xv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ANY = "all";
var FILTER_DEFAULTS = { status: ANY };
function MyTickets() {
	const [q, setQ] = (0, import_react.useState)("");
	const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
	const { data: tickets = [], isLoading, isError, error } = useQuery({
		queryKey: ["tickets", { portal: true }],
		queryFn: () => fetchTickets()
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load tickets"));
	}, [isError, error]);
	const filtered = (0, import_react.useMemo)(() => {
		const list = Array.isArray(tickets) ? tickets : tickets?.items ?? [];
		const term = q.trim().toLowerCase();
		return list.filter((ticket) => filters.status === ANY ? true : ticket.status === filters.status).filter((ticket) => `${ticket.number} ${ticket.subject}`.toLowerCase().includes(term));
	}, [
		tickets,
		q,
		filters.status
	]);
	const clearFilters = () => {
		setQ("");
		clear();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCardHeader, {
		title: "My tickets",
		description: `Total ${filtered.length} tickets`,
		value: q,
		onChange: setQ,
		placeholder: "Search by ID or subject…",
		filterOpen: open,
		onFilterOpenChange: setOpen,
		activeFilterCount: activeCount,
		onFilterApply: apply,
		onFilterClear: clearFilters,
		primaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			className: "rounded-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/portal/tickets/new",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New ticket"]
			})
		}),
		filterContent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "Status",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
				value: draft.status,
				onChange: (value) => patchDraft({ status: value }),
				options: STATUSES.map((value) => [value, value]),
				allLabel: "All statuses"
			})
		})
	}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 6,
		cols: 6
	}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No tickets match your filters." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
		className: "min-w-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
			className: "hover:bg-transparent",
			children: [
				"Ticket",
				"Category",
				"Priority",
				"Status",
				"Created",
				"Last update"
			].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, { children: heading }, heading))
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "max-w-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
					id: ticket.number,
					title: ticket.subject,
					to: "/portal/tickets/$ticketId",
					params: { ticketId: ticket._id }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-muted-foreground",
				children: getTicketCategoryLabel(ticket)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: ticket.priority }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: ticket.status }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCell, { value: formatDate(ticket.createdAt) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCell, { value: formatDate(ticket.updatedAt, true) }) })
		] }, ticket._id)) })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
		page: 1,
		limit: filtered.length,
		total: filtered.length,
		totalPages: 1,
		entityLabel: "tickets",
		onPageChange: () => void 0
	})] })] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Client"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyTickets, {})
});
//#endregion
export { SplitComponent as component };
