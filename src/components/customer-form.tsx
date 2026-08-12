import { useState } from "react";
import { FormActions } from "@/components/form-actions";
import { fieldInputClass, FormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { customerCreateSchema, customerEditSchema, FIELD_LIMITS } from "@/lib/form-validation";
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
      ? { companyName, email, phone }
      : { companyName, email, phone, contactName, contactEmail, contactMobile, contactTitle };
  }

  function fieldHandlers(field: string, setter: (value: string) => void) {
    return {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;
        setter(next);
        handleChange(field, next);
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        handleBlur(field, e.target.value);
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
        if (!validation.success) return;

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
              website: website || undefined,
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
              website: website || undefined,
              portalEnabled,
              primaryContact: {
                name: data.contactName,
                email: data.contactEmail,
                mobile: data.contactMobile,
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
        <FormField label="Company name" error={errors.companyName} className="sm:col-span-2" required>
          <Input
            value={companyName}
            {...fieldHandlers("companyName", setCompanyName)}
            className={fieldInputClass(errors.companyName)}
          />
        </FormField>
        <FormField label="Organization email" error={errors.email}>
          <Input
            type="email"
            maxLength={FIELD_LIMITS.EMAIL_MAX}
            value={email}
            {...fieldHandlers("email", setEmail)}
            className={fieldInputClass(errors.email)}
          />
        </FormField>
        <FormField label="Phone" error={errors.phone}>
          <Input
            type="text"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            {...fieldHandlers("phone", setPhone)}
            maxLength={FIELD_LIMITS.MOBILE_LENGTH + 4}
            placeholder="9876543210"
            className={fieldInputClass(errors.phone)}
          />
        </FormField>
        <div className="grid gap-1.5 sm:col-span-2">
          <Label>Address</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label>City</Label>
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label>State</Label>
          <Input value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label>Postal code</Label>
          <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label>Country</Label>
          <Input value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div className="grid gap-1.5 sm:col-span-2">
          <Label>Website</Label>
          <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" />
        </div>
        <div className="flex items-center gap-2 sm:col-span-2">
          <Switch checked={portalEnabled} onCheckedChange={setPortalEnabled} id="portal-enabled" />
          <Label htmlFor="portal-enabled">Enable customer portal</Label>
        </div>
      </div>

      {!isEdit && (
        <div className="rounded-md border p-4">
          <p className="mb-3 text-sm font-medium">Primary contact</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Name" error={errors.contactName} required>
              <Input
                value={contactName}
                {...fieldHandlers("contactName", setContactName)}
                maxLength={FIELD_LIMITS.NAME_MAX}
                className={fieldInputClass(errors.contactName)}
              />
            </FormField>
            <FormField label="Job title" error={errors.contactTitle}>
              <Input
                value={contactTitle}
                {...fieldHandlers("contactTitle", setContactTitle)}
                maxLength={FIELD_LIMITS.TITLE_MAX}
                className={fieldInputClass(errors.contactTitle)}
              />
            </FormField>
            <FormField label="Email" error={errors.contactEmail} required>
              <Input
                type="email"
                maxLength={FIELD_LIMITS.EMAIL_MAX}
                value={contactEmail}
                {...fieldHandlers("contactEmail", setContactEmail)}
                className={fieldInputClass(errors.contactEmail)}
              />
            </FormField>
            <FormField label="Mobile" error={errors.contactMobile} required>
              <Input
                type="text"
                inputMode="numeric"
                autoComplete="tel"
                value={contactMobile}
                {...fieldHandlers("contactMobile", setContactMobile)}
                maxLength={FIELD_LIMITS.MOBILE_LENGTH + 4}
                placeholder="9876543210"
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
