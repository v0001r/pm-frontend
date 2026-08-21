import { describe, expect, it } from "vitest";
import { buildProjectCustomerSearchParams } from "./project-customer-search";

describe("buildProjectCustomerSearchParams", () => {
  it("uses compact customer search without page for picker queries", () => {
    expect(buildProjectCustomerSearchParams("  Acme  ")).toEqual({
      search: "Acme",
      limit: 100,
    });
  });

  it("omits search when empty so all active customers can load", () => {
    expect(buildProjectCustomerSearchParams()).toEqual({ limit: 100 });
    expect(buildProjectCustomerSearchParams("   ")).toEqual({ limit: 100 });
  });
});
