import { useEffect } from 'react';
import { EyeOff, ArrowRight, BatteryWarning, FileWarning, RadioTower, Accessibility, Thermometer, ListChecks, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/stalkerware/stk-hero.webp';
import appsAsset from '@/assets/seguranca-mobile/stalkerware/stk-apps.webp';
import permissoesAsset from '@/assets/seguranca-mobile/stalkerware/stk-permissoes.webp';
import bateriaAsset from '@/assets/seguranca-mobile/stalkerware/stk-bateria.webp';
import noiteAsset from '@/assets/seguranca-mobile/stalkerware/stk-noite.webp';
import rastreadorAsset from '@/assets/seguranca-mobile/stalkerware/stk-rastreador.webp';

const COMO_ENTRA = [
  'Acesso físico de poucos minutos. A instalação clássica acontece quando alguém fica sozinho com o seu celular desbloqueado: parceiro, familiar, colega, alguém com quem você dorme ou convive.',
  'Aplicativo fora da loja oficial. O app espião quase sempre chega como arquivo instalado manualmente, disfarçado de "atualização de sistema", "rastreador familiar" ou ícone genérico sem nome.',
  'Permissões absurdas concedidas por você. Acessibilidade, administrador de dispositivo, overlay sobre outros apps: o stalkerware pede exatamente as permissões que conferem poder máximo, e conta com o dedo automático de quem aceita tudo.',
  'O discurso da proteção. Parte desses apps é vendida abertamente como "monitoramento parental" ou "rastreamento de funcionários", e o que decide a legalidade é quem monitora quem, e se houve consentimento.',
];

const SINAIS = [
  'Bateria que esgota muito mais rápido que o normal, mesmo com uso leve, porque o app grava e transmite continuamente.',
  'Aparelho quente ou com dados móveis consumidos em repouso, de madrugada, quando ninguém está usando.',
  'Apps desconhecidos, ícones genéricos ou nomes técnicos que você não instalou, às vezes sem ícone nenhum na gaveta.',
  'Configurações de acessibilidade e de administrador de dispositivo com serviços ativos que você não reconhece. É o esconderijo favorito.',
  'A outra pessoa sabe demais: onde você esteve, com quem falou, o que pesquisou. Informação que só o aparelho poderia entregar.',
];

const REMOCAO = [
  'Antes de tudo, avalie a segurança pessoal. Se há risco de violência ao confrontar, não remova ainda e não confronte: procure apoio especializado primeiro. Remoção sem proteção pode escalar a agressão.',
  'Revise a lista de aplicativos, incluindo os ocultos e os de sistema em alguns aparelhos, e desconfie de tudo que não reconhece.',
  'Revise acessibilidade, administradores de dispositivo e permissões de overlay: desative tudo que não for do sistema ou de app que você confia.',
  'Desinstale o app suspeito. Alguns exigem revogar o acesso de administrador antes de permitir a remoção, o que já é um sintoma por si só.',
  'Feito isso, troque as senhas das contas críticas a partir de outro aparelho, e ative 2FA por aplicativo autenticador. O espião já leu o que leu: feche as portas que ele abriu.',
  'Como camada final, restaure o aparelho de fábrica e reinstale apenas o que você mesmo escolher. Em suspeita de comprometimento profundo, considerar um aparelho novo é decisão legítima, não paranoia.',
];

const FAQ = [
  { q: 'Meu parceiro pode estar me monitorando?', a: 'Se ele tem acesso físico ao seu celular e sabe coisas que só o aparelho explicaria, a hipótese é séria. Stalkerware é usado majoritariamente em relações íntimas, não por hackers profissionais. A verificação é técnica, mas o contexto quase nunca é.' },
  { q: 'Existe aplicativo que detecta stalkerware?', a: 'Antivírus e antimalware ajudam, e os melhores já assinam apps espiões conhecidos. Mas a inspeção manual das permissões e da lista de aplicativos é mais confiável, porque o campo muda rápido e o app espião se esconde justamente nas áreas que o scanner cobre pior.' },
  { q: 'Apagar o app resolve tudo?', a: 'Resolve a escuta dali para frente, na maioria dos casos. Não apaga o que já foi capturado: senhas trocadas, mensagens lidas, localização histórica. Por isso a sequência certa é detectar, remover, e então trocar credenciais a partir de outro aparelho.' },
  { q: 'Como evitar que instalem de novo?', a: 'Trava de tela sempre, mesmo com pessoas próximas; instalação restrita a apps de loja oficial; permissões de acessibilidade revisadas de tempos em tempos; e atenção a pedidos de "só olhar rapidinho" o seu celular desbloqueado. O vetor inteiro é o acesso físico.' },
  { q: 'Suspeito que estou sendo vigiada. Por onde começo?', a: 'Se existe risco à sua segurança, comece pelo apoio humano, não pelo app: no Brasil, a Central de Atendimento à Mulher (180) orienta em contexto de violência doméstica, inclusive sobre segurança digital. Tecnologia sem plano de segurança pode aumentar o risco em vez de reduzir.' },
];

export default function StalkerwareAppsEspioes() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Stalkerware: apps espiões',
        description: 'O espião no seu celular costuma ser alguém próximo com acesso físico de poucos minutos: como o stalkerware entra, quais sinais ele deixa, como remover e o que fazer quando há risco de violência.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/stalkerware-apps-espioes',
        primaryKeyword: 'stalkerware',
        lsiKeywords: ['app espião no celular', 'como descobrir app espião', 'monitoramento clandestino', 'como remover app espião', 'celular vigiado por parceiro', 'permissões de acessibilidade espiã', 'violência digital'],
        longTailKeywords: ['como saber se tem app espião no meu celular', 'remover stalkerware do android', 'parceiro monitora meu celular o que fazer', 'app espião escondido sinais'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Ameaças Específicas', url: '/seguranca-mobile/stalkerware-apps-espioes' }, { name: 'Stalkerware', url: '/seguranca-mobile/stalkerware-apps-espioes' }],
        schemaType: 'Article', articleSection: 'Ameaças Específicas', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/checklist-permissoes-celular', '/seguranca-mobile/vpn-no-celular'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Celular brilhando no escuro sobre mesa de cabeceira à noite" eyebrow="Segurança Mobile" category="Ameaças Específicas" icon={EyeOff} title="Stalkerware, o Espião que Alguém Próximo Instalou" lede="Ele não invadiu o seu celular. Pediu emprestado por cinco minutos, e instalou." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Tela de celular iluminando o escuro de um quarto" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>Stalkerware é um aplicativo espião instalado no seu celular sem que você saiba, com um propósito específico: entregar a alguém a sua localização, suas mensagens, suas ligações e o que você digita. Diferente do malware de roubo financeiro, o objetivo aqui é vigilância pessoal.</p>
              <p className="mt-7">E aqui está o detalhe que muda tudo: a porta de entrada não é um link maligno nem uma falha do sistema. É o acesso físico. O agressor quase sempre é alguém próximo, parceiro, ex-parceiro, familiar, que ficou alguns minutos com o aparelho desbloqueado.</p>
              <p className="mt-7">Por isso esta página não termina em configuração de sistema. A parte técnica importa, mas em muitos casos o stalkerware é sintoma de violência doméstica, e a sequência das suas ações precisa proteger a pessoa antes de proteger o aparelho.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={appsAsset} alt="Tela de celular com grade de aplicativos fora de foco" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / Como ele entra" dark>Cinco minutos, <span className="smx-copper-soft font-editorial font-normal italic">uma permissão, um espião.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {COMO_ENTRA.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between"><Accessibility className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">VIA {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={appsAsset} alt="Grade de aplicativos genéricos em tela de celular à noite" caption="Entre dezenas de ícones, um deles trabalha para outra pessoa. O escondido raramente tem nome reconhecível." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={bateriaAsset} alt="Celular na mão exibindo ícone de bateria baixa" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / Os sinais que o espião deixa">O aparelho <span className="smx-editorial">denuncia o dono.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {SINAIS.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between"><Thermometer className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">SINAL {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={bateriaAsset} alt="Ícone de bateria baixa brilhando em tela escura" caption="Gravação e transmissão contínuas custam energia. A bateria que não dura é o sintoma mais comum." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={noiteAsset} alt="Pessoa deitada no escuro olhando a tela do celular" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / Detecção e remoção, na ordem certa" dark>Segurança da pessoa <span className="smx-copper-soft font-editorial font-normal italic">antes da segurança do aparelho.</span></Heading>
            <div className="grid gap-4">
              {REMOCAO.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/checklist-permissoes-celular">Checklist de permissões, passo a passo <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/sair-do-google-sem-trocar-aparelho">Reduza a dependência de contas <ArrowRight /></Link></Button>
            </div>
            <Figure asset={noiteAsset} alt="Pessoa conferindo o celular deitada no escuro" caption="A inspeção noturna que virou rotina costuma ser o primeiro relato de quem descobre o espião." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={rastreadorAsset} alt="Mão instalando pequeno rastreador sob o parachoque de um carro à noite" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="05 / Vigilância além do software">O espião também <span className="smx-editorial">tem bateria e ímã.</span></Heading>
            <motion.div {...reveal(.08)} className="max-w-4xl space-y-7 text-lg leading-[1.75] md:text-xl">
              <p>Nem toda vigilância vem de app. Rastreadores GPS comerciais escondidos em veículos, mochilas e objetos pessoais cumprem o mesmo papel com outra técnica, e são vendidos abertamente. Se a vigilância que você suspeita inclui deslocamentos, vale inspecionar o carro e os itens que viajam com você.</p>
              <p>No celular, os sistemas modernos já avisam sobre rastreadores de terceiros movendo-se junto com você: procure por "aviso de rastreador desconhecido" ou "item que pode rastrear você" nas configurações de segurança, e leve o aviso a sério. Ele existe para casos como este.</p>
            </motion.div>
            <Figure asset={rastreadorAsset} alt="Pequeno rastreador sendo fixado sob a parte inferior de um carro" caption="Um rastreador de dez centavos de bateria responde a uma pergunta que nenhum antivírus cobre: onde essa pessoa esteve." />
          </div>
        </section>

        <FaqSection asset={heroAsset} alt="Celular brilhando no escuro de um quarto" faq={FAQ} />

        <Veredito headline={<>O problema não é o app. <span className="smx-copper-soft font-editorial font-normal italic">É quem instalou.</span></>} paragraphs={[
          'Remover o stalkerware é necessário e é técnico: revisar apps, permissões, acessibilidade, e restaurar de fábrica se precisar. Mas remover sem encarar quem instalou apenas reinicia o contador.',
          'Em contexto de relacionamento abusivo, o aparelho é um dos campos de batalha, e a ordem das ações, apoio, documento, plano, depois técnica, decide a sua segurança.',
          'A regra que fica: ninguém pega o seu celular desbloqueado. Nem por um minuto. Nem por carinho.',
        ]} />

        <TrailSection chapter="Ameaças Específicas" cards={[
          { to: '/seguranca-mobile/checklist-permissoes-celular', title: 'Checklist de permissões', desc: 'Revisão objetiva do que o seu celular já liberou, e o que revogar agora.', icon: ListChecks },
          { to: '/seguranca-mobile/sim-swap-como-funciona', title: 'SIM Swap', desc: 'O golpe administrativo que rouba o seu número sem tocar no aparelho.', icon: BatteryWarning },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: FileWarning },
        ]} />
      </main>
      <span className="hidden"><RadioTower /><LifeBuoy /></span>
    </>
  );
}
