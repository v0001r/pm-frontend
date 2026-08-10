import { z } from "zod";
import { passwordValid } from "@/components/password";

export function mapFieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
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

export const emailField = z.string().trim().min(1, "Email is required").email("Enter a valid email address");

export const optionalEmailField = z.union([
  z.literal(""),
  z.string().trim().email("Enter a valid email address"),
]);

export const customerCreateSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  email: optionalEmailField,
  contactName: z.string().trim().min(1, "Contact name is required"),
  contactEmail: emailField,
});

export const customerEditSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  email: optionalEmailField,
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
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: emailField,
});

export const createTicketSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(120, "Subject cannot exceed 120 characters"),
  projectId: z.string().min(1, "Select a project"),
  categoryId: z.string().min(1, "Select a category"),
  description: z
    .string()
    .trim()
    .min(20, "Please describe the issue in at least 20 characters")
    .max(4000, "Description cannot exceed 4000 characters"),
});

export const internalUserSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: emailField,
  phone: z.string().trim().min(1, "Mobile number is required"),
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
