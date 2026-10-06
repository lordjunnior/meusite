import { describe, expect, it } from "vitest";
import { START_PROFILES } from "./startProfiles";

describe("perfis de entrada", () => {
  it("oferece exatamente os três perfis definidos", () => {
    expect(START_PROFILES.map((profile) => profile.id)).toEqual(["confisco", "mobile", "no-kyc"]);
  });

  it.each([
    ["confisco", "/confisco-1990"],
    ["mobile", "/seguranca-mobile/checklist-permissoes-celular"],
    ["no-kyc", "/comprar-bitcoin-com-privacidade"],
  ] as const)("inicia o perfil %s pelo destino estratégico correto", (id, firstPath) => {
    expect(START_PROFILES.find((profile) => profile.id === id)?.steps[0].path).toBe(firstPath);
  });
});