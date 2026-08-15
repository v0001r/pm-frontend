import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { fieldInputClass, FormField } from "@/components/form-field";
import { PasswordInput } from "@/components/password";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PageHeader, SectionCard } from "@/components/primitives";
import { useAuth, homeFor } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";
import { changePasswordSchema, validateForm } from "@/lib/form-validation";

export const Route = createFileRoute("/change-password")({
  ssr: false,
  component: ChangePasswordPage,
});

function ChangePasswordPage() {
  const { user, changePassword, refresh } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate({ to: "/", replace: true });
    return null;
  }

  function clearError(field: string) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-12">
      <div className="w-full">
        <PageHeader title="Change your password" description="You must set a new password before continuing." />
        <SectionCard>
          <form
            className="grid gap-4 p-4"
            noValidate
            onSubmit={async (event) => {
              event.preventDefault();
              setApiError("");
              const validation = validateForm(changePasswordSchema, {
                currentPassword,
                newPassword,
                confirm,
              });
              if (!validation.success) {
                setErrors(validation.errors);
                return;
              }
              setErrors({});
              setLoading(true);
              try {
                await changePassword(currentPassword, newPassword);
                await refresh();
                navigate({ to: homeFor(user.role), replace: true });
              } catch (err) {
                setApiError(getApiErrorMessage(err, "Unable to change password."));
              } finally {
                setLoading(false);
              }
            }}
          >
            {apiError && (
              <Alert variant="destructive">
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}
            <FormField label="Current / temporary password" htmlFor="current" error={errors.currentPassword} required>
              <PasswordInput
                id="current"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  clearError("currentPassword");
                }}
                className={fieldInputClass(errors.currentPassword)}
              />
            </FormField>
            <FormField label="New password" htmlFor="new" error={errors.newPassword} required>
              <PasswordInput
                id="new"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  clearError("newPassword");
                }}
                className={fieldInputClass(errors.newPassword)}
              />
            </FormField>
            <FormField label="Confirm new password" htmlFor="confirm" error={errors.confirm} required>
              <PasswordInput
                id="confirm"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  clearError("confirm");
                }}
                className={fieldInputClass(errors.confirm)}
              />
            </FormField>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="size-4 animate-spin" />}
              Update password
            </Button>
          </form>
        </SectionCard>
      </div>
    </div>
  );
}
