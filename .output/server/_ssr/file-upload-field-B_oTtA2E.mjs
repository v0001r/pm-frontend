import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as api, c as cn, n as Button, u as getApiErrorMessage } from "./button-Du-Bk9Wl.mjs";
import { C as Paperclip, F as LoaderCircle, t as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/file-upload-field-B_oTtA2E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var UPLOAD_MAX_FILE_SIZE = 10485760;
async function uploadFile(file, context, options) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("context", context);
	if (options?.ticketId) formData.append("ticketId", options.ticketId);
	const { data } = await api.post("/uploads", formData, { headers: { "Content-Type": "multipart/form-data" } });
	return data.data;
}
async function uploadFiles(files, context, options) {
	const maxFiles = options?.maxFiles ?? 5;
	const selected = files.slice(0, maxFiles);
	return Promise.all(selected.map((file) => {
		if (file.size > 10485760) throw new Error(`${file.name} exceeds the 10MB limit`);
		return uploadFile(file, context, options);
	}));
}
function FileUploadField({ context, ticketId, files, onChange, maxFiles = 5, accept, label, hint = "Max 5 files, 10MB each", className, variant = "dropzone", hideFileList = false }) {
	const inputRef = (0, import_react.useRef)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	async function handleFilesSelected(event) {
		const picked = Array.from(event.target.files ?? []);
		event.target.value = "";
		if (!picked.length) return;
		if (files.length >= maxFiles) {
			toast.error(`You can attach up to ${maxFiles} files.`);
			return;
		}
		const remaining = maxFiles - files.length;
		const batch = picked.slice(0, remaining);
		const oversized = batch.find((file) => file.size > UPLOAD_MAX_FILE_SIZE);
		if (oversized) {
			toast.error(`${oversized.name} exceeds the 10MB limit.`);
			return;
		}
		setUploading(true);
		try {
			const uploaded = await uploadFiles(batch, context, {
				ticketId,
				maxFiles: remaining
			});
			onChange([...files, ...uploaded]);
		} catch (error) {
			toast.error(getApiErrorMessage(error, "Failed to upload file"));
		} finally {
			setUploading(false);
		}
	}
	function removeFile(index) {
		onChange(files.filter((_, fileIndex) => fileIndex !== index));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-2", className),
		children: [
			label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-medium text-foreground",
				children: label
			}) : null,
			variant === "button" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					className: "rounded-md",
					disabled: uploading || files.length >= maxFiles,
					onClick: () => inputRef.current?.click(),
					children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" }), "Attach file"]
				}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: hint
				}) : null]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex cursor-pointer items-center gap-2 rounded-sm border border-dashed px-3 py-4 text-sm text-muted-foreground hover:bg-accent/50",
				children: [
					uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" }),
					uploading ? "Uploading…" : "Attach screenshots or documents",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs",
						children: [
							"(",
							hint,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						multiple: true,
						className: "hidden",
						accept,
						disabled: uploading || files.length >= maxFiles,
						onChange: handleFilesSelected
					})
				]
			}),
			variant === "button" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				multiple: true,
				className: "hidden",
				accept,
				disabled: uploading || files.length >= maxFiles,
				onChange: handleFilesSelected
			}) : null,
			files.length > 0 && !hideFileList ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-wrap gap-2",
				children: files.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: file.url,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:underline",
							children: file.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: ["· ", file.size]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => removeFile(index),
							"aria-label": `Remove ${file.name}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
						})
					]
				}, `${file.key}-${index}`))
			}) : null
		]
	});
}
//#endregion
export { FileUploadField as t };
