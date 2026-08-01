import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Download, BookOpen, FileText, Shield, Zap,
  Lock, Server, Repeat, KeyRound, Landmark, Brain,
  Cpu, Crosshair, GraduationCap, Flame
} from "lucide-react";
import { fadeUp, stagger, staggerChild, viewportOnce, ease } from "@/lib/motion";

import bookSeisLicoes from "@/assets/book-seis-licoes.jpg";
import bookDemocracia from "@/assets/book-democracia.jpg";
import bookBancoCentral from "@/assets/book-banco-central.jpg";
import bookWhitepaper from "@/assets/book-whitepaper.jpg";
import bookRedpill from "@/assets/book-redpill.jpg";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Trilhas de Formação (Cards Grandes) ─── */
const trails = [
  {
    level: "01",
    badge: "FUNDAMENTOS",
    icon: Landmark,
    title: "Despertar Monetário",
    desc: "Entenda por que o sistema fiduciário falha, a história da moeda e como a inflação é o imposto que ninguém votou.",
    route: "/economia",
    color: "from-amber-500/20 to-amber-900/5",
    borderColor: "hover:border-amber-500/40",
  },
  {
    level: "02",
    badge: "OPERACIONAL",
    icon: Lock,
    title: "Autocustódia",
    desc: "Arquitetura de chaves privadas, Cold Wallets, seed phrases e o fim da dependência bancária. Seja seu próprio banco.",
    route: "/autocustodia",
    color: "from-red-500/20 to-red-900/5",
    borderColor: "hover:border-red-500/40",
  },
  {
    level: "03",
    badge: "VELOCIDADE",
    icon: Zap,
    title: "Rede Lightning",
    desc: "A camada de liquidez que torna o Bitcoin dinheiro corrente instantâneo. Pagamentos em milissegundos, taxas de centavos.",
    route: "/lightning",
    color: "from-yellow-500/20 to-yellow-900/5",
    borderColor: "hover:border-yellow-500/40",
  },
  {
    level: "04",
    badge: "TÉCNICO",
    icon: Server,
    title: "Infraestrutura Soberana",
    desc: "Rode seu próprio Node. Valide suas transações. 'Don't Trust, Verify.' — A soberania técnica absoluta.",
    route: "/infraestrutura",
    color: "from-emerald-500/20 to-emerald-900/5",
    borderColor: "hover:border-emerald-500/40",
  },
  {
    level: "05",
    badge: "AVANÇADO",
    icon: Repeat,
    title: "Economia Paralela",
    desc: "Operações P2P via BISQ, transações sem intermediários, sem KYC. O mercado livre digital na prática.",
    route: "/economia-paralela",
    color: "from-violet-500/20 to-violet-900/5",
    borderColor: "hover:border-violet-500/40",
  },
  {
    level: "06",
    badge: "MÁXIMO",
    icon: KeyRound,
    title: "Herança Soberana",
    desc: "Multisig, timelock e infraestrutura para que seus herdeiros acessem seu patrimônio sem inventários ou burocracia.",
    route: "/filosofia",
    color: "from-sky-500/20 to-sky-900/5",
    borderColor: "hover:border-sky-500/40",
  },
  {
    level: "07",
    badge: "BIOLÓGICO",
    icon: Brain,
    title: "Conhecimento Perdido",
    desc: "Fitoterapia, fisiologia e autonomia biológica. O saber ancestral suprimido, documentado com rigor técnico.",
    route: "/soberania-organica/conhecimento-perdido",
    color: "from-green-500/20 to-green-900/5",
    borderColor: "hover:border-green-500/40",
  },
  {
    level: "08",
    badge: "DESCONSTRUÇÃO",
    icon: Crosshair,
    title: "Tóxicos Ocultos",
    desc: "Toxinas alimentares, ambientais, manipulação informacional e dependência tecnológica. A matriz de controle exposta.",
    route: "/soberania-organica/toxicos-ocultos",
    color: "from-rose-500/20 to-rose-900/5",
    borderColor: "hover:border-rose-500/40",
  },
  {
    level: "09",
    badge: "RESILIÊNCIA",
    icon: Flame,
    title: "Protocolos de Emergência",
    desc: "Abrigo, purificação de água, primeiros socorros e comunicação offline. Sobrevivência quando o sistema falha.",
    route: "/soberania-organica",
    color: "from-orange-500/20 to-orange-900/5",
    borderColor: "hover:border-orange-500/40",
  },
];

/* ─── Biblioteca PDF ─── */
const books = [
  {
    title: "As Seis Lições",
    author: "Ludwig von Mises",
    cover: bookSeisLicoes,
    desc: "A cartilha definitiva da Escola Austríaca: inflação, intervencionismo e o colapso inevitável do estado planejador.",
    pages: "106 págs",
    tag: "ECONOMIA",
    pdf: "/pdfs/seis-licoes.pdf",
  },
  {
    title: "O Deus que Falhou",
    author: "Hans-Hermann Hoppe",
    cover: bookDemocracia,
    desc: "Por que a democracia destrói a civilização mais rápido que qualquer monarquia. Análise radical e sem filtros.",
    pages: "322 págs",
    tag: "FILOSOFIA",
    pdf: "/pdfs/democracia-deus-falhou.pdf",
  },
  {
    title: "Fim do Banco Central",
    author: "Murray Rothbard",
    cover: bookBancoCentral,
    desc: "Rothbard disseca o sistema bancário de reservas fracionárias e demonstra como o Fed rouba seu poder de compra.",
    pages: "198 págs",
    tag: "SISTEMA MONETÁRIO",
    pdf: "/pdfs/fim-banco-central.pdf",
  },
  {
    title: "Bitcoin White Paper",
    author: "Satoshi Nakamoto",
    cover: bookWhitepaper,
    desc: "O documento que iniciou a revolução: um sistema de dinheiro eletrônico peer-to-peer sem terceiros de confiança.",
    pages: "9 págs",
    tag: "CRIPTOGRAFIA",
    pdf: "/pdfs/bitcoin-whitepaper.pdf",
  },
  {
    title: "Bitcoin Red Pill",
    author: "Renato Amoedo",
    cover: bookRedpill,
    desc: "O despertar sobre dinheiro, liberdade e soberania individual através do Bitcoin. A pílula vermelha brasileira.",
    pages: "284 págs",
    tag: "BITCOIN",
    pdf: "/pdfs/bitcoin-redpill.pdf",
  },
];

const KnowledgeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportOnce);
  const navigate = useNavigate();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050808] via-[#070b0b] to-[#050808]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(var(--destructive)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, ease: APPLE_EASE }}
          className="mb-20 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-destructive" />
            </div>
            <span className="text-destructive font-black text-[10px] uppercase tracking-[0.3em]">
              Arsenal de Conhecimento
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.95] mb-5">
            A BASE<br />
            <span className="text-destructive italic font-light">INTELECTUAL</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
            Antes de proteger o bolso, você blinda a mente. Manuais técnicos, documentações
            e teoria econômica — sem rastro de CPF, sem propagandas.
          </p>
        </motion.div>

        {/* ─── TRILHAS DE FORMAÇÃO ─── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: APPLE_EASE }}
            className="flex items-center gap-3 mb-10"
          >
            <GraduationCap className="w-5 h-5 text-destructive" />
            <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
              Trilhas de Formação
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent ml-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trails.map((trail, i) => {
              const Icon = trail.icon;
              return (
                <motion.div
                  key={trail.level}
                  initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                  animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: APPLE_EASE }}
                  onClick={() => navigate(trail.route)}
                  className={`group relative cursor-pointer rounded-2xl border border-border/20 ${trail.borderColor} bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/20`}
                >
                  {/* Gradient accent top */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${trail.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                  <div className="relative z-10 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-border/30 flex items-center justify-center group-hover:border-destructive/30 group-hover:bg-destructive/10 transition-all duration-500">
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors duration-500" />
                        </div>
                        <span className="font-mono text-3xl font-black text-foreground/20 group-hover:text-foreground/40 transition-colors duration-500">
                          {trail.level}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] tracking-[0.15em] text-destructive/70 bg-destructive/10 px-2.5 py-1 rounded-full border border-destructive/10">
                        {trail.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <h4 className="text-xl font-black text-foreground mb-2 tracking-tight group-hover:text-foreground transition-colors">
                      {trail.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {trail.desc}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-destructive text-sm font-bold group-hover:gap-3 transition-all duration-500">
                      <span>Acessar</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-destructive/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── BIBLIOTECA PDF ─── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: APPLE_EASE }}
            className="flex items-center gap-3 mb-10"
          >
            <BookOpen className="w-5 h-5 text-destructive" />
            <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
              Biblioteca em PDF
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent ml-4" />
            <motion.button
              onClick={() => navigate('/ebooks')}
              className="flex items-center gap-2 text-destructive text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all duration-300"
              whileHover={{ x: 4 }}
            >
              Ver Acervo Completo
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {books.map((book, i) => (
              <motion.a
                key={book.title}
                href={book.pdf}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.1, ease: APPLE_EASE }}
                className="group relative cursor-pointer"
                whileHover={{ y: -8 }}
              >
                <div className="relative rounded-xl overflow-hidden border border-border/20 bg-white/[0.02] hover:border-border/40 transition-all duration-500 hover:shadow-2xl hover:shadow-black/30">
                  {/* Cover */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/30 to-transparent" />

                    {/* Download overlay */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-destructive/20 border border-destructive/40 flex items-center justify-center">
                        <Download className="w-6 h-6 text-destructive" />
                      </div>
                    </div>

                    {/* Tag */}
                    <span className="absolute top-3 left-3 font-mono text-[8px] tracking-[0.15em] text-destructive bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full border border-destructive/20">
                      {book.tag}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-foreground mb-1 leading-tight group-hover:text-destructive transition-colors duration-500 line-clamp-2">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground mb-2 font-medium">
                      {book.author}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-muted-foreground/60 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {book.pages}
                      </span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground/40 group-hover:text-destructive group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeSection;
