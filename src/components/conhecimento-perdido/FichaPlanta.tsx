import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Activity, XCircle, FlaskConical, Beaker, Thermometer, Clock, Ban, Zap, Leaf, Brain, MapPin, Eye, Pill, BookOpen } from 'lucide-react';
import type { PlantaFicha } from './PlantData';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const termicoLabel = {
  aquecedora: { label: 'AQUECEDORA', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  refrescante: { label: 'REFRESCANTE', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  neutra: { label: 'NEUTRA', color: 'text-stone-400 bg-stone-500/10 border-stone-500/20' },
};

/* ─── Subcomponente: Bloco de seção interna ─── */
function SecaoBloco({ icon: Icon, titulo, cor, children }: { icon: React.ElementType; titulo: string; cor: string; children: React.ReactNode }) {
  return (
    <div className={`bg-${cor}-950/20 border border-${cor}-800/15 rounded-lg p-4 mb-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={13} className={`text-${cor}-400`} />
        <p className={`text-[10px] font-bold tracking-[0.3em] uppercase text-${cor}-400`}>{titulo}</p>
      </div>
      {children}
    </div>
  );
}

export function FichaPlanta({ planta }: { planta: PlantaFicha }) {
  const termico = termicoLabel[planta.impactoTermico];

  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp} custom={0}
      className={`bg-[#0f1a0f]/60 backdrop-blur-md border ${planta.border} rounded-xl overflow-hidden hover:border-emerald-500/40 transition-all duration-500 group`}
    >
      {/* ═══ IMAGEM DE IDENTIFICAÇÃO ═══ */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden">
        <img src={planta.imagem} alt={planta.nome} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a0f] via-[#0f1a0f]/50 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <div className="flex items-end justify-between">
            <div>
              <h4 className={`text-2xl md:text-3xl font-black tracking-tight ${planta.accent}`}
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{planta.nome}</h4>
              <p className="text-stone-400 text-xs italic font-mono">{planta.cientifico}</p>
              <p className="text-stone-500 text-[10px] font-mono mt-0.5">Família: {planta.familia}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[9px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 backdrop-blur-sm">
                {planta.parteUsada}
              </span>
              <span className={`text-[8px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${termico.color}`}>
                {termico.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">

        {/* ═══ 1. IDENTIFICAÇÃO BOTÂNICA ═══ */}
        <SecaoBloco icon={Leaf} titulo="1 · Identificação Botânica" cor="emerald">
          {planta.variacoesRegionais.length > 0 && (
            <div className="mb-3">
              <p className="text-[9px] text-stone-500 uppercase tracking-wider mb-1">Variações regionais</p>
              <div className="flex flex-wrap gap-1">
                {planta.variacoesRegionais.map(v => (
                  <span key={v} className="text-xs bg-white/5 border border-white/10 text-stone-300 px-2 py-0.5 rounded-md">{v}</span>
                ))}
              </div>
            </div>
          )}
          <div className="mb-3">
            <p className="text-[9px] text-stone-500 uppercase tracking-wider mb-1">Morfologia</p>
            <p className="text-stone-300 text-xs leading-relaxed">{planta.morfologia}</p>
          </div>
          <div className="bg-amber-950/30 border border-amber-800/20 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertTriangle size={11} className="text-amber-400" />
              <p className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">Risco de confusão</p>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">{planta.riscoConfusao}</p>
          </div>
        </SecaoBloco>

        {/* ═══ 2. PARTE UTILIZADA ═══ */}
        <SecaoBloco icon={Eye} titulo="2 · Por que esta parte?" cor="emerald">
          <p className="text-stone-300 text-xs leading-relaxed">{planta.justificativaParte}</p>
        </SecaoBloco>

        {/* ═══ 3. COMPOSTOS BIOATIVOS ═══ */}
        <SecaoBloco icon={Beaker} titulo="3 · Compostos Bioativos" cor="emerald">
          <div className="mb-2">
            <p className="text-[9px] text-stone-500 uppercase tracking-wider mb-1">Classes químicas</p>
            <div className="flex flex-wrap gap-1">
              {planta.classesQuimicas.map(c => (
                <span key={c} className="text-[10px] bg-emerald-500/10 border border-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9px] text-stone-500 uppercase tracking-wider mb-1">Moléculas específicas</p>
            <p className="text-stone-300 text-xs leading-relaxed font-mono">{planta.moleculasEspecificas}</p>
          </div>
        </SecaoBloco>

        {/* ═══ 4. MECANISMO DE AÇÃO ═══ */}
        <SecaoBloco icon={Brain} titulo="4 · Mecanismo de Ação" cor="purple">
          <div className="space-y-2">
            <div>
              <p className="text-[9px] text-stone-500 uppercase tracking-wider">Sistema modulado</p>
              <p className="text-stone-200 text-sm font-semibold">{planta.sistemaModulado}</p>
            </div>
            <div>
              <p className="text-[9px] text-stone-500 uppercase tracking-wider">Via bioquímica</p>
              <p className="text-stone-300 text-xs leading-relaxed">{planta.viaBioquimica}</p>
            </div>
            <div>
              <p className="text-[9px] text-stone-500 uppercase tracking-wider">Resposta fisiológica</p>
              <p className="text-stone-300 text-xs leading-relaxed">{planta.respostaFisiologica}</p>
            </div>
          </div>
        </SecaoBloco>

        {/* ═══ 5. INDICAÇÕES TRADICIONAIS ═══ */}
        <SecaoBloco icon={BookOpen} titulo="5 · Indicações Documentadas" cor="emerald">
          <div className="space-y-3">
            {planta.indicacoes.map(ind => (
              <div key={ind.sistema}>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1">{ind.sistema}</p>
                <div className="flex flex-wrap gap-1">
                  {ind.sintomas.map(s => (
                    <span key={s} className="text-xs bg-white/5 border border-white/10 text-stone-300 px-2 py-0.5 rounded-md">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SecaoBloco>

        {/* ═══ 6. FORMA DE PREPARO ═══ */}
        <SecaoBloco icon={FlaskConical} titulo="6 · Preparo Correto" cor="emerald">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[9px] text-stone-500 uppercase tracking-wider mb-0.5">Método</p>
              <p className="text-stone-200 text-xs font-semibold">{planta.metodo}</p>
            </div>
            <div>
              <p className="text-[9px] text-stone-500 uppercase tracking-wider mb-0.5">Tempo</p>
              <p className="text-stone-300 text-xs">{planta.tempoInfusao}</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-[9px] text-stone-500 uppercase tracking-wider mb-0.5">Proporção</p>
            <p className="text-stone-300 text-xs leading-relaxed">{planta.proporcao}</p>
          </div>
          <div className="mt-2">
            <p className="text-[9px] text-stone-500 uppercase tracking-wider mb-0.5">Frequência</p>
            <p className="text-stone-300 text-xs">{planta.frequencia}</p>
          </div>
        </SecaoBloco>

        {/* ═══ 7. DOSE SEGURA ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Adulto', dose: planta.doseAdulto, cor: 'emerald' },
            { label: 'Idoso', dose: planta.doseIdoso, cor: 'amber' },
            { label: 'Criança', dose: planta.doseCrianca, cor: 'red' },
          ].map(d => (
            <div key={d.label} className={`bg-${d.cor}-950/20 border border-${d.cor}-800/15 rounded-lg p-3`}>
              <p className={`text-[9px] font-bold tracking-[0.3em] uppercase text-${d.cor}-400 mb-1`}>
                <Shield size={10} className="inline mr-1" />{d.label}
              </p>
              <p className="text-stone-300 text-xs leading-relaxed">{d.dose}</p>
            </div>
          ))}
        </div>

        {/* ═══ 8. CONTRAINDICAÇÕES ═══ */}
        <SecaoBloco icon={XCircle} titulo="8 · Contraindicações" cor="red">
          <div className="space-y-1.5 mb-3">
            {planta.contraindicacoes.map(c => (
              <div key={c} className="flex items-start gap-2">
                <XCircle size={11} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-stone-300 text-xs">{c}</p>
              </div>
            ))}
          </div>
          {planta.interacoesMedicamentosas.length > 0 && (
            <div className="bg-amber-950/20 border border-amber-800/15 rounded-lg p-3">
              <p className="text-[9px] text-amber-400 font-bold uppercase tracking-wider mb-1.5">
                <Pill size={10} className="inline mr-1" />Interações medicamentosas
              </p>
              <div className="space-y-1">
                {planta.interacoesMedicamentosas.map(i => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle size={10} className="text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-stone-400 text-xs">{i}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SecaoBloco>

        {/* ═══ 9. LIMITE DE USO ═══ */}
        <SecaoBloco icon={Clock} titulo="9 · Limite de Uso" cor="orange">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-[9px] text-stone-500 uppercase tracking-wider mb-0.5">Tipo de uso</p>
              <p className="text-stone-200 text-xs font-semibold">{planta.tipoUso}</p>
            </div>
            <div>
              <p className="text-[9px] text-stone-500 uppercase tracking-wider mb-0.5">Máximo contínuo</p>
              <p className="text-stone-300 text-xs">{planta.maxDias}</p>
            </div>
          </div>
          <div>
            <p className="text-[9px] text-orange-400 font-bold uppercase tracking-wider mb-1.5">Sinais de suspensão imediata</p>
            <div className="space-y-1">
              {planta.sinaisSuspensao.map(s => (
                <div key={s} className="flex items-start gap-2">
                  <Activity size={10} className="text-orange-400 shrink-0 mt-0.5" />
                  <p className="text-stone-400 text-xs">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </SecaoBloco>

        {/* ═══ SINERGIAS ═══ */}
        <div className="bg-amber-950/15 border border-amber-800/15 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={13} className="text-amber-400" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400">Sinergias conhecidas</p>
          </div>
          <p className="text-stone-300 text-xs leading-relaxed">{planta.sinergias}</p>
        </div>
      </div>
    </motion.div>
  );
}
