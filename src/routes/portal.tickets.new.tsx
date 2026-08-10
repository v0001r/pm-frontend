import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Paperclip, X } from "lucide-react";
import { RequireRole } from "@/components/guard";
import { PageHeader, SectionCard } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getApiErrorMessage } from "@/lib/api";
import { fetchCategories } from "@/lib/categories";
import { fetchProjects } from "@/lib/projects";
import { createTicket } from "@/lib/tickets";
import { PRIORITIES, SLA_MATRIX, type Priority } from "@/lib/types";
import { useAuth } from "@/lib/auth";

interface NewTicketSearch {
  projectId?: string;
}

export const Route = createFileRoute("/portal/tickets/new")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): NewTicketSearch => ({
    projectId: typeof search["projectId"] === "string" ? search["projectId"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Raise a Ticket — Helpdesk" },
      { name: "description", content: "Submit a new support request with project, category, priority and attachments." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Client"]}>
      <NewTicket />
    </RequireRole>
  ),
});

function NewTicket() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { projectId: initialProjectId } = Route.useSearch();

  const [subject, setSubject] = useState("");
  const [projectId, setProjectId] = useState(initialProjectId ?? "");
  const [categoryId, setCategoryId] = useState("");
  const [priority, setPriority] = useState<Priority>("P3");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);

  const projectsQuery = useQuery({
    queryKey: ["projects", { portal: true, all: true }],
    queryFn: () => fetchProjects({ page: 1, limit: 100, sortBy: "name", sortOrder: "asc" }),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const projects = projectsQuery.data?.items ?? [];
  const categories = categoriesQuery.data ?? [];

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

  const selectedProject = useMemo(
    () => projects.find((project) => project._id === projectId),
    [projects, projectId],
  );

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error("You must be signed in to create a ticket");
      }
      if (!projectId) {
        throw new Error("Select a project for this ticket");
      }
      if (!categoryId) {
        throw new Error("Select a category for this ticket");
      }
      if (subject.trim().length < 5) {
        throw new Error("Subject must be at least 5 characters");
      }
      if (description.trim().length < 20) {
        throw new Error("Please describe the issue in at least 20 characters");
      }

      return createTicket({
        subject: subject.trim(),
        description: description.trim(),
        clientId: user.id,
        projectId,
        categoryId,
        priority,
      });
    },
    onSuccess: (ticket) => {
      toast.success(`Ticket ${ticket.number} submitted.`);
      navigate({ to: "/portal/tickets/$ticketId", params: { ticketId: ticket._id } });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to submit ticket"));
    },
  });

  const loading = projectsQuery.isLoading || categoriesQuery.isLoading;

  return (
    <>
      <PageHeader
        title="Raise a ticket"
        description="Select a project and describe the issue. Our team will respond within your SLA."
      />
      <SectionCard>
        <form
          className="grid gap-4 p-4"
          onSubmit={(event) => {
            event.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Short summary of the issue"
              maxLength={120}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label>Project</Label>
              <Select value={projectId} onValueChange={setProjectId} disabled={loading || projects.length === 0}>
                <SelectTrigger>
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
              {selectedProject ? (
                <p className="text-xs text-muted-foreground">
                  Status: {selectedProject.status} · Progress: {selectedProject.progressPercentage}%
                </p>
              ) : null}
            </div>

            <div className="grid gap-1.5">
              <Label>Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId} disabled={loading || categories.length === 0}>
                <SelectTrigger>
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
            </div>
          </div>

          <div className="grid gap-1.5 sm:max-w-xs">
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
            <p className="text-xs text-muted-foreground">
              Response within {SLA_MATRIX[priority].response} · Resolution within {SLA_MATRIX[priority].resolution}
            </p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={8}
              maxLength={4000}
              placeholder="Steps to reproduce, what you expected and what happened instead."
              required
            />
            <p className="text-xs text-muted-foreground">{description.length}/4000 characters</p>
          </div>

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

          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={mutation.isPending || projects.length === 0 || categories.length === 0}>
              {mutation.isPending ? "Submitting..." : "Submit ticket"}
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => navigate({ to: "/portal/tickets" })}>
              Cancel
            </Button>
          </div>
        </form>
      </SectionCard>
    </>
  );
}
