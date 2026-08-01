import PageFloatingToc from "@/components/PageFloatingToc";
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import {
  Shield, ChevronRight, AlertTriangle, Lock, Eye, EyeOff,
  CheckCircle, XCircle, ExternalLink, ChevronDown,
  CreditCard, Globe, Smartphone, DollarSign, TrendingUp,
  Check, X, HelpCircle, Zap, AlertOctagon, Star,
  ArrowRightLeft, Building2, Scan, MapPin, Users,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import heroImg from '@/assets/bricspay-hero.jpg';
import vigilanciaImg from '@/assets/bricspay-vigilancia.jpg';
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
              className="text-[10px] font-bold tracking-[0.5em] uppercase text-rose-400/70 mb-4 relative z-10">Capitulo {number}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white relative z-10 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</motion.h2>
            <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="h-px w-40 mx-auto mt-8 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent origin-center relative z-10" />
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
  { label: 'Bloco', value: 'BRICS+', icon: Globe },
  { label: 'Paises', value: 'Brasil, Russia, India, China, EAU+', icon: MapPin },
  { label: 'Pagamentos ativos', value: 'Apenas Russia (2026)', icon: CreditCard },
  { label: 'KYC', value: 'Obrigatorio', icon: Eye },
  { label: 'Moedas', value: 'Rublo, Ouro (stablecoin)', icon: DollarSign },
  { label: 'Metodo de deposito', value: 'PIX, Cartao', icon: Zap },
];

const FEATURES = [
  { step: '01', title: 'Deposite via PIX ou cartao', desc: 'O app aceita depositos em reais via PIX. O valor e convertido automaticamente para a moeda local do pais de destino — rublo russo, yuan chines ou outras moedas do bloco.' },
  { step: '02', title: 'Faca pagamentos locais', desc: 'Na Russia (unico pais ativo atualmente), voce pode pagar diretamente com o saldo do app em estabelecimentos que aceitam o sistema. Funciona como um PIX internacional.' },
  { step: '03', title: 'Transferencias entre membros', desc: 'Envie dinheiro para qualquer pessoa com conta BRICS Pay dentro do bloco. Taxas drasticamente menores que SWIFT — centavos ao inves de 5-10% do montante.' },
  { step: '04', title: 'Escaneie QR Codes', desc: 'O app possui leitor de QR Code integrado para pagamentos presenciais na Russia. Gere seus proprios codigos para receber pagamentos de terceiros.' },
];

const PROS = [
  'Taxas drasticamente menores que SWIFT para transferencias entre paises do bloco',
  'Conversao automatica PIX para moeda local — sem intermediarios bancarios',
  'Acesso a mercados sancionados (Russia, potencialmente China e Emirados Arabes)',
  'Possibilidade de fazer negocios e turismo na Russia sem depender de Visa/Mastercard',
  'Potencial para arbitragem de stablecoins entre Ocidente e Oriente',
  'Funciona como "conta bancaria" em rublo russo e outras moedas do bloco',
];

const CONS = [
  'Seus dados ficam atrelados a ditaduras com orgaos de espionagem massivos',
  'Base de dados pode ser compartilhada entre China, Russia, Coreia do Norte',
  'Atualmente funciona APENAS na Russia — sem utilidade pratica no Brasil',
  'KYC obrigatorio com risco de exposicao internacional de identidade',
  'Nenhuma garantia de privacidade — o oposto de soberania financeira',
  'Risco de ficar na mira de orgaos de inteligencia de multiplos paises',
  'Sem suporte a criptomoedas descentralizadas — apenas moedas fiat do bloco',
];

const FAQ_DATA = [
  { q: 'O que e o BRICS Pay?', a: 'E um aplicativo de pagamentos e transferencias desenvolvido para os paises do bloco BRICS (Brasil, Russia, India, China, Africa do Sul e novos membros como Emirados Arabes). Promete ser o "PIX internacional" do bloco, permitindo transacoes diretas entre moedas locais sem precisar de SWIFT.' },
  { q: 'O BRICS Pay ja funciona no Brasil?', a: 'Nao. Atualmente (2026), os pagamentos presenciais funcionam apenas na Russia. No Brasil voce pode baixar o app e fazer o cadastro, mas nao pode realizar pagamentos nem abastecer a conta com funcionalidade plena.' },
  { q: 'E seguro passar meus documentos no KYC do BRICS Pay?', a: 'Esse e o maior risco. Ao fazer KYC, seus dados pessoais ficam em uma base de dados compartilhada entre paises como Russia, China e potencialmente Coreia do Norte. Sao paises com orgaos de espionagem massivos e sem historico de protecao de dados de estrangeiros.' },
  { q: 'Posso usar minha cedula paraguaia no BRICS Pay?', a: 'Sim. Usar um documento internacional como a cedula paraguaia evita expor seu CPF e identidade brasileira diretamente para a base de dados do bloco. Isso adiciona uma camada de privacidade, embora nao elimine completamente os riscos.' },
  { q: 'Como posso ganhar dinheiro com o BRICS Pay?', a: 'A principal oportunidade e a arbitragem de stablecoins. Com o bloco BRICS criando suas proprias stablecoins (lastreadas em ouro e moedas fiat), surgem oportunidades de arbitragem entre o ecossistema Ocidental (dolar, euro) e Oriental (rublo, yuan). A volatilidade entre esses mercados gera lucro.' },
  { q: 'Visa e Mastercard funcionam na Russia?', a: 'Nao. Visa e Mastercard foram banidas na Russia devido as sancoes internacionais. Turistas que visitam a Russia precisam de dinheiro fisico em dolar (com spread alto) ou do BRICS Pay para realizar pagamentos.' },
  { q: 'O BRICS Pay vai substituir o SWIFT?', a: 'Para transacoes dentro do bloco, sim — e essa a intencao. O SWIFT cobra taxas de 5-10% e leva dias para processar. O BRICS Pay promete centavos de taxa e processamento instantaneo. Porem, fora do bloco, o SWIFT continua sendo o padrao.' },
  { q: 'Devo criar uma conta no BRICS Pay?', a: 'Se voce nao tem negocios diretos com a Russia ou China, nao ha necessidade pratica. O risco de exposicao de dados para regimes autoritarios supera os beneficios atuais. Se precisar, use um documento internacional (cedula paraguaia) para minimizar o risco.' },
];

/* ═══ COMPONENT ═══ */

const TOC_ITEMS = [
  { id: "funcionalidades", label: "Ficha Técnica" },
  { id: "pros-contras", label: "Prós e Contras" },
  { id: "riscos", label: "Riscos" },
  { id: "oportunidades", label: "Oportunidades" },
  { id: "assessoria", label: "Assessoria" },
  { id: "faq", label: "FAQ" },
];

export default function BricsPay() {
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
        <title>BRICS Pay — Baixei e Testei o App da Nova Ordem Mundial | Lord Junnior</title>
        <meta name="description" content="Review completo do BRICS Pay: como funciona, riscos de vigilancia financeira, oportunidades de arbitragem e por que voce deveria pensar duas vezes antes de criar uma conta." />
        <meta property="og:title" content="BRICS Pay — O App da Nova Ordem Mundial" />
        <meta property="og:description" content="Baixei, testei e analiso o aplicativo de pagamentos do bloco BRICS. Funcionalidades, riscos e como se proteger." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/brics-pay" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="amber" />
      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
      <LeadCaptureModal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} interesse="assessoria-cedula-paraguaia-bricspay" />

      <div className="min-h-screen" style={{ background: '#050808' }}>

        {/* ═══ NAVIGATION BAR ═══ */}
        <AnimatePresence>
          {scrolled && (
            <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
              className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(5,8,8,0.85)', backdropFilter: 'blur(20px) saturate(1.5)' }}>
              <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                <Link to="/soberania-financeira" className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-xs font-bold tracking-wider uppercase">
                  <ChevronRight size={12} className="rotate-180" /> Soberania Financeira
                </Link>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-rose-500/60 font-mono">BRICS Pay</span>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* ═══ HERO ═══ */}
        <div ref={heroRef} className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroImgY, scale: heroImgScale }}>
            <img src={heroImg} alt="BRICS Pay app na tela do smartphone" className="w-full h-full object-cover" style={{ filter: 'brightness(0.4) saturate(0.8)' }} loading="eager" fetchPriority="high" decoding="async" />
          </motion.div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, transparent 30%, rgba(5,8,8,0.6) 60%, #050808 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 45%, transparent 30%, rgba(5,8,8,0.9) 100%)' }} />

          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-center">
            <div className="max-w-5xl mx-auto px-6 w-full">
              <motion.div initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }} animate={heroInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 1.2, ease: EASE }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-gradient-to-r from-rose-500 to-transparent" />
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase text-rose-500/80 font-mono">Analise de Campo</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="text-white">Baixei e testei</span><br />
                  <span className="text-white">o app da </span>
                  <span className="text-rose-400">Nova Ordem</span>
                </h1>

                <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                  O <strong className="text-stone-200">BRICS Pay</strong> promete ser o PIX internacional do bloco BRICS — pagamentos e transferencias
                  entre Brasil, Russia, India, China e Emirados Arabes. Baixei, testei e vou mostrar por que voce deveria pensar
                  <strong className="text-rose-300"> duas vezes</strong> antes de criar uma conta.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href="#funcionalidades"
                    className="group relative inline-flex items-center gap-2 bg-rose-500/15 border border-rose-500/40 text-rose-200 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(244,63,94,0.3)]">
                    <span className="absolute inset-0 bg-rose-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative">Ver analise completa</span><ChevronDown size={14} className="relative" />
                  </a>
                  <a href="#riscos"
                    className="inline-flex items-center gap-2 border border-white/[0.08] text-stone-400 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:border-rose-500/30 hover:text-rose-300 transition-colors">
                    <AlertTriangle size={14} /> Ver riscos
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

        {/* ═══ CH01 — FICHA TECNICA ═══ */}
        <ChapterKickoff number="01" title="Ficha Tecnica" image={heroImg} id="funcionalidades" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-rose-500/20 bg-rose-500/5 flex items-center justify-center"><Smartphone className="w-5 h-5 text-rose-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-rose-500/60">Especificacoes</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O que e o BRICS Pay</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-rose-500/30 via-white/[0.06] to-transparent mb-8" />
              <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl">
                O BRICS Pay e um aplicativo de pagamentos e transferencias criado para os paises do bloco BRICS.
                Funciona como uma especie de <strong className="text-stone-200">PIX internacional</strong> — voce deposita em reais via PIX,
                o valor e convertido automaticamente para a moeda local do pais de destino, e voce pode pagar ou transferir
                com taxas drasticamente menores que o sistema SWIFT tradicional.
              </p>
            </motion.div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {SPECS.map((spec, i) => (
                <motion.div key={spec.label} variants={staggerChild}
                  className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-5">
                  <spec.icon className="w-5 h-5 text-rose-500/60 mb-2" />
                  <p className="text-stone-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">{spec.label}</p>
                  <p className="text-white text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{spec.value}</p>
                </motion.div>
              ))}
            </div>

            {/* How it works */}
            <div className="space-y-5">
              {FEATURES.map((item) => (
                <motion.div key={item.step} variants={staggerChild}
                  className="relative border border-white/[0.06] bg-white/[0.02] rounded-2xl p-8 pl-24 md:pl-28 hover:border-rose-500/15 transition-colors duration-300">
                  <div className="absolute left-6 md:left-8 top-8 w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                    <span className="text-rose-400 font-black text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH02 — PROS E CONTRAS ═══ */}
        <ChapterKickoff number="02" title="Pros e Contras" image={heroImg} id="pros-contras" isOdd={false} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros */}
              <motion.div variants={staggerChild} className="border border-emerald-500/20 bg-emerald-500/[0.03] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-xl font-bold text-emerald-400 uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Vantagens</h3>
                </div>
                <ul className="space-y-4">
                  {PROS.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone-400">
                      <Check className="w-4 h-4 text-emerald-500/60 shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Cons */}
              <motion.div variants={staggerChild} className="border border-rose-500/20 bg-rose-500/[0.03] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <h3 className="text-xl font-bold text-rose-400 uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Riscos Criticos</h3>
                </div>
                <ul className="space-y-4">
                  {CONS.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone-400">
                      <X className="w-4 h-4 text-rose-500/60 shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH03 — RISCOS DE VIGILANCIA ═══ */}
        <ChapterKickoff number="03" title="Riscos de Vigilancia" image={vigilanciaImg} id="riscos" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-rose-500/20 bg-rose-500/5 flex items-center justify-center"><Eye className="w-5 h-5 text-rose-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-rose-500/60">Alerta de Seguranca</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Seus dados nas maos de ditaduras</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-rose-500/30 via-white/[0.06] to-transparent mb-8" />
            </motion.div>

            {/* Risk blocks */}
            <div className="space-y-6">
              <motion.div variants={staggerChild} className="border border-rose-500/25 bg-rose-500/[0.04] rounded-2xl p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <AlertOctagon className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-rose-300 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Base de dados compartilhada com regimes autoritarios</h3>
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">
                      Quando voce faz KYC no BRICS Pay, seus dados pessoais — nome, documento, foto, historico de transacoes — ficam em uma base de dados
                      acessivel por <strong className="text-rose-300">Russia, China, e potencialmente Coreia do Norte</strong>.
                      Sao paises com orgaos de espionagem extremamente massivos e sem nenhum compromisso com a protecao de dados de estrangeiros.
                    </p>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Se voce e empresario, pode ficar na mira desses orgaos. Se a base de dados for comprometida,
                      suas informacoes podem ser utilizadas por agentes mal-intencionados em escala global.
                      Nao ha legislacao de protecao de dados equivalente a LGPD ou GDPR nesses paises para estrangeiros.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerChild} className="border border-orange-500/25 bg-orange-500/[0.04] rounded-2xl p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <Lock className="w-6 h-6 text-orange-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-orange-300 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Funcionalidade limitada — risco sem recompensa</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Atualmente (2026), o BRICS Pay funciona apenas na Russia para pagamentos presenciais.
                      No Brasil, voce pode baixar o app e cadastrar, mas <strong className="text-orange-300">nao pode realizar pagamentos,
                      abastecer a conta nem usar nenhuma funcionalidade relevante</strong>.
                      Voce estaria entregando seus dados pessoais a regimes autoritarios em troca de absolutamente nada.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerChild} className="border border-amber-500/25 bg-amber-500/[0.04] rounded-2xl p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <EyeOff className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-amber-300 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Como minimizar o risco — se precisar usar</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Se voce realmente precisa fazer negocios com paises do bloco BRICS, use um <strong className="text-amber-300">documento internacional
                      como a cedula paraguaia</strong> no KYC. Isso evita expor seu CPF e identidade brasileira diretamente.
                      A cedula paraguaia garante mais privacidade sobre qualquer transacao internacional e protege sua identidade pessoal.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH04 — OPORTUNIDADES DE ARBITRAGEM ═══ */}
        <ChapterKickoff number="04" title="Oportunidades" image={heroImg} id="oportunidades" isOdd={false} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-emerald-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500/60">Visao Estrategica</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Como se beneficiar</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-emerald-500/30 via-white/[0.06] to-transparent mb-8" />
            </motion.div>

            <div className="space-y-6">
              <motion.div variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-8 md:p-10">
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Negocios internacionais simplificados</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-4">
                  Antes, para fazer negocios com Russia ou China, voce precisava se locomover fisicamente, enfrentar burocracia extrema,
                  abrir empresas locais e correr o risco de ter recursos travados sem recurso legal.
                  O BRICS Pay elimina essa barreira logistica — <strong className="text-stone-200">transferencias instantaneas com taxas de centavos</strong> ao inves
                  de 5-10% via SWIFT.
                </p>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Para comerciantes e empresarios que ja operam com fornecedores ou clientes nesses paises, a reducao de custos e significativa.
                  Para quem nao tem negocios diretos, o beneficio e marginal.
                </p>
              </motion.div>

              <motion.div variants={staggerChild} className="border border-emerald-500/15 bg-emerald-500/[0.03] rounded-2xl p-8 md:p-10">
                <h3 className="text-xl font-bold text-emerald-300 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Arbitragem de stablecoins — Ocidente vs Oriente</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-4">
                  Nesse mundo dividido entre Ocidente e Oriente, vao surgir cada vez mais stablecoins — privadas e de bancos centrais.
                  Bancos nos EUA ja estao criando suas proprias stablecoins (como a da PayPal). O bloco BRICS discute stablecoins lastreadas em ouro
                  e em moedas fiat do bloco.
                </p>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Essas novas stablecoins vao competir entre si, gerar ruido e volatilidade.
                  E <strong className="text-emerald-300">exatamente isso que gera lucro na arbitragem</strong>.
                  A comunidade de Cacadores de Stablecoins ensina como identificar oportunidades, quais criterios usar e como executar com lucro.
                </p>
              </motion.div>

              <motion.div variants={staggerChild} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-8 md:p-10">
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Turismo na Russia — caso pratico</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Visa e Mastercard estao banidas na Russia. Criptomoedas foram restringidas por receio de financiamento ucraniano.
                  Vender USDT por rublo russo custava 20-50% de spread. Antes do BRICS Pay, a unica opcao era carregar dolares fisicos —
                  e quando acabava, voce precisava sair do pais e voltar para ter fluxo de caixa.
                  Agora, com o BRICS Pay, voce deposita via PIX e paga diretamente na moeda local.
                  <strong className="text-stone-200"> E a unica funcionalidade realmente ativa do app hoje.</strong>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH05 — CEDULA PARAGUAIA / ASSESSORIA CTA ═══ */}
        <ChapterKickoff number="05" title="Protecao de Identidade" image={brasilParaguaiImg} id="assessoria" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild} className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-center"><Shield className="w-5 h-5 text-amber-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/60">Camada Extra de Privacidade</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Cedula paraguaia como escudo</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-500/30 via-white/[0.06] to-transparent mb-8" />
              <p className="text-stone-400 text-base leading-relaxed max-w-3xl">
                Se voce precisa interagir com plataformas do bloco BRICS ou abrir contas internacionais,
                a cedula paraguaia evita que seu CPF e identidade brasileira fiquem expostos diretamente.
                O Paraguai nao participa de acordos automaticos de reporte (CRS), adicionando uma camada real de protecao.
              </p>
            </motion.div>

            {/* Breathing CTA */}
            <motion.div variants={staggerChild}>
              <div className="relative border border-amber-500/25 rounded-3xl overflow-hidden">
                <div className="absolute inset-0">
                  <img src={brasilParaguaiImg} alt="Bandeiras do Brasil e Paraguai" className="w-full h-full object-cover" style={{ filter: 'brightness(0.45) saturate(0.85)' }} loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050808]/40 to-transparent" />
                </div>

                <div className="relative z-10 p-8 md:p-14">
                  <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-6 right-6 w-3 h-3">
                    <span className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-40" />
                    <span className="relative block w-3 h-3 rounded-full bg-amber-500" />
                  </motion.div>

                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/80">Assessoria Privada</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-4 leading-[0.95] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Quer tirar sua<br /><span className="text-amber-400">cedula paraguaia?</span>
                  </h2>

                  <p className="text-stone-300 text-base leading-relaxed max-w-xl mb-8">
                    O processo assessorado inclui <strong className="text-white">cedula paraguaia + abertura de contas + suporte 1-a-1</strong> do inicio ao fim.
                    Processo acelerado, tudo 100% assessorado.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <motion.button onClick={() => setLeadModalOpen(true)}
                      whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}
                      className="group relative inline-flex items-center gap-3 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-yellow-500/20 border border-amber-500/40 rounded-xl" />
                      <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 rounded-xl" />
                      <span className="relative z-10 flex items-center gap-3 text-amber-200">
                        <Star size={16} className="group-hover:rotate-12 transition-transform" /> Solicitar Assessoria
                      </span>
                    </motion.button>

                    <Link to="/soberania-financeira/contas-offshore/abertura-remota"
                      className="inline-flex items-center gap-2 border border-white/[0.08] text-stone-400 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors">
                      Ver processo completo <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Soberania block */}
            <motion.div variants={staggerChild} className="mt-10 border border-white/[0.06] bg-white/[0.02] rounded-2xl p-10 md:p-14 text-center">
              <Shield className="w-8 h-8 text-amber-500 mx-auto mb-4" />
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase mb-4 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                BRICS Pay nao e <span className="text-destructive">soberania</span>
              </h2>
              <p className="text-stone-400 text-base max-w-2xl mx-auto leading-relaxed mb-8">
                O BRICS Pay e uma ferramenta de conveniencia para negocios internacionais, nao de privacidade.
                Seus dados ficam nas maos de regimes autoritarios. Para protecao real contra confisco, vigilancia e bloqueio,
                a resposta continua sendo Bitcoin com custodia propria.
              </p>
              <Link to="/bitcoin" className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] text-white font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-white/[0.08] transition-all">
                Explorar protocolo Bitcoin <ChevronRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH06 — FAQ ═══ */}
        <ChapterKickoff number="06" title="Perguntas Frequentes" image={heroImg} id="faq" isOdd={false} />
        <ScrollSection className="max-w-3xl mx-auto px-6 py-16 md:py-20 pb-32" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl border border-rose-500/20 bg-rose-500/5 flex items-center justify-center"><HelpCircle className="w-5 h-5 text-rose-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-rose-500/60">FAQ</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Duvidas sobre o BRICS Pay</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-rose-500/30 via-white/[0.06] to-transparent mb-8" />
            </motion.div>
            <motion.div variants={staggerChild}>
              <Accordion type="single" collapsible className="space-y-3">
                {FAQ_DATA.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-white/[0.06] rounded-xl bg-white/[0.02] px-6 data-[state=open]:border-rose-500/20 transition-colors duration-300">
                    <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:no-underline py-5 text-stone-200">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-stone-400 text-sm md:text-base leading-relaxed pb-6">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-16 border border-white/[0.04] rounded-2xl p-8 text-center">
            <AlertTriangle className="w-5 h-5 text-stone-600 mx-auto mb-3" />
            <p className="text-stone-600 text-xs leading-relaxed max-w-xl mx-auto">
              Este conteudo e educativo. Sempre faca sua propria pesquisa antes de utilizar qualquer servico.
              Nenhuma informacao aqui constitui aconselhamento financeiro, legal ou fiscal.
            </p>
          </motion.div>
        </ScrollSection>

        <footer className="max-w-5xl mx-auto px-6 pb-16">
          <div className="pt-12 border-t border-white/[0.04] text-center">
            <p className="text-stone-600 text-[9px] font-black tracking-[0.5em] uppercase font-mono">Analise independente · Lord Junnior &copy; 2026</p>
          </div>
        </footer>
      </div>
    </>
  );
}
