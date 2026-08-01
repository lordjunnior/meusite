import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Clock, Users, BookOpen,
  Leaf, Mountain, AlertTriangle, CheckCircle2,
  ScrollText, ExternalLink, Compass, Sprout, FlaskConical, HeartPulse,
} from 'lucide-react';
import BackNav from '@/components/BackNav';
import ScrollToTop from '@/components/ScrollToTop';

import imgHero from '@/assets/receitas/hero-pressao-hibisco-light.jpg';
import imgHibisco from '@/assets/receitas/ativo-hibisco-calices.jpg';
import imgAlho from '@/assets/receitas/ativo-alho-bulbos.jpg';
import imgLimao from '@/assets/receitas/ativo-limao-taiti.jpg';

/**
 * /soberania-organica/cozinha-funcional/cha-pressao-hibisco
 * Apoio natural à pressão arterial, Hibisco + Alho + Limão.
 * Padrão Light Editorial. Sem álcool. Receita ancestral + RENISUS + Farmácias Vivas.
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
  { qtd: '30 g', nome: 'Cálices secos de hibisco', detalhe: 'Hibiscus sabdariffa. Cerca de 3 colheres de sopa cheias, dose validada em estudos clínicos para hipertensão leve-moderada.' },
  { qtd: '2 dentes', nome: 'Alho fresco', detalhe: 'Allium sativum. Esmagados ou picados finos imediatamente antes do uso, para máxima liberação de alicina.' },
  { qtd: '2 limões', nome: 'Suco de limão taiti', detalhe: 'Citrus limon. Cerca de 80 a 100 ml de suco fresco. Adicionado depois do calor, para preservar a vitamina C.' },
  { qtd: '1 litro', nome: 'Água filtrada', detalhe: 'Sem cloro, sem alumínio. Base neutra para extração ideal das antocianinas e compostos sulfurados.' },
  { qtd: 'opcional', nome: 'Mel cru', detalhe: '1 colher de chá apenas para suavizar o ácido. Evite açúcar refinado, que atrapalha o efeito vascular.' },
];

const PREPARO = [
  { n: '01', titulo: 'Ferva 1 litro de água filtrada', desc: 'Use panela esmaltada, inox ou de barro. Evite alumínio, que reage com ácidos do hibisco e do limão.' },
  { n: '02', titulo: 'Apague o fogo e adicione hibisco e alho', desc: 'Coloque os 30 g de cálices de hibisco e os 2 dentes de alho recém-esmagados. Tampe imediatamente. Não ferva o alho, o calor direto destrói a alicina, o composto vasodilatador.' },
  { n: '03', titulo: 'Infusão abafada por 12 a 15 minutos', desc: 'O abafamento concentra antocianinas (que dão a cor vermelho-rubi) e preserva os compostos voláteis sulfurados do alho. A cor passa de rosa para um vermelho profundo.' },
  { n: '04', titulo: 'Coe em pano limpo ou coador fino', desc: 'Use coador de papel para infusão ou pano de algodão limpo. Aperte levemente para extrair tudo.' },
  { n: '05', titulo: 'Acrescente o suco de 2 limões depois de morno', desc: 'Adicione o suco fresco só quando o líquido estiver morno (abaixo de 60 °C). Calor alto destrói vitamina C e parte dos flavonoides cítricos. Mexa bem.' },
  { n: '06', titulo: 'Guarde em garrafa de vidro escuro na geladeira', desc: 'Vidro âmbar ou escuro preserva antocianinas (sensíveis à luz). Validade: 4 dias na geladeira. Faça em lote pequeno, mais vezes.' },
];

const VARIACOES = [
  {
    icon: FlaskConical, cor: 'terra',
    titulo: 'Versão A · Chá diário', sub: 'Uso contínuo (4 a 6 semanas)',
    pontos: [
      'A receita base, exatamente como descrita acima',
      'Dose adulta: 250 ml (1 copo) 2x ao dia, manhã em jejum e fim de tarde',
      'Sempre longe das refeições principais (mínimo 30 min antes ou 2 h depois)',
      'Cor vermelho-rubi profundo, sabor ácido equilibrado pelo doce do alho',
      'Forma mais validada cientificamente, usada nos ensaios clínicos publicados',
    ],
  },
  {
    icon: Sprout, cor: 'sage',
    titulo: 'Versão B · Concentrado', sub: 'Para levar na bolsa ou viagem',
    pontos: [
      'Reduzir 500 ml de chá já coado em fogo baixo até 150 ml',
      'Acrescentar suco de 3 limões + 2 dentes de alho macerados fora do fogo',
      'Validade: 7 dias em vidro escuro na geladeira',
      'Dose: 1 colher de sopa diluída em 1 copo de água, 2x ao dia',
      'Prático para quem trabalha fora ou viaja muito',
    ],
  },
];

const ATIVOS = [
  {
    n: '01', img: imgHibisco, nome: 'Hibisco', fonte: 'Hibiscus sabdariffa · 30 g de cálices secos',
    icon: Leaf,
    alt: 'Cálices secos de hibisco cor vinho profundo dispostos em tigela cerâmica clara sobre toalha de linho cor creme com luz natural suave',
    tradicao: 'Chamado de "flor do sangue" ou "limpador de veias" pela tradição popular do Nordeste e Centro-Oeste. Adotado por indígenas e quilombolas como diurético e vasodilatador. Usado em decocções para "sangue grosso", retenção de líquido e "coração fraco". Farmácias Vivas do SUS reconhecem para hipertensão leve-moderada.',
    sus: 'Listado na RENISUS (Relação Nacional de Plantas Medicinais de Interesse ao SUS).',
    mecanismo: 'Antocianinas e ácidos orgânicos atuam como inibidores naturais da enzima conversora de angiotensina (ECA), mecanismo similar ao captopril e enalapril. Ação diurética suave (perda de sódio e água), antioxidante (protege endotélio) e relaxamento vascular direto. Reduz pressão sistólica em 5 a 8 mmHg e diastólica em ~4 mmHg em hipertensos leves-moderados.',
    estudoAncora: 'McKay, Chen, Saltzman & Blumberg (2010), Journal of Nutrition',
    achado: 'Ensaio clínico randomizado, duplo-cego, mostrou que 3 xícaras de chá de hibisco por dia, durante 6 semanas, reduziram pressão arterial sistólica em pré-hipertensos e hipertensos leves de forma estatisticamente significativa, com efeito comparável a captopril em alguns subgrupos.',
  },
  {
    n: '02', img: imgAlho, nome: 'Alho', fonte: 'Allium sativum · 2 dentes frescos',
    icon: Sprout,
    alt: 'Dois bulbos de alho fresco com casca branco-arroxeada e dois dentes descascados sobre toalha de linho cor creme em luz natural',
    tradicao: 'Conhecido como "remédio do coração" desde a colonização. Bulbos crus ou macerados são usados há séculos por indígenas, bandeirantes e sertanejos para "limpar artérias" e prevenir "apoplexia" (derrame). Quilombolas associam ao controle de "pressão do sangue" e à longevidade.',
    sus: 'Reconhecido pela Anvisa como fitoterápico de uso tradicional. Consta em monografias oficiais para apoio cardiovascular.',
    mecanismo: 'Alicina e compostos sulfurados (formados ao esmagar o dente cru) aumentam a produção endotelial de óxido nítrico, o principal vasodilatador endógeno. Reduzem rigidez arterial, agregação plaquetária e oxidação do LDL. Meta-análises mostram redução de 7 a 16 mmHg sistólica em hipertensos não controlados após 8 a 12 semanas.',
    estudoAncora: 'Ried, Frank & Stocks (2010), BMC Cardiovascular Disorders',
    achado: 'Meta-análise de 11 ensaios clínicos randomizados (n = 530) confirmou redução média de 8,4 mmHg sistólica e 7,3 mmHg diastólica em hipertensos com uso regular de extrato de alho. Efeito mais robusto em pacientes com pressão acima de 140/90 mmHg basal.',
  },
  {
    n: '03', img: imgLimao, nome: 'Limão Taiti', fonte: 'Citrus limon · suco de 2 frutos',
    icon: Mountain,
    alt: 'Limões taiti amarelo e verde com um cortado ao meio mostrando interior suculento e folhas verdes ao lado, sobre toalha de linho cor creme em luz natural',
    tradicao: 'Planta cítrica ancestral na medicina indígena, descrita como "ácido purificador". Tradição popular brasileira: limão em jejum "limpa o sangue" e "afina o sangue grosso". Sertanejos e ribeirinhos usam diariamente para hidratação alcalinizante e proteção cardiovascular.',
    sus: 'Componente nutricional reconhecido. Vitamina C e flavonoides cítricos (hesperidina) são amplamente estudados em proteção endotelial.',
    mecanismo: 'Vitamina C e citratos potencializam a biodisponibilidade do óxido nítrico do alho e prolongam o efeito antioxidante das antocianinas do hibisco. Hesperidina melhora função endotelial e reduz estresse oxidativo vascular. Citratos ajudam a alcalinizar a urina e reduzem risco de cálculos renais que o hibisco isolado poderia favorecer.',
    estudoAncora: 'Morand et al. (2011), American Journal of Clinical Nutrition',
    achado: 'Ensaio clínico controlado mostrou que a hesperidina, principal flavonoide do limão, melhora função endotelial mensurada por dilatação fluxo-mediada da artéria braquial e reduz marcadores inflamatórios em homens com sobrepeso, em apenas 4 semanas de uso regular.',
  },
];

const FONTES = [
  { autor: 'Ministério da Saúde', ano: '2006', titulo: 'Política Nacional de Plantas Medicinais e Fitoterápicos (Decreto nº 5.813)', revista: 'Brasil', tipo: 'Marco regulatório oficial', link: 'https://bvsms.saude.gov.br/bvs/publicacoes/politica_nacional_fitoterapicos.pdf' },
  { autor: 'Ministério da Saúde', ano: '2009', titulo: 'RENISUS, Relação Nacional de Plantas Medicinais de Interesse ao SUS', revista: 'Brasil', tipo: 'Lista oficial de 71 plantas', link: 'https://www.gov.br/saude/pt-br/composicao/sectics/daf/pnpmf/plantas-medicinais-e-fitoterapicos-no-sus' },
  { autor: 'McKay, D. L.; Chen, C. Y.; Saltzman, E.; Blumberg, J. B.', ano: '2010', titulo: 'Hibiscus sabdariffa L. tea (tisane) lowers blood pressure in prehypertensive and mildly hypertensive adults', revista: 'Journal of Nutrition', tipo: 'Ensaio clínico randomizado (hibisco)', link: 'https://pubmed.ncbi.nlm.nih.gov/19956015/' },
  { autor: 'Ried, K.; Frank, O. R.; Stocks, N. P.', ano: '2010', titulo: 'Aged garlic extract lowers blood pressure in patients with treated but uncontrolled hypertension: a randomised controlled trial', revista: 'BMC Cardiovascular Disorders', tipo: 'Meta-análise (alho)', link: 'https://pubmed.ncbi.nlm.nih.gov/20594781/' },
  { autor: 'Morand, C. et al.', ano: '2011', titulo: 'Hesperidin contributes to the vascular protective effects of orange juice', revista: 'American Journal of Clinical Nutrition', tipo: 'Estudo clínico (cítricos)', link: 'https://pubmed.ncbi.nlm.nih.gov/21068346/' },
  { autor: 'Hopkins, A. L. et al.', ano: '2013', titulo: 'Hibiscus sabdariffa L. in the treatment of hypertension and hyperlipidemia: a comprehensive review', revista: 'Fitoterapia', tipo: 'Revisão sistemática (hibisco)', link: 'https://pubmed.ncbi.nlm.nih.gov/23333908/' },
  { autor: 'Sociedade Brasileira de Cardiologia', ano: '2020', titulo: 'Diretrizes Brasileiras de Hipertensão Arterial, 2020', revista: 'Arquivos Brasileiros de Cardiologia', tipo: 'Diretriz médica oficial', link: 'http://publicacoes.cardiol.br/portal/abc/portugues/2021/v11603/pdf/11603022.pdf' },
];

const FAQ = [
  { q: 'Esse chá substitui losartana, hidroclorotiazida ou enalapril?',
    a: 'Não. É apoio natural com evidência clínica para hipertensão leve-moderada (estágio 1) ou pré-hipertensão, sempre como complemento a mudanças de estilo de vida (sal, peso, exercício, sono). Quem já toma anti-hipertensivo NUNCA deve suspender por conta própria, a queda de pressão pode ser perigosa. Combinar com hibisco e alho potencializa o efeito do remédio, e a dose médica precisa ser reajustada por um profissional, com monitoramento de pressão diária.' },
  { q: 'Em quanto tempo a pressão começa a baixar?',
    a: 'Não é imediato. A literatura mostra resultados consistentes entre 2 e 6 semanas de uso contínuo, com efeito mais evidente em pessoas com pressão entre 130/85 e 159/99 mmHg que também adotam mudança de hábitos. Meça pressão 2x ao dia (manhã e noite) nas primeiras 2 semanas e anote em um diário para conversar com seu médico.' },
  { q: 'Quem NÃO pode tomar?',
    a: 'Contraindicações absolutas: gestantes (hibisco tem efeito emenagogo e risco de contrações uterinas), lactantes, pessoas com hipotensão (pressão baixa), úlcera gástrica ativa, alergia a qualquer ingrediente. Atenção redobrada: quem usa anticoagulante (alho potencializa o efeito), quem tem cálculo renal por oxalato (hibisco contém oxalato), pacientes em pré-operatório (suspender 7 dias antes pelo risco de sangramento). Crianças menores de 6 anos: contraindicado sem pediatra fitoterapeuta.' },
  { q: 'Qual a dose certa por idade?',
    a: 'Adultos 18-65 anos com hipertensão leve-moderada: receita base completa, 500 ml/dia divididos em 2 doses. Idosos acima de 65: reduza para 15-20 g de hibisco, 1 dente de alho, 1 limão por litro, e 300-400 ml/dia (rins mais sensíveis, monitore potássio). Adolescentes 12-17: metade da dose adulta, 250 ml/dia, só com orientação. Crianças 6-11 anos: apenas hibisco + limão sem alho cru, 1/4 da dose adulta máxima, com aval pediátrico.' },
  { q: 'Por quanto tempo posso tomar sem parar?',
    a: 'Ciclo recomendado: 4 a 6 semanas contínuas, depois pausa de 7 a 10 dias com reavaliação da pressão (medida em casa e idealmente em consulta). Pode-se retomar mais um ciclo, mas sem usar indefinidamente sem reavaliação médica. O objetivo é apoiar a recuperação, não criar dependência crônica de chá nenhum.' },
  { q: 'O alho cru não vai me dar mau hálito o dia todo?',
    a: 'O alho é infusionado, não engolido inteiro, a maior parte dos compostos voláteis (responsáveis pelo cheiro forte) fica concentrada no caldo, que é diluído em 1 litro. Para minimizar o hálito: tome longe de reuniões importantes, mastigue salsinha fresca depois, ou faça gargarejo com chá verde. Não vale tirar o alho da fórmula, é onde mora boa parte do efeito vasodilatador.' },
  { q: 'Posso adoçar com açúcar?',
    a: 'Não. Açúcar refinado eleva insulina, gera estresse oxidativo vascular e atrapalha exatamente o que o protocolo está tentando consertar. Se precisar adoçar, use 1 colher de chá de mel cru (preserva enzimas e tem ação anti-inflamatória) ou stevia natural. Evite adoçante artificial em uso crônico.' },
];

const TRILHA = [
  { to: '/soberania-organica/cozinha-funcional', titulo: 'Hub Cozinha Funcional', desc: 'Volte para a coleção completa de receitas ancestrais brasileiras validadas pelo SUS.', label: 'Ver coleção' },
  { to: '/soberania-organica/saude-preventiva', titulo: 'Saúde Preventiva', desc: 'Os pilares fisiológicos por trás da pressão arterial: sódio, sono, peso, microbiota e movimento diário.', label: 'Estudar fisiologia' },
  { to: '/soberania-organica/fitoterapia-aplicada', titulo: 'Fitoterapia Aplicada', desc: 'Aprofunde o uso clínico de plantas medicinais brasileiras: protocolos, doses, contraindicações.', label: 'Aprofundar' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[92vh] min-h-[680px] w-full overflow-hidden" style={{ backgroundColor: C.sage }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={imgHero}
          alt="Jarra de vidro com chá vermelho-rubi de hibisco fumegante ao lado de bulbos de alho descascados, cálices secos de hibisco vinho e limões taiti amarelo e verde sobre toalha de linho cor creme em luz natural suave"
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
            style={{ ...monoStyle, color: 'rgba(250,246,240,0.9)' }}>
            Soberania Orgânica › Cozinha Funcional
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(250,246,240,0.18)', border: '1px solid rgba(250,246,240,0.28)' }}>
          <HeartPulse size={14} style={{ color: C.cream }} />
          <span className="text-[11px] md:text-xs font-bold" style={{ ...monoStyle, color: C.cream }}>
            Tradição ancestral · Validada pelo SUS · RENISUS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8vw,7rem)] max-w-[18ch]"
          style={{ ...display, color: C.cream, textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
          O chá que apoia a{' '}
          <span style={{ ...editorial, color: C.terraSoft, textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}>
            pressão sem tarja preta.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(250,246,240,0.95)', fontFamily: "'Inter Tight', sans-serif", textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}>
          Hibisco, alho fresco e limão taiti. Mesmo mecanismo que inibidores da ECA e vasodilatadores, sem dependência. Apoio natural à hipertensão leve-moderada, três plantas com evidência clínica e dispensação no SUS.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: APPLE_EASE }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.9)' }}>
            <Clock size={14} style={{ color: C.terraSoft }} /> 20 min de preparo
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.9)' }}>
            <Users size={14} style={{ color: C.terraSoft }} /> 1 litro · 4 dias
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.9)' }}>
            <BookOpen size={14} style={{ color: C.terraSoft }} /> RENISUS · 7 referências
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function ChaPressaoHibisco() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Chá de Hibisco, Alho e Limão para Pressão Alta (sem álcool) | Lord Junnior</title>
        <meta name="description" content="Receita ancestral brasileira para apoio natural à hipertensão leve-moderada: hibisco, alho fresco e limão taiti. Plantas listadas na RENISUS, com evidência clínica em meta-análises do PubMed." />
        <link rel="canonical" href="https://www.lordjunnior.com.br/soberania-organica/cozinha-funcional/cha-pressao-hibisco" />
        <meta property="og:title" content="O chá ancestral que apoia a pressão arterial, sem tarja preta" />
        <meta property="og:description" content="Hibisco + alho + limão. Mesmo mecanismo dos inibidores da ECA, sem dependência. Tradição com PubMed do lado." />
        <meta property="og:image" content="https://www.lordjunnior.com.br/og/cha-pressao-hibisco.jpg" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <html lang="pt-BR" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: 'Chá Ancestral de Hibisco, Alho e Limão para Apoio à Pressão Arterial',
            author: { '@type': 'Person', name: 'Lord Junnior' },
            description: 'Receita ancestral brasileira sem álcool, com hibisco, alho fresco e limão taiti, para apoio à hipertensão leve-moderada. Validada pela RENISUS e por meta-análises clínicas.',
            recipeYield: '1 litro · 4 dias',
            prepTime: 'PT5M', cookTime: 'PT15M', totalTime: 'PT20M',
            recipeCategory: 'Fitoterápico ancestral cardiovascular',
            recipeCuisine: 'Indígena e popular brasileira',
            keywords: 'hibisco, alho, limão, pressão alta, hipertensão, RENISUS, Farmácia Viva, fitoterapia brasileira, sem álcool',
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
                Antes da losartana,{' '}
                <span style={{ ...editorial, color: C.terracotta }}>existia a flor do sangue.</span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                <p>
                  Pressão alta é a doença crônica mais prevalente do Brasil, atinge mais de <strong style={{ color: C.sage }}>30% dos adultos</strong> e é o principal fator de risco para infarto e AVC. A indústria farmacêutica vende bilhões em <strong style={{ color: C.terracotta }}>losartana, hidroclorotiazida e enalapril</strong> todo ano, e o hipertenso brasileiro é cliente para a vida toda.
                </p>
                <p>
                  Antes desse mercado existir, vovó já tomava chá de hibisco e mastigava dente de alho cru de manhã. Não por ignorância: porque <strong style={{ color: C.sage }}>funciona</strong>. Hibisco inibe a mesma enzima conversora de angiotensina que o captopril ataca. Alho aumenta o óxido nítrico que o sildenafil estimula. Limão protege o endotélio. A diferença é que o conhecimento estava com o povo, não no folheto da Pfizer.
                </p>
                <p>
                  Em 2006 o próprio Ministério da Saúde formalizou o que já era saber popular, na <strong style={{ color: C.sage }}>Política Nacional de Plantas Medicinais e Fitoterápicos</strong>. <strong style={{ color: C.terracotta }}>Hibiscus sabdariffa</strong> entrou na <strong style={{ color: C.sage }}>RENISUS</strong>, a lista oficial das 71 plantas reconhecidas pelo SUS. Mais de <strong style={{ color: C.terracotta }}>600 Farmácias Vivas</strong> espalhadas pela rede pública dispensam essas plantas hoje.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: `3px solid ${C.terracotta}`, color: C.sage, ...editorial }}>
                  Não é "chazinho para pressão". É um protocolo etnofarmacológico, com PubMed do lado e RENISUS no rodapé. Tradição com nome científico.
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
                  <p className="text-sm mb-8" style={{ color: C.inkSoft }}>1 litro · uso de 4 dias</p>
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
                <p className="text-sm mb-10" style={{ color: C.inkSoft }}>20 minutos do início ao fim</p>

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

        {/* CAPÍTULO 3, DUAS VERSÕES */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 03 · Duas versões</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                Chá diário{' '}
                <span style={{ ...editorial, color: C.terracotta }}>ou concentrado.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: C.inkSoft }}>
                Duas formas seguras, sem álcool, da mesma fórmula. O chá é a versão estudada em ensaios clínicos. O concentrado é a forma prática para quem trabalha fora ou viaja muito.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {VARIACOES.map((v, i) => {
                const isTerra = v.cor === 'terra';
                const accent = isTerra ? C.terracotta : C.sage;
                return (
                  <motion.div key={i} {...fade(i * 0.1)} className="p-8 md:p-10 rounded-3xl"
                    style={{ backgroundColor: isTerra ? '#fff8ef' : C.sand, border: `1px solid ${C.borderLight}` }}>
                    <v.icon size={32} style={{ color: accent }} className="mb-6" />
                    <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: accent }}>{v.sub}</p>
                    <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>{v.titulo}</h3>
                    <ul className="space-y-4 text-base md:text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                      {v.pontos.map((p, j) => (
                        <li key={j} className="flex gap-3"><span style={{ color: accent }}>·</span> {p}</li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
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
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> 250 ml 2x ao dia: manhã em jejum e fim de tarde</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Sempre longe das refeições principais</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Medir pressão 2x/dia nas primeiras 2 semanas</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Reduzir sal industrializado, andar 30 min/dia, dormir 7-8 h</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Ciclo de 4 a 6 semanas, depois pausa de 7 a 10 dias</li>
                </ul>
              </motion.div>

              <motion.div {...fade(0.1)} className="p-8 md:p-10 rounded-3xl"
                style={{ backgroundColor: C.sand, border: `1px solid ${C.borderLight}` }}>
                <AlertTriangle size={32} style={{ color: '#a64a1f' }} className="mb-6" />
                <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>O que não esperar</h3>
                <ul className="space-y-4 text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Cura de hipertensão estágio 2 ou 3 (acima de 160/100)</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Substituir losartana, hidroclorotiazida ou enalapril por conta própria</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Resultado em poucos dias, efeito aparece entre 2 e 6 semanas</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Funcionar tomando esporadicamente sem mudança de hábito</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Resolver causa secundária (renal, endócrina), investigue com médico</li>
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
                Documentos oficiais do SUS, diretrizes da Sociedade Brasileira de Cardiologia e meta-análises indexadas no PubMed. Sem folclore, sem chute.
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
                <span style={{ ...editorial, color: C.terracotta }}>antes de começar.</span>
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
                A pressão é só a porta.{' '}
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
              Não é "chazinho para pressão". É um protocolo etnofarmacológico, com PubMed do lado e RENISUS no rodapé.
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
                <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: C.terraSoft }}>Disclaimer · Saúde · YMYL</p>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.85)' }}>
                  Este conteúdo é educativo, baseado em saber tradicional indígena e popular brasileiro, em documentos oficiais do SUS (Política Nacional de Plantas Medicinais e Fitoterápicos, RENISUS, Farmácias Vivas), nas Diretrizes Brasileiras de Hipertensão Arterial e em literatura etnofarmacológica indexada. Não substitui exame, diagnóstico, prescrição ou acompanhamento médico. Hipertensão é doença grave e silenciosa. Quem usa anti-hipertensivo NUNCA deve suspender por conta própria. Gestantes, lactantes, crianças, hipotensos, portadores de cálculo renal, em uso de anticoagulante ou em pré-operatório devem buscar orientação profissional antes de iniciar.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}