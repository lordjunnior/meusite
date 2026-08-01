import PageFloatingToc from "@/components/PageFloatingToc";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft, Shield, AlertTriangle, ArrowRight, DollarSign, Wallet,
  Lock, CheckCircle, ChevronDown, ExternalLink, Smartphone,
  Eye, ShieldCheck, Bluetooth, Key, Banknote, Globe, Layers
} from "lucide-react";
import ScrollProgressBar from "@/components/confisco/ScrollProgressBar";
import ScrollToTop from "@/components/ScrollToTop";
import SnippetBait from "@/components/SnippetBait";
import RiskBlock from "@/components/RiskBlock";
import ShareButtons from "@/components/ShareButtons";
import ReadingTime from "@/components/ReadingTime";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import SovereignDisclaimer from "@/components/SovereignDisclaimer";
import FixedThematicBackground from "@/components/backgrounds/FixedThematicBackground";
import bgDolarVirtual from "@/assets/backgrounds/bg-dolar-virtual.jpg";

import heroImg from "@/assets/dolar-virtual-hero.jpg";
import stablecoinImg from "@/assets/dolar-virtual-stablecoin.jpg";
import carteiraImg from "@/assets/dolar-virtual-carteira.jpg";
import seedImg from "@/assets/dolar-virtual-seed.jpg";
import alfredImg from "@/assets/dolar-virtual-alfred.jpg";
import segurancaImg from "@/assets/dolar-virtual-seguranca.jpg";
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const chapters = [
  { id: "o-que-sao", title: "O Que São Stablecoins?" },
  { id: "regulamentacao", title: "Regulamentação e Lastro" },
  { id: "por-que-usar", title: "Por Que Usar USDT?" },
  { id: "jade-wallet", title: "Jade Wallet — Setup Completo" },
  { id: "comprando-usdt", title: "Comprando USDT via AlfredP2P" },
  { id: "seguranca", title: "Segurança e Camadas de Proteção" },
  { id: "faq", title: "Perguntas Frequentes" },
];

/* ── JSON-LD Schemas ── */
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como Comprar Dólar Virtual (USDT) com Jade Wallet e AlfredP2P",
  description: "Guia completo para comprar USDT (stablecoins) de forma prática usando a Jade hardware wallet e a plataforma AlfredP2P. Inclui setup da carteira, compra via Liquid Network e segurança.",
  totalTime: "PT45M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "BRL", value: "100" },
  tool: [
    { "@type": "HowToTool", name: "Jade Hardware Wallet" },
    { "@type": "HowToTool", name: "Blockstream Green App" },
    { "@type": "HowToTool", name: "AlfredP2P" },
  ],
  step: [
    { "@type": "HowToStep", name: "Configurar a Jade Wallet", text: "Conecte a Jade via USB em um carregador, baixe o app Blockstream Green e emparelhe via Bluetooth" },
    { "@type": "HowToStep", name: "Criar carteira e anotar seed", text: "Crie uma nova carteira, anote as 12 palavras de recuperação no papel e confirme cada palavra" },
    { "@type": "HowToStep", name: "Criar PIN de proteção", text: "Defina um PIN único que servirá como 13ª palavra e barreira de acesso à carteira" },
    { "@type": "HowToStep", name: "Comprar USDT no AlfredP2P", text: "Acesse alfredp2p.io, selecione USDT na rede Liquid, cole seu endereço da carteira e pague via PIX" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é uma stablecoin como USDT?",
      acceptedAnswer: { "@type": "Answer", text: "USDT (Tether) é uma criptomoeda atrelada ao dólar americano na proporção de 1:1. Cada USDT emitido deve ter lastro equivalente em reservas da empresa. Isso garante estabilidade de valor, diferente de criptomoedas voláteis como Bitcoin." },
    },
    {
      "@type": "Question",
      name: "Preciso de corretora para comprar USDT?",
      acceptedAnswer: { "@type": "Answer", text: "Não. Plataformas P2P como AlfredP2P permitem comprar USDT diretamente, sem vincular documentos a corretoras. Você negocia diretamente com outros usuários." },
    },
    {
      "@type": "Question",
      name: "O que é a rede Liquid e por que usá-la?",
      acceptedAnswer: { "@type": "Answer", text: "Liquid é uma rede sidechain do Bitcoin desenvolvida pela Blockstream. Ela oferece transações mais rápidas, taxas menores e privacidade aprimorada através de transações confidenciais, ideal para movimentar USDT." },
    },
    {
      "@type": "Question",
      name: "A Jade Wallet é segura?",
      acceptedAnswer: { "@type": "Answer", text: "Sim. A Jade é uma hardware wallet open-source da Blockstream. As chaves privadas nunca saem do dispositivo. Mesmo que alguém tenha acesso ao seu celular, precisa da Jade física + PIN para autorizar qualquer transação." },
    },
    {
      "@type": "Question",
      name: "Comprar USDT via PIX é anônimo?",
      acceptedAnswer: { "@type": "Answer", text: "Não. O PIX está vinculado ao seu CPF e é rastreável pelo Banco Central. A compra via PIX não oferece anonimato real. Para privacidade, seria necessário usar métodos como dinheiro físico em transações presenciais." },
    },
    {
      "@type": "Question",
      name: "Por que as taxas são altas em plataformas P2P?",
      acceptedAnswer: { "@type": "Answer", text: "A privacidade e a ausência de KYC têm um custo. Plataformas P2P cobram spreads maiores porque operam fora do sistema centralizado. É o preço da soberania sobre seus próprios recursos." },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://lordjunnior.com.br" },
    { "@type": "ListItem", position: 2, name: "Bitcoin", item: "https://lordjunnior.com.br/bitcoin" },
    { "@type": "ListItem", position: 3, name: "Dólar Virtual (USDT)", item: "https://lordjunnior.com.br/dolar-virtual" },
  ],
};

/* ── Chapter Block Component — Alternating 50/50 Grid ── */
const ChapterBlock = ({
  id, phase, title, icon: Icon, image, imageAlt, children, index,
}: {
  id: string; phase: string; title: string; icon: React.ElementType;
  image: string; imageAlt: string; children: React.ReactNode; index: number;
}) => {
  const ref = useRef(null);
  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative rounded-2xl border border-border/30 bg-card/40 backdrop-blur-sm overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* IMAGE — alternates left/right based on index */}
        <div className={`relative min-h-[280px] lg:min-h-[400px] ${isEven ? 'order-1 lg:order-none' : 'order-1 lg:order-2'}`}>
          <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className={`absolute inset-0 hidden lg:block ${isEven
            ? 'bg-gradient-to-l from-card/90 via-card/40 to-transparent'
            : 'bg-gradient-to-r from-card/90 via-card/40 to-transparent'
          }`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/80 lg:hidden" />
          <motion.div custom={0} variants={fadeUp} className="absolute top-5 left-5 z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 backdrop-blur-md border border-primary/30 text-primary font-mono text-[9px] tracking-[0.3em] uppercase font-bold">
              <Icon className="w-3.5 h-3.5" />
              {phase}
            </span>
          </motion.div>
        </div>

        {/* TEXT — generous padding, elite typography */}
        <div className={`relative p-8 md:p-10 lg:p-14 flex flex-col justify-center ${isEven ? '' : 'order-none lg:order-1'}`}>
          <motion.h3 custom={1} variants={fadeUp}
            className="text-2xl md:text-3xl lg:text-[2.2rem] font-bold tracking-tight leading-[1.3] text-foreground mb-6 uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {title}
          </motion.h3>
          <motion.div custom={2} variants={fadeUp} className="space-y-4 text-muted-foreground text-base leading-8">
            {children}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-10" />
    </motion.section>
  );
};

/* ── Expandable Step ── */
const MacroStep = ({
  number, title, summary, icon: Icon, children, defaultOpen = false,
}: {
  number: number; title: string; summary: string; icon: React.ElementType;
  children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div
      custom={number}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group relative rounded-sm border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary/60 transition-all" />
      <button onClick={() => setOpen(!open)} className="w-full text-left p-6 flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <span className="text-primary font-bold text-lg">{number}</span>
          </div>
          <Icon className="absolute -bottom-1 -right-1 w-5 h-5 text-primary/60 bg-background rounded-full p-0.5" />
        </div>
        <div className="flex-1">
          <h4 className="text-foreground font-semibold mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: APPLE_EASE }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 space-y-4 border-t border-border/20 pt-4">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── FAQ Item ── */
const FaqItem = ({ q, a }: { q: string; a: string }) => (
  <motion.details
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group border border-border/30 rounded-sm bg-card/40 backdrop-blur-sm"
  >
    <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-card/60 transition-colors">
      <span className="text-foreground font-medium text-sm pr-4">{q}</span>
      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
    </summary>
    <div className="px-5 pb-5">
      <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
    </div>
  </motion.details>
);

/* ══════════════════════ MAIN PAGE ══════════════════════ */

const TOC_ITEMS = [
  { id: "o-que-sao", label: "Stablecoins" },
  { id: "regulamentacao", label: "Regulamentação" },
  { id: "por-que-usar", label: "Por Que USDT?" },
  { id: "jade-wallet", label: "Jade Wallet" },
  { id: "comprando-usdt", label: "Comprando USDT" },
  { id: "seguranca", label: "Segurança" },
  { id: "faq", label: "FAQ" },
];

export default function DolarVirtual() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const FULL_TEXT = `Stablecoins são criptomoedas atreladas ao valor de moedas tradicionais como o dólar americano. Diferente do Bitcoin que oscila, o USDT mantém paridade 1:1 com o dólar. Neste guia você aprende o conceito, configura uma Jade hardware wallet, compra USDT via AlfredP2P na rede Liquid e entende as camadas de segurança envolvidas. Este conteúdo foi criado a pedido de seguidores no Instagram que querem uma porta de entrada no ecossistema cripto sem enfrentar a volatilidade. Importante: o método de pagamento via PIX não oferece anonimato real pois está vinculado ao seu CPF.`;

  return (
    <div className="min-h-screen text-foreground pt-[62px]">
      <FixedThematicBackground image={bgDolarVirtual} intensity="medium" />
      <Helmet>
        <title>Como Comprar Dólar Virtual (USDT) | Jade Wallet + AlfredP2P</title>
        <meta name="description" content="Guia prático para comprar USDT (stablecoin dólar) com Jade hardware wallet e AlfredP2P. Setup completo, rede Liquid e segurança. Sem corretora, sem KYC." />
        <link rel="canonical" href="https://lordjunnior.com.br/dolar-virtual" />
        <meta property="og:title" content="Como Comprar Dólar Virtual (USDT) — Jade + AlfredP2P" />
        <meta property="og:description" content="Seu real está derretendo. Aprenda a converter para dólar digital (USDT) com hardware wallet e sem corretora." />
        <meta property="og:url" content="https://lordjunnior.com.br/dolar-virtual" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="emerald" />

      <ScrollProgressBar />
      <ScrollToTop />
      <AppSidebar />
      <MobileNav />
      <RightSidebar />

      <div className="relative z-10 lg:ml-[280px] 2xl:mr-[340px]">
        {/* ── HERO ── */}
        <div ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img src={heroImg} alt="Jade hardware wallet para stablecoins USDT" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
          </motion.div>

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-10 md:pb-16 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: APPLE_EASE }}>
              <Link to="/bitcoin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-xs font-mono tracking-wider mb-4 transition-colors">
                <ArrowLeft className="w-3 h-3" /> BITCOIN
              </Link>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-mono text-[10px] tracking-[0.3em] text-primary/80 uppercase mb-3">
              [GUIA PRÁTICO — STABLECOINS]
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: APPLE_EASE }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.05] uppercase"
              style={{ fontFamily: "'Bebas Neue', 'Poppins', sans-serif" }}
            >
              COMO COMPRAR<br />
              <span className="text-primary">DÓLAR VIRTUAL</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-muted-foreground text-sm md:text-base mt-4 max-w-xl leading-relaxed">
              Jade Wallet + AlfredP2P + Rede Liquid. O manual que transforma reais em dólares digitais com hardware wallet — sem corretora, sem KYC.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 flex items-center gap-4">
              <ReadingTime minutes={14} />
              <ShareButtons title="Como Comprar Dólar Virtual (USDT)" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── FLOATING TOC (Desktop) ── */}
        <nav className="hidden xl:block 2xl:hidden fixed right-8 top-1/2 -translate-y-1/2 z-40 space-y-2 max-w-[200px]">
          {chapters.map((ch) => (
            <a key={ch.id} href={`#${ch.id}`} className="block text-[10px] font-mono text-muted-foreground/60 hover:text-primary transition-colors truncate tracking-wider uppercase">
              {ch.title}
            </a>
          ))}
        </nav>

        {/* ── CONTENT ── */}
        <div className="px-5 md:px-10 lg:px-14 pb-20 space-y-12 md:space-y-16 max-w-7xl">

          {/* ── SNIPPET BAIT ── */}
          <SnippetBait
            text="Stablecoins são criptomoedas pareadas ao valor do dólar (1 USDT = 1 USD). Combinadas com uma hardware wallet como a Jade e uma plataforma P2P como AlfredP2P, permitem que você converta reais em dólares digitais — sem corretora, sem KYC, com autocustódia real."
            cta="Blindar meu patrimônio →"
            href="/autocustodia"
          />

          {/* ── ⚠️ ALERTA PIX — NÃO É ANÔNIMO ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
            className="relative overflow-hidden rounded-sm border-2 border-destructive/50 bg-destructive/[0.06] backdrop-blur-sm"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-destructive/80 to-transparent" />
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center border border-destructive/40 animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[9px] tracking-[0.3em] text-destructive uppercase mb-1 font-bold">[ALERTA DE TRANSPARÊNCIA]</p>
                  <h3 className="text-foreground font-bold text-lg uppercase mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    PIX NÃO É ANÔNIMO
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    O método demonstrado neste guia utiliza <span className="text-destructive font-semibold">PIX como forma de pagamento</span>, que está vinculado ao seu CPF e é <span className="text-destructive font-semibold">100% rastreável pelo Banco Central</span>. Não existe anonimato real ao usar PIX.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Este conteúdo foi criado <span className="text-foreground font-medium">a pedido de seguidores no Instagram</span> que querem uma porta de entrada prática no ecossistema cripto. O objetivo aqui é <span className="text-foreground font-medium">educação e estudo</span> — não uma rota de privacidade.
                  </p>
                  <p className="text-xs text-muted-foreground/70 italic">
                    Para aquisição com privacidade real, consulte nosso guia de <Link to="/comprar-bitcoin-com-privacidade" className="text-primary hover:underline font-medium">compra de Bitcoin via RoboSats + Tor</Link>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── SOVEREIGN DISCLAIMER ── */}
          <SovereignDisclaimer variant="payment" />

          {/* ═══ CAPÍTULO 1 — O QUE SÃO STABLECOINS ═══ */}
          <ChapterBlock
            id="o-que-sao"
            phase="Capítulo 01"
            title="O QUE SÃO STABLECOINS?"
            icon={DollarSign}
            image={stablecoinImg}
            imageAlt="Representação visual de stablecoins atreladas ao dólar americano"
            index={0}
          >
            <p>
              Imagine que você pode pegar uma nota de dólar e criar um equivalente digital — uma criptomoeda que <span className="text-foreground font-medium">sempre vale a mesma coisa</span> que o dólar no mundo físico.
            </p>
            <p>
              Isso são as <span className="text-primary font-semibold">stablecoins</span>. No caso do USDT (Tether), cada unidade é pareada 1:1 com o dólar americano. Diferente do Bitcoin, que oscila, o USDT mantém estabilidade — ideal para quem quer <span className="text-foreground font-medium">entrar no ecossistema cripto sem enfrentar a volatilidade</span>.
            </p>
            <p>
              É a porta de entrada perfeita: você mantém os benefícios do mundo cripto (carteira própria, transações sem intermediários, pseudo-anonimato) com a estabilidade de uma moeda que você já conhece.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: DollarSign, title: "Paridade 1:1", desc: "1 USDT = 1 dólar americano, sempre." },
                { icon: Layers, title: "Ecossistema Cripto", desc: "Todos os benefícios da blockchain sem a volatilidade." },
                { icon: Globe, title: "Sem Fronteiras", desc: "Envie dólares digitais para qualquer lugar do mundo." },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-sm border border-border/30 bg-card/40">
                  <item.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-foreground text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </ChapterBlock>

          {/* ═══ CAPÍTULO 2 — REGULAMENTAÇÃO ═══ */}
          <ChapterBlock
            id="regulamentacao"
            phase="Capítulo 02"
            title="REGULAMENTAÇÃO E LASTRO"
            icon={ShieldCheck}
            image={segurancaImg}
            imageAlt="Escudo de proteção financeira e regulamentação de stablecoins"
            index={1}
          >
            <p>
              Para uma stablecoin operar de forma legítima, a empresa emissora precisa cumprir demandas regulatórias rigorosas. No caso da Tether (USDT), dois marcos legislativos mudaram o jogo:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-5 rounded-sm border border-primary/20 bg-primary/[0.04]">
                <p className="text-primary font-mono text-[10px] tracking-wider mb-1">ESTADOS UNIDOS</p>
                <p className="text-foreground font-bold text-sm">GENIUS Act</p>
                <p className="text-xs text-muted-foreground mt-2">Classifica transações com stablecoins como <span className="text-foreground font-medium">transações comerciais</span>, não como investimentos. Isso abriu a porteira para uso ágil em diferentes áreas do mercado.</p>
              </div>
              <div className="p-5 rounded-sm border border-primary/20 bg-primary/[0.04]">
                <p className="text-primary font-mono text-[10px] tracking-wider mb-1">EUROPA</p>
                <p className="text-foreground font-bold text-sm">MiCA Regulation</p>
                <p className="text-xs text-muted-foreground mt-2">Exige reserva 1:1, auditabilidade completa e proteção ao consumidor. Empresas emissoras devem provar que possuem os ativos para lastrear cada token emitido.</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-sm border border-border/30 bg-card/40">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">Reserva 1:1:</span> Se a Tether emite 10 bilhões de USDT, ela precisa ter 10 bilhões de dólares em reservas auditáveis. Isso é o que garante a paridade e a confiança no mercado.
              </p>
            </div>
          </ChapterBlock>

          {/* ═══ CAPÍTULO 3 — POR QUE USAR ═══ */}
          <ChapterBlock
            id="por-que-usar"
            phase="Capítulo 03"
            title="POR QUE USAR USDT EM VEZ DA MOEDA ORIGINAL?"
            icon={Wallet}
            image={carteiraImg}
            imageAlt="Smartphone com carteira digital mostrando saldo USDT"
            index={2}
          >
            <p>
              A pergunta óbvia: por que não simplesmente transferir dólares de banco para banco? A resposta está nos benefícios do ecossistema cripto:
            </p>
            <ul className="space-y-3 mt-4">
              {[
                "Sua própria carteira — sem banco, sem corretora, sem intermediário",
                "Transações sem ninguém no meio do caminho controlando ou bloqueando",
                "Pseudo-anonimato: a blockchain registra que 'carteira X enviou para carteira Y', mas ninguém sabe de quem são essas carteiras",
                "Velocidade: transações na rede Liquid são quase instantâneas",
                "Sem fronteiras: envie dólares digitais para qualquer pessoa no mundo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-sm border border-destructive/30 bg-destructive/[0.04]">
              <p className="text-sm">
                <AlertTriangle className="w-4 h-4 text-destructive inline mr-2" />
                <span className="text-foreground font-semibold">Não use corretoras.</span> Correlacionar seus documentos com compras de criptomoedas em corretoras centralizadas é a pior decisão que você pode tomar nos tempos atuais. Você não precisa disso.
              </p>
            </div>
          </ChapterBlock>

          {/* ═══ CAPÍTULO 4 — JADE WALLET SETUP ═══ */}
          <ChapterBlock
            id="jade-wallet"
            phase="Capítulo 04"
            title="JADE WALLET — SETUP COMPLETO"
            icon={Lock}
            image={seedImg}
            imageAlt="Anotação de seed phrase em papel para backup da carteira Jade"
            index={3}
          >
            <p>
              A <span className="text-primary font-semibold">Jade</span> é uma hardware wallet da Blockstream — pequena, open-source e altamente recomendada. Ela funciona como uma <span className="text-foreground font-medium">validadora de transações</span>: você pode receber USDT na sua carteira, mas para enviar qualquer valor, precisa obrigatoriamente da Jade física + PIN.
            </p>

            <div className="space-y-4 mt-6">
              <MacroStep
                number={1}
                title="Conectar a Jade"
                summary="Ligue via USB em um carregador de celular — nunca em um computador"
                icon={Smartphone}
                defaultOpen
              >
                <p className="text-sm text-muted-foreground">
                  Conecte o cabo USB diretamente em um <span className="text-foreground font-medium">carregador de tomada</span>. Não coloque a Jade em contato com computadores ou dispositivos com dados. Em seguida, baixe o aplicativo <span className="text-primary font-semibold">Blockstream Green</span> no celular.
                </p>
              </MacroStep>

              <MacroStep
                number={2}
                title="Emparelhar via Bluetooth"
                summary="Ative o Bluetooth na Jade e conecte ao app Blockstream Green"
                icon={Bluetooth}
              >
                <p className="text-sm text-muted-foreground">
                  Na Jade, vá em <span className="text-foreground font-medium">Settings → Bluetooth → Enabled</span>. No app, toque em "Connect Jade". O sistema encontrará o dispositivo automaticamente. Confirme o código de emparelhamento nos dois dispositivos.
                </p>
              </MacroStep>

              <MacroStep
                number={3}
                title="Criar carteira e anotar seed"
                summary="12 palavras que são a chave da sua soberania — anote no papel"
                icon={Key}
              >
                <p className="text-sm text-muted-foreground">
                  Selecione "Criar nova carteira". A Jade gerará <span className="text-foreground font-medium">12 palavras de recuperação</span>. Anote-as <span className="text-destructive font-semibold">à mão</span> no recovery sheet que acompanha a caixa.
                </p>
                <div className="p-3 rounded-sm border border-destructive/30 bg-destructive/[0.04] mt-2">
                  <p className="text-xs text-muted-foreground">
                    <AlertTriangle className="w-3 h-3 text-destructive inline mr-1" />
                    <strong className="text-foreground">Nunca</strong> tire foto, nunca salve no computador, nunca envie por mensagem. Papel e caneta. Ponto.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  A Jade pedirá para confirmar palavras aleatórias (ex: "Confirme a palavra 3"). Isso garante que você anotou corretamente.
                </p>
              </MacroStep>

              <MacroStep
                number={4}
                title="Definir PIN de segurança"
                summary="Funciona como uma 13ª palavra — a barreira final de acesso"
                icon={Shield}
              >
                <p className="text-sm text-muted-foreground">
                  Crie um PIN único de 6 dígitos. Este PIN serve tanto como <span className="text-foreground font-medium">senha de acesso rápido</span> à carteira no app quanto como uma <span className="text-foreground font-medium">camada extra de proteção</span>. Mesmo que alguém pegue sua Jade, sem o PIN não faz nada.
                </p>
              </MacroStep>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://dseclab.io/br/products/jade-wallet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 py-4 px-6 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.18] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
              >
                <Shield className="w-5 h-5" />
                ADQUIRIR MINHA JADE
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </ChapterBlock>

          {/* ═══ CAPÍTULO 5 — COMPRANDO USDT ═══ */}
          <ChapterBlock
            id="comprando-usdt"
            phase="Capítulo 05"
            title="COMPRANDO USDT VIA ALFREDP2P"
            icon={Banknote}
            image={alfredImg}
            imageAlt="Plataforma AlfredP2P para compra de USDT peer-to-peer"
            index={4}
          >
            <p>
              Agora que a carteira está pronta, é hora de colocar dólares digitais nela. Usaremos o <span className="text-primary font-semibold">AlfredP2P</span> — uma plataforma peer-to-peer que permite comprar USDT sem vincular documentos.
            </p>

            <div className="space-y-4 mt-6">
              <MacroStep
                number={1}
                title="Acessar AlfredP2P"
                summary="Entre em alfredp2p.io e selecione 'Comprar'"
                icon={Globe}
                defaultOpen
              >
                <p className="text-sm text-muted-foreground">
                  Acesse <a href="https://www.alfredp2p.io/p2p" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">alfredp2p.io/p2p</a>. Selecione que deseja <span className="text-foreground font-medium">comprar USDT</span>, defina o valor em reais e selecione a <span className="text-primary font-semibold">rede Liquid</span> para transações mais rápidas e privadas.
                </p>
              </MacroStep>

              <MacroStep
                number={2}
                title="Copiar endereço Liquid da Jade"
                summary="Na carteira Blockstream Green, vá em Receive e copie o endereço"
                icon={Wallet}
              >
                <p className="text-sm text-muted-foreground">
                  No app Blockstream Green, toque em <span className="text-foreground font-medium">Receive → Tether USD (Liquid Network)</span>. Copie o endereço gerado. Cole-o no campo de endereço do AlfredP2P — se estiver correto, ficará verde.
                </p>
              </MacroStep>

              <MacroStep
                number={3}
                title="Pagar e aguardar"
                summary="Faça o pagamento via PIX e receba USDT na sua carteira"
                icon={Banknote}
              >
                <p className="text-sm text-muted-foreground">
                  O cadastro no AlfredP2P usa apenas <span className="text-foreground font-medium">usuário e senha</span> — sem dados sensíveis. Após gerar o QR Code do PIX, faça o pagamento. Em segundos, o USDT cairá na sua carteira Liquid na Jade.
                </p>
                <div className="p-3 rounded-sm border border-destructive/30 bg-destructive/[0.04] mt-2">
                  <p className="text-xs text-muted-foreground">
                    <Eye className="w-3 h-3 text-destructive inline mr-1" />
                    <strong className="text-foreground">Lembrete:</strong> O PIX está vinculado ao seu CPF. Este método <strong className="text-destructive">não é anônimo</strong>.
                  </p>
                </div>
              </MacroStep>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.alfredp2p.io/p2p"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 py-4 px-6 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.18] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
              >
                <DollarSign className="w-5 h-5" />
                COMPRAR USDT AGORA
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </ChapterBlock>

          {/* ═══ CAPÍTULO 6 — SEGURANÇA ═══ */}
          <ChapterBlock
            id="seguranca"
            phase="Capítulo 06"
            title="SEGURANÇA E CAMADAS DE PROTEÇÃO"
            icon={Shield}
            image={segurancaImg}
            imageAlt="Camadas de segurança para proteção de stablecoins USDT"
            index={5}
          >
            <p>
              A combinação <span className="text-primary font-semibold">Jade + Blockstream Green + Liquid</span> cria múltiplas camadas de segurança:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                { title: "Hardware Wallet", desc: "Chaves privadas nunca saem da Jade. Mesmo com acesso ao celular, ninguém move seus fundos sem o dispositivo físico.", icon: Lock },
                { title: "PIN de 6 Dígitos", desc: "Sem o PIN, a Jade é inútil. É a 13ª palavra da sua soberania — a barreira que separa curiosos dos seus recursos.", icon: Key },
                { title: "Seed Phrase (12 Palavras)", desc: "O backup universal. Com essas 12 palavras, você recupera sua carteira em qualquer dispositivo compatível, em qualquer lugar do mundo.", icon: Shield },
                { title: "Rede Liquid", desc: "Transações confidenciais por padrão. Valores transacionados são ocultados na blockchain, visíveis apenas para remetente e destinatário.", icon: Layers },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-sm border border-border/30 bg-card/40">
                  <item.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-foreground text-sm font-bold">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-sm border border-primary/20 bg-primary/[0.04]">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-foreground font-bold">Sobre as taxas:</span> Anonimato, privacidade e soberania custam. Se você quer taxas menores, pode usar fintechs com seus reais declarados. Mas quando você pretende assumir uma moeda que te deixa longe de entidades coercitivas — <span className="text-primary font-semibold">isso tem preço</span>. E vale cada centavo.
              </p>
            </div>
          </ChapterBlock>

          {/* ═══ RISK BLOCK ═══ */}
          <RiskBlock
            title="Sem esta base, o que acontece?"
            showImage
            consequences={[
              "Patrimônio 100% em reais, exposto à desvalorização contínua da moeda brasileira.",
              "Dependência total de bancos e fintechs que podem bloquear seu acesso a qualquer momento.",
              "Incapacidade de movimentar dólares digitais sem intermediários ou KYC invasivo.",
              "Risco de confisco direto — como já aconteceu em 1990 no Brasil.",
              "Zero experiência prática com ferramentas que podem definir sua sobrevivência financeira.",
            ]}
          />

          {/* ═══ FAQ ═══ */}
          <section id="faq" className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-black tracking-tight text-foreground uppercase mb-6"
              style={{ fontFamily: "'Bebas Neue', 'Poppins', sans-serif" }}
            >
              PERGUNTAS FREQUENTES
            </motion.h2>

            <FaqItem q="O que é uma stablecoin como USDT?" a="USDT (Tether) é uma criptomoeda atrelada ao dólar americano na proporção de 1:1. Cada USDT emitido deve ter lastro equivalente em reservas da empresa. Isso garante estabilidade de valor, diferente de criptomoedas voláteis como Bitcoin." />
            <FaqItem q="Preciso de corretora para comprar USDT?" a="Não. Plataformas P2P como AlfredP2P permitem comprar USDT diretamente, sem vincular documentos a corretoras. Você negocia com poucos dados e recebe direto na sua carteira." />
            <FaqItem q="O que é a rede Liquid e por que usá-la?" a="Liquid é uma rede sidechain do Bitcoin desenvolvida pela Blockstream. Ela oferece transações mais rápidas, taxas menores e privacidade aprimorada através de transações confidenciais — ideal para movimentar USDT." />
            <FaqItem q="A Jade Wallet é segura?" a="Sim. A Jade é open-source. Chaves privadas nunca saem do dispositivo. Mesmo com acesso ao celular, é preciso a Jade física + PIN para autorizar qualquer transação." />
            <FaqItem q="Comprar USDT via PIX é anônimo?" a="Não. O PIX está vinculado ao seu CPF e é rastreável pelo Banco Central. Para privacidade real, use métodos como dinheiro físico em transações presenciais ou consulte nosso guia de RoboSats + Tor." />
            <FaqItem q="Por que as taxas são altas em plataformas P2P?" a="Privacidade e ausência de KYC têm um custo. Plataformas P2P operam fora do sistema centralizado. É o preço da soberania sobre seus recursos — e vale cada centavo." />
          </section>

          {/* ── CLOSING CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="relative overflow-hidden rounded-sm border border-primary/30 bg-primary/[0.04] p-8 md:p-10 text-center"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground uppercase mb-4" style={{ fontFamily: "'Bebas Neue', 'Poppins', sans-serif" }}>
              NENHUMA SOLUÇÃO FÁCIL ENTREGA SOBERANIA
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed mb-6">
              O caminho é mais tortuoso, mais difícil. Mas é seu. Comece com R$10, com R$50 — o valor não importa. O que importa é dominar a ferramenta antes que você precise dela de verdade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://dseclab.io/br/products/jade-wallet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-sm bg-primary text-primary-foreground font-bold tracking-wide text-sm hover:bg-primary/90 transition-all duration-300"
              >
                <Shield className="w-5 h-5" />
                BLINDAR MEU PATRIMÔNIO
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                to="/autocustodia"
                className="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-sm border border-border/50 bg-card/50 text-foreground font-semibold tracking-wide text-sm hover:border-primary/40 transition-all duration-300"
              >
                APRENDER AUTOCUSTÓDIA
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* ── Share ── */}
          <div className="flex justify-center pt-4">
            <ShareButtons title="Como Comprar Dólar Virtual (USDT)" />
          </div>
        </div>
      </div>
    </div>
  );
}
