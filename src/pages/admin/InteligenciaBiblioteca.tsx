import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  PAGES,
  FINGERPRINTS_GENERATED_AT,
  diagnoseAll,
  coverageBySilo,
  GAP_LABEL,
} from "@/lib/intelligence/engine";
import type { GapDiagnosis } from "@/lib/intelligence/types";

const GAP_TONE: Record<string, string> = {
  coberto: "text-[#2f6f63] border-[#2f6f63]/40 bg-[#2f6f63]/10",
  lacuna_disfarcada: "text-[#a8621b] border-[#a8621b]/40 bg-[#a8621b]/10",
  lacuna_profundidade: "text-[#9a5a12] border-[#9a5a12]/40 bg-[#9a5a12]/10",
  lacuna_ponte: "text-[#2b5b7a] border-[#2b5b7a]/40 bg-[#2b5b7a]/10",
  anti_lacuna: "text-[#8f2f24] border-[#8f2f24]/40 bg-[#8f2f24]/10",
};

function Bar({ ratio }: { ratio: number }) {
  const filled = Math.round(ratio * 20);
  return (
    <span className="font-mono text-[11px] tracking-[0.18em] text-[#1d3c38]">
      {"\u2588".repeat(filled)}
      <span className="text-[#1d3c38]/25">{"\u2591".repeat(20 - filled)}</span>
    </span>
  );
}

function ScoreTable({ diagnosis }: { diagnosis: GapDiagnosis }) {
  return (
    <table className="w-full text-left text-[13px]">
      <thead>
        <tr className="border-b border-[#1d3c38]/15 text-[11px] uppercase tracking-[0.16em] text-[#1d3c38]/55">
          <th className="py-2 pr-3 font-medium">Componente</th>
          <th className="py-2 pr-3 font-medium">Peso</th>
          <th className="py-2 pr-3 font-medium">Valor</th>
          <th className="py-2 font-medium">Por quê</th>
        </tr>
      </thead>
      <tbody>
        {diagnosis.score.components.map((c) => (
          <tr key={c.label} className="border-b border-[#1d3c38]/8 align-top">
            <td className="py-2 pr-3 font-medium text-[#12211f]">{c.label}</td>
            <td className="py-2 pr-3 font-mono text-[#1d3c38]/70">{c.weight > 0 ? `+${c.weight}` : c.weight}</td>
            <td className="py-2 pr-3 font-mono text-[#1d3c38]/70">{c.value.toFixed(2)}</td>
            <td className="py-2 text-[#1d3c38]/80">{c.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DiagnosisCard({ diagnosis, index }: { diagnosis: GapDiagnosis; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const c = diagnosis.cluster;

  return (
    <article className="rounded-sm border border-[#1d3c38]/15 bg-white/70">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full min-h-[44px] flex-col gap-3 px-5 py-4 text-left sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="flex flex-col gap-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1d3c38]/50">
            {String(index + 1).padStart(2, "0")} · {c.silo} · fase {c.stage}
          </span>
          <span className="text-lg font-semibold leading-tight text-[#12211f]">{c.rootLabel}</span>
          <span className="text-[13px] text-[#1d3c38]/70">consulta: {c.rootQuery}</span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className={`rounded-sm border px-2 py-1 text-[11px] uppercase tracking-[0.14em] ${GAP_TONE[diagnosis.type]}`}>
            {GAP_LABEL[diagnosis.type]}
          </span>
          <span className="text-right">
            <span className="block font-mono text-2xl leading-none text-[#a8621b]">{diagnosis.score.total}</span>
            <span className="block text-[11px] uppercase tracking-[0.14em] text-[#1d3c38]/55">
              confiança {diagnosis.score.confidence}
            </span>
          </span>
        </span>
      </button>

      {open && (
        <div className="space-y-6 border-t border-[#1d3c38]/12 px-5 py-5">
          <section>
            <h3 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#1d3c38]/55">Diagnóstico</h3>
            <ul className="space-y-1 text-[14px] leading-relaxed text-[#1d3c38]">
              {diagnosis.explanation.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <p className="mt-3 border-l-2 border-[#a8621b] pl-3 text-[14px] font-medium text-[#12211f]">
              {diagnosis.recommendation}
            </p>
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#2f6f63]">
                Coberto ({diagnosis.covered.length})
              </h3>
              <ul className="space-y-2 text-[13px]">
                {diagnosis.covered.map(({ intent, match }) => (
                  <li key={intent.id}>
                    <span className="font-medium text-[#12211f]">{intent.label}</span>
                    <br />
                    <Link to={match.path} className="text-[#2f6f63] underline underline-offset-2">
                      {match.path}
                    </Link>
                    <span className="block text-[#1d3c38]/60">{match.evidence[0]}</span>
                  </li>
                ))}
                {!diagnosis.covered.length && <li className="text-[#1d3c38]/60">nenhuma</li>}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#8f2f24]">
                Não coberto ({diagnosis.uncovered.length})
              </h3>
              <ul className="space-y-2 text-[13px]">
                {diagnosis.uncovered.map((i) => (
                  <li key={i.id}>
                    <span className="font-medium text-[#12211f]">{i.label}</span>
                    <span className="block text-[#1d3c38]/70">{i.question}</span>
                  </li>
                ))}
                {!diagnosis.uncovered.length && <li className="text-[#1d3c38]/60">nenhuma</li>}
              </ul>
            </div>
          </section>

          {diagnosis.mentions.length > 0 && (
            <section>
              <h3 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#1d3c38]/55">
                Páginas que apenas mencionam
              </h3>
              <ul className="flex flex-wrap gap-2 text-[12px]">
                {diagnosis.mentions.map((m) => (
                  <li key={m.path}>
                    <Link
                      to={m.path}
                      className="inline-block rounded-sm border border-[#1d3c38]/20 px-2 py-1 text-[#1d3c38] hover:border-[#a8621b]"
                    >
                      {m.path}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {diagnosis.guardNotes.length > 0 && (
            <section className="rounded-sm border border-[#8f2f24]/25 bg-[#8f2f24]/5 p-4">
              <h3 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#8f2f24]">Guardrails aplicados</h3>
              <ul className="space-y-1 text-[13px] text-[#1d3c38]">
                {diagnosis.guardNotes.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              {c.requiredAngle && (
                <p className="mt-3 text-[14px] font-medium text-[#12211f]">Ângulo obrigatório: {c.requiredAngle}</p>
              )}
            </section>
          )}

          {(c.suggestedTitle || c.cta) && (
            <section className="rounded-sm border border-[#1d3c38]/15 bg-[#f5f0e6] p-4">
              <h3 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#1d3c38]/55">Briefing editorial</h3>
              {c.suggestedTitle && (
                <p className="text-[15px] font-semibold text-[#12211f]">Título sugerido: {c.suggestedTitle}</p>
              )}
              {c.suggestedPath && <p className="font-mono text-[12px] text-[#1d3c38]/70">rota: {c.suggestedPath}</p>}
              {c.cta && <p className="mt-2 text-[14px] text-[#1d3c38]">CTA: {c.cta}</p>}
              <p className="mt-2 text-[13px] text-[#1d3c38]/75">
                Pentágono: CTR pela tensão real do tema, PNL sem fabricar medo, SEO com a consulta principal no H1,
                direção de arte com hero de 88vh e seis imagens contextuais.
              </p>
            </section>
          )}

          <section>
            <h3 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#1d3c38]/55">
              Índice de Oportunidade, conta aberta
            </h3>
            <ScoreTable diagnosis={diagnosis} />
            <p className="mt-3 text-[13px] text-[#1d3c38]/80">
              Confiança {diagnosis.score.confidence}, urgência {diagnosis.score.urgency}.{" "}
              {diagnosis.score.confidenceReasons.join("; ")}.
            </p>
          </section>
        </div>
      )}
    </article>
  );
}

export default function InteligenciaBiblioteca() {
  const diagnoses = useMemo(() => diagnoseAll(), []);
  const silos = useMemo(() => coverageBySilo(diagnoses), [diagnoses]);

  const monitoredIntents = diagnoses.reduce((s, d) => s + d.cluster.children.length, 0);
  const openGaps = diagnoses.filter((d) => d.type !== "coberto" && d.type !== "anti_lacuna").length;
  const antiGaps = diagnoses.filter((d) => d.type === "anti_lacuna").length;
  const closed = diagnoses.filter((d) => d.type === "coberto").length;
  const totalSilos = new Set(PAGES.map((p) => p.silo)).size;

  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#12211f]">
      <Helmet>
        <title>Inteligência da Biblioteca</title>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>

      <header className="border-b border-[#1d3c38]/15 px-5 py-10 lg:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#a8621b]">Painel interno</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight lg:text-5xl">Inteligência da Biblioteca</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#1d3c38]/80">
          O painel não pergunta qual palavra-chave usar. Ele pergunta o que as pessoas tentam resolver e a
          biblioteca ainda não responde. Cada número abaixo tem a conta aberta.
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["Páginas", PAGES.length],
            ["Silos", totalSilos],
            ["Intenções monitoradas", monitoredIntents],
            ["Lacunas abertas", openGaps],
            ["Canibalizações", antiGaps],
            ["Clusters cobertos", closed],
          ].map(([label, value]) => (
            <div key={String(label)} className="border-l-2 border-[#a8621b]/60 pl-3">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-[#1d3c38]/55">{label}</dt>
              <dd className="font-mono text-2xl text-[#12211f]">{value as number}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 font-mono text-[11px] text-[#1d3c38]/50">
          inventário gerado em {new Date(FINGERPRINTS_GENERATED_AT).toLocaleString("pt-BR")} · demanda em estimativa
          até o Search Console ser conectado
        </p>
      </header>

      <main className="space-y-14 px-5 py-12 lg:px-12">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">Oportunidades</h2>
          <p className="mt-1 text-[14px] text-[#1d3c38]/70">
            Ordenadas primeiro por confiança, depois por score. Uma proposta de confiança baixa nunca aparece acima
            de uma de confiança alta.
          </p>
          <div className="mt-6 space-y-4">
            {diagnoses.map((d, i) => (
              <DiagnosisCard key={d.cluster.id} diagnosis={d} index={i} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight">Mapa de cobertura</h2>
          <p className="mt-1 text-[14px] text-[#1d3c38]/70">
            Não é nota de qualidade. É quanto das intenções monitoradas está efetivamente coberto em cada silo.
          </p>
          <div className="mt-6 space-y-3">
            {silos.map((s) => (
              <div key={s.silo} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                <span className="w-full text-[14px] text-[#12211f] sm:w-72">{s.silo}</span>
                <Bar ratio={s.ratio} />
                <span className="font-mono text-[12px] text-[#1d3c38]/65">
                  {s.coveredIntents}/{s.intents} intenções · {s.pages} páginas
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">Estado do sistema</h2>
          <ul className="mt-4 space-y-2 text-[14px] leading-relaxed text-[#1d3c38]">
            <li>Fase 1 ativa: inventário determinístico das páginas, cobertura, classificação de lacuna e score.</li>
            <li>Fase 2 pendente: instrumentação da busca interna, o sinal de maior valor do sistema.</li>
            <li>Fase 3 pendente: decomposição de intenção assistida por modelo, com revisão humana obrigatória.</li>
            <li>Fase 4 pendente: Search Console, que substitui as estimativas por demanda real.</li>
            <li>Fase 6 pendente: medição em 30, 60 e 90 dias e recalibração dos pesos.</li>
          </ul>
          <p className="mt-4 text-[13px] text-[#1d3c38]/70">
            Especificação completa em docs/inteligencia-editorial/ESPECIFICACAO.md.
          </p>
        </section>
      </main>
    </div>
  );
}
