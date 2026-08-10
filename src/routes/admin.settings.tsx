import { useState, type Dispatch, type SetStateAction } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/guard";
import {
  SettingsCard,
  SettingsField,
  SettingsPageHeader,
  SettingsShell,
  SettingsToggleRow,
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
import { TICKET_CATEGORIES } from "@/lib/ticket-categories";
import { PRIORITIES, SLA_MATRIX } from "@/lib/types";

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

const defaultCompanyForm = {
  companyName: "Miraki Technologies",
  supportEmail: "support@miraki.io",
  contactNumber: "+1 800 555 0110",
  website: "https://miraki.io",
  address: "1200 Enterprise Blvd, Suite 400\nSan Francisco, CA 94105",
  timezone: "America/Los_Angeles",
  dateFormat: "MM/DD/YYYY",
  language: "en-US",
  currency: "USD",
  numberFormat: "1,234.56",
};

function SettingsPage() {
  const navigate = useNavigate();
  const { section = "company" } = Route.useSearch();
  const meta = settingsSectionMeta[section];

  const [companyForm, setCompanyForm] = useState(defaultCompanyForm);
  const [prefs, setPrefs] = useState({
    agentSignup: true,
    emailVerification: true,
    timeTracking: true,
    publicPortal: true,
    attachments: true,
    dataExport: true,
    twoFactor: false,
  });

  function setSection(next: SettingsSection) {
    navigate({ to: "/admin/settings", search: { section: next }, replace: true });
  }

  function updateCompany<K extends keyof typeof companyForm>(key: K, value: (typeof companyForm)[K]) {
    setCompanyForm((current) => ({ ...current, [key]: value }));
  }

  function saveChanges() {
    toast.success("Settings saved.");
  }

  function resetCompanyForm() {
    setCompanyForm(defaultCompanyForm);
    toast.message("Changes discarded.");
  }

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
                <Button type="button" size="sm" variant="outline" onClick={resetCompanyForm}>
                  Cancel
                </Button>
                <Button type="button" size="sm" onClick={saveChanges}>
                  Save changes
                </Button>
              </>
            ) : null
          }
        />

        {section === "company" ? <CompanySettings form={companyForm} prefs={prefs} onChange={updateCompany} onPrefChange={setPrefs} /> : null}
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
  prefs,
  onChange,
  onPrefChange,
}: {
  form: typeof defaultCompanyForm;
  prefs: Record<string, boolean>;
  onChange: <K extends keyof typeof defaultCompanyForm>(key: K, value: (typeof defaultCompanyForm)[K]) => void;
  onPrefChange: Dispatch<SetStateAction<typeof prefs>>;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-5">
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
            <SettingsUploadBox label="Logo" previewSrc={MIRAKI_LOGO_SRC} />
            <SettingsUploadBox label="Favicon" hint="Click to upload" />
            <SettingsField label="Company address" className="sm:col-span-2">
              <Textarea
                rows={3}
                value={form.address}
                onChange={(e) => onChange("address", e.target.value)}
              />
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

        <SettingsCard title="Regional Settings">
          <div className="grid gap-4 sm:grid-cols-3">
            <SettingsField label="Language">
              <Select value={form.language} onValueChange={(value) => onChange("language", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-GB">English (UK)</SelectItem>
                  <SelectItem value="es-ES">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Currency">
              <Select value={form.currency} onValueChange={(value) => onChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD — US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR — Euro</SelectItem>
                  <SelectItem value="GBP">GBP — British Pound</SelectItem>
                  <SelectItem value="INR">INR — Indian Rupee</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Number format">
              <Select value={form.numberFormat} onValueChange={(value) => onChange("numberFormat", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1,234.56">1,234.56</SelectItem>
                  <SelectItem value="1.234,56">1.234,56</SelectItem>
                  <SelectItem value="1 234,56">1 234,56</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
          </div>
        </SettingsCard>
      </div>

      <div className="flex flex-col gap-5">
        <SettingsCard title="System Preferences">
          <div className="divide-y">
            <SettingsToggleRow
              title="Allow agent sign up"
              description="Let support agents self-register with an invite link."
              checked={prefs.agentSignup}
              onCheckedChange={(checked) => onPrefChange((current) => ({ ...current, agentSignup: checked }))}
            />
            <SettingsToggleRow
              title="Require email verification"
              description="Users must verify email before accessing the portal."
              checked={prefs.emailVerification}
              onCheckedChange={(checked) => onPrefChange((current) => ({ ...current, emailVerification: checked }))}
            />
            <SettingsToggleRow
              title="Enable time tracking"
              description="Track hours logged against projects and tickets."
              checked={prefs.timeTracking}
              onCheckedChange={(checked) => onPrefChange((current) => ({ ...current, timeTracking: checked }))}
            />
            <SettingsToggleRow
              title="Enable public ticket portal"
              description="Allow clients to submit and track tickets online."
              checked={prefs.publicPortal}
              onCheckedChange={(checked) => onPrefChange((current) => ({ ...current, publicPortal: checked }))}
            />
            <SettingsToggleRow
              title="Allow file attachments"
              description="Clients and agents can attach files to tickets."
              checked={prefs.attachments}
              onCheckedChange={(checked) => onPrefChange((current) => ({ ...current, attachments: checked }))}
            />
            <SettingsToggleRow
              title="Data export"
              description="Allow admins to export ticket and customer data."
              checked={prefs.dataExport}
              onCheckedChange={(checked) => onPrefChange((current) => ({ ...current, dataExport: checked }))}
            />
            <SettingsToggleRow
              title="Enable two-factor authentication"
              description="Require 2FA for all admin and staff accounts."
              checked={prefs.twoFactor}
              onCheckedChange={(checked) => onPrefChange((current) => ({ ...current, twoFactor: checked }))}
            />
          </div>
        </SettingsCard>

        <section className="overflow-hidden rounded-md border border-destructive/30 bg-destructive/5 shadow-sm">
          <div className="border-b border-destructive/20 px-5 py-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="size-4" />
              <h2 className="text-base font-semibold">Danger Zone</h2>
            </div>
            <p className="mt-1 text-sm text-subtle">
              Irreversible actions that affect your entire organization.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <p className="text-sm text-muted-foreground">
              Permanently delete your organization and all associated data.
            </p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => toast.error("Account deletion is disabled in this demo.")}
            >
              Delete account
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function TicketsSlaSettings() {
  return (
    <SettingsCard title="Priority-based SLA targets" description="Response and resolution targets by priority level.">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {["Priority", "Response time", "Resolution time"].map((heading) => (
              <TableHead key={heading}>{heading}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {PRIORITIES.map((priority) => (
            <TableRow key={priority}>
              <TableCell className="font-semibold">{priority}</TableCell>
              <TableCell>{SLA_MATRIX[priority].response}</TableCell>
              <TableCell>{SLA_MATRIX[priority].resolution}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SettingsCard>
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
  const items = [
    "New ticket",
    "Ticket reply",
    "Status change",
    "Ticket assignment",
    "Ticket resolution",
    "SLA breach",
  ];

  return (
    <SettingsCard title="Notification channels" description="Email delivery connects to a provider in production.">
      <ul className="divide-y">
        {items.map((name, index) => (
          <li key={name} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <span className="text-sm font-medium">{name}</span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                Email <Switch defaultChecked={index !== 5} />
              </label>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                In-app <Switch defaultChecked />
              </label>
            </div>
          </li>
        ))}
      </ul>
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
