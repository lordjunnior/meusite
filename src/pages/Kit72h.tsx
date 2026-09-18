import React from 'react';
import ContraAtaquePratico from '@/components/ContraAtaquePratico';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Package, Droplets, UtensilsCrossed, FileText, Radio, Pill, AlertTriangle, CheckCircle2, XCircle, Clock, Layers, Shield, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerChild, viewportOnce } from '@/lib/motion';
import CinematicHero from '@/components/CinematicHero';

import imgAgua from '@/assets/kit72h-agua.webp';
import imgAlimento from '@/assets/kit72h-alimento.webp';
import imgDocumentos from '@/assets/kit72h-documentos.webp';
import imgRadio from '@/assets/kit72h-radio.webp';
import imgMedicamentos from '@/assets/kit72h-medicamentos.webp';
import BackToHome from '@/components/BackToHome';

const PILARES = [
  {
    id: 'agua',
    titulo: 'Água — Prioridade Absoluta',
    icon: Droplets,
    img: imgAgua,
    cor: 'text-blue-400',
    bgCor: 'bg-blue-500/10 border-blue-500/15',
    barCor: 'bg-blue-500',
  },
  {
    id: 'alimento',
    titulo: 'Alimento — Energia Funcional',
    icon: UtensilsCrossed,
    img: imgAlimento,
    cor: 'text-amber-400',
    bgCor: 'bg-amber-500/10 border-amber-500/15',
    barCor: 'bg-amber-500',
  },
  {
    id: 'documentos',
    titulo: 'Documentos e Identificação',
    icon: FileText,
    img: imgDocumentos,
    cor: 'text-stone-400',
    bgCor: 'bg-stone-500/10 border-stone-500/15',
    barCor: 'bg-stone-500',
  },
  {
    id: 'radio',
    titulo: 'Rádio — Informação É Recurso',
    icon: Radio,
    img: imgRadio,
    cor: 'text-emerald-400',
    bgCor: 'bg-emerald-500/10 border-emerald-500/15',
    barCor: 'bg-emerald-500',
  },
  {
    id: 'medicamentos',
    titulo: 'Medicamentos — Continuidade Terapêutica',
    icon: Pill,
    img: imgMedicamentos,
    cor: 'text-rose-400',
    bgCor: 'bg-rose-500/10 border-rose-500/15',
    barCor: 'bg-rose-500',
  },
];

const ALIMENTOS_SIM = [
  'Barras energéticas',
  'Castanhas e mix de oleaginosas',
  'Atum e sardinha enlatados',
  'Arroz pré-cozido',
  'Macarrão instantâneo',
  'Chocolate amargo',
  'Frutas secas',
];

const ALIMENTOS_NAO = [
  'Alimentos que exigem refrigeração',
  'Itens com preparo complexo',
  'Produtos com validade curta',
];

const DOCUMENTOS = [
  'Documento com foto (RG/CNH)',
  'CPF',
  'Cartão do SUS / convênio',
  'Receita médica atualizada',
  'Lista de contatos de emergência',
  'Comprovante de residência',
];

const MEDICAMENTOS_CRITICOS = [
  { nome: 'Insulina', risco: 'Crise hiperglicêmica' },
  { nome: 'Anti-hipertensivos', risco: 'Pico hipertensivo' },
  { nome: 'Anticonvulsivantes', risco: 'Convulsões' },
  { nome: 'Antidepressivos', risco: 'Síndrome de abstinência' },
];

const ERROS = [
  'Kit pesado demais (acima de 12% do peso corporal)',
  'Não revisar validade de alimentos e medicamentos',
  'Guardar em local inacessível durante emergência',
  'Não comunicar família sobre localização do kit',
];

const CAMADAS = [
  { camada: 1, nome: 'Documentos e comunicação', desc: 'Acesso rápido. Pasta impermeável, rádio, lanterna.', icon: FileText },
  { camada: 2, nome: 'Medicamentos', desc: 'Bolsa médica com lista de dosagens e receitas.', icon: Pill },
  { camada: 3, nome: 'Alimentos', desc: 'Itens densos por caloria. Sem refrigeração.', icon: UtensilsCrossed },
  { camada: 4, nome: 'Água', desc: 'Distribuída em múltiplos recipientes. Base da mochila.', icon: Droplets },
];

export default function Kit72h() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Kit de Sobrevivência 72h: O Guia de Prontidão Crítica | Lord Junnior</title>
        <meta name="description" content="Monte seu kit tático de 72 horas com checklist completo: água, alimento, medicamentos, documentos e comunicação. Esteja pronto antes que o caos chegue." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/kit-72h" />
        <meta property="og:title" content="Kit de Sobrevivência 72h: Prontidão Crítica para Cenários Reais" />
        <meta property="og:description" content="O checklist definitivo para autonomia mínima de 3 dias. Sem improviso, sem pânico." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/kit-72h" />
        <meta property="og:type" content="article" />
      </Helmet>
    <div className="min-h-screen selection:bg-rose-300/30" style={{ background: '#050808' }}>
      <CinematicHero
        image="/heroes/kit-72h.webp"
        phase="Fase 01 · Base 72"
        title="Kit Tático 72h"
        subtitle="Água, alimento, documentos, rádio e medicamentos para autonomia mínima de 3 dias. O Kit 72h não é mochila de sobrevivência extrema. Ele é um sistema portátil de autonomia mínima."
        icon={Package}
        accentColor="rose"
      />

      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-12 pb-32">

        {/* CONTEXTO */}
        <motion.section
          className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-2xl p-6 md:p-10 mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <h2 className="text-lg font-bold text-stone-200 mb-4 flex items-center gap-2">
            <Shield size={18} className="text-rose-500" />
            Por que 72 horas?
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-5">
            As primeiras 72 horas após um desastre natural, falha elétrica generalizada, interrupção de abastecimento,
            evacuação forçada ou bloqueio logístico são marcadas por:
          </p>
          <ul className="space-y-2">
            {[
              'Lentidão na resposta institucional',
              'Escassez temporária de recursos básicos',
              'Ruptura de canais de comunicação',
              'Sobrecarga hospitalar e de serviços de emergência',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-stone-400 text-sm">
                <AlertTriangle size={14} className="text-rose-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 bg-white/[0.03] rounded-xl p-4 border border-rose-500/[0.1]">
            <p className="text-stone-300 text-sm font-semibold leading-relaxed">
              Quem tem kit estruturado não depende da primeira onda de resposta pública.
              O Kit 72h cobre cinco pilares críticos: <span className="text-rose-400">Hidratação</span>,{' '}
              <span className="text-amber-400">Energia calórica</span>,{' '}
              <span className="text-stone-500">Identificação</span>,{' '}
              <span className="text-emerald-400">Informação</span> e{' '}
              <span className="text-rose-400">Continuidade médica</span>.
            </p>
          </div>
        </motion.section>

        {/* PILAR 1 — ÁGUA */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-500/[0.15] flex items-center justify-center">
              <Droplets size={16} className="text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">1. Água — Prioridade Absoluta</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgAgua} alt="Kit de água 72h" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed">
                O corpo humano tolera vários dias sem alimento, mas apenas <strong className="text-stone-200">48–72 horas sem água</strong> em clima quente.
                A água é necessária não apenas para beber, mas para preparar alimento, higiene mínima, dissolver medicamentos e reidratação oral.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/[0.08] border border-blue-500/[0.15] rounded-xl p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-blue-500 mb-2">Quantidade Mínima</p>
                <p className="text-2xl font-bold text-stone-200">3L <span className="text-sm font-normal text-stone-500">/pessoa/dia</span></p>
                <p className="text-stone-500 text-xs mt-1">Para 72h → <strong className="text-stone-300">9 litros por pessoa</strong></p>
                <p className="text-stone-600 text-xs mt-0.5">Se possível: 12 litros (margem de segurança)</p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-stone-500 mb-2">Estratégia Inteligente</p>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Não concentrar toda água em um único recipiente. Distribuir em <strong className="text-stone-300">garrafas individuais</strong>, <strong className="text-stone-300">galão reserva</strong> e <strong className="text-stone-300">recipiente colapsável</strong>.
                  Evita perda total por dano ou vazamento.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* PILAR 2 — ALIMENTO */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-amber-500/[0.15] flex items-center justify-center">
              <UtensilsCrossed size={16} className="text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">2. Alimento — Energia Funcional</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgAlimento} alt="Alimentos de emergência organizados" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed mb-3">
                Alimento no Kit 72h deve priorizar: <strong className="text-stone-300">alta densidade calórica</strong>, baixo volume, longa validade e preparação simples.
                Objetivo: manter energia estável, não dieta ideal.
              </p>
              <div className="bg-amber-500/[0.08] rounded-lg p-3 border border-amber-500/[0.1]">
                <p className="text-amber-400 text-xs font-semibold">Necessidade calórica média em emergência</p>
                <p className="text-stone-300 text-sm font-bold mt-1">1.800–2.200 kcal/dia <span className="text-stone-500 font-normal">(adulto sedentário)</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-500/[0.08] border border-emerald-500/[0.15] rounded-xl p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-500 mb-3">✔ Itens Estratégicos</p>
                <ul className="space-y-2">
                  {ALIMENTOS_SIM.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                      <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-rose-500 mb-3">✖ Evitar</p>
                <ul className="space-y-2">
                  {ALIMENTOS_NAO.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                      <XCircle size={14} className="text-rose-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* PILAR 3 — DOCUMENTOS */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
              <FileText size={16} className="text-stone-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">3. Documentos e Identificação</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgDocumentos} alt="Pasta de documentos de emergência" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed">
                Emergências geram deslocamento. Sem documento, você não acessa abrigo, atendimento ou transporte.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              variants={stagger(0.06)} initial="hidden" whileInView="visible" viewport={viewportOnce}
            >
              {DOCUMENTOS.map((doc, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
                  variants={staggerChild}
                >
                  <CheckCircle2 size={14} className="text-stone-500 shrink-0" />
                  <span className="text-stone-400 text-sm">{doc}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-stone-500 mb-2">Estratégia de Backup</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-stone-400 text-sm">
                  <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> Cópia plastificada
                </li>
                <li className="flex items-start gap-2 text-stone-400 text-sm">
                  <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> Versão digital em pendrive
                </li>
                <li className="flex items-start gap-2 text-stone-400 text-sm">
                  <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> Foto armazenada offline no celular
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* PILAR 4 — RÁDIO */}
        <motion.section
          className="mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-emerald-500/[0.15] flex items-center justify-center">
              <Radio size={16} className="text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">4. Rádio — Informação É Recurso</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgRadio} alt="Rádio de emergência" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed">
                Quando internet falha, rádio sobrevive. Rádio AM/FM funciona com pilha, bateria ou manivela.
                Ele informa sobre pontos de distribuição de água, abrigos, alertas de segurança e atualizações climáticas.
              </p>
            </div>

            <div className="bg-emerald-500/[0.08] border border-emerald-500/[0.15] rounded-xl p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-500 mb-3">O que o rádio fornece em emergência</p>
              <div className="grid grid-cols-2 gap-3">
                {['Pontos de distribuição de água', 'Localização de abrigos', 'Alertas de segurança', 'Atualizações climáticas'].map((item, i) => (
                  <div key={i} className="bg-white/[0.03] rounded-lg px-3 py-2 text-stone-400 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* PILAR 5 — MEDICAMENTOS */}
        <motion.section
          className="mb-14"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-rose-500/[0.15] flex items-center justify-center">
              <Pill size={16} className="text-rose-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-200">5. Medicamentos — Continuidade Terapêutica</h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-6 border border-white/[0.06]">
            <img src={imgMedicamentos} alt="Kit médico 72h" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
          </div>

          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-stone-400 text-sm leading-relaxed">
                Interrupção de medicamento pode gerar crise. Manter estoque para 3–5 dias, receita atualizada, lista de dosagens e medicamentos de uso eventual (analgésico, antitérmico, antialérgico).
              </p>
            </div>

            <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-rose-500 mb-3">⚠ Medicamentos Críticos</p>
              <div className="space-y-3">
                {MEDICAMENTOS_CRITICOS.map((med, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/[0.03] rounded-lg px-4 py-2.5 border border-rose-500/[0.1]">
                    <span className="text-stone-300 text-sm font-semibold">{med.nome}</span>
                    <span className="text-rose-400 text-xs">Risco: {med.risco}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-stone-500 mb-3">Estrutura Mínima</p>
              <ul className="space-y-1.5">
                {[
                  'Estoque para 3–5 dias de uso contínuo',
                  'Receita atualizada (cópia plastificada)',
                  'Lista de dosagens por horário',
                  'Medicamentos eventuais: analgésico, antitérmico, antialérgico',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                    <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ESTRUTURA DA MOCHILA */}
        <motion.section
          className="bg-stone-800 text-white rounded-2xl p-6 md:p-10 mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-6">
            <Layers size={18} className="text-rose-400" />
            <h2 className="text-lg font-bold">Estrutura Ideal da Mochila</h2>
          </div>
          <p className="text-stone-400 text-sm mb-6">
            Organização por camadas — do acesso mais rápido (topo) ao mais pesado (base).
            Peso ideal total: <strong className="text-white">até 10–12% do peso corporal</strong>.
          </p>

          <motion.div
            className="space-y-3"
            variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={viewportOnce}
          >
            {CAMADAS.map((c) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.camada}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4"
                  variants={staggerChild}
                >
                  <span className="text-rose-400 text-xl font-bold w-8 text-center">{c.camada}</span>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-white/70" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{c.nome}</p>
                    <p className="text-stone-400 text-xs">{c.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
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

        {/* PROTOCOLO DE MANUTENÇÃO */}
        <motion.section
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-10 mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="flex items-center gap-3 mb-5">
            <RefreshCw size={18} className="text-stone-500" />
            <h2 className="text-lg font-bold text-stone-200">Protocolo de Manutenção</h2>
          </div>
          <p className="text-stone-500 text-sm mb-5">Revisar a cada <strong className="text-stone-300">6 meses</strong>:</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Validade de alimentos',
              'Pilhas e baterias',
              'Medicamentos e receitas',
              'Atualização de documentos',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/[0.04] rounded-xl px-4 py-3 text-stone-400 text-sm">
                <Clock size={13} className="text-stone-500 shrink-0" /> {item}
              </div>
            ))}
          </div>
        </motion.section>

        {/* PRINCÍPIO BASE */}
        <motion.div
          className="text-center mt-12"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div className="bg-stone-800 rounded-2xl p-8 md:p-10">
            <Package className="text-rose-400 mx-auto mb-4" size={28} />
            <p className="text-white text-lg md:text-xl font-bold leading-relaxed max-w-lg mx-auto">
              O Kit 72h não elimina risco.
            </p>
            <p className="text-stone-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
              Ele compra tempo. Tempo é margem de decisão. E margem reduz dependência.
            </p>
          </div>
        </motion.div>


      <ContraAtaquePratico
        theme="dark"
        title="O estoque médico que não vence na prateleira"
        intro="Kit pronto de farmácia industrial é o elo mais frágil do seu módulo de 72 horas: prazo curto, dependência de indústria e nada que você saiba repor. A base médica de verdade é feita de plantas puras, preparos de boticário e técnica sua."
        links={[
          { to: '/soberania-organica/farmacia-caseira-essencial', kicker: 'Base médica', label: 'Farmácia caseira essencial: os 15 itens' },
          { to: '/soberania-organica/tinturas-xaropes-preparos', kicker: 'Técnica de preparo', label: 'Tinturas, xaropes e preparos passo a passo' },
          { to: '/soberania-organica/protocolos-gripe-resfriado', kicker: 'Protocolo agudo', label: 'O que fazer nas primeiras 48 horas' },
        ]}
      />
      </div>
    </div>
    </>
  );
}

