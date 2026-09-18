import { describe, expect, it } from "vitest";
import { diagnoseAll, coverageBySilo, PAGES } from "./engine";
import { INTENT_CLUSTERS } from "./intentMap";

describe("Inteligência da Biblioteca", () => {
  const diagnoses = diagnoseAll();

  it("indexa o acervo real", () => {
    expect(PAGES.length).toBeGreaterThan(150);
    expect(PAGES.every((p) => p.path.startsWith("/"))).toBe(true);
  });

  it("diagnostica todos os clusters curados", () => {
    expect(diagnoses).toHaveLength(INTENT_CLUSTERS.length);
  });

  it("nunca entrega recomendação sem explicação auditável", () => {
    for (const d of diagnoses) {
      expect(d.explanation.length).toBeGreaterThan(0);
      expect(d.recommendation.length).toBeGreaterThan(10);
      expect(d.score.components.every((c) => c.reason.length > 0)).toBe(true);
    }
  });

  it("proíbe sugestão de criação quando há canibalização", () => {
    for (const d of diagnoses.filter((x) => x.type === "anti_lacuna")) {
      expect(d.recommendation.toLowerCase()).toContain("não criar");
      expect(d.cannibalizationPaths.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("aplica o guardrail de risco no cluster de recuperação", () => {
    const d = diagnoses.find((x) => x.cluster.id === "recuperar-bitcoin");
    expect(d).toBeDefined();
    expect(d!.guardNotes.some((g) => g.startsWith("GUARD-RISK-01"))).toBe(true);
    expect(d!.cluster.requiredAngle).toMatch(/definitiv/i);
  });

  it("ordena por confiança antes de score", () => {
    const rank = { alta: 0, media: 1, baixa: 2 } as const;
    for (let i = 1; i < diagnoses.length; i++) {
      expect(rank[diagnoses[i - 1].score.confidence]).toBeLessThanOrEqual(rank[diagnoses[i].score.confidence]);
    }
  });

  it("mantém o score dentro da escala e a soma explicável", () => {
    for (const d of diagnoses) {
      expect(d.score.total).toBeGreaterThanOrEqual(0);
      expect(d.score.total).toBeLessThanOrEqual(100);
    }
  });

  it("gera mapa de cobertura por silo com razão entre zero e um", () => {
    for (const s of coverageBySilo(diagnoses)) {
      expect(s.ratio).toBeGreaterThanOrEqual(0);
      expect(s.ratio).toBeLessThanOrEqual(1);
      expect(s.intents).toBeGreaterThan(0);
    }
  });
});
