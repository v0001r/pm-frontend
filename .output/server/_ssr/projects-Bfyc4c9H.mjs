import { r as api } from "./button-DTh0UNAt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-Bfyc4c9H.js
async function fetchProjects(params = {}) {
	const { data } = await api.get("/projects", { params });
	return data.data;
}
async function fetchProject(id) {
	const { data } = await api.get(`/projects/${id}`);
	return data.data;
}
async function fetchCustomers(search, limit = 50) {
	const { data } = await api.get("/customers", { params: {
		search,
		limit,
		page: 1
	} });
	return data.data.items;
}
async function createProject(payload) {
	const { data } = await api.post("/projects", payload);
	return data.data;
}
async function updateProject(id, payload) {
	const { data } = await api.patch(`/projects/${id}`, payload);
	return data.data;
}
async function fetchProjectMembers(projectId, params = {}) {
	const { data } = await api.get(`/projects/${projectId}/members`, { params });
	return data.data;
}
async function assignProjectMember(projectId, payload) {
	const { data } = await api.post(`/projects/${projectId}/members`, payload);
	return data.data;
}
async function removeProjectMember(projectId, memberId) {
	const { data } = await api.delete(`/projects/${projectId}/members/${memberId}`);
	return data.data;
}
async function fetchProjectActivities(projectId, params = {}) {
	const { data } = await api.get(`/projects/${projectId}/activities`, { params });
	return data.data;
}
//#endregion
export { fetchProjectActivities as a, removeProjectMember as c, fetchProject as i, updateProject as l, createProject as n, fetchProjectMembers as o, fetchCustomers as r, fetchProjects as s, assignProjectMember as t };
