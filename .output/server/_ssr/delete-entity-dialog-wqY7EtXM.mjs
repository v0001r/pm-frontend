import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as AlertDialogCancel, c as AlertDialogFooter, i as AlertDialogAction, l as AlertDialogHeader, o as AlertDialogContent, r as AlertDialog, s as AlertDialogDescription, u as AlertDialogTitle } from "./guard-BbFIUcOG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/delete-entity-dialog-wqY7EtXM.js
var import_jsx_runtime = require_jsx_runtime();
function DeleteEntityDialog({ open, onOpenChange, title, description, confirmLabel = "Delete", isPending = false, onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: description })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
			disabled: isPending,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
			disabled: isPending,
			className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			onClick: (event) => {
				event.preventDefault();
				onConfirm();
			},
			children: isPending ? "Deleting…" : confirmLabel
		})] })] })
	});
}
//#endregion
export { DeleteEntityDialog as t };
