import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Apple, Brain, Smartphone, Leaf, Eye, Shield, Microscope, Clock, Zap, FlaskConical, FileWarning, Quote, TrendingUp, Users, Factory, Wifi, Pill, Droplets, MonitorSmartphone } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import LiquidText from '@/components/LiquidText';
import DossieRealidade from '@/components/toxicos/DossieRealidade';
import TimelineDia from '@/components/toxicos/TimelineDia';
import BackToHome from '@/components/BackToHome';
import bgToxic from '@/assets/toxicos/bg-toxic-atmosphere.webp';
import RapeHookCard from '@/components/RapeHookCard';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const SPOKES = [
  {
    num: '01', title: 'Toxinas Alimentares', slug: 'toxinas-alimentares',
    subtitle: 'CORPO', accent: '#f59e0b', accentClass: 'amber',
    icon: Apple, desc: 'Aditivos, ultraprocessados, agrotóxicos, açúcar oculto.',
    longDesc: 'Ingredientes que entram silenciosamente na dieta cotidiana. Cada rótulo esconde decisões industriais que afetam saúde metabólica, microbiota e capacidade cognitiva. Este módulo disseca o que a indústria alimentar não quer que você leia.',
    pnl: 'O primeiro passo da autonomia é saber o que entra no seu corpo.',
  },
  {
    num: '02', title: 'Manipulação Informacional', slug: 'manipulacao-informacional',
    subtitle: 'MENTE', accent: '#a855f7', accentClass: 'violet',
    icon: Brain, desc: 'Propaganda, novilíngua, viés algorítmico, engenharia de consentimento.',
    longDesc: 'Da propaganda estatal ao filtro algorítmico, existem camadas de manipulação projetadas para moldar percepções e crenças. Este módulo treina o olhar crítico para identificar padrões de influência invisível.',
    pnl: 'Quem controla a narrativa, controla o comportamento.',
  },
  {
    num: '03', title: 'Dependência Tecnológica', slug: 'dependencia-tecnologica',
    subtitle: 'COMPORTAMENTO', accent: '#06b6d4', accentClass: 'cyan',
    icon: Smartphone, desc: 'Apps de dopamina, rastreamento, obsolescência programada.',
    longDesc: 'Design comportamental, ciclos de dopamina digital, coleta massiva de dados e obsolescência programada. Ferramentas tecnológicas construídas para capturar atenção e moldar decisões sem que você perceba.',
    pnl: 'Recuperar controle sobre o próprio tempo é o primeiro ato de soberania digital.',
  },
  {
    num: '04', title: 'Toxinas Ambientais', slug: 'toxinas-ambientais',
    subtitle: 'AMBIENTE', accent: '#22c55e', accentClass: 'green',
    icon: Leaf, desc: 'Produtos de limpeza, plásticos, poluição indoor, materiais sintéticos.',
    longDesc: 'Contaminantes domésticos, materiais sintéticos, qualidade do ar interno e produtos químicos cotidianos que atravessam a pele e os pulmões diariamente. Proteger o território começa por entender o que está dentro dele.',
    pnl: 'O instinto de proteger o próprio território começa pela consciência do que o contamina.',
  },
];

export default function ToxicosOcultos() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Removendo Tóxicos Ocultos — Laboratório de Discernimento",
    "description": "Módulo investigativo sobre dependências invisíveis: toxinas alimentares, manipulação informacional, dependência tecnológica e toxinas ambientais.",
    "url": "https://lordjunnior.com.br/soberania-organica/toxicos-ocultos",
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-red-400/30 relative overflow-hidden text-[17px] md:text-[18px] lg:text-[19px] leading-relaxed [&_p]:text-[1.05em] [&_p]:leading-[1.75]" style={{ background: '#050808' }}>
      {/* === FIXED FULL-PAGE BACKGROUND IMAGE === */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgToxic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dark overlay for readability */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,8,8,0.88) 0%, rgba(5,8,8,0.78) 40%, rgba(5,8,8,0.85) 70%, rgba(5,8,8,0.95) 100%)',
        }}
      />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Removendo Tóxicos Ocultos — Laboratório de Discernimento | Lord Junnior</title>
        <meta name="description" content="Identifique e remova dependências invisíveis: toxinas alimentares, manipulação informacional, dependência tecnológica e contaminantes ambientais." />
        <meta property="og:title" content="Removendo Tóxicos Ocultos — Laboratório de Discernimento" />
        <meta property="og:description" content="Corpo, mente, comportamento e ambiente. Quatro dimensões de autonomia pessoal." />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/toxicos-ocultos.webp" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/toxicos-ocultos" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* === VFX LAYER === */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat', backgroundSize: '128px',
        }} />
        {/* Light beams */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, transparent 20%, rgba(239,68,68,0.04) 40%, transparent 60%, rgba(245,158,11,0.03) 80%, transparent)',
        }} />
        {/* Breathing orbs */}
        <motion.div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.15), transparent 70%)' }} />
        <motion.div className="absolute bottom-[20%] right-[5%] w-[600px] h-[600px] rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.015, 0.04, 0.015] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)' }} />
        <motion.div className="absolute top-[60%] left-[40%] w-[400px] h-[400px] rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.01, 0.035, 0.01] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)' }} />
      </div>

      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #ef4444, #f59e0b)' }} />

      <CinematicHero
        image="/heroes/toxicos-ocultos.webp"
        phase="Laboratório de Discernimento"
        title={
          <span className="flex flex-col items-start">
            <span>REMOVENDO</span>
            <LiquidText
              text="Tóxicos Ocultos"
              className="w-[320px] md:w-[500px] lg:w-[620px] h-auto -ml-1"
              gradientFrom="#ef4444"
              gradientTo="#991b1b"
              speed={1.8}
            />
          </span>
        }
        subtitle="Corpo, mente, comportamento e ambiente. Quatro dimensões de investigação sobre influências invisíveis que reduzem clareza, saúde e liberdade de escolha."
        icon={Microscope}
        accentColor="red"
        backLink="/soberania-organica"
        backLabel="Soberania Orgânica"
      />

      {/* ═══════════════════════════════════════════════════ */}
      {/* FAIXA DE TRANSIÇÃO PNL — preparação cognitiva      */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-16 md:pt-24">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: APPLE_EASE }}
            className="relative overflow-hidden rounded-2xl border border-red-500/15 bg-gradient-to-br from-red-950/15 via-stone-950/30 to-transparent px-8 md:px-14 py-10 md:py-14"
          >
            <div className="absolute -top-24 -left-16 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.12), transparent 70%)' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[1px] bg-red-500/40" />
                <FileWarning size={13} className="text-red-400" />
                <span className="text-red-400/70 text-[10px] font-bold tracking-[0.5em] uppercase">
                  Antes de continuar
                </span>
              </div>
              <p className="text-2xl md:text-4xl font-black tracking-tight text-stone-100 leading-[1.15] mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Nem toda ameaça é visível.
                <br />
                <span className="text-red-400">As mais perigosas operam sem percepção.</span>
              </p>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-3xl">
                Você está prestes a ver, em quatro vetores simultâneos, o que entra no seu corpo, na sua mente,
                no seu comportamento e no seu ambiente todos os dias — sem aviso, sem rótulo de alerta,
                sem permissão consciente. Respire. Este é um relatório, não um ataque.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* ABERTURA CONCEITUAL — O gancho que fura a bolha    */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-[1px] bg-red-500/40" />
              <FlaskConical size={14} className="text-red-400" />
              <span className="text-red-400/70 text-[10px] font-bold tracking-[0.5em] uppercase">Pergunta zero</span>
              <FlaskConical size={14} className="text-red-400" />
              <div className="w-10 h-[1px] bg-red-500/40" />
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-center leading-[1.1] mb-10"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="text-stone-300">E se a maioria das decisões </span>
              <span className="text-stone-300">que você toma no dia </span>
              <span className="text-red-400">não forem realmente suas?</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
            className="space-y-6 max-w-3xl mx-auto">
            <p className="text-stone-400 text-base md:text-lg leading-relaxed">
              Não estamos falando de teorias. Estamos falando de <span className="text-stone-200 font-semibold">bioquímica documentada</span>, 
              <span className="text-stone-200 font-semibold"> engenharia comportamental patenteada</span> e 
              <span className="text-stone-200 font-semibold"> regulamentações que protegem indústrias, não pessoas</span>.
            </p>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed">
              Existe uma distância enorme entre o que você acredita que escolhe livremente e o que realmente acontece dentro do seu corpo,
              da sua mente e do seu ambiente a cada hora do dia. Essa distância tem nome: <span className="text-red-400/80 font-semibold">influência invisível</span>.
              E ela opera em quatro vetores simultâneos que a maioria das pessoas nunca examinou com atenção.
            </p>
          </motion.div>

          {/* Stat blocks — dados que chocam */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-16">
            {[
              { num: '7.000+', label: 'Aditivos alimentares aprovados sem testes de longo prazo', icon: Pill, color: 'amber' },
              { num: '5h12', label: 'Tempo médio diário em telas — mais que dormindo', icon: MonitorSmartphone, color: 'cyan' },
              { num: '353', label: 'Substâncias tóxicas detectadas no sangue do cordão umbilical', icon: Droplets, color: 'green' },
              { num: '2.000×', label: 'Mais expostos a propaganda que uma pessoa em 1900', icon: Wifi, color: 'violet' },
            ].map((stat, i) => (
              <motion.div key={stat.num}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.4, ease: APPLE_EASE } }}
                className={`group relative overflow-hidden rounded-xl border p-5 md:p-6 text-center cursor-default transition-all duration-500
                  ${stat.color === 'amber' ? 'border-amber-500/10 bg-amber-500/[0.03]' :
                    stat.color === 'cyan' ? 'border-cyan-500/10 bg-cyan-500/[0.03]' :
                    stat.color === 'green' ? 'border-green-500/10 bg-green-500/[0.03]' :
                    'border-violet-500/10 bg-violet-500/[0.03]'}
                  ${stat.color === 'amber' ? 'hover:border-amber-500/40 hover:bg-amber-500/[0.07] hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.35)]' :
                    stat.color === 'cyan' ? 'hover:border-cyan-500/40 hover:bg-cyan-500/[0.07] hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.35)]' :
                    stat.color === 'green' ? 'hover:border-green-500/40 hover:bg-green-500/[0.07] hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.35)]' :
                    'hover:border-violet-500/40 hover:bg-violet-500/[0.07] hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.35)]'}`}
              >
                {/* Top accent line on hover */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700
                  ${stat.color === 'amber' ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-transparent' :
                    stat.color === 'cyan' ? 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-transparent' :
                    stat.color === 'green' ? 'bg-gradient-to-r from-green-500 via-green-400 to-transparent' :
                    'bg-gradient-to-r from-violet-500 via-violet-400 to-transparent'}`} />
                {/* Pulsing glow behind icon */}
                <motion.div
                  className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full blur-xl"
                  animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  style={{
                    background: stat.color === 'amber' ? 'rgba(245,158,11,0.4)' :
                      stat.color === 'cyan' ? 'rgba(6,182,212,0.4)' :
                      stat.color === 'green' ? 'rgba(34,197,94,0.4)' :
                      'rgba(168,85,247,0.4)',
                  }}
                />
                <stat.icon size={16} className={`relative mx-auto mb-3 transition-transform duration-500 group-hover:scale-125
                  ${stat.color === 'amber' ? 'text-amber-400/60' :
                    stat.color === 'cyan' ? 'text-cyan-400/60' :
                    stat.color === 'green' ? 'text-green-400/60' :
                    'text-violet-400/60'}`} />
                <p className={`relative text-2xl md:text-3xl font-black tabular-nums mb-2 transition-colors duration-500
                  ${stat.color === 'amber' ? 'text-amber-400' :
                    stat.color === 'cyan' ? 'text-cyan-400' :
                    stat.color === 'green' ? 'text-green-400' :
                    'text-violet-400'}`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stat.num}
                </p>
                <p className="relative text-stone-500 text-[10px] md:text-xs leading-snug group-hover:text-stone-300 transition-colors duration-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Animated divider */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div className="h-[1px]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: APPLE_EASE }}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent)', transformOrigin: 'left' }} />
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* TIMELINE — 24 HORAS SOB INFLUÊNCIA                */}
      {/* ═══════════════════════════════════════════════════ */}
      <TimelineDia />

      {/* Animated divider */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div className="h-[1px]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: APPLE_EASE }}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)', transformOrigin: 'right' }} />
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* DOSSIÊ — EVIDÊNCIAS VERIFICÁVEIS                  */}
      {/* ═══════════════════════════════════════════════════ */}
      <DossieRealidade />

      {/* Animated divider */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div className="h-[1px]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: APPLE_EASE }}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)', transformOrigin: 'left' }} />
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* QUADRATURA — OS 4 VETORES                         */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-red-500 rounded-full" />
              <span className="text-red-400 text-[10px] font-bold tracking-[0.5em] uppercase">Quadratura da Autonomia</span>
              <div className="w-8 h-[2px] bg-red-500 rounded-full" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              QUATRO VETORES DE <span className="text-red-400">INFLUÊNCIA INVISÍVEL</span>
            </h2>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Cada vetor atua em um nível diferente da vida humana. Juntos, formam um ciclo completo de análise:
              o visitante percebe influências físicas, depois mentais, e finalmente as estruturas tecnológicas que moldam comportamento coletivo.
            </p>
          </motion.div>

          {/* 4-dimensional flow */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-20">
            {['Corpo', 'Mente', 'Comportamento', 'Ambiente'].map((dim, i) => (
              <motion.div key={dim} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.15 }}
                className="flex items-center gap-3">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border
                  ${i === 0 ? 'bg-amber-500/10 border-amber-500/20' : i === 1 ? 'bg-violet-500/10 border-violet-500/20' : i === 2 ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                  {i === 0 ? <Apple className="text-amber-400" size={20} /> : i === 1 ? <Brain className="text-violet-400" size={20} /> : i === 2 ? <Smartphone className="text-cyan-400" size={20} /> : <Leaf className="text-green-400" size={20} />}
                </div>
                <span className="text-stone-400 text-xs md:text-sm font-bold uppercase tracking-wider">{dim}</span>
                {i < 3 && <ArrowRight className="text-stone-700 ml-2 hidden md:block" size={16} />}
              </motion.div>
            ))}
          </div>

          {/* Spoke Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {SPOKES.map((spoke, i) => (
              <motion.div key={spoke.slug} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}>
                <Link to={`/soberania-organica/toxicos-ocultos/${spoke.slug}`}
                  className="group block h-full relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-1 p-8 md:p-10"
                  style={{ ['--spoke-accent' as string]: spoke.accent }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(ellipse at bottom right, ${spoke.accent}12, transparent 60%)` }} />
                  <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"
                    style={{ background: `linear-gradient(to right, ${spoke.accent}, transparent)` }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-2xl font-black text-stone-700 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{spoke.num}</span>
                      <div className="p-3 rounded-xl border group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                        style={{ background: `${spoke.accent}15`, borderColor: `${spoke.accent}25` }}>
                        <spoke.icon size={22} style={{ color: spoke.accent }} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] ml-auto" style={{ color: `${spoke.accent}99` }}>{spoke.subtitle}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight mb-3 group-hover:text-white transition-colors">{spoke.title}</h3>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-4" style={{ color: `${spoke.accent}80` }}>{spoke.desc}</p>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6 group-hover:text-stone-400 transition-colors">{spoke.longDesc}</p>
                    <div className="border-l-2 pl-4 mb-6" style={{ borderColor: `${spoke.accent}40` }}>
                      <p className="text-xs italic" style={{ color: `${spoke.accent}90` }}>"{spoke.pnl}"</p>
                    </div>
                    <div className="flex items-center gap-2 transition-colors" style={{ color: `${spoke.accent}70` }}>
                      <Eye size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Investigar módulo</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* MANIFESTO                                         */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 mb-20">
          <RapeHookCard
            variant="toxicos"
            title="O Antídoto Sequestrado: Rapé Amazônico"
            hook="Enquanto a indústria envenena com aditivos, plásticos e dopamina algorítmica, povos da floresta guardavam uma ferramenta de modulação biológica que limpa o eixo HPA em 90 segundos. Foi banalizada. O dossiê técnico restaura sua função real."
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-stone-700 text-xs font-medium uppercase tracking-[0.4em] mb-8">Princípio Operacional</p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-stone-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Tóxico oculto não é apenas química.
            </h3>
            <p className="text-2xl md:text-4xl font-black tracking-tight text-red-400 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              É qualquer influência invisível que reduz sua liberdade de escolha.
            </p>
            <p className="text-stone-500 text-sm leading-relaxed max-w-2xl mx-auto mb-12">
              Cada módulo deste laboratório investiga um vetor diferente. Corpo, mente, comportamento e ambiente formam a quadratura completa do discernimento.
              Identificar o que entra silenciosamente na vida cotidiana é o primeiro passo para recuperar consciência e autonomia.
            </p>
            <Link to="/soberania-organica"
              className="inline-flex items-center gap-3 bg-red-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-red-400 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 group">
              <Shield size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Voltar ao Soberania Orgânica
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Seal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem investiga, não é manipulado.</p>
      </div>
    </div>
  );
}
