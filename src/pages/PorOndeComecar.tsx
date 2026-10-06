import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, Compass, Shield, Coins, Globe, BookOpen, Zap, Target, ListChecks } from "lucide-react";
import FixedThematicBackground from "@/components/backgrounds/FixedThematicBackground";
import bgPorOndeComecar from "@/assets/backgrounds/bg-por-onde-comecar.webp";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import NetworkTicker from "@/components/NetworkTicker";
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';
import { Button } from "@/components/ui/button";
import { START_PROFILES, type StartProfile } from "@/data/startProfiles";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface QuizOption {
  label: string;
  icon: typeof Shield;
  description: string;
  value: string;
}

interface QuizStep {
  id: string;
  question: string;
  subtitle: string;
  options: QuizOption[];
}

const QUIZ_STEPS: QuizStep[] = [
  {
    id: "bitcoin",
    question: "Você já tem Bitcoin?",
    subtitle: "Não se preocupe. Toda jornada começa aqui.",
    options: [
      { label: "Nunca comprei", icon: BookOpen, description: "Preciso entender o que é Bitcoin primeiro", value: "never" },
      { label: "Tenho em corretora", icon: Coins, description: "Comprei mas está numa exchange", value: "exchange" },
      { label: "Já faço autocustódia", icon: Shield, description: "Minhas chaves, minhas moedas", value: "self-custody" },
    ],
  },
  {
    id: "objetivo",
    question: "Qual o seu objetivo principal?",
    subtitle: "Isso define a trilha que vamos montar pra você.",
    options: [
      { label: "Proteger patrimônio", icon: Shield, description: "Blindar contra inflação e confisco", value: "protect" },
      { label: "Sair do sistema fiat", icon: Globe, description: "Diversificar jurisdições e contas", value: "exit" },
      { label: "Autonomia total", icon: Target, description: "Alimento, saúde, energia e comunicação", value: "autonomy" },
      { label: "Aprender tudo", icon: BookOpen, description: "Quero a formação completa", value: "all" },
    ],
  },
  {
    id: "urgencia",
    question: "Qual o seu nível de urgência?",
    subtitle: "Isso ajuda a priorizar o que vem primeiro.",
    options: [
      { label: "Começando agora", icon: Compass, description: "Tenho tempo, quero aprender direito", value: "calm" },
      { label: "Preciso agir rápido", icon: Zap, description: "Sinto que o tempo está acabando", value: "urgent" },
    ],
  },
];

interface Recommendation {
  title: string;
  description: string;
  path: string;
  icon: typeof Shield;
  tag: string;
}

function getRecommendations(answers: Record<string, string>): Recommendation[] {
  const recs: Recommendation[] = [];
  const bitcoin = answers.bitcoin;
  const objetivo = answers.objetivo;
  const urgencia = answers.urgencia;

  // Bitcoin level routing
  if (bitcoin === "never") {
    recs.push(
      { title: "O que é Bitcoin?", description: "Fundamento zero. Entenda antes de comprar", path: "/bitcoin/o-que-e", icon: BookOpen, tag: "ESSENCIAL" },
      { title: "Protocolo Inicial", description: "Seu primeiro passo concreto na soberania", path: "/protocolo-inicial", icon: Target, tag: "COMEÇAR AQUI" },
    );
  } else if (bitcoin === "exchange") {
    recs.push(
      { title: "Autocustódia", description: "Tire da corretora. Suas chaves, suas moedas", path: "/autocustodia", icon: Shield, tag: "URGENTE" },
      { title: "Blindagem contra Golpes", description: "Proteja-se antes de mover fundos", path: "/blindagem-golpes", icon: Shield, tag: "SEGURANÇA" },
    );
  } else if (bitcoin === "self-custody") {
    recs.push(
      { title: "Bitcoin Seguro", description: "Eleve sua segurança ao próximo nível", path: "/bitcoin-seguro", icon: Shield, tag: "AVANÇADO" },
    );
  }

  // Objective routing
  if (objetivo === "protect") {
    recs.push(
      { title: "Inflação: Imposto Oculto", description: "Entenda a máquina que corrói seu dinheiro", path: "/inflacao-imposto-oculto", icon: Coins, tag: "ENTENDER" },
      { title: "21 Milhões", description: "A escassez que protege seu patrimônio", path: "/21-milhoes", icon: Coins, tag: "FUNDAMENTO" },
    );
  } else if (objetivo === "exit") {
    recs.push(
      { title: "Soberania Financeira", description: "Contas internacionais e diversificação", path: "/soberania-financeira", icon: Globe, tag: "ESTRATÉGIA" },
      { title: "Teoria das Bandeiras", description: "Diversificação geopolítica de ativos", path: "/teoria-das-bandeiras", icon: Globe, tag: "AVANÇADO" },
    );
  } else if (objetivo === "autonomy") {
    recs.push(
      { title: "Soberania Orgânica", description: "Alimento, saúde, energia e sobrevivência", path: "/soberania-organica", icon: Target, tag: "PRÁTICA" },
      { title: "Kit 72h", description: "Seu kit de emergência essencial", path: "/soberania-organica/kit-72h", icon: Zap, tag: "PRIORITÁRIO" },
    );
  } else if (objetivo === "all") {
    recs.push(
      { title: "Educação", description: "Trilha de formação completa", path: "/educacao", icon: BookOpen, tag: "TRILHA" },
      { title: "Mapa da Soberania", description: "Veja sua jornada completa", path: "/mapa-da-soberania", icon: Compass, tag: "MAPA" },
    );
  }

  // Urgency routing
  if (urgencia === "urgent" && bitcoin !== "self-custody") {
    recs.unshift(
      { title: "Comprar Bitcoin Anônimo", description: "Compre agora, sem KYC, fora do radar", path: "/comprar-bitcoin-com-privacidade", icon: Zap, tag: "AÇÃO IMEDIATA" },
    );
  }

  // Deduplicate by path
  const seen = new Set<string>();
  return recs.filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  }).slice(0, 5);
}

export default function PorOndeComecar() {
  const [mode, setMode] = useState<"profiles" | "quiz">("profiles");
  const [selectedProfileId, setSelectedProfileId] = useState<StartProfile["id"] | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const currentStep = QUIZ_STEPS[step];
  const totalSteps = QUIZ_STEPS.length;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentStep.id]: value };
    setAnswers(newAnswers);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const recommendations = showResults ? getRecommendations(answers) : [];
  const selectedProfile = START_PROFILES.find((profile) => profile.id === selectedProfileId);

  const selectProfile = (id: StartProfile["id"]) => {
    setSelectedProfileId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openQuiz = () => {
    setMode("quiz");
    setSelectedProfileId(null);
    handleRestart();
  };

  const openProfiles = () => {
    setMode("profiles");
    setSelectedProfileId(null);
    handleRestart();
  };

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <link rel="canonical" href={canonicalUrl('/por-onde-comecar')} />
        <meta property="og:url" content={canonicalUrl('/por-onde-comecar')} />
        <title>Por Onde Começar? Escolha sua trilha | Lord Junnior</title>
        <meta name="description" content="Escolha seu perfil ou faça um diagnóstico rápido para começar sua jornada de soberania, privacidade mobile e Bitcoin sem KYC." />
      </Helmet>

      <div className="min-h-screen text-foreground">
        <FixedThematicBackground image={bgPorOndeComecar} intensity="heavy" />
        <AppSidebar />
        <MobileNav />
        <RightSidebar />

        <div className="relative z-10 lg:ml-[280px] 2xl:mr-[340px] pb-10 min-h-screen flex flex-col">
          {/* Back */}
          <div className="px-5 md:px-8 pt-6">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono tracking-wider text-xs">VOLTAR</span>
            </Link>
          </div>

          {/* HERO CINEMATOGRÁFICO */}
          {mode === "profiles" && !selectedProfile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="px-5 md:px-8 pt-10 pb-6 max-w-4xl mx-auto w-full text-center"
            >
              <p className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-5">Ponto de entrada</p>
              <h1 className="font-impact text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.92] text-foreground mb-6">
                Comece pelo risco<br />
                <span className="font-editorial italic text-primary normal-case">que você quer reduzir.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
                Escolha o cenário mais próximo da sua realidade. Você recebe três leituras em ordem, sem precisar percorrer o site inteiro.
              </p>
              <div className="flex items-center justify-center gap-6 mt-8 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60">
                <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary animate-pulse" /> 3 perfis</span>
                <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary animate-pulse" /> 3 passos</span>
                <span className="hidden sm:flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary animate-pulse" /> Ordem prática</span>
              </div>
            </motion.div>
          )}

          {/* Content */}
          <div className="flex-1 flex items-center justify-center px-5 md:px-8 py-8 md:py-12">
            <div className={mode === "profiles" && !selectedProfile ? "w-full max-w-5xl" : "w-full max-w-2xl"}>
              <AnimatePresence mode="wait">
                {mode === "profiles" && !selectedProfile ? (
                  <motion.section
                    key="profile-picker"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    aria-labelledby="profile-heading"
                  >
                    <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-2">Escolha direta</p>
                        <h2 id="profile-heading" className="text-2xl md:text-3xl font-bold text-foreground">Qual situação descreve você hoje?</h2>
                      </div>
                      <p className="max-w-xs text-sm text-muted-foreground sm:text-right">Você pode trocar de perfil a qualquer momento.</p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3" role="list">
                      {START_PROFILES.map((profile, index) => (
                        <motion.div key={profile.id} role="listitem" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + index * 0.08, ease: EASE }}>
                          <Button
                            variant="ghost"
                            onClick={() => selectProfile(profile.id)}
                            className="group h-full min-h-[255px] w-full whitespace-normal rounded-lg border border-border/70 bg-card/70 p-6 text-left backdrop-blur-md hover:border-primary/50 hover:bg-card focus-visible:ring-offset-0"
                            aria-label={`Escolher perfil: ${profile.title}`}
                          >
                            <span className="flex h-full w-full flex-col items-start">
                              <span className="mb-7 flex w-full items-center justify-between">
                                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                                  <profile.icon className="h-5 w-5" />
                                </span>
                                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">{profile.eyebrow}</span>
                              </span>
                              <span className="mb-3 block text-lg font-bold leading-tight text-foreground">{profile.title}</span>
                              <span className="block text-sm font-normal leading-relaxed text-muted-foreground">{profile.description}</span>
                              <span className="mt-auto flex w-full items-center justify-between border-t border-border/60 pt-5 text-xs text-primary">
                                Ver minha trilha
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </span>
                            </span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-col items-center justify-center gap-3 border-t border-border/50 pt-7 sm:flex-row">
                      <span className="text-sm text-muted-foreground">Nenhum perfil encaixa?</span>
                      <Button variant="outline" onClick={openQuiz} className="gap-2 bg-background/50">
                        <ListChecks className="h-4 w-4" /> Fazer diagnóstico de 3 perguntas
                      </Button>
                    </div>
                  </motion.section>
                ) : mode === "profiles" && selectedProfile ? (
                  <motion.section
                    key={selectedProfile.id}
                    initial={{ opacity: 0, x: 35 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -35 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    aria-labelledby="selected-profile-title"
                  >
                    <div className="mb-8 border-b border-border/60 pb-7">
                      <div className="mb-5 flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary"><selectedProfile.icon className="h-5 w-5" /></span>
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Trilha recomendada</p>
                      </div>
                      <h1 id="selected-profile-title" className="font-impact text-3xl font-black uppercase leading-none text-foreground md:text-5xl">{selectedProfile.title}</h1>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{selectedProfile.outcome}</p>
                    </div>

                    <ol className="space-y-3">
                      {selectedProfile.steps.map((item, index) => (
                        <motion.li key={item.path} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + index * 0.08 }}>
                          <Button asChild variant="ghost" className="group h-auto min-h-[96px] w-full justify-start whitespace-normal rounded-lg border border-border/60 bg-card/60 p-5 text-left hover:border-primary/40 hover:bg-card">
                            <Link to={item.path}>
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 font-mono text-xs font-bold text-primary">0{index + 1}</span>
                              <span className="min-w-0 flex-1">
                                <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-primary">{item.tag}</span>
                                <span className="block text-sm font-bold text-foreground">{item.title}</span>
                                <span className="mt-1 block text-xs font-normal leading-relaxed text-muted-foreground">{item.description}</span>
                              </span>
                              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                            </Link>
                          </Button>
                        </motion.li>
                      ))}
                    </ol>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                      <Button variant="ghost" onClick={openProfiles} className="gap-2 text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Trocar perfil</Button>
                      <Button variant="outline" onClick={openQuiz} className="gap-2 bg-background/50"><ListChecks className="h-4 w-4" /> Fazer diagnóstico completo</Button>
                    </div>
                  </motion.section>
                ) : !showResults ? (
                  <motion.div
                    key={`step-${step}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    {/* Progress */}
                    <div className="flex items-center gap-3 mb-8">
                      {QUIZ_STEPS.map((_, i) => (
                        <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-secondary">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: i <= step ? "100%" : "0%" }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="h-full gradient-gold rounded-full"
                          />
                        </div>
                      ))}
                      <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                        {step + 1}/{totalSteps}
                      </span>
                    </div>

                    {/* Question */}
                    <div className="mb-8">
                      <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-3">Diagnóstico de Soberania</p>
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{currentStep.question}</h1>
                      <p className="text-muted-foreground text-sm">{currentStep.subtitle}</p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      {currentStep.options.map((opt) => (
                        <motion.div
                          key={opt.value}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button variant="ghost" onClick={() => handleAnswer(opt.value)} className="group h-auto min-h-[76px] w-full justify-start whitespace-normal rounded-lg border border-border/50 bg-card/50 p-5 text-left hover:border-primary/30 hover:bg-primary/[0.04]">
                            <span className="p-2.5 rounded-lg bg-secondary/50 group-hover:bg-primary/10 transition-colors"><opt.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" /></span>
                            <span className="flex-1"><span className="block font-semibold text-sm text-foreground">{opt.label}</span><span className="block text-xs font-normal text-muted-foreground">{opt.description}</span></span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>

                    {/* Back step */}
                    {step > 0 && (
                      <Button variant="ghost" onClick={() => setStep(step - 1)} className="mt-6 px-0 text-xs text-muted-foreground font-mono tracking-wider">← VOLTAR</Button>
                    )}
                    {step === 0 && <Button variant="ghost" onClick={openProfiles} className="mt-6 px-0 text-xs text-muted-foreground font-mono tracking-wider">← ESCOLHER UM PERFIL</Button>}
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    {/* Header */}
                    <div className="text-center mb-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex p-4 rounded-full bg-primary/10 border border-primary/20 mb-5"
                      >
                        <Compass className="w-8 h-8 text-primary" />
                      </motion.div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Sua trilha está pronta.</h2>
                      <p className="text-muted-foreground text-sm">Baseado nas suas respostas, aqui está por onde começar:</p>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-3">
                      {recommendations.map((rec, i) => (
                        <motion.div
                          key={rec.path}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: EASE }}
                        >
                          <Button variant="ghost" onClick={() => navigate(rec.path)} className="group h-auto min-h-[82px] w-full justify-start whitespace-normal rounded-lg border border-border/50 bg-card/50 p-5 text-left hover:border-primary/30 hover:bg-primary/[0.04]">
                            <div className="relative">
                              <span className="absolute -top-2 -left-2 font-mono text-[9px] font-bold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-full">
                                {i + 1}
                              </span>
                              <div className="p-2.5 rounded-lg bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                                <rec.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-mono text-[8px] tracking-widest text-primary uppercase">{rec.tag}</span>
                              </div>
                              <p className="font-semibold text-sm text-foreground">{rec.title}</p>
                              <p className="text-xs text-muted-foreground">{rec.description}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all group-hover:translate-x-1" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>

                    {/* Restart */}
                    <div className="mt-8 text-center">
                      <Button variant="ghost" onClick={handleRestart} className="gap-2 text-xs text-muted-foreground font-mono tracking-wider">
                        <RotateCcw className="w-3.5 h-3.5" />
                        REFAZER DIAGNÓSTICO
                      </Button>
                      <Button variant="ghost" onClick={openProfiles} className="ml-2 text-xs text-muted-foreground font-mono tracking-wider">ESCOLHER PERFIL</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <NetworkTicker />
      </div>
    </>
  );
}
