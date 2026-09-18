import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, Leaf, FlaskConical, Beaker, Clock, AlertTriangle, ShieldCheck, BookOpen, Eye, ChevronRight } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

export interface PlantaIndividualData {
  slug: string;
  nome: string;
  cientifico: string;
  familia: string;
  sistema: string;
  capituloLabel: string;
  heroImage: string;
  comparativoImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroTitle: React.ReactNode;
  heroLead: string;
  reframing: { paragrafos: string[] };
  fitoquimica: {
    intro: string;
    compostos: { nome: string; acao: string }[];
    farmacocinetica: string;
  };
  funcaoBiologica: { titulo: string; descricao: string }[];
  posologia: {
    parteUsada: string;
    preparo: string;
    dose: string;
    frequencia: string;
    janela: string;
    pausa: string;
  };
  identificacao: {
    autentica: { titulo: string; marcadores: string[] };
    falsa: { titulo: string; alerta: string };
  };
  contraindicacoes: string[];
  interacoes: string[];
  errosComuns: string[];
  faq: { question: string; answer: string }[];
}

export default function PlantaIndividualLayout({ data }: { data: PlantaIndividualData }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const canonical = `https://lordjunnior.com.br/soberania-organica/plantas-subutilizadas/${data.slug}`;

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
        <meta property="og:image" content={`https://lordjunnior.com.br${data.heroImage}`} />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalWebPage',
          name: data.metaTitle,
          description: data.metaDescription,
          url: canonical,
          author: { '@type': 'Person', name: 'Lord Junnior' },
          medicalAudience: { '@type': 'MedicalAudience', audienceType: 'adult' },
          about: {
            '@type': 'Substance',
            name: `${data.nome} (${data.cientifico})`,
            description: data.reframing.paragrafos[0],
          },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.faq.map(f => ({
            '@type': 'Question', name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br/' },
            { '@type': 'ListItem', position: 2, name: 'Soberania Orgânica', item: 'https://lordjunnior.com.br/soberania-organica' },
            { '@type': 'ListItem', position: 3, name: 'Plantas Subutilizadas', item: 'https://lordjunnior.com.br/soberania-organica/plantas-subutilizadas' },
            { '@type': 'ListItem', position: 4, name: data.nome, item: canonical },
          ],
        })}</script>
      </Helmet>

      <ScrollToTop />
      <BackToHome />

      <div className="theme-editorial editorial-layout min-h-screen bg-editorial-sand text-editorial-ink">
        {/* HERO */}
        <section className="relative h-screen min-h-[680px] w-full flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${data.heroImage})`, filter: 'brightness(0.55) saturate(0.95)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080c]/30 via-[#07080c]/55 to-[#07080c]" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 40%, transparent 30%, rgba(7,8,12,0.85) 100%)' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
            <Link
              to="/soberania-organica/plantas-subutilizadas"
              className="inline-flex items-center gap-2 text-stone-400 hover:text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Plantas Subutilizadas
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-400/80 mb-6">
                {data.capituloLabel}
              </span>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white max-w-5xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}
              >
                {data.heroTitle}
              </h1>
              <p className="text-stone-300 text-lg md:text-xl lg:text-2xl leading-relaxed mt-8 max-w-3xl" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                {data.heroLead}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-12 text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
                <span className="text-emerald-400/80"><em className="not-italic">{data.cientifico}</em></span>
                <span className="w-px h-4 bg-stone-700 hidden md:block" />
                <span>Família: {data.familia}</span>
                <span className="w-px h-4 bg-stone-700 hidden md:block" />
                <span>Sistema: {data.sistema}</span>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-16 inline-flex items-center gap-3 text-stone-500"
            >
              <ChevronDown size={16} />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Ficha técnica completa</span>
            </motion.div>
          </div>
        </section>

        {/* ATO 01 — REFRAMING */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">Ato 01</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Por que esta planta importa, sem misticismo.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-lg leading-relaxed text-stone-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {data.reframing.paragrafos.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </div>
        </section>

        {/* ATO 02 — FITOQUÍMICA AUTORAL */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-emerald-950/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <FlaskConical className="text-emerald-400" size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">Ato 02 — Fitoquímica</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                O que faz o trabalho, em nível molecular.
              </h2>
              <p className="text-stone-400 text-lg mt-6 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                {data.fitoquimica.intro}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {data.fitoquimica.compostos.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-7 hover:border-emerald-400/40 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Beaker size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-emerald-200 mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
                        {c.nome}
                      </h3>
                      <p className="text-stone-300 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        {c.acao}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400">Farmacocinética operacional</span>
              <p className="text-stone-300 text-lg leading-relaxed mt-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                {data.fitoquimica.farmacocinetica}
              </p>
            </div>
          </div>
        </section>

        {/* ATO 03 — FUNÇÃO BIOLÓGICA */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">Ato 03 — Função biológica</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                O que ela faz dentro de você.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.funcaoBiologica.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-500"
                >
                  <Leaf size={18} className="text-emerald-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
                    {f.titulo}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {f.descricao}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ATO 04 — IDENTIFICAÇÃO COMPARATIVA */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-amber-400" size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/70">Ato 04 — Identificação no campo</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Verdadeira vs falsa, lado a lado.
              </h2>
              <p className="text-stone-400 text-lg mt-6 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Erro de identificação botânica é a causa silenciosa da maioria dos efeitos adversos. Memorize os marcadores.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden border border-white/10 mb-10">
              <img src={data.comparativoImage} alt={`Comparativo botânico ${data.nome} verdadeira versus planta confundida`} loading="lazy" width={1920} height={1080} className="w-full h-auto" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-7 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="text-emerald-400" size={20} />
                  <h3 className="text-xl font-bold text-emerald-200" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                    {data.identificacao.autentica.titulo}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {data.identificacao.autentica.marcadores.map((m, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-300 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                      <ChevronRight size={16} className="text-emerald-400 mt-1 flex-shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-7 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="text-red-400" size={20} />
                  <h3 className="text-xl font-bold text-red-200" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                    {data.identificacao.falsa.titulo}
                  </h3>
                </div>
                <p className="text-stone-300 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  {data.identificacao.falsa.alerta}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ATO 05 — POSOLOGIA */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-emerald-400" size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">Ato 05 — Posologia operacional</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Dose certa, janela certa, pausa obrigatória.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { label: 'Parte usada', value: data.posologia.parteUsada },
                { label: 'Preparo', value: data.posologia.preparo },
                { label: 'Dose', value: data.posologia.dose },
                { label: 'Frequência', value: data.posologia.frequencia },
                { label: 'Janela de uso', value: data.posologia.janela },
                { label: 'Pausa obrigatória', value: data.posologia.pausa },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-7 hover:border-emerald-400/40 transition-all duration-500">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400/80">{item.label}</span>
                  <p className="text-stone-200 text-base leading-relaxed mt-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ATO 06 — CONTRAINDICAÇÕES + INTERAÇÕES + ERROS */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-400" size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400/80">Ato 06 — Limites e segurança</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Onde a planta deixa de ajudar e começa a atrapalhar.
              </h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-7 md:p-8">
                <h3 className="text-xl font-bold text-red-200 mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
                  Contraindicações
                </h3>
                <ul className="space-y-3">
                  {data.contraindicacoes.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-300 text-sm leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                      <span className="text-red-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-7 md:p-8">
                <h3 className="text-xl font-bold text-amber-200 mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
                  Interações medicamentosas
                </h3>
                <ul className="space-y-3">
                  {data.interacoes.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-300 text-sm leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                      <span className="text-amber-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-stone-500/20 bg-white/[0.02] p-7 md:p-8">
                <h3 className="text-xl font-bold text-stone-200 mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
                  Erros que destroem o resultado
                </h3>
                <ul className="space-y-3">
                  {data.errosComuns.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-300 text-sm leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                      <span className="text-stone-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-transparent to-[#05060a]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">Perguntas frequentes</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Respostas diretas, sem rodeio.
              </h2>
            </div>
            <div className="space-y-4">
              {data.faq.map((f, i) => (
                <details key={i} className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/30 transition-all">
                  <summary className="cursor-pointer p-6 md:p-7 text-lg md:text-xl font-bold text-white list-none flex items-start justify-between gap-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    <span>{f.question}</span>
                    <ChevronDown className="flex-shrink-0 mt-1 group-open:rotate-180 transition-transform text-emerald-400" size={20} />
                  </summary>
                  <p className="px-6 md:px-7 pb-6 md:pb-7 text-stone-300 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <MicroCtaResistencia />
            <div className="mt-16 grid md:grid-cols-2 gap-6">
              <Link
                to="/soberania-organica/plantas-subutilizadas"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-500"
              >
                <BookOpen size={20} className="text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                  Voltar ao hub das 10 plantas
                </h3>
                <p className="text-stone-400 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Veja as outras espécies com função real e protocolo integrado.
                </p>
              </Link>
              <Link
                to="/soberania-organica/fitoterapia-aplicada"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-500"
              >
                <Leaf size={20} className="text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                  Fitoterapia aplicada
                </h3>
                <p className="text-stone-400 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  Sistema completo de uso terapêutico de plantas brasileiras.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}