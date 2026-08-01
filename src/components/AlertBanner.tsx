import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AlertTriangle, ArrowRight, ShieldAlert, Radio, Eye } from 'lucide-react';
import alertImg from '@/assets/alerta-dinheiro-vivo.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const pillars = [
  { icon: ShieldAlert, label: 'PL 3.951/2019', desc: 'Projeto de lei que pode restringir pagamentos em espécie no Brasil inteiro' },
  { icon: Eye, label: 'Vigilância Total', desc: 'Cada centavo rastreado — sem cash, sem privacidade financeira' },
  { icon: Radio, label: 'Ferramentas de Proteção', desc: 'Protocolos práticos para blindar seu patrimônio antes da proibição' },
];

export default function AlertBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden">
      {/* ── CINEMATIC HERO BACKGROUND ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src={alertImg}
          alt="Dinheiro em chamas sob câmeras de vigilância"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ filter: 'brightness(0.35) saturate(0.9)' }} loading="eager" fetchPriority="high" decoding="async" />
        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, rgba(5,8,8,0.5) 30%, rgba(5,8,8,0.9) 70%, rgba(5,8,8,1) 100%)',
          }}
        />
        {/* Side vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 30%, rgba(5,8,8,0.85) 100%)',
          }}
        />
        {/* Red emergency glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(220,38,38,0.12),_transparent_60%)]" />
      </motion.div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Pre-title */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-destructive/30 animate-[ping_2s_ease-in-out_infinite]" />
              <AlertTriangle className="relative w-5 h-5 text-destructive" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-destructive uppercase font-bold">
              Alerta de Soberania · Status: Ativo
            </span>
            <span
              className="w-2 h-2 rounded-full bg-destructive"
              style={{ animation: 'alertBlink 2s ease-in-out infinite' }}
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[0.95]"
          >
            O governo quer{' '}
            <span className="text-destructive">proibir</span>{' '}
            <br className="hidden md:block" />
            o dinheiro vivo
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Um projeto de lei pode eliminar o dinheiro físico no Brasil.
            Cada transação rastreada. Cada centavo monitorado.{' '}
            <span className="text-foreground font-semibold">Você está preparado?</span>
          </motion.p>

          {/* ── TRIO DA BLINDAGEM ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {pillars.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  custom={3 + i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="group relative p-5 rounded-sm border border-destructive/20 bg-card/40 backdrop-blur-md overflow-hidden
                    hover:border-destructive/50 hover:bg-card/60 transition-all duration-500"
                  style={{
                    boxShadow: '0 0 20px rgba(220,38,38,0.06), inset 0 1px 0 rgba(220,38,38,0.08)',
                  }}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-destructive/40 to-transparent group-hover:via-destructive/70 transition-all duration-500" />

                  {/* Icon */}
                  <div className="relative w-10 h-10 mb-3 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-destructive/15 animate-[pulse_3s_ease-in-out_infinite] group-hover:bg-destructive/25" />
                    <Icon className="relative w-5 h-5 text-destructive transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <h3 className="text-sm font-semibold text-foreground/90 mb-1 transition-colors duration-300 group-hover:text-destructive">
                    {item.label}
                  </h3>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed">{item.desc}</p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-destructive/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
              );
            })}
          </div>

          {/* ── CTA ── */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <Link
              to="/alertas/fim-do-dinheiro-vivo"
              className="group inline-flex items-center gap-3 py-4 px-10 rounded-sm border border-destructive/30 bg-destructive/[0.08] hover:bg-destructive/[0.18] hover:border-destructive/50 text-destructive font-semibold tracking-wide text-sm transition-all duration-300"
              style={{ animation: 'alertCta 3s ease-in-out infinite' }}
            >
              <ShieldAlert className="w-4 h-4" />
              Ler Análise Completa
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </Link>

            <p className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
              PL 3.951/2019 · Análise técnica + protocolos de proteção
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes alertBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes alertCta { 0%,100%{box-shadow:0 0 0 rgba(220,38,38,0)} 50%{box-shadow:0 0 30px rgba(220,38,38,0.12)} }
      `}</style>
    </section>
  );
}
