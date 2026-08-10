import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { RequireRole } from "@/components/guard";
import { CustomerForm } from "@/components/customer-form";
import { PageHeader, SectionCard } from "@/components/primitives";
import { getApiErrorMessage } from "@/lib/api";
import { createCustomer } from "@/lib/customers";
import type { CreateCustomerPayload } from "@/lib/types";

export const Route = createFileRoute("/admin/customers/new")({
  ssr: false,
  head: () => ({ meta: [{ title: "New Customer — Helpdesk Admin" }] }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <NewCustomerPage />
    </RequireRole>
  ),
});

function NewCustomerPage() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="New customer" description="Create an organization and primary contact." />
      <SectionCard>
        <div className="p-4">
          <CustomerForm
            submitLabel="Create customer"
            onSubmit={async (payload) => {
              try {
                const customer = await createCustomer(payload as CreateCustomerPayload);
                toast.success(`${customer.companyName} created.`);
                navigate({ to: "/admin/customers/$customerId", params: { customerId: customer._id } });
              } catch (error) {
                toast.error(getApiErrorMessage(error, "Failed to create customer"));
                throw error;
              }
            }}
          />
        </div>
      </SectionCard>
    </>
  );
}
