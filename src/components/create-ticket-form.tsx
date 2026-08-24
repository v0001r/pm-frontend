import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageHeader, SectionCard } from "@/components/primitives";
import { FileUploadField } from "@/components/file-upload-field";
import { fieldInputClass, FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getApiErrorMessage } from "@/lib/api";
import { createTicketSchema, FIELD_LIMITS, SUBJECT_MAX_MESSAGE, validateForm } from "@/lib/form-validation";
import { useAuth } from "@/lib/auth";
import { fetchCategories, categoryId as getCategoryId } from "@/lib/categories";
import { fetchProjectMembers, fetchProjects } from "@/lib/projects";
import { createTicket } from "@/lib/tickets";
import { fetchEmployees } from "@/lib/users";
import type { UploadedFileRef } from "@/lib/uploads";
import { PRIORITIES, SETTABLE_STATUSES, TICKET_ELIGIBLE_PROJECT_STATUSES, assignedToUserId, employeeOptionLabel, memberUserId, userRecordIds, type Category, type Priority, type Project, type ProjectMember, type TicketStatus, type User } from "@/lib/types";

function projectIdOf(project: { _id?: string; id?: string }) {
  return project._id || project.id || "";
}

function isActiveProjectMember(member: ProjectMember) {
  const status = (member.status || "Active").toLowerCase();
  return status !== "inactive" && status !== "removed" && status !== "suspended";
}

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
  const [files, setFiles] = useState<UploadedFileRef[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const assignedUserId = assignedTo && assignedTo !== "unassigned" ? assignedTo : "";

  const projectsQuery = useQuery({
    queryKey: ["projects", { createTicket: true, role: user?.role, unscoped: isStaffOrAdmin }],
    queryFn: () =>
      fetchProjects({
        page: 1,
        limit: 100,
        sortBy: "name",
        sortOrder: "asc",
        ...(isStaffOrAdmin ? { unscoped: true } : {}),
      }),
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

  const membersQuery = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: () => fetchProjectMembers(projectId, { page: 1, limit: 100 }),
    enabled: isStaffOrAdmin && Boolean(projectId),
  });

  const projects = (projectsQuery.data?.items ?? []).filter((project: Project) =>
    TICKET_ELIGIBLE_PROJECT_STATUSES.includes(project.status),
  );
  const categories = categoriesQuery.data ?? [];
  const employees = (employeesQuery.data ?? []).filter(
    (employee: User) => userRecordIds(employee).length > 0 && employee.status === "Active",
  );
  const memberIds = new Set(
    (membersQuery.data?.items ?? [])
      .filter((member: ProjectMember) => isActiveProjectMember(member))
      .map((member: ProjectMember) => memberUserId(member))
      .filter(Boolean),
  );
  const assignees = employees.filter((employee: User) =>
    userRecordIds(employee).some((id) => memberIds.has(id)),
  );
  const selectedProject = projects.find((project: Project) => projectIdOf(project) === projectId);

  useEffect(() => {
    if (projectsQuery.isLoading) return;

    if (initialProjectId && projects.some((project: Project) => projectIdOf(project) === initialProjectId)) {
      setProjectId(initialProjectId);
      return;
    }

    if (projectId && !projects.some((project: Project) => projectIdOf(project) === projectId)) {
      setProjectId(projects[0] ? projectIdOf(projects[0]) : "");
      return;
    }

    if (!projectId && projects[0]) {
      const firstId = projectIdOf(projects[0]);
      if (firstId) setProjectId(firstId);
    }
  }, [projects, projectId, initialProjectId, projectsQuery.isLoading]);

  useEffect(() => {
    if (!categoryId && categories[0]) {
      const firstId = getCategoryId(categories[0]);
      if (firstId) setCategoryId(firstId);
    }
  }, [categories, categoryId]);

  useEffect(() => {
    if (!assignedUserId) return;
    if (membersQuery.isLoading || employeesQuery.isLoading) return;
    if (!assignees.some((employee: User) => assignedToUserId(employee, memberIds) === assignedUserId)) {
      setAssignedTo("");
    }
  }, [assignedUserId, assignees, memberIds, membersQuery.isLoading, employeesQuery.isLoading]);

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
        ...(isStaffOrAdmin && !(assignedUserId && status === "New") ? { status } : {}),
        ...(isStaffOrAdmin && assignedUserId ? { assignedTo: assignedUserId } : {}),
        ...(files.length > 0 ? { attachments: files } : {}),
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
    projectsQuery.isLoading ||
    categoriesQuery.isLoading ||
    (isStaffOrAdmin && (employeesQuery.isLoading || (Boolean(projectId) && membersQuery.isLoading)));

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
            setSubject(validation.data.subject);
            setErrors({});
            mutation.mutate();
          }}
        >
          <FormField
            label="Subject"
            htmlFor="subject"
            error={errors["subject"]}
            hint={`Maximum ${FIELD_LIMITS.SUBJECT_MAX} characters`}
            required
          >
            <Input
              id="subject"
              value={subject}
              onChange={(event) => {
                const next = event.target.value;
                setSubject(next);
                if (next.trim().length > FIELD_LIMITS.SUBJECT_MAX) {
                  setErrors((current) => ({ ...current, subject: SUBJECT_MAX_MESSAGE }));
                  return;
                }
                clearError("subject");
              }}
              onBlur={() => setSubject((current) => current.trim())}
              placeholder="Enter Subject"
              className={fieldInputClass(errors["subject"])}
            />
          </FormField>

          {isStaffOrAdmin ? (
            <div className="grid gap-1.5">
              <Label>Assign to</Label>
              <Select
                {...(assignedTo ? { value: assignedTo } : {})}
                onValueChange={setAssignedTo}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loading ? "Loading users..." : "Select Assignee"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {assignees.length === 0 ? (
                    <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                      No active project members to assign
                    </div>
                  ) : (
                    assignees.map((employee: User) => {
                      const id = assignedToUserId(employee, memberIds);
                      return (
                        <SelectItem key={id} value={id}>
                          {employeeOptionLabel(employee)}
                        </SelectItem>
                      );
                    })
                  )}
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
                {...(projectId ? { value: projectId } : {})}
                onValueChange={(value) => {
                  setProjectId(value);
                  setAssignedTo("");
                  clearError("projectId");
                }}
                disabled={loading || projects.length === 0}
              >
                <SelectTrigger className={fieldInputClass(errors["projectId"])}>
                  <SelectValue placeholder={loading ? "Loading projects..." : "Select Project"} />
                </SelectTrigger>
                <SelectContent>
                  {projects.length === 0 ? (
                    <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                      No projects available for your account
                    </div>
                  ) : (
                    projects.map((project: Project) => {
                      const id = projectIdOf(project);
                      if (!id) return null;
                      return (
                        <SelectItem key={id} value={id}>
                          {project.name || "Untitled project"}
                          {project.projectId ? ` · ${project.projectId}` : ""}
                        </SelectItem>
                      );
                    })
                  )}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Category" error={errors["categoryId"]} required>
              <Select
                {...(categoryId ? { value: categoryId } : {})}
                onValueChange={(value) => {
                  setCategoryId(value);
                  clearError("categoryId");
                }}
                disabled={loading || categories.length === 0}
              >
                <SelectTrigger className={fieldInputClass(errors["categoryId"])}>
                  <SelectValue placeholder={loading ? "Loading categories..." : "Select Category"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: Category) => {
                    const id = getCategoryId(category);
                    if (!id) return null;
                    return (
                      <SelectItem key={id} value={id}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {selectedProject ? (
            <FormField label="Customer">
              <Input
                value={selectedProject.customerName || "—"}
                readOnly
                disabled
              />
            </FormField>
          ) : null}

          <div className={`grid gap-4 ${isStaffOrAdmin ? "sm:grid-cols-2" : ""}`}>
            <div className="grid gap-1.5">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Priority" />
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
                    <SelectValue placeholder="Select Status" />
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
              placeholder="Enter Description"
              className={fieldInputClass(errors["description"])}
            />
          </FormField>

          <FileUploadField
            context="ticket-attachment"
            files={files}
            onChange={setFiles}
            label="Attachments"
            placeholder="Upload Attachments"
            hint="Max 5 files, 10MB each"
          />

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
            : "Log a support request for any project."
        }
      />
      <SectionCard>{form}</SectionCard>
    </>
  );
}
