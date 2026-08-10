import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Lock, Paperclip, Send, StickyNote, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { EmptyState, PriorityBadge, SectionCard, SlaBadge, StatusBadge, UserAvatar } from "@/components/primitives";
import { getApiErrorMessage } from "@/lib/api";
import { fetchCategories } from "@/lib/categories";
import { formatDate } from "@/lib/store";
import { fetchEmployees } from "@/lib/users";
import {
  fetchTicket,
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
import { PRIORITIES, SLA_MATRIX, STATUSES, fullName, type Priority, type TicketStatus, type TicketUserRef } from "@/lib/types";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function TicketWorkspace({ ticketId, mode }: { ticketId: string; mode: "admin" | "client" }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState("");
  const [internal, setInternal] = useState(false);
  const [closeComment, setCloseComment] = useState("");
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);

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
      <SectionCard>
        <p className="p-10 text-center text-sm text-muted-foreground">Loading ticket…</p>
      </SectionCard>
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

  if (mode === "client" && clientId !== user.id) {
    return (
      <SectionCard>
        <p className="p-10 text-center text-sm text-muted-foreground">You do not have access to this ticket.</p>
      </SectionCard>
    );
  }

  const client = typeof ticket.clientId === "string" ? null : (ticket.clientId as TicketUserRef);
  const agent = typeof ticket.assignedTo === "string" || !ticket.assignedTo ? null : (ticket.assignedTo as TicketUserRef);
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
    setFiles([...files, { name: `attachment-${n}.png`, size: `${180 + n * 42} KB` }]);
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to={backTo}>
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <p className="tabular text-xs font-medium text-muted-foreground">{ticket.number}</p>
            <h1 className="text-lg font-semibold">{ticket.subject}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusBadge status={ticket.status} />
              <PriorityBadge priority={ticket.priority} />
              <Badge variant="secondary">{getTicketCategoryLabel(ticket)}</Badge>
              {tags.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {mode === "admin" ? (
            <>
              {!["Resolved", "Closed"].includes(ticket.status) && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={busy}
                  onClick={() => runTransition({ status: "Resolved" }, "Ticket marked resolved — awaiting client approval")}
                >
                  Mark resolved
                </Button>
              )}
              {ticket.status !== "Closed" ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" disabled={busy}>Close ticket</Button>
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
                          runTransition(
                            { status: "Closed", comment: closeComment.trim() },
                            "Ticket closed",
                          );
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
                  disabled={busy}
                  onClick={() => runTransition({ status: "Reopened" }, "Ticket reopened")}
                >
                  Reopen ticket
                </Button>
              )}
            </>
          ) : (
            <>
              {ticket.status === "Resolved" && (
                <Button
                  size="sm"
                  disabled={busy}
                  onClick={() => runTransition({ status: "Closed", comment: "Closed by client" }, "Ticket closed")}
                >
                  Close ticket
                </Button>
              )}
              {ticket.status === "Closed" && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busy}
                  onClick={() => runTransition({ status: "Reopened" }, "Ticket reopened")}
                >
                  Reopen ticket
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-5">
          <SectionCard title="Conversation" description={`${messages.length} messages`}>
            <div className="flex flex-col gap-4 p-4">
              {messagesQuery.isLoading ? (
                <p className="text-sm text-muted-foreground">Loading messages…</p>
              ) : messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No messages yet.</p>
              ) : (
                messages.map((message) => {
                  const author = message.authorId as TicketUserRef;
                  const authorId = getTicketUserId(message.authorId);
                  const mine = authorId === user.id;
                  return (
                    <article
                      key={message._id}
                      className={cn(
                        "rounded-md border p-3",
                        message.isInternal
                          ? "border-warning/40 bg-warning/8"
                          : mine
                            ? "border-primary/25 bg-primary-soft"
                            : "bg-surface",
                      )}
                    >
                      <header className="flex flex-wrap items-center gap-2">
                        <UserAvatar name={fullName(author)} hue={42} size={26} />
                        <span className="text-sm font-medium">{fullName(author)}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {author.role === "Client" ? "Client" : author.role === "Staff" ? "Support" : "Admin"}
                        </Badge>
                        {message.isInternal && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-warning-foreground">
                            <Lock className="size-3" /> Internal note
                          </span>
                        )}
                        <span className="ml-auto text-xs text-muted-foreground">{formatDate(message.createdAt, true)}</span>
                      </header>
                      <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">{message.body}</p>
                      {(message.attachments ?? []).length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {(message.attachments ?? []).map((a) => (
                            <span key={a.name} className="inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs">
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
              <div className="border-t p-4">
                {mode === "admin" && (
                  <Tabs value={internal ? "note" : "reply"} onValueChange={(v) => setInternal(v === "note")}>
                    <TabsList variant="compact" className="mb-3">
                      <TabsTrigger value="reply">
                        <Send className="size-3.5" /> Reply to client
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
                  placeholder={internal ? "Visible to support staff only…" : "Write your reply…"}
                />
                {files.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {files.map((f, i) => (
                      <span key={f.name} className="inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs">
                        <Paperclip className="size-3" />
                        {f.name}
                        <span className="text-muted-foreground">{f.size}</span>
                        <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} aria-label="Remove attachment">
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={attach}>
                    <Paperclip className="size-4" /> Attach file
                  </Button>
                  <Button size="sm" onClick={() => messageMutation.mutate()} disabled={!draft.trim() || busy}>
                    <Send className="size-4" /> {internal ? "Add note" : "Send reply"}
                  </Button>
                </div>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Ticket history">
            {eventsQuery.isLoading ? (
              <p className="p-4 text-sm text-muted-foreground">Loading history…</p>
            ) : events.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">No history yet.</p>
            ) : (
              <ol className="flex flex-col gap-3 p-4">
                {events.map((event) => {
                  const actor = event.actorId as TicketUserRef;
                  return (
                    <li key={event._id} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <div>
                        <p>{event.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {getTicketUserLabel(actor)} · {formatDate(event.createdAt, true)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </SectionCard>
        </div>

        <div className="flex flex-col gap-5">
          <SectionCard title="Ticket details">
            <dl className="grid gap-3 p-4 text-sm">
              <Row
                label="Client"
                value={`${client ? fullName(client) : getTicketUserLabel(ticket.clientId)}${client?.company ? ` · ${client.company}` : ""}`}
              />
              <Row label="Project" value={getTicketProjectLabel(ticket)} />
              <Row label="Created" value={formatDate(ticket.createdAt, true)} />
              <Row label="Last updated" value={formatDate(ticket.updatedAt, true)} />
              {slaDue ? <Row label="SLA due" value={formatDate(slaDue, true)} /> : null}
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">SLA status</dt>
                <dd>
                  <SlaBadge state={getTicketSlaState(ticket)} />
                </dd>
              </div>
              <Separator />
              <Row label="Response target" value={slaTargets.response} />
              <Row label="Resolution target" value={slaTargets.resolution} />
              <Separator />
              <Row label="Assigned agent" value={agent ? fullName(agent) : "Unassigned"} />
            </dl>
          </SectionCard>

          {mode === "admin" && (
            <SectionCard title="Manage ticket">
              <div className="grid gap-3 p-4">
                <Field label="Status">
                  <Select
                    value={ticket.status}
                    onValueChange={(v) => runTransition({ status: v as TicketStatus }, `Status changed to ${v}`)}
                    disabled={busy}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Priority">
                  <Select
                    value={ticket.priority}
                    onValueChange={(v) => runUpdate({ priority: v as Priority }, `Priority changed to ${v}`)}
                    disabled={busy}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Category">
                  <Select
                    value={typeof ticket.categoryId === "string" ? ticket.categoryId : ticket.categoryId._id}
                    onValueChange={(v) => {
                      const name = categories.find((c) => c._id === v)?.name ?? v;
                      runUpdate({ categoryId: v }, `Category changed to ${name}`);
                    }}
                    disabled={busy}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.filter((c) => c.active).map((c) => (
                        <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Assigned to">
                  <Select
                    value={getTicketUserId(ticket.assignedTo) ?? "unassigned"}
                    onValueChange={(v) => {
                      const next = v === "unassigned" ? null : v;
                      const name = next ? getTicketUserLabel(employees.find((e) => (e.id ?? e._id) === next) ?? next) : "Unassigned";
                      runUpdate({ assignedTo: next }, `Assigned to ${name}`);
                    }}
                    disabled={busy}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {employees.map((u) => (
                        <SelectItem key={u.id ?? u._id} value={u.id ?? u._id ?? ""}>{fullName(u)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Tags">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {tags.map((t) => (
                      <Badge key={t} variant="secondary" className="gap-1">
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
                      disabled={busy}
                      onClick={() => {
                        const tag = tags.includes("escalated") ? "vip" : "escalated";
                        if (!tags.includes(tag)) runUpdate({ tags: [...tags, tag] }, `Added tag ${tag}`);
                      }}
                    >
                      Add tag
                    </Button>
                  </div>
                </Field>
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}
