import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Globe, Shield, Eye, Building2, ChevronRight, Lock, Landmark,
  AlertTriangle, BarChart3, ArrowRight, Sparkles, TrendingUp,
} from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import SnippetBait from '@/components/SnippetBait';

import heroImg from '@/assets/soberania-hub-hero.jpg';
import contasIntlImg from '@/assets/soberania-contas-intl.jpg';
import offshoreImg from '@/assets/soberania-offshore.jpg';
import nokycImg from '@/assets/soberania-nokyc.jpg';
import sistemasImg from '@/assets/soberania-sistemas.jpg';
import BackToHome from '@/components/BackToHome';

/* ── Motion ── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
  }),
};

/* ── Category Data ── */
const CATEGORIES = [
  {
    id: 'contas-internacionais',
    icon: Globe,
    color: 'blue',
    title: 'Contas Internacionais',
    subtitle: 'Plataformas reguladas com acesso global',
    description: 'Contas bancárias e fintechs com conversão multi-moeda, cartões internacionais e transferências cross-border.',
    image: contasIntlImg,
    items: [
      { name: 'Neobankless', status: 'review', link: '/soberania-financeira/contas-internacionais/neobankless' },
      { name: 'Bank of Georgia', status: 'review', link: '/soberania-financeira/contas-internacionais/bank-of-georgia' },
      { name: 'Wise', status: 'review', link: '/soberania-financeira/contas-internacionais/wise' },
      { name: 'Payoneer', status: 'review', link: '/soberania-financeira/contas-internacionais/payoneer' },
      { name: 'GrabrFi — Conta bancária nos EUA com stablecoins', status: 'review', link: '/soberania-financeira/contas-internacionais/grabrfi' },
    ],
    privacyLevel: 'Médio',
    reviewCount: 5,
  },
  {
    id: 'contas-offshore',
    icon: Building2,
    color: 'amber',
    title: 'Contas Offshore',
    subtitle: 'Estruturas fora da jurisdição nacional',
    description: '10 contas offshore cripto que NÃO reportam — abertura remota, jurisdições favoráveis e análise de risco.',
    image: offshoreImg,
    items: [
      { name: 'Top 10 contas offshore cripto', status: 'review', link: '/soberania-financeira/contas-offshore/top-10' },
      { name: 'Guia de abertura remota', status: 'review', link: '/soberania-financeira/contas-offshore/abertura-remota' },
    ],
    privacyLevel: 'Alto',
    reviewCount: 1,
  },
  {
    id: 'exchanges-sem-kyc',
    icon: Eye,
    color: 'emerald',
    title: 'Exchanges sem KYC',
    subtitle: 'Compre cripto sem entregar sua identidade',
    description: 'Diretórios, P2P e swaps que operam fora do radar — sem selfie, sem documento, sem rastro.',
    image: nokycImg,
    items: [
      { name: 'KYCNot.me — O mapa da privacidade cripto', status: 'disponível', link: '/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me' },
      { name: 'Optima — Cripto por dinheiro vivo na sua porta', status: 'disponível', link: '/soberania-financeira/exchanges-privacidade-e-kyc/optima-exchange' },
      { name: 'PegasusSwap — Swap sem KYC oculto', status: 'disponível', link: '/soberania-financeira/exchanges-privacidade-e-kyc/pegasus-swap' },
    ],
    privacyLevel: 'Muito Alto',
    reviewCount: 2,
  },
  {
    id: 'sistemas-alternativos',
    icon: Landmark,
    color: 'rose',
    title: 'Sistemas Alternativos',
    subtitle: 'Infraestrutura geopolítica emergente',
    description: 'BRICS Pay e a infraestrutura financeira paralela fora do SWIFT — análise de vigilância e oportunidades.',
    image: sistemasImg,
    items: [
      { name: 'BRICS Pay — O App da Nova Ordem Mundial', status: 'disponível', link: '/soberania-financeira/brics-pay' },
    ],
    privacyLevel: 'Variável',
    reviewCount: 1,
  },
];

/* ── Ranking preview ── */
const RANKING_PREVIEW = [
  { name: 'Neobankless', privacy: 'Médio', report: 'Sim', country: 'Brasil', color: 'text-amber-400' },
  { name: 'Bank of Georgia', privacy: 'Alto', report: 'Parcial', country: 'Geórgia', color: 'text-emerald-400' },
  { name: 'Contas offshore cripto', privacy: 'Muito Alto', report: 'Não', country: 'Vários', color: 'text-emerald-500' },
  { name: 'KYCNot.me (exchanges)', privacy: 'Muito Alto', report: 'Não', country: 'Descentralizado', color: 'text-emerald-500' },
  { name: 'BRICS Pay', privacy: 'Baixo', report: 'Sim', country: 'Multi-BRICS', color: 'text-rose-400' },
];

/* ── Color maps ── */
const colorMap: Record<string, { text: string; bg: string; border: string; glow: string; gradient: string }> = {
  blue:    { text: 'text-blue-400', bg: 'bg-blue-500/8', border: 'border-blue-500/20', glow: 'rgba(59,130,246,0.15)', gradient: 'from-blue-500/20 to-transparent' },
  amber:   { text: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/20', glow: 'rgba(245,158,11,0.15)', gradient: 'from-amber-500/20 to-transparent' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/20', glow: 'rgba(16,185,129,0.15)', gradient: 'from-emerald-500/20 to-transparent' },
  rose:    { text: 'text-rose-400', bg: 'bg-rose-500/8', border: 'border-rose-500/20', glow: 'rgba(244,63,94,0.15)', gradient: 'from-rose-500/20 to-transparent' },
};

const privacyColor: Record<string, string> = {
  'Baixo': 'text-rose-400',
  'Médio': 'text-amber-400',
  'Alto': 'text-emerald-400',
  'Muito Alto': 'text-emerald-500',
  'Variável': 'text-stone-400',
};

/* ── Schema ── */
const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Soberania Financeira — Contas, Exchanges e Infraestrutura Fora do Sistema',
  description: 'Hub completo de ferramentas de soberania financeira.',
  url: 'https://lordjunnior.com.br/soberania-financeira',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: CATEGORIES.map((c, i) => ({
      '@type': 'ListItem', position: i + 1, name: c.title, description: c.description,
    })),
  },
};

/* ── Category Card Component ── */
const CategoryCard = ({ cat, idx }: { cat: typeof CATEGORIES[0]; idx: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const colors = colorMap[cat.color];
  const Icon = cat.icon;
  const hasReviews = cat.items.some(i => (i.status === 'review' || i.status === 'disponível') && i.link);

  return (
    <motion.div
      ref={ref}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp} custom={idx}
      className="group relative"
    >
      <div className={`relative rounded-3xl border ${colors.border} overflow-hidden transition-all duration-700 hover:border-opacity-60 hover:shadow-2xl`}
        style={{ boxShadow: `0 0 80px -20px ${colors.glow}` }}
      >
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

        {/* Image header */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.5) saturate(0.8)' }}
              loading="lazy"
            />
          </motion.div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/60 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-40`} />

          {/* Privacy badge */}
          <div className="absolute top-4 right-4">
            <span className={`text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full backdrop-blur-md ${privacyColor[cat.privacyLevel]} bg-black/40 border border-white/10`}>
              <Lock size={8} className="inline mr-1 -mt-px" /> {cat.privacyLevel}
            </span>
          </div>

          {/* Review count */}
          {cat.reviewCount > 0 && (
            <div className="absolute top-4 left-4">
              <span className={`text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full backdrop-blur-md ${colors.text} bg-black/40 border border-white/10`}>
                <Sparkles size={8} className="inline mr-1 -mt-px" /> {cat.reviewCount} reviews
              </span>
            </div>
          )}

          {/* Icon floating */}
          <div className="absolute bottom-4 left-6">
            <div className={`p-3.5 rounded-2xl backdrop-blur-xl bg-black/50 border ${colors.border}`}>
              <Icon className={colors.text} size={26} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 pt-5">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {cat.title}
          </h3>
          <p className="text-[11px] text-stone-500 uppercase tracking-[0.15em] mb-4">{cat.subtitle}</p>
          <p className="text-stone-400 text-sm leading-relaxed mb-6">{cat.description}</p>

          {/* Items list */}
          <div className="space-y-2.5 mb-6">
            {cat.items.map((item) => (
              <div key={item.name} className="flex items-center justify-between group/item">
                {(item.status === 'review' || item.status === 'disponível') && item.link ? (
                  <Link
                    to={item.link}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
                  >
                    <span className="text-stone-200 text-sm font-medium">{item.name}</span>
                    <span className={`${colors.text} flex items-center gap-1 text-xs font-semibold`}>
                      {item.status === 'review' ? 'Ler review' : 'Acessar'} <ArrowRight size={12} className="group-hover/item:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                    <span className="text-stone-500 text-sm">{item.name}</span>
                    <span className="text-stone-600 text-[10px] italic tracking-wider uppercase">em breve</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom indicator */}
          {!hasReviews && (
            <div className="pt-4 border-t border-white/[0.04]">
              <span className={`text-[10px] font-semibold ${colors.text} opacity-50 flex items-center gap-1.5 tracking-wider uppercase`}>
                <Lock size={10} /> Categoria em construção
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Page ── */
const SoberaniaFinanceira = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const rankingRef = useRef(null);
  const rankingInView = useInView(rankingRef, { once: true, margin: '-80px' });

  return (
    <>
      <Helmet>
        <title>Soberania Financeira — Contas Internacionais, Offshore e Cripto sem KYC</title>
        <meta name="description" content="Hub completo de ferramentas de soberania financeira: contas internacionais, contas offshore cripto, exchanges sem KYC e sistemas financeiros alternativos." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
      </Helmet>
      <ScrollToTop />

      <div className="min-h-screen bg-[#050808] text-stone-200">

        {/* ═══ FILM GRAIN ═══ */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.035]">
          <svg width="100%" height="100%">
            <filter id="sf-grain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
            <rect width="100%" height="100%" filter="url(#sf-grain)" />
          </svg>
        </div>

        {/* ═══ LIGHT BEAMS ═══ */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[800px] h-[800px] opacity-[0.04]"
            style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.5), transparent 70%)' }} />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] opacity-[0.03]"
            style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.4), transparent 70%)' }} />
        </div>

        {/* ═══ HERO ═══ */}
        <div ref={heroRef} className="relative h-[85vh] min-h-[600px] max-h-[900px] flex items-end overflow-hidden">
          {/* Parallax background */}
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
            <div className="absolute inset-0 scale-110">
              <img src={heroImg} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.35) saturate(0.7)' }} loading="eager" fetchPriority="high" decoding="async" />
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.1) 0%, rgba(5,8,8,0.4) 40%, rgba(5,8,8,0.85) 70%, rgba(5,8,8,1) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 20%, transparent 30%, rgba(5,8,8,0.9) 100%)' }} />
          </motion.div>

          {/* Hero Content */}
          <motion.div
            className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24"
            style={{ opacity: heroOpacity }}
          >
            {/* Back */}
            <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-10">
              <ChevronRight size={14} className="rotate-180" /> Início
            </Link>

            {/* Phase tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5"
            >
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-blue-400/70">
                ECOSSISTEMA FINANCEIRO
              </span>
            </motion.div>

            {/* Title */}
            <div className="flex items-start gap-5 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 shrink-0 backdrop-blur-sm"
              >
                <Shield className="text-blue-400" size={30} />
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Soberania<br />Financeira
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                  className="text-stone-400 text-sm md:text-base lg:text-lg leading-relaxed mt-4 max-w-2xl"
                >
                  Contas internacionais, estruturas offshore e infraestrutura financeira fora do sistema tradicional. Análise técnica, sem alarmismo — apenas dados.
                </motion.p>
              </div>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="flex flex-wrap gap-6 mt-8"
            >
              {[
                { label: 'Categorias', value: '4' },
                { label: 'Reviews Publicados', value: '4' },
                { label: 'Em Produção', value: '7+' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</span>
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-500">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #050808)' }} />
        </div>

        {/* SnippetBait */}
        <div className="max-w-5xl mx-auto px-6">
          <SnippetBait
            text="Ter dinheiro em um só país é o mesmo que ter todas as chaves na mesma gaveta. Diversificação jurisdicional não é luxo de milionário — é blindagem básica contra confisco, inflação e controle de capitais."
            cta="Explore a autocustódia →"
            href="/autocustodia"
          />
        </div>

        {/* ═══ INTRO ═══ */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-blue-400/70 mb-5">
              POR QUE ESTE HUB EXISTE
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Seu dinheiro está preso em uma jurisdição.<br />
              <span className="text-blue-400">Suas opções não precisam estar.</span>
            </h2>
            <p className="text-stone-400 leading-relaxed text-sm md:text-base">
              Este ecossistema reúne análises técnicas de contas internacionais, estruturas offshore,
              exchanges sem verificação obrigatória e sistemas financeiros emergentes. Cada ferramenta
              é avaliada por <strong className="text-stone-300">nível de privacidade</strong>,{' '}
              <strong className="text-stone-300">status de reporte</strong> e{' '}
              <strong className="text-stone-300">jurisdição</strong>.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mt-16 origin-left"
          />
        </section>

        {/* ═══ CATEGORY CARDS ═══ */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-stone-500 mb-3">
              ARSENAL FINANCEIRO
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quatro pilares. Uma estratégia.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CATEGORIES.map((cat, idx) => (
              <CategoryCard key={cat.id} cat={cat} idx={idx} />
            ))}
          </div>
        </section>

        {/* ═══ RANKING ═══ */}
        <section className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.02) 50%, transparent 100%)' }}>
          <div ref={rankingRef} className="max-w-5xl mx-auto px-6">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={0}
              className="text-center mb-12"
            >
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-emerald-400/70 mb-3">
                FERRAMENTA DE DECISÃO
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Índice de Soberania Financeira
              </h2>
              <p className="text-stone-500 text-sm max-w-xl mx-auto">
                Ranking comparativo por privacidade, reporte e jurisdição.
              </p>
            </motion.div>

            {/* Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={rankingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] overflow-hidden backdrop-blur-sm"
            >
              <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500">
                <span>Plataforma</span><span>Privacidade</span><span>Reporta</span><span>Jurisdição</span>
              </div>
              {RANKING_PREVIEW.map((row, i) => (
                <motion.div
                  key={row.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={rankingInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
                  className={`grid grid-cols-4 gap-4 px-6 py-4 text-sm ${i !== RANKING_PREVIEW.length - 1 ? 'border-b border-white/[0.03]' : ''} hover:bg-white/[0.02] transition-colors`}
                >
                  <span className="text-stone-200 font-medium text-xs md:text-sm">{row.name}</span>
                  <span className={`${row.color} font-semibold text-xs`}>{row.privacy}</span>
                  <span className={`text-xs font-medium ${row.report === 'Não' ? 'text-emerald-400' : row.report === 'Parcial' ? 'text-amber-400' : 'text-rose-400'}`}>
                    {row.report}
                  </span>
                  <span className="text-stone-500 text-xs">{row.country}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-10">
              <Link
                to="/indice-de-soberania-financeira"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/15 hover:scale-[1.02] transition-all duration-300"
              >
                <BarChart3 size={16} /> Ver ranking completo <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ DISCLAIMER ═══ */}
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-6 md:p-8 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                <AlertTriangle className="text-amber-400" size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-300 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Aviso importante sobre privacidade financeira
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Todo o conteúdo deste hub é de natureza <strong className="text-stone-300">educacional e analítica</strong>.
                  Nenhum conteúdo aqui constitui recomendação de evasão fiscal, lavagem de dinheiro ou qualquer
                  atividade ilícita. Consulte sempre um profissional qualificado antes de tomar decisões financeiras.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="border-t border-white/[0.04] py-12 text-center">
          <p className="text-stone-600 text-[10px] tracking-[0.3em] uppercase">
            Soberania Financeira · Análise · Privacidade · Jurisdição
          </p>
        </footer>
      </div>
    </>
  );
};

export default SoberaniaFinanceira;
