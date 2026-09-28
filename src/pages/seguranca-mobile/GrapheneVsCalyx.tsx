import { useEffect } from 'react';
import { GitCompare, ArrowRight, CheckCircle2, XCircle, ShieldCheck, Fingerprint, Cpu, Layers, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/graphene-vs-calyx/gc-hero.webp';
import playAsset from '@/assets/seguranca-mobile/graphene-vs-calyx/gc-play.webp';
import verdictAsset from '@/assets/seguranca-mobile/graphene-vs-calyx/gc-verdict.webp';
import gosHeroAsset from '@/assets/seguranca-mobile/grapheneos-hero.webp';
import calyxHeroAsset from '@/assets/seguranca-mobile/calyxos-hero.webp';
import permAsset from '@/assets/seguranca-mobile/grapheneos-app-permissions.webp';

const COMPARACAO = [
  { area: 'Criptografia por padrão', gos: 'Ponta a ponta em todas as conversas, sem exceção e sem configuração.', calyx: 'Ponta a ponta em todas as conversas por padrão, com protocolo idêntico.' },
  { area: 'Metadados', gos: 'Coleta mínima documentada publicamente pelo operador do serviço.', calyx: 'Conteúdo protegido, metadado pleno do lado da plataforma.' },
  { area: 'Chats secretos (Telegram)', gos: 'Não é aplicado: o caso não existe no protocolo padrão.', calyx: 'Conversa padrão é legível pelo servidor; chat secreto protege conteúdo.' },
  { area: 'Backup do histórico', gos: 'Sem cópia em nuvem, migração local apenas.', calyx: 'Backup em nuvem opcional, cifrado por senha quando configurado.' },
  { area: 'Identidade', gos: 'Identificador próprio do app, número invisível para contatos.', calyx: 'Número como identidade principal, visibilidade configurável.' },
];

const FAQ = [
  { q: 'GrapheneOS é realmente mais seguro que CalyxOS?', a: 'No escopo de segurança do sistema, sim, e a diferença é verificável: isolamento por perfil de usuário mais restrito, controladores de hardware desligáveis por aplicativo, e velocidade de atualização superior. CalyxOS não é inseguro, e oferece camadas reais, mas o projeto GrapheneOS tem hardening mais profundo e ciclo de correção mais curto.' },
  { q: 'CalyxOS suporta mais aparelhos, isso importa?', a: 'Importa para o custo de entrada. CalyxOS roda em uma lista mais ampla de aparelhos, incluindo alguns fora da linha Pixel, e isso reduz o investimento necessário. GrapheneOS mantém foco em aparelhos Pixel, que são os únicos com boot verificado e atualização de firmware consistente. O suporte mais amplo de um lado tem custo no outro.' },
  { q: 'O que é sandboxed Play Services e microG?', a: 'São dois caminhos diferentes para usar aplicativos que dependem de serviços Google. GrapheneOS roda os serviços oficiais em sandbox, com permissões restritas, sem privilégio de sistema. CalyxOS usa microG, uma implementação livre que emula a API. A escolha é entre confiança no código oficial isolado e confiança em reimplementação sem auditoria completa.' },
  { q: 'Posso trocar de sistema sem perder dados?', a: 'A troca de sistema em um aparelho Android exige desbloqueio do bootloader, e isso apaga o aparelho. Migração real significa: backup completo antes, instalação do sistema, e restauração. O custo é conhecido, e o processo é repetível, mas não é sem perda.' },
  { q: 'Qual é o melhor para iniciante?', a: 'CalyxOS tem entrada mais suave: instalação guiada, aparelhos mais acessíveis, e serviços que funcionam sem configuração extra. GrapheneOS pede mais leitura antes da instalação, e entrega mais controle depois. A escolha honesta é entre a curva de aprendizado que você aceita e a camada de proteção que você quer no fim.' },
];

export default function GrapheneVsCalyx() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'GrapheneOS vs CalyxOS: qual sistema atende o seu modelo de ameaça',
        description: 'Comparação técnica entre GrapheneOS e CalyxOS em segurança, privacidade, suporte a aparelhos, serviços Google e ciclo de atualização, com honestidade sobre limitações de cada sistema.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/graphene-vs-calyx',
        primaryKeyword: 'grapheneos vs calyxos',
        lsiKeywords: ['grapheneos segurança', 'calyxos privacidade', 'android sem google', 'microg', 'sandboxed play services', 'hardening android', 'sistema operacional privado'],
        longTailKeywords: ['grapheneos ou calyxos qual escolher', 'calyxos suporta quais aparelhos', 'grapheneos é difícil de usar', 'microg é seguro'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Sistemas Operacionais', url: '/seguranca-mobile/graphene-vs-calyx' }, { name: 'GrapheneOS vs CalyxOS', url: '/seguranca-mobile/graphene-vs-calyx' }],
        schemaType: 'Article', articleSection: 'Sistemas Operacionais', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/grapheneos', '/seguranca-mobile/sair-do-google-sem-trocar-aparelho'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Dois smartphones de pé em superfície escura, um iluminado em cobre e outro em azul" eyebrow="Segurança Mobile" category="Sistemas Operacionais" icon={GitCompare} title="GrapheneOS e CalyxOS, a Comparação que Não Escolhe por Você" lede="Dois sistemas sérios, filosofias diferentes. A escolha não é sobre qual é o melhor: é sobre qual ameaça você precisa bloquear primeiro, e qual aparelho você tem na mão hoje." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Dois smartphones de pé com luz cobre e azul" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>GrapheneOS e CalyxOS compartilham a mesma premissa: Android sem a vigilância embutida, com foco em privacidade e segurança real. A diferença está na prioridade. GrapheneOS prioriza hardening do sistema, velocidade de atualização e controle granular de hardware. CalyxOS prioriza usabilidade, suporte a mais aparelhos e uma entrada mais suave para quem nunca trocou de sistema.</p>
              <p className="mt-7">Nenhum dos dois é invulnerável, e nenhum elimina o risco de zero-day. Nenhum dos dois substitui prática de segurança do usuário, e nenhum protege contra aplicativo malicioso que você instalou e autorizou. A comparação honesta é sobre camadas, não sobre perfeição.</p>
              <p className="mt-7">Este guia compara os dois sistemas em cinco eixos: aparelhos suportados, segurança, privacidade, serviços Google e custo de entrada. A decisão final depende do aparelho que você tem e da ameaça que você quer reduzir primeiro.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={playAsset} alt="Barra de instalação em progresso em tela de smartphone" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / O que cada um é" dark>Filosofias diferentes, <span className="smx-copper-soft font-editorial font-normal italic">mesma premissa.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              <motion.article {...reveal()} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><ShieldCheck className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">GRAPHENEOS</span></div>
                <h3 className="text-2xl font-black leading-tight tracking-normal text-background">Hardening como projeto</h3>
                <p className="mt-4 text-lg leading-[1.75] text-background/90">Foco em segurança profunda: isolamento entre aplicativos mais restrito, sensores e câmera desligáveis por app, velocidade de atualização acima da média, e suporte a serviços Google em sandbox, com permissões restritas, sem privilégio de sistema. Suporte concentrado na linha Pixel, que é a única com boot verificado e atualização de firmware consistente.</p>
              </motion.article>
              <motion.article {...reveal(.08)} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><Heart className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">CALYXOS</span></div>
                <h3 className="text-2xl font-black leading-tight tracking-normal text-background">Usabilidade como projeto</h3>
                <p className="mt-4 text-lg leading-[1.75] text-background/90">Foco em entrada suave: instalação guiada, lista mais ampla de aparelhos suportados, e serviços Google substituídos por microG, uma implementação livre que emula a API oficial. A troca é entre confiança no código oficial isolado, como faz o GrapheneOS, e confiança em reimplementação sem auditoria completa.</p>
              </motion.article>
            </div>
            <Figure asset={playAsset} alt="Instalação de aplicativo em progresso em tela de smartphone" caption="A instalação de aplicativos funciona nos dois sistemas. A diferença está em como cada um lida com os serviços que esses aplicativos exigem." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={permAsset} alt="Tela de permissões de aplicativo em smartphone sobre mesa escura" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / Comparação eixo a eixo">Cinco eixos, <span className="smx-editorial">sem ranking arbitrário.</span></Heading>
            <div className="grid gap-4">
              {COMPARACAO.map((item, i) => (
                <motion.article key={item.area} {...reveal(i * .05)} className="smx-card group grid gap-4 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[220px_1fr_1fr] md:p-8">
                  <div className="smx-ink text-sm font-black uppercase tracking-[0.15em]">{item.area}</div>
                  <p className="text-base leading-[1.7]"><span className="smx-copper font-bold">GrapheneOS: </span>{item.gos}</p>
                  <p className="text-base leading-[1.7]"><span className="smx-copper font-bold">CalyxOS: </span>{item.calyx}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={gosHeroAsset} alt="Smartphone mostrando tela inicial escura em ambiente noturno" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / O que cada um não faz" dark>Limitações honestas, <span className="smx-copper-soft font-editorial font-normal italic">sem retórica.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              <motion.article {...reveal()} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><XCircle className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">GRAPHENEOS</span></div>
                <p className="text-lg leading-[1.75] text-background/90">Suporte limitado à linha Pixel, o que exige investimento em aparelho específico. Aplicativos que dependem de serviços Google profundos, como alguns de banco e transporte, podem exigir configuração extra. Curva de entrada mais íngreme para quem nunca reinstalou um sistema.</p>
              </motion.article>
              <motion.article {...reveal(.08)} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><XCircle className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">CALYXOS</span></div>
                <p className="text-lg leading-[1.75] text-background/90">microG é uma reimplementação sem auditoria equivalente ao código oficial, e a confiança nela é uma escolha, não uma propriedade comprovada. O ciclo de atualização em aparelhos fora da linha principal pode atrasar em relação ao padrão de segurança esperado.</p>
              </motion.article>
            </div>
            <Figure asset={gosHeroAsset} alt="Smartphone com tela inicial escura em ambiente noturno" caption="Trocar de sistema é uma decisão de camada profunda. Ela exige desbloqueio do bootloader, e isso apaga o aparelho. Migração real significa backup antes, e restauração depois." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={verdictAsset} alt="Mão segurando smartphone com tela escura dividida em luz cobre e azul" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="05 / A decisão por perfil">Escolha pelo que <span className="smx-editorial">você precisa bloquear.</span></Heading>
            <div className="grid gap-4">
              {[
                'Ameaça prioritária: vigilância profunda, malware dirigido, exploração de zero-day. Aqui GrapheneOS tem vantagem verificável em hardening e velocidade de correção. Se este é o seu cenário, a curva de entrada é o custo aceitável.',
                'Ameaça prioritária: telemetria rotineira, dependência de serviços, e aparelho fora da linha Pixel. CalyxOS entrega privacidade real com entrada mais barata e mais aparelhos suportados.',
                'Perfil intermediário: quem já migrou contas e serviços, e quer reduzir a camada do sistema como etapa final. Ambos funcionam, e a escolha entre eles é sobre hardware disponível e apetite por configuração.',
                'Nenhum dos dois substitui prática: permissões revisadas, aplicativos auditados, e segundo fator consistente. A troca de sistema é uma camada, e camadas não substituem hábitos.',
              ].map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card group grid gap-5 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/grapheneos">Guia completo de GrapheneOS <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/sair-do-google-sem-trocar-aparelho">Sair do Google em etapas <ArrowRight /></Link></Button>
            </div>
          </div>
        </section>

        <FaqSection asset={calyxHeroAsset} alt="Smartphone com interface escura iluminada em ambiente noturno" faq={FAQ} />

        <Veredito headline={<>Duas escolhas sérias, <span className="smx-copper-soft font-editorial font-normal italic">ameaças diferentes.</span></>} paragraphs={[
          'GrapheneOS e CalyxOS não competem no mesmo eixo. Um prioriza profundidade de hardening e velocidade de correção, com custo de hardware e curva de entrada. O outro prioriza usabilidade e alcance de aparelhos, com custo na profundidade de auditoria.',
          'A escolha honesta começa no aparelho que você tem e na ameaça que você precisa bloquear primeiro. Hardening profundo só é útil se a ameaça exige. Entrada suave só é útil se você realmente conclui a migração.',
          'A pergunta certa não é qual sistema é o melhor. É se a camada do sistema é o seu gargalo hoje, ou se as camadas de conta, permissões e comunicação ainda têm mais retorno por hora investida.',
        ]} />

        <TrailSection chapter="Sistemas Operacionais" cards={[
          { to: '/seguranca-mobile/grapheneos', title: 'GrapheneOS', desc: 'O guia completo do sistema com hardening real e controle de rádio granular.', icon: ShieldCheck },
          { to: '/seguranca-mobile/sair-do-google-sem-trocar-aparelho', title: 'Sair do Google', desc: 'Reduza a dependência de serviços Google por etapas, sem exigir um celular novo no primeiro dia.', icon: Fingerprint },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: Cpu },
        ]} />
      </main>
    </>
  );
}
