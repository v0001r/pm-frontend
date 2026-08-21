import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as validateForm, w as getZodErrorMessage } from "./form-validation-CtBmYCtB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-zod-form-Dm4FjREe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useZodForm(schema) {
	const [errors, setErrors] = (0, import_react.useState)({});
	const [touched, setTouched] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const errorsRef = (0, import_react.useRef)(errors);
	const touchedRef = (0, import_react.useRef)(touched);
	errorsRef.current = errors;
	touchedRef.current = touched;
	const getFieldError = (0, import_react.useCallback)((field, value) => {
		const fieldSchema = schema.shape[field];
		if (!fieldSchema) return void 0;
		const result = fieldSchema.safeParse(value);
		if (result.success) return void 0;
		return getZodErrorMessage(result.error);
	}, [schema]);
	const setFieldError = (0, import_react.useCallback)((field, value) => {
		const message = getFieldError(field, value);
		setErrors((current) => {
			const next = { ...current };
			if (message) next[field] = message;
			else delete next[field];
			errorsRef.current = next;
			return next;
		});
	}, [getFieldError]);
	const markTouched = (0, import_react.useCallback)((field) => {
		setTouched((current) => {
			if (current.has(field)) return current;
			const next = new Set(current);
			next.add(field);
			touchedRef.current = next;
			return next;
		});
	}, []);
	const handleBlur = (0, import_react.useCallback)((field, value) => {
		markTouched(field);
		setFieldError(field, value);
	}, [markTouched, setFieldError]);
	const handleChange = (0, import_react.useCallback)((field, value) => {
		if (touchedRef.current.has(field) || errorsRef.current[field]) setFieldError(field, value);
	}, [setFieldError]);
	const clearAllErrors = (0, import_react.useCallback)(() => {
		errorsRef.current = {};
		setErrors({});
	}, []);
	const clearFieldError = (0, import_react.useCallback)((field) => {
		setErrors((current) => {
			if (!current[field]) return current;
			const next = { ...current };
			delete next[field];
			errorsRef.current = next;
			return next;
		});
	}, []);
	const validateAll = (0, import_react.useCallback)((values) => {
		const result = validateForm(schema, values);
		if (result.success) {
			errorsRef.current = {};
			setErrors({});
			return {
				success: true,
				data: result.data
			};
		}
		errorsRef.current = result.errors;
		setErrors(result.errors);
		setTouched((current) => {
			const next = new Set(current);
			for (const key of Object.keys(result.errors)) next.add(key);
			touchedRef.current = next;
			return next;
		});
		return {
			success: false,
			errors: result.errors
		};
	}, [schema]);
	return {
		errors,
		handleBlur,
		handleChange,
		clearFieldError,
		clearAllErrors,
		setFieldErrors: (0, import_react.useCallback)((nextErrors) => {
			errorsRef.current = nextErrors;
			setErrors(nextErrors);
			setTouched((current) => {
				const next = new Set(current);
				for (const key of Object.keys(nextErrors)) next.add(key);
				touchedRef.current = next;
				return next;
			});
		}, []),
		validateAll
	};
}
//#endregion
export { useZodForm as t };
