import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PageHeader, SectionCard } from "@/components/primitives";
import { useAuth, homeFor } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate({ to: "/", replace: true });
    return null;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-12">
      <div className="w-full">
        <PageHeader title="Change your password" description="You must set a new password before continuing." />
        <SectionCard>
          <form
            className="grid gap-4 p-4"
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              if (newPassword.length < 8) return setError("Password must be at least 8 characters.");
              if (newPassword !== confirm) return setError("Passwords do not match.");
              setLoading(true);
              try {
                await changePassword(currentPassword, newPassword);
                await refresh();
                navigate({ to: homeFor(user.role), replace: true });
              } catch (err) {
                setError(getApiErrorMessage(err, "Unable to change password."));
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
              <Label htmlFor="current">Current / temporary password</Label>
              <Input id="current" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="confirm">Confirm new password</Label>
              <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            </div>
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
