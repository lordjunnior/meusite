import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Radio, KeyRound, Zap, Network, ShieldOff, ChevronDown,
  ArrowRight, Ban, MessageSquareOff, Landmark, Megaphone, Compass, KeyRound as KeyIcon,
  AlertTriangle, Copy, Check, ExternalLink, BookOpen,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import PageFloatingToc from '@/components/PageFloatingToc';
import ReadingTime from '@/components/ReadingTime';
import ShareButtons from '@/components/ShareButtons';
import InlineLeadCapture from '@/components/InlineLeadCapture';
import heroImg from '@/assets/blockchain-rede-global.jpg';
import imgChave from '@/assets/nostr/nostr-chave-privada.jpg';
import imgRelay from '@/assets/nostr/nostr-relays-malha.jpg';
import imgZap from '@/assets/nostr/nostr-zap-lightning.jpg';
import imgLivro from '@/assets/blockchain-livro-razao.jpg';
import imgImpacto from '@/assets/nostr/nostr-rede-desligada.jpg';

/**
 * /nostr-rede-social-sem-censura
 * Grupo de navegação: Saída & Infraestrutura (sistemas resilientes e resistentes a controle central).
 * Paleta temática desta página: Sand (#f4ede4 / #faf6f0) + Teal profundo (#0e3b3a) + Violeta Nostr (#8b5cf6).
 * Segue o padrão editorial claro obrigatório (mem://constraints/design/no-dark-pages-mandate),
 * referência visual: /saida/jurisdicoes-amigaveis.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

interface Problema {
  icon: typeof Ban;
  titulo: string;
  analogia: string;
  texto: string;
}

const PROBLEMAS: Problema[] = [
  {
    icon: MessageSquareOff,
    titulo: 'A censura silenciosa (o shadowban)',
    analogia: 'É como falar numa sala cheia de gente achando que todo mundo está ouvindo, sem saber que desligaram seu microfone escondido, sem ninguém te contar.',
    texto: 'Numa rede social comum, sempre existe alguém decidindo o que pode ou não circular. Às vezes isso é explícito, seu post some e avisam você. Na maioria dos casos é silencioso: seu conteúdo simplesmente para de alcançar as pessoas, sem aviso, sem processo, sem explicação.',
  },
  {
    icon: Landmark,
    titulo: 'Seu conteúdo é alugado, não é seu',
    analogia: 'É como decorar a casa de outra pessoa por anos, sem contrato nenhum, sabendo que o dono pode te botar pra fora a qualquer momento levando tudo o que você construiu.',
    texto: 'Anos de fotos, vídeos e conversas, tudo guardado dentro dos servidores de uma empresa que pode suspender ou apagar sua conta a qualquer momento, por qualquer motivo, sem nenhum poder de decisão seu sobre isso.',
  },
  {
    icon: Megaphone,
    titulo: 'O algoritmo que decide o que você pensa',
    analogia: 'É como entrar num mercado onde os produtos não estão organizados pra te ajudar a achar o que você precisa, mas posicionados pra te fazer comprar mais do que você foi buscar.',
    texto: 'Você raramente sabe por que está vendo determinado conteúdo. A timeline não é neutra, ela foi desenhada pra prender sua atenção o máximo de tempo possível, priorizando reação emocional acima de relevância.',
  },
  {
    icon: Ban,
    titulo: 'A monetização que some do dia pra noite',
    analogia: 'É como construir um negócio inteiro dentro de uma loja alugada onde o dono pode trocar a fechadura amanhã de manhã, sem aviso prévio.',
    texto: 'Quem cria conteúdo gera todo o valor da plataforma, mas o retorno financeiro depende de regras que mudam sem aviso, com risco constante de perder tudo de uma vez, sem direito a recurso real.',
  },
];

interface Pilar {
  num: string;
  nome: string;
  icon: typeof Radio;
  analogia: string;
  texto: string;
}

const PILARES: Pilar[] = [
  {
    num: '01',
    nome: 'Clientes: as torneiras que você usa no dia a dia',
    icon: Radio,
    analogia: 'Pensa numa torneira de casa: a água que sai não pertence a ela, ela é só o ponto de acesso a um encanamento inteiro.',
    texto: 'Clientes são os aplicativos, como Primal, Damus e Amethyst. É ali que você lê, publica, responde e configura seu perfil. Qualquer desenvolvedor no mundo pode criar um novo cliente seguindo as mesmas regras abertas do protocolo, por isso existem tantas opções diferentes, cada uma com sua própria cara, todas conversando com o mesmo protocolo por trás.',
  },
  {
    num: '02',
    nome: 'Relays: o encanamento que ninguém consegue fechar sozinho',
    icon: Network,
    analogia: 'Pensa nos relays como uma rede de correios independentes. Você manda sua carta por vários correios ao mesmo tempo, e mesmo que um feche as portas, os outros continuam entregando.',
    texto: 'Relays são os servidores que guardam e retransmitem o que você publica. Qualquer pessoa no mundo pode abrir seu próprio relay, gratuito ou pago, aberto ou com regras próprias. Como o conteúdo fica espalhado por milhares deles, não existe um botão único capaz de desligar a rede inteira.',
  },
  {
    num: '03',
    nome: 'Zaps: o dinheiro que voa junto com a mensagem',
    icon: Zap,
    analogia: 'É como poder deixar uma moeda física na mão de quem te ajudou, na hora, sem precisar de banco, cartão ou aprovação de ninguém no meio do caminho.',
    texto: 'O Nostr tem integração nativa com a rede Lightning do Bitcoin, permitindo enviar pequenas quantias em Bitcoin direto entre usuários, na hora, com taxas baixíssimas. Um criador recebe valor direto de quem consome seu conteúdo, sem intermediário e sem risco de perder a monetização do nada.',
  },
];

const FAQ = [
  {
    q: 'O Nostr é um aplicativo, como o Twitter ou o Instagram?',
    a: 'Não exatamente. O Nostr é o protocolo por trás, o "encanamento". Os aplicativos que você baixa (Primal, Damus, Amethyst) são as "torneiras" que te dão acesso a ele. Você escolhe qual torneira prefere usar, e pode trocar quando quiser sem perder nada.',
  },
  {
    q: 'Preciso entender de tecnologia ou programação pra usar isso?',
    a: 'Não. Assim como você não precisa entender o funcionamento interno do e-mail pra mandar uma mensagem, também não precisa entender criptografia pra usar um aplicativo de Nostr no dia a dia. O nível técnico só entra em jogo se você quiser entender o que está por trás.',
  },
  {
    q: 'O que acontece se eu perder minha chave privada?',
    a: 'Você perde o acesso àquela identidade, do mesmo jeito que perder as palavras de recuperação de uma carteira Bitcoin faz perder o acesso ao saldo. Por isso, guardar essa chave com cuidado, longe de fotos de celular ou nuvem, é essencial desde o primeiro dia.',
  },
  {
    q: 'O Nostr é seguro contra golpes e notícia falsa?',
    a: 'Como em qualquer rede aberta, não existe uma autoridade central filtrando conteúdo por você. Isso significa que cada aplicativo e cada usuário constrói suas próprias ferramentas de curadoria, geralmente baseadas em quem você escolhe seguir e quais relays você escolhe usar.',
  },
  {
    q: 'Isso é só coisa de gente que mexe com Bitcoin?',
    a: 'Não. A integração com zaps atraiu bastante a comunidade Bitcoin desde o início, mas o protocolo serve pra qualquer tipo de comunicação aberta, incluindo jornalistas, criadores de conteúdo e qualquer pessoa que valorize mais liberdade digital.',
  },
  {
    q: 'Se eu trocar de aplicativo, perco meus seguidores e meu histórico?',
    a: 'Não. Essa é justamente uma das maiores vantagens do Nostr. Sua identidade não pertence a nenhum aplicativo específico, então seus seguidores e seu histórico seguem junto com sua chave pública, não importa qual cliente você use.',
  },
  {
    q: 'Alguém consegue hackear e derrubar o Nostr inteiro?',
    a: 'Não existe um único ponto central pra atacar. O conteúdo fica espalhado por milhares de relays independentes ao redor do mundo. Mesmo que vários saiam do ar, os outros seguem funcionando normalmente, sem interrupção pra quem usa a rede.',
  },
  {
    q: 'Quem criou o Nostr e quando isso aconteceu?',
    a: 'O protocolo foi lançado em novembro de 2020, por um desenvolvedor que usa o pseudônimo fiatjaf. Ganhou grande visibilidade a partir de dezembro de 2022, com apoio público e uma doação em Bitcoin de Jack Dorsey, ex-CEO do Twitter.',
  },
];

const CHECKLIST = [
  { tempo: '2 min', texto: 'Instale um cliente. Primal (Android e iPhone) é o mais simples pra quem nunca usou. Damus é a opção clássica no iPhone, Amethyst a mais completa no Android.' },
  { tempo: '3 min', texto: 'Crie o perfil. O aplicativo gera suas duas chaves na hora. Anote a chave privada (nsec) num papel físico, do mesmo jeito que você guardaria a seed de uma carteira Bitcoin.' },
  { tempo: '1 min', texto: 'Blinde a chave. Nunca digite sua nsec em site nenhum. No Android, use o Amber para assinar; no computador, use uma extensão de assinatura como nos2x.' },
  { tempo: '3 min', texto: 'Complete nome, foto e descrição. Perfil vazio no Nostr é lido como bot, e quase ninguém segue de volta.' },
  { tempo: '5 min', texto: 'Siga de 20 a 30 perfis da comunidade brasileira de Bitcoin. A timeline do Nostr é 100% quem você segue, então ela só ganha vida depois desse passo.' },
  { tempo: '2 min', texto: 'Troque de cliente uma vez, só pra sentir na prática que o perfil, os seguidores e o histórico vão junto com você.' },
  { tempo: '4 min', texto: 'Conecte uma carteira Lightning ao perfil e mande um zap pequeno pra alguém. É o teste que prova que o dinheiro roda dentro da própria rede.' },
];

const GLOSSARIO = [
  { termo: 'npub', desc: 'Sua chave pública. É o endereço que você divulga pra qualquer pessoa te encontrar e te seguir. Pode publicar à vontade.' },
  { termo: 'nsec', desc: 'Sua chave privada. É a senha mestra da sua identidade. Quem tiver ela vira você. Nunca compartilhe, nunca digite em site.' },
  { termo: 'relay', desc: 'Servidor independente que guarda e repassa suas publicações. Você usa vários ao mesmo tempo, e pode trocar quando quiser.' },
  { termo: 'zap', desc: 'Gorjeta em Bitcoin enviada pela rede Lightning direto dentro do aplicativo, sem banco e sem intermediário.' },
  { termo: 'NIP', desc: 'Padrão técnico que a comunidade adota de forma voluntária pra que apps e relays diferentes continuem se entendendo.' },
  { termo: 'cliente', desc: 'O aplicativo que você usa pra ler e publicar. Primal, Damus e Amethyst são clientes diferentes do mesmo protocolo.' },
];

const LIMITES = [
  {
    titulo: 'Relay também filtra',
    texto: 'Nenhum relay é obrigado a hospedar o que você publica. Um relay grande pode decidir não repassar seu conteúdo. A diferença é que isso não te apaga da rede: basta publicar em outros relays, ou subir o seu próprio.',
  },
  {
    titulo: 'Spam e golpe existem',
    texto: 'Rede aberta e sem cadastro significa que qualquer um cria mil identidades em minutos. Falsos sorteios e perfis clonados pedindo chave privada são comuns. Curadoria aqui é responsabilidade sua, não de um moderador.',
  },
  {
    titulo: 'Descoberta ainda é fraca',
    texto: 'Não existe algoritmo empurrando conteúdo novo pra você. Isso é bom pra atenção e ruim pro começo: sem seguir gente, sua timeline fica vazia e a sensação é de rede morta.',
  },
  {
    titulo: 'Perder a nsec é definitivo',
    texto: 'Não existe recuperar senha, não existe suporte, não existe verificação de identidade. Perdeu a chave privada, perdeu aquela identidade pra sempre, com seguidores e histórico junto.',
  },
];

const COMPARATIVO = [
  { criterio: 'Depende de uma empresa', nostr: 'Não', bluesky: 'Sim', mastodon: 'Não, mas federado' },
  { criterio: 'Identidade portátil entre apps', nostr: 'Sim, total', bluesky: 'Parcial', mastodon: 'Limitada' },
  { criterio: 'Pagamentos nativos embutidos', nostr: 'Sim, via Lightning', bluesky: 'Não', mastodon: 'Não' },
  { criterio: 'Existe um centro que sofre pressão externa', nostr: 'Não', bluesky: 'Sim', mastodon: 'Por servidor' },
];

const TOC_ITEMS = [
  { id: 'cap-01', num: '01', label: 'Torneira e encanamento' },
  { id: 'cap-02', num: '02', label: 'O problema real' },
  { id: 'cap-03', num: '03', label: 'Suas chaves' },
  { id: 'cap-04', num: '04', label: 'Os três pilares' },
  { id: 'cap-05', num: '05', label: 'As NIPs' },
  { id: 'cap-06', num: '06', label: 'Origem e comparativo' },
  { id: 'cap-07', num: '07', label: 'Limites honestos' },
  { id: 'cap-08', num: '08', label: 'Glossário' },
  { id: 'cap-09', num: '09', label: 'Primeiro passo' },
  { id: 'faq', num: '10', label: 'Dúvidas frequentes' },
];

/** Preencher com o npub oficial para ativar o bloco de perfil com copiar e QR. */
const NPUB: string | null = null;

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: '#0e3b3a' }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={heroImg} alt="Rede descentralizada de nós espalhados pelo mundo, representando a arquitetura sem centro do protocolo Nostr" className="w-full h-full object-cover scale-110"
          style={{ filter: 'saturate(1.05) contrast(1.02)' }} loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(14,59,58,0.6) 0%, rgba(30,20,50,0.4) 40%, rgba(244,237,228,0.05) 70%, #f4ede4 100%)',
        }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28"
        style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(244,237,228,0.15)', border: '1px solid rgba(244,237,228,0.25)' }}>
          <Radio size={16} style={{ color: '#f4ede4' }} />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#f4ede4' }}>
            Saída & Infraestrutura · Workshop Nostr
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}>
          O protocolo que{'\u00A0'}
          <span style={{ color: '#c4a6ff', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(139,92,246,0.45), 0 0 80px rgba(139,92,246,0.25)' }}>
            ninguém consegue desligar.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
          Em 2024, uma rede social inteira saiu do ar no Brasil por semanas, por decisão de uma única autoridade. O Nostr nasceu pra tornar isso impossível: um protocolo aberto, sem dono, sem servidor central, sem botão de desligar.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: APPLE_EASE }}
          className="mt-6 text-base md:text-lg font-semibold uppercase tracking-[0.1em]"
          style={{ color: '#c4a6ff' }}>
          Ainda hoje, em poucos minutos de leitura, você vai entender exatamente o que é o Nostr, sem economês e sem termo técnico difícil.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function NostrRedeSemCensura() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/o-que-e-nostr"
        custom={{
          title: 'O Que É Nostr? O Protocolo Sem Dono Que Nenhum Governo Desliga',
          description: 'Entenda o que é o Nostr, o protocolo aberto que nenhum governo ou empresa consegue desligar. Como funciona, por que foi criado e como começar, sem jargão.',
          canonical: 'https://lordjunnior.com.br/o-que-e-nostr',
          primaryKeyword: 'o que é Nostr',
          lsiKeywords: ['rede social sem censura', 'protocolo descentralizado', 'alternativa ao Twitter', 'nostr relays', 'zaps bitcoin', 'chave publica e privada nostr'],
          longTailKeywords: ['o que é o protocolo nostr', 'como funciona a rede social nostr', 'nostr é seguro', 'como criar perfil no nostr'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Saída & Infraestrutura', url: '/infraestrutura' },
            { name: 'O Que É Nostr', url: '/o-que-e-nostr' },
          ],
          schemaType: 'Article',
          articleSection: 'Saída & Infraestrutura',
          relatedPages: ['/infraestrutura', '/silencio-queda', '/economia-paralela', '/lightning'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — Introdução e analogia da torneira */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#8b5cf6' }}>Capítulo 01 · Fundamentos</span>
                <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                  A torneira{' '}
                  <span style={{ color: '#8b5cf6', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                    e o encanamento.
                  </span>
                </h2>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8 space-y-6">
              <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                Quando você abre a torneira de casa, a água que sai não pertence à torneira. Ela corre por um encanamento inteiro, que existe independente de qual torneira você abriu. O <strong>Nostr</strong> (sigla para "Notes and Other Stuff Transmitted by Relays") funciona assim: o "encanamento" é o protocolo em si, o conjunto de regras que carrega a informação. As "torneiras" são os aplicativos que você usa no dia a dia, como Primal, Damus ou Amethyst.
              </p>
              <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                Numa rede social comum, sua conta é a torneira. Se fecharem essa torneira, você perde tudo. No Nostr, se um aplicativo parar de funcionar, você simplesmente troca de torneira e continua com o mesmo encanamento: o mesmo histórico, os mesmos seguidores, a mesma identidade.
              </p>
              <div className="mt-8 p-6 md:p-8 rounded-2xl" style={{ backgroundColor: '#ece2d3', borderLeft: '4px solid #8b5cf6' }}>
                <p className="text-base md:text-lg leading-relaxed font-medium" style={{ color: '#0e3b3a' }}>
                  Curiosamente, em latim, "noster" também significa "nosso". Uma rede que pertence a todo mundo, não a uma empresa.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* IMAGEM full-width */}
        <motion.div {...fade(0)} className="px-6 md:px-12 lg:px-20 mb-4">
          <div className="max-w-[1600px] mx-auto rounded-3xl overflow-hidden" style={{ height: '560px' }}>
            <img src={imgRelay} alt="Malha de conexões descentralizadas representando os relays independentes que sustentam o protocolo Nostr" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </motion.div>

        {/* CAPÍTULO 2 — Os quatro problemas */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4a6ff' }}>Capítulo 02 · O Problema</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Quatro dores que você{' '}
                <span style={{ color: '#c4a6ff', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  já sentiu na pele.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {PROBLEMAS.map((p, i) => (
                <motion.div key={p.titulo} {...fade(i * 0.08)}
                  className="p-8 md:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(244,237,228,0.14)' }}>
                  <div className="p-3 rounded-xl inline-flex mb-6" style={{ backgroundColor: 'rgba(139,92,246,0.18)' }}>
                    <p.icon size={22} style={{ color: '#c4a6ff' }} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight mb-4">{p.titulo}</h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.78)' }}>{p.texto}</p>
                  <p className="text-sm md:text-base leading-relaxed italic font-light" style={{ color: '#c4a6ff', fontFamily: "'Playfair Display', serif" }}>
                    {p.analogia}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* QUEBRA VISUAL FULL-BLEED — ponta a ponta, sem container, sem cantos arredondados */}
        <motion.section {...fade(0)} className="relative w-full h-[70vh] min-h-[480px] overflow-hidden">
          <img src={imgImpacto} alt="Tela apagada representando o desligamento forçado de uma rede social inteira por decisão de uma única autoridade" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 flex items-center justify-center px-6"
            style={{ background: 'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.75) 100%)' }}>
            <p className="text-2xl md:text-4xl lg:text-5xl font-black text-center leading-[1.3] max-w-4xl"
              style={{ color: '#f4ede4' }}>
              Se a sua identidade depende da boa vontade de uma empresa,{' '}
              <span style={{ color: '#c4a6ff', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                ela nunca foi realmente sua.
              </span>
            </p>
          </div>
        </motion.section>

        {/* CAPÍTULO 3 — Chave pública e privada */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-center">
            <motion.div {...fade(0)} className="lg:col-span-6 rounded-3xl overflow-hidden order-2 lg:order-1" style={{ height: '560px' }}>
              <img src={imgChave} alt="Duas chaves criptográficas representando a chave pública e a chave privada que formam a identidade de um usuário no Nostr" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-6 order-1 lg:order-2">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#8b5cf6' }}>Capítulo 03 · Identidade</span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                A chave da sua{' '}
                <span style={{ color: '#8b5cf6', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  própria casa.
                </span>
              </h2>
              <p className="text-lg leading-relaxed font-light mb-5" style={{ color: '#2d3a37' }}>
                No centro do Nostr está uma ideia simples: você é dono das suas próprias chaves e, por consequência, da sua identidade e do seu conteúdo. Em vez de login e senha controlados por uma empresa, sua identidade nasce de duas chaves.
              </p>
              <p className="text-lg leading-relaxed font-light mb-5" style={{ color: '#2d3a37' }}>
                A <strong>chave pública</strong> funciona como o número da sua caixa de correio: todo mundo pode ver e te enviar coisas nela. Já a <strong>chave privada</strong> é a chave física que só você tem, e que abre essa caixa. Sem ela, ninguém mais mexe no que é seu, nem mesmo os criadores do Nostr.
              </p>
              <div className="mt-6 p-5 rounded-xl flex items-start gap-4" style={{ backgroundColor: '#ece2d3' }}>
                <KeyIcon size={22} className="shrink-0 mt-1" style={{ color: '#8b5cf6' }} />
                <p className="text-base leading-relaxed font-medium" style={{ color: '#0e3b3a' }}>
                  Como sua identidade não pertence a nenhum app, você troca de aplicativo e continua com o mesmo perfil, seguidores e histórico.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Os três pilares */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#7c3aed' }}>Capítulo 04 · Arquitetura</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Os três pilares{' '}
                <span style={{ color: '#7c3aed', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  que sustentam tudo.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              {PILARES.map((p, i) => (
                <motion.div key={p.num} {...fade(i * 0.08)}
                  className="grid md:grid-cols-12 gap-6 md:gap-10 p-8 md:p-10 rounded-2xl bg-white/60"
                  style={{ border: '1px solid #d4c5ad' }}>
                  <div className="md:col-span-1">
                    <span className="text-4xl font-black" style={{ color: '#8b5cf6' }}>{p.num}</span>
                  </div>
                  <div className="md:col-span-4">
                    <p.icon size={26} className="mb-3" style={{ color: '#0e3b3a' }} />
                    <h3 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: '#0e3b3a' }}>{p.nome}</h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-base md:text-lg leading-relaxed font-light mb-3" style={{ color: '#2d3a37' }}>{p.texto}</p>
                    <p className="text-sm md:text-base italic leading-relaxed" style={{ color: '#7c3aed', fontFamily: "'Playfair Display', serif" }}>{p.analogia}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGEM zaps full-width */}
        <motion.div {...fade(0)} className="px-6 md:px-12 lg:px-20 my-4">
          <div className="max-w-[1600px] mx-auto rounded-3xl overflow-hidden relative" style={{ height: '560px' }}>
            <img src={imgZap} alt="Rede Lightning do Bitcoin representando os zaps, as gorjetas instantâneas em Bitcoin nativas do Nostr" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 flex items-end p-8 md:p-12" style={{ background: 'linear-gradient(0deg, rgba(14,59,58,0.75) 0%, transparent 50%)' }}>
              <p className="text-xl md:text-2xl font-light italic max-w-xl" style={{ color: '#f4ede4', fontFamily: "'Playfair Display', serif" }}>
                Dinheiro que voa junto com a mensagem, sem banco, sem cartão, sem intermediário.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CAPÍTULO 5 — As NIPs (regras de trânsito) */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#8b5cf6' }}>Capítulo 05 · As Regras</span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                As regras de trânsito{' '}
                <span style={{ color: '#8b5cf6', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  da cidade Nostr.
                </span>
              </h2>
              <p className="text-lg leading-relaxed font-light mb-5" style={{ color: '#2d3a37' }}>
                Existe um quarto elemento que garante que apps e servidores diferentes se entendam: as <strong>NIPs</strong>, sigla para "Nostr Implementation Possibilities" (possibilidades de implementação do Nostr).
              </p>
              <p className="text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                Pensa nas NIPs como as regras de trânsito de uma cidade. Não existe uma polícia única obrigando todo mundo a segui-las, mas quando todo mundo concorda em parar no vermelho e seguir no verde, o trânsito flui bem. Cada NIP documenta um padrão que a comunidade adota de forma voluntária, garantindo que um app criado no Japão converse perfeitamente com um relay no Brasil.
              </p>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-6 rounded-3xl overflow-hidden" style={{ height: '520px' }}>
              <img src={imgLivro} alt="Registro público e auditável representando as NIPs, os padrões abertos que qualquer pessoa pode conferir no Nostr" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Origem e comparativo */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1200px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4a6ff' }}>Capítulo 06 · Contexto</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                De onde veio{' '}
                <span style={{ color: '#c4a6ff', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  essa ideia.
                </span>
              </h2>
            </motion.div>
            <p className="text-lg md:text-xl leading-relaxed font-light mb-6" style={{ color: 'rgba(244,237,228,0.85)' }}>
              O protocolo foi lançado em novembro de 2020 por um desenvolvedor que usa o pseudônimo <strong>fiatjaf</strong>, que já trabalhava com projetos ligados à rede Lightning do Bitcoin. A ideia nasceu da frustração de ver contas banidas em redes tradicionais sem conseguir migrar levando seguidores e identidade junto.
            </p>
            <p className="text-lg md:text-xl leading-relaxed font-light mb-14" style={{ color: 'rgba(244,237,228,0.85)' }}>
              O grande salto de visibilidade veio em dezembro de 2022, quando Jack Dorsey, ex-CEO do Twitter, doou o equivalente a cerca de 14 Bitcoin (na época, por volta de 250 mil dólares) pro desenvolvimento do protocolo. Isso atraiu desenvolvedores, jornalistas independentes e a própria comunidade Bitcoin, que reconheceu ali uma extensão natural dos mesmos valores de descentralização.
            </p>

            <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(244,237,228,0.14)' }}>
              <table className="w-full text-left">
                <thead>
                  <tr style={{ backgroundColor: 'rgba(244,237,228,0.06)' }}>
                    <th className="p-4 md:p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#c4a6ff' }}>Característica</th>
                    <th className="p-4 md:p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#c4a6ff' }}>Nostr</th>
                    <th className="p-4 md:p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#c4a6ff' }}>Bluesky</th>
                    <th className="p-4 md:p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#c4a6ff' }}>Mastodon</th>
                  </tr>
                </thead>
                <tbody className="text-base md:text-lg font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                  <tr style={{ borderTop: '1px solid rgba(244,237,228,0.1)' }}>
                    <td className="p-4 md:p-5">Depende de uma empresa</td>
                    <td className="p-4 md:p-5 font-semibold" style={{ color: '#c4a6ff' }}>Não</td>
                    <td className="p-4 md:p-5">Sim</td>
                    <td className="p-4 md:p-5">Não, mas federado</td>
                  </tr>
                  <tr style={{ borderTop: '1px solid rgba(244,237,228,0.1)' }}>
                    <td className="p-4 md:p-5">Identidade portátil entre apps</td>
                    <td className="p-4 md:p-5 font-semibold" style={{ color: '#c4a6ff' }}>Sim, total</td>
                    <td className="p-4 md:p-5">Parcial</td>
                    <td className="p-4 md:p-5">Limitada</td>
                  </tr>
                  <tr style={{ borderTop: '1px solid rgba(244,237,228,0.1)' }}>
                    <td className="p-4 md:p-5">Pagamentos nativos embutidos</td>
                    <td className="p-4 md:p-5 font-semibold" style={{ color: '#c4a6ff' }}>Sim, via Lightning</td>
                    <td className="p-4 md:p-5">Não</td>
                    <td className="p-4 md:p-5">Não</td>
                  </tr>
                  <tr style={{ borderTop: '1px solid rgba(244,237,228,0.1)' }}>
                    <td className="p-4 md:p-5">Existe um centro que sofre pressão externa</td>
                    <td className="p-4 md:p-5 font-semibold" style={{ color: '#c4a6ff' }}>Não</td>
                    <td className="p-4 md:p-5">Sim</td>
                    <td className="p-4 md:p-5">Por servidor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Checklist */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1200px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#7c3aed' }}>Capítulo 07 · Prática</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Como dar o primeiro{' '}
                <span style={{ color: '#7c3aed', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  passo hoje.
                </span>
              </h2>
            </motion.div>

            <ol className="space-y-4">
              {CHECKLIST.map((item, i) => (
                <motion.li key={i} {...fade(i * 0.04)}
                  className="flex items-start gap-6 p-6 md:p-7 rounded-2xl transition-all duration-500 hover:translate-x-2"
                  style={{ backgroundColor: '#ece2d3' }}>
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl font-black"
                    style={{ backgroundColor: '#8b5cf6', color: '#f4ede4' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-lg md:text-xl leading-relaxed font-light pt-1.5" style={{ color: '#2d3a37' }}>{item}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#7c3aed' }}>Dúvidas frequentes</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Perguntas que todo mundo{' '}
                <span style={{ color: '#7c3aed', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  faz sobre o Nostr.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((item, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)}
                    className="rounded-2xl overflow-hidden transition-all"
                    style={{ backgroundColor: open ? '#fff' : '#f4ede4', border: `1px solid ${open ? '#8b5cf6' : '#d4c5ad'}` }}>
                    <button onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-6"
                      aria-expanded={open}>
                      <span className="text-lg md:text-2xl font-semibold leading-snug pr-4" style={{ color: '#0e3b3a' }}>{item.q}</span>
                      <ChevronDown size={26} className="shrink-0 mt-1 transition-transform duration-500"
                        style={{ color: '#8b5cf6', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.4, ease: APPLE_EASE }} className="overflow-hidden">
                        <div className="px-6 md:px-8 pb-8 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA FECHAMENTO */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a' }}>
          <motion.div {...fade(0)} className="max-w-3xl mx-auto text-center">
            <ShieldOff size={40} className="mx-auto mb-8" style={{ color: '#c4a6ff' }} />
            <p className="text-2xl md:text-4xl leading-[1.4] font-light mb-12"
              style={{ color: '#f4ede4', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
              [Espaço reservado para sua frase de impacto de fechamento, no seu estilo autoral]
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/infraestrutura"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: '#8b5cf6', color: '#f4ede4' }}>
                Ver Infraestrutura Autônoma <ArrowRight size={18} />
              </Link>
              <Link to="/lightning"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: 'transparent', color: '#f4ede4', border: '2px solid #f4ede4' }}>
                Entender a Lightning Network
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Continue sua trilha */}
        <section className="px-6 md:px-12 lg:px-20 pb-28 pt-24" style={{ backgroundColor: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-10">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#7c3aed' }}>Continue sua trilha</span>
              <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Próximos passos da soberania digital
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { to: '/infraestrutura', icon: Network, titulo: 'Infraestrutura Autônoma', desc: 'Sistemas paralelos que continuam de pé mesmo quando a estrutura central falha.' },
                { to: '/silencio-queda', icon: ShieldOff, titulo: 'Silêncio e Queda', desc: 'O que fazer quando a comunicação oficial para de funcionar.' },
                { to: '/lightning', icon: Zap, titulo: 'Lightning Network', desc: 'A camada de pagamentos instantâneos que também move os zaps do Nostr.' },
              ].map((card, i) => (
                <motion.div key={card.to} {...fade(i * 0.08)}>
                  <Link to={card.to}
                    className="block p-8 rounded-2xl h-full transition-transform hover:-translate-y-1"
                    style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
                    <card.icon size={28} style={{ color: '#c4a6ff' }} className="mb-5" />
                    <h3 className="text-xl md:text-2xl font-black mb-3 leading-tight">{card.titulo}</h3>
                    <p className="text-base font-light leading-relaxed mb-5" style={{ color: 'rgba(244,237,228,0.78)' }}>{card.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#c4a6ff' }}>Acessar <ArrowRight size={14} /></span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
