import PageFloatingToc from "@/components/PageFloatingToc";
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Shield, ChevronRight, AlertTriangle, Lock, Eye, EyeOff,
  CheckCircle, XCircle, ExternalLink,
  Globe, Smartphone, DollarSign, Banknote,
  Check, X, HelpCircle, Zap,
  ArrowRight, ArrowLeft, Send, Building2,
  CreditCard, RefreshCw, Wallet, FileText,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import NobelVFX from '@/components/NobelVFX';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import heroImg from '@/assets/grabrfi-hero.jpg';
import appImg from '@/assets/grabrfi-app.jpg';
import brasilParaguaiImg from '@/assets/offshore-brasil-paraguai.jpg';
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
              className="text-[10px] font-bold tracking-[0.5em] uppercase text-blue-400/70 mb-4 relative z-10">Capítulo {number}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white relative z-10 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</motion.h2>
            <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="h-px w-40 mx-auto mt-8 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent origin-center relative z-10" />
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
const SPECS = [
  { label: 'Plataforma', value: 'GrabrFi', icon: Building2 },
  { label: 'Jurisdição', value: 'Estados Unidos', icon: Globe },
  { label: 'Tipo de conta', value: 'Conta corrente em USD (Checking Account)', icon: Wallet },
  { label: 'Stablecoins', value: 'USDT, USDC, PYUSD', icon: DollarSign },
  { label: 'Transferências', value: 'ACH + SWIFT Internacional', icon: Send },
  { label: 'KYC recomendado', value: 'Cédula paraguaia (privacidade máxima)', icon: EyeOff },
  { label: 'Integrações', value: 'PayPal, Wise, Deel, Payoneer', icon: RefreshCw },
  { label: 'Envio Fiat', value: 'Argentina, Bolívia, Colômbia, México, Nigéria, Peru', icon: Banknote },
];

const DIFERENCIAIS = [
  {
    icon: Send,
    title: 'SWIFT Internacional',
    desc: 'A GrabrFi aceita transferências SWIFT de qualquer banco no mundo — algo que a RedotPay não faz (não recebe de terceiros), a OffRamp limita (apenas ACH de clientes EUA) e a Mero restringe (só ACH). Isso significa que qualquer pessoa no planeta pode te enviar dólares.',
  },
  {
    icon: RefreshCw,
    title: 'Ponte direta com PayPal, Wise, Deel e Payoneer',
    desc: 'Você saca direto dessas plataformas para a GrabrFi sem intermediário. Elimina taxas extras de conversão e mantém tudo centralizado em uma conta bancária real nos EUA — com routing number e account number próprios.',
  },
  {
    icon: DollarSign,
    title: 'Stablecoins integradas nativamente',
    desc: 'Receba e envie USDT, USDC e PYUSD direto do app. Diferente de bancos tradicionais que bloqueiam cripto, a GrabrFi trata stablecoins como funcionalidade nativa — sem necessidade de exchange intermediária.',
  },
  {
    icon: Globe,
    title: 'Envio para 6 países em moeda local',
    desc: 'Envie valores em pesos argentinos, bolivianos, colombianos, mexicanos, soles peruanos e naira nigeriana diretamente do app. Uma funcionalidade rara para quem opera na América Latina e África.',
  },
  {
    icon: FileText,
    title: 'Setup de payroll para freelancers',
    desc: 'Configure recebimento direto de empregadores americanos. Ideal para desenvolvedores, designers e profissionais remotos que precisam de conta bancária nos EUA com histórico de renda — especialmente útil para quem constrói residência fiscal no Paraguai.',
  },
];

const FEES = [
  { item: 'Receber transferência ACH', value: 'Gratuito', good: true },
  { item: 'Enviar transferência ACH (EUA)', value: '0.3%', good: true },
  { item: 'Compras internacionais (cartão)', value: '2.5%', good: false },
  { item: 'Envio do cartão (Brasil)', value: 'USD 22', good: false },
  { item: 'Receber stablecoins', value: 'Gratuito', good: true },
  { item: 'Enviar stablecoins', value: 'Taxa de rede', good: true },
];

const PROS = [
  'Conta corrente real nos EUA com routing + account number',
  'SWIFT internacional — aceita transferências de qualquer banco do mundo',
  'Stablecoins nativas (USDT, USDC, PYUSD)',
  'Integração direta com PayPal, Wise, Deel e Payoneer',
  'Envio em moeda local para 6 países (Argentina, Bolívia, Colômbia, México, Nigéria, Peru)',
  'KYC com cédula paraguaia disponível — Paraguai não reporta ao CRS',
  'Setup de payroll para freelancers e empreendedores remotos',
  'Programa de referral (USD 30 por indicação)',
  'Taxa zero para receber ACH',
];

const CONS = [
  'Cartão internacional NÃO disponível com cédula paraguaia — contradição direta com privacidade',
  'Cartão com documento brasileiro provavelmente reporta — péssima opção para quem busca privacidade',
  'Taxa de 2.5% em compras internacionais com cartão — bem acima da concorrência',
  'Depósito em moeda local (guaranis) ainda não habilitado no Paraguai',
  'Sem opção de cartão sem KYC — existem alternativas melhores nesse aspecto',
  'Plataforma relativamente nova — histórico de confiabilidade ainda em construção',
];

const FAQS = [
  {
    q: 'Posso abrir a conta GrabrFi com documento brasileiro?',
    a: 'Sim, é possível. Mas NÃO recomendamos. Com CPF brasileiro, suas informações financeiras ficam expostas a acordos de reporte fiscal entre Brasil e EUA (FATCA). Para privacidade real, utilize cédula paraguaia — o Paraguai não faz parte do CRS e não compartilha dados financeiros com outros governos.',
  },
  {
    q: 'Qual a diferença entre GrabrFi e OffRamp?',
    a: 'A principal diferença é o SWIFT: a GrabrFi aceita transferências SWIFT internacionais de qualquer banco no mundo, enquanto a OffRamp só aceita ACH doméstico de contas americanas. Além disso, a GrabrFi tem integração direta com PayPal, Wise, Deel e Payoneer — a OffRamp não oferece isso.',
  },
  {
    q: 'Qual a diferença entre GrabrFi e RedotPay?',
    a: 'A RedotPay não aceita receber de terceiros — você só deposita cripto diretamente. A GrabrFi funciona como conta bancária completa: recebe transferências ACH e SWIFT, tem routing number próprio e permite envio de stablecoins. Em resumo: a RedotPay é cartão cripto; a GrabrFi é conta bancária com cripto integrada.',
  },
  {
    q: 'O cartão da GrabrFi vale a pena?',
    a: 'Não recomendamos. A taxa de 2.5% em compras internacionais é alta comparada a alternativas como o cartão sem KYC (que estamos preparando review). Além disso, se você fez KYC com cédula paraguaia, o cartão NÃO está disponível — e com documento brasileiro, ele provavelmente reporta suas transações.',
  },
  {
    q: 'Preciso de cédula paraguaia para usar a GrabrFi?',
    a: 'Não é obrigatório, mas é fortemente recomendado para quem busca privacidade financeira. A cédula paraguaia permite abrir a conta sem exposição ao CRS (sistema de reporte fiscal global). Se você não tem cédula, oferecemos assessoria completa para obtenção — incluindo residência fiscal no Paraguai.',
  },
  {
    q: 'A GrabrFi é segura?',
    a: 'A GrabrFi é uma fintech regulada nos Estados Unidos com conta bancária real (checking account com routing e account number). Os fundos estão custodiados em instituição bancária americana. Dito isso, é uma plataforma relativamente nova — recomendamos não manter grandes quantias paradas e usar como canal de movimentação, não como cofre.',
  },
];

const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'GrabrFi — Conta Bancária nos EUA com Stablecoins e SWIFT Internacional',
  description: 'Review completa da GrabrFi: conta corrente americana com USDT, USDC, PYUSD, transferências SWIFT e integração com PayPal, Wise e Payoneer.',
  url: 'https://lordjunnior.com.br/soberania-financeira/contas-internacionais/grabrfi',
};

const faqSchemaLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

/* ═══ COMPONENT ═══ */

const TOC_ITEMS = [
  { id: "specs", label: "Ficha Técnica" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "taxas", label: "Taxas" },
  { id: "pros-contras", label: "Prós e Contras" },
  { id: "veredicto", label: "Veredicto" },
  { id: "assessoria", label: "Assessoria" },
  { id: "faq", label: "FAQ" },
];

const GrabrFi = () => {
  const [leadOpen, setLeadOpen] = useState(false);
  return (
    <>
      <Helmet>
        <title>GrabrFi — Conta nos EUA com Stablecoins e SWIFT | Review Completa</title>
        <meta name="description" content="Review completa da GrabrFi: conta corrente nos EUA em USD, stablecoins (USDT, USDC, PYUSD), SWIFT internacional, integração PayPal/Wise/Payoneer. Abra com cédula paraguaia para máxima privacidade." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/contas-internacionais/grabrfi" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchemaLD)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="amber" />
      <ScrollToTop />

      <NobelVFX accentColor="teal" />

      {/* ── BOTÃO VOLTAR FIXO ── */}
      <Link
        to="/soberania-financeira"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 backdrop-blur-md border border-border text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Link>

      {/* ═══ SOVEREIGN DISCLAIMER ═══ */}
      <div className="px-6 md:px-12 lg:px-20 pt-20">
        <SovereignDisclaimer variant="bank" />
      </div>

      {/* ── CH01: HERO ── */}
      <ChapterKickoff number="01" title="Conta americana com trilho cripto: onde fica a sua privacidade" image={heroImg} id="hero" isOdd />

      <ScrollSection isOdd className="max-w-4xl mx-auto px-6 pb-20 pt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {/* Breadcrumb */}
          <motion.div variants={staggerChild} className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-600 mb-10">
            <Link to="/soberania-financeira" className="hover:text-white transition-colors">Soberania Financeira</Link>
            <ChevronRight size={10} />
            <Link to="/soberania-financeira" className="hover:text-white transition-colors">Contas Internacionais</Link>
            <ChevronRight size={10} />
            <span className="text-blue-400">GrabrFi</span>
          </motion.div>

          <motion.div variants={staggerChild}>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-6">
              Enquanto a maioria das fintechs te obriga a escolher entre dólares <strong className="text-stone-200">ou</strong> cripto, a GrabrFi te dá os dois — na mesma conta. Uma conta corrente real nos Estados Unidos, com routing number, account number, e a capacidade de receber e enviar <strong className="text-stone-200">USDT, USDC e PYUSD</strong> como se fossem transferências bancárias comuns.
            </p>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-6">
              O verdadeiro diferencial não está no app — está no <strong className="text-stone-200">SWIFT internacional</strong>. Enquanto OffRamp, RedotPay e Mero limitam você a ACH doméstico ou depósitos cripto, a GrabrFi aceita transferências de <strong className="text-stone-200">qualquer banco do planeta</strong>. E com cédula paraguaia no KYC, você opera fora do radar do CRS.
            </p>
            <p className="text-stone-500 text-xs leading-relaxed italic border-l-2 border-blue-500/30 pl-4">
              Não é sobre ter mais uma conta. É sobre ter a conta certa — aquela que conecta o sistema bancário tradicional ao ecossistema cripto, sem pedir permissão ao seu governo.
            </p>
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* ── CH02: FICHA TÉCNICA ── */}
      <ChapterKickoff number="02" title="Ficha técnica e o que fica registrado sobre você" image={appImg} id="specs" isOdd={false} />

      <ScrollSection isOdd={false} className="max-w-4xl mx-auto px-6 pb-20 pt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SPECS.map(s => (
            <motion.div key={s.label} variants={staggerChild}
              className="rounded-xl border border-blue-500/10 bg-blue-500/[0.03] p-4 flex items-start gap-3">
              <s.icon className="text-blue-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-stone-600">{s.label}</p>
                <p className="text-stone-300 text-sm font-medium mt-0.5">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ScrollSection>

      {/* ── CH03: DIFERENCIAIS ── */}
      <ChapterKickoff number="03" title="O que a concorrência não faz, e o que nenhuma delas protege" image={heroImg} id="diferenciais" isOdd />

      <ScrollSection isOdd className="max-w-4xl mx-auto px-6 pb-20 pt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="space-y-6">
          {DIFERENCIAIS.map((d, i) => (
            <motion.div key={i} variants={staggerChild}
              className="rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <d.icon className="text-blue-400" size={18} />
                </div>
                <h3 className="text-white font-bold text-base md:text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {d.title}
                </h3>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </ScrollSection>

      {/* ── CH04: TAXAS ── */}
      <ChapterKickoff number="04" title="Taxas reais e o custo invisível: o rastro dos seus dados" image={appImg} id="taxas" isOdd={false} />

      <ScrollSection isOdd={false} className="max-w-4xl mx-auto px-6 pb-20 pt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="grid grid-cols-3 gap-2 px-6 py-4 border-b border-white/5 text-[10px] font-bold tracking-[0.15em] uppercase text-stone-500">
              <span>Operação</span>
              <span>Taxa</span>
              <span>Veredicto</span>
            </div>
            {FEES.map((f, i) => (
              <motion.div key={i} variants={staggerChild}
                className={`grid grid-cols-3 gap-2 px-6 py-4 items-center text-xs ${i !== FEES.length - 1 ? 'border-b border-white/[0.03]' : ''}`}>
                <span className="text-stone-300">{f.item}</span>
                <span className={f.good ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>{f.value}</span>
                <span>{f.good ? <Check className="text-emerald-400" size={14} /> : <X className="text-amber-400" size={14} />}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-stone-600 text-[10px] mt-4 text-center uppercase tracking-widest">
            Taxas atualizadas em março/2026 — sujeitas a alteração pela plataforma
          </p>
        </motion.div>
      </ScrollSection>

      {/* ── CH05: PRÓS & CONTRAS ── */}
      <ChapterKickoff number="05" title="Vantagem operacional contra risco de contraparte" image={brasilParaguaiImg} id="pros-contras" isOdd />

      <ScrollSection isOdd className="max-w-4xl mx-auto px-6 pb-20 pt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6">
          {/* Prós */}
          <motion.div variants={staggerChild} className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] p-6">
            <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <CheckCircle size={16} /> Prós
            </h3>
            <ul className="space-y-3">
              {PROS.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                  <Check className="text-emerald-400 shrink-0 mt-0.5" size={12} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Contras */}
          <motion.div variants={staggerChild} className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.03] p-6">
            <h3 className="text-rose-400 font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <XCircle size={16} /> Contras
            </h3>
            <ul className="space-y-3">
              {CONS.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                  <X className="text-rose-400 shrink-0 mt-0.5" size={12} />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* ── CH06: VEREDICTO ── */}
      <ChapterKickoff number="06" title="Veredicto: ponte de saída, nunca cofre final" image={heroImg} id="veredicto" isOdd={false} />

      <ScrollSection isOdd={false} className="max-w-4xl mx-auto px-6 pb-20 pt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div variants={staggerChild} className="rounded-2xl border border-blue-500/15 bg-blue-500/[0.03] p-6 md:p-10">
            <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-6">
              A GrabrFi não é a conta perfeita — nenhuma é. Mas ela resolve um problema que quase ninguém resolve: <strong className="text-white">conectar o sistema bancário americano ao ecossistema cripto</strong>, com <strong className="text-white">SWIFT internacional</strong>, <strong className="text-white">stablecoins nativas</strong> e a possibilidade de KYC com cédula paraguaia.
            </p>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-6">
              O cartão é dispensável — 2.5% de taxa e sem opção para KYC paraguaio mata qualquer argumento de privacidade. Mas como <strong className="text-white">conta de movimentação</strong>, ponte entre fintechs e canal de recebimento internacional, a GrabrFi é uma das opções mais completas que existem hoje para quem opera fora do sistema bancário brasileiro.
            </p>
            <p className="text-stone-400 text-sm leading-relaxed">
              <strong className="text-blue-400">Recomendação:</strong> Use a GrabrFi como hub de recebimento (SWIFT + ACH + stablecoins), não como cofre. Mantenha apenas capital de giro. Para cartão internacional privado, aguarde nossa review do cartão sem KYC. Para privacidade máxima, combine com cédula paraguaia.
            </p>
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* ── CH07: CTA ASSESSORIA ── */}
      <ChapterKickoff number="07" title="Cédula Paraguaia e Assessoria" image={brasilParaguaiImg} id="assessoria" isOdd />

      <ScrollSection isOdd className="max-w-4xl mx-auto px-6 pb-20 pt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div variants={staggerChild} className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-6 md:p-10 text-center">
            <Shield className="text-amber-400 mx-auto mb-4" size={32} />
            <h3 className="text-white font-bold text-xl md:text-2xl mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quer operar com privacidade real?
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xl mx-auto mb-6">
              A cédula paraguaia é a chave para abrir contas como a GrabrFi sem exposição ao CRS — o sistema global de reporte fiscal. 
              Oferecemos assessoria completa para obtenção de cédula e residência fiscal no Paraguai, incluindo todo o processo 
              documental e acompanhamento personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://app.grabrfi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-bold hover:bg-blue-500/30 transition-all"
              >
                <ExternalLink size={14} /> Acessar GrabrFi
              </a>
              <button
                onClick={() => setLeadOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-bold hover:bg-amber-500/30 transition-all"
              >
                <Zap size={14} /> Quero minha cédula paraguaia
              </button>
            </div>
            <LeadCaptureModal isOpen={leadOpen} onClose={() => setLeadOpen(false)} interesse="cedula-paraguaia" />
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* ── CH08: FAQ ── */}
      <ChapterKickoff number="08" title="Privacidade, reporte e bloqueios: perguntas frequentes" image={appImg} id="faq" isOdd={false} />

      <ScrollSection isOdd={false} className="max-w-4xl mx-auto px-6 pb-20 pt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <motion.div key={i} variants={staggerChild}>
                <AccordionItem value={`faq-${i}`} className="rounded-xl border border-white/5 bg-white/[0.02] px-5">
                  <AccordionTrigger className="text-stone-200 text-sm font-semibold text-left hover:no-underline py-4">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-400 text-xs leading-relaxed pb-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </ScrollSection>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10 text-center" style={{ background: '#050808' }}>
        <Link to="/soberania-financeira" className="text-stone-600 text-xs tracking-widest uppercase hover:text-stone-400 transition-colors">
          ← Voltar ao Hub de Soberania Financeira
        </Link>
      </footer>
    </>
  );
};

export default GrabrFi;
