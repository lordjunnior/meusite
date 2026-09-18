import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, Compass, Shield, Coins, Globe, BookOpen, Zap, Target } from "lucide-react";
import FixedThematicBackground from "@/components/backgrounds/FixedThematicBackground";
import bgPorOndeComecar from "@/assets/backgrounds/bg-por-onde-comecar.webp";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import NetworkTicker from "@/components/NetworkTicker";
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

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

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <link rel="canonical" href={canonicalUrl('/por-onde-comecar')} />
        <meta property="og:url" content={canonicalUrl('/por-onde-comecar')} />
        <title>Por Onde Começar? Encontre sua trilha | Lord Junnior</title>
        <meta name="description" content="Descubra por onde começar sua jornada de soberania individual. Um quiz rápido que direciona para o conteúdo certo pro seu nível." />
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
          {!showResults && step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="px-5 md:px-8 pt-10 pb-6 max-w-4xl mx-auto w-full text-center"
            >
              <p className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-5">Diagnóstico Operacional</p>
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.92] tracking-tighter text-foreground mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Toda jornada começa<br />
                <span className="italic font-serif text-primary normal-case tracking-tight">com a pergunta certa.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
                Você não precisa ler 97 páginas pra começar. Responda 3 perguntas e o sistema constrói uma trilha cirúrgica para o seu nível, seu objetivo e o seu tempo de reação.
              </p>
              <div className="flex items-center justify-center gap-6 mt-8 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60">
                <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary animate-pulse" /> 60 segundos</span>
                <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary animate-pulse" /> 3 perguntas</span>
                <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary animate-pulse" /> Trilha cirúrgica</span>
              </div>
            </motion.div>
          )}

          {/* Content */}
          <div className="flex-1 flex items-center justify-center px-5 md:px-8 py-12">
            <div className="w-full max-w-2xl">
              <AnimatePresence mode="wait">
                {!showResults ? (
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
                        <motion.button
                          key={opt.value}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(opt.value)}
                          className="w-full flex items-center gap-4 p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-300 text-left group"
                        >
                          <div className="p-2.5 rounded-lg bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                            <opt.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-foreground">{opt.label}</p>
                            <p className="text-xs text-muted-foreground">{opt.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all" />
                        </motion.button>
                      ))}
                    </div>

                    {/* Back step */}
                    {step > 0 && (
                      <button onClick={() => setStep(step - 1)} className="mt-6 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider">
                        ← VOLTAR
                      </button>
                    )}
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
                          <button
                            onClick={() => navigate(rec.path)}
                            className="w-full flex items-center gap-4 p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-300 text-left group"
                          >
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
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {/* Restart */}
                    <div className="mt-8 text-center">
                      <button onClick={handleRestart} className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider">
                        <RotateCcw className="w-3.5 h-3.5" />
                        REFAZER DIAGNÓSTICO
                      </button>
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
