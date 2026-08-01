import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck, KeyRound, Cable, Cpu, Eye, Lock, Zap,
  ArrowRight, CheckCircle2, XCircle, Fingerprint, AlertTriangle,
} from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/jade-core/hero-device.jpg';
import setupImg from '@/assets/jade-core/setup-hands.jpg';
import seedImg from '@/assets/jade-core/seed-backup.jpg';
import compImg from '@/assets/jade-core/comparativo-hardware.jpg';
import verifyImg from '@/assets/jade-core/verify-address.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const FAQS = [
  {
    q: 'O que acontece se eu esquecer meu PIN da Jade Core?',
    a: 'Depois de algumas tentativas erradas o dispositivo se apaga sozinho como proteção contra invasão. Você recupera tudo digitando as suas 12 palavras em outra Jade Core ou em qualquer carteira compatível com o padrão BIP39. Por isso o backup em papel vale mais que o aparelho.',
  },
  {
    q: 'Preciso ter internet o tempo todo pra usar?',
    a: 'O dispositivo em si nunca se conecta à internet. Quem se conecta é o aplicativo (celular ou desktop), que conversa com a rede Bitcoin. A Jade Core só confirma e assina as transações localmente, do seu lado.',
  },
  {
    q: 'A Blockstream, dona da Jade Core, tem acesso ao meu Bitcoin?',
    a: 'Não. O chamado Blind Oracle nunca vê seu PIN, suas chaves ou seu saldo. Ele participa apenas de uma etapa matemática de destravamento, sem enxergar nenhuma informação sensível sua.',
  },
  {
    q: 'Posso usar a Jade Core com outras carteiras além do app oficial?',
    a: 'Sim. Ela é compatível com carteiras coordenadoras conhecidas, como Sparrow Desktop e Electrum, entre outras. Você não fica preso a um único aplicativo.',
  },
  {
    q: 'O que são essas 12 palavras e por que elas são tão importantes?',
    a: 'É a sua frase de recuperação (padrão BIP39). Qualquer pessoa que tenha acesso a essas palavras na ordem certa consegue recuperar o acesso ao saldo em qualquer dispositivo compatível. Jamais fotografe, digite em sites ou compartilhe.',
  },
  {
    q: 'A Jade Core serve pra guardar outras criptomoedas além de Bitcoin?',
    a: 'Não. Ela foi feita com foco exclusivo em Bitcoin (e na rede Liquid). Essa limitação é proposital: reduz a complexidade e a superfície de ataque do dispositivo.',
  },
  {
    q: 'É seguro comprar esse tipo de dispositivo pela internet?',
    a: 'O próprio processo de configuração inclui um teste de autenticidade que confirma se o aparelho veio de fábrica sem alterações no caminho. Compre de fontes oficiais ou revendedores de confiança e sempre execute esse teste antes de criar sua carteira.',
  },
  {
    q: 'Preciso entender de tecnologia pra usar isso no dia a dia?',
    a: 'Não. Toda a jornada, da configuração ao envio e recebimento, dura poucos minutos e é guiada passo a passo pelo aplicativo. O objetivo da Jade Core é justamente remover essa barreira técnica.',
  },
  {
    q: 'E se a Blockstream fechar as portas um dia?',
    a: 'Como o firmware e o software são abertos e suas 12 palavras seguem o padrão BIP39 usado por praticamente todas as carteiras do mercado, seu saldo continua acessível em qualquer outro dispositivo compatível, mesmo que a empresa original deixe de existir.',
  },
];

export default function JadeCoreReview() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Jade Core: a carteira que te tira da gaiola fiat em menos de 5 minutos',
    description: 'Review completo da Jade Core, o hardware wallet de entrada da Blockstream lançado em 2026. Segurança de nível institucional em menos de 5 minutos.',
    author: { '@type': 'Person', name: 'Lord Junnior' },
    datePublished: '2026-07-04',
    inLanguage: 'pt-BR',
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-foreground">
      <Helmet>
        <title>Jade Core Review: autocustódia Bitcoin em 5 minutos | Lord Junnior</title>
        <meta name="description" content="Review honesto da Jade Core (2026): como sair da exchange, configurar em minutos, proteger suas 12 palavras e comparativo com Ledger, Trezor e ColdCard." />
        <link rel="canonical" href="https://lordjunnior.com.br/autocustodia/jade-core-review" />
        <meta property="og:title" content="Jade Core Review: saia da gaiola fiat em 5 minutos" />
        <meta property="og:description" content="Manual passo a passo da nova hardware wallet de entrada da Blockstream. Segurança de verdade, sem curva técnica." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lordjunnior.com.br/autocustodia/jade-core-review" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>
      <BackToHome />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Hardware wallet Jade Core da Blockstream sobre superfície escura, tela brilhando em azul cyan"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920} height={1280} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/70 to-[#07080c]/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
          <motion.p {...fade(0)} className="font-mono text-[10px] tracking-[0.35em] text-primary uppercase mb-6">
            [ AUTOCUSTÓDIA · REVIEW 2026 ]
          </motion.p>
          <motion.h1
            {...fade(0.1)}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-5xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}
          >
            Jade Core: a carteira que te tira da gaiola fiat em menos de 5 minutos
          </motion.h1>
          <motion.p {...fade(0.2)} className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
            O novo hardware wallet de entrada da Blockstream, lançado em 2026, pensado pra quem nunca teve uma carteira física e quer sair da exchange sem estudar criptografia por três meses.
          </motion.p>
          <motion.div {...fade(0.3)} className="mt-10 flex flex-wrap gap-3 text-xs text-white/60 font-mono">
            <span className="px-3 py-1.5 border border-white/15 rounded-full">Só Bitcoin</span>
            <span className="px-3 py-1.5 border border-white/15 rounded-full">Open source</span>
            <span className="px-3 py-1.5 border border-white/15 rounded-full">USB-C + Bluetooth</span>
            <span className="px-3 py-1.5 border border-white/15 rounded-full">~US$ 99</span>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-8 text-lg leading-[1.85] text-white/80">
          <motion.h2 {...fade()} className="text-3xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            O que é essa tal de autocustódia, e por que ela importa
          </motion.h2>
          <motion.p {...fade(0.05)}>
            Imagina que você guarda todo o seu dinheiro numa casa que não é sua. Confia que o dono vai deixar você entrar e tirar o que é seu sempre que precisar. Só que, se um dia ele decidir trancar a porta, atrasar a entrega ou simplesmente encerrar as operações, você não tem nada a fazer. É basicamente assim que funciona deixar seu Bitcoin numa corretora.
          </motion.p>
          <motion.p {...fade(0.1)}>
            Autocustódia é o oposto: é você mesmo guardando a chave da sua própria casa. Ninguém mais tem acesso, ninguém mais decide se você pode ou não usar o que é seu.
          </motion.p>
          <motion.p {...fade(0.15)}>
            A <strong className="text-primary">Jade Core</strong> é uma ferramenta física, do tamanho de um pen drive, criada exatamente pra fazer esse trabalho: guardar a chave da sua casa (seu Bitcoin) de um jeito seguro e simples, sem você precisar entender de tecnologia. Foi lançada em 2026 pela Blockstream, mesma empresa da Jade e da Jade Plus. A diferença é o foco: caminho mais curto possível pra quem nunca teve uma carteira física.
          </motion.p>
        </div>
      </section>

      {/* NOVIDADES */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-[#0b0d13] to-[#07080c] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fade()}>
            <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">[ O QUE MUDOU ]</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              A versão direta ao ponto de uma linha inteira
            </h2>
            <ul className="space-y-5 text-white/80 leading-relaxed">
              {[
                ['Tela 66% maior e mais brilhante', 'ler endereço e valor da transação sem apertar os olhos.'],
                ['Botões físicos no lugar da roda', 'navegação mais direta que os modelos antigos.'],
                ['USB-C + Bluetooth', 'pareia com o app Blockstream Green no PC, iPhone ou Android.'],
                ['20 gramas, 6,5 × 3 cm', 'cabe na palma da mão e no bolso, quase invisível.'],
                ['Preço de entrada (~US$ 99)', 'muito mais barato que os modelos avançados da mesma marca.'],
              ].map(([title, desc]) => (
                <li key={title as string} className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">{title}:</strong> <span className="text-white/70">{desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fade(0.15)} className="relative">
            <img
              src={compImg}
              alt="Comparação entre modelo antigo de hardware wallet e a nova Jade Core com tela maior"
              className="w-full h-auto rounded-2xl border border-white/10 shadow-2xl"
              loading="lazy" width={1600} height={1067}
            />
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto mt-20 p-8 md:p-10 border border-yellow-500/20 bg-yellow-500/5 rounded-2xl">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
            <div className="text-white/80 leading-relaxed">
              <p className="text-white font-semibold mb-2">O que ela não tem, de propósito</p>
              <p>Não tem câmera de QR code (você digita ou cola o endereço), não tem bateria própria (precisa estar plugada no PC, tomada ou power bank) e não tem entrada de cartão de memória. Não são falhas, são escolhas de design pra reduzir a complexidade de quem tá começando.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEGURANÇA */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-12 text-white/80 leading-[1.85]">
          <motion.div {...fade()}>
            <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">[ COMO ELA PROTEGE SEU BITCOIN ]</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              A analogia do cofre com duas chaves
            </h2>
            <p>
              Imagina um cofre de banco que só abre quando duas chaves diferentes giram ao mesmo tempo. Uma fica com você, a outra guardada bem longe. Mesmo que alguém roube o cofre inteiro, sem a segunda chave ele não abre nada.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: KeyRound, title: 'Seu PIN', desc: 'Só você sabe, digitado no aparelho.' },
              { icon: Cpu, title: 'O dispositivo', desc: 'Guarda parte da matemática localmente.' },
              { icon: Eye, title: 'Blind Oracle', desc: 'Servidor da Blockstream que nunca vê seu PIN, suas chaves ou seu saldo.' },
            ].map((c, i) => (
              <motion.div key={c.title} {...fade(i * 0.1)} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <c.icon className="w-7 h-7 text-primary mb-4" />
                <p className="text-white font-semibold mb-2">{c.title}</p>
                <p className="text-sm text-white/60 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade()} className="pt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              A analogia da carta lacrada (Anti-Klepto)
            </h3>
            <p>
              Quando você assina uma transação é como lacrar uma carta. Um dispositivo malicioso poderia esconder pedacinhos da sua chave secreta dentro do lacre, transação após transação, vazando devagar. O <strong className="text-primary">Anti-Klepto</strong> funciona como uma segunda pessoa de confiança conferindo cada lacre antes de sair. Você fica protegido contra ataques sofisticados, mesmo se o fabricante fosse comprometido no futuro.
            </p>
          </motion.div>

          <motion.div {...fade()} className="pt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Open source: você não precisa confiar cego
            </h3>
            <p>
              Todo o hardware, o firmware (o cérebro do aparelho) e o software da Jade Core são abertos ao público. Qualquer especialista independente pode conferir o código por dentro e confirmar que não existe nada escondido. Existe uma comunidade inteira de olhos verificando isso o tempo todo, você não precisa acreditar na palavra da empresa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMPARATIVO */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0b0d13] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade()} className="mb-12">
            <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">[ COMPARATIVO ]</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Jade Core vs. o resto do mercado
            </h2>
          </motion.div>

          <motion.div {...fade(0.1)} className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm text-white/80">
              <thead className="bg-white/[0.03] text-white">
                <tr>
                  <th className="p-4 text-left font-semibold">Característica</th>
                  <th className="p-4 text-left font-semibold text-primary">Jade Core</th>
                  <th className="p-4 text-left font-semibold">Ledger Nano X</th>
                  <th className="p-4 text-left font-semibold">Trezor Safe</th>
                  <th className="p-4 text-left font-semibold">ColdCard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ['Foco', 'Só Bitcoin', 'Multi-moeda', 'Multi-moeda', 'Só Bitcoin'],
                  ['Open source', 'Sim, tudo', 'Não', 'Parcial', 'Sim'],
                  ['Bateria própria', 'Não', 'Sim', 'Não', 'Não'],
                  ['Câmera QR', 'Não', 'Não', 'Não', 'Sim'],
                  ['Air-gapped', 'Não', 'Não', 'Não', 'Sim'],
                  ['Preço', 'Mais acessível', 'Intermediário', 'Intermediário', 'Mais caro'],
                ].map(row => (
                  <tr key={row[0]} className="hover:bg-white/[0.02] transition-colors">
                    {row.map((cell, i) => (
                      <td key={i} className={`p-4 ${i === 1 ? 'text-primary font-medium' : ''}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p {...fade(0.2)} className="mt-8 text-white/70 leading-relaxed max-w-3xl">
            <strong className="text-white">Como ler sem ser especialista:</strong> se você quer o caminho mais simples pra sair da exchange, a Jade Core cobre. Se já tem muito Bitcoin acumulado e quer o máximo de isolamento físico (nunca plugar em nada), a ColdCard ou a Jade Plus fazem mais sentido.
          </motion.p>
        </div>
      </section>

      {/* PASSO A PASSO */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fade()} className="lg:sticky lg:top-24">
            <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">[ CONFIGURAÇÃO ]</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Do zero à carteira ativa em menos de 5 minutos
            </h2>
            <img
              src={setupImg}
              alt="Mão segurando hardware wallet Jade Core conectada via USB-C ao computador"
              className="w-full h-auto rounded-2xl border border-white/10"
              loading="lazy" width={1600} height={1067}
            />
          </motion.div>

          <ol className="space-y-6">
            {[
              'Ligue o cabo USB-C na Jade Core e em qualquer fonte de energia (PC, tomada ou power bank).',
              'No aparelho, escolha "Setup Jade" e depois "criar nova carteira".',
              'O dispositivo mostra 12 palavras de recuperação, uma por vez. Anote todas no papel, na ordem certa, e guarde longe de fotos ou nuvem. Essas 12 palavras são o backup master.',
              'O aparelho pede pra confirmar algumas dessas palavras, só pra garantir que você anotou de verdade.',
              'Escolha a conexão: Bluetooth (Jade ligada na tomada, você usa o celular) ou cabo USB direto no PC.',
              'Abra o app Blockstream Green e conecte o dispositivo.',
              'Faça o teste de autenticidade oferecido pelo app. Confirma que seu aparelho é original e não foi alterado no caminho.',
              'Crie um PIN. Atenção: se alguém errar várias vezes tentando adivinhar, o dispositivo se apaga sozinho de propósito.',
              'Pronto. Status "ativo". Sua carteira já recebe e envia Bitcoin.',
            ].map((step, i) => (
              <motion.li key={i} {...fade(i * 0.05)} className="flex gap-5 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <span className="text-3xl font-bold text-primary shrink-0 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-white/80 leading-relaxed">{step}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* RECEBER / ENVIAR */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0b0d13] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fade()} className="order-2 lg:order-1">
            <img
              src={verifyImg}
              alt="Endereço Bitcoin sendo verificado simultaneamente no celular e na tela do hardware wallet"
              className="w-full h-auto rounded-2xl border border-white/10 shadow-2xl"
              loading="lazy" width={1600} height={1067}
            />
          </motion.div>
          <motion.div {...fade(0.1)} className="order-1 lg:order-2 space-y-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">[ USO DIÁRIO ]</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Receber e enviar Bitcoin sem susto
              </h2>
            </div>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <p className="text-white font-semibold mb-2 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Para receber</p>
                <p>O app gera um endereço. A Jade Core mostra o mesmo endereço na própria tela. Compare os dois antes de confirmar. Isso garante que nenhum programa malicioso no celular trocou o endereço por outro.</p>
              </div>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <p className="text-white font-semibold mb-2 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Para enviar</p>
                <p>Você digita valor e destino no app. A Jade Core mostra endereço, valor e taxa antes de pedir sua confirmação física no aparelho. A chave privada nunca sai do dispositivo, só a assinatura da transação é enviada de volta.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEED / RECUPERAÇÃO */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fade()}>
            <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">[ E SE EU PERDER O APARELHO? ]</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              O dispositivo não é o seu Bitcoin. Ele é só a ferramenta.
            </h2>
            <div className="space-y-5 text-white/80 leading-relaxed">
              <p>
                Quem realmente guarda o acesso ao seu saldo são aquelas 12 palavras que você anotou lá no começo. Se a Jade Core for perdida, roubada ou quebrar, você compra qualquer outro dispositivo compatível (inclusive de outra marca, desde que siga o padrão BIP39, o padrão da imensa maioria do mercado), digita as mesmas palavras na ordem certa, e todo o seu saldo reaparece exatamente como estava.
              </p>
              <p>
                Funciona inclusive em carteiras de desktop como a <strong className="text-primary">Sparrow</strong>, sem precisar do app original da Blockstream.
              </p>
              <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-start gap-4">
                <Lock className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                <p className="text-white/80">
                  <strong className="text-white">As 12 palavras valem mais que o aparelho.</strong> Papel, lugar seguro, longe de foto de celular, longe de nuvem. Nunca digite em nenhum site ou app que não seja o processo oficial de recuperação da carteira.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div {...fade(0.15)}>
            <img
              src={seedImg}
              alt="Papel com palavras de recuperação borradas guardado dentro de cofre metálico"
              className="w-full h-auto rounded-2xl border border-white/10 shadow-2xl"
              loading="lazy" width={1600} height={1067}
            />
          </motion.div>
        </div>
      </section>

      {/* VEREDITO */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-[#0b0d13] to-[#07080c] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.p {...fade()} className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">[ VEREDITO ]</motion.p>
          <motion.h2 {...fade(0.05)} className="text-3xl md:text-6xl font-bold text-white leading-[1.05]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Vale a pena a Jade Core?
          </motion.h2>
          <motion.p {...fade(0.1)} className="text-lg md:text-xl text-white/80 leading-relaxed">
            Se você ainda deixa seu Bitcoin numa exchange e nunca teve carteira física, ela cobre o essencial: segurança de verdade, sem a curva de aprendizado dos modelos avançados. Entrega grande parte da experiência dos modelos premium da mesma marca por um preço de entrada, e sem misturar seu Bitcoin com outras criptos.
          </motion.p>
          <motion.p {...fade(0.15)} className="text-lg text-white/70 leading-relaxed">
            Quem já lida com valores maiores ou quer o máximo de isolamento físico pode considerar um modelo mais avançado no futuro. Mas como primeiro passo de quem decidiu parar de terceirizar a própria liberdade financeira, ela cumpre exatamente o que promete.
          </motion.p>
          <motion.div {...fade(0.2)} className="pt-6 flex flex-wrap justify-center gap-4">
            <Link to="/autocustodia" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Ver o hub de autocustódia <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/autocustodia/seed-phrase-em-aco" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors">
              Proteger a seed em aço
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.p {...fade()} className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">[ FAQ ]</motion.p>
          <motion.h2 {...fade(0.05)} className="text-3xl md:text-5xl font-bold text-white mb-12 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Perguntas frequentes sobre a Jade Core
          </motion.h2>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <motion.details
                key={f.q}
                {...fade(i * 0.03)}
                className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-colors"
              >
                <summary className="cursor-pointer font-semibold text-white flex items-start justify-between gap-4">
                  <span>{f.q}</span>
                  <span className="text-primary shrink-0 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-4 text-white/70 leading-relaxed">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTINUE */}
      <section className="py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">[ CONTINUE SUA TRILHA ]</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Próximos passos da autocustódia
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { to: '/autocustodia/seed-phrase-em-aco', title: 'Seed phrase em aço', desc: 'Blindar as 12 palavras contra fogo, água e tempo.' },
              { to: '/multisig-bitcoin', title: 'Multisig Bitcoin', desc: 'Quando uma assinatura só não é suficiente pra dormir tranquilo.' },
              { to: '/autocustodia/heranca-bitcoin', title: 'Herança Bitcoin', desc: 'O que acontece com seu saldo quando você não estiver mais aqui.' },
            ].map(c => (
              <Link key={c.to} to={c.to} className="group p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/40 hover:bg-white/[0.04] transition-all">
                <ShieldCheck className="w-6 h-6 text-primary mb-4" />
                <p className="text-white font-semibold mb-2 text-lg">{c.title}</p>
                <p className="text-sm text-white/60 leading-relaxed mb-4">{c.desc}</p>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                  Abrir <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}