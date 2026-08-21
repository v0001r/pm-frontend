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
  mapCustomerApiFieldErrors,
} from "@/lib/form-validation";
import { getApiFieldErrors } from "@/lib/api";
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
  const { errors, handleBlur, handleChange, setFieldErrors, clearAllErrors, validateAll } = useZodForm(schema);

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
    const addressFields = { address, city, state, postalCode, country };
    return isEdit
      ? { companyName, email, phone, website, ...addressFields }
      : {
          companyName,
          email,
          phone,
          website,
          ...addressFields,
          contactName,
          contactEmail,
          contactMobile,
          contactTitle,
        };
  }

  function fieldHandlers(field: string, setter: (value: string) => void) {
    return {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (submitting) return;
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
        if (submitting) return;
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
            "address",
            "city",
            "state",
            "postalCode",
            "country",
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
              address: data.address || undefined,
              city: data.city || undefined,
              state: data.state || undefined,
              postalCode: data.postalCode || undefined,
              country: data.country || undefined,
              website: data.website || undefined,
              portalEnabled,
            });
          } else {
            const data = validation.data;
            await onSubmit({
              companyName: data.companyName.trim(),
              email: data.email.trim() || undefined,
              phone: data.phone || undefined,
              address: data.address || undefined,
              city: data.city || undefined,
              state: data.state || undefined,
              postalCode: data.postalCode || undefined,
              country: data.country || undefined,
              website: data.website || undefined,
              portalEnabled,
              primaryContact: {
                name: data.contactName,
                email: data.contactEmail,
                mobile: data.contactMobile || undefined,
                jobTitle: data.contactTitle || undefined,
              },
            });
          }
          clearAllErrors();
        } catch (error) {
          const fieldErrors = mapCustomerApiFieldErrors(getApiFieldErrors(error));
          if (Object.keys(fieldErrors).length > 0) {
            setFieldErrors(fieldErrors);
            focusFirstInvalidField(fieldErrors, [
              "companyName",
              "email",
              "phone",
              "website",
              "address",
              "city",
              "state",
              "postalCode",
              "country",
              "contactName",
              "contactTitle",
              "contactEmail",
              "contactMobile",
            ]);
            return;
          }
          throw error;
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
        <FormField label="Address" htmlFor="address" error={errors.address} className="sm:col-span-2">
          <Input
            id="address"
            value={address}
            {...fieldHandlers("address", setAddress)}
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "address-error" : undefined}
            className={fieldInputClass(errors.address)}
          />
        </FormField>
        <FormField label="Postal code" htmlFor="postalCode" error={errors.postalCode}>
          <Input
            id="postalCode"
            value={postalCode}
            {...fieldHandlers("postalCode", setPostalCode)}
            aria-invalid={Boolean(errors.postalCode)}
            aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
            className={fieldInputClass(errors.postalCode)}
          />
        </FormField>
        <FormField label="Country" htmlFor="country" error={errors.country}>
          <Input
            id="country"
            value={country}
            {...fieldHandlers("country", setCountry)}
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? "country-error" : undefined}
            className={fieldInputClass(errors.country)}
          />
        </FormField>
        <FormField label="State" htmlFor="state" error={errors.state}>
          <Input
            id="state"
            value={state}
            {...fieldHandlers("state", setState)}
            aria-invalid={Boolean(errors.state)}
            aria-describedby={errors.state ? "state-error" : undefined}
            className={fieldInputClass(errors.state)}
          />
        </FormField>
        <FormField label="City" htmlFor="city" error={errors.city}>
          <Input
            id="city"
            value={city}
            {...fieldHandlers("city", setCity)}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? "city-error" : undefined}
            className={fieldInputClass(errors.city)}
          />
        </FormField>
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
