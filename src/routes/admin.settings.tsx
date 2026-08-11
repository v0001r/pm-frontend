import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Mail, MailWarning } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/guard";
import {
  SettingsCard,
  SettingsField,
  SettingsPageHeader,
  SettingsShell,
  SettingsUploadBox,
  settingsSectionMeta,
  type SettingsSection,
} from "@/components/settings-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { MIRAKI_LOGO_SRC } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TICKET_CATEGORIES } from "@/lib/ticket-categories";
import { fetchCompanySettings, fetchNotificationSettings, getApiErrorMessage, updateCompanySettings, updateNotificationSettings, type NotificationEventSetting, type NotificationSettings } from "@/lib/settings";
import {
  fetchSlaSettings,
  combineSlaMinutes,
  fromSlaMinuteOption,
  SLA_HOUR_OPTIONS,
  SLA_MINUTE_OPTIONS,
  snapSlaHours,
  toSlaMinuteOption,
  updateSlaSettings,
  type SlaPolicy,
} from "@/lib/sla";
import type { CompanySettings, Priority } from "@/lib/types";
import { PRIORITIES } from "@/lib/types";

interface SlaFormRow {
  priority: Priority;
  responseHours: string;
  responseMinutes: string;
  resolutionHours: string;
  resolutionMinutes: string;
}

function policiesToFormRows(policies: SlaPolicy[]): SlaFormRow[] {
  const byPriority = new Map(policies.map((policy) => [policy.priority, policy]));

  return PRIORITIES.map((priority) => {
    const policy = byPriority.get(priority);
    const assignmentMinutes = policy?.assignmentSlaMinutes ?? 0;
    const resolutionMinutes = policy?.resolutionSlaMinutes ?? 0;

    return {
      priority,
      responseHours: String(snapSlaHours(Math.floor(assignmentMinutes / 60))),
      responseMinutes: toSlaMinuteOption(assignmentMinutes % 60),
      resolutionHours: String(snapSlaHours(Math.floor(resolutionMinutes / 60))),
      resolutionMinutes: toSlaMinuteOption(resolutionMinutes % 60),
    };
  });
}

interface SettingsSearch {
  section?: SettingsSection;
}

export const Route = createFileRoute("/admin/settings")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): SettingsSearch => ({
    section:
      typeof search.section === "string" && search.section in settingsSectionMeta
        ? (search.section as SettingsSection)
        : "company",
  }),
  head: () => ({
    meta: [
      { title: "Settings — Helpdesk Admin" },
      { name: "description", content: "Configure company details, ticket defaults, categories, SLA targets and notifications." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin"]}>
      <SettingsPage />
    </RequireRole>
  ),
});

function SettingsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { section = "company" } = Route.useSearch();
  const meta = settingsSectionMeta[section];

  const companyQuery = useQuery({
    queryKey: ["company-settings"],
    queryFn: fetchCompanySettings,
    enabled: section === "company",
  });

  const [companyForm, setCompanyForm] = useState<CompanySettings | null>(null);

  useEffect(() => {
    if (companyQuery.data) {
      setCompanyForm(companyQuery.data);
    }
  }, [companyQuery.data]);

  useEffect(() => {
    if (companyQuery.isError) {
      toast.error(getApiErrorMessage(companyQuery.error, "Failed to load company settings"));
    }
  }, [companyQuery.isError, companyQuery.error]);

  const saveMutation = useMutation({
    mutationFn: updateCompanySettings,
    onSuccess: (data) => {
      queryClient.setQueryData(["company-settings"], data);
      setCompanyForm(data);
      toast.success("Settings saved.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to save settings")),
  });

  function setSection(next: SettingsSection) {
    navigate({ to: "/admin/settings", search: { section: next }, replace: true });
  }

  function updateCompany<K extends keyof CompanySettings>(key: K, value: CompanySettings[K]) {
    setCompanyForm((current) => (current ? { ...current, [key]: value } : current));
  }

  function saveChanges() {
    if (!companyForm) return;
    saveMutation.mutate(companyForm);
  }

  function resetCompanyForm() {
    if (companyQuery.data) {
      setCompanyForm(companyQuery.data);
      toast.message("Changes discarded.");
    }
  }

  const companyLoading = section === "company" && (companyQuery.isLoading || !companyForm);

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-[13px] text-muted-foreground">
        <Link to="/admin" className="transition-colors hover:text-foreground">
          Admin
        </Link>
        <ChevronRight className="size-3.5" />
        <Link to="/admin/settings" search={{ section: "company" }} className="transition-colors hover:text-foreground">
          Settings
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="font-medium text-foreground">{meta.breadcrumb}</span>
      </nav>

      <SettingsShell section={section} onSectionChange={setSection}>
        <SettingsPageHeader
          title={meta.title}
          description={meta.description}
          actions={
            section === "company" ? (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={resetCompanyForm}
                  disabled={companyLoading || saveMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={saveChanges}
                  disabled={companyLoading || saveMutation.isPending}
                >
                  {saveMutation.isPending ? "Saving…" : "Save changes"}
                </Button>
              </>
            ) : null
          }
        />

        {section === "company" ? (
          companyLoading ? (
            <SettingsCard title="Organization Details" description="Loading company settings…">
              <p className="text-sm text-muted-foreground">Please wait.</p>
            </SettingsCard>
          ) : (
            <CompanySettings form={companyForm!} onChange={updateCompany} />
          )
        ) : null}
        {section === "tickets-sla" ? <TicketsSlaSettings /> : null}
        {section === "ticket-categories" ? <TicketCategoriesSettings /> : null}
        {section === "notifications" ? <NotificationsSettings /> : null}
        {section === "users-roles" ? <UsersRolesSettings /> : null}
      </SettingsShell>
    </>
  );
}

function CompanySettings({
  form,
  onChange,
}: {
  form: CompanySettings;
  onChange: <K extends keyof CompanySettings>(key: K, value: CompanySettings[K]) => void;
}) {
  const logoPreview = form.logoUrl || MIRAKI_LOGO_SRC;
  const faviconPreview = form.faviconUrl || undefined;

  return (
    <SettingsCard title="Organization Details" description="Basic company information visible across the platform.">
      <div className="grid gap-4 sm:grid-cols-2">
        <SettingsField label="Company name">
          <Input value={form.companyName} onChange={(e) => onChange("companyName", e.target.value)} />
        </SettingsField>
        <SettingsField label="Support email">
          <Input
            type="email"
            value={form.supportEmail}
            onChange={(e) => onChange("supportEmail", e.target.value)}
          />
        </SettingsField>
        <SettingsField label="Contact number">
          <Input value={form.contactNumber} onChange={(e) => onChange("contactNumber", e.target.value)} />
        </SettingsField>
        <SettingsField label="Website">
          <Input value={form.website} onChange={(e) => onChange("website", e.target.value)} />
        </SettingsField>
        <SettingsUploadBox
          label="Logo"
          previewSrc={logoPreview}
          context="settings-logo"
          onUploaded={(url) => onChange("logoUrl", url)}
        />
        <SettingsUploadBox
          label="Favicon"
          hint="Click to upload"
          previewSrc={faviconPreview}
          context="settings-favicon"
          accept="image/png,image/x-icon,image/vnd.microsoft.icon,image/jpeg,image/webp"
          onUploaded={(url) => onChange("faviconUrl", url)}
        />
        <SettingsField label="Company address" className="sm:col-span-2">
          <Textarea rows={3} value={form.address} onChange={(e) => onChange("address", e.target.value)} />
        </SettingsField>
        <SettingsField label="Timezone">
          <Select value={form.timezone} onValueChange={(value) => onChange("timezone", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
              <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
              <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
              <SelectItem value="Asia/Kolkata">India Standard Time (IST)</SelectItem>
            </SelectContent>
          </Select>
        </SettingsField>
        <SettingsField label="Date format">
          <Select value={form.dateFormat} onValueChange={(value) => onChange("dateFormat", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </SettingsField>
      </div>
    </SettingsCard>
  );
}

function TicketsSlaSettings() {
  const queryClient = useQueryClient();

  const policiesQuery = useQuery({
    queryKey: ["sla-settings"],
    queryFn: fetchSlaSettings,
  });

  const [formRows, setFormRows] = useState<SlaFormRow[] | null>(null);

  useEffect(() => {
    if (policiesQuery.data) {
      setFormRows(policiesToFormRows(policiesQuery.data));
    }
  }, [policiesQuery.data]);

  useEffect(() => {
    if (policiesQuery.isError) {
      toast.error(getApiErrorMessage(policiesQuery.error, "Failed to load SLA settings"));
    }
  }, [policiesQuery.isError, policiesQuery.error]);

  const saveMutation = useMutation({
    mutationFn: updateSlaSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(["sla-settings"], data);
      queryClient.setQueryData(["sla-policies"], data);
      setFormRows(policiesToFormRows(data));
      toast.success("SLA settings saved.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to save SLA settings")),
  });

  function updateRow(priority: Priority, patch: Partial<Omit<SlaFormRow, "priority">>) {
    setFormRows((current) =>
      current?.map((row) => (row.priority === priority ? { ...row, ...patch } : row)) ?? current,
    );
  }

  function resetForm() {
    if (policiesQuery.data) {
      setFormRows(policiesToFormRows(policiesQuery.data));
      toast.message("Changes discarded.");
    }
  }

  function saveChanges() {
    if (!formRows) return;

    const policies = [];
    for (const row of formRows) {
      const assignmentSlaMinutes = combineSlaMinutes(
        Number(row.responseHours),
        fromSlaMinuteOption(row.responseMinutes),
      );
      const resolutionSlaMinutes = combineSlaMinutes(
        Number(row.resolutionHours),
        fromSlaMinuteOption(row.resolutionMinutes),
      );

      if (assignmentSlaMinutes === null || resolutionSlaMinutes === null) {
        toast.error(`${row.priority}: select a valid duration (at least 1 minute total).`);
        return;
      }

      policies.push({
        priority: row.priority,
        assignmentSlaMinutes,
        resolutionSlaMinutes,
      });
    }

    saveMutation.mutate({ policies });
  }

  const loading = policiesQuery.isLoading || !formRows;

  return (
    <SettingsCard
      title="Priority-based SLA targets"
      description="Set response and resolution targets in hours and minutes, then save to apply for new SLA cycles."
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading SLA settings…</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {["Priority", "Response time", "Resolution time"].map((heading) => (
                  <TableHead key={heading}>{heading}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {formRows.map((row) => (
                <TableRow key={row.priority}>
                  <TableCell className="font-semibold">{row.priority}</TableCell>
                  <TableCell>
                    <SlaDurationFields
                      hours={row.responseHours}
                      minutes={row.responseMinutes}
                      disabled={saveMutation.isPending}
                      labelPrefix={`${row.priority} response`}
                      onHoursChange={(value) => updateRow(row.priority, { responseHours: value })}
                      onMinutesChange={(value) => updateRow(row.priority, { responseMinutes: value })}
                    />
                  </TableCell>
                  <TableCell>
                    <SlaDurationFields
                      hours={row.resolutionHours}
                      minutes={row.resolutionMinutes}
                      disabled={saveMutation.isPending}
                      labelPrefix={`${row.priority} resolution`}
                      onHoursChange={(value) => updateRow(row.priority, { resolutionHours: value })}
                      onMinutesChange={(value) => updateRow(row.priority, { resolutionMinutes: value })}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-5 flex justify-end gap-2 border-t border-border/60 pt-4">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={resetForm}
              disabled={saveMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={saveChanges} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </>
      )}
    </SettingsCard>
  );
}

function SlaDurationFields({
  hours,
  minutes,
  disabled,
  labelPrefix,
  onHoursChange,
  onMinutesChange,
}: {
  hours: string;
  minutes: string;
  disabled: boolean;
  labelPrefix: string;
  onHoursChange: (value: string) => void;
  onMinutesChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Select value={hours} onValueChange={onHoursChange} disabled={disabled}>
        <SelectTrigger className="h-8 w-[5.5rem]" aria-label={`${labelPrefix} hours`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SLA_HOUR_OPTIONS.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option} {option === 1 ? "hr" : "hrs"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={minutes} onValueChange={onMinutesChange} disabled={disabled}>
        <SelectTrigger className="h-8 w-[5.5rem]" aria-label={`${labelPrefix} minutes`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SLA_MINUTE_OPTIONS.map((option) => {
            const value = toSlaMinuteOption(option);
            return (
              <SelectItem key={value} value={value}>
                {value} mins
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

function TicketCategoriesSettings() {
  return (
    <SettingsCard title="Ticket categories" description="Fixed categories used when logging support requests.">
      <ul className="divide-y rounded-md border">
        {TICKET_CATEGORIES.map((category) => (
          <li key={category.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-medium">{category.name}</p>
              <p className="text-xs text-subtle">{category.description}</p>
            </div>
            <Badge variant="secondary">Active</Badge>
          </li>
        ))}
      </ul>
    </SettingsCard>
  );
}

function NotificationsSettings() {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: ["notification-settings"],
    queryFn: fetchNotificationSettings,
  });

  const [form, setForm] = useState<NotificationSettings | null>(null);

  useEffect(() => {
    if (settingsQuery.data) {
      setForm(settingsQuery.data);
    }
  }, [settingsQuery.data]);

  useEffect(() => {
    if (settingsQuery.isError) {
      toast.error(getApiErrorMessage(settingsQuery.error, "Failed to load notification settings"));
    }
  }, [settingsQuery.isError, settingsQuery.error]);

  const saveMutation = useMutation({
    mutationFn: updateNotificationSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(["notification-settings"], data);
      setForm(data);
      toast.success("Notification settings saved.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to save notification settings")),
  });

  function updateEvent(key: NotificationEventSetting["key"], email: boolean) {
    setForm((current) =>
      current
        ? {
            ...current,
            events: current.events.map((event) => (event.key === key ? { ...event, email } : event)),
          }
        : current,
    );
  }

  function resetForm() {
    if (settingsQuery.data) {
      setForm(settingsQuery.data);
      toast.message("Changes discarded.");
    }
  }

  function saveChanges() {
    if (!form) return;
    saveMutation.mutate({ events: form.events });
  }

  const loading = settingsQuery.isLoading || !form;
  const delivery = form?.emailDelivery;

  return (
    <SettingsCard
      title="Notification channels"
      description="Configure which ticket events send email notifications."
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading notification settings…</p>
      ) : (
        <>
          <Alert variant={delivery?.available ? "default" : "destructive"} className="mb-5">
            {delivery?.available ? <Mail className="size-4" /> : <MailWarning className="size-4" />}
            <AlertTitle className="flex items-center gap-2">
              Email delivery
              <Badge variant={delivery?.available ? "secondary" : "destructive"}>
                {delivery?.available ? "Available" : "Unavailable"}
              </Badge>
            </AlertTitle>
            <AlertDescription>{delivery?.message}</AlertDescription>
          </Alert>

          <ul className="divide-y">
            {form.events.map((event) => (
              <li key={event.key} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <span className="text-sm font-medium">{event.label}</span>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  Email
                  <Switch
                    checked={event.email}
                    disabled={saveMutation.isPending}
                    onCheckedChange={(checked) => updateEvent(event.key, checked)}
                  />
                </label>
              </li>
            ))}
          </ul>

          {!delivery?.available ? (
            <p className="mt-4 text-xs text-muted-foreground">
              Email delivery is not active yet. You can still save preferences; notifications will send once email is
              configured.
            </p>
          ) : null}

          <div className="mt-5 flex justify-end gap-2 border-t border-border/60 pt-4">
            <Button type="button" size="sm" variant="outline" onClick={resetForm} disabled={saveMutation.isPending}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={saveChanges} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </>
      )}
    </SettingsCard>
  );
}

function UsersRolesSettings() {
  const roles = [
    ["Admin", "Full access to tickets, customers, users, reports, audit logs and settings."],
    ["Staff", "Access to assigned projects, ticket triage, replies and internal notes."],
    ["Client", "Access limited to their organization tickets, projects and profile."],
  ];

  return (
    <SettingsCard title="Roles and permissions">
      <ul className="grid gap-3">
        {roles.map(([role, description]) => (
          <li key={role} className="rounded-md border px-4 py-3">
            <p className="font-medium">{role}</p>
            <p className="mt-1 text-sm text-subtle">{description}</p>
          </li>
        ))}
      </ul>
    </SettingsCard>
  );
}
