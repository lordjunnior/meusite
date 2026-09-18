import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  aggregateClusters,
  aggregateQueries,
  fetchInternalSearchEvents,
  summarize,
  unclassifiedQueries,
  type ClusterDemand,
  type DemandSummary,
  type InternalSearchEvent,
  type QueryAggregate,
} from "@/lib/intelligence/demand";
import { diagnoseAll, GAP_LABEL } from "@/lib/intelligence/engine";

const WINDOWS = [7, 30, 90] as const;

function pct(value: number) {
  return `${Math.round(value * 100)}%`;
}

function Bar({ ratio, tone = "#2f6f63" }: { ratio: number; tone?: string }) {
  const filled = Math.max(0, Math.min(20, Math.round(ratio * 20)));
  return (
    <span className="font-mono text-[11px] tracking-[0.18em]" style={{ color: tone }}>
      {"\u2588".repeat(filled)}
      <span className="text-[#1d3c38]/25">{"\u2591".repeat(20 - filled)}</span>
    </span>
  );
}

function SummaryBlock({ summary }: { summary: DemandSummary }) {
  return (
    <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {[
        ["Buscas registradas", String(summary.events)],
        ["Consultas distintas", String(summary.distinctQueries)],
        ["Sessões", String(summary.sessions)],
        ["Sem resultado", pct(summary.zeroResultRate)],
        ["Refinamento", pct(summary.refinementRate)],
        ["Satisfação", pct(summary.satisfaction)],
      ].map(([label, value]) => (
        <div key={label} className="border-l-2 border-[#a8621b]/60 pl-3">
          <dt className="text-[11px] uppercase tracking-[0.16em] text-[#1d3c38]/55">{label}</dt>
          <dd className="font-mono text-2xl text-[#12211f]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function QueryRow({ q }: { q: QueryAggregate }) {
  return (
    <tr className="border-b border-[#1d3c38]/8 align-top">
      <td className="py-2 pr-3 font-medium text-[#12211f]">{q.sampleQuery}</td>
      <td className="py-2 pr-3 font-mono text-[#1d3c38]/80">{q.searches}</td>
      <td className="py-2 pr-3 font-mono text-[#1d3c38]/80">{q.zeroResults}</td>
      <td className="py-2 pr-3 font-mono text-[#1d3c38]/80">{q.clicks}</td>
      <td className="py-2 pr-3 font-mono text-[#1d3c38]/80">{q.refinements}</td>
      <td className="py-2 pr-3 font-mono text-[#1d3c38]/80">{q.abandons}</td>
      <td className="py-2 pr-3">
        <Bar ratio={q.satisfaction} tone={q.satisfaction >= 0.6 ? "#2f6f63" : "#a8621b"} />
      </td>
      <td className="py-2 font-mono text-[12px] text-[#1d3c38]/70">{q.topClickedPath ?? "nenhum clique"}</td>
    </tr>
  );
}

function ClusterCard({ demand }: { demand: ClusterDemand }) {
  const diagnosis = useMemo(
    () => diagnoseAll().find((d) => d.cluster.id === demand.clusterId),
    [demand.clusterId],
  );
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-sm border border-[#1d3c38]/15 bg-white/70">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#1d3c38]/55">
            {diagnosis ? GAP_LABEL[diagnosis.type] : "cluster sem diagnóstico"}
          </p>
          <h3 className="mt-1 text-[17px] font-semibold text-[#12211f]">{demand.rootLabel}</h3>
          <p className="mt-1 text-[13px] text-[#1d3c38]/75">
            {demand.searches} buscas · {demand.distinctQueries} consultas distintas · satisfação{" "}
            {pct(demand.satisfaction)}
          </p>
        </div>
        <Bar ratio={demand.satisfaction} tone={demand.satisfaction >= 0.6 ? "#2f6f63" : "#a8621b"} />
      </button>

      {open && (
        <div className="space-y-6 border-t border-[#1d3c38]/12 px-5 py-6">
          <section>
            <h4 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#1d3c38]/55">Evidências de demanda</h4>
            <ul className="space-y-1 text-[13px] text-[#1d3c38]">
              {demand.evidence.map((e) => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
          </section>

          {diagnosis && (
            <section className="rounded-sm border border-[#1d3c38]/15 bg-[#f5f0e6] p-4">
              <h4 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#1d3c38]/55">
                Cruzamento com a Inteligência Editorial
              </h4>
              <p className="text-[13px] text-[#1d3c38]">{diagnosis.recommendation}</p>
              <p className="mt-2 text-[13px] text-[#1d3c38]/80">{diagnosis.explanation.join(" ")}</p>
              {diagnosis.guardNotes.length > 0 && (
                <p className="mt-2 text-[13px] text-[#8f2f24]">
                  Guardrails: {diagnosis.guardNotes.map((g) => g.split(":")[0]).join(", ")}.
                  {diagnosis.cluster.requiredAngle ? ` Ângulo obrigatório: ${diagnosis.cluster.requiredAngle}` : ""}
                </p>
              )}
              <Link
                to="/admin/inteligencia"
                className="mt-3 inline-block text-[12px] text-[#a8621b] underline underline-offset-4"
              >
                abrir diagnóstico completo
              </Link>
            </section>
          )}

          <section>
            <h4 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#1d3c38]/55">Consultas do cluster</h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-[#1d3c38]/15 text-[11px] uppercase tracking-[0.16em] text-[#1d3c38]/55">
                    <th className="py-2 pr-3 font-medium">Consulta</th>
                    <th className="py-2 pr-3 font-medium">Buscas</th>
                    <th className="py-2 pr-3 font-medium">Zero</th>
                    <th className="py-2 pr-3 font-medium">Cliques</th>
                    <th className="py-2 pr-3 font-medium">Refinou</th>
                    <th className="py-2 pr-3 font-medium">Abandonou</th>
                    <th className="py-2 pr-3 font-medium">Satisfação</th>
                    <th className="py-2 font-medium">Página mais clicada</th>
                  </tr>
                </thead>
                <tbody>
                  {demand.queries.map((q) => (
                    <QueryRow key={q.normalizedQuery} q={q} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </article>
  );
}

export default function DemandaInterna() {
  const [windowDays, setWindowDays] = useState<number>(30);
  const [events, setEvents] = useState<InternalSearchEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setEvents(null);
    setError(null);
    fetchInternalSearchEvents(windowDays)
      .then((data) => {
        if (!cancelled) setEvents(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? "falha ao ler os registros");
      });
    return () => {
      cancelled = true;
    };
  }, [windowDays]);

  const summary = useMemo(() => (events ? summarize(events, windowDays) : null), [events, windowDays]);
  const clusters = useMemo(() => (events ? aggregateClusters(events) : []), [events]);
  const unclassified = useMemo(() => (events ? unclassifiedQueries(events) : []), [events]);
  const allQueries = useMemo(() => (events ? aggregateQueries(events).slice(0, 40) : []), [events]);

  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#12211f]">
      <Helmet>
        <title>Inteligência de Demanda</title>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>

      <header className="border-b border-[#1d3c38]/15 px-5 py-10 lg:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#a8621b]">Painel interno</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight lg:text-5xl">Inteligência de Demanda</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#1d3c38]/80">
          A Inteligência Editorial olha para dentro e pergunta o que falta na biblioteca. Este painel olha para o
          comportamento e pergunta o que as pessoas estão tentando encontrar. Primeira fonte: a busca interna do
          próprio site, sem identificação de pessoas.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {WINDOWS.map((w) => (
            <button
              key={w}
              onClick={() => setWindowDays(w)}
              className={`min-h-[44px] rounded-sm border px-4 font-mono text-[12px] uppercase tracking-[0.16em] ${
                windowDays === w
                  ? "border-[#a8621b] bg-[#a8621b]/10 text-[#a8621b]"
                  : "border-[#1d3c38]/20 text-[#1d3c38]/70 hover:border-[#a8621b]/60"
              }`}
            >
              {w} dias
            </button>
          ))}
          <Link
            to="/admin/inteligencia"
            className="min-h-[44px] rounded-sm border border-[#1d3c38]/20 px-4 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-[#1d3c38]/70 hover:border-[#a8621b]/60"
          >
            Inteligência editorial
          </Link>
        </div>

        {summary && <SummaryBlock summary={summary} />}
      </header>

      <main className="space-y-14 px-5 py-12 lg:px-12">
        {error && (
          <section className="rounded-sm border border-[#8f2f24]/30 bg-[#8f2f24]/5 p-5 text-[14px] text-[#8f2f24]">
            Não foi possível ler os registros: {error}. A leitura exige sessão de administrador.
          </section>
        )}

        {!events && !error && <p className="font-mono text-[13px] text-[#1d3c38]/60">lendo registros...</p>}

        {events && events.length === 0 && (
          <section className="rounded-sm border border-[#1d3c38]/15 bg-white/70 p-6 text-[14px] text-[#1d3c38]/80">
            Nenhuma busca registrada nesta janela. O registro começa a partir de agora, a cada busca feita no site.
            Enquanto o volume for pequeno, trate qualquer leitura como ruído: a especificação exige confiança antes
            de virar pauta.
          </section>
        )}

        {events && events.length > 0 && (
          <>
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">Demanda por intenção</h2>
              <p className="mt-1 text-[14px] text-[#1d3c38]/70">
                Consultas diferentes que expressam a mesma intenção entram em um único cluster, e não em cinco
                oportunidades separadas.
              </p>
              <div className="mt-6 space-y-4">
                {clusters.map((c) => (
                  <ClusterCard key={c.clusterId} demand={c} />
                ))}
                {!clusters.length && (
                  <p className="text-[14px] text-[#1d3c38]/70">
                    Nenhuma consulta desta janela caiu em um cluster já curado.
                  </p>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight">Fila de classificação humana</h2>
              <p className="mt-1 text-[14px] text-[#1d3c38]/70">
                Consultas com demanda repetida e sem cluster curado. O sistema não cria intenção sozinho: estas
                entram em revisão antes de virar diagnóstico.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[780px] text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-[#1d3c38]/15 text-[11px] uppercase tracking-[0.16em] text-[#1d3c38]/55">
                      <th className="py-2 pr-3 font-medium">Consulta</th>
                      <th className="py-2 pr-3 font-medium">Buscas</th>
                      <th className="py-2 pr-3 font-medium">Zero</th>
                      <th className="py-2 pr-3 font-medium">Cliques</th>
                      <th className="py-2 pr-3 font-medium">Refinou</th>
                      <th className="py-2 pr-3 font-medium">Abandonou</th>
                      <th className="py-2 pr-3 font-medium">Satisfação</th>
                      <th className="py-2 font-medium">Página mais clicada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unclassified.map((q) => (
                      <QueryRow key={q.normalizedQuery} q={q} />
                    ))}
                  </tbody>
                </table>
                {!unclassified.length && (
                  <p className="mt-3 text-[14px] text-[#1d3c38]/70">Nenhuma consulta repetida fora dos clusters.</p>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight">Todas as consultas da janela</h2>
              <p className="mt-1 text-[14px] text-[#1d3c38]/70">
                Volume isolado não é diagnóstico. Leia junto com zero resultado, refinamento e abandono.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[780px] text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-[#1d3c38]/15 text-[11px] uppercase tracking-[0.16em] text-[#1d3c38]/55">
                      <th className="py-2 pr-3 font-medium">Consulta</th>
                      <th className="py-2 pr-3 font-medium">Buscas</th>
                      <th className="py-2 pr-3 font-medium">Zero</th>
                      <th className="py-2 pr-3 font-medium">Cliques</th>
                      <th className="py-2 pr-3 font-medium">Refinou</th>
                      <th className="py-2 pr-3 font-medium">Abandonou</th>
                      <th className="py-2 pr-3 font-medium">Satisfação</th>
                      <th className="py-2 font-medium">Página mais clicada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allQueries.map((q) => (
                      <QueryRow key={q.normalizedQuery} q={q} />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        <section className="rounded-sm border border-[#1d3c38]/15 bg-white/70 p-6">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#1d3c38]/55">O que este painel não faz</h2>
          <ul className="mt-3 space-y-1 text-[14px] text-[#1d3c38]">
            <li>• Não identifica pessoas. A chave de sessão é aleatória, vive na aba aberta e não atravessa visitas.</li>
            <li>• Não cria intenção sozinho. Consulta sem cluster curado vai para revisão humana.</li>
            <li>• Não publica nada. O sistema detecta, explica e propõe; a decisão editorial continua sua.</li>
            <li>
              • Não substitui demanda externa. A camada do Search Console entra depois e responde a outra pergunta:
              o que o Google vê que o seu público ainda não trouxe até aqui.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
