import { useEffect } from 'react';
import { Trash2, ArrowRight, Database, ShieldCheck, HardDrive, RefreshCcw, Cloud, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/apagar-app/ap-hero.webp';
import resetAsset from '@/assets/seguranca-mobile/apagar-app/ap-reset.webp';
import backupAsset from '@/assets/seguranca-mobile/apagar-app/ap-backup.webp';
import armazenamentoAsset from '@/assets/seguranca-mobile/apagar-app/ap-armazenamento.webp';
import datacenterAsset from '@/assets/seguranca-mobile/operadora/op-datacenter.webp';
import permissoesAsset from '@/assets/seguranca-mobile/stalkerware/stk-permissoes.webp';

const REMOVE = [
  'O código do aplicativo: o binário para de executar, notificações cessam, o app não volta a ler sensores, microfone ou localização no aparelho.',
  'Os dados locais do app: arquivos, cache e, na maioria dos casos, o token de acesso armazenado no aparelho.',
  'A superfície de coleta local: enquanto instalado, o app podia ler o que as permissões permitiam. Desinstalado, essa coleta local para.',
];

const FICA = [
  'A cópia do app no backup da nuvem: se o backup do sistema inclui apps e dados, reinstalar restaura tudo, inclusive o estado que você imaginava ter apagado.',
  'Os dados no servidor da empresa: perfis, histórico de uso, identificadores e o vínculo com sua conta continuam no lado remoto. Desinstalar não é pedido de exclusão.',
  'Identificadores de hardware: IMEI, identificadores de publicidade e endereço de rede continuam associados à sua pessoa por quem já os registrou antes.',
  'Perfis publicitários e bases de terceiros: o que foi vendido, cruzado ou agregado antes da desinstalação segue circulando por fora.',
];

const PROCEDIMENTO = [
  'Revogue todas as permissões antes de apagar: localização, microfone, câmera, contatos e acesso em segundo plano. Isso corta a coleta no momento em que o app ainda existe.',
  'Desvincule contas e remova dados do lado do serviço: entre no app ou no site da empresa e use as ferramentas de exclusão de conta e de dados, quando existirem. A desinstalação local não faz isso por você.',
  'Desative backups automáticos para o app: se o backup do sistema guarda o estado do app, reinstalar reconstrói tudo. Para dados sensíveis, considere excluir o app dos backups antes de removê-lo.',
  'Só então desinstale: com permissões revogadas, vínculos desfeitos e backups tratados, a remoção local encerra a coleta que dependia do app.',
  'Se a preocupação é o aparelho todo, avalie o reset de fábrica: apaga os dados locais do aparelho, mas não toca em cópias remotas nem em identificadores de hardware.',
];

const FAQ = [
  { q: 'Desinstalar um app para o rastreamento?', a: 'Para a coleta local, sim. O app desinstalado não lê mais nada no seu aparelho. Mas o que a empresa já coletou, já vinculou à sua conta e já compartilhou com terceiros continua existindo no lado do servidor, e os identificadores do aparelho permanecem associados a você para quem os registrou.' },
  { q: 'O app consegue rastrear depois de desinstalado?', a: 'Não diretamente. Sem o binário instalado, não existe código executando no seu aparelho. O que persiste é o rastro remoto: conta, perfil, histórico e identificadores que continuam sendo usados por quem os tem.' },
  { q: 'Reset de fábrica apaga tudo?', a: 'Apaga os dados locais do aparelho. Não apaga cópias na nuvem, registros em servidores de terceiros, nem o IMEI e outros identificadores que já circularam por fora. É uma limpeza do aparelho, não do mundo.' },
  { q: 'Excluir a conta do serviço resolve?', a: 'É a ferramenta correta para dados do lado do servidor, quando o serviço oferece exclusão real e o processo é cumprido. Leia o aviso de privacidade: em muitos casos a exclusão da conta não apaga todos os dados, e parte fica retida por prazo legal ou comercial.' },
  { q: 'E se o app for malware?', a: 'Aí a desinstalação é urgente e insuficiente. App espião pode deixar rastros, explorar permissões de acessibilidade concedidas a outros apps ou manter persistência por meio de perfis administrativos. O caminho completo, incluindo quando considerar o reset, está no dossiê de stalkerware deste silo.' },
];

export default function ApagarAppRastreamentoContinua() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Apagar o app resolve ou o rastreamento continua?',
        description: 'Dados locais, identificadores, backups, contas e perfis que podem sobreviver à desinstalação: o que apagar o app faz, e o que ele não faz.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/apagar-app-rastreamento-continua',
        primaryKeyword: 'apagar app resolve o rastreamento',
        lsiKeywords: ['desinstalar app para de rastrear', 'dados de app após desinstalação', 'backup na nuvem restaura app', 'identificadores de hardware celular', 'reset de fábrica apaga rastreamento', 'exclusão de conta lgpd', 'perfis publicitários mobile'],
        longTailKeywords: ['apagar o app encerra o rastreamento', 'app desinstalado continua coletando dados', 'o que sobra depois de desinstalar um app', 'reset de fábrica remove rastreamento de apps'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Curiosidades / Mitos', url: '/seguranca-mobile/apagar-app-rastreamento-continua' }, { name: 'Apagar o App', url: '/seguranca-mobile/apagar-app-rastreamento-continua' }],
        schemaType: 'Article', articleSection: 'Curiosidades / Mitos', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/stalkerware-apps-espioes', '/seguranca-mobile/checklist-permissoes-celular'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Dedo pressionando um ícone de aplicativo na tela de um smartphone em ambiente noturno" eyebrow="Segurança Mobile" category="Curiosidades / Mitos" icon={Trash2} title="Apagar o App Encerra o Rastreamento?" lede="O que sai do seu aparelho é o código. O que não sai com ele: a cópia na nuvem, o perfil no servidor e os identificadores do hardware." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Dedo removendo aplicativo da tela do celular" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>A desinstalação encerra a coleta no aparelho. O aplicativo deixa de existir como código em execução, perde acesso a sensores e permissões e para de enviar telemetria. Nessa camada, a resposta é um sim limpo.</p>
              <p className="mt-7">O que o gesto de apagar não faz: apagar o perfil que a empresa montou sobre você, remover cópias guardadas no backup da nuvem, desassociar o IMEI e outros identificadores do seu aparelho ou recolher dados que já foram vendidos e agregados por terceiros.</p>
              <p className="mt-7">Rastreamento tem dois lados, o local e o remoto. O gesto de desinstalar atua no local. Para o remoto, existem ferramentas específicas, e elas exigem ação deliberada, não um toque na tela inicial.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={armazenamentoAsset} alt="Placa interna de smartphone exposta com chip de armazenamento" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / O que sai com o app" dark>A parte que <span className="smx-copper-soft font-editorial font-normal italic">realmente termina.</span></Heading>
            <div className="grid gap-4">
              {REMOVE.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full"><HardDrive className="h-6 w-6" /></div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={armazenamentoAsset} alt="Placa de smartphone aberta com chip de armazenamento em destaque" caption="O código e os dados locais morrem com a desinstalação. É a parte da equação que o toque na tela realmente resolve." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={datacenterAsset} alt="Corredor de servidores em data center" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / O que sobrevive fora">O outro lado <span className="smx-editorial">da desinstalação.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {FICA.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between">{i === 0 ? <Cloud className="smx-copper h-7 w-7" /> : <Database className="smx-copper h-7 w-7" />}<span className="smx-muted text-xs font-black tracking-[0.25em]">PERMANECE {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={datacenterAsset} alt="Servidores em data center iluminados por corredores frios" caption="A cópia remota do seu histórico não sabe que você apagou o ícone da tela inicial. Ela segue lá até que uma ação deliberada a remova." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={permissoesAsset} alt="Tela de permissões de aplicativo em smartphone" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / O procedimento completo" dark>Na ordem certa, <span className="smx-copper-soft font-editorial font-normal italic">sem atalhos.</span></Heading>
            <div className="grid gap-4">
              {PROCEDIMENTO.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/checklist-permissoes-celular">Checklist de permissões <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/stalkerware-apps-espioes">Stalkerware: resposta completa <ArrowRight /></Link></Button>
            </div>
            <Figure asset={permissoesAsset} alt="Painel de permissões de aplicativo exibido no celular" caption="Revogar permissões antes de apagar encerra a coleta no exato momento em que o app ainda tem poder para coletar." />
          </div>
        </section>

        <FaqSection asset={backupAsset} alt="Smartphone conectado a armazenamento externo para backup" faq={FAQ} />

        <Veredito headline={<>Metade do problema. <span className="smx-copper-soft font-editorial font-normal italic">A metade errada, sozinha.</span></>} paragraphs={[
          'Apagar o app é a parte fácil e a parte menor. Ela encerra o que roda no seu aparelho, e isso já é proteção real contra coleta local contínua.',
          'A parte que decide o tamanho do rastro é remota: contas, backups, perfis, identificadores e bases de terceiros. Essa parte exige exclusão deliberada, revisão de backups e, quando o caso pede, reset do aparelho.',
          'Faça na ordem: permissões revogadas, vínculos desfeitos, backups tratados, só então o ícone apagado. E trate identificadores de hardware como um dado que nunca volta.',
        ]} />

        <TrailSection chapter="Curiosidades / Mitos" cards={[
          { to: '/seguranca-mobile/stalkerware-apps-espioes', title: 'Stalkerware: apps espiões', desc: 'Quando o app a remover é um espião, a sequência de remoção muda e exige cuidado.', icon: ShieldCheck },
          { to: '/seguranca-mobile/imei-rastreia-sem-chip', title: 'IMEI rastreia sem chip?', desc: 'Os identificadores que sobrevivem a tudo, incluindo à desinstalação.', icon: KeyRound },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: Trash2 },
        ]} />
      </main>
    </>
  );
}
