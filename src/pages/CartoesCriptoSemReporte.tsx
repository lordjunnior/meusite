import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard, Banknote, Eye, EyeOff, ShieldCheck, AlertTriangle,
  ChevronDown, ArrowRight, Globe, Fingerprint, MapPin, Flame,
  TrendingUp, TrendingDown, CheckCircle2, XCircle,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/cartoes-cripto/hero-atm-noturno.jpg';
import cardsImg from '@/assets/cartoes-cripto/cards-comparativo.jpg';
import atmImg from '@/assets/cartoes-cripto/atm-privacidade.jpg';
import docImg from '@/assets/cartoes-cripto/documento-estrategia.jpg';

/**
 * /soberania-financeira/cartoes-cripto-sem-reporte
 * Paleta noir: Teal profundo #0b2b30 / Cobre #c4632a / Cream #f4ede4.
 * Estrutura editorial Apple, alternância clara/escura, hero 92vh.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

interface Cartao {
  rank: number;
  nome: string;
  taxa: string;
  limite: string;
  privacidade: 'alta' | 'media' | 'baixa';
  veredito: string;
  fortes: string;
  fracos: string;
  perfilIdeal: string;
}

const CARTOES: Cartao[] = [
  {
    rank: 1,
    nome: 'Picnique',
    taxa: '5 saques grátis/mês até 200 USDC, depois 2%',
    limite: '500 USDC dia, 250 USDC por saque',
    privacidade: 'media',
    veredito: 'A melhor escolha para quem saca valores pequenos no varejo diário.',
    fortes: 'Câmbio agressivo (às vezes melhor que Binance), saques gratuitos recorrentes, app simples, opera com USDC.',
    fracos: 'Limite de saque baixo para quem mexe acima de 5 mil USD/mês, dependência de USDC.',
    perfilIdeal: 'Brasileiro que saca quantias menores (até 500 USDC dia) e quer pagar zero taxa nos primeiros saques do mês.',
  },
  {
    rank: 2,
    nome: 'ChapoBank',
    taxa: 'Grátis até cota mensal, depois 2%',
    limite: 'Até USD 1.000/dia (ajustável no app)',
    privacidade: 'alta',
    veredito: 'O cartão de quem opera valores altos e quer abrir conta com cédula paraguaia.',
    fortes: 'Aceita cédula paraguaia (saque sem reporte para CPF brasileiro), saque possível no Brasil, voltado a valores altos, limite escalável.',
    fracos: 'Curva inicial maior, exige documentação internacional, processo menos amigável que apps cripto comuns.',
    perfilIdeal: 'Operador de capital relevante que já tem ou planeja cédula paraguaia e quer banking internacional sério.',
  },
  {
    rank: 3,
    nome: 'Mero',
    taxa: '0% declarado (caixa eletrônico pode cobrar spread próprio)',
    limite: 'Não publicado, sistema interno avalia padrão de saque',
    privacidade: 'media',
    veredito: 'Zero taxa oficial, mas o algoritmo decide até onde você pode ir.',
    fortes: 'Taxa zerada no papel, app moderno, boa para saques pontuais e moderados.',
    fracos: 'Algoritmo de risco trava saques agressivos em ATMs diferentes, limites opacos, possíveis bloqueios sem aviso.',
    perfilIdeal: 'Usuário que saca volumes moderados de forma esparsa e prioriza taxa zero sobre previsibilidade.',
  },
  {
    rank: 4,
    nome: 'RedotPay',
    taxa: '2% até USD 10.000/mês, depois 3%',
    limite: 'Saque permitido acima de 10.000 com taxa maior',
    privacidade: 'media',
    veredito: 'O cavalo de batalha clássico, conhecido, estável, sem surpresa boa nem ruim.',
    fortes: 'Limite alto, taxa previsível, app maduro, suporte responsivo, longa presença no mercado cripto.',
    fracos: 'Taxa sobe rápido após USD 10 mil, KYC tradicional, sem brecha de privacidade real.',
    perfilIdeal: 'Quem precisa de previsibilidade e volume médio-alto sem inventar moda.',
  },
  {
    rank: 5,
    nome: 'Krak (by Kraken)',
    taxa: '0% declarado + possível spread do ATM',
    limite: 'Limites padrão de exchange Tier 1',
    privacidade: 'baixa',
    veredito: 'Cartão da Kraken para usuários já cadastrados. Funcional, mas reporta como exchange regulada.',
    fortes: 'Taxa zero no papel, infraestrutura de exchange Tier 1, integração nativa com o app Krak.',
    fracos: 'Kraken é exchange regulada, reporte praticamente garantido em qualquer jurisdição com acordo, baixa privacidade.',
    perfilIdeal: 'Quem já é cliente Kraken e quer um cartão funcional, sem ilusão de privacidade.',
  },
  {
    rank: 6,
    nome: 'Bybit Card',
    taxa: 'Brasil: grátis até R$ 550/mês, depois 2%',
    limite: 'Limites padrão de exchange Tier 1',
    privacidade: 'baixa',
    veredito: 'Taxa competitiva, mas pelo histórico recente Bybit aparece em listas de reporte para CPF brasileiro.',
    fortes: 'Taxa zero para saques pequenos, infraestrutura conhecida, app integrado.',
    fracos: 'Exchange entrou em movimento de compliance crescente, risco de reporte sobre CPF brasileiro.',
    perfilIdeal: 'Usuário que já opera na Bybit e aceita o trade-off compliance versus conveniência.',
  },
  {
    rank: 7,
    nome: 'Horizon (Ryzen)',
    taxa: '2% + spread de aproximadamente 3% no ATM',
    limite: 'Padrão de mercado',
    privacidade: 'media',
    veredito: 'Funciona, mas o custo total efetivo (taxa + spread) tira competitividade.',
    fortes: 'Aceita perfis variados, app estável, abertura relativamente simples.',
    fracos: 'Taxa real (somando spread oculto) sobe perto de 5 por cento, baixa transparência da taxa de ATM.',
    perfilIdeal: 'Quem quer um cartão funcional como reserva e não vai sacar grandes valores.',
  },
  {
    rank: 8,
    nome: 'Offramp',
    taxa: '2% sobre o saque',
    limite: 'USD 250 por transação, USD 750 por dia',
    privacidade: 'media',
    veredito: 'Taxa decente, mas o limite estrangula quem precisa mover valor real.',
    fortes: 'Taxa inferior a vários concorrentes, app limpo, gasto diário até USD 10 mil em compras.',
    fracos: 'Saque por transação muito baixo, exige múltiplos saques fragmentados, friction alto no varejo.',
    perfilIdeal: 'Quem usa o cartão principalmente para compras e tira cash de forma esporádica.',
  },
  {
    rank: 9,
    nome: 'Cash App Card',
    taxa: 'USD 3 + 2% por saque',
    limite: 'Padrão americano (rotativo)',
    privacidade: 'baixa',
    veredito: 'Histórico ruim de bloqueio, pedido recorrente de origem dos recursos. Pular.',
    fortes: 'Massa de usuários nos EUA, integração com app popular.',
    fracos: 'Bloqueios frequentes, KYC agressivo pós-onboarding, suporte burocrático, taxa pesada para volumes pequenos.',
    perfilIdeal: 'Pessoa nos EUA com perfil ortodoxo. Não recomendado para brasileiro com qualquer pretensão de privacidade.',
  },
  {
    rank: 10,
    nome: 'Semi-anônimo (sem KYC pesado)',
    taxa: 'Variável, normalmente 1 a 3%',
    limite: 'Variável conforme operadora',
    privacidade: 'alta',
    veredito: 'A camada extrema: emissão sem dado pessoal completo. Demanda diligência redobrada do usuário.',
    fortes: 'Sem amarrar identidade central, sem CPF, sem RG visível, possibilidade de operar com apenas e-mail e número descartável.',
    fracos: 'Aceitação irregular em ATMs, risco de bloqueio sem direito a defesa, exige curva de aprendizado real de OPSEC.',
    perfilIdeal: 'Quem já entende segurança digital, multisig, OPSEC, e aceita o trade-off de robustez por privacidade.',
  },
];

const ESTRATEGIAS = [
  {
    titulo: 'Cédula paraguaia',
    icon: Fingerprint,
    descricao:
      'Documentação real de um país soberano que ainda não integra o acordo global de troca automática de informações. Abre 95% dos cartões cripto e bancos internacionais sem disparar reporte para o Brasil. É o pilar de quem leva privacidade financeira a sério.',
    badge: 'Padrão ouro',
  },
  {
    titulo: 'ID de Palau',
    icon: Globe,
    descricao:
      'Identificação digital remota, processo 100 por cento online, chega em casa. Baixo custo de entrada. Limitação real: muitos cartões e bancos rejeitam Palau como documento principal de KYC. Funciona como segunda bandeira leve, não como base.',
    badge: 'Camada leve',
  },
  {
    titulo: 'Cartões semi-anônimos',
    icon: EyeOff,
    descricao:
      'Emissão sem RG, sem CPF, sem nome ou número de telefone. A camada mais avançada e mais frágil. Demanda OPSEC real, e-mail descartável dedicado, número virtual, e tolerância a bloqueios sem aviso. Não é para iniciante.',
    badge: 'Camada extrema',
  },
];

const ALERTAS = [
  'Cartão emitido por exchange com sede no Brasil reporta tudo. CPF, RG, passaporte brasileiro entram automaticamente no radar da Receita.',
  'Exchange estrangeira que faz parte do acordo CRS de troca automática de informações reporta saldos e transações para o Brasil, mesmo com conta aberta lá fora.',
  'Saque agressivo (vários ATMs em sequência, valores grandes em curto intervalo) ativa algoritmo antifraude de praticamente qualquer cartão. Resultado: bloqueio temporário ou permanente.',
  'Cartão semi-anônimo sem OPSEC vira armadilha. E-mail principal, número pessoal e device-fingerprint denunciam o titular mesmo sem KYC formal.',
  'Acreditar que "taxa zero" não tem custo. Spread do ATM, conversão cambial e bloqueio por padrão suspeito são custos reais que não aparecem na propaganda.',
];

const FAQ = [
  {
    q: 'É possível sacar dinheiro vivo no Brasil sem ser reportado para a Receita?',
    a: 'Depende inteiramente da combinação documento mais cartão. Saque feito com cartão cripto emitido sob CPF brasileiro tende a ser reportado, principalmente em exchanges com sede no Brasil ou aderentes ao acordo de troca automática de informações. Já saque feito com cartão emitido sob cédula paraguaia ou documento de jurisdição fora do CRS reduz drasticamente o risco de reporte, sem violar nenhuma lei.',
  },
  {
    q: 'Qual o melhor cartão cripto para quem saca pouco no dia a dia?',
    a: 'Picnique. Cinco saques gratuitos mensais até 200 USDC cada, com câmbio competitivo. Para volume menor (até 1.000 USDC mensais), é o cartão mais eficiente da lista. Para volumes acima de 5 mil USD por mês, ChapoBank ou RedotPay se tornam mais interessantes pelo limite.',
  },
  {
    q: 'O ID de Palau resolve o problema de privacidade financeira?',
    a: 'Parcialmente. Palau é uma camada leve. Custo baixo, processo remoto e válido para alguns serviços, mas a maioria dos bancos e cartões cripto recusa Palau como KYC principal. Serve como bandeira complementar, não como base. A base real para quem leva o assunto a sério continua sendo cédula de país com soberania reconhecida e fora do CRS, como Paraguai.',
  },
  {
    q: 'Quais cartões cripto reportam transações para o Brasil?',
    a: 'Qualquer cartão emitido por empresa com sede formal no Brasil reporta. Cartões de exchanges internacionais que aderiram ao CRS, acordo global de troca automática de informações, também podem reportar saldos e movimentações. A regra prática: assuma que cartão atrelado a CPF reporta, exceto se você tem evidência contrária verificada.',
  },
  {
    q: 'Vale a pena ter cartão semi-anônimo sem KYC?',
    a: 'Vale para quem já domina OPSEC e aceita os trade-offs. Você ganha privacidade, mas perde estabilidade (bloqueios sem aviso, aceitação irregular em ATMs), garantia de suporte e proteção contra fraude. É camada para usuário avançado, não para o primeiro cartão.',
  },
  {
    q: 'Qual a diferença entre taxa anunciada e taxa real de saque?',
    a: 'A taxa anunciada é só o que o cartão cobra. O custo real soma três coisas: taxa do cartão, taxa do ATM (spread cobrado pela operadora do caixa, que aparece como "tarifa do banco emissor do ATM") e o spread cambial da conversão cripto para fiat. Em alguns cartões "0%", o custo total efetivo chega a 4 ou 5 por cento.',
  },
  {
    q: 'Qual o risco de ter conta bloqueada por padrão de saque?',
    a: 'Real e frequente. Praticamente todo cartão cripto roda algoritmo antifraude que monitora padrões: saques sequenciais, ATMs diferentes em sequência rápida, valores próximos ao limite, geolocalização inconsistente. Operar abaixo do radar significa distribuir saques, alternar valores e respeitar a cadência natural do uso pessoal.',
  },
  {
    q: 'Cartão cripto substitui conta bancária internacional?',
    a: 'Não totalmente. O cartão é instrumento de acesso ao caixa, não de custódia robusta. Para soberania completa, a combinação ideal é cartão cripto para liquidez no dia a dia, conta bancária internacional para reserva operacional, e Bitcoin em autocustódia para reserva de valor de longo prazo. Cada camada cobre uma falha das outras.',
  },
];

function PrivacidadeBadge({ nivel }: { nivel: 'alta' | 'media' | 'baixa' }) {
  const map = {
    alta: { label: 'Privacidade alta', bg: 'rgba(196,99,42,0.18)', color: '#ffb37a', Icon: Eye },
    media: { label: 'Privacidade média', bg: 'rgba(232,163,107,0.14)', color: '#e8a36b', Icon: Eye },
    baixa: { label: 'Privacidade baixa', bg: 'rgba(220,90,90,0.18)', color: '#ff9b9b', Icon: EyeOff },
  } as const;
  const { label, bg, color, Icon } = map[nivel];
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase"
      style={{ backgroundColor: bg, color }}
    >
      <Icon size={12} /> {label}
    </span>
  );
}

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Mão inserindo cartão preto matte em caixa eletrônico à noite, simbolizando saque privado de dinheiro vivo com cartão cripto"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,43,48,0.55) 0%, rgba(11,43,48,0.4) 40%, rgba(11,43,48,0.92) 100%)',
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
            <CreditCard size={11} className="inline mr-2" /> Soberania Financeira · Cartões cripto
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[18ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Saque dinheiro vivo.{' '}
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
            Sem entregar sua identidade.
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
          Dez cartões cripto comparados frente a frente: taxa real, limite por dia, privacidade efetiva e quem reporta para a Receita. O guia que separa quem opera no Brasil e no exterior sem virar planilha do governo.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function CartoesCriptoSemReporte() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-financeira/cartoes-cripto-sem-reporte"
        custom={{
          title: 'Cartões Cripto para Sacar Dinheiro Vivo Sem Reporte (2026)',
          description:
            'Comparativo dos 10 melhores cartões cripto para sacar dinheiro vivo em ATM com privacidade: ChapoBank, Picnique, RedotPay, Mero, Bybit, Krak e mais. Taxas reais e estratégias sem KYC.',
          canonical: 'https://sovereign-arsenal.lovable.app/soberania-financeira/cartoes-cripto-sem-reporte',
          primaryKeyword: 'cartões cripto sem reporte',
          lsiKeywords: [
            'sacar dinheiro vivo com cripto',
            'cartão cripto sem KYC',
            'cartão cripto Brasil sem reporte',
            'ChapoBank Picnique RedotPay',
            'cartão cripto cédula paraguaia',
            'privacidade financeira Bitcoin',
          ],
          longTailKeywords: [
            'melhor cartão cripto para sacar em ATM 2026',
            'cartão cripto que não reporta para Receita Federal',
            'comparativo cartões cripto taxas e limites',
            'sacar dinheiro vivo no Brasil com cartão internacional',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Financeira', url: '/soberania-financeira' },
            { name: 'Cartões Cripto Sem Reporte', url: '/soberania-financeira/cartoes-cripto-sem-reporte' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Financeira',
          relatedPages: [
            '/soberania-financeira',
            '/soberania-financeira/exchanges-privacidade-e-kyc',
            '/bitpark-cartao-bitcoin',
            '/saida/cedula-residencia-chile',
            '/palau-digital-residency',
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

        {/* CAPÍTULO 1 — Manifesto */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c4632a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Antes de escolher o cartão
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2
                className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10"
                style={{ color: '#0b2b30' }}
              >
                Não existe cartão melhor.{' '}
                <span
                  style={{
                    color: '#c4632a',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Existe cartão certo para o seu padrão de saque.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Cada cartão cripto entrega um trade-off diferente. Taxa baixa costuma vir com limite curto. Limite alto costuma vir com KYC pesado. Privacidade real costuma vir com aceitação irregular nos caixas. Quem promete os três ao mesmo tempo, com taxa zero e zero burocracia, está vendendo expectativa, não produto.
                </p>
                <p>
                  Esse guia compara dez opções reais que estão no mercado em 2026, com o que importa: taxa efetiva (não a anunciada), limite por dia e por mês, privacidade praticável e quem reporta para a Receita. Ordenadas não por preço, mas por encaixe com o perfil de saque do brasileiro que quer operar dinheiro vivo sem virar planilha automática do governo.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{
                    borderLeft: '3px solid #c4632a',
                    color: '#0b2b30',
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                  }}
                >
                  Privacidade financeira não é fugir. É decidir quem vê o quê.
                </blockquote>
                <p>
                  Lê com calma. Identifica seu padrão real de saque (valor médio, frequência, jurisdição), escolhe um cartão como camada principal e um segundo como redundância. Combinar dois cartões diferentes em jurisdições distintas costuma render mais soberania do que escolher o cartão perfeito.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — IMAGEM ATM */}
        <section className="relative">
          <div className="relative h-[420px] md:h-[560px] lg:h-[680px] overflow-hidden">
            <img
              src={atmImg}
              alt="ATM solitário em beco escuro à noite com silhueta caminhando ao fundo, alegoria sobre saque discreto e privacidade financeira"
              loading="lazy"
              width={1600}
              height={1100}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(11,43,48,0.25) 0%, rgba(11,43,48,0.85) 100%)',
              }}
            />
            <div className="absolute inset-0 flex items-end px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
              <motion.div {...fade(0)} className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.3em] font-bold mb-3" style={{ color: '#e8a36b' }}>
                  Capítulo 02 · Premissa
                </p>
                <p
                  className="text-3xl md:text-5xl lg:text-6xl font-light italic leading-[1.2]"
                  style={{ color: '#f4ede4', fontFamily: "'Playfair Display', serif" }}
                >
                  Todo saque deixa rastro. O jogo é decidir qual rastro fica, qual some, qual vai para o lugar errado.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — RANKING DOS 10 CARTÕES (faixa teal escura) */}
        <section
          className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: '#0b2b30', color: '#f4ede4' }}
        >
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 03 · Ranking
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Dez cartões.{' '}
                <span
                  style={{
                    color: '#e8a36b',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Veredito honesto em cada um.
                </span>
              </h2>
              <p
                className="mt-6 text-lg md:text-xl font-light leading-[1.6]"
                style={{ color: 'rgba(244,237,228,0.75)' }}
              >
                Ordenados por encaixe prático com o perfil do brasileiro que saca dinheiro vivo. Não por simpatia, não por afiliado, não por hype.
              </p>
            </motion.div>

            <div className="space-y-5">
              {CARTOES.map((c, i) => (
                <motion.article
                  key={c.nome}
                  {...fade(i * 0.04)}
                  className="grid lg:grid-cols-12 gap-6 lg:gap-10 p-6 md:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'rgba(244,237,228,0.04)',
                    border: '1px solid rgba(232,163,107,0.15)',
                  }}
                >
                  {/* Rank + Nome */}
                  <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2">
                    <div
                      className="text-5xl md:text-6xl lg:text-7xl font-black leading-none"
                      style={{ color: '#e8a36b', fontFamily: "'Inter Tight', sans-serif" }}
                    >
                      {String(c.rank).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black" style={{ color: '#f4ede4' }}>
                        {c.nome}
                      </h3>
                      <div className="mt-3">
                        <PrivacidadeBadge nivel={c.privacidade} />
                      </div>
                    </div>
                  </div>

                  {/* Veredito + métricas */}
                  <div className="lg:col-span-9 space-y-6">
                    <p
                      className="text-xl md:text-2xl leading-snug font-light italic"
                      style={{ color: '#ffb37a', fontFamily: "'Playfair Display', serif" }}
                    >
                      {c.veredito}
                    </p>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="p-5 rounded-xl" style={{ backgroundColor: 'rgba(244,237,228,0.04)' }}>
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#e8a36b' }}>
                          Taxa
                        </p>
                        <p className="text-base md:text-lg" style={{ color: '#f4ede4' }}>{c.taxa}</p>
                      </div>
                      <div className="p-5 rounded-xl" style={{ backgroundColor: 'rgba(244,237,228,0.04)' }}>
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#e8a36b' }}>
                          Limite
                        </p>
                        <p className="text-base md:text-lg" style={{ color: '#f4ede4' }}>{c.limite}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 pt-2">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 size={14} style={{ color: '#7ed3a1' }} />
                          <p className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: '#7ed3a1' }}>
                            Pontos fortes
                          </p>
                        </div>
                        <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                          {c.fortes}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle size={14} style={{ color: '#ff9b9b' }} />
                          <p className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: '#ff9b9b' }}>
                            Pontos fracos
                          </p>
                        </div>
                        <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                          {c.fracos}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t" style={{ borderColor: 'rgba(232,163,107,0.18)' }}>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#c4632a' }}>
                        Perfil ideal
                      </p>
                      <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.92)' }}>
                        {c.perfilIdeal}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4 — IMAGEM CARDS + matriz de escolha */}
        <section
          className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36"
          style={{ backgroundColor: '#ece2d3' }}
        >
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>
                Capítulo 04 · Matriz de escolha
              </span>
              <h2
                className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8"
                style={{ color: '#0b2b30' }}
              >
                Pergunte qual encaixa,{' '}
                <span
                  style={{
                    color: '#c4632a',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  não qual é o melhor.
                </span>
              </h2>
              <div className="space-y-4">
                {[
                  { p: 'Saco menos de USD 500 por mês no varejo brasileiro', r: 'Picnique como principal, Mero como reserva.' },
                  { p: 'Saco entre USD 2 mil e USD 10 mil por mês, prefiro previsibilidade', r: 'RedotPay como base, Picnique para os primeiros saques grátis.' },
                  { p: 'Movo valores altos, já tenho ou vou tirar cédula paraguaia', r: 'ChapoBank como principal, RedotPay como secundário.' },
                  { p: 'Saco no exterior com frequência, busco taxa zero declarada', r: 'Krak ou Mero, ciente do spread do ATM local.' },
                  { p: 'Privacidade extrema, OPSEC dominado, aceito instabilidade', r: 'Cartão semi-anônimo como camada principal, Picnique como respaldo legítimo.' },
                ].map((l, i) => (
                  <motion.div
                    key={i}
                    {...fade(i * 0.04)}
                    className="grid md:grid-cols-12 gap-4 p-5 rounded-xl"
                    style={{ backgroundColor: '#f4ede4' }}
                  >
                    <div className="md:col-span-5">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1" style={{ color: '#5a6664' }}>
                        Se você
                      </p>
                      <p className="text-sm md:text-base leading-snug font-light" style={{ color: '#2d3a37' }}>
                        {l.p}
                      </p>
                    </div>
                    <div className="md:col-span-7 md:pl-6 md:border-l" style={{ borderColor: '#d4c5ad' }}>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1" style={{ color: '#c4632a' }}>
                        Sua combinação
                      </p>
                      <p className="text-sm md:text-base leading-snug font-medium" style={{ color: '#0b2b30' }}>
                        {l.r}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={cardsImg}
                  alt="Conjunto de cartões pretos matte com borda de cobre sobre fundo teal, ao lado de notas de dólar, representando a comparação de cartões cripto"
                  loading="lazy"
                  width={1600}
                  height={1100}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — ESTRATÉGIAS DE PRIVACIDADE */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>
                Capítulo 05 · Camadas de privacidade
              </span>
              <h2
                className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight"
                style={{ color: '#0b2b30' }}
              >
                O cartão é uma porta.{' '}
                <span
                  style={{
                    color: '#c4632a',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  O documento é a chave.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: '#2d3a37' }}>
                Trocar de cartão sem trocar de documento muda pouco. As três camadas abaixo são o que determina se o saque vira reporte automático ou desaparece no ruído do mercado.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {ESTRATEGIAS.map((e, i) => (
                <motion.div
                  key={e.titulo}
                  {...fade(i * 0.06)}
                  className="p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 relative"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 3px rgba(11,43,48,0.08)',
                  }}
                >
                  <span
                    className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{ backgroundColor: 'rgba(196,99,42,0.12)', color: '#c4632a' }}
                  >
                    {e.badge}
                  </span>
                  <div
                    className="inline-flex p-3 rounded-xl mb-5"
                    style={{ backgroundColor: 'rgba(180,88,54,0.12)' }}
                  >
                    <e.icon size={22} style={{ color: '#c4632a' }} />
                  </div>
                  <h3 className="text-2xl font-black mb-3" style={{ color: '#0b2b30' }}>
                    {e.titulo}
                  </h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                    {e.descricao}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6 — ALERTAS */}
        <section
          className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: '#0b2b30', color: '#f4ede4' }}
        >
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-start">
            <motion.div {...fade(0)} className="lg:col-span-5">
              <div
                className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(232,163,107,0.12)', color: '#e8a36b' }}
              >
                <AlertTriangle size={14} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Capítulo 06 · Armadilhas</span>
              </div>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-6">
                Os erros que{' '}
                <span
                  style={{
                    color: '#e8a36b',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  reportam você por inércia.
                </span>
              </h2>
              <p
                className="text-lg font-light leading-[1.7]"
                style={{ color: 'rgba(244,237,228,0.75)' }}
              >
                A maior parte dos brasileiros que vira planilha da Receita não foi entregue por má fé. Foi entregue por desatenção aos cinco pontos abaixo.
              </p>
            </motion.div>

            <div className="lg:col-span-7 space-y-4">
              {ALERTAS.map((a, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.04)}
                  className="flex gap-6 p-6 md:p-7 rounded-2xl"
                  style={{
                    backgroundColor: 'rgba(244,237,228,0.06)',
                    border: '1px solid rgba(232,163,107,0.15)',
                  }}
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black"
                    style={{ backgroundColor: 'rgba(232,163,107,0.2)', color: '#e8a36b' }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.92)' }}>
                    {a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Imagem documento + estratégia */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6 lg:order-2">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>
                Capítulo 07 · Empilhamento
              </span>
              <h2
                className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-6"
                style={{ color: '#0b2b30' }}
              >
                A blindagem real é{' '}
                <span
                  style={{
                    color: '#c4632a',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  três camadas operando juntas.
                </span>
              </h2>
              <div className="space-y-5 text-lg font-light leading-[1.7]" style={{ color: '#2d3a37' }}>
                <p>
                  Camada um: documento de jurisdição fora do CRS para abrir conta e cartão. Camada dois: cartão cripto em exchange ou neobank fora do Brasil. Camada três: padrão de uso disciplinado, sem disparar algoritmo antifraude.
                </p>
                <p>
                  Tirar qualquer camada da combinação reduz a robustez do conjunto. Cartão excelente com documento brasileiro vira reporte. Documento paraguaio com cartão de exchange brasileira vira reporte. Cartão e documento bons com padrão de saque caótico vira bloqueio. As três precisam funcionar como peças de um mesmo mecanismo.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/saida/cedula-residencia-chile"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: '#0b2b30', color: '#f4ede4' }}
                >
                  Cédula chilena 100% online <ArrowRight size={16} />
                </Link>
                <Link
                  to="/palau-digital-residency"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: 'transparent', color: '#0b2b30', border: '1px solid #0b2b30' }}
                >
                  ID de Palau remoto <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6 lg:order-1">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={docImg}
                  alt="Passaporte genérico ao lado de cartão com chip RFID e maço de notas em mesa de madeira sob luz cinematográfica, simbolizando o empilhamento de documento e cartão para privacidade financeira"
                  loading="lazy"
                  width={1600}
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
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>
                Capítulo 08 · Perguntas que importam
              </span>
              <h2
                className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight"
                style={{ color: '#0b2b30' }}
              >
                Antes do clique,{' '}
                <span
                  style={{
                    color: '#c4632a',
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
                      boxShadow: open ? '0 8px 24px rgba(11,43,48,0.1)' : '0 1px 3px rgba(11,43,48,0.05)',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left"
                    >
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0b2b30' }}>
                        {f.q}
                      </span>
                      <ChevronDown
                        size={22}
                        className="shrink-0 transition-transform duration-500"
                        style={{
                          color: '#c4632a',
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
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
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

        {/* CAPÍTULO 9 — Continue a trilha */}
        <section
          className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: '#0b2b30', color: '#f4ede4' }}
        >
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Um cartão{' '}
                <span
                  style={{
                    color: '#e8a36b',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  não constrói soberania sozinho.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  to: '/soberania-financeira/exchanges-privacidade-e-kyc',
                  titulo: 'Exchanges com privacidade e sem KYC',
                  texto: 'Onde comprar a cripto que vai abastecer seu cartão sem entregar identidade na origem.',
                },
                {
                  to: '/saida/cedula-residencia-chile',
                  titulo: 'Cédula e residência no Chile',
                  texto: 'Documentação real de país sério, processo 100 por cento online para começar.',
                },
                {
                  to: '/teoria-das-bandeiras',
                  titulo: 'Teoria das Bandeiras',
                  texto: 'O framework de jurisdições múltiplas que torna cada cartão e cada conta uma peça de um sistema maior.',
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
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>
                    {c.titulo}
                  </h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>
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