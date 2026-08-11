import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn, f as useAuth, n as Button, r as api, s as getApiErrorMessage, t as AuthProvider } from "./button-vnqCGuCs.mjs";
import { R as redirect, _ as createRootRouteWithContext, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as CirclePause, F as LoaderCircle, H as Inbox, U as Globe, _t as AlarmClock, b as Search, d as Ticket, dt as Building2, et as CircleDot, ft as Bell, gt as Archive, h as SlidersHorizontal, l as TriangleAlert, n as Users, ot as ChevronRight, tt as CircleCheck, z as Layers } from "../_libs/lucide-react.mjs";
import { _ as fullName, b as statusChartColor, d as SectionCard, g as categoryChartColor, m as TableSkeleton, n as Input, o as PageHeader, p as StatusBadge, r as KpiCard, s as PriorityBadge, t as EmptyState, y as priorityChartColor } from "./primitives-BAq0jd4Y.mjs";
import { c as PopoverContent, l as PopoverTrigger, m as formatDate, s as Popover } from "./store-C1539MgZ.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { C as SelectTrigger, S as SelectItem, _ as TableHead, b as Select, c as EntityCell, d as PrimaryCell, g as TableCell, h as TableBody, m as Table, v as TableHeader, w as SelectValue, x as SelectContent, y as TableRow } from "./data-table-CCefV4l1.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-Ck5FVpVl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function fetchCustomers$1(params = {}) {
	const { data } = await api.get("/customers", { params });
	return data.data;
}
async function fetchCustomer(id) {
	const { data } = await api.get(`/customers/${id}`);
	return data.data;
}
async function createCustomer(payload) {
	const { data } = await api.post("/customers", payload);
	return data.data;
}
async function updateCustomer(id, payload) {
	const { data } = await api.patch(`/customers/${id}`, payload);
	return data.data;
}
async function updateCustomerStatus(id, status) {
	const { data } = await api.patch(`/customers/${id}/status`, { status });
	return data.data;
}
async function deleteCustomer(id) {
	const { data } = await api.delete(`/customers/${id}`);
	return data.data;
}
async function fetchCustomerOverview(id) {
	const { data } = await api.get(`/customers/${id}/overview`);
	return data.data;
}
async function fetchCustomerContacts(customerId) {
	const { data } = await api.get(`/customers/${customerId}/contacts`);
	return data.data;
}
async function resendCustomerInvitation(customerId) {
	const { data } = await api.post(`/customers/${customerId}/invite/resend`);
	return data.data;
}
async function activateAccount(token, password) {
	const { data } = await api.post("/auth/activate", {
		token,
		password
	});
	return data.data;
}
async function fetchPortalDashboard() {
	const { data } = await api.get("/portal/dashboard");
	return data.data;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/label-Dx73mods.js
var labelVariants = cva("text-[13px] font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/listing-page-BRl9ISBu.js
function ListingBreadcrumbs({ items }) {
	if (items.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Breadcrumb",
		className: "mb-1 flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground",
		children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [index > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
			className: "size-3.5 shrink-0 opacity-40",
			"aria-hidden": true
		}) : null, item.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: item.to,
			className: "transition-colors hover:text-foreground",
			children: item.label
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground/80",
			children: item.label
		})] }, `${item.label}-${index}`))
	});
}
function ListingPage({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		className: cn("overflow-hidden", className),
		children
	});
}
function ListingCardHeader({ title, description, breadcrumbs, value, onChange, placeholder = "Search…", filterOpen, onFilterOpenChange, activeFilterCount = 0, onFilterApply, onFilterClear, filterContent, filterTitle = "Filters", showFilters = true, primaryAction, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap items-center gap-3 border-b border-border/60 bg-card px-4 py-3", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-[7.5rem] shrink-0",
				children: [
					breadcrumbs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingBreadcrumbs, { items: breadcrumbs }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-section-title text-foreground",
						children: title
					}),
					description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-body-sm text-subtle",
						children: description
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-[10rem] flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value,
					onChange: (event) => onChange(event.target.value),
					placeholder,
					className: "h-9 pl-9"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingToolbarActions, {
				filterOpen,
				onFilterOpenChange,
				activeFilterCount,
				onFilterApply,
				onFilterClear,
				filterContent,
				filterTitle,
				showFilters,
				primaryAction
			})
		]
	});
}
function ListingToolbarActions({ filterOpen, onFilterOpenChange, activeFilterCount = 0, onFilterApply, onFilterClear, filterContent, filterTitle = "Filters", showFilters = true, primaryAction }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex shrink-0 flex-wrap items-center gap-2",
		children: [showFilters && filterContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
			open: filterOpen,
			onOpenChange: onFilterOpenChange,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }),
						"Filters",
						activeFilterCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground",
							children: activeFilterCount
						}) : null
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
				align: "end",
				className: "w-[min(100vw-2rem,22rem)] p-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b px-4 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-foreground",
							children: filterTitle
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[min(70vh,24rem)] space-y-4 overflow-y-auto p-4",
						children: filterContent
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 border-t p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "flex-1",
							onClick: onFilterClear,
							children: "Clear"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							className: "flex-1",
							onClick: onFilterApply,
							children: "Apply"
						})]
					})
				]
			})]
		}) : null, primaryAction]
	});
}
function ListingFilterField({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
			children: label
		}), children]
	});
}
function ListingFilterSelect({ value, onChange, placeholder, options, allLabel = "All", allValue = "all" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: onChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
			className: "h-9 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: allValue,
			children: allLabel
		}), options.map(([optionValue, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: optionValue,
			children: label
		}, optionValue))] })]
	});
}
function useListingFilters(defaults, initial) {
	const initialApplied = {
		...defaults,
		...initial
	};
	const [applied, setApplied] = (0, import_react.useState)(initialApplied);
	const [draft, setDraft] = (0, import_react.useState)(initialApplied);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open) setDraft(applied);
	}, [open, applied]);
	const apply = () => {
		setApplied(draft);
		setOpen(false);
	};
	const clear = () => {
		setDraft(defaults);
		setApplied(defaults);
		setOpen(false);
	};
	const activeCount = Object.keys(defaults).filter((key) => applied[key] !== defaults[key]).length;
	const patchDraft = (patch) => setDraft((current) => ({
		...current,
		...patch
	}));
	return {
		applied,
		setApplied,
		draft,
		setDraft,
		patchDraft,
		apply,
		clear,
		open,
		setOpen,
		activeCount
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-D4xZefH8.js
function formatDashboardInputDate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function defaultDashboardDateRange() {
	const dateTo = /* @__PURE__ */ new Date();
	const dateFrom = /* @__PURE__ */ new Date();
	dateFrom.setDate(dateFrom.getDate() - 6);
	return {
		dateFrom: formatDashboardInputDate(dateFrom),
		dateTo: formatDashboardInputDate(dateTo)
	};
}
async function fetchAdminDashboard(params = {}) {
	const { data } = await api.get("/dashboard/admin", { params });
	return data.data;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/projects-3u3KYEi_.js
async function fetchProjects(params = {}) {
	const { data } = await api.get("/projects", { params });
	return data.data;
}
async function fetchProject(id) {
	const { data } = await api.get(`/projects/${id}`);
	return data.data;
}
async function fetchCustomers(search, limit = 50) {
	const { data } = await api.get("/customers", { params: {
		search,
		limit,
		page: 1
	} });
	return data.data.items;
}
async function createProject(payload) {
	const { data } = await api.post("/projects", payload);
	return data.data;
}
async function updateProject(id, payload) {
	const { data } = await api.patch(`/projects/${id}`, payload);
	return data.data;
}
async function deleteProject(id) {
	const { data } = await api.delete(`/projects/${id}`);
	return data.data;
}
async function fetchProjectMembers(projectId, params = {}) {
	const { data } = await api.get(`/projects/${projectId}/members`, { params });
	return data.data;
}
async function assignProjectMember(projectId, payload) {
	const { data } = await api.post(`/projects/${projectId}/members`, payload);
	return data.data;
}
async function removeProjectMember(projectId, memberId) {
	const { data } = await api.delete(`/projects/${projectId}/members/${memberId}`);
	return data.data;
}
async function fetchProjectActivities(projectId, params = {}) {
	const { data } = await api.get(`/projects/${projectId}/activities`, { params });
	return data.data;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/users-CEOZtShF.js
async function fetchUsers() {
	const { data } = await api.get("/users");
	const payload = data.data;
	if (Array.isArray(payload)) return payload;
	return payload.items;
}
async function fetchEmployees() {
	return (await fetchUsers()).filter((user) => user.role === "Admin" || user.role === "Staff");
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/tickets-gALtsw9I.js
async function fetchTickets(params) {
	const { data } = await api.get("/tickets", { params });
	return data.data;
}
async function fetchTicketsPage(params) {
	const result = await fetchTickets({
		page: 1,
		limit: 20,
		...params
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
async function fetchTicket(id) {
	const { data } = await api.get(`/tickets/${id}`);
	return data.data;
}
async function createTicket(payload) {
	const { data } = await api.post("/tickets", payload);
	return data.data;
}
async function updateTicket(id, payload) {
	const { data } = await api.patch(`/tickets/${id}`, payload);
	return data.data;
}
async function transitionTicket(id, payload) {
	const { data } = await api.post(`/tickets/${id}/transition`, payload);
	return data.data;
}
async function fetchTicketMessages(ticketId) {
	const { data } = await api.get(`/tickets/${ticketId}/messages`);
	return data.data;
}
async function postTicketMessage(ticketId, body, isInternal = false, attachments = []) {
	const { data } = await api.post(`/tickets/${ticketId}/messages`, {
		body,
		isInternal,
		attachments
	});
	return data.data;
}
async function fetchTicketEvents(ticketId) {
	const { data } = await api.get(`/tickets/${ticketId}/events`);
	return data.data;
}
async function fetchTicketActivities(ticketId) {
	const { data } = await api.get(`/tickets/${ticketId}/activities`);
	return data.data;
}
function mapSlaStatus(status) {
	switch (status) {
		case "Within SLA": return "On Track";
		case "Near Breach": return "Approaching";
		case "Breached": return "Breached";
		case "Met": return "Met";
		default: return "On Track";
	}
}
function getTicketSlaState(ticket) {
	if (ticket.status === "Resolved" || ticket.status === "Closed") return "Met";
	const slaStatus = ticket.sla?.resolutionSlaStatus ?? ticket.sla?.assignmentSlaStatus;
	if (slaStatus) return mapSlaStatus(slaStatus);
	if (!ticket.dueAt) return "On Track";
	const left = new Date(ticket.dueAt).getTime() - Date.now();
	if (left < 0) return "Breached";
	if (left < 144e5) return "Approaching";
	return "On Track";
}
function getTicketSlaDueAt(ticket) {
	return ticket.sla?.resolutionSlaDueAt ?? ticket.sla?.assignmentSlaDueAt ?? ticket.dueAt ?? null;
}
function buildSlaHistoryEntries(cycles) {
	const entries = [];
	for (const cycle of cycles) {
		entries.push({
			id: `sla-${cycle._id}-start`,
			kind: "sla",
			date: cycle.startedAt,
			action: `SLA cycle ${cycle.cycleNumber} started`,
			performer: "System",
			details: `Assignment target due by ${formatSlaTimestamp(cycle.assignmentSlaDueAt)}`
		});
		if (cycle.assignmentSlaMetAt) {
			const assignmentState = mapSlaStatus(cycle.assignmentSlaStatus);
			entries.push({
				id: `sla-${cycle._id}-assignment`,
				kind: "sla",
				date: cycle.assignmentSlaMetAt,
				action: `Assignment SLA ${assignmentState}`,
				performer: "System",
				details: [`Target was ${formatSlaTimestamp(cycle.assignmentSlaDueAt)}`, cycle.resolutionSlaDueAt ? `Resolution target set to ${formatSlaTimestamp(cycle.resolutionSlaDueAt)}` : null].filter(Boolean).join(" · "),
				slaState: assignmentState
			});
		}
		if (cycle.resolutionSlaMetAt) {
			const resolutionState = mapSlaStatus(cycle.resolutionSlaStatus);
			entries.push({
				id: `sla-${cycle._id}-resolution`,
				kind: "sla",
				date: cycle.resolutionSlaMetAt,
				action: `Resolution SLA ${resolutionState}`,
				performer: "System",
				details: cycle.resolutionSlaDueAt ? `Target was ${formatSlaTimestamp(cycle.resolutionSlaDueAt)}` : "Ticket closed",
				slaState: resolutionState
			});
		}
		if (cycle.endedAt) entries.push({
			id: `sla-${cycle._id}-ended`,
			kind: "sla",
			date: cycle.endedAt,
			action: `SLA cycle ${cycle.cycleNumber} closed`,
			performer: "System",
			details: "SLA tracking ended for this cycle"
		});
	}
	return entries;
}
function mergeTicketHistory(events, sla) {
	const eventEntries = events.map((event) => ({
		id: event._id,
		kind: "event",
		date: event.createdAt,
		action: "Update",
		performer: getTicketUserLabel(event.actorId),
		details: event.description
	}));
	const slaEntries = buildSlaHistoryEntries(sla?.history ?? []);
	return [...eventEntries, ...slaEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
function formatSlaTimestamp(value) {
	if (!value) return "—";
	return new Date(value).toLocaleString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function getTicketProjectLabel(ticket) {
	if (!ticket.projectId) return "—";
	if (typeof ticket.projectId === "string") return ticket.projectId;
	return ticket.projectId.name ?? ticket.projectId.projectId ?? "—";
}
function getTicketCategoryLabel(ticket) {
	if (typeof ticket.categoryId === "string") return ticket.categoryId;
	return ticket.categoryId.name ?? "—";
}
function getTicketUserLabel(user) {
	if (!user) return "—";
	if (typeof user === "string") return user;
	return fullName(user);
}
function getTicketUserId(user) {
	if (!user) return null;
	return typeof user === "string" ? user : user._id;
}
function activityDescription(activity) {
	if (activity.action === "Status Changed" && activity.newValue?.status) return `Status changed to ${String(activity.newValue.status)}`;
	if (activity.action === "Priority Changed" && activity.newValue?.priority) return `Priority changed to ${String(activity.newValue.priority)}`;
	return activity.action;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/uploads-D7Utb2m5.js
var UPLOAD_MAX_FILE_SIZE = 10485760;
async function uploadFile(file, context, options) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("context", context);
	if (options?.ticketId) formData.append("ticketId", options.ticketId);
	const { data } = await api.post("/uploads", formData, { headers: { "Content-Type": "multipart/form-data" } });
	return data.data;
}
async function uploadFiles(files, context, options) {
	const maxFiles = options?.maxFiles ?? 5;
	const selected = files.slice(0, maxFiles);
	return Promise.all(selected.map((file) => {
		if (file.size > 10485760) throw new Error(`${file.name} exceeds the 10MB limit`);
		return uploadFile(file, context, options);
	}));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CZIJBryQ.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-DiJF6gbo.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-surface group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-raised group-[.toaster]:rounded-lg group-[.toaster]:text-sm",
			description: "group-[.toast]:text-muted-foreground group-[.toast]:text-xs",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$44 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Helpdesk — Enterprise Support Ticket Platform" },
			{
				name: "description",
				content: "Enterprise support ticket management for clients and support teams: SLA tracking, assignments, reports and audit logs."
			},
			{
				property: "og:title",
				content: "Helpdesk — Enterprise Support Ticket Platform"
			},
			{
				property: "og:description",
				content: "Raise, triage and resolve support tickets with SLA tracking and role-based access."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$44.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-right",
			richColors: true
		})] })
	});
}
var $$splitComponentImporter$42 = () => import("./routes-Ck4F8I1s.mjs");
var Route$43 = createFileRoute("/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Sign in — Helpdesk Support Portal" },
		{
			name: "description",
			content: "Sign in to the Helpdesk support portal to raise and manage support tickets."
		},
		{
			property: "og:title",
			content: "Sign in — Helpdesk Support Portal"
		},
		{
			property: "og:description",
			content: "Secure sign-in for clients, support agents and administrators."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$42, "component")
});
var $$splitComponentImporter$41 = () => import("./activate-B_i5yosW.mjs");
var Route$42 = createFileRoute("/activate")({
	ssr: false,
	validateSearch: (search) => ({ token: typeof search.token === "string" ? search.token : "" }),
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var $$splitComponentImporter$40 = () => import("./change-password-C_ChNlBJ.mjs");
var Route$41 = createFileRoute("/change-password")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var $$splitComponentImporter$39 = () => import("./forgot-password-B3GV_0_M.mjs");
var Route$40 = createFileRoute("/forgot-password")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Forgot password — Helpdesk Support Portal" },
		{
			name: "description",
			content: "Request a secure password reset link for your Helpdesk support account."
		},
		{
			property: "og:title",
			content: "Forgot password — Helpdesk"
		},
		{
			property: "og:description",
			content: "Request a secure password reset link for your support account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var $$splitComponentImporter$38 = () => import("./help-D5Oyqm-w.mjs");
var Route$39 = createFileRoute("/help")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Help & Support — Helpdesk" },
		{
			name: "description",
			content: "Guidance on raising tickets, SLA targets and account security in Helpdesk."
		},
		{
			property: "og:title",
			content: "Help & Support — Helpdesk"
		},
		{
			property: "og:description",
			content: "Guidance on tickets, SLA targets and account security."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./profile-Dbi2tqdf.mjs");
var Route$38 = createFileRoute("/profile")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Profile & Settings — Helpdesk" },
		{
			name: "description",
			content: "Update your details, change your password and manage notification preferences."
		},
		{
			property: "og:title",
			content: "Profile & Settings — Helpdesk"
		},
		{
			property: "og:description",
			content: "Update details, password and notification preferences."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./reset-password-C-T5MlTN.mjs");
var Route$37 = createFileRoute("/reset-password")({
	ssr: false,
	validateSearch: (search) => ({ token: typeof search.token === "string" ? search.token : "" }),
	head: () => ({ meta: [
		{ title: "Reset password — Helpdesk Support Portal" },
		{
			name: "description",
			content: "Choose a new password for your Helpdesk support account."
		},
		{
			property: "og:title",
			content: "Reset password — Helpdesk"
		},
		{
			property: "og:description",
			content: "Choose a new password for your Helpdesk support account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./unauthorized-Du2aG1zn.mjs");
var Route$36 = createFileRoute("/unauthorized")({
	ssr: false,
	head: () => ({ meta: [{ title: "Unauthorized — Helpdesk" }] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./admin.index-C5EAnSkH.mjs");
var FILTER_ANY = "all";
function buildDashboardQuery(filters) {
	const params = {
		dateFrom: filters.dateFrom,
		dateTo: filters.dateTo
	};
	if (filters.customerId !== FILTER_ANY) params.customerId = filters.customerId;
	if (filters.projectId !== FILTER_ANY) params.projectId = filters.projectId;
	if (filters.assignedTo !== FILTER_ANY) params.assignedTo = filters.assignedTo;
	return params;
}
function formatDashboardRangeLabel(dateFrom, dateTo) {
	const from = /* @__PURE__ */ new Date(`${dateFrom}T00:00:00`);
	const to = /* @__PURE__ */ new Date(`${dateTo}T00:00:00`);
	const sameYear = from.getFullYear() === to.getFullYear();
	const formatter = new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		...sameYear ? {} : { year: "numeric" }
	});
	const toFormatter = new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
	return `${formatter.format(from)} – ${toFormatter.format(to)}`;
}
var Route$35 = createFileRoute("/admin/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Support Dashboard — Helpdesk Admin" },
		{
			name: "description",
			content: "Live overview of ticket volume, SLA health, workload and resolution performance."
		},
		{
			property: "og:title",
			content: "Support Dashboard — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Live overview of ticket volume, SLA health and resolution performance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
function AdminDashboard() {
	const defaultRange = defaultDashboardDateRange();
	const defaultFilters = {
		customerId: FILTER_ANY,
		projectId: FILTER_ANY,
		assignedTo: FILTER_ANY,
		dateFrom: defaultRange.dateFrom,
		dateTo: defaultRange.dateTo
	};
	const [filters, setFilters] = (0, import_react.useState)(defaultFilters);
	const [draft, setDraft] = (0, import_react.useState)(defaultFilters);
	const [filterOpen, setFilterOpen] = (0, import_react.useState)(false);
	const queryParams = (0, import_react.useMemo)(() => buildDashboardQuery(filters), [filters]);
	const { data, isLoading, isError, error, isFetching } = useQuery({
		queryKey: ["admin-dashboard", queryParams],
		queryFn: () => fetchAdminDashboard(queryParams)
	});
	const customersQuery = useQuery({
		queryKey: ["dashboard-customers"],
		queryFn: () => fetchCustomers$1({
			page: 1,
			limit: 100,
			sortBy: "companyName",
			sortOrder: "asc"
		})
	});
	const projectsQuery = useQuery({
		queryKey: ["dashboard-projects", draft.customerId],
		queryFn: () => fetchProjects({
			page: 1,
			limit: 100,
			sortBy: "name",
			sortOrder: "asc",
			...draft.customerId !== FILTER_ANY ? { customerId: draft.customerId } : {}
		})
	});
	const employeesQuery = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees
	});
	(0, import_react.useEffect)(() => {
		if (filterOpen) setDraft(filters);
	}, [filterOpen, filters]);
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load dashboard"));
	}, [isError, error]);
	const kpis = data?.kpis;
	const charts = data?.charts;
	const recent = data?.recentTickets ?? [];
	const rangeLabel = formatDashboardRangeLabel(filters.dateFrom, filters.dateTo);
	const kpiValue = (value) => isLoading ? "…" : value ?? 0;
	const activeFilterCount = [
		filters.customerId !== FILTER_ANY,
		filters.projectId !== FILTER_ANY,
		filters.assignedTo !== FILTER_ANY,
		filters.dateFrom !== defaultFilters.dateFrom || filters.dateTo !== defaultFilters.dateTo
	].filter(Boolean).length;
	const applyFilters = () => {
		if (draft.dateFrom && draft.dateTo && draft.dateFrom > draft.dateTo) {
			toast.error("Start date must be on or before end date.");
			return;
		}
		setFilters(draft);
		setFilterOpen(false);
	};
	const resetFilters = () => {
		setDraft(defaultFilters);
		setFilters(defaultFilters);
		setFilterOpen(false);
	};
	const patchDraft = (patch) => {
		setDraft((current) => {
			const next = {
				...current,
				...patch
			};
			if (patch.customerId !== void 0 && patch.customerId !== current.customerId) next.projectId = FILTER_ANY;
			return next;
		});
	};
	const customers = customersQuery.data?.items ?? [];
	const projects = projectsQuery.data?.items ?? [];
	const employees = employeesQuery.data ?? [];
	const filterContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "Customer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
				value: draft.customerId,
				onChange: (value) => patchDraft({ customerId: value }),
				options: customers.map((customer) => [customer._id, customer.companyName]),
				allLabel: "All customers",
				allValue: FILTER_ANY
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "Project",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
				value: draft.projectId,
				onChange: (value) => patchDraft({ projectId: value }),
				options: projects.map((project) => [project._id, project.name]),
				allLabel: "All projects",
				allValue: FILTER_ANY
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "Assigned agent",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
				value: draft.assignedTo,
				onChange: (value) => patchDraft({ assignedTo: value }),
				options: employees.map((employee) => [employee._id ?? employee.id, fullName(employee)]),
				allLabel: "All agents",
				allValue: FILTER_ANY
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "From",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "date",
				value: draft.dateFrom,
				onChange: (event) => patchDraft({ dateFrom: event.target.value }),
				className: "h-9"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
			label: "To",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "date",
				value: draft.dateTo,
				onChange: (event) => patchDraft({ dateTo: event.target.value }),
				className: "h-9"
			})
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("sticky top-14 z-10 -mt-2 mb-2 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/95 px-4 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/85"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-foreground",
					children: "Support dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [rangeLabel, activeFilterCount > 0 ? ` · ${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} active` : ""]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-2",
				children: [isFetching && !isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), "Updating…"]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingToolbarActions, {
					filterOpen,
					onFilterOpenChange: setFilterOpen,
					activeFilterCount,
					onFilterApply: applyFilters,
					onFilterClear: resetFilters,
					filterContent,
					filterTitle: "Dashboard filters"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Total tickets",
					value: kpiValue(kpis?.total.value),
					icon: Inbox,
					tone: "success",
					trend: kpis?.total.trend,
					to: "/admin/tickets"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "New",
					value: kpiValue(kpis?.new.value),
					icon: CircleDot,
					tone: "primary",
					trend: kpis?.new.trend,
					to: "/admin/tickets",
					search: { status: "New" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "In progress",
					value: kpiValue(kpis?.inProgress.value),
					icon: LoaderCircle,
					tone: "warning",
					trend: kpis?.inProgress.trend,
					to: "/admin/tickets",
					search: { status: "In Progress" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Assigned",
					value: kpiValue(kpis?.assigned.value),
					icon: CirclePause,
					tone: "info",
					trend: kpis?.assigned.trend,
					to: "/admin/tickets",
					search: { status: "Assigned" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Resolved",
					value: kpiValue(kpis?.resolved.value),
					icon: CircleCheck,
					tone: "success",
					trend: kpis?.resolved.trend,
					to: "/admin/tickets",
					search: { status: "Resolved" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Closed",
					value: kpiValue(kpis?.closed.value),
					icon: Archive,
					tone: "default",
					trend: kpis?.closed.trend,
					to: "/admin/tickets",
					search: { status: "Closed" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "High priority",
					value: kpiValue(kpis?.highPriority.value),
					icon: TriangleAlert,
					tone: "warning",
					trend: kpis?.highPriority.trend,
					to: "/admin/tickets",
					search: { priority: "High" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Overdue",
					value: kpiValue(kpis?.overdue.value),
					icon: AlarmClock,
					tone: "danger",
					trend: kpis?.overdue.trend,
					to: "/admin/tickets",
					search: { sla: "Breached" }
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Tickets created vs resolved",
			description: rangeLabel,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-72 p-4",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center text-sm text-muted-foreground",
					children: "Loading chart…"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: charts?.trend ?? [],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--color-border)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "day",
								tickLine: false,
								axisLine: false,
								fontSize: 12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tickLine: false,
								axisLine: false,
								fontSize: 12,
								allowDecimals: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								fontSize: 12,
								borderRadius: 8
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "created",
								stroke: "var(--color-primary)",
								fill: "var(--color-primary)",
								fillOpacity: .12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "resolved",
								stroke: "var(--color-success)",
								fill: "var(--color-success)",
								fillOpacity: .12
							})
						]
					})
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Tickets by status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64 p-4",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center text-sm text-muted-foreground",
							children: "Loading…"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: charts?.byStatus ?? [],
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tickLine: false,
										axisLine: false,
										fontSize: 11,
										interval: 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tickLine: false,
										axisLine: false,
										fontSize: 12,
										allowDecimals: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										fontSize: 12,
										borderRadius: 8
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "value",
										radius: [
											4,
											4,
											0,
											0
										],
										children: (charts?.byStatus ?? []).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: statusChartColor(entry.name) }, entry.name))
									})
								]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Tickets by priority",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64 p-4",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center text-sm text-muted-foreground",
							children: "Loading…"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: charts?.byPriority ?? [],
									dataKey: "value",
									nameKey: "name",
									cx: "50%",
									cy: "45%",
									innerRadius: 48,
									outerRadius: 78,
									paddingAngle: 2,
									isAnimationActive: false,
									children: (charts?.byPriority ?? []).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: priorityChartColor(entry.name) }, entry.name))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									fontSize: 12,
									borderRadius: 8
								} })
							] })
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Tickets by category",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64 p-4",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center text-sm text-muted-foreground",
							children: "Loading…"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: charts?.byCategory ?? [],
								layout: "vertical",
								margin: { left: 8 },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)",
										horizontal: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										tickLine: false,
										axisLine: false,
										fontSize: 12,
										allowDecimals: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "name",
										tickLine: false,
										axisLine: false,
										fontSize: 11,
										width: 100
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										fontSize: 12,
										borderRadius: 8
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "value",
										radius: [
											0,
											4,
											4,
											0
										],
										children: (charts?.byCategory ?? []).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: categoryChartColor(entry.name) }, entry.name))
									})
								]
							})
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Recently updated tickets",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/tickets",
					children: "View all"
				})
			}),
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
				rows: 6,
				cols: 6
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
				className: "hover:bg-transparent",
				children: [
					"Ticket",
					"Client",
					"Priority",
					"Status",
					"Agent",
					"Updated"
				].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: heading }, heading))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: recent.map((ticket) => {
				const client = ticket.clientId;
				const agent = ticket.assignedTo;
				const clientName = getTicketUserLabel(client);
				const clientHue = client && typeof client !== "string" ? client.avatarHue ?? 265 : 265;
				const company = client && typeof client !== "string" ? client.company : void 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
						id: String(ticket.number),
						title: String(ticket.subject),
						to: "/admin/tickets/$ticketId",
						params: { ticketId: String(ticket._id ?? ticket.id) }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: getTicketCategoryLabel(ticket)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
						name: clientName,
						...company ? { subtitle: company } : {},
						hue: clientHue
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: String(ticket.priority) }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: String(ticket.status) }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: agent ? getTicketUserLabel(agent) : "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-muted-foreground",
						children: formatDate(String(ticket.updatedAt ?? ticket.createdAt))
					})
				] }, String(ticket._id ?? ticket.id));
			}) })] })
		})
	] });
}
var $$splitComponentImporter$33 = () => import("./admin.audit-t6EU70uG.mjs");
var Route$34 = createFileRoute("/admin/audit")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Audit Logs — Helpdesk Admin" },
		{
			name: "description",
			content: "Immutable record of logins, ticket changes, assignments and account administration."
		},
		{
			property: "og:title",
			content: "Audit Logs — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Record of logins, ticket changes and account administration."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./admin.clients-46HXk_Lb.mjs");
var Route$33 = createFileRoute("/admin/clients")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Client Management — Helpdesk Admin" },
		{
			name: "description",
			content: "Manage client accounts, activation status and their full support ticket history."
		},
		{
			property: "og:title",
			content: "Client Management — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Manage client accounts, status and ticket history."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./admin.dashboard-DH7ro4Vm.mjs");
var Route$32 = createFileRoute("/admin/dashboard")({
	ssr: false,
	head: () => ({ meta: [{ title: "Admin Dashboard — Helpdesk" }] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./admin.notifications-Bfq6-4j5.mjs");
var Route$31 = createFileRoute("/admin/notifications")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Notifications — Helpdesk Admin" },
		{
			name: "description",
			content: "New tickets, client replies, escalations and SLA alerts for the support team."
		},
		{
			property: "og:title",
			content: "Notifications — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "New tickets, replies, escalations and SLA alerts."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./admin.reports-BkXcZIbq.mjs");
var Route$30 = createFileRoute("/admin/reports")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Reports & Analytics — Helpdesk Admin" },
		{
			name: "description",
			content: "Ticket volume, SLA performance, workload and support quality reporting."
		},
		{
			property: "og:title",
			content: "Reports & Analytics — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Enterprise ticket intelligence and operations reporting."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var settingsNavGroups = [
	{
		title: "Organization",
		items: [{
			id: "company",
			label: "Company",
			icon: Building2
		}, {
			id: "users-roles",
			label: "Users & Roles",
			icon: Users
		}]
	},
	{
		title: "Support",
		items: [{
			id: "tickets-sla",
			label: "Tickets & SLA",
			icon: Ticket
		}, {
			id: "ticket-categories",
			label: "Ticket Categories",
			icon: Layers
		}]
	},
	{
		title: "Communication",
		items: [{
			id: "notifications",
			label: "Notifications",
			icon: Bell
		}]
	}
];
var settingsSectionMeta = {
	company: {
		title: "Company information",
		description: "Update your organization details and system preferences.",
		breadcrumb: "Company"
	},
	"users-roles": {
		title: "Users & roles",
		description: "Manage role definitions and permission scopes.",
		breadcrumb: "Users & Roles"
	},
	"tickets-sla": {
		title: "Tickets & SLA",
		description: "Configure ticket defaults and SLA response targets.",
		breadcrumb: "Tickets & SLA"
	},
	"ticket-categories": {
		title: "Ticket categories",
		description: "Manage categories used when logging support requests.",
		breadcrumb: "Ticket Categories"
	},
	notifications: {
		title: "Notifications",
		description: "Configure email notifications for ticket events.",
		breadcrumb: "Notifications"
	}
};
function SettingsShell({ section, onSectionChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 lg:flex-row lg:items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "w-full shrink-0 lg:w-56",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "rounded-md border border-border/60 bg-card p-2 shadow-sm",
				"aria-label": "Settings",
				children: settingsNavGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 last:mb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 py-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase",
						children: group.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-0.5",
						children: group.items.map((item) => {
							const Icon = item.icon;
							const active = section === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onSectionChange(item.id),
								className: cn("flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] font-medium transition-colors", active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: item.label
								})]
							}) }, item.id);
						})
					})]
				}, group.title))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 flex-1",
			children
		})]
	});
}
function SettingsPageHeader({ title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex flex-wrap items-start justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold tracking-tight text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-subtle",
			children: description
		})] }), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: actions
		}) : null]
	});
}
function SettingsCard({ title, description, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("overflow-hidden rounded-md border border-border/60 bg-card shadow-sm", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border/60 px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold text-foreground",
				children: title
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-sm text-subtle",
				children: description
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-5",
			children
		})]
	});
}
function SettingsField({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-sm font-medium text-foreground",
			children: label
		}), children]
	});
}
function SettingsUploadBox({ label, hint = "Click to upload", previewSrc, accept = "image/*", context, onUploaded, disabled = false }) {
	const inputRef = (0, import_react.useRef)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	async function handleChange(event) {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;
		setUploading(true);
		try {
			onUploaded((await uploadFile(file, context)).url);
			toast.success(`${label} uploaded.`);
		} catch (error) {
			toast.error(getApiErrorMessage(error, `Failed to upload ${label.toLowerCase()}`));
		} finally {
			setUploading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: cn("flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted/20 px-4 py-6 text-center transition-colors hover:bg-muted/40", (disabled || uploading) && "pointer-events-none opacity-60"),
			children: [
				previewSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: previewSrc,
					alt: "",
					className: "max-h-10 object-contain"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-10 place-items-center rounded-md bg-primary/10 text-primary",
					children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: uploading ? "Uploading…" : hint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					className: "sr-only",
					accept,
					disabled: disabled || uploading,
					onChange: handleChange
				})
			]
		})]
	});
}
var $$splitComponentImporter$28 = () => import("./admin.settings-Bd6ITB1U.mjs");
var Route$29 = createFileRoute("/admin/settings")({
	ssr: false,
	validateSearch: (search) => ({ section: typeof search.section === "string" && search.section in settingsSectionMeta ? search.section : "company" }),
	head: () => ({ meta: [{ title: "Settings — Helpdesk Admin" }, {
		name: "description",
		content: "Configure company details, ticket defaults, categories, SLA targets and notifications."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./admin.team-BSvMjcVV.mjs");
var Route$28 = createFileRoute("/admin/team")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Support Team — Helpdesk Admin" },
		{
			name: "description",
			content: "Manage support agents, roles, workload and resolution performance."
		},
		{
			property: "og:title",
			content: "Support Team — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Manage support agents, roles, workload and performance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./client.dashboard-C227CtHx.mjs");
var Route$27 = createFileRoute("/client/dashboard")({
	ssr: false,
	head: () => ({ meta: [{ title: "Client Dashboard — Helpdesk" }] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./portal.index-Cu8x1FQM.mjs");
var Route$26 = createFileRoute("/portal/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "My Support Dashboard — Helpdesk" },
		{
			name: "description",
			content: "Track your open support tickets, replies awaiting you and recent resolutions."
		},
		{
			property: "og:title",
			content: "My Support Dashboard — Helpdesk"
		},
		{
			property: "og:description",
			content: "Track your open tickets, replies and recent resolutions."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
function PortalHome() {
	const { user } = useAuth();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["portal-dashboard"],
		queryFn: fetchPortalDashboard
	});
	(0, import_react.useEffect)(() => {
		if (isError) toast.error(getApiErrorMessage(error, "Failed to load dashboard"));
	}, [isError, error]);
	const summary = data?.summary;
	const tickets = data?.recentTickets ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `Welcome back, ${user?.name?.split(" ")[0] ?? user?.firstName ?? ""}`,
			description: "Your support activity at a glance.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/portal/tickets/new",
					children: "New ticket"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Open tickets",
					value: isLoading ? "…" : summary?.openTickets ?? 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "In progress",
					value: isLoading ? "…" : summary?.inProgress ?? 0,
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Resolved",
					value: isLoading ? "…" : summary?.resolved ?? 0,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "My projects",
					value: "View",
					to: "/portal/projects"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Recent tickets",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/portal/tickets",
				className: "text-sm text-primary hover:underline",
				children: "View all"
			}),
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
				rows: 4,
				cols: 5
			}) : tickets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No tickets yet",
				description: "Raise your first ticket and our team will respond within SLA."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				className: "min-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					className: "hover:bg-transparent",
					children: [
						"Ticket",
						"Priority",
						"Status",
						"Last update"
					].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: heading }, heading))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: tickets.slice(0, 6).map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
						id: String(ticket.number),
						title: String(ticket.subject),
						to: "/portal/tickets/$ticketId",
						params: { ticketId: String(ticket._id) }
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: ticket.priority }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: ticket.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "whitespace-nowrap text-muted-foreground",
						children: formatDate(String(ticket.updatedAt), true)
					})
				] }, String(ticket._id))) })]
			})
		})
	] });
}
var $$splitComponentImporter$24 = () => import("./portal.notifications-BQXkg6Zs.mjs");
var Route$25 = createFileRoute("/portal/notifications")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Notifications — Helpdesk" },
		{
			name: "description",
			content: "Replies, status changes and resolution alerts for your support tickets."
		},
		{
			property: "og:title",
			content: "Notifications — Helpdesk"
		},
		{
			property: "og:description",
			content: "Replies, status changes and resolution alerts."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./staff.dashboard-DL3aFI0a.mjs");
var Route$24 = createFileRoute("/staff/dashboard")({
	ssr: false,
	head: () => ({ meta: [{ title: "Staff Dashboard — Helpdesk" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./admin.customers.index-DDilJOZu.mjs");
var Route$23 = createFileRoute("/admin/customers/")({
	ssr: false,
	validateSearch: (search) => ({
		action: search["action"] === "create" ? "create" : void 0,
		edit: typeof search["edit"] === "string" ? search["edit"] : void 0
	}),
	head: () => ({ meta: [{ title: "Customers — Helpdesk Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./admin.customers._customerId-xakL9oKB.mjs");
var Route$22 = createFileRoute("/admin/customers/$customerId")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./admin.customers.new-DFQ0BXgD.mjs");
var Route$21 = createFileRoute("/admin/customers/new")({
	ssr: false,
	head: () => ({ meta: [{ title: "New Customer — Helpdesk Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./admin.projects.index-BU3SC57i.mjs");
var Route$20 = createFileRoute("/admin/projects/")({
	ssr: false,
	validateSearch: (search) => ({
		page: typeof search["page"] === "number" ? search["page"] : Number(search["page"]) || void 0,
		status: typeof search["status"] === "string" ? search["status"] : void 0,
		sort: typeof search["sort"] === "string" ? search["sort"] : void 0,
		q: typeof search["q"] === "string" ? search["q"] : void 0,
		action: search["action"] === "create" ? "create" : void 0,
		edit: typeof search["edit"] === "string" ? search["edit"] : void 0
	}),
	head: () => ({ meta: [{ title: "Projects — Helpdesk Admin" }, {
		name: "description",
		content: "Browse and manage customer projects with progress, status and deadlines."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./admin.projects._projectId-BbrzYGgl.mjs");
var Route$19 = createFileRoute("/admin/projects/$projectId")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./admin.projects.new-DX7oiC_g.mjs");
var Route$18 = createFileRoute("/admin/projects/new")({
	ssr: false,
	head: () => ({ meta: [{ title: "New Project — Helpdesk Admin" }, {
		name: "description",
		content: "Create a new customer project with dates, hours and status."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./admin.tickets.index-CxQ0GQsF.mjs");
var Route$17 = createFileRoute("/admin/tickets/")({
	ssr: false,
	validateSearch: (search) => ({
		status: typeof search["status"] === "string" ? search["status"] : void 0,
		priority: typeof search["priority"] === "string" ? search["priority"] : void 0,
		sla: typeof search["sla"] === "string" ? search["sla"] : void 0,
		client: typeof search["client"] === "string" ? search["client"] : void 0,
		agent: typeof search["agent"] === "string" ? search["agent"] : void 0,
		projectId: typeof search["projectId"] === "string" ? search["projectId"] : void 0,
		category: typeof search["category"] === "string" ? search["category"] : void 0,
		tag: typeof search["tag"] === "string" ? search["tag"] : void 0,
		customerId: typeof search["customerId"] === "string" ? search["customerId"] : void 0,
		createdFrom: typeof search["createdFrom"] === "string" ? search["createdFrom"] : void 0,
		createdTo: typeof search["createdTo"] === "string" ? search["createdTo"] : void 0,
		action: search["action"] === "create" ? "create" : void 0
	}),
	head: () => ({ meta: [{ title: "Ticket Management — Helpdesk Admin" }, {
		name: "description",
		content: "Filter, sort, assign and triage every support ticket across all clients."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./admin.tickets._ticketId-1UHXX-Xg.mjs");
var Route$16 = createFileRoute("/admin/tickets/$ticketId")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Ticket workspace — Helpdesk Admin" },
		{
			name: "description",
			content: "Full ticket workspace with conversation, internal notes, SLA tracking and assignment."
		},
		{
			property: "og:title",
			content: "Ticket workspace — Helpdesk Admin"
		},
		{
			property: "og:description",
			content: "Conversation, internal notes, SLA tracking and assignment in one view."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./admin.tickets.new-Cn0U3i3G.mjs");
var Route$15 = createFileRoute("/admin/tickets/new")({
	ssr: false,
	validateSearch: (search) => ({ projectId: typeof search["projectId"] === "string" ? search["projectId"] : void 0 }),
	head: () => ({ meta: [{ title: "Create Ticket — Helpdesk Admin" }, {
		name: "description",
		content: "Create a support ticket for any accessible project."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./admin.users.index-WxFJuvQj.mjs");
var Route$14 = createFileRoute("/admin/users/")({
	ssr: false,
	validateSearch: (search) => ({
		action: search["action"] === "create" ? "create" : void 0,
		edit: typeof search["edit"] === "string" ? search["edit"] : void 0
	}),
	head: () => ({ meta: [{ title: "Users — Helpdesk Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./admin.users._userId-hcdhYiZ-.mjs");
var Route$13 = createFileRoute("/admin/users/$userId")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin.users.new-CMKuDD7-.mjs");
var Route$12 = createFileRoute("/admin/users/new")({
	ssr: false,
	head: () => ({ meta: [{ title: "New User — Helpdesk Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./portal.projects.index-DrAiNQ1L.mjs");
var Route$11 = createFileRoute("/portal/projects/")({
	ssr: false,
	head: () => ({ meta: [{ title: "My Projects — Helpdesk" }, {
		name: "description",
		content: "View projects associated with your organization."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./portal.projects._projectId-CiIY908J.mjs");
var Route$10 = createFileRoute("/portal/projects/$projectId")({
	ssr: false,
	head: () => ({ meta: [{ title: "Project Overview — Helpdesk" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./portal.tickets.index-mOtIdDPa.mjs");
var Route$9 = createFileRoute("/portal/tickets/")({
	ssr: false,
	head: () => ({ meta: [{ title: "My Tickets — Helpdesk" }, {
		name: "description",
		content: "Browse, search and filter every support ticket you have submitted."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./portal.tickets._ticketId-BkO4-qd4.mjs");
var Route$8 = createFileRoute("/portal/tickets/$ticketId")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Ticket Details — Helpdesk" },
		{
			name: "description",
			content: "Follow the conversation, status and SLA timeline for your support ticket."
		},
		{
			property: "og:title",
			content: "Ticket Details — Helpdesk"
		},
		{
			property: "og:description",
			content: "Conversation, status and SLA timeline for your ticket."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./portal.tickets.new-Bab7k33y.mjs");
var Route$7 = createFileRoute("/portal/tickets/new")({
	ssr: false,
	validateSearch: (search) => ({ projectId: typeof search["projectId"] === "string" ? search["projectId"] : void 0 }),
	head: () => ({ meta: [{ title: "Create Ticket — Helpdesk" }, {
		name: "description",
		content: "Submit a new support request with project, category, priority and attachments."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.customers._customerId.index-CnOBdoyC.mjs");
var Route$6 = createFileRoute("/admin/customers/$customerId/")({
	ssr: false,
	validateSearch: (search) => ({ edit: search["edit"] === true || search["edit"] === "true" }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.customers._customerId.edit-FGhi4Kba.mjs");
var Route$5 = createFileRoute("/admin/customers/$customerId/edit")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.projects._projectId.index-CySMR-V3.mjs");
var Route$4 = createFileRoute("/admin/projects/$projectId/")({
	ssr: false,
	validateSearch: (search) => ({ edit: search["edit"] === true || search["edit"] === "true" }),
	head: () => ({ meta: [{ title: "Project Overview — Helpdesk Admin" }, {
		name: "description",
		content: "Project overview with stats, team members and activity timeline."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.projects._projectId.edit-BwrW2fWy.mjs");
var Route$3 = createFileRoute("/admin/projects/$projectId/edit")({
	ssr: false,
	head: () => ({ meta: [{ title: "Edit Project — Helpdesk Admin" }, {
		name: "description",
		content: "Update project details, schedule, hours and status."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var Route$2 = createFileRoute("/admin/projects/$projectId/members")({ beforeLoad: ({ params }) => {
	throw redirect({
		to: "/admin/projects/$projectId",
		params: { projectId: params.projectId }
	});
} });
var $$splitComponentImporter$1 = () => import("./admin.users._userId.index-DEbDbr26.mjs");
var Route$1 = createFileRoute("/admin/users/$userId/")({
	ssr: false,
	validateSearch: (search) => ({ edit: search["edit"] === true || search["edit"] === "true" }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.users._userId.edit-BdF4PjER.mjs");
var Route = createFileRoute("/admin/users/$userId/edit")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$43.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$44
});
var ActivateRoute = Route$42.update({
	id: "/activate",
	path: "/activate",
	getParentRoute: () => Route$44
});
var ChangePasswordRoute = Route$41.update({
	id: "/change-password",
	path: "/change-password",
	getParentRoute: () => Route$44
});
var ForgotPasswordRoute = Route$40.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$44
});
var HelpRoute = Route$39.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => Route$44
});
var ProfileRoute = Route$38.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$44
});
var ResetPasswordRoute = Route$37.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$44
});
var UnauthorizedRoute = Route$36.update({
	id: "/unauthorized",
	path: "/unauthorized",
	getParentRoute: () => Route$44
});
var AdminIndexRoute = Route$35.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$44
});
var AdminAuditRoute = Route$34.update({
	id: "/admin/audit",
	path: "/admin/audit",
	getParentRoute: () => Route$44
});
var AdminClientsRoute = Route$33.update({
	id: "/admin/clients",
	path: "/admin/clients",
	getParentRoute: () => Route$44
});
var AdminDashboardRoute = Route$32.update({
	id: "/admin/dashboard",
	path: "/admin/dashboard",
	getParentRoute: () => Route$44
});
var AdminNotificationsRoute = Route$31.update({
	id: "/admin/notifications",
	path: "/admin/notifications",
	getParentRoute: () => Route$44
});
var AdminReportsRoute = Route$30.update({
	id: "/admin/reports",
	path: "/admin/reports",
	getParentRoute: () => Route$44
});
var AdminSettingsRoute = Route$29.update({
	id: "/admin/settings",
	path: "/admin/settings",
	getParentRoute: () => Route$44
});
var AdminTeamRoute = Route$28.update({
	id: "/admin/team",
	path: "/admin/team",
	getParentRoute: () => Route$44
});
var ClientDashboardRoute = Route$27.update({
	id: "/client/dashboard",
	path: "/client/dashboard",
	getParentRoute: () => Route$44
});
var PortalIndexRoute = Route$26.update({
	id: "/portal/",
	path: "/portal/",
	getParentRoute: () => Route$44
});
var PortalNotificationsRoute = Route$25.update({
	id: "/portal/notifications",
	path: "/portal/notifications",
	getParentRoute: () => Route$44
});
var StaffDashboardRoute = Route$24.update({
	id: "/staff/dashboard",
	path: "/staff/dashboard",
	getParentRoute: () => Route$44
});
var AdminCustomersIndexRoute = Route$23.update({
	id: "/admin/customers/",
	path: "/admin/customers/",
	getParentRoute: () => Route$44
});
var AdminCustomersCustomerIdRoute = Route$22.update({
	id: "/admin/customers/$customerId",
	path: "/admin/customers/$customerId",
	getParentRoute: () => Route$44
});
var AdminCustomersNewRoute = Route$21.update({
	id: "/admin/customers/new",
	path: "/admin/customers/new",
	getParentRoute: () => Route$44
});
var AdminProjectsIndexRoute = Route$20.update({
	id: "/admin/projects/",
	path: "/admin/projects/",
	getParentRoute: () => Route$44
});
var AdminProjectsProjectIdRoute = Route$19.update({
	id: "/admin/projects/$projectId",
	path: "/admin/projects/$projectId",
	getParentRoute: () => Route$44
});
var AdminProjectsNewRoute = Route$18.update({
	id: "/admin/projects/new",
	path: "/admin/projects/new",
	getParentRoute: () => Route$44
});
var AdminTicketsIndexRoute = Route$17.update({
	id: "/admin/tickets/",
	path: "/admin/tickets/",
	getParentRoute: () => Route$44
});
var AdminTicketsTicketIdRoute = Route$16.update({
	id: "/admin/tickets/$ticketId",
	path: "/admin/tickets/$ticketId",
	getParentRoute: () => Route$44
});
var AdminTicketsNewRoute = Route$15.update({
	id: "/admin/tickets/new",
	path: "/admin/tickets/new",
	getParentRoute: () => Route$44
});
var AdminUsersIndexRoute = Route$14.update({
	id: "/admin/users/",
	path: "/admin/users/",
	getParentRoute: () => Route$44
});
var AdminUsersUserIdRoute = Route$13.update({
	id: "/admin/users/$userId",
	path: "/admin/users/$userId",
	getParentRoute: () => Route$44
});
var AdminUsersNewRoute = Route$12.update({
	id: "/admin/users/new",
	path: "/admin/users/new",
	getParentRoute: () => Route$44
});
var PortalProjectsIndexRoute = Route$11.update({
	id: "/portal/projects/",
	path: "/portal/projects/",
	getParentRoute: () => Route$44
});
var PortalProjectsProjectIdRoute = Route$10.update({
	id: "/portal/projects/$projectId",
	path: "/portal/projects/$projectId",
	getParentRoute: () => Route$44
});
var PortalTicketsIndexRoute = Route$9.update({
	id: "/portal/tickets/",
	path: "/portal/tickets/",
	getParentRoute: () => Route$44
});
var PortalTicketsTicketIdRoute = Route$8.update({
	id: "/portal/tickets/$ticketId",
	path: "/portal/tickets/$ticketId",
	getParentRoute: () => Route$44
});
var PortalTicketsNewRoute = Route$7.update({
	id: "/portal/tickets/new",
	path: "/portal/tickets/new",
	getParentRoute: () => Route$44
});
var AdminCustomersCustomerIdIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminCustomersCustomerIdRoute
});
var AdminCustomersCustomerIdEditRoute = Route$5.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => AdminCustomersCustomerIdRoute
});
var AdminProjectsProjectIdIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminProjectsProjectIdRoute
});
var AdminProjectsProjectIdEditRoute = Route$3.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => AdminProjectsProjectIdRoute
});
var AdminProjectsProjectIdMembersRoute = Route$2.update({
	id: "/members",
	path: "/members",
	getParentRoute: () => AdminProjectsProjectIdRoute
});
var AdminUsersUserIdIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminUsersUserIdRoute
});
var AdminUsersUserIdEditRoute = Route.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => AdminUsersUserIdRoute
});
var AdminCustomersCustomerIdRouteChildren = {
	AdminCustomersCustomerIdEditRoute,
	AdminCustomersCustomerIdIndexRoute
};
var AdminCustomersCustomerIdRouteWithChildren = AdminCustomersCustomerIdRoute._addFileChildren(AdminCustomersCustomerIdRouteChildren);
var AdminProjectsProjectIdRouteChildren = {
	AdminProjectsProjectIdEditRoute,
	AdminProjectsProjectIdMembersRoute,
	AdminProjectsProjectIdIndexRoute
};
var AdminProjectsProjectIdRouteWithChildren = AdminProjectsProjectIdRoute._addFileChildren(AdminProjectsProjectIdRouteChildren);
var AdminUsersUserIdRouteChildren = {
	AdminUsersUserIdEditRoute,
	AdminUsersUserIdIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	ActivateRoute,
	ChangePasswordRoute,
	ForgotPasswordRoute,
	HelpRoute,
	ProfileRoute,
	ResetPasswordRoute,
	UnauthorizedRoute,
	AdminAuditRoute,
	AdminClientsRoute,
	AdminDashboardRoute,
	AdminNotificationsRoute,
	AdminReportsRoute,
	AdminSettingsRoute,
	AdminTeamRoute,
	ClientDashboardRoute,
	PortalNotificationsRoute,
	StaffDashboardRoute,
	AdminIndexRoute,
	PortalIndexRoute,
	AdminCustomersCustomerIdRoute: AdminCustomersCustomerIdRouteWithChildren,
	AdminCustomersNewRoute,
	AdminProjectsProjectIdRoute: AdminProjectsProjectIdRouteWithChildren,
	AdminProjectsNewRoute,
	AdminTicketsTicketIdRoute,
	AdminTicketsNewRoute,
	AdminUsersUserIdRoute: AdminUsersUserIdRoute._addFileChildren(AdminUsersUserIdRouteChildren),
	AdminUsersNewRoute,
	PortalProjectsProjectIdRoute,
	PortalTicketsTicketIdRoute,
	PortalTicketsNewRoute,
	AdminCustomersIndexRoute,
	AdminProjectsIndexRoute,
	AdminTicketsIndexRoute,
	AdminUsersIndexRoute,
	PortalProjectsIndexRoute,
	PortalTicketsIndexRoute
};
var routeTree = Route$44._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { fetchProject as $, createTicket as A, getTicketSlaState as B, SettingsUploadBox as C, resendCustomerInvitation as Ct, UPLOAD_MAX_FILE_SIZE as D, Route$42 as E, fetchTickets as F, postTicketMessage as G, getTicketUserLabel as H, fetchTicketsPage as I, fetchEmployees as J, transitionTicket as K, getTicketCategoryLabel as L, fetchTicketActivities as M, fetchTicketEvents as N, uploadFiles as O, fetchTicketMessages as P, fetchCustomers as Q, getTicketProjectLabel as R, SettingsShell as S, fetchPortalDashboard as St, AdminDashboard as T, updateCustomerStatus as Tt, mapSlaStatus as U, getTicketUserId as V, mergeTicketHistory as W, createProject as X, assignProjectMember as Y, deleteProject as Z, PortalHome as _, deleteCustomer as _t, Route$4 as a, defaultDashboardDateRange as at, SettingsField as b, fetchCustomerOverview as bt, Route$7 as c, ListingCardHeader as ct, Route$14 as d, ListingPage as dt, fetchProjectActivities as et, Route$15 as f, ListingToolbarActions as ft, Route$23 as g, createCustomer as gt, Route$20 as h, activateAccount as ht, Route$3 as i, updateProject as it, fetchTicket as j, activityDescription as k, Route$8 as l, ListingFilterField as lt, Route$17 as m, Label as mt, Route as n, fetchProjects as nt, Route$5 as o, fetchAdminDashboard as ot, Route$16 as p, useListingFilters as pt, updateTicket as q, Route$1 as r, removeProjectMember as rt, Route$6 as s, formatDashboardInputDate as st, router_exports as t, fetchProjectMembers as tt, Route$10 as u, ListingFilterSelect as ut, Route$29 as v, fetchCustomer as vt, settingsSectionMeta as w, updateCustomer as wt, SettingsPageHeader as x, fetchCustomers$1 as xt, SettingsCard as y, fetchCustomerContacts as yt, getTicketSlaDueAt as z };
