import { useState } from "react";
import { FormActions } from "@/components/form-actions";
import { fieldInputClass, focusFirstInvalidField, FormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  customerCreateSchema,
  customerEditSchema,
  FIELD_LIMITS,
  constrainInternationalPhoneInput,
  hasConsecutiveSpaces,
} from "@/lib/form-validation";
import { useZodForm } from "@/lib/use-zod-form";
import type { CreateCustomerPayload, Customer, UpdateCustomerPayload } from "@/lib/types";

interface CustomerFormProps {
  initial?: Partial<Customer>;
  onSubmit: (payload: CreateCustomerPayload | UpdateCustomerPayload) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isEdit?: boolean;
}

export function CustomerForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Save customer",
  isEdit = false,
}: CustomerFormProps) {
  const schema = isEdit ? customerEditSchema : customerCreateSchema;
  const { errors, handleBlur, handleChange, validateAll } = useZodForm(schema);

  const [companyName, setCompanyName] = useState(initial?.companyName ?? initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [city, setCity] = useState(initial?.city ?? "");
  const [state, setState] = useState(initial?.state ?? "");
  const [postalCode, setPostalCode] = useState(initial?.postalCode ?? "");
  const [country, setCountry] = useState(initial?.country ?? "");
  const [website, setWebsite] = useState(initial?.website ?? "");
  const [portalEnabled, setPortalEnabled] = useState(initial?.portalEnabled ?? true);
  const [contactName, setContactName] = useState(initial?.primaryContactName ?? "");
  const [contactEmail, setContactEmail] = useState(initial?.primaryContactEmail ?? "");
  const [contactMobile, setContactMobile] = useState(initial?.primaryContactMobile ?? "");
  const [contactTitle, setContactTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function formValues() {
    return isEdit
      ? { companyName, email, phone, website }
      : { companyName, email, phone, website, contactName, contactEmail, contactMobile, contactTitle };
  }

  function fieldHandlers(field: string, setter: (value: string) => void) {
    return {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        let next = e.target.value;
        if (field === "phone" || field === "contactMobile") {
          next = constrainInternationalPhoneInput(next);
        }
        setter(next);
        if (field === "companyName" && hasConsecutiveSpaces(next)) {
          handleBlur(field, next);
          return;
        }
        handleChange(field, next);
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        const next = e.target.value.trim();
        setter(next);
        handleBlur(field, next);
      },
    };
  }

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        const validation = validateAll(formValues());
        if (!validation.success) {
          focusFirstInvalidField(validation.errors, [
            "companyName",
            "email",
            "phone",
            "website",
            "contactName",
            "contactTitle",
            "contactEmail",
            "contactMobile",
          ]);
          return;
        }

        setSubmitting(true);
        try {
          if (isEdit) {
            const data = validation.data;
            await onSubmit({
              companyName: data.companyName.trim(),
              email: data.email.trim() || undefined,
              phone: data.phone || undefined,
              address,
              city,
              state,
              postalCode,
              country,
              website: data.website || undefined,
              portalEnabled,
            });
          } else {
            const data = validation.data;
            await onSubmit({
              companyName: data.companyName.trim(),
              email: data.email.trim() || undefined,
              phone: data.phone || undefined,
              address,
              city,
              state,
              postalCode,
              country,
              website: data.website || undefined,
              portalEnabled,
              primaryContact: {
                name: data.contactName,
                email: data.contactEmail,
                mobile: data.contactMobile || undefined,
                jobTitle: data.contactTitle.trim() || undefined,
              },
            });
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Company name" htmlFor="companyName" error={errors.companyName} className="sm:col-span-2" required>
          <Input
            id="companyName"
            value={companyName}
            {...fieldHandlers("companyName", setCompanyName)}
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
            className={fieldInputClass(errors.companyName)}
          />
        </FormField>
        <FormField label="Organization email" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            type="text"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            maxLength={FIELD_LIMITS.EMAIL_MAX}
            value={email}
            {...fieldHandlers("email", setEmail)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldInputClass(errors.email)}
          />
        </FormField>
        <FormField label="Phone" htmlFor="phone" error={errors.phone}>
          <Input
            id="phone"
            type="text"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            {...fieldHandlers("phone", setPhone)}
            placeholder="+14155552671"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={fieldInputClass(errors.phone)}
          />
        </FormField>
        <div className="grid gap-1.5 sm:col-span-2">
          <Label>Address</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label>Postal code</Label>
          <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label>Country</Label>
          <Input value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label>State</Label>
          <Input value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label>City</Label>
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <FormField label="Website" htmlFor="website" error={errors.website} className="sm:col-span-2">
          <Input
            id="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            value={website}
            {...fieldHandlers("website", setWebsite)}
            placeholder="https://example.com"
            aria-invalid={Boolean(errors.website)}
            aria-describedby={errors.website ? "website-error" : undefined}
            className={fieldInputClass(errors.website)}
          />
        </FormField>
        <div className="flex items-center gap-2 sm:col-span-2">
          <Switch checked={portalEnabled} onCheckedChange={setPortalEnabled} id="portal-enabled" />
          <Label htmlFor="portal-enabled">Enable customer portal</Label>
        </div>
      </div>

      {!isEdit && (
        <div className="rounded-md border p-4">
          <p className="mb-3 text-sm font-medium">Primary contact</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Name" htmlFor="contactName" error={errors.contactName} required>
              <Input
                id="contactName"
                value={contactName}
                {...fieldHandlers("contactName", setContactName)}
                maxLength={FIELD_LIMITS.NAME_MAX}
                aria-invalid={Boolean(errors.contactName)}
                aria-describedby={errors.contactName ? "contactName-error" : undefined}
                className={fieldInputClass(errors.contactName)}
              />
            </FormField>
            <FormField label="Job title" htmlFor="contactTitle" error={errors.contactTitle}>
              <Input
                id="contactTitle"
                value={contactTitle}
                {...fieldHandlers("contactTitle", setContactTitle)}
                maxLength={FIELD_LIMITS.TITLE_MAX}
                aria-invalid={Boolean(errors.contactTitle)}
                aria-describedby={errors.contactTitle ? "contactTitle-error" : undefined}
                className={fieldInputClass(errors.contactTitle)}
              />
            </FormField>
            <FormField label="Email" htmlFor="contactEmail" error={errors.contactEmail} required>
              <Input
                id="contactEmail"
                type="text"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                maxLength={FIELD_LIMITS.EMAIL_MAX}
                value={contactEmail}
                {...fieldHandlers("contactEmail", setContactEmail)}
                aria-invalid={Boolean(errors.contactEmail)}
                aria-describedby={errors.contactEmail ? "contactEmail-error" : undefined}
                className={fieldInputClass(errors.contactEmail)}
              />
            </FormField>
            <FormField label="Mobile" htmlFor="contactMobile" error={errors.contactMobile}>
              <Input
                id="contactMobile"
                type="text"
                inputMode="tel"
                autoComplete="tel"
                value={contactMobile}
                {...fieldHandlers("contactMobile", setContactMobile)}
                placeholder="+14155552671"
                aria-invalid={Boolean(errors.contactMobile)}
                aria-describedby={errors.contactMobile ? "contactMobile-error" : undefined}
                className={fieldInputClass(errors.contactMobile)}
              />
            </FormField>
          </div>
        </div>
      )}

      <FormActions
        submitLabel={submitLabel}
        submitting={submitting}
        submittingLabel="Saving…"
        onCancel={onCancel}
      />
    </form>
  );
}
