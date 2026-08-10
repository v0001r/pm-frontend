import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { CreateContactPayload, CustomerContact, UpdateContactPayload } from "@/lib/types";

interface ContactFormProps {
  initial?: Partial<CustomerContact>;
  mode: "create" | "edit";
  onSubmit: (payload: CreateContactPayload | UpdateContactPayload) => Promise<void>;
  submitLabel?: string;
}

export function ContactForm({
  initial,
  mode,
  onSubmit,
  submitLabel = mode === "create" ? "Add contact" : "Save changes",
}: ContactFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [jobTitle, setJobTitle] = useState(initial?.jobTitle ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [mobile, setMobile] = useState(initial?.mobile ?? "");
  const [isPrimary, setIsPrimary] = useState(initial?.isPrimary ?? false);
  const [portalAccess, setPortalAccess] = useState(initial?.portalAccess ?? false);
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="grid gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitting(true);
        try {
          if (mode === "create") {
            await onSubmit({
              name: name.trim(),
              jobTitle: jobTitle.trim() || undefined,
              email: email.trim(),
              mobile: mobile.trim() || undefined,
              isPrimary,
              portalAccess,
            });
          } else {
            await onSubmit({
              name: name.trim(),
              jobTitle: jobTitle.trim(),
              email: email.trim(),
              mobile: mobile.trim(),
              portalAccess,
            });
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className="grid gap-1.5">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          minLength={2}
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="contact-title">Job title</Label>
        <Input
          id="contact-title"
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
          placeholder="Operations Manager"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="contact-mobile">Mobile</Label>
        <Input
          id="contact-mobile"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          placeholder="+1 555 0100"
        />
      </div>

      {mode === "create" && (
        <div className="flex items-center justify-between rounded-lg border px-3 py-2">
          <div>
            <Label htmlFor="contact-primary">Primary contact</Label>
            <p className="text-xs text-muted-foreground">Mark as the main point of contact</p>
          </div>
          <Switch id="contact-primary" checked={isPrimary} onCheckedChange={setIsPrimary} />
        </div>
      )}

      <div className="flex items-center justify-between rounded-lg border px-3 py-2">
        <div>
          <Label htmlFor="contact-portal">Portal access</Label>
          <p className="text-xs text-muted-foreground">Allow this contact to log into the portal</p>
        </div>
        <Switch id="contact-portal" checked={portalAccess} onCheckedChange={setPortalAccess} />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
