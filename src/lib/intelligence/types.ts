// Sistema de Inteligência Editorial da Biblioteca.
// Tipos canônicos da fase 1, conforme docs/inteligencia-editorial/ESPECIFICACAO.md.

export type IntentStage = "Despertar" | "Entender" | "Blindar" | "Operar" | "Transmitir";

export type IntentKind =
  | "definicao"
  | "diagnostico"
  | "procedimento"
  | "comparacao"
  | "decisao"
  | "risco"
  | "legal"
  | "ferramenta";

export type RiskLevel = "baixo" | "medio" | "alto";

export interface IntentNode {
  /** Identificador estável, "recuperar-bitcoin.perdi-a-seed" */
  id: string;
  /** Rótulo curto exibido no painel */
  label: string;
  /** A pergunta na voz do usuário */
  question: string;
  kind: IntentKind;
  stage: IntentStage;
  riskLevel: RiskLevel;
  /** Termos que caracterizam a intenção, usados na comparação contra o acervo */
  terms: string[];
}

export interface IntentCluster {
  id: string;
  /** Consulta principal, como as pessoas escrevem */
  rootQuery: string;
  rootLabel: string;
  silo: string;
  stage: IntentStage;
  kind: IntentKind;
  riskLevel: RiskLevel;
  /** Sinais de demanda observados, com origem declarada */
  demand: DemandEvidence;
  children: IntentNode[];
  /** Regras de guardrail que se aplicam a este cluster */
  guards: string[];
  /** Ângulo editorial obrigatório quando o risco semântico é alto */
  requiredAngle?: string;
  suggestedTitle?: string;
  suggestedPath?: string;
  cta?: string;
}

export interface DemandEvidence {
  /** Consultas distintas observadas ou previstas para o cluster */
  distinctQueries: number;
  /** Impressões no período, quando o Search Console estiver conectado */
  impressions: number;
  /** Buscas internas registradas no site */
  internalSearches: number;
  /** Perguntas humanas recebidas */
  humanQuestions: number;
  /** Índice de tendência pública, 0 a 100 */
  trendIndex: number;
  /** Fontes que sustentam os números acima */
  sources: Array<"gsc" | "internal" | "human" | "trend" | "estimativa">;
}

export type CoverageVerdict = "responde" | "menciona" | "tangencia" | "irrelevante";

export interface CoverageMatch {
  intentId: string;
  path: string;
  title: string;
  silo: string;
  semanticScore: number;
  focusScore: number;
  verdict: CoverageVerdict;
  evidence: string[];
}

export type GapType =
  | "coberto"
  | "lacuna_disfarcada"
  | "lacuna_profundidade"
  | "lacuna_ponte"
  | "anti_lacuna";

export interface ScoreComponent {
  label: string;
  value: number;
  weight: number;
  reason: string;
}

export interface OpportunityScore {
  total: number;
  components: ScoreComponent[];
  confidence: "alta" | "media" | "baixa";
  confidenceReasons: string[];
  urgency: "agora" | "trimestre" | "observar";
}

export interface GapDiagnosis {
  cluster: IntentCluster;
  type: GapType;
  coverageRatio: number;
  covered: Array<{ intent: IntentNode; match: CoverageMatch }>;
  uncovered: IntentNode[];
  mentions: CoverageMatch[];
  cannibalizationPaths: string[];
  expandTargetPath?: string;
  bridgeSilos: string[];
  explanation: string[];
  score: OpportunityScore;
  guardNotes: string[];
  recommendation: string;
}

export interface SiloCoverage {
  silo: string;
  pages: number;
  intents: number;
  coveredIntents: number;
  ratio: number;
}
