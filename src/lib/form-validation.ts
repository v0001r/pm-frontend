import { z } from "zod";
import { passwordValid } from "@/components/password";

export const FIELD_LIMITS = {
  EMAIL_MAX: 100,
  NAME_MIN: 3,
  NAME_MAX: 50,
  TITLE_MIN: 3,
  TITLE_MAX: 100,
  SUBJECT_MIN: 3,
  SUBJECT_MAX: 250,
  MOBILE_LENGTH: 10,
  MOBILE_REGEX: /^[6-9]\d{9}$/,
} as const;

const MOBILE_ERROR = "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9";

export function getZodErrorMessage(error: z.ZodError): string {
  const preferred = error.issues.find((issue) => issue.message && issue.message !== "Invalid input");
  return preferred?.message ?? error.issues[0]?.message ?? "Invalid value";
}

export function normalizeMobileInput(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  return digits;
}

export function mapFieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (!key || key in errors) continue;
    if (issue.message === "Invalid input") continue;
    errors[key] = issue.message;
  }
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !(key in errors)) {
      errors[key] = issue.message;
    }
  }
  return errors;
}

export function validateForm<T extends z.ZodTypeAny>(
  schema: T,
  values: unknown,
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(values);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: mapFieldErrors(result.error) };
}

export const emailField = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .max(FIELD_LIMITS.EMAIL_MAX, "Email cannot exceed 100 characters");

export const optionalEmailField = z.union([
  z.literal(""),
  z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(FIELD_LIMITS.EMAIL_MAX, "Email cannot exceed 100 characters"),
]);

function personNameField(label = "Name", required = true) {
  const rules = z
    .string()
    .trim()
    .min(FIELD_LIMITS.NAME_MIN, `${label} must be at least 3 characters`)
    .max(FIELD_LIMITS.NAME_MAX, `${label} cannot exceed 50 characters`);

  if (required) {
    return z.string().trim().min(1, `${label} is required`).pipe(rules);
  }

  return z.union([z.literal(""), rules]);
}

function titleField(required = false) {
  const rules = z
    .string()
    .trim()
    .min(FIELD_LIMITS.TITLE_MIN, "Title must be at least 3 characters")
    .max(FIELD_LIMITS.TITLE_MAX, "Title cannot exceed 100 characters");

  if (required) {
    return z.string().trim().min(1, "Title is required").pipe(rules);
  }

  return z.union([z.literal(""), rules]);
}

function mobileField(required = true) {
  let schema = z.string().trim();

  if (required) {
    schema = schema.min(1, "Mobile number is required");
  }

  return schema
    .refine(
      (value) => value === "" || FIELD_LIMITS.MOBILE_REGEX.test(normalizeMobileInput(value)),
      { message: MOBILE_ERROR },
    )
    .transform((value) => (value === "" ? "" : normalizeMobileInput(value)));
}

export const subjectField = z
  .string()
  .trim()
  .min(FIELD_LIMITS.SUBJECT_MIN, "Subject must be at least 3 characters")
  .max(FIELD_LIMITS.SUBJECT_MAX, "Subject cannot exceed 250 characters");

export const customerCreateSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  email: optionalEmailField,
  phone: mobileField(false),
  contactName: personNameField("Name"),
  contactEmail: emailField,
  contactMobile: mobileField(),
  contactTitle: titleField(false),
});

export const customerEditSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  email: optionalEmailField,
  phone: mobileField(false),
});

export const projectFormSchema = z
  .object({
    name: z.string().trim().min(1, "Project name is required"),
    customerId: z.string().min(1, "Customer is required"),
    startDate: z.string().min(1, "Start date is required"),
    maxHours: z
      .string()
      .trim()
      .min(1, "Maximum hours is required")
      .refine((value) => Number(value) > 0, "Maximum hours must be greater than zero"),
    endDate: z.string(),
  })
  .refine((data) => !data.endDate || data.startDate <= data.endDate, {
    message: "End date cannot be before start date",
    path: ["endDate"],
  });

export const contactFormSchema = z.object({
  name: personNameField("Name"),
  email: emailField,
  mobile: mobileField(false),
  jobTitle: titleField(false),
});

export const createTicketSchema = z.object({
  subject: subjectField,
  projectId: z.string().min(1, "Select a project"),
  categoryId: z.string().min(1, "Select a category"),
  description: z
    .string()
    .trim()
    .min(20, "Please describe the issue in at least 20 characters")
    .max(4000, "Description cannot exceed 4000 characters"),
});

export const internalUserSchema = z.object({
  firstName: personNameField("First name"),
  lastName: personNameField("Last name"),
  email: emailField,
  phone: mobileField(),
});

export const profilePhoneSchema = z.object({
  phone: mobileField(false),
});

export const companySettingsSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  supportEmail: optionalEmailField,
  contactNumber: mobileField(false),
});

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export const activateAccountSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().refine(passwordValid, "Your password does not meet all requirements"),
    confirm: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export const resetPasswordSchema = z
  .object({
    password: z.string().refine(passwordValid, "Your password does not meet all requirements"),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
