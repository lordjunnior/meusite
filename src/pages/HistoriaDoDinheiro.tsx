import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, useScroll } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronRight, ChevronDown, Zap, HelpCircle, Clock, AlertTriangle, Coins,
  TrendingDown, Scale, Landmark, Crown, Scroll, Wheat, ShieldAlert,
  ArrowRight, CheckCircle2, XCircle, ExternalLink,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { NAV_ITEMS, ERAS, TIMELINE_ITEMS, CONSEQUENCIAS, FAQ_ITEMS } from '@/lib/historiaDinheiroData';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import FooterSection from '@/components/FooterSection';
import PageFloatingToc from '@/components/PageFloatingToc';

import imgEscambo from '@/assets/historia-escambo.webp';
import imgOuro from '@/assets/historia-ouro.webp';
import imgPapelMoeda from '@/assets/historia-papel-moeda.webp';
import imgBancoCentral from '@/assets/historia-banco-central.webp';
import imgNixonShock from '@/assets/historia-nixon-shock.webp';
import imgBitcoinSaida from '@/assets/historia-bitcoin-saida.webp';
import BackToHome from '@/components/BackToHome';

gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

/* ── GSAP Nobel Section ── */
const NobelSection = ({ children, className = '', id, delay = 0 }: {
  children: React.ReactNode; className?: string; id?: string; delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    );
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === ref.current) t.kill(); }); };
  }, [delay]);
  return <div ref={ref} id={id} className={className} style={{ opacity: 0 }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
{children}</div>;
};

/* ── Cinematic Break ── */
const CinematicBreak: React.FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => (
  <section className="relative z-10 py-8 md:py-14">
    <div className="max-w-6xl mx-auto px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: APPLE_EASE }}
        className="relative rounded-2xl overflow-hidden border border-border/20 group"
      >
        <img src={src} alt={alt} className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.7) saturate(0.85)' }} loading="lazy" width={1280} height={720} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
          <p className="text-muted-foreground text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">{caption}</p>
          <div className="hidden md:block w-12 h-px bg-gradient-to-r from-primary/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── Animated Divider ── */
const AnimatedDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="relative z-10 h-px max-w-5xl mx-auto my-4">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: APPLE_EASE }}
        className="absolute inset-0 origin-left"
        style={{ background: 'linear-gradient(to right, transparent, hsl(var(--gold) / 0.2), transparent)' }}
      />
    </div>
  );
};

/* ── Progress Bar ── */
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--gold)), hsl(var(--primary)))',
      }}
    />
  );
};

/* ── Map era IDs to images ── */
const ERA_IMAGES: Record<string, string> = {
  escambo: imgEscambo,
  ouro: imgOuro,
  papel: imgPapelMoeda,
  'banco-central': imgBancoCentral,
  nixon: imgNixonShock,
};

const ERA_CAPTIONS: Record<string, string> = {
  escambo: 'Sementes e grãos: a primeira moeda da humanidade',
  ouro: 'Moedas de ouro: 5.000 anos como reserva de valor universal',
  papel: 'Certificados de ouro: o início da fraude monetária institucionalizada',
  'banco-central': 'Federal Reserve: o monopólio monetário que controla o mundo',
  nixon: '15 de agosto de 1971: o dia em que o dinheiro perdeu seu lastro',
};

const TAMBEM_ACONTECEU: Record<string, { ano: string; fato: string }[]> = {
  escambo: [
    { ano: '~9000 a.C.', fato: 'Primeiras comunidades agrícolas no Crescente Fértil' },
    { ano: '~5000 a.C.', fato: 'Civilização suméria desenvolve a escrita cuneiforme' },
    { ano: '~3000 a.C.', fato: 'Egito unificado sob o primeiro faraó' },
  ],
  ouro: [
    { ano: '~600 a.C.', fato: 'Lídia cunha as primeiras moedas padronizadas' },
    { ano: '27 a.C.', fato: 'Roma estabelece o denário como moeda oficial do Império' },
    { ano: '1252', fato: 'Florença cunha o florim de ouro, padrão monetário europeu' },
  ],
  papel: [
    { ano: '1694', fato: 'Criação do Bank of England para financiar guerras' },
    { ano: '1716', fato: 'John Law cria o primeiro esquema de papel-moeda na França — colapsa em 4 anos' },
    { ano: '1913', fato: 'Criação do Federal Reserve nos Estados Unidos' },
  ],
  'banco-central': [
    { ano: '1933', fato: 'Roosevelt confisca o ouro dos cidadãos americanos' },
    { ano: '1944', fato: 'Acordo de Bretton Woods: dólar como reserva mundial' },
    { ano: '1964', fato: 'Criação do Banco Central do Brasil' },
  ],
  nixon: [
    { ano: '1971', fato: 'Nixon encerra a conversibilidade dólar-ouro' },
    { ano: '1980', fato: 'Brasil entra em espiral de hiperinflação' },
    { ano: '1990', fato: 'Confisco Collor: governo congela poupanças' },
    { ano: '2009', fato: 'Satoshi Nakamoto lança a rede Bitcoin' },
  ],
};

/* ── Comparison Table ── */
const COMPARATIVO = [
  { propriedade: 'Escassez', ouro: true, fiat: false, bitcoin: true },
  { propriedade: 'Divisibilidade', ouro: false, fiat: true, bitcoin: true },
  { propriedade: 'Portabilidade', ouro: false, fiat: true, bitcoin: true },
  { propriedade: 'Durabilidade', ouro: true, fiat: false, bitcoin: true },
  { propriedade: 'Resistência à censura', ouro: false, fiat: false, bitcoin: true },
  { propriedade: 'Resistência ao confisco', ouro: false, fiat: false, bitcoin: true },
  { propriedade: 'Verificabilidade', ouro: false, fiat: false, bitcoin: true },
  { propriedade: 'Sem permissão', ouro: true, fiat: false, bitcoin: true },
  { propriedade: 'Oferta fixa', ouro: false, fiat: false, bitcoin: true },
  { propriedade: 'Transparência', ouro: false, fiat: false, bitcoin: true },
];

const TOC_ITEMS = [
  { id: 'eras', label: 'As 5 Eras' },
  { id: 'timeline', label: 'Cronologia' },
  { id: 'consequencias', label: 'Diagnóstico' },
  { id: 'comparativo', label: 'Ouro vs Fiat vs Bitcoin' },
  { id: 'bitcoin-saida', label: 'A Saída' },
  { id: 'faq', label: 'FAQ' },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({ "@type": "Question", "name": item.pergunta, "acceptedAnswer": { "@type": "Answer", "text": item.resposta } }))
};
const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  "headline": "A História do Dinheiro: Do Escambo ao Bitcoin",
  "description": "A história completa do dinheiro: escambo, ouro, papel-moeda, bancos centrais, Nixon Shock de 1971 e o surgimento do Bitcoin como resposta.",
  "author": { "@type": "Person", "name": "Lord Junnior" },
  "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "datePublished": "2026-03-07", "dateModified": "2026-04-06",
  "url": "https://lordjunnior.com.br/historia-do-dinheiro",
  "keywords": "história do dinheiro, origem do dinheiro, como surgiu o dinheiro, padrão ouro, moeda fiat, Nixon Shock 1971, banco central, Bitcoin, o que é dinheiro"
};

export default function HistoriaDoDinheiro() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>A História do Dinheiro: Do Escambo ao Bitcoin | Lord Junnior</title>
        <meta name="description" content="A história completa do dinheiro: do escambo ao ouro, do papel-moeda aos bancos centrais, do Nixon Shock ao Bitcoin. Entenda como o dinheiro foi corrompido e como se proteger." />
        <link rel="canonical" href="https://lordjunnior.com.br/historia-do-dinheiro" />
        <meta property="og:title" content="A História do Dinheiro: Do Escambo ao Bitcoin" />
        <meta property="og:description" content="Entenda como o dinheiro foi criado, corrompido e como o Bitcoin representa a resposta." />
        <meta property="og:url" content="https://lordjunnior.com.br/historia-do-dinheiro" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <ScrollToTop />
      <ProgressBar />
      <PageFloatingToc items={TOC_ITEMS} accentColor="amber" />

      <div className="min-h-screen text-foreground selection:bg-primary/30" style={{ background: '#050808' }}>

        {/* ═══ VFX LAYER ═══ */}
        <div className="fixed inset-0 pointer-events-none z-[1]">
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay' as const,
          }} />
        </div>

        {/* ═══ HERO ═══ */}
        <CinematicHero
          image={imgEscambo}
          phase="Educação Monetária"
          title={<>A História do Dinheiro<br /><span className="italic text-primary">Que Nunca Te Contaram</span></>}
          subtitle="Do escambo ao ouro, do papel-moeda aos bancos centrais, do Nixon Shock de 1971 ao Bitcoin. A história completa de como o dinheiro foi criado, corrompido — e como a humanidade encontrou uma saída."
          icon={Coins}
          accentColor="amber"
          backLink="/educacao"
          backLabel="Arsenal Técnico"
        />

        {/* ═══ INTRO ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="eras">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Por que isso importa</span>
                <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-6">
                  Se você não entende o dinheiro,<br />
                  <span className="text-primary">o dinheiro controla você.</span>
                </h2>
                <p className="text-muted-foreground leading-8 text-base mb-6">
                  Você foi ensinado a <strong className="text-foreground">trabalhar por dinheiro</strong>, mas ninguém te ensinou <strong className="text-foreground">o que é dinheiro</strong>. Isso não é acidente — é engenharia social. Quando um povo não entende como o dinheiro funciona, aceita qualquer abuso: inflação, confisco, desvalorização, controle.
                </p>
                <p className="text-muted-foreground leading-8 text-base">
                  Esta página documenta as <strong className="text-foreground">5 eras do dinheiro</strong> — do escambo primitivo até o Bitcoin — com a objetividade de quem já entendeu que <strong className="text-foreground">cada era foi uma resposta ao fracasso da anterior</strong>. E que a era atual, do dinheiro fiat sem lastro, é a maior fraude monetária da história humana.
                </p>
              </div>
              <div className="relative">
                <img src={imgOuro} alt="Moedas de ouro antigas sobre mármore escuro" className="rounded-2xl border border-border/20 w-full object-cover" width={1280} height={720} loading="lazy" decoding="async" />
                <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(5,8,8,0.6) 100%)' }} />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.2em]">Ouro: 5.000 anos como reserva de valor — sem precisar de governo</p>
                </div>
              </div>
            </div>
          </div>
        </NobelSection>

        <AnimatedDivider />

        {/* ═══ AS 5 ERAS DO DINHEIRO ═══ */}
        {ERAS.map((era, eraIndex) => {
          const isEven = eraIndex % 2 === 0;
          const eraImage = ERA_IMAGES[era.id];
          const eraCaption = ERA_CAPTIONS[era.id];

          return (
            <React.Fragment key={era.id}>
              <NobelSection className="relative z-10 py-16 md:py-24" id={era.id} delay={0.1}>
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                  {/* Era label */}
                  <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">
                    Era {String(eraIndex + 1).padStart(2, '0')} · {era.periodo}
                  </span>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-12">
                    <era.icon className="inline-block mr-3 text-primary" size={32} />
                    {era.titulo}
                  </h2>

                  {/* Grid 50/50 alternado */}
                  <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-start ${!isEven ? 'md:[direction:rtl] md:*:[direction:ltr]' : ''}`}>
                    {/* Text column */}
                    <div className="space-y-5">
                      {era.conteudo.map((p, i) => (
                        <p key={i} className="text-muted-foreground leading-8 text-base"
                          dangerouslySetInnerHTML={{
                            __html: p
                              .replace(/(".*?")/g, '<em class="text-foreground font-medium">$1</em>')
                              .replace(/(não podia ser "impresso"|não podia ser criado do nada|dupla coincidência de desejos|reserva fracionária|bank runs|emprestadores de última instância|Nixon encerrou|maior traição monetária)/gi, '<strong class="text-primary">$1</strong>')
                          }}
                        />
                      ))}

                      {/* Também aconteceu */}
                      {TAMBEM_ACONTECEU[era.id] && (
                        <div className="mt-8 p-6 rounded-xl border border-primary/15" style={{ background: 'rgba(245,158,11,0.04)' }}>
                          <p className="text-primary/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Também aconteceu nesta época</p>
                          <div className="space-y-3">
                            {TAMBEM_ACONTECEU[era.id].map((item, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <span className="text-primary/50 font-bold text-[10px] tracking-wider shrink-0 w-20">{item.ano}</span>
                                <span className="text-muted-foreground text-xs">{item.fato}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image column */}
                    {eraImage && (
                      <div className="relative group">
                        <img
                          src={eraImage}
                          alt={eraCaption}
                          className="rounded-2xl border border-border/20 w-full object-cover h-[300px] md:h-[450px] transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                          style={{ filter: 'brightness(0.7) saturate(0.85)' }}
                          loading="lazy" width={1280} height={720}
                        />
                        <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(5,8,8,0.7) 80%, rgba(5,8,8,0.95) 100%)' }} />
                        <div className="absolute bottom-4 left-5 right-5">
                          <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.2em]">{eraCaption}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </NobelSection>
              <AnimatedDivider />
            </React.Fragment>
          );
        })}

        {/* ═══ CINEMATIC BREAK ═══ */}
        <CinematicBreak
          src={imgNixonShock}
          alt="Nixon Shock 1971 - o fim do padrão ouro"
          caption="15 de agosto de 1971 · O dia que mudou o dinheiro para sempre · Nixon encerrando a conversibilidade dólar-ouro em transmissão nacional"
        />

        {/* ═══ TIMELINE ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="timeline">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Cronologia</span>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-12">
              <Clock className="inline-block mr-3 text-primary" size={32} />
              5.000 Anos em Uma Linha
            </h2>

            <div className="relative">
              <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
              <div className="space-y-6">
                {TIMELINE_ITEMS.map((item, i) => (
                  <motion.div key={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                    variants={fadeUp} custom={i * 0.05}
                    className="relative flex gap-6 group"
                  >
                    <div className="relative z-10 shrink-0">
                      <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-2 flex items-center justify-center ${i === TIMELINE_ITEMS.length - 1 ? 'border-primary bg-primary/20' : 'border-primary/30 bg-background/50 group-hover:border-primary/60'} transition-colors`}>
                        <span className="text-primary font-bold text-[7px] md:text-[8px]">{item.ano}</span>
                      </div>
                    </div>
                    <div className="bg-card/30 border border-border/10 rounded-2xl p-6 flex-1 group-hover:border-primary/20 transition-colors">
                      <h3 className="text-foreground font-bold text-sm tracking-tight mb-2">{item.evento}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </NobelSection>

        <AnimatedDivider />

        {/* ═══ CONSEQUÊNCIAS ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="consequencias">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              <div>
                <span className="inline-block text-destructive font-mono text-xs tracking-[0.3em] uppercase mb-4">Diagnóstico</span>
                <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-6">
                  <AlertTriangle className="inline-block mr-3 text-destructive" size={32} />
                  O Resultado de<br />
                  <span className="text-destructive">50 Anos Sem Lastro</span>
                </h2>
                <p className="text-muted-foreground leading-8 text-base mb-8">
                  O que acontece quando governos controlam o dinheiro sem lastro em nada real? Três consequências que você vive <strong className="text-foreground">todos os dias</strong>, mesmo sem perceber:
                </p>

                <div className="space-y-6">
                  {CONSEQUENCIAS.map((item, i) => (
                    <div key={i} className="p-6 rounded-xl border border-destructive/15" style={{ background: 'rgba(239,68,68,0.04)' }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                          <item.icon className="text-destructive" size={18} />
                        </div>
                        <h3 className="text-foreground font-bold text-sm">{item.titulo}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group sticky top-24">
                <img
                  src={imgBancoCentral}
                  alt="Federal Reserve - o monopólio monetário"
                  className="rounded-2xl border border-border/20 w-full object-cover h-[400px] md:h-[580px] transition-transform duration-[1.5s] group-hover:scale-[1.02]"
                  style={{ filter: 'brightness(0.6) saturate(0.85)' }}
                  loading="lazy" width={1280} height={720}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,8,8,0.8) 100%)' }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-destructive/80 text-[10px] font-mono uppercase tracking-[0.3em] mb-2">Fato documentado</p>
                  <p className="text-foreground text-sm font-bold leading-relaxed">
                    O dólar perdeu 96% do poder de compra desde a criação do Federal Reserve em 1913.
                  </p>
                  <p className="text-muted-foreground text-xs mt-2 leading-relaxed">
                    O Real perdeu 85% desde 1994. A lira turca perdeu 99%. Nenhuma moeda fiat sobrevive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </NobelSection>

        <AnimatedDivider />

        {/* ═══ TABELA COMPARATIVA ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="comparativo">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Análise Técnica</span>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-4">
              Ouro vs Fiat vs Bitcoin
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-12 max-w-3xl">
              Comparativo técnico das propriedades monetárias. Por que o Bitcoin é o primeiro ativo na história a cumprir <strong className="text-foreground">todos</strong> os requisitos de dinheiro perfeito — algo que nem o ouro conseguiu.
            </p>

            <div className="rounded-2xl border border-border/15 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              {/* Header */}
              <div className="grid grid-cols-4 gap-2 px-6 py-4 border-b border-border/10 text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
                <span>Propriedade</span>
                <span className="text-center">Ouro</span>
                <span className="text-center">Fiat (R$)</span>
                <span className="text-center text-primary">₿ Bitcoin</span>
              </div>
              {COMPARATIVO.map((row, i) => (
                <div key={i} className={`grid grid-cols-4 gap-2 px-6 py-4 items-center text-sm ${i !== COMPARATIVO.length - 1 ? 'border-b border-border/5' : ''} hover:bg-white/[0.02] transition-colors`}>
                  <span className="text-foreground font-medium text-xs">{row.propriedade}</span>
                  <span className="text-center">
                    {row.ouro ? <CheckCircle2 className="inline text-green-400" size={16} /> : <XCircle className="inline text-destructive/60" size={16} />}
                  </span>
                  <span className="text-center">
                    {row.fiat ? <CheckCircle2 className="inline text-green-400" size={16} /> : <XCircle className="inline text-destructive/60" size={16} />}
                  </span>
                  <span className="text-center">
                    {row.bitcoin ? <CheckCircle2 className="inline text-green-400" size={16} /> : <XCircle className="inline text-destructive/60" size={16} />}
                  </span>
                </div>
              ))}
              {/* Score */}
              <div className="grid grid-cols-4 gap-2 px-6 py-5 border-t border-border/15 bg-primary/5">
                <span className="text-foreground font-bold text-xs uppercase tracking-wider">Score</span>
                <span className="text-center text-primary font-bold text-lg">3/10</span>
                <span className="text-center text-destructive font-bold text-lg">2/10</span>
                <span className="text-center text-green-400 font-bold text-lg">10/10</span>
              </div>
            </div>
          </div>
        </NobelSection>

        {/* ═══ CINEMATIC BREAK — BITCOIN ═══ */}
        <CinematicBreak
          src={imgBitcoinSaida}
          alt="Bitcoin como resposta à fraude monetária"
          caption="3 de janeiro de 2009 · Bloco Gênesis · 'Chancellor on brink of second bailout for banks' — Satoshi Nakamoto"
        />

        {/* ═══ A SAÍDA: BITCOIN ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="bitcoin-saida">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="relative group">
                <img
                  src={imgBitcoinSaida}
                  alt="Bitcoin - a saída soberana"
                  className="rounded-2xl border border-primary/20 w-full object-cover h-[350px] md:h-[500px] transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  style={{ filter: 'brightness(0.75) saturate(0.9)' }}
                  loading="lazy" width={1280} height={720}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(5,8,8,0.85) 100%)' }} />
                <div className="absolute bottom-5 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-primary" size={14} />
                    <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">A Resposta</span>
                  </div>
                  <p className="text-foreground font-bold text-sm">21 milhões. Sem banco central. Sem permissão. Sem censura.</p>
                </div>
              </div>

              <div>
                <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">3 de Janeiro de 2009</span>
                <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-6">
                  Em 2009, Surgiu<br />
                  <span className="text-primary italic">A Saída.</span>
                </h2>
                <div className="space-y-5">
                  <p className="text-muted-foreground leading-8 text-base">
                    Em 3 de janeiro de 2009, em meio à maior crise financeira desde 1929, um programador (ou grupo) sob o pseudônimo <strong className="text-foreground">Satoshi Nakamoto</strong> lançou a rede Bitcoin. Na primeira transação, gravou na blockchain a manchete do jornal The Times: <em className="text-primary">"Chancellor on brink of second bailout for banks"</em>.
                  </p>
                  <p className="text-muted-foreground leading-8 text-base">
                    O Bitcoin foi projetado como o <strong className="text-foreground">oposto exato do dinheiro estatal</strong>: oferta fixa (21 milhões), descentralizado (sem banco central), resistente à censura (ninguém pode bloqueá-lo), transparente (blockchain pública) e permissionless (não precisa de aprovação para usar).
                  </p>
                  <p className="text-muted-foreground leading-8 text-base">
                    Pela primeira vez em 5.000 anos, a humanidade tem acesso a uma forma de dinheiro que <strong className="text-foreground">não pode ser corrompida por governos</strong>. Não pode ser impressa. Não pode ser confiscada com autocustódia. Não pode ser censurada.
                  </p>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link to="/bitcoin/o-que-e"
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:gap-4 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                    ₿ O Que é o Bitcoin <ChevronRight size={16} />
                  </Link>
                  <Link to="/inflacao-imposto-oculto"
                    className="inline-flex items-center gap-3 border border-primary/30 hover:border-primary/60 text-primary px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500">
                    Inflação: O Imposto Oculto <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </NobelSection>

        <AnimatedDivider />

        {/* ═══ FAQ ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="faq">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Perguntas Frequentes</span>
                <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-6">
                  <HelpCircle className="inline-block mr-3 text-primary" size={32} />
                  FAQ
                </h2>
                <p className="text-muted-foreground leading-8 text-base">
                  As perguntas que todo brasileiro deveria saber responder sobre dinheiro, moeda, inflação e o sistema financeiro.
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card/30 border border-border/10 rounded-2xl overflow-hidden hover:border-primary/15 transition-colors px-0">
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline">
                      <span className="text-foreground font-bold text-sm leading-snug pr-4">{item.pergunta}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.resposta}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </NobelSection>

        <AnimatedDivider />

        {/* ═══ CTA FINAL ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="rounded-3xl border-2 border-primary/20 p-10 md:p-16 text-center relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="absolute inset-0 bg-gradient-radial from-primary/[0.04] via-transparent to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <div className="relative z-10 space-y-8">
                <p className="text-muted-foreground font-bold text-xs tracking-[0.5em] uppercase">
                  "O dinheiro sempre foi uma ferramenta de poder."
                </p>
                <h2 className="font-['Bebas_Neue',sans-serif] text-4xl md:text-6xl lg:text-7xl leading-[1.2] text-foreground">
                  O Despertar<br />Começa{' '}
                  <span className="text-primary">Aqui.</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                  Agora você sabe o que nunca te ensinaram na escola: que o dinheiro foi corrompido, que a inflação é um imposto, que bancos centrais destroem poder de compra. O próximo passo é <strong className="text-primary">agir</strong>.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/bitcoin/o-que-e"
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:gap-4 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                    ₿ O Que é o Bitcoin <ChevronRight size={16} />
                  </Link>
                  <Link to="/confisco-1990"
                    className="inline-flex items-center gap-3 border border-destructive/30 hover:border-destructive/60 text-destructive px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500">
                    Confisco de 1990 <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </NobelSection>

        {/* ─── FOOTER ─── */}
        <FooterSection />
      </div>
    </>
  );
}
