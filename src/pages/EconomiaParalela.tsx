import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, ArrowRight, Download, Repeat, Landmark, ShieldAlert,
  Eye, EyeOff, Lock, Fingerprint, ChevronDown
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import DonationCTA from '@/components/DonationCTA';
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

/* ─── SEO: meta keywords target ───
   economia paralela bitcoin, P2P bitcoin sem KYC, bisq exchange,
   economia circular bitcoin, opsec bitcoin, privacidade financeira,
   trocas voluntárias, soberania P2P, multisig bitcoin
─────────────────────────────────── */

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

export default function EconomiaParalela() {
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
    <div className="min-h-screen text-stone-100 font-sans selection:bg-red-400/50 relative overflow-hidden"
      style={{ background: '#050808' }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>


      <Helmet>
        <link rel="canonical" href={canonicalUrl('/economia-paralela')} />
        <meta property="og:url" content={canonicalUrl('/economia-paralela')} />
        <title>Economia Paralela — Soberania P2P sem Intermediários | Lord Junnior</title>
        <meta name="description" content="Aprenda a operar uma economia paralela com Bitcoin: trocas P2P via BISQ, economia circular, protocolos de silêncio e compartimentação. Sem KYC, sem rastreamento." />
      </Helmet>

      <ScrollToTop />

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
      </div>

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(220,38,38,0.06) 50%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ background: 'linear-gradient(225deg, transparent 40%, rgba(245,158,11,0.05) 55%, transparent 75%)' }} />
      </div>

      {/* ─── REACTIVE ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-red-600/30 to-transparent blur-3xl" />
        </motion.div>
        <motion.div style={{ x: springY, y: springX }}
          className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/20 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/economia-paralela.webp"
        phase="Soberania P2P"
        title="Economia Paralela"
        subtitle="O sistema fiduciário é uma ferramenta, não um destino. Aprenda a entrar e sair dele sem deixar rastros permanentes e sem pedir permissão."
        icon={EyeOff}
        accentColor="rose"
        backLink="/arsenal"
        backLabel="Torre de Controle"
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 01 — BISQ: A SAÍDA DE EMERGÊNCIA
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capítulo 01</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              BISQ: A Saída de Emergência
            </h2>
          </motion.div>

          <motion.div variants={scaleIn} custom={1}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-12 relative overflow-hidden
                       hover:border-red-500/15 transition-all duration-500">
            {/* Shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-stone-400 leading-relaxed mb-8">
                  BISQ é um software open-source, não um site. Ele conecta compradores e vendedores via Tor. Não há CEO, não há conta bancária central, não há KYC. É a exchange que não pode ser censurada porque não existe em nenhum servidor central.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4 items-start">
                    <div className="h-7 w-7 rounded-lg bg-red-500/10 border border-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-red-400 text-[10px] font-bold">!</span>
                    </div>
                    <p className="text-sm text-stone-300 leading-relaxed">
                      <strong className="text-white">Fiat (BRL):</strong> O dinheiro viaja entre contas bancárias (PIX/TED). O estado vê a transferência, mas não o motivo.
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="h-7 w-7 rounded-lg bg-red-500/10 border border-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-red-400 text-[10px] font-bold">!</span>
                    </div>
                    <p className="text-sm text-stone-300 leading-relaxed">
                      <strong className="text-white">Bitcoin (BTC):</strong> Travado em Multisig 2-de-2. A matemática garante a entrega, não a confiança.
                    </p>
                  </div>
                </div>
                <a href="https://bisq.network" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/25 rounded-xl px-6 py-3.5
                             text-red-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-500 group animate-pulse">
                  <Download size={16} /> Baixar BISQ
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Protocolo visual */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8">
                <div className="text-[10px] font-bold text-stone-600 uppercase mb-8 tracking-[0.4em] text-center">
                  Protocolo de Segurança BISQ
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full h-14 border border-dashed border-stone-700/50 rounded-xl flex items-center justify-center text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                    Usuário A (Comprador)
                  </div>
                  <div className="h-8 w-px bg-gradient-to-b from-red-500/50 to-red-500/10" />
                  <div className="w-20 h-20 rounded-full border-2 border-red-500/30 bg-red-500/5 flex items-center justify-center">
                    <Lock size={20} className="text-red-400" />
                  </div>
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-red-400/60">Multisig 2-de-2</p>
                  <div className="h-8 w-px bg-gradient-to-b from-red-500/10 to-red-500/50" />
                  <div className="w-full h-14 border border-dashed border-stone-700/50 rounded-xl flex items-center justify-center text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                    Usuário B (Vendedor)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 02 — ECONOMIA CIRCULAR
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capítulo 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Trocas Voluntárias e Circularidade
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={scaleIn} custom={0}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-10
                         hover:border-red-500/20 hover:bg-red-500/[0.02] transition-all duration-500 group">
              <div className="p-3 rounded-xl bg-red-500/8 border border-red-500/15 w-fit mb-6">
                <Repeat size={24} className="text-red-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O Fim do Intermediário
              </h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                A melhor forma de obter BTC é oferecendo bens e serviços por ele. Isso cria uma economia circular que ignora completamente o sistema bancário. Se você é designer, programador ou marceneiro: <strong className="text-white">cobre em Sats.</strong>
              </p>
            </motion.div>

            <motion.div variants={scaleIn} custom={1}
              className="bg-white/[0.02] border border-stone-800/40 rounded-2xl p-8 md:p-10
                         hover:border-red-500/15 transition-all duration-500 group">
              <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/40 w-fit mb-6">
                <Landmark size={24} className="text-stone-500" />
              </div>
              <h4 className="text-xl font-bold text-stone-400 mb-4 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Vigilância Passiva
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed">
                Entenda que toda transação bancária é vigiada e armazenada para sempre. O PIX não é de graça; o preço é a sua privacidade absoluta. Cada centavo que passa pelo sistema tradicional é registrado, catalogado e disponível para qualquer futura investigação retroativa.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 03 — PROTOCOLOS DE SILÊNCIO E COMPARTIMENTAÇÃO
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert size={18} className="text-red-500/70" />
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capítulo 03</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Protocolos de Silêncio e Compartimentação
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01', title: 'Silêncio', icon: EyeOff,
                desc: 'Não fale sobre suas posses. No mundo real, o maior risco de ataque não é o hacker, é o sequestrador. O silêncio é a sua primeira camada de segurança.'
              },
              {
                step: '02', title: 'Identidade', icon: Fingerprint,
                desc: 'Use e-mails específicos e dedicados para suas operações. Compartimentação é a chave para não ser rastreado. Cada operação financeira em um silo diferente.'
              },
              {
                step: '03', title: 'OpSec Física', icon: Eye,
                desc: 'Nunca instale aplicativos de carteiras "quentes" em aparelhos que você carrega na rua vinculados ao seu rosto ou digital. Separe o dispositivo de custódia do dispositivo social.'
              },
            ].map((item, i) => (
              <motion.div key={item.step} variants={scaleIn} custom={i}
                className="bg-white/[0.03] border border-red-500/10 rounded-2xl p-8 relative overflow-hidden
                           hover:border-red-500/25 hover:bg-red-500/[0.02] transition-all duration-500 group">
                <div className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.3em] text-red-500/25 uppercase">
                  {item.step}
                </div>
                <div className="p-3 rounded-xl bg-red-500/8 border border-red-500/15 w-fit mb-6
                               group-hover:bg-red-500/12 transition-all duration-500">
                  <item.icon size={22} className="text-red-400" />
                </div>
                <h5 className="text-lg font-bold text-white mb-3 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.title}
                </h5>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            MANIFESTO FINAL — CTA + PNL
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-20">
          <motion.div variants={fadeUp} custom={0}
            className="bg-white/[0.02] border border-red-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-red-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10 space-y-8">
              <p className="text-stone-600 font-bold text-xs tracking-[0.5em] uppercase">
                Not your keys, not your money.
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Quem não assume a custódia<br />aceita a{' '}
                <span className="text-red-500">dependência.</span>
              </h2>
              <p className="text-red-400 font-bold text-lg md:text-xl tracking-tight">
                Autocustódia exige responsabilidade.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/autocustodia"
                  className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/25 rounded-xl px-8 py-4
                             text-red-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-red-500/20 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] transition-all duration-500 group">
                  Autocustódia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/soberania-financeira/exchanges-privacidade-e-kyc"
                  className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-8 py-4
                             text-amber-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-500 group">
                  Exchanges sem KYC <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <DonationCTA />

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-white/[0.05] pt-12 text-center">
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
}
