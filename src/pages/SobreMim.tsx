import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import GlassPanel, { Parallax, ScrollRail } from "@/components/sobre/GlassPanel";
import { Mail, ArrowRight, Instagram, Github, Youtube, Play } from "lucide-react";
import BackToHome from "@/components/BackToHome";
import heroProfile from "@/assets/sobre/lord-junnior-real.png";
import heroBg from "@/assets/sobre/hero-bg-hardware.jpg";
import provaChile from "@/assets/sobre/prova-chile.jpg";
import provaJadeCore from "@/assets/sobre/prova-jade-core.jpg";
import provaPlataforma from "@/assets/sobre/prova-plataforma.jpg";

const ORANGE = "#FF6600";
const AMBER = "#F59E0B";
const BG = "#08090a";

const NAV = [
  { id: "identidade", label: "Identidade" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "prova", label: "Prova" },
  { id: "dominio", label: "Domínio" },
  { id: "catalogo", label: "Catálogo" },
];

const PILLARS = [
  {
    n: "01",
    title: "ARQUITETURA WEB",
    desc: "Sistemas reativos construídos com React, TypeScript e Tailwind. Da interface ao deploy, sem dependência de plataformas genéricas.",
    tags: ["Front & Back", "100% Custom"],
  },
  {
    n: "02",
    title: "INTELIGÊNCIA ARTIFICIAL",
    desc: "IA local e em nuvem para automação de alto fluxo. Dados dentro do seu perímetro, nada vaza, nada é vendido.",
    tags: ["Local & Cloud", "Zero Leak"],
  },
  {
    n: "03",
    title: "DESIGN & MÍDIA",
    desc: "Direção criativa, UI/UX, motion e edição audiovisual. Identidade visual que carrega peso, prova e autoridade.",
    tags: ["UI / UX / Motion", "High-End"],
  },
  {
    n: "04",
    title: "SOBERANIA TÉCNICA",
    desc: "Autocustódia, jurisdição, infraestrutura autônoma e engenharia reversa. O conhecimento que tira você da gaiola.",
    tags: ["Bitcoin & Privacidade", "Root Access"],
  },
];

const SKILLS = [
  { label: "Arquitetura Web & Front-end", percent: 95 },
  { label: "Design de Interface & Branding", percent: 96 },
  { label: "Implementação de IA & Automação", percent: 90 },
  { label: "Engenharia Reversa & Hardware", percent: 92 },
  { label: "Motion Design & Audiovisual", percent: 87 },
  { label: "Infraestrutura & DevOps", percent: 85 },
];

const TIMELINE = [
  {
    periodo: "2021 · Presente",
    empresa: "Plataforma Lord Junnior",
    cargo: "Arquiteto de Sistemas & Consultor",
    desc: "Ecosistema de ferramentas, conteúdo e produtos digitais voltados a soberania técnica, Bitcoin e autonomia pessoal.",
  },
  {
    periodo: "2018 · 2021",
    empresa: "Mercado Corporativo",
    cargo: "Consultor de Design & IA",
    desc: "Parceiro estratégico para implementação de IA de alto fluxo, design system e unificação entre gráfico e desenvolvimento.",
  },
  {
    periodo: "2012 · 2018",
    empresa: "Ecossistema Apple & Agências",
    cargo: "Especialista Técnico & Designer Sênior",
    desc: "Década dissecando a arquitetura mais hermética do mercado. Engenharia reversa de hardware/software e liderança de design.",
  },
  {
    periodo: "2008 · 2012",
    empresa: "Empresas Locais & RedeTV",
    cargo: "Designer Gráfico & Motion",
    desc: "Início prestando serviços para emissoras e empresas locais. Domínio de fluxos de impressão, motion e audiovisual.",
  },
];

const CASES = [
  {
    n: "01",
    title: "CONTEÚDO QUE ESCALA",
    stat: "100K+",
    label: "Visualizações em Vídeos de Saída",
    desc: "Roteiros sobre cédula e residência no Chile, cartões cripto sem reporte e autocustódia transformados em páginas de autoridade com SEO, CTA e PNL.",
    cta: "Ver Estratégias de Saída",
    href: "/saida/cedula-residencia-chile",
    image: provaChile,
    alt: "Cordilheira dos Andes ao amanhecer, símbolo de liberdade de jurisdição",
  },
  {
    n: "02",
    title: "PLATAFORMA SOBERANA",
    stat: "100%",
    label: "Infraestrutura Autônoma",
    desc: "Sistema próprio de conteúdo, biblioteca digital, simuladores e ferramentas open source. Sem depender de terceiros para entregar valor.",
    cta: "Explorar o Arsenal",
    href: "/recursos-e-ferramentas",
    image: provaPlataforma,
    alt: "Centro de comando digital com múltiplas telas e dados de Bitcoin",
  },
  {
    n: "03",
    title: "REVIEWS QUE SALVAM PATRIMÔNIO",
    stat: "Jade",
    label: "Hardware Wallet Revisado",
    desc: "Análise técnica do Jade Core comparando segurança, usabilidade e preço contra Ledger e Trezor. Autocustódia acessível em menos de 5 minutos.",
    cta: "Ler Jade Core Review",
    href: "/autocustodia/jade-core-review",
    image: provaJadeCore,
    alt: "Hardware wallet Jade Core nas mãos com LED laranja",
  },
];

const HUD_NODES = [
  { code: "PS", name: "Photoshop", desc: "Design gráfico avançado, composição e retoque de alto nível." },
  { code: "AI", name: "Illustrator", desc: "Vetorização, identidade visual e design system escalável." },
  { code: "FIG", name: "Figma", desc: "Prototipagem, design systems e colaboração em produto." },
  { code: "PR", name: "Premiere Pro", desc: "Edição audiovisual profissional e finalização." },
  { code: "AE", name: "After Effects", desc: "Motion design, animação de UI e VFX." },
  { code: "LR", name: "Lightroom", desc: "Tratamento fotográfico e color grading." },
  { code: "OBS", name: "OBS Studio", desc: "Streaming e captura profissional multicâmera." },
  { code: "OLL", name: "Ollama", desc: "IA local sem vazamento de dados. Modelos on-premise." },
  { code: "OAI", name: "OpenAI API", desc: "Automação e integração de agentes em fluxo corporativo." },
  { code: "RC", name: "React", desc: "Aplicações reativas, arquitetura de componentes e estado." },
  { code: "TW", name: "Tailwind CSS", desc: "Design system utilitário, escalável e performático." },
  { code: "TS", name: "TypeScript", desc: "Tipagem estática, contratos e segurança em escala." },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SkillBar({ label, percent, delay }: { label: string; percent: number; delay: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-40px" });
  const [w, setW] = useState(0);
  useEffect(() => {
    if (inView) { const t = setTimeout(() => setW(percent), delay); return () => clearTimeout(t); }
  }, [inView, percent, delay]);
  return (
    <div ref={wrapRef}>
      <div className="flex justify-between text-sm text-white/85 mb-2">
        <span className="font-medium">{label}</span>
        <span className="font-mono text-white/50 text-xs">{percent}%</span>
      </div>
      <div className="h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-[1500ms] ease-out"
          style={{ width: `${w}%`, background: `linear-gradient(90deg, ${AMBER}, ${ORANGE})`, boxShadow: `0 0 14px ${ORANGE}66` }}
        />
      </div>
    </div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function SectionMark({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-10">
      <span className="font-mono text-[10px] tracking-[0.35em] text-white/40 uppercase">{n}</span>
      <div className="h-px flex-1 bg-white/10" />
      <h2 className="font-bold text-xl md:text-2xl tracking-tight text-white uppercase">{title}</h2>
    </div>
  );
}

function FloatingParticle({ delay, duration, left, size }: { delay: number; duration: number; left: string; size: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left,
        bottom: "-10%",
        width: size,
        height: size,
        background: `radial-gradient(circle, ${ORANGE}88 0%, transparent 70%)`,
        filter: "blur(2px)",
        animation: `floatUp ${duration}s linear ${delay}s infinite`,
      }}
    />
  );
}

export default function SobreMim() {
  const [activeNode, setActiveNode] = useState<(typeof HUD_NODES)[number] | null>(null);

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: BG, fontFamily: "'Inter Tight', system-ui, sans-serif" }}
    >
      <Helmet>
        <title>Sobre Mim | Lord Junnior · Arquiteto de Soberania</title>
        <meta name="description" content="Arquiteto de sistemas, engenharia reversa, IA local e design estratégico. 17 anos construindo infraestrutura autônoma, conteúdo e ferramentas de soberania." />
        <meta property="og:title" content="Sobre Mim | Lord Junnior · Arquiteto de Soberania" />
        <meta property="og:description" content="Arquiteto de sistemas, engenharia reversa, IA local e design estratégico. 17 anos construindo infraestrutura autônoma." />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes slowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          30% { transform: translate(3%, -2%); }
          50% { transform: translate(-2%, 5%); }
          70% { transform: translate(4%, 3%); }
          90% { transform: translate(-3%, -4%); }
        }
      `}</style>

      <BackToHome />

      {/* Sticky top nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#08090a]/80 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="font-mono text-sm tracking-[0.3em] font-bold">LORD JUNNIOR</div>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
              >
                {it.label}
              </a>
            ))}
          </nav>
          <a
            href="mailto:contato@lordjunnior.com"
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold px-4 py-2 border border-white/20 hover:bg-white hover:text-[#08090a] transition-colors"
          >
            Contato
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Hardware Bitcoin macro"
            className="w-full h-full object-cover scale-105" loading="eager" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090a] via-[#08090a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-transparent to-[#08090a]/60" />
          <div className="absolute inset-0 bg-[#08090a]/30" />
        </div>

        {/* Grain layer */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.08] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            animation: "grain 8s steps(10) infinite",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          {[
            { d: 12, l: "10%", s: 4 },
            { d: 18, l: "25%", s: 6 },
            { d: 14, l: "40%", s: 5 },
            { d: 20, l: "55%", s: 3 },
            { d: 16, l: "70%", s: 5 },
            { d: 13, l: "85%", s: 4 },
            { d: 19, l: "95%", s: 3 },
          ].map((p, i) => (
            <FloatingParticle key={i} delay={i * 1.2} duration={p.d} left={p.l} size={p.s} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10 pt-20 md:pt-0">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ORANGE }} />
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/60">DOSSIÊ 001 · PERFIL DO OPERADOR</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="font-bold tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-8xl">
                  Atrás de cada<br />
                  <span style={{ color: ORANGE }}>sistema</span> que te<br />
                  tira da gaiola.
                </h1>
              </Reveal>

              <Reveal delay={0.25}>
                <p className="mt-10 max-w-2xl text-lg md:text-xl text-white/75 leading-relaxed">
                  Lord Junnior é o arquiteto por trás da plataforma, dos vídeos que bombaram e das ferramentas que provam que soberania técnica não é teoria: é engenharia aplicada.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-12 flex flex-wrap gap-3">
                  {["Arquitetura Web", "Engenharia Reversa", "Bitcoin & Autocustódia", "IA Local"].map((t) => (
                    <span key={t} className="text-[11px] uppercase tracking-[0.2em] px-3 py-2 border border-white/15 text-white/70 bg-black/20 backdrop-blur-sm">{t}</span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Hero portrait */}
            <Reveal delay={0.3} className="hidden lg:flex justify-center">
              <div className="relative w-[420px] h-[520px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-transparent to-transparent z-10" />
                <div className="absolute inset-0 border border-white/10 z-20" />
                <div className="absolute -inset-3 border border-white/5 z-0" />
                <div
                  className="absolute -right-8 -bottom-8 w-48 h-48 z-0 opacity-40"
                  style={{ background: `radial-gradient(circle, ${ORANGE} 0%, transparent 70%)`, filter: "blur(60px)" }}
                />
                <img
                  src={heroProfile}
                  alt="Lord Junnior, arquiteto de sistemas de soberania"
                  className="w-full h-full object-cover grayscale contrast-110" loading="eager" fetchPriority="high" decoding="async" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 01 IDENTIDADE + PONTE NARRATIVA */}
      <section id="identidade" className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionMark n="01 · IDENTIDADE" title="A Assinatura" />
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <Reveal>
            <p className="text-lg text-white/75 leading-relaxed">
              Eu não vendo cursos, vendo arquitetura. Cada página, cada vídeo e cada ferramenta que você encontra aqui foi construída por um operador que testou na própria pele o que ensina: engenharia reversa, infraestrutura autônoma, Bitcoin, jurisdição e IA sem vazamento.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/75 leading-relaxed">
              O diferencial não é a lista de habilidades. É a capacidade de unir design, código e estratégia de soberania em um sistema coeso que escala, protege e converte. De quem chega perdido na gaiola fiat a quem sai com chaves na mão.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02 ATUAÇÃO */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <SectionMark n="02 · ATUAÇÃO" title="O Que Eu Construo" />
          <Reveal>
            <p className="text-2xl md:text-3xl font-medium tracking-tight text-white/90 leading-snug max-w-4xl">
              Sistemas de autonomia, não apenas interfaces bonitas.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-12">
            <Reveal delay={0.1}>
              <p className="text-lg text-white/70 leading-relaxed">
                Atuo como arquiteto técnico para projetos que exigem independência de infraestrutura, clareza narrativa e execução sênior. Unifico design system, desenvolvimento full-stack, automação por IA e estratégia de conteúdo em um único fluxo de entrega.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-white/70 leading-relaxed">
                Seja para blindar patrimônio em Bitcoin, escapar de jurisdições nocivas, produzir conteúdo que educa e vende, ou erguer uma plataforma digital autônoma: o trabalho começa no diagnóstico e termina no deploy.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 CAPACIDADES */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionMark n="03 · CAPACIDADES" title="Os Pilares de Atuação" />
        <Reveal>
          <p className="text-white/60 mb-14 max-w-2xl text-lg">Quatro frentes técnicas que sustentam todas as entregas de soberania.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-px bg-white/[0.06]">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="bg-[#08090a] p-8 md:p-10 h-full group hover:bg-white/[0.02] transition-colors">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono text-xs tracking-[0.3em] text-white/40">{p.n}</span>
                  <div className="h-px flex-1 mx-4 bg-white/10" />
                  <span className="w-2 h-2 rounded-full" style={{ background: ORANGE }} />
                </div>
                <h3 className="font-bold text-xl md:text-2xl tracking-tight mb-4">{p.title}</h3>
                <p className="text-white/65 leading-relaxed mb-6">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 border border-white/15 text-white/60">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 TRAJETÓRIA */}
      <section id="trajetoria" className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <SectionMark n="04 · TRAJETÓRIA" title="Competências & Experiência" />

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14">
            <Reveal>
              <div className="border border-white/10 p-8 md:p-10 bg-[#0c0d10]">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">OPERADOR</div>
                <h3 className="font-bold text-3xl tracking-tight mb-2">Lord Junnior</h3>
                <p className="text-white/60 mb-6">Arquiteto de Sistemas & Engenharia Reversa</p>
                <p className="text-white/70 leading-relaxed mb-10">
                  17 anos de mercado. Da engenharia reversa de hardware à automação por IA local e arquitetura web soberana.
                </p>
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">HABILIDADES</div>
                <div className="space-y-5">
                  {SKILLS.map((s, i) => (
                    <SkillBar key={s.label} label={s.label} percent={s.percent} delay={i * 120} />
                  ))}
                </div>
              </div>
            </Reveal>

            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">EXPERIÊNCIA</div>
              <div className="relative pl-8 border-l border-white/10 space-y-10">
                {TIMELINE.map((t, i) => (
                  <Reveal key={t.periodo} delay={i * 0.08}>
                    <div className="relative">
                      <div className="absolute -left-[41px] top-1.5 w-3 h-3 rounded-full border-2" style={{ borderColor: ORANGE, background: BG }} />
                      <div className="font-mono text-xs text-white/50 mb-1">{t.periodo}</div>
                      <h4 className="font-bold text-xl">{t.empresa}</h4>
                      <p className="text-sm mb-3" style={{ color: ORANGE }}>{t.cargo}</p>
                      <p className="text-white/65 leading-relaxed">{t.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 PROVA VIVA */}
      <section id="prova" className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionMark n="05 · PROVA DE TRABALHO" title="Arquitetura Verificada" />
        <Reveal>
          <p className="text-white/60 max-w-2xl text-lg mb-14">
            Não acredite em promessas. Acredite em sistemas que já existem, conteúdo que já viralizou e ferramentas que já protegeram gente real.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
          {[
            { v: 17, s: "", l: "Anos de Iteração" },
            { v: 0, s: "", l: "Vazamentos em IA" },
            { v: 100, s: "%", l: "Infraestrutura Autônoma" },
          ].map((c) => (
            <div key={c.l} className="bg-[#08090a] p-8">
              <div className="text-5xl font-bold tracking-tight mb-2" style={{ color: ORANGE }}>
                <Counter target={c.v} suffix={c.s} />
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">{c.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-16">
          {CASES.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.1}>
              <div className={`grid lg:grid-cols-2 gap-0 border border-white/10 bg-[#0c0d10] overflow-hidden ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={`relative h-[320px] lg:h-[420px] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <img
                    src={c.image}
                    alt={c.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent opacity-60" />
                </div>
                <div className={`p-8 md:p-12 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-mono text-xs tracking-[0.3em] text-white/40">{c.n}</span>
                    <div className="font-mono text-3xl font-bold" style={{ color: ORANGE }}>{c.stat}</div>
                  </div>
                  <h3 className="font-bold text-2xl md:text-3xl tracking-tight mb-3">{c.title}</h3>
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-4">{c.label}</div>
                  <p className="text-white/70 leading-relaxed mb-8">{c.desc}</p>
                  <a
                    href={c.href}
                    className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] px-6 py-4 border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all self-start"
                  >
                    {c.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 DOMÍNIO */}
      <section id="dominio" className="border-y border-white/[0.06] bg-white/[0.02] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 relative z-10">
          <SectionMark n="06 · DOMÍNIO TÉCNICO" title="As Ferramentas Por Trás de Cada Entrega" />

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
            <div className="border border-white/10 bg-[#0c0d10] p-8 relative overflow-hidden">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">// STATUS DO SISTEMA</div>
              <div
                className="absolute inset-0 pointer-events-none opacity-20 z-0"
                style={{
                  background: "linear-gradient(transparent 50%, rgba(255, 102, 0, 0.03) 50%)",
                  backgroundSize: "100% 4px",
                }}
              />
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 relative z-10">
                {HUD_NODES.map((n) => {
                  const active = activeNode?.code === n.code;
                  return (
                    <button
                      key={n.code}
                      onMouseEnter={() => setActiveNode(n)}
                      onClick={() => setActiveNode(n)}
                      className={`aspect-square flex items-center justify-center border font-mono text-sm font-bold tracking-wider transition-all ${
                        active
                          ? "border-transparent text-[#08090a]"
                          : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                      }`}
                      style={active ? { background: `linear-gradient(135deg, ${AMBER}, ${ORANGE})`, boxShadow: `0 0 24px ${ORANGE}55` } : {}}
                    >
                      {n.code}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border border-white/10 bg-[#0c0d10] p-8 flex flex-col justify-center relative overflow-hidden">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">// NÓ SELECIONADO</div>
              <div className="min-h-[140px] relative z-10">
                <div className="text-3xl font-bold tracking-tight mb-2 transition-all" style={{ color: activeNode ? ORANGE : "rgba(255,255,255,0.4)" }}>
                  {activeNode ? activeNode.name : "SELECIONE UM NÓ"}
                </div>
                <p className="text-white/70 leading-relaxed">
                  {activeNode ? activeNode.desc : "Passe o mouse sobre os módulos para visualizar as especificações operacionais."}
                </p>
              </div>
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, rgba(255, 102, 0, 0.02) 50%, transparent 100%)",
                  animation: activeNode ? "scanline 2.5s linear infinite" : "none",
                  backgroundSize: "100% 4px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA DUPLO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">// PROTOCOLO DE AÇÃO</div>
        <Reveal>
          <h2 className="font-bold text-4xl md:text-6xl tracking-tight leading-[1] max-w-4xl">
            O sistema está posto.<br />
            <span style={{ color: ORANGE }}>Você vai construir ou só consumir?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-lg text-white/70 leading-relaxed">
            Consultoria técnica sênior é para quem já entende que autonomia exige arquitetura. Se você quer copiar o que funciona por aqui, a biblioteca está aberta. Se quer executar ao lado de quem construiu, a porta está aberta.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-wrap sm:flex-row gap-4 mt-10">
            <a
              href="mailto:contato@lordjunnior.com"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 font-bold uppercase tracking-[0.2em] text-sm transition-colors"
              style={{ background: ORANGE, color: "#08090a" }}
            >
              Trabalhar Comigo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 font-bold uppercase tracking-[0.2em] text-sm border border-white/20 text-white hover:bg-white/5 transition-colors"
            >
              <Play className="w-4 h-4" />
              Explorar Conteúdo
            </a>
          </div>
        </Reveal>
      </section>

      {/* CATÁLOGO / ARSENAL */}
      <section id="catalogo" className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">// ARSENAL DE AUTONOMIA</div>
          <Reveal>
            <h2 className="font-bold text-4xl md:text-5xl tracking-tight mb-14">Ferramentas para a sua independência.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-white/[0.06]">
            <Reveal>
              <div className="bg-[#08090a] p-10 h-full flex flex-col">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">DISPONIBILIDADE</div>
                <h3 className="font-bold text-2xl mb-4">CONSULTORIA TÉCNICA</h3>
                <p className="text-white/70 leading-relaxed mb-8 flex-1">
                  Parceria estratégica para automação por IA, arquitetura web, design systems e estratégia de conteúdo de soberania.
                </p>
                <a
                  href="mailto:contato@lordjunnior.com"
                  className="flex items-center justify-center gap-2 w-full py-5 bg-white text-[#08090a] font-bold hover:opacity-90 uppercase tracking-[0.2em] text-sm transition-colors"
                >
                  Iniciar Conversa <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-[#08090a] p-10 h-full flex flex-col">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">ECOSSISTEMA</div>
                <h3 className="font-bold text-2xl mb-4">THE FREEDOM CODE</h3>
                <p className="text-white/70 leading-relaxed mb-8 flex-1">
                  Biblioteca, simuladores, e-books, audiobooks e ferramentas open source construídas do zero para quem quer sair da gaiola.
                </p>
                <a
                  href="/recursos-e-ferramentas"
                  className="flex items-center justify-center gap-2 w-full py-5 border border-white text-white font-bold hover:bg-white hover:text-[#08090a] transition-colors uppercase tracking-[0.2em] text-sm"
                >
                  Ver Biblioteca <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-48 text-center">
        <Reveal>
          <p className="font-bold text-3xl md:text-5xl tracking-tight leading-[1.15]">
            CONHECIMENTO É PODER.<br />
            AUTONOMIA É DECISÃO.<br />
            <span style={{ color: ORANGE }}>AÇÃO É ENGENHARIA.</span>
          </p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] bg-[#06070a]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-mono text-sm tracking-[0.3em] font-bold mb-4">LORD JUNIOR</div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Arquiteto de Sistemas. Engenharia reversa, IA local, Bitcoin e design de alto padrão.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">NAVEGAÇÃO</div>
            <ul className="space-y-2 text-white/70">
              <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
              {NAV.map((n) => (
                <li key={n.id}><a href={`#${n.id}`} className="hover:text-white transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">CONEXÃO</div>
            <div className="flex flex-col gap-3 text-white/70">
              <a href="mailto:contato@lordjunnior.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> Email Direto
              </a>
              <a href="https://instagram.com/lord.junnior" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a href="https://youtube.com/@LordJunnior" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" /> YouTube
              </a>
              <a href="https://github.com/lordjunnior" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 flex justify-between">
            <span>© {new Date().getFullYear()} LORD JUNIOR</span>
            <span>DOSSIÊ 001 · v2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
