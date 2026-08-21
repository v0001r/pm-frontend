import { a as api } from "./button-Du-Bk9Wl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/org-CS5p3MIU.js
async function fetchDepartments() {
	const { data } = await api.get("/departments");
	return data.data;
}
async function fetchDesignations(departmentId) {
	const { data } = await api.get("/designations", { params: departmentId ? { departmentId } : void 0 });
	return data.data;
}
async function fetchTeams(departmentId) {
	const { data } = await api.get("/teams", { params: departmentId ? { departmentId } : void 0 });
	return data.data;
}
//#endregion
export { fetchDesignations as n, fetchTeams as r, fetchDepartments as t };
