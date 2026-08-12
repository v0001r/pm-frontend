import { useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { FormActions } from "@/components/form-actions";
import { fieldInputClass, FormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchDepartments, fetchDesignations, fetchTeams } from "@/lib/org";
import { internalUserSchema, FIELD_LIMITS } from "@/lib/form-validation";
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
    initial?.dateOfJoining ? initial.dateOfJoining.slice(0, 10) : "",
  );
  const [role, setRole] = useState<Role>((initial?.role as Role) ?? "Staff");
  const [status, setStatus] = useState(initial?.status ?? "Active");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const departmentsQuery = useQuery({ queryKey: ["departments"], queryFn: fetchDepartments });
  const designationsQuery = useQuery({
    queryKey: ["designations", departmentId],
    queryFn: () => fetchDesignations(departmentId || undefined),
    enabled: Boolean(departmentId),
  });
  const teamsQuery = useQuery({
    queryKey: ["teams", departmentId],
    queryFn: () => fetchTeams(departmentId || undefined),
    enabled: Boolean(departmentId),
  });
  const managersQuery = useQuery({ queryKey: ["employees"], queryFn: fetchEmployees });

  useEffect(() => {
    if (!departmentId) {
      setDesignationId("");
      setTeamId("");
    }
  }, [departmentId]);

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
        const validation = validateAll({ firstName, lastName, email, phone });
        if (!validation.success) return;

        const { firstName: validFirstName, lastName: validLastName, email: validEmail, phone: validPhone } =
          validation.data;
        setSubmitting(true);
        try {
          if (mode === "create") {
            await onSubmit({
              firstName: validFirstName,
              lastName: validLastName,
              email: validEmail,
              phone: validPhone,
              address: address.trim() || undefined,
              gender: gender || undefined,
              employeeId: employeeId.trim() || undefined,
              departmentId,
              designationId,
              teamId,
              reportingManagerId: reportingManagerId || undefined,
              dateOfJoining: dateOfJoining || undefined,
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
              address: address.trim(),
              gender: gender || undefined,
              employeeId: employeeId.trim() || undefined,
              departmentId: departmentId || undefined,
              designationId: designationId || undefined,
              teamId: teamId || undefined,
              reportingManagerId: reportingManagerId || null,
              dateOfJoining: dateOfJoining || undefined,
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
        <FormField label="First name" error={errors.firstName} required>
          <Input
            value={firstName}
            {...fieldHandlers("firstName", setFirstName)}
            maxLength={FIELD_LIMITS.NAME_MAX}
            className={fieldInputClass(errors.firstName)}
          />
        </FormField>
        <FormField label="Last name" error={errors.lastName} required>
          <Input
            value={lastName}
            {...fieldHandlers("lastName", setLastName)}
            maxLength={FIELD_LIMITS.NAME_MAX}
            className={fieldInputClass(errors.lastName)}
          />
        </FormField>
        <FormField label="Email" error={errors.email} required>
          <Input
            type="email"
            maxLength={FIELD_LIMITS.EMAIL_MAX}
            value={email}
            {...fieldHandlers("email", setEmail)}
            className={fieldInputClass(errors.email)}
          />
        </FormField>
        <FormField label="Mobile" error={errors.phone} required>
          <Input
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

      <FormSection title="Job details" description="Department, team and reporting structure">
        <div className="grid gap-1.5">
          <Label>Employee ID</Label>
          <Input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Auto-generated if empty" />
        </div>
        <div className="grid gap-1.5">
          <Label>Date of joining</Label>
          <Input type="date" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label>Department</Label>
          <Select value={departmentId} onValueChange={setDepartmentId}>
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
          <Select value={designationId} onValueChange={setDesignationId} disabled={!departmentId}>
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
          <Select value={teamId} onValueChange={setTeamId} disabled={!departmentId}>
            <SelectTrigger><SelectValue placeholder="Select team" /></SelectTrigger>
            <SelectContent>
              {(teamsQuery.data ?? []).map((t) => (
                <SelectItem key={t._id} value={t._id}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
