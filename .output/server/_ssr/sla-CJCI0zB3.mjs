import { r as api } from "./button-vnqCGuCs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sla-CJCI0zB3.js
async function fetchSlaPolicies() {
	const { data } = await api.get("/sla-policies");
	return data.data;
}
async function fetchSlaSettings() {
	const { data } = await api.get("/settings/sla");
	return data.data;
}
async function updateSlaSettings(payload) {
	const { data } = await api.patch("/settings/sla", payload);
	return data.data;
}
function formatSlaMinutes(minutes) {
	if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
	if (minutes % 60 === 0) {
		const hours = minutes / 60;
		return `${hours} ${hours === 1 ? "hour" : "hours"}`;
	}
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours} ${hours === 1 ? "hour" : "hours"} ${mins} ${mins === 1 ? "minute" : "minutes"}`;
}
var SLA_HOUR_OPTIONS = [
	0,
	...Array.from({ length: 24 }, (_, index) => index + 1),
	48,
	72
];
var SLA_MINUTE_OPTIONS = [
	0,
	15,
	30,
	45
];
function snapSlaHours(hours) {
	return SLA_HOUR_OPTIONS.reduce((closest, option) => Math.abs(option - hours) < Math.abs(closest - hours) ? option : closest);
}
function snapSlaMinutes(minutes) {
	return SLA_MINUTE_OPTIONS.reduce((closest, option) => Math.abs(option - minutes) < Math.abs(closest - minutes) ? option : closest);
}
function toSlaMinuteOption(minutes) {
	return String(snapSlaMinutes(minutes)).padStart(2, "0");
}
function fromSlaMinuteOption(value) {
	return Number(value);
}
function combineSlaMinutes(hours, minutes) {
	if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
	if (!SLA_HOUR_OPTIONS.includes(hours)) return null;
	if (!SLA_MINUTE_OPTIONS.includes(minutes)) return null;
	const total = hours * 60 + minutes;
	return total >= 1 ? total : null;
}
function slaTargetsFromPolicy(policy) {
	return {
		response: formatSlaMinutes(policy.assignmentSlaMinutes),
		resolution: formatSlaMinutes(policy.resolutionSlaMinutes)
	};
}
function findSlaPolicyForPriority(policies, priority) {
	return policies?.find((policy) => policy.priority === priority);
}
//#endregion
export { fetchSlaSettings as a, slaTargetsFromPolicy as c, updateSlaSettings as d, fetchSlaPolicies as i, snapSlaHours as l, SLA_MINUTE_OPTIONS as n, findSlaPolicyForPriority as o, combineSlaMinutes as r, fromSlaMinuteOption as s, SLA_HOUR_OPTIONS as t, toSlaMinuteOption as u };
