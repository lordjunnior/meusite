import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence, useSpring } from 'framer-motion';
import {
  Shield, ChevronRight, AlertTriangle, Lock, Building2,
  CheckCircle, XCircle, ExternalLink, ChevronDown,
  CreditCard, Globe, ArrowRightLeft, DollarSign, TrendingUp, Send,
  Check, X, HelpCircle, Zap,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import NobelVFX from '@/components/NobelVFX';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import heroImg from '@/assets/wise-hero.webp';
import appImg from '@/assets/wise-app.webp';
import BackToHome from '@/components/BackToHome';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const staggerChild = { hidden: { opacity: 0, y: 25, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } } };
const AFFILIATE_LINK = 'https://wise.com/invite/ihpn/joaob1972?utm_source=ios-pill-hp-nativeshare&utm_medium=invite&utm_campaign=&utm_content=&referralCode=joaob1972';

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
              className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-400/70 mb-4 relative z-10">Capítulo {number}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white relative z-10 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</motion.h2>
            <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="h-px w-40 mx-auto mt-8 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent origin-center relative z-10" />
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
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left" style={{ scaleX, background: 'linear-gradient(90deg, rgba(16,185,129,0.8), rgba(52,211,153,1), rgba(234,179,8,0.9))' }} />;
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
              <span className={`block transition-all duration-400 rounded-full ${active === c.id ? 'w-3 h-3 bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'w-2 h-2 bg-stone-600'}`} />
              <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-400 ${active === c.id ? 'text-emerald-400' : 'text-stone-600'}`}>{c.num} · {c.label}</span>
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

/* ═══ DATA ═══ */
const SPECS = [
  { label: 'Tipo', value: 'Fintech Regulada', icon: Building2 },
  { label: 'Sede', value: 'Londres, UK', icon: Globe },
  { label: 'Moedas', value: '40+ moedas', icon: DollarSign },
  { label: 'Cartão', value: 'Visa Debit', icon: CreditCard },
  { label: 'Taxa de câmbio', value: 'Mid-market (real)', icon: ArrowRightLeft },
  { label: 'Listada em bolsa', value: 'LSE (WISE)', icon: TrendingUp },
];
const FEATURES = [
  { step: '01', title: 'Conta Multi-Moeda', desc: 'Mantenha saldos em 40+ moedas. Dados bancários locais nos EUA (routing number), Europa (IBAN), UK (sort code) e outros 7+ países.' },
  { step: '02', title: 'Câmbio Real (Mid-Market)', desc: 'Usa a taxa mid-market — a mesma do Google. Sem spread oculto. Você paga apenas uma taxa fixa transparente.' },
  { step: '03', title: 'Cartão Visa Internacional', desc: 'Cartão físico e virtual Visa Debit aceito em 200+ países. Conversão automática na taxa real, sem IOF.' },
  { step: '04', title: 'Transferências Rápidas', desc: 'Envie para 80+ países com custo até 8x menor que bancos. Chegam em minutos ou poucas horas.' },
];
const PROS = [
  'Taxa de câmbio mid-market real — sem spread oculto como bancos tradicionais',
  'Suporta mais de 40 moedas com contas locais em 10+ países',
  'Dados bancários locais: routing number nos EUA, IBAN na Europa',
  'Transferências internacionais com custo até 8x menor que bancos',
  'Cartão Visa debit aceito globalmente com conversão automática no câmbio real',
  'Empresa listada na London Stock Exchange (LSE) — transparência regulatória total',
  'App extremamente intuitivo e em português',
  'Conversão instantânea entre moedas dentro do app',
  'Abertura 100% online em minutos — sem burocracia',
  'Notificações em tempo real de cada transação e conversão',
];
const CONS = [
  'Exige verificação KYC completa — CPF, documento e selfie obrigatórios',
  'Não é banco real — é uma EMI, sem seguro de depósito bancário tradicional',
  'Limite de saque em caixas eletrônicos (2 saques grátis por mês)',
  'Contas podem ser bloqueadas sem aviso prévio (risco de fintechs)',
  'Reporta para autoridades fiscais via CRS (Common Reporting Standard)',
  'Não suporta compra direta de Bitcoin ou criptomoedas',
  'Não oferece investimentos, renda fixa ou ações',
  'Pode solicitar comprovação de origem de fundos a qualquer momento',
  'Não é crypto friendly — transferências para exchanges podem ser bloqueadas',
];
const COMPARE = [
  { title: 'Câmbio', wise: 'Taxa mid-market real (Google rate)', bank: 'Spread de 2-5% sobre câmbio comercial' },
  { title: 'Taxa por transferência', wise: '0.3% a 2% fixo e transparente', bank: 'R$ 80-250 por SWIFT + spread' },
  { title: 'Velocidade', wise: 'Minutos a horas (maioria)', bank: '2-5 dias úteis via SWIFT' },
  { title: 'IOF em gastos no exterior', wise: '0% (cartão Visa Debit)', bank: '6.38% (cartão de crédito)' },
  { title: 'Dados bancários locais', wise: 'EUA, Europa, UK, Austrália + 6', bank: 'Apenas no país de origem' },
  { title: 'Abertura de conta', wise: 'Online, 10 minutos', bank: 'Presencial, 1-5 dias' },
];
const FAQ_DATA = [
  { q: 'O que é a Wise e como ela funciona?', a: 'A Wise (antiga TransferWise) é uma fintech britânica especializada em transferências internacionais e conta multi-moeda. Utiliza a taxa mid-market real e cobra apenas uma taxa fixa transparente por operação.' },
  { q: 'Wise é segura? Posso confiar meu dinheiro?', a: 'Regulada pelo FCA no Reino Unido e listada na London Stock Exchange. É uma EMI — o dinheiro fica em contas segregadas, mas sem o mesmo seguro de depósito bancário.' },
  { q: 'Posso receber pagamentos em dólar com dados bancários americanos?', a: 'Sim. Fornece ACH routing number e account number nos EUA, permitindo receber como se tivesse conta americana. Ideal para freelancers.' },
  { q: 'A Wise reporta para a Receita Federal do Brasil?', a: 'Sim. Cumpre o CRS e reporta informações financeiras para as autoridades fiscais dos países onde os titulares residem.' },
  { q: 'Posso usar a Wise para comprar Bitcoin?', a: 'Não diretamente. Transferências para exchanges podem ser bloqueadas. Para operações cripto, use a Wise apenas como ponte bancária.' },
  { q: 'Qual a diferença entre Wise e Bank of Georgia?', a: 'Wise é fintech para transferências rápidas e baratas. BOG é banco real com agências, seguro de depósito e limites maiores. Wise para dia a dia; BOG para diversificação estrutural.' },
  { q: 'Quanto custa manter uma conta Wise?', a: 'Conta gratuita. Paga apenas quando faz conversões (0.3-2%). Cartão físico tem taxa única. 2 saques grátis por mês em ATMs.' },
  { q: 'Wise é melhor que banco para enviar dinheiro ao exterior?', a: 'Para transferências sim. Bancos cobram spread de 2-5% + SWIFT de R$80-250. A Wise cobra 0.3-2% na taxa real.' },
  { q: 'Posso usar o cartão Wise no Brasil?', a: 'Sim. Funciona em qualquer Visa. No exterior converte na taxa mid-market. Sem IOF de cartão de crédito (6.38%).' },
  { q: 'Wise é boa para soberania financeira?', a: 'Excelente ferramenta tática para diversificação. Mas não é soberania: exige KYC, reporta CRS e pode bloquear contas. Complementa, não substitui, autocustódia de Bitcoin.' },
];
const VERDICT_FOR = [
  'Freelancers e nômades digitais que recebem em moeda estrangeira',
  'Quem faz transferências internacionais frequentes',
  'Quem precisa de dados bancários locais nos EUA, Europa ou UK',
  'Quem viaja e quer um cartão com câmbio real sem IOF',
  'Quem está começando a diversificação internacional',
];
const VERDICT_AGAINST = [
  'Quem busca privacidade total (Wise reporta via CRS)',
  'Quem quer movimentar volumes muito altos',
  'Quem precisa de um banco real com seguro de depósito',
  'Quem opera exclusivamente com cripto',
];

export default function Wise() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <Helmet>
        <title>Wise (TransferWise): Conta Multi-Moeda Internacional — Análise Completa 2026 | Lord Junnior</title>
        <meta name="description" content="Análise completa da Wise: conta multi-moeda com câmbio real mid-market, cartão Visa internacional, dados bancários em 10+ países." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/contas-internacionais/wise" />
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: 'Wise: Conta Multi-Moeda Internacional — Análise Completa 2026', author: { '@type': 'Person', name: 'Lord Junnior' }, datePublished: '2026-03-07' })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_DATA.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br/' },
          { '@type': 'ListItem', position: 2, name: 'Soberania Financeira', item: 'https://lordjunnior.com.br/soberania-financeira' },
          { '@type': 'ListItem', position: 3, name: 'Wise', item: 'https://lordjunnior.com.br/soberania-financeira/contas-internacionais/wise' },
        ] })}</script>
      </Helmet>
      <ScrollToTop />
      <ReadingProgressBar />
      <FloatingToc />

      <div className="min-h-screen bg-[#050808] text-stone-200">
        <NobelVFX accentColor="emerald" />


        {/* HERO */}
        <div ref={heroRef} className="relative h-[90vh] min-h-[650px] max-h-[950px] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
            <div className="absolute inset-0 scale-110"><img src={heroImg} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.25) saturate(0.7)' }} loading="eager" fetchPriority="high" decoding="async" /></div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.05) 0%, rgba(5,8,8,0.4) 35%, rgba(5,8,8,0.88) 65%, #050808 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 130% 100% at 50% 15%, transparent 25%, rgba(5,8,8,0.92) 100%)' }} />
          </motion.div>
          <motion.div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24" style={{ opacity: heroOpacity }}>
            <Link to="/soberania-financeira" className="inline-flex items-center gap-2 text-stone-500 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-10">
              <ChevronRight size={14} className="rotate-180" /> Soberania Financeira
            </Link>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mb-5">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-400/70">REVIEW EDITORIAL · FINTECH REGULADA</span>
            </motion.div>
            <div className="flex items-start gap-5 mb-6">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shrink-0 backdrop-blur-sm">
                <Send className="text-emerald-400" size={30} />
              </motion.div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                  className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.92]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Wise<br /><span className="text-emerald-400">Análise Completa</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                  className="text-stone-400 text-sm md:text-base lg:text-lg leading-relaxed mt-5 max-w-2xl">
                  A fintech que matou o spread bancário. Conta multi-moeda com câmbio real,
                  dados bancários locais em 10+ países e um cartão que funciona no mundo inteiro sem IOF.
                </motion.p>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="flex flex-wrap gap-3 mt-8">
              <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 rounded-sm">
                <Globe className="w-4 h-4 text-emerald-500" /><span className="text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">40+ moedas · Câmbio real</span>
              </div>
              <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-2 rounded-sm">
                <TrendingUp className="w-4 h-4 text-primary" /><span className="text-primary text-xs font-bold uppercase tracking-wider font-mono">Listada na LSE</span>
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
        <ChapterKickoff number="01" title="Wise e contas internacionais: até onde vai a privacidade" image={appImg} id="ficha-tecnica" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SPECS.map((spec, i) => { const Icon = spec.icon; return (
                <motion.div key={i} variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all duration-500">
                  <Icon className="w-5 h-5 text-emerald-500/60 mb-3" />
                  <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{spec.value}</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500">{spec.label}</p>
                </motion.div>
              ); })}
            </div>
          </motion.div>
        </ScrollSection>

        {/* CH02 — FUNCIONALIDADES */}
        <ChapterKickoff number="02" title="O que a Wise entrega, e quais dados ela guarda de você" image={heroImg} id="funcionalidades" isOdd={false} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 md:row-span-2 flex items-center justify-center">
                <img src={appImg} alt="Wise App" className="w-full max-w-xs rounded-xl opacity-90" loading="lazy" decoding="async" />
              </motion.div>
              {FEATURES.map((item, i) => (
                <motion.div key={i} variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 hover:border-emerald-500/20 transition-colors duration-500">
                  <span className="text-emerald-500/30 text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.step}</span>
                  <h3 className="font-bold text-white text-lg mt-2 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollSection>

        {/* CH03 — COMPARATIVO */}
        <ChapterKickoff number="03" title="Wise ou banco tradicional: quem rastreia menos o seu dinheiro" image={heroImg} id="comparativo" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {COMPARE.map((row, i) => (
                <motion.div key={i} variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-3">{row.title}</p>
                  <div className="space-y-3">
                    <div className="flex gap-2 items-start"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><p className="text-sm text-white">{row.wise}</p></div>
                    <div className="flex gap-2 items-start"><X className="w-4 h-4 text-rose-500/60 shrink-0 mt-0.5" /><p className="text-sm text-stone-500">{row.bank}</p></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollSection>

        {/* CH04 — PRÓS E CONTRAS */}
        <ChapterKickoff number="04" title="Ganhos de eficiência e o preço em exposição de dados" image={appImg} id="pros-contras" isOdd={false} />
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
                <h4 className="font-bold text-amber-400 text-sm mb-2 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Aviso de Privacidade</h4>
                <p className="text-stone-400 text-sm leading-relaxed">
                  A Wise cumpre o CRS e reporta automaticamente para autoridades fiscais. Seus saldos e movimentações são visíveis pela Receita Federal.
                  <strong className="text-stone-200"> Para privacidade, a Wise é ferramenta tática, não solução de soberania.</strong>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* CH05 — VEREDICTO */}
        <ChapterKickoff number="05" title="Veredicto: ferramenta tática, custódia de terceiro" image={heroImg} id="veredicto" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <motion.div variants={staggerChild} className="border border-emerald-500/20 bg-emerald-500/[0.03] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-emerald-400 uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Para quem serve</h3>
                <ul className="space-y-3">{VERDICT_FOR.map((item, i) => (<li key={i} className="flex gap-3 text-sm text-stone-400"><ChevronRight className="w-4 h-4 text-emerald-500/60 shrink-0 mt-0.5" />{item}</li>))}</ul>
              </motion.div>
              <motion.div variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-stone-500 uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Para quem não serve</h3>
                <ul className="space-y-3">{VERDICT_AGAINST.map((item, i) => (<li key={i} className="flex gap-3 text-sm text-stone-500"><Lock className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />{item}</li>))}</ul>
              </motion.div>
            </div>
            {/* CTA */}
            <motion.div variants={staggerChild} className="relative overflow-hidden rounded-3xl border border-emerald-500/30 p-10 md:p-14"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(255,255,255,0.02), transparent)' }}>
              <div className="absolute top-6 right-6 w-3 h-3"><span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-40" /><span className="relative block w-3 h-3 rounded-full bg-emerald-500" /></div>
              <div className="flex items-center gap-3 mb-4"><Zap className="w-5 h-5 text-emerald-500" /><span className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500/80">Convite exclusivo</span></div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-4 leading-[0.95] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Abra sua conta Wise<br /><span className="text-emerald-400">com link de convite</span>
              </h2>
              <p className="text-stone-400 text-base leading-relaxed max-w-xl mb-8">
                Crie sua conta Wise usando o link exclusivo. Abertura 100% online em menos de 10 minutos. Sua primeira transferência pode sair sem taxa.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 bg-emerald-600 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">Criar conta Wise</span><ExternalLink size={14} className="relative" />
                </a>
                <Link to="/soberania-financeira/contas-internacionais/bank-of-georgia" className="inline-flex items-center gap-2 border border-white/[0.08] text-stone-400 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors">Ver Bank of Georgia</Link>
              </div>
            </motion.div>
            <motion.div variants={staggerChild} className="mt-10 border border-white/[0.06] bg-white/[0.02] rounded-2xl p-10 md:p-14 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase mb-4 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Fintech não é <span className="text-destructive">soberania</span></h2>
              <p className="text-stone-400 text-base max-w-2xl mx-auto leading-relaxed mb-8">A Wise é excelente para transferências e diversificação cambial, mas reporta, exige KYC e pode bloquear contas. Para proteção real, Bitcoin com custódia própria.</p>
              <Link to="/bitcoin" className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] text-white font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-white/[0.08] transition-all">Explorar protocolo Bitcoin <ChevronRight size={14} /></Link>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* CH06 — FAQ */}
        <ChapterKickoff number="06" title="Privacidade, reporte e limites: perguntas frequentes" image={appImg} id="faq" isOdd={false} />
        <ScrollSection className="max-w-3xl mx-auto px-6 py-16 md:py-20 pb-32" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center"><HelpCircle className="w-5 h-5 text-emerald-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500/60">FAQ · SEO otimizado</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dúvidas sobre a Wise</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-emerald-500/30 via-white/[0.06] to-transparent mb-8" />
            </motion.div>
            <motion.div variants={staggerChild}>
              <Accordion type="single" collapsible className="space-y-3">
                {FAQ_DATA.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-white/[0.06] rounded-xl bg-white/[0.02] px-6 data-[state=open]:border-emerald-500/20 transition-colors duration-300">
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
