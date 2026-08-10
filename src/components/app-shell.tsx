import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Ticket as TicketIcon,
  FolderKanban,
  Users,
  BarChart3,
  Bell,
  Search,
  Menu,
  Plus,
  LogOut,
  UserRound,
  UserCog,
  Settings,
  Inbox,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Moon,
  Sun,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/primitives";
import { BrandLogo } from "@/components/brand-logo";
import { useAuth } from "@/lib/auth";
import { actions, categoryName, findUser, relativeTime, useStore } from "@/lib/store";
import { fullName } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}

const adminNav: NavItem[] = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard, exact: true },
  { label: "Projects", to: "/admin/projects", icon: FolderKanban },
  { label: "Tickets", to: "/admin/tickets", icon: TicketIcon },
  { label: "Customers", to: "/admin/customers", icon: Users },
  { label: "Users", to: "/admin/users", icon: UserCog },
  { label: "Reports", to: "/admin/reports", icon: BarChart3 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

const agentNav: NavItem[] = [
  { label: "Dashboard", to: "/staff/dashboard", icon: LayoutDashboard, exact: true },
  { label: "Projects", to: "/admin/projects", icon: FolderKanban },
  { label: "Tickets", to: "/admin/tickets", icon: TicketIcon },
  { label: "Customers", to: "/admin/customers", icon: Users },
];

const clientNav: NavItem[] = [
  { label: "Dashboard", to: "/client/dashboard", icon: LayoutDashboard, exact: true },
  { label: "My Projects", to: "/portal/projects", icon: FolderKanban },
  { label: "My Tickets", to: "/portal/tickets", icon: TicketIcon },
];

function navItemClasses(active: boolean, collapsed: boolean) {
  return cn(
    "relative flex items-center gap-2.5 rounded-md text-[13px] font-medium transition-all duration-150 focus-visible:ring-2 focus-visible:ring-sidebar-ring/40 focus-visible:outline-none",
    collapsed ? "justify-center px-2 py-2" : "px-3 py-2",
    active
      ? collapsed
        ? "bg-sidebar-accent text-sidebar-active-foreground"
        : "bg-sidebar-accent text-sidebar-active-foreground before:absolute before:left-0 before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-primary"
      : "text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-sidebar-active-foreground",
  );
}

function NavIcon({ icon: Icon }: { icon: typeof LayoutDashboard }) {
  return <Icon className="size-[18px] shrink-0 stroke-[1.75]" aria-hidden />;
}

function NavList({
  items,
  onNavigate,
  collapsed = false,
}: {
  items: NavItem[];
  onNavigate?: () => void;
  collapsed?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className={cn("flex flex-col gap-0.5", collapsed ? "px-2" : "px-1")} aria-label="Main">
      {items.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        const link = (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            aria-label={collapsed ? item.label : undefined}
            className={navItemClasses(active, collapsed)}
          >
            <NavIcon icon={item.icon} />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        );
        if (!collapsed) return link;
        return (
          <Tooltip key={item.to}>
            <TooltipTrigger asChild>{link}</TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
}

function Brand({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-14 items-center border-b border-sidebar-border",
        collapsed ? "justify-center px-2" : "px-4",
      )}
    >
      <BrandLogo variant={collapsed ? "mark" : "full"} className={collapsed ? "h-9" : "h-8 max-w-[168px]"} />
    </div>
  );
}

function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("helpdesk-theme");
    const isDark = stored ? stored === "dark" : false;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("helpdesk-theme", next ? "dark" : "light");
      return next;
    });
  };

  return { dark, toggle };
}

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg"
          onClick={toggle}
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {dark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{dark ? "Light mode" : "Dark mode"}</TooltipContent>
    </Tooltip>
  );
}

const crumbLabels: Record<string, string> = {
  admin: "Admin",
  portal: "Portal",
  tickets: "Tickets",
  projects: "Projects",
  members: "Members",
  edit: "Edit",
  clients: "Clients",
  customers: "Customers",
  team: "Support Team",
  reports: "Reports",
  audit: "Audit Logs",
  notifications: "Notifications",
  settings: "Settings",
  profile: "Profile",
  help: "Help",
  new: "New ticket",
};

function Breadcrumbs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-1.5 text-[13px] md:flex">
      {parts.map((part, i) => {
        const href = `/${parts.slice(0, i + 1).join("/")}`;
        const label = crumbLabels[part] ?? (part.length > 14 ? `${part.slice(0, 10)}…` : part);
        const last = i === parts.length - 1;
        return (
          <span key={href} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />}
            {last ? (
              <span className="truncate font-medium text-foreground">{label}</span>
            ) : (
              <Link to={href} className="truncate text-muted-foreground transition-colors hover:text-foreground">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

function GlobalSearch() {
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const store = useStore((s) => s);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    const scoped =
      user?.role === "Client" ? store.tickets.filter((t) => t.clientId === user.id) : store.tickets;
    return scoped
      .filter((t) => {
        const client = findUser(store, t.clientId);
        const agent = findUser(store, t.assignedTo);
        return [
          t.number,
          t.subject,
          client ? fullName(client) : "",
          client?.email ?? "",
          categoryName(store, t.categoryId),
          agent ? fullName(agent) : "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(term);
      })
      .slice(0, 6);
  }, [q, store, user]);

  const base = user?.role === "Client" ? "/portal/tickets" : "/admin/tickets";

  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tickets, clients, agents…"
        aria-label="Global search"
        className="h-9 border-border/60 bg-muted/30 pl-9 pr-16 shadow-none focus-visible:bg-surface"
      />
      <kbd className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 sm:inline-flex">
        ⌘K
      </kbd>
      {results.length > 0 && (
        <div className="panel absolute top-12 z-50 w-full overflow-hidden p-1.5 shadow-raised">
          {results.map((t) => (
            <Link
              key={t.id}
              to={`${base}/$ticketId`}
              params={{ ticketId: t.id }}
              onClick={() => setQ("")}
              className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-hover"
            >
              <span className="tabular text-xs text-muted-foreground">{t.number}</span>
              <span className="ml-2">{t.subject}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationBell() {
  const { user } = useAuth();
  const all = useStore((s) => s.notifications);
  const notifications = useMemo(() => all.filter((n) => n.userId === user?.id), [all, user?.id]);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-10 rounded-xl" aria-label="Notifications">
          <Bell className="size-4.5" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-88 p-0 shadow-raised">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
          <Button variant="ghost" size="sm" onClick={() => user && actions.markNotificationsRead(user.id)}>
            Mark all read
          </Button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">You have no notifications.</p>
          )}
          {notifications.slice(0, 8).map((n) => (
            <div
              key={n.id}
              className={cn("border-b px-4 py-3 transition-colors last:border-0 hover:bg-hover", !n.read && "bg-primary-soft")}
            >
              <div className="flex items-start gap-2.5">
                <Inbox className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{relativeTime(n.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ProfileMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  if (!user) return null;
  const name = fullName(user);

  const items = [{ label: "My Profile", icon: UserRound, tab: "profile" }];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2.5 rounded-xl border border-transparent px-2 py-1.5 transition-all hover:border-border/60 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none">
            <UserAvatar name={name} hue={user.avatarHue} size={32} />
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight">{name}</span>
              <span className="block text-xs text-muted-foreground">{user.role}</span>
            </span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-raised">
          <DropdownMenuLabel>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs font-normal text-muted-foreground">{user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item) => (
            <DropdownMenuItem
              key={item.label}
              onSelect={() => navigate({ to: "/profile", search: { tab: item.tab } })}
            >
              <item.icon className="size-4" />
              {item.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={() => setConfirm(true)}>
            <LogOut className="size-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              Your current session will be ended and you will be returned to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await logout();
                navigate({ to: "/", replace: true });
              }}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const items = user?.role === "Client" ? clientNav : user?.role === "Staff" ? agentNav : adminNav;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-dvh w-full canvas">
        <aside
          className={cn(
            "sticky top-0 z-30 hidden h-dvh shrink-0 flex-col border-r border-sidebar-border/80 bg-sidebar shadow-[4px_0_24px_-12px_rgb(15_23_42/0.08)] transition-[width] duration-300 ease-out lg:flex",
            collapsed ? "w-[68px]" : "w-[210px]",
          )}
        >
          <Brand collapsed={collapsed} />
          <div className="flex flex-1 flex-col overflow-y-auto py-2">
            <NavList items={items} collapsed={collapsed} />
          </div>
          <div className="border-t border-sidebar-border p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={cn(
                "h-8 w-full justify-start gap-2 rounded-md px-2.5 text-xs font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-active-foreground",
                collapsed && "justify-center px-0",
              )}
            >
              {collapsed ? <PanelLeftOpen className="size-4 stroke-[1.75]" /> : <PanelLeftClose className="size-4 stroke-[1.75]" />}
              {!collapsed && <span>Collapse</span>}
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="glass sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border/60 px-4 sm:px-6">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg lg:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Brand />
                <div className="py-2">
                  <NavList items={items} onNavigate={() => setMobileOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            <Breadcrumbs />

            <div className="ml-auto hidden flex-1 justify-end sm:flex">
              <GlobalSearch />
            </div>

            <div className="ml-auto flex items-center gap-1 sm:ml-0">
              <Button asChild size="sm" className="hidden h-9 sm:inline-flex">
                <Link to={user?.role === "Client" ? "/portal/tickets/new" : "/admin/tickets"} search={user?.role === "Client" ? undefined : { action: "create" }}>
                  <Plus className="size-4" /> New ticket
                </Link>
              </Button>
              <ThemeToggle />
              <NotificationBell />
              <ProfileMenu />
            </div>
          </header>

          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-6">{children}</div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
