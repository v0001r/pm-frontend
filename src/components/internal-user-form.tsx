import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, Shield, User } from "lucide-react";
import { FormActions } from "@/components/form-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsPanelTrigger } from "@/components/ui/tabs";
import { fetchDepartments, fetchDesignations, fetchTeams } from "@/lib/org";
import { fetchEmployees } from "@/lib/users";
import type { CreateInternalUserPayload, InternalUser, Role, UpdateInternalUserPayload } from "@/lib/types";

interface InternalUserFormProps {
  initial?: Partial<InternalUser>;
  mode: "create" | "edit";
  onSubmit: (payload: CreateInternalUserPayload | UpdateInternalUserPayload) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function InternalUserForm({
  initial,
  mode,
  onSubmit,
  onCancel,
  submitLabel = mode === "create" ? "Create user" : "Save changes",
}: InternalUserFormProps) {
  const [tab, setTab] = useState("general");
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

  return (
    <form
      className="grid gap-5"
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitting(true);
        try {
          if (mode === "create") {
            await onSubmit({
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              email: email.trim(),
              phone: phone.trim(),
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
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              email: email.trim(),
              phone: phone.trim(),
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
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsPanelTrigger
            value="general"
            icon={<User />}
            title="General"
            description="Name, email and contact"
          />
          <TabsPanelTrigger
            value="job"
            icon={<Briefcase />}
            title="Job"
            description="Department and reporting"
          />
          <TabsPanelTrigger
            value="account"
            icon={<Shield />}
            title="Account"
            description="Role, status and access"
          />
        </TabsList>

        <TabsContent value="general" className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label>First name</Label>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="grid gap-1.5">
            <Label>Last name</Label>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="grid gap-1.5">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="grid gap-1.5">
            <Label>Mobile</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
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
        </TabsContent>

        <TabsContent value="job" className="mt-4 grid gap-4 sm:grid-cols-2">
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
        </TabsContent>

        <TabsContent value="account" className="mt-4 grid gap-4 sm:grid-cols-2">
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
        </TabsContent>
      </Tabs>

      <FormActions submitLabel={submitLabel} submitting={submitting} onCancel={onCancel} />
    </form>
  );
}
