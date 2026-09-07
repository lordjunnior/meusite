import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";

const faqItems = [
  {
    question: "Eu nunca investi nada na vida. Bitcoin é para mim?",
    answer: (
      <>
        <strong className="text-foreground">Sim. Na verdade, Bitcoin foi criado exatamente para pessoas como você.</strong> Não para banqueiros, não para especialistas em finanças. O sistema bancário tradicional foi construído para quem já tem dinheiro. Bitcoin é a primeira vez na história que qualquer pessoa, com qualquer renda, pode guardar valor fora desse sistema — sem pedir permissão pra ninguém. <span className="text-gold font-bold">Você não precisa entender tudo para começar. Precisa apenas de um celular.</span>
        <br /><br />
        <Link to="/protocolo-inicial" className="inline-flex items-center gap-1.5 text-gold font-bold text-xs tracking-wide uppercase border-b border-gold/30 pb-0.5 hover:border-gold transition-colors">→ Ver o Protocolo Inicial</Link>
      </>
    ),
  },
  {
    question: "Tenho medo de perder tudo. Bitcoin não é uma bolha?",
    answer: (
      <>
        Esse medo é legítimo — e inteligente. Mas pensa comigo: <strong className="text-foreground">seu dinheiro parado na poupança também perde valor</strong>, só que devagar, sem você perceber. A inflação come em silêncio. Bitcoin já sobreviveu a quedas de 80%, foi declarado morto mais de 400 vezes, e cada vez voltou mais forte. <span className="text-gold font-bold">A pergunta certa não é "e se o Bitcoin cair?" — é "e se ele continuar subindo e eu ficar de fora?"</span>
        <br /><br />
        Ninguém pede que você coloque tudo. Comece com o que não te faz falta. O risco de não fazer nada também é real.
      </>
    ),
  },
  {
    question: "Quanto eu preciso ter para começar?",
    answer: (
      <>
        <span className="text-gold font-bold">Menos do que você imagina.</span> Bitcoin pode ser comprado em frações minúsculas chamadas satoshis. <strong className="text-foreground">Com R$ 50 você já está dentro.</strong> Não existe valor mínimo obrigatório. A maioria das pessoas começa pequeno, entende como funciona, e vai aumentando conforme a confiança cresce. O importante não é o valor — é dar o primeiro passo antes que o próximo ciclo comece.
        <br /><br />
        <Link to="/protocolo-inicial" className="inline-flex items-center gap-1.5 text-gold font-bold text-xs tracking-wide uppercase border-b border-gold/30 pb-0.5 hover:border-gold transition-colors">→ Começar com pouco agora</Link>
      </>
    ),
  },
  {
    question: "O governo pode proibir o Bitcoin no Brasil?",
    answer: (
      <>
        Países tentaram. China proibiu três vezes. Bitcoin continua lá. <strong className="text-foreground">Tecnicamente, é quase impossível proibir Bitcoin de verdade</strong> — ele não tem sede, não tem CEO, não tem servidor central para desligar. No Brasil, o Bitcoin já é regulamentado e reconhecido como ativo financeiro desde 2023. Mas mesmo que algum dia houvesse restrição, <span className="text-gold font-bold">quem tem autocustódia — as próprias chaves — não depende de nenhuma empresa ou governo para acessar seu dinheiro.</span> Esse é o ponto.
      </>
    ),
  },
  {
    question: "Como eu sei que não vou cair num golpe?",
    answer: (
      <>
        Essa é a pergunta mais importante que você poderia fazer. <strong className="text-foreground">99% dos golpes com "cripto" não têm nada a ver com Bitcoin em si</strong> — são pessoas prometendo rendimento garantido, plataformas desconhecidas, esquemas de indicação. A regra de ouro é simples: <span className="text-gold font-bold">se alguém prometeu rendimento fixo em Bitcoin, é golpe. Bitcoin não promete nada — ele apenas existe.</span> Aprender a diferença entre guardar Bitcoin de verdade e especular em "criptos" é o que este site ensina.
        <br /><br />
        <Link to="/autocustodia" className="inline-flex items-center gap-1.5 text-gold font-bold text-xs tracking-wide uppercase border-b border-gold/30 pb-0.5 hover:border-gold transition-colors">→ Aprender a se proteger</Link>
      </>
    ),
  },
  {
    question: "Meu dinheiro no banco não está seguro?",
    answer: (
      <>
        Está seguro de ladrão. <strong className="text-foreground">Não está seguro da inflação.</strong> R$ 1.000 guardados em 2010 valem hoje o equivalente a cerca de R$ 280 em poder de compra. O banco não roubou — ele simplesmente não protegeu. <span className="text-gold font-bold">O sistema foi desenhado para que seu dinheiro trabalhe para o banco, não para você.</span> A SELIC parece alta, mas quando você desconta a inflação real, o rendimento líquido muitas vezes é negativo ou irrisório. Bitcoin é a alternativa para quem percebeu isso.
      </>
    ),
  },
  {
    question: "E se eu perder minha senha ou meu celular?",
    answer: (
      <>
        Esse é o único risco real que depende só de você — e tem solução. <strong className="text-foreground">Bitcoin funciona com um sistema de 12 ou 24 palavras chamado seed phrase.</strong> Quem tem essas palavras anotadas em lugar seguro, recupera tudo, em qualquer celular, em qualquer lugar do mundo. <span className="text-gold font-bold">Perder o celular não significa perder o Bitcoin. Significa que você vai precisar das suas palavras.</span> Ensino exatamente como guardar isso com segurança no Protocolo Inicial.
        <br /><br />
        <Link to="/autocustodia" className="inline-flex items-center gap-1.5 text-gold font-bold text-xs tracking-wide uppercase border-b border-gold/30 pb-0.5 hover:border-gold transition-colors">→ Ver como proteger sua seed</Link>
      </>
    ),
  },
];

const bars = [
  { label: "Ouro", pct: 10, height: 62, className: "from-[#2f2f2f] to-[#1c1c1c] text-muted-foreground border-white/5" },
  { label: "S&P 500", pct: 12, height: 78, className: "from-[#2a2a3c] to-[#191922] text-muted-foreground border-white/5" },
  {
    label: "Bitcoin",
    pct: 66,
    height: 244,
    className: "from-[#FFD79A] via-[#FFA424] to-[#C96A00] text-background border-gold/40 shadow-[0_0_60px_hsl(var(--gold)/0.45)]",
    isHighlight: true,
  },
];

const useCountUp = (target: number, active: boolean, duration = 1600, delay = 0) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let start = 0;
    const timer = window.setTimeout(() => {
      const tick = (t: number) => {
        if (!start) start = t;
        const p = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(target * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, active, duration, delay]);
  return value;
};


const WhyBitcoinSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto">

        {/* HEADLINE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight leading-tight mb-4">
            Por que eu deveria<br />guardar em <span className="text-gold">Bitcoin?</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Enquanto seu dinheiro no banco perde valor todo ano, o Bitcoin tem feito o oposto. Veja os números.
          </p>
        </motion.div>

        {/* CARD COMPARATIVO */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="rounded-3xl border border-gold/20 bg-[#0b0b0d] relative overflow-hidden mb-14 shadow-[0_40px_120px_-40px_hsl(var(--gold)/0.35)]"
        >
          {/* Top gold line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
          {/* Ambient glows */}
          <div className="absolute -bottom-40 -right-32 w-[460px] h-[460px] bg-[radial-gradient(circle,hsl(var(--gold)/0.14)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute -top-32 -left-24 w-[380px] h-[380px] bg-[radial-gradient(circle,hsl(var(--gold)/0.07)_0%,transparent_70%)] pointer-events-none" />
          {/* Technical grid */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)",
            }}
          />
          {/* Light sweep */}
          <motion.div
            initial={{ x: "-120%" }}
            animate={isInView ? { x: "140%" } : {}}
            transition={{ duration: 2.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none skew-x-12"
          />

          <div className="relative px-6 md:px-10 pt-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-1">
              Retorno médio anual · 2020 — 2025
            </p>
            <div className="h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>

          {/* Bars */}
          <div className="flex items-end justify-center gap-4 md:gap-8 h-[300px] px-6 md:px-10 pt-10 relative">
            {/* baseline */}
            <div className="absolute bottom-0 left-6 right-6 md:left-10 md:right-10 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
            {bars.map((bar, i) => (
              <BarItem key={i} bar={bar} isInView={isInView} delay={0.3 + i * 0.18} />
            ))}
          </div>

          {/* Result */}
          <div className="text-center border-t border-gold/10 px-6 md:px-10 py-9 relative">
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-5xl md:text-7xl text-gold leading-none tracking-tighter"
              style={{ textShadow: "0 0 60px hsl(var(--gold) / 0.5)" }}
            >
              +66% <span className="text-2xl md:text-3xl align-middle text-gold/70">ao ano</span>
            </motion.p>
            <h3 className="text-lg font-bold text-foreground mt-3 mb-2">Crescimento médio anual do Bitcoin</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-5">
              Mesmo uma pequena parte do seu dinheiro em Bitcoin teria mudado sua situação financeira. Ainda dá tempo.
            </p>
            <p className="font-mono text-[10px] text-muted-foreground/40 tracking-widest mb-6">
              Fonte: dados de Jan/2020 a Jan/2025
            </p>
            <Link
              to="/protocolo-inicial"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-b from-[#FFC66B] to-gold text-background font-bold text-lg tracking-wider px-10 py-4 rounded-xl transition-all hover:shadow-[0_18px_60px_hsl(var(--gold)/0.5)] hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <Zap className="w-5 h-5 relative" /> <span className="relative">Quero começar agora</span>
            </Link>
          </div>
        </motion.div>


        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h2 className="font-bold text-3xl md:text-4xl tracking-tight text-center mb-2">DÚVIDAS REAIS</h2>
          <p className="text-center text-muted-foreground text-sm mb-10">
            As perguntas que todo mundo tem mas tem vergonha de fazer.
          </p>

          <div className="flex flex-col gap-0.5">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className={`rounded-lg border bg-card overflow-hidden transition-colors ${openIndex === i ? "border-gold/25" : "border-border/50 hover:border-gold/20"}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-5 gap-4 text-left"
                >
                  <h3 className={`text-sm font-bold leading-snug transition-colors ${openIndex === i ? "text-gold" : "text-foreground/80"}`}>
                    {item.question}
                  </h3>
                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 font-mono text-base transition-all ${openIndex === i ? "bg-gold/10 border-gold/30 text-gold rotate-45" : "border-border text-muted-foreground"}`}
                  >
                    +
                  </div>
                </button>
                <div
                  className="grid transition-all duration-400"
                  style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-0 border-t border-border/30 text-sm text-muted-foreground leading-relaxed pt-4">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA FINAL */}
          <div className="mt-12 rounded-2xl border border-gold/15 bg-card p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <h3 className="font-bold text-2xl md:text-3xl tracking-tight mb-2">AINDA COM DÚVIDAS?</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
              Comece pelo Protocolo Inicial. É gratuito, direto ao ponto, e feito para quem nunca teve contato com Bitcoin.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                to="/protocolo-inicial"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-background font-bold tracking-wider px-8 py-3 rounded-md transition-all hover:shadow-[0_12px_40px_hsl(var(--gold)/0.4)] hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4" /> Acessar o Protocolo
              </Link>
              <Link
                to="/#manifesto"
                className="inline-flex items-center gap-2 font-bold text-foreground text-sm tracking-wide uppercase px-7 py-3 rounded-md border border-border hover:border-gold hover:text-gold transition-all"
              >
                Explorar o Manifesto <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BarItem = ({ bar, isInView, delay }: { bar: typeof bars[0]; isInView: boolean; delay: number }) => (
  <div className="flex flex-col items-center gap-2 flex-1 max-w-[160px]">
    <div className="w-full flex flex-col items-center justify-end" style={{ height: 240 }}>
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: bar.height, transformOrigin: "bottom" }}
        className={`w-full rounded-t-lg flex items-start justify-center pt-3 font-bold text-xl tracking-wide ${bar.className}`}
      >
        {bar.value}
      </motion.div>
    </div>
    <span className={`font-mono text-[11px] tracking-widest uppercase ${bar.isHighlight ? "text-gold" : "text-muted-foreground/60"}`}>
      {bar.label}
    </span>
  </div>
);

export default WhyBitcoinSection;
