import { useState, type ElementType } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export type PanelAccent = 'rose' | 'emerald' | 'amber' | 'teal' | 'red' | 'violet';

export interface ExpandingPanelItem {
  icon: ElementType;
  title: string;
  desc: string;
  kicker?: string;
  link: string;
  img: string;
  cta?: string;
  badge?: string;
}

const ACCENTS: Record<PanelAccent, { bar: string; ring: string; border: string; iconBg: string; iconBorder: string; icon: string; cta: string; shadow: string }> = {
  rose: { bar: 'from-orange-300', ring: 'focus-visible:ring-rose-400', border: 'border-rose-500/35', iconBg: 'bg-rose-500/10', iconBorder: 'border-rose-400/40', icon: 'text-rose-400', cta: 'text-rose-300', shadow: 'shadow-rose-950/25' },
  emerald: { bar: 'from-emerald-500', ring: 'focus-visible:ring-emerald-400', border: 'border-emerald-500/35', iconBg: 'bg-emerald-500/10', iconBorder: 'border-emerald-400/40', icon: 'text-emerald-400', cta: 'text-emerald-300', shadow: 'shadow-emerald-950/25' },
  amber: { bar: 'from-amber-500', ring: 'focus-visible:ring-amber-400', border: 'border-amber-500/35', iconBg: 'bg-amber-500/10', iconBorder: 'border-amber-400/40', icon: 'text-amber-400', cta: 'text-amber-300', shadow: 'shadow-amber-950/25' },
  teal: { bar: 'from-teal-500', ring: 'focus-visible:ring-teal-400', border: 'border-teal-500/35', iconBg: 'bg-teal-500/10', iconBorder: 'border-teal-400/40', icon: 'text-teal-400', cta: 'text-teal-300', shadow: 'shadow-teal-950/25' },
  red: { bar: 'from-red-500', ring: 'focus-visible:ring-red-400', border: 'border-red-500/35', iconBg: 'bg-red-500/10', iconBorder: 'border-red-400/40', icon: 'text-red-400', cta: 'text-red-300', shadow: 'shadow-red-950/25' },
  violet: { bar: 'from-violet-500', ring: 'focus-visible:ring-violet-400', border: 'border-violet-500/35', iconBg: 'bg-violet-500/10', iconBorder: 'border-violet-400/40', icon: 'text-violet-400', cta: 'text-violet-300', shadow: 'shadow-violet-950/25' },
};

/** "Arquivo vertical": painel ativo cresce (flex-grow) e revela a descrição; no celular os cards ficam completos e empilhados. */
export default function ExpandingPanels({ items, accent, numbered = false, className = 'mb-12' }: { items: ExpandingPanelItem[]; accent: PanelAccent; numbered?: boolean; className?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const grow = items.length <= 2 ? 'md:grow-[1.3]' : 'md:grow-[2.4]';
  const a = ACCENTS[accent];
  return (
    <div className={`flex flex-col md:flex-row gap-3 md:h-[420px] ${className}`} onMouseLeave={() => setActive(null)}>
      {items.map((item, i) => {
        const on = active === i;
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            onMouseEnter={() => setActive(i)}
            className={`min-w-0 md:basis-0 motion-safe:transition-[flex-grow] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${on ? grow : 'md:grow'}`}
          >
            <Link
              to={item.link}
              onFocus={() => setActive(i)}
              className={`group flex h-full min-h-56 md:min-h-0 flex-col justify-end relative overflow-hidden rounded-xl border bg-[#0b100d] shadow-2xl shadow-black/50 p-5 md:p-6 focus-visible:outline-none focus-visible:ring-2 ${a.ring} focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:transition-[border-color,box-shadow] motion-safe:duration-500 motion-reduce:transition-none ${on ? `${a.border} ${a.shadow}` : 'border-white/10'}`}
            >
              <img src={item.img} alt="" aria-hidden="true" loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover motion-safe:transition-[transform,opacity] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${on ? 'scale-105 opacity-70' : 'scale-100 opacity-45'}`} />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/25 motion-safe:transition-opacity motion-safe:duration-500 ${on ? 'opacity-90' : 'opacity-100'}`} />
              <div className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r ${a.bar} to-transparent motion-safe:transition-[width] motion-safe:duration-700 motion-reduce:transition-none ${on ? 'w-full' : 'w-0'}`} />
              {item.badge && (
                <span className="absolute z-10 top-3 right-3 text-[9px] font-bold uppercase tracking-[0.2em] text-amber-300 px-2 py-1 rounded border border-amber-500/30 bg-black/70">{item.badge}</span>
              )}
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  {numbered && <span className="text-lg font-black tabular-nums text-stone-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{String(i + 1).padStart(2, '0')}</span>}
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${a.iconBg} motion-safe:transition-[transform,border-color] motion-safe:duration-500 ${on ? `${a.iconBorder} md:scale-110` : 'border-white/10'}`}>
                    <Icon size={20} className={a.icon} />
                  </div>
                </div>
                <h4 className="text-base md:text-lg font-bold text-stone-100 tracking-tight mb-2 leading-snug">{item.title}</h4>
                <div className={`overflow-hidden motion-safe:transition-[max-height,opacity,transform] motion-safe:duration-500 motion-reduce:transition-none md:translate-y-2 md:max-h-0 md:opacity-0 ${on ? 'md:translate-y-0 md:max-h-40 md:opacity-100' : ''}`}>
                  {item.kicker && <p className={`${a.cta} text-[10px] font-semibold uppercase tracking-wider mb-2`}>{item.kicker}</p>}
                  <p className="text-stone-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <span className={`mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] ${a.cta} motion-safe:transition-opacity motion-safe:duration-500 md:opacity-0 ${on ? 'md:opacity-100' : ''}`}>
                  {item.cta ?? 'Acessar módulo'} <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
