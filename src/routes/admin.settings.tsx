import { createFileRoute } from "@tanstack/react-router";
import { Bell, Clock3, Settings, Ticket, Users } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/guard";
import { PageHeader, SectionCard } from "@/components/primitives";
import { TICKET_CATEGORIES } from "@/lib/ticket-categories";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsPanelTrigger } from "@/components/ui/tabs";
import { PRIORITIES, SLA_MATRIX, STATUSES } from "@/lib/types";

export const Route = createFileRoute("/admin/settings")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Settings — Helpdesk Admin" },
      { name: "description", content: "Configure company details, ticket defaults, categories, SLA targets and notifications." },
      { property: "og:title", content: "Settings — Helpdesk Admin" },
      { property: "og:description", content: "Company details, ticket defaults, categories and SLA targets." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <SettingsPage />
    </RequireRole>
  ),
});

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your account preferences, settings and workspace." />
      <Tabs defaultValue="general">
        <TabsList>
          <TabsPanelTrigger
            value="general"
            icon={<Settings />}
            title="General"
            description="Company details and branding"
          />
          <TabsPanelTrigger
            value="tickets"
            icon={<Ticket />}
            title="Tickets"
            description="Defaults and categories"
          />
          <TabsPanelTrigger
            value="sla"
            icon={<Clock3 />}
            title="SLA"
            description="Response and resolution targets"
          />
          <TabsPanelTrigger
            value="notifications"
            icon={<Bell />}
            title="Notifications"
            description="Email and in-app alerts"
          />
          <TabsPanelTrigger
            value="roles"
            icon={<Users />}
            title="Users & roles"
            description="Roles and permissions"
          />
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <SectionCard title="Company information">
            <form
              className="grid gap-4 p-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Settings saved.");
              }}
            >
              {[
                ["Company name", "Helpdesk Enterprise"],
                ["Support email", "support@helpdesk.io"],
                ["Contact number", "+1 800 555 0110"],
                ["Logo URL", "/favicon.ico"],
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1.5">
                  <Label>{label}</Label>
                  <Input defaultValue={value} />
                </div>
              ))}
              <div className="flex justify-end sm:col-span-2">
                <Button type="submit" size="sm">Save changes</Button>
              </div>
            </form>
          </SectionCard>
        </TabsContent>

        <TabsContent value="tickets" className="mt-4 flex flex-col gap-5">
          <SectionCard title="Ticket defaults">
            <div className="grid gap-4 p-4 sm:grid-cols-3">
              <div className="grid gap-1.5">
                <Label>Ticket ID format</Label>
                <Input defaultValue="TKT-{YYYY}-{000000}" />
              </div>
              <div className="grid gap-1.5">
                <Label>Default priority</Label>
                <Input defaultValue={PRIORITIES[1]} />
              </div>
              <div className="grid gap-1.5">
                <Label>Default status</Label>
                <Input defaultValue={STATUSES[0]} />
              </div>
            </div>
          </SectionCard>
          <SectionCard title="Categories" description="Fixed ticket categories used across the helpdesk.">
            <ul>
              {TICKET_CATEGORIES.map((category) => (
                <li key={category.id} className="flex items-center justify-between gap-3 border-b px-4 py-2.5 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="sla" className="mt-4">
          <SectionCard title="Priority-based SLA targets" className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {["Priority", "Response time", "Resolution time"].map((heading) => (
                    <TableHead key={heading}>{heading}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {PRIORITIES.map((p) => (
                  <TableRow key={p}>
                    <TableCell className="font-semibold">{p}</TableCell>
                    <TableCell>{SLA_MATRIX[p].response}</TableCell>
                    <TableCell>{SLA_MATRIX[p].resolution}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <SectionCard title="Notification channels" description="Email delivery connects to a provider later.">
            <ul>
              {["New ticket", "Ticket reply", "Status change", "Ticket assignment", "Ticket resolution", "SLA breach"].map((n, i) => (
                <li key={n} className="flex items-center justify-between border-b px-4 py-2.5 last:border-0">
                  <span className="text-sm">{n}</span>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      Email <Switch defaultChecked={i !== 5} />
                    </label>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      In-app <Switch defaultChecked />
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="roles" className="mt-4">
          <SectionCard title="Roles and permissions">
            <ul className="grid gap-3 p-4 text-sm">
              {[
                ["Super Admin", "Full access to tickets, clients, agents, reports, audit logs and settings."],
                ["Support Agent", "Access to assigned queues, ticket triage, replies and internal notes."],
                ["Client", "Access limited strictly to their own tickets, replies and profile."],
              ].map(([role, desc]) => (
                <li key={role} className="rounded-sm border p-3">
                  <p className="font-medium">{role}</p>
                  <p className="text-muted-foreground">{desc}</p>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
