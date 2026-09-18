import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, AlertTriangle, Skull, FileText, Microscope, ShieldAlert, FlaskConical } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';
import heroImg from '@/assets/plantas-individuais/aristolochia-hero.webp';
import toxicidadeImg from '@/assets/plantas-individuais/aristolochia-toxicidade.webp';

const canonical = 'https://lordjunnior.com.br/soberania-organica/plantas-subutilizadas/aristolochia-alerta';

const FAQ = [
  {
    question: 'Cipó Mil-Homens cura mesmo cobreiro e picada de cobra?',
    answer: 'O uso popular existe, especialmente em região rural, e foi base da reputação histórica da planta. O problema é que NENHUM ensaio clínico controlado sustenta essas indicações em humanos, enquanto múltiplos estudos epidemiológicos e clínicos comprovam dano renal e risco de câncer urotelial pelo ácido aristolóquico. O suposto benefício não compensa a toxicidade documentada. Em picada de cobra, a única conduta é soroterapia em hospital, fitoterapia neste contexto é negligência.',
  },
  {
    question: 'Já usei chá de Cipó Mil-Homens, vou ter problema renal?',
    answer: 'Depende de dose, frequência e tempo de uso. Uso eventual em chá fraco tem risco baixo, mas não nulo. Uso prolongado (semanas a meses) em concentração alta tem risco real de nefropatia. Quem usou de forma crônica deve fazer avaliação renal (creatinina, ureia, ureia, sumário de urina) e, se houver alteração, acompanhamento nefrológico. O dano por ácido aristolóquico pode aparecer anos após a exposição.',
  },
  {
    question: 'Existe preparo seguro de Aristolochia?',
    answer: 'Não. O ácido aristolóquico é resistente a fervura, secagem e maceração. Não há método caseiro nem industrial conhecido que elimine o composto sem destruir o restante da planta. Por isso a Anvisa, EMA, FDA e autoridades sanitárias da Ásia, Europa e América proibiram o uso interno em diferentes graus. Não existe dose segura de ácido aristolóquico para uso interno.',
  },
  {
    question: 'O que substitui o Cipó Mil-Homens em uso tradicional?',
    answer: 'Depende da indicação que se buscava. Para drenagem hepática, Jurubeba e Pariparoba. Para limpeza renal e cristais, Quebra-Pedra. Para anti-inflamatório sistêmico, Chapéu-de-Couro. Para parasitose, Artemísia em janela curta. Cada planta com perfil de segurança documentado e janela operacional clara, sem o risco oculto da nefropatia por ácido aristolóquico.',
  },
  {
    question: 'A planta pode ser usada externamente?',
    answer: 'Mesmo o uso externo exige cautela. A absorção transdérmica do ácido aristolóquico é baixa, mas em pele lesionada, mucosa ou em uso prolongado em grande área corporal, há risco de absorção sistêmica relevante. Para feridas e cobreiro, há alternativas seguras (Tanchagem, Confrei tópico, Calêndula). O uso externo de Aristolochia é dispensável quando há substitutos sem nefrotoxicidade.',
  },
  {
    question: 'Por que ainda é vendida em feiras se é tão perigosa?',
    answer: 'Por três razões: lacuna de fiscalização sanitária em mercados informais, persistência cultural do uso tradicional e desconhecimento do consumidor sobre a evidência acumulada de nefrotoxicidade e carcinogenicidade. A Anvisa proíbe a comercialização em farmácias, mas a venda em feiras populares e a colheita silvestre seguem ocorrendo, o que torna a informação técnica clara mais necessária ainda.',
  },
];

export default function AristolochiaAlerta() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Cipó Mil-Homens (Aristolochia): Por Que NÃO Usar | Alerta Técnico</title>
        <meta name="description" content="Cipó Mil-Homens (Aristolochia) contém ácido aristolóquico, classificado como carcinógeno Grupo 1 pelo IARC, com risco documentado de nefropatia e câncer urotelial. Entenda por que evitar." />
        <meta name="keywords" content="cipó mil-homens, aristolochia, ácido aristolóquico, nefropatia, câncer urotelial, IARC grupo 1, planta tóxica, anvisa, fitoterapia segura, planta proibida" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Cipó Mil-Homens (Aristolochia): Por Que NÃO Usar | Alerta Técnico" />
        <meta property="og:description" content="Ácido aristolóquico é carcinógeno Grupo 1. Uso interno está associado a nefropatia irreversível e câncer urotelial documentado." />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://lordjunnior.com.br${heroImg}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalWebPage',
          name: 'Cipó Mil-Homens (Aristolochia): Por Que NÃO Usar',
          description: 'Alerta técnico sobre nefrotoxicidade e carcinogenicidade do ácido aristolóquico presente em espécies de Aristolochia.',
          url: canonical,
          author: { '@type': 'Person', name: 'Lord Junnior' },
          medicalAudience: { '@type': 'MedicalAudience', audienceType: 'adult' },
          about: {
            '@type': 'MedicalCondition',
            name: 'Nefropatia por ácido aristolóquico (AAN)',
            possibleTreatment: { '@type': 'MedicalTherapy', name: 'Suspensão imediata do uso e avaliação nefrológica' },
          },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ.map(f => ({
            '@type': 'Question', name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br/' },
            { '@type': 'ListItem', position: 2, name: 'Soberania Orgânica', item: 'https://lordjunnior.com.br/soberania-organica' },
            { '@type': 'ListItem', position: 3, name: 'Plantas Subutilizadas', item: 'https://lordjunnior.com.br/soberania-organica/plantas-subutilizadas' },
            { '@type': 'ListItem', position: 4, name: 'Cipó Mil-Homens, Alerta', item: canonical },
          ],
        })}</script>
      </Helmet>

      <ScrollToTop />
      <BackToHome />

      <div className="min-h-screen bg-[#07080c] text-stone-200">
        {/* HERO ALERTA */}
        <section className="relative h-screen min-h-[680px] w-full flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${heroImg})`, filter: 'brightness(0.45) saturate(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080c]/40 via-[#07080c]/65 to-[#07080c]" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 40%, transparent 25%, rgba(7,8,12,0.9) 100%)' }} />
          <div className="absolute inset-0 bg-red-950/15 mix-blend-multiply" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
            <Link
              to="/soberania-organica/plantas-subutilizadas"
              className="inline-flex items-center gap-2 text-stone-400 hover:text-red-400 text-xs font-bold uppercase tracking-[0.2em] transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Plantas Subutilizadas
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/40 mb-6">
                <Skull size={14} className="text-red-400" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-300">
                  Plantas Subutilizadas, Ficha 10, Alerta Técnico
                </span>
              </div>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white max-w-5xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}
              >
                Cipó Mil-Homens. <span className="text-red-400">A planta que tradição esqueceu de avisar que destrói o rim.</span>
              </h1>
              <p className="text-stone-300 text-lg md:text-xl lg:text-2xl leading-relaxed mt-8 max-w-3xl" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Aristolochia spp. contém ácido aristolóquico, classificado pelo IARC como carcinógeno Grupo 1 (mesma categoria do cigarro e do amianto), com nefropatia e câncer urotelial documentados em múltiplos países. Esta página existe para que você não use esta planta sem entender o risco.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-12 text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
                <span className="text-red-400/80"><em className="not-italic">Aristolochia spp.</em></span>
                <span className="w-px h-4 bg-stone-700 hidden md:block" />
                <span>Família: Aristolochiaceae</span>
                <span className="w-px h-4 bg-stone-700 hidden md:block" />
                <span>Status: Anvisa proíbe uso interno</span>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-16 inline-flex items-center gap-3 text-stone-500"
            >
              <ChevronDown size={16} />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Dossiê de toxicidade</span>
            </motion.div>
          </div>
        </section>

        {/* ATO 01 — POR QUE A FAMA EXISTE */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400/70">Ato 01</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Por que tanta gente ainda toma, mesmo proibido.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-lg leading-relaxed text-stone-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              <p>
                O Cipó Mil-Homens é uma das plantas mais antigas da fitoterapia popular brasileira. Foi indicado para picada de cobra, cobreiro, anti-inflamatório, depurativo, regulador menstrual e tônico digestivo. Praticamente toda família rural de geração antiga conhece o nome e atribui à planta algum grau de respeito.
              </p>
              <p>
                A reputação se construiu antes da farmacologia moderna. Antes da nefrologia conseguir mapear que existe uma síndrome chamada <em className="text-red-300" style={{ fontFamily: "'Instrument Serif', serif" }}>Nefropatia por Ácido Aristolóquico (AAN)</em>. Antes da Agência Internacional de Pesquisa em Câncer (IARC, ligada à OMS) classificar o ácido aristolóquico como carcinógeno Grupo 1 em 2002, com revisão de evidências reforçada nas duas décadas seguintes.
              </p>
              <p>
                A planta funciona em algumas indicações tradicionais, sim. O problema é que ela funciona ao custo de um composto que se acumula no rim, gera lesão tubular irreversível e está associado a alta incidência de carcinoma urotelial em populações que tiveram exposição crônica documentada (Bélgica, Taiwan, Croácia, China). Tradição não compete com epidemiologia neste caso. A epidemiologia já decidiu.
              </p>
            </div>
          </div>
        </section>

        {/* ATO 02 — DOSSIÊ DA TOXICIDADE */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-red-950/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Microscope className="text-red-400" size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400/70">Ato 02 — Dossiê molecular</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Por que o ácido aristolóquico é diferente de qualquer outro alcaloide.
              </h2>
            </div>
            <div className="rounded-3xl overflow-hidden border border-red-500/20 mb-10">
              <img src={toxicidadeImg} alt="Dossiê visual: ácido aristolóquico e dano renal" loading="lazy" width={1920} height={1080} className="w-full h-auto" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { titulo: 'Lesão tubular direta', texto: 'O ácido aristolóquico se liga covalentemente ao DNA das células do túbulo renal proximal, formando adutos AA-DNA que persistem por anos. A lesão é cumulativa e em geral irreversível.' },
                { titulo: 'Carcinógeno Grupo 1 (IARC)', texto: 'Em 2002 e em revisões posteriores, o IARC classificou misturas e derivados de ácido aristolóquico como Grupo 1, mesma categoria do tabaco e do amianto. Não é estimativa, é evidência humana direta.' },
                { titulo: 'Carcinoma urotelial', texto: 'Estudos de coorte em Taiwan e Bélgica mostraram associação clara entre uso de ervas contendo aristolochia e câncer de pelve renal, ureter e bexiga, com latência de 5 a 20 anos após exposição.' },
                { titulo: 'Não há dose segura', texto: 'Diferente de hepatotóxicos comuns, o efeito mutagênico do ácido aristolóquico não respeita limiar. Mesmo doses pequenas em uso prolongado deixam adutos no DNA tubular e em urotélio.' },
              ].map((bloco, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-red-500/30 bg-red-500/5 p-7 hover:border-red-400/50 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <FlaskConical size={16} className="text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-200 mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
                        {bloco.titulo}
                      </h3>
                      <p className="text-stone-300 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        {bloco.texto}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ATO 03 — CASOS HISTÓRICOS DOCUMENTADOS */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-red-400" size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400/70">Ato 03 — Histórico clínico</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                A epidemiologia já fez o trabalho. Falta a notícia chegar.
              </h2>
            </div>
            <div className="space-y-5">
              {[
                { ano: '1991, Bélgica', titulo: 'Surto em clínica de emagrecimento', texto: 'Mais de 100 mulheres desenvolveram nefropatia rapidamente progressiva após uso de fórmula chinesa contendo Aristolochia fangchi. Cerca de metade evoluiu para insuficiência renal terminal e parcela significativa desenvolveu carcinoma urotelial nos anos seguintes. Foi o primeiro grande alerta mundial.' },
                { ano: '2002, IARC', titulo: 'Classificação Grupo 1', texto: 'A Agência Internacional de Pesquisa em Câncer classificou misturas e derivados de ácido aristolóquico como carcinógenos Grupo 1, com base em evidência humana direta. Categoria reservada para agentes com causalidade comprovada em câncer humano.' },
                { ano: '2012, Taiwan', titulo: 'Coorte populacional gigantesca', texto: 'Estudo em mais de 200 mil pacientes mostrou associação clara entre uso prévio de ervas contendo aristolochia e câncer de trato urinário superior, com risco várias vezes maior em quem teve exposição cumulativa documentada.' },
                { ano: '2013, Anvisa', titulo: 'Resolução RDC 26/2014 e atualizações', texto: 'A Anvisa proíbe a comercialização de produtos contendo Aristolochia para uso interno em farmácias e drogarias no Brasil, alinhada com proibições da Europa, EUA, Reino Unido, Austrália e múltiplos países asiáticos.' },
                { ano: '2017, Singapura/EUA', titulo: 'Sequenciamento genômico', texto: 'Estudos de sequenciamento mostraram assinatura mutacional específica do ácido aristolóquico em câncer de fígado e trato urinário em populações asiáticas, evidência molecular direta da contribuição da planta para câncer humano.' },
              ].map((caso, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="grid md:grid-cols-12 gap-6 items-start rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-8 hover:border-red-500/30 transition-all duration-500"
                >
                  <div className="md:col-span-3">
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400/80">{caso.ano}</span>
                    <h3 className="text-2xl font-bold text-white mt-2 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
                      {caso.titulo}
                    </h3>
                  </div>
                  <p className="md:col-span-9 text-stone-300 leading-relaxed text-lg" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {caso.texto}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ATO 04 — O QUE USAR NO LUGAR */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-emerald-950/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="text-emerald-400" size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">Ato 04 — Substituição racional</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                O que usar no lugar, sem nefrotoxicidade.
              </h2>
              <p className="text-stone-400 text-lg mt-6 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Para cada indicação tradicional do Cipó Mil-Homens, existe substituto com perfil de segurança documentado e ação clínica reconhecida. Trocar é racional, não é abrir mão de fitoterapia.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { indicacao: 'Drenagem hepática', substituto: 'Jurubeba e Pariparoba', link: '/soberania-organica/plantas-subutilizadas/jurubeba' },
                { indicacao: 'Limpeza renal e cristais', substituto: 'Quebra-Pedra (Phyllanthus niruri)', link: '/soberania-organica/plantas-subutilizadas/quebra-pedra' },
                { indicacao: 'Anti-inflamatório sistêmico', substituto: 'Chapéu-de-Couro', link: '/soberania-organica/plantas-subutilizadas/chapeu-de-couro' },
                { indicacao: 'Manejo de mucosa irritada', substituto: 'Tanchagem', link: '/soberania-organica/plantas-subutilizadas/tanchagem' },
                { indicacao: 'Parasitose intestinal leve', substituto: 'Artemísia em janela curta', link: '/soberania-organica/plantas-subutilizadas/artemisia' },
                { indicacao: 'Apoio respiratório', substituto: 'Guaco e Umburana', link: '/soberania-organica/plantas-subutilizadas/guaco' },
              ].map((item, i) => (
                <Link
                  key={i}
                  to={item.link}
                  className="group rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-7 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-500"
                >
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400/80">{item.indicacao}</span>
                  <p className="text-white text-xl mt-3 leading-tight font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
                    {item.substituto}
                  </p>
                  <p className="text-emerald-300/70 text-xs uppercase tracking-[0.25em] font-bold mt-4 group-hover:text-emerald-300 transition-colors">
                    Ver ficha técnica →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ATO 05 — DECISÃO OPERACIONAL */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl border-2 border-red-500/40 bg-gradient-to-br from-red-950/40 to-[#07080c] p-10 md:p-16">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-red-400" size={24} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-300">Recomendação técnica final</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}>
                Não use Aristolochia internamente. Não trate como folclore inofensivo.
              </h2>
              <div className="mt-10 space-y-5 text-lg leading-relaxed text-stone-300 max-w-4xl" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                <p>
                  Se você já usou de forma prolongada (semanas ou meses) ou em concentração alta, procure avaliação nefrológica. Solicite creatinina, ureia, sumário de urina e, se houver alteração, ultrassom de vias urinárias e avaliação de trato urotelial. O dano por ácido aristolóquico pode aparecer anos após a exposição, vigilância importa.
                </p>
                <p>
                  Se você tem a planta no quintal, mantenha por valor ornamental ou ecológico, sem uso interno. Se você compra em feira sem identificação botânica clara, o risco aumenta porque outras plantas podem estar misturadas com Aristolochia sem que ninguém perceba.
                </p>
                <p>
                  Fitoterapia séria não preserva tradição às custas do paciente. Preserva o que serve, descarta o que se mostrou perigoso. Cipó Mil-Homens é o exemplo mais claro de planta que precisa sair da rotina, sem disso significar abandonar a sabedoria popular como um todo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-transparent to-red-950/5">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14 text-center">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400/70">Perguntas frequentes</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                O que mais perguntam sobre Cipó Mil-Homens.
              </h2>
            </div>
            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <details key={i} className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:border-red-500/30 transition-all duration-500 overflow-hidden">
                  <summary className="cursor-pointer p-7 md:p-8 list-none flex items-start justify-between gap-6">
                    <h3 className="text-lg md:text-xl font-bold text-white leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                      {f.question}
                    </h3>
                    <ChevronDown size={18} className="text-red-400 mt-1 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-7 md:px-8 pb-7 md:pb-8 -mt-2">
                    <p className="text-stone-300 leading-relaxed text-base md:text-lg" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                      {f.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <MicroCtaResistencia />
      </div>
    </>
  );
}