import { api } from "./api";
import type { ApiResponse, Category } from "./types";

export async function fetchCategories() {
  const { data } = await api.get<ApiResponse<Category[]>>("/categories");
  return data.data.filter((category) => category.active);
}
