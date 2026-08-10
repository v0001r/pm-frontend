import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Building2, FolderKanban, Info, Mail, Pencil, Ticket, Users } from "lucide-react";
import { RequireRole } from "@/components/guard";
import { CustomerContactsTab } from "@/components/customer-contacts-tab";
import { EmptyState, KpiCard, SectionCard, StatusBadge, TableSkeleton } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsPanelTrigger } from "@/components/ui/tabs";
import { getApiErrorMessage } from "@/lib/api";
import { isAdmin, isStaff } from "@/lib/auth";
import {
  fetchCustomerOverview,
  fetchCustomerProjects,
  fetchCustomerTickets,
  resendCustomerInvitation,
  updateCustomerStatus,
} from "@/lib/customers";
import { formatDate } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import type { AccountStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/customers/$customerId/")({
  ssr: false,
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <CustomerDetailPage />
    </RequireRole>
  ),
});

function CustomerDetailPage() {
  const { customerId } = Route.useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("contacts");

  const overviewQuery = useQuery({
    queryKey: ["customer-overview", customerId],
    queryFn: () => fetchCustomerOverview(customerId),
  });

  const projectsQuery = useQuery({
    queryKey: ["customer-projects", customerId],
    queryFn: () => fetchCustomerProjects(customerId, { page: 1, limit: 10 }),
    enabled: tab === "projects",
  });

  const ticketsQuery = useQuery({
    queryKey: ["customer-tickets", customerId],
    queryFn: () => fetchCustomerTickets(customerId, { page: 1, limit: 10 }),
    enabled: tab === "tickets",
  });

  const statusMutation = useMutation({
    mutationFn: (status: AccountStatus) => updateCustomerStatus(customerId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-overview", customerId] });
      toast.success("Customer status updated.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update status")),
  });

  const inviteMutation = useMutation({
    mutationFn: () => resendCustomerInvitation(customerId),
    onSuccess: () => toast.success("Invitation sent."),
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to send invitation")),
  });

  if (overviewQuery.isLoading || !overviewQuery.data) {
    return <TableSkeleton rows={6} cols={4} />;
  }

  const { customer, summary } = overviewQuery.data;

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-md border border-border/60 bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <Building2 className="size-7" />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{customer.companyName}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {customer.customerId} · {customer.primaryContactEmail}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge status={customer.status} />
                <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {customer.invitationStatus ?? "Not Sent"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/admin/customers">
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/admin/customers/$customerId/edit" params={{ customerId }}>
                <Pencil className="size-4" />
                Edit Customer
              </Link>
            </Button>
            {isAdmin(user?.role) && (
              <>
                <Button size="sm" variant="outline" disabled={inviteMutation.isPending} onClick={() => inviteMutation.mutate()}>
                  <Mail className="size-4" />
                  Resend invite
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={statusMutation.isPending}
                  onClick={() =>
                    statusMutation.mutate(customer.status === "Active" ? "Inactive" : "Active")
                  }
                >
                  {customer.status === "Active" ? "Deactivate" : "Activate"}
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Projects" value={summary.totalProjects} />
        <KpiCard label="Tickets" value={summary.totalTickets} />
        <KpiCard label="Open tickets" value={summary.openTickets} tone="warning" />
        <KpiCard label="Closed tickets" value={summary.closedTickets} tone="success" />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsPanelTrigger
            value="contacts"
            icon={<Users />}
            title="Contacts"
            description="Customer contacts"
          />
          <TabsPanelTrigger
            value="info"
            icon={<Info />}
            title="Information"
            description="Company details"
          />
          <TabsPanelTrigger
            value="projects"
            icon={<FolderKanban />}
            title="Projects"
            description="Customer projects"
          />
          <TabsPanelTrigger
            value="tickets"
            icon={<Ticket />}
            title="Tickets"
            description="Support tickets"
          />
        </TabsList>

        <TabsContent value="contacts">
          <CustomerContactsTab customerId={customerId} canManage={isStaff(user?.role)} />
        </TabsContent>

        <TabsContent value="info">
          <SectionCard title="Customer information">
            <dl className="grid gap-3 p-4 text-sm sm:grid-cols-2">
              {[
                ["Address", customer.address || "—"],
                ["City", customer.city || "—"],
                ["State", customer.state || "—"],
                ["Postal code", customer.postalCode || "—"],
                ["Country", customer.country || "—"],
                ["Phone", customer.phone || "—"],
                ["Website", customer.website || "—"],
                ["Created", formatDate(customer.createdAt)],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>
        </TabsContent>

        <TabsContent value="projects">
          <SectionCard>
            {(projectsQuery.data?.items ?? []).length === 0 ? (
              <EmptyState title="No projects" description="Projects for this customer will appear here." />
            ) : (
              <ul className="divide-y">
                {(projectsQuery.data?.items ?? []).map((project) => (
                  <li key={String(project._id)} className="flex items-center justify-between px-4 py-3 text-sm">
                    <div>
                      <p className="font-medium">{String(project.name)}</p>
                      <p className="text-xs text-muted-foreground">{String(project.projectId)}</p>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link to="/admin/projects/$projectId" params={{ projectId: String(project._id) }}>View</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </TabsContent>

        <TabsContent value="tickets">
          <SectionCard>
            {(ticketsQuery.data?.items ?? []).length === 0 ? (
              <EmptyState title="No tickets" />
            ) : (
              <ul className="divide-y">
                {(ticketsQuery.data?.items ?? []).map((ticket) => (
                  <li key={String(ticket._id)} className="px-4 py-3 text-sm">
                    <p className="font-medium">{String(ticket.subject)}</p>
                    <p className="text-xs text-muted-foreground">{String(ticket.number)} · {String(ticket.status)}</p>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
