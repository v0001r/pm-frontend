import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fieldInputClass, FormField } from "@/components/form-field";
import { getApiErrorMessage } from "@/lib/api";
import { projectFormSchema, validateForm } from "@/lib/form-validation";
import { createProject, fetchCustomers, updateProject } from "@/lib/projects";
import { PROJECT_STATUSES, type CreateProjectPayload, type ProjectStatus, type UpdateProjectPayload } from "@/lib/types";

export interface ProjectFormValues {
  name: string;
  customerId: string;
  description: string;
  startDate: string;
  endDate: string;
  maxHours: string;
  label: string;
  status: ProjectStatus;
}

interface ProjectFormProps {
  mode: "create" | "edit";
  projectId?: string;
  initialValues?: Partial<ProjectFormValues>;
  customerName?: string;
  onCancel: () => void;
  onSuccess: (projectId: string) => void;
}

const defaultValues: ProjectFormValues = {
  name: "",
  customerId: "",
  description: "",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: "",
  maxHours: "40",
  label: "",
  status: "Open",
};

function toDateInput(value?: string | null) {
  if (!value) return "";
  return value.slice(0, 10);
}

export function projectToFormValues(project: {
  name: string;
  customerId: string | { toString?: () => string };
  description?: string;
  startDate: string;
  endDate?: string | null;
  maxHours: number;
  label?: string;
  status: ProjectStatus;
}): ProjectFormValues {
  const customerId =
    typeof project.customerId === "string" ? project.customerId : project.customerId?.toString?.() ?? "";

  return {
    name: project.name,
    customerId,
    description: project.description ?? "",
    startDate: toDateInput(project.startDate),
    endDate: toDateInput(project.endDate),
    maxHours: String(project.maxHours),
    label: project.label ?? "",
    status: project.status,
  };
}

export function ProjectForm({ mode, projectId, initialValues, customerName, onCancel, onSuccess }: ProjectFormProps) {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<ProjectFormValues>({ ...defaultValues, ...initialValues });
  const [customerSearch, setCustomerSearch] = useState("");
  const [debouncedCustomerSearch, setDebouncedCustomerSearch] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedCustomerSearch(customerSearch.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [customerSearch]);

  const { data: customers = [], isLoading: customersLoading } = useQuery({
    queryKey: ["customers", debouncedCustomerSearch],
    queryFn: () => fetchCustomers(debouncedCustomerSearch || undefined),
  });

  const customerOptions = useMemo(() => {
    const options = [...customers];
    if (values.customerId && !options.some((customer) => customer._id === values.customerId) && customerName) {
      options.unshift({ _id: values.customerId, name: customerName, email: "" });
    }
    return options;
  }, [customers, values.customerId, customerName]);

  const mutation = useMutation({
    mutationFn: async () => {
      const maxHours = Number(values.maxHours);

      if (mode === "create") {
        const payload: CreateProjectPayload = {
          name: values.name.trim(),
          customerId: values.customerId,
          description: values.description.trim() || undefined,
          startDate: values.startDate,
          endDate: values.endDate || undefined,
          maxHours,
          label: values.label.trim() || undefined,
          status: values.status,
        };
        return createProject(payload);
      }

      const payload: UpdateProjectPayload = {
        name: values.name.trim(),
        customerId: values.customerId,
        description: values.description.trim(),
        startDate: values.startDate,
        endDate: values.endDate ? values.endDate : null,
        maxHours,
        label: values.label.trim(),
        status: values.status,
      };
      return updateProject(projectId!, payload);
    },
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", project._id] });
      toast.success(mode === "create" ? "Project created successfully" : "Project updated successfully");
      onSuccess(project._id);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to save project"));
    },
  });

  function updateField<K extends keyof ProjectFormValues>(field: K, value: ProjectFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  return (
    <form
      className="grid gap-5 p-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const validation = validateForm(projectFormSchema, {
          name: values.name,
          customerId: values.customerId,
          startDate: values.startDate,
          maxHours: values.maxHours,
          endDate: values.endDate,
        });
        if (!validation.success) {
          setErrors(validation.errors);
          return;
        }
        setErrors({});
        mutation.mutate();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Project name" htmlFor="project-name" error={errors.name} className="sm:col-span-2">
          <Input
            id="project-name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Website redesign"
            maxLength={120}
            className={fieldInputClass(errors.name)}
          />
        </FormField>

        <FormField label="Customer" htmlFor="customer-search" error={errors.customerId} className="sm:col-span-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="customer-search"
              value={customerSearch}
              onChange={(event) => setCustomerSearch(event.target.value)}
              placeholder="Search customers by name or email"
              className="mb-2 h-9 pl-9"
            />
          </div>
          <Select value={values.customerId} onValueChange={(value) => updateField("customerId", value)}>
            <SelectTrigger className={fieldInputClass(errors.customerId)}>
              <SelectValue placeholder={customersLoading ? "Loading customers..." : "Select customer"} />
            </SelectTrigger>
            <SelectContent>
              {customerOptions.length === 0 ? (
                <div className="px-2 py-6 text-center text-sm text-muted-foreground">No customers found</div>
              ) : (
                customerOptions.map((customer) => (
                  <SelectItem key={customer._id} value={customer._id}>
                    {customer.name}
                    {customer.email ? ` · ${customer.email}` : ""}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Start date" htmlFor="start-date" error={errors.startDate}>
          <Input
            id="start-date"
            type="date"
            value={values.startDate}
            onChange={(event) => updateField("startDate", event.target.value)}
            className={fieldInputClass(errors.startDate)}
          />
        </FormField>

        <FormField label="End date" htmlFor="end-date" error={errors.endDate}>
          <Input
            id="end-date"
            type="date"
            value={values.endDate}
            onChange={(event) => updateField("endDate", event.target.value)}
            className={fieldInputClass(errors.endDate)}
          />
        </FormField>

        <FormField label="Maximum hours" htmlFor="max-hours" error={errors.maxHours}>
          <Input
            id="max-hours"
            type="number"
            value={values.maxHours}
            onChange={(event) => updateField("maxHours", event.target.value)}
            className={fieldInputClass(errors.maxHours)}
          />
        </FormField>

        <div className="grid gap-1.5">
          <Label>Status</Label>
          <Select value={values.status} onValueChange={(value) => updateField("status", value as ProjectStatus)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={values.label}
            onChange={(event) => updateField("label", event.target.value)}
            placeholder="High priority, internal, etc."
            maxLength={80}
          />
        </div>

        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={values.description}
            onChange={(event) => updateField("description", event.target.value)}
            rows={5}
            placeholder="Scope, goals, and key deliverables for this project."
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" size="sm" variant="outline" onClick={onCancel} disabled={mutation.isPending}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : mode === "create" ? "Create project" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
