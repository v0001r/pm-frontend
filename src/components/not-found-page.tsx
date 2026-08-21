import { Link } from "@tanstack/react-router";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, homeFor } from "@/lib/auth";

export function NotFoundPage() {
  const { user, ready } = useAuth();
  const homeTo = ready && user ? homeFor(user.role) : "/";
  const homeLabel = ready && user ? "Go to Dashboard" : "Go to Sign in";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-muted text-muted-foreground">
        <FileQuestion className="size-7" />
      </span>
      <h1 className="text-2xl font-semibold">Page Not Found</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Button asChild>
        <Link to={homeTo}>{homeLabel}</Link>
      </Button>
    </div>
  );
}
