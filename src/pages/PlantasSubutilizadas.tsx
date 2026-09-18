import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, AlertTriangle, Leaf, Droplets, Wind, Shield, Skull, Clock, BookOpen, ChevronDown, ArrowUpRight } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import heroAltar from '@/assets/plantas-hub/hero-plantas-altar.webp';
import imgJurubeba from '@/assets/plantas-hub/jurubeba.webp';
import imgQuebraPedra from '@/assets/plantas-hub/quebra-pedra.webp';
import imgPariparoba from '@/assets/plantas-hub/pariparoba.webp';
import imgTanchagem from '@/assets/plantas-hub/tanchagem.webp';
import imgChapeu from '@/assets/plantas-hub/chapeu-de-couro.webp';
import imgArtemisia from '@/assets/plantas-hub/artemisia.webp';
import imgUmburana from '@/assets/plantas-hub/umburana.webp';
import imgEspinheira from '@/assets/plantas-hub/espinheira-santa.webp';
import imgAristolochia from '@/assets/plantas-hub/aristolochia.webp';
import imgGuaco from '@/assets/plantas-hub/guaco.webp';

interface PlantaCard {
  slug: string;
  nome: string;
  cientifico: string;
  especialidade: string;
  sistema: 'Hepático' | 'Renal' | 'Linfático' | 'Mucosas' | 'Sistêmico' | 'Digestivo' | 'Respiratório' | 'Gástrico' | 'Toxicidade' | 'Pulmonar';
  funcao: string;
  fitoquimica: string;
  preparo: string;
  janela: string;
  erro: string;
  imagem: string;
  alertaCor?: 'amber' | 'red';
  icone: typeof Leaf;
}

const PLANTAS: PlantaCard[] = [
  {
    slug: 'jurubeba',
    nome: 'Jurubeba',
    cientifico: 'Solanum paniculatum',
    especialidade: 'Especialista em fígado congestionado',
    sistema: 'Hepático',
    funcao: 'Estimula a produção de bile, descongestiona o fígado, mobiliza a digestão de gorduras e reduz sobrecarga hepática pós-alimentação pesada.',
    fitoquimica: 'Alcaloides esteroidais (jurubidina, solamargina) e saponinas que ativam fluxo coleréticocolagogo.',
    preparo: 'Decocção das folhas e raízes, 1 colher de sopa para 250 ml de água. Tomar 30 minutos antes das refeições principais.',
    janela: '15 dias com 7 de pausa',
    erro: 'Uso contínuo prolongado irrita mucosa gástrica. Não usar com úlcera ativa.',
    imagem: imgJurubeba,
    icone: Leaf,
  },
  {
    slug: 'quebra-pedra',
    nome: 'Quebra-Pedra',
    cientifico: 'Phyllanthus niruri',
    especialidade: 'Especialista em rins e vias urinárias',
    sistema: 'Renal',
    funcao: 'Auxilia a dissolução de cálculos renais de oxalato, aumenta o fluxo urinário, modula inflamação renal e reduz retenção hídrica leve.',
    fitoquimica: 'Lignanas (filantina, hipofilantina), flavonoides e alcaloides com ação antilitiásica documentada.',
    preparo: 'Infusão da planta inteira fresca ou seca, 2 a 3 g em 250 ml. Beber 2 a 3 xícaras ao dia, longe das refeições.',
    janela: '21 dias com pausa de 10',
    erro: 'Pressão baixa pode descompensar. Atenção em hipotensos e em uso com diuréticos.',
    imagem: imgQuebraPedra,
    icone: Droplets,
  },
  {
    slug: 'pariparoba',
    nome: 'Pariparoba',
    cientifico: 'Pothomorphe umbellata',
    especialidade: 'Desintoxicante profundo subestimado',
    sistema: 'Linfático',
    funcao: 'Ativa fígado e sistema linfático simultaneamente, mobiliza eliminação de metabólitos e atua também como tônico para a pele em uso tópico.',
    fitoquimica: 'Sarisan, 4-nerolidilcatecol (forte antioxidante e quelante) e óleos essenciais hepatoprotetores.',
    preparo: 'Infusão das folhas frescas, 5 g em 250 ml. Uso interno 1 vez ao dia. Compressa morna nas regiões linfáticas inchadas.',
    janela: '14 dias com pausa',
    erro: 'Não associar com anticoagulantes sem orientação. Pode potencializar efeito.',
    imagem: imgPariparoba,
    icone: Leaf,
  },
  {
    slug: 'tanchagem',
    nome: 'Tanchagem',
    cientifico: 'Plantago major',
    especialidade: 'Limpadora de mucosas inflamadas',
    sistema: 'Mucosas',
    funcao: 'Anti-inflamatório natural sobre mucosas digestivas e respiratórias, remove excesso de muco, atua em intestino irritável e bronquite leve.',
    fitoquimica: 'Mucilagens, aucubina (anti-inflamatório), taninos adstringentes e alantoína cicatrizante.',
    preparo: 'Infusão das folhas, 2 g em 200 ml. Bochechos para gengivite, ingestão para intestino e mucosa respiratória.',
    janela: '21 dias',
    erro: 'Mucilagens podem reduzir absorção de medicamentos. Distanciar 2 horas de fármacos.',
    imagem: imgTanchagem,
    icone: Wind,
  },
  {
    slug: 'chapeu-de-couro',
    nome: 'Chapéu-de-Couro',
    cientifico: 'Echinodorus grandiflorus',
    especialidade: 'Desinflamador sistêmico e diurético tático',
    sistema: 'Sistêmico',
    funcao: 'Anti-inflamatório de amplo espectro, diurético leve, suporte renal articulado com função uricosúrica em quadros gotosos.',
    fitoquimica: 'Diterpenos, flavonoides e taninos com ação documentada sobre articulações e ácido úrico.',
    preparo: 'Infusão das folhas, 3 g em 250 ml. Tomar 2 a 3 xícaras ao dia, preferencialmente manhã e tarde.',
    janela: '14 a 21 dias',
    erro: 'Diurético sustentado pede reposição de potássio. Consumir banana, abacate, água de coco.',
    imagem: imgChapeu,
    icone: Droplets,
  },
  {
    slug: 'artemisia',
    nome: 'Artemísia',
    cientifico: 'Artemisia vulgaris',
    especialidade: 'Regulador digestivo e antiparasitário',
    sistema: 'Digestivo',
    funcao: 'Ação antiparasitária, estimula secreção biliar e enzimática, regula ciclo digestivo e atua como emenagogo em ciclos femininos irregulares.',
    fitoquimica: 'Tujona (psicoativo em dose alta), cineol, lactonas sesquiterpênicas, flavonoides amargos.',
    preparo: 'Infusão fraca, 1 g em 200 ml. Não exceder 7 dias seguidos. Uso ocasional pré-refeição.',
    janela: '7 dias máximo, pausa de 21',
    erro: 'Tóxica em dose alta pela tujona. Proibida na gestação. Risco neurotóxico em uso crônico.',
    imagem: imgArtemisia,
    alertaCor: 'amber',
    icone: AlertTriangle,
  },
  {
    slug: 'umburana',
    nome: 'Umburana',
    cientifico: 'Amburana cearensis',
    especialidade: 'Sistema respiratório e expectoração',
    sistema: 'Respiratório',
    funcao: 'Expectorante, anti-inflamatório pulmonar, fluidifica secreção brônquica e reduz tosse seca persistente.',
    fitoquimica: 'Cumarina (responsável pelo aroma), isocampferideo, amburosídeo com ação broncodilatadora suave.',
    preparo: 'Decocção da casca, 2 g em 250 ml por 5 minutos. Beber 2 xícaras ao dia em quadros respiratórios.',
    janela: '10 a 14 dias',
    erro: 'Cumarina anticoagula. Cuidado em quem usa varfarina, AAS ou tem hemofilia.',
    imagem: imgUmburana,
    icone: Wind,
  },
  {
    slug: 'espinheira-santa',
    nome: 'Espinheira-Santa',
    cientifico: 'Maytenus ilicifolia',
    especialidade: 'Proteção gástrica e regeneração de mucosa',
    sistema: 'Gástrico',
    funcao: 'Regenera mucosa do estômago, reduz acidez, atua sobre úlcera péptica e gastrite crônica com evidência clínica forte (Anvisa fitoterápico).',
    fitoquimica: 'Triterpenos, taninos catéquicos, flavonoides e maitansina em traços com ação citoprotetora gástrica.',
    preparo: 'Infusão das folhas, 1 a 2 g em 200 ml. Tomar 2 a 3 xícaras ao dia, antes das refeições.',
    janela: '30 dias com avaliação',
    erro: 'Reduz produção de leite materno. Contraindicada na lactação.',
    imagem: imgEspinheira,
    icone: Shield,
  },
  {
    slug: 'aristolochia-alerta',
    nome: 'Cipó Mil-Homens',
    cientifico: 'Aristolochia spp.',
    especialidade: 'NÃO USAR INTERNAMENTE',
    sistema: 'Toxicidade',
    funcao: 'Tradicionalmente vendida como desintoxicante. Hoje classificada como nefrotóxica e carcinogênica grave pelo ácido aristolóquico (IARC Grupo 1).',
    fitoquimica: 'Ácido aristolóquico (AA-I e AA-II), genotóxico, causa nefropatia balcânica e carcinoma urotelial.',
    preparo: 'Não há preparo seguro para uso interno. Banida em diversos países para consumo humano.',
    janela: 'Zero. Evitar qualquer dose.',
    erro: 'Romantizar como natural. Já causou insuficiência renal terminal documentada em centenas de casos.',
    imagem: imgAristolochia,
    alertaCor: 'red',
    icone: Skull,
  },
  {
    slug: 'guaco',
    nome: 'Guaco',
    cientifico: 'Mikania glomerata',
    especialidade: 'Sistema respiratório e fluxo de ar',
    sistema: 'Pulmonar',
    funcao: 'Broncodilatador, melhora fluxo de ar em quadros asmáticos leves, expectorante coadjuvante em bronquite e tosse produtiva.',
    fitoquimica: 'Cumarina (broncodilatadora), ácido kaurenoico, taninos e óleos essenciais.',
    preparo: 'Xarope caseiro com 50 g de folhas frescas, 200 ml de água, 200 g de açúcar mascavo. Cozinhar até ponto. 1 colher de sopa, 3 vezes ao dia.',
    janela: '14 dias',
    erro: 'Anticoagulante em dose alta. Não combinar com AAS, varfarina ou anti-inflamatórios crônicos.',
    imagem: imgGuaco,
    icone: Wind,
  },
];

const FAQ_ITEMS = [
  {
    question: 'Posso tomar várias dessas plantas juntas no mesmo dia?',
    answer: 'Não. Misturar fitoterápicos sem lógica funcional é o erro mais comum e o que destrói resultado. O protocolo integrado abaixo separa por janela do dia (manhã renal, tarde hepática, noite digestiva) justamente para evitar interação cruzada de princípios ativos. Use no máximo duas plantas simultâneas com mecanismos distintos e consulte um profissional antes de combinar mais.',
  },
  {
    question: 'Quanto tempo leva para sentir efeito real?',
    answer: 'Fitoterapia funciona por consistência, não por intensidade. Efeitos digestivos (Jurubeba, Espinheira-Santa) aparecem em 3 a 7 dias. Efeitos renais (Quebra-Pedra) e linfáticos (Pariparoba) exigem 14 a 21 dias para manifestação clara. Quem espera resultado em 24 horas está desinformado sobre o mecanismo.',
  },
  {
    question: 'Por que vocês desaconselham o Cipó Mil-Homens se ele é tradicional?',
    answer: 'Tradição não é blindagem científica. O ácido aristolóquico foi classificado como carcinógeno humano Grupo 1 pela IARC (Agência Internacional de Pesquisa em Câncer da OMS), com casos documentados de insuficiência renal terminal e carcinoma urotelial. A FDA e a Anvisa restringiram seu uso. Romantizar o natural sem checar dados toxicológicos atualizados destrói rim de gente boa.',
  },
  {
    question: 'Onde comprar essas plantas com qualidade real?',
    answer: 'Prefira ervanários tradicionais com origem rastreável, mercados municipais com fornecedores conhecidos ou cultivo próprio. Evite saquinhos genéricos de supermercado, onde o material costuma ser velho, mal armazenado ou adulterado com outras espécies. Plantar Tanchagem, Quebra-Pedra e Artemísia em casa é trivial e blinda você do mercado.',
  },
  {
    question: 'Gestantes e crianças podem usar?',
    answer: 'Não sem orientação profissional. Artemísia e Cipó Mil-Homens são proibidos na gestação. Espinheira-Santa reduz produção de leite. Quebra-Pedra pode interagir com pressão materna. Fitoterapia em gestação e infância exige avaliação individualizada de fitoterapeuta ou médico orientado a plantas medicinais.',
  },
  {
    question: 'Por quanto tempo posso fazer o protocolo de 21 dias?',
    answer: 'O protocolo integrado é desenhado para 21 dias com pausa obrigatória de 10 a 14 dias antes de repetir. Uso contínuo sem pausa esgota o efeito modulador, gera tolerância e em alguns casos sobrecarrega o próprio órgão que se quer proteger. Consistência cíclica vence intensidade contínua.',
  },
];

const SISTEMAS_COR: Record<string, string> = {
  'Hepático': 'text-amber-300 border-amber-500/30 bg-amber-500/5',
  'Renal': 'text-cyan-300 border-cyan-500/30 bg-cyan-500/5',
  'Linfático': 'text-emerald-300 border-emerald-500/30 bg-emerald-500/5',
  'Mucosas': 'text-teal-300 border-teal-500/30 bg-teal-500/5',
  'Sistêmico': 'text-violet-300 border-violet-500/30 bg-violet-500/5',
  'Digestivo': 'text-orange-300 border-orange-500/30 bg-orange-500/5',
  'Respiratório': 'text-sky-300 border-sky-500/30 bg-sky-500/5',
  'Gástrico': 'text-lime-300 border-lime-500/30 bg-lime-500/5',
  'Toxicidade': 'text-red-300 border-red-500/40 bg-red-500/10',
  'Pulmonar': 'text-blue-300 border-blue-500/30 bg-blue-500/5',
};

const PAGINAS_INDIVIDUAIS = new Set([
  'jurubeba',
  'quebra-pedra',
  'espinheira-santa',
  'guaco',
  'tanchagem',
  'pariparoba',
  'chapeu-de-couro',
  'umburana',
  'artemisia',
  'aristolochia-alerta',
]);

export default function PlantasSubutilizadas() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonical = 'https://lordjunnior.com.br/soberania-organica/plantas-subutilizadas';

  return (
    <>
      <Helmet>
        <title>Plantas Subutilizadas: Limpeza Real do Corpo | 10 Espécies Brasileiras</title>
        <meta name="description" content="Não foi escondido. Foi abandonado. 10 plantas brasileiras com impacto real em fígado, rim, mucosa e pulmão. Fitoquímica, dose, janela e protocolo de 21 dias." />
        <meta name="keywords" content="plantas medicinais brasileiras, jurubeba, quebra-pedra, espinheira santa, fitoterapia, desintoxicação natural, limpeza hepática, limpeza renal, plantas para o fígado, plantas para o rim, fitoterapia brasileira, ervas medicinais, ácido aristolóquico, artemisia toxicidade, protocolo fitoterápico" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Plantas Subutilizadas: Limpeza Real do Corpo" />
        <meta property="og:description" content="10 plantas brasileiras com impacto real em fígado, rim, mucosa e pulmão. Fitoquímica, dose, janela e protocolo de 21 dias." />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://lordjunnior.com.br${heroAltar}`} />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalWebPage',
          name: 'Plantas Subutilizadas: Limpeza Real do Corpo',
          description: '10 plantas brasileiras com impacto real em fígado, rim, mucosa e pulmão.',
          url: canonical,
          author: { '@type': 'Person', name: 'Lord Junnior' },
          medicalAudience: { '@type': 'MedicalAudience', audienceType: 'adult' },
          about: PLANTAS.map(p => ({
            '@type': 'Substance',
            name: `${p.nome} (${p.cientifico})`,
            description: p.funcao,
          })),
        })}</script>

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map(f => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        })}</script>

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br/' },
            { '@type': 'ListItem', position: 2, name: 'Soberania Orgânica', item: 'https://lordjunnior.com.br/soberania-organica' },
            { '@type': 'ListItem', position: 3, name: 'Plantas Subutilizadas', item: canonical },
          ],
        })}</script>
      </Helmet>

      <ScrollToTop />
      <BackToHome />

      <div className="min-h-screen bg-[#07080c] text-stone-200">
        {/* HERO FULL-SCREEN APPLE-LIKE com fundo fixo */}
        <section
          ref={heroRef}
          className="relative h-screen min-h-[700px] w-full flex items-end overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(${heroAltar})`,
              filter: 'brightness(0.55) saturate(0.95)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080c]/30 via-[#07080c]/60 to-[#07080c]" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 40%, transparent 30%, rgba(7,8,12,0.85) 100%)' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
            <Link
              to="/soberania-organica"
              className="inline-flex items-center gap-2 text-stone-400 hover:text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Soberania Orgânica
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-400/80 mb-6">
                Fitoterapia Aplicada, Capítulo 02
              </span>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white max-w-5xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}
              >
                Plantas que o brasileiro <span className="text-emerald-400">esqueceu</span> e o corpo precisa.
              </h1>
              <p
                className="text-stone-300 text-lg md:text-xl lg:text-2xl leading-relaxed mt-8 max-w-3xl"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Não foi escondido. Foi abandonado. Aqui está como recuperar fígado, rim e pulmão com precisão fitoquímica, dose certa e janela de uso operacional.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-12 text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
                <span>10 espécies</span>
                <span className="w-px h-4 bg-stone-700" />
                <span>Protocolo 21 dias</span>
                <span className="w-px h-4 bg-stone-700" />
                <span>Fitoquímica autoral</span>
                <span className="w-px h-4 bg-stone-700" />
                <span>Leitura: 18 min</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-16 inline-flex items-center gap-3 text-stone-500"
            >
              <ChevronDown size={16} />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Role para abrir o dossiê</span>
            </motion.div>
          </div>
        </section>

        {/* ATO 01 — REFRAMING */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">Ato 01</span>
              <h2
                className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                A indústria não escondeu. Você abandonou.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-lg leading-relaxed text-stone-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              <p>
                Toda vez que alguém vende uma planta como segredo místico ocultado pela elite, perde autoridade técnica e ganha gente que romantiza. <em className="text-emerald-300" style={{ fontFamily: "'Instrument Serif', serif" }}>Não é assim que funciona.</em>
              </p>
              <p>
                As plantas listadas aqui estão em farmácias da Anvisa, em farmacopeias brasileiras, em jardins de avó, em terreno baldio na esquina. O conhecimento não foi sequestrado. Foi descartado por uma geração que confundiu progresso com terceirização do próprio corpo.
              </p>
              <p>
                Este dossiê devolve precisão. Cada espécie aqui tem fitoquímica documentada, dose operacional, janela de uso, sinergia com outras plantas e contraindicação real. Nada de bruxaria, nada de simplificação. Profundidade técnica para quem leva o próprio corpo a sério.
              </p>
            </div>
          </div>
        </section>

        {/* ALERTA VERMELHO — RiskBlock destacado */}
        <section className="px-6 md:px-12 lg:px-16 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="border-2 border-red-500/50 bg-gradient-to-br from-red-950/50 to-[#07080c] rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
                <img src={imgAristolochia} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#07080c]" />
              </div>
              <div className="relative z-10 max-w-4xl">
                <div className="flex items-center gap-3 mb-6">
                  <Skull className="text-red-400" size={28} />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400">Aviso de Toxicidade Crítica</span>
                </div>
                <h3
                  className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  O que NÃO usar, mesmo que seu vizinho jure.
                </h3>
                <div className="space-y-5 text-stone-300 text-base md:text-lg leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  <p>
                    <strong className="text-red-300">Cipó Mil-Homens (Aristolochia spp.)</strong> contém ácido aristolóquico, classificado como carcinógeno humano <strong>Grupo 1</strong> pela Agência Internacional de Pesquisa em Câncer (IARC, OMS). Casos documentados: insuficiência renal terminal e carcinoma urotelial. Banido para consumo humano em diversos países. Não existe dose segura.
                  </p>
                  <p>
                    <strong className="text-amber-300">Artemísia (Artemisia vulgaris)</strong> contém tujona, neurotóxica em dose alta. Limite operacional rigoroso: máximo 7 dias seguidos, dose fraca, jamais na gestação. Uso crônico é erro grave.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ATO 02 — CATÁLOGO DAS 10 PLANTAS */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 max-w-3xl">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">Ato 02</span>
              <h2
                className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                As 10 espécies. Função real, dose real.
              </h2>
              <p className="text-stone-400 text-lg mt-6 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Cada ficha entrega o que importa: o sistema que ela limpa, o princípio ativo que faz o trabalho, como preparar, quando parar e o erro que destrói o resultado.
              </p>
            </div>

            <div className="space-y-8 md:space-y-10">
              {PLANTAS.map((p, idx) => {
                const isReverse = idx % 2 === 1;
                const isAlerta = p.alertaCor === 'red';
                const Icon = p.icone;
                return (
                  <motion.article
                    key={p.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`group grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch rounded-3xl border ${
                      isAlerta
                        ? 'border-red-500/40 bg-red-950/20 hover:border-red-400/60'
                        : 'border-white/8 bg-white/[0.02] hover:border-emerald-500/30'
                    } p-6 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                      isAlerta ? 'hover:shadow-red-500/20' : 'hover:shadow-emerald-500/10'
                    }`}
                  >
                    <div className={`lg:col-span-5 ${isReverse ? 'lg:order-2' : ''}`}>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 group-hover:ring-emerald-500/30 transition-all duration-500">
                        <img
                          src={p.imagem}
                          alt={`${p.nome} (${p.cientifico}) — fotografia botânica precisa`}
                          loading="lazy"
                          width={1024}
                          height={768}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <span className={`inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border ${SISTEMAS_COR[p.sistema]}`}>
                            <Icon size={12} /> {p.sistema}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400 tracking-wider bg-black/60 px-2 py-1 rounded">
                            {String(idx + 1).padStart(2, '0')} / 10
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`lg:col-span-7 flex flex-col justify-between ${isReverse ? 'lg:order-1' : ''}`}>
                      <div>
                        <h3
                          className={`text-3xl md:text-4xl font-bold leading-tight ${isAlerta ? 'text-red-300' : 'text-white'}`}
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {p.nome}
                        </h3>
                        <p className="text-stone-500 italic text-sm mt-1" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {p.cientifico}
                        </p>
                        <p className={`text-base font-bold mt-3 ${isAlerta ? 'text-red-400' : 'text-emerald-400'}`}>
                          {p.especialidade}
                        </p>

                        <div className="mt-6 space-y-4 text-stone-300 leading-relaxed text-[15px]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                          <div>
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500">Função biológica</span>
                            <p className="mt-1">{p.funcao}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500">Camada fitoquímica</span>
                            <p className="mt-1 text-stone-400">{p.fitoquimica}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500">Preparo operacional</span>
                            <p className="mt-1">{p.preparo}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className={`border-l-2 ${isAlerta ? 'border-red-500/60' : 'border-emerald-500/40'} pl-4 py-2`}>
                          <span className={`text-[10px] font-bold tracking-[0.25em] uppercase ${isAlerta ? 'text-red-400' : 'text-emerald-400'}`}>
                            <Clock size={11} className="inline mr-1" /> Janela de uso
                          </span>
                          <p className="text-sm text-stone-300 mt-1 font-medium">{p.janela}</p>
                        </div>
                        <div className="border-l-2 border-amber-500/40 pl-4 py-2">
                          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-amber-400">
                            <AlertTriangle size={11} className="inline mr-1" /> Erro crítico
                          </span>
                          <p className="text-sm text-stone-400 mt-1">{p.erro}</p>
                        </div>
                      </div>

                      {PAGINAS_INDIVIDUAIS.has(p.slug) && (
                        <Link
                          to={`/soberania-organica/plantas-subutilizadas/${p.slug}`}
                          className="mt-6 inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-bold uppercase tracking-[0.2em] transition-colors group/cta"
                        >
                          Abrir ficha técnica completa
                          <ArrowUpRight size={14} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                        </Link>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ATO 03 — PROTOCOLO INTEGRADO 21 DIAS */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">Ato 03</span>
              <h2
                className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Protocolo Integrado de 21 Dias
              </h2>
              <p className="text-stone-400 text-lg mt-6 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Não é receita. É arquitetura de drenagem. Manhã abre o fluxo renal, tarde descongestiona o fígado, noite acalma a mucosa. Corpo trabalha em ciclos, o protocolo respeita isso.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  fase: 'Manhã',
                  hora: '06h às 10h',
                  cor: 'from-cyan-500/10 to-cyan-900/0 border-cyan-500/30',
                  acento: 'text-cyan-300',
                  plantas: ['Quebra-Pedra', 'Chá com 1 colher de coentro fresco'],
                  objetivo: 'Abrir vias urinárias. Ativar eliminação de cristais e mobilização leve de metais.',
                  altura: 'md:min-h-[420px]',
                },
                {
                  fase: 'Tarde',
                  hora: '13h às 17h',
                  cor: 'from-amber-500/10 to-amber-900/0 border-amber-500/30',
                  acento: 'text-amber-300',
                  plantas: ['Jurubeba (antes do almoço)', 'Pariparoba (alternar a cada 3 dias)'],
                  objetivo: 'Descongestionar fígado e ativar drenagem linfática. Ponto crítico de quem come pesado no almoço.',
                  altura: 'md:min-h-[460px]',
                },
                {
                  fase: 'Noite',
                  hora: '19h às 22h',
                  cor: 'from-violet-500/10 to-violet-900/0 border-violet-500/30',
                  acento: 'text-violet-300',
                  plantas: ['Tanchagem ou Espinheira-Santa'],
                  objetivo: 'Calmar mucosas digestiva e respiratória antes do sono. Reparar sem estimular.',
                  altura: 'md:min-h-[400px]',
                },
              ].map((bloco) => (
                <div
                  key={bloco.fase}
                  className={`${bloco.altura} rounded-2xl border bg-gradient-to-br ${bloco.cor} p-8 hover:-translate-y-1 transition-all duration-500`}
                >
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-500">{bloco.hora}</span>
                  <h3
                    className={`text-4xl font-bold mt-2 ${bloco.acento}`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {bloco.fase}
                  </h3>
                  <ul className="mt-6 space-y-2">
                    {bloco.plantas.map((pl) => (
                      <li key={pl} className="flex items-start gap-2 text-stone-300 text-sm">
                        <Leaf size={14} className={`mt-1 shrink-0 ${bloco.acento}`} />
                        <span>{pl}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-stone-400 text-sm mt-6 leading-relaxed border-t border-white/10 pt-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {bloco.objetivo}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <span className="inline-block text-stone-500 text-sm uppercase tracking-[0.3em] font-bold">
                Duração: <span className="text-emerald-400">21 dias</span> · Pausa obrigatória: <span className="text-emerald-400">10 a 14 dias</span>
              </span>
            </div>
          </div>
        </section>

        {/* ATO 04 — ERROS QUE DESTROEM */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400/70">Ato 04</span>
              <h2
                className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Os 5 erros que destroem o resultado.
              </h2>
              <p className="text-stone-400 text-lg mt-6 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                A diferença entre quem se cura com planta e quem se intoxica está nestes cinco pontos. Estude antes de ferver a primeira xícara.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-4">
              {[
                { titulo: 'Misturar muitas ervas sem lógica', detalhe: 'Cada princípio ativo compete pela mesma via hepática de metabolização. Mais plantas juntas significa menos efeito de cada uma e maior risco de interação.' },
                { titulo: 'Doses aleatórias copiadas da internet', detalhe: 'Receita de tia no WhatsApp não é farmacopeia. Use sempre dose validada por fonte técnica (Anvisa, Memento Fitoterápico, livros de fitoterapia clínica).' },
                { titulo: 'Ignorar sinais do corpo', detalhe: 'Boca amarga, dor de cabeça, urina muito escura, fezes mudadas: são respostas. Pausar não é fracasso, é leitura correta.' },
                { titulo: 'Comprar erva de origem suspeita', detalhe: 'Mercado popular sem rastreabilidade vende mato seco velho, com fungo, mal identificado ou misturado com outra espécie. Origem importa mais que dose.' },
                { titulo: 'Usar continuamente sem pausa', detalhe: 'Fitoterapia é cíclica. Uso contínuo gera tolerância, esgota receptores e em alguns casos sobrecarrega o órgão que se quer proteger. Janela e pausa são tão importantes quanto a planta.' },
              ].map((erro, i) => (
                <div key={erro.titulo} className="border border-white/8 bg-white/[0.02] rounded-2xl p-6 md:p-8 hover:border-red-500/30 hover:-translate-y-0.5 transition-all duration-500 group">
                  <div className="flex items-start gap-5">
                    <span className="text-5xl font-bold text-red-500/30 group-hover:text-red-500/60 transition-colors leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{erro.titulo}</h4>
                      <p className="text-stone-400 mt-2 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{erro.detalhe}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ATO 05 — O QUE REALMENTE IMPORTA */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">Ato 05</span>
            <h2
              className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              O que importa, sem ideologia.
            </h2>
            <div className="mt-12 grid md:grid-cols-2 gap-6 text-left">
              {[
                'Fitoterapia funciona, e tem evidência científica para isso.',
                'Não é mágica. Mecanismo, dose, janela.',
                'Nem tudo natural é seguro. Aristolochia que o diga.',
                'Dose define efeito. Mesma planta cura ou mata.',
                'Consistência cíclica vence intensidade contínua.',
                'Origem rastreável vale mais que tradição romantizada.',
              ].map((linha) => (
                <div key={linha} className="flex items-start gap-4 border-l-2 border-emerald-500/30 pl-5 py-2">
                  <p className="text-stone-300 text-lg leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {linha}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <BookOpen size={32} className="text-emerald-400 mx-auto mb-4" />
              <h2
                className="text-4xl md:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Perguntas que separam amador de operador.
              </h2>
            </div>
            <div className="space-y-4">
              {FAQ_ITEMS.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-white/8 bg-white/[0.02] rounded-2xl p-6 md:p-8 hover:border-emerald-500/30 transition-all duration-500"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <h3 className="text-lg md:text-xl font-bold text-white pr-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                      {faq.question}
                    </h3>
                    <ChevronDown size={20} className="text-emerald-400 shrink-0 mt-1 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="text-stone-400 mt-5 leading-relaxed text-base" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* AVISO LEGAL */}
        <section className="px-6 md:px-12 lg:px-16 py-12">
          <div className="max-w-5xl mx-auto bg-stone-900/50 border border-stone-700/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-300 mb-1">Aviso Legal e Educacional</p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Este conteúdo tem caráter educativo e informativo. Não substitui consulta médica, prescrição farmacêutica ou acompanhamento por fitoterapeuta qualificado. Plantas medicinais têm interação com fármacos, contraindicações específicas e janelas terapêuticas próprias. Consulte sempre um profissional de saúde antes de iniciar qualquer protocolo, principalmente em gestação, lactação, infância, terceira idade ou em quem usa medicação contínua.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MICRO CTA */}
        <div className="px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <MicroCtaResistencia variant="saude" />
          </div>
        </div>

        {/* NAV FOOTER */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-20">
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5">
            <Link
              to="/soberania-organica/fitoterapia-aplicada"
              className="flex-1 flex items-center justify-center gap-2 bg-white/3 border border-white/8 rounded-xl px-6 py-4 text-stone-400 text-sm font-bold hover:bg-white/5 hover:text-emerald-400 transition-all duration-500"
            >
              <ArrowLeft size={16} />
              Fitoterapia Aplicada
            </Link>
            <Link
              to="/soberania-organica/conhecimento-perdido/quelantes-orientacao-segura"
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-6 py-4 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 transition-all duration-500 group"
            >
              Protocolo Quelantes Brasileiros
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
