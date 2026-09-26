import { useEffect } from 'react';
import { Mic, MicOff, ArrowRight, ShieldCheck, Volume2, Users, BarChart3, Ear, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/escuta/ce-hero.webp';
import permissaoAsset from '@/assets/seguranca-mobile/escuta/ce-permissao.webp';
import feedAsset from '@/assets/seguranca-mobile/escuta/ce-feed.webp';
import conversaAsset from '@/assets/seguranca-mobile/escuta/ce-conversa.webp';
import altofalanteAsset from '@/assets/seguranca-mobile/escuta/ce-altofalante.webp';
import noiteAsset from '@/assets/seguranca-mobile/stalkerware/stk-noite.webp';

const EXPLICA = [
  'Correlação de dados: o sistema conecta o que você pesquisou, onde você esteve, com quem conversa por apps e a que hora, e projeta anúncios nesse cruzamento. A coincidência parecerá leitura de pensamento, mas o mecanismo é estatística de comportamento.',
  'Coorte e perfil: pessoas do seu perfil demográfico, na sua região, com hábitos parecidos recebem o mesmo anúncio. Você ouviu a conversa, mas o anúncio já estava na fila para todo o grupo.',
  'Contatos e histórico: quem conversa com você já viu o produto, e a rede usa a vizinhança social de contatos compartilhados como sinal. O anúncio chega a você pelo lado de outra pessoa.',
  'Timing de ciclo de vida: o algoritmo sabe quando você provavelmente troca de carro, de celular ou planeja viagem, por padrão de comportamento acumulado. A conversa só serviu de lembrete na hora em que o anúncio já estava marcado para aparecer.',
];

const MIC_REAL = [
  'Assistentes de voz respondem à palavra de ativação. Na maior parte do tempo o fluxo envia apenas essa ativação, mas erros de detecção existem, e o que é gravado após o falso positivo vai para a nuvem.',
  'Apps com permissão de microfone podem gravar enquanto estão em uso, e em alguns casos em segundo plano. A permissão concedida é um contrato de confiança com o desenvolvedor.',
  'Alguns aplicativos abusaram dessa permissão de fato, e casos documentados existem de apps de TV inteligente e outros ambientes que analisavam áudio ambiente para publicidade. Isso é abuso concreto e investigado, não ficção, mas também não é o padrão de todo app.',
  'Vigilância real existe quando alguém instala software espião no seu aparelho. Nesse caso a escuta é deliberada, direcionada e tem um humano do outro lado, não é um algoritmo publicitário.',
];

const NAO_PROVA = [
  'Uma coincidência isolada. Com o volume de anúncios e de conversas, coincidências de alto impacto acontecem com frequência estatística. O cérebro registra o acerto e esquece os milhares de anúncios que nada tinham a ver com você.',
  'Falar um nome de produto perto do celular e ver anúncio depois. Sem controle de grupo e sem registro do que foi dito, esse teste não separa escuta de correlação.',
  'Desligar o microfone e continuar vendo anúncios relevantes. Isso não prova que nunca houve escuta, prova apenas que a maior parte da segmentação nunca dependeu do microfone.',
];

const DEFESAS = [
  'Audite as permissões de microfone: mantenha concedido apenas onde a função exige, e prefira a opção "somente enquanto o app está em uso". O checklist de permissões deste silo cobre a revisão completa.',
  'Desative o assistente de voz ou restrinja o que ele envia para a nuvem: configure o histórico de gravações e apague o que já está armazenado.',
  'Trate o pior cenário com protocolo: se há suspeita real de escuta deliberada, o problema é software espião, e a sequência de remoção segura está no dossiê de stalkerware.',
  'Reduza a superfície publicitária: bloqueadores e configurações de privacidade de publicidade cortam grande parte da segmentação, que depende muito mais de rede e de identificadores do que de áudio.',
];

const FAQ = [
  { q: 'Meu celular grava minhas conversas e vende para anunciantes?', a: 'Não há evidência de que isso aconteça como prática generalizada. O que existe é um sistema de correlação tão eficiente que a coincidência parece escuta. Casos documentados de abuso de áudio para publicidade aconteceram em ambientes específicos, como TVs inteligentes, e foram tratados como violação, não como o modelo do setor.' },
  { q: 'Por que então aparecem anúncios do que eu conversei?', a: 'Porque a rede já sabia: seu histórico de pesquisa, sua localização, seus contatos e seu padrão de consumo apontavam na mesma direção antes da conversa. O anúncio era provável para o seu perfil, e a coincidência o confirma na sua percepção.' },
  { q: 'O assistente de voz grava sempre?', a: 'Ele escuta pela palavra de ativação de forma contínua no aparelho, e envia áudio para a nuvem quando acredita ter ouvido a ativação. Falsos positivos acontecem. É possível revisar e apagar o histórico de gravações nas configurações de conta.' },
  { q: 'Como saber se estou realmente sendo escutado?', a: 'Suspeita real de escuta deliberada aponta para software espião instalado por alguém com acesso ao aparelho. Sinais incluem consumo anômalo de bateria, aquecimento em repouso e apps desconhecidos. O protocolo de resposta segura está no dossiê de stalkerware.' },
  { q: 'Revogar permissão de microfone em tudo resolve?', a: 'Corta o vetor local, e é recomendado para apps que não precisam de áudio. Não elimina a segmentação publicitária, que funciona majoritariamente por rede, identificadores e histórico de comportamento.' },
];

export default function CelularEscutaConversaAnuncio() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Celular escuta conversa para mostrar anúncio?',
        description: 'Microfone, permissões, correlação de dados e por que os anúncios parecem saber o que foi dito: a explicação técnica completa.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/celular-escuta-conversa-anuncio',
        primaryKeyword: 'celular escuta conversa para mostrar anúncio',
        lsiKeywords: ['celular escuta conversas', 'microfone smartphone publicidade', 'correlação de dados anúncios', 'permissão de microfone android', 'assistente de voz gravação', 'segmentação publicitária mobile', 'privacidade de áudio'],
        longTailKeywords: ['celular escuta conversa para anúncio ou é mito', 'por que aparecem anúncios do que eu falo', 'app com permissão de microfone escuta sempre', 'como saber se estou sendo escutado pelo celular'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Curiosidades / Mitos', url: '/seguranca-mobile/celular-escuta-conversa-anuncio' }, { name: 'Escuta e Anúncios', url: '/seguranca-mobile/celular-escuta-conversa-anuncio' }],
        schemaType: 'Article', articleSection: 'Curiosidades / Mitos', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/checklist-permissoes-celular', '/seguranca-mobile/stalkerware-apps-espioes'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Macro da borda inferior de um smartphone com orifício de microfone e alto-falantes em destaque" eyebrow="Segurança Mobile" category="Curiosidades / Mitos" icon={Mic} title="Ele Escuta Sua Conversa para Vender Anúncio?" lede="Não existe prova de escuta generalizada. Existe um sistema de correlação tão bom que você não precisa ser escutado para parecer." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Microfone e alto-falantes de smartphone em macro" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>Gravar constantemente conversas de bilhões de pessoas para alimentar publicidade exige infraestrutura de áudio em escala, processamento contínuo e um risco de escândalo que nenhum modelo de negócio justifica. A evidência disponível aponta outra direção: a segmentação não precisa de áudio.</p>
              <p className="mt-7">O que ela precisa é do cruzamento silencioso de tudo o que você já entregou por outros canais: pesquisas, localização, aplicativos instalados, contatos, padrão de compra. Quando esse cruzamento acerta antes da conversa, a experiência parece escuta, e o mito se sustenta sozinho.</p>
              <p className="mt-7">Isso não significa que o microfone seja inofensivo. Ele é um vetor real quando a permissão foi concedida sem critério e, no pior cenário, quando o aparelho hospeda software espião. Separar as duas coisas é o objetivo desta página.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={feedAsset} alt="Smartphone exibindo feed de rede social com anúncios" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / Por que parece escuta" dark>A coincidência <span className="smx-copper-soft font-editorial font-normal italic">tem arquitetura.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {EXPLICA.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between">{i === 2 ? <Users className="smx-copper-soft h-7 w-7" /> : <BarChart3 className="smx-copper-soft h-7 w-7" />}<span className="smx-copper-soft text-xs font-black tracking-[0.25em]">MOTOR {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={feedAsset} alt="Feed de rede social com cartões de anúncio na tela do celular" caption="O anúncio que parece resposta à conversa é, quase sempre, probabilidade calculada com dados que você entregou por outros canais." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={permissaoAsset} alt="Solicitação de permissão de microfone na tela do celular" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / O que o microfone realmente faz">O que é real <span className="smx-editorial">não é mito.</span></Heading>
            <div className="grid gap-4">
              {MIC_REAL.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card group grid gap-5 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full">{i === 3 ? <Ear className="h-6 w-6" /> : <Mic className="h-6 w-6" />}</div>
                  <p className="self-center text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={permissaoAsset} alt="Diálogo de permissão de microfone na tela do smartphone" caption="Cada permissão de microfone concedida é um contrato. O sistema impõe limites, mas confia no desenvolvedor dentro deles." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={conversaAsset} alt="Duas pessoas conversando em mesa de café escura com celulares sobre a mesa" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / Testes que não provam nada" dark>O experimento <span className="smx-copper-soft font-editorial font-normal italic">que engana.</span></Heading>
            <div className="grid gap-4">
              {NAO_PROVA.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full"><XIcon /></div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={conversaAsset} alt="Pessoas conversando em mesa de café à noite com celulares sobre a mesa" caption="Conversa à mesa, celular sobre a mesa: a cena em que o mito nasce. A explicação real vive nos dados, não no alto-falante." />
          </div>
        </section>

        <FaqSection asset={altofalanteAsset} alt="Grade de alto-falante de smartphone em macro com luz cobre" faq={FAQ} />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={noiteAsset} alt="Smartphone iluminando ambiente escuro à noite" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="05 / Defesas que valem">Corte o vetor <span className="smx-editorial">onde ele existe.</span></Heading>
            <div className="grid gap-4">
              {DEFESAS.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card group grid gap-5 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full"><Lock className="h-6 w-6" /></div>
                  <p className="self-center text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/checklist-permissoes-celular">Checklist de permissões <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/stalkerware-apps-espioes">Suspeita de escuta deliberada <ArrowRight /></Link></Button>
            </div>
            <Figure asset={altofalanteAsset} alt="Grade de alto-falante do celular em macro" caption="O hardware de áudio é pequeno e sempre presente. O que decide o risco é a permissão, não o orifício na carcaça." />
          </div>
        </section>

        <Veredito headline={<>Segmentação sem <span className="smx-copper-soft font-editorial font-normal italic">escuta.</span></>} paragraphs={[
          'A evidência aponta para correlação de dados, não para gravação generalizada de conversas. O efeito que você sente é real, e o mecanismo é mais banal e mais pervasivo do que escuta: é o seu histórico inteiro trabalhando a seu favor do anunciante.',
          'O microfone é um vetor real em dois cenários: permissões concedidas sem critério e software espião instalado por alguém próximo. Ambos têm resposta prática, e ambas estão documentadas neste silo.',
          'Revogue o que não usa, restrinja o assistente, e trate suspeita de vigilância com o protocolo de stalkerware, não com teoria de conspiração publicitária.',
        ]} />

        <TrailSection chapter="Curiosidades / Mitos" cards={[
          { to: '/seguranca-mobile/checklist-permissoes-celular', title: 'Checklist de permissões', desc: 'Revisão objetiva do microfone, da localização e do que roda em segundo plano.', icon: ShieldCheck },
          { to: '/seguranca-mobile/stalkerware-apps-espioes', title: 'Stalkerware: apps espiões', desc: 'Quando a escuta é deliberada e tem um humano do outro lado.', icon: Volume2 },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: Mic },
        ]} />
      </main>
    </>
  );
}

