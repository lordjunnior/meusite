import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Zap, Layers, Repeat, Smartphone, Coffee, ZapOff,
  ArrowRight, Shield, Lock, Eye, Globe, ShoppingCart,
  Wifi, WifiOff, Users, Copy, Check, QrCode,
  AlertTriangle, CheckCircle, XCircle, Clock, DollarSign,
  Radio, Server, Route, Hash, X, ChevronDown,
  Cpu, Network, TrendingUp, Scale, Banknote, MapPin,
  Car, CreditCard, Tag, Landmark, ArrowUpRight
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import bgLightning from '@/assets/backgrounds/bg-lightning.webp';
import qrCodeImage from '@/assets/qrcode-lightning.webp';
import lightningCircuitImg from '@/assets/lightning-bolt-circuit.webp';
import lightningMobileImg from '@/assets/lightning-pagamento-mobile.webp';
import lightningRedeImg from '@/assets/lightning-rede-global.webp';
import BackToHome from '@/components/BackToHome';

/* ─── CONSTANTS ─── */
const LIGHTNING_ADDRESS = "securecorn53@walletofsatoshi.com";
const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const BG_DARK = '#050808';
const BG_ALT = '#070b0b';

/* ─── ANIMATION VARIANTS ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1, x: 0, filter: 'blur(0px)',
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

/* ─── ANIMATED COUNTER ─── */
function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {prefix}{display.toLocaleString('pt-BR')}{suffix}
    </span>
  );
}

/* ─── TOC CHAPTERS ─── */
const chapters = [
  { id: 'o-que-e', label: 'O Que É' },
  { id: 'como-funciona', label: 'Como Funciona' },
  { id: 'layer-2', label: 'Layer-2' },
  { id: 'como-usar', label: 'Como Usar' },
  { id: 'casos-de-uso', label: 'Casos de Uso' },
  { id: 'arsenal-carteiras', label: 'Carteiras' },
  { id: 'criadores', label: 'Criadores' },
  { id: 'adocao-global', label: 'Adoção Global' },
  { id: 'numeros', label: 'Números' },
  { id: 'faq', label: 'FAQ' },
  { id: 'apoie', label: 'Apoie' },
];

/* ─── FAQ DATA ─── */
const faqItems = [
  { q: 'Preciso ter um Bitcoin inteiro para usar a Lightning?', a: 'Não. Você pode enviar e receber frações chamadas satoshis (1 BTC = 100 milhões de sats). Com a Lightning, é possível transacionar até 1 sat — o equivalente a frações de centavo. A barreira de entrada é zero.' },
  { q: 'A Lightning Network é realmente segura?', a: 'Sim. Ela herda a segurança da blockchain do Bitcoin. Os fundos são protegidos por contratos multisig na cadeia principal. Se algo der errado no canal, você pode fechá-lo a qualquer momento e recuperar seus satoshis na Layer 1. A segurança é matemática, não baseada em promessas.' },
  { q: 'Posso receber pagamentos Lightning sem estar online?', a: 'Depende da carteira. Phoenix e Zeus sincronizam pagamentos recebidos quando você volta a ficar online. Carteiras custodiais como Wallet of Satoshi recebem a qualquer momento porque o servidor deles nunca dorme — mas as chaves não são suas. Soberania tem preço: atenção.' },
  { q: 'Qual a diferença entre Lightning Address e Invoice?', a: 'Invoice é um código único para cada pagamento, com prazo de expiração. Lightning Address funciona como um e-mail permanente (ex: usuario@wallet.com) — reutilizável e estático. Ambos funcionam, mas o Address é mais prático para receber contribuições recorrentes.' },
  { q: 'A Lightning Network substitui o Bitcoin?', a: 'Jamais. Ela complementa. O Bitcoin L1 é a camada de liquidação definitiva — o cofre de aço. A Lightning é a camada de uso diário — o bolso com acesso rápido. Juntas, formam o sistema monetário mais robusto já concebido pela humanidade.' },
  { q: 'Posso usar Lightning no Brasil?', a: 'Sim. Qualquer pessoa com um smartphone pode instalar Phoenix ou Zeus e começar a transacionar em minutos. Não precisa de banco, CPF, aprovação de ninguém ou horário comercial. A Lightning não conhece fronteiras, jurisdições ou feriados bancários.' },
  { q: 'Quanto custa uma transação Lightning?', a: 'Em média, menos de 1 satoshi — o equivalente a frações de centavo de real. Compare com as taxas do cartão de crédito (2-5%), do PIX empresarial (0,22%), ou das remessas internacionais (5-8%). Lightning é ordens de magnitude mais barata.' },
  { q: 'Lightning funciona sem internet?', a: 'A Lightning requer conexão para enviar e receber transações em tempo real. Porém, uma vez recebido, o saldo é seu — não depende de um banco estar operando. Em cenários de crise, qualquer conexão momentânea é suficiente para liquidar.' },
];

/* ─── SCHEMA.ORG ─── */
const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": faqItems.map(f => ({
    "@type": "Question", "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  "headline": "Lightning Network: O Que É, Como Funciona e Como Usar — Guia Definitivo",
  "description": "Guia completo sobre a Lightning Network do Bitcoin: funcionamento técnico, carteiras non-custodiais, casos de uso reais, criadores e como começar hoje.",
  "author": { "@type": "Person", "name": "Lord Junnior" },
  "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "datePublished": "2026-03-09", "dateModified": "2026-03-09",
  "url": "https://lordjunnior.com.br/lightning"
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo",
  "name": "Como usar a Lightning Network",
  "step": [
    { "@type": "HowToStep", "name": "Instale uma carteira compatível", "text": "Baixe Phoenix (recomendada) ou Zeus para máxima soberania." },
    { "@type": "HowToStep", "name": "Receba ou compre Bitcoin", "text": "Transfira BTC para sua carteira Lightning ou compre diretamente via exchange compatível." },
    { "@type": "HowToStep", "name": "Envie e receba instantaneamente", "text": "Use Lightning Address ou Invoice para transações instantâneas com taxas próximas a zero." },
  ]
};

/* ─── WALLET DATA ─── */
const wallets = [
  {
    name: 'Phoenix', type: 'Non-Custodial', verdict: 'Recomendada',
    icon: Zap, accent: 'yellow' as const,
    pros: ['Chaves privadas no seu dispositivo', 'Backup automático e criptografado', 'Abertura de canal automática', 'Interface limpa e intuitiva'],
    cons: ['Taxa inicial para abertura do primeiro canal', 'Requer liquidez mínima para começar'],
    desc: 'Desenvolvida pela ACINQ — a mesma equipe por trás do Eclair, uma das implementações de referência do protocolo Lightning. Phoenix é a carteira que recomendamos para quem quer soberania sem complicação. Ela abre canais automaticamente, gerencia liquidez nos bastidores e protege suas chaves localmente. Você usa Bitcoin como dinheiro do dia a dia, sem abrir mão de ser o único dono dos seus satoshis.',
  },
  {
    name: 'Zeus', type: 'Non-Custodial', verdict: 'Para Veteranos',
    icon: Server, accent: 'blue' as const,
    pros: ['Conecta ao seu próprio node (LND/CLN)', 'Controle total de canais e roteamento', 'Suporte a multi-conta', 'Conexão nativa via Tor'],
    cons: ['Curva de aprendizado significativa', 'Exige node próprio para controle máximo'],
    desc: 'Zeus é para quem quer ser o próprio banco — literalmente. Conecta-se ao seu node Lightning via Tor, dando controle absoluto sobre canais, roteamento, liquidez e privacidade. Não é para iniciantes, mas é a ferramenta definitiva para quem entende que soberania de verdade exige infraestrutura própria. Se você roda um node, Zeus é a sua interface de comando.',
  },
  {
    name: 'Wallet of Satoshi', type: 'Custodial', verdict: '⚠ Risco',
    icon: Coffee, accent: 'red' as const,
    pros: ['Configuração zero — instala e usa', 'Interface extremamente simples', 'Recebe pagamentos mesmo offline'],
    cons: ['As chaves NÃO são suas', 'Empresa pode congelar fundos a qualquer momento', 'Sem privacidade real — tudo é rastreável', 'Depende de um servidor centralizado'],
    desc: 'Funciona como um banco digital: fácil, rápido, conveniente — e igualmente perigoso. Você é apenas um registro no servidor deles. Se a empresa cair, se um governo exigir, se uma regulação mudar, seus satoshis desaparecem. Use exclusivamente para micro-valores descartáveis que você aceita perder. Para qualquer coisa séria, a custódia é inegociável.',
  },
];

/* ─── USE CASES ─── */
const useCases = [
  { icon: Coffee, title: 'Café & Comércio Local', desc: 'Pague seu café em satoshis. Sem maquininha de cartão, sem taxa de adquirente, sem intermediário bancário. O comerciante recebe a liquidação final em menos de 3 segundos.', example: 'Um café de R$ 8 = ~1.200 sats. Taxa Lightning: ~1 sat (R$ 0,005). Taxa do cartão no mesmo café: R$ 0,40.', impact: 'alto' },
  { icon: Globe, title: 'Remessas Internacionais', desc: 'Envie dinheiro para qualquer país do planeta em 3 segundos. Sem Swift, sem 5 dias úteis, sem taxa de 8%, sem câmbio manipulado.', example: 'R$ 500 BR→PY via banco: R$ 40 + 3 dias. Via Lightning: ~R$ 0,01 + 3 segundos.', impact: 'alto' },
  { icon: ShoppingCart, title: 'E-commerce Soberano', desc: 'Venda sem processador de pagamentos. Sem chargebacks, sem estornos, sem Stripe ficando com 2,9%. Pagamento final, irreversível e soberano.', example: 'BTCPay Server: zero intermediários, zero taxas, zero risco de cancelamento pós-venda.', impact: 'medio' },
  { icon: Users, title: 'Gorjetas & Micropagamentos', desc: 'Envie 100 sats para um artigo que mudou sua perspectiva. Monetize sem anúncios, sem assinaturas, sem plataformas que retêm 30%.', example: 'Podcasters recebem sats por minuto. Nostr + value4value: pague o que vale.', impact: 'medio' },
  { icon: WifiOff, title: 'Economia de Crise', desc: 'Quando o sistema bancário trava — e ele trava —, a Lightning continua operando. Sem servidores centrais, sem horário comercial.', example: 'Argentina: Lightning como rota de escape. Líbano: bancos bloquearam saques, Lightning não parou.', impact: 'alto' },
  { icon: Radio, title: 'Streaming de Dinheiro', desc: 'Pague por segundo de uso. Música, vídeo, API, computação. Dinheiro fluindo como dados — contínuo, fracionado, instantâneo.', example: 'Fountain: sats por segundo de escuta. Sem contrato, sem mínimo, sem intermediário.', impact: 'medio' },
];

/* ─── NETWORK STATS ─── */
const networkStats = [
  { label: 'Capacidade Total', value: '~5.000 BTC', numValue: 5000, detail: 'Liquidez disponível nos canais públicos', icon: Banknote },
  { label: 'Nodes Ativos', value: '19.374+', numValue: 19374, detail: 'Pontos de roteamento globais', icon: Cpu },
  { label: 'Canais Abertos', value: '75.000+', numValue: 75000, detail: 'Conexões bilaterais ativas', icon: Network },
  { label: 'Tempo Médio', value: '<3 seg', numValue: 3, detail: 'Do envio à confirmação final', icon: Clock },
  { label: 'Taxa Média', value: '<1 sat', numValue: 1, detail: 'Frações de centavo por transação', icon: DollarSign },
  { label: 'Throughput', value: '~1M TPS', numValue: 1000000, detail: 'Transações por segundo teóricas', icon: TrendingUp },
];

/* ─── SECTION GLOW ─── */
function SectionGlow({ color = 'yellow', position = 'left' }: { color?: string; position?: 'left' | 'right' | 'center' }) {
  const posMap = { left: 'left-[-10%] top-[20%]', right: 'right-[-10%] top-[30%]', center: 'left-1/2 -translate-x-1/2 top-[10%]' };
  const colorMap: Record<string, string> = {
    yellow: 'from-yellow-500/[0.07]',
    blue: 'from-blue-500/[0.06]',
    red: 'from-red-500/[0.05]',
    emerald: 'from-emerald-500/[0.05]',
  };
  return (
    <div className={`absolute ${posMap[position]} w-[600px] h-[600px] rounded-full pointer-events-none`}>
      <div className={`w-full h-full rounded-full bg-gradient-radial ${colorMap[color] || colorMap.yellow} to-transparent blur-[120px]`} />
    </div>
  );
}

/* ─── ANIMATED DIVIDER ─── */
function AnimatedDivider() {
  return (
    <div className="relative py-2">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: APPLE_EASE }}
        className="w-full h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(234,179,8,0.3), rgba(245,158,11,0.5), rgba(234,179,8,0.3), transparent)' }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6, ease: APPLE_EASE }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.4)]"
      />
    </div>
  );
}

/* ─── FLOATING TOC ─── */
function FloatingTOC({ activeChapter }: { activeChapter: string }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block 2xl:hidden">
      <div className="flex flex-col items-end gap-1.5">
        {chapters.map((ch) => (
          <a key={ch.id} href={`#${ch.id}`}
            onClick={(e) => { e.preventDefault(); document.getElementById(ch.id)?.scrollIntoView({ behavior: 'smooth' }); }}
            className={`group flex items-center gap-2 transition-all duration-300 ${activeChapter === ch.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
            <span className={`text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
              activeChapter === ch.id ? 'text-yellow-500 opacity-100 translate-x-0' : 'text-stone-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}>{ch.label}</span>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeChapter === ch.id ? 'bg-yellow-500 scale-125 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-stone-700 group-hover:bg-stone-500'
            }`} />
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── CHAPTER HEADER ─── */
function ChapterHeader({ number, title, subtitle, align = 'left' }: { number: string; title: string; subtitle?: string; align?: 'left' | 'center' }) {
  return (
    <motion.div variants={fadeUp} custom={0} className={`mb-14 ${align === 'center' ? 'text-center' : ''}`}>
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 'auto' }}
        viewport={{ once: true }}
        className="inline-block text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/50 mb-2 overflow-hidden"
      >
        {number}
      </motion.span>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-stone-500 text-sm md:text-base leading-relaxed mt-4 ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-3xl'}`}>
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: APPLE_EASE }}
        className={`h-[2px] mt-6 origin-left ${align === 'center' ? 'max-w-32 mx-auto' : 'max-w-24'}`}
        style={{ background: 'linear-gradient(90deg, rgba(234,179,8,0.6), transparent)' }}
      />
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function Lightning() {
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeChapter, setActiveChapter] = useState('o-que-e');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveChapter(entry.target.id); }); },
      { threshold: 0.2, rootMargin: '-100px 0px -50% 0px' }
    );
    chapters.forEach((ch) => { const el = document.getElementById(ch.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(LIGHTNING_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-yellow-300/50 relative overflow-hidden" style={{ background: BG_DARK }}>
      <FixedThematicBackground image={bgLightning} intensity="medium" />
      <Helmet>
        <title>Lightning Network: O Que É, Como Funciona e Como Usar — Guia Definitivo | Lord Junnior</title>
        <meta name="description" content="Guia definitivo da Lightning Network do Bitcoin: o que é, como funciona a layer-2, carteiras non-custodiais (Phoenix, Zeus), casos de uso reais, criadores e como começar hoje. Soberania instantânea." />
        <link rel="canonical" href="https://lordjunnior.com.br/lightning" />
        <meta property="og:title" content="Lightning Network: O Que É, Como Funciona e Como Usar — Guia Definitivo" />
        <meta property="og:description" content="Guia completo: canais de pagamento, roteamento onion, carteiras, casos de uso reais e o passo a passo para usar Bitcoin no dia a dia." />
        <meta property="og:url" content="https://lordjunnior.com.br/lightning" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #eab308, #f59e0b, #f97316)' }} />
      </div>

      <FloatingTOC activeChapter={activeChapter} />

      {/* ─── GLOBAL ATMOSPHERIC LAYERS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        {/* Diagonal light beam */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ background: 'linear-gradient(125deg, transparent 20%, rgba(234,179,8,0.12) 40%, transparent 60%)' }} />
        {/* Secondary light beam */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ background: 'linear-gradient(235deg, transparent 30%, rgba(245,158,11,0.08) 55%, transparent 75%)' }} />
        {/* Scan lines */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(234,179,8,0.03) 2px, rgba(234,179,8,0.03) 4px)', backgroundSize: '100% 4px' }} />
      </div>

      {/* ─── REACTIVE ORBS (Parallax) ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-yellow-500/40 to-transparent blur-[100px]" />
        </motion.div>
        <motion.div style={{ x: springY, y: springX }}
          className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -3, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/30 to-transparent blur-[80px]" />
        </motion.div>
        <motion.div
          className="absolute top-[50%] left-[40%] w-[400px] h-[400px] rounded-full opacity-[0.025]"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-orange-500/20 to-transparent blur-[100px]" />
        </motion.div>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/lightning-network.webp"
        phase="A Segunda Camada do Bitcoin"
        title="Lightning Network"
        subtitle="A solução de layer-2 que transforma o Bitcoin em dinheiro instantâneo. Taxas de frações de centavo. Confirmação em milissegundos. Soberania sem compromisso."
        icon={Zap}
        accentColor="amber"
        backLink="/arsenal"
        backLabel="Torre de Controle"
      />

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT AREA
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10">

        {/* ╔══════════════════════════════════════╗
            ║  CAPÍTULO 01 — O QUE É              ║
            ╚══════════════════════════════════════╝ */}
        <section id="o-que-e" className="py-24 md:py-32 relative overflow-hidden" style={{ background: BG_DARK }}>
          <SectionGlow color="yellow" position="left" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 01"
                title="O Que É a Lightning Network?"
                subtitle="E por que ela é a peça que faltava para o Bitcoin dominar o cotidiano."
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                {/* Main Column */}
                <motion.div variants={fadeUp} custom={1} className="lg:col-span-7 space-y-6">
                  <p className="text-stone-300 text-base md:text-lg leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    A <strong className="text-yellow-500">Lightning Network</strong> é uma solução de segunda camada (layer-2) construída especificamente sobre a blockchain do Bitcoin — a maior e mais segura rede criptográfica do planeta. Seu propósito é cirúrgico: <strong className="text-white">resolver o maior gargalo do BTC — a escalabilidade</strong> — sem sacrificar a descentralização ou a segurança que tornaram o Bitcoin uma revolução.
                  </p>
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                    Apesar de ser a primeira rede criptográfica já desenvolvida — e amplamente considerada a maior revolução do sistema financeiro moderno —, a blockchain do Bitcoin ainda não consegue ser autônoma o suficiente para manter velocidade, custo baixo, descentralização e segurança simultaneamente. São quatro pilares que competem entre si. Se você otimiza velocidade, sacrifica descentralização. Se prioriza segurança, paga com lentidão.
                  </p>
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                    A Lightning Network não é uma tentativa de "consertar" o Bitcoin — é uma <strong className="text-stone-200">camada de extensão estratégica</strong> que oferece uma segunda via para transações do dia a dia. Com ela, você pode enviar e receber Bitcoin <strong className="text-yellow-500">quase instantaneamente</strong>, com taxas tão baixas que chegam a frações de centavo — e com isso, as chamadas <strong className="text-white">microtransações</strong> se tornaram viáveis pela primeira vez na história do dinheiro digital.
                  </p>

                  {/* Pull Quote with glow */}
                  <motion.div variants={fadeUp} custom={2}
                    className="relative border-l-2 border-yellow-500/40 pl-6 py-4 my-8">
                    <div className="absolute -left-[1px] top-0 bottom-0 w-[2px] shadow-[0_0_15px_rgba(234,179,8,0.4)]" />
                    <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      "O Bitcoin é o cofre de aço. A Lightning é o bolso com acesso instantâneo. Juntos, formam o sistema monetário mais completo já concebido."
                    </p>
                    <span className="text-stone-600 text-xs font-bold tracking-[0.3em] uppercase mt-3 block">
                      Analogia Soberana
                    </span>
                  </motion.div>
                </motion.div>

                {/* Side Column — Key Metrics */}
                <motion.div variants={slideRight} custom={2} className="lg:col-span-5 space-y-5">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group
                                  hover:border-yellow-500/15 transition-all duration-700">
                    {/* Animated top border */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[1px]"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5, ease: APPLE_EASE }}
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(234,179,8,0.4), transparent)', transformOrigin: 'left' }}
                    />
                    <h4 className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/50 mb-6">O Problema Que Ela Resolve</h4>
                    <div className="space-y-5">
                      {[
                        { label: 'Velocidade Bitcoin L1', value: '~10 min', sublabel: 'por confirmação', bad: true },
                        { label: 'Velocidade Lightning', value: '<3 seg', sublabel: 'confirmação final', bad: false },
                        { label: 'Taxa Bitcoin L1', value: 'R$ 5–50+', sublabel: 'por transação', bad: true },
                        { label: 'Taxa Lightning', value: '~R$ 0,005', sublabel: 'por transação', bad: false },
                        { label: 'TPS Bitcoin L1', value: '~7', sublabel: 'transações/seg', bad: true },
                        { label: 'TPS Lightning', value: '~1.000.000', sublabel: 'transações/seg', bad: false },
                      ].map((m) => (
                        <motion.div key={m.label}
                          whileHover={{ x: m.bad ? 0 : 4 }}
                          className={`flex items-center justify-between py-1.5 px-2 rounded-lg transition-all duration-300 ${!m.bad ? 'hover:bg-yellow-500/[0.04]' : ''}`}>
                          <div>
                            <p className={`text-xs font-medium ${m.bad ? 'text-stone-600' : 'text-stone-300'}`}>{m.label}</p>
                            <p className="text-[10px] text-stone-700">{m.sublabel}</p>
                          </div>
                          <span className={`text-lg font-bold ${m.bad ? 'text-red-500/60' : 'text-yellow-500'}`}
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {m.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA mini with breathing animation */}
                  <motion.div
                    animate={{ boxShadow: ['0 0 0px rgba(234,179,8,0)', '0 0 30px rgba(234,179,8,0.06)', '0 0 0px rgba(234,179,8,0)'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-yellow-500/[0.04] border border-yellow-500/[0.12] rounded-2xl p-6 text-center hover:border-yellow-500/25 transition-all duration-500">
                    <Zap size={20} className="text-yellow-500 mx-auto mb-3" />
                    <p className="text-white text-sm font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Quer ver na prática?
                    </p>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      Role até o final desta página e envie seu primeiro pagamento Lightning. Pode ser 1 sat. A experiência muda tudo.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Cinematic Break: Lightning Circuit ── */}
        <section className="relative z-10 py-8 md:py-14">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: APPLE_EASE }}
              className="relative rounded-2xl overflow-hidden border border-white/[0.06] group">
              <img src={lightningCircuitImg} alt="Energia elétrica fluindo por circuito — Lightning Network" className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.7) saturate(0.85)' }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">Energia convertida em velocidade. Circuitos que movem valor em milissegundos.</p>
                <div className="hidden md:block w-12 h-px bg-gradient-to-r from-yellow-500/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatedDivider />

        {/* ╔══════════════════════════════════════╗
            ║  CAPÍTULO 02 — COMO FUNCIONA        ║
            ╚══════════════════════════════════════╝ */}
        <section id="como-funciona" className="py-24 md:py-32 relative overflow-hidden" style={{ background: BG_ALT }}>
          <SectionGlow color="yellow" position="right" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(rgba(234,179,8,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 02"
                title="Como Funciona a Lightning Network?"
                subtitle="A mecânica dos canais de pagamento — e por que cada transação que você faz na Lightning nunca toca a blockchain principal."
                align="center"
              />

              <motion.div variants={fadeUp} custom={1} className="max-w-3xl mx-auto text-center mb-16">
                <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                  O coração do funcionamento da Lightning é a criação de <strong className="text-white">canais de pagamento</strong> entre os participantes. Em vez de registrar cada transação individualmente na blockchain — o que geraria congestionamento e custos —, as operações acontecem <strong className="text-yellow-500">off-chain</strong> (fora da rede principal). Apenas os saldos finais são gravados efetivamente na blockchain do Bitcoin.
                </p>
              </motion.div>

              {/* 3-Step Process — Premium Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[
                  { icon: Layers, title: 'Abertura do Canal', step: '01', desc: 'Dois participantes travam Bitcoin num contrato multisig na blockchain. Esse depósito bilateral abre uma via expressa privada: a partir deste momento, podem trocar satoshis ilimitadamente entre si sem tocar na cadeia principal.', detail: 'É como abrir uma conta corrente conjunta com alguém. O dinheiro está lá, protegido pela blockchain, mas vocês transacionam livremente sem ir ao banco a cada operação.' },
                  { icon: Route, title: 'Roteamento Onion', step: '02', desc: 'Não tem canal direto com o destinatário? O pagamento salta automaticamente entre nodes intermediários — e nenhum deles conhece o remetente original ou o destinatário final. Privacidade criptográfica por arquitetura.', detail: 'O modelo replica o funcionamento do Tor: cada node da rota só conhece o node anterior e o próximo. Não existe um ponto central que enxerga a transação completa.' },
                  { icon: Repeat, title: 'Fechamento do Canal', step: '03', desc: 'Quando quiser, feche o canal. A transação final é publicada na blockchain refletindo os saldos finais de cada participante. Milhares de transações intermediárias comprimidas numa única gravação.', detail: 'Se Alice enviou 50.000 sats para Bob em 200 micro-transações, a blockchain só registra: "Alice tinha X, agora Bob tem X+50.000". Eficiência brutal.' },
                ].map((item, i) => (
                  <motion.div key={item.title} variants={scaleIn} custom={i}
                    className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 overflow-hidden
                               hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition-all duration-700"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}>
                    {/* Corner accent */}
                    <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-yellow-500/40 to-transparent" />
                      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-yellow-500/40 to-transparent" />
                    </div>
                    {/* Step number glow */}
                    <div className="absolute top-4 right-4 text-[48px] font-bold text-yellow-500/[0.04] leading-none"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{item.step}</div>
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-yellow-500/[0.08] border border-yellow-500/[0.15] flex items-center justify-center mb-6
                                      group-hover:bg-yellow-500/15 group-hover:border-yellow-500/30 group-hover:shadow-[0_0_25px_rgba(234,179,8,0.1)] transition-all duration-500">
                        <item.icon size={28} className="text-yellow-500" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {item.title}
                      </h4>
                      <p className="text-stone-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                      <p className="text-stone-600 text-xs leading-relaxed italic border-t border-white/[0.05] pt-4">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Toll Road Analogy */}
              <motion.div variants={fadeUp} custom={4}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-12 relative overflow-hidden
                           hover:border-yellow-500/15 transition-all duration-700">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Car size={32} className="text-yellow-500/60 mb-4" />
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      A Analogia da Rodovia com Pedágio
                    </h4>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Pense no tráfego em rodovias com pedágio. Usar a rede principal do Bitcoin para cada transação é a mesma coisa que parar no guichê, pegar moedas e cédulas e pagar o ticket manualmente — cada carro, cada vez, congestionando a fila.
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-yellow-500/[0.06] border border-yellow-500/[0.15] rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/[0.03] to-transparent" />
                    <div className="relative">
                      <Tag size={24} className="text-yellow-500 mb-3" />
                      <h5 className="text-white font-bold text-sm mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Lightning = Tag Automática
                      </h5>
                      <p className="text-stone-400 text-xs leading-relaxed">
                        A Lightning representa os carros com tag de abertura automática da cancela. A passagem é instantânea, o pedágio é registrado — mas o débito final só é liquidado quando o ciclo fecha. Milhares de passagens, uma única cobrança consolidada na blockchain.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <AnimatedDivider />

        {/* ╔══════════════════════════════════════╗
            ║  CAPÍTULO 03 — LAYER-2              ║
            ╚══════════════════════════════════════╝ */}
        <section id="layer-2" className="py-24 md:py-32 relative overflow-hidden" style={{ background: BG_DARK }}>
          <SectionGlow color="blue" position="center" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 03"
                title="O Que São Soluções de Segunda Camada?"
                subtitle="A arquitetura que separa velocidade de segurança — e permite que ambas coexistam."
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <motion.div variants={fadeUp} custom={1} className="space-y-6">
                  <p className="text-stone-300 text-base leading-relaxed">
                    Soluções de segunda camada são <strong className="text-white">protocolos construídos sobre uma blockchain existente</strong> — como a do Bitcoin — com uma missão específica: aumentar a capacidade de transação da rede sem sobrecarregar a camada principal.
                  </p>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    Ao processar transações fora da blockchain principal e liquidar apenas os resultados finais, essas soluções oferecem o melhor dos dois mundos: a <strong className="text-yellow-500">velocidade e o baixo custo de um sistema off-chain</strong>, combinados com a <strong className="text-white">segurança imutável da blockchain subjacente</strong>.
                  </p>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    A Lightning Network é a implementação mais madura e amplamente adotada desse conceito no ecossistema Bitcoin. Mas o princípio é universal: toda blockchain com limitações de throughput pode se beneficiar de uma extensão de segunda camada.
                  </p>
                </motion.div>

                {/* Layer Architecture Visual */}
                <motion.div variants={slideRight} custom={2} className="space-y-4">
                  {[
                    { layer: 'Layer 1 — Bitcoin', desc: 'Tribunal final. Liquidação definitiva. Segurança máxima. Lento por design.', color: 'orange', icon: Shield },
                    { layer: 'Layer 2 — Lightning', desc: 'Via expressa. Velocidade instantânea. Custo negligenciável. Privacidade criptográfica.', color: 'yellow', icon: Zap },
                  ].map((l, i) => (
                    <motion.div key={l.layer}
                      whileHover={{ x: 6, transition: { duration: 0.3 } }}
                      className={`relative rounded-2xl p-6 border transition-all duration-500 overflow-hidden ${
                        i === 0
                          ? 'bg-orange-500/[0.03] border-orange-500/[0.12] hover:border-orange-500/25'
                          : 'bg-yellow-500/[0.05] border-yellow-500/[0.15] hover:border-yellow-500/30'
                      }`}>
                      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${i === 0 ? 'bg-orange-500/40' : 'bg-yellow-500/50'}`} />
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-xl shrink-0 ${
                          i === 0 ? 'bg-orange-500/[0.08] border border-orange-500/[0.15]' : 'bg-yellow-500/[0.1] border border-yellow-500/[0.2]'
                        }`}>
                          <l.icon size={20} className={i === 0 ? 'text-orange-400' : 'text-yellow-500'} />
                        </div>
                        <div>
                          <p className={`text-sm font-bold mb-1 ${i === 0 ? 'text-orange-300' : 'text-yellow-400'}`}
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{l.layer}</p>
                          <p className="text-stone-500 text-xs leading-relaxed">{l.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="flex justify-center py-2">
                    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                      <ChevronDown size={18} className="text-yellow-500/30" />
                    </motion.div>
                  </div>
                  <div className="text-center bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                    <p className="text-stone-600 text-[10px] font-bold tracking-[0.3em] uppercase">Resultado</p>
                    <p className="text-white text-sm font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Segurança + Velocidade + Custo Zero
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Cinematic Break: Mobile Payment ── */}
        <section className="relative z-10 py-8 md:py-14">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: APPLE_EASE }}
              className="relative rounded-2xl overflow-hidden border border-white/[0.06] group">
              <img src={lightningMobileImg} alt="Pagamento Lightning via smartphone" className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.7) saturate(0.9)' }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">Escaneie. Pague. 3 segundos. Sem banco, sem permissão, sem fronteiras.</p>
                <div className="hidden md:block w-12 h-px bg-gradient-to-r from-yellow-500/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatedDivider />
        <section id="como-usar" className="py-24 md:py-32 relative overflow-hidden" style={{ background: BG_ALT }}>
          <SectionGlow color="emerald" position="left" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 04"
                title="Como Usar a Lightning Network"
                subtitle="O passo a passo para começar a transacionar com soberania instantânea. Sem banco, sem CPF, sem permissão."
                align="center"
              />

              {/* Step by step — Vertical Timeline */}
              <div className="max-w-3xl mx-auto relative">
                {/* Timeline line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: APPLE_EASE }}
                  className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] origin-top"
                  style={{ background: 'linear-gradient(180deg, rgba(234,179,8,0.4), rgba(234,179,8,0.1), transparent)' }}
                />

                {[
                  { step: '01', title: 'Instale uma Carteira Lightning', desc: 'Baixe Phoenix (recomendada para soberania) ou Wallet of Satoshi (para primeiros testes). Não precisa de e-mail, CPF ou cadastro.', cta: 'Disponível para Android e iOS.' },
                  { step: '02', title: 'Receba ou Compre Bitcoin', desc: 'Transfira BTC de uma exchange ou receba diretamente na sua carteira Lightning. Phoenix abre canais automaticamente.', cta: 'Exchanges compatíveis: Foxbit, Bipa, Mercado Bitcoin.' },
                  { step: '03', title: 'Envie e Receba Instantaneamente', desc: 'Use Lightning Address (como um e-mail) ou escaneie uma Invoice (QR Code). A transação é confirmada em menos de 3 segundos.', cta: 'Teste agora: envie 1 sat para o endereço no final desta página.' },
                ].map((item, i) => (
                  <motion.div key={item.step} variants={slideLeft} custom={i}
                    className="relative pl-16 md:pl-20 mb-12 last:mb-0 group">
                    {/* Timeline dot */}
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.2, ease: APPLE_EASE }}
                      className="absolute left-[14px] md:left-[22px] top-2 w-7 h-7 rounded-full bg-yellow-500/10 border-2 border-yellow-500/40 flex items-center justify-center
                                 group-hover:bg-yellow-500/20 group-hover:border-yellow-500/60 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all duration-500">
                      <span className="text-[9px] font-bold text-yellow-500">{item.step}</span>
                    </motion.div>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8
                                    hover:border-yellow-500/15 hover:bg-yellow-500/[0.01] transition-all duration-500">
                      <h4 className="text-lg md:text-xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h4>
                      <p className="text-stone-400 text-sm leading-relaxed mb-3">{item.desc}</p>
                      <p className="text-yellow-500/60 text-xs font-medium">{item.cta}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Cinematic Break: Global Network ── */}
        <section className="relative z-10 py-8 md:py-14">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: APPLE_EASE }}
              className="relative rounded-2xl overflow-hidden border border-white/[0.06] group">
              <img src={lightningRedeImg} alt="Rede global de nodes Lightning Network" className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.7) saturate(0.9)' }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">19.374+ nodes interconectados. Uma rede que não conhece fronteiras, fusos ou feriados.</p>
                <div className="hidden md:block w-12 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatedDivider />

        <section id="casos-de-uso" className="py-24 md:py-32 relative overflow-hidden" style={{ background: BG_DARK }}>
          <SectionGlow color="yellow" position="right" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 05"
                title="Casos de Uso Reais"
                subtitle="Não é teoria. São cenários que já estão acontecendo agora — em El Salvador, na Argentina, no Brasil e no mundo inteiro."
                align="center"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {useCases.map((uc, i) => (
                  <motion.div key={uc.title} variants={scaleIn} custom={i}
                    className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 overflow-hidden
                               hover:border-yellow-500/20 transition-all duration-700"
                    whileHover={{ y: -3, transition: { duration: 0.3 } }}>
                    {/* Impact badge */}
                    <div className={`absolute top-4 right-4 text-[8px] font-bold tracking-[0.3em] uppercase px-2 py-1 rounded-md border ${
                      uc.impact === 'alto'
                        ? 'text-yellow-500/60 bg-yellow-500/[0.06] border-yellow-500/[0.12]'
                        : 'text-stone-600 bg-white/[0.03] border-white/[0.05]'
                    }`}>{uc.impact === 'alto' ? '⚡ Alto Impacto' : 'Relevante'}</div>
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/[0.06] border border-yellow-500/[0.12] flex items-center justify-center mb-5
                                      group-hover:bg-yellow-500/15 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.08)] transition-all duration-500">
                        <uc.icon size={22} className="text-yellow-500/70 group-hover:text-yellow-500 transition-colors" />
                      </div>
                      <h4 className="text-base font-bold text-white mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{uc.title}</h4>
                      <p className="text-stone-400 text-xs leading-relaxed mb-4">{uc.desc}</p>
                      <div className="border-t border-white/[0.05] pt-3">
                        <p className="text-stone-600 text-[11px] leading-relaxed italic">{uc.example}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatedDivider />

        {/* ╔══════════════════════════════════════╗
            ║  CAPÍTULO 06 — CARTEIRAS            ║
            ╚══════════════════════════════════════╝ */}
        <section id="arsenal-carteiras" className="py-24 md:py-32 relative overflow-hidden" style={{ background: BG_ALT }}>
          <SectionGlow color="yellow" position="center" />
          {/* Hex pattern */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(234,179,8,0.2) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 06"
                title="Arsenal de Carteiras Lightning"
                subtitle="A carteira que você escolhe define quem controla o seu dinheiro. Não existe meio-termo."
                align="center"
              />

              <div className="space-y-6">
                {wallets.map((w, i) => {
                  const isRisk = w.accent === 'red';
                  const isBlue = w.accent === 'blue';
                  const borderHover = isRisk ? 'hover:border-red-500/25' : isBlue ? 'hover:border-blue-500/25' : 'hover:border-yellow-500/40';
                  const bgColor = isRisk ? 'bg-red-500/[0.02]' : isBlue ? 'bg-blue-500/[0.02]' : 'bg-yellow-500/[0.03]';
                  const accentText = isRisk ? 'text-red-400' : isBlue ? 'text-blue-400' : 'text-yellow-500';
                  const borderColor = isRisk ? 'border-red-500/10' : isBlue ? 'border-blue-500/10' : 'border-yellow-500/20';
                  const badgeBg = isRisk ? 'bg-red-500/[0.08] text-red-500/70 border-red-500/15' :
                    isBlue ? 'bg-blue-500/[0.08] text-blue-400/70 border-blue-500/15' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
                  const glowColor = isRisk ? 'rgba(239,68,68,0.05)' : isBlue ? 'rgba(59,130,246,0.05)' : 'rgba(234,179,8,0.08)';

                  return (
                    <motion.div key={w.name} variants={scaleIn} custom={i}
                      whileHover={{ y: -2, boxShadow: `0 0 40px ${glowColor}` }}
                      className={`${bgColor} border ${borderColor} ${borderHover} rounded-2xl p-8 md:p-10 relative overflow-hidden transition-all duration-700 group`}>
                      {/* Top accent line */}
                      {!isRisk && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.2, ease: APPLE_EASE }}
                          className="absolute top-0 left-0 right-0 h-px origin-left"
                          style={{ background: isBlue ? 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' : 'linear-gradient(90deg, transparent, rgba(234,179,8,0.4), transparent)' }}
                        />
                      )}

                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-6">
                            <motion.div
                              whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
                              className={`p-3 rounded-xl ${isRisk ? 'bg-red-500/[0.08] border border-red-500/[0.15]' : isBlue ? 'bg-blue-500/[0.08] border border-blue-500/[0.15]' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
                              <w.icon size={24} className={accentText} />
                            </motion.div>
                            <div>
                              <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{w.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[9px] font-bold tracking-[0.4em] uppercase px-2.5 py-1 rounded-md border ${badgeBg}`}>{w.type}</span>
                                <span className={`text-[9px] font-bold tracking-[0.3em] uppercase ${accentText}`}>{w.verdict}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-stone-400 text-sm leading-relaxed">{w.desc}</p>
                        </div>

                        <div className="md:w-[320px] space-y-4">
                          <div>
                            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-emerald-500/60 mb-2 block">Prós</span>
                            <div className="space-y-1.5">
                              {w.pros.map(p => (
                                <div key={p} className="flex items-center gap-2 text-stone-400 text-xs">
                                  <CheckCircle size={12} className="text-emerald-500/60 shrink-0" /><span>{p}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-red-500/60 mb-2 block">Contras</span>
                            <div className="space-y-1.5">
                              {w.cons.map(c => (
                                <div key={c} className="flex items-center gap-2 text-stone-500 text-xs">
                                  <XCircle size={12} className="text-red-500/50 shrink-0" /><span>{c}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Golden Rule — with breathing glow */}
              <motion.div variants={fadeUp} custom={4}
                animate={{ boxShadow: ['0 0 0px rgba(234,179,8,0)', '0 0 40px rgba(234,179,8,0.05)', '0 0 0px rgba(234,179,8,0)'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-10 bg-yellow-500/[0.04] border border-yellow-500/[0.15] rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-yellow-500/[0.03] via-transparent to-transparent" />
                <div className="relative">
                  <AlertTriangle size={28} className="text-yellow-500 mx-auto mb-4" />
                  <p className="text-white text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                    Regra de Ouro da Custódia
                  </p>
                  <p className="text-stone-400 text-sm leading-relaxed max-w-xl mx-auto">
                    Use carteiras custodiais <strong className="text-stone-200">exclusivamente</strong> para valores que você está disposto a perder — como troco no bolso.
                    Para qualquer valor significativo, a soberania das suas chaves privadas é absolutamente inegociável.
                    <span className="text-yellow-500 font-bold block mt-3 text-lg"> Not your keys, not your coins.</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <AnimatedDivider />

        {/* ╔══════════════════════════════════════╗
            ║  CAPÍTULO 07 — CRIADORES            ║
            ╚══════════════════════════════════════╝ */}
        <section id="criadores" className="py-24 md:py-32 relative overflow-hidden" style={{ background: BG_DARK }}>
          <SectionGlow color="yellow" position="left" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 07"
                title="Os Criadores da Lightning Network"
                subtitle="Quem projetou a solução que transformou o Bitcoin de ouro digital em dinheiro instantâneo."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  { name: 'Joseph Poon', role: 'Co-autor do White Paper', desc: 'Pesquisador e criptógrafo que co-concebeu a arquitetura dos canais de pagamento bidirecionais. Seu trabalho definiu como transações off-chain poderiam herdar a segurança da blockchain principal sem comprometer a descentralização. Também contribuiu para o desenvolvimento do conceito de Plasma na Ethereum.' },
                  { name: 'Thaddeus Dryja', role: 'Co-autor do White Paper', desc: 'Engenheiro e pesquisador do MIT Digital Currency Initiative. Co-desenvolveu o protocolo de canais de pagamento e os mecanismos de penalidade que garantem honestidade entre participantes. Seu trabalho posterior no MIT focou em Utreexo, uma proposta para comprimir a blockchain do Bitcoin.' },
                ].map((person, i) => (
                  <motion.div key={person.name} variants={scaleIn} custom={i}
                    whileHover={{ y: -3, transition: { duration: 0.3 } }}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-10 relative overflow-hidden
                               hover:border-yellow-500/15 transition-all duration-500 group">
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-yellow-500/30 to-transparent" />
                      <div className="absolute top-0 right-0 h-[1px] w-full bg-gradient-to-l from-yellow-500/30 to-transparent" />
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-yellow-500/[0.06] border border-yellow-500/[0.12] flex items-center justify-center mb-5
                                    group-hover:bg-yellow-500/10 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.1)] transition-all duration-500">
                      <Cpu size={24} className="text-yellow-500/70" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{person.name}</h4>
                    <p className="text-yellow-500/60 text-xs font-bold tracking-[0.3em] uppercase mb-4">{person.role}</p>
                    <p className="text-stone-400 text-sm leading-relaxed">{person.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} custom={3}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-10 relative overflow-hidden hover:border-yellow-500/10 transition-all duration-500">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: APPLE_EASE }}
                  className="absolute top-0 left-0 right-0 h-px origin-left"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(234,179,8,0.3), transparent)' }}
                />
                <div className="flex items-start gap-4 mb-4">
                  <Landmark size={24} className="text-yellow-500/50 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Da Proposta à Revolução (2015 – Hoje)
                    </h4>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Em 2015, Poon e Dryja publicaram o white paper "The Bitcoin Lightning Network: Scalable Off-Chain Instant Payments" — o documento que formalizou a visão de uma rede descentralizada de micropagamentos capaz de resolver os problemas de escalabilidade do Bitcoin. A versão beta foi lançada em 2018, e desde então a Lightning tem sido desenvolvida, testada e aprimorada por uma comunidade dedicada de desenvolvedores, empresas e entusiastas ao redor do mundo. Não é um produto de uma empresa — é um protocolo aberto que pertence a todos.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <AnimatedDivider />

        {/* ╔══════════════════════════════════════╗
            ║  CAPÍTULO 08 — ADOÇÃO GLOBAL        ║
            ╚══════════════════════════════════════╝ */}
        <section id="adocao-global" className="py-24 md:py-32 relative overflow-hidden" style={{ background: BG_ALT }}>
          <SectionGlow color="yellow" position="center" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 08"
                title="Adoção Global — Quem Já Está Usando"
                subtitle="De El Salvador às favelas da Nigéria. A Lightning cresce organicamente porque resolve problemas reais."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[
                  {
                    emoji: '🇸🇻', title: 'El Salvador — O Primeiro País', highlight: true,
                    text: 'Em setembro de 2021, El Salvador se tornou o primeiro país do mundo a adotar Bitcoin como moeda de curso legal. A Lightning Network é a espinha dorsal dos pagamentos diários via app Chivo Wallet. Milhões de transações processadas, remessas internacionais sem Western Union, e inclusão financeira real para 70% da população que simplesmente não tinha conta bancária.',
                  },
                  {
                    emoji: '🌍', title: 'Expansão Orgânica', highlight: false,
                    text: 'Argentina usa Lightning para escapar de controles cambiais sufocantes. Nigéria e Gana para remessas familiares que antes perdiam 8% para intermediários. Europa para micropagamentos em conteúdo digital. Japão para compras em lojas físicas com QR Code. A rede não cresce por marketing — cresce porque resolve problemas que o sistema financeiro criou.',
                  },
                ].map((item, i) => (
                  <motion.div key={item.title} variants={scaleIn} custom={i}
                    whileHover={{ y: -3, transition: { duration: 0.3 } }}
                    className={`relative rounded-2xl p-8 overflow-hidden transition-all duration-700 ${
                      item.highlight
                        ? 'bg-white/[0.03] border border-yellow-500/[0.15] hover:border-yellow-500/30'
                        : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12]'
                    }`}>
                    {item.highlight && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />}
                    <div className="text-4xl mb-4">{item.emoji}</div>
                    <h4 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Brasil — Full width hero card */}
              <motion.div variants={scaleIn} custom={2}
                className="relative rounded-2xl p-8 md:p-10 overflow-hidden transition-all duration-700
                           bg-yellow-500/[0.04] border border-yellow-500/[0.15] hover:border-yellow-500/25">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/[0.03] via-transparent to-transparent" />
                <div className="relative">
                  <div className="text-4xl mb-4">🇧🇷</div>
                  <h4 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Brasil — O Gigante Que Está Acordando
                  </h4>
                  <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                    O Brasil é um dos maiores mercados de Bitcoin do mundo, mas a adoção da Lightning ainda está nos estágios iniciais.
                    Comunidades em São Paulo, Florianópolis e Brasília já aceitam pagamentos Lightning em feiras, mercados locais e comércios independentes.
                    Com o DREX (Real Digital) avançando silenciosamente como a ferramenta definitiva de vigilância financeira estatal,
                    a Lightning se posiciona como a alternativa soberana: pagamentos instantâneos, sem CPF, sem rastreamento comportamental,
                    sem limite de horário, sem permissão de burocrata.
                  </p>
                  <motion.p
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-yellow-500 font-bold text-lg mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    O Pix do povo é o Lightning. E ele não precisa de banco central.
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <AnimatedDivider />

        {/* ╔══════════════════════════════════════╗
            ║  CAPÍTULO 09 — OS NÚMEROS           ║
            ╚══════════════════════════════════════╝ */}
        <section id="numeros" className="py-24 md:py-32 relative overflow-hidden" style={{ background: BG_DARK }}>
          <SectionGlow color="yellow" position="right" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 09"
                title="Os Números Não Mentem"
                subtitle="Crescimento de 132% em nodes públicos entre 2021 e 2022. E estes são apenas os nodes visíveis."
                align="center"
              />

              {/* Animated Growth Stats */}
              <motion.div variants={fadeUp} custom={1} className="max-w-3xl mx-auto mb-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center group hover:border-white/[0.1] transition-all duration-500">
                    <p className="text-stone-600 text-[10px] font-bold tracking-[0.5em] uppercase mb-3">Janeiro 2021</p>
                    <p className="text-3xl md:text-4xl font-bold text-stone-400">
                      <AnimatedNumber value={8321} />
                    </p>
                    <p className="text-stone-600 text-xs mt-2">Nodes públicos ativos</p>
                  </div>
                  <motion.div
                    animate={{ boxShadow: ['0 0 0px rgba(234,179,8,0)', '0 0 30px rgba(234,179,8,0.06)', '0 0 0px rgba(234,179,8,0)'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-yellow-500/[0.04] border border-yellow-500/[0.15] rounded-2xl p-8 text-center">
                    <p className="text-yellow-500/50 text-[10px] font-bold tracking-[0.5em] uppercase mb-3">Janeiro 2022</p>
                    <p className="text-3xl md:text-4xl font-bold text-yellow-500">
                      <AnimatedNumber value={19374} />
                    </p>
                    <p className="text-stone-500 text-xs mt-2">Nodes públicos ativos <span className="text-emerald-400 font-bold">(+132%)</span></p>
                  </motion.div>
                </div>
                <p className="text-stone-600 text-xs text-center mt-4 italic">
                  * Estes números não incluem os "nodes privados". Se contabilizados, o total seria exponencialmente maior.
                </p>
              </motion.div>

              {/* Network Stats Grid — with hover glow */}
              <motion.div variants={fadeUp} custom={2}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {networkStats.map((stat, i) => (
                    <motion.div key={stat.label}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center
                                 hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] hover:shadow-[0_0_20px_rgba(234,179,8,0.05)] transition-all duration-300 group">
                      <stat.icon size={18} className="text-yellow-500/40 mx-auto mb-2 group-hover:text-yellow-500 transition-colors duration-300" />
                      <div className="text-yellow-500 text-xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {stat.value}
                      </div>
                      <div className="text-stone-400 text-[10px] font-bold tracking-wider uppercase">{stat.label}</div>
                      <div className="text-stone-700 text-[9px] mt-1">{stat.detail}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <AnimatedDivider />

        {/* ╔══════════════════════════════════════╗
            ║  CAPÍTULO 10 — FAQ                  ║
            ╚══════════════════════════════════════╝ */}
        <section id="faq" className="py-24 md:py-32 relative overflow-hidden" style={{ background: BG_ALT }}>
          <SectionGlow color="yellow" position="left" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 10"
                title="Perguntas Frequentes"
                subtitle="As dúvidas mais comuns sobre a Lightning Network — respondidas com clareza técnica e sem rodeios."
                align="center"
              />

              <div className="max-w-3xl mx-auto space-y-3">
                {faqItems.map((faq, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i}
                    className={`bg-white/[0.03] border rounded-xl overflow-hidden transition-all duration-500 ${
                      openFaq === i ? 'border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.04)]' : 'border-white/[0.06] hover:border-yellow-500/15'
                    }`}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left group">
                      <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
                      <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown size={16} className="text-yellow-500/50 shrink-0" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: APPLE_EASE }}>
                          <div className="px-5 pb-5 border-t border-white/[0.05]">
                            <p className="text-stone-400 text-sm leading-relaxed pt-4">{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatedDivider />

        {/* ╔══════════════════════════════════════╗
            ║  CTA FINAL — LIGHTNING DONATION     ║
            ╚══════════════════════════════════════╝ */}
        <section id="apoie" className="py-24 md:py-32 relative overflow-hidden" style={{ background: BG_DARK }}>
          <SectionGlow color="yellow" position="center" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <motion.div variants={fadeUp} custom={0}
                className="bg-white/[0.02] border border-yellow-500/10 rounded-3xl p-10 md:p-16 relative overflow-hidden">
                {/* Multi-layer glow */}
                <div className="absolute inset-0 bg-gradient-radial from-yellow-500/[0.05] via-transparent to-transparent" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: APPLE_EASE }}
                  className="absolute top-0 left-0 right-0 h-px origin-center"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent)' }}
                />
                <motion.div
                  animate={{ opacity: [0.02, 0.05, 0.02] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-conic from-yellow-500/[0.03] via-transparent to-yellow-500/[0.03]"
                />

                <div className="relative z-10">
                  <div className="text-center mb-12">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                      <Zap size={40} className="text-yellow-500/40 mx-auto mb-6" />
                    </motion.div>
                    <motion.h2 variants={fadeUp} custom={1}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                      Agora Que Você Sabe,{' '}
                      <span className="text-yellow-500">Coloque em Prática.</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={2}
                      className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                      Este conteúdo é gratuito, sem anúncios, sem paywall, sem rastreamento e sem patrocínio. Se ele ampliou sua visão e colocou
                      ferramentas reais nas suas mãos, considere enviar alguns satoshis como sinal de que informação livre tem valor de verdade.
                      Qualquer quantia — até 1 sat — é um voto pela soberania do conhecimento.
                    </motion.p>
                  </div>

                  {/* Lightning Address Card */}
                  <motion.div variants={scaleIn} custom={3} className="max-w-lg mx-auto">
                    <motion.div
                      animate={{ boxShadow: ['0 0 0px rgba(234,179,8,0)', '0 0 50px rgba(234,179,8,0.07)', '0 0 0px rgba(234,179,8,0)'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      className="bg-white/[0.03] border border-yellow-500/20 rounded-2xl p-8 text-center
                                  hover:border-yellow-500/35 transition-all duration-500">
                      <button onClick={() => setShowQrModal(true)}
                        className="w-32 h-32 mx-auto mb-6 rounded-xl overflow-hidden border-2 border-yellow-500/20
                                   hover:border-yellow-500/40 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] transition-all duration-300 cursor-pointer">
                        <img src={qrCodeImage} alt="QR Code Lightning Network" className="w-full h-full object-cover" loading="lazy" />
                      </button>

                      <p className="text-stone-600 text-[9px] font-bold tracking-[0.5em] uppercase mb-4">Lightning Address</p>

                      <button onClick={handleCopy}
                        className="flex items-center gap-3 mx-auto bg-yellow-500/[0.06] border border-yellow-500/15 rounded-xl px-5 py-3
                                   hover:bg-yellow-500/10 hover:border-yellow-500/25 hover:shadow-[0_0_15px_rgba(234,179,8,0.08)] transition-all duration-300 group">
                        <Zap size={14} className="text-yellow-500" />
                        <span className="text-yellow-400/80 text-xs font-mono tracking-wide">{LIGHTNING_ADDRESS}</span>
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-stone-600 group-hover:text-yellow-500/60 transition-colors" />}
                      </button>

                      {copied && (
                        <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                          className="text-emerald-400/70 text-[10px] font-bold tracking-wider uppercase mt-3">
                          Endereço copiado ⚡
                        </motion.p>
                      )}

                      <p className="text-stone-700 text-xs mt-6 leading-relaxed">
                        Escaneie o QR Code ou copie o endereço acima. Envie de qualquer carteira Lightning compatível.
                      </p>
                    </motion.div>

                    {/* PNL Anchoring */}
                    <div className="mt-6 grid grid-cols-4 gap-2">
                      {[
                        { sats: '1.000', label: 'Um café' },
                        { sats: '5.000', label: 'Uma aula' },
                        { sats: '10.000', label: 'Um capítulo' },
                        { sats: 'Livre', label: 'Soberania' },
                      ].map((level) => (
                        <motion.div key={level.sats}
                          whileHover={{ y: -2, transition: { duration: 0.2 } }}
                          className="bg-white/[0.02] border border-white/[0.05] rounded-lg py-3 px-2 text-center
                                     hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition-all duration-300 cursor-default">
                          <div className="text-yellow-500 text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {level.sats}
                          </div>
                          <div className="text-stone-600 text-[9px] tracking-wider uppercase mt-0.5">{level.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Continue Exploring */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                    <Link to="/autocustodia"
                      className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/25 rounded-xl px-8 py-4
                                 text-yellow-400 text-sm font-bold uppercase tracking-wider
                                 hover:bg-yellow-500/20 hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] transition-all duration-500 group">
                      Aprenda Autocustódia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/bitcoin/o-que-e"
                      className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-8 py-4
                                 text-stone-400 text-sm font-bold uppercase tracking-wider
                                 hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500">
                      O Que é o Bitcoin <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
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
