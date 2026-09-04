import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wallet, Calendar, Repeat, FileCheck2, ShieldOff, ChevronDown,
  ArrowRight, AlertTriangle, ScrollText, KeyRound,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/imposto-renda/isencao-hero.jpg';
import mesImg from '@/assets/imposto-renda/isencao-mes.jpg';
import autocustodiaImg from '@/assets/imposto-renda/isencao-autocustodia.jpg';

/**
 * /imposto-renda/isencao-35-mil
 * Página filha de /imposto-renda/declarar-bitcoin-2026.
 * Paleta: Sand #f4ede4 / #ece2d3, Deep Teal #0e3b3a, acento cobre #b4652f.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const EVENTOS = [
  { evento: 'Venda de bitcoin por reais', conta: 'Sim, entra na soma do mês' },
  { evento: 'Troca de bitcoin por outra criptomoeda', conta: 'Sim, permuta é alienação' },
  { evento: 'Pagamento de produto ou serviço com bitcoin', conta: 'Sim, uso como meio de troca é alienação' },
  { evento: 'Doação de bitcoin a terceiro', conta: 'Sim, para quem doa, com regras próprias de ITCMD' },
  { evento: 'Transferência para sua própria hardware wallet', conta: 'Não, não há mudança de titularidade' },
  { evento: 'Transferência entre suas próprias exchanges', conta: 'Não, não há alienação' },
];

const ARMADILHAS = [
  'Fatiar uma venda grande em várias operações menores no mesmo mês achando que cada uma, isolada, fica abaixo do limite. A Receita soma todas as alienações do mês, em todas as exchanges e carteiras, não operação por operação.',
  'Vender em exchange nacional e também em exchange do exterior no mesmo mês sem somar os dois totais. O limite mensal é por contribuinte, não por plataforma.',
  'Confundir o limite de R$ 35.000 com limite de patrimônio total em bitcoin. O limite é sobre o valor total vendido no mês, não sobre quanto você possui guardado.',
  'Achar que o limite é por tipo de criptoativo. Não é. A soma é de todas as alienações de criptoativos do mês, bitcoin junto com qualquer outro ativo digital que você tenha vendido.',
  'Deixar de apurar o ganho de capital achando que, por estar isento, não precisa nem calcular. Mesmo isento, o valor da operação deve constar no controle mensal para comprovar, se cobrado, que a venda realmente ficou dentro do limite.',
  'Vender no início de um mês e no fim do mês seguinte achando que "ainda está dentro do período de 60 dias". O corte é por mês-calendário civil, não por janela móvel de 30 dias.',
];

const FAQ = [
  {
    q: 'O que é a isenção de R$ 35 mil no bitcoin?',
    a: 'É o limite mensal de alienações de criptoativos, em reais, abaixo do qual o ganho de capital apurado fica isento de imposto de renda. Se a soma de tudo que você vendeu, trocou ou usou como pagamento no mês ficar até R$ 35.000, não há imposto a recolher sobre o lucro daquele mês.',
  },
  {
    q: 'O limite de R$ 35 mil é sobre o valor vendido ou sobre o lucro?',
    a: 'É sobre o valor total das alienações do mês, não sobre o lucro. Mesmo que o lucro seja pequeno, se a soma das vendas do mês ultrapassar R$ 35.000, o ganho de capital inteiro do mês passa a ser tributado, não apenas a parte que exceder o limite.',
  },
  {
    q: 'Como se conta o mês para efeito da isenção?',
    a: 'Conta-se o mês-calendário civil, do dia 1 ao último dia do mês. Não existe janela móvel de 30 dias corridos a partir da primeira venda. Uma venda no dia 31 de um mês e outra no dia 1 do mês seguinte são contadas em períodos de apuração diferentes.',
  },
  {
    q: 'Transferir bitcoin da exchange para minha hardware wallet consome o limite de R$ 35 mil?',
    a: 'Não. Mover bitcoin para autocustódia não é alienação, porque a titularidade do ativo continua sendo sua. Não há venda, não há troca de titularidade e, portanto, não há fato gerador de ganho de capital nem consumo do limite mensal de isenção.',
  },
  {
    q: 'Se eu vender bitcoin em duas exchanges diferentes no mesmo mês, os limites são separados?',
    a: 'Não. O limite de R$ 35.000 é por contribuinte, somando todas as alienações do mês em todas as plataformas, nacionais e estrangeiras, e mesmo operações feitas fora de exchange, como vendas diretas P2P.',
  },
  {
    q: 'Preciso guardar comprovante mesmo estando dentro do limite de isenção?',
    a: 'Sim. Mantenha extratos de todas as operações do mês, mesmo isentas, porque é esse histórico que comprova, em caso de fiscalização, que a soma realmente ficou dentro do limite. Sem prova documental, a Receita pode presumir valores diferentes dos que você declarou.',
  },
  {
    q: 'A isenção de R$ 35 mil vale para outras criptomoedas além do bitcoin?',
    a: 'Sim, o limite mensal de isenção vale para o conjunto de todos os criptoativos alienados no mês, não apenas bitcoin. Se você vender bitcoin e outro ativo digital no mesmo mês, a soma de ambos entra no cálculo do limite.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Moeda de bitcoin física sobre fundo escuro, representando o limite mensal de isenção de imposto sobre alienação de criptoativos"
        width={768}
        height={1024}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(14,59,58,0.6) 0%, rgba(14,59,58,0.4) 40%, rgba(14,59,58,0.92) 100%)' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-3 mb-8">
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md"
            style={{ backgroundColor: 'rgba(244,237,228,0.15)', color: '#f4ede4', border: '1px solid rgba(244,237,228,0.3)' }}
          >
            <Wallet size={11} className="inline mr-2" /> Imposto de Renda · Isenção mensal
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Isenção de{' '}
          <span
            style={{
              color: '#e8a36b',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(232,163,107,0.45), 0 0 80px rgba(232,163,107,0.25)',
            }}
          >
            R$ 35 mil no bitcoin.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          O limite mensal que decide se você paga imposto ou não sobre a venda de bitcoin. Como se conta o mês, o que realmente é alienação, e por que fatiar venda é a armadilha mais comum de quem acha que está sendo esperto.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function Isencao35Mil() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/imposto-renda/isencao-35-mil"
        custom={{
          title: 'Isenção de R$ 35 Mil no Bitcoin: Como Funciona o Limite Mensal',
          description:
            'Isenção de 35 mil bitcoin: como se conta o mês, o que conta como alienação, armadilhas de fatiar vendas, prova documental e por que autocustódia não é evento tributável.',
          canonical: 'https://lordjunnior.com.br/imposto-renda/isencao-35-mil',
          primaryKeyword: 'isenção 35 mil bitcoin',
          lsiKeywords: [
            'limite isenção venda bitcoin',
            'ganho de capital isento criptoativo',
            'como se conta o mês isenção bitcoin',
            'fatiar venda de bitcoin imposto',
            'alienação de criptoativos',
            'autocustódia não é evento tributável',
          ],
          longTailKeywords: [
            'isenção de 35 mil reais em bitcoin como funciona',
            'o que conta como alienação de bitcoin',
            'posso vender bitcoin em duas exchanges para não pagar imposto',
            'transferir bitcoin para hardware wallet paga imposto',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Imposto de Renda', url: '/imposto-renda' },
            { name: 'Declarar Bitcoin 2026', url: '/imposto-renda/declarar-bitcoin-2026' },
            { name: 'Isenção de R$ 35 Mil', url: '/imposto-renda/isencao-35-mil' },
          ],
          schemaType: 'Article',
          articleSection: 'Imposto de Renda',
          relatedPages: [
            '/imposto-renda/declarar-bitcoin-2026',
            '/autocustodia',
            '/soberania-financeira/exchanges-privacidade-e-kyc',
            '/saida/residencia-fiscal',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* Trilha / breadcrumb interno */}
        <section className="relative px-6 md:px-12 lg:px-20 pt-16">
          <div className="max-w-[1600px] mx-auto flex flex-wrap items-center gap-3 text-sm font-semibold" style={{ color: '#5a6664' }}>
            <Link to="/imposto-renda/declarar-bitcoin-2026" className="hover:underline" style={{ color: '#b4652f' }}>
              Como declarar bitcoin no imposto de renda 2026
            </Link>
            <span>/</span>
            <span>Isenção de R$ 35 mil</span>
          </div>
        </section>

        {/* AVISO YMYL */}
        <section className="relative px-6 md:px-12 lg:px-20 pt-10">
          <div className="max-w-[1600px] mx-auto flex gap-4 items-start p-6 rounded-2xl" style={{ backgroundColor: 'rgba(180,101,47,0.08)', border: '1px solid rgba(180,101,47,0.25)' }}>
            <AlertTriangle size={22} className="shrink-0 mt-1" style={{ color: '#b4652f' }} />
            <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
              Este conteúdo é educacional e não substitui aconselhamento tributário individualizado. Regras de isenção podem mudar por nova legislação ou instrução normativa. Confirme sempre o valor vigente do limite mensal com um contador especializado em criptoativos antes de tomar decisão de venda.
            </p>
          </div>
        </section>

        {/* CAPÍTULO 1 — O QUE É O LIMITE */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b4652f' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b4652f' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  O que é o limite de R$ 35 mil
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Um limite mensal,{' '}
                <span style={{ color: '#b4652f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não um limite de patrimônio.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  A regra de isenção de ganho de capital sobre criptoativos funciona assim: se, em um determinado mês, a soma de todas as suas alienações de criptoativos, em reais, ficar até R$ 35.000, o ganho de capital apurado naquele mês fica isento de imposto de renda. Não existe limite anual acumulado, não existe carência entre operações. O corte é mensal e reinicia todo mês.
                </p>
                <p>
                  Isso significa que quem vende R$ 34.000 em bitcoin em janeiro e mais R$ 34.000 em fevereiro não paga imposto em nenhum dos dois meses, mesmo tendo movimentado R$ 68.000 no total do bimestre. Já quem vende R$ 40.000 em um único mês perde a isenção do mês inteiro, e o ganho de capital total daquela venda é tributado, não apenas o que excedeu R$ 35.000.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #b4652f', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Isenção não é vácuo legal. É regra com data de corte, soma exata e prova documental exigida.
                </blockquote>
                <p>
                  Esse detalhe (é o total inteiro tributado, não apenas o excedente) é o que mais surpreende quem calcula errado achando que só paga imposto "sobre o que passou de R$ 35 mil". Não é assim que a regra funciona.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — COMO SE CONTA O MÊS + IMAGEM */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 02 · Como se conta o mês
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8">
                Mês-calendário civil,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não janela de 30 dias.
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.88)' }}>
                <p>
                  O período de apuração vai do dia 1 ao último dia de cada mês do calendário civil. Não existe contagem de "30 dias corridos a partir da primeira venda". Uma venda feita no dia 31 de janeiro e outra no dia 1 de fevereiro pertencem a dois períodos de apuração diferentes, mesmo estando separadas por apenas 24 horas.
                </p>
                <p>
                  Isso cria uma pequena margem de manobra legítima para quem planeja com antecedência: dividir uma venda grande entre o fim de um mês e o começo do seguinte, respeitando o limite de R$ 35.000 em cada período, é estratégia válida, desde que as operações sejam reais, documentadas e não configurem simulação para burlar o limite dentro do mesmo período.
                </p>
                <p>
                  O erro comum é confundir esse planejamento legítimo, feito com meses-calendário distintos, com o fatiamento artificial de vendas dentro do mesmo mês, que é a armadilha discutida no capítulo seguinte.
                </p>
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={mesImg}
                  alt="Negociação de bitcoin entre pares, ilustrando alienação de criptoativo sujeita ao limite mensal de isenção"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3 — O QUE CONTA COMO ALIENAÇÃO */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b4652f' }}>
                Capítulo 03 · O que é alienação
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Vender é só{' '}
                <span style={{ color: '#b4652f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  uma das formas de alienar.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: '#2d3a37' }}>
                A legislação trata como alienação qualquer operação que transfira a titularidade do criptoativo para outra pessoa, física ou jurídica. Venda por real é a mais óbvia, mas não é a única.
              </p>
            </motion.div>

            <div className="overflow-x-auto rounded-2xl" style={{ boxShadow: '0 1px 3px rgba(14,59,58,0.08)' }}>
              <table className="w-full hidden md:table" style={{ backgroundColor: '#ffffff' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0e3b3a' }}>
                    <th className="text-left p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#f4ede4' }}>Evento</th>
                    <th className="text-left p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#f4ede4' }}>Conta para o limite mensal?</th>
                  </tr>
                </thead>
                <tbody>
                  {EVENTOS.map((e, i) => (
                    <tr key={e.evento} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f4ede4' }}>
                      <td className="p-5 text-base font-light" style={{ color: '#2d3a37' }}>{e.evento}</td>
                      <td className="p-5 text-base font-bold" style={{ color: e.conta.startsWith('Sim') ? '#b4652f' : '#0e3b3a' }}>{e.conta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="md:hidden space-y-3 p-2" style={{ backgroundColor: '#f4ede4' }}>
                {EVENTOS.map((e) => (
                  <div key={e.evento} className="p-5 rounded-xl" style={{ backgroundColor: '#ffffff' }}>
                    <p className="text-base font-light mb-2" style={{ color: '#2d3a37' }}>{e.evento}</p>
                    <p className="text-base font-bold" style={{ color: e.conta.startsWith('Sim') ? '#b4652f' : '#0e3b3a' }}>{e.conta}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4 — AUTOCUSTÓDIA NÃO É EVENTO TRIBUTÁVEL */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b4652f' }}>
                Capítulo 04 · Autocustódia
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Guardar sua própria chave{' '}
                <span style={{ color: '#b4652f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  nunca consumiu limite nenhum.
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Transferir bitcoin de uma exchange para uma hardware wallet sob seu controle não muda o titular do ativo. Você era dono antes, continua sendo dono depois, apenas trocou onde a chave privada fica guardada. Sem mudança de titularidade não há alienação, e sem alienação não há fato gerador de ganho de capital nem consumo do limite mensal de R$ 35.000.
                </p>
                <p>
                  O mesmo raciocínio vale para mover bitcoin entre duas exchanges que você mesmo controla, ou entre duas carteiras próprias. É movimentação patrimonial interna, não circulação de riqueza entre partes diferentes. A Receita não tributa você se mexer o próprio dinheiro de um bolso para o outro.
                </p>
                <p>
                  Isso é especialmente relevante para quem está migrando de exchange com KYC pesado para autocustódia por motivo de privacidade e soberania: a migração em si é neutra do ponto de vista fiscal, desde que você mantenha o histórico do custo de aquisição original para quando, no futuro, decidir vender.
                </p>
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={autocustodiaImg}
                  alt="Cofre digital simbolizando autocustódia de bitcoin, movimentação patrimonial que não é evento tributável"
                  loading="lazy"
                  width={1920}
                  height={1080}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — ARMADILHAS DE FATIAR VENDAS */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(232,163,107,0.12)', color: '#e8a36b' }}>
                <AlertTriangle size={14} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Capítulo 05 · Armadilhas</span>
              </div>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Fatiar venda{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não engana o Fisco.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {ARMADILHAS.map((a, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="flex gap-6 p-6 md:p-8 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.15)' }}>
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black" style={{ backgroundColor: 'rgba(232,163,107,0.2)', color: '#e8a36b' }}>
                    {i + 1}
                  </div>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.92)' }}>{a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6 — PROVA DOCUMENTAL */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b4652f' }}>
                Capítulo 06 · Prova documental
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Sem extrato,{' '}
                <span style={{ color: '#b4652f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  a isenção vira palpite.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: FileCheck2,
                  titulo: 'Extrato completo por exchange',
                  texto: 'Exporte mensalmente o histórico de todas as operações em cada exchange usada, nacional ou estrangeira. É o documento que comprova a soma real das alienações do mês.',
                },
                {
                  icon: ScrollText,
                  titulo: 'Planilha de controle próprio',
                  texto: 'Mantenha planilha somando, mês a mês, todas as vendas, trocas e pagamentos feitos com criptoativos, cruzando com o limite de R$ 35.000 antes de fechar cada operação.',
                },
                {
                  icon: KeyRound,
                  titulo: 'Registro de transferências para autocustódia',
                  texto: 'Anote data, quantidade e para qual carteira o bitcoin foi movido. Isso comprova que a movimentação não foi alienação, caso a Receita questione um saldo que "sumiu" da exchange.',
                },
                {
                  icon: Calendar,
                  titulo: 'Data exata de cada operação',
                  texto: 'Guarde print ou extrato com data e hora de cada venda. É o que resolve qualquer dúvida sobre em qual mês-calendário a operação realmente ocorreu.',
                },
              ].map((c, i) => (
                <motion.div key={c.titulo} {...fade(i * 0.06)} className="p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(14,59,58,0.08)' }}>
                  <div className="inline-flex p-3 rounded-xl mb-5" style={{ backgroundColor: 'rgba(180,101,47,0.12)' }}>
                    <c.icon size={22} style={{ color: '#b4652f' }} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-3" style={{ color: '#0e3b3a' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b4652f' }}>
                Capítulo 07 · Perguntas que importam
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Antes de planejar a venda,{' '}
                <span style={{ color: '#b4652f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  a dúvida certa.
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

        {/* CAPÍTULO 8 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Isenção é regra tática,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não estratégia de vida.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  to: '/imposto-renda/declarar-bitcoin-2026',
                  titulo: 'Guia completo de declaração de bitcoin',
                  texto: 'Ficha de bens, código correto, ganho de capital e obrigação acessória mensal explicados do zero.',
                },
                {
                  to: '/autocustodia',
                  titulo: 'Autocustódia sem erro',
                  texto: 'Como sair de exchange com segurança e manter controle total sobre suas próprias chaves.',
                },
                {
                  to: '/saida/residencia-fiscal',
                  titulo: 'Residência fiscal e planejamento de saída',
                  texto: 'Quando faz sentido considerar mudança de domicílio fiscal para reduzir carga tributária sobre patrimônio em bitcoin.',
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
              <Link to="/soberania-financeira/exchanges-privacidade-e-kyc" className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase" style={{ color: '#e8a36b' }}>
                Ver também: exchanges, privacidade e KYC <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
