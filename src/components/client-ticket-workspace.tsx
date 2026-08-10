import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Paperclip, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EmptyState, PriorityBadge, SectionCard, StatusBadge, UserAvatar } from "@/components/primitives";
import { getApiErrorMessage } from "@/lib/api";
import { formatDate } from "@/lib/store";
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
} from "@/lib/tickets";
import { SLA_MATRIX, fullName } from "@/lib/types";
import type { TicketUserRef } from "@/lib/types";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function ClientTicketWorkspace({ ticketId }: { ticketId: string }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState("");
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
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to post reply")),
  });

  const statusMutation = useMutation({
    mutationFn: (payload: Parameters<typeof transitionTicket>[1]) => transitionTicket(ticketId, payload),
    onSuccess: () => {
      invalidate();
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update ticket")),
  });

  const updateStatus = (description: string, payload: Parameters<typeof transitionTicket>[1]) => {
    statusMutation.mutate(payload, {
      onSuccess: () => toast.success(description),
    });
  };

  if (ticketQuery.isLoading) {
    return <SectionCard><p className="p-10 text-center text-sm text-muted-foreground">Loading ticket…</p></SectionCard>;
  }

  if (ticketQuery.isError || !ticketQuery.data) {
    return (
      <EmptyState
        title="Ticket not found"
        description="This ticket is unavailable or you do not have access."
        action={
          <Button size="sm" variant="outline" asChild>
            <Link to="/portal/tickets">Back to tickets</Link>
          </Button>
        }
      />
    );
  }

  const ticket = ticketQuery.data;
  const messages = messagesQuery.data ?? [];
  const events = eventsQuery.data ?? [];
  const clientId = getTicketUserId(ticket.clientId);

  if (!user || clientId !== user.id) {
    return (
      <SectionCard>
        <p className="p-10 text-center text-sm text-muted-foreground">You do not have access to this ticket.</p>
      </SectionCard>
    );
  }

  const client = typeof ticket.clientId === "string" ? null : ticket.clientId;
  const agent = typeof ticket.assignedTo === "string" || !ticket.assignedTo ? null : ticket.assignedTo;

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/portal/tickets">
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
              <Badge variant="outline">{getTicketProjectLabel(ticket)}</Badge>
              {(ticket.tags ?? []).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {ticket.status === "Resolved" && (
            <Button
              size="sm"
              disabled={statusMutation.isPending}
              onClick={() =>
                updateStatus("Ticket closed", {
                  status: "Closed",
                  comment: "Closed by client",
                })
              }
            >
              Close ticket
            </Button>
          )}
          {ticket.status === "Closed" && (
            <Button
              size="sm"
              variant="outline"
              disabled={statusMutation.isPending}
              onClick={() =>
                updateStatus("Ticket reopened", {
                  status: "Reopened",
                })
              }
            >
              Reopen ticket
            </Button>
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
                        mine ? "border-primary/25 bg-primary-soft" : "bg-surface",
                      )}
                    >
                      <header className="flex flex-wrap items-center gap-2">
                        <UserAvatar name={fullName(author)} hue={42} size={26} />
                        <span className="text-sm font-medium">{fullName(author)}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {author.role === "Client" ? "Client" : author.role === "Staff" ? "Support" : "Admin"}
                        </Badge>
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

            {!["Closed"].includes(ticket.status) && (
              <div className="border-t p-4">
                <Textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  rows={4}
                  placeholder="Write your reply…"
                />
                {files.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {files.map((file, index) => (
                      <span key={file.name} className="inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs">
                        <Paperclip className="size-3" />
                        {file.name}
                        <span className="text-muted-foreground">{file.size}</span>
                        <button
                          type="button"
                          onClick={() => setFiles(files.filter((_, fileIndex) => fileIndex !== index))}
                          aria-label="Remove attachment"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                    <Paperclip className="size-4" />
                    Attach file
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(event) => {
                        const picked = Array.from(event.target.files ?? []).map((file) => ({
                          name: file.name,
                          size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
                        }));
                        setFiles((previous) => [...previous, ...picked].slice(0, 5));
                      }}
                    />
                  </label>
                  <Button
                    size="sm"
                    onClick={() => messageMutation.mutate()}
                    disabled={!draft.trim() || messageMutation.isPending}
                  >
                    <Send className="size-4" /> Send reply
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">File uploads are stored locally in this demo UI only.</p>
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
                value={`${client ? fullName(client) : getTicketUserLabel(ticket.clientId)}${
                  client?.company ? ` · ${client.company}` : ""
                }`}
              />
              <Row label="Project" value={getTicketProjectLabel(ticket)} />
              <Row label="Created" value={formatDate(ticket.createdAt, true)} />
              <Row label="Last updated" value={formatDate(ticket.updatedAt, true)} />
              {ticket.dueAt || getTicketSlaDueAt(ticket) ? (
                <Row label="SLA due" value={formatDate(getTicketSlaDueAt(ticket) ?? ticket.dueAt!, true)} />
              ) : null}
              <Separator />
              <Row label="Response target" value={(SLA_MATRIX[ticket.priority] ?? SLA_MATRIX.P3).response} />
              <Row label="Resolution target" value={(SLA_MATRIX[ticket.priority] ?? SLA_MATRIX.P3).resolution} />
              <Separator />
              <Row label="Assigned agent" value={agent ? fullName(agent) : "Unassigned"} />
            </dl>
          </SectionCard>
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
