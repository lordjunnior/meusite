import PageFloatingToc from "@/components/PageFloatingToc";
import { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Key, Lock, Unlock, Send, ShieldCheck, Eye, EyeOff, Fingerprint, HardDrive, Smartphone, ArrowRight, AlertTriangle } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function AnimSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

const NAV_ITEMS = [
  { id: 'bloco-01', label: '01: Chave Privada vs Pública' },
  { id: 'bloco-02', label: '02: Geração da Chave' },
  { id: 'bloco-03', label: '03: Anatomia de uma Transação' },
  { id: 'bloco-04', label: '04: Assinaturas Digitais' },
  { id: 'bloco-05', label: '05: Armazenamento de Chaves' },
  { id: 'bloco-06', label: '06: Cold vs Hot Wallet' },
];


const TOC_ITEMS = [
  { id: "bloco-01", label: "Chave Privada vs Pública" },
  { id: "bloco-02", label: "Geração de Chaves" },
  { id: "bloco-03", label: "Anatomia da Transação" },
  { id: "bloco-04", label: "Assinaturas Digitais" },
  { id: "bloco-05", label: "Armazenamento" },
  { id: "bloco-06", label: "Cold vs Hot Wallet" },
];

export default function ChavesPage() {
  const [activeSection, setActiveSection] = useState('bloco-01');
  const { scrollYProgress } = useScroll();
  const progressVal = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [progress, setProgress] = useState(0);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => progressVal.on('change', (v) => setProgress(Math.round(v))), [progressVal]);

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
        <link rel="canonical" href={canonicalUrl('/chaves')} />
        <meta property="og:url" content={canonicalUrl('/chaves')} />
        <title>Chaves Públicas & Privadas — Criptografia Bitcoin | Lord Junnior</title>
        <meta name="description" content="Entenda chaves públicas e privadas do Bitcoin: como são geradas, assinaturas digitais, cold storage vs hot wallet e as regras de autocustódia." />
        <meta name="keywords" content="chave privada bitcoin, chave pública, seed phrase, cold storage, hot wallet, assinatura digital, autocustódia" />
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="emerald" />

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-600/30 overflow-x-hidden">
        {/* Ambient VFX */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-orange-500/[0.03] blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/[0.02] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
        </div>

        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border/30">
          <motion.div className="h-full bg-orange-500 origin-left" style={{ scaleX: scrollYProgress }} />
        </div>

        {/* Floating TOC (Desktop) */}
        <nav className="hidden xl:flex 2xl:hidden fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-1">
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-lg p-3 space-y-1 shadow-2xl">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
              <Key className="text-orange-500" size={14} />
              <span className="text-orange-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">{progress}%</span>
            </div>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2 rounded text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono ${
                  activeSection === item.id
                    ? 'bg-orange-500/10 text-orange-400 border-l-2 border-orange-500'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.03] border-l-2 border-transparent'
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
            <Key className="text-orange-500" size={12} />
            <span className="text-orange-400 font-mono text-[10px] font-bold">{progress}%</span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 pb-32">
          <div className="max-w-5xl mx-auto px-6 pt-24 lg:pt-28">

            {/* HERO */}
            <motion.header style={{ y: heroY }} className="mb-28 relative overflow-hidden rounded-xl p-10 md:p-16 bg-gradient-to-br from-card via-card to-orange-950/20 border border-border/50">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full bg-orange-500/20 blur-[80px]" />
                <div className="absolute bottom-[20%] left-[20%] w-[200px] h-[200px] rounded-full bg-amber-500/10 blur-[60px]" />
              </div>
              <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-[0.04] pointer-events-none select-none">
                <Key size={240} strokeWidth={0.5} />
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }} className="relative z-10">
                <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Criptografia Fundamental</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8">
                  Chaves Públicas<br />
                  <span className="text-muted-foreground/30 italic lowercase text-3xl md:text-4xl">&</span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 italic">Privadas</span>
                </h1>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  Uma chave privada prova propriedade e assina transações para enviar bitcoins. Da chave privada se deriva a chave pública. Quem controla as chaves, controla o dinheiro.
                </p>
              </motion.div>
            </motion.header>

            {/* === BLOCO 01 === */}
            <AnimSection>
              <section id="bloco-01" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <Key size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">01: Chave Privada vs Chave Pública</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-6 text-muted-foreground text-base leading-relaxed">
                  <p>O Bitcoin utiliza <strong className="text-foreground">criptografia de chave pública</strong> para criar um par de chaves — uma chave pública e uma chave privada correspondente — que controla a propriedade dos bitcoins.</p>
                  <p>A <strong className="text-orange-400">chave pública</strong> é usada para receber bitcoin, enquanto a <strong className="text-destructive">chave privada</strong> permite assinar transações criando uma assinatura digital, gastando assim os bitcoins.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                          <Eye className="text-orange-500" size={18} />
                        </div>
                        <h4 className="text-orange-400 font-black uppercase text-xs tracking-widest font-mono">Chave Pública</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2"><ArrowRight size={12} className="text-orange-500 mt-1 flex-shrink-0" /> Usada para <strong className="text-foreground">receber</strong> bitcoin</li>
                        <li className="flex gap-2"><ArrowRight size={12} className="text-orange-500 mt-1 flex-shrink-0" /> Pode ser compartilhada livremente</li>
                        <li className="flex gap-2"><ArrowRight size={12} className="text-orange-500 mt-1 flex-shrink-0" /> Funciona como seu "endereço bancário"</li>
                        <li className="flex gap-2"><ArrowRight size={12} className="text-orange-500 mt-1 flex-shrink-0" /> Derivada da chave privada</li>
                      </ul>
                    </div>
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                          <EyeOff className="text-destructive" size={18} />
                        </div>
                        <h4 className="text-destructive font-black uppercase text-xs tracking-widest font-mono">Chave Privada</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2"><ArrowRight size={12} className="text-destructive mt-1 flex-shrink-0" /> Usada para <strong className="text-foreground">enviar</strong> bitcoin</li>
                        <li className="flex gap-2"><ArrowRight size={12} className="text-destructive mt-1 flex-shrink-0" /> NUNCA deve ser compartilhada</li>
                        <li className="flex gap-2"><ArrowRight size={12} className="text-destructive mt-1 flex-shrink-0" /> Funciona como sua "senha mestra"</li>
                        <li className="flex gap-2"><ArrowRight size={12} className="text-destructive mt-1 flex-shrink-0" /> Prova de propriedade absoluta</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 02 === */}
            <AnimSection>
              <section id="bloco-02" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <Fingerprint size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">02: Como uma Chave Privada é Gerada?</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-6 text-muted-foreground text-base leading-relaxed">
                  <p>Chaves privadas são normalmente geradas pela carteira Bitcoin do usuário. No entanto, o usuário quase nunca precisa ver ou interagir diretamente com suas chaves privadas, pois a carteira cuida de toda a <strong className="text-foreground">matemática complexa</strong> nos bastidores.</p>
                  <p>As carteiras Bitcoin utilizam um padrão da indústria para derivar chaves privadas. Primeiro, a carteira usa um <strong className="text-orange-400">gerador de números aleatórios seguro</strong> para gerar uma seed (semente), que pode ser usada para derivar tantas chaves quanto o usuário precisar.</p>
                  <div className="bg-secondary/40 p-8 border border-border/50 rounded-lg mt-6">
                    <h4 className="text-foreground font-black uppercase mb-6 italic text-xs tracking-widest font-mono">Fluxo de Derivação:</h4>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      {[
                        { label: 'Entropia', desc: 'Números aleatórios seguros', icon: Fingerprint },
                        { label: 'Seed Phrase', desc: '12-24 palavras mnemônicas', icon: Lock },
                        { label: 'Chave Privada', desc: 'Número secreto derivado', icon: EyeOff },
                        { label: 'Chave Pública', desc: 'Endereço para receber', icon: Eye },
                      ].map((step, i) => (
                        <Fragment key={i}>
                          <div className="text-center flex-1">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-3">
                              <step.icon className="text-orange-500" size={18} />
                            </div>
                            <p className="text-foreground font-black uppercase text-[10px] tracking-widest font-mono">{step.label}</p>
                            <p className="text-[9px] text-muted-foreground mt-1 font-mono">{step.desc}</p>
                          </div>
                          {i < 3 && <ArrowRight className="text-orange-500/40 hidden md:block flex-shrink-0" size={20} />}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-6 mt-4">
                    <p className="text-orange-400 font-bold text-sm italic text-center">
                      Uma única seed faz backup de todas as suas chaves. Você não precisa guardar cada chave individualmente.
                    </p>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 03 === */}
            <AnimSection>
              <section id="bloco-03" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <Send size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">03: Anatomia de uma Transação</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-6">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Exemplo: <strong className="text-foreground">Bob quer enviar 1 BTC para Alice</strong>. Veja o que acontece:
                  </p>
                  <div className="space-y-4 mt-6">
                    {[
                      { step: '01', title: 'Bob insere o endereço de Alice', desc: 'Bob abre sua carteira e insere a chave pública de Alice no campo de destinatário.' },
                      { step: '02', title: 'A carteira cria e assina a transação', desc: 'O software da carteira cria uma transação e a assina usando as chaves privadas de Bob. Se a assinatura digital corresponder aos fundos, a rede aceita a transação como válida.' },
                      { step: '03', title: 'Alice recebe os fundos', desc: 'Os fundos agora podem ser acessados por quem possuir as chaves privadas correspondentes à chave pública de Alice. Neste caso, apenas Alice.' },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-6 items-start group">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                          <span className="text-orange-500 font-black text-xs font-mono">{item.step}</span>
                        </div>
                        <div>
                          <h4 className="text-foreground font-black uppercase text-sm tracking-tighter italic mb-1">{item.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mt-6">
                    <p className="text-amber-400 font-bold text-sm italic text-center">
                      Carteiras Bitcoin não guardam bitcoins. Elas guardam as chaves que dão acesso aos bitcoins na blockchain — assim como uma conta bancária está armazenada no banco de dados do banco.
                    </p>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 04 === */}
            <AnimSection>
              <section id="bloco-04" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <Fingerprint size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">04: Assinaturas Digitais</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card/60 border border-border/50 rounded-xl p-10 space-y-5 text-muted-foreground leading-relaxed">
                    <h3 className="text-foreground font-black uppercase text-sm tracking-wider font-mono italic">Como Funcionam</h3>
                    <p>Chaves privadas são usadas para criar <strong className="text-foreground">assinaturas</strong>. Uma assinatura é um dado que só pode ser criado usando a chave privada. No entanto, a <strong className="text-orange-400">validade</strong> da assinatura pode ser verificada usando apenas a chave pública.</p>
                    <p>Isso permite que a chave privada funcione como uma <strong className="text-foreground">identidade inforjável</strong>. No contexto do Bitcoin, essa funcionalidade garante que os bitcoins só podem ser gastos pelo seu legítimo proprietário.</p>
                  </div>
                  <div className="bg-card/60 border border-orange-500/10 rounded-xl p-10 space-y-5 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-orange-500/5 blur-[80px]" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-orange-400 font-black uppercase text-sm tracking-wider font-mono italic">O Fluxo Criptográfico</h3>
                      <div className="space-y-6 mt-6">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center flex-shrink-0"><EyeOff size={14} className="text-destructive" /></div>
                          <div>
                            <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest font-mono">Passo 1</p>
                            <p className="text-foreground text-sm font-bold">Chave privada assina a mensagem</p>
                          </div>
                        </div>
                        <div className="border-l border-orange-500/20 ml-4 h-6" />
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0"><Fingerprint size={14} className="text-orange-500" /></div>
                          <div>
                            <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest font-mono">Passo 2</p>
                            <p className="text-foreground text-sm font-bold">Assinatura digital é gerada</p>
                          </div>
                        </div>
                        <div className="border-l border-orange-500/20 ml-4 h-6" />
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0"><Eye size={14} className="text-emerald-500" /></div>
                          <div>
                            <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest font-mono">Passo 3</p>
                            <p className="text-foreground text-sm font-bold">Qualquer um verifica com a chave pública</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 05 === */}
            <AnimSection>
              <section id="bloco-05" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <Lock size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">05: Armazenamento de Chaves</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-6 text-muted-foreground text-base leading-relaxed">
                  <p>Quando você possui Bitcoin, o que realmente possui é uma <strong className="text-foreground">chave privada</strong> para controlar esses fundos na blockchain. Se perder suas chaves privadas e não tiver a seed phrase da carteira, você perde acesso aos fundos <strong className="text-destructive">para sempre</strong>.</p>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-8 mt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="text-destructive mt-1 flex-shrink-0" size={18} />
                      <div>
                        <h4 className="text-destructive font-black uppercase text-xs tracking-widest font-mono mb-3">Regras Invioláveis</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2 text-muted-foreground"><ArrowRight size={12} className="text-destructive mt-1 flex-shrink-0" /> Nunca armazene seed phrases digitalmente</li>
                          <li className="flex gap-2 text-muted-foreground"><ArrowRight size={12} className="text-destructive mt-1 flex-shrink-0" /> Faça backups físicos em locais separados</li>
                          <li className="flex gap-2 text-muted-foreground"><ArrowRight size={12} className="text-destructive mt-1 flex-shrink-0" /> Use apenas carteiras de código aberto e verificadas</li>
                          <li className="flex gap-2 text-muted-foreground"><ArrowRight size={12} className="text-destructive mt-1 flex-shrink-0" /> Considere metal plates para resistência a fogo/água</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 06 === */}
            <AnimSection>
              <section id="bloco-06" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <HardDrive size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">06: Cold Storage vs Hot Wallet</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card/60 border border-blue-500/15 rounded-xl p-10 space-y-5 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <HardDrive className="text-blue-400" size={20} />
                      </div>
                      <div>
                        <h3 className="text-foreground font-black uppercase text-sm tracking-tighter italic">Cold Storage</h3>
                        <p className="text-[9px] text-blue-400 uppercase font-black tracking-widest font-mono">Armazenamento Offline</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><ArrowRight size={12} className="text-blue-400 mt-1 flex-shrink-0" /> Hardware wallets (Ledger, Trezor, Coldcard)</li>
                      <li className="flex gap-2"><ArrowRight size={12} className="text-blue-400 mt-1 flex-shrink-0" /> Máxima segurança para grandes quantias</li>
                      <li className="flex gap-2"><ArrowRight size={12} className="text-blue-400 mt-1 flex-shrink-0" /> Desconectado da internet = imune a hacks</li>
                      <li className="flex gap-2"><ArrowRight size={12} className="text-blue-400 mt-1 flex-shrink-0" /> Você é o responsável total pela segurança</li>
                    </ul>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
                      <p className="text-[10px] text-blue-400 font-black uppercase font-mono text-center">Padrão ouro para autocustódia</p>
                    </div>
                  </div>
                  <div className="bg-card/60 border border-orange-500/15 rounded-xl p-10 space-y-5 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                        <Smartphone className="text-orange-400" size={20} />
                      </div>
                      <div>
                        <h3 className="text-foreground font-black uppercase text-sm tracking-tighter italic">Hot Wallet</h3>
                        <p className="text-[9px] text-orange-400 uppercase font-black tracking-widest font-mono">Carteira Conectada</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><ArrowRight size={12} className="text-orange-400 mt-1 flex-shrink-0" /> Apps mobile ou web (Phoenix, BlueWallet)</li>
                      <li className="flex gap-2"><ArrowRight size={12} className="text-orange-400 mt-1 flex-shrink-0" /> Acesso rápido e conveniente</li>
                      <li className="flex gap-2"><ArrowRight size={12} className="text-orange-400 mt-1 flex-shrink-0" /> Ideal para pequenas quantias do dia a dia</li>
                      <li className="flex gap-2"><ArrowRight size={12} className="text-orange-400 mt-1 flex-shrink-0" /> Maior exposição a riscos digitais</li>
                    </ul>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mt-4">
                      <p className="text-[10px] text-orange-400 font-black uppercase font-mono text-center">Carteira de bolso — não o cofre</p>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* CONCLUSÃO */}
            <AnimSection>
              <section className="mb-20">
                <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[100px]" />
                  </div>
                  <div className="relative z-10">
                    <ShieldCheck className="text-orange-500 mx-auto mb-6" size={40} />
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight italic">
                      Suas Chaves,<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Seu Bitcoin</span>
                    </h2>
                    <div className="max-w-2xl mx-auto mt-8 space-y-4 text-muted-foreground text-sm leading-relaxed text-left">
                      <p className="flex gap-3 items-start">
                        <Key className="text-orange-500 mt-0.5 flex-shrink-0" size={16} />
                        <span><strong className="text-foreground">Propriedade é controle de chaves.</strong> Quem conhece a chave privada controla todos os bitcoins sob aquela chave.</span>
                      </p>
                      <p className="flex gap-3 items-start">
                        <Lock className="text-orange-500 mt-0.5 flex-shrink-0" size={16} />
                        <span><strong className="text-foreground">Chaves privadas são números gigantes.</strong> Adivinhar uma chave válida é mais difícil do que adivinhar um cartão de crédito com PIN.</span>
                      </p>
                      <p className="flex gap-3 items-start">
                        <Unlock className="text-orange-500 mt-0.5 flex-shrink-0" size={16} />
                        <span><strong className="text-foreground">Not your keys, not your coins.</strong> Sem as chaves, você depende de terceiros. Autocustódia é soberania.</span>
                      </p>
                    </div>
                    <p className="text-muted-foreground/50 font-black text-[9px] uppercase mt-12 tracking-[0.5em] font-mono">A chave é a fronteira entre liberdade e servidão.</p>
                  </div>
                </div>
              </section>
            </AnimSection>

            <footer className="text-center">
              <p className="text-muted-foreground/30 text-[10px] font-black uppercase tracking-[0.5em] font-mono">Lord Junnior © 2026</p>
            </footer>

          </div>
        </div>
      </div>
    </>
  );
}
