import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { fieldInputClass, FormField } from "@/components/form-field";
import { PasswordInput } from "@/components/password";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GuestRoute } from "@/components/guard";
import { PageHeader, SectionCard } from "@/components/primitives";
import { getApiErrorMessage } from "@/lib/api";
import { activateAccountSchema, validateForm } from "@/lib/form-validation";
import { activateAccount } from "@/lib/customers";

export const Route = createFileRoute("/activate")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  component: () => (
    <GuestRoute>
      <ActivatePage />
    </GuestRoute>
  ),
});

function ActivatePage() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

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
        <PageHeader title="Activate your account" description="Set a secure password to access the customer portal." />
        <SectionCard>
          <form
            className="grid gap-4 p-4"
            noValidate
            onSubmit={async (event) => {
              event.preventDefault();
              setApiError("");
              if (!token) {
                setApiError("Invalid or missing invitation link.");
                return;
              }
              const validation = validateForm(activateAccountSchema, { password, confirm });
              if (!validation.success) {
                setErrors(validation.errors);
                return;
              }
              setErrors({});
              setLoading(true);
              try {
                await activateAccount(token, password);
                navigate({ to: "/", replace: true });
              } catch (err) {
                setApiError(getApiErrorMessage(err, "Activation failed."));
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
            <FormField label="New password" htmlFor="password" error={errors.password} required>
              <PasswordInput
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError("password");
                }}
                className={fieldInputClass(errors.password)}
              />
            </FormField>
            <FormField label="Confirm password" htmlFor="confirm" error={errors.confirm} required>
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
              Activate account
            </Button>
            <Link to="/" className="text-center text-sm text-primary hover:underline">Back to sign in</Link>
          </form>
        </SectionCard>
      </div>
    </div>
  );
}
