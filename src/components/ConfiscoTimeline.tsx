import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Vault, Lock, AlertTriangle, BookOpen, Bitcoin, Scale, Shield, ArrowDown } from "lucide-react";

import cardEconomia from "@/assets/card-economia.webp";
import cardBitcoin from "@/assets/card-bitcoin.webp";
import cardFilosofia from "@/assets/card-filosofia.webp";
import cardEstrategias from "@/assets/card-estrategias.webp";
import presidenteImg from "@/assets/presidente-confisco-1990.webp";

const timelineSteps = [
  {
    phase: "FASE 01",
    date: "15 de Março, 1990",
    time: "23:59",
    headline: "Você dorme tranquilo.",
    subtext: "Seu saldo aparece na tela. Sua família está segura. O banco prometeu cuidar do seu dinheiro.",
    detail: "R$ 100.000 na conta corrente. Uma vida inteira de trabalho convertida em números na tela de um computador que você não controla.",
    icon: Vault,
    accent: "border-border",
    accentBg: "bg-muted-foreground/10",
    accentText: "text-muted-foreground",
    tag: "ANTES",
    tagColor: "bg-muted-foreground/20 text-muted-foreground",
  },
  {
    phase: "FASE 02",
    date: "16 de Março, 1990",
    time: "06:00",
    headline: "Você acorda sem nada.",
    subtext: "80% do seu patrimônio foi bloqueado por um decreto assinado enquanto você dormia. Sem aviso. Sem escolha. Sem recurso.",
    detail: "O governo confiscou R$ 80.000 da sua conta. Você ficou com R$ 20.000 para sobreviver. Milhões de brasileiros perderam tudo no mesmo dia.",
    icon: Lock,
    accent: "border-destructive",
    accentBg: "bg-destructive/10",
    accentText: "text-chart-red",
    tag: "O CONFISCO",
    tagColor: "bg-destructive/20 text-chart-red",
  },
  {
    phase: "FASE 03",
    date: "Agora",
    time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    headline: "A lei que permitiu isso nunca foi revogada.",
    subtext: "O mesmo mecanismo legal está ativo. Seu saldo bancário continua sendo uma promessa — não uma posse.",
    detail: "Art. 62 da Constituição Federal permite medidas provisórias com força de lei imediata. O precedente existe. A ferramenta jurídica também.",
    icon: AlertTriangle,
    accent: "border-gold-dim",
    accentBg: "bg-gold/10",
    accentText: "text-gold",
    tag: "ALERTA ATIVO",
    tagColor: "bg-gold/20 text-gold",
  },
];

const bulletPoints = [
  {
    title: "O Precedente",
    text: "O que aconteceu em 90 é a prova de que o saldo na sua tela é uma permissão temporária, não uma posse real.",
  },
  {
    title: "A Vulnerabilidade",
    text: "Se o seu patrimônio depende de um banco de dados centralizado, você está a uma assinatura de distância da insolvência.",
  },
  {
    title: "A Resposta Técnica",
    text: "O Bitcoin e a Autocustódia existem para garantir que o seu esforço de vida nunca mais seja passível de sequestro estatal.",
  },
];

const connectorCards = [
  { icon: BookOpen, title: "Economia que Faz Sentido", desc: "A lógica da pilhagem estatal.", image: cardEconomia, route: "/economia" },
  { icon: Bitcoin, title: "Bitcoin sem Enrolação", desc: "Autocustódia e proteção real.", image: cardBitcoin, route: "/bitcoin" },
  { icon: Scale, title: "Filosofia da Liberdade", desc: "Ética de propriedade e mercado.", image: cardFilosofia, route: "/filosofia" },
  { icon: Shield, title: "Estratégias de Saída", desc: "Ferramentas de independência operacional.", image: cardEstrategias, route: "/saida" },
];

const ConfiscoTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleComecarAgora = () => {
    const el = document.getElementById("educacao");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Transition text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12"
        >
          <p className="pre-title">A TRANSIÇÃO: DA TEORIA À CICATRIZ</p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
            A fraude que você ignora hoje é o confisco que te destruirá amanhã. Para quem viveu
            o Brasil de 1990, a "soberania" não era um conceito técnico, era a diferença entre
            ter o que comer e ver o esforço de uma vida inteira evaporar por um decreto assinado
            em Brasília.
          </p>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            O QUE A HISTÓRIA NÃO TE CONTA, <span className="text-gradient-gold">A MATEMÁTICA PROVA.</span>
          </h3>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mt-4">
            O manifesto que você leu acima não é um aviso sobre o futuro; é a explicação técnica
            de por que o passado se repetirá. O dinheiro no banco não é patrimônio; é um passivo
            que o Estado decide quando e como você pode acessar.
          </p>
        </motion.div>

        {/* Timeline — Immersive Infographic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <p className="pre-title">RECONSTITUIÇÃO DOCUMENTADA</p>
            <span className="font-mono text-[10px] tracking-widest text-chart-red animate-pulse">
              ● REC
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-8 max-w-xl">
            O que aconteceu em <span className="text-foreground font-medium">menos de 8 horas</span> com o patrimônio de 
            milhões de famílias brasileiras, e por que pode acontecer de novo com o seu.
          </p>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] md:left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-border via-destructive/40 to-gold/60" />

            <div className="space-y-0">
              {timelineSteps.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === timelineSteps.length - 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.25 }}
                    className="relative pl-16 md:pl-20 pb-10 last:pb-0"
                  >
                    {/* Node dot */}
                    <div className={`absolute left-[11px] md:left-[15px] top-1 w-[25px] h-[25px] md:w-[25px] md:h-[25px] rounded-full border-2 ${step.accent} ${step.accentBg} flex items-center justify-center z-10`}>
                      <Icon className={`w-3 h-3 ${step.accentText}`} />
                    </div>

                    {/* Card */}
                    <div className={`rounded-lg border ${step.accent} bg-background overflow-hidden transition-all duration-500 hover:border-opacity-60 group`}>
                      {/* Top bar */}
                      <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-card/50">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-[9px] tracking-[0.2em] px-2 py-0.5 rounded ${step.tagColor}`}>
                            {step.tag}
                          </span>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {step.phase}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-muted-foreground">{step.date}</span>
                          <span className={`font-mono text-[11px] font-semibold ${step.accentText}`}>{step.time}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-5 py-5 md:px-6 md:py-6">
                        <h3 className={`text-lg md:text-xl font-bold tracking-tight mb-2 ${step.accentText}`}>
                          {step.headline}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                          {step.subtext}
                        </p>
                        <div className="rounded-md bg-card/80 border border-border/50 px-4 py-3">
                          <p className="text-xs text-muted-foreground/80 leading-relaxed font-mono">
                            {step.detail}
                          </p>
                        </div>
                      </div>

                      {/* Pulse bar for last item */}
                      {isLast && (
                        <div className="h-[2px] bg-gradient-to-r from-gold/0 via-gold/60 to-gold/0 animate-pulse" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Closing provocation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 pl-16 md:pl-20"
          >
            <p className="text-sm text-muted-foreground italic">
              "Quanto do seu patrimônio está a uma assinatura de distância de desaparecer?"
            </p>
          </motion.div>

          {/* ══════ PRESIDENTE CTA ══════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="mt-12"
          >
            <Link to="/confisco-1990" className="group block">
              <div className="relative rounded-xl overflow-hidden border border-destructive/20 hover:border-destructive/50 transition-all duration-500 hover:shadow-[0_8px_40px_-12px_hsl(var(--destructive)/0.3)]">
                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={presidenteImg}
                    alt="Presidente com a faixa presidencial, 1990"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
                  
                  {/* REC badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="font-mono text-[10px] tracking-widest text-destructive animate-pulse">● 1990</span>
                  </div>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-destructive/80 mb-2">
                    A HISTÓRIA QUE O BRASIL QUER ESQUECER
                  </p>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-destructive transition-colors duration-500">
                    Ele assinou. Você perdeu tudo.
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-lg mb-4">
                    Em 16 de março de 1990, enquanto você dormia, o presidente confiscou 80% do dinheiro da população.
                    Esta é a história completa.
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-destructive group-hover:gap-3 transition-all duration-500">
                    Ler a história completa →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Context: 1990 + Bullet Points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-3xl mb-14"
        >
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
            <p>
              Você acredita que o dinheiro no banco é seu porque ainda não viveu o próximo
              "feriado bancário". Em 16 de março de 1990, milhões de brasileiros acordaram e
              descobriram que seu patrimônio havia sido sequestrado pelo Estado. Não houve aviso.
              Não houve escolha.
            </p>
            <p>
              O confisco foi a demonstração final de que, no sistema fiduciário, você é apenas
              um credor de uma promessa que pode ser quebrada a qualquer momento.
            </p>
          </div>

          {/* Bullet points */}
          <div className="space-y-4">
            {bulletPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="flex gap-3 items-start"
              >
                <span className="text-gold mt-1 text-lg leading-none">▸</span>
                <div>
                  <span className="text-foreground font-semibold">{point.title}:</span>{" "}
                  <span className="text-muted-foreground">{point.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connector Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-10"
        >
          <p className="pre-title mb-2">O CONECTOR: DA CICATRIZ À SAÍDA OPERACIONAL</p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-3xl mb-8">
            A tecnologia evoluiu. O risco estatal não. Em 1990, não havia para onde fugir. Hoje,
            a barreira entre o seu patrimônio e o próximo decreto estatal é o seu conhecimento
            técnico. Se o sistema bancário é o campo minado, o Bitcoin é a rota de extração.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {connectorCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Link to={card.route} key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                    className="group relative rounded-xl border border-border/60 bg-background cursor-pointer overflow-hidden transition-all duration-500 hover:border-gold/50 hover:shadow-[0_8px_40px_-12px_hsl(var(--gold)/0.3)] aspect-[3/4]"
                  >
                    {/* Background image — full bleed with cinematic hover */}
                    <img
                      src={card.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-700 ease-out scale-[1.02] group-hover:scale-[1.12] group-hover:brightness-110" loading="lazy" decoding="async" />
                    {/* Cinematic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent group-hover:via-background/40 transition-all duration-700" />
                    {/* Gold shimmer line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/80 transition-all duration-700" />
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6">
                      <div className="w-11 h-11 rounded-lg border border-border/40 bg-card/60 backdrop-blur-md flex items-center justify-center mb-4 group-hover:border-gold/40 group-hover:bg-gold/10 transition-all duration-500">
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors duration-500" />
                      </div>
                      <h4 className="text-base font-bold mb-1.5 group-hover:text-gold transition-colors duration-500 tracking-tight">{card.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
                      {/* CTA */}
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-gold/0 group-hover:text-gold transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        Explorar Módulo →
                      </span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={handleComecarAgora}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-gold text-background font-bold px-8 py-3.5 rounded-lg text-sm tracking-wide hover:bg-gold/90 transition-colors"
            >
              Começar Agora (É Grátis)
              <ArrowDown className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConfiscoTimeline;
