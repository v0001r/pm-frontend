import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button } from "./button-Cc9Bh2Gp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/form-actions-6tK-7ehz.js
var import_jsx_runtime = require_jsx_runtime();
function FormActions({ submitLabel, submitting = false, submittingLabel = "Saving...", onCancel, cancelLabel = "Cancel", disabled = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-end gap-2",
		children: [onCancel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "outline",
			size: "sm",
			onClick: onCancel,
			disabled: submitting || disabled,
			children: cancelLabel
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "submit",
			size: "sm",
			disabled: submitting || disabled,
			children: submitting ? submittingLabel : submitLabel
		})]
	});
}
//#endregion
export { FormActions as t };
