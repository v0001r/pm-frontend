import { describe, expect, it } from "vitest";
import {
  contactEditFormSchema,
  contactFormSchema,
  constrainContactMobileInput,
  constrainMobileInput,
  CONTACT_MOBILE_LENGTH_ERROR,
  EMAIL_INVALID_MESSAGE,
  validateForm,
} from "./form-validation";

const validContactBase = {
  name: "Jane Doe",
  email: "client@acme.com",
};

describe("contact optional field validation", () => {
  describe.each([
    ["jobTitle", { jobTitle: "" }, { jobTitle: "IT" }, "Title must be at least 3 characters"],
  ] as const)("create optional field: %s", (_label, emptyValue, invalidValue, message) => {
    it("allows empty values", () => {
      const result = validateForm(contactFormSchema, {
        ...validContactBase,
        mobile: "",
        jobTitle: "",
        ...emptyValue,
      });

      expect(result.success).toBe(true);
    });

    it("rejects invalid non-empty values", () => {
      const field = Object.keys(invalidValue)[0]!;
      const result = validateForm(contactFormSchema, {
        ...validContactBase,
        mobile: "",
        jobTitle: "",
        ...invalidValue,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[field]).toBe(message);
      }
    });
  });

  it("accepts valid optional values on create", () => {
    const result = validateForm(contactFormSchema, {
      ...validContactBase,
      mobile: "9876543210",
      jobTitle: "Operations Manager",
    });

    expect(result.success).toBe(true);
  });

  it("accepts a +91-prefixed mobile number and normalizes it", () => {
    const result = validateForm(contactFormSchema, {
      ...validContactBase,
      mobile: "+91 98765 43210",
      jobTitle: "",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.mobile).toBe("9876543210");
    }
  });

  it("accepts mobile numbers that do not start with 6, 7, 8, or 9", () => {
    const result = validateForm(contactFormSchema, {
      ...validContactBase,
      mobile: "1234567890",
      jobTitle: "",
    });

    expect(result.success).toBe(true);
  });

  it("accepts mobile numbers that are not 10 digits", () => {
    const result = validateForm(contactFormSchema, {
      ...validContactBase,
      mobile: "987654321",
      jobTitle: "",
    });

    expect(result.success).toBe(true);
  });

  it("accepts a 16-digit mobile number", () => {
    const result = validateForm(contactFormSchema, {
      ...validContactBase,
      mobile: "1234567890123456",
      jobTitle: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a mobile number exceeding 16 digits", () => {
    const result = validateForm(contactFormSchema, {
      ...validContactBase,
      mobile: "12345678901234567",
      jobTitle: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.mobile).toBe(CONTACT_MOBILE_LENGTH_ERROR);
    }
  });

  it("treats whitespace-only job title as empty", () => {
    const result = validateForm(contactFormSchema, {
      ...validContactBase,
      mobile: "",
      jobTitle: "   ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.jobTitle).toBe("");
    }
  });

  it("rejects invalid required email values", () => {
    const result = validateForm(contactFormSchema, {
      ...validContactBase,
      email: "not-an-email",
      mobile: "",
      jobTitle: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toBe(EMAIL_INVALID_MESSAGE);
    }
  });

  it("rejects invalid required name values", () => {
    const result = validateForm(contactFormSchema, {
      name: "Jo",
      email: "client@acme.com",
      mobile: "",
      jobTitle: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBe("Name must be at least 3 characters");
    }
  });
});

describe("contact edit optional field validation", () => {
  it("allows clearing optional fields on edit", () => {
    const result = validateForm(contactEditFormSchema, {
      ...validContactBase,
      mobile: "",
      jobTitle: "",
    });

    expect(result.success).toBe(true);
  });

  it("accepts any non-empty mobile number on edit", () => {
    const result = validateForm(contactEditFormSchema, {
      ...validContactBase,
      mobile: "abc",
      jobTitle: "",
    });

    expect(result.success).toBe(true);
  });

  it("accepts valid optional values on edit", () => {
    const result = validateForm(contactEditFormSchema, {
      ...validContactBase,
      mobile: "9988776655",
      jobTitle: "IT Manager",
    });

    expect(result.success).toBe(true);
  });
});

describe("contact mobile input constraints", () => {
  it("strips non-digit characters", () => {
    expect(constrainMobileInput("98-7654-3210")).toBe("9876543210");
    expect(constrainMobileInput("abc123def")).toBe("123");
    expect(constrainContactMobileInput("98-7654-3210")).toBe("9876543210");
    expect(constrainContactMobileInput("abc123def")).toBe("123");
  });

  it("limits contact mobile input to 16 digits", () => {
    expect(constrainContactMobileInput("9876543210")).toBe("9876543210");
    expect(constrainContactMobileInput("98765432101")).toBe("98765432101");
    expect(constrainContactMobileInput("9876543210123456")).toBe("9876543210123456");
    expect(constrainContactMobileInput("98765432101234567")).toBe("9876543210123456");
  });

  it("keeps internal user mobile input limited to 10 digits", () => {
    expect(constrainMobileInput("9876543210")).toBe("9876543210");
    expect(constrainMobileInput("98765432101")).toBe("9876543210");
    expect(constrainMobileInput("9876543210123456")).toBe("9876543210");
  });
});
