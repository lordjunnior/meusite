import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, AlertTriangle, ChevronDown, ArrowRight, Wallet, Copy,
  Search, Timer, Fingerprint, Ban, Lock, Layers, ExternalLink, Send,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/saque-exchange/hero-saque.jpg';
import seedImg from '@/assets/saque-exchange/seed-backup.jpg';
import mempoolImg from '@/assets/saque-exchange/mempool-rede.jpg';
import vaultImg from '@/assets/saque-exchange/vault-seguranca.jpg';

/**
 * /autocustodia/tirar-da-exchange-para-hardware-wallet
 * Palavra-chave: "como tirar bitcoin da corretora"
 * Paleta Soberania: Sand #f4ede4/#ece2d3, Deep Teal #0e3b3a, Cobre #e8a36b.
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
    titulo: 'Prepare a carteira física e anote a seed antes de tudo',
    icon: Fingerprint,
    descricao:
      'Antes de tocar em qualquer botão de saque na corretora, sua hardware wallet já precisa estar inicializada, com firmware atualizado e a seed phrase de 12 ou 24 palavras anotada em papel (idealmente gravada em metal). Essa ordem não é sugestão estética: se você sacar bitcoin para um endereço cuja chave privada não está devidamente resguardada, o saque só transferiu o risco de custódia da corretora para o seu próprio despreparo. A seed nunca é digitada em computador, nunca é fotografada, nunca vira arquivo em nuvem.',
  },
  {
    n: '02',
    titulo: 'Gere o endereço de recebimento na sua própria carteira',
    icon: Wallet,
    descricao:
      'O endereço de destino do saque tem que nascer na tela da sua hardware wallet ou do software conectado a ela, nunca em um e-mail, print de terceiro ou mensagem de suporte. Golpes de "suporte técnico" que mandam endereço pronto por chat são a porta de entrada mais comum para roubo de saque de corretora. Gere o endereço, confira que ele aparece tanto no aplicativo quanto no visor físico do dispositivo, e só então copie.',
  },
  {
    n: '03',
    titulo: 'Confira os primeiros e os últimos caracteres do endereço',
    icon: Search,
    descricao:
      'Um endereço Bitcoin tem entre 26 e 62 caracteres. Ninguém decora isso, e é exatamente essa fadiga visual que malwares de clipboard exploram. A prática mínima de segurança é conferir visualmente os quatro a seis primeiros e os quatro a seis últimos caracteres do endereço colado no campo de saque da corretora contra o endereço mostrado no visor da hardware wallet. Se qualquer caractere da ponta divergir, pare o saque imediatamente.',
  },
  {
    n: '04',
    titulo: 'Use lista de endereços salvos (whitelist) sempre que possível',
    icon: Layers,
    descricao:
      'Boa parte das corretoras sérias permite cadastrar uma whitelist de endereços de saque, com período de carência de 24 a 48 horas antes que um endereço novo possa receber fundos. Ative essa função. Ela cria uma barreira de tempo contra qualquer sequestro de sessão ou de suporte que tente forçar um saque de emergência para endereço desconhecido.',
  },
  {
    n: '05',
    titulo: 'Faça um teste com valor pequeno primeiro',
    icon: ShieldCheck,
    descricao:
      'Antes de mover o saldo inteiro, envie uma fração pequena, o suficiente para cobrir a taxa de rede sem doer se algo sair errado. Esse teste existe para validar três coisas ao mesmo tempo: que o endereço está correto, que a rede escolhida é a mesma dos dois lados (Bitcoin on-chain, não confundir com redes de tokens), e que sua carteira realmente recebe e exibe o saldo. Só depois desse teste o saque do restante é liberado.',
  },
  {
    n: '06',
    titulo: 'Entenda a taxa de saque da corretora e a taxa de rede em vBytes',
    icon: Timer,
    descricao:
      'Existem duas taxas distintas e é comum confundir as duas. A taxa de saque é cobrada pela própria corretora e costuma ser fixa ou baseada em um cálculo interno, muitas vezes acima do custo real da rede. A taxa de rede é paga aos mineradores e é medida em satoshis por vByte (sat/vB), variando conforme o congestionamento da mempool. Corretoras que cobram taxa de saque muito acima da taxa de rede vigente estão embutindo margem. Confira o mempool em tempo real antes de sacar para saber se o valor cobrado é justo.',
  },
  {
    n: '07',
    titulo: 'Escolha um horário de mempool mais barata',
    icon: Timer,
    descricao:
      'A demanda por espaço em cada bloco varia ao longo do dia e da semana. Em horários de menor atividade, geralmente durante a madrugada em horário dos Estados Unidos e da Europa, a mempool tende a esvaziar e a taxa de sat/vB necessária para confirmação em poucos blocos cai. Não é ciência exata, mas observar um explorador de mempool por alguns minutos antes de confirmar o saque grande evita pagar taxa de urgência para uma transação que não tem pressa nenhuma.',
  },
  {
    n: '08',
    titulo: 'Confirme na blockchain usando um explorador independente',
    icon: Search,
    descricao:
      'Depois de enviar, copie o hash (txid) da transação e cole em um explorador de blocos independente da corretora, como o mempool.space. Acompanhe o número de confirmações. O padrão de segurança para valores relevantes é esperar ao menos uma confirmação antes de considerar o saque efetivo, e para valores altos, esperar de três a seis confirmações antes de tratar os fundos como definitivamente liquidados.',
  },
  {
    n: '09',
    titulo: 'Verifique o saldo dentro da sua própria carteira',
    icon: Wallet,
    descricao:
      'Só depois de confirmar na blockchain é que você confere se o saldo aparece corretamente no software da hardware wallet, com o valor exato esperado. Esse é o momento em que a custódia realmente muda de mãos: não quando a corretora diz "saque processado", mas quando o UTXO aparece sob controle das chaves que só você possui.',
  },
  {
    n: '10',
    titulo: 'Envie o restante do saldo repetindo o mesmo processo',
    icon: Send,
    descricao:
      'Validado o teste pequeno e confirmado o recebimento, o restante do saldo pode ser sacado com segurança repetindo a checagem de endereço. Se o valor total for grande, considere fracionar o saque em duas ou três transações em dias diferentes, tanto por prudência operacional quanto para não concentrar todo o histórico de saída em um único UTXO rastreável.',
  },
];

const ALERTAS = [
  {
    titulo: 'Malware trocador de endereço (clipboard hijacker)',
    icon: Copy,
    texto:
      'Existe uma categoria de malware desenhada exclusivamente para monitorar a área de transferência do seu computador ou celular. No instante em que você copia um endereço Bitcoin, o malware substitui silenciosamente pelo endereço do atacante, visualmente parecido nas primeiras letras. É por isso que conferir início e fim do endereço direto no visor físico da hardware wallet não é excesso de zelo, é a única defesa que realmente funciona contra esse vetor.',
  },
  {
    titulo: 'Saques em lote e limites diários',
    icon: Layers,
    texto:
      'Corretoras impõem limites diários e por transação de saque, e muitas processam saques em lote em horários fixos, o que pode atrasar a confirmação em algumas horas mesmo com a taxa de rede paga corretamente. Não entre em pânico ao ver o status "em processamento" por um tempo maior que o esperado: isso é política interna da corretora, não falha da rede Bitcoin.',
  },
  {
    titulo: 'Whitelist de endereços e autenticação de dois fatores (2FA)',
    icon: Lock,
    texto:
      'Sem 2FA ativado por aplicativo autenticador (nunca por SMS, vulnerável a SIM swap), qualquer saque grande vira alvo fácil para quem invadir sua conta de e-mail. Combine 2FA por aplicativo com a whitelist de endereços salvos: juntas, essas duas camadas obrigam um atacante a superar tempo de carência e segundo fator ao mesmo tempo, o que elimina a maioria dos ataques automatizados.',
  },
  {
    titulo: 'Saída para endereço errado é irreversível',
    icon: Ban,
    texto:
      'Não existe rede Bitcoin com botão de desfazer. Um endereço digitado errado, um caractere trocado por malware, ou um saque feito na rede errada (por exemplo, enviar para um endereço de uma segunda camada sem suporte) resulta em fundos perdidos de forma permanente, sem recurso de suporte, sem chargeback, sem exceção. O teste com valor pequeno do passo 5 existe justamente para transformar esse risco catastrófico em um risco administrável.',
  },
  {
    titulo: 'Rastreabilidade do saque e histórico de KYC',
    icon: Fingerprint,
    texto:
      'Todo saque feito de uma corretora com verificação de identidade (KYC) cria um vínculo público e permanente entre sua identidade civil e aquele UTXO específico na blockchain. Qualquer pessoa com acesso ao explorador de blocos, incluindo ferramentas de análise on-chain usadas por autoridades fiscais, pode seguir o rastro daquele UTXO por toda a sua vida útil. Entender essa rastreabilidade antes de sacar evita surpresas desagradáveis quando o assunto é privacidade financeira.',
  },
  {
    titulo: 'Use UTXOs separados, não misture origem de fundos',
    icon: Layers,
    texto:
      'Depois que o bitcoin sai da corretora, cada saque forma um ou mais UTXOs distintos na sua carteira. Misturar UTXOs de origens diferentes (por exemplo, saques de corretoras diferentes ou fundos recebidos de terceiros) em uma única transação futura cria um vínculo on-chain entre históricos que antes eram separados. Manter UTXOs de origem KYC segregados dos demais é a base de qualquer estratégia de higiene de privacidade construída depois da autocustódia.',
  },
];

const CHECKLIST = [
  'Hardware wallet inicializada e testada antes do primeiro saque',
  'Seed phrase anotada em papel ou gravada em metal, nunca digital',
  'Endereço de recebimento gerado na própria carteira, nunca copiado de terceiros',
  'Conferência visual dos primeiros e últimos caracteres do endereço',
  'Whitelist de endereços cadastrada com período de carência ativo',
  'Autenticação de dois fatores por aplicativo, nunca por SMS',
  'Teste com valor pequeno realizado e confirmado antes do saque total',
  'Taxa de rede em sat/vB verificada em mempool.space antes de confirmar',
  'Hash da transação conferido em explorador independente da corretora',
  'Saldo validado dentro da própria carteira antes de considerar o processo concluído',
];

const FAQ = [
  {
    q: 'Como tirar bitcoin da corretora com segurança pela primeira vez?',
    a: 'O processo seguro segue uma ordem fixa: primeiro prepare e teste a hardware wallet e guarde a seed phrase com segurança, depois gere o endereço de recebimento diretamente na carteira, confira os primeiros e últimos caracteres contra o visor físico do dispositivo, cadastre esse endereço em whitelist se a corretora oferecer, faça um saque de teste com valor pequeno, confirme o recebimento na blockchain e na sua própria carteira, e só então envie o restante do saldo. Pular qualquer uma dessas etapas aumenta o risco de perda irreversível.',
  },
  {
    q: 'Qual a diferença entre taxa de saque da corretora e taxa de rede do Bitcoin?',
    a: 'A taxa de saque é cobrada pela corretora como parte do serviço e pode ter margem embutida acima do custo real. A taxa de rede, medida em satoshis por vByte (sat/vB), é paga diretamente aos mineradores para incluir a transação em um bloco e varia conforme o congestionamento da mempool. Antes de sacar, vale conferir a taxa de rede vigente em um explorador como mempool.space para saber se a taxa cobrada pela corretora é razoável.',
  },
  {
    q: 'É seguro copiar o endereço de saque enviado por e-mail ou suporte da corretora?',
    a: 'Não. Nunca use um endereço de recebimento fornecido por e-mail, chat de suporte ou qualquer canal de terceiros. O endereço correto é sempre aquele gerado dentro da sua própria hardware wallet ou do software oficial conectado a ela. Golpes de engenharia social que fornecem endereços prontos são um dos vetores mais comuns de roubo em saques de corretora.',
  },
  {
    q: 'Por que fazer um teste com valor pequeno antes do saque total?',
    a: 'Porque uma transação Bitcoin confirmada é irreversível. O teste pequeno serve para validar simultaneamente que o endereço está correto, que a rede escolhida é a mesma dos dois lados e que sua carteira exibe o saldo recebido corretamente, tudo isso com exposição financeira mínima. Só depois dessa validação o saque do valor total deve ser feito.',
  },
  {
    q: 'O saque de uma corretora com KYC compromete minha privacidade?',
    a: 'Sim, de forma permanente. Todo saque de uma exchange regulada cria um vínculo público entre sua identidade civil e aquele UTXO específico na blockchain, rastreável por ferramentas de análise on-chain indefinidamente. Separar UTXOs de origem KYC de outros fundos e considerar técnicas de consolidação e privacidade depois da autocustódia são passos naturais para quem leva esse risco a sério.',
  },
  {
    q: 'O que fazer se eu enviar o saque para o endereço errado?',
    a: 'Na prática, nada pode ser feito. A rede Bitcoin não possui mecanismo de reversão, chargeback ou suporte capaz de recuperar fundos enviados a um endereço incorreto ou controlado por terceiros. É exatamente por isso que a conferência de caracteres e o teste com valor pequeno não são etapas opcionais, são a única proteção real contra esse erro.',
  },
  {
    q: 'Quanto tempo demora para o saque aparecer na minha carteira?',
    a: 'Depende de dois fatores: o tempo de processamento interno da corretora (que pode incluir saques em lote e filas de segurança) e o tempo de confirmação na rede Bitcoin, que varia conforme a taxa paga e o congestionamento da mempool no momento do envio. Para valores relevantes, o padrão de segurança é aguardar de uma a seis confirmações antes de considerar o saldo definitivamente líquido.',
  },
  {
    q: 'Preciso me preocupar com malware trocador de endereço mesmo usando hardware wallet?',
    a: 'Sim. O malware age no computador ou celular, substituindo o endereço colado na área de transferência antes mesmo de chegar à hardware wallet. A defesa é sempre conferir o endereço mostrado no visor físico do dispositivo, que não pode ser adulterado remotamente, contra o que aparece na tela da corretora, caractere por caractere nas pontas.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Hardware wallet conectada a um computador em ambiente escuro, simbolizando o primeiro saque de bitcoin de uma corretora para autocustódia"
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
            <ShieldCheck size={11} className="inline mr-2" /> Autocustódia · Primeiro Saque
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Como tirar bitcoin da corretora{' '}
          <span
            style={{
              color: '#e8a36b',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(232,163,107,0.45), 0 0 80px rgba(232,163,107,0.25)',
            }}
          >
            sem perder nada no caminho.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          O passo a passo real do primeiro saque para hardware wallet: da seed phrase ao explorador de blocos, com os erros que transformam autocustódia em prejuízo irreversível.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function TirarDaExchange() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/autocustodia/tirar-da-exchange-para-hardware-wallet"
        custom={{
          title: 'Como Tirar Bitcoin da Corretora: Guia do Primeiro Saque Seguro',
          description:
            'Passo a passo completo de como tirar bitcoin da corretora para hardware wallet: seed phrase, endereço de recebimento, taxa de rede em vBytes, whitelist, 2FA e confirmação na blockchain.',
          canonical: 'https://sovereign-arsenal.lovable.app/autocustodia/tirar-da-exchange-para-hardware-wallet',
          primaryKeyword: 'como tirar bitcoin da corretora',
          lsiKeywords: [
            'sacar bitcoin da exchange',
            'transferir bitcoin para hardware wallet',
            'primeiro saque de bitcoin',
            'taxa de rede Bitcoin vBytes',
            'whitelist de endereços exchange',
            'malware trocador de endereço',
          ],
          longTailKeywords: [
            'como tirar bitcoin da corretora pela primeira vez com segurança',
            'passo a passo saque de bitcoin para carteira fria',
            'como conferir endereço de saque de bitcoin',
            'diferença entre taxa de saque e taxa de rede Bitcoin',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Autocustódia', url: '/autocustodia' },
            { name: 'Tirar da Exchange', url: '/autocustodia/tirar-da-exchange-para-hardware-wallet' },
          ],
          schemaType: 'Article',
          articleSection: 'Autocustódia',
          relatedPages: [
            '/comparativos/melhores-hardware-wallets',
            '/autocustodia/backup-seed-phrase-guia',
            '/autocustodia/utxo-consolidacao',
            '/autocustodia/coinjoin-privacidade',
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

        {/* CAPÍTULO 1 — Por que a ordem importa */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Por que a ordem das etapas importa
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Sacar da corretora é fácil.{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Sacar certo é outra coisa.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  "Not your keys, not your coins" virou frase de camiseta, mas a maior parte de quem repete essa frase nunca fez o primeiro saque com o cuidado que ele exige. O saque em si é um formulário simples: cola endereço, escolhe valor, clica em confirmar. O problema é que cada um desses três cliques esconde uma decisão que, se errada, é irreversível.
                </p>
                <p>
                  Este guia não é sobre qual botão apertar. É sobre a sequência de verificações que separa quem tira bitcoin da corretora com segurança de quem vira estatística de golpe ou de erro de digitação. A ordem das etapas abaixo não é sugestão de estilo: cada passo existe para fechar uma porta específica que o passo anterior deixou aberta.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #e8a36b', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Autocustódia não começa quando o saque é confirmado. Começa antes, quando a chave privada já está protegida.
                </blockquote>
                <p>
                  Corretoras centralizadas são um ponto único de falha: falência, congelamento regulatório, hack ou simples erro operacional podem travar seu saldo do dia para a noite. Tirar bitcoin da exchange é o ato que devolve o controle das chaves privadas para você. Mas esse ato só é seguro se for feito com uma hardware wallet já preparada, seed guardada, endereço conferido e taxa de rede entendida. É exatamente esse roteiro que os dez passos a seguir cobrem, na ordem correta.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Os 10 passos */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 02 · O roteiro completo
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Os dez passos do{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  primeiro saque seguro.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              {ETAPAS.map((e, i) => {
                const Icon = e.icon;
                return (
                  <motion.div
                    key={e.n}
                    {...fade(i * 0.04)}
                    className="grid md:grid-cols-12 gap-6 md:gap-10 p-8 md:p-10 rounded-3xl"
                    style={{ backgroundColor: 'rgba(244,237,228,0.05)', border: '1px solid rgba(232,163,107,0.15)' }}
                  >
                    <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-4">
                      <span className="text-4xl md:text-5xl font-black" style={{ color: 'rgba(232,163,107,0.4)' }}>
                        {e.n}
                      </span>
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(232,163,107,0.15)' }}
                      >
                        <Icon size={20} style={{ color: '#e8a36b' }} />
                      </div>
                    </div>
                    <div className="md:col-span-10">
                      <h3 className="text-xl md:text-2xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>
                        {e.titulo}
                      </h3>
                      <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                        {e.descricao}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Imagem seed backup */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 03 · Antes do endereço, a seed
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Sem backup sólido,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  o saque é só um adiamento do prejuízo.
                </span>
              </h2>
              <p className="text-lg md:text-xl font-light leading-[1.7] mb-6" style={{ color: '#2d3a37' }}>
                A seed phrase é a única cópia real das suas chaves privadas. Se o dispositivo quebrar, for perdido ou roubado, é a seed que devolve acesso aos fundos, e só a seed. Papel resiste a pouco: fogo, água e tempo destroem tinta e celulose. Placas de metal com letras estampadas ou perfuradas resolvem esse problema por uma fração do valor que você está prestes a mover para a carteira.
              </p>
              <p className="text-lg md:text-xl font-light leading-[1.7]" style={{ color: '#2d3a37' }}>
                Se você ainda não tem esse processo validado, pare aqui e resolva o backup antes do saque. Fizemos um guia dedicado só a isso.
              </p>
              <Link
                to="/autocustodia/backup-seed-phrase-guia"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full font-bold text-sm tracking-wide uppercase transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}
              >
                Guia de backup da seed phrase <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden rounded-3xl">
                <img
                  src={seedImg}
                  alt="Mãos gravando uma seed phrase de backup em placa de metal, protegendo as chaves privadas antes do saque de bitcoin"
                  loading="lazy"
                  width={1600}
                  height={1200}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Taxa de rede e mempool */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6 lg:order-2">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 04 · Taxa de rede em vBytes
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                A mempool não é uma fila.{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  É um leilão.
                </span>
              </h2>
              <p className="text-lg md:text-xl font-light leading-[1.7] mb-6" style={{ color: '#2d3a37' }}>
                Cada bloco tem espaço limitado, medido em vBytes (um jeito de contar peso de dados que dá desconto a certos tipos de transação). Quando muita gente quer confirmar transação ao mesmo tempo, quem paga mais satoshis por vByte entra primeiro. Isso significa que a mesma transação pode custar cinco vezes mais em um horário de pico do que em um horário calmo.
              </p>
              <p className="text-lg md:text-xl font-light leading-[1.7]" style={{ color: '#2d3a37' }}>
                Antes de confirmar um saque grande, abra um explorador de mempool em tempo real, observe a taxa recomendada para confirmação em uma hora, seis horas e vinte e quatro horas, e decida se vale esperar. Não existe prêmio por pressa quando o dinheiro já está seguro na corretora esperando o momento certo de sair.
              </p>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6 lg:order-1">
              <div className="relative h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden rounded-3xl">
                <img
                  src={mempoolImg}
                  alt="Visualização abstrata de rede blockchain em tons de teal e cobre, representando a mempool do Bitcoin e as taxas de rede em vBytes"
                  loading="lazy"
                  width={1600}
                  height={1200}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Alertas de segurança */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 05 · Os riscos que ninguém avisa
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Os detalhes pequenos que{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  custam o saldo inteiro.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {ALERTAS.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={i}
                    {...fade(i * 0.05)}
                    className="p-8 rounded-3xl flex flex-col gap-4"
                    style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(232,163,107,0.18)' }}>
                        <Icon size={20} style={{ color: '#e8a36b' }} />
                      </div>
                      <h3 className="text-lg md:text-xl font-black leading-tight" style={{ color: '#f4ede4' }}>
                        {a.titulo}
                      </h3>
                    </div>
                    <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                      {a.texto}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              {...fade(0.1)}
              className="mt-10 p-8 rounded-3xl flex items-start gap-5"
              style={{ backgroundColor: 'rgba(232,163,107,0.1)', border: '1px solid rgba(232,163,107,0.35)' }}
            >
              <AlertTriangle size={28} className="shrink-0 mt-1" style={{ color: '#e8a36b' }} />
              <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#f4ede4' }}>
                Nenhum suporte de corretora, exchange ou carteira jamais pede sua seed phrase. Nenhuma central de atendimento legítima envia endereço de saque pronto por chat. Se algo assim acontecer com você, encerre o contato e trate como tentativa de golpe.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Checklist final + imagem vault */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 06 · Checklist antes de clicar em enviar
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Dez itens.{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Zero atalho.
                </span>
              </h2>
              <div className="space-y-3">
                {CHECKLIST.map((c, i) => (
                  <motion.div key={i} {...fade(i * 0.03)} className="flex items-start gap-3">
                    <ShieldCheck size={18} className="shrink-0 mt-1" style={{ color: '#e8a36b' }} />
                    <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: '#2d3a37' }}>
                      {c}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden rounded-3xl">
                <img
                  src={vaultImg}
                  alt="Cofre entreaberto com hardware wallet e placa de backup de seed phrase, simbolizando a segurança final da autocustódia de bitcoin"
                  loading="lazy"
                  width={1920}
                  height={1280}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Explorador de blocos */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 07 · Confirme sempre por fora
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Confie na blockchain,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não na tela da corretora.
                </span>
              </h2>
            </motion.div>
            <motion.a
              {...fade(0.1)}
              href="https://mempool.space"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 md:p-8 rounded-2xl transition-all hover:-translate-y-1"
              style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-bold mb-1" style={{ color: '#e8a36b' }}>
                  Explorador de blocos independente
                </p>
                <p className="text-lg md:text-xl font-bold">mempool.space</p>
              </div>
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </section>

        {/* CAPÍTULO 8 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 08 · Perguntas que importam
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Antes de sacar,{' '}
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
                    style={{ backgroundColor: '#ece2d3', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}
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
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Tirar da corretora{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  é só o primeiro passo da autocustódia.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  to: '/autocustodia/guia-migracao-corretora',
                  titulo: 'Guia da migração: como sair da corretora',
                  texto: 'A página pilar da travessia: risco de contraparte, checklist de sete passos e saque de teste.',
                },
                {
                  to: '/autocustodia/erros-fatais-saque-corretora',
                  titulo: 'Erros fatais no saque de corretoras',
                  texto: 'Rede errada, endereço trocado, taxa mal calculada e transações travadas.',
                },
                {
                  to: '/comparativos/melhores-hardware-wallets',
                  titulo: 'Melhores hardware wallets em 2026',
                  texto: 'O comparativo completo antes de escolher onde suas chaves privadas vão morar.',
                },
                {
                  to: '/autocustodia/backup-seed-phrase-guia',
                  titulo: 'Backup de seed phrase: guia completo',
                  texto: 'Papel, metal, Shamir Secret Sharing e os erros que destroem backups.',
                },
                {
                  to: '/autocustodia/utxo-consolidacao',
                  titulo: 'Consolidação de UTXOs',
                  texto: 'O que fazer com os pedaços de saldo espalhados depois de vários saques.',
                },
                {
                  to: '/autocustodia/coinjoin-privacidade',
                  titulo: 'CoinJoin e privacidade on-chain',
                  texto: 'Como quebrar o rastro de UTXOs vindos de corretoras com KYC.',
                },
                {
                  to: '/dicionario-cripto',
                  titulo: 'Dicionário Cripto',
                  texto: 'vByte, mempool, UTXO, whitelist: todos os termos deste guia explicados a fundo.',
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
