import { r as api } from "./button-Cc9Bh2Gp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-CDxzt4hY.js
async function fetchUsers() {
	const { data } = await api.get("/users");
	const payload = data.data;
	if (Array.isArray(payload)) return payload;
	return payload.items;
}
async function fetchClientUsers() {
	return (await fetchUsers()).filter((user) => user.role === "Client");
}
async function fetchEmployees() {
	return (await fetchUsers()).filter((user) => user.role === "Admin" || user.role === "Staff");
}
//#endregion
export { fetchEmployees as n, fetchClientUsers as t };
