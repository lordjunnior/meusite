import PageFloatingToc from "@/components/PageFloatingToc";
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Coins, Lock, Globe, Zap, ShieldCheck, Pickaxe, Layers, TrendingUp, TrendingDown, Key, AlertTriangle } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/lib/motion';

import heroImg from "@/assets/bitcoin-hero-coin.webp";
import p2pImg from "@/assets/bitcoin-p2p-exchange.webp";
import miningImg from "@/assets/bitcoin-mining-farm.webp";
import walletImg from "@/assets/bitcoin-hardware-wallet.webp";
import fiatImg from "@/assets/bitcoin-fiat-burning.webp";
import vaultImg from "@/assets/bitcoin-vault-scarcity.webp";
import globeImg from "@/assets/bitcoin-decentralized-globe.webp";
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

function AnimSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, viewportOnce);
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

const TOC_ITEMS = [
  { id: "definicao", label: "O Que É Bitcoin" },
  { id: "utilizacao", label: "Como É Usado" },
  { id: "vantagens", label: "Por Que É Superior" },
  { id: "infraestrutura", label: "Blockchain" },
  { id: "escassez", label: "21 Milhões" },
  { id: "soberania", label: "Descentralização" },
  { id: "alerta", label: "Alerta Final" },
];

export default function OQueEBitcoin() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <link rel="canonical" href={canonicalUrl('/bitcoin/o-que-e')} />
        <meta property="og:url" content={canonicalUrl('/bitcoin/o-que-e')} />
        <title>O que é Bitcoin? — Fundamento Zero | Lord Junnior</title>
        <meta name="description" content="Entenda o que é Bitcoin: protocolo descentralizado, escassez absoluta de 21 milhões, blockchain imutável e soberania financeira individual." />
        <meta name="keywords" content="o que é bitcoin, bitcoin explicado, blockchain, descentralização, 21 milhões, satoshi nakamoto" />
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="orange" />

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-600/30 overflow-x-hidden">
        {/* Ambient VFX */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-orange-500/[0.03] blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-400/[0.02] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border/30">
          <motion.div className="h-full bg-orange-500 origin-left" style={{ scaleX: scrollYProgress }} />
        </div>

        {/* Back Button */}
        <Link to="/protocolo-inicial" className="fixed top-14 left-4 lg:left-[276px] z-50 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 backdrop-blur-xl border border-border/50 text-muted-foreground hover:text-foreground text-xs font-medium transition-all">
          <ArrowLeft size={14} /> Protocolo Inicial
        </Link>

        {/* MAIN CONTENT */}
        <div className="relative z-10 pb-32">
          <div className="max-w-7xl mx-auto px-6 pt-24 lg:pt-28">

            {/* ══════ HERO — Full Width Cinematic ══════ */}
            <motion.header style={{ y: heroY }} className="mb-28 relative overflow-hidden rounded-2xl border border-border/50">
              <div className="relative min-h-[500px] md:min-h-[600px]">
                <img src={heroImg} alt="Bitcoin dourado flutuando em atmosfera cinematográfica" className="absolute inset-0 w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 flex items-center h-full min-h-[500px] md:min-h-[600px] px-8 md:px-16 lg:px-20"
                >
                  <div className="max-w-2xl">
                    <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-orange-500 mb-6 block">Fundamento Zero</span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      O que é<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 italic">Bitcoin?</span>
                    </h1>
                    <p className="text-muted-foreground text-base md:text-lg leading-8 max-w-xl">
                      Ao contrário das moedas fiduciárias impressas ao bel-prazer de burocratas, o Bitcoin é regido por <strong className="text-foreground">leis matemáticas imutáveis</strong>. Uma rede puramente ponto a ponto: valor flui do remetente ao destinatário sem pedir licença a bancos ou governos.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.header>

            {/* ══════ 01. DEFINIÇÃO — Text Left / Image Right ══════ */}
            <AnimSection>
              <section id="definicao" className="mb-28 scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Text */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-orange-500/60">[ CAPÍTULO 01 ]</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.3] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      Definição: <span className="text-orange-400">O que é Bitcoin?</span>
                    </h2>
                    <div className="space-y-5 text-muted-foreground text-base leading-8">
                      <p>Bitcoin é um <strong className="text-foreground">protocolo de dinheiro digital descentralizado</strong>, criado em 2008 por Satoshi Nakamoto e lançado em janeiro de 2009. Opera sem bancos centrais, sem governos e sem intermediários.</p>
                      <p>É software de código aberto que permite a qualquer pessoa no planeta <strong className="text-foreground">enviar e receber valor pela internet</strong>, sem pedir permissão a ninguém, 24 horas por dia, 365 dias por ano.</p>
                    </div>

                    {/* Mini Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                      {[
                        { icon: Globe, title: 'Ponto a Ponto (P2P)', desc: 'Sem intermediários. Valor direto entre pessoas.' },
                        { icon: Lock, title: 'Escassez Absoluta', desc: '21 milhões. Nunca haverá mais.' },
                        { icon: ShieldCheck, title: 'Imutável', desc: 'Nenhum governo pode reverter.' },
                      ].map((item) => (
                        <div key={item.title} className="p-4 border border-orange-500/15 rounded-lg bg-orange-500/5 hover:bg-orange-500/10 transition-all group">
                          <item.icon className="text-orange-400 mb-2 group-hover:scale-110 transition-transform" size={18} />
                          <h4 className="text-foreground font-bold uppercase text-[11px] mb-1 tracking-tight">{item.title}</h4>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative rounded-xl overflow-hidden border border-border/50 aspect-[4/5] lg:aspect-auto lg:min-h-[520px]">
                    <img src={p2pImg} alt="Troca P2P de Bitcoin entre mãos" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-orange-400/80">PEER-TO-PEER · SEM INTERMEDIÁRIOS</span>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* ══════ 02. UTILIZAÇÃO — Image Left / Text Right ══════ */}
            <AnimSection>
              <section id="utilizacao" className="mb-28 scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Image */}
                  <div className="relative rounded-xl overflow-hidden border border-border/50 aspect-[4/5] lg:aspect-auto lg:min-h-[520px] order-2 lg:order-1">
                    <img src={fiatImg} alt="Dinheiro fiat queimando" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-orange-400/80">FIAT MORRE · BITCOIN PERMANECE</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-orange-500/60">[ CAPÍTULO 02 ]</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.3] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      Utilização: <span className="text-orange-400">Como é Usado?</span>
                    </h2>
                    <div className="space-y-4">
                      {[
                        { step: '01', title: 'Reserva de Valor', desc: 'Proteja seu patrimônio da inflação e do confisco estatal. Muitos tratam o Bitcoin como "ouro digital" — uma reserva de valor soberana e inconfiscável.' },
                        { step: '02', title: 'Meio de Troca', desc: 'Envie e receba pagamentos instantâneos via Lightning Network, sem taxas bancárias, 24/7, para qualquer lugar do planeta.' },
                        { step: '03', title: 'Fuga de Capital', desc: 'Atravesse fronteiras com bilhões na sua mente. Sem alfândega, sem declaração, sem autorização de burocratas.' },
                        { step: '04', title: 'Privacidade Financeira', desc: 'Transacione sem KYC quando mineado ou adquirido P2P. Sua vida financeira é assunto seu, não do Estado.' },
                      ].map((item) => (
                        <div key={item.step} className="bg-card/60 border border-border/50 rounded-xl p-6 flex gap-5 items-start group hover:border-orange-500/20 transition-all">
                          <div className="text-2xl font-black text-orange-500/20 group-hover:text-orange-500/50 transition-colors font-mono shrink-0">{item.step}</div>
                          <div>
                            <h4 className="text-foreground font-bold uppercase text-sm mb-1 tracking-tight">{item.title}</h4>
                            <p className="text-muted-foreground text-sm leading-7">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* ══════ 03. VANTAGENS — Full Width Data Block ══════ */}
            <AnimSection>
              <section id="vantagens" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-orange-500/60">[ CAPÍTULO 03 ]</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.3] mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Vantagens: <span className="text-orange-400">Por que é Superior?</span>
                </h2>

                {/* BRL vs BTC Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border border-destructive/20 rounded-xl p-8 relative overflow-hidden bg-card/60">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-destructive/40" />
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingDown className="text-destructive" size={18} />
                      <span className="text-destructive font-black uppercase text-[10px] tracking-widest font-mono">Real (BRL)</span>
                    </div>
                    <div className="space-y-3 text-sm font-mono">
                      <div className="flex justify-between text-muted-foreground"><span>Poder de compra desde 1994</span><span className="text-destructive font-bold">-86%</span></div>
                      <div className="flex justify-between text-muted-foreground"><span>Inflação anual (IPCA)</span><span className="text-destructive font-bold">~5-10%</span></div>
                      <div className="flex justify-between text-muted-foreground"><span>Impressão</span><span className="text-destructive font-bold animate-pulse">∞ ILIMITADA</span></div>
                    </div>
                  </div>
                  <div className="border border-green-500/20 rounded-xl p-8 relative overflow-hidden bg-card/60">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500/40" />
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="text-green-500" size={18} />
                      <span className="text-green-500 font-black uppercase text-[10px] tracking-widest font-mono">Bitcoin (BTC)</span>
                    </div>
                    <div className="space-y-3 text-sm font-mono">
                      <div className="flex justify-between text-muted-foreground"><span>Valorização desde 2009</span><span className="text-green-400 font-bold">+∞%</span></div>
                      <div className="flex justify-between text-muted-foreground"><span>Retorno anualizado</span><span className="text-green-400 font-bold">~50-100%</span></div>
                      <div className="flex justify-between text-muted-foreground"><span>Emissão</span><span className="text-green-400 font-bold">21M FIXO</span></div>
                    </div>
                  </div>
                </div>

                {/* 3 Advantage Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Escassez Absoluta', desc: 'Nunca existirão mais de 21 milhões. Enquanto o governo dilui sua riqueza imprimindo papel, o Bitcoin protege seu tempo de vida gravando sua posse em blocos imutáveis.', color: 'amber' },
                    { title: 'Divisibilidade Infinita', desc: 'Divisível em 100 milhões de Satoshis. No futuro, você medirá sua riqueza em Sats, não em papel apodrecido.', color: 'green' },
                    { title: 'Imutabilidade', desc: 'Uma vez confirmada na Blockchain, ninguém — absolutamente ninguém — pode reverter ou censurar sua transação.', color: 'cyan' },
                  ].map((card) => (
                    <div key={card.title} className="rounded-xl p-8 transition-all hover:-translate-y-1 bg-card/60 border border-border/50 hover:border-orange-500/20">
                      <h4 className="text-orange-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">{card.title}</h4>
                      <p className="text-muted-foreground text-sm leading-7">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </AnimSection>

            {/* ══════ 04. INFRAESTRUTURA — Text Left / Image Right ══════ */}
            <AnimSection>
              <section id="infraestrutura" className="mb-28 scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Text */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-orange-500/60">[ CAPÍTULO 04 ]</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.3] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      Infraestrutura: <span className="text-orange-400">Blockchain e Mineração</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-card/60 border border-border/50 rounded-xl p-6 space-y-3 group hover:border-orange-500/20 transition-all">
                        <Layers className="text-orange-400" size={20} />
                        <h3 className="text-foreground font-bold uppercase text-sm tracking-tight">Blockchain</h3>
                        <p className="text-muted-foreground text-sm leading-7">
                          Uma <strong className="text-foreground">corrente de blocos cronológica</strong> que impede o "gasto duplo". Cadeia imutável de registros.
                        </p>
                      </div>
                      <div className="bg-card/60 border border-border/50 rounded-xl p-6 space-y-3 group hover:border-orange-500/20 transition-all">
                        <Pickaxe className="text-orange-400" size={20} />
                        <h3 className="text-foreground font-bold uppercase text-sm tracking-tight">Mineração</h3>
                        <p className="text-muted-foreground text-sm leading-7">
                          O processo que protege a rede usando <strong className="text-foreground">energia real</strong>. Dinheiro lastreado na física.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { n: '01', t: 'Rede P2P', d: 'Computadores conectados diretamente. Sem servidor central. Cada nó possui cópia completa.' },
                        { n: '02', t: 'Proof of Work', d: 'Mineradores competem para resolver quebra-cabeças. O vencedor adiciona o bloco e recebe BTC.' },
                        { n: '03', t: 'Chaves Criptográficas', d: 'Chave pública para receber + chave privada para enviar. Controle total.' },
                        { n: '04', t: 'Consenso Distribuído', d: 'A rede valida por consenso. A verdade é matemática, não política.' },
                      ].map((item) => (
                        <div key={item.n} className="bg-card/60 border border-border/50 rounded-lg p-4 flex gap-4 items-start group hover:border-orange-500/10 transition-all">
                          <div className="text-xl font-black text-orange-500/20 group-hover:text-orange-500/50 transition-colors font-mono shrink-0">{item.n}</div>
                          <div>
                            <h4 className="text-foreground font-bold uppercase text-xs mb-1 tracking-tight">{item.t}</h4>
                            <p className="text-muted-foreground text-xs leading-relaxed">{item.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative rounded-xl overflow-hidden border border-border/50 aspect-[4/5] lg:aspect-auto lg:min-h-[600px]">
                    <img src={miningImg} alt="Fazenda de mineração Bitcoin industrial" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-green-400/80">PROOF OF WORK · ENERGIA REAL</span>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* ══════ 05. ESCASSEZ — Image Left / Text Right ══════ */}
            <AnimSection>
              <section id="escassez" className="mb-28 scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Image */}
                  <div className="relative rounded-xl overflow-hidden border border-border/50 aspect-[4/5] lg:aspect-auto lg:min-h-[520px] order-2 lg:order-1">
                    <img src={vaultImg} alt="Cofre de Bitcoin com luz dourada" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-amber-400/80">21 MILHÕES · ESCASSEZ ABSOLUTA</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-orange-500/60">[ CAPÍTULO 05 ]</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.3] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      Escassez: <span className="text-amber-400">O Limite dos 21 Milhões</span>
                    </h2>
                    <p className="text-muted-foreground text-base leading-8 mb-8">
                      O limite de <strong className="text-foreground">21 milhões de bitcoins</strong> é enforced por dezenas de milhares de nós ao redor do mundo. Através do <strong className="text-amber-400">Halving</strong>, a recompensa por bloco cai pela metade a cada ~4 anos, forçando a inflação da rede a tender a zero.
                    </p>

                    {/* Halving Chart */}
                    <div className="mb-8">
                      <h3 className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground mb-4">CRONOGRAMA DE HALVINGS</h3>
                      <div className="flex items-end gap-2 h-32 border-b border-l border-border/30 p-2">
                        {[
                          { year: '2009', reward: '50', pct: 100 },
                          { year: '2012', reward: '25', pct: 50 },
                          { year: '2016', reward: '12.5', pct: 25 },
                          { year: '2020', reward: '6.25', pct: 12.5 },
                          { year: '2024', reward: '3.125', pct: 6.25 },
                          { year: '2028', reward: '1.56', pct: 3.12 },
                        ].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                            <span className="text-[8px] text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">{h.reward}</span>
                            <div
                              className="w-full bg-orange-500/20 border-t border-orange-500 group-hover:bg-orange-500/40 transition-colors rounded-t"
                              style={{ height: `${h.pct}%`, minHeight: '4px' }}
                            />
                            <span className="text-[9px] text-muted-foreground font-mono mt-1">{h.year}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Limite', value: '21M', color: 'text-amber-500' },
                        { label: 'Minerados', value: '~19.8M', color: 'text-foreground' },
                        { label: 'Último', value: '2140', color: 'text-muted-foreground' },
                      ].map((stat) => (
                        <div key={stat.label} className="p-4 border border-border/50 rounded-lg text-center bg-card/60">
                          <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest font-mono">{stat.label}</p>
                          <p className={`text-2xl font-black italic mt-1 ${stat.color}`}>{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* ══════ 06. SOBERANIA — Text Left / Image Right ══════ */}
            <AnimSection>
              <section id="soberania" className="mb-28 scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Text */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-orange-500/60">[ CAPÍTULO 06 ]</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.3] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      Soberania: <span className="text-orange-400">Descentralização e Divisibilidade</span>
                    </h2>

                    <div className="space-y-6">
                      <div className="bg-card/60 border border-border/50 rounded-xl p-6 space-y-3">
                        <h3 className="text-foreground font-bold uppercase text-sm tracking-tight">Descentralização</h3>
                        <p className="text-muted-foreground text-sm leading-7">
                          Não existe CEO, sede ou conselho diretivo. O criador desapareceu. <strong className="text-foreground">Sem líder para ser preso, corrompido ou pressionado</strong>, o Bitcoin é resistente à captura regulatória ou corporativa.
                        </p>
                        <p className="text-muted-foreground text-sm leading-7">
                          Dezenas de milhares de nós independentes validam as mesmas regras. Alterar o protocolo exige consenso da rede inteira.
                        </p>
                      </div>
                      <div className="bg-card/60 border border-orange-500/10 rounded-xl p-6 space-y-3 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.4),transparent_70%)]" />
                        <div className="relative z-10">
                          <h3 className="text-amber-400 font-bold uppercase text-sm tracking-tight">Divisibilidade</h3>
                          <p className="text-muted-foreground text-sm leading-7 mb-4">
                            Cada bitcoin é divisível em <strong className="text-foreground">100 milhões de Satoshis</strong>. Você não precisa comprar 1 BTC inteiro.
                          </p>
                          <div className="text-center py-4">
                            <div className="text-3xl font-black text-foreground italic">1 BTC</div>
                            <div className="text-amber-500 font-black text-lg my-1">=</div>
                            <div className="text-3xl font-black text-amber-500 italic">100.000.000</div>
                            <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-[9px] mt-1 font-mono">Satoshis</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative rounded-xl overflow-hidden border border-border/50 aspect-[4/5] lg:aspect-auto lg:min-h-[520px]">
                    <img src={globeImg} alt="Rede descentralizada global do Bitcoin" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-orange-400/80">REDE GLOBAL · SEM FRONTEIRAS</span>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* ══════ ALERTA FINAL — Image Left / Text Right ══════ */}
            <AnimSection>
              <section id="alerta" className="mb-16 scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12">
                  {/* Image */}
                  <div className="relative rounded-xl overflow-hidden border border-destructive/20 aspect-[4/5] lg:aspect-auto lg:min-h-[480px] order-2 lg:order-1">
                    <img src={walletImg} alt="Hardware wallet Bitcoin em mão" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-destructive/80 animate-pulse">● AUTOCUSTÓDIA · SUAS CHAVES</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-destructive/60">[ ALERTA FINAL ]</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.3] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      Autocustódia: <span className="text-destructive">Not Your Keys, Not Your Coins</span>
                    </h2>

                    <div className="space-y-5 text-muted-foreground text-base leading-8 mb-6">
                      <p>Muitas pessoas cometem o erro de deixar seus Bitcoins sob a guarda de custodiantes. Entenda: <strong className="text-foreground">Chaves privadas são o que permitem o envio de Bitcoins</strong>.</p>
                      <p>Se você não controla suas chaves, você <strong className="text-destructive">não tem Bitcoin</strong>; você tem uma promessa de pagamento de um terceiro.</p>
                    </div>

                    <div className="p-5 border border-destructive/20 rounded-lg bg-destructive/5 text-center">
                      <p className="text-destructive font-black uppercase text-sm font-mono tracking-wider animate-pulse">
                        NUNCA COMPARTILHE SUAS CHAVES PRIVADAS
                      </p>
                    </div>
                  </div>
                </div>

                {/* Conclusão — Full Width */}
                <div className="bg-card/60 border border-orange-500/20 rounded-xl p-10 md:p-14 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.5),transparent_60%)]" />
                  <div className="relative z-10 space-y-8">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      O <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Estalo</span> Mental
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { title: 'Ponto a Ponto', desc: 'Sem intermediários, sem censura. Valor flui direto entre pessoas livres.' },
                        { title: '21 Milhões', desc: 'Oferta fixa contra impressão infinita. Seu suor preservado em código.' },
                        { title: 'Inviolável', desc: 'A rede mais segura do planeta, operando sem parar há mais de uma década.' },
                      ].map((item) => (
                        <div key={item.title} className="space-y-2">
                          <p className="text-orange-400 font-black uppercase text-sm font-mono">{item.title}</p>
                          <p className="text-muted-foreground text-sm leading-7">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

          </div>
        </div>
      </div>
    </>
  );
}
