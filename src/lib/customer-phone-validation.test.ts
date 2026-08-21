import { describe, expect, it } from "vitest";
import {
  customerCreateSchema,
  customerEditSchema,
  INTERNATIONAL_PHONE_INVALID_MESSAGE,
  isValidInternationalPhone,
  validateForm,
} from "./form-validation";

const validCreateBase = {
  companyName: "Acme Corp",
  contactName: "Jane Doe",
  contactEmail: "client@acme.com",
};

describe("isValidInternationalPhone", () => {
  it("allows empty values", () => {
    expect(isValidInternationalPhone("")).toBe(true);
    expect(isValidInternationalPhone("   ")).toBe(true);
  });

  it("accepts valid domestic numbers", () => {
    expect(isValidInternationalPhone("9876543210")).toBe(true);
    expect(isValidInternationalPhone("4155552671")).toBe(true);
    expect(isValidInternationalPhone("02079460958")).toBe(true);
  });

  it("accepts valid international numbers", () => {
    expect(isValidInternationalPhone("+14155552671")).toBe(true);
    expect(isValidInternationalPhone("+44 20 7946 0958")).toBe(true);
    expect(isValidInternationalPhone("+1 (415) 555-2671")).toBe(true);
    expect(isValidInternationalPhone("(415) 555-2671")).toBe(true);
    expect(isValidInternationalPhone("+91 98765 43210")).toBe(true);
  });

  it("rejects alphabetic input", () => {
    expect(isValidInternationalPhone("abc")).toBe(false);
    expect(isValidInternationalPhone("+1-800-FLOWERS")).toBe(false);
  });

  it("rejects clearly invalid characters", () => {
    expect(isValidInternationalPhone("98765#4321")).toBe(false);
    expect(isValidInternationalPhone("phone@123.com")).toBe(false);
  });

  it("accepts international numbers regardless of fixed digit counts", () => {
    expect(isValidInternationalPhone("123456")).toBe(true);
    expect(isValidInternationalPhone("+1234567890123456")).toBe(true);
    expect(isValidInternationalPhone("+61 2 9876 5432")).toBe(true);
  });

  it("rejects values without any digits", () => {
    expect(isValidInternationalPhone("+")).toBe(false);
    expect(isValidInternationalPhone("---")).toBe(false);
  });

  it("rejects plus signs not at the start", () => {
    expect(isValidInternationalPhone("415+5552671")).toBe(false);
  });
});

describe("customer phone schema validation", () => {
  it("accepts valid organization and contact mobile numbers on create", () => {
    const result = validateForm(customerCreateSchema, {
      ...validCreateBase,
      email: "",
      phone: "(415) 555-2671",
      website: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      contactMobile: "+91 98765 43210",
      contactTitle: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid organization phone on create", () => {
    const result = validateForm(customerCreateSchema, {
      ...validCreateBase,
      email: "",
      phone: "abc",
      website: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      contactMobile: "",
      contactTitle: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.phone).toBe(INTERNATIONAL_PHONE_INVALID_MESSAGE);
    }
  });

  it("rejects invalid primary contact mobile on create", () => {
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
      contactMobile: "12#45",
      contactTitle: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.contactMobile).toBe(INTERNATIONAL_PHONE_INVALID_MESSAGE);
    }
  });

  it("accepts valid international phone on edit", () => {
    const result = validateForm(customerEditSchema, {
      companyName: "Acme Corp",
      email: "",
      phone: "+44 20 7946 0958",
      website: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });

    expect(result.success).toBe(true);
  });
});
