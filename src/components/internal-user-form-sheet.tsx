import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FormSheet } from "@/components/form-sheet";
import { InternalUserForm } from "@/components/internal-user-form";
import { TableSkeleton } from "@/components/primitives";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api";
import { createInternalUser, fetchInternalUser, updateInternalUser } from "@/lib/internal-users";
import type { CreateInternalUserPayload, UpdateInternalUserPayload } from "@/lib/types";

interface InternalUserFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  userId?: string;
  onSaved?: (userId: string) => void;
}

export function InternalUserFormSheet({ open, onOpenChange, mode, userId, onSaved }: InternalUserFormSheetProps) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["internal-user", userId],
    queryFn: () => fetchInternalUser(userId!),
    enabled: mode === "edit" && !!userId && open,
  });

  const invalidate = async (id: string) => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["internal-users"] }),
      queryClient.invalidateQueries({ queryKey: ["internal-user", id] }),
      queryClient.invalidateQueries({ queryKey: ["internal-user-overview", id] }),
    ]);
  };

  const displayName =
    data?.name ?? (data?.firstName && data?.lastName ? `${data.firstName} ${data.lastName}` : data?.email);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      title={mode === "create" ? "New user" : `Edit ${displayName ?? "user"}`}
      description={
        mode === "create"
          ? "Create an internal employee account."
          : (data?.email ?? "Update employee information.")
      }
    >
      {mode === "edit" && isLoading ? (
        <TableSkeleton rows={8} cols={2} />
      ) : mode === "edit" && !data ? (
        <p className="text-sm text-muted-foreground">Unable to load user.</p>
      ) : (
        <InternalUserForm
          key={mode === "edit" ? userId : "create"}
          mode={mode}
          initial={mode === "edit" ? data : undefined}
          submitLabel={mode === "create" ? "Create user" : "Save changes"}
          onCancel={() => onOpenChange(false)}
          onSubmit={async (payload) => {
            try {
              if (mode === "create") {
                const createPayload = payload as CreateInternalUserPayload;
                const user = await createInternalUser(createPayload);
                const id = user.id ?? user._id!;
                await invalidate(id);
                toast.success(
                  createPayload.temporaryPassword
                    ? "User created Succesfully."
                    : "User created Succesfully.",
                );
                onOpenChange(false);
                onSaved?.(id);
              } else if (userId) {
                await updateInternalUser(userId, payload as UpdateInternalUserPayload);
                await invalidate(userId);
                toast.success("User updated.");
                onOpenChange(false);
                onSaved?.(userId);
              }
            } catch (error) {
              if (Object.keys(getApiFieldErrors(error)).length === 0) {
                toast.error(getApiErrorMessage(error, mode === "create" ? "Failed to create user" : "Failed to update user"));
              }
              throw error;
            }
          }}
        />
      )}
    </FormSheet>
  );
}
