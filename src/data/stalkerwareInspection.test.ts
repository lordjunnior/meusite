import { describe, expect, it } from "vitest";
import { STALKERWARE_HOTSPOTS, STALKERWARE_SCAN_STEPS } from "./stalkerwareInspection";

describe("inspeção tática de stalkerware", () => {
  it("cobre os três vetores silenciosos definidos", () => {
    expect(STALKERWARE_HOTSPOTS.map((item) => item.id)).toEqual([
      "accessibility",
      "certificates",
      "background",
    ]);
  });

  it("inclui varredura de certificados e permissões especiais", () => {
    expect(STALKERWARE_SCAN_STEPS.some((step) => step.includes("certificados"))).toBe(true);
    expect(STALKERWARE_SCAN_STEPS.some((step) => step.includes("permissões especiais"))).toBe(true);
  });
});