import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GuestRoute } from "@/components/guard";
import { PageHeader, SectionCard } from "@/components/primitives";
import { getApiErrorMessage } from "@/lib/api";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-12">
      <div className="w-full">
        <PageHeader title="Activate your account" description="Set a secure password to access the customer portal." />
        <SectionCard>
          <form
            className="grid gap-4 p-4"
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              if (!token) return setError("Invalid or missing invitation link.");
              if (password.length < 8) return setError("Password must be at least 8 characters.");
              if (password !== confirm) return setError("Passwords do not match.");
              setLoading(true);
              try {
                await activateAccount(token, password);
                navigate({ to: "/", replace: true });
              } catch (err) {
                setError(getApiErrorMessage(err, "Activation failed."));
              } finally {
                setLoading(false);
              }
            }}
          >
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-1.5">
              <Label htmlFor="password">New password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            </div>
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
