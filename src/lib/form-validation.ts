import { z } from "zod";
import { passwordValid } from "@/components/password";

export const FIELD_LIMITS = {
  EMAIL_MAX: 100,
  NAME_MIN: 3,
  NAME_MAX: 75,
  TITLE_MIN: 3,
  TITLE_MAX: 100,
  SUBJECT_MIN: 3,
  SUBJECT_MAX: 250,
  MOBILE_LENGTH: 10,
  MOBILE_REGEX: /^[6-9]\d{9}$/,
  NAME_REGEX: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
  // local@domain.tld — one domain label and a 2+ letter TLD (rejects naveen@yopmail.com.co)
  EMAIL_REGEX: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/,
} as const;

export const EMAIL_INVALID_MESSAGE = "Please enter a valid email address.";
export const WEBSITE_INVALID_MESSAGE = "Please enter a valid website URL.";
export const NAME_MAX_MESSAGE = "Maximum 75 characters are allowed.";
export const WHITESPACE_INVALID_MESSAGE =
  "Please enter a valid value. Empty or consecutive spaces are not allowed.";
export const CONSECUTIVE_SPACES_MESSAGE = WHITESPACE_INVALID_MESSAGE;
export const MOBILE_INVALID_MESSAGE = "Please enter a valid 10-digit mobile number.";
export const INTERNATIONAL_PHONE_INVALID_MESSAGE = "Please enter a valid phone number.";
export const MOBILE_LENGTH_ERROR = MOBILE_INVALID_MESSAGE;

const CUSTOMER_EMAIL_PATTERN =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
const KNOWN_TLDS = [
  "com", "org", "net", "edu", "gov", "io", "co", "in", "uk", "us", "au", "ca", "de", "fr", "jp", "info", "biz", "me", "ai", "app", "dev",
] as const;
const INTERNATIONAL_PHONE_PATTERN = /^\+?[0-9][0-9\s\-().]*$/;

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

export function constrainPersonNameInput(value: string) {
  return value.replace(/[^A-Za-z ]/g, "").replace(/^ +/, "");
}

export function constrainFreeTextInput(value: string) {
  return value.replace(/^ +/, "");
}

export function hasConsecutiveSpaces(value: string) {
  return /\s{2,}/.test(value);
}

export function hasAnyWhitespace(value: string) {
  return /\s/.test(value);
}

export function constrainInternationalPhoneInput(value: string) {
  let next = "";
  for (const char of value) {
    if (char === "+" && next.length === 0) {
      next += char;
      continue;
    }
    if (/[0-9\s\-().]/.test(char)) next += char;
  }
  return next;
}

export function constrainMobileInput(value: string) {
  return value.replace(/\D/g, "").slice(0, FIELD_LIMITS.MOBILE_LENGTH);
}

export function isValidCustomerEmail(value: string) {
  const email = value.trim();
  if (!CUSTOMER_EMAIL_PATTERN.test(email)) return false;
  const tld = email.slice(email.lastIndexOf(".") + 1).toLowerCase();
  return !KNOWN_TLDS.some((first) =>
    KNOWN_TLDS.some((second) => first !== second && first + second === tld),
  );
}

export function isValidWebsiteUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return true;
  try {
    const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    return /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(url.hostname);
  } catch {
    return false;
  }
}

export function isValidMobilePrefix(digits: string) {
  return digits === "" || /^[6-9]/.test(digits);
}

export function constrainDdMmYyyyInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  if (digits.length <= 2) return day;
  if (digits.length <= 4) return `${day}-${month}`;
  return `${day}-${month}-${year}`;
}

export function isoToDdMmYyyy(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  if (!match) return "";
  return `${match[3]}-${match[2]}-${match[1]}`;
}

export function ddMmYyyyToIso(value: string) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!match) return "";
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return "";
  }
  return `${match[3]}-${match[2]}-${match[1]}`;
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
  .max(FIELD_LIMITS.EMAIL_MAX, "Email cannot exceed 100 characters")
  .refine((value) => !value || FIELD_LIMITS.EMAIL_REGEX.test(value), {
    message: EMAIL_INVALID_MESSAGE,
  });

export const optionalEmailField = z.union([
  z.literal(""),
  z
    .string()
    .trim()
    .max(FIELD_LIMITS.EMAIL_MAX, "Email cannot exceed 100 characters")
    .refine((value) => FIELD_LIMITS.EMAIL_REGEX.test(value), {
      message: EMAIL_INVALID_MESSAGE,
    }),
]);

const customerEmailField = z
  .string()
  .trim()
  .min(1, "Email is required")
  .max(FIELD_LIMITS.EMAIL_MAX, "Email cannot exceed 100 characters")
  .refine((value) => isValidCustomerEmail(value), { message: EMAIL_INVALID_MESSAGE });

const optionalCustomerEmailField = z.union([
  z.literal(""),
  z
    .string()
    .trim()
    .max(FIELD_LIMITS.EMAIL_MAX, "Email cannot exceed 100 characters")
    .refine((value) => isValidCustomerEmail(value), { message: EMAIL_INVALID_MESSAGE }),
]);

const companyNameField = z
  .string()
  .refine((value) => !(value.length > 0 && value.trim() === ""), { message: WHITESPACE_INVALID_MESSAGE })
  .refine((value) => value.trim().length > 0, { message: "Company name is required" })
  .refine((value) => !/\s{2,}/.test(value), { message: WHITESPACE_INVALID_MESSAGE })
  .transform((value) => value.trim());

function internationalPhoneField(required = false) {
  let schema = z.string().trim();
  if (required) {
    schema = schema.min(1, "Mobile number is required");
  }
  return schema.refine((value) => value === "" || INTERNATIONAL_PHONE_PATTERN.test(value), {
    message: INTERNATIONAL_PHONE_INVALID_MESSAGE,
  });
}

const optionalWebsiteField = z
  .string()
  .trim()
  .refine((value) => isValidWebsiteUrl(value), { message: WEBSITE_INVALID_MESSAGE });

function noConsecutiveSpaces(value: string) {
  return value.trim() === "" || !/\s{2,}/.test(value);
}

const optionalTextField = z
  .string()
  .refine((value) => !(value.length > 0 && value.trim() === ""), { message: WHITESPACE_INVALID_MESSAGE })
  .refine(noConsecutiveSpaces, { message: WHITESPACE_INVALID_MESSAGE })
  .transform((value) => value.trim());

const employeeIdField = z
  .string()
  .refine((value) => value === "" || (!value.trim() ? false : !/\s/.test(value)), {
    message: WHITESPACE_INVALID_MESSAGE,
  })
  .transform((value) => value.trim());

function personNameField(label = "Name", required = true) {
  const contentRules = z
    .string()
    .min(FIELD_LIMITS.NAME_MIN, `${label} must be at least 3 characters`)
    .max(FIELD_LIMITS.NAME_MAX, NAME_MAX_MESSAGE)
    .refine((value) => FIELD_LIMITS.NAME_REGEX.test(value), {
      message: `${label} can only contain letters and spaces`,
    });

  const schema = z
    .string()
    .refine((value) => !(value.length > 0 && value.trim() === ""), { message: WHITESPACE_INVALID_MESSAGE })
    .refine((value) => !required || value.trim().length > 0, { message: `${label} is required` })
    .refine((value) => value.trim() === "" || !/\s{2,}/.test(value), { message: WHITESPACE_INVALID_MESSAGE })
    .transform((value) => value.trim());

  if (required) {
    return schema.pipe(contentRules);
  }

  return schema.pipe(z.union([z.literal(""), contentRules]));
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
      { message: MOBILE_INVALID_MESSAGE },
    )
    .transform((value) => (value === "" ? "" : normalizeMobileInput(value)));
}

export const subjectField = z
  .string()
  .trim()
  .min(FIELD_LIMITS.SUBJECT_MIN, "Subject must be at least 3 characters")
  .max(FIELD_LIMITS.SUBJECT_MAX, "Subject cannot exceed 250 characters");

export const customerCreateSchema = z.object({
  companyName: companyNameField,
  email: optionalCustomerEmailField,
  phone: internationalPhoneField(false),
  website: optionalWebsiteField,
  contactName: personNameField("Name"),
  contactEmail: customerEmailField,
  contactMobile: internationalPhoneField(false),
  contactTitle: titleField(false),
});

export const customerEditSchema = z.object({
  companyName: companyNameField,
  email: optionalCustomerEmailField,
  phone: internationalPhoneField(false),
  website: optionalWebsiteField,
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
  email: customerEmailField,
  mobile: internationalPhoneField(false),
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
  address: optionalTextField,
  employeeId: employeeIdField,
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
