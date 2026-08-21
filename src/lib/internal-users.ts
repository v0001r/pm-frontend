import { api } from "./api";
import type {
  AccountStatus,
  ApiResponse,
  CreateInternalUserPayload,
  InternalUser,
  InternalUserOverview,
  InvitationStatus,
  PaginatedResult,
  Role,
  UpdateInternalUserPayload,
  UserQueryParams,
} from "./types";

export async function fetchInternalUsers(params: UserQueryParams = {}) {
  const { data } = await api.get<ApiResponse<PaginatedResult<InternalUser> | InternalUser[]>>(
    "/users",
    { params },
  );
  return data.data;
}

export async function fetchInternalUser(id: string) {
  const { data } = await api.get<ApiResponse<InternalUser>>(`/users/${id}`);
  return data.data;
}

export async function createInternalUser(payload: CreateInternalUserPayload) {
  const { data } = await api.post<ApiResponse<InternalUser>>("/users", payload);
  return data.data;
}

export async function updateInternalUser(id: string, payload: UpdateInternalUserPayload) {
  const { data } = await api.patch<ApiResponse<InternalUser>>(`/users/${id}`, payload);
  return data.data;
}

export async function updateInternalUserStatus(id: string, status: AccountStatus) {
  const { data } = await api.patch<ApiResponse<InternalUser>>(`/users/${id}/status`, { status });
  return data.data;
}

export async function updateInternalUserLogin(id: string, loginEnabled: boolean) {
  const { data } = await api.patch<ApiResponse<InternalUser>>(`/users/${id}/login`, { loginEnabled });
  return data.data;
}

export async function deleteInternalUser(id: string) {
  const { data } = await api.delete<ApiResponse<InternalUser>>(`/users/${id}`);
  return data.data;
}

export async function fetchInternalUserOverview(id: string) {
  const { data } = await api.get<ApiResponse<InternalUserOverview>>(`/users/${id}/overview`);
  return data.data;
}

export async function fetchInternalUserProjects(
  id: string,
  params: { page?: number; limit?: number; search?: string; status?: string } = {},
) {
  const { data } = await api.get<ApiResponse<PaginatedResult<Record<string, unknown>>>>(
    `/users/${id}/projects`,
    { params },
  );
  return data.data;
}

export async function inviteInternalUser(id: string) {
  const { data } = await api.post<ApiResponse<{ invitationId: string; expiresAt: string; email: string }>>(
    `/users/${id}/invite`,
  );
  return data.data;
}

export async function resendInternalUserInvitation(id: string) {
  const { data } = await api.post<ApiResponse<{ invitationId: string; expiresAt: string; email: string }>>(
    `/users/${id}/invite/resend`,
  );
  return data.data;
}

export async function resetInternalUserPassword(id: string) {
  const { data } = await api.post<ApiResponse<{ message: string }>>(
    `/users/${id}/reset-password`,
  );
  return data.data;
}

export async function fetchOwnProfile() {
  const { data } = await api.get<ApiResponse<InternalUser>>("/users/me/profile");
  return data.data;
}

export async function updateOwnProfile(payload: { phone?: string; address?: string }) {
  const { data } = await api.patch<ApiResponse<InternalUser>>("/users/me/profile", payload);
  return data.data;
}

export async function fetchOwnProjects(params: { page?: number; limit?: number } = {}) {
  const { data } = await api.get<ApiResponse<PaginatedResult<Record<string, unknown>>>>(
    "/users/me/projects",
    { params },
  );
  return data.data;
}

export async function exportInternalUsers(params: UserQueryParams = {}) {
  const response = await api.get("/users/export", { params, responseType: "blob" });
  return response.data as Blob;
}

export type { UserQueryParams, InvitationStatus, Role };
