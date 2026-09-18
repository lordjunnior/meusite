import PageFloatingToc from "@/components/PageFloatingToc";
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Pickaxe, Zap, Cpu, ShieldCheck, ShieldAlert, Clock, Users, TrendingUp, TrendingDown, Thermometer, Server, Wifi, Factory, Scale, Landmark, FileCheck, HardDrive, Building2, Gauge } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/lib/motion';
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

const NAV_ITEMS = [
  { id: 'intro', label: 'Mineração é Lucrativa?' },
  { id: 'impacto', label: 'Minerar ou Comprar?' },
  { id: 'pilares', label: 'Pilares da Rentabilidade' },
  { id: 'preco', label: 'Preço e Timing' },
  { id: 'estrategia', label: 'Bull vs Bear' },
  { id: 'pools', label: 'Pools de Mineração' },
  { id: 'legal', label: 'Legalidade e Impostos' },
  { id: 'conclusao', label: 'Comece a Operar' },
];


const TOC_ITEMS = [
  { id: "intro", label: "Introdução" },
  { id: "impacto", label: "Impacto" },
  { id: "pilares", label: "Rentabilidade" },
  { id: "preco", label: "Preço e Timing" },
  { id: "estrategia", label: "Estratégia" },
  { id: "pools", label: "Pools" },
  { id: "legal", label: "Legalidade" },
  { id: "conclusao", label: "Conclusão" },
];

export default function MineracaoBitcoin() {
  const [activeSection, setActiveSection] = useState('intro');
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [progressVal, setProgressVal] = useState(0);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => scrollProgress.on('change', (v) => setProgressVal(Math.round(v))), [scrollProgress]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => ({ id: item.id, el: document.getElementById(item.id) }));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el && sections[i].el!.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <link rel="canonical" href={canonicalUrl('/mineracao')} />
        <meta property="og:url" content={canonicalUrl('/mineracao')} />
        <title>Mineração de Bitcoin — Guia Completo de Rentabilidade | Lord Junnior</title>
        <meta name="description" content="Mineração de Bitcoin é lucrativa? Análise completa: hardware ASIC, custo de eletricidade, pools, halving, estratégias bull vs bear e legalidade." />
        <meta name="keywords" content="mineração bitcoin, mining bitcoin, ASIC, pool mineração, halving, proof of work, rentabilidade mineração" />
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="orange" />

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-amber-600/30 overflow-x-hidden">
        {/* Ambient VFX */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-amber-500/[0.03] blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-400/[0.02] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
        </div>

        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border/30">
          <motion.div className="h-full bg-amber-500 origin-left" style={{ scaleX: scrollYProgress }} />
        </div>

        {/* Floating TOC (Desktop) */}
        <nav className="hidden xl:flex 2xl:hidden fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-1">
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-lg p-3 space-y-1 shadow-2xl">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
              <Pickaxe className="text-amber-500" size={14} />
              <span className="text-amber-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">{progressVal}%</span>
            </div>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2 rounded text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono ${
                  activeSection === item.id
                    ? 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-500'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30 border-l-2 border-transparent'
                }`}
              >{item.label}</button>
            ))}
          </div>
        </nav>

        {/* Back Button */}
        <Link to="/protocolo-inicial" className="fixed top-14 left-4 lg:left-[276px] z-50 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 backdrop-blur-xl border border-border/50 text-muted-foreground hover:text-foreground text-xs font-medium transition-all">
          <ArrowLeft size={14} /> Protocolo Inicial
        </Link>

        {/* Mobile Progress */}
        <div className="xl:hidden fixed bottom-4 right-4 z-50">
          <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg">
            <Pickaxe className="text-amber-500" size={12} />
            <span className="text-amber-400 font-mono text-[10px] font-bold">{progressVal}%</span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 pb-32">
          <div className="max-w-5xl mx-auto px-6 pt-24 lg:pt-28">

            {/* === INTRO HERO === */}
            <section id="intro" className="mb-28 scroll-mt-24">
              <motion.header style={{ y: heroY }} className="relative overflow-hidden rounded-xl p-10 md:p-16 mb-12 bg-gradient-to-br from-card via-card to-amber-950/20 border border-border/50">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-[30%] left-[30%] w-[300px] h-[300px] rounded-full bg-amber-500/20 blur-[80px]" />
                  <div className="absolute bottom-[20%] right-[20%] w-[200px] h-[200px] rounded-full bg-amber-400/10 blur-[60px]" />
                </div>
                <div className="absolute top-4 left-4 md:top-8 md:left-8 text-amber-500/[0.04] pointer-events-none select-none font-black text-[200px] md:text-[300px] leading-none" style={{ fontFamily: 'Arial' }}>₿</div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
                  <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Leitura de 10 minutos</span>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-6">
                    Mineração de<br />
                    <span className="text-primary italic">Bitcoin</span>
                  </h1>
                  <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl font-medium mb-4">
                    A mineração de Bitcoin é lucrativa?
                  </p>
                  <p className="text-muted-foreground/80 text-sm md:text-base leading-relaxed max-w-3xl">
                    Seja você um iniciante no Bitcoin ou um veterano de vários ciclos, a perspectiva de ganhar o recurso mais escasso da internet por meio da mineração é certamente empolgante. Este artigo analisa os fatores associados à mineração lucrativa.
                  </p>
                </motion.div>
              </motion.header>

              {/* Key Takeaways */}
              <AnimSection>
                <div className="bg-card/60 border border-amber-500/15 rounded-xl p-8 md:p-10">
                  <h3 className="text-amber-500 font-black uppercase text-[10px] tracking-[0.3em] font-mono mb-6">Principais Conclusões</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'A mineração evoluiu para uma atividade que exige grande investimento de capital e para uma indústria competitiva.',
                      'A rentabilidade depende do modelo de hardware, preço da eletricidade, preço do bitcoin e número de mineradores na rede.',
                      'Os custos de eletricidade residencial são normalmente muito altos para permitir mineração lucrativa.',
                      'Existem diferenças marcantes entre minerar bitcoin em um mercado de alta e em um mercado de baixa.',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-amber-500 font-black text-xs mt-0.5 shrink-0">⬡</span>
                        <p className="text-muted-foreground text-xs leading-relaxed font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimSection>
            </section>

            {/* === MINERAR OU COMPRAR === */}
            <AnimSection>
              <section id="impacto" className="mb-28 scroll-mt-24">
                <div className="relative overflow-hidden rounded-xl p-10 md:p-14 mb-10 bg-gradient-to-br from-card via-card to-amber-950/15 border border-border/50">
                  <div className="absolute top-4 left-4 md:top-8 md:left-8 text-amber-500/[0.04] pointer-events-none select-none font-black text-[160px] md:text-[240px] leading-none" style={{ fontFamily: 'Arial' }}>₿</div>
                  <div className="relative z-10">
                    <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-[9px] mb-4 block font-mono">A Escolha da Privacidade</span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.85] uppercase mb-6">
                      Minerar <span className="text-muted-foreground italic lowercase text-2xl md:text-3xl">ou</span>{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 italic">Comprar?</span>
                    </h2>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-4xl">
                    Existem diversos motivos por trás da decisão de minerar bitcoins. Alguns usuários preferem a <strong className="text-foreground">privacidade adicional</strong> proporcionada pela mineração de bitcoins virgens em vez de comprar em corretoras que exigem KYC. No entanto, a principal motivação é, obviamente, a expectativa de lucro.
                  </p>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed max-w-4xl">
                    De modo geral, a mineração é a opção mais lucrativa em comparação com a compra de bitcoin à vista para aqueles com <strong className="text-foreground">horizontes de investimento de longo prazo</strong>. A receita da mineração serve como uma forma alternativa de investir em bitcoin, semelhante a uma estratégia de <strong className="text-foreground">custo médio ponderado (DCA)</strong>.
                  </p>
                </div>

                {/* 3 Pilares visuais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: ShieldCheck, color: 'green', title: 'Bitcoins Virgens', desc: 'Minerar é a única forma de obter Bitcoins sem histórico e sem entregar dados (KYC) para corretoras que vigiam cada movimento seu.' },
                    { icon: Clock, color: 'amber', title: 'DCA Automático', desc: 'A receita funciona como um dollar-cost averaging natural, suavizando a volatilidade com depósitos regulares e automáticos.' },
                    { icon: Wifi, color: 'cyan', title: 'Serviço à Rede', desc: 'Minerar é um ato de defesa. Sem mineradores, a rede e a liberdade que ela proporciona deixariam de existir.' },
                  ].map((item) => (
                    <div key={item.title} className={`rounded-xl p-8 group transition-all hover:-translate-y-1 bg-${item.color}-500/5 border border-${item.color}-500/15`}>
                      <item.icon className={`text-${item.color}-400 mb-4 group-hover:scale-110 transition-transform`} size={24} />
                      <h4 className={`text-${item.color}-400 font-black uppercase text-sm mb-3 tracking-tighter italic`}>{item.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </AnimSection>

            {/* === PILARES DA RENTABILIDADE === */}
            <AnimSection>
              <section id="pilares" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-amber-500 mb-4">
                  <Cpu size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O que Influencia a Rentabilidade?</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-4xl mb-10">
                  A rentabilidade da mineração depende de múltiplos fatores que se interconectam. Entender cada um deles é essencial antes de investir.
                </p>

                <div className="space-y-4">
                  {/* Hardware ASIC */}
                  <div className="bg-card/60 border border-border/50 rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start group hover:border-amber-500/20 transition-all">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Cpu className="text-amber-500" size={20} />
                    </div>
                    <div>
                      <h4 className="text-foreground font-black uppercase text-sm mb-2 tracking-tighter italic font-mono">Preço ASIC (Hardware)</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Os computadores especializados para minerar bitcoin, chamados <strong className="text-foreground">ASICs</strong>, variam em preço e eficiência. Os modelos mais recentes oferecem maior eficiência mas têm um custo mais elevado. É uma <strong className="text-foreground">corrida tecnológica constante</strong>.</p>
                      <div className="flex gap-6 mt-4">
                        {[{ label: 'Eficiência', value: 'J/TH' }, { label: 'Hash Rate', value: 'TH/s' }, { label: 'ROI', value: 'Meses' }].map((m) => (
                          <div key={m.label}><p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest font-mono">{m.label}</p><p className="text-lg font-black italic text-amber-400">{m.value}</p></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Eletricidade */}
                  <div className="bg-card/60 border border-border/50 rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start group hover:border-green-500/20 transition-all">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Zap className="text-green-500" size={20} />
                    </div>
                    <div>
                      <h4 className="text-foreground font-black uppercase text-sm mb-2 tracking-tighter italic font-mono">Custo da Eletricidade</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">A capacidade de obter eletricidade barata é frequentemente o <strong className="text-foreground">fator mais importante</strong> para a lucratividade. Os preços de energia no varejo tornam praticamente <strong className="text-foreground">inviável minerar em casa</strong>.</p>
                      <div className="mt-4 p-4 bg-destructive/5 border border-destructive/15 rounded-lg">
                        <p className="text-destructive text-xs font-bold font-mono uppercase"><ShieldAlert className="inline mr-2" size={12} />Regra: Se paga tarifa residencial, NÃO minere.</p>
                      </div>
                    </div>
                  </div>

                  {/* Instalações */}
                  <div className="bg-card/60 border border-border/50 rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start group hover:border-purple-500/20 transition-all">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Building2 className="text-purple-500" size={20} />
                    </div>
                    <div>
                      <h4 className="text-foreground font-black uppercase text-sm mb-2 tracking-tighter italic font-mono">Custo das Instalações</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Com a mineração doméstica inviável, as plataformas exigem <strong className="text-foreground">instalações dedicadas</strong>. Além do aluguel, há custos com:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        {['Painéis acústicos', 'Sistema de refrigeração', 'Seguro patrimonial', 'Segurança física'].map((item) => (
                          <div key={item} className="bg-purple-500/5 border border-purple-500/10 rounded-lg px-3 py-2 text-center">
                            <p className="text-purple-300 text-[10px] font-bold font-mono uppercase">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Manutenção */}
                  <div className="bg-card/60 border border-border/50 rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start group hover:border-cyan-500/20 transition-all">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Thermometer className="text-cyan-500" size={20} />
                    </div>
                    <div>
                      <h4 className="text-foreground font-black uppercase text-sm mb-2 tracking-tighter italic font-mono">Manutenção e Tempo de Inatividade</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">São máquinas complexas que exigem <strong className="text-foreground">condições específicas de temperatura</strong>. O maior custo é o custo de oportunidade do tempo offline.</p>
                      <div className="flex gap-6 mt-4">
                        {[{ label: 'Meta Uptime', value: '99.5%' }, { label: 'Temp. Ideal', value: '≤35°C' }].map((m) => (
                          <div key={m.label}><p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest font-mono">{m.label}</p><p className="text-lg font-black italic text-cyan-400">{m.value}</p></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dificuldade e Halving */}
                  <div className="bg-card/60 border border-border/50 rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start group hover:border-amber-500/20 transition-all">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Gauge className="text-amber-500" size={20} />
                    </div>
                    <div>
                      <h4 className="text-foreground font-black uppercase text-sm mb-2 tracking-tighter italic font-mono">Ajuste de Dificuldade e Halving</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">Um algoritmo atualiza a dificuldade a cada <strong className="text-foreground">2.016 blocos</strong> (~2 semanas). Os ciclos de <strong className="text-foreground">halving</strong> (~4 anos) reduzem pela metade a recompensa por bloco.</p>
                      <div className="flex gap-6 mt-4">
                        {[{ label: 'Blocos', value: '~10min' }, { label: 'Ajuste', value: '2.016' }, { label: 'Halving', value: '210K' }].map((m) => (
                          <div key={m.label}><p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest font-mono">{m.label}</p><p className="text-xl font-black italic text-foreground">{m.value}</p></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === PREÇO E TIMING === */}
            <AnimSection>
              <section id="preco" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-amber-500 mb-4">
                  <TrendingUp size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Preço Determina o Timing</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-4xl mb-10">
                  O preço do bitcoin tem impacto significativo na rentabilidade. O <strong className="text-foreground">preço dos equipamentos acompanha o preço do bitcoin</strong>, porém oscila consideravelmente menos.
                </p>

                <div className="bg-card/60 border border-amber-500/10 rounded-xl p-8 md:p-10">
                  <span className="text-amber-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Correlação Preço ↔ Receita de Mineração</span>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {[
                      { label: 'BTC Sobe', arrow: '↑', desc: 'Hardware mais caro', color: 'amber' },
                      { label: 'Receita Fiat', arrow: '↑↑', desc: 'Receitas disparam', color: 'green' },
                      { label: 'Competição', arrow: '↑↑↑', desc: 'Mais mineradores entram', color: 'red' },
                    ].map((item) => (
                      <div key={item.label} className={`text-center p-4 bg-${item.color}-500/5 border border-${item.color}-500/10 rounded-lg`}>
                        <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest font-mono mb-2">{item.label}</p>
                        <p className={`text-${item.color}-400 font-black text-2xl`}>{item.arrow}</p>
                        <p className="text-muted-foreground text-[10px] mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BULL vs BEAR === */}
            <AnimSection>
              <section id="estrategia" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-amber-500 mb-10">
                  <Scale size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Estratégia: Bull vs Bear</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bear */}
                  <div className="rounded-xl p-10 relative overflow-hidden group bg-blue-500/5 border border-blue-500/15">
                    <div className="absolute top-4 right-4 text-blue-500/[0.06] font-black text-[120px] leading-none select-none pointer-events-none">❄</div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <TrendingDown className="text-blue-400" size={20} />
                        <h3 className="text-blue-400 font-black uppercase text-sm tracking-wider font-mono italic">Bear Market (Gelo)</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">O principal objetivo é a <strong className="text-foreground">sobrevivência</strong>. A última coisa que um minerador deseja é desligar suas máquinas, perdendo bitcoins potencialmente minerados.</p>
                      <div className="space-y-3 mt-6">
                        {['Mineradores desistem → dificuldade cai → mais BTC por máquina', 'Preços de hardware despencam — oportunidade de expandir', 'Acumule sats baratos. Paciência é a arma soberana.'].map((tip, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-blue-400 font-black text-xs mt-0.5">→</span>
                            <p className="text-muted-foreground text-xs leading-relaxed font-medium">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bull */}
                  <div className="rounded-xl p-10 relative overflow-hidden group bg-orange-500/5 border border-orange-500/15">
                    <div className="absolute top-4 right-4 text-orange-500/[0.06] font-black text-[120px] leading-none select-none pointer-events-none">🔥</div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="text-orange-400" size={20} />
                        <h3 className="text-orange-400 font-black uppercase text-sm tracking-wider font-mono italic">Bull Market (Fogo)</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">Período empolgante e próspero, mas com desafios. O preço sobe, e o <strong className="text-foreground">número de equipamentos conectados à rede também</strong>.</p>
                      <div className="space-y-3 mt-6">
                        {['Valor do BTC minerado multiplica em fiat', 'Amortize o hardware e fortaleça o caixa', 'Cuidado: expandir no topo pode ser armadilha'].map((tip, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-orange-400 font-black text-xs mt-0.5">→</span>
                            <p className="text-muted-foreground text-xs leading-relaxed font-medium">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === POOLS DE MINERAÇÃO === */}
            <AnimSection>
              <section id="pools" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-amber-500 mb-4">
                  <Users size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Pools de Mineração</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-4xl mb-10">
                  Os pools existem para equilibrar os custos constantes e as recompensas inconsistentes da mineração individual. Minerar sozinho com pouco hash rate é semelhante a <strong className="text-foreground">jogar na loteria</strong>.
                </p>

                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-8">
                  {/* Pool visualization */}
                  <div className="flex items-center justify-center gap-4 py-8">
                    <div className="flex flex-wrap gap-3 items-center justify-center max-w-xs">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-secondary border border-border/50 flex items-center justify-center animate-pulse" style={{ animationDelay: `${i * 0.25}s` }}>
                          <Server className="text-muted-foreground" size={12} />
                        </div>
                      ))}
                    </div>
                    <div className="text-muted-foreground font-mono text-xs">→→→</div>
                    <div className="w-16 h-16 rounded-full bg-amber-500/15 border-2 border-amber-500/40 flex items-center justify-center animate-pulse">
                      <Pickaxe className="text-amber-500" size={24} />
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">A escolha prudente para mineradores de pequena escala é participar de um pool, <strong className="text-foreground">agregar seu poder de hash</strong> e usar o poder coletivo para minerar blocos com mais frequência.</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {[
                      { title: 'Taxa do Pool', desc: 'Pode chegar a 4%. É o fator que mais impacta diretamente a lucratividade.' },
                      { title: 'Tamanho do Pool', desc: 'Quanto maior o hash rate total, mais frequentemente o pool descobre um bloco = retornos mais consistentes.' },
                      { title: 'Reputação e Serviços', desc: 'Monitoramento, app móvel, API e personalização de pagamentos são diferenciais importantes.' },
                    ].map((item) => (
                      <div key={item.title} className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-6">
                        <h4 className="text-amber-400 font-black uppercase text-xs tracking-wider font-mono mb-2">{item.title}</h4>
                        <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === LEGALIDADE E IMPOSTOS === */}
            <AnimSection>
              <section id="legal" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-amber-500 mb-10">
                  <Landmark size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Legalidade e Impostos</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card/60 border border-destructive/10 rounded-xl p-8 md:p-10 group hover:border-destructive/30 transition-all">
                    <Landmark className="text-destructive mb-4" size={24} />
                    <h3 className="text-foreground font-black uppercase text-sm tracking-wider font-mono italic mb-3">Legalidade da Mineração</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">Independentemente da lucratividade, é fundamental verificar se a mineração é <strong className="text-foreground">legal na sua jurisdição</strong>. A rentabilidade pode ser totalmente anulada caso os equipamentos sejam confiscados.</p>
                  </div>
                  <div className="bg-card/60 border border-amber-500/10 rounded-xl p-8 md:p-10 group hover:border-amber-500/30 transition-all">
                    <FileCheck className="text-amber-500 mb-4" size={24} />
                    <h3 className="text-foreground font-black uppercase text-sm tracking-wider font-mono italic mb-3">Imposto sobre Mineração</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">Existem <strong className="text-foreground">dois eventos tributáveis</strong>: quando o Bitcoin é minerado e quando é vendido. As implicações fiscais da venda são calculadas usando o preço à vista no momento da mineração como base de custo.</p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {['Evento 1: Renda na Mineração', 'Evento 2: Ganho na Venda'].map((item) => (
                        <div key={item} className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3 text-center">
                          <p className="text-amber-300 text-[10px] font-bold font-mono uppercase">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === CONCLUSÃO === */}
            <AnimSection>
              <section id="conclusao" className="mb-16 scroll-mt-24">
                <div className="bg-card/60 border border-amber-500/20 rounded-xl p-10 md:p-14 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.5),transparent_60%)]" />
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground">
                      Pronto para <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Começar</span>?
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
                      A mineração não é para todos. Exige capital, conhecimento técnico e paciência. Mas para quem tem os recursos e a disciplina, é uma das formas mais soberanas de acumular Bitcoin — sem intermediários, sem KYC, sem permissão.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                      {[
                        { title: 'Pesquise', desc: 'Estude o mercado de hardware, eletricidade e regulação antes de investir.' },
                        { title: 'Calcule', desc: 'Use calculadoras de mineração para projetar rentabilidade em diferentes cenários.' },
                        { title: 'Execute', desc: 'Comece pequeno, aprenda na prática e escale quando tiver confiança.' },
                      ].map((item) => (
                        <div key={item.title} className="space-y-2">
                          <p className="text-amber-400 font-black uppercase text-sm font-mono">{item.title}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
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
