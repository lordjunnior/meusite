import PageFloatingToc from "@/components/PageFloatingToc";
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence, useSpring } from 'framer-motion';
import {
  Shield, ChevronRight, AlertTriangle, Lock, Eye,
  CheckCircle, XCircle, ExternalLink, ChevronDown,
  CreditCard, Globe, Search, Filter, Star,
  Check, X, HelpCircle, Zap, AlertOctagon,
  Smartphone, Mail, Wifi, ShoppingCart, ArrowRight,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import NobelVFX from '@/components/NobelVFX';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import heroImg from '@/assets/kycnot-hero.jpg';
import filtrosImg from '@/assets/kycnot-filtros.jpg';
import armadilhaImg from '@/assets/kycnot-armadilha.jpg';
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
              className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/70 mb-4 relative z-10">Capitulo {number}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white relative z-10 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</motion.h2>
            <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="h-px w-40 mx-auto mt-8 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent origin-center relative z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ SCROLL SECTION ═══ */
const ScrollSection = ({ children, className, isOdd }: { children: React.ReactNode; className?: string; isOdd: boolean }) => (
  <div style={{ background: isOdd ? '#050808' : '#070b0b' }}><div className={className}>{children}</div></div>
);

/* ═══ DATA ═══ */
const CATEGORIES = [
  { icon: CreditCard, label: 'Exchanges', desc: 'Compra e venda de criptomoedas sem verificação de identidade' },
  { icon: Wifi, label: 'VPNs', desc: 'Redes privadas virtuais que não exigem dados pessoais' },
  { icon: Mail, label: 'E-mails', desc: 'Provedores de e-mail anônimos e criptografados' },
  { icon: Smartphone, label: 'Telefones', desc: 'Numeros temporarios ou permanentes sem KYC' },
  { icon: ShoppingCart, label: 'Marketplaces', desc: 'Plataformas de compra e venda P2P sem verificacao' },
  { icon: Globe, label: 'Gift Cards', desc: 'Cartoes-presente compraveis com cripto, sem identidade' },
];

const FILTER_STEPS = [
  { step: '01', title: 'Acesse kycnot.me', desc: 'O site reune centenas de servicos organizados por tipo, score de privacidade e metodo de pagamento aceito.' },
  { step: '02', title: 'Clique em Filtros', desc: 'Na barra lateral, clique na aba de filtros. Em "Type", selecione o tipo de servico: exchange, VPN, e-mail, telefone, marketplace, gift card ou hosting.' },
  { step: '03', title: 'Ajuste o Score minimo para 7+', desc: 'O score vai de 0 a 10. Servicos com nota abaixo de 7 podem ter KYC escondido, monitoramento de transacoes ou bloqueio de fundos. Filtre por 7 ou mais para garantir privacidade minima.' },
  { step: '04', title: 'Analise cada resultado', desc: 'Clique em cada servico para ver detalhes: se possui "Shotgun KYC" (KYC surpresa), monitoramento de blockchain, bloqueio de fundos ou outras armadilhas. Leia tudo antes de depositar qualquer valor.' },
];

const TRAPS = [
  { name: 'FixFloat', score: '4/10', problem: 'Shotgun KYC — apos algumas transacoes, bloqueia fundos e exige documentos, IR, historico de transacoes. Monitoramento ativo de blockchain classifica Bitcoin como "sujo".', color: 'rose' },
  { name: 'Exchanges com score baixo', score: '<5/10', problem: 'Podem parecer sem KYC inicialmente, mas implementam verificacao apos determinado volume. Seus fundos podem ser travados sem aviso previo.', color: 'orange' },
  { name: 'Servicos sem avaliacao', score: 'N/A', problem: 'Plataformas novas ou sem historico podem ser honeypots — armadilhas criadas para coletar dados de usuarios que buscam privacidade.', color: 'yellow' },
];

const ALTERNATIVES = [
  { name: 'Spike to Spike', type: 'Exchange P2P', desc: 'Compra e venda de Bitcoin, USDT e Monero com privacidade total. Sem KYC, sem verificacao, sem monitoramento de blockchain. Plataforma com 2+ anos de operacao.', score: '9/10', link: '#' },
  { name: 'Bisq', type: 'Exchange Descentralizada', desc: 'Exchange 100% descentralizada e open-source. Sem servidores centrais, sem cadastro, sem KYC. Opera via rede Tor integrada.', score: '10/10', link: '#' },
  { name: 'RoboSats', type: 'Exchange P2P via Lightning', desc: 'Troca de Bitcoin via Lightning Network usando identidades temporarias (robots). Sem cadastro, sem KYC, transacoes rapidas e privadas.', score: '10/10', link: '#' },
];

const FAQ_DATA = [
  { q: 'O que e o KYCNot.me?', a: 'E uma plataforma que reune e organiza todos os servicos cripto e digitais que operam sem KYC (Know Your Customer). Funciona como um diretorio com scores de privacidade, avaliações de usuarios e informacoes detalhadas sobre cada servico.' },
  { q: 'O KYCNot.me e seguro de usar?', a: 'O site em si e apenas um agregador de informacoes — ele nao processa transacoes nem armazena fundos. A seguranca depende de cada servico listado. Sempre verifique o score, leia os detalhes e faca sua propria pesquisa antes de usar qualquer plataforma.' },
  { q: 'Por que a FixFloat tem nota baixa?', a: 'Porque pratica "Shotgun KYC": permite transacoes iniciais sem verificacao, mas depois bloqueia fundos e exige documentos pessoais, incluindo imposto de renda e historico de transacoes. Alem disso, monitora ativamente a blockchain para classificar origens de fundos.' },
  { q: 'Qual o score minimo recomendado?', a: 'Recomendamos filtrar por score 7 ou superior. Servicos abaixo disso frequentemente possuem KYC escondido, monitoramento de transacoes ou podem bloquear fundos sem aviso.' },
  { q: 'Posso comprar Bitcoin sem KYC no Brasil?', a: 'Sim. Plataformas P2P como Spike to Spike, Bisq e RoboSats permitem comprar Bitcoin sem verificacao de identidade. O processo e feito diretamente entre compradores e vendedores, sem intermediario centralizado.' },
  { q: 'Existe cartao cripto sem KYC?', a: 'Sim. Existem opcoes de cartoes pre-pagos que funcionam com USDT/USDC sem nome impresso e sem verificacao de identidade. Funcionam globalmente em qualquer maquininha Visa/Mastercard.' },
  { q: 'E legal usar servicos sem KYC?', a: 'Na maioria das jurisdicoes, nao ha lei que obrigue um individuo a usar apenas servicos com KYC. O KYC e uma exigencia regulatoria imposta as empresas, nao aos usuarios. Sempre consulte a legislacao local.' },
  { q: 'Como a cedula paraguaia se conecta com isso?', a: 'A cedula paraguaia permite abrir contas internacionais sem vincular ao CPF brasileiro. Como o Paraguai nao participa de acordos automaticos de reporte (CRS), contas abertas com documentacao paraguaia nao sao reportadas automaticamente a Receita Federal.' },
];

/* ═══ COMPONENT ═══ */

const TOC_ITEMS = [
  { id: "categorias", label: "O Que é KYCNot.me" },
  { id: "filtros", label: "Filtros" },
  { id: "armadilhas", label: "Armadilhas" },
  { id: "alternativas", label: "Alternativas" },
  { id: "assessoria", label: "Assessoria" },
  { id: "faq", label: "FAQ" },
];

export default function KycNotMe() {
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
        <title>KYCNot.me — Guia Completo de Servicos Cripto Sem KYC | Lord Junnior</title>
        <meta name="description" content="Guia definitivo do KYCNot.me: como encontrar exchanges, VPNs, cartoes e servicos cripto sem verificacao de identidade. Filtros, armadilhas e alternativas seguras." />
        <meta property="og:title" content="KYCNot.me — Todas as Plataformas Cripto Sem KYC" />
        <meta property="og:description" content="Diretorio completo de servicos sem KYC. Exchanges, VPNs, e-mails, telefones e cartoes cripto sem verificacao." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="orange" />
      <ScrollToTop />
      <LeadCaptureModal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} interesse="assessoria-cedula-paraguaia-kycnot" />

      <div className="min-h-screen" style={{ background: '#050808' }}>
        <NobelVFX accentColor="amber" />

        {/* ═══ NAVIGATION BAR ═══ */}
        <AnimatePresence>
          {scrolled && (
            <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
              className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(5,8,8,0.85)', backdropFilter: 'blur(20px) saturate(1.5)' }}>
              <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                <Link to="/soberania-financeira" className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-xs font-bold tracking-wider uppercase">
                  <ChevronRight size={12} className="rotate-180" /> Soberania Financeira
                </Link>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-amber-500/60 font-mono">KYCNot.me</span>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* ═══ BACK BUTTON (always visible) ═══ */}
        <div className="fixed top-4 left-4 z-50 lg:left-[276px]">
          <Link to="/soberania-financeira" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-foreground transition-colors text-xs font-bold tracking-wider uppercase">
            <ChevronRight size={14} className="rotate-180" /> Voltar
          </Link>
        </div>

        {/* ═══ HERO ═══ */}
        <div ref={heroRef} className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroImgY, scale: heroImgScale }}>
            <img src={heroImg} alt="Cartao cripto anonimo sem nome" className="w-full h-full object-cover" style={{ filter: 'brightness(0.4) saturate(0.8)' }} loading="lazy" decoding="async" />
          </motion.div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, transparent 30%, rgba(5,8,8,0.6) 60%, #050808 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 45%, transparent 30%, rgba(5,8,8,0.9) 100%)' }} />

          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-center">
            <div className="max-w-5xl mx-auto px-6 w-full">
              <motion.div initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }} animate={heroInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 1.2, ease: EASE }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-gradient-to-r from-amber-500 to-transparent" />
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase text-amber-500/80 font-mono">Guia Operacional</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="text-white">Todas as plataformas</span><br />
                  <span className="text-white">cripto </span>
                  <span className="text-amber-400">sem KYC</span>
                </h1>

                <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                  O <strong className="text-stone-200">KYCNot.me</strong> e a maior base de dados de servicos que operam sem verificacao de identidade.
                  Exchanges, VPNs, cartoes, e-mails e telefones — tudo organizado por score de privacidade.
                  Este guia ensina como navegar, filtrar e evitar armadilhas.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href="https://kycnot.me/" target="_blank" rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/40 text-amber-200 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                    <span className="absolute inset-0 bg-amber-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative">Acessar KYCNot.me</span><ExternalLink size={14} className="relative" />
                  </a>
                  <a href="#categorias"
                    className="inline-flex items-center gap-2 border border-white/[0.08] text-stone-400 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors">
                    Ver categorias <ChevronDown size={14} />
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

        {/* ═══ CH01 — O QUE E ═══ */}
        <ChapterKickoff number="01" title="O que e o KYCNot.me" image={heroImg} id="categorias" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-center"><Globe className="w-5 h-5 text-amber-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/60">Diretorio Global</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Uma base de dados de liberdade</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-500/30 via-white/[0.06] to-transparent mb-8" />
              <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl">
                O <strong className="text-stone-200">KYCNot.me</strong> reune e organiza todos os servicos que existem sem KYC, principalmente no universo cripto.
                Se voce busca exchanges sem KYC, cartoes, numeros de telefone, VPNs e outras ferramentas fora do sistema tradicional,
                essa e hoje uma das maiores bases de dados disponiveis. Cada servico e avaliado com um score de privacidade de 0 a 10,
                baseado em criterios como exigencia de documentos, monitoramento de blockchain e historico de bloqueio de fundos.
              </p>
            </motion.div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat, i) => (
                <motion.div key={cat.label} variants={staggerChild}
                  className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 hover:border-amber-500/20 transition-colors duration-300">
                  <cat.icon className="w-6 h-6 text-amber-500/70 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{cat.label}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{cat.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH02 — COMO USAR OS FILTROS ═══ */}
        <ChapterKickoff number="02" title="Como Usar os Filtros" image={filtrosImg} id="filtros" isOdd={false} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-center"><Filter className="w-5 h-5 text-amber-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/60">Tutorial Operacional</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Filtrando com precisao</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-500/30 via-white/[0.06] to-transparent mb-8" />
            </motion.div>

            <div className="space-y-6">
              {FILTER_STEPS.map((item, i) => (
                <motion.div key={item.step} variants={staggerChild}
                  className="relative border border-white/[0.06] bg-white/[0.02] rounded-2xl p-8 pl-24 md:pl-28 hover:border-amber-500/15 transition-colors duration-300">
                  <div className="absolute left-6 md:left-8 top-8 w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 font-black text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Warning box */}
            <motion.div variants={staggerChild} className="mt-10 border border-amber-500/25 bg-amber-500/[0.04] rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-amber-300 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Regra de ouro</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    <strong className="text-stone-200">Score minimo 7.</strong> Servicos com nota abaixo de 7 podem ter KYC escondido, monitoramento de transacoes
                    ou bloqueio de fundos. Nao deposite valores significativos em plataformas que voce nao pesquisou individualmente.
                    Faca sua propria pesquisa — sempre.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH03 — ARMADILHAS ═══ */}
        <ChapterKickoff number="03" title="Armadilhas e KYC Escondido" image={armadilhaImg} id="armadilhas" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-rose-500/20 bg-rose-500/5 flex items-center justify-center"><AlertOctagon className="w-5 h-5 text-rose-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-rose-500/60">Alerta Critico</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Plataformas que mentem</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-rose-500/30 via-white/[0.06] to-transparent mb-8" />
              <p className="text-stone-400 text-base leading-relaxed max-w-3xl">
                Nem tudo que se apresenta como "sem KYC" e realmente sem KYC. Algumas plataformas praticam o chamado
                <strong className="text-rose-300"> "Shotgun KYC"</strong> — permitem transacoes iniciais sem verificacao,
                mas depois bloqueiam seus fundos e exigem documentos. Voce so descobre quando ja e tarde demais.
              </p>
            </motion.div>

            <div className="space-y-5">
              {TRAPS.map((trap, i) => {
                const borderColor = trap.color === 'rose' ? 'border-rose-500/25' : trap.color === 'orange' ? 'border-orange-500/25' : 'border-yellow-500/25';
                const bgColor = trap.color === 'rose' ? 'bg-rose-500/[0.04]' : trap.color === 'orange' ? 'bg-orange-500/[0.04]' : 'bg-yellow-500/[0.04]';
                const textColor = trap.color === 'rose' ? 'text-rose-400' : trap.color === 'orange' ? 'text-orange-400' : 'text-yellow-400';
                const badgeColor = trap.color === 'rose' ? 'bg-rose-500/15 border-rose-500/30 text-rose-300' : trap.color === 'orange' ? 'bg-orange-500/15 border-orange-500/30 text-orange-300' : 'bg-yellow-500/15 border-yellow-500/30 text-yellow-300';
                return (
                  <motion.div key={trap.name} variants={staggerChild}
                    className={`border ${borderColor} ${bgColor} rounded-2xl p-8`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-lg font-bold ${textColor}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{trap.name}</h3>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeColor}`}>Score: {trap.score}</span>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed">{trap.problem}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* FixFloat deep dive */}
            <motion.div variants={staggerChild} className="mt-10 border border-rose-500/20 bg-rose-500/[0.03] rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4">
                <Eye className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-rose-300 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Caso FixFloat — Por experiencia propria</h3>
                  <p className="text-stone-400 text-sm leading-relaxed mb-4">
                    A FixFloat aparenta ser uma exchange sem KYC, mas possui score <strong className="text-rose-300">4/10</strong> no KYCNot.me por motivos concretos:
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Shotgun KYC: apos algumas transacoes, bloqueia fundos e exige documentos pessoais',
                      'Exige comprovante de imposto de renda e historico completo de transacoes',
                      'Monitoramento ativo de blockchain — escaneia origens dos seus fundos automaticamente',
                      'Classifica Bitcoin como "sujo" baseado em analise de cadeia, podendo travar permanentemente',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-stone-400">
                        <XCircle className="w-4 h-4 text-rose-500/60 shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-stone-500 text-xs mt-4 font-mono tracking-wider uppercase">
                    Experiencia pessoal: fundos travados. Nao recomendo.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH04 — ALTERNATIVAS RECOMENDADAS ═══ */}
        <ChapterKickoff number="04" title="Alternativas Verificadas" image={heroImg} id="alternativas" isOdd={false} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-emerald-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500/60">Reviews do Canal</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Plataformas ja testadas</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-emerald-500/30 via-white/[0.06] to-transparent mb-8" />
              <p className="text-stone-400 text-base leading-relaxed max-w-3xl">
                Estas sao plataformas que ja foram analisadas publicamente no canal. Cada uma passou por review completo com testes reais.
                Lembre-se: nenhuma recomendacao substitui sua propria pesquisa.
              </p>
            </motion.div>

            <div className="space-y-5">
              {ALTERNATIVES.map((alt, i) => (
                <motion.div key={alt.name} variants={staggerChild}
                  className="border border-emerald-500/15 bg-emerald-500/[0.03] rounded-2xl p-8 hover:border-emerald-500/30 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{alt.name}</h3>
                      <span className="text-emerald-500/70 text-xs font-mono tracking-wider uppercase">{alt.type}</span>
                    </div>
                    <span className="text-sm font-bold px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      <Star className="w-3 h-3 inline mr-1" />{alt.score}
                    </span>
                  </div>
                  <p className="text-stone-400 text-sm leading-relaxed">{alt.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Mito busted */}
            <motion.div variants={staggerChild} className="mt-10 border border-white/[0.06] bg-white/[0.02] rounded-2xl p-8 md:p-10">
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Quebrando o mito: "Cripto sem KYC nao da para gastar"</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-4">
                Te mentiram. Pessoas que falam isso sao — intencionalmente ou nao — <strong className="text-stone-200">armadilhas para libertarios</strong>.
                O sistema quer que voce acredite que nao tem problema passar CPF, foto do rosto, dados bancarios.
                "Confia no sistema que ta tudo certo." E depois o Leviata faz o que faz melhor: ameacar individuos de violencia para tomar seus ativos.
              </p>
              <p className="text-stone-400 text-sm leading-relaxed">
                A realidade: existem cartoes cripto 100% anonimos — <strong className="text-stone-200">sem nome impresso, sem KYC</strong> — que funcionam globalmente
                em qualquer maquininha Visa/Mastercard. Voce carrega com USDT ou USDC e gasta em qualquer pais do mundo.
              </p>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH05 — CEDULA PARAGUAIA / ASSESSORIA CTA ═══ */}
        <ChapterKickoff number="05" title="Cedula Paraguaia" image={brasilParaguaiImg} id="assessoria" isOdd={true} />
        <ScrollSection className="max-w-5xl mx-auto px-6 py-16 md:py-20" isOdd={true}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild} className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-center"><Shield className="w-5 h-5 text-amber-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/60">Nivel Maximo de Privacidade</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Complemento estrategico</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-500/30 via-white/[0.06] to-transparent mb-8" />
              <p className="text-stone-400 text-base leading-relaxed max-w-3xl">
                Usar servicos sem KYC e o primeiro nivel de privacidade. O segundo nivel e garantir que, mesmo onde KYC e exigido,
                seus documentos <strong className="text-stone-200">nao estejam vinculados ao CPF brasileiro</strong>.
                A cedula paraguaia permite abrir contas internacionais em jurisdicoes que nao reportam automaticamente a Receita Federal.
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
                Privacidade nao e <span className="text-destructive">crime</span>
              </h2>
              <p className="text-stone-400 text-base max-w-2xl mx-auto leading-relaxed mb-8">
                Privacidade financeira e um direito fundamental. Usar servicos sem KYC, ter documentos internacionais e diversificar jurisdicoes
                sao estrategias legais de protecao patrimonial. O verdadeiro risco e deixar 100% dos seus ativos sob controle de um unico governo.
              </p>
              <Link to="/bitcoin" className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] text-white font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-white/[0.08] transition-all">
                Explorar protocolo Bitcoin <ChevronRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </ScrollSection>

        {/* ═══ CH06 — FAQ ═══ */}
        <ChapterKickoff number="06" title="Perguntas Frequentes" image={filtrosImg} id="faq" isOdd={false} />
        <ScrollSection className="max-w-3xl mx-auto px-6 py-16 md:py-20 pb-32" isOdd={false}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-center"><HelpCircle className="w-5 h-5 text-amber-500" /></div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/60">FAQ</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Duvidas sobre KYCNot.me</h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-500/30 via-white/[0.06] to-transparent mb-8" />
            </motion.div>
            <motion.div variants={staggerChild}>
              <Accordion type="single" collapsible className="space-y-3">
                {FAQ_DATA.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-white/[0.06] rounded-xl bg-white/[0.02] px-6 data-[state=open]:border-amber-500/20 transition-colors duration-300">
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
