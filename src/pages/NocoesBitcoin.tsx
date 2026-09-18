import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldAlert, BookOpen, Coins, Lock, Globe, Zap, Eye, Users, Scale, Pickaxe, Hash, HelpCircle, AlertTriangle } from 'lucide-react';
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

const TOPICS = [
  { icon: Coins, title: 'O que é Bitcoin?', desc: 'Um dinheiro digital, descentralizado e escasso. Sem banco, sem dono, sem impressora. Ponto a ponto.', detail: 'Bitcoin é a primeira moeda digital com escassez real — apenas 21 milhões existirão. É software de código aberto que permite transferir valor pela internet sem intermediários, sem censura e sem permissão de nenhum governo.', color: 'amber' },
  { icon: Scale, title: 'Como Comprar?', desc: 'Exchanges, P2P ou recebendo por serviços. Não é preciso comprar um Bitcoin inteiro.', detail: 'Você pode comprar frações (satoshis) por qualquer valor. Use exchanges com boa reputação, nunca deixe seu Bitcoin lá — transfira para sua própria carteira. Se as chaves não são suas, o Bitcoin não é seu.', color: 'emerald' },
  { icon: ArrowRight, title: 'Enviar e Receber', desc: 'É como enviar um e-mail de valor. Endereço, valor, confirmar. Simples e irreversível.', detail: 'Para receber, compartilhe seu endereço público. Para enviar, insira o endereço do destinatário e o valor. A transação é assinada pela sua chave privada e propagada pela rede. Confirmações levam de minutos a horas.', color: 'cyan' },
  { icon: Eye, title: 'Crypto vs. Bitcoin', desc: 'Existem milhares de criptomoedas. Apenas uma é escassa, descentralizada e resiliente.', detail: 'Altcoins são tokens controlados por empresas ou fundações. Bitcoin não tem CEO, não tem marketing, não tem pré-mineração. É o único ativo digital com verdadeira descentralização e imutabilidade de supply.', color: 'rose' },
  { icon: Lock, title: 'Chaves Públicas & Privadas', desc: 'Sua chave privada é a senha mestre. Se alguém a tiver, tem seus fundos.', detail: 'Criptografia de curva elíptica gera pares de chaves. A pública é derivada da privada. Endereços são derivados da pública. Você compartilha endereços para receber; nunca compartilha a chave privada.', color: 'orange' },
  { icon: HelpCircle, title: 'Bitcoin é Pirâmide?', desc: 'Pirâmides prometem retorno. Bitcoin não promete nada. É propriedade, não investimento.', detail: 'Esquemas Ponzi dependem de novos participantes pagando os antigos. Bitcoin não tem administrador, não paga dividendos e não garante lucros. É uma tecnologia monetária aberta e auditável.', color: 'emerald' },
  { icon: Users, title: 'Quem é Satoshi Nakamoto?', desc: 'Criador anônimo. Publicou o whitepaper em 2008. Desapareceu em 2011. Nunca moveu seus BTC.', detail: 'Satoshi Nakamoto é o pseudônimo do criador do Bitcoin. Minerou os primeiros blocos e depois desapareceu. Seu anonimato é uma feature: Bitcoin não depende de líderes.', color: 'violet' },
  { icon: Globe, title: 'O que Comprar com BTC?', desc: 'Gift cards, viagens, serviços, bens digitais. A adoção cresce diariamente.', detail: 'Através da Lightning Network, pagamentos são quase instantâneos e com taxas mínimas. Empresas como Microsoft, Shopify e milhares de comerciantes aceitam Bitcoin diretamente ou via processadores de pagamento.', color: 'blue' },
  { icon: Zap, title: 'Bitcoin vs. Ouro', desc: 'Ambos são reservas de valor. Mas um é portável, divisível e verificável digitalmente.', detail: 'Ouro é físico e pesado. Bitcoin é digital e leve. Ouro pode ser confiscado. Bitcoin é inconfiscável com autocustódia. Ouro tem supply desconhecido. Bitcoin: 21 milhões, verificáveis por qualquer um.', color: 'yellow' },
  { icon: AlertTriangle, title: 'Bitcoin é Anônimo?', desc: 'Não. É pseudônimo. Todas as transações são públicas e rastreáveis na blockchain.', detail: 'Endereços não contêm seu nome, mas padrões de uso podem ser analisados. Para privacidade real, práticas como CoinJoin e uso de Lightning são necessárias. Transparência é uma feature, não um bug.', color: 'slate' },
  { icon: Hash, title: 'Moeda Fiduciária', desc: 'Dinheiro por decreto. Sem lastro real. Governos imprimem para cobrir dívidas que nunca pagam.', detail: 'Desde 1971, nenhuma moeda é lastreada em ouro. O Real perdeu 86% do poder de compra desde 1994. O dólar perdeu 97% desde 1913. Inflação não é "aumento de preços" — é roubo silencioso.', color: 'rose' },
  { icon: Pickaxe, title: 'Bitcoin Pode ser Banido?', desc: 'Impossível. Roda em satélites, rádios, mesh networks. Código é discurso protegido.', detail: 'Governos podem dificultar exchanges centralizadas, mas não podem parar a rede P2P. Bitcoin opera em frequências de rádio, satélites Blockstream e redes mesh. Banir Bitcoin é como banir a matemática.', color: 'fuchsia' },
  { icon: BookOpen, title: 'Como Escala?', desc: 'Layer 1 (blockchain) + Layer 2 (Lightning). Pagamentos instantâneos e baratos.', detail: 'A blockchain processa ~7 transações por segundo. A Lightning Network adiciona milhões de transações instantâneas com taxas de centavos. É como o TCP/IP do dinheiro: base lenta e segura, camadas rápidas em cima.', color: 'teal' },
  { icon: Lock, title: 'Bitcoin é Seguro?', desc: 'A blockchain nunca foi hackeada. O risco é humano: perder chaves, cair em golpes.', detail: 'SHA-256 e prova de trabalho tornam ataques economicamente inviáveis. A rede tem 16+ anos sem downtime. Exchanges são hackeadas, não o Bitcoin. Autocustódia elimina o risco de terceiros.', color: 'emerald' },
];

const colorClasses: Record<string, { border: string; bg: string; text: string; icon: string }> = {
  amber: { border: 'border-amber-500/20', bg: 'bg-amber-500/5', text: 'text-amber-500', icon: 'text-amber-500' },
  emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', text: 'text-emerald-500', icon: 'text-emerald-500' },
  cyan: { border: 'border-cyan-500/20', bg: 'bg-cyan-500/5', text: 'text-cyan-500', icon: 'text-cyan-500' },
  rose: { border: 'border-rose-500/20', bg: 'bg-rose-500/5', text: 'text-rose-500', icon: 'text-rose-500' },
  orange: { border: 'border-orange-500/20', bg: 'bg-orange-500/5', text: 'text-orange-500', icon: 'text-orange-500' },
  violet: { border: 'border-violet-500/20', bg: 'bg-violet-500/5', text: 'text-violet-500', icon: 'text-violet-500' },
  blue: { border: 'border-blue-500/20', bg: 'bg-blue-500/5', text: 'text-blue-500', icon: 'text-blue-500' },
  yellow: { border: 'border-yellow-500/20', bg: 'bg-yellow-500/5', text: 'text-yellow-500', icon: 'text-yellow-500' },
  slate: { border: 'border-slate-500/20', bg: 'bg-slate-500/5', text: 'text-slate-400', icon: 'text-slate-400' },
  fuchsia: { border: 'border-fuchsia-500/20', bg: 'bg-fuchsia-500/5', text: 'text-fuchsia-500', icon: 'text-fuchsia-500' },
  teal: { border: 'border-teal-500/20', bg: 'bg-teal-500/5', text: 'text-teal-500', icon: 'text-teal-500' },
};

export default function NocoesBitcoin() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const progressVal = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [progress, setProgress] = useState(0);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => progressVal.on('change', (v) => setProgress(Math.round(v))), [progressVal]);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <link rel="canonical" href={canonicalUrl('/bitcoin/nocoes-basicas')} />
        <meta property="og:url" content={canonicalUrl('/bitcoin/nocoes-basicas')} />
        <title>Noções Básicas sobre Bitcoin — Guia Completo para Iniciantes | Lord Junnior</title>
        <meta name="description" content="Tudo sobre Bitcoin para iniciantes: o que é, como comprar, chaves públicas e privadas, segurança, escalabilidade, comparação com ouro e moeda fiduciária." />
        <meta name="keywords" content="bitcoin iniciante, o que é bitcoin, como comprar bitcoin, satoshi nakamoto, chave privada, lightning network" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-amber-600/30 overflow-x-hidden">
        {/* Ambient VFX */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-amber-500/[0.03] blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-400/[0.02] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
        </div>

        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border/30">
          <motion.div className="h-full bg-amber-500 origin-left" style={{ scaleX: scrollYProgress }} />
        </div>

        {/* Back Button */}
        <Link to="/protocolo-inicial" className="fixed top-14 left-4 lg:left-[276px] z-50 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 backdrop-blur-xl border border-border/50 text-muted-foreground hover:text-foreground text-xs font-medium transition-all">
          <ArrowLeft size={14} /> Protocolo Inicial
        </Link>

        {/* Mobile Progress */}
        <div className="xl:hidden fixed bottom-4 right-4 z-50">
          <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg">
            <BookOpen className="text-amber-500" size={12} />
            <span className="text-amber-400 font-mono text-[10px] font-bold">{progress}%</span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 pb-32">
          <div className="max-w-5xl mx-auto px-6 pt-24 lg:pt-28">

            {/* HERO */}
            <motion.header style={{ y: heroY }} className="mb-28 relative overflow-hidden rounded-xl p-10 md:p-16 bg-gradient-to-br from-card via-card to-amber-950/20 border border-border/50">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full bg-amber-500/20 blur-[80px]" />
                <div className="absolute bottom-[20%] left-[20%] w-[200px] h-[200px] rounded-full bg-amber-400/10 blur-[60px]" />
              </div>
              <div className="absolute top-4 right-4 md:top-8 md:right-8 text-amber-500/[0.05] font-black text-[180px] md:text-[280px] leading-none select-none pointer-events-none" style={{ fontFamily: 'Arial' }}>₿</div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }} className="relative z-10">
                <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Aprenda o Básico sobre Bitcoin</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8">
                  Noções Básicas<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 italic">sobre Bitcoin</span>
                </h1>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  Tudo o que você precisa saber antes de comprar seu primeiro satoshi. Sem jargões desnecessários. Sem promessas de lucro. Apenas a verdade sobre o dinheiro mais resiliente já criado.
                </p>
              </motion.div>
            </motion.header>

            {/* Topics Grid */}
            <AnimSection>
              <section className="mb-28">
                <h3 className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[9px] mb-8 font-mono">Fundamentos — {TOPICS.length} Tópicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TOPICS.map((topic, i) => {
                    const c = colorClasses[topic.color] || colorClasses.amber;
                    const isOpen = expanded === i;
                    return (
                      <motion.div
                        key={i}
                        id={`topic-${i}`}
                        layout
                        className={`scroll-mt-24 rounded-xl overflow-hidden cursor-pointer group border transition-all duration-300 ${
                          isOpen ? `${c.bg} ${c.border}` : 'bg-card/60 border-border/50'
                        }`}
                        onClick={() => setExpanded(isOpen ? null : i)}
                        whileHover={{ y: -2 }}
                      >
                        <div className="p-8 relative overflow-hidden">
                          <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent ${c.bg} to-transparent`} />
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 ${c.bg} border ${c.border}`}>
                              <topic.icon size={18} className={c.icon} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className={`font-black uppercase text-sm tracking-tighter italic transition-colors duration-300 ${isOpen ? c.text : 'text-foreground'}`}>
                                  {topic.title}
                                </h4>
                                <span className={`text-[8px] font-black uppercase tracking-widest font-mono ${c.text} opacity-50`}>
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed font-medium">{topic.desc}</p>
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                                    className={`mt-5 pt-5 border-t ${c.border}`}
                                  >
                                    <p className="text-muted-foreground text-sm leading-relaxed">{topic.detail}</p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            </AnimSection>

            {/* Warning */}
            <AnimSection>
              <div className="border border-destructive/20 bg-destructive/5 rounded-xl p-10 mb-28 relative overflow-hidden">
                <ShieldAlert className="absolute top-0 right-0 text-destructive/[0.03] -mr-10 -mt-10" size={200} />
                <div className="relative z-10">
                  <p className="text-destructive font-black uppercase tracking-widest text-[9px] italic font-mono mb-4">Aviso Operacional</p>
                  <p className="text-foreground font-black text-lg md:text-xl leading-tight uppercase italic mb-4">
                    "Nenhum destes conceitos substitui a prática da autocustódia."
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Entender o básico é o primeiro passo. Mas soberania real exige ação: suas chaves, seu nó, sua responsabilidade.
                  </p>
                </div>
              </div>
            </AnimSection>

            {/* Próximo Nível */}
            <AnimSection>
              <div className="border border-border/50 p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-32 rounded-xl bg-card/40 hover:border-amber-500/30 transition-all">
                <div className="text-center md:text-left">
                  <h3 className="font-black uppercase tracking-[0.4em] text-xs mb-1 font-mono">Próximo Nível</h3>
                  <p className="text-muted-foreground font-bold uppercase text-xs">Volte ao Protocolo e avance nos módulos.</p>
                </div>
                <Link to="/protocolo-inicial" className="bg-foreground text-background px-10 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-amber-500 transition-all flex items-center gap-3 rounded-lg">
                  Protocolo Inicial <ArrowRight size={16} />
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
