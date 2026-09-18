import PageFloatingToc from "@/components/PageFloatingToc";
import ContraAtaquePratico from '@/components/ContraAtaquePratico';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import {
  Shield, ChevronRight, AlertTriangle, Lock, Eye, EyeOff,
  CheckCircle, XCircle, ExternalLink, ChevronDown,
  CreditCard, Globe, Smartphone, DollarSign, TrendingUp,
  Check, X, HelpCircle, Zap, AlertOctagon, Star,
  FileText, Scale, Landmark, Banknote, ShieldAlert,
  Calendar, ArrowRight, BookOpen, Coins,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import heroImg from '@/assets/depix-hero.webp';
import dinheiroVivoImg from '@/assets/depix-dinheiro-vivo.webp';
import brasilParaguaiImg from '@/assets/offshore-brasil-paraguai.webp';
import BackToHome from '@/components/BackToHome';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const staggerChild = { hidden: { opacity: 0, y: 25, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } } };

/* ═══ CHAPTER KICKOFF ═══ */
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
              className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-400/70 mb-4 relative z-10">Capitulo {number}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white relative z-10 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</motion.h2>
            <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="h-px w-40 mx-auto mt-8 bg-gradient-to-r from-transparent via-red-500/50 to-transparent origin-center relative z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollSection = ({ children, className, isOdd }: { children: React.ReactNode; className?: string; isOdd: boolean }) => (
  <div style={{ background: isOdd ? '#050808' : '#070b0b' }}><div className={className}>{children}</div></div>
);

/* ═══ DATA ═══ */
const DEPIX_SPECS = [
  { label: 'Ativo', value: 'DePix (stablecoin de Real)', icon: Coins },
  { label: 'Paridade', value: '1:1 com BRL', icon: DollarSign },
  { label: 'Rede', value: 'Liquid Network (Bitcoin)', icon: Globe },
  { label: 'Privacidade', value: 'Transacoes confidenciais (valor e ativo ocultos)', icon: EyeOff },
  { label: 'Regulamentacao', value: 'Reporte obrigatorio a partir de junho/2026', icon: FileText },
  { label: 'Fonte oficial', value: 'Banco Central do Brasil', icon: Landmark },
];

const TIMELINE = [
  { date: 'Ate 2025', title: 'Sem reporte obrigatorio', desc: 'Plataformas DePix operavam sem obrigacao formal de reportar transacoes ao governo brasileiro. Usuarios compravam e vendiam DePix via PIX sem que a Receita Federal tivesse acesso direto a essas informacoes.', status: 'past' },
  { date: 'Jun 2026', title: 'Reporte obrigatorio entra em vigor', desc: 'Novas regulamentacoes do Banco Central obrigam todas as plataformas que operam com ativos digitais no Brasil — incluindo as que utilizam DePix — a reportar clientes e transacoes. Plataformas listadas em Apple Store e Google Play deverao se adequar integralmente.', status: 'current' },
  { date: '2026+', title: 'Imposto de Renda reflete DePix', desc: 'O ativo DePix aparecera na declaracao de IR como ativo digital. Embora vender DePix (stablecoin de real) nao gere fato gerador de lucro por si so, o patrimonio acumulado ficara visivel para a Receita Federal.', status: 'future' },
  { date: '2027?', title: 'Imposto sobre patrimonio?', desc: 'Se um imposto sobre patrimonio for aprovado (cenario plausivel em caso de reeleicao do atual governo), qualquer valor declarado — incluindo DePix — sera tributado anualmente. Um patrimonio de R$ 200.000 geraria R$ 2.000/ano com aliquota de 1%.', status: 'future' },
];

const RISKS = [
  { icon: AlertTriangle, title: 'Ponto unico de falha', desc: 'Plataformas que dependem exclusivamente do DePix tem vulnerabilidade regulatoria extrema. Se o governo alterar regras sobre stablecoins de real na rede Liquid, todo o modelo de negocio colapsa. Voce confia na empresa, na rede Liquid, no PEG, e que as regras nao mudem — sao muitas camadas de confianca.' },
  { icon: Scale, title: 'IOF sobre criptomoedas aprovado', desc: 'A nova regra de IOF sobre ativos digitais foi aprovada. Embora muitos dissessem que a regra de R$ 35.000/R$ 1.000 nao passaria, ela foi sim aprovada. Isso impacta diretamente transacoes envolvendo DePix e qualquer conversao para outros ativos.' },
  { icon: Landmark, title: 'Imposto sobre patrimonio', desc: 'Em cenario de reeleicao do governo atual, existe alta probabilidade de criacao de imposto sobre patrimonio. Com DePix declarado, seu patrimonio acumulado sera tributado: 1% ao ano sobre R$ 1.000.000 = R$ 10.000/ano. Patrimonio visivel e patrimonio tributavel.' },
];

const ALTERNATIVES = [
  { name: 'Spike to Spike', type: 'P2P com dinheiro vivo', desc: 'Plataforma que ainda permite comprar Bitcoin com dinheiro fisico. Sem KYC, sem PIX, sem rastro digital. Funciona com encontros presenciais ou depositos em especie. Existem regras especificas para operar — consulte o tutorial.', link: 'https://spiketospike.com/', score: 'Dinheiro vivo' },
  { name: 'Bisq', type: 'Exchange descentralizada', desc: 'Exchange 100% descentralizada e open-source. Sem servidores centrais, sem cadastro, opera via rede Tor. Aceita diversos metodos de pagamento P2P.', link: '#', score: 'Descentralizada' },
  { name: 'RoboSats', type: 'Lightning P2P', desc: 'Troca de Bitcoin via Lightning Network com identidades temporarias. Sem cadastro, sem KYC, transacoes rapidas e privadas via Tor.', link: '#', score: 'Lightning' },
];

const FAQ_DATA = [
  { q: 'O que e o DePix?', a: 'O DePix e uma stablecoin pareada 1:1 com o real brasileiro, operando na rede Liquid do Bitcoin. Sua principal vantagem e que transacoes na Liquid sao confidenciais — o valor e o ativo transacionado ficam ocultos na blockchain, permitindo trocar DePix por Bitcoin, USDT ou outros ativos sem que terceiros saibam os detalhes.' },
  { q: 'DePix vai ser reportado em 2026?', a: 'Sim. A partir de junho de 2026, todas as plataformas que operam com ativos digitais no Brasil — incluindo aquelas que utilizam DePix — serao obrigadas a reportar transacoes e clientes a Receita Federal, conforme regulamentacao do Banco Central.' },
  { q: 'Vender DePix gera imposto?', a: 'Vender DePix por si so nao gera fato gerador de lucro, pois e uma stablecoin pareada ao real. Voce nao esta "ganhando" nada ao converter de volta para reais. Porem, o patrimonio acumulado em DePix ficara declarado e visivel para a Receita Federal.' },
  { q: 'O que acontece se criarem imposto sobre patrimonio?', a: 'Se um imposto sobre patrimonio for aprovado, qualquer valor declarado sera tributado anualmente. Exemplo: patrimonio de R$ 500.000 com aliquota de 1% = R$ 5.000/ano. Como o DePix estara declarado no IR, esse valor entra na base de calculo.' },
  { q: 'Qual a alternativa ao DePix com mais privacidade?', a: 'Comprar Bitcoin diretamente com dinheiro vivo em plataformas P2P como Spike to Spike. Esse metodo nao envolve PIX, nao gera registro digital e nao esta sujeito as novas regras de reporte. Existem regras especificas para operar dessa forma.' },
  { q: 'A rede Liquid e privada?', a: 'Sim, parcialmente. A rede Liquid oferece "confidential transactions" — o valor e o tipo de ativo transacionado ficam ocultos. Porem, a entrada e saida da rede (compra de DePix via PIX) pode ser rastreada se a plataforma reportar ao governo.' },
  { q: 'A cedula paraguaia ajuda nesse cenario?', a: 'Sim. A cedula paraguaia permite operar internacionalmente sem vincular ao CPF brasileiro. O Paraguai nao participa de acordos automaticos de reporte de informacoes (CRS), o que confere uma camada adicional de privacidade.' },
  { q: 'Ainda vale usar DePix?', a: 'Para algumas pessoas, pode ser uma estrategia complementar — especialmente para transacoes de baixo valor ou como ponte temporaria. Porem, depender exclusivamente do DePix como metodo de privacidade financeira nao e mais recomendavel apos as novas regulamentacoes de 2026.' },
  { q: 'O IOF sobre criptomoedas ja foi aprovado?', a: 'Sim. A nova regra de IOF foi aprovada e afeta transacoes com ativos digitais, incluindo conversoes entre criptomoedas e stablecoins. Os detalhes de implementacao estao sendo definidos, mas o impacto sobre operacoes com DePix e direto.' },
];

/* ═══ COMPONENT ═══ */

const TOC_ITEMS = [
  { id: "depix", label: "O Que é o DePix" },
  { id: "timeline", label: "Timeline" },
  { id: "riscos", label: "Os 3 Riscos" },
  { id: "alternativas", label: "Alternativas" },
  { id: "cedula", label: "Cédula Paraguaia" },
  { id: "faq", label: "FAQ" },
];

export default function DepixReporte() {
  const [scrolled, setScrolled] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useMotionValueEvent(scrollYProgress, 'change', v => setScrolled(v > 0.05));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'DePix vai reportar transacoes em 2026? Analise completa',
    description: 'Analise detalhada sobre as novas regulamentacoes de reporte de DePix em 2026, riscos de imposto sobre patrimonio e alternativas com privacidade.',
    author: { '@type': 'Person', name: 'Lord Junnior' },
    datePublished: '2026-03-08',
  };

  return (
    <>
      <Helmet>
        <title>DePix vai Reportar Transacoes em 2026? Analise Completa | Lord Junnior</title>
        <meta name="description" content="Plataformas DePix comecam a reportar transacoes em junho de 2026. Entenda os riscos, o impacto no IR, o IOF aprovado e as alternativas com privacidade como Spike to Spike." />
        <meta property="og:title" content="DePix vai Reportar Transacoes em 2026?" />
        <meta property="og:description" content="Analise completa sobre o reporte de DePix, riscos de imposto sobre patrimonio e como comprar Bitcoin com dinheiro vivo." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/alertas/depix-reporte-2026" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="amber" />
      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
      <LeadCaptureModal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} interesse="assessoria-cedula-paraguaia-depix" />

      <div className="min-h-screen" style={{ background: '#050808' }}>

        {/* ═══ NAVIGATION BAR ═══ */}
        <AnimatePresence>
          {scrolled && (
            <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
              className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(5,8,8,0.85)', backdropFilter: 'blur(20px) saturate(1.5)' }}>
              <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                <Link to="/alertas" className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-xs font-bold tracking-wider uppercase">
                  <ChevronRight size={12} className="rotate-180" /> Alertas
                </Link>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500/60 font-mono">DePix 2026</span>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* ═══ HERO ═══ */}
        <div ref={heroRef} className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroImgY, scale: heroImgScale }}>
            <img src={heroImg} alt="DePix reporte 2026 vigilancia financeira" className="w-full h-full object-cover" style={{ filter: 'brightness(0.4) saturate(0.8)' }} loading="eager" fetchPriority="high" decoding="async" />
          </motion.div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, transparent 30%, rgba(5,8,8,0.6) 60%, #050808 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 45%, transparent 30%, rgba(5,8,8,0.9) 100%)' }} />

          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-center">
            <div className="max-w-5xl mx-auto px-6 w-full">
              <motion.div initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }} animate={heroInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 1.2, ease: EASE }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-gradient-to-r from-red-500 to-transparent" />
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase text-red-500/80 font-mono">Alerta Regulatorio</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="text-white">Plataformas DePix</span><br />
                  <span className="text-white">comecam </span>
                  <span className="text-red-400">reportar</span><br />
                  <span className="text-white">transacoes em </span>
                  <span className="text-red-400">2026</span>
                </h1>

                <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                  A partir de <strong className="text-stone-200">junho de 2026</strong>, todas as plataformas que operam com ativos digitais no Brasil serao obrigadas a reportar clientes e transacoes.
                  Isso inclui o <strong className="text-stone-200">DePix</strong>. Entenda os riscos, o impacto no seu IR e as alternativas com privacidade real.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href="https://www.bcb.gov.br/detalhenoticia/20930/noticia" target="_blank" rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 bg-red-500/15 border border-red-500/40 text-red-200 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                    <span className="absolute inset-0 bg-red-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative">Nota oficial do BC</span><ExternalLink size={14} className="relative" />
                  </a>
                  <a href="#timeline"
                    className="inline-flex items-center gap-2 border border-white/[0.08] text-stone-400 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors">
                    Ver timeline <ChevronDown size={14} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ═══ SOVEREIGN DISCLAIMER ═══ */}
        <div className="px-6 md:px-12 lg:px-20">
          <SovereignDisclaimer variant="surveillance" />
        </div>

        {/* ═══ CH01 — O QUE E DEPIX ═══ */}
        <ChapterKickoff number="01" title="O que e o DePix" image={heroImg} id="depix" isOdd />
        <ScrollSection isOdd className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-12">
              O <strong className="text-stone-200">DePix</strong> e uma stablecoin pareada 1:1 com o real brasileiro, operando na <strong className="text-stone-200">rede Liquid do Bitcoin</strong>. Muita gente chama de derivativo, mas na pratica funciona como uma stablecoin de real. O objetivo e manter paridade com o BRL, permitindo que voce opere no ecossistema cripto sem se expor a volatilidade do Bitcoin.
            </motion.p>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              A grande vantagem da rede Liquid e que ela oferece <strong className="text-stone-200">transacoes confidenciais</strong> — as transacoes sao publicas, mas o <strong className="text-red-300">valor transacionado</strong> e o <strong className="text-red-300">ativo transacionado</strong> ficam ocultos. Isso permite trocar DePix por Bitcoin, USDT ou outros ativos na Liquid sem que ninguem saiba os detalhes. E exatamente essa privacidade que atrai usuarios — e que agora esta na mira do governo.
            </motion.p>

            {/* Specs Grid */}
            <motion.div variants={staggerChild} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEPIX_SPECS.map((s, i) => (
                <div key={i} className="group border border-white/[0.06] rounded-xl p-5 hover:border-red-500/20 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.08)' }}>
                      <s.icon size={18} className="text-red-400/70" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-1">{s.label}</p>
                      <p className="text-sm text-stone-300 leading-relaxed">{s.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH02 — TIMELINE ═══ */}
        <ChapterKickoff number="02" title="Timeline do Reporte" image={heroImg} id="timeline" isOdd={false} />
        <ScrollSection isOdd={false} className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              O que acontecia ate agora: muita gente comprava DePix via PIX sem que ficasse declarado. A partir de <strong className="text-red-300">junho de 2026</strong>, isso muda completamente.
              Para seguir as normas do governo brasileiro, todas as plataformas que utilizam DePix vao ter que declarar seus clientes — de forma direta ou indireta.
            </motion.p>

            <div className="relative">
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/40 via-red-500/20 to-transparent" />
              {TIMELINE.map((t, i) => (
                <motion.div key={i} variants={staggerChild} className="relative pl-16 md:pl-20 pb-12 last:pb-0">
                  <div className={`absolute left-4 md:left-6 w-4 h-4 rounded-full border-2 ${
                    t.status === 'past' ? 'border-stone-600 bg-stone-800' :
                    t.status === 'current' ? 'border-red-500 bg-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.4)]' :
                    'border-stone-600/50 bg-transparent'
                  }`} />
                  <div className="border border-white/[0.06] rounded-xl p-6" style={{ background: t.status === 'current' ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar size={14} className={t.status === 'current' ? 'text-red-400' : 'text-stone-500'} />
                      <span className={`text-xs font-bold tracking-wider uppercase ${t.status === 'current' ? 'text-red-400' : 'text-stone-500'}`}>{t.date}</span>
                      {t.status === 'current' && <span className="text-[9px] font-bold tracking-wider uppercase bg-red-500/20 text-red-300 px-2 py-0.5 rounded">AGORA</span>}
                    </div>
                    <h3 className="text-lg font-bold text-stone-200 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.title}</h3>
                    <p className="text-sm text-stone-400 leading-relaxed">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH03 — 3 RISCOS ═══ */}
        <ChapterKickoff number="03" title="Os 3 Riscos que Ninguem te Conta" image={heroImg} id="riscos" isOdd />
        <ScrollSection isOdd className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              O problema nao e apenas o reporte em si. Existem <strong className="text-red-300">tres ameacas concretas</strong> que a maioria das pessoas que usa DePix ainda nao percebeu.
              Cada uma delas, isoladamente, ja e grave. Combinadas, representam um risco patrimonial real.
            </motion.p>

            <div className="grid gap-6">
              {RISKS.map((r, i) => (
                <motion.div key={i} variants={staggerChild} className="border border-red-500/10 rounded-xl p-8 relative overflow-hidden" style={{ background: 'rgba(239,68,68,0.03)' }}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-500/5 to-transparent rounded-bl-full" />
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl border border-red-500/20 flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.1)' }}>
                      <r.icon size={22} className="text-red-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-red-500/60 font-mono">Risco {String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="text-xl font-bold text-stone-200 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{r.title}</h3>
                      <p className="text-sm text-stone-400 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Calculo visual */}
            <motion.div variants={staggerChild} className="mt-12 border border-white/[0.06] rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="text-lg font-bold text-stone-200 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Scale size={18} className="inline mr-2 text-red-400" />
                Simulacao: Imposto sobre Patrimonio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { patrimonio: 'R$ 200.000', imposto: 'R$ 2.000/ano', mensal: '~R$ 167/mes' },
                  { patrimonio: 'R$ 500.000', imposto: 'R$ 5.000/ano', mensal: '~R$ 417/mes' },
                  { patrimonio: 'R$ 1.000.000', imposto: 'R$ 10.000/ano', mensal: '~R$ 833/mes' },
                ].map((s, i) => (
                  <div key={i} className="border border-red-500/10 rounded-lg p-5 text-center" style={{ background: 'rgba(239,68,68,0.04)' }}>
                    <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Patrimonio declarado</p>
                    <p className="text-2xl font-black text-stone-200 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.patrimonio}</p>
                    <div className="h-px bg-red-500/10 mb-3" />
                    <p className="text-xs text-stone-500 mb-0.5">Imposto (1% a.a.)</p>
                    <p className="text-lg font-bold text-red-400">{s.imposto}</p>
                    <p className="text-xs text-stone-500 mt-1">{s.mensal}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-stone-500 mt-4 italic">* Simulacao baseada em aliquota hipotetica de 1% ao ano. Cenario plausivel caso imposto sobre patrimonio seja aprovado.</p>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH04 — ALTERNATIVAS ═══ */}
        <ChapterKickoff number="04" title="Alternativas com Privacidade Real" image={dinheiroVivoImg} id="alternativas" isOdd={false} />
        <ScrollSection isOdd={false} className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              Voce <strong className="text-stone-200">nao precisa depender de DePix</strong>. Existem metodos mais raiz — e mais privados — de adquirir Bitcoin. O mais poderoso deles:
              <strong className="text-red-300"> comprar com dinheiro vivo</strong>. Sim, ainda e possivel. Nao envolve PIX, nao gera registro digital e nao esta sujeito as novas regras de reporte.
            </motion.p>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              Pessoas que dizem que "nao da pra comprar Bitcoin com privacidade" ou que "nao da pra gastar cripto sem KYC" estao te mentindo.
              Sao <strong className="text-red-300">armadilhas para libertarios</strong> — vendem o discurso do sistema para te convencer a entregar seus dados.
              Existem cartoes cripto sem nome, sem KYC, que funcionam globalmente. A privacidade financeira ainda existe — para quem sabe onde procurar.
            </motion.p>

            <div className="grid gap-5">
              {ALTERNATIVES.map((alt, i) => (
                <motion.div key={i} variants={staggerChild} className="border border-white/[0.06] rounded-xl p-6 hover:border-emerald-500/20 transition-colors group" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-stone-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{alt.name}</h3>
                        <span className="text-[9px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded">{alt.score}</span>
                      </div>
                      <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">{alt.type}</p>
                      <p className="text-sm text-stone-400 leading-relaxed">{alt.desc}</p>
                    </div>
                    {alt.link !== '#' && (
                      <a href={alt.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg hover:bg-emerald-500/10 transition-colors shrink-0">
                        Acessar <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Internal links */}
            <motion.div variants={staggerChild} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me" className="border border-white/[0.06] rounded-xl p-5 hover:border-amber-500/20 transition-colors group flex items-center gap-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <Shield size={20} className="text-amber-400/60 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-stone-300 group-hover:text-amber-300 transition-colors">KYCNot.me — Guia Completo</p>
                  <p className="text-xs text-stone-500">Todas as plataformas cripto sem KYC</p>
                </div>
                <ArrowRight size={14} className="text-stone-600 group-hover:text-amber-400 transition-colors ml-auto shrink-0" />
              </Link>
              <Link to="/pix-cripto" className="border border-white/[0.06] rounded-xl p-5 hover:border-amber-500/20 transition-colors group flex items-center gap-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <Zap size={20} className="text-amber-400/60 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-stone-300 group-hover:text-amber-300 transition-colors">PIX → Bitcoin com privacidade</p>
                  <p className="text-xs text-stone-500">Tutorial Spike to Spike</p>
                </div>
                <ArrowRight size={14} className="text-stone-600 group-hover:text-amber-400 transition-colors ml-auto shrink-0" />
              </Link>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH05 — CEDULA PARAGUAIA ═══ */}
        <ChapterKickoff number="05" title="O Escudo: Cedula Paraguaia" image={brasilParaguaiImg} id="cedula" isOdd />
        <ScrollSection isOdd className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              Mesmo que o DePix passe a ser reportado, mesmo que o IOF aumente, mesmo que criem imposto sobre patrimonio —
              existe uma camada de protecao que desconecta voce do sistema de reporte brasileiro: a <strong className="text-stone-200">cedula paraguaia de residencia</strong>.
            </motion.p>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              O Paraguai <strong className="text-red-300">nao participa de acordos automaticos de reporte de informacoes</strong> (CRS). Isso significa que contas e operacoes vinculadas a documentacao paraguaia
              nao sao reportadas automaticamente a Receita Federal brasileira. E uma camada juridica legitima de privacidade financeira.
            </motion.p>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              Embora exista a possibilidade do Paraguai aderir a esses acordos no futuro (possivelmente em 2026-2027), hoje essa e uma das poucas jurisdicoes acessiveis que ainda oferecem
              essa protecao — especialmente para brasileiros que desejam operar internacionalmente sem vincular ao CPF.
            </motion.p>

            {/* CTA Assessoria */}
            <motion.div variants={staggerChild} className="relative border border-red-500/20 rounded-2xl overflow-hidden" style={{ background: 'rgba(239,68,68,0.04)' }}>
              <div className="absolute inset-0 overflow-hidden">
                <img src={brasilParaguaiImg} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.15) saturate(0.5)' }} loading="lazy" decoding="async" />
              </div>
              <div className="relative p-8 md:p-12">
                <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-400/60 mb-4">Assessoria Exclusiva</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Quer tirar sua cedula paraguaia?
                </h3>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
                  O processo assessorado inclui cedula paraguaia de residencia + abertura de contas + suporte 1-a-1 do inicio ao fim.
                  Valor a partir de US$ 1.300 pelo processo acelerado — um dos mais acessiveis do mercado. Exclusivo para membros do canal.
                </p>
                <button onClick={() => setLeadModalOpen(true)}
                  className="group relative inline-flex items-center gap-3 bg-red-500/20 border border-red-500/40 text-red-200 font-bold text-sm uppercase tracking-wider px-10 py-5 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                  <span className="absolute inset-0 bg-red-500/10 animate-pulse" />
                  <span className="relative">Quero a assessoria</span>
                  <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH06 — FAQ ═══ */}
        <ChapterKickoff number="06" title="Perguntas Frequentes" image={heroImg} id="faq" isOdd={false} />
        <ScrollSection isOdd={false} className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_DATA.map((faq, i) => (
                <motion.div key={i} variants={staggerChild}>
                  <AccordionItem value={`faq-${i}`} className="border border-white/[0.06] rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <AccordionTrigger className="px-6 py-5 hover:no-underline text-left">
                      <div className="flex items-center gap-3">
                        <HelpCircle size={16} className="text-red-400/60 shrink-0" />
                        <span className="text-sm md:text-base font-semibold text-stone-200">{faq.q}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5">
                      <p className="text-sm text-stone-400 leading-relaxed pl-7">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </ScrollSection>

        <div className="px-6"><ContraAtaquePratico theme="dark" /></div>

        {/* ═══ FOOTER ═══ */}
        <div style={{ background: '#050808' }} className="border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-6 py-16 text-center">
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-stone-600 mb-4">Aviso Legal</p>
            <p className="text-xs text-stone-500 leading-relaxed max-w-2xl mx-auto mb-8">
              Este conteudo e exclusivamente educativo e informativo. Nao constitui aconselhamento financeiro, tributario ou juridico.
              Faca sempre sua propria pesquisa antes de tomar decisoes financeiras. Consulte um contador ou advogado especializado
              para orientacao especifica sobre sua situacao fiscal.
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/alertas" className="text-xs text-stone-600 hover:text-stone-400 transition-colors uppercase tracking-wider font-bold">← Alertas</Link>
              <Link to="/soberania-financeira" className="text-xs text-stone-600 hover:text-stone-400 transition-colors uppercase tracking-wider font-bold">Soberania Financeira →</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
