import PageFloatingToc from "@/components/PageFloatingToc";
import { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send, Wallet, FileText, Coins, Cpu, Clock, Shield, AlertTriangle, Zap } from 'lucide-react';
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
  { id: 'bloco-01', label: '01: O que é uma Transação?' },
  { id: 'bloco-02', label: '02: Como Funciona' },
  { id: 'bloco-03', label: '03: Anatomia da Transação' },
  { id: 'bloco-04', label: '04: Taxas e Prioridade' },
  { id: 'bloco-05', label: '05: Da Mempool ao Bloco' },
  { id: 'bloco-06', label: '06: Regras de Ouro' },
];


const TOC_ITEMS = [
  { id: "bloco-01", label: "O Que É uma Transação" },
  { id: "bloco-02", label: "Como Funciona" },
  { id: "bloco-03", label: "Anatomia" },
  { id: "bloco-04", label: "Taxas e Prioridade" },
  { id: "bloco-05", label: "Mempool ao Bloco" },
  { id: "bloco-06", label: "Regras de Ouro" },
];

export default function TransacoesBitcoin() {
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
        <link rel="canonical" href={canonicalUrl('/transacoes')} />
        <meta property="og:url" content={canonicalUrl('/transacoes')} />
        <title>Como Funcionam as Transações Bitcoin — Mecânica de Valor | Lord Junnior</title>
        <meta name="description" content="Entenda transações Bitcoin: inputs, outputs, taxas, mempool, confirmações e regras de ouro para transferir valor sem intermediários." />
        <meta name="keywords" content="transação bitcoin, UTXO, mempool, taxa bitcoin, confirmação blockchain, inputs outputs" />
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="orange" />

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-cyan-600/30 overflow-x-hidden">
        {/* Ambient VFX */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.03] blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-400/[0.02] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
        </div>

        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border/30">
          <motion.div className="h-full bg-cyan-500 origin-left" style={{ scaleX: scrollYProgress }} />
        </div>

        {/* Floating TOC (Desktop) */}
        <nav className="hidden xl:flex 2xl:hidden fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-1">
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-lg p-3 space-y-1 shadow-2xl">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
              <Send className="text-cyan-500" size={14} />
              <span className="text-cyan-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">{progress}%</span>
            </div>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2 rounded text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono ${
                  activeSection === item.id
                    ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500'
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
            <Send className="text-cyan-500" size={12} />
            <span className="text-cyan-400 font-mono text-[10px] font-bold">{progress}%</span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 pb-32">
          <div className="max-w-5xl mx-auto px-6 pt-24 lg:pt-28">

            {/* HERO */}
            <motion.header style={{ y: heroY }} className="mb-28 relative overflow-hidden rounded-xl p-10 md:p-16 bg-gradient-to-br from-card via-card to-cyan-950/20 border border-border/50">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full bg-cyan-500/20 blur-[80px]" />
                <div className="absolute bottom-[20%] left-[20%] w-[200px] h-[200px] rounded-full bg-cyan-400/10 blur-[60px]" />
              </div>
              <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-[0.04] pointer-events-none select-none">
                <Send size={240} strokeWidth={0.5} />
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }} className="relative z-10">
                <span className="text-cyan-500 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Mecânica de Transferência de Valor</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8">
                  Como Funcionam<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 italic">As Transações?</span>
                </h1>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  Uma transação é uma transferência de valor em Bitcoin na blockchain. Transações são irreversíveis depois de adicionadas à blockchain. Sem intermediários, sem permissão.
                </p>
              </motion.div>
            </motion.header>

            {/* === BLOCO 01 === */}
            <AnimSection>
              <section id="bloco-01" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-cyan-500 mb-10">
                  <FileText size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">01: O que é uma Transação Bitcoin?</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-6 text-muted-foreground text-base leading-relaxed">
                  <p>Uma transação é uma <strong className="text-foreground">transferência de valor Bitcoin na blockchain</strong>. Em termos simples, é quando o participante A envia uma quantidade designada de Bitcoin que possui para o participante B.</p>
                  <p>Transações são criadas através de <strong className="text-cyan-400">carteiras (wallets)</strong>: seja no celular, desktop ou hardware especializado. Sem banco, sem intermediário, sem autorização de terceiros.</p>
                  <div className="h-[2px] my-8 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { icon: Wallet, label: 'Origem', value: 'Carteira do Remetente' },
                      { icon: Send, label: 'Transmissão', value: 'Rede P2P Global' },
                      { icon: Shield, label: 'Confirmação', value: 'Bloco na Blockchain' },
                    ].map((item) => (
                      <div key={item.label} className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-6 text-center hover:-translate-y-1 transition-transform duration-300">
                        <item.icon className="text-cyan-500 mx-auto mb-3" size={24} />
                        <p className="text-[8px] text-cyan-500 uppercase font-black tracking-widest font-mono mb-2">{item.label}</p>
                        <p className="text-foreground font-black text-sm italic">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 02 === */}
            <AnimSection>
              <section id="bloco-02" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-cyan-500 mb-10">
                  <Cpu size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">02: Como Funciona por Dentro</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-6 text-muted-foreground text-base leading-relaxed">
                  <p>Para o usuário, enviar Bitcoin é tão simples quanto inserir um <strong className="text-foreground">valor e um endereço</strong> na carteira e pressionar "enviar". Mas por trás dos bastidores, a <strong className="text-cyan-400">criptografia de chave pública</strong> garante a integridade de cada transação.</p>
                  <p>Cada participante possui pares de <strong className="text-foreground">chaves públicas</strong> e <strong className="text-foreground">chaves privadas</strong> que controlam seus bitcoins.</p>
                  <div className="bg-secondary/40 p-8 border border-border/50 rounded-lg mt-6">
                    <h4 className="text-cyan-400 font-black uppercase mb-4 italic text-xs tracking-widest font-mono">Fluxo de Assinatura:</h4>
                    <div className="space-y-4">
                      {[
                        { n: '01', t: 'Assinatura', d: 'O remetente usa sua chave privada para criar uma assinatura digital da transação.' },
                        { n: '02', t: 'Broadcast', d: 'A transação é transmitida para a rede Bitcoin peer-to-peer.' },
                        { n: '03', t: 'Verificação', d: 'Nós da rede verificam que a assinatura corresponde à chave pública do remetente.' },
                        { n: '04', t: 'Confirmação', d: 'Mineradores incluem a transação em um bloco, tornando-a irreversível.' },
                      ].map((step) => (
                        <div key={step.n} className="flex gap-4 items-start group">
                          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                            <span className="text-cyan-500 font-black text-[10px] font-mono">{step.n}</span>
                          </div>
                          <div>
                            <h5 className="text-foreground font-black uppercase text-xs tracking-tighter italic mb-0.5">{step.t}</h5>
                            <p className="text-muted-foreground text-sm leading-relaxed">{step.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mt-4">
                    <p className="text-amber-400 font-bold text-sm italic text-center">
                      ⚠ Os termos "endereço" e "chave pública" são frequentemente usados de forma intercambiável. Um endereço é uma representação da chave pública, usado por segurança e brevidade.
                    </p>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 03 === */}
            <AnimSection>
              <section id="bloco-03" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-cyan-500 mb-10">
                  <FileText size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">03: Anatomia de uma Transação</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-6">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Exemplo: <strong className="text-foreground">Alice quer enviar 0.05 BTC para Bob</strong>. Uma transação possui três componentes fundamentais:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {[
                      { icon: ArrowRight, title: 'Inputs', desc: 'O endereço de onde o Bitcoin sai. Prova de que Alice recebeu valor anteriormente e agora deseja gastá-lo.' },
                      { icon: Wallet, title: 'Outputs', desc: 'A chave pública ou endereço de Bob — o destinatário que controlará o valor após a confirmação.' },
                      { icon: Coins, title: 'Valor', desc: 'A quantidade de Bitcoin que Alice deseja enviar. A diferença entre inputs e outputs se torna a taxa do minerador.' },
                    ].map((item) => (
                      <div key={item.title} className="bg-card/60 border border-cyan-500/15 rounded-xl p-8 space-y-3 hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                          <item.icon className="text-cyan-500" size={20} />
                        </div>
                        <h3 className="text-foreground font-black uppercase text-sm tracking-tighter italic">{item.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-[2px] my-6 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-6">
                    <p className="text-cyan-400 font-bold text-sm italic text-center">
                      Uma transação pode conter múltiplos inputs e outputs. Desde que a soma dos inputs supere a dos outputs, a transação é válida.
                    </p>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 04 === */}
            <AnimSection>
              <section id="bloco-04" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-cyan-500 mb-10">
                  <Coins size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">04: Taxas e Prioridade</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card/60 border border-border/50 rounded-xl p-10 space-y-5 text-muted-foreground leading-relaxed">
                    <h3 className="text-foreground font-black uppercase text-sm tracking-wider font-mono italic">O Mercado de Taxas</h3>
                    <p>Usuários controlam a velocidade de processamento definindo a <strong className="text-foreground">taxa de comissão (fee rate)</strong>. Quanto maior a taxa, mais rápida a confirmação.</p>
                    <p>Cada bloco na blockchain comporta até <strong className="text-cyan-400">~1MB de dados</strong>. Espaço limitado = competição. Mineradores priorizam transações com maiores taxas.</p>
                  </div>
                  <div className="bg-card/60 border border-border/50 rounded-xl p-10 space-y-5 relative overflow-hidden">
                    <h3 className="text-foreground font-black uppercase text-sm tracking-wider font-mono italic">Incentivo dos Mineradores</h3>
                    <p className="text-muted-foreground leading-relaxed">Mineradores recebem duas recompensas: o <strong className="text-foreground">subsídio de bloco</strong> (bitcoins recém-criados) e as <strong className="text-cyan-400">taxas de transação</strong>.</p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center">
                        <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest font-mono">Taxa Baixa</p>
                        <Clock className="text-muted-foreground mx-auto my-2" size={24} />
                        <p className="text-muted-foreground text-xs font-bold">Horas / Dias</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-cyan-500 uppercase font-black tracking-widest font-mono">Taxa Alta</p>
                        <Zap className="text-cyan-400 mx-auto my-2" size={24} />
                        <p className="text-cyan-400 text-xs font-bold">~10 Minutos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 05 === */}
            <AnimSection>
              <section id="bloco-05" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-cyan-500 mb-10">
                  <Cpu size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">05: Da Mempool ao Bloco</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-6 text-muted-foreground text-base leading-relaxed">
                  <p>Após a assinatura, a transação é transmitida para a rede. Ela entra na <strong className="text-foreground">Mempool</strong> — a "sala de espera" onde todas as transações aguardam confirmação.</p>
                  <div className="bg-secondary/40 p-8 border border-border/50 rounded-lg mt-6">
                    <h4 className="text-foreground font-black uppercase mb-6 italic text-xs tracking-widest font-mono">Ciclo de Vida de uma TX:</h4>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      {[
                        { label: 'Criação', desc: 'Carteira cria e assina', icon: Wallet },
                        { label: 'Broadcast', desc: 'Transmitida para nós', icon: Send },
                        { label: 'Mempool', desc: 'Aguarda na fila', icon: Clock },
                        { label: 'Mineração', desc: 'Incluída em bloco', icon: Cpu },
                        { label: 'Confirmada', desc: 'Irreversível', icon: Shield },
                      ].map((step, i) => (
                        <Fragment key={i}>
                          <div className="text-center flex-1">
                            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                              <step.icon className="text-cyan-500" size={18} />
                            </div>
                            <p className="text-foreground font-black uppercase text-[10px] tracking-widest font-mono">{step.label}</p>
                            <p className="text-[9px] text-muted-foreground mt-1 font-mono">{step.desc}</p>
                          </div>
                          {i < 4 && <ArrowRight className="text-cyan-500/30 hidden md:block flex-shrink-0" size={20} />}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  <p className="mt-6">Quando um minerador resolve o próximo bloco, as transações nele se tornam <strong className="text-cyan-400">imutáveis</strong>. Cada confirmação adicional (bloco subsequente) torna a reversão exponencialmente mais cara.</p>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 06 === */}
            <AnimSection>
              <section id="bloco-06" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-cyan-500 mb-10">
                  <AlertTriangle size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">06: Regras de Ouro</h2>
                </div>
                <div className="border border-cyan-500/20 bg-card/60 p-10 md:p-12 relative overflow-hidden rounded-xl">
                  <Send className="absolute top-0 right-0 text-cyan-500/[0.03] -mr-14 -mt-14" size={280} />
                  <div className="relative z-10">
                    <h3 className="text-sm md:text-base font-black uppercase tracking-wider mb-6 flex items-center gap-3 font-mono">
                      <Shield className="text-cyan-500" size={20} />
                      <span className="text-muted-foreground">Código do Soberano:</span>
                      <span className="text-cyan-400 italic">Transações</span>
                    </h3>
                    <div className="space-y-4">
                      {[
                        { rule: 'Transações são irreversíveis', detail: 'Não existe "estorno" no Bitcoin. Verifique o endereço antes de enviar.' },
                        { rule: 'Quem controla as chaves, controla o dinheiro', detail: 'Sua chave privada = sua assinatura. Sem ela, sem acesso.' },
                        { rule: 'Taxas controlam velocidade', detail: 'Urgência? Aumente a taxa. Sem pressa? Taxa mínima basta.' },
                        { rule: 'UTXOs, não saldos', detail: 'Bitcoin não usa "contas". Usa fragmentos de transações anteriores (UTXOs) como inputs.' },
                        { rule: 'Cada confirmação aumenta a segurança', detail: '1 confirmação = incluído. 6 confirmações = praticamente irreversível.' },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-start group">
                          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                            <span className="text-cyan-500 font-black text-[9px] font-mono">{String(i+1).padStart(2, '0')}</span>
                          </div>
                          <div>
                            <p className="text-foreground font-black uppercase text-sm tracking-tighter italic">{item.rule}</p>
                            <p className="text-muted-foreground text-xs mt-0.5">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* KEY TAKEAWAYS */}
            <AnimSection>
              <div className="bg-card/60 border border-cyan-500/20 rounded-xl p-10 mb-28">
                <h3 className="text-cyan-500 font-black uppercase text-xs tracking-[0.3em] font-mono mb-6">Conclusões Operacionais</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start text-muted-foreground text-sm leading-relaxed">
                    <ArrowRight className="text-cyan-500 mt-0.5 flex-shrink-0" size={14} />
                    <span>Uma transação Bitcoin é uma transferência de bitcoin de um endereço para outro. A transação válida deve ser <strong className="text-foreground">assinada pelo remetente</strong>.</span>
                  </li>
                  <li className="flex gap-3 items-start text-muted-foreground text-sm leading-relaxed">
                    <ArrowRight className="text-cyan-500 mt-0.5 flex-shrink-0" size={14} />
                    <span>Bitcoin não possui contas. Fragmentos de Bitcoin de tamanhos arbitrários são associados a endereços — são os <strong className="text-foreground">UTXOs (Unspent Transaction Outputs)</strong>.</span>
                  </li>
                  <li className="flex gap-3 items-start text-muted-foreground text-sm leading-relaxed">
                    <ArrowRight className="text-cyan-500 mt-0.5 flex-shrink-0" size={14} />
                    <span>Todas as transações são publicadas na <strong className="text-foreground">mempool</strong> como "pendentes". Quando um minerador as adiciona a um bloco, são consideradas <strong className="text-cyan-400">confirmadas</strong>.</span>
                  </li>
                </ul>
              </div>
            </AnimSection>

            {/* VOLTAR */}
            <AnimSection>
              <div className="border border-border/50 p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-32 rounded-xl bg-card/40">
                <div className="text-center md:text-left">
                  <h3 className="font-black uppercase tracking-[0.4em] text-xs mb-1 font-mono">Protocolo Inicial</h3>
                  <p className="text-muted-foreground font-bold uppercase text-xs">Voltar ao índice de formação.</p>
                </div>
                <Link to="/protocolo-inicial" className="bg-foreground text-background px-10 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 hover:text-foreground transition-all flex items-center gap-3 rounded-lg">
                  <ArrowLeft size={16} /> Retornar
                </Link>
              </div>
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
