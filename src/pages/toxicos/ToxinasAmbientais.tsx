import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Leaf, Droplets, Wind, Home, Beaker, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import BackToHome from '@/components/BackToHome';

import bgAmbientais from '@/assets/toxicos/bg-ambientais.webp';
import imgPlastico from '@/assets/toxicos/amb-plastico.webp';
import imgLimpeza from '@/assets/toxicos/amb-limpeza.webp';
import imgAr from '@/assets/toxicos/amb-ar.webp';
import imgMobiliario from '@/assets/toxicos/amb-mobiliario.webp';
import imgCosmeticos from '@/assets/toxicos/amb-cosmeticos.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const CONTAMINANTES = [
  {
    icon: Droplets,
    titulo: 'Plásticos e Microplásticos',
    desc: 'Presentes em recipientes alimentares, garrafas, embalagens e utensílios de cozinha. Bisfenol A (BPA) e ftalatos são disruptores endócrinos que migram para alimentos quando aquecidos. Microplásticos foram encontrados no sangue humano, na placenta e no leite materno em estudos publicados entre 2021 e 2023.',
    impacto: 'Disrupção hormonal, infertilidade, desenvolvimento anormal em crianças, potencial carcinogênico documentado em estudos de longa duração.',
    solucao: 'Substitua recipientes plásticos por vidro, aço inox ou cerâmica. Nunca aqueça alimentos em plástico, mesmo os rotulados como "BPA free". Evite garrafas plásticas reutilizadas e filme plástico em alimentos quentes.',
    img: imgPlastico,
  },
  {
    icon: Beaker,
    titulo: 'Produtos de Limpeza Convencionais',
    desc: 'Detergentes, desinfetantes e alvejantes contêm compostos orgânicos voláteis (COVs), formaldeído e cloro que se acumulam no ar interno. A exposição crônica está associada a problemas respiratórios, dermatites e sensibilização alérgica progressiva ao longo dos anos.',
    impacto: 'Irritação respiratória, asma ocupacional, dermatite de contato, disrupção endócrina e maior incidência de alergias em crianças.',
    solucao: 'Use vinagre branco, bicarbonato de sódio e sabão de coco como base. Evite aerossóis e fragrâncias sintéticas. Ventile o ambiente após qualquer limpeza. Leia rótulos e desconfie de "fragrância" como ingrediente único.',
    img: imgLimpeza,
  },
  {
    icon: Wind,
    titulo: 'Qualidade do Ar Interno',
    desc: 'O ar dentro de casa pode ser de 2 a 5 vezes mais poluído que o ar externo, segundo a EPA dos Estados Unidos. Tintas, vernizes, móveis de MDF, carpetes e purificadores de ar liberam COVs continuamente. A falta de ventilação adequada concentra esses compostos a níveis críticos.',
    impacto: 'Síndrome do edifício doente, fadiga crônica, dores de cabeça recorrentes, irritação de mucosas e queda de imunidade.',
    solucao: 'Ventilação cruzada diária de 15 minutos, mesmo em dias frios. Plantas purificadoras como espada-de-são-jorge, jiboia e palmeira-bambu. Evite ambientadores sintéticos e velas perfumadas industriais.',
    img: imgAr,
  },
  {
    icon: Home,
    titulo: 'Materiais de Construção e Mobiliário',
    desc: 'MDF, compensados e aglomerados liberam formaldeído por anos após a instalação. Tintas e vernizes convencionais emitem COVs durante meses. Tapetes e cortinas acumulam retardantes de chama bromados (PBDEs) que são neurotóxicos e bioacumulativos no tecido adiposo.',
    impacto: 'O formaldeído está classificado como cancerígeno do Grupo 1 pela IARC. Neurotoxicidade dos PBDEs e disrupção tireoidiana documentada.',
    solucao: 'Opte por madeira maciça ou MDF E1 de baixa emissão. Use tintas à base de água com selo de baixa emissão. Lave tecidos novos antes do primeiro uso. Ventile móveis novos por pelo menos 30 dias antes de uso intensivo.',
    img: imgMobiliario,
  },
  {
    icon: AlertTriangle,
    titulo: 'Cosméticos e Higiene Pessoal',
    desc: 'Parabenos, triclosan, alumínio, sulfatos e fragrâncias sintéticas estão presentes em desodorantes, shampoos, cremes e protetores solares. A pele absorve até 60% do que é aplicado sobre ela, e esses compostos se acumulam em tecidos adiposos ao longo de décadas, atravessando placenta e barreira hematoencefálica.',
    impacto: 'Disrupção endócrina, bioacumulação progressiva, sensibilização alérgica e potencial carcinogênico de parabenos em estudos in vitro.',
    solucao: 'Leia rótulos de cosméticos como você lê rótulos de alimentos. Priorize marcas com INCI transparente e poucos ingredientes. Considere alternativas naturais como óleo de coco, manteiga de karité e bicarbonato como desodorante.',
    img: imgCosmeticos,
  },
];

const ACOES_IMEDIATAS = [
  'Substitua recipientes plásticos por vidro na cozinha',
  'Ventile a casa por 15 minutos todas as manhãs',
  'Troque produtos de limpeza sintéticos por vinagre e bicarbonato',
  'Lave roupas novas antes do primeiro uso',
  'Elimine ambientadores e velas perfumadas sintéticas',
  'Filtre a água da torneira (cloro residual e metais pesados)',
  'Escolha cosméticos com até 5 ingredientes reconhecíveis',
  'Instale pelo menos 1 planta purificadora por cômodo',
];

const FAQ_ITEMS = [
  {
    q: 'Poluição indoor é realmente pior que a externa?',
    a: 'Sim. Segundo a EPA (Agência de Proteção Ambiental dos Estados Unidos), os níveis de poluentes internos são tipicamente de 2 a 5 vezes maiores que os externos, podendo chegar a 100 vezes em alguns casos. Considerando que passamos cerca de 90% do tempo em ambientes fechados, a exposição cumulativa é significativa para sistema respiratório e endócrino.',
  },
  {
    q: 'Plantas realmente purificam o ar?',
    a: 'O estudo da NASA de 1989 (Clean Air Study) demonstrou que certas plantas podem remover COVs do ar. Porém, seriam necessárias muitas plantas para ter impacto mensurável em um cômodo. As plantas ajudam marginalmente, mas a ventilação mecânica ou natural é muito mais eficaz. Use plantas como complemento, não como solução única.',
  },
  {
    q: 'Vale a pena comprar purificador de ar?',
    a: 'Para pessoas com asma, alergias ou moradores de áreas com poluição externa elevada, sim. Purificadores com filtro HEPA H13 removem 99,97% das partículas acima de 0,3 mícron. Para COVs, filtros de carvão ativado ajudam. Mas nenhum purificador substitui ventilação adequada e controle de fontes emissoras dentro de casa.',
  },
  {
    q: 'Cosméticos naturais são realmente mais seguros?',
    a: 'Depende. "Natural" não é regulamentado e pode ser apenas marketing. Procure certificações sérias como Ecocert, BDIH ou Cosmos Organic. Verifique a lista INCI completa, prefira produtos com menos de 10 ingredientes e teste em pequena área antes do uso prolongado. Mesmo ingredientes naturais podem causar alergias individuais.',
  },
  {
    q: 'Filtros de água domésticos resolvem o problema?',
    a: 'Filtros de carvão ativado removem cloro, sabor e odor. Filtros de osmose reversa removem flúor, metais pesados e a maioria dos contaminantes, mas também removem minerais benéficos. Para a maioria dos lares, um filtro multielemento de barro ou um sistema de carvão ativado de qualidade já reduz drasticamente a exposição cumulativa via consumo de água.',
  },
];

export default function ToxinasAmbientais() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "headline": "Toxinas Ambientais: Contaminantes Domésticos e Poluição Indoor",
    "description": "Investigação completa sobre plásticos, produtos de limpeza, qualidade do ar interno, materiais de construção e cosméticos que contaminam o ambiente doméstico.",
    "author": { "@type": "Person", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
    "datePublished": "2026-04-20",
    "image": "https://lordjunnior.com.br/heroes/toxinas-ambientais.webp",
    "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
    "mainEntityOfPage": "https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/toxinas-ambientais",
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-green-400/30 relative text-[17px] md:text-[18px] lg:text-[19px] leading-relaxed [&_p]:leading-[1.75]" style={{ background: '#050a08' }}>
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(5,10,8,0.88), rgba(5,10,8,0.95)), url(${bgAmbientais})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Toxinas Ambientais: Plásticos, Limpeza, Ar Interno e Cosméticos | Lord Junnior</title>
        <meta name="description" content="Mapa completo de contaminantes domésticos. Plásticos, BPA, COVs, formaldeído, fragrâncias sintéticas e parabenos. Identifique, substitua e proteja seu território doméstico." />
        <meta name="keywords" content="toxinas ambientais, BPA, microplásticos, COV, formaldeído, qualidade do ar interno, poluição indoor, cosméticos sem parabeno, ftalatos, autonomia doméstica" />
        <meta property="og:title" content="Toxinas Ambientais: O Que Contamina Seu Espaço Sem Você Ver" />
        <meta property="og:description" content="Cinco categorias de contaminantes que estão dentro da sua casa agora. Cada um com fonte, impacto e solução prática." />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/toxinas-ambientais.webp" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/toxinas-ambientais" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #22c55e, #10b981)' }} />

      <CinematicHero
        image="/heroes/toxinas-ambientais.webp"
        phase="Vetor 04 · Ambiente"
        title="Toxinas Ambientais"
        subtitle="Contaminantes domésticos, materiais sintéticos, qualidade do ar interno e produtos químicos que atravessam a pele e os pulmões diariamente. Mapeie, substitua, proteja seu território."
        icon={Leaf}
        accentColor="green"
        backLink="/soberania-organica/toxicos-ocultos"
        backLabel="Tóxicos Ocultos"
      />

      {/* Capítulo 01: Diagnóstico */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-green-500 rounded-full" />
              <span className="text-green-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 01 · O Diagnóstico</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              SUA CASA NÃO É <span className="text-green-400">UM REFÚGIO</span>
            </h2>
            <p className="text-stone-300 text-base md:text-lg leading-relaxed max-w-3xl mb-4">
              Você passa 90% do tempo em ambientes fechados. O ar interno pode ser até 5 vezes mais poluído que o externo, segundo a EPA. Cada material sintético, cada produto de limpeza, cada cosmético contribui para uma carga química cumulativa.
            </p>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl">
              Não existe "exposição segura" quando se trata de bioacumulação. Os efeitos aparecem anos depois, quando já é tarde para identificar a causa. O mapa abaixo é o ponto de partida para retomar controle do território onde você dorme, come e respira.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '90%', label: 'Do tempo médio diário em ambientes fechados', alt: 180 },
              { value: '5x', label: 'Mais poluição indoor que outdoor segundo a EPA', alt: 200 },
              { value: '60%', label: 'Da pele absorve cosméticos aplicados topicamente', alt: 190 },
              { value: '100+', label: 'Substâncias químicas detectadas no sangue do brasileiro médio', alt: 210 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-green-500/10 bg-gradient-to-br from-green-500/[0.04] to-transparent p-6 md:p-8 hover:border-green-500/30 hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.3)] transition-all duration-500 cursor-default"
                style={{ minHeight: `${stat.alt}px` }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-green-500 to-transparent" />
                <p className="text-4xl md:text-5xl font-black text-green-400 mb-3 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
                <p className="text-stone-400 text-xs md:text-sm leading-relaxed group-hover:text-stone-200 transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capítulo 02: Contaminantes com imagens */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-green-500 rounded-full" />
              <span className="text-green-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 02 · O Mapa</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              MAPA DE <span className="text-green-400">CONTAMINANTES</span>
            </h2>
            <p className="text-stone-400 text-base leading-relaxed">
              Cinco categorias de contaminantes que estão dentro da sua casa agora. Cada ficha documenta a fonte, o impacto na saúde e a solução prática para substituição imediata ou progressiva.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CONTAMINANTES.map((cont, i) => (
              <motion.article
                key={cont.titulo}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} custom={i % 2}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-green-500/30 transition-all duration-500 ${i === 4 ? 'lg:col-span-2' : ''}`}
                style={{ minHeight: i % 3 === 0 ? '680px' : i % 3 === 1 ? '720px' : '660px' }}
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={cont.img}
                    alt={cont.titulo}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a08] via-[#050a08]/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 backdrop-blur-md border border-green-500/30 flex items-center justify-center">
                      <cont.icon size={20} className="text-green-300" />
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h4 className="text-xl md:text-2xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {cont.titulo}
                  </h4>
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-5">{cont.desc}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="border-l-2 border-red-500/40 pl-4 bg-red-500/[0.03] py-3 rounded-r">
                      <p className="text-[10px] text-red-400/70 font-bold uppercase tracking-wider mb-1">Impacto na saúde</p>
                      <p className="text-stone-300 text-sm leading-relaxed">{cont.impacto}</p>
                    </div>
                    <div className="border-l-2 border-green-500/40 pl-4 bg-green-500/[0.03] py-3 rounded-r">
                      <p className="text-[10px] text-green-400/70 font-bold uppercase tracking-wider mb-1">Solução prática</p>
                      <p className="text-stone-300 text-sm leading-relaxed">{cont.solucao}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Capítulo 03: Ações imediatas */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-green-500 rounded-full" />
              <span className="text-green-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 03 · A Ação</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              8 AÇÕES <span className="text-green-400">IMEDIATAS</span>
            </h2>
            <p className="text-stone-400 text-base leading-relaxed">
              Mudanças simples que reduzem exposição a contaminantes domésticos. Cada uma pode ser implementada hoje, sem custo significativo, com efeito acumulativo ao longo dos anos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACOES_IMEDIATAS.map((acao, i) => (
              <motion.div
                key={acao}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.05}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-green-500/30 transition-all duration-500"
                style={{ minHeight: i % 3 === 0 ? '160px' : '180px' }}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-400/70 mt-0.5 shrink-0 group-hover:text-green-400 transition-colors" />
                  <p className="text-stone-300 text-sm md:text-base leading-relaxed">{acao}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-green-500 rounded-full" />
              <span className="text-green-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 04 · O Debate</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PERGUNTAS <span className="text-green-400">FREQUENTES</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={item.q}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                whileHover={{ y: -2 }}
                className="p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-green-500/20 transition-all duration-500"
              >
                <h4 className="text-base md:text-lg font-bold text-stone-100 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.q}</h4>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Fechamento */}
      <section className="relative z-10 py-20 md:py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quatro vetores. <span className="text-red-400">Uma missão.</span>
            </h3>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10">
              Corpo, mente, comportamento e ambiente. Cada módulo investigou um vetor diferente de influência invisível. O próximo passo é continuar construindo autonomia real dentro do Soberania Orgânica.
            </p>
            <Link
              to="/soberania-organica/toxicos-ocultos"
              className="inline-flex items-center gap-3 bg-red-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-red-400 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-[1.03] transition-all duration-500 group"
            >
              <Shield size={18} className="group-hover:rotate-12 transition-transform duration-500" />
              Voltar ao Laboratório
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Proteger o território começa por dentro.</p>
      </div>
    </div>
  );
}
