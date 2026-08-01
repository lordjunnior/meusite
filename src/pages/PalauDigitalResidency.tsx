import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Compass,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Wallet,
  Globe2,
  KeyRound,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BackToHome from "@/components/BackToHome";

import heroImg from "@/assets/palau-v5-hero.jpg";
import clarityImg from "@/assets/palau-v5-clarity.jpg";
import exchangeImg from "@/assets/palau-v5-exchange.jpg";
import neobankImg from "@/assets/palau-v5-neobank.jpg";
import islandImg from "@/assets/palau-v5-island.jpg";
import bankImg from "@/assets/palau-v5-bank.jpg";
import ctaImg from "@/assets/palau-v5-cta.jpg";
import carousel1 from "@/assets/palau-v6-carousel-1.jpg";
import carousel2 from "@/assets/palau-v6-carousel-2.jpg";
import carousel3 from "@/assets/palau-v6-carousel-3.jpg";
import carousel4 from "@/assets/palau-v6-carousel-4.jpg";
import textureBg from "@/assets/palau-v6-texture.jpg";
import mapImg from "@/assets/palau-v6-map.jpg";
import vigilanciaImg from "@/assets/palau-checkin-vigilancia.jpg";
import cofreImg from "@/assets/palau-cofre-multiplo.jpg";
import balaPrataImg from "@/assets/palau-nao-bala-prata.jpg";
import passoImg from "@/assets/palau-passo-a-passo.jpg";
import personasImg from "@/assets/palau-personas.jpg";
import cebolaImg from "@/assets/palau-cebola-camadas.jpg";

/* ────────────────────────────────────────────────
   PALAU, EDITORIAL EDITION (v6)
   Backgrounds trabalhados + carrossel + hovers cinema
   ──────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

const carouselSlides = [
  {
    img: carousel1,
    eyebrow: "Documento Soberano",
    title: "Identidade emitida por Estado",
    text: "Cartão físico oficial, emitido pela República de Palau, reconhecida como Estado soberano no sistema internacional.",
    accent: "Documento Oficial",
  },
  {
    img: carousel2,
    eyebrow: "Mercado Cripto",
    title: "Onboarding em exchanges globais",
    text: "Coinbase, Bitget, Gate.io, KuCoin, CEX.IO, MEXC, utilidade real em verificação internacional sujeita a compliance.",
    accent: "6+ Plataformas",
  },
  {
    img: carousel3,
    eyebrow: "Serviços Financeiros",
    title: "Neobanks & fintechs internacionais",
    text: "Kingdom Bank, Vexel, Ultimopay, Blackcatcard, alternativas para operação financeira sem dependência exclusiva da jurisdição de origem.",
    accent: "Acesso Global",
  },
  {
    img: carousel4,
    eyebrow: "Refúgio Estratégico",
    title: "Palau no Pacífico",
    text: "Estado soberano com estrutura jurídica própria, reconhecimento internacional e processo digital de emissão.",
    accent: "Estado Independente",
  },
];

const PalauDigitalResidency = () => {
  const heroRef = useRef<HTMLElement>(null);
  const islandRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselDir, setCarouselDir] = useState(0);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOverlayOpacity = useTransform(heroScroll, [0, 1], [0.45, 0.85]);
  const heroTitleY = useTransform(heroScroll, [0, 1], ["0%", "-12%"]);

  const { scrollYProgress: islandScroll } = useScroll({
    target: islandRef,
    offset: ["start end", "end start"],
  });
  const islandY = useTransform(islandScroll, [0, 1], ["-15%", "20%"]);

  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaY = useTransform(ctaScroll, [0, 1], ["-10%", "10%"]);

  // Reveal observer
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add("is-in");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const t = setInterval(() => {
      setCarouselDir(1);
      setCarouselIndex((i) => (i + 1) % carouselSlides.length);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  const goCarousel = (dir: number) => {
    setCarouselDir(dir);
    setCarouselIndex((i) => (i + dir + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <>
      <Helmet>
        <title>ID de Palau, Identidade Soberana Internacional | Lord Junnior</title>
        <meta
          name="description"
          content="ID de Palau na prática: como tirar online, onde funciona (Coinbase, Bitget, Gate.io, neobanks), o que NÃO resolve e por que ele é uma camada de privacidade, não uma fortaleza."
        />
        <meta property="og:title" content="ID de Palau: Privacidade Documental para Brasileiros" />
        <meta property="og:description" content="O guia honesto sobre o Palau ID: onde funciona, onde falha, e como usá-lo sem cair na ilusão de bala de prata." />
        <link rel="canonical" href="https://lordjunnior.com.br/palau-id" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type":"Question","name":"O ID de Palau protege contra Gov.br e check-in obrigatório de hotel?","acceptedAnswer":{"@type":"Answer","text":"Não diretamente. Hotéis brasileiros, por lei, fazem check-in vinculado ao seu CPF e documento nacional. O ID de Palau ajuda em cadastros internacionais, exchanges e neobanks fora do Brasil, não substitui a identificação obrigatória dentro do território nacional."}},
            {"@type":"Question","name":"Palau ID substitui a cédula paraguaia?","acceptedAnswer":{"@type":"Answer","text":"Não. A cédula paraguaia é residência efetiva, muda domicílio fiscal e abre bancos. O Palau ID é uma camada documental adicional, sem residência física e sem mudar reporte CRS."}},
            {"@type":"Question","name":"O ID de Palau é reconhecido pela União Europeia?","acceptedAnswer":{"@type":"Answer","text":"Hoje é aceito em parte do mercado cripto e neobank. O reconhecimento institucional pode mudar no futuro: a UE e outros blocos podem pressionar pequenas jurisdições. Trate como ferramenta tática, não como fortaleza permanente."}},
            {"@type":"Question","name":"Posso fazer check-in de hotel internacional com Palau ID?","acceptedAnswer":{"@type":"Answer","text":"Há relatos positivos em estadias e reservas em determinados países. A aceitação varia por hotel e legislação local. No Brasil, o check-in pelo app Gov.br exige CPF, então Palau ID não substitui."}},
            {"@type":"Question","name":"Quanto custa o Palau ID e como pagar com privacidade?","acceptedAnswer":{"@type":"Answer","text":"Planos a partir de USD 248 (1 ano), USD 1.000 (5 anos) e USD 2.000 (10 anos). O pagamento em cripto é o caminho recomendado para não vincular rastro financeiro do banco brasileiro ao seu novo documento."}},
            {"@type":"Question","name":"Para quem o Palau ID NÃO serve?","acceptedAnswer":{"@type":"Answer","text":"Não serve para mudar residência fiscal, abrir banco tradicional, viajar internacionalmente ou ser plano B de fuga. Para esses casos, vá direto para Paraguai, Panamá, Uruguai ou outro segundo passaporte real."}}
          ]
        })}</script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <style>{`
        .palau-v6 {
          /* ─── Nova paleta solicitada ─── */
          --yellow: #F3E308;          /* acento principal, substitui terracotta */
          --yellow-soft: #FFF06A;
          --mist: #B8BFC1;            /* cinza-claro, fundo principal */
          --mist-soft: #CFD4D6;
          --mist-deep: #A2AAAD;
          --mist-warm: #C7CDCF;
          --steel: #6C8494;           /* azul-acinzentado, tons médios */
          --steel-soft: #8A9DAA;
          --abyss: #2C4C5C;           /* azul-escuro, tinta principal */
          --abyss-deep: #1F3845;

          /* ─── Aliases para manter compatibilidade com a estrutura existente ─── */
          --cream: var(--mist);
          --cream-soft: var(--mist-soft);
          --cream-deep: var(--mist-deep);
          --cream-warm: var(--mist-warm);
          --terracotta: var(--yellow);
          --terracotta-soft: var(--yellow-soft);
          --clay: var(--steel-soft);
          --navy: var(--abyss);
          --navy-soft: var(--steel);
          --ink: var(--abyss);
          --ink-soft: var(--steel);
          --gold: var(--yellow);
          --line: rgba(44, 76, 92, 0.14);
          --line-strong: rgba(44, 76, 92, 0.28);
        }
        .palau-v6 {
          background: var(--mist);
          color: var(--abyss);
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 400;
          letter-spacing: -0.005em;
        }
        .palau-v6 .display { font-family: 'Space Grotesk', sans-serif; font-weight: 700; letter-spacing: -0.025em; line-height: 0.92; }
        .palau-v6 .display-italic { font-family: 'Space Grotesk', sans-serif; font-style: italic; font-weight: 500; letter-spacing: -0.015em; }
        .palau-v6 .eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; }
        .palau-v6 .body-lg { font-size: clamp(1.05rem, 1.4vw, 1.35rem); line-height: 1.65; font-weight: 300; color: var(--ink-soft); }
        .palau-v6 .body { font-size: 1rem; line-height: 1.75; font-weight: 400; color: var(--ink-soft); }
        .palau-v6 .body-sm { font-size: 0.9rem; line-height: 1.7; font-weight: 400; color: var(--ink-soft); }

        /* ═══ BACKGROUNDS TRABALHADOS ═══ */
        /* Grain noise overlay */
        .palau-v6 .grain::before {
          content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
          background-size: 220px 220px;
          opacity: 0.15;
          mix-blend-mode: multiply;
        }
        /* Mist (cinza-claro) texture base */
        .palau-v6 .bg-cream-tex {
          position: relative;
          background:
            radial-gradient(ellipse 90% 60% at 80% 10%, rgba(243,227,8,0.20) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 10% 100%, rgba(44,76,92,0.14) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(108,132,148,0.10) 0%, transparent 70%),
            linear-gradient(180deg, var(--mist-warm) 0%, var(--mist) 50%, var(--mist-soft) 100%);
        }
        .palau-v6 .bg-cream-deep {
          position: relative;
          background:
            radial-gradient(ellipse 80% 70% at 20% 20%, rgba(243,227,8,0.16) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 100% 100%, rgba(44,76,92,0.20) 0%, transparent 55%),
            linear-gradient(135deg, var(--mist-soft) 0%, var(--mist-deep) 100%);
        }
        .palau-v6 .bg-navy-tex {
          position: relative;
          background:
            radial-gradient(ellipse 80% 60% at 30% 30%, rgba(243,227,8,0.18) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 90% 90%, rgba(108,132,148,0.24) 0%, transparent 50%),
            linear-gradient(160deg, #1F3845 0%, var(--abyss) 50%, #16323F 100%);
        }
        .palau-v6 .bg-paper {
          position: relative;
          background:
            radial-gradient(ellipse 100% 80% at 50% 0%, rgba(243,227,8,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 0% 100%, rgba(44,76,92,0.14) 0%, transparent 55%),
            linear-gradient(135deg, var(--mist-warm) 0%, var(--mist) 60%, var(--mist-soft) 100%);
          background-size: cover;
          background-position: center;
        }
        .palau-v6 .bg-paper::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 70% at 50% 0%, rgba(243,227,8,0.10) 0%, transparent 60%),
            linear-gradient(180deg, rgba(184,191,193,0.20) 0%, rgba(184,191,193,0.0) 50%, rgba(162,170,173,0.28) 100%);
        }

        .palau-v6 .reveal { opacity: 0; transform: translateY(36px); transition: opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1); }
        .palau-v6 .reveal.is-in { opacity: 1; transform: none; }
        .palau-v6 .reveal.delay-1 { transition-delay: 0.12s; }
        .palau-v6 .reveal.delay-2 { transition-delay: 0.24s; }
        .palau-v6 .reveal.delay-3 { transition-delay: 0.36s; }

        /* Premium button */
        .palau-v6 .btn-primary {
          position: relative; overflow: hidden; isolation: isolate;
          display: inline-flex; align-items: center; gap: 0.85rem;
          padding: 1.15rem 2.4rem;
          background: var(--ink); color: var(--cream);
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          border-radius: 999px;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .palau-v6 .btn-primary::before {
          content: ''; position: absolute; inset: 0; z-index: -1;
          background: var(--terracotta);
          transform: translateY(101%);
          transition: transform 0.5s cubic-bezier(0.65,0,0.35,1);
        }
        .palau-v6 .btn-primary:hover { transform: translateY(-3px); }
        .palau-v6 .btn-primary:hover::before { transform: translateY(0); }

        .palau-v6 .btn-ghost {
          position: relative; overflow: hidden; isolation: isolate;
          display: inline-flex; align-items: center; gap: 0.85rem;
          padding: 1.15rem 2.4rem;
          background: transparent; color: var(--ink);
          border: 1px solid var(--line-strong);
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          border-radius: 999px;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .palau-v6 .btn-ghost:hover { background: var(--ink); color: var(--cream); border-color: var(--ink); transform: translateY(-3px); }

        /* Marquee */
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .palau-v6 .marquee-track { animation: marquee 38s linear infinite; }

        /* ═══ HOVER CINEMATOGRÁFICO ═══ */
        .palau-v6 .card-app {
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s;
          will-change: transform;
        }
        .palau-v6 .card-app:hover { transform: translateY(-10px); box-shadow: 0 40px 80px -25px rgba(26,22,20,0.28); }
        .palau-v6 .card-app .card-img { transition: transform 1.1s cubic-bezier(0.22,1,0.36,1), filter 0.6s; }
        .palau-v6 .card-app:hover .card-img { transform: scale(1.08); filter: brightness(1.05) saturate(1.05); }
        .palau-v6 .card-app .reveal-line {
          position: absolute; bottom: 0; left: 0; height: 3px; width: 0;
          background: var(--terracotta);
          transition: width 0.6s cubic-bezier(0.22,1,0.36,1);
          z-index: 4;
        }
        .palau-v6 .card-app:hover .reveal-line { width: 100%; }

        /* ═══ TILT/REVEAL CARDS ═══ */
        .palau-v6 .tilt-card {
          position: relative; overflow: hidden;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .palau-v6 .tilt-card:hover { transform: translateY(-6px) rotate(-0.4deg); }
        .palau-v6 .tilt-card .corner-mark {
          position: absolute; top: 0.9rem; right: 0.9rem;
          width: 28px; height: 28px; border-top: 1px solid var(--terracotta); border-right: 1px solid var(--terracotta);
          opacity: 0; transform: translate(-6px, 6px);
          transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .palau-v6 .tilt-card:hover .corner-mark { opacity: 1; transform: translate(0,0); }

        /* Number ticker */
        .palau-v6 .num-mega {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(8rem, 22vw, 22rem);
          font-weight: 300; line-height: 0.85;
          color: var(--terracotta); letter-spacing: -0.04em;
        }

        /* FAQ */
        .palau-v6 details { border-bottom: 1px solid var(--line); transition: background 0.3s; }
        .palau-v6 details:hover { background: rgba(184,89,58,0.025); }
        .palau-v6 details summary { list-style: none; cursor: pointer; padding: 1.6rem 1rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; }
        .palau-v6 details summary::-webkit-details-marker { display: none; }
        .palau-v6 details[open] .faq-icon { transform: rotate(180deg); background: var(--terracotta); border-color: var(--terracotta); color: var(--cream); }
        .palau-v6 .faq-icon { transition: all 0.35s cubic-bezier(0.22,1,0.36,1); }

        /* Carousel */
        .palau-v6 .carousel-shell {
          position: relative; overflow: hidden; border-radius: 4px;
          box-shadow: 0 40px 100px -30px rgba(26,22,20,0.35);
        }
        .palau-v6 .carousel-dot {
          width: 36px; height: 2px; background: rgba(244,238,226,0.25);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1); cursor: pointer;
        }
        .palau-v6 .carousel-dot.active { background: var(--terracotta); width: 64px; }

        /* Stack visual */
        .palau-v6 .stack-img {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1), box-shadow 0.7s;
        }
        .palau-v6 .stack-group:hover .stack-img-1 { transform: rotate(-6deg) translate(-12px, -8px); }
        .palau-v6 .stack-group:hover .stack-img-2 { transform: rotate(2deg) translate(8px, 4px); }
        .palau-v6 .stack-group:hover .stack-img-3 { transform: rotate(8deg) translate(20px, 10px); }
      `}</style>

      <main className="palau-v6 min-h-screen">
        {/* ════════ HERO, FULL BLEED EDITORIAL ════════ */}
        <section ref={heroRef} className="relative h-[100vh] min-h-[720px] overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: heroImgY }}>
            <img src={heroImg} alt="ID de Palau sobre mapa do Pacífico" className="w-full h-full object-cover" style={{ transform: "scale(1.15)" }} fetchPriority="high" loading="lazy" decoding="async" />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-[1]"
            style={{
              opacity: heroOverlayOpacity,
              background:
                "linear-gradient(180deg, rgba(244,238,226,0.2) 0%, rgba(244,238,226,0.05) 35%, rgba(244,238,226,0.7) 80%, rgba(244,238,226,0.98) 100%)",
            }}
          />

          {/* Grain overlay on hero */}
          <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.18] mix-blend-multiply"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`, backgroundSize: '220px 220px' }}
          />

          <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-16 py-7 flex items-center justify-between">
            <Link to="/" className="eyebrow text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors">
              Lord Junnior · Soberania
            </Link>
            <div className="hidden md:flex items-center gap-8 eyebrow text-[var(--ink-soft)]">
              <span>Vol. 03</span>
              <span>2026</span>
              <span className="text-[var(--terracotta)]">Identidade Internacional</span>
            </div>
          </div>

          <motion.div
            className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 md:pb-24"
            style={{ y: heroTitleY }}
          >
            <div className="max-w-[1500px] mx-auto w-full">
              <div className="grid grid-cols-12 gap-6 items-end">
                <div className="col-span-12 lg:col-span-3 order-2 lg:order-1">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.6, ease: EASE }}>
                    <div className="eyebrow text-[var(--terracotta)] mb-3">Edição Especial</div>
                    <div className="space-y-2.5 border-l border-[var(--line-strong)] pl-5">
                      <div>
                        <div className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--ink-soft)] opacity-60">Emitido por</div>
                        <div className="display text-lg text-[var(--ink)]">República de Palau</div>
                      </div>
                      <div>
                        <div className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--ink-soft)] opacity-60">Categoria</div>
                        <div className="display text-lg text-[var(--ink)]">Identidade Soberana</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="col-span-12 lg:col-span-9 order-1 lg:order-2">
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
                    <div className="eyebrow text-[var(--terracotta)] mb-5">Estratégia Avançada · Soberania</div>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                    transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
                    className="display text-[var(--ink)]"
                    style={{ fontSize: "clamp(4rem, 12vw, 13rem)", fontWeight: 400 }}
                  >
                    ID de <span className="display-italic" style={{ color: "var(--terracotta)" }}>Palau</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                    className="display-italic text-[var(--ink-soft)] mt-5 max-w-2xl"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.7rem)", lineHeight: 1.45 }}
                  >
                    Uma identidade emitida por um governo soberano, fora da sua jurisdição principal, a ferramenta que poucos entendem e menos ainda usam corretamente.
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-3"
          >
            <span className="eyebrow text-[var(--ink-soft)] [writing-mode:vertical-rl]">explorar</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown size={16} className="text-[var(--terracotta)]" />
            </motion.div>
          </motion.div>
        </section>

        {/* ════════ MARQUEE STRIP ════════ */}
        <section className="border-y border-[var(--line)] bg-[var(--cream-soft)] py-5 overflow-hidden">
          <div className="flex marquee-track whitespace-nowrap">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex items-center gap-12 pr-12 shrink-0">
                {["Identidade Soberana", "Processo 100% Online", "Cartão Físico Internacional", "Camada Complementar", "Estado Reconhecido", "Privacidade Operacional", "Acesso Internacional"].map((t, i) => (
                  <span key={i} className="flex items-center gap-12">
                    <span className="display-italic text-[1.4rem] text-[var(--ink)]">{t}</span>
                    <span className="text-[var(--terracotta)] text-2xl">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ════════ NOVO BLOCO 01, PRIVACIDADE VIROU ARTIGO DE LUXO ════════ */}
        <section className="bg-cream-tex grain relative px-6 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden">
          <div className="max-w-[1500px] mx-auto relative z-10">
            <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
              <div className="col-span-12 lg:col-span-6 reveal relative h-[420px] md:h-[560px] rounded-sm overflow-hidden">
                <img src={vigilanciaImg} alt="Smartphone com QR code de check-in de hotel sobre balcão de mármore, baixa luz, ambiente de vigilância" loading="lazy" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(44,76,92,0.0) 30%, rgba(44,76,92,0.55) 100%)" }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="eyebrow text-[var(--yellow)] mb-2">Cena de 2026</div>
                  <div className="display-italic text-[var(--cream)] text-xl">Toda noite num hotel, o Estado sabe.</div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 reveal delay-1">
                <div className="eyebrow text-[var(--terracotta)] mb-5">Cenário · Brasil 2026</div>
                <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.5rem)" }}>
                  Privacidade virou <span className="display-italic" style={{ color: "var(--terracotta)" }}>artigo de luxo</span>.
                </h2>
                <p className="body-lg mt-7">
                  Agora o check-in em hotéis e pousadas pode ser feito pelo app Gov.br. Muita gente vê praticidade. Quem entende vê uma ferramenta sendo testada e validada para, mais cedo ou mais tarde, saber cada lugar onde você dorme, com quem viaja e por quanto tempo.
                </p>
                <p className="body-lg mt-5">
                  Não é teoria da conspiração: é o mesmo padrão de toda infraestrutura digital de identidade. Primeiro vira opcional, depois conveniente, depois padrão, depois obrigatório.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="bg-[var(--cream-warm)] p-4 border-l-2 border-[var(--terracotta)]">
                    <div className="display text-[var(--ink)] text-2xl">2024</div>
                    <div className="body-sm">Opcional.</div>
                  </div>
                  <div className="bg-[var(--cream-warm)] p-4 border-l-2 border-[var(--terracotta)]">
                    <div className="display text-[var(--ink)] text-2xl">2026</div>
                    <div className="body-sm">Conveniente.</div>
                  </div>
                  <div className="bg-[var(--cream-warm)] p-4 border-l-2 border-[var(--terracotta)]">
                    <div className="display text-[var(--ink)] text-2xl">2030</div>
                    <div className="body-sm">Provavelmente padrão.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ NOVO BLOCO 02, NÃO-ADOXAR (UM COFRE x VÁRIOS) ════════ */}
        <section className="bg-navy-tex grain relative text-[var(--cream)] px-6 md:px-12 lg:px-16 py-24 md:py-36 overflow-hidden">
          <div className="max-w-[1500px] mx-auto relative z-10">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-end mb-14">
              <div className="col-span-12 lg:col-span-7 reveal">
                <div className="eyebrow text-[var(--clay)] mb-5">Princípio · Não-Adoxar</div>
                <h2 className="display text-[var(--cream)]" style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}>
                  Um cofre só é um <span className="display-italic" style={{ color: "var(--clay)" }}>alvo único</span>.
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-5 reveal delay-1">
                <p className="body-lg text-[var(--cream)]/80">
                  Quando todo cadastro do mundo aponta pro mesmo CPF, basta um vazamento (Serasa, Caixa, operadora, hotel) para que sua vida inteira esteja exposta. Não-adoxar é o ato deliberado de não deixar tudo num único documento.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 lg:gap-10 items-stretch">
              <div className="col-span-12 lg:col-span-5 reveal relative h-[380px] md:h-[520px] rounded-sm overflow-hidden">
                <img src={cofreImg} alt="Arquivo metálico com várias gavetas, uma iluminada em amarelo, simbolizando documentação compartimentada" loading="lazy" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { n: "01", t: "Documento único", d: "Um vazamento (e eles acontecem todo ano) e tudo que você fez está mapeado." },
                  { n: "02", t: "Múltiplos documentos", d: "Cada serviço internacional pega uma camada diferente da sua identidade. A correlação fica cara." },
                  { n: "03", t: "Cada nova trincheira", d: "Cada cadastro com Palau ID é um cadastro a menos onde seu CPF aparece como porta de entrada." },
                ].map((c) => (
                  <div key={c.n} className="bg-[var(--cream)]/[0.04] border border-[var(--cream)]/10 p-6 rounded-sm hover:bg-[var(--cream)]/[0.08] hover:border-[var(--clay)]/40 transition-all">
                    <span className="display-italic text-[var(--clay)] text-2xl block mb-3">{c.n}</span>
                    <h4 className="display text-[var(--cream)] mb-2" style={{ fontSize: "1.25rem", fontWeight: 500 }}>{c.t}</h4>
                    <p className="body-sm text-[var(--cream)]/65">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 01, CLAREZA ════════ */}
        <section className="bg-cream-tex grain relative px-6 md:px-12 lg:px-16 py-24 md:py-36 overflow-hidden">
          <div className="max-w-[1500px] mx-auto relative z-10">
            <div className="grid grid-cols-12 gap-6 lg:gap-12 mb-20">
              <div className="col-span-12 lg:col-span-5 reveal">
                <div className="eyebrow text-[var(--terracotta)] mb-5">Capítulo 01 · Clareza</div>
                <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}>
                  O que <span className="display-italic" style={{ color: "var(--terracotta)" }}>não é</span><br />
                  e o que <span className="display-italic" style={{ color: "var(--navy)" }}>realmente</span> é
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:col-start-7 reveal delay-1 flex items-end">
                <p className="body-lg">
                  A maioria erra porque não entende o documento antes de obtê-lo. Clareza primeiro, estrutura depois. Esse é o único caminho para extrair valor real de uma identidade internacional.
                </p>
              </div>
            </div>

            {/* STACK GROUP, 3 imagens sobrepostas que se abrem no hover */}
            <div className="grid grid-cols-12 gap-6 lg:gap-10">
              <div className="col-span-12 lg:col-span-5 reveal stack-group relative h-[520px] md:h-[620px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-[420px] h-[520px]">
                    <div className="stack-img stack-img-3 absolute inset-0 rounded-sm overflow-hidden shadow-2xl" style={{ transform: 'rotate(4deg) translate(10px, 6px)' }}>
                      <img src={mapImg} alt="Mapa do Pacífico" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="stack-img stack-img-2 absolute inset-0 rounded-sm overflow-hidden shadow-2xl" style={{ transform: 'rotate(-2deg)' }}>
                      <img src={carousel1} alt="Documentos sobre mapa" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="stack-img stack-img-1 absolute inset-0 rounded-sm overflow-hidden shadow-2xl" style={{ transform: 'rotate(-6deg) translate(-8px, -4px)' }}>
                      <img src={clarityImg} alt="ID de Palau detalhe" loading="lazy" className="w-full h-full object-cover" />
                      <div className="absolute bottom-5 left-5 right-5 bg-[var(--cream)]/95 backdrop-blur p-4 border-l-2 border-[var(--terracotta)]">
                        <div className="eyebrow text-[var(--terracotta)] mb-1">Princípio</div>
                        <div className="display-italic text-[var(--ink)] text-base leading-snug">Documento não é arquitetura.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="reveal delay-1 tilt-card bg-[var(--cream-warm)] p-7 rounded-sm border border-[var(--line)]">
                  <span className="corner-mark" />
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--line)]">
                    <div className="w-8 h-8 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center">
                      <XCircle size={16} className="text-[var(--terracotta)]" />
                    </div>
                    <span className="eyebrow text-[var(--terracotta)]">Não é</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Cidadania completa de Palau",
                      "Residência tradicional ou fiscal",
                      "Passaporte para viagens internacionais",
                      "Acesso universal a bancos e serviços",
                      "Solução isolada para estruturas financeiras",
                    ].map((t, i) => (
                      <li key={i} className="display text-[var(--ink)] text-[1.05rem] leading-snug pl-4 border-l border-[var(--terracotta)]/30 transition-all hover:pl-5 hover:border-[var(--terracotta)]" style={{ fontWeight: 400 }}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="reveal delay-2 tilt-card bg-[var(--cream-warm)] p-7 rounded-sm border border-[var(--line)]">
                  <span className="corner-mark" style={{ borderColor: 'var(--navy)' }} />
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--line)]">
                    <div className="w-8 h-8 rounded-full bg-[var(--navy)]/10 flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-[var(--navy)]" />
                    </div>
                    <span className="eyebrow text-[var(--navy)]">É</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Identidade emitida por governo soberano reconhecido",
                      "Utilidade prática em onboarding internacional",
                      "Peça complementar de uma estrutura maior",
                      "Camada adicional com baixo custo de entrada",
                      "Ferramenta real dentro da estratégia correta",
                    ].map((t, i) => (
                      <li key={i} className="display text-[var(--ink)] text-[1.05rem] leading-snug pl-4 border-l border-[var(--navy)]/40 transition-all hover:pl-5 hover:border-[var(--navy)]" style={{ fontWeight: 400 }}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 02, CARROSSEL DE APLICAÇÃO ════════ */}
        <section className="bg-cream-deep grain relative px-6 md:px-12 lg:px-16 py-24 md:py-36 border-y border-[var(--line)] overflow-hidden">
          <div className="max-w-[1500px] mx-auto relative z-10">
            <div className="grid grid-cols-12 gap-6 mb-16 items-end">
              <div className="col-span-12 lg:col-span-7 reveal">
                <div className="eyebrow text-[var(--terracotta)] mb-5">Capítulo 02 · Aplicação Prática</div>
                <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}>
                  Onde <span className="display-italic" style={{ color: "var(--terracotta)" }}>funciona</span><br />
                  de fato
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:col-start-9 reveal delay-1">
                <p className="body-lg" style={{ borderLeft: "2px solid var(--terracotta)", paddingLeft: "1.25rem" }}>
                  Nem toda utilidade é universal. O valor está em casos específicos, entender esses casos é o que diferencia o uso inteligente do ingênuo.
                </p>
              </div>
            </div>

            {/* CARROSSEL CINEMATOGRÁFICO */}
            <div className="reveal grid grid-cols-12 gap-6 lg:gap-10 items-stretch">
              <div className="col-span-12 lg:col-span-8 carousel-shell relative h-[520px] md:h-[640px]">
                <AnimatePresence mode="wait" custom={carouselDir}>
                  <motion.div
                    key={carouselIndex}
                    custom={carouselDir}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <img src={carouselSlides[carouselIndex].img} alt={carouselSlides[carouselIndex].title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,22,20,0.05) 0%, rgba(26,22,20,0.3) 50%, rgba(26,22,20,0.92) 100%)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-[var(--cream)]">
                      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}>
                        <div className="eyebrow text-[var(--clay)] mb-3">{carouselSlides[carouselIndex].eyebrow}</div>
                        <h3 className="display mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                          {carouselSlides[carouselIndex].title}
                        </h3>
                        <p className="body-lg text-[var(--cream)]/80 max-w-2xl">{carouselSlides[carouselIndex].text}</p>
                      </motion.div>
                    </div>
                    <div className="absolute top-6 right-6">
                      <span className="eyebrow text-[var(--cream)]/60 px-3 py-1.5 border border-[var(--cream)]/20 rounded-full backdrop-blur-sm bg-[var(--ink)]/30">
                        {carouselSlides[carouselIndex].accent}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
                  <button onClick={() => goCarousel(-1)} aria-label="Anterior" className="w-11 h-11 rounded-full bg-[var(--cream)]/90 backdrop-blur flex items-center justify-center hover:bg-[var(--terracotta)] hover:text-[var(--cream)] text-[var(--ink)] transition-all">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => goCarousel(1)} aria-label="Próximo" className="w-11 h-11 rounded-full bg-[var(--cream)]/90 backdrop-blur flex items-center justify-center hover:bg-[var(--terracotta)] hover:text-[var(--cream)] text-[var(--ink)] transition-all">
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="absolute top-1/2 right-6 -translate-y-1/2 z-10 flex flex-col items-center gap-3">
                  {carouselSlides.map((_, i) => (
                    <button key={i} onClick={() => { setCarouselDir(i > carouselIndex ? 1 : -1); setCarouselIndex(i); }} className={`carousel-dot ${i === carouselIndex ? 'active' : ''}`} aria-label={`Slide ${i + 1}`} style={{ writingMode: 'vertical-rl' }} />
                  ))}
                </div>
              </div>

              {/* Side list, sincronizada com carrossel */}
              <div className="col-span-12 lg:col-span-4 flex flex-col">
                <div className="eyebrow text-[var(--ink-soft)] mb-5">Casos de uso</div>
                <div className="space-y-1 flex-1">
                  {carouselSlides.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setCarouselDir(i > carouselIndex ? 1 : -1); setCarouselIndex(i); }}
                      className={`w-full text-left p-5 border-l-2 transition-all duration-500 ${i === carouselIndex ? 'border-[var(--terracotta)] bg-[var(--cream-warm)]' : 'border-[var(--line)] hover:border-[var(--terracotta)]/40 hover:bg-[var(--cream-warm)]/50'}`}
                    >
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="display-italic text-[var(--terracotta)]" style={{ fontSize: '1.1rem' }}>{String(i + 1).padStart(2, '0')}</span>
                        <span className="display text-[var(--ink)]" style={{ fontSize: '1.15rem', fontWeight: 500 }}>{s.title}</span>
                      </div>
                      <div className="eyebrow text-[var(--ink-soft)]/70 pl-7">{s.eyebrow}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini-cards complementares */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              {[
                { icon: Globe2, eyebrow: "Operacional", title: "Onboarding Internacional", text: "Camada documental adicional para verificação em plataformas globais." },
                { icon: Compass, eyebrow: "Estratégico", title: "Mobilidade Patrimonial", text: "Integração a estruturas internacionais de patrimônio e mobilidade." },
                { icon: KeyRound, eyebrow: "Documental", title: "Redundância Soberana", text: "Documento de respaldo em arquiteturas de soberania pessoal." },
              ].map((b, i) => {
                const Ic = b.icon;
                return (
                  <div key={i} className="tilt-card reveal bg-[var(--cream-warm)] p-7 md:p-8 border border-[var(--line)] rounded-sm relative">
                    <span className="corner-mark" />
                    <Ic size={22} className="text-[var(--terracotta)] mb-4" />
                    <div className="eyebrow text-[var(--terracotta)] mb-2">{b.eyebrow}</div>
                    <h4 className="display text-[var(--ink)] mb-2.5" style={{ fontSize: "1.45rem" }}>{b.title}</h4>
                    <p className="body-sm">{b.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 03, QUEBRA DE CRENÇA (99%) ════════ */}
        <section className="bg-paper grain relative px-6 md:px-12 lg:px-16 py-24 md:py-36 overflow-hidden">
          <div className="max-w-[1500px] mx-auto relative z-10">
            <div className="grid grid-cols-12 gap-6 lg:gap-12 items-center">
              <div className="col-span-12 lg:col-span-6 reveal relative">
                <div className="eyebrow text-[var(--terracotta)] mb-4">Capítulo 03 · Quebra de Crença</div>
                <div className="num-mega leading-none">
                  99<span className="display-italic" style={{ fontSize: "0.4em", color: "var(--ink)" }}>%</span>
                </div>
                <p className="display-italic text-[var(--ink-soft)] mt-2" style={{ fontSize: "1.5rem" }}>
                  cometem o mesmo erro
                </p>
              </div>

              <div className="col-span-12 lg:col-span-6 reveal delay-1">
                <h2 className="display text-[var(--ink)] mb-7" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                  O erro não é <span className="display-italic" style={{ color: "var(--terracotta)" }}>comprar</span> o ID.<br />
                  É não saber <span className="display-italic" style={{ color: "var(--navy)" }}>usá-lo</span>.
                </h2>
                <p className="body-lg mb-10">
                  Comprar o ID e imaginar que ele sozinho resolve tudo. É o erro de quem comprou uma peça e achou que tinha o tabuleiro completo.
                </p>

                <div className="space-y-1">
                  {[
                    { n: "01", t: "Comprovante de endereço", d: "Plataformas exigem comprovante de residência válido, independente do documento de identidade." },
                    { n: "02", t: "Número de telefone local", d: "Em alguns casos exige-se verificação por número da jurisdição declarada." },
                    { n: "03", t: "Documentação complementar", d: "O ID raramente opera sozinho, precisa de documentos de suporte para ativação completa." },
                    { n: "04", t: "Alinhamento residência × identidade", d: "Report fiscal depende da residência informada e da política da instituição." },
                    { n: "05", t: "Estratégia estruturada", d: "Sem arquitetura clara, o documento é uma ferramenta sem contexto." },
                  ].map((item) => (
                    <div key={item.n} className="grid grid-cols-12 gap-4 py-5 border-b border-[var(--line)] group transition-all hover:bg-[var(--cream-warm)]/50 hover:px-3 -mx-3">
                      <div className="col-span-2 md:col-span-1">
                        <span className="display-italic text-[var(--terracotta)] transition-all group-hover:scale-110 inline-block" style={{ fontSize: "1.15rem" }}>{item.n}</span>
                      </div>
                      <div className="col-span-10 md:col-span-11">
                        <h4 className="display text-[var(--ink)] mb-1.5" style={{ fontSize: "1.15rem", fontWeight: 500 }}>{item.t}</h4>
                        <p className="body-sm">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 04, LIMITAÇÕES ════════ */}
        <section className="bg-navy-tex grain relative text-[var(--cream)] overflow-hidden">
          <div className="grid grid-cols-12 min-h-[100vh] relative z-10">
            <div className="col-span-12 lg:col-span-5 relative min-h-[400px] lg:min-h-[100vh] overflow-hidden group">
              <img src={bankImg} alt="Banco tradicional clássico" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(27,40,69,0.2) 0%, rgba(27,40,69,0.85) 100%)" }} />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="eyebrow text-[var(--clay)] mb-2">Limite Real</div>
                <h3 className="display text-[var(--cream)]" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                  Onde <span className="display-italic">não</span> resolve
                </h3>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 px-6 md:px-12 lg:px-16 py-20 lg:py-28 flex flex-col justify-center">
              <div className="max-w-3xl">
                <div className="eyebrow text-[var(--clay)] mb-5 reveal">Capítulo 04 · Honestidade Estratégica</div>
                <h2 className="display text-[var(--cream)] mb-8 reveal delay-1" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
                  Um documento útil <span className="display-italic" style={{ color: "var(--clay)" }}>não é</span> um documento <span className="display-italic">total</span>.
                </h2>
                <p className="body-lg text-[var(--cream)]/65 mb-12 reveal delay-2">
                  Clareza antes de qualquer decisão. Vender ilusão é o jogo dos amadores. Vender ferramenta dentro de estratégia é o jogo de quem entrega resultado real.
                </p>

                <div className="space-y-3 reveal delay-3">
                  {[
                    { tag: "Não aceito", title: "Bancos tradicionais clássicos", text: "Bancos convencionais não aceitam apenas um ID local. Passaporte e comprovante robusto continuam padrão." },
                    { tag: "Insuficiente", title: "Comprovação de residência", text: "Não substitui comprovante de endereço. Muitas instituições exigem evidência de residência física." },
                    { tag: "Não aplicável", title: "Substituição de passaporte", text: "Não é passaporte. Não permite viagens internacionais nem substitui o documento principal nacional." },
                    { tag: "Limitado", title: "Planejamento fiscal isolado", text: "Report fiscal depende da residência declarada. Sem estrutura completa, é ferramenta sem contexto." },
                  ].map((l, i) => (
                    <div key={i} className="grid grid-cols-12 gap-4 p-5 border border-[var(--cream)]/8 rounded-sm hover:border-[var(--clay)]/40 hover:bg-[var(--cream)]/5 transition-all duration-500">
                      <div className="col-span-12 md:col-span-3">
                        <span className="eyebrow text-[var(--clay)]">{l.tag}</span>
                      </div>
                      <div className="col-span-12 md:col-span-9">
                        <h4 className="display text-[var(--cream)] mb-2" style={{ fontSize: "1.4rem", fontWeight: 500 }}>{l.title}</h4>
                        <p className="body text-[var(--cream)]/55">{l.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ NOVO BANNER, NÃO É BALA DE PRATA ════════ */}
        <section className="relative h-[60vh] min-h-[440px] overflow-hidden">
          <img src={balaPrataImg} alt="Escudo metálico rachado com fenda iluminada em amarelo: Palau ID não é bala de prata" loading="lazy" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(20,28,35,0.85) 0%, rgba(20,28,35,0.55) 50%, rgba(20,28,35,0.85) 100%)" }} />
          <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-16">
            <div className="max-w-[1500px] mx-auto w-full grid grid-cols-12 gap-6 items-center">
              <div className="col-span-12 lg:col-span-7 reveal">
                <div className="eyebrow text-[var(--yellow)] mb-5">Aviso de Honestidade</div>
                <h2 className="display text-[var(--cream)]" style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}>
                  Palau ID não é <span className="display-italic" style={{ color: "var(--yellow)" }}>bala de prata</span>.
                </h2>
                <p className="display-italic text-[var(--cream)]/80 mt-6 max-w-2xl" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.4rem)", lineHeight: 1.5 }}>
                  No futuro, União Europeia e outros blocos podem pressionar pequenas jurisdições. Use enquanto serve, sem se agarrar como se fosse permanente. Ferramenta tática, não fortaleza eterna.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:col-start-9 reveal delay-1">
                <div className="bg-[var(--cream)]/10 backdrop-blur-sm p-6 border-l-2 border-[var(--yellow)]">
                  <div className="eyebrow text-[var(--yellow)] mb-2">Regra de Ouro</div>
                  <p className="body text-[var(--cream)]/90">
                    Se sua estratégia inteira depende exclusivamente do Palau ID, você não tem estratégia. Tem aposta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 05, VALOR ════════ */}
        <section className="bg-cream-tex grain relative px-6 md:px-12 lg:px-16 py-28 md:py-40 overflow-hidden">
          <div className="max-w-[1500px] mx-auto relative z-10">
            <div className="reveal max-w-5xl">
              <div className="eyebrow text-[var(--terracotta)] mb-6">Capítulo 05 · Por que importa</div>
              <blockquote className="display text-[var(--ink)]" style={{ fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1.1, fontWeight: 400 }}>
                Sozinho, ele é <span className="display-italic" style={{ color: "var(--terracotta)" }}>limitado</span>.<br />
                Dentro de uma arquitetura maior,<br />
                ele <span className="display-italic" style={{ color: "var(--navy)" }}>muda de patamar</span>.
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-20 pt-12 border-t border-[var(--line)]">
              {[
                { ic: ShieldCheck, t: "Privacidade Operacional", d: "Menor exposição direta da jurisdição de origem em verificações internacionais." },
                { ic: Globe2, t: "Acesso Internacional", d: "Utilidade em plataformas globais, sujeito ao compliance de cada serviço." },
                { ic: Sparkles, t: "Baixo Custo de Entrada", d: "Opção acessível em comparação com passaportes adicionais ou residências formais." },
                { ic: ScrollText, t: "Processo Online", d: "Solicitação digital com emissão e envio físico para qualquer lugar do mundo." },
              ].map((v, i) => {
                const Ic = v.ic;
                return (
                  <div key={i} className="reveal tilt-card bg-[var(--cream-warm)] p-7 border border-[var(--line)] rounded-sm relative" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <span className="corner-mark" />
                    <Ic size={28} className="text-[var(--terracotta)] mb-5" />
                    <h4 className="display text-[var(--ink)] mb-3" style={{ fontSize: "1.3rem", fontWeight: 500 }}>{v.t}</h4>
                    <p className="body-sm">{v.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 06, JORNADA ════════ */}
        <section className="bg-cream-deep grain relative px-6 md:px-12 lg:px-16 py-24 md:py-36 border-y border-[var(--line)] overflow-hidden">
          <div className="max-w-[1500px] mx-auto relative z-10">
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-12 lg:col-span-7 reveal">
                <div className="eyebrow text-[var(--terracotta)] mb-5">Capítulo 06 · Jornada</div>
                <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}>
                  Como <span className="display-italic" style={{ color: "var(--terracotta)" }}>obter</span><br />
                  o ID de Palau
                </h2>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--line-strong)] -translate-x-px md:-translate-x-1/2" />

              {[
                { n: "01", t: "Solicitação", d: "Inicie pela plataforma oficial responsável pela emissão do documento.", side: "left" },
                { n: "02", t: "Verificação", d: "Processo de validação de identidade exigido pelo governo de Palau.", side: "right" },
                { n: "03", t: "Emissão", d: "Aprovação e emissão oficial pelo Estado soberano reconhecido.", side: "left" },
                { n: "04", t: "Entrega Física", d: "Cartão físico enviado para qualquer lugar do mundo onde você estiver.", side: "right" },
                { n: "05", t: "Configuração Estratégica", d: "Avalie documentação complementar para integrar à sua estrutura específica.", side: "left" },
              ].map((s, i) => (
                <div key={i} className={`relative grid grid-cols-12 gap-4 mb-12 reveal group`} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className={`col-span-12 md:col-span-6 ${s.side === "right" ? "md:col-start-7" : ""} pl-16 md:pl-0 ${s.side === "right" ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                    <div className={`flex items-center gap-4 mb-3 ${s.side === "right" ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <span className="display-italic text-[var(--terracotta)] transition-transform group-hover:scale-110" style={{ fontSize: "2.5rem" }}>{s.n}</span>
                      <div className="h-px flex-1 bg-[var(--line-strong)] group-hover:bg-[var(--terracotta)] transition-colors" />
                    </div>
                    <h3 className="display text-[var(--ink)] mb-3" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>{s.t}</h3>
                    <p className="body">{s.d}</p>
                  </div>
                  <div className="absolute left-6 md:left-1/2 top-3 w-3 h-3 rounded-full bg-[var(--terracotta)] -translate-x-[5px] md:-translate-x-1/2 ring-4 ring-[var(--cream-deep)] group-hover:ring-[var(--terracotta)]/20 group-hover:scale-150 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ NOVO BLOCO 03, PASSO A PASSO PRÁTICO (RNS) ════════ */}
        <section className="bg-cream-tex grain relative px-6 md:px-12 lg:px-16 py-24 md:py-36 overflow-hidden">
          <div className="max-w-[1500px] mx-auto relative z-10">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center mb-14">
              <div className="col-span-12 lg:col-span-7 reveal">
                <div className="eyebrow text-[var(--terracotta)] mb-5">Operacional · RNS ID</div>
                <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}>
                  Como tirar na prática, <span className="display-italic" style={{ color: "var(--terracotta)" }}>sem sair de casa</span>.
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-5 reveal delay-1">
                <p className="body-lg">
                  O processo é 100% online, leva poucas semanas e o cartão físico chega no Brasil. Pague em cripto para não ligar o seu banco brasileiro ao seu novo documento.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 lg:gap-10 items-stretch">
              <div className="col-span-12 lg:col-span-6 reveal relative h-[420px] md:h-[600px] rounded-sm overflow-hidden">
                <img src={passoImg} alt="Notebook com formulário de identidade digital, cartão branco, passaporte e celular com carteira cripto sobre mesa de madeira" loading="lazy" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="col-span-12 lg:col-span-6 space-y-4">
                {[
                  { n: "01", t: "Abra o RNS ID", d: "Plataforma oficial autorizada pelo governo de Palau. Crie conta e suba documento de identidade do seu país." },
                  { n: "02", t: "Escolha o plano", d: "1 ano por USD 248 (recomendado para testar), 5 anos por USD 1.000 ou 10 anos por USD 2.000. O preço de longo prazo trava previsibilidade." },
                  { n: "03", t: "Pague em cripto", d: "ETH, USDT, USDC ou BNB. Evite cartão de crédito brasileiro: ele cria rastro financeiro entre você e o Palau ID." },
                  { n: "04", t: "Receba o NFT", d: "Cópia digital do documento na sua carteira. Útil em alguns serviços Web3, mas não é o que abre conta em exchange." },
                  { n: "05", t: "Aguarde o cartão físico", d: "Chega em algumas semanas. Se for extraviado (raro no Brasil), há taxa de USD 50 para reemissão. Esse cartão é o que você realmente vai usar." },
                ].map((s) => (
                  <div key={s.n} className="grid grid-cols-12 gap-3 p-5 border border-[var(--line)] rounded-sm bg-[var(--cream-warm)] hover:border-[var(--terracotta)]/50 hover:translate-x-1 transition-all">
                    <div className="col-span-2">
                      <span className="display-italic text-[var(--terracotta)] text-3xl">{s.n}</span>
                    </div>
                    <div className="col-span-10">
                      <h4 className="display text-[var(--ink)] mb-1.5" style={{ fontSize: "1.2rem", fontWeight: 500 }}>{s.t}</h4>
                      <p className="body-sm">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center reveal">
              <a href="https://rnsid.id" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Abrir RNS ID oficial <ArrowUpRight size={16} />
              </a>
              <p className="body-sm mt-4 text-[var(--ink-soft)]">Sugestão tática: comece pelo plano de 1 ano. Você não pode cancelar nem reembolsar, então teste antes de comprometer 5 ou 10 anos.</p>
            </div>
          </div>
        </section>

        {/* ════════ NOVO BLOCO 04, PARA QUEM SERVE / NÃO SERVE ════════ */}
        <section className="bg-cream-deep grain relative px-6 md:px-12 lg:px-16 py-24 md:py-36 border-y border-[var(--line)] overflow-hidden">
          <div className="max-w-[1500px] mx-auto relative z-10">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-end mb-14">
              <div className="col-span-12 lg:col-span-7 reveal">
                <div className="eyebrow text-[var(--terracotta)] mb-5">Segmentação · Honestidade Cirúrgica</div>
                <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}>
                  Para quem <span className="display-italic" style={{ color: "var(--navy)" }}>serve</span>.<br />
                  Para quem <span className="display-italic" style={{ color: "var(--terracotta)" }}>não serve</span>.
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-5 reveal delay-1">
                <p className="body-lg">
                  Ferramenta certa, pessoa errada, virou frustração. Antes de pagar USD 248, descubra honestamente em qual coluna você está.
                </p>
              </div>
            </div>

            <div className="reveal relative h-[280px] md:h-[400px] rounded-sm overflow-hidden mb-10">
              <img src={personasImg} alt="Trader cripto, nômade digital em aeroporto e empresário com passaporte: três perfis típicos de uso do Palau ID" loading="lazy" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(44,76,92,0.0) 50%, rgba(44,76,92,0.7) 100%)" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="reveal bg-[var(--cream-warm)] p-7 md:p-9 border-l-4 border-[var(--navy)] rounded-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--line)]">
                  <CheckCircle2 size={20} className="text-[var(--navy)]" />
                  <span className="eyebrow text-[var(--navy)]">Faz sentido para</span>
                </div>
                <ul className="space-y-5">
                  {[
                    { t: "Trader cripto que cansou da Receita", d: "Quer abrir conta em Coinbase, Bitget, Gate.io ou KuCoin sem alimentar a CRS brasileira a cada cadastro novo." },
                    { t: "Nômade digital com medo de adoxamento", d: "Já teve o CPF vazado, recebe ligações estranhas e quer parar de espalhar o documento brasileiro em toda plataforma internacional." },
                    { t: "Comprador de privacidade documental", d: "Reconhece que privacidade hoje é luxo, e está disposto a pagar por uma camada extra que reduz exposição em verificações internacionais." },
                  ].map((p, i) => (
                    <li key={i}>
                      <h4 className="display text-[var(--ink)] mb-1.5" style={{ fontSize: "1.15rem", fontWeight: 500 }}>{p.t}</h4>
                      <p className="body-sm">{p.d}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal delay-1 bg-[var(--cream-warm)] p-7 md:p-9 border-l-4 border-[var(--terracotta)] rounded-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--line)]">
                  <XCircle size={20} className="text-[var(--terracotta)]" />
                  <span className="eyebrow text-[var(--terracotta)]">NÃO compre se você quer</span>
                </div>
                <ul className="space-y-5">
                  {[
                    { t: "Mudar residência fiscal", d: "Palau ID não tira você do reporte CRS brasileiro. Para isso existe Saída Definitiva e residência efetiva no Paraguai, Panamá ou Uruguai." },
                    { t: "Abrir banco tradicional internacional", d: "Bancos sérios pedem passaporte e comprovante de endereço local. Aqui Palau ID não passa do filtro de compliance." },
                    { t: "Plano B de fuga", d: "Não é cidadania, não é passaporte, não dá direito de residir lá. Se você quer um lugar real para chegar, precisa de outro documento." },
                  ].map((p, i) => (
                    <li key={i}>
                      <h4 className="display text-[var(--ink)] mb-1.5" style={{ fontSize: "1.15rem", fontWeight: 500 }}>{p.t}</h4>
                      <p className="body-sm">{p.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ NOVO BLOCO 05, CAMADA, NÃO FORTALEZA ════════ */}
        <section className="bg-paper grain relative px-6 md:px-12 lg:px-16 py-24 md:py-36 overflow-hidden">
          <div className="max-w-[1500px] mx-auto relative z-10">
            <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
              <div className="col-span-12 lg:col-span-6 reveal relative h-[420px] md:h-[560px] rounded-sm overflow-hidden">
                <img src={cebolaImg} alt="Camadas concêntricas, analogia da privacidade em camadas: Palau ID é uma camada externa, não o núcleo" loading="lazy" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.55) 100%)" }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="eyebrow text-[var(--yellow)] mb-2">Princípio</div>
                  <div className="display-italic text-[var(--cream)] text-xl">Privacidade real é arquitetura em camadas.</div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 reveal delay-1">
                <div className="eyebrow text-[var(--terracotta)] mb-5">Fechamento Estratégico</div>
                <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.5rem)" }}>
                  Palau ID é uma <span className="display-italic" style={{ color: "var(--terracotta)" }}>camada</span>.<br />
                  Não é a <span className="display-italic" style={{ color: "var(--navy)" }}>fortaleza</span>.
                </h2>
                <p className="body-lg mt-7">
                  Pense em privacidade como uma cebola. As camadas externas são baratas, descartáveis, fáceis de adicionar: Palau ID, e-mail temporário, número virtual, cartão pré-pago. O núcleo é caro e demora: residência fiscal real, segundo passaporte, estrutura corporativa internacional.
                </p>
                <p className="body-lg mt-5">
                  O erro de quem trata o Palau ID como bala de prata é o mesmo de quem acha que cebola tem uma camada só. Você usa Palau onde ele resolve, e usa Paraguai, Panamá ou Uruguai para o que ele nunca vai resolver.
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <Link to="/saida/jurisdicoes-amigaveis" className="btn-primary">
                    Ver jurisdições reais <ArrowUpRight size={16} />
                  </Link>
                  <Link to="/saida/segundo-passaporte" className="btn-ghost">
                    Segundo passaporte
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 07, PALAU CINEMATIC ════════ */}
        <section ref={islandRef} className="relative h-[100vh] min-h-[700px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: islandY }}>
            <img src={islandImg} alt="Ilhas de Palau ao amanhecer" loading="lazy" className="w-full h-full object-cover" style={{ transform: "scale(1.25)" }} />
          </motion.div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(27,40,69,0.15) 0%, rgba(27,40,69,0.05) 40%, rgba(27,40,69,0.55) 100%)" }} />

          <div className="relative z-10 h-full flex items-end px-6 md:px-12 lg:px-16 pb-20 md:pb-28">
            <div className="max-w-[1500px] mx-auto w-full grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-7 reveal">
                <div className="eyebrow text-[var(--clay)] mb-5">Refúgio Soberano</div>
                <h2 className="display text-[var(--cream)] mb-6" style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}>
                  Palau
                </h2>
                <p className="display-italic text-[var(--cream)]/85 max-w-2xl" style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.6rem)", lineHeight: 1.45 }}>
                  Uma identidade emitida por um Estado soberano do Pacífico, com aplicação real no sistema global.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:col-start-9 reveal delay-2 self-end">
                <div className="bg-[var(--cream)]/95 backdrop-blur-sm p-7 md:p-8 rounded-sm border-l-2 border-[var(--terracotta)]">
                  <div className="space-y-4">
                    {[
                      ["Tipo", "Identidade soberana"],
                      ["Emissão", "República de Palau"],
                      ["Formato", "Cartão físico + digital"],
                      ["Processo", "100% online"],
                      ["Potencial isolado", "Limitado"],
                      ["Em estrutura", "Alto"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center pb-3 border-b border-[var(--line)] last:border-0">
                        <span className="eyebrow text-[var(--ink-soft)]">{k}</span>
                        <span className="display text-[var(--ink)] text-[0.95rem]" style={{ fontWeight: 500 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 08, FAQ ════════ */}
        <section className="bg-cream-tex grain relative px-6 md:px-12 lg:px-16 py-24 md:py-36 overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16 reveal">
              <div className="eyebrow text-[var(--terracotta)] mb-5">Capítulo 08 · Perguntas Frequentes</div>
              <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
                As dúvidas<br /><span className="display-italic" style={{ color: "var(--terracotta)" }}>mais importantes</span>
              </h2>
            </div>

            <div className="reveal delay-1 border-t border-[var(--line)]">
              {[
                { q: "O ID de Palau é cidadania?", a: "Não. É uma identidade digital emitida pelo governo de Palau, não cidadania. Cidadania envolve direitos legais extensos, passaporte e proteção consular, nada disso está incluído." },
                { q: "O ID de Palau é residência?", a: "Não. Não configura residência legal, não muda sua situação fiscal e não substitui visto ou permissão de residência em qualquer jurisdição." },
                { q: "Posso usar em exchanges cripto?", a: "Em algumas, sim, Coinbase, Bitget, Gate.io, KuCoin, CEX.IO e MEXC são exemplos atuais. Mas as políticas de compliance mudam. Verifique a política vigente antes de depender disso." },
                { q: "Posso abrir conta em qualquer banco?", a: "Não. Bancos tradicionais exigem passaporte e comprovante de residência robusto. O ID pode funcionar em neobanks e fintechs específicas, não em instituições convencionais." },
                { q: "Preciso de comprovante de endereço?", a: "Na maioria dos casos, sim. O ID raramente opera como documento único, ele faz parte de um conjunto de documentação complementar." },
                { q: "Substitui passaporte?", a: "Não. Não pode ser usado para viagens internacionais. Seu passaporte nacional continua sendo o documento principal para viagem e propósitos legais." },
                { q: "Resolve minha vida financeira internacional?", a: "Não. É uma ferramenta dentro de uma estrutura maior. Sozinho tem utilidade limitada. Dentro de uma arquitetura de soberania bem construída, contribui significativamente." },
                { q: "É legal?", a: "Sim. É emitido por um governo soberano reconhecido internacionalmente. O que varia é a aceitação de cada plataforma, uma decisão privada de compliance, não de legalidade do documento." },
                { q: "Vale a pena?", a: "Depende do seu objetivo. Se você entende onde funciona, tem documentação complementar e o insere em uma estratégia maior, pode valer muito. Se espera que resolva tudo sozinho, não vale. A decisão inteligente começa com clareza." },
                { q: "Palau ID protege contra check-in obrigatório no Gov.br?", a: "Não dentro do Brasil. Hotéis brasileiros são obrigados por lei a registrar hóspede com CPF e documento nacional. Palau ID resolve cadastros internacionais (exchanges, neobanks, alguns hotéis fora do país), não anula a identificação obrigatória em território nacional." },
                { q: "Palau ID substitui a cédula paraguaia?", a: "Não. A cédula paraguaia é residência efetiva, abre bancos e muda domicílio fiscal com Saída Definitiva. O Palau ID é uma camada documental adicional, sem residência física, sem mudar reporte CRS, com aceitação restrita a alguns serviços." },
                { q: "Como pagar com privacidade pelo ID?", a: "Pague em cripto (ETH, USDT, USDC ou BNB). Cartão de crédito brasileiro liga seu banco diretamente ao novo documento, o que destrói o propósito. Se for usar cartão, prefira cartão internacional pré-pago não vinculado ao seu CPF." },
                { q: "Posso renovar o Palau ID depois?", a: "Sim, a renovação é simples no próprio RNS ID. Quem tira 10 anos paga USD 2.000 e trava o preço; quem tira 1 ano por USD 248 fica exposto a eventuais aumentos quando a legislação mudar. Para validar antes de comprometer, comece com 1 ano." },
                { q: "Em quais exchanges Palau ID está funcionando hoje?", a: "Coinbase, Bitget, Gate.io, KuCoin, CEX.IO e MEXC têm relatos consistentes de aceitação. Bybit teve relatos contraditórios. Compliance muda mensalmente, então sempre teste o cadastro antes de depender da plataforma." },
                { q: "Para quem o Palau ID NÃO serve?", a: "Não serve para quem quer mudar residência fiscal, abrir banco tradicional, viajar internacionalmente ou ter um plano B real de fuga. Para esses casos vá direto para Paraguai, Panamá, Uruguai ou outro segundo passaporte. Tentar resolver tudo com Palau ID é o erro mais comum de quem entra cru no tema." },
              ].map((f, i) => (
                <details key={i}>
                  <summary>
                    <span className="display text-[var(--ink)] text-[1.1rem] md:text-[1.3rem] leading-snug" style={{ fontWeight: 500 }}>{f.q}</span>
                    <span className="faq-icon w-9 h-9 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--ink)] shrink-0">
                      <ChevronDown size={16} />
                    </span>
                  </summary>
                  <div className="pb-7 px-1 pr-12">
                    <p className="body">{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 09, CTA FINAL ════════ */}
        <section ref={ctaRef} className="relative h-[100vh] min-h-[680px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: ctaY }}>
            <img src={ctaImg} alt="Estojo de viagem com passaporte e mapa" loading="lazy" className="w-full h-full object-cover" style={{ transform: "scale(1.2)" }} />
          </motion.div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(244,238,226,0.55) 0%, rgba(244,238,226,0.4) 50%, rgba(244,238,226,0.92) 100%)" }} />

          <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">
            <div className="text-center max-w-4xl reveal">
              <div className="eyebrow text-[var(--terracotta)] mb-6">Decisão Consciente</div>
              <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}>
                Clareza<br /><span className="display-italic" style={{ color: "var(--terracotta)" }}>primeiro</span>.
              </h2>
              <p className="display-italic text-[var(--ink-soft)] mt-7 max-w-2xl mx-auto" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)", lineHeight: 1.5 }}>
                Você não precisa fazer tudo hoje. Mas precisa começar certo. O valor do ID de Palau não está no hype, está no uso correto.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                <Link to="/teoria-das-bandeiras" className="btn-primary">
                  Ver estratégia completa <ArrowUpRight size={16} />
                </Link>
                <Link to="/saida" className="btn-ghost">
                  Como obter o ID
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-[var(--ink)] text-[var(--cream)]/70 px-6 md:px-12 lg:px-16 py-10">
          <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="eyebrow text-[var(--cream)]/55">Lord Junnior · Soberania Internacional</div>
            <div className="text-xs text-[var(--cream)]/35 tracking-widest">© 2026 · LORDJUNNIOR.COM.BR</div>
          </div>
        </footer>

        <BackToHome />
      </main>
    </>
  );
};

export default PalauDigitalResidency;
