import { useEffect, useState } from 'react';
import RegraZeroMobilidade from '@/components/RegraZeroMobilidade';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Globe, FileCheck, Clock, Banknote, ShieldCheck,
  AlertTriangle, ChevronDown, ArrowRight, Plane, Fingerprint,
  Building2, Briefcase, Users, Coins, ExternalLink,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/chile/chile-hero.webp';
import registroImg from '@/assets/chile/chile-registro-civil.webp';
import documentosImg from '@/assets/chile/chile-documentos.webp';
import vidaImg from '@/assets/chile/chile-vida.webp';

/**
 * /saida/cedula-residencia-chile
 * Paleta temática Chile: Sand #f4ede4 / Deep Andes Teal #14424a / Cobre andino #b45836.
 * Padrão editorial Apple, alternância clara/escura, hero 88vh.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const ETAPAS = [
  {
    n: '01',
    titulo: 'Solicitação online da residência temporária',
    icon: Globe,
    descricao:
      'Tudo começa no portal oficial tramites.extranjeria.gob.cl. Você cria conta, escolhe a categoria de visto que mais encaixa no seu caso (trabalho, prestação de serviços, reunião familiar, investidor, rentista) e faz upload de passaporte válido, certidão de nascimento apostilada, comprovante da atividade que vai exercer no Chile e foto 3x4. Diferente do Paraguai ou da Argentina, aqui a etapa documental fica 100% remota.',
  },
  {
    n: '02',
    titulo: 'Aprovação da residência temporária',
    icon: FileCheck,
    descricao:
      'A migração chilena analisa o pedido e devolve a aprovação no painel do próprio portal. O tempo varia conforme categoria e demanda, mas é processo padronizado, sem despachante obrigatório. A partir da aprovação começa a contar uma janela curta: você tem 30 dias corridos para registrar a cédula chilena, sob pena de perder o slot.',
  },
  {
    n: '03',
    titulo: 'Agendamento da cédula chilena (RUN)',
    icon: Fingerprint,
    descricao:
      'Com a residência aprovada, você agenda horário no Registro Civil chileno. Aqui sim a presença física é obrigatória. A cédula equivale ao nosso RG, traz seu RUN (Rol Único Nacional), assinatura e impressão digital, e é o documento que destrava banco, telefonia, contrato de aluguel e atendimento médico no país.',
  },
  {
    n: '04',
    titulo: 'Coleta biométrica e emissão',
    icon: Building2,
    descricao:
      'No Registro Civil, foto, digitais e assinatura digital são coletadas em poucos minutos. Em algumas semanas você recebe a cédula temporária válida pelo período do visto. Depois de 24 meses no país sem nenhum registro criminal, é possível trocar pela cédula definitiva. A partir dela, renovação simples a cada 5 anos, como qualquer cédula nacional.',
  },
];

const CATEGORIAS = [
  {
    nome: 'Trabalho com contrato',
    icon: Briefcase,
    descricao:
      'Vínculo formal com empresa chilena. Caminho mais rápido para quem já tem oferta. Requer carta da empresa e contrato registrado.',
  },
  {
    nome: 'Prestação de serviços',
    icon: Globe,
    descricao:
      'Profissional autônomo, consultor ou freelancer com clientes chilenos ou globais. Exige comprovação da atividade e renda.',
  },
  {
    nome: 'Reunião familiar',
    icon: Users,
    descricao:
      'Cônjuge, filho ou pai de cidadão chileno ou de residente permanente. Documentação familiar apostilada é o ponto crítico.',
  },
  {
    nome: 'Investidor',
    icon: Banknote,
    descricao:
      'Quem entra com capital no Chile via abertura de empresa, imóvel ou aporte produtivo. Exige plano de negócios e prova de origem dos recursos.',
  },
  {
    nome: 'Rentista',
    icon: Coins,
    descricao:
      'Renda passiva comprovada e estável (aluguéis, dividendos, aposentadoria internacional). Caminho silencioso para quem já vive de renda.',
  },
];

const CUSTOS = [
  { item: 'Taxa de residência temporária', valor: 'US$ 20 a US$ 90' },
  { item: 'Emissão da cédula chilena (RUN)', valor: 'CLP 4.270 (~US$ 5)' },
  { item: 'Apostila + tradução juramentada', valor: 'US$ 60 a US$ 200' },
  { item: 'Passagem Brasil → Santiago', valor: 'BRL 1.800 a 3.500' },
  { item: 'Total mínimo realista por pessoa', valor: 'US$ 20 a US$ 120 em taxas + viagem' },
];

const VANTAGENS = [
  {
    titulo: 'Isenção fiscal de até 6 anos',
    descricao:
      'Para algumas profissões, o Chile concede isenção de imposto sobre renda estrangeira por 3 anos, renovável por mais 3. Total de 6 anos pagando zero sobre o que entra de fora. Esse é o ponto que praticamente ninguém comenta no YouTube.',
  },
  {
    titulo: 'Caminho para cidadania chilena',
    descricao:
      'Após período de residência contínua e sem antecedentes, é possível aplicar para a nacionalidade. O passaporte chileno está entre os mais fortes da América Latina em mobilidade global.',
  },
  {
    titulo: 'Estabilidade institucional rara na região',
    descricao:
      'Chile tem a moeda mais sólida do continente, banco central independente e tradição de respeito a contratos. Diferente de vizinhos voláteis, aqui regra do jogo muda com aviso, não com decreto noturno.',
  },
  {
    titulo: 'Banking funcional para estrangeiros',
    descricao:
      'Com cédula chilena (RUN) você abre conta nos bancos locais, opera em pesos e dólares e tem acesso a cartões internacionais. Sem cédula, qualquer estrangeiro vira cliente de segunda classe.',
  },
];

const ARMADILHAS = [
  'Pedir a cédula fora do prazo de 30 dias após aprovação da residência. Quem perde essa janela cai em fila administrativa e precisa refazer pedidos.',
  'Subir documentos em português sem apostila de Haia e sem tradução juramentada. O sistema rejeita silenciosamente, e você só descobre semanas depois.',
  'Escolher a categoria de visto errada por economizar tempo. Errar a categoria significa indeferimento, e o histórico do indeferimento atrapalha pedidos futuros.',
  'Acreditar que residência aprovada equivale a cidadania. Residência é permissão revogável. Cidadania exige tempo de moradia efetiva, prova de vínculos e ficha limpa.',
  'Cair em despachante que cobra milhares de dólares pelo que o próprio portal faz de graça. O Chile foi desenhado para que estrangeiros consigam fazer sozinhos.',
];

const FAQ = [
  {
    q: 'Posso começar o processo de residência no Chile sem sair do Brasil?',
    a: 'Sim. Diferente do Paraguai, Argentina e da maioria dos países da América Latina, o Chile permite que toda a etapa documental seja feita online pelo portal tramites.extranjeria.gob.cl. Só é necessário viajar para a coleta biométrica e retirada da cédula, depois que a residência temporária já estiver aprovada.',
  },
  {
    q: 'Qual o custo total realista para tirar cédula e residência no Chile?',
    a: 'Em taxas oficiais, entre US$ 20 e US$ 120 por pessoa, dependendo da categoria do visto. Somando apostila, tradução juramentada e a viagem obrigatória para a coleta biométrica, o investimento total fica na faixa de US$ 800 a US$ 1.800 por pessoa, sem contar moradia no período.',
  },
  {
    q: 'Qual a diferença entre residência temporária e residência definitiva no Chile?',
    a: 'A temporária tem validade limitada (geralmente 1 ou 2 anos) e está atrelada ao motivo do visto. Depois de 24 meses morando efetivamente no país, sem nenhum registro criminal, é possível trocar pela definitiva, que não precisa de motivo e renova como cédula comum a cada 5 anos.',
  },
  {
    q: 'O Chile cobra imposto sobre criptoativos comprados fora do país?',
    a: 'O Chile tributa renda mundial após determinado período de residência fiscal. Para algumas categorias profissionais, existe isenção de tributação sobre renda estrangeira por até 3 anos, renovável por mais 3, totalizando 6 anos de planejamento limpo. A análise deve ser feita caso a caso com contador chileno antes de mover patrimônio.',
  },
  {
    q: 'Posso pedir a cidadania chilena depois?',
    a: 'Sim. Após período de residência permanente, com vínculos comprovados e ficha limpa, é possível aplicar para a nacionalidade chilena e obter o passaporte. Para muitos brasileiros que querem segunda bandeira sem investimento milionário, esse é o caminho mais limpo da região.',
  },
  {
    q: 'Por que o Chile está sendo escolhido em vez de Portugal?',
    a: 'Custo de entrada menor, processo majoritariamente online, ausência de fila de meses para agendamento consular, moeda dolarizada na prática e regime fiscal mais previsível do que o português pós Golden Visa. Para o público que busca soberania financeira sem expor todo o patrimônio à União Europeia, o Chile virou rota lógica.',
  },
  {
    q: 'O que acontece se eu cometer um crime durante a residência temporária?',
    a: 'Qualquer condenação criminal trava a conversão para residência definitiva e pode resultar em expulsão. A cédula temporária é permissão condicionada à boa conduta. A regra é simples: ficha limpa do início ao fim, sem exceção.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Santiago do Chile ao entardecer com a Cordilheira dos Andes ao fundo, capital da nova rota de residência para brasileiros"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,66,74,0.55) 0%, rgba(20,66,74,0.35) 40%, rgba(20,66,74,0.88) 100%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(244,237,228,0.15)',
              color: '#f4ede4',
              border: '1px solid rgba(244,237,228,0.3)',
            }}
          >
            <Plane size={11} className="inline mr-2" /> Saída & Infraestrutura · Chile
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[18ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Cédula e residência no Chile.{' '}
          <span
            style={{
              color: '#ffb37a',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow:
                '0 0 40px rgba(255,179,122,0.45), 0 0 80px rgba(255,179,122,0.25)',
            }}
          >
            Comece online, termine andino.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{
            color: 'rgba(244,237,228,0.85)',
            fontFamily: "'Inter Tight', sans-serif",
          }}
        >
          O passo a passo real para tirar sua cédula chilena (RUN) e residência temporária, com possibilidade de iniciar tudo pelo portal oficial sem sair do Brasil. Custo total entre US$ 20 e US$ 120 em taxas, sem despachante e sem fila de consulado.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function CedulaResidenciaChile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/saida/cedula-residencia-chile"
        custom={{
          title: 'Cédula e Residência no Chile 2026: Guia 100% Online',
          description:
            'Como tirar cédula chilena (RUN) e residência temporária em 2026 começando online no portal oficial. Custos reais, prazo de 30 dias, categorias de visto e isenção fiscal.',
          canonical: 'https://lordjunnior.com.br/saida/cedula-residencia-chile',
          primaryKeyword: 'cédula e residência no Chile',
          lsiKeywords: [
            'residência temporária Chile',
            'cédula chilena RUN',
            'como morar no Chile sendo brasileiro',
            'visto Chile online',
            'extranjeria Chile',
            'isenção imposto Chile estrangeiro',
          ],
          longTailKeywords: [
            'como tirar residência no Chile 100 por cento online',
            'como brasileiro pode morar no Chile em 2026',
            'passo a passo cédula chilena RUN',
            'categorias de visto Chile rentista investidor',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Saída & Infraestrutura', url: '/saida' },
            { name: 'Cédula e Residência no Chile', url: '/saida/cedula-residencia-chile' },
          ],
          schemaType: 'Article',
          articleSection: 'Saída & Infraestrutura',
          relatedPages: [
            '/saida',
            '/saida/jurisdicoes-amigaveis',
            '/saida/segundo-passaporte',
            '/saida/residencia-fiscal',
            '/teoria-das-bandeiras',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div
        className="relative min-h-screen"
        style={{
          backgroundColor: '#f4ede4',
          color: '#1c2624',
          fontFamily: "'Inter Tight', sans-serif",
        }}
      >
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        <div className="px-6 md:px-12 lg:px-20">
          <RegraZeroMobilidade theme="light" />
        </div>

        {/* CAPÍTULO 1 — Por que o Chile virou a nova rota */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span
                  className="text-xs font-bold tracking-[0.4em] uppercase block mb-4"
                  style={{ color: '#b45836' }}
                >
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p
                  className="text-sm uppercase tracking-[0.2em] font-semibold"
                  style={{ color: '#5a6664' }}
                >
                  Por que o Chile virou rota
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2
                className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10"
                style={{ color: '#14424a' }}
              >
                Enquanto Portugal vira fila,{' '}
                <span
                  style={{
                    color: '#b45836',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  o Chile vira rota.
                </span>
              </h2>
              <div
                className="space-y-7 text-lg md:text-xl leading-[1.7] font-light"
                style={{ color: '#2d3a37' }}
              >
                <p>
                  O Chile é hoje o país da América Latina que melhor equilibra três coisas que normalmente não andam juntas: processo de residência iniciado totalmente online, custo de entrada irrisório em taxas oficiais e moldura institucional respeitada por bancos do mundo inteiro. Você assina documento em São Paulo, recebe aprovação no painel da migração chilena e só pisa no país para a coleta biométrica.
                </p>
                <p>
                  Não é movimento de moda. É movimento de gente cansada de esperar consulado em Lisboa, cansada de ouvir que vai virar a chave em Buenos Aires e ver a chave girar para o lado errado, cansada de pagar despachante no Paraguai para fazer o que dava para fazer sozinho. O Chile cortou a burocracia em pontos críticos e abriu espaço para quem quer plano B sem queimar capital nem identidade.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{
                    borderLeft: '3px solid #b45836',
                    color: '#14424a',
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                  }}
                >
                  Soberania não é fugir. É escolher onde a regra do jogo te trata como adulto.
                </blockquote>
                <p>
                  Esse guia é o passo a passo real, sem romance. Cada etapa, cada documento, cada prazo, cada armadilha que derruba pedido. Lê com calma, escolhe a categoria certa de visto antes de abrir o portal e tira a cédula chilena com a mesma seriedade que você abre uma carteira de Bitcoin.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — RESUMO TÁTICO (faixa teal escura) */}
        <section
          className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: '#14424a', color: '#f4ede4' }}
        >
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span
                className="text-xs font-bold tracking-[0.4em] uppercase block mb-4"
                style={{ color: '#e8a36b' }}
              >
                Capítulo 02 · Resumo tático
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                O processo inteiro,{' '}
                <span
                  style={{
                    color: '#e8a36b',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  em quatro respirações.
                </span>
              </h2>
              <p
                className="mt-6 text-lg md:text-xl font-light leading-[1.6]"
                style={{ color: 'rgba(244,237,228,0.75)' }}
              >
                Da abertura do portal oficial até a cédula chilena na mão. Sem despachante, sem fila de consulado, sem promessa de atalho mágico.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'rgba(244,237,228,0.15)' }}>
              {ETAPAS.map((e, i) => (
                <motion.div
                  key={e.n}
                  {...fade(i * 0.06)}
                  className="group relative p-8 md:p-10 transition-all duration-500"
                  style={{ backgroundColor: '#14424a' }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className="p-3 rounded-xl transition-transform group-hover:scale-110 duration-500"
                      style={{
                        backgroundColor: 'rgba(232,163,107,0.15)',
                        border: '1px solid rgba(232,163,107,0.3)',
                      }}
                    >
                      <e.icon size={22} style={{ color: '#e8a36b' }} />
                    </div>
                    <span className="text-2xl font-black" style={{ color: '#e8a36b' }}>
                      {e.n}
                    </span>
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-black leading-tight mb-4"
                    style={{ color: '#f4ede4' }}
                  >
                    {e.titulo}
                  </h3>
                  <p
                    className="text-base leading-relaxed font-light"
                    style={{ color: 'rgba(244,237,228,0.78)' }}
                  >
                    {e.descricao}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — IMAGEM Registro Civil + Categorias */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span
                className="text-xs font-bold tracking-[0.4em] uppercase block mb-4"
                style={{ color: '#b45836' }}
              >
                Capítulo 03 · Categorias
              </span>
              <h2
                className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight"
                style={{ color: '#14424a' }}
              >
                Cinco portas,{' '}
                <span
                  style={{
                    color: '#b45836',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  uma cédula só.
                </span>
              </h2>
              <p
                className="mt-6 text-lg md:text-xl font-light leading-[1.6]"
                style={{ color: '#2d3a37' }}
              >
                A categoria escolhida define documentos, prazo e probabilidade de aprovação. Errar essa decisão é o erro que mais derruba pedido. Escolha antes de abrir o portal.
              </p>
            </motion.div>

            <motion.div {...fade(0)} className="relative h-[360px] md:h-[460px] lg:h-[560px] overflow-hidden rounded-3xl mb-16 group">
              <img
                src={registroImg}
                alt="Fachada do Registro Civil chileno em Santiago, onde a cédula RUN é emitida após a aprovação da residência temporária"
                loading="lazy"
                width={1600}
                height={1100}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 40%, rgba(20,66,74,0.85) 100%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <p
                  className="text-xs uppercase tracking-[0.3em] font-bold mb-2"
                  style={{ color: 'rgba(244,237,228,0.7)' }}
                >
                  Registro Civil · Santiago
                </p>
                <p
                  className="text-2xl md:text-4xl font-light italic max-w-3xl"
                  style={{
                    color: '#f4ede4',
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  É aqui que o estrangeiro vira morador. Foto, digital, assinatura e RUN na mão.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIAS.map((c, i) => (
                <motion.div
                  key={c.nome}
                  {...fade(i * 0.06)}
                  className="p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 3px rgba(20,66,74,0.08)',
                  }}
                >
                  <div
                    className="inline-flex p-3 rounded-xl mb-5"
                    style={{ backgroundColor: 'rgba(180,88,54,0.12)' }}
                  >
                    <c.icon size={22} style={{ color: '#b45836' }} />
                  </div>
                  <h3 className="text-2xl font-black mb-3" style={{ color: '#14424a' }}>
                    {c.nome}
                  </h3>
                  <p
                    className="text-base leading-relaxed font-light"
                    style={{ color: '#2d3a37' }}
                  >
                    {c.descricao}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4 — CUSTOS (creme escuro + imagem documentos) */}
        <section
          className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36"
          style={{ backgroundColor: '#ece2d3' }}
        >
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span
                className="text-xs font-bold tracking-[0.4em] uppercase block mb-4"
                style={{ color: '#b45836' }}
              >
                Capítulo 04 · Custos reais
              </span>
              <h2
                className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-10"
                style={{ color: '#14424a' }}
              >
                Não é Portugal,{' '}
                <span
                  style={{
                    color: '#b45836',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  não é Dubai, não é mito.
                </span>
              </h2>
              <p
                className="text-lg md:text-xl font-light leading-[1.7] mb-8"
                style={{ color: '#2d3a37' }}
              >
                Em taxas oficiais, o Chile pede entre US$ 20 e US$ 120 por pessoa para residência mais cédula. O custo real do seu projeto se desloca para apostila, tradução e a viagem obrigatória de coleta biométrica.
              </p>
              <div className="space-y-3">
                {CUSTOS.map((c, i) => (
                  <motion.div
                    key={c.item}
                    {...fade(i * 0.04)}
                    className="flex items-center justify-between p-5 rounded-xl"
                    style={{ backgroundColor: '#f4ede4' }}
                  >
                    <span className="text-base md:text-lg font-light" style={{ color: '#2d3a37' }}>
                      {c.item}
                    </span>
                    <span className="text-base md:text-lg font-bold" style={{ color: '#14424a' }}>
                      {c.valor}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={documentosImg}
                  alt="Passaporte brasileiro, certidão e cédula chilena sobre mesa de madeira, kit documental necessário para abrir residência temporária no Chile"
                  loading="lazy"
                  width={1600}
                  height={1100}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — VANTAGENS */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span
                className="text-xs font-bold tracking-[0.4em] uppercase block mb-4"
                style={{ color: '#b45836' }}
              >
                Capítulo 05 · O que ninguém comenta
              </span>
              <h2
                className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight"
                style={{ color: '#14424a' }}
              >
                A cédula é a porta.{' '}
                <span
                  style={{
                    color: '#b45836',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  O que tem do outro lado importa mais.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {VANTAGENS.map((v, i) => (
                <motion.div
                  key={v.titulo}
                  {...fade(i * 0.05)}
                  className="p-8 md:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-1"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 3px rgba(20,66,74,0.08)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <ShieldCheck size={22} style={{ color: '#b45836' }} />
                    <p
                      className="text-xs uppercase tracking-[0.3em] font-bold"
                      style={{ color: '#b45836' }}
                    >
                      Vantagem real
                    </p>
                  </div>
                  <h3 className="text-2xl md:text-[1.7rem] font-black leading-tight mb-4" style={{ color: '#14424a' }}>
                    {v.titulo}
                  </h3>
                  <p
                    className="text-base md:text-lg leading-relaxed font-light"
                    style={{ color: '#2d3a37' }}
                  >
                    {v.descricao}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6 — ARMADILHAS (faixa teal) */}
        <section
          className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: '#14424a', color: '#f4ede4' }}
        >
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <div
                className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(232,163,107,0.12)',
                  color: '#e8a36b',
                }}
              >
                <AlertTriangle size={14} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Capítulo 06 · Armadilhas</span>
              </div>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Cinco erros que{' '}
                <span
                  style={{
                    color: '#e8a36b',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  derrubam o pedido.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {ARMADILHAS.map((a, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.05)}
                  className="flex gap-6 p-6 md:p-8 rounded-2xl"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.15)' }}
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black"
                    style={{
                      backgroundColor: 'rgba(232,163,107,0.2)',
                      color: '#e8a36b',
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    className="text-base md:text-lg leading-relaxed font-light"
                    style={{ color: 'rgba(244,237,228,0.92)' }}
                  >
                    {a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 — PORTAIS OFICIAIS + IMAGEM VIDA */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6 lg:order-2">
              <span
                className="text-xs font-bold tracking-[0.4em] uppercase block mb-4"
                style={{ color: '#b45836' }}
              >
                Capítulo 07 · Portais oficiais
              </span>
              <h2
                className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8"
                style={{ color: '#14424a' }}
              >
                Sem despachante.{' '}
                <span
                  style={{
                    color: '#b45836',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Sem intermediário.
                </span>
              </h2>
              <p className="text-lg md:text-xl font-light leading-[1.7] mb-8" style={{ color: '#2d3a37' }}>
                Os dois portais oficiais do governo chileno fazem o pedido inteiro. Quem cobra dezenas de milhares de pesos chilenos para preencher formulário está vendendo medo, não serviço.
              </p>
              <div className="space-y-4">
                <a
                  href="https://tramites.extranjeria.gob.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 rounded-2xl transition-all hover:-translate-y-1"
                  style={{
                    backgroundColor: '#14424a',
                    color: '#f4ede4',
                  }}
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] font-bold mb-1" style={{ color: '#e8a36b' }}>
                      Portal de Migração
                    </p>
                    <p className="text-lg md:text-xl font-bold">tramites.extranjeria.gob.cl</p>
                  </div>
                  <ExternalLink size={20} />
                </a>
                <a
                  href="https://serviciomigraciones.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 rounded-2xl transition-all hover:-translate-y-1"
                  style={{
                    backgroundColor: '#14424a',
                    color: '#f4ede4',
                  }}
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] font-bold mb-1" style={{ color: '#e8a36b' }}>
                      Serviço Nacional de Migrações
                    </p>
                    <p className="text-lg md:text-xl font-bold">serviciomigraciones.cl</p>
                  </div>
                  <ExternalLink size={20} />
                </a>
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6 lg:order-1">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={vidaImg}
                  alt="Paisagem cinematográfica dos Andes chilenos com céu estrelado, símbolo da nova vida possível após a residência aprovada"
                  loading="lazy"
                  width={1920}
                  height={1100}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 8 — FAQ */}
        <section
          className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36"
          style={{ backgroundColor: '#ece2d3' }}
        >
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span
                className="text-xs font-bold tracking-[0.4em] uppercase block mb-4"
                style={{ color: '#b45836' }}
              >
                Capítulo 08 · Perguntas que importam
              </span>
              <h2
                className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight"
                style={{ color: '#14424a' }}
              >
                Antes do clique,{' '}
                <span
                  style={{
                    color: '#b45836',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  a dúvida certa.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    {...fade(i * 0.03)}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: '#f4ede4',
                      boxShadow: open ? '0 8px 24px rgba(20,66,74,0.1)' : '0 1px 3px rgba(20,66,74,0.05)',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left"
                    >
                      <span
                        className="text-lg md:text-xl font-bold leading-snug"
                        style={{ color: '#14424a' }}
                      >
                        {f.q}
                      </span>
                      <ChevronDown
                        size={22}
                        className="shrink-0 transition-transform duration-500"
                        style={{
                          color: '#b45836',
                          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.5, ease: APPLE_EASE }}
                        className="px-6 md:px-8 pb-8"
                      >
                        <p
                          className="text-base md:text-lg leading-relaxed font-light"
                          style={{ color: '#2d3a37' }}
                        >
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 9 — Continue sua trilha */}
        <section
          className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: '#14424a', color: '#f4ede4' }}
        >
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span
                className="text-xs font-bold tracking-[0.4em] uppercase block mb-4"
                style={{ color: '#e8a36b' }}
              >
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Uma cédula{' '}
                <span
                  style={{
                    color: '#e8a36b',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  não constrói soberania sozinha.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  to: '/saida/jurisdicoes-amigaveis',
                  titulo: 'Ranking 2026 das jurisdições amigáveis',
                  texto: 'Onde o Chile se posiciona contra Paraguai, Dubai, Uruguai e Portugal.',
                },
                {
                  to: '/saida/segundo-passaporte',
                  titulo: 'Segundo passaporte: estratégia real',
                  texto: 'Como a residência chilena vira ponte para nacionalidade no longo prazo.',
                },
                {
                  to: '/teoria-das-bandeiras',
                  titulo: 'Teoria das Bandeiras',
                  texto: 'O framework de jurisdições múltiplas que sustenta qualquer plano B sério.',
                },
              ].map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="group p-8 rounded-2xl transition-all hover:-translate-y-1"
                  style={{
                    backgroundColor: 'rgba(244,237,228,0.06)',
                    border: '1px solid rgba(232,163,107,0.18)',
                  }}
                >
                  <h3
                    className="text-xl md:text-2xl font-black leading-tight mb-3"
                    style={{ color: '#f4ede4' }}
                  >
                    {c.titulo}
                  </h3>
                  <p
                    className="text-base leading-relaxed font-light mb-5"
                    style={{ color: 'rgba(244,237,228,0.75)' }}
                  >
                    {c.texto}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1"
                    style={{ color: '#e8a36b' }}
                  >
                    Acessar <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}