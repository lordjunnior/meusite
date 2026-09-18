import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Shield, ShieldCheck, Lock, Key, AlertTriangle, Smartphone, Monitor, Server, Eye, EyeOff, UserX, Bug, Fingerprint, HardDrive, Cpu } from 'lucide-react';
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
  { id: 'bloco-01', label: '01: A Verdade sobre Segurança' },
  { id: 'bloco-02', label: '02: A Rede é Inquebrável' },
  { id: 'bloco-03', label: '03: O Elo Fraco É Você' },
  { id: 'bloco-04', label: '04: Vetores de Ataque' },
  { id: 'bloco-05', label: '05: Corretoras e Custódia' },
  { id: 'bloco-06', label: '06: Código de Conduta' },
];

export default function BitcoinSeguro() {
  const [activeSection, setActiveSection] = useState('bloco-01');
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [progressVal, setProgressVal] = useState(0);
  const heroRef = useRef(null);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    return scrollProgress.on('change', (v) => setProgressVal(Math.round(v)));
  }, [scrollProgress]);

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
        <link rel="canonical" href={canonicalUrl('/bitcoin-seguro')} />
        <meta property="og:url" content={canonicalUrl('/bitcoin-seguro')} />
        <title>O Bitcoin É Seguro? — Análise de Segurança Operacional | Lord Junnior</title>
        <meta name="description" content="Análise completa sobre a segurança do Bitcoin: blockchain inquebrável, vetores de ataque ao indivíduo, código de conduta e autocustódia como proteção definitiva." />
        <meta name="keywords" content="bitcoin segurança, blockchain hackeada, seed phrase, autocustódia, cold storage, engenharia social bitcoin" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-600/30 overflow-x-hidden">
        {/* Ambient VFX */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.03] blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-400/[0.02] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
        </div>

        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border/30">
          <motion.div className="h-full bg-emerald-500 origin-left" style={{ scaleX: scrollYProgress }} />
        </div>

        {/* Floating TOC (Desktop) */}
        <nav className="hidden xl:flex 2xl:hidden fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-1">
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-lg p-3 space-y-1 shadow-2xl max-w-[180px]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
              <Shield className="text-muted-foreground" size={14} />
              <span className="text-muted-foreground font-black uppercase text-[8px] tracking-[0.2em] font-mono">{progressVal}%</span>
            </div>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2 rounded text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono ${
                  activeSection === item.id
                    ? 'bg-primary/10 text-primary border-l-2 border-primary'
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
            <Shield className="text-emerald-500" size={12} />
            <span className="text-emerald-400 font-mono text-[10px] font-bold">{progressVal}%</span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 pb-32">
          <div className="max-w-5xl mx-auto px-6 pt-24 lg:pt-28">

            {/* HERO */}
            <motion.header ref={heroRef} style={{ y: heroY }} className="mb-28 relative overflow-hidden rounded-xl p-10 md:p-16 bg-gradient-to-br from-card via-card to-emerald-950/20 border border-border/50">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full bg-emerald-500/20 blur-[80px]" />
                <div className="absolute bottom-[20%] left-[20%] w-[200px] h-[200px] rounded-full bg-emerald-400/10 blur-[60px]" />
              </div>
              <div className="absolute top-4 right-4 md:top-8 md:right-8 text-emerald-500/[0.04] pointer-events-none select-none">
                <Shield size={220} strokeWidth={0.5} />
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
                <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Análise de Segurança Operacional</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8">
                  O Bitcoin<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 italic">É Seguro?</span>
                </h1>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  O banco de dados do Bitcoin, a blockchain, é praticamente imune a ataques ou corrupção. No entanto, indivíduos ainda podem perder seus bitcoins de diversas maneiras. A segurança depende de você.
                </p>
              </motion.div>
            </motion.header>

            {/* === BLOCO 01: A VERDADE === */}
            <AnimSection>
              <section id="bloco-01" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-emerald-500 mb-10">
                  <ShieldCheck size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">01: A Verdade sobre Segurança</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-6 text-muted-foreground text-base leading-relaxed">
                  <p>A rede Bitcoin é robusta contra falhas e ataques. A blockchain em si é <strong className="text-foreground">econômica e tecnicamente impermeável à corrupção</strong>.</p>
                  <p>Bilhões de dólares foram investidos em bitcoin. Se não fosse seguro, esse dinheiro teria sido roubado e o Bitcoin nunca teria se tornado um ativo de <strong className="text-emerald-400">trilhões de dólares</strong>.</p>
                  <p>A questão da segurança na blockchain do Bitcoin tem menos a ver com sua implementação técnica e muito mais a ver com <strong className="text-destructive">práticas inseguras dos usuários</strong> e concepções incorretas sobre o que o Bitcoin realmente é.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {[
                      { label: 'Blockchain', value: 'Nunca Hackeada' },
                      { label: 'Uptime', value: '99.98%' },
                      { label: 'Custo de Ataque 51%', value: 'Bilhões USD' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-6 text-center">
                        <p className="text-[8px] text-emerald-500 uppercase font-black tracking-widest font-mono mb-2">{stat.label}</p>
                        <p className="text-foreground font-black text-lg italic">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 02: A REDE É INQUEBRÁVEL === */}
            <AnimSection>
              <section id="bloco-02" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-emerald-500 mb-10">
                  <Lock size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">02: A Rede É Inquebrável</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-6 text-muted-foreground text-base leading-relaxed">
                  <p>O Bitcoin é simultaneamente um <strong className="text-foreground">banco de dados blockchain</strong> e uma <strong className="text-foreground">rede de computadores</strong> que se comunicam para construir e atualizar esse banco de dados. Com isso em mente: <strong className="text-emerald-400">a blockchain nunca foi hackeada</strong>.</p>
                  <p>Economica e logisticamente, hackear a blockchain do Bitcoin é <strong className="text-foreground">praticamente impossível</strong>. Fazê-lo custaria bilhões de dólares e exigiria níveis sem precedentes de preparação e coordenação.</p>
                  <div className="bg-secondary/40 p-8 border border-border/50 rounded-lg mt-6">
                    <h4 className="text-emerald-400 font-black uppercase mb-4 italic text-xs tracking-widest font-mono">Por que é Imune:</h4>
                    <ul className="space-y-3 text-sm font-bold">
                      <li className="flex gap-3 items-start"><Cpu className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} /><span className="text-muted-foreground">Dezenas de milhares de nós independentes verificam cada transação.</span></li>
                      <li className="flex gap-3 items-start"><HardDrive className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} /><span className="text-muted-foreground">O custo energético de um ataque de 51% é proibitivo para qualquer entidade.</span></li>
                      <li className="flex gap-3 items-start"><Fingerprint className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} /><span className="text-muted-foreground">Criptografia de nível militar protege cada bloco da cadeia.</span></li>
                    </ul>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 03: O ELO FRACO É VOCÊ === */}
            <AnimSection>
              <section id="bloco-03" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-destructive mb-10">
                  <AlertTriangle size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">03: O Elo Fraco É Você</h2>
                </div>
                <div className="bg-card/60 border border-destructive/20 rounded-xl p-10 md:p-14 space-y-6 text-muted-foreground text-base leading-relaxed">
                  <p>A forma mais comum de perder bitcoins <strong className="text-destructive">não é através de um hack</strong>, mas sim por <strong className="text-foreground">erro humano</strong>.</p>
                  <p>Quando você usa uma carteira Bitcoin, seus bitcoins não são armazenados diretamente nela. Ao invés disso, sua carteira guarda as <strong className="text-foreground">chaves privadas</strong> que controlam seus bitcoins. Qualquer pessoa que acesse suas chaves privadas pode gastar seus bitcoins. Ao mesmo tempo, se você perder o acesso às suas chaves, será incapaz de movimentar seus fundos.</p>
                  <p>Graças a padrões da indústria como as <strong className="text-foreground">Seed Phrases</strong> (frases de recuperação mnemônicas), usuários de Bitcoin podem rastrear um número virtualmente ilimitado de chaves com um único conjunto de <strong className="text-amber-400">12 a 24 palavras</strong>.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <EyeOff className="text-destructive" size={16} />
                        <h4 className="text-destructive font-black uppercase text-[10px] tracking-widest font-mono">Perda de Chaves</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">Se você perder suas chaves privadas e sua seed phrase, seus bitcoins estarão perdidos para sempre. Não existe "esqueci minha senha" no Bitcoin.</p>
                    </div>
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <UserX className="text-destructive" size={16} />
                        <h4 className="text-destructive font-black uppercase text-[10px] tracking-widest font-mono">Irreversibilidade</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">Transações Bitcoin são finais. Se você enviar para um endereço errado ou para um golpista, não existe botão de estorno. A soberania vem com responsabilidade total.</p>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 04: VETORES DE ATAQUE === */}
            <AnimSection>
              <section id="bloco-04" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-destructive mb-10">
                  <Bug size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">04: Vetores de Ataque ao Indivíduo</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Eye, title: 'Engenharia Social',
                      desc: 'Ataques de engenharia social focam em convencer a vítima a divulgar informações voluntariamente. Atacantes podem ligar, enviar e-mails ou mensagens fingindo ser funcionários da sua carteira ou corretora.',
                      tip: 'Nenhum serviço legítimo pedirá sua senha ou seed phrase.',
                      tipColor: 'destructive',
                    },
                    {
                      icon: Monitor, title: 'Malware e Hacking',
                      desc: 'Qualquer dispositivo conectado à internet pode ser hackeado. Se um computador com uma carteira Bitcoin for comprometido, o usuário pode perder seus fundos. Pirataria, sites inseguros e downloads desconhecidos são portas de entrada.',
                      tip: 'Solução: Cold Storage (armazenamento offline).',
                      tipColor: 'emerald',
                    },
                    {
                      icon: Smartphone, title: 'Phishing e Farsas',
                      desc: 'Sites e e-mails falsos que imitam sua carteira ou corretora para roubar credenciais. Links maliciosos são o vetor de ataque mais comum e mais eficaz contra usuários desatentos.',
                      tip: 'Solução: Salve sites nos favoritos. Nunca clique em links de e-mail.',
                      tipColor: 'emerald',
                    },
                  ].map((threat) => (
                    <div key={threat.title} className="bg-card/60 border border-destructive/15 rounded-xl p-8 space-y-4 hover:-translate-y-1 transition-transform duration-300">
                      <div className="w-12 h-12 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                        <threat.icon className="text-destructive" size={20} />
                      </div>
                      <h3 className="text-foreground font-black uppercase text-sm tracking-tighter italic">{threat.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{threat.desc}</p>
                      <div className={`${threat.tipColor === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-destructive/10 border-destructive/20'} border rounded-lg p-3`}>
                        <p className={`text-[10px] ${threat.tipColor === 'emerald' ? 'text-emerald-400' : 'text-destructive'} font-black uppercase font-mono`}>{threat.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 05: CORRETORAS === */}
            <AnimSection>
              <section id="bloco-05" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-emerald-500 mb-10">
                  <Server size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">05: Corretoras e Risco de Custódia</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card/60 border border-border/50 rounded-xl p-10 space-y-5 text-muted-foreground leading-relaxed">
                    <h3 className="text-foreground font-black uppercase text-sm tracking-wider font-mono italic">O Risco das Exchanges</h3>
                    <p>Corretoras são obrigadas a manter parte dos bitcoins em <strong className="text-destructive">hot wallets</strong> (conectadas à internet) para processar saques. Isso as torna alvos permanentes de hackers.</p>
                    <p>Carteiras de exchanges já foram <strong className="text-foreground">hackeadas em diversas ocasiões</strong>, expondo usuários a perdas enormes. A maioria mantém a grande maioria dos fundos em cold storage, mas o risco nunca é zero.</p>
                  </div>
                  <div className="bg-card/60 border border-border/50 rounded-xl p-10 space-y-5 text-muted-foreground leading-relaxed">
                    <h3 className="text-foreground font-black uppercase text-sm tracking-wider font-mono italic">Risco Regulatório</h3>
                    <p>Governos podem <strong className="text-destructive">fechar exchanges</strong> por diversos motivos, incluindo tentativas de banir o Bitcoin. Diversas exchanges já foram forçadas a congelar ou entregar fundos de usuários a governos locais.</p>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mt-4">
                      <h4 className="text-amber-400 font-black uppercase text-[10px] tracking-widest font-mono mb-2">A Regra de Ouro</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Quando <strong className="text-foreground">você</strong> controla suas próprias chaves, o risco de ter fundos congelados ou perdidos é eliminado. Autocustódia é soberania.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === BLOCO 06: CÓDIGO DE CONDUTA === */}
            <AnimSection>
              <section id="bloco-06" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-emerald-500 mb-10">
                  <Key size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">06: Código de Conduta — Segurança Operacional</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-border/50">
                    <h3 className="text-foreground font-black uppercase text-xs tracking-widest font-mono italic">Protocolo de Segurança Pessoal</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left p-4 text-[9px] text-muted-foreground uppercase font-black tracking-widest font-mono">Ação</th>
                          <th className="text-left p-4 text-[9px] text-muted-foreground uppercase font-black tracking-widest font-mono">Regra de Ouro</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { action: 'Seed Phrase', rule: 'NUNCA forneça a ninguém. Nem para "suporte técnico". Guarde offline em local seguro.' },
                          { action: 'Links & Sites', rule: 'Salve seus sites de confiança nos favoritos. Nunca clique em links de e-mails ou mensagens.' },
                          { action: 'Autenticação', rule: 'Use 2FA via App (Google Authenticator ou similar). NUNCA use 2FA via SMS.' },
                          { action: 'Verificação', rule: 'Verifique o endereço de destino caractere por caractere antes de confirmar qualquer transação.' },
                          { action: 'Cold Storage', rule: 'Armazene a maioria dos seus fundos offline. Separe atividades de navegação das de Bitcoin.' },
                          { action: 'Carteira', rule: 'Escolha carteiras de código aberto e de fontes confiáveis. Hardware wallets são o padrão ouro.' },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                            <td className="p-4 font-mono text-sm font-black text-emerald-400 uppercase tracking-tight">{row.action}</td>
                            <td className="p-4 text-sm text-muted-foreground leading-relaxed">{row.rule}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* CONCLUSÃO TÁTICA */}
            <AnimSection>
              <section className="mb-20">
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px]" />
                  </div>
                  <div className="relative z-10">
                    <ShieldCheck className="text-emerald-500 mx-auto mb-6" size={40} />
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight italic">
                      Conclusão:<br />Não Confie, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">Verifique</span>
                    </h2>
                    <div className="max-w-2xl mx-auto mt-8 space-y-4 text-muted-foreground text-sm leading-relaxed text-left">
                      <p className="flex gap-3 items-start">
                        <ShieldCheck className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} />
                        <span><strong className="text-foreground">A rede é segura.</strong> A blockchain nunca foi hackeada e hackear exigiria bilhões de dólares em recursos.</span>
                      </p>
                      <p className="flex gap-3 items-start">
                        <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={16} />
                        <span><strong className="text-foreground">O risco é humano.</strong> Hackers visam pessoas, não o protocolo. Engenharia social é o vetor principal.</span>
                      </p>
                      <p className="flex gap-3 items-start">
                        <Key className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} />
                        <span><strong className="text-foreground">Autocustódia é proteção.</strong> Quando as chaves são suas, nenhum governo, empresa ou hacker pode congelar ou confiscar seus fundos.</span>
                      </p>
                    </div>
                    <p className="text-muted-foreground/50 font-black text-[9px] uppercase mt-12 tracking-[0.5em] font-mono">Not your keys, not your coins.</p>
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
