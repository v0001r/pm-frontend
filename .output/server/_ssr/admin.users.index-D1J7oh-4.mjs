import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus, G as Ellipsis, K as Download, U as Eye, n as Users, w as Pencil } from "../_libs/lucide-react.mjs";
import { f as StatusBadge, p as TableSkeleton, t as EmptyState } from "./primitives-rWqtcPGP.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as TableRow, F as DataTableIconButton, I as DataTablePagination, J as Table, P as DataTableActions, Q as TableHeader, V as PrimaryCell, X as TableCell, Y as TableBody, Z as TableHead } from "./router-DLFu5c1a.mjs";
import { S as RequireRole, _ as DropdownMenuTrigger, g as DropdownMenuSeparator, h as DropdownMenuItem, m as DropdownMenuContent, p as DropdownMenu } from "./guard-Da2hUi3G.mjs";
import { a as ListingSearchRow, i as ListingPageHeader, n as ListingFilterSelect, o as useListingFilters, r as ListingPage, t as ListingFilterField } from "./listing-page-DNRqAcLr.mjs";
import { t as fetchDepartments } from "./org-5q5rz7Q2.mjs";
import { c as resendInternalUserInvitation, f as updateInternalUserStatus, l as resetInternalUserPassword, n as exportInternalUsers, o as fetchInternalUsers } from "./internal-users-BgPtnBI9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users.index-D1J7oh-4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 10;
var ANY = "all";
var FILTER_DEFAULTS = {
	status: ANY,
	role: ANY,
	departmentId: ANY
};
function UsersPage() {
	const queryClient = useQueryClient();
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
		filters.role,
		filters.departmentId
	]);
	const departmentsQuery = useQuery({
		queryKey: ["departments"],
		queryFn: fetchDepartments
	});
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["internal-users", {
			page,
			search: debouncedSearch,
			filters
		}],
		queryFn: async () => {
			const result = await fetchInternalUsers({
				page,
				limit: PAGE_SIZE,
				...debouncedSearch && { search: debouncedSearch },
				...filters.status !== ANY && { status: filters.status },
				...filters.role !== ANY && { role: filters.role },
				...filters.departmentId !== ANY && { departmentId: filters.departmentId },
				sortBy: "createdAt",
				sortOrder: "desc"
			});
			if (Array.isArray(result)) return {
				items: result,
				meta: {
					page: 1,
					limit: result.length,
					total: result.length,
					totalPages: 1
				}
			};
			return result;
		}
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load users"));
	}, [isError, error]);
	const statusMutation = useMutation({
		mutationFn: ({ id, next }) => updateInternalUserStatus(id, next),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["internal-users"] });
			toast.success("User status updated.");
		},
		onError: (err) => toast.error(getApiErrorMessage(err, "Failed to update status"))
	});
	const inviteMutation = useMutation({
		mutationFn: resendInternalUserInvitation,
		onSuccess: () => toast.success("Invitation sent."),
		onError: (err) => toast.error(getApiErrorMessage(err, "Failed to send invitation"))
	});
	const resetMutation = useMutation({
		mutationFn: resetInternalUserPassword,
		onSuccess: () => toast.success("Password reset email sent."),
		onError: (err) => toast.error(getApiErrorMessage(err, "Failed to reset password"))
	});
	const items = data?.items ?? [];
	const meta = data?.meta;
	const clearFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		clear();
		setPage(1);
	};
	const exportUsers = async () => {
		try {
			const blob = await exportInternalUsers({
				...debouncedSearch && { search: debouncedSearch },
				...filters.status !== ANY && { status: filters.status },
				...filters.role !== ANY && { role: filters.role },
				...filters.departmentId !== ANY && { departmentId: filters.departmentId }
			});
			const url = URL.createObjectURL(blob);
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = "users.csv";
			anchor.click();
			URL.revokeObjectURL(url);
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Export failed"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, {
		header: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPageHeader, {
			title: "Internal users",
			description: "Manage employees, roles, and portal access.",
			breadcrumbs: [{
				label: "Admin",
				to: "/admin"
			}, { label: "Users" }],
			exportAction: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				className: "rounded-xl",
				onClick: exportUsers,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export"]
			}),
			addAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				className: "rounded-xl",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/users/new",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New user"]
				})
			})
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingSearchRow, {
			value: search,
			onChange: setSearch,
			placeholder: "Search users…",
			filterOpen: open,
			onFilterOpenChange: setOpen,
			activeFilterCount: activeCount,
			onFilterApply: apply,
			onFilterClear: clearFilters,
			filterContent: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
					label: "Department",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
						value: draft.departmentId,
						onChange: (value) => patchDraft({ departmentId: value }),
						options: (departmentsQuery.data ?? []).map((d) => [d._id, d.name]),
						allLabel: "All departments"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
					label: "Role",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
						value: draft.role,
						onChange: (value) => patchDraft({ role: value }),
						options: [["Admin", "Admin"], ["Staff", "Staff"]],
						allLabel: "All roles"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
					label: "Status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
						value: draft.status,
						onChange: (value) => patchDraft({ status: value }),
						options: [
							"Active",
							"Inactive",
							"Suspended"
						].map((s) => [s, s]),
						allLabel: "All status"
					})
				})
			] })
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
			rows: 6,
			cols: 7
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Users,
			title: "No users found",
			description: "Create your first internal user."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
			className: "hover:bg-transparent",
			children: [
				"Employee",
				"Designation",
				"Department",
				"Team",
				"Email",
				"Status",
				"Actions"
			].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: h === "Actions" ? "text-right" : void 0,
				children: h
			}, h))
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: items.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
				id: user.employeeId ?? "—",
				title: user.name ?? `${user.firstName} ${user.lastName}`,
				to: "/admin/users/$userId",
				params: { userId: user.id ?? user._id }
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: user.designation || "—" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: user.departmentName ?? user.department ?? "—" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: user.teamName ?? "—" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-muted-foreground",
				children: user.email
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: user.status }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DataTableActions, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
					label: "View",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/users/$userId",
						params: { userId: user.id ?? user._id },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
					label: "Edit",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/users/$userId/edit",
						params: { userId: user.id ?? user._id },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-8 rounded-lg text-muted-foreground hover:text-foreground",
						"aria-label": "More actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "rounded-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => statusMutation.mutate({
								id: user.id ?? user._id,
								next: user.status === "Active" ? "Inactive" : "Active"
							}),
							children: user.status === "Active" ? "Deactivate" : "Activate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => inviteMutation.mutate(user.id ?? user._id),
							children: "Resend invitation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => resetMutation.mutate(user.id ?? user._id),
							children: "Reset password"
						})
					]
				})] })
			] }) })
		] }, user.id ?? user._id)) })] }), meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
			page: meta.page,
			limit: meta.limit,
			total: meta.total,
			totalPages: meta.totalPages,
			entityLabel: "users",
			onPageChange: setPage
		})] })]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersPage, {})
});
//#endregion
export { SplitComponent as component };
