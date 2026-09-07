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
      <div className="rounded-lg border border-chart-red/30 bg-background/85 backdrop-blur-md px-4 py-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]">
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">{label}</p>
        <p className="text-chart-red font-mono text-xl font-bold leading-none">{v}%</p>
        <p className="text-[11px] text-muted-foreground mt-1">
          do poder de compra original · perda de {100 - v}%
        </p>
      </div>
    );
  }
  return null;
};


const ManifestoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportOnce);

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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: ease.sovereign }}
          className="card-wealth p-4 md:p-8"
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="pre-title mb-1">VISUALIZAÇÃO DE DADOS</p>
                <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight">
                  DESTRUIÇÃO DO PODER DE COMPRA <span className="text-muted-foreground">(BRL/USD vs. TEMPO)</span>
                </h3>
              </div>
              <span className="text-chart-red font-mono text-sm font-semibold">-92%</span>
            </div>

            {/* Frase-anzol — PNL */}
            <div className="relative border-l-2 border-chart-red/40 pl-4 py-2 bg-chart-red/[0.03] rounded-r-sm">
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                <span className="text-chart-red font-bold">R$ 100 em 1994</span> comprava o que hoje custa{' '}
                <span className="text-chart-red font-bold">R$ 1.250</span>.
                Seu salário subiu na mesma proporção?
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                O gráfico abaixo mostra o que o Estado fez com cada real no seu bolso.
              </p>
            </div>
          </div>

          <div className="h-[300px] md:h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={purchasingPowerData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 16%)" />
                <XAxis
                  dataKey="year"
                  stroke="hsl(215 15% 35%)"
                  tick={{ fill: 'hsl(215 15% 55%)', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                />
                <YAxis
                  stroke="hsl(220 20% 16%)"
                  tick={{ fill: 'hsl(215 15% 55%)', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={100} stroke="hsl(215 15% 25%)" strokeDasharray="6 4" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(0 72% 51%)"
                  strokeWidth={2.5}
                  dot={{ fill: 'hsl(0 72% 51%)', r: 3, strokeWidth: 0 }}
                  activeDot={{ fill: 'hsl(0 72% 51%)', r: 5, strokeWidth: 2, stroke: 'hsl(0 72% 65%)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ManifestoSection;
