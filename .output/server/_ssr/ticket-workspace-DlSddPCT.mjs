import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime, c as Root, o as CollapsibleContent$1, s as CollapsibleTrigger$1 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, f as useAuth, n as Button, s as getApiErrorMessage } from "./button-vnqCGuCs.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Paperclip, I as ListFilter, J as EllipsisVertical, O as MessageSquare, P as Lock, X as Clock, ct as ChevronDown, d as Ticket, mt as ArrowLeft, p as StickyNote, t as X, vt as Activity, y as Send } from "../_libs/lucide-react.mjs";
import { _ as fullName, f as SlaBadge, h as UserAvatar, i as PRIORITIES, l as SETTABLE_STATUSES, p as StatusBadge, s as PriorityBadge, t as EmptyState } from "./primitives-BAq0jd4Y.mjs";
import { a as DropdownMenuSeparator, m as formatDate, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./store-C1539MgZ.mjs";
import { C as SelectTrigger, S as SelectItem, _ as TableHead, b as Select, g as TableCell, h as TableBody, m as Table, v as TableHeader, w as SelectValue, x as SelectContent, y as TableRow } from "./data-table-CCefV4l1.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as getTicketSlaState, G as postTicketMessage, H as getTicketUserLabel, J as fetchEmployees, K as transitionTicket, L as getTicketCategoryLabel, M as fetchTicketActivities, N as fetchTicketEvents, P as fetchTicketMessages, R as getTicketProjectLabel, U as mapSlaStatus, V as getTicketUserId, W as mergeTicketHistory, j as fetchTicket, k as activityDescription, q as updateTicket, z as getTicketSlaDueAt } from "./router-CZIJBryQ.mjs";
import { a as AlertDialogCancel, c as AlertDialogFooter, d as AlertDialogTrigger, i as AlertDialogAction, l as AlertDialogHeader, o as AlertDialogContent, r as AlertDialog, s as AlertDialogDescription, u as AlertDialogTitle } from "./guard-BbFIUcOG.mjs";
import { t as Badge } from "./badge-D6z9ibdi.mjs";
import { t as Textarea } from "./textarea-uxyrlvLH.mjs";
import { t as fetchCategories } from "./categories-DyXz_9LF.mjs";
import { t as FileUploadField } from "./file-upload-field-C3z25PYo.mjs";
import { a as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CnsCxU5q.mjs";
import { c as slaTargetsFromPolicy, i as fetchSlaPolicies, o as findSlaPolicyForPriority } from "./sla-CJCI0zB3.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ticket-workspace-DlSddPCT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root$1.displayName;
var Collapsible = Root;
var CollapsibleTrigger = CollapsibleTrigger$1;
var CollapsibleContent = CollapsibleContent$1;
function TicketWorkspace({ ticketId, mode }) {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = (0, import_react.useState)("conversation");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [internal, setInternal] = (0, import_react.useState)(false);
	const [closeComment, setCloseComment] = (0, import_react.useState)("");
	const [files, setFiles] = (0, import_react.useState)([]);
	const [messageSort, setMessageSort] = (0, import_react.useState)("asc");
	const [detailsOpen, setDetailsOpen] = (0, import_react.useState)(true);
	const [manageOpen, setManageOpen] = (0, import_react.useState)(true);
	const ticketQuery = useQuery({
		queryKey: ["ticket", ticketId],
		queryFn: () => fetchTicket(ticketId)
	});
	const messagesQuery = useQuery({
		queryKey: ["ticket-messages", ticketId],
		queryFn: () => fetchTicketMessages(ticketId),
		enabled: !!ticketQuery.data
	});
	const eventsQuery = useQuery({
		queryKey: ["ticket-events", ticketId],
		queryFn: () => fetchTicketEvents(ticketId),
		enabled: !!ticketQuery.data
	});
	const activitiesQuery = useQuery({
		queryKey: ["ticket-activities", ticketId],
		queryFn: () => fetchTicketActivities(ticketId),
		enabled: !!ticketQuery.data && activeTab === "activities"
	});
	const categoriesQuery = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
		enabled: mode === "admin"
	});
	const employeesQuery = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees,
		enabled: mode === "admin"
	});
	const slaPoliciesQuery = useQuery({
		queryKey: ["sla-policies"],
		queryFn: fetchSlaPolicies
	});
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
		queryClient.invalidateQueries({ queryKey: ["ticket-messages", ticketId] });
		queryClient.invalidateQueries({ queryKey: ["ticket-events", ticketId] });
		queryClient.invalidateQueries({ queryKey: ["ticket-activities", ticketId] });
		queryClient.invalidateQueries({ queryKey: ["admin-tickets"] });
		queryClient.invalidateQueries({ queryKey: ["tickets"] });
	};
	const messageMutation = useMutation({
		mutationFn: () => postTicketMessage(ticketId, draft.trim(), internal, files),
		onSuccess: () => {
			setDraft("");
			setFiles([]);
			invalidate();
			toast.success(internal ? "Internal note added." : "Your reply has been posted.");
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to post message"))
	});
	const updateMutation = useMutation({
		mutationFn: (payload) => updateTicket(ticketId, payload),
		onSuccess: () => {
			invalidate();
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update ticket"))
	});
	const transitionMutation = useMutation({
		mutationFn: (payload) => transitionTicket(ticketId, payload),
		onSuccess: () => {
			invalidate();
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update status"))
	});
	const runUpdate = (payload, description) => {
		updateMutation.mutate(payload, { onSuccess: () => toast.success(description) });
	};
	const runTransition = (payload, description) => {
		if (ticketQuery.data?.status === "Cancelled") {
			toast.error("Cancelled tickets cannot be changed to another status.");
			return;
		}
		transitionMutation.mutate(payload, { onSuccess: () => toast.success(description) });
	};
	if (ticketQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-lg border bg-card p-10 text-center text-sm text-muted-foreground",
		children: "Loading ticket…"
	});
	if (ticketQuery.isError || !ticketQuery.data || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Ticket not found",
		description: "This ticket is unavailable or you do not have access.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: mode === "admin" ? "/admin/tickets" : "/portal/tickets",
				children: "Back to tickets"
			})
		})
	});
	const ticket = ticketQuery.data;
	const clientId = getTicketUserId(ticket.clientId);
	const ticketCustomerId = typeof ticket.customerId === "string" ? ticket.customerId : ticket.customerId?._id ?? null;
	if (mode === "client" && user && clientId !== user.id && (!user.customerId || ticketCustomerId !== user.customerId)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-lg border bg-card p-10 text-center text-sm text-muted-foreground",
		children: "You do not have access to this ticket."
	});
	const client = typeof ticket.clientId === "string" ? null : ticket.clientId;
	const agent = typeof ticket.assignedTo === "string" || !ticket.assignedTo ? null : ticket.assignedTo;
	const messages = (messagesQuery.data ?? []).filter((m) => mode === "admin" || !m.isInternal);
	const sortedMessages = [...messages].sort((a, b) => {
		const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
		return messageSort === "asc" ? diff : -diff;
	});
	const events = eventsQuery.data ?? [];
	const historyEntries = (0, import_react.useMemo)(() => mergeTicketHistory(events, ticket.sla), [events, ticket.sla]);
	const activities = activitiesQuery.data ?? [];
	const categories = categoriesQuery.data ?? [];
	const employees = employeesQuery.data ?? [];
	const backTo = mode === "admin" ? "/admin/tickets" : "/portal/tickets";
	const slaDue = getTicketSlaDueAt(ticket);
	const slaPolicy = findSlaPolicyForPriority(slaPoliciesQuery.data, ticket.priority);
	const slaTargets = slaPolicy ? slaTargetsFromPolicy(slaPolicy) : {
		response: "—",
		resolution: "—"
	};
	const busy = messageMutation.isPending || updateMutation.isPending || transitionMutation.isPending;
	const isCancelled = ticket.status === "Cancelled";
	const tags = ticket.tags ?? [];
	const internalNotes = messages.filter((m) => m.isInternal).length;
	const workspaceTabs = [
		{
			id: "conversation",
			label: "Conversation",
			icon: MessageSquare
		},
		{
			id: "history",
			label: "History",
			icon: Clock
		},
		{
			id: "notes",
			label: "Notes",
			icon: StickyNote,
			count: internalNotes
		},
		{
			id: "activities",
			label: "Activities",
			icon: Activity
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "overflow-hidden rounded-md border border-border/60 bg-card shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-14 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-7" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold tracking-tight text-foreground",
								children: ticket.subject
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [ticket.number, getTicketProjectLabel(ticket) !== "—" ? ` · ${getTicketProjectLabel(ticket)}` : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: ticket.status }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: ticket.priority }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
										children: getTicketCategoryLabel(ticket)
									}),
									tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "gap-1 rounded-full px-2.5 py-0.5 text-[11px]",
										children: [t, mode === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => runUpdate({ tags: tags.filter((x) => x !== t) }, `Removed tag ${t}`),
											"aria-label": `Remove ${t}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
										}) : null]
									}, t))
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: backTo,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
						})
					}), mode === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						![
							"Resolved",
							"Closed",
							"Cancelled"
						].includes(ticket.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "rounded-md",
							disabled: busy,
							onClick: () => runTransition({ status: "Resolved" }, "Ticket marked resolved — awaiting client approval"),
							children: "Mark resolved"
						}),
						ticket.status === "Closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							className: "rounded-md",
							disabled: busy,
							onClick: () => runTransition({ status: "Reopened" }, "Ticket reopened"),
							children: "Reopen ticket"
						}) : !isCancelled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								className: "rounded-md",
								disabled: busy,
								children: "Close ticket"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Close this ticket?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
								"Add a closing comment. The client will be notified that ",
								ticket.number,
								" has been closed."
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: closeComment,
								onChange: (e) => setCloseComment(e.target.value),
								rows: 3,
								placeholder: "Closing comment (required)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
								disabled: !closeComment.trim(),
								onClick: () => {
									runTransition({
										status: "Closed",
										comment: closeComment.trim()
									}, "Ticket closed");
									setCloseComment("");
								},
								children: "Close ticket"
							})] })
						] })] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "icon",
								className: "rounded-md",
								disabled: busy,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							children: [
								ticket.status !== "Cancelled" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									onClick: () => runTransition({ status: "Cancelled" }, "Ticket cancelled"),
									children: "Cancel ticket"
								}),
								ticket.status === "Closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									onClick: () => runTransition({ status: "Reopened" }, "Ticket reopened"),
									children: "Reopen ticket"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: backTo,
										children: "Back to tickets"
									})
								})
							]
						})] })
					] }) : ticket.status === "Resolved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							className: "rounded-md",
							disabled: busy,
							children: "Mark as closed"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Mark this ticket as closed?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Confirm the issue is resolved. Add a short note for your support team." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: closeComment,
							onChange: (e) => setCloseComment(e.target.value),
							rows: 3,
							placeholder: "Closing comment (required)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							disabled: !closeComment.trim(),
							onClick: () => {
								runTransition({
									status: "Closed",
									comment: closeComment.trim()
								}, "Ticket marked as closed");
								setCloseComment("");
							},
							children: "Mark as closed"
						})] })
					] })] }) : null]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto border-t border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex min-w-max items-center gap-1 px-2",
					children: workspaceTabs.map((tab) => {
						const Icon = tab.icon;
						const active = activeTab === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveTab(tab.id),
							className: cn("inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors", active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
								tab.label,
								tab.count !== void 0 ? ` (${tab.count})` : ""
							]
						}, tab.id);
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-5",
				children: [
					activeTab === "conversation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceCard, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-semibold text-foreground",
								children: "Conversation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-sm text-muted-foreground",
								children: [
									messages.length,
									" ",
									messages.length === 1 ? "message" : "messages"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: messageSort,
									onValueChange: (v) => setMessageSort(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-9 w-[10.5rem] rounded-md text-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "asc",
										children: "Sort: Oldest first"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "desc",
										children: "Sort: Newest first"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "icon",
									className: "size-9 rounded-md",
									"aria-label": "Filter messages",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, { className: "size-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-4 p-5",
							children: messagesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Loading messages…"
							}) : sortedMessages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "No messages yet."
							}) : sortedMessages.map((message) => {
								const author = message.authorId;
								const mine = getTicketUserId(message.authorId) === user.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: cn("rounded-lg border p-4", message.isInternal ? "border-amber-200/80 bg-amber-50/50" : mine ? "border-primary/20 bg-primary/5" : "border-border bg-card"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
													name: fullName(author),
													hue: 42,
													size: 28
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-semibold",
													children: fullName(author)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: "rounded-full text-[10px]",
													children: author.role === "Client" ? "Client" : author.role === "Staff" ? "Support" : "Admin"
												}),
												message.isInternal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 text-xs font-medium text-amber-700",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }), " Internal note"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-auto text-xs text-muted-foreground",
													children: formatDate(message.createdAt, true)
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm leading-relaxed whitespace-pre-wrap text-foreground",
											children: message.body
										}),
										(message.attachments ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 flex flex-wrap gap-2",
											children: (message.attachments ?? []).map((a) => a.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: a.url,
												target: "_blank",
												rel: "noreferrer",
												className: "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs hover:bg-muted/50",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-3" }),
													a.name,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: a.size
													})
												]
											}, a.key ?? a.name) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-3" }),
													a.name,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: a.size
													})
												]
											}, a.name))
										})
									]
								}, message._id);
							})
						}),
						!["Closed", "Cancelled"].includes(ticket.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border p-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-muted/20 p-4",
								children: [
									mode === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
										value: internal ? "note" : "reply",
										onValueChange: (v) => setInternal(v === "note"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
												variant: "compact",
												className: "mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
													value: "reply",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5" }), " Reply to client"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
													value: "note",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, { className: "size-3.5" }), " Internal note"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, { value: "reply" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, { value: "note" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: draft,
										onChange: (e) => setDraft(e.target.value),
										rows: 4,
										className: "border-border bg-card",
										placeholder: internal ? "Visible to support staff only…" : "Write your reply…"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploadField, {
											context: "ticket-attachment",
											ticketId,
											files,
											onChange: setFiles,
											variant: "button"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											className: "rounded-md",
											onClick: () => messageMutation.mutate(),
											disabled: !draft.trim() || busy,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }),
												" ",
												internal ? "Add note" : "Send reply"
											]
										})]
									})
								]
							})
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketHistorySection, {
						entries: historyEntries,
						sla: ticket.sla,
						slaTargets,
						loading: eventsQuery.isLoading
					})] }),
					activeTab === "history" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketHistorySection, {
						entries: historyEntries,
						sla: ticket.sla,
						slaTargets,
						loading: eventsQuery.isLoading
					}),
					activeTab === "notes" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						title: "Internal notes",
						count: internalNotes
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-4 p-5",
						children: messages.filter((m) => m.isInternal).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No internal notes",
							description: "Internal notes are only visible to your support team.",
							icon: StickyNote
						}) : messages.filter((m) => m.isInternal).map((message) => {
							const author = message.authorId;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-lg border border-amber-200/80 bg-amber-50/50 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
											name: fullName(author),
											hue: 42,
											size: 26
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold",
											children: fullName(author)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-auto text-xs text-muted-foreground",
											children: formatDate(message.createdAt, true)
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed whitespace-pre-wrap",
									children: message.body
								})]
							}, message._id);
						})
					})] }),
					activeTab === "activities" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						title: "Activities",
						count: activities.length
					}), activitiesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-5 text-sm text-muted-foreground",
						children: "Loading activities…"
					}) : activities.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "No activities yet",
						description: "Status changes, assignments, and updates will appear here.",
						icon: Activity
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "flex flex-col gap-3 p-5",
						children: activities.map((activity) => {
							const actor = activity.actorId;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: activityDescription(activity)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										getTicketUserLabel(actor),
										" · ",
										formatDate(activity.createdAt, true)
									]
								})] })]
							}, activity._id);
						})
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapsible, {
					open: detailsOpen,
					onOpenChange: setDetailsOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollapsibleTrigger, {
						className: "flex w-full items-center justify-between gap-2 px-5 py-4 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold text-foreground",
							children: "Ticket details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 text-muted-foreground transition-transform", detailsOpen && "rotate-180") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid gap-3 border-t border-border px-5 py-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Client",
								value: `${client ? fullName(client) : getTicketUserLabel(ticket.clientId)}${client?.company ? ` · ${client.company}` : ""}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Project",
								value: getTicketProjectLabel(ticket)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Created",
								value: formatDate(ticket.createdAt, true)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Last updated",
								value: formatDate(ticket.updatedAt, true)
							}),
							slaDue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "SLA due",
								value: formatDate(slaDue, true)
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "SLA status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { state: getTicketSlaState(ticket) }) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Response target",
								value: slaTargets.response
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Resolution target",
								value: slaTargets.resolution
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Assigned agent",
								value: agent ? fullName(agent) : "Unassigned"
							})
						]
					}) })] })
				}), mode === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapsible, {
					open: manageOpen,
					onOpenChange: setManageOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollapsibleTrigger, {
						className: "flex w-full items-center justify-between gap-2 px-5 py-4 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold text-foreground",
							children: "Manage ticket"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 text-muted-foreground transition-transform", manageOpen && "rotate-180") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 border-t border-border px-5 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManageField, {
								label: "Status",
								children: isCancelled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 items-center rounded-md border border-input bg-muted/30 px-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "Cancelled" })
								}) : ticket.status === "Assigned" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 items-center rounded-md border border-input bg-muted/30 px-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "Assigned" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: "",
										onValueChange: (v) => runTransition({ status: v }, `Status changed to ${v}`),
										disabled: busy,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "rounded-md",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Move to…" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
											"In Progress",
											"Resolved",
											"Cancelled"
										].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: s,
											children: s
										}, s)) })]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: ticket.status,
									onValueChange: (v) => runTransition({ status: v }, `Status changed to ${v}`),
									disabled: busy,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "rounded-md",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex items-center gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
												status: ticket.status,
												className: "border-0 bg-transparent px-0 shadow-none"
											})
										}) })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SETTABLE_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: s,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex items-center gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
												status: s,
												className: "border-0 bg-transparent px-0 shadow-none"
											})
										})
									}, s)) })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManageField, {
								label: "Priority",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: ticket.priority,
									onValueChange: (v) => runUpdate({ priority: v }, `Priority changed to ${v}`),
									disabled: busy,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "rounded-md",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: ticket.priority }) })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: PRIORITIES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: p,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: p })
									}, p)) })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManageField, {
								label: "Category",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: typeof ticket.categoryId === "string" ? ticket.categoryId : ticket.categoryId._id,
									onValueChange: (v) => {
										const name = categories.find((c) => c._id === v)?.name ?? v;
										runUpdate({ categoryId: v }, `Category changed to ${name}`);
									},
									disabled: busy,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "rounded-md",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { children: getTicketCategoryLabel(ticket) })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.filter((c) => c.active).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: c._id,
										children: c.name
									}, c._id)) })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManageField, {
								label: "Assigned to",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: getTicketUserId(ticket.assignedTo) ?? "unassigned",
									onValueChange: (v) => {
										const next = v === "unassigned" ? null : v;
										const name = next ? getTicketUserLabel(employees.find((e) => (e.id ?? e._id) === next) ?? next) : "Unassigned";
										runUpdate({ assignedTo: next }, `Assigned to ${name}`);
									},
									disabled: busy,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "rounded-md",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { children: agent ? fullName(agent) : "Unassigned" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "unassigned",
										children: "Unassigned"
									}), employees.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: u.id ?? u._id ?? "",
										children: fullName(u)
									}, u.id ?? u._id))] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManageField, {
								label: "Tags",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-1.5",
									children: [tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "secondary",
										className: "gap-1 rounded-full",
										children: [t, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => runUpdate({ tags: tags.filter((x) => x !== t) }, `Removed tag ${t}`),
											"aria-label": `Remove ${t}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
										})]
									}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										className: "h-8 rounded-md",
										disabled: busy,
										onClick: () => {
											const tag = tags.includes("escalated") ? "vip" : "escalated";
											if (!tags.includes(tag)) runUpdate({ tags: [...tags, tag] }, `Added tag ${tag}`);
										},
										children: "Add tag"
									})]
								})
							})
						]
					}) })] })
				})]
			})]
		})]
	});
}
function WorkspaceCard({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("overflow-hidden rounded-lg border border-border bg-card shadow-sm", className),
		children
	});
}
function CardHeader({ title, count }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-border px-5 py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "text-base font-semibold text-foreground",
			children: [title, count !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1.5 text-muted-foreground",
				children: count
			}) : null]
		})
	});
}
function TicketHistorySection({ entries, sla, slaTargets, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceCard, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			title: "Ticket history",
			count: entries.length
		}),
		sla ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-semibold text-foreground",
					children: ["Current SLA · Cycle ", sla.cycleNumber]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: [
						"Response target ",
						slaTargets.response,
						" · Resolution target ",
						slaTargets.resolution
					]
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid gap-3 text-sm sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaHistoryMetric, {
					label: "Assignment SLA",
					dueAt: sla.assignmentSlaDueAt,
					status: sla.assignmentSlaStatus
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaHistoryMetric, {
					label: "Resolution SLA",
					dueAt: sla.resolutionSlaDueAt,
					status: sla.resolutionSlaStatus
				})]
			})]
		}) : null,
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-5 text-sm text-muted-foreground",
			children: "Loading history…"
		}) : entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No history yet",
			description: "Ticket updates and SLA milestones will appear here.",
			icon: Clock
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
			className: "hover:bg-transparent",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: "Date & time"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: "Type"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: "Action"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: "Performed by"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: "Details"
				})
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-muted-foreground",
				children: formatDate(entry.date, true)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: entry.kind === "sla" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				className: "rounded-full text-[11px] font-semibold",
				children: "SLA"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "secondary",
				className: "rounded-full text-[11px] font-semibold",
				children: "Update"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-medium",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-wrap items-center gap-2",
					children: [entry.action, entry.slaState ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { state: entry.slaState }) : null]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: entry.performer }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: entry.details })
		] }, entry.id)) })] })
	] });
}
function SlaHistoryMetric({ label, dueAt, status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border/60 bg-muted/20 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-1 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { state: mapSlaStatus(status) }), dueAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm text-foreground",
				children: ["Due ", formatDate(dueAt, true)]
			}) : null]
		})]
	});
}
function DetailRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right font-medium text-foreground",
			children: value
		})]
	});
}
function ManageField({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { TicketWorkspace as t };
