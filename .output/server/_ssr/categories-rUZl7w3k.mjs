import { r as api } from "./button-DTh0UNAt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-rUZl7w3k.js
async function fetchCategories() {
	const { data } = await api.get("/categories");
	return data.data.filter((category) => category.active);
}
//#endregion
export { fetchCategories as t };
