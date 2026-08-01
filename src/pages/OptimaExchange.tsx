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
  ArrowRight, MapPin, Users, Send, MessageCircle,
  Truck, Clock, ShieldCheck, Hash,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import NobelVFX from '@/components/NobelVFX';
import heroImg from '@/assets/optima-hero.jpg';
import telegramImg from '@/assets/optima-telegram.jpg';
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
              className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-400/70 mb-4 relative z-10">Capitulo {number}</motion.p>
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

const ScrollSection = ({ children, className, isOdd }: { children: React.ReactNode; className?: string; isOdd: boolean }) => (
  <div style={{ background: isOdd ? '#050808' : '#070b0b' }}><div className={className}>{children}</div></div>
);

/* ═══ DATA ═══ */
const SPECS = [
  { label: 'Plataforma', value: 'Optima Exchange', icon: Send },
  { label: 'Operacao via', value: 'Telegram (@Optima_Exchange_Argentinas)', icon: MessageCircle },
  { label: 'KYC', value: 'Nenhum', icon: EyeOff },
  { label: 'Entrega', value: 'Dinheiro fisico na porta + transferencia bancaria', icon: Truck },
  { label: 'Moedas Fiat', value: 'BRL, ARS, USD, EUR, RUB, UAH, GEL, TRY, KZT', icon: Globe },
  { label: 'Cripto aceita', value: 'USDT (principal)', icon: DollarSign },
  { label: 'Origem', value: 'Ecossistema russo/ucraniano', icon: MapPin },
  { label: 'Horario', value: 'Ate 18h (horario local)', icon: Clock },
];

const STEPS = [
  { step: '01', title: 'Acesse o Telegram da Optima Exchange', desc: 'Abra o Telegram e acesse diretamente o canal oficial: t.me/Optima_Exchange_Argentinas. Cuidado com perfis fakes — utilize exclusivamente o link oficial. Se voce quer privacidade maxima, use um numero de telefone sem KYC para criar seu Telegram.' },
  { step: '02', title: 'Contate o operador e peca cotacao', desc: 'Envie uma mensagem informando quanto deseja vender e em qual moeda deseja receber. Exemplo: "Quero converter 2000 USDT para ARS (pesos argentinos) em cash." O operador vai responder com a cotacao e instruções. A comunicacao inicial sera em russo — use o tradutor integrado do Telegram.' },
  { step: '03', title: 'Envie o USDT e a hash da transacao', desc: 'O operador vai enviar um QR code ou endereco para voce enviar o USDT. Apos enviar, compartilhe a hash da transacao no chat para confirmacao. Aguarde a validacao da transacao na blockchain.' },
  { step: '04', title: 'Receba o dinheiro fisico na sua porta', desc: 'Um entregador vai ate o endereco combinado e entrega o dinheiro Fiat em especie — reais, dolares, euros, pesos ou a moeda local. Voce tambem pode optar por transferencia bancaria (Wise, Revolut, conta local), mas isso reduz a privacidade.' },
];

const COUNTRIES = [
  { flag: '🇧🇷', name: 'Brasil', currency: 'BRL', method: 'Cash + Transferencia' },
  { flag: '🇦🇷', name: 'Argentina', currency: 'ARS', method: 'Cash + Transferencia' },
  { flag: '🇺🇸', name: 'Estados Unidos', currency: 'USD', method: 'Cash + Transferencia' },
  { flag: '🇪🇺', name: 'Europa', currency: 'EUR', method: 'Cash + Transferencia' },
  { flag: '🇷🇺', name: 'Russia', currency: 'RUB', method: 'Cash + Transferencia' },
  { flag: '🇺🇦', name: 'Ucrania', currency: 'UAH', method: 'Cash + Transferencia' },
  { flag: '🇬🇪', name: 'Georgia', currency: 'GEL', method: 'Cash + Transferencia' },
  { flag: '🇹🇷', name: 'Turquia', currency: 'TRY', method: 'Cash + Transferencia' },
  { flag: '🇰🇿', name: 'Cazaquistao', currency: 'KZT', method: 'Cash + Transferencia' },
];

const PROS = [
  'Sem KYC — nenhuma verificacao de identidade, nenhum documento exigido',
  'Entrega de dinheiro fisico diretamente na sua porta em varios paises',
  'Opera via Telegram — sem app centralizado, sem Apple Store, sem Google Play',
  'Cobertura global: Brasil, Argentina, EUA, Europa, Russia, Georgia, Turquia e mais',
  'Aceita USDT — a stablecoin mais liquida do mercado',
  'Ideal para quem viaja e precisa de moeda local sem converter em bancos',
  'Descontos em restaurantes, hoteis e servicos ao pagar com dinheiro vivo (10-20%)',
];

const CONS = [
  'Interface 100% em russo — requer uso do tradutor do Telegram',
  'Publico-alvo principal sao russos e ucranianos emigrados',
  'Nao vende BTC diretamente — opera apenas com USDT',
  'Nenhuma politica formal de privacidade ou reporte documentada',
  'Transferencia bancaria nao recomendada (pode gerar reporte)',
  'Cotacao para compra (voce comprando USDT) pode ser mais cara que Spike to Spike',
  'Disponibilidade de entregadores depende da regiao e horario',
];

const FAQ_DATA = [
  { q: 'O que e a Optima Exchange?', a: 'E uma exchange de criptomoedas que opera exclusivamente pelo Telegram, sem KYC. Seu diferencial e permitir que voce venda USDT e receba dinheiro fisico (reais, dolares, euros, pesos) entregue diretamente na sua porta por um entregador — como um "Uber de exchange". Surgiu no ecossistema russo/ucraniano e atende emigrados desses paises pelo mundo.' },
  { q: 'A Optima Exchange e segura?', a: 'E uma plataforma sem regulamentacao formal, operando via Telegram. O risco e inerente a qualquer servico P2P sem KYC. O historico entre a comunidade russa/ucraniana e positivo, mas voce deve comecar com valores pequenos para testar. Nunca envie grandes montantes na primeira operacao.' },
  { q: 'Preciso falar russo para usar?', a: 'Nao. Embora a comunicacao inicial seja em russo, o Telegram possui tradutor integrado que funciona bem. Voce pode escrever em ingles ou portugues e os operadores normalmente entendem ou usam traducao automatica. Alguns operadores ja falam ingles.' },
  { q: 'Quais criptomoedas sao aceitas?', a: 'Atualmente a Optima trabalha principalmente com USDT (Tether). Nao vendem BTC diretamente. Se voce quer vender Bitcoin, primeiro converta para USDT em uma exchange descentralizada e depois venda na Optima.' },
  { q: 'A entrega de dinheiro fisico funciona no Brasil?', a: 'Sim. A Optima opera com entregadores em diversas regioes do Brasil. Voce precisa verificar com o operador quais cidades estao disponiveis no momento. Grandes capitais tem maior cobertura.' },
  { q: 'Qual a diferenca entre Optima e Spike to Spike?', a: 'A Spike to Spike e mais recomendada para comprar Bitcoin com dinheiro vivo (privacidade na compra). A Optima e mais interessante para vender USDT e receber Fiat na porta (privacidade na venda). Sao complementares: compre na Spike, venda na Optima.' },
  { q: 'Devo usar transferencia bancaria na Optima?', a: 'Nao recomendamos. Ao usar transferencia bancaria (Wise, Revolut, conta local), voce cria um rastro digital que pode ser reportado. Se o objetivo e privacidade, sempre opte pela entrega em dinheiro fisico.' },
  { q: 'Como criar um Telegram privado para usar a Optima?', a: 'Voce pode adquirir um numero de telefone sem KYC (numero virtual) e criar uma conta Telegram com ele. Isso garante que sua identidade real nao fique vinculada ao chat da Optima. Temos um tutorial sobre como criar numeros sem KYC.' },
  { q: 'Existe limite de valor por operacao?', a: 'Nao ha limite fixo documentado. O limite pratico depende da disponibilidade do entregador e da liquidez na sua regiao. Para valores maiores, converse com o operador sobre logistica e fracionamento da entrega.' },
];

/* ═══ COMPONENT ═══ */

const TOC_ITEMS = [
  { id: "ficha", label: "Ficha Técnica" },
  { id: "passo-a-passo", label: "Como Funciona" },
  { id: "cobertura", label: "Cobertura Global" },
  { id: "analise", label: "Prós e Contras" },
  { id: "cedula", label: "Cédula Paraguaia" },
  { id: "faq", label: "FAQ" },
];

export default function OptimaExchange() {
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

  return (
    <>
      <Helmet>
        <title>Optima Exchange — Exchange Cripto Sem KYC que Entrega Dinheiro Vivo | Lord Junnior</title>
        <meta name="description" content="Review completo da Optima Exchange: como vender USDT e receber dinheiro fisico na porta sem KYC. Opera via Telegram com entrega em Brasil, Argentina, EUA e Europa." />
        <meta property="og:title" content="Optima Exchange — Cripto para Dinheiro Vivo na Sua Porta" />
        <meta property="og:description" content="Exchange sem KYC que entrega dinheiro fisico. Venda USDT e receba reais, dolares ou euros na sua porta." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/exchanges-privacidade-e-kyc/optima-exchange" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="amber" />
      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
      <LeadCaptureModal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} interesse="assessoria-cedula-paraguaia-optima" />

      <div className="min-h-screen" style={{ background: '#050808' }}>
        <NobelVFX accentColor="emerald" />

        {/* ═══ NAVIGATION BAR ═══ */}
        <AnimatePresence>
          {scrolled && (
            <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
              className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(5,8,8,0.85)', backdropFilter: 'blur(20px) saturate(1.5)' }}>
              <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                <Link to="/soberania-financeira" className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-xs font-bold tracking-wider uppercase">
                  <ChevronRight size={12} className="rotate-180" /> Soberania Financeira
                </Link>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-emerald-500/60 font-mono">Optima Exchange</span>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* ═══ HERO ═══ */}
        <div ref={heroRef} className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroImgY, scale: heroImgScale }}>
            <img src={heroImg} alt="Exchange cripto sem KYC entrega dinheiro vivo" className="w-full h-full object-cover" style={{ filter: 'brightness(0.4) saturate(0.8)' }} loading="eager" fetchPriority="high" decoding="async" />
          </motion.div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, transparent 30%, rgba(5,8,8,0.6) 60%, #050808 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 45%, transparent 30%, rgba(5,8,8,0.9) 100%)' }} />

          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-center">
            <div className="max-w-5xl mx-auto px-6 w-full">
              <motion.div initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }} animate={heroInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 1.2, ease: EASE }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-gradient-to-r from-emerald-500 to-transparent" />
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase text-emerald-500/80 font-mono">Review Operacional</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="text-white">Cripto por</span><br />
                  <span className="text-emerald-400">dinheiro vivo</span><br />
                  <span className="text-white">na sua </span>
                  <span className="text-emerald-400">porta</span>
                </h1>

                <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                  A <strong className="text-stone-200">Optima Exchange</strong> opera pelo Telegram sem nenhum KYC.
                  Voce vende USDT e um entregador vai ate voce com dinheiro fisico — reais, dolares, euros ou a moeda local.
                  Funciona no Brasil, Argentina, EUA, Europa, Russia, Georgia e Turquia.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href="https://t.me/Optima_Exchange_Argentinas" target="_blank" rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                    <span className="absolute inset-0 bg-emerald-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative">Acessar no Telegram</span><ExternalLink size={14} className="relative" />
                  </a>
                  <a href="#passo-a-passo"
                    className="inline-flex items-center gap-2 border border-white/[0.08] text-stone-400 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors">
                    Ver passo a passo <ChevronDown size={14} />
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
        <ChapterKickoff number="01" title="O que e a Optima Exchange" image={heroImg} id="ficha" isOdd />
        <ScrollSection isOdd className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              A <strong className="text-stone-200">Optima Exchange</strong> e uma exchange de criptomoedas que quase ninguem conhece fora do ecossistema russo e ucraniano.
              Funciona como um <strong className="text-emerald-300">"Uber de exchange"</strong> — voce vende seu USDT pelo Telegram e um entregador vai pessoalmente ate voce
              para entregar o dinheiro Fiat em especie.
            </motion.p>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              Essa plataforma surgiu da necessidade real de russos e ucranianos que emigraram para outros paises e nao conseguem abrir contas bancarias locais por conta de sancoes.
              Sem acesso a Visa, Mastercard ou bancos tradicionais, eles criaram suas proprias <strong className="text-stone-200">"maracutaias"</strong> de privacidade financeira — e a Optima e uma delas.
            </motion.p>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              Quando voce comeca a ter contato com pessoas dessas nacionalidades, eles te apresentam aplicativos e servicos que so existem dentro desse ecossistema.
              Pessoas de outros paises normalmente nem sabem que existem. A Optima e exatamente isso: um servico de nicho que agora esta sendo apresentado para o publico brasileiro.
            </motion.p>

            <motion.div variants={staggerChild} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SPECS.map((s, i) => (
                <div key={i} className="group border border-white/[0.06] rounded-xl p-5 hover:border-emerald-500/20 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center shrink-0" style={{ background: 'rgba(16,185,129,0.08)' }}>
                      <s.icon size={16} className="text-emerald-400/70" />
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

        {/* ═══ CH02 — PASSO A PASSO ═══ */}
        <ChapterKickoff number="02" title="Como Funciona na Pratica" image={telegramImg} id="passo-a-passo" isOdd={false} />
        <ScrollSection isOdd={false} className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              O processo e simples e direto. Toda a operacao acontece dentro do Telegram — sem apps, sem cadastros, sem documentos.
              Aqui esta o passo a passo exato de como executar uma operacao na Optima Exchange:
            </motion.p>

            <div className="space-y-6">
              {STEPS.map((s, i) => (
                <motion.div key={i} variants={staggerChild} className="relative border border-white/[0.06] rounded-xl p-7 group hover:border-emerald-500/15 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl border border-emerald-500/20 flex items-center justify-center shrink-0" style={{ background: 'rgba(16,185,129,0.08)' }}>
                      <span className="text-sm font-black text-emerald-400 font-mono">{s.step}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-200 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</h3>
                      <p className="text-sm text-stone-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Alert box */}
            <motion.div variants={staggerChild} className="mt-10 border border-amber-500/20 rounded-xl p-6 flex items-start gap-4" style={{ background: 'rgba(245,158,11,0.04)' }}>
              <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-300 mb-1">Recomendacao de seguranca</p>
                <p className="text-sm text-stone-400 leading-relaxed">
                  A Optima e recomendada <strong className="text-stone-300">somente para vender</strong> USDT e receber dinheiro fisico. Para <strong className="text-stone-300">comprar</strong> Bitcoin com privacidade,
                  utilize a <Link to="/pix-cripto" className="text-emerald-400 underline hover:text-emerald-300">Spike to Spike</Link> — que oferece melhor cotacao e mais privacidade na compra.
                  Nao recomendamos usar transferencia bancaria na Optima, pois cria rastro digital.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH03 — COBERTURA ═══ */}
        <ChapterKickoff number="03" title="Cobertura Global" image={heroImg} id="cobertura" isOdd />
        <ScrollSection isOdd className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              A Optima Exchange opera com entregadores em diversos paises. A cobertura varia por regiao — grandes capitais tem maior disponibilidade.
              Verifique com o operador a disponibilidade na sua cidade antes de iniciar a operacao.
            </motion.p>

            <motion.div variants={staggerChild} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COUNTRIES.map((c, i) => (
                <div key={i} className="border border-white/[0.06] rounded-xl p-5 hover:border-emerald-500/15 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <p className="text-sm font-bold text-stone-200">{c.name}</p>
                      <p className="text-[10px] text-stone-500 uppercase tracking-wider">{c.currency}</p>
                    </div>
                  </div>
                  <p className="text-xs text-stone-400">{c.method}</p>
                </div>
              ))}
            </motion.div>

            <motion.p variants={staggerChild} className="text-xs text-stone-500 mt-6 italic">
              * A disponibilidade de entregadores varia por cidade e horario. Tambem enviam para Wise, Revolut e contas locais (reduz privacidade).
            </motion.p>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH04 — PRÓS E CONTRAS ═══ */}
        <ChapterKickoff number="04" title="Pros e Contras" image={telegramImg} id="analise" isOdd={false} />
        <ScrollSection isOdd={false} className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prós */}
              <motion.div variants={staggerChild} className="border border-emerald-500/10 rounded-xl p-7" style={{ background: 'rgba(16,185,129,0.03)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg border border-emerald-500/20 flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)' }}>
                    <Check size={18} className="text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Vantagens</h3>
                </div>
                <ul className="space-y-3">
                  {PROS.map((p, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={14} className="text-emerald-400/60 shrink-0 mt-1" />
                      <span className="text-sm text-stone-400 leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contras */}
              <motion.div variants={staggerChild} className="border border-rose-500/10 rounded-xl p-7" style={{ background: 'rgba(239,68,68,0.03)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg border border-rose-500/20 flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}>
                    <X size={18} className="text-rose-400" />
                  </div>
                  <h3 className="text-lg font-bold text-rose-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Desvantagens</h3>
                </div>
                <ul className="space-y-3">
                  {CONS.map((c, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XCircle size={14} className="text-rose-400/60 shrink-0 mt-1" />
                      <span className="text-sm text-stone-400 leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Veredicto */}
            <motion.div variants={staggerChild} className="mt-10 border border-emerald-500/15 rounded-xl p-8" style={{ background: 'rgba(16,185,129,0.04)' }}>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <ShieldCheck size={20} className="inline mr-2 text-emerald-400" />
                Veredicto
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed mb-4">
                A Optima Exchange preenche um nicho que nenhuma outra plataforma no mercado cobre: <strong className="text-stone-200">vender cripto e receber dinheiro fisico na porta, sem KYC, em multiplos paises</strong>.
                E ideal para quem viaja e precisa de moeda local sem passar por bancos ou casas de cambio com spreads absurdos.
              </p>
              <p className="text-sm text-stone-400 leading-relaxed">
                <strong className="text-emerald-300">Estrategia recomendada:</strong> Compre Bitcoin com privacidade na <strong className="text-stone-200">Spike to Spike</strong> (dinheiro vivo).
                Quando precisar de Fiat, converta para USDT e venda na <strong className="text-stone-200">Optima</strong> para receber dinheiro fisico. Sao ferramentas complementares.
              </p>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH05 — CEDULA PARAGUAIA ═══ */}
        <ChapterKickoff number="05" title="Privacidade Maxima: Cedula Paraguaia" image={brasilParaguaiImg} id="cedula" isOdd />
        <ScrollSection isOdd className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              A Optima ja oferece privacidade por nao exigir KYC. Mas para quem quer uma camada extra de protecao — especialmente ao usar o Telegram — a
              <strong className="text-stone-200"> cedula paraguaia de residencia</strong> desconecta voce do sistema de reporte brasileiro.
            </motion.p>
            <motion.p variants={staggerChild} className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl mb-16">
              Com a cedula paraguaia, voce pode criar um numero de telefone sem KYC vinculado a documentacao paraguaia, abrir contas internacionais e operar sem vincular ao CPF.
              O Paraguai nao participa de acordos automaticos de reporte de informacoes (CRS) — uma vantagem juridica real enquanto durar.
            </motion.p>

            {/* CTA */}
            <motion.div variants={staggerChild} className="relative border border-emerald-500/20 rounded-2xl overflow-hidden" style={{ background: 'rgba(16,185,129,0.04)' }}>
              <div className="absolute inset-0 overflow-hidden">
                <img src={brasilParaguaiImg} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.15) saturate(0.5)' }} loading="lazy" decoding="async" />
              </div>
              <div className="relative p-8 md:p-12">
                <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-400/60 mb-4">Assessoria Exclusiva</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Quer tirar sua cedula paraguaia?
                </h3>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
                  O processo assessorado inclui cedula paraguaia de residencia + abertura de contas + suporte 1-a-1 do inicio ao fim.
                  Valor a partir de US$ 1.300 pelo processo acelerado. Exclusivo para membros do canal.
                </p>
                <button onClick={() => setLeadModalOpen(true)}
                  className="group relative inline-flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-bold text-sm uppercase tracking-wider px-10 py-5 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                  <span className="absolute inset-0 bg-emerald-500/10 animate-pulse" />
                  <span className="relative">Quero a assessoria</span>
                  <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Internal links */}
            <motion.div variants={staggerChild} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me" className="border border-white/[0.06] rounded-xl p-5 hover:border-amber-500/20 transition-colors group flex items-center gap-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <Shield size={20} className="text-amber-400/60 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-stone-300 group-hover:text-amber-300 transition-colors">KYCNot.me — Guia Completo</p>
                  <p className="text-xs text-stone-500">Todas as plataformas cripto sem KYC</p>
                </div>
                <ArrowRight size={14} className="text-stone-600 group-hover:text-amber-400 transition-colors ml-auto shrink-0" />
              </Link>
              <Link to="/pix-cripto" className="border border-white/[0.06] rounded-xl p-5 hover:border-emerald-500/20 transition-colors group flex items-center gap-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <Zap size={20} className="text-emerald-400/60 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-stone-300 group-hover:text-emerald-300 transition-colors">Spike to Spike — Comprar BTC</p>
                  <p className="text-xs text-stone-500">Bitcoin com dinheiro vivo</p>
                </div>
                <ArrowRight size={14} className="text-stone-600 group-hover:text-emerald-400 transition-colors ml-auto shrink-0" />
              </Link>
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
                        <HelpCircle size={16} className="text-emerald-400/60 shrink-0" />
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

        {/* ═══ FOOTER ═══ */}
        <div style={{ background: '#050808' }} className="border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-6 py-16 text-center">
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-stone-600 mb-4">Aviso Legal</p>
            <p className="text-xs text-stone-500 leading-relaxed max-w-2xl mx-auto mb-8">
              Este conteudo e exclusivamente educativo e informativo. Nao constitui recomendacao financeira nem incentivo a atividades ilegais.
              A Optima Exchange e uma plataforma sem regulamentacao formal. Utilize por sua conta e risco. Faca sempre sua propria pesquisa e comece com valores pequenos.
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/soberania-financeira" className="text-xs text-stone-600 hover:text-stone-400 transition-colors uppercase tracking-wider font-bold">← Soberania Financeira</Link>
              <Link to="/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me" className="text-xs text-stone-600 hover:text-stone-400 transition-colors uppercase tracking-wider font-bold">KYCNot.me →</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
