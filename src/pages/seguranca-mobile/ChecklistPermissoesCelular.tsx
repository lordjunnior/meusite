import { useEffect } from 'react';
import { ListChecks, ArrowRight, CheckCircle2, XCircle, MapPin, Mic, Camera, Users, Bell, Layers, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/checklist/ck-hero.webp';
import localizacaoAsset from '@/assets/seguranca-mobile/checklist/ck-localizacao.webp';
import micAsset from '@/assets/seguranca-mobile/checklist/ck-mic.webp';
import segundoAsset from '@/assets/seguranca-mobile/checklist/ck-segundoplano.webp';
import permissoesAsset from '@/assets/seguranca-mobile/stalkerware/stk-permissoes.webp';
import configAsset from '@/assets/seguranca-mobile/modo-aviao/ma-config.webp';

const GRUPOS = [
  { icon: MapPin, titulo: 'Localização precisa', texto: 'Com localização contínua, um aplicativo sabe sua casa, seu trabalho, seus horários e seu padrão de deslocamento. A exceção em uso comum, vale para mapas e rastros de entrega, mas raramente precisa valer para o resto.' },
  { icon: Mic, titulo: 'Microfone', texto: 'Permissão de microfone em segundo plano é a que merece mais desconfiança imediata. Grave um áudio ou faça uma ligação: depois, nenhum aplicativo de escrita, banco ou jogo precisa de microfone.' },
  { icon: Camera, titulo: 'Câmera', texto: 'A câmera é uma janela física para o seu ambiente. Fora dos apps de foto, vídeo e leitor de código, pouquíssimos casos justificam, e nenhum deles justifica acesso em segundo plano.' },
  { icon: Users, titulo: 'Contatos e calendário', texto: 'Contatos expõem não apenas você, mas sua rede inteira. Se o aplicativo pede contatos para "encontrar amigos", o dado de todo mundo sai da sua agenda sem que ninguém autorize por você.' },
  { icon: Bell, titulo: 'Notificações', texto: 'Menos grave em dado direto, pesada em comportamento. Notificação com ação rápida devolve superfície ao aplicativo sem abrir nada, e cada concedida é um canal permanente para te puxar de volta.' },
  { icon: Layers, titulo: 'Acesso em segundo plano', texto: 'O pior dos grupos, porque independe da permissão nominal. Localização "em segundo plano", atualização de dados em intervalos curtos e execução contínua transformam qualquer permissão simples em vigilância.' },
];

const ETAPAS = [
  'Abra a lista de aplicativos e ordene por permissões concedidas, não por nome. Em Android, Configurações, Privacidade, Gerenciador de permissões mostra cada grupo e quem o usa. Isso sozinho já revela o aplicativo que pediu microfone "para uma função de voz" e nunca mais foi aberto.',
  'Revogue primeiro o que independe de contexto: localização precisa, contatos e acesso em segundo plano de qualquer aplicativo que não seja uma ferramenta de navegação ou de entrega em uso real. É o corte que remove o maior dano com o menor esforço.',
  'Trate microfone e câmera como exceção, não como padrão. Se o aplicativo pede de novo quando você realmente usa a função, a concessão temporária em uso cumpre o papel.',
  'Passe pelo painel de notificações uma vez. Desligue de tudo que não seja mensagem de pessoa real ou alerta de conta, e mantenha o resto no modo silencioso sem persistência.',
  'Repita o ciclo a cada dois ou três meses, e sempre depois de instalar algo novo. A lista de permissões é uma superfície viva: aplicativos se atualizam e pedem novamente.',
];

const FAQ = [
  { q: 'Revogar permissões quebra o aplicativo?', a: 'Na maioria dos casos, não quebra, e o pior cenário é o aplicativo recusar a função que dependia da permissão quando você a usa. O Android moderno exige que o aplicativo lide com recusa de permissão sem travar, então o risco real é incômodo, não dano. Se um aplicativo parar de funcionar sem justificativa plausível, é um sinal de que ele pede demais, e isso vale a decisão de removê-lo.' },
  { q: 'Qual permissão é a mais grave se vazar ou for abusada?', a: 'Localização contínua. Ela cruza com horário, rotina e presença física, e é o dado que conecta a sua vida digital à sua vida real. Microfone e câmera são mais invasivos por instante, mas exigem momento ativo. Localização persistente observa sem precisar de nada.' },
  { q: 'Permissões do próprio sistema podem ser revogadas?', a: 'Em aparelhos comuns, a maioria dos aplicativos do fabricante se comporta como qualquer outro, e o mesmo gerenciador se aplica. Em GrapheneOS, o controle é mais fino, incluindo sensores desligáveis por aplicativo. Em nenhum caso revogar permissão de sistema é irreversível: basta conceder novamente.' },
  { q: 'De quanto em quanto tempo devo revisar?', a: 'Uma revisão trimestral é suficiente para quem não instala muita coisa. Depois de instalar um aplicativo novo, a revisão é imediata, nas primeiras 48 horas, antes que ele construa hábito de uso que dificulte a decisão de revogar.' },
  { q: 'Acesso em segundo plano é sempre ruim?', a: 'Não. Rastreamento de corrida, entrega em andamento e sincronização de backup têm justificativa legítima. O sinal de alerta é o aplicativo que pede segundo plano sem função clara que o exija. Nesse caso, o pedido em si é o problema.' },
];

export default function ChecklistPermissoesCelular() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Checklist de permissões: o que revogar agora',
        description: 'Câmera, microfone, localização, contatos, notificações e acesso em segundo plano: um checklist objetivo de permissões de celular, com critério claro de quando revogar e quando manter.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/checklist-permissoes-celular',
        primaryKeyword: 'checklist de permissões celular',
        lsiKeywords: ['permissões android', 'revogar permissões de aplicativo', 'acesso em segundo plano android', 'permissão de microfone', 'permissão de localização', 'privacidade no celular', 'hardening android'],
        longTailKeywords: ['quais permissões revogar no celular', 'como revisar permissões de aplicativos android', 'aplicativo com acesso em segundo plano é perigoso', 'permissão de contatos vale a pena'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Guias Práticos de Hardening', url: '/seguranca-mobile/checklist-permissoes-celular' }, { name: 'Checklist de permissões', url: '/seguranca-mobile/checklist-permissoes-celular' }],
        schemaType: 'Article', articleSection: 'Guias Práticos de Hardening', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/grapheneos', '/seguranca-mobile/vpn-no-celular'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Smartphone sobre mesa ao anoitecer com notificações acendendo na tela escura" eyebrow="Segurança Mobile" category="Guias Práticos de Hardening" icon={ListChecks} title="Checklist de Permissões, o Que Revogar Agora" lede="Sessenta por cento da sua superfície de exposição móvel não é bug de sistema: é permissão que você concedeu e nunca revisitou. Este checklist corrige isso em uma sessão de quinze minutos." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Smartphone em mesa escura com notificações acesas" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>Toda vez que você toca em "permitir" em um aplicativo novo, você dá a ele um pedaço do seu aparelho que ele passa a usar quando quiser, não apenas quando você está dentro dele. Permissão é declaração de acesso permanente. A lista que se acumula depois de meses de uso, com aplicativos instalados para resolver um problema único e esquecidos depois, é a maior superfície de exposição que existe em um celular doméstico.</p>
              <p className="mt-7">A boa notícia é que revisar permissões é uma das tarefas de maior retorno por minuto investido. Não exige sistema diferente, não exige aparelho novo, não exige nada que você não tenha hoje. Exige uma sessão honesta olhando quem pediu o quê, e coragem para revogar o que não tem função clara.</p>
              <p className="mt-7">Este guia é um checklist executável: seis grupos de permissões, um critério de decisão por grupo, e um procedimento de revisão que cabe em quinze minutos e se repete a cada trimestre.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={localizacaoAsset} alt="Macro de smartphone com mapa de localização em interface escura" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / Os seis grupos que importam" dark>Seis pedidos, <span className="smx-copper-soft font-editorial font-normal italic">seis decisões.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {GRUPOS.map((g, i) => (
                <motion.article key={g.titulo} {...reveal(i * .06)} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between"><g.icon className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">GRUPO {String(i + 1).padStart(2, '0')}</span></div>
                  <h3 className="text-2xl font-black leading-tight tracking-normal text-background">{g.titulo}</h3>
                  <p className="mt-4 text-lg leading-[1.75] text-background/90">{g.texto}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={localizacaoAsset} alt="Tela de smartphone com mapa e pino de localização em macro" caption="Localização contínua é a permissão que cruza o mundo digital com o mundo físico. É também a mais revogável sem perda real." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={permissoesAsset} alt="Telas de permissões de aplicativo em smartphone sobre mesa escura" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / Revogar não é o mesmo que impedir">O detalhe que a tela <span className="smx-editorial">não mostra.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              <motion.article {...reveal()} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><XCircle className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">O QUE A TELA DIZ</span></div>
                <p className="text-lg leading-[1.75]">O painel de permissões fala em "permitir", "negar" e "somente em uso". A leitura comum é que "somente em uso" significa que o aplicativo só tem acesso enquanto você está com ele aberto. É quase verdade, e o quase é o problema.</p>
              </motion.article>
              <motion.article {...reveal(.08)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><CheckCircle2 className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">O QUE ACONTECE</span></div>
                <p className="text-lg leading-[1.75]">"Somente em uso" ainda permite acesso enquanto o aplicativo tem serviço ativo, e alguns aplicativos mantêm esse serviço vivo por conveniência, não por necessidade. A verificação real está no painel de uso de dados em segundo plano, não no seletor de permissão.</p>
              </motion.article>
            </div>
            <Figure asset={micAsset} alt="Macro de smartphone com ícone de microfone em interface escura" caption="Microfone concedido “com exceção” não é exceção se o aplicativo mantém serviço vivo. O painel de segundo plano é o juiz real." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={segundoAsset} alt="Smartphone sobre mesa à noite com notificação de aplicativo em segundo plano" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / A revisão em quinze minutos" dark>Ordem de execução, <span className="smx-copper-soft font-editorial font-normal italic">sem ambiguidade.</span></Heading>
            <div className="grid gap-4">
              {ETAPAS.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={segundoAsset} alt="Smartphone à noite com notificação acendendo em aplicativo em segundo plano" caption="A revisão vale mais por rotina do que por intensidade. Quinze minutos a cada trimestre batem horas de auditoria anual." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={configAsset} alt="Configurações de sistema abertas em smartphone sobre superfície escura" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="05 / Ruído bom e ruído ruim">Nem todo alerta <span className="smx-editorial">merece ação.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              <motion.article {...reveal()} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><ShieldCheck className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">PERMISSÃO LEGÍTIMA</span></div>
                <p className="text-lg leading-[1.75]">Navegador pedindo localização para mapa, app de câmera pedindo câmera, cliente de e-mail pedindo notificações. São pedidos com função clara e direta. Revogá-los degrada a função sem ganho real de privacidade.</p>
              </motion.article>
              <motion.article {...reveal(.08)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><XCircle className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">PEDIDO SUSPEITO</span></div>
                <p className="text-lg leading-[1.75]">Jogo pedindo contatos, calculadora pedindo localização, aplicativo de nota pedindo microfone. São pedidos sem função óbvia, e cada um deles é uma evidência de que o aplicativo coleta por coletar. Revogação aqui é obrigatória, não negociável.</p>
              </motion.article>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/grapheneos">GrapheneOS e permissões granulares <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/vpn-no-celular">VPN no celular, o que ela cobre <ArrowRight /></Link></Button>
            </div>
          </div>
        </section>

        <FaqSection asset={configAsset} alt="Configurações de sistema em smartphone sobre superfície escura" faq={FAQ} />

        <Veredito headline={<>Permissão concedida é <span className="smx-copper-soft font-editorial font-normal italic">exposição acumulada.</span></>} paragraphs={[
          'A superfície de exposição de um celular doméstico não está no sistema operacional, e está nas concessões que se acumulam sem auditoria. Cada aplicativo esquecido com permissão ativa é um pequeno sensor permanente na sua rotina.',
          'A revisão trimestral de quinze minutos, com foco em localização, contatos e segundo plano, remove a maior parte do dano possível sem quebrar função real de nenhum aplicativo que você realmente usa.',
          'A pergunta certa não é se o aplicativo é confiável. É se ele precisa da permissão para fazer a única coisa que você o instalou para fazer. Se a resposta é não, a permissão já era demais.',
        ]} />

        <TrailSection chapter="Guias Práticos de Hardening" cards={[
          { to: '/seguranca-mobile/vpn-no-celular', title: 'VPN no celular', desc: 'Quando a VPN protege de verdade e quando é apenas mais uma camada de confiança terceirizada.', icon: ShieldCheck },
          { to: '/seguranca-mobile/sair-do-google-sem-trocar-aparelho', title: 'Sair do Google', desc: 'Reduza a dependência de serviços Google por etapas, sem exigir um celular novo no primeiro dia.', icon: CheckCircle2 },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: ListChecks },
        ]} />
      </main>
    </>
  );
}
