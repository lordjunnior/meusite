import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Shield, FlaskConical, Eye, FileWarning, Heart, Quote, Microscope, Ban, Sparkles, BookOpen, Zap, AlertTriangle, ChevronRight, Dna, Beaker, Droplets, Brain, Star, Users, ExternalLink } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';
import PageFloatingToc from '@/components/PageFloatingToc';
import babosaHero from '@/assets/babosa-hero.webp';
import RealTestimonial from '@/components/RealTestimonial';

import avatarRenata from '@/assets/avatar-babosa-renata.webp';
import avatarCarlos from '@/assets/avatar-babosa-carlos.webp';
import avatarAmanda from '@/assets/avatar-babosa-amanda.webp';
import avatarElza from '@/assets/avatar-babosa-elza.webp';
import avatarIgor from '@/assets/avatar-babosa-igor.webp';
import avatarTatiane from '@/assets/avatar-babosa-tatiane.webp';
import avatarBruno from '@/assets/avatar-babosa-bruno.webp';
import avatarMaranaldo from '@/assets/avatar-babosa-maranaldo.webp';
import avatarLuna from '@/assets/avatar-babosa-luna.webp';
import avatarMaria from '@/assets/avatar-babosa-maria.webp';
import avatarCris from '@/assets/avatar-babosa-cris.webp';
import avatarSelma from '@/assets/avatar-babosa-selma.webp';
import avatarAmandaD from '@/assets/avatar-babosa-amandad.webp';
import avatarReginaldo from '@/assets/avatar-babosa-reginaldo.webp';
import avatarLuca from '@/assets/avatar-babosa-luca.webp';
import avatarGabriel from '@/assets/avatar-babosa-gabriel.webp';
import avatarKelly from '@/assets/avatar-babosa-kelly.webp';
import avatarRodrigo from '@/assets/avatar-babosa-rodrigo.webp';
import avatarCecilia from '@/assets/avatar-babosa-cecilia.webp';
import avatarDiegoF from '@/assets/avatar-babosa-diegof.webp';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

const TOC_ITEMS = [
  { id: 'descoberta', label: 'A Descoberta', num: '01' },
  { id: 'acemannan', label: 'Acemannan', num: '02' },
  { id: 'supressao', label: 'A Supressão', num: '03' },
  { id: 'ciencia', label: 'A Ciência', num: '04' },
  { id: 'relatos', label: 'Relatos Reais', num: '05' },
  { id: 'composicao', label: 'Composição', num: '06' },
  { id: 'faq', label: 'FAQ', num: '07' },
  { id: 'conclusao', label: 'Conclusão', num: '08' },
];

const AVATAR_MAP: Record<string, string> = {
  'Renata Oliveira': avatarRenata,
  'Carlos Mendes': avatarCarlos,
  'Amanda Souza': avatarAmanda,
  'Dona Elza Machado': avatarElza,
  'Igor Loubet': avatarIgor,
  'Tatiane Guimarães': avatarTatiane,
  'Bruno Maranhão': avatarBruno,
  'Seu Maranaldo': avatarMaranaldo,
  'Luna Santos': avatarLuna,
  'Maria Eugênia': avatarMaria,
  'Cris Botelho': avatarCris,
  'Selma Balbo': avatarSelma,
  'Amanda Dias': avatarAmandaD,
  'Reginaldo Rodrigues': avatarReginaldo,
  'Luca Rocha': avatarLuca,
  'Gabriel Santiago': avatarGabriel,
  'Kelly Aguiar': avatarKelly,
  'Rodrigo Becker': avatarRodrigo,
  'Cecília Xavier': avatarCecilia,
  'Diego Ferreira': avatarDiegoF,
};

/* ═══════════════════════════════════════════════════════════════
   DEPOIMENTOS — Todos os relatos reais fornecidos
   ═══════════════════════════════════════════════════════════════ */

interface Depoimento {
  nome: string;
  local: string;
  texto: string;
  destaque: string;
}

const DEPOIMENTOS: Depoimento[] = [
  {
    nome: 'Renata Oliveira',
    local: 'São Paulo, SP',
    texto: 'O médico já tinha condenado o tornozelo do meu marido. Disse que iria necrosar e possivelmente precisar de amputação. Em uma semana cuidando com gel de babosa fresca, os tecidos mortos regeneraram completamente. Não ficou nem cicatriz aparente.',
    destaque: 'Regeneração de tecido necrosado',
  },
  {
    nome: 'Carlos Mendes',
    local: 'Belo Horizonte, MG',
    texto: 'Descobri o barbatimão e a aroeira por necessidade. Tinha uma cicatriz branca que me incomodava há anos. Comecei a fazer o chá, beber diariamente e aplicar na pele. A coloração natural começou a voltar. O corpo se cura quando recebe as ferramentas certas.',
    destaque: 'Recuperação de pigmentação',
  },
  {
    nome: 'Amanda Souza',
    local: 'Rio de Janeiro, RJ',
    texto: 'Minha bisavó teve câncer há mais de 30 anos e consumia babosa todos os dias. Ficou curada. Infelizmente ela já se foi, mas deixou uma plantação enorme no terreno da família. Aquilo era o tesouro dela.',
    destaque: 'Tradição familiar de cura',
  },
  {
    nome: 'Dona Elza Machado',
    local: 'Fortaleza, CE',
    texto: 'Tive queimadura de segundo grau na mão. Fui ao posto de saúde e me deram uma pomada de aloe vera produzida pela farmácia pública. O resultado foi excelente. A própria medicina pública reconhece o potencial, só não divulga.',
    destaque: 'Pomada do SUS com aloe vera',
  },
  {
    nome: 'Igor Loubet',
    local: 'Curitiba, PR',
    texto: 'O Dr. Terry Pulse, médico no Texas, liderou estudos com acemannan em pacientes com AIDS. Os resultados foram impressionantes: melhora nos marcadores CD4, ganho de peso e redução da fadiga. Quando os coquetéis chegaram em 95, cortaram o financiamento. Hoje o legado vive na medicina veterinária, tratando leucemia felina com sucesso.',
    destaque: 'Pesquisa suprimida Dr. Terry Pulse',
  },
  {
    nome: 'Tatiane Guimarães',
    local: 'Manaus, AM',
    texto: 'Curei sarna negra de uma cachorrinha de rua que a veterinária falou que não tinha cura. Ela disse para me preparar. Não aceitei. Tratei com babosa pura por semanas. A cadela se recuperou por completo e até hoje está saudável.',
    destaque: 'Doença "incurável" tratada',
  },
  {
    nome: 'Bruno Maranhão',
    local: 'Recife, PE',
    texto: 'Quando a COVID começou, antes de qualquer teste ou vacina, eu já sabia que a babosa tinha propriedades anti-inflamatórias potentes. Comecei a fazer sucos com o gel. Foi com ela que a minha família saiu dos sintomas de perda de olfato e paladar.',
    destaque: 'Recuperação olfato e paladar',
  },
  {
    nome: 'Seu Maranaldo',
    local: 'Goiânia, GO',
    texto: 'A babosa é um alimento funcional fortalecedor do sistema imunológico. Contém 20 minerais, 18 aminoácidos e 12 vitaminas, incluindo B12. O organismo desintoxicado e bem nutrido combate e elimina qualquer mal. Faça do seu alimento o seu remédio, como dizia Hipócrates.',
    destaque: '20 minerais, 18 aminoácidos, 12 vitaminas',
  },
  {
    nome: 'Luna Santos',
    local: 'Campinas, SP',
    texto: 'Tinha uma empresa chamada Forever, tudo deles era à base de aloe vera pura. Tinha um bastão ideal para lábios, arranhões, picadas de mosquito. Era impressionante como um único produto resolvia tantas coisas diferentes.',
    destaque: 'Produto multiuso da natureza',
  },
  {
    nome: 'Maria Eugênia',
    local: 'Aparecida, SP',
    texto: 'Uma vez estava no Santuário de São Miguel Arcanjo, fazia muito frio. Comprei uma sopa fervendo e quando a vendedora me entregou, virou na minha mão, escorreu para dentro da jaqueta e queimou o braço. Peguei uma folha de babosa que estava em um vaso na porta, passei no braço e no dia seguinte a pele estava intacta.',
    destaque: 'Queimadura curada em 24h',
  },
  {
    nome: 'Cris Botelho',
    local: 'Salvador, BA',
    texto: 'Melhor remédio para hemorroida que existe. Sem dúvida nenhuma. A polpa cortada em pedacinhos, congelada, e quando vem a crise, aplicar. É extraordinário.',
    destaque: 'Tratamento natural eficaz',
  },
  {
    nome: 'Selma Balbo',
    local: 'Porto Alegre, RS',
    texto: 'Em casa comemos babosa com sal e limão! Uma delícia! Depois de retirar totalmente a aloína ela não tem gosto de nada. Virou parte da rotina alimentar da família.',
    destaque: 'Alimento funcional diário',
  },
  {
    nome: 'Amanda Dias',
    local: 'Brasília, DF',
    texto: 'A cura vem da natureza, fomos feitos para consumir o que vem da terra, e cada vez mais a indústria farmacêutica e alimentícia vem tirando isso de nós. É proposital.',
    destaque: 'Consciência sobre supressão',
  },
  {
    nome: 'Reginaldo Rodrigues',
    local: 'Belém, PA',
    texto: 'Minha vó curou um buraco na minha perna que precisaria de pontos com babosa! Cicatrizou normal e hoje eu tenho a cicatriz no buraco onde um cachorro mordeu. Nenhum hospital faria melhor.',
    destaque: 'Cicatrização sem pontos',
  },
  {
    nome: 'Luca Rocha',
    local: 'Florianópolis, SC',
    texto: 'Minha biza fazia garrafada de babosa. Curava tudo, segundo ela. Até hoje lembro do cheiro. Aquela mulher viveu quase 100 anos sem nunca pisar num hospital.',
    destaque: 'Garrafada ancestral',
  },
  {
    nome: 'Gabriel Santiago',
    local: 'Cuiabá, MT',
    texto: 'De vez em quando eu como o gel da babosa, é bom pra gastrite e estômago. Funciona como um protetor de mucosa natural que nenhum remédio industrializado consegue replicar.',
    destaque: 'Protetor gástrico natural',
  },
  {
    nome: 'Kelly Aguiar',
    local: 'Vitória, ES',
    texto: 'Cuido da minha plantação de babosa como se fosse uma mina de ouro. Porque é exatamente isso que ela é. Quem entende, entende.',
    destaque: 'Mina de ouro verde',
  },
  {
    nome: 'Rodrigo Becker',
    local: 'Joinville, SC',
    texto: 'Santo detox de babosa, amo! Faço todo mês, é como um reset para o corpo inteiro. Energia, pele, digestão — tudo melhora quando faço o ciclo.',
    destaque: 'Detox mensal com babosa',
  },
  {
    nome: 'Cecília Xavier',
    local: 'Natal, RN',
    texto: 'Babosa e aloe vera são a mesma coisa. O gel transparente interno contém o acemannan e as propriedades imunomoduladoras. A parte amarela da folha, a aloína, pode causar irritação, por isso usar apenas o gel interno.',
    destaque: 'Conhecimento técnico aplicado',
  },
  {
    nome: 'Diego Ferreira',
    local: 'São Luís, MA',
    texto: 'Leiam sobre o Relatório Flexner e vão saber quem mudou a medicina para o que se tornou hoje. Só remédios à base de petróleo. Rockefeller acabou com tudo que era natural e lucrativo para o povo.',
    destaque: 'Relatório Flexner, 1910',
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPOSIÇÃO TÉCNICA DA BABOSA
   ═══════════════════════════════════════════════════════════════ */

const COMPOSICAO = [
  { categoria: 'Vitaminas', icon: Sparkles, itens: 'A (betacaroteno), B1, B2, B3, B6, B12, C, E, Ácido Fólico', cor: 'text-amber-400 border-amber-500/20 bg-amber-500/[0.04]' },
  { categoria: 'Minerais', icon: Dna, itens: 'Cálcio, Magnésio, Zinco, Cromo, Selênio, Sódio, Ferro, Potássio, Cobre, Manganês', cor: 'text-sky-400 border-sky-500/20 bg-sky-500/[0.04]' },
  { categoria: 'Aminoácidos', icon: Beaker, itens: '7 dos 8 essenciais que o corpo não produz e precisa adquirir pela alimentação', cor: 'text-violet-400 border-violet-500/20 bg-violet-500/[0.04]' },
  { categoria: 'Enzimas', icon: FlaskConical, itens: 'Amilase, Lipase, Fosfatase Alcalina, Bradicinase, Celulase, Carboxipeptidase', cor: 'text-rose-400 border-rose-500/20 bg-rose-500/[0.04]' },
  { categoria: 'Polissacarídeos', icon: Shield, itens: 'Acemannan (β-1,4-acetilado manano), Glucomanano, Arabinose, Galactose', cor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.04]' },
  { categoria: 'Antraquinonas', icon: AlertTriangle, itens: 'Aloína (laxativa, uso cauteloso), Barbaloína, Emodina, Ácido Aloético', cor: 'text-orange-400 border-orange-500/20 bg-orange-500/[0.04]' },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA JSON-LD
   ═══════════════════════════════════════════════════════════════ */

const schemaArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Babosa e Acemannan: A Molécula Imunomoduladora que a Indústria Farmacêutica Silenciou",
  "description": "Investigação completa sobre o acemannan da Aloe Vera: a molécula que recebeu status de medicamento órfão pela FDA em 1995 e depois desapareceu da pesquisa pública.",
  "author": { "@type": "Person", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "url": "https://lordjunnior.com.br/soberania-organica/babosa-acemannan",
  "datePublished": "2026-03-22",
  "dateModified": "2026-03-22",
  "mainEntityOfPage": "https://lordjunnior.com.br/soberania-organica/babosa-acemannan",
  "image": "https://lordjunnior.com.br/assets/babosa-hero.jpg",
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é acemannan e por que ele foi silenciado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Acemannan é um polissacarídeo acetilado (β-1,4-manano) presente no gel interno da Aloe vera (babosa). Em 1995, recebeu status de 'medicamento órfão' pela FDA dos EUA por seu papel na recuperação imunológica de pacientes com HIV. A pesquisa foi descontinuada após a chegada dos coquetéis antirretrovirais e as patentes de extração foram colocadas sob controle corporativo."
      }
    },
    {
      "@type": "Question",
      "name": "Babosa e aloe vera são a mesma planta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Babosa é o nome popular no Brasil para a Aloe barbadensis Miller, conhecida internacionalmente como Aloe vera. O gel transparente interno contém o acemannan e as propriedades imunomoduladoras documentadas em estudos clínicos."
      }
    },
    {
      "@type": "Question",
      "name": "Quais são as propriedades comprovadas da babosa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O gel de babosa contém 20 minerais, 18 aminoácidos, 12 vitaminas (incluindo B12), enzimas digestivas e polissacarídeos imunomoduladores. Estudos documentam ação cicatrizante, anti-inflamatória, imunoestimulante e protetora de mucosas."
      }
    },
    {
      "@type": "Question",
      "name": "Como consumir babosa com segurança?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Utilize exclusivamente o gel transparente interno da folha, removendo completamente a casca e a camada amarela (aloína). A aloína tem efeito laxativo intenso. Gestantes, lactantes e pessoas com doenças intestinais inflamatórias devem evitar o consumo oral."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o Relatório Flexner?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Publicado em 1910 e financiado pela Fundação Carnegie e família Rockefeller, o Relatório Flexner reestruturou a educação médica nos EUA, eliminando escolas que ensinavam fitoterapia e medicina natural, direcionando a formação exclusivamente para fármacos sintéticos derivados de petróleo."
      }
    },
  ],
};

const schemaSiteNav = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": "Babosa e Acemannan",
  "url": "https://lordjunnior.com.br/soberania-organica/babosa-acemannan",
  "hasPart": [
    { "@type": "WebPage", "name": "Fitoterapia Aplicada", "url": "https://lordjunnior.com.br/soberania-organica/fitoterapia-aplicada" },
    { "@type": "WebPage", "name": "Autonomia Biológica", "url": "https://lordjunnior.com.br/soberania-organica/autonomia-biologica" },
    { "@type": "WebPage", "name": "Sabedoria Ancestral", "url": "https://lordjunnior.com.br/soberania-organica/sabedoria-ancestral" },
    { "@type": "WebPage", "name": "Soberania Orgânica", "url": "https://lordjunnior.com.br/soberania-organica" },
  ],
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://lordjunnior.com.br" },
    { "@type": "ListItem", "position": 2, "name": "Soberania Orgânica", "item": "https://lordjunnior.com.br/soberania-organica" },
    { "@type": "ListItem", "position": 3, "name": "Autonomia Biológica", "item": "https://lordjunnior.com.br/soberania-organica/autonomia-biologica" },
    { "@type": "ListItem", "position": 4, "name": "Babosa e Acemannan", "item": "https://lordjunnior.com.br/soberania-organica/babosa-acemannan" },
  ],
};

const schemaMedical = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Babosa e Acemannan: Investigação sobre a Molécula Imunomoduladora",
  "about": {
    "@type": "MedicalCondition",
    "name": "Imunodeficiência",
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Sistema Imunológico" }
  },
  "lastReviewed": "2026-03-22",
  "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
  "specialty": { "@type": "MedicalSpecialty", "name": "Fitoterapia" },
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════════ */

export default function BabosaAcemannan() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Babosa e Acemannan: A Molécula que a Indústria Farmacêutica Silenciou | Lord Junnior</title>
        <meta name="description" content="O acemannan da babosa recebeu status de medicamento órfão pela FDA em 1995 por imunomodulação em pacientes com HIV. A pesquisa desapareceu. A planta continua viva no seu quintal." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/babosa-acemannan" />
        <meta property="og:title" content="Babosa e Acemannan: A Molécula Imunomoduladora Silenciada" />
        <meta property="og:description" content="Em 1995 a FDA reconheceu o acemannan como medicamento órfão. Depois, o silêncio. Investigação completa com relatos reais e ciência documentada." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/babosa-acemannan" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFaq)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaSiteNav)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaMedical)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="emerald" />

      <article className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/30"
        style={{ background: 'linear-gradient(180deg, #050808 0%, #060806 6%, #0a0f0a 15%, #0d150d 30%, #0a0f0a 60%, #060806 85%, #050808 100%)' }}>

        {/* ─── HERO ─── */}
        <CinematicHero
          image={babosaHero}
          phase="INVESTIGAÇÃO DOCUMENTAL"
          title="Babosa & Acemannan"
          subtitle="A molécula imunomoduladora que recebeu status de medicamento órfão pela FDA em 1995 e depois desapareceu da pesquisa pública. Sob a casca verde existe um composto que a indústria prefere que você ignore."
          icon={Leaf}
          accentColor="emerald"
          backLink="/soberania-organica/autonomia-biologica"
          backLabel="Autonomia Biológica"
        />

        {/* ─── AMBIENT ─── */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[15%] right-[5%] w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)' }} />
        </div>

        {/* ─── NAV ─── */}
        <nav className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pt-8" aria-label="Breadcrumb">
          <Link to="/soberania-organica/autonomia-biologica" className="inline-flex items-center gap-2 text-emerald-500/80 hover:text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
            <ArrowLeft size={14} /> Autonomia Biológica
          </Link>
        </nav>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 1 — A DESCOBERTA
           ═══════════════════════════════════════════════════════════════ */}
        <section id="descoberta" className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pt-16 pb-12">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
            <motion.div {...fade(0)}>
              <span className="text-emerald-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">CAPÍTULO 01</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-stone-100 mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                A Descoberta que Deveria Ter Mudado a Medicina
              </h2>

              <div className="space-y-5 text-stone-400 leading-relaxed text-[15px] lg:text-base">
                <p>
                  Entre o final dos anos 1980 e o início da década de 90, pesquisadores isolaram algo extraordinário dentro do gel da <strong className="text-emerald-400">Aloe barbadensis Miller</strong>, a babosa comum que cresce em qualquer quintal brasileiro: um polissacarídeo acetilado chamado <strong className="text-stone-200">acemannan</strong>.
                </p>
                <p>
                  Não era apenas mais um composto fitoterápico para acalmar queimaduras de sol ou acelerar cicatrização superficial. O acemannan demonstrava em laboratório uma capacidade até então rara entre compostos naturais: <strong className="text-stone-200">comunicação direta com o sistema imunológico</strong>. Em testes controlados e ambientes hospitalares, médicos observaram que os compostos da babosa ativavam macrófagos e linfócitos T de forma precisa, sem provocar a cascata inflamatória excessiva que caracteriza a maioria dos imunoestimulantes sintéticos.
                </p>
                <p>
                  O mecanismo era elegante. Os glóbulos brancos não eram simplesmente "estimulados" como por um café metabólico. Eles eram <strong className="text-stone-200">recalibrados</strong>. A resposta imunológica se tornava mais eficiente sem superestimulação, como um sistema operacional recebendo uma atualização de firmware que corrige vulnerabilidades sem aumentar o consumo de energia.
                </p>
              </div>
            </motion.div>

            {/* Sidebar stats */}
            <motion.aside {...fade(0.2)} className="space-y-4 lg:sticky lg:top-24">
              {[
                { num: '1995', label: 'FDA concedeu status de medicamento órfão', icon: Shield },
                { num: '130+', label: 'Patentes de extração registradas', icon: FileWarning },
                { num: '75+', label: 'Substâncias ativas catalogadas', icon: Microscope },
                { num: '20', label: 'Minerais identificados no gel', icon: Dna },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-4 hover:border-emerald-500/25 transition-colors duration-500">
                  <s.icon size={18} className="text-emerald-500/60 shrink-0" />
                  <div>
                    <span className="text-emerald-400 font-black text-xl block leading-none">{s.num}</span>
                    <span className="text-stone-500 text-xs">{s.label}</span>
                  </div>
                </div>
              ))}
            </motion.aside>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 2 — ACEMANNAN: A MOLÉCULA
           ═══════════════════════════════════════════════════════════════ */}
        <section id="acemannan" className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16">
          <motion.div {...fade(0)} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 md:p-10 lg:p-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Microscope size={22} className="text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-stone-100" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                Acemannan: O Composto Que Calou a Indústria
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-5 text-stone-400 leading-relaxed text-[15px] lg:text-base">
                <p>
                  Um médico do Texas chamado <strong className="text-stone-200">Dr. Terry Pulse</strong> foi um dos primeiros a levar o acemannan do laboratório para a clínica. Trabalhando com pacientes portadores de HIV numa época em que o único tratamento disponível era o AZT, altamente tóxico, ele administrou extrato purificado de Aloe vera e documentou resultados que deveriam ter sido manchete em todos os jornais médicos do planeta.
                </p>
                <p>
                  Os pacientes ganharam peso. A fadiga reduziu drasticamente. E os marcadores imunológicos, especificamente a contagem de <strong className="text-emerald-400">células CD4</strong>, subiram. A hipótese do Dr. Pulse era que o acemannan forçava o vírus a produzir uma cápsula proteica defeituosa, impedindo-o de infectar novas células e permitindo a redução das doses tóxicas do AZT.
                </p>
                <p>
                  O Dr. Pulse faleceu prematuramente em 1991. Com a chegada dos potentes coquetéis antirretrovirais em 1995, toda a linha de pesquisa com compostos naturais perdeu financiamento institucional. Não porque os resultados foram refutados. <strong className="text-stone-200">Porque o modelo de negócio mudou.</strong>
                </p>
              </div>

              <div className="space-y-4">
                {/* Destaque FDA */}
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-amber-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-stone-200 font-bold text-base mb-2">Status de Medicamento Órfão — FDA, 1995</p>
                      <p className="text-stone-400 text-sm leading-relaxed">
                        A Food and Drug Administration dos Estados Unidos concedeu ao acemannan o status de <strong className="text-amber-400">"orphan drug"</strong> pelo seu papel documentado no suporte à recuperação imunológica em pacientes com HIV. Um reconhecimento oficial que deveria ter detonado uma revolução na medicina integrativa, mas foi sepultado sob camadas de interesses corporativos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Veterinária */}
                <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-6">
                  <div className="flex items-start gap-3">
                    <Heart size={20} className="text-emerald-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-stone-200 font-bold text-sm mb-2">O Legado Veterinário</p>
                      <p className="text-stone-500 text-sm leading-relaxed">
                        A molécula hoje é usada com sucesso para tratar o <strong className="text-stone-300">vírus da leucemia felina (FeLV)</strong>, um retrovírus muito similar ao HIV. Na medicina animal, onde o lobby farmacêutico é menor, o acemannan continua salvando vidas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 3 — A SUPRESSÃO
           ═══════════════════════════════════════════════════════════════ */}
        <section id="supressao" className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16">
          <motion.div {...fade(0)}>
            <span className="text-red-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">CAPÍTULO 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-stone-100 mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              O Silêncio Conveniente
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-10">
            <motion.div {...fade(0.1)} className="space-y-5 text-stone-400 leading-relaxed text-[15px] lg:text-base">
              <p>
                O que começou como uma descoberta promissora para o sistema imunológico humano se transformou, de forma conveniente, em silêncio. O financiamento secou. Os interesses farmacêuticos redirecionaram bilhões para moléculas sintéticas patenteáveis. E as patentes para extração e estabilização do acemannan foram <strong className="text-stone-200">silenciosamente transferidas para controle corporativo</strong>.
              </p>
              <p>
                Hoje existem aproximadamente <strong className="text-emerald-400">130 patentes</strong> relacionadas à extração e estabilização adequadas do acemannan. A mais recente delas detém as frações com maior atividade imunomoduladora documentada no planeta. Isso significa compatibilidade máxima para o corpo humano reconhecer e utilizar o composto imediatamente após o consumo.
              </p>
              <p>
                Imagine a disrupção que causaria se milhões de pessoas compreendessem o potencial real do sistema imunológico quando ele opera com as ferramentas bioquímicas corretas. Imagine o que aconteceria com laboratórios que faturam bilhões vendendo supressores sintéticos se as pessoas soubessem que uma planta no quintal pode recalibrar as mesmas defesas que eles medicam.
              </p>
            </motion.div>

            {/* Trio da Blindagem: 3 pilares de supressão */}
            <div className="space-y-4">
              {[
                { icon: Ban, title: 'Financiamento Cortado', desc: 'Linhas de pesquisa promissoras foram abandonadas após a chegada dos coquetéis sintéticos patenteáveis. Não porque falharam — porque ameaçavam o modelo de negócio.', color: 'border-red-500/20 bg-red-500/[0.04]', iconColor: 'text-red-400' },
                { icon: FileWarning, title: 'Patentes Corporativas', desc: '130 patentes de extração transferidas para controle privado. A molécula existe, mas o acesso é controlado por quem não quer que você a use livremente.', color: 'border-amber-500/20 bg-amber-500/[0.04]', iconColor: 'text-amber-400' },
                { icon: Eye, title: 'Narrativa Reduzida', desc: 'A babosa foi rebaixada a "planta para pele" nos canais oficiais. Toda a documentação sobre imunomodulação desapareceu do discurso público e da formação médica.', color: 'border-orange-500/20 bg-orange-500/[0.04]', iconColor: 'text-orange-400' },
              ].map((p, i) => (
                <motion.div key={p.title} {...fade(0.1 + i * 0.05)} className={`rounded-xl border ${p.color} p-6`}>
                  <div className="flex items-start gap-4">
                    <p.icon size={22} className={`${p.iconColor} mt-1 shrink-0`} />
                    <div>
                      <h3 className="text-stone-200 font-bold text-base mb-2">{p.title}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Referência histórica: Relatório Flexner */}
          <motion.div {...fade(0.2)} className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/50 p-6 md:p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <BookOpen size={22} className="text-stone-500 mt-1 shrink-0" />
              <div>
                <p className="text-stone-300 font-bold text-lg mb-3">Relatório Flexner, 1910</p>
                <p className="text-stone-500 text-[15px] leading-relaxed">
                  Para entender por que a medicina moderna marginaliza compostos naturais, é necessário conhecer o Relatório Flexner. Financiado pela Fundação Carnegie e pela família Rockefeller, esse documento reestruturou toda a educação médica nos Estados Unidos, eliminando escolas que ensinavam fitoterapia, homeopatia e medicina natural, e direcionando a formação exclusivamente para fármacos derivados de petróleo. O resultado é o sistema que temos hoje: uma medicina que trata sintomas com moléculas sintéticas e ignora sistematicamente o que cresce na terra.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <MicroCtaResistencia />

        {/* ═══ SECTION DIVIDER: Cinematic Image ═══ */}
        <div className="relative z-10 h-48 md:h-72 overflow-hidden">
          <img src="/heroes/babosa-section-bg.webp" alt="Gel cristalino da babosa"
            className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.2) saturate(0.6)' }} loading="eager" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,1) 0%, transparent 30%, transparent 70%, rgba(5,8,8,1) 100%)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.p {...fade(0)} className="text-stone-600 text-xs md:text-sm font-bold uppercase tracking-[0.5em] text-center max-w-xl px-6">
              75 substâncias ativas. Zero patentes acessíveis ao público.
            </motion.p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 4 — A CIÊNCIA POR TRÁS
           ═══════════════════════════════════════════════════════════════ */}
        <section id="ciencia" className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16">
          <motion.div {...fade(0)} className="mb-10">
            <span className="text-emerald-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">CAPÍTULO 03</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-stone-100 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              O Que a Ciência Documenta (e o Mainstream Ignora)
            </h2>
            <p className="text-stone-400 text-[15px] lg:text-base max-w-3xl">
              A babosa não é apenas "boa para a pele". Essa redução narrativa é a forma mais eficiente de neutralizar o potencial de um composto que ameaça modelos de negócio bilionários. Sob a camada verde existe um complexo bioquímico que inclui mais de <strong className="text-stone-200">75 substâncias ativas</strong> catalogadas pela comunidade científica internacional.
            </p>
          </motion.div>

          <motion.div {...fade(0.1)} className="mb-8">
            <p className="text-stone-400 text-[15px] lg:text-base max-w-4xl">
              Nos Estados Unidos existe um <strong className="text-emerald-400">Conselho Internacional da Ciência da Aloe Vera (IASC)</strong> onde pesquisadores estudam continuamente os benefícios da planta para a saúde humana. No Brasil e no mundo, universidades e instituições de renome internacional mantêm linhas ativas de pesquisa sobre Aloe vera, mas os resultados raramente chegam aos noticiários que você consome.
            </p>
          </motion.div>

          {/* Grid de mecanismos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: 'Imunomodulação', desc: 'Acemannan ativa macrófagos e linfócitos T sem causar superestimulação. O sistema imunológico é recalibrado, não forçado.', color: 'border-emerald-500/15 bg-emerald-500/[0.04]', iconColor: 'text-emerald-400' },
              { icon: Heart, title: 'Cicatrização Avançada', desc: 'Estimula a proliferação de fibroblastos e a produção de colágeno. Regenera tecidos danificados em velocidade documentada.', color: 'border-rose-500/15 bg-rose-500/[0.04]', iconColor: 'text-rose-400' },
              { icon: FlaskConical, title: 'Anti-inflamatório Natural', desc: 'Inibe a produção de prostaglandinas e reduz a cascata inflamatória sem os efeitos colaterais dos AINEs sintéticos.', color: 'border-amber-500/15 bg-amber-500/[0.04]', iconColor: 'text-amber-400' },
              { icon: Sparkles, title: 'Desintoxicação Celular', desc: 'O gel atua como quelante natural, auxiliando a remoção de toxinas acumuladas e protegendo a mucosa gastrointestinal.', color: 'border-sky-500/15 bg-sky-500/[0.04]', iconColor: 'text-sky-400' },
            ].map((m, i) => (
              <motion.div key={m.title} {...fade(0.1 + i * 0.05)} className={`rounded-xl border ${m.color} p-6 hover:scale-[1.02] transition-transform duration-500`}>
                <m.icon size={24} className={`${m.iconColor} mb-4`} />
                <h3 className="text-stone-200 font-bold text-base mb-3">{m.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 5 — RELATOS REAIS (20 DEPOIMENTOS)
           ═══════════════════════════════════════════════════════════════ */}
        <section id="relatos" className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16">
          <motion.div {...fade(0)} className="text-center mb-14">
            <span className="text-emerald-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">PROVA SOCIAL · {DEPOIMENTOS.length} RELATOS</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-stone-100 mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              Relatos de Quem Não Esperou Pela Aprovação da Indústria
            </h2>
            <p className="text-stone-500 text-[15px] max-w-3xl mx-auto">
              Enquanto as patentes são disputadas em escritórios corporativos, pessoas comuns ao redor do Brasil aplicam o conhecimento ancestral e documentam resultados que nenhum laboratório financia para publicar.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {DEPOIMENTOS.map((d, i) => (
              <RealTestimonial
                key={d.nome}
                testimonial={{
                  name: d.nome,
                  location: d.local,
                  platform: 'direct',
                  text: d.texto,
                  badge: d.destaque,
                  avatar: AVATAR_MAP[d.nome],
                }}
                index={i}
                accentColor="emerald"
              />
            ))}
          </div>

          {/* Disclaimer ético */}
          <motion.div {...fade(0.3)} className="mt-10 text-center">
            <p className="text-stone-700 text-[10px] tracking-wide uppercase">
              Relatos baseados em experiências compartilhadas publicamente em redes sociais. Este conteúdo é educacional e não substitui orientação médica profissional.
            </p>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 6 — COMPOSIÇÃO TÉCNICA
           ═══════════════════════════════════════════════════════════════ */}
        <section id="composicao" className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16">
          <motion.div {...fade(0)} className="mb-10">
            <span className="text-emerald-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">FICHA TÉCNICA</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-stone-100 mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              O Que Existe Dentro de Uma Folha de Babosa
            </h2>
            <p className="text-stone-400 text-[15px] lg:text-base max-w-3xl">
              O gel interno da <em>Aloe barbadensis Miller</em> contém um arsenal bioquímico que a indústria cosmética menciona superficialmente e a indústria farmacêutica prefere ignorar.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPOSICAO.map((c, i) => (
              <motion.div
                key={c.categoria}
                {...fade(i * 0.04)}
                className={`rounded-xl border ${c.cor} p-6 hover:scale-[1.02] transition-transform duration-500`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <c.icon size={20} className={c.cor.split(' ')[0].replace('border-', 'text-').replace('/20', '')} />
                  <h3 className="font-bold text-base uppercase tracking-wider text-stone-200">{c.categoria}</h3>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed">{c.itens}</p>
              </motion.div>
            ))}
          </div>

          {/* Alerta sobre Aloína */}
          <motion.div {...fade(0.2)} className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle size={22} className="text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-stone-200 font-bold text-base mb-2">⚠ Aloína: O Componente Que Exige Cuidado</p>
                <p className="text-stone-400 text-sm leading-relaxed">
                  A parte amarelada da folha (casca) contém aloína, que possui efeito laxativo intenso. Para uso oral, recomenda-se utilizar exclusivamente o gel transparente interno, removendo completamente a casca e a camada amarela. Gestantes, lactantes e pessoas com doenças intestinais inflamatórias devem evitar o consumo oral. O uso tópico do gel é seguro para todas as idades.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <MicroCtaResistencia />

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 7 — FAQ
           ═══════════════════════════════════════════════════════════════ */}
        <section id="faq" className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 lg:px-12 py-16">
          <motion.div {...fade(0)} className="mb-10">
            <span className="text-emerald-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">PERGUNTAS FREQUENTES</span>
            <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              O Que Você Precisa Saber Antes de Começar
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'Babosa e aloe vera são a mesma coisa?', a: 'Sim. Babosa é o nome popular no Brasil para a Aloe barbadensis Miller, conhecida internacionalmente como Aloe vera. O gel transparente interno é onde se concentra o acemannan e as propriedades imunomoduladoras.' },
              { q: 'Como consumir babosa com segurança?', a: 'Retire a casca verde e a camada amarela (aloína) completamente. Use apenas o gel transparente interno. Pode ser consumido puro em água, em sucos ou aplicado topicamente. Máximo 3 dias consecutivos de uso oral.' },
              { q: 'A babosa substitui tratamento médico?', a: 'Não. A babosa é um alimento funcional e fitoterápico complementar. Em casos de febre alta, dor intensa, sintomas persistentes ou condições graves, procure orientação médica profissional.' },
              { q: 'Qual a marca patenteada mais confiável?', a: 'Para uso doméstico, a melhor fonte é a planta fresca cultivada no seu próprio quintal. Para sucos industrializados, verifique se o produto possui selo do IASC (International Aloe Science Council) e se lista acemannan na composição.' },
              { q: 'Como saber se a minha babosa é comestível?', a: 'A espécie comestível é a Aloe barbadensis Miller (Aloe vera), com folhas grossas, suculentas e espinhos nas bordas. Evite espécies ornamentais de folhas finas. Na dúvida, consulte um botânico ou agrônomo local.' },
            ].map((faq, i) => (
              <motion.div key={i} {...fade(i * 0.04)} className="rounded-xl border border-stone-800 bg-stone-900/40 p-6">
                <h3 className="text-stone-200 font-bold text-base mb-3">{faq.q}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 8 — CONCLUSÃO
           ═══════════════════════════════════════════════════════════════ */}
        <section id="conclusao" className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16">
          <motion.div {...fade(0)} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-stone-100 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              A Cura Vem da Terra. O Controle Vem de Quem a Esconde.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div {...fade(0.1)} className="space-y-5 text-stone-400 leading-relaxed text-[15px] lg:text-base">
              <p>
                A babosa não precisa de aprovação regulatória para existir. Ela cresce em qualquer solo brasileiro. Sobrevive com pouca água. Multiplica-se sozinha. E carrega dentro do seu gel transparente um complexo bioquímico que a ciência já documentou e a indústria já tentou controlar.
              </p>
              <p>
                O acemannan não desapareceu porque falhou. Desapareceu porque <strong className="text-stone-200">funcionava bem demais para um composto não patenteável pela Big Pharma</strong>. Quando o custo de produção de um imunomodulador é zero e ele cresce no quintal de qualquer família, o modelo de negócio trilionário da farmacologia sintética treme.
              </p>
              <p className="text-stone-200 font-semibold text-lg">
                Plante babosa. Aprenda a manipular o gel. Ensine seus filhos. A soberania biológica começa quando você para de pedir permissão para se curar.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div {...fade(0.2)} className="space-y-4">
              <Link
                to="/soberania-organica/fitoterapia-aplicada"
                className="flex items-center gap-4 p-5 rounded-xl bg-emerald-600/15 border border-emerald-500/25 hover:bg-emerald-600/25 transition-all duration-500 group"
              >
                <Leaf size={22} className="text-emerald-400 shrink-0" />
                <div className="flex-1">
                  <span className="text-stone-200 font-bold block">Protocolos Fitoterápicos</span>
                  <span className="text-stone-500 text-sm">Receitas por sistema corporal com dosagens seguras</span>
                </div>
                <ChevronRight size={18} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/soberania-organica/autonomia-biologica"
                className="flex items-center gap-4 p-5 rounded-xl border border-emerald-500/15 hover:bg-emerald-500/5 transition-all duration-500 group"
              >
                <Shield size={22} className="text-emerald-400 shrink-0" />
                <div className="flex-1">
                  <span className="text-stone-200 font-bold block">Autonomia Biológica</span>
                  <span className="text-stone-500 text-sm">12 plantas com fichas técnicas completas</span>
                </div>
                <ChevronRight size={18} className="text-stone-600 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/soberania-organica/sabedoria-ancestral"
                className="flex items-center gap-4 p-5 rounded-xl border border-stone-800 hover:bg-stone-800/50 transition-all duration-500 group"
              >
                <BookOpen size={22} className="text-stone-500 shrink-0" />
                <div className="flex-1">
                  <span className="text-stone-200 font-bold block">Sabedoria Ancestral</span>
                  <span className="text-stone-500 text-sm">Conhecimento que sobreviveu milênios</span>
                </div>
                <ChevronRight size={18} className="text-stone-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Citação de fechamento */}
          <motion.div {...fade(0.3)} className="mt-20 text-center border-t border-stone-800 pt-12">
            <blockquote className="text-stone-300 text-xl md:text-2xl lg:text-3xl italic font-light max-w-4xl mx-auto leading-relaxed">
              "Fomos feitos para consumir o que vem da terra. A cura sempre esteve ali, crescendo em silêncio enquanto te vendiam a doença em cápsulas."
            </blockquote>
            <cite className="block text-emerald-500 font-bold text-sm mt-6 not-italic tracking-[0.2em] uppercase">Lord Junnior</cite>
          </motion.div>
        </section>

        {/* ─── FOOTER NAVIGATION ─── */}
        <footer className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pb-20 pt-8">
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/soberania-organica" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-300 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
              <Zap size={14} /> Soberania Orgânica
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-300 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
              <Shield size={14} /> Voltar à Base
            </Link>
          </div>
        </footer>
      </article>

      <ScrollToTop />
    </>
  );
}
