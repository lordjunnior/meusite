import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Bug, Shield, Droplets, Leaf, Home, AlertTriangle, CheckCircle2, XCircle, Sprout, FlaskConical, Clock, Rat, Trash2, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerChild, viewportOnce } from '@/lib/motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgRepelentes from '@/assets/vetores-repelentes.jpg';
import imgCiclo from '@/assets/vetores-ciclo-mosquito.jpg';
import imgBarreiras from '@/assets/vetores-barreiras.jpg';
import imgJardim from '@/assets/vetores-jardim-repelente.jpg';
import BackToHome from '@/components/BackToHome';

const OLEOS = [
  { nome: 'Citronela', mecanismo: 'Mascara odores corporais (CO₂, ácido lático) que atraem mosquitos.', duracao: '1–2 horas', uso: 'Corporal e ambiental', cor: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/15' },
  { nome: 'Eucalipto-limão (PMD)', mecanismo: 'Derivado natural com eficácia próxima ao DEET. Interfere nos quimiorreceptores do inseto.', duracao: 'Até 4 horas', uso: 'Corporal (principal)', cor: 'text-green-400', bg: 'bg-green-500/10 border-green-500/15' },
  { nome: 'Lavanda', mecanismo: 'Repelência leve a moderada. Ação calmante complementar.', duracao: '1–2 horas', uso: 'Ambiental e corporal', cor: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/15' },
  { nome: 'Cravo-da-índia', mecanismo: 'Eugenol interfere diretamente na detecção olfativa do inseto.', duracao: '2–3 horas', uso: 'Ambiental', cor: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/15' },
];

const CRIADOUROS = ['Pratos de plantas', 'Calhas entupidas', 'Pneus expostos', 'Garrafas abertas', 'Caixa d\'água destampada', 'Ralos externos', 'Vasos sanitários pouco usados', 'Latas e recipientes no quintal'];

const PLANTAS_REPELENTES = [
  { nome: 'Citronela', desc: 'Alta concentração aromática. Ideal para áreas externas.', eficacia: 'Alta' },
  { nome: 'Manjericão', desc: 'Ajuda a reduzir presença de moscas. Cultivo versátil.', eficacia: 'Moderada' },
  { nome: 'Hortelã', desc: 'Aroma intenso. Pode ser cultivada em vasos pequenos.', eficacia: 'Moderada' },
  { nome: 'Alecrim', desc: 'Repelência leve. Boa para varandas e áreas de convívio.', eficacia: 'Leve' },
  { nome: 'Lavanda', desc: 'Funciona como complemento. Aroma agradável.', eficacia: 'Leve' },
];

const VETORES = [
  { vetor: 'Mosquitos (Aedes)', doencas: 'Dengue, Zika, Chikungunya, Febre Amarela', icon: Bug },
  { vetor: 'Moscas', doencas: 'Contaminação alimentar, diarreia', icon: Bug },
  { vetor: 'Baratas', doencas: 'Alérgenos, bactérias intestinais', icon: Bug },
  { vetor: 'Roedores', doencas: 'Leptospirose, hantavirose', icon: Rat },
  { vetor: 'Carrapatos', doencas: 'Febre maculosa', icon: Bug },
];

const ControleVetores = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Controle de Vetores: Repelentes Naturais e Barreiras Físicas Contra Pragas | Lord Junnior</title>
        <meta name="description" content="Estratégia sanitária de baixo impacto ambiental. Óleos essenciais repelentes, eliminação de criadouros de mosquitos, barreiras físicas e plantas que afastam insetos naturalmente." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/controle-vetores" />
        <meta property="og:title" content="Controle de Vetores: Defesa Sanitária Natural" />
        <meta property="og:description" content="Repelentes naturais, eliminação de criadouros e plantas que afastam pragas. Proteção sem químicos industriais." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/controle-vetores" />
      </Helmet>
    <div className="min-h-screen text-stone-100" style={{ background: 'linear-gradient(180deg, #050808 0%, #0a0d0a 8%, #0d120d 20%, #0a0d0a 60%, #050808 100%)' }}>
      <CinematicHero
        image="/heroes/controle-vetores.webp"
        phase="Fase 02 · Autonomia Biológica"
        title="Controle de Vetores"
        subtitle="Estratégia sanitária de baixo impacto ambiental — redução de exposição, interrupção de ciclo reprodutivo e barreiras físicas"
        icon={Bug}
        accentColor="emerald"
        backLink="/soberania-organica"
        backLabel="Soberania Orgânica"
      />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <motion.section initial="hidden" animate="visible" variants={stagger(0.1)} className="mb-20">
          <motion.div variants={staggerChild} className="max-w-3xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Reduzir exposição', 'Interromper ciclo reprodutivo', 'Diminuir atração ambiental', 'Criar barreira física', 'Repelência natural eficaz', 'Prevenção contínua'].map((obj) => (
                <div key={obj} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                  <span className="text-stone-300">{obj}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-8 max-w-3xl">
            <p className="text-xs font-mono text-stone-500 uppercase tracking-wider mb-3">Vetores e doenças associadas</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {VETORES.map((v) => (
                <div key={v.vetor} className="flex items-start gap-2 bg-red-500/10 border border-red-500/15 p-3 rounded-xl">
                  <v.icon size={14} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-stone-200">{v.vetor}</span>
                    <p className="text-[10px] text-stone-500">{v.doencas}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-8 max-w-3xl bg-gradient-to-br from-green-950/30 to-transparent border border-green-800/20 p-6 rounded-xl">
            <p className="text-sm font-bold text-stone-200 mb-4">Controle eficiente combina quatro camadas:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { n: '01', label: 'Repelência', desc: 'Natural e estratégica' },
                { n: '02', label: 'Interrupção do ciclo', desc: 'Eliminação de criadouros' },
                { n: '03', label: 'Barreiras físicas', desc: 'Telas, mosquiteiros, organização' },
                { n: '04', label: 'Ambiente desfavorável', desc: 'Plantas repelentes e higiene' },
              ].map((c) => (
                <div key={c.n} className="flex items-center gap-3 bg-white/[0.04] p-3 rounded-xl">
                  <span className="text-green-500 font-mono text-xs font-bold">{c.n}</span>
                  <div>
                    <span className="text-sm font-semibold text-stone-200">{c.label}</span>
                    <p className="text-[10px] text-stone-500">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-4 italic">Nenhuma medida isolada é suficiente.</p>
          </motion.div>
        </motion.section>
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-8">
            <span className="pre-title">Camada 01</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Repelentes Naturais Eficazes</h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Repelente funciona interferindo na capacidade do inseto detectar CO₂, ácido lático e compostos voláteis da pele. Mosquitos usam sensores químicos extremamente sensíveis. Certos óleos essenciais confundem esses sensores.
            </p>
          </motion.div>

          {/* Imagem */}
          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={imgRepelentes} alt="Óleos essenciais repelentes naturais" className="w-full h-64 md:h-80 object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-mono tracking-widest uppercase text-green-400/70">Citronela · Eucalipto-limão · Lavanda · Cravo</span>
            </div>
          </motion.div>

          {/* Óleos */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {OLEOS.map((o) => (
              <motion.div key={o.nome} variants={staggerChild} className={`${o.bg} border p-5 rounded-sm`}>
                <h4 className={`font-bold text-lg ${o.cor} mb-1`}>{o.nome}</h4>
                <p className="text-xs text-foreground/70 leading-relaxed mb-3">{o.mecanismo}</p>
                <div className="flex gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Duração</span>
                    <p className="text-xs text-foreground/80 font-semibold">{o.duracao}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Uso</span>
                    <p className="text-xs text-foreground/80 font-semibold">{o.uso}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Receita técnica */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/30 to-background border border-green-800/20 p-6 md:p-8 rounded-sm mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical size={18} className="text-green-500" />
              <h3 className="text-lg font-bold text-foreground">Receita Técnica — Repelente Natural (Uso Corporal)</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {[
                '100 ml de álcool de cereais',
                '20 gotas de óleo essencial de citronela',
                '10 gotas de eucalipto-limão',
                '5 gotas de lavanda',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 p-3 rounded-sm">
                  <span className="text-green-500 font-mono text-xs font-bold">{i + 1}.</span>
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 pt-4 space-y-2">
              <p className="text-sm text-foreground/80">Agitar antes de usar. Aplicar a cada 2–3 horas.</p>
            </div>
            <div className="mt-4 bg-red-500/10 border border-red-500/20 p-3 rounded-sm">
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-foreground/80">Evitar uso em crianças menores de 2 anos sem orientação.</p>
                  <p className="text-xs text-foreground/80">Evitar contato com olhos e mucosas.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Repelência ambiental */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-amber-950/20 to-background border border-amber-800/20 p-6 rounded-sm">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Repelência Ambiental</h4>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Difusor elétrico com óleos', detail: 'Dispersão contínua' },
                { label: 'Velas de citronela', detail: 'Áreas externas' },
                { label: 'Sachês aromáticos', detail: 'Gavetas e armários' },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 p-3 rounded-sm">
                  <span className="text-sm text-foreground/80 font-semibold">{item.label}</span>
                  <p className="text-[10px] text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 italic">Melhor desempenho em ambientes pouco ventilados.</p>
          </motion.div>
        </motion.section>

        {/* ═══ BLOCO 02 — ELIMINAÇÃO DE CRIADOUROS ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-8">
            <span className="pre-title">Camada 02</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Eliminação de Criadouros</h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              A maioria dos mosquitos deposita ovos em água parada. O ciclo médio do <span className="text-foreground/80 font-semibold">Aedes aegypti</span> é de 7 a 10 dias da postura ao mosquito adulto. Interromper o ciclo é mais eficaz que repelir.
            </p>
          </motion.div>

          {/* Imagem */}
          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={imgCiclo} alt="Ciclo do mosquito Aedes aegypti" className="w-full h-64 md:h-96 object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-mono tracking-widest uppercase text-sky-400/70">Ovo → Larva → Pupa → Adulto</span>
            </div>
          </motion.div>

          {/* Pontos críticos */}
          <motion.div variants={staggerChild} className="mb-6">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Droplets size={16} className="text-sky-400" /> Pontos Críticos de Acúmulo
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CRIADOUROS.map((c) => (
                <div key={c} className="flex items-center gap-2 bg-sky-500/10 border border-sky-500/15 p-3 rounded-sm">
                  <XCircle size={12} className="text-sky-400 shrink-0" />
                  <span className="text-xs text-foreground/80">{c}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Protocolo semanal */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-sky-950/30 to-background border border-sky-800/20 p-6 md:p-8 rounded-sm">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-sky-400" />
              <h3 className="text-lg font-bold text-foreground">Protocolo Semanal de Inspeção</h3>
            </div>
            <div className="space-y-3 mb-4">
              {[
                'Esvaziar todos os recipientes com água acumulada',
                'Escovar superfícies internas de vasos e pratos (ovos aderem às paredes)',
                'Manter reservatórios de água vedados com tampa ou tela',
                'Aplicar tela fina em ralos externos e aberturas',
                'Verificar calhas e canaletas de escoamento',
              ].map((passo, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 p-3 rounded-sm">
                  <span className="text-sky-400 font-mono text-xs font-bold mt-0.5">{i + 1}.</span>
                  <span className="text-sm text-foreground/80">{passo}</span>
                </div>
              ))}
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-sm">
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/80">
                  <span className="font-semibold">Importante:</span> Ovos do Aedes podem sobreviver secos por meses. Por isso a escovação mecânica das superfícies é essencial — apenas esvaziar a água não elimina os ovos.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ═══ BLOCO 03 — BARREIRAS FÍSICAS ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-8">
            <span className="pre-title">Camada 03</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Proteção Física de Ambientes</h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Barreira física é a forma mais segura e duradoura de proteção contra vetores. Sem toxicidade, sem reaplicação, sem resistência.
            </p>
          </motion.div>

          {/* Imagem */}
          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={imgBarreiras} alt="Tela mosquiteira e mosquiteiro de cama" className="w-full h-64 md:h-96 object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Telas mosquiteiras */}
            <motion.div variants={staggerChild} className="bg-gradient-to-br from-emerald-950/30 to-background border border-emerald-800/20 p-6 rounded-sm">
              <Home size={20} className="text-emerald-500 mb-3" />
              <h4 className="font-bold text-foreground mb-2">Telas Mosquiteiras</h4>
              <p className="text-xs text-muted-foreground mb-3">Malha ideal: <span className="text-foreground/80 font-semibold">1,2 mm ou menor</span></p>
              <div className="space-y-1.5">
                {['Janelas', 'Portas', 'Aberturas de ventilação'].map((local) => (
                  <div key={local} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                    <span className="text-foreground/80">{local}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mosquiteiros */}
            <motion.div variants={staggerChild} className="bg-gradient-to-br from-blue-950/30 to-background border border-blue-800/20 p-6 rounded-sm">
              <Shield size={20} className="text-blue-500 mb-3" />
              <h4 className="font-bold text-foreground mb-2">Mosquiteiros de Cama</h4>
              <p className="text-xs text-muted-foreground mb-3">Especialmente eficazes para:</p>
              <div className="space-y-1.5">
                {['Crianças', 'Idosos', 'Áreas rurais'].map((grupo) => (
                  <div key={grupo} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 size={12} className="text-blue-400 shrink-0" />
                    <span className="text-foreground/80">{grupo}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-3 italic">Deve tocar o chão ou ser fixado sob o colchão.</p>
            </motion.div>

            {/* Organização ambiental */}
            <motion.div variants={staggerChild} className="bg-gradient-to-br from-amber-950/30 to-background border border-amber-800/20 p-6 rounded-sm">
              <Trash2 size={20} className="text-amber-500 mb-3" />
              <h4 className="font-bold text-foreground mb-2">Organização Ambiental</h4>
              <p className="text-xs text-muted-foreground mb-3">Ambiente limpo reduz moscas, baratas e roedores. Evitar:</p>
              <div className="space-y-1.5">
                {['Restos alimentares expostos', 'Lixo sem tampa', 'Acúmulo de papelão e entulho'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs">
                    <XCircle size={12} className="text-amber-400 shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══ BLOCO 04 — PLANTAS REPELENTES ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-8">
            <span className="pre-title">Camada 04</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Plantas Repelentes para Cultivo</h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Plantas não eliminam vetores. Elas <span className="text-foreground/80 font-semibold">reduzem atratividade ambiental</span>. Não substituem eliminação de criadouros.
            </p>
          </motion.div>

          {/* Imagem */}
          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={imgJardim} alt="Varanda com plantas repelentes" className="w-full h-64 md:h-80 object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {PLANTAS_REPELENTES.map((p) => (
              <motion.div key={p.nome} variants={staggerChild} className="bg-gradient-to-br from-green-950/30 to-background border border-green-800/20 p-5 rounded-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-green-400">{p.nome}</h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm ${
                    p.eficacia === 'Alta' ? 'bg-green-500/20 text-green-300' :
                    p.eficacia === 'Moderada' ? 'bg-amber-500/20 text-amber-300' :
                    'bg-white/10 text-muted-foreground'
                  }`}>{p.eficacia}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Estratégia de plantio */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-emerald-950/20 to-background border border-emerald-800/20 p-6 rounded-sm">
            <Sprout size={18} className="text-emerald-500 mb-3" />
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Estratégia de Plantio</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {['Próximo a janelas', 'Próximo a portas', 'Em varandas', 'Ao redor de áreas de lazer'].map((local) => (
                <div key={local} className="flex items-center gap-2 text-sm bg-white/5 p-3 rounded-sm">
                  <Leaf size={14} className="text-emerald-400 shrink-0" />
                  <span className="text-foreground/80">{local}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ═══ CONTROLE DE ROEDORES ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-8">
            <span className="pre-title">Complementar</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Controle de Roedores</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/20 to-background border border-red-800/20 p-6 md:p-8 rounded-sm mb-6">
            <p className="text-sm text-muted-foreground mb-4">Roedores são atraídos por restos alimentares, água disponível e abrigo escuro.</p>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Prevenção</h4>
            <div className="grid sm:grid-cols-2 gap-2 mb-6">
              {[
                'Armazenar grãos em recipientes vedados',
                'Manter lixo fechado com tampa',
                'Fechar frestas maiores que 1 cm',
                'Evitar entulho acumulado',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm bg-white/5 p-3 rounded-sm">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Métodos de baixo impacto */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-amber-950/20 to-background border border-amber-800/20 p-6 rounded-sm">
            <Wind size={18} className="text-amber-400 mb-3" />
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Métodos de Baixo Impacto</h4>
            <p className="text-xs text-muted-foreground mb-4">Evitar uso indiscriminado de inseticidas químicos. Problemas: resistência de insetos, impacto ambiental, toxicidade doméstica.</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Manejo ambiental', desc: 'Primeira linha de defesa' },
                { label: 'Barreiras físicas', desc: 'Proteção sem toxicidade' },
                { label: 'Repelência natural', desc: 'Complemento estratégico' },
              ].map((m) => (
                <div key={m.label} className="border-l-2 border-amber-500/50 pl-3">
                  <span className="text-amber-400 font-bold text-sm">{m.label}</span>
                  <p className="text-muted-foreground text-xs mt-1">{m.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ═══ ESTRATÉGIA INTEGRADA ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-20">
          <motion.div variants={staggerChild} className="mb-8">
            <span className="pre-title">Resultado</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Estratégia Integrada</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/30 to-background border border-green-800/20 p-6 md:p-8 rounded-sm">
            <p className="text-sm text-foreground/80 mb-6">Controle eficaz exige aplicação simultânea de todas as camadas:</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                'Inspeção semanal de criadouros',
                'Barreira física constante (telas e mosquiteiros)',
                'Repelência estratégica (óleos e difusores)',
                'Ambiente organizado e limpo',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm bg-white/5 p-3 rounded-sm">
                  <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-6">
              <h4 className="text-sm font-bold text-foreground mb-4">Resultado esperado:</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  'Redução significativa de picadas',
                  'Menor risco de dengue e arboviroses',
                  'Redução de contaminação alimentar',
                  'Menor exposição a vetores urbanos',
                ].map((r) => (
                  <div key={r} className="flex items-center gap-2 text-xs bg-green-500/10 border border-green-500/15 p-3 rounded-sm">
                    <Shield size={12} className="text-green-400 shrink-0" />
                    <span className="text-foreground/80">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Conclusão */}
          <motion.div variants={staggerChild} className="mt-8 text-center max-w-xl mx-auto">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Controle de vetores é <span className="text-foreground/90 font-semibold">higiene estrutural</span>.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Não é reação. É <span className="text-green-400 font-semibold">prevenção contínua</span>.
            </p>
          </motion.div>
        </motion.section>

        {/* ─── DISCLAIMER ─── */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-amber-950/20 border border-amber-800/30 p-6 rounded-sm mb-12">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-300 mb-1">Aviso Legal</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Este conteúdo é de caráter educativo e informativo. As estratégias descritas são complementares às ações oficiais de vigilância sanitária. Em caso de surto ou infestação grave, procure os órgãos competentes (vigilância sanitária municipal, controle de zoonoses). Os repelentes naturais possuem eficácia variável e não substituem medidas químicas quando indicadas por profissionais de saúde pública.
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
        </div>
      </main>
      <ScrollToTop />
    </div>
    </>
  );
};

export default ControleVetores;
