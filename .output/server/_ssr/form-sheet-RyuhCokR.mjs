import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { C as SheetHeader, S as SheetDescription, b as Sheet, w as SheetTitle, x as SheetContent } from "./guard-BUVsJOD-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/form-sheet-RyuhCokR.js
var import_jsx_runtime = require_jsx_runtime();
function FormSheet({ open, onOpenChange, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "flex w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "shrink-0 space-y-1 border-b px-6 py-5 pr-14 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: title }), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: description }) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-6 py-5",
				children
			})]
		})
	});
}
//#endregion
export { FormSheet as t };
