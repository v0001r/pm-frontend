import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as useAuth, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus, S as Search, d as Trash2, dt as ArrowLeft, n as Users } from "../_libs/lucide-react.mjs";
import { a as PageHeader, h as fullName, p as TableSkeleton, t as EmptyState, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate } from "./store-rjYLW1Ml.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as TableRow, F as DataTableIconButton, G as SelectItem, I as DataTablePagination, J as Table, K as SelectTrigger, L as DataTableToolbar, P as DataTableActions, Q as TableHeader, U as Select, W as SelectContent, X as TableCell, Y as TableBody, Z as TableHead, i as Route$2, q as SelectValue, z as EntityCell } from "./router-DLFu5c1a.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { t as Label } from "./label-BZKlnMd2.mjs";
import { S as RequireRole, a as AlertDialogCancel, c as AlertDialogFooter, i as AlertDialogAction, l as AlertDialogHeader, o as AlertDialogContent, r as AlertDialog, s as AlertDialogDescription, u as AlertDialogTitle } from "./guard-Da2hUi3G.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DGBi74W0.mjs";
import { c as removeProjectMember, i as fetchProject, o as fetchProjectMembers, t as assignProjectMember } from "./projects-JQDAMoYA.mjs";
import { n as fetchEmployees } from "./users-CDxzt4hY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.projects._projectId.members-BYR9sdSf.js
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
var PAGE_SIZE = 10;
function ProjectMembersPage() {
	const { projectId } = Route$2.useParams();
	const { user } = useAuth();
	const isAdmin = user?.role === "Admin";
	const queryClient = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const [assignOpen, setAssignOpen] = (0, import_react.useState)(false);
	const [memberToRemove, setMemberToRemove] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [debouncedSearch]);
	const projectQuery = useQuery({
		queryKey: ["project", projectId],
		queryFn: () => fetchProject(projectId)
	});
	const membersQuery = useQuery({
		queryKey: [
			"project-members",
			projectId,
			{
				page,
				search: debouncedSearch
			}
		],
		queryFn: () => fetchProjectMembers(projectId, {
			page,
			limit: PAGE_SIZE,
			...debouncedSearch && { search: debouncedSearch }
		}),
		enabled: !!projectQuery.data
	});
	const allMembersQuery = useQuery({
		queryKey: [
			"project-members",
			projectId,
			"all"
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
	(0, import_react.useEffect)(() => {
		if (projectQuery.isError) toast.error(getApiErrorMessage(projectQuery.error, "Failed to load project"));
	}, [projectQuery.isError, projectQuery.error]);
	const project = projectQuery.data;
	const members = membersQuery.data?.items ?? [];
	const meta = membersQuery.data?.meta;
	const totalPages = meta?.totalPages ?? 1;
	const currentPage = meta?.page ?? page;
	const allocatedHours = (0, import_react.useMemo)(() => (allMembersQuery.data?.items ?? []).reduce((sum, member) => sum + member.internalHours + member.externalHours, 0), [allMembersQuery.data]);
	const assignedEmployeeIds = (0, import_react.useMemo)(() => (allMembersQuery.data?.items ?? []).map((member) => member.employeeId), [allMembersQuery.data]);
	if (projectQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Project members",
		description: "Loading..."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 6,
		cols: 5
	})] });
	if (projectQuery.isError || !project) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Users,
		title: "Project not found",
		description: "Unable to load member management for this project.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/projects",
				children: "Back to projects"
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Project members",
			description: `${project.name} · ${project.projectId}`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/projects/$projectId",
						params: { projectId },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Overview"]
					})
				}), isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setAssignOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Assign member"]
				}) : null]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel rounded-lg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Team size"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tabular mt-1 text-2xl font-bold",
						children: project.overview?.totalMembers ?? meta?.total ?? 0
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel rounded-lg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Allocated hours"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular mt-1 text-2xl font-bold",
						children: [
							allocatedHours,
							"h ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base font-normal text-muted-foreground",
								children: [
									"/ ",
									project.maxHours,
									"h"
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel rounded-lg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Remaining budget"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular mt-1 text-2xl font-bold",
						children: [Math.max(project.maxHours - allocatedHours, 0), "h"]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
			className: "overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableToolbar, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-md flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: search,
					onChange: (event) => setSearch(event.target.value),
					placeholder: "Search members by name or designation…",
					className: "h-10 rounded-xl border-border/60 bg-surface pl-10"
				})]
			}) }), membersQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
				rows: 6,
				cols: 5
			}) : members.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Users,
				title: "No members assigned",
				description: isAdmin ? "Assign employees to start tracking work on this project." : "No team members have been assigned yet.",
				action: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setAssignOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Assign member"]
				}) : void 0
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				className: "min-w-4xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					className: "hover:bg-transparent",
					children: [
						"Member",
						"Designation",
						"Internal",
						"External",
						"Total",
						"Assigned",
						"Actions"
					].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: heading === "Actions" ? "text-right" : void 0,
						children: heading
					}, heading))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
						name: member.employeeName,
						subtitle: member.status
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-muted-foreground",
						children: member.designation || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "tabular",
						children: [member.internalHours, "h"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "tabular",
						children: [member.externalHours, "h"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "tabular font-semibold",
						children: [member.internalHours + member.externalHours, "h"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-muted-foreground",
						children: member.assignedDate ? formatDate(member.assignedDate) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
						label: "Remove member",
						onClick: () => setMemberToRemove(member),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
					}) }) : null })
				] }, member._id)) })]
			}), meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
				page: currentPage,
				limit: meta.limit,
				total: meta.total,
				totalPages,
				entityLabel: "members",
				onPageChange: setPage
			})] })]
		}),
		isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignProjectMemberDialog, {
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
				className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				disabled: removeMutation.isPending,
				onClick: (event) => {
					event.preventDefault();
					if (memberToRemove) removeMutation.mutate(memberToRemove._id);
				},
				children: removeMutation.isPending ? "Removing..." : "Remove member"
			})] })] })
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: [
		"Admin",
		"Staff",
		"Client"
	],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectMembersPage, {})
});
//#endregion
export { SplitComponent as component };
