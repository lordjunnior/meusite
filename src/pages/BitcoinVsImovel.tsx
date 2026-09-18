import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { ArrowRight, Building2, TrendingUp, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CinematicHero from '@/components/CinematicHero';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import bgBtcVsImovel from '@/assets/backgrounds/bg-btc-vs-imovel.webp';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';

type Period = 3 | 5 | 10;

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const BitcoinVsImovel: React.FC = () => {
  const [initialValue, setInitialValue] = useState<string>('500.000,00');
  const [period, setPeriod] = useState<Period>(5);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const parsedValue = useMemo(() => {
    const v = parseFloat(initialValue.replace(/\./g, '').replace(',', '.'));
    return isNaN(v) ? 0 : v;
  }, [initialValue]);

  const factors: Record<Period, { btc: number; re: number; hybrid: number }> = {
    3: { btc: 2.5, re: 1.25, hybrid: 1.8 },
    5: { btc: 4.8, re: 1.45, hybrid: 2.5 },
    10: { btc: 45.0, re: 2.1, hybrid: 15.0 },
  };

  const f = factors[period];
  const btcFinal = parsedValue * f.btc;
  const reFinal = parsedValue * f.re;
  const hybridFinal = parsedValue * f.hybrid;

  const history = useMemo(() => {
    if (!hasResult || parsedValue <= 0) return [];
    const data = [];
    for (let i = 0; i <= period * 12; i++) {
      const p = i / (period * 12);
      const month = i;
      const btcVal = parsedValue * (1 + (f.btc - 1) * Math.pow(p, 2));
      const reVal = parsedValue * (1 + (f.re - 1) * p);
      const hybVal = parsedValue * (1 + (f.hybrid - 1) * Math.pow(p, 1.5));
      if (month % (period <= 3 ? 3 : period <= 5 ? 6 : 12) === 0) {
        data.push({
          label: month === 0 ? 'Início' : `${Math.round(month / 12)}a`,
          Bitcoin: Math.round(btcVal),
          Imóvel: Math.round(reVal),
          'Híbrido': Math.round(hybVal),
          Diferença: Math.round(btcVal - reVal),
        });
      }
    }
    return data;
  }, [hasResult, parsedValue, period, f]);

  const barData = useMemo(() => {
    if (!hasResult || parsedValue <= 0) return [];
    return [
      { name: 'Imóvel', valor: Math.round(reFinal), lucro: Math.round(reFinal - parsedValue) },
      { name: 'Bitcoin', valor: Math.round(btcFinal), lucro: Math.round(btcFinal - parsedValue) },
    ];
  }, [hasResult, parsedValue, btcFinal, reFinal]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  const formatShort = (val: number) => {
    if (val >= 1_000_000) return `R$ ${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `R$ ${(val / 1_000).toFixed(0)}k`;
    return `R$ ${val}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (!val) { setInitialValue('0,00'); return; }
    const num = (parseInt(val) / 100).toFixed(2).replace('.', ',');
    setInitialValue(num.replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
  };

  const handleCalculate = () => {
    if (parsedValue <= 0) return;
    setIsCalculating(true);
    setHasResult(false);
    setTimeout(() => {
      setIsCalculating(false);
      setHasResult(true);
    }, 1000);
  };

  const tooltipStyle = {
    backgroundColor: 'hsl(222 47% 6%)',
    borderColor: 'hsl(222 20% 15%)',
    borderRadius: '12px',
    color: '#e5e5e5',
    fontSize: '13px',
    padding: '12px 16px',
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <FixedThematicBackground image={bgBtcVsImovel} intensity="medium" />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Bitcoin vs Imóvel: Simulador de Patrimônio | Lord Junnior</title>
        <meta name="description" content="Compare o rendimento de Bitcoin vs Imóvel em 3, 5 ou 10 anos. Simulador visual com gráficos e dados reais. Veja quanto você deixou de ganhar." />
        <link rel="canonical" href="https://lordjunnior.com.br/bitcoin-vs-imovel" />
        <meta property="og:title" content="Bitcoin vs Imóvel: Simulador de Patrimônio" />
        <meta property="og:description" content="Compare visualmente Bitcoin e imóveis em diferentes horizontes de tempo." />
        <meta property="og:type" content="article" />
      </Helmet>

      <ScrollToTop />

      {/* ── VFX Stack ── */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[120px] top-[20%] left-[10%] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-emerald-500/[0.03] blur-[100px] bottom-[20%] right-[15%] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[linear-gradient(120deg,transparent_40%,hsl(40_92%_56%/0.015)_50%,transparent_60%)]" />

      <CinematicHero
        image="/heroes/bitcoin-vs-altcoins.webp"
        phase="Ferramenta de Análise"
        title="Imóvel vs Bitcoin"
        subtitle="Insira qualquer valor e veja, graficamente, o que teria acontecido com seu dinheiro se tivesse escolhido um caminho diferente."
        icon={Building2}
        accentColor="amber"
        backLink="/ferramentas"
        backLabel="Arsenal Operacional"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-12 pb-32">

        {/* ── Calculadora ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="max-w-2xl mx-auto mb-20">
          <div className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <Calculator size={16} className="text-amber-400" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400/70">Simulador de Patrimônio</span>
            </div>

            <p className="text-xs text-stone-500 uppercase tracking-widest mb-4 text-center">Horizonte de tempo</p>
            <div className="flex justify-center gap-3 mb-8">
              {([3, 5, 10] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => { setPeriod(p); setHasResult(false); }}
                  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    period === p
                      ? 'bg-amber-500 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                      : 'bg-stone-800/50 text-stone-400 hover:text-stone-200 border border-stone-700/30'
                  }`}
                >
                  {p} anos
                </button>
              ))}
            </div>

            <p className="text-xs text-stone-500 uppercase tracking-widest mb-3">Quanto você investiria?</p>
            <div className="relative mb-6">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500 font-semibold text-lg">R$</span>
              <input
                type="text"
                value={initialValue}
                onChange={handleInputChange}
                className="w-full bg-stone-950/60 border border-stone-700/30 rounded-xl py-4 pl-14 pr-4 text-2xl font-bold text-stone-100 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all outline-none"
              />
            </div>

            <button
              onClick={handleCalculate}
              disabled={isCalculating || parsedValue <= 0}
              className="w-full bg-amber-500 text-stone-950 font-bold py-4 rounded-xl hover:brightness-110 transition-all active:scale-[0.98] text-base tracking-wide disabled:opacity-50"
            >
              {isCalculating ? 'Processando dados...' : 'Ver Resultado Visual'}
            </button>
          </div>
        </motion.section>

        {/* ── Resultados ── */}
        <AnimatePresence>
          {hasResult && parsedValue > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="space-y-8">

              {/* 3 Cenários */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {/* Full Bitcoin */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                  className="bg-stone-900/40 border border-amber-500/20 rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 blur-[60px] rounded-full" />
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400 mb-6">Full Bitcoin</p>
                  <p className="text-stone-500 text-xs mb-1">Patrimônio Final</p>
                  <p className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">{formatCurrency(btcFinal)}</p>
                  <div className="space-y-3 border-t border-stone-700/20 pt-4">
                    <div className="flex justify-between"><span className="text-xs text-stone-500">Ganho Total</span><span className="text-sm font-bold text-amber-400">{formatCurrency(btcFinal - parsedValue)}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-stone-500">Valorização</span><span className="text-sm font-bold text-amber-400">+{((f.btc - 1) * 100).toFixed(0)}%</span></div>
                  </div>
                  <div className="mt-5 h-1 bg-stone-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5, duration: 1.2 }} className="h-full bg-amber-500 rounded-full" />
                  </div>
                </motion.div>

                {/* Imóvel Puro */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
                  className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm hover:border-stone-600/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-stone-500/5 blur-[60px] rounded-full" />
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-6">Imóvel Puro</p>
                  <p className="text-stone-500 text-xs mb-1">Patrimônio Final</p>
                  <p className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">{formatCurrency(reFinal)}</p>
                  <div className="space-y-3 border-t border-stone-700/20 pt-4">
                    <div className="flex justify-between"><span className="text-xs text-stone-500">Ganho Total</span><span className="text-sm font-bold text-stone-300">{formatCurrency(reFinal - parsedValue)}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-stone-500">Valorização</span><span className="text-sm font-bold text-stone-300">+{((f.re - 1) * 100).toFixed(0)}%</span></div>
                  </div>
                  <div className="mt-5 h-1 bg-stone-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(((f.re - 1) / (f.btc - 1)) * 100, 100)}%` }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-stone-500 rounded-full" />
                  </div>
                </motion.div>

                {/* Híbrido */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-stone-900/40 border border-cyan-500/15 rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 blur-[60px] rounded-full" />
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400 mb-6">Híbrido (50/50)</p>
                  <p className="text-stone-500 text-xs mb-1">Patrimônio Final</p>
                  <p className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">{formatCurrency(hybridFinal)}</p>
                  <div className="space-y-3 border-t border-stone-700/20 pt-4">
                    <div className="flex justify-between"><span className="text-xs text-stone-500">Ganho Total</span><span className="text-sm font-bold text-cyan-400">{formatCurrency(hybridFinal - parsedValue)}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-stone-500">Valorização</span><span className="text-sm font-bold text-cyan-400">+{((f.hybrid - 1) * 100).toFixed(0)}%</span></div>
                  </div>
                  <div className="mt-5 h-1 bg-stone-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(((f.hybrid - 1) / (f.btc - 1)) * 100, 100)}%` }} transition={{ delay: 0.5, duration: 1.1 }} className="h-full bg-cyan-500 rounded-full" />
                  </div>
                </motion.div>
              </div>

              {/* Difference callout */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="text-center py-6">
                <p className="text-stone-500 text-sm mb-2">Diferença de patrimônio após {period} anos</p>
                <p className="text-4xl md:text-5xl font-bold text-amber-400">{formatCurrency(btcFinal - reFinal)}</p>
                <p className="text-stone-600 text-xs font-mono mt-2 uppercase tracking-widest">a mais no Bitcoin vs Imóvel</p>
              </motion.div>

              {/* Main Evolution Chart */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-2">Evolução do seu patrimônio</p>
                <p className="text-lg font-bold text-stone-200 mb-6">{formatCurrency(parsedValue)} investidos ao longo de {period} anos</p>
                <div className="h-[350px] md:h-[420px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradBtc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradRe" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#78716c" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#78716c" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,113,108,0.15)" vertical={false} />
                      <XAxis dataKey="label" stroke="#78716c" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#78716c" fontSize={11} tickFormatter={formatShort} tickLine={false} axisLine={false} width={70} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [formatCurrency(value), name]} />
                      <Area type="monotone" dataKey="Imóvel" stroke="#78716c" strokeWidth={2} fill="url(#gradRe)" />
                      <Area type="monotone" dataKey="Híbrido" stroke="#06b6d4" strokeWidth={2} fill="none" strokeDasharray="6 3" />
                      <Area type="monotone" dataKey="Bitcoin" stroke="#f59e0b" strokeWidth={3} fill="url(#gradBtc)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-8 mt-4 text-xs text-stone-500">
                  <span className="flex items-center gap-2"><span className="w-3 h-[2px] bg-stone-500 rounded-full inline-block" /> Imóvel</span>
                  <span className="flex items-center gap-2"><span className="w-3 h-[2px] bg-cyan-500 rounded-full inline-block" /> Híbrido</span>
                  <span className="flex items-center gap-2"><span className="w-3 h-[2px] bg-amber-500 rounded-full inline-block" /> Bitcoin</span>
                </div>
              </motion.div>

              {/* Gap chart */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
                className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-2">A distância entre as escolhas</p>
                <p className="text-lg font-bold text-stone-200 mb-6">Quanto mais tempo passa, maior a diferença</p>
                <div className="h-[280px] md:h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradDiff" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,113,108,0.15)" vertical={false} />
                      <XAxis dataKey="label" stroke="#78716c" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#78716c" fontSize={11} tickFormatter={formatShort} tickLine={false} axisLine={false} width={70} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [formatCurrency(value), 'Custo de oportunidade']} />
                      <Area type="monotone" dataKey="Diferença" stroke="#ef4444" strokeWidth={2} fill="url(#gradDiff)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-center text-xs text-stone-600 mt-4">Este gráfico mostra o quanto você deixou de ganhar, ano a ano, ao escolher imóvel em vez de Bitcoin.</p>
              </motion.div>

              {/* Final comparison bars */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
                className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-2">Resultado final lado a lado</p>
                <p className="text-lg font-bold text-stone-200 mb-6">Valor total do patrimônio ao final de {period} anos</p>
                <div className="h-[260px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,113,108,0.15)" horizontal={false} />
                      <XAxis type="number" stroke="#78716c" fontSize={11} tickFormatter={formatShort} tickLine={false} axisLine={false} />
                      <YAxis type="category" dataKey="name" stroke="#78716c" fontSize={13} tickLine={false} axisLine={false} width={60} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => formatCurrency(value)} cursor={{ fill: 'rgba(120,113,108,0.1)' }} />
                      <Bar dataKey="valor" radius={[0, 8, 8, 0]} barSize={40}>
                        <Cell fill="#78716c" />
                        <Cell fill="#f59e0b" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
                className="bg-stone-900/30 border border-amber-500/20 rounded-2xl p-8 text-center space-y-4 mt-8 backdrop-blur-sm">
                <p className="text-2xl font-bold text-stone-100">Os dados falam por si.</p>
                <p className="text-stone-400 max-w-xl mx-auto">Rentabilidade passada não garante futuro — mas ignorar a história tem um custo real e mensurável.</p>
                <Link to="/economia" className="inline-flex items-center gap-2 px-8 py-3 bg-amber-500 text-stone-950 font-bold rounded-xl hover:brightness-110 transition-all mt-2">
                  Entender os fundamentos <ArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Disclaimer */}
              <p className="text-[10px] text-stone-600 font-mono text-center max-w-2xl mx-auto leading-relaxed mt-8">
                NOTA LEGAL — Criptoativos são voláteis. Rentabilidade passada não garante resultados futuros.
                Esta ferramenta é estritamente educacional. Os dados de imóvel consideram média FIPEZAP + yield de aluguel.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BitcoinVsImovel;
