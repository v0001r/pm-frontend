import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, d as useAuth, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Paperclip, dt as ArrowLeft, t as X, x as Send } from "../_libs/lucide-react.mjs";
import { c as SLA_MATRIX, f as StatusBadge, h as fullName, m as UserAvatar, o as PriorityBadge, t as EmptyState, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate } from "./store-rjYLW1Ml.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as postTicketMessage, E as getTicketSlaDueAt, O as getTicketUserId, T as getTicketProjectLabel, b as fetchTicketEvents, j as transitionTicket, k as getTicketUserLabel, u as Route$8, w as getTicketCategoryLabel, x as fetchTicketMessages, y as fetchTicket } from "./router-DLFu5c1a.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { t as Badge } from "./badge-sRl3_xpk.mjs";
import { t as Textarea } from "./textarea-BeI_74_b.mjs";
import { t as Separator } from "./separator-DMgOsoGU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.tickets._ticketId-CcNGvbv5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientTicketWorkspace({ ticketId }) {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [draft, setDraft] = (0, import_react.useState)("");
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
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
		queryClient.invalidateQueries({ queryKey: ["ticket-messages", ticketId] });
		queryClient.invalidateQueries({ queryKey: ["ticket-events", ticketId] });
		queryClient.invalidateQueries({ queryKey: ["tickets"] });
	};
	const messageMutation = useMutation({
		mutationFn: () => postTicketMessage(ticketId, draft.trim()),
		onSuccess: () => {
			setDraft("");
			setFiles([]);
			invalidate();
			toast.success("Your reply has been posted.");
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to post reply"))
	});
	const statusMutation = useMutation({
		mutationFn: (payload) => transitionTicket(ticketId, payload),
		onSuccess: () => {
			invalidate();
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update ticket"))
	});
	const updateStatus = (description, payload) => {
		statusMutation.mutate(payload, { onSuccess: () => toast.success(description) });
	};
	if (ticketQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-10 text-center text-sm text-muted-foreground",
		children: "Loading ticket…"
	}) });
	if (ticketQuery.isError || !ticketQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Ticket not found",
		description: "This ticket is unavailable or you do not have access.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/portal/tickets",
				children: "Back to tickets"
			})
		})
	});
	const ticket = ticketQuery.data;
	const messages = messagesQuery.data ?? [];
	const events = eventsQuery.data ?? [];
	const clientId = getTicketUserId(ticket.clientId);
	if (!user || clientId !== user.id) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-10 text-center text-sm text-muted-foreground",
		children: "You do not have access to this ticket."
	}) });
	const client = typeof ticket.clientId === "string" ? null : ticket.clientId;
	const agent = typeof ticket.assignedTo === "string" || !ticket.assignedTo ? null : ticket.assignedTo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/portal/tickets",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: getTicketProjectLabel(ticket)
						}),
						(ticket.tags ?? []).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: tag
						}, tag))
					]
				})
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [ticket.status === "Resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				disabled: statusMutation.isPending,
				onClick: () => updateStatus("Ticket closed", {
					status: "Closed",
					comment: "Closed by client"
				}),
				children: "Close ticket"
			}), ticket.status === "Closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				disabled: statusMutation.isPending,
				onClick: () => updateStatus("Ticket reopened", { status: "Reopened" }),
				children: "Reopen ticket"
			})]
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
							className: cn("rounded-md border p-3", mine ? "border-primary/25 bg-primary-soft" : "bg-surface"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
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
				}), !["Closed"].includes(ticket.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: draft,
							onChange: (event) => setDraft(event.target.value),
							rows: 4,
							placeholder: "Write your reply…"
						}),
						files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: files.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-3" }),
									file.name,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: file.size
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setFiles(files.filter((_, fileIndex) => fileIndex !== index)),
										"aria-label": "Remove attachment",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
									})
								]
							}, file.name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" }),
									"Attach file",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										multiple: true,
										className: "hidden",
										onChange: (event) => {
											const picked = Array.from(event.target.files ?? []).map((file) => ({
												name: file.name,
												size: `${Math.max(1, Math.round(file.size / 1024))} KB`
											}));
											setFiles((previous) => [...previous, ...picked].slice(0, 5));
										}
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => messageMutation.mutate(),
								disabled: !draft.trim() || messageMutation.isPending,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), " Send reply"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "File uploads are stored locally in this demo UI only."
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
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
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
						ticket.dueAt || getTicketSlaDueAt(ticket) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "SLA due",
							value: formatDate(getTicketSlaDueAt(ticket) ?? ticket.dueAt, true)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Response target",
							value: (SLA_MATRIX[ticket.priority] ?? SLA_MATRIX.P3).response
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Resolution target",
							value: (SLA_MATRIX[ticket.priority] ?? SLA_MATRIX.P3).resolution
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Assigned agent",
							value: agent ? fullName(agent) : "Unassigned"
						})
					]
				})
			})
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
function ClientTicket() {
	const { ticketId } = Route$8.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientTicketWorkspace, { ticketId });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Client"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientTicket, {})
});
//#endregion
export { SplitComponent as component };
