import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/* Comparador por etapas: o que acontece sem defesa x com defesa. */
const ETAPAS = [
  { label: 'Coleta', exp: ['Seus dados viram munição', 'Nome, CPF, endereço e foto de documento saem de vazamentos, redes sociais e phishing. O criminoso monta o dossiê antes de ligar para a operadora.'], def: ['Exposição reduzida na origem', 'Cada documento que você não publica e cada formulário duvidoso que você recusa é um tijolo a menos na ponte do criminoso.'] },
  { label: 'Persuasão', exp: ['A operadora acredita nele', 'Com documentos falsificados e dados reais seus, ele convence o atendente de que é você. A falha explorada é humana, do outro lado do balcão.'], def: ['Senha de portabilidade ativa', 'Com senha de atendimento e bloqueio de portabilidade no CPF, nenhuma troca de SIM deveria acontecer sem ela, nem presencialmente.'] },
  { label: 'Transferência', exp: ['Seu número muda de mãos', 'A operadora ativa um SIM novo em mãos do criminoso e desativa o seu. O único sintoma que você percebe é o sinal morrendo de repente.'], def: ['Sinal morto tratado como alarme', 'Quem reage nos primeiros minutos, ligando de outro telefone e bloqueando a linha, costuma sair com prejuízo pequeno.'] },
  { label: 'Colheita', exp: ['O 2FA por SMS vira a porta', 'Cada código de banco, cada recuperação de e-mail e cada confirmação passa a chegar no aparelho dele. Um número vale um império de contas.'], def: ['Autenticador no lugar do SMS', 'Com 2FA por aplicativo e recuperação sem SMS, o número roubado abre muito menos portas. O golpe perde a cascata.'] },
];

export function RotaSimSwap() {
  const [i, setI] = useState(0);
  const e = ETAPAS[i];
  return (
    <div className="smx-card rounded-lg border p-6 md:p-10">
      <ol className="relative grid grid-cols-4 gap-2" aria-label="Etapas do golpe">
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
