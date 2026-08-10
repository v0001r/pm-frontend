import { r as api } from "./button-Cc9Bh2Gp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-gqIh7DFz.js
async function fetchCategories() {
	const { data } = await api.get("/categories");
	return data.data.filter((category) => category.active);
}
//#endregion
export { fetchCategories as t };
