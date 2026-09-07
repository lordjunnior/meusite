import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { fadeUp, stagger, staggerChild, viewportOnce, ease } from "@/lib/motion";

const purchasingPowerData = [
  { year: "1994", value: 100 },
  { year: "1998", value: 82 },
  { year: "2002", value: 45 },
  { year: "2006", value: 55 },
  { year: "2008", value: 50 },
  { year: "2010", value: 48 },
  { year: "2012", value: 40 },
  { year: "2014", value: 32 },
  { year: "2016", value: 22 },
  { year: "2018", value: 20 },
  { year: "2020", value: 15 },
  { year: "2022", value: 12 },
  { year: "2024", value: 10 },
  { year: "2026", value: 8 },
];

const useCountUp = (target: number, active: boolean, duration = 1800, delay = 0) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let start = 0;
    const timer = window.setTimeout(() => {
      const tick = (t: number) => {
        if (!start) start = t;
        const p = Math.min((t - start) / duration, 1);
        setValue(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, active, duration, delay]);
  return value;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const v = payload[0].value as number;
    return (
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: ease.sovereign }}
        className="rounded-xl border border-chart-red/40 bg-background/85 backdrop-blur-xl px-4 py-3 shadow-[0_24px_70px_-20px_hsl(0_72%_51%/0.45)]"
      >
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">{label}</p>
        <p className="text-chart-red font-mono text-2xl font-bold leading-none tabular-nums">{v}%</p>
        <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-chart-red/15">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${v}%` }}
            transition={{ duration: 0.5, ease: ease.sovereign }}
            className="h-full rounded-full bg-chart-red"
          />
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">
          do poder de compra original · perda de {100 - v}%
        </p>
      </motion.div>
    );
  }
  return null;
};

const PulseDot = (props: any) => {
  const { cx, cy } = props;
  if (cx == null || cy == null) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill="hsl(0 72% 51%)" opacity={0.18}>
        <animate attributeName="r" values="6;13;6" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.28;0;0.28" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={5.5} fill="hsl(0 72% 60%)" stroke="hsl(0 72% 82%)" strokeWidth={2} />
    </g>
  );
};

const RANGES = [
  { id: "all", label: "1994 — 2026", from: 0 },
  { id: "20y", label: "ÚLTIMOS 20 ANOS", from: 3 },
  { id: "10y", label: "ÚLTIMA DÉCADA", from: 8 },
] as const;

const ManifestoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportOnce);
  const [rangeId, setRangeId] = useState<(typeof RANGES)[number]["id"]>("all");
  const range = RANGES.find((r) => r.id === rangeId)!;
  const data = purchasingPowerData.slice(range.from);
  const first = data[0].value;
  const last = data[data.length - 1].value;
  const lossTarget = Math.round(((first - last) / first) * 100);
  const loss = useCountUp(lossTarget, isInView, 1400, 0.2);



  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Manifesto Text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mb-14"
        >
          <p className="pre-title">MANIFESTO</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Por que este site <span className="text-gradient-gold">existe</span>?
          </h2>
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg"
          >
            <motion.p variants={staggerChild}>
              O sistema monetário é uma fraude. A educação formal é propaganda. A mídia
              tradicional é manipulação sistemática da realidade. Isso não é teoria da
              conspiração — é matemática, história e economia documentada.
            </motion.p>
            <motion.p variants={staggerChild}>
              Bancos centrais criam dinheiro do nada e transferem riqueza de quem trabalha
              para quem controla a emissão. Universidades produzem conformidade intelectual,
              não pensamento crítico.
            </motion.p>
            <motion.p variants={staggerChild} className="text-foreground font-medium">
              Este arsenal existe para compartilhar conhecimento sistematicamente escondido
              por responsabilidade com quem ainda consegue pensar.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: ease.sovereign }}
          className="relative overflow-hidden rounded-3xl border border-chart-red/20 bg-[#0a0a0c] p-4 md:p-8 shadow-[0_40px_120px_-40px_hsl(0_72%_51%/0.35)]"
        >
          {/* top line + ambient */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chart-red/60 to-transparent" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-[440px] w-[440px] bg-[radial-gradient(circle,hsl(0_72%_51%/0.13)_0%,transparent_70%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(0 72% 51%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 72% 51%) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse at 50% 50%, black 15%, transparent 78%)",
            }}
          />
          <motion.div
            initial={{ x: "-120%" }}
            animate={isInView ? { x: "150%" } : {}}
            transition={{ duration: 2.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-chart-red/10 to-transparent"
          />

          <div className="relative mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="pre-title mb-1">VISUALIZAÇÃO DE DADOS</p>
                <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight">
                  DESTRUIÇÃO DO PODER DE COMPRA{" "}
                  <span className="text-muted-foreground">(BRL/USD vs. TEMPO)</span>
                </h3>
              </div>
              <div className="text-right shrink-0">
                <p
                  className="font-mono text-3xl md:text-5xl font-bold text-chart-red leading-none tabular-nums"
                  style={{ textShadow: "0 0 40px hsl(0 72% 51% / 0.5)" }}
                >
                  -{Math.round(loss)}%
                </p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 mt-1">
                  1994 — 2026
                </p>
              </div>
            </div>

            {/* Frase-anzol — PNL */}
            <div className="relative border-l-2 border-chart-red/50 pl-4 py-2 bg-chart-red/[0.05] rounded-r-md">
              <p className="text-sm md:text-base text-foreground/85 leading-relaxed">
                <span className="text-chart-red font-bold">R$ 100 em 1994</span> comprava o que hoje custa{" "}
                <span className="text-chart-red font-bold">R$ 1.250</span>. Seu salário subiu na mesma proporção?
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                O gráfico abaixo mostra o que o Estado fez com cada real no seu bolso.
              </p>
            </div>
          </div>

          <div className="relative h-[320px] md:h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={purchasingPowerData} margin={{ top: 16, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="decayFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0 72% 51%)" stopOpacity={0.55} />
                    <stop offset="55%" stopColor="hsl(0 72% 51%)" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="hsl(0 72% 51%)" stopOpacity={0} />
                  </linearGradient>
                  <filter id="decayGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="2 6" stroke="hsl(0 30% 30% / 0.25)" vertical={false} />
                <XAxis
                  dataKey="year"
                  stroke="hsl(215 15% 25%)"
                  tickLine={false}
                  tick={{ fill: "hsl(215 15% 55%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
                />
                <YAxis
                  stroke="hsl(215 15% 20%)"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "hsl(215 15% 45%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(0 72% 51% / 0.4)", strokeWidth: 1 }} />
                <ReferenceLine
                  y={100}
                  stroke="hsl(215 15% 40%)"
                  strokeDasharray="6 6"
                  label={{
                    value: "PODER DE COMPRA ORIGINAL",
                    position: "insideTopRight",
                    fill: "hsl(215 15% 45%)",
                    fontSize: 9,
                    fontFamily: "JetBrains Mono",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="none"
                  fill="url(#decayFill)"
                  animationDuration={2200}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(0 72% 55%)"
                  strokeWidth={3}
                  filter="url(#decayGlow)"
                  dot={{ fill: "hsl(0 72% 51%)", r: 3, strokeWidth: 0 }}
                  activeDot={{ fill: "hsl(0 72% 60%)", r: 6, strokeWidth: 2, stroke: "hsl(0 72% 75%)" }}
                  animationDuration={2200}
                  animationEasing="ease-out"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ManifestoSection;
