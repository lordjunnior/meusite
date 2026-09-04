import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Globe, FileCheck, Clock, Banknote, ShieldCheck,
  AlertTriangle, ChevronDown, ArrowRight, Plane, Fingerprint,
  Building2, Briefcase, Users, Coins, ExternalLink, Landmark, ScrollText,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/saida/paraguai-hero.jpg';
import cidadeImg from '@/assets/saida/jurisdicoes-paraguai.jpg';
import documentosImg from '@/assets/offshore-brasil-paraguai.jpg';
import bancoImg from '@/assets/saida/residencia-fiscal-hero.jpg';

/**
 * /saida/residencia-paraguai
 * Paleta temática Paraguai: Sand #f4ede4 / Deep Teal #123832 / Cobre terracota #b5622f.
 * Segue a arquitetura editorial de CedulaResidenciaChile.tsx.
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
    titulo: 'Entrada no país e abertura do processo',
    icon: Plane,
    descricao:
      'Brasileiro entra no Paraguai só com RG ou passaporte, sem visto prévio. A partir daí você contrata um representante legal paraguaio (obrigatório por lei para o processo migratório) e monta o dossiê: certidão de nascimento ou casamento apostilada, atestado de antecedentes criminais do Brasil apostilado, e comprovante de renda ou de investimento mínimo.',
  },
  {
    n: '02',
    titulo: 'Protocolo na Dirección General de Migraciones',
    icon: FileCheck,
    descricao:
      'O representante protocola o pedido de residência na Migraciones em Assunção. É nesse momento que se define a categoria: residência temporária (a mais comum, via depósito em banco local ou vínculo de trabalho) ou permanente direta para quem tem investimento maior ou vínculo de Mercosul.',
  },
  {
    n: '03',
    titulo: 'Exame médico, antecedentes locais e biometria',
    icon: Fingerprint,
    descricao:
      'Exame de sangue e raio-x em clínica credenciada, certificado de antecedentes policiais paraguaio e coleta de digitais na Polícia Nacional. Etapa presencial, geralmente resolvida em um único dia útil se a documentação já estiver completa.',
  },
  {
    n: '04',
    titulo: 'Cédula de identidade paraguaia',
    icon: Building2,
    descricao:
      'Com a residência aprovada, você emite a cédula paraguaia no Departamento de Identificaciones da Polícia Nacional. É o documento que destrava banco, RUC, contrato de aluguel e qualquer negócio formal no país. Emissão em poucos dias, retirada pode ser feita por procuração em alguns casos.',
  },
];

const CATEGORIAS = [
  {
    nome: 'Residência temporária por depósito',
    icon: Banknote,
    descricao:
      'A rota mais usada por brasileiros. Depósito em banco paraguaio (historicamente em torno de US$ 5.000, valor que varia por regulamentação e câmbio) como prova de meios de subsistência. Não precisa manter o valor bloqueado para sempre, mas o comprovante do depósito entra no processo.',
  },
  {
    nome: 'Residência por vínculo de trabalho',
    icon: Briefcase,
    descricao:
      'Contrato com empresa paraguaia registrada. Menos comum para quem trabalha remoto para o exterior, mais usado por quem abre negócio físico no país.',
  },
  {
    nome: 'Residência por investimento ou empresa própria',
    icon: Landmark,
    descricao:
      'Abertura de empresa paraguaia com capital social integralizado. Caminho de quem já pretende faturar localmente ou usar o Paraguai como base de holding regional.',
  },
  {
    nome: 'Residência por vínculo familiar',
    icon: Users,
    descricao:
      'Cônjuge, filho ou pai de paraguaio ou de residente permanente. Exige documentação familiar apostilada e tradução juramentada para o guarani ou espanhol.',
  },
  {
    nome: 'Mercosul (para quem tem outra nacionalidade do bloco)',
    icon: Globe,
    descricao:
      'Regra simplificada para nacionais de países do Mercosul. Brasileiro se enquadra aqui e tem processo mais direto que estrangeiros de fora do bloco.',
  },
];

const CUSTOS = [
  { item: 'Honorários de representante legal / despachante', valor: 'US$ 800 a US$ 2.500' },
  { item: 'Depósito bancário (residência temporária)', valor: '≈ US$ 5.000 (comprovação, não taxa)' },
  { item: 'Apostila + tradução juramentada (Brasil)', valor: 'US$ 80 a US$ 250' },
  { item: 'Exames médicos e antecedentes locais', valor: 'US$ 40 a US$ 100' },
  { item: 'Emissão da cédula paraguaia', valor: 'US$ 15 a US$ 40' },
  { item: 'RUC (Registro Único do Contribuinte)', valor: 'Gratuito, feito na Secretaria da Fazenda' },
  { item: 'Passagem + estadia em Assunção', valor: 'BRL 1.500 a 3.000' },
  { item: 'Total realista para residência temporária', valor: 'US$ 1.200 a US$ 3.500 em taxas + viagem' },
];

const VANTAGENS = [
  {
    titulo: 'Tributação territorial de verdade',
    descricao:
      'O Paraguai tributa apenas renda de fonte paraguaia. Renda do exterior, dividendos estrangeiros, ganho com Bitcoin guardado fora do país: nada disso entra na base tributável paraguaia. Isso muda o jogo para quem fatura em dólar ou em cripto fora do território nacional.',
  },
  {
    titulo: 'Processo mais barato da América do Sul',
    descricao:
      'Comparado a Portugal, Espanha ou até ao Uruguai, o custo total de residência no Paraguai é dos mais baixos da região. Não existe golden visa de meio milhão de euros aqui.',
  },
  {
    titulo: 'RUC vira porta para operar empresa',
    descricao:
      'Com o RUC (Registro Único do Contribuinte) você fatura como pessoa física ou abre empresa paraguaia com regime simplificado. Alíquotas de imposto de renda corporativo entre as mais baixas do continente.',
  },
  {
    titulo: 'Caminho para permanente e depois cidadania',
    descricao:
      'Após período de residência temporária (em geral até 2 anos, renovável) é possível pedir a permanente. Com residência permanente e tempo mínimo de domicílio efetivo, existe caminho para naturalização e passaporte paraguaio.',
  },
];

const ARMADILHAS = [
  'Contratar despachante que cobra pacote fechado de US$ 5.000 a US$ 10.000 prometendo "tudo incluso" sem detalhar o que está incluso. O processo custa uma fração disso quando bem conduzido.',
  'Achar que o depósito bancário é uma taxa que se perde. Na maioria dos casos é comprovação de meios de subsistência, não uma cobrança do governo. Confundir os dois gera decisões financeiras erradas.',
  'Não entender a diferença entre residência temporária e permanente e assumir que a cédula já garante cidadania. Residência é revogável por falta de renovação ou ausência prolongada do país.',
  'Deixar de tirar o RUC achando que só a cédula resolve. Sem RUC você não emite fatura, não abre conta empresarial e não formaliza atividade econômica no país.',
  'Assinar documentação em guarani ou espanhol sem tradução compreendida, direto no balcão da Migraciones, por pressa ou economia com tradutor.',
  'Achar que residência no Paraguai automaticamente resolve a residência fiscal no Brasil. É preciso formalizar a saída definitiva perante a Receita Federal para deixar de ser tributado como residente brasileiro.',
];

const FAQ = [
  {
    q: 'Quanto custa realmente tirar residência no Paraguai sendo brasileiro?',
    a: 'Em honorários, taxas, exames e documentação, o custo fica entre US$ 1.200 e US$ 3.500 por pessoa, sem contar o depósito bancário de comprovação de renda (historicamente em torno de US$ 5.000, que não é uma taxa perdida) nem a viagem até Assunção. É um dos processos mais baratos da América do Sul.',
  },
  {
    q: 'Preciso morar efetivamente no Paraguai para manter a residência?',
    a: 'A legislação exige presença mínima periódica no país para não perder a condição de residente, mas não impõe moradia em tempo integral como alguns programas europeus. Ausências muito longas e repetidas, no entanto, podem ser questionadas na renovação ou na conversão para permanente.',
  },
  {
    q: 'O que é o RUC e por que ele importa tanto quanto a cédula?',
    a: 'RUC é o Registro Único do Contribuinte, equivalente a um CPF/CNPJ paraguaio. Sem ele você não emite nota fiscal, não abre conta jurídica e não formaliza nenhuma atividade econômica no país. É o documento que transforma residência em operação real.',
  },
  {
    q: 'O Paraguai cobra imposto sobre renda ganha fora do país, incluindo cripto?',
    a: 'Não, na regra geral. O Paraguai adota sistema de tributação territorial: só tributa renda de fonte paraguaia. Ganhos de capital, dividendos e valorização de Bitcoin mantidos fora do território paraguaio, em geral, ficam fora da base de cálculo local. A análise fina deve ser feita com contador paraguaio, pois há particularidades por tipo de renda.',
  },
  {
    q: 'Dá para abrir conta bancária no Paraguai sendo estrangeiro?',
    a: 'Sim, com cédula paraguaia em mãos. Bancos locais como Banco Itaú Paraguay, Banco GNB e cooperativas de crédito abrem conta para residentes estrangeiros, embora o processo de compliance tenha ficado mais rigoroso nos últimos anos, exigindo comprovação de origem de fundos.',
  },
  {
    q: 'Qual a diferença entre contratar despachante e representante legal?',
    a: 'Representante legal é exigência formal da lei migratória paraguaia: alguém domiciliado no país que assina o protocolo por você. Despachante é intermediário comercial que cobra para facilitar o processo. Muitos representantes legais idôneos cobram uma fração do que despachantes turísticos cobram por pacotes inflados.',
  },
  {
    q: 'Quanto tempo demora até ter a cédula paraguaia na mão?',
    a: 'Com documentação completa e representante legal competente, o processo de residência temporária costuma levar de 30 a 90 dias até a emissão da cédula, considerando protocolo, exames, antecedentes e biometria. Casos com documentação incompleta ou apostilamento malfeito se arrastam por meses.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Vista aérea de Assunção ao entardecer com o Rio Paraguai ao fundo, capital do país que tributa apenas renda local"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(18,56,50,0.55) 0%, rgba(18,56,50,0.35) 40%, rgba(18,56,50,0.9) 100%)',
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
            <MapPin size={11} className="inline mr-2" /> Saída & Infraestrutura · Paraguai
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Residência no Paraguai.{' '}
          <span
            style={{
              color: '#e8935e',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(232,147,94,0.45), 0 0 80px rgba(232,147,94,0.25)',
            }}
          >
            O guia sem meias palavras.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Requisitos reais, custos em dólar, RUC, tributação territorial e as armadilhas de despachante que inflam o processo mais barato da América do Sul. Passo a passo sem romantização.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function ResidenciaParaguai() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/saida/residencia-paraguai"
        custom={{
          title: 'Residência no Paraguai 2026: Cédula, RUC e Custos Reais',
          description:
            'Guia completo de residência temporária e permanente no Paraguai. Cédula paraguaia, RUC, prazos, custos reais em dólar, tributação territorial e armadilhas de despachante.',
          canonical: 'https://sovereign-arsenal.lovable.app/saida/residencia-paraguai',
          primaryKeyword: 'residência no Paraguai',
          lsiKeywords: [
            'cédula paraguaia',
            'RUC Paraguai',
            'residência temporária Paraguai',
            'tributação territorial Paraguai',
            'como morar no Paraguai sendo brasileiro',
            'abrir conta bancária no Paraguai',
          ],
          longTailKeywords: [
            'como tirar residência no Paraguai sendo brasileiro',
            'quanto custa residência permanente no Paraguai',
            'passo a passo cédula paraguaia',
            'Paraguai tributa renda estrangeira e cripto',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Saída & Infraestrutura', url: '/saida' },
            { name: 'Residência no Paraguai', url: '/saida/residencia-paraguai' },
          ],
          schemaType: 'Article',
          articleSection: 'Saída & Infraestrutura',
          relatedPages: [
            '/saida',
            '/saida/melhores-paises-brasileiros',
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
        style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}
      >
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b5622f' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b5622f' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Por que o Paraguai continua na jogada
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#123832' }}>
                O processo mais barato,{' '}
                <span style={{ color: '#b5622f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não o mais simples.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  O Paraguai virou porta de entrada padrão para brasileiro que quer segunda residência sem gastar fortuna. O motivo é simples: tributação territorial de verdade, custo de entrada baixo e proximidade geográfica que permite ida e volta de carro ou ônibus. Mas o processo tem burocracia real, exige representante legal por lei e não é o "faça em três cliques" que vídeo de YouTube vende.
                </p>
                <p>
                  A diferença entre quem sai satisfeito e quem se arrepende raramente está no país. Está em saber exatamente quais documentos apostilar antes de embarcar, quanto o processo custa de verdade e por que despachante turístico cobra dez vezes o valor de um representante legal sério.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #b5622f', color: '#123832', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Tributação territorial não é brecha. É desenho de país que decidiu competir por gente, não só por turista.
                </blockquote>
                <p>
                  Esse guia cobre o processo real: residência temporária, RUC, cédula, custos em dólar, abertura de conta bancária e os erros que mais custam dinheiro e tempo de quem tenta atravessar a fronteira sozinho sem informação de campo.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — RESUMO TÁTICO */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#123832', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8935e' }}>
                Capítulo 02 · Resumo tático
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Da fronteira{' '}
                <span style={{ color: '#e8935e', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  à cédula na mão.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(244,237,228,0.75)' }}>
                Quatro etapas concretas, com representante legal obrigatório desde o protocolo até a retirada do documento.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(244,237,228,0.15)' }}>
              {ETAPAS.map((e, i) => (
                <motion.div key={e.n} {...fade(i * 0.06)} className="group relative p-8 md:p-10 transition-all duration-500" style={{ backgroundColor: '#123832' }}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-xl transition-transform group-hover:scale-110 duration-500" style={{ backgroundColor: 'rgba(232,147,94,0.15)', border: '1px solid rgba(232,147,94,0.3)' }}>
                      <e.icon size={22} style={{ color: '#e8935e' }} />
                    </div>
                    <span className="text-2xl font-black" style={{ color: '#e8935e' }}>{e.n}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-4" style={{ color: '#f4ede4' }}>{e.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.78)' }}>{e.descricao}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — CATEGORIAS + IMAGEM */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b5622f' }}>
                Capítulo 03 · Categorias de residência
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#123832' }}>
                Cinco caminhos,{' '}
                <span style={{ color: '#b5622f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  uma cédula paraguaia.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: '#2d3a37' }}>
                A categoria certa depende do seu perfil de renda. Escolher errado significa refazer dossiê inteiro semanas depois.
              </p>
            </motion.div>

            <motion.div {...fade(0)} className="relative h-[360px] md:h-[460px] lg:h-[560px] overflow-hidden rounded-3xl mb-16 group">
              <img
                src={cidadeImg}
                alt="Skyline de Assunção ao pôr do sol junto ao Rio Paraguai, cidade onde tramita todo o processo de residência"
                loading="lazy"
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(18,56,50,0.85) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: 'rgba(244,237,228,0.7)' }}>
                  Assunção · Migraciones
                </p>
                <p className="text-2xl md:text-4xl font-light italic max-w-3xl" style={{ color: '#f4ede4', fontFamily: "'Playfair Display', serif" }}>
                  É aqui que o dossiê vira protocolo, e o protocolo vira cédula.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIAS.map((c, i) => (
                <motion.div key={c.nome} {...fade(i * 0.06)} className="p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(18,56,50,0.08)' }}>
                  <div className="inline-flex p-3 rounded-xl mb-5" style={{ backgroundColor: 'rgba(181,98,47,0.12)' }}>
                    <c.icon size={22} style={{ color: '#b5622f' }} />
                  </div>
                  <h3 className="text-2xl font-black mb-3" style={{ color: '#123832' }}>{c.nome}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c.descricao}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4 — CUSTOS */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b5622f' }}>
                Capítulo 04 · Custos reais
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#123832' }}>
                Barato de verdade,{' '}
                <span style={{ color: '#b5622f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não de graça.
                </span>
              </h2>
              <p className="text-lg md:text-xl font-light leading-[1.7] mb-8" style={{ color: '#2d3a37' }}>
                O processo completo, feito com representante legal sério e sem pacote inflado, fica na casa de US$ 1.200 a US$ 3.500 por pessoa em taxas e honorários, fora o depósito de comprovação de renda.
              </p>
              <div className="space-y-3">
                {CUSTOS.map((c, i) => (
                  <motion.div key={c.item} {...fade(i * 0.04)} className="flex items-center justify-between gap-4 p-5 rounded-xl" style={{ backgroundColor: '#f4ede4' }}>
                    <span className="text-base md:text-lg font-light" style={{ color: '#2d3a37' }}>{c.item}</span>
                    <span className="text-base md:text-lg font-bold text-right" style={{ color: '#123832' }}>{c.valor}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={documentosImg}
                  alt="Fronteira entre Brasil e Paraguai, rota terrestre usada por brasileiros para protocolar o processo de residência"
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
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b5622f' }}>
                Capítulo 05 · O que sustenta a rota
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#123832' }}>
                A cédula abre a porta.{' '}
                <span style={{ color: '#b5622f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  O RUC abre o negócio.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {VANTAGENS.map((v, i) => (
                <motion.div key={v.titulo} {...fade(i * 0.05)} className="p-8 md:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-1" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(18,56,50,0.08)' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <ShieldCheck size={22} style={{ color: '#b5622f' }} />
                    <p className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: '#b5622f' }}>Vantagem real</p>
                  </div>
                  <h3 className="text-2xl md:text-[1.7rem] font-black leading-tight mb-4" style={{ color: '#123832' }}>{v.titulo}</h3>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{v.descricao}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6 — SISTEMA TERRITORIAL E BANKING */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6 lg:order-2">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b5622f' }}>
                Capítulo 06 · Tributação e banco
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#123832' }}>
                Renda de fora,{' '}
                <span style={{ color: '#b5622f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  fora da mira.
                </span>
              </h2>
              <div className="space-y-6 text-lg md:text-xl font-light leading-[1.7]" style={{ color: '#2d3a37' }}>
                <p>
                  O Paraguai adota sistema territorial de tributação. Só a renda gerada dentro do país entra na base de cálculo do imposto de renda. Salário pago por empresa paraguaia, aluguel de imóvel paraguaio, venda de produto para cliente paraguaio: isso é tributado. Dividendo de empresa americana, rendimento de renda fixa no exterior, valorização de Bitcoin guardado em carteira própria fora do país: fica fora da rede fiscal paraguaia na regra geral.
                </p>
                <p>
                  Com a cédula em mãos, a abertura de conta em banco local passa a ser possível, embora o compliance tenha ficado mais rígido nos últimos anos. Bancos paraguaios pedem comprovação de origem de fundos, referência bancária do Brasil e, em alguns casos, movimentação mínima. Não é imediato, mas é viável para quem chega organizado.
                </p>
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6 lg:order-1">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={bancoImg}
                  alt="Agência bancária em ambiente latino-americano, ilustrando abertura de conta por estrangeiro residente"
                  loading="lazy"
                  width={1920}
                  height={1100}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — ARMADILHAS */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#123832', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(232,147,94,0.12)', color: '#e8935e' }}>
                <AlertTriangle size={14} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Capítulo 07 · Armadilhas</span>
              </div>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Seis erros que{' '}
                <span style={{ color: '#e8935e', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  encarecem tudo.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {ARMADILHAS.map((a, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="flex gap-6 p-6 md:p-8 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,147,94,0.15)' }}>
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black" style={{ backgroundColor: 'rgba(232,147,94,0.2)', color: '#e8935e' }}>
                    {i + 1}
                  </div>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.92)' }}>{a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 8 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b5622f' }}>
                Capítulo 08 · Perguntas que importam
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#123832' }}>
                Antes de atravessar{' '}
                <span style={{ color: '#b5622f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  a fronteira.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#f4ede4', boxShadow: open ? '0 8px 24px rgba(18,56,50,0.1)' : '0 1px 3px rgba(18,56,50,0.05)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#123832' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-500" style={{ color: '#b5622f', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5, ease: APPLE_EASE }} className="px-6 md:px-8 pb-8">
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 9 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#123832', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8935e' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Uma cédula{' '}
                <span style={{ color: '#e8935e', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  é só o primeiro tijolo.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  to: '/saida/melhores-paises-brasileiros',
                  titulo: 'Melhores países para brasileiros morarem',
                  texto: 'Como o Paraguai se compara a Chile, Uruguai, Geórgia e Panamá lado a lado.',
                },
                {
                  to: '/saida/cedula-residencia-chile',
                  titulo: 'Cédula e residência no Chile',
                  texto: 'O outro caminho sul-americano, 100 por cento online, com isenção fiscal temporária.',
                },
                {
                  to: '/teoria-das-bandeiras',
                  titulo: 'Teoria das Bandeiras',
                  texto: 'O framework de jurisdições múltiplas que sustenta qualquer plano B sério.',
                },
                { to: '/dicionario-cripto', titulo: 'Glossario de soberania', texto: 'Do UTXO ao domicilio fiscal: todos os termos tecnicos deste site explicados em uma pagina.' },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group p-8 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,147,94,0.18)' }}>
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: '#e8935e' }}>
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
