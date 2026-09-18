import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Smartphone, ShieldCheck, AlertTriangle, Wrench, ArrowRight,
  ChevronDown, CheckCircle2, XCircle, Cpu, Radio, Fingerprint,
  Eye, Lock, RefreshCw, HardDrive, Cable,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/seguranca-mobile/calyxos-hero.webp';
import logoCalyx from '@/assets/seguranca-mobile/calyxos-logo.png';
import imgBancada from '@/assets/seguranca-mobile/calyxos-bancada.webp';
import imgInterface from '@/assets/seguranca-mobile/calyxos-interface.webp';
import imgInstalacao from '@/assets/seguranca-mobile/calyxos-instalacao.webp';
import imgPixels from '@/assets/seguranca-mobile/calyxos-pixels.webp';
import imgAmeacas from '@/assets/seguranca-mobile/calyxos-ameacas.webp';
import imgTroubleshoot from '@/assets/seguranca-mobile/calyxos-troubleshoot.webp';

/**
 * /seguranca-mobile/calyxos - Página pillar do CalyxOS.
 * Padrão editorial claro: Sand + Teal profundo + Cobre.
 * Copy baseada na experiência real de 11 anos de bancada do autor.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const AMEACAS = [
  {
    icon: Eye,
    titulo: 'Telemetria de fabricante e operadora',
    detalhe: 'Todo Android de fábrica envia dados para o Google o tempo inteiro: localização, apps abertos, tempo de tela e, em alguns casos, padrão de digitação. O CalyxOS elimina essa camada inteira. Sem Google Play Services rodando nativamente, sem telemetria de Samsung, Xiaomi ou Motorola embutida na ROM.',
  },
  {
    icon: Fingerprint,
    titulo: 'Rastreamento publicitário entre apps',
    detalhe: 'Aquele fenômeno de "falei sobre um produto e o anúncio apareceu" não é o microfone te escutando. É o cruzamento de dados entre apps via identificadores de publicidade. O CalyxOS randomiza e limita esses identificadores de um jeito que o Android padrão nem oferece como opção.',
  },
  {
    icon: Lock,
    titulo: 'Exploração via apps maliciosos',
    detalhe: 'O isolamento de processos é mais rígido. Um app instalado não tem o mesmo nível de acesso padrão que teria num Android comum. Cada permissão é questionada, cada exceção fica registrada e auditável.',
  },
  {
    icon: Cpu,
    titulo: 'Backdoors de fabricante',
    detalhe: 'Fabricantes chineses e até americanos já foram flagrados com software pré-instalado enviando dados sem consentimento. Rodar CalyxOS elimina essa camada de bloatware inteira: você sabe exatamente o que está instalado, porque foi você ou o próprio Calyx que colocou ali.',
  },
];

const NAO_RESOLVE = [
  {
    titulo: 'Vigilância de operadora via torre celular',
    detalhe: 'IMSI catcher captura seu aparelho independente do sistema operacional. Isso é problema de rede, não de software. O CalyxOS protege o que está no aparelho, não o que está no ar.',
  },
  {
    titulo: 'Metadados de comunicação tradicional',
    detalhe: 'Se você continuar usando SMS e chamada de voz comum, sua operadora segue vendo com quem, quando e por quanto tempo você falou. A solução está em apps com criptografia ponta a ponta, tema do nosso guia de comunicação segura.',
  },
];

const PERFIS = [
  'Você trabalha com informação sensível: jornalismo, advocacia, ativismo, ou lida com dado de cliente que não pode vazar.',
  'Você já tentou um sistema mais radical e sentiu falta de compatibilidade: apps bancários travando, loja de apps fazendo falta, fricção no dia a dia.',
  'Você quer dar o primeiro passo real fora do ecossistema Google sem comprar briga com o próprio celular.',
  'Você entende que modo anônimo e conta secundária são band-aid, e quer resolver isso na raiz do sistema.',
  'Você é do tipo que confere o que instala, e quer um sistema que entrega esse controle de verdade.',
];

const TRADEOFFS = [
  {
    titulo: 'Play Store nativa? Não.',
    detalhe: 'Você usa o F-Droid como loja principal e pode adicionar a Play Store em modo isolado via microG. Funciona para a maioria dos apps, mas alguns com proteção antifraude mais agressiva podem reclamar ou recusar rodar.',
  },
  {
    titulo: 'Apps bancários são a zona de atrito real',
    detalhe: 'Alguns funcionam sem problema. Outros detectam ambiente não confiável via Play Integrity e travam. Isso muda de banco para banco e de versão para versão. Não dá para garantir 100% de compatibilidade, e é o principal motivo de desistência no meio do caminho.',
  },
  {
    titulo: 'Garantia do aparelho',
    detalhe: 'Destravar o bootloader pode afetar a garantia do fabricante na maioria dos casos. Se seu Pixel ainda está na garantia e você depende dela, pese essa decisão com calma.',
  },
  {
    titulo: 'Curva de aprendizado',
    detalhe: 'Não é plug and play. Você vai mexer em configurações que o usuário médio nunca viu. Não é difícil, mas exige atenção. É exatamente aqui que entra a parte técnica escrita com a cabeça de quem passou 11 anos resolvendo isso em bancada.',
  },
];

const MODELOS = [
  { modelo: 'Pixel 9 / 9 Pro / 9 Pro XL', status: 'ativo', obs: 'Melhor opção atual. Janela de atualização mais longa pela frente.' },
  { modelo: 'Pixel 8 / 8 Pro / 8a', status: 'ativo', obs: 'Ótimo custo-benefício, preço acessível no mercado de usados.' },
  { modelo: 'Pixel 7 / 7 Pro / 7a', status: 'ativo', obs: 'Boa porta de entrada. Mercado de usados maduro no Brasil.' },
  { modelo: 'Pixel 6 / 6 Pro / 6a', status: 'atencao', obs: 'Fim de vida se aproximando. Confira a data de fim de suporte antes de comprar usado.' },
  { modelo: 'Pixel 5 e anteriores', status: 'morto', obs: 'Fora de suporte. Sem atualização de segurança, não faz sentido instalar.' },
  { modelo: 'Aparelhos não-Pixel', status: 'atencao', obs: 'Suporte limitado ou comunitário. Terreno experimental, não recomendo para quem está começando.' },
];

const CHECKLIST_COMPAT = [
  {
    pergunta: 'É um Pixel?',
    detalhe: 'O CalyxOS roda com suporte completo apenas na linha Pixel. Fora disso você está em suporte comunitário, sem garantia de atualização contínua.',
  },
  {
    pergunta: 'O bootloader pode ser desbloqueado?',
    detalhe: 'Este é o filtro que mais elimina aparelhos no Brasil. Modelos importados de operadora americana, principalmente versões Verizon, vêm com bootloader bloqueado permanentemente e não aceitam desbloqueio. Antes de comprar um usado, ligue o aparelho, ative as opções de desenvolvedor e confira se a opção Desbloqueio OEM está disponível. Se estiver cinza ou ausente, o aparelho não serve.',
  },
  {
    pergunta: 'Qual a geração do Pixel?',
    detalhe: 'Isso define não só se instala, mas por quanto tempo você vai receber atualização de segurança. Rodar sistema sem patch de segurança anula boa parte do propósito.',
  },
  {
    pergunta: 'Você tem um computador e um cabo USB confiável?',
    detalhe: 'Depois de 11 anos vendo gente tentar instalar ROM com cabo ruim ou porta USB com contato intermitente, aprendi a não presumir nada. Um cabo USB com par de dados completo evita a maioria dos erros de flash mais comuns.',
  },
];

const PASSOS = [
  {
    titulo: 'Backup completo, antes de tudo',
    detalhe: 'Esse processo apaga tudo do aparelho. Fotos, contatos, conversas, autenticadores. Guarde o que importa em pelo menos dois lugares diferentes. Regra de bancada inegociável: nunca comece sem backup. Já vi gente perder anos de fotos por pular esta etapa achando que dessa vez ia dar certo sem precisar.',
  },
  {
    titulo: 'Habilite as opções de desenvolvedor',
    detalhe: 'Configurações, Sobre o telefone, toque sete vezes em Número da versão. Depois entre em Opções do desenvolvedor e ligue Desbloqueio OEM e Depuração USB. Se o Desbloqueio OEM estiver indisponível, o aparelho está preso à operadora e não serve para esse processo.',
  },
  {
    titulo: 'Use o instalador web oficial do Calyx Institute',
    detalhe: 'O instalador roda direto do navegador, Chrome ou qualquer base Chromium, e guia o desbloqueio do bootloader e o flash do sistema em sequência. Isso eliminou a maior parte dos erros humanos que eu via quando tudo era feito em linha de comando manual. Baixe apenas do site oficial do Calyx Institute. Imagem de fonte alternativa pode estar adulterada, o que anula o propósito inteiro do processo.',
  },
  {
    titulo: 'Deixe o processo rodar sem interromper',
    detalhe: 'Aqui é onde mais gente erra por ansiedade: desconecta o cabo no meio ou mexe no aparelho achando que travou. Regra de bancada: se a tela não mudou em dois ou três minutos mas o processo ainda indica atividade, espere. Só considere travamento depois de dez minutos sem nenhuma mudança visível.',
  },
  {
    titulo: 'Primeira configuração',
    detalhe: 'Após o flash, o aparelho reinicia no CalyxOS. A configuração inicial pergunta se você quer instalar o microG, que é a camada de compatibilidade com apps que dependem dos serviços do Google. Recomendo ativar. Configure o F-Droid como loja principal.',
  },
  {
    titulo: 'Verifique a integridade da instalação',
    detalhe: 'Depois de tudo instalado, confira a versão de build nas configurações do sistema e compare com o que está publicado no site oficial. Isso confirma que você não baixou uma imagem corrompida ou adulterada.',
  },
];

const PROBLEMAS = [
  {
    icon: Cable,
    titulo: 'O computador não reconhece o celular',
    detalhe: 'Antes de suspeitar de driver ou sistema, troque o cabo. Sério. Cabo USB-C que serve só para carregar, sem par de dados completo, é a causa mais comum e mais ignorada desse erro. Segundo suspeito: porta USB 3.0 com conflito. Tente uma porta USB 2.0 direta na placa-mãe, sem hub no meio do caminho.',
  },
  {
    icon: RefreshCw,
    titulo: 'Ficou travado na tela de logo',
    detalhe: 'Antes do pânico, espere de verdade os primeiros minutos. Persistindo, entre em modo bootloader com a combinação de botões do seu modelo e regrave a imagem de fábrica original do Google antes de tentar o CalyxOS de novo. Ter a imagem de fábrica baixada previamente é o que separa quem recupera o aparelho em vinte minutos de quem entra em desespero.',
  },
  {
    icon: XCircle,
    titulo: 'Alguns apps não abrem ou travam',
    detalhe: 'Normalmente é detecção de Play Integrity. Confira se o app realmente precisa desse nível de confiança do sistema. Bancos e alguns apps de governo são os piores nesse quesito. Para alguns deles não existe contorno sem comprometer justamente a segurança que você veio buscar.',
  },
  {
    icon: HardDrive,
    titulo: 'Perdi tudo porque não fiz backup',
    detalhe: 'Isso não tem solução técnica, só prevenção. Por isso o backup é o primeiro passo do guia, não o último. Códigos de autenticador, em especial, precisam ser exportados antes, porque não migram sozinhos.',
  },
  {
    icon: Smartphone,
    titulo: 'Bateria descarregando rápido após instalar',
    detalhe: 'Normal nos primeiros dias. O sistema está reindexando e recalibrando sensores, e alguns apps de segundo plano com microG demoram para estabilizar o padrão de uso. Se persistir depois de uma semana, investigue permissão de app específico consumindo em excesso.',
  },
];

const MANUTENCAO = [
  {
    titulo: 'Mantenha as atualizações automáticas ligadas',
    detalhe: 'O CalyxOS já vem configurado para buscar atualização de segurança sozinho. Não desative. É literalmente o motivo de você estar usando esse sistema em vez do Android padrão.',
  },
  {
    titulo: 'Revise permissões a cada app novo',
    detalhe: 'O sistema é mais rígido que o Android comum na concessão de acesso, mas a decisão final continua sendo sua. Câmera, microfone e localização merecem atenção especial.',
  },
  {
    titulo: 'Verifique a integridade periodicamente',
    detalhe: 'Confira de tempos em tempos se a build instalada bate com a publicada oficialmente, principalmente se o aparelho passou pelas mãos de terceiros, como uma assistência técnica.',
  },
  {
    titulo: 'Backup contínuo fora do ecossistema Google',
    detalhe: 'Configurar backup só na instalação não resolve. E seria contraditório blindar o sistema e deixar a cópia de segurança solta na nuvem que você está tentando evitar.',
  },
];

const FAQ = [
  {
    q: 'CalyxOS funciona em qualquer celular Android?',
    a: 'Não. O suporte completo e oficial é para a linha Google Pixel, do Pixel 6 em diante, por uma razão técnica: o Pixel tem bootloader destravável oficialmente e histórico de segurança de firmware que nenhum outro fabricante oferece no mesmo nível. Aparelhos de outras marcas dependem de suporte comunitário, sem garantia de atualização contínua. Antes de comprar, verifique também se o bootloader é desbloqueável, porque versões de operadora americana, como as da Verizon, vêm travadas permanentemente.',
  },
  {
    q: 'Apps de banco funcionam no CalyxOS?',
    a: 'Depende do banco. Com o microG ativado, boa parte dos apps funciona normalmente. O problema são os apps que exigem validação via Play Integrity, mecanismo que verifica se o sistema é o Android certificado pelo Google. Alguns bancos e apps de governo detectam o ambiente modificado e se recusam a abrir. Isso muda de versão para versão, então a recomendação prática é testar o app do seu banco antes de migrar de vez, ou manter um segundo aparelho com Android comum para esses casos.',
  },
  {
    q: 'Qual a diferença entre CalyxOS e GrapheneOS?',
    a: 'Os dois rodam em Pixel e eliminam a telemetria do Google, mas têm filosofias diferentes. O GrapheneOS prioriza endurecimento máximo de segurança e oferece perfis isolados para os serviços do Google, com abordagem mais rigorosa de compatibilidade. O CalyxOS prioriza o equilíbrio entre privacidade e uso cotidiano, com o microG mantendo compatibilidade ampla com apps comuns. Em resumo: GrapheneOS para quem aceita fricção em troca de rigor, CalyxOS para quem quer proteção forte sem abrir mão da praticidade. Temos um comparativo dedicado entre os dois neste hub.',
  },
  {
    q: 'Instalar CalyxOS apaga tudo do celular?',
    a: 'Sim. O desbloqueio do bootloader, etapa obrigatória do processo, executa um apagamento completo de fábrica por questão de segurança do próprio Android. Fotos, contatos, conversas e códigos de autenticador somem. Faça backup completo em pelo menos dois lugares antes de começar, e exporte os códigos do seu app autenticador, porque eles não migram sozinhos.',
  },
  {
    q: 'É legal instalar outro sistema no meu celular?',
    a: 'Sim, é completamente legal no Brasil e na maioria dos países. O aparelho é seu e instalar outro sistema operacional não viola nenhuma lei. O que pode acontecer é o fabricante restringir a garantia em caso de dano relacionado à modificação, e alguns apps com requisitos de integridade se recusarem a rodar. Nenhuma das duas coisas é ilegalidade, são condições comerciais.',
  },
  {
    q: 'O que é microG e por que o CalyxOS usa?',
    a: 'microG é uma reimplementação livre e de código aberto dos serviços do Google Play, feita para funcionar sem enviar seus dados ao Google. Ele permite que apps que dependem desses serviços, como mapas, notificações push e login em certos apps, continuem funcionando num sistema sem o Google Play Services original. A diferença é que a comunicação é mínima e controlada, sem a telemetria constante do Android padrão.',
  },
  {
    q: 'CalyxOS deixa o celular mais lento?',
    a: 'Não. Na prática costuma acontecer o contrário. Sem a camada de telemetria, sem bloatware de fabricante e sem dezenas de processos de segundo plano enviando dados, o sistema tende a ficar mais leve e a bateria render mais depois do período inicial de calibração. A exceção são apps que dependem de serviços do Google e precisam passar pelo microG, que podem ter pequenos atrasos em notificações.',
  },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: '#0e3b3a' }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={heroImg} alt="Pixel rodando CalyxOS sobre bancada de reparo com ferramentas de precisão" className="w-full h-full object-cover scale-110"
          style={{ filter: 'saturate(1.05) contrast(1.02)' }} loading="eager" fetchPriority="high" decoding="async" width={1920} height={1080} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.35) 40%, rgba(244,237,228,0.05) 70%, #f4ede4 100%)',
        }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28"
        style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(244,237,228,0.15)', border: '1px solid rgba(244,237,228,0.25)' }}>
          <Smartphone size={16} style={{ color: '#f4ede4' }} />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#f4ede4' }}>
            Segurança Mobile · Guia de Bancada
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: APPLE_EASE }}
          className="inline-flex items-center gap-4 mb-6 self-start px-5 py-3 rounded-2xl backdrop-blur-md transition-transform duration-500 hover:scale-[1.03]"
          style={{ backgroundColor: 'rgba(244,237,228,0.12)', border: '1px solid rgba(244,237,228,0.22)' }}>
          <img src={logoCalyx} alt="Logo oficial do CalyxOS" width={48} height={48}
            className="w-10 h-10 md:w-12 md:h-12" loading="eager" decoding="async" />
          <span className="text-xl md:text-2xl font-black tracking-tight"
            style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}>
            CalyxOS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,7.5vw,6.5rem)] font-black leading-[0.98] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}>
          CalyxOS: o que é, para quem serve e{' '}
          <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(255,179,122,0.45), 0 0 80px rgba(255,179,122,0.25)' }}>
            como instalar.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
          O Android que devolve o controle para você, sem transformar seu celular num peso de papel. Guia escrito por quem passou 11 anos mexendo em celular na bancada, não por quem só leu o manual.
        </motion.p>
      </motion.div>
    </section>
  );
}

function Figura({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <motion.figure {...fade(0.1)} className="group relative overflow-hidden rounded-2xl my-12"
      style={{ boxShadow: '0 24px 60px -20px rgba(14,59,58,0.35)' }}>
      <img src={src} alt={alt} loading="lazy" decoding="async" width={1280} height={960}
        className="w-full h-[320px] md:h-[440px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(14,59,58,0.45) 100%)' }} />
      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 px-6 py-4 text-sm font-medium translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ color: '#f4ede4', fontFamily: "'Inter Tight', sans-serif" }}>
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

export default function CalyxOS() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/seguranca-mobile/calyxos"
        custom={{
          title: 'CalyxOS: O Que É, Para Quem Serve e Como Instalar (2026)',
          description: 'Guia completo do CalyxOS: o que é, ameaças que resolve, modelos Pixel compatíveis, instalação passo a passo e erros comuns, por quem passou 11 anos em bancada de reparo.',
          canonical: 'https://lordjunnior.com.br/seguranca-mobile/calyxos',
          primaryKeyword: 'calyxos',
          lsiKeywords: ['calyxos instalar', 'calyxos pixel', 'sistema android privado', 'calyxos vs grapheneos', 'celular sem google', 'android desgooglado'],
          longTailKeywords: ['como instalar calyxos no pixel', 'calyxos funciona app de banco', 'quais celulares rodam calyxos', 'calyxos vale a pena 2026', 'diferença calyxos e grapheneos'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Segurança Mobile', url: '/seguranca-mobile' },
            { name: 'CalyxOS', url: '/seguranca-mobile/calyxos' },
          ],
          schemaType: 'Article',
          articleSection: 'Segurança Mobile',
          relatedPages: ['/seguranca-mobile', '/soberania-organica/comunicacao-segura', '/soberania-organica/defesa-digital-pessoal', '/autocustodia/jade-core-review'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 - O que é */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c4632a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>O que é e por que existe</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Seu celular trabalha para terceiros.{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  O CalyxOS demite os terceiros.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  CalyxOS nasceu de um problema simples: os sistemas operacionais mobile modernos são desenhados para vazar dados, não para proteger dados. Cada toque na tela, cada app aberto, cada rede Wi-Fi que seu celular já cumprimentou em algum shopping, tudo isso vira telemetria. E telemetria é dinheiro para alguém que não é você.
                </p>
                <p>
                  O projeto é mantido pelo Calyx Institute, uma organização sem fins lucrativos americana que trabalha com privacidade e liberdade de expressão há mais de duas décadas. Não é hobby de garagem nem projeto que morre no meio do caminho. Tem histórico, financiamento sério e, principalmente, gente que entende que segurança sem usabilidade é segurança que ninguém usa.
                </p>
                <p>
                  A filosofia que separa o CalyxOS de outros projetos de endurecimento do Android é esta: ele não tenta fazer você abrir mão de tudo. Você ainda instala apps via F-Droid, ainda pode ter o microG rodando por baixo (uma versão livre e isolada dos serviços do Google, sem a parte que te espiona) e ainda roda boa parte dos apps que já usa. Não é o caminho do zero Google. É o caminho do Google só onde for estritamente necessário, e mesmo assim dentro de uma caixa fechada.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #c4632a', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  Você não precisa escolher entre privacidade e um celular que funciona de verdade. Essa é a proposta.
                </blockquote>
              </div>
              <Figura src={imgBancada} alt="Técnico abrindo smartphone em bancada de reparo com ferramentas de precisão" caption="Onze anos de bancada ensinam o que nenhum tutorial de internet mostra." />
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 - Ameaças (bloco teal) */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>Capítulo 02</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#f4ede4' }}>
                O que o CalyxOS resolve{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>na prática.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.75)' }}>
                Privacidade virou palavra tão gasta que perdeu o significado. Aqui está o que muda de verdade no seu aparelho.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {AMEACAS.map((a, i) => (
                <motion.div key={a.titulo} {...fade(i * 0.08)}
                  className="group relative p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(244,237,228,0.12)' }}>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(600px circle at 30% 20%, rgba(255,179,122,0.12), transparent 60%)' }} />
                  <a.icon size={28} style={{ color: '#ffb37a' }} className="mb-5 transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight" style={{ color: '#f4ede4' }}>{a.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.78)' }}>{a.detalhe}</p>
                </motion.div>
              ))}
            </div>

            <Figura src={imgAmeacas} alt="Lupa sobre smartphone revelando fluxos de dados de rastreamento e telemetria" caption="O que sai do seu celular sem você saber, visto de perto." />

            <motion.div {...fade(0.15)} className="mt-6 p-8 md:p-10 rounded-2xl"
              style={{ backgroundColor: 'rgba(196,99,42,0.14)', border: '1px solid rgba(255,179,122,0.35)' }}>
              <div className="flex items-center gap-3 mb-5">
                <AlertTriangle size={24} style={{ color: '#ffb37a' }} />
                <h3 className="text-xl md:text-2xl font-black tracking-tight" style={{ color: '#f4ede4' }}>O que ele não resolve sozinho</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {NAO_RESOLVE.map((n) => (
                  <div key={n.titulo}>
                    <p className="font-bold mb-2" style={{ color: '#ffb37a' }}>{n.titulo}</p>
                    <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.78)' }}>{n.detalhe}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm font-medium" style={{ color: 'rgba(244,237,228,0.6)' }}>
                O sistema operacional resolve o que está no aparelho. O que está na rede exige outras camadas, cobertas nos guias de comunicação segura e defesa digital deste site.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3 - Para quem é */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 03</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c4632a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Para quem é</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Não é para todo mundo.{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Talvez seja para você.
                </span>
              </h2>
              <div className="space-y-4">
                {PERFIS.map((p, i) => (
                  <motion.div key={i} {...fade(i * 0.06)}
                    className="group flex items-start gap-4 p-5 rounded-xl transition-all duration-300 hover:translate-x-2"
                    style={{ backgroundColor: '#ece2d3', border: '1px solid rgba(14,59,58,0.08)' }}>
                    <CheckCircle2 size={22} className="shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" style={{ color: '#0e3b3a' }} />
                    <p className="text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{p}</p>
                  </motion.div>
                ))}
              </div>
              <p className="mt-8 text-lg leading-relaxed font-light" style={{ color: '#5a6664' }}>
                Se o seu perfil é usar o celular sem pensar em nada disso, tudo bem. Talvez este não seja o conteúdo para você agora, e tudo bem também.
              </p>
              <Figura src={imgInterface} alt="Tela inicial minimalista de Android privativo sem apps do Google" caption="A interface do dia a dia: limpa, sem rastreador embutido." />
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 - Trade-offs (bloco sand escuro) */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 04</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                O preço que ninguém te conta{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>antes de instalar.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed font-light" style={{ color: '#5a6664' }}>
                Instalar CalyxOS tem custo. Não financeiro, é gratuito. Custo de conveniência. Melhor você saber agora do que descobrir no meio do processo.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {TRADEOFFS.map((t, i) => (
                <motion.div key={t.titulo} {...fade(i * 0.08)}
                  className="group p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.1)' }}>
                  <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight transition-colors duration-300 group-hover:text-[#c4632a]" style={{ color: '#0e3b3a' }}>{t.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{t.detalhe}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5 - Compatibilidade */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 05</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Seu aparelho é compatível?{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Responda antes de comprar.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed font-light" style={{ color: '#5a6664' }}>
                O CalyxOS foi desenhado prioritariamente para a linha Pixel. A ironia de rodar um sistema sem Google no hardware do Google tem explicação técnica: bootloader destravável oficialmente e histórico de segurança de firmware que nenhum outro fabricante Android entrega no mesmo nível.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6 mb-12">
              {CHECKLIST_COMPAT.map((c, i) => (
                <motion.div key={c.pergunta} {...fade(i * 0.08)}
                  className="group p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: i === 1 ? '#0e3b3a' : '#ece2d3', border: '1px solid rgba(14,59,58,0.1)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-black tracking-[0.2em]" style={{ color: '#c4632a' }}>0{i + 1}</span>
                    <h3 className="text-xl font-black tracking-tight" style={{ color: i === 1 ? '#f4ede4' : '#0e3b3a' }}>{c.pergunta}</h3>
                  </div>
                  <p className="text-base leading-relaxed font-light" style={{ color: i === 1 ? 'rgba(244,237,228,0.82)' : '#2d3a37' }}>{c.detalhe}</p>
                </motion.div>
              ))}
            </div>

            <Figura src={imgPixels} alt="Linha de smartphones Pixel de diferentes gerações sobre bancada" caption="A linha Pixel: único hardware com suporte completo e oficial." />

            <motion.div {...fade(0.1)} className="overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(14,59,58,0.12)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0e3b3a' }}>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider" style={{ color: '#f4ede4' }}>Modelo</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider" style={{ color: '#f4ede4' }}>Status</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider" style={{ color: '#f4ede4' }}>Observação de bancada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODELOS.map((m, i) => (
                      <tr key={m.modelo} className="transition-colors duration-300 hover:bg-[#ece2d3]"
                        style={{ backgroundColor: i % 2 === 0 ? '#f4ede4' : '#f9f4ec', borderTop: '1px solid rgba(14,59,58,0.08)' }}>
                        <td className="px-6 py-4 font-bold" style={{ color: '#0e3b3a' }}>{m.modelo}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1 rounded-full"
                            style={{
                              backgroundColor: m.status === 'ativo' ? 'rgba(14,59,58,0.1)' : m.status === 'atencao' ? 'rgba(196,99,42,0.12)' : 'rgba(120,40,40,0.1)',
                              color: m.status === 'ativo' ? '#0e3b3a' : m.status === 'atencao' ? '#c4632a' : '#8a3030',
                            }}>
                            {m.status === 'ativo' ? <ShieldCheck size={14} /> : m.status === 'atencao' ? <AlertTriangle size={14} /> : <XCircle size={14} />}
                            {m.status === 'ativo' ? 'Suporte ativo' : m.status === 'atencao' ? 'Atenção' : 'Sem suporte'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-base font-light" style={{ color: '#2d3a37' }}>{m.obs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
            <motion.p {...fade(0.15)} className="mt-6 text-sm font-medium" style={{ color: '#5a6664' }}>
              Status de suporte muda com o tempo. Sempre confira a lista oficial do Calyx Institute antes de destravar qualquer aparelho. E se for comprar um usado para esse fim, inspecione o conector USB-C e a saúde da bateria: porta de carga gasta interrompe flash no meio, e bateria degradada desliga o aparelho no meio de uma atualização. Já vi os dois virarem peso de papel sem relação nenhuma com o sistema.
            </motion.p>
          </div>
        </section>

        {/* CAPÍTULO 6 - Instalação (bloco teal) */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="max-w-[1200px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>Capítulo 06</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#f4ede4' }}>
                Como instalar,{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>passo a passo real.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.75)' }}>
                Sem enrolação e com os avisos de quem já viu cada etapa dar errado. Leia tudo antes de começar, não durante.
              </p>
            </motion.div>

            <Figura src={imgInstalacao} alt="Smartphone conectado via USB a notebook rodando instalador web de sistema" caption="O instalador web oficial faz o flash direto do navegador." />

            <div className="space-y-5 mt-4">
              {PASSOS.map((p, i) => (
                <motion.div key={p.titulo} {...fade(i * 0.06)}
                  className="group flex gap-6 p-7 rounded-2xl transition-all duration-500 hover:translate-x-2"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(244,237,228,0.12)' }}>
                  <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: '#c4632a', color: '#f4ede4' }}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 tracking-tight" style={{ color: '#f4ede4' }}>{p.titulo}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.78)' }}>{p.detalhe}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 - Troubleshooting */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 07</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Quando dá errado:{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>o manual da bancada.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed font-light" style={{ color: '#5a6664' }}>
                Depois de mais de uma década resolvendo isso na prática, estes são os problemas que mais aparecem. A maioria tem solução simples, só que ninguém explica direito.
              </p>
            </motion.div>

            <Figura src={imgTroubleshoot} alt="Técnico diagnosticando smartphone aberto com pinça e multímetro em bancada" caption="Diagnóstico real: método, não tentativa e erro." />

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {PROBLEMAS.map((p, i) => (
                <motion.div key={p.titulo} {...fade(i * 0.08)}
                  className="group p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: '#ece2d3', border: '1px solid rgba(14,59,58,0.1)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: '#0e3b3a' }}>
                      <p.icon size={18} style={{ color: '#ffb37a' }} />
                    </div>
                    <h3 className="text-lg md:text-xl font-black tracking-tight" style={{ color: '#0e3b3a' }}>{p.titulo}</h3>
                  </div>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{p.detalhe}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 8 - Manutenção + Veredito */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 08</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Instalar não é o fim.{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>É o começo.</span>
              </h2>
              <div className="space-y-4">
                {MANUTENCAO.map((m) => (
                  <div key={m.titulo} className="group p-6 rounded-xl transition-all duration-300 hover:translate-x-2"
                    style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.08)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Wrench size={18} style={{ color: '#c4632a' }} />
                      <h3 className="font-black tracking-tight" style={{ color: '#0e3b3a' }}>{m.titulo}</h3>
                    </div>
                    <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{m.detalhe}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.15)} className="lg:col-span-6">
              <div className="sticky top-24 p-8 md:p-12 rounded-3xl"
                style={{ backgroundColor: '#0e3b3a', boxShadow: '0 32px 80px -24px rgba(14,59,58,0.5)' }}>
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-6" style={{ color: '#ffb37a' }}>Veredito</span>
                <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.88)' }}>
                  <p>
                    CalyxOS não é o sistema mais paranoico que existe, e é exatamente por isso que ele funciona para mais gente do que qualquer alternativa nesse espaço. Ele foi feito para quem quer viver a vida real com um nível de proteção que o cidadão comum nunca teve acesso, sem virar refém do próprio celular no processo.
                  </p>
                  <p>
                    Depois de mais de uma década desmontando, consertando e devolvendo celular para gente que nunca soube o que rodava escondido no próprio bolso, minha visão é direta: se você tem um Pixel parado na gaveta, ou pensa em comprar um para esse fim, o CalyxOS é o ponto de entrada mais sensato para sair do modelo em que seu celular trabalha para terceiros.
                  </p>
                  <p className="text-2xl font-black tracking-tight" style={{ color: '#f4ede4', fontFamily: "'Inter Tight', sans-serif" }}>
                    Não é a solução definitiva. É o primeiro passo real.
                  </p>
                </div>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link to="/seguranca-mobile"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-[1.03]"
                    style={{ backgroundColor: '#c4632a', color: '#f4ede4', boxShadow: '0 12px 32px -8px rgba(196,99,42,0.6)' }}>
                    Explorar Segurança Mobile
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link to="/soberania-organica/comunicacao-segura"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-base transition-all duration-300 hover:bg-[rgba(244,237,228,0.12)]"
                    style={{ border: '1px solid rgba(244,237,228,0.3)', color: '#f4ede4' }}>
                    Comunicação Segura
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="max-w-[1000px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Dúvidas reais</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Perguntas que chegam{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>na bancada.</span>
              </h2>
            </motion.div>
            <div>
              {FAQ.map((f, i) => (
                <motion.div key={i} {...fade(i * 0.05)} style={{ borderTop: '1px solid rgba(14,59,58,0.14)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="group w-full flex items-center justify-between gap-6 py-7 text-left transition-colors duration-300">
                    <span className="text-lg md:text-2xl font-black tracking-tight transition-colors duration-300 group-hover:text-[#c4632a]"
                      style={{ color: openFaq === i ? '#c4632a' : '#0e3b3a' }}>
                      {f.q}
                    </span>
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.35, ease: APPLE_EASE }}
                      className="shrink-0 text-3xl font-light leading-none" style={{ color: '#c4632a' }}>
                      +
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: APPLE_EASE }}
                    className="overflow-hidden">
                    <p className="pb-8 pr-12 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>{f.a}</p>
                  </motion.div>
                </motion.div>
              ))}
              <div style={{ borderTop: '1px solid rgba(14,59,58,0.14)' }} />
            </div>
          </div>
        </section>

        {/* Continue sua trilha */}
        <section className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.h2 {...fade(0)} className="text-[clamp(1.75rem,3.5vw,3rem)] font-black tracking-tight mb-10" style={{ color: '#f4ede4' }}>
              Continue sua trilha
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { to: '/seguranca-mobile', titulo: 'Hub de Segurança Mobile', desc: 'Sistemas, ameaças, mitos e guias práticos de endurecimento do seu celular.', icon: Smartphone },
                { to: '/soberania-organica/comunicacao-segura', titulo: 'Comunicação Segura', desc: 'O sistema protege o aparelho. Agora proteja o que trafega pela rede.', icon: Radio },
                { to: '/autocustodia/jade-core-review', titulo: 'Jade: Hardware Wallet', desc: 'Se o celular ficou soberano, o próximo passo é tirar suas chaves de corretora.', icon: Lock },
              ].map((c, i) => (
                <motion.div key={c.to} {...fade(i * 0.08)}>
                  <Link to={c.to}
                    className="group block p-8 rounded-2xl h-full transition-all duration-500 hover:-translate-y-1"
                    style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(244,237,228,0.12)' }}>
                    <c.icon size={26} style={{ color: '#ffb37a' }} className="mb-5 transition-transform duration-500 group-hover:scale-110" />
                    <h3 className="text-xl font-black mb-2 tracking-tight transition-colors duration-300 group-hover:text-[#ffb37a]" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                    <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.72)' }}>{c.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#ffb37a' }}>
                      Ler agora <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
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
