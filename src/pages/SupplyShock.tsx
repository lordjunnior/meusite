import React, { useEffect, useState, useCallback } from 'react';
import { fetchBitcoinStats } from '@/components/supply-shock/bitcoinService';
import { BitcoinStats } from '@/components/supply-shock/types';
import { TerminalHeader } from '@/components/supply-shock/TerminalHeader';
import { CountdownTimer } from '@/components/supply-shock/CountdownTimer';
import { SupplyBar } from '@/components/supply-shock/SupplyBar';
import { StatsGrid } from '@/components/supply-shock/StatsGrid';
import { STRINGS } from '@/components/supply-shock/constants';
import { Loader2, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

/* ─── SEO: meta keywords target ───
   supply shock bitcoin, escassez bitcoin, 21 milhões bitcoin,
   halving bitcoin, oferta limitada, bitcoin mineração, blockchain stats,
   supply shock cripto, bitcoin tempo real
─────────────────────────────────── */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

/* ─── Mouse Parallax Hook ─── */
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

export default function SupplyShock() {
  const [stats, setStats] = useState<BitcoinStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { springX, springY } = useMouseParallax(8);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await fetchBitcoinStats();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError('Erro de conexão com a Blockchain. Tentando reconectar...');
        setLoading(false);
      }
    };
    init();
    const interval = setInterval(init, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 relative overflow-hidden"
      style={{ background: '#050808' }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>


      <Helmet>
        <link rel="canonical" href={canonicalUrl('/supply-shock')} />
        <meta property="og:url" content={canonicalUrl('/supply-shock')} />
        <title>Supply Shock — Escassez Absoluta do Bitcoin em Tempo Real | Lord Junnior</title>
        <meta name="description" content="Monitore em tempo real a escassez do Bitcoin: oferta circulante, percentual minerado, countdown para halving e estatísticas da blockchain. 21 milhões — nem um a mais." />
      </Helmet>

      <ScrollToTop />

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #f97316, #ef4444)' }} />
      </div>

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(245,158,11,0.08) 50%, transparent 70%)' }} />
      </div>

      {/* ─── REACTIVE ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/30 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/supply-shock.webp"
        phase="Escassez Absoluta · Dados em Tempo Real"
        title="Supply Shock"
        subtitle="21 milhões — nem um a mais. Monitore a escassez programática do Bitcoin em tempo real: oferta circulante, percentual minerado, countdown para o próximo halving."
        icon={TrendingUp}
        accentColor="amber"
        backLink="/"
        backLabel="Voltar ao Início"
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-8 pb-32">

        {/* ═══════════════════════════════════════════════════════
            TERMINAL HEADER + LIVE DATA
        ═══════════════════════════════════════════════════════ */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-col items-center w-full">

          <motion.div variants={fadeUp} custom={0} className="w-full max-w-5xl">
            <TerminalHeader />
          </motion.div>

          {loading ? (
            <motion.div variants={fadeUp} custom={1}
              className="h-[40vh] flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
              <p className="text-amber-500 animate-pulse tracking-widest uppercase text-sm font-mono">
                Sincronizando com a Mempool...
              </p>
            </motion.div>
          ) : error ? (
            <motion.div variants={fadeUp} custom={1}
              className="text-center p-8 border border-red-500/20 bg-red-500/5 rounded-2xl max-w-2xl">
              <p className="text-red-400 font-bold">{error}</p>
            </motion.div>
          ) : stats ? (
            <>
              <motion.div variants={fadeUp} custom={1} className="w-full max-w-5xl">
                <CountdownTimer targetDate={stats.estimatedHalvingDate} />
              </motion.div>
              <motion.div variants={fadeUp} custom={2} className="w-full max-w-5xl">
                <SupplyBar
                  circulatingSupply={stats.circulatingSupply}
                  percentageMined={stats.percentageMined}
                />
              </motion.div>
              <motion.div variants={fadeUp} custom={3} className="w-full max-w-5xl">
                <StatsGrid stats={stats} />
              </motion.div>

              {/* ─── FRASE DE ESCASSEZ — PNL ─── */}
              <motion.div variants={fadeUp} custom={4}
                className="w-full max-w-4xl mt-16">
                <div className="bg-white/[0.03] border border-amber-500/10 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-radial from-amber-500/[0.03] via-transparent to-transparent" />
                  <div className="relative z-10 space-y-4">
                    <p className="text-white font-bold text-lg md:text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Existem 56 milhões de milionários no mundo.
                    </p>
                    <p className="text-amber-400 font-bold text-lg md:text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Existem menos de 2 milhões de Bitcoins à venda.
                    </p>
                    <p className="text-stone-500 text-base">
                      Faça as contas. Não haverá o suficiente nem para 10% deles.
                    </p>
                    <p className="text-red-400 font-bold text-xl md:text-2xl pt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      E você ainda está esperando o "momento certo"?
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ─── CTA: BREATHING BUTTON ─── */}
              <motion.div variants={fadeUp} custom={5} className="mt-12 text-center">
                <Link to="/21-milhoes"
                  className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-8 py-4
                             text-amber-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500 group">
                  Entenda os 21 Milhões <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </>
          ) : null}
        </motion.div>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-white/[0.05] pt-12 mt-20 text-center">
          <p className="text-stone-600 text-xs uppercase tracking-[0.2em] font-semibold">
            {STRINGS.FOOTER}
          </p>
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase mt-4">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
}
