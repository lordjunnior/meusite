import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Calculator, Plane,
  BookA, ShieldCheck, Clock, Terminal, Hourglass, Search, Timer,
  ChevronDown, Radar, Crosshair
} from 'lucide-react';
import verificabrCover from '@/assets/verificabr-cover.png';

import BitcoinVsImovel from './BitcoinVsImovel';
import TaxaDeFuga from './TaxaDeFuga';
import Novilingua from './Novilingua';
import SupplyShock from './SupplyShock';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

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

/* VerdadeSalarial placeholder removed — tool card will show "Em Breve" */

const TOOLS_LIST = [
  {
    id: 'novilingua',
    title: 'Tradutor de Novilíngua',
    badge: 'Decifre a Mídia',
    desc: 'Um dicionário satírico que traduz termos jornalísticos e estatais — "Justiça Social", "Regulação" — para a realidade nua e crua.',
    cta: 'Traduzir Mentiras',
    accent: '#ef4444',
    icon: BookA,
    component: Novilingua,
    num: '01',
    clientSide: true,
  },
  {
    id: 'fuga',
    title: 'Calculadora Taxa de Fuga',
    badge: 'O Preço da Liberdade',
    desc: 'Calcule quanto custa sair do alcance estatal. Passaporte, vistos e custos de realocação para refúgios soberanos ao redor do mundo.',
    cta: 'Calcular Saída',
    accent: '#0ea5e9',
    icon: Plane,
    component: TaxaDeFuga,
    num: '02',
    clientSide: true,
  },
  {
    id: 'btc-imovel',
    title: 'Bitcoin vs. Imóveis',
    badge: 'Cálculo de Valorização',
    desc: 'Simulador de valorização histórica. Compare dinheiro escasso versus setor imobiliário inflado com dados reais e atualizados.',
    cta: 'Abrir Calculadora',
    accent: '#d4af37',
    icon: Calculator,
    component: BitcoinVsImovel,
    num: '03',
    clientSide: true,
  },
  {
    id: 'entropy',
    title: 'Gerador de Entropia BIP-39',
    badge: 'Reescrito e Auditável',
    desc: 'Mnemônico BIP-39 real: aleatoriedade do sistema operacional via crypto.getRandomValues, wordlist oficial de 2048 palavras, checksum válido e entropia extra do seu ponteiro. Nada sai do dispositivo.',
    cta: 'Abrir Gerador',
    accent: '#10b981',
    icon: ShieldCheck,
    component: GeradorEntropy,
    num: '04',
    clientSide: true,
  },
  {
    id: 'supply-shock',
    title: 'O Último Bloco',
    badge: 'A Porta Está Fechando',
    desc: 'Visualize o choque de oferta do Bitcoin em tempo real. Moedas perdidas, ETFs absorvendo e menos de 9% disponível. A matemática não mente.',
    cta: 'Ver os Números',
    accent: '#f97316',
    icon: Hourglass,
    component: SupplyShock,
    num: '05',
  },
  {
    id: 'verificabr',
    title: 'VerificaBR',
    badge: 'Em Teste',
    desc: 'Cruza dados públicos para mapear risco financeiro de políticos. A partir do CPF de agentes públicos, organiza transferências federais, contratos e vínculos empresariais.',
    cta: 'Em Breve',
    accent: '#3b82f6',
    icon: Search,
    component: null,
    cover: verificabrCover,
    num: '06',
  },
  {
    id: 'verdade-salarial',
    title: 'Amigo CLT — Salário Líquido',
    badge: 'O Custo do Estado',
    desc: 'Descubra o custo real do trabalho formal. Quanto o Estado extrai do seu esforço antes que o dinheiro chegue na sua mão.',
    cta: 'Em Breve',
    accent: '#a855f7',
    icon: Clock,
    component: null,
    num: '07',
  },
  {
    id: 'horajusta',
    title: 'HoraJusta',
    badge: 'Controle de Ponto',
    desc: 'Controle de ponto inteligente que registra jornada, calcula horas extras automaticamente e gera relatórios com verificação antifraude.',
    cta: 'Abrir App',
    accent: '#06b6d4',
    icon: Timer,
    component: null,
    iframeUrl: 'https://horacertaclt.vercel.app',
    num: '08',
  },
  {
    id: 'savesat',
    title: 'SaveSat — Guardião dos Satoshis',
    badge: 'Compare Taxas',
    desc: 'Monitora as maiores exchanges para encontrar o menor spread e a menor taxa de saque. Ranking baseado em Auditoria de Reservas (PoR) e transparência.',
    cta: 'Ver Taxas Agora',
    accent: '#10b981',
    icon: Calculator,
    component: null,
    iframeUrl: 'https://savesat.vercel.app',
    num: '09',
  },
  {
    id: 'lucro-bitcoin',
    title: 'Lucro do Bitcoin — Mapa da Alforria',
    badge: 'Simulador de ROI',
    desc: 'Simule o crescimento do seu patrimônio em BTC, calcule seu Preço Médio (DCA) e projete sua data de independência financeira.',
    cta: 'Calcular Minha Liberdade',
    accent: '#f97316',
    icon: Clock,
    component: null,
    iframeUrl: 'https://lucrodobitcoin.vercel.app',
    num: '10',
  },
  {
    id: 'dev',
    title: 'Próximas Ferramentas',
    badge: 'Roadmap',
    desc: 'Gestão de UTXO, verificador de privacidade on-chain e scanner de contratos inteligentes. Cada atualização é uma camada a mais de soberania.',
    cta: 'Roadmap Ativo',
    accent: '#64748b',
    icon: Terminal,
    component: null,
    num: '∞',
  },
];

/* ═══════════════════════════════════════════════════════════════
   TOOL CARD COMPONENT
═══════════════════════════════════════════════════════════════ */
const ToolCard: React.FC<{
  tool: typeof TOOLS_LIST[0];
  index: number;
  onClick: () => void;
}> = ({ tool, index, onClick }) => {
  const Icon = tool.icon;
  const isInactive = tool.id === 'dev';
  const hasCover = 'cover' in tool && (tool as any).cover;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={scaleIn}
      custom={index % 3}
      onClick={isInactive ? undefined : onClick}
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-700
        ${isInactive
          ? 'border-dashed border-white/[0.06] cursor-default opacity-60'
          : 'border-white/[0.06] cursor-pointer hover:border-white/[0.15] hover:-translate-y-2 hover:shadow-2xl'
        }`}
      style={{
        background: isInactive
          ? 'rgba(255,255,255,0.01)'
          : `linear-gradient(145deg, ${tool.accent}08, transparent 50%, rgba(255,255,255,0.02))`,
      }}
    >
      {/* Cover image if exists */}
      {hasCover && (
        <div className="w-full h-44 overflow-hidden relative">
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

          <img
            src={(tool as any).cover}
            alt={tool.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ filter: 'brightness(0.7) saturate(0.9)' }} loading="lazy" decoding="async" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #050808, transparent 60%)' }} />
        </div>
      )}

      {/* Hover glow */}
      {!isInactive && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top right, ${tool.accent}12, transparent 60%)`,
          }}
        />
      )}

      {/* Shimmer line */}
      {!isInactive && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div
            className="absolute top-0 -left-full w-full h-px group-hover:left-full transition-all duration-[1.5s] ease-in-out"
            style={{ background: `linear-gradient(to right, transparent, ${tool.accent}60, transparent)` }}
          />
        </div>
      )}

      <div className="p-8 md:p-10 relative z-10 flex flex-col h-full min-h-[280px]">
        {/* Top: number + badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <span
              className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-30"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {tool.num}
            </span>
            <motion.div
              className="p-3.5 rounded-xl border"
              style={{
                background: `${tool.accent}10`,
                borderColor: `${tool.accent}25`,
                color: tool.accent,
              }}
              whileHover={!isInactive ? { scale: 1.1, rotate: 5 } : undefined}
            >
              <Icon size={22} className={isInactive ? 'animate-pulse' : ''} />
            </motion.div>
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border"
            style={{
              color: tool.accent,
              background: `${tool.accent}10`,
              borderColor: `${tool.accent}20`,
            }}
          >
            {tool.badge}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {tool.title}
        </h3>

        {/* Description */}
        <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-grow">
          {tool.desc}
        </p>

        {/* Client-side privacy badge */}
        {(tool as any).clientSide && (
          <p className="text-emerald-500/60 text-[10px] font-mono tracking-wide mb-6 flex items-center gap-1.5">
            <ShieldCheck size={11} className="shrink-0" />
            Privacidade garantida: cálculos realizados localmente. Nenhum dado enviado ao servidor.
          </p>
        )}

        {/* CTA */}
        <div
          className={`mt-auto inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-all duration-300 ${!isInactive ? 'group-hover:gap-4' : ''}`}
          style={{ color: tool.accent }}
        >
          {tool.cta}
          {!isInactive && <ArrowRight size={16} />}
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ACTIVE TOOL VIEW (inline render)
═══════════════════════════════════════════════════════════════ */
const ActiveToolView: React.FC<{
  tool: typeof TOOLS_LIST[0];
  onBack: () => void;
  iframeLoaded: boolean;
  setIframeLoaded: (v: boolean) => void;
}> = ({ tool, onBack, iframeLoaded, setIframeLoaded }) => {
  const Component = tool.component;
  const iframeUrl = 'iframeUrl' in tool ? (tool as any).iframeUrl : null;

  return (
    <div className="relative min-h-screen" style={{ background: '#050808' }}>
      {/* Back button */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #050808, rgba(5,8,8,0.9) 70%, transparent)' }}
      >
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-lg text-stone-500 hover:text-amber-400 text-xs font-bold uppercase tracking-widest transition-all border border-white/[0.06] hover:border-amber-500/30"
          style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}
        >
          <ArrowLeft size={14} /> Voltar à Torre de Controle
        </motion.button>
      </div>

      {iframeUrl ? (
        <div className="pt-20 w-full flex flex-col">
          <div className="px-6 md:px-16 py-6 border-b border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-600 block mb-2">Ferramenta gratuita</span>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{tool.title}</h2>
            <p className="text-sm text-stone-500 mt-2 max-w-2xl">{tool.desc}</p>
          </div>
          <div className="relative" style={{ height: 'calc(100vh - 200px)' }}>
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10" style={{ background: '#050808' }}>
                <div className="w-8 h-8 border-2 border-white/10 border-t-amber-500 rounded-full animate-spin" />
                <p className="text-sm text-stone-600 font-mono tracking-wider">Carregando ferramenta...</p>
                <div className="w-full max-w-md px-8 space-y-3 mt-4">
                  <div className="h-3 bg-white/[0.03] rounded-full animate-pulse" />
                  <div className="h-3 bg-white/[0.03] rounded-full animate-pulse w-4/5" />
                  <div className="h-3 bg-white/[0.03] rounded-full animate-pulse w-3/5" />
                </div>
              </div>
            )}
            <iframe
              src={iframeUrl}
              title={tool.title}
              className="w-full h-full border-0"
              allow="clipboard-read; clipboard-write"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
          <div className="px-6 md:px-16 py-5 border-t border-white/[0.06] flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div>
              <p className="text-sm font-bold text-white">Gostou da ferramenta?</p>
              <p className="text-xs text-stone-600">Compartilhe com um amigo.</p>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: tool.title, url: iframeUrl });
                } else {
                  navigator.clipboard.writeText(iframeUrl);
                }
              }}
              className="px-5 py-2.5 rounded-lg border border-white/[0.06] text-sm font-semibold text-stone-400 hover:border-amber-500/30 hover:text-amber-400 transition-all"
            >
              Compartilhar
            </button>
          </div>
        </div>
      ) : Component ? (
        <div className="pt-24 pb-12">
          <Component />
        </div>
      ) : null}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE — TORRE DE CONTROLE (APPS)
═══════════════════════════════════════════════════════════════ */
const Ferramentas: React.FC = () => {
  const { toolId } = useParams<{ toolId?: string }>();
  const navigate = useNavigate();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const { springX, springY } = useMouseParallax(12);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const activeToolId = toolId || null;
  const activeTool = TOOLS_LIST.find(t => t.id === activeToolId);

  const handleSetActive = useCallback((id: string | null) => {
    setIframeLoaded(false);
    if (id) {
      navigate(`/ferramentas/${id}`);
    } else {
      navigate('/ferramentas');
    }
  }, [navigate]);

  // Active tool inline render
  if (activeTool && activeTool.id !== 'dev' && activeTool.id !== 'verificabr') {
    const hasContent = activeTool.component || ('iframeUrl' in activeTool && (activeTool as any).iframeUrl);
    if (hasContent) {
      return (
        <ActiveToolView
          tool={activeTool}
          onBack={() => handleSetActive(null)}
          iframeLoaded={iframeLoaded}
          setIframeLoaded={setIframeLoaded}
        />
      );
    }
  }

  const toolCount = TOOLS_LIST.filter(t => t.id !== 'dev').length;

  return (
    <div
      className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      <Helmet>
        <title>Torre de Controle | Ferramentas de Soberania Financeira</title>
        <meta name="description" content="Calculadoras, simuladores e ferramentas de verificação para quem opera fora do sistema financeiro tradicional. Sem rastreamento, sem KYC, código auditável." />
        <meta name="keywords" content="ferramentas bitcoin, calculadora bitcoin, simulador bitcoin, taxa de fuga, bitcoin vs imóvel, gerador seed, supply shock bitcoin, novilíngua, soberania financeira" />
        <meta property="og:title" content="Torre de Controle | Ferramentas de Soberania" />
        <meta property="og:description" content="Calculadoras, simuladores e ferramentas de verificação para quem opera fora do sistema financeiro tradicional." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://lordjunnior.com.br/ferramentas" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Torre de Controle — Ferramentas de Soberania",
          "description": "Calculadoras, simuladores e ferramentas de verificação para soberania financeira.",
          "url": "https://lordjunnior.com.br/ferramentas",
          "author": { "@type": "Person", "name": "Lord Junnior" }
        })}</script>
      </Helmet>
      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #d4af37, #f59e0b)' }}
      />

      {/* ── AMBIENT BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Reactive orbs */}
        <motion.div
          className="absolute top-[-10%] right-[-15%] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 60%)',
            x: springX,
            y: springY,
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 60%)',
            x: useTransform(springX, v => -v * 0.5),
            y: useTransform(springY, v => -v * 0.5),
          }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />

        {/* Light beams */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,hsl(0_0%_100%/0.012)_50%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(240deg,transparent_35%,hsl(40_92%_56%/0.008)_48%,transparent_55%)]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── RADAR PARTICLES ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <style>{`
          @keyframes towerDrift {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.15; }
            100% { transform: translateY(-1000px) translateX(80px) rotate(2deg); opacity: 0; }
          }
        `}</style>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1.5 + Math.random() * 2.5}px`,
              height: `${1.5 + Math.random() * 2.5}px`,
              background: i % 3 === 0 ? 'rgba(212,175,55,0.4)' : 'rgba(249,115,22,0.3)',
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}px`,
              animation: `towerDrift ${40 + Math.random() * 45}s linear ${Math.random() * 20}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 1 — CINEMATIC HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, 120]) }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform scale-110"
            style={{
              backgroundImage: `url('/heroes/torre-controle-apps.webp')`,
              filter: 'brightness(0.35) saturate(0.75)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(5,8,8,0.15) 0%, rgba(5,8,8,0.5) 35%, rgba(5,8,8,0.92) 70%, rgba(5,8,8,1) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 40%, rgba(5,8,8,0.85) 100%)',
            }}
          />
        </motion.div>

        {/* Breadcrumb */}
        <nav className="absolute top-6 left-6 md:left-16 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] z-20">
          <Link to="/" className="text-stone-600 hover:text-amber-400 transition-colors flex items-center gap-2">
            <ArrowLeft size={12} /> Início
          </Link>
          <span className="text-stone-700">/</span>
          <span className="text-amber-400">Torre de Controle</span>
        </nav>

        <div className="max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Radar className="text-amber-400" size={24} />
              </motion.div>
              <span className="text-amber-500/60 text-[10px] font-bold uppercase tracking-[0.5em]">
                Aplicativos de Soberania
              </span>
            </div>
          </motion.div>

          <h1 className="leading-[0.85] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <motion.span
              className="block text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-white"
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: APPLE_EASE, delay: 0.1 }}
            >
              TORRE DE
            </motion.span>
            <motion.span
              className="block text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter"
              style={{ color: '#d4af37' }}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: APPLE_EASE, delay: 0.3 }}
            >
              CONTROLE
            </motion.span>
          </h1>

          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-4">
              Calculadoras, simuladores e ferramentas de <span className="text-amber-400 font-bold">verificação</span> desenvolvidas
              para quem opera fora do sistema tradicional.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              <span className="font-semibold text-stone-400">{toolCount} ferramentas ativas</span> — todas gratuitas, sem rastreamento
              e com código auditável.
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-600 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold block mb-1 text-center">Explorar Apps</span>
            <ChevronDown size={16} className="mx-auto" />
          </motion.div>
        </motion.div>

        {/* Decorative side line */}
        <motion.div
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
          <span className="text-amber-500/30 text-[9px] font-bold tracking-[0.3em] uppercase [writing-mode:vertical-lr]">{toolCount} Apps</span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 2 — STATS BAR
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-12 border-y border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: toolCount.toString(), label: 'Ferramentas Ativas' },
            { value: '0', label: 'Rastreamento' },
            { value: '100%', label: 'Código Auditável' },
            { value: '∞', label: 'Atualizações' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 3 — TOOLS GRID
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mb-16"
          >
            <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">
              Painel de Operações
            </span>
            <h2
              className="text-3xl md:text-5xl font-black tracking-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Ferramentas <span style={{ color: '#d4af37' }}>Táticas</span>
            </h2>
            <p className="text-stone-500 mt-4 max-w-2xl text-base leading-relaxed">
              Cada aplicativo foi desenvolvido com um propósito: eliminar dependências,
              calcular custos de oportunidade e proteger seu patrimônio.
            </p>
          </motion.div>

          {/* Bento-style grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {TOOLS_LIST.map((tool, i) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                index={i}
                onClick={() => {
                  if (tool.id !== 'verificabr') handleSetActive(tool.id);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 4 — CTA BOTTOM
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <Crosshair size={32} className="mx-auto text-amber-500/40 mb-6" />
            <h2
              className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Novas ferramentas em <span style={{ color: '#d4af37' }}>desenvolvimento</span>
            </h2>
            <p className="text-stone-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              P2P, gestão de UTXO, verificação de privacidade e mais.
              Cada atualização é uma camada a mais na sua blindagem.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-500 border border-white/[0.06] hover:border-amber-500/30 text-stone-400 hover:text-amber-400"
              style={{ background: 'rgba(212,175,55,0.05)' }}
            >
              <ArrowLeft size={16} /> Voltar ao Centro de Comando
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bottom gradient */}
      <div className="relative z-10 h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.15), transparent)' }} />
    </div>
  );
};

export default Ferramentas;
