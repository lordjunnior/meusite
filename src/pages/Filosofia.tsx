import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Scale, BookOpen, ArrowRight, Shield, Heart, Lightbulb } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import { pillars } from '@/lib/pillars';
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 },
  }),
};

function useMouseParallax(strength = 15) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const handleMouse = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(((e.clientX - cx) / cx) * strength);
    mouseY.set(((e.clientY - cy) / cy) * strength);
  }, [mouseX, mouseY, strength]);
  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);
  return { springX, springY };
}

const Filosofia = () => {
  const pillar = pillars.find((p) => p.slug === 'filosofia')!;
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 relative overflow-hidden"
      style={{ background: '#050808' }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <link rel="canonical" href={canonicalUrl('/filosofia')} />
        <meta property="og:url" content={canonicalUrl('/filosofia')} />
        <title>Filosofia — Ética, Propriedade e Discernimento | Lord Junnior</title>
        <meta name="description" content="Os fundamentos morais da soberania individual: ética da não-agressão, propriedade privada, mordomia cristã e a verdadeira riqueza além do gráfico de preço." />
      </Helmet>
      <ScrollToTop />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #eab308)' }} />
      </div>

      {/* Film Grain + Light Beams */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(234,179,8,0.08) 50%, transparent 70%)' }} />
      </div>

      {/* Reactive Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/30 to-transparent blur-3xl" />
        </motion.div>
      </div>

      <CinematicHero
        image="/heroes/filosofia.webp"
        phase={pillar.level + ' · ' + pillar.badge}
        title={pillar.title}
        subtitle={pillar.subtitle}
        icon={Scale}
        accentColor="amber"
        backLink="/"
        backLabel="Voltar ao Início"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* Capítulo 01 — Impacto */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 01</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O Fundamento Moral
            </h2>
          </motion.div>
          <motion.div variants={scaleIn} custom={1}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-5 text-stone-400 leading-relaxed">
                <p>{pillar.impactText}</p>
              </div>
              <div className="bg-amber-500/[0.04] border border-amber-500/15 rounded-xl p-8">
                <p className="text-white font-medium leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {pillar.impactSub}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* Capítulo 02 — Objetivos */}
        {pillar.objectives && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
            <motion.div variants={fadeUp} custom={0} className="mb-10">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 02</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Objetivos desta Etapa
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillar.objectives.map((obj, i) => {
                const icons = [Shield, Lightbulb, Heart];
                const Icon = icons[i % icons.length];
                return (
                  <motion.div key={obj.title} variants={scaleIn} custom={i}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8
                               hover:border-amber-500/20 hover:bg-amber-500/[0.02] transition-all duration-500 group">
                    <div className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/15 w-fit mb-6
                                   group-hover:bg-amber-500/15 transition-all duration-500">
                      <Icon size={22} className="text-amber-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {obj.title}
                    </h4>
                    <p className="text-stone-500 text-sm leading-relaxed">{obj.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* Capítulo 03 — Recursos */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 03</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Material de Apoio
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillar.resources.map((res, i) => (
              <motion.div key={res.title} variants={scaleIn} custom={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-amber-500/20 transition-all duration-500 group">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[9px] font-bold tracking-[0.3em] uppercase px-2.5 py-1 rounded-lg border ${
                    res.type === 'ebook' ? 'text-amber-400 bg-amber-500/8 border-amber-500/15' :
                    res.type === 'audio' ? 'text-emerald-400 bg-emerald-500/8 border-emerald-500/15' :
                    'text-sky-400 bg-sky-500/8 border-sky-500/15'
                  }`}>
                    {res.type === 'ebook' ? 'EBOOK' : res.type === 'audio' ? 'AUDIOBOOK' : 'FERRAMENTA'}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {res.title}
                </h4>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">{res.description}</p>
                {res.route ? (
                  <Link to={res.route}
                    className="inline-flex items-center gap-2 text-amber-400 text-sm font-bold group-hover:underline">
                    {res.action} <ArrowRight size={14} />
                  </Link>
                ) : (
                  <span className="text-amber-400/50 text-sm font-bold">{res.action}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Final */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
          <motion.div variants={fadeUp} custom={0}
            className="bg-white/[0.02] border border-amber-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10 space-y-6">
              <p className="text-stone-600 font-bold text-xs tracking-[0.5em] uppercase">Cosmovisão & Discernimento</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                A liberdade começa na mente.<br />A soberania começa na <span className="text-amber-400">ação.</span>
              </h2>
              <div className="pt-6">
                <Link to="/ebooks"
                  className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-8 py-4
                             text-amber-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500 group">
                  Acessar Biblioteca <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <footer className="border-t border-white/[0.05] pt-12 text-center">
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default Filosofia;
