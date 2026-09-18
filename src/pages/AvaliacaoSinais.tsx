import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, AlertTriangle, Thermometer, Heart, Wind, Droplets, Brain, CheckCircle2, XCircle, Clock, ClipboardList, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerChild, viewportOnce } from '@/lib/motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgTemperatura from '@/assets/sinais-temperatura.webp';
import imgPerfusao from '@/assets/sinais-perfusao.webp';
import imgDesidratacao from '@/assets/sinais-desidratacao.webp';
import imgAvpu from '@/assets/sinais-avpu.webp';
import imgFicha from '@/assets/sinais-ficha.webp';
import BackToHome from '@/components/BackToHome';

const AvaliacaoSinais = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Avaliação de Sinais Vitais: Interpretação Clínica com Recursos Mínimos | Lord Junnior</title>
        <meta name="description" content="Como avaliar sinais vitais sem equipamento hospitalar. Temperatura, pulso, perfusão, desidratação e escala AVPU. Faixas numéricas e critérios de decisão para cenários de crise." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/avaliacao-sinais" />
        <meta property="og:title" content="Avaliação de Sinais Vitais: Diagnóstico Essencial de Campo" />
        <meta property="og:description" content="6 pilares de avaliação funcional com faixas numéricas. Saiba quando agir e quando buscar ajuda profissional." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/avaliacao-sinais" />
      </Helmet>
    <div className="min-h-screen text-stone-100" style={{ background: 'linear-gradient(180deg, #050808 0%, #0a0d0a 8%, #0d120d 20%, #0a0d0a 60%, #050808 100%)' }}>
      <CinematicHero
        image="/heroes/avaliacao-sinais.webp"
        phase="Fase 02 · Autonomia Biológica"
        title="Avaliação Básica de Sinais"
        subtitle="Interpretação Clínica Essencial com Recursos Mínimos"
        icon={Activity}
        accentColor="blue"
        backLink="/soberania-organica"
        backLabel="Soberania Orgânica"
      />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* ─── INTRO ─── */}
        <motion.section initial="hidden" animate="visible" variants={stagger(0.1)} className="mb-20">
          <motion.div variants={staggerChild} className="max-w-3xl space-y-4 text-stone-400 leading-relaxed">
            <p>Este módulo ensina a interpretar sinais fisiológicos primários com precisão prática.</p>
            <div className="bg-sky-500/10 border border-sky-500/20 p-4 rounded-xl">
              <p className="text-sm text-stone-300">
                Avaliação básica de sinais <span className="text-red-400 font-bold">não é diagnóstico médico.</span>
              </p>
              <p className="text-sm text-sky-400 font-semibold mt-1">É triagem funcional.</p>
              <p className="text-sm text-stone-400 mt-2">É a capacidade de responder à pergunta: <span className="text-stone-300 font-medium italic">O corpo está compensando ou está falhando?</span></p>
            </div>
            <p className="text-sm">Quando o organismo está sob estresse (infecção, trauma, desidratação, hipoglicemia, inflamação), ele altera padrões fisiológicos previsíveis.</p>
            <p className="text-sm text-stone-300 font-medium">Quem sabe ler esses padrões:</p>
            <div className="grid grid-cols-2 gap-2">
              {['Detecta agravamento precoce', 'Evita negligência perigosa', 'Ganha tempo crítico', 'Toma decisão fundamentada'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                  <span className="text-stone-300">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-8 max-w-3xl">
            <p className="text-stone-300 font-bold text-sm mb-4 uppercase tracking-wider">Os 6 Pilares da Avaliação Funcional</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'Temperatura', icon: Thermometer, color: 'text-red-400' },
                { label: 'Frequência cardíaca', icon: Heart, color: 'text-rose-400' },
                { label: 'Frequência respiratória', icon: Wind, color: 'text-sky-400' },
                { label: 'Perfusão periférica', icon: Activity, color: 'text-purple-400' },
                { label: 'Estado de hidratação', icon: Droplets, color: 'text-blue-400' },
                { label: 'Nível de consciência', icon: Brain, color: 'text-amber-400' },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2 text-sm bg-white/[0.04] border border-white/[0.06] p-3 rounded-xl">
                  <p.icon size={16} className={`${p.color} shrink-0`} />
                  <span className="text-stone-300">{p.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-3">Cada um deles revela algo diferente.</p>
          </motion.div>
        </motion.section>

        {/* 1 — TEMPERATURA CORPORAL */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase">Pilar 01</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-stone-100">Temperatura Corporal</h2>
            <p className="text-stone-500 text-sm">Termorregulação</p>
          </motion.div>

          <motion.div variants={staggerChild} className="mb-10 rounded-xl overflow-hidden relative">
            <img src={imgTemperatura} alt="Escala térmica" className="w-full h-64 md:h-80 object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-mono tracking-widest uppercase text-red-400/70">Hipotermia · Normal · Febre · Hiperpirexia</span>
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="max-w-3xl space-y-4 text-stone-400 mb-8">
            <p className="text-sm">É o equilíbrio entre <span className="text-stone-300">produção metabólica de calor</span> e <span className="text-stone-300">perda térmica para o ambiente.</span></p>
            <p className="text-sm">O centro regulador está no <span className="text-stone-300 font-medium">hipotálamo.</span> Quando há infecção, o corpo aumenta o "set point" térmico.</p>
            <p className="text-sm">Isso causa: <span className="text-stone-300">tremores, vasoconstrição, sensação de frio.</span> Depois que atinge a nova meta, surge calor e sudorese.</p>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/30 to-transparent border border-red-800/20 p-6 md:p-8 rounded-xl mb-4">
            <h3 className="text-lg font-bold text-stone-200 mb-4">Faixas Numéricas Completas</h3>
            <div className="space-y-2">
              {[
                { situacao: 'Normal', valor: '36,0°C – 37,4°C', color: 'text-green-400', bg: 'bg-green-500/10' },
                { situacao: 'Febrícula', valor: '37,5°C – 37,9°C', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                { situacao: 'Febre', valor: '≥ 38,0°C', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                { situacao: 'Febre alta', valor: '≥ 39,0°C', color: 'text-orange-400', bg: 'bg-orange-500/10' },
                { situacao: 'Hiperpirexia (emergência)', valor: '≥ 40°C', color: 'text-red-400', bg: 'bg-red-500/10' },
                { situacao: 'Hipotermia leve', valor: '35°C – 35,9°C', color: 'text-sky-400', bg: 'bg-sky-500/10' },
                { situacao: 'Hipotermia moderada', valor: '32°C – 34,9°C', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { situacao: 'Hipotermia grave', valor: '< 32°C', color: 'text-blue-500', bg: 'bg-blue-600/10' },
              ].map((row) => (
                <div key={row.situacao} className={`flex items-center justify-between ${row.bg} border border-white/5 px-4 py-2.5 rounded-xl`}>
                  <span className={`text-sm font-medium ${row.color}`}>{row.situacao}</span>
                  <span className="text-sm text-stone-300 font-mono">{row.valor}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-amber-950/20 to-transparent border border-amber-800/15 p-6 md:p-8 rounded-xl mb-4">
            <h3 className="text-lg font-bold text-stone-200 mb-4">O que a febre pode indicar?</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {['Infecção viral', 'Infecção bacteriana', 'Desidratação', 'Inflamação sistêmica', 'Insolação', 'Reação imunológica'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-stone-300">
                  <Activity size={12} className="text-amber-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/30 to-transparent border border-red-600/30 p-6 md:p-8 rounded-xl mb-4">
            <h3 className="text-lg font-bold text-stone-200 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-400" />
              Sinais de Alerta com Febre
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {['Confusão mental', 'Rigidez de nuca', 'Manchas na pele', 'Convulsão', 'Prostração extrema', 'Febre em bebê < 3 meses'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/15 p-3 rounded-xl">
                  <AlertTriangle size={12} className="text-red-400 shrink-0" />
                  <span className="text-stone-300">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/20 to-transparent border border-green-800/15 p-6 md:p-8 rounded-xl">
            <h3 className="text-lg font-bold text-stone-200 mb-4">Como Medir Corretamente</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { local: 'Axilar', passos: ['Pele seca', 'Termômetro centralizado', 'Braço pressionado contra o corpo'] },
                { local: 'Oral', passos: ['Não ingerir líquidos quentes/frios 20 min antes'] },
                { local: 'Timpânica', passos: ['Canal auditivo limpo'] },
              ].map((m) => (
                <div key={m.local} className="bg-white/[0.04] border border-white/[0.06] p-4 rounded-xl">
                  <h4 className="font-bold text-stone-200 text-sm mb-2">{m.local}</h4>
                  {m.passos.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-400 mb-1">
                      <span className="text-green-400 mt-0.5">•</span>
                      {p}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* 2 — FREQUÊNCIA CARDÍACA */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase">Pilar 02</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-stone-100">Frequência Cardíaca</h2>
            <p className="text-stone-500 text-sm">Perfusão e Compensação</p>
          </motion.div>

          <motion.div variants={staggerChild} className="mb-10 rounded-xl overflow-hidden relative">
            <img src={imgPerfusao} alt="Teste de perfusão capilar" className="w-full h-64 md:h-80 object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-mono tracking-widest uppercase text-rose-400/70">Perfusão Capilar · Compensação · Taquicardia</span>
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="max-w-3xl space-y-3 text-stone-400 mb-8">
            <p className="text-sm">O coração acelera quando o corpo precisa compensar algo. Ele acelera em:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Febre (+10 bpm/°C)', 'Dor intensa', 'Ansiedade', 'Hemorragia', 'Desidratação', 'Infecção sistêmica'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-stone-300">
                  <Heart size={10} className="text-rose-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-rose-950/30 to-transparent border border-rose-800/20 p-6 md:p-8 rounded-xl mb-4">
            <h3 className="text-lg font-bold text-stone-200 mb-4">Faixas por Idade</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { grupo: 'Adulto', faixa: '60–100 bpm' },
                { grupo: 'Atleta', faixa: '50–60 bpm' },
                { grupo: 'Criança', faixa: '70–120 bpm' },
                { grupo: 'Bebê', faixa: '100–160 bpm' },
              ].map((f) => (
                <div key={f.grupo} className="bg-white/[0.04] border border-white/[0.06] p-4 rounded-xl text-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-500">{f.grupo}</span>
                  <p className="text-lg font-bold text-rose-400 mt-1">{f.faixa}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/30 to-transparent border border-red-600/30 p-6 md:p-8 rounded-xl mb-4">
            <h3 className="text-lg font-bold text-stone-200 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-400" />
              Taquicardia de Alerta
            </h3>
            <div className="space-y-2 mb-4">
              {['Adulto em repouso > 120 bpm', 'Pulso fraco e rápido', 'Pulso irregular'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/15 p-3 rounded-xl">
                  <AlertTriangle size={12} className="text-red-400 shrink-0" />
                  <span className="text-stone-300">{s}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-500 font-mono mb-2">Pode indicar:</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {['Desidratação grave', 'Hemorragia', 'Choque', 'Infecção sistêmica'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-stone-300">
                  <Activity size={10} className="text-amber-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-purple-950/20 to-transparent border border-purple-800/15 p-6 md:p-8 rounded-xl">
            <h3 className="text-lg font-bold text-stone-200 mb-4">Como Avaliar Perfusão</h3>
            <div className="space-y-2 mb-4">
              {['Pressione a unha por 2 segundos.', 'Solte.', 'A cor deve retornar em até 2 segundos.'].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-stone-300">
                  <span className="text-[10px] font-mono text-purple-400 w-4 shrink-0 mt-0.5">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
              <p className="text-xs text-stone-300">Se demorar mais → <span className="text-amber-400 font-semibold">possível baixa perfusão.</span></p>
            </div>
          </motion.div>
        </motion.section>

        {/* 3 — FREQUÊNCIA RESPIRATÓRIA */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase">Pilar 03</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-stone-100">Frequência Respiratória</h2>
            <p className="text-stone-500 text-sm">O sinal mais subestimado</p>
          </motion.div>

          <motion.div variants={staggerChild} className="max-w-3xl mb-8">
            <div className="bg-sky-500/10 border border-sky-500/20 p-4 rounded-xl">
              <p className="text-sm text-stone-300 font-medium">Respiração altera <span className="text-sky-400 font-bold">antes do pulso.</span></p>
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-sky-950/30 to-transparent border border-sky-800/20 p-6 md:p-8 rounded-xl mb-4">
            <h3 className="text-lg font-bold text-stone-200 mb-4">Valores Normais</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { grupo: 'Adulto', faixa: '12–20 rpm' },
                { grupo: 'Criança', faixa: '20–30 rpm' },
                { grupo: 'Bebê', faixa: '30–50 rpm' },
              ].map((f) => (
                <div key={f.grupo} className="bg-white/[0.04] border border-white/[0.06] p-4 rounded-xl text-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-500">{f.grupo}</span>
                  <p className="text-lg font-bold text-sky-400 mt-1">{f.faixa}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-amber-950/20 to-transparent border border-amber-800/15 p-6 md:p-8 rounded-xl mb-4">
            <h3 className="text-lg font-bold text-stone-200 mb-2">Taquipneia (respiração acelerada)</h3>
            <p className="text-sm text-stone-300 mb-4">Adulto <span className="text-amber-400 font-bold">&gt; 24 rpm</span> em repouso</p>
            <p className="text-xs text-stone-500 font-mono mb-2">Pode indicar:</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {['Infecção pulmonar', 'Ansiedade severa', 'Dor intensa', 'Acidose metabólica', 'Choque'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-stone-300">
                  <Wind size={10} className="text-amber-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/30 to-transparent border border-red-600/30 p-6 md:p-8 rounded-xl">
            <h3 className="text-lg font-bold text-stone-200 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-400" />
              Sinais de Alerta Respiratório
            </h3>
            <div className="space-y-2">
              {['Uso de musculatura do pescoço', 'Retração intercostal', 'Lábios arroxeados', 'Pausas respiratórias', 'Gemido respiratório em criança'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/15 p-3 rounded-xl">
                  <AlertTriangle size={12} className="text-red-400 shrink-0" />
                  <span className="text-stone-300">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* 4 — DESIDRATAÇÃO */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase">Pilar 04</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-stone-100">Desidratação</h2>
            <p className="text-stone-500 text-sm">Volume Circulante</p>
          </motion.div>

          <motion.div variants={staggerChild} className="mb-10 rounded-xl overflow-hidden relative">
            <img src={imgDesidratacao} alt="Escala de desidratação" className="w-full h-64 md:h-80 object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/30 to-transparent" />
          </motion.div>

          <motion.div variants={staggerChild} className="max-w-3xl mb-8">
            <p className="text-sm text-stone-400 mb-3">Água mantém:</p>
            <div className="grid grid-cols-2 gap-2">
              {['Pressão sanguínea', 'Transporte de nutrientes', 'Regulação térmica', 'Função renal'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-stone-300">
                  <Droplets size={12} className="text-blue-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              { grau: 'Grau Leve (3–5%)', sintomas: ['Sede', 'Boca seca', 'Urina amarela'], color: 'from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/30', accent: 'text-yellow-400' },
              { grau: 'Grau Moderado (6–8%)', sintomas: ['Tontura', 'Taquicardia', 'Pele menos elástica', 'Redução de urina'], color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/30', accent: 'text-orange-400' },
              { grau: 'Grau Grave (>10%)', sintomas: ['Confusão', 'Extremidades frias', 'Hipotensão', 'Letargia'], color: 'from-red-500/20 to-red-600/10', border: 'border-red-500/30', accent: 'text-red-400' },
            ].map((g) => (
              <div key={g.grau} className={`bg-gradient-to-br ${g.color} border ${g.border} p-5 rounded-xl`}>
                <h4 className={`font-bold mb-3 ${g.accent}`}>{g.grau}</h4>
                {g.sintomas.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-stone-400 mb-1">
                    <span className={`${g.accent}`}>•</span>
                    {s}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-blue-950/20 to-transparent border border-blue-800/15 p-6 md:p-8 rounded-xl">
            <h3 className="text-lg font-bold text-stone-200 mb-4">Testes Funcionais</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {['Elasticidade da pele', 'Frequência urinária', 'Cor da urina', 'Perfusão capilar'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm bg-blue-500/10 border border-blue-500/15 p-3 rounded-xl">
                  <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                  <span className="text-stone-300">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* 5 — NÍVEL DE CONSCIÊNCIA */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase">Pilar 05</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-stone-100">Nível de Consciência</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="mb-10 rounded-xl overflow-hidden relative">
            <img src={imgAvpu} alt="Escala AVPU" className="w-full h-64 md:h-80 object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-mono tracking-widest uppercase text-amber-400/70">Escala AVPU</span>
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="max-w-3xl mb-8">
            <p className="text-sm text-stone-400 mb-4">Avaliar: A pessoa está alerta? Confusa? Sonolenta? Não responde?</p>
          </motion.div>

          <motion.div variants={staggerChild} className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[
              { letra: 'A', nome: 'Alerta', desc: 'Responde espontaneamente', color: 'from-green-500/20 to-green-600/10', border: 'border-green-500/30', accent: 'text-green-400' },
              { letra: 'V', nome: 'Voz', desc: 'Responde à voz', color: 'from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/30', accent: 'text-yellow-400' },
              { letra: 'P', nome: 'Dor', desc: 'Responde à dor', color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/30', accent: 'text-orange-400' },
              { letra: 'U', nome: 'Não responde', desc: 'Sem resposta', color: 'from-red-500/20 to-red-600/10', border: 'border-red-500/30', accent: 'text-red-400' },
            ].map((level) => (
              <div key={level.letra} className={`bg-gradient-to-br ${level.color} border ${level.border} p-5 rounded-xl text-center`}>
                <span className={`text-3xl font-black ${level.accent}`}>{level.letra}</span>
                <p className="text-sm font-bold text-stone-200 mt-2">{level.nome}</p>
                <p className="text-xs text-stone-500 mt-1">{level.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={staggerChild} className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
            <p className="text-sm text-stone-300 flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-400 shrink-0" />
              <span><span className="text-red-400 font-bold">Alteração súbita → emergência.</span></span>
            </p>
          </motion.div>
        </motion.section>

        {/* 6 — CRITÉRIOS OBJETIVOS PARA DECISÃO */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase">Pilar 06</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-stone-100">Critérios Objetivos para Decisão</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/40 to-transparent border border-red-600/30 p-6 md:p-8 rounded-xl mb-4">
            <h3 className="text-lg font-bold text-stone-200 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-400" />
              Buscar atendimento imediato se houver:
            </h3>
            <div className="space-y-2">
              {['Temperatura ≥ 40°C', 'Pulso ≥ 130 bpm em repouso', 'Respiração ≥ 30 rpm em adulto', 'Perfusão capilar > 3 segundos', 'Confusão mental', 'Desidratação grave', 'Convulsão'].map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/15 p-3 rounded-xl">
                  <CheckCircle2 size={14} className="text-red-400 shrink-0" />
                  <span className="text-stone-300">{c}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* 7 — REGISTRO E EVOLUÇÃO */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase">Registro</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-stone-100">Registro e Evolução</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="mb-10 rounded-xl overflow-hidden relative">
            <img src={imgFicha} alt="Ficha de monitoramento clínico" className="w-full h-64 md:h-80 object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/30 to-transparent" />
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/20 to-transparent border border-green-800/15 p-6 md:p-8 rounded-xl mb-4">
            <p className="text-sm text-stone-400 mb-4">Monitorar evolução permite identificar tendência.</p>
            <h3 className="text-lg font-bold text-stone-200 mb-4">Registrar:</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {['Data', 'Hora', 'Temperatura', 'Pulso', 'Respiração', 'Hidratação', 'Consciência'].map((field) => (
                <div key={field} className="flex items-center gap-2 text-sm bg-green-500/10 border border-green-500/15 p-3 rounded-xl">
                  <ClipboardList size={14} className="text-green-400 shrink-0" />
                  <span className="text-stone-300">{field}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-4 border-t border-white/5 pt-3 flex items-center gap-2">
              <Clock size={12} className="text-green-400" />
              Reavaliar a cada 4–6 horas.
            </p>
          </motion.div>
        </motion.section>

        {/* ─── CONCLUSÃO ─── */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-sky-500/10 border border-sky-500/20 p-6 rounded-xl mb-6">
          <p className="text-sm text-stone-300 leading-relaxed">
            Avaliação básica de sinais <span className="text-red-400 font-bold">não substitui médico.</span> Mas evita negligência. Ela transforma observação leiga em <span className="text-sky-400 font-semibold">triagem estruturada.</span>
          </p>
          <p className="text-sm text-stone-300 mt-2">Você passa a enxergar padrões. E <span className="text-green-400 font-bold">padrões salvam tempo.</span></p>
        </motion.div>

        {/* ─── DISCLAIMER ─── */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-amber-950/20 border border-amber-800/30 p-6 rounded-xl mb-12">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-300 mb-1">Aviso Legal</p>
              <p className="text-xs text-stone-500 leading-relaxed">
                Este conteúdo é de caráter educativo e informativo, baseado em referências clínicas validadas. Não substitui avaliação médica profissional. Em emergências, acione o SAMU (192) ou Corpo de Bombeiros (193).
              </p>
            </div>
          </div>
        </motion.div>

        <MicroCtaResistencia variant="saude" />

        {/* ─── NAV FOOTER ─── */}
        <div className="flex items-center justify-between pt-8 border-t border-white/[0.06]">
          <Link to="/soberania-organica" className="text-stone-500 hover:text-emerald-400 transition-colors text-sm font-mono flex items-center gap-2">
            <ArrowLeft size={14} />
            Soberania Orgânica
          </Link>
          <Link to="/soberania-organica/primeiros-socorros" className="text-stone-500 hover:text-emerald-400 transition-colors text-sm font-mono flex items-center gap-2">
            Primeiros Socorros
            <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </div>
      </main>
      <ScrollToTop />
    </div>
    </>
  );
};

export default AvaliacaoSinais;
