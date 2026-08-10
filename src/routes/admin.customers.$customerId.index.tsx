import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Building2, FolderKanban, Info, Mail, Pencil, Ticket, Users } from "lucide-react";
import { RequireRole } from "@/components/guard";
import { CustomerContactsTab } from "@/components/customer-contacts-tab";
import { CustomerFormSheet } from "@/components/customer-form-sheet";
import { CustomerProjectsTab } from "@/components/customer-projects-tab";
import { CustomerTicketsTab } from "@/components/customer-tickets-tab";
import { SectionCard, StatusBadge, TableSkeleton } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api";
import { isAdmin, isStaff } from "@/lib/auth";
import {
  fetchCustomerOverview,
  resendCustomerInvitation,
  updateCustomerStatus,
} from "@/lib/customers";
import { formatDate } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { AccountStatus } from "@/lib/types";

type CustomerTab = "contacts" | "info" | "projects" | "tickets";

const customerTabs: { id: CustomerTab; label: string; icon: typeof Users }[] = [
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "info", label: "Information", icon: Info },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "tickets", label: "Tickets", icon: Ticket },
];

export const Route = createFileRoute("/admin/customers/$customerId/")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    edit: search["edit"] === true || search["edit"] === "true",
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff"]}>
      <CustomerDetailPage />
    </RequireRole>
  ),
});

function CustomerDetailPage() {
  const { customerId } = Route.useParams();
  const routeSearch = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<CustomerTab>("contacts");
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (routeSearch.edit) {
      setEditOpen(true);
      navigate({ to: "/admin/customers/$customerId", params: { customerId }, search: {}, replace: true });
    }
  }, [routeSearch.edit, navigate, customerId]);

  const overviewQuery = useQuery({
    queryKey: ["customer-overview", customerId],
    queryFn: () => fetchCustomerOverview(customerId),
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

  const { customer } = overviewQuery.data;

  return (
    <div className="flex flex-col gap-5">
      <section className="overflow-hidden rounded-md border border-border/60 bg-card shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 p-5">
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
            <Button size="sm" onClick={() => setEditOpen(true)}>
              <Pencil className="size-4" />
              Edit Customer
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

        <div className="overflow-x-auto border-t border-border/60">
          <nav className="flex min-w-max items-center gap-1 px-2">
            {customerTabs.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {tab === "contacts" && (
        <CustomerContactsTab customerId={customerId} canManage={isStaff(user?.role)} />
      )}

      {tab === "info" && (
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
      )}

      {tab === "projects" && <CustomerProjectsTab customerId={customerId} />}

      {tab === "tickets" && <CustomerTicketsTab customerId={customerId} />}

      <CustomerFormSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        mode="edit"
        customerId={customerId}
        onSaved={() => overviewQuery.refetch()}
      />
    </div>
  );
}
