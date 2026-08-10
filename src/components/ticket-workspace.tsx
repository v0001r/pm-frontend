import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Activity,
  ArrowLeft,
  ChevronDown,
  ClipboardList,
  Clock,
  FileText,
  Link2,
  ListFilter,
  Lock,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Send,
  StickyNote,
  Ticket,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState, PriorityBadge, SlaBadge, StatusBadge, UserAvatar } from "@/components/primitives";
import { getApiErrorMessage } from "@/lib/api";
import { fetchCategories } from "@/lib/categories";
import { formatDate } from "@/lib/store";
import { fetchEmployees } from "@/lib/users";
import {
  activityDescription,
  fetchTicket,
  fetchTicketActivities,
  fetchTicketEvents,
  fetchTicketMessages,
  getTicketCategoryLabel,
  getTicketProjectLabel,
  getTicketSlaDueAt,
  getTicketSlaState,
  getTicketUserId,
  getTicketUserLabel,
  postTicketMessage,
  transitionTicket,
  updateTicket,
} from "@/lib/tickets";
import { PRIORITIES, SLA_MATRIX, SETTABLE_STATUSES, fullName, type Priority, type TicketStatus, type TicketUserRef } from "@/lib/types";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

type WorkspaceTab = "conversation" | "history" | "linked" | "tasks" | "files" | "notes" | "activities";

export function TicketWorkspace({ ticketId, mode }: { ticketId: string; mode: "admin" | "client" }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("conversation");
  const [draft, setDraft] = useState("");
  const [internal, setInternal] = useState(false);
  const [closeComment, setCloseComment] = useState("");
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [messageSort, setMessageSort] = useState<"asc" | "desc">("asc");
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [manageOpen, setManageOpen] = useState(true);

  const ticketQuery = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => fetchTicket(ticketId),
  });

  const messagesQuery = useQuery({
    queryKey: ["ticket-messages", ticketId],
    queryFn: () => fetchTicketMessages(ticketId),
    enabled: !!ticketQuery.data,
  });

  const eventsQuery = useQuery({
    queryKey: ["ticket-events", ticketId],
    queryFn: () => fetchTicketEvents(ticketId),
    enabled: !!ticketQuery.data,
  });

  const activitiesQuery = useQuery({
    queryKey: ["ticket-activities", ticketId],
    queryFn: () => fetchTicketActivities(ticketId),
    enabled: !!ticketQuery.data && activeTab === "activities",
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: mode === "admin",
  });

  const employeesQuery = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    enabled: mode === "admin",
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
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to post message")),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Parameters<typeof updateTicket>[1]) => updateTicket(ticketId, payload),
    onSuccess: () => {
      invalidate();
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update ticket")),
  });

  const transitionMutation = useMutation({
    mutationFn: (payload: Parameters<typeof transitionTicket>[1]) => transitionTicket(ticketId, payload),
    onSuccess: () => {
      invalidate();
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update status")),
  });

  const runUpdate = (payload: Parameters<typeof updateTicket>[1], description: string) => {
    updateMutation.mutate(payload, { onSuccess: () => toast.success(description) });
  };

  const runTransition = (payload: Parameters<typeof transitionTicket>[1], description: string) => {
    transitionMutation.mutate(payload, { onSuccess: () => toast.success(description) });
  };

  if (ticketQuery.isLoading) {
    return (
      <div className="rounded-lg border bg-card p-10 text-center text-sm text-muted-foreground">Loading ticket…</div>
    );
  }

  if (ticketQuery.isError || !ticketQuery.data || !user) {
    return (
      <EmptyState
        title="Ticket not found"
        description="This ticket is unavailable or you do not have access."
        action={
          <Button size="sm" variant="outline" asChild>
            <Link to={mode === "admin" ? "/admin/tickets" : "/portal/tickets"}>Back to tickets</Link>
          </Button>
        }
      />
    );
  }

  const ticket = ticketQuery.data;
  const clientId = getTicketUserId(ticket.clientId);
  const ticketCustomerId =
    typeof ticket.customerId === "string" ? ticket.customerId : ticket.customerId?._id ?? null;

  if (
    mode === "client" &&
    user &&
    clientId !== user.id &&
    (!user.customerId || ticketCustomerId !== user.customerId)
  ) {
    return (
      <div className="rounded-lg border bg-card p-10 text-center text-sm text-muted-foreground">
        You do not have access to this ticket.
      </div>
    );
  }

  const client = typeof ticket.clientId === "string" ? null : (ticket.clientId as TicketUserRef);
  const agent = typeof ticket.assignedTo === "string" || !ticket.assignedTo ? null : (ticket.assignedTo as TicketUserRef);
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
    setFiles([...files, { name: `attachment-${n}.png`, size: `${180 + n * 42} KB` }]);
  };

  const workspaceTabs: { id: WorkspaceTab; label: string; icon: typeof MessageSquare; count?: number }[] = [
    { id: "conversation", label: "Conversation", icon: MessageSquare },
    { id: "history", label: "History", icon: Clock },
    { id: "linked", label: "Linked tickets", icon: Link2 },
    { id: "tasks", label: "Tasks", icon: ClipboardList, count: 0 },
    { id: "files", label: "Files", icon: FileText, count: 0 },
    { id: "notes", label: "Notes", icon: StickyNote, count: internalNotes },
    { id: "activities", label: "Activities", icon: Activity },
  ];

  return (
    <div className="flex flex-col gap-5">
      <section className="overflow-hidden rounded-md border border-border/60 bg-card shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 p-5">
          <div className="flex min-w-0 items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <Ticket className="size-7" />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{ticket.subject}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {ticket.number}
                {getTicketProjectLabel(ticket) !== "—" ? ` · ${getTicketProjectLabel(ticket)}` : ""}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge status={ticket.status} />
                <PriorityBadge priority={ticket.priority} />
                <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
                  {getTicketCategoryLabel(ticket)}
                </Badge>
                {tags.map((t) => (
                  <Badge key={t} variant="outline" className="gap-1 rounded-full px-2.5 py-0.5 text-[11px]">
                    {t}
                    {mode === "admin" ? (
                      <button
                        type="button"
                        onClick={() => runUpdate({ tags: tags.filter((x) => x !== t) }, `Removed tag ${t}`)}
                        aria-label={`Remove ${t}`}
                      >
                        <X className="size-3" />
                      </button>
                    ) : null}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to={backTo}>
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>
            {mode === "admin" ? (
              <>
                {!["Resolved", "Closed"].includes(ticket.status) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-md"
                    disabled={busy}
                    onClick={() => runTransition({ status: "Resolved" }, "Ticket marked resolved — awaiting client approval")}
                  >
                    Mark resolved
                  </Button>
                )}
                {ticket.status !== "Closed" ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" className="rounded-md" disabled={busy}>
                        Close ticket
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Close this ticket?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Add a closing comment. The client will be notified that {ticket.number} has been closed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <Textarea
                        value={closeComment}
                        onChange={(e) => setCloseComment(e.target.value)}
                        rows={3}
                        placeholder="Closing comment (required)"
                      />
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={!closeComment.trim()}
                          onClick={() => {
                            runTransition({ status: "Closed", comment: closeComment.trim() }, "Ticket closed");
                            setCloseComment("");
                          }}
                        >
                          Close ticket
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-md"
                    disabled={busy}
                    onClick={() => runTransition({ status: "Reopened" }, "Ticket reopened")}
                  >
                    Reopen ticket
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-md" disabled={busy}>
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {ticket.status !== "Cancelled" && (
                      <DropdownMenuItem onClick={() => runTransition({ status: "Cancelled" }, "Ticket cancelled")}>
                        Cancel ticket
                      </DropdownMenuItem>
                    )}
                    {ticket.status === "Closed" && (
                      <DropdownMenuItem onClick={() => runTransition({ status: "Reopened" }, "Ticket reopened")}>
                        Reopen ticket
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={backTo}>Back to tickets</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              ticket.status === "Resolved" ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" className="rounded-md" disabled={busy}>
                      Mark as closed
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Mark this ticket as closed?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Confirm the issue is resolved. Add a short note for your support team.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Textarea
                      value={closeComment}
                      onChange={(e) => setCloseComment(e.target.value)}
                      rows={3}
                      placeholder="Closing comment (required)"
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={!closeComment.trim()}
                        onClick={() => {
                          runTransition(
                            { status: "Closed", comment: closeComment.trim() },
                            "Ticket marked as closed",
                          );
                          setCloseComment("");
                        }}
                      >
                        Mark as closed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : null
            )}
          </div>
        </div>

        <div className="overflow-x-auto border-t border-border/60">
          <nav className="flex min-w-max items-center gap-1 px-2">
            {workspaceTabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {tab.label}
                  {tab.count !== undefined ? ` (${tab.count})` : ""}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Main column */}
        <div className="flex min-w-0 flex-col gap-5">
          {activeTab === "conversation" && (
            <>
              <WorkspaceCard>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Conversation</h2>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {messages.length} {messages.length === 1 ? "message" : "messages"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={messageSort} onValueChange={(v) => setMessageSort(v as "asc" | "desc")}>
                      <SelectTrigger className="h-9 w-[10.5rem] rounded-md text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Sort: Oldest first</SelectItem>
                        <SelectItem value="desc">Sort: Newest first</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="size-9 rounded-md" aria-label="Filter messages">
                      <ListFilter className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-4 p-5">
                  {messagesQuery.isLoading ? (
                    <p className="text-sm text-muted-foreground">Loading messages…</p>
                  ) : sortedMessages.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No messages yet.</p>
                  ) : (
                    sortedMessages.map((message) => {
                      const author = message.authorId as TicketUserRef;
                      const authorId = getTicketUserId(message.authorId);
                      const mine = authorId === user.id;
                      return (
                        <article
                          key={message._id}
                          className={cn(
                            "rounded-lg border p-4",
                            message.isInternal
                              ? "border-amber-200/80 bg-amber-50/50"
                              : mine
                                ? "border-primary/20 bg-primary/5"
                                : "border-border bg-card",
                          )}
                        >
                          <header className="flex flex-wrap items-center gap-2">
                            <UserAvatar name={fullName(author)} hue={42} size={28} />
                            <span className="text-sm font-semibold">{fullName(author)}</span>
                            <Badge variant="outline" className="rounded-full text-[10px]">
                              {author.role === "Client" ? "Client" : author.role === "Staff" ? "Support" : "Admin"}
                            </Badge>
                            {message.isInternal && (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
                                <Lock className="size-3" /> Internal note
                              </span>
                            )}
                            <span className="ml-auto text-xs text-muted-foreground">
                              {formatDate(message.createdAt, true)}
                            </span>
                          </header>
                          <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-foreground">{message.body}</p>
                          {(message.attachments ?? []).length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {(message.attachments ?? []).map((a) => (
                                <span
                                  key={a.name}
                                  className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs"
                                >
                                  <Paperclip className="size-3" />
                                  {a.name}
                                  <span className="text-muted-foreground">{a.size}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </article>
                      );
                    })
                  )}
                </div>

                {!["Closed", "Cancelled"].includes(ticket.status) && (
                  <div className="border-t border-border p-5">
                    <div className="rounded-lg border border-border bg-muted/20 p-4">
                      {mode === "admin" && (
                        <Tabs value={internal ? "note" : "reply"} onValueChange={(v) => setInternal(v === "note")}>
                          <TabsList variant="compact" className="mb-3">
                            <TabsTrigger value="reply">
                              <MessageSquare className="size-3.5" /> Reply to client
                            </TabsTrigger>
                            <TabsTrigger value="note">
                              <StickyNote className="size-3.5" /> Internal note
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="reply" />
                          <TabsContent value="note" />
                        </Tabs>
                      )}
                      <Textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        rows={4}
                        className="border-border bg-card"
                        placeholder={internal ? "Visible to support staff only…" : "Write your reply…"}
                      />
                      {files.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {files.map((f, i) => (
                            <span
                              key={f.name}
                              className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs"
                            >
                              <Paperclip className="size-3" />
                              {f.name}
                              <span className="text-muted-foreground">{f.size}</span>
                              <button
                                type="button"
                                onClick={() => setFiles(files.filter((_, j) => j !== i))}
                                aria-label="Remove attachment"
                              >
                                <X className="size-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-3 flex items-center justify-between">
                        <Button variant="outline" size="sm" className="rounded-md" onClick={attach}>
                          <Paperclip className="size-4" /> Attach file
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-md"
                          onClick={() => messageMutation.mutate()}
                          disabled={!draft.trim() || busy}
                        >
                          <Send className="size-4" /> {internal ? "Add note" : "Send reply"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </WorkspaceCard>

              <TicketHistorySection events={events} loading={eventsQuery.isLoading} />
            </>
          )}

          {activeTab === "history" && <TicketHistorySection events={events} loading={eventsQuery.isLoading} />}

          {activeTab === "linked" && (
            <PlaceholderTab title="Linked tickets" description="Related and duplicate tickets will appear here." />
          )}

          {activeTab === "tasks" && (
            <PlaceholderTab title="Tasks" description="Sub-tasks and checklists for this ticket will appear here." />
          )}

          {activeTab === "files" && (
            <PlaceholderTab title="Files" description="Attachments uploaded to this ticket will appear here." />
          )}

          {activeTab === "notes" && (
            <WorkspaceCard>
              <CardHeader title="Internal notes" count={internalNotes} />
              <div className="flex flex-col gap-4 p-5">
                {messages.filter((m) => m.isInternal).length === 0 ? (
                  <EmptyState
                    title="No internal notes"
                    description="Internal notes are only visible to your support team."
                    icon={StickyNote}
                  />
                ) : (
                  messages
                    .filter((m) => m.isInternal)
                    .map((message) => {
                      const author = message.authorId as TicketUserRef;
                      return (
                        <article key={message._id} className="rounded-lg border border-amber-200/80 bg-amber-50/50 p-4">
                          <header className="flex items-center gap-2">
                            <UserAvatar name={fullName(author)} hue={42} size={26} />
                            <span className="text-sm font-semibold">{fullName(author)}</span>
                            <span className="ml-auto text-xs text-muted-foreground">
                              {formatDate(message.createdAt, true)}
                            </span>
                          </header>
                          <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">{message.body}</p>
                        </article>
                      );
                    })
                )}
              </div>
            </WorkspaceCard>
          )}

          {activeTab === "activities" && (
            <WorkspaceCard>
              <CardHeader title="Activities" count={activities.length} />
              {activitiesQuery.isLoading ? (
                <p className="p-5 text-sm text-muted-foreground">Loading activities…</p>
              ) : activities.length === 0 ? (
                <EmptyState
                  title="No activities yet"
                  description="Status changes, assignments, and updates will appear here."
                  icon={Activity}
                />
              ) : (
                <ol className="flex flex-col gap-3 p-5">
                  {activities.map((activity) => {
                    const actor = activity.actorId as TicketUserRef;
                    return (
                      <li key={activity._id} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        <div>
                          <p className="font-medium">{activityDescription(activity)}</p>
                          <p className="text-xs text-muted-foreground">
                            {getTicketUserLabel(actor)} · {formatDate(activity.createdAt, true)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </WorkspaceCard>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
            <WorkspaceCard>
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 px-5 py-4 text-left">
                <h2 className="text-base font-semibold text-foreground">Ticket details</h2>
                <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", detailsOpen && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <dl className="grid gap-3 border-t border-border px-5 py-4 text-sm">
                  <DetailRow
                    label="Client"
                    value={`${client ? fullName(client) : getTicketUserLabel(ticket.clientId)}${client?.company ? ` · ${client.company}` : ""}`}
                  />
                  <DetailRow label="Project" value={getTicketProjectLabel(ticket)} />
                  <DetailRow label="Created" value={formatDate(ticket.createdAt, true)} />
                  <DetailRow label="Last updated" value={formatDate(ticket.updatedAt, true)} />
                  {slaDue ? <DetailRow label="SLA due" value={formatDate(slaDue, true)} /> : null}
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">SLA status</dt>
                    <dd>
                      <SlaBadge state={getTicketSlaState(ticket)} />
                    </dd>
                  </div>
                  <Separator />
                  <DetailRow label="Response target" value={slaTargets.response} />
                  <DetailRow label="Resolution target" value={slaTargets.resolution} />
                  <Separator />
                  <DetailRow label="Assigned agent" value={agent ? fullName(agent) : "Unassigned"} />
                </dl>
              </CollapsibleContent>
            </WorkspaceCard>
          </Collapsible>

          {mode === "admin" && (
            <Collapsible open={manageOpen} onOpenChange={setManageOpen}>
              <WorkspaceCard>
                <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 px-5 py-4 text-left">
                  <h2 className="text-base font-semibold text-foreground">Manage ticket</h2>
                  <ChevronDown
                    className={cn("size-4 text-muted-foreground transition-transform", manageOpen && "rotate-180")}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid gap-4 border-t border-border px-5 py-4">
                    <ManageField label="Status">
                      {ticket.status === "Assigned" ? (
                        <div className="grid gap-2">
                          <div className="flex h-10 items-center rounded-md border border-input bg-muted/30 px-3">
                            <StatusBadge status="Assigned" />
                          </div>
                          <Select
                            value=""
                            onValueChange={(v) => runTransition({ status: v as TicketStatus }, `Status changed to ${v}`)}
                            disabled={busy}
                          >
                            <SelectTrigger className="rounded-md">
                              <SelectValue placeholder="Move to…" />
                            </SelectTrigger>
                            <SelectContent>
                              {(["In Progress", "Resolved", "Cancelled"] as TicketStatus[]).map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <Select
                          value={ticket.status}
                          onValueChange={(v) => runTransition({ status: v as TicketStatus }, `Status changed to ${v}`)}
                          disabled={busy}
                        >
                          <SelectTrigger className="rounded-md">
                            <SelectValue>
                              <span className="flex items-center gap-2">
                                <StatusBadge status={ticket.status} className="border-0 bg-transparent px-0 shadow-none" />
                              </span>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {SETTABLE_STATUSES.map((s) => (
                              <SelectItem key={s} value={s}>
                                <span className="flex items-center gap-2">
                                  <StatusBadge status={s} className="border-0 bg-transparent px-0 shadow-none" />
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </ManageField>

                    <ManageField label="Priority">
                      <Select
                        value={ticket.priority}
                        onValueChange={(v) => runUpdate({ priority: v as Priority }, `Priority changed to ${v}`)}
                        disabled={busy}
                      >
                        <SelectTrigger className="rounded-md">
                          <SelectValue>
                            <PriorityBadge priority={ticket.priority} />
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {PRIORITIES.map((p) => (
                            <SelectItem key={p} value={p}>
                              <PriorityBadge priority={p} />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </ManageField>

                    <ManageField label="Category">
                      <Select
                        value={typeof ticket.categoryId === "string" ? ticket.categoryId : ticket.categoryId._id}
                        onValueChange={(v) => {
                          const name = categories.find((c) => c._id === v)?.name ?? v;
                          runUpdate({ categoryId: v }, `Category changed to ${name}`);
                        }}
                        disabled={busy}
                      >
                        <SelectTrigger className="rounded-md">
                          <SelectValue>{getTicketCategoryLabel(ticket)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {categories
                            .filter((c) => c.active)
                            .map((c) => (
                              <SelectItem key={c._id} value={c._id}>
                                {c.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </ManageField>

                    <ManageField label="Assigned to">
                      <Select
                        value={getTicketUserId(ticket.assignedTo) ?? "unassigned"}
                        onValueChange={(v) => {
                          const next = v === "unassigned" ? null : v;
                          const name = next
                            ? getTicketUserLabel(employees.find((e) => (e.id ?? e._id) === next) ?? next)
                            : "Unassigned";
                          runUpdate({ assignedTo: next }, `Assigned to ${name}`);
                        }}
                        disabled={busy}
                      >
                        <SelectTrigger className="rounded-md">
                          <SelectValue>{agent ? fullName(agent) : "Unassigned"}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {employees.map((u) => (
                            <SelectItem key={u.id ?? u._id} value={u.id ?? u._id ?? ""}>
                              {fullName(u)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </ManageField>

                    <ManageField label="Tags">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {tags.map((t) => (
                          <Badge key={t} variant="secondary" className="gap-1 rounded-full">
                            {t}
                            <button
                              type="button"
                              onClick={() => runUpdate({ tags: tags.filter((x) => x !== t) }, `Removed tag ${t}`)}
                              aria-label={`Remove ${t}`}
                            >
                              <X className="size-3" />
                            </button>
                          </Badge>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-md"
                          disabled={busy}
                          onClick={() => {
                            const tag = tags.includes("escalated") ? "vip" : "escalated";
                            if (!tags.includes(tag)) runUpdate({ tags: [...tags, tag] }, `Added tag ${tag}`);
                          }}
                        >
                          Add tag
                        </Button>
                      </div>
                    </ManageField>
                  </div>
                </CollapsibleContent>
              </WorkspaceCard>
            </Collapsible>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkspaceCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("overflow-hidden rounded-lg border border-border bg-card shadow-sm", className)}>{children}</section>;
}

function CardHeader({ title, count }: { title: string; count?: number }) {
  return (
    <div className="border-b border-border px-5 py-4">
      <h2 className="text-base font-semibold text-foreground">
        {title}
        {count !== undefined ? <span className="ml-1.5 text-muted-foreground">{count}</span> : null}
      </h2>
    </div>
  );
}

function TicketHistorySection({ events, loading }: { events: { _id: string; description: string; createdAt: string; actorId: TicketUserRef | string }[]; loading: boolean }) {
  return (
    <WorkspaceCard>
      <CardHeader title="Ticket history" count={events.length} />
      {loading ? (
        <p className="p-5 text-sm text-muted-foreground">Loading history…</p>
      ) : events.length === 0 ? (
        <EmptyState
          title="No history yet"
          description="All updates and actions will appear here."
          icon={Clock}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Date & time</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Action</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Performed by</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => {
              const actor = event.actorId as TicketUserRef;
              return (
                <TableRow key={event._id}>
                  <TableCell className="text-muted-foreground">{formatDate(event.createdAt, true)}</TableCell>
                  <TableCell className="font-medium">Update</TableCell>
                  <TableCell>{getTicketUserLabel(actor)}</TableCell>
                  <TableCell>{event.description}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </WorkspaceCard>
  );
}

function PlaceholderTab({ title, description }: { title: string; description: string }) {
  return (
    <WorkspaceCard>
      <EmptyState title={title} description={description} />
    </WorkspaceCard>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}

function ManageField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </div>
  );
}
