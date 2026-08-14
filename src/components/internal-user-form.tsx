import { useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { FormActions } from "@/components/form-actions";
import { fieldInputClass, focusFirstInvalidField, FormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchDepartments, fetchDesignations, fetchTeams } from "@/lib/org";
import {
  internalUserSchema,
  FIELD_LIMITS,
  constrainPersonNameInput,
  constrainMobileInput,
  constrainFreeTextInput,
  hasConsecutiveSpaces,
  constrainDdMmYyyyInput,
  isoToDdMmYyyy,
  ddMmYyyyToIso,
  isValidMobilePrefix,
} from "@/lib/form-validation";
import { useZodForm } from "@/lib/use-zod-form";
import { fetchEmployees } from "@/lib/users";
import type { CreateInternalUserPayload, InternalUser, Role, UpdateInternalUserPayload } from "@/lib/types";

interface InternalUserFormProps {
  initial?: Partial<InternalUser>;
  mode: "create" | "edit";
  onSubmit: (payload: CreateInternalUserPayload | UpdateInternalUserPayload) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

function FormSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="grid gap-4 rounded-md border border-border/60 p-4">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export function InternalUserForm({
  initial,
  mode,
  onSubmit,
  onCancel,
  submitLabel = mode === "create" ? "Create user" : "Save changes",
}: InternalUserFormProps) {
  const isEdit = mode === "edit";
  const { errors, handleBlur, handleChange, validateAll } = useZodForm(internalUserSchema);

  const [firstName, setFirstName] = useState(initial?.firstName ?? "");
  const [lastName, setLastName] = useState(initial?.lastName ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [gender, setGender] = useState(initial?.gender ?? "");
  const [employeeId, setEmployeeId] = useState(initial?.employeeId ?? "");
  const [departmentId, setDepartmentId] = useState(initial?.departmentId ?? "");
  const [designationId, setDesignationId] = useState(initial?.designationId ?? "");
  const [teamId, setTeamId] = useState(initial?.teamId ?? "");
  const [reportingManagerId, setReportingManagerId] = useState(initial?.reportingManagerId ?? "");
  const [dateOfJoining, setDateOfJoining] = useState(
    initial?.dateOfJoining ? isoToDdMmYyyy(initial.dateOfJoining) : "",
  );
  const [role, setRole] = useState<Role>((initial?.role as Role) ?? "Staff");
  const [status, setStatus] = useState(initial?.status ?? "Active");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [dateError, setDateError] = useState("");

  const departmentsQuery = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
    enabled: isEdit,
  });
  const designationsQuery = useQuery({
    queryKey: ["designations", departmentId],
    queryFn: () => fetchDesignations(departmentId || undefined),
    enabled: isEdit && Boolean(departmentId),
  });
  const teamsQuery = useQuery({
    queryKey: ["teams", departmentId],
    queryFn: () => fetchTeams(departmentId || undefined),
    enabled: isEdit && Boolean(departmentId),
  });
  const managersQuery = useQuery({ queryKey: ["employees"], queryFn: fetchEmployees });

  useEffect(() => {
    if (!isEdit || departmentId) return;
    setDesignationId("");
    setTeamId("");
  }, [departmentId, isEdit]);

  function fieldHandlers(field: string, setter: (value: string) => void) {
    return {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        let next = e.target.value;
        if (field === "firstName" || field === "lastName") {
          next = constrainPersonNameInput(next);
        } else if (field === "address" || field === "employeeId" || field === "email") {
          next = constrainFreeTextInput(next);
        }
        setter(next);
        if (hasConsecutiveSpaces(next)) {
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

  function onPhoneChange(raw: string) {
    const digits = constrainMobileInput(raw);
    if (!isValidMobilePrefix(digits)) {
      setPhone("");
      handleBlur("phone", digits);
      return;
    }
    setPhone(digits);
    if (digits.length === FIELD_LIMITS.MOBILE_LENGTH) {
      handleBlur("phone", digits);
      return;
    }
    if (digits.length > 0 && errors["phone"]) {
      handleBlur("phone", digits);
      return;
    }
    handleChange("phone", digits);
  }

  function onPhoneKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const navigationKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"];
    if (navigationKeys.includes(event.key)) return;
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
      return;
    }
    const input = event.currentTarget;
    const selected = (input.selectionEnd ?? 0) - (input.selectionStart ?? 0);
    if (phone.length >= FIELD_LIMITS.MOBILE_LENGTH && selected === 0) {
      event.preventDefault();
    }
  }

  function onPhonePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    onPhoneChange(event.clipboardData.getData("text"));
  }

  function onJoiningDateChange(raw: string) {
    const next = constrainDdMmYyyyInput(raw);
    setDateOfJoining(next);
    if (!dateError) return;
    setDateError(next === "" || ddMmYyyyToIso(next) ? "" : "Please enter a valid date as DD-MM-YYYY");
  }

  function joiningDateIso() {
    if (!dateOfJoining.trim()) return "";
    return ddMmYyyyToIso(dateOfJoining);
  }

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        const isoJoiningDate = joiningDateIso();
        if (dateOfJoining.trim() && !isoJoiningDate) {
          setDateError("Please enter a valid date as DD-MM-YYYY");
          focusFirstInvalidField({ dateOfJoining: "invalid" }, ["dateOfJoining"]);
          return;
        }
        setDateError("");
        const validation = validateAll({ firstName, lastName, email, phone, address, employeeId });
        if (!validation.success) {
          focusFirstInvalidField(validation.errors, [
            "firstName",
            "lastName",
            "email",
            "phone",
            "address",
            "employeeId",
          ]);
          return;
        }

        const {
          firstName: validFirstName,
          lastName: validLastName,
          email: validEmail,
          phone: validPhone,
          address: validAddress,
          employeeId: validEmployeeId,
        } = validation.data;
        setSubmitting(true);
        try {
          if (mode === "create") {
            await onSubmit({
              firstName: validFirstName,
              lastName: validLastName,
              email: validEmail,
              phone: validPhone,
              address: validAddress || undefined,
              gender: gender || undefined,
              employeeId: validEmployeeId || undefined,
              reportingManagerId: reportingManagerId || undefined,
              dateOfJoining: isoJoiningDate || undefined,
              role,
              status: status as CreateInternalUserPayload["status"],
              temporaryPassword: temporaryPassword.trim() || undefined,
              sendInvitation: true,
            });
          } else {
            await onSubmit({
              firstName: validFirstName,
              lastName: validLastName,
              email: validEmail,
              phone: validPhone,
              address: validAddress,
              gender: gender || undefined,
              employeeId: validEmployeeId || undefined,
              departmentId: departmentId || undefined,
              designationId: designationId || undefined,
              teamId: teamId || undefined,
              reportingManagerId: reportingManagerId || null,
              dateOfJoining: isoJoiningDate || undefined,
              role,
              status: status as UpdateInternalUserPayload["status"],
            });
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <FormSection title="Personal information" description="Name, email and contact details">
        <FormField label="First name" htmlFor="firstName" error={errors.firstName} required>
          <Input
            id="firstName"
            value={firstName}
            {...fieldHandlers("firstName", setFirstName)}
            maxLength={FIELD_LIMITS.NAME_MAX}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={fieldInputClass(errors.firstName)}
          />
        </FormField>
        <FormField label="Last name" htmlFor="lastName" error={errors.lastName} required>
          <Input
            id="lastName"
            value={lastName}
            {...fieldHandlers("lastName", setLastName)}
            maxLength={FIELD_LIMITS.NAME_MAX}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={fieldInputClass(errors.lastName)}
          />
        </FormField>
        <FormField label="Email" htmlFor="email" error={errors.email} required>
          <Input
            id="email"
            type="email"
            maxLength={FIELD_LIMITS.EMAIL_MAX}
            value={email}
            {...fieldHandlers("email", setEmail)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldInputClass(errors.email)}
          />
        </FormField>
        <FormField label="Mobile" htmlFor="phone" error={errors.phone} required>
          <Input
            id="phone"
            type="text"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            onKeyDown={onPhoneKeyDown}
            onPaste={onPhonePaste}
            onBlur={() => handleBlur("phone", phone)}
            maxLength={FIELD_LIMITS.MOBILE_LENGTH}
            placeholder="9876543210"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={fieldInputClass(errors.phone)}
          />
        </FormField>
        <FormField label="Address" htmlFor="address" error={errors["address"]} className="sm:col-span-2">
          <Input
            id="address"
            value={address}
            {...fieldHandlers("address", setAddress)}
            aria-invalid={Boolean(errors["address"])}
            aria-describedby={errors["address"] ? "address-error" : undefined}
            className={fieldInputClass(errors["address"])}
          />
        </FormField>
        <div className="grid gap-1.5">
          <Label>Gender</Label>
          <Select value={gender || "none"} onValueChange={(v) => setGender(v === "none" ? "" : v)}>
            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Not specified</SelectItem>
              {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FormSection>

      <FormSection
        title="Job details"
        description={isEdit ? "Department, team and reporting structure" : "Employee details and reporting structure"}
      >
        <FormField label="Employee ID" htmlFor="employeeId" error={errors["employeeId"]}>
          <Input
            id="employeeId"
            value={employeeId}
            {...fieldHandlers("employeeId", setEmployeeId)}
            placeholder="Auto-generated if empty"
            aria-invalid={Boolean(errors["employeeId"])}
            aria-describedby={errors["employeeId"] ? "employeeId-error" : undefined}
            className={fieldInputClass(errors["employeeId"])}
          />
        </FormField>
        <FormField label="Date of joining" htmlFor="dateOfJoining" error={dateError || undefined}>
          <Input
            id="dateOfJoining"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="DD-MM-YYYY"
            maxLength={10}
            value={dateOfJoining}
            onChange={(e) => onJoiningDateChange(e.target.value)}
            onBlur={() => {
              if (!dateOfJoining.trim()) {
                setDateError("");
                return;
              }
              setDateError(ddMmYyyyToIso(dateOfJoining) ? "" : "Please enter a valid date as DD-MM-YYYY");
            }}
            aria-invalid={Boolean(dateError)}
            aria-describedby={dateError ? "dateOfJoining-error" : undefined}
            className={fieldInputClass(dateError || undefined)}
          />
        </FormField>
        {isEdit ? (
          <>
            <div className="grid gap-1.5">
              <Label>Department</Label>
              <Select value={departmentId} onValueChange={setDepartmentId} disabled>
                <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>
                  {(departmentsQuery.data ?? []).map((d) => (
                    <SelectItem key={d._id} value={d._id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>Designation</Label>
              <Select value={designationId} onValueChange={setDesignationId} disabled>
                <SelectTrigger><SelectValue placeholder="Select designation" /></SelectTrigger>
                <SelectContent>
                  {(designationsQuery.data ?? []).map((d) => (
                    <SelectItem key={d._id} value={d._id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>Team</Label>
              <Select value={teamId} onValueChange={setTeamId} disabled>
                <SelectTrigger><SelectValue placeholder="Select team" /></SelectTrigger>
                <SelectContent>
                  {(teamsQuery.data ?? []).map((t) => (
                    <SelectItem key={t._id} value={t._id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        ) : null}
        <div className="grid gap-1.5">
          <Label>Reporting manager</Label>
          <Select value={reportingManagerId || "none"} onValueChange={(v) => setReportingManagerId(v === "none" ? "" : v)}>
            <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {(managersQuery.data ?? [])
                .filter((m) => m.id !== initial?.id && m._id !== initial?._id)
                .map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.name ?? `${m.firstName} ${m.lastName}`}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </FormSection>

      <FormSection title="Account" description="Role, status and access">
        <div className="grid gap-1.5">
          <Label>Role</Label>
          <Select value={role} onValueChange={(v) => setRole(v as Role)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Active", "Inactive", "Suspended"].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {mode === "create" && (
          <div className="grid gap-1.5 sm:col-span-2">
            <Label>Temporary password</Label>
            <Input
              type="password"
              value={temporaryPassword}
              onChange={(e) => setTemporaryPassword(e.target.value)}
              placeholder="Auto-generated if empty"
            />
            <p className="text-xs text-muted-foreground">An invitation email will be sent automatically.</p>
          </div>
        )}
      </FormSection>

      <FormActions submitLabel={submitLabel} submitting={submitting} onCancel={onCancel} />
    </form>
  );
}
