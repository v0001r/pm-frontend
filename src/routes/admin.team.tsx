import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { RequireRole } from "@/components/guard";
import { PageHeader, SectionCard } from "@/components/primitives";
import {
  DataTableActions,
  DataTableIconButton,
  EntityCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { actions, formatDate, useStore } from "@/lib/store";
import { fullName } from "@/lib/types";

export const Route = createFileRoute("/admin/team")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Support Team — Helpdesk Admin" },
      { name: "description", content: "Manage support agents, roles, workload and resolution performance." },
      { property: "og:title", content: "Support Team — Helpdesk Admin" },
      { property: "og:description", content: "Manage support agents, roles, workload and performance." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <TeamPage />
    </RequireRole>
  ),
});

function TeamPage() {
  const store = useStore((s) => s);
  const staff = store.users.filter((u) => u.role === "Staff" || u.role === "Admin");

  return (
    <>
      <PageHeader
        title="Support team"
        description="Agent roster, workload and resolution performance."
        actions={<Button size="sm" onClick={() => toast.info("Agent invitation flow connects to the backend later.")}>Add agent</Button>}
      />
      <SectionCard className="overflow-hidden">
        <Table className="min-w-3xl">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {["Agent", "Email", "Role", "Active tickets", "Resolved", "Avg. resolution", "Status", "Actions"].map((heading) => (
                <TableHead key={heading} className={heading === "Actions" ? "text-right" : undefined}>{heading}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((u, i) => {
              const assigned = store.tickets.filter((t) => t.assignedTo === u.id);
              const active = assigned.filter((t) => !["Resolved", "Closed"].includes(t.status)).length;
              const resolved = assigned.length - active;
              return (
                <TableRow key={u.id}>
                  <TableCell>
                    <EntityCell name={fullName(u)} subtitle={u.department} hue={u.avatarHue} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell>{u.role === "Admin" ? "Super Admin" : "Support Agent"}</TableCell>
                  <TableCell className="tabular">{active}</TableCell>
                  <TableCell className="tabular">{resolved}</TableCell>
                  <TableCell className="tabular">{8 + i * 3}h {12 + i}m</TableCell>
                  <TableCell>
                    <Badge variant={u.status === "Active" ? "secondary" : "outline"}>{u.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DataTableActions>
                      <DataTableIconButton
                        label={u.status === "Active" ? "Deactivate" : "Activate"}
                        onClick={() => {
                          const next = u.status === "Active" ? "Inactive" : "Active";
                          actions.updateUser(u.id, { status: next });
                          toast.success(`${fullName(u)} ${next === "Active" ? "activated" : "deactivated"}.`);
                        }}
                      >
                        <span className="px-1 text-xs">{u.status === "Active" ? "Deactivate" : "Activate"}</span>
                      </DataTableIconButton>
                      <DataTableIconButton label="Reset password" onClick={() => toast.success("Password reset link sent.")}>
                        <span className="px-1 text-xs">Reset</span>
                      </DataTableIconButton>
                    </DataTableActions>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </SectionCard>
      <SectionCard title="Recent staff activity">
        <ul className="flex flex-col gap-2 p-4 text-sm">
          {store.audit.slice(0, 5).map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3">
              <span>{a.description}</span>
              <span className="text-xs text-muted-foreground">{formatDate(a.createdAt, true)}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}
