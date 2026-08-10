import { useMemo } from "react";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import { EmptyState, PageHeader, SectionCard } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { actions, formatDate, useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function NotificationsPanel() {
  const { user } = useAuth();
  const all = useStore((s) => s.notifications);
  const notifications = useMemo(() => all.filter((n) => n.userId === user?.id), [all, user?.id]);

  return (
    <>
      <PageHeader
        title="Notifications"
        description="Ticket activity and account alerts."
        actions={
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (user) actions.markNotificationsRead(user.id);
              toast.success("All notifications marked as read.");
            }}
          >
            Mark all as read
          </Button>
        }
      />
      <SectionCard>
        {notifications.length === 0 ? (
          <EmptyState title="No notifications yet." description="Ticket activity will appear here." />
        ) : (
          <ul>
            {notifications.map((n) => (
              <li key={n.id} className={cn("flex items-start gap-3 border-b px-4 py-3 last:border-0", !n.read && "bg-primary-soft")}>
                <Bell className="mt-0.5 size-4 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                </div>
                <span className="text-xs whitespace-nowrap text-muted-foreground">{formatDate(n.createdAt, true)}</span>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  );
}
