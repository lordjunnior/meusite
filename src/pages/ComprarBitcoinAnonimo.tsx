import PageFloatingToc from "@/components/PageFloatingToc";
import { motion, useScroll, useTransform } from "framer-motion";
import DonationCTA from "@/components/DonationCTA";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft, Shield, Eye, EyeOff, Zap, Download, Globe, Lock, UserX,
  CheckCircle, AlertTriangle, MessageSquare, ArrowRight, Bot, Wallet,
  ShieldCheck, Clock, Handshake, FileCheck, Smartphone, ExternalLink,
  ChevronDown, Award
} from "lucide-react";
import ScrollProgressBar from "@/components/confisco/ScrollProgressBar";

import ScrollToTop from "@/components/ScrollToTop";
import SnippetBait from "@/components/SnippetBait";
import RiskBlock from "@/components/RiskBlock";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import FixedThematicBackground from "@/components/backgrounds/FixedThematicBackground";
import bgComprarAnonimo from "@/assets/backgrounds/bg-comprar-anonimo.webp";

import heroImg from "@/assets/robosats-hero.webp";
import anonimatoImg from "@/assets/robosats-anonimato.webp";
import prerequisitosImg from "@/assets/robosats-prerequisitos.webp";
import p2pImg from "@/assets/robosats-p2p.webp";
import plataformaImg from "@/assets/robosats-plataforma.webp";
import escrowImg from "@/assets/robosats-escrow.webp";
import segurancaImg from "@/assets/robosats-seguranca.webp";
import infograficoImg from "@/assets/robosats-infografico.webp";
import sucessoImg from "@/assets/robosats-sucesso.webp";
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
  { id: "por-que", title: "Por Que Mais Privacidade?" },
  { id: "o-que-e-robosats", title: "O Que é a RoboSats?" },
  { id: "pre-requisitos", title: "Pré-Requisitos (2 Itens)" },
  { id: "passo-a-passo", title: "Tutorial: 4 Macro Passos" },
  { id: "escrow", title: "Segurança: O Escrow" },
  { id: "cuidados", title: "Cuidados e Riscos" },
  { id: "faq", title: "Perguntas Frequentes" },
];

/* ── JSON-LD Schemas ── */
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Seu Primeiro Contato com Bitcoin na Prática por R$10 via RoboSats",
  description: "Guia prático passo a passo para comprar Bitcoin usando RoboSats via Tor Browser e Lightning Network. Para iniciantes absolutos. Transparência total sobre privacidade.",
  totalTime: "PT30M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "BRL", value: "10" },
  tool: [
    { "@type": "HowToTool", name: "Tor Browser" },
    { "@type": "HowToTool", name: "Carteira Lightning (Wallet of Satoshi, Blixt ou Zeus)" },
  ],
  step: [
    { "@type": "HowToStep", name: "Preparar ferramentas", text: "Instale o Tor Browser do site oficial torproject.org e baixe a Wallet of Satoshi no seu celular" },
    { "@type": "HowToStep", name: "Acessar a RoboSats e criar identidade", text: "Abra o Tor Browser, acesse o endereço .onion da RoboSats e clique em Generate Robot para criar sua identidade temporária" },
    { "@type": "HowToStep", name: "Encontrar oferta e depositar fiança", text: "No livro de ofertas filtre por BRL, escolha um vendedor com boa reputação, aceite a ordem e deposite a fiança via Lightning" },
    { "@type": "HowToStep", name: "Pagar e receber seus satoshis", text: "Envie o pagamento ao vendedor pelo método combinado, confirme no chat e receba seus satoshis automaticamente via Lightning" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "É ilegal comprar Bitcoin sem documentos no Brasil?",
      acceptedAnswer: { "@type": "Answer", text: "Não. Não existe lei no Brasil que obrigue a apresentação de documentos para comprar Bitcoin. A obrigação de KYC recai sobre as exchanges centralizadas, não sobre transações peer-to-peer entre indivíduos." },
    },
    {
      "@type": "Question",
      name: "Quanto custa para comprar Bitcoin na RoboSats?",
      acceptedAnswer: { "@type": "Answer", text: "Você pode comprar a partir de valores tão baixos quanto R$10. A RoboSats cobra uma taxa de aproximadamente 0,2% sobre cada transação, significativamente menor que exchanges tradicionais." },
    },
    {
      "@type": "Question",
      name: "O que é a Lightning Network?",
      acceptedAnswer: { "@type": "Answer", text: "A Lightning Network é uma camada construída sobre o Bitcoin que permite transações instantâneas e com taxas muito baixas. É como uma 'via expressa' para pagamentos rápidos em Bitcoin, ideal para valores menores." },
    },
    {
      "@type": "Question",
      name: "O que acontece se o vendedor não enviar os bitcoins?",
      acceptedAnswer: { "@type": "Answer", text: "A RoboSats utiliza um sistema de escrow (garantia). Os bitcoins do vendedor ficam travados em um contrato inteligente. Se ele não cumprir, perde a fiança e o comprador é reembolsado. O sistema protege ambos os lados." },
    },
    {
      "@type": "Question",
      name: "Preciso de VPN além do Tor Browser?",
      acceptedAnswer: { "@type": "Answer", text: "Não é necessário. O Tor Browser já criptografa sua conexão e oculta seu IP de forma mais eficaz que a maioria das VPNs. Usar VPN junto com Tor pode até reduzir a privacidade em alguns casos." },
    },
    {
      "@type": "Question",
      name: "A RoboSats funciona no celular?",
      acceptedAnswer: { "@type": "Answer", text: "Sim. Você pode acessar a RoboSats pelo Tor Browser no Android, ou usar o Orbot + navegador no iOS. A interface é responsiva e funciona bem em telas menores." },
    },
    {
      "@type": "Question",
      name: "Por que usar a Wallet of Satoshi no RoboSats?",
      acceptedAnswer: { "@type": "Answer", text: "A WoS é ideal para iniciantes por ser uma carteira de custódia Lightning simplificada. Ela permite que você receba seus primeiros R$ 10,00 do RoboSats instantaneamente, sem precisar entender de 'abertura de canais' ou 'liquidez'." },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://lordjunnior.com.br" },
    { "@type": "ListItem", position: 2, name: "Bitcoin", item: "https://lordjunnior.com.br/bitcoin" },
    { "@type": "ListItem", position: 3, name: "Comprar Bitcoin com Privacidade", item: "https://lordjunnior.com.br/comprar-bitcoin-com-privacidade" },
  ],
};

/* ── Chapter Block Component ── */
const ChapterBlock = ({
  id, phase, title, icon: Icon, image, imageAlt, children, index,
}: {
  id: string; phase: string; title: string; icon: React.ElementType;
  image: string; imageAlt: string; children: React.ReactNode; index: number;
}) => {
  const ref = useRef(null);
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative"
    >
      <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-t-sm">
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

        <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        <motion.div custom={0} variants={fadeUp} className="absolute top-6 left-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/20 backdrop-blur-md border border-primary/30 text-primary font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
            <Icon className="w-3.5 h-3.5" />
            {phase}
          </span>
        </motion.div>
      </div>

      <div className="p-8 md:p-10 bg-card/60 backdrop-blur-sm border border-border/30 rounded-b-sm">
        <motion.h3 custom={1} variants={fadeUp} className="font-impact text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6 uppercase">
          {title}
        </motion.h3>
        <motion.div custom={2} variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed">
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ── Expandable Macro Step ── */
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
      
      {/* Header — always visible */}
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

      {/* Expandable detail */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: APPLE_EASE }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 space-y-4 border-t border-border/20 pt-4">
          {children}
          {/* Mobile-friendly CTA at thumb reach */}
          <a
            href="#pre-requisitos"
            className="mt-4 w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.18] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300 sm:hidden"
          >
            <Shield className="w-4 h-4" />
            Assumir Meu Controle
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── FAQ Item ── */
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const ref = useRef(null);
  return (
    <motion.details
      ref={ref}
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
};

/* ══════════════════════ MAIN PAGE ══════════════════════ */

const TOC_ITEMS = [
  { id: "por-que", label: "Por Que Privacidade?" },
  { id: "o-que-e-robosats", label: "O Que é RoboSats?" },
  { id: "pre-requisitos", label: "Pré-Requisitos" },
  { id: "passo-a-passo", label: "Passo a Passo" },
  { id: "escrow", label: "Sistema de Escrow" },
  { id: "cuidados", label: "Cuidados e Riscos" },
  { id: "faq", label: "FAQ" },
];

export default function ComprarBitcoinAnonimo() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FixedThematicBackground image={bgComprarAnonimo} intensity="medium" />
      <Helmet>
        <title>Seu Primeiro Contato com Bitcoin na Prática por R$10 | Guia RoboSats 2026</title>
        <meta name="description" content="Guia prático para seu primeiro contato com Bitcoin a partir de R$10 usando RoboSats e Lightning Network. Tutorial passo a passo para iniciantes absolutos. Transparência total sobre privacidade e exposição." />
        <meta name="keywords" content="comprar bitcoin, bitcoin sem kyc, robosats tutorial, bitcoin sem documento, comprar bitcoin pix, lightning network, bitcoin privacidade, wallet of satoshi" />
        <link rel="canonical" href="https://lordjunnior.com.br/comprar-bitcoin-com-privacidade" />
        <meta property="og:title" content="Seu Primeiro Contato com Bitcoin na Prática por R$10. Transparência Total." />
        <meta property="og:description" content="Guia prático para comprar Bitcoin com R$10 via RoboSats. Sem promessas falsas, com aviso claro sobre exposição." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lordjunnior.com.br/comprar-bitcoin-com-privacidade" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="orange" />

      <ScrollProgressBar />
      
      <ScrollToTop />
      <AppSidebar />
      <MobileNav />
      <RightSidebar />

      <div className="lg:ml-[280px] 2xl:mr-[340px]">
        {/* ════════ HERO ════════ */}
        <header ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden flex items-end">
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
            <img
              src={heroImg}
              alt="Mão segurando smartphone com carteira Lightning Network aberta em ambiente noturno urbano, privacidade financeira com Bitcoin"
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{ filter: "brightness(0.3) saturate(0.85)" }} loading="eager" fetchPriority="high" decoding="async" />
          </motion.div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(247,147,26,0.08),_transparent_60%)] z-[1]" />

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-6 md:px-12 pb-16 md:pb-20 max-w-4xl">
            {/* Breadcrumb */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-2 mb-6">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-xs font-mono tracking-wider uppercase">
                Início
              </Link>
              <span className="text-muted-foreground/40">/</span>
              <Link to="/bitcoin" className="text-muted-foreground hover:text-primary transition-colors text-xs font-mono tracking-wider uppercase">
                Bitcoin
              </Link>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-primary/70 text-xs font-mono tracking-wider uppercase">Compra com Privacidade</span>
            </motion.div>

            {/* Pre-title */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-[ping_2.5s_ease-in-out_infinite]" />
                <EyeOff className="relative w-5 h-5 text-primary" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase font-bold">
                Guia de Soberania · Nível: Iniciante Absoluto
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="font-impact text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 leading-[0.95] uppercase"
            >
              SEU PRIMEIRO CONTATO{" "}
              <br className="hidden md:block" />
              COM <span className="text-primary">BITCOIN NA PRÁTICA</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-5 leading-relaxed"
            >
              R$10 é tudo que você precisa para entender como funciona.
              Sem complicação. Direto ao ponto.
              Você vai usar uma ferramenta que não depende de exchange.{" "}
              <span className="text-foreground font-semibold">E começar a enxergar o sistema com outros olhos.</span>
            </motion.p>

            {/* Sub-hero */}
            <motion.p
              custom={3.5} variants={fadeUp} initial="hidden" animate="visible"
              className="text-sm text-muted-foreground/80 max-w-xl mb-8 leading-relaxed"
            >
              Este guia é para quem quer sair da teoria e ver na prática. Mesmo que ainda não esteja no nível ideal de privacidade.
            </motion.p>

            {/* CTA */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-4">
              <a
                href="#pre-requisitos"
                className="group inline-flex items-center gap-3 py-4 px-8 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.18] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
              >
                <Zap className="w-4 h-4" />
                COMEÇAR AGORA COM R$10
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </a>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
                Entender na prática, mesmo que ainda não seja o cenário perfeito.
              </span>
            </motion.div>
          </motion.div>
        </header>

        {/* ════════ CONTENT ════════ */}
        <main className="relative z-10 px-5 md:px-8 lg:px-12 pb-20">
          <div className="max-w-4xl mx-auto space-y-16 md:space-y-20">

            {/* ── BLOCO DE ALERTA MÁXIMO: ACIMA DA DOBRA ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: APPLE_EASE }}
              className="relative p-6 md:p-8 rounded-sm border-2 border-destructive/60 bg-destructive/[0.06] backdrop-blur-sm overflow-hidden"
              style={{ boxShadow: "0 0 40px rgba(220,38,38,0.12), 0 0 80px rgba(220,38,38,0.06)" }}
            >
              {/* Animated top bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-destructive via-destructive/80 to-destructive animate-pulse" />

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-destructive/40 animate-[ping_2s_ease-in-out_infinite]" />
                  <AlertTriangle className="relative w-6 h-6 text-destructive" />
                </div>
                <span className="font-mono text-xs md:text-sm tracking-[0.15em] text-destructive uppercase font-black">
                  🚨 ATENÇÃO ANTES DE CONTINUAR
                </span>
              </div>

              <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p className="text-foreground font-semibold">
                  Se você chegou até aqui, precisa entender uma coisa com clareza:
                </p>
                <p className="text-foreground">
                  Este site é focado em <span className="text-destructive font-black uppercase">AUTOCUSTÓDIA</span> e <span className="text-destructive font-black uppercase">PRIVACIDADE</span>.
                  E isso significa evitar qualquer exposição desnecessária.
                </p>
                <p className="text-muted-foreground">
                  O método mostrado neste guia pode envolver formas de pagamento ligadas ao sistema tradicional, como o PIX.
                </p>

                {/* Destaque máximo */}
                <div className="flex items-start gap-3 p-4 rounded-sm border border-destructive/40 bg-destructive/[0.08]">
                  <Eye className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-foreground font-bold">
                    👉 Isso NÃO é privado. Simples assim.
                    <span className="block text-muted-foreground font-normal mt-1">
                      Se você utilizar esse tipo de método, existe exposição de dados. Não importa o resto da operação.
                    </span>
                  </p>
                </div>

                <p className="text-muted-foreground">
                  Este guia existe por um único motivo:
                </p>
                <p className="text-foreground font-semibold">
                  👉 Foi extremamente solicitado por pessoas que acompanham meu conteúdo.
                  <span className="block text-muted-foreground font-normal mt-1">
                    E muitas delas deixam claro que não se importam com esse nível de exposição no início.
                  </span>
                </p>

                <div className="h-px w-full bg-destructive/20 my-2" />

                <p className="text-foreground">
                  Então aqui vai o ponto mais importante:
                </p>

                <div className="flex items-start gap-3 p-4 rounded-sm border border-destructive/40 bg-destructive/[0.08]">
                  <ShieldCheck className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-destructive font-black uppercase">
                      Se você busca PRIVACIDADE REAL, este não é o caminho ideal.
                    </p>
                    <p className="text-muted-foreground mt-1">
                      Se você quer apenas entender como funciona e dar o primeiro passo com simplicidade, então siga consciente.
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-destructive/20 my-2" />

                <p className="text-foreground font-semibold text-base md:text-lg">
                  Eu não incentivo exposição.{" "}
                  <span className="text-primary">Eu ensino controle.</span>
                </p>
                <p className="text-muted-foreground text-xs font-mono tracking-wider uppercase">
                  A decisão é sua.
                </p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-destructive via-destructive/80 to-destructive animate-pulse" />
            </motion.div>

            {/* ── BLOCO DE REFORÇO PNL ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-5 rounded-sm border border-primary/20 bg-primary/[0.04]"
            >
              <Shield className="w-7 h-7 text-primary shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Existe uma diferença entre começar e fazer do jeito ideal.</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Aqui, você está começando. Com o tempo, você ajusta, melhora e evolui.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  👉 O importante é não ficar parado.
                </p>
              </div>
            </motion.div>

            {/* ── DISCLAIMER JURÍDICO ── */}
            <div className="p-5 rounded-sm border border-amber-500/25 bg-amber-500/[0.04] backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-300 mb-1">Aviso Legal e Educacional</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    ⚠️ Este conteúdo é <strong className="text-foreground/80">estritamente educacional</strong>. Criptomoedas envolvem riscos. Faça sua própria pesquisa. O autor não se responsabiliza por decisões individuais tomadas com base neste material. A compra peer-to-peer de Bitcoin entre pessoas físicas é legal no Brasil, mas cada indivíduo é responsável por suas obrigações tributárias e pelo cumprimento das normas vigentes. Ao seguir este guia, você assume total responsabilidade pelas suas escolhas.
                  </p>
                </div>
              </div>
            </div>

            {/* ── SNIPPET BAIT ── */}
            <SnippetBait
              text="Para comprar Bitcoin com mais privacidade no Brasil em 2026, use a RoboSats via Tor Browser: instale a Wallet of Satoshi, acesse a plataforma .onion, gere um Robot ID, encontre uma oferta em BRL, deposite a fiança via Lightning, envie o pagamento ao vendedor e receba seus satoshis automaticamente, com menos exposição de dados pessoais."
              cta="Leia o guia completo abaixo ↓"
              href="#por-que"
            />

            {/* ── REFORÇO DE IDENTIDADE ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-5 rounded-sm border border-primary/20 bg-primary/[0.04]"
            >
              <Award className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Só de estar aqui, você já está à frente de 99% das pessoas.</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  A maioria nem sabe que pode comprar Bitcoin sem entregar seus dados. Você já está buscando controle, e isso muda tudo.
                </p>
              </div>
            </motion.div>

            {/* ── CAP 1: POR QUE PRIVACIDADE ── */}
            <ChapterBlock
              id="por-que"
              phase="Capítulo 1"
              title="Por Que Comprar Bitcoin com Mais Privacidade?"
              icon={EyeOff}
              image={anonimatoImg}
              imageAlt="Câmera de vigilância monitorando rua urbana à noite. Por que privacidade financeira importa na era digital"
              index={0}
            >
              <p>
                Você não precisa ser criminoso para querer privacidade. Você tranca a porta do banheiro mesmo sem ter nada a esconder, fecha o extrato bancário quando alguém olha por cima do seu ombro. <strong className="text-foreground">Privacidade é um direito, não um privilégio.</strong>
              </p>
              <p>
                Quando você compra Bitcoin em uma exchange tradicional (como Binance, Mercado Bitcoin ou Foxbit), você entrega:
              </p>
              <ul className="space-y-2 pl-4">
                {[
                  "CPF, RG e comprovante de endereço",
                  "Selfie com documento (reconhecimento facial)",
                  "Dados bancários completos",
                  "Histórico de todas as suas transações",
                  "Sua identidade vinculada permanentemente a cada satoshi comprado",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Eye className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Esses dados ficam armazenados nos servidores dessas empresas por tempo indeterminado. Se houver um vazamento de dados (e vazamentos acontecem com frequência), <strong className="text-foreground">criminosos saberão exatamente quanto Bitcoin você tem e onde você mora</strong>.
              </p>
              <p>
                Comprar com mais privacidade significa: <strong className="text-foreground">você compra Bitcoin diretamente de outra pessoa, sem intermediários desnecessários, sem câmeras, sem formulários invasivos</strong>. É assim que o Bitcoin foi projetado para funcionar desde o primeiro dia.
              </p>

              {/* Mini alert — legalidade */}
              <div className="mt-4 p-4 rounded-sm border border-amber-500/20 bg-amber-500/[0.05]">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-300 mb-1">Isso é legal?</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Sim. Não existe nenhuma lei no Brasil que obrigue a apresentação de documentos para comprar Bitcoin entre pessoas físicas. A obrigação de KYC recai sobre instituições financeiras regulamentadas, não sobre transações peer-to-peer. Você está exercendo seu direito constitucional à privacidade (Art. 5º, X e XII da CF/88).
                    </p>
                  </div>
                </div>
              </div>
            </ChapterBlock>

            {/* ── CAP 2: O QUE É ROBOSATS ── */}
            <ChapterBlock
              id="o-que-e-robosats"
              phase="Capítulo 2"
              title="O Que é a RoboSats? (Explicado Para Leigos)"
              icon={Bot}
              image={plataformaImg}
              imageAlt="Robô digital operando livro de ofertas peer-to-peer em múltiplas telas. Interface da RoboSats para compra descentralizada de Bitcoin"
              index={1}
            >
              <p>
                Imagine um mercado livre de Bitcoin: não existe dono, não existe empresa, não existe servidor central que pode ser desligado. <strong className="text-foreground">A RoboSats é um marketplace peer-to-peer (pessoa a pessoa) que funciona dentro do Tor Browser.</strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                {[
                  { icon: UserX, label: "Maior Privacidade", desc: "Sem cadastro, sem e-mail, sem documentos. Sua identidade é um robô aleatório." },
                  { icon: Zap, label: "Via Lightning", desc: "Pagamentos instantâneos e com taxas quase zero, receba em segundos." },
                  { icon: Lock, label: "Escrow Seguro", desc: "Garantia automática: se o vendedor não cumprir, ele perde dinheiro, não você." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="p-4 rounded-sm border border-border/30 bg-card/40">
                      <Icon className="w-5 h-5 text-primary mb-2" />
                      <p className="text-sm font-semibold text-foreground mb-1">{item.label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              <p>
                Funciona assim: vendedores publicam ofertas dizendo "vendo X satoshis por Y reais", compradores escolhem a oferta, pagam pelo método combinado e recebem os satoshis automaticamente via Lightning Network. O robô da RoboSats garante que ninguém trapaceie.
              </p>
              <p className="text-sm italic text-muted-foreground/70">
                Pense na RoboSats como um "Uber do Bitcoin": conecta compradores e vendedores diretamente, sem intermediário. Mas diferente do Uber, <strong className="text-foreground/80">ninguém sabe quem você é</strong>.
              </p>
            </ChapterBlock>

            {/* ── CAP 3: PRÉ-REQUISITOS (2 obrigatórios + 1 opcional) ── */}
            <ChapterBlock
              id="pre-requisitos"
              phase="Capítulo 3"
              title="Antes de Começar: 2 Itens Obrigatórios"
              icon={Download}
              image={prerequisitosImg}
              imageAlt="Laptop aberto com Tor Browser e Wallet of Satoshi sobre mesa escura. Ferramentas essenciais para comprar Bitcoin com privacidade"
              index={2}
            >
              <p className="mb-6">
                Você só precisa de 2 ferramentas para começar, ambas são <strong className="text-foreground">gratuitas</strong> e levam menos de 10 minutos para configurar.
              </p>

              {/* Item 1 */}
              <div className="p-5 rounded-sm border border-border/30 bg-card/40 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0">
                    <Globe className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">1. Tor Browser (Navegador com Mais Privacidade)</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      O Tor Browser é um navegador gratuito que esconde seu endereço IP (sua "localização digital"). É o mesmo navegador usado por jornalistas, ativistas e denunciantes no mundo inteiro para se proteger de governos autoritários.
                    </p>
                    <p className="text-xs text-muted-foreground/70 mb-2">
                      <strong className="text-foreground/80">Onde baixar:</strong> Acesse o site oficial e clique em "Download". Instale como qualquer programa normal. No Android, procure "Tor Browser" na Play Store.
                    </p>
                    <a href="https://www.torproject.org/download/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-primary hover:underline underline-offset-2 font-mono">
                      <ExternalLink className="w-3 h-3" />
                      torproject.org/download
                    </a>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-5 rounded-sm border border-border/30 bg-card/40 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
                    <Wallet className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">2. Carteira Lightning (Sua "Conta" de Bitcoin)</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      Uma carteira Lightning é um aplicativo no seu celular que funciona como uma "conta bancária" de Bitcoin, mas sem banco. Você é o dono, ninguém pode bloquear, congelar ou confiscar.
                    </p>
                    <p className="text-xs text-muted-foreground/70 mb-2">
                      <strong className="text-foreground/80">Recomendação para iniciantes:</strong> <span className="text-primary">Wallet of Satoshi</span> (Android/iOS). É a mais simples: baixe, abra, e pronto, sua carteira está criada em 30 segundos. Sem entender canais ou liquidez. <Link to="/lightning" className="text-primary/80 hover:underline underline-offset-2">Veja nosso guia completo de carteiras Lightning →</Link>
                    </p>
                    <p className="text-xs text-muted-foreground/60 italic">
                      Alternativas: Blixt Wallet, Zeus, Breez. Todas são gratuitas e não pedem seus dados.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3 — OPCIONAL */}
              <div className="p-5 rounded-sm border border-border/20 bg-card/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">Opcional: Método de Pagamento</h4>
                      <span className="text-[10px] font-mono tracking-wider text-muted-foreground/60 bg-muted/20 px-2 py-0.5 rounded-sm uppercase">Não obrigatório</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Na RoboSats, o vendedor define os métodos de pagamento aceitos. <strong className="text-foreground/80">Pix é o mais comum no Brasil</strong>, mas também existem vendedores que aceitam transferência bancária, criptomoedas ou até cash pessoalmente. Você escolhe a oferta que se encaixa na sua realidade. O Pix é uma opção, não uma exigência.
                    </p>
                  </div>
                </div>
              </div>
            </ChapterBlock>

            {/* ── INFOGRÁFICO ROBOSATS PROTOCOL ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-sm border border-primary/20 bg-card/40 backdrop-blur-sm"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="p-6 md:p-8">
                <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase font-bold mb-4">
                  Visão Geral · RoboSats Protocol
                </p>
                <img
                  src={infograficoImg}
                  alt="Infográfico do Protocolo RoboSats: Mind Unlock, Mochila Digital, Perfil Fantasma (Robô) e Troca Soberana. 4 etapas para comprar Bitcoin com privacidade"
                  className="w-full rounded-sm"
                  loading="lazy"
                />
                <p className="text-xs text-muted-foreground/60 mt-4 text-center italic">
                  Os 4 pilares do protocolo: desbloqueie a mente, prepare suas ferramentas, crie sua identidade fantasma e execute a troca soberana.
                </p>
              </div>
            </motion.div>

            {/* ── CAP 4: TUTORIAL — 4 MACRO PASSOS EXPANSÍVEIS ── */}
            <section id="passo-a-passo" className="space-y-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-t-sm mb-0">
                  <img src={p2pImg} alt="Mão segurando moeda Bitcoin dourada sob luz de velas. Troca peer-to-peer sem intermediários" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                  <motion.div custom={0} variants={fadeUp} className="absolute top-6 left-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/20 backdrop-blur-md border border-primary/30 text-primary font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
                      <FileCheck className="w-3.5 h-3.5" />
                      Tutorial Completo
                    </span>
                  </motion.div>
                </div>
                <div className="p-8 md:p-10 bg-card/60 backdrop-blur-sm border border-border/30 rounded-b-sm mb-8">
                  <motion.h3 custom={1} variants={fadeUp} className="font-impact text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3 uppercase">
                    4 PASSOS PARA SUA PRIMEIRA COMPRA
                  </motion.h3>
                  <motion.p custom={2} variants={fadeUp} className="text-muted-foreground leading-relaxed">
                    Siga cada passo no seu ritmo. Se é sua primeira vez, vá com calma. <strong className="text-foreground">R$10 é suficiente para aprender sem risco.</strong>
                  </motion.p>
                </div>
              </motion.div>

              <div className="space-y-4">
                {/* MACRO 1 — Preparar Ferramentas */}
                <MacroStep
                  number={1}
                  title="Prepare Suas Ferramentas"
                  summary="Instale o Tor Browser e configure sua carteira Lightning. Leva menos de 10 minutos."
                  icon={Download}
                  defaultOpen
                >
                  <div className="space-y-3">
                    <div className="p-3 rounded-sm bg-muted/10 border border-border/20">
                      <p className="text-sm text-foreground font-medium mb-1">📥 Tor Browser</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Abra o site <span className="text-primary font-mono">torproject.org</span>, clique em "Download" e instale normalmente. No Android, busque "Tor Browser" na Play Store. Ele se conecta à rede Tor automaticamente (pode levar 10-30 segundos).
                      </p>
                    </div>
                    <div className="p-3 rounded-sm bg-muted/10 border border-border/20">
                      <p className="text-sm text-foreground font-medium mb-1">⚡ Carteira Lightning</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Baixe a <strong className="text-foreground/80">Wallet of Satoshi</strong> no seu celular. Abra e pronto, sua carteira está criada em 30 segundos. Sem cadastro, sem dados pessoais, sem banco. É a carteira Lightning mais simples para receber seus primeiros satoshis do RoboSats. <Link to="/lightning" className="text-primary/80 hover:underline underline-offset-2">Veja todas as carteiras →</Link>
                      </p>
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-sm bg-amber-500/[0.06] border border-amber-500/15">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-200/80 leading-relaxed">O Tor é mais lento que um navegador normal porque sua conexão passa por 3 servidores diferentes pelo mundo para proteger sua identidade. Isso é esperado.</p>
                    </div>
                  </div>
                </MacroStep>

                {/* MACRO 2 — Acessar e Criar Identidade */}
                <MacroStep
                  number={2}
                  title="Acesse a RoboSats e Crie Sua Identidade"
                  summary="Entre na plataforma pelo Tor e gere seu Robot, sua identidade temporária e privada."
                  icon={Bot}
                >
                  <div className="space-y-3">
                    <div className="p-3 rounded-sm bg-muted/10 border border-border/20">
                      <p className="text-sm text-foreground font-medium mb-1">🌐 Acessar a RoboSats</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Na barra de endereço do Tor, cole o endereço .onion oficial da RoboSats:
                      </p>
                      <p className="text-xs font-mono text-primary/90 bg-primary/[0.06] border border-primary/15 rounded-sm px-3 py-2 mt-2 break-all select-all">
                        robosats6tkf3eva7x2voqso3a5wcorsnw34jveyrat2fgdszj3id.onion
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        Endereços .onion são "endereços secretos" que só funcionam no Tor. Salve nos favoritos para não precisar digitar novamente. Para fins de teste (menos privado), você pode acessar <a href="https://unsafe.robosats.com" target="_blank" rel="noopener noreferrer" className="text-primary/80 hover:underline underline-offset-2">unsafe.robosats.com</a> pelo navegador normal.
                      </p>
                      <a href="https://learn.robosats.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-primary hover:underline underline-offset-2 font-mono mt-2">
                        <ExternalLink className="w-3 h-3" />
                        learn.robosats.org (Documentação oficial)
                      </a>
                    </div>
                    <div className="p-3 rounded-sm bg-muted/10 border border-border/20">
                      <p className="text-sm text-foreground font-medium mb-1">🤖 Gerar Seu Robot</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Clique em "Generate Robot". O sistema cria um apelido aleatório e um avatar. Essa é sua identidade na plataforma, não vinculada a nenhum dado pessoal. <strong className="text-foreground/80">IMPORTANTE:</strong> copie e salve o token que aparecer, ele é seu "login" para retomar negociações.
                      </p>
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-sm bg-amber-500/[0.06] border border-amber-500/15">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-200/80 leading-relaxed">Anote o token em papel ou salve em um gerenciador de senhas. Sem ele, você perde acesso a negociações em andamento. Nunca acesse a RoboSats por links de terceiros.</p>
                    </div>
                  </div>
                </MacroStep>

                {/* MACRO 3 — Encontrar e Aceitar Oferta */}
                <MacroStep
                  number={3}
                  title="Encontre Uma Oferta e Deposite a Fiança"
                  summary="Explore o livro de ofertas, escolha um vendedor confiável, aceite a ordem e garanta sua participação."
                  icon={Handshake}
                >
                  <div className="space-y-3">
                    <div className="p-3 rounded-sm bg-muted/10 border border-border/20">
                      <p className="text-sm text-foreground font-medium mb-1">📋 Explorar Ofertas</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Clique em "Offers" e filtre por moeda: selecione "BRL". Você verá vendedores oferecendo Bitcoin em troca de pagamento. Cada oferta mostra preço, método de pagamento aceito, valor mínimo/máximo e reputação do vendedor.
                      </p>
                    </div>
                    <div className="p-3 rounded-sm bg-muted/10 border border-border/20">
                      <p className="text-sm text-foreground font-medium mb-1">✅ Aceitar e Depositar Fiança</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Encontrou uma oferta boa? Clique nela, defina o valor (comece com R$10-R$50), clique em "Take Order". A RoboSats vai pedir uma fiança (bond) via Lightning, geralmente 3% do valor. Abra sua Wallet of Satoshi, escaneie o QR Code e confirme. A fiança volta para você ao final da negociação.
                      </p>
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-sm bg-amber-500/[0.06] border border-amber-500/15">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-200/80 leading-relaxed">Prefira vendedores com muitas negociações concluídas (ícone de estrela). A fiança só é perdida se você abandonar a negociação no meio. Ela é sua garantia de seriedade.</p>
                    </div>
                  </div>
                </MacroStep>

                {/* MACRO 4 — Pagar e Receber */}
                <MacroStep
                  number={4}
                  title="Pague o Vendedor e Receba Seus Satoshis"
                  summary="Envie o pagamento pelo método combinado, confirme no chat e receba Bitcoin na sua carteira."
                  icon={ShieldCheck}
                >
                  <div className="space-y-3">
                    <div className="p-3 rounded-sm bg-muted/10 border border-border/20">
                      <p className="text-sm text-foreground font-medium mb-1">💸 Enviar Pagamento</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Após ambos depositarem a fiança, um chat criptografado se abre entre você e o vendedor. Ele enviará os dados para pagamento. Realize o pagamento pelo método combinado na oferta, envie o comprovante no chat e clique em "Confirmar Pagamento Enviado".
                      </p>
                    </div>
                    <div className="p-3 rounded-sm bg-muted/10 border border-border/20">
                      <p className="text-sm text-foreground font-medium mb-1">⚡ Receber Satoshis</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Quando o vendedor confirmar o recebimento, a RoboSats libera automaticamente os satoshis para sua carteira Lightning. Em segundos, o saldo aparece na sua Wallet of Satoshi. <strong className="text-foreground/80">Parabéns, você acabou de comprar Bitcoin com mais privacidade.</strong>
                      </p>
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-sm bg-amber-500/[0.06] border border-amber-500/15">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-200/80 leading-relaxed">Nunca pague fora do valor combinado na RoboSats. Se o vendedor pedir para enviar para outra conta ou valor diferente, cancele a operação imediatamente.</p>
                    </div>
                  </div>
                </MacroStep>
              </div>
            </section>

            {/* ── REFORÇO IDENTIDADE PÓS-TUTORIAL ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-5 rounded-sm border border-primary/20 bg-primary/[0.04]"
            >
              <CheckCircle className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Se você chegou até aqui, você já é diferente da maioria.</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  A maior parte das pessoas nem questiona o sistema. Você não só questionou, mas buscou uma alternativa real. Esse é o início da soberania.
                </p>
              </div>
            </motion.div>

            {/* ── CAP 5: ESCROW ── */}
            <ChapterBlock
              id="escrow"
              phase="Capítulo 5"
              title="Como a RoboSats Protege Você (Sistema de Escrow)"
              icon={Shield}
              image={escrowImg}
              imageAlt="Cofre digital transparente simbolizando segurança em trocas P2P. Sistema de escrow da RoboSats protegendo comprador e vendedor"
              index={4}
            >
              <p>
                "Mas e se o vendedor pegar meu pagamento e não enviar os bitcoins?" Esta é a pergunta mais importante, e a resposta é o que torna a RoboSats segura.
              </p>
              <p>
                A RoboSats usa um sistema chamado <strong className="text-foreground">escrow (garantia)</strong>. Funciona assim:
              </p>
              <ol className="space-y-3 pl-4 list-decimal list-inside">
                <li className="text-sm"><strong className="text-foreground">Antes da negociação:</strong> O vendedor deposita os bitcoins + fiança em um "cofre digital" controlado pela RoboSats. Ele não tem acesso a esse dinheiro.</li>
                <li className="text-sm"><strong className="text-foreground">Durante a negociação:</strong> Você faz o pagamento, e o dinheiro do vendedor continua travado no cofre.</li>
                <li className="text-sm"><strong className="text-foreground">Após confirmação:</strong> Quando o vendedor confirma o recebimento, o cofre libera automaticamente os bitcoins para você.</li>
                <li className="text-sm"><strong className="text-foreground">Se houver disputa:</strong> Se o vendedor não confirmar (tentativa de golpe), você abre uma disputa e um mediador analisa as evidências (comprovante) para decidir a favor de quem tem razão.</li>
              </ol>
              <p className="mt-4">
                <strong className="text-foreground">Resumo:</strong> O vendedor tem mais a perder do que você. Se ele tentar trapacear, perde a fiança E os bitcoins. O sistema é desenhado para tornar a honestidade a opção mais lucrativa.
              </p>
            </ChapterBlock>

            {/* ── CAP 6: CUIDADOS ── */}
            <ChapterBlock
              id="cuidados"
              phase="Capítulo 6"
              title="Cuidados Essenciais e Riscos Reais"
              icon={AlertTriangle}
              image={segurancaImg}
              imageAlt="Escudo dourado com cadeado brilhando em âmbar sobre fundo escuro. Cuidados essenciais e riscos reais na compra de Bitcoin com privacidade"
              index={5}
            >
              <div className="space-y-4">
                {[
                  { title: "Comece Pequeno", desc: "Sua primeira compra deve ser de R$10 a R$50. Aprenda o processo antes de aumentar os valores. Erros com R$10 são lições, erros com R$1.000 são prejuízo." },
                  { title: "Nunca Compartilhe Seu Token Robot", desc: "O token é seu acesso à identidade na RoboSats. Se alguém tiver seu token, pode acessar suas negociações em andamento." },
                  { title: "Verifique o Endereço .onion", desc: "Sempre acesse a RoboSats pelo endereço oficial. Sites falsos (phishing) podem parecer idênticos mas roubam suas fianças. Confira o endereço caractere por caractere." },
                  { title: "Não Negocie Fora da Plataforma", desc: "Se um vendedor pedir para continuar a conversa no Telegram ou WhatsApp, recuse. Fora da plataforma o escrow não funciona e você perde a proteção." },
                  { title: "Backup da Carteira Lightning", desc: "Após receber os satoshis, faça backup da sua carteira. Se usa a Wallet of Satoshi, anote o e-mail de recuperação. Se migrar para uma carteira não-custodial, anote as 12 palavras de recuperação (seed) em papel e guarde em local seguro." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-sm border border-destructive/15 bg-destructive/[0.03]">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ChapterBlock>

            {/* ── SUCCESS IMAGE ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full h-56 md:h-72 overflow-hidden rounded-sm"
            >
              <img src={sucessoImg} alt="Tela de smartphone exibindo confirmação de compra de Bitcoin bem-sucedida via Lightning Network, soberania financeira conquistada" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Você agora tem <span className="text-primary">mais controle</span>.
                </p>
                <p className="text-sm text-muted-foreground mt-2">Seus primeiros satoshis estão na sua carteira. Sem intermediários, sem permissão.</p>
              </div>
            </motion.div>

            {/* ── RISK BLOCK ── */}
            <RiskBlock
              title="Sem privacidade financeira, o que pode acontecer?"
              consequences={[
                "Suas compras de Bitcoin ficam vinculadas permanentemente à sua identidade civil em bancos de dados de exchanges.",
                "Vazamentos de dados podem expor quanto Bitcoin você possui e onde mora, tornando você um alvo potencial.",
                "Governos podem rastrear, taxar retroativamente ou restringir seus ativos digitais com ordens judiciais.",
                "Seu histórico financeiro completo fica disponível para empresas e instituições que compram dados vazados.",
                "Sem o conhecimento de compra com mais privacidade, você depende de intermediários que podem bloquear seu acesso a qualquer momento.",
              ]}
            />

            {/* ── FAQ ── */}
            <section id="faq" className="space-y-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h3 custom={0} variants={fadeUp} className="font-impact text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2 uppercase">
                  PERGUNTAS FREQUENTES
                </motion.h3>
                <motion.p custom={1} variants={fadeUp} className="text-muted-foreground text-sm mb-6">
                  As dúvidas mais comuns de quem está comprando Bitcoin pela primeira vez com mais privacidade.
                </motion.p>
              </motion.div>

              <div className="space-y-3">
                {faqSchema.mainEntity.map((item, i) => (
                  <FaqItem key={i} q={item.name} a={item.acceptedAnswer.text} />
                ))}
              </div>
            </section>

            {/* ── FINAL CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-12 space-y-6"
            >
              <p className="font-impact text-3xl md:text-4xl font-bold tracking-tight uppercase">
                PRONTO PARA <span className="text-primary">ASSUMIR O CONTROLE</span>?
              </p>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                O primeiro passo é sempre o mais difícil, mas com R$10 e 30 minutos você quebra a maior barreira: o medo do desconhecido.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#pre-requisitos"
                  className="group inline-flex items-center gap-3 py-4 px-10 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.18] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
                >
                  <Shield className="w-4 h-4" />
                  Blindar Minha Soberania
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </a>
                <Link
                  to="/autocustodia"
                  className="inline-flex items-center gap-2 py-4 px-8 rounded-sm border border-border/30 bg-card/40 hover:bg-card/60 text-foreground text-sm transition-all"
                >
                  Próximo Nível: Autocustódia →
                </Link>
              </div>
              <p className="text-xs text-muted-foreground/50 italic mt-6">
                "Quem controla as chaves, controla o futuro." Este guia é educacional. Suas decisões financeiras são sua responsabilidade exclusiva.
              </p>
            </motion.div>

            <DonationCTA />

            {/* ── BACK ── */}
            <div className="pt-8 border-t border-border/20">
              <Link
                to="/bitcoin"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para Bitcoin
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
