import { useEffect } from 'react';
import { Compass, ArrowRight, CheckCircle2, XCircle, Mail, Globe, MessageSquare, HardDrive, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/sair-google/sg-hero.webp';
import contaAsset from '@/assets/seguranca-mobile/sair-google/sg-conta.webp';
import navegadorAsset from '@/assets/seguranca-mobile/sair-google/sg-navegador.webp';
import mensagensAsset from '@/assets/seguranca-mobile/sair-google/sg-mensagens.webp';
import armazenamentoAsset from '@/assets/seguranca-mobile/sair-google/sg-armazenamento.webp';
import backupAsset from '@/assets/seguranca-mobile/apagar-app/ap-backup.webp';

const DEPENDENCIAS = [
  { icon: HardDrive, titulo: 'Armazenamento e fotos', texto: 'Fotos, Drive e backups automáticos. É a dependência mais pesada, porque carrega anos de arquivo pessoal, e a mais fácil de migrar primeiro: o destino é local ou nuvem neutra, e a cópia sai uma única vez.' },
  { icon: MessageSquare, titulo: 'Mensagens e reuniões', texto: 'Gmail, Meet, Chat. É a dependência mais visível, porque seu endereço de e-mail circula por todo registro que você já fez na vida. Trocar de e-mail sem migrar contas existentes é o erro clássico: o certo é migrar as contas primeiro.' },
  { icon: Globe, titulo: 'Navegador e busca', texto: 'Chrome, busca, histórico sincronizado. É a dependência mais barata de resolver: um navegador independente e um motor de busca alternativo cobrem a troca em uma tarde, e o ganho de telemetria é imediato.' },
  { icon: Mail, titulo: 'O sistema operacional', texto: 'Serviços de sistema, Play Store, frameworks proprietários. É o último elo, e o único que realmente exige decisão de aparelho. Tudo antes dele pode ser feito com o celular que você já tem.' },
];

const FASE_1 = [
  'Faça o inventário de contas: liste todo serviço que usa seu Gmail como credencial. Sites, bancos, streaming, aplicativos. É a base para saber o tamanho real da dependência antes de mexer em qualquer coisa.',
  'Crie um endereço alternativo em provedor independente e migre as contas mais sensíveis primeiro: banco, investimentos, autenticação em serviços críticos. Deixe o Gmail recebendo por um tempo, mas nunca mais como chave de acesso.',
  'Migre o armazenamento: baixe fotos e documentos, coloque em disco local ou nuvem neutra, e desligue o backup automático no aparelho antes de esvaziar. Backup automático é o elo que traz tudo de volta.',
  'Encerre o uso do Drive como base única: qualquer documento de trabalho ou pessoal que exista apenas lá está preso à conta. Duplique antes de decidir.',
];

const FASE_2 = [
  'Troque o navegador padrão por um independente, com bloqueio de rastreadores nativo, e remova o Chrome da rotina de uso. Não é preciso desinstalar: basta deixar de abrir.',
  'Troque o motor de busca. O ganho de telemetria é imediato, e a perda de qualidade é menor do que se imagina para consultas comuns.',
  'Migre a comunicação: e-mail para provedor independente, e aplicativo de mensagem com criptografia ponta a ponta para os contatos que aceitam migrar. O resto continua por escolha, não por inércia.',
  'Desative o histórico de atividade que sobrou: histórico da conta, salvamento de buscas, personalização de anúncios. A conta pode continuar existindo, mas deixa de ser o perfil ativo.',
];

const FAQ = [
  { q: 'É possível sair do Google sem trocar de aparelho?', a: 'Sim, para a maior parte da rotina. Contas, e-mail, armazenamento, navegador e busca migram com o aparelho atual, e é onde a maior parte da dependência real está. O que exige aparelho é a camada do sistema: Play Services, atualizações do fabricante e o ecossistema embutido. Essa camada é o assunto da fase final, e ela é opcional para quem quer reduzir dependência sem reconstruir o aparelho.' },
  { q: 'Qual é o maior obstáculo real?', a: 'O endereço de e-mail. Ele é a chave de recuperação de praticamente tudo que você tem, e trocá-lo de forma desorganizada é o risco mais alto do processo. A ordem correta é: criar o endereço novo, migrar as contas sensíveis, manter o antigo recebendo, e só depois reduzir o uso dele.' },
  { q: 'Perco fotos e arquivos ao sair do Google Photos?', a: 'Não, se você baixar antes de desligar o backup. O armazenamento em nuvem neutra, ou disco local, cobre o mesmo uso sem amarrar o acervo a uma conta. O erro comum é desligar o backup antes de mover o acervo, e é nesse ponto que perdas acontecem.' },
  { q: 'O WhatsApp é um serviço Google?', a: 'Não. A confusão é comum porque o WhatsApp é pré-instalado em muitos aparelhos Android, mas o aplicativo e a conta pertencem à Meta, não ao Google. Sair do ecossistema Google não exige sair do WhatsApp, e a troca de aplicativo de mensagem é uma decisão separada, coberta em guia próprio.' },
  { q: 'O que é de-googling do sistema e vale a pena?', a: 'É remover os serviços proprietários do sistema operacional, seja com um sistema alternativo como GrapheneOS, seja com camadas de mitigação como microG. Vale para quem já passou pelas fases anteriores e quer reduzir a dependência na camada mais profunda. Para a maioria, o retorno de privacidade nas fases de conta e serviços é maior e o custo é menor.' },
];

export default function SairDoGoogleSemTrocarAparelho() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Como sair do ecossistema Google sem trocar de aparelho',
        description: 'Um plano de saída do ecossistema Google por etapas: contas, e-mail, armazenamento, navegador e busca, tudo com o aparelho que você já tem, e a decisão de sistema operacional reservada para o fim.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/sair-do-google-sem-trocar-aparelho',
        primaryKeyword: 'sair do ecossistema google',
        lsiKeywords: ['de-google', 'degoogling android', 'migrar do gmail', 'alternativa ao google photos', 'navegador sem google', 'busca sem google', 'privacidade no android', 'dependência de serviços google'],
        longTailKeywords: ['como sair do google sem perder contas', 'migrar fotos do google photos para onde', 'substituir o gmail sem perder acesso', 'de-googling sem trocar de celular'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Guias Práticos de Hardening', url: '/seguranca-mobile/sair-do-google-sem-trocar-aparelho' }, { name: 'Sair do Google', url: '/seguranca-mobile/sair-do-google-sem-trocar-aparelho' }],
        schemaType: 'Article', articleSection: 'Guias Práticos de Hardening', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/grapheneos', '/seguranca-mobile/signal-vs-whatsapp-vs-telegram'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Smartphone à noite com listas de aplicativos abertas em tela escura" eyebrow="Segurança Mobile" category="Guias Práticos de Hardening" icon={Compass} title="Sair do Google Sem Trocar de Aparelho" lede="A dependência do ecossistema é maior na conta do que no aparelho. Este guia troca contas, e-mail, armazenamento e navegação por etapas, e deixa a decisão de sistema operacional para o fim." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Smartphone à noite com aplicativos em tela escura" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>Sair do Google é um processo de semanas, não de fim de semana. A tentação comum é tentar abandonar tudo de uma vez, e o resultado previsível é voltar depois de dois dias, porque alguma conta crítica ficou presa. O processo certo é o oposto: trocar as dependências mais valiosas primeiro, manter o antigo recebendo, e reduzir o uso dele até que a saída seja um detalhe administrativo.</p>
              <p className="mt-7">A ordem importa mais do que a intensidade. Contas e armazenamento primeiro, porque são onde está o dano real de uma perda de acesso. Navegador e busca depois, porque são trocas baratas com ganho imediato. A camada do sistema operacional por último, porque é a única que pode exigir decisão de hardware, e porque perde valor depois que as outras já saíram.</p>
              <p className="mt-7">Este guia divide a saída em fases, cada uma com metas verificáveis, para que nenhum passo dependa de uma decisão que ainda não foi tomada.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={contaAsset} alt="Macro de tela de configuração de conta em smartphone" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / O mapa da dependência" dark>Quatro camadas, <span className="smx-copper-soft font-editorial font-normal italic">ordens diferentes.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {DEPENDENCIAS.map((g, i) => (
                <motion.article key={g.titulo} {...reveal(i * .06)} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between"><g.icon className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">CAMADA {String(i + 1).padStart(2, '0')}</span></div>
                  <h3 className="text-2xl font-black leading-tight tracking-normal text-background">{g.titulo}</h3>
                  <p className="mt-4 text-lg leading-[1.75] text-background/90">{g.texto}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={armazenamentoAsset} alt="Macro de interface de armazenamento com barra segmentada em smartphone" caption="O armazenamento é onde a dependência vira acervo pessoal. Ele sai primeiro porque é o único que você não pode recriar." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={mensagensAsset} alt="Macro de lista de conversas em aplicativo de mensagem" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / Fase um: contas e armazenamento">Tire o acervo <span className="smx-editorial">antes da chave.</span></Heading>
            <div className="grid gap-4">
              {FASE_1.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card group grid gap-5 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={backupAsset} alt="Macro de smartphone mostrando tela de backup em interface escura" caption="Backup automático é o elo que traz tudo de volta. Desligá-lo antes de mover o acervo é o passo que separa migração de nostalgia digital." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={navegadorAsset} alt="Macro de navegador com várias abas abertas em smartphone" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / Fase dois: navegação e comunicação" dark>Trocas baratas, <span className="smx-copper-soft font-editorial font-normal italic">ganhos imediatos.</span></Heading>
            <div className="grid gap-4">
              {FASE_2.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Smartphone à noite com aplicativos em tela escura" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="05 / A última camada: o sistema">A decisão que ainda <span className="smx-editorial">depende de você.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              <motion.article {...reveal()} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><CheckCircle2 className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">SEM TROCAR DE APARELHO</span></div>
                <p className="text-lg leading-[1.75]">Contas migradas, armazenamento local, navegador independente, busca neutra, comunicação ponta a ponta. Nesse estado, o aparelho atual continua Android, mas a dependência de serviços Google caiu para o nível de sistema, e é onde o restante do dano potencial mora.</p>
              </motion.article>
              <motion.article {...reveal(.08)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><XCircle className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">O QUE AINDA EXIGE DECISÃO</span></div>
                <p className="text-lg leading-[1.75]">Play Services, atualizações do fabricante e o conjunto de serviços embutidos só saem com sistema alternativo. É a única parte que exige trocar de aparelho ou reinstalar o existente, e ela perde urgência quando a camada de conta já foi resolvida.</p>
              </motion.article>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/grapheneos">GrapheneOS, a saída profunda <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/signal-vs-whatsapp-vs-telegram">Aplicativos de mensagem <ArrowRight /></Link></Button>
            </div>
          </div>
        </section>

        <FaqSection asset={navegadorAsset} alt="Macro de navegador com abas em smartphone" faq={FAQ} />

        <Veredito headline={<>A dependência é maior na conta <span className="smx-copper-soft font-editorial font-normal italic">do que no aparelho.</span></>} paragraphs={[
          'A maior parte da dependência real do ecossistema Google não está no sistema operacional, e está nas contas, nos arquivos e nas credenciais que se acumulam em uma década de uso. Essa camada migra sem trocar de aparelho, e é onde o ganho de privacidade é mais alto.',
          'A ordem de saída é: acervo e contas sensíveis primeiro, navegação e comunicação depois, sistema operacional por último. Essa sequência evita o retorno que acontece quando a troca é feita toda de uma vez.',
          'A pergunta certa não é se você consegue abandonar tudo hoje. É se você já migrou as contas que não podem ser perdidas. Se a resposta é sim, o resto é gradual e reversível.',
        ]} />

        <TrailSection chapter="Guias Práticos de Hardening" cards={[
          { to: '/seguranca-mobile/grapheneos', title: 'GrapheneOS', desc: 'A camada mais profunda de saída do ecossistema, com hardening real e controle de rádio granular.', icon: ShieldCheck },
          { to: '/seguranca-mobile/signal-vs-whatsapp-vs-telegram', title: 'Aplicativos de mensagem', desc: 'Comparação técnica entre Signal, WhatsApp e Telegram em criptografia, metadados e modelo de confiança.', icon: MessageSquare },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: Compass },
        ]} />
      </main>
    </>
  );
}
