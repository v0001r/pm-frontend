import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { RequireRole } from "@/components/guard";
import { EmptyState, PageHeader, SectionCard } from "@/components/primitives";
import {
  DataTableToolbar,
  EntityCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { findUser, formatDate, useStore } from "@/lib/store";
import { fullName } from "@/lib/types";

export const Route = createFileRoute("/admin/audit")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Audit Logs — Helpdesk Admin" },
      { name: "description", content: "Immutable record of logins, ticket changes, assignments and account administration." },
      { property: "og:title", content: "Audit Logs — Helpdesk Admin" },
      { property: "og:description", content: "Record of logins, ticket changes and account administration." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <AuditPage />
    </RequireRole>
  ),
});

function AuditPage() {
  const store = useStore((s) => s);
  const [q, setQ] = useState("");
  const rows = store.audit.filter((a) =>
    `${a.action} ${a.module} ${a.description}`.toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <>
      <PageHeader title="Audit logs" description="Every security and ticket-affecting action, with actor and origin." />
      <SectionCard className="overflow-hidden">
        <DataTableToolbar>
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search actions…" className="h-10 rounded-xl border-border/60 bg-surface pl-10" />
          </div>
        </DataTableToolbar>
        <Table className="min-w-3xl">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {["User", "Action", "Module", "Description", "IP address", "Date & time"].map((heading) => (
                <TableHead key={heading}>{heading}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((a) => {
              const actor = findUser(store, a.userId);
              return (
                <TableRow key={a.id}>
                  <TableCell>
                    <EntityCell
                      name={actor ? fullName(actor) : "System"}
                      subtitle={actor?.email}
                      hue={actor?.avatarHue}
                    />
                  </TableCell>
                  <TableCell><Badge variant="secondary">{a.action}</Badge></TableCell>
                  <TableCell>{a.module}</TableCell>
                  <TableCell className="max-w-xs text-muted-foreground">{a.description}</TableCell>
                  <TableCell className="tabular text-muted-foreground">{a.ip}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(a.createdAt, true)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {rows.length === 0 && <EmptyState title="No audit entries found." />}
      </SectionCard>
    </>
  );
}
