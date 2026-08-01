import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  ArrowLeft, Shield, AlertTriangle, ChevronRight, ArrowUpRight,
  Lock, Eye, Globe, Zap, Layers, Radio, Flame,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import NobelVFX from '@/components/NobelVFX';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import BackToHome from '@/components/BackToHome';

import heroImg from '@/assets/exchanges/hub-hero-cinematic.jpg';
import layersImg from '@/assets/exchanges/hub-layers-defense.jpg';
import p2pImg from '@/assets/exchanges/hub-p2p-handshake.jpg';
import panelImg from '@/assets/exchanges/hub-command-panel.jpg';
import mapImg from '@/assets/exchanges/hub-jurisdictions-map.jpg';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, delay: i * 0.08, ease: EASE },
  }),
};

const REVIEWS = [
  {
    name: 'Bybit e Binance reportam brasileiros',
    desc: 'Análise quente de 2026, o que mudou nas duas maiores corretoras e quais alternativas privadas ainda estão de pé.',
    type: 'Notícia tática',
    flag: 'QUENTE',
    link: '/soberania-financeira/exchanges-privacidade-e-kyc/bybit-binance-reportam-brasileiros',
  },
  {
    name: 'KYCNot.me',
    desc: 'Diretório que ranqueia plataformas por nível real de privacidade, custódia e exigência documental.',
    type: 'Diretório',
    flag: 'REFERÊNCIA',
    link: '/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me',
  },
  {
    name: 'Optima Exchange',
    desc: 'Troca de cripto por dinheiro vivo via Telegram, sem rastro digital, sem ponte com o sistema bancário.',
    type: 'P2P Telegram',
    flag: 'CASH',
    link: '/soberania-financeira/exchanges-privacidade-e-kyc/optima-exchange',
  },
  {
    name: 'PegasusSwap',
    desc: 'Swap instantâneo de mais de mil ativos sem cadastro, sem documento, sem KYC oculto.',
    type: 'Swap Instantâneo',
    flag: 'SWAP',
    link: '/soberania-financeira/exchanges-privacidade-e-kyc/pegasus-swap',
  },
];

const LAYERS = [
  {
    n: '01',
    title: 'Autocustódia primeiro',
    desc: 'Não importa onde você comprou, o que importa é onde você guarda. Hardware wallet fora da exchange é o primeiro muro.',
    icon: Lock,
    link: '/autocustodia',
  },
  {
    n: '02',
    title: 'Compra privada',
    desc: 'P2P, swap sem cadastro e dinheiro vivo. Quebrar o vínculo CPF, banco, blockchain.',
    icon: Radio,
    link: '/soberania-financeira/exchanges-privacidade-e-kyc/pegasus-swap',
  },
  {
    n: '03',
    title: 'Jurisdição alternativa',
    desc: 'Residência digital ou fiscal fora do Brasil, plano B documental antes que o muro suba.',
    icon: Globe,
    link: '/saida/jurisdicoes-amigaveis',
  },
  {
    n: '04',
    title: 'Comunicação soberana',
    desc: 'Tirar a vida financeira de cima do WhatsApp, do Google e do banco. Camada de comunicação fora do sistema.',
    icon: Shield,
    link: '/comunicacao-offline',
  },
];

const FAQ_ITEMS = [
  { q: 'O que significa KYC?', a: 'KYC significa Know Your Customer. É o processo de verificação documental exigido por exchanges centralizadas, que vincula seu CPF, rosto, endereço e histórico bancário a cada movimentação de cripto que você faz.' },
  { q: 'Plataformas sem KYC são seguras?', a: 'Cada uma tem perfil de risco próprio. P2P e não custodiais reduzem o risco de hack centralizado e de relatório automático ao fisco, mas exigem operação cuidadosa do usuário. Sempre teste com valores pequenos antes.' },
  { q: 'Brasileiro pode usar essas plataformas?', a: 'Tecnicamente sim, a maioria opera globalmente. Juridicamente cada caso tem suas regras de declaração e tributação. Este material é educativo e não substitui consulta tributária especializada.' },
  { q: 'Por que sair da Bybit e da Binance agora?', a: 'Porque ambas passaram a compartilhar dados de contas brasileiras com o fisco e o Banco Central. O que antes era ponto de entrada anônimo virou ponto de exposição automática.' },
  { q: 'Qual o melhor caminho para começar?', a: 'Hardware wallet primeiro, depois compra privada via P2P ou swap, depois retirada imediata para autocustódia. Exchange é estação de passagem, nunca cofre.' },
];

const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Exchanges sem KYC, plataformas privadas e P2P para brasileiros',
  description: 'Hub editorial de exchanges privadas, swaps sem cadastro e P2P sem ponte bancária para quem quer sair do trilho Bybit e Binance.',
  url: 'https://lordjunnior.com.br/soberania-financeira/exchanges-privacidade-e-kyc',
};
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const ExchangesSemKyc = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const layersRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: layersProgress } = useScroll({ target: layersRef, offset: ['start end', 'end start'] });
  const layersY = useTransform(layersProgress, [0, 1], [-60, 60]);

  const mapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mapProgress } = useScroll({ target: mapRef, offset: ['start end', 'end start'] });
  const mapY = useTransform(mapProgress, [0, 1], [-80, 80]);

  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Exchanges sem KYC: hub privado para brasileiros sair de Bybit e Binance</title>
        <meta name="description" content="Hub editorial de exchanges privadas, swaps sem cadastro, P2P em dinheiro vivo e estrutura jurídica de plano B. Saída tática de Bybit e Binance." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/exchanges-privacidade-e-kyc" />
        <meta property="og:title" content="Exchanges sem KYC, hub privado para brasileiros" />
        <meta property="og:description" content="Plataformas privadas, P2P, swap sem cadastro e plano B jurisdicional." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <LeadCaptureModal isOpen={leadOpen} onClose={() => setLeadOpen(false)} interesse="exchanges-sem-kyc" />
      <ScrollToTop />

      <div className="min-h-screen bg-[#050808] text-stone-200 overflow-x-hidden">
        <NobelVFX accentColor="amber" />

        <div className="relative z-30 px-4 md:px-10 pt-6">
          <BackToHome />
        </div>

        <Link
          to="/soberania-financeira"
          className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 text-stone-400 hover:text-emerald-300 text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors bg-black/70 backdrop-blur-md border border-emerald-500/20 hover:border-emerald-500/40 rounded-full px-4 py-2"
        >
          <ArrowLeft size={12} /> Soberania Financeira
        </Link>

        {/* ═══ HERO CINEMATOGRÁFICO COM PARALLAX ═══ */}
        <section ref={heroRef} className="relative h-[100vh] min-h-[680px] w-full overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}>
            <img
              src={heroImg}
              alt="Hardware wallet sob feixe de luz, simbolizando privacidade financeira"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.55) saturate(1.1)' }} loading="eager" fetchPriority="high" decoding="async" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050808]/30 via-[#050808]/40 to-[#050808]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050808]/80 via-transparent to-[#050808]/40" />

          <div className="relative z-10 h-full w-full max-w-[1800px] mx-auto px-6 md:px-14 lg:px-20 flex flex-col justify-end pb-24 md:pb-32">
            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={0}
              className="text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase text-emerald-400/80 mb-5"
            >
              HUB DE PRIVACIDADE FINANCEIRA
            </motion.p>
            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[0.95] mb-8 max-w-5xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}
            >
              Exchanges sem KYC, <br />
              <span className="text-emerald-400/90">P2P</span> e plano B jurisdicional para <br />
              quem não quer ser <span className="italic font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>reportado.</span>
            </motion.h1>
            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-stone-300/90 text-base md:text-xl max-w-3xl leading-relaxed mb-10"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Bybit e Binance agora reportam brasileiros. Este hub reúne plataformas privadas, swaps sem cadastro, P2P em dinheiro vivo e a estrutura jurídica que mantém você fora do alvo automático.
            </motion.p>
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#reviews"
                className="group inline-flex items-center gap-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400/70 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(16,185,129,0.45)]"
              >
                Ver análises ativas
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href="#camadas"
                className="inline-flex items-center gap-2 text-stone-400 hover:text-white text-xs font-semibold uppercase tracking-[0.25em] transition-colors px-5 py-3.5"
              >
                Estratégia em 4 camadas <ChevronRight size={14} />
              </a>
            </motion.div>
          </div>

          {/* indicador scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-stone-500 text-[9px] tracking-[0.4em] uppercase"
          >
            role abaixo
          </motion.div>
        </section>

        {/* ═══ ALERTA QUENTE ═══ */}
        <section className="relative max-w-[1500px] mx-auto px-6 md:px-12 -mt-20 mb-24 z-20">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp} custom={0}
            className="group relative rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-black/80 to-black/90 backdrop-blur-xl p-8 md:p-12 overflow-hidden hover:border-amber-400/50 transition-all duration-700"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.15),transparent_50%)] opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
              <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-amber-500/40 bg-amber-500/10 flex items-center justify-center">
                <Flame className="text-amber-400" size={32} />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/80 mb-2">QUEBRA QUENTE 2026</p>
                <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}>
                  Bybit e Binance agora entregam você ao fisco.
                </h2>
                <p className="text-stone-300/90 text-sm md:text-base leading-relaxed max-w-2xl">
                  Se você ainda opera nas duas como se fosse 2021, está dormindo num campo minado. A análise tática está pronta.
                </p>
              </div>
              <Link
                to="/soberania-financeira/exchanges-privacidade-e-kyc/bybit-binance-reportam-brasileiros"
                className="group/btn shrink-0 inline-flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 hover:border-amber-400/70 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.5)]"
              >
                Ler dossiê
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </section>

        <div className="px-6 md:px-12 max-w-[1500px] mx-auto">
          <SovereignDisclaimer variant="exchange" />
        </div>

        {/* ═══ REVIEWS ATIVAS, GRID LARGO ═══ */}
        <section id="reviews" className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-28">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-400/60 mb-3">ANÁLISES ATIVAS</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[0.95] max-w-4xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}>
              Reviews editoriais, <span className="text-emerald-400/90">testadas na prática.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-7">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp} custom={i}
              >
                <Link
                  to={r.link}
                  className="group relative block h-full rounded-3xl border border-emerald-500/15 bg-gradient-to-br from-emerald-950/20 via-black/60 to-black/80 p-8 md:p-10 overflow-hidden transition-all duration-700 hover:border-emerald-400/50 hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(16,185,129,0.4)]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-emerald-400/70 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                          {r.flag}
                        </span>
                        <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-stone-500">{r.type}</span>
                      </div>
                      <ArrowUpRight size={18} className="text-stone-600 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}>
                      {r.name}
                    </h3>
                    <p className="text-stone-400 text-sm md:text-base leading-relaxed">{r.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ BLOCO IMAGEM LARGA: P2P HANDSHAKE ═══ */}
        <section className="relative w-full my-12">
          <div className="relative h-[60vh] min-h-[480px] max-h-[700px] w-full overflow-hidden">
            <motion.img
              src={p2pImg}
              alt="Troca peer to peer, bitcoin físico e dinheiro vivo sobre mesa de madeira"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.5) saturate(0.9)' }}
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: EASE }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050808]/90 via-transparent to-transparent" />
            <div className="relative z-10 h-full max-w-[1500px] mx-auto px-6 md:px-14 flex flex-col justify-center">
              <motion.p
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/80 mb-4"
              >
                CORRENTE DE CONFIANÇA
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] mb-6 max-w-3xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}
              >
                P2P é onde o <span className="text-amber-300/90 italic font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>rastro</span> some.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                className="text-stone-300/85 text-base md:text-lg max-w-2xl leading-relaxed"
              >
                Sem CPF na nota, sem Pix no extrato, sem ponte com o banco. A liquidez existe há séculos, só mudou o ativo.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ═══ 4 CAMADAS DE BLINDAGEM ═══ */}
        <section id="camadas" ref={layersRef} className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-28">
          <motion.div style={{ y: layersY }} className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <img src={layersImg} alt="" loading="lazy" className="w-full h-full object-cover" style={{ filter: 'grayscale(0.5)' }} />
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="relative mb-16">
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/60 mb-3">ESTRATÉGIA EM 4 CAMADAS</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[0.95] max-w-4xl mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}>
              Blindagem real não é <span className="text-amber-300/90 italic font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>uma</span> escolha,
              <br />são <span className="text-emerald-400/90">quatro camadas</span> sobrepostas.
            </h2>
            <p className="text-stone-400 text-base md:text-lg max-w-2xl leading-relaxed">
              Trocar de exchange sem trocar de mentalidade é só mudar o nome do alvo. A defesa robusta opera em camadas.
            </p>
          </motion.div>

          <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {LAYERS.map((l, i) => {
              const Icon = l.icon;
              return (
                <motion.div
                  key={l.n}
                  initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp} custom={i}
                >
                  <Link
                    to={l.link}
                    className="group relative block h-full rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.03] to-transparent p-7 md:p-8 transition-all duration-700 hover:border-emerald-400/40 hover:bg-emerald-500/[0.04] hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(16,185,129,0.35)]"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-5xl font-bold text-stone-700 group-hover:text-emerald-500/40 transition-colors duration-700" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {l.n}
                      </span>
                      <div className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center group-hover:border-emerald-400/40 group-hover:bg-emerald-500/10 transition-all duration-500">
                        <Icon size={18} className="text-stone-400 group-hover:text-emerald-300 transition-colors duration-500" />
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}>
                      {l.title}
                    </h3>
                    <p className="text-stone-400 text-sm leading-relaxed mb-5">{l.desc}</p>
                    <div className="flex items-center gap-2 text-emerald-400/60 group-hover:text-emerald-300 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors">
                      Aprofundar <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ═══ BLOCO PAINEL DE CONTROLE ═══ */}
        <section className="relative w-full my-12">
          <div className="relative h-[55vh] min-h-[440px] max-h-[640px] w-full overflow-hidden">
            <motion.img
              src={panelImg}
              alt="Painel de controle analógico com diais verdes brilhantes"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.45) saturate(1.1)' }}
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: EASE }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#050808] via-[#050808]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050808]" />
            <div className="relative z-10 h-full max-w-[1500px] mx-auto px-6 md:px-14 flex flex-col justify-center items-end text-right">
              <motion.p
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-400/80 mb-4"
              >
                ANALOGIA OPERACIONAL
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-white leading-[0.95] mb-6 max-w-3xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}
              >
                Exchange é <span className="text-emerald-300/90 italic font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>estação</span>,<br /> nunca cofre.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                className="text-stone-300/85 text-base md:text-lg max-w-xl leading-relaxed"
              >
                Você passa, troca e sai. Deixar saldo parado em corretora hoje é deixar carteira em cima do balcão de uma agência aberta para auditoria.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ═══ JURISDIÇÃO ═══ */}
        <section ref={mapRef} className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-28">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/60 mb-3">PLANO B JURISDICIONAL</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.95] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}>
                Onde você é <span className="text-amber-300/90 italic font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>cidadão</span> importa mais do que onde você opera.
              </h2>
              <p className="text-stone-400 text-base md:text-lg leading-relaxed mb-8">
                Trocar de exchange é tática. Trocar de residência fiscal ou conseguir um segundo documento é estratégia. Plataforma cai, jurisdição protege.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/saida/jurisdicoes-amigaveis" className="group inline-flex items-center gap-2 bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border border-amber-500/40 hover:border-amber-400/70 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.5)]">
                  Jurisdições amigáveis <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
                <Link to="/palau-digital-residency" className="group inline-flex items-center gap-2 text-stone-300 hover:text-white border border-white/15 hover:border-white/30 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1">
                  Palau ID <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
            <motion.div style={{ y: mapY }} className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
              <img src={mapImg} alt="Mapa-múndi com conexões em cobre, simbolizando jurisdições alternativas" loading="lazy" className="w-full h-full object-cover" style={{ filter: 'brightness(0.85) saturate(1.1)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050808]/60 via-transparent to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ═══ CTA EMAIL ═══ */}
        <section className="relative max-w-[1500px] mx-auto px-6 md:px-12 pb-28">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="relative rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/30 via-black/70 to-black/90 p-10 md:p-16 overflow-hidden hover:border-emerald-400/50 transition-all duration-700 group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_60%)] opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative grid md:grid-cols-[1.5fr_auto] gap-8 items-center">
              <div>
                <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-400/70 mb-3">RADAR PRIVADO</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-[0.95] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}>
                  Quando uma plataforma cai ou começa a reportar, você é o primeiro a saber.
                </h2>
                <p className="text-stone-400 text-sm md:text-base max-w-2xl leading-relaxed">
                  Alerta tático por e-mail. Nada de newsletter genérica, só movimento real do tabuleiro.
                </p>
              </div>
              <button
                onClick={() => setLeadOpen(true)}
                className="group/btn shrink-0 inline-flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 hover:border-emerald-400/70 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)]"
              >
                <Eye size={16} /> Entrar no radar
              </button>
            </div>
          </motion.div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="relative max-w-[1100px] mx-auto px-6 md:px-12 pb-28">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-10">
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-stone-500 mb-3">DÚVIDAS COMUNS</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-[0.95]" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}>
              Perguntas que aparecem em <span className="text-emerald-400/90">toda</span> reunião.
            </h2>
          </motion.div>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ_ITEMS.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-none">
                <AccordionTrigger className="rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5 text-base text-stone-100 hover:bg-emerald-500/[0.04] hover:border-emerald-500/20 hover:no-underline transition-all text-left [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0 [&[data-state=open]]:bg-emerald-500/[0.04] [&[data-state=open]]:border-emerald-500/20">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="rounded-b-2xl border border-t-0 border-emerald-500/20 bg-emerald-500/[0.04] px-6 pb-5 pt-1 text-stone-300 text-sm md:text-base leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <footer className="border-t border-white/5 py-12 text-center">
          <Link to="/soberania-financeira" className="text-stone-500 text-[10px] tracking-[0.4em] uppercase hover:text-emerald-300 transition-colors">
            Voltar ao hub de soberania financeira
          </Link>
        </footer>
      </div>
    </>
  );
};

export default ExchangesSemKyc;
