import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, KeyRound, AlertTriangle, ChevronDown, ArrowRight, Wallet,
  Lock, Flame, Snowflake, HardDrive, Layers, Users, FileWarning,
  Skull, Landmark, CheckCircle2, XCircle,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/custodia-fria/custodia-fria-hero.webp';
import cofreImg from '@/assets/custodia-fria/custodia-fria-cofre.webp';
import multisigImg from '@/assets/custodia-fria/custodia-fria-multisig.webp';
import hardwareImg from '@/assets/custodia-fria/custodia-fria-hardware.webp';

/**
 * /autocustodia/o-que-e-custodia-fria
 * Página PILAR sobre custódia fria. Paleta padrão Soberania:
 * Sand #f4ede4 / #ece2d3, Deep Teal #0e3b3a, Cobre #e8a36b.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const TIPOS_CUSTODIA = [
  {
    icon: HardDrive,
    titulo: 'Hardware wallet',
    descricao:
      'Um dispositivo dedicado que gera e guarda a chave privada dentro de um chip isolado, nunca expondo a chave para o computador ou celular conectado. É o meio-termo entre segurança e praticidade: assina a transação dentro do próprio aparelho e devolve só o resultado assinado. Para a grande maioria das pessoas, é o ponto de entrada correto na custódia fria.',
  },
  {
    icon: Snowflake,
    titulo: 'Air-gap total',
    descricao:
      'Um dispositivo que nunca, em nenhum momento, encosta em internet ou Bluetooth. A comunicação com o computador acontece por QR code ou cartão microSD, então fisicamente não existe caminho para um vírus alcançar a chave. É o nível usado por quem guarda quantias que mudam de vida e não abre mão de eliminar qualquer superfície de ataque remoto.',
  },
  {
    icon: FileWarning,
    titulo: 'Papel e aço',
    descricao:
      'A seed phrase, aquelas 12 ou 24 palavras que recriam a carteira inteira, gravada fisicamente em papel resistente ou, melhor ainda, em placas de aço inoxidável. Não é a carteira em si, é o backup que permite recuperar a carteira se o hardware quebrar, for roubado ou pegar fogo. Papel queima e mofa. Aço resiste a incêndio, enchente e décadas de armazenamento.',
  },
  {
    icon: Layers,
    titulo: 'Multisig (multiassinatura)',
    descricao:
      'Em vez de uma única chave abrir os fundos, você configura, por exemplo, que 2 de 3 chaves distintas, guardadas em lugares e dispositivos diferentes, precisam assinar juntas para mover uma transação. Elimina o ponto único de falha: perder um dispositivo, ou até ser coagido para entregar um deles, não é suficiente para esvaziar o cofre.',
  },
];

const FAIXAS_VALOR = [
  {
    faixa: 'Até o equivalente a um salário mínimo',
    recomendacao:
      'Corretora séria já resolve no dia a dia. O custo de comprar um hardware wallet pode não valer a pena ainda, mas vale começar a estudar o processo.',
  },
  {
    faixa: 'Valor de alguns salários, algo que doeria perder',
    recomendacao:
      'Ponto de virada. Um hardware wallet de entrada custa menos que um jantar de fim de semana e já elimina o risco de a corretora quebrar, congelar saques ou ser hackeada.',
  },
  {
    faixa: 'Valor equivalente a um carro usado ou mais',
    recomendacao:
      'Custódia fria deixa de ser opcional. Nessa faixa, considerar air-gap e multisig, com backup em aço e um plano de herança documentado.',
  },
  {
    faixa: 'Patrimônio que muda a vida da família',
    recomendacao:
      'Multisig geograficamente distribuído, seed em aço em mais de um local, e um plano de sucessão formal. Nessa faixa, um erro de configuração custa tanto quanto um roubo.',
  },
];

const ERROS_INICIANTE = [
  {
    titulo: 'Tirar foto da seed phrase no celular',
    descricao:
      'A seed vira automaticamente parte do backup na nuvem do celular. Se essa conta de e-mail ou nuvem for comprometida, a chave inteira vaza sem nenhum aviso.',
  },
  {
    titulo: 'Guardar a seed inteira em um único lugar',
    descricao:
      'Um incêndio, um roubo ou uma enchente elimina a única cópia existente. Sem redundância geográfica, custódia fria bem feita vira ponto único de falha mal feito.',
  },
  {
    titulo: 'Comprar hardware wallet de vendedor não oficial',
    descricao:
      'Dispositivos comprados em marketplace de terceiros, fora do site oficial do fabricante, já apareceram adulterados com seed pré-gerada, permitindo ao golpista esvaziar a carteira meses depois.',
  },
  {
    titulo: 'Nunca testar a recuperação',
    descricao:
      'Configurar o hardware e nunca simular a recuperação da seed em um dispositivo novo é acreditar às cegas que o backup funciona. Teste sempre, com valores pequenos primeiro.',
  },
  {
    titulo: 'Contar para todo mundo que tem bitcoin em custódia própria',
    descricao:
      'Falar em festa, postar print de saldo ou comentar em grupo de família que guarda cripto em casa transforma você em alvo de sequestro relâmpago. Silêncio operacional é parte da segurança.',
  },
  {
    titulo: 'Não deixar nenhum plano para os herdeiros',
    descricao:
      'Uma seed phrase sem nenhuma instrução para a família significa que, se você morrer ou ficar incapacitado, o bitcoin fica trancado para sempre. Chave perdida é chave perdida, não existe recuperação de senha.',
  },
];

const ROTEIRO = [
  {
    n: '01',
    titulo: 'Escolha o hardware certo para o seu caso',
    descricao:
      'Para a maioria, um hardware wallet consolidado e com histórico de auditoria de segurança já resolve. Compare as opções, o suporte a múltiplas moedas e o modelo de código aberto antes de decidir.',
  },
  {
    n: '02',
    titulo: 'Compre direto do fabricante, lacrado',
    descricao:
      'Nunca de terceiro, nunca usado, nunca com lacre violado. Ao receber, confira os selos de segurança e, se o fabricante oferecer verificação de autenticidade no próprio dispositivo, use.',
  },
  {
    n: '03',
    titulo: 'Gere a seed phrase offline, no próprio dispositivo',
    descricao:
      'A seed nunca deve ser gerada no computador ou em um site. O hardware gera as palavras internamente e você as lê apenas na telinha do próprio aparelho.',
  },
  {
    n: '04',
    titulo: 'Grave a seed em aço, não em papel',
    descricao:
      'Papel some no primeiro incêndio ou infiltração. Uma placa de aço resiste a fogo, água e décadas. Faça pelo menos duas cópias e guarde em lugares fisicamente separados.',
  },
  {
    n: '05',
    titulo: 'Teste a recuperação com um valor pequeno',
    descricao:
      'Antes de mover o grosso do patrimônio, simule a perda: pegue a seed gravada, restaure em um dispositivo de teste e confira se os fundos aparecem certinhos.',
  },
  {
    n: '06',
    titulo: 'Transfira aos poucos, começando pequeno',
    descricao:
      'Envie primeiro uma quantia simbólica para o novo endereço frio, confirme o recebimento, e só depois mova o restante. É o equivalente a testar o paraquedas antes do salto de verdade.',
  },
  {
    n: '07',
    titulo: 'Documente um plano de herança',
    descricao:
      'Deixe instruções claras, sem expor a seed diretamente, para que a família consiga acessar os fundos em caso de morte ou incapacidade. Um esquema multisig com um herdeiro guardando uma das chaves resolve boa parte do problema.',
  },
];

const RISCOS_REAIS = [
  {
    icon: Skull,
    titulo: 'Perda definitiva da seed phrase',
    descricao:
      'Sem seed, sem backup, sem senha mestra: os fundos ficam matematicamente inacessíveis para sempre. Não existe suporte técnico, central de atendimento ou "esqueci minha senha" no Bitcoin.',
  },
  {
    icon: AlertTriangle,
    titulo: 'Coação física, o "ataque de chave inglesa"',
    descricao:
      'Criminosos que sabem que a vítima guarda bitcoin em custódia própria podem usar violência para forçar a entrega das chaves. Multisig com chaves em lugares diferentes, e discrição total sobre quanto e onde você guarda, reduzem esse risco.',
  },
  {
    icon: Users,
    titulo: 'Herança mal planejada',
    descricao:
      'Bitcoin guardado sem nenhum plano de sucessão simplesmente desaparece para os herdeiros. Diferente de uma conta bancária, não existe inventário judicial capaz de recuperar uma chave privada perdida.',
  },
  {
    icon: FileWarning,
    titulo: 'Erro humano na hora de anotar',
    descricao:
      'Trocar uma palavra, inverter a ordem ou anotar de forma ilegível transforma o backup em papel inútil. É por isso que testar a recuperação antes de confiar o patrimônio inteiro é obrigatório.',
  },
];

const FAQ = [
  {
    q: 'O que é custódia fria, na prática?',
    a: 'Custódia fria é manter as chaves privadas do seu bitcoin em um ambiente totalmente desconectado da internet, geralmente em um hardware wallet, em vez de deixar os fundos guardados em uma corretora ou em uma carteira conectada o tempo todo (carteira quente). Quem controla a chave privada controla o bitcoin, sem depender de nenhuma empresa intermediária.',
  },
  {
    q: 'Qual a diferença entre carteira quente e carteira fria?',
    a: 'Carteira quente é como a carteira de couro que você leva no bolso: prática para o dia a dia, mas exposta a furto e perda se você andar com tudo dentro dela. Carteira fria é o cofre em casa: menos prática para movimentar toda hora, mas praticamente inacessível para quem não tem a combinação. A regra prática é simples: no bolso, o troco do dia. No cofre, a reserva que você não pode perder.',
  },
  {
    q: 'Por que tirar o bitcoin da corretora se ela é regulamentada?',
    a: 'Regulamentação reduz alguns riscos, mas não elimina o risco central: enquanto o saldo está na corretora, quem assina as transações é a corretora, não você. Falências, hacks, bloqueios judiciais e decisões unilaterais de congelar saques já aconteceram com corretoras grandes e supostamente seguras. A frase "not your keys, not your coins" existe porque descreve um fato técnico, não uma opinião.',
  },
  {
    q: 'A partir de qual valor vale a pena migrar para custódia fria?',
    a: 'Não existe um número mágico, mas uma boa referência é: a partir do momento em que perder aquele saldo doeria de verdade, o custo de um hardware wallet, geralmente inferior ao valor de um jantar de fim de semana, já compensa. Para valores pequenos que você movimenta com frequência, uma carteira quente bem configurada pode ser suficiente por enquanto.',
  },
  {
    q: 'Hardware wallet é a única forma de custódia fria?',
    a: 'Não. Existem também os dispositivos air-gap, que nunca se conectam à internet nem por cabo, a guarda da seed phrase gravada em aço como backup físico, e a multisig, que exige duas ou mais chaves distintas para autorizar qualquer movimentação. Cada camada resolve um risco diferente e podem ser combinadas.',
  },
  {
    q: 'O que acontece se eu perder meu hardware wallet?',
    a: 'Nada, desde que você tenha a seed phrase guardada em backup seguro. O hardware é apenas o dispositivo que assina as transações; a seed é o que recria a carteira inteira em qualquer aparelho compatível. É por isso que o backup da seed em aço é tão ou mais importante quanto o próprio hardware.',
  },
  {
    q: 'Custódia fria é só para quem tem muito bitcoin?',
    a: 'Não é uma questão de quantidade absoluta, é uma questão de dependência psicológica e financeira daquele valor. Quem tem pouco mas não pode perder aquele pouco também se beneficia. O princípio é o mesmo aplicado a qualquer patrimônio: proteja proporcionalmente ao que dói perder.',
  },
  {
    q: 'Como deixar o bitcoin para meus herdeiros sem expor a seed em vida?',
    a: 'A forma mais robusta é configurar uma multisig em que você guarda a maioria das chaves e um herdeiro de confiança guarda uma, combinada a instruções escritas e seladas sobre como proceder em caso de morte ou incapacidade, sem nunca revelar a seed completa a uma única pessoa enquanto você está vivo.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Cofre físico escuro representando a segurança da custódia fria de bitcoin fora das corretoras"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.35) 40%, rgba(14,59,58,0.9) 100%)',
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
            <ShieldCheck size={11} className="inline mr-2" /> Autocustódia · Fundamentos
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          O que é custódia fria.{' '}
          <span
            style={{
              color: '#e8a36b',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(232,163,107,0.45), 0 0 80px rgba(232,163,107,0.25)',
            }}
          >
            O cofre que ninguém mais controla.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          O guia completo para entender a diferença entre carteira quente e carteira fria, por que "not your keys, not your coins" não é slogan e sim descrição técnica, e o roteiro real para montar seu primeiro cofre de bitcoin.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function OQueECustodiaFria() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/autocustodia/o-que-e-custodia-fria"
        custom={{
          title: 'O Que É Custódia Fria de Bitcoin? Guia Completo para Iniciantes',
          description:
            'Entenda o que é custódia fria, a diferença entre carteira quente e fria, por que tirar bitcoin da corretora, quando migrar e o passo a passo do primeiro cofre seguro.',
          canonical: 'https://lordjunnior.com.br/autocustodia/o-que-e-custodia-fria',
          primaryKeyword: 'o que é custódia fria',
          lsiKeywords: [
            'custódia fria de bitcoin',
            'carteira quente x carteira fria',
            'hardware wallet',
            'not your keys not your coins',
            'como tirar bitcoin da corretora',
            'seed phrase',
            'cold storage bitcoin',
          ],
          longTailKeywords: [
            'o que é custódia fria de bitcoin',
            'diferença entre carteira quente e carteira fria',
            'como funciona um hardware wallet',
            'quando devo tirar bitcoin da corretora',
            'como fazer meu primeiro cofre de bitcoin',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Autocustódia', url: '/autocustodia' },
            { name: 'O Que É Custódia Fria', url: '/autocustodia/o-que-e-custodia-fria' },
          ],
          schemaType: 'Article',
          articleSection: 'Autocustódia',
          relatedPages: [
            '/autocustodia',
            '/comparativos/melhores-hardware-wallets',
            '/autocustodia/backup-seed-phrase-guia',
            '/autocustodia/seed-phrase-em-aco',
            '/autocustodia/heranca-bitcoin',
            '/multisig-bitcoin',
            '/autocustodia/utxo-consolidacao',
            '/dicionario-cripto',
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

        {/* CAPÍTULO 1 — Carteira quente x carteira fria */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Carteira quente x carteira fria
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2
                className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10"
                style={{ color: '#0e3b3a' }}
              >
                O bolso guarda o troco.{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  O cofre guarda a vida.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Imagine sua carteira de couro, aquela que vai no bolso todos os dias. Nela você carrega o dinheiro do café, do Uber, das pequenas compras. É prática, rápida, sempre à mão. Mas ninguém em sã consciência guarda a poupança de uma vida inteira dentro dela. Se você a perder no metrô, se alguém te roubar na rua, o prejuízo é o que estava dentro, nada mais.
                </p>
                <p>
                  Uma carteira quente de bitcoin funciona exatamente assim. É o aplicativo no celular, a extensão do navegador, a conta na corretora: conectados à internet o tempo inteiro, prontos para movimentar fundos em segundos. Excelentes para o dia a dia, péssimas como cofre de longo prazo, porque tudo que está conectado é, por definição, alcançável por quem sabe atacar uma conexão.
                </p>
                <p>
                  Custódia fria é o cofre trancado na parede, longe de qualquer rede. É guardar a chave privada, o único elemento matemático que realmente prova posse do bitcoin, em um ambiente que nunca toca a internet. Ninguém invade remotamente um cofre que não está conectado a nada. É a mesma lógica de qualquer reserva de valor séria: o que você usa toda semana fica à mão; o que sustenta seu futuro fica trancado, longe de olhos curiosos e de mãos rápidas.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #e8a36b', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Se o dinheiro está em algo conectado à internet, ele está, teoricamente, a um clique de distância de alguém que você nunca vai conhecer.
                </blockquote>
                <p>
                  Essa distinção parece simples, mas é a base de tudo que vem a seguir. Quem entende bem essa diferença já está à frente da maioria das pessoas que compram bitcoin e nunca se perguntam onde, de fato, aquele saldo está guardado.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Not your keys, not your coins */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-start">
            <motion.aside {...fade(0)} className="lg:col-span-4 lg:order-2">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                  Capítulo 02
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(244,237,228,0.6)' }}>
                  Por que tirar da corretora
                </p>
                <div className="mt-10 rounded-2xl overflow-hidden h-64">
                  <img
                    src={multisigImg}
                    alt="Representação visual de chaves de segurança distribuídas, simbolizando o controle direto sobre o bitcoin"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8 lg:order-1">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10">
                "Not your keys,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  not your coins."
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                <p>
                  Essa frase virou clichê no meio cripto, mas ela descreve um fato técnico frio, não uma opinião de blog. Quando você compra bitcoin em uma corretora e deixa o saldo lá, você não possui bitcoin. Você possui um registro em um banco de dados da corretora dizendo que ela deve aquele bitcoin a você. É a diferença entre ter dinheiro no banco e ter dinheiro no bolso: no banco, tecnicamente, o banco tem seu dinheiro e promete devolver.
                </p>
                <p>
                  Enquanto o sistema funciona, ninguém sente diferença. O problema aparece exatamente no momento em que você mais precisa acessar o valor: em uma falência da corretora, em um bloqueio judicial, em uma decisão unilateral de suspender saques por "manutenção" que nunca termina, ou em um hack que esvazia as reservas da empresa. Já aconteceu com corretoras gigantes, supostamente sólidas, e aconteceu em questão de dias, sem aviso prévio suficiente para quem estava dentro.
                </p>
                <p>
                  Guardar em custódia fria elimina esse intermediário. Não existe corretora entre você e seu bitcoin, então não existe falência de terceiro, não existe congelamento arbitrário de saque, não existe ordem judicial contra uma empresa que também prenda o seu saldo pessoal junto. A chave é sua, o bitcoin é seu, ponto final.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Quando vale migrar (faixas de valor) */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                  Capítulo 03
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Quando vale a pena migrar
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Não existe um valor mágico,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  existe uma pergunta certa.
                </span>
              </h2>
              <p className="text-lg md:text-xl leading-[1.7] font-light mb-10" style={{ color: '#2d3a37' }}>
                A pergunta não é "quanto bitcoin eu tenho", é "quanto eu perderia sem dormir se esse saldo sumisse amanhã". A partir do momento em que a resposta te incomoda de verdade, o custo de um hardware wallet, geralmente menor que o de um jantar de fim de semana, deixa de ser exagero e vira seguro barato.
              </p>
              <div className="space-y-4">
                {FAIXAS_VALOR.map((f, i) => (
                  <motion.div
                    key={i}
                    {...fade(i * 0.05)}
                    className="rounded-2xl p-7 md:p-8"
                    style={{ backgroundColor: '#ece2d3', border: '1px solid rgba(14,59,58,0.08)' }}
                  >
                    <p className="text-lg md:text-xl font-bold mb-2" style={{ color: '#0e3b3a' }}>
                      {f.faixa}
                    </p>
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                      {f.recomendacao}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Tipos de custódia fria */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="max-w-3xl mb-16">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 04 · As camadas do cofre
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Os quatro tipos{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  de custódia fria.
                </span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {TIPOS_CUSTODIA.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    key={i}
                    {...fade(i * 0.08)}
                    className="rounded-3xl p-8 md:p-10"
                    style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.08)' }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: 'rgba(232,163,107,0.15)' }}
                    >
                      <Icon size={26} style={{ color: '#e8a36b' }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black mb-4" style={{ color: '#0e3b3a' }}>
                      {t.titulo}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                      {t.descricao}
                    </p>
                  </motion.div>
                );
              })}
            </div>
            <motion.div {...fade(0.2)} className="mt-10 rounded-2xl overflow-hidden h-72 md:h-96">
              <img
                src={hardwareImg}
                alt="Hardware wallet físico para custódia fria de bitcoin, dispositivo dedicado à assinatura offline de transações"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Erros de iniciante */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                  Capítulo 05
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Erros que custam caro
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                O cofre não falha.{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Quem falha é o processo.
                </span>
              </h2>
              <div className="space-y-4">
                {ERROS_INICIANTE.map((e, i) => (
                  <motion.div key={i} {...fade(i * 0.05)} className="flex gap-5 p-6 md:p-7 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                    <XCircle size={26} className="shrink-0 mt-1" style={{ color: '#c0563a' }} />
                    <div>
                      <p className="text-lg md:text-xl font-bold mb-2" style={{ color: '#0e3b3a' }}>
                        {e.titulo}
                      </p>
                      <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                        {e.descricao}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Roteiro do primeiro cofre */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="max-w-3xl mb-16">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 06 · Roteiro prático
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                O passo a passo{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  do seu primeiro cofre.
                </span>
              </h2>
            </motion.div>
            <div className="space-y-8">
              {ROTEIRO.map((r, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="grid md:grid-cols-12 gap-6 md:gap-10 pb-8" style={{ borderBottom: i < ROTEIRO.length - 1 ? '1px solid rgba(244,237,228,0.12)' : 'none' }}>
                  <div className="md:col-span-2">
                    <span className="text-4xl md:text-5xl font-black" style={{ color: '#e8a36b', fontFamily: "'Playfair Display', serif" }}>
                      {r.n}
                    </span>
                  </div>
                  <div className="md:col-span-10">
                    <h3 className="text-xl md:text-2xl font-black mb-3">{r.titulo}</h3>
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.8)' }}>
                      {r.descricao}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Riscos reais */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-start">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                  Capítulo 07
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Riscos reais da custódia própria
                </p>
                <div className="mt-10 rounded-2xl overflow-hidden h-64">
                  <img
                    src={cofreImg}
                    alt="Cofre trancado, metáfora dos riscos de perda de acesso permanente na custódia própria de bitcoin"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Liberdade total{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  é responsabilidade total.
                </span>
              </h2>
              <p className="text-lg md:text-xl leading-[1.7] font-light mb-10" style={{ color: '#2d3a37' }}>
                Tirar o bitcoin da corretora elimina o risco de terceiros, mas não elimina risco nenhum. Ele apenas troca o risco de empresa pelo risco de processo pessoal. Conhecer esses riscos de frente é o que separa quem pratica autocustódia de forma madura de quem só copiou um vídeo sem entender o resto.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {RISCOS_REAIS.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <motion.div key={i} {...fade(i * 0.05)} className="p-7 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                      <Icon size={24} className="mb-4" style={{ color: '#c0563a' }} />
                      <p className="text-lg font-bold mb-2" style={{ color: '#0e3b3a' }}>
                        {r.titulo}
                      </p>
                      <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                        {r.descricao}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 8 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 08 · Perguntas que importam
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Antes de comprar o cofre,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
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
                      boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left"
                    >
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>
                        {f.q}
                      </span>
                      <ChevronDown
                        size={22}
                        className="shrink-0 transition-transform duration-500"
                        style={{ color: '#e8a36b', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
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

        {/* CAPÍTULO 9 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Entender custódia fria{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  é só o primeiro passo.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  to: '/comparativos/melhores-hardware-wallets',
                  titulo: 'Melhores hardware wallets comparados',
                  texto: 'Qual dispositivo escolher para o seu primeiro cofre, com prós e contras reais.',
                },
                {
                  to: '/autocustodia/backup-seed-phrase-guia',
                  titulo: 'Guia completo de backup da seed phrase',
                  texto: 'Como não errar no passo mais crítico de toda a operação.',
                },
                {
                  to: '/autocustodia/seed-phrase-em-aco',
                  titulo: 'Seed phrase em aço: por que trocar o papel',
                  texto: 'Resistência a fogo, água e décadas de armazenamento.',
                },
                {
                  to: '/autocustodia/heranca-bitcoin',
                  titulo: 'Herança em bitcoin sem expor a seed',
                  texto: 'Como garantir que sua família acesse os fundos sem risco em vida.',
                },
                {
                  to: '/multisig-bitcoin',
                  titulo: 'Multisig: elimine o ponto único de falha',
                  texto: 'Como configurar múltiplas chaves para proteger patrimônio maior.',
                },
                {
                  to: '/autocustodia/utxo-consolidacao',
                  titulo: 'UTXO e consolidação: o próximo nível',
                  texto: 'Organização avançada da sua carteira fria ao longo do tempo.',
                },
                {
                  to: '/dicionario-cripto',
                  titulo: 'Dicionário cripto completo',
                  texto: 'Todos os termos técnicos deste guia explicados em uma página só.',
                },
              ].map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="group p-8 rounded-2xl transition-all hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}
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
