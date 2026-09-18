import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Hourglass, ShieldCheck, Zap, Cpu, Lock, TrendingUp, Layers, Timer, Flame, Gauge, Activity, CircuitBoard, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 } }),
};

function useMouseParallax(s = 15) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 }), sy = useSpring(my, { stiffness: 50, damping: 20 });
  const h = useCallback((e: MouseEvent) => { mx.set(((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * s); my.set(((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * s); }, [mx, my, s]);
  useEffect(() => { window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h); }, [h]);
  return { sx, sy };
}

/* ══ Section Glow Divider ══ */
const SectionGlow = ({ color = 'rgba(245,158,11,0.15)' }: { color?: string }) => (
  <div className="relative z-10 h-px max-w-5xl mx-auto my-16 md:my-24">
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

    <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />
  </div>
);

/* ══ Animated Counter ══ */
const AnimCounter: React.FC<{ value: string; label: string; delay?: number; accent?: string }> = ({ value, label, delay = 0, accent = '#f59e0b' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: APPLE_EASE }}
      className="text-center p-5 md:p-7 rounded-xl border border-white/[0.06] hover:border-primary/25 transition-all duration-500 group"
      style={{ background: `${accent}08` }}
    >
      <motion.p className="text-2xl md:text-4xl font-black mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: accent }}
        initial={{ scale: 0.8 }} animate={isInView ? { scale: 1 } : {}} transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring' }}
      >{value}</motion.p>
      <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.25em] group-hover:text-foreground/60 transition-colors">{label}</p>
    </motion.div>
  );
};

/* ══ Info Card ══ */
const InfoCard: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode; accent?: string; index?: number }> = ({ icon: Icon, title, children, accent = '#f59e0b', index = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index}
      variants={fadeUp}
      className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-10 group hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border" style={{ background: `${accent}15`, borderColor: `${accent}30` }}>
          <Icon style={{ color: accent }} size={20} />
        </div>
        <div>
          <h4 className="text-foreground font-black uppercase text-sm mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h4>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default function FuturoBitcoin() {
  const { scrollYProgress } = useScroll();
  const { sx, sy } = useMouseParallax(12);
  const pw = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const yearsLeft = 2140 - new Date().getFullYear();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-foreground font-sans selection:bg-primary/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <link rel="canonical" href={canonicalUrl('/futuro-bitcoin')} />
        <meta property="og:url" content={canonicalUrl('/futuro-bitcoin')} />
        <title>O Futuro do Bitcoin — O Que Acontece Após 2140 | Arsenal Técnico</title>
        <meta name="description" content="Descubra o que acontece quando o último Bitcoin for minerado em 2140. Entenda o modelo de taxas, a fortaleza da mineração, deflação monetária e a Lightning Network como camada de escala." />
        <meta name="keywords" content="futuro do bitcoin, bitcoin 2140, último bitcoin minerado, deflação bitcoin, lightning network, mineração bitcoin futuro, taxas bitcoin, halving bitcoin" />
      </Helmet>

      {/* Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left" style={{ width: pw, background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(40, 95%, 65%))' }} />

      {/* Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 60%)', x: sx, y: sy }} />
        <motion.div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.04) 0%, transparent 60%)', x: useTransform(sx, v => -v * 0.5), y: useTransform(sy, v => -v * 0.5) }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }} />
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 md:pb-24">
        <motion.div className="absolute inset-0 z-0" style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, 120]) }}>
          <div className="absolute inset-0 bg-cover bg-center scale-110" style={{ backgroundImage: `url('/heroes/supply-shock.webp')`, filter: 'brightness(0.3) saturate(0.7)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.1) 0%, rgba(5,8,8,0.4) 30%, rgba(5,8,8,0.85) 65%, rgba(5,8,8,1) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 130% 100% at 50% 35%, transparent 35%, rgba(5,8,8,0.9) 100%)' }} />
        </motion.div>

        {/* Nav breadcrumb */}
        <nav className="absolute top-6 left-6 md:left-16 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] z-20">
          <Link to="/protocolo-inicial" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><ArrowLeft size={12} /> Protocolo Inicial</Link>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-primary">Futuro do Bitcoin</span>
        </nav>

        {/* Countdown floating */}
        <motion.div
          className="absolute top-20 right-6 md:top-24 md:right-16 text-right z-20 select-none pointer-events-none"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: APPLE_EASE }}
        >
          <p className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.3em]">Contagem regressiva</p>
          <p className="text-6xl md:text-8xl font-black text-primary/20" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{yearsLeft}</p>
          <p className="text-[8px] text-muted-foreground/50 uppercase font-black tracking-[0.3em]">anos restantes</p>
        </motion.div>

        <div className="max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}>
            <div className="flex items-center gap-3 mb-8">
              <motion.div className="p-3.5 bg-primary/10 border border-primary/20 rounded-2xl" whileHover={{ scale: 1.1, rotate: 5 }}>
                <Hourglass className="text-primary" size={24} />
              </motion.div>
              <span className="text-primary/60 text-[10px] font-bold uppercase tracking-[0.5em]">Projeção Tática</span>
            </div>
          </motion.div>

          <h1 className="leading-[0.82] mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <motion.span className="block text-6xl md:text-[8rem] lg:text-[11rem] font-black tracking-tighter text-foreground" initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.1 }}>
              O ANO
            </motion.span>
            <motion.span className="block text-6xl md:text-[8rem] lg:text-[11rem] font-black tracking-tighter" initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.3 }}
              style={{ background: 'linear-gradient(135deg, hsl(40,92%,56%), hsl(35,95%,60%), hsl(45,100%,70%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              2140
            </motion.span>
          </h1>

          <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-4">
              Quando o último Satoshi for minerado, a inflação do Bitcoin será <span className="font-bold text-primary">zero. Para sempre.</span>
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Enquanto bancos centrais imprimem trilhões para cobrir déficits, o Bitcoin segue seu cronograma imutável: a cada ~4 anos a emissão é cortada pela metade, convergindo para <span className="text-foreground font-semibold">21 milhões</span>.
            </p>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-10" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.5 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={16} />
          </motion.div>
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Role para explorar</span>
        </motion.div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Stats Grid ── */}
        <section className="py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimCounter value="21M" label="Limite absoluto" delay={0} />
            <AnimCounter value="0%" label="Inflação pós-2140" delay={0.1} />
            <AnimCounter value={`${yearsLeft}`} label="Anos restantes" delay={0.2} />
            <AnimCounter value="100%" label="Taxas como receita" delay={0.3} />
          </div>
        </section>

        <SectionGlow />

        {/* ── BLOCO 1: A Verdade Matemática ── */}
        <section className="py-8 md:py-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Timer className="text-primary" size={20} />
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                A Verdade Matemática
              </h2>
            </div>
          </motion.div>

          <div className="space-y-4">
            <InfoCard icon={Hourglass} title="O Fim da Emissão" accent="#f59e0b" index={0}>
              <p className="text-stone-300 text-sm leading-relaxed mb-3">
                Por volta do ano <strong className="text-primary">2140</strong>, o último Satoshi será minerado. A partir desse momento, a inflação do Bitcoin será <strong className="text-foreground">zero absoluto</strong>. Diferente do Real ou do Dólar, onde a impressora nunca para, o Bitcoin tem um ponto final definitivo.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Enquanto bancos centrais ao redor do mundo imprimem trilhões para cobrir déficits fiscais, diluindo o valor de cada unidade monetária em circulação, o Bitcoin segue seu cronograma imutável: a cada ~4 anos a emissão é cortada pela metade (halving), convergindo assintoticamente para 21 milhões.
              </p>

              {/* Visual comparison */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-destructive/5 border border-destructive/15 rounded-xl p-6 text-center">
                  <p className="text-[8px] text-destructive uppercase font-black tracking-widest mb-2">Moeda Fiat</p>
                  <p className="text-3xl font-black text-destructive/60">&#8734;</p>
                  <p className="text-muted-foreground text-[10px] mt-2">Impressão infinita</p>
                </div>
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-6 text-center">
                  <p className="text-[8px] text-primary uppercase font-black tracking-widest mb-2">Bitcoin</p>
                  <p className="text-3xl font-black text-primary">21M</p>
                  <p className="text-muted-foreground text-[10px] mt-2">Limite absoluto</p>
                </div>
              </div>
            </InfoCard>

            <InfoCard icon={Layers} title="Mecanismo de Recompensa Pós-2140" accent="#f59e0b" index={1}>
              <p className="text-stone-300 text-sm leading-relaxed mb-3">
                Após 2140, os mineradores <strong className="text-foreground">não receberão mais novos bitcoins</strong>, mas serão sustentados integralmente pelas <strong className="text-primary">taxas de transação</strong>. O mercado de taxas garantirá que a rede continue sendo a mais segura do planeta enquanto houver valor sendo transacionado.
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Este modelo é autossustentável: quanto mais valor a rede processa, mais incentivo os mineradores têm para protegê-la, criando um ciclo virtuoso de segurança e adoção.
              </p>

              <div className="flex items-center gap-4 mt-6 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                <div className="text-center flex-1">
                  <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">Hoje</p>
                  <p className="text-sm font-black text-foreground mt-1">Subsídio + Taxas</p>
                </div>
                <ArrowRight className="text-primary shrink-0" size={16} />
                <div className="text-center flex-1">
                  <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">2140+</p>
                  <p className="text-sm font-black text-primary mt-1">100% Taxas</p>
                </div>
              </div>
            </InfoCard>
          </div>
        </section>

        <SectionGlow color="rgba(34,197,94,0.15)" />

        {/* ── BLOCO 2: Fortaleza da Mineração ── */}
        <section className="py-8 md:py-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-emerald-400" size={20} />
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-emerald-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                A Fortaleza da Mineração
              </h2>
            </div>
          </motion.div>

          <div className="space-y-4">
            <InfoCard icon={Gauge} title="Segurança e Dificuldade" accent="#22c55e" index={0}>
              <p className="text-stone-300 text-sm leading-relaxed mb-3">
                A rede se ajusta automaticamente. Se mineradores saem, a <strong className="text-foreground">dificuldade cai</strong>; se o preço sobe, a competição aumenta. O Bitcoin é um <strong className="text-emerald-400">organismo autorregulado</strong> que sempre encontra o equilíbrio para permanecer online.
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Esse mecanismo garante que nenhum fator externo — seja uma queda de preço, um desastre natural ou uma proibição governamental — consiga derrubar a rede permanentemente. Ela se adapta, sobrevive e continua produzindo blocos a cada 10 minutos.
              </p>
            </InfoCard>

            <InfoCard icon={Zap} title="Lastro em Energia Real" accent="#22c55e" index={1}>
              <p className="text-stone-300 text-sm leading-relaxed mb-3">
                A mineração converte <strong className="text-foreground">eletricidade em segurança imutável</strong>. Mineradores buscam a energia mais barata e desperdiçada do planeta — excedentes de hidrelétricas, gás queimado em flares, geotérmica — tornando o Bitcoin um <strong className="text-emerald-400">catalisador de eficiência energética global</strong>.
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Diferente do ouro, cujo lastro é geológico e estático, o lastro do Bitcoin é termodinâmico: cada bloco representa energia real gasta, impossível de falsificar ou reverter.
              </p>
            </InfoCard>

            <InfoCard icon={CircuitBoard} title="Eficiência Exponencial" accent="#22c55e" index={2}>
              <p className="text-stone-300 text-sm leading-relaxed">
                O hardware (ASICs) evolui constantemente, permitindo que a rede processe <strong className="text-foreground">mais segurança com menos custo energético</strong>, mantendo o sistema lucrativo e inexpugnável. A cada geração de chips, o custo por terahash cai, enquanto a segurança total da rede só aumenta.
              </p>
            </InfoCard>
          </div>
        </section>

        <SectionGlow color="rgba(59,130,246,0.15)" />

        {/* ── BLOCO 3: A Cura da Deflação ── */}
        <section className="py-8 md:py-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-blue-400" size={20} />
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-blue-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                A Cura da Deflação
              </h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-4xl">
              Poder de compra no tempo: enquanto moedas fiat perdem valor, o Bitcoin recompensa quem poupa.
            </p>
          </motion.div>

          <div className="space-y-4">
            <InfoCard icon={Lock} title="Moeda Forte" accent="#3b82f6" index={0}>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                O Bitcoin já é <strong className="text-foreground">mais escasso que o ouro</strong> e menos inflacionário que qualquer moeda estatal. Ele é o único sistema onde o seu dinheiro <strong className="text-blue-400">ganha valor</strong> conforme a tecnologia avança e a adoção cresce.
              </p>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 text-center">
                  <p className="text-[8px] text-blue-400/60 uppercase font-black tracking-widest mb-1">Ouro</p>
                  <p className="text-lg font-black text-muted-foreground">~1.5%</p>
                  <p className="text-[9px] text-muted-foreground/60 mt-1">Inflação anual</p>
                </div>
                <div className="bg-destructive/5 border border-destructive/10 rounded-xl p-4 text-center">
                  <p className="text-[8px] text-destructive/60 uppercase font-black tracking-widest mb-1">Real (BRL)</p>
                  <p className="text-lg font-black text-destructive">~6-10%</p>
                  <p className="text-[9px] text-muted-foreground/60 mt-1">Inflação anual</p>
                </div>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
                  <p className="text-[8px] text-primary/60 uppercase font-black tracking-widest mb-1">Bitcoin</p>
                  <p className="text-lg font-black text-primary">~0.8%</p>
                  <p className="text-[9px] text-muted-foreground/60 mt-1">E caindo a cada halving</p>
                </div>
              </div>
            </InfoCard>

            <InfoCard icon={Activity} title="Divisibilidade Infinita" accent="#3b82f6" index={1}>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                <em className="text-blue-300">"Não haverá bitcoins para todos"</em> é um mito. Cada bitcoin é composto por <strong className="text-foreground">100 milhões de Satoshis</strong>. Se o preço subir, transacionamos em frações menores. O que importa é o <strong className="text-blue-400">poder de compra do seu suor</strong>, não o número de unidades nominais.
              </p>
              <div className="flex items-center justify-center gap-4 mt-6 p-6 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                <div className="text-center">
                  <p className="text-4xl font-black text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1 BTC</p>
                </div>
                <div className="text-blue-500 font-black text-xl">=</div>
                <div className="text-center">
                  <motion.p className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Space Grotesk', sans-serif", background: 'linear-gradient(90deg,#3b82f6,#60a5fa,#93c5fd,#60a5fa,#3b82f6)', backgroundSize: '250% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 3s linear infinite' }}>100.000.000</motion.p>
                  <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest mt-1">satoshis</p>
                </div>
              </div>
            </InfoCard>

            <InfoCard icon={Hourglass} title="Pensamento de Longo Prazo" accent="#3b82f6" index={2}>
              <p className="text-stone-300 text-sm leading-relaxed">
                O Bitcoin te cura da necessidade de consumir lixo instantâneo. Ele incentiva a <strong className="text-foreground">poupança, o investimento e a construção de um futuro real</strong>, recompensando quem tem <strong className="text-blue-400">baixa preferência temporal</strong>. Numa economia deflacionária, cada decisão de gasto é ponderada — e cada decisão de poupar é recompensada.
              </p>
            </InfoCard>
          </div>
        </section>

        <SectionGlow />

        {/* ── BLOCO 4: Taxas e Camadas (L2) ── */}
        <section className="py-8 md:py-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-primary" size={20} />
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O Escudo Final: Taxas e Camadas (L2)
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="bg-white/[0.02] border border-primary/15 rounded-2xl p-10 md:p-14 space-y-8 relative overflow-hidden"
          >
            {/* Lightning icon */}
            <div className="flex items-center justify-center py-6">
              <motion.div
                animate={{ boxShadow: ['0 0 20px rgba(245,158,11,0.1)', '0 0 40px rgba(245,158,11,0.25)', '0 0 20px rgba(245,158,11,0.1)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
              >
                <Zap className="text-primary" size={40} />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-foreground font-black uppercase text-sm tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Mecanismo de Escala</h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Nem toda transação precisa estar na blockchain principal (L1). A <strong className="text-primary">Lightning Network</strong> permite transações instantâneas e quase gratuitas, enquanto a rede principal serve como o <strong className="text-foreground">tribunal final de liquidação</strong>.
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Assim como o sistema financeiro tradicional tem camadas (banco central, bancos comerciais, sistemas de pagamento), o Bitcoin se escala em camadas sem comprometer a segurança da base.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-foreground font-black uppercase text-sm tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Valor vs. Preço</h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  O <strong className="text-foreground">preço do Bitcoin em moeda fiduciária</strong> pode oscilar, mas o seu valor como reserva de valor soberana apenas se consolida a cada bloco minerado. Preço é o que você paga; <strong className="text-primary">valor é o que você recebe</strong>.
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  A volatilidade é o preço da admissão para um ativo que está sendo monetizado do zero para se tornar a reserva de valor global. Com o tempo, conforme a adoção cresce, a volatilidade diminui naturalmente.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center">
                <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">Camada 1 (L1)</p>
                <p className="text-sm font-black text-foreground mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Tribunal Final</p>
                <p className="text-[10px] text-muted-foreground mt-1">Liquidação definitiva</p>
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 text-center">
                <p className="text-[8px] text-primary uppercase font-black tracking-widest">Camada 2 (L2)</p>
                <p className="text-sm font-black text-primary mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Lightning Network</p>
                <p className="text-[10px] text-muted-foreground mt-1">Pagamentos instantâneos</p>
              </div>
            </div>
          </motion.div>
        </section>

        <SectionGlow />

        {/* ── CONCLUSÃO TÁTICA ── */}
        <section className="py-16 md:py-24">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="bg-primary/[0.03] border border-primary/20 rounded-2xl p-10 md:p-16 text-center space-y-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-tight mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O Sistema Mais<br /><span style={{ background: 'linear-gradient(135deg, hsl(40,92%,56%), hsl(35,95%,60%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Honesto da História</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
                {[
                  { icon: Lock, title: 'Imutável', desc: 'Regras gravadas em código, imunes a políticos, banqueiros e burocratas.' },
                  { icon: Flame, title: 'Escasso', desc: '21 milhões é o limite. O resto é ruído. Nenhum banco central pode imprimir mais.' },
                  { icon: ShieldCheck, title: 'Soberano', desc: 'Você é o dono do seu banco. Sem permissão. Sem intermediários. Sem censura.' },
                ].map((item, i) => (
                  <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <item.icon className="text-primary shrink-0" size={20} />
                      <h4 className="text-foreground font-black uppercase text-sm tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <p className="text-muted-foreground/40 font-black text-[9px] uppercase mt-12 tracking-[0.5em]">O futuro pertence a quem entende o código.</p>
            </div>
          </motion.div>
        </section>

        {/* ── Próximo Nível ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <Link to="/protocolo-inicial" className="border-2 border-white/10 hover:border-primary/50 p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-32 rounded-2xl group transition-all duration-500 block">
            <div className="text-center md:text-left">
              <h3 className="font-black uppercase tracking-[0.4em] text-xs text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Continue Aprendendo</h3>
              <p className="text-muted-foreground font-bold uppercase text-xs">Volte ao Protocolo e avance nos módulos.</p>
            </div>
            <div className="bg-primary text-primary-foreground px-10 py-4 font-black uppercase text-[10px] tracking-widest group-hover:bg-primary/90 transition-all flex items-center gap-3 rounded-xl">
              Protocolo Inicial <ArrowRight size={16} />
            </div>
          </Link>
        </motion.div>

        {/* Footer */}
        <footer className="pt-16 pb-20 border-t border-border">
          <div className="text-center space-y-10">
            <p className="text-muted-foreground/30 font-black uppercase tracking-[1em] text-[9px]">21 milhões. Ponto final.</p>
            <p className="text-muted-foreground/20 text-[9px] font-black tracking-[0.5em] uppercase pt-16">Lord Junnior &copy; 2026</p>
          </div>
        </footer>
      </div>

      {/* Shimmer keyframe */}
      <style>{`@keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }`}</style>
    </div>
  );
}
