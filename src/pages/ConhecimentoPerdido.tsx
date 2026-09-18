import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Leaf, Shield, Heart, Brain, Flame, Wind, BookOpen, TreePine, Compass, ChevronRight, FlaskConical, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import imgHero from '@/assets/cp-hero-conhecimento.webp';
import LinhaDoTempoOculta from '@/components/LinhaDoTempoOculta';
import BackToHome from '@/components/BackToHome';
import RapeHookCard from '@/components/RapeHookCard';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const BLOCOS = [
  {
    num: '01',
    title: 'Contexto Histórico',
    desc: 'Mapeamento documentado da transição entre práticas tradicionais e institucionalização médica moderna. Linha temporal, agentes envolvidos e impactos sistêmicos.',
    icon: BookOpen,
    color: 'emerald',
    link: '/conhecimento-perdido/contexto-historico',
  },
  {
    num: '02',
    title: 'Base Fisiológica',
    desc: 'Organização técnica por sistemas corporais, mecanismos bioquímicos e resposta adaptativa do organismo.',
    icon: Brain,
    color: 'cyan',
    link: '/conhecimento-perdido/base-fisiologica',
  },
  {
    num: '03',
    title: 'Segurança e Limites',
    desc: 'Critérios de uso responsável, contraindicações, interações medicamentosas e parâmetros claros de suspensão.',
    icon: Shield,
    color: 'amber',
    link: '/conhecimento-perdido/seguranca-e-limites',
  },
  {
    num: '04',
    title: 'Aplicação Prática',
    desc: 'Protocolos domésticos estruturados, preparo correto, conservação e uso racional.',
    icon: FlaskConical,
    color: 'green',
    link: '/conhecimento-perdido/aplicacao-pratica',
  },
  {
    num: '05',
    title: 'Continuidade Familiar',
    desc: 'Educação botânica aplicada, identificação segura e construção progressiva de autonomia biológica.',
    icon: Users,
    color: 'purple',
    link: '/conhecimento-perdido/continuidade-familiar',
  },
];

const colorMap: Record<string, { card: string; iconBg: string; icon: string; btn: string; glow: string }> = {
  emerald: {
    card: 'bg-stone-900/60 border-emerald-600/30 hover:border-emerald-400/60 hover:shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)] hover:bg-stone-800/60',
    iconBg: 'bg-emerald-500/20 border border-emerald-500/30',
    icon: 'text-emerald-400',
    btn: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30',
    glow: 'bg-emerald-400',
  },
  cyan: {
    card: 'bg-stone-900/60 border-cyan-600/30 hover:border-cyan-400/60 hover:shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)] hover:bg-stone-800/60',
    iconBg: 'bg-cyan-500/20 border border-cyan-500/30',
    icon: 'text-cyan-400',
    btn: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30',
    glow: 'bg-cyan-400',
  },
  amber: {
    card: 'bg-stone-900/60 border-amber-600/30 hover:border-amber-400/60 hover:shadow-[0_0_50px_-12px_rgba(245,158,11,0.3)] hover:bg-stone-800/60',
    iconBg: 'bg-amber-500/20 border border-amber-500/30',
    icon: 'text-amber-400',
    btn: 'bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30',
    glow: 'bg-amber-400',
  },
  green: {
    card: 'bg-stone-900/60 border-green-600/30 hover:border-green-400/60 hover:shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)] hover:bg-stone-800/60',
    iconBg: 'bg-green-500/20 border border-green-500/30',
    icon: 'text-green-400',
    btn: 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30',
    glow: 'bg-green-400',
  },
  purple: {
    card: 'bg-stone-900/60 border-purple-600/30 hover:border-purple-400/60 hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)] hover:bg-stone-800/60',
    iconBg: 'bg-purple-500/20 border border-purple-500/30',
    icon: 'text-purple-400',
    btn: 'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30',
    glow: 'bg-purple-400',
  },
};

export default function ConhecimentoPerdido() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Conhecimento Perdido: O Resgate da Autonomia Biológica | Lord Junnior</title>
        <meta name="description" content="Recupere o saber ancestral suprimido. Protocolos técnicos de fitoterapia, fisiologia e saúde preventiva fora do sistema industrial. 5 módulos, 16+ espécies documentadas." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/conhecimento-perdido" />
        <meta property="og:title" content="Conhecimento Perdido: O Resgate da Autonomia Biológica" />
        <meta property="og:description" content="Protocolos técnicos de fitoterapia, fisiologia e saúde preventiva fora do sistema industrial." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/conhecimento-perdido" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWorkSeries",
          "name": "Conhecimento Perdido",
          "author": { "@type": "Person", "name": "Lord Junnior" },
          "description": "Série técnica sobre autonomia biológica, fitoterapia e resiliência. Contexto histórico, base fisiológica, segurança, aplicação prática e continuidade familiar.",
          "url": "https://lordjunnior.com.br/soberania-organica/conhecimento-perdido",
          "hasPart": [
            { "@type": "Article", "name": "Contexto Histórico", "url": "https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/contexto-historico" },
            { "@type": "Article", "name": "Base Fisiológica", "url": "https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/base-fisiologica" },
            { "@type": "Article", "name": "Segurança e Limites", "url": "https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/seguranca-e-limites" },
            { "@type": "Article", "name": "Aplicação Prática", "url": "https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/aplicacao-pratica" },
            { "@type": "Article", "name": "Continuidade Familiar", "url": "https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/continuidade-familiar" }
          ]
        })}</script>
      </Helmet>
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/30 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0b08 0%, #151210 8%, #1a1510 20%, #1e1912 35%, #211c14 50%, #1e1912 70%, #151210 85%, #0d0b08 100%)' }}
    >
      {/* ─── Spore/Seed Particles ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-70">
        <style>{`
          @keyframes sporeDriftCP {
            from { transform: translateY(0) translateX(0) rotate(0deg); }
            to { transform: translateY(-1200px) translateX(80px) rotate(180deg); }
          }
          @keyframes sporeDriftCP2 {
            from { transform: translateY(0) translateX(0) rotate(0deg); }
            to { transform: translateY(-1000px) translateX(-60px) rotate(-120deg); }
          }
          @keyframes sporeDriftCP3 {
            from { transform: translateY(0) translateX(0); }
            to { transform: translateY(-800px) translateX(40px); }
          }
          .spore-cp {
            position: absolute; width: 100%; height: 250%;
            background-image:
              radial-gradient(1.5px 1.5px at 8% 15%, rgba(180,140,60,0.5) 100%, transparent),
              radial-gradient(1px 1px at 22% 45%, rgba(160,120,50,0.4) 100%, transparent),
              radial-gradient(2px 2px at 35% 70%, rgba(120,90,40,0.3) 100%, transparent),
              radial-gradient(1px 1px at 55% 25%, rgba(200,160,70,0.35) 100%, transparent),
              radial-gradient(1.5px 1.5px at 68% 60%, rgba(140,110,50,0.4) 100%, transparent),
              radial-gradient(1px 1px at 82% 80%, rgba(100,80,35,0.3) 100%, transparent),
              radial-gradient(2px 2px at 45% 40%, rgba(80,120,50,0.25) 100%, transparent),
              radial-gradient(1px 1px at 90% 15%, rgba(160,140,60,0.35) 100%, transparent);
            background-size: 220px 220px;
            animation: sporeDriftCP 55s linear infinite;
          }
          .spore-cp-2 {
            background-size: 320px 320px;
            animation: sporeDriftCP2 75s linear infinite;
            opacity: 0.6;
          }
          .spore-cp-3 {
            background-size: 180px 180px;
            animation: sporeDriftCP3 95s linear infinite;
            opacity: 0.35;
          }
        `}</style>
        <div className="spore-cp"></div>
        <div className="spore-cp spore-cp-2"></div>
        <div className="spore-cp spore-cp-3"></div>
      </div>

      {/* ─── Atmospheric radials ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[10%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(120,90,30,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(80,110,40,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-24 pb-32">

        {/* ─── BREADCRUMB ─── */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-16 flex-wrap">
          <Link to="/" className="text-stone-600 hover:text-amber-400 transition-colors">Início</Link>
          <span className="text-stone-700">/</span>
          <Link to="/soberania-organica" className="text-stone-600 hover:text-amber-400 transition-colors">Soberania Orgânica</Link>
          <span className="text-stone-700">/</span>
          <span className="text-amber-400">Conhecimento Perdido</span>
        </nav>

        {/* ═══════════════════════════════════════════════════
            HERO — CONHECIMENTO PERDIDO
        ═══════════════════════════════════════════════════ */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-10">
            <img src={imgHero} alt="Conhecimento Perdido" className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-[#0d0b08]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 md:left-10">
              <span className="text-amber-400/60 text-[10px] font-bold tracking-[0.5em] uppercase">Fase 04 · Núcleo Biológico</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-wide uppercase leading-[0.95] mt-2 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
                CONHECIMENTO<br /><span className="text-amber-400">PERDIDO</span>
              </h1>
            </div>
          </div>

          <div className="max-w-3xl space-y-5">
            <p className="text-stone-300 text-lg md:text-xl leading-relaxed font-light">
              Este não é um guia genérico de "chás que fazem bem". É o <span className="text-amber-400 font-semibold">núcleo biológico</span> do Soberania Orgânica — a base que sustenta toda decisão de saúde quando sistemas formais não estão disponíveis, são insuficientes ou simplesmente falharam.
            </p>
            <p className="text-stone-400 text-base leading-relaxed">
              Aqui, cada planta é tratada como ferramenta técnica: com compostos bioativos identificados, mecanismo de ação documentado, dosagem segura, contraindicações reais e limites de uso. Nada de misticismo. Nada de promessa vaga. Bioquímica aplicada com responsabilidade.
            </p>
            <div className="border-l-2 border-amber-500/40 pl-6 py-2">
              <p className="text-amber-200/80 text-base font-medium italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "A diferença entre quem sabe e quem acha que sabe é a profundidade do que documenta — e a honestidade do que admite não saber."
              </p>
            </div>
          </div>
        </motion.header>

        {/* ═══════════════════════════════════════════════════
            MAPA DE SISTEMAS FISIOLÓGICOS
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-gradient-to-br from-stone-900/60 to-stone-950/60 border border-amber-700/25 rounded-2xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/25">
                <Compass className="text-amber-400" size={18} />
              </div>
              <h3 className="text-base font-extrabold text-amber-300 uppercase tracking-wide"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.08em' }}>
                Mapa de Sistemas Fisiológicos
              </h3>
            </div>
            <p className="text-stone-400 text-sm mb-8 max-w-2xl leading-relaxed">
              5 sistemas do corpo. 12 plantas documentadas. Cada uma atua em vias bioquímicas específicas — não em "energia" ou "equilíbrio".
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Flame, label: 'Digestivo', plantas: 'Boldo · Hortelã · Espinheira-santa', color: 'green' },
                { icon: Wind, label: 'Respiratório', plantas: 'Guaco · Eucalipto · Capim-limão', color: 'cyan' },
                { icon: Brain, label: 'Nervoso', plantas: 'Camomila · Mulungu', color: 'purple' },
                { icon: Shield, label: 'Imune', plantas: 'Alho · Gengibre', color: 'amber' },
                { icon: Heart, label: 'Muscular', plantas: 'Arnica · Babosa', color: 'orange' },
              ].map((s, i) => {
                const styles: Record<string, { card: string; icon: string; glow: string }> = {
                  green: { card: 'bg-stone-900/70 border-green-500/30 hover:border-green-400/60 hover:bg-stone-800/70 hover:shadow-[0_0_30px_-8px_rgba(34,197,94,0.3)]', icon: 'text-green-400', glow: 'bg-green-400' },
                  cyan: { card: 'bg-stone-900/70 border-cyan-500/30 hover:border-cyan-400/60 hover:bg-stone-800/70 hover:shadow-[0_0_30px_-8px_rgba(6,182,212,0.3)]', icon: 'text-cyan-400', glow: 'bg-cyan-400' },
                  purple: { card: 'bg-stone-900/70 border-purple-500/30 hover:border-purple-400/60 hover:bg-stone-800/70 hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.3)]', icon: 'text-purple-400', glow: 'bg-purple-400' },
                  amber: { card: 'bg-stone-900/70 border-amber-500/30 hover:border-amber-400/60 hover:bg-stone-800/70 hover:shadow-[0_0_30px_-8px_rgba(245,158,11,0.3)]', icon: 'text-amber-400', glow: 'bg-amber-400' },
                  orange: { card: 'bg-stone-900/70 border-orange-500/30 hover:border-orange-400/60 hover:bg-stone-800/70 hover:shadow-[0_0_30px_-8px_rgba(249,115,22,0.3)]', icon: 'text-orange-400', glow: 'bg-orange-400' },
                };
                const st = styles[s.color];
                return (
                  <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                    className={`rounded-xl p-5 border transition-all duration-500 cursor-default group ${st.card}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <s.icon className={`${st.icon} group-hover:scale-110 transition-transform duration-300`} size={20} />
                      <div className={`w-1.5 h-1.5 rounded-full ${st.glow} opacity-60 animate-pulse`} />
                    </div>
                    <p className="text-stone-200 text-sm font-bold mb-1.5">{s.label}</p>
                    <p className="text-stone-500 text-[11px] leading-relaxed">{s.plantas}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            GRID DE 5 BLOCOS — ECOSSISTEMA MODULAR
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-amber-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Ecossistema</span>
            <div className="flex-1 h-px bg-amber-800/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide text-stone-200 mb-4 leading-tight uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            BLOCOS DE <span className="text-amber-400">PROFUNDIDADE</span>
          </h2>
          <p className="text-stone-500 text-sm md:text-base max-w-2xl leading-relaxed mb-12">
            Cada bloco é uma rota independente com conteúdo próprio, SEO próprio e possibilidade de expansão ilimitada.
            Navegue pelo que precisa. Aprofunde no que importa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOCOS.map((bloco, i) => {
              const cm = colorMap[bloco.color];
              return (
                <motion.div key={bloco.num} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                  <Link to={bloco.link}
                    className={`block border rounded-2xl p-7 md:p-8 transition-all duration-500 group h-full ${cm.card}`}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-xl ${cm.iconBg}`}>
                        <bloco.icon className={`${cm.icon} group-hover:scale-110 transition-transform duration-300`} size={20} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${cm.glow} opacity-50 animate-pulse`} />
                        <span className={`${cm.icon} text-[9px] font-bold tracking-[0.4em] uppercase opacity-60`}>Bloco {bloco.num}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-stone-200 mb-3 group-hover:text-white transition-colors">
                      {bloco.title}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6 group-hover:text-stone-400 transition-colors">
                      {bloco.desc}
                    </p>

                    <div className={`inline-flex items-center gap-2 border rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${cm.btn}`}>
                      Acessar <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            PUBLICAÇÃO EM PRODUÇÃO
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40">
            {/* Hot gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/90 via-[#1a1206] to-stone-950/90" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,200,50,0.3) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            
            <div className="relative p-10 md:p-16">
              {/* Badge */}
              <div className="flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 px-4 py-2 rounded-full w-fit mb-8">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-300 text-[10px] font-black tracking-[0.3em] uppercase">Publicação em construção</span>
              </div>

              {/* Hero title */}
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                <span className="text-stone-200">ISSO AQUI VAI</span><br />
                <span className="text-amber-400" style={{ textShadow: '0 0 40px rgba(245,158,11,0.4), 0 0 80px rgba(245,158,11,0.15)' }}>
                  VIRAR LIVRO.
                </span>
              </h2>

              <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-3 font-light">
                O que você vê agora é o <span className="text-amber-400 font-bold">esqueleto</span>. A versão final é uma publicação independente com profundidade farmacológica real — dezenas de plantas por bioma, protocolos sazonais, fichas técnicas que nenhum app entrega.
              </p>
              <p className="text-stone-500 text-sm leading-relaxed max-w-2xl mb-10">
                Denso. Técnico. Offline. Construído para funcionar quando tudo mais falhar.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {[
                  { label: 'Fichas técnicas expandidas', value: 'Catálogo completo por bioma' },
                  { label: 'Protocolos sazonais', value: 'Regionalização por clima' },
                  { label: 'Matriz de decisão clínica', value: 'Sintoma → planta → preparo' },
                  { label: 'Formação familiar completa', value: 'Exercícios de campo e identificação' },
                  { label: 'Farmacologia aplicada', value: 'Mecanismos, vias e compostos' },
                  { label: 'Guia de cultivo medicinal', value: 'Da semente à colheita correta' },
                ].map(item => (
                  <div key={item.label} className="bg-amber-400/8 border border-amber-500/25 rounded-xl p-4 hover:bg-amber-400/15 hover:border-amber-400/40 transition-all duration-300">
                    <p className="text-amber-200 text-sm font-bold">{item.label}</p>
                    <p className="text-stone-500 text-xs mt-1.5 leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-8 border-t border-amber-800/25">
                <Leaf size={16} className="text-amber-400/60" />
                <p className="text-stone-400 text-sm leading-relaxed font-medium">
                  O título e formato final serão divulgados quando o material estiver pronto. <span className="text-amber-400">Isso não é promessa — é construção.</span>
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            INTEGRAÇÃO — LINKS BIDIRECIONAIS
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="bg-gradient-to-br from-stone-900/60 to-stone-950/60 border border-amber-800/15 rounded-2xl p-8 md:p-14">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="text-amber-400" size={20} />
              <h2 className="text-sm font-bold text-amber-400 uppercase tracking-[0.3em]">Núcleo biológico do protocolo</h2>
            </div>

            <div className="max-w-3xl space-y-5">
              <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                Este bloco se conecta com todos os módulos do Soberania Orgânica. <span className="text-amber-400 font-semibold">Sem corpo saudável, não há autonomia real.</span>
              </p>

              {/* ─── Link bidirecional: Sabedoria Ancestral ─── */}
              <Link to="/soberania-organica/sabedoria-ancestral"
                className="flex items-center justify-between bg-amber-500/8 border border-amber-500/20 rounded-xl p-5 hover:bg-amber-500/15 hover:border-amber-400/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-amber-500/15 rounded-xl">
                    <Leaf size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-300 text-sm font-bold">Sabedoria Ancestral</p>
                    <p className="text-stone-500 text-xs mt-0.5">Hub de saúde natural, soberania alimentar e módulos práticos</p>
                  </div>
                </div>
                <ChevronRight className="text-amber-500/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" size={18} />
              </Link>

              {/* ─── Conexão direta com Saúde Preventiva ─── */}
              <Link to="/soberania-organica/saude-preventiva"
                className="flex items-center justify-between bg-amber-500/8 border border-amber-500/15 rounded-xl p-5 hover:bg-amber-500/15 hover:border-amber-400/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-amber-500/15 rounded-xl">
                    <Heart size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-300 text-sm font-bold">Saúde Preventiva</p>
                    <p className="text-stone-500 text-xs mt-0.5">Protocolos de rotina para manter o corpo funcionando antes de precisar de qualquer planta</p>
                  </div>
                </div>
                <ChevronRight className="text-amber-500/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" size={18} />
              </Link>

              <div className="mt-4">
                <Link to="/soberania-organica" className="btn-secondary text-center inline-block">
                  ← Soberania Orgânica
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        <RapeHookCard variant="perdido" />

        {/* ─── Disclaimer ─── */}
        <div className="text-center flex items-center justify-center gap-3">
          <p className="text-stone-600 text-[10px] font-mono tracking-widest uppercase">
            Conteúdo educativo · Não substitui orientação médica profissional
          </p>
          <span className="text-stone-800">·</span>
          <LinhaDoTempoOculta />
        </div>
      </div>
    </div>
    </>
  );
}
