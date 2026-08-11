import { r as api } from "./button-vnqCGuCs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-DyXz_9LF.js
async function fetchCategories() {
	const { data } = await api.get("/categories");
	return data.data.filter((category) => category.active);
}
//#endregion
export { fetchCategories as t };
