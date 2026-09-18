import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame, Snowflake, KeyRound, ChevronDown, ArrowRight,
  Smartphone, HardDrive, AlertTriangle, Eye,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/migracao/anatomia-hero.webp';
import frioImg from '@/assets/migracao/anatomia-hot-cold.webp';
import seedImg from '@/assets/migracao/anatomia-seed.webp';

/**
 * /autocustodia/hot-wallet-vs-cold-wallet
 * Página teórica do Hub de Migração Soberana: anatomia da custódia.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const COMPARATIVO = [
  { criterio: 'Onde a chave privada fica', hot: 'Em um aparelho conectado à internet', cold: 'Em um dispositivo que nunca se conecta sozinho' },
  { criterio: 'Superfície de ataque', hot: 'Grande: malware, apps maliciosos, clipboard, SIM swap', cold: 'Mínima: exige acesso físico ao dispositivo e ao PIN' },
  { criterio: 'Velocidade de uso', hot: 'Segundos, ideal para gasto do dia a dia', cold: 'Minutos, pensada para guardar, não para gastar' },
  { criterio: 'Custo', hot: 'Gratuito', cold: 'De cem a poucos milhares de reais, dependendo do modelo' },
  { criterio: 'Perfil de uso ideal', hot: 'Valor de bolso, pagamentos, Lightning', cold: 'Poupança de longo prazo, patrimônio' },
  { criterio: 'Risco dominante', hot: 'Comprometimento remoto do aparelho', cold: 'Perda ou destruição do backup da seed' },
];

const CAMADAS = [
  {
    nome: 'Custódia de terceiro (corretora)',
    icon: Eye,
    nivel: 'Nível 0',
    texto:
      'A chave não é sua. Você tem crédito contra uma empresa. É o único nível em que outra pessoa pode congelar, atrasar ou negar o seu acesso. Serve para comprar e vender, não para guardar.',
  },
  {
    nome: 'Carteira quente (celular ou computador)',
    icon: Smartphone,
    nivel: 'Nível 1',
    texto:
      'A chave é sua, mas vive em um aparelho conectado. Ninguém pode bloquear seus fundos, e ainda assim um malware bem colocado pode. É o degrau certo para valores de bolso e para o gasto cotidiano em Lightning.',
  },
  {
    nome: 'Carteira fria (hardware wallet)',
    icon: HardDrive,
    nivel: 'Nível 2',
    texto:
      'A chave nasce e morre dentro de um dispositivo isolado, que assina transações sem nunca expor o segredo ao computador. O ataque remoto deixa de ser viável; sobra o ataque físico e o erro humano.',
  },
  {
    nome: 'Multisig e air-gap',
    icon: KeyRound,
    nivel: 'Nível 3',
    texto:
      'Duas ou três chaves independentes, guardadas em lugares diferentes, exigidas em conjunto para mover qualquer valor. Elimina o ponto único de falha, inclusive contra coação física. É o padrão de quem trata Bitcoin como patrimônio de geração.',
  },
];

const SEED_FATOS = [
  'A seed phrase não guarda o Bitcoin: ela reconstrói matematicamente todas as chaves privadas da carteira. Por isso, ela é a carteira.',
  'Qualquer pessoa que veja as palavras pode esvaziar sua carteira em qualquer lugar do mundo, sem precisar do seu dispositivo, sem senha e sem deixar recurso.',
  'Se você perder as palavras e o dispositivo quebrar, o saldo continua registrado na rede para sempre, e para sempre inacessível. Não existe recuperação de conta.',
  'As palavras vêm de uma lista pública padronizada. Elas não são um código secreto original: o segredo está na ordem exata em que aparecem.',
  'Nunca fotografe, nunca digite em teclado de computador, nunca salve em nuvem, nunca envie por mensagem, nunca guarde em gerenciador de senhas online.',
  'O backup ideal é físico, resistente a fogo e água, guardado em local diferente de onde fica o dispositivo, e testado ao menos uma vez com uma restauração real.',
];

const FAQ = [
  {
    q: 'Qual a diferença entre carteira quente e carteira fria?',
    a: 'Carteira quente é aquela cuja chave privada fica em um aparelho conectado à internet, como celular ou computador. Carteira fria mantém a chave privada isolada em um dispositivo dedicado que assina as transações offline. A diferença prática é a superfície de ataque: a quente pode ser comprometida remotamente, a fria exige acesso físico.',
  },
  {
    q: 'O que é uma seed phrase?',
    a: 'É a sequência de 12 ou 24 palavras gerada pela carteira, a partir da qual todas as suas chaves privadas são derivadas matematicamente. Quem tem as palavras tem o Bitcoin, em qualquer carteira compatível, em qualquer lugar. Perder as palavras significa perder o acesso de forma definitiva.',
  },
  {
    q: 'Posso usar só carteira de celular e nunca comprar uma hardware wallet?',
    a: 'Pode, e para valores pequenos isso já representa um salto enorme em relação a deixar na corretora. O ponto de virada acontece quando o valor guardado passa a ser maior do que o prejuízo aceitável em caso de comprometimento do aparelho. Aí o dispositivo dedicado deixa de ser luxo.',
  },
  {
    q: 'A hardware wallet guarda o Bitcoin dentro dela?',
    a: 'Não. O Bitcoin existe apenas na rede, distribuído entre milhares de nós. O dispositivo guarda a chave privada e assina as transações. Por isso um aparelho perdido ou quebrado não significa saldo perdido: com a seed phrase você restaura tudo em outro dispositivo.',
  },
  {
    q: 'Vale a pena usar mais de uma carteira?',
    a: 'Sim, e essa é a prática mais comum entre usuários experientes: uma carteira quente com valor de bolso para gasto e recebimento rápido, e uma carteira fria com o grosso da poupança, movimentada poucas vezes por ano. Separar por função reduz risco e reduz ansiedade.',
  },
  {
    q: 'O que é passphrase e ela substitui a seed?',
    a: 'A passphrase é uma palavra ou frase adicional que, somada às 12 ou 24 palavras, gera uma carteira completamente diferente. Ela não substitui a seed: complementa. Bem usada, protege contra quem encontrar o backup físico. Mal usada e esquecida, torna o saldo inacessível para sempre.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '90vh', minHeight: 700 }}>
      <img
        src={heroImg}
        alt="Composição dividida entre um celular iluminado representando carteira quente e um dispositivo metálico congelado representando carteira fria"
        width={1600}
        height={1000}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.3) 40%, rgba(14,59,58,0.93) 100%)' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <span
          className="w-fit px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md mb-8"
          style={{ backgroundColor: 'rgba(244,237,228,0.15)', color: '#f4ede4', border: '1px solid rgba(244,237,228,0.3)' }}
        >
          <Snowflake size={11} className="inline mr-2" /> Anatomia da custódia
        </span>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Carteira quente e carteira fria:{' '}
          <span
            style={{
              color: '#d98a4a',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(217,138,74,0.45), 0 0 80px rgba(217,138,74,0.25)',
            }}
          >
            a diferença que decide tudo.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-3xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Antes de gastar um centavo com dispositivo, entenda o que você está realmente comprando: distância entre a sua chave privada e a internet. Este é o mapa completo, do saldo em corretora ao multisig, e a explicação honesta do que é uma seed phrase.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function HotWalletVsColdWallet() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/autocustodia/hot-wallet-vs-cold-wallet"
        custom={{
          title: 'Carteira Quente x Carteira Fria de Bitcoin: Guia para Iniciantes',
          description:
            'Hot wallet ou cold wallet? Entenda onde fica a chave privada, os quatro níveis de custódia, o que é seed phrase e qual carteira usar para cada valor de Bitcoin.',
          canonical: 'https://lordjunnior.com.br/autocustodia/hot-wallet-vs-cold-wallet',
          primaryKeyword: 'carteira quente e carteira fria',
          lsiKeywords: [
            'hot wallet vs cold wallet',
            'o que é seed phrase',
            'chave privada bitcoin',
            'hardware wallet iniciante',
            'tipos de carteira bitcoin',
            'custódia bitcoin',
          ],
          longTailKeywords: [
            'qual a diferença entre hot wallet e cold wallet',
            'o que é seed phrase de 12 palavras',
            'melhor carteira de bitcoin para iniciante',
            'preciso de hardware wallet para pouco bitcoin',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Autocustódia', url: '/autocustodia' },
            { name: 'Carteira quente x fria', url: '/autocustodia/hot-wallet-vs-cold-wallet' },
          ],
          schemaType: 'Article',
          articleSection: 'Autocustódia',
          relatedPages: [
            '/autocustodia/guia-migracao-corretora',
            '/autocustodia/primeiro-saque-hardware-wallet',
            '/comparativos/melhores-hardware-wallets',
            '/autocustodia/backup-seed-phrase-guia',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* 01 — O conceito */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#d98a4a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Quente e frio
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Não é sobre o aplicativo.{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  É sobre onde dorme a chave.
                </span>
              </h2>
              <div className="space-y-6 text-lg md:text-xl leading-[1.75] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Toda carteira de Bitcoin faz duas coisas: mostra o saldo e assina transações. Mostrar saldo é leitura pública da rede, qualquer um pode fazer. Assinar exige a chave privada. É só aí que existe risco, e é só isso que separa uma carteira quente de uma fria.
                </p>
                <p>
                  Quente significa que a chave está em um aparelho que também abre e-mail, instala aplicativos, entra em links e recebe mensagens. Frio significa que a chave está em um dispositivo que só faz uma coisa na vida e não tem navegador, loja de aplicativos nem caixa de entrada.
                </p>
                <p>
                  Pense em dinheiro físico: a carteira do bolso é quente, o cofre da casa é frio. Ninguém guarda o salário inteiro no bolso, e ninguém abre o cofre para pagar o café. As duas existem porque cumprem funções diferentes, e usar a errada para a tarefa errada é o que gera prejuízo.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 02 — Comparativo */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 02 · Lado a lado
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Seis critérios, duas respostas diferentes.
              </h2>
            </motion.div>

            <motion.div {...fade(0.05)} className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(14,59,58,0.12)' }}>
              <table className="w-full min-w-[820px] text-left" style={{ backgroundColor: '#f4ede4' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0e3b3a' }}>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#f4ede4' }}>Critério</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#ffb37a' }}>
                      <Flame size={14} className="inline mr-2" /> Carteira quente
                    </th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#9fd6d2' }}>
                      <Snowflake size={14} className="inline mr-2" /> Carteira fria
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARATIVO.map((row, i) => (
                    <tr key={row.criterio} style={{ backgroundColor: i % 2 ? '#ece2d3' : '#f4ede4' }}>
                      <td className="p-5 font-bold align-top" style={{ color: '#0e3b3a' }}>{row.criterio}</td>
                      <td className="p-5 font-light align-top" style={{ color: '#2d3a37' }}>{row.hot}</td>
                      <td className="p-5 font-light align-top" style={{ color: '#2d3a37' }}>{row.cold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* 03 — Níveis de custódia */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 03 · A escada
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Quatro níveis de custódia. Suba um degrau por vez.
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <motion.div {...fade(0.05)} className="lg:col-span-7 space-y-5">
                {CAMADAS.map((c) => (
                  <div key={c.nome} className="p-7 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                    <div className="flex items-center gap-4 mb-4">
                      <c.icon size={24} style={{ color: '#d98a4a' }} />
                      <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#8a7a68' }}>{c.nivel}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: '#0e3b3a' }}>{c.nome}</h3>
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c.texto}</p>
                  </div>
                ))}
              </motion.div>
              <motion.div {...fade(0.15)} className="lg:col-span-5">
                <div className="relative h-[420px] md:h-[640px] overflow-hidden rounded-3xl sticky top-24">
                  <img
                    src={frioImg}
                    alt="Dispositivo de assinatura offline sobre superfície de ardósia, sem cabos conectados, iluminado por uma única luz âmbar"
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

        {/* 04 — Seed phrase */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Capítulo 04 · Seed phrase
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#f4ede4' }}>
                Se alguém vir, o dinheiro some. Se você perder, o dinheiro some.
              </h2>
              <p className="text-lg leading-[1.7] font-light mb-10" style={{ color: 'rgba(244,237,228,0.82)' }}>
                Não existe forma mais honesta de explicar. As 12 ou 24 palavras não são uma senha que pode ser trocada, nem um dado que o suporte recupera. Elas são a carteira inteira, em formato legível por humanos. Trate esse pedaço de metal ou papel com o mesmo cuidado que você trataria com o patrimônio que ele representa, porque é exatamente isso que ele é.
              </p>
              <div className="space-y-4">
                {SEED_FATOS.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)' }}>
                    <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#ffb37a', color: '#0e3b3a' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{f}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fade(0.15)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[680px] overflow-hidden rounded-3xl sticky top-24">
                <img
                  src={seedImg}
                  alt="Cartão de backup em branco e placa de aço inoxidável com campos vazios para gravação das palavras de recuperação"
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 05 — Como escolher */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 05 · Decisão prática
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Qual carteira você deveria usar hoje.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  faixa: 'Valor de bolso',
                  resposta: 'Carteira quente no celular',
                  texto: 'Uma carteira de celular bem configurada, com backup feito no papel e guardado fora de casa. Use para receber, pagar e aprender sem medo. O prejuízo máximo cabe no seu mês.',
                },
                {
                  faixa: 'Poupança em construção',
                  resposta: 'Hardware wallet única',
                  texto: 'Quando o saldo passa a valer mais do que você aceitaria perder, o dispositivo dedicado se paga. Uma hardware wallet, seed em aço, backup em local separado e testado.',
                },
                {
                  faixa: 'Patrimônio de geração',
                  resposta: 'Multisig distribuído',
                  texto: 'Duas ou três chaves em lugares diferentes, exigidas em conjunto. Protege contra roubo, incêndio, coação e erro individual, e organiza a sucessão familiar de forma verificável.',
                },
              ].map((c) => (
                <motion.div key={c.faixa} {...fade(0.05)} className="p-8 rounded-2xl h-full" style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.08)' }}>
                  <span className="text-xs font-bold tracking-[0.3em] uppercase block mb-4" style={{ color: '#d98a4a' }}>{c.faixa}</span>
                  <h3 className="text-2xl font-black leading-tight mb-4" style={{ color: '#0e3b3a' }}>{c.resposta}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c.texto}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl p-6 md:p-8 flex items-start gap-5" style={{ backgroundColor: '#3a1414', border: '1px solid rgba(255,120,90,0.35)' }}>
              <AlertTriangle size={28} className="shrink-0 mt-1" style={{ color: '#ff9d7a' }} />
              <div>
                <p className="text-xl md:text-2xl font-black tracking-tight mb-2" style={{ color: '#ffb37a' }}>
                  A carteira mais cara não é a melhor. A carteira que você sabe usar é.
                </p>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                  Dispositivo caro guardado na gaveta porque o dono nunca aprendeu a restaurar o backup é um risco maior do que uma carteira simples usada com disciplina. Domine o processo antes de subir o degrau.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 06 · Perguntas frequentes
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                O básico,{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  sem enrolação.
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
                    style={{ backgroundColor: '#ece2d3', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}
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

        {/* 07 — Continue */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Entendeu a teoria.{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Agora execute.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { to: '/autocustodia/guia-migracao-corretora', titulo: 'Guia de migração', texto: 'A ponte completa entre a corretora e a sua própria custódia.' },
                { to: '/autocustodia/primeiro-saque-hardware-wallet', titulo: 'Primeiro saque na hardware wallet', texto: 'Configuração, verificação do dispositivo e recebimento sem erro.' },
                { to: '/comparativos/melhores-hardware-wallets', titulo: 'Melhores hardware wallets', texto: 'Comparativo entre Coldcard, Trezor, Jade, Krux e Passport.' },
                { to: '/autocustodia/backup-seed-phrase-guia', titulo: 'Backup da seed phrase', texto: 'Aço, esquema 3-2-1, passphrase e teste de restauração.' },
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
