import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { RequireRole } from "@/components/guard";
import { InternalUserForm } from "@/components/internal-user-form";
import { PageHeader, SectionCard, TableSkeleton } from "@/components/primitives";
import { getApiErrorMessage } from "@/lib/api";
import { fetchInternalUser, updateInternalUser } from "@/lib/internal-users";
import type { UpdateInternalUserPayload } from "@/lib/types";

export const Route = createFileRoute("/admin/users/$userId/edit")({
  ssr: false,
  component: () => (
    <RequireRole roles={["Admin"]}>
      <EditUserPage />
    </RequireRole>
  ),
});

function EditUserPage() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  const userQuery = useQuery({ queryKey: ["internal-user", userId], queryFn: () => fetchInternalUser(userId) });

  if (userQuery.isLoading || !userQuery.data) {
    return (
      <>
        <PageHeader title="Edit user" />
        <TableSkeleton rows={8} cols={2} />
      </>
    );
  }

  return (
    <>
      <PageHeader title="Edit user" description={userQuery.data.email} />
      <SectionCard>
        <div className="p-4">
          <InternalUserForm
            mode="edit"
            initial={userQuery.data}
            onSubmit={async (payload) => {
              try {
                await updateInternalUser(userId, payload as UpdateInternalUserPayload);
                toast.success("User updated.");
                navigate({ to: "/admin/users/$userId", params: { userId } });
              } catch (error) {
                toast.error(getApiErrorMessage(error, "Failed to update user"));
                throw error;
              }
            }}
          />
        </div>
      </SectionCard>
    </>
  );
}
