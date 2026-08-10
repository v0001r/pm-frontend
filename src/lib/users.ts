import { api } from "./api";
import type { ApiResponse, InternalUser, PaginatedResult, User } from "./types";

export async function fetchUsers() {
  const { data } = await api.get<ApiResponse<User[] | PaginatedResult<InternalUser>>>("/users");
  const payload = data.data;
  if (Array.isArray(payload)) {
    return payload as User[];
  }
  return payload.items as User[];
}

export async function fetchEmployees() {
  const users = await fetchUsers();
  return users.filter((user) => user.role === "Admin" || user.role === "Staff");
}
