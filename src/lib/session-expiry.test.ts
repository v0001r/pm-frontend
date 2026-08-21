import { describe, expect, it } from "vitest";
import {
  buildLoginSearch,
  isGuestAuthPath,
  sanitizeReturnTo,
  SESSION_EXPIRED_MESSAGE,
} from "./session-expiry";

describe("session-expiry", () => {
  it("identifies guest auth paths", () => {
    expect(isGuestAuthPath("/")).toBe(true);
    expect(isGuestAuthPath("/forgot-password")).toBe(true);
    expect(isGuestAuthPath("/change-password")).toBe(false);
    expect(isGuestAuthPath("/admin/dashboard")).toBe(false);
  });

  it("sanitizes unsafe or guest return URLs", () => {
    expect(sanitizeReturnTo("//evil.example")).toBeUndefined();
    expect(sanitizeReturnTo("/")).toBeUndefined();
    expect(sanitizeReturnTo("/admin/tickets?page=2")).toBe("/admin/tickets?page=2");
  });

  it("builds login search for expired sessions with redirect", () => {
    expect(buildLoginSearch({ expired: true, redirect: "/staff/dashboard" })).toEqual({
      expired: "1",
      redirect: "/staff/dashboard",
    });
  });

  it("avoids redirect loops for guest routes", () => {
    expect(buildLoginSearch({ expired: true, redirect: "/forgot-password" })).toEqual({
      expired: "1",
    });
  });

  it("uses the required session expiry message", () => {
    expect(SESSION_EXPIRED_MESSAGE).toBe("Your session has expired. Please login again.");
  });
});
