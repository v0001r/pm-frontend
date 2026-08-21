import { describe, expect, it } from "vitest";
import { projectFormSchema, validateForm } from "./form-validation";

function validateProjectName(name: string) {
  return validateForm(projectFormSchema, {
    name,
    customerId: "507f1f77bcf86cd799439011",
    startDate: "2026-01-15",
    maxHours: "200",
    endDate: "",
  });
}

function validateMaxHours(maxHours: string) {
  return validateForm(projectFormSchema, {
    name: "Website Redesign",
    customerId: "507f1f77bcf86cd799439011",
    startDate: "2026-01-15",
    maxHours,
    endDate: "",
  });
}

describe("project name validation", () => {
  it("accepts a valid project name", () => {
    const result = validateProjectName("Website Redesign");
    expect(result.success).toBe(true);
  });

  it("trims leading and trailing whitespace from the submitted name", () => {
    const result = validateProjectName("  Website Redesign  ");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Website Redesign");
    }
  });

  it("rejects empty project names", () => {
    const result = validateProjectName("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBe("Project name is required");
    }
  });

  it("rejects whitespace-only project names", () => {
    const result = validateProjectName("   ");
    expect(result.success).toBe(false);
  });

  it("rejects project names with consecutive spaces", () => {
    const result = validateProjectName("Website  Redesign");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBe(
        "Please enter a valid value. Empty or consecutive spaces are not allowed.",
      );
    }
  });

  it("accepts a project name at the max length boundary", () => {
    const result = validateProjectName("A".repeat(120));
    expect(result.success).toBe(true);
  });

  it("rejects a project name exceeding the max length", () => {
    const result = validateProjectName("A".repeat(121));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBe("Project name cannot exceed 120 characters");
    }
  });
});

describe("maximum hours validation", () => {
  it("accepts a whole number", () => {
    const result = validateMaxHours("200");
    expect(result.success).toBe(true);
  });

  it("rejects decimal values", () => {
    const result = validateMaxHours("200.5");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.maxHours).toBe("Maximum hours must be a whole number");
    }
  });

  it("rejects zero", () => {
    const result = validateMaxHours("0");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.maxHours).toBe("Maximum hours must be greater than zero");
    }
  });

  it("rejects negative values", () => {
    const result = validateMaxHours("-5");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.maxHours).toBe("Maximum hours must be greater than zero");
    }
  });

  it("rejects empty values", () => {
    const result = validateMaxHours("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.maxHours).toBe("Maximum hours is required");
    }
  });
});
