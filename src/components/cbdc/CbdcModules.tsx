import { useState } from 'react';

export interface SimuladorProgramavelProps {
  className?: string;
}

type Regra = { id: string; nome: string; efeito: string };

const REGRAS: Regra[] = [
  { id: 'validade', nome: 'Prazo de validade', efeito: 'O saldo perde valor ou é recolhido se não for gasto até a data definida pelo emissor.' },
  { id: 'categoria', nome: 'Bloqueio por categoria', efeito: 'A carteira recusa pagamentos para setores marcados como não permitidos.' },
  { id: 'geografia', nome: 'Cerca geográfica', efeito: 'O pagamento só é aceito dentro de uma região autorizada.' },
  { id: 'limite', nome: 'Teto de gasto', efeito: 'Transações acima de um valor diário ou mensal ficam retidas para análise.' },
];

const COMPRAS = [
  { id: 'mercado', nome: 'Supermercado no bairro', valor: 380, categoria: 'essencial', local: true },
  { id: 'viagem', nome: 'Passagem para outro estado', valor: 1200, categoria: 'viagem', local: false },
  { id: 'btc', nome: 'Compra de bitcoin em corretora', valor: 2500, categoria: 'restrita', local: true },
  { id: 'doacao', nome: 'Doação a uma causa política', valor: 150, categoria: 'restrita', local: true },
];

/** Simulação ilustrativa de regras que dinheiro programável permite tecnicamente. */
export function SimuladorProgramavel({ className = '' }: SimuladorProgramavelProps) {
  const [ativas, setAtivas] = useState<string[]>(['categoria']);
  const [compra, setCompra] = useState(COMPRAS[0].id);
  const c = COMPRAS.find((x) => x.id === compra)!;

  const bloqueios = REGRAS.filter((r) => {
    if (!ativas.includes(r.id)) return false;
    if (r.id === 'categoria') return c.categoria === 'restrita';
    if (r.id === 'geografia') return !c.local;
    if (r.id === 'limite') return c.valor > 1000;
    return false;
  });
  const validade = ativas.includes('validade');
  const toggle = (id: string) => setAtivas((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <section className={`mb-28 ${className}`} aria-labelledby="sim-programavel">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400 mb-3">Simulação ilustrativa</p>
      <h2 id="sim-programavel" className="text-xl font-bold text-stone-200 uppercase tracking-wider mb-4">Dinheiro programável na prática</h2>
      <p className="text-stone-400 text-base leading-relaxed mb-8 max-w-3xl">
        Ligue as regras que um emissor poderia configurar e escolha uma compra. O resultado mostra o que a arquitetura permite tecnicamente, não uma regra já anunciada pelo Banco Central.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0b0c12] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-4">Regras do emissor</p>
          <div className="space-y-2">
            {REGRAS.map((r) => {
              const on = ativas.includes(r.id);
              return (
                <button key={r.id} type="button" aria-pressed={on} onClick={() => toggle(r.id)}
                  className={`w-full text-left rounded-xl border p-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 ${on ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/10 hover:border-white/25'}`}>
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-stone-100 text-sm font-bold">{r.nome}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${on ? 'text-purple-300' : 'text-stone-500'}`}>{on ? 'Ativa' : 'Desligada'}</span>
                  </span>
                  <span className="block text-stone-400 text-xs mt-1 leading-relaxed">{r.efeito}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b0c12] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-4">Tentativa de pagamento</p>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {COMPRAS.map((x) => (
              <button key={x.id} type="button" aria-pressed={compra === x.id} onClick={() => setCompra(x.id)}
                className={`rounded-xl border p-3 text-left text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 ${compra === x.id ? 'border-amber-400/60 bg-amber-400/10 text-stone-100' : 'border-white/10 text-stone-400 hover:border-white/25'}`}>
                <span className="block font-bold">{x.nome}</span>
                <span className="font-mono text-stone-500">R$ {x.valor.toLocaleString('pt-BR')}</span>
              </button>
            ))}
          </div>
          <div aria-live="polite" className={`rounded-xl border p-5 transition-colors ${bloqueios.length ? 'border-red-500/40 bg-red-950/30' : 'border-emerald-500/40 bg-emerald-950/20'}`}>
            <p className={`text-sm font-bold uppercase tracking-wider ${bloqueios.length ? 'text-red-300' : 'text-emerald-300'}`}>
              {bloqueios.length ? 'Pagamento recusado' : 'Pagamento aprovado'}
            </p>
            {bloqueios.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-stone-300">
                {bloqueios.map((b) => <li key={b.id}>Motivo: {b.nome.toLowerCase()}</li>)}
              </ul>
            )}
            {validade && <p className="mt-3 text-xs text-amber-300">O saldo restante tem prazo para ser gasto.</p>}
            <p className="mt-3 text-xs text-stone-500">Com bitcoin em autocustódia, nenhuma dessas regras pode ser imposta à sua carteira.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
