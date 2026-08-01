import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, AlertTriangle, Droplet, Bone, Flame, Package,
  Hand, Timer, ShieldAlert, ChevronDown, CheckCircle2, XCircle, Cross,
} from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgHero from '@/assets/ps/hero-trauma-medic.jpg';
import imgHemostasia from '@/assets/ps/hemostasia-pro.jpg';
import imgTorniquete from '@/assets/ps/torniquete-cat.jpg';
import imgImobilizacao from '@/assets/ps/imobilizacao-pro.jpg';
import imgQueimaduras from '@/assets/ps/queimaduras-pro.jpg';
import imgKit from '@/assets/ps/kit-ifak-knolling.jpg';

/**
 * /soberania-organica/primeiros-socorros
 * Reconstrução total no padrão Apple editorial aprovado em /saida/jurisdicoes-amigaveis.
 * Paleta tática: Sand (#f4ede4) + Bordô profundo (#3a0e10) + Cobre (#c4632a).
 * Hero full-bleed 88vh, alternância claro/escuro, Inter Tight 900 + Playfair italic,
 * imagens cinematográficas grandes, blocos editoriais densos, FAQ e JSON-LD MedicalWebPage.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: APPLE_EASE, delay },
});

const SAND = '#f4ede4';
const SAND_DEEP = '#ece2d3';
const BORDO = '#3a0e10';
const BORDO_DARK = '#1f0708';
const COBRE = '#c4632a';
const COBRE_LIGHT = '#e8a36b';
const TEAL = '#0e3b3a';

/* ───────── Tipografia inline ───────── */
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

/* ───────── Dados estruturados ───────── */
const PILARES = [
  { n: '01', icon: Droplet, titulo: 'Hemostasia', resumo: 'Conter o sangramento antes que ele decida o desfecho.' },
  { n: '02', icon: Bone, titulo: 'Imobilização', resumo: 'Imobilizar fraturas com o que estiver à mão, sem mover a vítima.' },
  { n: '03', icon: Flame, titulo: 'Queimaduras', resumo: 'Resfriar, cobrir, não tratar com receita de quintal.' },
  { n: '04', icon: Package, titulo: 'Kit funcional', resumo: 'Um kit que existe, que está acessível e que está dentro da validade.' },
];

const FAQ = [
  {
    q: 'Posso aplicar torniquete em qualquer sangramento intenso?',
    a: 'Não. Torniquete é reservado para sangramento arterial em membro quando a compressão direta firme falhou. Em pescoço, axila e virilha, a indicação é compressão profunda com gaze hemostática, não torniquete.',
  },
  {
    q: 'Quanto tempo posso manter um torniquete aplicado?',
    a: 'A doutrina TCCC aceita até duas horas com baixo risco de perda de membro quando bem aplicado. Acima disso, o risco cresce. Por isso, registre o horário no próprio torniquete e nunca afrouxe periodicamente.',
  },
  {
    q: 'Por que não estourar bolhas de queimadura?',
    a: 'A bolha é uma barreira biológica estéril. Estourar abre porta para infecção, que em queimadura grande pode escalar para sepse antes de qualquer atendimento chegar.',
  },
  {
    q: 'Esse conteúdo substitui um curso presencial de primeiros socorros?',
    a: 'Não substitui. Este material é base teórica para você reconhecer cenários e agir com menos pânico. A execução real exige treino físico repetido com instrutor qualificado, idealmente com cadáver ou simulador de trauma.',
  },
  {
    q: 'O kit IFAK serve para uso doméstico?',
    a: 'Serve, e é superior à maioria dos kits de farmácia, porque assume trauma de verdade. Um kit doméstico ideal combina IFAK (trauma) com módulo clínico (febre, dor, alergia, ferimento leve) em compartimentos separados.',
  },
];

/* ───────── Página ───────── */
const PrimeirosSocorros = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://lordjunnior.com.br/soberania-organica/primeiros-socorros',
        name: 'Primeiros Socorros: Estabilização Tática em Cenários de Crise',
        description: 'Manual editorial de primeiros socorros: hemostasia, torniquete TCCC, imobilização, queimaduras e kit IFAK. Estabilizar até a chegada de suporte avançado.',
        inLanguage: 'pt-BR',
        about: { '@type': 'MedicalCondition', name: 'Trauma e emergências pré-hospitalares' },
        audience: { '@type': 'PeopleAudience', suggestedMinAge: 18 },
        lastReviewed: '2026-04-26',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br/' },
          { '@type': 'ListItem', position: 2, name: 'Soberania Orgânica', item: 'https://lordjunnior.com.br/soberania-organica' },
          { '@type': 'ListItem', position: 3, name: 'Primeiros Socorros', item: 'https://lordjunnior.com.br/soberania-organica/primeiros-socorros' },
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
        <title>Primeiros Socorros Tático: Hemostasia, Torniquete e Kit IFAK | Lord Junnior</title>
        <meta name="description" content="Manual editorial de primeiros socorros: contenção de hemorragia, torniquete TCCC, imobilização improvisada, queimaduras e kit IFAK. Para estabilizar antes do socorro avançado." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/primeiros-socorros" />
        <meta property="og:title" content="Primeiros Socorros Tático: Estabilização que Salva Vidas" />
        <meta property="og:description" content="Hemostasia, torniquete, imobilização, queimaduras e kit IFAK. O conhecimento que decide quem chega vivo." />
        <meta property="og:image" content={imgHero} />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/primeiros-socorros" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="relative z-50 px-6 md:px-12 lg:px-20 pt-[52px]" style={{ background: BORDO_DARK }}>
        <BackToHome />
      </div>

      <article className="min-h-screen" style={{ background: SAND, color: BORDO_DARK }}>
        {/* ═════════════════════════ HERO FULL-BLEED 88vh ═════════════════════════ */}
        <section className="relative w-full overflow-hidden" style={{ height: '92vh', minHeight: 720, background: BORDO_DARK }}>
          <img
            src={imgHero}
            alt="Médico tático aplicando primeiros socorros em cenário de trauma"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.62) saturate(1.05)' }} loading="eager" fetchPriority="high" decoding="async" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(31,7,8,0.55) 0%, rgba(31,7,8,0.1) 30%, rgba(31,7,8,0.4) 70%, rgba(31,7,8,0.96) 100%)',
            }}
          />
          {/* Side vignette cobre */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 90% 20%, rgba(196,99,42,0.25), transparent 60%)',
            }}
          />

          <div className="relative z-10 h-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-end pb-16 md:pb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: APPLE_EASE }}>
              <span style={{ ...mono, color: COBRE_LIGHT, fontSize: 11 }}>
                Soberania Orgânica · Manual de Estabilização
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.15, ease: APPLE_EASE }}
              className="mt-6 text-white"
              style={{ ...display, fontSize: 'clamp(3rem, 9vw, 8.5rem)' }}
            >
              Primeiros
              <br />
              <span style={{ ...editorial, color: COBRE_LIGHT, textShadow: '0 0 40px rgba(0,0,0,0.85), 0 0 80px rgba(196,99,42,0.45)' }}>
                Socorros
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: APPLE_EASE }}
              className="mt-8 max-w-3xl text-white/85"
              style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)', lineHeight: 1.45 }}
            >
              Entre o instante do trauma e a chegada do suporte avançado, existe uma janela.{' '}
              <span style={editorial}>Quem ocupa essa janela com técnica decide o desfecho.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: APPLE_EASE }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-3 px-5 py-3 rounded-full" style={{ background: 'rgba(244,237,228,0.08)', border: '1px solid rgba(232,163,107,0.3)' }}>
                <Timer size={16} style={{ color: COBRE_LIGHT }} />
                <span className="text-white/85 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600 }}>
                  Leitura de 18 minutos
                </span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-full" style={{ background: 'rgba(244,237,228,0.08)', border: '1px solid rgba(232,163,107,0.3)' }}>
                <ShieldAlert size={16} style={{ color: COBRE_LIGHT }} />
                <span className="text-white/85 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600 }}>
                  Doutrina TCCC adaptada
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
                <ChevronDown size={18} style={{ color: COBRE_LIGHT }} />
              </motion.div>
              <span style={{ ...mono, color: COBRE_LIGHT, fontSize: 10 }}>desça</span>
            </motion.div>
          </div>
        </section>

        {/* ═════════════════════════ ABERTURA EDITORIAL (SAND) ═════════════════════════ */}
        <section className="relative" style={{ background: SAND }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-36">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              <motion.div {...fade()} className="lg:col-span-4">
                <span style={{ ...mono, color: COBRE, fontSize: 11 }}>§ 01 · Doutrina</span>
                <div className="mt-6 h-[1px] w-16" style={{ background: BORDO }} />
              </motion.div>

              <motion.div {...fade(0.08)} className="lg:col-span-8">
                <h2 style={{ ...display, fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', color: BORDO_DARK }}>
                  A janela de ouro existe.{' '}
                  <span style={{ ...editorial, color: COBRE }}>E ela é curta.</span>
                </h2>
                <p className="mt-10 text-xl md:text-2xl leading-relaxed" style={{ color: BORDO, fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>
                  Trauma sangra rápido. Queimadura aprofunda em segundos. Fratura mal manipulada vira lesão vascular.
                  Quem chega primeiro ao ferido, mesmo sem jaleco, é o agente que define se o paciente entra estabilizado ou em colapso na ambulância.
                </p>
                <p className="mt-6 text-lg md:text-xl leading-relaxed" style={{ color: BORDO, fontFamily: "'Inter Tight', sans-serif", opacity: 0.78 }}>
                  Este manual existe para que você, civil comum, opere essa janela com método.
                  Não é heroísmo, é protocolo. Não substitui o SAMU, prepara a chegada dele.
                </p>
              </motion.div>
            </div>

            {/* Quatro pilares — bento horizontal */}
            <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(58,14,16,0.15)' }}>
              {PILARES.map((p, i) => (
                <motion.div
                  key={p.n}
                  {...fade(i * 0.06)}
                  className="relative p-8 md:p-10 group cursor-default"
                  style={{ background: SAND }}
                >
                  <span style={{ ...mono, color: COBRE, fontSize: 10 }}>{p.n}</span>
                  <p.icon size={28} style={{ color: BORDO, marginTop: 24 }} />
                  <h3 className="mt-6" style={{ ...display, fontSize: 'clamp(1.4rem, 1.8vw, 2rem)', color: BORDO_DARK }}>
                    {p.titulo}
                  </h3>
                  <p className="mt-3 text-base leading-snug" style={{ color: BORDO, opacity: 0.75, fontFamily: "'Inter Tight', sans-serif" }}>
                    {p.resumo}
                  </p>
                  <div
                    className="absolute bottom-0 left-0 h-[2px] transition-all duration-700"
                    style={{ width: '0%', background: COBRE }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════ § 02 HEMOSTASIA (BORDÔ ESCURO) ═════════════════════════ */}
        <section className="relative" style={{ background: BORDO_DARK, color: SAND }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <div className="grid lg:grid-cols-12 gap-12">
              <motion.div {...fade()} className="lg:col-span-5 lg:sticky lg:top-24 self-start">
                <span style={{ ...mono, color: COBRE_LIGHT, fontSize: 11 }}>§ 02 · Hemorragia</span>
                <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.8rem, 6vw, 6rem)', color: SAND }}>
                  Sangrar até morrer
                  <br />
                  <span style={{ ...editorial, color: COBRE_LIGHT, textShadow: '0 0 30px rgba(196,99,42,0.5)' }}>
                    é evitável.
                  </span>
                </h2>
                <p className="mt-8 text-xl leading-relaxed" style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
                  Hemorragia é a principal causa <em style={editorial}>evitável</em> de morte em trauma. Existem três níveis práticos de resposta, e a ordem importa.
                </p>
              </motion.div>

              <div className="lg:col-span-7 space-y-12">
                <motion.figure {...fade(0.1)} className="overflow-hidden rounded-sm">
                  <img
                    src={imgHemostasia}
                    alt="Compressão direta com gaze sobre laceração profunda em antebraço"
                    loading="lazy"
                    className="w-full h-[460px] md:h-[560px] object-cover"
                  />
                  <figcaption className="mt-4 flex items-center gap-3" style={{ ...mono, color: COBRE_LIGHT, fontSize: 10 }}>
                    <span className="h-px w-8" style={{ background: COBRE_LIGHT }} />
                    Nível 01 · Compressão Direta
                  </figcaption>
                </motion.figure>

                <motion.div {...fade(0.15)} className="border-l-2 pl-8" style={{ borderColor: COBRE }}>
                  <h3 style={{ ...display, fontSize: 'clamp(1.8rem, 2.5vw, 2.6rem)', color: SAND }}>
                    Compressão direta firme
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed" style={{ color: 'rgba(244,237,228,0.78)', fontFamily: "'Inter Tight', sans-serif" }}>
                    A intervenção mais subestimada e a mais eficaz. Pressão contínua por cinco minutos resolve a maioria dos sangramentos venosos.
                  </p>
                  <ol className="mt-8 space-y-4">
                    {[
                      'Coloque gaze ou pano limpo sobre o ferimento, cobrindo toda a extensão.',
                      'Pressione firmemente com a palma da mão, peso do corpo se necessário.',
                      'Mantenha pressão contínua por no mínimo 5 minutos sem espiar.',
                      'Se o material saturar, coloque outro por cima. Nunca retire o primeiro: arranca o coágulo em formação.',
                    ].map((step, i) => (
                      <li key={i} className="flex gap-5">
                        <span style={{ ...mono, color: COBRE_LIGHT, fontSize: 11, minWidth: 28 }}>0{i + 1}</span>
                        <span className="text-lg leading-relaxed" style={{ color: SAND, fontFamily: "'Inter Tight', sans-serif" }}>
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </motion.div>

                <motion.div {...fade(0.18)} className="border-l-2 pl-8" style={{ borderColor: 'rgba(196,99,42,0.4)' }}>
                  <h3 style={{ ...display, fontSize: 'clamp(1.8rem, 2.5vw, 2.6rem)', color: SAND }}>
                    Elevação do membro
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed" style={{ color: 'rgba(244,237,228,0.78)', fontFamily: "'Inter Tight', sans-serif" }}>
                    Indicado quando o sangramento está em braço ou perna e <strong style={{ color: SAND }}>não há suspeita de fratura grave</strong>.
                    Elevar acima do nível do coração reduz o fluxo arterial sem cortar circulação.
                  </p>
                </motion.div>

                <motion.figure {...fade(0.2)} className="overflow-hidden rounded-sm mt-8">
                  <img
                    src={imgTorniquete}
                    alt="Torniquete CAT TCCC aplicado corretamente em coxa"
                    loading="lazy"
                    className="w-full h-[460px] md:h-[560px] object-cover"
                  />
                  <figcaption className="mt-4 flex items-center gap-3" style={{ ...mono, color: COBRE_LIGHT, fontSize: 10 }}>
                    <span className="h-px w-8" style={{ background: COBRE_LIGHT }} />
                    Nível 03 · Torniquete TCCC · Uso restrito
                  </figcaption>
                </motion.figure>

                <motion.div {...fade(0.22)} className="border-l-2 pl-8 relative" style={{ borderColor: COBRE_LIGHT }}>
                  <span
                    className="absolute -left-[7px] top-0 w-3 h-3 rounded-full"
                    style={{ background: COBRE_LIGHT, boxShadow: '0 0 18px rgba(232,163,107,0.7)' }}
                  />
                  <h3 style={{ ...display, fontSize: 'clamp(1.8rem, 2.5vw, 2.6rem)', color: SAND }}>
                    Torniquete: a última escolha que salva
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed" style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
                    Indicado <em style={editorial}>apenas</em> em sangramento arterial intenso de membro, quando a compressão direta firme falhou.
                    Aplicação correta segue a doutrina TCCC do socorro tático de combate.
                  </p>
                  <ol className="mt-8 space-y-4">
                    {[
                      ['Posicionamento', '5 a 7 cm acima da lesão, nunca sobre articulação.'],
                      ['Aperto', 'Apertar até cessar completamente o sangramento e desaparecer o pulso distal.'],
                      ['Registro', 'Anotar horário visível no próprio torniquete ou na pele da vítima.'],
                      ['Não afrouxar', 'Nunca afrouxar periodicamente. Só remoção em ambiente médico.'],
                    ].map(([titulo, desc], i) => (
                      <li key={i} className="flex gap-5">
                        <span style={{ ...mono, color: COBRE_LIGHT, fontSize: 11, minWidth: 28 }}>0{i + 1}</span>
                        <div>
                          <p style={{ ...display, fontSize: 18, color: SAND, lineHeight: 1.2 }}>{titulo}</p>
                          <p className="mt-1 text-base leading-relaxed" style={{ color: 'rgba(244,237,228,0.7)', fontFamily: "'Inter Tight', sans-serif" }}>
                            {desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════ § 03 IMOBILIZAÇÃO (SAND) ═════════════════════════ */}
        <section className="relative" style={{ background: SAND_DEEP, color: BORDO_DARK }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <motion.div {...fade()} className="max-w-4xl">
              <span style={{ ...mono, color: COBRE, fontSize: 11 }}>§ 03 · Fraturas</span>
              <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.8rem, 6vw, 6rem)', color: BORDO_DARK }}>
                Imobilizar é{' '}
                <span style={{ ...editorial, color: COBRE }}>não mover.</span>
              </h2>
              <p className="mt-8 text-xl md:text-2xl leading-relaxed" style={{ color: BORDO, fontFamily: "'Inter Tight', sans-serif" }}>
                Movimentar uma fratura aumenta a dor, causa lesão vascular e agrava o trauma.
                O objetivo da imobilização improvisada é simples: impedir movimento até o transporte profissional.
              </p>
            </motion.div>

            <motion.figure {...fade(0.1)} className="mt-16 overflow-hidden rounded-sm">
              <img
                src={imgImobilizacao}
                alt="Tala improvisada com revistas roladas e tiras de pano em antebraço"
                loading="lazy"
                className="w-full h-[480px] md:h-[620px] object-cover"
              />
            </motion.figure>

            <div className="mt-20 grid md:grid-cols-2 gap-px" style={{ background: 'rgba(58,14,16,0.18)' }}>
              {/* Card sinais */}
              <motion.div {...fade(0.12)} className="p-10 md:p-14" style={{ background: SAND_DEEP }}>
                <span style={{ ...mono, color: COBRE, fontSize: 10 }}>Diagnóstico de campo</span>
                <h3 className="mt-5" style={{ ...display, fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)', color: BORDO_DARK }}>
                  Sinais de fratura
                </h3>
                <ul className="mt-8 space-y-4">
                  {[
                    'Dor intensa ao toque mínimo.',
                    'Inchaço rápido e localizado.',
                    'Deformidade visível ou angulação anormal.',
                    'Incapacidade total de movimentar a região.',
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-4">
                      <span className="mt-2 h-1.5 w-6" style={{ background: COBRE }} />
                      <span className="text-lg" style={{ color: BORDO, fontFamily: "'Inter Tight', sans-serif" }}>
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 p-6" style={{ background: BORDO, color: SAND }}>
                  <div className="flex items-start gap-4">
                    <XCircle size={22} style={{ color: COBRE_LIGHT, flexShrink: 0, marginTop: 2 }} />
                    <p className="text-lg leading-snug" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600 }}>
                      Nunca tente <em style={editorial}>colocar no lugar.</em> Reduza apenas em ambiente médico.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card técnica braço */}
              <motion.div {...fade(0.15)} className="p-10 md:p-14" style={{ background: SAND_DEEP }}>
                <span style={{ ...mono, color: COBRE, fontSize: 10 }}>Técnica · Braço</span>
                <h3 className="mt-5" style={{ ...display, fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)', color: BORDO_DARK }}>
                  Tala improvisada
                </h3>
                <p className="mt-3 text-base" style={{ color: BORDO, opacity: 0.75, fontFamily: "'Inter Tight', sans-serif" }}>
                  Materiais possíveis: revista grossa, tábua estreita, papelão rígido, tubo de PVC.
                </p>
                <ol className="mt-8 space-y-5">
                  {[
                    'Posicionar suporte rígido lateral, abrangendo a articulação acima e abaixo da fratura.',
                    'Fixar com faixa, pano ou cinto, firme sem garrotear.',
                    'Sustentar o braço com tipoia improvisada presa no pescoço.',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-5">
                      <span style={{ ...mono, color: COBRE, fontSize: 11, minWidth: 28 }}>0{i + 1}</span>
                      <span className="text-lg leading-relaxed" style={{ color: BORDO, fontFamily: "'Inter Tight', sans-serif" }}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 pt-8 border-t" style={{ borderColor: 'rgba(58,14,16,0.2)' }}>
                  <span style={{ ...mono, color: COBRE, fontSize: 10 }}>Técnica · Perna</span>
                  <ol className="mt-5 space-y-3">
                    {[
                      'Duas superfícies rígidas laterais, da coxa ao tornozelo.',
                      'Fixar acima e abaixo do ponto da lesão.',
                      'Verificar circulação após (cor e temperatura do pé).',
                    ].map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span style={{ ...mono, color: COBRE, fontSize: 11, minWidth: 20 }}>0{i + 1}</span>
                        <span className="text-base leading-relaxed" style={{ color: BORDO, fontFamily: "'Inter Tight', sans-serif" }}>
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════ § 04 QUEIMADURAS (BORDÔ) ═════════════════════════ */}
        <section className="relative" style={{ background: BORDO, color: SAND }}>
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <div className="grid lg:grid-cols-12 gap-12">
              <motion.div {...fade()} className="lg:col-span-5">
                <span style={{ ...mono, color: COBRE_LIGHT, fontSize: 11 }}>§ 04 · Queimadura</span>
                <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.8rem, 6vw, 6rem)', color: SAND }}>
                  A pele segue
                  <br />
                  <span style={{ ...editorial, color: COBRE_LIGHT, textShadow: '0 0 30px rgba(0,0,0,0.6)' }}>
                    queimando.
                  </span>
                </h2>
                <p className="mt-8 text-xl leading-relaxed" style={{ color: 'rgba(244,237,228,0.88)', fontFamily: "'Inter Tight', sans-serif" }}>
                  Mesmo após a fonte de calor ser removida, a queimadura continua aprofundando.
                  Resfriar nos primeiros minutos reduz drasticamente o grau final da lesão.
                </p>
              </motion.div>

              <motion.figure {...fade(0.1)} className="lg:col-span-7 overflow-hidden rounded-sm">
                <img
                  src={imgQueimaduras}
                  alt="Água corrente fria sendo aplicada em queimadura de segundo grau no antebraço"
                  loading="lazy"
                  className="w-full h-[420px] md:h-[600px] object-cover"
                />
              </motion.figure>
            </div>

            {/* Classificação */}
            <div className="mt-24 grid md:grid-cols-3 gap-px" style={{ background: 'rgba(244,237,228,0.12)' }}>
              {[
                { grau: '1º Grau', titulo: 'Superficial', desc: 'Vermelhidão, dor leve, sem bolha. Resolução em dias.', accent: COBRE_LIGHT },
                { grau: '2º Grau', titulo: 'Espessura parcial', desc: 'Bolhas, dor intensa, pele úmida. Cicatrização em semanas.', accent: COBRE },
                { grau: '3º Grau', titulo: 'Espessura total', desc: 'Pele esbranquiçada, escura ou carbonizada. Atendimento imediato.', accent: '#8b1a1a' },
              ].map((q, i) => (
                <motion.div key={q.grau} {...fade(i * 0.06)} className="p-10 md:p-14" style={{ background: BORDO }}>
                  <span style={{ ...mono, color: q.accent, fontSize: 10 }}>{q.grau}</span>
                  <h4 className="mt-4" style={{ ...display, fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)', color: SAND }}>
                    {q.titulo}
                  </h4>
                  <div className="mt-6 h-[2px] w-12" style={{ background: q.accent }} />
                  <p className="mt-6 text-lg leading-relaxed" style={{ color: 'rgba(244,237,228,0.78)', fontFamily: "'Inter Tight', sans-serif" }}>
                    {q.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Conduta + Erros */}
            <div className="mt-20 grid lg:grid-cols-2 gap-px" style={{ background: 'rgba(244,237,228,0.12)' }}>
              <motion.div {...fade(0.1)} className="p-10 md:p-14" style={{ background: BORDO }}>
                <span style={{ ...mono, color: COBRE_LIGHT, fontSize: 10 }}>Conduta inicial</span>
                <h3 className="mt-5" style={{ ...display, fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)', color: SAND }}>
                  O que fazer
                </h3>
                <ol className="mt-8 space-y-5">
                  {[
                    'Interromper imediatamente a fonte de calor.',
                    'Resfriar com água corrente em temperatura ambiente por 10 a 20 minutos.',
                    'Cobrir a lesão com pano limpo ou filme plástico estéril.',
                    'Manter a vítima aquecida no resto do corpo (queimadura grande causa hipotermia).',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-5">
                      <CheckCircle2 size={20} style={{ color: COBRE_LIGHT, flexShrink: 0, marginTop: 2 }} />
                      <span className="text-lg leading-relaxed" style={{ color: SAND, fontFamily: "'Inter Tight', sans-serif" }}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </motion.div>

              <motion.div {...fade(0.15)} className="p-10 md:p-14" style={{ background: BORDO_DARK }}>
                <span style={{ ...mono, color: '#e58a8a', fontSize: 10 }}>Erros que pioram</span>
                <h3 className="mt-5" style={{ ...display, fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)', color: SAND }}>
                  O que <em style={editorial}>nunca</em> fazer
                </h3>
                <ul className="mt-8 space-y-5">
                  {[
                    'Não aplicar gelo: agrava a lesão por vasoconstrição.',
                    'Não passar manteiga, pasta de dente, pó de café ou borra.',
                    'Não estourar bolhas: a bolha é barreira biológica estéril.',
                    'Não retirar tecido grudado na pele: corte ao redor.',
                  ].map((item) => (
                    <li key={item} className="flex gap-5">
                      <XCircle size={20} style={{ color: '#e58a8a', flexShrink: 0, marginTop: 2 }} />
                      <span className="text-lg leading-relaxed" style={{ color: SAND, fontFamily: "'Inter Tight', sans-serif" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════ § 05 KIT IFAK (SAND com imagem gigante) ═════════════════════════ */}
        <section className="relative" style={{ background: SAND, color: BORDO_DARK }}>
          <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <motion.div {...fade()} className="max-w-4xl">
              <span style={{ ...mono, color: COBRE, fontSize: 11 }}>§ 05 · Equipamento</span>
              <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.8rem, 6vw, 6rem)', color: BORDO_DARK }}>
                Kit funcional,{' '}
                <span style={{ ...editorial, color: COBRE }}>não decorativo.</span>
              </h2>
              <p className="mt-8 text-xl md:text-2xl leading-relaxed" style={{ color: BORDO, fontFamily: "'Inter Tight', sans-serif" }}>
                Um kit que fica trancado, vencido ou enterrado em armário não existe.
                Funcional é o kit que você sabe abrir no escuro, com mãos sujas, em 30 segundos.
              </p>
            </motion.div>

            <motion.figure {...fade(0.1)} className="mt-16 overflow-hidden">
              <img
                src={imgKit}
                alt="Kit IFAK profissional em flat-lay com torniquete CAT, gaze hemostática, bandagem israelense, luvas e mais"
                loading="lazy"
                className="w-full h-[520px] md:h-[720px] object-cover"
              />
            </motion.figure>

            <div className="mt-20 grid lg:grid-cols-12 gap-12">
              {/* Itens essenciais */}
              <motion.div {...fade(0.1)} className="lg:col-span-7">
                <span style={{ ...mono, color: COBRE, fontSize: 10 }}>Inventário mínimo</span>
                <h3 className="mt-4" style={{ ...display, fontSize: 'clamp(1.8rem, 2.6vw, 2.6rem)', color: BORDO_DARK }}>
                  Onze itens não negociáveis
                </h3>
                <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-1">
                  {[
                    ['01', 'Torniquete CAT ou SOFTT-W'],
                    ['02', 'Gaze hemostática (QuikClot/Celox)'],
                    ['03', 'Bandagem israelense'],
                    ['04', 'Gaze estéril em rolo'],
                    ['05', 'Luvas de nitrila (4 pares)'],
                    ['06', 'Tesoura para trauma'],
                    ['07', 'Fita médica resistente'],
                    ['08', 'Soro fisiológico (irrigação)'],
                    ['09', 'Tala dobrável SAM'],
                    ['10', 'Manta térmica de mylar'],
                    ['11', 'Cânula nasofaríngea'],
                  ].map(([n, item]) => (
                    <div key={n} className="flex items-baseline gap-5 py-4 border-b" style={{ borderColor: 'rgba(58,14,16,0.15)' }}>
                      <span style={{ ...mono, color: COBRE, fontSize: 10 }}>{n}</span>
                      <span className="text-lg" style={{ color: BORDO_DARK, fontFamily: "'Inter Tight', sans-serif", fontWeight: 500 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Organização */}
              <motion.div {...fade(0.15)} className="lg:col-span-5">
                <div className="p-10 md:p-12" style={{ background: BORDO_DARK, color: SAND }}>
                  <span style={{ ...mono, color: COBRE_LIGHT, fontSize: 10 }}>Doutrina de organização</span>
                  <h3 className="mt-4" style={{ ...display, fontSize: 'clamp(1.6rem, 2.2vw, 2.2rem)', color: SAND }}>
                    Compartimentar para
                    <br />
                    <span style={editorial}>achar no escuro.</span>
                  </h3>
                  <div className="mt-8 space-y-5">
                    {[
                      ['Hemorragia', 'Bolso superior, acesso imediato'],
                      ['Imobilização', 'Bolso lateral, segundo acesso'],
                      ['Queimadura', 'Bolso interno, água separada'],
                      ['Higienização', 'Compartimento estanque'],
                    ].map(([cat, where]) => (
                      <div key={cat} className="flex items-start justify-between gap-6 pb-5 border-b" style={{ borderColor: 'rgba(244,237,228,0.15)' }}>
                        <div>
                          <p style={{ ...display, fontSize: 18, color: SAND }}>{cat}</p>
                          <p className="mt-1 text-sm" style={{ color: 'rgba(244,237,228,0.65)', fontFamily: "'Inter Tight', sans-serif" }}>
                            {where}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 pt-6 border-t flex items-center gap-3" style={{ borderColor: 'rgba(244,237,228,0.15)' }}>
                    <Timer size={16} style={{ color: COBRE_LIGHT }} />
                    <p className="text-sm" style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
                      Auditoria de validade a cada 6 meses.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════ § 06 FAQ (BORDÔ ESCURO) ═════════════════════════ */}
        <section className="relative" style={{ background: BORDO_DARK, color: SAND }}>
          <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
            <motion.div {...fade()} className="max-w-3xl">
              <span style={{ ...mono, color: COBRE_LIGHT, fontSize: 11 }}>§ 06 · Dúvidas operacionais</span>
              <h2 className="mt-8" style={{ ...display, fontSize: 'clamp(2.8rem, 6vw, 6rem)', color: SAND }}>
                Perguntas que
                <br />
                <span style={{ ...editorial, color: COBRE_LIGHT, textShadow: '0 0 30px rgba(196,99,42,0.4)' }}>
                  decidem desfechos.
                </span>
              </h2>
            </motion.div>

            <div className="mt-16 divide-y" style={{ borderColor: 'rgba(244,237,228,0.15)' }}>
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.04)} className="border-t" style={{ borderColor: 'rgba(244,237,228,0.15)' }}>
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left py-8 flex items-start justify-between gap-8 group"
                    >
                      <div className="flex items-baseline gap-6 flex-1">
                        <span style={{ ...mono, color: COBRE_LIGHT, fontSize: 11, minWidth: 36 }}>0{i + 1}</span>
                        <h3 style={{ ...display, fontSize: 'clamp(1.3rem, 1.8vw, 1.8rem)', color: SAND, lineHeight: 1.2 }}>
                          {f.q}
                        </h3>
                      </div>
                      <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4, ease: APPLE_EASE }}>
                        <span style={{ ...display, fontSize: 32, color: COBRE_LIGHT }}>+</span>
                      </motion.span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: APPLE_EASE }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="pb-10 pl-[60px] max-w-3xl">
                        <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(244,237,228,0.82)', fontFamily: "'Inter Tight', sans-serif" }}>
                          {f.a}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═════════════════════════ § 07 DISCLAIMER + CTA (SAND) ═════════════════════════ */}
        <section className="relative" style={{ background: SAND, color: BORDO_DARK }}>
          <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
            <motion.div {...fade()} className="border-l-4 pl-8 md:pl-12 max-w-4xl" style={{ borderColor: COBRE }}>
              <span style={{ ...mono, color: COBRE, fontSize: 11 }}>Aviso clínico</span>
              <p className="mt-6 text-xl md:text-2xl leading-relaxed" style={{ color: BORDO_DARK, fontFamily: "'Inter Tight', sans-serif", fontWeight: 500 }}>
                Este conteúdo é de caráter educativo, baseado em protocolos validados de medicina pré-hospitalar e da doutrina TCCC.
              </p>
              <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: BORDO, fontFamily: "'Inter Tight', sans-serif", opacity: 0.78 }}>
                Não substitui treinamento presencial certificado, consulta médica, diagnóstico ou tratamento profissional.
                Em emergências reais, acione SAMU (192) ou Corpo de Bombeiros (193) imediatamente.
              </p>
            </motion.div>

            <div className="mt-16">
              <MicroCtaResistencia variant="saude" />
            </div>

            {/* Navegação */}
            <div className="mt-20 pt-12 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={{ borderColor: 'rgba(58,14,16,0.2)' }}>
              <Link
                to="/soberania-organica"
                className="group flex items-center gap-3"
                style={{ ...mono, color: BORDO, fontSize: 11 }}
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                Soberania Orgânica
              </Link>
              <Link
                to="/soberania-organica/autonomia-biologica"
                className="group flex items-center gap-3"
                style={{ ...mono, color: COBRE, fontSize: 11 }}
              >
                Próximo: Suporte Fitoterápico
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </article>
      <ScrollToTop />
    </>
  );
};

export default PrimeirosSocorros;