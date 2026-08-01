import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Brain, Flame, Wind, Shield, Heart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgSistemas from '@/assets/cp-sistemas-corpo.jpg';
import imgPlantas from '@/assets/cp-plantas-pratica.jpg';

import { DIGESTIVO, RESPIRATORIO, NERVOSO, IMUNE, MUSCULAR } from '@/components/conhecimento-perdido/PlantData';
import { SistemaSection } from '@/components/conhecimento-perdido/SistemaSection';
import { MatrizComparativa } from '@/components/conhecimento-perdido/MatrizComparativa';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

export default function BaseFisiologica() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Base Fisiológica: Sistemas Corporais e Mecanismos Bioquímicos das Plantas | Lord Junnior</title>
        <meta name="description" content="Organização técnica por sistemas corporais. Flavonoides, alcaloides, terpenos e compostos fenólicos aplicados ao corpo humano. Entenda como as plantas agem em cada sistema." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/base-fisiologica" />
        <meta property="og:title" content="Base Fisiológica: Como as Plantas Agem no Corpo" />
        <meta property="og:description" content="Digestivo, respiratório, nervoso, imune e muscular. Compostos bioativos e mecanismos de ação documentados." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/base-fisiologica" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Base Fisiológica: Mecanismos Bioquímicos das Plantas Medicinais",
          "description": "Organização técnica por sistemas corporais e compostos bioativos.",
          "url": "https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/base-fisiologica",
          "author": { "@type": "Person", "name": "Lord Junnior" },
          "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
          "lastReviewed": "2026-03-01",
          "disclaimer": "Conteúdo educacional sobre fitoterapia. Não substitui orientação médica profissional."
        })}</script>
      </Helmet>
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
      <CinematicHero
        image="/heroes/cp-base-fisiologica.webp"
        phase="Bloco 02 · Conhecimento Perdido"
        title="Base Fisiológica"
        subtitle="Organização técnica por sistemas corporais, mecanismos bioquímicos e resposta adaptativa do organismo. Flavonoides, alcaloides, terpenos e compostos fenólicos aplicados."
        icon={Brain}
        accentColor="blue"
        backLink="/soberania-organica/conhecimento-perdido"
        backLabel="Conhecimento Perdido"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-32">

        {/* ─── MAPA DOS SISTEMAS ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-14">
            <img src={imgSistemas} alt="Os 5 sistemas fisiológicos" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/30 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <div className="flex flex-wrap gap-2">
                {['Digestivo', 'Respiratório', 'Nervoso', 'Imune', 'Muscular'].map(s => (
                  <span key={s} className="text-[10px] font-bold tracking-widest uppercase bg-cyan-500/15 text-cyan-300 px-3 py-1.5 rounded-full border border-cyan-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-cyan-950/20 border border-cyan-700/20 rounded-2xl p-8 md:p-12 mb-14">
            <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-4">
              Flavonoides reduzem estresse oxidativo. Compostos amargos estimulam o fígado. 
              Fibras modulam microbiota intestinal. Óleos essenciais possuem ação antimicrobiana. 
              <span className="text-cyan-400 font-semibold"> Nada aqui é crença — é bioquímica aplicada.</span>
            </p>
            <p className="text-stone-500 text-sm leading-relaxed">
              Cada planta documentada abaixo atua em vias bioquímicas específicas, com mecanismo de ação identificado, 
              compostos ativos listados e dosagens conservadoras baseadas em farmacopeias reconhecidas.
            </p>
          </div>
        </motion.section>

        {/* ─── FICHAS POR SISTEMA ─── */}
        <div className="mb-28">
          <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-14">
            <img src={imgPlantas} alt="Plantas medicinais na prática" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/30 to-transparent" />
          </div>

          <SistemaSection titulo="DIGESTIVO" subtitulo="Bile, motilidade intestinal e proteção da mucosa gástrica." icon={Flame} plantas={DIGESTIVO} accentColor="green" index={1} />
          <SistemaSection titulo="RESPIRATÓRIO" subtitulo="Broncodilatação, fluidificação de muco e ação antimicrobiana leve." icon={Wind} plantas={RESPIRATORIO} accentColor="cyan" index={2} />
          <SistemaSection titulo="NERVOSO" subtitulo="Modulação GABA, relaxamento e qualidade do sono." icon={Brain} plantas={NERVOSO} accentColor="purple" index={3} />
          <SistemaSection titulo="IMUNE" subtitulo="Modulação da resposta imune, ação antimicrobiana e anti-inflamatória." icon={Shield} plantas={IMUNE} accentColor="amber" index={4} />
          <SistemaSection titulo="MUSCULAR & INFLAMATÓRIO" subtitulo="Circulação local, cicatrização e redução da inflamação tópica." icon={Heart} plantas={MUSCULAR} accentColor="orange" index={5} />
        </div>

        {/* ─── MATRIZ COMPARATIVA ─── */}
        <MatrizComparativa />

        <MicroCtaResistencia variant="conhecimento" />

        {/* ─── NAVEGAÇÃO ENTRE BLOCOS ─── */}
        <div className="flex flex-col sm:flex-row gap-4 mt-20">
          <Link to="/conhecimento-perdido/contexto-historico"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-6 py-4 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all">
            ← Contexto Histórico
          </Link>
          <Link to="/conhecimento-perdido/seguranca-e-limites"
            className="flex-1 flex items-center justify-center gap-2 bg-cyan-600/20 border border-cyan-500/30 rounded-xl px-6 py-4 text-cyan-300 text-sm font-bold hover:bg-cyan-600/30 transition-all group">
            Próximo: Segurança e Limites <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
