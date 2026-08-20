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
    analogia: 'É como escolher o aparelho de rádio: trocar de aparelho não muda a estação que está no ar, só muda o som que chega na sua sala.',
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
  { tempo: '1 min', texto: 'Blinde a chave. Nunca digite sua nsec em site nenhum. No Android, use o Amber para assinar. No computador, use uma extensão de assinatura como o nos2x.' },
  { tempo: '3 min', texto: 'Complete nome, foto e descrição. Perfil vazio no Nostr é lido como robô, e quase ninguém segue de volta.' },
  { tempo: '5 min', texto: 'Siga de 20 a 30 perfis da comunidade brasileira de Bitcoin. A timeline do Nostr é 100% quem você segue, então ela só ganha vida depois desse passo.' },
  { tempo: '2 min', texto: 'Troque de cliente uma vez, só pra sentir na prática que perfil, seguidores e histórico vão junto com você.' },
  { tempo: '4 min', texto: 'Conecte uma carteira Lightning ao perfil e mande um zap pequeno pra alguém. É o teste que prova que o dinheiro roda dentro da própria rede.' },
];

const GLOSSARIO = [
  { termo: 'npub', desc: 'Sua chave pública. É o endereço que você divulga pra qualquer pessoa te encontrar e te seguir. Pode publicar à vontade.' },
  { termo: 'nsec', desc: 'Sua chave privada. É a senha mestra da sua identidade. Quem tiver ela vira você. Nunca compartilhe, nunca digite em site.' },
  { termo: 'relay', desc: 'Servidor independente que guarda e repassa suas publicações. Você usa vários ao mesmo tempo e pode trocar quando quiser.' },
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
    texto: 'Rede aberta e sem cadastro significa que qualquer um cria mil identidades em minutos. Falso sorteio e perfil clonado pedindo chave privada são comuns. A curadoria aqui é responsabilidade sua, não de um moderador.',
  },
  {
    titulo: 'Descoberta ainda é fraca',
    texto: 'Não existe algoritmo empurrando conteúdo novo pra você. Isso é ótimo pra sua atenção e ruim no começo: sem seguir gente, a timeline fica vazia e a sensação é de rede morta.',
  },
  {
    titulo: 'Perder a nsec é definitivo',
    texto: 'Não existe recuperar senha, não existe suporte, não existe verificação de identidade. Perdeu a chave privada, perdeu aquela identidade para sempre, com seguidores e histórico junto.',
  },
];

const COMPARATIVO = [
  { criterio: 'Depende de uma empresa', nostr: 'Não', bluesky: 'Sim', mastodon: 'Não, mas é federado' },
  { criterio: 'Identidade portátil entre apps', nostr: 'Sim, total', bluesky: 'Parcial', mastodon: 'Limitada' },
  { criterio: 'Pagamento nativo embutido', nostr: 'Sim, via Lightning', bluesky: 'Não', mastodon: 'Não' },
  { criterio: 'Existe um centro que sofre pressão', nostr: 'Não', bluesky: 'Sim', mastodon: 'Por servidor' },
];

const TOC_ITEMS = [
  { id: 'cap-01', num: '01', label: 'Torneira e encanamento' },
  { id: 'cap-02', num: '02', label: 'O problema real' },
  { id: 'cap-03', num: '03', label: 'Suas duas chaves' },
  { id: 'cap-04', num: '04', label: 'Os três pilares' },
  { id: 'cap-05', num: '05', label: 'As NIPs' },
  { id: 'cap-06', num: '06', label: 'Origem e comparativo' },
  { id: 'perfil', num: '07', label: 'Meu perfil no Nostr' },
  { id: 'cap-08', num: '08', label: 'Limites honestos' },
  { id: 'cap-09', num: '09', label: 'Glossário' },
  { id: 'cap-10', num: '10', label: 'Primeiro passo hoje' },
  { id: 'faq', num: '11', label: 'Dúvidas frequentes' },
];

const NPUB = 'npub196keateffz8t0ph058nph2zutgtpkvl2y2ntzqapzcwxmtd9wm4stmm0yh';
const NIP05 = 'lordjunnior@lordjunnior.com.br';

function PerfilNostr() {
  const [copiado, setCopiado] = useState<'npub' | 'nip05' | null>(null);

  const copiar = (valor: string, tipo: 'npub' | 'nip05') => {
    navigator.clipboard.writeText(valor);
    setCopiado(tipo);
    setTimeout(() => setCopiado(null), 2000);
  };

  const linhas = [
    { rotulo: 'Chave pública (npub)', valor: NPUB, tipo: 'npub' as const },
    { rotulo: 'Endereço verificado (NIP-05)', valor: NIP05, tipo: 'nip05' as const },
  ];

  return (
    <section id="perfil" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-24" style={{ backgroundColor: '#ece2d3' }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fade(0)} className="p-8 md:p-14 rounded-3xl" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4a6ff' }}>Me siga na rede</span>
          <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05] tracking-tight">
            Já estou lá dentro.{' '}
            <span style={{ color: '#c4a6ff', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
              Seu primeiro seguir pode ser este.
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl font-light leading-relaxed" style={{ color: 'rgba(244,237,228,0.82)' }}>
            Copie o endereço abaixo, cole na busca do seu cliente e me siga. É a forma mais rápida de sair da timeline vazia e já começar acompanhando conteúdo de soberania.
          </p>

          <div className="mt-10 space-y-4">
            {linhas.map((linha) => (
              <div key={linha.tipo} className="p-5 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
                style={{ backgroundColor: 'rgba(244,237,228,0.07)', border: '1px solid rgba(244,237,228,0.16)' }}>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.22em] mb-2" style={{ color: 'rgba(244,237,228,0.6)' }}>
                    {linha.rotulo}
                  </span>
                  <code className="block text-sm md:text-base font-mono break-all">{linha.valor}</code>
                </div>
                <button type="button" onClick={() => copiar(linha.valor, linha.tipo)}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-[0.16em] transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: '#8b5cf6', color: '#f4ede4' }}>
                  {copiado === linha.tipo ? <Check size={16} /> : <Copy size={16} />}
                  {copiado === linha.tipo ? 'Copiado' : 'Copiar'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`https://primal.net/p/${NPUB}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[0.16em] transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: '#f4ede4', color: '#0e3b3a' }}>
              Abrir meu perfil no Primal <ExternalLink size={16} />
            </a>
            <a href={`https://njump.me/${NPUB}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[0.16em] transition-transform hover:scale-[1.02]"
              style={{ border: '2px solid rgba(244,237,228,0.5)', color: '#f4ede4' }}>
              Ver sem instalar nada <ArrowRight size={16} />
            </a>
          </div>

          <p className="mt-8 text-sm font-light leading-relaxed" style={{ color: 'rgba(244,237,228,0.6)' }}>
            O NIP-05 é só uma verificação de nome ligada ao domínio, não é login e não dá acesso a nada. Sua chave privada continua sendo exclusivamente sua.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: '#1a1025' }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src="/nostr-hero.png" alt="Mascote Nostr, um avestruz roxo em retrato cinematográfico contra fundo escuro, representando o protocolo descentralizado que ninguém consegue desligar" className="w-full h-full object-cover"
          style={{ filter: 'saturate(1.05) contrast(1.02)', objectPosition: '62% center' }} loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(90deg, rgba(26,16,37,0.96) 0%, rgba(26,16,37,0.78) 30%, rgba(26,16,37,0.42) 48%, rgba(26,16,37,0.12) 56%, transparent 64%),
            linear-gradient(180deg, transparent 0%, transparent 75%, rgba(26,16,37,0.45) 90%, #f4ede4 100%)
          `,
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
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[18ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4', textShadow: '0 4px 30px rgba(26,16,37,0.9), 0 2px 12px rgba(0,0,0,0.5)' }}>
          O protocolo que{'\u00A0'}
          <span style={{ color: '#c4a6ff', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(139,92,246,0.45), 0 0 80px rgba(139,92,246,0.25)' }}>
            ninguém consegue desligar.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.92)', fontFamily: "'Inter Tight', sans-serif", textShadow: '0 3px 24px rgba(26,16,37,0.85)' }}>
          Em 2024, uma rede social inteira saiu do ar no Brasil por semanas, por decisão de uma única autoridade. O Nostr nasceu pra tornar isso impossível: um protocolo aberto, sem dono, sem servidor central, sem botão de desligar.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: APPLE_EASE }}
          className="mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed"
          style={{ color: '#f4ede4', textShadow: '0 2px 16px rgba(26,16,37,0.7)' }}>
          Em poucos minutos de leitura você entende exatamente o que é o Nostr, sem economês e sem termo técnico difícil.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: APPLE_EASE }}
          className="mt-8 flex flex-wrap gap-3">
          {[
            { k: '2020', v: 'ano de lançamento' },
            { k: 'Milhares', v: 'de relays independentes' },
            { k: 'Zero', v: 'donos e botões de desligar' },
          ].map((s) => (
            <div key={s.k} className="px-5 py-3 rounded-2xl backdrop-blur-md"
              style={{ backgroundColor: 'rgba(26,16,37,0.55)', border: '1px solid rgba(244,237,228,0.18)' }}>
              <span className="block text-lg md:text-xl font-black" style={{ color: '#f4ede4' }}>{s.k}</span>
              <span className="block text-[11px] uppercase tracking-[0.18em]" style={{ color: 'rgba(244,237,228,0.75)' }}>{s.v}</span>
            </div>
          ))}
        </motion.div>
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
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Como começar no Nostr em 7 passos',
          description: 'Guia passo a passo para criar perfil, proteger a chave privada e enviar o primeiro zap na rede Nostr.',
          url: 'https://lordjunnior.com.br/o-que-e-nostr',
          author: { '@type': 'Person', name: 'Lord Junnior' },
          inLanguage: 'pt-BR',
          step: CHECKLIST.map((item, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: `Passo ${i + 1}`,
            text: `${item.texto} (tempo estimado: ${item.tempo})`,
          })),
        })}
      </script>

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        <PageFloatingToc items={TOC_ITEMS} accentColor="stone" />

        <div className="px-6 md:px-12 lg:px-20 pt-10">
          <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-6 pb-8"
            style={{ borderBottom: '1px solid #d4c5ad' }}>
            <div style={{ color: '#0e3b3a' }}>
              <ReadingTime minutes={12} />
            </div>
            <ShareButtons title="O que é Nostr? O protocolo que ninguém consegue desligar" />
          </div>
        </div>

        {/* CAPÍTULO 1 — Introdução e analogia da torneira */}
        <section id="cap-01" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36 scroll-mt-24">
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
                <span className="block text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: '#7c3aed' }}>Nota lateral</span>
                <p className="text-base md:text-lg leading-relaxed font-medium" style={{ color: '#0e3b3a' }}>
                  Em latim, "noster" significa "nosso". Uma rede que pertence a todo mundo, não a uma empresa.
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
        <section id="cap-02" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 scroll-mt-24" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4a6ff' }}>Capítulo 02 · O Problema</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Uma rede inteira sumiu do ar{' '}
                <span style={{ color: '#c4a6ff', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  por decisão de uma pessoa.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-relaxed" style={{ color: 'rgba(244,237,228,0.8)' }}>
                Em 2024 foram cerca de 40 dias de bloqueio de uma rede social inteira no Brasil, com dezenas de milhões de contas silenciadas de uma vez. Ninguém precisou invadir servidor, bastou uma ordem. Antes disso, e depois dela, quatro dores continuam se repetindo em toda rede social que tem dono.
              </p>
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
        <section id="cap-03" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36 scroll-mt-24">
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

              <div className="mt-5 p-6 rounded-xl" style={{ backgroundColor: '#fff4ec', border: '1px solid #e8a36b' }}>
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle size={20} style={{ color: '#c4632a' }} />
                  <span className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: '#c4632a' }}>Blindagem da chave privada</span>
                </div>
                <ul className="space-y-2 text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  <li>Nunca digite sua nsec em site, formulário, sorteio ou suporte. Nenhum serviço legítimo pede isso.</li>
                  <li>Anote em papel físico, longe de foto de celular, print e nuvem.</li>
                  <li>No Android, assine pelo Amber. No computador, use uma extensão como o nos2x, para o app nunca ver sua chave.</li>
                  <li>Não existe recuperar senha. Vazou a nsec, a identidade passa a ser de quem tiver ela.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Os três pilares */}
        <section id="cap-04" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 scroll-mt-24" style={{ backgroundColor: '#ece2d3' }}>
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
        <section id="cap-05" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36 scroll-mt-24">
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
        <section id="cap-06" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 scroll-mt-24" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
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

            <div className="md:hidden space-y-4">
              {COMPARATIVO.map((c) => (
                <div key={c.criterio} className="p-6 rounded-2xl"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(244,237,228,0.14)' }}>
                  <p className="text-base font-bold mb-4">{c.criterio}</p>
                  <div className="space-y-2 text-base font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                    <p className="flex justify-between gap-4"><span>Nostr</span><span className="font-semibold" style={{ color: '#c4a6ff' }}>{c.nostr}</span></p>
                    <p className="flex justify-between gap-4"><span>Bluesky</span><span>{c.bluesky}</span></p>
                    <p className="flex justify-between gap-4"><span>Mastodon</span><span>{c.mastodon}</span></p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(244,237,228,0.14)' }}>
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

        <PerfilNostr />

        {/* Captura de lead */}
        <section className="px-6 md:px-12 lg:px-20 py-20" style={{ backgroundColor: '#f4ede4' }}>
          <div className="max-w-[1100px] mx-auto">
            <InlineLeadCapture
              heading="Quer o próximo material sobre redes que não podem ser desligadas?"
              subtext="Entre na lista de transmissão. Sem spam, sem algoritmo, direto na sua caixa."
              interesse="nostr"
            />
          </div>
        </section>

        {/* CAPÍTULO 8 — Limites honestos */}
        <section id="cap-08" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 scroll-mt-24" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 08 · Limites</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                O que ninguém te conta{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  antes de você entrar.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-relaxed" style={{ color: '#2d3a37' }}>
                Rede sem dono não significa rede sem problema. Entrar sabendo disso é a diferença entre continuar usando e desistir na primeira semana.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {LIMITES.map((l, i) => (
                <motion.div key={l.titulo} {...fade(i * 0.08)} className="p-8 rounded-2xl bg-white/70"
                  style={{ border: '1px solid #e8a36b' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle size={20} style={{ color: '#c4632a' }} />
                    <h3 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: '#0e3b3a' }}>{l.titulo}</h3>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{l.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 9 — Glossário */}
        <section id="cap-09" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 scroll-mt-24">
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#7c3aed' }}>Capítulo 09 · Vocabulário</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Seis palavras e você{' '}
                <span style={{ color: '#7c3aed', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  fala a língua da rede.
                </span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GLOSSARIO.map((g, i) => (
                <motion.div key={g.termo} {...fade(i * 0.05)} className="p-7 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen size={18} style={{ color: '#8b5cf6' }} />
                    <h3 className="text-xl font-black" style={{ color: '#0e3b3a' }}>{g.termo}</h3>
                  </div>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{g.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 10 — Checklist */}
        <section id="cap-10" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 scroll-mt-24" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1200px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#7c3aed' }}>Capítulo 10 · Prática</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Como dar o primeiro{' '}
                <span style={{ color: '#7c3aed', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  passo hoje.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-relaxed" style={{ color: '#2d3a37' }}>
                Sete etapas, cerca de 20 minutos no total. No fim você tem identidade própria, chave protegida e o primeiro zap enviado.
              </p>
            </motion.div>

            <ol className="space-y-4">
              {CHECKLIST.map((item, i) => (
                <motion.li key={i} {...fade(i * 0.04)}
                  className="flex items-start gap-6 p-6 md:p-7 rounded-2xl transition-all duration-500 hover:translate-x-2"
                  style={{ backgroundColor: '#faf6f0' }}>
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl font-black"
                    style={{ backgroundColor: '#8b5cf6', color: '#f4ede4' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="pt-1">
                    <span className="inline-block mb-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.18em]"
                      style={{ backgroundColor: 'rgba(139,92,246,0.14)', color: '#7c3aed' }}>{item.tempo}</span>
                    <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: '#2d3a37' }}>{item.texto}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 scroll-mt-24" style={{ backgroundColor: '#f4ede4' }}>
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
              A soberania digital não começa quando você compra Bitcoin. Começa quando você para de depender de plataformas que podem ser desligadas.
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
