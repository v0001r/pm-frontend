export const PROJECT_CUSTOMER_SEARCH_LIMIT = 100;

export function buildProjectCustomerSearchParams(search?: string, limit = PROJECT_CUSTOMER_SEARCH_LIMIT) {
  const params: Record<string, string | number> = { limit };
  const trimmed = search?.trim();

  if (trimmed) {
    params.search = trimmed;
  }

  return params;
}
