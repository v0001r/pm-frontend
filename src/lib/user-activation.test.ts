import { describe, expect, it } from "vitest";
import { canAdminResetPassword, isUserActivationPending } from "./user-activation";

describe("user activation status", () => {
  it("treats only accepted users as activation complete", () => {
    expect(isUserActivationPending("Pending")).toBe(true);
    expect(isUserActivationPending("Accepted")).toBe(false);
    expect(canAdminResetPassword("Accepted")).toBe(true);
    expect(canAdminResetPassword("Pending")).toBe(false);
  });
});
