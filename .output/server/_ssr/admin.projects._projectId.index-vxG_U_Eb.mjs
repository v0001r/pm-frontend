import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, d as useAuth, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus, Q as Clock3, W as FolderKanban, d as Trash2, f as Ticket, mt as Building2, n as Users, o as UserPlus, rt as CircleCheck, vt as ArrowLeft, w as Pencil } from "../_libs/lucide-react.mjs";
import { g as fullName, m as TableSkeleton, p as StatusBadge, s as ProjectStatusBadge, t as EmptyState } from "./primitives-BneTjl1i.mjs";
import { d as formatDate, f as relativeTime } from "./store-CZmg1Lwb.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as ResponsiveContainer, f as Tooltip, l as Pie, n as PieChart, u as Cell } from "../_libs/recharts+[...].mjs";
import { $ as Table, F as DataTableActions, H as EntityCell, J as Select, L as DataTableIconButton, Q as SelectValue, X as SelectItem, Y as SelectContent, Z as SelectTrigger, a as Route$4, et as TableBody, it as TableRow, nt as TableHead, rt as TableHeader, tt as TableCell, w as fetchTicketsPage } from "./router-B2W8Gmeh.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { t as Label } from "./label-BZKlnMd2.mjs";
import { _ as RequireRole, a as AlertDialogCancel, c as AlertDialogFooter, i as AlertDialogAction, l as AlertDialogHeader, o as AlertDialogContent, r as AlertDialog, s as AlertDialogDescription, u as AlertDialogTitle } from "./guard-BAnzMztv.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DGBi74W0.mjs";
import { a as fetchProjectActivities, c as removeProjectMember, i as fetchProject, o as fetchProjectMembers, t as assignProjectMember } from "./projects-JQDAMoYA.mjs";
import { t as fetchEmployees } from "./users-qW6Jl6p_.mjs";
import { t as describeProjectActivity } from "./project-activity-B4gFjEAo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects._projectId.index-vxG_U_Eb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AssignProjectMemberDialog({ projectId, open, onOpenChange, assignedEmployeeIds, maxHours, allocatedHours }) {
	const queryClient = useQueryClient();
	const [employeeId, setEmployeeId] = (0, import_react.useState)("");
	const [internalHours, setInternalHours] = (0, import_react.useState)("40");
	const [externalHours, setExternalHours] = (0, import_react.useState)("0");
	const employeesQuery = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees,
		enabled: open
	});
	const availableEmployees = (0, import_react.useMemo)(() => {
		return (employeesQuery.data ?? []).filter((employee) => employee.status === "Active" && !assignedEmployeeIds.includes(employee.id));
	}, [employeesQuery.data, assignedEmployeeIds]);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setEmployeeId("");
			setInternalHours("40");
			setExternalHours("0");
			return;
		}
		if (!employeeId && availableEmployees[0]) setEmployeeId(availableEmployees[0].id);
	}, [
		open,
		availableEmployees,
		employeeId
	]);
	const mutation = useMutation({
		mutationFn: () => {
			const internal = Number(internalHours);
			const external = Number(externalHours);
			if (!employeeId) throw new Error("Select an employee to assign");
			if (!Number.isFinite(internal) || internal < 0) throw new Error("Internal hours must be zero or greater");
			if (!Number.isFinite(external) || external < 0) throw new Error("External hours must be zero or greater");
			if (allocatedHours + internal + external > maxHours) throw new Error(`Total allocated hours cannot exceed ${maxHours}h`);
			return assignProjectMember(projectId, {
				employeeId,
				internalHours: internal,
				externalHours: external
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["project-members", projectId] });
			queryClient.invalidateQueries({ queryKey: ["project", projectId] });
			queryClient.invalidateQueries({ queryKey: ["project-activities", projectId] });
			toast.success("Member assigned successfully");
			onOpenChange(false);
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error, "Failed to assign member"));
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Assign team member" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"Allocate internal and external hours from the project budget (",
					allocatedHours,
					"h of ",
					maxHours,
					"h already allocated)."
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Employee" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: employeeId,
							onValueChange: setEmployeeId,
							disabled: employeesQuery.isLoading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: employeesQuery.isLoading ? "Loading employees..." : "Select employee" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: availableEmployees.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-2 py-6 text-center text-sm text-muted-foreground",
								children: "No available employees to assign"
							}) : availableEmployees.map((employee) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: employee.id,
								children: [
									fullName(employee),
									" · ",
									employee.designation || employee.role
								]
							}, employee.id)) })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "internal-hours",
								children: "Internal hours"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "internal-hours",
								type: "number",
								min: "0",
								step: "0.5",
								value: internalHours,
								onChange: (event) => setInternalHours(event.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "external-hours",
								children: "External hours"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "external-hours",
								type: "number",
								min: "0",
								step: "0.5",
								value: externalHours,
								onChange: (event) => setExternalHours(event.target.value)
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					disabled: mutation.isPending,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => mutation.mutate(),
					disabled: mutation.isPending || availableEmployees.length === 0,
					children: mutation.isPending ? "Assigning..." : "Assign member"
				})] })
			]
		})
	});
}
var chartColors = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-4)",
	"var(--color-chart-3)"
];
function OverviewStatCard({ label, value, hint, icon: Icon, tone = "default" }) {
	const toneClass = {
		default: "bg-slate-100 text-slate-600",
		primary: "bg-violet-100 text-violet-600",
		success: "bg-emerald-100 text-emerald-600",
		warning: "bg-amber-100 text-amber-600"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-[7.5rem] flex-col rounded-md border border-border/60 bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-h-10 flex-1 text-xs font-medium leading-snug text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("grid size-9 shrink-0 place-items-center rounded-md", toneClass),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-auto pt-3 text-2xl font-bold tracking-tight text-foreground",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-h-4 text-xs text-muted-foreground",
				children: hint ?? ""
			})
		]
	});
}
function PanelCard({ title, description, actions, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("overflow-hidden rounded-md border border-border/60 bg-card shadow-sm", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3 border-b border-border/60 px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold text-foreground",
				children: title
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: description
			}) : null] }), actions]
		}), children]
	});
}
function groupTicketStatuses(items) {
	const groups = {
		Open: 0,
		"In Progress": 0,
		"On Hold": 0,
		Completed: 0
	};
	for (const ticket of items) if (ticket.status === "In Progress") groups["In Progress"] += 1;
	else if (ticket.status === "Resolved" || ticket.status === "Closed") groups.Completed += 1;
	else if (ticket.status === "Cancelled") groups["On Hold"] += 1;
	else groups.Open += 1;
	return Object.entries(groups).map(([name, value]) => ({
		name,
		value
	}));
}
function ProjectDetailPage() {
	const { projectId } = Route$4.useParams();
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const canEdit = user?.role === "Admin" || user?.role === "Staff";
	const isAdmin = user?.role === "Admin";
	const [assignOpen, setAssignOpen] = (0, import_react.useState)(false);
	const [memberToRemove, setMemberToRemove] = (0, import_react.useState)(null);
	const projectQuery = useQuery({
		queryKey: ["project", projectId],
		queryFn: () => fetchProject(projectId)
	});
	const membersQuery = useQuery({
		queryKey: [
			"project-members",
			projectId,
			{ overview: true }
		],
		queryFn: () => fetchProjectMembers(projectId, {
			page: 1,
			limit: 100
		}),
		enabled: !!projectQuery.data
	});
	const removeMutation = useMutation({
		mutationFn: (memberId) => removeProjectMember(projectId, memberId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["project-members", projectId] });
			queryClient.invalidateQueries({ queryKey: ["project", projectId] });
			queryClient.invalidateQueries({ queryKey: ["project-activities", projectId] });
			toast.success("Member removed successfully");
			setMemberToRemove(null);
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error, "Failed to remove member"));
		}
	});
	const activitiesQuery = useQuery({
		queryKey: ["project-activities", projectId],
		queryFn: () => fetchProjectActivities(projectId, {
			page: 1,
			limit: 10
		}),
		enabled: !!projectQuery.data
	});
	const ticketsQuery = useQuery({
		queryKey: ["project-tickets-summary", projectId],
		queryFn: () => fetchTicketsPage({
			projectId,
			page: 1,
			limit: 200
		}),
		enabled: !!projectQuery.data
	});
	(0, import_react.useEffect)(() => {
		if (projectQuery.isError) toast.error(getApiErrorMessage(projectQuery.error, "Failed to load project"));
	}, [projectQuery.isError, projectQuery.error]);
	const project = projectQuery.data;
	const overview = project?.overview;
	const members = membersQuery.data?.items ?? [];
	const activities = activitiesQuery.data?.items ?? [];
	const ticketItems = ticketsQuery.data?.items ?? [];
	const ticketChartData = (0, import_react.useMemo)(() => groupTicketStatuses(ticketItems), [ticketItems]);
	const ticketTotal = overview?.totalTickets ?? ticketItems.length;
	const allocatedHours = (0, import_react.useMemo)(() => members.reduce((sum, member) => sum + member.internalHours + member.externalHours, 0), [members]);
	const assignedEmployeeIds = (0, import_react.useMemo)(() => members.map((member) => member.employeeId), [members]);
	if (projectQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 10,
		cols: 4
	});
	if (projectQuery.isError || !project) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: FolderKanban,
		title: "Project not found",
		description: "The project may have been removed or you do not have access.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/projects",
				children: "Back to projects"
			})
		}),
		secondaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			onClick: () => projectQuery.refetch(),
			children: "Retry"
		})
	});
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-7" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold tracking-tight text-foreground",
									children: project.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [project.projectId, project.customerName ? ` · ${project.customerName}` : ""]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectStatusBadge, { status: project.status }), project.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700",
										children: project.label
									}) : null]
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
								to: "/admin/projects",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
							})
						}), canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/projects/$projectId/edit",
								params: { projectId },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Edit Project"]
							})
						}) : null]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewStatCard, {
						label: "Team Members",
						value: overview?.totalMembers ?? 0,
						icon: Users,
						tone: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewStatCard, {
						label: "Total Tickets",
						value: overview?.totalTickets ?? 0,
						icon: Ticket
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewStatCard, {
						label: "Open Tickets",
						value: overview?.openTickets ?? 0,
						icon: Ticket,
						tone: overview?.openTickets ? "warning" : "default"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewStatCard, {
						label: "Completed Tickets",
						value: overview?.completedTickets ?? 0,
						icon: CircleCheck,
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewStatCard, {
						label: "Consumed Hours",
						value: `${overview?.consumedHours ?? 0}h`,
						hint: `of ${project.maxHours}h budget`,
						icon: Clock3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewStatCard, {
						label: "Remaining Hours",
						value: `${overview?.remainingHours ?? 0}h`,
						icon: Clock3,
						tone: "primary"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 xl:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
					title: "Project Details",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid gap-x-6 gap-y-4 p-5 text-sm sm:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-medium",
									children: project.customerName ?? "—"
								}),
								project.customerEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-muted-foreground",
									children: project.customerEmail
								}) : null
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Start date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-medium",
								children: formatDate(project.startDate)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "End date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-medium",
								children: project.endDate ? formatDate(project.endDate) : "No end date"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Maximum hours"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "tabular mt-1 font-medium",
								children: [project.maxHours, "h"]
							})] }),
							project.creatorName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Created by"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-medium",
								children: project.creatorName
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Created on"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-medium",
								children: formatDate(project.createdAt, true)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2 lg:col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Progress"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "mt-2 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 flex-1 overflow-hidden rounded-full bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-primary transition-all",
											style: { width: `${project.progressPercentage}%` }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular text-sm font-medium text-muted-foreground",
										children: [project.progressPercentage, "%"]
									})]
								})]
							}),
							project.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2 lg:col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 leading-6 text-muted-foreground",
									children: project.description
								})]
							}) : null
						]
					}), canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 border-t border-border/60 px-5 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin/tickets/new",
									search: { projectId },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4" }), "Add ticket"]
								})
							}),
							isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setAssignOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), "Add member"]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin/tickets",
									search: { projectId },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, { className: "size-4" }), "View tickets"]
								})
							})
						]
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
					title: "Team Members",
					actions: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setAssignOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add member"]
					}) : null,
					children: membersQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
						rows: 4,
						cols: 5
					}) : members.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Users,
						title: "No members yet",
						description: "Assign employees to this project to start tracking work.",
						action: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => setAssignOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add member"]
						}) : void 0
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
						className: "hover:bg-transparent",
						children: [
							"Member",
							"Status",
							"Hours",
							"Assigned On",
							...isAdmin ? [""] : []
						].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: heading }, heading || "actions"))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
							name: member.employeeName,
							subtitle: member.designation || member.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: member.status }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "tabular text-muted-foreground",
							children: [member.internalHours + member.externalHours, "h"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground",
							children: member.assignedDate ? formatDate(member.assignedDate) : "—"
						}),
						isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
							label: "Remove member",
							onClick: () => setMemberToRemove(member),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
						}) }) }) : null
					] }, member._id)) })] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 xl:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
					title: "Activity Timeline",
					description: "Recent changes on this project",
					children: activitiesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
						rows: 5,
						cols: 2
					}) : activities.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: FolderKanban,
						title: "No activity yet",
						description: "Project changes will appear here."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "divide-y",
						children: activities.map((activity) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4 px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-2.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-foreground",
											children: activity.action
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: relativeTime(activity.createdAt)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: describeProjectActivity(activity)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											activity.performerName ?? "System",
											activity.performerEmail ? ` · ${activity.performerEmail}` : "",
											" · ",
											formatDate(activity.createdAt, true)
										]
									})
								]
							})]
						}, activity._id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
					title: "Ticket Summary",
					description: "Status breakdown for this project",
					children: ticketsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-64 items-center justify-center text-sm text-muted-foreground",
						children: "Loading tickets…"
					}) : ticketTotal === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-64 flex-col items-center justify-center gap-2 px-5 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-40 w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: [{
											name: "No tickets",
											value: 1
										}],
										dataKey: "value",
										cx: "50%",
										cy: "50%",
										innerRadius: 52,
										outerRadius: 72,
										fill: "var(--color-muted)",
										isAnimationActive: false
									}) })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-foreground",
								children: "0 Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "No tickets found for this project."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_auto]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-52",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: ticketChartData,
									dataKey: "value",
									nameKey: "name",
									cx: "50%",
									cy: "50%",
									innerRadius: 52,
									outerRadius: 78,
									paddingAngle: 2,
									isAnimationActive: false,
									children: ticketChartData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: chartColors[index % chartColors.length] }, entry.name))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									fontSize: 12,
									borderRadius: 6
								} })] })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-center text-2xl font-bold md:text-left",
								children: [ticketTotal, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-sm font-medium text-muted-foreground",
									children: "Total"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2 text-sm",
								children: ticketChartData.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2 text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "size-2.5 rounded-full",
											style: { backgroundColor: chartColors[index % chartColors.length] }
										}), item.name]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold tabular-nums text-foreground",
										children: item.value
									})]
								}, item.name))
							})]
						})]
					})
				})]
			}),
			isAdmin && project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignProjectMemberDialog, {
				projectId,
				open: assignOpen,
				onOpenChange: setAssignOpen,
				assignedEmployeeIds,
				maxHours: project.maxHours,
				allocatedHours
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!memberToRemove,
				onOpenChange: (open) => !open && setMemberToRemove(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Remove team member?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: memberToRemove ? `${memberToRemove.employeeName} will be removed from this project. They cannot be removed if they have pending tickets or active timesheets.` : "" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					disabled: removeMutation.isPending,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					disabled: removeMutation.isPending,
					onClick: (event) => {
						event.preventDefault();
						if (memberToRemove) removeMutation.mutate(memberToRemove._id);
					},
					children: removeMutation.isPending ? "Removing..." : "Remove member"
				})] })] })
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: [
		"Admin",
		"Staff",
		"Client"
	],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectDetailPage, {})
});
//#endregion
export { SplitComponent as component };
