import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { RequireRole } from "@/components/guard";
import { KpiCard, PageHeader, SectionCard } from "@/components/primitives";
import {
  EntityCell,
  PrimaryCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categoryName, findUser, slaState, useStore } from "@/lib/store";
import { PRIORITIES, fullName } from "@/lib/types";

export const Route = createFileRoute("/admin/reports")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reports & Analytics — Helpdesk Admin" },
      { name: "description", content: "Ticket volume, response and resolution times, SLA breaches and workload reports." },
      { property: "og:title", content: "Reports & Analytics — Helpdesk Admin" },
      { property: "og:description", content: "Volume, response times, SLA breaches and workload reporting." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <ReportsPage />
    </RequireRole>
  ),
});

function ReportsPage() {
  const store = useStore((s) => s);
  const [range, setRange] = useState("30");
  const tickets = store.tickets;

  const table = (rows: [string, number][]) => (
    <Table>
      <TableBody>
        {rows.map(([k, v]) => (
          <TableRow key={k}>
            <TableCell className="text-muted-foreground">{k}</TableCell>
            <TableCell className="tabular text-right font-semibold">{v}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
      <PageHeader
        title="Reports & analytics"
        description="Performance across volume, responsiveness and SLA compliance."
        actions={
          <div className="flex gap-2">
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="h-9 w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="last-month">Last month</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => toast.success("Report exported to CSV.")}>
              <Download className="size-4" /> Export
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Tickets created" value={tickets.length} />
        <KpiCard label="Tickets resolved" value={tickets.filter((t) => t.status === "Resolved").length} tone="success" />
        <KpiCard label="Tickets closed" value={tickets.filter((t) => t.status === "Closed").length} />
        <KpiCard label="Open tickets" value={tickets.filter((t) => !["Resolved", "Closed"].includes(t.status)).length} />
        <KpiCard label="Avg. first response" value="42m" hint="Target 1h" />
        <KpiCard label="Avg. resolution" value="11h 24m" hint="Target 24h" />
        <KpiCard label="SLA breaches" value={tickets.filter((t) => slaState(t) === "Breached").length} tone="danger" />
        <KpiCard label="Reopened" value={2} tone="warning" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Tickets by category">
          {table(store.categories.map((c) => [c.name, tickets.filter((t) => t.categoryId === c.id).length]))}
        </SectionCard>
        <SectionCard title="Tickets by priority">
          {table(PRIORITIES.map((p) => [p, tickets.filter((t) => t.priority === p).length]))}
        </SectionCard>
        <SectionCard title="Tickets by client">
          {table(
            store.users
              .filter((u) => u.role === "Client")
              .map((u) => [`${fullName(u)} · ${u.company}`, tickets.filter((t) => t.clientId === u.id).length]),
          )}
        </SectionCard>
        <SectionCard title="Tickets by support agent">
          {table(
            store.users
              .filter((u) => u.role === "Staff" || u.role === "Admin")
              .map((u) => [fullName(u), tickets.filter((t) => t.assignedTo === u.id).length]),
          )}
        </SectionCard>
      </div>

      <SectionCard title="SLA breach detail">
        <Table className="min-w-3xl">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {["Ticket", "Client", "Category", "Priority", "SLA"].map((heading) => (
                <TableHead key={heading}>{heading}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets
              .filter((t) => slaState(t) !== "On Track" && slaState(t) !== "Met")
              .slice(0, 8)
              .map((t) => {
                const client = findUser(store, t.clientId)!;
                return (
                  <TableRow key={t.id}>
                    <TableCell>
                      <PrimaryCell id={t.number} title={t.subject} />
                    </TableCell>
                    <TableCell>
                      <EntityCell name={fullName(client)} subtitle={client.company} hue={client.avatarHue} />
                    </TableCell>
                    <TableCell>{categoryName(store, t.categoryId)}</TableCell>
                    <TableCell>{t.priority}</TableCell>
                    <TableCell>{slaState(t)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </SectionCard>
    </>
  );
}
