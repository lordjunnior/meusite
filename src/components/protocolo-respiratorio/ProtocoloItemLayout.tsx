import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Clock,
  Beaker,
  ShieldCheck,
  BookOpen,
  Eye,
  History,
  Leaf,
} from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

export interface CapituloDenso {
  numero: string;
  badge: string;
  titulo: string;
  paragrafos: string[];
  imagem?: string;
  imagemAlt?: string;
  imagemCaption?: string;
}

export interface BlocoComparativo {
  badge: string;
  titulo: string;
  destaque: string;
  cor: 'emerald' | 'amber' | 'red';
  pontos: string[];
}

export interface CrossLink {
  titulo: string;
  descricao: string;
  href: string;
}

export interface ProtocoloItemData {
  slug: string;
  pillarColor: 'amber' | 'emerald' | 'rose' | 'violet';
  badgeTopo: string;
  hero: {
    titulo: React.ReactNode;
    lead: string;
    imagem: string;
    metaA: string;
    metaB: string;
    metaC: string;
  };
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  reframing: { titulo: string; paragrafos: string[] };
  capitulos: CapituloDenso[];
  comparativo?: {
    titulo: string;
    intro: string;
    imagem?: string;
    imagemAlt?: string;
    blocos: BlocoComparativo[];
    checklist?: { titulo: string; itens: string[] };
  };
  protocolo: {
    titulo: string;
    intro: string;
    blocos: { hora: string; titulo: string; itens: string[] }[];
  };
  historia?: {
    titulo: string;
    paragrafos: string[];
    imagem: string;
    imagemAlt: string;
    citacao?: string;
  };
  erros: string[];
  faq: { question: string; answer: string }[];
  crossLinks: CrossLink[];
  schemaTipo?: 'Article' | 'MedicalWebPage';
}

const corMap = {
  amber: {
    accent: 'text-amber-400',
    accentSoft: 'text-amber-400/70',
    accentSoft80: 'text-amber-400/80',
    accent200: 'text-amber-200',
    accent100: 'text-amber-100',
    border: 'border-amber-500/30',
    borderHover: 'hover:border-amber-400/50',
    bg: 'bg-amber-500/5',
    bg04: 'bg-amber-500/[0.04]',
    bg10: 'bg-amber-500/10',
    border30: 'border-amber-500/30',
    border20: 'border-amber-500/20',
    gradient: 'from-amber-950/10',
  },
  emerald: {
    accent: 'text-emerald-400',
    accentSoft: 'text-emerald-400/70',
    accentSoft80: 'text-emerald-400/80',
    accent200: 'text-emerald-200',
    accent100: 'text-emerald-100',
    border: 'border-emerald-500/30',
    borderHover: 'hover:border-emerald-400/50',
    bg: 'bg-emerald-500/5',
    bg04: 'bg-emerald-500/[0.04]',
    bg10: 'bg-emerald-500/10',
    border30: 'border-emerald-500/30',
    border20: 'border-emerald-500/20',
    gradient: 'from-emerald-950/10',
  },
  rose: {
    accent: 'text-rose-400',
    accentSoft: 'text-rose-400/70',
    accentSoft80: 'text-rose-400/80',
    accent200: 'text-rose-200',
    accent100: 'text-rose-100',
    border: 'border-rose-500/30',
    borderHover: 'hover:border-rose-400/50',
    bg: 'bg-rose-500/5',
    bg04: 'bg-rose-500/[0.04]',
    bg10: 'bg-rose-500/10',
    border30: 'border-rose-500/30',
    border20: 'border-rose-500/20',
    gradient: 'from-rose-950/10',
  },
  violet: {
    accent: 'text-violet-400',
    accentSoft: 'text-violet-400/70',
    accentSoft80: 'text-violet-400/80',
    accent200: 'text-violet-200',
    accent100: 'text-violet-100',
    border: 'border-violet-500/30',
    borderHover: 'hover:border-violet-400/50',
    bg: 'bg-violet-500/5',
    bg04: 'bg-violet-500/[0.04]',
    bg10: 'bg-violet-500/10',
    border30: 'border-violet-500/30',
    border20: 'border-violet-500/20',
    gradient: 'from-violet-950/10',
  },
};

const compCoresMap = {
  emerald:
    'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-400/60 text-emerald-200',
  amber: 'border-amber-500/30 bg-amber-500/5 hover:border-amber-400/60 text-amber-200',
  red: 'border-red-500/30 bg-red-500/5 hover:border-red-400/60 text-red-200',
};
const compAcentosMap = {
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
};

export default function ProtocoloItemLayout({ data }: { data: ProtocoloItemData }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const c = corMap[data.pillarColor];
  const canonical = `https://lordjunnior.com.br/protocolo-respiratorio/${data.slug}`;

  return (
    <>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <meta name="keywords" content={data.keywords} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://lordjunnior.com.br${data.hero.imagem}`} />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': data.schemaTipo || 'Article',
          headline: data.metaTitle,
          description: data.metaDescription,
          author: { '@type': 'Person', name: 'Lord Junnior' },
          publisher: { '@type': 'Organization', name: 'Lord Junnior' },
          mainEntityOfPage: canonical,
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.faq.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br/' },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Protocolo Respiratório',
              item: 'https://lordjunnior.com.br/protocolo-respiratorio',
            },
            { '@type': 'ListItem', position: 3, name: data.badgeTopo, item: canonical },
          ],
        })}</script>
      </Helmet>

      <ScrollToTop />
      <BackToHome />

      <div className="min-h-screen bg-[#07080c] text-stone-200">
        {/* HERO */}
        <section className="relative h-screen min-h-[700px] w-full flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${data.hero.imagem})`, filter: 'brightness(0.55) saturate(1.05)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080c]/30 via-[#07080c]/55 to-[#07080c]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 100% 80% at 50% 40%, transparent 30%, rgba(7,8,12,0.9) 100%)',
            }}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
            <Link
              to="/soberania-organica/protocolos-gripe-resfriado"
              className={`inline-flex items-center gap-2 text-stone-400 hover:${c.accent} text-xs font-bold uppercase tracking-[0.2em] transition-colors mb-8`}
            >
              <ArrowLeft size={14} /> Protocolos de Gripe e Resfriado
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={`inline-block text-[10px] font-bold tracking-[0.5em] uppercase ${c.accentSoft80} mb-6`}>
                {data.badgeTopo}
              </span>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white max-w-5xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}
              >
                {data.hero.titulo}
              </h1>
              <p
                className="text-stone-300 text-lg md:text-xl lg:text-2xl leading-relaxed mt-8 max-w-3xl"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                {data.hero.lead}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-12 text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
                <span className={c.accentSoft80}>{data.hero.metaA}</span>
                <span className="w-px h-4 bg-stone-700 hidden md:block" />
                <span>{data.hero.metaB}</span>
                <span className="w-px h-4 bg-stone-700 hidden md:block" />
                <span>{data.hero.metaC}</span>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-16 inline-flex items-center gap-3 text-stone-500"
            >
              <ChevronDown size={16} />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Ficha completa abaixo</span>
            </motion.div>
          </div>
        </section>

        {/* REFRAMING */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-4">
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${c.accentSoft}`}>Abertura</span>
              <h2
                className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {data.reframing.titulo}
              </h2>
            </div>
            <div
              className="lg:col-span-8 space-y-6 text-lg leading-relaxed text-stone-300"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              {data.reframing.paragrafos.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULOS DENSOS COM IMAGENS INTERCALADAS */}
        {data.capitulos.map((cap, i) => (
          <section
            key={i}
            className={`relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 ${
              i % 2 === 0 ? `bg-gradient-to-b ${c.gradient} to-transparent` : ''
            }`}
          >
            <div className="max-w-7xl mx-auto">
              {cap.imagem && (
                <div className="rounded-3xl overflow-hidden border border-white/10 mb-12">
                  <img
                    src={cap.imagem}
                    alt={cap.imagemAlt || cap.titulo}
                    loading="lazy"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                  {cap.imagemCaption && (
                    <p
                      className="text-stone-500 text-sm italic px-6 py-4 bg-white/[0.02]"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {cap.imagemCaption}
                    </p>
                  )}
                </div>
              )}
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                <div className="lg:col-span-4">
                  <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${c.accentSoft}`}>
                    {cap.numero}
                  </span>
                  <h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {cap.titulo}
                  </h2>
                  <p className={`text-sm font-bold uppercase tracking-[0.25em] mt-4 ${c.accentSoft80}`}>
                    {cap.badge}
                  </p>
                </div>
                <div
                  className="lg:col-span-8 space-y-5 text-lg leading-relaxed text-stone-300"
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                >
                  {cap.paragrafos.map((p, j) => (
                    <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* COMPARATIVO 3 BLOCOS (opcional) */}
        {data.comparativo && (
          <section className={`relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b ${c.gradient} to-transparent`}>
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <Beaker className={c.accent} size={20} />
                  <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${c.accentSoft}`}>
                    Comparativo de mercado
                  </span>
                </div>
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {data.comparativo.titulo}
                </h2>
                <p
                  className="text-stone-400 text-lg mt-6 leading-relaxed"
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                >
                  {data.comparativo.intro}
                </p>
              </div>
              {data.comparativo.imagem && (
                <div className="rounded-3xl overflow-hidden border border-white/10 mb-12">
                  <img
                    src={data.comparativo.imagem}
                    alt={data.comparativo.imagemAlt || data.comparativo.titulo}
                    loading="lazy"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>
              )}
              <div className="grid md:grid-cols-3 gap-5">
                {data.comparativo.blocos.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1 ${compCoresMap[b.cor]}`}
                  >
                    <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${compAcentosMap[b.cor]}`}>
                      {b.badge}
                    </span>
                    <h3
                      className="text-2xl font-bold text-white mt-3 mb-2"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
                    >
                      {b.titulo}
                    </h3>
                    <p className={`text-sm font-bold uppercase tracking-wide mb-5 ${compAcentosMap[b.cor]}`}>
                      {b.destaque}
                    </p>
                    <ul className="space-y-3">
                      {b.pontos.map((p, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-stone-300 text-sm leading-relaxed"
                          style={{ fontFamily: "'Inter Tight', sans-serif" }}
                        >
                          <ChevronRight size={14} className={`${compAcentosMap[b.cor]} mt-1 flex-shrink-0`} />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              {data.comparativo.checklist && (
                <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <Eye size={18} className={c.accent} />
                    <h3
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
                    >
                      {data.comparativo.checklist.titulo}
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
                    {data.comparativo.checklist.itens.map((m, i) => (
                      <p
                        key={i}
                        className="flex items-start gap-3 text-stone-300"
                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                      >
                        <ChevronRight size={14} className={`${c.accent} mt-1.5 flex-shrink-0`} />
                        <span>{m}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* PROTOCOLO DIÁRIO */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className={c.accent} size={20} />
                <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${c.accentSoft}`}>
                  Aplicação prática
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {data.protocolo.titulo}
              </h2>
              <p
                className="text-stone-400 text-lg mt-6 leading-relaxed"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                {data.protocolo.intro}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {data.protocolo.blocos.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`rounded-2xl border ${c.border20} ${c.bg04} p-7 ${c.borderHover} hover:-translate-y-1 transition-all duration-500`}
                >
                  <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${c.accentSoft80}`}>
                    {b.hora}
                  </span>
                  <h3
                    className="text-2xl font-bold text-white mt-3 mb-5"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
                  >
                    {b.titulo}
                  </h3>
                  <ul className="space-y-3">
                    {b.itens.map((it, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-stone-300 text-sm leading-relaxed"
                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-current ${c.accent}`} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HISTÓRIA (opcional) */}
        {data.historia && (
          <section className={`relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b ${c.gradient} via-transparent to-transparent`}>
            <div className="max-w-7xl mx-auto">
              <div className="rounded-3xl overflow-hidden border border-white/10 mb-14">
                <img
                  src={data.historia.imagem}
                  alt={data.historia.imagemAlt}
                  loading="lazy"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
              </div>
              <div className="grid lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-4">
                    <History className={c.accent} size={20} />
                    <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${c.accentSoft}`}>
                      Camada histórica
                    </span>
                  </div>
                  <h2
                    className="text-4xl md:text-5xl font-bold text-white leading-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {data.historia.titulo}
                  </h2>
                </div>
                <div
                  className="lg:col-span-8 space-y-6 text-lg leading-relaxed text-stone-300"
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                >
                  {data.historia.paragrafos.map((p, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                  {data.historia.citacao && (
                    <p
                      className={`border-l-2 ${c.border30} pl-5 italic text-stone-200`}
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {data.historia.citacao}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ERROS */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-400" size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400/80">
                  Erros que destroem o resultado
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Onde o protocolo deixa de funcionar.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.erros.map((e, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6 hover:border-red-400/50 transition-all duration-500"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/80">
                    Erro {String(i + 1).padStart(2, '0')}
                  </span>
                  <p
                    className="text-stone-200 leading-relaxed mt-3"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {e}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-transparent to-[#05060a]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14">
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${c.accentSoft}`}>
                Perguntas frequentes
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Respostas diretas, sem rodeio.
              </h2>
            </div>
            <div className="space-y-4">
              {data.faq.map((f, i) => (
                <details
                  key={i}
                  className={`group rounded-2xl border border-white/10 bg-white/[0.02] hover:${c.border} transition-all`}
                >
                  <summary
                    className="cursor-pointer p-6 md:p-7 text-lg md:text-xl font-bold text-white list-none flex items-start justify-between gap-4"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    <span>{f.question}</span>
                    <ChevronDown
                      className={`flex-shrink-0 mt-1 group-open:rotate-180 transition-transform ${c.accent}`}
                      size={20}
                    />
                  </summary>
                  <p
                    className="px-6 md:px-7 pb-6 md:pb-7 text-stone-300 leading-relaxed"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + CROSS-LINKS */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <MicroCtaResistencia />
            <div className="mt-16 mb-8">
              <h3
                className="text-3xl md:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Próximas peças do protocolo
              </h3>
              <p className="text-stone-400" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Navegue pelas outras peças que compõem o protocolo respiratório integrado.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {data.crossLinks.map((cl, i) => (
                <Link
                  key={i}
                  to={cl.href}
                  className={`group rounded-2xl border border-white/10 bg-white/[0.02] p-7 ${c.borderHover} hover:-translate-y-1 transition-all duration-500`}
                >
                  <BookOpen size={20} className={`${c.accent} mb-4`} />
                  <h3
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}
                  >
                    {cl.titulo}
                  </h3>
                  <p
                    className="text-stone-400 text-sm"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {cl.descricao}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}