import PageFloatingToc from "@/components/PageFloatingToc";
import ContraAtaquePratico from '@/components/ContraAtaquePratico';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft, Ban, Globe, ShieldAlert, Eye, Banknote, AlertTriangle, Lock,
  Users, ChevronRight, ChevronDown, Scale, Play, GraduationCap, Zap,
  BookOpen, HelpCircle, Clock, CheckCircle2, XCircle, ArrowDown, ArrowRight,
  Shield, CreditCard, MapPin, Crosshair
} from 'lucide-react';
import { NAV_ITEMS, LIMITES_INTERNACIONAIS, FERRAMENTAS, CONSEQUENCIAS, FAQ_ITEMS, ESCADA_RESTRICAO, TIMELINE_ITEMS, PL_NAO_FAZ, PL_MAS_FAZ } from '@/lib/proibicaoDinheiroData';
import RiskBlock from '@/components/RiskBlock';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import bgProibicao from '@/assets/backgrounds/bg-proibicao.jpg';
import heroImg from '@/assets/proibicao-dinheiro-hero.jpg';
import agendaImg from '@/assets/proibicao-agenda-global.jpg';
import arsenalImg from '@/assets/proibicao-arsenal.jpg';
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
    <div ref={ref} className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-sm mb-12">
      <motion.img src={image} alt={alt} style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 w-full h-full object-cover will-change-transform" />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(5,8,8,0.1) 0%, rgba(5,8,8,0.4) 40%, rgba(5,8,8,0.92) 80%, rgba(5,8,8,1) 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 100% 80% at 50% 60%, transparent 30%, rgba(5,8,8,0.8) 100%)',
      }} />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: APPLE_EASE }}>
          <span className="font-mono text-[10px] tracking-[0.3em] text-destructive uppercase mb-3 block">{number}</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl">{subtitle}</p>
        </motion.div>
      </div>
    </div>
  );
};

/* ── SEO Schemas ── */
const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({
    "@type": "Question", "name": item.pergunta,
    "acceptedAnswer": { "@type": "Answer", "text": item.resposta }
  }))
};
const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  "headline": "Governo pode limitar dinheiro vivo no Brasil — Como proteger sua privacidade financeira",
  "description": "Entenda o PL 3.951/2019, os limites ao dinheiro em espécie na Europa e as ferramentas legais para proteger sua soberania financeira com Bitcoin e diversificação jurisdicional.",
  "author": { "@type": "Person", "name": "Lord Junnior" },
  "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "datePublished": "2026-03-07", "dateModified": "2026-03-07",
  "url": "https://lordjunnior.com.br/alertas/fim-do-dinheiro-vivo",
  "keywords": "PL 3951, limite dinheiro vivo Brasil, limite pagamento em dinheiro, governo proibir dinheiro vivo, dinheiro em espécie limite, privacidade financeira, Bitcoin sem KYC, teoria das bandeiras, autocustódia Bitcoin, como proteger dinheiro do governo"
};
const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo",
  "name": "Como proteger sua privacidade financeira no Brasil",
  "description": "Passo a passo para proteger sua soberania financeira diante da eliminação progressiva do dinheiro em espécie.",
  "step": [
    { "@type": "HowToStep", "name": "Entenda o cenário", "text": "Compreenda o PL 3.951/2019 e como governos globalmente estão limitando o uso de dinheiro em espécie para aumentar o controle financeiro." },
    { "@type": "HowToStep", "name": "Aprenda sobre Bitcoin P2P", "text": "Utilize plataformas descentralizadas como Bisq, Spike to Spike e RoboSats para comprar Bitcoin sem verificação de identidade (KYC)." },
    { "@type": "HowToStep", "name": "Pratique autocustódia", "text": "Armazene seus bitcoins em carteiras onde só você controla as chaves privadas, eliminando dependência de exchanges e bancos." },
    { "@type": "HowToStep", "name": "Diversifique jurisdições", "text": "Aplique a teoria das bandeiras: distribua documentação, contas e patrimônio entre múltiplas jurisdições para reduzir o risco de confisco centralizado." },
    { "@type": "HowToStep", "name": "Abra contas internacionais", "text": "Com documentação estrangeira, abra contas em diferentes países para criar camadas adicionais de proteção patrimonial." }
  ]
};

/* ═══════════ COMPONENTE ═══════════ */

const TOC_ITEMS = [
  { id: "pl3951", label: "O Mecanismo Legal" },
  { id: "agenda-global", label: "Agenda Global" },
  { id: "timeline", label: "O Cerco" },
  { id: "consequencias", label: "O Impacto" },
  { id: "contradicao", label: "O Paradoxo" },
  { id: "ferramentas", label: "Arsenal" },
  { id: "faq", label: "FAQ" },
];

export default function ProibicaoDinheiro() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { return () => ScrollTrigger.getAll().forEach(t => t.kill()); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? Math.min((window.scrollY / totalHeight) * 100, 100) : 0);
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

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-40px' });
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroScale = useTransform(heroScroll, [0, 0.5], [1, 1.08]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <FixedThematicBackground image={bgProibicao} intensity="medium" />
      {/* ── SEO ── */}
      <Helmet>
        <title>Governo Limita Dinheiro Vivo no Brasil — PL 3951 | Lord Junnior</title>
        <meta name="description" content="O PL 3.951/2019 abre caminho para limitar o uso de dinheiro em espécie no Brasil. Entenda o projeto, veja os limites na Europa e descubra ferramentas legais para proteger sua privacidade financeira." />
        <link rel="canonical" href="https://lordjunnior.com.br/alertas/fim-do-dinheiro-vivo" />
        <meta property="og:title" content="Governo Limita Dinheiro Vivo no Brasil — PL 3951" />
        <meta property="og:description" content="Entenda o PL 3.951 e como proteger sua privacidade financeira com Bitcoin P2P, teoria das bandeiras e autocustódia." />
        <meta property="og:url" content="https://lordjunnior.com.br/alertas/fim-do-dinheiro-vivo" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="red" />

      {/* ── FILM GRAIN + ATMOSPHERE ── */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.035]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }} />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--destructive)/0.06),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--primary)/0.04),_transparent_60%)]" />
      </div>

      {/* Surveillance particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="surv-layer" /><div className="surv-layer surv-layer-2" />
      </div>
      <style>{`
        @keyframes survDrift{0%{transform:translateY(0)}100%{transform:translateY(-1200px)}}
        .surv-layer{position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 25%,rgba(220,38,38,0.25) 100%,transparent),radial-gradient(1px 1px at 55% 55%,rgba(255,255,255,0.12) 100%,transparent),radial-gradient(2px 2px at 75% 35%,rgba(220,38,38,0.2) 100%,transparent);background-size:220px 220px;animation:survDrift 65s linear infinite}
        .surv-layer-2{background-size:350px 350px;animation:survDrift 100s linear infinite reverse;opacity:.4}
        @keyframes scanDown{0%{top:-5%;opacity:0}10%{opacity:0.04}90%{opacity:0.04}100%{top:105%;opacity:0}}
        .scan-line{position:fixed;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(220,38,38,0.2),transparent);animation:scanDown 9s linear infinite;z-index:1;pointer-events:none}
      `}</style>
      <div className="scan-line" />

      {/* ── READING PROGRESS BAR ── */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100, background: 'linear-gradient(90deg, hsl(var(--destructive)), hsl(var(--primary)))' }}
      />

      {/* ═══════ FLOATING TOC (Desktop) ═══════ */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] z-40 flex-col">
        <div className="m-3 rounded-sm flex-1 flex flex-col overflow-hidden border border-border/30 bg-card/80 backdrop-blur-xl">
          <div className="p-5 border-b border-border/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-destructive/20 animate-[ping_2s_ease-in-out_infinite]" />
                <Ban className="relative text-destructive" size={14} />
              </div>
              <span className="text-destructive font-mono font-bold uppercase text-[9px] tracking-[0.3em]">Proibição</span>
            </div>
            <Link to="/alertas" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-[8px] font-bold uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Central de Alertas
            </Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-muted-foreground font-mono">Leitura</span>
              <span className="text-[7px] font-bold text-destructive font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-border/30 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, hsl(var(--destructive)), hsl(var(--primary)))' }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-sm text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono border-l-2 ${
                  activeSection === item.id
                    ? 'bg-destructive/10 border-destructive text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/50 border-transparent'
                }`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══════ MOBILE NAV ═══════ */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 border-b border-border/30 bg-card/90 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/alertas" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-[8px] font-bold uppercase tracking-[0.2em] font-mono">
            <ArrowLeft size={10} /> Alertas
          </Link>
          <div className="flex items-center gap-1">
            <Ban className="text-destructive" size={12} />
            <span className="text-destructive font-bold uppercase text-[8px] tracking-[0.2em] font-mono">Proibição</span>
          </div>
          <span className="text-[8px] font-bold text-destructive font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-border/30 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, hsl(var(--destructive)), hsl(var(--primary)))' }} />
        </div>
      </div>

      {/* ═══════ MAIN ═══════ */}
      <div className="relative z-10 lg:ml-[280px] 2xl:mr-[340px]">

        {/* ══════ HERO ══════ */}
        <section ref={heroRef} id="hero" className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden scroll-mt-24">
          <motion.img src={heroImg} alt="Centro de vigilância financeira governamental"
            style={{ y: heroY, scale: heroScale }}
            className="absolute inset-0 w-full h-full object-cover will-change-transform" />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, rgba(5,8,8,0.5) 30%, rgba(5,8,8,0.92) 70%, rgba(5,8,8,1) 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 30%, rgba(5,8,8,0.85) 100%)',
          }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.08),_transparent_60%)]" />

          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-20 pb-12 md:pb-20">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumbs */}
              <motion.nav custom={0} variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
                aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] font-mono" itemScope itemType="https://schema.org/BreadcrumbList">
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors" itemProp="item"><span itemProp="name">Home</span></Link>
                    <meta itemProp="position" content="1" />
                  </li>
                  <ChevronRight className="text-muted-foreground/30" size={10} />
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link to="/alertas" className="text-muted-foreground hover:text-foreground transition-colors" itemProp="item"><span itemProp="name">Alertas</span></Link>
                    <meta itemProp="position" content="2" />
                  </li>
                  <ChevronRight className="text-muted-foreground/30" size={10} />
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <span className="text-destructive" itemProp="name">Fim do Dinheiro Vivo</span>
                    <meta itemProp="position" content="3" />
                  </li>
                </ol>
              </motion.nav>

              <motion.div custom={1} variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
                className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-destructive/30 animate-[ping_2s_ease-in-out_infinite]" />
                  <AlertTriangle className="relative w-5 h-5 text-destructive" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-destructive uppercase font-bold">Alerta Legislativo · Status: Ativo</span>
              </motion.div>

              <motion.h1 custom={2} variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
                O Governo Quer<br />
                <span className="text-destructive">Limitar Seu Dinheiro</span>
              </motion.h1>

              <motion.p custom={3} variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
                O Projeto de Lei <span className="text-foreground font-semibold">PL 3.951/2019</span> abriu caminho para que o governo brasileiro
                estabeleça <span className="text-destructive font-semibold">limites ao uso de dinheiro em espécie</span>. O limite pode ser definido
                a qualquer momento pelo Conselho Monetário Nacional.
              </motion.p>

              {/* Stats trio */}
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
                className="grid grid-cols-3 gap-3 max-w-lg mb-8">
                {[
                  { value: 'PL 3.951', label: 'Projeto de Lei' },
                  { value: 'CCJ', label: 'Aprovado na Comissão' },
                  { value: '∞', label: 'Precedente Aberto' },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-sm border border-destructive/20 bg-destructive/[0.04] text-center">
                    <p className="text-xl md:text-2xl font-display font-bold text-destructive mb-0.5">{s.value}</p>
                    <p className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div custom={5} variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
                className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollTo('ferramentas')}
                  className="group inline-flex items-center gap-3 py-4 px-10 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.15] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
                  style={{ animation: 'ctaPulse 3s ease-in-out infinite' }}>
                  <Shield className="w-4 h-4" />
                  Ver Como Se Proteger
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </button>
                <button onClick={() => scrollTo('video')}
                  className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-sm border border-border/30 bg-card/30 hover:bg-card/50 text-foreground font-semibold text-sm transition-all">
                  <Play size={14} /> Assistir Vídeo
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        <style>{`@keyframes ctaPulse{0%,100%{box-shadow:0 0 0 hsl(var(--primary)/0)}50%{box-shadow:0 0 30px hsl(var(--primary)/0.12)}}`}</style>

        {/* ══════ CONTENT ══════ */}
        <div className="px-6 md:px-12 lg:px-20 pb-32">
          <div className="max-w-5xl mx-auto">

            {/* ── VÍDEO ── */}
            <NobelSection id="video" className="pt-20 md:pt-28 mb-20 scroll-mt-24">
              <div className="flex items-center gap-3 mb-3">
                <Play className="w-4 h-4 text-destructive" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-destructive uppercase">Evidência · Fonte Oficial</span>
              </div>
              <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-8">
                Assista ao <span className="text-destructive">Vídeo Completo</span>
              </h2>
              <div className="rounded-sm overflow-hidden border border-border/30 bg-card/30">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/V2HZvWVj-F0"
                    title="Senador Oriovisto Guimarães sobre limite de dinheiro vivo — TV Senado"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen loading="lazy" />
                </div>
                <div className="p-6 border-t border-border/20">
                  <h3 className="text-foreground font-bold text-sm tracking-tight mb-2">Senador Oriovisto Guimarães — Limite ao Dinheiro Vivo no Brasil</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Entrevista oficial da <span className="text-foreground/80 font-medium">TV Senado</span> (1,82 mi de inscritos) com o senador Oriovisto Guimarães (PSDB-PR),
                    abordando o PL 3.951/2019 e as implicações de limitar transações em dinheiro em espécie no Brasil.
                  </p>
                </div>
              </div>
            </NobelSection>

            {/* ── PL 3951 — O PRECEDENTE ── */}
            <NobelSection id="pl3951" className="mb-20 scroll-mt-24">
              <div className="flex items-center gap-3 mb-3">
                <Scale className="w-4 h-4 text-destructive" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-destructive uppercase">Capítulo 01 · O Mecanismo Legal</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                PL 3.951/2019 — <span className="text-destructive">O Precedente</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed mb-8">
                A Comissão de Constituição e Justiça (CCJ) aprovou o <span className="text-foreground font-semibold">PL 3.951/2019</span>,
                que abre a possibilidade de estabelecer limites para transações realizadas em dinheiro vivo no Brasil.
              </p>
            </NobelSection>

            <NobelSection className="mb-12">
              <div className="rounded-sm border border-border/30 bg-card/30 p-8 md:p-12 space-y-6">
                <h3 className="font-display text-xl font-bold tracking-tight">O Que Esse Projeto Faz</h3>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>A CCJ aprovou o <span className="text-foreground font-semibold">PL 3.951/2019</span>, que abre a possibilidade de estabelecer limites para transações realizadas em dinheiro vivo no Brasil. Na tentativa inicial, o texto buscava <span className="text-destructive font-semibold">ilegalizar e tornar passível de confisco</span> transações acima de R$ 10.000 feitas em espécie ou boleto. Diante da resistência, recuaram para uma versão mais "leve" — mas o precedente já foi aberto.</p>
                  <p>O projeto ainda <span className="text-foreground font-semibold">não define limites exatos</span>. E é exatamente aí que mora o perigo. Ele cria o <span className="text-destructive font-semibold">mecanismo legal</span> para que, no futuro, o governo possa definir qualquer limite que desejar: R$ 10.000 hoje, R$ 5.000 amanhã, R$ 1.000 depois.</p>
                  <p>O <span className="text-foreground font-semibold">Conselho Monetário Nacional</span> (CMN) — o mesmo órgão que já executou o confisco da poupança em 1990 — ficaria responsável por definir esses limites. A história se repete.</p>
                </div>
              </div>
            </NobelSection>

            {/* O que NÃO faz vs o que FAZ */}
            <NobelSection className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-sm border border-border/30 bg-card/30 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-5">
                    <CheckCircle2 className="text-emerald-500" size={14} />
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider">O Que o PL NÃO Faz</h3>
                  </div>
                  <div className="space-y-3">
                    {PL_NAO_FAZ.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <XCircle className="text-emerald-500/60 shrink-0" size={14} />
                        <p className="text-muted-foreground text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-sm border-2 border-destructive/30 bg-destructive/[0.04] p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-5">
                    <AlertTriangle className="text-destructive" size={14} />
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-destructive">Mas O Que Ele Faz É Pior</h3>
                  </div>
                  <p className="text-foreground font-semibold text-sm leading-relaxed">{PL_MAS_FAZ}</p>
                </div>
              </div>
            </NobelSection>

            {/* Escada da Restrição */}
            <NobelSection className="mb-28">
              <div className="rounded-sm border border-destructive/20 bg-card/30 p-8 md:p-12">
                <div className="flex items-center gap-2 mb-8">
                  <AlertTriangle className="text-destructive" size={14} />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider">A Escada da Restrição</h3>
                </div>
                <div className="relative pl-8 space-y-8">
                  <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-destructive/50 via-destructive/20 to-transparent" />
                  {ESCADA_RESTRICAO.map((step, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.1 }}
                      className="relative">
                      <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-destructive border-2 border-background" />
                      <span className="text-destructive font-display text-2xl font-bold">{step.valor}</span>
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </NobelSection>

            {/* ── AGENDA GLOBAL ── */}
            <NobelSection id="agenda-global" className="mb-12 scroll-mt-24">
              <ChapterKickoff
                image={agendaImg}
                alt="Mapa global de vigilância financeira"
                number="Capítulo 02 · O Mapa do Controle"
                title="A Agenda Global"
                subtitle="O Brasil não está inventando a roda. Essa agenda já está avançada na Europa."
              />
            </NobelSection>

            <NobelSection className="mb-12">
              <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-3xl">
                Andar com dinheiro vivo acima de certos valores já é considerado <span className="text-foreground font-semibold">crime na Europa</span>.
                Veja o mapa de restrições que o Estado já impôs em outras jurisdições:
              </p>
              <div className="rounded-sm border border-border/30 bg-card/30 overflow-hidden">
                <div className="grid grid-cols-[1fr_110px_90px] border-b border-border/20 bg-card/50">
                  <div className="p-4"><span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground">País</span></div>
                  <div className="p-4"><span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground">Limite</span></div>
                  <div className="p-4"><span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground">Status</span></div>
                </div>
                {LIMITES_INTERNACIONAIS.map((row, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                    className={`grid grid-cols-[1fr_110px_90px] group hover:bg-destructive/[0.03] transition-colors ${i < LIMITES_INTERNACIONAIS.length - 1 ? 'border-b border-border/10' : ''}`}>
                    <div className="p-4 flex items-center gap-2">
                      <span className="text-lg">{row.flag}</span>
                      <span className="text-foreground font-semibold text-sm">{row.pais}</span>
                    </div>
                    <div className="p-4"><span className="text-destructive font-bold text-sm font-mono">{row.limite}</span></div>
                    <div className="p-4"><span className="text-xs font-bold text-amber-500/80 uppercase tracking-wider">{row.status}</span></div>
                  </motion.div>
                ))}
                <div className="grid grid-cols-[1fr_110px_90px] bg-destructive/[0.06] border-t border-destructive/20">
                  <div className="p-4 flex items-center gap-2">
                    <span className="text-lg">🇧🇷</span>
                    <span className="text-foreground font-bold text-sm">Brasil</span>
                  </div>
                  <div className="p-4"><span className="text-destructive font-bold text-sm font-mono italic">Em definição</span></div>
                  <div className="p-4"><span className="text-xs font-bold text-destructive uppercase tracking-wider animate-pulse">Alerta</span></div>
                </div>
              </div>
            </NobelSection>

            <NobelSection className="mb-28">
              <blockquote className="relative p-8 md:p-12 rounded-sm border border-border/20 bg-card/20">
                <div className="absolute -top-4 left-8 text-6xl text-destructive/20 font-serif">"</div>
                <p className="text-foreground/90 font-display text-lg md:text-xl font-bold leading-relaxed italic mb-3">
                  Esse processo raramente acontece de forma abrupta. Ele acontece gradualmente — um limite de cada vez, uma justificativa de cada vez — até que o dinheiro físico simplesmente deixe de existir como opção.
                </p>
              </blockquote>
            </NobelSection>

            {/* ── LINHA DO TEMPO ── */}
            <NobelSection id="timeline" className="mb-28 scroll-mt-24">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-4 h-4 text-destructive" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-destructive uppercase">Capítulo 03 · O Cerco</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Linha do Tempo do <span className="text-destructive">Controle</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-2xl">
                O cerco não começou ontem. Cada passo foi calculado para <span className="text-foreground font-semibold">normalizar o controle</span> antes de apertar o próximo parafuso.
              </p>

              <div className="relative pl-8">
                <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-destructive/50 via-destructive/20 to-transparent" />
                <div className="space-y-8">
                  {TIMELINE_ITEMS.map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.08 }}
                      className="relative group">
                      <div className={`absolute -left-8 top-1 w-3 h-3 rounded-full border-2 border-background transition-colors ${
                        i === TIMELINE_ITEMS.length - 1 ? 'bg-destructive' : 'bg-destructive/50 group-hover:bg-destructive'
                      }`} />
                      <div className="rounded-sm border border-border/30 bg-card/30 p-6 group-hover:border-destructive/20 transition-colors">
                        <span className="text-destructive font-mono font-bold text-xs">{item.ano}</span>
                        <h3 className="text-foreground font-bold text-sm tracking-tight mt-1 mb-2">{item.evento}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </NobelSection>

            {/* ── CONSEQUÊNCIAS ── */}
            <NobelSection id="consequencias" className="mb-28 scroll-mt-24">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-4 h-4 text-destructive" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-destructive uppercase">Capítulo 04 · O Impacto</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                O Que Muda <span className="text-destructive">Pra Você</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-2xl">
                Quando todo dinheiro se torna digital e rastreável, <span className="text-foreground font-semibold">três pilares da sua liberdade financeira</span> são destruídos simultaneamente.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {CONSEQUENCIAS.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.1 }}
                    className="group relative p-6 md:p-8 rounded-sm border border-destructive/15 bg-card/30 hover:border-destructive/40 hover:bg-card/50 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-destructive/30 to-transparent group-hover:via-destructive/60 transition-all duration-500" />
                    <div className="relative w-10 h-10 mb-4 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-destructive/10 animate-[pulse_3s_ease-in-out_infinite] group-hover:bg-destructive/20" />
                      <item.icon className="relative w-5 h-5 text-destructive transition-transform group-hover:scale-110" />
                    </div>
                    <h3 className="text-foreground font-bold text-sm tracking-tight mb-2 group-hover:text-destructive transition-colors">{item.titulo}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.descricao}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-destructive/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            </NobelSection>

            {/* ── A CONTRADIÇÃO FATAL ── */}
            <NobelSection id="contradicao" className="mb-28 scroll-mt-24">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-4 h-4 text-destructive" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-destructive uppercase">Capítulo 05 · O Paradoxo</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-8">
                A Contradição <span className="text-destructive">Fatal</span>
              </h2>
              <div className="rounded-sm border border-border/30 bg-card/30 p-8 md:p-12 space-y-6 text-muted-foreground leading-relaxed">
                <p>Existe uma <span className="text-foreground font-semibold">contradição brutal</span> entre muitos que se dizem libertários e ao mesmo tempo te incentivam a entregar informações financeiras desnecessárias ao governo. O argumento deles é simples: <em className="text-foreground/80">"Não tem problema nenhum o governo saber quanto Bitcoin você tem"</em>.</p>
                
                <div className="border-2 border-destructive/20 bg-destructive/[0.04] rounded-sm p-8">
                  <p className="text-destructive font-mono font-bold uppercase tracking-[0.3em] text-[9px] mb-4">O Teste Da Realidade</p>
                  <p className="text-foreground font-display text-lg font-bold leading-tight">
                    Você dormiria tranquilo sabendo que organizações criminosas sabem exatamente quanto Bitcoin, stablecoins e patrimônio você possui?
                  </p>
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                    Se a resposta é não, então por que você confia essa mesma informação ao governo — uma organização que historicamente já confiscou, bloqueou e manipulou o patrimônio dos cidadãos?
                  </p>
                </div>
                
                <p>Não estou falando para sonegar. Estou falando para <span className="text-foreground font-semibold">manter o poder na sua mão</span> — e você decidir, com soberania, o que fazer em seguida.</p>
                <p>Privacidade financeira não é crime. É um <span className="text-foreground font-semibold">direito natural</span>. E quem tenta convencer você do contrário está, conscientemente ou não, trabalhando contra a sua soberania individual.</p>
              </div>
            </NobelSection>

            {/* ── O ERRO ── */}
            <NobelSection className="mb-28">
              <div className="relative rounded-sm border-2 border-primary/20 bg-card/30 p-8 md:p-12 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.04),_transparent_60%)]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <AlertTriangle className="text-primary" size={14} />
                    <span className="text-primary font-mono font-bold uppercase tracking-[0.3em] text-[9px]">Atenção</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-6">
                    O Erro Que <span className="text-primary italic">Quase Todos Cometem</span>
                  </h3>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>A maioria das pessoas acredita que o problema é apenas <span className="text-foreground font-semibold">inflação ou impostos</span>. Mas essas são consequências — não a causa.</p>
                    <p>O problema real é <span className="text-destructive font-semibold">controle sobre o dinheiro</span>. Quando o Estado decide que você precisa de permissão para gastar, quando cada transação é monitorada — aí inflação e impostos se tornam o menor dos seus problemas.</p>
                    <p className="text-foreground font-semibold text-sm uppercase tracking-wider">As ferramentas abaixo atacam a causa — não os sintomas.</p>
                  </div>
                </div>
              </div>
            </NobelSection>

            {/* ── ARSENAL DE PRIVACIDADE ── */}
            <NobelSection id="ferramentas" className="mb-12 scroll-mt-24">
              <ChapterKickoff
                image={arsenalImg}
                alt="Ferramentas de soberania financeira e Bitcoin"
                number="Capítulo 06 · A Saída"
                title="Arsenal de Privacidade"
                subtitle="Ferramentas legítimas e completamente legais para proteger sua soberania financeira."
              />
            </NobelSection>

            <NobelSection className="mb-12">
              <p className="text-muted-foreground text-base leading-relaxed mb-2 max-w-3xl">
                Existem <span className="text-foreground font-semibold">ferramentas legítimas e completamente legais</span> para proteger sua soberania financeira contra o limite de dinheiro vivo no Brasil. Cada ferramenta funciona como uma <span className="text-primary font-semibold">camada de proteção</span>.
              </p>
              <p className="text-primary/70 text-xs font-mono font-bold uppercase tracking-wider mb-10">
                ⚠ Todas as ferramentas são legais. Utilize com responsabilidade.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {FERRAMENTAS.map((tool, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.1 }}
                    className="group relative p-6 md:p-8 rounded-sm border border-primary/15 bg-card/30 hover:border-primary/40 hover:bg-card/50 transition-all duration-500 overflow-hidden"
                    style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.04), inset 0 1px 0 hsl(var(--primary) / 0.06)' }}>
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/50 transition-all duration-500" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                        <div className="absolute inset-0 rounded-full bg-primary/10 animate-[pulse_3s_ease-in-out_infinite] group-hover:bg-primary/20" />
                        <tool.icon className="relative w-5 h-5 text-primary transition-transform group-hover:scale-110" />
                      </div>
                      <div>
                        <h3 className="text-foreground font-bold text-sm tracking-tight group-hover:text-primary transition-colors">{tool.titulo}</h3>
                        <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{tool.subtitulo}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-4">{tool.descricao}</p>
                    <div className="rounded-sm bg-primary/[0.04] border border-primary/15 p-3">
                      <p className="text-primary/80 text-[11px] font-bold leading-relaxed">{tool.destaque}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            </NobelSection>

            {/* CTA Autocustódia */}
            <NobelSection className="mb-28">
              <div className="flex flex-col items-center text-center">
                <Link to="/autocustodia"
                  className="group inline-flex items-center gap-3 py-4 px-10 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.15] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
                  style={{ animation: 'ctaPulse 3s ease-in-out infinite' }}>
                  <Lock className="w-4 h-4" />
                  Aprender Autocustódia Agora
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground/40 uppercase mt-3">
                  O primeiro passo para proteger seu patrimônio
                </p>
              </div>
            </NobelSection>

            {/* ── AUTORIDADE ── */}
            <NobelSection id="autoridade" className="mb-28 scroll-mt-24">
              <div className="relative overflow-hidden rounded-sm border border-primary/20 bg-card/30 p-10 md:p-14"
                style={{ animation: 'ctaPulse 4s ease-in-out infinite' }}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.06),_transparent_60%)]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="text-primary" size={14} />
                    <span className="text-primary font-mono font-bold uppercase tracking-[0.3em] text-[9px]">Formação Avançada</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
                    Aprenda a Proteger<br />
                    <span className="text-primary italic">Sua Liberdade Financeira</span>
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-2xl">
                    Na <span className="text-primary font-semibold">Universidade Satoshi</span> você aprende estratégias avançadas de privacidade financeira,
                    Bitcoin com autocustódia, teoria das bandeiras e internacionalização.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: BookOpen, label: 'Bitcoin Avançado' },
                      { icon: Globe, label: 'Internacionalização' },
                      { icon: ShieldAlert, label: 'Privacidade Total' },
                    ].map((item, i) => (
                      <div key={i} className="border border-primary/15 bg-primary/[0.03] rounded-sm p-4 text-center">
                        <item.icon className="text-primary mx-auto mb-2" size={20} />
                        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary/80">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <a href="#" target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 py-4 px-10 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.15] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300">
                    <GraduationCap className="w-4 h-4" />
                    Assumir Minha Soberania Financeira
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </a>
                </div>
              </div>
            </NobelSection>

            {/* ── RISK BLOCK ── */}
            <NobelSection className="mb-28">
              <RiskBlock
                title="Sem proteção financeira, o que acontece?"
                showImage
                consequences={[
                  'Cada transação da sua vida monitorada em tempo real — café, presente, doação, tudo rastreado.',
                  'Patrimônio congelado ou confiscado com um clique, sem aviso, sem julgamento, sem recurso.',
                  'Privacidade financeira eliminada permanentemente — economia informal deixa de existir.',
                  'Dependência total de um sistema que já provou ser capaz de confiscar (1990).',
                  'Sem saída: sem dinheiro vivo, sem P2P, sem autocustódia — você é refém digital.',
                ]}
              />
            </NobelSection>

            {/* ── FAQ ── */}
            <NobelSection id="faq" className="mb-28 scroll-mt-24">
              <div className="flex items-center gap-3 mb-3">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">Capítulo 07 · FAQ</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-8">
                Perguntas <span className="text-primary">Frequentes</span>
              </h2>
              <div className="space-y-2">
                {FAQ_ITEMS.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="rounded-sm border border-border/30 bg-card/30 overflow-hidden">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-card/50 transition-colors">
                      <h3 className="text-foreground font-semibold text-sm leading-snug pr-4">{item.pergunta}</h3>
                      <ChevronDown className={`text-primary shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={16} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-6 border-t border-border/20 pt-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.resposta}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </NobelSection>

            {/* ── CONCLUSÃO ── */}
            <NobelSection id="conclusao" className="mb-28 scroll-mt-24">
              <div className="relative p-10 md:p-16 rounded-sm border-2 border-destructive/30 bg-card/30 overflow-hidden text-center"
                style={{ animation: 'borderPulse 3s ease-in-out infinite' }}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--destructive)/0.04),_transparent_60%)]" />
                <div className="relative z-10">
                  <p className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
                    O Poder Fica
                  </p>
                  <p className="font-display text-2xl md:text-4xl font-bold tracking-tight text-destructive italic mb-8">
                    Na Sua Mão.
                  </p>
                  <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto mb-8">
                    O dinheiro físico foi a última fronteira de privacidade financeira acessível a qualquer pessoa.
                    Mas a tecnologia também criou uma saída. O <span className="text-foreground font-semibold">Bitcoin</span>, as exchanges P2P,
                    a teoria das bandeiras — tudo isso existe para devolver o que o sistema tenta tirar.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Link to="/autocustodia"
                      className="group inline-flex items-center gap-3 py-4 px-10 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.15] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300">
                      <Lock className="w-4 h-4" />
                      Aprender Autocustódia
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                    {[
                      { to: '/economia-paralela', titulo: 'Economia Paralela', desc: 'Operar fora do sistema' },
                      { to: '/pix-cripto', titulo: 'PIX → Cripto', desc: 'Converter sem intermediários' },
                      { to: '/alertas', titulo: 'Central de Alertas', desc: 'Todos os alertas ativos' },
                    ].map((link, i) => (
                      <Link key={i} to={link.to}
                        className="rounded-sm border border-border/30 bg-card/30 px-4 py-3 hover:bg-card/50 hover:border-border/50 transition-all group flex items-center justify-between">
                        <div>
                          <span className="text-foreground/80 font-bold text-[10px] uppercase tracking-wider font-mono">{link.titulo}</span>
                          <span className="text-muted-foreground/50 text-[9px] font-bold uppercase tracking-wider ml-2">{link.desc}</span>
                        </div>
                        <ChevronRight className="text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <style>{`@keyframes borderPulse{0%,100%{border-color:hsl(var(--destructive)/.2);box-shadow:0 0 10px hsl(var(--destructive)/.02)}50%{border-color:hsl(var(--destructive)/.5);box-shadow:0 0 30px hsl(var(--destructive)/.08)}}`}</style>
            </NobelSection>

            {/* ── LEIA TAMBÉM ── */}
            <NobelSection className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Leia Também</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { to: '/alertas', titulo: 'Central de Alertas', desc: 'Todos os alertas de soberania', tag: 'HUB' },
                  { to: '/economia-paralela', titulo: 'Economia Paralela', desc: 'Como operar fora do sistema bancário', tag: 'ESTRATÉGIA' },
                  { to: '/bitcoin/o-que-e', titulo: 'O Que é o Bitcoin', desc: 'Do zero à soberania financeira completa', tag: 'FUNDAMENTO' },
                ].map((link, i) => (
                  <Link key={i} to={link.to}
                    className="group rounded-sm border border-border/30 bg-card/30 p-6 hover:border-primary/30 hover:bg-card/50 transition-all">
                    <span className="text-[8px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/50">{link.tag}</span>
                    <h3 className="text-foreground font-bold text-sm tracking-tight mt-2 mb-1 group-hover:text-primary transition-colors">{link.titulo}</h3>
                    <p className="text-muted-foreground/70 text-xs leading-relaxed">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </NobelSection>

            {/* ── SEO RICH TEXT ── */}
            <NobelSection className="mb-20">
              <div className="space-y-4 text-muted-foreground/60 text-xs leading-relaxed max-w-3xl">
                <p><span className="text-muted-foreground">Sobre este conteúdo:</span> Esta página aborda o impacto do PL 3.951/2019 na privacidade financeira dos brasileiros, as restrições ao dinheiro vivo já implementadas na Europa e as ferramentas legítimas disponíveis para proteger sua soberania financeira. O conteúdo não constitui aconselhamento financeiro ou jurídico.</p>
                <p><span className="text-muted-foreground">Temas abordados:</span> limite de dinheiro vivo no Brasil, PL 3951/2019, governo proibir dinheiro em espécie, como comprar Bitcoin sem KYC, privacidade financeira, comprar Bitcoin P2P, teoria das bandeiras, exchanges descentralizadas, autocustódia Bitcoin, como proteger dinheiro do governo.</p>
              </div>
            </NobelSection>

            <ContraAtaquePratico theme="dark" />

            {/* ── FOOTER ── */}
            <footer className="pt-16 border-t border-border/20">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-primary/30" />
                  <p className="font-mono text-[9px] tracking-[0.4em] text-muted-foreground/40 uppercase">Privacidade financeira é um direito, não um crime.</p>
                  <div className="h-px w-12 bg-primary/30" />
                </div>
                <p className="font-display text-2xl md:text-4xl font-bold tracking-tight text-foreground italic">Sempre foi projeto.</p>
                <p className="text-muted-foreground/30 text-[9px] font-mono font-bold tracking-[0.5em] uppercase pt-8">Lord Junnior © 2026</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
