import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, u as getApiErrorMessage } from "./button-Du-Bk9Wl.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as Eye, S as Pencil, n as Users, u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { m as TableSkeleton, p as StatusBadge, t as EmptyState } from "./primitives-BE889lfB.mjs";
import { a as DropdownMenuSeparator, r as DropdownMenuItem } from "./store-Cwl19Diw.mjs";
import { a as DataTableRowMenu, c as EntityCell, g as TableCell, h as TableBody, i as DataTablePagination, l as IdLinkCell, m as Table, n as DataTableHead, t as DataTableActions, v as TableHeader, y as TableRow } from "./data-table-CNAlrDoP.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _t as ListingFilterField, d as Route$14, gt as ListingCardHeader, vt as ListingFilterSelect, xt as useListingFilters, yt as ListingPage } from "./router-DC97nFe7.mjs";
import { h as RequireRole } from "./guard-DY-g-DXD.mjs";
import { t as DeleteEntityDialog } from "./delete-entity-dialog-CtPWR2Cp.mjs";
import { c as resendInternalUserInvitation, f as updateInternalUserStatus, l as resetInternalUserPassword, n as deleteInternalUser, o as fetchInternalUsers } from "./internal-users-U1g-KNWR.mjs";
import { n as canAdminResetPassword, t as InternalUserFormSheet } from "./user-activation-Bd6UdQZr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users.index-CMq8FC9u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 10;
var ANY = "all";
var FILTER_DEFAULTS = {
	status: ANY,
	role: ANY
};
var TABLE_COLUMNS = [
	"Employee ID",
	"Employee",
	"Email",
	"Status",
	"Action"
];
function UsersPage() {
	const navigate = useNavigate();
	const routeSearch = Route$14.useSearch();
	const queryClient = useQueryClient();
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS);
	const [page, setPage] = (0, import_react.useState)(1);
	const [limit, setLimit] = (0, import_react.useState)(PAGE_SIZE);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		if (routeSearch.action === "create") {
			setCreateOpen(true);
			navigate({
				to: "/admin/users",
				search: {},
				replace: true
			});
		}
		if (routeSearch.edit) {
			setEditId(routeSearch.edit);
			navigate({
				to: "/admin/users",
				search: {},
				replace: true
			});
		}
	}, [
		routeSearch.action,
		routeSearch.edit,
		navigate
	]);
	(0, import_react.useEffect)(() => setPage(1), [
		debouncedSearch,
		filters.status,
		filters.role,
		limit
	]);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["internal-users", {
			page,
			limit,
			search: debouncedSearch,
			filters
		}],
		queryFn: async () => {
			const result = await fetchInternalUsers({
				page,
				limit,
				...debouncedSearch && { search: debouncedSearch },
				...filters.status !== ANY && { status: filters.status },
				...filters.role !== ANY && { role: filters.role },
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
	const deleteMutation = useMutation({
		mutationFn: (id) => deleteInternalUser(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["internal-users"] });
			setDeleteTarget(null);
			toast.success("User deleted.");
		},
		onError: (err) => toast.error(getApiErrorMessage(err, "Failed to delete user"))
	});
	const items = data?.items ?? [];
	const meta = data?.meta;
	const clearFilters = () => {
		setSearch("");
		setDebouncedSearch("");
		clear();
		setPage(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCardHeader, {
			title: "Users",
			description: meta ? `Total ${meta.total} users` : "Loading users…",
			value: search,
			onChange: setSearch,
			placeholder: "Search by employee ID, name or email…",
			filterOpen: open,
			onFilterOpenChange: setOpen,
			activeFilterCount: activeCount,
			onFilterApply: apply,
			onFilterClear: clearFilters,
			primaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				className: "rounded-md",
				onClick: () => setCreateOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New user"]
			}),
			filterContent: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
				label: "Role",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
					value: draft.role,
					onChange: (value) => patchDraft({ role: value }),
					options: [["Admin", "Admin"], ["Staff", "Staff"]],
					allLabel: "All roles"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
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
			})] })
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
			rows: 6,
			cols: 5
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Users,
			title: "No users found",
			description: "Create your first internal user."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "min-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: TABLE_COLUMNS.map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableHead, {
					className: heading === "Action" ? "text-right" : void 0,
					sortable: heading !== "Action",
					children: heading
				}, heading))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: items.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdLinkCell, {
					id: user.employeeId ?? "—",
					to: "/admin/users/$userId",
					params: { userId: user.id ?? user._id }
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
					name: user.name ?? `${user.firstName} ${user.lastName}`,
					hue: 220,
					showAvatar: true
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-muted-foreground",
					children: user.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: user.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DataTableRowMenu, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/users/$userId",
							params: { userId: user.id ?? user._id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), " View"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: () => setEditId(user.id ?? user._id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " Edit"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						onClick: () => statusMutation.mutate({
							id: user.id ?? user._id,
							next: user.status === "Active" ? "Inactive" : "Active"
						}),
						children: user.status === "Active" ? "Deactivate" : "Activate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						onClick: () => inviteMutation.mutate(user.id ?? user._id),
						children: "Resend invitation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						disabled: !canAdminResetPassword(user.invitationStatus),
						onClick: () => resetMutation.mutate(user.id ?? user._id),
						children: "Reset password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						className: "text-destructive focus:text-destructive",
						onClick: () => setDeleteTarget({
							id: user.id ?? user._id,
							name: user.name ?? `${user.firstName} ${user.lastName}`
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Delete"]
					})
				] }) }) })
			] }, user.id ?? user._id)) })]
		}), meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
			page: meta.page,
			limit: meta.limit,
			total: meta.total,
			totalPages: meta.totalPages,
			entityLabel: "users",
			onPageChange: setPage,
			onLimitChange: setLimit
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalUserFormSheet, {
			open: createOpen,
			onOpenChange: setCreateOpen,
			mode: "create",
			onSaved: (userId) => navigate({
				to: "/admin/users/$userId",
				params: { userId }
			})
		}),
		editId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalUserFormSheet, {
			open: true,
			onOpenChange: (open) => {
				if (!open) setEditId(null);
			},
			mode: "edit",
			userId: editId,
			onSaved: () => queryClient.invalidateQueries({ queryKey: ["internal-users"] })
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteEntityDialog, {
			open: Boolean(deleteTarget),
			onOpenChange: (open) => {
				if (!open) setDeleteTarget(null);
			},
			title: "Delete user?",
			description: deleteTarget ? `${deleteTarget.name} will be permanently removed. Users with assigned tickets cannot be deleted.` : "",
			isPending: deleteMutation.isPending,
			onConfirm: () => {
				if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
			}
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersPage, {})
});
//#endregion
export { SplitComponent as component };
