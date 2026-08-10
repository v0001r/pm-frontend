import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { RequireRole } from "@/components/guard";
import { InternalUserForm } from "@/components/internal-user-form";
import { PageHeader, SectionCard } from "@/components/primitives";
import { getApiErrorMessage } from "@/lib/api";
import { createInternalUser } from "@/lib/internal-users";
import type { CreateInternalUserPayload } from "@/lib/types";

export const Route = createFileRoute("/admin/users/new")({
  ssr: false,
  head: () => ({ meta: [{ title: "New User — Helpdesk Admin" }] }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <NewUserPage />
    </RequireRole>
  ),
});

function NewUserPage() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="New user" description="Create an internal employee account." />
      <SectionCard>
        <div className="p-4">
          <InternalUserForm
            mode="create"
            onCancel={() => navigate({ to: "/admin/users" })}
            onSubmit={async (payload) => {
              try {
                const user = await createInternalUser(payload as CreateInternalUserPayload);
                toast.success("User created and invitation sent.");
                navigate({ to: "/admin/users/$userId", params: { userId: user.id ?? user._id! } });
              } catch (error) {
                toast.error(getApiErrorMessage(error, "Failed to create user"));
                throw error;
              }
            }}
          />
        </div>
      </SectionCard>
    </>
  );
}
