import { api } from "./api";
import type {
  AccountStatus,
  ApiResponse,
  CreateContactPayload,
  CustomerContact,
  UpdateContactPayload,
} from "./types";

export async function fetchContact(customerId: string, contactId: string) {
  const { data } = await api.get<ApiResponse<CustomerContact>>(
    `/customers/${customerId}/contacts/${contactId}`,
  );
  return data.data;
}

export async function createContact(customerId: string, payload: CreateContactPayload) {
  const { data } = await api.post<ApiResponse<CustomerContact>>(
    `/customers/${customerId}/contacts`,
    payload,
  );
  return data.data;
}

export async function updateContact(
  customerId: string,
  contactId: string,
  payload: UpdateContactPayload,
) {
  const { data } = await api.patch<ApiResponse<CustomerContact>>(
    `/customers/${customerId}/contacts/${contactId}`,
    payload,
  );
  return data.data;
}

export async function updateContactStatus(
  customerId: string,
  contactId: string,
  status: AccountStatus,
) {
  const { data } = await api.patch<ApiResponse<CustomerContact>>(
    `/customers/${customerId}/contacts/${contactId}/status`,
    { status },
  );
  return data.data;
}

export async function setPrimaryContact(customerId: string, contactId: string) {
  const { data } = await api.patch<ApiResponse<CustomerContact>>(
    `/customers/${customerId}/contacts/${contactId}/primary`,
  );
  return data.data;
}

export async function inviteContact(customerId: string, contactId: string) {
  const { data } = await api.post<
    ApiResponse<{ invitationId: string; expiresAt: string; email: string }>
  >(`/customers/${customerId}/contacts/${contactId}/invite`);
  return data.data;
}
