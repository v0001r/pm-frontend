import { useState } from "react";
import { FormActions } from "@/components/form-actions";
import { fieldInputClass, FormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { customerCreateSchema, customerEditSchema, validateForm } from "@/lib/form-validation";
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
      className="grid gap-5"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        const validation = validateForm(
          isEdit ? customerEditSchema : customerCreateSchema,
          isEdit
            ? { companyName, email }
            : { companyName, email, contactName, contactEmail },
        );
        if (!validation.success) {
          setErrors(validation.errors);
          return;
        }
        setErrors({});
        setSubmitting(true);
        try {
          if (isEdit) {
            await onSubmit({
              companyName: companyName.trim(),
              email: email.trim() || undefined,
              phone,
              address,
              city,
              state,
              postalCode,
              country,
              website: website || undefined,
              portalEnabled,
            });
          } else {
            await onSubmit({
              companyName: companyName.trim(),
              email: email.trim() || undefined,
              phone,
              address,
              city,
              state,
              postalCode,
              country,
              website: website || undefined,
              portalEnabled,
              primaryContact: {
                name: contactName.trim(),
                email: contactEmail.trim(),
                mobile: contactMobile,
                jobTitle: contactTitle,
              },
            });
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Company name" error={errors.companyName} className="sm:col-span-2">
          <Input
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
              clearError("companyName");
            }}
            className={fieldInputClass(errors.companyName)}
          />
        </FormField>
        <FormField label="Organization email" error={errors.email}>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            className={fieldInputClass(errors.email)}
          />
        </FormField>
        <div className="grid gap-1.5">
          <Label>Phone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
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
            <FormField label="Name" error={errors.contactName}>
              <Input
                value={contactName}
                onChange={(e) => {
                  setContactName(e.target.value);
                  clearError("contactName");
                }}
                className={fieldInputClass(errors.contactName)}
              />
            </FormField>
            <div className="grid gap-1.5">
              <Label>Job title</Label>
              <Input value={contactTitle} onChange={(e) => setContactTitle(e.target.value)} />
            </div>
            <FormField label="Email" error={errors.contactEmail}>
              <Input
                value={contactEmail}
                onChange={(e) => {
                  setContactEmail(e.target.value);
                  clearError("contactEmail");
                }}
                className={fieldInputClass(errors.contactEmail)}
              />
            </FormField>
            <div className="grid gap-1.5">
              <Label>Mobile</Label>
              <Input value={contactMobile} onChange={(e) => setContactMobile(e.target.value)} />
            </div>
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
