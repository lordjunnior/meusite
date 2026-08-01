import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence, useSpring } from 'framer-motion';
import {
  Shield, ChevronRight, AlertTriangle, Lock, Building2,
  CheckCircle, XCircle, ExternalLink, ChevronDown,
  Zap, ArrowRightLeft, CreditCard, Globe, TrendingUp, Smartphone,
  Eye, HelpCircle, Check, X,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import NobelVFX from '@/components/NobelVFX';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import heroImg from '@/assets/neobankless-hero.jpg';
import appImg from '@/assets/neobankless-app.jpg';
import BackToHome from '@/components/BackToHome';

/* ═══════════════════════════════════════════════════════════
   MOTION SYSTEM — Netflix/BBC Scroll Storytelling
   ═══════════════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const staggerChild = {
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

const AFFILIATE_LINK = 'https://neobankless.com/join?code=X7W';

/* ═══ Chapter Kickoff Frame — 60-70% image + giant title ═══ */
const ChapterKickoff = ({ number, title, image, id, isOdd }: { number: string; title: string; image: string; id: string; isOdd: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.05, 1.02]);

  return (
    <div ref={ref} id={id} className="relative overflow-hidden" style={{ background: isOdd ? '#050808' : '#070b0b' }}>
      <div className="relative h-[65vh] min-h-[450px] max-h-[700px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <img src={image} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.35) saturate(0.75)' }} loading="lazy" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${isOdd ? 'rgba(5,8,8,0.3)' : 'rgba(7,11,11,0.3)'} 0%, transparent 30%, ${isOdd ? 'rgba(5,8,8,0.7)' : 'rgba(7,11,11,0.7)'} 70%, ${isOdd ? '#050808' : '#070b0b'} 100%)` }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 30%, rgba(5,8,8,0.85) 100%)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative text-center px-6">
            <motion.span initial={{ opacity: 0, scale: 0.5, y: 30 }} animate={inView ? { opacity: 0.08, scale: 1, y: 0 } : {}} transition={{ duration: 1.5, ease: EASE }}
              className="absolute -top-24 md:-top-32 left-1/2 -translate-x-1/2 text-[160px] md:text-[240px] font-black text-white pointer-events-none select-none leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{number}</motion.span>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 0.6, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary/70 mb-4 relative z-10">Capítulo {number}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white relative z-10 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</motion.h2>
            <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="h-px w-40 mx-auto mt-8 bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-center relative z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ Scroll-aware Section with Parallax 8% ═══ */
const ScrollSection = ({ children, className = '', id, isOdd = true }: { children: React.ReactNode; className?: string; id?: string; isOdd?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div ref={ref} id={id} initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, ease: EASE }} style={{ y, background: isOdd ? '#050808' : '#070b0b' }} className={className}>
      {children}
    </motion.div>
  );
};

/* ═══ Reading Progress Bar ═══ */
const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left" style={{ scaleX, background: 'linear-gradient(90deg, rgba(239,68,68,0.8), rgba(245,158,11,1), rgba(234,179,8,0.9))' }} />;
};

/* ═══ Floating TOC ═══ */
const CHAPTERS = [
  { id: 'ficha-tecnica', label: 'Ficha Técnica', num: '01' },
  { id: 'como-funciona', label: 'Como Funciona', num: '02' },
  { id: 'pros-contras', label: 'Prós e Contras', num: '03' },
  { id: 'veredicto', label: 'Veredicto', num: '04' },
  { id: 'faq', label: 'FAQ', num: '05' },
];

const FloatingToc = () => {
  const [active, setActive] = useState('');
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, 'change', (v) => { setShow(v > 0.08 && v < 0.95); });
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    CHAPTERS.forEach(c => { const el = document.getElementById(c.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.nav initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.5, ease: EASE }} className="fixed right-6 top-1/2 -translate-y-1/2 z-[55] hidden xl:flex 2xl:hidden flex-col gap-4">
          {CHAPTERS.map(c => (
            <a key={c.id} href={`#${c.id}`}
              className={`group flex items-center gap-3 transition-all duration-400 ${active === c.id ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}>
              <span className={`block transition-all duration-400 rounded-full ${active === c.id ? 'w-3 h-3 bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]' : 'w-2 h-2 bg-stone-600'}`} />
              <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-400 ${active === c.id ? 'text-primary' : 'text-stone-600'}`}>
                {c.num} · {c.label}
              </span>
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

/* ═══ DATA ═══ */
const SPECS = [
  { label: 'Limite PIX/dia', value: 'R$ 50.000', icon: Zap },
  { label: 'Taxa conversão', value: '0.5%', icon: ArrowRightLeft },
  { label: 'Sede', value: 'Florianópolis, BR', icon: Building2 },
  { label: 'Cartão', value: 'Visa Infinite', icon: CreditCard },
  { label: 'Moedas', value: 'BRL · USD · EUR', icon: Globe },
  { label: 'Cripto suportado', value: 'USDC · USDT', icon: TrendingUp },
];
const PROS = [
  'Limite de R$ 50.000/dia via PIX — muito acima de alternativas brasileiras',
  'Taxa de 0.5% — inferior a exchanges e plataformas tradicionais',
  'Conversão BRL → USDC direta, sem intermediários complexos',
  'Suporte a envios em EUR — ideal para quem está migrando para Europa',
  'Cartão Visa Infinite com benefícios Visa (sala VIP, seguro viagem, no-show)',
  'Possibilidade de sacar USDC em euros para conta própria',
  'Interface simples e direta, sem burocracia excessiva por transação',
];
const CONS = [
  'Exige CPF na abertura — provável reporte ao COAF e Receita Federal',
  'Sede em Florianópolis — sujeita às regulações brasileiras de 2026',
  'Envios apenas para si mesmo (após regulação do Banco Central)',
  'Cartão disponível apenas por convite limitado',
  'Rendimento (earn) abaixo do tesouro americano — não vale a pena',
  'Limite USDC → BRL de apenas R$ 10.000/dia (assimétrico)',
  'Sem diferencial real de privacidade em relação a exchanges tradicionais',
];
const FEATURES = [
  { step: '01', title: 'Deposite via PIX', desc: 'Receba até R$ 50.000/dia diretamente no app. O valor aparece em reais na sua conta.' },
  { step: '02', title: 'Converta para USDC', desc: 'Conversão instantânea BRL → USDC com taxa de 0.5%. Sem burocracia extra por transação.' },
  { step: '03', title: 'Envie para fora', desc: 'Saque em EUR para conta própria na Europa, ou envie USDC para carteira cripto.' },
];
const FAQ_DATA = [
  { q: 'O que é a Neobankless e como funciona?', a: 'A Neobankless é uma fintech com sede em Florianópolis que oferece uma conta internacional com suporte a BRL, USD (via stablecoins) e EUR. Você pode receber via PIX, converter para USDC e enviar para contas em euros ou cripto.' },
  { q: 'A Neobankless reporta transações para a Receita Federal?', a: 'Muito provavelmente sim. A plataforma exige CPF na abertura, tem sede no Brasil e está sujeita às regulações de 2026. Um dos fundadores confirmou em redes sociais que a empresa se submete a todas as regulamentações governamentais.' },
  { q: 'Qual a diferença entre Neobankless e exchanges tradicionais?', a: 'A principal vantagem é a taxa de 0.5% (menor que muitas exchanges) e o limite de R$ 50.000/dia via PIX. Porém, em termos de privacidade, não há diferencial significativo — ambas exigem KYC e provavelmente reportam.' },
  { q: 'O cartão Visa Infinite da Neobankless vale a pena?', a: 'Se liberado para você, sim. O cartão Visa Infinite oferece benefícios providos pela própria Visa (não pelo banco emissor): seguro no-show, extravio de malas, seguro locação veicular e acesso a salas VIP via Visa Airport Companion.' },
  { q: 'Posso usar a Neobankless após dar saída fiscal do Brasil?', a: 'Essa é a grande questão. Se a plataforma aceitar seu CPF mesmo após a saída fiscal, e você não for mais residente tributário no Brasil, a conta pode se tornar interessante por potencialmente não estar sujeita ao reporte brasileiro. Porém, isso não está claramente documentado.' },
  { q: 'Neobankless é melhor que Bitcoin para proteção patrimonial?', a: 'Não. A Neobankless é uma ferramenta de conveniência para movimentação de valores, não de soberania. Para proteção patrimonial real, autocustódia de Bitcoin continua sendo a única solução onde nenhum terceiro pode confiscar, bloquear ou reportar seus ativos.' },
  { q: 'Como abrir conta na Neobankless?', a: 'Atualmente, a Neobankless funciona por convite. Você precisa acessar um link de convite de um founder existente para se tornar parte da plataforma. Após o cadastro, passa pelo KYC básico (CPF e documentos) e ganha acesso ao app.' },
  { q: 'A Neobankless é segura e legalizada?', a: 'A empresa opera dentro das regulamentações brasileiras e se submete às normas do Banco Central. Isso significa que é legal e regulada, mas também significa que não oferece vantagens de privacidade em relação ao sistema bancário tradicional.' },
];
const VERDICT_FOR = [
  'Quem precisa converter BRL → stablecoin com taxa baixa',
  'Quem está migrando para Europa e precisa de envio em EUR',
  'Quem já tem dados reportados e quer uma alternativa mais barata',
  'Quem valoriza o cartão Visa Infinite',
];
const VERDICT_AGAINST = [
  'Quem busca privacidade financeira real',
  'Quem não quer CPF vinculado a transações cripto',
  'Quem já pratica autocustódia e usa DEX',
  'Quem busca rendimentos em stablecoins',
];

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Neobankless() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <Helmet>
        <title>Neobankless: Conta Global Cripto — Análise Completa 2026 | Lord Junnior</title>
        <meta name="description" content="Análise honesta da Neobankless: conta internacional com PIX, conversão BRL→USDC a 0.5%, cartão Visa Infinite. Veja prós, contras e se ela reporta para a Receita Federal." />
        <link rel="canonical" href="https://lordjunnior.com.br/neobankless" />
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: 'Neobankless: Conta Global Cripto — Análise Completa 2026', author: { '@type': 'Person', name: 'Lord Junnior' }, publisher: { '@type': 'Organization', name: 'Lord Junnior' }, datePublished: '2026-03-07' })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_DATA.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}</script>
      </Helmet>
      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
      <ReadingProgressBar />
      <FloatingToc />

      <div className="min-h-screen bg-[#050808] text-stone-200">
        <NobelVFX accentColor="orange" />


        {/* ═══ HERO ═══ */}
        <div ref={heroRef} className="relative h-[90vh] min-h-[650px] max-h-[950px] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
            <div className="absolute inset-0 scale-110">
              <img src={heroImg} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3) saturate(0.7)' }} loading="lazy" decoding="async" />
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.05) 0%, rgba(5,8,8,0.4) 35%, rgba(5,8,8,0.88) 65%, #050808 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 130% 100% at 50% 15%, transparent 25%, rgba(5,8,8,0.92) 100%)' }} />
          </motion.div>

          <motion.div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24" style={{ opacity: heroOpacity }}>
            <Link to="/soberania-financeira" className="inline-flex items-center gap-2 text-stone-500 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-10">
              <ChevronRight size={14} className="rotate-180" /> Soberania Financeira
            </Link>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mb-5">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary/70">REVIEW EDITORIAL · FINTECH CRIPTO</span>
            </motion.div>
            <div className="flex items-start gap-5 mb-6">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                className="p-4 rounded-2xl bg-primary/10 border border-primary/20 shrink-0 backdrop-blur-sm">
                <Smartphone className="text-primary" size={30} />
              </motion.div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                  className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.92]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Neobankless<br /><span className="text-primary">Análise Completa</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                  className="text-stone-400 text-sm md:text-base lg:text-lg leading-relaxed mt-5 max-w-2xl">
                  Conta internacional com PIX, conversão BRL → USDC a 0.5% e cartão Visa Infinite.
                  Mas será que ela reporta? Análise sem filtro.
                </motion.p>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="flex flex-wrap gap-3 mt-8">
              <div className="inline-flex items-center gap-2 border border-destructive/20 bg-destructive/5 px-4 py-2 rounded-sm">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-destructive text-xs font-bold uppercase tracking-wider font-mono">Reporte provável · Sede no Brasil</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5 }} className="flex items-center gap-2 mt-10">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <ChevronDown size={14} className="text-stone-500" />
              </motion.div>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-600">Role para explorar</span>
            </motion.div>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #050808)' }} />
        </div>

        {/* ═══ SOVEREIGN DISCLAIMER ═══ */}
        <div className="px-6 md:px-12 lg:px-20">
          <SovereignDisclaimer variant="bank" />
        </div>

        {/* ═══ CHAPTER 01 — FICHA TÉCNICA (odd) ═══ */}
        <ChapterKickoff number="01" title="Ficha Técnica da Plataforma" image={appImg} id="ficha-tecnica" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SPECS.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <motion.div key={i} variants={staggerChild}
                    className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.15)]">
                    <Icon className="w-5 h-5 text-primary/60 mb-3" />
                    <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{spec.value}</p>
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500">{spec.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CHAPTER 02 — COMO FUNCIONA (even) ═══ */}
        <ChapterKickoff number="02" title="Como Funciona" image={heroImg} id="como-funciona" isOdd={false} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 md:row-span-2 flex items-center justify-center">
                <img src={appImg} alt="Neobankless App" className="w-full max-w-xs rounded-xl opacity-90" loading="lazy" decoding="async" />
              </motion.div>
              {FEATURES.map((item, i) => (
                <motion.div key={i} variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 hover:border-primary/20 transition-colors duration-500">
                  <span className="text-primary/30 text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.step}</span>
                  <h3 className="font-bold text-white text-lg mt-2 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CHAPTER 03 — PRÓS E CONTRAS (odd) ═══ */}
        <ChapterKickoff number="03" title="Prós e Contras" image={heroImg} id="pros-contras" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={staggerChild} className="border border-emerald-500/20 bg-emerald-500/[0.03] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-2xl font-bold text-emerald-400 uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Vantagens</h3>
                </div>
                <ul className="space-y-4">
                  {PROS.map((pro, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone-400 leading-relaxed">
                      <span className="text-emerald-500 mt-1 shrink-0">+</span> {pro}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={staggerChild} className="border border-rose-500/20 bg-rose-500/[0.03] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <h3 className="text-2xl font-bold text-rose-400 uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Desvantagens</h3>
                </div>
                <ul className="space-y-4">
                  {CONS.map((con, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone-400 leading-relaxed">
                      <span className="text-rose-500 mt-1 shrink-0">!</span> {con}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            {/* Privacy Warning */}
            <motion.div variants={staggerChild} className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/[0.04] p-6 md:p-8 flex gap-4 items-start">
              <Eye className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-destructive text-sm mb-2 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Alerta de Privacidade</h4>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Um dos fundadores confirmou publicamente que a empresa se submete a todas as regulamentações governamentais.
                  Com CPF obrigatório e sede em Florianópolis, o reporte ao COAF e Receita Federal é praticamente inevitável a partir de 2026.
                  <strong className="text-stone-200"> Para privacidade real, autocustódia de Bitcoin continua sendo a única alternativa soberana.</strong>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CHAPTER 04 — VEREDICTO (even) ═══ */}
        <ChapterKickoff number="04" title="Veredicto Final" image={appImg} id="veredicto" isOdd={false} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <motion.div variants={staggerChild} className="border border-primary/20 bg-primary/[0.03] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-primary uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Para quem serve</h3>
                <ul className="space-y-3">
                  {VERDICT_FOR.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone-400"><ChevronRight className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-stone-500 uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Para quem não serve</h3>
                <ul className="space-y-3">
                  {VERDICT_AGAINST.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone-500"><Lock className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* CTA Breathing */}
            <motion.div variants={staggerChild} className="relative overflow-hidden rounded-3xl border border-primary/30 p-10 md:p-14"
              style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08), rgba(255,255,255,0.02), transparent)' }}>
              <div className="absolute top-6 right-6 w-3 h-3">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                <span className="relative block w-3 h-3 rounded-full bg-primary" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/80">Convite exclusivo Founder</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-4 leading-[0.95] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Quer testar a<br /><span className="text-primary">Neobankless?</span>
              </h2>
              <p className="text-stone-400 text-base leading-relaxed max-w-xl mb-8">
                Acesse como Founder com convite exclusivo. Limite de R$ 50.000/dia via PIX, taxa de 0.5% e conversão direta para stablecoins.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]">
                  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">Criar conta Founder</span><ExternalLink size={14} className="relative" />
                </a>
                <Link to="/autocustodia" className="inline-flex items-center gap-2 border border-white/[0.08] text-stone-400 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors">
                  Prefiro autocustódia
                </Link>
              </div>
            </motion.div>

            {/* Soberania reminder */}
            <motion.div variants={staggerChild} className="mt-10 border border-white/[0.06] bg-white/[0.02] rounded-2xl p-10 md:p-14 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase mb-4 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Conveniência não é <span className="text-destructive">soberania</span>
              </h2>
              <p className="text-stone-400 text-base max-w-2xl mx-auto leading-relaxed mb-8">
                A Neobankless pode ser útil como gateway de conversão, mas não substitui a autocustódia.
                Para proteção real contra confisco, reporte e bloqueio, a resposta continua sendo Bitcoin com custódia própria.
              </p>
              <Link to="/bitcoin" className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] text-white font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-white/[0.08] transition-all">
                Explorar protocolo Bitcoin <ChevronRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CHAPTER 05 — FAQ (odd) ═══ */}
        <ChapterKickoff number="05" title="Perguntas Frequentes" image={heroImg} id="faq" isOdd={true} />
        <ScrollSection className="max-w-3xl mx-auto px-6 py-16 md:py-20 pb-32" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60">FAQ · SEO otimizado</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Dúvidas sobre a Neobankless
                  </h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-primary/30 via-white/[0.06] to-transparent mb-8" />
            </motion.div>
            <motion.div variants={staggerChild}>
              <Accordion type="single" collapsible className="space-y-3">
                {FAQ_DATA.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}
                    className="border border-white/[0.06] rounded-xl bg-white/[0.02] px-6 data-[state=open]:border-primary/20 transition-colors duration-300">
                    <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:no-underline py-5 text-stone-200">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-stone-400 text-sm md:text-base leading-relaxed pb-6">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* Footer */}
        <footer className="max-w-5xl mx-auto px-6 pb-16">
          <div className="pt-12 border-t border-white/[0.04] text-center">
            <p className="text-stone-600 text-[9px] font-black tracking-[0.5em] uppercase font-mono">Análise independente · Lord Junnior © 2026</p>
          </div>
        </footer>
      </div>
    </>
  );
}
