// Volatilidade Bitcoin - Padrão Nobel v2
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Activity, Flame, BarChart3, TrendingUp, TrendingDown, Zap, Shield, Scale, Eye, ArrowRight, BookOpen } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};


/* ══ Section Glow ══ */
const SectionGlow: React.FC<{ color: string; position?: string }> = ({ color, position = '50% 30%' }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px]"
      style={{ background: color, top: '20%', left: position.split(' ')[0] }} />
  </div>
);

/* ══ Animated Divider ══ */
const AnimatedDivider: React.FC<{ color?: string }> = ({ color = 'from-transparent via-red-500/30 to-transparent' }) => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 1.2, ease: APPLE_EASE }}
    className={`h-px w-full bg-gradient-to-r ${color} origin-left`}
  />
);

/* ══ Stat Counter ══ */
const StatCard: React.FC<{ value: string; label: string; color: string; delay?: number }> = ({ value, label, color, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: APPLE_EASE }}
      className="text-center p-5 md:p-7 rounded-2xl border border-white/[0.06] hover:border-red-500/25 transition-all duration-500"
      style={{ background: 'rgba(220,38,38,0.03)' }}
    >
      <p className={`text-2xl md:text-4xl font-black mb-1 ${color}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</p>
      <p className="text-stone-500 text-[10px] font-mono uppercase tracking-[0.2em]">{label}</p>
    </motion.div>
  );
};

/* ══ CANDLE DATA ══ */
const CANDLES = Array.from({ length: 40 }, (_, i) => {
  const base = 60 + Math.sin(i * 0.3) * 20 + Math.random() * 15;
  const open = base + (Math.random() - 0.5) * 10;
  const close = base + (Math.random() - 0.5) * 10;
  const high = Math.max(open, close) + Math.random() * 8;
  const low = Math.min(open, close) - Math.random() * 8;
  return { open, close, high, low, bullish: close > open };
});

/* ══ FAQ Schema ══ */
const FAQ_DATA = [
  { q: 'A volatilidade do Bitcoin vai diminuir com o tempo?', a: 'Sim. Historicamente, a volatilidade anualizada do Bitcoin cai a cada ciclo de halving. Em 2011 era ~200%, em 2024 está em ~50%. Conforme a capitalização de mercado cresce, são necessários volumes cada vez maiores para mover o preço significativamente.' },
  { q: 'Por que o Bitcoin oscila tanto se é considerado dinheiro?', a: 'Porque é um ativo em fase de monetização — saindo de zero para possível reserva de valor global. Nenhum ativo fez essa transição sem volatilidade extrema. O ouro levou séculos; o Bitcoin está fazendo em décadas.' },
  { q: 'O Real é mais estável que o Bitcoin?', a: 'Em aparência sim, em realidade não. O Real perde poder de compra de forma constante e previsível (~5-10% ao ano via inflação). O Bitcoin oscila, mas sua tendência de longo prazo é de valorização exponencial contra todas as moedas fiduciárias.' },
  { q: 'Devo me preocupar com as quedas de 50-80%?', a: 'Se seu horizonte é de curto prazo, sim. Se seu horizonte é de 4+ anos (ciclo completo de halving), historicamente o Bitcoin nunca ficou abaixo do preço de qualquer máxima anterior por mais de um ciclo completo.' },
];

export default function VolatilidadeBitcoin() {
  
  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* Reading progress */
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Volatilidade do Bitcoin — O Preço da Soberania | Despertar Soberano</title>
        <meta name="description" content="Por que o Bitcoin oscila? Entenda a volatilidade como sinal de saúde de um ativo livre, sem controle estatal. Dados reais, comparações com o Real e projeções de longo prazo." />
        <meta property="og:title" content="Volatilidade do Bitcoin — O Preço da Soberania" />
        <meta property="og:description" content="A volatilidade assusta quem quer ficar rico rápido, mas recompensa quem quer não ser pobre devagar." />
        <meta property="og:image" content="/heroes/volatilidade-bitcoin.webp" />
        <link rel="canonical" href="https://lordjunnior.com.br/volatilidade" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Reading Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Film Grain */}
        <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.035]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />

        {/* ═══ HERO ═══ */}
        <CinematicHero
          image="/heroes/volatilidade-bitcoin.webp"
          phase="Bitcoin · Análise Técnica"
          title="Volatilidade"
          subtitle="O sistema te ensinou que 'estabilidade' é manter seu dinheiro em papel que perde 10% de poder de compra ao ano. Isso não é estabilidade. É um derretimento controlado."
          icon={Activity}
          accentColor="rose"
          backLink="/protocolo-inicial"
          backLabel="Protocolo Inicial"
        />

        {/* ═══ CONTENT ═══ */}
        <div className="relative z-10">

          {/* ── Chapter 1: O Preço da Liberdade ── */}
          <section className="relative py-20 md:py-32">
            <SectionGlow color="#dc2626" position="30% 30%" />
            <div className="max-w-6xl mx-auto px-6 md:px-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                className="mb-14">
                <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
                  <Flame className="text-red-400" size={20} />
                  <span className="text-red-400 text-[10px] font-bold tracking-[0.4em] uppercase font-mono">Capítulo 01</span>
                </motion.div>
                <motion.h2 variants={fadeUp} custom={1}
                  className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  O Preço da <span className="text-red-400">Liberdade</span>
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
                  A volatilidade não é um defeito do Bitcoin — é a prova de que ele opera em um <strong className="text-foreground">mercado livre real</strong>, sem interferência de bancos centrais.
                </motion.p>
              </motion.div>

              {/* Bento Grid — 3 cards */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                {[
                  { icon: Eye, color: 'text-red-400', border: 'border-red-500/15 hover:border-red-500/30', bg: 'rgba(220,38,38,0.04)', title: 'A Falha de Percepção', text: 'O sistema te ensinou que "estabilidade" é manter dinheiro em papel que perde 10% ao ano. Isso não é estabilidade — é um derretimento controlado.' },
                  { icon: Shield, color: 'text-amber-400', border: 'border-amber-500/15 hover:border-amber-500/30', bg: 'rgba(245,158,11,0.04)', title: 'A Verdade Blindada', text: 'A volatilidade é o reflexo de um ativo saindo de zero para moeda de reserva global. É a descoberta de preço sem o colchão artificial dos BCs.' },
                  { icon: Zap, color: 'text-emerald-400', border: 'border-emerald-500/15 hover:border-emerald-500/30', bg: 'rgba(16,185,129,0.04)', title: 'O Estalo Mental', text: 'Num mercado livre, o preço oscila para encontrar a verdade. Volatilidade é o sinal de que o Bitcoin é vivo, soberano e incorruptível.' },
                ].map((card, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i}
                    className={`rounded-2xl p-8 border ${card.border} transition-all duration-500 hover:-translate-y-1`}
                    style={{ background: card.bg }}>
                    <card.icon className={card.color} size={24} />
                    <h3 className="text-foreground font-bold text-sm mt-4 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{card.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Real vs BTC Comparison */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
                <motion.div variants={fadeUp} custom={0}
                  className="rounded-2xl border border-white/[0.06] p-8 md:p-12"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <p className="text-stone-500 text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-8">
                    Estabilidade Real vs. Volatilidade Soberana
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* BRL */}
                    <div className="rounded-xl border border-red-500/20 p-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500/60 to-transparent" />
                      <div className="flex items-center gap-2 mb-5">
                        <TrendingDown className="text-red-400" size={16} />
                        <span className="text-red-400 font-bold uppercase text-[10px] tracking-[0.2em] font-mono">Real Brasileiro (BRL)</span>
                      </div>
                      <div className="space-y-3 text-sm font-mono">
                        {[
                          ['Inflação anual (IPCA)', '~5-10%', 'text-red-400'],
                          ['Perda em 10 anos', '-60%', 'text-red-400'],
                          ['Volatilidade percebida', '"Estável"', 'text-emerald-400'],
                          ['Direção real', '↓ Sempre para baixo', 'text-red-400'],
                        ].map(([l, v, c], j) => (
                          <div key={j} className="flex justify-between text-muted-foreground">
                            <span>{l}</span><span className={`${c} font-bold`}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* BTC */}
                    <div className="rounded-xl border border-amber-500/20 p-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500/60 to-transparent" />
                      <div className="flex items-center gap-2 mb-5">
                        <TrendingUp className="text-amber-400" size={16} />
                        <span className="text-amber-400 font-bold uppercase text-[10px] tracking-[0.2em] font-mono">Bitcoin (BTC)</span>
                      </div>
                      <div className="space-y-3 text-sm font-mono">
                        {[
                          ['Retorno anualizado', '~50-100%', 'text-emerald-400'],
                          ['Ganho em 10 anos', '+10.000%', 'text-emerald-400'],
                          ['Volatilidade percebida', '"Perigoso"', 'text-red-400'],
                          ['Direção real', '↑ Up only (longo prazo)', 'text-emerald-400'],
                        ].map(([l, v, c], j) => (
                          <div key={j} className="flex justify-between text-muted-foreground">
                            <span>{l}</span><span className={`${c} font-bold`}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <AnimatedDivider />

          {/* ── Chapter 2: Por que o Preço Pulsa ── */}
          <section className="relative py-20 md:py-32">
            <SectionGlow color="#f59e0b" position="70% 40%" />
            <div className="max-w-6xl mx-auto px-6 md:px-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-14">
                <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
                  <BarChart3 className="text-amber-400" size={20} />
                  <span className="text-amber-400 text-[10px] font-bold tracking-[0.4em] uppercase font-mono">Capítulo 02</span>
                </motion.div>
                <motion.h2 variants={fadeUp} custom={1}
                  className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Por que o Preço <span className="text-amber-400">"Pulsa"</span>?
                </motion.h2>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Scale, color: 'text-amber-400', title: 'Mercado Pequeno', text: 'Com capitalização de ~US$ 1.6 trilhão (10% do ouro), qualquer grande entrada ou saída de capital causa ondas de choque. Você opera em um ativo que ainda é um segredo aberto.', stats: [['Market Cap BTC', '~$1.6T'], ['Market Cap Ouro', '~$14T']] },
                  { icon: Eye, color: 'text-red-400', title: 'Sem Lastro Fiduciário', text: 'O Bitcoin não tem fluxos de caixa ou dividendos; seu valor depende exclusivamente da sua utilidade como dinheiro soberano. Para uns vale zero, para outros é o infinito.', stats: [['Dividendos', 'ZERO'], ['Utilidade', 'INFINITA']] },
                  { icon: Shield, color: 'text-emerald-400', title: 'Mercados em Construção', text: 'Os produtos de defesa (derivativos) do Bitcoin ainda estão maturando. À medida que o mercado cresce, a volatilidade diminui — mas a oportunidade de ganhos assimétricos também.', stats: [['Maturidade', '15 anos'], ['Bolsas trad.', '200+ anos']] },
                ].map((card, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i}
                    className="rounded-2xl border border-white/[0.06] hover:border-amber-500/20 p-8 transition-all duration-500 hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <card.icon className={card.color} size={24} />
                    <h3 className="text-foreground font-bold text-sm mt-4 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{card.text}</p>
                    <div className="pt-4 border-t border-white/[0.06] space-y-2 font-mono">
                      {card.stats.map(([l, v], j) => (
                        <div key={j} className="flex justify-between text-[10px]">
                          <span className="text-stone-600 uppercase tracking-[0.15em]">{l}</span>
                          <span className="text-foreground font-bold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <AnimatedDivider color="from-transparent via-amber-500/30 to-transparent" />

          {/* ── Chapter 3: O Destino da Oscilação ── */}
          <section className="relative py-20 md:py-32">
            <SectionGlow color="#22c55e" position="40% 50%" />
            <div className="max-w-6xl mx-auto px-6 md:px-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-14">
                <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
                  <TrendingUp className="text-emerald-400" size={20} />
                  <span className="text-emerald-400 text-[10px] font-bold tracking-[0.4em] uppercase font-mono">Capítulo 03</span>
                </motion.div>
                <motion.h2 variants={fadeUp} custom={1}
                  className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  O Destino da <span className="text-emerald-400">Oscilação</span>
                </motion.h2>
              </motion.div>

              {/* Trend Line Visual */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease: APPLE_EASE }}
                className="rounded-2xl border border-white/[0.06] p-8 md:p-12 mb-8 relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <p className="text-stone-500 text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-6">Tendência de Longo Prazo (ignora o ruído)</p>
                <svg viewBox="0 0 800 200" className="w-full h-auto" preserveAspectRatio="none">
                  <polyline fill="none" stroke="rgba(220,38,38,0.15)" strokeWidth="1"
                    points="0,180 20,150 40,170 60,120 80,140 100,90 120,130 140,80 160,110 180,60 200,100 220,50 240,90 260,40 280,80 300,30 320,70 340,45 360,75 380,35 400,60 420,40 440,55 460,30 480,50 500,25 520,45 540,20 560,40 580,15 600,35 620,18 640,30 660,12 680,25 700,10 720,22 740,8 760,18 780,5 800,12" />
                  <line x1="0" y1="180" x2="800" y2="10" stroke="rgba(245,158,11,0.8)" strokeWidth="2" strokeDasharray="8,4" />
                  <text x="650" y="40" fill="rgba(245,158,11,0.6)" fontSize="12" fontFamily="monospace" fontWeight="bold">UP ONLY ↑</text>
                </svg>
              </motion.div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <StatCard value="~200%" label="Vol. 2011" color="text-red-400" delay={0} />
                <StatCard value="~100%" label="Vol. 2017" color="text-amber-400" delay={0.1} />
                <StatCard value="~50%" label="Vol. 2024" color="text-emerald-400" delay={0.2} />
                <StatCard value="↓" label="Tendência" color="text-emerald-400" delay={0.3} />
              </div>

              {/* Two columns */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeUp} custom={0}
                  className="rounded-2xl border border-white/[0.06] p-8"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <h3 className="text-foreground font-bold text-base mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    A Domesticação da Fera
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Conforme o Bitcoin se torna mais caro e distribuído, será necessário <strong className="text-foreground">cada vez mais capital fiduciário</strong> para mover o preço. O que hoje é um tsunami, amanhã será uma marola em um oceano de liquidez.
                  </p>
                </motion.div>
                <motion.div variants={fadeUp} custom={1}
                  className="rounded-2xl border border-white/[0.06] p-8"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <h3 className="text-foreground font-bold text-base mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    A Grande Substituição
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Os grandes detentores têm duas opções: ou <strong className="text-foreground">seguram o ativo</strong> (restringindo a oferta) ou <strong className="text-foreground">vendem</strong> (distribuindo para novos soberanos). Em ambos os casos, a rede se fortalece.
                  </p>
                  <div className="p-4 rounded-xl border border-amber-500/15 text-center" style={{ background: 'rgba(245,158,11,0.04)' }}>
                    <p className="text-amber-400 text-xs font-mono font-bold">
                      HOLD → Oferta ↓ → Preço ↑<br />
                      SELL → Distribuição ↑ → Descentralização ↑
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <AnimatedDivider color="from-transparent via-emerald-500/30 to-transparent" />

          {/* ── Chapter 4: Conclusão Tática ── */}
          <section className="relative py-20 md:py-32">
            <SectionGlow color="#f59e0b" position="50% 40%" />
            <div className="max-w-6xl mx-auto px-6 md:px-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
                <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
                  <Zap className="text-amber-400" size={20} />
                  <span className="text-amber-400 text-[10px] font-bold tracking-[0.4em] uppercase font-mono">Capítulo 04</span>
                </motion.div>
                <motion.h2 variants={fadeUp} custom={1}
                  className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-10"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Conclusão <span className="text-amber-400">Tática</span>
                </motion.h2>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease: APPLE_EASE }}
                className="rounded-2xl border border-amber-500/20 p-10 md:p-14 relative overflow-hidden"
                style={{ background: 'rgba(245,158,11,0.03)' }}>
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.6) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-10"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Não Olhe Para o Preço,<br />Olhe Para o <span className="text-amber-400">Valor</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                      { label: 'Curto Prazo', color: 'text-red-400', text: 'Ruído, especulação e emoção. Manchetes que vendem medo. Gráficos que parecem o fim do mundo.' },
                      { label: 'Longo Prazo', color: 'text-amber-400', text: 'Escassez matemática imutável e soberania individual. 21 milhões. Zero inflação. Zero confisco.' },
                      { label: 'A Regra de Ouro', color: 'text-emerald-400', text: 'A volatilidade assusta quem quer ficar rico rápido, mas recompensa quem quer não ser pobre devagar.' },
                    ].map((item, i) => (
                      <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <p className={`${item.color} font-bold uppercase text-sm font-mono mb-2`}>{item.label}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/[0.06] text-center">
                    <p className="text-foreground font-bold uppercase text-sm tracking-widest font-mono leading-relaxed">
                      "A volatilidade assusta quem quer ficar rico rápido,<br />
                      <span className="text-amber-400">mas recompensa quem quer não ser pobre devagar.</span>"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <AnimatedDivider color="from-transparent via-amber-500/20 to-transparent" />

          {/* ── FAQ ── */}
          <section className="relative py-20 md:py-32">
            <div className="max-w-4xl mx-auto px-6 md:px-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-12">
                <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
                  <BookOpen className="text-stone-500" size={18} />
                  <span className="text-stone-500 text-[10px] font-bold tracking-[0.4em] uppercase font-mono">Perguntas Frequentes</span>
                </motion.div>
                <motion.h2 variants={fadeUp} custom={1}
                  className="text-2xl md:text-4xl font-black tracking-tight text-foreground"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  FAQ — Volatilidade
                </motion.h2>
              </motion.div>

              <div className="space-y-4">
                {FAQ_DATA.map((faq, i) => (
                  <motion.details key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: APPLE_EASE }}
                    className="group rounded-2xl border border-white/[0.06] overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <summary className="cursor-pointer px-6 py-5 text-foreground font-semibold text-sm list-none flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                      {faq.q}
                      <ArrowRight size={14} className="text-stone-600 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-white/[0.04] pt-4">
                      {faq.a}
                    </div>
                  </motion.details>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA Soberania ── */}
          <section className="relative py-20">
            <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease: APPLE_EASE }}>
                <p className="text-stone-500 text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-6">Próximo passo</p>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Entendeu a volatilidade? Agora entenda o <span className="text-amber-400">mecanismo</span>.
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/halving"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500/10 border border-amber-500/25 text-amber-400 rounded-xl font-bold text-sm tracking-wide hover:bg-amber-500/20 transition-all">
                    Supply Shock & Halving <ArrowRight size={16} />
                  </Link>
                  <Link to="/protocolo-inicial"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-white/[0.08] text-muted-foreground rounded-xl font-bold text-sm tracking-wide hover:bg-white/[0.03] transition-all">
                    Voltar ao Protocolo
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
