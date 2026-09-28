import { useEffect } from 'react';
import { MessagesSquare, ArrowRight, CheckCircle2, XCircle, Lock, Waves, Users, Database, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/messengers/ms-hero.webp';
import criptoAsset from '@/assets/seguranca-mobile/messengers/ms-cripto.webp';
import metadadosAsset from '@/assets/seguranca-mobile/messengers/ms-metadados.webp';
import gruposAsset from '@/assets/seguranca-mobile/messengers/ms-grupos.webp';
import conversaAsset from '@/assets/seguranca-mobile/escuta/ce-conversa.webp';
import permissaoAsset from '@/assets/seguranca-mobile/escuta/ce-permissao.webp';

const CRIPTOGRAFIA = [
  { icon: Lock, titulo: 'Signal', texto: 'Criptografia ponta a ponta em todas as conversas, sem exceção e sem configuração. O protocolo é o mesmo que outras plataformas adotaram depois, e o cliente é a implementação de referência. A conta não precisa de e-mail, apenas de número ou identificador do app.' },
  { icon: Lock, titulo: 'WhatsApp', texto: 'Criptografia ponta a ponta ativa por padrão em todas as conversas, herdada do próprio protocolo Signal. A implementação foi auditada publicamente. O conteúdo da mensagem é protegido, e o restante, metadados, identidade e comportamento, é propriedade da plataforma.' },
  { icon: Lock, titulo: 'Telegram', texto: 'Criptografia ponta a ponta apenas em chats secretos, iniciados manualmente e não sincronizados entre aparelhos. Conversas normais são cifradas no transporte, e o servidor pode ler o conteúdo. Essa distinção é o ponto central da comparação, e é frequentemente omitida na propaganda do aplicativo.' },
];

const METADADOS = [
  'Signal: coleta mínima documentada publicamente. O aplicativo não registra a quem você mandou mensagem, quando, ou com que frequência. O número é o identificador, e o conteúdo é invisível até para o operador do serviço.',
  'WhatsApp: o conteúdo é cifrado, mas o metadado é pleno. Contatos, grupos, horários, aparelho, conexões e padrão de uso alimentam o mesmo perfil publicitário que sustenta a rede. O conteúdo é seu, o comportamento é da plataforma.',
  'Telegram: o servidor é controlado pela operadora do serviço, e conversas normais, a grande maioria do uso real, são legíveis para ele. Em chats secretos, a proteção é real, mas depende do usuário lembrar de ativar.',
];

const BACKUPS = [
  { icon: Database, titulo: 'Signal: sem backup em nuvem', texto: 'Migração entre aparelhos é possível, mas não existe cópia em nuvem do histórico. A perda do aparelho sem restauração é perda de mensagens. Para quem teme justamente a nuvem, essa é uma escolha, não um defeito.' },
  { icon: Database, titulo: 'WhatsApp: backup configurável', texto: 'O backup em nuvem pode ser cifrado com senha própria, e sem essa configuração ele fica legível para o provedor de nuvem. A camada existe, mas é opcional e depende de você ter ativado.' },
  { icon: Database, titulo: 'Telegram: sincronização contínua', texto: 'O histórico vive no servidor. A conveniência é real, e a exposição também: tudo o que você mandou em conversa normal está no servidor, acessível enquanto a conta existir.' },
];

const FAQ = [
  { q: 'Signal é mais seguro que WhatsApp?', a: 'Na criptografia de conteúdo, são comparáveis, porque o protocolo é o mesmo. A diferença está no metadado e no modelo de negócio: Signal é uma fundação sem lucro com coleta mínima, e WhatsApp é um produto de uma empresa que fatura com comportamento de usuário. Para conversas sensíveis, o metadado pesa tanto quanto o conteúdo.' },
  { q: 'Telegram é realmente criptografado?', a: 'Só em chats secretos, que precisam ser iniciados manualmente e não sincronizam entre aparelhos. A conversa padrão, que é a que todo mundo usa, é cifrada no transporte e legível pelo servidor. É a diferença mais importante da comparação, e é também a mais confundida em propaganda.' },
  { q: 'Preciso trocar de aplicativo para ser mais seguro?', a: 'Não é obrigatório, e não é sempre possível: a rede de contatos decide o que você usa. O ganho real vem de separar o tráfego: conversas de trabalho e conveniência podem ficar onde estão, e o que é sensível migra para um canal com proteção real nos dois lados.' },
  { q: 'E o backup, não é importante?', a: 'É, e é justamente onde as escolhas divergem. Signal não guarda histórico na nuvem, o que é proteção com custo de conveniência. WhatsApp permite backup cifrado por senha. Telegram mantém tudo no servidor. A escolha depende do que você teme mais: perder o histórico ou vê-lo exposto.' },
  { q: 'Meu número é exposto em todos eles?', a: 'Em Signal, o número é opcional: existe identificador próprio, e o número pode ficar invisível para contatos. WhatsApp e Telegram usam o número como identidade principal, e a configuração de quem pode te encontrar por ele é uma camada de mitigação, não de proteção.' },
];

export default function SignalVsWhatsAppVsTelegram() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Apps de mensagem: Signal vs WhatsApp vs Telegram',
        description: 'Comparação técnica entre Signal, WhatsApp e Telegram: criptografia ponta a ponta, metadados, backups, identidade, grupos e modelo de confiança, sem ranking e sem simplificação.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/signal-vs-whatsapp-vs-telegram',
        primaryKeyword: 'signal vs whatsapp vs telegram',
        lsiKeywords: ['criptografia ponta a ponta', 'metadados de mensagem', 'telegram chats secretos', 'backup whatsapp cifrado', 'privacidade em apps de mensagem', 'protocolo signal', 'melhor aplicativo de mensagem seguro'],
        longTailKeywords: ['telegram é realmente criptografado', 'signal ou whatsapp para privacidade', 'metadados do whatsapp expõem o quê', 'backup do whatsapp é seguro'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Guias Práticos de Hardening', url: '/seguranca-mobile/signal-vs-whatsapp-vs-telegram' }, { name: 'Signal vs WhatsApp vs Telegram', url: '/seguranca-mobile/signal-vs-whatsapp-vs-telegram' }],
        schemaType: 'Article', articleSection: 'Guias Práticos de Hardening', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/celular-escuta-conversa-anuncio', '/seguranca-mobile/vpn-no-celular'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Três smartphones de pé em superfície escura com luz cobre e azul, telas de aplicativo de mensagem borradas" eyebrow="Segurança Mobile" category="Guias Práticos de Hardening" icon={MessagesSquare} title="Signal, WhatsApp e Telegram, o Que Realmente Diferencia" lede="A pergunta certa não é qual aplicativo é o melhor. É qual camada de proteção cada um oferece por padrão, e o que cada um coleta enquanto você acredita estar conversando." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Três smartphones de pé com luz cobre e azul" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>Existe uma confusão persistente entre criptografar o conteúdo da mensagem e proteger a comunicação como um todo. O conteúdo é o texto que você digitou. Os metadados são todo o resto: quem falou com quem, quando, de onde, com que frequência, em quais grupos, e em qual aparelho. Um aplicativo pode ter criptografia impecável de conteúdo e ainda assim ser uma máquina de metadados.</p>
              <p className="mt-7">Nessa comparação, Signal e WhatsApp aplicam criptografia ponta a ponta em todas as conversas por padrão. Telegram aplica apenas em chats secretos, que precisam ser iniciados manualmente, e a conversa padrão é legível pelo servidor. Essa é a diferença estrutural mais importante, e ela raramente aparece nas propagandas de cada lado.</p>
              <p className="mt-7">Este guia separa as três camadas que importam: o conteúdo, os metadados e o histórico. Nenhum dos três aplicativos vence em todas, e a escolha real depende de o que você quer proteger.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={criptoAsset} alt="Macro de conversa com balão cifrado e ícone de cadeado em smartphone" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / Camada um: criptografia" dark>Padrão ou opção, <span className="smx-copper-soft font-editorial font-normal italic">a diferença é tudo.</span></Heading>
            <div className="grid gap-5 md:grid-cols-3">
              {CRIPTOGRAFIA.map((g, i) => (
                <motion.article key={g.titulo} {...reveal(i * .06)} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="mb-6 flex items-center justify-between"><g.icon className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">{String(i + 1).padStart(2, '0')}</span></div>
                  <h3 className="text-2xl font-black leading-tight tracking-normal text-background">{g.titulo}</h3>
                  <p className="mt-4 text-lg leading-[1.75] text-background/90">{g.texto}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={criptoAsset} alt="Balão de mensagem cifrada com cadeado em tela escura de smartphone" caption="Criptografia por padrão é a única que protege o usuário que não configurou nada. Criptografia opcional protege quem lembrou de ativar." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={metadadosAsset} alt="Smartphone emitindo ondas concêntricas de sinal em superfície escura" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / Camada dois: metadados">Quem vê você, <span className="smx-editorial">mesmo sem ler a mensagem.</span></Heading>
            <div className="grid gap-4">
              {METADADOS.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card group grid gap-5 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={metadadosAsset} alt="Smartphone emitindo anéis concêntricos de sinal em ambiente escuro" caption="Metadado é o padrão de quem você fala, quando e com que frequência. É o dado que revela rotina, rede social e momento de vulnerabilidade." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={gruposAsset} alt="Macro de grupo de chamada com avatares circulares em smartphone" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / Camada três: histórico" dark>Backup, sincronização <span className="smx-copper-soft font-editorial font-normal italic">e o que sobrevive.</span></Heading>
            <div className="grid gap-5 md:grid-cols-3">
              {BACKUPS.map((g, i) => (
                <motion.article key={g.titulo} {...reveal(i * .06)} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="mb-6 flex items-center justify-between"><g.icon className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">{String(i + 1).padStart(2, '0')}</span></div>
                  <h3 className="text-xl font-black leading-tight tracking-normal text-background">{g.titulo}</h3>
                  <p className="mt-4 text-lg leading-[1.75] text-background/90">{g.texto}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={gruposAsset} alt="Tela de chamada em grupo com avatares circulares em smartphone" caption="Grupos são onde o metadado mais cresce. Cada grupo adicionado é uma rede inteira de relações registrada pela plataforma." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={permissaoAsset} alt="Macro de permissões de aplicativo de mensagem em tela escura" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="05 / A escolha prática">Separe o tráfego, <span className="smx-editorial">não mude tudo.</span></Heading>
            <div className="grid gap-4">
              {[
                'Classifique suas conversas: o que é trabalho e conveniência pode continuar onde já está. O que é sensível, planejamento, finanças, saúde, mova para um canal com proteção real nos dois lados.',
                'Convide os contatos que realmente importam, não toda a agenda. A migração de rede social por inteiro é o erro que faz o processo morrer. Uma dúzia de contatos cobre a maior parte do valor real.',
                'Confira as permissões do aplicativo que você mantém: microfone, câmera e contatos têm o mesmo critério de qualquer outro app. O nome do aplicativo não muda a lógica.',
                'Para o WhatsApp que continuar em uso, ative o backup cifrado com senha própria. Sem isso, o histórico fica legível para o provedor de nuvem, mesmo com a conversa ponta a ponta.',
              ].map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card group grid gap-5 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/celular-escuta-conversa-anuncio">Seu celular escuta conversas? <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/checklist-permissoes-celular">Checklist de permissões <ArrowRight /></Link></Button>
            </div>
          </div>
        </section>

        <FaqSection asset={conversaAsset} alt="Macro de conversa em aplicativo de mensagem em tela escura" faq={FAQ} />

        <Veredito headline={<>Conteúdo cifrado, <span className="smx-copper-soft font-editorial font-normal italic">comportamento exposto.</span></>} paragraphs={[
          'Nenhum dos três aplicativos é um vilão ou um herói absoluto. Signal protege conteúdo e metadados, com custo de conveniência. WhatsApp protege conteúdo e coleta metadados, com rede e conveniência. Telegram protege o que você lembrou de cifrar, com sincronização e alcance.',
          'A decisão prática não é trocar de rede, é separar o tráfego: manter o aplicativo de conveniência para o dia a dia e mover as conversas que importam para um canal com proteção real nos dois lados.',
          'A pergunta certa não é qual aplicativo é o melhor. É se a conversa que você está tendo agora precisa de proteção de conteúdo, ou se ela já revelou demais pelo metadado sozinho.',
        ]} />

        <TrailSection chapter="Guias Práticos de Hardening" cards={[
          { to: '/seguranca-mobile/checklist-permissoes-celular', title: 'Checklist de permissões', desc: 'Reveja câmera, microfone, localização e segundo plano em uma sessão de quinze minutos.', icon: ShieldCheck },
          { to: '/seguranca-mobile/vpn-no-celular', title: 'VPN no celular', desc: 'Quando a VPN protege de verdade e quando é apenas mais uma camada de confiança terceirizada.', icon: Waves },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: Users },
        ]} />
      </main>
    </>
  );
}
