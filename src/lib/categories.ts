import { api } from "./api";
import type { ApiResponse, Category, PaginatedResult } from "./types";

function categoryId(category: Category) {
  return category._id || category.id || "";
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<ApiResponse<Category[] | PaginatedResult<Category>>>("/categories");
  const payload = data.data;
  const items = Array.isArray(payload) ? payload : (payload?.items ?? []);
  return items.filter((category) => category.active !== false && Boolean(categoryId(category)));
}

export { categoryId };
