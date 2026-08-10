import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus } from "../_libs/lucide-react.mjs";
import { m as TableSkeleton, o as PriorityBadge, p as StatusBadge, t as EmptyState, u as STATUSES } from "./primitives-BneTjl1i.mjs";
import { d as formatDate } from "./store-CZmg1Lwb.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as Table, C as fetchTickets, I as DataTableHead, R as DataTablePagination, T as getTicketCategoryLabel, U as IdLinkCell, V as DateCell, et as TableBody, it as TableRow, rt as TableHeader, tt as TableCell } from "./router-B2W8Gmeh.mjs";
import { _ as RequireRole } from "./guard-BAnzMztv.mjs";
import { a as useListingFilters, i as ListingPage, n as ListingFilterField, r as ListingFilterSelect, t as ListingCardHeader } from "./listing-page-BeTiHD1f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.tickets.index-jzwOh5Pc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ANY = "all";
var FILTER_DEFAULTS = { status: ANY };
function MyTickets() {
	const [q, setQ] = (0, import_react.useState)("");
	const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
	const { data: tickets = [], isLoading, isError, error } = useQuery({
		queryKey: ["tickets", { portal: true }],
		queryFn: fetchTickets
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load tickets"));
	}, [isError, error]);
	const filtered = (0, import_react.useMemo)(() => {
		const list = Array.isArray(tickets) ? tickets : tickets.items;
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
		onExport: () => toast.info("Export coming soon."),
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
		cols: 7
	}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No tickets match your filters." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
		className: "min-w-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
			className: "hover:bg-transparent",
			children: [
				"Ticket ID",
				"Subject",
				"Category",
				"Priority",
				"Status",
				"Created",
				"Last update"
			].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, { children: heading }, heading))
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdLinkCell, {
				id: ticket.number,
				to: "/portal/tickets/$ticketId",
				params: { ticketId: ticket._id }
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "max-w-sm truncate font-medium",
				children: ticket.subject
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
