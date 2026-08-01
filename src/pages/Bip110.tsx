import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  AlertTriangle,
  ArrowRight,
  BadgeAlert,
  Binary,
  Blocks,
  BookOpen,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  Download,
  ExternalLink,
  GitFork,
  HandCoins,
  Layers,
  List,
  Lock,
  MessageSquare,
  Network,
  Pickaxe,
  Quote,
  Scale,
  Shield,
  Smartphone,
  Target,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';

import NobelVFX from '@/components/NobelVFX';
import CinematicHero from '@/components/CinematicHero';
import FooterSection from '@/components/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import blockchainBlocos from '@/assets/blockchain-blocos.jpg';
import blockchainLivroRazao from '@/assets/blockchain-livro-razao.jpg';
import blockchainRedeGlobal from '@/assets/blockchain-rede-global.jpg';
import qrCodeImage from '@/assets/qrcode-lightning.jpeg';
import BackToHome from '@/components/BackToHome';

/* ═══ CONSTANTS ═══ */
const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const AFFILIATE_LINK = 'https://www.kucoin.com/r/rf/QBAPZG6X';
const LIGHTNING_ADDRESS = 'securecorn53@walletofsatoshi.com';

const CHAPTERS = [
  { id: 'problema', label: 'O Problema', num: '01' },
  { id: 'o-que-e', label: 'O que é BIP-110', num: '02' },
  { id: 'timeline', label: 'Linha do Tempo', num: '03' },
  { id: 'dois-lados', label: 'Os Dois Lados', num: '04' },
  { id: 'impactos', label: 'Impactos Reais', num: '05' },
  { id: 'acompanhar', label: 'Como Acompanhar', num: '06' },
  { id: 'veredicto', label: 'Veredicto', num: '07' },
  { id: 'apoiar', label: 'Apoiar Projeto', num: '08' },
  { id: 'ferramentas', label: 'Ferramentas', num: '09' },
  { id: 'faq', label: 'FAQ', num: '10' },
];

const TIMELINE_DATA = [
  { year: '2009', icon: BookOpen, short: 'Bloco Gênesis', detail: 'Satoshi registra a primeira mensagem na blockchain: "Chancellor on the brink of second bailout for banks". O Bitcoin nasce como resposta direta ao sistema financeiro centralizado.' },
  { year: '2017', icon: GitFork, short: 'Guerra dos Blocos', detail: 'O debate sobre tamanho de bloco culmina na ativação do SegWit via UASF (User Activated Soft Fork). Hard forks como Bitcoin Cash e Bitcoin SV definharam.' },
  { year: '2021', icon: Layers, short: 'Taproot', detail: 'Soft fork que expande possibilidades de scripts no Bitcoin. Abre caminho para usos além de pagamentos simples — incluindo os que geraram a polêmica atual.' },
  { year: '2023', icon: Binary, short: 'Ordinals', detail: 'Explosão de Inscriptions e NFTs dentro do Bitcoin. Dados não monetários começam a competir agressivamente por espaço de bloco, elevando taxas.' },
  { year: '2024', icon: AlertTriangle, short: 'Core v30', detail: 'Bitcoin Core afrouxa limites de OP_RETURN de 83 para 100.000 bytes. A comunidade se divide entre liberdade de uso e degradação da função monetária.' },
  { year: '2025', icon: Shield, short: 'BIP-110', detail: 'Proposta de soft fork temporário (RDTS) para restringir dados não monetários na blockchain por aproximadamente um ano. O debate esquenta.' },
];

const FAQ_DATA = [
  { q: 'O que é a BIP-110?', a: 'A BIP-110 (Reduced Data Temporary Softfork — RDTS) é uma proposta de melhoria do Bitcoin que visa criar um soft fork temporário de um ano para restringir a inserção de dados não monetários na blockchain, restaurando limites históricos de campos como OP_RETURN para 83 bytes.' },
  { q: 'A BIP-110 pode afetar meus Bitcoins?', a: 'Não diretamente. A proposta não altera a quantidade de moedas nem afeta a custódia. Seus satoshis permanecem seguros na sua hardware wallet. O risco discutido é operacional — instabilidade em caso de ruptura de consenso entre implementações diferentes.' },
  { q: 'O que é uma BIP?', a: 'BIP significa Bitcoin Improvement Proposal. É o formato aberto que desenvolvedores usam para propor mudanças no protocolo. Como o Bitcoin é open source sem CEO, todas as atualizações passam por esse processo público de discussão, revisão e eventual ativação por consenso.' },
  { q: 'Qual a diferença entre soft fork e hard fork?', a: 'Soft fork é uma atualização retrocompatível — nodes antigos continuam funcionando. Hard fork cria uma rede incompatível, como aconteceu com Bitcoin Cash. O Bitcoin historicamente só evoluiu via soft forks, preservando a rede unificada.' },
  { q: 'Essa proposta tem chance de ser aprovada?', a: 'Hoje a probabilidade é extremamente baixa. Menos de 3% dos nodes demonstraram apoio. Mudanças de consenso no Bitcoin historicamente levam anos de debate técnico e social — como o SegWit, que levou de 2015 a 2017.' },
];

const TOOLS = [
  { name: 'Wallet of Satoshi', desc: 'Carteira Lightning simples e rápida para pagamentos instantâneos.', cta: 'Baixar carteira', url: 'https://www.walletofsatoshi.com/', icon: Zap },
  { name: 'Phoenix Wallet', desc: 'Carteira Lightning não-custodial com gestão automática de canais.', cta: 'Baixar carteira', url: 'https://phoenix.acinq.co/', icon: Smartphone },
  { name: 'Sparrow Wallet', desc: 'Carteira desktop focada em privacidade e controle total de UTXOs.', cta: 'Guia completo', url: '/autocustodia', icon: Shield, isInternal: true },
  { name: 'Coldcard', desc: 'Hardware wallet air-gapped para autocustódia de elite.', cta: 'Guia completo', url: '/hardware-wallet-diy', icon: Lock, isInternal: true },
];

const TIERS = [
  { sats: '1.000 sats', label: 'Infraestrutura', desc: 'Mantém servidores e domínio ativos.' },
  { sats: '5.000 sats', label: 'Novos conteúdos', desc: 'Financia pesquisa e produção editorial.' },
  { sats: '10.000 sats', label: 'Novas ferramentas', desc: 'Viabiliza calculadoras e infográficos.' },
  { sats: 'Valor livre', label: 'Independência', desc: 'Qualquer valor fortalece a soberania editorial.' },
];

/* ═══ ANIMATION HELPERS ═══ */
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.09 },
  }),
};

const panelClass = 'rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm shadow-[0_8px_32px_hsl(var(--foreground)/0.06)]';
const sectionShell = 'relative z-10 py-16 md:py-24';

/* ═══ READING PROGRESS BAR ═══ */
const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-border/30">
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <motion.div className="h-full origin-left bg-gradient-to-r from-primary via-primary to-accent" style={{ scaleX }} />
    </div>
  );
};

/* ═══ FLOATING TOC ═══ */
const FloatingToc = () => {
  const [active, setActive] = useState('');
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, 'change', (v) => setShow(v > 0.05 && v < 0.985));

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-30% 0px -60% 0px' },
    );
    CHAPTERS.forEach((c) => { const el = document.getElementById(c.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Desktop */}
          <motion.nav initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35, ease: APPLE_EASE }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-[55] hidden xl:flex 2xl:hidden flex-col gap-3" aria-label="Sumário">
            {CHAPTERS.map((c) => (
              <a key={c.id} href={`#${c.id}`}
                className={`group flex items-center gap-3 transition-all duration-300 ${active === c.id ? 'opacity-100' : 'opacity-30 hover:opacity-65'}`}>
                <span className={`block rounded-full transition-all duration-300 ${active === c.id ? 'w-3 h-3 bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]' : 'w-2 h-2 bg-muted-foreground/50'}`} />
                <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${active === c.id ? 'text-primary' : 'text-muted-foreground'}`}>{c.num} · {c.label}</span>
              </a>
            ))}
          </motion.nav>

          {/* Mobile */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
            className="fixed right-4 bottom-4 z-[55] xl:hidden">
            <button onClick={() => setOpen(!open)}
              className="w-12 h-12 rounded-full border border-border bg-card/90 backdrop-blur-sm shadow-lg flex items-center justify-center" aria-label="Sumário">
              <List className="w-5 h-5 text-foreground" />
            </button>
            <AnimatePresence>
              {open && (
                <motion.nav initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  className="absolute bottom-14 right-0 min-w-[210px] p-3 rounded-xl border border-border bg-card/95 backdrop-blur-sm shadow-xl" aria-label="Sumário">
                  {CHAPTERS.map((c) => (
                    <a key={c.id} href={`#${c.id}`} onClick={() => setOpen(false)}
                      className={`block text-xs px-3 py-2 rounded-lg transition-colors ${active === c.id ? 'bg-primary/15 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}`}>
                      {c.num} · {c.label}
                    </a>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ═══ CHAPTER KICKOFF ═══ */
const ChapterKickoff: React.FC<{ number: string; title: string; subtitle: string }> = ({ number, title, subtitle }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-10 md:mb-14">
      <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-primary font-bold">{number}</span>
        <div className="h-px w-10 bg-gradient-to-r from-primary/80 to-transparent" />
      </motion.div>
      <motion.h2 variants={fadeUp} custom={1}
        className="text-2xl md:text-4xl font-black tracking-tight text-foreground mb-3 leading-[1.05]"
        style={{ fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif" }}>{title}</motion.h2>
      <motion.p variants={fadeUp} custom={2} className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">{subtitle}</motion.p>
    </motion.div>
  );
};

/* ═══ SECTION GLOW ═══ */
const SectionGlow = () => (
  <div className="relative z-10 max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent" />
);

/* ═══ METRIC CARD ═══ */
const MetricCard: React.FC<{ value: string; label: string; delay: number }> = ({ value, label, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.article ref={ref} initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, ease: APPLE_EASE, delay }}
      className={`${panelClass} p-6 md:p-8 text-center group hover:border-primary/50 hover:-translate-y-1 transition-all duration-500`}>
      <p className="text-4xl md:text-5xl font-black text-primary mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{value}</p>
      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{label}</p>
    </motion.article>
  );
};

/* ═══ INTERACTIVE TIMELINE ITEM ═══ */
const TimelineNode: React.FC<{ item: typeof TIMELINE_DATA[0]; index: number; isActive: boolean; onClick: () => void }> = ({ item, index, isActive, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.button ref={ref} onClick={onClick}
      initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: APPLE_EASE, delay: index * 0.08 }}
      className={`flex flex-col items-center gap-2 min-w-[100px] md:min-w-[130px] group transition-all duration-300 ${isActive ? 'scale-105' : 'opacity-60 hover:opacity-90'}`}>
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-primary/20 border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.3)]' : 'bg-secondary/50 border-border/60'} border`}>
        <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
      </div>
      <p className={`font-mono text-xs font-bold tracking-wider transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{item.year}</p>
      <p className={`text-[10px] md:text-xs font-semibold text-center leading-tight transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{item.short}</p>
    </motion.button>
  );
};

/* ═══ HIGHLIGHTED QUOTE ═══ */
const HighlightedQuote: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.blockquote ref={ref} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: APPLE_EASE }}
      className={`${panelClass} p-6 md:p-8 my-10 md:my-14 border-l-4 border-l-primary`}>
      <Quote className="w-6 h-6 text-primary/40 mb-3" />
      <p className="text-base md:text-lg font-semibold text-foreground leading-relaxed italic">{text}</p>
    </motion.blockquote>
  );
};

/* ═══ COPY BUTTON ═══ */
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors">
      {copied ? <><Check className="w-3.5 h-3.5" /> Copiado</> : <><Copy className="w-3.5 h-3.5" /> Copiar</>}
    </button>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Bip110() {
  const [activeTimeline, setActiveTimeline] = useState(5);

  return (
    <>
      <Helmet>
        <title>BIP-110: Entenda a Guerra pelo Espaço de Bloco no Bitcoin | Lord Junnior</title>
        <meta name="description" content="A proposta BIP-110 quer restringir dados dentro da blockchain do Bitcoin. Entenda o conflito técnico entre desenvolvedores sobre o futuro do protocolo." />
        <meta name="keywords" content="bip 110, espaço de bloco bitcoin, protocolo bitcoin, soft fork bitcoin, ordinals bitcoin, taproot bitcoin, limite op return, governança bitcoin, como o bitcoin evolui" />
        <meta property="og:title" content="BIP-110: A Guerra pelo Espaço de Bloco no Bitcoin" />
        <meta property="og:description" content="A proposta BIP-110 pode mudar quem decide o que entra na blockchain. Entenda o conflito técnico e político." />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/bip-110.webp" />
        <meta property="og:url" content="https://lordjunnior.com.br/bitcoin/bip-110-guerra-espaco-bloco" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Lord Junnior" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BIP-110: A Guerra pelo Espaço de Bloco" />
        <meta name="twitter:description" content="Entenda o conflito técnico dentro do Bitcoin sobre a BIP-110." />
        <meta name="twitter:image" content="https://lordjunnior.com.br/heroes/bip-110.webp" />
        <link rel="canonical" href="https://lordjunnior.com.br/bitcoin/bip-110-guerra-espaco-bloco" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article',
          headline: 'BIP-110: Entenda a Guerra pelo Espaço de Bloco no Bitcoin',
          description: 'A proposta BIP-110 quer restringir dados dentro da blockchain do Bitcoin. Entenda o conflito técnico entre desenvolvedores sobre o futuro do protocolo.',
          author: { '@type': 'Person', name: 'Lord Junnior', url: 'https://lordjunnior.com.br' },
          publisher: { '@type': 'Organization', name: 'Lord Junnior', logo: { '@type': 'ImageObject', url: 'https://lordjunnior.com.br/og-image.png' } },
          datePublished: '2025-02-22', dateModified: '2026-03-15',
          image: 'https://lordjunnior.com.br/heroes/bip-110.webp',
          mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lordjunnior.com.br/bitcoin/bip-110-guerra-espaco-bloco' },
          inLanguage: 'pt-BR', articleSection: 'Bitcoin',
        }) }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }) }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br' },
            { '@type': 'ListItem', position: 2, name: 'Bitcoin', item: 'https://lordjunnior.com.br/bitcoin' },
            { '@type': 'ListItem', position: 3, name: 'BIP-110: Guerra do Espaço de Bloco', item: 'https://lordjunnior.com.br/bitcoin/bip-110-guerra-espaco-bloco' },
          ],
        }) }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'HowTo',
          name: 'Como acompanhar mudanças no protocolo Bitcoin',
          step: [
            { '@type': 'HowToStep', position: 1, name: 'Acompanhar BIPs públicas', text: 'Acesse o repositório oficial de BIPs no GitHub para monitorar novas propostas.' },
            { '@type': 'HowToStep', position: 2, name: 'Entender soft forks', text: 'Estude a diferença entre soft fork e hard fork para interpretar propostas com autonomia.' },
            { '@type': 'HowToStep', position: 3, name: 'Rodar um node', text: 'Valide transações e participe ativamente do consenso da rede Bitcoin.' },
            { '@type': 'HowToStep', position: 4, name: 'Acompanhar discussões técnicas', text: 'Siga as mailing lists e canais técnicos onde desenvolvedores debatem propostas.' },
          ],
        }) }} />
      </Helmet>

      <ScrollToTop />
      <ReadingProgressBar />
      <FloatingToc />
      <NobelVFX accentColor="amber" />

      {/* ═══ HERO ═══ */}
      <CinematicHero
        phase="PROTOCOLO BITCOIN • ANÁLISE EDITORIAL"
        title="A GUERRA PELO ESPAÇO DE BLOCO DO BITCOIN"
        subtitle="A proposta BIP-110 pode mudar quem decide o que entra na blockchain."
        image="/heroes/bip-110.webp"
        icon={GitFork}
        accentColor="amber"
        backLink="/blockchain"
        backLabel="Blockchain"
      />

      {/* Hero CTAs */}
      <section className="relative z-10 -mt-6 md:-mt-8 pb-4">
        <div className="max-w-4xl mx-auto px-4 md:px-10 flex flex-wrap gap-3">
          <a href="#problema"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/15 border border-primary/40 text-primary font-semibold text-sm hover:bg-primary/25 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.25)]">
            Explorar a análise <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <Link to="/blockchain"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card/60 text-foreground/80 font-semibold text-sm hover:bg-card hover:border-border/80 transition-all duration-300">
            Entender o protocolo Bitcoin
          </Link>
        </div>
      </section>

      <main className="relative z-10">

        {/* ═══ RESUMO EM 30 SEGUNDOS ═══ */}
        <section className="relative z-10 py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: APPLE_EASE }}
              className={`${panelClass} p-5 md:p-6 border-l-4 border-l-primary`}>
              <p className="font-mono text-[10px] tracking-[0.3em] text-primary font-bold mb-3">RESUMO EM 30 SEGUNDOS</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'BIP-110', value: 'Limitar dados na blockchain' },
                  { label: 'Objetivo', value: 'Reduzir "spam" na rede' },
                  { label: 'Duração', value: '~1 ano (52.416 blocos)' },
                  { label: 'Chance', value: 'Extremamente baixa' },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-secondary/50 p-3">
                    <p className="font-mono text-[9px] tracking-wider text-primary font-bold">{item.label}</p>
                    <p className="text-xs text-foreground font-semibold mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ 01 — O PROBLEMA ═══ */}
        <section id="problema" className={sectionShell}>
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 01" title="O Problema do Espaço de Bloco"
              subtitle="Antes de qualquer explicação técnica, você precisa entender visualmente a escala do conflito." />

            <div className="grid md:grid-cols-3 gap-5 mb-10">
              <MetricCard value="41%" label="transações consideradas não monetárias" delay={0} />
              <MetricCard value="36%" label="espaço de bloco potencialmente liberado" delay={0.08} />
              <MetricCard value="83 bytes" label="limite histórico do OP_RETURN" delay={0.16} />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65, ease: APPLE_EASE }}
              className={`${panelClass} p-6 md:p-8`}>
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                Cada bloco do Bitcoin possui limite físico de dados. Nos últimos anos, novos usos da blockchain começaram a disputar esse espaço. Fotos. NFTs. Tokens. Inscrições. Dados que não são transações monetárias, mas que pagam taxa e competem igualmente por inclusão no bloco.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-3">
                Isso gerou uma das discussões mais intensas dentro da comunidade técnica do Bitcoin. A pergunta central: quem decide o que pode — e o que não pode — existir dentro da blockchain?
              </p>
            </motion.div>
          </div>
        </section>

        <HighlightedQuote text="Quem controla o espaço de bloco controla o que pode existir dentro do Bitcoin." />

        <SectionGlow />

        {/* ═══ 02 — O QUE É ═══ */}
        <section id="o-que-e" className={sectionShell}>
          <div className="max-w-5xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 02" title="O Que É a BIP-110"
              subtitle="Explicação simples e direta, sem enrolação técnica desnecessária." />

            <div className="space-y-5">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, ease: APPLE_EASE }}
                className={`${panelClass} p-6 md:p-8`}>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  A BIP-110 é uma proposta de melhoria do Bitcoin que sugere criar um <strong className="text-primary">soft fork temporário</strong> para restringir certos tipos de dados dentro da blockchain.
                </p>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed mt-3">
                  A ideia central é limitar o uso do espaço de bloco para preservar o Bitcoin como rede monetária. A proposta teria duração de aproximadamente um ano — 52.416 blocos — restaurando limites históricos de propagação.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: APPLE_EASE }}
                  className="rounded-xl border border-border/70 bg-secondary/50 p-5">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm text-foreground font-semibold">Para alguns desenvolvedores</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Isso protege a rede, reduz congestionamento e mantém o custo de rodar um node acessível para indivíduos.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: APPLE_EASE, delay: 0.08 }}
                  className="rounded-xl border border-border/70 bg-secondary/50 p-5">
                  <AlertTriangle className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm text-foreground font-semibold">Para outros</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Isso cria precedentes perigosos de filtragem política sobre o que pode circular em uma rede que nasceu para ser livre.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ 03 — TIMELINE INTERATIVA ═══ */}
        <section id="timeline" className={sectionShell}>
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 03" title="Linha do Tempo do Conflito"
              subtitle="Toque ou passe o mouse em cada ponto para entender como chegamos aqui." />

            {/* Timeline horizontal */}
            <div className="relative mb-8">
              <div className="absolute top-6 md:top-7 left-0 right-0 h-px bg-border z-0" />
              <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 relative z-10 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                {TIMELINE_DATA.map((item, i) => (
                  <TimelineNode key={item.year} item={item} index={i} isActive={activeTimeline === i}
                    onClick={() => setActiveTimeline(i)} />
                ))}
              </div>
            </div>

            {/* Active detail card */}
            <AnimatePresence mode="wait">
              <motion.article key={activeTimeline}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: APPLE_EASE }}
                className={`${panelClass} p-6 md:p-8`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-sm font-bold text-primary">{TIMELINE_DATA[activeTimeline].year}</span>
                  <span className="text-sm font-semibold text-foreground">{TIMELINE_DATA[activeTimeline].short}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{TIMELINE_DATA[activeTimeline].detail}</p>
              </motion.article>
            </AnimatePresence>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ 04 — OS DOIS LADOS ═══ */}
        <section id="dois-lados" className={sectionShell}>
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 04" title="Os Dois Lados do Debate"
              subtitle="Dois princípios legítimos em choque direto." />

            <div className="grid md:grid-cols-2 gap-5">
              <motion.article initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, ease: APPLE_EASE }}
                className={`${panelClass} p-6 md:p-8 group hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)] transition-all duration-500`}>
                <h3 className="text-lg md:text-xl font-black text-foreground mb-4 flex items-center gap-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <Shield className="w-5 h-5 text-primary" /> Bitcoin deve ser dinheiro
                </h3>
                <ul className="space-y-3">
                  {['Reduz spam e dados não monetários', 'Protege descentralização da rede', 'Mantém nodes acessíveis para indivíduos', 'Preserva função monetária da camada base'].map((arg) => (
                    <li key={arg} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {arg}
                    </li>
                  ))}
                </ul>
              </motion.article>

              <motion.article initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.08 }}
                className={`${panelClass} p-6 md:p-8 group hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)] transition-all duration-500`}>
                <h3 className="text-lg md:text-xl font-black text-foreground mb-4 flex items-center gap-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <Users className="w-5 h-5 text-primary" /> Rede livre
                </h3>
                <ul className="space-y-3">
                  {['Quem paga taxa decide o uso', 'Mais demanda gera mais taxas para mineradores', 'Filtros são censura disfarçada', 'Flexibilidade fortalece o security budget'].map((arg) => (
                    <li key={arg} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {arg}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </div>
          </div>
        </section>

        <HighlightedQuote text="O debate não é sobre spam. É sobre quem tem autoridade para definir o que é legítimo dentro de um sistema que nasceu sem autoridade central." />

        <SectionGlow />

        {/* ═══ 05 — IMPACTOS ═══ */}
        <section id="impactos" className={sectionShell}>
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 05" title="Impactos Reais da Proposta"
              subtitle="Se a BIP-110 avançasse, estes seriam os efeitos concretos na rede." />

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { img: blockchainBlocos, icon: Pickaxe, title: 'Mineradores', desc: 'Possível queda de taxas no curto prazo pela redução de competição por espaço. No longo prazo, o mercado avalia se isso fortalece ou fragiliza o valor do ativo.' },
                { img: blockchainRedeGlobal, icon: Zap, title: 'Lightning Network', desc: 'Impacto indireto mas relevante: canais dependem de previsibilidade em L1. Fricção de consenso aumenta custo de coordenação para roteadores e provedores.' },
                { img: blockchainLivroRazao, icon: Network, title: 'Nodes', desc: 'Crescimento mais lento da blockchain pode facilitar operação de nodes individuais, mas a disputa política sobre filtros gera incerteza operacional.' },
              ].map((card, i) => (
                <motion.article key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: APPLE_EASE, delay: i * 0.08 }}
                  className={`${panelClass} overflow-hidden group hover:border-primary/40 hover:-translate-y-1 transition-all duration-500`}>
                  <div className="relative h-40 overflow-hidden">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                      <card.icon className="w-4 h-4 text-primary" /> {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ 06 — COMO ACOMPANHAR ═══ */}
        <section id="acompanhar" className={sectionShell}>
          <div className="max-w-5xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 06" title="Como Acompanhar Mudanças no Bitcoin"
              subtitle="Tutorial passo a passo para não depender de terceiros na interpretação do protocolo." />

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { step: '01', title: 'Acompanhar BIPs públicas', desc: 'Acesse o repositório oficial de BIPs no GitHub. Toda proposta de mudança passa por lá antes de qualquer discussão.' },
                { step: '02', title: 'Entender soft forks', desc: 'Estude a diferença entre soft fork e hard fork. Isso define como interpretar cada proposta com autonomia técnica.' },
                { step: '03', title: 'Rodar um node', desc: 'Validar transações diretamente te dá voz ativa no consenso. Sem node próprio, você depende de terceiros.' },
                { step: '04', title: 'Acompanhar discussões técnicas', desc: 'Siga as mailing lists e canais onde desenvolvedores debatem propostas. É lá que decisões reais acontecem.' },
              ].map((item, i) => (
                <motion.article key={item.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.08 }}
                  className={`${panelClass} p-6 group hover:border-primary/40 transition-all duration-400`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-lg bg-primary/15 text-primary font-mono text-xs font-bold flex items-center justify-center">{item.step}</span>
                    <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ 07 — VEREDICTO ═══ */}
        <section id="veredicto" className={sectionShell}>
          <div className="max-w-5xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 07" title="Veredicto Editorial"
              subtitle="Análise forte e defensável, sem alarmismo e sem fragilidade argumentativa." />

            <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: APPLE_EASE }}
              className={`${panelClass} p-8 md:p-10`}>
              <div className="flex items-center gap-3 mb-5">
                <BadgeAlert className="w-5 h-5 text-primary" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary font-bold">ANÁLISE FINAL</span>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p className="text-foreground font-semibold text-base">
                  Hoje a chance de ativação da BIP-110 é extremamente baixa.
                </p>
                <p>
                  Menos de três por cento dos nodes demonstraram apoio. Mudanças de consenso no Bitcoin normalmente levam anos de debate técnico. Mesmo propostas muito discutidas raramente alcançam consenso rapidamente.
                </p>
                <p>
                  A discussão, porém, revela algo importante: o espaço de bloco se tornou um dos recursos mais disputados da rede. E quem entende essa disputa tem vantagem estratégica para interpretar os próximos ciclos de governança do protocolo.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ 08 — APOIAR ═══ */}
        <section id="apoiar" className={sectionShell}>
          <div className="max-w-5xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 08" title="Apoie Este Projeto"
              subtitle="Se o conteúdo te ajudou, você pode fortalecer a continuidade da biblioteca educacional." />

            <div className="grid md:grid-cols-[1fr,280px] gap-6">
              <div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {TIERS.map((tier, i) => (
                    <motion.div key={tier.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ duration: 0.45, ease: APPLE_EASE, delay: i * 0.06 }}
                      className="rounded-xl border border-border/70 bg-secondary/40 p-4 hover:border-primary/40 transition-colors">
                      <p className="font-mono text-xs font-bold text-primary">{tier.sats}</p>
                      <p className="text-xs font-semibold text-foreground mt-1">{tier.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{tier.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-xs font-mono text-muted-foreground break-all">{LIGHTNING_ADDRESS}</p>
                  <CopyButton text={LIGHTNING_ADDRESS} />
                </div>

                <a href={`lightning:${LIGHTNING_ADDRESS}`}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/15 border border-primary/40 text-primary font-semibold text-sm hover:bg-primary/25 hover:border-primary/60 hover:shadow-[0_0_20px_hsl(var(--primary)/0.25)] transition-all duration-300">
                  <HandCoins className="w-4 h-4" /> Apoiar via Lightning <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className={`${panelClass} p-3 self-start`}>
                <img src={qrCodeImage} alt="QR Code Lightning" className="w-full h-auto rounded-lg" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ 09 — FERRAMENTAS ═══ */}
        <section id="ferramentas" className={sectionShell}>
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 09" title="Ferramentas Recomendadas"
              subtitle="Arsenal tático para quem quer operar Bitcoin com autonomia real." />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {TOOLS.map((tool, i) => (
                <motion.article key={tool.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.06 }}
                  className={`${panelClass} p-5 group hover:border-primary/40 hover:-translate-y-1 transition-all duration-500`}>
                  <tool.icon className="w-5 h-5 text-primary mb-3" />
                  <h3 className="text-sm font-bold text-foreground mb-1">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{tool.desc}</p>
                  {tool.isInternal ? (
                    <Link to={tool.url} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:opacity-80 transition-opacity">
                      {tool.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <a href={tool.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:opacity-80 transition-opacity">
                      {tool.cta} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ 10 — FAQ ═══ */}
        <section id="faq" className={sectionShell}>
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 10" title="Perguntas Frequentes"
              subtitle="As dúvidas mais comuns sobre a BIP-110, soft forks e impactos para quem possui Bitcoin." />

            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_DATA.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`} className="rounded-xl border border-border/80 bg-card/75 px-5">
                  <AccordionTrigger className="text-sm md:text-base font-semibold text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
