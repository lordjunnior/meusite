import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText, ShieldAlert, Calculator, Landmark, KeyRound, Wallet,
  AlertTriangle, ChevronDown, ArrowRight, ScanEye, Scale, Users,
  Building2, ClipboardList,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/imposto-renda/ir-hero.jpg';
import fichaImg from '@/assets/imposto-renda/ir-ficha.jpg';
import custodiaImg from '@/assets/imposto-renda/ir-custodia.jpg';
import cruzamentoImg from '@/assets/imposto-renda/ir-cruzamento.jpg';

/**
 * /imposto-renda/declarar-bitcoin-2026
 * Paleta: Sand #f4ede4 / #ece2d3, Deep Teal #0e3b3a, acento cobre #b4652f.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const OBRIGADOS = [
  {
    n: '01',
    titulo: 'Quem teve bens acima de R$ 5.000 em 31/12',
    icon: Wallet,
    descricao:
      'Se o valor total dos seus criptoativos, somado em custo de aquisição, ultrapassou R$ 5.000 no último dia do ano-calendário, a declaração de bens e direitos é obrigatória mesmo que você não tenha vendido nada. Bitcoin parado em carteira própria conta. Sats guardados em hardware wallet contam. O gatilho é posse, não movimentação.',
  },
  {
    n: '02',
    titulo: 'Quem vendeu, trocou ou usou bitcoin para pagar algo',
    icon: Calculator,
    descricao:
      'Toda alienação de criptoativo, seja venda por real, troca por outra moeda ou uso direto para comprar um produto, é fato gerador de ganho de capital. Se o total de vendas do mês ultrapassou o limite de isenção, o imposto é apurado e recolhido via DARF até o último dia útil do mês seguinte.',
  },
  {
    n: '03',
    titulo: 'Quem operou em exchange do exterior acima de R$ 30.000 no mês',
    icon: Building2,
    descricao:
      'Desde a instrução normativa que trata da obrigação acessória de criptoativos, quem movimenta mais de R$ 30 mil no mês em exchange estrangeira, ou em operação sem intermediário como transferência direta entre carteiras, precisa informar a operação à Receita Federal mensalmente, independentemente de ter lucro.',
  },
  {
    n: '04',
    titulo: 'Quem recebeu bitcoin em herança, doação ou permuta',
    icon: Users,
    descricao:
      'Herdeiro que recebe bitcoin em inventário declara o valor recebido na ficha de bens, com o código de origem correto, e o espólio pode ter recolhido ITCMD conforme a legislação estadual. Doação de bitcoin entre pessoas físicas segue lógica parecida, com incidência de ITCMD no estado do doador ou donatário.',
  },
];

const CODIGOS = [
  { codigo: '81', grupo: 'Grupo 08 · Criptoativos', desc: 'Bitcoin' },
  { codigo: '82', grupo: 'Grupo 08 · Criptoativos', desc: 'Stablecoin (não é a categoria deste guia, citada apenas para diferenciar)' },
  { codigo: '89', grupo: 'Grupo 08 · Criptoativos', desc: 'Outros criptoativos, quando não há código específico' },
];

const ALIQUOTAS = [
  { faixa: 'Até R$ 5.000.000 de ganho no mês', aliquota: '15%' },
  { faixa: 'De R$ 5.000.000,01 a R$ 10.000.000', aliquota: '17,5%' },
  { faixa: 'De R$ 10.000.000,01 a R$ 30.000.000', aliquota: '20%' },
  { faixa: 'Acima de R$ 30.000.000', aliquota: '22,5%' },
];

const ERROS = [
  'Declarar o bitcoin pelo valor de mercado em 31 de dezembro em vez do custo de aquisição. A ficha de bens e direitos pede o preço que você pagou, corrigido por aportes e vendas parciais, não a cotação do dia.',
  'Ignorar a obrigação acessória mensal por achar que só vale para quem lucrou. A informação de operações em exchange do exterior ou fora de exchange acima do limite mensal é devida mesmo em caso de prejuízo ou de simples movimentação entre carteiras próprias em certos cenários.',
  'Somar vendas em exchanges diferentes sem controle e ultrapassar sem perceber o limite mensal de isenção. A Receita soma tudo, e o contribuinte que fatiar vendas achando que cada corretora conta separado cai direto na malha fina.',
  'Não guardar comprovante de custo de aquisição de compras feitas em P2P ou em corretora que já fechou. Sem nota, extrato ou histórico exportável, o Fisco pode arbitrar custo zero, o que infla artificialmente o ganho de capital tributável.',
  'Deixar de recolher o DARF do mês em que houve ganho tributável, mesmo quando o valor é pequeno. Atraso gera multa e juros Selic, e a recorrência de omissão é um dos fatores que elevam o risco de malha fina.',
  'Achar que transferir bitcoin de uma exchange para a própria hardware wallet é eufemismo para venda. Mover para autocustódia não é alienação e não gera imposto, mas exige registro cuidadoso do custo de aquisição original para o cálculo futuro.',
];

const CRUZAMENTOS = [
  'e-Financeira das exchanges brasileiras, que reportam nome, CPF, volume e saldo de clientes diretamente à Receita Federal em periodicidade definida por instrução normativa.',
  'Obrigação acessória mensal de operações com criptoativos, preenchida por qualquer pessoa física ou exchange que movimente acima do limite estabelecido, inclusive em plataformas do exterior.',
  'Acordos internacionais de troca automática de informação financeira, que aproximam o cerco sobre contas em exchanges estrangeiras que ainda operam como se fossem invisíveis ao Brasil.',
  'Cruzamento com a declaração de bens e direitos de anos anteriores, identificando saltos patrimoniais sem lastro em renda declarada ou em ganho de capital recolhido.',
  'Monitoramento de blockchain pública, já usado por diversas autoridades fiscais no mundo para rastrear movimentações entre endereços conhecidos e exchanges regulamentadas.',
];

const FAQ = [
  {
    q: 'Preciso declarar bitcoin mesmo se nunca vendi nada?',
    a: 'Sim, se o valor total em custo de aquisição ultrapassar R$ 5.000 em 31 de dezembro. A declaração de bens e direitos existe para registrar posse patrimonial, não apenas movimentação. Guardar bitcoin em autocustódia sem nunca vender continua exigindo a informação anual.',
  },
  {
    q: 'Qual código usar para declarar bitcoin na ficha de bens e direitos?',
    a: 'O código 81, dentro do grupo 08 (Criptoativos), é o código específico para bitcoin. Discriminar o CPF ou CNPJ da exchange onde o ativo está custodiado, ou informar que está em carteira própria (autocustódia), com a quantidade de BTC e o custo total de aquisição em reais.',
  },
  {
    q: 'Como calcular o custo de aquisição do meu bitcoin?',
    a: 'Custo de aquisição é a soma de tudo que você efetivamente pagou para adquirir os satoshis que possui, incluindo taxas de corretagem, convertido para reais na cotação de cada compra. Quando há várias compras em datas diferentes, o método aceito no Brasil é o custo médio ponderado, não o método específico de identificação de lote (FIFO ou LIFO).',
  },
  {
    q: 'O que acontece se eu vender bitcoin com prejuízo?',
    a: 'Não há imposto a pagar sobre a operação com prejuízo, e esse prejuízo pode ser compensado com ganhos futuros em operações de mesma natureza, dentro do mesmo mês ou em meses seguintes, desde que devidamente apurado e informado no programa de apuração de ganhos de capital em criptoativos.',
  },
  {
    q: 'Autocustódia em hardware wallet precisa ser informada separado?',
    a: 'Sim. Na ficha de bens e direitos você declara o bitcoin independentemente de onde ele está guardado, mas o campo de discriminação deve indicar claramente que o ativo está em carteira própria (self custody), sem CNPJ de exchange associado, já que não existe custodiante terceiro nesse caso.',
  },
  {
    q: 'A Receita Federal consegue ver minha carteira de bitcoin?',
    a: 'A blockchain do Bitcoin é pública, e endereços associados a exchanges regulamentadas que fizeram KYC podem ser rastreados. Autocustódia com boas práticas de privacidade dificulta esse rastreamento, mas não elimina a obrigação legal de declarar a posse e de recolher imposto sobre ganho de capital quando devido.',
  },
  {
    q: 'Preciso pagar imposto se só troquei bitcoin por outra criptomoeda?',
    a: 'Sim. A permuta entre criptoativos é fato gerador de ganho de capital no Brasil, calculado pela diferença entre o valor de mercado do ativo recebido e o custo de aquisição do ativo entregue. É um dos pontos mais ignorados por quem opera em exchanges com muitos pares de negociação.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Carteira digital com bitcoin projetada sobre documentos fiscais, representando a obrigação de declarar criptoativos no imposto de renda"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,59,58,0.6) 0%, rgba(14,59,58,0.4) 40%, rgba(14,59,58,0.9) 100%)',
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
            <FileText size={11} className="inline mr-2" /> Imposto de Renda · Bitcoin 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Como declarar bitcoin no{' '}
          <span
            style={{
              color: '#e8a36b',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(232,163,107,0.45), 0 0 80px rgba(232,163,107,0.25)',
            }}
          >
            imposto de renda 2026.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Ficha de bens, código correto, custo de aquisição, ganho de capital, obrigação acessória mensal e o que a Receita já cruza. O guia sem enrolação para quem leva Bitcoin a sério e não quer virar estatística de malha fina.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function DeclararBitcoin2026() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/imposto-renda/declarar-bitcoin-2026"
        custom={{
          title: 'Como Declarar Bitcoin no Imposto de Renda 2026: Guia Completo',
          description:
            'Como declarar bitcoin no imposto de renda 2026: ficha de bens, código 81, custo de aquisição, ganho de capital, alíquotas, obrigação acessória mensal e o que a Receita já cruza.',
          canonical: 'https://lordjunnior.com.br/imposto-renda/declarar-bitcoin-2026',
          primaryKeyword: 'como declarar bitcoin no imposto de renda',
          lsiKeywords: [
            'declarar criptoativos imposto de renda',
            'ficha de bens e direitos bitcoin',
            'código 81 bitcoin declaração',
            'ganho de capital bitcoin',
            'obrigação acessória criptoativos',
            'DARF criptomoeda',
            'malha fina bitcoin',
          ],
          longTailKeywords: [
            'como declarar bitcoin no imposto de renda 2026',
            'qual código usar para declarar bitcoin',
            'como calcular custo de aquisição de bitcoin',
            'preciso declarar bitcoin em hardware wallet',
            'obrigação acessória mensal exchange do exterior',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Imposto de Renda', url: '/imposto-renda' },
            { name: 'Declarar Bitcoin 2026', url: '/imposto-renda/declarar-bitcoin-2026' },
          ],
          schemaType: 'Article',
          articleSection: 'Imposto de Renda',
          relatedPages: [
            '/imposto-renda/isencao-35-mil',
            '/autocustodia',
            '/soberania-financeira/exchanges-privacidade-e-kyc',
            '/saida/residencia-fiscal',
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

        {/* AVISO YMYL */}
        <section className="relative px-6 md:px-12 lg:px-20 pt-16">
          <div
            className="max-w-[1600px] mx-auto flex gap-4 items-start p-6 rounded-2xl"
            style={{ backgroundColor: 'rgba(180,101,47,0.08)', border: '1px solid rgba(180,101,47,0.25)' }}
          >
            <AlertTriangle size={22} className="shrink-0 mt-1" style={{ color: '#b4652f' }} />
            <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
              Este conteúdo é educacional e não substitui aconselhamento tributário individualizado. A legislação sobre criptoativos no Brasil muda com frequência e depende de instruções normativas específicas da Receita Federal. Antes de declarar, confirme os valores e prazos atuais com um contador especializado em criptoativos.
            </p>
          </div>
        </section>

        {/* CAPÍTULO 1 — QUEM É OBRIGADO */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b4652f' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b4652f' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Quem é obrigado a declarar
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Ter bitcoin não é opcional{' '}
                <span style={{ color: '#b4652f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  na hora de declarar.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Muita gente ainda trata bitcoin como se fosse invisível para a Receita Federal, algo que só existe se você vender e converter em real. Não é assim. A obrigação de declarar nasce da posse, não da venda. Se você tem bitcoin, o Fisco quer saber, independentemente de você ter lucrado, perdido ou apenas guardado sats numa hardware wallet parada há três anos.
                </p>
                <p>
                  A regra geral que orienta a declaração de imposto de renda no Brasil é clara: qualquer pessoa física precisa declarar bens e direitos cujo valor de aquisição, somado, ultrapasse R$ 5.000 na data de 31 de dezembro do ano-base. Bitcoin entra nessa conta como qualquer outro ativo patrimonial, no grupo de criptoativos.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #b4652f', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Bitcoin não some do radar por ficar quieto. Silêncio patrimonial não declarado é o tipo de silêncio que custa caro.
                </blockquote>
                <p>
                  As quatro situações abaixo cobrem praticamente todo brasileiro que hoje tem alguma relação com Bitcoin, do HODLer que nunca vendeu um satoshi ao trader que opera todos os dias em corretora estrangeira.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — GRID DE QUEM É OBRIGADO (faixa escura) */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 02 · Quatro perfis
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Se você se encaixa em um destes,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  já é obrigado.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(244,237,228,0.15)' }}>
              {OBRIGADOS.map((e, i) => (
                <motion.div key={e.n} {...fade(i * 0.06)} className="group relative p-8 md:p-10" style={{ backgroundColor: '#0e3b3a' }}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-xl transition-transform group-hover:scale-110 duration-500" style={{ backgroundColor: 'rgba(232,163,107,0.15)', border: '1px solid rgba(232,163,107,0.3)' }}>
                      <e.icon size={22} style={{ color: '#e8a36b' }} />
                    </div>
                    <span className="text-2xl font-black" style={{ color: '#e8a36b' }}>{e.n}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-4" style={{ color: '#f4ede4' }}>{e.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.78)' }}>{e.descricao}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — FICHA DE BENS E CÓDIGOS + IMAGEM */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b4652f' }}>
                Capítulo 03 · Ficha de bens e direitos
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                O campo certo,{' '}
                <span style={{ color: '#b4652f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  o código certo.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: '#2d3a37' }}>
                Criptoativos vivem no grupo 08 da ficha de bens e direitos. Errar o código não é crime, mas gera inconsistência que chama atenção do sistema de malha fina.
              </p>
            </motion.div>

            <motion.div {...fade(0)} className="relative h-[360px] md:h-[460px] lg:h-[560px] overflow-hidden rounded-3xl mb-16 group">
              <img
                src={fichaImg}
                alt="Representação visual de bitcoin como reserva de valor guardada, ilustrando o preenchimento da ficha de bens e direitos"
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(14,59,58,0.88) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: 'rgba(244,237,228,0.7)' }}>
                  Grupo 08 · Criptoativos
                </p>
                <p className="text-2xl md:text-4xl font-light italic max-w-3xl" style={{ color: '#f4ede4', fontFamily: "'Playfair Display', serif" }}>
                  Custo de aquisição declarado, não cotação de mercado no fim do ano.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {CODIGOS.map((c, i) => (
                <motion.div key={c.codigo} {...fade(i * 0.06)} className="p-8 rounded-2xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(14,59,58,0.08)' }}>
                  <div className="inline-flex px-3 py-1 rounded-lg mb-5 text-sm font-black" style={{ backgroundColor: 'rgba(180,101,47,0.12)', color: '#b4652f' }}>
                    Código {c.codigo}
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: '#5a6664' }}>{c.grupo}</p>
                  <p className="text-lg md:text-xl font-black" style={{ color: '#0e3b3a' }}>{c.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fade(0)} className="space-y-7 text-lg md:text-xl leading-[1.7] font-light max-w-4xl" style={{ color: '#2d3a37' }}>
              <p>
                No campo de discriminação, o padrão que gera menos ruído é: nome da exchange, CNPJ (quando nacional) ou identificação do país e da plataforma (quando exterior), quantidade de bitcoin ou satoshis na data-base e o custo total de aquisição em reais, incluindo taxas pagas nas compras. Quando o bitcoin está em autocustódia, o texto deve indicar claramente "carteira própria, sem custódia de terceiros", sem inventar CNPJ de exchange que não guarda o ativo.
              </p>
              <p>
                O valor a ser lançado na coluna de 31 de dezembro do ano anterior deve ser repetido, salvo alienação parcial ou total, e o valor de 31 de dezembro do ano corrente deve refletir o custo de aquisição acumulado, somando novas compras e subtraindo, proporcionalmente, o custo do que foi vendido no período.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — GANHO DE CAPITAL E ALÍQUOTAS (creme escuro) */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-start">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b4652f' }}>
                Capítulo 04 · Ganho de capital
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Alíquota progressiva,{' '}
                <span style={{ color: '#b4652f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  recolhimento mensal.
                </span>
              </h2>
              <p className="text-lg md:text-xl font-light leading-[1.7] mb-8" style={{ color: '#2d3a37' }}>
                Sempre que a soma das vendas de criptoativos no mês ultrapassar o limite de isenção, o ganho de capital apurado é tributado com alíquota progressiva conforme o tamanho do lucro no mês, não conforme sua renda total do ano. O DARF (código 4600) vence no último dia útil do mês seguinte ao da venda.
              </p>
              <div className="space-y-3">
                {ALIQUOTAS.map((a, i) => (
                  <motion.div key={a.faixa} {...fade(i * 0.04)} className="flex items-center justify-between p-5 rounded-xl" style={{ backgroundColor: '#f4ede4' }}>
                    <span className="text-base md:text-lg font-light" style={{ color: '#2d3a37' }}>{a.faixa}</span>
                    <span className="text-base md:text-lg font-bold" style={{ color: '#0e3b3a' }}>{a.aliquota}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="p-8 md:p-10 rounded-3xl" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Scale size={22} style={{ color: '#e8a36b' }} />
                  <p className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: '#e8a36b' }}>Exemplo prático</p>
                </div>
                <p className="text-lg leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.9)' }}>
                  Você comprou 0,1 BTC por R$ 30.000 ao longo do ano (custo médio) e vendeu tudo em um único mês por R$ 55.000. O ganho de capital do mês é R$ 25.000. Se as vendas do mês, somadas, ultrapassaram o limite mensal de isenção (veja o guia completo sobre a isenção de 35 mil), incide 15% sobre o ganho apurado.
                </p>
                <p className="text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.9)' }}>
                  Nesse exemplo, o imposto devido seria R$ 3.750, recolhido via DARF código 4600 até o último dia útil do mês seguinte à venda. Perda de prazo gera multa de mora mais juros Selic sobre o valor.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — OBRIGAÇÃO ACESSÓRIA MENSAL */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6 lg:order-2">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b4652f' }}>
                Capítulo 05 · Obrigação acessória
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Exchange nacional avisa por você.{' '}
                <span style={{ color: '#b4652f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Exterior, é você quem avisa.
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Exchanges brasileiras enviam informações de seus usuários diretamente à Receita Federal, dentro do módulo de criptoativos. Quem opera só em corretora nacional não precisa preencher a obrigação acessória mensal por conta própria na maioria dos cenários, porque a plataforma já reporta.
                </p>
                <p>
                  A conta muda quando você opera em exchange sediada fora do Brasil, ou movimenta bitcoin sem intermediário (transferência direta entre carteiras, OTC, P2P fora de plataforma regulada). Nessas situações, se o total de operações do mês ultrapassar R$ 30.000, a informação precisa ser prestada pelo próprio contribuinte, por meio do sistema de coleta de informações sobre criptoativos, mesmo sem lucro na operação.
                </p>
                <p>
                  Deixar de cumprir essa obrigação, mesmo sem imposto devido, é infração autônoma e pode gerar multa. É a parte da legislação que mais pega de surpresa quem migrou para exchanges internacionais buscando mais privacidade e menos KYC.
                </p>
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6 lg:order-1">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={cruzamentoImg}
                  alt="Linha do tempo de vigilância e cruzamento de dados financeiros, ilustrando o monitoramento da Receita Federal sobre operações com criptoativos"
                  loading="lazy"
                  width={1344}
                  height={768}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — AUTOCUSTÓDIA, HARDWARE WALLET E HERANÇA */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={custodiaImg}
                  alt="Hardware wallet segurando chaves privadas de bitcoin, símbolo da autocustódia que precisa ser declarada mas não é evento tributável"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 06 · Autocustódia e herança
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8">
                Guardar chave privada{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não é sonegar imposto.
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.88)' }}>
                <p>
                  Mover bitcoin de uma exchange para a sua própria hardware wallet não é venda, não é permuta e não gera fato gerador de ganho de capital. Você continua sendo dono do mesmo ativo, apenas trocou o local de guarda. O que muda é a responsabilidade: sem exchange reportando, você precisa manter organizado o histórico de custo de aquisição para o cálculo de imposto no dia em que decidir vender.
                </p>
                <p>
                  Em caso de falecimento, o bitcoin em autocustódia entra no inventário como qualquer outro bem, avaliado pelo valor de mercado na data do óbito para fins de ITCMD estadual, e transferido aos herdeiros por meio da chave privada (seed phrase) ou de arranjos multisig planejados previamente. Sem planejamento de sucessão claro, bitcoin em hardware wallet pode se perder para sempre, e nenhum juiz reverte perda de chave privada.
                </p>
                <p>
                  Guarde extratos de compra, recibos de P2P, e-mails de exchanges e histórico de transações. Esse material é sua defesa em caso de intimação fiscal e sua prova de custo de aquisição quando a exchange original deixar de existir.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — ERROS QUE GERAM MALHA FINA */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(180,101,47,0.12)', color: '#b4652f' }}>
                <AlertTriangle size={14} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Capítulo 07 · Malha fina</span>
              </div>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Seis erros que{' '}
                <span style={{ color: '#b4652f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  chamam atenção da Receita.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {ERROS.map((a, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="flex gap-6 p-6 md:p-8 rounded-2xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(14,59,58,0.08)' }}>
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black" style={{ backgroundColor: 'rgba(180,101,47,0.15)', color: '#b4652f' }}>
                    {i + 1}
                  </div>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 8 — O QUE A RECEITA JÁ CRUZA (faixa escura) */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 08 · Vigilância fiscal
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                O Fisco já cruza{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  mais do que você imagina.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(244,237,228,0.75)' }}>
                Nenhuma dessas fontes, isoladamente, prova sonegação. Juntas, formam um mapa que torna omissão cada vez mais arriscada.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {CRUZAMENTOS.map((c, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="flex gap-5 p-6 md:p-8 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.15)' }}>
                  <ScanEye size={22} className="shrink-0 mt-1" style={{ color: '#e8a36b' }} />
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.92)' }}>{c}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 9 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b4652f' }}>
                Capítulo 09 · Perguntas que importam
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Antes de enviar a declaração,{' '}
                <span style={{ color: '#b4652f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  tire a dúvida certa.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#f4ede4', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-500" style={{ color: '#b4652f', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
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

        {/* CAPÍTULO 10 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Declarar certo é{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  metade da soberania.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  to: '/imposto-renda/isencao-35-mil',
                  titulo: 'A isenção de R$ 35 mil explicada',
                  texto: 'Como funciona o limite mensal isento de ganho de capital e por que fatiar vendas é armadilha.',
                },
                {
                  to: '/autocustodia',
                  titulo: 'Autocustódia sem erro',
                  texto: 'Como guardar seu próprio bitcoin com hardware wallet e blindar seu patrimônio de terceiros.',
                },
                {
                  to: '/soberania-financeira/exchanges-privacidade-e-kyc',
                  titulo: 'Exchanges, privacidade e KYC',
                  texto: 'O que muda ao operar fora de corretoras nacionais e o que isso exige da sua declaração.',
                },
                { to: '/dicionario-cripto', titulo: 'Glossario de soberania', texto: 'Do UTXO ao domicilio fiscal: todos os termos tecnicos deste site explicados em uma pagina.' },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group p-8 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: '#e8a36b' }}>
                    Acessar <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <Link to="/saida/residencia-fiscal" className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase" style={{ color: '#e8a36b' }}>
                Ver também: residência fiscal e planejamento de saída <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
