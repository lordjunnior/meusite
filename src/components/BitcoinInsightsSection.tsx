import React, { useEffect, useState } from 'react';
import { TrendingUp, ArrowRight, Boxes, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposedChart, Area, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const BTC_HALVING_INTERVAL = 210000;
const BTC_BLOCK_TIME_MINUTES = 10;
const BTC_MAX_SUPPLY = 21000000;
const BTC_INITIAL_SUBSIDY = 50;

interface HalvingInfo {
  date: Date;
  blockHeight: number | null;
  nextHalvingBlock: number | null;
  blocksRemaining: number | null;
  eraProgress: number; // 0-100
}

async function fetchHalvingDate(): Promise<HalvingInfo> {
  try {
    const res = await fetch('https://mempool.space/api/blocks/tip/height');
    const blockHeight = await res.json();
    const currentEra = Math.floor(blockHeight / BTC_HALVING_INTERVAL);
    const nextHalvingBlock = (currentEra + 1) * BTC_HALVING_INTERVAL;
    const blocksRemaining = nextHalvingBlock - blockHeight;
    const minutesRemaining = blocksRemaining * BTC_BLOCK_TIME_MINUTES;
    return {
      date: new Date(Date.now() + minutesRemaining * 60 * 1000),
      blockHeight,
      nextHalvingBlock,
      blocksRemaining,
      eraProgress: ((BTC_HALVING_INTERVAL - blocksRemaining) / BTC_HALVING_INTERVAL) * 100,
    };
  } catch {
    return {
      date: new Date('2028-03-26T00:00:00Z'),
      blockHeight: null,
      nextHalvingBlock: null,
      blocksRemaining: null,
      eraProgress: 0,
    };
  }
}

/* ──────── Dígito animado (rolagem vertical) ──────── */
const RollingDigit: React.FC<{ digit: string }> = ({ digit }) => (
  <span className="relative inline-block overflow-hidden h-[1em] w-[0.62em] align-bottom">
    <AnimatePresence initial={false} mode="popLayout">
      <motion.span
        key={digit}
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  </span>
);

/* ──────── Valor com contagem animada ──────── */
const CountUpBRL: React.FC<{ value: number | null; className?: string }> = ({ value, className }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === null) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  if (value === null) return <span className={className}>—</span>;
  return (
    <span className={className}>
      {display.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}
    </span>
  );
};

/* ──────── Tooltip cinematográfico ──────── */
const CinemaTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const sorted = [...payload].sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  return (
    <div className="rounded-sm border border-primary/25 bg-background/90 backdrop-blur-xl px-4 py-3 shadow-[0_0_40px_rgba(247,147,26,0.15)]">
      <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">{label}</p>
      <div className="space-y-1">
        {sorted.map((p: any) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-6 text-xs font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color || p.stroke }} />
              <span className={p.dataKey === 'BTC' ? 'text-foreground font-black' : 'text-muted-foreground'}>
                {p.dataKey}
              </span>
            </span>
            <span className={`tabular-nums font-bold ${(p.value ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {(p.value ?? 0) > 0 ? '+' : ''}{Number(p.value ?? 0).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};



/* ──────── CONSTANTS ──────── */

const ROI_PERIODS = [
  { label: '1 Mês', days: 30 },
  { label: '3 Meses', days: 90 },
  { label: '1 Ano', days: 365 },
  { label: '2 Anos', days: 730 },
  { label: '5 Anos', days: 1825 },
];

const ASSETS = ['BTC', 'ETH', 'BNB', 'DOGE', 'XRP', 'CDI', 'IPCA'] as const;
type Asset = typeof ASSETS[number];

const COINGECKO_IDS: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  BNB: 'binancecoin',
  DOGE: 'dogecoin',
  XRP: 'ripple',
};

const ASSET_COLORS: Record<Asset, string> = {
  BTC: '#f7931a',
  ETH: '#627eea',
  BNB: '#f3ba2f',
  DOGE: '#c2a633',
  XRP: '#00aae4',
  CDI: '#8884d8',
  IPCA: '#d4a017',
};

const PERIOD_OPTIONS = [
  { label: '1 ANO', days: 365 },
  { label: '5 ANOS', days: 1825 },
  { label: '10 ANOS', days: 3650 },
];

const FIXED_ANNUAL: Record<string, number> = { CDI: 11.5, IPCA: 5.0 };

/* ──────── FALLBACK DATA ──────── */

const FALLBACK_ROI = [
  { label: '1 Mês', value: -8.12 },
  { label: '3 Meses', value: -15.34 },
  { label: '1 Ano', value: 42.67 },
  { label: '2 Anos', value: 118.45 },
  { label: '5 Anos', value: 285.30 },
];

const FALLBACK_COMPARISON: Record<number, Record<string, number>> = {
  0: { BTC: 1426.80, ETH: 1102.50, BNB: 1345.20, DOGE: 980.40, XRP: 1210.90, CDI: 1115.00, IPCA: 1050.00 },
  1: { BTC: 2853.60, ETH: 1266.80, BNB: 2529.40, DOGE: 1750.00, XRP: 2995.80, CDI: 1723.50, IPCA: 1276.28 },
  2: { BTC: 8150.20, ETH: 3420.10, BNB: 5830.50, DOGE: 2640.30, XRP: 4210.60, CDI: 2970.80, IPCA: 1628.89 },
};

// Generate fallback chart data for each period
const generateFallbackChart = (periodIdx: number): Record<string, any>[] => {
  const months = [12, 60, 120][periodIdx];
  const data: Record<string, any>[] = [];
  const now = new Date();

  for (let i = 0; i <= months; i += Math.max(1, Math.floor(months / 50))) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - (months - i));
    const label = `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getFullYear()).slice(-2)}`;
    const progress = i / months;

    // Simulate different growth curves per asset
    const btcCurve = (Math.pow(progress, 1.3) * 300 - 50) + Math.sin(progress * 12) * 80;
    const ethCurve = (Math.pow(progress, 1.1) * 150 - 30) + Math.sin(progress * 10) * 60;
    const bnbCurve = (Math.pow(progress, 1.2) * 200 - 20) + Math.sin(progress * 8) * 50;
    const dogeCurve = (Math.pow(progress, 0.9) * 120 - 40) + Math.sin(progress * 15) * 90;
    const xrpCurve = (Math.pow(progress, 1.4) * 250 - 30) + Math.sin(progress * 7) * 70;
    const yrs = (i / 12);
    const cdiCurve = (Math.pow(1 + 0.115, yrs) - 1) * 100;
    const ipcaCurve = (Math.pow(1 + 0.05, yrs) - 1) * 100;

    data.push({
      date: label,
      BTC: Number(btcCurve.toFixed(2)),
      ETH: Number(ethCurve.toFixed(2)),
      BNB: Number(bnbCurve.toFixed(2)),
      DOGE: Number(dogeCurve.toFixed(2)),
      XRP: Number(xrpCurve.toFixed(2)),
      CDI: Number(cdiCurve.toFixed(2)),
      IPCA: Number(ipcaCurve.toFixed(2)),
    });
  }
  return data;
};

/* ──────── HELPER: fetch with retry ──────── */
const fetchWithRetry = async (url: string, retries = 2, delayMs = 1500): Promise<Response> => {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 429 && i < retries) {
        await new Promise(r => setTimeout(r, delayMs * (i + 1)));
        continue;
      }
      return res;
    } catch (e) {
      if (i === retries) throw e;
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw new Error('Fetch failed');
};

/* ──────── COMPONENT ──────── */

const BitcoinInsightsSection: React.FC = () => {
  // --- BLOCK 1: Comparison ---
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [comparisonValues, setComparisonValues] = useState<Record<string, number | null>>(FALLBACK_COMPARISON[1]);
  const [chartData, setChartData] = useState<Record<string, any>[]>(generateFallbackChart(1));
  const [loadingComparison, setLoadingComparison] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  // --- BLOCK 2: ROI ---
  const [roiData, setRoiData] = useState<{ label: string; value: number | null }[]>(FALLBACK_ROI);
  const [loadingRoi, setLoadingRoi] = useState(true);

  // --- BLOCK 3: Halving ---
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [halving, setHalving] = useState<HalvingInfo | null>(null);
  const halvingDate = halving?.date ?? null;

  // ═══ Fetch comparison data ═══
  useEffect(() => {
    const fetchComparison = async () => {
      setLoadingComparison(true);
      const period = PERIOD_OPTIONS[selectedPeriod];
      const finalValues: Record<string, number | null> = {};
      const allPrices: Record<string, [number, number][]> = {};
      let anySuccess = false;

      // Fetch crypto assets with staggered timing to avoid rate limits
      const cryptoEntries = Object.entries(COINGECKO_IDS);
      for (let idx = 0; idx < cryptoEntries.length; idx++) {
        const [symbol, id] = cryptoEntries[idx];
        try {
          if (idx > 0) await new Promise(r => setTimeout(r, 300)); // stagger requests
          const res = await fetchWithRetry(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=brl&days=${period.days}&interval=daily`
          );
          const data = await res.json();
          if (data.prices && data.prices.length > 0) {
            allPrices[symbol] = data.prices;
            const oldPrice = data.prices[0][1];
            const newPrice = data.prices[data.prices.length - 1][1];
            finalValues[symbol] = 1000 * (1 + ((newPrice - oldPrice) / oldPrice));
            anySuccess = true;
          } else {
            finalValues[symbol] = null;
          }
        } catch {
          finalValues[symbol] = null;
        }
      }

      // CDI & IPCA
      const years = period.days / 365;
      for (const [key, rate] of Object.entries(FIXED_ANNUAL)) {
        finalValues[key] = 1000 * Math.pow(1 + rate / 100, years);
      }

      if (!anySuccess) {
        // Use fallback data
        setComparisonValues(FALLBACK_COMPARISON[selectedPeriod] || FALLBACK_COMPARISON[1]);
        setChartData(generateFallbackChart(selectedPeriod));
        setUsingFallback(true);
      } else {
        setComparisonValues(finalValues);
        setUsingFallback(false);

        // Build chart from real data
        const btcPrices = allPrices['BTC'];
        if (btcPrices && btcPrices.length > 0) {
          const step = Math.max(1, Math.floor(btcPrices.length / 50));
          const points: Record<string, any>[] = [];

          for (let i = 0; i < btcPrices.length; i += step) {
            const timestamp = btcPrices[i][0];
            const date = new Date(timestamp);
            const label = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)}`;
            const point: Record<string, any> = { date: label };

            for (const [symbol, prices] of Object.entries(allPrices)) {
              const closestIdx = Math.min(i, prices.length - 1);
              if (prices[closestIdx] && prices[0]) {
                point[symbol] = Number(((prices[closestIdx][1] - prices[0][1]) / prices[0][1] * 100).toFixed(2));
              }
            }

            const daysSinceStart = (timestamp - btcPrices[0][0]) / (1000 * 60 * 60 * 24);
            const yrs = daysSinceStart / 365;
            point['CDI'] = Number(((Math.pow(1 + 0.115, yrs) - 1) * 100).toFixed(2));
            point['IPCA'] = Number(((Math.pow(1 + 0.05, yrs) - 1) * 100).toFixed(2));

            points.push(point);
          }
          setChartData(points);
        } else {
          setChartData(generateFallbackChart(selectedPeriod));
        }
      }

      setLoadingComparison(false);
    };
    fetchComparison();
  }, [selectedPeriod]);

  // ═══ Fetch ROI data ═══
  useEffect(() => {
    const fetchRoi = async () => {
      setLoadingRoi(true);
      try {
        const currentRes = await fetchWithRetry('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
        const currentData = await currentRes.json();
        const currentPrice = currentData?.bitcoin?.brl;
        if (!currentPrice) throw new Error('No price');

        const results: { label: string; value: number | null }[] = [];

        for (let idx = 0; idx < ROI_PERIODS.length; idx++) {
          const period = ROI_PERIODS[idx];
          try {
            if (idx > 0) await new Promise(r => setTimeout(r, 300));
            const res = await fetchWithRetry(
              `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=brl&days=${period.days}&interval=daily`
            );
            const data = await res.json();
            if (data.prices && data.prices.length > 0) {
              const oldPrice = data.prices[0][1];
              results.push({ label: period.label, value: ((currentPrice - oldPrice) / oldPrice) * 100 });
            } else {
              results.push({ label: period.label, value: FALLBACK_ROI[idx].value });
            }
          } catch {
            results.push({ label: period.label, value: FALLBACK_ROI[idx].value });
          }
        }

        setRoiData(results);
      } catch {
        setRoiData(FALLBACK_ROI);
      } finally {
        setLoadingRoi(false);
      }
    };
    fetchRoi();
  }, []);

  // ═══ Halving ═══
  useEffect(() => {
    fetchHalvingDate().then(setHalving);
    const id = setInterval(() => { fetchHalvingDate().then(setHalving); }, 120000);
    return () => clearInterval(id);
  }, []);


  useEffect(() => {
    if (!halvingDate) return;
    const calc = () => {
      const diff = +halvingDate - +new Date();
      if (diff > 0) {
        return {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };
    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [halvingDate]);

  /* ──────── Helpers ──────── */
  const formatBRL = (val: number | null) => {
    if (val === null) return '—';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
  };

  const getRoiColor = (val: number | null) => val === null ? 'text-muted-foreground' : val >= 0 ? 'text-green-500' : 'text-red-500';
  const getRoiBorderColor = (val: number | null) => val === null ? 'border-l-border' : val >= 0 ? 'border-l-green-500' : 'border-l-red-500';

  const units = [
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  const formattedDate = halvingDate
    ? halvingDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  return (
    <div className="section-padding">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ═══════════════════════════════════════════════════════
            BLOCO 1: COMPARAÇÃO DE BTC COM AS PRINCIPAIS MOEDAS
            ═══════════════════════════════════════════════════════ */}
        <div className="card-wealth overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                <TrendingUp className="text-primary w-4 h-4" />
              </div>
              <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.15em] font-mono">
                Comparação de BTC com as Principais Moedas
              </h3>
            </div>
            <div className="flex items-center gap-1">
              {PERIOD_OPTIONS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setSelectedPeriod(i)}
                  className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider transition-all border-b-2 ${
                    selectedPeriod === i
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {loadingComparison ? (
            <div className="text-muted-foreground font-mono text-sm animate-pulse text-center py-16">
              Carregando dados de mercado...
            </div>
          ) : (
            <>
              {/* Chart */}
              {chartData.length > 0 && (
                <div className="w-full h-[280px] md:h-[360px] mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fill: 'hsl(215 15% 55%)' }}
                        tickLine={false}
                        axisLine={{ stroke: 'hsl(220 20% 12%)' }}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: 'hsl(215 15% 55%)' }}
                        tickLine={false}
                        axisLine={{ stroke: 'hsl(220 20% 12%)' }}
                        tickFormatter={(v) => `${v.toFixed(0)}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(222 47% 6%)',
                          border: '1px solid hsl(220 20% 16%)',
                          borderRadius: '2px',
                          fontSize: 11,
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                        labelStyle={{ color: 'hsl(210 40% 98%)' }}
                        formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]}
                      />
                      <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }} />
                      {ASSETS.map((asset) => (
                        <Line
                          key={asset}
                          type="monotone"
                          dataKey={asset}
                          stroke={ASSET_COLORS[asset]}
                          dot={false}
                          strokeWidth={asset === 'BTC' ? 2.5 : 1.5}
                          connectNulls
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Text with toggle */}
              <p className="text-center text-sm font-mono text-muted-foreground mb-6">
                Se você tivesse investido <strong className="text-foreground">R$ 1.000,00</strong> há{' '}
                <button
                  className="text-primary underline underline-offset-2 font-bold"
                  onClick={() => setSelectedPeriod((selectedPeriod + 1) % PERIOD_OPTIONS.length)}
                >
                  {PERIOD_OPTIONS[selectedPeriod].label.toLowerCase()}
                </button>
                , hoje você teria:
              </p>

              {/* Asset rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ASSETS.map((asset) => {
                  const val = comparisonValues[asset] ?? null;
                  return (
                    <div key={asset} className="flex items-center gap-3 border border-border rounded-sm p-3 bg-background">
                      <span
                        className="text-[10px] font-black font-mono px-2.5 py-1 rounded-sm text-background min-w-[48px] text-center"
                        style={{ backgroundColor: ASSET_COLORS[asset] }}
                      >
                        {asset}
                      </span>
                      <span className="text-xs md:text-sm font-mono text-muted-foreground">
                        R$ 1.000,00 em {asset} você teria{' '}
                        <strong className="text-foreground">{formatBRL(val)}</strong>
                      </span>
                    </div>
                  );
                })}
              </div>

              {usingFallback && (
                <p className="text-[10px] text-muted-foreground/50 font-mono text-center mt-4">
                  * Dados aproximados — API temporariamente indisponível
                </p>
              )}
            </>
          )}
        </div>

        {/* ═══════════════════════════════════════════════
            BLOCO 2: RETORNO DO INVESTIMENTO EM BITCOIN
            ═══════════════════════════════════════════════ */}
        <div className="card-wealth">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
              <TrendingUp className="text-primary w-4 h-4" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-[0.15em] font-mono">
              Retorno do Investimento em Bitcoin
            </h3>
          </div>

          {loadingRoi ? (
            <div className="text-muted-foreground font-mono text-sm animate-pulse text-center py-8">
              Carregando dados de mercado...
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {roiData.map((item) => (
                <div
                  key={item.label}
                  className={`border border-border ${getRoiBorderColor(item.value)} border-l-4 bg-background rounded-sm p-4 md:p-5 text-center transition-all hover:scale-[1.02]`}
                >
                  <span className={`text-lg md:text-xl font-black font-mono block ${getRoiColor(item.value)}`}>
                    {item.value !== null ? `${item.value > 0 ? '+' : ''}${item.value.toFixed(2)}%` : '—'}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mt-1 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════
            BLOCO 3: CONTAGEM REGRESSIVA - HALVING
            ═══════════════════════════════════════════════ */}
        <div className="card-wealth text-center space-y-8 relative overflow-hidden">
          {/* pulso de fundo */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary)/0.10), transparent 65%)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] font-mono font-black mb-2">
              Contagem regressiva para o
            </p>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Halving do Bitcoin
            </h3>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
            {units.map((u) => (
              <motion.div
                key={u.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative border border-primary/20 bg-card rounded-sm p-6 md:p-8 overflow-hidden"
              >
                {u.label === 'Segundos' && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 bg-primary/5"
                    animate={{ opacity: [0, 0.9, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <span className="relative text-5xl md:text-7xl font-black text-primary tabular-nums font-mono flex justify-center leading-none">
                  {u.value.toString().padStart(2, '0').split('').map((d, i) => (
                    <RollingDigit key={`${u.label}-${i}`} digit={d} />
                  ))}
                </span>
                <span className="relative text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-mono mt-2 block">
                  {u.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* barra de progresso do ciclo atual */}
          <div className="relative max-w-3xl mx-auto text-left">
            <div className="flex items-center justify-between text-[10px] md:text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
              <span className="inline-flex items-center gap-2">
                <Boxes className="w-3.5 h-3.5 text-primary" />
                Ciclo atual minerado
              </span>
              <span className="text-foreground font-black tabular-nums">
                {halving ? `${halving.eraProgress.toFixed(2)}%` : '—'}
              </span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${halving?.eraProgress ?? 0}%` }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
              {[
                { label: 'Bloco atual', value: halving?.blockHeight?.toLocaleString('pt-BR') ?? '—' },
                { label: 'Bloco do halving', value: halving?.nextHalvingBlock?.toLocaleString('pt-BR') ?? '—' },
                { label: 'Blocos restantes', value: halving?.blocksRemaining?.toLocaleString('pt-BR') ?? '—' },
              ].map((item) => (
                <div key={item.label} className="border border-border bg-background rounded-sm p-3">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={item.value}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                      className="block text-lg font-black font-mono tabular-nums text-foreground"
                    >
                      {item.value}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-muted-foreground text-sm font-mono inline-flex items-center gap-2 justify-center">
            <Timer className="w-4 h-4 text-primary" />
            Data estimada: <strong className="text-foreground">{formattedDate}</strong>
          </p>


          <Link
            to="/halving-bitcoin"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors group"
          >
            <span>Saiba mais</span>
            <ArrowRight className="w-4 h-4 group-hover:text-primary transition-colors" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BitcoinInsightsSection;
