import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence, useSpring } from 'framer-motion';
import {
  Shield, ChevronRight, AlertTriangle, Lock, FileText,
  CheckCircle, XCircle, ChevronDown, Users, Zap, Award,
  ExternalLink, Star, Globe, Clock, DollarSign, MapPin,
  AlertCircle, Fingerprint, Plane, BookOpen,
} from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';

import heroImg from '@/assets/abertura-remota-hero.jpg';
import chapterDocImg from '@/assets/abertura-chapter-documentos.jpg';
import chapterProcessoImg from '@/assets/abertura-chapter-processo.jpg';
import chapterContasImg from '@/assets/abertura-chapter-contas.jpg';
import chapterErrosImg from '@/assets/abertura-chapter-erros.jpg';
import chapterFaqImg from '@/assets/abertura-chapter-faq.jpg';
import brasilParaguaiImg from '@/assets/offshore-brasil-paraguai.jpg';
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
  { id: 'por-que', label: 'Por Quê', num: '01' },
  { id: 'documentacao', label: 'Documentação', num: '02' },
  { id: 'processo', label: 'Processo', num: '03' },
  { id: 'contas', label: 'Contas', num: '04' },
  { id: 'erros', label: 'Erros Fatais', num: '05' },
  { id: 'assessoria', label: 'Assessoria', num: '06' },
  { id: 'faq', label: 'FAQ', num: '07' },
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

/* ═══ STEP DATA ═══ */
const STEPS = [
  {
    num: '01',
    title: 'Obtenção da Cédula Paraguaia',
    duration: '3-7 dias úteis',
    description: 'O processo começa com a obtenção da cédula de identidade paraguaia — o documento que será usado para abrir todas as contas offshore sem vinculação ao CPF brasileiro.',
    details: [
      'Processo 100% legal e reconhecido internacionalmente',
      'Pode ser feito presencialmente em Ciudad del Este ou por assessoria remota',
      'Documento válido para abertura em fintechs e bancos internacionais',
      'Não gera nenhuma obrigação tributária no Paraguai',
      'Compatível com todas as 9 contas do ranking offshore',
    ],
    icon: FileText,
  },
  {
    num: '02',
    title: 'Preparação dos Documentos',
    duration: '1-2 dias',
    description: 'Com a cédula em mãos, o próximo passo é preparar a documentação complementar que cada plataforma exige para verificação de identidade.',
    details: [
      'Selfie com documento (cédula paraguaia)',
      'Comprovante de endereço no Paraguai (pode ser de terceiros)',
      'E-mail dedicado — não use o mesmo do Brasil',
      'Número de telefone (pode ser virtual ou chip paraguaio)',
      'VPN configurada para IP paraguaio durante o cadastro',
    ],
    icon: Fingerprint,
  },
  {
    num: '03',
    title: 'Abertura Sequencial das Contas',
    duration: '1-3 dias por conta',
    description: 'A abertura deve seguir uma ordem estratégica: primeiro as fintechs mais permissivas, depois as que exigem mais verificação.',
    details: [
      'Etapa 1: Mero ou Etherfy (abertura instantânea, menor fricção)',
      'Etapa 2: RedotPay ou OffRamp (verificação em 24-48h)',
      'Etapa 3: Grabfy ou UglyCash (requer mais documentação)',
      'Etapa 4: Chapo Bank ou Dukascopy (processo bancário formal)',
      'Nunca abra todas no mesmo dia — espaçar minimiza alertas',
    ],
    icon: Globe,
  },
  {
    num: '04',
    title: 'Ativação e Primeiro Depósito',
    duration: '1-2 dias',
    description: 'Após aprovação, cada conta precisa ser ativada com um primeiro depósito. A origem desse depósito define a camada de privacidade.',
    details: [
      'Depósito inicial via cripto (BTC ou USDT) — máxima privacidade',
      'Valor mínimo varia: US$ 10 (fintechs) a US$ 100 (bancos)',
      'Primeiro saque de teste para validar funcionamento',
      'Solicitar cartão físico ou virtual conforme disponibilidade',
      'Configurar autenticação 2FA em todas as contas',
    ],
    icon: DollarSign,
  },
];

const ERROS_FATAIS = [
  {
    title: 'Abrir com CPF Brasileiro',
    description: 'O CRS (Common Reporting Standard) permite troca automática de informações entre 100+ países. Se a conta estiver vinculada ao CPF, a Receita Federal será notificada.',
    severity: 'critical' as const,
  },
  {
    title: 'Usar e-mail pessoal do Brasil',
    description: 'E-mails vinculados a contas brasileiras criam um rastro digital. Use e-mails dedicados, preferencialmente ProtonMail ou Tutanota.',
    severity: 'high' as const,
  },
  {
    title: 'Abrir todas as contas no mesmo dia',
    description: 'Aberturas simultâneas com o mesmo documento geram alertas nos sistemas de compliance. Espaçar em pelo menos 48h entre cada abertura.',
    severity: 'high' as const,
  },
  {
    title: 'Não usar VPN durante o cadastro',
    description: 'Seu IP brasileiro é registrado nos logs da plataforma. Se houver qualquer investigação futura, esse dado pode ser cruzado.',
    severity: 'medium' as const,
  },
  {
    title: 'Depositar diretamente de exchange brasileira',
    description: 'Exchanges brasileiras reportam ao COAF. Enviar cripto diretamente de Binance BR ou Mercado Bitcoin cria um vínculo rastreável entre sua identidade brasileira e a conta offshore.',
    severity: 'critical' as const,
  },
  {
    title: 'Ignorar o 2FA',
    description: 'Contas offshore sem autenticação de dois fatores são alvos fáceis. Um comprometimento pode resultar em perda total dos fundos sem recurso legal.',
    severity: 'medium' as const,
  },
];

const severityConfig = {
  critical: { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', label: 'CRÍTICO' },
  high: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'ALTO' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', label: 'MÉDIO' },
};

const CONTAS_COMPATIVEIS = [
  { name: 'RedotPay', doc: 'PY', abertura: 'Remota', tempo: '24-48h', dificuldade: 'Fácil' },
  { name: 'OffRamp', doc: 'PY', abertura: 'Remota', tempo: '24-48h', dificuldade: 'Fácil' },
  { name: 'Etherfy', doc: 'PY', abertura: 'Remota', tempo: 'Instantânea', dificuldade: 'Fácil' },
  { name: 'Mero', doc: 'PY', abertura: 'Remota', tempo: 'Instantânea', dificuldade: 'Fácil' },
  { name: 'Grabfy', doc: 'PY', abertura: 'Remota', tempo: '24-72h', dificuldade: 'Média' },
  { name: 'UglyCash', doc: 'PY', abertura: 'Geolocalização', tempo: '24h', dificuldade: 'Restrição' },
  { name: 'Chapo Bank', doc: 'PY', abertura: 'Remota', tempo: '5-10 dias', dificuldade: 'Alta' },
  { name: 'Dukascopy', doc: 'PY', abertura: 'Vídeo-call', tempo: '7-14 dias', dificuldade: 'Alta' },
];

const FAQ = [
  { q: 'É legal ter uma cédula paraguaia sendo brasileiro?', a: 'Sim. A cédula paraguaia é um documento de identidade estrangeiro que qualquer pessoa pode solicitar mediante requisitos legais. Não implica renúncia à cidadania brasileira nem gera obrigações tributárias no Paraguai.' },
  { q: 'Preciso ir ao Paraguai presencialmente?', a: 'O processo ideal inclui uma viagem a Ciudad del Este, mas existem assessorias que facilitam o processo remotamente. A assessoria disponível para membros do canal inclui ambas as opções.' },
  { q: 'Quanto custa todo o processo?', a: 'A cédula paraguaia custa entre US$ 200 e US$ 400 dependendo do método (presencial vs. assessorado). A abertura das contas em si é gratuita na maioria das fintechs. Bancos como Dukascopy podem cobrar taxas de abertura.' },
  { q: 'As contas podem ser bloqueadas depois?', a: 'Contas abertas com documentação legítima e que seguem os termos de uso da plataforma não são bloqueadas. O risco existe apenas para quem viola regras de compliance, como enviar valores incompatíveis com o perfil declarado.' },
  { q: 'Posso receber salário nessas contas?', a: 'Sim. Contas como OffRamp e Grabfy permitem receber transferências de terceiros via ACH e SWIFT. Ideal para freelancers e profissionais que recebem em dólares de clientes internacionais.' },
  { q: 'A Receita Federal pode descobrir essas contas?', a: 'Se abertas com cédula paraguaia, essas contas não estão vinculadas ao seu CPF. O CRS não consegue cruzar automaticamente porque a identificação fiscal é diferente. Isso não elimina 100% o risco, mas reduz drasticamente.' },
  { q: 'Quanto tempo leva do início ao fim?', a: 'Com assessoria: 7-14 dias para cédula + 3-7 dias para abertura das primeiras contas. Total: 2-3 semanas. Sem assessoria: pode levar 1-2 meses dependendo da burocracia.' },
  { q: 'Posso usar cartão dessas contas no Brasil?', a: 'Sim. Cartões cripto internacionais funcionam em qualquer maquininha Visa/Mastercard no Brasil e no mundo. O câmbio é feito automaticamente pela plataforma no momento da compra.' },
];

const schemaLD = { '@context': 'https://schema.org', '@type': 'HowTo', name: 'Como Abrir Contas Offshore Remotamente com Cédula Paraguaia', description: 'Guia completo passo-a-passo para abertura remota de contas offshore cripto usando documentação paraguaia — sem vincular ao CPF brasileiro.', url: 'https://lordjunnior.com.br/soberania-financeira/contas-offshore/abertura-remota', step: STEPS.map(s => ({ '@type': 'HowToStep', name: s.title, text: s.description })) };
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
const AberturaRemota = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const [showLeadModal, setShowLeadModal] = useState(false);

  return (
    <>
      <Helmet>
        <title>Guia de Abertura Remota — Contas Offshore Cripto com Cédula Paraguaia | Soberania Financeira</title>
        <meta name="description" content="Passo-a-passo completo para abrir contas offshore cripto remotamente usando cédula paraguaia. Sem CPF, sem reporte, sem KYC brasileiro." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/contas-offshore/abertura-remota" />
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

        {/* ═══ FILM GRAIN ═══ */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.035]">
          <svg width="100%" height="100%"><filter id="ar-grain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter="url(#ar-grain)" /></svg>
        </div>

        {/* ═══ DIAGONAL LIGHT BEAMS ═══ */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[200px] -left-[200px] w-[1200px] h-[300px] opacity-[0.025] rotate-[25deg]"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(245,158,11,0.6), transparent)' }} />
          <div className="absolute -bottom-[150px] -right-[150px] w-[900px] h-[200px] opacity-[0.02] -rotate-[30deg]"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(16,185,129,0.5), transparent)' }} />
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
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/70">CONTAS OFFSHORE · GUIA DE ABERTURA</span>
            </motion.div>
            <div className="flex items-start gap-5 mb-6">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 shrink-0 backdrop-blur-sm">
                <Plane className="text-amber-400" size={30} />
              </motion.div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                  className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.92]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Guia de Abertura<br />Remota com<br /><span className="text-amber-400">Cédula Paraguaia</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                  className="text-stone-400 text-sm md:text-base lg:text-lg leading-relaxed mt-5 max-w-2xl">
                  Passo-a-passo completo para abrir contas offshore cripto sem vincular ao CPF brasileiro.
                  Da obtenção do documento à ativação da primeira conta — tudo remoto.
                </motion.p>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="flex flex-wrap gap-8 mt-10">
              {[{ label: 'Etapas', value: '4' }, { label: 'Contas Compatíveis', value: '8' }, { label: 'Prazo Total', value: '2-3 sem' }].map(s => (
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
              <span className="text-stone-600 text-[10px] tracking-[0.25em] uppercase">Role para começar</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ═══ SOVEREIGN DISCLAIMER ═══ */}
        <div className="px-6 md:px-12 lg:px-20">
          <SovereignDisclaimer variant="offshore" />
        </div>

        {/* ═══════════════════════════════════════
           CAPÍTULO 01 — POR QUÊ (odd)
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="01" title="Por Que Abrir Remotamente?" image={heroImg} id="por-que" isOdd={true} />

        <ScrollSection className="max-w-4xl mx-auto px-6 py-16 md:py-24" isOdd={true}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-8">
            <motion.div variants={staggerChild}>
              <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                Ter contas offshore é <strong className="text-white">legal</strong>. O problema não é a conta — é o <strong className="text-rose-400">documento</strong> que você usa para abri-la.
              </p>
            </motion.div>

            <motion.div variants={staggerChild} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle size={16} className="text-rose-400" />
                    <span className="text-rose-400 text-xs font-bold tracking-[0.2em] uppercase">Com CPF Brasileiro</span>
                  </div>
                  {['Reportado automaticamente via CRS', 'Receita Federal notificada em 12 meses', 'Risco de bloqueio judicial', 'Dados cruzados com Declaração de IR'].map(item => (
                    <p key={item} className="text-stone-400 text-sm flex items-start gap-2"><span className="text-rose-500 mt-0.5 shrink-0">✗</span>{item}</p>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={16} className="text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase">Com Cédula Paraguaia</span>
                  </div>
                  {['Sem reporte ao governo brasileiro', 'Sem vínculo com CPF ou Receita', 'Privacidade documental total', 'Abertura remota em 8 de 9 contas'].map(item => (
                    <p key={item} className="text-stone-400 text-sm flex items-start gap-2"><span className="text-emerald-500 mt-0.5 shrink-0">✓</span>{item}</p>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerChild} className="rounded-xl bg-amber-500/[0.05] border border-amber-500/15 p-5">
              <p className="text-amber-400/90 text-sm leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "A diferença entre privacidade e exposição não é o que você faz — é o documento que conecta você ao sistema."
              </p>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══════════════════════════════════════
           CAPÍTULO 02 — DOCUMENTAÇÃO (even)
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="02" title="A Documentação" image={chapterDocImg} id="documentacao" isOdd={false} />

        <div style={{ background: '#070b0b' }}>
          <ScrollSection className="max-w-4xl mx-auto px-6 py-16 md:py-24" isOdd={false}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-10">
              <motion.div variants={staggerChild}>
                <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-6">
                  A cédula paraguaia é o <strong className="text-white">pilar de toda a operação</strong>. Sem ela, você está exposto ao CRS. Com ela, suas contas offshore ficam completamente desvinculadas da sua identidade fiscal brasileira.
                </p>
              </motion.div>

              <motion.div variants={staggerChild} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { title: 'O que é a Cédula Paraguaia', desc: 'Documento de identidade civil emitido pelo governo do Paraguai. Funciona como um RG local e é aceito por fintechs e bancos internacionais como prova de identidade.', icon: FileText },
                  { title: 'Quem pode obter', desc: 'Qualquer pessoa que cumpra os requisitos legais do Paraguai. Não é necessário ser residente permanente nem abrir empresa. O processo é civil, não empresarial.', icon: Users },
                  { title: 'Validade internacional', desc: 'A cédula é reconhecida por sistemas de compliance de fintechs em Hong Kong, Gibraltar, Suíça e Estados Unidos — as mesmas jurisdições das contas do ranking.', icon: Globe },
                  { title: 'Custo estimado', desc: 'Entre US$ 200 e US$ 400 dependendo do método. Processo presencial em Ciudad del Este é mais barato. Assessoria remota tem custo adicional pelo serviço.', icon: DollarSign },
                ].map(item => (
                  <motion.div key={item.title} variants={staggerChild}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-amber-500/20 transition-colors duration-500">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/15 inline-flex mb-4">
                      <item.icon size={18} className="text-amber-400" />
                    </div>
                    <h3 className="text-white text-base font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </ScrollSection>
        </div>

        {/* ═══════════════════════════════════════
           CAPÍTULO 03 — PROCESSO PASSO-A-PASSO (odd)
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="03" title="O Processo Completo" image={chapterProcessoImg} id="processo" isOdd={true} />

        <section style={{ background: '#050808' }}>
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            <div className="space-y-8">
              {STEPS.map((step, idx) => (
                <ScrollSection key={step.num} isOdd={true}>
                  <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    className="group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-amber-500/20 transition-all duration-700"
                  >
                    {/* Step number badge */}
                    <div className="absolute top-0 left-0 z-10">
                      <motion.div variants={staggerChild} className="bg-amber-500/20 backdrop-blur-md border-r border-b border-amber-500/20 rounded-br-2xl px-5 py-3">
                        <span className="text-amber-400 font-bold text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Etapa {step.num}</span>
                      </motion.div>
                    </div>

                    <div className="px-6 md:px-8 pt-16 pb-8">
                      <motion.div variants={staggerChild} className="flex items-start gap-4 mb-5">
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/15 shrink-0">
                          <step.icon size={22} className="text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.title}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock size={12} className="text-stone-500" />
                            <span className="text-stone-500 text-xs">{step.duration}</span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.p variants={staggerChild} className="text-stone-400 text-sm md:text-base leading-relaxed mb-6">
                        {step.description}
                      </motion.p>

                      <motion.div variants={staggerContainer} className="space-y-3">
                        {step.details.map((detail, i) => (
                          <motion.div key={i} variants={staggerChild} className="flex items-start gap-3">
                            <span className="text-amber-500 mt-1 shrink-0 text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
                            <span className="text-stone-300 text-sm leading-relaxed">{detail}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </ScrollSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           CAPÍTULO 04 — CONTAS COMPATÍVEIS (even)
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="04" title="Contas Compatíveis" image={chapterContasImg} id="contas" isOdd={false} />

        <ScrollSection className="max-w-6xl mx-auto px-6 py-16 md:py-20" isOdd={false}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.02] overflow-hidden backdrop-blur-sm overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5">
                  {['Conta', 'Doc', 'Abertura', 'Tempo', 'Dificuldade'].map(h => (
                    <th key={h} className="px-5 py-4 text-[9px] font-bold tracking-[0.2em] uppercase text-stone-500 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CONTAS_COMPATIVEIS.map((acc, i) => (
                  <motion.tr key={acc.name} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                    className={`${i !== CONTAS_COMPATIVEIS.length - 1 ? 'border-b border-white/[0.03]' : ''} hover:bg-white/[0.02] transition-colors`}>
                    <td className="px-5 py-4 text-stone-200 font-medium text-sm">{acc.name}</td>
                    <td className="px-5 py-4"><span className="text-emerald-400 text-xs font-semibold">{acc.doc}</span></td>
                    <td className="px-5 py-4 text-stone-400 text-xs">{acc.abertura}</td>
                    <td className="px-5 py-4 text-stone-400 text-xs">{acc.tempo}</td>
                    <td className={`px-5 py-4 text-xs font-semibold ${acc.dificuldade === 'Fácil' ? 'text-emerald-400' : acc.dificuldade === 'Média' ? 'text-amber-400' : acc.dificuldade === 'Alta' ? 'text-rose-400' : 'text-stone-500'}`}>{acc.dificuldade}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="mt-6 text-center">
            <Link to="/soberania-financeira/contas-offshore/top-10" className="inline-flex items-center gap-2 text-amber-400/70 hover:text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
              Ver ranking completo com análise detalhada <ChevronRight size={12} />
            </Link>
          </motion.div>
        </ScrollSection>

        {/* ═══════════════════════════════════════
           CAPÍTULO 05 — ERROS FATAIS (odd)
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="05" title="6 Erros Fatais" image={chapterErrosImg} id="erros" isOdd={true} />

        <section style={{ background: '#050808' }}>
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            <ScrollSection className="text-center mb-10" isOdd={true}>
              <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed">
                Erros que comprometem toda a operação. Qualquer um deles pode anular meses de planejamento e expor suas contas.
              </p>
            </ScrollSection>

            <div className="space-y-5">
              {ERROS_FATAIS.map((erro, idx) => {
                const sev = severityConfig[erro.severity];
                return (
                  <ScrollSection key={idx} isOdd={true}>
                    <motion.div
                      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                      className={`rounded-2xl border ${sev.border} ${sev.bg} p-6 md:p-8`}
                    >
                      <motion.div variants={staggerChild} className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-xl ${sev.bg} border ${sev.border} shrink-0`}>
                          <AlertTriangle size={18} className={sev.color} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white text-base font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{erro.title}</h3>
                            <span className={`text-[8px] font-bold tracking-[0.2em] uppercase ${sev.color} px-2 py-0.5 rounded ${sev.bg} border ${sev.border}`}>{sev.label}</span>
                          </div>
                          <p className="text-stone-400 text-sm leading-relaxed">{erro.description}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </ScrollSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           CAPÍTULO 06 — ASSESSORIA — BREATHING CTA (even)
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="06" title="Assessoria Privada" image={brasilParaguaiImg} id="assessoria" isOdd={false} />

        <div style={{ background: '#070b0b' }}>
          <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            >
              <div className="relative rounded-3xl overflow-hidden">
                {/* Screaming border */}
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
                  <div className="absolute inset-0">
                    <img src={brasilParaguaiImg} alt="Bandeiras do Brasil e Paraguai" className="w-full h-full object-cover" style={{ filter: 'brightness(0.45) saturate(0.85)' }} loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b0b] via-[#070b0b]/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#070b0b]/40 to-transparent" />
                  </div>

                  <div className="relative z-10 p-8 md:p-14 lg:p-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
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
                          Quer fazer tudo isso<br />
                          <span className="text-amber-400">sem complicação?</span>
                        </h2>

                        <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                          O processo assessorado inclui <strong className="text-stone-200">cédula paraguaia + abertura de contas + suporte 1-a-1</strong> do início ao fim.
                          <strong className="text-amber-400/80"> Exclusivo para membros do canal.</strong>
                        </p>

                        <div className="space-y-3 mb-10">
                          {[
                            { icon: Zap, text: 'Processo acelerado — cédula em 3-7 dias, não meses' },
                            { icon: Users, text: 'Assessoria pessoal 1-a-1 durante todas as etapas' },
                            { icon: Award, text: 'Abertura assessorada em até 8 contas offshore' },
                            { icon: BookOpen, text: 'Guia exclusivo de OPSEC — segurança operacional' },
                          ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-3">
                              <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/15">
                                <Icon size={14} className="text-amber-400" />
                              </div>
                              <span className="text-stone-300 text-sm">{text}</span>
                            </div>
                          ))}
                        </div>

                        <motion.button
                          onClick={() => setShowLeadModal(true)}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-xl text-base font-bold overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-yellow-500/20 border border-amber-500/40 rounded-xl" />
                          <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 rounded-xl"
                          />
                          <span className="relative z-10 flex items-center gap-3 text-amber-200">
                            <Star size={18} className="group-hover:rotate-12 transition-transform" />
                            REIVINDICAR MINHA JURISDIÇÃO ESTRANGEIRA
                          </span>
                        </motion.button>

                        <p className="text-stone-600 text-[10px] mt-5 tracking-[0.2em] uppercase">
                          Cédula + Abertura + OPSEC + Suporte Contínuo
                        </p>
                      </div>

                      <div className="hidden lg:block">
                        <div className="space-y-4">
                          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
                            <p className="text-stone-300 text-sm italic leading-relaxed mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                              "Em 10 dias eu tinha a cédula e 3 contas abertas. Tudo pelo celular, sem sair de casa."
                            </p>
                            <p className="text-stone-600 text-[10px] uppercase tracking-wider">— Membro desde 2024</p>
                          </div>
                          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
                            <p className="text-stone-300 text-sm italic leading-relaxed mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                              "O guia de OPSEC sozinho vale o investimento. Aprendi erros que eu estava cometendo sem saber."
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
           CAPÍTULO 07 — FAQ (odd)
           ═══════════════════════════════════════ */}
        <ChapterKickoff number="07" title="Dúvidas Estratégicas" image={chapterFaqImg} id="faq" isOdd={true} />

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
                  Este conteúdo é <strong className="text-stone-300">estritamente educacional</strong>.
                  A obtenção de documentos estrangeiros e abertura de contas internacionais são atividades legais quando realizadas dentro das normas de cada jurisdição.
                  Nenhum conteúdo aqui constitui recomendação de evasão fiscal. Consulte um profissional qualificado.
                </p>
              </div>
            </div>
          </div>
        </ScrollSection>

        <footer className="border-t border-white/[0.04] py-12 text-center" style={{ background: '#050808' }}>
          <p className="text-stone-600 text-[10px] tracking-[0.3em] uppercase">Abertura Remota · Cédula Paraguaia · Contas Offshore · Privacidade</p>
        </footer>
      </div>
      <LeadCaptureModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} interesse="assessoria-abertura-remota" />
    </>
  );
};

export default AberturaRemota;
