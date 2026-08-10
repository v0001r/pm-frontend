import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime, c as Root, o as CollapsibleContent$1, s as CollapsibleTrigger$1 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, d as useAuth, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ClipboardList, A as MessageSquare, F as Lock, G as FileText, L as ListFilter, R as Link2, St as Activity, T as Paperclip, Y as EllipsisVertical, Z as Clock, m as StickyNote, t as X, ut as ChevronDown, vt as ArrowLeft, x as Send } from "../_libs/lucide-react.mjs";
import { c as SETTABLE_STATUSES, f as SlaBadge, g as fullName, h as UserAvatar, l as SLA_MATRIX, o as PriorityBadge, p as StatusBadge, r as PRIORITIES, t as EmptyState } from "./primitives-BneTjl1i.mjs";
import { a as DropdownMenuSeparator, d as formatDate, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./store-CZmg1Lwb.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as Table, A as getTicketUserLabel, D as getTicketSlaDueAt, E as getTicketProjectLabel, J as Select, M as transitionTicket, N as updateTicket, O as getTicketSlaState, Q as SelectValue, S as fetchTicketMessages, T as getTicketCategoryLabel, X as SelectItem, Y as SelectContent, Z as SelectTrigger, _ as activityDescription, b as fetchTicketActivities, et as TableBody, f as Route$16, it as TableRow, j as postTicketMessage, k as getTicketUserId, nt as TableHead, rt as TableHeader, tt as TableCell, x as fetchTicketEvents, y as fetchTicket } from "./router-B2W8Gmeh.mjs";
import { _ as RequireRole, a as AlertDialogCancel, c as AlertDialogFooter, d as AlertDialogTrigger, i as AlertDialogAction, l as AlertDialogHeader, o as AlertDialogContent, r as AlertDialog, s as AlertDialogDescription, u as AlertDialogTitle } from "./guard-BAnzMztv.mjs";
import { t as Badge } from "./badge-sRl3_xpk.mjs";
import { a as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-5bUW-pkO.mjs";
import { t as Textarea } from "./textarea-BeI_74_b.mjs";
import { t as fetchEmployees } from "./users-qW6Jl6p_.mjs";
import { t as Separator } from "./separator-DMgOsoGU.mjs";
import { t as fetchCategories } from "./categories-gqIh7DFz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tickets._ticketId-B7V4VvRe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
		queryClient.invalidateQueries({ queryKey: ["ticket-messages", ticketId] });
		queryClient.invalidateQueries({ queryKey: ["ticket-events", ticketId] });
		queryClient.invalidateQueries({ queryKey: ["ticket-activities", ticketId] });
		queryClient.invalidateQueries({ queryKey: ["admin-tickets"] });
		queryClient.invalidateQueries({ queryKey: ["tickets"] });
	};
	const messageMutation = useMutation({
		mutationFn: () => postTicketMessage(ticketId, draft.trim(), internal),
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
	if (mode === "client" && clientId !== user.id) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
	const activities = activitiesQuery.data ?? [];
	const categories = categoriesQuery.data ?? [];
	const employees = employeesQuery.data ?? [];
	const backTo = mode === "admin" ? "/admin/tickets" : "/portal/tickets";
	const slaDue = getTicketSlaDueAt(ticket);
	const slaTargets = SLA_MATRIX[ticket.priority] ?? SLA_MATRIX.P3;
	const busy = messageMutation.isPending || updateMutation.isPending || transitionMutation.isPending;
	const tags = ticket.tags ?? [];
	const internalNotes = messages.filter((m) => m.isInternal).length;
	const attach = () => {
		const n = files.length + 1;
		setFiles([...files, {
			name: `attachment-${n}.png`,
			size: `${180 + n * 42} KB`
		}]);
	};
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
			id: "linked",
			label: "Linked tickets",
			icon: Link2
		},
		{
			id: "tasks",
			label: "Tasks",
			icon: ClipboardList,
			count: 0
		},
		{
			id: "files",
			label: "Files",
			icon: FileText,
			count: 0
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
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						className: "mt-0.5 shrink-0 rounded-md",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: backTo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular text-xs font-medium text-muted-foreground",
								children: ticket.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-0.5 text-2xl font-bold tracking-tight text-foreground",
								children: ticket.subject
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: mode === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						!["Resolved", "Closed"].includes(ticket.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "rounded-md",
							disabled: busy,
							onClick: () => runTransition({ status: "Resolved" }, "Ticket marked resolved — awaiting client approval"),
							children: "Mark resolved"
						}),
						ticket.status !== "Closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
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
						] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							className: "rounded-md",
							disabled: busy,
							onClick: () => runTransition({ status: "Reopened" }, "Ticket reopened"),
							children: "Reopen ticket"
						}),
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
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [ticket.status === "Resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "rounded-md",
						disabled: busy,
						onClick: () => runTransition({
							status: "Closed",
							comment: "Closed by client"
						}, "Ticket closed"),
						children: "Close ticket"
					}), ticket.status === "Closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						className: "rounded-md",
						disabled: busy,
						onClick: () => runTransition({ status: "Reopened" }, "Ticket reopened"),
						children: "Reopen ticket"
					})] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex min-w-max items-center gap-1",
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
												children: (message.attachments ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
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
										files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 flex flex-wrap gap-2",
											children: files.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-3" }),
													f.name,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: f.size
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setFiles(files.filter((_, j) => j !== i)),
														"aria-label": "Remove attachment",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
													})
												]
											}, f.name))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												size: "sm",
												className: "rounded-md",
												onClick: attach,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" }), " Attach file"]
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
							events,
							loading: eventsQuery.isLoading
						})] }),
						activeTab === "history" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketHistorySection, {
							events,
							loading: eventsQuery.isLoading
						}),
						activeTab === "linked" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderTab, {
							title: "Linked tickets",
							description: "Related and duplicate tickets will appear here."
						}),
						activeTab === "tasks" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderTab, {
							title: "Tasks",
							description: "Sub-tasks and checklists for this ticket will appear here."
						}),
						activeTab === "files" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderTab, {
							title: "Files",
							description: "Attachments uploaded to this ticket will appear here."
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
									children: ticket.status === "Assigned" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			})
		]
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
function TicketHistorySection({ events, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
		title: "Ticket history",
		count: events.length
	}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-5 text-sm text-muted-foreground",
		children: "Loading history…"
	}) : events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No history yet",
		description: "All updates and actions will appear here.",
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
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: events.map((event) => {
		const actor = event.actorId;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-muted-foreground",
				children: formatDate(event.createdAt, true)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-medium",
				children: "Update"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: getTicketUserLabel(actor) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: event.description })
		] }, event._id);
	}) })] })] });
}
function PlaceholderTab({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title,
		description
	}) });
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
function AdminTicketDetail() {
	const { ticketId } = Route$16.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketWorkspace, {
		ticketId,
		mode: "admin"
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTicketDetail, {})
});
//#endregion
export { SplitComponent as component };
