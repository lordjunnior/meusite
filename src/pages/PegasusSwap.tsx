import PageFloatingToc from "@/components/PageFloatingToc";
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import {
  Shield, ChevronRight, AlertTriangle, Lock, Eye, EyeOff,
  CheckCircle, XCircle, ExternalLink, ChevronDown,
  Globe, Smartphone, DollarSign, Banknote,
  Check, X, HelpCircle, Zap, AlertOctagon,
  ArrowRight, ArrowLeftRight, RefreshCw, Clock,
  ShieldCheck, Hash, Coins, Layers, Star,
  Gauge, Search, FileWarning, Ban,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import NobelVFX from '@/components/NobelVFX';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import heroImg from '@/assets/pegasusswap-hero.jpg';
import tutorialImg from '@/assets/pegasusswap-tutorial.jpg';
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
              className="text-[10px] font-bold tracking-[0.5em] uppercase text-purple-400/70 mb-4 relative z-10">Capitulo {number}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white relative z-10 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</motion.h2>
            <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="h-px w-40 mx-auto mt-8 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent origin-center relative z-10" />
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
  { label: 'Plataforma', value: 'PegasusSwap', icon: ArrowLeftRight },
  { label: 'Tipo', value: 'Swap Instantaneo (Crypto-to-Crypto)', icon: RefreshCw },
  { label: 'KYC', value: 'Nenhum — sem registro, sem documento', icon: EyeOff },
  { label: 'Criptomoedas', value: '1.000+ ativos suportados', icon: Coins },
  { label: 'Redes', value: 'BTC, ETH, TRC20, ERC20, BSC e 50+ redes', icon: Layers },
  { label: 'Taxas', value: '1% a 1.5% por operacao', icon: Gauge },
  { label: 'Cotacao', value: 'Flutuante ou Fixa (voce escolhe)', icon: ArrowLeftRight },
  { label: 'Score KYCNot.me', value: '7/10 (Good) — Privacy 61, Trust 82', icon: Star },
];

const STEPS = [
  { step: '01', title: 'Acesse pegasusswap.com', desc: 'Entre no site oficial da PegasusSwap. Nao precisa criar conta, nao precisa de e-mail, nao precisa de nada. A interface e limpa e direta — voce ja cai na tela de swap. Se quiser um nivel extra de privacidade, acesse via Tor Browser ou VPN.' },
  { step: '02', title: 'Selecione o par de conversao', desc: 'Escolha a moeda que voce quer enviar (ex: USDT na rede ERC20) e a moeda que deseja receber (ex: Bitcoin na rede principal). A plataforma suporta mais de 1.000 ativos em dezenas de redes. Voce pode alternar entre cotacao flutuante (ajusta com o mercado) e cotacao fixa (trava o preco no momento).' },
  { step: '03', title: 'Insira seu endereco de recebimento', desc: 'Cole o endereco da sua wallet onde deseja receber os fundos. Confira o endereco com atencao — transacoes em blockchain sao irreversiveis. Nas configuracoes adicionais, voce pode inserir um endereco de reembolso (caso a transacao falhe) e um e-mail para acompanhar o status.' },
  { step: '04', title: 'Clique em Swap e envie os fundos', desc: 'A PegasusSwap vai gerar um endereco de deposito e um timer (geralmente 30 minutos). Envie o valor exato para o endereco indicado. Apos as confirmacoes da rede (7 confirmacoes para USDT/ERC20), o swap e processado automaticamente e os fundos chegam na sua wallet.' },
  { step: '05', title: 'Receba e verifique na blockchain', desc: 'Apos a conclusao, voce recebe a hash da transacao de saida. Verifique diretamente na blockchain que os fundos chegaram. Todo o processo leva de 5 a 30 minutos, dependendo da rede e do congestionamento.' },
];

const COMPETITORS = [
  {
    name: 'FixedFloat',
    taxa: '0.5% - 1%',
    kyc: 'KYC oculto',
    problema: 'Bloqueia fundos apos multiplas transacoes ou volumes "atipicos". Pede documentos retroativamente. Analise pode levar semanas com fundos travados.',
    veredicto: 'Nao recomendado',
    icon: Ban,
    color: 'red',
  },
  {
    name: 'SimpleSwap',
    taxa: '~1%',
    kyc: 'Variavel',
    problema: 'Nao menciona explicitamente "sem KYC". Pode solicitar verificacao em transacoes de maior valor. Custodial temporario.',
    veredicto: 'Use com cautela',
    icon: FileWarning,
    color: 'amber',
  },
  {
    name: 'SideShift AI',
    taxa: '~1%',
    kyc: 'Variavel',
    problema: 'Historico de bloqueio de fundos vindos de CoinJoin ou mixers. Tem AML interno. Nao e transparente sobre politica de bloqueio.',
    veredicto: 'Use com cautela',
    icon: FileWarning,
    color: 'amber',
  },
  {
    name: 'PegasusSwap',
    taxa: '1% - 1.5%',
    kyc: 'Nenhum',
    problema: 'Taxa levemente mais alta que concorrentes, mas sem KYC oculto. Verificada pelo KYCNot.me. Oferece check AML gratuito antes do deposito.',
    veredicto: 'Recomendado',
    icon: ShieldCheck,
    color: 'purple',
  },
];

const PROS = [
  'Sem KYC real — nenhum registro, nenhum documento, nenhum e-mail obrigatorio',
  'Verificada pelo KYCNot.me com score 7/10 (Good) e Trust 82/100',
  '1.000+ criptomoedas em 50+ redes, incluindo Monero (XMR) para privacidade maxima',
  'Cotacao fixa ou flutuante — voce decide o nivel de risco',
  'Check AML gratuito antes do deposito — garante que seus fundos nao serao bloqueados',
  'Interface limpa, rapida e funcional — sem JavaScript obrigatorio',
  'Suporte ao cliente rapido e eficiente (Telegram @pegasusswap_support)',
  'Programa de afiliados com comissoes atrativas',
];

const CONS = [
  'Taxa entre 1% e 1.5% — levemente acima de alguns concorrentes (FixedFloat cobra 0.5-1%)',
  'Nao suporta Bitcoin na Lightning Network ou na rede Liquid',
  'Pode cooperar com autoridades em casos extremos (nivel 2/4 no KYCNot.me)',
  'Sem suporte a Fiat — opera exclusivamente crypto-to-crypto',
  'Minimo por transacao pode variar dependendo da rede e do par',
  'Plataforma relativamente nova comparada a concorrentes estabelecidos',
];

const SWAPS_POPULARES = [
  { de: 'USDT (ERC20)', para: 'Bitcoin (BTC)', caso: 'Converter stablecoins em BTC sem rastro' },
  { de: 'Bitcoin (BTC)', para: 'Monero (XMR)', caso: 'Adicionar camada de privacidade ao seu stack' },
  { de: 'ETH', para: 'BTC', caso: 'Rebalancear portfolio rapidamente' },
  { de: 'USDT/USDC', para: 'XMR', caso: 'Off-ramp privado de stablecoins' },
  { de: 'BTC', para: 'USDT (TRC20)', caso: 'Converter para stable com taxa de rede baixa' },
  { de: 'XMR', para: 'BTC', caso: 'Sair do Monero para Bitcoin limpo' },
];

const FAQ_DATA = [
  { q: 'O que e a PegasusSwap?', a: 'PegasusSwap e uma plataforma de swap instantaneo de criptomoedas que opera sem KYC, sem registro e sem necessidade de documentos. Voce escolhe o par de conversao, insere o endereco de recebimento, envia os fundos e recebe automaticamente — tudo em minutos, com suporte a mais de 1.000 ativos.' },
  { q: 'A PegasusSwap e segura?', a: 'Sim. A plataforma e verificada pelo KYCNot.me com score de Trust 82/100 e Overall 7/10. Possui avaliacao 4.8/5 no proprio site com 200+ reviews e 4.0/5 no Trustpilot. Oferece check AML gratuito antes do deposito para garantir que seus fundos nao serao bloqueados.' },
  { q: 'Qual a diferenca entre cotacao fixa e flutuante?', a: 'Na cotacao flutuante, o preco ajusta conforme o mercado — voce pode receber um pouco mais ou menos do que o estimado. Na cotacao fixa, o preco e travado no momento da ordem e voce recebe exatamente o valor mostrado. A fixa tende a ter uma taxa levemente maior para compensar o risco da plataforma.' },
  { q: 'A PegasusSwap bloqueia fundos como a FixedFloat?', a: 'Essa e a diferenca fundamental. A PegasusSwap esta no nivel 2/4 do KYCNot.me ("KYC on authorities request"), o que significa que nao faz KYC rotineiro. Diferente da FixedFloat, que bloqueia fundos proativamente apos multiplas transacoes ou volumes atipicos, a PegasusSwap oferece um check AML gratuito antes do deposito — se os fundos passarem, a transacao e processada sem interrupcoes.' },
  { q: 'Quais criptomoedas sao suportadas?', a: 'Mais de 1.000 ativos, incluindo Bitcoin (BTC), Ethereum (ETH), Monero (XMR), USDT em varias redes (ERC20, TRC20, BSC), Litecoin, Solana, XRP e centenas de altcoins. O suporte a Monero e especialmente relevante para quem busca privacidade maxima.' },
  { q: 'A PegasusSwap aceita Monero (XMR)?', a: 'Sim — e esse e um dos maiores diferenciais. O par BTC → XMR permite que voce adicione uma camada de privacidade criptografica ao seu stack. Monero utiliza ring signatures, stealth addresses e RingCT para tornar transacoes virtualmente inrastreaveis.' },
  { q: 'Por que a taxa da PegasusSwap e mais alta que a FixedFloat?', a: 'Porque a PegasusSwap nao monetiza seus dados. Plataformas com taxas mais baixas frequentemente compensam com analytics de transacao, bloqueio de fundos ou KYC retroativo. A taxa de 1-1.5% da PegasusSwap e o preco da privacidade real — sem surpresas, sem documentos pedidos depois.' },
  { q: 'Preciso criar conta para usar?', a: 'Nao. Nenhum registro, nenhum e-mail obrigatorio, nenhum documento. Voce acessa o site, escolhe o par, cola o endereco e faz o swap. Opcionalmente, pode adicionar um e-mail para receber notificacoes de status.' },
  { q: 'O que acontece se a transacao falhar?', a: 'Nas configuracoes adicionais, voce pode inserir um endereco de reembolso. Se a transacao nao puder ser completada (ex: valor abaixo do minimo, problema na rede), os fundos sao devolvidos automaticamente para esse endereco. Se nao informar um endereco de reembolso, entre em contato com o suporte no Telegram (@pegasusswap_support).' },
  { q: 'Qual o valor minimo para fazer swap?', a: 'O minimo varia dependendo do par e da rede. Para USDT (ERC20) para BTC, o minimo gira em torno de 10-11 USDT, considerando as taxas de rede. A interface mostra o valor minimo em tempo real quando voce seleciona o par.' },
];

/* ═══ AFFILIATE LINK ═══ */
const AFFILIATE_URL = 'https://pegasusswap.com/?ref=QBSTBG9';

/* ═══ COMPONENT ═══ */

const TOC_ITEMS = [
  { id: "ficha", label: "Ficha Técnica" },
  { id: "tutorial", label: "Tutorial" },
  { id: "pares", label: "Pares Suportados" },
  { id: "comparativo", label: "Comparativo" },
  { id: "analise", label: "Prós e Contras" },
  { id: "veredicto", label: "Veredicto" },
  { id: "faq", label: "FAQ" },
];

export default function PegasusSwap() {
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

  /* ── Reading Progress ── */
  const [readProgress, setReadProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    headline: 'PegasusSwap — Exchange Cripto Sem KYC com 1.000+ Ativos',
    description: 'Review completo da PegasusSwap: como fazer swap de criptomoedas sem KYC, sem registro e sem documentos. Comparativo com FixedFloat, SimpleSwap e SideShift.',
    author: { '@type': 'Person', name: 'Lord Junnior' },
    publisher: { '@type': 'Organization', name: 'Lord Junnior' },
    datePublished: '2026-03-08',
    dateModified: '2026-03-08',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lordjunnior.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Soberania Financeira', item: 'https://lordjunnior.com.br/soberania-financeira' },
      { '@type': 'ListItem', position: 3, name: 'Exchanges sem KYC', item: 'https://lordjunnior.com.br/soberania-financeira/exchanges-privacidade-e-kyc' },
      { '@type': 'ListItem', position: 4, name: 'PegasusSwap', item: 'https://lordjunnior.com.br/soberania-financeira/exchanges-privacidade-e-kyc/pegasus-swap' },
    ],
  };

  return (
    <>
      <Helmet>
        <title>PegasusSwap — Exchange Cripto Sem KYC com 1.000+ Ativos | Lord Junnior</title>
        <meta name="description" content="Review completo da PegasusSwap: swap instantaneo de 1.000+ criptomoedas sem KYC, sem registro, sem documentos. Comparativo com FixedFloat e analise de privacidade." />
        <meta property="og:title" content="PegasusSwap — Swap Cripto Instantaneo Sem KYC" />
        <meta property="og:description" content="1.000+ criptomoedas. Sem registro. Sem documentos. Swap em minutos com privacidade real." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/exchanges-privacidade-e-kyc/pegasus-swap" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="cyan" />
      <ScrollToTop />
      <LeadCaptureModal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} interesse="assessoria-pegasusswap" />

      {/* ── Reading Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]" style={{ background: 'rgba(5,8,8,0.5)' }}>
        <motion.div className="h-full origin-left" style={{ scaleX: readProgress / 100, background: 'linear-gradient(90deg, #a855f7, #c084fc, #e9d5ff)' }} />
      </div>

      <div className="min-h-screen" style={{ background: '#050808' }}>
        <NobelVFX accentColor="purple" />

        {/* ═══ NAVIGATION BAR ═══ */}
        <AnimatePresence>
          {scrolled && (
            <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
              className="fixed top-1 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(5,8,8,0.85)', backdropFilter: 'blur(20px) saturate(1.5)' }}>
              <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                <Link to="/soberania-financeira/exchanges-privacidade-e-kyc" className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-xs font-bold tracking-wider uppercase">
                  <ChevronRight size={12} className="rotate-180" /> Exchanges sem KYC
                </Link>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-purple-500/60 font-mono">PegasusSwap</span>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* ═══ HERO ═══ */}
        <div ref={heroRef} className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroImgY, scale: heroImgScale }}>
            <img src={heroImg} alt="PegasusSwap exchange cripto sem KYC" className="w-full h-full object-cover" style={{ filter: 'brightness(0.4) saturate(0.8)' }} loading="eager" fetchPriority="high" decoding="async" />
          </motion.div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, transparent 30%, rgba(5,8,8,0.6) 60%, #050808 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 45%, transparent 30%, rgba(5,8,8,0.9) 100%)' }} />

          {/* Film Grain */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '150px' }} />

          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-center">
            <div className="max-w-5xl mx-auto px-6 w-full">
              <motion.div initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }} animate={heroInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 1.2, ease: EASE }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-gradient-to-r from-purple-500 to-transparent" />
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase text-purple-400/80 font-mono">Review Operacional</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="text-white">Swap cripto</span><br />
                  <span className="text-purple-400">sem KYC</span><br />
                  <span className="text-white">com </span>
                  <span className="text-purple-400">1.000+ ativos</span>
                </h1>

                <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                  A <strong className="text-stone-200">PegasusSwap</strong> permite trocar criptomoedas instantaneamente — sem registro, sem documentos, sem e-mail.
                  Enquanto plataformas como a FixedFloat bloqueiam seus fundos por "comportamento atipico", a PegasusSwap oferece
                  <strong className="text-purple-300"> check AML gratuito antes do deposito</strong> para garantir que sua transacao sera processada sem surpresas.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href={AFFILIATE_URL} target="_blank" rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/40 text-purple-200 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                    <span className="absolute inset-0 bg-purple-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative">Acessar PegasusSwap</span><ExternalLink size={14} className="relative" />
                  </a>
                  <a href="#tutorial"
                    className="inline-flex items-center gap-2 border border-white/[0.08] text-stone-400 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors">
                    Ver tutorial completo <ChevronDown size={14} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ═══ SOVEREIGN DISCLAIMER ═══ */}
        <div className="px-6 md:px-12 lg:px-20">
          <SovereignDisclaimer variant="exchange" />
        </div>

        {/* ═══ CH01 — FICHA TECNICA ═══ */}
        <ChapterKickoff number="01" title="O que e a PegasusSwap" image={heroImg} id="ficha" isOdd />
        <ScrollSection isOdd className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              <strong className="text-stone-200">PegasusSwap</strong> e uma plataforma de swap instantaneo de criptomoedas que leva a serio o que a maioria
              das exchanges apenas finge oferecer: <strong className="text-purple-300">privacidade real</strong>. Sem registro. Sem e-mail obrigatorio.
              Sem selfie com documento. Voce acessa, escolhe o par, cola o endereco e faz o swap.
            </motion.p>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              Com suporte a <strong className="text-stone-200">mais de 1.000 criptomoedas</strong> em dezenas de redes (incluindo Monero, a moeda mais
              privada do mercado), a PegasusSwap atende desde quem quer simplesmente converter USDT em Bitcoin ate quem precisa
              de uma camada robusta de privacidade criptografica via XMR.
            </motion.p>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              A plataforma e <strong className="text-purple-300">verificada pelo KYCNot.me</strong> — o diretorio mais respeitado de servicos sem KYC — com
              score Overall de 7/10, Privacy de 61 e Trust de 82. Isso a coloca acima de concorrentes como FixedFloat em transparencia
              e honestidade sobre politicas de verificacao.
            </motion.p>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              O diferencial critico? A PegasusSwap oferece um <strong className="text-stone-200">check AML gratuito antes do deposito</strong>. Voce pode
              verificar se seus fundos vao ser aceitos <em>antes</em> de envia-los — algo que nenhum concorrente mainstream oferece.
              Isso elimina o pesadelo de ter fundos travados por semanas esperando "analise".
            </motion.p>

            <motion.div variants={staggerChild} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SPECS.map((s, i) => (
                <div key={i} className="group border border-white/[0.06] rounded-xl p-5 hover:border-purple-500/20 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center shrink-0" style={{ background: 'rgba(168,85,247,0.08)' }}>
                      <s.icon size={16} className="text-purple-400/70" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-0.5">{s.label}</p>
                      <p className="text-xs text-stone-300 leading-relaxed">{s.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH02 — TUTORIAL ═══ */}
        <ChapterKickoff number="02" title="Como Fazer Swap na Pratica" image={tutorialImg} id="tutorial" isOdd={false} />
        <ScrollSection isOdd={false} className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              O processo e direto e leva menos de 5 minutos do inicio ao fim. Sem cadastro, sem espera de aprovacao, sem KYC.
              Aqui esta o passo a passo exato para executar um swap na PegasusSwap:
            </motion.p>

            <div className="space-y-6">
              {STEPS.map((s, i) => (
                <motion.div key={i} variants={staggerChild} className="relative border border-white/[0.06] rounded-xl p-7 group hover:border-purple-500/15 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl border border-purple-500/20 flex items-center justify-center shrink-0" style={{ background: 'rgba(168,85,247,0.08)' }}>
                      <span className="text-sm font-black text-purple-400 font-mono">{s.step}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-200 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</h3>
                      <p className="text-sm text-stone-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dica extra */}
            <motion.div variants={staggerChild} className="mt-10 border border-purple-500/20 rounded-xl p-6 flex items-start gap-4" style={{ background: 'rgba(168,85,247,0.04)' }}>
              <Zap size={20} className="text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-purple-300 mb-1">Dica de privacidade</p>
                <p className="text-sm text-stone-400 leading-relaxed">
                  Para privacidade maxima, use o par <strong className="text-stone-300">BTC → XMR</strong> (Bitcoin para Monero). Monero utiliza
                  ring signatures e stealth addresses, tornando transacoes virtualmente inrastreaveis. Apos receber XMR,
                  voce pode converter de volta para BTC em uma nova transacao — agora com historico limpo.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH03 — SWAPS POPULARES ═══ */}
        <ChapterKickoff number="03" title="Pares Mais Usados" image={heroImg} id="pares" isOdd />
        <ScrollSection isOdd className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              A PegasusSwap suporta mais de 1.000 pares, mas estes sao os mais utilizados por quem prioriza privacidade e eficiencia:
            </motion.p>

            <motion.div variants={staggerChild} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SWAPS_POPULARES.map((s, i) => (
                <div key={i} className="border border-white/[0.06] rounded-xl p-5 hover:border-purple-500/15 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-black text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded font-mono">{s.de}</span>
                    <ArrowRight size={14} className="text-stone-500" />
                    <span className="text-xs font-black text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded font-mono">{s.para}</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">{s.caso}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH04 — COMPARATIVO ═══ */}
        <ChapterKickoff number="04" title="Por Que Nao Usar a FixedFloat" image={tutorialImg} id="comparativo" isOdd={false} />
        <ScrollSection isOdd={false} className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              A maioria das exchanges "sem KYC" tem um segredo sujo: elas <strong className="text-stone-200">nao mencionam a palavra "sem KYC"</strong> nos
              seus termos. E quando uma plataforma nao fala explicitamente sobre privacidade, significa que provavelmente existe
              um processo de verificacao escondido que vai te surpreender no pior momento.
            </motion.p>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              A <strong className="text-red-300">FixedFloat</strong> e o exemplo classico: taxa atrativa de 0.5-1%, interface bonita, mas depois de algumas
              transacoes ou volumes maiores, ela comeca a pedir documentos. Seus fundos ficam travados por semanas enquanto a
              "analise" nao termina. Isso vai contra a logica — uma exchange deveria <em>querer</em> que voce faca mais transacoes,
              nao puni-lo por isso.
            </motion.p>

            <motion.div variants={staggerChild} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMPETITORS.map((c, i) => (
                <div key={i} className={`border rounded-xl p-6 transition-colors ${
                  c.color === 'purple' ? 'border-purple-500/30 hover:border-purple-500/50' :
                  c.color === 'red' ? 'border-red-500/15 hover:border-red-500/30' :
                  'border-amber-500/15 hover:border-amber-500/30'
                }`} style={{ background: c.color === 'purple' ? 'rgba(168,85,247,0.05)' : c.color === 'red' ? 'rgba(239,68,68,0.03)' : 'rgba(245,158,11,0.03)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      c.color === 'purple' ? 'bg-purple-500/15' : c.color === 'red' ? 'bg-red-500/15' : 'bg-amber-500/15'
                    }`}>
                      <c.icon size={16} className={
                        c.color === 'purple' ? 'text-purple-400' : c.color === 'red' ? 'text-red-400' : 'text-amber-400'
                      } />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-200">{c.name}</h3>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[9px] font-bold tracking-wider uppercase text-stone-500">Taxa: {c.taxa}</span>
                        <span className={`text-[9px] font-bold tracking-wider uppercase ${
                          c.color === 'purple' ? 'text-purple-400' : c.color === 'red' ? 'text-red-400' : 'text-amber-400'
                        }`}>KYC: {c.kyc}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-stone-400 leading-relaxed mb-3">{c.problema}</p>
                  <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
                    c.color === 'purple' ? 'text-purple-300' : c.color === 'red' ? 'text-red-300' : 'text-amber-300'
                  }`}>
                    {c.color === 'purple' ? <CheckCircle size={12} /> : c.color === 'red' ? <XCircle size={12} /> : <AlertTriangle size={12} />}
                    {c.veredicto}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* MX Global mention */}
            <motion.div variants={staggerChild} className="mt-8 border border-white/[0.06] rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-sm text-stone-400 leading-relaxed">
                <strong className="text-stone-200">Nota sobre MEXC Global:</strong> Para quem busca uma exchange centralizada sem KYC para trading crypto-to-crypto,
                a MEXC Global permite negociar e sacar ate 2 BTC por dia sem verificacao, com taxas de apenas 0.15%. Nao e um swap service como
                a PegasusSwap, mas pode ser complementar para quem faz trading ativo.
              </p>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH05 — PRÓS E CONTRAS ═══ */}
        <ChapterKickoff number="05" title="Pros e Contras" image={heroImg} id="analise" isOdd />
        <ScrollSection isOdd className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prós */}
              <motion.div variants={staggerChild} className="border border-purple-500/10 rounded-xl p-7" style={{ background: 'rgba(168,85,247,0.03)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center"><Check size={16} className="text-purple-400" /></div>
                  <h3 className="text-lg font-bold text-stone-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Vantagens</h3>
                </div>
                <div className="space-y-3">
                  {PROS.map((p, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className="text-purple-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-stone-400 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contras */}
              <motion.div variants={staggerChild} className="border border-red-500/10 rounded-xl p-7" style={{ background: 'rgba(239,68,68,0.03)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center"><X size={16} className="text-red-400" /></div>
                  <h3 className="text-lg font-bold text-stone-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Limitacoes</h3>
                </div>
                <div className="space-y-3">
                  {CONS.map((c, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <XCircle size={14} className="text-red-400/70 mt-0.5 shrink-0" />
                      <p className="text-sm text-stone-400 leading-relaxed">{c}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH06 — VEREDICTO ═══ */}
        <ChapterKickoff number="06" title="Veredicto Editorial" image={tutorialImg} id="veredicto" isOdd={false} />
        <ScrollSection isOdd={false} className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.div variants={staggerChild} className="border border-purple-500/20 rounded-2xl p-8 md:p-12" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.06), rgba(168,85,247,0.02))' }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-purple-500/15 flex items-center justify-center border border-purple-500/30">
                  <ShieldCheck size={28} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Recomendada</h3>
                  <p className="text-sm text-purple-300/80">Para swaps crypto-to-crypto com privacidade</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <p className="text-stone-400 text-base leading-relaxed">
                  A PegasusSwap nao e a mais barata. A taxa de 1-1.5% e superior a concorrentes como FixedFloat (0.5-1%).
                  Mas essa diferenca de taxa e o <strong className="text-stone-200">preco da privacidade real</strong>.
                </p>
                <p className="text-stone-400 text-base leading-relaxed">
                  Enquanto a FixedFloat bloqueia fundos retroativamente e pede documentos apos volumes "atipicos", a PegasusSwap
                  oferece um check AML <em>antes</em> do deposito. Se os fundos passarem, a transacao e garantida. Sem surpresas.
                  Sem e-mails pedindo selfie com documento. Sem semanas de espera.
                </p>
                <p className="text-stone-400 text-base leading-relaxed">
                  Para quem prioriza privacidade acima de economia de 0.5% em taxa, a PegasusSwap e a escolha mais inteligente
                  entre os swap services disponiveis em 2026. Combinada com Monero (XMR) para quebra de rastro, ela se torna
                  uma ferramenta poderosa no arsenal de soberania financeira.
                </p>
              </div>

              {/* CTA Breathing */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={AFFILIATE_URL} target="_blank" rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 bg-purple-500/20 border border-purple-500/50 text-purple-100 font-bold text-sm uppercase tracking-wider px-10 py-5 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(168,85,247,0.4)] hover:border-purple-400/70">
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="absolute inset-0 rounded-xl" style={{ boxShadow: '0 0 20px rgba(168,85,247,0.15)', animation: 'pulse 3s ease-in-out infinite' }} />
                  <span className="relative">Acessar PegasusSwap</span>
                  <ExternalLink size={14} className="relative" />
                </a>
                <button onClick={() => setLeadModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 border border-white/[0.08] text-stone-400 font-bold text-sm uppercase tracking-wider px-10 py-5 rounded-xl hover:border-white/20 hover:text-white transition-colors">
                  Assessoria Privada <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>

            {/* Alert - Spike to Spike */}
            <motion.div variants={staggerChild} className="mt-8 border border-amber-500/20 rounded-xl p-6 flex items-start gap-4" style={{ background: 'rgba(245,158,11,0.04)' }}>
              <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-300 mb-1">PegasusSwap nao substitui tudo</p>
                <p className="text-sm text-stone-400 leading-relaxed">
                  A PegasusSwap opera exclusivamente <strong className="text-stone-300">crypto-to-crypto</strong>. Se voce precisa comprar Bitcoin com
                  dinheiro vivo (Fiat → BTC), utilize a <Link to="/pix-cripto" className="text-purple-400 underline hover:text-purple-300">Spike to Spike</Link>.
                  Se precisa vender cripto e receber dinheiro fisico na porta, utilize a{' '}
                  <Link to="/soberania-financeira/exchanges-privacidade-e-kyc/optima-exchange" className="text-purple-400 underline hover:text-purple-300">Optima Exchange</Link>.
                  Cada ferramenta serve um proposito especifico no arsenal de soberania.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH07 — FAQ ═══ */}
        <ChapterKickoff number="07" title="Perguntas Frequentes" image={heroImg} id="faq" isOdd />
        <ScrollSection isOdd className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_DATA.map((f, i) => (
                <motion.div key={i} variants={staggerChild}>
                  <AccordionItem value={`faq-${i}`} className="border border-white/[0.06] rounded-xl px-6 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <AccordionTrigger className="text-sm font-bold text-stone-200 hover:text-purple-300 transition-colors py-5 text-left [&[data-state=open]]:text-purple-300">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-stone-400 leading-relaxed pb-5">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </ScrollSection>

        {/* ═══ FINAL CTA ═══ */}
        <div style={{ background: '#050808' }} className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
              <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-purple-400/60 mb-4 font-mono">Soberania Financeira</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Sua privacidade tem preco.<br />
                <span className="text-purple-400">E e mais barato do que voce imagina.</span>
              </h2>
              <p className="text-stone-400 text-base leading-relaxed max-w-2xl mx-auto mb-10">
                1-1.5% por transacao e o custo de nao ter seus fundos bloqueados, seus dados vendidos ou sua identidade exposta.
                A PegasusSwap e a ferramenta. A decisao e sua.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={AFFILIATE_URL} target="_blank" rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 bg-purple-500/20 border border-purple-500/50 text-purple-100 font-bold text-sm uppercase tracking-wider px-10 py-5 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(168,85,247,0.4)]">
                  <span className="absolute inset-0 bg-purple-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">Comecar Agora</span><ExternalLink size={14} className="relative" />
                </a>
                <Link to="/soberania-financeira/exchanges-privacidade-e-kyc"
                  className="inline-flex items-center justify-center gap-2 border border-white/[0.08] text-stone-400 font-bold text-sm uppercase tracking-wider px-10 py-5 rounded-xl hover:border-white/20 hover:text-white transition-colors">
                  <ChevronRight size={14} className="rotate-180" /> Voltar ao Hub
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </>
  );
}
