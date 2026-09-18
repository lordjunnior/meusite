import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TrendingDown, Percent, Landmark, Scale, BarChart3, Clock, AlertTriangle, ShieldAlert, HelpCircle, Calculator, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import { NAV_ITEMS, MECANISMO, CANTILLON_NIVEIS, NUMEROS_REAIS, MENTIRAS, FERRAMENTAS, TIMELINE_ITEMS, FAQ_ITEMS } from '@/lib/inflacaoData';
import imgNotasDestruidas from '@/assets/inflacao-notas-destruidas.webp';
import imgBalancaCantillon from '@/assets/inflacao-balanca-cantillon.webp';
import imgImpressoraDinheiro from '@/assets/inflacao-impressora-dinheiro.webp';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQ_ITEMS.map(item => ({ "@type": "Question", "name": item.pergunta, "acceptedAnswer": { "@type": "Answer", "text": item.resposta } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Inflação: O Imposto Oculto. Como a Inflação Rouba Seu Dinheiro", "description": "Entenda como a inflação funciona, por que ela é um imposto invisível e como proteger seu patrimônio.", "author": { "@type": "Person", "name": "Lord Junnior" }, "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" }, "datePublished": "2026-03-07", "url": "https://lordjunnior.com.br/inflacao-imposto-oculto", "keywords": "inflação, inflação como funciona, inflação rouba dinheiro, o que causa inflação, Efeito Cantillon, imposto inflacionário, proteger dinheiro da inflação, Bitcoin inflação" };

export default function InflacaoImpostoOculto() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcValor, setCalcValor] = useState(1000);
  const [calcAno, setCalcAno] = useState(1994);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const inflacaoAcumulada: Record<number, number> = {
    1994: 0.85, 1995: 0.83, 1996: 0.82, 1997: 0.81, 1998: 0.80,
    1999: 0.79, 2000: 0.77, 2001: 0.74, 2002: 0.70, 2003: 0.65,
    2004: 0.62, 2005: 0.59, 2006: 0.57, 2007: 0.55, 2008: 0.52,
    2009: 0.50, 2010: 0.47, 2011: 0.44, 2012: 0.41, 2013: 0.38,
    2014: 0.35, 2015: 0.30, 2016: 0.25, 2017: 0.23, 2018: 0.21,
    2019: 0.18, 2020: 0.15, 2021: 0.10, 2022: 0.06, 2023: 0.04,
    2024: 0.02, 2025: 0.01,
  };
  const perda = inflacaoAcumulada[calcAno] ?? 0.85;
  const valorHoje = calcValor * (1 - perda);
  const perdaReais = calcValor - valorHoje;

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-red-300/50 relative overflow-hidden" style={{ background: '#050808' }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Inflação: O Imposto Oculto. Como Seu Dinheiro Está Derretendo | Lord Junnior</title>
        <meta name="description" content="Entenda como a inflação funciona, por que ela é um imposto invisível que rouba seu poder de compra todos os dias e como proteger seu patrimônio com Bitcoin e diversificação." />
        <link rel="canonical" href="https://lordjunnior.com.br/inflacao-imposto-oculto" />
        <meta property="og:title" content="Inflação: O Imposto Oculto. Como Seu Dinheiro Está Derretendo" />
        <meta property="og:url" content="https://lordjunnior.com.br/inflacao-imposto-oculto" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <ScrollToTop />

      {/* VFX STACK */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)', animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)', animationDuration: '12s' }} />
      </div>

      <CinematicHero
        image="/heroes/inflacao-imposto-oculto.webp"
        phase="Educação Monetária"
        title={<>Inflação:<br /><span className="text-red-400">O Imposto Oculto</span></>}
        subtitle="A inflação não é um fenômeno natural. É uma política deliberada dos bancos centrais que funciona como um imposto invisível, roubando silenciosamente o poder de compra do seu dinheiro, todos os dias."
        icon={TrendingDown}
        accentColor="rose"
        backLink="/"
        backLabel="Início"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-32">

        {/* O QUE É — Alternating Grid with Image */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20"><Percent className="text-red-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O Que É Inflação, De Verdade</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-12">
              <div className="space-y-5 text-stone-400 leading-8">
                <p className="text-base">A definição oficial diz que inflação é o <strong className="text-stone-100">"aumento generalizado dos preços"</strong>. Isso é tecnicamente correto, mas profundamente enganoso. É como dizer que a febre é "o aumento da temperatura do corpo" sem mencionar a infecção que a causou.</p>
                <p className="text-base">A inflação real, a causa e não o sintoma, é a <strong className="text-red-400">expansão da oferta monetária</strong>. Quando o banco central cria dinheiro novo, cada real que já existe perde um pouco de valor.</p>
                <p className="text-base">O economista Milton Friedman resumiu: <em className="text-stone-100">"A inflação é sempre e em todo lugar um fenômeno monetário."</em> É causada por uma coisa e apenas uma coisa: <strong className="text-stone-100">impressão de dinheiro</strong>.</p>
              </div>
            </div>
            <motion.div variants={fadeUp} custom={1} className="relative rounded-2xl overflow-hidden border border-white/[0.06] group">
              <img src={imgNotasDestruidas} alt="Notas sendo destruídas — a realidade da inflação" className="w-full h-[380px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.7) saturate(0.85)' }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,8,8,0.8) 80%, rgba(5,8,8,0.95) 100%)' }} />
              <div className="absolute bottom-5 left-6 right-6">
                <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed">A inflação não destrói o papel — destrói o poder de compra que ele representa.</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CALCULADORA */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20"><Calculator className="text-red-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Calculadora da Inflação</h2>
          </div>
          <div className="bg-red-950/15 border border-red-500/15 rounded-2xl p-8 md:p-12">
            <p className="text-stone-400 text-sm leading-relaxed mb-8">Descubra quanto do seu dinheiro a inflação já devorou. Insira um valor e o ano para ver o poder de compra real hoje.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500 block mb-2">Valor em Reais (R$)</label>
                <input type="number" value={calcValor} onChange={(e) => setCalcValor(Number(e.target.value) || 0)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-100 font-bold text-lg font-mono focus:border-red-500/50 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500 block mb-2">Ano de Referência</label>
                <select value={calcAno} onChange={(e) => setCalcAno(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-100 font-bold text-lg font-mono focus:border-red-500/50 focus:outline-none transition-colors appearance-none">
                  {Object.keys(inflacaoAcumulada).map(ano => (<option key={ano} value={ano} className="bg-[#050808]">{ano}</option>))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-6 text-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-500/60">Valor Original ({calcAno})</span>
                <p className="text-2xl font-bold text-stone-100 font-mono mt-2">R$ {calcValor.toLocaleString('pt-BR')}</p>
              </div>
              <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-6 text-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-500/60">Poder de Compra Hoje</span>
                <p className="text-2xl font-bold text-red-400 font-mono mt-2">R$ {valorHoje.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-6 text-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-500/60">A Inflação Devorou</span>
                <p className="text-2xl font-bold text-red-400 font-mono mt-2">R$ {perdaReais.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
                <p className="text-[10px] font-bold text-red-500/80 font-mono mt-1">{(perda * 100).toFixed(0)}% de perda</p>
              </div>
            </div>
            <p className="text-stone-600 text-[10px] mt-4 text-center">Valores aproximados baseados no IPCA acumulado. A inflação real costuma ser maior que o índice oficial.</p>
          </div>
        </motion.section>

        {/* COMO FUNCIONA — Image Left, Content Right */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20"><Landmark className="text-red-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Como a Inflação Funciona</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-10">
            <motion.div variants={fadeUp} custom={1} className="relative rounded-2xl overflow-hidden border border-white/[0.06] group">
              <img src={imgImpressoraDinheiro} alt="Impressora de dinheiro do banco central" className="w-full h-[380px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.6) saturate(0.85)' }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,8,8,0.8) 80%, rgba(5,8,8,0.95) 100%)' }} />
              <div className="absolute bottom-5 left-6 right-6">
                <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed">A máquina de impressão não descansa. Seu poder de compra, sim.</p>
              </div>
            </motion.div>
            <div className="space-y-4">
              {MECANISMO.map((item, i) => (
                <motion.div key={i} variants={fadeUp} custom={i + 1} className="bg-white/[0.02] border border-red-500/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"><item.icon className="text-red-400" size={18} /></div>
                    <div><span className="text-red-500/60 font-bold text-[10px] tracking-wider">ETAPA {i + 1}</span><h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight italic">{item.titulo}</h3></div>
                  </div>
                  <p className="text-stone-400 text-sm leading-8">{item.descricao}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* EFEITO CANTILLON — Content Left, Image Right */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20"><Scale className="text-red-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Efeito Cantillon</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-6">
            <div>
              <p className="text-stone-400 text-base leading-8 mb-8">O dinheiro novo não aparece igualmente para todos. Ele segue uma <strong className="text-stone-100">hierarquia de acesso</strong>, e você está no final da fila:</p>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
                {CANTILLON_NIVEIS.map((n, i) => (
                  <div key={i} className={`grid grid-cols-[60px_1fr_1fr_1fr] group hover:bg-red-500/[0.03] transition-colors ${i < CANTILLON_NIVEIS.length - 1 ? 'border-b border-white/5' : ''}`}>
                    <div className="p-4 flex items-center justify-center"><span className={`font-bold text-sm font-mono ${i >= 3 ? 'text-red-400' : 'text-emerald-500/60'}`}>{n.nivel}</span></div>
                    <div className="p-4"><span className="text-stone-200 font-bold text-xs">{n.quem}</span></div>
                    <div className="p-4"><span className="text-stone-400 text-xs">{n.efeito}</span></div>
                    <div className="p-4"><span className={`text-xs font-bold ${i >= 3 ? 'text-red-400' : 'text-emerald-400/60'}`}>{n.resultado}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <motion.div variants={fadeUp} custom={1} className="relative rounded-2xl overflow-hidden border border-white/[0.06] group">
              <img src={imgBalancaCantillon} alt="Balança desequilibrada — Efeito Cantillon" className="w-full h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.65) saturate(0.85)' }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,8,8,0.8) 80%, rgba(5,8,8,0.95) 100%)' }} />
              <div className="absolute bottom-5 left-6 right-6">
                <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed">Quem imprime fica rico. Quem poupa empobrece. A balança nunca esteve equilibrada.</p>
              </div>
            </motion.div>
          </div>
          <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-6">
            <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider mb-2">A Verdade Brutal</p>
            <p className="text-stone-100 font-bold text-base leading-tight uppercase italic">A inflação é a maior máquina de transferência de riqueza da história: dos pobres para os ricos, dos poupadores para os impressores.</p>
          </div>
        </motion.section>

        {/* NÚMEROS REAIS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20"><BarChart3 className="text-red-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Os Números Reais</h2>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[1fr_80px_80px_1fr] border-b border-white/10 bg-white/[0.02]">
              <div className="p-4"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">Moeda</span></div>
              <div className="p-4"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">Desde</span></div>
              <div className="p-4"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">Perda</span></div>
              <div className="p-4"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">Na prática</span></div>
            </div>
            {NUMEROS_REAIS.map((n, i) => (
              <div key={i} className={`grid grid-cols-[1fr_80px_80px_1fr] group hover:bg-red-500/[0.03] transition-colors ${i < NUMEROS_REAIS.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className="p-4"><span className="text-stone-200 font-bold text-sm">{n.moeda}</span></div>
                <div className="p-4"><span className="text-stone-500 text-xs font-mono">{n.desde}</span></div>
                <div className="p-4"><span className="text-red-400 font-bold text-sm font-mono">{n.perda}</span></div>
                <div className="p-4"><span className="text-stone-400 text-xs">{n.obs}</span></div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* TIMELINE */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20"><Clock className="text-red-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Linha do Tempo da Destruição</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500/40 via-red-500/20 to-transparent" />
            <div className="space-y-8">
              {TIMELINE_ITEMS.map((item, i) => (
                <div key={i} className="relative flex gap-6 group">
                  <div className="relative z-10 shrink-0">
                    <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-2 flex items-center justify-center ${i === TIMELINE_ITEMS.length - 1 ? 'border-red-500 bg-red-500/20' : 'border-red-500/30 bg-[#050808] group-hover:border-red-500/60'} transition-colors`}>
                      <span className="text-red-400 font-bold text-[8px] font-mono">{item.ano}</span>
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex-1 group-hover:border-red-500/20 transition-colors">
                    <h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight mb-2">{item.evento}</h3>
                    <p className="text-stone-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 3 MENTIRAS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20"><AlertTriangle className="text-red-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>As 3 Mentiras Sobre Inflação</h2>
          </div>
          <div className="space-y-4">
            {MENTIRAS.map((m, i) => (
              <div key={i} className="bg-white/[0.02] border border-red-500/10 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight mb-2 italic">{m.mentira}</h3>
                <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider mb-3">A Verdade:</p>
                <p className="text-stone-400 text-sm leading-relaxed">{m.verdade}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PROTEÇÃO */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20"><ShieldAlert className="text-red-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Como Se Proteger</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FERRAMENTAS.map((tool, i) => (
              <div key={i} className="bg-white/[0.02] border border-red-500/10 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0"><tool.icon className="text-red-400" size={18} /></div>
                  <div><h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight italic">{tool.titulo}</h3><p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{tool.subtitulo}</p></div>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed my-4">{tool.descricao}</p>
                <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-4"><p className="text-red-400 text-[10px] font-bold uppercase leading-relaxed">{tool.destaque}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/bitcoin/o-que-e" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] bg-amber-500/15 border border-amber-500/25 text-amber-400 hover:bg-amber-500/25 transition-all">₿ O Que é o Bitcoin</Link>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20"><HelpCircle className="text-red-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Perguntas Frequentes</h2>
          </div>
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <h3 className="text-stone-200 font-bold text-sm leading-snug pr-4">{item.pergunta}</h3>
                  <ChevronDown className={`text-red-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={16} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 border-t border-white/5 pt-4"><p className="text-stone-400 text-sm leading-relaxed">{item.resposta}</p></div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CONCLUSÃO */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-red-950/20 border-2 border-red-500/30 rounded-2xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(239,68,68,0.5) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A Verdade Nua:<br /><span className="text-red-400 italic">Inflação É Roubo.</span></h3>
              <div className="space-y-5 text-stone-400 leading-relaxed mb-10">
                <p className="text-base">Agora você entende o que <strong className="text-stone-100">99% da população não entende</strong>: a inflação não é um acidente, não é uma força da natureza e não é culpa dos empresários. É uma política deliberada que transfere riqueza de quem trabalha para quem imprime.</p>
                <p className="text-base">O próximo passo é <strong className="text-red-400">agir</strong>. Converter conhecimento em proteção.</p>
              </div>
              <Link to="/bitcoin-vs-fiat" className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold uppercase text-sm tracking-[0.2em] bg-amber-500/15 border border-amber-500/25 text-amber-400 hover:bg-amber-500/25 transition-all">⚡ Bitcoin vs Fiat: A Comparação</Link>
            </div>
          </div>
        </motion.section>

        {/* LEIA TAMBÉM */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="flex items-center gap-3 mb-8"><BookOpen size={16} className="text-stone-500" /><h2 className="text-sm font-bold text-stone-500 uppercase tracking-wider">Leia Também</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { to: '/historia-do-dinheiro', titulo: 'História do Dinheiro', desc: 'Como o dinheiro foi criado e corrompido', tag: 'EDUCAÇÃO' },
              { to: '/bitcoin-vs-fiat', titulo: 'Bitcoin vs Fiat', desc: 'A comparação direta e definitiva', tag: 'COMPARAÇÃO' },
              { to: '/alertas/cbdc-brasil', titulo: 'DREX: CBDC Brasil', desc: 'A moeda digital programável do governo', tag: 'ALERTA' },
            ].map((link, i) => (
              <Link key={i} to={link.to} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-red-500/20 hover:bg-red-500/[0.02] transition-all group">
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-stone-600">{link.tag}</span>
                <h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight mt-2 mb-1 group-hover:text-red-400 transition-colors">{link.titulo}</h3>
                <p className="text-stone-500 text-xs leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
