import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { RequireRole } from "@/components/guard";
import { CustomerForm } from "@/components/customer-form";
import { PageHeader, SectionCard, TableSkeleton } from "@/components/primitives";
import { getApiErrorMessage } from "@/lib/api";
import { fetchCustomer, updateCustomer } from "@/lib/customers";
import type { UpdateCustomerPayload } from "@/lib/types";

export const Route = createFileRoute("/admin/customers/$customerId/edit")({
  ssr: false,
  component: () => (
    <RequireRole roles={["Admin"]}>
      <EditCustomerPage />
    </RequireRole>
  ),
});

function EditCustomerPage() {
  const { customerId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => fetchCustomer(customerId),
  });

  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="Edit customer" />
        <TableSkeleton rows={8} cols={2} />
      </>
    );
  }

  return (
    <>
      <PageHeader title={`Edit ${data.companyName}`} description={data.customerId} />
      <SectionCard>
        <div className="p-4">
          <CustomerForm
            isEdit
            initial={data}
            submitLabel="Save changes"
            onSubmit={async (payload) => {
              try {
                await updateCustomer(customerId, payload as UpdateCustomerPayload);
                toast.success("Customer updated.");
                navigate({ to: "/admin/customers/$customerId", params: { customerId } });
              } catch (error) {
                toast.error(getApiErrorMessage(error, "Failed to update customer"));
                throw error;
              }
            }}
          />
        </div>
      </SectionCard>
    </>
  );
}
