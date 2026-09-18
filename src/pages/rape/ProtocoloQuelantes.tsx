import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FlaskConical, AlertTriangle, ArrowLeft, Leaf, ChevronDown } from "lucide-react";
import BackToHome from "@/components/BackToHome";
import FixedThematicBackground from "@/components/backgrounds/FixedThematicBackground";
import ScrollToTop from "@/components/ScrollToTop";
import bgQuelantes from "@/assets/backgrounds/bg-quelantes.webp";
import imgLab from "@/assets/quelantes/fichas-laboratorio.webp";
import imgCoentro from "@/assets/quelantes/plantas/coentro.webp";
import imgChlorella from "@/assets/quelantes/plantas/chlorella.webp";
import imgIpe from "@/assets/quelantes/plantas/ipe-roxo.webp";
import imgSucupira from "@/assets/quelantes/plantas/sucupira.webp";
import imgCardo from "@/assets/quelantes/plantas/cardo-mariano.webp";
import imgEspirulina from "@/assets/quelantes/plantas/espirulina.webp";
import imgUnha from "@/assets/quelantes/plantas/unha-de-gato.webp";
import imgQuebra from "@/assets/quelantes/plantas/quebra-pedra.webp";
import imgCavalinha from "@/assets/quelantes/plantas/cavalinha.webp";
import imgCarvao from "@/assets/quelantes/plantas/carvao-ativado.webp";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface Planta {
  nome: string;
  cientifico: string;
  alvo: string;
  ativos: string;
  uso: string;
  ciclo: string;
  contra: string;
  sinergia: string;
  imagem?: string;
  legenda?: string;
}

const PLANTAS: Planta[] = [
  {
    nome: "Coentro",
    cientifico: "Coriandrum sativum",
    alvo: "Mercúrio, alumínio (sistema nervoso central)",
    ativos: "Linalol, dodecanal, ácido caféico, quercetina",
    uso: "30 a 50g de folhas frescas por dia, trituradas em sucos verdes ou pesto",
    ciclo: "21 dias on, 7 dias off, repetir 3 ciclos",
    contra: "Hipotensão severa, anticoagulantes (warfarina), interação documentada",
    sinergia: "OBRIGATÓRIO pareado com Chlorella. Coentro mobiliza, chlorella sequestra",
    imagem: imgCoentro,
    legenda: "Folha fresca de coentro: aroma cítrico inconfundível, presente em qualquer feira brasileira.",
  },
  {
    nome: "Chlorella",
    cientifico: "Chlorella vulgaris / pyrenoidosa",
    alvo: "Mercúrio, chumbo, cádmio, dioxinas",
    ativos: "Parede celular de esporopolenina, clorofila, CGF",
    uso: "2 a 3g por dia (pó ou comprimidos), longe de refeições com cobre ou zinco",
    ciclo: "Concomitante ao coentro, mesma duração",
    contra: "Alergia a iodo, doença autoimune ativa, anticoagulantes",
    sinergia: "Coentro (essencial), espirulina (potencializa)",
    imagem: imgChlorella,
    legenda: "Microalga Chlorella: cor verde-esmeralda intensa, vendida como pó ou comprimidos prensados.",
  },
  {
    nome: "Ipê-roxo",
    cientifico: "Handroanthus impetiginosus",
    alvo: "Carga inflamatória sistêmica, suporte hepático na fase 2",
    ativos: "Lapachol, beta-lapachona, naftoquinonas",
    uso: "Decocção de 5g de casca em 500ml. 200ml duas vezes ao dia",
    ciclo: "14 dias on, 14 dias off",
    contra: "Gestação (categoria X), distúrbios de coagulação",
    sinergia: "Sucupira (potencializa anti-inflamatório), cardo-mariano (proteção hepática)",
    imagem: imgIpe,
    legenda: "Casca interna avermelhada do ipê-roxo (pau d'arco): o anti-inflamatório nativo do cerrado.",
  },
  {
    nome: "Sucupira",
    cientifico: "Pterodon emarginatus",
    alvo: "Detoxificação articular e linfática, anti-inflamatório",
    ativos: "Diterpenos furânicos, isoflavonas",
    uso: "Tintura 1:5. 20 a 30 gotas em água, duas vezes ao dia",
    ciclo: "21 dias on, 14 dias off",
    contra: "Gestação, hipotensos, uso prolongado sem pausa",
    sinergia: "Ipê-roxo (anti-inflamatório), unha-de-gato (modulação imune)",
    imagem: imgSucupira,
    legenda: "Sementes ovaladas de sucupira: tradicionalmente maceradas em álcool de cereais para tintura.",
  },
  {
    nome: "Cardo-mariano",
    cientifico: "Silybum marianum",
    alvo: "Proteção e regeneração hepática durante quelação",
    ativos: "Silimarina (silibina, silidianina, silicristina)",
    uso: "200 a 400mg de extrato padronizado (70 a 80% silimarina) por dia",
    ciclo: "Contínuo durante todo protocolo de quelação",
    contra: "Alergia a Asteraceae, doença biliar obstrutiva",
    sinergia: "Suporte universal. Usar com TODOS os outros quelantes",
    imagem: imgCardo,
    legenda: "Flor roxa espinhosa do cardo-mariano: muitos têm no quintal sem saber a função hepática.",
  },
  {
    nome: "Espirulina",
    cientifico: "Arthrospira platensis",
    alvo: "Arsênico, cádmio, suporte nutricional",
    ativos: "Ficocianina, clorofila, ácido gama-linolênico",
    uso: "3 a 5g por dia em ciclos, longe de café ou chá (taninos)",
    ciclo: "Contínuo, com pausa de 7 dias a cada 60",
    contra: "Fenilcetonúria, doença autoimune, gota",
    sinergia: "Chlorella (sinergia em metais), suporte energético geral",
    imagem: imgEspirulina,
    legenda: "Espirulina: cianobactéria de cor verde-azulada intensa, comercializada em pó ou cápsulas.",
  },
  {
    nome: "Unha-de-gato",
    cientifico: "Uncaria tomentosa",
    alvo: "Modulação imune, suporte sistêmico durante quelação",
    ativos: "Alcaloides oxindólicos, glicosídeos do ácido quinóvico",
    uso: "Decocção 3g de casca em 500ml. 150ml duas vezes ao dia",
    ciclo: "30 dias on, 15 dias off",
    contra: "Gestação, transplantados (imunossupressão), autoimunes ativos",
    sinergia: "Sucupira, ipê-roxo (eixo anti-inflamatório completo)",
    imagem: imgUnha,
    legenda: "Unha-de-gato amazônica: cipó com espinhos curvos que parecem garras, daí o nome popular.",
  },
  {
    nome: "Quebra-pedra",
    cientifico: "Phyllanthus niruri",
    alvo: "Suporte renal, via de excreção de quelantes ligados",
    ativos: "Filantina, hipofilantina, lignanas",
    uso: "Infusão 1 colher de sopa por xícara, 2 a 3 vezes ao dia",
    ciclo: "21 dias on, 7 dias off",
    contra: "Gestação, hipoglicemia, diuréticos prescritos",
    sinergia: "Cavalinha (ambos renais), sempre durante mobilização de metais",
    imagem: imgQuebra,
    legenda: "Quebra-pedra: erva rasteira com frutos minúsculos pendurados sob as folhas. Cresce em qualquer quintal.",
  },
  {
    nome: "Cavalinha",
    cientifico: "Equisetum arvense",
    alvo: "Suporte mineral durante quelação (sílica, cálcio, magnésio)",
    ativos: "Sílica orgânica, flavonoides, ácidos fenólicos",
    uso: "Infusão 5g em 500ml, 250ml duas vezes ao dia",
    ciclo: "14 dias on, 14 dias off",
    contra: "Cardiopatas, deficiência de tiamina, uso prolongado",
    sinergia: "Quebra-pedra (suporte renal duplo)",
    imagem: imgCavalinha,
    legenda: "Cavalinha: caules verdes segmentados que lembram um rabo de cavalo, daí o nome popular.",
  },
  {
    nome: "Carvão ativado vegetal",
    cientifico: "Carbonis activatus",
    alvo: "Sequestro intestinal de toxinas mobilizadas",
    ativos: "Estrutura microporosa de adsorção",
    uso: "1 a 2g em água, 2h longe de refeições e medicamentos",
    ciclo: "Pontual, máximo 3 a 5 dias seguidos",
    contra: "TODOS os medicamentos (adsorve fármacos), constipação",
    sinergia: "Uso emergencial em fase de mobilização agressiva",
    imagem: imgCarvao,
    legenda: "Carvão ativado vegetal: pó preto profundo de adsorção. Sempre 2h longe de qualquer remédio.",
  },
];

const FAQ = [
  {
    q: "Posso fazer este protocolo sem acompanhamento médico?",
    a: "Não. Quelação mobiliza metais armazenados em tecidos profundos. Sem suporte hepático e renal monitorado e exames de carga corporal, o risco de redistribuição é real. Este conteúdo é educacional, não substitui avaliação clínica.",
  },
  {
    q: "Por que coentro e chlorella precisam ser usados juntos?",
    a: "Coentro tem capacidade rara de mobilizar mercúrio armazenado no tecido nervoso central. Sem um sequestrante intestinal, esses metais recirculam pela bile e podem ser reabsorvidos. Chlorella faz o sequestro no lúmen intestinal, fechando o ciclo.",
  },
  {
    q: "Quanto tempo dura o protocolo completo?",
    a: "Um ciclo conservador dura entre 9 e 12 semanas, com janelas de pausa para recuperação enzimática hepática. Cargas tóxicas pesadas exigem múltiplos ciclos espaçados ao longo de 12 a 18 meses.",
  },
  {
    q: "Existe risco de quelação descontrolada?",
    a: "Sim. Se você mobilizar metais sem garantir excreção renal e intestinal adequada, eles redistribuem para tecidos sensíveis como cérebro e rins. Por isso quebra-pedra, cavalinha e cardo-mariano são obrigatórios durante toda a janela ativa.",
  },
  {
    q: "Posso combinar com medicamentos contínuos?",
    a: "Várias dessas plantas têm interação documentada com anticoagulantes, hipotensores, imunossupressores e antidiabéticos. Avaliação médica individual é mandatória antes de iniciar.",
  },
];

export default function ProtocoloQuelantes() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "name": "Protocolo de Quelantes Brasileiros: 10 Plantas com Fichas Técnicas",
        "url": "https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/quelantes-orientacao-segura",
        "description": "10 plantas brasileiras quelantes com fichas técnicas completas: alvo tóxico, compostos ativos, posologia, contraindicações e sinergias.",
        "lastReviewed": "2026-04-20",
        "medicalAudience": "Patients",
        "about": [
          { "@type": "Thing", "name": "Quelação de metais pesados" },
          { "@type": "Thing", "name": "Fitoterapia brasileira" },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQ.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      <Helmet>
        <title>Protocolo de Quelantes Brasileiros: 10 Plantas Quelantes Naturais | Lord Junnior</title>
        <meta name="description" content="Fichas técnicas completas de 10 plantas brasileiras quelantes: coentro, chlorella, ipê-roxo, sucupira, cardo-mariano, espirulina, unha-de-gato, quebra-pedra, cavalinha e carvão ativado. Posologia, ciclos, contraindicações e sinergias." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/quelantes-orientacao-segura" />
        <meta property="og:title" content="Protocolo de Quelantes Brasileiros: 10 Plantas Nativas" />
        <meta property="og:description" content="Fichas técnicas de 10 plantas quelantes: posologia, ciclos, contraindicações e sinergias documentadas." />
        <meta property="og:image" content="https://lordjunnior.com.br/og-quelantes.jpg" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <FixedThematicBackground image={bgQuelantes} intensity="heavy" />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* HERO FULL-SCREEN APPLE-LIKE */}
      <section className="relative z-10 min-h-[90vh] flex items-center px-6 md:px-12 lg:px-20 pt-12 pb-20">
        <div className="w-full max-w-7xl mx-auto">
          <Link
            to="/soberania-organica/conhecimento-perdido/rape"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-emerald-400 mb-10 hover:gap-3 transition-all"
          >
            <ArrowLeft size={12} /> Voltar ao Dossiê do Rapé
          </Link>

          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-emerald-400/80 uppercase mb-8">
            FICHAS TÉCNICAS · DETOXIFICAÇÃO ASSISTIDA · 10 PLANTAS NATIVAS
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: APPLE_EASE }}
            className="text-foreground font-bold leading-[0.92] tracking-tight mb-10"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 9vw, 8rem)",
              letterSpacing: "0.01em",
            }}
          >
            PROTOCOLO DE <br />
            <span className="text-emerald-400/95 italic font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
              quelantes brasileiros
            </span>
          </motion.h1>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <p className="lg:col-span-7 text-muted-foreground text-lg md:text-2xl leading-relaxed">
              Dez plantas medicinais nativas e adotadas pela tradição brasileira que mobilizam, sequestram
              e excretam metais pesados acumulados. Cada ficha contém posologia, ciclos, contraindicações
              e sinergias. Sem espaço para amadorismo.
            </p>

            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              {[
                { n: "10", l: "Plantas catalogadas" },
                { n: "21d", l: "Ciclo padrão" },
                { n: "9", l: "Semanas mínimas" },
              ].map(s => (
                <div key={s.l} className="rounded-2xl border border-emerald-900/30 bg-card/40 backdrop-blur-md p-5 text-center hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.4)] transition-all">
                  <p className="text-3xl md:text-4xl font-bold text-emerald-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{s.n}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex items-center gap-3 text-emerald-500/60">
            <ChevronDown size={14} className="animate-bounce" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Role para a abertura editorial</span>
          </div>
        </div>
      </section>

      {/* IMAGEM EDITORIAL DE ABERTURA */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-emerald-900/30 group">
            <img
              src={imgLab}
              alt="Balança de laboratório com ervas brasileiras quelantes pesadas para protocolo de detoxificação"
              className="w-full h-[55vh] md:h-[70vh] object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              loading="eager"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-emerald-400/80 mb-3">
                ABERTURA EDITORIAL
              </p>
              <h2
                className="text-foreground text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}
              >
                Pesar a planta certa é metade do protocolo.
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-2xl">
                A outra metade é entender o que ela faz, em qual janela e contra qual veneno específico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AVISO YMYL */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 backdrop-blur-md p-7 md:p-9 flex gap-5 items-start hover:border-destructive/50 transition-all">
            <AlertTriangle className="text-destructive shrink-0 mt-1" size={26} />
            <div>
              <p className="text-xs font-mono tracking-[0.3em] uppercase text-destructive/90 mb-3">
                AVISO TÉCNICO MANDATÓRIO
              </p>
              <p className="text-base md:text-lg text-foreground/90 leading-8">
                A quelação mobiliza metais armazenados, fase mais perigosa que o estado estacionário.
                Sempre executar com suporte hepático (cardo-mariano) e renal (quebra-pedra ou cavalinha).
                Acompanhamento médico obrigatório em portadores de doença crônica, gestantes e usuários
                de medicação contínua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FICHAS COM IMAGENS INTERCALADAS */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-emerald-400/80 uppercase mb-4">
            DEZ FICHAS TÉCNICAS
          </p>
          <h2
            className="text-foreground font-bold mb-16 leading-[0.95]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            CADA PLANTA, UM <span className="italic font-light text-emerald-400/95" style={{ fontFamily: "'Instrument Serif', serif" }}>vetor preciso</span>
          </h2>

          <div className="space-y-8">
            {PLANTAS.map((p, i) => (
              <motion.article
                key={p.nome}
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.85, delay: (i % 3) * 0.05, ease: APPLE_EASE }}
                className="relative rounded-3xl border border-emerald-900/30 bg-card/40 backdrop-blur-md overflow-hidden hover:-translate-y-1 hover:border-emerald-700/50 hover:shadow-[0_30px_60px_-20px_rgba(16,185,129,0.35)] transition-all duration-500"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent z-10" />

                <div className={`grid lg:grid-cols-12 gap-0 ${i % 2 === 0 ? "" : "lg:[direction:rtl]"}`}>
                  {/* IMAGEM REAL DA PLANTA, reconhecimento visual */}
                  {p.imagem && (
                    <div className="lg:col-span-5 relative overflow-hidden lg:[direction:ltr] group/img min-h-[280px] md:min-h-[360px] lg:min-h-[480px]">
                      <img
                        src={p.imagem}
                        alt={`${p.nome} (${p.cientifico}): ${p.legenda || "imagem botânica de referência"}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover/img:scale-[1.04]"
                        loading="lazy"
                        width={1600}
                        height={1024}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/60" />
                      {p.legenda && (
                        <p className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7 text-foreground/95 text-xs md:text-sm leading-relaxed italic">
                          {p.legenda}
                        </p>
                      )}
                    </div>
                  )}

                  {/* DADOS DA FICHA */}
                  <div className={`${p.imagem ? "lg:col-span-7" : "lg:col-span-12"} p-7 md:p-10 lg:p-12 lg:[direction:ltr]`}>
                    <div className="flex items-start gap-5 mb-8 pb-7 border-b border-border/20">
                      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 shrink-0">
                        <Leaf className="text-emerald-400" size={26} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-400/70 mb-1.5">
                          Ficha {String(i + 1).padStart(2, "0")} de {PLANTAS.length}
                        </p>
                        <h3
                          className="text-foreground font-bold text-3xl md:text-5xl tracking-tight leading-none"
                          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
                        >
                          {p.nome}
                        </h3>
                        <p className="italic text-muted-foreground text-sm md:text-base mt-2">{p.cientifico}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 text-sm md:text-base">
                      <Field label="Alvo tóxico" v={p.alvo} />
                      <Field label="Compostos ativos" v={p.ativos} />
                      <Field label="Posologia" v={p.uso} />
                      <Field label="Ciclo de uso" v={p.ciclo} />
                      <Field label="Contraindicações" v={p.contra} danger />
                      <Field label="Sinergia obrigatória" v={p.sinergia} accent />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-emerald-400/80 uppercase mb-4">
            DÚVIDAS LEGÍTIMAS
          </p>
          <h2
            className="text-foreground font-bold mb-14 leading-[0.95]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            PERGUNTAS QUE SALVAM <span className="italic font-light text-emerald-400/95" style={{ fontFamily: "'Instrument Serif', serif" }}>fígados</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-5">
            {FAQ.map((f, i) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: APPLE_EASE }}
                className="rounded-2xl border border-emerald-900/30 bg-card/40 backdrop-blur-md p-7 md:p-8 hover:-translate-y-1 hover:border-emerald-700/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] transition-all"
              >
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-400/70 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-foreground font-bold text-xl md:text-2xl mb-4 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
                  {f.q}
                </h3>
                <p className="text-muted-foreground leading-7 text-sm md:text-base">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA RETORNO */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/40 to-card/50 backdrop-blur-md p-10 md:p-16 hover:border-emerald-400/40 transition-all">
            <div className="flex items-center gap-3 mb-5">
              <FlaskConical className="text-emerald-400" size={22} />
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-400/80">COMPLETE O CICLO</p>
            </div>
            <h3
              className="text-foreground font-bold text-4xl md:text-6xl tracking-tight mb-6 leading-[0.95]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              VOLTE AO DOSSIÊ DO <span className="italic font-light text-emerald-400/95" style={{ fontFamily: "'Instrument Serif', serif" }}>rapé</span>
            </h3>
            <p className="text-muted-foreground leading-8 mb-8 max-w-2xl text-base md:text-lg">
              Quelantes sem o protocolo de modulação vagal são meia estratégia. Volte e leia a integração
              completa com respiração, eixo HPA e rotina de blindagem.
            </p>
            <Link
              to="/soberania-organica/conhecimento-perdido/rape"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-[0.18em] uppercase hover:bg-emerald-500/25 hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.5)] transition-all"
            >
              <ArrowLeft size={14} /> Acessar o Dossiê do Rapé
            </Link>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}

function Field({ label, v, danger, accent }: { label: string; v: string; danger?: boolean; accent?: boolean }) {
  const color = danger ? "text-destructive/90" : accent ? "text-emerald-400/90" : "text-muted-foreground";
  return (
    <div>
      <p className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-2 ${color}`}>{label}</p>
      <p className="text-foreground/90 leading-7 text-sm md:text-base">{v}</p>
    </div>
  );
}
