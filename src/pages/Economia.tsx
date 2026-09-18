import PageFloatingToc from "@/components/PageFloatingToc";
import { useState, useMemo, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Download, Play, Calculator, TrendingDown, Clock, Banknote,
  AlertTriangle, ChevronDown, Flame, ArrowRight
} from "lucide-react";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import SimboloOculto from '@/components/SimboloOculto';
import imgCorrentesImpostos from '@/assets/economia-correntes-impostos.webp';
import imgAmpulhetaTempo from '@/assets/economia-ampulheta-tempo.webp';
import imgCarrinhoInflacao from '@/assets/economia-carrinho-inflacao.webp';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const devaluationData = [
  { year: "1994", valor: 100 },
  { year: "1998", valor: 78 },
  { year: "2002", valor: 52 },
  { year: "2006", valor: 41 },
  { year: "2010", valor: 33 },
  { year: "2014", valor: 24 },
  { year: "2018", valor: 18 },
  { year: "2022", valor: 13 },
  { year: "2024", valor: 11 },
];

const CARGA_TRIBUTARIA = 0.42;
const HORAS_DIA = 8;
const MINUTOS_DIA = HORAS_DIA * 60;

const FAQ_ITEMS = [
  {
    q: "O que é inflação e por que ela é um imposto oculto?",
    a: "Inflação é a perda do poder de compra da moeda causada pela expansão monetária do Banco Central. É um 'imposto oculto' porque o governo não precisa aprovar lei para cobrar — basta imprimir mais dinheiro, diluindo o valor de cada real que você possui."
  },
  {
    q: "Quanto do meu salário vai para o Estado?",
    a: "A carga tributária brasileira é de aproximadamente 42% do PIB. Isso significa que, em média, quase metade do seu dia de trabalho é destinada a sustentar a máquina pública, entre impostos diretos (IR, INSS) e indiretos (ICMS, IPI, ISS)."
  },
  {
    q: "O Real perdeu quanto poder de compra desde 1994?",
    a: "Desde a criação do Plano Real em 1994, a moeda brasileira perdeu aproximadamente 89% do seu poder de compra. R$ 100 de 1994 equivalem a cerca de R$ 11 em poder de compra atual."
  },
  {
    q: "Como proteger meu patrimônio da desvalorização do Real?",
    a: "As estratégias incluem: converter parte do patrimônio em Bitcoin (ativo com oferta fixa de 21 milhões), diversificar em moedas fortes (dólar, franco suíço), investir em ativos reais e reduzir a exposição ao sistema bancário tradicional."
  },
  {
    q: "Qual a diferença entre inflação oficial e inflação real?",
    a: "A inflação oficial (IPCA) é medida pelo governo com uma cesta de produtos que pode ser manipulada. A inflação real, sentida no dia a dia pelo consumidor, costuma ser significativamente maior, especialmente em itens essenciais como alimentos, energia e saúde."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(item => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a }
  }))
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "A Lógica da Pilhagem — Como o Sistema Rouba Seu Tempo",
  description: "Entenda como o sistema fiduciário destrói o poder de compra do trabalhador através da inflação, carga tributária e expansão monetária.",
  author: { "@type": "Person", name: "Lord Junnior" },
  publisher: { "@type": "Organization", name: "Lord Junnior" },
  url: "https://lordjunnior.com.br/economia"
};

// Film Grain

const TOC_ITEMS = [
  { id: "chama", label: "Arsenal" },
  { id: "verdade-salarial", label: "Verdade Salarial" },
];

const FilmGrain = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]">
    <svg className="w-full h-full">
      <filter id="grain-eco"><feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="100%" height="100%" filter="url(#grain-eco)" />
    </svg>
  </div>
);

// Light Beams
const LightBeams = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -top-1/2 -left-1/4 w-full h-[200%] opacity-[0.02]"
      style={{ background: 'linear-gradient(115deg, transparent 40%, hsl(var(--destructive)) 50%, transparent 60%)' }} />
  </div>
);

const Economia = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const result = useMemo(() => {
    if (hourlyRate <= 0) return null;
    const dailyEarning = hourlyRate * HORAS_DIA;
    const taxPerDay = dailyEarning * CARGA_TRIBUTARIA;
    const minutesForState = Math.round(MINUTOS_DIA * CARGA_TRIBUTARIA);
    const hoursForState = Math.floor(minutesForState / 60);
    const remainingMinutes = minutesForState % 60;
    const monthlyTax = taxPerDay * 22;
    const yearlyTax = monthlyTax * 12;
    return { minutesForState, hoursForState, remainingMinutes, taxPerDay, monthlyTax, yearlyTax };
  }, [hourlyRate]);

  const handleCalculate = () => { if (hourlyRate > 0) setShowResult(true); };

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>A Lógica da Pilhagem — Despertar Monetário | Autonomia do Indivíduo</title>
        <meta name="description" content="Entenda como o sistema fiduciário rouba o tempo do indivíduo através da inflação, o imposto silencioso. Calculadora da Verdade Salarial e gráfico de derretimento do Real." />
        <meta name="keywords" content="inflação brasil, imposto oculto, desvalorização real, carga tributária, poder de compra, bitcoin proteção, economia austríaca" />
        <meta property="og:title" content="A Lógica da Pilhagem — Despertar Monetário" />
        <meta property="og:description" content="R$ 100 em 1994 valem R$ 11 hoje. Descubra quanto do seu dia de trabalho pertence ao Estado." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lordjunnior.com.br/economia" />
        <link rel="canonical" href="https://lordjunnior.com.br/economia" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="red" />

      <div className="min-h-screen bg-[#050808] text-foreground font-sans selection:bg-destructive selection:text-destructive-foreground relative overflow-hidden">
        <FilmGrain />
        <LightBeams />

        {/* ── Cinematic Hero ── */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[500px] max-h-[800px] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
            <div className="absolute inset-0 bg-cover bg-center scale-110"
              style={{ backgroundImage: `url('/heroes/soberania-financeira.webp')`, filter: 'brightness(0.4) saturate(0.85)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.15) 0%, rgba(5,8,8,0.5) 50%, rgba(5,8,8,0.92) 80%, rgba(5,8,8,1) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 30%, transparent 40%, rgba(5,8,8,0.85) 100%)' }} />
          </motion.div>

          <motion.div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16" style={{ opacity: contentOpacity }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-8 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Retornar ao Comando
            </Link>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: APPLE_EASE }} className="mb-4">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-destructive opacity-70">NÍVEL 01 · DESPERTAR MONETÁRIO</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.15, ease: APPLE_EASE }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[0.9] mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              A Lógica da<br /><span className="text-destructive italic font-light">Pilhagem</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: APPLE_EASE }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mt-3">
              Entenda como o sistema fiduciário rouba o tempo do indivíduo através da inflação, o imposto silencioso.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.2 }} className="flex items-center gap-2 mt-8">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <ChevronDown size={14} className="text-muted-foreground" />
              </motion.div>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60">Role para explorar</span>
            </motion.div>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #050808)' }} />
        </section>

        {/* ── Quote ── */}
        <section className="relative z-10 px-6 md:px-12 lg:px-20 py-16 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="border-l-2 border-destructive/40 pl-6 py-2">
            <p className="text-foreground font-medium leading-relaxed text-sm md:text-base italic">
              "A maioria das pessoas acredita que a economia é um sistema complexo demais para ser compreendido. Isso é um projeto. A complexidade serve apenas para esconder o fato de que a inflação é um imposto silencioso, cobrado sem votação e sem consentimento."
            </p>
          </motion.div>
        </section>

        {/* ── Cinematic Break: Correntes ── */}
        <section className="relative z-10 py-8 md:py-14">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden border border-white/[0.06] group">
              <img src={imgCorrentesImpostos} alt="Mãos acorrentadas a uma calculadora — escravidão tributária" className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.65) saturate(0.85)' }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">42% do seu dia de trabalho pertence ao Estado. As correntes são invisíveis, mas reais.</p>
                <div className="hidden md:block w-12 h-px bg-gradient-to-r from-red-500/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Devaluation Chart ── */}
        <section className="relative z-10 px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-border/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Derretimento do Real</h2>
                  <p className="text-xs text-muted-foreground font-mono">PODER DE COMPRA DE R$ 100 DESDE O PLANO REAL (1994)</p>
                </div>
              </div>
              <div className="h-[280px] md:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={devaluationData}>
                    <defs>
                      <linearGradient id="devalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
                    <XAxis dataKey="year" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11, fontFamily: "monospace" }} axisLine={{ stroke: "hsl(220, 20%, 16%)" }} />
                    <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11, fontFamily: "monospace" }} axisLine={{ stroke: "hsl(220, 20%, 16%)" }} tickFormatter={(v) => `R$${v}`} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(222, 40%, 8%)", border: "1px solid hsl(220, 20%, 16%)", borderRadius: "8px", fontFamily: "monospace", fontSize: "12px" }}
                      formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Poder de Compra"]} labelStyle={{ color: "hsl(215, 15%, 55%)" }} />
                    <Area type="monotone" dataKey="valor" stroke="hsl(0, 72%, 51%)" strokeWidth={2} fill="url(#devalGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="text-destructive font-bold">R$ 100 em 1994 compram hoje o equivalente a R$ 11.</span>{" "}
                  O Banco Central destruiu 89% do seu poder de compra em 30 anos.
                  <SimboloOculto id="chama" className="ml-1.5 align-middle" />
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Cinematic Break: Ampulheta ── */}
        <section className="relative z-10 py-8 md:py-14">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden border border-white/[0.06] group">
              <img src={imgAmpulhetaTempo} alt="Ampulheta com areia dourada — o tempo é dinheiro que derrete" className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.65) saturate(0.85)' }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">O tempo é o ativo mais escasso. A inflação o transforma em pó.</p>
                <div className="hidden md:block w-12 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Arsenal Disponível ── */}
        <section className="relative z-10 px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">ARSENAL DISPONÍVEL</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-white/[0.03] border border-border/30 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <Download className="w-6 h-6 text-destructive" />
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-destructive bg-destructive/10 px-2.5 py-1 rounded border border-destructive/20">EBOOK</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-destructive transition-colors">O Caminho da Soberania</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">O guia de entrada para entender a transição do sistema de dívida para o sistema de capital real.</p>
                <a href="/o-caminho-da-soberania.pdf" download className="w-full py-3.5 rounded-lg border border-destructive/20 text-destructive font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:bg-destructive/5">
                  <Download className="w-4 h-4" /> Baixar Ebook
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-white/[0.03] border border-border/30 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Play className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">AUDIOBOOK</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">Série: Mitos Econômicos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">Desmontando as mentiras sistemáticas sobre juros, inflação e PIB em áudios de 15 minutos.</p>
                <Link to="/#audioteca" className="w-full py-3.5 rounded-lg border border-emerald-500/20 text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:bg-emerald-500/5">
                  <Play className="w-4 h-4" /> Ouvir Agora
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Cinematic Break: Carrinho Inflação ── */}
        <section className="relative z-10 py-8 md:py-14">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden border border-white/[0.06] group">
              <img src={imgCarrinhoInflacao} alt="Carrinho de supermercado com preços absurdos" className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.7) saturate(0.85)' }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">R$ 100 de 1994 compram R$ 11 hoje. O carrinho não ficou mais caro — o Real ficou mais fraco.</p>
                <div className="hidden md:block w-12 h-px bg-gradient-to-r from-red-500/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Calculadora da Verdade Salarial ── */}
        <section id="verdade-salarial" className="relative z-10 px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">FERRAMENTA INTEGRADA</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-border/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h2 className="font-bold text-xl">Calculadora da Verdade Salarial</h2>
                  <p className="text-xs text-muted-foreground font-mono">QUANTO DO SEU DIA PERTENCE AO ESTADO?</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Coloque o valor da sua hora de trabalho e descubra quantos minutos por dia você trabalha <strong className="text-foreground">exclusivamente</strong> para sustentar a máquina pública. Carga tributária brasileira média: <span className="text-destructive font-mono font-bold">42%</span>.
              </p>
              <div className="mb-6">
                <label className="text-xs text-muted-foreground font-mono block mb-2">VALOR DA SUA HORA DE TRABALHO (R$)</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">R$</span>
                    <input type="number" value={hourlyRate || ""} onChange={(e) => { setHourlyRate(Number(e.target.value)); setShowResult(false); }}
                      placeholder="0,00" className="w-full bg-white/[0.03] border border-border/30 rounded-lg pl-10 pr-4 py-3 text-lg font-mono text-foreground placeholder:text-muted-foreground/50 focus:border-destructive/50 focus:outline-none transition-colors" />
                  </div>
                  <button onClick={handleCalculate} disabled={hourlyRate <= 0}
                    className="px-6 py-3 rounded-lg bg-destructive text-destructive-foreground font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity whitespace-nowrap">
                    Calcular
                  </button>
                </div>
              </div>

              {showResult && result && (
                <motion.div initial={{ opacity: 0, y: 20, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} transition={{ duration: 0.5 }}>
                  <div className="text-center py-6 border border-destructive/20 rounded-xl bg-destructive/5 mb-6">
                    <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2">MINUTOS TRABALHADOS PARA O ESTADO POR DIA</p>
                    <p className="text-5xl md:text-6xl font-bold text-destructive font-mono">{result.minutesForState}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      = <span className="text-foreground font-bold">{result.hoursForState}h {result.remainingMinutes}min</span> do seu dia
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-border/30">
                      <Clock className="w-5 h-5 text-destructive flex-shrink-0" />
                      <div>
                        <p className="text-[9px] font-mono text-muted-foreground">IMPOSTO/DIA</p>
                        <p className="font-mono font-bold text-sm text-destructive">R$ {result.taxPerDay.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-border/30">
                      <Banknote className="w-5 h-5 text-destructive flex-shrink-0" />
                      <div>
                        <p className="text-[9px] font-mono text-muted-foreground">IMPOSTO/MÊS</p>
                        <p className="font-mono font-bold text-sm text-destructive">R$ {result.monthlyTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-border/30">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                      <div>
                        <p className="text-[9px] font-mono text-muted-foreground">IMPOSTO/ANO</p>
                        <p className="font-mono font-bold text-sm text-destructive">R$ {result.yearlyTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-2">
                      <span>SEU DIA DE TRABALHO (8h)</span>
                      <span>{MINUTOS_DIA} minutos</span>
                    </div>
                    <div className="w-full h-8 rounded-lg bg-white/[0.03] overflow-hidden flex">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${CARGA_TRIBUTARIA * 100}%` }} transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-destructive/60 flex items-center justify-center">
                        <span className="text-[9px] font-mono font-bold text-foreground">ESTADO ({(CARGA_TRIBUTARIA * 100).toFixed(0)}%)</span>
                      </motion.div>
                      <div className="h-full flex-1 bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-[9px] font-mono font-bold text-emerald-400">VOCÊ ({((1 - CARGA_TRIBUTARIA) * 100).toFixed(0)}%)</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-2 border-destructive/40 pl-4 mt-6">
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      "Você não paga impostos porque o Estado precisa. Você paga porque o Estado decide o quanto precisa tirar de você e ajusta a narrativa depois."
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="relative z-10 px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">PERGUNTAS FREQUENTES</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="rounded-xl border border-border/30 bg-white/[0.02] overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left">
                    <span className="text-sm font-semibold text-foreground pr-4">{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="relative z-10 px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs text-muted-foreground mb-6 tracking-widest">PRÓXIMO NÍVEL: SOBERANIA BITCOIN</p>
            <Link to="/bitcoin" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-destructive text-destructive-foreground font-bold text-sm hover:opacity-90 transition-opacity">
              Avançar para Nível 02 <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-border/30 to-transparent mt-10" />
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50 mt-4">SISTEMA OPERACIONAL DE SOBERANIA</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Economia;
