import { useEffect } from 'react';
import { Smartphone, ArrowRight, GitCompare, ShieldCheck, XCircle, RefreshCcw, Layers, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/android-vs-iphone/ai-hero.webp';
import updateAsset from '@/assets/seguranca-mobile/android-vs-iphone/ai-update.webp';
import chipAsset from '@/assets/seguranca-mobile/android-vs-iphone/ai-chip.webp';
import verdictAsset from '@/assets/seguranca-mobile/android-vs-iphone/ai-verdict.webp';
import trackingAsset from '@/assets/seguranca-mobile/iphone-seguro/iphone-tracking-pt.webp';
import vsAsset from '@/assets/seguranca-mobile/iphone-seguro/iphone-vs-graphene-clean.webp';

const VANTAGENS_IOS = [
  'Ciclo de atualização longo e uniforme. A Apple entrega correções de segurança para uma janela ampla de aparelhos ao mesmo tempo, e o fabricante e a operadora não são intermediários dessa entrega.',
  'Revisão centralizada de aplicativos. A App Store filtra todo app publicado, o que reduz, sem eliminar, o volume de software malicioso que chega ao usuário final.',
  'Hardware e sistema desenham juntos. Quem controla chip, sistema e atualizações no mesmo ciclo reage mais rápido a classes inteiras de vulnerabilidade.',
];

const VANTAGENS_ANDROID = [
  'Diversidade de camadas de defesa. Play Protect, sandbox por aplicativo e controles granulares de permissão cobrem cenários que um modelo fechado nem sempre expõe ao usuário.',
  'Ecossistema aberto para quem investe em hardening. O Android permite substituir o sistema inteiro, e projetos como o GrapheneOS exploram essa liberdade para elevar o padrão de segurança acima de qualquer aparelho padrão.',
  'Modelos com política de atualização contratual. Fabricantes sérios hoje publicam 5 a 7 anos de correções, e em alguns casos entregam patches pelo Google Play fora do ciclo do sistema.',
];

const MITOS = [
  'Mito: iPhone é imune. A realidade: o ecossistema fecha portas comuns, mas exploits contra o iOS existem, são explorados em ataques direcionados e aparecem em relatórios públicos de segurança todos os anos.',
  'Mito: Android é sempre mais vulnerável. A realidade: o Android de um fabricante que atualiza rápido e adota controles modernos pode estar mais protegido na prática do que um iPhone antigo sem correção.',
  'Mito: antivírus resolve o problema. A realidade: no celular, o antivírus cobre pouco. O fator decisivo continua sendo o sistema atualizado, as fontes de aplicativo e as permissões concedidas.',
  'Mito: aparelho caro é aparelho seguro. A realidade: preço e segurança caminham juntos com frequência, mas não por definição. A política de atualização e a reputação do fabricante valem mais que a etiqueta.',
];

const DECIDEM = [
  'Quem entrega a atualização. O sistema instalado hoje importa menos do que a correção que chega amanhã. Fabricante que trava patches, ou operadora que atrasa, é o maior risco do lado Android.',
  'De onde vêm os aplicativos. Instalar fora de lojas oficiais anula qualquer arquitetura. A fonte do software é uma decisão de segurança maior que a marca do aparelho.',
  'Quais permissões você concede. Microfone, localização em segundo plano e acessibilidade são vetores reais nos dois sistemas, e nenhum deles te protege de você mesmo.',
  'Quanto tempo o aparelho vive. Aparelho que sai de linha deixa de receber correção. A partir dali, a pergunta não é mais Android ou iPhone, e sim quanto tempo resta de janela de segurança.',
];

const FAQ = [
  { q: 'Android é mais invadido porque tem mais usuários?', a: 'A base maior aumenta o incentivo econômico para ataques genéricos, mas o que define invasão real é o estado de atualização e o comportamento do usuário. Um Android atualizado, com apps de fonte confiável e permissões mínimas, é difícil de comprometer. Um iPhone sem correção, com apps instalados fora da App Store, não é.' },
  { q: 'Qual é o aparelho mais seguro hoje?', a: 'Do ponto de vista técnico, a resposta mais defendida por quem estuda o tema é um Pixel com GrapheneOS, pela combinação de hardware com suporte a atualização e camadas de isolamento que nenhum sistema de fábrica oferece. Entre sistemas de fábrica, iPhones recentes e Androids de fabricantes com política de atualização longa estão no mesmo grupo de ponta, com diferenças de estilo, não de categoria.' },
  { q: 'Comprar iPhone resolve minha segurança?', a: 'Resolve parte. O iOS entrega um padrão alto de fábrica, mas nenhuma arquitetura compensa senhas reutilizadas, 2FA por SMS, backups na nuvem sem reflexão e apps com permissões excessivas. Segurança é o conjunto, não a caixa.' },
  { q: 'Aparelho Android antigo pode ser seguro?', a: 'Se ele recebe correções de segurança atuais, sim. Se a última atualização é de anos atrás, não: cada vulnerabilidade conhecida e sem patch é uma porta aberta, independente da marca ou do preço do aparelho.' },
  { q: 'Bloqueador de anúncios e VPN mudam essa equação?', a: 'Reduzem a superfície de rastreamento e exposição na rede, e são recomendados em ambos os sistemas. Não corrigem o sistema operacional nem substituem a atualização: são camadas que convivem com a decisão de aparelho, não a substituem.' },
];

export default function AndroidMaisInseguroQueIphone() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Android é mais inseguro que iPhone, ou é mito?',
        description: 'Uma comparação sem torcida entre arquitetura, atualizações, aplicativos, fabricante e comportamento do usuário: o que realmente decide a segurança do seu celular.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/android-mais-inseguro-que-iphone',
        primaryKeyword: 'android é mais inseguro que iphone',
        lsiKeywords: ['segurança android vs ios', 'atualizações de segurança android', 'política de atualização iphone', 'grapheneos segurança', 'fabricante android atualização', 'sandbox android', 'app store revisão'],
        longTailKeywords: ['android é mais inseguro que iphone ou é mito', 'qual celular é mais seguro android ou iphone', 'fabricante android trava atualizações de segurança', 'grapheneos é mais seguro que ios'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Curiosidades / Mitos', url: '/seguranca-mobile/android-mais-inseguro-que-iphone' }, { name: 'Android vs iPhone', url: '/seguranca-mobile/android-mais-inseguro-que-iphone' }],
        schemaType: 'Article', articleSection: 'Curiosidades / Mitos', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/iPhone-e-seguro-mesmo', '/seguranca-mobile/grapheneos'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Dois smartphones lado a lado sobre bancada escura, com iluminação dividida em tom cobre e tom frio" eyebrow="Segurança Mobile" category="Curiosidades / Mitos" icon={Smartphone} title="Android é Mais Inseguro que iPhone?" lede="A pergunta erra o alvo. Nenhum sistema é invulnerável, e o que decide na prática não é a marca, é o ciclo de atualização e o comportamento de quem usa." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Dois smartphones sobre bancada escura" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>A resposta curta: depende menos de Android ou iPhone e mais de qual aparelho, de qual fabricante, com qual política de atualização e com qual comportamento de uso. A comparação binária é cômoda para marketing e inútil para decisão.</p>
              <p className="mt-7">O Android, em sua base técnica, é o sistema mais atacado do mundo por volume, o que também significa que ele é o mais estudado e o mais remendado. O iOS fecha superfícies comuns por design fechado, mas não é imune: exploits contra ele existem, são vendidos por quantias altas no mercado de exploração e aparecem em relatórios públicos de segurança.</p>
              <p className="mt-7">O que a comparação esconde é o fator dominante: um Android atualizado e conduzido com disciplina vence um iPhone parado no tempo. E um iPhone atualizado vence um Android de fabricante que entrega patches com dois anos de atraso. A segurança vive no ciclo de correção, não na logomarca.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={chipAsset} alt="Macro de placa de circuito com processador em destaque" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / Onde cada sistema leva vantagem" dark>Duas arquiteturas, <span className="smx-copper-soft font-editorial font-normal italic">duas filosofias.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="smx-card-dark rounded-lg border p-8 backdrop-blur-xl md:p-10">
                <div className="mb-6 flex items-center justify-between"><GitCompare className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">iOS</span></div>
                <div className="space-y-4 text-lg leading-[1.75] text-background/90">{VANTAGENS_IOS.map((t) => <p key={t}>{t}</p>)}</div>
              </div>
              <div className="smx-card-dark rounded-lg border p-8 backdrop-blur-xl md:p-10">
                <div className="mb-6 flex items-center justify-between"><Layers className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">ANDROID</span></div>
                <div className="space-y-4 text-lg leading-[1.75] text-background/90">{VANTAGENS_ANDROID.map((t) => <p key={t}>{t}</p>)}</div>
              </div>
            </div>
            <Figure asset={chipAsset} alt="Processador de smartphone em macro com luz cobre" caption="O hardware define o teto de proteção, mas é o ciclo de correção que decide quanto desse teto você realmente alcança." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={updateAsset} alt="Smartphone exibindo atualização de sistema em andamento" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / O que decide na prática">O ciclo de correção <span className="smx-editorial">vale mais que a marca.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {DECIDEM.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between"><RefreshCcw className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">FATOR {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={updateAsset} alt="Tela de smartphone com atualização de sistema em progresso" caption="A atualização que chega hoje protege mais do que qualquer recurso anunciado na caixa do aparelho." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={trackingAsset} alt="Smartphone na mão em ambiente urbano noturno" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / Mitos destrinchados" dark>O que a conversa de bar <span className="smx-copper-soft font-editorial font-normal italic">não conta.</span></Heading>
            <div className="grid gap-4">
              {MITOS.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full"><XCircle className="h-6 w-6" /></div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/iPhone-e-seguro-mesmo">O iPhone é seguro mesmo? <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/grapheneos">GrapheneOS, o hardening máximo <ArrowRight /></Link></Button>
            </div>
            <Figure asset={trackingAsset} alt="Pessoa usando smartphone à noite na cidade" caption="Nenhum sistema compensa hábitos arriscados. O comportamento do usuário é a variável que os dois ecossistemas dividem por igual." />
          </div>
        </section>

        <FaqSection asset={verdictAsset} alt="Mão segurando smartphone em ambiente escuro com luz da tela" faq={FAQ} />

        <Veredito headline={<>A pergunta certa é <span className="smx-copper-soft font-editorial font-normal italic">outra.</span></>} paragraphs={[
          'Android e iPhone carregam arquiteturas maduras, com classes de falha diferentes e respostas diferentes para as mesmas ameaças. Escolher entre eles por segurança pura é escolher entre dois tetos altos com atributos distintos.',
          'O que separa um aparelho seguro de um aparelho exposto, na prática, é a atualização corrente, a fonte dos aplicativos, as permissões concedidas e o tempo de vida que ainda resta na janela de correção.',
          'Se o objetivo é o teto máximo de hardening, a resposta técnica hoje é um Pixel com GrapheneOS. Se o objetivo é equilíbrio entre privacidade, ecossistema e suporte longo, iPhone recente e Android de fabricante sério ocupam o mesmo patamar, e a decisão passa por outros critérios.',
        ]} />

        <TrailSection chapter="Curiosidades / Mitos" cards={[
          { to: '/seguranca-mobile/grapheneos', title: 'GrapheneOS', desc: 'O sistema que empurra o Android ao limite de hardening, com limites honestos sobre o que ele não resolve.', icon: Cpu },
          { to: '/seguranca-mobile/calyxos', title: 'CalyxOS', desc: 'A alternativa pragmática para quem quer menos Google sem abrir mão da rotina.', icon: ShieldCheck },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: Smartphone },
        ]} />
      </main>
    </>
  );
}
