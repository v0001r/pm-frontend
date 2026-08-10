import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, homeFor } from "@/lib/auth";

export const Route = createFileRoute("/unauthorized")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Unauthorized — Helpdesk" }],
  }),
  component: UnauthorizedPage,
});

function UnauthorizedPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive">
        <ShieldAlert className="size-7" />
      </span>
      <h1 className="text-2xl font-semibold">Access denied</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        You do not have permission to view this page. Contact your administrator if you believe this
        is a mistake.
      </p>
      <div className="flex gap-2">
        {user ? (
          <Button asChild>
            <Link to={homeFor(user.role)}>Go to my dashboard</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/">Sign in</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
