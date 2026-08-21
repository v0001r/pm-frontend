import { describe, expect, it } from "vitest";
import {
  CUSTOMER_EMAIL_DUPLICATE_MESSAGE,
  customerCreateSchema,
  EMAIL_INVALID_MESSAGE,
  INTERNAL_USER_EMAIL_DUPLICATE_MESSAGE,
  INTERNAL_USER_EMPLOYEE_ID_DUPLICATE_MESSAGE,
  INTERNAL_USER_MOBILE_DUPLICATE_MESSAGE,
  isValidCustomerEmail,
  mapContactApiFieldErrors,
  mapCustomerApiFieldErrors,
  mapInternalUserApiFieldErrors,
  validateForm,
} from "./form-validation";

describe("customer email validation", () => {
  it("accepts valid customer emails aligned with backend rules", () => {
    expect(isValidCustomerEmail("client@acme.com")).toBe(true);
    expect(isValidCustomerEmail("user@company.co.uk")).toBe(true);
    expect(isValidCustomerEmail("admin@helpdesk.io")).toBe(true);
  });

  it("rejects invalid customer emails", () => {
    expect(isValidCustomerEmail("not-an-email")).toBe(false);
    expect(isValidCustomerEmail("user@domain.c")).toBe(false);
    expect(isValidCustomerEmail("user@domain.comco")).toBe(false);
  });

  it("treats whitespace-only organization email as empty", () => {
    const result = validateForm(customerCreateSchema, {
      companyName: "Acme Corp",
      email: "   ",
      phone: "",
      website: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      contactName: "Jane Doe",
      contactEmail: "client@acme.com",
      contactMobile: "",
      contactTitle: "",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("");
    }
  });

  it("returns duplicate email message mapping for API field errors", () => {
    expect(
      mapCustomerApiFieldErrors({
        email: CUSTOMER_EMAIL_DUPLICATE_MESSAGE,
        "primaryContact.email": CUSTOMER_EMAIL_DUPLICATE_MESSAGE,
      }),
    ).toEqual({
      email: CUSTOMER_EMAIL_DUPLICATE_MESSAGE,
      contactEmail: CUSTOMER_EMAIL_DUPLICATE_MESSAGE,
    });
  });

  it("returns email validation message for invalid contact email", () => {
    const result = validateForm(customerCreateSchema, {
      companyName: "Acme Corp",
      email: "",
      phone: "",
      website: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      contactName: "Jane Doe",
      contactEmail: "invalid-email",
      contactMobile: "",
      contactTitle: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.contactEmail).toBe(EMAIL_INVALID_MESSAGE);
      expect(result.errors.email).toBeUndefined();
    }
  });
});

describe("internal user duplicate validation mapping", () => {
  it("maps backend duplicate field errors to internal user form fields", () => {
    expect(
      mapInternalUserApiFieldErrors({
        email: INTERNAL_USER_EMAIL_DUPLICATE_MESSAGE,
        phone: INTERNAL_USER_MOBILE_DUPLICATE_MESSAGE,
        employeeId: INTERNAL_USER_EMPLOYEE_ID_DUPLICATE_MESSAGE,
      }),
    ).toEqual({
      email: INTERNAL_USER_EMAIL_DUPLICATE_MESSAGE,
      phone: INTERNAL_USER_MOBILE_DUPLICATE_MESSAGE,
      employeeId: INTERNAL_USER_EMPLOYEE_ID_DUPLICATE_MESSAGE,
    });
  });

  it("maps legacy mobile field aliases to phone", () => {
    expect(
      mapInternalUserApiFieldErrors({
        mobile: INTERNAL_USER_MOBILE_DUPLICATE_MESSAGE,
      }),
    ).toEqual({
      phone: INTERNAL_USER_MOBILE_DUPLICATE_MESSAGE,
    });
  });
});

describe("contact duplicate field mapping", () => {
  it("maps backend contact email duplicate errors to the email field", () => {
    expect(
      mapContactApiFieldErrors({
        contactEmail: CUSTOMER_EMAIL_DUPLICATE_MESSAGE,
        mobile: "Mobile number already exists.",
      }),
    ).toEqual({
      email: CUSTOMER_EMAIL_DUPLICATE_MESSAGE,
      mobile: "Mobile number already exists.",
    });
  });
});

describe("customer create validation success response", () => {
  it("validates a create payload that should succeed server-side", () => {
    const result = validateForm(customerCreateSchema, {
      companyName: "Acme Corp",
      email: "",
      phone: "+14155552671",
      website: "https://acme.com",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      contactName: "Jane Doe",
      contactEmail: "client@acme.com",
      contactMobile: "",
      contactTitle: "Manager",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.contactEmail).toBe("client@acme.com");
    }
  });
});
