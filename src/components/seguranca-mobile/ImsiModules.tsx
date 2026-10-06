import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';

/* Comparador por etapas: o que acontece sem defesa x com defesa. */
const ETAPAS = [
  { label: 'Sinal', exp: ['Antena falsa grita mais alto', 'A estação falsa emite potência acima das torres reais. O celular escolhe o sinal mais forte e conecta sem avisar.'], def: ['Desconfie do sinal cheio', 'Sinal forte nunca foi prova de confiança. Em local sensível, o rádio celular desligado não conversa com antena nenhuma.'] },
  { label: 'Registro', exp: ['IMSI e IMEI entregues', 'Na conexão, o aparelho se identifica: o chip pelo IMSI e o próprio aparelho pelo IMEI. A lista de presentes se monta sozinha.'], def: ['Modo avião no contexto certo', 'Sem transmissão não existe registro. É a única resposta que nenhuma estação falsa contorna.'] },
  { label: 'Rebaixamento', exp: ['Queda forçada para 2G', 'O kit empurra o aparelho de 4G ou 5G para 2G, onde a criptografia da rede é antiga e quebrada.'], def: ['2G desligado no sistema', 'A partir do Android 12, e com mais controle no GrapheneOS, o 2G pode ser desativado. O caminho do rebaixamento fecha.'] },
  { label: 'Conteúdo', exp: ['Chamadas e SMS expostos', 'Na conexão rebaixada, voz e SMS comuns podem ser capturados. É o cenário mais grave do ataque.'], def: ['Conteúdo cifrado de ponta a ponta', 'HTTPS e apps com criptografia ponta a ponta mantêm o conteúdo fechado. Sobra apenas o metadado de presença.'] },
];

export function RotaImsi() {
  const [i, setI] = useState(0);
  const e = ETAPAS[i];
  return (
    <div className="smx-card rounded-lg border p-6 md:p-10">
      <ol className="relative grid grid-cols-4 gap-2" aria-label="Etapas do ataque">
        <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-6 h-0.5 bg-foreground/10">
          <div className="smx-rule h-full transition-all duration-500" style={{ width: `${(i / (ETAPAS.length - 1)) * 100}%` }} />
        </div>
        {ETAPAS.map((s, k) => (
          <li key={s.label} className="relative flex flex-col items-center">
            <button type="button" onClick={() => setI(k)} aria-current={k === i ? 'step' : undefined}
              className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-black transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${k <= i ? 'smx-step border-transparent' : 'smx-card'} ${k === i ? 'scale-110' : ''}`}>
              {String(k + 1).padStart(2, '0')}
            </button>
            <span className={`mt-3 text-center text-xs font-bold uppercase tracking-[0.18em] ${k === i ? 'smx-copper' : 'smx-muted'}`}>{s.label}</span>
          </li>
        ))}
      </ol>
      <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }} className="mt-10 grid gap-5 md:grid-cols-2" aria-live="polite">
        <article className="rounded-lg border border-foreground/15 p-6 md:p-8">
          <span className="smx-muted text-xs font-black tracking-[0.25em]">SEM DEFESA</span>
          <h3 className="mt-3 text-2xl font-black">{e.exp[0]}</h3>
          <p className="mt-3 text-lg leading-[1.7]">{e.exp[1]}</p>
        </article>
        <article className="rounded-lg border-2 p-6 md:p-8" style={{ borderColor: 'hsl(var(--smx-copper))' }}>
          <span className="smx-copper text-xs font-black tracking-[0.25em]">COM DEFESA</span>
          <h3 className="mt-3 text-2xl font-black">{e.def[0]}</h3>
          <p className="mt-3 text-lg leading-[1.7]">{e.def[1]}</p>
        </article>
      </motion.div>
      <div className="mt-8 flex justify-between gap-3">
        <button type="button" disabled={i === 0} onClick={() => setI(i - 1)} className="inline-flex min-h-11 items-center gap-2 rounded-md border px-4 font-bold disabled:opacity-30"><ArrowLeft className="h-4 w-4" /> Etapa anterior</button>
        <button type="button" disabled={i === ETAPAS.length - 1} onClick={() => setI(i + 1)} className="smx-step inline-flex min-h-11 items-center gap-2 rounded-md px-4 font-bold disabled:opacity-30">Próxima etapa <ArrowRight className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

/* Cartões que empilham na rolagem. */
export function PilhaPassos({ passos }: { passos: string[] }) {
  return (
    <div className="relative">
      {passos.map((text, i) => (
        <div key={text} className="sticky pb-6" style={{ top: `${96 + i * 28}px` }}>
          <article className="smx-deep grid gap-5 rounded-lg border p-6 shadow-2xl md:grid-cols-[64px_1fr] md:p-10" style={{ borderColor: 'hsl(var(--smx-paper) / .2)' }}>
            <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
            <p className="self-center text-lg leading-[1.75] text-background/90 md:text-xl">{text}</p>
          </article>
        </div>
      ))}
    </div>
  );
}

/* Checklist de endurecimento com progresso local. */
export function ChecklistDefesas({ itens }: { itens: string[] }) {
  const [feito, setFeito] = useState<boolean[]>(() => itens.map(() => false));
  const reduce = useReducedMotion();
  const pct = Math.round((feito.filter(Boolean).length / itens.length) * 100);
  return (
    <div>
      <div className="smx-card mb-5 flex items-center gap-5 rounded-lg border p-5">
        <span className="smx-copper w-14 text-2xl font-black tabular-nums">{pct}%</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-foreground/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Defesas configuradas">
          <motion.div className="smx-rule h-full" animate={{ width: `${pct}%` }} transition={{ duration: reduce ? 0 : .4 }} />
        </div>
        <button type="button" onClick={() => setFeito(itens.map(() => false))} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold"><RotateCcw className="h-4 w-4" /> Limpar</button>
      </div>
      <div className="grid gap-4">
        {itens.map((text, i) => (
          <button key={text} type="button" aria-pressed={feito[i]} onClick={() => setFeito(f => f.map((v, k) => (k === i ? !v : v)))}
            className={`smx-card group grid gap-5 rounded-lg border p-6 text-left transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8 ${feito[i] ? 'opacity-70' : ''}`}>
            <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-black ${feito[i] ? 'smx-step' : 'border-2'}`} style={feito[i] ? undefined : { borderColor: 'hsl(var(--smx-copper))' }}>
              {feito[i] ? <Check className="h-5 w-5" /> : String(i + 1).padStart(2, '0')}
            </div>
            <p className="self-center text-lg leading-[1.75]">{text}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
