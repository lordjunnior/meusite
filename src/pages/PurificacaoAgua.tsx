import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Droplets, Flame, FlaskConical, Layers, CloudRain, Archive, AlertTriangle, CheckCircle2, XCircle, Shield, Eye, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerChild, viewportOnce } from '@/lib/motion';
import CinematicHero from '@/components/CinematicHero';

import imgFervura from '@/assets/agua-fervura.webp';
import imgCloracao from '@/assets/agua-cloracao.webp';
import imgFiltro from '@/assets/agua-filtro.webp';
import imgArmazenamento from '@/assets/agua-armazenamento.webp';
import BackToHome from '@/components/BackToHome';

const RISCOS_SANITARIOS = [
  'Diarreia infecciosa',
  'Hepatite A',
  'Giardíase',
  'Leptospirose',
  'Cólera (cenários extremos)',
];

const CAMADAS_FILTRO = [
  { nome: 'Pedra grossa', desc: 'Retém detritos maiores.', cor: 'bg-stone-400' },
  { nome: 'Brita', desc: 'Filtra partículas médias.', cor: 'bg-stone-500' },
  { nome: 'Areia grossa', desc: 'Remove sedimentos visíveis.', cor: 'bg-amber-400' },
  { nome: 'Areia fina', desc: 'Filtra partículas menores.', cor: 'bg-amber-300' },
  { nome: 'Carvão vegetal triturado', desc: 'Absorve compostos orgânicos e odores.', cor: 'bg-stone-800' },
  { nome: 'Tecido limpo', desc: 'Barreira final de partículas finas.', cor: 'bg-white border border-stone-300' },
];

const FONTES_AGUA = [
  { prioridade: 1, fonte: 'Água da chuva', nota: 'Coleta direta, descartar primeira chuva.', seguranca: 'Alta' },
  { prioridade: 2, fonte: 'Nascente corrente', nota: 'Preferencialmente em área não urbana.', seguranca: 'Alta' },
  { prioridade: 3, fonte: 'Rio corrente', nota: 'Longe de fontes de poluição.', seguranca: 'Média' },
  { prioridade: 4, fonte: 'Poço', nota: 'Verificar proximidade com fossas.', seguranca: 'Média' },
  { prioridade: 5, fonte: 'Água parada', nota: 'Último recurso. Tratamento obrigatório.', seguranca: 'Baixa' },
];

const SINAIS_CONTAMINACAO = [
  'Odor forte ou incomum',
  'Cor alterada (amarela, marrom, esverdeada)',
  'Espuma na superfície',
  'Presença de óleo ou película',
  'Animais mortos nas proximidades',
];

const PROTOCOLOS_DECISAO = [
  { situacao: 'Clara + Fonte desconhecida', acao: 'Filtrar + Clorar', cor: 'border-blue-500/[0.15] bg-blue-500/[0.06]' },
  { situacao: 'Turva', acao: 'Filtrar → Fervura', cor: 'border-amber-500/[0.15] bg-amber-500/[0.06]' },
  { situacao: 'Enchente', acao: 'Evitar. Se inevitável: Filtrar + Fervura + Cloração', cor: 'border-rose-500/[0.15] bg-rose-500/[0.06]' },
];

const ERROS = [
  'Beber água "porque parece limpa"',
  'Não esperar 30 minutos após clorar',
  'Armazenar em recipiente sujo ou aberto',
  'Usar carvão com aditivos químicos',
  'Não proteger reservatório da luz solar',
];

export default function PurificacaoAgua() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Purificação de Água — 4 Métodos de Emergência | Lord Junnior</title>
        <meta name="description" content="Aprenda a purificar água em emergências: fervura, cloração, filtração e destilação solar. Guia prático de sobrevivência para tornar qualquer água potável." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/purificacao-agua" />
      </Helmet>
    <div className="min-h-screen selection:bg-blue-300/30" style={{ background: '#050808' }}>
      <CinematicHero
        image="/heroes/purificacao-agua.webp"
        phase="Fase 01 · Base 72"
        title="Purificação de Água"
        subtitle="Fervura, cloração e filtração improvisada. Métodos validados em protocolos de defesa civil para ambientes com recursos limitados."
        icon={Droplets}
        accentColor="blue"
      />

      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-12 pb-32">

        {/* CONTEXTO */}
        <motion.section
          className="bg-blue-500/[0.08] border border-blue-500/[0.15] rounded-2xl p-6 md:p-10 mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <h2 className="text-lg font-bold text-stone-200 mb-4 flex items-center gap-2">
            <Shield size={18} className="text-blue-500" />
            Por que este protocolo é crítico?
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-5">
            Sem água potável, o risco sanitário se instala antes da fome.
            Após desastres, os principais surtos registrados envolvem:
          </p>
          <ul className="space-y-2 mb-5">
            {RISCOS_SANITARIOS.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-stone-400 text-sm">
                <AlertTriangle size={14} className="text-blue-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="bg-white/[0.03] rounded-xl p-4 border border-blue-500/[0.1]">
            <p className="text-stone-300 text-sm font-semibold leading-relaxed">
              Água aparentemente limpa não significa água segura. Este módulo estrutura três métodos operacionais validados:{' '}
              <span className="text-blue-400">Fervura</span>,{' '}
              <span className="text-amber-400">Cloração</span> e{' '}
              <span className="text-stone-400">Filtração improvisada</span>.
            </p>
          </div>
        </motion.section>

        {/* MÉTODO 1 — FERVURA */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-rose-500/[0.15] flex items-center justify-center">
              <Flame size={16} className="text-rose-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">1. Fervura — Padrão Ouro</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgFervura} alt="Fervura segura de água" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed">
                A fervura é o método mais seguro e universal. Elimina <strong className="text-stone-200">bactérias</strong>, <strong className="text-stone-200">vírus</strong> e <strong className="text-stone-200">protozoários</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-rose-500 mb-3">🔥 Procedimento Correto</p>
                <ul className="space-y-2 text-stone-400 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                    Levar a água a ebulição vigorosa (bolhas contínuas)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                    Manter fervura por <strong className="text-stone-300">1 minuto</strong> (até 2.000m de altitude)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                    Manter por <strong className="text-stone-300">3 minutos</strong> (acima de 2.000m)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                    Deixar esfriar naturalmente, com recipiente fechado
                  </li>
                </ul>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-stone-500 mb-3">⚠ Pontos Críticos</p>
                <ul className="space-y-2 text-stone-400 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle size={13} className="text-rose-400 mt-0.5 shrink-0" />
                    NÃO remove metais pesados
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={13} className="text-rose-400 mt-0.5 shrink-0" />
                    NÃO remove agrotóxicos
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={13} className="text-rose-400 mt-0.5 shrink-0" />
                    Pode concentrar contaminantes químicos se evaporar demais
                  </li>
                </ul>
                <div className="mt-4 bg-emerald-500/[0.08] rounded-lg p-3 border border-emerald-500/[0.1]">
                  <p className="text-emerald-400 text-xs font-semibold">Indicada para: água de rio, água de chuva, reservatório suspeito</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* MÉTODO 2 — CLORAÇÃO */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-amber-500/[0.15] flex items-center justify-center">
              <FlaskConical size={16} className="text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">2. Cloração — Desinfecção Química Controlada</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgCloracao} alt="Cloração controlada de água" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed">
                Método amplamente utilizado por sistemas públicos de abastecimento. Baseado em <strong className="text-stone-200">hipoclorito de sódio</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-xl p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-amber-400 mb-3">💉 Dosagem Padrão (Água Clara)</p>
                <div className="space-y-3">
                  <div className="bg-white/[0.03] rounded-lg p-3 border border-amber-500/[0.1]">
                    <p className="text-stone-300 text-sm font-bold">2 gotas <span className="text-stone-500 font-normal">de hipoclorito a 2–2,5% por litro</span></p>
                  </div>
                  <ul className="space-y-1.5 text-stone-400 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                      Misturar bem
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                      Aguardar <strong className="text-stone-300">30 minutos</strong>
                    </li>
                  </ul>
                  <div className="bg-rose-500/[0.08] rounded-lg p-3 border border-rose-500/[0.1] mt-2">
                    <p className="text-stone-400 text-xs">Se água turva: filtrar primeiro e usar <strong className="text-stone-300">4 gotas por litro</strong></p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-stone-500 mb-2">🧠 Teste de Eficácia</p>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    Após 30 minutos, deve haver <strong className="text-stone-300">leve odor de cloro</strong>. Se não houver: repetir metade da dose e aguardar mais 15 minutos.
                  </p>
                </div>

                <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-5">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-rose-500 mb-2">⚠ Contraindicações</p>
                  <ul className="space-y-1.5 text-stone-400 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle size={13} className="text-rose-400 mt-0.5 shrink-0" />
                      Não misturar com vinagre
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={13} className="text-rose-400 mt-0.5 shrink-0" />
                      Não usar água sanitária perfumada
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={13} className="text-rose-400 mt-0.5 shrink-0" />
                      Não usar produtos com detergente
                    </li>
                  </ul>
                </div>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-stone-500 mb-2">🧪 Armazenamento do Hipoclorito</p>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    Após aberto, perde potência progressivamente. Armazenar em <strong className="text-stone-300">local escuro</strong>, recipiente fechado, longe do calor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* MÉTODO 3 — FILTRAÇÃO */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
              <Layers size={16} className="text-stone-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">3. Filtração Improvisada</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgFiltro} alt="Filtro improvisado em camadas" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed">
                Filtrar <strong className="text-stone-200">não é o mesmo que purificar</strong>. A filtração remove partículas, sedimentos e parte de protozoários, mas <strong className="text-rose-400">não elimina vírus</strong>.
                Por isso, idealmente: <strong className="text-stone-300">Filtrar + Fervura ou Cloração</strong>.
              </p>
            </div>

            <div className="bg-stone-800 text-white rounded-2xl p-6 md:p-8">
              <p className="text-[10px] font-bold tracking-widest uppercase text-blue-400 mb-4">🧱 Filtro Improvisado em Camadas</p>
              <p className="text-stone-400 text-xs mb-5">Recipiente: Garrafa PET cortada ou balde adaptado. De cima para baixo:</p>
              <motion.div
                className="space-y-2"
                variants={stagger(0.08)} initial="hidden" whileInView="visible" viewport={viewportOnce}
              >
                {CAMADAS_FILTRO.map((c, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-3"
                    variants={staggerChild}
                  >
                    <div className={`w-4 h-4 rounded-full ${c.cor} shrink-0`} />
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">{c.nome}</p>
                      <p className="text-stone-400 text-xs">{c.desc}</p>
                    </div>
                    {i < CAMADAS_FILTRO.length - 1 && (
                      <ArrowDown size={12} className="text-stone-500" />
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-5 bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
                <p className="text-rose-300 text-xs font-semibold">
                  ⚠ Usar carvão vegetal puro. Não usar carvão com aditivos, aceleradores ou resíduos químicos.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* COLETA SEGURA */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-500/[0.15] flex items-center justify-center">
              <CloudRain size={16} className="text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">4. Coleta Segura de Água</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed mb-4">
                Nem toda fonte é igual. Prioridade de segurança em ordem decrescente:
              </p>

              <div className="space-y-2">
                {FONTES_AGUA.map((f) => (
                  <div key={f.prioridade} className="flex items-center gap-4 bg-white/[0.04] rounded-xl px-4 py-3 border border-white/[0.06]">
                    <span className="text-blue-400 text-lg font-bold w-6 text-center">{f.prioridade}</span>
                    <div className="flex-1">
                      <p className="text-stone-300 text-sm font-semibold">{f.fonte}</p>
                      <p className="text-stone-500 text-xs">{f.nota}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      f.seguranca === 'Alta' ? 'bg-emerald-500/[0.15] text-emerald-400' :
                      f.seguranca === 'Média' ? 'bg-amber-500/[0.15] text-amber-400' :
                      'bg-rose-500/[0.15] text-rose-400'
                    }`}>
                      {f.seguranca}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-rose-500 mb-2">⚠ Água de Enchente</p>
              <p className="text-stone-400 text-sm leading-relaxed">
                Risco elevado de contaminação fecal, produtos químicos, óleos e combustíveis. <strong className="text-rose-400">Evitar sempre que possível</strong>.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ARMAZENAMENTO */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-500/[0.15] flex items-center justify-center">
              <Archive size={16} className="text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">5. Armazenamento Correto</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgArmazenamento} alt="Armazenamento seguro de água" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              Água tratada pode se contaminar novamente. Regras essenciais:
            </p>
            <ul className="space-y-2">
              {[
                'Recipiente limpo e fechado',
                'Não introduzir mãos no recipiente',
                'Usar concha exclusiva para servir',
                'Armazenar longe do sol direto',
                'Rotacionar estoque a cada 6 meses',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                  <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* SINAIS DE CONTAMINAÇÃO */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-amber-500/[0.15] flex items-center justify-center">
              <Eye size={16} className="text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">6. Sinais de Água Possivelmente Contaminada</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-xl p-5">
              <ul className="space-y-2">
                {SINAIS_CONTAMINACAO.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                    <AlertTriangle size={13} className="text-amber-500 mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-5">
              <p className="text-rose-400 text-sm font-semibold leading-relaxed">
                ⚠ Atenção: Água contaminada pode ser invisivelmente perigosa. Aspecto limpo não é garantia de segurança.
              </p>
            </div>
          </div>
        </motion.section>

        {/* PROTOCOLO RÁPIDO */}
        <motion.section
          className="bg-stone-800 text-white rounded-2xl p-6 md:p-10 mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Shield size={18} className="text-blue-400" />
            Protocolo Rápido de Decisão
          </h2>

          <div className="space-y-3">
            {PROTOCOLOS_DECISAO.map((p, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <div className="flex-1">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Se a água for:</p>
                  <p className="text-white text-sm font-bold">{p.situacao}</p>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <p className="text-blue-300 text-sm font-semibold">→ {p.acao}</p>
                </div>
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
            <Droplets className="text-blue-400 mx-auto mb-4" size={28} />
            <p className="text-white text-lg md:text-xl font-bold leading-relaxed max-w-lg mx-auto">
              Sem água segura, todo o restante colapsa.
            </p>
            <p className="text-stone-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
              Desidratação pode ocorrer em 24 horas. Infecção pode iniciar em 48 horas. Controle hídrico é prioridade absoluta nas primeiras 72 horas.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
    </>
  );
}
