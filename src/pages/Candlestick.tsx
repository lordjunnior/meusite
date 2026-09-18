import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, CandlestickChart, TrendingUp, TrendingDown, Eye, Brain, AlertTriangle, ChevronDown, Target, BarChart3, Shield, Info, Activity, LineChart, Gauge, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import candlestickAnatomiaImg from '@/assets/candlestick-anatomia.webp';
import candlestickPadroesImg from '@/assets/candlestick-padroes.webp';
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

const ANATOMIA = [
  { parte: 'Corpo (Body)', desc: 'A parte mais larga da vela. Representa a diferença entre o preço de abertura e o preço de fechamento. Barras verdes significam períodos em que o preço de fechamento foi acima da abertura (alta). Vermelhas indicam períodos de queda — o fechamento ficou abaixo da abertura.', cor: '#d4af37' },
  { parte: 'Sombra Superior (Upper Wick)', desc: 'O "risquinho" acima do corpo — o traço vertical que indica o preço MÁXIMO que o ativo atingiu naquele período. Uma sombra longa significa que compradores empurraram o preço para cima, mas vendedores forçaram de volta. Mesmo numa vela de baixa, o pico pode ter superado o período anterior.', cor: '#34d399' },
  { parte: 'Sombra Inferior (Lower Wick)', desc: 'A linha fina abaixo do corpo. Indica o preço MÍNIMO atingido naquele intervalo. Uma sombra inferior longa indica que vendedores derrubaram o preço, mas compradores reagiram com força e empurraram de volta — revelando pressão de compra oculta.', cor: '#38bdf8' },
  { parte: 'Timeframe (Período)', desc: 'Cada vela representa um período configurável: 1 minuto, 1 hora, 4 horas, 1 dia, 1 semana. No gráfico de 1h, cada candle mostra abertura, fechamento, máximo e mínimo daquela hora. Timeframes maiores mostram tendências macro; menores mostram ruído. Para Bitcoin, o gráfico semanal é o mais revelador.', cor: '#c084fc' },
];

const PADROES = [
  { nome: 'Doji', tipo: 'Indecisão', desc: 'Corpo minúsculo ou inexistente. Abertura ≈ Fechamento. Sinaliza equilíbrio entre compradores e vendedores. Após uma tendência forte, pode indicar reversão iminente.', sinal: 'neutro' },
  { nome: 'Martelo (Hammer)', tipo: 'Reversão de Alta', desc: 'Corpo pequeno no topo, sombra inferior longa (2-3x o corpo). Aparece após uma queda e sinaliza que compradores absorveram a pressão vendedora. Confirmação vem na vela seguinte.', sinal: 'alta' },
  { nome: 'Estrela Cadente (Shooting Star)', tipo: 'Reversão de Baixa', desc: 'Oposto do martelo: corpo no fundo, sombra superior longa. Aparece após uma alta e sinaliza que vendedores rejeitaram preços elevados. O mercado tentou subir e foi empurrado de volta.', sinal: 'baixa' },
  { nome: 'Engolfo de Alta (Bullish Engulfing)', tipo: 'Reversão de Alta', desc: 'Uma vela verde grande "engole" completamente o corpo da vela vermelha anterior. Quanto maior a vela engolfante, mais forte o sinal. Volume alto confirma a reversão.', sinal: 'alta' },
  { nome: 'Engolfo de Baixa (Bearish Engulfing)', tipo: 'Reversão de Baixa', desc: 'Uma vela vermelha grande engole a vela verde anterior. Sinaliza que vendedores assumiram o controle. Se aparece em uma resistência conhecida, a probabilidade de queda aumenta significativamente.', sinal: 'baixa' },
  { nome: 'Três Soldados Brancos', tipo: 'Continuação de Alta', desc: 'Três velas verdes consecutivas com corpos crescentes. Cada vela abre dentro do corpo da anterior e fecha em nova máxima. Indica que os compradores estão dominando consistentemente.', sinal: 'alta' },
  { nome: 'Três Corvos Negros', tipo: 'Continuação de Baixa', desc: 'Três velas vermelhas consecutivas com corpos crescentes. Cada abertura dentro do corpo anterior e fechamento em nova mínima. Sinal de capitulação vendedora em progresso.', sinal: 'baixa' },
  { nome: 'Estrela da Manhã (Morning Star)', tipo: 'Reversão de Alta', desc: 'Padrão de três velas: grande vermelha → pequena (doji/spinning top) com gap → grande verde. A vela do meio mostra exaustão dos vendedores. A terceira confirma que compradores retomaram o controle.', sinal: 'alta' },
];

const INDICADORES = [
  { icon: LineChart, titulo: 'Média Móvel (MA)', desc: 'O indicador mais conhecido da análise gráfica. A linha representa o preço médio dos últimos N períodos (ex: 20 dias). Funciona como suporte (piso) quando o preço está acima, e como resistência (teto) quando está abaixo. Cruzamentos de médias diferentes (ex: MA 50 e MA 200) geram sinais poderosos — o famoso "Golden Cross" e "Death Cross".', accent: '#34d399' },
  { icon: Gauge, titulo: 'Índice de Força Relativa (IFR/RSI)', desc: 'Varia entre 0 e 100. Acima de 70 = mercado sobrecomprado (caro). Abaixo de 30 = sobrevendido (barato). É calculado a partir da soma das cotações nos períodos de alta dividido pelo somatório dos períodos de queda. Não é previsão — é termômetro de pressão. Divergências entre RSI e preço são sinais avançados de reversão.', accent: '#38bdf8' },
  { icon: Activity, titulo: 'Volume', desc: 'O combustível por trás de qualquer movimento. Uma alta sem volume é suspeita. Uma queda com volume alto é capitulação. Volume confirma ou invalida padrões de candlestick — nunca opere sem cruzar com volume.', accent: '#f59e0b' },
];

const TENDENCIAS = [
  { tipo: 'Alta (Bull)', desc: 'Topos e fundos ascendentes. Cada novo topo supera o anterior. Traders compram nos suportes (pisos) e surfam até a resistência. Em canais de alta, o movimento favorece compras quando o gráfico encosta no piso.', cor: '#34d399', icon: TrendingUp },
  { tipo: 'Lateralização (Flat)', desc: 'Preço oscila entre suporte e resistência sem direção clara. Armadilha para traders impacientes. A maioria dos lucros é devolvida em mercados laterais. Paciência é a arma.', cor: '#f59e0b', icon: BarChart3 },
  { tipo: 'Queda (Bear)', desc: 'Topos e fundos descendentes. Traders que usam análise gráfica vendem quando o preço encontra a resistência (teto) dos canais de baixa. Ganha quem identifica o canal e opera dentro dele — não contra.', cor: '#ef4444', icon: TrendingDown },
];

const ERROS = [
  { erro: 'Operar um único padrão isoladamente', fix: 'Sempre confirme com volume, suporte/resistência e o timeframe superior. Um martelo em área de resistência é irrelevante.' },
  { erro: 'Ignorar o contexto da tendência', fix: 'Padrões de reversão só funcionam CONTRA uma tendência estabelecida. Um martelo no meio de um range lateral não significa nada.' },
  { erro: 'Over-trading em timeframes curtos', fix: 'Gráficos de 1 minuto e 5 minutos são dominados por ruído. Para Bitcoin, o mínimo recomendado é 4 horas; o ideal é diário e semanal.' },
  { erro: 'Não definir stop-loss antes de entrar', fix: 'Candlestick mostra probabilidade, não certeza. Sem gestão de risco, até o melhor padrão pode destruir seu capital.' },
  { erro: 'Confundir análise gráfica com investimento', fix: 'Trading é especulação de curto prazo. Investimento é tese de longo prazo com custódia própria. Não misture os dois — são jogos diferentes com regras diferentes.' },
];

export default function Candlestick() {
  const { scrollYProgress } = useScroll();
  const { sx, sy } = useMouseParallax(12);
  const pw = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <link rel="canonical" href={canonicalUrl('/candlestick')} />
        <meta property="og:url" content={canonicalUrl('/candlestick')} />
        <title>Candlestick — Como Ler Gráficos de Vela para Bitcoin e Criptomoedas | Arsenal Técnico</title>
        <meta name="description" content="Tutorial completo de candlestick: o que são as barrinhas, como ler velas, padrões de reversão, média móvel, RSI, tendências e erros fatais. Guia para análise gráfica de Bitcoin." />
        <meta name="keywords" content="candlestick, gráfico de vela, análise técnica, bitcoin trading, padrões candlestick, média móvel, RSI, IFR, como ler gráficos" />
      </Helmet>

      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left" style={{ width: pw, background: 'linear-gradient(90deg, #34d399, #10b981)' }} />

      {/* VFX Stack */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 60%)', x: sx, y: sy }} />
        <motion.div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 60%)', x: useTransform(sx, v => -v * 0.5), y: useTransform(sy, v => -v * 0.5) }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,hsl(0_0%_100%/0.015)_50%,transparent_60%)]" />
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/candlestick.webp"
        phase="Análise Técnica Fundamental"
        title={<>CANDLE<span className="text-emerald-400">STICK</span></>}
        subtitle="A linguagem visual do mercado. Inventada no Japão do século XVIII por comerciantes de arroz, continua sendo a ferramenta mais eficaz para ler a psicologia do mercado — seja Bitcoin, ações ou qualquer ativo."
        icon={CandlestickChart}
        accentColor="emerald"
        backLink="/educacao"
        backLabel="Arsenal Técnico"
      />

      {/* ══ DISCLAIMER DE AUTOCUSTÓDIA ══ */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="relative rounded-2xl border border-amber-500/20 p-6 md:p-8 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(239,68,68,0.03), transparent 70%)' }}
          >
            <motion.div 
              className="absolute inset-0 pointer-events-none rounded-2xl"
              animate={{ boxShadow: ['inset 0 0 0px rgba(245,158,11,0)', 'inset 0 0 30px rgba(245,158,11,0.05)', 'inset 0 0 0px rgba(245,158,11,0)'] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)' }} />
            
            <div className="relative z-10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0 mt-0.5">
                <Shield className="text-amber-400" size={22} />
              </div>
              <div>
                <p className="text-amber-400 font-bold text-xs uppercase tracking-[0.3em] mb-3">⚠ Aviso de Posicionamento</p>
                <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-3">
                  <span className="text-white font-bold">Este site defende a autocustódia como pilar central de soberania.</span> Trading, especulação e análise gráfica <span className="text-amber-400 font-semibold">não são modalidades que eu recomendo</span> — são ferramentas de curto prazo que contradizem a filosofia de acumulação de longo prazo que permeia todo este ecossistema.
                </p>
                <p className="text-stone-400 text-sm leading-relaxed mb-3">
                  Este conteúdo foi criado <span className="text-stone-200 font-semibold">exclusivamente como material de estudo</span>, a pedido recorrente da comunidade no Instagram. Saber ler um gráfico é uma habilidade — mas confundir leitura com previsão é o caminho mais rápido para perder capital.
                </p>
                <p className="text-stone-500 text-xs leading-relaxed italic">
                  "Quem entende o ciclo compra e espera. Quem não entende, opera e perde." — A verdadeira vantagem está na paciência, não na velocidade.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ O QUE SÃO ESSAS BARRINHAS? ══ */}
      <section className="relative z-10 py-20 md:py-28 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <BookOpen className="mx-auto text-emerald-500/40 mb-5" size={28} />
            <p className="text-emerald-400/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Para Iniciantes</p>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O que são essas <span className="text-emerald-400">barrinhas</span>?
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              Esses "gráficos de vela" — <span className="text-stone-300 font-semibold">candle charts</span> — são a representação visual mais completa do comportamento de preço de qualquer ativo. Cada vela condensa quatro informações críticas de um período em uma única barra visual.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Abertura (Abr)', detail: 'Preço no início do período', cor: '#d4af37' },
              { label: 'Fechamento (Fch)', detail: 'Preço no final do período', cor: '#34d399' },
              { label: 'Máximo (Máx)', detail: 'Pico mais alto atingido', cor: '#38bdf8' },
              { label: 'Mínimo (Mín)', detail: 'Fundo mais baixo atingido', cor: '#f43f5e' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="group text-center p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-1"
                style={{ background: `linear-gradient(135deg, ${item.cor}06, transparent 60%)` }}
              >
                <div className="w-3 h-3 rounded-full mx-auto mb-3" style={{ background: item.cor, boxShadow: `0 0 12px ${item.cor}40` }} />
                <p className="text-white font-bold text-sm mb-1">{item.label}</p>
                <p className="text-stone-600 text-xs">{item.detail}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.5} className="mt-10">
            <div className="rounded-xl border border-emerald-500/10 p-5 md:p-6" style={{ background: 'rgba(52,211,153,0.03)' }}>
              <p className="text-stone-400 text-sm leading-relaxed">
                <span className="text-emerald-400 font-bold">💡 Dica visual:</span> O "risquinho" fino acima e abaixo de cada barra é o que revela o preço máximo e mínimo do período. Mesmo numa vela vermelha (queda), o pico pode ter superado o período anterior — indicando que houve uma alta antes da queda. <span className="text-stone-300 font-semibold">Essa informação é invisível em gráficos de linha.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ IMAGEM CINEMATOGRÁFICA ══ */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            <img src={candlestickAnatomiaImg} alt="Gráfico candlestick em terminal profissional" className="w-full h-64 md:h-96 object-cover" style={{ filter: 'brightness(0.7) saturate(0.9)' }} loading="lazy" decoding="async" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,8,8,0.8) 100%)' }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-stone-400 text-xs font-mono uppercase tracking-widest">Cada vela carrega quatro dimensões do mercado</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ ANATOMIA DA VELA ══ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Fundamentos</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Anatomia de uma <span className="text-emerald-400">vela</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ANATOMIA.map((a, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="group relative rounded-2xl border border-white/[0.06] hover:border-white/[0.12] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${a.cor}08, transparent 60%)` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${a.cor}12, transparent 60%)` }} />
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div className="absolute top-0 -left-full w-full h-px group-hover:left-full transition-all duration-[1.5s] ease-in-out" style={{ background: `linear-gradient(to right, transparent, ${a.cor}40, transparent)` }} />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase mb-3 block" style={{ color: a.cor }}>0{i + 1}</span>
                  <h3 className="text-lg font-bold text-white mb-3">{a.parte}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ IDENTIFICANDO TENDÊNCIAS ══ */}
      <section className="relative z-10 py-20 md:py-28 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Leitura de Mercado</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Como identificar <span className="text-emerald-400">tendências</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-3xl">
              A principal função do gráfico é auxiliar a identificar períodos de alta (bull), lateralização (flat) e queda (bear). <span className="text-stone-300 font-semibold">Lembre-se:</span> isso depende do período analisado e pode ser diferente conforme o horizonte temporal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TENDENCIAS.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                  className="group relative rounded-2xl border border-white/[0.06] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${t.cor}08, transparent 60%)` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${t.cor}12, transparent 60%)` }} />
                  <div className="relative z-10">
                    <div className="p-2.5 rounded-xl border w-fit mb-4" style={{ background: `${t.cor}10`, borderColor: `${t.cor}25` }}>
                      <Icon size={20} style={{ color: t.cor }} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{t.tipo}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{t.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ IMAGEM PADRÕES ══ */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            <img src={candlestickPadroesImg} alt="Sala de operações com múltiplos monitores de análise gráfica" className="w-full h-64 md:h-96 object-cover" style={{ filter: 'brightness(0.65) saturate(0.85)' }} loading="lazy" decoding="async" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,8,8,0.85) 100%)' }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-stone-400 text-xs font-mono uppercase tracking-widest">Padrões se repetem porque a psicologia humana não muda</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PADRÕES ══ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Arsenal de Padrões</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              8 padrões que <span className="text-emerald-400">você precisa dominar</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PADROES.map((p, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.1}
                className="group relative rounded-2xl border border-white/[0.06] hover:border-white/[0.12] p-6 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.sinal === 'alta' ? 'rgba(52,211,153,0.04)' : p.sinal === 'baixa' ? 'rgba(239,68,68,0.04)' : 'rgba(212,175,55,0.04)'}, transparent 60%)` }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-white">{p.nome}</h3>
                    <span className={`text-[9px] font-bold tracking-[0.3em] uppercase px-2.5 py-1 rounded-md border ${
                      p.sinal === 'alta' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                      p.sinal === 'baixa' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                      'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
                    }`}>
                      {p.sinal === 'alta' ? <TrendingUp size={10} className="inline mr-1" /> : p.sinal === 'baixa' ? <TrendingDown size={10} className="inline mr-1" /> : null}
                      {p.tipo}
                    </span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDICADORES TÉCNICOS ══ */}
      <section className="relative z-10 py-20 md:py-28 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Ferramentas Avançadas</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Indicadores que <span className="text-emerald-400">complementam</span> a leitura
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-3xl">
              Candlestick sozinho mostra o passado imediato. Combinado com indicadores técnicos, revela pressão, momentum e possíveis pontos de inflexão. Estes são os três que todo analista sério utiliza.
            </p>
          </motion.div>

          <div className="space-y-6">
            {INDICADORES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                  className="group relative rounded-2xl border border-white/[0.06] hover:border-white/[0.12] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${ind.accent}06, transparent 60%)` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${ind.accent}10, transparent 60%)` }} />
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute top-0 -left-full w-full h-px group-hover:left-full transition-all duration-[1.5s] ease-in-out" style={{ background: `linear-gradient(to right, transparent, ${ind.accent}40, transparent)` }} />
                  </div>
                  <div className="relative z-10 flex items-start gap-5">
                    <div className="p-3 rounded-xl border shrink-0" style={{ background: `${ind.accent}10`, borderColor: `${ind.accent}25` }}>
                      <Icon size={22} style={{ color: ind.accent }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">{ind.titulo}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{ind.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ ERROS FATAIS ══ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <AlertTriangle className="text-red-500/40 mb-4" size={28} />
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Erros Fatais</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O que <span className="text-red-400">destrói</span> traders iniciantes
            </h2>
          </motion.div>

          <div className="space-y-6">
            {ERROS.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="group relative rounded-2xl border border-red-500/10 hover:border-red-500/20 p-6 md:p-8 transition-all duration-500 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.03), transparent 60%)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top left, rgba(239,68,68,0.04), transparent 60%)' }} />
                <div className="relative z-10">
                  <p className="text-red-400 font-bold text-sm mb-2">❌ {e.erro}</p>
                  <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">
                    <span className="text-emerald-400 font-bold">✓ Correção: </span>{e.fix}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA COM REFORÇO DE AUTOCUSTÓDIA ══ */}
      <section className="relative z-10 py-20 md:py-28 border-t border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Eye className="mx-auto text-emerald-500/40 mb-6" size={32} />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Entenda o gráfico. Mas <span className="text-emerald-400">não confunda</span> leitura com investimento.
            </h2>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
              Candlestick revela a psicologia do presente — não prevê o futuro. Saber ler um gráfico lhe confere uma grande vantagem, seja qual for o ativo ou horizonte. Mas a verdadeira soberania não está na velocidade — está na custódia.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed mb-10 max-w-xl mx-auto italic">
              "A disciplina separa o operador do apostador. A autocustódia separa o soberano do escravo."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/autocustodia" className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:gap-4">
                <Shield size={16} /> Autocustódia <ArrowRight size={16} />
              </Link>
              <Link to="/volatilidade" className="inline-flex items-center gap-3 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500">
                Volatilidade do Bitcoin <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center space-y-4">
          <div className="h-px w-32 mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(52,211,153,0.2), transparent)' }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">Conhecimento é vantagem. Custódia é soberania.</p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">Lord Junnior © 2026</p>
        </motion.div>
      </div>
    </div>
  );
}
