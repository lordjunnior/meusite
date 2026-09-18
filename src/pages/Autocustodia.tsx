import { useEffect, useRef } from 'react';
import DonationCTA from '@/components/DonationCTA';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft, Shield, Flame, Droplets, Lock, EyeOff, Network, Layers,
  AlertTriangle, ArrowRight, KeyRound, ShieldCheck, Fingerprint, HardDrive,
  CheckCircle2, XCircle, Thermometer, Bug, Clock, FileKey, Usb, Globe,
  Server, Eye, ShieldOff, Cpu, Wrench
} from 'lucide-react';
import RiskBlock from '@/components/RiskBlock';
import SnippetBait from '@/components/SnippetBait';
import heroImg from '@/assets/autocustodia-hero.webp';
import imgPapelFogo from '@/assets/autocustodia-papel-fogo.webp';
import imgMetalPlaca from '@/assets/autocustodia-metal-placa.webp';
import imgMultisig from '@/assets/autocustodia-multisig.webp';
import BackToHome from '@/components/BackToHome';

gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

/* ── Nobel Section Wrapper ── */
const NobelSection = ({ children, className = '', id, delay = 0 }: {
  children: React.ReactNode; className?: string; id?: string; delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    );
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === ref.current) t.kill(); }); };
  }, [delay]);
  return <div ref={ref} id={id} className={className} style={{ opacity: 0 }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
{children}</div>;
};

/* ── Chapter Kickoff ── */
const ChapterKickoff = ({ image, alt, number, title, subtitle }: {
  image: string; alt: string; number: string; title: string; subtitle: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.02, 1.06]);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden rounded-sm mb-12">
      <motion.img
        src={image}
        alt={alt}
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(5,8,8,0.1) 0%, rgba(5,8,8,0.4) 40%, rgba(5,8,8,0.92) 80%, rgba(5,8,8,1) 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 100% 80% at 50% 60%, transparent 30%, rgba(5,8,8,0.8) 100%)',
      }} />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-3 block">{number}</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl">{subtitle}</p>
        </motion.div>
      </div>
    </div>
  );
};

/* ── Comparison Card ── */
const ComparisonCard = ({ verdict, label, title, description, features, icon: Icon, image, isRecommended }: {
  verdict: string; label: string; title: string; description: string;
  features: { text: string; good: boolean }[]; icon: any; image?: string; isRecommended?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: APPLE_EASE }}
      className={`group relative overflow-hidden rounded-sm border transition-all duration-500 ${
        isRecommended
          ? 'border-primary/30 bg-card/50 hover:border-primary/60 shadow-[0_0_30px_hsl(var(--primary)/0.08)]'
          : 'border-border/30 bg-card/30 hover:border-border/50'
      }`}
    >
      {isRecommended && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      )}
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: 'brightness(0.6) saturate(0.85)' }} loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
        </div>
      )}
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[9px] font-mono font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-sm ${
            isRecommended ? 'bg-primary/15 text-primary' : 'bg-muted/50 text-muted-foreground'
          }`}>{label}</span>
          <Icon className={`w-5 h-5 ${isRecommended ? 'text-primary' : 'text-muted-foreground/50'}`} />
        </div>
        <h3 className="text-2xl font-display font-bold tracking-tight mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>
        <div className="space-y-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              {f.good
                ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                : <XCircle className="w-4 h-4 text-destructive/70 shrink-0 mt-0.5" />
              }
              <span className={f.good ? 'text-foreground/80' : 'text-muted-foreground/60'}>{f.text}</span>
            </div>
          ))}
        </div>
        <p className={`mt-6 text-xs font-mono tracking-wider uppercase ${isRecommended ? 'text-primary/70' : 'text-muted-foreground/40'}`}>
          Veredicto: {verdict}
        </p>
      </div>
    </motion.div>
  );
};

/* ── Protocol Card ── */
const ProtocolCard = ({ icon: Icon, title, description, details, level }: {
  icon: any; title: string; description: string; details: string[]; level: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: APPLE_EASE }}
      className="group relative p-6 md:p-8 rounded-sm border border-border/30 bg-card/30 backdrop-blur-sm overflow-hidden
        hover:border-primary/40 hover:bg-card/50 transition-all duration-500"
      style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.04), inset 0 1px 0 hsl(var(--primary) / 0.06)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/50 transition-all duration-500" />
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-[pulse_3s_ease-in-out_infinite] group-hover:bg-primary/20" />
          <Icon className="relative w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
        </div>
        <span className="text-[8px] font-mono font-bold tracking-[0.3em] uppercase text-primary/50 bg-primary/5 px-2 py-0.5 rounded-sm">{level}</span>
      </div>
      <h4 className="text-lg font-display font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
      <ul className="space-y-2">
        {details.map((d, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground/70">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/40 shrink-0" />
            {d}
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
};

/* ── MAIN PAGE ── */
export default function Autocustodia() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { return () => ScrollTrigger.getAll().forEach(t => t.kill()); }, []);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-40px' });
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroScale = useTransform(heroScroll, [0, 0.5], [1, 1.08]);

  return (
    <>
      <Helmet>
        <title>Autocustódia Bitcoin — Guia Completo de Hardware Wallets e Segurança | Lord Junnior</title>
        <meta name="description" content="Aprenda autocustódia Bitcoin: hardware wallets, seed phrases, multisig e cold storage. Guia completo para proteger seus satoshis sem depender de terceiros." />
        <link rel="canonical" href="https://lordjunnior.com.br/autocustodia" />
      </Helmet>
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* ── FILM GRAIN + ATMOSPHERE ── */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.035]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }} />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.06),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--destructive)/0.04),_transparent_60%)]" />
      </div>

      {/* Vault particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="vault-layer" /><div className="vault-layer vault-layer-2" /><div className="vault-layer vault-layer-3" />
      </div>
      <style>{`
        @keyframes driftVault{0%{transform:translateY(0) translateX(0)}100%{transform:translateY(-1200px) translateX(80px)}}
        .vault-layer{position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 20%,rgba(220,38,38,0.2) 100%,transparent),radial-gradient(1px 1px at 55% 55%,rgba(255,255,255,0.15) 100%,transparent),radial-gradient(2px 2px at 75% 35%,rgba(220,38,38,0.15) 100%,transparent);background-size:220px 220px;animation:driftVault 65s linear infinite}
        .vault-layer-2{background-size:320px 320px;animation:driftVault 95s linear infinite reverse;opacity:.5}
        .vault-layer-3{background-size:400px 400px;animation:driftVault 130s linear infinite;opacity:.3}
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
        <motion.img
          src={heroImg}
          alt="Placa de metal com seed phrase gravada — autocustódia real"
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, rgba(5,8,8,0.5) 30%, rgba(5,8,8,0.92) 70%, rgba(5,8,8,1) 100%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 30%, rgba(5,8,8,0.85) 100%)',
        }} />
        {/* Red emergency glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.06),_transparent_60%)]" />

        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-20 pb-12 md:pb-20">
            <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: APPLE_EASE }}>
              <Link to="/recursos-e-ferramentas" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">
                <ArrowLeft size={14} /> Voltar à Central
              </Link>
            </motion.div>

            <motion.div custom={0} variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} className="flex items-center gap-3 mb-4">
              <KeyRound className="w-4 h-4 text-primary" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">Blindagem Nível 5 · Protocolo Crítico</span>
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6"
            >
              Arquitetura de{' '}<br className="hidden md:block" />
              <span className="text-gradient-gold">Autocustódia</span>
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Não basta anotar 12 palavras num papel e guardar na gaveta. Autocustódia real é{' '}
              <span className="text-foreground font-semibold">engenharia de sobrevivência</span>: camada física contra desastres,
              criptografia de comunicação, redundância geográfica e estruturas de assinatura que eliminam pontos únicos de falha.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══════════════ CONTENT ══════════════ */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-7xl mx-auto">

          <SnippetBait
            text="Você pode proteger seus ativos contra fogo, água e roubo. Mas se eles estiverem numa corretora, basta uma canetada para perdê-los. Autocustódia não é paranoia — é matemática aplicada à sobrevivência patrimonial."
            cta="Veja o confisco de 1990 →"
            href="/confisco-1990"
          />

          {/* ── CHAPTER 1: CAMADA FÍSICA ── */}
          <NobelSection className="pt-20 md:pt-28 mb-20" delay={0.1}>
            <div className="flex items-center gap-3 mb-3">
              <Layers className="w-4 h-4 text-destructive" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-destructive uppercase">Capítulo 01 · O Elo Mais Fraco</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Camada Física: <span className="text-destructive">O Problema do Mundo Real</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-4">
              A maioria das perdas de Bitcoin não acontece por hackers — acontece por fogo, água, tempo e negligência.
              Sua seed phrase é o ponto de acesso ao seu patrimônio. Se a camada física falha, <span className="text-foreground font-semibold">tudo se perde</span>.
            </p>
            <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
              A diferença entre um Bitcoiner que dorme tranquilo e um que perde tudo numa enchente
              está no material que protege suas palavras. Papel é uma aposta contra a entropia.
              Metal é engenharia contra o caos.
            </p>
          </NobelSection>

          {/* Comparison: Paper vs Metal */}
          <NobelSection className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComparisonCard
                verdict="Inaceitável para valores relevantes"
                label="Frágil"
                title="Papel"
                description="Suscetível a umidade, fogo, insetos, desgaste natural e tinta invisível por UV. É uma aposta contra o tempo que você vai perder."
                image={imgPapelFogo}
                icon={Flame}
                features={[
                  { text: 'Destruído a partir de 230°C', good: false },
                  { text: 'Vulnerável a umidade e mofo', good: false },
                  { text: 'Tinta desbota com exposição UV', good: false },
                  { text: 'Insetos e roedores podem consumir', good: false },
                  { text: 'Custo zero — papel e caneta', good: true },
                  { text: 'Rápido para anotar no momento', good: true },
                ]}
              />
              <ComparisonCard
                verdict="Padrão operacional obrigatório"
                label="Robusto"
                title="Metal (Aço / Titânio)"
                description="Aço inoxidável resiste a 1.400°C, corrosão, inundações e séculos de entropia. A única forma real de preservar acesso ao patrimônio geracional."
                image={imgMetalPlaca}
                icon={Shield}
                isRecommended
                features={[
                  { text: 'Resiste a 1.400°C (aço inox) ou 1.670°C (titânio)', good: true },
                  { text: 'Imune a corrosão, água e agentes químicos', good: true },
                  { text: 'Legível após décadas de armazenamento', good: true },
                  { text: 'Sobrevive a incêndios residenciais completos', good: true },
                  { text: 'Custo médio: R$150–400 (placa + punções)', good: false },
                  { text: 'Processo de gravação leva 30–60 minutos', good: false },
                ]}
              />
            </div>
          </NobelSection>

          {/* Quote block */}
          <NobelSection className="mb-20">
            <blockquote className="relative p-8 md:p-12 rounded-sm border border-border/20 bg-card/20">
              <div className="absolute -top-4 left-8 text-6xl text-primary/20 font-serif">"</div>
              <p className="font-display text-xl md:text-2xl font-bold text-foreground/90 leading-relaxed mb-3 italic">
                No mundo real, o problema não é hacker. É fogo, água e tempo.
              </p>
              <p className="text-sm text-muted-foreground">
                — A lei da entropia não negocia. Ou você engenheira a proteção, ou ela engenheira a destruição.
              </p>
            </blockquote>
          </NobelSection>

          {/* Risk flow diagram */}
          <NobelSection className="mb-28">
            <div className="max-w-lg mx-auto text-center space-y-4">
              <div className="p-5 rounded-sm border border-border/30 bg-card/30">
                <span className="font-mono text-[9px] tracking-[0.3em] text-primary/60 uppercase">Mundo Digital</span>
                <p className="text-foreground font-display font-bold text-lg mt-1">Sua Seed Phrase (12/24 palavras)</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-primary/40 to-destructive/40" />
                <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
                <div className="w-px h-8 bg-gradient-to-b from-destructive/40 to-primary/40" />
              </div>
              <div className="p-6 rounded-sm border-2 border-destructive/40 bg-destructive/[0.06]" style={{ animation: 'pulse 3s ease-in-out infinite' }}>
                <span className="font-mono text-[9px] tracking-[0.3em] text-destructive uppercase">Ponto Crítico de Falha</span>
                <p className="text-foreground font-display font-bold text-xl mt-1">Camada Física</p>
                <p className="text-muted-foreground text-xs mt-2">Material + Local + Redundância</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-destructive/40 to-primary/40" />
                <ShieldCheck className="w-4 h-4 text-primary" />
                <div className="w-px h-8 bg-gradient-to-b from-primary/40 to-primary/20" />
              </div>
              <div className="p-5 rounded-sm border border-primary/30 bg-primary/[0.04]">
                <span className="font-mono text-[9px] tracking-[0.3em] text-primary/60 uppercase">Mundo Real</span>
                <p className="text-foreground font-display font-bold text-lg mt-1">Seu Patrimônio Protegido</p>
              </div>
              <p className="text-xs text-destructive/80 font-mono tracking-wider uppercase pt-4">
                Se a camada física falha → o mundo real destrói o digital.
              </p>
            </div>
          </NobelSection>

          {/* ── CHAPTER 2: PROTOCOLOS DIGITAIS ── */}
          <NobelSection className="mb-12">
            <ChapterKickoff
              image={imgMultisig}
              alt="Setup de multisig com hardware wallets e placas de metal"
              number="Capítulo 02 · Arsenal Digital"
              title="Protocolos de Blindagem Digital"
              subtitle="Ferramentas e técnicas que eliminam pontos únicos de falha e protegem sua privacidade transacional."
            />
          </NobelSection>

          <NobelSection className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ProtocolCard
                icon={Lock}
                title="PGP Encryption"
                description="Criado em 1991 por Phil Zimmermann, é a base da comunicação soberana. Garante que apenas o destinatário leia a mensagem — nem governo, nem provedor."
                level="Essencial"
                details={[
                  'Criptografia assimétrica (chave pública + privada)',
                  'Usado em e-mails, mensagens e verificação de software',
                  'Imune a interceptação man-in-the-middle quando bem configurado',
                  'Ferramentas: GPG Suite (Mac), Kleopatra (Windows/Linux)',
                ]}
              />
              <ProtocolCard
                icon={Globe}
                title="VPN + Tor"
                description="Mascare seu tráfego de internet. Seu ISP não precisa saber que você acessa serviços de Bitcoin, exchanges ou nós da rede."
                level="Essencial"
                details={[
                  'VPN: criptografa todo o tráfego entre você e o servidor',
                  'Tor: roteia conexão por 3+ nós voluntários (onion routing)',
                  'Combinados: VPN → Tor para máxima privacidade',
                  'Recomendados: Mullvad VPN (aceita BTC), Tor Browser',
                ]}
              />
              <ProtocolCard
                icon={Shield}
                title="Multisig (2-de-3 ou 3-de-5)"
                description="Elimine o ponto único de falha. Exija múltiplas chaves, distribuídas em locais físicos distintos, para autorizar qualquer transação."
                level="Avançado"
                details={[
                  '2-de-3: duas de três chaves necessárias (perda de uma = ok)',
                  'Distribua chaves: sua casa, cofre bancário, familiar confiável',
                  'Cada chave em hardware wallet diferente (diversificação)',
                  'Ferramentas: Sparrow Wallet, Electrum, Nunchuk',
                ]}
              />
              <ProtocolCard
                icon={EyeOff}
                title="CoinJoin & PayJoin"
                description="Quebre o rastro on-chain. Embaralhe seus UTXOs com outros usuários para proteger sua privacidade transacional e dificultar análise de chain."
                level="Avançado"
                details={[
                  'CoinJoin: múltiplos usuários combinam transações em uma',
                  'PayJoin: pagamento que parece normal mas mistura inputs',
                  'Quebre links entre endereços de recebimento e gasto',
                  'Ferramentas: Wasabi Wallet, JoinMarket, Samourai (Whirlpool)',
                ]}
              />
              <ProtocolCard
                icon={HardDrive}
                title="Hardware Wallets"
                description="Dispositivos dedicados que mantêm suas chaves privadas isoladas do computador e da internet. Assinatura air-gapped elimina vetores de ataque remoto."
                level="Obrigatório"
                details={[
                  'Chaves privadas nunca saem do dispositivo',
                  'Tela própria para verificar endereços (anti-clipboard hijack)',
                  'Air-gapped: comunicação via QR code ou MicroSD (sem USB)',
                  'Recomendados: Coldcard, BitBox02, Jade (DIY), SeedSigner',
                ]}
              />
              <ProtocolCard
                icon={Fingerprint}
                title="Passphrase (25ª Palavra)"
                description="Adicione uma camada extra de proteção à sua seed. Mesmo que alguém encontre suas 24 palavras, sem a passphrase, acessa uma carteira vazia (plausible deniability)."
                level="Intermediário"
                details={[
                  'Cria uma carteira completamente diferente da seed original',
                  'Permite negar a existência de fundos sob coerção ($5 wrench attack)',
                  'Deve ser memorizada OU gravada separadamente da seed',
                  'Cuidado: se esquecer, os fundos ficam permanentemente inacessíveis',
                ]}
              />
              <ProtocolCard
                icon={Server}
                title="Full Node Próprio"
                description="Rode seu próprio nó Bitcoin para verificar transações sem confiar em terceiros. Privacidade total: ninguém sabe quais endereços são seus."
                level="Intermediário"
                details={[
                  'Verifica todas as regras de consenso localmente',
                  'Elimina dependência de exploradores de blocos externos',
                  'Conecte sua wallet ao seu nó via Tor para máxima privacidade',
                  'Soluções: Umbrel, RaspiBlitz, Start9, myNode (Raspberry Pi)',
                ]}
              />
              <ProtocolCard
                icon={Cpu}
                title="Geração de Entropia Offline"
                description="Gere sua seed phrase com dados, moedas ou cartas em um computador air-gapped. Elimine qualquer possibilidade de comprometimento digital."
                level="Paranoia Produtiva"
                details={[
                  '256 lançamentos de moeda = 24 palavras BIP-39 puras',
                  'Use computador dedicado, nunca conectado à internet',
                  'SeedSigner com Raspberry Pi Zero: geração + assinatura air-gapped',
                  'Verifique checksum manualmente para garantir integridade',
                ]}
              />
            </div>
          </NobelSection>

          {/* ── CHAPTER 3: AMEAÇAS REAIS ── */}
          <NobelSection className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <ShieldOff className="w-4 h-4 text-destructive" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-destructive uppercase">Capítulo 03 · Vetores de Ataque</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Ameaças <span className="text-destructive">Reais</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
              Autocustódia sem threat modeling é custódia irresponsável. Conheça os vetores de ataque mais comuns
              — e como cada camada da sua arquitetura os neutraliza.
            </p>
          </NobelSection>

          <NobelSection className="mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Flame, title: 'Incêndio Residencial', desc: 'Temperaturas acima de 800°C. Papel e plástico derretem. Aço inox e titânio sobrevivem.', solution: 'Backup em metal + redundância geográfica' },
                { icon: Droplets, title: 'Inundação / Umidade', desc: 'Mofo e tinta ilegível em semanas. Água corrente pode transportar backups.', solution: 'Metal impermeável + container selado' },
                { icon: Eye, title: '$5 Wrench Attack', desc: 'Coerção física para revelar chaves. O ataque mais simples e eficaz que existe.', solution: 'Passphrase + wallet isca com fundos mínimos' },
                { icon: Bug, title: 'Malware / Clipboard Hijack', desc: 'Software que substitui endereços de Bitcoin na área de transferência.', solution: 'Hardware wallet com tela + verificação manual' },
                { icon: Clock, title: 'Herança & Morte', desc: 'Sem plano de sucessão, seus Bitcoin morrem com você. Família perde acesso.', solution: 'Multisig familiar + instruções seladas' },
                { icon: Wrench, title: 'Ponto Único de Falha', desc: 'Uma seed, um local, um dispositivo. Se algo falha, tudo se perde.', solution: 'Multisig 2-de-3 + distribuição geográfica' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.08 }}
                    className="group p-5 rounded-sm border border-destructive/15 bg-card/30 hover:border-destructive/40 hover:bg-card/50 transition-all duration-500"
                  >
                    <Icon className="w-5 h-5 text-destructive/70 mb-3 group-hover:text-destructive transition-colors" />
                    <h4 className="text-sm font-bold tracking-tight mb-1 group-hover:text-destructive transition-colors">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-emerald-400/80 font-medium">{item.solution}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </NobelSection>

          {/* ── RISK BLOCK ── */}
          <NobelSection className="mb-28">
            <RiskBlock
              title="Sem arquitetura de custódia, o que acontece?"
              showImage
              consequences={[
                'Um incêndio destrói sua única cópia da seed phrase — patrimônio vira cinza em minutos.',
                'Coerção física revela acesso total: sem passphrase, sem wallet isca, sem negação plausível.',
                'Você morre sem plano de sucessão — família não consegue acessar nenhum satoshi.',
                'Malware substitui seu endereço de depósito — você envia Bitcoin para o atacante achando que é seu.',
                'Dependência de exchange custodial: seus Bitcoin são apenas um IOU até que você sacude.',
              ]}
            />
          </NobelSection>

          {/* ── HARDWARE WALLET DIY CTA ── */}
          <NobelSection className="mb-10">
            <Link to="/autocustodia/hardware-wallet-diy-bitcoin" className="group block relative overflow-hidden rounded-sm border border-primary/15 bg-card/20 hover:bg-card/40 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-primary to-transparent" />
              <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] tracking-[0.4em] text-primary/60 uppercase mb-2">Módulo Avançado</p>
                  <h4 className="text-lg font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">Hardware Wallets DIY — Construa Seu Próprio Dispositivo de Assinatura</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Guia completo: monte seu SeedSigner, Krux ou Specter DIY com componentes genéricos. Elimine a cadeia de confiança e assine transações 100% air-gapped.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </Link>
          </NobelSection>

          {/* ── MOBILIDADE DE CHAVES CTA ── */}
          <NobelSection className="mb-20">
            <Link to="/mobilidade-de-chaves" className="group block relative overflow-hidden rounded-sm border border-primary/15 bg-card/20 hover:bg-card/40 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-primary to-transparent" />
              <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <KeyRound className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] tracking-[0.4em] text-primary/60 uppercase mb-2">Módulo Avançado</p>
                  <h4 className="text-lg font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">Mobilidade de Chaves — Transporte sua Soberania pelo Mundo</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tutorial completo: como criptografar sua seed com a Krux e transportá-la em tags NFC invisíveis. Anel, adesivo, cartão — riqueza que atravessa fronteiras em poucos bytes criptografados.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </Link>
          </NobelSection>

          {/* ── CLOSING ── */}
          <NobelSection className="mb-20">
            <div className="relative p-10 md:p-16 rounded-sm border border-border/20 bg-card/20 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.04),_transparent_60%)]" />
              <div className="relative z-10">
                <p className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4">
                  Autocustódia não é sobre acreditar.
                </p>
                <p className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary italic">
                  É sobre ter certeza.
                </p>
                <div className="flex items-center justify-center gap-3 mt-8">
                  <div className="h-px w-12 bg-primary/30" />
                  <p className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground/50 uppercase">
                    Not your keys, not your coins.
                  </p>
                  <div className="h-px w-12 bg-primary/30" />
                </div>
              </div>
            </div>
          </NobelSection>

          {/* CTA */}
          <NobelSection>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/recursos-e-ferramentas"
                className="group inline-flex items-center gap-3 py-4 px-10 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.15] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
              >
                <Shield className="w-4 h-4" />
                Voltar ao Arsenal
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground/40 uppercase">
                Lord Junnior © 2026
              </p>
            </div>
          </NobelSection>

          <NobelSection>
            <DonationCTA />
          </NobelSection>
        </div>
      </div>
    </div>
    </>
  );
}
