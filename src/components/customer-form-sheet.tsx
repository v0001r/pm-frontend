import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CustomerForm } from "@/components/customer-form";
import { FormSheet } from "@/components/form-sheet";
import { TableSkeleton } from "@/components/primitives";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api";
import { createCustomer, fetchCustomer, updateCustomer } from "@/lib/customers";
import type { CreateCustomerPayload, UpdateCustomerPayload } from "@/lib/types";

interface CustomerFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  customerId?: string;
  onSaved?: (customerId: string) => void;
}

export function CustomerFormSheet({ open, onOpenChange, mode, customerId, onSaved }: CustomerFormSheetProps) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => fetchCustomer(customerId!),
    enabled: mode === "edit" && !!customerId && open,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["customers"] });
    if (customerId) {
      queryClient.invalidateQueries({ queryKey: ["customer", customerId] });
      queryClient.invalidateQueries({ queryKey: ["customer-overview", customerId] });
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      title={mode === "create" ? "New customer" : `Edit ${data?.companyName ?? "customer"}`}
      description={
        mode === "create"
          ? "Create an organization and primary contact."
          : (data?.customerId ?? "Update customer information.")
      }
    >
      {mode === "edit" && isLoading ? (
        <TableSkeleton rows={8} cols={2} />
      ) : mode === "edit" && !data ? (
        <p className="text-sm text-muted-foreground">Unable to load customer.</p>
      ) : (
        <CustomerForm
          key={mode === "edit" ? customerId : "create"}
          isEdit={mode === "edit"}
          initial={mode === "edit" ? data : undefined}
          submitLabel={mode === "create" ? "Create customer" : "Save changes"}
          onCancel={() => onOpenChange(false)}
          onSubmit={async (payload) => {
            try {
              if (mode === "create") {
                const customer = await createCustomer(payload as CreateCustomerPayload);
                invalidate();
                toast.success(`${customer.companyName} created.`);
                onOpenChange(false);
                onSaved?.(customer._id);
              } else if (customerId) {
                await updateCustomer(customerId, payload as UpdateCustomerPayload);
                invalidate();
                toast.success("Customer updated.");
                onOpenChange(false);
                onSaved?.(customerId);
              }
            } catch (error) {
              if (Object.keys(getApiFieldErrors(error)).length === 0) {
                toast.error(getApiErrorMessage(error, mode === "create" ? "Failed to create customer" : "Failed to update customer"));
              }
              throw error;
            }
          }}
        />
      )}
    </FormSheet>
  );
}
