import { describe, expect, it } from "vitest";
import {
  customerCreateSchema,
  customerEditSchema,
  EMAIL_INVALID_MESSAGE,
  INTERNATIONAL_PHONE_INVALID_MESSAGE,
  validateForm,
  WEBSITE_INVALID_MESSAGE,
  WHITESPACE_INVALID_MESSAGE,
} from "./form-validation";

const validCreateBase = {
  companyName: "Acme Corp",
  contactName: "Jane Doe",
  contactEmail: "client@acme.com",
};

describe("customer optional field validation", () => {
  describe.each([
    ["email", { email: "" }, { email: "not-an-email" }, EMAIL_INVALID_MESSAGE],
    ["phone", { phone: "" }, { phone: "abc" }, INTERNATIONAL_PHONE_INVALID_MESSAGE],
    ["website", { website: "" }, { website: "not-a-url" }, WEBSITE_INVALID_MESSAGE],
    ["contactMobile", { contactMobile: "" }, { contactMobile: "abc" }, INTERNATIONAL_PHONE_INVALID_MESSAGE],
    ["address", { address: "" }, { address: "Main  Street" }, WHITESPACE_INVALID_MESSAGE],
    ["city", { city: "" }, { city: "   " }, WHITESPACE_INVALID_MESSAGE],
    ["state", { state: "" }, { state: "New  York" }, WHITESPACE_INVALID_MESSAGE],
    ["postalCode", { postalCode: "" }, { postalCode: "10  018" }, WHITESPACE_INVALID_MESSAGE],
    ["country", { country: "" }, { country: "United  States" }, WHITESPACE_INVALID_MESSAGE],
    ["contactTitle", { contactTitle: "" }, { contactTitle: "IT" }, "Title must be at least 3 characters"],
  ] as const)("create optional field: %s", (_label, emptyValue, invalidValue, message) => {
    it("allows empty values", () => {
      const result = validateForm(customerCreateSchema, {
        ...validCreateBase,
        email: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        contactMobile: "",
        contactTitle: "",
        ...emptyValue,
      });

      expect(result.success).toBe(true);
    });

    it("rejects invalid non-empty values", () => {
      const field = Object.keys(invalidValue)[0]!;
      const result = validateForm(customerCreateSchema, {
        ...validCreateBase,
        email: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        contactMobile: "",
        contactTitle: "",
        ...invalidValue,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[field]).toBe(message);
      }
    });
  });

  it("accepts valid optional values on create", () => {
    const result = validateForm(customerCreateSchema, {
      ...validCreateBase,
      email: "contact@acme.com",
      phone: "+14155552671",
      website: "https://acme.example.com",
      address: "350 Fifth Avenue",
      city: "New York",
      state: "NY",
      postalCode: "10118",
      country: "United States",
      contactMobile: "+14155550100",
      contactTitle: "IT Manager",
    });

    expect(result.success).toBe(true);
  });

  it("treats whitespace-only optional organization email and title as empty", () => {
    const result = validateForm(customerCreateSchema, {
      ...validCreateBase,
      email: "   ",
      phone: "",
      website: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      contactMobile: "",
      contactTitle: "   ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("");
      expect(result.data.contactTitle).toBe("");
    }
  });
});

describe("customer edit optional field validation", () => {
  it("allows unchanged valid optional values", () => {
    const result = validateForm(customerEditSchema, {
      companyName: "Acme Corp",
      email: "contact@acme.com",
      phone: "+14155552671",
      website: "https://acme.example.com",
      address: "350 Fifth Avenue",
      city: "New York",
      state: "NY",
      postalCode: "10118",
      country: "United States",
    });

    expect(result.success).toBe(true);
  });

  it("allows clearing optional fields on edit", () => {
    const result = validateForm(customerEditSchema, {
      companyName: "Acme Corp",
      email: "",
      phone: "",
      website: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid optional website on edit", () => {
    const result = validateForm(customerEditSchema, {
      companyName: "Acme Corp",
      email: "",
      phone: "",
      website: "bad-url",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.website).toBe(WEBSITE_INVALID_MESSAGE);
    }
  });
});
