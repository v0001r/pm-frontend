import { a as passwordValid } from "./password-Cq9Yhv-5.mjs";
import { i as unionType, n as objectType, r as stringType, t as literalType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/form-validation-Baqh5cQX.js
function mapFieldErrors(error) {
	const errors = {};
	for (const issue of error.issues) {
		const key = String(issue.path[0] ?? "");
		if (key && !(key in errors)) errors[key] = issue.message;
	}
	return errors;
}
function validateForm(schema, values) {
	const result = schema.safeParse(values);
	if (result.success) return {
		success: true,
		data: result.data
	};
	return {
		success: false,
		errors: mapFieldErrors(result.error)
	};
}
var emailField = stringType().trim().min(1, "Email is required").email("Enter a valid email address");
var optionalEmailField = unionType([literalType(""), stringType().trim().email("Enter a valid email address")]);
var customerCreateSchema = objectType({
	companyName: stringType().trim().min(1, "Company name is required"),
	email: optionalEmailField,
	contactName: stringType().trim().min(1, "Contact name is required"),
	contactEmail: emailField
});
var customerEditSchema = objectType({
	companyName: stringType().trim().min(1, "Company name is required"),
	email: optionalEmailField
});
var projectFormSchema = objectType({
	name: stringType().trim().min(1, "Project name is required"),
	customerId: stringType().min(1, "Customer is required"),
	startDate: stringType().min(1, "Start date is required"),
	maxHours: stringType().trim().min(1, "Maximum hours is required").refine((value) => Number(value) > 0, "Maximum hours must be greater than zero"),
	endDate: stringType()
}).refine((data) => !data.endDate || data.startDate <= data.endDate, {
	message: "End date cannot be before start date",
	path: ["endDate"]
});
var contactFormSchema = objectType({
	name: stringType().trim().min(2, "Name must be at least 2 characters"),
	email: emailField
});
var createTicketSchema = objectType({
	subject: stringType().trim().min(5, "Subject must be at least 5 characters").max(120, "Subject cannot exceed 120 characters"),
	projectId: stringType().min(1, "Select a project"),
	categoryId: stringType().min(1, "Select a category"),
	description: stringType().trim().min(20, "Please describe the issue in at least 20 characters").max(4e3, "Description cannot exceed 4000 characters")
});
var internalUserSchema = objectType({
	firstName: stringType().trim().min(1, "First name is required"),
	lastName: stringType().trim().min(1, "Last name is required"),
	email: emailField,
	phone: stringType().trim().min(1, "Mobile number is required")
});
var loginSchema = objectType({
	email: emailField,
	password: stringType().min(1, "Password is required")
});
var forgotPasswordSchema = objectType({ email: emailField });
var activateAccountSchema = objectType({
	password: stringType().min(8, "Password must be at least 8 characters"),
	confirm: stringType().min(1, "Please confirm your password")
}).refine((data) => data.password === data.confirm, {
	message: "Passwords do not match",
	path: ["confirm"]
});
var changePasswordSchema = objectType({
	currentPassword: stringType().min(1, "Current password is required"),
	newPassword: stringType().refine(passwordValid, "Your password does not meet all requirements"),
	confirm: stringType().min(1, "Please confirm your new password")
}).refine((data) => data.newPassword === data.confirm, {
	message: "Passwords do not match",
	path: ["confirm"]
});
var resetPasswordSchema = objectType({
	password: stringType().refine(passwordValid, "Your password does not meet all requirements"),
	confirm: stringType().min(1, "Please confirm your password")
}).refine((data) => data.password === data.confirm, {
	message: "Passwords do not match",
	path: ["confirm"]
});
//#endregion
export { customerCreateSchema as a, internalUserSchema as c, resetPasswordSchema as d, validateForm as f, createTicketSchema as i, loginSchema as l, changePasswordSchema as n, customerEditSchema as o, contactFormSchema as r, forgotPasswordSchema as s, activateAccountSchema as t, projectFormSchema as u };
