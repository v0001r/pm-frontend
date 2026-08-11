import { r as api } from "./button-vnqCGuCs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/internal-users-Mmt9i5-2.js
async function fetchInternalUsers(params = {}) {
	const { data } = await api.get("/users", { params });
	return data.data;
}
async function fetchInternalUser(id) {
	const { data } = await api.get(`/users/${id}`);
	return data.data;
}
async function createInternalUser(payload) {
	const { data } = await api.post("/users", payload);
	return data.data;
}
async function updateInternalUser(id, payload) {
	const { data } = await api.patch(`/users/${id}`, payload);
	return data.data;
}
async function updateInternalUserStatus(id, status) {
	const { data } = await api.patch(`/users/${id}/status`, { status });
	return data.data;
}
async function updateInternalUserLogin(id, loginEnabled) {
	const { data } = await api.patch(`/users/${id}/login`, { loginEnabled });
	return data.data;
}
async function deleteInternalUser(id) {
	const { data } = await api.delete(`/users/${id}`);
	return data.data;
}
async function fetchInternalUserOverview(id) {
	const { data } = await api.get(`/users/${id}/overview`);
	return data.data;
}
async function fetchInternalUserProjects(id, params = {}) {
	const { data } = await api.get(`/users/${id}/projects`, { params });
	return data.data;
}
async function resendInternalUserInvitation(id) {
	const { data } = await api.post(`/users/${id}/invite/resend`);
	return data.data;
}
async function resetInternalUserPassword(id) {
	const { data } = await api.post(`/users/${id}/reset-password`);
	return data.data;
}
async function fetchOwnProfile() {
	const { data } = await api.get("/users/me/profile");
	return data.data;
}
async function updateOwnProfile(payload) {
	const { data } = await api.patch("/users/me/profile", payload);
	return data.data;
}
//#endregion
export { fetchInternalUserProjects as a, resendInternalUserInvitation as c, updateInternalUserLogin as d, updateInternalUserStatus as f, fetchInternalUserOverview as i, resetInternalUserPassword as l, deleteInternalUser as n, fetchInternalUsers as o, updateOwnProfile as p, fetchInternalUser as r, fetchOwnProfile as s, createInternalUser as t, updateInternalUser as u };
