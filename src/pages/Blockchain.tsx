import React, { useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Blocks, Lock, Database, Search, ShieldCheck, Network, Cpu, ChevronDown, Fingerprint, Globe, Clock, Users, Zap, BookOpen, Scale, Eye, Hash, Box, Link2, AlertTriangle, Binary, Layers, Server, Waypoints } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import blockchainBlocosImg from '@/assets/blockchain-blocos.webp';
import blockchainMineracaoImg from '@/assets/blockchain-mineracao.webp';
import blockchainLivroImg from '@/assets/blockchain-livro-razao.webp';
import blockchainRedeImg from '@/assets/blockchain-rede-global.webp';
import blockchainCadeiaImg from '@/assets/blockchain-cadeia-blocos.webp';
import blockchainImutabilidadeImg from '@/assets/blockchain-imutabilidade.webp';
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 } }),
};

function useMouseParallax(s = 15) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 }), sy = useSpring(my, { stiffness: 50, damping: 20 });
  const h = useCallback((e: MouseEvent) => { mx.set(((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * s); my.set(((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * s); }, [mx, my, s]);
  useEffect(() => { window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h); }, [h]);
  return { sx, sy };
}

/* ══ Cinematic Image Break ══ */
const CinematicBreak: React.FC<{ src: string; alt: string; caption: string; align?: 'left' | 'right' | 'center' }> = ({ src, alt, caption, align = 'center' }) => (
  <section className="relative z-10 py-8 md:py-14">
    <div className={`${align === 'center' ? 'max-w-6xl mx-auto' : 'max-w-7xl mx-auto'} px-4 md:px-10`}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: APPLE_EASE }}
        className="relative rounded-2xl overflow-hidden border border-white/[0.06] group"
      >
        <img src={src} alt={alt} className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.7) saturate(0.85)' }} loading="lazy" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.05), transparent 50%)' }} />
        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
          <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">{caption}</p>
          <div className="hidden md:block w-12 h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ══ Animated Counter ══ */
const AnimCounter: React.FC<{ value: string; label: string; delay?: number }> = ({ value, label, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: APPLE_EASE }}
      className="text-center p-5 md:p-7 rounded-xl border border-white/[0.06] hover:border-cyan-500/25 transition-all duration-500 group"
      style={{ background: 'rgba(56,189,248,0.03)' }}
    >
      <motion.p className="text-2xl md:text-4xl font-black text-cyan-400 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        initial={{ scale: 0.8 }} animate={isInView ? { scale: 1 } : {}} transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring' }}
      >{value}</motion.p>
      <p className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.25em] group-hover:text-stone-500 transition-colors">{label}</p>
    </motion.div>
  );
};

/* ══ Section Glow Divider ══ */
const SectionGlow = () => (
  <div className="relative z-10 h-px max-w-7xl mx-auto">
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.15), transparent)' }} />
  </div>
);

const BLOCOS = [
  { icon: Database, title: 'O que é um Bloco', accent: '#d4af37', desc: 'Um bloco é um pacote de dados que contém um conjunto de transações verificadas, um carimbo de tempo (timestamp), o hash do bloco anterior e um nonce (número usado uma única vez). No Bitcoin, cada bloco tem capacidade de aproximadamente 1MB, o que força a priorização econômica das transações por taxa (fee). Quando preenchido e validado, ele é permanentemente anexado à cadeia — parte do registro público imutável que nunca mais poderá ser alterado.' },
  { icon: Lock, title: 'Hashing & Criptografia SHA-256', accent: '#38bdf8', desc: 'O hash é uma função matemática que transforma qualquer entrada em uma sequência fixa de caracteres. No Bitcoin, usa-se SHA-256. A mágica: alterar um único caractere na entrada produz um hash completamente diferente. Isso significa que qualquer tentativa de adulterar uma transação passada muda o hash do bloco, que muda o hash do próximo, que invalida toda a cadeia subsequente. É matematicamente impossível fraudar sem refazer o trabalho de todos os blocos seguintes — mais rápido que toda a rede combinada.' },
  { icon: Cpu, title: 'Proof of Work (PoW)', accent: '#34d399', desc: 'Para adicionar um novo bloco, mineradores competem para resolver um quebra-cabeça criptográfico: encontrar um nonce que, combinado com os dados do bloco, produza um hash abaixo de um valor-alvo (difficulty target). Esse processo consome energia real e tempo computacional — é o custo que torna o ataque à rede economicamente inviável. O primeiro minerador a resolver transmite o bloco, recebe a recompensa em bitcoins (block reward) e as taxas das transações incluídas.' },
  { icon: Network, title: 'Nós, Consenso e Validação', accent: '#c084fc', desc: 'A blockchain não vive em um servidor central — ela é replicada em milhares de full nodes ao redor do mundo. Cada nó verifica independentemente cada transação e cada bloco segundo as regras do protocolo. Um minerador só pode adicionar uma transação se a maioria da rede (50%+1) concordar que ela é legítima. Se alguém tentar incluir uma transação inválida ou criar bitcoins do nada, os nós rejeitam o bloco automaticamente. Ninguém precisa confiar em ninguém — todos verificam tudo.' },
  { icon: Fingerprint, title: 'Imutabilidade Absoluta', accent: '#f43f5e', desc: 'Uma vez que um bloco é adicionado e confirmado por blocos subsequentes, alterá-lo se torna exponencialmente mais difícil. Após 6 confirmações (~1 hora), é considerado praticamente irreversível. Esta propriedade é o que dá ao Bitcoin a característica de "ouro digital": não pode ser falsificado, duplicado ou censurado. A história de cada satoshi desde sua criação está registrada permanentemente na cadeia, acessível a qualquer pessoa com uma conexão à internet.' },
  { icon: Globe, title: 'Transparência Radical', accent: '#f59e0b', desc: 'Cada transação jamais realizada está publicamente visível em qualquer blockchain explorer. Qualquer pessoa pode auditar o suprimento total, verificar a validade de uma transação ou rastrear o fluxo de fundos entre endereços. Esta transparência radical é o oposto do sistema bancário tradicional, onde balanços são opacos, auditorias são raras e a impressão de dinheiro acontece nos bastidores. Na blockchain, a matemática substitui a confiança e o código substitui a política.' },
];

const MITOS = [
  { mito: '"Blockchain é apenas Bitcoin"', verdade: 'A blockchain é a tecnologia. O Bitcoin é a primeira e mais robusta aplicação dela. Existem outras blockchains, mas nenhuma com o mesmo nível de descentralização, segurança e efeito de rede do Bitcoin. É como dizer que "a internet é apenas o Google".' },
  { mito: '"Blockchain pode ser hackeada"', verdade: 'Para hackear o Bitcoin, seria necessário controlar 51% do poder computacional global da rede — um custo estimado em bilhões de dólares por hora, sem garantia de sucesso. Nunca aconteceu em 16+ anos de operação ininterrupta.' },
  { mito: '"É só um banco de dados glorificado"', verdade: 'Bancos de dados tradicionais têm administradores que podem alterar, deletar ou censurar registros a qualquer momento. A blockchain é um livro-razão distribuído onde nenhuma entidade individual tem poder de alteração — nem governos, nem corporações, nem o próprio criador.' },
  { mito: '"Gasta energia demais, é insustentável"', verdade: 'A segurança da rede é proporcional à energia consumida. O Proof of Work transforma eletricidade em segurança imutável. Sem custo real, não há segurança real. O sistema bancário tradicional consome significativamente mais quando se inclui agências, data centers, transporte de valores, impressão de cédulas e infraestrutura regulatória.' },
];

const FLUXO = [
  { step: '01', title: 'Transação Criada', desc: 'Você envia Bitcoin. A transação é assinada digitalmente com sua chave privada e transmitida instantaneamente para a rede peer-to-peer global.', icon: Zap },
  { step: '02', title: 'Mempool (Sala de Espera)', desc: 'A transação entra na mempool — a fila de transações não confirmadas. Mineradores selecionam transações com base na taxa oferecida (fee). Quanto maior a taxa, maior a prioridade.', icon: Clock },
  { step: '03', title: 'Mineração do Bloco', desc: 'Mineradores competem para resolver o puzzle criptográfico (PoW). A cada ~10 minutos, é formado um novo bloco de transações que se liga ao bloco anterior, formando a cadeia.', icon: Cpu },
  { step: '04', title: 'Validação pela Rede (Consenso)', desc: 'Os full nodes verificam se o bloco segue todas as regras do protocolo. A maioria simples (50%+1) da rede precisa concordar que a transação é legítima. Se válido, o bloco é adicionado. Se inválido, é rejeitado imediatamente.', icon: ShieldCheck },
  { step: '05', title: 'Confirmações Acumulam', desc: 'Cada novo bloco adicionado após o seu é uma "confirmação". Após 6 confirmações (~60 minutos), a transação é considerada matematicamente irreversível. Seu registro agora é eterno.', icon: Lock },
];

const REGISTROS = [
  { icon: Scale, label: 'Quantia', detail: 'Valor exato em BTC/sats transferido', accent: '#d4af37' },
  { icon: ArrowRight, label: 'Remetente', detail: 'Endereço público de quem enviou', accent: '#38bdf8' },
  { icon: Users, label: 'Destinatário', detail: 'Endereço público de quem recebeu', accent: '#34d399' },
  { icon: Clock, label: 'Timestamp', detail: 'Data e hora exata da transação', accent: '#c084fc' },
  { icon: Hash, label: 'Posição (Hash)', detail: 'Localização no livro-razão público', accent: '#f59e0b' },
];

export default function Blockchain() {
  const { scrollYProgress } = useScroll();
  const { sx, sy } = useMouseParallax(12);
  const pw = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-cyan-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <link rel="canonical" href={canonicalUrl('/blockchain')} />
        <meta property="og:url" content={canonicalUrl('/blockchain')} />
        <title>O Que é Blockchain — Como Funciona a Tecnologia por Trás do Bitcoin | Arsenal Técnico</title>
        <meta name="description" content="Entenda o que é blockchain de verdade: como funciona, como os dados são armazenados em blocos, como a rede é formada por mineradores e como transações são validadas por consenso." />
        <meta name="keywords" content="blockchain, o que é blockchain, como funciona blockchain, bitcoin blockchain, proof of work, mineração bitcoin, hash SHA-256" />
      </Helmet>

      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left" style={{ width: pw, background: 'linear-gradient(90deg, #38bdf8, #06b6d4)' }} />

      {/* VFX Stack */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 60%)', x: sx, y: sy }} />
        <motion.div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 60%)', x: useTransform(sx, v => -v * 0.5), y: useTransform(sy, v => -v * 0.5) }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }} />
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/blockchain.webp"
        phase="Fundamento Técnico"
        title={<>BLOCK<span className="text-cyan-400">CHAIN</span></>}
        subtitle="A tecnologia Blockchain é um livro-razão público que registra transações de forma confiável, transparente e imutável — sem intermediários, sem permissão, sem censura. Funciona 24/7/365, há mais de 16 anos."
        icon={Blocks}
        accentColor="blue"
        backLink="/educacao"
        backLabel="Arsenal Técnico"
      />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 01 — O Que a Blockchain Registra ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32" style={{ background: 'linear-gradient(180deg, #050808, #070b0b)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <BookOpen className="mx-auto text-cyan-500/40 mb-5" size={28} />
            <p className="text-cyan-400/70 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">Capítulo 01</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O que a Blockchain <span className="text-cyan-400">registra?</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              A blockchain registra <span className="text-stone-300 font-semibold">exatamente</span>: a quantia de bitcoins (ou outras moedas) transacionadas, quem enviou, quem recebeu, quando essa transação foi feita e em qual lugar do livro ela está registrada. <span className="text-cyan-400/80">A transparência é um dos principais atributos da blockchain.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {REGISTROS.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="group relative p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 text-center hover:-translate-y-1"
                style={{ background: `linear-gradient(135deg, ${item.accent}06, transparent 60%)` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl" style={{ background: `radial-gradient(circle, ${item.accent}10, transparent 70%)` }} />
                <item.icon size={20} className="mx-auto mb-3 transition-colors" style={{ color: `${item.accent}99` }} />
                <p className="text-white font-bold text-sm mb-1">{item.label}</p>
                <p className="text-stone-600 text-[11px] leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ IMAGEM: Livro-Razão Holográfico ══ */}
      <CinematicBreak src={blockchainLivroImg} alt="Livro-razão ancestral com dados blockchain holográficos" caption="O conceito é milenar. A execução é quântica." />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 02 — Como os Dados São Armazenados ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32" style={{ background: '#070b0b' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Capítulo 02</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Como os dados são <span className="text-cyan-400">armazenados?</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-3xl">
              A blockchain armazena informações de um grupo de transações em <span className="text-stone-300 font-semibold">blocos</span>, marcando cada bloco com um registro de tempo e data. A cada período de <span className="text-cyan-400 font-bold">~10 minutos</span>, é formado um novo bloco de transações, que se liga ao bloco anterior — formando uma cadeia contínua e inquebrável.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Box, accent: '#d4af37', bold: 'Cada página é um bloco.', rest: 'Contém uma lista de transações verificadas, a data exata, um hash único e o hash do bloco anterior. Quando preenchido e validado, é permanentemente anexado à cadeia.' },
              { icon: Lock, accent: '#f43f5e', bold: 'Ninguém pode arrancar páginas.', rest: 'Se alguém tentar adulterar uma transação antiga, todas as páginas seguintes ficam instantaneamente inválidas. Os blocos são dependentes uns dos outros — por isso o nome: Block + Chain.' },
              { icon: Users, accent: '#34d399', bold: 'Todos têm uma cópia idêntica.', rest: 'Milhares de full nodes ao redor do mundo guardam cópias completas. Para fraudar, seria preciso alterar todas simultaneamente — algo computacionalmente impossível.' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="group p-7 rounded-2xl border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-1 overflow-hidden relative"
                style={{ background: `linear-gradient(135deg, ${item.accent}06, transparent 60%)` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${item.accent}10, transparent 60%)` }} />
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div className="absolute top-0 -left-full w-full h-px group-hover:left-full transition-all duration-[1.5s] ease-in-out" style={{ background: `linear-gradient(to right, transparent, ${item.accent}40, transparent)` }} />
                </div>
                <div className="relative z-10">
                  <item.icon size={22} className="mb-4 opacity-70" style={{ color: item.accent }} />
                  <p className="text-stone-200 font-bold text-sm mb-3">{item.bold}</p>
                  <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{item.rest}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ IMAGEM: Cadeia de Blocos ══ */}
      <CinematicBreak src={blockchainCadeiaImg} alt="Blocos de dados encadeados em cubo de cristal" caption="Dados encadeados por criptografia — cada elo protege o anterior" />

      <SectionGlow />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 03 — Como a Rede é Formada ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Capítulo 03</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Como a <span className="text-cyan-400">rede</span> é formada?
              </h2>
              <div className="space-y-5">
                <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                  Os blocos são dependentes um dos outros e formam uma <span className="text-stone-200 font-semibold">cadeia de blocos</span> (por isso o nome: Blockchain). Isso torna a tecnologia perfeita para registro de informações que necessitam de confiança, como no caso de uma transação de bitcoin e outras criptos.
                </p>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                  A rede do blockchain é formada por <span className="text-cyan-400 font-bold">mineradores</span> que verificam e registram as transações no bloco. Para que isso seja possível, os mineradores emprestam <span className="text-stone-200 font-semibold">poder computacional</span> para a rede.
                </p>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                  Como incentivo para continuarem colaborando e tornar a rede sustentável e mais segura, eles recebem uma <span className="text-cyan-400 font-bold">recompensa em moedas digitais</span> — o famoso block reward.
                </p>
              </div>
            </motion.div>

            {/* Infrastructure cards */}
            <div className="space-y-4">
              {[
                { icon: Cpu, accent: '#34d399', title: 'Mineradores', desc: 'Computadores especializados que competem para validar transações. Emprestam poder computacional real à rede em troca de recompensas em Bitcoin.' },
                { icon: Server, accent: '#c084fc', title: 'Full Nodes', desc: 'Guardiões do protocolo. Cada nó mantém uma cópia completa de toda a blockchain e verifica independentemente cada transação e bloco.' },
                { icon: Waypoints, accent: '#38bdf8', title: 'Cadeia de Blocos', desc: 'Os blocos se encadeiam criptograficamente: cada bloco contém o hash do anterior. Duas cadeias podem se formar ao mesmo tempo — a rede sempre escolhe a com maior trabalho acumulado.' },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                  className="group relative rounded-xl border border-white/[0.06] p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.12] overflow-hidden flex items-start gap-4"
                  style={{ background: `linear-gradient(135deg, ${item.accent}06, transparent 60%)` }}
                >
                  <div className="p-2.5 rounded-xl border shrink-0 mt-0.5" style={{ background: `${item.accent}10`, borderColor: `${item.accent}25` }}>
                    <item.icon size={18} style={{ color: item.accent }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ IMAGEM: Rede Global ══ */}
      <CinematicBreak src={blockchainRedeImg} alt="Mapa mundial com nós da rede blockchain conectados" caption="19.000+ full nodes. Sem centro. Sem permissão. Sem fronteiras." />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 04 — Como a Transação é Validada ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32" style={{ background: '#070b0b' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 text-center">
            <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Capítulo 04</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Como a transação é <span className="text-cyan-400">validada?</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              O minerador só pode adicionar uma transação no bloco se uma <span className="text-cyan-400 font-bold">maioria simples (50%+1)</span> da rede concordar que aquela transação é legítima e correta. O nome disso é o <span className="text-stone-300 font-semibold">consenso</span> da rede blockchain. No caso do Bitcoin, o consenso é medido através do poder computacional.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, rgba(56,189,248,0.3), rgba(6,182,212,0.05))' }} />
            {FLUXO.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.2}
                className={`relative flex items-start gap-6 md:gap-0 mb-14 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20">
                  <motion.div animate={{ boxShadow: ['0 0 0px rgba(56,189,248,0)', '0 0 20px rgba(56,189,248,0.3)', '0 0 0px rgba(56,189,248,0)'] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    className="w-11 h-11 rounded-full flex items-center justify-center border border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                  >
                    <item.icon size={16} />
                  </motion.div>
                </div>
                <div className={`ml-16 md:ml-0 ${i % 2 === 0 ? 'md:w-[45%] md:pr-14' : 'md:w-[45%] md:pl-14'} ${i % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                  <p className="text-cyan-500/40 font-mono text-[10px] font-bold tracking-[0.3em] uppercase mb-1">Etapa {item.step}</p>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Consensus callout */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}
            className="mt-16 p-6 md:p-8 rounded-2xl border border-cyan-500/15 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.04), rgba(6,182,212,0.02))' }}
          >
            <div className="absolute inset-0 opacity-[0.04]" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(56,189,248,0.4), transparent 50%)' }} />
            <div className="relative z-10 flex items-start gap-4">
              <Binary className="text-cyan-400/60 shrink-0 mt-1" size={22} />
              <div>
                <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                  <span className="text-cyan-400 font-bold">Impasse resolvido pela matemática:</span> Duas cadeias de blocos podem ser formadas ao mesmo tempo. O impasse é resolvido quando a rede precisa escolher uma das cadeias. No final, <span className="text-white font-semibold">ganha a cadeia que tiver a maior quantidade de trabalho</span> — a famosa "longest chain rule".
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ IMAGEM: Mineração ══ */}
      <CinematicBreak src={blockchainMineracaoImg} alt="Infraestrutura de mineração blockchain" caption="Energia real convertida em segurança matemática" />

      <SectionGlow />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 05 — Os 6 Pilares da Blockchain ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-36">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Capítulo 05 — Arquitetura Profunda</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Os 6 pilares da <span className="text-cyan-400">blockchain</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BLOCOS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.12}
                  className="group relative rounded-2xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${b.accent}06, transparent 60%)` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${b.accent}10, transparent 60%)` }} />
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute top-0 -left-full w-full h-px group-hover:left-full transition-all duration-[1.5s] ease-in-out" style={{ background: `linear-gradient(to right, transparent, ${b.accent}40, transparent)` }} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl border" style={{ background: `${b.accent}10`, borderColor: `${b.accent}25` }}>
                        <Icon size={18} style={{ color: b.accent }} />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-50" style={{ color: b.accent }}>0{i + 1}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-3">{b.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{b.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ IMAGEM: Imutabilidade ══ */}
      <CinematicBreak src={blockchainImutabilidadeImg} alt="Cadeado blockchain resistindo a ataques" caption="16+ anos de operação ininterrupta. Zero hacks bem-sucedidos." />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 06 — Resumo Blindado ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32" style={{ background: '#070b0b' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <Eye className="mx-auto text-cyan-500/40 mb-5" size={28} />
            <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-4">Capítulo 06</span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Resumindo: <span className="text-cyan-400">o que você precisa saber</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}
            className="relative rounded-2xl border border-cyan-500/15 p-8 md:p-12 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.04), rgba(6,182,212,0.02))' }}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(56,189,248,0.3), transparent 50%)' }} />
            <div className="relative z-10 space-y-6">
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                A tecnologia blockchain é um <span className="text-cyan-400 font-bold">livro contábil público e distribuído</span> que registra todas as transações de moeda virtual em uma cadeia de blocos, que <span className="text-white font-semibold">qualquer um pode participar</span>.
              </p>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                Ela armazena informações em blocos a cada <span className="text-cyan-400 font-bold">~10 minutos</span>. Cada bloco se liga ao anterior, formando uma cadeia inquebrável. Os mineradores verificam e registram as transações, emprestando poder computacional à rede em troca de recompensas.
              </p>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                Uma transação só é incluída no bloco se a <span className="text-cyan-400 font-bold">maioria da rede (50%+1)</span> concordar que ela é legítima — o consenso. No Bitcoin, esse consenso é medido pelo poder computacional. Se duas cadeias se formam ao mesmo tempo, <span className="text-white font-semibold">ganha a com mais trabalho acumulado</span>.
              </p>
              <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.2), transparent)' }} />
              <p className="text-stone-400 text-sm md:text-base leading-relaxed italic">
                As informações registradas são <span className="text-white font-semibold">confiáveis, imutáveis e transparentes</span> — desde que a maioria da rede se mantenha honesta. E em 16+ anos de operação ininterrupta, ela se manteve.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionGlow />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 07 — Mitos Destruídos ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-36">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <AlertTriangle className="text-red-400/50 mb-4" size={24} />
            <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Capítulo 07 — Destruindo Narrativas</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Mitos que <span className="text-red-400">precisam morrer</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MITOS.map((m, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="group rounded-2xl border border-red-500/10 hover:border-red-500/25 p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden relative"
                style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.04), transparent 60%)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top left, rgba(239,68,68,0.06), transparent 60%)' }} />
                <p className="text-red-400/80 font-mono text-xs font-bold tracking-wider uppercase mb-3 line-through decoration-red-500/40 relative z-10">{m.mito}</p>
                <div className="w-8 h-px bg-emerald-500/30 mb-3 relative z-10" />
                <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors relative z-10">
                  <span className="text-emerald-400 font-bold">Verdade: </span>{m.verdade}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ IMAGEM: Blocos Conectados ══ */}
      <CinematicBreak src={blockchainBlocosImg} alt="Blocos conectados na cadeia blockchain" caption="Cada bloco é um elo permanente na cadeia de confiança" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ A REDE EM NÚMEROS ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-28" style={{ background: '#070b0b' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12 text-center">
            <Layers className="mx-auto text-cyan-500/40 mb-5" size={24} />
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              A rede em <span className="text-cyan-400">números</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimCounter value="900K+" label="Blocos minerados" delay={0} />
            <AnimCounter value="~1B" label="Transações processadas" delay={0.1} />
            <AnimCounter value="19.000+" label="Full nodes ativos" delay={0.2} />
            <AnimCounter value="99.98%" label="Uptime desde 2009" delay={0.3} />
          </div>
        </div>
      </section>

      <SectionGlow />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CTA FINAL ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-36">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Search className="mx-auto text-cyan-500/40 mb-6" size={32} />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              A blockchain não pede <span className="text-cyan-400">permissão</span>
            </h2>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Ela opera independentemente de governos, bancos e corporações. Entender como ela funciona é o primeiro passo para entender por que o Bitcoin é inevitável — e por que ninguém conseguirá pará-lo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bitcoin/o-que-e" className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:gap-4 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                O Que é Bitcoin <ArrowRight size={16} />
              </Link>
              <Link to="/mineracao" className="inline-flex items-center gap-3 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500">
                Mineração <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center space-y-4">
          <div className="h-px w-32 mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.2), transparent)' }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">A verdade está nos blocos. Sempre esteve.</p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">Lord Junnior © 2026</p>
        </motion.div>
      </div>
    </div>
  );
}
