import { useState } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, LifeBuoy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PasswordField, PasswordStrength, passwordValid } from "@/components/password";
import { GuestRoute } from "@/components/guard";
import { resetPassword } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  head: () => ({
    meta: [
      { title: "Reset password — Helpdesk Support Portal" },
      { name: "description", content: "Choose a new password for your Helpdesk support account." },
      { property: "og:title", content: "Reset password — Helpdesk" },
      { property: "og:description", content: "Choose a new password for your Helpdesk support account." },
    ],
  }),
  component: () => (
    <GuestRoute>
      <ResetPassword />
    </GuestRoute>
  ),
});

function ResetPassword() {
  const { token } = useSearch({ from: "/reset-password" });
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return setError("Reset token is missing or invalid.");
    if (!passwordValid(pw)) return setError("Your password does not meet all requirements.");
    if (pw !== confirm) return setError("Passwords do not match.");
    setError("");
    setLoading(true);
    try {
      await resetPassword(token, pw);
      setDone(true);
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to reset password."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <span className="grid size-9 place-items-center rounded-sm bg-primary text-primary-foreground">
          <LifeBuoy className="size-5" />
        </span>
        {done ? (
          <>
            <h1 className="mt-6 text-2xl font-semibold">Password reset</h1>
            <Alert className="mt-4">
              <CheckCircle2 className="size-4" />
              <AlertDescription>Your password has been reset successfully.</AlertDescription>
            </Alert>
            <Button asChild className="mt-5 w-full">
              <Link to="/">Return to login</Link>
            </Button>
          </>
        ) : (
          <>
            <h1 className="mt-6 text-2xl font-semibold">Set a new password</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Choose a strong password you haven't used before.</p>
            <form onSubmit={submit} className="mt-6 flex flex-col gap-4" noValidate>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <PasswordField id="new" label="New password" value={pw} onChange={setPw} />
              <PasswordStrength value={pw} />
              <PasswordField id="confirm" label="Confirm password" value={confirm} onChange={setConfirm} />
              <Button type="submit" disabled={loading || !token}>
                {loading && <Loader2 className="size-4 animate-spin" />}
                Reset password
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
