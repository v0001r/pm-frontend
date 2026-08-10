import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { RequireRole } from "@/components/guard";
import { EmptyState, PageHeader, SectionCard, StatusBadge, UserAvatar } from "@/components/primitives";
import {
  DataTableActions,
  DataTableIconButton,
  DataTableToolbar,
  EntityCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDate, useStore, actions } from "@/lib/store";
import { fullName } from "@/lib/types";

export const Route = createFileRoute("/admin/clients")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Client Management — Helpdesk Admin" },
      { name: "description", content: "Manage client accounts, activation status and their full support ticket history." },
      { property: "og:title", content: "Client Management — Helpdesk Admin" },
      { property: "og:description", content: "Manage client accounts, status and ticket history." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <ClientsPage />
    </RequireRole>
  ),
});

function ClientsPage() {
  const store = useStore((s) => s);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const clients = store.users
    .filter((u) => u.role === "Client")
    .filter((u) => `${fullName(u)} ${u.email} ${u.company}`.toLowerCase().includes(q.trim().toLowerCase()));

  const detail = store.users.find((u) => u.id === selected);
  const clientTickets = store.tickets.filter((t) => t.clientId === selected);

  return (
    <>
      <PageHeader
        title="Clients"
        description="Every client account with support history and access controls."
        actions={<Button size="sm" onClick={() => toast.info("Client creation form opens here in the connected build.")}>Add client</Button>}
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <SectionCard className="overflow-hidden">
          <DataTableToolbar>
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clients…" className="h-10 rounded-xl border-border/60 bg-surface pl-10" />
            </div>
          </DataTableToolbar>
          <Table className="min-w-3xl">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {["Client", "Company", "Email", "Tickets", "Status", "Created", "Actions"].map((heading) => (
                  <TableHead key={heading} className={heading === "Actions" ? "text-right" : undefined}>{heading}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((c) => (
                <TableRow key={c.id} className={selected === c.id ? "bg-primary/5" : undefined}>
                  <TableCell>
                    <EntityCell name={fullName(c)} subtitle={c.designation} hue={c.avatarHue} />
                  </TableCell>
                  <TableCell>{c.company}</TableCell>
                  <TableCell className="text-muted-foreground">{c.email}</TableCell>
                  <TableCell className="tabular">{store.tickets.filter((t) => t.clientId === c.id).length}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === "Active" ? "secondary" : "outline"}>{c.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(c.createdAt)}</TableCell>
                  <TableCell>
                    <DataTableActions>
                      <DataTableIconButton label="View client" onClick={() => setSelected(c.id)}>
                        <span className="px-1 text-xs">View</span>
                      </DataTableIconButton>
                    </DataTableActions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {clients.length === 0 && <EmptyState title="No clients have been added yet." />}
        </SectionCard>

        <SectionCard title="Client details">
          {!detail ? (
            <EmptyState title="Select a client" description="Choose a client to view their profile and ticket history." />
          ) : (
            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center gap-3">
                <UserAvatar name={fullName(detail)} hue={detail.avatarHue} size={44} />
                <div>
                  <p className="font-semibold">{fullName(detail)}</p>
                  <p className="text-xs text-muted-foreground">{detail.designation} · {detail.company}</p>
                </div>
              </div>
              <dl className="grid gap-2 text-sm">
                {[
                  ["Email", detail.email],
                  ["Phone", detail.phone],
                  ["Status", detail.status],
                  ["Last login", formatDate(detail.lastLogin, true)],
                  ["Member since", formatDate(detail.createdAt)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  ["Total", clientTickets.length],
                  ["Open", clientTickets.filter((t) => !["Resolved", "Closed"].includes(t.status)).length],
                  ["Resolved", clientTickets.filter((t) => t.status === "Resolved").length],
                ].map(([k, v]) => (
                  <div key={String(k)} className="rounded-sm border p-2">
                    <p className="tabular text-lg font-semibold">{v}</p>
                    <p className="text-xs text-muted-foreground">{k}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-muted-foreground uppercase">Recent tickets</p>
                {clientTickets.slice(0, 4).map((t) => (
                  <Link key={t.id} to="/admin/tickets/$ticketId" params={{ ticketId: t.id }} className="flex items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent">
                    <span className="truncate">{t.subject}</span>
                    <StatusBadge status={t.status} />
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => toast.success("Password reset link sent.")}>Reset password</Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const next = detail.status === "Active" ? "Inactive" : "Active";
                    actions.updateUser(detail.id, { status: next });
                    toast.success(`Client ${next === "Active" ? "activated" : "deactivated"}.`);
                  }}
                >
                  {detail.status === "Active" ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </>
  );
}
