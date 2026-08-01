import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  Flag,
  Globe,
  Landmark,
  Quote,
  Shield,
  Sparkles,
} from 'lucide-react';
import { BANDEIRAS, POR_QUE_AGORA, PRIMEIROS_PASSOS, FAQ_ITEMS } from '@/lib/teoriaBandeirasData';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';
import PageFloatingToc from '@/components/PageFloatingToc';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import bgBandeiras from '@/assets/backgrounds/bg-bandeiras.jpg';

import heroImg from '@/assets/bandeiras-hero-flatlay.jpg';
import palauImg from '@/assets/bandeiras-palau-island.jpg';
import imgPassport from '@/assets/bandeiras-passport-airport.jpg';
import imgCard from '@/assets/bandeiras-card.jpg';
import imgDoc from '@/assets/bandeiras-document.jpg';
import imgSkyline from '@/assets/bandeiras-skyline.jpg';
import imgBitcoinGold from '@/assets/bandeiras-bitcoin-gold.jpg';

const EASE = [0.22, 1, 0.36, 1] as const;

const pageTheme = {
  '--page-bg': '42 52% 95%',
  '--page-surface': '44 45% 98%',
  '--page-surface-strong': '40 42% 92%',
  '--page-ink': '226 34% 18%',
  '--page-muted': '224 15% 36%',
  '--page-primary': '223 67% 34%',
  '--page-primary-strong': '223 74% 27%',
  '--page-secondary': '157 54% 31%',
  '--page-gold': '44 61% 48%',
  '--page-danger': '0 70% 43%',
  '--page-border': '224 26% 80%',
  '--page-shadow': '223 46% 28%',
} as React.CSSProperties;

const tocItems = [
  { id: 'hero', label: 'Visão Geral' },
  { id: 'crenca', label: 'Quebra de Crença' },
  { id: 'o-que-e', label: 'O Que É' },
  { id: 'problema', label: 'O Problema' },
  { id: 'bandeiras', label: 'As 5 Bandeiras' },
  { id: 'por-que', label: 'Por Que Agora' },
  { id: 'brasil', label: 'O Caso Brasil' },
  { id: 'primeiros-passos', label: 'Primeiros Passos' },
  { id: 'transicao', label: 'Nova Camada' },
  { id: 'palau', label: 'Palau' },
  { id: 'faq', label: 'FAQ' },
  { id: 'cta-final', label: 'Fechamento' },
];

const beliefPoints = [
  'Seu dinheiro deve estar no sistema local.',
  'Sua vida jurídica depende de um único país.',
  'Sua mobilidade é limitada ao seu passaporte.',
];

const problemPoints = [
  'Um governo influencia seu patrimônio.',
  'Uma decisão pode bloquear sua vida financeira.',
  'Uma mudança política altera toda sua estrutura.',
];

const heroBadges = [
  { icon: BookOpen, label: 'Guia Completo' },
  { icon: Clock, label: 'Leitura: 5 min' },
  { icon: CheckCircle2, label: 'Passo a passo' },
  { icon: Flag, label: 'Aplicável no Brasil' },
];

const brazilTimeline = [
  { marker: '1990', title: 'Confisco da poupança', description: 'Quando tudo depende da mesma jurisdição, uma assinatura muda o destino de famílias inteiras.' },
  { marker: '1986–1994', title: 'Hiperinflação e múltiplas moedas', description: 'Poder de compra destruído por sucessivas reconfigurações monetárias.' },
  { marker: 'Agora', title: 'Tributação alta e instabilidade jurídica', description: 'A concentração patrimonial transforma qualquer mudança regulatória em ameaça direta.' },
  { marker: 'Hoje', title: 'Bloqueios judiciais e avanço do DREX', description: 'Camadas de controle financeiro aumentam exatamente quando as alternativas se tornam urgentes.' },
  { marker: 'Próximo passo', title: 'Possíveis restrições ao dinheiro físico', description: 'Quem mantém 100% da vida em um país permanece 100% exposto ao risco político desse país.' },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Teoria das Bandeiras: Como Construir uma Vida Que Não Dependa de Um Único Governo',
  description:
    'Guia visual e estratégico da Teoria das Bandeiras para brasileiros: cidadania, contas, domicílio fiscal, negócios, ativos descentralizados e o gancho premium para Palau.',
  author: { '@type': 'Person', name: 'Lord Junnior' },
  publisher: { '@type': 'Organization', name: 'Lord Junnior' },
  datePublished: '2026-03-07',
  dateModified: '2026-04-17',
  url: 'https://lordjunnior.com.br/teoria-das-bandeiras',
  image: 'https://lordjunnior.com.br/og-bandeiras.jpg',
  keywords:
    'teoria das bandeiras, flag theory brasil, segunda residência, conta internacional, domicílio fiscal, bitcoin autocustódia, palau id, soberania pessoal',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.pergunta,
    acceptedAnswer: { '@type': 'Answer', text: item.resposta },
  })),
};

const imageByFlagTitle: Record<string, { src: string; alt: string }> = {
  'Cidadania / Residência': {
    src: imgPassport,
    alt: 'Passaporte aberto sobre mesa clara com luz natural e terminal ao fundo',
  },
  'Contas Bancárias': {
    src: imgCard,
    alt: 'Cartão internacional sobre smartphone com aplicativo financeiro aberto',
  },
  'Domicílio Fiscal': {
    src: imgDoc,
    alt: 'Documento oficial sobre mesa clara com assinatura e luz lateral',
  },
  'Negócios / Empresas': {
    src: imgSkyline,
    alt: 'Skyline corporativo internacional com arquitetura moderna e luz dourada',
  },
  'Ativos / Patrimônio': {
    src: imgBitcoinGold,
    alt: 'Bitcoin e ouro em composição editorial sobre superfície clara',
  },
};

const difficultyColor: Record<string, string> = {
  Fácil: 'hsl(var(--page-secondary))',
  Médio: 'hsl(var(--page-gold))',
  Avançado: 'hsl(var(--page-danger))',
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  lineHeight: 0.95,
  letterSpacing: '-0.03em',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Inter Tight', sans-serif",
};

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay: index * 0.08 },
  }),
};

function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="max-w-4xl mb-10 sm:mb-14">
      <p
        className="mb-4 text-sm sm:text-base font-black uppercase tracking-[0.32em]"
        style={{ ...bodyStyle, color: 'hsl(var(--page-primary))' }}
      >
        {kicker}
      </p>
      <h2
        className="text-5xl sm:text-6xl lg:text-7xl"
        style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-5 max-w-3xl text-lg sm:text-xl lg:text-[1.45rem] leading-[1.75]"
          style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function CTAButton({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center justify-center gap-3 rounded-full px-7 sm:px-9 py-4 sm:py-5 text-sm sm:text-base font-black uppercase tracking-[0.18em] transition-all duration-500"
      style={{
        ...bodyStyle,
        color: secondary ? 'hsl(var(--page-ink))' : 'hsl(var(--page-surface))',
        background: secondary ? 'hsl(var(--page-surface) / 0.75)' : 'linear-gradient(135deg, hsl(var(--page-primary)) 0%, hsl(var(--page-secondary)) 100%)',
        border: secondary ? '1px solid hsl(var(--page-border))' : '1px solid hsl(var(--page-primary) / 0.35)',
        boxShadow: secondary
          ? '0 16px 40px -24px hsl(var(--page-shadow) / 0.22)'
          : '0 20px 50px -22px hsl(var(--page-primary) / 0.52)',
      }}
    >
      {children}
      <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" size={18} />
    </a>
  );
}

export default function TeoriaDasBandeiras() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 180]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.14]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.35], [0, prefersReducedMotion ? 0 : -64]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.86]);
  const palauY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 120]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const flagsWithImages = useMemo(
    () =>
      BANDEIRAS.map((item) => ({
        ...item,
        image: imageByFlagTitle[item.titulo],
      })),
    [],
  );

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        ...pageTheme,
        backgroundColor: 'hsl(var(--page-bg))',
        color: 'hsl(var(--page-ink))',
      }}
    >
      <FixedThematicBackground image={bgBandeiras} intensity="heavy" />
      <Helmet>
        <title>Teoria das Bandeiras: Estratégia Avançada de Soberania | Lord Junnior</title>
        <meta
          name="description"
          content="Entenda a Teoria das Bandeiras com uma página visual, clara e estratégica: hero editorial, 5 bandeiras, caso Brasil, primeiros passos e o gancho premium para Palau."
        />
        <meta
          name="keywords"
          content="teoria das bandeiras, flag theory, soberania pessoal, conta internacional, segunda residência, domicílio fiscal, Palau ID, bitcoin autocustódia"
        />
        <link rel="canonical" href="https://lordjunnior.com.br/teoria-das-bandeiras" />
        <meta property="og:title" content="Teoria das Bandeiras: Faça Isso Hoje. Agradeça Amanhã." />
        <meta
          property="og:description"
          content="Como construir uma vida que não dependa de um único governo com diversificação real de jurisdição, ativos e mobilidade."
        />
        <meta property="og:url" content="https://lordjunnior.com.br/teoria-das-bandeiras" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://lordjunnior.com.br/og-bandeiras.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="relative z-40 px-4 sm:px-8 lg:px-16 pt-6">
        <BackToHome />
      </div>

      <PageFloatingToc items={tocItems} accentColor="amber" />
      <ScrollToTop />

      <header id="hero" className="relative min-h-[100svh] -mt-16 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img
            src={heroImg}
            alt="Mesa clara com passaporte, mapa, cartão e bússola em composição editorial sobre soberania internacional"
            className="h-full w-full object-cover"
            fetchPriority="high" loading="lazy" decoding="async" />
        </motion.div>

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, hsl(var(--page-bg) / 0.12) 0%, hsl(var(--page-bg) / 0.05) 22%, hsl(var(--page-bg) / 0.58) 58%, hsl(var(--page-bg)) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, hsl(var(--page-bg) / 0.95) 0%, hsl(var(--page-bg) / 0.65) 28%, transparent 58%, transparent 100%)',
          }}
        />

        <div className="relative z-20 mx-auto flex min-h-[100svh] w-[min(1700px,94vw)] items-end pb-14 pt-28 sm:pb-20 lg:pb-24">
          <div className="grid w-full items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:gap-14">
            <motion.div
              style={{ y: heroContentY, opacity: heroContentOpacity }}
              className="max-w-5xl rounded-[2rem] p-6 sm:p-9 lg:p-12"
            >
              <div
                className="inline-flex items-center gap-3 rounded-full px-5 py-3 mb-6"
                style={{
                  backgroundColor: 'hsl(var(--page-surface) / 0.78)',
                  border: '1px solid hsl(var(--page-border))',
                  boxShadow: '0 16px 50px -28px hsl(var(--page-shadow) / 0.22)',
                }}
              >
                <Sparkles size={18} style={{ color: 'hsl(var(--page-gold))' }} />
                <span
                  className="text-sm sm:text-base font-black uppercase tracking-[0.3em]"
                  style={{ ...bodyStyle, color: 'hsl(var(--page-primary))' }}
                >
                  Estratégia Avançada de Soberania
                </span>
              </div>

              <p
                className="mb-5 text-base sm:text-lg font-black uppercase tracking-[0.24em]"
                style={{ ...bodyStyle, color: 'hsl(var(--page-danger))' }}
              >
                Faça isso hoje. Agradeça amanhã.
              </p>

              <h1
                className="max-w-5xl text-[4.2rem] leading-none sm:text-[5.8rem] lg:text-[8.5rem] xl:text-[10rem]"
                style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}
              >
                Como construir uma vida que não dependa de um único governo
              </h1>

              <p
                className="mt-7 max-w-3xl text-2xl sm:text-3xl lg:text-[2.1rem] leading-[1.35] font-bold"
                style={{ ...bodyStyle, color: 'hsl(var(--page-primary-strong))' }}
              >
                Você não precisa pedir permissão para organizar sua vida fora de um único sistema.
              </p>

              <div className="mt-6 max-w-3xl space-y-5">
                <p
                  className="text-xl sm:text-2xl lg:text-[1.7rem] leading-[1.7]"
                  style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}
                >
                  A maioria das pessoas concentra dinheiro, documentos, negócios e liberdade em uma única jurisdição.
                  Isso não é obrigatório. É apenas o padrão.
                </p>
                <p
                  className="text-lg sm:text-xl lg:text-[1.35rem] leading-[1.75]"
                  style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}
                >
                  Esta página mostra como construir alternativas reais, passo a passo, com base na Teoria das Bandeiras.
                </p>
              </div>

              {/* Micro-prova imediata (Ajuste 2) */}
              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  'Estratégia usada há décadas',
                  'Aplicável para brasileiros',
                  'Pode começar com baixo custo',
                ].map((proof) => (
                  <div
                    key={proof}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5"
                    style={{
                      backgroundColor: 'hsl(var(--page-surface) / 0.92)',
                      border: '1px solid hsl(var(--page-secondary) / 0.4)',
                      boxShadow: '0 10px 30px -22px hsl(var(--page-shadow) / 0.3)',
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: 'hsl(var(--page-secondary))' }} />
                    <span className="text-sm sm:text-base font-bold" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                      {proof}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton href="#bandeiras">Ver exatamente como funciona</CTAButton>
                <CTAButton href="#primeiros-passos" secondary>
                  Começar pelo passo 1 (5 minutos)
                </CTAButton>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:hidden">
                {heroBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="inline-flex items-center gap-3 rounded-full px-4 py-3"
                    style={{
                      backgroundColor: 'hsl(var(--page-surface) / 0.82)',
                      border: '1px solid hsl(var(--page-border))',
                      boxShadow: '0 14px 36px -26px hsl(var(--page-shadow) / 0.22)',
                    }}
                  >
                    <badge.icon size={16} style={{ color: 'hsl(var(--page-primary))' }} />
                    <span className="font-bold text-sm" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="hidden lg:flex lg:flex-col lg:gap-4 lg:pb-6"
            >
              {heroBadges.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  whileHover={prefersReducedMotion ? undefined : { y: -6, x: -4 }}
                  className="flex items-center gap-4 rounded-[1.75rem] p-5"
                  style={{
                    backgroundColor: 'hsl(var(--page-surface) / 0.82)',
                    border: '1px solid hsl(var(--page-border))',
                    boxShadow: '0 22px 60px -32px hsl(var(--page-shadow) / 0.28)',
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: index % 2 === 0 ? 'hsl(var(--page-primary))' : 'hsl(var(--page-secondary))' }}
                  >
                    <badge.icon size={18} color="hsl(var(--page-surface))" />
                  </div>
                  <span className="text-lg font-bold" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </motion.aside>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 lg:flex"
        >
          <span
            className="text-sm font-black uppercase tracking-[0.28em]"
            style={{ ...bodyStyle, color: 'hsl(var(--page-primary-strong))' }}
          >
            Role para explorar
          </span>
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} style={{ color: 'hsl(var(--page-primary-strong))' }} />
          </motion.div>
        </motion.div>
      </header>

      <main className="relative z-10 pb-24 sm:pb-32">
        <section className="mx-auto w-[min(1640px,94vw)] py-10 sm:py-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
          >
            <div
              id="crenca"
              className="rounded-[2rem] p-7 sm:p-10 lg:p-12"
              style={{
                backgroundColor: 'hsl(var(--page-surface))',
                border: '1px solid hsl(var(--page-border))',
                boxShadow: '0 30px 80px -44px hsl(var(--page-shadow) / 0.22)',
              }}
            >
              <SectionHeading
                kicker="Bloco 01"
                title={<>Dependência não é inevitável</>}
                description="Você foi condicionado a aceitar concentração como se fosse destino; a página existe para quebrar essa hipótese pela raiz."
              />

              <div className="space-y-5">
                {beliefPoints.map((point, index) => (
                  <motion.div
                    key={point}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="flex items-start gap-4 rounded-[1.5rem] px-5 py-5"
                    style={{ backgroundColor: 'hsl(var(--page-surface-strong) / 0.75)' }}
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-black"
                      style={{
                        ...bodyStyle,
                        color: 'hsl(var(--page-surface))',
                        backgroundColor: 'hsl(var(--page-primary))',
                      }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-xl sm:text-[1.35rem] leading-[1.7]" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.75rem] p-6 sm:p-8" style={{ backgroundColor: 'hsl(var(--page-primary-strong))' }}>
                <p className="text-3xl sm:text-4xl lg:text-5xl" style={{ ...titleStyle, color: 'hsl(var(--page-surface))' }}>
                  Nada disso é estrutural. Tudo isso é apenas organização padrão.
                </p>
                <p className="mt-4 text-lg sm:text-xl lg:text-[1.32rem] leading-[1.75]" style={{ ...bodyStyle, color: 'hsl(var(--page-surface) / 0.88)' }}>
                  E padrões podem ser reconfigurados com método, redundância e estratégia.
                </p>
              </div>

              {/* Loop de curiosidade — prepara Palau */}
              <div
                className="mt-6 flex items-start gap-4 rounded-[1.5rem] p-5 sm:p-6"
                style={{
                  border: '1px dashed hsl(var(--page-gold) / 0.7)',
                  backgroundColor: 'hsl(var(--page-gold) / 0.08)',
                }}
              >
                <Sparkles size={22} style={{ color: 'hsl(var(--page-gold))' }} className="shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl lg:text-[1.55rem] leading-[1.55] font-bold" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                  Mas existe uma camada que quase ninguém considera.
                </p>
              </div>
            </div>

            <motion.div
              whileHover={prefersReducedMotion ? undefined : { y: -10 }}
              className="relative min-h-[480px] overflow-hidden rounded-[2rem] lg:min-h-[760px]"
              style={{
                border: '1px solid hsl(var(--page-border))',
                boxShadow: '0 35px 90px -44px hsl(var(--page-shadow) / 0.26)',
              }}
            >
              <img
                src={imgPassport}
                alt="Passaporte sobre mapa com luz natural e composição editorial clara"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 35%, hsl(var(--page-bg) / 0.1) 60%, hsl(var(--page-ink) / 0.78) 100%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <p className="text-sm font-black uppercase tracking-[0.28em]" style={{ ...bodyStyle, color: 'hsl(var(--page-gold))' }}>
                  Reconfiguração de padrão
                </p>
                <p className="mt-3 max-w-xl text-2xl sm:text-3xl lg:text-4xl" style={{ ...titleStyle, color: 'hsl(var(--page-surface))' }}>
                  Quando a vida inteira depende de um único sistema, qualquer falha desse sistema vira tragédia pessoal.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="mx-auto w-[min(1640px,94vw)] py-10 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.article
              id="o-que-e"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="overflow-hidden rounded-[2rem]"
              style={{
                backgroundColor: 'hsl(var(--page-surface))',
                border: '1px solid hsl(var(--page-border))',
                boxShadow: '0 30px 80px -44px hsl(var(--page-shadow) / 0.2)',
              }}
            >
              <img
                src={imgCard}
                alt="Cartão internacional e aplicativo bancário em visual claro e editorial"
                className="h-[320px] w-full object-cover sm:h-[420px]"
                loading="lazy"
              />
              <div className="p-7 sm:p-10 lg:p-12">
                <SectionHeading
                  kicker="Bloco 02"
                  title={<>O que é a Teoria das Bandeiras</>}
                  description="A Teoria das Bandeiras é uma estratégia internacional de diversificação de jurisdição. A ideia é simples: não concentrar sua vida em um único governo."
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {['Cidadania', 'Contas', 'Negócios', 'Ativos'].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.5rem] px-5 py-5"
                      style={{ backgroundColor: 'hsl(var(--page-surface-strong) / 0.78)' }}
                    >
                      <p className="text-xl sm:text-2xl" style={{ ...titleStyle, color: 'hsl(var(--page-primary))' }}>
                        {item}
                      </p>
                      <p className="mt-2 text-base sm:text-lg leading-[1.7]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                        Distribuir reduz risco, aumenta liberdade e cria redundância real.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>

            <motion.article
              id="problema"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="relative overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-12"
              style={{
                background:
                  'linear-gradient(160deg, hsl(var(--page-primary-strong)) 0%, hsl(var(--page-primary)) 45%, hsl(var(--page-secondary)) 100%)',
                boxShadow: '0 36px 90px -42px hsl(var(--page-primary) / 0.44)',
              }}
            >
              <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full" style={{ backgroundColor: 'hsl(var(--page-gold) / 0.18)' }} />
              <div className="absolute -bottom-16 left-8 h-44 w-44 rounded-full" style={{ backgroundColor: 'hsl(var(--page-surface) / 0.08)' }} />
              <SectionHeading
                kicker="Bloco 03"
                title={<>O problema de depender de um único país</>}
                description="Concentração é vulnerabilidade. Diversificação é estratégia. O risco nunca é apenas econômico; ele é jurídico, operacional e familiar."
              />
              <div className="space-y-4">
                {problemPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.5rem] border px-5 py-5"
                    style={{
                      borderColor: 'hsl(var(--page-surface) / 0.18)',
                      backgroundColor: 'hsl(var(--page-surface) / 0.08)',
                    }}
                  >
                    <p className="text-xl sm:text-[1.35rem] leading-[1.7]" style={{ ...bodyStyle, color: 'hsl(var(--page-surface))' }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-start gap-4 rounded-[1.75rem] p-6" style={{ backgroundColor: 'hsl(var(--page-surface) / 0.12)' }}>
                <Quote size={28} style={{ color: 'hsl(var(--page-gold))' }} className="shrink-0 mt-1" />
                <p className="text-2xl sm:text-3xl lg:text-4xl" style={{ ...titleStyle, color: 'hsl(var(--page-surface))' }}>
                  Quem depende de uma única estrutura política não tem estratégia. Tem exposição.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        <section id="bandeiras" className="mx-auto w-[min(1700px,95vw)] py-12 sm:py-16 scroll-mt-24">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <SectionHeading
              kicker="Bloco 04"
              title={<>As 5 Bandeiras da Soberania</>}
              description="Nada pequeno, nada tímido: cada bandeira recebe espaço, imagem ampla e contexto suficiente para fazer a mensagem gritar na tela."
            />
          </motion.div>

          <div className="grid gap-7 lg:grid-cols-2">
            {flagsWithImages.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.numero}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  whileHover={prefersReducedMotion ? undefined : { y: -12 }}
                  className={`group overflow-hidden rounded-[2rem] ${index === 4 ? 'lg:col-span-2' : ''}`}
                  style={{
                    backgroundColor: 'hsl(var(--page-surface))',
                    border: '1px solid hsl(var(--page-border))',
                    boxShadow: '0 30px 80px -44px hsl(var(--page-shadow) / 0.22)',
                  }}
                >
                  <div className={`grid ${index === 4 ? 'lg:grid-cols-[1.08fr_0.92fr]' : 'lg:grid-cols-[0.96fr_1.04fr]'}`}>
                    <div className={`relative overflow-hidden ${index % 2 === 1 && index !== 4 ? 'lg:order-2' : ''}`}>
                      <img
                        src={item.image?.src}
                        alt={item.image?.alt}
                        className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${index === 4 ? 'h-[380px] sm:h-[460px] lg:h-full' : 'h-[340px] sm:h-[420px] lg:h-full'}`}
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(180deg, transparent 40%, hsl(var(--page-ink) / 0.72) 100%)',
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 sm:p-8">
                        <div>
                          <p className="text-sm font-black uppercase tracking-[0.28em]" style={{ ...bodyStyle, color: 'hsl(var(--page-gold))' }}>
                            Bandeira {item.numero}
                          </p>
                          <p className="mt-2 text-3xl sm:text-4xl" style={{ ...titleStyle, color: 'hsl(var(--page-surface))' }}>
                            {item.subtitulo}
                          </p>
                        </div>
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-full"
                          style={{ backgroundColor: 'hsl(var(--page-surface) / 0.14)' }}
                        >
                          <Icon size={26} color="hsl(var(--page-surface))" />
                        </div>
                      </div>
                    </div>

                    <div className={`p-7 sm:p-10 lg:p-12 ${index % 2 === 1 && index !== 4 ? 'lg:order-1' : ''}`}>
                      <p className="text-sm font-black uppercase tracking-[0.32em]" style={{ ...bodyStyle, color: 'hsl(var(--page-primary))' }}>
                        Função estratégica: {item.subtitulo.toLowerCase()}
                      </p>
                      <h3 className="mt-3 text-5xl sm:text-6xl" style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}>
                        {item.titulo}
                      </h3>
                      <p className="mt-5 text-lg sm:text-xl lg:text-[1.32rem] leading-[1.75]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                        {item.descricao}
                      </p>

                      <div className="mt-7 grid gap-3">
                        {item.exemplos.slice(0, 4).map((example) => (
                          <div
                            key={example}
                            className="rounded-[1.4rem] px-5 py-4"
                            style={{ backgroundColor: 'hsl(var(--page-surface-strong) / 0.78)' }}
                          >
                            <p className="text-base sm:text-lg leading-[1.7]" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                              {example}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 rounded-[1.5rem] p-5" style={{ backgroundColor: 'hsl(var(--page-primary-strong))' }}>
                        <p className="text-2xl sm:text-3xl" style={{ ...titleStyle, color: 'hsl(var(--page-surface))' }}>
                          {item.destaque}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="por-que" className="mx-auto w-[min(1640px,94vw)] py-12 sm:py-16 scroll-mt-24">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <SectionHeading
              kicker="Bloco 05"
              title={<>Por que essa estratégia deixou de ser opcional</>}
              description="O contexto mudou. O custo da dependência subiu. E a vantagem agora pertence a quem constrói redundância antes do próximo choque."
            />
          </motion.div>

          <div className="grid gap-7 lg:grid-cols-3">
            {POR_QUE_AGORA.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.titulo}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-90px' }}
                  whileHover={prefersReducedMotion ? undefined : { y: -10, scale: 1.01 }}
                  className="rounded-[2rem] p-7 sm:p-9"
                  style={{
                    backgroundColor: 'hsl(var(--page-surface))',
                    border: '1px solid hsl(var(--page-border))',
                    boxShadow: '0 28px 70px -42px hsl(var(--page-shadow) / 0.2)',
                  }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: 'hsl(var(--page-primary))' }}
                  >
                    <Icon size={28} color="hsl(var(--page-surface))" />
                  </div>
                  <h3 className="mt-6 text-4xl sm:text-5xl" style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}>
                    {item.titulo}
                  </h3>
                  <p className="mt-4 text-lg sm:text-xl lg:text-[1.28rem] leading-[1.75]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                    {item.descricao}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="brasil" className="mx-auto w-[min(1640px,94vw)] py-12 sm:py-16 scroll-mt-24">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
            <motion.aside
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div
                className="overflow-hidden rounded-[2rem]"
                style={{
                  backgroundColor: 'hsl(var(--page-surface))',
                  border: '1px solid hsl(var(--page-border))',
                  boxShadow: '0 30px 80px -46px hsl(var(--page-shadow) / 0.22)',
                }}
              >
                <img
                  src={imgDoc}
                  alt="Documento e assinatura em enquadramento editorial claro representando risco jurídico"
                  className="h-[300px] w-full object-cover sm:h-[380px]"
                  loading="lazy"
                />
                <div className="p-7 sm:p-9">
                  <SectionHeading
                    kicker="Bloco 06"
                    title={<>O caso Brasil</>}
                    description="O histórico brasileiro mostra por que concentração jurisdicional é um risco concreto, não uma hipótese teórica."
                  />
                  <div className="rounded-[1.6rem] p-6" style={{ backgroundColor: 'hsl(var(--page-primary-strong))' }}>
                    <p className="text-3xl sm:text-4xl" style={{ ...titleStyle, color: 'hsl(var(--page-surface))' }}>
                      Quem tem 100% da vida em um país está 100% exposto.
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>

            <div className="relative pl-0 sm:pl-6">
              <div className="absolute left-3 top-0 hidden h-full w-px sm:block" style={{ background: 'linear-gradient(180deg, hsl(var(--page-primary) / 0.15), hsl(var(--page-secondary) / 0.3), hsl(var(--page-gold) / 0.2))' }} />
              <div className="space-y-6">
                {brazilTimeline.map((item, index) => (
                  <motion.article
                    key={item.title}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-90px' }}
                    className="relative overflow-hidden rounded-[2rem] p-7 sm:p-9"
                    style={{
                      backgroundColor: 'hsl(var(--page-surface))',
                      border: '1px solid hsl(var(--page-border))',
                      boxShadow: '0 28px 72px -42px hsl(var(--page-shadow) / 0.18)',
                    }}
                  >
                    <div
                      className="absolute left-[-0.2rem] top-8 hidden h-4 w-4 rounded-full sm:block"
                      style={{ backgroundColor: 'hsl(var(--page-primary))', boxShadow: '0 0 0 10px hsl(var(--page-primary) / 0.1)' }}
                    />
                    <p className="text-sm font-black uppercase tracking-[0.3em]" style={{ ...bodyStyle, color: 'hsl(var(--page-secondary))' }}>
                      {item.marker}
                    </p>
                    <h3 className="mt-3 text-4xl sm:text-5xl" style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}>
                      {item.title}
                    </h3>
                    <p className="mt-4 text-lg sm:text-xl lg:text-[1.24rem] leading-[1.75]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                      {item.description}
                    </p>
                  </motion.article>
                ))}
              </div>
              <div
                className="mt-8 rounded-[2rem] p-7 sm:p-9"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--page-danger) / 0.08) 0%, hsl(var(--page-surface-strong) / 0.85) 100%)',
                  border: '1px solid hsl(var(--page-danger) / 0.35)',
                }}
              >
                <p className="text-3xl sm:text-4xl lg:text-5xl" style={{ ...titleStyle, color: 'hsl(var(--page-danger))' }}>
                  Isso já aconteceu antes. E pode acontecer de novo.
                </p>
                <p className="mt-4 text-lg sm:text-xl lg:text-[1.22rem] leading-[1.75]" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                  Proteção não nasce de esperança; nasce de estrutura. O Brasil é a prova de que centralização patrimonial cobra seu preço quando o cenário muda.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="primeiros-passos" className="mx-auto w-[min(1640px,94vw)] py-12 sm:py-16 scroll-mt-24">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <SectionHeading
              kicker="Bloco 07"
              title={<>Como começar na prática</>}
              description="A jornada não precisa começar gigante. Ela precisa começar certa, com uma progressão clara e dificuldade visível."
            />
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10">
            <motion.aside
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="rounded-[2rem] p-7 sm:p-8 lg:sticky lg:top-24 lg:self-start"
              style={{
                backgroundColor: 'hsl(var(--page-surface))',
                border: '1px solid hsl(var(--page-border))',
                boxShadow: '0 28px 70px -42px hsl(var(--page-shadow) / 0.2)',
              }}
            >
              <p className="text-sm font-black uppercase tracking-[0.3em]" style={{ ...bodyStyle, color: 'hsl(var(--page-primary))' }}>
                Jornada guiada
              </p>
              <h3 className="mt-3 text-4xl sm:text-5xl" style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}>
                Sequência recomendada
              </h3>
              <div className="mt-8 space-y-4">
                {PRIMEIROS_PASSOS.map((step, index) => (
                  <div key={step.passo} className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: index === 0 ? 'hsl(var(--page-secondary))' : 'hsl(var(--page-primary) / 0.12)' }}>
                      <span className="font-black text-base" style={{ ...bodyStyle, color: index === 0 ? 'hsl(var(--page-surface))' : 'hsl(var(--page-primary))' }}>
                        {step.passo}
                      </span>
                    </div>
                    <div className="h-px flex-1" style={{ backgroundColor: 'hsl(var(--page-border))' }} />
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-[1.5rem] p-5" style={{ backgroundColor: 'hsl(var(--page-surface-strong) / 0.82)' }}>
                <p className="text-lg leading-[1.7]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                  Comece onde o impacto é maior e a fricção é menor: patrimônio, liquidez, mobilidade e só depois estrutura mais pesada.
                </p>
              </div>
            </motion.aside>

            <div className="space-y-6">
              {PRIMEIROS_PASSOS.map((step, index) => (
                <motion.article
                  key={step.passo}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-90px' }}
                  whileHover={prefersReducedMotion ? undefined : { y: -8 }}
                  className="rounded-[2rem] p-7 sm:p-9"
                  style={{
                    backgroundColor: 'hsl(var(--page-surface))',
                    border: '1px solid hsl(var(--page-border))',
                    boxShadow: '0 28px 72px -42px hsl(var(--page-shadow) / 0.18)',
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.3em]" style={{ ...bodyStyle, color: 'hsl(var(--page-primary))' }}>
                        Etapa {step.passo}
                      </p>
                      <h3 className="mt-2 text-4xl sm:text-5xl" style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}>
                        {step.titulo}
                      </h3>
                    </div>
                    <div
                      className="rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.22em]"
                      style={{
                        ...bodyStyle,
                        color: step.dificuldade === 'Médio' ? 'hsl(var(--page-ink))' : 'hsl(var(--page-surface))',
                        backgroundColor: difficultyColor[step.dificuldade],
                      }}
                    >
                      Dificuldade: {step.dificuldade.toLowerCase()}
                    </div>
                  </div>
                  <p className="mt-5 text-lg sm:text-xl lg:text-[1.28rem] leading-[1.75]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                    {step.descricao}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="transicao" className="mx-auto w-[min(1640px,94vw)] py-12 sm:py-16 scroll-mt-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-8 overflow-hidden rounded-[2.4rem] lg:grid-cols-[1.02fr_0.98fr]"
            style={{
              backgroundColor: 'hsl(var(--page-surface))',
              border: '1px solid hsl(var(--page-border))',
              boxShadow: '0 34px 84px -46px hsl(var(--page-shadow) / 0.22)',
            }}
          >
            <div className="p-7 sm:p-10 lg:p-12 xl:p-14">
              <SectionHeading
                kicker="Bloco 08"
                title={<>Uma nova camada de soberania</>}
                description="Historicamente, a estratégia envolvia território, bancos e estruturas jurídicas. Hoje existe uma nova camada: identidade internacional digital."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {['Território', 'Bancos', 'Estruturas jurídicas', 'Identidade digital'].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] p-5"
                    style={{ backgroundColor: index === 3 ? 'hsl(var(--page-primary-strong))' : 'hsl(var(--page-surface-strong) / 0.82)' }}
                  >
                    <p
                      className="text-2xl sm:text-3xl"
                      style={{
                        ...titleStyle,
                        color: index === 3 ? 'hsl(var(--page-surface))' : 'hsl(var(--page-ink))',
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[360px] lg:min-h-full">
              <img
                src={imgSkyline}
                alt="Cidade internacional moderna representando expansão de jurisdições e identidade global"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 30%, hsl(var(--page-ink) / 0.78) 100%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <p className="text-sm font-black uppercase tracking-[0.32em]" style={{ ...bodyStyle, color: 'hsl(var(--page-gold))' }}>
                  Nova etapa
                </p>
                <p className="mt-3 text-3xl sm:text-4xl lg:text-5xl" style={{ ...titleStyle, color: 'hsl(var(--page-surface))' }}>
                  A soberania agora também passa por reconhecimento digital emitido por uma nação.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="palau" className="relative py-14 sm:py-18 scroll-mt-24">
          <motion.div className="absolute inset-0 overflow-hidden" style={{ y: palauY }}>
            <img
              src={palauImg}
              alt="Ilha tropical com oceano azul e atmosfera de refúgio estratégico no Pacífico"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, hsl(var(--page-ink) / 0.82) 0%, hsl(var(--page-primary-strong) / 0.66) 45%, hsl(var(--page-secondary) / 0.52) 100%)',
            }}
          />
          <div className="relative z-10 mx-auto w-[min(1700px,95vw)] py-20 sm:py-28 lg:py-32">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="max-w-4xl rounded-[2.4rem] p-7 sm:p-10 lg:p-14"
              style={{
                backgroundColor: 'hsl(var(--page-surface) / 0.1)',
                border: '1px solid hsl(var(--page-surface) / 0.14)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <p className="text-sm sm:text-base font-black uppercase tracking-[0.34em]" style={{ ...bodyStyle, color: 'hsl(var(--page-gold))' }}>
                Bloco 09
              </p>

              {/* Pré-frase de redução de fricção */}
              <p
                className="mt-4 text-2xl sm:text-3xl lg:text-[2rem] leading-[1.35] font-bold"
                style={{ ...bodyStyle, color: 'hsl(var(--page-gold))' }}
              >
                Você não precisa mudar de país para começar.
              </p>

              <h2 className="mt-4 text-[4rem] leading-none sm:text-[5.5rem] lg:text-[7.6rem]" style={{ ...titleStyle, color: 'hsl(var(--page-surface))' }}>
                Refúgio final: Palau
              </h2>
              <p className="mt-2 text-2xl sm:text-3xl lg:text-[2.2rem]" style={{ ...bodyStyle, color: 'hsl(var(--page-surface))' }}>
                Uma identidade soberana no Pacífico.
              </p>
              <div className="mt-6 space-y-5 max-w-3xl">
                <p className="text-lg sm:text-xl lg:text-[1.32rem] leading-[1.8]" style={{ ...bodyStyle, color: 'hsl(var(--page-surface) / 0.92)' }}>
                  Palau oferece um dos programas mais acessíveis de identidade digital emitida por uma nação soberana.
                </p>
                <p className="text-lg sm:text-xl lg:text-[1.32rem] leading-[1.8]" style={{ ...bodyStyle, color: 'hsl(var(--page-surface) / 0.92)' }}>
                  Para quem busca redundância documental, acesso internacional e flexibilidade operacional, isso representa uma nova camada estratégica.
                </p>
                {/* Redução de objeção */}
                <p
                  className="text-xl sm:text-2xl lg:text-[1.5rem] leading-[1.55] font-bold border-l-4 pl-5 py-2"
                  style={{
                    ...bodyStyle,
                    color: 'hsl(var(--page-surface))',
                    borderColor: 'hsl(var(--page-gold))',
                  }}
                >
                  Isso não substitui as outras bandeiras. Mas adiciona uma nova camada de liberdade.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton href="/palau-digital-residency">Ver como funciona</CTAButton>
                <CTAButton href="#cta-final" secondary>
                  Entrar na lista
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="faq" className="mx-auto w-[min(1500px,92vw)] py-14 sm:py-18 scroll-mt-24">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <SectionHeading
              kicker="Bloco 10"
              title={<>Perguntas frequentes</>}
              description="Sem apertar o texto e sem esconder informação: FAQ espaçado, legível e com destaque visual na pergunta mais importante."
            />
          </motion.div>
          <div className="space-y-5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.article
                  key={item.pergunta}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="overflow-hidden rounded-[1.9rem]"
                  style={{
                    backgroundColor: index === 0 ? 'hsl(var(--page-primary-strong))' : 'hsl(var(--page-surface))',
                    border: '1px solid hsl(var(--page-border))',
                    boxShadow: '0 24px 60px -42px hsl(var(--page-shadow) / 0.18)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left sm:px-8 sm:py-7"
                  >
                    <span
                      className="text-3xl sm:text-4xl lg:text-5xl"
                      style={{
                        ...titleStyle,
                        color: index === 0 ? 'hsl(var(--page-surface))' : 'hsl(var(--page-ink))',
                      }}
                    >
                      {item.pergunta}
                    </span>
                    <ChevronDown
                      size={28}
                      style={{
                        color: index === 0 ? 'hsl(var(--page-gold))' : 'hsl(var(--page-primary))',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.35s ease',
                      }}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.38, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-7 sm:px-8 sm:pb-8">
                      <p
                        className="text-lg sm:text-xl lg:text-[1.28rem] leading-[1.78]"
                        style={{
                          ...bodyStyle,
                          color: index === 0 ? 'hsl(var(--page-surface) / 0.9)' : 'hsl(var(--page-muted))',
                        }}
                      >
                        {item.resposta}
                      </p>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="cta-final" className="mx-auto w-[min(1640px,94vw)] py-14 sm:py-18 scroll-mt-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="overflow-hidden rounded-[2.4rem] p-7 sm:p-10 lg:p-14"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--page-surface)) 0%, hsl(var(--page-surface-strong)) 58%, hsl(var(--page-bg)) 100%)',
              border: '1px solid hsl(var(--page-border))',
              boxShadow: '0 34px 84px -44px hsl(var(--page-shadow) / 0.24)',
            }}
          >
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-sm sm:text-base font-black uppercase tracking-[0.34em]" style={{ ...bodyStyle, color: 'hsl(var(--page-primary))' }}>
                  Bloco 11
                </p>
                <h2 className="mt-3 text-[4rem] leading-none sm:text-[5.5rem] lg:text-[7.4rem]" style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}>
                  Soberania pessoal
                </h2>
                <p className="mt-3 text-2xl sm:text-3xl lg:text-[2rem]" style={{ ...bodyStyle, color: 'hsl(var(--page-primary-strong))' }}>
                  Comece hoje. Com estratégia.
                </p>
                <div className="mt-6 max-w-3xl space-y-4">
                  <p className="text-lg sm:text-xl lg:text-[1.3rem] leading-[1.78]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                    Você não precisa mudar tudo de uma vez. Mas precisa começar.
                  </p>
                  <p className="text-lg sm:text-xl lg:text-[1.3rem] leading-[1.78]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                    A próxima camada dessa estratégia é identidade internacional digital. E é exatamente aí que Palau entra.
                  </p>
                  {/* Frase de fechamento — alta intensidade */}
                  <div
                    className="mt-4 rounded-[1.5rem] p-6 sm:p-7"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--page-primary-strong)) 0%, hsl(var(--page-secondary)) 100%)',
                      boxShadow: '0 24px 60px -32px hsl(var(--page-primary) / 0.5)',
                    }}
                  >
                    <p className="text-2xl sm:text-3xl lg:text-[2rem] leading-[1.4] font-black" style={{ ...bodyStyle, color: 'hsl(var(--page-surface))' }}>
                      Se você não fizer nada, nada muda.
                    </p>
                    <p className="mt-2 text-2xl sm:text-3xl lg:text-[2rem] leading-[1.4]" style={{ ...bodyStyle, color: 'hsl(var(--page-gold))' }}>
                      Se começar hoje, você ganha tempo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 lg:justify-self-end lg:min-w-[360px]">
                <CTAButton href="#primeiros-passos">Começar agora</CTAButton>
                <CTAButton href="#hero" secondary>
                  Ver plano completo
                </CTAButton>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
