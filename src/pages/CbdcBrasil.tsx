import React, { useState, useEffect } from 'react';
import ContraAtaquePratico from '@/components/ContraAtaquePratico';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Cpu, Globe, ShieldAlert, AlertTriangle, Lock, ChevronDown, ChevronRight, Play, BookOpen, HelpCircle, Clock, Code, Landmark, Zap, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import { NAV_ITEMS, CBDC_GLOBAL, COMO_FUNCIONA_ETAPAS, COMPARACAO, RISCOS, FERRAMENTAS, TIMELINE_ITEMS, FAQ_ITEMS } from '@/lib/cbdcBrasilData';
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
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "DREX — A Moeda Digital do Banco Central que pode controlar seu dinheiro", "description": "Entenda o que é o DREX (Real Digital), como a CBDC brasileira funciona, os riscos para sua privacidade financeira e como se proteger com Bitcoin.", "author": { "@type": "Person", "name": "Lord Junnior" }, "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" }, "datePublished": "2026-03-07", "url": "https://lordjunnior.com.br/alertas/cbdc-brasil", "keywords": "DREX, moeda digital banco central, CBDC Brasil, real digital, DREX riscos, DREX vs Bitcoin" };

export default function CbdcBrasil() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-purple-300/50 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>DREX — Moeda Digital do Banco Central do Brasil (CBDC) | Lord Junnior</title>
        <meta name="description" content="O DREX (Real Digital) é a moeda digital programável do Banco Central do Brasil. Entenda como funciona, os riscos para sua privacidade financeira e como se proteger com Bitcoin e autocustódia." />
        <link rel="canonical" href="https://lordjunnior.com.br/alertas/cbdc-brasil" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* VFX STACK */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.4) 0%, transparent 70%)', animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)', animationDuration: '12s' }} />
      </div>

      <CinematicHero
        image="/heroes/cbdc-brasil.webp"
        phase="Alerta Monetário · CBDC"
        title={<>O Governo Quer<br /><span className="text-purple-400">Programar Seu Dinheiro</span></>}
        subtitle="O DREX é a moeda digital do Banco Central do Brasil — uma CBDC programável que dá ao governo controle absoluto sobre cada transação, cada real e cada decisão financeira da sua vida."
        icon={Cpu}
        accentColor="purple"
        backLink="/alertas"
        backLabel="Alertas"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-32">

        {/* STATS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Real Digital', value: 'DREX' },
              { label: 'Moeda Programável', value: 'CBDC' },
              { label: 'Brasileiros Afetados', value: '215 mi' },
            ].map((s) => (
              <div key={s.label} className="bg-purple-950/15 border border-purple-500/15 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-purple-400 mb-1">{s.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* COMO FUNCIONA */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20"><Code className="text-purple-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Como o DREX Funciona</h2>
          </div>
          <p className="text-stone-400 text-base leading-relaxed mb-10 max-w-3xl">
            O DREX opera em uma <strong className="text-stone-100">blockchain permissionada</strong> controlada exclusivamente pelo Banco Central. Diferente do Bitcoin, onde qualquer pessoa pode participar, no DREX apenas instituições autorizadas têm acesso.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {COMO_FUNCIONA_ETAPAS.map((etapa, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 1} className="bg-white/[0.02] border border-purple-500/10 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center"><etapa.icon className="text-purple-400" size={18} /></div>
                  <div><span className="text-purple-500/60 font-bold text-[10px] tracking-wider">CAMADA {i + 1}</span><h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight italic">{etapa.titulo}</h3></div>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">{etapa.descricao}</p>
              </motion.div>
            ))}
          </div>

          {/* CBDC Global */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-2"><Globe className="text-purple-400" size={14} /><h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight">CBDCs no Mundo — O Cerco Global</h3></div>
              <p className="text-stone-500 text-xs mt-2">Mais de 130 países estão desenvolvendo moedas digitais de banco central.</p>
            </div>
            <div className="grid grid-cols-[1fr_100px_120px_80px] border-b border-white/10 bg-white/[0.02]">
              <div className="p-4"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">País</span></div>
              <div className="p-4"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">Moeda</span></div>
              <div className="p-4"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">Status</span></div>
              <div className="p-4"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">Pop.</span></div>
            </div>
            {CBDC_GLOBAL.map((row, i) => (
              <div key={i} className={`grid grid-cols-[1fr_100px_120px_80px] group hover:bg-purple-500/[0.03] transition-colors ${i < CBDC_GLOBAL.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className="p-4 flex items-center gap-2"><span className="text-lg">{row.flag}</span><span className="text-stone-200 font-bold text-sm">{row.pais}</span></div>
                <div className="p-4"><span className="text-purple-400 font-bold text-xs font-mono">{row.moeda}</span></div>
                <div className="p-4"><span className="text-xs font-bold text-amber-500/80 uppercase tracking-wider">{row.status}</span></div>
                <div className="p-4"><span className="text-stone-500 text-xs font-mono">{row.pop}</span></div>
              </div>
            ))}
            <div className="grid grid-cols-[1fr_100px_120px_80px] bg-purple-950/15 border-t border-purple-500/20">
              <div className="p-4 flex items-center gap-2"><span className="text-lg">🇧🇷</span><span className="text-stone-100 font-bold text-sm">Brasil</span></div>
              <div className="p-4"><span className="text-purple-400 font-bold text-xs font-mono">DREX</span></div>
              <div className="p-4"><span className="text-xs font-bold text-purple-400 uppercase tracking-wider animate-pulse">Em testes</span></div>
              <div className="p-4"><span className="text-stone-500 text-xs font-mono">215 mi</span></div>
            </div>
          </div>
        </motion.section>

        {/* DREX vs BITCOIN */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20"><ShieldAlert className="text-purple-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>DREX vs Bitcoin</h2>
          </div>
          <p className="text-stone-400 text-base leading-relaxed mb-10 max-w-3xl">
            Muita gente confunde DREX com Bitcoin porque ambos usam "blockchain". Mas as semelhanças param aí. O DREX é o <strong className="text-stone-100">oposto filosófico e tecnológico</strong> do Bitcoin.
          </p>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[120px_1fr_1fr] border-b border-white/10 bg-white/[0.02]">
              <div className="p-4"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">Aspecto</span></div>
              <div className="p-4"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-purple-400">DREX</span></div>
              <div className="p-4"><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-400">Bitcoin</span></div>
            </div>
            {COMPARACAO.map((row, i) => (
              <div key={i} className={`grid grid-cols-[120px_1fr_1fr] group hover:bg-white/[0.02] transition-colors ${i < COMPARACAO.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className="p-4"><span className="text-stone-200 font-bold text-xs">{row.aspecto}</span></div>
                <div className="p-4"><span className="text-red-400/80 text-xs">{row.drex}</span></div>
                <div className="p-4"><span className="text-emerald-400/80 text-xs">{row.bitcoin}</span></div>
              </div>
            ))}
          </div>
          <div className="bg-purple-950/15 border border-purple-500/20 rounded-2xl p-6 mt-6">
            <p className="text-purple-400 text-[10px] font-bold uppercase tracking-wider mb-2">A Diferença Fundamental</p>
            <p className="text-stone-100 font-bold text-base leading-tight uppercase italic">O DREX é dinheiro do governo. O Bitcoin é dinheiro do indivíduo.</p>
          </div>
        </motion.section>

        {/* TIMELINE */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20"><Clock className="text-purple-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Linha do Tempo do DREX</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent" />
            <div className="space-y-8">
              {TIMELINE_ITEMS.map((item, i) => (
                <div key={i} className="relative flex gap-6 group">
                  <div className="relative z-10 shrink-0">
                    <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-2 flex items-center justify-center ${i === TIMELINE_ITEMS.length - 1 ? 'border-purple-500 bg-purple-500/20' : 'border-purple-500/30 bg-[#050808] group-hover:border-purple-500/60'} transition-colors`}>
                      <span className="text-purple-400 font-bold text-[10px] font-mono">{item.ano}</span>
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex-1 group-hover:border-purple-500/20 transition-colors">
                    <h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight mb-2">{item.evento}</h3>
                    <p className="text-stone-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 5 RISCOS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20"><AlertTriangle className="text-purple-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Os 5 Riscos Reais do DREX</h2>
          </div>
          <div className="space-y-4">
            {RISCOS.map((risco, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 1} className="bg-white/[0.02] border border-purple-500/10 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0"><risco.icon className="text-purple-400" size={20} /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight italic">{risco.titulo}</h3>
                      <span className={`text-[8px] font-bold uppercase tracking-[0.3em] px-2 py-0.5 rounded ${risco.gravidade === 'CRÍTICO' ? 'text-red-400 bg-red-950/30' : 'text-amber-400 bg-amber-950/30'}`}>{risco.gravidade}</span>
                    </div>
                    <p className="text-stone-400 text-xs leading-relaxed">{risco.descricao}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ERRO FATAL */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-amber-950/15 border-2 border-amber-500/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6"><AlertTriangle className="text-amber-400" size={14} /><span className="text-amber-400 font-bold uppercase tracking-[0.4em] text-[9px]">Atenção</span></div>
              <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O Erro Fatal Que<br /><span className="text-amber-400 italic">Quase Todos Cometem</span></h3>
              <div className="space-y-4 text-stone-400 text-base leading-relaxed max-w-3xl">
                <p>A maioria das pessoas ouve falar do DREX e pensa: <strong className="text-stone-100">"É só uma versão digital do Real."</strong> Esse é o erro. A mudança não é na forma — é no <strong className="text-purple-400">poder sobre o dinheiro</strong>.</p>
                <p>Quando o dinheiro se torna programável pelo governo, ele deixa de ser um meio de troca neutro e se transforma em uma <strong className="text-stone-100">ferramenta de controle social</strong>.</p>
                <p>A China já faz isso com o e-CNY. A tecnologia está pronta. A única pergunta é: <strong className="text-stone-100">quando</strong>.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ARSENAL DE DEFESA */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20"><ShieldAlert className="text-purple-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Arsenal de Defesa</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FERRAMENTAS.map((tool, i) => (
              <div key={i} className="bg-white/[0.02] border border-purple-500/10 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0"><tool.icon className="text-purple-400" size={18} /></div>
                  <div><h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight italic">{tool.titulo}</h3><p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{tool.subtitulo}</p></div>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed my-4">{tool.descricao}</p>
                <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-4"><p className="text-purple-400 text-[10px] font-bold uppercase leading-relaxed">{tool.destaque}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/autocustodia" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] bg-amber-500/15 border border-amber-500/25 text-amber-400 hover:bg-amber-500/25 transition-all">🔐 Aprender Autocustódia Agora</Link>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20"><HelpCircle className="text-purple-400" size={20} /></div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Perguntas Frequentes</h2>
          </div>
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <h3 className="text-stone-200 font-bold text-sm leading-snug pr-4">{item.pergunta}</h3>
                  <ChevronDown className={`text-purple-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={16} />
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
          <div className="bg-purple-950/20 border-2 border-purple-500/30 rounded-2xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.5) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A Escolha<br /><span className="text-purple-400 italic">É Sua.</span></h3>
              <div className="space-y-6 text-stone-400 leading-relaxed mb-10">
                <p className="text-base">O DREX não é inevitável. Ele é inevitável <strong className="text-stone-100">para quem não se prepara</strong>. Para quem entende o jogo, existe Bitcoin, autocustódia, Lightning Network e jurisdições que respeitam a privacidade financeira.</p>
                <p className="text-base">O DREX é a resposta do governo. O <strong className="text-stone-100">Bitcoin é a resposta do indivíduo</strong>.</p>
                <p className="text-sm text-stone-400 mt-3">
                  O governo pode programar seu dinheiro, mas não pode programar o que ele não vê.{" "}
                  <Link to="/comprar-bitcoin-com-privacidade" className="text-amber-400 font-semibold hover:underline underline-offset-4 transition-colors">
                    Aprenda o Protocolo de Privacidade →
                  </Link>
                </p>
              </div>
              <Link to="/autocustodia" className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold uppercase text-sm tracking-[0.2em] bg-amber-500/15 border border-amber-500/25 text-amber-400 hover:bg-amber-500/25 transition-all">🔐 Aprender Autocustódia Agora</Link>
            </div>
          </div>
        </motion.section>

        <ContraAtaquePratico theme="dark" />

        {/* LEIA TAMBÉM */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="flex items-center gap-3 mb-8"><BookOpen size={16} className="text-stone-500" /><h2 className="text-sm font-bold text-stone-500 uppercase tracking-wider">Leia Também</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { to: '/alertas/fim-do-dinheiro-vivo', titulo: 'Fim do Dinheiro Vivo', desc: 'PL 3.951 e os limites ao espécie', tag: 'ALERTA' },
              { to: '/autocustodia', titulo: 'Autocustódia de Bitcoin', desc: 'O antídoto contra o dinheiro programável', tag: 'FUNDAMENTO' },
              { to: '/alertas', titulo: 'Central de Alertas', desc: 'Todos os alertas de soberania', tag: 'HUB' },
            ].map((link, i) => (
              <Link key={i} to={link.to} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-purple-500/20 hover:bg-purple-500/[0.02] transition-all group">
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-stone-600">{link.tag}</span>
                <h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight mt-2 mb-1 group-hover:text-purple-400 transition-colors">{link.titulo}</h3>
                <p className="text-stone-500 text-xs leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
