import PageFloatingToc from "@/components/PageFloatingToc";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, ArrowRight, Key,
  Bitcoin as BtcIcon, Home, TrendingUp, Info, AlertTriangle,
  ChevronDown
} from "lucide-react";
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import SimboloOculto from '@/components/SimboloOculto';
import SnippetBait from '@/components/SnippetBait';

import hwWalletsImg from "@/assets/btc-hardware-wallets.jpg";
import nodeImg from "@/assets/btc-node-raspberry.jpg";
import chartImg from "@/assets/btc-vs-imovel-chart.jpg";
import seedImg from "@/assets/btc-seed-backup.jpg";
import BackToHome from '@/components/BackToHome';

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wallets = [
  { name: "Ledger Nano S Plus", type: "Hardware Wallet", security: "Chip Secure Element (CC EAL5+)", price: "~R$ 500", link: "https://www.ledger.com", pros: ["Mais de 5.500 ativos", "Bluetooth", "Tela grande"] },
  { name: "Trezor Model One", type: "Hardware Wallet", security: "Open Source Firmware", price: "~R$ 400", link: "https://trezor.io", pros: ["Código aberto", "Simples de usar", "Comunidade ativa"] },
  { name: "Coldcard Mk4", type: "Air-gapped Wallet", security: "Dual Secure Element + Air-gap", price: "~R$ 800", link: "https://coldcard.com", pros: ["100% offline", "Focada em Bitcoin", "Nível militar"] },
  { name: "SeedSigner", type: "DIY Air-gapped", security: "Open Source + Raspberry Pi", price: "~R$ 200 (DIY)", link: "https://seedsigner.com", pros: ["Faça você mesmo", "Sem firmware proprietário", "Descartável"] },
];

const nodeSteps = [
  { title: "Escolha o Hardware", desc: "Raspberry Pi 4 (4GB+) ou um PC antigo com 1TB de SSD. Custo total: ~R$ 800." },
  { title: "Instale o Sistema", desc: "Use Umbrel, Start9, ou RaspiBlitz. Interface gráfica, sem necessidade de linha de comando." },
  { title: "Sincronize a Blockchain", desc: "O node vai baixar e verificar todas as transações desde 2009. Leva de 2 a 7 dias." },
  { title: "Conecte sua Wallet", desc: "Aponte sua carteira (Sparrow, Electrum) para o seu próprio node. Agora você não depende de ninguém." },
];

const comparisonData = [
  { year: "2014", btc: 100, imovel: 100 }, { year: "2015", btc: 135, imovel: 95 },
  { year: "2016", btc: 280, imovel: 90 }, { year: "2017", btc: 4200, imovel: 92 },
  { year: "2018", btc: 1100, imovel: 93 }, { year: "2019", btc: 2200, imovel: 96 },
  { year: "2020", btc: 8500, imovel: 100 }, { year: "2021", btc: 19000, imovel: 108 },
  { year: "2022", btc: 5500, imovel: 112 }, { year: "2023", btc: 12000, imovel: 115 },
  { year: "2024", btc: 32000, imovel: 118 },
];

const FAQ_ITEMS = [
  { q: "O que é autocustódia de Bitcoin?", a: "Autocustódia significa que você controla as chaves privadas das suas moedas, sem depender de exchanges ou bancos. Se você não tem as chaves, as moedas não são suas." },
  { q: "Qual a melhor hardware wallet para iniciantes?", a: "Para iniciantes, a Trezor Model One ou Ledger Nano S Plus são excelentes opções. São fáceis de usar, têm interfaces intuitivas e custam entre R$ 400-500." },
  { q: "Por que rodar meu próprio node Bitcoin?", a: "Rodar um node significa que você verifica todas as transações sozinho, sem confiar em terceiros. Isso garante privacidade total e contribui para a descentralização da rede." },
  { q: "Bitcoin é melhor investimento que imóvel?", a: "Historicamente, R$ 100 investidos em Bitcoin em 2014 valeriam ~R$ 32.000 hoje, enquanto o mesmo em imóvel estaria em ~R$ 118. Bitcoin supera imóveis pela escassez matemática absoluta de 21 milhões de unidades." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } }))
};
const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Blindagem Operacional — Soberania Bitcoin",
  description: "Guia completo de autocustódia, hardware wallets, node Bitcoin e comparativo BTC vs imóveis.",
  author: { "@type": "Person", name: "Lord Junnior" },
  publisher: { "@type": "Organization", name: "Lord Junnior" },
  url: "https://lordjunnior.com.br/bitcoin"
};

const TOC_ITEMS = [
  { id: "autocustodia", label: "Autocustódia" },
  { id: "semente", label: "Hardware Wallets" },
  { id: "node", label: "Node Soberano" },
  { id: "btc-vs-imovel", label: "Bitcoin vs Imóvel" },
];

const FilmGrain = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]">
    <svg className="w-full h-full"><filter id="grain-btc"><feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter="url(#grain-btc)" /></svg>
  </div>
);
const LightBeams = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -top-1/2 -left-1/4 w-full h-[200%] opacity-[0.02]" style={{ background: 'linear-gradient(115deg, transparent 40%, hsl(40, 92%, 56%) 50%, transparent 60%)' }} />
  </div>
);

const Bitcoin = () => {
  const location = useLocation();
  const [propertyValue, setPropertyValue] = useState(500000);
  const [rentValue, setRentValue] = useState(2500);
  const [showSimResult, setShowSimResult] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const BTC_APPRECIATION = 2.85;
  const REAL_ESTATE_APPRECIATION = 0.18;
  const BTC_DCA_MULTIPLIER = 1.9;
  const scenarioSellBuy = propertyValue * (1 + BTC_APPRECIATION);
  const scenarioKeep = propertyValue * (1 + REAL_ESTATE_APPRECIATION);
  const totalRentInvested = rentValue * 36;
  const rentGains = totalRentInvested * BTC_DCA_MULTIPLIER;
  const scenarioRentInvest = propertyValue * (1 + REAL_ESTATE_APPRECIATION) + rentGains;
  const formatCurrency = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => { document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 600);
    } else { window.scrollTo(0, 0); }
  }, [location.hash]);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Blindagem Operacional — Soberania Bitcoin | Autonomia do Indivíduo</title>
        <meta name="description" content="Guia completo de autocustódia Bitcoin: hardware wallets (Ledger, Trezor, Coldcard), como rodar seu próprio node e simulador BTC vs Imóveis." />
        <meta name="keywords" content="autocustódia bitcoin, hardware wallet, ledger, trezor, coldcard, node bitcoin, bitcoin vs imóvel, soberania financeira" />
        <meta property="og:title" content="Blindagem Operacional — Soberania Bitcoin" />
        <meta property="og:description" content="Se você não tem as chaves, as moedas não são suas. Guia completo de autocustódia." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lordjunnior.com.br/bitcoin" />
        <link rel="canonical" href="https://lordjunnior.com.br/bitcoin" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="orange" />

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-amber-600 selection:text-white relative overflow-hidden">
        <FilmGrain />
        <LightBeams />

        {/* ── Cinematic Hero ── */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[500px] max-h-[800px] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
            <div className="absolute inset-0 bg-cover bg-center scale-110"
              style={{ backgroundImage: `url('/heroes/entenda-bitcoin.webp')`, filter: 'brightness(0.4) saturate(0.85)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.15) 0%, rgba(5,8,8,0.5) 50%, rgba(5,8,8,0.92) 80%, rgba(5,8,8,1) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 30%, transparent 40%, rgba(5,8,8,0.85) 100%)' }} />
          </motion.div>
          <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-12 md:pb-16" style={{ opacity: contentOpacity }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-8 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Retornar ao Comando
            </Link>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: APPLE_EASE }} className="mb-4">
              <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-amber-400/70">[ NÍVEL 02 · SOBERANIA BITCOIN ]</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.15, ease: APPLE_EASE }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[0.9] mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Blindagem<br /><span className="text-amber-400 italic">Operacional</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: APPLE_EASE }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl leading-8 mt-3">
              A transição da teoria para a posse real do capital. Se você não tem as chaves, as moedas não são suas.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.2 }} className="flex items-center gap-2 mt-8">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><ChevronDown size={14} className="text-muted-foreground" /></motion.div>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground/60">Role para explorar</span>
            </motion.div>
          </motion.div>
        </section>

        {/* ── SnippetBait ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <SnippetBait
            text="O Real perdeu 87% do seu poder de compra desde o Plano Real. Quem entendeu isso, migrou para um ativo com oferta fixa e sem fronteiras. Quem não entendeu, continua financiando o próprio empobrecimento."
            cta="Conheça a autocustódia de elite →"
            href="/autocustodia"
          />
        </div>

        {/* ══════ AUTOCUSTÓDIA — Image Left / Text Right ══════ */}
        <section id="autocustodia" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden border border-border/50 aspect-[4/5] lg:aspect-auto lg:min-h-[520px]">
              <img src={seedImg} alt="Placa metálica de backup de seed phrase com hardware wallet" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[9px] tracking-[0.3em] text-amber-400/80">SEED PHRASE · BACKUP METÁLICO</span>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-amber-500/60 mb-6 block">[ AUTOCUSTÓDIA ]</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.3] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Not Your Keys, <span className="text-amber-400">Not Your Coins</span>
              </h2>
              <div className="space-y-5 text-muted-foreground text-base leading-8 mb-6">
                <p>Se as suas moedas estão em uma corretora, você não possui Bitcoin. Você possui uma <strong className="text-foreground">promessa de pagamento</strong> que pode ser bloqueada a qualquer momento.</p>
                <p>A autocustódia é o ato de manter suas chaves privadas sob seu controle exclusivo. Sem intermediários. Sem pedidos de permissão. Sem risco de contraparte.</p>
              </div>
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <Key className="w-5 h-5 text-amber-400" />
                <p className="font-mono text-sm text-amber-400 font-bold tracking-wider">"NOT YOUR KEYS, NOT YOUR COINS"</p>
              </div>
              <SimboloOculto id="semente" className="ml-2 mt-4 align-middle" />
            </div>
          </div>
        </section>

        {/* ══════ HARDWARE WALLETS — Text Left / Image Right ══════ */}
        <section id="semente" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Text + Cards */}
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-amber-500/60 mb-6 block">[ HARDWARE WALLETS ]</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.3] mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Arsenal de <span className="text-amber-400">Autocustódia</span>
              </h2>
              <div className="space-y-4">
                {wallets.map((w, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }} whileHover={{ y: -3 }}
                    className="p-5 rounded-xl bg-card/60 border border-border/50 group hover:border-amber-500/20 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-sm group-hover:text-amber-400 transition-colors">{w.name}</h3>
                        <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">{w.type}</p>
                      </div>
                      <span className="font-mono text-xs text-amber-400 font-bold">{w.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3"><span className="text-foreground font-medium">Segurança:</span> {w.security}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {w.pros.map((p, j) => (
                        <span key={j} className="text-[9px] font-mono px-2 py-0.5 rounded bg-card border border-border/50 text-muted-foreground">{p}</span>
                      ))}
                    </div>
                    <a href={w.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-amber-400 hover:underline font-mono">
                      <ExternalLink className="w-3 h-3" /> Site oficial
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative rounded-xl overflow-hidden border border-border/50 aspect-[4/5] lg:aspect-auto lg:min-h-[680px] lg:sticky lg:top-24">
              <img src={hwWalletsImg} alt="Hardware wallet conectada a laptop em ambiente escuro" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[9px] tracking-[0.3em] text-amber-400/80">HARDWARE WALLET · SECURE ELEMENT</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ NODE SOBERANO — Image Left / Text Right ══════ */}
        <section id="node" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden border border-border/50 aspect-[4/5] lg:aspect-auto lg:min-h-[520px] order-2 lg:order-1">
              <img src={nodeImg} alt="Raspberry Pi rodando node Bitcoin com LEDs verdes" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[9px] tracking-[0.3em] text-green-400/80">NODE SOBERANO · DON'T TRUST, VERIFY</span>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-amber-500/60 mb-6 block">[ INFRAESTRUTURA SOBERANA ]</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.3] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Don't Trust, <span className="text-amber-400">Verify</span>
              </h2>
              <p className="text-muted-foreground text-base leading-8 mb-8">
                Um node Bitcoin é a sua própria cópia da blockchain. Quando você roda um, você <strong className="text-foreground">não precisa confiar em ninguém</strong> para saber se uma transação é legítima.
              </p>
              <div className="space-y-4">
                {nodeSteps.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full border-2 border-amber-500/40 flex items-center justify-center bg-background flex-shrink-0 group-hover:border-amber-400 transition-colors">
                      <span className="font-mono text-xs font-bold text-amber-400">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 group-hover:text-amber-400 transition-colors">{step.title}</h4>
                      <p className="text-sm text-muted-foreground leading-7">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════ BTC vs IMÓVEL — Text Left / Chart + Image Right ══════ */}
        <section id="btc-vs-imovel" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Text + Simulator */}
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-amber-500/60 mb-6 block">[ SIMULADOR INTEGRADO ]</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.3] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Bitcoin vs Imóveis: <span className="text-amber-400">10 Anos</span>
              </h2>
              <p className="text-muted-foreground text-base leading-8 mb-8">
                <span className="text-amber-400 font-bold">R$ 100 em Bitcoin em 2014 valeriam ~R$ 32.000 hoje.</span>{" "}
                O mesmo valor em imóvel estaria em R$ 118, mal acompanhando a inflação.
              </p>

              {/* Chart */}
              <div className="bg-card/60 border border-border/50 rounded-xl p-6 mb-6">
                <h3 className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground mb-4">PODER DE COMPRA INDEXADO (BASE 100 EM 2014)</h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "monospace" }} axisLine={{ stroke: "hsl(var(--border))" }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "monospace" }} axisLine={{ stroke: "hsl(var(--border))" }} scale="log" domain={[50, 50000]} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontFamily: "monospace", fontSize: "11px" }}
                        formatter={(value: number, name: string) => [`${value.toLocaleString("pt-BR")}x`, name === "btc" ? "Bitcoin" : "Imóvel"]} />
                      <Legend formatter={(v) => (v === "btc" ? "Bitcoin" : "Imóvel")} wrapperStyle={{ fontFamily: "monospace", fontSize: "10px" }} />
                      <Line type="monotone" dataKey="btc" stroke="hsl(40, 92%, 56%)" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="imovel" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Simulator */}
              <div className="bg-card/60 border border-border/50 rounded-xl p-6">
                <h3 className="font-bold text-base mb-1">Simulador: Vender ou Manter?</h3>
                <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground mb-5">COMPARE 3 ESTRATÉGIAS EM 3 ANOS</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-xs text-muted-foreground font-mono block mb-2">VALOR DO IMÓVEL (R$)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">R$</span>
                      <input type="number" value={propertyValue} onChange={(e) => { setPropertyValue(Number(e.target.value)); setShowSimResult(false); }}
                        className="w-full bg-background border border-border/50 rounded-lg pl-10 pr-4 py-3 text-lg font-mono text-foreground focus:border-amber-400/50 focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-mono block mb-2">ALUGUEL MENSAL (R$)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">R$</span>
                      <input type="number" value={rentValue} onChange={(e) => { setRentValue(Number(e.target.value)); setShowSimResult(false); }}
                        className="w-full bg-background border border-border/50 rounded-lg pl-10 pr-4 py-3 text-lg font-mono text-foreground focus:border-amber-400/50 focus:outline-none transition-colors" />
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowSimResult(true)} disabled={propertyValue <= 0}
                  className="w-full py-3.5 rounded-lg bg-amber-500 text-background font-bold text-sm disabled:opacity-40 mb-5">Calcular Cenários</button>

                {showSimResult && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-background text-[9px] font-bold font-mono rounded-bl-xl">MAIOR RETORNO</div>
                      <div className="flex items-center gap-3 mb-2"><BtcIcon className="w-5 h-5 text-amber-400" /><h3 className="font-bold text-sm">Vender Imóvel & Comprar Bitcoin</h3></div>
                      <p className="text-2xl font-bold font-mono text-amber-400">{formatCurrency(scenarioSellBuy)}</p>
                      <p className="text-xs font-mono mt-1 text-emerald-400">+{((scenarioSellBuy - propertyValue) / propertyValue * 100).toFixed(0)}% em 3 anos</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border/50 bg-card/60">
                      <div className="flex items-center gap-3 mb-2"><TrendingUp className="w-5 h-5 text-amber-400" /><h3 className="font-bold text-sm">Alugar & Investir em Bitcoin (DCA)</h3></div>
                      <p className="text-xl font-bold font-mono text-foreground">{formatCurrency(scenarioRentInvest)}</p>
                      <p className="text-xs text-muted-foreground mt-1">Patrimônio preservado + renda potencializada</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border/50 bg-card/30 opacity-70">
                      <div className="flex items-center gap-3 mb-2"><Home className="w-5 h-5 text-muted-foreground" /><h3 className="font-bold text-sm">Manter Imóvel</h3></div>
                      <p className="text-xl font-bold font-mono text-muted-foreground">{formatCurrency(scenarioKeep)}</p>
                      <p className="text-xs text-muted-foreground mt-1">Apenas valorização imobiliária (+{(REAL_ESTATE_APPRECIATION * 100).toFixed(0)}%)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 flex gap-3 items-start">
                      <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">Nota:</strong> Baseado na média histórica de 3 anos. Bitcoin é volátil no curto prazo, mas tende a valorizar exponencialmente frente a ativos físicos.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="relative rounded-xl overflow-hidden border border-border/50 aspect-[4/5] lg:aspect-auto lg:min-h-[600px] lg:sticky lg:top-24">
              <img src={chartImg} alt="Terminal financeiro exibindo gráfico de valorização" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[9px] tracking-[0.3em] text-amber-400/80">PERFORMANCE · BTC vs ATIVOS TRADICIONAIS</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-amber-500/60 mb-6 block">[ PERGUNTAS FREQUENTES ]</span>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="rounded-xl border border-border/50 bg-card/60 overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="text-sm font-semibold text-foreground pr-4">{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-7">{item.a}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground mb-6">PRÓXIMO NÍVEL: INDEPENDÊNCIA OPERACIONAL</p>
            <Link to="/saida" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-amber-500 text-background font-bold text-sm hover:opacity-90 transition-opacity">
              Avançar para Nível 03 <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-border/30 to-transparent mt-10" />
            <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground/50 mt-4">SISTEMA OPERACIONAL DE SOBERANIA</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Bitcoin;
