import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus, H as FolderKanban, J as Clock3, dt as ArrowLeft, f as Ticket, ot as CalendarRange } from "../_libs/lucide-react.mjs";
import { a as PageHeader, n as KpiCard, p as TableSkeleton, s as ProjectStatusBadge, t as EmptyState, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate, o as relativeTime } from "./store-rjYLW1Ml.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as Route$10 } from "./router-DLFu5c1a.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { a as fetchProjectActivities, i as fetchProject } from "./projects-JQDAMoYA.mjs";
import { t as describeProjectActivity } from "./project-activity-B4gFjEAo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.projects._projectId-CndWYSN9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PortalProjectDetailPage() {
	const { projectId } = Route$10.useParams();
	const projectQuery = useQuery({
		queryKey: ["project", projectId],
		queryFn: () => fetchProject(projectId)
	});
	const activitiesQuery = useQuery({
		queryKey: [
			"project-activities",
			projectId,
			{ portal: true }
		],
		queryFn: () => fetchProjectActivities(projectId, {
			page: 1,
			limit: 5
		}),
		enabled: !!projectQuery.data
	});
	(0, import_react.useEffect)(() => {
		if (projectQuery.isError) toast.error(getApiErrorMessage(projectQuery.error, "Failed to load project"));
	}, [projectQuery.isError, projectQuery.error]);
	const project = projectQuery.data;
	const overview = project?.overview;
	const activities = activitiesQuery.data?.items ?? [];
	if (projectQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Project details",
		description: "Loading..."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 6,
		cols: 3
	})] });
	if (projectQuery.isError || !project) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: FolderKanban,
		title: "Project not found",
		description: "This project is unavailable or you do not have access.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/portal/projects",
				children: "Back to projects"
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: project.name,
			description: `${project.projectId} · ${project.customerName ?? "Your organization"}`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/portal/projects",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/portal/tickets/new",
						search: { projectId },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Raise ticket"]
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectStatusBadge, { status: project.status }), project.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground",
				children: project.label
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Open tickets",
					value: overview?.openTickets ?? 0,
					icon: Ticket,
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Completed tickets",
					value: overview?.completedTickets ?? 0,
					icon: Ticket,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Consumed hours",
					value: `${overview?.consumedHours ?? 0}h`,
					icon: Clock3
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Progress",
					value: `${project.progressPercentage}%`,
					icon: FolderKanban,
					tone: "primary"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Overview",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 p-5 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground uppercase",
							children: "Start date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarRange, { className: "size-4 text-muted-foreground" }), formatDate(project.startDate)]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground uppercase",
							children: "End date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarRange, { className: "size-4 text-muted-foreground" }), project.endDate ? formatDate(project.endDate) : "No end date"]
						})] })]
					}), project.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 leading-6 text-muted-foreground",
						children: project.description
					})] }) : null]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Recent activity",
				children: activitiesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
					rows: 4,
					cols: 1
				}) : activities.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No activity yet",
					description: "Updates to this project will appear here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "divide-y",
					children: activities.map((activity) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "px-5 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: activity.action
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: describeProjectActivity(activity)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: relativeTime(activity.createdAt)
							})
						]
					}, activity._id))
				})
			})]
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Client"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProjectDetailPage, {})
});
//#endregion
export { SplitComponent as component };
