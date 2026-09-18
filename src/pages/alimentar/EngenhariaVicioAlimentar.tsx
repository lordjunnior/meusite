import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Timer, FlaskConical, Brain, Dices,
  Activity, AlertTriangle, Eye, Volume2, Flame, Sparkles, BookOpen,
  Library, Newspaper, Mic, ScrollText, CheckCircle2, Quote,
} from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';
import ChipDustBackground from '@/components/backgrounds/ChipDustBackground';

import imgHero from '@/assets/eva/hero-lab-engenharia.webp';
import imgChip from '@/assets/eva/chip-macro-isolado.webp';
import imgKnolling from '@/assets/eva/knolling-analise.webp';
import imgHandMouth from '@/assets/eva/hand-to-mouth.webp';
import imgDopamina from '@/assets/eva/dopamina-molecula.webp';
import imgSlot from '@/assets/eva/slot-machine-vicio.webp';
import imgCrocancia from '@/assets/eva/crocancia-acustica.webp';
import imgCurva from '@/assets/eva/curva-gaussiana.webp';
import imgBliss from '@/assets/eva/bliss-point.webp';
import imgComidaReal from '@/assets/eva/comida-real-ancestral.webp';
import imgColor from '@/assets/eva/colorimetro-cor.webp';
import imgBiblioteca from '@/assets/eva/biblioteca-fontes.webp';
import imgInvestigacao from '@/assets/eva/investigacao-recorte.webp';
import imgEvidencias from '@/assets/eva/evidencias-knolling.webp';

/**
 * /soberania-organica/engenharia-vicio-alimentar
 * Padrão Apple Editorial. Paleta DORITOS (denúncia industrial):
 *  - Bone (#f4ede1) sand creme industrial
 *  - Onyx (#0a0a0a) preto tinta
 *  - Yellow nuclear (#f4c430)
 *  - Burnt orange (#e8631c)
 *  - Pepper red (#c8102e)
 *  - Charcoal (#1c1916)
 * Hero 92vh, alternância claro/escuro, Inter Tight 900 + Playfair italic.
 * 11 imagens cinematográficas, FAQ rico, JSON-LD Article + FAQPage + BreadcrumbList.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: APPLE_EASE, delay },
});

/* Paleta Doritos */
const BONE = '#f4ede1';
const BONE_DEEP = '#e8dfce';
const ONYX = '#0a0a0a';
const CHARCOAL = '#1c1916';
const YELLOW = '#f4c430';
const ORANGE = '#e8631c';
const RED = '#c8102e';
const CREAM_TXT = '#f4ede1';

const display: React.CSSProperties = {
  fontFamily: "'Inter Tight', sans-serif",
  fontWeight: 900,
  letterSpacing: '-0.04em',
  lineHeight: 0.92,
};
const editorial: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontStyle: 'italic',
  fontWeight: 700,
};
const mono: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
};

const PILARES = [
  { n: '01', icon: Eye, titulo: 'Cor calibrada', resumo: 'Pigmentos engenheirados com colorímetro para disparar fome visual antes da primeira mordida.' },
  { n: '02', icon: Volume2, titulo: 'Crocância acústica', resumo: 'Frequência sonora da mordida medida em laboratório. Crunch é gatilho neural, não acaso.' },
  { n: '03', icon: Flame, titulo: 'Bliss point', resumo: 'Ponto matemático de saturação entre sal, gordura e açúcar. Acima dele, o paladar enjoa. Abaixo, ignora.' },
  { n: '04', icon: Dices, titulo: 'Variabilidade aleatória', resumo: 'Surpresa randomizada por chip. Mesma engenharia das máquinas caça-níquel para travar o cérebro em loop.' },
];

const FAQ = [
  {
    q: 'É verdade que ultraprocessados são desenhados para viciar?',
    a: 'Sim, e a indústria não esconde mais. Engenheiros de alimentos publicam papers sobre "hand-to-mouth rate" (taxa mão-boca), "bliss point" e "vanishing caloric density" há décadas. O design persegue justamente a falha do mecanismo natural de saciedade: a comida derrete na boca antes do cérebro registrar volume calórico, então você continua comendo.',
  },
  {
    q: 'O que é o "bliss point"?',
    a: 'É um conceito formalizado pelo psicofísico Howard Moskowitz nos anos 70, ainda contratado por gigantes da alimentação. É o ponto matemático ótimo de combinação entre sal, açúcar e gordura no qual o cérebro libera dopamina máxima sem o paladar se enjoar. Cada produto industrial é testado em centenas de variações até encontrar esse ponto exato.',
  },
  {
    q: 'Por que a crocância importa tanto?',
    a: 'Porque o som da mordida é processado pelo mesmo circuito cerebral de prazer da comida. Pesquisas de Charles Spence, em Oxford, mostraram que aumentar artificialmente o som do crunch faz o cérebro perceber a comida como mais fresca e gostosa. Por isso ultraprocessados são engenheirados para emitir uma frequência sonora alta e seca na mordida.',
  },
  {
    q: 'A história do Doritos Roleta com distribuição de picância é real?',
    a: 'Sim. O autor americano Robb Wolf documenta o caso após contato direto com a equipe de food engineering da PepsiCo. A picância dentro do saco segue uma curva de distribuição estatística desenhada para gerar surpresa, exatamente o mesmo princípio neurológico das máquinas caça-níquel. O cérebro vicia mais em recompensas variáveis do que em recompensas constantes.',
  },
  {
    q: 'Por que dizem que "é impossível comer só um"?',
    a: 'Porque é design de produto, não preguiça do consumidor. A combinação de "vanishing caloric density" (a comida desaparece na boca sem peso), bliss point e crocância acústica engana o sistema de saciedade. Antes do cérebro receber o sinal de "satisfeito", a mão já voltou ao saco. A frase do marketing virou confissão técnica.',
  },
  {
    q: 'Quem é Robb Wolf e por que ele é referência aqui?',
    a: 'Robb Wolf é bioquímico, pesquisador e autor do livro Wired to Eat (2017), que destrincha como a indústria sequestra mecanismos evolutivos de fome e recompensa. É uma das vozes técnicas mais respeitadas no debate sobre comida real versus comida industrial.',
  },
  {
    q: 'O que é "vanishing caloric density"?',
    a: 'É um termo cunhado por engenheiros de alimentos para descrever produtos que parecem desaparecer na boca, sem deixar sensação de volume. Salgadinhos crocantes, marshmallow industrial e biscoitos waffer usam o efeito. O cérebro nunca recebe o sinal completo de saciedade, então o consumo continua muito além do necessário.',
  },
  {
    q: 'Como sair desse loop sem precisar de força de vontade?',
    a: 'Força de vontade não vence engenharia. O caminho é reduzir o gatilho ambiental: tirar ultraprocessado de casa, restabelecer o paladar com comida real (sal natural, gordura animal, frutas inteiras, fermentados) e devolver ao corpo o sinal de saciedade que ele perdeu. Em poucas semanas a percepção de "delícia" se reorganiza.',
  },
];

const EngenhariaVicioAlimentar = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://lordjunnior.com.br/soberania-organica/engenharia-vicio-alimentar',
        headline: 'Por Que Você Não Consegue Comer Só Um: A Engenharia do Vício nos Ultraprocessados',
        description: 'A indústria alimentar usa colorimetria, bliss point, crocância acústica e variabilidade randomizada para sequestrar seu sistema de recompensa. Investigação editorial.',
        inLanguage: 'pt-BR',
        articleSection: 'Soberania Orgânica',
        author: { '@type': 'Person', name: 'Lord Junnior' },
        publisher: { '@type': 'Organization', name: 'Lord Junnior' },
        datePublished: '2026-04-26',
        dateModified: '2026-04-26',
        image: 'https://lordjunnior.com.br' + imgHero,
        keywords: 'engenharia alimentar, ultraprocessados, vício alimentar, doritos, bliss point, hand to mouth, dopamina, comida industrial, robb wolf',
        citation: [
          { '@type': 'Book', name: 'Wired to Eat', author: { '@type': 'Person', name: 'Robb Wolf' }, datePublished: '2017', isbn: '978-0451498564' },
          { '@type': 'Book', name: 'The Dorito Effect', author: { '@type': 'Person', name: 'Mark Schatzker' }, datePublished: '2015', isbn: '978-1476724232' },
          { '@type': 'Book', name: 'Salt Sugar Fat: How the Food Giants Hooked Us', author: { '@type': 'Person', name: 'Michael Moss' }, datePublished: '2013', isbn: '978-0812982190' },
          { '@type': 'NewsArticle', headline: 'The Extraordinary Science of Addictive Junk Food', author: { '@type': 'Person', name: 'Michael Moss' }, publisher: { '@type': 'Organization', name: 'The New York Times' }, datePublished: '2013-02-20' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br/' },
          { '@type': 'ListItem', position: 2, name: 'Soberania Orgânica', item: 'https://lordjunnior.com.br/soberania-organica' },
          { '@type': 'ListItem', position: 3, name: 'Alimentar & Cultivo', item: 'https://lordjunnior.com.br/soberania-organica' },
          { '@type': 'ListItem', position: 4, name: 'Engenharia do Vício Alimentar', item: 'https://lordjunnior.com.br/soberania-organica/engenharia-vicio-alimentar' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Por Que Você Não Consegue Comer Só Um: A Engenharia do Vício | Lord Junnior</title>
        <meta name="description" content="Investigação editorial sobre engenharia alimentar: colorimetria, bliss point, crocância acústica e variabilidade randomizada que sequestram seu cérebro nos ultraprocessados." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/engenharia-vicio-alimentar" />
        <meta property="og:title" content="A Engenharia do Vício nos Ultraprocessados" />
        <meta property="og:description" content="Você não tem força de vontade fraca. Você tem um adversário com PhD." />
        <meta property="og:image" content={imgHero} />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/engenharia-vicio-alimentar" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="relative z-50 px-6 md:px-12 lg:px-20 pt-[52px]" style={{ background: ONYX }}>
        <BackToHome />
      </div>

      <article className="min-h-screen relative" style={{ background: BONE, color: ONYX }}>
        {/* Fundo temático persistente — pó/cristais de tempero industrial em overlay */}
        <ChipDustBackground mode="overlay" />
        {/* ═══ HERO 92vh ═══ */}
        <section className="relative w-full overflow-hidden" style={{ height: '92vh', minHeight: 720, background: ONYX }}>
          <img
            src={imgHero}
            alt="Laboratório de engenharia de alimentos analisando ultraprocessados sob luz clínica"
           
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.55) saturate(1.15) contrast(1.05)' }} loading="eager" fetchPriority="high" decoding="async" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.05) 30%, rgba(10,10,10,0.45) 70%, rgba(10,10,10,0.97) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 70% 55% at 88% 18%, rgba(244,196,48,0.22), transparent 60%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 12% 85%, rgba(232,99,28,0.22), transparent 60%)',
            }}
          />

          <div className="relative z-10 h-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-end pb-16 md:pb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: APPLE_EASE }}>
              <span style={{ ...mono, color: YELLOW, fontSize: 11 }}>
                Soberania Orgânica · Investigação Editorial
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.15, ease: APPLE_EASE }}
              className="mt-6"
              style={{ ...display, fontSize: 'clamp(2.6rem, 8.5vw, 8rem)', color: BONE }}
            >
              Por que você
              <br />
              não consegue
              <br />
              <span style={{ ...editorial, color: YELLOW, textShadow: '0 0 40px rgba(0,0,0,0.85), 0 0 80px rgba(244,196,48,0.4)' }}>
                comer só um.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: APPLE_EASE }}
              className="mt-8 max-w-3xl"
              style={{ color: 'rgba(244,237,225,0.88)', fontFamily: "'Inter Tight', sans-serif", fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)', lineHeight: 1.45 }}
            >
              Você não tem força de vontade fraca. Você tem{' '}
              <span style={editorial}>um adversário com PhD</span>, calculadora na mão e um colorímetro na bancada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: APPLE_EASE }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-3 px-5 py-3 rounded-full" style={{ background: 'rgba(244,237,225,0.06)', border: '1px solid rgba(244,196,48,0.32)' }}>
                <Timer size={16} style={{ color: YELLOW }} />
                <span className="text-sm" style={{ color: BONE, fontFamily: "'Inter Tight', sans-serif", fontWeight: 600 }}>
                  Leitura de 16 minutos
                </span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-full" style={{ background: 'rgba(244,237,225,0.06)', border: '1px solid rgba(232,99,28,0.32)' }}>
                <FlaskConical size={16} style={{ color: ORANGE }} />
                <span className="text-sm" style={{ color: BONE, fontFamily: "'Inter Tight', sans-serif", fontWeight: 600 }}>
                  Investigação técnica
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.4 }}
              className="absolute bottom-8 right-8 md:right-20 flex items-center gap-3"
            >
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <ChevronDown size={18} style={{ color: YELLOW }} />
              </motion.div>
              <span style={{ ...mono, color: YELLOW, fontSize: 10 }}>desça</span>
            </motion.div>
          </div>
        </section>

        {/* ═══ § 01 · ABERTURA EDITORIAL ═══ */}
        <section className="relative" style={{ background: BONE }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-36">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              <motion.div {...fade()} className="lg:col-span-4">
                <span style={{ ...mono, color: ORANGE, fontSize: 11 }}>§ 01 · A Confissão</span>
                <div className="mt-6 h-[1px] w-16" style={{ background: ONYX }} />
              </motion.div>

              <motion.div {...fade(0.08)} className="lg:col-span-8">
                <h2 style={{ ...display, fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', color: ONYX }}>
                  Existe cocaína no salgadinho?{' '}
                  <span style={{ ...editorial, color: ORANGE }}>Não. Existe coisa pior.</span>
                </h2>
                <p className="mt-10 text-xl md:text-2xl leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
                  Existe um time de engenheiros de alimentos com doutorado em psicofísica, equipamento de calibração de cor de nível farmacêutico e bancos de dados com{' '}
                  <span style={editorial}>milhares de variações</span> testadas em painéis sensoriais até achar a combinação exata que sequestra o seu cérebro.
                </p>
                <p className="mt-6 text-lg md:text-xl leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif", opacity: 0.78 }}>
                  O bioquímico Robb Wolf, autor de <em style={editorial}>Wired to Eat</em>, conta que perguntou diretamente à equipe de food engineering da PepsiCo se o famoso "Doritos Roleta" seguia uma curva estatística de distribuição de picância dentro do saco. A resposta dos engenheiros foi entusiasmada: <em style={editorial}>"Sim, somos fãs do seu trabalho. Seguimos uma distribuição gaussiana."</em>
                </p>
                <p className="mt-6 text-lg md:text-xl leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif", opacity: 0.78 }}>
                  Traduzindo: a picância de cada chip dentro do saco é{' '}
                  <strong style={{ color: RED }}>aleatória de propósito</strong>. Não é falha de produção. É o mesmo princípio neurológico que faz uma máquina caça-níquel ser viciante.
                </p>
              </motion.div>
            </div>

            {/* Citação editorial destacada */}
            <motion.blockquote
              {...fade(0.15)}
              className="mt-24 max-w-5xl mx-auto text-center"
            >
              <div className="text-6xl md:text-8xl leading-none mb-6" style={{ ...editorial, color: ORANGE }}>"</div>
              <p style={{ ...editorial, fontSize: 'clamp(1.8rem, 3.2vw, 3rem)', color: ONYX, lineHeight: 1.25 }}>
                Eles calculam a taxa <span style={{ color: ORANGE }}>mão-boca</span>. Quão rápido a sua mão volta ao saco depois do primeiro chip. Tudo é métrica. Nada é acidente.
              </p>
              <footer className="mt-8" style={{ ...mono, color: CHARCOAL, fontSize: 11, opacity: 0.7 }}>
                — Robb Wolf · bioquímico · Wired to Eat
              </footer>
            </motion.blockquote>

            {/* Quatro pilares — bento horizontal */}
            <div className="mt-32 grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(10,10,10,0.15)' }}>
              {PILARES.map((p, i) => (
                <motion.div
                  key={p.n}
                  {...fade(i * 0.06)}
                  className="relative p-8 md:p-10 group"
                  style={{ background: BONE }}
                >
                  <span style={{ ...mono, color: ORANGE, fontSize: 10 }}>{p.n}</span>
                  <p.icon size={28} style={{ color: ONYX, marginTop: 24 }} />
                  <h3 className="mt-6" style={{ ...display, fontSize: 'clamp(1.4rem, 1.8vw, 2rem)', color: ONYX }}>
                    {p.titulo}
                  </h3>
                  <p className="mt-3 text-base leading-snug" style={{ color: CHARCOAL, opacity: 0.78, fontFamily: "'Inter Tight', sans-serif" }}>
                    {p.resumo}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ § 02 · HAND TO MOUTH (preto/charcoal) ═══ */}
        <section className="relative" style={{ background: ONYX, color: BONE }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <div className="grid lg:grid-cols-12 gap-12">
              <motion.div {...fade()} className="lg:col-span-5 lg:sticky lg:top-24 self-start">
                <span style={{ ...mono, color: YELLOW, fontSize: 11 }}>§ 02 · Hand-to-Mouth</span>
                <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.6rem, 5.8vw, 5.6rem)', color: BONE }}>
                  A métrica
                  <br />
                  <span style={{ ...editorial, color: YELLOW, textShadow: '0 0 30px rgba(244,196,48,0.45)' }}>
                    invisível.
                  </span>
                </h2>
                <p className="mt-8 text-xl leading-relaxed" style={{ color: 'rgba(244,237,225,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
                  Engenheiros de alimentos cronometram o intervalo entre uma mordida e a próxima. Quanto menor esse intervalo,{' '}
                  <em style={editorial}>maior é o vício</em> embutido no produto.
                </p>
              </motion.div>

              <div className="lg:col-span-7 space-y-12">
                <motion.figure {...fade(0.1)} className="overflow-hidden rounded-sm">
                  <img
                    src={imgHandMouth}
                    alt="Mão alcançando saco amarelo de salgadinhos com motion blur de repetição"
                    loading="lazy"
                    className="w-full h-[460px] md:h-[600px] object-cover"
                  />
                  <figcaption className="mt-4 flex items-center gap-3" style={{ ...mono, color: YELLOW, fontSize: 10 }}>
                    <span className="h-px w-8" style={{ background: YELLOW }} />
                    A taxa mão-boca é o KPI mais importante da indústria de snacks
                  </figcaption>
                </motion.figure>

                <motion.div {...fade(0.15)} className="border-l-2 pl-8" style={{ borderColor: YELLOW }}>
                  <h3 style={{ ...display, fontSize: 'clamp(1.8rem, 2.5vw, 2.6rem)', color: BONE }}>
                    Vanishing caloric density
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed" style={{ color: 'rgba(244,237,225,0.78)', fontFamily: "'Inter Tight', sans-serif" }}>
                    O termo técnico para "comida que desaparece na boca". Foi documentado pelo jornalista investigativo Michael Moss em <em style={editorial}>Salt Sugar Fat</em>: produtos crocantes que derretem antes do estômago dilatar e antes do cérebro processar densidade calórica.
                  </p>
                  <p className="mt-4 text-lg leading-relaxed" style={{ color: 'rgba(244,237,225,0.78)', fontFamily: "'Inter Tight', sans-serif" }}>
                    O resultado é cirúrgico: você ingere{' '}
                    <strong style={{ color: ORANGE }}>500, 700, 1000 calorias</strong> sem nenhum sinal natural de saciedade. O cérebro acha que você ainda nem começou.
                  </p>
                </motion.div>

                <motion.div {...fade(0.2)} className="grid grid-cols-3 gap-4 mt-12">
                  {[
                    { v: '< 1.2s', l: 'Intervalo médio entre mordidas em snack viciante' },
                    { v: '0', l: 'Sinal de saciedade emitido nesse intervalo' },
                    { v: '∞', l: 'Loops possíveis até o saco acabar' },
                  ].map((s, i) => (
                    <div key={i} className="p-6" style={{ background: CHARCOAL, border: '1px solid rgba(244,196,48,0.18)' }}>
                      <p style={{ ...display, fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', color: YELLOW }}>{s.v}</p>
                      <p className="mt-2 text-xs leading-snug" style={{ color: 'rgba(244,237,225,0.6)', fontFamily: "'Inter Tight', sans-serif" }}>
                        {s.l}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ § 03 · QUARTETO DO VÍCIO (BONE) ═══ */}
        <section className="relative" style={{ background: BONE_DEEP, color: ONYX }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <motion.div {...fade()} className="max-w-4xl">
              <span style={{ ...mono, color: ORANGE, fontSize: 11 }}>§ 03 · O Quarteto do Vício</span>
              <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.6rem, 5.8vw, 5.6rem)', color: ONYX }}>
                Quatro alavancas{' '}
                <span style={{ ...editorial, color: ORANGE }}>operadas em conjunto.</span>
              </h2>
              <p className="mt-8 text-xl md:text-2xl leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif" }}>
                Não é uma coisa só. É um sistema de quatro engrenagens calibradas para travar o seu cérebro em loop antes que a saciedade tenha chance de aparecer.
              </p>
            </motion.div>

            {/* Bloco 1 — Cor */}
            <motion.div {...fade(0.1)} className="mt-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <figure className="overflow-hidden rounded-sm order-2 lg:order-1">
                <img src={imgColor} alt="Caderno de calibração de cor com chart de pigmentos amarelo laranja vermelho" loading="lazy" className="w-full h-[460px] md:h-[560px] object-cover" />
              </figure>
              <div className="order-1 lg:order-2">
                <span style={{ ...mono, color: ORANGE, fontSize: 11 }}>Alavanca 01</span>
                <h3 className="mt-4" style={{ ...display, fontSize: 'clamp(2rem, 3.5vw, 3.4rem)', color: ONYX }}>
                  A cor é arma.
                </h3>
                <p className="mt-6 text-lg leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif" }}>
                  Pigmentos como o amarelo tartrazina (E102) e o laranja Sunset Yellow (E110) não estão lá por estética. São calibrados em colorímetro até atingir a saturação que o cérebro humano associa a comida fresca, madura e energeticamente densa, mesmo que o produto não tenha nada disso.
                </p>
                <p className="mt-4 text-lg leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif", opacity: 0.78 }}>
                  Antes da primeira mordida, sua dopamina já subiu. A fome visual foi engenheirada.
                </p>
              </div>
            </motion.div>

            {/* Bloco 2 — Crocância */}
            <motion.div {...fade(0.12)} className="mt-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span style={{ ...mono, color: ORANGE, fontSize: 11 }}>Alavanca 02</span>
                <h3 className="mt-4" style={{ ...display, fontSize: 'clamp(2rem, 3.5vw, 3.4rem)', color: ONYX }}>
                  O som da mordida foi composto.
                </h3>
                <p className="mt-6 text-lg leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif" }}>
                  O psicólogo experimental Charles Spence, da Universidade de Oxford, demonstrou que o som agudo e seco da mordida é processado pelo mesmo circuito cerebral de prazer da comida. Aumentar artificialmente o volume do crunch faz o cérebro perceber o produto como mais fresco e gostoso.
                </p>
                <p className="mt-4 text-lg leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif", opacity: 0.78 }}>
                  Ultraprocessados são desenhados para emitir{' '}
                  <em style={editorial}>uma frequência sonora específica</em> entre 90 dB e 110 dB no ato da mordida. Alta o suficiente para o cérebro registrar como evento de prazer. Não é casualidade. É composição.
                </p>
              </div>
              <figure className="overflow-hidden rounded-sm">
                <img src={imgCrocancia} alt="Macro de chip laranja se quebrando em fragmentos no ar contra fundo preto" loading="lazy" className="w-full h-[460px] md:h-[560px] object-cover" />
              </figure>
            </motion.div>

            {/* Bloco 3 — Bliss point */}
            <motion.div {...fade(0.14)} className="mt-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <figure className="overflow-hidden rounded-sm order-2 lg:order-1">
                <img src={imgBliss} alt="Três béqueres de laboratório com sal açúcar e óleo representando o bliss point" loading="lazy" className="w-full h-[460px] md:h-[560px] object-cover" />
              </figure>
              <div className="order-1 lg:order-2">
                <span style={{ ...mono, color: ORANGE, fontSize: 11 }}>Alavanca 03</span>
                <h3 className="mt-4" style={{ ...display, fontSize: 'clamp(2rem, 3.5vw, 3.4rem)', color: ONYX }}>
                  O ponto matemático do prazer.
                </h3>
                <p className="mt-6 text-lg leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif" }}>
                  O <em style={editorial}>bliss point</em> foi formalizado pelo psicofísico americano Howard Moskowitz nos anos 70. É o ponto matemático ótimo na curva de combinação entre sal, açúcar e gordura no qual o cérebro libera a quantidade máxima de dopamina antes que o paladar comece a enjoar.
                </p>
                <p className="mt-4 text-lg leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif", opacity: 0.78 }}>
                  Cada produto industrial é testado em centenas de variações, com painéis sensoriais que fazem milhares de mordidas, até a curva apontar o pico. O bliss point dos Doritos é diferente do bliss point da Coca-Cola, que é diferente do bliss point do Oreo.{' '}
                  <strong style={{ color: RED }}>Cada um tem seu próprio.</strong>
                </p>
              </div>
            </motion.div>

            {/* Bloco 4 — Variabilidade */}
            <motion.div {...fade(0.16)} className="mt-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span style={{ ...mono, color: ORANGE, fontSize: 11 }}>Alavanca 04</span>
                <h3 className="mt-4" style={{ ...display, fontSize: 'clamp(2rem, 3.5vw, 3.4rem)', color: ONYX }}>
                  Recompensa variável: a engenharia da escravidão.
                </h3>
                <p className="mt-6 text-lg leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif" }}>
                  Aqui está o golpe mais sofisticado. O cérebro vicia mais em recompensa <em style={editorial}>variável</em> do que em recompensa constante. É o princípio descoberto pelo psicólogo B. F. Skinner em experimentos com pombos nos anos 50, e usado depois em máquinas caça-níquel, redes sociais, jogos de azar e, agora, no salgadinho.
                </p>
                <p className="mt-4 text-lg leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif", opacity: 0.78 }}>
                  A cada chip que você pega, o cérebro não sabe se virá um chip suave, médio ou explosivamente picante. Essa incerteza é o que mantém o loop ativo. Você não está comendo por fome. Está jogando.
                </p>
              </div>
              <figure className="overflow-hidden rounded-sm">
                <img src={imgCurva} alt="Distribuição gaussiana 3D feita com chips amarelos e vermelhos" loading="lazy" className="w-full h-[460px] md:h-[560px] object-cover" />
              </figure>
            </motion.div>
          </div>
        </section>

        {/* ═══ § 04 · DOPAMINA + SLOT MACHINE (CHARCOAL) ═══ */}
        <section className="relative" style={{ background: CHARCOAL, color: BONE }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <div className="grid lg:grid-cols-12 gap-12">
              <motion.div {...fade()} className="lg:col-span-5 lg:sticky lg:top-24 self-start">
                <span style={{ ...mono, color: ORANGE, fontSize: 11 }}>§ 04 · Slot Machine</span>
                <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.6rem, 5.8vw, 5.6rem)', color: BONE }}>
                  É a mesma engenharia
                  <br />
                  <span style={{ ...editorial, color: ORANGE, textShadow: '0 0 30px rgba(232,99,28,0.5)' }}>
                    do cassino.
                  </span>
                </h2>
                <p className="mt-8 text-xl leading-relaxed" style={{ color: 'rgba(244,237,225,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
                  O caça-níquel não dá prêmio toda vez. Ele dá prêmio em intervalo aleatório. É exatamente isso que mantém o jogador puxando a alavanca por horas.
                </p>
                <p className="mt-6 text-lg leading-relaxed" style={{ color: 'rgba(244,237,225,0.7)', fontFamily: "'Inter Tight', sans-serif" }}>
                  Cada chip do saco é uma rodada. A picância variável é o jackpot incerto. A dopamina sobe na <em style={editorial}>antecipação</em>, não na recompensa.
                </p>
              </motion.div>

              <div className="lg:col-span-7 space-y-12">
                <motion.figure {...fade(0.1)} className="overflow-hidden rounded-sm">
                  <img
                    src={imgSlot}
                    alt="Reels de máquina caça-níquel com símbolos em laranja e vermelho neon"
                    loading="lazy"
                    className="w-full h-[460px] md:h-[600px] object-cover"
                  />
                </motion.figure>

                <motion.figure {...fade(0.15)} className="overflow-hidden rounded-sm">
                  <img
                    src={imgDopamina}
                    alt="Molécula de dopamina renderizada em laranja brilhante contra fundo preto"
                    loading="lazy"
                    className="w-full h-[420px] md:h-[520px] object-cover"
                  />
                  <figcaption className="mt-4 flex items-center gap-3" style={{ ...mono, color: ORANGE, fontSize: 10 }}>
                    <span className="h-px w-8" style={{ background: ORANGE }} />
                    Dopamina · o neurotransmissor da expectativa, não do prazer
                  </figcaption>
                </motion.figure>

                <motion.div {...fade(0.18)} className="border-l-2 pl-8 mt-8" style={{ borderColor: ORANGE }}>
                  <h3 style={{ ...display, fontSize: 'clamp(1.8rem, 2.5vw, 2.6rem)', color: BONE }}>
                    Por que parar é tão difícil
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed" style={{ color: 'rgba(244,237,225,0.82)', fontFamily: "'Inter Tight', sans-serif" }}>
                    Quando você tenta parar, o cérebro não está negociando contra a vontade. Está negociando contra um circuito de recompensa{' '}
                    <strong style={{ color: YELLOW }}>desenhado por especialistas para vencer</strong>. Achar que isso é falha de caráter é o equivalente a achar que o jogador compulsivo é fraco. Não é. É um sistema engenheirado para escravizar.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ § 05 · O DORITO EFFECT (BONE) ═══ */}
        <section className="relative" style={{ background: BONE, color: ONYX }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <div className="grid lg:grid-cols-12 gap-12">
              <motion.div {...fade()} className="lg:col-span-5">
                <span style={{ ...mono, color: ORANGE, fontSize: 11 }}>§ 05 · O Efeito Dorito</span>
                <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.6rem, 5.8vw, 5.6rem)', color: ONYX }}>
                  Sabor sem
                  <br />
                  <span style={{ ...editorial, color: ORANGE }}>nutrição.</span>
                </h2>
                <p className="mt-8 text-xl leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif" }}>
                  O jornalista canadense Mark Schatzker, em <em style={editorial}>The Dorito Effect</em>, mostra como, desde os anos 60, a indústria divorciou o sabor da nutrição.
                </p>
              </motion.div>

              <motion.div {...fade(0.1)} className="lg:col-span-7 space-y-6">
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif" }}>
                  Antes, sabor era um sinal: tomate maduro era doce porque era denso em nutrientes. Caldo de osso era saboroso porque tinha aminoácidos. O paladar humano evoluiu por milhões de anos para usar o sabor como{' '}
                  <strong style={{ color: RED }}>guia nutricional</strong>.
                </p>
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif" }}>
                  A indústria quebrou esse contrato. Hoje sabor é molécula isolada em laboratório, criada por flavoristas em empresas como Givaudan e IFF, que pulverizam aromas sintéticos em qualquer base inerte. Você não está comendo queijo. Está comendo a{' '}
                  <em style={editorial}>fantasia química</em> de queijo, sem o queijo.
                </p>
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif" }}>
                  O paladar mente. A nutrição não chega. O cérebro pede mais, esperando que o sinal cumpra a promessa. Nunca cumpre. Você come mais.{' '}
                  <strong style={{ color: RED }}>É esse o efeito Dorito.</strong>
                </p>
              </motion.div>
            </div>

            <motion.figure {...fade(0.15)} className="mt-20 overflow-hidden rounded-sm">
              <img src={imgKnolling} alt="Análise científica top-down de chips classificados por gradiente de cor com instrumentos de medição" loading="lazy" className="w-full h-[480px] md:h-[640px] object-cover" />
              <figcaption className="mt-4 flex items-center gap-3" style={{ ...mono, color: ORANGE, fontSize: 10 }}>
                <span className="h-px w-8" style={{ background: ORANGE }} />
                Análise sensorial · cada chip catalogado por cor, peso e intensidade aromática
              </figcaption>
            </motion.figure>
          </div>
        </section>

        {/* ═══ § 06 · CONTRA-ATAQUE ANCESTRAL (ONYX) ═══ */}
        <section className="relative" style={{ background: ONYX, color: BONE }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <motion.div {...fade()} className="lg:col-span-6">
                <span style={{ ...mono, color: YELLOW, fontSize: 11 }}>§ 06 · Contra-ataque</span>
                <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.6rem, 5.8vw, 5.6rem)', color: BONE }}>
                  Você não vai vencer
                  <br />
                  <span style={{ ...editorial, color: YELLOW }}>com força de vontade.</span>
                </h2>
                <p className="mt-8 text-xl leading-relaxed" style={{ color: 'rgba(244,237,225,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
                  Vai vencer reduzindo o gatilho ambiental e devolvendo ao corpo o sinal de saciedade que ele perdeu.
                </p>
                <ul className="mt-10 space-y-5">
                  {[
                    ['Tirar o gatilho de casa', 'O cérebro só decide diante do estímulo. Sem o saco no armário, não há decisão. Não é covardia, é estratégia.'],
                    ['Recolocar comida real', 'Sal natural, gordura animal, frutas inteiras, fermentados, ovos, carne. Em poucas semanas o paladar se recalibra e o "delicioso" muda de endereço.'],
                    ['Devolver o sinal de saciedade', 'Mastigar devagar, comer sem tela, parar quando dá fome de novo, não quando o saco acaba. O corpo lembra rápido como avisar.'],
                    ['Reaproximar-se da fonte', 'Cozinhar, plantar, fermentar, conservar. Quem produz o próprio alimento não cai mais na fantasia química do industrial.'],
                  ].map(([t, d], i) => (
                    <li key={i} className="flex gap-5">
                      <span style={{ ...mono, color: YELLOW, fontSize: 11, minWidth: 28 }}>0{i + 1}</span>
                      <div>
                        <p style={{ ...display, fontSize: 20, color: BONE, lineHeight: 1.2 }}>{t}</p>
                        <p className="mt-1 text-base leading-relaxed" style={{ color: 'rgba(244,237,225,0.7)', fontFamily: "'Inter Tight', sans-serif" }}>
                          {d}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.figure {...fade(0.1)} className="lg:col-span-6 overflow-hidden rounded-sm">
                <img src={imgComidaReal} alt="Mesa rústica com tomates frescos ervas castanhas e mel sob luz natural" loading="lazy" className="w-full h-[560px] md:h-[720px] object-cover" />
              </motion.figure>
            </div>

            {/* Macro chip de fechamento */}
            <motion.figure {...fade(0.15)} className="mt-24 overflow-hidden rounded-sm max-w-3xl mx-auto">
              <img src={imgChip} alt="Chip triangular amarelo isolado com pó de pimenta vermelha sobre fundo preto" loading="lazy" className="w-full h-[400px] md:h-[520px] object-contain" style={{ background: ONYX }} />
            </motion.figure>
          </div>
        </section>

        {/* ═══ § 06.5 · METODOLOGIA / FONTES (BONE) ═══ */}
        <section className="relative" style={{ background: BONE, color: ONYX }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">

            {/* Cabeçalho editorial */}
            <div className="grid lg:grid-cols-12 gap-12 items-end">
              <motion.div {...fade()} className="lg:col-span-7">
                <span style={{ ...mono, color: RED, fontSize: 11 }}>§ 06.5 · Como cheguei aqui</span>
                <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.6rem, 5.6vw, 5.4rem)', color: ONYX }}>
                  Não é opinião,
                  <br />
                  <span style={{ ...editorial, color: RED }}>é bibliografia.</span>
                </h2>
              </motion.div>
              <motion.div {...fade(0.1)} className="lg:col-span-5">
                <p className="text-xl leading-relaxed" style={{ color: 'rgba(10,10,10,0.78)', fontFamily: "'Inter Tight', sans-serif" }}>
                  Antes de afirmar que ultraprocessado é projetado para sequestrar o cérebro, cruzei livros, reportagens investigativas, podcasts e papers da própria indústria. Tudo público. Tudo verificável. Esta página existe para que cético nenhum saia daqui sem fonte para conferir.
                </p>
              </motion.div>
            </div>

            {/* Imagem editorial larga */}
            <motion.figure {...fade(0.15)} className="mt-16 overflow-hidden rounded-sm">
              <img
                src={imgBiblioteca}
                alt="Três livros empilhados sobre engenharia alimentar e vício industrial sob luz quente de lâmpada de mesa"
                loading="lazy"
                width={1920}
                height={1080}
                className="w-full h-[420px] md:h-[640px] object-cover"
              />
              <figcaption className="mt-4 text-sm" style={{ ...mono, color: 'rgba(10,10,10,0.55)', fontSize: 10 }}>
                Mesa de trabalho · Biblioteca de referência · Wolf · Schatzker · Moss
              </figcaption>
            </motion.figure>

            {/* Bloco "Relato em primeira pessoa" */}
            <motion.blockquote {...fade(0.1)} className="mt-24 max-w-4xl mx-auto relative">
              <Quote size={48} style={{ color: ORANGE, opacity: 0.35, position: 'absolute', top: -16, left: -8 }} />
              <p
                style={{
                  ...editorial,
                  fontSize: 'clamp(1.5rem, 2.4vw, 2.4rem)',
                  color: ONYX,
                  lineHeight: 1.35,
                }}
                className="pl-8 md:pl-16"
              >
                "Eu não cheguei nessa conclusão por palpite. Cheguei cruzando informações públicas e confiáveis: os próprios livros, entrevistas e podcasts dos autores, reportagens investigativas e artigos científicos. Não foi opinião. Foi rastro de papel."
              </p>
              <footer className="mt-6 pl-8 md:pl-16" style={{ ...mono, color: ORANGE, fontSize: 11 }}>
                Lord Junnior · Anotação de pesquisa
              </footer>
            </motion.blockquote>

            {/* Sub-cabeçalho: livros principais */}
            <motion.div {...fade()} className="mt-32 max-w-3xl">
              <span style={{ ...mono, color: ORANGE, fontSize: 11 }}>Os três livros que sustentam a tese</span>
              <h3 className="mt-6" style={{ ...display, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: ONYX }}>
                Leitura obrigatória{' '}
                <span style={{ ...editorial, color: ORANGE }}>para quem duvida.</span>
              </h3>
            </motion.div>

            {/* Cards de livros */}
            <div className="mt-12 grid lg:grid-cols-3 gap-px" style={{ background: 'rgba(10,10,10,0.12)' }}>
              {[
                {
                  n: '01',
                  titulo: 'Wired to Eat',
                  autor: 'Robb Wolf',
                  ano: '2017',
                  pt: 'Programado para Comer',
                  resumo:
                    'Wolf dedica páginas inteiras ao caso do Doritos Roulette: a variação aleatória de picância (chips suaves, médios, ardidos) cria efeito surpresa, dispara dopamina e impede a fadiga do paladar. Ele chama isso de Buffet Effect, estratégia deliberada para bypassar a saciedade.',
                  trecho: 'Variedade sensorial é o atalho da indústria para você nunca enjoar.',
                },
                {
                  n: '02',
                  titulo: 'The Dorito Effect',
                  autor: 'Mark Schatzker',
                  ano: '2015',
                  pt: 'O Efeito Doritos',
                  resumo:
                    'Livro inteiro sobre como a indústria substituiu o sabor real por sabor sintético. Os primeiros Doritos eram chips de milho com sal e quase ninguém comprava. Quando entrou o flavor artificial de taco, viraram fenômeno: hiperestimulante, sem o nutriente que o cérebro esperava encontrar.',
                  trecho: 'O cérebro foi enganado. O paladar foi sequestrado. O apetite ficou sem freio.',
                },
                {
                  n: '03',
                  titulo: 'Salt Sugar Fat',
                  autor: 'Michael Moss',
                  ano: '2013',
                  pt: 'Sal, Açúcar e Gordura',
                  resumo:
                    'Investigação vencedora do Pulitzer. Moss entrou nos laboratórios da Frito-Lay e descreveu máquinas que simulam mordida, medem crocância, mouthfeel e tempo mão-boca. Documenta como o bliss point é calculado em milhões de combinações até achar o ponto matemático ótimo.',
                  trecho: 'Eles gastam milhões por ano para que você coma mais sem perceber.',
                },
              ].map((b, i) => (
                <motion.article
                  key={i}
                  {...fade(i * 0.06)}
                  style={{ background: BONE_DEEP }}
                  className="p-8 md:p-10 group hover:bg-[#dccfb8] transition-colors duration-500"
                >
                  <div className="flex items-start justify-between">
                    <span style={{ ...mono, color: RED, fontSize: 11 }}>{b.n}</span>
                    <Library size={22} style={{ color: ORANGE }} />
                  </div>
                  <h4 className="mt-8" style={{ ...display, fontSize: 'clamp(1.6rem, 2vw, 2.1rem)', color: ONYX, lineHeight: 1.05 }}>
                    {b.titulo}
                  </h4>
                  <p className="mt-2" style={{ ...mono, color: 'rgba(10,10,10,0.55)', fontSize: 10 }}>
                    {b.autor} · {b.ano} · ed. PT: {b.pt}
                  </p>
                  <p className="mt-6 text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.78)', fontFamily: "'Inter Tight', sans-serif" }}>
                    {b.resumo}
                  </p>
                  <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(10,10,10,0.18)' }}>
                    <p style={{ ...editorial, color: RED, fontSize: 'clamp(1rem, 1.2vw, 1.2rem)', lineHeight: 1.35 }}>
                      "{b.trecho}"
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Reportagens e podcasts */}
            <div className="mt-32 grid lg:grid-cols-12 gap-12 items-center">
              <motion.figure {...fade()} className="lg:col-span-6 overflow-hidden rounded-sm order-2 lg:order-1">
                <img
                  src={imgInvestigacao}
                  alt="Recorte de reportagem investigativa do New York Times com trecho marcado em amarelo sobre engenharia alimentar"
                  loading="lazy"
                  width={1920}
                  height={1080}
                  className="w-full h-[460px] md:h-[620px] object-cover"
                />
              </motion.figure>
              <motion.div {...fade(0.1)} className="lg:col-span-6 order-1 lg:order-2">
                <span style={{ ...mono, color: ORANGE, fontSize: 11 }}>Reportagens e podcasts que confirmam</span>
                <h3 className="mt-6" style={{ ...display, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: ONYX }}>
                  A imprensa séria{' '}
                  <span style={{ ...editorial, color: ORANGE }}>já documentou tudo.</span>
                </h3>
                <ul className="mt-10 space-y-7">
                  {[
                    {
                      icon: Newspaper,
                      tag: 'New York Times · 2013',
                      titulo: 'The Extraordinary Science of Addictive Junk Food',
                      desc: 'Reportagem de Michael Moss revelando o laboratório da Frito-Lay no Texas com 500 cientistas e até US$ 30 milhões por ano só para testar chips. Medem pressão de mordida em libras por polegada quadrada, som da crocância e dynamic contrast (crocante + pó cremoso).',
                    },
                    {
                      icon: Mic,
                      tag: 'Robb Wolf · 2019 a 2021',
                      titulo: 'Q&A #30 e Keto Kamp Podcast',
                      desc: 'Wolf repete o caso do Doritos Roulette em diversos episódios. Fala abertamente da curva de prazer e da randomização como estratégia de vício, ratificando o que escreveu no livro.',
                    },
                    {
                      icon: ScrollText,
                      tag: 'Literatura científica',
                      titulo: 'Hand-to-Mouth e Craveability Optimization',
                      desc: 'Estudos sensoriais publicados sob o termo craveability optimization mostram: quanto mais rápido o alimento vai à boca e mais sensorial ele é, mais se come sem percepção. Métrica de mercado, não teoria.',
                    },
                  ].map((r, i) => (
                    <li key={i} className="flex gap-5">
                      <div
                        className="shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
                        style={{ background: 'rgba(232,99,28,0.12)', border: '1px solid rgba(232,99,28,0.3)' }}
                      >
                        <r.icon size={20} style={{ color: ORANGE }} />
                      </div>
                      <div>
                        <span style={{ ...mono, color: 'rgba(10,10,10,0.5)', fontSize: 10 }}>{r.tag}</span>
                        <p className="mt-1" style={{ ...display, fontSize: 'clamp(1.15rem, 1.4vw, 1.4rem)', color: ONYX, lineHeight: 1.2 }}>
                          {r.titulo}
                        </p>
                        <p className="mt-2 text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.72)', fontFamily: "'Inter Tight', sans-serif" }}>
                          {r.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Resumo do método de verificação */}
            <motion.div {...fade()} className="mt-32 grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <span style={{ ...mono, color: RED, fontSize: 11 }}>Método de verificação</span>
                <h3 className="mt-6" style={{ ...display, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: ONYX }}>
                  Como cruzei{' '}
                  <span style={{ ...editorial, color: RED }}>cada peça.</span>
                </h3>
                <p className="mt-6 text-lg leading-relaxed" style={{ color: 'rgba(10,10,10,0.75)', fontFamily: "'Inter Tight', sans-serif" }}>
                  O caso brasileiro do Doritos Roleta foi confirmado: a Elma Chips (PepsiCo Brasil) lançou a versão com graus aleatórios de picância, comercializada com a frase "alguns são mega apimentados". O núcleo do relato bate com Wolf, Schatzker e Moss, todos baseados em entrevistas dentro da própria indústria.
                </p>
              </div>
              <ul className="lg:col-span-7 space-y-4">
                {[
                  'Li o capítulo sobre Doritos Roulette em Wired to Eat e marquei as passagens.',
                  'Cruzei com The Dorito Effect para ancorar o argumento histórico do flavor sintético.',
                  'Verifiquei a reportagem de Michael Moss no New York Times e os capítulos correspondentes em Salt Sugar Fat.',
                  'Ouvi os podcasts de Robb Wolf (Q&A #30 e Keto Kamp) onde ele repete o exemplo oralmente.',
                  'Confirmei o lançamento brasileiro do Doritos Roleta pela Elma Chips e a comunicação oficial da marca.',
                ].map((t, i) => (
                  <motion.li
                    key={i}
                    {...fade(i * 0.05)}
                    className="flex gap-4 items-start p-5 rounded-sm"
                    style={{ background: BONE_DEEP, border: '1px solid rgba(10,10,10,0.08)' }}
                  >
                    <CheckCircle2 size={20} style={{ color: RED, marginTop: 2, flexShrink: 0 }} />
                    <p className="text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
                      {t}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Imagem evidências */}
            <motion.figure {...fade(0.1)} className="mt-24 overflow-hidden rounded-sm">
              <img
                src={imgEvidencias}
                alt="Knolling de evidências de pesquisa: livros gravador podcast laptop e chip de Doritos sobre papel cor osso"
                loading="lazy"
                width={1920}
                height={1080}
                className="w-full h-[420px] md:h-[640px] object-cover"
              />
              <figcaption className="mt-4 text-sm" style={{ ...mono, color: 'rgba(10,10,10,0.55)', fontSize: 10 }}>
                Quadro de evidências · Bibliografia + Áudio + Reportagem + Objeto de estudo
              </figcaption>
            </motion.figure>

            {/* Linha de fechamento */}
            <motion.p
              {...fade()}
              className="mt-24 max-w-3xl mx-auto text-center"
              style={{ ...editorial, fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)', color: ONYX, lineHeight: 1.4 }}
            >
              Se você ler um único desses livros, vai perceber que esta página é apenas{' '}
              <span style={{ color: RED }}>a leitura honesta do que a própria indústria documentou sobre si mesma.</span>
            </motion.p>
          </div>
        </section>

        {/* ═══ § 07 · FAQ (BONE) ═══ */}
        <section className="relative" style={{ background: BONE, color: ONYX }}>
          <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <motion.div {...fade()} className="max-w-3xl">
              <span style={{ ...mono, color: ORANGE, fontSize: 11 }}>§ 07 · Perguntas Diretas</span>
              <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.4rem, 5vw, 4.6rem)', color: ONYX }}>
                O que perguntam{' '}
                <span style={{ ...editorial, color: ORANGE }}>quando entendem.</span>
              </h2>
            </motion.div>

            <div className="mt-16 divide-y" style={{ borderColor: 'rgba(10,10,10,0.12)' }}>
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.04)} className="py-6">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-start justify-between gap-6 text-left"
                      style={{ borderTop: i === 0 ? 'none' : undefined }}
                    >
                      <h3 style={{ ...display, fontSize: 'clamp(1.2rem, 1.6vw, 1.6rem)', color: ONYX, fontWeight: 800 }}>
                        {f.q}
                      </h3>
                      <ChevronDown
                        size={22}
                        style={{
                          color: ORANGE,
                          transform: open ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                          flexShrink: 0,
                        }}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0, marginTop: open ? 16 : 0 }}
                      transition={{ duration: 0.5, ease: APPLE_EASE }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="text-lg leading-relaxed pr-12" style={{ color: CHARCOAL, fontFamily: "'Inter Tight', sans-serif" }}>
                        {f.a}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ § 08 · LEITURAS RELACIONADAS (CHARCOAL) ═══ */}
        <section className="relative" style={{ background: CHARCOAL, color: BONE }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <motion.div {...fade()} className="max-w-3xl">
              <span style={{ ...mono, color: YELLOW, fontSize: 11 }}>§ 08 · Continue a investigação</span>
              <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.4rem, 5vw, 4.6rem)', color: BONE }}>
                A engenharia do vício alimentar{' '}
                <span style={{ ...editorial, color: YELLOW }}>não termina aqui.</span>
              </h2>
              <p className="mt-8 text-xl leading-relaxed" style={{ color: 'rgba(244,237,225,0.82)', fontFamily: "'Inter Tight', sans-serif" }}>
                Estes são os próximos capítulos do mesmo silo. Cada um aprofunda uma frente da soberania alimentar.
              </p>
            </motion.div>

            <div className="mt-16 grid md:grid-cols-3 gap-px" style={{ background: 'rgba(244,196,48,0.1)' }}>
              {[
                {
                  to: '/soberania-organica/preservacao-ancestral',
                  tag: 'Próximo passo',
                  title: 'Preservação Ancestral',
                  desc: 'Oito métodos para conservar comida real sem depender de geladeira nem indústria.',
                  icon: Sparkles,
                },
                {
                  to: '/soberania-organica/toxicos-ocultos/toxinas-alimentares',
                  tag: 'Aprofundamento',
                  title: 'Toxinas Alimentares',
                  desc: 'Glifosato, óleos vegetais, aditivos, metais pesados. O outro lado do veneno industrial.',
                  icon: AlertTriangle,
                },
                {
                  to: '/soberania-organica/horta-urbana',
                  tag: 'Contra-ataque',
                  title: 'Horta Urbana',
                  desc: 'Reaproxime-se da fonte. Quem cultiva o próprio alimento sai do labirinto industrial.',
                  icon: Activity,
                },
              ].map((c, i) => (
                <motion.div key={i} {...fade(i * 0.06)} style={{ background: ONYX }} className="group">
                  <Link to={c.to} className="block p-8 md:p-10 h-full transition-colors duration-500 hover:bg-[#141312]">
                    <span style={{ ...mono, color: YELLOW, fontSize: 10 }}>{c.tag}</span>
                    <c.icon size={26} style={{ color: ORANGE, marginTop: 20 }} />
                    <h3 className="mt-6" style={{ ...display, fontSize: 'clamp(1.4rem, 1.8vw, 1.9rem)', color: BONE }}>
                      {c.title}
                    </h3>
                    <p className="mt-3 text-base leading-snug" style={{ color: 'rgba(244,237,225,0.7)', fontFamily: "'Inter Tight', sans-serif" }}>
                      {c.desc}
                    </p>
                    <div className="mt-8 flex items-center gap-2" style={{ color: YELLOW }}>
                      <span style={{ ...mono, fontSize: 10 }}>Ler manual</span>
                      <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Hub link */}
            <motion.div {...fade(0.2)} className="mt-20 text-center">
              <Link
                to="/soberania-organica"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-500"
                style={{ background: YELLOW, color: ONYX, fontFamily: "'Inter Tight', sans-serif", fontWeight: 700 }}
              >
                <BookOpen size={18} />
                Voltar ao hub Soberania Orgânica
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══ FOOTER MARK ═══ */}
        <section className="relative" style={{ background: ONYX, color: BONE }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-20 text-center">
            <p style={{ ...editorial, fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)', color: BONE }}>
              "Autonomia não é isolamento.{' '}
              <span style={{ color: YELLOW }}>É redução inteligente de dependência.</span>"
            </p>
            <p className="mt-6" style={{ ...mono, color: 'rgba(244,237,225,0.5)', fontSize: 10 }}>
              Lord Junnior · Soberania Orgânica · Alimentar &amp; Cultivo
            </p>
          </div>
        </section>
      </article>

      <ScrollToTop />
    </>
  );
};

export default EngenhariaVicioAlimentar;