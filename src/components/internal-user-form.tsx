import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { FormActions } from "@/components/form-actions";
import { fieldInputClass, focusFirstInvalidField, FormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { fetchDepartments, fetchDesignations, fetchTeams } from "@/lib/org";
import {
  internalUserSchema,
  FIELD_LIMITS,
  constrainPersonNameInput,
  constrainMobileInput,
  constrainFreeTextInput,
  hasConsecutiveSpaces,
  hasAnyWhitespace,
  constrainDdMmYyyyInput,
  isoToDdMmYyyy,
  ddMmYyyyToIso,
  isValidMobilePrefix,
  mapInternalUserApiFieldErrors,
} from "@/lib/form-validation";
import { useZodForm } from "@/lib/use-zod-form";
import { PasswordInput } from "@/components/password";
import { fetchEmployees } from "@/lib/users";
import { getApiFieldErrors } from "@/lib/api";
import { fullName, type CreateInternalUserPayload, type InternalUser, type Role, type UpdateInternalUserPayload, type User } from "@/lib/types";
import { cn } from "@/lib/utils";

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

function managerId(user: Pick<User, "id" | "_id">) {
  return user.id || user._id || "";
}

function ReportingManagerSearch({
  value,
  onChange,
  managers,
  excludeIds,
}: {
  value: string;
  onChange: (id: string) => void;
  managers: User[];
  excludeIds: string[];
}) {
  const [open, setOpen] = useState(false);
  const eligible = useMemo(() => {
    const active = managers.filter((manager) => {
      const id = managerId(manager);
      if (!id || excludeIds.includes(id)) return false;
      return manager.status === "Active";
    });
    const selectedManager = managers.find((manager) => managerId(manager) === value);
    if (selectedManager && !active.some((manager) => managerId(manager) === value)) {
      return [selectedManager, ...active];
    }
    return active;
  }, [managers, excludeIds, value]);
  const selected = managers.find((manager) => managerId(manager) === value);

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Reporting manager"
          className="h-9 w-full justify-between font-normal"
        >
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected ? fullName(selected) : value ? "Selected manager" : "Search reporting manager"}
          </span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-70 w-(--radix-popover-trigger-width) p-0" align="start">
        <Command>
          <CommandInput placeholder="Search by name, email or employee ID" />
          <CommandList>
            <CommandEmpty>No matching users found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="none"
                onSelect={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                <Check className={cn("size-4", value ? "opacity-0" : "opacity-100")} />
                None
              </CommandItem>
              {eligible.map((manager) => {
                const id = managerId(manager);
                const name = fullName(manager);
                return (
                  <CommandItem
                    key={id}
                    value={`${name} ${manager.email} ${manager.employeeId ?? ""} ${id}`}
                    onSelect={() => {
                      onChange(id);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn("size-4", value === id ? "opacity-100" : "opacity-0")} />
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate">{name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {[manager.employeeId, manager.email].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
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
  const { errors, handleBlur, handleChange, setFieldErrors, validateAll } = useZodForm(internalUserSchema);

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
          if (next.length > FIELD_LIMITS.NAME_MAX) {
            setter(next.slice(0, FIELD_LIMITS.NAME_MAX));
            handleBlur(field, next);
            return;
          }
        } else if (field === "email") {
          next = constrainFreeTextInput(next);
        }
        setter(next);
        if (field === "employeeId") {
          if (next.length > 0 && (next.trim() === "" || hasAnyWhitespace(next))) {
            handleBlur(field, next);
            return;
          }
        } else if (field === "address") {
          if (next.length > 0 && (next.trim() === "" || hasConsecutiveSpaces(next))) {
            handleBlur(field, next);
            return;
          }
        } else if (hasConsecutiveSpaces(next)) {
          handleBlur(field, next);
          return;
        }
        handleChange(field, next);
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (field === "employeeId") {
          if (raw.length > 0 && (raw.trim() === "" || hasAnyWhitespace(raw))) {
            handleBlur(field, raw);
            return;
          }
        }
        if (field === "address") {
          if (raw.length > 0 && (raw.trim() === "" || hasConsecutiveSpaces(raw))) {
            handleBlur(field, raw);
            return;
          }
        }
        const next = raw.trim();
        setter(next);
        handleBlur(field, next);
      },
    };
  }

  function onPhoneChange(raw: string) {
    const digits = constrainMobileInput(raw);
    if (!isValidMobilePrefix(digits)) {
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
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const nextDigits = `${phone.slice(0, start)}${event.key}${phone.slice(end)}`.replace(/\D/g, "");
    if (nextDigits.length > 0 && !/^[6-9]/.test(nextDigits)) {
      event.preventDefault();
      handleBlur("phone", nextDigits);
      return;
    }
    if (phone.length >= FIELD_LIMITS.MOBILE_LENGTH && end === start) {
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
            "dateOfJoining",
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
        const optionalOrNull = (value: string) => (value.trim() ? value : null);
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
              address: optionalOrNull(validAddress),
              gender: optionalOrNull(gender),
              employeeId: optionalOrNull(validEmployeeId),
              departmentId: departmentId || undefined,
              designationId: designationId || undefined,
              teamId: teamId || undefined,
              reportingManagerId: reportingManagerId || null,
              dateOfJoining: optionalOrNull(isoJoiningDate),
              role,
              status: status as UpdateInternalUserPayload["status"],
            });
          }
        } catch (error) {
          const fieldErrors = mapInternalUserApiFieldErrors(getApiFieldErrors(error));
          if (Object.keys(fieldErrors).length > 0) {
            setFieldErrors(fieldErrors);
            focusFirstInvalidField(fieldErrors, [
              "firstName",
              "lastName",
              "email",
              "phone",
              "address",
              "employeeId",
              "dateOfJoining",
            ]);
            return;
          }
          throw error;
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
            maxLength={FIELD_LIMITS.NAME_MAX + 1}
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
            maxLength={FIELD_LIMITS.NAME_MAX + 1}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={fieldInputClass(errors.lastName)}
          />
        </FormField>
        <FormField label="Email" htmlFor="email" error={errors.email} required>
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
          <ReportingManagerSearch
            value={reportingManagerId}
            onChange={setReportingManagerId}
            managers={managersQuery.data ?? []}
            excludeIds={[initial?.id, initial?._id].filter((id): id is string => Boolean(id))}
          />
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
            <PasswordInput
              value={temporaryPassword}
              onChange={(e) => setTemporaryPassword(e.target.value)}
              autoComplete="new-password"
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
