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
import { FieldLabel } from "@/components/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getApiErrorMessage } from "@/lib/api";
import { assignProjectMember } from "@/lib/projects";
import { fetchEmployees } from "@/lib/users";
import { fullName } from "@/lib/types";

interface AssignProjectMemberDialogProps {
  projectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignedEmployeeIds: string[];
  maxHours: number;
  allocatedHours: number;
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
  const [internalHours, setInternalHours] = useState("40");
  const [externalHours, setExternalHours] = useState("0");

  const employeesQuery = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    enabled: open,
  });

  const availableEmployees = useMemo(() => {
    return (employeesQuery.data ?? []).filter(
      (employee) =>
        employee.status === "Active" && !assignedEmployeeIds.includes(employee.id),
    );
  }, [employeesQuery.data, assignedEmployeeIds]);

  useEffect(() => {
    if (!open) {
      setEmployeeId("");
      setInternalHours("40");
      setExternalHours("0");
      return;
    }

    if (!employeeId && availableEmployees[0]) {
      setEmployeeId(availableEmployees[0].id);
    }
  }, [open, availableEmployees, employeeId]);

  const mutation = useMutation({
    mutationFn: () => {
      const internal = Number(internalHours);
      const external = Number(externalHours);

      if (!employeeId) {
        throw new Error("Select an employee to assign");
      }
      if (!Number.isFinite(internal) || internal < 0) {
        throw new Error("Internal hours must be zero or greater");
      }
      if (!Number.isFinite(external) || external < 0) {
        throw new Error("External hours must be zero or greater");
      }

      const nextTotal = allocatedHours + internal + external;
      if (nextTotal > maxHours) {
        throw new Error(`Total allocated hours cannot exceed ${maxHours}h`);
      }

      return assignProjectMember(projectId, {
        employeeId,
        internalHours: internal,
        externalHours: external,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-members", projectId] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["project-activities", projectId] });
      toast.success("Member assigned successfully");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to assign member"));
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
            <Select value={employeeId} onValueChange={setEmployeeId} disabled={employeesQuery.isLoading}>
              <SelectTrigger>
                <SelectValue placeholder={employeesQuery.isLoading ? "Loading employees..." : "Select employee"} />
              </SelectTrigger>
              <SelectContent>
                {availableEmployees.length === 0 ? (
                  <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                    No available employees to assign
                  </div>
                ) : (
                  availableEmployees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {fullName(employee)} · {employee.designation || employee.role}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <FieldLabel htmlFor="internal-hours" required>Internal hours</FieldLabel>
              <Input
                id="internal-hours"
                type="number"
                min="0"
                step="0.5"
                value={internalHours}
                onChange={(event) => setInternalHours(event.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <FieldLabel htmlFor="external-hours" required>External hours</FieldLabel>
              <Input
                id="external-hours"
                type="number"
                min="0"
                step="0.5"
                value={externalHours}
                onChange={(event) => setExternalHours(event.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || availableEmployees.length === 0}
          >
            {mutation.isPending ? "Assigning..." : "Assign member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
