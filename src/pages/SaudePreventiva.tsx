import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';
import RapeHookCard from '@/components/RapeHookCard';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';

import bgHero from '@/assets/saude/bg-saude-hero.webp';
import imgSol from '@/assets/saude/hero-sol.webp';
import imgSono from '@/assets/saude/hero-sono.webp';
import imgMovimento from '@/assets/saude/hero-movimento.webp';
import imgAlimentacao from '@/assets/saude/hero-alimentacao.webp';
import imgCortisol from '@/assets/saude/hero-cortisol.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface Pilar {
  numero: string;
  titulo: string;
  destaque: string;
  imagem: string;
  legenda: string;
  abertura: string;
  beneficios: string[];
  riscos: string[];
  fechamento?: string;
}

const PILARES: Pilar[] = [
  {
    numero: "01",
    titulo: "Exposição Solar",
    destaque: "imune",
    imagem: imgSol,
    legenda: "Quinze minutos de sol direto pela manhã regulam mais sistemas que qualquer suplemento isolado",
    abertura: "A vitamina D não é um nutriente. É um hormônio esteroide que regula a expressão de mais de 1.000 genes ligados a imunidade, humor e metabolismo ósseo.",
    beneficios: [
      "Reduz citocinas inflamatórias circulantes",
      "Melhora resposta antiviral inata",
      "Regula expressão genética imunológica",
      "Sincroniza ritmo circadiano e produção de melatonina",
    ],
    riscos: [
      "Infecções recorrentes",
      "Estados depressivos persistentes",
      "Osteopenia e perda mineral",
      "Fadiga crônica sem causa aparente",
    ],
    fechamento: "Filtro solar nos primeiros 15 minutos de exposição matinal anula praticamente toda a síntese cutânea. Pele exposta, sem química, durante a janela solar baixa.",
  },
  {
    numero: "02",
    titulo: "Sono Reparador",
    destaque: "homeostase",
    imagem: imgSono,
    legenda: "Sem sono profundo, nenhuma estratégia anti-inflamatória se sustenta. Esta é a base inegociável.",
    abertura: "Durante o sono profundo (N3) o sistema glinfático cerebral expulsa proteínas neurotóxicas acumuladas no dia. Sem essa janela, o cérebro acumula resíduos.",
    beneficios: [
      "Liberação de hormônio do crescimento",
      "Reparação celular sistêmica",
      "Regulação completa do eixo HPA",
      "Consolidação de memória e plasticidade neural",
    ],
    riscos: [
      "IL-6 cronicamente elevada",
      "Cortisol matinal alterado",
      "PCR ultrasensível em ascenção",
      "Resistência à insulina acelerada",
    ],
    fechamento: "Quarto absolutamente escuro, temperatura entre 18 e 20 graus, zero exposição a luz azul nas duas horas anteriores ao deitar. Higiene de sono é estrutural, não comportamental.",
  },
  {
    numero: "03",
    titulo: "Movimento Estruturado",
    destaque: "anti-inflamatório",
    imagem: imgMovimento,
    legenda: "Movimento moderado e consistente vence treinos heroicos sem recuperação",
    abertura: "Exercício moderado libera mioquinas pelas fibras musculares. Essas moléculas funcionam como anti-inflamatórios sistêmicos endógenos, sem efeito colateral.",
    beneficios: [
      "Redução documentada de TNF-alfa",
      "Sensibilidade à insulina restaurada",
      "Biogênese mitocondrial aumentada",
      "Redução de gordura visceral inflamatória",
    ],
    riscos: [
      "Excesso sem recuperação eleva inflamação",
      "Overtraining suprime função imune",
      "Cardio crônico sem força perde músculo",
      "Falta de movimento acelera senescência",
    ],
    fechamento: "Caminhada diária mais dois blocos de força semanais batem qualquer plano de academia genérico. Constância vence intensidade.",
  },
  {
    numero: "04",
    titulo: "Alimentação Funcional",
    destaque: "metabolismo",
    imagem: imgAlimentacao,
    legenda: "70% do sistema imune está ligado ao intestino. Ali se decide a inflamação basal do corpo inteiro.",
    abertura: "Picos glicêmicos pós-refeição geram estresse oxidativo cumulativo. Cada pico repetido empurra o corpo para resistência insulínica e inflamação de baixo grau.",
    beneficios: [
      "Proteína antes do carboidrato achata picos",
      "Fibras solúveis nutrem microbiota",
      "Caminhada de 10 minutos pós-refeição",
      "Fermentados naturais regulam disbiose",
    ],
    riscos: [
      "Carboidrato isolado dispara glicose",
      "Ultraprocessados destroem microbiota",
      "Adoçantes artificiais desregulam saciedade",
      "Jejum mal aplicado piora cortisol",
    ],
    fechamento: "Magnésio, zinco, ômega 3, vitamina C e curcumina formam o piso de micronutrição anti-inflamatória. Sempre dentro de faixa segura, sem megadoses cegas.",
  },
  {
    numero: "05",
    titulo: "Controle de Cortisol",
    destaque: "vagal",
    imagem: imgCortisol,
    legenda: "Cortisol cronicamente elevado sabota toda estratégia. Sem regulação vagal, o corpo permanece em alerta.",
    abertura: "O eixo HPA regula a resposta ao estresse. Quando ativado de forma crônica, o cortisol elevado dissolve massa muscular, acumula gordura visceral e suprime imunidade adquirida.",
    beneficios: [
      "Respiração nasal lenta a 4 a 6 ciclos por minuto",
      "Caminhada matinal ao ar livre",
      "Exposição solar matinal regulando ritmo",
      "Sono regular com horário consistente",
    ],
    riscos: [
      "Resistência à insulina progressiva",
      "Catabolismo muscular acelerado",
      "Gordura abdominal hormonal",
      "Supressão imune adquirida",
    ],
    fechamento: "Estimulação vagal via respiração diafragmática lenta é o atalho mais subestimado. Dois blocos de cinco minutos por dia alteram a variabilidade da frequência cardíaca em poucas semanas.",
  },
];

const FAQ = [
  {
    q: "Por onde começar se eu nunca cuidei de nada disso?",
    a: "Sono e exposição solar matinal. Esses dois pilares destravam todos os outros. Sem sono, não há recuperação muscular. Sem sol matinal, o ritmo circadiano fica desregulado e o sono nunca aprofunda.",
  },
  {
    q: "Suplementação substitui essa rotina?",
    a: "Não. Suplemento é complemento. Vitamina D em cápsula sem exposição solar real entrega o nutriente isolado, sem o sinal hormonal completo que o corpo lê quando a pele recebe UVB direto.",
  },
  {
    q: "Quanto tempo até notar mudança real?",
    a: "Marcadores subjetivos como energia, humor e qualidade do sono mudam em duas a quatro semanas. Marcadores laboratoriais como PCR, glicemia e perfil lipídico levam de 8 a 12 semanas de consistência.",
  },
  {
    q: "Posso aplicar tudo isso com doença crônica diagnosticada?",
    a: "Cada pilar exige adaptação individual. Diabéticos, autoimunes, cardiopatas e gestantes precisam de orientação médica antes de modificar exposição solar prolongada, jejum, suplementação ou intensidade de exercício.",
  },
  {
    q: "Existe um marcador único que indica blindagem?",
    a: "Não existe métrica única. PCR ultrasensível abaixo de 1, HOMA-IR abaixo de 1.5, vitamina D entre 50 e 80 ng/ml, variabilidade de frequência cardíaca dentro da faixa de idade e sono profundo acima de 90 minutos por noite formam o painel mínimo.",
  },
];

const SaudePreventiva = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "name": "Saúde Preventiva: Blindagem Imunológica e Anti-Inflamatória",
        "url": "https://lordjunnior.com.br/soberania-organica/saude-preventiva",
        "description": "Cinco pilares de soberania biológica: sol, sono, movimento, alimentação e cortisol. Protocolo técnico contra inflamação crônica.",
        "lastReviewed": "2026-04-20",
        "medicalAudience": "Patients",
        "about": [
          { "@type": "Thing", "name": "Inflamação crônica" },
          { "@type": "Thing", "name": "Saúde preventiva" },
          { "@type": "Thing", "name": "Eixo HPA e cortisol" },
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
        <title>Saúde Preventiva: 5 Pilares de Blindagem Imunológica | Lord Junnior</title>
        <meta name="description" content="Sol, sono, movimento, alimentação e cortisol: protocolo técnico de saúde preventiva contra inflamação crônica. Sem dependência do sistema convencional." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/saude-preventiva" />
        <meta property="og:title" content="Saúde Preventiva: 5 Pilares de Blindagem Imunológica" />
        <meta property="og:description" content="Cinco pilares biológicos validados contra inflamação crônica e disfunção metabólica." />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <FixedThematicBackground image={bgHero} intensity="heavy" />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* HERO FULL-SCREEN APPLE-LIKE */}
      <section className="relative z-10 min-h-[90vh] flex items-center px-6 md:px-12 lg:px-20 pt-12 pb-20">
        <div className="w-full max-w-7xl mx-auto">
          <Link
            to="/soberania-organica"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-emerald-400 mb-10 hover:gap-3 transition-all"
          >
            <ArrowLeft size={12} /> Soberania Orgânica
          </Link>

          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-emerald-400/80 uppercase mb-8">
            FASE 02 · AUTONOMIA BIOLÓGICA · CINCO PILARES
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
            SAÚDE <br />
            <span className="text-emerald-400/95 italic font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
              preventiva
            </span>
          </motion.h1>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <p className="lg:col-span-7 text-muted-foreground text-lg md:text-2xl leading-relaxed">
              Saúde preventiva não é ausência de doença. É a capacidade do corpo de manter homeostase
              sob estresse, sem precisar de medicação contínua para isso. Cinco pilares biológicos sustentam
              esse estado. Quando qualquer um desmorona, o corpo entra em inflamação de baixo grau.
            </p>

            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              {[
                { n: "5", l: "Pilares biológicos" },
                { n: "70%", l: "Imunidade no intestino" },
                { n: "12s", l: "Janela de marcadores" },
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
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Role para a base biológica</span>
          </div>
        </div>
      </section>

      {/* ABERTURA: INFLAMAÇÃO CRÔNICA */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-destructive/80 mb-4">
                BASE
              </p>
              <h2
                className="text-foreground font-bold leading-[0.95] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                INFLAMAÇÃO <span className="italic font-light text-destructive/90" style={{ fontFamily: "'Instrument Serif', serif" }}>crônica</span>
              </h2>
              <p className="text-muted-foreground leading-8 text-base md:text-lg mb-6">
                Inflamação aguda é protetora. Inflamação crônica é destrutiva. Ela ocorre quando o sistema
                imune permanece ativado de forma leve e constante, sem janela de descanso.
              </p>
              <p className="text-muted-foreground leading-8 text-base md:text-lg">
                O objetivo preventivo é reduzir a inflamação basal sem bloquear o sistema imune.
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 backdrop-blur-md p-6 hover:-translate-y-1 hover:border-destructive/40 transition-all">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-destructive/70 mb-3">Marcadores envolvidos</p>
                <ul className="space-y-3 text-foreground/85 text-base">
                  <li>IL-6 elevada</li>
                  <li>TNF-alfa em ascenção</li>
                  <li>PCR ultrasensível alta</li>
                  <li>Cortisol cronicamente elevado</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md p-6 hover:-translate-y-1 hover:border-amber-500/40 transition-all">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-400/80 mb-3">Consequências sistêmicas</p>
                <ul className="space-y-3 text-foreground/85 text-base">
                  <li>Danos vasculares</li>
                  <li>Rigidez arterial</li>
                  <li>Disfunção metabólica</li>
                  <li>Alteração de humor e fadiga</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CINCO PILARES COM IMAGENS GRANDES */}
      {PILARES.map((p, i) => (
        <section key={p.numero} className="relative z-10 px-6 md:px-12 lg:px-20 mb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: APPLE_EASE }}
              className="mb-10 rounded-3xl overflow-hidden border border-emerald-900/30 group"
            >
              <div className="relative">
                <img
                  src={p.imagem}
                  alt={p.legenda}
                  className="w-full h-[55vh] md:h-[75vh] object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  loading={i === 0 ? "eager" : "lazy"}
                  width={1920}
                  height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
                  <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-emerald-400/80 mb-3">
                    PILAR {p.numero} DE 05
                  </p>
                  <h2
                    className="text-foreground font-bold leading-[0.95] max-w-4xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "0.01em" }}
                  >
                    {p.titulo.toUpperCase()} <br />
                    <span className="italic font-light text-emerald-400/95" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      como {p.destaque}
                    </span>
                  </h2>
                </div>
              </div>
            </motion.div>

            <p className="text-muted-foreground/80 italic text-sm md:text-base mb-10 max-w-3xl">
              {p.legenda}
            </p>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <p className="text-foreground/90 leading-8 text-lg md:text-xl mb-8">
                  {p.abertura}
                </p>
                {p.fechamento && (
                  <div className="rounded-2xl border border-emerald-900/30 bg-card/40 backdrop-blur-md p-7 hover:-translate-y-1 hover:border-emerald-700/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] transition-all">
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-400/70 mb-3">Aplicação prática</p>
                    <p className="text-foreground/90 leading-7 text-base md:text-lg">{p.fechamento}</p>
                  </div>
                )}
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md p-6 hover:-translate-y-1 hover:border-emerald-500/40 transition-all">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-400/80 mb-4">Benefícios documentados</p>
                  <ul className="space-y-3 text-foreground/90 text-base">
                    {p.beneficios.map(b => <li key={b} className="leading-snug">{b}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 backdrop-blur-md p-6 hover:-translate-y-1 hover:border-destructive/40 transition-all">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-destructive/80 mb-4">Sinais de falha do pilar</p>
                  <ul className="space-y-3 text-foreground/90 text-base">
                    {p.riscos.map(r => <li key={r} className="leading-snug">{r}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* PROTOCOLO DIÁRIO */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-emerald-400/80 uppercase mb-4">
            PROTOCOLO DIÁRIO
          </p>
          <h2
            className="text-foreground font-bold mb-14 leading-[0.95]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            BASE OPERACIONAL <span className="italic font-light text-emerald-400/95" style={{ fontFamily: "'Instrument Serif', serif" }}>diária</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { l: "Sol direto", v: "15 a 30 minutos pela manhã sem filtro" },
              { l: "Movimento", v: "20 a 30 minutos diários, força duas vezes na semana" },
              { l: "Alimentação", v: "Proteína antes do carboidrato, fibras, fermentados" },
              { l: "Sono", v: "7 a 9 horas, quarto escuro a 18 a 20 graus" },
              { l: "Hidratação", v: "30ml por kg de peso, com sais minerais" },
              { l: "Regulação vagal", v: "Dois blocos de 5 minutos de respiração lenta" },
            ].map(item => (
              <div key={item.l} className="rounded-2xl border border-emerald-900/30 bg-card/40 backdrop-blur-md p-7 hover:-translate-y-1 hover:border-emerald-700/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] transition-all">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-400/70 mb-3">{item.l}</p>
                <p className="text-foreground/90 leading-7 text-base md:text-lg">{item.v}</p>
              </div>
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
            PERGUNTAS QUE BLINDAM <span className="italic font-light text-emerald-400/95" style={{ fontFamily: "'Instrument Serif', serif" }}>rotinas</span>
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

      {/* DISCLAIMER */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md p-7 md:p-9 flex gap-5 items-start hover:border-amber-500/40 transition-all">
            <AlertTriangle className="text-amber-400 shrink-0 mt-1" size={26} />
            <div>
              <p className="text-xs font-mono tracking-[0.3em] uppercase text-amber-400/90 mb-3">AVISO LEGAL</p>
              <p className="text-base md:text-lg text-foreground/85 leading-8">
                Este conteúdo é educacional e informativo. Não substitui avaliação médica profissional,
                diagnóstico ou tratamento. Consulte sempre um profissional de saúde antes de modificar
                sua rotina, especialmente se possui condições pré-existentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RAPÉ HOOK */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 mb-16">
        <div className="max-w-7xl mx-auto">
          <RapeHookCard
            variant="saude"
            title="RAPÉ: Modulação Vagal Ancestral"
            hook="Antes da meditação virar app, povos amazônicos já regulavam o eixo HPA com um pó cerimonial. Não é misticismo, é bioquímica do nervo vago documentada em literatura técnica. O dossiê está aqui."
          />
        </div>
      </section>

      {/* NAV FOOTER */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4">
          <Link
            to="/soberania-organica"
            className="flex-1 group flex items-center justify-center gap-2 rounded-2xl border border-emerald-900/30 bg-card/40 backdrop-blur-md px-7 py-6 text-muted-foreground text-sm font-bold tracking-[0.18em] uppercase hover:-translate-y-0.5 hover:border-emerald-700/50 hover:text-emerald-400 transition-all"
          >
            <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Soberania Orgânica
          </Link>
          <Link
            to="/soberania-organica/avaliacao-sinais"
            className="flex-1 group flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 backdrop-blur-md px-7 py-6 text-emerald-300 text-sm font-bold tracking-[0.18em] uppercase hover:-translate-y-0.5 hover:bg-emerald-500/25 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.5)] transition-all"
          >
            Avaliação de Sinais
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <MicroCtaResistencia variant="saude" />
      <ScrollToTop />
    </div>
  );
};

export default SaudePreventiva;
