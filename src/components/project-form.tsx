import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { fieldInputClass, FormField } from "@/components/form-field";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api";
import { FIELD_LIMITS, projectFormSchema, validateForm } from "@/lib/form-validation";
import { createProject, fetchProjectCustomerOptions, updateProject } from "@/lib/projects";
import { PROJECT_STATUSES, type CreateProjectPayload, type Customer, type ProjectStatus, type UpdateProjectPayload } from "@/lib/types";
import { cn } from "@/lib/utils";

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
  startDate: "",
  endDate: "",
  maxHours: "",
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

function CustomerSearchSelect({
  value,
  onChange,
  customerName,
  options,
  loading,
  error,
  search,
  onSearchChange,
}: {
  value: string;
  onChange: (customerId: string) => void;
  customerName?: string | undefined;
  options: Customer[];
  loading: boolean;
  error?: string | undefined;
  search: string;
  onSearchChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((customer) => customer._id === value);
  const displayName = selected ? selected.companyName || selected.name : customerName ?? "";

  return (
    <div className="flex items-center gap-1.5">
      <Popover
        modal
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (next) onSearchChange("");
        }}
      >
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select customer"
            className={cn("h-9 min-w-0 flex-1 justify-between font-normal", fieldInputClass(error))}
          >
            <span className={cn("truncate", !displayName && "text-muted-foreground")}>
              {displayName || "Search customer"}
            </span>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-70 w-(--radix-popover-trigger-width) p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search by company, email or ID"
            value={search}
            onValueChange={onSearchChange}
          />
          <CommandList>
            {loading ? (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">Searching customers…</div>
            ) : options.length === 0 ? (
              <CommandEmpty>No customers found</CommandEmpty>
            ) : (
              <CommandGroup>
                {options.map((customer) => (
                  <CommandItem
                    key={customer._id}
                    value={`${customer.companyName || customer.name} ${customer.email ?? ""} ${customer._id}`}
                    onSelect={() => {
                      onChange(customer._id);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn("size-4", value === customer._id ? "opacity-100" : "opacity-0")} />
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate">{customer.companyName || customer.name}</span>
                      {customer.email ? (
                        <span className="truncate text-xs text-muted-foreground">{customer.email}</span>
                      ) : null}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
        </PopoverContent>
      </Popover>
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9 shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="Clear customer selection"
          title="Clear selection"
          onClick={() => onChange("")}
        >
          <X className="size-4" />
        </Button>
      ) : null}
    </div>
  );
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

  const { data: customers = [], isLoading: customersLoading, isFetching: customersFetching } = useQuery({
    queryKey: ["customers", "project-picker", debouncedCustomerSearch],
    queryFn: () => fetchProjectCustomerOptions(debouncedCustomerSearch || undefined),
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  });

  const customerOptions = useMemo(() => {
    const options = customersFetching ? [] : [...customers];
    if (
      values.customerId &&
      !options.some((customer) => customer._id === values.customerId) &&
      customerName
    ) {
      options.unshift({
        _id: values.customerId,
        name: customerName,
        companyName: customerName,
        email: "",
      } as Customer);
    }
    return options;
  }, [customers, customersFetching, values.customerId, customerName]);

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
      const fieldErrors = getApiFieldErrors(error);
      if (Object.keys(fieldErrors).length > 0) {
        setErrors((current) => ({ ...current, ...fieldErrors }));
        return;
      }
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
        <FormField label="Project name" htmlFor="project-name" error={errors.name} className="sm:col-span-2" required>
          <Input
            id="project-name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            onBlur={(event) => updateField("name", event.target.value.trim())}
            placeholder="Website redesign"
            maxLength={FIELD_LIMITS.PROJECT_NAME_MAX}
            className={fieldInputClass(errors.name)}
          />
        </FormField>

        <FormField label="Customer" htmlFor="customer-search" error={errors.customerId} className="sm:col-span-2" required>
          <CustomerSearchSelect
            value={values.customerId}
            onChange={(customerId) => updateField("customerId", customerId)}
            customerName={customerName}
            options={customerOptions}
            loading={customersLoading || customersFetching}
            error={errors.customerId}
            search={customerSearch}
            onSearchChange={setCustomerSearch}
          />
        </FormField>

        <FormField label="Start date" htmlFor="start-date" error={errors.startDate} required>
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

        <FormField label="Maximum hours" htmlFor="max-hours" error={errors.maxHours} required>
          <Input
            id="max-hours"
            type="number"
            min={0}
            step={1}
            value={values.maxHours}
            onChange={(event) => {
              const next = event.target.value;
              if (next === "" || /^\d+$/.test(next)) {
                updateField("maxHours", next);
              }
            }}
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
