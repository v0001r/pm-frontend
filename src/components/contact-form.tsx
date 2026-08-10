import { useState } from "react";
import { FormActions } from "@/components/form-actions";
import { fieldInputClass, FormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { contactFormSchema, validateForm } from "@/lib/form-validation";
import type { CreateContactPayload, CustomerContact, UpdateContactPayload } from "@/lib/types";

interface ContactFormProps {
  initial?: Partial<CustomerContact>;
  mode: "create" | "edit";
  onSubmit: (payload: CreateContactPayload | UpdateContactPayload) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function ContactForm({
  initial,
  mode,
  onSubmit,
  onCancel,
  submitLabel = mode === "create" ? "Add contact" : "Save changes",
}: ContactFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [jobTitle, setJobTitle] = useState(initial?.jobTitle ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [mobile, setMobile] = useState(initial?.mobile ?? "");
  const [isPrimary, setIsPrimary] = useState(initial?.isPrimary ?? false);
  const [portalAccess, setPortalAccess] = useState(initial?.portalAccess ?? false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function clearError(field: string) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        const validation = validateForm(contactFormSchema, { name, email });
        if (!validation.success) {
          setErrors(validation.errors);
          return;
        }
        setErrors({});
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
      <FormField label="Name" htmlFor="contact-name" error={errors.name} required>
        <Input
          id="contact-name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            clearError("name");
          }}
          className={fieldInputClass(errors.name)}
        />
      </FormField>

      <div className="grid gap-1.5">
        <Label htmlFor="contact-title">Job title</Label>
        <Input
          id="contact-title"
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
          placeholder="Operations Manager"
        />
      </div>

      <FormField label="Email" htmlFor="contact-email" error={errors.email} required>
        <Input
          id="contact-email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearError("email");
          }}
          className={fieldInputClass(errors.email)}
        />
      </FormField>

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

      <FormActions submitLabel={submitLabel} submitting={submitting} onCancel={onCancel} />
    </form>
  );
}
