import { api } from "./api";
import type { ApiResponse } from "./types";

export interface OrgLookup {
  _id: string;
  code: string;
  name: string;
  departmentId?: string;
}

export async function fetchDepartments() {
  const { data } = await api.get<ApiResponse<OrgLookup[]>>("/departments");
  return data.data;
}

export async function fetchDesignations(departmentId?: string) {
  const { data } = await api.get<ApiResponse<OrgLookup[]>>("/designations", {
    params: departmentId ? { departmentId } : undefined,
  });
  return data.data;
}

export async function fetchTeams(departmentId?: string) {
  const { data } = await api.get<ApiResponse<OrgLookup[]>>("/teams", {
    params: departmentId ? { departmentId } : undefined,
  });
  return data.data;
}
