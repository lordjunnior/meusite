import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, ShieldAlert, KeyRound, ArrowRight, ChevronDown,
  Landmark, Timer, Layers, AlertTriangle, CheckCircle2, Wallet,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/migracao/migracao-hero.webp';
import riscoImg from '@/assets/migracao/migracao-risco-contraparte.webp';
import checklistImg from '@/assets/migracao/migracao-checklist.webp';
import testeImg from '@/assets/migracao/migracao-teste.webp';

/**
 * /autocustodia/guia-migracao-corretora
 * Página pilar do Hub de Migração Soberana: da corretora para a autocustódia.
 * Paleta: Sand #f4ede4 / #ece2d3, Deep Teal #0e3b3a, cobre/âmbar #d98a4a.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const CAMADAS_RISCO = [
  {
    titulo: 'Risco de contraparte (o clássico)',
    icon: Landmark,
    texto:
      'Enquanto o Bitcoin está na corretora, quem tem a chave privada é a empresa. Você tem um número em um banco de dados, uma promessa de resgate. Se a empresa quebrar, for hackeada ou operar com reserva fracionária, o que sobra é uma fila de credores, não o seu Bitcoin. A história do setor está cheia de casos em que o saldo apareceu na tela até o último dia.',
  },
  {
    titulo: 'Risco operacional e de congelamento',
    icon: ShieldAlert,
    texto:
      'Manutenção emergencial, atualização de sistema, revisão de compliance, exigência de documento novo, suspeita automática de movimentação atípica. Qualquer um desses eventos bloqueia o saque exatamente quando você mais quer sacar, que é quando o mercado se mexe forte ou o noticiário assusta.',
  },
  {
    titulo: 'Risco regulatório e de bloqueio de ordem judicial',
    icon: Layers,
    texto:
      'Uma corretora é uma empresa com CNPJ, endereço e obrigação legal de cumprir ordens. Bloqueio de conta, retenção de saldo e reporte automático não dependem da sua conduta: dependem da jurisdição em que a empresa opera e das regras que mudam sem aviso.',
  },
  {
    titulo: 'Risco de vigilância patrimonial',
    icon: KeyRound,
    texto:
      'Saldo em corretora com KYC completo é patrimônio mapeado, com nome, CPF, endereço e histórico de compras. Isso não é ilegal e nem é problema em si, mas é informação concentrada em um banco de dados que você não controla e que já vazou em mais de uma empresa do setor.',
  },
];

const PASSOS = [
  {
    n: '01',
    titulo: 'Escolha e prepare a carteira antes de tocar no saldo',
    texto:
      'Compre a hardware wallet direto do fabricante, gere a seed no próprio dispositivo (nunca no computador) e anote as palavras em papel de rascunho apenas para o teste inicial. O backup definitivo em aço vem depois de você ter certeza de que a carteira funciona.',
  },
  {
    n: '02',
    titulo: 'Faça a restauração de teste antes de receber qualquer valor',
    texto:
      'Apague o dispositivo e restaure a carteira usando só as palavras anotadas. Se os endereços gerados forem os mesmos, seu backup está correto. Se forem diferentes, você acabou de descobrir isso com zero Bitcoin em risco, e não com o patrimônio inteiro dentro.',
  },
  {
    n: '03',
    titulo: 'Gere o endereço de recebimento e confira na tela do dispositivo',
    texto:
      'Copie o endereço no aplicativo, mas verifique os primeiros e os últimos caracteres na telinha da hardware wallet. Malware que troca endereço na área de transferência existe e é barato de operar. A tela do dispositivo é a única fonte de verdade.',
  },
  {
    n: '04',
    titulo: 'Envie um saque de teste pequeno',
    texto:
      'Um valor que você aceitaria perder sem alterar o seu mês. Confirme o recebimento, veja a transação confirmar na rede e só então prossiga. Esse passo custa alguns reais de taxa e elimina a maior parte dos desastres relatados por iniciantes.',
  },
  {
    n: '05',
    titulo: 'Migre em lotes, não em uma tacada só',
    texto:
      'Dividir o saque em dois ou três lotes reduz o impacto de qualquer erro e evita gerar um único movimento gigante no radar da corretora. Considere as taxas de rede: lotes demais encarecem, lotes de menos concentram risco.',
  },
  {
    n: '06',
    titulo: 'Faça o backup definitivo em aço e destrua o rascunho',
    texto:
      'Com o Bitcoin já em custódia própria, transfira as palavras para uma placa de metal, guarde em local diferente do dispositivo e queime o papel de rascunho. Papel é a peça mais frágil de toda a operação.',
  },
  {
    n: '07',
    titulo: 'Documente para o imposto de renda e para a herança',
    texto:
      'Anote datas, valores em reais e taxas de cada movimentação. Migrar entre carteiras próprias não é venda e não gera imposto, mas gera obrigação de organização. E deixe instruções de acesso para quem precisaria recuperar em caso de acidente.',
  },
];

const MITOS = [
  {
    mito: '"Se eu tirar da corretora, perco tudo se errar."',
    real:
      'Errar é caro apenas quando você testa com o valor inteiro. O saque de teste existe justamente para transformar um risco irreversível em um custo de poucos reais.',
  },
  {
    mito: '"Hardware wallet é coisa de quem tem muito Bitcoin."',
    real:
      'O custo de um dispositivo se paga na primeira vez que uma corretora suspende saques. Abaixo desse patamar, uma carteira de celular bem configurada já é mais soberana do que qualquer saldo em exchange.',
  },
  {
    mito: '"A corretora é regulada, então é segura."',
    real:
      'Regulação define regras de operação e reporte. Não devolve moedas de quem foi hackeado, nem impede bloqueio de conta. Segurança de custódia é técnica, não jurídica.',
  },
  {
    mito: '"Deixo lá porque rende."',
    real:
      'Rendimento em Bitcoin custodiado é empréstimo do seu Bitcoin para terceiros, com risco de crédito embutido e sem garantia nenhuma. Toda crise recente do setor começou por essa porta.',
  },
];

const FAQ = [
  {
    q: 'Preciso tirar todo o meu Bitcoin da corretora de uma vez?',
    a: 'Não, e na maior parte dos casos não é recomendado. Faça primeiro um saque de teste pequeno, confirme o recebimento, e depois migre o restante em dois ou três lotes. Isso reduz o impacto de qualquer erro operacional e permite ajustar as taxas de rede ao longo do processo.',
  },
  {
    q: 'Transferir Bitcoin da corretora para a minha carteira gera imposto?',
    a: 'Transferência entre carteiras de mesma titularidade não é alienação e, portanto, não gera ganho de capital. O que existe é a obrigação de manter a posição corretamente declarada na ficha de bens e direitos e de guardar o registro das operações. Venda é o que tributa, não a mudança de custódia.',
  },
  {
    q: 'Qual valor mínimo justifica sair da corretora?',
    a: 'Não existe valor mínimo técnico. Existe um ponto de equilíbrio prático: enquanto o saldo for menor que o custo de uma hardware wallet somado às taxas de saque, uma carteira de celular com backup bem feito já entrega mais soberania do que a corretora. Acima disso, o dispositivo dedicado se justifica.',
  },
  {
    q: 'E se eu perder o dispositivo depois de migrar?',
    a: 'O dispositivo é apenas uma ferramenta de assinatura. Quem guarda o seu Bitcoin é a seed phrase. Com as palavras corretas você restaura o saldo em qualquer carteira compatível, do mesmo fabricante ou não. Perder o aparelho é um transtorno; perder o backup é perder o Bitcoin.',
  },
  {
    q: 'A corretora pode recusar o saque para uma carteira própria?',
    a: 'Pode pedir verificação adicional, confirmar a titularidade do endereço ou impor limites diários, especialmente em valores altos ou em contas recém-criadas. Por isso o saque de teste também serve para descobrir atrito operacional antes da migração principal.',
  },
  {
    q: 'Qual a diferença entre sair da corretora e usar uma carteira de celular?',
    a: 'Sair da corretora é passar a controlar a chave privada. A carteira de celular já faz isso, mas mantém a chave em um aparelho conectado à internet, com superfície de ataque maior. A hardware wallet mantém a chave isolada e assina as transações offline. São dois degraus da mesma escada.',
  },
  {
    q: 'Quanto tempo demora uma transferência de saque?',
    a: 'A corretora costuma levar de minutos a algumas horas para processar internamente, e a rede Bitcoin confirma normalmente no bloco seguinte quando a taxa está adequada. Em períodos de congestionamento, taxas baixas podem deixar a transação pendente por horas ou dias.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Carteira física de Bitcoin sobre bancada de aço iluminada por um feixe de luz âmbar, representando a migração da corretora para a custódia própria"
        width={1600}
        height={1000}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,59,58,0.6) 0%, rgba(14,59,58,0.35) 40%, rgba(14,59,58,0.92) 100%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <span
          className="w-fit px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md mb-8"
          style={{
            backgroundColor: 'rgba(244,237,228,0.15)',
            color: '#f4ede4',
            border: '1px solid rgba(244,237,228,0.3)',
          }}
        >
          <ShieldCheck size={11} className="inline mr-2" /> Hub de Migração Soberana
        </span>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Como sair da corretora{' '}
          <span
            style={{
              color: '#d98a4a',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(217,138,74,0.45), 0 0 80px rgba(217,138,74,0.25)',
            }}
          >
            sem perder nada no caminho.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-3xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Comprar Bitcoin é a parte fácil. A ponte que quase ninguém atravessa é a que separa o saldo na tela da corretora do Bitcoin que ninguém pode congelar. Este é o guia completo dessa travessia: risco de contraparte, checklist de sete passos, saque de teste e os erros que custam caro.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function GuiaMigracaoCorretora() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/autocustodia/guia-migracao-corretora"
        custom={{
          title: 'Como Tirar Bitcoin da Corretora com Segurança: Guia 2026',
          description:
            'Guia completo para sair da corretora e assumir a custódia do seu Bitcoin: risco de contraparte, checklist de 7 passos, saque de teste, taxas de rede e os erros mais caros.',
          canonical: 'https://lordjunnior.com.br/autocustodia/guia-migracao-corretora',
          primaryKeyword: 'como tirar bitcoin da corretora',
          lsiKeywords: [
            'sair da exchange bitcoin',
            'risco de contraparte',
            'autocustódia bitcoin',
            'saque de teste bitcoin',
            'hardware wallet primeiro saque',
            'not your keys not your coins',
          ],
          longTailKeywords: [
            'como transferir bitcoin da corretora para carteira própria',
            'é seguro deixar bitcoin na corretora',
            'passo a passo para sair da exchange',
            'quanto custa tirar bitcoin da corretora',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Autocustódia', url: '/autocustodia' },
            { name: 'Guia de Migração', url: '/autocustodia/guia-migracao-corretora' },
          ],
          schemaType: 'Article',
          articleSection: 'Autocustódia',
          relatedPages: [
            '/autocustodia/hot-wallet-vs-cold-wallet',
            '/autocustodia/primeiro-saque-hardware-wallet',
            '/autocustodia/erros-fatais-saque-corretora',
            '/comparativos/melhores-hardware-wallets',
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

        {/* 01 — A ponte que ninguém atravessa */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#d98a4a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  A ponte
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Você não comprou Bitcoin.{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Você comprou uma promessa.
                </span>
              </h2>
              <div className="space-y-6 text-lg md:text-xl leading-[1.75] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Enquanto o saldo está na corretora, o que existe é uma linha em um banco de dados privado dizendo que aquela empresa te deve determinada quantidade de Bitcoin. A chave privada, que é o que realmente move as moedas na rede, está com ela. Você tem o direito de pedir. Ela tem o poder de entregar, adiar ou negar.
                </p>
                <p>
                  Essa distinção parece filosófica até o dia em que deixa de ser. Em toda crise do setor, a sequência foi a mesma: primeiro o saque fica lento, depois vem o comunicado de manutenção, depois a suspensão temporária, depois o pedido de recuperação judicial. Quem já tinha migrado assistiu de fora. Quem não tinha entrou na fila.
                </p>
                <p>
                  Migrar não é desconfiança de uma empresa específica. É engenharia de risco: você elimina uma dependência inteira do sistema em vez de torcer para que ela nunca falhe.
                </p>
              </div>

              <div className="mt-12 p-8 rounded-2xl" style={{ backgroundColor: '#0e3b3a' }}>
                <p className="text-2xl md:text-3xl font-black leading-tight" style={{ color: '#ffb37a' }}>
                  Not your keys, not your coins.
                </p>
                <p className="mt-4 text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.82)' }}>
                  Não é slogan. É a descrição literal de como o protocolo funciona: quem assina com a chave privada é o dono. Todo o resto é contabilidade interna de terceiros.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 02 — Risco de contraparte */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 02 · Risco de contraparte
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Quatro camadas de risco que ninguém mostra no aplicativo.
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <motion.div {...fade(0.05)} className="lg:col-span-7 grid gap-6">
                {CAMADAS_RISCO.map((c, i) => (
                  <div key={c.titulo} className="p-7 rounded-2xl" style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.08)' }}>
                    <c.icon size={26} style={{ color: '#d98a4a' }} className="mb-4" />
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#0e3b3a' }}>
                      {String(i + 1).padStart(2, '0')} · {c.titulo}
                    </h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c.texto}</p>
                  </div>
                ))}
              </motion.div>
              <motion.div {...fade(0.15)} className="lg:col-span-5">
                <div className="relative h-[420px] md:h-[620px] overflow-hidden rounded-3xl sticky top-24">
                  <img
                    src={riscoImg}
                    alt="Porta de cofre de banco entreaberta vista por dentro, representando o risco de contraparte de manter Bitcoin em corretora"
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 03 — Checklist */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 03 · O protocolo
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Sete passos, na ordem exata.{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Nenhum pulado.
                </span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <motion.div {...fade(0.05)} className="lg:col-span-5">
                <div className="relative h-[420px] md:h-[560px] overflow-hidden rounded-3xl sticky top-24">
                  <img
                    src={checklistImg}
                    alt="Lista operacional manuscrita ao lado de uma carteira física de Bitcoin sob luz de lâmpada âmbar"
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              <motion.div {...fade(0.12)} className="lg:col-span-7 space-y-4">
                {PASSOS.map((p) => (
                  <div key={p.n} className="flex items-start gap-5 p-6 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                    <span
                      className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-black"
                      style={{ backgroundColor: '#0e3b3a', color: '#ffb37a' }}
                    >
                      {p.n}
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 leading-snug" style={{ color: '#0e3b3a' }}>{p.titulo}</h3>
                      <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{p.texto}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 04 — Saque de teste */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-center">
            <motion.div {...fade(0)} className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative h-[380px] md:h-[520px] overflow-hidden rounded-3xl">
                <img
                  src={testeImg}
                  alt="Moeda pequena em primeiro plano diante de uma tela desfocada, representando o saque de teste antes da migração completa"
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-6 order-1 lg:order-2">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Capítulo 04 · Saque de teste
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#f4ede4' }}>
                O passo de R$ 20 que evita o prejuízo de uma vida.
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.82)' }}>
                <p>
                  Transação em Bitcoin é irreversível por desenho. Não existe estorno, ouvidoria ou suporte que traga de volta. Isso é exatamente o que dá poder à rede, e é também o que torna o primeiro envio um momento em que a atenção vale mais do que a pressa.
                </p>
                <p>
                  O saque de teste transforma o irreversível em barato. Você envia um valor simbólico, confirma que ele apareceu na sua carteira, verifica a transação em um explorador de blocos e só então move o restante. Se algo estiver errado (endereço colado errado, carteira mal restaurada, rede escolhida incorretamente), o custo do aprendizado cabe no bolso.
                </p>
                <p className="font-medium" style={{ color: '#ffb37a' }}>
                  Regra prática: se o valor do teste te dói, o valor está alto demais para um teste.
                </p>
              </div>

              <div className="mt-10 space-y-3">
                {[
                  'Envie o teste. Aguarde ao menos uma confirmação na rede.',
                  'Abra a transação em um explorador de blocos e confira o endereço de destino.',
                  'Confirme o saldo dentro da sua carteira, não apenas no aplicativo da corretora.',
                  'Só depois disso mova o lote principal.',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="shrink-0 mt-1" style={{ color: '#ffb37a' }} />
                    <p className="text-base font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{t}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 05 — Mitos */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 05 · Quebra de objeções
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                As quatro frases que mantêm gente presa na corretora.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {MITOS.map((m) => (
                <motion.div key={m.mito} {...fade(0.05)} className="p-8 rounded-2xl" style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.08)' }}>
                  <p className="text-lg md:text-xl font-bold mb-4 leading-snug" style={{ color: '#8a4a2a' }}>{m.mito}</p>
                  <div className="h-[1px] w-full mb-4" style={{ backgroundColor: 'rgba(14,59,58,0.12)' }} />
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{m.real}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl p-6 md:p-8 flex items-start gap-5" style={{ backgroundColor: '#3a1414', border: '1px solid rgba(255,120,90,0.35)' }}>
              <AlertTriangle size={28} className="shrink-0 mt-1" style={{ color: '#ff9d7a' }} />
              <div>
                <p className="text-xl md:text-2xl font-black tracking-tight mb-2" style={{ color: '#ffb37a' }}>
                  Ninguém vai te pedir a seed phrase. Nunca.
                </p>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                  Suporte de corretora, suporte de fabricante, atualização de firmware, sorteio, airdrop, verificação de carteira: nada disso exige as suas 12 ou 24 palavras. Quem pede está te roubando, sem exceção. As palavras só são digitadas no próprio dispositivo, durante uma restauração que você mesmo iniciou.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — Trilha do hub */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 06 · A trilha completa
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Três degraus depois deste guia.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  to: '/autocustodia/hot-wallet-vs-cold-wallet',
                  icon: Wallet,
                  titulo: 'A anatomia da custódia',
                  texto: 'Carteira quente e carteira fria explicadas de forma prática, e o que realmente é uma seed phrase.',
                },
                {
                  to: '/autocustodia/primeiro-saque-hardware-wallet',
                  icon: ShieldCheck,
                  titulo: 'Blindagem digital',
                  texto: 'Configuração da hardware wallet, verificação do dispositivo e recebimento do primeiro saque sem erro.',
                },
                {
                  to: '/autocustodia/erros-fatais-saque-corretora',
                  icon: Timer,
                  titulo: 'Erros fatais no saque',
                  texto: 'Taxas de rede, redes erradas, endereços trocados e as armadilhas que fazem gente perder tudo.',
                },
              ].map((c) => (
                <motion.div key={c.to} {...fade(0.05)}>
                  <Link
                    to={c.to}
                    className="group block h-full p-8 rounded-2xl transition-all hover:-translate-y-1"
                    style={{ backgroundColor: '#0e3b3a' }}
                  >
                    <c.icon size={28} style={{ color: '#ffb37a' }} className="mb-5" />
                    <h3 className="text-2xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                    <p className="text-base leading-relaxed font-light mb-6" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: '#ffb37a' }}>
                      Continuar <ArrowRight size={16} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 07 · Perguntas que travam a migração
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Antes de clicar em sacar,{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  tire a dúvida.
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
                    style={{ backgroundColor: '#f4ede4', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}
                  >
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-500" style={{ color: '#d98a4a', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
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

        {/* 08 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Migrar é o começo.{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Guardar é o ofício.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { to: '/comparativos/melhores-hardware-wallets', titulo: 'Melhores hardware wallets', texto: 'Comparativo honesto entre Coldcard, Trezor, Jade, Krux e Passport.' },
                { to: '/autocustodia/backup-seed-phrase-guia', titulo: 'Backup da seed phrase', texto: 'Aço, esquema 3-2-1, passphrase e teste de restauração.' },
                { to: '/autocustodia/utxo-consolidacao', titulo: 'UTXO e consolidação', texto: 'Como suas moedas se organizam e por que isso muda o custo do saque.' },
                { to: '/imposto-renda/declarar-bitcoin-2026', titulo: 'Declarar Bitcoin no IR', texto: 'Ficha de bens, código 81 e o que muda quando você sai da corretora.' },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group p-8 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(255,179,122,0.18)' }}>
                  <h3 className="text-xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: '#ffb37a' }}>
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
