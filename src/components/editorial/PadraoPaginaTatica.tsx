/**
 * PADRAO DE PAGINA EDITORIAL TATICA (molde de referencia, nao roteado)
 *
 * Este arquivo NAO esta registrado em nenhuma rota, menu, busca ou sitemap.
 * Visitantes do site nunca o veem. Ele existe para que qualquer agente ou
 * desenvolvedor reproduza o padrao aprovado lendo o codigo.
 * Documentacao completa: docs/PADRAO_PAGINAS_TATICAS.md
 *
 * Ordem dos modulos:
 * 1. HeroTatica           fundo vivo com malha milimetrica e pulso lento
 * 2. DiagramaTriagem      SVG: rota do panico x barreira tatica, nos clicaveis
 * 3. CartoesEmpilhados    cartoes sticky que empilham (escala + escurecimento)
 * 4. RaioXEvidencia       documento com hotspots periciais (sem quiz)
 * 5. PaineisExpansiveis   flex accordion horizontal (vertical no celular)
 * 6. AlternadorRealidade  narrativa viral x registro primario
 * 7. ChecklistOperacional progresso local, sem perguntas ao leitor
 *
 * Regras: nunca remover texto existente ao aplicar o padrao; zero quizzes;
 * zero emojis; zero travessoes longos; imagens geradas por IA marcadas
 * como ilustrativas; Cadencia 400px (nenhum trecho com mais de 1,5 tela de
 * texto puro sem um elemento de ruptura); respeitar prefers-reduced-motion;
 * alvos de toque 44px; foco de teclado visivel; SEO/JSON-LD intactos.
 */
import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const C = {
  bg: "#07080c",
  panel: "#0e111a",
  panel2: "#131826",
  line: "rgba(255,255,255,0.08)",
  text: "#e8e4dc",
  muted: "#9a978f",
  amber: "#e0a64a",
  teal: "#4fb3a9",
};

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0a64a]";

/* 1. HERO TATICA */
export interface HeroTaticaProps {
  kicker: string;
  title: string;
  lead: string;
  imageSrc?: string;
  imageAlt?: string;
}
export function HeroTatica({ kicker, title, lead, imageSrc, imageAlt = "" }: HeroTaticaProps) {
  const reduce = useReducedMotion();
  return (
    <header className="relative flex min-h-[88vh] items-end overflow-hidden" style={{ background: C.bg, color: C.text }}>
      {imageSrc && <img src={imageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover opacity-40" />}
      <div aria-hidden className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }} />
      <motion.div aria-hidden className="absolute -left-1/4 top-1/4 h-[60vmax] w-[60vmax] rounded-full"
        style={{ background: `radial-gradient(circle, ${C.amber}22, transparent 60%)` }}
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
        <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: C.amber }}>{kicker}</p>
        <h1 className="max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)] font-black leading-[0.95]">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg" style={{ color: C.muted }}>{lead}</p>
      </div>
    </header>
  );
}

/* 2. DIAGRAMA DE TRIAGEM (SVG) */
export interface NoTriagem { id: string; label: string; detail: string }
export interface DiagramaTriagemProps { rotaPanico: NoTriagem[]; barreira: NoTriagem[] }
export function DiagramaTriagem({ rotaPanico, barreira }: DiagramaTriagemProps) {
  const [ativo, setAtivo] = useState<NoTriagem | null>(barreira[0] ?? null);
  const row = (nodes: NoTriagem[], y: number, color: string) =>
    nodes.map((n, i) => {
      const x = 80 + i * (640 / Math.max(nodes.length - 1, 1));
      const on = ativo?.id === n.id;
      return (
        <g key={n.id} role="button" tabIndex={0} aria-label={n.label} className="cursor-pointer outline-none"
          onClick={() => setAtivo(n)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setAtivo(n)}>
          {i < nodes.length - 1 && <line x1={x} y1={y} x2={x + 640 / (nodes.length - 1)} y2={y} stroke={color} strokeOpacity={0.4} strokeDasharray="6 6" />}
          <circle cx={x} cy={y} r={on ? 18 : 12} fill={on ? color : C.panel2} stroke={color} strokeWidth={2} />
          <text x={x} y={y + 40} textAnchor="middle" fill={C.text} fontSize={13}>{n.label}</text>
        </g>
      );
    });
  return (
    <figure className="rounded-2xl border p-6" style={{ background: C.panel, borderColor: C.line }}>
      <svg viewBox="0 0 800 260" className="w-full" role="group" aria-label="Diagrama de triagem">
        <text x={20} y={40} fill={C.amber} fontSize={12}>ROTA DO PANICO</text>
        {row(rotaPanico, 70, C.amber)}
        <text x={20} y={170} fill={C.teal} fontSize={12}>BARREIRA TATICA</text>
        {row(barreira, 200, C.teal)}
      </svg>
      {ativo && <figcaption className="mt-4 text-sm" style={{ color: C.muted }} aria-live="polite"><strong style={{ color: C.text }}>{ativo.label}:</strong> {ativo.detail}</figcaption>}
    </figure>
  );
}

/* 3. CARTOES QUE EMPILHAM */
export interface CartaoEmpilhado { titulo: string; conteudo: ReactNode }
function Cartao({ c, i, total }: { c: CartaoEmpilhado; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - i) * 0.02]);
  const filter = useTransform(scrollYProgress, [0, 1], ["brightness(1)", "brightness(0.7)"]);
  return (
    <div ref={ref} className="sticky h-auto" style={{ top: `calc(6rem + ${i * 1.5}rem)` }}>
      <motion.article style={{ scale, filter, background: C.panel2, borderColor: C.line }}
        className="mb-10 rounded-2xl border p-8 shadow-2xl">
        <p className="text-xs tracking-[0.3em]" style={{ color: C.teal }}>FOLHA {String(i + 1).padStart(2, "0")}</p>
        <h3 className="mt-2 text-2xl font-black" style={{ color: C.text }}>{c.titulo}</h3>
        <div className="mt-4" style={{ color: C.muted }}>{c.conteudo}</div>
      </motion.article>
    </div>
  );
}
export function CartoesEmpilhados({ cartoes }: { cartoes: CartaoEmpilhado[] }) {
  return <div className="relative">{cartoes.map((c, i) => <Cartao key={c.titulo} c={c} i={i} total={cartoes.length} />)}</div>;
}

/* 4. RAIO-X DE EVIDENCIA */
export interface Hotspot { x: number; y: number; titulo: string; evidencia: string }
export interface RaioXEvidenciaProps { imageSrc: string; imageAlt: string; hotspots: Hotspot[]; ilustrativa?: boolean }
export function RaioXEvidencia({ imageSrc, imageAlt, hotspots, ilustrativa }: RaioXEvidenciaProps) {
  const [ativo, setAtivo] = useState(0);
  const h = hotspots[ativo];
  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
      <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: C.line }}>
        <img src={imageSrc} alt={imageAlt} className="w-full" loading="lazy" />
        {hotspots.map((p, i) => (
          <button key={p.titulo} aria-label={p.titulo} onMouseEnter={() => setAtivo(i)} onFocus={() => setAtivo(i)} onClick={() => setAtivo(i)}
            className={`absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ${focus}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <span className="absolute h-full w-full animate-ping rounded-full motion-reduce:animate-none" style={{ background: `${C.amber}55` }} />
            <span className="h-3 w-3 rounded-full" style={{ background: i === ativo ? C.amber : C.teal }} />
          </button>
        ))}
        {ilustrativa && <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-[10px] text-white">Imagem ilustrativa</span>}
      </div>
      <aside className="rounded-2xl border p-6" style={{ background: C.panel, borderColor: C.line }} aria-live="polite">
        <p className="text-xs tracking-[0.3em]" style={{ color: C.amber }}>EVIDENCIA {ativo + 1}/{hotspots.length}</p>
        <h4 className="mt-2 text-xl font-bold" style={{ color: C.text }}>{h?.titulo}</h4>
        <p className="mt-3" style={{ color: C.muted }}>{h?.evidencia}</p>
      </aside>
    </div>
  );
}

/* 5. PAINEIS QUE EXPANDEM */
export interface PainelExpansivel { sigla: string; titulo: string; conteudo: ReactNode }
export function PaineisExpansiveis({ paineis }: { paineis: PainelExpansivel[] }) {
  const [aberto, setAberto] = useState(0);
  return (
    <div className="flex flex-col gap-3 md:h-[420px] md:flex-row">
      {paineis.map((p, i) => {
        const on = i === aberto;
        return (
          <button key={p.titulo} onMouseEnter={() => setAberto(i)} onFocus={() => setAberto(i)} onClick={() => setAberto(i)} aria-expanded={on}
            className={`min-h-[44px] overflow-hidden rounded-2xl border p-6 text-left transition-[flex] duration-500 motion-reduce:transition-none ${focus}`}
            style={{ flex: on ? 3 : 1, background: on ? C.panel2 : C.panel, borderColor: on ? C.amber : C.line }}>
            <span className="text-3xl font-black" style={{ color: on ? C.amber : C.muted }}>{p.sigla}</span>
            <h4 className="mt-2 font-bold" style={{ color: C.text }}>{p.titulo}</h4>
            {on && <div className="mt-3 text-sm" style={{ color: C.muted }}>{p.conteudo}</div>}
          </button>
        );
      })}
    </div>
  );
}

/* 6. ALTERNADOR DE REALIDADE */
export interface AlternadorRealidadeProps { narrativa: { titulo: string; conteudo: ReactNode }; registro: { titulo: string; conteudo: ReactNode } }
export function AlternadorRealidade({ narrativa, registro }: AlternadorRealidadeProps) {
  const [lado, setLado] = useState<"n" | "r">("n");
  const atual = lado === "n" ? narrativa : registro;
  return (
    <div className="rounded-2xl border p-6" style={{ background: C.panel, borderColor: C.line }}>
      <div role="tablist" className="mb-6 inline-flex rounded-full border p-1" style={{ borderColor: C.line }}>
        {([["n", "Narrativa viral", C.amber], ["r", "Registro primario", C.teal]] as const).map(([k, l, col]) => (
          <button key={k} role="tab" aria-selected={lado === k} onClick={() => setLado(k)}
            className={`min-h-[44px] rounded-full px-5 text-sm font-semibold ${focus}`}
            style={{ background: lado === k ? col : "transparent", color: lado === k ? C.bg : C.muted }}>{l}</button>
        ))}
      </div>
      <motion.div key={lado} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="tabpanel">
        <h4 className="text-xl font-bold" style={{ color: C.text }}>{atual.titulo}</h4>
        <div className="mt-3" style={{ color: C.muted }}>{atual.conteudo}</div>
      </motion.div>
    </div>
  );
}

/* 7. CHECKLIST OPERACIONAL */
export function ChecklistOperacional({ itens }: { itens: string[] }) {
  const [feitos, setFeitos] = useState<boolean[]>(() => itens.map(() => false));
  const pct = Math.round((feitos.filter(Boolean).length / itens.length) * 100);
  return (
    <div className="rounded-2xl border p-6" style={{ background: C.panel, borderColor: C.line }}>
      <div className="mb-4 h-2 overflow-hidden rounded-full" style={{ background: C.panel2 }}>
        <div className="h-full transition-all" style={{ width: `${pct}%`, background: C.teal }} />
      </div>
      <p className="mb-4 text-sm" style={{ color: C.muted }} aria-live="polite">{pct}% concluido</p>
      <ul className="space-y-2">
        {itens.map((t, i) => (
          <li key={t}>
            <label className="flex min-h-[44px] cursor-pointer items-center gap-3" style={{ color: C.text }}>
              <input type="checkbox" checked={feitos[i]} onChange={() => setFeitos((f) => f.map((v, j) => (j === i ? !v : v)))} className="h-5 w-5 accent-[#4fb3a9]" />
              {t}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={() => setFeitos(itens.map(() => false))} className={`mt-4 min-h-[44px] text-sm underline ${focus}`} style={{ color: C.amber }}>Limpar</button>
    </div>
  );
}

/* EXEMPLO DE MONTAGEM (nao exportado para nenhuma rota) */
export default function PadraoPaginaTaticaExemplo() {
  return (
    <main style={{ background: C.bg }}>
      <HeroTatica kicker="Centro de Conhecimento" title="Titulo da pagina" lead="Promessa clara do que o leitor vai dominar." />
      <section className="mx-auto max-w-6xl space-y-24 px-6 py-24">
        <DiagramaTriagem
          rotaPanico={[{ id: "a", label: "Gatilho", detail: "Mensagem fabricada para gerar urgencia." }, { id: "b", label: "Choque", detail: "Emocao substitui verificacao." }, { id: "c", label: "Viralizacao", detail: "Compartilhamento por impulso." }]}
          barreira={[{ id: "d", label: "Origem", detail: "Quem publicou primeiro?" }, { id: "e", label: "Contexto", detail: "Leitura lateral em fontes independentes." }, { id: "f", label: "Risco", detail: "Qual o custo de agir errado?" }]} />
        <CartoesEmpilhados cartoes={[{ titulo: "Origem", conteudo: "Texto integral." }, { titulo: "Contexto", conteudo: "Texto integral." }, { titulo: "Risco", conteudo: "Texto integral." }]} />
        <PaineisExpansiveis paineis={[{ sigla: "01", titulo: "Vies de confirmacao", conteudo: "Mecanica, exemplo e antidoto." }, { sigla: "02", titulo: "Ilusao de verdade", conteudo: "Mecanica, exemplo e antidoto." }]} />
        <AlternadorRealidade narrativa={{ titulo: "Manchete emocional", conteudo: "Eixo cortado, risco relativo." }} registro={{ titulo: "Dado primario", conteudo: "Escala completa, risco absoluto." }} />
        <ChecklistOperacional itens={["Identifiquei a origem", "Fiz leitura lateral", "Calculei o risco"]} />
      </section>
    </main>
  );
}
