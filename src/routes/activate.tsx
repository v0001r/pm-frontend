import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { PasswordField, PasswordStrength } from "@/components/password";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GuestRoute } from "@/components/guard";
import { PageHeader, SectionCard } from "@/components/primitives";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api";
import { activateAccount, validateActivationToken } from "@/lib/auth";
import { activateAccountSchema, validateForm } from "@/lib/form-validation";

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
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tokenError, setTokenError] = useState("");
  const [tokenInfo, setTokenInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [done, setDone] = useState(false);
  const tokenReady = Boolean(token.trim()) && !tokenError && !checkingToken;

  useEffect(() => {
    let cancelled = false;

    async function checkToken() {
      if (!token.trim()) {
        setTokenError("This activation link is invalid.");
        setTokenInfo("");
        setCheckingToken(false);
        return;
      }

      setCheckingToken(true);
      setTokenError("");
      setTokenInfo("");

      try {
        const result = await validateActivationToken(token);
        if (cancelled) return;

        if (result.valid) {
          setTokenInfo(
            result.message ??
              `This activation link is valid for ${result.expiresInHours ?? 72} hours from when it was sent.`,
          );
          return;
        }

        setTokenError(result.message ?? "This activation link is invalid.");
      } catch {
        if (!cancelled) {
          setTokenError("Unable to validate this activation link.");
        }
      } finally {
        if (!cancelled) {
          setCheckingToken(false);
        }
      }
    }

    void checkToken();
    return () => {
      cancelled = true;
    };
  }, [token]);

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
        <PageHeader
          title="Activate your account"
          description="Set a secure password to finish setting up your account."
        />
        <SectionCard>
          {done ? (
            <div className="grid gap-4 p-4">
              <Alert>
                <CheckCircle2 className="size-4" />
                <AlertDescription>Your account has been activated. You can now sign in.</AlertDescription>
              </Alert>
              <Button asChild>
                <Link to="/" replace>
                  Continue to sign in
                </Link>
              </Button>
            </div>
          ) : (
            <form
              className="grid gap-4 p-4"
              noValidate
              onSubmit={async (event) => {
                event.preventDefault();
                if (!tokenReady) {
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
                  setDone(true);
                } catch (err) {
                  const fieldErrors = getApiFieldErrors(err);
                  if (Object.keys(fieldErrors).length > 0) {
                    setErrors(fieldErrors);
                    return;
                  }

                  const message = getApiErrorMessage(err, "Activation failed.");
                  if (message.includes("activation link") || message.includes("invitation link")) {
                    setTokenError(message);
                    return;
                  }

                  setErrors({ password: message });
                } finally {
                  setLoading(false);
                }
              }}
            >
              {checkingToken ? (
                <p className="text-sm text-muted-foreground">Checking activation link…</p>
              ) : null}
              {tokenInfo ? (
                <Alert>
                  <AlertDescription>{tokenInfo}</AlertDescription>
                </Alert>
              ) : null}
              {tokenError ? (
                <Alert variant="destructive">
                  <AlertDescription>{tokenError}</AlertDescription>
                </Alert>
              ) : null}
              <PasswordField
                id="password"
                label="New password"
                value={password}
                onChange={(value) => {
                  setPassword(value);
                  clearError("password");
                }}
                error={errors.password}
                required
              />
              <PasswordStrength value={password} />
              <PasswordField
                id="confirm"
                label="Confirm password"
                value={confirm}
                onChange={(value) => {
                  setConfirm(value);
                  clearError("confirm");
                }}
                error={errors.confirm}
                required
              />
              <Button type="submit" disabled={loading || !tokenReady}>
                {loading && <Loader2 className="size-4 animate-spin" />}
                Activate account
              </Button>
              <Link to="/" className="text-center text-sm text-primary hover:underline">
                Back to sign in
              </Link>
            </form>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
