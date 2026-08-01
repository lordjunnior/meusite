import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface CinematicHeroProps {
  image: string;
  phase: string;
  title: React.ReactNode;
  subtitle: string;
  icon: React.ElementType;
  accentColor?: string;
  backLink?: string;
  backLabel?: string;
}

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const CinematicHero: React.FC<CinematicHeroProps> = ({
  image,
  phase,
  title,
  subtitle,
  icon: Icon,
  accentColor = 'rose',
  backLink = '/soberania-organica',
  backLabel = 'Soberania Orgânica',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  const colorMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
    rose: { text: 'text-rose-400', bg: 'bg-rose-500/15', border: 'border-rose-500/25', glow: 'rgba(244,63,94,0.3)' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/25', glow: 'rgba(245,158,11,0.3)' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/25', glow: 'rgba(59,130,246,0.3)' },
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/25', glow: 'rgba(16,185,129,0.3)' },
    teal: { text: 'text-teal-400', bg: 'bg-teal-500/15', border: 'border-teal-500/25', glow: 'rgba(20,184,166,0.3)' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-500/25', glow: 'rgba(168,85,247,0.3)' },
  };
  const colors = colorMap[accentColor] || colorMap.rose;

  return (
    <section ref={sectionRef} className="relative h-[70vh] min-h-[500px] max-h-[800px] flex items-end overflow-hidden">
      {/* Parallax background image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src={image}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover will-change-transform scale-110"
          style={{ filter: 'brightness(0.45) saturate(0.85)' }} loading="lazy" decoding="async" />
        {/* Multi-layer overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5,8,8,0.15) 0%, rgba(5,8,8,0.5) 50%, rgba(5,8,8,0.92) 80%, rgba(5,8,8,1) 100%)',
          }}
        />
        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 120% 100% at 50% 30%, transparent 40%, rgba(5,8,8,0.85) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Back link */}
        <Link
          to={backLink}
          className="inline-flex items-center gap-2 text-stone-500 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> {backLabel}
        </Link>

        {/* Phase tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
          className="mb-4"
        >
          <span className={`text-[10px] font-bold tracking-[0.5em] uppercase ${colors.text} opacity-70`}>
            {phase}
          </span>
        </motion.div>

        {/* Title + Icon */}
        <div className="flex items-start gap-4 md:gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: APPLE_EASE }}
            className={`p-3 md:p-4 rounded-2xl ${colors.bg} border ${colors.border} shrink-0`}
          >
            <Icon className={colors.text} size={28} />
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.15, ease: APPLE_EASE }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: APPLE_EASE }}
              className="text-stone-400 text-sm md:text-base lg:text-lg leading-relaxed mt-3 max-w-2xl"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
          className="flex items-center gap-2 mt-6"
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={14} className="text-stone-500" />
          </motion.div>
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-600">
            Role para explorar
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade into page content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(5,8,8,1))' }}
      />
    </section>
  );
};

export default CinematicHero;
