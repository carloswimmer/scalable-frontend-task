import { describe, expect, it } from "vitest";
import { deriveAllocationBreakdown } from "./derive-allocation";

describe("deriveAllocationBreakdown", () => {
  it("returns three slices that sum to 100 percent", () => {
    const slices = deriveAllocationBreakdown("oCt4GtuDS2YjimboYTBfNu");
    const total = slices.reduce((sum, slice) => sum + slice.percent, 0);

    expect(slices).toHaveLength(3);
    expect(total).toBe(100);
  });

  it("is deterministic for the same portfolio id", () => {
    const id = "portfolio-a";
    expect(deriveAllocationBreakdown(id)).toEqual(deriveAllocationBreakdown(id));
  });
});
