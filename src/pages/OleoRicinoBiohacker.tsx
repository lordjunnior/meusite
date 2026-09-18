import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Droplets, Shield, FlaskConical, Eye, AlertTriangle,
  Leaf, Flame, Heart, Quote, Microscope, Brain, Zap, ChevronRight,
  BookOpen, Ban, Beaker, ExternalLink, Lock, Target, Sparkles
} from 'lucide-react';
import PageFloatingToc from '@/components/PageFloatingToc';
import RealTestimonial from '@/components/RealTestimonial';

import avatarBruna from '@/assets/avatar-bruna.webp';
import avatarEba from '@/assets/avatar-eba.webp';
import avatarAnaCarol from '@/assets/avatar-anacarol.webp';
import avatarRenata from '@/assets/avatar-renata.webp';
import avatarCarlos from '@/assets/avatar-carlos.webp';
import avatarPatricia from '@/assets/avatar-patricia.webp';
import avatarDiego from '@/assets/avatar-diego.webp';
import avatarMarcia from '@/assets/avatar-marcia.webp';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

const TOC_ITEMS = [
  { id: 'quebra-padrao', label: 'A Grande Mentira', num: '01' },
  { id: 'ciencia-escondida', label: 'Ciência Escondida', num: '02' },
  { id: 'mecanismo', label: 'O Mecanismo', num: '03' },
  { id: 'aplicacoes', label: 'Aplicações', num: '04' },
  { id: 'relatos', label: 'Relatos Reais', num: '05' },
  { id: 'protocolo', label: 'Protocolo', num: '06' },
  { id: 'faq', label: 'FAQ', num: '07' },
];

/* ── DADOS ── */
const SCIENTIFIC_EVIDENCE = [
  {
    source: "Journal of Ethnopharmacology (2011)",
    detail: "Cientistas detalharam como o óleo de rícino induz efeitos anti-inflamatórios potentes e modulação do sistema imunológico através da pele. O ácido ricinoleico ativa vias que reduzem a inflamação sistêmica sem os efeitos colaterais dos corticoides sintéticos.",
    icon: FlaskConical,
  },
  {
    source: "Universidade de Tecnologia de Graz, Áustria",
    detail: "Confirmou que o ácido ricinoleico atua nos receptores EP3 de prostaglandina, explicando sua eficácia única em drenar o sistema linfático. Este mecanismo é o mesmo que a indústria farmacêutica utiliza em anti-inflamatórios de última geração, mas disponível em uma planta que custa o preço de um café.",
    icon: Microscope,
  },
  {
    source: "International Journal of Molecular Sciences (2019)",
    detail: "Pesquisadores documentaram a capacidade de penetração transdérmica do ácido ricinoleico, superior à maioria dos veículos farmacológicos convencionais. A molécula atravessa a barreira cutânea e atinge tecidos profundos, onde dissolve acúmulos inflamatórios.",
    icon: Beaker,
  },
  {
    source: "Lipids in Health and Disease (2012)",
    detail: "Estudo demonstrou que o ácido ricinoleico constitui até 90% do óleo de rícino e possui propriedades analgésicas e anti-inflamatórias comparáveis a medicamentos como o capsaicina, sem irritação tecidual associada.",
    icon: Brain,
  },
];

const APPLICATIONS = [
  {
    title: "Sistema Linfático",
    desc: "Compressas transdérmicas sobre o fígado e abdômen para drenar toxinas acumuladas. O ácido ricinoleico ativa a circulação linfática e acelera a eliminação de resíduos metabólicos.",
    icon: Droplets,
    color: "amber",
  },
  {
    title: "Anti-inflamatório Sistêmico",
    desc: "Aplicação tópica em articulações, músculos e zonas de dor crônica. Penetra tecidos profundos e dissolve inflamação sem os efeitos hepatotóxicos dos anti-inflamatórios industriais.",
    icon: Flame,
    color: "rose",
  },
  {
    title: "Regeneração Capilar",
    desc: "Massagem no couro cabeludo para estimular folículos dormentes. O ácido ricinoleico aumenta o fluxo sanguíneo local e equilibra o pH do couro cabeludo, criando condições ideais para crescimento.",
    icon: Sparkles,
    color: "violet",
  },
  {
    title: "Fortalecimento Ocular",
    desc: "Aplicação controlada (1 gota) nos cantos dos olhos antes de dormir. Hidratação profunda que combate olho seco crônico e reduz a pressão intraocular de forma natural.",
    icon: Eye,
    color: "sky",
  },
  {
    title: "Desintoxicação Hepática",
    desc: "Cataplasma de flanela embebida em óleo aquecido sobre o hipocôndrio direito. Técnica documentada por Edgar Cayce e validada por naturopatas em mais de 14.000 protocolos clínicos.",
    icon: Shield,
    color: "emerald",
  },
  {
    title: "Regulação Tireoidiana",
    desc: "Aplicação direta na região do pescoço sobre a tireoide. Relatos consistentes de normalização de TSH e T4 livre em protocolos de 90 dias combinados com iodo natural.",
    icon: Target,
    color: "teal",
  },
];

const TESTIMONIALS = [
  { name: "Bruna Chufulim", username: "brunachufulim", platform: "Instagram", text: "Uma dermatologista me disse que mancharia minha pupila e causaria cegueira. Pura demonização. Hoje uso nos cílios e sobrancelhas para fortalecimento natural. Não abro mão.", badge: "Fortalecimento capilar", avatar: avatarBruna },
  { name: "M.A.A. Eba", username: "m.a.a.eba", platform: "Instagram", text: "Este óleo é magnífico. Desfaz até esporão de calcâneo e catarata. É impressionante o poder que ele tem.", badge: "Dissolução de calcificações", avatar: avatarEba },
  { name: "Ana Carol Madsoo", username: "anacarolmadsoo", platform: "Instagram", text: "Vi uma matéria falando que é excelente passar no pescoço para regular a tireoide. Incrível como escondem isso.", badge: "Regulação tireoidiana", avatar: avatarAnaCarol },
  { name: "Renata Oliveira", username: "renata.oliveira", platform: "Instagram", text: "Minha avó usava cataplasma de mamona no fígado toda semana. Viveu até os 97 anos sem tomar nenhum remédio de farmácia. A sabedoria ancestral funciona.", badge: "Desintoxicação hepática", avatar: avatarRenata },
  { name: "Carlos Machado", username: "carlos.machado", platform: "Instagram", text: "Passei meses gastando com anti-inflamatórios caros para dor no joelho. Comecei a aplicar óleo de rícino com flanela aquecida e em 3 semanas a inflamação cedeu completamente.", badge: "Anti-inflamatório natural", avatar: avatarCarlos },
  { name: "Patrícia Lemos", username: "patricia.lemos", platform: "Instagram", text: "Uso há 2 anos nas sobrancelhas que eu destruí com pinça na adolescência. Voltaram a crescer de forma natural. Nenhum sérum de R$200 fez isso.", badge: "Regeneração folicular", avatar: avatarPatricia },
  { name: "Diego Santana", username: "diego.santana", platform: "Instagram", text: "Meu filho de 4 anos tinha constipação crônica. A pediatra queria prescrever laxante industrial. Comecei a massagear o abdômen dele com óleo de rícino morno e em uma semana normalizou.", badge: "Regulação intestinal", avatar: avatarDiego },
  { name: "Márcia Bonfim", username: "marcia.bonfim", platform: "Instagram", text: "Tenho fibromialgia e o único alívio real que encontrei foi compressa de rícino nas áreas de dor. Não é cura milagrosa, é bioquímica pura funcionando.", badge: "Controle de fibromialgia", avatar: avatarMarcia },
];

const FAQ_DATA = [
  {
    q: "O óleo de rícino causa cegueira?",
    a: "Não. Esta é a narrativa de medo mais difundida e sem fundamento científico. O ácido ricinoleico, componente ativo do óleo, é utilizado em colírios prescritos por oftalmologistas. A confusão vem da ricina, uma proteína tóxica presente na semente crua, que é completamente eliminada no processo de prensagem a frio. O óleo puro de uso cosmético ou farmacêutico não contém ricina."
  },
  {
    q: "Qual a diferença entre óleo de rícino e óleo de mamona?",
    a: "São o mesmo produto. 'Rícino' vem do latim (Ricinus communis) e 'mamona' é o nome popular brasileiro para a planta. O importante não é o nome, mas a pureza: procure sempre óleo prensado a frio, sem solventes ou refinamento químico. A versão industrial (hexano-extraída) perde grande parte das propriedades terapêuticas."
  },
  {
    q: "Posso ingerir óleo de rícino?",
    a: "O uso interno como laxante é documentado há milênios, mas não é o foco deste dossiê. O poder real do ácido ricinoleico está na aplicação transdérmica, onde ele penetra tecidos profundos sem passar pelo sistema digestivo. Para uso interno, doses controladas (1 colher de chá) podem ser utilizadas, mas consulte um profissional de saúde integrativa."
  },
  {
    q: "Quanto tempo leva para ver resultados com cataplasma?",
    a: "Protocolos de cataplasma hepática mostram resultados perceptíveis entre 7 e 21 dias de uso consistente (mínimo 3x por semana, 45 a 60 minutos por sessão). Regeneração capilar e fortalecimento de cílios levam de 30 a 90 dias. Dores articulares e inflamações agudas podem ceder em 48 a 72 horas."
  },
  {
    q: "Por que a indústria farmacêutica não fala sobre isso?",
    a: "Não se patenteia uma planta que cresce em qualquer terreno baldio do mundo. O custo de um frasco de óleo de rícino puro (100ml) varia entre R$8 e R$15. Compare com anti-inflamatórios, cremes regeneradores e laxantes industriais que custam de R$40 a R$200. A matemática explica o silêncio."
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function OleoRicinoBiohacker() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Óleo de Rícino: O Biohacker de R$10 que a Big Pharma Odeia | Lord Junnior</title>
        <meta name="description" content="Dossiê de desconstrução: a ciência escondida do ácido ricinoleico. Anti-inflamatório transdérmico, drenagem linfática e regeneração celular. O biohacking de baixo custo que a indústria farmacêutica silencia." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/oleo-ricino-biohacker" />
        <meta property="og:title" content="Óleo de Rícino: Dossiê de Biohacking Transdérmico" />
        <meta property="og:description" content="A verdade científica sobre o ácido ricinoleico que a indústria farmacêutica esconde." />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/oleo-ricino-dossier.webp" />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/oleo-ricino-biohacker" />
        <meta property="og:type" content="article" />

        {/* Schema: TechArticle */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "Óleo de Rícino: Dossiê de Biohacking Transdérmico contra Inflamação",
          "description": "A verdade científica e transdérmica sobre o ácido ricinoleico que a indústria farmacêutica esconde.",
          "image": "https://lordjunnior.com.br/heroes/oleo-ricino-dossier.webp",
          "author": { "@type": "Person", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
          "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
          "datePublished": "2026-03-22",
          "dateModified": "2026-03-22",
          "keywords": "óleo de rícino, ácido ricinoleico, anti-inflamatório transdérmico, biohacking, sistema linfático, soberania orgânica",
          "about": [
            { "@type": "Thing", "name": "Ácido Ricinoleico", "sameAs": "https://pt.wikipedia.org/wiki/%C3%81cido_ricinoleico" },
            { "@type": "Thing", "name": "Ricinus communis", "sameAs": "https://pt.wikipedia.org/wiki/Ricinus_communis" }
          ],
          "mainEntityOfPage": { "@type": "WebPage", "@id": "https://lordjunnior.com.br/soberania-organica/oleo-ricino-biohacker" }
        })}</script>

        {/* Schema: FAQPage */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_DATA.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}</script>

        {/* Schema: BreadcrumbList */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://lordjunnior.com.br/" },
            { "@type": "ListItem", "position": 2, "name": "Soberania Orgânica", "item": "https://lordjunnior.com.br/soberania-organica" },
            { "@type": "ListItem", "position": 3, "name": "Autonomia Biológica", "item": "https://lordjunnior.com.br/soberania-organica/autonomia-biologica" },
            { "@type": "ListItem", "position": 4, "name": "Óleo de Rícino: Dossiê Biohacker", "item": "https://lordjunnior.com.br/soberania-organica/oleo-ricino-biohacker" }
          ]
        })}</script>

        {/* Schema: SiteNavigationElement */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SiteNavigationElement",
          "name": "Dossiê Óleo de Rícino",
          "url": "https://lordjunnior.com.br/soberania-organica/oleo-ricino-biohacker"
        })}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="amber" />

      <article className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #050505 0%, #080604 8%, #0d0a06 20%, #0a0806 40%, #080604 60%, #060504 80%, #050505 100%)' }}>

        {/* ═══ AMBIENT ORBS ═══ */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] right-[8%] w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)' }} />
          <div className="absolute top-[40%] left-[3%] w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.04) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[15%] right-[15%] w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(180,83,9,0.03) 0%, transparent 70%)' }} />
        </div>

        {/* ═══════════════════════════════════════════════════════════
           HERO: A GRANDE QUEBRA DE PADRÃO
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center will-change-transform"
              style={{
                backgroundImage: `url('/heroes/oleo-ricino-dossier.webp')`,
                filter: 'brightness(0.3) saturate(0.8)',
              }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.6) 40%, rgba(5,5,5,0.95) 75%, rgba(5,5,5,1) 100%)',
            }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 40%, rgba(5,5,5,0.85) 100%)',
            }} />
          </div>

          {/* Breadcrumb */}
          <nav className="absolute top-6 left-6 md:left-16 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] z-20">
            <Link to="/" className="text-stone-600 hover:text-amber-400 transition-colors">Início</Link>
            <span className="text-stone-700">/</span>
            <Link to="/soberania-organica" className="text-stone-600 hover:text-amber-400 transition-colors">Soberania Orgânica</Link>
            <span className="text-stone-700">/</span>
            <Link to="/soberania-organica/autonomia-biologica" className="text-stone-600 hover:text-amber-400 transition-colors">Fase 02</Link>
            <span className="text-stone-700">/</span>
            <span className="text-amber-400">Dossiê Rícino</span>
          </nav>

          <div className="max-w-5xl relative z-10">
            <motion.div {...fade(0)} className="mb-5 inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl backdrop-blur-sm">
              <Lock className="text-amber-400" size={14} />
              <span className="text-amber-300/90 text-[10px] md:text-xs font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                DOSSIÊ DE DESCONSTRUÇÃO / FASE 02
              </span>
            </motion.div>

            <h1 className="mb-8 space-y-2 md:space-y-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <motion.span className="block text-4xl md:text-[5rem] lg:text-[7rem] font-black tracking-tighter leading-[0.95] text-white"
                initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: APPLE_EASE, delay: 0.1 }}
              >ÓLEO DE RÍCINO:</motion.span>
              <motion.span className="block text-3xl md:text-[3.5rem] lg:text-[5rem] font-black tracking-tighter leading-[1.05] text-amber-400"
                initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: APPLE_EASE, delay: 0.3 }}
              >O Biohacker de R$10</motion.span>
              <motion.span className="block text-3xl md:text-[3.5rem] lg:text-[5rem] font-black tracking-tighter leading-[1.05] text-amber-600/60"
                initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: APPLE_EASE, delay: 0.5 }}
              >que a Big Pharma Odeia.</motion.span>
            </h1>

            <motion.p {...fade(0.7)} className="text-stone-300 text-sm md:text-lg leading-relaxed max-w-3xl mb-4">
              Eles treinaram você para acreditar que ele serve apenas como laxante. A verdade é que o <span className="text-amber-400 font-bold">ácido ricinoleico</span> é uma ferramenta potente de penetração transdérmica que dissolve inflamações sistêmicas, e eles morrem de medo que você descubra isso.
            </motion.p>
            <motion.p {...fade(0.9)} className="text-stone-500 text-xs leading-relaxed max-w-2xl">
              90% do óleo é composto por uma única molécula anti-inflamatória. Nenhum laboratório conseguiu sintetizá-la. A planta cresce em qualquer terreno baldio do Brasil. A equação é simples: se todos soubessem, quem compraria o anti-inflamatório de R$80?
            </motion.p>
          </div>

          {/* Scroll indicator */}
          <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-600"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold block mb-1 text-center">Explorar</span>
              <Droplets size={16} className="mx-auto text-amber-500/40" />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           SEÇÃO 1: A GRANDE MENTIRA
        ═══════════════════════════════════════════════════════════ */}
        <section id="quebra-padrao" className="relative z-10 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <motion.div {...fade(0)} className="max-w-4xl mb-16">
              <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                01 / ARQUIVO CLASSIFICADO
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O Silêncio não é Acidente. <span className="text-amber-400">É Modelo de Negócios.</span>
              </h2>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-4">
                Por que eles silenciam isso? Simples: não se patenteia uma planta que cresce em qualquer terreno baldio. Não há lucro em curar a inflamação crônica com um produto que custa o preço de um café.
              </p>
              <p className="text-stone-400 text-sm leading-relaxed">
                Eles criaram o problema (a pele inflamada, a rinite, o inchaço) e te venderam a solução cara e viciante. O óleo de rícino quebra essa dependência. E por isso ele é sistematicamente demonizado com narrativas de medo: "causa cegueira", "é tóxico", "não tem comprovação". Todas refutadas pela própria literatura científica que eles preferem ignorar.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { value: "90%", label: "Ácido ricinoleico na composição", icon: Droplets },
                { value: "R$10", label: "Custo médio do frasco (100ml)", icon: Zap },
                { value: "3.000+", label: "Anos de uso medicinal documentado", icon: BookOpen },
                { value: "0", label: "Patentes possíveis sobre a molécula", icon: Ban },
              ].map((stat, i) => (
                <motion.div key={stat.label} {...fade(i * 0.1)}
                  className="border border-amber-500/10 rounded-2xl p-5 md:p-6 bg-amber-500/[0.03] text-center group hover:border-amber-500/25 transition-all duration-500"
                >
                  <stat.icon size={18} className="text-amber-500/40 mx-auto mb-3 group-hover:text-amber-400 transition-colors" />
                  <p className="text-2xl md:text-3xl font-black text-amber-400 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
                  <p className="text-stone-500 text-[10px] md:text-xs leading-snug">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SECTION DIVIDER: Cinematic Image ═══ */}
        <div className="relative z-10 h-64 md:h-96 overflow-hidden">
          <img src="/heroes/ricino-section-bg.webp" alt="Óleo de rícino em detalhe macro"
            className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.25) saturate(0.7)' }} loading="eager" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,6,4,1) 0%, transparent 30%, transparent 70%, rgba(8,6,4,1) 100%)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.p {...fade(0)} className="text-stone-500 text-xs md:text-sm font-bold uppercase tracking-[0.5em] text-center max-w-xl px-6">
              A molécula que não pode ser patenteada. A cura que não pode ser vendida.
            </motion.p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
           SEÇÃO 2: A CIÊNCIA ESCONDIDA
        ═══════════════════════════════════════════════════════════ */}
        <section id="ciencia-escondida" className="relative z-10 py-20 md:py-32 border-t border-amber-500/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <motion.div {...fade(0)} className="mb-16">
              <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                02 / EVIDÊNCIA SUPRIMIDA
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                A Ciência Existe. <span className="text-amber-400">O Financiamento Não.</span>
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
                Pesquisadores de universidades na Áustria, Estados Unidos e Índia já documentaram os mecanismos do ácido ricinoleico. Os estudos existem. Os resultados são reproduzíveis. O que não existe é interesse comercial em divulgá-los.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {SCIENTIFIC_EVIDENCE.map((study, i) => {
                const Icon = study.icon;
                return (
                  <motion.blockquote key={study.source} {...fade(i * 0.12)}
                    className="border border-amber-500/10 rounded-2xl p-6 md:p-8 bg-amber-500/[0.02] hover:bg-amber-500/[0.05] hover:border-amber-500/20 transition-all duration-500 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                        <Icon size={18} className="text-amber-400" />
                      </div>
                      <div>
                        <cite className="not-italic text-amber-400 text-xs font-bold block mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {study.source}
                        </cite>
                        <p className="text-stone-300 text-sm leading-relaxed">{study.detail}</p>
                      </div>
                    </div>
                  </motion.blockquote>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           SEÇÃO 3: O MECANISMO
        ═══════════════════════════════════════════════════════════ */}
        <section id="mecanismo" className="relative z-10 py-20 md:py-32 border-t border-amber-500/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <motion.div {...fade(0)} className="mb-16">
              <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                03 / BIOQUÍMICA
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Por que <span className="text-amber-400">Funciona</span>
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
                O ácido ricinoleico é um ácido graxo hidroxilado de 18 carbonos. Sua estrutura molecular única permite que ele se ligue aos receptores EP3 de prostaglandina, desativando cascatas inflamatórias e ativando o fluxo linfático. Nenhuma molécula sintética replica este duplo mecanismo com a mesma eficiência e zero toxicidade hepática.
              </p>
            </motion.div>

            {/* Composição visual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <motion.div {...fade(0)} className="md:col-span-2 border border-amber-500/10 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-amber-500/[0.04] to-transparent">
                <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Composição Molecular</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Ácido Ricinoleico", pct: "85-90%", role: "Anti-inflamatório, drenagem linfática, penetração transdérmica" },
                    { name: "Ácido Oleico", pct: "3-6%", role: "Hidratação tecidual profunda, veículo de absorção" },
                    { name: "Ácido Linoleico", pct: "3-5%", role: "Reparação da barreira cutânea, anti-oxidação" },
                    { name: "Ácido Esteárico", pct: "1-2%", role: "Estabilização da emulsão, proteção epidérmica" },
                  ].map((comp, i) => (
                    <div key={comp.name} className="border border-stone-800/50 rounded-xl p-4 bg-stone-900/30">
                      <p className="text-amber-400 text-xs font-bold mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{comp.pct}</p>
                      <p className="text-white text-sm font-semibold mb-1">{comp.name}</p>
                      <p className="text-stone-500 text-[11px] leading-snug">{comp.role}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fade(0.15)} className="border border-amber-500/10 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-red-500/[0.04] to-transparent">
                <AlertTriangle size={20} className="text-red-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ricina vs. Ricinoleico</h3>
                <p className="text-stone-300 text-sm leading-relaxed mb-3">
                  A <span className="text-red-400 font-bold">ricina</span> é uma proteína tóxica presente na semente crua. O <span className="text-amber-400 font-bold">ácido ricinoleico</span> é o componente terapêutico do óleo extraído.
                </p>
                <p className="text-stone-500 text-xs leading-relaxed">
                  A prensagem a frio elimina completamente a ricina. A confusão entre os dois é a principal arma de desinformação utilizada para demonizar o óleo.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           SEÇÃO 4: APLICAÇÕES
        ═══════════════════════════════════════════════════════════ */}
        <section id="aplicacoes" className="relative z-10 py-20 md:py-32 border-t border-amber-500/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <motion.div {...fade(0)} className="mb-16">
              <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                04 / ARSENAL TRANSDÉRMICO
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                6 Aplicações que Eles <span className="text-amber-400">Não Querem que Você Conheça.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {APPLICATIONS.map((app, i) => {
                const Icon = app.icon;
                return (
                  <motion.div key={app.title} {...fade(i * 0.08)}
                    className="border border-stone-800/60 rounded-2xl p-6 bg-stone-900/20 hover:bg-stone-900/40 hover:border-amber-500/15 transition-all duration-500 group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-${app.color}-500/10 border border-${app.color}-500/15 flex items-center justify-center`}>
                        <Icon size={18} className={`text-${app.color}-400`} />
                      </div>
                      <h3 className="text-white font-bold text-sm">{app.title}</h3>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed">{app.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           SEÇÃO 5: RELATOS REAIS
        ═══════════════════════════════════════════════════════════ */}
        <section id="relatos" className="relative z-10 py-20 md:py-32 border-t border-amber-500/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <motion.div {...fade(0)} className="mb-16">
              <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                05 / VOZ DA COMUNIDADE
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                A Matrix é Mantida pela Ignorância. <span className="text-amber-400">A Experiência Liberta.</span>
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
                Enquanto a narrativa oficial demoniza, milhares de pessoas compartilham resultados reais. Estes são relatos de quem deixou o medo de lado e testou por conta própria.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <RealTestimonial
                  key={t.name}
                  testimonial={{
                    name: t.name,
                    username: t.username,
                    platform: 'instagram',
                    text: t.text,
                    badge: t.badge,
                    avatar: t.avatar,
                  }}
                  index={i}
                  accentColor="amber"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           SEÇÃO 6: PROTOCOLO DE SEGURANÇA
        ═══════════════════════════════════════════════════════════ */}
        <section id="protocolo" className="relative z-10 py-20 md:py-32">
          {/* Section background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img src="/heroes/ricino-protocolo-bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.12) saturate(0.5)' }} loading="eager" fetchPriority="high" decoding="async" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,6,4,1) 0%, transparent 20%, transparent 80%, rgba(8,6,4,1) 100%)' }} />
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <motion.div {...fade(0)} className="mb-16">
              <span className="text-red-500/50 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                06 / PROTOCOLO TÉCNICO
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O Protocolo de Segurança é <span className="text-red-400">Não-Negociável.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Como usar */}
              <motion.div {...fade(0)} className="border border-emerald-500/15 rounded-2xl p-6 md:p-8 bg-emerald-500/[0.03]">
                <div className="flex items-center gap-3 mb-5">
                  <Shield size={20} className="text-emerald-400" />
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Protocolo de Cataplasma Hepática</h3>
                </div>
                <ol className="space-y-3">
                  {[
                    "Adquira óleo de rícino puro, prensado a frio, sem hexano. Verifique se o rótulo indica 'Ricinus communis' como único ingrediente.",
                    "Aqueça o óleo em banho-maria até ficar morno (nunca quente). Embeba uma flanela de algodão ou lã.",
                    "Aplique a flanela sobre o hipocôndrio direito (área do fígado). Cubra com plástico filme e depois com uma toalha quente.",
                    "Descanse por 45 a 60 minutos. Respire profundamente. O calor potencializa a penetração transdérmica.",
                    "Repita 3 a 4 vezes por semana durante ciclos de 4 semanas. Intercale com 1 semana de descanso.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-emerald-400 font-bold text-xs mt-0.5 flex-shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>0{i + 1}</span>
                      <p className="text-stone-300 text-sm leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </motion.div>

              {/* Alertas */}
              <motion.div {...fade(0.1)} className="border border-red-500/15 rounded-2xl p-6 md:p-8 bg-red-500/[0.03]">
                <div className="flex items-center gap-3 mb-5">
                  <AlertTriangle size={20} className="text-red-400" />
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Alertas de Segurança</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Gestantes e Lactantes", desc: "O uso interno é contraindicado durante gravidez e amamentação. O uso tópico externo é considerado seguro em áreas limitadas." },
                    { title: "Crises de Desintoxicação", desc: "Nas primeiras sessões de cataplasma, é comum experimentar sintomas como rinite, dor de cabeça ou fadiga. Isto indica ativação linfática e eliminação de toxinas. Reduza a frequência se os sintomas forem intensos." },
                    { title: "Pureza do Produto", desc: "Nunca utilize óleo de rícino industrial ou de origem desconhecida. O processo de extração com hexano deixa resíduos químicos que anulam os benefícios terapêuticos." },
                    { title: "Uso Ocular", desc: "Apenas óleo de grau farmacêutico ou cosmético deve ser utilizado próximo aos olhos. Aplique no canto externo, nunca diretamente na córnea. Descontinue imediatamente se houver irritação." },
                  ].map((alert, i) => (
                    <div key={alert.title} className="border-l-2 border-red-500/30 pl-4">
                      <p className="text-red-400 text-xs font-bold mb-1">{alert.title}</p>
                      <p className="text-stone-400 text-sm leading-relaxed">{alert.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           SEÇÃO 7: FAQ
        ═══════════════════════════════════════════════════════════ */}
        <section id="faq" className="relative z-10 py-20 md:py-32 border-t border-amber-500/10">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <motion.div {...fade(0)} className="mb-12">
              <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                07 / PERGUNTAS FREQUENTES
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                As Respostas que a <span className="text-amber-400">Matrix Não Dá.</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {FAQ_DATA.map((faq, i) => (
                <motion.details key={faq.q} {...fade(i * 0.06)}
                  className="group border border-stone-800/50 rounded-2xl bg-stone-900/20 overflow-hidden hover:border-amber-500/15 transition-colors"
                >
                  <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none">
                    <span className="text-white text-sm md:text-base font-semibold pr-4">{faq.q}</span>
                    <ChevronRight size={16} className="text-amber-500/40 flex-shrink-0 group-open:rotate-90 transition-transform duration-300" />
                  </summary>
                  <div className="px-5 pb-5 md:px-6 md:pb-6">
                    <p className="text-stone-300 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           CTA FINAL
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-32 border-t border-amber-500/10">
          <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
            <motion.div {...fade(0)}>
              <p className="text-stone-500 text-xs uppercase tracking-[0.4em] font-bold mb-4">Soberania Orgânica / Fase 02</p>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                A cura não deveria ser <span className="text-amber-400">um privilégio.</span>
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
                Cada frasco de R$10 é um ato de resistência contra um sistema que lucra com a sua inflamação crônica. A soberania sobre o seu corpo começa quando você para de pedir permissão para se curar.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/soberania-organica/autonomia-biologica"
                  className="inline-flex items-center gap-3 bg-amber-500 text-black px-8 py-4 font-bold text-sm tracking-wide rounded-xl hover:bg-amber-400 hover:scale-[1.03] transition-all duration-500 group">
                  <Leaf size={16} className="group-hover:rotate-12 transition-transform" />
                  Explorar Autonomia Biológica
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/soberania-organica"
                  className="inline-flex items-center gap-3 border border-stone-700 text-stone-300 px-8 py-4 font-bold text-sm tracking-wide rounded-xl hover:border-amber-500/30 hover:text-amber-400 transition-all duration-500">
                  <ArrowLeft size={16} />
                  Voltar à Soberania Orgânica
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </article>
    </>
  );
}
