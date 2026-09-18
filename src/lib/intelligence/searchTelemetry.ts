// Registro de comportamento da busca interna.
// Um evento é gravado quando a busca se resolve: clique, reescrita da consulta
// ou fechamento do painel. Nunca durante a digitação, para não gravar fragmentos.
// Não há identificação de pessoa: a chave de sessão é aleatória, vive apenas na
// aba aberta e não é reaproveitada entre visitas.

import { supabase } from "@/integrations/supabase/client";
import { matchCluster, normalizeQuery } from "./demand";

const SESSION_STORAGE_KEY = "lj_search_session";

function sessionKey(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;
    const fresh = crypto.randomUUID().slice(0, 12);
    sessionStorage.setItem(SESSION_STORAGE_KEY, fresh);
    return fresh;
  } catch {
    return "efemera";
  }
}

function device(): "mobile" | "desktop" {
  return typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
}

interface PendingSearch {
  query: string;
  resultsCount: number;
  clickedPath: string | null;
  refined: boolean;
}

let pending: PendingSearch | null = null;

async function send(event: PendingSearch, abandoned: boolean) {
  const normalized = normalizeQuery(event.query);
  if (!normalized) return;

  try {
    await supabase.from("internal_search_events").insert({
      query: event.query.slice(0, 120),
      normalized_query: normalized,
      results_count: Math.min(1000, Math.max(0, event.resultsCount)),
      clicked_path: event.clickedPath ? event.clickedPath.slice(0, 200) : null,
      refined: event.refined,
      abandoned,
      intent_cluster: matchCluster(event.query),
      device: device(),
      origin_path: typeof window !== "undefined" ? window.location.pathname.slice(0, 200) : null,
      session_key: sessionKey(),
    });
  } catch {
    // Telemetria nunca pode atrapalhar a busca do usuário.
  }
}

/**
 * Registra a consulta que o usuário parou de digitar.
 * Se a consulta anterior for prefixo desta, ela é fechada como reescrita.
 */
export function trackQuerySettled(query: string, resultsCount: number) {
  const trimmed = query.trim();
  if (trimmed.length < 3) return;

  if (pending) {
    const previous = normalizeQuery(pending.query);
    const current = normalizeQuery(trimmed);
    if (previous === current) {
      pending.resultsCount = resultsCount;
      return;
    }
    const isRefinement = current.startsWith(previous) || previous.startsWith(current);
    void send({ ...pending, refined: isRefinement }, !pending.clickedPath);
  }

  pending = { query: trimmed, resultsCount, clickedPath: null, refined: false };
}

/** Registra o clique em um resultado e fecha o evento como resolvido. */
export function trackResultClick(path: string) {
  if (!pending) return;
  void send({ ...pending, clickedPath: path }, false);
  pending = null;
}

/** Fecha a busca pendente quando o painel é fechado sem clique. */
export function trackSearchClosed() {
  if (!pending) return;
  void send(pending, true);
  pending = null;
}
