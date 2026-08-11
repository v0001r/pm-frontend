import { api } from "./api";
import type {
  ApiResponse,
  AssignProjectMemberPayload,
  CreateProjectPayload,
  Customer,
  PaginatedResult,
  Project,
  ProjectActivity,
  ProjectDetail,
  ProjectMember,
  ProjectQueryParams,
  UpdateProjectPayload,
} from "./types";

export async function fetchProjects(params: ProjectQueryParams = {}) {
  const { data } = await api.get<ApiResponse<PaginatedResult<Project>>>("/projects", { params });
  return data.data;
}

export async function fetchProject(id: string) {
  const { data } = await api.get<ApiResponse<ProjectDetail>>(`/projects/${id}`);
  return data.data;
}

export async function fetchCustomers(search?: string, limit = 50) {
  const { data } = await api.get<ApiResponse<PaginatedResult<Customer>>>("/customers", {
    params: { search, limit, page: 1 },
  });
  return data.data.items;
}

export async function createProject(payload: CreateProjectPayload) {
  const { data } = await api.post<ApiResponse<ProjectDetail>>("/projects", payload);
  return data.data;
}

export async function updateProject(id: string, payload: UpdateProjectPayload) {
  const { data } = await api.patch<ApiResponse<ProjectDetail>>(`/projects/${id}`, payload);
  return data.data;
}

export async function deleteProject(id: string) {
  const { data } = await api.delete<ApiResponse<{ message: string }>>(`/projects/${id}`);
  return data.data;
}

export async function fetchProjectMembers(
  projectId: string,
  params: { page?: number; limit?: number; search?: string } = {},
) {
  const { data } = await api.get<ApiResponse<PaginatedResult<ProjectMember>>>(
    `/projects/${projectId}/members`,
    { params },
  );
  return data.data;
}

export async function assignProjectMember(projectId: string, payload: AssignProjectMemberPayload) {
  const { data } = await api.post<ApiResponse<ProjectMember>>(`/projects/${projectId}/members`, payload);
  return data.data;
}

export async function removeProjectMember(projectId: string, memberId: string) {
  const { data } = await api.delete<ApiResponse<ProjectMember>>(
    `/projects/${projectId}/members/${memberId}`,
  );
  return data.data;
}

export async function fetchProjectActivities(
  projectId: string,
  params: { page?: number; limit?: number } = {},
) {
  const { data } = await api.get<ApiResponse<PaginatedResult<ProjectActivity>>>(
    `/projects/${projectId}/activities`,
    { params },
  );
  return data.data;
}
