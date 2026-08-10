import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Pencil, G as FolderKanban, V as KeyRound, _t as ArrowLeft, c as UserCheck, i as UserX, j as Mail, r as User, y as Settings } from "../_libs/lucide-react.mjs";
import { d as SectionCard, m as TableSkeleton, n as KpiCard, p as StatusBadge, t as EmptyState } from "./primitives-CPmujTLD.mjs";
import { d as formatDate } from "./store-Daxm1pxW.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$1 } from "./router-CtVrCs4M.mjs";
import { y as RequireRole } from "./guard-BUVsJOD-.mjs";
import { i as TabsPanelTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-D5rpSCDC.mjs";
import { a as fetchInternalUserProjects, c as resendInternalUserInvitation, d as updateInternalUserLogin, f as updateInternalUserStatus, i as fetchInternalUserOverview, l as resetInternalUserPassword } from "./internal-users-DxEAVk7S.mjs";
import { t as InternalUserFormSheet } from "./internal-user-form-sheet-CBRRHK9-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users._userId.index-CK3YFs12.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UserDetailPage() {
	const { userId } = Route$1.useParams();
	const routeSearch = Route$1.useSearch();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [tab, setTab] = (0, import_react.useState)("general");
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
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
	const projectsQuery = useQuery({
		queryKey: ["internal-user-projects", userId],
		queryFn: () => fetchInternalUserProjects(userId, {
			page: 1,
			limit: 10
		}),
		enabled: tab === "projects"
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
	if (overviewQuery.isLoading || !overviewQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 6,
		cols: 4
	});
	const { user, summary } = overviewQuery.data;
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-7" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold tracking-tight text-foreground",
									children: user.name ?? `${user.firstName} ${user.lastName}`
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/users",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => setEditOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Edit User"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Assigned projects",
						value: summary.assignedProjects
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Open projects",
						value: summary.openProjects,
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Completed projects",
						value: summary.completedProjects,
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Pending tickets",
						value: summary.pendingTickets
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: tab,
				onValueChange: setTab,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
							value: "general",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {}),
							title: "General",
							description: "Employee information"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
							value: "account",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {}),
							title: "Account settings",
							description: "Login and invitations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
							value: "projects",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, {}),
							title: "Projects",
							description: "Assigned projects"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "general",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
							title: "General information",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
								className: "grid gap-3 p-4 text-sm sm:grid-cols-2",
								children: [
									["Employee ID", user.employeeId || "—"],
									["Full name", user.name ?? `${user.firstName} ${user.lastName}`],
									["Email", user.email],
									["Mobile", user.phone || "—"],
									["Department", user.departmentName ?? user.department ?? "—"],
									["Designation", user.designation || "—"],
									["Team", user.teamName ?? "—"],
									["Reporting manager", user.reportingManagerName ?? "—"],
									["Joining date", user.dateOfJoining ? formatDate(user.dateOfJoining) : "—"],
									["Status", user.status]
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
						value: "account",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
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
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 border-t p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										disabled: resetMutation.isPending,
										onClick: () => resetMutation.mutate(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }), " Reset password"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										disabled: inviteMutation.isPending,
										onClick: () => inviteMutation.mutate(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), " Resend invitation"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										disabled: loginMutation.isPending,
										onClick: () => loginMutation.mutate(user.loginEnabled !== false ? false : true),
										children: [user.loginEnabled === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "size-4" }), user.loginEnabled === false ? "Enable login" : "Disable login"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										disabled: statusMutation.isPending,
										onClick: () => statusMutation.mutate(user.status === "Active" ? "Inactive" : "Active"),
										children: user.status === "Active" ? "Deactivate" : "Activate"
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "projects",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: (projectsQuery.data?.items ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No projects",
							description: "Assigned projects will appear here."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y",
							children: (projectsQuery.data?.items ?? []).map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between px-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: String(project.name)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										String(project.projectId),
										" · ",
										String(project.customerName)
									]
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
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalUserFormSheet, {
				open: editOpen,
				onOpenChange: setEditOpen,
				mode: "edit",
				userId,
				onSaved: () => overviewQuery.refetch()
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
