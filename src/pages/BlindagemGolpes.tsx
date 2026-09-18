import PageFloatingToc from "@/components/PageFloatingToc";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, ShieldAlert, AlertTriangle, Lock, Eye,
  Smartphone, Link2, UserX, Bot, TrendingUp, CheckCircle, KeyRound,
  Shield, Fingerprint, Skull, Phone, Mail, Globe, Wifi,
  CreditCard, Users, FileWarning, Radio, Zap, Copy, Check,
  X, QrCode, MessageSquare, Banknote, Scale, Search,
  ChevronDown, Target, Crosshair, ShieldOff, BrainCircuit,
  Siren, Sparkles, Hash, Network, Server
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import bgBlindagem from '@/assets/backgrounds/bg-blindagem.webp';
import qrCodeImage from '@/assets/qrcode-lightning.webp';
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

/* ─── CONSTANTS ─── */
const LIGHTNING_ADDRESS = "securecorn53@walletofsatoshi.com";
const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const BG_DARK = '#050808';
const BG_ALT = '#070b0b';
const BG_DEEP = '#040606';

/* ─── ANIMATIONS ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

/* ─── MOUSE PARALLAX ─── */
function useMouseParallax(strength = 15) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const handleMouse = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(((e.clientX - cx) / cx) * strength);
    mouseY.set(((e.clientY - cy) / cy) * strength);
  }, [mouseX, mouseY, strength]);
  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);
  return { springX, springY };
}

/* ─── ANIMATED SECTION ─── */
const AnimatedSection = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`scroll-mt-24 ${className}`}
    >
      {children}
    </motion.section>
  );
};

/* ─── SECTION DIVIDER ─── */

const TOC_ITEMS = [
  { id: "impacto", label: "Impacto" },
  { id: "timeline", label: "Timeline" },
  { id: "vetores", label: "Vetores de Ataque" },
  { id: "anatomia", label: "Anatomia do Golpe" },
  { id: "defesa", label: "Defesa" },
  { id: "codigo", label: "Código de Conduta" },
  { id: "checklist", label: "Checklist" },
  { id: "conclusao", label: "Conclusão" },
];

const SectionDivider = () => (
  <div className="relative my-20 lg:my-28">
    <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-red-500/5 border border-red-500/15"
      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

/* ─── NAV ITEMS ─── */
const NAV_ITEMS = [
  { id: 'impacto', label: 'O Elo Fraco' },
  { id: 'timeline', label: 'Linha do Tempo' },
  { id: 'vetores', label: 'Vetores de Ataque' },
  { id: 'anatomia', label: 'Anatomia do Golpe' },
  { id: 'defesa', label: 'Arsenal de Defesa' },
  { id: 'codigo', label: 'Código de Conduta' },
  { id: 'checklist', label: 'Checklist Tático' },
  { id: 'conclusao', label: 'Não Confie, Verifique' },
];

/* ─── TIMELINE DATA ─── */
const timelineEvents = [
  { year: '2011', title: 'Mt. Gox — Primeiro grande hack', loss: '850.000 BTC', desc: 'A maior exchange da época foi hackeada repetidamente ao longo de anos. Usuários confiaram a custódia a terceiros e perderam tudo.' },
  { year: '2014', title: 'Mt. Gox declara falência', loss: 'US$ 460M', desc: 'O colapso final revelou que 850 mil bitcoins haviam sido drenados. Lição: custódia própria é a única segurança real.' },
  { year: '2016', title: 'Bitfinex — Hack via multisig', loss: '120.000 BTC', desc: 'Hackers comprometeram as chaves de assinatura múltipla. Hot wallets foram drenadas em minutos.' },
  { year: '2017', title: 'Bitconnect — Pirâmide de US$ 2.5 bi', loss: 'US$ 2.5B', desc: 'Prometia 1% de rendimento diário. O clássico Ponzi cripto que destruiu milhares de famílias. "Hey hey hey!"' },
  { year: '2018', title: 'Coincheck — Maior hack NEM', loss: 'US$ 530M', desc: 'Tokens NEM armazenados em hot wallet sem multisig. Negligência operacional básica.' },
  { year: '2019', title: 'QuadrigaCX — CEO "morre" com as chaves', loss: 'US$ 190M', desc: 'O fundador supostamente morreu levando as chaves privadas. Na verdade, era um golpe elaborado desde o início.' },
  { year: '2020', title: 'Twitter Hack — Engenharia social', loss: 'US$ 120K', desc: 'Hackers acessaram contas de Elon Musk, Obama e Apple pedindo Bitcoin. Engenharia social contra funcionários do Twitter.' },
  { year: '2022', title: 'FTX — Colapso de US$ 8 bilhões', loss: 'US$ 8B', desc: 'Sam Bankman-Fried desviou fundos de clientes para apostas especulativas. A maior fraude cripto da história.' },
  { year: '2022', title: 'Terra/Luna — US$ 40 bi evaporados', loss: 'US$ 40B', desc: 'A stablecoin algorítmica colapsou em dias, levando todo o ecossistema. Promessas de "rendimento garantido" de 20% via Anchor.' },
  { year: '2023', title: 'Euler Finance — Flash loan', loss: 'US$ 197M', desc: 'Exploit via empréstimo relâmpago em protocolo DeFi. Código auditado, mas com vulnerabilidade não detectada.' },
  { year: '2024', title: 'Deepfakes com IA — Nova era', loss: 'Incalculável', desc: 'Vídeos falsos de Michael Saylor, Elon Musk e CZ prometendo "dobrar bitcoins". IA generativa tornou golpes indistinguíveis.' },
];

/* ─── VETORES DATA ─── */
const vetoresData = [
  {
    icon: Mail, title: 'Phishing', severity: 'Crítico',
    desc: 'E-mails, SMS e sites falsos que imitam sua exchange ou carteira. O atacante clona a interface pixel por pixel e coleta suas credenciais.',
    examples: ['E-mail "Binance: verificação urgente necessária"', 'Site clone com URL quase idêntica (binnance.com)', 'SMS falso de "autenticação 2FA"'],
    defense: 'Salve URLs nos favoritos. Nunca clique em links de e-mails. Verifique o certificado SSL.',
  },
  {
    icon: Bot, title: 'Deepfakes e IA', severity: 'Crítico',
    desc: 'Vídeos gerados por IA com rostos e vozes de figuras conhecidas prometendo "dobrar seus bitcoins". Indistinguíveis do real.',
    examples: ['Live falsa de Elon Musk no YouTube', 'Voz clonada de CEO pedindo transferência', 'Perfis falsos com verificação azul'],
    defense: 'Se parece bom demais para ser verdade, é golpe. Ninguém legítimo pede que você envie BTC primeiro.',
  },
  {
    icon: TrendingUp, title: 'Esquemas Ponzi', severity: 'Alto',
    desc: 'Plataformas que prometem "lucro garantido" ou rendimentos astronômicos. Pagam juros com dinheiro de novos investidores até o colapso.',
    examples: ['Bitconnect (1% ao dia)', 'OneCoin (US$ 4B em fraude)', 'Unick Forex (R$ 12B no Brasil)'],
    defense: 'Lucro garantido não existe. O rendimento vem da valorização + tempo, não de promessas.',
  },
  {
    icon: Phone, title: 'SIM Swap', severity: 'Alto',
    desc: 'O atacante convence sua operadora a transferir seu número para outro chip. Com isso, recebe seus códigos 2FA via SMS e acessa suas contas.',
    examples: ['Ligação para operadora se passando por você', 'Suborno de funcionários de telecom', 'Ataque combinado com phishing'],
    defense: 'NUNCA use 2FA via SMS. Use app autenticador (Aegis, Google Authenticator). Coloque PIN na operadora.',
  },
  {
    icon: Globe, title: 'Rug Pull (DeFi)', severity: 'Alto',
    desc: 'Criadores de tokens ou pools de liquidez retiram toda a liquidez de repente, levando o dinheiro dos investidores.',
    examples: ['Squid Game Token (US$ 3.3M)', 'AnubisDAO (US$ 60M)', 'Tokens com função "mint" oculta no contrato'],
    defense: 'Verifique se o contrato foi auditado. Desconfie de tokens novos com hype excessivo. Leia o código.',
  },
  {
    icon: Wifi, title: 'Man-in-the-Middle', severity: 'Médio',
    desc: 'Redes Wi-Fi públicas comprometidas interceptam suas transações. O atacante se posiciona entre você e o servidor.',
    examples: ['Wi-Fi falso de aeroporto/café', 'Interceptação de clipboard (address swap)', 'DNS poisoning'],
    defense: 'Use VPN sempre. Nunca acesse carteiras em Wi-Fi público. Verifique endereços caractere por caractere.',
  },
  {
    icon: CreditCard, title: 'Golpe P2P', severity: 'Médio',
    desc: 'Em transações pessoa-a-pessoa, o comprador faz pagamento com cartão roubado ou Pix de conta laranja. Depois contesta e você perde o BTC.',
    examples: ['Pix de conta de terceiros', 'Comprovante falso de transferência', 'Chargeback de cartão roubado'],
    defense: 'Use apenas plataformas P2P com escrow. Confirme o recebimento antes de liberar. Exija dados do titular.',
  },
  {
    icon: FileWarning, title: 'Malware & Clipboard Hijacking', severity: 'Alto',
    desc: 'Software malicioso que substitui endereços Bitcoin na área de transferência por endereços do atacante. Você copia um endereço e cola outro.',
    examples: ['Extensões falsas de navegador', 'Apps de carteira modificados', 'Trojans em software pirata'],
    defense: 'Verifique os primeiros e últimos 6 caracteres do endereço. Use hardware wallet. Não instale software pirata.',
  },
  {
    icon: Users, title: 'Engenharia Social', severity: 'Crítico',
    desc: 'Manipulação psicológica direta. O atacante se passa por suporte técnico, amigo, ou autoridade para extrair informações sensíveis.',
    examples: ['"Suporte da Ledger" pedindo seed phrase', '"Amigo" indicando investimento imperdível', '"Policial" exigindo acesso à carteira'],
    defense: 'Ninguém legítimo pede suas chaves privadas. NUNCA. Desconfie de urgência artificial.',
  },
];

/* ─── SEVERITY BADGE ─── */
const SeverityBadge = ({ level }: { level: string }) => {
  const colors = {
    'Crítico': 'bg-red-500/15 text-red-400 border-red-500/25',
    'Alto': 'bg-orange-500/15 text-orange-400 border-orange-500/25',
    'Médio': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  };
  return (
    <span className={`text-[8px] font-bold uppercase tracking-[0.3em] px-2 py-0.5 rounded-full border ${colors[level as keyof typeof colors] || colors['Médio']}`}>
      {level}
    </span>
  );
};

export default function BlindagemGolpes() {
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('impacto');
  const [expandedVetor, setExpandedVetor] = useState<number | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
      const sections = NAV_ITEMS.map(item => ({ id: item.id, el: document.getElementById(item.id) }));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el && sections[i].el!.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(LIGHTNING_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Como me proteger de golpes com Bitcoin?", "acceptedAnswer": { "@type": "Answer", "text": "Nunca compartilhe sua seed phrase, use autenticação 2FA via app (não SMS), verifique endereços caractere por caractere e desconfie de promessas de lucro garantido." } },
      { "@type": "Question", "name": "O que é phishing em criptomoedas?", "acceptedAnswer": { "@type": "Answer", "text": "Phishing é quando atacantes criam sites e e-mails falsos imitando exchanges ou carteiras legítimas para roubar suas credenciais e fundos." } },
      { "@type": "Question", "name": "O que é SIM Swap?", "acceptedAnswer": { "@type": "Answer", "text": "SIM Swap é quando o atacante transfere seu número de telefone para outro chip, interceptando códigos 2FA via SMS. Use autenticador por app para se proteger." } },
      { "@type": "Question", "name": "Esquema Ponzi em cripto é comum?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. Bitconnect, OneCoin e Unick Forex são exemplos. Desconfie de qualquer promessa de rendimento garantido ou fixo." } },
      { "@type": "Question", "name": "O que é Rug Pull?", "acceptedAnswer": { "@type": "Answer", "text": "Rug Pull é quando criadores de um token ou pool DeFi retiram toda a liquidez de repente, levando o dinheiro dos investidores." } },
      { "@type": "Question", "name": "Como identificar deepfakes de cripto?", "acceptedAnswer": { "@type": "Answer", "text": "Nenhuma personalidade legítima pede que você envie Bitcoin primeiro. Se parece bom demais para ser verdade, é golpe. Verifique os canais oficiais." } },
      { "@type": "Question", "name": "Transação Bitcoin pode ser revertida?", "acceptedAnswer": { "@type": "Answer", "text": "Não. Transações Bitcoin são irreversíveis. Uma vez confirmada, não existe botão de estorno. Por isso a verificação antes do envio é crítica." } },
      { "@type": "Question", "name": "O que é engenharia social em Bitcoin?", "acceptedAnswer": { "@type": "Answer", "text": "É a manipulação psicológica para fazer você revelar informações sensíveis como seed phrases ou senhas. O atacante se passa por suporte técnico ou autoridade." } },
    ],
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-red-400/50 relative overflow-hidden"
      style={{ background: BG_DARK }}>
      <FixedThematicBackground image={bgBlindagem} intensity="medium" />
      <Helmet>
        <link rel="canonical" href={canonicalUrl('/blindagem-golpes')} />
        <meta property="og:url" content={canonicalUrl('/blindagem-golpes')} />
        <title>Blindagem contra Golpes — Segurança Operacional Bitcoin | Lord Junnior</title>
        <meta name="description" content="Guia completo de proteção contra golpes em Bitcoin e criptomoedas. Phishing, deepfakes, Ponzi, SIM Swap, rug pulls e engenharia social. Histórico de fraudes e arsenal de defesa." />
        <meta name="keywords" content="blindagem golpes bitcoin, segurança bitcoin, phishing cripto, scam bitcoin, deepfake bitcoin, ponzi cripto, sim swap, rug pull, engenharia social, opsec cripto" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="red" />

      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
      </div>

      {/* ─── FLOATING TOC ─── */}
      <nav className="hidden xl:flex 2xl:hidden fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button key={item.id} onClick={() => scrollTo(item.id)}
            className={`text-right px-3 py-2 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              activeSection === item.id
                ? 'text-red-400 bg-red-500/8 border border-red-500/15'
                : 'text-stone-600 hover:text-stone-400 border border-transparent'
            }`}>
            {item.label}
          </button>
        ))}
      </nav>

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(220,38,38,0.08) 50%, transparent 70%)' }} />
      </div>

      {/* ─── BREATHING ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-red-600/30 to-transparent blur-3xl" />
        </motion.div>
        <motion.div
          className="absolute top-[55%] right-[8%] w-[450px] h-[450px] rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/25 to-transparent blur-3xl" />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] left-[25%] w-[350px] h-[350px] rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 7 }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-rose-500/20 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/blindagem-golpes.webp"
        phase="Segurança Operacional"
        title="Blindagem contra Golpes"
        subtitle="O Bitcoin não é roubado por hackers geniais invadindo a blockchain — ele é roubado enganando pessoas."
        icon={ShieldAlert}
        accentColor="rose"
        backLink="/protocolo-inicial"
        backLabel="Protocolo Inicial"
      />

      {/* ═══════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════ */}
      <div className="relative z-10">

        {/* ─── CAPÍTULO 01: O ELO FRACO É VOCÊ ─── */}
        <section id="impacto" className="relative py-20 lg:py-28 scroll-mt-24" style={{ background: BG_ALT }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle size={16} className="text-red-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capítulo 01 — Alerta Tático</span>
              </div>
              <h2 className="font-['Bebas_Neue'] text-4xl lg:text-6xl text-white tracking-wide">
                O Elo Fraco É <span className="text-red-400">Você</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                <ShieldAlert className="absolute top-0 right-0 text-red-600/[0.02] -mr-10 -mt-10" size={280} />
                <div className="relative z-10 space-y-5 text-stone-400 leading-relaxed font-['Space_Grotesk']">
                  <p>
                    <strong className="text-white">A Verdade Desconfortável:</strong> O Bitcoin não é roubado por hackers geniais invadindo a blockchain; ele é roubado <strong className="text-red-400">enganando pessoas</strong>. A maioria dos ataques explora a psicologia, a ganância ou o medo.
                  </p>
                  <p>
                    Engenharia social é a arma mais poderosa do cibercriminoso. Não importa quantas camadas de criptografia protejam seus fundos se você voluntariamente entrega as chaves ao atacante.
                  </p>
                  <p className="text-stone-500 text-sm">
                    Em 2022, mais de <strong className="text-red-400">US$ 3,8 bilhões</strong> foram roubados em hacks e fraudes cripto. A grande maioria não envolveu falhas técnicas no protocolo — envolveu <em>falhas humanas</em>.
                  </p>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={2}
                className="space-y-5">
                {/* Stat cards */}
                {[
                  { value: 'US$ 3.8B', label: 'Roubados em 2022', icon: Banknote },
                  { value: '95%', label: 'Dos ataques são engenharia social', icon: BrainCircuit },
                  { value: '0%', label: 'Chance de estorno em BTC', icon: ShieldOff },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} custom={i + 1}
                    className="bg-red-950/15 border border-red-500/15 rounded-xl p-6 flex items-center gap-5
                               hover:border-red-500/25 transition-all duration-500">
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/15 shrink-0">
                      <stat.icon size={22} className="text-red-400" />
                    </div>
                    <div>
                      <div className="font-['Bebas_Neue'] text-2xl text-white">{stat.value}</div>
                      <div className="text-stone-500 text-xs font-bold tracking-wider uppercase">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}

                {/* Irreversibility warning */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4}
                  className="bg-red-500/[0.06] border border-red-500/20 rounded-xl p-6 relative overflow-hidden">
                  <motion.div className="absolute inset-0 bg-red-500/[0.02]"
                    animate={{ opacity: [0, 0.04, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
                  <div className="relative z-10">
                    <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-red-400/60 mb-2">Irreversibilidade</p>
                    <p className="text-white font-bold text-sm leading-relaxed font-['Space_Grotesk']">
                      Diferente de um cartão de crédito, uma transação de Bitcoin é <span className="text-red-400">final</span>. Se você enviar para um golpista, o dinheiro saiu da sua soberania para sempre. Não existe botão de "estorno".
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-red-500/[0.03] rounded-full blur-3xl" />
        </section>

        <SectionDivider />

        {/* ─── CAPÍTULO 02: LINHA DO TEMPO DAS FRAUDES ─── */}
        <section id="timeline" className="relative py-20 lg:py-28 scroll-mt-24" style={{ background: BG_DARK }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capítulo 02</span>
              <h2 className="font-['Bebas_Neue'] text-4xl lg:text-6xl text-white tracking-wide mt-2">
                Linha do Tempo das <span className="text-red-400">Fraudes</span>
              </h2>
              <p className="text-stone-500 text-sm font-['Space_Grotesk'] mt-4 max-w-2xl">
                Mais de US$ 50 bilhões foram perdidos em golpes cripto desde 2011. Quem não estuda o passado está condenado a ser a próxima vítima.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/30 via-red-500/10 to-transparent" />

              <div className="space-y-8">
                {timelineEvents.map((event, i) => (
                  <motion.div
                    key={`${event.year}-${i}`}
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                    variants={fadeUp} custom={i % 4}
                    className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-10">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-red-500/50 border border-red-400/50"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                      />
                    </div>

                    {/* Content */}
                    <div className={`ml-14 lg:ml-0 lg:w-[45%] ${i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6
                                      hover:border-red-500/15 hover:bg-white/[0.04] transition-all duration-500
                                      hover:shadow-[0_0_30px_rgba(220,38,38,0.04)]">
                        <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'lg:justify-end' : ''}`}>
                          <span className="font-['Bebas_Neue'] text-2xl text-red-400">{event.year}</span>
                          <span className="text-stone-600 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 bg-red-500/8 border border-red-500/15 rounded-full">
                            {event.loss}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-sm font-['Space_Grotesk'] mb-2">{event.title}</h3>
                        <p className="text-stone-500 text-xs leading-relaxed">{event.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ─── CAPÍTULO 03: VETORES DE ATAQUE ─── */}
        <section id="vetores" className="relative py-20 lg:py-28 scroll-mt-24" style={{ background: BG_ALT }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capítulo 03</span>
              <h2 className="font-['Bebas_Neue'] text-4xl lg:text-6xl text-white tracking-wide mt-2">
                Os Vetores de <span className="text-red-400">Ataque</span>
              </h2>
              <p className="text-stone-500 text-sm font-['Space_Grotesk'] mt-4 max-w-2xl">
                Conheça cada vetor pelo nome. Identifique os sinais. Neutralize antes que seja tarde.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {vetoresData.map((vetor, i) => (
                <motion.div
                  key={vetor.title}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={scaleIn} custom={i % 6}
                  className="group"
                >
                  <div
                    className={`bg-white/[0.03] border rounded-2xl p-7 relative overflow-hidden cursor-pointer
                                transition-all duration-500 h-full flex flex-col
                                ${expandedVetor === i
                                  ? 'border-red-500/25 shadow-[0_0_40px_rgba(220,38,38,0.06)]'
                                  : 'border-white/[0.06] hover:border-red-500/15 hover:shadow-[0_0_25px_rgba(220,38,38,0.03)]'
                                }`}
                    onClick={() => setExpandedVetor(expandedVetor === i ? null : i)}
                  >
                    {/* Top glow */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-red-500/8 border border-red-500/15 group-hover:bg-red-500/15 transition-all">
                          <vetor.icon size={18} className="text-red-400" />
                        </div>
                        <h3 className="text-white font-bold text-sm font-['Space_Grotesk']">{vetor.title}</h3>
                      </div>
                      <SeverityBadge level={vetor.severity} />
                    </div>

                    <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-1">{vetor.desc}</p>

                    <AnimatePresence>
                      {expandedVetor === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/[0.06] pt-4 mt-2 space-y-3">
                            <div>
                              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-red-400/60 mb-2">Exemplos reais</p>
                              <ul className="space-y-1">
                                {vetor.examples.map((ex) => (
                                  <li key={ex} className="text-stone-500 text-[11px] flex items-start gap-2">
                                    <Crosshair size={10} className="text-red-400/50 mt-0.5 shrink-0" />
                                    {ex}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-emerald-500/[0.06] border border-emerald-500/15 rounded-lg p-3">
                              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-emerald-400/60 mb-1">Defesa</p>
                              <p className="text-emerald-300/80 text-[11px] leading-relaxed">{vetor.defense}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-1 mt-3 text-stone-600 text-[10px]">
                      <ChevronDown size={12} className={`transition-transform duration-300 ${expandedVetor === i ? 'rotate-180' : ''}`} />
                      {expandedVetor === i ? 'Fechar' : 'Ver exemplos e defesa'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute top-1/3 right-0 w-64 h-64 bg-red-500/[0.02] rounded-full blur-3xl" />
        </section>

        <SectionDivider />

        {/* ─── CAPÍTULO 04: ANATOMIA DO GOLPE ─── */}
        <section id="anatomia" className="relative py-20 lg:py-28 scroll-mt-24" style={{ background: BG_DARK }}>
          <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capítulo 04</span>
              <h2 className="font-['Bebas_Neue'] text-4xl lg:text-6xl text-white tracking-wide mt-2">
                Anatomia de um <span className="text-red-400">Golpe</span>
              </h2>
              <p className="text-stone-500 text-sm font-['Space_Grotesk'] mt-4 max-w-2xl">
                Todo golpe segue o mesmo padrão psicológico. Identifique as fases e nunca mais será vítima.
              </p>
            </motion.div>

            <div className="relative space-y-6">
              {[
                { phase: '01', title: 'Isca', desc: 'O atacante cria uma oportunidade irresistível: lucro fácil, airdrop gratuito, suporte técnico urgente ou uma "informação privilegiada".', icon: Sparkles, color: 'yellow' },
                { phase: '02', title: 'Urgência', desc: 'O relógio começa a contar. "Oferta válida por 24h", "Sua conta será bloqueada", "Últimas vagas". O objetivo é impedir que você pense.', icon: Siren, color: 'orange' },
                { phase: '03', title: 'Confiança', desc: 'O golpista se apresenta como autoridade: funcionário da exchange, desenvolvedor do projeto, influenciador verificado. Usa provas sociais falsas.', icon: Shield, color: 'amber' },
                { phase: '04', title: 'Ação', desc: 'Você clica no link, digita a seed phrase, envia os bitcoins "para verificação" ou instala o aplicativo comprometido.', icon: Target, color: 'red' },
                { phase: '05', title: 'Extração', desc: 'Em segundos, seus fundos são drenados para endereços controlados pelo atacante. A transação é irreversível. Não há recurso.', icon: Skull, color: 'red' },
              ].map((step, i) => (
                <motion.div
                  key={step.phase}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i}
                  className="flex items-start gap-6"
                >
                  <div className={`shrink-0 w-14 h-14 rounded-2xl bg-${step.color}-500/10 border border-${step.color}-500/20
                                  flex items-center justify-center relative`}>
                    <span className="font-['Bebas_Neue'] text-lg text-white/80">{step.phase}</span>
                    {i < 4 && <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-6 bg-${step.color}-500/20`} />}
                  </div>
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 flex-1
                                  hover:border-red-500/10 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon size={16} className={`text-${step.color}-400`} />
                      <h3 className="font-['Bebas_Neue'] text-xl text-white tracking-wide">{step.title}</h3>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed font-['Space_Grotesk']">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ─── CAPÍTULO 05: ARSENAL DE DEFESA ─── */}
        <section id="defesa" className="relative py-20 lg:py-28 scroll-mt-24" style={{ background: BG_ALT }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-500/60">Capítulo 05</span>
              <h2 className="font-['Bebas_Neue'] text-4xl lg:text-6xl text-white tracking-wide mt-2">
                Arsenal de <span className="text-emerald-400">Defesa</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Lock, title: 'Hardware Wallet', desc: 'Mantenha a maioria dos seus fundos em cold storage. Ledger, Trezor ou Coldcard. Seus bitcoins nunca ficam online.', level: 'Essencial' },
                { icon: KeyRound, title: 'Backup da Seed Phrase', desc: 'Grave suas 24 palavras em placa de aço. Nunca digitalize, fotografe ou armazene em nuvem. Guarde em local seguro e secreto.', level: 'Essencial' },
                { icon: Smartphone, title: '2FA via App', desc: 'Use Aegis ou Google Authenticator. NUNCA SMS. O SIM Swap torna o 2FA via SMS completamente inútil.', level: 'Essencial' },
                { icon: Eye, title: 'Verificação de Endereço', desc: 'Antes de cada transação, verifique os primeiros e últimos 6 caracteres do endereço. Malwares trocam endereços no clipboard.', level: 'Essencial' },
                { icon: Globe, title: 'VPN Always-On', desc: 'Nunca acesse carteiras ou exchanges sem VPN. Redes públicas são campos minados. DNS poisoning é trivial.', level: 'Recomendado' },
                { icon: UserX, title: 'Silêncio Operacional', desc: 'Não fale sobre quanto Bitcoin você tem. Nem para amigos próximos. Alvos silenciosos são alvos mais difíceis.', level: 'Recomendado' },
                { icon: Search, title: 'Verificação de URLs', desc: 'Salve seus sites nos favoritos. Nunca acesse via Google Ads ou links de e-mail. Confira o certificado SSL.', level: 'Essencial' },
                { icon: Server, title: 'Rode seu Próprio Node', desc: 'Um full node te dá soberania total na verificação. Não dependa de terceiros para validar suas transações.', level: 'Avançado' },
              ].map((tool, i) => (
                <motion.div
                  key={tool.title}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={scaleIn} custom={i % 4}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7
                             hover:border-emerald-500/15 hover:shadow-[0_0_30px_rgba(16,185,129,0.04)] transition-all duration-500 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/15 group-hover:bg-emerald-500/15 transition-all">
                        <tool.icon size={18} className="text-emerald-400" />
                      </div>
                      <h3 className="text-white font-bold text-sm font-['Space_Grotesk']">{tool.title}</h3>
                    </div>
                    <span className={`text-[8px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border
                      ${tool.level === 'Essencial' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' :
                        tool.level === 'Avançado' ? 'bg-violet-500/15 text-violet-400 border-violet-500/25' :
                        'bg-amber-500/15 text-amber-400 border-amber-500/25'}`}>
                      {tool.level}
                    </span>
                  </div>
                  <p className="text-stone-500 text-xs leading-relaxed">{tool.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-emerald-500/[0.02] rounded-full blur-3xl" />
        </section>

        <SectionDivider />

        {/* ─── CAPÍTULO 06: CÓDIGO DE CONDUTA ─── */}
        <section id="codigo" className="relative py-20 lg:py-28 scroll-mt-24" style={{ background: BG_DARK }}>
          <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capítulo 06</span>
              <h2 className="font-['Bebas_Neue'] text-4xl lg:text-6xl text-white tracking-wide mt-2">
                O Código de <span className="text-amber-400">Conduta</span>
              </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[140px_1fr] md:grid-cols-[220px_1fr] border-b border-white/[0.06] bg-white/[0.02]">
                <div className="p-5 border-r border-white/[0.06]">
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-600">Ação</span>
                </div>
                <div className="p-5">
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-600">Regra de Ouro</span>
                </div>
              </div>
              {[
                { action: 'Sua Seed Phrase', rule: 'NUNCA forneça a ninguém. Nem para "suporte técnico". Quem pede sua seed é um atacante. Sem exceções.', icon: KeyRound },
                { action: 'Links Suspeitos', rule: 'Salve seus sites nos favoritos. Não clique em links de e-mails, SMS ou mensagens diretas. Verifique cada URL.', icon: Link2 },
                { action: 'Autenticação', rule: 'Use 2FA via App (Aegis ou Google Authenticator), nunca via SMS. SIM swap é trivial para atacantes.', icon: Smartphone },
                { action: 'Verificação', rule: 'Verifique o endereço de destino caractere por caractere antes de confirmar. Malwares trocam endereços silenciosamente.', icon: CheckCircle },
                { action: 'Downloads', rule: 'Baixe apenas de fontes oficiais. Extensões de navegador, apps de carteira e softwares piratas são vetores de infecção.', icon: FileWarning },
                { action: 'Redes Sociais', rule: 'Nunca revele quanto Bitcoin possui. Não aceite "dicas exclusivas". Influenciadores pagos não são seus aliados.', icon: MessageSquare },
                { action: 'Wi-Fi Público', rule: 'Nunca acesse carteiras ou exchanges em redes públicas. Use VPN sempre. DNS poisoning é invisível.', icon: Wifi },
                { action: 'Promessas', rule: 'Se alguém promete lucro garantido, multiplicação de BTC ou retornos fixos — é golpe. Sempre. Sem exceções.', icon: TrendingUp },
              ].map((row, i) => (
                <div key={i}
                  className={`grid grid-cols-[140px_1fr] md:grid-cols-[220px_1fr] group hover:bg-red-500/[0.02] transition-all duration-300 ${
                    i < 7 ? 'border-b border-white/[0.04]' : ''
                  }`}>
                  <div className="p-5 border-r border-white/[0.04] flex items-center gap-3">
                    <row.icon className="text-red-400 shrink-0" size={14} />
                    <span className="text-white font-bold text-[10px] tracking-wider uppercase">{row.action}</span>
                  </div>
                  <div className="p-5">
                    <span className="text-stone-400 text-sm leading-relaxed font-['Space_Grotesk']">{row.rule}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* ─── CAPÍTULO 07: CHECKLIST TÁTICO ─── */}
        <section id="checklist" className="relative py-20 lg:py-28 scroll-mt-24" style={{ background: BG_ALT }}>
          <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 07</span>
              <h2 className="font-['Bebas_Neue'] text-4xl lg:text-6xl text-white tracking-wide mt-2">
                Checklist <span className="text-amber-400">Tático</span>
              </h2>
              <p className="text-stone-500 text-sm font-['Space_Grotesk'] mt-4">
                Antes de cada operação, passe por esta lista. Se falhar em uma, pare e reconsidere.
              </p>
            </motion.div>

            <div className="space-y-3">
              {[
                'Verifiquei o endereço de destino caractere por caractere?',
                'Estou usando minha própria rede (não Wi-Fi público)?',
                'Acessei o site pelos meus favoritos (não por link)?',
                'Ninguém me pressionou a fazer esta transação com urgência?',
                'Meu 2FA é via app, não via SMS?',
                'Minha seed phrase está guardada offline em local seguro?',
                'Não compartilhei meu saldo ou posições com ninguém?',
                'O software/app é da fonte oficial e está atualizado?',
                'Não estou reagindo por FOMO ou medo de perder uma "oportunidade"?',
                'Se algo parece bom demais, parei para pensar antes de agir?',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i * 0.5}
                  className="flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5
                             hover:border-amber-500/15 transition-all duration-500 group"
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5
                                  group-hover:bg-amber-500/20 transition-all">
                    <CheckCircle size={12} className="text-amber-400/60" />
                  </div>
                  <p className="text-stone-300 text-sm font-['Space_Grotesk'] leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ─── CAPÍTULO 08: NÃO CONFIE, VERIFIQUE ─── */}
        <section id="conclusao" className="relative py-20 lg:py-28 scroll-mt-24" style={{ background: BG_DARK }}>
          <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}
              className="bg-red-500/[0.04] border border-red-500/15 rounded-3xl p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
              <motion.div className="absolute inset-0 bg-red-500/[0.01]"
                animate={{ opacity: [0, 0.03, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
              <ShieldAlert className="absolute top-0 right-0 text-red-600/[0.03] -mr-12 -mt-12" size={300} />

              <div className="relative z-10">
                <h2 className="font-['Bebas_Neue'] text-4xl lg:text-5xl text-white tracking-wide mb-8">
                  Não Confie, <span className="text-red-400">Verifique.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {[
                    { icon: Lock, title: 'Higiene Digital', desc: 'Mantenha software atualizado. Use gerenciador de senhas. Cada conta deve ter senha única.' },
                    { icon: UserX, title: 'Silêncio Operacional', desc: 'Não saia espalhando quanto Bitcoin você possui. Alvos silenciosos são alvos mais difíceis.' },
                    { icon: Scale, title: 'Pensamento Crítico', desc: 'Se parece bom demais, é golpe. Se há urgência artificial, é manipulação. Pare. Pense. Verifique.' },
                  ].map((item, i) => (
                    <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
                      className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/15 shrink-0 mt-0.5">
                        <item.icon size={16} className="text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-amber-400 font-bold text-sm mb-1 font-['Space_Grotesk']">{item.title}</h4>
                        <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Manifesto quote */}
                <div className="bg-black/30 border border-white/[0.06] rounded-xl p-6 text-center">
                  <p className="text-stone-300 text-sm lg:text-base leading-relaxed font-['Space_Grotesk'] italic">
                    "A blockchain é inexpugnável. O protocolo é perfeito. O código é imutável. 
                    O único ponto de falha do sistema é <span className="text-red-400 font-bold not-italic">você</span>. 
                    Domine seus impulsos e nenhum atacante terá poder sobre sua soberania."
                  </p>
                  <p className="text-stone-600 text-[10px] font-bold tracking-[0.3em] uppercase mt-4">LORD JUNNIOR</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Links */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/autocustodia"
                className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-8 py-4
                           text-amber-400 text-sm font-bold uppercase tracking-wider
                           hover:bg-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500 group">
                Autocustódia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/dicionario-cripto"
                className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-8 py-4
                           text-stone-400 text-sm font-bold uppercase tracking-wider
                           hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500 group">
                Alfabeto Cripto <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── FAQ SECTION ─── */}
        <section className="relative py-20 lg:py-28" style={{ background: BG_ALT }}>
          <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-10">
              <h2 className="font-['Bebas_Neue'] text-3xl lg:text-4xl text-white tracking-wide">
                Perguntas <span className="text-red-400">Frequentes</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {(faqSchema.mainEntity as any[]).map((faq: any, i: number) => (
                <motion.details
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i * 0.3}
                  className="group bg-white/[0.03] border border-white/[0.06] rounded-xl
                             hover:border-red-500/10 transition-all duration-500"
                >
                  <summary className="p-5 cursor-pointer text-stone-300 text-sm font-bold font-['Space_Grotesk'] list-none
                                      flex items-center justify-between">
                    {faq.name}
                    <ChevronDown size={14} className="text-stone-600 group-open:rotate-180 transition-transform duration-300 shrink-0 ml-4" />
                  </summary>
                  <div className="px-5 pb-5 border-t border-white/[0.04]">
                    <p className="text-stone-500 text-sm leading-relaxed pt-4 font-['Space_Grotesk']">
                      {faq.acceptedAnswer.text}
                    </p>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DOAÇÃO LIGHTNING ─── */}
        <section className="relative py-20 lg:py-28" style={{ background: BG_DARK }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}>
              <div className="relative bg-gradient-to-b from-red-500/[0.04] to-transparent border border-red-500/10 rounded-3xl p-10 lg:p-14
                              shadow-[0_0_80px_rgba(220,38,38,0.04)]">
                <div className="absolute -top-px -left-px -right-px -bottom-px rounded-3xl bg-gradient-to-b from-red-500/10 to-transparent opacity-50 blur-sm" />
                <div className="relative z-10">
                  <Zap size={40} className="mx-auto text-yellow-500/60 mb-6" />
                  <p className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase mb-4">APOIE ESTE PROJETO</p>
                  <h2 className="font-['Bebas_Neue'] text-3xl lg:text-4xl text-white leading-tight mb-4">
                    Conhecimento gratuito.<br />
                    <span className="text-yellow-400">Sua contribuição o mantém vivo.</span>
                  </h2>
                  <p className="text-stone-400 text-sm leading-relaxed font-['Space_Grotesk'] mb-8 max-w-xl mx-auto">
                    Se este conteúdo te ajudou a proteger seus fundos, considere enviar alguns satoshis via Lightning Network.
                    Cada contribuição fortalece a produção de conteúdo livre e soberano. Sugestão: 1.000 a 10.000 sats.
                  </p>

                  <div className="inline-block mb-6">
                    <button onClick={() => setShowQrModal(true)} className="group relative">
                      <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-yellow-500/20
                                      group-hover:border-yellow-500/40 transition-all duration-500
                                      shadow-[0_0_40px_rgba(234,179,8,0.08)]">
                        <img src={qrCodeImage} alt="QR Code Lightning" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="absolute inset-0 bg-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <QrCode size={32} className="text-yellow-400" />
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <button onClick={handleCopy}
                      className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2
                                 hover:bg-white/[0.06] hover:border-yellow-500/20 transition-all duration-300">
                      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-stone-500" />}
                      <span className="text-stone-400 text-xs font-mono">{LIGHTNING_ADDRESS}</span>
                    </button>
                  </div>

                  <p className="text-stone-600 text-[9px] font-bold tracking-[0.3em] uppercase">
                    LIGHTNING NETWORK · INSTANTÂNEO · SEM INTERMEDIÁRIOS
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-white/[0.05] py-12 text-center" style={{ background: BG_DARK }}>
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>

      {/* ─── QR MODAL ─── */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => setShowQrModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-stone-950 border border-yellow-500/20 rounded-2xl p-8 max-w-sm w-full text-center relative
                         shadow-[0_0_60px_rgba(234,179,8,0.08)]">
              <button onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-stone-600 hover:text-white transition-colors">
                <X size={18} />
              </button>
              <img src={qrCodeImage} alt="QR Code Lightning Network" className="w-64 h-64 mx-auto rounded-xl mb-4" loading="lazy" />
              <p className="text-white text-sm font-bold mb-2">Escaneie com sua carteira Lightning</p>
              <button onClick={handleCopy}
                className="flex items-center gap-2 mx-auto text-yellow-500/70 text-xs hover:text-yellow-400 transition-colors">
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span className="font-mono">{LIGHTNING_ADDRESS}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
