import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as MessageSquare, C as Plus, G as Ellipsis, K as Download, U as Eye, l as Upload } from "../_libs/lucide-react.mjs";
import { d as SlaBadge, f as StatusBadge, h as fullName, l as STATUSES, o as PriorityBadge, p as TableSkeleton, r as PRIORITIES, t as EmptyState } from "./primitives-rWqtcPGP.mjs";
import { a as formatDate } from "./store-rjYLW1Ml.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as TableRow, C as fetchTicketsPage, D as getTicketSlaState, E as getTicketSlaDueAt, F as DataTableIconButton, I as DataTablePagination, J as Table, O as getTicketUserId, P as DataTableActions, Q as TableHeader, T as getTicketProjectLabel, V as PrimaryCell, X as TableCell, Y as TableBody, Z as TableHead, k as getTicketUserLabel, m as Route$17, w as getTicketCategoryLabel, z as EntityCell } from "./router-DLFu5c1a.mjs";
import { S as RequireRole, w as TooltipProvider } from "./guard-Da2hUi3G.mjs";
import { a as ListingSearchRow, i as ListingPageHeader, n as ListingFilterSelect, o as useListingFilters, r as ListingPage, t as ListingFilterField } from "./listing-page-DNRqAcLr.mjs";
import { n as fetchEmployees } from "./users-CDxzt4hY.mjs";
import { t as fetchCategories } from "./categories-gqIh7DFz.mjs";
import { t as Checkbox } from "./checkbox-D4rWrmpD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tickets.index-QJevRhK-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 8;
var ANY = "all";
var FILTER_DEFAULTS = {
	status: ANY,
	priority: ANY,
	category: ANY,
	client: ANY,
	agent: ANY,
	sla: ANY,
	sort: "updated"
};
function TicketsPage() {
	const initial = Route$17.useSearch();
	const [q, setQ] = (0, import_react.useState)("");
	const [debouncedQ, setDebouncedQ] = (0, import_react.useState)("");
	const { applied: filters, draft, patchDraft, apply, clear, open, setOpen, activeCount } = useListingFilters(FILTER_DEFAULTS, {
		status: initial.status ?? ANY,
		priority: initial.priority ?? ANY,
		client: initial.client ?? ANY,
		agent: initial.agent ?? ANY,
		sla: initial.sla ?? ANY
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [selected, setSelected] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setDebouncedQ(q.trim()), 300);
		return () => window.clearTimeout(timer);
	}, [q]);
	(0, import_react.useEffect)(() => setPage(1), [
		debouncedQ,
		filters.status,
		filters.priority,
		filters.category,
		filters.client,
		filters.agent,
		filters.sla,
		filters.sort
	]);
	const sortParams = (0, import_react.useMemo)(() => {
		switch (filters.sort) {
			case "created": return {
				sortBy: "createdAt",
				sortOrder: "desc"
			};
			case "priority": return {
				sortBy: "priority",
				sortOrder: "asc"
			};
			case "due": return {
				sortBy: "dueAt",
				sortOrder: "asc"
			};
			default: return {
				sortBy: "lastActivityAt",
				sortOrder: "desc"
			};
		}
	}, [filters.sort]);
	const categoriesQuery = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories
	});
	const employeesQuery = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees
	});
	const ticketsQuery = useQuery({
		queryKey: ["admin-tickets", {
			page,
			debouncedQ,
			filters,
			sortParams,
			projectId: initial.projectId
		}],
		queryFn: () => fetchTicketsPage({
			page,
			limit: PAGE_SIZE,
			...debouncedQ && { search: debouncedQ },
			...initial.projectId && { projectId: initial.projectId },
			...filters.status !== ANY && { status: filters.status },
			...filters.priority !== ANY && { priority: filters.priority },
			...filters.category !== ANY && { categoryId: filters.category },
			...filters.client !== ANY && { clientId: filters.client },
			...filters.agent === "unassigned" ? { unassigned: true } : filters.agent !== ANY ? { assignedTo: filters.agent } : {},
			...sortParams
		})
	});
	(0, import_react.useEffect)(() => {
		if (ticketsQuery.isError) toast.error(getApiErrorMessage(ticketsQuery.error, "Failed to load tickets"));
	}, [ticketsQuery.isError, ticketsQuery.error]);
	const categories = categoriesQuery.data ?? [];
	const employees = employeesQuery.data ?? [];
	const meta = ticketsQuery.data?.meta ?? {
		page: 1,
		limit: PAGE_SIZE,
		total: 0,
		totalPages: 1
	};
	const rows = (0, import_react.useMemo)(() => {
		const items = ticketsQuery.data?.items ?? [];
		if (filters.sla === ANY) return items;
		return items.filter((ticket) => getTicketSlaState(ticket) === filters.sla);
	}, [ticketsQuery.data?.items, filters.sla]);
	const clientOptions = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const ticket of ticketsQuery.data?.items ?? []) {
			const id = getTicketUserId(ticket.clientId);
			if (id) map.set(id, getTicketUserLabel(ticket.clientId));
		}
		return [...map.entries()];
	}, [ticketsQuery.data?.items]);
	const pages = Math.max(1, meta.totalPages);
	const current = Math.min(page, pages);
	const clearFilters = () => {
		setQ("");
		setDebouncedQ("");
		clear();
		setPage(1);
	};
	const exportCsv = () => {
		const header = "Ticket,Subject,Client,Project,Category,Priority,Status,Agent,Created,Due\n";
		const body = rows.map((ticket) => {
			const due = getTicketSlaDueAt(ticket);
			return [
				ticket.number,
				`"${ticket.subject}"`,
				getTicketUserLabel(ticket.clientId),
				getTicketProjectLabel(ticket),
				getTicketCategoryLabel(ticket),
				ticket.priority,
				ticket.status,
				getTicketUserLabel(ticket.assignedTo),
				formatDate(ticket.createdAt),
				due ? formatDate(due) : ""
			].join(",");
		}).join("\n");
		const url = URL.createObjectURL(new Blob([header + body], { type: "text/csv" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = "tickets.csv";
		link.click();
		URL.revokeObjectURL(url);
		toast.success(`Exported ${rows.length} tickets to CSV.`);
	};
	const allOnPageSelected = rows.length > 0 && rows.every((ticket) => selected.includes(ticket._id));
	const toggleRow = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
	const togglePage = () => setSelected((prev) => allOnPageSelected ? prev.filter((id) => !rows.some((ticket) => ticket._id === id)) : [.../* @__PURE__ */ new Set([...prev, ...rows.map((ticket) => ticket._id)])]);
	const loading = ticketsQuery.isLoading || ticketsQuery.isFetching;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 200,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListingPage, {
			header: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPageHeader, {
				title: "Tickets",
				description: `${meta.total} tickets in the queue.`,
				breadcrumbs: [{
					label: "Admin",
					to: "/admin"
				}, { label: "Tickets" }],
				exportAction: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "rounded-xl",
					onClick: () => toast.info("Import is available to super admins via Settings."),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), " Import"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "rounded-xl",
					onClick: exportCsv,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export CSV"]
				})] }),
				addAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					className: "rounded-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/tickets/new",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Create ticket"]
					})
				})
			}),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingSearchRow, {
					value: q,
					onChange: setQ,
					placeholder: "Search ticket ID, subject or client…",
					filterOpen: open,
					onFilterOpenChange: setOpen,
					activeFilterCount: activeCount,
					onFilterApply: apply,
					onFilterClear: clearFilters,
					filterContent: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
							label: "Status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
								value: draft.status,
								onChange: (value) => patchDraft({ status: value }),
								options: STATUSES.map((s) => [s, s]),
								allLabel: "All statuses"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
							label: "Priority",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
								value: draft.priority,
								onChange: (value) => patchDraft({ priority: value }),
								options: PRIORITIES.map((p) => [p, p]),
								allLabel: "All priorities"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
							label: "Category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
								value: draft.category,
								onChange: (value) => patchDraft({ category: value }),
								options: categories.map((c) => [c._id, c.name]),
								allLabel: "All categories"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
							label: "Client",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
								value: draft.client,
								onChange: (value) => patchDraft({ client: value }),
								options: clientOptions,
								allLabel: "All clients"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
							label: "Agent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
								value: draft.agent,
								onChange: (value) => patchDraft({ agent: value }),
								options: [["unassigned", "Unassigned"]].concat(employees.map((u) => [u.id ?? u._id ?? "", fullName(u)])),
								allLabel: "All agents"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
							label: "SLA",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
								value: draft.sla,
								onChange: (value) => patchDraft({ sla: value }),
								options: [
									["On Track", "On Track"],
									["Approaching", "Approaching"],
									["Breached", "Breached"],
									["Met", "Met"]
								],
								allLabel: "All SLA states"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterField, {
							label: "Sort by",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingFilterSelect, {
								value: draft.sort,
								onChange: (value) => patchDraft({ sort: value }),
								allValue: "updated",
								allLabel: "Last updated",
								options: [
									["created", "Created date"],
									["priority", "Priority"],
									["due", "SLA due date"]
								]
							})
						})
					] })
				}),
				selected.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border/60 bg-primary/5 px-5 py-2 text-[13px] font-medium text-primary",
					children: [selected.length, " selected"]
				}) : null,
				loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
					rows: 8,
					cols: 10
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden max-h-[70vh] overflow-auto lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						className: "min-w-5xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							className: "sticky top-0 z-10 backdrop-blur-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								className: "hover:bg-transparent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "w-12",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: allOnPageSelected,
										onCheckedChange: togglePage,
										"aria-label": "Select all rows on this page"
									})
								}), [
									"Ticket",
									"Client",
									"Project",
									"Priority",
									"Status",
									"Assigned to",
									"Created",
									"Updated",
									"SLA",
									"Actions"
								].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: h === "Actions" ? "text-right" : "whitespace-nowrap",
									children: h
								}, h))]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((ticket, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketRow, {
							ticket,
							index: i,
							selected: selected.includes(ticket._id),
							onToggle: () => toggleRow(ticket._id)
						}, ticket._id)) })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y border-t lg:hidden",
					children: rows.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/tickets/$ticketId",
						params: { ticketId: ticket._id },
						className: "block p-4 transition-colors hover:bg-hover",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: ticket.subject
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tabular text-xs text-muted-foreground",
									children: [
										ticket.number,
										" · ",
										getTicketCategoryLabel(ticket)
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: ticket.status })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: ticket.priority }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { state: getTicketSlaState(ticket) })]
						})]
					}, ticket._id))
				})] }),
				!loading && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No tickets match these filters",
					description: "Try a different search term, or reset the filters to see the full queue.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: clearFilters,
						children: "Reset filters"
					}),
					secondaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: exportCsv,
						children: "Export current view"
					})
				}),
				!loading && rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTablePagination, {
					page: current,
					limit: PAGE_SIZE,
					total: meta.total,
					totalPages: pages,
					entityLabel: "tickets",
					onPageChange: setPage
				})
			]
		})
	});
}
function TicketRow({ ticket, index, selected, onToggle }) {
	const client = ticket.clientId;
	const agent = ticket.assignedTo;
	const due = getTicketSlaDueAt(ticket);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
		className: cn(selected && "bg-primary/5"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				checked: selected,
				onCheckedChange: onToggle,
				"aria-label": `Select ticket ${ticket.number}`
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "max-w-72",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryCell, {
					id: ticket.number,
					title: ticket.subject,
					to: "/admin/tickets/$ticketId",
					params: { ticketId: ticket._id }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
				name: getTicketUserLabel(client),
				subtitle: client?.email ?? "",
				hue: 42
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "whitespace-nowrap",
				children: getTicketProjectLabel(ticket)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: ticket.priority }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: ticket.status }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "whitespace-nowrap",
				children: agent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCell, {
					name: getTicketUserLabel(agent),
					hue: 155
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "Unassigned"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "whitespace-nowrap text-muted-foreground",
				children: formatDate(ticket.createdAt)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "whitespace-nowrap text-muted-foreground",
				children: formatDate(ticket.updatedAt)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
				className: "whitespace-nowrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBadge, { state: getTicketSlaState(ticket) }), due ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs text-muted-foreground",
					children: formatDate(due)
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DataTableActions, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
					label: "View ticket",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/tickets/$ticketId",
						params: { ticketId: ticket._id },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
					label: "Reply",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/tickets/$ticketId",
						params: { ticketId: ticket._id },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableIconButton, {
					label: "More",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
				})
			] }) })
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketsPage, {})
});
//#endregion
export { SplitComponent as component };
