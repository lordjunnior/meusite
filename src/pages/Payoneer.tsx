import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence, useSpring } from 'framer-motion';
import {
  Shield, ChevronRight, AlertTriangle, Lock, Building2,
  CheckCircle, XCircle, ExternalLink, ChevronDown,
  CreditCard, Globe, DollarSign, TrendingUp, Send,
  Check, X, HelpCircle, Briefcase, Clock,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import NobelVFX from '@/components/NobelVFX';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import heroImg from '@/assets/payoneer-hero.jpg';
import appImg from '@/assets/payoneer-app.jpg';
import BackToHome from '@/components/BackToHome';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const staggerChild = { hidden: { opacity: 0, y: 25, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } } };
const AFFILIATE_LINK = '#';

const ChapterKickoff = ({ number, title, image, id, isOdd }: { number: string; title: string; image: string; id: string; isOdd: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.05, 1.02]);
  return (
    <div ref={ref} id={id} className="relative overflow-hidden" style={{ background: isOdd ? '#050808' : '#070b0b' }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

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
              className="text-[10px] font-bold tracking-[0.5em] uppercase text-orange-400/70 mb-4 relative z-10">Capítulo {number}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white relative z-10 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</motion.h2>
            <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="h-px w-40 mx-auto mt-8 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent origin-center relative z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

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

const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left" style={{ scaleX, background: 'linear-gradient(90deg, rgba(249,115,22,0.8), rgba(245,158,11,1), rgba(234,179,8,0.9))' }} />;
};

const CHAPTERS = [
  { id: 'ficha-tecnica', label: 'Ficha Técnica', num: '01' },
  { id: 'funcionalidades', label: 'Funcionalidades', num: '02' },
  { id: 'comparativo', label: 'Comparativo', num: '03' },
  { id: 'pros-contras', label: 'Prós e Contras', num: '04' },
  { id: 'veredicto', label: 'Veredicto', num: '05' },
  { id: 'faq', label: 'FAQ', num: '06' },
];

const FloatingToc = () => {
  const [active, setActive] = useState('');
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, 'change', (v) => { setShow(v > 0.08 && v < 0.95); });
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); }, { rootMargin: '-30% 0px -60% 0px' });
    CHAPTERS.forEach(c => { const el = document.getElementById(c.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.nav initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.5, ease: EASE }} className="fixed right-6 top-1/2 -translate-y-1/2 z-[55] hidden xl:flex 2xl:hidden flex-col gap-4">
          {CHAPTERS.map(c => (
            <a key={c.id} href={`#${c.id}`} className={`group flex items-center gap-3 transition-all duration-400 ${active === c.id ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}>
              <span className={`block transition-all duration-400 rounded-full ${active === c.id ? 'w-3 h-3 bg-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.5)]' : 'w-2 h-2 bg-stone-600'}`} />
              <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-400 ${active === c.id ? 'text-orange-400' : 'text-stone-600'}`}>{c.num} · {c.label}</span>
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

/* ═══ DATA ═══ */
const SPECS = [
  { label: 'Tipo', value: 'Fintech / PSP', icon: Building2 },
  { label: 'Sede', value: 'Nova York, EUA', icon: Globe },
  { label: 'Moedas', value: 'USD · EUR · GBP · JPY +', icon: DollarSign },
  { label: 'Cartão', value: 'Mastercard Prepaid', icon: CreditCard },
  { label: 'Foco principal', value: 'Freelancers & B2B', icon: Briefcase },
  { label: 'Fundação', value: '2005 (20+ anos)', icon: Clock },
];
const FEATURES = [
  { step: '01', title: 'Recebimento Global', desc: 'Receba de Amazon, Fiverr, Upwork, Airbnb e clientes corporativos em USD, EUR, GBP e mais com dados bancários locais.' },
  { step: '02', title: 'Saque para Banco Brasileiro', desc: 'Converta saldos em moeda estrangeira diretamente para reais e saque para qualquer banco brasileiro.' },
  { step: '03', title: 'Cartão Mastercard', desc: 'Cartão prepaid para saques em ATMs no mundo inteiro e compras online/presenciais com conversão automática.' },
  { step: '04', title: 'Pagamentos em Massa', desc: 'Mass Payouts: envie pagamentos para centenas de beneficiários em diferentes países com uma única operação.' },
];
const PROS = [
  'Dados bancários locais nos EUA (ACH), Europa (IBAN), UK (Sort Code), Japão e Austrália',
  'Integração nativa com marketplaces: Amazon, Fiverr, Upwork, Airbnb, Google AdSense',
  'Empresa com mais de 20 anos de mercado — solidez institucional comprovada',
  'Regulada nos EUA (FinCEN), Europa (FCA) e em múltiplas jurisdições',
  'Cartão Mastercard prepaid para saques e compras internacionais',
  'Permite receber de clientes corporativos via transferência bancária local',
  'Pagamento em massa (Mass Payouts) para fornecedores internacionais',
  'Saque direto para conta bancária brasileira em reais',
  'App em português com suporte ao cliente em múltiplos idiomas',
  'Capital de giro disponível para vendedores qualificados (Working Capital)',
];
const CONS = [
  'Exige KYC completo — documentos, selfie e comprovante de atividade profissional',
  'Taxa de câmbio não é mid-market: spread de até 2% sobre a conversão',
  'Taxa de saque para conta bancária: até 2% do valor convertido',
  'Cartão Mastercard prepaid tem limites de saque e taxas em ATMs',
  'Reporta para autoridades fiscais via CRS (Common Reporting Standard)',
  'Conta pode ser bloqueada por suspeita de atividade irregular',
  'Não é crypto friendly — transferências para exchanges podem ser recusadas',
  'Foco em B2B/freelancer: menos útil para quem não recebe de empresas',
  'Não oferece investimentos ou renda fixa',
];
const COMPARE = [
  { criterion: 'Foco', payoneer: 'B2B / Freelancers', wise: 'Pessoal / Freelancers', bank: 'Generalista' },
  { criterion: 'Câmbio', payoneer: 'Spread ~2%', wise: 'Mid-market (real)', bank: 'Spread 2-5%' },
  { criterion: 'Dados bancários locais', payoneer: 'EUA, EU, UK, JP, AU', wise: 'EUA, EU, UK + 7', bank: 'Apenas Brasil' },
  { criterion: 'Integração marketplaces', payoneer: 'Amazon, Fiverr, Upwork', wise: 'Limitada', bank: 'Nenhuma' },
  { criterion: 'Saque para banco BR', payoneer: 'Sim (taxa ~2%)', wise: 'Sim (taxa ~1.5%)', bank: 'N/A' },
  { criterion: 'Crypto friendly', payoneer: 'Não', wise: 'Parcialmente', bank: 'Não' },
];
const FAQ_DATA = [
  { q: 'O que é a Payoneer e para quem ela serve?', a: 'Fintech americana fundada em 2005, especializada em pagamentos internacionais para freelancers, exportadores de serviços e vendedores de e-commerce cross-border.' },
  { q: 'Payoneer é segura?', a: 'Regulada pelo FinCEN nos EUA, FCA no UK e em diversas jurisdições. Mais de 20 anos de operação e milhões de usuários ativos.' },
  { q: 'Qual a diferença entre Payoneer e Wise?', a: 'Wise é focada em transferências pessoais com câmbio mid-market. Payoneer é focada em recebimento de pagamentos corporativos e marketplaces.' },
  { q: 'A Payoneer reporta para a Receita Federal?', a: 'Sim. Cumpre o CRS e reporta informações financeiras para as autoridades fiscais dos países onde os titulares residem.' },
  { q: 'Posso usar a Payoneer para receber da Amazon?', a: 'Sim, integração direta. Vendedores recebem em USD, EUR ou GBP sem conta bancária no país do marketplace.' },
  { q: 'Quanto a Payoneer cobra de taxa?', a: 'Recebimento de marketplaces geralmente é gratuito, conversão tem spread de até 2%, saque para banco ~2%. Sem mensalidade.' },
  { q: 'Posso usar Payoneer para comprar Bitcoin?', a: 'Não recomendado. Pode recusar transferências para exchanges. Use como ponte de recebimento apenas.' },
  { q: 'A Payoneer tem cartão que funciona no Brasil?', a: 'Sim. Mastercard prepaid funciona em qualquer máquina que aceite MC. Saldo em USD com conversão para BRL no ponto de venda.' },
  { q: 'Qual a diferença entre Payoneer e PayPal?', a: 'Payoneer oferece dados bancários locais em múltiplos países, taxas geralmente menores para B2B e saque direto para banco BR com câmbio mais competitivo.' },
  { q: 'Payoneer é boa para soberania financeira?', a: 'Ferramenta tática excelente para receber pagamentos internacionais. Mas não é soberania: exige KYC, reporta CRS e pode bloquear contas.' },
];
const VERDICT_FOR = [
  'Freelancers que recebem de clientes internacionais ou marketplaces',
  'Vendedores de e-commerce cross-border (Amazon, eBay, Shopify)',
  'Quem precisa de dados bancários locais para recebimento',
  'Empresas que fazem pagamentos em massa para fornecedores',
  'Quem já usa Upwork, Fiverr, Airbnb ou Google AdSense',
];
const VERDICT_AGAINST = [
  'Quem busca privacidade financeira (reporta via CRS)',
  'Quem quer o melhor câmbio possível (Wise tem melhor)',
  'Quem opera exclusivamente com cripto',
  'Quem não recebe pagamentos de empresas internacionais',
];

export default function Payoneer() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <Helmet>
        <title>Payoneer: Receba Pagamentos Internacionais — Análise Completa 2026 | Lord Junnior</title>
        <meta name="description" content="Análise completa da Payoneer: receba de Amazon, Fiverr e clientes globais com dados bancários locais em 10+ países. Cartão Mastercard, taxas, prós, contras e veredicto." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/contas-internacionais/payoneer" />
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: 'Payoneer: Receba Pagamentos Internacionais — Análise Completa 2026', author: { '@type': 'Person', name: 'Lord Junnior' }, datePublished: '2026-03-07' })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_DATA.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br/' },
          { '@type': 'ListItem', position: 2, name: 'Soberania Financeira', item: 'https://lordjunnior.com.br/soberania-financeira' },
          { '@type': 'ListItem', position: 3, name: 'Payoneer', item: 'https://lordjunnior.com.br/soberania-financeira/contas-internacionais/payoneer' },
        ] })}</script>
      </Helmet>
      <ScrollToTop />
      <ReadingProgressBar />
      <FloatingToc />

      <div className="min-h-screen bg-[#050808] text-stone-200">
        <NobelVFX accentColor="orange" />


        {/* HERO */}
        <div ref={heroRef} className="relative h-[90vh] min-h-[650px] max-h-[950px] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
            <div className="absolute inset-0 scale-110"><img src={heroImg} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.25) saturate(0.7)' }} loading="lazy" decoding="async" /></div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.05) 0%, rgba(5,8,8,0.4) 35%, rgba(5,8,8,0.88) 65%, #050808 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 130% 100% at 50% 15%, transparent 25%, rgba(5,8,8,0.92) 100%)' }} />
          </motion.div>
          <motion.div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24" style={{ opacity: heroOpacity }}>
            <Link to="/soberania-financeira" className="inline-flex items-center gap-2 text-stone-500 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-10">
              <ChevronRight size={14} className="rotate-180" /> Soberania Financeira
            </Link>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mb-5">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-orange-400/70">REVIEW EDITORIAL · PAGAMENTOS B2B</span>
            </motion.div>
            <div className="flex items-start gap-5 mb-6">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 shrink-0 backdrop-blur-sm">
                <Briefcase className="text-orange-400" size={30} />
              </motion.div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                  className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.92]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Payoneer<br /><span className="text-orange-400">Análise Completa</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                  className="text-stone-400 text-sm md:text-base lg:text-lg leading-relaxed mt-5 max-w-2xl">
                  A plataforma que transformou freelancers brasileiros em profissionais globais.
                  Dados bancários locais nos EUA, Europa e UK para receber como se você estivesse lá.
                </motion.p>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="flex flex-wrap gap-3 mt-8">
              <div className="inline-flex items-center gap-2 border border-orange-500/20 bg-orange-500/5 px-4 py-2 rounded-sm">
                <Briefcase className="w-4 h-4 text-orange-500" /><span className="text-orange-400 text-xs font-bold uppercase tracking-wider font-mono">B2B & Freelancers</span>
              </div>
              <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-2 rounded-sm">
                <Clock className="w-4 h-4 text-primary" /><span className="text-primary text-xs font-bold uppercase tracking-wider font-mono">20+ anos de mercado</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5 }} className="flex items-center gap-2 mt-10">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><ChevronDown size={14} className="text-stone-500" /></motion.div>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-600">Role para explorar</span>
            </motion.div>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #050808)' }} />
        </div>

        {/* ═══ SOVEREIGN DISCLAIMER ═══ */}
        <div className="px-6 md:px-12 lg:px-20">
          <SovereignDisclaimer variant="bank" />
        </div>

        {/* CH01 — FICHA TÉCNICA */}
        <ChapterKickoff number="01" title="Ficha Técnica" image={appImg} id="ficha-tecnica" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SPECS.map((spec, i) => { const Icon = spec.icon; return (
                <motion.div key={i} variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 hover:border-orange-500/20 hover:bg-white/[0.04] transition-all duration-500">
                  <Icon className="w-5 h-5 text-orange-500/60 mb-3" />
                  <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{spec.value}</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500">{spec.label}</p>
                </motion.div>
              ); })}
            </div>
          </motion.div>
        </ScrollSection>

        {/* CH02 — FUNCIONALIDADES */}
        <ChapterKickoff number="02" title="O que a Payoneer Oferece" image={heroImg} id="funcionalidades" isOdd={false} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 md:row-span-2 flex items-center justify-center">
                <img src={appImg} alt="Payoneer App" className="w-full max-w-xs rounded-xl opacity-90" loading="lazy" decoding="async" />
              </motion.div>
              {FEATURES.map((item, i) => (
                <motion.div key={i} variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 hover:border-orange-500/20 transition-colors duration-500">
                  <span className="text-orange-500/30 text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.step}</span>
                  <h3 className="font-bold text-white text-lg mt-2 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollSection>

        {/* CH03 — COMPARATIVO */}
        <ChapterKickoff number="03" title="Payoneer vs Wise vs Bancos" image={heroImg} id="comparativo" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 p-4 border-b border-white/[0.06]">Critério</th>
                    <th className="text-left text-[10px] font-mono uppercase tracking-[0.3em] text-orange-400 p-4 border-b border-white/[0.06]">Payoneer</th>
                    <th className="text-left text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400 p-4 border-b border-white/[0.06]">Wise</th>
                    <th className="text-left text-[10px] font-mono uppercase tracking-[0.3em] text-stone-600 p-4 border-b border-white/[0.06]">Banco BR</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {COMPARE.map((row, i) => (
                    <motion.tr key={i} variants={staggerChild} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-stone-400 font-medium">{row.criterion}</td>
                      <td className="p-4 text-white">{row.payoneer}</td>
                      <td className="p-4 text-white">{row.wise}</td>
                      <td className="p-4 text-stone-500">{row.bank}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </ScrollSection>

        {/* CH04 — PRÓS E CONTRAS */}
        <ChapterKickoff number="04" title="Prós e Contras" image={appImg} id="pros-contras" isOdd={false} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={staggerChild} className="border border-emerald-500/20 bg-emerald-500/[0.03] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6"><CheckCircle className="w-5 h-5 text-emerald-500" /><h3 className="text-2xl font-bold text-emerald-400 uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Vantagens</h3></div>
                <ul className="space-y-4">{PROS.map((pro, i) => (<li key={i} className="flex gap-3 text-sm text-stone-400 leading-relaxed"><span className="text-emerald-500 mt-1 shrink-0">+</span> {pro}</li>))}</ul>
              </motion.div>
              <motion.div variants={staggerChild} className="border border-rose-500/20 bg-rose-500/[0.03] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6"><XCircle className="w-5 h-5 text-rose-500" /><h3 className="text-2xl font-bold text-rose-400 uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Desvantagens</h3></div>
                <ul className="space-y-4">{CONS.map((con, i) => (<li key={i} className="flex gap-3 text-sm text-stone-400 leading-relaxed"><span className="text-rose-500 mt-1 shrink-0">!</span> {con}</li>))}</ul>
              </motion.div>
            </div>
            <motion.div variants={staggerChild} className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 md:p-8 flex gap-4 items-start">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-400 text-sm mb-2 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Aviso sobre Marketplaces</h4>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Se você recebe exclusivamente de marketplaces como Amazon ou Fiverr, a Payoneer é provavelmente a melhor opção.
                  Para transferências pessoais, a Wise tem melhor câmbio.
                  <strong className="text-stone-200"> Use cada ferramenta para o que foi desenhada.</strong>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* CH05 — VEREDICTO */}
        <ChapterKickoff number="05" title="Veredicto Final" image={heroImg} id="veredicto" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <motion.div variants={staggerChild} className="border border-orange-500/20 bg-orange-500/[0.03] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-orange-400 uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Para quem serve</h3>
                <ul className="space-y-3">{VERDICT_FOR.map((item, i) => (<li key={i} className="flex gap-3 text-sm text-stone-400"><ChevronRight className="w-4 h-4 text-orange-500/60 shrink-0 mt-0.5" />{item}</li>))}</ul>
              </motion.div>
              <motion.div variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-stone-500 uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Para quem não serve</h3>
                <ul className="space-y-3">{VERDICT_AGAINST.map((item, i) => (<li key={i} className="flex gap-3 text-sm text-stone-500"><Lock className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />{item}</li>))}</ul>
              </motion.div>
            </div>
            {/* CTA */}
            <motion.div variants={staggerChild} className="relative overflow-hidden rounded-3xl border border-orange-500/30 p-10 md:p-14"
              style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(255,255,255,0.02), transparent)' }}>
              <div className="absolute top-6 right-6 w-3 h-3"><span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-40" /><span className="relative block w-3 h-3 rounded-full bg-orange-500" /></div>
              <div className="flex items-center gap-3 mb-4"><Send className="w-5 h-5 text-orange-500" /><span className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-500/80">Receba pagamentos globais</span></div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-4 leading-[0.95] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Abra sua conta<br /><span className="text-orange-400">Payoneer</span>
              </h2>
              <p className="text-stone-400 text-base leading-relaxed max-w-xl mb-8">
                Crie sua conta e comece a receber de clientes e marketplaces internacionais com dados bancários locais. Abertura 100% online, sem mensalidade.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 bg-orange-600 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">Criar conta Payoneer</span><ExternalLink size={14} className="relative" />
                </a>
                <Link to="/soberania-financeira/contas-internacionais/wise" className="inline-flex items-center gap-2 border border-white/[0.08] text-stone-400 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors">Comparar com Wise</Link>
              </div>
            </motion.div>
            <motion.div variants={staggerChild} className="mt-10 border border-white/[0.06] bg-white/[0.02] rounded-2xl p-10 md:p-14 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase mb-4 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Fintech não é <span className="text-destructive">soberania</span></h2>
              <p className="text-stone-400 text-base max-w-2xl mx-auto leading-relaxed mb-8">A Payoneer é poderosa para receber pagamentos internacionais, mas reporta via CRS, exige KYC e pode bloquear contas. Para proteção real, Bitcoin com custódia própria.</p>
              <Link to="/bitcoin" className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] text-white font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-white/[0.08] transition-all">Explorar protocolo Bitcoin <ChevronRight size={14} /></Link>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* CH06 — FAQ */}
        <ChapterKickoff number="06" title="Perguntas Frequentes" image={appImg} id="faq" isOdd={false} />
        <ScrollSection className="max-w-3xl mx-auto px-6 py-16 md:py-20 pb-32" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl border border-orange-500/20 bg-orange-500/5 flex items-center justify-center"><HelpCircle className="w-5 h-5 text-orange-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-500/60">FAQ · SEO otimizado</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dúvidas sobre a Payoneer</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-orange-500/30 via-white/[0.06] to-transparent mb-8" />
            </motion.div>
            <motion.div variants={staggerChild}>
              <Accordion type="single" collapsible className="space-y-3">
                {FAQ_DATA.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-white/[0.06] rounded-xl bg-white/[0.02] px-6 data-[state=open]:border-orange-500/20 transition-colors duration-300">
                    <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:no-underline py-5 text-stone-200">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-stone-400 text-sm md:text-base leading-relaxed pb-6">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </ScrollSection>

        <footer className="max-w-5xl mx-auto px-6 pb-16"><div className="pt-12 border-t border-white/[0.04] text-center"><p className="text-stone-600 text-[9px] font-black tracking-[0.5em] uppercase font-mono">Análise independente · Lord Junnior © 2026</p></div></footer>
      </div>
    </>
  );
}
