import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Clock, Users, BookOpen, Beaker,
  Leaf, Mountain, AlertTriangle, CheckCircle2,
  ScrollText, ExternalLink, Compass, Sprout, FlaskConical,
} from 'lucide-react';
import BackNav from '@/components/BackNav';
import ScrollToTop from '@/components/ScrollToTop';

import imgHero from '@/assets/receitas/hero-garrafada-ancestral-light.webp';
import imgBoldo from '@/assets/receitas/ativo-boldo-folhas.webp';
import imgGuaco from '@/assets/receitas/ativo-guaco-folhas.webp';
import imgAroeira from '@/assets/receitas/ativo-aroeira-frutos.webp';

/**
 * /soberania-organica/cozinha-funcional/garrafada-digestiva-ancestral
 * Receita ancestral indígena/popular, Boldo + Guaco + Aroeira.
 * Versão exclusivamente sem álcool (infusão concentrada com mel cru).
 * Padrão Light Editorial obrigatório.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const C = {
  cream: '#faf6f0',
  sand: '#f1e9dd',
  sandDeep: '#e8dcc8',
  sage: '#3d4a36',
  sageDark: '#2a3324',
  terracotta: '#c4632a',
  terraSoft: '#e09a6a',
  ink: '#1c2418',
  inkSoft: '#3d4a36',
  borderLight: '#dccfb6',
};

const display = { fontFamily: "'Inter Tight', sans-serif", fontWeight: 900 as const, letterSpacing: '-0.04em', lineHeight: 0.95 };
const editorial = { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' as const, fontWeight: 400 as const };
const monoStyle = { fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.3em', textTransform: 'uppercase' as const };

const INGREDIENTES = [
  { qtd: '20 a 30 g', nome: 'Folhas de boldo fresco ou seco', detalhe: 'Plectranthus barbatus (boldo brasileiro). Cerca de 1 punhado generoso.' },
  { qtd: '20 g', nome: 'Folhas de guaco', detalhe: 'Mikania glomerata. 1 punhado de folhas frescas ou 2 colheres de sopa de folha seca.' },
  { qtd: '5 a 6 folhas', nome: 'Folhas de aroeira', detalhe: 'Schinus terebinthifolia. Pode substituir por 1 colher de chá de frutos rosados (pimenta-rosa).' },
  { qtd: '500 ml', nome: 'Água filtrada', detalhe: 'Água filtrada fervida. Sem álcool, sem cachaça, versão segura para toda a família, gestantes e crianças (com orientação).' },
  { qtd: '2 a 3 colheres de sopa', nome: 'Mel cru ou rapadura', detalhe: 'Mel cru de boa procedência (preserva enzimas) ou rapadura ralada. Conservante ancestral, suaviza o sabor das ervas e potencializa a ação expectorante.' },
];

const PREPARO = [
  { n: '01', titulo: 'Selecione e lave as folhas', desc: 'Lave bem as folhas de boldo, guaco e aroeira em água corrente. Seque levemente em pano limpo. Se possível, colha de manhã cedo, antes do sol forte (concentração maior de princípios ativos).' },
  { n: '02', titulo: 'Faça a infusão abafada', desc: 'Ferva 500 ml de água filtrada. Desligue o fogo, acrescente todas as folhas de uma vez, tampe a panela e deixe em infusão abafada por 15 a 20 minutos. Não ferva as folhas, o calor direto destrói os ativos voláteis (cumarina do guaco, óleos do boldo).' },
  { n: '03', titulo: 'Coe e adoce ainda morno', desc: 'Coe com pano limpo ou coador de papel descartando as folhas. Ainda morno (não quente), dissolva 2 a 3 colheres de sopa de mel cru ou rapadura. O mel cru atua como conservante natural e potencializa a ação expectorante do guaco.' },
  { n: '04', titulo: 'Envase em vidro âmbar', desc: 'Transfira para garrafa de vidro âmbar (ou escura) esterilizada, com tampa hermética. Rotule com data de preparo. Mantenha sempre na geladeira.' },
  { n: '05', titulo: 'Validade curta, lote pequeno', desc: 'Por ser sem álcool, dura de 7 a 10 dias na geladeira. Faça em lote pequeno, mais vezes, fica mais fresco e ativo. Se notar mudança de cheiro, cor turva ou sabor azedo, descarte.' },
  { n: '06', titulo: 'Tome com critério', desc: 'Adulto: 1 colher de sopa (15 ml) puro ou diluído em pouca água, 2 a 3 vezes ao dia, após as refeições. Crianças acima de 5 anos (com aval pediátrico): 1 colher de chá, 2x ao dia. Máximo de 15 dias seguidos. Pausa de 15 dias antes de repetir.' },
];

const ATIVOS = [
  {
    n: '01', img: imgBoldo, nome: 'Boldo brasileiro', fonte: 'Plectranthus barbatus · 20 a 30 g',
    icon: Leaf,
    alt: 'Folhas frescas de boldo brasileiro de coloração verde clara dispostas em toalha de linho cor creme com luz natural suave',
    tradicao: 'Usado por indígenas Tupi-Guarani e popular no interior brasileiro como protetor do fígado e digestivo. Chá de boldo após refeição é cultura nacional há séculos.',
    sus: 'Listado na RENISUS (Relação Nacional de Plantas Medicinais de Interesse ao SUS).',
    mecanismo: 'Forskolina e diterpenos estimulam a produção de bile pelo fígado, melhorando digestão de gorduras. Ação colagoga e colerética documentada. Reduz dispepsia funcional, sensação de empachamento e má digestão.',
    estudoAncora: 'Salah & Jäger (2005), Journal of Ethnopharmacology',
    achado: 'Revisão etnofarmacológica confirma uso para dispepsia, hepatopatias leves e cólica. Atividade hepatoprotetora demonstrada em modelos animais com doses comparáveis ao uso popular.',
  },
  {
    n: '02', img: imgGuaco, nome: 'Guaco', fonte: 'Mikania glomerata · 20 g de folhas',
    icon: Sprout,
    alt: 'Folhas alongadas verde escuras de guaco com pequenas flores brancas em formato de estrela sobre toalha de linho clara',
    tradicao: 'Conhecido como “erva-de-cobra” ou “erva-de-bugre” pelos indígenas. Usado historicamente para tosse, bronquite, picada de cobra e infecções respiratórias. Popular nas Farmácias Vivas do Ceará e do Norte/Nordeste.',
    sus: 'Aprovado pela Anvisa como fitoterápico de referência. Consta na RENISUS e em monografia oficial.',
    mecanismo: 'A cumarina (princípio ativo) tem ação broncodilatadora, expectorante e anti-inflamatória. Diluí o muco, abre as vias aéreas e reduz inflamação. Também tem ação antimicrobiana suave.',
    estudoAncora: 'Soares et al. (2006), Phytotherapy Research',
    achado: 'Ensaios farmacológicos confirmam ação expectorante e broncodilatadora. Xarope de guaco é dispensado no SUS para tosse seca e bronquite leve, com perfil de segurança bem estabelecido.',
  },
  {
    n: '03', img: imgAroeira, nome: 'Aroeira', fonte: 'Schinus terebinthifolia · 5 a 6 folhas',
    icon: Mountain,
    alt: 'Galho de aroeira com pequenos frutos rosados brilhantes (pimenta rosa) e folhas verdes alongadas sobre toalha de linho cor creme',
    tradicao: 'Sagrada para vários povos originários (Guarani, Pataxó). Casca, folha e fruto eram usados para banhos cicatrizantes, lavagens íntimas, infecções de pele e desinflamatório geral.',
    sus: 'Consta na RENISUS. Banho de assento de aroeira é dispensado no SUS para vaginites e cervicites leves.',
    mecanismo: 'Taninos, flavonoides e schinol têm ação antimicrobiana, anti-inflamatória, cicatrizante e adstringente confirmada. Ativos contra bactérias gram-positivas e fungos comuns do trato digestivo.',
    estudoAncora: 'Carvalho et al. (2013), Brazilian Journal of Pharmacognosy',
    achado: 'Revisão sistemática de mais de 30 estudos confirma ação antimicrobiana, anti-inflamatória e cicatrizante. Sem toxicidade relevante em doses tradicionais. Eficácia comparável a antifúngicos sintéticos em alguns ensaios.',
  },
];

const FONTES = [
  { autor: 'Ministério da Saúde', ano: '2006', titulo: 'Política Nacional de Plantas Medicinais e Fitoterápicos (Decreto nº 5.813)', revista: 'Brasil', tipo: 'Marco regulatório oficial', link: 'https://bvsms.saude.gov.br/bvs/publicacoes/politica_nacional_fitoterapicos.pdf' },
  { autor: 'Ministério da Saúde', ano: '2009', titulo: 'RENISUS, Relação Nacional de Plantas Medicinais de Interesse ao SUS', revista: 'Brasil', tipo: 'Lista oficial de 71 plantas', link: 'https://www.gov.br/saude/pt-br/composicao/sectics/daf/pnpmf/plantas-medicinais-e-fitoterapicos-no-sus' },
  { autor: 'Salah, S. M.; Jäger, A. K.', ano: '2005', titulo: 'Two flavonoids from Plectranthus barbatus with relaxant effects', revista: 'Journal of Ethnopharmacology', tipo: 'Estudo etnofarmacológico (boldo)', link: 'https://pubmed.ncbi.nlm.nih.gov/?term=Plectranthus+barbatus+ethnopharmacology' },
  { autor: 'Soares, A. K. A. et al.', ano: '2006', titulo: 'Avaliação da segurança clínica de um fitoterápico contendo Mikania glomerata Sprengel', revista: 'Revista Brasileira de Farmacognosia', tipo: 'Estudo clínico (guaco)', link: 'https://pubmed.ncbi.nlm.nih.gov/?term=Mikania+glomerata+clinical' },
  { autor: 'Carvalho, M. G. et al.', ano: '2013', titulo: 'Schinus terebinthifolius Raddi: chemical composition, biological properties and toxicity', revista: 'Revista Brasileira de Plantas Medicinais', tipo: 'Revisão sistemática (aroeira)', link: 'https://www.scielo.br/j/rbpm/a/wHbwRyRBTbCq3vh8VgpBzJk/' },
  { autor: 'Cartilha Kaxinawá', ano: '1996', titulo: 'Una Isi Kayawa, Livro da Cura do Povo Huni Kuĩ', revista: 'Comissão Pró-Índio do Acre', tipo: 'Saber tradicional indígena', link: 'https://acervo.socioambiental.org/' },
  { autor: 'Brandão, M. G. L. et al.', ano: '2008', titulo: 'Brazilian medicinal plants described by 19th century European naturalists in the Official Pharmacopoeia', revista: 'Revista Brasileira de Farmacognosia', tipo: 'Análise histórico-farmacêutica', link: 'https://www.scielo.br/j/rbfar/' },
];

const FAQ = [
  { q: 'Por que a versão é só sem álcool?',
    a: 'Por princípio: este projeto não recomenda nada que crie dependência, vício ou risco hepático adicional. Existem versões tradicionais com cachaça no interior brasileiro, mas a versão em infusão com mel cru atinge o mesmo objetivo digestivo, expectorante e imunológico, é segura para toda a família (com as ressalvas de uso) e respeita gestantes, crianças, abstêmios, hepatopatas e quem usa medicação contínua.' },
  { q: 'Mel cru substitui o álcool como conservante?',
    a: 'Em parte. O mel cru tem ação antimicrobiana natural (peróxido de hidrogênio enzimático, baixa atividade de água, pH ácido) e estende a validade da infusão para 7 a 10 dias na geladeira. Não é tão duradouro quanto a maceração alcoólica (que dura meses), mas é o suficiente porque o protocolo de uso é de no máximo 15 dias com pausa.' },
  { q: 'É medicina alternativa ou tem respaldo oficial?',
    a: 'Tem respaldo oficial. Boldo, guaco e aroeira constam na RENISUS (Relação Nacional de Plantas Medicinais de Interesse ao SUS) desde 2009. O Brasil tem mais de 600 Farmácias Vivas dispensando essas mesmas plantas pela rede pública. A Política Nacional de Plantas Medicinais e Fitoterápicos é de 2006.' },
  { q: 'Substitui omeprazol, antiácido ou laxante?',
    a: 'Para má digestão funcional leve (peso após refeição, gases, eructação, intestino preguiçoso), pode substituir uso ocasional de antiácidos comuns. Não substitui tratamento de úlcera diagnosticada, refluxo crônico, gastrite por H. pylori, doença de Crohn ou qualquer doença gastrointestinal estabelecida. Para isso, médico.' },
  { q: 'Qual é a dose certa e por quanto tempo?',
    a: 'Adulto: 1 colher de sopa (15 ml) pura ou diluída em pouca água, 2 a 3 vezes ao dia, após as refeições. Crianças acima de 5 anos (com aval pediátrico): 1 colher de chá, 2x ao dia. Máximo de 15 dias seguidos, com pausa obrigatória de 15 dias antes de repetir. Não ultrapasse 30 dias de uso por mês.' },
  { q: 'Por que aroeira na fórmula? Não é “a árvore brava”?',
    a: 'A aroeira-vermelha (Schinus terebinthifolia) é diferente da aroeira-do-sertão (Myracrodruon urundeuva), que é mais cáustica. A primeira é a usada em fitoterapia oficial brasileira, com perfil de segurança documentado e ação anti-inflamatória, antimicrobiana e cicatrizante já confirmadas em revisão sistemática. Sempre identifique corretamente a espécie ou compre em Farmácia Viva.' },
];

const TRILHA = [
  { to: '/soberania-organica/cozinha-funcional', titulo: 'Hub Cozinha Funcional', desc: 'Volte para a coleção completa de receitas ancestrais brasileiras validadas pelo SUS.', label: 'Ver coleção' },
  { to: '/soberania-organica/fitoterapia-aplicada', titulo: 'Fitoterapia Aplicada', desc: 'Aprofunde o uso clínico de plantas medicinais brasileiras: protocolos, doses, contraindicações.', label: 'Aprofundar' },
  { to: '/soberania-organica/saude-preventiva', titulo: 'Saúde Preventiva', desc: 'Os pilares fisiológicos por trás da boa digestão: microbiota, motilidade, fígado e enzimas.', label: 'Estudar fisiologia' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: C.sage }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={imgHero}
          alt="Garrafa de vidro com garrafada cor âmbar e tampa de cortiça ao lado de folhas frescas de boldo guaco e galho de aroeira com frutos rosa, pote de mel cru sobre toalha de linho cor creme em luz natural suave"
          className="w-full h-full object-cover scale-110"
          style={{ filter: 'saturate(1.05) contrast(1.02)' }} loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, rgba(28,38,24,0.35) 0%, rgba(28,38,24,0.45) 45%, rgba(28,38,24,0.78) 78%, rgba(20,28,18,0.92) 100%)`,
        }} />
        <div className="absolute inset-x-0 bottom-0 h-2 pointer-events-none" style={{ background: C.cream }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28" style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: APPLE_EASE }} className="mb-6">
          <Link to="/soberania-organica/cozinha-funcional" className="text-xs font-bold transition-opacity hover:opacity-80"
            style={{ ...monoStyle, color: 'rgba(250,246,240,0.85)' }}>
            Soberania Orgânica › Cozinha Funcional
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(250,246,240,0.18)', border: '1px solid rgba(250,246,240,0.28)' }}>
          <Mountain size={14} style={{ color: C.cream }} />
          <span className="text-[11px] md:text-xs font-bold" style={{ ...monoStyle, color: C.cream }}>
            Tradição ancestral · Validada pelo SUS · RENISUS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,7.5vw,6.5rem)] max-w-[20ch]"
          style={{ ...display, color: C.cream, textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
          O xarope de boldo,{' '}
          <span style={{ ...editorial, color: C.terraSoft, textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}>
            guaco e aroeira.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(250,246,240,0.95)', fontFamily: "'Inter Tight', sans-serif", textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}>
          Infusão concentrada com mel cru. Sem álcool, sem dependência. Fórmula indígena e popular para fígado, digestão e imunidade, três plantas listadas na RENISUS e dispensadas pelas Farmácias Vivas do SUS.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: APPLE_EASE }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.85)' }}>
            <Clock size={14} style={{ color: C.terraSoft }} /> 15 min de preparo
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.85)' }}>
            <Users size={14} style={{ color: C.terraSoft }} /> 1 garrafa · 1 semana
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.85)' }}>
            <BookOpen size={14} style={{ color: C.terraSoft }} /> RENISUS · 6 referências
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function GarrafadaDigestivaAncestral() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Xarope Ancestral de Boldo, Guaco e Aroeira (sem álcool) | Lord Junnior</title>
        <meta name="description" content="Receita ancestral indígena e popular brasileira sem álcool, com mel cru, para fígado, digestão, tosse e imunidade. Plantas listadas na RENISUS e dispensadas pelas Farmácias Vivas do SUS." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/cozinha-funcional/garrafada-digestiva-ancestral" />
        <meta property="og:title" content="O Xarope Ancestral de Boldo, Guaco e Aroeira (sem álcool)" />
        <meta property="og:description" content="Boldo, guaco e aroeira em infusão com mel cru. Três plantas RENISUS, zero álcool, fórmula segura para a família." />
        <meta property="og:image" content="https://lordjunnior.com.br/og/garrafada-ancestral.jpg" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <html lang="pt-BR" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: 'Xarope Ancestral de Boldo, Guaco e Aroeira (sem álcool, com mel cru)',
            author: { '@type': 'Person', name: 'Lord Junnior' },
            description: 'Receita ancestral brasileira em infusão sem álcool com mel cru, em duas versões (uso digestivo diário e xarope concentrado para tosse), baseada em saber indígena e popular e validada pela RENISUS.',
            recipeYield: '1 garrafa de 500 ml · 7 a 10 dias',
            prepTime: 'PT15M', cookTime: 'PT20M', totalTime: 'PT35M',
            recipeCategory: 'Fitoterápico ancestral sem álcool',
            recipeCuisine: 'Indígena e popular brasileira',
            keywords: 'xarope, boldo, guaco, aroeira, sem álcool, mel cru, RENISUS, Farmácia Viva, fitoterapia brasileira, medicina indígena',
            recipeIngredient: INGREDIENTES.map((i) => `${i.qtd} ${i.nome}`),
            recipeInstructions: PREPARO.map((p) => ({ '@type': 'HowToStep', name: p.titulo, text: p.desc })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question', name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })}
        </script>
      </Helmet>

      <div className="relative min-h-screen" style={{ backgroundColor: C.cream, color: C.ink, fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackNav backTo="/soberania-organica/cozinha-funcional" backLabel="Cozinha Funcional" />
        </div>
        <ScrollToTop />

        <Hero />

        {/* CAPÍTULO 1, Manifesto / contexto ancestral */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: C.terracotta }} />
                <p className="text-sm font-semibold" style={{ ...monoStyle, color: C.inkSoft }}>De onde vem essa receita</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight mb-10" style={{ ...display, color: C.sage }}>
                Vovó já fazia,{' '}
                <span style={{ ...editorial, color: C.terracotta }}>o SUS confirmou.</span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                <p>
                  A garrafada é uma das mais antigas formas de preparo medicinal do Brasil. Vem da combinação de saberes <strong style={{ color: C.sage }}>indígenas</strong> (extração por maceração em líquido), <strong style={{ color: C.sage }}>africanos</strong> (uso de garrafas escuras para conservação) e da <strong style={{ color: C.sage }}>tradição portuguesa de licores caseiros</strong>. No interior, ainda hoje, cada família tem sua receita própria.
                </p>
                <p>
                  Esta versão combina três plantas que aparecem em praticamente todas as garrafadas digestivas do território brasileiro: <strong style={{ color: C.terracotta }}>boldo</strong> para o fígado, <strong style={{ color: C.terracotta }}>guaco</strong> para vias respiratórias e imunidade, <strong style={{ color: C.terracotta }}>aroeira</strong> para inflamação e cicatrização interna. As três constam na <strong style={{ color: C.sage }}>RENISUS</strong>, a lista oficial do Ministério da Saúde de plantas medicinais de interesse ao SUS.
                </p>
                <p>
                  No Ceará, no Norte e em vários estados, as <strong style={{ color: C.sage }}>Farmácias Vivas do SUS</strong> dispensam fórmulas exatamente parecidas com essa, manipuladas localmente. Não é simpatia. É ciência ancestral validada e operando dentro da rede pública há quase duas décadas.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: `3px solid ${C.terracotta}`, color: C.sage, ...editorial }}>
                  Sou neto de índio. Essa garrafada não é exotismo: é remédio do meu povo, do seu povo, com nome científico e número de registro.
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2, RECEITA */}
        <section id="receita" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 md:mb-20">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 02 · A receita</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                Como{' '}
                <span style={{ ...editorial, color: C.terracotta }}>fazer.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <motion.div {...fade(0)} className="lg:col-span-5">
                <div className="sticky top-8 rounded-3xl p-8 md:p-10" style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                  <h3 className="text-2xl mb-2" style={{ ...editorial, color: C.terracotta }}>
                    Ingredientes
                  </h3>
                  <p className="text-sm mb-8" style={{ color: C.inkSoft }}>1 garrafa de 500 ml · uso de 1 semana</p>
                  <ul className="space-y-6">
                    {INGREDIENTES.map((ing, i) => (
                      <li key={i} className="flex gap-5 pb-6" style={{ borderBottom: i < INGREDIENTES.length - 1 ? `1px solid ${C.borderLight}` : 'none' }}>
                        <span className="font-bold text-sm whitespace-nowrap min-w-[80px]" style={{ ...monoStyle, color: C.terracotta }}>
                          {ing.qtd}
                        </span>
                        <div>
                          <p className="font-semibold mb-1" style={{ color: C.sage }}>{ing.nome}</p>
                          <p className="text-sm leading-relaxed font-light" style={{ color: C.inkSoft }}>{ing.detalhe}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div {...fade(0.1)} className="lg:col-span-7">
                <h3 className="text-2xl mb-2" style={{ ...editorial, color: C.terracotta }}>
                  Modo de preparo
                </h3>
                <p className="text-sm mb-10" style={{ color: C.inkSoft }}>15 min ativos mais 7 a 10 dias de maceração</p>

                <ol className="space-y-8">
                  {PREPARO.map((p) => (
                    <li key={p.n} className="flex gap-6">
                      <span className="text-5xl md:text-6xl font-black tabular-nums shrink-0" style={{ ...display, color: C.terraSoft }}>
                        {p.n}
                      </span>
                      <div className="pt-2">
                        <h4 className="text-xl mb-2 font-semibold" style={{ color: C.sage }}>{p.titulo}</h4>
                        <p className="leading-relaxed font-light" style={{ color: C.inkSoft }}>{p.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3, DUAS VERSÕES (infusão diária vs xarope com mel) */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 03 · Duas versões</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                Infusão{' '}
                <span style={{ ...editorial, color: C.terracotta }}>ou xarope.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: C.inkSoft }}>
                Duas formas seguras, sem álcool, da mesma fórmula. A infusão é o uso digestivo diário. O xarope (mais concentrado e adoçado com mel cru) é a forma popular para tosse, garganta e imunidade.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <motion.div {...fade(0)} className="p-8 md:p-10 rounded-3xl"
                style={{ backgroundColor: '#fff8ef', border: `1px solid ${C.borderLight}` }}>
                <FlaskConical size={32} style={{ color: C.terracotta }} className="mb-6" />
                <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: C.terracotta }}>Versão A · uso diário</p>
                <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>Infusão concentrada</h3>
                <ul className="space-y-4 text-base md:text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> 500 ml de água filtrada fervida, em infusão abafada por 15 a 20 min</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> 2 a 3 colheres de mel cru dissolvidas ainda morno</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Validade: 7 a 10 dias na geladeira (lote pequeno)</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Dose adulta: 1 colher de sopa, 2 a 3x ao dia, após refeição</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Foco digestivo, hepático e imunológico do dia a dia</li>
                </ul>
              </motion.div>

              <motion.div {...fade(0.1)} className="p-8 md:p-10 rounded-3xl"
                style={{ backgroundColor: C.sand, border: `1px solid ${C.borderLight}` }}>
                <Sprout size={32} style={{ color: C.sage }} className="mb-6" />
                <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: C.sage }}>Versão B · tosse e garganta</p>
                <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>Xarope (xarope ancestral)</h3>
                <ul className="space-y-4 text-base md:text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                  <li className="flex gap-3"><span style={{ color: C.sage }}>·</span> Reduzir a infusão coada no fogo baixo até a metade do volume</li>
                  <li className="flex gap-3"><span style={{ color: C.sage }}>·</span> Acrescentar mel cru na proporção 1:1 fora do fogo, mexer até dissolver</li>
                  <li className="flex gap-3"><span style={{ color: C.sage }}>·</span> Validade: 20 a 30 dias na geladeira (mel concentrado conserva melhor)</li>
                  <li className="flex gap-3"><span style={{ color: C.sage }}>·</span> Dose: 1 colher de chá, 3 a 4x ao dia, em crise de tosse seca</li>
                  <li className="flex gap-3"><span style={{ color: C.sage }}>·</span> Forma popular do interior. Sempre sem álcool, sem cachaça</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4, DOSSIÊ DAS PLANTAS */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sage, color: C.cream }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terraSoft }}>Capítulo 04 · As três plantas</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={display}>
                Tradição,{' '}
                <span style={{ ...editorial, color: C.terraSoft }}>nome científico, RENISUS.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(250,246,240,0.78)' }}>
                Cada planta tem três camadas de validação: o uso ancestral indígena e popular, a chancela oficial do SUS, e a evidência etnofarmacológica publicada.
              </p>
            </motion.div>

            <div className="space-y-16 md:space-y-24">
              {ATIVOS.map((a, i) => {
                const reversed = i % 2 === 1;
                return (
                  <motion.article key={a.n} {...fade(0)} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className={`lg:col-span-6 ${reversed ? 'lg:order-2' : ''}`}>
                      <div className="relative h-[360px] md:h-[480px] lg:h-[560px] overflow-hidden rounded-3xl group">
                        <img src={a.img} alt={a.alt} loading="lazy" width={1280} height={1280}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                        <div className="absolute top-6 left-6 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md"
                          style={{ ...monoStyle, backgroundColor: 'rgba(250,246,240,0.85)', color: C.sage }}>
                          <a.icon size={11} className="inline mr-2" /> Planta {a.n}
                        </div>
                      </div>
                    </div>
                    <div className={`lg:col-span-6 ${reversed ? 'lg:order-1' : ''}`}>
                      <p className="text-xs font-bold mb-4" style={{ ...monoStyle, color: C.terraSoft }}>
                        {a.fonte}
                      </p>
                      <h3 className="text-4xl md:text-6xl mb-8" style={{ ...display, color: C.cream }}>
                        {a.nome}
                      </h3>

                      <div className="p-5 rounded-xl mb-6" style={{ backgroundColor: 'rgba(250,246,240,0.06)', border: '1px solid rgba(250,246,240,0.12)' }}>
                        <p className="text-[10px] font-bold mb-2" style={{ ...monoStyle, color: C.terraSoft }}>Tradição ancestral</p>
                        <p className="font-light leading-relaxed" style={{ color: 'rgba(250,246,240,0.9)' }}>{a.tradicao}</p>
                      </div>

                      <div className="p-5 rounded-xl mb-6" style={{ backgroundColor: 'rgba(224,154,106,0.1)', borderLeft: `3px solid ${C.terraSoft}` }}>
                        <p className="text-[10px] font-bold mb-2" style={{ ...monoStyle, color: C.terraSoft }}>Validação SUS</p>
                        <p className="font-light leading-relaxed" style={{ color: C.cream }}>{a.sus}</p>
                      </div>

                      <p className="text-base md:text-lg leading-relaxed mb-6 font-light" style={{ color: 'rgba(250,246,240,0.85)' }}>
                        {a.mecanismo}
                      </p>

                      <div className="p-5 rounded-xl" style={{ backgroundColor: 'rgba(250,246,240,0.06)' }}>
                        <p className="text-[10px] font-bold mb-2" style={{ ...monoStyle, color: 'rgba(250,246,240,0.6)' }}>Estudo-âncora</p>
                        <p className="font-semibold mb-2" style={{ color: C.cream }}>{a.estudoAncora}</p>
                        <p className="text-sm leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.78)' }}>{a.achado}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5, PROTOCOLO DE USO */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 05 · Como tomar</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                O{' '}
                <span style={{ ...editorial, color: C.terracotta }}>protocolo.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <motion.div {...fade(0)} className="p-8 md:p-10 rounded-3xl"
                style={{ backgroundColor: '#fff8ef', border: `1px solid ${C.borderLight}` }}>
                <CheckCircle2 size={32} style={{ color: C.terracotta }} className="mb-6" />
                <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>O que fazer</h3>
                <ul className="space-y-4 text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Tomar 2x ao dia, após almoço e jantar</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Sempre coar bem e guardar na geladeira em vidro escuro</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Manter por 7 a 15 dias no máximo</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Pausa obrigatória de 15 dias antes de repetir</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Anotar como digestão, peso pós-refeição e disposição respondem</li>
                </ul>
              </motion.div>

              <motion.div {...fade(0.1)} className="p-8 md:p-10 rounded-3xl"
                style={{ backgroundColor: C.sand, border: `1px solid ${C.borderLight}` }}>
                <AlertTriangle size={32} style={{ color: '#a64a1f' }} className="mb-6" />
                <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>O que não esperar</h3>
                <ul className="space-y-4 text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Cura de úlcera, gastrite por H. pylori ou refluxo crônico</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Substituir prescrição médica de antiácido contínuo ou hepatoprotetor</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Tratar bronquite ou pneumonia (procure atendimento)</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Resolver enzimopatia hepática diagnosticada por exame</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Funcionar tomando esporadicamente: o ganho está no ciclo</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6, BIBLIOTECA DE FONTES */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 06 · Biblioteca de evidências</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                As{' '}
                <span style={{ ...editorial, color: C.terracotta }}>fontes.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: C.inkSoft }}>
                Documentos oficiais do SUS, cartilhas indígenas e revisões científicas indexadas. A garrafada não é folclore: tem rastreabilidade.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {FONTES.map((f, i) => (
                <motion.a key={i} {...fade(i * 0.05)} href={f.link} target="_blank" rel="noopener noreferrer"
                  className="group p-7 md:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <ScrollText size={16} style={{ color: C.terracotta }} />
                      <span className="text-xs font-bold" style={{ ...monoStyle, color: C.terracotta }}>{f.ano}</span>
                    </div>
                    <ExternalLink size={14} style={{ color: C.inkSoft }} className="transition-colors group-hover:translate-x-0.5" />
                  </div>
                  <p className="font-semibold text-lg mb-3 leading-snug" style={{ color: C.sage }}>{f.titulo}</p>
                  <p className="text-sm mb-3" style={{ color: C.inkSoft }}>{f.autor}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    <span style={{ ...editorial, color: C.sage }}>{f.revista}</span>
                    <span className="font-bold" style={{ ...monoStyle, color: C.terracotta }}>{f.tipo}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Perguntas honestas</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                O que perguntam{' '}
                <span style={{ ...editorial, color: C.terracotta }}>antes de fazer.</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((item, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)}
                    className="rounded-2xl overflow-hidden transition-all"
                    style={{ backgroundColor: open ? '#fff8ef' : C.sand, border: `1px solid ${open ? C.terracotta : C.borderLight}` }}>
                    <button onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-6"
                      aria-expanded={open}>
                      <span className="text-lg md:text-2xl font-semibold leading-snug pr-4" style={{ color: C.sage }}>{item.q}</span>
                      <ChevronDown size={26} className="shrink-0 mt-1 transition-transform duration-500"
                        style={{ color: C.terracotta, transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.4, ease: APPLE_EASE }} className="overflow-hidden">
                        <div className="px-6 md:px-8 pb-8 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTINUE SUA TRILHA */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <Compass size={32} style={{ color: C.terracotta }} className="mb-6" />
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Continue sua trilha</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                A garrafada é um começo.{' '}
                <span style={{ ...editorial, color: C.terracotta }}>A farmácia ancestral é vasta.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {TRILHA.map((t, i) => (
                <motion.div key={t.to} {...fade(i * 0.08)}>
                  <Link to={t.to} className="group block h-full p-8 md:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                    <Mountain size={24} style={{ color: C.terracotta }} className="mb-6" />
                    <h3 className="text-2xl md:text-3xl mb-4 leading-tight" style={{ ...display, color: C.sage }}>
                      {t.titulo}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed font-light mb-8" style={{ color: C.inkSoft }}>
                      {t.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-bold transition-all group-hover:gap-4"
                      style={{ ...monoStyle, color: C.terracotta }}>
                      {t.label} <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + DISCLAIMER */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sage, color: C.cream }}>
          <motion.div {...fade(0)} className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-2xl md:text-4xl leading-[1.4] font-light mb-12"
              style={{ ...editorial, color: C.cream }}>
              Doze mil anos de farmácia indígena. O SUS confirmou em 2006. Falta você.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/soberania-organica/cozinha-funcional"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: C.terracotta, color: C.cream }}>
                Outras receitas <ArrowRight size={18} />
              </Link>
              <Link to="/soberania-organica"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: 'transparent', color: C.cream, border: `2px solid ${C.cream}` }}>
                Ver as 7 frentes
              </Link>
            </div>
          </motion.div>

          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-start gap-5 p-8 rounded-2xl" style={{ backgroundColor: 'rgba(250,246,240,0.06)', border: '1px solid rgba(250,246,240,0.15)' }}>
              <AlertTriangle size={24} style={{ color: C.terraSoft }} className="shrink-0 mt-1" />
              <div>
                <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: C.terraSoft }}>Disclaimer · Saúde</p>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.85)' }}>
                  Este conteúdo é educativo, baseado em saber tradicional indígena e popular brasileiro, em documentos oficiais do SUS (Política Nacional de Plantas Medicinais e Fitoterápicos, RENISUS, Farmácias Vivas) e em literatura etnofarmacológica indexada. Não substitui exame, diagnóstico, prescrição ou acompanhamento médico. Gestantes, lactantes, crianças, hepatopatas, em uso contínuo de medicação ou com doença crônica diagnosticada devem buscar orientação profissional antes de iniciar.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
