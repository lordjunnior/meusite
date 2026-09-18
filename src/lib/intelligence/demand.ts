// Inteligência de Demanda, fase 2.
// Primeira fonte: busca interna do próprio site.
// Nada aqui identifica pessoas. O que se mede é o comportamento da biblioteca:
// o que foi procurado, se a busca devolveu resposta, se foi refinada, se foi abandonada.
// Ver docs/inteligencia-editorial/ESPECIFICACAO.md, motor 01 (Demand Engine).

import { supabase } from "@/integrations/supabase/client";
import { INTENT_CLUSTERS } from "./intentMap";

export interface InternalSearchEvent {
  id: string;
  query: string;
  normalizedQuery: string;
  resultsCount: number;
  clickedPath: string | null;
  refined: boolean;
  abandoned: boolean;
  intentCluster: string | null;
  device: string | null;
  originPath: string | null;
  sessionKey: string;
  createdAt: string;
}

export interface QueryAggregate {
  normalizedQuery: string;
  sampleQuery: string;
  searches: number;
  zeroResults: number;
  clicks: number;
  refinements: number;
  abandons: number;
  clusterId: string | null;
  /** 0 a 1. Proporção de buscas que terminaram em clique sem refinamento nem abandono. */
  satisfaction: number;
  topClickedPath: string | null;
}

export interface ClusterDemand {
  clusterId: string;
  rootLabel: string;
  searches: number;
  distinctQueries: number;
  clicks: number;
  refinements: number;
  abandons: number;
  zeroResults: number;
  satisfaction: number;
  queries: QueryAggregate[];
  /** Linhas prontas para leitura humana no painel, cada uma com a evidência declarada. */
  evidence: string[];
}

export interface DemandSummary {
  windowDays: number;
  events: number;
  distinctQueries: number;
  sessions: number;
  zeroResultRate: number;
  clickRate: number;
  refinementRate: number;
  abandonRate: number;
  satisfaction: number;
}

const STOPWORDS = new Set(
  ("a o e de da do das dos em no na nos nas um uma para por com que se ao aos as os sua seu " +
    "como qual quais mais menos sem sob sobre entre ou nao sim ja foi ser sao esta este isso pelo pela meu minha").split(
    " ",
  ),
);

export function normalizeQuery(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function tokens(text: string): string[] {
  return normalizeQuery(text)
    .split(" ")
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

/**
 * Agrupa a consulta em um cluster de intenção já curado por humano.
 * Não inventa cluster novo: consulta sem correspondência fica sem cluster e
 * aparece no painel como demanda ainda não classificada, para revisão editorial.
 */
export function matchCluster(query: string): string | null {
  const qTokens = tokens(query);
  if (!qTokens.length) return null;

  let best: { id: string; score: number } | null = null;

  for (const cluster of INTENT_CLUSTERS) {
    const clusterTerms = new Set<string>([
      ...tokens(cluster.rootQuery),
      ...tokens(cluster.rootLabel),
      ...cluster.children.flatMap((c) => [...c.terms, ...tokens(c.label)]),
    ]);
    const hits = qTokens.filter((t) => clusterTerms.has(t)).length;
    if (!hits) continue;
    const score = hits / qTokens.length;
    if (score >= 0.5 && (!best || score > best.score)) {
      best = { id: cluster.id, score };
    }
  }

  return best?.id ?? null;
}

interface EventRow {
  id: string;
  query: string;
  normalized_query: string;
  results_count: number;
  clicked_path: string | null;
  refined: boolean;
  abandoned: boolean;
  intent_cluster: string | null;
  device: string | null;
  origin_path: string | null;
  session_key: string;
  created_at: string;
}

function fromRow(row: EventRow): InternalSearchEvent {
  return {
    id: row.id,
    query: row.query,
    normalizedQuery: row.normalized_query,
    resultsCount: row.results_count,
    clickedPath: row.clicked_path,
    refined: row.refined,
    abandoned: row.abandoned,
    intentCluster: row.intent_cluster,
    device: row.device,
    originPath: row.origin_path,
    sessionKey: row.session_key,
    createdAt: row.created_at,
  };
}

export async function fetchInternalSearchEvents(windowDays = 30): Promise<InternalSearchEvent[]> {
  const since = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("internal_search_events")
    .select("*")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) throw error;
  return (data as EventRow[]).map(fromRow);
}

function satisfactionOf(searches: number, clicks: number, refinements: number, abandons: number): number {
  if (!searches) return 0;
  const satisfied = clicks - Math.min(clicks, refinements) * 0.5 - Math.min(clicks, abandons) * 0.25;
  return Math.max(0, Math.min(1, satisfied / searches));
}

export function aggregateQueries(events: InternalSearchEvent[]): QueryAggregate[] {
  const map = new Map<string, QueryAggregate & { clickedPaths: Map<string, number> }>();

  for (const ev of events) {
    const key = ev.normalizedQuery;
    const entry =
      map.get(key) ??
      ({
        normalizedQuery: key,
        sampleQuery: ev.query,
        searches: 0,
        zeroResults: 0,
        clicks: 0,
        refinements: 0,
        abandons: 0,
        clusterId: ev.intentCluster,
        satisfaction: 0,
        topClickedPath: null,
        clickedPaths: new Map<string, number>(),
      } as QueryAggregate & { clickedPaths: Map<string, number> });

    entry.searches++;
    if (ev.resultsCount === 0) entry.zeroResults++;
    if (ev.clickedPath) {
      entry.clicks++;
      entry.clickedPaths.set(ev.clickedPath, (entry.clickedPaths.get(ev.clickedPath) ?? 0) + 1);
    }
    if (ev.refined) entry.refinements++;
    if (ev.abandoned) entry.abandons++;
    if (!entry.clusterId && ev.intentCluster) entry.clusterId = ev.intentCluster;

    map.set(key, entry);
  }

  return [...map.values()]
    .map(({ clickedPaths, ...agg }) => ({
      ...agg,
      satisfaction: satisfactionOf(agg.searches, agg.clicks, agg.refinements, agg.abandons),
      topClickedPath: [...clickedPaths.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null,
    }))
    .sort((a, b) => b.searches - a.searches);
}

export function aggregateClusters(events: InternalSearchEvent[]): ClusterDemand[] {
  const queries = aggregateQueries(events);
  const byCluster = new Map<string, QueryAggregate[]>();

  for (const q of queries) {
    if (!q.clusterId) continue;
    byCluster.set(q.clusterId, [...(byCluster.get(q.clusterId) ?? []), q]);
  }

  const result: ClusterDemand[] = [];

  for (const [clusterId, qs] of byCluster) {
    const cluster = INTENT_CLUSTERS.find((c) => c.id === clusterId);
    const searches = qs.reduce((s, q) => s + q.searches, 0);
    const clicks = qs.reduce((s, q) => s + q.clicks, 0);
    const refinements = qs.reduce((s, q) => s + q.refinements, 0);
    const abandons = qs.reduce((s, q) => s + q.abandons, 0);
    const zeroResults = qs.reduce((s, q) => s + q.zeroResults, 0);
    const satisfaction = satisfactionOf(searches, clicks, refinements, abandons);

    const evidence: string[] = [
      `busca interna registrou ${searches} ocorrências em ${qs.length} consultas distintas.`,
    ];
    if (zeroResults > 0) {
      evidence.push(`${zeroResults} buscas não devolveram nenhum resultado.`);
    }
    if (refinements / Math.max(1, searches) >= 0.3) {
      evidence.push(
        `refinamento frequente: ${refinements} de ${searches} buscas foram reescritas, sinal de resposta insuficiente.`,
      );
    }
    if (abandons / Math.max(1, searches) >= 0.3) {
      evidence.push(`${abandons} buscas terminaram sem clique nenhum.`);
    }
    if (satisfaction >= 0.6) {
      evidence.push("a maioria das buscas terminou em clique sem reescrita, indício de que a biblioteca respondeu.");
    }

    result.push({
      clusterId,
      rootLabel: cluster?.rootLabel ?? clusterId,
      searches,
      distinctQueries: qs.length,
      clicks,
      refinements,
      abandons,
      zeroResults,
      satisfaction,
      queries: qs,
      evidence,
    });
  }

  return result.sort((a, b) => b.searches - a.searches);
}

export function summarize(events: InternalSearchEvent[], windowDays: number): DemandSummary {
  const total = events.length;
  const clicks = events.filter((e) => e.clickedPath).length;
  const refinements = events.filter((e) => e.refined).length;
  const abandons = events.filter((e) => e.abandoned).length;
  const zero = events.filter((e) => e.resultsCount === 0).length;

  return {
    windowDays,
    events: total,
    distinctQueries: new Set(events.map((e) => e.normalizedQuery)).size,
    sessions: new Set(events.map((e) => e.sessionKey)).size,
    zeroResultRate: total ? zero / total : 0,
    clickRate: total ? clicks / total : 0,
    refinementRate: total ? refinements / total : 0,
    abandonRate: total ? abandons / total : 0,
    satisfaction: satisfactionOf(total, clicks, refinements, abandons),
  };
}

/** Consultas com demanda registrada e sem cluster curado. Entram na fila de revisão humana. */
export function unclassifiedQueries(events: InternalSearchEvent[]): QueryAggregate[] {
  return aggregateQueries(events).filter((q) => !q.clusterId && q.searches >= 2);
}
