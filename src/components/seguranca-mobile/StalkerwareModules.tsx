import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Accessibility, BatteryWarning, Check, KeyRound, RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STALKERWARE_HOTSPOTS } from "@/data/stalkerwareInspection";

const HOTSPOT_ICONS = {
  accessibility: Accessibility,
  certificates: KeyRound,
  background: BatteryWarning,
};

export function RaioXStalkerware({ imageSrc }: { imageSrc: string }) {
  const [activeId, setActiveId] = useState(STALKERWARE_HOTSPOTS[0].id);
  const reduce = useReducedMotion();
  const active = STALKERWARE_HOTSPOTS.find((item) => item.id === activeId) ?? STALKERWARE_HOTSPOTS[0];
  const ActiveIcon = HOTSPOT_ICONS[active.id];

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]">
      <div className="smx-deep relative min-h-[560px] overflow-hidden rounded-lg border border-background/20 p-5 md:min-h-[680px] md:p-8">
        <div className="absolute inset-0 opacity-20">
          <img src={imageSrc} alt="" className="h-full w-full object-cover" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 smx-dark-shade" aria-hidden="true" />

        <div className="relative mx-auto h-[520px] w-[min(86%,300px)] overflow-hidden rounded-[2.25rem] border-4 border-background/30 bg-foreground shadow-2xl md:h-[610px] md:w-[330px]">
          <img src={imageSrc} alt="Tela de configurações usada como mapa visual da inspeção" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-foreground/75" aria-hidden="true" />
          <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-background/20" aria-hidden="true" />
          <div className="absolute inset-x-6 top-14">
            <p className="smx-copper-soft text-xs font-black uppercase tracking-[0.24em]">Varredura ativa</p>
            <p className="mt-2 text-2xl font-black text-background">Configurações críticas</p>
            <div className="mt-5 h-px bg-background/20" />
          </div>

          {STALKERWARE_HOTSPOTS.map((hotspot) => {
            const Icon = HOTSPOT_ICONS[hotspot.id];
            const selected = hotspot.id === activeId;
            return (
              <Button
                key={hotspot.id}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Inspecionar ${hotspot.label}`}
                aria-pressed={selected}
                onClick={() => setActiveId(hotspot.id)}
                className={`smx-focus absolute z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-transform hover:scale-110 hover:bg-background/20 ${selected ? "smx-step border-transparent" : "border-background/60 bg-foreground/80 text-background"}`}
                style={{ left: `${hotspot.position.x}%`, top: `${hotspot.position.y}%` }}
              >
                {!reduce && !selected && <span className="absolute inset-0 animate-ping rounded-full border border-background/50" aria-hidden="true" />}
                <Icon className="h-5 w-5" aria-hidden="true" />
              </Button>
            );
          })}

          <div className="absolute inset-x-6 bottom-6 grid grid-cols-3 gap-2">
            {STALKERWARE_HOTSPOTS.map((hotspot) => (
              <div key={hotspot.id} className={`h-1.5 rounded-full ${hotspot.id === activeId ? "smx-rule" : "bg-background/20"}`} />
            ))}
          </div>
        </div>
      </div>

      <motion.article
        key={active.id}
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.3 }}
        className="smx-card flex min-h-[430px] flex-col rounded-lg border p-7 md:p-10"
        aria-live="polite"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full"><ActiveIcon className="h-5 w-5" /></div>
          <span className="smx-muted text-xs font-black uppercase tracking-[0.24em]">VETOR {active.number}</span>
        </div>
        <p className="smx-copper mt-8 text-xs font-black uppercase tracking-[0.24em]">{active.label}</p>
        <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">{active.title}</h3>
        <div className="mt-7 border-l-2 pl-5" style={{ borderColor: "hsl(var(--smx-copper))" }}>
          <p className="smx-muted text-xs font-black uppercase tracking-[0.2em]">O sinal</p>
          <p className="mt-2 text-lg leading-[1.7]">{active.signal}</p>
        </div>
        <div className="mt-6 border-l-2 pl-5" style={{ borderColor: "hsl(var(--smx-copper))" }}>
          <p className="smx-muted text-xs font-black uppercase tracking-[0.2em]">Onde verificar</p>
          <p className="mt-2 text-lg font-bold leading-[1.7]">{active.path}</p>
        </div>
        <p className="mt-auto pt-8 text-base leading-[1.75]">{active.why}</p>
      </motion.article>
    </div>
  );
}

export function ChecklistVarredura({ steps }: { steps: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => steps.map(() => false));
  const reduce = useReducedMotion();
  const completed = checked.filter(Boolean).length;
  const percentage = Math.round((completed / steps.length) * 100);

  return (
    <div>
      <div className="smx-card mb-5 grid gap-4 rounded-lg border p-5 md:grid-cols-[auto_1fr_auto] md:items-center">
        <div className="flex items-baseline gap-2">
          <span className="smx-copper text-2xl font-black tabular-nums">{percentage}%</span>
          <span className="smx-muted text-xs font-bold uppercase tracking-[0.18em]">{completed} de {steps.length}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-foreground/10" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label="Etapas verificadas">
          <motion.div className="smx-rule h-full" animate={{ width: `${percentage}%` }} transition={{ duration: reduce ? 0 : 0.4 }} />
        </div>
        <Button type="button" variant="ghost" onClick={() => setChecked(steps.map(() => false))} className="justify-self-start font-bold md:justify-self-auto">
          <RotateCcw className="mr-2 h-4 w-4" /> Limpar
        </Button>
      </div>

      <div className="grid gap-4">
        {steps.map((step, index) => (
          <Button
            key={step}
            type="button"
            variant="ghost"
            aria-pressed={checked[index]}
            onClick={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))}
            className={`smx-card h-auto min-h-24 w-full justify-start whitespace-normal rounded-lg border p-5 text-left transition-all duration-300 hover:bg-card md:p-7 ${checked[index] ? "opacity-70" : ""}`}
          >
            <span className={`mr-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-black ${checked[index] ? "smx-step" : "border-2"}`} style={checked[index] ? undefined : { borderColor: "hsl(var(--smx-copper))" }}>
              {checked[index] ? <Check className="h-5 w-5" /> : String(index + 1).padStart(2, "0")}
            </span>
            <span className="self-center text-base font-normal leading-[1.7] md:text-lg">{step}</span>
          </Button>
        ))}
      </div>

      {percentage === 100 && (
        <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 flex items-start gap-3 rounded-lg border-2 p-5" style={{ borderColor: "hsl(var(--smx-copper))" }} role="status">
          <Search className="smx-copper mt-1 h-5 w-5 shrink-0" />
          <p className="leading-[1.7]"><strong>Varredura concluída.</strong> Ausência de sinais não prova que o aparelho está limpo. Se a suspeita continuar, preserve as anotações e procure análise especializada.</p>
        </motion.div>
      )}
    </div>
  );
}