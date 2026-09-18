import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Egg, Layers, Droplets, Shield, CircleDot, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgGalinheiro from '@/assets/proteina-galinheiro-movel.webp';
import imgCodornas from '@/assets/proteina-codornas-vertical.webp';
import imgAquaponia from '@/assets/proteina-aquaponia-tilapia.webp';
import imgManejo from '@/assets/proteina-manejo-sanitario.webp';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: APPLE_EASE, delay: i * 0.08 },
  }),
};

/* ═══════════════════════════════════════════════
   REUSABLE CARD COMPONENTS (DARK PALETTE)
   ═══════════════════════════════════════════════ */

interface ModuleSection {
  num: string;
  title: string;
  subtitle: string;
  image: string;
  icon: typeof Egg;
  intro: string;
  structure?: { title: string; items: string[] }[];
  production?: string[];
  advantages?: string[];
  criticalPoints?: string[];
  protocols?: { label: string; items: string[] }[];
  indicators?: string[];
  insight: string;
}

const SECTIONS: ModuleSection[] = [
  {
    num: '01',
    title: 'Galinheiro Móvel Estratégico',
    subtitle: 'Ovos + regeneração de solo',
    image: imgGalinheiro,
    icon: Egg,
    intro: 'Um galinheiro fixo desgasta o solo. Um galinheiro móvel cria ciclo produtivo — funciona como arado natural, controle biológico de pragas e sistema automático de adubação.',
    structure: [
      {
        title: 'Estrutura Técnica',
        items: ['2m × 1m × 1m — capacidade: 4 a 6 galinhas', 'Madeira tratada ou metal leve + tela galvanizada', 'Cobertura impermeável parcial + rodas grandes', 'Área fechada para postura e abrigo'],
      },
      {
        title: 'Ciclo de Operação',
        items: ['Permanência em área: 3 a 5 dias', 'Descanso do solo: 10 a 15 dias', 'Galinhas ciscam, aeram e adudam a terra', 'Solo biologicamente ativado após saída'],
      },
    ],
    production: ['20 a 24 ovos por semana', '80 a 100 ovos por mês', '960 a 1.200 ovos por ano', '70% a 85% de regularidade anual'],
    advantages: ['Fonte contínua de proteína', 'Fertilização natural do solo', 'Redução de pragas na horta', 'Integração direta com produção vegetal'],
    insight: 'É um sistema regenerativo, não apenas produtivo.',
  },
  {
    num: '02',
    title: 'Produção Vertical de Codornas',
    subtitle: 'Alta densidade proteica por m²',
    image: imgCodornas,
    icon: Layers,
    intro: 'Codornas oferecem uma das maiores relações proteína/m² disponíveis em ambiente urbano. Sistema vertical compacto com alta previsibilidade de produção.',
    structure: [{ title: 'Sistema Vertical', items: ['3 níveis de gaiolas — 4 a 6 aves por módulo', 'Total: 12 a 18 codornas em 1m² a 1,5m²', 'Bandeja coletora de ovos inclinada', 'Ventilação cruzada + iluminação controlada'] }],
    production: ['8 a 10 ovos por dia', '240 a 300 ovos por mês', '2.800 a 3.600 ovos por ano', 'Postura inicia entre 6 e 8 semanas'],
    criticalPoints: ['Higienização frequente obrigatória', 'Controle rigoroso de odor', 'Densidade adequada — evitar superlotação', 'Troca constante de água'],
    insight: 'É uma \\"linha vertical de proteína\\" — produção constante em pouco espaço.',
  },
  {
    num: '03',
    title: 'Aquaponia com Tilápia',
    subtitle: 'Ecossistema produtivo fechado',
    image: imgAquaponia,
    icon: Droplets,
    intro: 'Aquaponia integra peixe e planta em sistema simbiótico. Peixe gera resíduo, bactérias convertem em nutriente, plantas absorvem e devolvem água limpa ao tanque.',
    structure: [{ title: 'Estrutura do Sistema', items: ['Tanque de 1.000 litros — 40 a 60 tilápias', 'Cama de cultivo de 2m²', 'Bomba de recirculação contínua', 'Filtro mecânico e biológico simples'] }],
    production: ['40 a 60 kg de peixe por ciclo (6-8 meses)', 'Folhas contínuas: alface, rúcula, cebolinha', 'Colheitas semanais de hortaliças', 'pH ideal: 6,5 a 7,5 | Temp: 24° a 30°C'],
    advantages: ['Dupla produção: peixe + vegetal', 'Uso eficiente de água (ciclo fechado)', 'Sistema compacto e escalável', 'Alta produtividade por área ocupada'],
    insight: 'É engenharia alimentar aplicada — dois produtos, um único sistema.',
  },
  {
    num: '04',
    title: 'Manejo Sanitário e Controle de Risco',
    subtitle: 'Estabilidade depende de disciplina',
    image: imgManejo,
    icon: Shield,
    intro: 'Produção animal sem manejo adequado gera instabilidade. Sanidade é parte estrutural do sistema — não opcional.',
    protocols: [
      { label: 'Diário', items: ['Verificar comportamento', 'Conferir consumo de água', 'Remover resíduos visíveis'] },
      { label: 'Semanal', items: ['Higienização profunda', 'Limpeza de bandejas', 'Revisão estrutural'] },
      { label: 'Mensal', items: ['Inspeção geral', 'Ajuste de densidade', 'Avaliação de postura'] },
    ],
    indicators: ['Queda abrupta na produção', 'Letargia ou alteração nas fezes', 'Odores excessivos', 'Aglomeração incomum'],
    advantages: ['Ventilação constante', 'Controle de umidade abaixo de 70%', 'Espaçamento adequado', 'Água fresca diária'],
    insight: 'Ambiente controlado = produção estável. Resposta rápida evita perda do lote inteiro.',
  },
];

const INTEGRATION_ITEMS = [
  'Galinhas fertilizam solo → Solo alimenta horta',
  'Horta complementa alimentação das aves',
  'Peixes alimentam plantas → Plantas filtram água',
  'Ciclo produtivo interligado e regenerativo',
];

const CAPACITY_ITEMS = [
  'Produzir ovos semanalmente',
  'Ter ciclo semestral de peixe',
  'Fertilizar horta naturalmente',
  'Reduzir compra externa de proteína',
];

export default function ProteinaSustentavel() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Proteína Sustentável: Galinhas, Codornas e Aquaponia em Espaços Urbanos | Lord Junnior</title>
        <meta name="description" content="Como produzir proteína animal em espaços reduzidos. Galinheiro móvel, criação vertical de codornas, aquaponia com tilápia e manejo sanitário. Alta densidade proteica por m²." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/proteina-sustentavel" />
        <meta property="og:title" content="Proteína Sustentável: Produção Animal Urbana Compacta" />
        <meta property="og:description" content="Galinhas, codornas e tilápias em sistemas compactos. Proteína de qualidade com autonomia total." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/proteina-sustentavel" />
      </Helmet>
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 pb-32 relative overflow-hidden" style={{ background: '#050808' }}>
      <CinematicHero
        image="/heroes/proteina-sustentavel.webp"
        phase="Fase 03 · Soberania Alimentar"
        title="Proteína Sustentável"
        subtitle="Produção Animal Compacta com Eficiência Máxima. Vegetais fornecem base energética. Proteína fornece densidade nutricional, saciedade prolongada e equilíbrio metabólico."
        icon={Egg}
        accentColor="amber"
        backLink="/soberania-organica"
        backLabel="Soberania Orgânica"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 pt-12">

        {/* Intro */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-2xl p-8 md:p-10">
            <p className="text-stone-400 text-sm leading-relaxed max-w-xl">
              Em ambiente urbano, o desafio não é espaço. É organização inteligente do espaço.
              Sem romantização. Sem improviso. Com números, lógica e funcionamento prático.
            </p>
          </div>
        </motion.div>

        {/* ═══ MÓDULOS ═══ */}
        {SECTIONS.map((section, idx) => (
          <motion.section
            key={section.num}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp} custom={idx * 0.5}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="flex-1 h-px bg-amber-500 opacity-20" />
              <span className="text-stone-500 text-[9px] font-bold tracking-[0.4em] uppercase">Módulo {section.num}</span>
              <div className="flex-1 h-px bg-amber-500 opacity-20" />
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl overflow-hidden hover:border-white/[0.1] transition-all duration-500">
              <div className="relative h-56 md:h-72 overflow-hidden">
                <img src={section.image} alt={section.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 md:left-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 backdrop-blur-sm rounded-xl border border-amber-300/30">
                      <section.icon className="text-amber-200" size={18} />
                    </div>
                    <div>
                      <span className="text-amber-300/80 text-[9px] font-bold tracking-[0.4em] uppercase block">{section.num} — {section.subtitle}</span>
                      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{section.title}</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-2xl p-5 md:p-6 mb-6">
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed italic">"{section.intro}"</p>
                </div>

                {section.structure?.map((block) => (
                  <div key={block.title} className="mb-6">
                    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <ChevronRight size={12} className="text-amber-500" />{block.title}
                    </h3>
                    <ul className="space-y-2">
                      {block.items.map((item, i) => (
                        <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: APPLE_EASE, delay: 0.2 + i * 0.06 }}
                          className="flex items-start gap-3 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span className="text-stone-400 text-sm leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}

                {section.production && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <ChevronRight size={12} className="text-amber-500" />Produção Estimada
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {section.production.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-xl px-4 py-3">
                          <CircleDot size={12} className="text-amber-400 shrink-0" />
                          <span className="text-stone-300 text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.protocols && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <ChevronRight size={12} className="text-amber-500" />Protocolo Básico
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {section.protocols.map((proto) => (
                        <div key={proto.label} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4">
                          <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">{proto.label}</p>
                          <ul className="space-y-1.5">
                            {proto.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-stone-400 text-xs leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />{item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.indicators && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <ChevronRight size={12} className="text-red-400" />Indicadores de Problema
                    </h3>
                    <div className="bg-red-500/[0.08] border border-red-500/[0.15] rounded-xl p-4">
                      <ul className="space-y-2">
                        {section.indicators.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                            <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {section.criticalPoints && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <ChevronRight size={12} className="text-red-400" />Pontos Críticos
                    </h3>
                    <div className="bg-red-500/[0.08] border border-red-500/[0.15] rounded-xl p-4">
                      <ul className="space-y-2">
                        {section.criticalPoints.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                            <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {section.advantages && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <ChevronRight size={12} className="text-emerald-500" />Vantagem Estratégica
                    </h3>
                    <ul className="space-y-2">
                      {section.advantages.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 bg-emerald-500/[0.08] border border-emerald-500/[0.15] rounded-xl px-4 py-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span className="text-stone-400 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="border-l-3 border-amber-500/50 pl-5">
                  <p className="text-amber-400 text-sm font-semibold leading-relaxed">{section.insight}</p>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* ═══ INTEGRAÇÃO ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-10">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="flex-1 h-px bg-amber-500 opacity-20" />
            <span className="text-stone-500 text-[9px] font-bold tracking-[0.4em] uppercase">Integração</span>
            <div className="flex-1 h-px bg-amber-500 opacity-20" />
          </div>

          <div className="bg-emerald-500/[0.08] border border-emerald-500/[0.15] rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-stone-100 tracking-tight mb-2">Sistema Integrado</h3>
            <p className="text-stone-500 text-sm mb-6">Não são sistemas isolados. São camadas conectadas.</p>
            <ul className="space-y-3 mb-8">
              {INTEGRATION_ITEMS.map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="text-stone-400 text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* ═══ CAPACIDADE ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
          <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-stone-100 tracking-tight mb-2">Capacidade Real em 10m²</h3>
            <p className="text-stone-500 text-sm mb-6">Com organização correta é possível:</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {CAPACITY_ITEMS.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-center hover:scale-[1.02] hover:border-amber-500/20 transition-all duration-300">
                  <Egg className="text-amber-400 mx-auto mb-2" size={20} />
                  <p className="text-stone-300 text-xs sm:text-sm font-semibold">{item}</p>
                </motion.div>
              ))}
            </div>
            <div className="space-y-3 text-stone-400 text-sm leading-relaxed">
              <p>Não é autossuficiência total.</p>
              <p className="text-amber-400 font-semibold">É redução consistente de dependência.</p>
            </div>
          </div>
        </motion.section>

        {/* ═══ NAVIGATION ═══ */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link to="/soberania-organica/armazenamento-longo-prazo"
            className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-6 py-4 hover:bg-white/[0.08] transition-all duration-300 group">
            <ArrowLeft size={16} className="text-stone-500 group-hover:text-amber-400 transition-colors" />
            <div>
              <span className="text-stone-500 text-[9px] font-bold uppercase tracking-wider">Anterior</span>
              <p className="text-stone-300 text-sm font-semibold">Conservação e Armazenamento</p>
            </div>
          </Link>
          <Link to="/soberania-organica/solo-fertilidade"
            className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-6 py-4 hover:bg-white/[0.08] transition-all duration-300 group justify-end">
            <div className="text-right">
              <span className="text-stone-500 text-[9px] font-bold uppercase tracking-wider">Próximo</span>
              <p className="text-stone-300 text-sm font-semibold">Solo e Fertilidade</p>
            </div>
            <ArrowRight size={16} className="text-stone-500 group-hover:text-amber-400 transition-colors" />
          </Link>
        </motion.div>

        <MicroCtaResistencia variant="alimentar" />

        <motion.div className="mt-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
          <p className="text-stone-600 text-xs leading-relaxed max-w-md mx-auto">
            Este módulo faz parte da Fase 03 — Soberania Alimentar do Soberania Orgânica.
            Conteúdo baseado em técnicas validadas de produção animal compacta e sistemas integrados.
          </p>
        </motion.div>
      </div>

      <ScrollToTop />
    </div>
    </>
  );
}
