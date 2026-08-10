import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Paperclip, X } from "lucide-react";
import { PageHeader, SectionCard } from "@/components/primitives";
import { fieldInputClass, FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getApiErrorMessage } from "@/lib/api";
import { createTicketSchema, validateForm } from "@/lib/form-validation";
import { useAuth } from "@/lib/auth";
import { fetchCategories } from "@/lib/categories";
import { fetchProjects } from "@/lib/projects";
import { createTicket } from "@/lib/tickets";
import { fetchEmployees } from "@/lib/users";
import { PRIORITIES, SLA_MATRIX, SETTABLE_STATUSES, fullName, type Priority, type TicketStatus } from "@/lib/types";

interface CreateTicketFormProps {
  initialProjectId?: string;
  cancelTo?: string;
  successTo?: "/admin/tickets/$ticketId" | "/portal/tickets/$ticketId";
  embedded?: boolean;
  onCancel?: () => void;
  onSuccess?: (ticketId: string) => void;
}

export function CreateTicketForm({
  initialProjectId,
  cancelTo = "/admin/tickets",
  successTo = "/admin/tickets/$ticketId",
  embedded = false,
  onCancel,
  onSuccess,
}: CreateTicketFormProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isClient = user?.role === "Client";
  const isStaffOrAdmin = user?.role === "Admin" || user?.role === "Staff";

  const [subject, setSubject] = useState("");
  const [projectId, setProjectId] = useState(initialProjectId ?? "");
  const [categoryId, setCategoryId] = useState("");
  const [priority, setPriority] = useState<Priority>("P3");
  const [status, setStatus] = useState<TicketStatus>("New");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const projectsQuery = useQuery({
    queryKey: ["projects", { createTicket: true, role: user?.role }],
    queryFn: () => fetchProjects({ page: 1, limit: 100, sortBy: "name", sortOrder: "asc" }),
    enabled: Boolean(user),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const employeesQuery = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    enabled: isStaffOrAdmin,
  });

  const projects = projectsQuery.data?.items ?? [];
  const categories = categoriesQuery.data ?? [];
  const employees = employeesQuery.data ?? [];

  useEffect(() => {
    if (!projectId && projects[0]) {
      setProjectId(projects[0]._id);
    }
  }, [projects, projectId]);

  useEffect(() => {
    if (!categoryId && categories[0]) {
      setCategoryId(categories[0]._id);
    }
  }, [categories, categoryId]);

  useEffect(() => {
    if (initialProjectId) {
      setProjectId(initialProjectId);
    }
  }, [initialProjectId]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error("You must be signed in to create a ticket");
      }

      return createTicket({
        subject: subject.trim(),
        description: description.trim(),
        ...(isClient ? { clientId: user.id } : {}),
        projectId,
        categoryId,
        priority,
        ...(isStaffOrAdmin && !(assignedTo && status === "New") ? { status } : {}),
        ...(isStaffOrAdmin && assignedTo ? { assignedTo } : {}),
      });
    },
    onSuccess: (ticket) => {
      toast.success(`Ticket ${ticket.number} submitted.`);
      if (onSuccess) {
        onSuccess(ticket._id);
      } else {
        navigate({ to: successTo, params: { ticketId: ticket._id } });
      }
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to submit ticket"));
    },
  });

  function clearError(field: string) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  const loading =
    projectsQuery.isLoading || categoriesQuery.isLoading || (isStaffOrAdmin && employeesQuery.isLoading);

  const form = (
    <form
      className={embedded ? "grid gap-4" : "grid gap-4 p-4"}
      noValidate
      onSubmit={(event) => {
            event.preventDefault();
            const validation = validateForm(createTicketSchema, {
              subject,
              projectId,
              categoryId,
              description,
            });
            if (!validation.success) {
              setErrors(validation.errors);
              return;
            }
            setErrors({});
            mutation.mutate();
          }}
        >
          <FormField label="Subject" htmlFor="subject" error={errors["subject"]} required>
            <Input
              id="subject"
              value={subject}
              onChange={(event) => {
                setSubject(event.target.value);
                clearError("subject");
              }}
              placeholder="Short summary of the issue"
              maxLength={120}
              className={fieldInputClass(errors["subject"])}
            />
          </FormField>

          {isStaffOrAdmin ? (
            <div className="grid gap-1.5">
              <Label>Assign to</Label>
              <Select
                value={assignedTo || "unassigned"}
                onValueChange={(value) => setAssignedTo(value === "unassigned" ? "" : value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loading ? "Loading users..." : "Select assignee"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {fullName(employee)}
                      {employee.designation ? ` · ${employee.designation}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Assigning a user marks the ticket as assigned automatically.
              </p>
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Project" error={errors["projectId"]} required>
              <Select
                value={projectId}
                onValueChange={(value) => {
                  setProjectId(value);
                  clearError("projectId");
                }}
                disabled={loading || projects.length === 0}
              >
                <SelectTrigger className={fieldInputClass(errors["projectId"])}>
                  <SelectValue placeholder={loading ? "Loading projects..." : "Select project"} />
                </SelectTrigger>
                <SelectContent>
                  {projects.length === 0 ? (
                    <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                      No projects available for your account
                    </div>
                  ) : (
                    projects.map((project) => (
                      <SelectItem key={project._id} value={project._id}>
                        {project.name} · {project.projectId}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Category" error={errors["categoryId"]} required>
              <Select
                value={categoryId}
                onValueChange={(value) => {
                  setCategoryId(value);
                  clearError("categoryId");
                }}
                disabled={loading || categories.length === 0}
              >
                <SelectTrigger className={fieldInputClass(errors["categoryId"])}>
                  <SelectValue placeholder={loading ? "Loading categories..." : "Select category"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className={`grid gap-4 ${isStaffOrAdmin ? "sm:grid-cols-2" : ""}`}>
            <div className="grid gap-1.5">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
             
            </div>

            {isStaffOrAdmin ? (
              <div className="grid gap-1.5">
                <Label>Status</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as TicketStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SETTABLE_STATUSES.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}
          </div>

          <FormField
            label="Description"
            htmlFor="description"
            error={errors["description"]}
            hint={`${description.length}/4000 characters`}
            required
          >
            <Textarea
              id="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                clearError("description");
              }}
              rows={8}
              maxLength={4000}
              placeholder="Steps to reproduce, what you expected and what happened instead."
              className={fieldInputClass(errors["description"])}
            />
          </FormField>

          <div className="grid gap-1.5">
            <Label>Attachments</Label>
            <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-dashed px-3 py-4 text-sm text-muted-foreground hover:bg-accent/50">
              <Paperclip className="size-4" />
              Attach screenshots or documents (max 5 files, 10MB each)
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(event) => {
                  const picked = Array.from(event.target.files ?? []).map((file) => ({
                    name: file.name,
                    size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
                  }));
                  setFiles((previous) => [...previous, ...picked].slice(0, 5));
                }}
              />
            </label>
            {files.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <li key={`${file.name}-${index}`} className="flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs">
                    {file.name} · {file.size}
                    <button
                      type="button"
                      onClick={() => setFiles(files.filter((_, fileIndex) => fileIndex !== index))}
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="size-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-xs text-muted-foreground">File uploads are stored locally in this demo UI only.</p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => (onCancel ? onCancel() : navigate({ to: cancelTo }))}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={mutation.isPending || projects.length === 0 || categories.length === 0}
            >
              {mutation.isPending ? "Submitting..." : "Submit ticket"}
            </Button>
          </div>
        </form>
  );

  if (embedded) {
    return form;
  }

  return (
    <>
      <PageHeader
        title="Create ticket"
        description={
          isClient
            ? "Select a project and describe the issue. Our team will respond within your SLA."
            : "Log a support request for any project you can access."
        }
      />
      <SectionCard>{form}</SectionCard>
    </>
  );
}
