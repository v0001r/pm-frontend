import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus, G as Ellipsis, U as Eye, n as Users, w as Pencil } from "../_libs/lucide-react.mjs";
import { f as StatusBadge, p as TableSkeleton, t as EmptyState } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate } from "./store-rjYLW1Ml.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as TableRow, F as DataTableIconButton, I as DataTablePagination, J as Table, P as DataTableActions, Q as TableHeader, V as PrimaryCell, X as TableCell, Y as TableBody, Z as TableHead, st as fetchCustomers, z as EntityCell } from "./router-DLFu5c1a.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { a as ListingSearchRow, i as ListingPageHeader, n as ListingFilterSelect, o as useListingFilters, r as ListingPage, t as ListingFilterField } from "./listing-page-DNRqAcLr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers.index-BU2ZOc64.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 10;
var ANY = "all";
var FILTER_DEFAULTS = {
	status: ANY,
	invitationStatus: ANY
};
function CustomersPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
	const [page, setPage] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => setPage(1), [
		debouncedSearch,
		filters.status,
		filters.invitationStatus
	]);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["customers", {
			page,
			search: debouncedSearch,
			filters
		}],
		queryFn: () => fetchCustomers({
			page,
			limit: PAGE_SIZE,
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, {
		header: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPageHeader, {
			title: "Customers",
			description: "Manage organizations, contacts and portal access.",
			breadcrumbs: [{
				label: "Admin",
				to: "/admin"
			}, { label: "Customers" }],
			addAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				className: "rounded-xl",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/customers/new",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New customer"]
				})
			})
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingSearchRow, {
			value: search,
			onChange: setSearch,
			placeholder: "Search customers…",
			filterOpen: open,
			onFilterOpenChange: setOpen,
			activeFilterCount: activeCount,
			onFilterApply: apply,
			onFilterClear: clearFilters,
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
			cols: 7
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Users,
			title: "No customers found",
			description: "Create your first customer organization."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "min-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: [
					"Customer",
					"Primary contact",
					"Status",
					"Invitation",
					"Portal",
					"Created",
					"Actions"
				].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: h === "Actions" ? "text-right" : void 0,
					children: h
				}, h))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: items.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
					id: customer.customerId,
					title: customer.companyName,
					to: "/admin/customers/$customerId",
					params: { customerId: customer._id }
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
					name: customer.primaryContactName ?? "—",
					subtitle: customer.primaryContactEmail,
					hue: 155
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: customer.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-muted-foreground",
					children: customer.invitationStatus ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: customer.portalEnabled ? "text-emerald-600 font-medium" : "text-muted-foreground",
					children: customer.portalEnabled ? "Enabled" : "Disabled"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-muted-foreground",
					children: formatDate(customer.createdAt)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DataTableActions, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
						label: "View",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/customers/$customerId",
							params: { customerId: customer._id },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
						label: "Edit",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/customers/$customerId/edit",
							params: { customerId: customer._id },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
						label: "More",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
					})
				] }) })
			] }, customer._id)) })]
		}), meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
			page: meta.page,
			limit: meta.limit,
			total: meta.total,
			totalPages: meta.totalPages,
			entityLabel: "customers",
			onPageChange: setPage
		})] })]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomersPage, {})
});
//#endregion
export { SplitComponent as component };
