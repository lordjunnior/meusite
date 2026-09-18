// Motores 03 a 06, fase 1, totalmente determinísticos e auditáveis.
// Coverage Engine, Gap Engine, Editorial Guard e Opportunity Engine.
// Nenhuma recomendação sai daqui sem a lista de critérios que a produziu.

import fingerprintData from "@/data/pageFingerprints.json";
import { INTENT_CLUSTERS } from "./intentMap";
import type {
  CoverageMatch,
  CoverageVerdict,
  GapDiagnosis,
  GapType,
  IntentCluster,
  IntentNode,
  OpportunityScore,
  ScoreComponent,
  SiloCoverage,
} from "./types";

export interface PageFingerprint {
  path: string;
  file: string;
  title: string;
  silo: string;
  navLabel?: string;
  wordCount: number;
  headings: string[];
  primaryKeyword?: string;
  lsi: string[];
  tags: string[];
  description?: string;
  terms: string[];
}

const RAW = fingerprintData as { generatedAt: string; pages: PageFingerprint[] };

export const PAGES: PageFingerprint[] = RAW.pages;
export const FINGERPRINTS_GENERATED_AT = RAW.generatedAt;

const STOPWORDS = new Set(
  ("a o e de da do das dos em no na nos nas um uma para por com que se ao aos as os sua seu " +
    "como qual quais mais menos sem sob sobre entre ou nao sim ja foi ser sao esta este isso pelo pela").split(" "),
);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pageTermSet(page: PageFingerprint): Set<string> {
  return new Set(page.terms);
}

/** Campos de foco: título, keyword primária, rótulo de menu e rota. É o que separa "responde" de "menciona". */
function focusText(page: PageFingerprint): string {
  return normalize(
    [page.title, page.primaryKeyword ?? "", page.navLabel ?? "", page.path.replace(/[/-]/g, " ")].join(" "),
  );
}

function headingText(page: PageFingerprint): string {
  return normalize(page.headings.join(" "));
}

function matchIntentToPage(intent: IntentNode, page: PageFingerprint): CoverageMatch {
  const terms = intent.terms;
  const bag = pageTermSet(page);
  const hits = terms.filter((t) => bag.has(t));
  const semanticScore = terms.length ? hits.length / terms.length : 0;

  const focus = focusText(page);
  const headings = headingText(page);
  const focusHits = terms.filter((t) => focus.includes(t));
  const headingHits = terms.filter((t) => headings.includes(t));

  // Foco: o assunto precisa aparecer onde a página se declara, não apenas no corpo.
  const focusScore = Math.min(
    1,
    (focusHits.length / Math.max(2, terms.length)) * 1.6 + (headingHits.length / Math.max(3, terms.length)) * 0.9,
  );

  let verdict: CoverageVerdict = "irrelevante";
  if (focusScore >= 0.62 && semanticScore >= 0.5) verdict = "responde";
  else if (semanticScore >= 0.5) verdict = "menciona";
  else if (semanticScore >= 0.34) verdict = "tangencia";

  const evidence: string[] = [];
  if (focusHits.length) evidence.push(`título e rota citam: ${focusHits.slice(0, 4).join(", ")}`);
  const matchedHeading = page.headings.find((h) => terms.some((t) => normalize(h).includes(t)));
  if (matchedHeading) evidence.push(`seção: ${matchedHeading.slice(0, 90)}`);
  if (!evidence.length && hits.length) evidence.push(`termos no corpo: ${hits.slice(0, 4).join(", ")}`);

  return {
    intentId: intent.id,
    path: page.path,
    title: page.title,
    silo: page.silo,
    semanticScore: Number(semanticScore.toFixed(2)),
    focusScore: Number(focusScore.toFixed(2)),
    verdict,
    evidence,
  };
}

export function coverageForIntent(intent: IntentNode): CoverageMatch[] {
  return PAGES.map((page) => matchIntentToPage(intent, page))
    .filter((m) => m.verdict !== "irrelevante")
    .sort((a, b) => b.focusScore + b.semanticScore - (a.focusScore + a.semanticScore));
}

// ───────────────────────── Editorial Guard ─────────────────────────

interface GuardRule {
  id: string;
  description: string;
  appliesTo: (cluster: IntentCluster) => boolean;
  effect: "bloqueia_criacao" | "exige_angulo" | "exige_disclaimer";
}

export const GUARD_RULES: GuardRule[] = [
  {
    id: "GUARD-RISK-01",
    description:
      "Consulta com promessa implícita de resultado. Obriga ângulo que separe o recuperável do definitivo.",
    appliesTo: (c) => c.guards.includes("GUARD-RISK-01"),
    effect: "exige_angulo",
  },
  {
    id: "GUARD-RISK-02",
    description: "Consulta que expõe o leitor a vetor de golpe secundário. Obriga bloco de alerta.",
    appliesTo: (c) => c.guards.includes("GUARD-RISK-02"),
    effect: "exige_angulo",
  },
  {
    id: "GUARD-YMYL-01",
    description: "Tema de saúde, finanças ou direito. Exige fontes verificáveis e ressalva explícita.",
    appliesTo: (c) => c.guards.includes("GUARD-YMYL-01"),
    effect: "exige_disclaimer",
  },
  {
    id: "GUARD-STYLE-01",
    description: "Tensão editorial deve ser real. Proibida promessa enganosa no título.",
    appliesTo: (c) => c.guards.includes("GUARD-STYLE-01"),
    effect: "exige_angulo",
  },
  {
    id: "GUARD-CANNIBAL-01",
    description: "Canibalização detectada. Proibido sugerir criação enquanto não for resolvida.",
    appliesTo: () => true,
    effect: "bloqueia_criacao",
  },
];

// ───────────────────────── Opportunity Engine ─────────────────────────

const WEIGHTS = {
  demandaExterna: 18,
  demandaInterna: 16,
  perguntasHumanas: 12,
  ausenciaCobertura: 15,
  relevanciaSilo: 10,
  relevanciaJornada: 8,
  tendencia: 7,
  risco: 6,
  dificuldade: -10,
  canibalizacao: -12,
};

function scoreCluster(cluster: IntentCluster, coverageRatio: number, cannibal: number, siloPages: number): OpportunityScore {
  const d = cluster.demand;
  const components: ScoreComponent[] = [
    {
      label: "Demanda externa",
      value: Math.min(1, d.impressions / 12000),
      weight: WEIGHTS.demandaExterna,
      reason: `${d.impressions.toLocaleString("pt-BR")} impressões estimadas em ${d.distinctQueries} consultas distintas`,
    },
    {
      label: "Demanda interna",
      value: Math.min(1, d.internalSearches / 25),
      weight: WEIGHTS.demandaInterna,
      reason: `${d.internalSearches} buscas dentro do site`,
    },
    {
      label: "Perguntas humanas",
      value: Math.min(1, d.humanQuestions / 8),
      weight: WEIGHTS.perguntasHumanas,
      reason: `${d.humanQuestions} perguntas reais recebidas`,
    },
    {
      label: "Ausência de cobertura",
      value: 1 - coverageRatio,
      weight: WEIGHTS.ausenciaCobertura,
      reason: `${Math.round(coverageRatio * 100)}% das sub-intenções já respondidas`,
    },
    {
      label: "Relevância para o silo",
      value: Math.min(1, siloPages / 25),
      weight: WEIGHTS.relevanciaSilo,
      reason: `o silo ${cluster.silo} tem ${siloPages} páginas, é pilar da biblioteca`,
    },
    {
      label: "Relevância para a jornada",
      value: cluster.stage === "Blindar" || cluster.stage === "Transmitir" ? 1 : 0.6,
      weight: WEIGHTS.relevanciaJornada,
      reason: `fase ${cluster.stage} da jornada de soberania`,
    },
    {
      label: "Tendência pública",
      value: d.trendIndex / 100,
      weight: WEIGHTS.tendencia,
      reason: `índice de tendência ${d.trendIndex}`,
    },
    {
      label: "Urgência por risco",
      value: cluster.riskLevel === "alto" ? 1 : cluster.riskLevel === "medio" ? 0.5 : 0.2,
      weight: WEIGHTS.risco,
      reason: `risco ${cluster.riskLevel} para quem busca sem resposta`,
    },
    {
      label: "Dificuldade de produção",
      value: Math.min(1, cluster.children.length / 9),
      weight: WEIGHTS.dificuldade,
      reason: `${cluster.children.length} sub-intenções a cobrir`,
    },
    {
      label: "Risco de canibalização",
      value: Math.min(1, cannibal / 3),
      weight: WEIGHTS.canibalizacao,
      reason: cannibal ? `${cannibal} página(s) já disputam a mesma intenção` : "nenhuma disputa detectada",
    },
  ];

  const positive = components.filter((c) => c.weight > 0).reduce((s, c) => s + c.weight, 0);
  const raw = components.reduce((s, c) => s + c.value * c.weight, 0);
  const total = Math.max(0, Math.min(100, Math.round((raw / positive) * 100)));

  const confidenceReasons: string[] = [];
  let confidenceHits = 0;
  if (d.distinctQueries >= 6) {
    confidenceHits++;
    confidenceReasons.push(`${d.distinctQueries} consultas distintas`);
  } else confidenceReasons.push(`apenas ${d.distinctQueries} consultas distintas`);
  if (d.impressions >= 1500) {
    confidenceHits++;
    confidenceReasons.push(`${d.impressions.toLocaleString("pt-BR")} impressões no período`);
  }
  if (d.internalSearches > 0 || d.humanQuestions > 0) {
    confidenceHits++;
    confidenceReasons.push("sinal interno ou pergunta humana presente");
  } else confidenceReasons.push("nenhum sinal interno correspondente");
  if (d.sources.includes("gsc")) {
    confidenceHits++;
    confidenceReasons.push("dados confirmados pelo Search Console");
  } else confidenceReasons.push("Search Console ainda não conectado, números em estimativa");

  const confidence = confidenceHits >= 4 ? "alta" : confidenceHits >= 2 ? "media" : "baixa";
  const urgency =
    total >= 75 && confidence !== "baixa" ? "agora" : total >= 55 ? "trimestre" : "observar";

  return { total, components, confidence, confidenceReasons, urgency };
}

// ───────────────────────── Gap Engine ─────────────────────────

export function diagnoseCluster(cluster: IntentCluster): GapDiagnosis {
  const covered: GapDiagnosis["covered"] = [];
  const uncovered: IntentNode[] = [];
  const mentions: CoverageMatch[] = [];
  const cannibalCount = new Map<string, string[]>();

  for (const intent of cluster.children) {
    const matches = coverageForIntent(intent);
    const answering = matches.filter((m) => m.verdict === "responde");
    if (answering.length) {
      covered.push({ intent, match: answering[0] });
      if (answering.length > 1) {
        cannibalCount.set(
          intent.id,
          answering.slice(0, 3).map((m) => m.path),
        );
      }
    } else {
      uncovered.push(intent);
      mentions.push(...matches.filter((m) => m.verdict === "menciona").slice(0, 3));
    }
  }

  const coverageRatio = cluster.children.length ? covered.length / cluster.children.length : 0;
  const cannibalizationPaths = [...new Set([...cannibalCount.values()].flat())];

  const rootIntent: IntentNode = {
    id: `${cluster.id}.root`,
    label: cluster.rootLabel,
    question: cluster.rootQuery,
    kind: cluster.kind,
    stage: cluster.stage,
    riskLevel: cluster.riskLevel,
    terms: [
      ...new Set(
        normalize(cluster.rootQuery)
          .split(" ")
          .filter((t) => t.length > 2 && !STOPWORDS.has(t)),
      ),
    ],
  };
  const rootMatches = coverageForIntent(rootIntent);
  const rootAnswers = rootMatches.filter((m) => m.verdict === "responde");
  const rootMentions = rootMatches.filter((m) => m.verdict === "menciona");

  const coveredSilos = [...new Set(covered.map((c) => c.match.silo))];

  let type: GapType;
  const explanation: string[] = [];

  if (cannibalizationPaths.length >= 2) {
    type = "anti_lacuna";
    explanation.push(
      `${cannibalizationPaths.length} páginas respondem às mesmas sub-intenções deste cluster, o que caracteriza disputa interna.`,
    );
  } else if (coverageRatio >= 0.95 && rootAnswers.length >= 1) {
    type = "coberto";
    explanation.push("todas as sub-intenções têm página com foco declarado no assunto.");
  } else if (rootAnswers.length === 0 && rootMentions.length >= 2) {
    type = "lacuna_disfarcada";
    explanation.push(
      `o tema aparece em ${rootMentions.length} páginas, nenhuma com o assunto como foco principal.`,
    );
  } else if (rootAnswers.length >= 1 && coverageRatio < 0.6) {
    type = "lacuna_profundidade";
    explanation.push(
      `existe a página ${rootAnswers[0].path}, mas ela cobre apenas ${Math.round(coverageRatio * 100)}% das sub-intenções.`,
    );
  } else if (coveredSilos.length >= 2 && coverageRatio >= 0.5) {
    type = "lacuna_ponte";
    explanation.push(
      `as respostas existem, porém espalhadas entre ${coveredSilos.length} silos: ${coveredSilos.join(", ")}.`,
    );
  } else {
    type = "lacuna_disfarcada";
    explanation.push(
      `${uncovered.length} de ${cluster.children.length} sub-intenções não têm página com foco no assunto.`,
    );
  }

  if (uncovered.length) {
    explanation.push(`não coberto: ${uncovered.map((u) => u.label).join(", ")}.`);
  }
  if (covered.length) {
    explanation.push(`coberto: ${covered.map((c) => c.intent.label).join(", ")}.`);
  }

  const guardNotes: string[] = [];
  for (const rule of GUARD_RULES) {
    if (rule.id === "GUARD-CANNIBAL-01") {
      if (type === "anti_lacuna") guardNotes.push(`${rule.id}: ${rule.description}`);
      continue;
    }
    if (rule.appliesTo(cluster)) guardNotes.push(`${rule.id}: ${rule.description}`);
  }

  const siloPages = PAGES.filter((p) => p.silo === cluster.silo).length;
  const score = scoreCluster(cluster, coverageRatio, cannibalizationPaths.length, siloPages);

  let recommendation: string;
  switch (type) {
    case "coberto":
      recommendation = "Nenhuma ação. A biblioteca já responde a este cluster.";
      break;
    case "anti_lacuna":
      recommendation =
        "Não criar. Consolidar as páginas em disputa, redirecionar a mais fraca e separar as intenções restantes.";
      break;
    case "lacuna_profundidade":
      recommendation = `Expandir ${rootAnswers[0]?.path ?? "a página existente"} com as sub-intenções ausentes. Não criar página nova.`;
      break;
    case "lacuna_ponte":
      recommendation = `Criar uma página central de conexão e ligar os silos ${coveredSilos.join(" e ")} por links internos recíprocos.`;
      break;
    default:
      recommendation = `Criar uma página com foco declarado no assunto${cluster.suggestedTitle ? `: "${cluster.suggestedTitle}"` : ""}.`;
  }

  return {
    cluster,
    type,
    coverageRatio,
    covered,
    uncovered,
    mentions: [...new Map(mentions.map((m) => [m.path, m])).values()].slice(0, 8),
    cannibalizationPaths,
    expandTargetPath: rootAnswers[0]?.path,
    bridgeSilos: coveredSilos,
    explanation,
    score,
    guardNotes,
    recommendation,
  };
}

export function diagnoseAll(): GapDiagnosis[] {
  return INTENT_CLUSTERS.map(diagnoseCluster).sort((a, b) => {
    const rank = { alta: 0, media: 1, baixa: 2 } as const;
    if (rank[a.score.confidence] !== rank[b.score.confidence]) {
      return rank[a.score.confidence] - rank[b.score.confidence];
    }
    return b.score.total - a.score.total;
  });
}

/** Mapa de Cobertura por silo: quanto das intenções monitoradas está efetivamente coberto. */
export function coverageBySilo(diagnoses: GapDiagnosis[]): SiloCoverage[] {
  const silos = new Map<string, SiloCoverage>();
  for (const page of PAGES) {
    const entry = silos.get(page.silo) ?? { silo: page.silo, pages: 0, intents: 0, coveredIntents: 0, ratio: 0 };
    entry.pages++;
    silos.set(page.silo, entry);
  }
  for (const d of diagnoses) {
    const entry = silos.get(d.cluster.silo) ?? {
      silo: d.cluster.silo,
      pages: 0,
      intents: 0,
      coveredIntents: 0,
      ratio: 0,
    };
    entry.intents += d.cluster.children.length;
    entry.coveredIntents += d.covered.length;
    silos.set(d.cluster.silo, entry);
  }
  return [...silos.values()]
    .filter((s) => s.intents > 0)
    .map((s) => ({ ...s, ratio: s.intents ? s.coveredIntents / s.intents : 0 }))
    .sort((a, b) => a.ratio - b.ratio);
}

export const GAP_LABEL: Record<GapType, string> = {
  coberto: "Coberto",
  lacuna_disfarcada: "Lacuna disfarçada",
  lacuna_profundidade: "Lacuna de profundidade",
  lacuna_ponte: "Lacuna de ponte",
  anti_lacuna: "Anti-lacuna",
};
