import type { LucideIcon } from "lucide-react";
import { Bell, Building2, Globe, Layers, Loader2, Ticket, Users } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { getApiErrorMessage } from "@/lib/api";
import { uploadFile, type UploadContext } from "@/lib/uploads";
import { cn } from "@/lib/utils";

export type SettingsSection =
  | "company"
  | "users-roles"
  | "tickets-sla"
  | "ticket-categories"
  | "notifications";

export interface SettingsNavItem {
  id: SettingsSection;
  label: string;
  icon: LucideIcon;
}

export interface SettingsNavGroup {
  title: string;
  items: SettingsNavItem[];
}

export const settingsNavGroups: SettingsNavGroup[] = [
  {
    title: "Organization",
    items: [
      { id: "company", label: "Company", icon: Building2 },
      { id: "users-roles", label: "Users & Roles", icon: Users },
    ],
  },
  {
    title: "Support",
    items: [
      { id: "tickets-sla", label: "Tickets & SLA", icon: Ticket },
      { id: "ticket-categories", label: "Ticket Categories", icon: Layers },
    ],
  },
  {
    title: "Communication",
    items: [{ id: "notifications", label: "Notifications", icon: Bell }],
  },
];

export const settingsSectionMeta: Record<
  SettingsSection,
  { title: string; description: string; breadcrumb: string }
> = {
  company: {
    title: "Company information",
    description: "Update your organization details and system preferences.",
    breadcrumb: "Company",
  },
  "users-roles": {
    title: "Users & roles",
    description: "Manage role definitions and permission scopes.",
    breadcrumb: "Users & Roles",
  },
  "tickets-sla": {
    title: "Tickets & SLA",
    description: "Configure ticket defaults and SLA response targets.",
    breadcrumb: "Tickets & SLA",
  },
  "ticket-categories": {
    title: "Ticket categories",
    description: "Manage categories used when logging support requests.",
    breadcrumb: "Ticket Categories",
  },
  notifications: {
    title: "Notifications",
    description: "Configure email notifications for ticket events.",
    breadcrumb: "Notifications",
  },
};

interface SettingsShellProps {
  section: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
  children: React.ReactNode;
}

export function SettingsShell({ section, onSectionChange, children }: SettingsShellProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <aside className="w-full shrink-0 lg:w-56">
        <nav className="rounded-md border border-border/60 bg-card p-2 shadow-sm" aria-label="Settings">
          {settingsNavGroups.map((group) => (
            <div key={group.title} className="mb-3 last:mb-0">
              <p className="px-2 py-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                {group.title}
              </p>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = section === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onSectionChange(item.id)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] font-medium transition-colors",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function SettingsPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-subtle">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function SettingsCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("overflow-hidden rounded-md border border-border/60 bg-card shadow-sm", className)}>
      <div className="border-b border-border/60 px-5 py-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description ? <p className="mt-0.5 text-sm text-subtle">{description}</p> : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function SettingsField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

export function SettingsUploadBox({
  label,
  hint = "Click to upload",
  previewSrc,
  accept = "image/*",
  context,
  onUploaded,
  disabled = false,
}: {
  label: string;
  hint?: string;
  previewSrc?: string;
  accept?: string;
  context: UploadContext;
  onUploaded: (url: string) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    try {
      const uploaded = await uploadFile(file, context);
      onUploaded(uploaded.url);
      toast.success(`${label} uploaded.`);
    } catch (error) {
      toast.error(getApiErrorMessage(error, `Failed to upload ${label.toLowerCase()}`));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <label
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted/20 px-4 py-6 text-center transition-colors hover:bg-muted/40",
          (disabled || uploading) && "pointer-events-none opacity-60",
        )}
      >
        {previewSrc ? (
          <img src={previewSrc} alt="" className="max-h-10 object-contain" />
        ) : (
          <span className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary">
            {uploading ? <Loader2 className="size-5 animate-spin" /> : <Globe className="size-5" />}
          </span>
        )}
        <span className="text-xs text-muted-foreground">{uploading ? "Uploading…" : hint}</span>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={accept}
          disabled={disabled || uploading}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export function SettingsToggleRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-sm text-subtle">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
