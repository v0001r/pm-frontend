import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, d as useAuth, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as Ellipsis, H as FolderKanban, J as Clock3, Q as CircleCheck, dt as ArrowLeft, f as Ticket, it as ChartColumn, n as Users, o as UserPlus, ot as CalendarRange, q as Copy, st as Building2, w as Pencil } from "../_libs/lucide-react.mjs";
import { f as StatusBadge, m as UserAvatar, p as TableSkeleton, s as ProjectStatusBadge, t as EmptyState } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate, o as relativeTime } from "./store-rjYLW1Ml.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as ResponsiveContainer, f as Tooltip, l as Pie, n as PieChart, u as Cell } from "../_libs/recharts+[...].mjs";
import { $ as TableRow, C as fetchTicketsPage, F as DataTableIconButton, J as Table, P as DataTableActions, Q as TableHeader, X as TableCell, Y as TableBody, Z as TableHead, o as Route$4, z as EntityCell } from "./router-DLFu5c1a.mjs";
import { S as RequireRole, _ as DropdownMenuTrigger, h as DropdownMenuItem, m as DropdownMenuContent, p as DropdownMenu } from "./guard-Da2hUi3G.mjs";
import { a as fetchProjectActivities, i as fetchProject, o as fetchProjectMembers } from "./projects-JQDAMoYA.mjs";
import { t as describeProjectActivity } from "./project-activity-B4gFjEAo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects._projectId.index-CtmS0vcG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-md border border-border/60 bg-card p-4 shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted-foreground",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-2xl font-bold tracking-tight text-foreground",
						children: value
					}),
					hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: hint
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("grid size-9 shrink-0 place-items-center rounded-md", toneClass),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
			})]
		})
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
	const canEdit = user?.role === "Admin" || user?.role === "Staff";
	const projectQuery = useQuery({
		queryKey: ["project", projectId],
		queryFn: () => fetchProject(projectId)
	});
	const membersQuery = useQuery({
		queryKey: [
			"project-members",
			projectId,
			{ preview: true }
		],
		queryFn: () => fetchProjectMembers(projectId, {
			page: 1,
			limit: 10
		}),
		enabled: !!projectQuery.data
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
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7",
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewStatCard, {
						label: "Progress",
						value: `${project.progressPercentage}%`,
						icon: ChartColumn,
						tone: "primary"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 xl:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
					title: "Project Details",
					description: "Schedule, customer and scope",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 p-5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
									children: "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-medium text-foreground",
									children: project.customerName ?? "—"
								}),
								project.customerEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: project.customerEmail
								}) : null
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
									children: "Start Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 flex items-center gap-2 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarRange, { className: "size-4 text-muted-foreground" }), formatDate(project.startDate)]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
									children: "End Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 flex items-center gap-2 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarRange, { className: "size-4 text-muted-foreground" }), project.endDate ? formatDate(project.endDate) : "No end date"]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
								children: "Maximum Hours"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular mt-1 font-medium",
								children: [project.maxHours, "h"]
							})] }),
							project.creatorName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
								children: "Created By"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-medium",
								children: project.creatorName
							})] }) : null,
							project.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-6 text-muted-foreground",
								children: project.description
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase",
								children: "Overall Progress"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
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
							})] })
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
					title: "Team Members",
					description: "Assigned employees on this project",
					actions: canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/projects/$projectId/members",
							params: { projectId },
							children: "Manage Members"
						})
					}) : null,
					children: membersQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
						rows: 4,
						cols: 5
					}) : members.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Users,
						title: "No members yet",
						description: "Assign employees to this project to start tracking work."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
						className: "hover:bg-transparent",
						children: [
							"Member",
							"Role",
							"Status",
							"Hours",
							"Assigned On",
							""
						].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: heading }, heading || "actions"))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
								name: member.employeeName,
								size: 32
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
								name: member.employeeName,
								subtitle: member.designation || member.status
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground",
							children: member.designation || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: member.status }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "tabular text-muted-foreground",
							children: [member.internalHours + member.externalHours, "h"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground",
							children: member.assignedDate ? formatDate(member.assignedDate) : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/projects/$projectId/members",
								params: { projectId },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Manage member"
								})]
							})
						}) }) : null })
					] }, member._id)) })] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
						title: "Key Information & Quick Actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "grid gap-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3 border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-muted-foreground",
											children: "Project ID"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
											className: "flex items-center gap-2 font-medium",
											children: [project.projectId, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "button",
												size: "icon",
												variant: "ghost",
												className: "size-7",
												onClick: async () => {
													await navigator.clipboard.writeText(project.projectId);
													toast.success("Project ID copied.");
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sr-only",
													children: "Copy project ID"
												})]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3 border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-muted-foreground",
											children: "Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectStatusBadge, { status: project.status }) })]
									}),
									project.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3 border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-muted-foreground",
											children: "Environment"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "font-medium",
											children: project.label
										})]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3 border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-muted-foreground",
											children: "Customer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-right font-medium",
											children: project.customerName ?? "—"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-muted-foreground",
											children: "Created On"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-right font-medium",
											children: formatDate(project.createdAt, true)
										})]
									})
								]
							}), canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-sm font-semibold text-foreground",
								children: "Quick Actions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										className: "h-auto flex-col gap-2 py-4",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/admin/tickets/new",
											search: { projectId },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Ticket" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										className: "h-auto flex-col gap-2 py-4",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/admin/projects/$projectId/members",
											params: { projectId },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Member" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										className: "h-auto flex-col gap-2 py-4",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/admin/tickets",
											search: { projectId },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Tickets" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											className: "h-auto flex-col gap-2 py-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "More" })]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
										align: "end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/admin/projects/$projectId/edit",
												params: { projectId },
												children: "Edit project"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/admin/projects/$projectId/members",
												params: { projectId },
												children: "Manage members"
											})
										})]
									})] })
								]
							})] }) : null]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
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
					})
				]
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
