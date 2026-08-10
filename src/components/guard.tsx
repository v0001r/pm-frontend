import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, homeFor } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { Skeleton } from "@/components/ui/skeleton";
import type { Role } from "@/lib/types";

function AuthLoading() {
  return (
    <div className="flex min-h-screen flex-col gap-4 p-8">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export function RequireRole({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      navigate({ to: "/", replace: true });
      return;
    }
    if (!roles.includes(user.role)) {
      navigate({ to: "/unauthorized", replace: true });
    }
  }, [ready, user, roles, navigate]);

  if (!ready || !user || !roles.includes(user.role)) {
    return <AuthLoading />;
  }

  return <AppShell>{children}</AppShell>;
}

export function AuthenticatedRoute({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) return;
    if (!user) navigate({ to: "/", replace: true });
  }, [ready, user, navigate]);

  if (!ready || !user) return <AuthLoading />;
  return <AppShell>{children}</AppShell>;
}

export function GuestRoute({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready || !user) return;
    navigate({ to: homeFor(user.role), replace: true });
  }, [ready, user, navigate]);

  if (!ready) return <AuthLoading />;
  if (user) return <AuthLoading />;
  return <>{children}</>;
}

export function AdminRoute({ children }: { children: ReactNode }) {
  return <RequireRole roles={["Admin"]}>{children}</RequireRole>;
}

export function StaffRoute({ children }: { children: ReactNode }) {
  return <RequireRole roles={["Staff"]}>{children}</RequireRole>;
}

export function ClientRoute({ children }: { children: ReactNode }) {
  return <RequireRole roles={["Client"]}>{children}</RequireRole>;
}

export function AdminOrStaffRoute({ children }: { children: ReactNode }) {
  return <RequireRole roles={["Admin", "Staff"]}>{children}</RequireRole>;
}
