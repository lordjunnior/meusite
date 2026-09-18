import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Layers, Sprout, Leaf, Sun, Droplets, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgLayout from '@/assets/producao-layout-canteiros.webp';
import imgConsorcio from '@/assets/producao-consorcio-culturas.webp';
import imgRotacao from '@/assets/producao-rotacao-sazonal.webp';
import imgMicroclimas from '@/assets/producao-microclimas.webp';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: APPLE_EASE, delay: i * 0.08 },
  }),
};

interface ModuleSection {
  num: string;
  title: string;
  subtitle: string;
  image: string;
  icon: typeof Layers;
  analogy: string;
  body: string;
  points: string[];
  insight: string;
}

const SECTIONS: ModuleSection[] = [
  {
    num: '01',
    title: 'Layout Otimizado de Canteiros',
    subtitle: 'Cada coisa no lugar certo',
    image: imgLayout,
    icon: Layers,
    analogy: 'Um canteiro organizado é como uma cozinha profissional: cada coisa no lugar certo. Um canteiro desorganizado é como um quarto bagunçado — você perde espaço e não aproveita nada direito.',
    body: 'Organizar um espaço de 4m² com inteligência multiplica a capacidade produtiva. Canteiros estreitos, escalonamento por altura e corredores mínimos transformam metros em alimento.',
    points: [
      'Canteiros estreitos para alcançar o centro sem pisar',
      'Plantas altas atrás, médias no meio, baixas na frente',
      'Corredores pequenos apenas para passagem',
      'Melhora luz, ventilação e facilita manutenção',
    ],
    insight: 'Espaço pequeno não é limitação. Falta de organização é.',
  },
  {
    num: '02',
    title: 'Consórcio de Culturas Compatíveis',
    subtitle: 'Plantas que se ajudam',
    image: imgConsorcio,
    icon: Sprout,
    analogy: 'É como montar um time onde cada jogador tem uma função. Milho cresce alto e serve de suporte. Feijão sobe no milho e devolve nutrientes ao solo. Abóbora cobre o chão e protege a terra do sol.',
    body: 'Quando as plantas cooperam, o solo fica mais saudável e o trabalho diminui. Juntas, elas produzem mais do que separadas. Esse método ancestral é validado por séculos de agricultura indígena.',
    points: [
      'Milho: estrutura vertical e suporte natural',
      'Feijão: fixação de nitrogênio no solo',
      'Abóbora: cobertura viva contra evaporação',
      'Sistema integrado reduz pragas e aumenta produção',
    ],
    insight: 'Cooperação entre espécies é a engenharia mais antiga do mundo.',
  },
  {
    num: '03',
    title: 'Rotação Sazonal de Plantio',
    subtitle: 'Alternar para manter',
    image: imgRotacao,
    icon: Sun,
    analogy: 'Plantar sempre a mesma coisa no mesmo lugar desgasta o solo. É como usar o mesmo músculo todos os dias sem descanso. Rotação significa alternar para equilibrar.',
    body: 'Cada grupo de plantas usa nutrientes diferentes. Folhas, leguminosas, raízes e frutos em rotação mantêm o solo equilibrado. Solo equilibrado produz por mais tempo com menos insumos.',
    points: [
      'Folhas: consomem nitrogênio superficial',
      'Leguminosas: devolvem nitrogênio ao solo',
      'Raízes: acessam nutrientes profundos',
      'Frutos: exigem fósforo e potássio',
    ],
    insight: 'Solo equilibrado é solo que produz por décadas.',
  },
  {
    num: '04',
    title: 'Aproveitamento de Microclimas Urbanos',
    subtitle: 'Diferentes "salas" no mesmo espaço',
    image: imgMicroclimas,
    icon: Droplets,
    analogy: 'Mesmo dentro do mesmo terreno existem diferenças. Um lado pode receber sol o dia inteiro. Outro pode ter sombra à tarde. Isso é microclima — como diferentes "salas" dentro do mesmo espaço.',
    body: 'Plantas que gostam de sol forte ficam na área mais quente. Plantas que preferem sombra ficam no lado protegido. Observar antes de plantar aumenta muito a chance de sucesso.',
    points: [
      'Sol forte: tomates, pimentas, manjericão',
      'Meia sombra: alface, rúcula, salsinha',
      'Sombra total: hortelã, samambaias, gengibre',
      'Áreas protegidas do vento para mudas jovens',
    ],
    insight: 'Observar antes de plantar é a primeira técnica de cultivo.',
  },
];

const RESULTS = [
  'Folhas frescas',
  'Legumes',
  'Temperos',
  'Frutos pequenos',
];

export default function ProducaoPequenosEspacos() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Produção em Pequenos Espaços: Soberania Alimentar em 4m² | Lord Junnior</title>
        <meta name="description" content="Como produzir alimento em espaços mínimos. Layout de canteiros, consórcio de culturas, rotação sazonal e microclimas urbanos. Transforme metros quadrados em fonte de alimento." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/producao-pequenos-espacos" />
        <meta property="og:title" content="Produção em Pequenos Espaços: 4m² que Alimentam" />
        <meta property="og:description" content="Planejamento inteligente transforma varandas e quintais em fonte de alimento. Consórcio de culturas e rotação sazonal." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/producao-pequenos-espacos" />
      </Helmet>
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 pb-32 relative overflow-hidden" style={{ background: '#050808' }}>
      <CinematicHero
        image="/heroes/producao-pequenos-espacos.webp"
        phase="Fase 03 · Soberania Alimentar"
        title="Produção em Pequenos Espaços"
        subtitle="4m² podem virar uma fonte real de alimento. Quatro metros quadrados parecem pouco. Mas pense assim: é o tamanho de uma vaga de estacionamento pequena."
        icon={Layers}
        accentColor="amber"
        backLink="/soberania-organica"
        backLabel="Soberania Orgânica"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 pt-12">

        {/* Intro */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-2xl p-8 md:p-10">
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-2xl">
              Produzir em pouco espaço não depende de tamanho. Depende de organização.
              <span className="text-amber-400 font-semibold"> Se cabe um carro, também cabe comida.</span>
            </p>
            <p className="text-stone-500 text-sm mt-4 leading-relaxed max-w-xl">
              Quando o espaço é planejado, ele funciona como uma pequena fábrica natural.
            </p>
          </div>
        </motion.div>

        {/* ═══ MÓDULOS ═══ */}
        {SECTIONS.map((section, idx) => (
          <motion.section
            key={section.num}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={idx * 0.5}
            className="mb-16"
          >
            {/* Divider */}
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="flex-1 h-px bg-amber-500 opacity-20" />
              <span className="text-stone-500 text-[9px] font-bold tracking-[0.4em] uppercase">
                Módulo {section.num}
              </span>
              <div className="flex-1 h-px bg-amber-500 opacity-20" />
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl overflow-hidden hover:border-white/[0.1] transition-all duration-500">
              {/* Image */}
              <div className="relative h-56 md:h-72 overflow-hidden">
                <img src={section.image} alt={section.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 md:left-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 backdrop-blur-sm rounded-xl border border-amber-300/30">
                      <section.icon className="text-amber-200" size={18} />
                    </div>
                    <div>
                      <span className="text-amber-300/80 text-[9px] font-bold tracking-[0.4em] uppercase block">
                        {section.num} — {section.subtitle}
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">
                {/* Analogy — PNL anchor */}
                <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-2xl p-5 md:p-6 mb-6">
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed italic">
                    "{section.analogy}"
                  </p>
                </div>

                <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-6">
                  {section.body}
                </p>

                {/* Points */}
                <ul className="space-y-3 mb-6">
                  {section.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: APPLE_EASE, delay: 0.3 + i * 0.08 }}
                      className="flex items-start gap-3 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span className="text-stone-400 text-sm leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Insight */}
                <div className="border-l-3 border-amber-500/50 pl-5">
                  <p className="text-amber-400 text-sm font-semibold leading-relaxed">
                    {section.insight}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* ═══ VISÃO FINAL ═══ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="flex-1 h-px bg-amber-500 opacity-20" />
            <span className="text-stone-500 text-[9px] font-bold tracking-[0.4em] uppercase">Visão Final</span>
            <div className="flex-1 h-px bg-amber-500 opacity-20" />
          </div>

          <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-stone-100 tracking-tight mb-6">
              4m² organizados produzem:
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {RESULTS.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-center hover:scale-[1.02] hover:border-amber-500/20 transition-all duration-300"
                >
                  <Sprout className="text-amber-400 mx-auto mb-2" size={20} />
                  <p className="text-stone-300 text-sm font-semibold">{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3 text-stone-400 text-sm leading-relaxed">
              <p>Espaço pequeno <span className="text-amber-400 font-semibold">não é limitação</span>.</p>
              <p>Falta de planejamento é.</p>
              <p className="text-stone-300 font-medium pt-2">
                Quando o espaço é entendido como sistema, ele começa a trabalhar a favor de quem cultiva.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ═══ NAVIGATION ═══ */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-between"
        >
          <Link
            to="/soberania-organica/horta-urbana"
            className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-6 py-4 hover:bg-white/[0.08] transition-all duration-300 group"
          >
            <ArrowLeft size={16} className="text-stone-500 group-hover:text-amber-400 transition-colors" />
            <div>
              <span className="text-stone-500 text-[9px] font-bold uppercase tracking-wider">Anterior</span>
              <p className="text-stone-300 text-sm font-semibold">Horta Urbana</p>
            </div>
          </Link>

          <Link
            to="/soberania-organica/armazenamento-longo-prazo"
            className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-6 py-4 hover:bg-white/[0.08] transition-all duration-300 group justify-end"
          >
            <div className="text-right">
              <span className="text-stone-500 text-[9px] font-bold uppercase tracking-wider">Próximo</span>
              <p className="text-stone-300 text-sm font-semibold">Conservação e Armazenamento</p>
            </div>
            <ArrowRight size={16} className="text-stone-500 group-hover:text-amber-400 transition-colors" />
          </Link>
        </motion.div>

        <MicroCtaResistencia variant="alimentar" />

        {/* Footer */}
        <motion.div className="mt-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
          <p className="text-stone-600 text-xs leading-relaxed max-w-md mx-auto">
            Este módulo faz parte da Fase 03 — Soberania Alimentar do Soberania Orgânica.
            Conteúdo baseado em técnicas validadas de agricultura urbana e permacultura.
          </p>
        </motion.div>

      </div>

      <ScrollToTop />
    </div>
    </>
  );
}
