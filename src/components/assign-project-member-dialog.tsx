import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fieldInputClass, FieldLabel } from "@/components/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getApiErrorMessage } from "@/lib/api";
import { assignProjectMember } from "@/lib/projects";
import { fetchEmployees } from "@/lib/users";
import { employeeOptionLabel } from "@/lib/types";

const INTERNAL_HOURS_ZERO_MESSAGE = "Internal Hours must be greater than 0.";
const INTERNAL_HOURS_WHOLE_MESSAGE = "Internal Hours must be a whole number.";
const EXTERNAL_HOURS_MESSAGE = "External Hours must be a whole number greater than 0.";
const DUPLICATE_MEMBER_MESSAGE = "This employee is already assigned to this project.";

interface AssignProjectMemberDialogProps {
  projectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignedEmployeeIds: string[];
  maxHours: number;
  allocatedHours: number;
}

function parsePositiveWholeHours(value: string) {
  const trimmed = value.trim();
  if (trimmed === "") return { value: null as number | null, empty: true, decimal: false };
  if (!/^\d+$/.test(trimmed)) {
    return { value: null as number | null, empty: false, decimal: trimmed.includes(".") };
  }
  return { value: Number(trimmed), empty: false, decimal: false };
}

function constrainHoursInput(value: string) {
  return value.replace(/[^\d.]/g, "");
}

export function AssignProjectMemberDialog({
  projectId,
  open,
  onOpenChange,
  assignedEmployeeIds,
  maxHours,
  allocatedHours,
}: AssignProjectMemberDialogProps) {
  const queryClient = useQueryClient();
  const [employeeId, setEmployeeId] = useState("");
  const [internalHours, setInternalHours] = useState("");
  const [externalHours, setExternalHours] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const employeesQuery = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    enabled: open,
  });

  const assignedIdSet = useMemo(() => new Set(assignedEmployeeIds.filter(Boolean)), [assignedEmployeeIds]);

  const availableEmployees = useMemo(() => {
    return (employeesQuery.data ?? []).filter((employee) => {
      if (employee.status !== "Active") return false;
      const ids = [employee.id, employee._id].filter(Boolean) as string[];
      return !ids.some((id) => assignedIdSet.has(id));
    });
  }, [employeesQuery.data, assignedIdSet]);

  useEffect(() => {
    if (!open) {
      setEmployeeId("");
      setInternalHours("");
      setExternalHours("");
      setErrors({});
    }
  }, [open]);

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!employeeId) {
      nextErrors.employeeId = "Select an employee to assign";
    } else if (assignedIdSet.has(employeeId)) {
      nextErrors.employeeId = DUPLICATE_MEMBER_MESSAGE;
    }

    const internal = parsePositiveWholeHours(internalHours);
    if (internal.empty) {
      nextErrors.internalHours = INTERNAL_HOURS_ZERO_MESSAGE;
    } else if (internal.decimal || internal.value == null) {
      nextErrors.internalHours = INTERNAL_HOURS_WHOLE_MESSAGE;
    } else if (internal.value < 1) {
      nextErrors.internalHours = INTERNAL_HOURS_ZERO_MESSAGE;
    }

    const external = parsePositiveWholeHours(externalHours);
    if (external.empty || external.decimal || external.value == null || external.value < 1) {
      nextErrors.externalHours = EXTERNAL_HOURS_MESSAGE;
    }

    if (!nextErrors.internalHours && !nextErrors.externalHours && internal.value != null && external.value != null) {
      const nextTotal = allocatedHours + internal.value + external.value;
      if (nextTotal > maxHours) {
        nextErrors.internalHours = `Total allocated hours cannot exceed ${maxHours}h`;
      }
    }

    setErrors(nextErrors);
    return { ok: Object.keys(nextErrors).length === 0, internal: internal.value, external: external.value };
  }

  const mutation = useMutation({
    mutationFn: ({ internal, external }: { internal: number; external: number }) =>
      assignProjectMember(projectId, {
        employeeId,
        internalHours: internal,
        externalHours: external,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-members", projectId] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["project-activities", projectId] });
      toast.success("Member assigned successfully");
      onOpenChange(false);
    },
    onError: (error) => {
      const message = getApiErrorMessage(error, "Failed to assign member");
      if (message === DUPLICATE_MEMBER_MESSAGE) {
        setErrors((current) => ({ ...current, employeeId: message }));
      }
      toast.error(message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign team member</DialogTitle>
          <DialogDescription>
            Allocate internal and external hours from the project budget ({allocatedHours}h of {maxHours}h
            already allocated).
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-1.5">
            <FieldLabel required>Employee</FieldLabel>
            <Select
              value={employeeId || undefined}
              onValueChange={(value) => {
                setEmployeeId(value);
                setErrors((current) => {
                  if (!current.employeeId) return current;
                  const next = { ...current };
                  delete next.employeeId;
                  return next;
                });
              }}
              disabled={employeesQuery.isLoading}
            >
              <SelectTrigger aria-invalid={Boolean(errors.employeeId)}>
                <SelectValue placeholder={employeesQuery.isLoading ? "Loading employees..." : "Select"} />
              </SelectTrigger>
              <SelectContent>
                {availableEmployees.length === 0 ? (
                  <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                    No available employees to assign
                  </div>
                ) : (
                  availableEmployees.map((employee) => (
                    <SelectItem key={employee.id || employee._id} value={employee.id || employee._id || ""}>
                      {employeeOptionLabel(employee)}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {errors.employeeId ? (
              <p role="alert" className="text-[0.8125rem] font-medium text-destructive">
                {errors.employeeId}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <FieldLabel htmlFor="internal-hours" required>Internal hours</FieldLabel>
              <Input
                id="internal-hours"
                type="text"
                inputMode="numeric"
                value={internalHours}
                onChange={(event) => {
                  setInternalHours(constrainHoursInput(event.target.value));
                  setErrors((current) => {
                    if (!current.internalHours) return current;
                    const next = { ...current };
                    delete next.internalHours;
                    return next;
                  });
                }}
                placeholder="8"
                aria-invalid={Boolean(errors.internalHours)}
                className={fieldInputClass(errors.internalHours)}
              />
              {errors.internalHours ? (
                <p role="alert" className="text-[0.8125rem] font-medium text-destructive">
                  {errors.internalHours}
                </p>
              ) : null}
            </div>
            <div className="grid gap-1.5">
              <FieldLabel htmlFor="external-hours" required>External hours</FieldLabel>
              <Input
                id="external-hours"
                type="text"
                inputMode="numeric"
                value={externalHours}
                onChange={(event) => {
                  setExternalHours(constrainHoursInput(event.target.value));
                  setErrors((current) => {
                    if (!current.externalHours) return current;
                    const next = { ...current };
                    delete next.externalHours;
                    return next;
                  });
                }}
                placeholder="5"
                aria-invalid={Boolean(errors.externalHours)}
                className={fieldInputClass(errors.externalHours)}
              />
              {errors.externalHours ? (
                <p role="alert" className="text-[0.8125rem] font-medium text-destructive">
                  {errors.externalHours}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              const result = validate();
              if (!result.ok || result.internal == null || result.external == null) return;
              mutation.mutate({ internal: result.internal, external: result.external });
            }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Assigning..." : "Assign member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
