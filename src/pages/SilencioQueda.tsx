import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Download, Key, BookOpen, Brain, Shield, CheckCircle2, Eye, Layers } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';
import coverImage from '@/assets/cover-silencio-queda.webp';
import bgSilencio from '@/assets/bg-silencio-queda.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 } }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, filter: 'blur(8px)' },
  visible: (i: number) => ({ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.12 } }),
};

function useMouseParallax(strength = 10) {
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

const PILLARS = [
  { icon: BookOpen, h: 'tall', title: 'A história do dinheiro', text: 'Como ouro, papel e dígitos passaram pelas mãos do poder. Contada como história, não como aula.' },
  { icon: Key, h: 'short', title: 'Por que o Bitcoin tem valor', text: 'Escassez matemática verificável. Por que ele não pode ser copiado, falsificado ou impresso por decreto.' },
  { icon: Shield, h: 'short', title: 'Sua senha mestre', text: 'Como funciona a chave privada que devolve a você o controle total sobre o seu dinheiro.' },
  { icon: Eye, h: 'tall', title: 'Como a rede protege tudo', text: 'Mineração, consenso e prova de trabalho explicados sem jargão, com analogias do dia a dia.' },
];

const SilencioQueda: React.FC = () => {
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const h = () => { const t = document.documentElement.scrollHeight - window.innerHeight; setScrollProgress(t > 0 ? Math.min((window.scrollY / t) * 100, 100) : 0); };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const handleDownload = () => { window.open('/pdfs/silencio-da-queda.pdf', '_blank'); };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'O Silêncio da Queda',
    author: { '@type': 'Person', name: 'Lord Junnior' },
    inLanguage: 'pt-BR',
    description: 'Material gratuito para leigos absolutos. Bitcoin explicado com linguagem simples e analogias do dia a dia.',
    image: 'https://lordjunnior.com.br/og-silencio-queda.jpg',
    publisher: { '@type': 'Person', name: 'Lord Junnior' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL', availability: 'https://schema.org/InStock' },
  };

  return (
    <div
      className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/40 relative"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(5,8,8,0.92) 0%, rgba(5,8,8,0.88) 50%, rgba(5,8,8,0.95) 100%), url(${bgSilencio})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Helmet>
        <title>O Silêncio da Queda, Bitcoin do Zero para Leigos | Lord Junnior</title>
        <meta name="description" content="Material gratuito que ensina Bitcoin do zero, sem jargão, com analogias do dia a dia. Download imediato em PDF, sem cadastro." />
        <meta name="keywords" content="bitcoin para iniciantes, bitcoin do zero, aprender bitcoin, pdf bitcoin gratis, silencio da queda, lord junnior" />
        <link rel="canonical" href="https://lordjunnior.com.br/silencio-queda" />
        <meta property="og:title" content="O Silêncio da Queda, Bitcoin do Zero para Leigos" />
        <meta property="og:description" content="Material gratuito que ensina Bitcoin do zero, sem jargão." />
        <meta property="og:type" content="book" />
        <meta property="og:url" content="https://lordjunnior.com.br/silencio-queda" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <ScrollToTop />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #d4af37, #f5d060)' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <motion.div style={{ x: springX, y: springY }} className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full opacity-[0.06] bg-gradient-radial from-amber-500/40 to-transparent blur-3xl" />
        <motion.div style={{ x: springY, y: springX }} className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full opacity-[0.05] bg-gradient-radial from-yellow-500/30 to-transparent blur-3xl" />
      </div>

      {/* HERO CINEMATOGRÁFICO FULL BLEED */}
      <section className="relative z-10 min-h-[88vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: APPLE_EASE }}>
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">Material Autoral, Gratuito</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O Silêncio<br />da <span className="text-amber-400">Queda</span>
            </h1>
            <p className="text-lg md:text-2xl text-stone-300 leading-relaxed max-w-3xl mb-10 font-light">
              Bitcoin do zero, em linguagem que sua avó entende. Sem jargão. Sem especulação. Sem cadastro para baixar.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleDownload}
                className="group inline-flex items-center gap-3 bg-amber-500 text-black px-8 md:px-10 py-5 font-bold text-sm md:text-base tracking-wide rounded-2xl hover:bg-amber-400 hover:shadow-[0_0_50px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all duration-500"
              >
                <Download size={20} /> Baixar PDF agora
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#conteudo" className="inline-flex items-center gap-3 bg-white/5 border border-white/15 text-white px-8 py-5 font-semibold text-sm tracking-wide rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-500">
                Ver o que está dentro
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAP 01, PARA QUEM É (BLOCO ALTO) */}
      <section id="conteudo" className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={scaleIn} custom={0}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
              <div className="lg:col-span-2 group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(245,158,11,0.15)] min-h-[480px]">
                <img src={coverImage} alt="Capa do material O Silêncio da Queda" loading="eager" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-amber-300 text-[10px] font-bold tracking-[0.4em] uppercase">Capítulo 01</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Para quem é este material</h3>
                </div>
              </div>

              <div className="lg:col-span-3 rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-12 backdrop-blur-sm space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25">
                  <span className="text-amber-300 text-[10px] font-bold uppercase tracking-[0.3em]">Para Leigos Absolutos</span>
                </div>
                <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
                  Você não precisa entender de economia, programação ou gráficos.
                </p>
                <p className="text-base md:text-lg text-stone-300 leading-relaxed">
                  Escrevi este material usando linguagem simples e analogias do dia a dia. Se você sabe enviar uma mensagem ou usar um aplicativo de banco, vai entender Bitcoin ao terminar a leitura.
                </p>
                <div className="border-l-2 border-amber-500/50 pl-6 py-4 bg-amber-500/[0.04] rounded-r-xl">
                  <p className="text-white text-lg md:text-xl font-medium">É o fim das dúvidas e o início da sua liberdade financeira.</p>
                </div>
                <button
                  onClick={handleDownload}
                  className="group inline-flex items-center gap-3 bg-amber-500/15 border border-amber-500/40 rounded-xl px-6 md:px-8 py-4 text-amber-300 text-sm font-bold uppercase tracking-wider hover:bg-amber-500/25 hover:border-amber-500/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] transition-all duration-500"
                >
                  <Download size={16} /> Baixar PDF gratuito <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAP 02, PILARES (ALTURAS VARIADAS) */}
      <section className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/70">Capítulo 02</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O que você vai entender
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className={`group relative rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 backdrop-blur-sm hover:border-amber-500/30 hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(245,158,11,0.12)] transition-all duration-500 overflow-hidden ${p.h === 'tall' ? 'md:min-h-[360px]' : 'md:min-h-[280px]'}`}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-amber-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <p.icon size={24} className="text-amber-300" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.title}</h3>
                  <p className="text-stone-400 text-base md:text-lg leading-relaxed">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAP 03, POR QUE EXISTE */}
      <section className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0} className="rounded-3xl bg-white/[0.03] border border-white/10 p-10 md:p-16 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/[0.04] via-transparent to-transparent" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/70">Capítulo 03</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-3 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Por que este material existe
                </h2>
                <div className="space-y-4 text-stone-300 text-lg leading-relaxed">
                  <p>A queda não é do mercado. <strong className="text-amber-300">É da consciência.</strong></p>
                  <p>A maioria só pergunta como o dinheiro funciona quando percebe que já não tem controle sobre ele.</p>
                  <p>Bitcoin não surge como solução mágica. Surge como explicação tardia de algo que sempre foi verdade.</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  'Material 100 por cento gratuito, sem cadastro',
                  'Linguagem clara, leitura em até 90 minutos',
                  'Sem promessa de enriquecimento rápido',
                  'Sem indicação de exchange ou produto',
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/20 transition-all duration-500">
                    <CheckCircle2 size={20} className="text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-white text-base md:text-lg font-medium">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative z-10 py-20 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0} className="text-center rounded-3xl bg-gradient-to-b from-amber-500/[0.06] to-transparent border border-amber-500/20 p-10 md:p-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/[0.05] via-transparent to-transparent" />
            <div className="relative space-y-8">
              <div className="inline-flex p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30">
                <Key size={28} className="text-amber-300" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Próximo <span className="text-amber-400">nível</span>
              </h2>
              <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Depois de ler, você não será mais leigo. Aí sim, estará pronto para a prática técnica do arsenal.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <button onClick={handleDownload} className="group inline-flex items-center gap-3 bg-amber-500 text-black px-10 py-5 font-bold text-base tracking-wide rounded-2xl hover:bg-amber-400 hover:shadow-[0_0_50px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all duration-500">
                  <Download size={20} /> Baixar PDF
                </button>
                <Link to="/educacao" className="group inline-flex items-center gap-3 bg-white/5 border border-white/20 text-white px-10 py-5 font-semibold text-base tracking-wide rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-500">
                  Arsenal técnico <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

          <footer className="border-t border-white/[0.05] pt-12 mt-20 text-center space-y-4">
            <p className="text-white/80 text-lg font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Not your keys, not your money.
            </p>
            <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior &copy; 2026</p>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default SilencioQueda;
