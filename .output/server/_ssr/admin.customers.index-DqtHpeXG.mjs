import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus, K as Eye, n as Users, w as Pencil } from "../_libs/lucide-react.mjs";
import { m as TableSkeleton, p as StatusBadge, t as EmptyState } from "./primitives-BneTjl1i.mjs";
import { d as formatDate, r as DropdownMenuItem } from "./store-CZmg1Lwb.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as Table, F as DataTableActions, H as EntityCell, I as DataTableHead, R as DataTablePagination, U as IdLinkCell, V as DateCell, et as TableBody, ft as fetchCustomers, it as TableRow, rt as TableHeader, tt as TableCell, z as DataTableRowMenu } from "./router-B2W8Gmeh.mjs";
import { _ as RequireRole } from "./guard-BAnzMztv.mjs";
import { a as useListingFilters, i as ListingPage, n as ListingFilterField, r as ListingFilterSelect, t as ListingCardHeader } from "./listing-page-BeTiHD1f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers.index-DqtHpeXG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 10;
var ANY = "all";
var FILTER_DEFAULTS = {
	status: ANY,
	invitationStatus: ANY
};
var TABLE_COLUMNS = [
	"Customer ID",
	"Company",
	"Primary contact",
	"Status",
	"Invitation",
	"Portal",
	"Created",
	"Action"
];
function CustomersPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
	const [page, setPage] = (0, import_react.useState)(1);
	const [limit, setLimit] = (0, import_react.useState)(PAGE_SIZE);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => setPage(1), [
		debouncedSearch,
		filters.status,
		filters.invitationStatus,
		limit
	]);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["customers", {
			page,
			limit,
			search: debouncedSearch,
			filters
		}],
		queryFn: () => fetchCustomers({
			page,
			limit,
			...debouncedSearch && { search: debouncedSearch },
			...filters.status !== ANY && { status: filters.status },
			...filters.invitationStatus !== ANY && { invitationStatus: filters.invitationStatus },
			sortBy: "createdAt",
			sortOrder: "desc"
		})
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load customers"));
	}, [isError, error]);
	const items = data?.items ?? [];
	const meta = data?.meta;
	debouncedSearch || filters.status !== ANY || filters.invitationStatus;
	const clearFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		clear();
		setPage(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCardHeader, {
		title: "Customers",
		description: meta ? `Total ${meta.total} customers` : "Loading customers…",
		value: search,
		onChange: setSearch,
		placeholder: "Search by customer ID, company or contact…",
		filterOpen: open,
		onFilterOpenChange: setOpen,
		activeFilterCount: activeCount,
		onFilterApply: apply,
		onFilterClear: clearFilters,
		onExport: () => toast.info("Export coming soon."),
		primaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			className: "rounded-md",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/customers/new",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New customer"]
			})
		}),
		filterContent: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "Status",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
				value: draft.status,
				onChange: (value) => patchDraft({ status: value }),
				options: [["Active", "Active"], ["Inactive", "Inactive"]],
				allLabel: "All statuses"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "Invitation",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
				value: draft.invitationStatus,
				onChange: (value) => patchDraft({ invitationStatus: value }),
				options: [
					"Not Sent",
					"Pending",
					"Accepted",
					"Expired",
					"Resent"
				].map((value) => [value, value]),
				allLabel: "All invitations"
			})
		})] })
	}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 6,
		cols: 8
	}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Users,
		title: "No customers found",
		description: "Create your first customer organization."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
		className: "min-w-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
			className: "hover:bg-transparent",
			children: TABLE_COLUMNS.map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, {
				className: heading === "Action" ? "text-right" : void 0,
				sortable: heading !== "Action",
				children: heading
			}, heading))
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: items.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdLinkCell, {
				id: customer.customerId,
				to: "/admin/customers/$customerId",
				params: { customerId: customer._id }
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-medium",
				children: customer.companyName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
				name: customer.primaryContactName ?? "—",
				subtitle: customer.primaryContactEmail,
				hue: 155,
				showAvatar: true
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: customer.status }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-muted-foreground",
				children: customer.invitationStatus ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: customer.portalEnabled ? "font-medium text-emerald-600" : "text-muted-foreground",
				children: customer.portalEnabled ? "Enabled" : "Disabled"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCell, { value: formatDate(customer.createdAt) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DataTableRowMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/customers/$customerId",
					params: { customerId: customer._id },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), " View"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/customers/$customerId/edit",
					params: { customerId: customer._id },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " Edit"]
				})
			})] }) }) })
		] }, customer._id)) })]
	}), meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
		page: meta.page,
		limit: meta.limit,
		total: meta.total,
		totalPages: meta.totalPages,
		entityLabel: "customers",
		onPageChange: setPage,
		onLimitChange: setLimit
	})] })] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomersPage, {})
});
//#endregion
export { SplitComponent as component };
