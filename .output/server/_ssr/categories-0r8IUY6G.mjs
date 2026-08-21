import { a as api } from "./button-Du-Bk9Wl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-0r8IUY6G.js
async function fetchCategories() {
	const { data } = await api.get("/categories");
	return data.data.filter((category) => category.active);
}
//#endregion
export { fetchCategories as t };
