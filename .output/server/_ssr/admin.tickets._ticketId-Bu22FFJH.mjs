import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, d as useAuth, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Lock, T as Paperclip, dt as ArrowLeft, m as StickyNote, t as X, x as Send } from "../_libs/lucide-react.mjs";
import { c as SLA_MATRIX, d as SlaBadge, f as StatusBadge, h as fullName, l as STATUSES, m as UserAvatar, o as PriorityBadge, r as PRIORITIES, t as EmptyState, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate } from "./store-rjYLW1Ml.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as postTicketMessage, D as getTicketSlaState, E as getTicketSlaDueAt, G as SelectItem, K as SelectTrigger, M as updateTicket, O as getTicketUserId, T as getTicketProjectLabel, U as Select, W as SelectContent, b as fetchTicketEvents, j as transitionTicket, k as getTicketUserLabel, p as Route$16, q as SelectValue, w as getTicketCategoryLabel, x as fetchTicketMessages, y as fetchTicket } from "./router-DLFu5c1a.mjs";
import { S as RequireRole, a as AlertDialogCancel, c as AlertDialogFooter, d as AlertDialogTrigger, i as AlertDialogAction, l as AlertDialogHeader, o as AlertDialogContent, r as AlertDialog, s as AlertDialogDescription, u as AlertDialogTitle } from "./guard-Da2hUi3G.mjs";
import { t as Badge } from "./badge-sRl3_xpk.mjs";
import { a as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-5bUW-pkO.mjs";
import { t as Textarea } from "./textarea-BeI_74_b.mjs";
import { n as fetchEmployees } from "./users-CDxzt4hY.mjs";
import { t as Separator } from "./separator-DMgOsoGU.mjs";
import { t as fetchCategories } from "./categories-gqIh7DFz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tickets._ticketId-Bu22FFJH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TicketWorkspace({ ticketId, mode }) {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [draft, setDraft] = (0, import_react.useState)("");
	const [internal, setInternal] = (0, import_react.useState)(false);
	const [closeComment, setCloseComment] = (0, import_react.useState)("");
	const [files, setFiles] = (0, import_react.useState)([]);
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
	if (ticketQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-10 text-center text-sm text-muted-foreground",
		children: "Loading ticket…"
	}) });
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
	if (mode === "client" && clientId !== user.id) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-10 text-center text-sm text-muted-foreground",
		children: "You do not have access to this ticket."
	}) });
	const client = typeof ticket.clientId === "string" ? null : ticket.clientId;
	const agent = typeof ticket.assignedTo === "string" || !ticket.assignedTo ? null : ticket.assignedTo;
	const messages = (messagesQuery.data ?? []).filter((m) => mode === "admin" || !m.isInternal);
	const events = eventsQuery.data ?? [];
	const categories = categoriesQuery.data ?? [];
	const employees = employeesQuery.data ?? [];
	const backTo = mode === "admin" ? "/admin/tickets" : "/portal/tickets";
	const slaDue = getTicketSlaDueAt(ticket);
	const slaTargets = SLA_MATRIX[ticket.priority] ?? SLA_MATRIX.P3;
	const busy = messageMutation.isPending || updateMutation.isPending || transitionMutation.isPending;
	const tags = ticket.tags ?? [];
	const attach = () => {
		const n = files.length + 1;
		setFiles([...files, {
			name: `attachment-${n}.png`,
			size: `${180 + n * 42} KB`
		}]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: backTo,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tabular text-xs font-medium text-muted-foreground",
					children: ticket.number
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold",
					children: ticket.subject
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: ticket.status }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: ticket.priority }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: getTicketCategoryLabel(ticket)
						}),
						tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: t
						}, t))
					]
				})
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: mode === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!["Resolved", "Closed"].includes(ticket.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				disabled: busy,
				onClick: () => runTransition({ status: "Resolved" }, "Ticket marked resolved — awaiting client approval"),
				children: "Mark resolved"
			}), ticket.status !== "Closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
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
				disabled: busy,
				onClick: () => runTransition({ status: "Reopened" }, "Ticket reopened"),
				children: "Reopen ticket"
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [ticket.status === "Resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				disabled: busy,
				onClick: () => runTransition({
					status: "Closed",
					comment: "Closed by client"
				}, "Ticket closed"),
				children: "Close ticket"
			}), ticket.status === "Closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				disabled: busy,
				onClick: () => runTransition({ status: "Reopened" }, "Ticket reopened"),
				children: "Reopen ticket"
			})] })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: "Conversation",
				description: `${messages.length} messages`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-4 p-4",
					children: messagesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading messages…"
					}) : messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No messages yet."
					}) : messages.map((message) => {
						const author = message.authorId;
						const mine = getTicketUserId(message.authorId) === user.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: cn("rounded-md border p-3", message.isInternal ? "border-warning/40 bg-warning/8" : mine ? "border-primary/25 bg-primary-soft" : "bg-surface"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
											name: fullName(author),
											hue: 42,
											size: 26
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: fullName(author)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "text-[10px]",
											children: author.role === "Client" ? "Client" : author.role === "Staff" ? "Support" : "Admin"
										}),
										message.isInternal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-xs font-medium text-warning-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }), " Internal note"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-auto text-xs text-muted-foreground",
											children: formatDate(message.createdAt, true)
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed whitespace-pre-wrap",
									children: message.body
								}),
								(message.attachments ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: (message.attachments ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs",
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
				}), !["Closed", "Cancelled"].includes(ticket.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t p-4",
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" }), " Reply to client"]
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
							placeholder: internal ? "Visible to support staff only…" : "Write your reply…"
						}),
						files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: files.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs",
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
								onClick: attach,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" }), " Attach file"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
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
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Ticket history",
				children: eventsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-4 text-sm text-muted-foreground",
					children: "Loading history…"
				}) : events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-4 text-sm text-muted-foreground",
					children: "No history yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "flex flex-col gap-3 p-4",
					children: events.map((event) => {
						const actor = event.actorId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: event.description }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									getTicketUserLabel(actor),
									" · ",
									formatDate(event.createdAt, true)
								]
							})] })]
						}, event._id);
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Ticket details",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid gap-3 p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Client",
							value: `${client ? fullName(client) : getTicketUserLabel(ticket.clientId)}${client?.company ? ` · ${client.company}` : ""}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Project",
							value: getTicketProjectLabel(ticket)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Created",
							value: formatDate(ticket.createdAt, true)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Last updated",
							value: formatDate(ticket.updatedAt, true)
						}),
						slaDue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "SLA due",
							value: formatDate(slaDue, true)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "SLA status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { state: getTicketSlaState(ticket) }) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Response target",
							value: slaTargets.response
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Resolution target",
							value: slaTargets.resolution
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Assigned agent",
							value: agent ? fullName(agent) : "Unassigned"
						})
					]
				})
			}), mode === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Manage ticket",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: ticket.status,
								onValueChange: (v) => runTransition({ status: v }, `Status changed to ${v}`),
								disabled: busy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s,
									children: s
								}, s)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Priority",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: ticket.priority,
								onValueChange: (v) => runUpdate({ priority: v }, `Priority changed to ${v}`),
								disabled: busy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: PRIORITIES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: p,
									children: p
								}, p)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: typeof ticket.categoryId === "string" ? ticket.categoryId : ticket.categoryId._id,
								onValueChange: (v) => {
									const name = categories.find((c) => c._id === v)?.name ?? v;
									runUpdate({ categoryId: v }, `Category changed to ${name}`);
								},
								disabled: busy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.filter((c) => c.active).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c._id,
									children: c.name
								}, c._id)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Assigned to",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: getTicketUserId(ticket.assignedTo) ?? "unassigned",
								onValueChange: (v) => {
									const next = v === "unassigned" ? null : v;
									const name = next ? getTicketUserLabel(employees.find((e) => (e.id ?? e._id) === next) ?? next) : "Unassigned";
									runUpdate({ assignedTo: next }, `Assigned to ${name}`);
								},
								disabled: busy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "unassigned",
									children: "Unassigned"
								}), employees.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: u.id ?? u._id ?? "",
									children: fullName(u)
								}, u.id ?? u._id))] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tags",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1.5",
								children: [tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "gap-1",
									children: [t, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => runUpdate({ tags: tags.filter((x) => x !== t) }, `Removed tag ${t}`),
										"aria-label": `Remove ${t}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
									})]
								}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
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
				})
			})]
		})]
	})] });
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right font-medium",
			children: value
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium text-muted-foreground",
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
