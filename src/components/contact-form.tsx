import { useState } from "react";
import { FormActions } from "@/components/form-actions";
import { fieldInputClass, FormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { contactFormSchema, FIELD_LIMITS, constrainInternationalPhoneInput } from "@/lib/form-validation";
import { useZodForm } from "@/lib/use-zod-form";
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
  const { errors, handleBlur, handleChange, validateAll } = useZodForm(contactFormSchema);

  const [name, setName] = useState(initial?.name ?? "");
  const [jobTitle, setJobTitle] = useState(initial?.jobTitle ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [mobile, setMobile] = useState(initial?.mobile ?? "");
  const [isPrimary, setIsPrimary] = useState(initial?.isPrimary ?? false);
  const [portalAccess, setPortalAccess] = useState(initial?.portalAccess ?? false);
  const [submitting, setSubmitting] = useState(false);

  function fieldHandlers(field: string, setter: (value: string) => void) {
    return {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        let next = event.target.value;
        if (field === "mobile") {
          next = constrainInternationalPhoneInput(next);
        }
        setter(next);
        handleChange(field, next);
      },
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        handleBlur(field, event.target.value);
      },
    };
  }

  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        const validation = validateAll({ name, email, mobile, jobTitle });
        if (!validation.success) return;

        const data = validation.data;
        setSubmitting(true);
        try {
          if (mode === "create") {
            await onSubmit({
              name: data.name,
              jobTitle: data.jobTitle.trim() || undefined,
              email: data.email,
              mobile: data.mobile || undefined,
              isPrimary,
              portalAccess,
            });
          } else {
            await onSubmit({
              name: data.name,
              jobTitle: data.jobTitle.trim(),
              email: data.email,
              mobile: data.mobile || "",
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
          {...fieldHandlers("name", setName)}
          maxLength={FIELD_LIMITS.NAME_MAX}
          className={fieldInputClass(errors.name)}
        />
      </FormField>

      <FormField label="Job title" htmlFor="contact-title" error={errors.jobTitle}>
        <Input
          id="contact-title"
          value={jobTitle}
          {...fieldHandlers("jobTitle", setJobTitle)}
          maxLength={FIELD_LIMITS.TITLE_MAX}
          placeholder="Operations Manager"
          className={fieldInputClass(errors.jobTitle)}
        />
      </FormField>

      <FormField label="Email" htmlFor="contact-email" error={errors.email} required>
        <Input
          id="contact-email"
          type="text"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          maxLength={FIELD_LIMITS.EMAIL_MAX}
          value={email}
          {...fieldHandlers("email", setEmail)}
          className={fieldInputClass(errors.email)}
        />
      </FormField>

      <FormField label="Mobile" htmlFor="contact-mobile" error={errors.mobile}>
        <Input
          id="contact-mobile"
          type="text"
          inputMode="tel"
          autoComplete="tel"
          value={mobile}
          {...fieldHandlers("mobile", setMobile)}
          placeholder="+14155552671"
          className={fieldInputClass(errors.mobile)}
        />
      </FormField>

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
