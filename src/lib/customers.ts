import { api } from "./api";
import type {
  AccountStatus,
  ApiResponse,
  CreateCustomerPayload,
  Customer,
  CustomerContact,
  CustomerOverviewSummary,
  CustomerQueryParams,
  PaginatedResult,
  UpdateCustomerPayload,
} from "./types";

export async function fetchCustomers(params: CustomerQueryParams = {}) {
  const { data } = await api.get<ApiResponse<PaginatedResult<Customer>>>("/customers", { params });
  return data.data;
}

export async function fetchCustomer(id: string) {
  const { data } = await api.get<ApiResponse<Customer>>(`/customers/${id}`);
  return data.data;
}

export async function createCustomer(payload: CreateCustomerPayload) {
  const { data } = await api.post<ApiResponse<Customer>>("/customers", payload);
  return data.data;
}

export async function updateCustomer(id: string, payload: UpdateCustomerPayload) {
  const { data } = await api.patch<ApiResponse<Customer>>(`/customers/${id}`, payload);
  return data.data;
}

export async function updateCustomerStatus(id: string, status: AccountStatus) {
  const { data } = await api.patch<ApiResponse<Customer>>(`/customers/${id}/status`, { status });
  return data.data;
}

export async function deleteCustomer(id: string) {
  const { data } = await api.delete<ApiResponse<Customer>>(`/customers/${id}`);
  return data.data;
}

export async function fetchCustomerOverview(id: string) {
  const { data } = await api.get<
    ApiResponse<{ customer: Customer; summary: CustomerOverviewSummary }>
  >(`/customers/${id}/overview`);
  return data.data;
}

export async function fetchCustomerContacts(customerId: string) {
  const { data } = await api.get<ApiResponse<CustomerContact[]>>(`/customers/${customerId}/contacts`);
  return data.data;
}

export async function fetchCustomerProjects(customerId: string, params: { page?: number; limit?: number } = {}) {
  const { data } = await api.get<ApiResponse<PaginatedResult<Record<string, unknown>>>>(
    `/customers/${customerId}/projects`,
    { params },
  );
  return data.data;
}

export async function fetchCustomerTickets(customerId: string, params: { page?: number; limit?: number } = {}) {
  const { data } = await api.get<ApiResponse<PaginatedResult<Record<string, unknown>>>>(
    `/customers/${customerId}/tickets`,
    { params },
  );
  return data.data;
}

export async function inviteCustomer(customerId: string) {
  const { data } = await api.post<ApiResponse<{ invitationId: string; expiresAt: string; email: string }>>(
    `/customers/${customerId}/invite`,
  );
  return data.data;
}

export async function resendCustomerInvitation(customerId: string) {
  const { data } = await api.post<ApiResponse<{ invitationId: string; expiresAt: string; email: string }>>(
    `/customers/${customerId}/invite/resend`,
  );
  return data.data;
}

export async function activateAccount(token: string, password: string) {
  const { data } = await api.post<ApiResponse<{ message: string }>>("/auth/activate", { token, password });
  return data.data;
}

export async function fetchPortalDashboard() {
  const { data } = await api.get<
    ApiResponse<{
      summary: {
        totalTickets: number;
        openTickets: number;
        inProgress: number;
        resolved: number;
        closed: number;
      };
      recentTickets: Record<string, unknown>[];
      recentActivities: Record<string, unknown>[];
    }>
  >("/portal/dashboard");
  return data.data;
}
