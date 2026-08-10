import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/guard";
import { PageHeader, SectionCard, UserAvatar } from "@/components/primitives";
import { PasswordField, PasswordStrength } from "@/components/password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsPanelTrigger } from "@/components/ui/tabs";
import { getApiErrorMessage } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { fetchOwnProfile, updateOwnProfile } from "@/lib/internal-users";
import { formatDate } from "@/lib/store";
import { fullName } from "@/lib/types";

export const Route = createFileRoute("/profile")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Profile & Settings — Helpdesk" },
      { name: "description", content: "Update your details, change your password and manage notification preferences." },
      { property: "og:title", content: "Profile & Settings — Helpdesk" },
      { property: "og:description", content: "Update details, password and notification preferences." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff", "Client"]}>
      <ProfilePage />
    </RequireRole>
  ),
});

function ProfilePage() {
  const { user, changePassword } = useAuth();
  const queryClient = useQueryClient();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [current, setCurrent] = useState("");
  const [changing, setChanging] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const profileQuery = useQuery({
    queryKey: ["own-profile"],
    queryFn: fetchOwnProfile,
    enabled: user?.role === "Admin" || user?.role === "Staff",
  });

  const profileMutation = useMutation({
    mutationFn: () => updateOwnProfile({ phone, address }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["own-profile"] });
      toast.success("Profile updated.");
    },
    onError: (err) => toast.error(getApiErrorMessage(err, "Failed to update profile")),
  });

  if (!user) return null;

  const displayUser = profileQuery.data ?? user;

  return (
    <>
      <PageHeader title="Profile & settings" description="Your account details and preferences." />
      <Tabs defaultValue="details">
        <TabsList>
          <TabsPanelTrigger
            value="details"
            icon={<User />}
            title="Details"
            description="Personal information"
          />
          <TabsPanelTrigger
            value="security"
            icon={<Lock />}
            title="Security"
            description="Password and login"
          />
          <TabsPanelTrigger
            value="notifications"
            icon={<Bell />}
            title="Notifications"
            description="Email preferences"
          />
        </TabsList>

        <TabsContent value="details" className="mt-4">
          <SectionCard title="Personal information">
            <form
              className="grid gap-4 p-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (user.role === "Client") {
                  toast.info("Client profile updates are managed by your organization.");
                  return;
                }
                profileMutation.mutate();
              }}
            >
              <div className="flex items-center gap-3 sm:col-span-2">
                <UserAvatar name={fullName(displayUser)} hue={displayUser.avatarHue} size={48} />
                <div>
                  <p className="font-medium">{fullName(displayUser)}</p>
                  <p className="text-xs text-muted-foreground">Member since {formatDate(displayUser.createdAt)}</p>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>First name</Label>
                <Input value={displayUser.firstName ?? ""} disabled />
              </div>
              <div className="grid gap-1.5">
                <Label>Last name</Label>
                <Input value={displayUser.lastName ?? ""} disabled />
              </div>
              <div className="grid gap-1.5">
                <Label>Email</Label>
                <Input value={displayUser.email} disabled />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={phone || displayUser.phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={user.role === "Client"}
                />
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address || displayUser.address || ""}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={user.role === "Client"}
                />
              </div>
              {user.role !== "Client" && (
                <div className="flex justify-end gap-2 sm:col-span-2">
                  <Button size="sm" type="submit" disabled={profileMutation.isPending}>
                    {profileMutation.isPending ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              )}
            </form>
          </SectionCard>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <SectionCard title="Change password">
            <form
              className="grid max-w-md gap-4 p-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (password !== confirm) {
                  toast.error("Passwords do not match.");
                  return;
                }
                if (password.length < 8) {
                  toast.error("Password must be at least 8 characters.");
                  return;
                }
                setChanging(true);
                try {
                  await changePassword(current, password);
                  setCurrent("");
                  setPassword("");
                  setConfirm("");
                  toast.success("Password updated.");
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Unable to change password.");
                } finally {
                  setChanging(false);
                }
              }}
            >
              <PasswordField id="current" label="Current password" value={current} onChange={setCurrent} autoComplete="current-password" required />
              <div className="grid gap-1.5">
                <PasswordField id="new" label="New password" value={password} onChange={setPassword} autoComplete="new-password" required />
                <PasswordStrength value={password} />
              </div>
              <PasswordField id="confirm" label="Confirm new password" value={confirm} onChange={setConfirm} autoComplete="new-password" required />
              <div className="flex justify-end">
                <Button size="sm" type="submit" disabled={changing}>
                  {changing ? "Updating…" : "Update password"}
                </Button>
              </div>
            </form>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <SectionCard title="Email preferences">
            <p className="p-4 text-sm text-muted-foreground">Notification preferences will be available in a future update.</p>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
