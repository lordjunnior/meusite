import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Shovel, Leaf, Bug, Droplets, FlaskConical, Layers, AlertTriangle, ChevronRight, CheckCircle2, XCircle, CircleDot } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';
import imgComposteira from '@/assets/solo-composteira.webp';
import imgBokashi from '@/assets/solo-bokashi.webp';
import imgMinhocario from '@/assets/solo-minhocario.webp';
import imgPhTeste from '@/assets/solo-ph-teste.webp';
import imgTiposTerra from '@/assets/solo-tipos-terra.webp';
import imgFertilizantes from '@/assets/solo-fertilizantes.webp';
import imgSubstrato from '@/assets/solo-substrato-ideal.webp';
import BackToHome from '@/components/BackToHome';

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }),
};

/* ═══════════════════════════════════════════════
   CARD COMPONENTS (DARK THEME)
   ═══════════════════════════════════════════════ */

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-10 px-2">
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="flex-1 h-px bg-amber-600 opacity-20" />
      <span className="text-stone-500 text-[9px] font-bold tracking-[0.4em] uppercase">{label}</span>
      <div className="flex-1 h-px bg-amber-600 opacity-20" />
    </div>
  );
}

function ImageCard({ src, alt, children }: { src: string; alt: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={0}
      className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-3xl overflow-hidden hover:border-white/[0.1] transition-all duration-500"
    >
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050808]/80 via-transparent to-transparent" />
      </div>
      <div className="p-6 md:p-10">{children}</div>
    </motion.div>
  );
}

function InfoCard({ color, icon: Icon, title, children }: { color: string; icon: typeof Shovel; title: string; children: React.ReactNode }) {
  const colorMap: Record<string, { bg: string; border: string; text: string; dot: string; iconBg: string }> = {
    brown: { bg: 'bg-amber-500/[0.06]', border: 'border-amber-500/[0.12]', text: 'text-amber-400', dot: 'bg-amber-500', iconBg: 'bg-amber-500/[0.12]' },
    green: { bg: 'bg-emerald-500/[0.06]', border: 'border-emerald-500/[0.12]', text: 'text-emerald-400', dot: 'bg-emerald-500', iconBg: 'bg-emerald-500/[0.12]' },
    yellow: { bg: 'bg-yellow-500/[0.06]', border: 'border-yellow-500/[0.12]', text: 'text-yellow-400', dot: 'bg-yellow-500', iconBg: 'bg-yellow-500/[0.12]' },
    blue: { bg: 'bg-sky-500/[0.06]', border: 'border-sky-500/[0.12]', text: 'text-sky-400', dot: 'bg-sky-500', iconBg: 'bg-sky-500/[0.12]' },
    red: { bg: 'bg-red-500/[0.06]', border: 'border-red-500/[0.12]', text: 'text-red-400', dot: 'bg-red-500', iconBg: 'bg-red-500/[0.12]' },
  };
  const c = colorMap[color] || colorMap.brown;

  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={0}
      className={`${c.bg} border ${c.border} rounded-3xl p-6 md:p-10 hover:shadow-md transition-all duration-500`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 ${c.iconBg} rounded-xl`}>
          <Icon className={c.text} size={20} />
        </div>
        <h3 className={`text-lg md:text-xl font-bold tracking-tight ${c.text}`}>{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

function BulletList({ items, color = 'bg-amber-500' }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.05 }}
          className="flex items-start gap-3 bg-white/[0.03] rounded-xl px-4 py-3">
          <div className={`w-2 h-2 rounded-full ${color} mt-1.5 shrink-0`} />
          <span className="text-stone-400 text-sm leading-relaxed">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function StepList({ steps, color = 'bg-amber-500' }: { steps: string[]; color?: string }) {
  return (
    <ol className="space-y-2">
      {steps.map((step, i) => (
        <motion.li key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.1 + i * 0.04 }}
          className="flex items-start gap-3 bg-white/[0.03] rounded-xl px-4 py-3">
          <span className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-[10px] font-bold ${color} shrink-0 mt-0.5`}>
            {i + 1}
          </span>
          <span className="text-stone-400 text-sm leading-relaxed">{step}</span>
        </motion.li>
      ))}
    </ol>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */

export default function SoloFertilidade() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Solo e Fertilidade: Compostagem, Bokashi e Húmus para Autonomia Alimentar | Lord Junnior</title>
        <meta name="description" content="Guia técnico de fertilidade do solo. Composteira doméstica, bokashi, minhocário, teste de pH e substrato ideal. A base que sustenta tudo que cresce na sua produção autônoma." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/solo-fertilidade" />
        <meta property="og:title" content="Solo e Fertilidade: A Base da Autonomia Alimentar" />
        <meta property="og:description" content="Compostagem, bokashi e húmus de minhoca. Sem solo fértil, nada cresce. Aprenda a construir a base." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/solo-fertilidade" />
      </Helmet>
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 pb-32 relative overflow-hidden" style={{ background: '#050808' }}>
      <ScrollToTop />

      <CinematicHero
        image="/heroes/solo-fertilidade.webp"
        phase="Fase 03 · Autonomia Alimentar"
        title="Solo e Fertilidade"
        subtitle="Solo fértil não é apenas 'terra escura'. Solo fértil é um ecossistema — microrganismos, fungos benéficos, matéria orgânica em decomposição, minerais disponíveis e umidade equilibrada."
        icon={Shovel}
        accentColor="amber"
        backLink="/soberania-organica"
        backLabel="Soberania Orgânica"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 pt-12">

        {/* ═══ INTRO ═══ */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-10">
            <p className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight mb-4">
              Terra viva gera alimento vivo
            </p>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-2xl">
              Plantas não se alimentam de adubo diretamente. Elas se alimentam do que os microrganismos transformam. Fertilidade não é sobre jogar nutrientes — é sobre manter <span className="text-amber-400 font-semibold">vida ativa no solo</span>.
            </p>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════
             CARD 01 — TIPOS DE SOLO
           ═══════════════════════════════════════ */}
        <SectionDivider label="Fundamentos" />

        <div className="space-y-6 mb-6">
          <ImageCard src={imgTiposTerra} alt="Tipos de solo: arenoso, argiloso e franco">
            <h2 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight mb-2">
              🟫 Tipos de Solo e Como Identificar
            </h2>
            <p className="text-stone-500 text-sm mb-6">Identificar o tipo de solo é o primeiro passo antes de qualquer cultivo.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  name: 'Solo Arenoso',
                  traits: ['Grãos visíveis, não forma torrão', 'Drena água rapidamente', 'Pobre em nutrientes'],
                  test: 'Pegue terra úmida e aperte. Se desfazer facilmente, é arenoso.',
                  fix: 'Adicionar composto orgânico + húmus + cobertura morta',
                  color: 'bg-yellow-500/[0.08] border-yellow-500/[0.15]',
                  dot: 'bg-yellow-500',
                },
                {
                  name: 'Solo Argiloso',
                  traits: ['Textura fina e pegajosa', 'Retém muita água', 'Pode compactar'],
                  test: 'Ao apertar, mantém forma e não se desfaz facilmente.',
                  fix: 'Adicionar areia grossa + matéria orgânica + evitar pisoteio',
                  color: 'bg-stone-500/[0.08] border-stone-500/[0.15]',
                  dot: 'bg-stone-400',
                },
                {
                  name: 'Solo Franco (Ideal)',
                  traits: ['Mistura equilibrada', 'Boa drenagem + umidade', 'Alta fertilidade natural'],
                  test: 'Forma torrão leve que se desfaz com toque suave.',
                  fix: 'Manutenção com matéria orgânica contínua',
                  color: 'bg-amber-500/[0.08] border-amber-500/[0.15]',
                  dot: 'bg-amber-500',
                },
              ].map((soil, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE, delay: 0.1 + idx * 0.1 }}
                  className={`${soil.color} border rounded-2xl p-5 hover:border-white/[0.15] transition-all duration-300`}>
                  <h4 className="text-sm font-bold text-stone-200 mb-3">{soil.name}</h4>
                  <ul className="space-y-1.5 mb-3">
                    {soil.traits.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-stone-400 text-xs leading-relaxed">
                        <div className={`w-1.5 h-1.5 rounded-full ${soil.dot} mt-1.5 shrink-0`} />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white/[0.03] rounded-lg p-3 mb-2">
                    <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Teste Caseiro</p>
                    <p className="text-stone-400 text-xs italic">{soil.test}</p>
                  </div>
                  <div className="bg-emerald-500/[0.06] rounded-lg p-3">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Correção</p>
                    <p className="text-stone-400 text-xs">{soil.fix}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ImageCard>
        </div>

        {/* ═══ CARD 02 — pH DO SOLO ═══ */}
        <div className="space-y-6 mb-6">
          <ImageCard src={imgPhTeste} alt="Teste caseiro de pH do solo">
            <h2 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight mb-2">
              🟢 O que é pH do Solo e Por Que Importa
            </h2>
            <p className="text-stone-500 text-sm mb-6">A maioria das hortaliças cresce melhor entre pH 6,0 e 7,0 — faixa onde nutrientes ficam quimicamente disponíveis.</p>

            <div className="bg-emerald-500/[0.08] border border-emerald-500/[0.12] rounded-2xl p-5 mb-6">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Escala de pH</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-3 rounded-full" style={{ background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 25%, #22c55e 50%, #3b82f6 75%, #8b5cf6 100%)' }} />
              </div>
              <div className="flex justify-between text-[10px] text-stone-500 font-semibold">
                <span>0 — Ácido</span>
                <span>7 — Neutro</span>
                <span>14 — Alcalino</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-amber-500/[0.06] border border-amber-500/[0.12] rounded-xl p-5">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Método Caseiro — Vinagre + Bicarbonato</p>
                <div className="space-y-3">
                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <p className="text-stone-300 text-xs font-semibold mb-1">Teste Alcalinidade</p>
                    <p className="text-stone-500 text-xs">Solo seco + vinagre → se borbulhar = alcalino</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <p className="text-stone-300 text-xs font-semibold mb-1">Teste Acidez</p>
                    <p className="text-stone-500 text-xs">Solo + água destilada + bicarbonato → se borbulhar = ácido</p>
                  </div>
                  <p className="text-stone-600 text-[10px] italic">Não substitui teste de laboratório, mas indica tendência.</p>
                </div>
              </div>
              <div className="bg-sky-500/[0.06] border border-sky-500/[0.12] rounded-xl p-5">
                <p className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">Método Mais Preciso</p>
                <p className="text-stone-400 text-sm mb-3">Kit medidor de pH de solo — barato e reutilizável.</p>
                <StepList steps={['Umedecer o solo', 'Inserir medidor na terra', 'Aguardar estabilização da leitura']} color="bg-sky-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-500/[0.06] border border-red-500/[0.12] rounded-xl p-4">
                <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Solo Ácido — Correção</p>
                <BulletList items={['Aplicar calcário dolomítico', 'Cinzas de madeira em pequenas quantidades']} color="bg-red-400" />
              </div>
              <div className="bg-violet-500/[0.06] border border-violet-500/[0.12] rounded-xl p-4">
                <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">Solo Alcalino — Correção</p>
                <BulletList items={['Aplicar matéria orgânica', 'Compostagem constante', 'Evitar excesso de calcário']} color="bg-violet-400" />
              </div>
            </div>
          </ImageCard>
        </div>

        {/* ═══ CARD 03 — FERTILIZANTES ═══ */}
        <div className="space-y-6 mb-6">
          <ImageCard src={imgFertilizantes} alt="Comparação fertilizantes orgânicos vs sintéticos">
            <h2 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight mb-2">
              🟡 Tipos de Fertilizantes — Qual Usar e Qual Evitar
            </h2>
            <p className="text-stone-500 text-sm mb-6">Se o fertilizante melhora a vida do solo, ele é aliado. Se apenas força crescimento rápido, é solução temporária.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
                className="bg-emerald-500/[0.08] border border-emerald-500/[0.12] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <h4 className="text-sm font-bold text-emerald-300">Orgânicos</h4>
                </div>
                <p className="text-stone-500 text-xs mb-3">Compostagem, húmus, bokashi, esterco curtido</p>
                <ul className="space-y-1.5">
                  {['Melhoram estrutura do solo', 'Alimentam microbiologia', 'Liberam nutrientes gradualmente'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-400 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 bg-emerald-500/[0.1] rounded-lg p-2 text-center">
                  <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">✓ Ideal para produção contínua</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                className="bg-amber-500/[0.08] border border-amber-500/[0.12] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CircleDot size={16} className="text-amber-400" />
                  <h4 className="text-sm font-bold text-amber-300">Minerais Naturais</h4>
                </div>
                <p className="text-stone-500 text-xs mb-3">Farinha de osso, fosfato natural, pó de rocha</p>
                <ul className="space-y-1.5">
                  {['Fornecem minerais específicos', 'Devem ser usados com equilíbrio', 'Complementam fertilização orgânica'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-400 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 bg-amber-500/[0.1] rounded-lg p-2 text-center">
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">⚖ Usar com equilíbrio</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
                className="bg-red-500/[0.08] border border-red-500/[0.12] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle size={16} className="text-red-400" />
                  <h4 className="text-sm font-bold text-red-300">Sintéticos (NPK)</h4>
                </div>
                <p className="text-stone-500 text-xs mb-3">NPK industrial solúvel — efeito rápido</p>
                <ul className="space-y-1.5">
                  {['Não alimentam o solo', 'Podem causar salinização', 'Reduzem microbiologia ao longo do tempo'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-400 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 bg-red-500/[0.1] rounded-lg p-2 text-center">
                  <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider">✕ Evitar uso contínuo</span>
                </div>
              </motion.div>
            </div>

            <div className="border-l-3 border-amber-500/50 pl-5">
              <p className="text-amber-400 text-sm font-semibold leading-relaxed">
                Regra de Ouro: Se o fertilizante melhora a vida do solo, ele é aliado. Se apenas força crescimento rápido, é solução temporária.
              </p>
            </div>
          </ImageCard>
        </div>

        {/* ═══ CARD 04 — MELHOR TERRA ═══ */}
        <div className="space-y-6 mb-6">
          <ImageCard src={imgSubstrato} alt="Mistura ideal de substrato">
            <h2 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight mb-2">
              🔵 Como Escolher a Melhor Terra para Plantar
            </h2>
            <p className="text-stone-500 text-sm mb-6">Nunca use apenas "terra preta de jardim" sem saber a origem.</p>

            <div className="bg-sky-500/[0.06] border border-sky-500/[0.12] rounded-2xl p-5 mb-6">
              <p className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">Procure</p>
              <BulletList items={['Textura solta', 'Cheiro de terra úmida', 'Presença de matéria orgânica', 'Ausência de entulho ou resíduos']} color="bg-sky-500" />
            </div>

            <div className="bg-amber-500/[0.06] border border-amber-500/[0.12] rounded-2xl p-5 mb-6">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Mistura Ideal para Vasos</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { pct: '40%', label: 'Terra vegetal' },
                  { pct: '30%', label: 'Composto orgânico' },
                  { pct: '20%', label: 'Areia grossa' },
                  { pct: '10%', label: 'Húmus' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className="bg-white/[0.04] border border-amber-500/[0.15] rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300">
                    <p className="text-2xl font-black text-amber-400">{item.pct}</p>
                    <p className="text-stone-400 text-xs font-medium mt-1">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-xl p-4">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <p className="text-stone-400 text-sm">Resultado: Boa drenagem + nutrientes disponíveis + microbiologia ativa</p>
            </div>
          </ImageCard>
        </div>

        {/* ═══ CARD 05 — ERROS ═══ */}
        <InfoCard color="red" icon={AlertTriangle} title="🔴 Erros que Destroem a Fertilidade">
          <div className="bg-red-500/[0.06] border border-red-500/[0.1] rounded-xl p-4 mb-4">
            <ul className="space-y-2">
              {[
                'Excesso de água — encharcamento asfixia raízes',
                'Compactação do solo — impede aeração',
                'Uso constante de fertilizante químico solúvel',
                'Falta de matéria orgânica',
                'Ignorar o pH do solo',
                'Plantar sempre a mesma cultura no mesmo local',
              ].map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
                  className="flex items-start gap-3 bg-white/[0.03] rounded-lg px-3 py-2">
                  <XCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                  <span className="text-stone-400 text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="border-l-3 border-red-400/50 pl-5">
            <p className="text-red-400 text-sm font-semibold">Solo é sistema vivo. Sem manutenção, ele perde equilíbrio.</p>
          </div>
        </InfoCard>

        {/* ═══════════════════════════════════════
             MÉTODOS PRÁTICOS
           ═══════════════════════════════════════ */}
        <SectionDivider label="Métodos Práticos" />

        {/* ── 01 COMPOSTEIRA ── */}
        <div className="space-y-6 mb-8">
          <ImageCard src={imgComposteira} alt="Composteira doméstica">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/[0.12] rounded-xl"><Leaf className="text-amber-400" size={18} /></div>
              <div>
                <span className="text-amber-500/80 text-[9px] font-bold tracking-[0.4em] uppercase block">Módulo 01</span>
                <h2 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight">Composteira Doméstica</h2>
              </div>
            </div>

            <div className="bg-amber-500/[0.06] border border-amber-500/[0.12] rounded-2xl p-5 mb-6">
              <p className="text-stone-400 text-sm leading-relaxed italic">
                "Compostagem é a transformação de resíduos orgânicos em adubo estável, escuro e rico em nutrientes. Tudo que já foi vivo pode voltar ao solo."
              </p>
            </div>

            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ChevronRight size={12} className="text-amber-500" /> Equilíbrio Carbono × Nitrogênio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">🟢 Verdes (Nitrogênio)</p>
                <BulletList items={['Restos de frutas e legumes', 'Borra de café', 'Cascas frescas', 'Esterco']} color="bg-emerald-500" />
              </div>
              <div className="bg-amber-500/[0.06] border border-amber-500/[0.12] rounded-xl p-4">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">🟤 Marrons (Carbono)</p>
                <BulletList items={['Folhas secas', 'Papel não colorido', 'Serragem sem tratamento', 'Papelão picado']} color="bg-amber-600" />
              </div>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-4 mb-6 text-center">
              <p className="text-stone-300 text-sm font-semibold">Proporção ideal: <span className="text-amber-400">2 marrom : 1 verde</span></p>
            </div>

            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ChevronRight size={12} className="text-amber-500" /> Opção Quintal (1m × 1m)
            </h3>
            <StepList steps={[
              'Escolha local ventilado com sombra parcial',
              'Comece com camada de galhos finos (drenagem)',
              'Alterne camadas marrons e verdes',
              'Altura ideal: até 1 metro',
              'Tempo de compostagem: 60 a 90 dias',
            ]} />

            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-6 mb-3 flex items-center gap-2">
              <ChevronRight size={12} className="text-amber-500" /> Opção Urbana (Caixa Plástica)
            </h3>
            <StepList steps={[
              'Caixa plástica grande com tampa + furos laterais e inferiores',
              'Primeira camada: material seco',
              'Segunda camada: restos orgânicos',
              'Cobrir sempre com material seco',
              'Mexer 1 vez por semana',
            ]} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">✓ Saudável</p>
                <BulletList items={['Cheiro de terra úmida', 'Temperatura morna', 'Insetos decompositores']} color="bg-emerald-500" />
              </div>
              <div className="bg-red-500/[0.06] border border-red-500/[0.12] rounded-xl p-4">
                <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">✕ Problema</p>
                <BulletList items={['Cheiro forte → excesso de verde', 'Falta de oxigênio', 'Correção: material seco + revolver']} color="bg-red-400" />
              </div>
            </div>
          </ImageCard>
        </div>

        {/* ── 02 BOKASHI ── */}
        <div className="space-y-6 mb-8">
          <ImageCard src={imgBokashi} alt="Preparo de bokashi">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/[0.12] rounded-xl"><FlaskConical className="text-emerald-400" size={18} /></div>
              <div>
                <span className="text-emerald-500/80 text-[9px] font-bold tracking-[0.4em] uppercase block">Módulo 02</span>
                <h2 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight">Produção de Bokashi</h2>
              </div>
            </div>

            <div className="bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-2xl p-5 mb-6">
              <p className="text-stone-400 text-sm leading-relaxed italic">
                "Bokashi é um concentrado biológico que acelera a vida do solo. Diferente da compostagem aeróbica, ele utiliza fermentação controlada."
              </p>
            </div>

            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ChevronRight size={12} className="text-emerald-500" /> Ingredientes
            </h3>
            <BulletList items={['10 kg de farelo de arroz ou trigo', '2 kg de esterco curtido', '200 ml de melaço diluído em 2L de água', 'Micro-organismos eficientes (ou solo fértil como inoculante)']} color="bg-emerald-500" />

            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-6 mb-3 flex items-center gap-2">
              <ChevronRight size={12} className="text-emerald-500" /> Passo a Passo
            </h3>
            <StepList steps={[
              'Misture farelo + esterco curtido',
              'Dilua melaço na água e umedeça sem encharcar',
              'Teste da mão: aperte — deve formar bloco que se desfaz ao tocar',
              'Armazene em recipiente fechado por 7 a 10 dias',
              'Mexa diariamente para liberar gases',
              'Odor deve ser levemente adocicado (se cheirar podre = contaminação)',
            ]} color="bg-emerald-500" />

            <div className="bg-amber-500/[0.06] border border-amber-500/[0.12] rounded-xl p-4 mt-6">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Uso</p>
              <BulletList items={['100g por metro quadrado incorporado ao solo', 'Nunca aplicar diretamente nas raízes sem misturar à terra']} color="bg-amber-500" />
            </div>
          </ImageCard>
        </div>

        {/* ── 03 MINHOCÁRIO ── */}
        <div className="space-y-6 mb-8">
          <ImageCard src={imgMinhocario} alt="Minhocário doméstico">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/[0.12] rounded-xl"><Bug className="text-amber-400" size={18} /></div>
              <div>
                <span className="text-amber-500/80 text-[9px] font-bold tracking-[0.4em] uppercase block">Módulo 03</span>
                <h2 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight">Minhocário e Húmus Líquido</h2>
              </div>
            </div>

            <div className="bg-amber-500/[0.06] border border-amber-500/[0.12] rounded-2xl p-5 mb-6">
              <p className="text-stone-400 text-sm leading-relaxed italic">
                "Minhocas transformam resíduos em húmus — um dos melhores adubos naturais. Sistema de fertilidade contínua."
              </p>
            </div>

            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ChevronRight size={12} className="text-amber-500" /> Estrutura: 3 Caixas Empilhadas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Caixa Superior', desc: 'Recebe resíduos orgânicos' },
                { label: 'Caixa Intermediária', desc: 'Processamento pelas minhocas' },
                { label: 'Caixa Inferior', desc: 'Coleta de chorume/húmus líquido' },
              ].map((box, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
                  <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">{box.label}</p>
                  <p className="text-stone-400 text-xs">{box.desc}</p>
                </motion.div>
              ))}
            </div>

            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ChevronRight size={12} className="text-amber-500" /> Processo
            </h3>
            <StepList steps={[
              'Coloque terra úmida na caixa superior',
              'Adicione minhocas californianas',
              'Acrescente restos orgânicos picados',
              'Cubra com papel úmido',
              'Manter sombra e ventilação',
              'Em 60 dias surge húmus escuro e granulado',
            ]} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-red-500/[0.06] border border-red-500/[0.12] rounded-xl p-4">
                <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Evitar</p>
                <BulletList items={['Cítricos em excesso', 'Sal, carne e óleo']} color="bg-red-400" />
              </div>
              <div className="bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Húmus Líquido — Diluição</p>
                <p className="text-stone-300 text-sm mb-2">1 parte líquido : 10 partes água</p>
                <p className="text-stone-500 text-xs">Aplicar na base das plantas a cada 15 dias.</p>
              </div>
            </div>
          </ImageCard>
        </div>

        {/* ── 04 pH APROFUNDADO ── */}
        <div className="space-y-6 mb-8">
          <InfoCard color="green" icon={Droplets} title="Análise Caseira de pH — Guia Completo">
            <div className="bg-white/[0.03] rounded-2xl p-5 mb-4">
              <p className="text-stone-400 text-sm leading-relaxed">
                pH define a disponibilidade de nutrientes no solo. Se o pH estiver errado, a planta pode ter deficiência <span className="font-semibold text-stone-300">mesmo com adubo presente</span> — folhas amareladas, crescimento reduzido.
              </p>
            </div>

            <div className="bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-xl p-5 mb-4">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Nutrientes Dependentes de pH</p>
              <div className="flex flex-wrap gap-2">
                {['Nitrogênio', 'Fósforo', 'Potássio', 'Cálcio', 'Magnésio'].map((n) => (
                  <span key={n} className="bg-white/[0.04] border border-emerald-500/[0.15] rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-400">{n}</span>
                ))}
              </div>
            </div>

            <div className="border-l-3 border-emerald-500/50 pl-5">
              <p className="text-emerald-400 text-sm font-semibold">Todos ficam mais disponíveis entre pH 6,0 e 7,0 — a faixa ideal para hortaliças.</p>
            </div>
          </InfoCard>
        </div>

        {/* ═══ CONCLUSÃO ═══ */}
        <SectionDivider label="Conclusão" />

        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="mb-10"
        >
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-stone-200 tracking-tight mb-4">
              Fertilidade Contínua Exige:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {[
                'Matéria orgânica regular',
                'Correção de pH quando necessário',
                'Rotação de culturas',
                'Microbiologia ativa',
                'Observação constante',
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="bg-white/[0.04] border border-amber-500/[0.15] rounded-xl p-4 text-center hover:scale-[1.02] transition-all duration-300">
                  <CheckCircle2 className="text-amber-400 mx-auto mb-2" size={20} />
                  <p className="text-stone-300 text-xs sm:text-sm font-semibold">{item}</p>
                </motion.div>
              ))}
            </div>
            <div className="space-y-2 text-stone-500 text-sm leading-relaxed">
              <p>Solo saudável produz alimento saudável.</p>
              <p className="text-amber-400 font-semibold text-base">E alimento saudável sustenta corpo saudável.</p>
            </div>
          </div>
        </motion.section>

        {/* ═══ NAVIGATION ═══ */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-between"
        >
          <Link to="/soberania-organica/proteina-sustentavel"
            className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 py-4 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 group">
            <ArrowLeft size={16} className="text-stone-500 group-hover:text-amber-400 transition-colors" />
            <div>
              <span className="text-stone-600 text-[9px] font-bold uppercase tracking-wider">Anterior</span>
              <p className="text-stone-300 text-sm font-semibold">Proteína Sustentável</p>
            </div>
          </Link>
          <Link to="/soberania-organica"
            className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 py-4 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 group justify-end">
            <div className="text-right">
              <span className="text-stone-600 text-[9px] font-bold uppercase tracking-wider">Voltar</span>
              <p className="text-stone-300 text-sm font-semibold">Soberania Orgânica</p>
            </div>
            <ArrowRight size={16} className="text-stone-500 group-hover:text-amber-400 transition-colors" />
          </Link>
        </motion.div>

        <MicroCtaResistencia variant="alimentar" />

        {/* Footer */}
        <motion.div className="mt-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
          <p className="text-stone-600 text-xs leading-relaxed max-w-md mx-auto">
            Este módulo faz parte da Fase 03 — Autonomia Alimentar do Soberania Orgânica.
            Conteúdo baseado em técnicas validadas de fertilidade orgânica e manejo sustentável de solo.
          </p>
        </motion.div>

      </div>
    </div>
    </>
  );
}
