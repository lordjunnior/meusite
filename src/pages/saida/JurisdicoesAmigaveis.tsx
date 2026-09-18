import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Trophy, Scale, Banknote, ShieldCheck, AlertTriangle,
  ArrowRight, ChevronDown, Compass, Bitcoin, Plane, MapPin,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/saida/jurisdicoes-hero-v2.webp';
import imgParaguai from '@/assets/saida/pais-paraguai.webp';
import imgDubai from '@/assets/saida/pais-dubai.webp';
import imgElSalvador from '@/assets/saida/pais-elsalvador.webp';
import imgUruguai from '@/assets/saida/pais-uruguai.webp';
import imgPanama from '@/assets/saida/pais-panama.webp';
import imgGeorgia from '@/assets/saida/pais-georgia.webp';
import imgPortugal from '@/assets/saida/pais-portugal.webp';
import imgMalasia from '@/assets/saida/pais-malasia.webp';
import imgSuica from '@/assets/saida/pais-suica.webp';
import imgSingapura from '@/assets/saida/pais-singapura.webp';

/**
 * /saida/jurisdicoes-amigaveis — Refatoração padrão Apple editorial.
 * Paleta: Sand (#f4ede4 / #ece2d3) + Teal profundo (#0e3b3a) + Cobre (#c4632a).
 * Fundo claro respirável, tipografia Inter Tight grande para 30+, ritmo de blocos variado.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

interface Pais {
  rank: number;
  nome: string;
  bandeira: string;
  custo: number; mobilidade: number; segJuridica: number; tributacao: number; cripto: number;
  total: number;
  imagem: string;
  perfilIdeal: string;
  fortes: string;
  fracos: string;
  custoVida: string;
  caminhoEntrada: string;
}

const PAISES: Pais[] = [
  { rank: 1, nome: 'Paraguai', bandeira: 'América do Sul', custo: 10, mobilidade: 6, segJuridica: 7, tributacao: 10, cripto: 9, total: 84, imagem: imgParaguai,
    perfilIdeal: 'Bitcoiner com baixo capital, urgência e tolerância a infraestrutura latina.',
    fortes: 'Residência permanente em 90 dias, regime territorial puro, custo absurdamente baixo, sem CFC, vizinho do Brasil.',
    fracos: 'Passaporte com mobilidade média (147 países), infraestrutura desigual, sistema bancário com limitações para volumes altos.',
    custoVida: 'USD 1.200 a 2.500/mês', caminhoEntrada: 'Residência permanente direta (Lei 6.984), naturalização em 3 anos.' },
  { rank: 2, nome: 'Emirados Árabes (Dubai)', bandeira: 'Oriente Médio', custo: 4, mobilidade: 9, segJuridica: 9, tributacao: 10, cripto: 10, total: 82, imagem: imgDubai,
    perfilIdeal: 'Operador com capital, foco em cripto profissional e necessidade de banking premium.',
    fortes: 'Zero imposto sobre renda pessoal, regulação cripto madura via VARA, banking de elite, hub aéreo global.',
    fracos: 'Custo de vida alto, cultura conservadora, dependência política do regime, sem caminho real para cidadania.',
    custoVida: 'USD 3.500 a 8.000/mês', caminhoEntrada: 'Golden Visa por investimento, freelance permit, ou empresa em free zone.' },
  { rank: 3, nome: 'El Salvador', bandeira: 'América Central', custo: 8, mobilidade: 5, segJuridica: 7, tributacao: 9, cripto: 10, total: 78, imagem: imgElSalvador,
    perfilIdeal: 'Bitcoiner ideológico que quer viver em país onde Bitcoin é moeda legal.',
    fortes: 'Bitcoin como curso legal desde 2021, zero imposto sobre BTC, programa Freedom Visa por 1 BTC, comunidade ativa.',
    fracos: 'Passaporte fraco (134 países), infraestrutura em construção, dependência da figura presidencial.',
    custoVida: 'USD 1.500 a 3.000/mês', caminhoEntrada: 'Freedom Visa (1 BTC reembolsável), residência por investimento, naturalização em 5 anos.' },
  { rank: 4, nome: 'Uruguai', bandeira: 'América do Sul', custo: 6, mobilidade: 8, segJuridica: 10, tributacao: 9, cripto: 7, total: 78, imagem: imgUruguai,
    perfilIdeal: 'Família que prioriza estabilidade institucional e qualidade de vida sobre custo.',
    fortes: 'Democracia mais sólida da América Latina, tax holiday de 11 anos, sem CFC, banco local sólido.',
    fracos: 'Custo de vida moderado-alto, mercado pequeno, banking local conservador com cripto.',
    custoVida: 'USD 2.500 a 4.500/mês', caminhoEntrada: 'Residência fiscal por investimento (USD 525 mil em imóvel) ou renda comprovada.' },
  { rank: 5, nome: 'Panamá', bandeira: 'América Central', custo: 7, mobilidade: 7, segJuridica: 8, tributacao: 9, cripto: 7, total: 77, imagem: imgPanama,
    perfilIdeal: 'Empresário com necessidade de offshore + residência integrados.',
    fortes: 'Regime territorial, hub financeiro reconhecido, dolarização (USD oficial), Friendly Nations Visa acessível.',
    fracos: 'Pressão internacional após Panama Papers, banking fica mais restritivo a cada ano, custo médio.',
    custoVida: 'USD 1.800 a 3.500/mês', caminhoEntrada: 'Friendly Nations Visa (depósito + atividade econômica) ou Pensionado.' },
  { rank: 6, nome: 'Geórgia', bandeira: 'Cáucaso/Europa', custo: 9, mobilidade: 7, segJuridica: 8, tributacao: 10, cripto: 7, total: 76, imagem: imgGeorgia,
    perfilIdeal: 'Nômade digital ou trader de cripto com baixo capital buscando Europa.',
    fortes: 'Visto de turismo de 1 ano para brasileiros, conta bancária aberta no mesmo dia, regime territorial HNWI, baixíssimo custo.',
    fracos: 'Tensão geopolítica com Rússia, mobilidade do passaporte média (115 países), idioma e alfabeto desafiadores.',
    custoVida: 'USD 1.000 a 2.500/mês', caminhoEntrada: 'Entrada turística + extensão, programa HNWI por patrimônio comprovado.' },
  { rank: 7, nome: 'Portugal', bandeira: 'Europa (UE)', custo: 5, mobilidade: 10, segJuridica: 9, tributacao: 5, cripto: 7, total: 73, imagem: imgPortugal,
    perfilIdeal: 'Quem prioriza acesso à União Europeia e tem cidadania como objetivo final.',
    fortes: 'Passaporte UE pós-naturalização (top 3 mundial), CPLP acelera para 3 anos, cultura próxima ao Brasil.',
    fracos: 'NHR encerrado em 2024, IFICI mais restrito, golden visa imobiliário extinto, custo de vida em alta.',
    custoVida: 'USD 2.500 a 5.000/mês', caminhoEntrada: 'Visto D7 (renda passiva), D8 (nômade digital), D2 (empreendedor) ou Golden Visa via fundos.' },
  { rank: 8, nome: 'Malásia', bandeira: 'Sudeste Asiático', custo: 8, mobilidade: 8, segJuridica: 7, tributacao: 9, cripto: 6, total: 71, imagem: imgMalasia,
    perfilIdeal: 'Aposentado ou rentista que quer base asiática com inglês falado.',
    fortes: 'Regime territorial, programa MM2H consolidado, infraestrutura moderna, inglês como segunda língua oficial.',
    fracos: 'Requisitos do MM2H endurecidos em 2024 (depósito alto), banking conservador com cripto, instabilidade política periódica.',
    custoVida: 'USD 1.500 a 3.500/mês', caminhoEntrada: 'Malaysia My Second Home (MM2H) com depósito bancário e renda comprovada.' },
  { rank: 9, nome: 'Suíça', bandeira: 'Europa', custo: 1, mobilidade: 10, segJuridica: 10, tributacao: 4, cripto: 9, total: 70, imagem: imgSuica,
    perfilIdeal: 'Patrimônio elevado que prioriza preservação total e jurisdição neutra.',
    fortes: 'Estabilidade absoluta, banking de elite, regulação cripto avançada (Crypto Valley em Zug), passaporte top.',
    fracos: 'Custo de vida proibitivo, residência por lump-sum exige patrimônio alto, naturalização em 10 anos.',
    custoVida: 'USD 5.000 a 12.000/mês', caminhoEntrada: 'Lump-sum taxation (acordo fiscal cantonal), visto de trabalho qualificado, ou investimento alto.' },
  { rank: 10, nome: 'Singapura', bandeira: 'Sudeste Asiático', custo: 2, mobilidade: 10, segJuridica: 10, tributacao: 7, cripto: 8, total: 70, imagem: imgSingapura,
    perfilIdeal: 'Empresário tech ou family office com necessidade de hub asiático premium.',
    fortes: 'Estado de direito impecável, regulação cripto via MAS, hub financeiro asiático, passaporte mais forte do mundo.',
    fracos: 'Custo de vida absurdo, residência permanente extremamente seletiva, controle social rígido.',
    custoVida: 'USD 4.500 a 10.000/mês', caminhoEntrada: 'EntrePass (empreendedor), Tech.Pass, ou Global Investor Programme (SGD 10M+).' },
];

const CRITERIOS = [
  { icon: Banknote, titulo: 'Custo total de entrada', peso: '20%',
    descricao: 'Soma de todos os custos: visto, advogado, depósito bancário, investimento mínimo, taxas governamentais e custo de vida no primeiro ano. Mede acessibilidade real, não promessa de marketing.' },
  { icon: Plane, titulo: 'Mobilidade do passaporte', peso: '20%',
    descricao: 'Quantos países o documento final acessa sem visto, quanto tempo até obter cidadania (se aplicável), e se o caminho de naturalização é viável ou apenas teórico.' },
  { icon: Scale, titulo: 'Segurança jurídica', peso: '20%',
    descricao: 'Estabilidade institucional, força do Estado de Direito, histórico de respeito a contratos com estrangeiros, ausência de mudanças retroativas em programas de residência.' },
  { icon: ShieldCheck, titulo: 'Eficiência tributária', peso: '20%',
    descricao: 'Regime territorial vs. mundial, presença de CFC, tratado de bitributação com Brasil, isenções para holding longo, custo efetivo da carga tributária total.' },
  { icon: Bitcoin, titulo: 'Abertura cripto', peso: '20%',
    descricao: 'Existência de regulação clara para Bitcoin, banking que aceita transações cripto sem fechamento de conta, ambiente cultural pró-soberania financeira.' },
];

const ARMADILHAS = [
  { titulo: 'Escolher por preço, sofrer por décadas',
    detalhe: 'Paraguai é barato e funciona, mas se sua estratégia exige acesso UE, vai precisar repetir todo o processo em Portugal. Pense em 10 anos, não em 10 meses.' },
  { titulo: 'Acreditar em ranking de "passaporte mais forte"',
    detalhe: 'Henley Index mede acesso visa-free. Não mede tributação, segurança patrimonial nem facilidade real de obter. Singapura é top 1 e impossível para 99% das pessoas.' },
  { titulo: 'Não checar se sua cripto entra na conta local',
    detalhe: 'Banco de Portugal já fechou contas de Bitcoiners brasileiros. Banco de Dubai exige source of wealth detalhado para depósitos cripto. Verifique antes de mudar, não depois.' },
  { titulo: 'Ignorar o tratado de bitributação',
    detalhe: 'Sem tratado, você pode pagar imposto duas vezes durante a transição. Brasil tem tratado com Portugal, Itália, Argentina, Espanha, Emirados, mas não com Paraguai, Caribe, Geórgia.' },
  { titulo: 'Comprar imóvel em programa que mudou as regras',
    detalhe: 'Portugal extinguiu o Golden Visa imobiliário em 2023. Malta encerrou o CBI em 2025. Quem comprou pensando em cidadania ficou com imóvel sem benefício migratório.' },
  { titulo: 'Subestimar o impacto cultural e familiar',
    detalhe: 'Mudar país com filhos pequenos é diferente de mudar solteiro. Idioma, escola, rede social. Países latinos (Paraguai, Uruguai, Argentina) reduzem fricção. Asia é desafio.' },
];

const FAQ = [
  { q: 'Qual o melhor país para residência fiscal de Bitcoiner?',
    a: 'Não existe "melhor" universal. Para Bitcoiner com baixo capital e urgência: Paraguai. Para Bitcoiner profissional com banking premium: Emirados (Dubai). Para Bitcoiner ideológico: El Salvador. Para acesso UE: Portugal. Para preservação patrimonial máxima: Suíça. A escolha depende do seu perfil de capital, mobilidade desejada e tolerância cultural.' },
  { q: 'Posso ter residência fiscal em mais de um país?',
    a: 'Em tese, sim. Na prática, gera complexidade enorme. Cada país aplica seus critérios (183 dias, centro de interesses vitais, domicílio físico). Tratados de bitributação resolvem conflitos via "tie-breaker rules", mas um auditor agressivo pode contestar. Recomendação: uma residência fiscal clara, com domicílio físico real, e residências secundárias apenas para acesso operacional.' },
  { q: 'Paraguai vale a pena mesmo com passaporte fraco?',
    a: 'Vale para a maioria. O passaporte paraguaio acessa 147 países sem visto (incluindo todo Mercosul, Schengen, Reino Unido, Japão, Coreia do Sul). A força real do Paraguai é o regime tributário territorial puro, custo de entrada baixíssimo e proximidade física com o Brasil. Para quem quer segunda residência fiscal sem queimar capital, é a melhor relação custo-benefício do hemisfério.' },
  { q: 'Dubai realmente não tem nenhum imposto?',
    a: 'Não há imposto de renda pessoal, isso é verdade. Mas há corporate tax de 9% para empresas com lucro acima de AED 375 mil (USD 102 mil) desde 2023. VAT de 5% sobre consumo. Custos altos com housing, transporte e serviços compensam parte do "zero imposto". Ainda assim, para Bitcoiner com renda externa e operação cripto profissional, Dubai segue imbatível em eficiência tributária.' },
  { q: 'El Salvador é seguro? E a violência?',
    a: 'A política do Bukele reduziu drasticamente a violência desde 2022, com taxa de homicídios atual menor que vários estados brasileiros. Bairros como Santa Tecla, Antiguo Cuscatlán e Surf City (El Zonte) são seguros para estrangeiros. O risco principal não é mais segurança pessoal, é a dependência da figura presidencial e a possibilidade de mudança política após o mandato.' },
  { q: 'Portugal acabou ou ainda compensa?',
    a: 'O regime perdeu muito da atratividade após 2024 (NHR extinto, IFICI mais restrito, Golden Visa imobiliário encerrado). Ainda compensa para quem quer cidadania UE no longo prazo (5 anos via residência ou 3 via CPLP), tem renda passiva qualificada para D7, ou usa o Golden Visa via fundos. Para residência fiscal pura otimizada, há opções melhores hoje (Paraguai, Emirados).' },
  { q: 'O que é "tax holiday" do Uruguai?',
    a: 'Regime que isenta novos residentes fiscais uruguaios do imposto sobre renda externa por 11 anos consecutivos. Após esse período, o regime territorial padrão se aplica (renda externa segue parcialmente isenta sob certas condições). É um dos benefícios mais agressivos do mundo para quem busca preservação patrimonial estável e democrática.' },
  { q: 'Por onde começar se nunca saí do Brasil?',
    a: 'Três passos: (1) Tire o passaporte brasileiro (se ainda não tem) e visite presencialmente 2 países da sua lista curta antes de decidir. (2) Estude o tratado de bitributação Brasil-país-alvo no site da Receita Federal. (3) Leia o guia de Residência Fiscal e Segundo Passaporte deste hub para entender a sequência de bandeiras. Não escolha jurisdição por TikTok ou influencer.' },
];

const MATRIZ = [
  { perfil: 'Capital baixo (até R$ 80 mil), urgência, tolerância latina', resposta: 'Paraguai. Residência permanente em 90 dias, sem CFC, custo absurdamente baixo.' },
  { perfil: 'Bitcoiner profissional com volume, banking premium, ambiente de trabalho global', resposta: 'Emirados (Dubai). Zero imposto pessoal, regulação VARA, hub aéreo mundial.' },
  { perfil: 'Bitcoiner ideológico, vida simples, comunidade Bitcoin', resposta: 'El Salvador. Bitcoin como moeda legal, Freedom Visa por 1 BTC reembolsável.' },
  { perfil: 'Família com filhos, prioridade em estabilidade institucional', resposta: 'Uruguai. Tax holiday de 11 anos, democracia mais sólida da América Latina.' },
  { perfil: 'Empresário com necessidade de offshore + residência integrados', resposta: 'Panamá. Friendly Nations Visa, dolarização, hub financeiro reconhecido.' },
  { perfil: 'Nômade digital trader cripto com baixo capital, foco europeu', resposta: 'Geórgia. Conta bancária aberta no dia, regime HNWI, custo baixíssimo.' },
  { perfil: 'Quer cidadania UE no longo prazo, valoriza acesso Schengen', resposta: 'Portugal. Visto D7 ou D8, naturalização em 5 anos, em 3 via CPLP.' },
  { perfil: 'Aposentado ou rentista buscando base asiática com inglês', resposta: 'Malásia. Programa MM2H consolidado, regime territorial, infraestrutura moderna.' },
  { perfil: 'Patrimônio elevado (8+ dígitos USD), preservação total prioritária', resposta: 'Suíça ou Singapura. Banking de elite, jurisdições neutras, estado de direito impecável.' },
];

const CHECKLIST = [
  'Definir perfil real: capital disponível (em USD), prazo desejado, presença ou não de família em deslocamento.',
  'Listar 3 países da matriz de decisão compatíveis com o perfil. Eliminar emocionalmente, ranquear por critérios.',
  'Estudar tratado de bitributação Brasil-país-alvo no site oficial da Receita Federal (gov.br/receitafederal).',
  'Visitar presencialmente os 2 finalistas, mínimo 14 dias cada, fora de temporada turística.',
  'Conversar com 3 brasileiros que já residem no país-alvo há mais de 2 anos (não influencer pago).',
  'Validar acesso bancário cripto: testar abertura de conta com declaração de fonte de renda em Bitcoin.',
  'Orçar advogado tributarista local credenciado na ordem do país (não despachante intermediário).',
  'Calcular custo total realista: visto + advogado + 12 meses de vida + traduções + emergência (mínimo USD 30 mil).',
  'Decidir e comprometer prazo: data de visto, data de saída do Brasil, data de DSD.',
  'Iniciar a Bandeira 01 (Segundo Passaporte) e Bandeira 02 (Residência Fiscal) em paralelo.',
];

// ─── Hero parallax full-bleed ───
function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: '#0e3b3a' }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={heroImg} alt="" className="w-full h-full object-cover scale-110"
          style={{ filter: 'saturate(1.05) contrast(1.02)' }} loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.35) 40%, rgba(244,237,228,0.05) 70%, #f4ede4 100%)',
        }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28"
        style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(244,237,228,0.15)', border: '1px solid rgba(244,237,228,0.25)' }}>
          <Compass size={16} style={{ color: '#f4ede4' }} />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#f4ede4' }}>
            Cartografia Soberana · 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[18ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}>
          Dez países.<br/>
          <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(255,179,122,0.45), 0 0 80px rgba(255,179,122,0.25)' }}>
            Zero hipocrisia.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
          O ranking real de para onde ir em 2026 quando o objetivo é soberania, não fuga emocional. Cinco critérios objetivos, custos auditáveis e armadilhas que ninguém posta no Instagram.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Score bar coerente ───
function ScoreBar({ label, v }: { label: string; v: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs md:text-sm font-medium uppercase tracking-wider w-28 shrink-0" style={{ color: '#5a6664', fontFamily: "'Inter Tight', sans-serif" }}>{label}</span>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#e0d4c2' }}>
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${v * 10}%` }} viewport={{ once: true }}
          transition={{ duration: 1, ease: APPLE_EASE }}
          className="h-full rounded-full" style={{ background: 'linear-gradient(90deg,#0e3b3a,#c4632a)' }} />
      </div>
      <span className="font-bold text-base md:text-lg w-7 text-right" style={{ color: '#0e3b3a', fontFamily: "'Inter Tight', sans-serif" }}>{v}</span>
    </div>
  );
}

export default function JurisdicoesAmigaveis() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/saida/jurisdicoes-amigaveis"
        custom={{
          title: 'Jurisdições Amigáveis: Ranking 2026 dos 10 Melhores Países',
          description: 'Ranking objetivo dos 10 melhores países para residência fiscal e segunda bandeira em 2026: Paraguai, Dubai, El Salvador, Uruguai, Portugal, Geórgia. Critérios e custos reais.',
          canonical: 'https://lordjunnior.com.br/saida/jurisdicoes-amigaveis',
          primaryKeyword: 'jurisdições amigáveis',
          lsiKeywords: ['melhores países para residência fiscal', 'ranking jurisdições 2026', 'paraíso fiscal Bitcoin', 'paraguai vs uruguai', 'dubai golden visa', 'el salvador bitcoin'],
          longTailKeywords: ['melhor país para residência fiscal brasileiro 2026', 'jurisdições amigáveis bitcoin', 'comparativo paraguai uruguai panama', 'morar em dubai como bitcoiner'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Saída & Infraestrutura', url: '/saida' },
            { name: 'Jurisdições Amigáveis', url: '/saida/jurisdicoes-amigaveis' },
          ],
          schemaType: 'Article',
          articleSection: 'Saída & Infraestrutura',
          relatedPages: ['/saida', '/saida/segundo-passaporte', '/saida/residencia-fiscal', '/teoria-das-bandeiras', '/palau-digital-residency'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      {/* Fundo claro respirável (sand) */}
      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — Manifesto */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c4632a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>O ponto de partida honesto</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Não existe melhor país.{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Existe melhor para você.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Toda lista que afirma "o melhor país para morar" está vendendo alguma coisa. Imóvel em Lisboa, consultoria em Dubai, curso de "blueprint internacional". A verdade é que a melhor jurisdição depende do seu perfil de capital, da sua urgência, da sua estratégia de longo prazo e da tolerância cultural da sua família.
                </p>
                <p>
                  Este ranking foi montado com cinco critérios objetivos, cada um valendo 20% do score final: custo total de entrada, mobilidade do passaporte, segurança jurídica, eficiência tributária e abertura cripto. Cada país recebe nota de 1 a 10 em cada critério. Soma simples. Sem opinião editorial, sem patrocínio, sem afiliado.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #c4632a', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  A bandeira certa é a que sua vida real consegue carregar por dez anos.
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — CRITÉRIOS (faixa teal escura, alto contraste) */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 02 · Metodologia</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Cinco critérios.{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Vinte por cento cada.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(244,237,228,0.75)' }}>
                Score final de 0 a 100. Países classificados objetivamente, sem patrocínio.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(244,237,228,0.15)' }}>
              {CRITERIOS.map((c, i) => (
                <motion.div key={c.titulo} {...fade(i * 0.06)}
                  className="group relative p-8 md:p-10 transition-all duration-500"
                  style={{ backgroundColor: '#0e3b3a' }}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-xl transition-transform group-hover:scale-110 duration-500"
                      style={{ backgroundColor: 'rgba(232,163,107,0.15)', border: '1px solid rgba(232,163,107,0.3)' }}>
                      <c.icon size={22} style={{ color: '#e8a36b' }} />
                    </div>
                    <span className="text-2xl font-black" style={{ color: '#e8a36b' }}>{c.peso}</span>
                  </div>
                  <h3 className="text-2xl md:text-[1.7rem] font-black leading-tight mb-4" style={{ color: '#f4ede4' }}>
                    {c.titulo}
                  </h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.7)' }}>{c.descricao}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — RANKING (cards alternados grandes, com IMAGEM por país) */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 03 · Ranking</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Dez posições.{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Cada uma com rosto.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: '#2d3a37' }}>
                Ordenados por score total. Empates desempatados pelo critério de eficiência tributária.
              </p>
            </motion.div>

            <div className="space-y-16 md:space-y-24">
              {PAISES.map((p, i) => {
                const reversed = i % 2 === 1;
                return (
                  <motion.article key={p.nome} {...fade(0)}
                    className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    {/* IMAGEM */}
                    <div className={`lg:col-span-6 ${reversed ? 'lg:order-2' : ''}`}>
                      <div className="relative h-[360px] md:h-[460px] lg:h-[560px] overflow-hidden rounded-3xl group">
                        <img src={p.imagem} alt={`${p.nome}, jurisdição amigável para residência fiscal de Bitcoiner brasileiro em 2026`}
                          loading="lazy" width={1920} height={1080}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(14,59,58,0.85) 100%)' }} />
                        <div className="absolute top-6 left-6 flex items-center gap-3">
                          <span className="px-4 py-2 rounded-full text-xs font-bold tracking-[0.25em] uppercase backdrop-blur-md"
                            style={{ backgroundColor: 'rgba(244,237,228,0.2)', color: '#f4ede4', border: '1px solid rgba(244,237,228,0.3)' }}>
                            <MapPin size={11} className="inline mr-2" />{p.bandeira}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between">
                          <div>
                            <div className="text-[clamp(4rem,9vw,8rem)] font-black leading-none" style={{ color: '#f4ede4', fontFamily: "'Inter Tight', sans-serif" }}>
                              {String(p.rank).padStart(2, '0')}
                            </div>
                            <div className="text-2xl md:text-3xl font-bold mt-2" style={{ color: '#e8a36b' }}>{p.nome}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: 'rgba(244,237,228,0.7)' }}>Score</div>
                            <div className="text-5xl md:text-6xl font-black" style={{ color: '#f4ede4' }}>{p.total}</div>
                            <div className="text-xs font-bold" style={{ color: 'rgba(244,237,228,0.6)' }}>/100</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DETALHES */}
                    <div className={`lg:col-span-6 flex flex-col justify-center ${reversed ? 'lg:order-1' : ''}`}>
                      <div className="space-y-7">
                        <div className="space-y-3">
                          <ScoreBar label="Custo" v={p.custo} />
                          <ScoreBar label="Mobilidade" v={p.mobilidade} />
                          <ScoreBar label="Seg. Jurídica" v={p.segJuridica} />
                          <ScoreBar label="Tributação" v={p.tributacao} />
                          <ScoreBar label="Cripto" v={p.cripto} />
                        </div>

                        <div className="pt-6 border-t" style={{ borderColor: '#d4c5ad' }}>
                          <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#c4632a' }}>Perfil ideal</p>
                          <p className="text-xl md:text-2xl leading-[1.4] font-light italic" style={{ color: '#0e3b3a', fontFamily: "'Playfair Display', serif" }}>
                            {p.perfilIdeal}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#0e3b3a' }}>Pontos fortes</p>
                            <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{p.fortes}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#a64a1f' }}>Pontos fracos</p>
                            <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{p.fracos}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t" style={{ borderColor: '#d4c5ad' }}>
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-1" style={{ color: '#5a6664' }}>Custo de vida</p>
                            <p className="text-xl md:text-2xl font-bold" style={{ color: '#0e3b3a' }}>{p.custoVida}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-1" style={{ color: '#5a6664' }}>Caminho de entrada</p>
                            <p className="text-base md:text-lg leading-snug" style={{ color: '#2d3a37' }}>{p.caminhoEntrada}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4 — MATRIZ DE DECISÃO (faixa creme escura, contraste) */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 04 · Matriz</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Em vez de qual o melhor,{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  pergunte qual encaixa.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {MATRIZ.map((linha, i) => (
                <motion.div key={i} {...fade(i * 0.04)}
                  className="grid md:grid-cols-12 gap-6 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1"
                  style={{ backgroundColor: '#f4ede4', boxShadow: '0 1px 3px rgba(14,59,58,0.06)' }}>
                  <div className="md:col-span-5">
                    <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#5a6664' }}>Se você é</p>
                    <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: '#2d3a37' }}>{linha.perfil}</p>
                  </div>
                  <div className="md:col-span-7 md:pl-8 md:border-l" style={{ borderColor: '#d4c5ad' }}>
                    <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#c4632a' }}>Sua bandeira</p>
                    <p className="text-lg md:text-xl leading-relaxed font-medium" style={{ color: '#0e3b3a' }}>{linha.resposta}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5 — ARMADILHAS (cobre quente) */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(196,99,42,0.12)', color: '#a64a1f' }}>
                <AlertTriangle size={14} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Capítulo 05 · Armadilhas</span>
              </div>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Seis armadilhas{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  que custam anos de vida.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {ARMADILHAS.map((arm, i) => (
                <motion.div key={arm.titulo} {...fade(i * 0.05)}
                  className="p-8 md:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: '#fff8ef', border: '1px solid #ead9c1' }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="p-2.5 rounded-xl shrink-0" style={{ backgroundColor: 'rgba(196,99,42,0.12)' }}>
                      <AlertTriangle size={20} style={{ color: '#c4632a' }} />
                    </div>
                    <h3 className="text-2xl md:text-[1.65rem] font-bold leading-[1.2]" style={{ color: '#0e3b3a' }}>
                      {arm.titulo}
                    </h3>
                  </div>
                  <p className="text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{arm.detalhe}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6 — CHECKLIST */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1200px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 06 · Operação</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Checklist de escolha{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  em 30 dias.
                </span>
              </h2>
            </motion.div>

            <ol className="space-y-4">
              {CHECKLIST.map((item, i) => (
                <motion.li key={i} {...fade(i * 0.04)}
                  className="flex items-start gap-6 p-6 md:p-7 rounded-2xl transition-all duration-500 hover:translate-x-2"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(244,237,228,0.12)' }}>
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl font-black"
                    style={{ backgroundColor: '#e8a36b', color: '#0e3b3a' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-lg md:text-xl leading-relaxed font-light pt-1.5" style={{ color: 'rgba(244,237,228,0.92)' }}>{item}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Dúvidas operacionais</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Perguntas que separam{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  quem age de quem só assiste.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((item, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)}
                    className="rounded-2xl overflow-hidden transition-all"
                    style={{ backgroundColor: open ? '#fff8ef' : '#f4ede4', border: `1px solid ${open ? '#c4632a' : '#d4c5ad'}` }}>
                    <button onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-6"
                      aria-expanded={open}>
                      <span className="text-lg md:text-2xl font-semibold leading-snug pr-4" style={{ color: '#0e3b3a' }}>{item.q}</span>
                      <ChevronDown size={26} className="shrink-0 mt-1 transition-transform duration-500"
                        style={{ color: '#c4632a', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.4, ease: APPLE_EASE }} className="overflow-hidden">
                        <div className="px-6 md:px-8 pb-8 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
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

        {/* CTA FECHAMENTO */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <motion.div {...fade(0)} className="max-w-3xl mx-auto text-center">
            <Trophy size={40} className="mx-auto mb-8" style={{ color: '#c4632a' }} />
            <p className="text-2xl md:text-4xl leading-[1.4] font-light mb-12"
              style={{ color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
              País não se escolhe por sentimento. Se escolhe por matemática, por estratégia, por custo de oportunidade ao longo de uma década inteira.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/saida/segundo-passaporte"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
                Bandeira 01: Passaporte <ArrowRight size={18} />
              </Link>
              <Link to="/saida/residencia-fiscal"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: 'transparent', color: '#0e3b3a', border: '2px solid #0e3b3a' }}>
                Bandeira 02: Residência Fiscal
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
