import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Flame, Lightbulb, UtensilsCrossed, Thermometer, Battery, AlertTriangle, CheckCircle2, XCircle, Shield, Clock, Zap, Sun, Snowflake } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerChild, viewportOnce } from '@/lib/motion';
import CinematicHero from '@/components/CinematicHero';

import imgIluminacao from '@/assets/apagao-iluminacao.webp';
import imgCoccao from '@/assets/apagao-coccao.webp';
import imgConservacao from '@/assets/apagao-conservacao.webp';
import imgTermico from '@/assets/apagao-termico.webp';
import imgEnergia from '@/assets/apagao-energia.webp';
import BackToHome from '@/components/BackToHome';

const IMPACTOS_4H = [
  'Geladeiras começam a perder temperatura segura',
  'Elevadores param',
  'Bombas d\'água deixam de funcionar',
  'Iluminação pública falha',
];

const IMPACTOS_24H = [
  'Cadeia de frio pode ser rompida',
  'Comércio local pode colapsar',
  'Sistema bancário pode falhar',
];

const NIVEIS_ILUMINACAO = [
  { nivel: 'Individual', desc: 'Lanterna portátil LED. Ideal: recarregável + pilha reserva.', icon: '🔦' },
  { nivel: 'Ambiente', desc: 'Lanterna de mesa ou luminária de emergência.', icon: '💡' },
  { nivel: 'Longa Duração', desc: 'Lâmpadas recarregáveis USB. Power bank como suporte.', icon: '🔋' },
];

const OPCOES_COCCAO = [
  { nome: 'Fogareiro portátil a gás (butano)', desc: 'Mais eficiente. Usar sempre em ambiente ventilado.', seguro: true },
  { nome: 'Fogão a gás convencional', desc: 'Desde que tenha ignição manual (fósforo/isqueiro).', seguro: true },
  { nome: 'Churrasqueira externa', desc: 'Nunca dentro de casa. Apenas em área aberta.', seguro: true },
];

const SINTOMAS_CO = [
  'Dor de cabeça persistente',
  'Tontura e desorientação',
  'Náusea e vômito',
  'Confusão mental',
];

const PERECIVEIS = [
  'Carnes (bovina, frango, peixe)',
  'Laticínios (leite, queijos, iogurte)',
  'Alimentos cozidos e sobras',
];

const ENERGIA_ALT = [
  { nome: 'Power bank', desc: 'Celular e dispositivos USB. Manter carregado.', icon: Battery },
  { nome: 'Bateria externa automotiva', desc: 'Para cargas maiores com inversor.', icon: Zap },
  { nome: 'Gerador portátil', desc: 'Uso exclusivamente externo. Distante de janelas.', icon: Flame },
  { nome: 'Placa solar portátil', desc: 'Recarrega power banks e dispositivos pequenos.', icon: Sun },
];

const ERROS = [
  'Uso interno de carvão ou fogareiro em ambiente fechado',
  'Uso de gerador dentro de garagem ou área coberta',
  'Desorganização de iluminação (não saber onde estão lanternas)',
  'Abrir geladeira repetidamente durante o apagão',
  'Não ter pilhas reserva ou power bank carregado',
];

export default function ProtocolosApagao() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Como Sobreviver a um Apagão Sistêmico: Guia de Protocolos | Lord Junnior</title>
        <meta name="description" content="Protocolos de sobrevivência para apagões prolongados: iluminação alternativa, cocção sem gás, conservação de alimentos e energia off-grid. Prepare-se antes que a rede caia." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/protocolos-apagao" />
        <meta property="og:title" content="Sobreviva ao Apagão: Protocolos de Autonomia Energética" />
        <meta property="og:description" content="Quando a rede elétrica cai, quem não tem protocolo vira refém. Guia completo de sobrevivência sem energia." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/protocolos-apagao" />
        <meta property="og:type" content="article" />
      </Helmet>
    <div className="min-h-screen selection:bg-amber-300/30" style={{ background: '#050808' }}>
      <CinematicHero
        image="/heroes/protocolos-apagao.webp"
        phase="Fase 01 · Base 72"
        title="Protocolos de Apagão"
        subtitle="Iluminação, cozimento e aquecimento alternativos quando a rede elétrica está indisponível. Um apagão não é apenas falta de luz — ele compromete toda a cadeia de autonomia doméstica."
        icon={Flame}
        accentColor="amber"
      />

      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-12 pb-32">

        {/* CONTEXTO */}
        <motion.section
          className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-2xl p-6 md:p-10 mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <h2 className="text-lg font-bold text-stone-200 mb-4 flex items-center gap-2">
            <Shield size={18} className="text-amber-500" />
            O que um apagão compromete?
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-5">
            Conservação de alimentos, comunicação, segurança, aquecimento ou resfriamento, capacidade de cozinhar e abastecimento de água (em prédios).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/[0.03] rounded-xl p-5 border border-amber-500/[0.1]">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock size={13} /> Após 4–6 horas
              </p>
              <ul className="space-y-2">
                {IMPACTOS_4H.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                    <AlertTriangle size={13} className="text-amber-400 mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-rose-500/[0.06] rounded-xl p-5 border border-rose-500/[0.1]">
              <p className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock size={13} /> Após 24 horas
              </p>
              <ul className="space-y-2">
                {IMPACTOS_24H.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                    <AlertTriangle size={13} className="text-rose-400 mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 bg-white/[0.03] rounded-xl p-4 border border-amber-500/[0.1]">
            <p className="text-stone-300 text-sm font-semibold leading-relaxed">
              Este protocolo organiza resposta em três camadas:{' '}
              <span className="text-amber-400">Iluminação</span>,{' '}
              <span className="text-rose-400">Alimentação e cocção</span> e{' '}
              <span className="text-blue-400">Controle térmico</span>.
            </p>
          </div>
        </motion.section>

        {/* CAMADA 1 — ILUMINAÇÃO */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-amber-500/[0.15] flex items-center justify-center">
              <Lightbulb size={16} className="text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">1. Iluminação Estratégica</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgIluminacao} alt="Sistema de iluminação em apagão" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed">
                Iluminação não é conforto — é <strong className="text-stone-200">segurança</strong>. Reduz quedas, lesões, pânico e vulnerabilidade.
              </p>
            </div>

            <motion.div
              className="space-y-3"
              variants={stagger(0.08)} initial="hidden" whileInView="visible" viewport={viewportOnce}
            >
              {NIVEIS_ILUMINACAO.map((n, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 bg-amber-500/[0.08] border border-amber-500/[0.1] rounded-xl px-5 py-4"
                  variants={staggerChild}
                >
                  <span className="text-2xl">{n.icon}</span>
                  <div>
                    <p className="text-stone-300 text-sm font-semibold">Iluminação {n.nivel}</p>
                    <p className="text-stone-500 text-xs">{n.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-rose-500 mb-3">⚠ Velas — Uso Controlado</p>
              <p className="text-stone-400 text-sm leading-relaxed mb-3">
                Risco de incêndio, monóxido de carbono e acidentes noturnos. Se usar:
              </p>
              <ul className="space-y-1.5">
                {['Base estável e resistente ao calor', 'Longe de tecidos, cortinas e papel', 'Nunca dormir com vela acesa'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                    <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* CAMADA 2 — COCÇÃO */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-rose-500/[0.15] flex items-center justify-center">
              <UtensilsCrossed size={16} className="text-rose-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">2. Cozimento em Ausência de Energia</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgCoccao} alt="Cocção segura em apagão" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed">
                Sem energia elétrica, fogão elétrico, micro-ondas e indução ficam inutilizados. Alternativas precisam ser <strong className="text-stone-200">seguras, ventiladas e controladas</strong>.
              </p>
            </div>

            <div className="bg-emerald-500/[0.08] border border-emerald-500/[0.15] rounded-xl p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-500 mb-3">🔥 Opções Seguras</p>
              <div className="space-y-3">
                {OPCOES_COCCAO.map((op, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/[0.03] rounded-lg px-4 py-3 border border-emerald-500/[0.1]">
                    <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-stone-300 text-sm font-semibold">{op.nome}</p>
                      <p className="text-stone-500 text-xs">{op.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-stone-800 text-white rounded-2xl p-6 md:p-8">
              <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-3">⚠ RISCO DE MONÓXIDO DE CARBONO</p>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                Monóxido é <strong className="text-white">invisível e letal</strong>. Nunca usar fogareiro dentro de quarto fechado, carvão em ambiente interno ou gerador dentro da casa.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-rose-400 text-[10px] font-bold uppercase tracking-wider mb-2">✖ Nunca usar</p>
                  <ul className="space-y-1.5">
                    {['Fogareiro dentro de quarto fechado', 'Carvão em ambiente interno', 'Gerador dentro da casa ou garagem'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-stone-300 text-xs">
                        <XCircle size={12} className="text-rose-400 mt-0.5 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-2">Sintomas de intoxicação</p>
                  <ul className="space-y-1.5">
                    {SINTOMAS_CO.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-stone-300 text-xs">
                        <AlertTriangle size={12} className="text-amber-400 mt-0.5 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CAMADA 3 — CONSERVAÇÃO */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-500/[0.15] flex items-center justify-center">
              <Snowflake size={16} className="text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">3. Conservação de Alimentos</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgConservacao} alt="Conservação sem energia" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/[0.08] border border-blue-500/[0.15] rounded-xl p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-blue-500 mb-2">Geladeira fechada mantém frio por</p>
                <p className="text-2xl font-bold text-stone-200">4 horas <span className="text-sm font-normal text-stone-500">(porta fechada)</span></p>
                <p className="text-stone-500 text-xs mt-2">Freezer cheio: <strong className="text-stone-300">até 24 horas</strong></p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-stone-500 mb-3">Estratégia Inteligente</p>
                <ul className="space-y-1.5">
                  {[
                    'Não abrir desnecessariamente',
                    'Priorizar consumo de perecíveis',
                    'Congelar garrafas de água previamente (massa térmica)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                      <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-rose-500 mb-3">⚠ Alimentos que Estragam Primeiro</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {PERECIVEIS.map((item, i) => (
                  <span key={i} className="bg-white/[0.03] border border-rose-500/[0.1] rounded-lg px-3 py-1.5 text-stone-400 text-sm">
                    {item}
                  </span>
                ))}
              </div>
              <div className="bg-white/[0.03] rounded-lg p-3 border border-rose-500/[0.1]">
                <p className="text-rose-400 text-xs font-semibold">
                  Se temperatura ultrapassar 5°C por mais de 2 horas: <strong>descartar</strong>.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CAMADA 4 — CONTROLE TÉRMICO */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-orange-500/[0.15] flex items-center justify-center">
              <Thermometer size={16} className="text-orange-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">4. Controle Térmico</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgTermico} alt="Isolamento térmico caseiro" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed">
                Apagões em inverno ou verão são críticos. Sem climatização, o corpo precisa de estratégias passivas de controle térmico.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-500/[0.08] border border-red-500/[0.15] rounded-xl p-5">
                <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sun size={14} /> Calor Excessivo
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Ventilação cruzada (abrir janelas opostas)',
                    'Evitar atividade física intensa',
                    'Hidratação constante',
                    'Fechar cortinas no horário de pico solar',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                      <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-500/[0.08] border border-blue-500/[0.15] rounded-xl p-5">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Snowflake size={14} /> Frio Excessivo
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Vestir camadas (não uma peça grossa)',
                    'Manter cabeça e pés aquecidos',
                    'Isolar janelas com tecido ou manta térmica',
                    'Dormir em ambiente menor (concentra calor corporal)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                      <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CAMADA 5 — ENERGIA */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-emerald-500/[0.15] flex items-center justify-center">
              <Zap size={16} className="text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">5. Energia de Emergência</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgEnergia} alt="Energia alternativa de emergência" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              variants={stagger(0.08)} initial="hidden" whileInView="visible" viewport={viewportOnce}
            >
              {ENERGIA_ALT.map((e, i) => {
                const Icon = e.icon;
                return (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4"
                    variants={staggerChild}
                  >
                    <div className="w-9 h-9 rounded-full bg-emerald-500/[0.15] flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-stone-300 text-sm font-semibold">{e.nome}</p>
                      <p className="text-stone-500 text-xs">{e.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-rose-500 mb-2">⚠ Regras de Segurança — Gerador</p>
              <ul className="space-y-1.5">
                {[
                  'Sempre ao ar livre, em área aberta',
                  'Distante de janelas e aberturas de ventilação',
                  'Nunca em garagem fechada ou área coberta',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                    <AlertTriangle size={13} className="text-rose-400 mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* PROTOCOLO DE AÇÃO */}
        <motion.section
          className="bg-stone-800 text-white rounded-2xl p-6 md:p-10 mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Shield size={18} className="text-amber-400" />
            Protocolo de Ação em Apagão
          </h2>

          <div className="space-y-4">
            {[
              {
                fase: 'Primeiras 2 horas',
                acoes: ['Confirmar extensão do apagão', 'Desligar aparelhos sensíveis', 'Organizar iluminação estratégica'],
                cor: 'text-emerald-400',
              },
              {
                fase: 'Primeiras 12 horas',
                acoes: ['Ajustar alimentação (priorizar perecíveis)', 'Reduzir abertura da geladeira', 'Racionar baterias e power banks'],
                cor: 'text-amber-400',
              },
              {
                fase: 'Após 24 horas',
                acoes: ['Priorizar consumo de perecíveis restantes', 'Avaliar necessidade de deslocamento', 'Monitorar comunicação via rádio AM/FM'],
                cor: 'text-rose-400',
              },
            ].map((p, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${p.cor} flex items-center gap-2`}>
                  <Clock size={13} /> {p.fase}
                </p>
                <ul className="space-y-1.5">
                  {p.acoes.map((a, j) => (
                    <li key={j} className="flex items-start gap-2 text-stone-300 text-sm">
                      <CheckCircle2 size={13} className="text-white/30 mt-0.5 shrink-0" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ERROS COMUNS */}
        <motion.section
          className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-2xl p-6 md:p-10 mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <h2 className="text-lg font-bold text-stone-200 mb-5 flex items-center gap-2">
            <AlertTriangle size={18} className="text-rose-500" />
            Erros Comuns
          </h2>
          <ul className="space-y-3">
            {ERROS.map((erro, i) => (
              <li key={i} className="flex items-start gap-3 bg-white/[0.03] rounded-xl px-4 py-3 border border-rose-500/[0.1]">
                <XCircle size={14} className="text-rose-400 mt-0.5 shrink-0" />
                <span className="text-stone-400 text-sm">{erro}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* PRINCÍPIO CENTRAL */}
        <motion.div
          className="text-center mt-12"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="bg-stone-800 rounded-2xl p-8 md:p-10">
            <Flame className="text-amber-400 mx-auto mb-4" size={28} />
            <p className="text-white text-lg md:text-xl font-bold leading-relaxed max-w-lg mx-auto">
              Quem tem protocolo não improvisa.
            </p>
            <p className="text-stone-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
              Apagão pode ser climático, técnico, estrutural ou sistêmico. Improviso gera risco. Organização gera controle.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
    </>
  );
}
