//#region node_modules/.nitro/vite/services/ssr/assets/project-activity-B4gFjEAo.js
function describeProjectActivity(activity) {
	const oldValue = activity.oldValue ?? {};
	const newValue = activity.newValue ?? {};
	switch (activity.action) {
		case "Project Created": return `Project ${String(newValue.projectId ?? "")} was created`;
		case "Project Updated": return "Project details were updated";
		case "Project Status Changed": return `Status changed from ${String(oldValue.status ?? "—")} to ${String(newValue.status ?? "—")}`;
		case "Member Added": return `${String(newValue.employeeName ?? "A team member")} was assigned to the project`;
		case "Member Removed": return `${String(oldValue.employeeName ?? "A team member")} was removed from the project`;
		case "Hours Updated": return "Member hour allocation was updated";
		default: return activity.action;
	}
}
//#endregion
export { describeProjectActivity as t };
