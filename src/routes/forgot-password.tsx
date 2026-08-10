import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, LifeBuoy, Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GuestRoute } from "@/components/guard";
import { fieldInputClass, FormField } from "@/components/form-field";
import { forgotPassword } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";
import { forgotPasswordSchema, validateForm } from "@/lib/form-validation";

export const Route = createFileRoute("/forgot-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Forgot password — Helpdesk Support Portal" },
      { name: "description", content: "Request a secure password reset link for your Helpdesk support account." },
      { property: "og:title", content: "Forgot password — Helpdesk" },
      { property: "og:description", content: "Request a secure password reset link for your support account." },
    ],
  }),
  component: () => (
    <GuestRoute>
      <ForgotPassword />
    </GuestRoute>
  ),
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setApiError("");
    const validation = validateForm(forgotPasswordSchema, { email });
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setApiError(getApiErrorMessage(err, "Unable to process request."));
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
        {sent ? (
          <>
            <h1 className="mt-6 text-2xl font-semibold">Check your inbox</h1>
            <Alert className="mt-4">
              <MailCheck className="size-4" />
              <AlertDescription>
                If an account exists with this email address, a password reset link has been sent.
              </AlertDescription>
            </Alert>
            <div className="mt-5 flex flex-col gap-2">
              <Button variant="ghost" asChild>
                <Link to="/">
                  <ArrowLeft className="size-4" /> Return to login
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="mt-6 text-2xl font-semibold">Forgot password</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Enter the email address linked to your account and we'll send a reset link.
            </p>
            <form onSubmit={submit} className="mt-6 flex flex-col gap-4" noValidate>
              {apiError && (
                <Alert variant="destructive">
                  <AlertDescription>{apiError}</AlertDescription>
                </Alert>
              )}
              <FormField label="Email address" htmlFor="email" error={errors.email} required>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((current) => {
                      if (!current.email) return current;
                      const next = { ...current };
                      delete next.email;
                      return next;
                    });
                  }}
                  placeholder="you@company.com"
                  className={fieldInputClass(errors.email)}
                />
              </FormField>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="size-4 animate-spin" />}
                Send reset link
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/">
                  <ArrowLeft className="size-4" /> Return to login
                </Link>
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
