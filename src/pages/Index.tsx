import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldAlert, Skull, QrCode, Shield, AlertTriangle } from "lucide-react";
import cardBtcAnonimo from "@/assets/card-btc-anonimo.jpg";
import cardDolarVirtual from "@/assets/card-dolar-virtual.jpg";
import cardPixSemBanco from "@/assets/card-pix-sem-banco.jpg";
import cardConfiscoBtc from "@/assets/card-confisco-bitcoin.jpg";
import cardPixAnonimo from "@/assets/card-pix-anonimo.jpg";
import cardMultisig from "@/assets/card-multisig.jpg";
import jadeCoreHook from "@/assets/jade-core/hero-device.jpg";
import cardLeiConta from "@/assets/card-lei-conta.jpg";
import bybitBinanceHook from "@/assets/exchanges/bybit-binance-hero.jpg";
import fiisHook from "@/assets/mercado-tradicional/card-home-fiis.jpg";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NoiseBackground from "@/components/NoiseBackground";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import ConfiscoTimeline from "@/components/ConfiscoTimeline";
import PixBitcoinSection from "@/components/PixBitcoinSection";
import ToolsSection from "@/components/ToolsSection";
import KnowledgeSection from "@/components/KnowledgeSection";
import AudiotecaSection from "@/components/AudiotecaSection";
import FaqSection from "@/components/FaqSection";
import WhyBitcoinSection from "@/components/WhyBitcoinSection";
import FooterSection from "@/components/FooterSection";
import QuoteCarousel from "@/components/QuoteCarousel";
import BitcoinInsightsSection from "@/components/BitcoinInsightsSection";
import ClosingManifesto from "@/components/ClosingManifesto";
import NetworkTicker from "@/components/NetworkTicker";
import CommandCenter from "@/components/CommandCenter";
import SovereignTermModal from "@/components/SovereignTermModal";
import NivelZero from "@/components/NivelZero";
import StrategicSignature from "@/components/StrategicSignature";
import RiskBlock from "@/components/RiskBlock";
import AlertBanner from "@/components/AlertBanner";
import SnippetBait from "@/components/SnippetBait";
import RapeHookCard from "@/components/RapeHookCard";
import FutureStateSection from "@/components/FutureStateSection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ── Nobel Section Wrapper — GSAP ScrollTrigger + Framer Motion hybrid ── */
const NobelSection = ({
  children,
  className = "",
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const section = ref.current;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(section, { opacity: 1, y: 0, filter: "none" });
    });

    return () => media.revert();
  }, [delay]);

  return (
    <div ref={ref} id={id} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

const Index = () => {
  const { scrollYProgress } = useScroll();

  // GSAP: ScrollTrigger cleanup
  useEffect(() => {
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);


  // Dust parallax
  const dustY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o Bitcoin e por que ele é valioso?",
        "acceptedAnswer": { "@type": "Answer", "text": "O Bitcoin é a primeira moeda digital descentralizada e escassa. Seu valor vem da matemática e da rede global que garante que apenas 21 milhões de unidades existirão, servindo como proteção contra a inflação estatal." }
      },
      {
        "@type": "Question",
        "name": "O que significa fazer a autocustódia de Bitcoin?",
        "acceptedAnswer": { "@type": "Answer", "text": "Autocustódia é o ato de possuir suas próprias chaves privadas. Ao retirar seus Bitcoins das corretoras e usar uma carteira própria, você se torna seu próprio banco, eliminando o risco de terceiros." }
      },
      {
        "@type": "Question",
        "name": "Como proteger meu patrimônio contra a inflação?",
        "acceptedAnswer": { "@type": "Answer", "text": "O Bitcoin é uma ferramenta de preservação de valor a longo prazo. Diferente das moedas fiduciárias que perdem poder de compra, o BTC possui uma política monetária fixa e imutável." }
      },
      {
        "@type": "Question",
        "name": "O que é Cold Storage e por que é importante?",
        "acceptedAnswer": { "@type": "Answer", "text": "Cold Storage é o armazenamento de chaves privadas offline. É o método mais seguro de guardar Bitcoin, protegendo seus ativos contra ataques hackers e engenharia social." }
      },
      {
        "@type": "Question",
        "name": "É possível comprar Bitcoin de forma privada?",
        "acceptedAnswer": { "@type": "Answer", "text": "Sim. Através de métodos P2P e ferramentas que não exigem vigilância corporativa (KYC), é possível adquirir e transacionar Bitcoin preservando sua privacidade financeira." }
      },
      {
        "@type": "Question",
        "name": "O que são chaves privadas e sementes (seed phrases)?",
        "acceptedAnswer": { "@type": "Answer", "text": "São as provas de propriedade do seu Bitcoin. A chave privada permite assinar transações, enquanto a seed phrase é o backup universal que garante o acesso aos seus fundos em caso de perda da carteira." }
      },
      {
        "@type": "Question",
        "name": "O Bitcoin é legal no Brasil?",
        "acceptedAnswer": { "@type": "Answer", "text": "Sim, o Bitcoin é uma propriedade digital reconhecida. A autocustódia é um direito do indivíduo de gerir sua própria riqueza de forma independente." }
      },
      {
        "@type": "Question",
        "name": "Como começar na autocustódia de elite?",
        "acceptedAnswer": { "@type": "Answer", "text": "O primeiro passo é entender a responsabilidade de gerar suas próprias chaves. O uso de hardware wallets e o estudo sobre segurança digital são essenciais para uma blindagem completa." }
      },
      {
        "@type": "Question",
        "name": "Onde aprender sobre Bitcoin e soberania financeira de graça?",
        "acceptedAnswer": { "@type": "Answer", "text": "No site lordjunnior.com, oferecemos ebooks, audiobooks e tutoriais gratuitos focados em educação técnica, matemática aplicada e ferramentas de privacidade para BTC." }
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Arsenal de Soberania",
    "alternateName": "Lord Junnior Arsenal",
    "url": "https://lordjunnior.com.br",
    "description": "Infraestrutura de educação soberanista: Bitcoin, Autocustódia e Autonomia Individual.",
    "inLanguage": "pt-BR",
    "publisher": {
      "@type": "Organization",
      "name": "Arsenal de Soberania",
      "url": "https://lordjunnior.com.br",
      "logo": "https://lordjunnior.com.br/favicon.svg"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://lordjunnior.com.br/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Arsenal de Soberania",
    "alternateName": "Lord Junnior",
    "url": "https://lordjunnior.com.br",
    "logo": "https://lordjunnior.com.br/favicon.svg",
    "sameAs": [
      "https://twitter.com/lordjunnior",
      "https://instagram.com/lordjunnior"
    ],
    "description": "Ecossistema de soberania individual: Bitcoin, autocustódia, autonomia alimentar e blindagem financeira.",
    "founder": {
      "@type": "Person",
      "name": "Lord Junnior"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lordjunnior.com.br/" },
      { "@type": "ListItem", "position": 2, "name": "Bitcoin", "item": "https://lordjunnior.com.br/bitcoin" },
      { "@type": "ListItem", "position": 3, "name": "Soberania Orgânica", "item": "https://lordjunnior.com.br/soberania-organica" },
      { "@type": "ListItem", "position": 4, "name": "Soberania Financeira", "item": "https://lordjunnior.com.br/soberania-financeira" }
    ]
  };

  return (
    <div className="min-h-screen text-foreground pt-[62px] overflow-x-hidden">
      <Helmet>
        <title>Seu dinheiro está derretendo | Lord Junnior · Soberania Individual</title>
        <meta name="description" content="Alfabetização monetária, autocustódia Bitcoin e estratégias de saída. A infraestrutura técnica e intelectual para quem decidiu parar de financiar o próprio roubo." />
        <link rel="canonical" href="https://lordjunnior.com.br/" />
        <meta property="og:title" content="Seu dinheiro está derretendo. A culpa não é do acaso." />
        <meta property="og:description" content="O manual que o sistema não quer que você leia. Alfabetização monetária, autocustódia e estratégias de saída do sistema fiat." />
        <meta property="og:url" content="https://lordjunnior.com.br/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lordjunnior.com.br/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Seu dinheiro está derretendo. A culpa não é do acaso." />
        <meta name="twitter:description" content="O manual que o sistema não quer que você leia. Alfabetização monetária, autocustódia e estratégias de saída." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <NetworkTicker />
      <CommandCenter />
      <SovereignTermModal />
      <NivelZero />
      <NoiseBackground />

      {/* ── CINEMATIC BACKGROUND — Radial glows + grain ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--gold)/0.1),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--chart-red)/0.06),_transparent_60%)]" />
        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px"
        }} />
      </div>

      {/* Dust Particles Atmosphere — with scroll parallax */}
      <motion.div
        style={{ y: dustY }}
        className="fixed inset-0 lg:left-[280px] pointer-events-none z-0 overflow-hidden opacity-60"
      >
        <div className="dust-layer-home"></div>
        <div className="dust-layer-home dust-layer-home-2"></div>
        <div className="dust-layer-home dust-layer-home-3"></div>
      </motion.div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes confiscoCardPulse { 0%,100%{box-shadow:0 0 0 rgba(220,38,38,0)} 50%{box-shadow:0 0 20px rgba(220,38,38,0.15)} }
        @keyframes driftHome {
          from { transform: translateY(0) translateX(0); }
          to { transform: translateY(-1000px) translateX(100px); }
        }
        .dust-layer-home {
          position: absolute; width: 100%; height: 200%;
          background-image:
            radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.4) 100%, transparent),
            radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,255,255,0.5) 100%, transparent),
            radial-gradient(2px 2px at 40% 70%, rgba(16,185,129,0.3) 100%, transparent),
            radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.4) 100%, transparent),
            radial-gradient(1.5px 1.5px at 80% 80%, rgba(255,255,255,0.3) 100%, transparent);
          background-size: 200px 200px;
          animation: driftHome 50s linear infinite;
        }
        .dust-layer-home-2 {
          background-size: 300px 300px;
          animation: driftHome 70s linear infinite;
          opacity: 0.7;
        }
        .dust-layer-home-3 {
          background-size: 400px 400px;
          animation: driftHome 100s linear infinite;
          opacity: 0.4;
        }
      `}</style>
      <AppSidebar />
      <MobileNav />

      {/* Main content with sidebar offset on desktop */}
      <div className="relative z-10 lg:ml-[280px] pb-10">
        <HeroSection />

        <NobelSection className="section-divider px-5 md:px-10 lg:px-14" delay={0.05}>
          <div className="max-w-6xl mx-auto">
            <SnippetBait
              text="Enquanto você lê este parágrafo, o Real perdeu mais poder de compra. A diferença entre quem preserva patrimônio e quem financia a própria ruína é uma decisão: aprender a blindar o que é seu."
              cta="Comece pela autocustódia →"
              href="/autocustodia"
            />
          </div>
        </NobelSection>

        {/* ── ACTION CARDS — IMAGE + TEXT BALANCED GRID ── */}
        <NobelSection className="section-divider px-5 md:px-10 lg:px-14" delay={0.05}>
          <div className="max-w-6xl mx-auto space-y-8">

            {/* BITCOIN ANÔNIMO — text left, image right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/comprar-bitcoin-com-privacidade"
                className="group relative block rounded-2xl border border-primary/15 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/35 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent z-10" />

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* TEXT — generous padding, proper leading */}
                  <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center">
                    <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
                    <div className="relative space-y-4">
                      <p className="font-mono text-[9px] tracking-[0.3em] text-destructive/70 uppercase">[ALERTA DE PRIVACIDADE]</p>
                      <h3 className="text-foreground font-bold text-2xl md:text-3xl lg:text-[2.2rem] tracking-tight leading-[1.3]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        QUER COMPRAR R$10 EM BTC?
                      </h3>
                      <p className="text-base text-muted-foreground leading-8">
                        Use a <span className="text-primary font-semibold">Wallet of Satoshi</span> e o protocolo <span className="text-primary font-semibold">RoboSats</span> para ficar fora do radar. Sem KYC, sem rastro.
                      </p>
                      <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-primary/10 border border-primary/25 text-primary text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 group-hover:bg-primary/20">
                        ACESSAR TUTORIAL
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* IMAGE — full bleed, proper min-height */}
                  <div className="relative min-h-[240px] md:min-h-[320px]">
                    <img src={cardBtcAnonimo} alt="Transação Lightning Bitcoin" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-card/30 to-transparent hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-b from-card/60 via-transparent to-transparent md:hidden" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-10" />
              </Link>
            </motion.div>

            {/* DÓLAR VIRTUAL — image left, text right (alternating rhythm) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/dolar-virtual"
                className="group relative block rounded-2xl border border-chart-green/15 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-chart-green/35 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-chart-green/40 to-transparent z-10" />

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* IMAGE (left on desktop) */}
                  <div className="relative min-h-[240px] md:min-h-[320px] order-1 md:order-none">
                    <img src={cardDolarVirtual} alt="Hardware wallet com LED verde" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-l from-card/80 via-card/30 to-transparent hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-b from-card/60 via-transparent to-transparent md:hidden" />
                  </div>

                  {/* TEXT (right on desktop) */}
                  <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center order-none md:order-1">
                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-chart-green/8 blur-3xl pointer-events-none" />
                    <div className="relative space-y-4">
                      <p className="font-mono text-[9px] tracking-[0.3em] text-chart-green/70 uppercase">[NOVO GUIA PRÁTICO]</p>
                      <h3 className="text-foreground font-bold text-2xl md:text-3xl lg:text-[2.2rem] tracking-tight leading-[1.3]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        COMO COMPRAR DÓLAR VIRTUAL (USDT)
                      </h3>
                      <p className="text-base text-muted-foreground leading-8">
                        <span className="text-chart-green font-semibold">Jade Wallet</span> + <span className="text-chart-green font-semibold">AlfredP2P</span> + Rede Liquid. Sem corretora, sem KYC, com hardware wallet.
                      </p>
                      <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-chart-green/10 border border-chart-green/25 text-chart-green text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 group-hover:bg-chart-green/20">
                        ACESSAR TUTORIAL
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-chart-green/20 to-transparent z-10" />
              </Link>
            </motion.div>

            {/* PIX SEM BANCO — PREMIUM HIGHLIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/soberania-financeira/pix-sem-banco"
                className="group relative block rounded-2xl overflow-hidden transition-all duration-500"
              >
                {/* Animated gradient border */}
                <div className="absolute -inset-[1px] rounded-2xl z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'conic-gradient(from 0deg, hsl(var(--gold)), hsl(var(--chart-green)), hsl(var(--primary)), hsl(var(--gold)))',
                    animation: 'spin 4s linear infinite',
                  }}
                />

                {/* Inner card */}
                <div className="relative z-10 rounded-2xl bg-card/95 backdrop-blur-md">
                  {/* Pulsing glow overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-chart-green/10 via-transparent to-gold/10 animate-pulse pointer-events-none" />

                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* TEXT */}
                    <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center">
                      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-chart-green/10 blur-3xl pointer-events-none" />
                      <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-gold/8 blur-3xl pointer-events-none" />
                      <div className="relative space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/15 border border-destructive/30">
                          <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                          <p className="font-mono text-[9px] tracking-[0.3em] text-destructive uppercase">ALERTA URGENTE</p>
                        </div>
                        <h3 className="text-foreground font-bold text-2xl md:text-3xl lg:text-[2.5rem] tracking-tight leading-[1.2]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          RECEBA PIX SEM BANCO — <br className="hidden md:block" />
                          <span className="text-chart-green">SEU DINHEIRO, SUAS REGRAS</span>
                        </h3>
                        <p className="text-base text-muted-foreground leading-8">
                          Você ainda depende de banco para receber Pix? Existe um método que transforma qualquer pessoa em <span className="text-chart-green font-semibold">seu próprio banco</span>. Sem bloqueios, sem limites, sem vigilância.
                        </p>
                        <span className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-gradient-to-r from-chart-green/20 to-gold/15 border border-chart-green/30 text-chart-green text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 group-hover:from-chart-green/30 group-hover:to-gold/25 group-hover:border-chart-green/50 group-hover:shadow-[0_0_30px_-5px_hsl(var(--chart-green)/0.3)]">
                          VER PROTOCOLO COMPLETO
                          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                        </span>
                      </div>
                    </div>

                    {/* IMAGE */}
                    <div className="relative min-h-[260px] md:min-h-[360px]">
                      <img src={cardPixSemBanco} alt="QR Code Pix descentralizado sobre cédulas brasileiras" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-r from-card/90 via-card/40 to-transparent hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-b from-card/70 via-transparent to-transparent md:hidden" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* CONFISCO BITCOIN — CARD DE IMPACTO MÁXIMO */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/alertas/protecao-patrimonial-bitcoin"
                className="group relative block rounded-2xl overflow-hidden transition-all duration-500"
              >
                {/* Animated RED gradient border */}
                <div className="absolute -inset-[1px] rounded-2xl z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'conic-gradient(from 0deg, hsl(0 72% 50%), hsl(30 90% 50%), hsl(0 72% 50%), hsl(350 80% 40%), hsl(0 72% 50%))',
                    animation: 'spin 3s linear infinite',
                  }}
                />

                {/* Inner card */}
                <div className="relative z-10 rounded-2xl bg-card/95 backdrop-blur-md">
                  {/* Screaming red glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-destructive/10 via-transparent to-destructive/5 pointer-events-none" />
                  <div className="absolute inset-0 rounded-2xl animate-pulse bg-[radial-gradient(ellipse_at_top_left,_rgba(220,38,38,0.08),_transparent_60%)] pointer-events-none" />

                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* IMAGE (left) */}
                    <div className="relative min-h-[260px] md:min-h-[380px] order-1 md:order-none">
                      <img src={cardConfiscoBtc} alt="Bitcoin hardware wallet sendo confiscada" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1024} height={768} />
                      <div className="absolute inset-0 bg-gradient-to-l from-card/90 via-card/40 to-transparent hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-b from-card/70 via-transparent to-transparent md:hidden" />
                      {/* Red scanline effect */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220,38,38,0.03) 2px, rgba(220,38,38,0.03) 4px)',
                      }} />
                    </div>

                    {/* TEXT (right) */}
                    <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center order-none md:order-1">
                      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-destructive/8 blur-3xl pointer-events-none" />
                      <div className="relative space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/15 border border-destructive/30" style={{ animation: 'confiscoCardPulse 2s ease-in-out infinite' }}>
                          <Skull className="w-3.5 h-3.5 text-destructive" />
                          <p className="font-mono text-[9px] tracking-[0.3em] text-destructive uppercase font-bold">CONFISCO DIGITAL · ALERTA GLOBAL</p>
                        </div>
                        <h3 className="text-foreground font-bold text-2xl md:text-3xl lg:text-[2.5rem] tracking-tight leading-[1.15]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          NOVA LEI PERMITE GOVERNO{" "}
                          <span className="text-destructive">TOMAR</span> BITCOINS
                        </h3>
                        <p className="text-base text-muted-foreground leading-8">
                          Hong Kong criminalizou a recusa em entregar chaves privadas. O Brasil aperta o cerco com IOF e reporte diário.{" "}
                          <span className="text-foreground font-semibold">Veja como se proteger agora.</span>
                        </p>
                        <span className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 group-hover:bg-destructive/20 group-hover:border-destructive/50 group-hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.3)]">
                          <ShieldAlert className="w-4 h-4" />
                          VER PROTOCOLO DE PROTEÇÃO
                          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* PIX ANÔNIMO — CARD DE PRIVACIDADE */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/pix-privacidade"
                className="group relative block rounded-2xl overflow-hidden transition-all duration-500"
              >
                <div className="absolute -inset-[1px] rounded-2xl z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'conic-gradient(from 0deg, hsl(var(--chart-green)), hsl(var(--primary)), hsl(var(--gold)), hsl(var(--chart-green)))',
                    animation: 'spin 4s linear infinite',
                  }}
                />

                <div className="relative z-10 rounded-2xl bg-card/95 backdrop-blur-md">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-chart-green/8 via-transparent to-primary/5 pointer-events-none" />

                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* IMAGE (left) */}
                    <div className="relative min-h-[260px] md:min-h-[360px]">
                      <img src={cardPixAnonimo} alt="Terminal de pagamento com QR Code PIX protegido" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1024} height={768} />
                      <div className="absolute inset-0 bg-gradient-to-l from-card/90 via-card/40 to-transparent hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-b from-card/70 via-transparent to-transparent md:hidden" />
                    </div>

                    {/* TEXT (right) */}
                    <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center">
                      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-chart-green/8 blur-3xl pointer-events-none" />
                      <div className="relative space-y-5">
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-chart-green/15 border border-chart-green/30">
                            <span className="w-2 h-2 rounded-full bg-chart-green animate-pulse" />
                            <p className="font-mono text-[9px] tracking-[0.3em] text-chart-green uppercase font-bold">Privacidade Ativa</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 font-mono text-[9px] tracking-[0.3em] uppercase font-bold">
                            Novo
                          </span>
                        </div>
                        <h3 className="text-foreground font-bold text-2xl md:text-3xl lg:text-[2.5rem] tracking-tight leading-[1.15]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          RECEBA PIX SEM{" "}
                          <span className="text-chart-green">MOSTRAR SEUS DADOS</span>
                        </h3>
                        <p className="text-base text-muted-foreground leading-8">
                          Seu nome, CPF e banco aparecem toda vez que alguem te paga via PIX.
                          Existe um metodo tecnico com script PHP e API de pagamento que oculta seus dados do pagador.{" "}
                          <span className="text-foreground font-semibold">Aprenda a configurar do zero.</span>
                        </p>
                        <span className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-chart-green/10 border border-chart-green/30 text-chart-green text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 group-hover:bg-chart-green/20 group-hover:border-chart-green/50 group-hover:shadow-[0_0_30px_-5px_hsl(var(--chart-green)/0.3)]">
                          <QrCode className="w-4 h-4" />
                          VER METODO COMPLETO
                          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* MULTISIG BITCOIN — CARD DE SEGURANCA */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* JADE CORE REVIEW — Novo hook */}
              <Link
                to="/autocustodia/jade-core-review"
                className="group relative block rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-500 mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative min-h-[260px] md:min-h-[340px]">
                    <img src={jadeCoreHook} alt="Jade Core, novo hardware wallet Bitcoin da Blockstream" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1920} height={1280} />
                    <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-card/20 to-transparent hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-b from-card/60 via-transparent to-transparent md:hidden" />
                  </div>
                  <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center">
                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                    <div className="relative space-y-4">
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-[9px] tracking-[0.3em] text-primary uppercase">[ REVIEW 2026 ]</p>
                        <span className="px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary font-mono text-[9px] tracking-[0.3em] uppercase font-bold">Novo</span>
                      </div>
                      <h3 className="text-foreground font-bold text-2xl md:text-3xl lg:text-[2.2rem] tracking-tight leading-[1.2]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        SAIA DA GAIOLA FIAT EM <span className="text-primary">5 MINUTOS</span>
                      </h3>
                      <p className="text-base text-muted-foreground leading-8">
                        Jade Core, o novo hardware wallet de entrada da Blockstream. <span className="text-foreground font-semibold">Segurança de verdade, sem curva técnica.</span> Manual passo a passo, comparativo com Ledger, Trezor e ColdCard.
                      </p>
                      <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 group-hover:bg-primary/20">
                        LER O REVIEW COMPLETO
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                to="/multisig-bitcoin"
                className="group relative block rounded-2xl overflow-hidden transition-all duration-500"
              >
                <div className="absolute -inset-[1px] rounded-2xl z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'conic-gradient(from 0deg, hsl(var(--gold)), hsl(var(--primary)), hsl(var(--gold)))',
                    animation: 'spin 4s linear infinite',
                  }}
                />

                <div className="relative z-10 rounded-2xl bg-card/95 backdrop-blur-md">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/8 via-transparent to-primary/5 pointer-events-none" />

                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* IMAGE (left) */}
                    <div className="relative min-h-[260px] md:min-h-[360px] order-1 md:order-none">
                      <img src={cardMultisig} alt="Hardware wallets conectadas em formacao Multisig" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1024} height={768} />
                      <div className="absolute inset-0 bg-gradient-to-l from-card/90 via-card/40 to-transparent hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-b from-card/70 via-transparent to-transparent md:hidden" />
                    </div>

                    {/* TEXT (right) */}
                    <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center order-none md:order-1">
                      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gold/8 blur-3xl pointer-events-none" />
                      <div className="relative space-y-5">
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/30">
                            <Shield className="w-3.5 h-3.5 text-gold" />
                            <p className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase font-bold">Autocustodia Avancada</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 font-mono text-[9px] tracking-[0.3em] uppercase font-bold">
                            Novo
                          </span>
                        </div>
                        <h3 className="text-foreground font-bold text-2xl md:text-3xl lg:text-[2.5rem] tracking-tight leading-[1.15]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          UMA UNICA SEED PHRASE E UM{" "}
                          <span className="text-gold">PONTO UNICO DE FALHA</span>
                        </h3>
                        <p className="text-base text-muted-foreground leading-8">
                          Se sua casa pega fogo, se alguem te ameaca, se voce esquece onde guardou: com Single-Sig, acabou.{" "}
                          <span className="text-foreground font-semibold">Multisig elimina esse risco com multiplas chaves independentes.</span>
                        </p>
                        <span className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 group-hover:bg-gold/20 group-hover:border-gold/50 group-hover:shadow-[0_0_30px_-5px_hsl(var(--gold)/0.3)]">
                          ENTENDER MULTISIG
                          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* CARD — Nova Lei da Conta Corrente */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/alertas/nova-lei-conta-corrente"
                className="group relative block rounded-2xl overflow-hidden transition-all duration-500"
              >
                <div className="absolute -inset-[1px] rounded-2xl z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'conic-gradient(from 0deg, hsl(0 72% 50%), hsl(30 90% 55%), hsl(45 90% 55%), hsl(0 72% 50%))',
                    animation: 'spin 5s linear infinite',
                  }}
                />

                <div className="relative z-10 rounded-2xl bg-card/95 backdrop-blur-md">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-destructive/8 via-transparent to-gold/5 pointer-events-none" />

                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* TEXT (left) */}
                    <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center">
                      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-destructive/8 blur-3xl pointer-events-none" />
                      <div className="relative space-y-5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/15 border border-destructive/30" style={{ animation: 'confiscoCardPulse 2s ease-in-out infinite' }}>
                            <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                            <p className="font-mono text-[9px] tracking-[0.3em] text-destructive uppercase font-bold">Alerta Patrimonial &middot; Maio 2026</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 font-mono text-[9px] tracking-[0.3em] uppercase font-bold">
                            Novo
                          </span>
                        </div>
                        <h3 className="text-foreground font-bold text-2xl md:text-3xl lg:text-[2.5rem] tracking-tight leading-[1.15]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          NOVA LEI DA CONTA CORRENTE:{" "}
                          <span className="text-gold">SEU DINHEIRO ESTA EM RISCO</span>
                        </h3>
                        <p className="text-base text-muted-foreground leading-8">
                          A maior reorganizacao bancaria da decada entra em vigor em maio.{" "}
                          <span className="text-foreground font-semibold">A midia nao falou. Quatro mudancas silenciosas reescrevem regras de penhora, sigilo e credito.</span>
                        </p>
                        <span className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 group-hover:bg-destructive/20 group-hover:border-destructive/50 group-hover:shadow-[0_0_30px_-5px_hsl(var(--destructive)/0.3)]">
                          ENTENDER A AMEACA
                          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                        </span>
                      </div>
                    </div>

                    {/* IMAGE (right) */}
                    <div className="relative min-h-[260px] md:min-h-[360px] order-first md:order-last">
                      <img src={cardLeiConta} alt="Torre bancaria com farol vermelho de alerta e contrato em chamas" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1280} height={800} />
                      <div className="absolute inset-0 bg-gradient-to-r from-card/90 via-card/40 to-transparent hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-b from-card/70 via-transparent to-transparent md:hidden" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

        </NobelSection>

        <NobelSection className="section-divider" delay={0.05}>
          <AlertBanner />
        </NobelSection>

        {/* ── HOT NEWS HOOK: Bybit + Binance reportam brasileiros ── */}
        <NobelSection className="section-divider px-5 md:px-10 lg:px-14" delay={0.05}>
          <div className="max-w-6xl mx-auto">
            <Link
              to="/soberania-financeira/exchanges-privacidade-e-kyc/bybit-binance-reportam-brasileiros"
              className="group block rounded-2xl overflow-hidden border transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: '#0e3b3a', borderColor: 'rgba(232,163,107,0.35)' }}
            >
              <div className="grid md:grid-cols-[1.1fr,1fr]">
                <div className="p-7 md:p-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full mb-5"
                    style={{ backgroundColor: 'rgba(232,163,107,0.15)', border: '1px solid rgba(232,163,107,0.35)' }}>
                    <ShieldAlert size={14} style={{ color: '#ffb37a' }} />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: '#ffb37a' }}>
                      Notícia quente · 2026
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black leading-[1.05] mb-4"
                    style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}>
                    Bybit e Binance{' '}
                    <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>
                      passaram a reportar brasileiros.
                    </span>
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed mb-6 font-light" style={{ color: 'rgba(244,237,228,0.82)' }}>
                    Quais são as alternativas reais que ainda funcionam, como blindar seu patrimônio em camadas e qual janela ainda está aberta antes da próxima fechar.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1" style={{ color: '#ffb37a' }}>
                    Ler análise completa <ArrowRight size={16} />
                  </span>
                </div>
                <div className="relative h-56 md:h-auto min-h-[260px] overflow-hidden order-first md:order-last">
                  <img
                    src={bybitBinanceHook}
                    alt="Globo terrestre representando o Brasil envolto em malha de vigilância digital"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'brightness(0.85) saturate(1.05)' }}
                  />
                  <div className="absolute inset-0 md:bg-gradient-to-r md:from-[#0e3b3a] md:via-transparent md:to-transparent" />
                </div>
              </div>
            </Link>
          </div>
        </NobelSection>

        {/* ── HOT NEWS HOOK: Por que os ricos não investem em FIIs ── */}
        <NobelSection className="section-divider px-5 md:px-10 lg:px-14" delay={0.05}>
          <div className="max-w-6xl mx-auto">
            <Link
              to="/mercado-tradicional/ricos-nao-investem-fiis"
              className="group block rounded-2xl overflow-hidden border transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: '#faf6f0', borderColor: 'rgba(196,99,42,0.35)' }}
            >
              <div className="grid md:grid-cols-[1fr,1.1fr]">
                <div className="relative h-56 md:h-auto min-h-[260px] overflow-hidden">
                  <img
                    src={fiisHook}
                    alt="Jornal financeiro sobre mesa de mármore com óculos de leitura e xícara de café espresso, retrato do investidor analisando o mercado"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'brightness(0.92) saturate(1.05)' }}
                  />
                  <div className="absolute inset-0 md:bg-gradient-to-l md:from-[#faf6f0] md:via-transparent md:to-transparent" />
                </div>
                <div className="p-7 md:p-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full mb-5"
                    style={{ backgroundColor: 'rgba(196,99,42,0.12)', border: '1px solid rgba(196,99,42,0.35)' }}>
                    <AlertTriangle size={14} style={{ color: '#c4632a' }} />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: '#c4632a' }}>
                      Mercado tradicional · Análise viral
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black leading-[1.05] mb-4"
                    style={{ fontFamily: "'Inter Tight', sans-serif", color: '#171612' }}>
                    Por que os ricos{' '}
                    <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>
                      não investem em FIIs?
                    </span>
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed mb-6 font-light" style={{ color: '#3a3a3a' }}>
                    74% dos cotistas são pessoa física. A manchete sugere conspiração. A verdade é outra: liquidez, escala e o motivo real de a baleia ficar fora dessa piscina.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1" style={{ color: '#c4632a' }}>
                    Ler análise completa <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </NobelSection>

        <NobelSection id="manifesto" className="section-divider">
          <ManifestoSection />
        </NobelSection>

        <NobelSection className="section-alt section-divider" delay={0.1}>
          <ConfiscoTimeline />
        </NobelSection>

        <NobelSection className="section-divider section-padding py-12 md:py-16" delay={0.05}>
          <div className="max-w-3xl mx-auto">
            <QuoteCarousel />
          </div>
        </NobelSection>

        <NobelSection id="pix-crypto" className="section-alt section-divider" delay={0.1}>
          <PixBitcoinSection />
        </NobelSection>

        <NobelSection id="ferramentas" className="section-divider" delay={0.1}>
          <ToolsSection />
        </NobelSection>

        <NobelSection id="educacao" className="section-alt section-divider" delay={0.1}>
          <KnowledgeSection />
        </NobelSection>

        <NobelSection id="audioteca" className="section-divider" delay={0.1}>
          <AudiotecaSection />
        </NobelSection>

        <NobelSection id="faq" className="section-alt section-divider" delay={0.1}>
          <FaqSection />
        </NobelSection>

        <NobelSection className="section-divider px-5 md:px-10 lg:px-14" delay={0.1}>
          <div className="max-w-6xl mx-auto">
            <RapeHookCard variant="home" />
          </div>
        </NobelSection>

        <NobelSection className="section-divider" delay={0.1}>
          <WhyBitcoinSection />
        </NobelSection>

        <NobelSection className="section-alt section-divider" delay={0.1}>
          <StrategicSignature />
        </NobelSection>

        <NobelSection className="section-divider section-padding" delay={0.15}>
          <div className="max-w-5xl mx-auto">
            <RiskBlock
              title="Sem esta base, o que acontece?"
              showImage
              consequences={[
                "Dependência total de intermediários financeiros que podem bloquear seu acesso a qualquer momento.",
                "Patrimônio exposto à desvalorização monetária contínua sem nenhuma camada de proteção.",
                "Incapacidade de operar fora do sistema convencional em cenários de restrição ou colapso.",
                "Conhecimento fragmentado que não se converte em ação prática nem em transmissão familiar.",
                "Vulnerabilidade alimentar, energética e informacional em eventos de ruptura sistêmica.",
              ]}
            />
          </div>
        </NobelSection>

        <NobelSection className="section-divider" delay={0.1}>
          <FutureStateSection />
        </NobelSection>

        <NobelSection className="section-alt section-divider" delay={0.1}>
          <BitcoinInsightsSection />
        </NobelSection>

        <NobelSection className="section-divider" delay={0.1}>
          <ClosingManifesto />
        </NobelSection>

        <NobelSection id="apoio" className="section-alt section-divider" delay={0.1}>
          <FooterSection />
        </NobelSection>
      </div>
    </div>
  );
};

export default Index;
