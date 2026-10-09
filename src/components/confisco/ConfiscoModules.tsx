import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Simulador: o leitor move o saldo e observa a parte que ficou presa. Sem perguntas. */
const LIMITE = 50000;

export function SimuladorBloqueio() {
  const [saldo, setSaldo] = useState(200000);
  const livre = Math.min(saldo, LIMITE);
  const preso = Math.max(saldo - LIMITE, 0);
  const pctPreso = saldo ? Math.round((preso / saldo) * 100) : 0;
  const fmt = (n: number) => "NCz$ " + n.toLocaleString("pt-BR");

  return (
    <section aria-labelledby="sim-title" className="max-w-7xl mx-auto px-6 py-20">
      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-destructive/70">Simulação / 16 de março de 1990</p>
      <h2 id="sim-title" className="mt-3 text-3xl md:text-5xl font-black tracking-tight">Arraste o saldo e veja o que sobrou na sua mão</h2>
      <p className="mt-4 max-w-3xl text-muted-foreground text-lg leading-relaxed">
        A regra da medida provisória era simples: até NCz$ 50.000 continuava acessível. Todo o resto ficava retido no Banco Central por 18 meses.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
        <div className="rounded-2xl border border-border/60 bg-[hsl(222_47%_6%)] p-6 md:p-8">
          <label htmlFor="saldo" className="text-sm text-muted-foreground">Saldo na conta e na poupança</label>
          <p className="mt-1 text-3xl md:text-4xl font-black tabular-nums">{fmt(saldo)}</p>
          <input
            id="saldo" type="range" min={10000} max={1000000} step={10000} value={saldo}
            onChange={(e) => setSaldo(Number(e.target.value))}
            className="mt-6 w-full h-11 cursor-pointer accent-[hsl(var(--destructive))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-destructive"
          />
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border/50 p-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Acessível</p>
              <p className="mt-1 text-xl font-bold tabular-nums">{fmt(livre)}</p>
            </div>
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4">
              <p className="text-xs uppercase tracking-widest text-destructive">Retido 18 meses</p>
              <p className="mt-1 text-xl font-bold tabular-nums">{fmt(preso)}</p>
            </div>
          </div>
        </div>

        <div className="relative" aria-live="polite">
          <svg viewBox="0 0 400 260" className="w-full h-auto" role="img" aria-label={`${pctPreso}% do saldo retido`}>
            <defs>
              <pattern id="grade" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M10 0H0V10" fill="none" stroke="hsl(var(--border))" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="400" height="260" fill="url(#grade)" opacity="0.5" />
            <rect x="40" y="40" width="320" height="60" rx="6" fill="hsl(var(--muted))" opacity="0.4" />
            <motion.rect x="40" y="40" height="60" rx="6" fill="hsl(var(--destructive))"
              animate={{ width: (320 * pctPreso) / 100 }} transition={{ type: "spring", stiffness: 90, damping: 18 }} />
            <text x="40" y="130" fill="hsl(var(--muted-foreground))" fontSize="12">Parte do patrimônio fora do seu alcance</text>
            <motion.text x="40" y="200" fill="hsl(var(--foreground))" fontSize="56" fontWeight="900" key={pctPreso}
              initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>{pctPreso}%</motion.text>
            <text x="40" y="232" fill="hsl(var(--muted-foreground))" fontSize="12">devolvido depois, em parcelas, com correção abaixo da inflação</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* Alternador de realidade: promessa oficial x o que aconteceu. */
const PARES = [
  { tema: "Inflação", promessa: "O plano acabaria com a hiperinflação de uma vez.", registro: "A inflação voltou com força meses depois e o plano fracassou nos objetivos declarados." },
  { tema: "Devolução", promessa: "O dinheiro voltaria em 18 meses, corrigido monetariamente.", registro: "A devolução veio em parcelas, ao longo de anos, com correção abaixo da inflação real." },
  { tema: "Processo", promessa: "Uma medida técnica e necessária para salvar a economia.", registro: "Nenhum cidadão foi avisado e nenhum congressista votou antes. Medida Provisória com força de lei imediata." },
  { tema: "Proteção", promessa: "O banco guarda e protege o seu patrimônio.", registro: "Cerca de 80% da liquidez do sistema ficou bloqueada da noite para o dia." },
];

export function AlternadorRealidade() {
  const [modo, setModo] = useState<"promessa" | "registro">("promessa");
  return (
    <section aria-labelledby="alt-title" className="max-w-7xl mx-auto px-6 py-20">
      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-destructive/70">Duas versões da mesma história</p>
      <h2 id="alt-title" className="mt-3 text-3xl md:text-5xl font-black tracking-tight">O que foi dito e o que ficou registrado</h2>
      <div role="tablist" aria-label="Versão" className="mt-8 inline-flex rounded-full border border-border/60 p-1">
        {(["promessa", "registro"] as const).map((m) => (
          <button key={m} role="tab" aria-selected={modo === m} onClick={() => setModo(m)}
            className={`min-h-11 px-6 rounded-full text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-destructive ${modo === m ? "bg-destructive text-destructive-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {m === "promessa" ? "Discurso oficial" : "Registro dos fatos"}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {PARES.map((p) => (
          <article key={p.tema} className="relative overflow-hidden rounded-2xl border border-border/60 bg-[hsl(222_47%_6%)] p-6 md:p-8 min-h-[180px] transition-transform duration-500 hover:-translate-y-1">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-destructive/80">{p.tema}</p>
            <AnimatePresence mode="wait">
              <motion.p key={modo} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }} className="mt-4 text-lg leading-relaxed">
                {modo === "promessa" ? p.promessa : p.registro}
              </motion.p>
            </AnimatePresence>
          </article>
        ))}
      </div>
    </section>
  );
}
