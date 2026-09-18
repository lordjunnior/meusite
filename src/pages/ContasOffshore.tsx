import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence, useSpring } from 'framer-motion';
import {
  Shield, ChevronRight, AlertTriangle, Lock, Building2,
  CheckCircle, XCircle, AlertCircle, MapPin,
  ExternalLink, Star, ChevronDown, Users, Zap, Award,
} from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import bgOffshore from '@/assets/backgrounds/bg-offshore.webp';

import heroImg from '@/assets/offshore-hero.webp';
import cardsImg from '@/assets/offshore-cards.webp';
import brasilParaguaiImg from '@/assets/offshore-brasil-paraguai.webp';
import chapterRankingImg from '@/assets/offshore-chapter-ranking.webp';
import chapterCompareImg from '@/assets/offshore-chapter-compare.webp';
import chapterFaqImg from '@/assets/offshore-chapter-faq.webp';
import BackToHome from '@/components/BackToHome';

/* ═══════════════════════════════════════════════════════════
   MOTION SYSTEM — Netflix/BBC Scroll Storytelling
   ═══════════════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const staggerChild = {
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

/* ═══ Chapter Kickoff Frame — 60-70% image + giant title ═══ */
const ChapterKickoff = ({ number, title, image, id, isOdd }: { number: string; title: string; image: string; id: string; isOdd: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]); // 8% parallax
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.05, 1.02]); // micro-motion zoom

  return (
    <div ref={ref} id={id} className="relative overflow-hidden" style={{ background: isOdd ? '#050808' : '#070b0b' }}>
      {/* Image — 65vh */}
      <div className="relative h-[65vh] min-h-[450px] max-h-[700px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <img src={image} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.35) saturate(0.75)' }} loading="lazy" />
        </motion.div>
        {/* Multi-layer overlay */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${isOdd ? 'rgba(5,8,8,0.3)' : 'rgba(7,11,11,0.3)'} 0%, transparent 30%, ${isOdd ? 'rgba(5,8,8,0.7)' : 'rgba(7,11,11,0.7)'} 70%, ${isOdd ? '#050808' : '#070b0b'} 100%)` }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 30%, rgba(5,8,8,0.85) 100%)' }} />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative text-center px-6">
            {/* Giant ghost number */}
            <motion.span
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={inView ? { opacity: 0.08, scale: 1, y: 0 } : {}}
              transition={{ duration: 1.5, ease: EASE }}
              className="absolute -top-24 md:-top-32 left-1/2 -translate-x-1/2 text-[160px] md:text-[240px] font-black text-white pointer-events-none select-none leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {number}
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 0.6, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/70 mb-4 relative z-10"
            >
              Capítulo {number}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white relative z-10 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {title}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="h-px w-40 mx-auto mt-8 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent origin-center relative z-10"
            />
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
    <motion.div
      ref={ref} id={id}
      initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ y, background: isOdd ? '#050808' : '#070b0b' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ═══ Reading Progress Bar — spring physics ═══ */
const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, rgba(239,68,68,0.8), rgba(245,158,11,1), rgba(234,179,8,0.9))',
      }}
    />
  );
};

/* ═══ Floating TOC — Medium/NYT style ═══ */
const CHAPTERS = [
  { id: 'condicao', label: 'A Condição', num: '01' },
  { id: 'ranking', label: 'Ranking', num: '02' },
  { id: 'comparativo', label: 'Comparativo', num: '03' },
  { id: 'assessoria', label: 'Assessoria', num: '04' },
  { id: 'faq', label: 'FAQ', num: '05' },
];

const FloatingToc = () => {
  const [active, setActive] = useState('');
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setShow(v > 0.08 && v < 0.95);
  });

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
        <motion.nav
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[55] hidden xl:flex 2xl:hidden flex-col gap-4"
        >
          {CHAPTERS.map(c => (
            <a key={c.id} href={`#${c.id}`}
              className={`group flex items-center gap-3 transition-all duration-400 ${active === c.id ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}>
              <span className={`block transition-all duration-400 rounded-full ${active === c.id ? 'w-3 h-3 bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]' : 'w-2 h-2 bg-stone-600'}`} />
              <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-400 ${active === c.id ? 'text-amber-400' : 'text-stone-600'}`}>
                {c.num} · {c.label}
              </span>
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

/* ═══ ACCOUNT DATA ═══ */
interface Account {
  rank: number; name: string; jurisdiction: string; flag: string; type: 'fintech' | 'banco';
  currencies: string[]; openWith: ('BR' | 'PY' | 'Outro')[]; receiveTransfers: boolean;
  transferMethods: string[]; cardAvailable: boolean; feeLevel: 'baixa' | 'média' | 'alta';
  privacyLevel: 'alto' | 'médio' | 'baixo'; highlights: string[]; redFlags: string[];
  verdict: string; restricted?: string;
}

const ACCOUNTS: Account[] = [
  {
    rank: 1, name: 'RedotPay', jurisdiction: 'Hong Kong', flag: '🇭🇰', type: 'fintech',
    currencies: ['USD', 'EUR', 'BRL'], openWith: ['BR', 'PY'], receiveTransfers: true,
    transferMethods: ['Depósito próprio'], cardAvailable: true, feeLevel: 'alta', privacyLevel: 'alto',
    highlights: ['Empréstimos colateralizados em Bitcoin — gaste sem vender seu BTC', 'Aceita cédula paraguaia para abertura com privacidade total', 'Cartão de crédito disponível para gastos internacionais'],
    redFlags: ['Taxas de compra de BTC dentro da plataforma são elevadas — evite comprar BTC diretamente', 'Taxas do cartão acima da média de mercado comparado a concorrentes', 'Se abrir com documento BR, fica à mercê de eventual reporte retroativo'],
    verdict: 'Ideal para quem quer alavancagem em BTC sem vender. Use com cédula paraguaia para privacidade. Evite o cartão como opção primária — as taxas não compensam frente a alternativas.',
  },
  {
    rank: 2, name: 'OffRamp', jurisdiction: 'Internacional', flag: '🌐', type: 'fintech',
    currencies: ['USD'], openWith: ['PY', 'Outro'], receiveTransfers: true,
    transferMethods: ['ACH', 'Wire Transfer'], cardAvailable: true, feeLevel: 'média', privacyLevel: 'alto',
    highlights: ['Recebe transferências em dólares de terceiros via ACH — conta real nos EUA', 'Câmbio mais atrativo que a RedotPay para gastos no cartão', 'Wire Transfer direto para conta americana — útil para receber de empregadores'],
    redFlags: ['Não recebe transferências em euros — limitado ao ecossistema USD', 'Sem empréstimos colateralizados — não substitui a RedotPay nesse aspecto'],
    verdict: 'A melhor opção para receber dólares de terceiros com câmbio competitivo. Se você recebe em USD de clientes ou empregadores, esta é a escolha primária.',
  },
  {
    rank: 3, name: 'Etherfy', jurisdiction: 'Internacional', flag: '🌐', type: 'fintech',
    currencies: ['USD'], openWith: ['PY', 'Outro'], receiveTransfers: true,
    transferMethods: ['Transferência internacional'], cardAvailable: true, feeLevel: 'baixa', privacyLevel: 'alto',
    highlights: ['Taxa de 0,2% para receber transferências internacionais em USD — menor do mercado', 'Economia significativa vs OffRamp (0,5%) em transferências recorrentes', 'Plataforma focada em eficiência de custos para freelancers internacionais'],
    redFlags: ['Plataforma relativamente nova — menos tempo de mercado para validar confiabilidade'],
    verdict: 'A mais barata para receber transferências internacionais. Se o seu fluxo principal é receber USD do exterior, a economia de 0,3% por transação se acumula rapidamente.',
  },
  {
    rank: 4, name: 'Use Picnick', jurisdiction: 'Reino Unido', flag: '🇬🇧', type: 'fintech',
    currencies: ['USD', 'Cripto'], openWith: ['BR'], receiveTransfers: false,
    transferMethods: [], cardAvailable: true, feeLevel: 'baixa', privacyLevel: 'baixo',
    highlights: ['Melhor câmbio para quem está no Brasil e quer comprar no dia a dia com cartão cripto', 'Cashback em compras — vantagem competitiva para gastos recorrentes', 'Excelente para viajantes brasileiros que querem pagar menos em câmbio'],
    redFlags: ['Só aceita documento brasileiro — IMPOSSÍVEL abrir com cédula paraguaia', 'Não recebe transferências de terceiros internacionalmente', 'Localizada no Reino Unido — risco de reporte via CRS ao governo brasileiro', 'ALERTA: Receita Federal tem identificado brasileiros com cartões cripto internacionais abertos com CPF'],
    verdict: 'Melhor câmbio do mercado, porém ZERO privacidade. Use apenas se seu dinheiro já é 100% declarado e você quer eficiência, não sigilo.',
  },
  {
    rank: 5, name: 'Mero', jurisdiction: 'Internacional', flag: '🌐', type: 'fintech',
    currencies: ['USD'], openWith: ['PY'], receiveTransfers: true,
    transferMethods: ['Wise', 'Revolut', 'Outros'], cardAvailable: true, feeLevel: 'média', privacyLevel: 'alto',
    highlights: ['Sem limite para recebimento em dólares — ideal para volumes maiores', 'Aceita cédula paraguaia para abertura com privacidade', 'Compatível com Wise, Revolut e múltiplas plataformas de envio'],
    redFlags: ['Menos conhecida — validar suporte e liquidez antes de enviar valores altos'],
    verdict: 'A opção mais flexível para receber de múltiplas fontes sem limites. Ideal para empreendedores digitais que operam com volumes variáveis.',
  },
  {
    rank: 6, name: 'Grabfy', jurisdiction: 'Estados Unidos', flag: '🇺🇸', type: 'fintech',
    currencies: ['USD'], openWith: ['PY', 'Outro'], receiveTransfers: true,
    transferMethods: ['SWIFT', 'ACH'], cardAvailable: true, feeLevel: 'média', privacyLevel: 'alto',
    highlights: ['Recebe diretamente por SWIFT — diferencial único para clientes fora dos EUA', 'Conta em dólares nos Estados Unidos — endereço bancário real', 'Ideal para quem tem empregador/clientes na Ásia ou Europa que pagam via SWIFT'],
    redFlags: ['Funcionalidades cripto podem ser mais limitadas que concorrentes especializados'],
    verdict: 'A escolha certa se você precisa de SWIFT. A maioria das fintechs só aceita ACH — a Grabfy resolve o problema de receber de empregadores globais.',
  },
  {
    rank: 7, name: 'UglyCash', jurisdiction: 'América Latina', flag: '🌎', type: 'fintech',
    currencies: ['USD'], openWith: ['PY'], receiveTransfers: true,
    transferMethods: ['Transferência'], cardAvailable: true, feeLevel: 'média', privacyLevel: 'alto',
    highlights: ['Aceita exclusivamente cédula paraguaia — máxima privacidade documental', 'Opera na região da América Latina — familiaridade regulatória'],
    redFlags: ['Restrição geográfica: exige geolocalização em Argentina ou Paraguai para abrir conta', 'NÃO funciona com documento brasileiro — impossível abrir do Brasil', 'Se você não está fisicamente na região, não consegue nem iniciar o cadastro'],
    restricted: 'Requer geolocalização em Argentina ou Paraguai',
    verdict: 'Opção exclusiva para quem já está na região. Se você mora ou viaja frequentemente para Argentina/Paraguai, é uma alternativa sólida com privacidade máxima.',
  },
  {
    rank: 8, name: 'Chapo Bank', jurisdiction: 'Gibraltar', flag: '🇬🇮', type: 'banco',
    currencies: ['USD', 'EUR', 'GBP'], openWith: ['PY', 'Outro'], receiveTransfers: true,
    transferMethods: ['SWIFT', 'SEPA'], cardAvailable: true, feeLevel: 'alta', privacyLevel: 'alto',
    highlights: ['Multi-moeda real: USD, EUR e GBP — raro entre as opções cripto', 'Gibraltar: jurisdição com legislação de privacidade financeira estabelecida', 'Todos os Fiat recebidos são convertidos automaticamente — camada extra de separação'],
    redFlags: ['Taxa anual de US$ 1.000 — posiciona como opção premium, não para iniciantes', 'Compliance extremamente agressivo — pedem documentação extensiva para transações pequenas', 'Receber Fiat de terceiros pode acionar alertas de compliance imediatamente'],
    verdict: 'Para quem movimenta volumes maiores e precisa de multi-moeda com privacidade jurisdicional. O custo alto e o compliance rigoroso eliminam amadores — é isso que faz a plataforma funcionar.',
  },
  {
    rank: 9, name: 'Dukascopy', jurisdiction: 'Suíça', flag: '🇨🇭', type: 'banco',
    currencies: ['USD', 'EUR'], openWith: ['PY', 'Outro'], receiveTransfers: true,
    transferMethods: ['SWIFT', 'SEPA'], cardAvailable: true, feeLevel: 'alta', privacyLevel: 'alto',
    highlights: ['Banco suíço real — não é fintech, é instituição bancária regulada', 'Gerente de banco dedicado que responde diretamente por você', 'Suíça: padrão-ouro em privacidade bancária historicamente'],
    redFlags: ['Abertura exige chamada de vídeo — processo mais burocrático', 'Taxas de saque cripto para carteira pessoal são mais altas', 'Processo de abertura mais lento que fintechs — espere dias, não minutos'],
    verdict: 'O tanque de guerra das opções: lento, pesado, caro — mas blindado. Conta bancária suíça real com gerente dedicado. Para quem quer a solidez institucional que nenhuma fintech pode oferecer.',
  },
];

const privacyConfig = {
  alto: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Alto' },
  médio: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Médio' },
  baixo: { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', label: 'Baixo' },
};
const feeConfig = {
  baixa: { color: 'text-emerald-400', label: 'Baixas' },
  média: { color: 'text-amber-400', label: 'Médias' },
  alta: { color: 'text-rose-400', label: 'Altas' },
};

const FAQ = [
  { q: 'Preciso de cédula paraguaia para abrir essas contas?', a: 'Para obter privacidade real (sem reporte ao governo brasileiro), sim — a maioria das contas exige documentação de jurisdição que não reporta. Abrir com CPF brasileiro expõe você ao reporte automático via CRS. O processo de obtenção da cédula paraguaia é explicado em conteúdo exclusivo para membros do canal.' },
  { q: 'Essas contas são legais?', a: 'Sim. Todas as plataformas listadas são fintechs e bancos regulados em suas respectivas jurisdições. Ter conta internacional é legal. O que você faz com ela — declarar ou não — é uma decisão pessoal com consequências legais que variam por país.' },
  { q: 'Qual é a melhor conta para receber dólares de clientes?', a: 'OffRamp para ACH (EUA), Grabfy para SWIFT (global) e Etherfy para quem quer a menor taxa (0,2%). Depende do método de pagamento do seu cliente.' },
  { q: 'Posso usar cartão cripto sem KYC no dia a dia?', a: 'Existem opções de cartão cripto completamente anônimas (sem nome impresso). O autor utiliza uma dessas opções para gastos diários, evitando exposição de dados pessoais mesmo em cenários de vazamento de dados.' },
  { q: 'A Receita Federal consegue rastrear essas contas?', a: 'Se você abrir com documento brasileiro, sim — o CRS (Common Reporting Standard) permite troca automática de informações entre 100+ países. Com documentação de jurisdição não-CRS, a probabilidade de rastreamento cai drasticamente.' },
  { q: 'Qual a diferença entre fintech e banco nesta lista?', a: 'Fintechs (RedotPay, OffRamp, Etherfy, etc.) são mais ágeis, baratas e fáceis de abrir. Bancos (Chapo Bank, Dukascopy) oferecem mais solidez institucional, multi-moeda e gerentes dedicados — mas custam mais e exigem mais documentação.' },
  { q: 'Posso usar essas contas do Brasil?', a: 'A maioria sim, com exceção da UglyCash que exige geolocalização em Argentina/Paraguai. As demais podem ser abertas e operadas remotamente de qualquer lugar do mundo.' },
  { q: 'Como acessar a assessoria de abertura?', a: 'A assessoria completa — incluindo obtenção da cédula paraguaia e abertura de contas — está disponível exclusivamente para membros do canal. O processo é assessorado do início ao fim com suporte 1-a-1.' },
];

const schemaLD = { '@context': 'https://schema.org', '@type': 'Article', headline: '10 Contas Offshore Cripto que NÃO Reportam — Abertura Remota', description: 'Ranking técnico de 10 fintechs e bancos cripto internacionais em paraísos fiscais que não reportam transações.', url: 'https://lordjunnior.com.br/soberania-financeira/contas-offshore/top-10' };
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

/* ═══ ACCOUNT CARD ═══ */
const AccountCard = ({ account, idx }: { account: Account; idx: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const privacy = privacyConfig[account.privacyLevel];
  const fee = feeConfig[account.feeLevel];
  const isWarning = account.privacyLevel === 'baixo';

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainer} className="group relative">
      {isWarning && (
        <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-[1px] rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.3), transparent 50%, rgba(244,63,94,0.2))' }} />
      )}
      <motion.div variants={staggerChild}
        className={`relative rounded-3xl border overflow-hidden transition-all duration-700 ${isWarning ? 'border-rose-500/20 hover:border-rose-500/40 hover:shadow-[0_0_80px_-15px_rgba(244,63,94,0.2)]' : 'border-white/[0.06] hover:border-amber-500/25 hover:shadow-[0_0_80px_-15px_rgba(245,158,11,0.12)]'} bg-white/[0.02]`}
        whileHover={{ y: -6, transition: { duration: 0.4, ease: EASE } }}>

        {/* Rank */}
        <div className="absolute top-0 left-0 z-10">
          <motion.div variants={staggerChild} className="bg-amber-500/20 backdrop-blur-md border-r border-b border-amber-500/20 rounded-br-2xl px-5 py-3">
            <span className="text-amber-400 font-bold text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>#{account.rank}</span>
          </motion.div>
        </div>

        {/* Header */}
        <div className="px-6 md:px-8 pt-10 pb-6 border-b border-white/[0.04]">
          <motion.div variants={staggerChild} className="flex items-start justify-between mb-4">
            <div className="pl-14">
              <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{account.name}</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-stone-500 text-xs flex items-center gap-1.5"><MapPin size={11} /> {account.flag} {account.jurisdiction}</span>
                <span className="text-stone-600 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05]">{account.type}</span>
              </div>
            </div>
            <div className={`px-3.5 py-2 rounded-full ${privacy.bg} border ${privacy.border}`}>
              <span className={`text-[9px] font-bold tracking-[0.15em] uppercase ${privacy.color}`}><Lock size={9} className="inline mr-1 -mt-px" /> {privacy.label}</span>
            </div>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { label: 'Moedas', value: account.currencies.join(', ') },
              { label: 'Abertura', value: account.openWith.join(' / ') },
              { label: 'Taxas', value: fee.label, color: fee.color },
              { label: 'Cartão', value: account.cardAvailable ? 'Disponível' : 'Não', color: account.cardAvailable ? 'text-emerald-400' : 'text-stone-600' },
            ].map(spec => (
              <motion.div key={spec.label} variants={staggerChild} className="bg-white/[0.02] rounded-xl px-3.5 py-3 border border-white/[0.04]">
                <p className="text-[9px] text-stone-600 uppercase tracking-wider mb-1">{spec.label}</p>
                <p className={`text-xs font-semibold ${spec.color || 'text-stone-300'}`}>{spec.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Body */}
        <motion.div variants={staggerChild} className="px-6 md:px-8 py-7 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-emerald-400/80 mb-4 flex items-center gap-1.5"><CheckCircle size={12} /> Vantagens</p>
            <ul className="space-y-3">
              {account.highlights.map((h, i) => (
                <motion.li key={i} variants={staggerChild} className="text-stone-400 text-[13px] leading-relaxed flex items-start gap-2.5">
                  <span className="text-emerald-500 mt-1 shrink-0 text-sm">+</span> {h}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-rose-400/80 mb-4 flex items-center gap-1.5"><AlertCircle size={12} /> Alertas</p>
            <ul className="space-y-3">
              {account.redFlags.map((r, i) => (
                <motion.li key={i} variants={staggerChild} className="text-stone-400 text-[13px] leading-relaxed flex items-start gap-2.5">
                  <span className="text-rose-500 mt-1 shrink-0 text-sm">!</span> {r}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {account.restricted && (
          <motion.div variants={staggerChild} className="mx-6 md:mx-8 mb-5 px-5 py-3.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/15">
            <p className="text-amber-400/80 text-xs flex items-center gap-2.5"><AlertTriangle size={13} className="shrink-0" /><span><strong>Restrição:</strong> {account.restricted}</span></p>
          </motion.div>
        )}

        <motion.div variants={staggerChild} className="px-6 md:px-8 py-6 border-t border-white/[0.04] bg-white/[0.01]">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-amber-400/70 mb-2.5">Veredicto Editorial</p>
          <p className="text-stone-300 text-sm md:text-[15px] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>"{account.verdict}"</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
const ContasOffshore = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const [showLeadModal, setShowLeadModal] = useState(false);

  return (
    <>
      <Helmet>
        <title>10 Contas Offshore Cripto que NÃO Reportam — Abertura Remota | Soberania Financeira</title>
        <meta name="description" content="Ranking técnico de 10 fintechs e bancos cripto internacionais em paraísos fiscais que não reportam transações. RedotPay, OffRamp, Etherfy, Dukascopy e mais." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/contas-offshore/top-10" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
      <ReadingProgressBar />
      <FloatingToc />

      <div className="min-h-screen bg-[#050808] text-stone-200">
        <FixedThematicBackground image={bgOffshore} intensity="medium" />

        {/* ═══ FILM GRAIN ═══ */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.035]">
          <svg width="100%" height="100%"><filter id="co-grain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter="url(#co-grain)" /></svg>
        </div>

        {/* ═══ DIAGONAL LIGHT BEAMS — fixed cinematic ═══ */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Diagonal beam top-left to bottom-right */}
          <div className="absolute -top-[200px] -left-[200px] w-[1200px] h-[300px] opacity-[0.025] rotate-[25deg]"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(245,158,11,0.6), transparent)' }} />
          {/* Diagonal beam bottom-right */}
          <div className="absolute -bottom-[150px] -right-[150px] w-[900px] h-[200px] opacity-[0.02] -rotate-[30deg]"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(16,185,129,0.5), transparent)' }} />
          {/* Radial glows */}
          <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] opacity-[0.03]"
            style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.4), transparent 70%)' }} />
          <div className="absolute bottom-[30%] left-[5%] w-[400px] h-[400px] opacity-[0.025]"
            style={{ background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.3), transparent 70%)' }} />
        </div>

        {/* ═══ HERO ═══ */}
        <div ref={heroRef} className="relative h-[90vh] min-h-[650px] max-h-[950px] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
            <div className="absolute inset-0 scale-110">
              <img src={heroImg} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3) saturate(0.7)' }} loading="eager" fetchPriority="high" decoding="async" />
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.05) 0%, rgba(5,8,8,0.4) 35%, rgba(5,8,8,0.88) 65%, #050808 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 130% 100% at 50% 15%, transparent 25%, rgba(5,8,8,0.92) 100%)' }} />
          </motion.div>

          <motion.div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24" style={{ opacity: heroOpacity }}>
            <Link to="/soberania-financeira" className="inline-flex items-center gap-2 text-stone-500 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-10">
              <ChevronRight size={14} className="rotate-180" /> Soberania Financeira
            </Link>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mb-5">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/70">CONTAS OFFSHORE · RANKING TÉCNICO</span>
            </motion.div>
            <div className="flex items-start gap-5 mb-6">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 shrink-0 backdrop-blur-sm">
                <Building2 className="text-amber-400" size={30} />
              </motion.div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                  className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.92]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  10 Contas Offshore<br />Cripto que <span className="text-amber-400">NÃO</span><br />Reportam
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                  className="text-stone-400 text-sm md:text-base lg:text-lg leading-relaxed mt-5 max-w-2xl">
                  Fintechs cripto internacionais, contas bancárias em paraísos fiscais e cartões sem KYC.
                  Ranking técnico baseado em privacidade, taxas e funcionalidade real — testadas na prática.
                </motion.p>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="flex flex-wrap gap-8 mt-10">
              {[{ label: 'Contas', value: '9' }, { label: 'Jurisdições', value: '7' }, { label: 'Abertura Remota', value: '8/9' }].map(s => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</span>
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-500">{s.label}</span>
                </div>
              ))}
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
          <SovereignDisclaimer variant="offshore" />
        </div>

        {/* ═══════════════════════════════════════
           CAPÍTULO 01 — A CONDIÇÃO (odd = dark)
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="01" title="A Condição que Ninguém te Conta" image={cardsImg} id="condicao" isOdd={true} />

        <ScrollSection className="max-w-4xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild} className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 md:p-10 backdrop-blur-sm">
              <div className="flex items-start gap-5">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                  <AlertTriangle className="text-amber-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-amber-300 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Antes de Continuar, Entenda Isso</h2>
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-5">
                    Todas essas contas permitem comprar, enviar, receber transferências internacionais e converter para Bitcoin ou USDT.
                    <strong className="text-stone-200"> Mas tem uma condição crítica:</strong>
                  </p>
                  <motion.div variants={staggerChild} className="rounded-xl bg-black/40 border border-white/[0.06] p-6">
                    <p className="text-white text-sm md:text-base font-semibold leading-relaxed">
                      Se você abrir conta com o documento brasileiro (CPF), você <span className="text-rose-400 font-bold">PODE</span> ter problemas.
                      O CRS (Common Reporting Standard) permite troca automática de informações financeiras entre 100+ países — incluindo o Brasil.
                    </p>
                    <motion.div variants={staggerChild} className="mt-5 pt-5 border-t border-white/[0.06]">
                      <p className="text-amber-400 text-sm md:text-base font-medium leading-relaxed">
                        A solução? Abrir com documentação de jurisdição que não reporta.
                        O processo assessorado está disponível exclusivamente para membros do canal.
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══════════════════════════════════════
           CAPÍTULO 02 — RANKING (even = lighter)
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="02" title="As 9 Contas Analisadas" image={chapterRankingImg} id="ranking" isOdd={false} />

        <div style={{ background: '#070b0b' }}>
          <ScrollSection className="max-w-5xl mx-auto px-6 py-8 text-center" isOdd={false}>
            <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed">
              Ordenadas por relevância prática. Cada conta foi testada pessoalmente e avaliada por privacidade, taxas, funcionalidade e red flags.
            </p>
          </ScrollSection>

          <section className="max-w-5xl mx-auto px-6 pb-24">
            <div className="space-y-10">
              {ACCOUNTS.map((acc, idx) => (
                <AccountCard key={acc.name} account={acc} idx={idx} />
              ))}
            </div>
          </section>
        </div>

        {/* ═══════════════════════════════════════
           CAPÍTULO 03 — COMPARATIVO (odd)
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="03" title="Comparativo Rápido" image={chapterCompareImg} id="comparativo" isOdd={true} />

        <ScrollSection className="max-w-6xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.02] overflow-hidden backdrop-blur-sm overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5">
                  {['#', 'Conta', 'Jurisdição', 'Moedas', 'Doc', 'Recebe $', 'Taxas', 'Privacidade'].map(h => (
                    <th key={h} className="px-4 py-4 text-[9px] font-bold tracking-[0.2em] uppercase text-stone-500 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACCOUNTS.map((acc, i) => (
                  <motion.tr key={acc.name} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                    className={`${i !== ACCOUNTS.length - 1 ? 'border-b border-white/[0.03]' : ''} hover:bg-white/[0.02] transition-colors`}>
                    <td className="px-4 py-4 text-amber-400 font-bold text-sm">{acc.rank}</td>
                    <td className="px-4 py-4 text-stone-200 font-medium text-sm">{acc.name}</td>
                    <td className="px-4 py-4 text-stone-500 text-xs">{acc.flag} {acc.jurisdiction}</td>
                    <td className="px-4 py-4 text-stone-400 text-xs">{acc.currencies.join(', ')}</td>
                    <td className="px-4 py-4 text-xs">{acc.openWith.includes('PY') ? <span className="text-emerald-400">PY</span> : <span className="text-rose-400">BR</span>}</td>
                    <td className="px-4 py-4 text-xs">{acc.receiveTransfers ? <CheckCircle size={14} className="text-emerald-400" /> : <XCircle size={14} className="text-rose-400" />}</td>
                    <td className={`px-4 py-4 text-xs font-semibold ${feeConfig[acc.feeLevel].color}`}>{feeConfig[acc.feeLevel].label}</td>
                    <td className={`px-4 py-4 text-xs font-semibold ${privacyConfig[acc.privacyLevel].color}`}>{privacyConfig[acc.privacyLevel].label}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </ScrollSection>

        {/* ═══════════════════════════════════════
           CAPÍTULO 04 — ASSESSORIA (even) — BREATHING CTA
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="04" title="Assessoria Privada" image={brasilParaguaiImg} id="assessoria" isOdd={false} />

        <div style={{ background: '#070b0b' }}>
          <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            >
              <div className="relative rounded-3xl overflow-hidden">
                {/* Screaming border — pulsating glow */}
                <motion.div
                  animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.002, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-[2px] rounded-3xl"
                  style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.5), rgba(234,179,8,0.3) 30%, transparent 50%, rgba(245,158,11,0.4) 80%, rgba(234,179,8,0.3))' }}
                />
                {/* Shimmer sweep */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                  className="absolute inset-0 z-[1] rounded-3xl pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.08), transparent)', width: '50%' }}
                />

                <div className="relative border border-amber-500/25 rounded-3xl overflow-hidden">
                  {/* Background image — Brasil x Paraguai */}
                  <div className="absolute inset-0">
                    <img src={brasilParaguaiImg} alt="Bandeiras do Brasil e Paraguai" className="w-full h-full object-cover" style={{ filter: 'brightness(0.45) saturate(0.85)' }} loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b0b] via-[#070b0b]/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#070b0b]/40 to-transparent" />
                  </div>

                  <div className="relative z-10 p-8 md:p-14 lg:p-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                      {/* Left — Content */}
                      <div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease: EASE }}
                          className="inline-flex p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-8"
                        >
                          <Shield className="text-amber-400" size={32} />
                        </motion.div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[0.95]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Quer abrir essas contas<br />
                          <span className="text-amber-400">sem ser reportado?</span>
                        </h2>

                        <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                          O processo assessorado de obtenção da <strong className="text-stone-200">cédula paraguaia</strong> e abertura
                          de conta com privacidade está disponível exclusivamente para membros.
                          <strong className="text-amber-400/80"> Assessoria completa 1-a-1.</strong>
                        </p>

                        {/* Benefits */}
                        <div className="space-y-3 mb-10">
                          {[
                            { icon: Zap, text: 'Processo acelerado — abertura em dias, não semanas' },
                            { icon: Users, text: 'Assessoria pessoal 1-a-1 durante todo o processo' },
                            { icon: Award, text: 'Cédula paraguaia legítima para uso em todas as contas' },
                          ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-3">
                              <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/15">
                                <Icon size={14} className="text-amber-400" />
                              </div>
                              <span className="text-stone-300 text-sm">{text}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button — breathing */}
                        <motion.button
                          onClick={() => setShowLeadModal(true)}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-xl text-base font-bold overflow-hidden"
                        >
                          {/* Button glow background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-yellow-500/20 border border-amber-500/40 rounded-xl" />
                          <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 rounded-xl"
                          />
                          <span className="relative z-10 flex items-center gap-3 text-amber-200">
                            <Star size={20} className="group-hover:rotate-12 transition-transform" />
                            Solicitar Assessoria
                          </span>
                        </motion.button>

                        <p className="text-stone-600 text-[10px] mt-5 tracking-[0.2em] uppercase">
                          Assessoria + Cédula Paraguaia + Abertura Acelerada
                        </p>
                      </div>

                      {/* Right — Social proof */}
                      <div className="hidden lg:block">
                        <div className="space-y-4">
                          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
                            <p className="text-stone-300 text-sm italic leading-relaxed mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                              "Abri minha conta na Mero com a cédula em menos de 48h. Processo simples, assessorado do início ao fim."
                            </p>
                            <p className="text-stone-600 text-[10px] uppercase tracking-wider">— Membro desde 2024</p>
                          </div>
                          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
                            <p className="text-stone-300 text-sm italic leading-relaxed mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                              "Já tenho 3 contas offshore abertas com a cédula. Zero reporte. Dinheiro fluindo."
                            </p>
                            <p className="text-stone-600 text-[10px] uppercase tracking-wider">— Membro desde 2023</p>
                          </div>
                          <div className="rounded-2xl bg-amber-500/[0.04] border border-amber-500/15 p-6 text-center">
                            <p className="text-amber-400 text-3xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>500+</p>
                            <p className="text-stone-500 text-[10px] uppercase tracking-wider">Membros com cédula ativa</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* ═══════════════════════════════════════
           CAPÍTULO 05 — FAQ (odd)
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="05" title="Dúvidas Estratégicas" image={chapterFaqImg} id="faq" isOdd={true} />

        <section className="max-w-4xl mx-auto px-6 py-16 md:py-20" style={{ background: '#050808' }}>
          <div className="space-y-4">
            {FAQ.map((faq, i) => (
              <ScrollSection key={i} isOdd={true}>
                <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.1] transition-colors">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                    <span className="text-stone-200 text-sm md:text-base font-medium pr-4">{faq.q}</span>
                    <ChevronRight size={16} className="text-stone-500 shrink-0 transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-stone-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </ScrollSection>
            ))}
          </div>
        </section>

        {/* ═══ DISCLAIMER ═══ */}
        <ScrollSection className="max-w-4xl mx-auto px-6 pb-24" isOdd={false}>
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                <AlertTriangle className="text-amber-400" size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-300 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Aviso Legal</h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Este conteúdo é <strong className="text-stone-300">estritamente educacional e analítico</strong>.
                  Todas as plataformas listadas são empresas reguladas em suas jurisdições.
                  Nenhum conteúdo aqui constitui recomendação de evasão fiscal ou atividade ilícita.
                  Consulte sempre um profissional qualificado antes de tomar decisões financeiras.
                </p>
              </div>
            </div>
          </div>
        </ScrollSection>

        <footer className="border-t border-white/[0.04] py-12 text-center" style={{ background: '#050808' }}>
          <p className="text-stone-600 text-[10px] tracking-[0.3em] uppercase">Contas Offshore Cripto · Privacidade · Soberania · Ranking Técnico</p>
        </footer>
      </div>
      <LeadCaptureModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} interesse="assessoria-offshore-ranking" />
    </>
  );
};

export default ContasOffshore;
