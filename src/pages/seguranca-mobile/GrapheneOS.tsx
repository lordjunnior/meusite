import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, BriefcaseBusiness, CheckCircle2, Cpu, Database, ExternalLink,
  Fingerprint, HardDrive, Layers3, LockKeyhole, Network, RadioTower,
  RefreshCw, ShieldCheck, Smartphone, TriangleAlert, Users, Wrench,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import heroAsset from '@/assets/seguranca-mobile/grapheneos-hero.jpg.asset.json';
import logoAsset from '@/assets/seguranca-mobile/grapheneos-logo.svg.asset.json';
import bancadaAsset from '@/assets/seguranca-mobile/grapheneos-bancada.jpg.asset.json';
import arquiteturaAsset from '@/assets/seguranca-mobile/grapheneos-arquitetura.jpg.asset.json';
import pixelsAsset from '@/assets/seguranca-mobile/grapheneos-pixels.jpg.asset.json';
import appsAsset from '@/assets/seguranca-mobile/grapheneos-apps.jpg.asset.json';
import instalacaoAsset from '@/assets/seguranca-mobile/grapheneos-instalacao.jpg.asset.json';
import redeAsset from '@/assets/seguranca-mobile/grapheneos-rede.jpg.asset.json';
import diagnosticoAsset from '@/assets/seguranca-mobile/grapheneos-diagnostico.jpg.asset.json';

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.78, delay, ease: EASE },
});

const ARCHITECTURE = [
  { icon: Layers3, title: 'Sandbox reforçado', text: 'O GrapheneOS preserva o modelo de isolamento do Android e fortalece suas fronteiras. Aplicativos continuam separados por identidade, armazenamento e permissões, reduzindo a possibilidade de um incidente local alcançar todo o ativo.' },
  { icon: Cpu, title: 'Mitigações contra exploração', text: 'hardened_malloc, endurecimento do kernel e controles adicionais dificultam a exploração de classes recorrentes de corrupção de memória. São camadas de contenção, não uma promessa de invulnerabilidade.' },
  { icon: Fingerprint, title: 'Verified Boot e Titan M2', text: 'Nos Pixels compatíveis, o bootloader pode ser novamente bloqueado após a instalação. A cadeia de inicialização verifica a assinatura do sistema, enquanto o elemento seguro protege chaves e apoia a atestação de integridade.' },
  { icon: Database, title: 'Permissões com governança', text: 'Rede, sensores, câmera, microfone e localização podem ser restringidos por aplicativo. A organização transforma acesso implícito em decisão documentável e revisável.' },
];

const DECISION = [
  { title: 'Hardware oficialmente suportado', text: 'Use somente um Google Pixel presente na lista oficial do projeto. Outros aparelhos não recebem builds oficiais porque não cumprem, em conjunto, os requisitos de firmware, elemento seguro, atualizações e relock com chave customizada.' },
  { title: 'Bootloader desbloqueável', text: 'A opção de desbloqueio OEM precisa estar disponível. Unidades vinculadas a determinadas operadoras, especialmente importadas, podem ter bloqueio permanente. Confirme antes da compra.' },
  { title: 'Janela de suporte suficiente', text: 'A vida útil do projeto acompanha o suporte completo de segurança do fabricante. Para uso corporativo, compre a geração mais recente que o orçamento comportar e registre a data de fim de suporte.' },
  { title: 'Plano para aplicativos críticos', text: 'Mapeie banco, governo, autenticação, MDM, comunicação e assinatura digital antes da migração. Compatibilidade não deve ser presumida a partir de relatos isolados.' },
];

const INSTALL = [
  { title: 'Inventarie e preserve', text: 'Registre aplicativos, contas, chaves de recuperação e autenticadores. Faça duas cópias verificadas dos dados essenciais. O desbloqueio do bootloader apaga completamente o aparelho.' },
  { title: 'Valide aparelho, cabo e estação', text: 'Confirme o modelo suportado, o desbloqueio OEM e um cabo USB-C com dados estáveis. Use um computador confiável, energia contínua e navegador compatível com WebUSB.' },
  { title: 'Use somente o instalador oficial', text: 'O web installer do GrapheneOS é o método recomendado para a maioria dos usuários. Guias de terceiros envelhecem, podem omitir etapas e elevam o risco operacional.' },
  { title: 'Instale sem interromper', text: 'Siga a sequência exibida, não desconecte o cabo e não altere o estado do navegador. Se houver falha, preserve a tela e a mensagem antes de tentar novamente.' },
  { title: 'Bloqueie novamente o bootloader', text: 'A instalação segura não termina no flash. O relock restaura a proteção de inicialização verificada com a chave do GrapheneOS e impede alterações persistentes não autorizadas.' },
  { title: 'Valide e documente', text: 'Confirme a tela de boot, a versão instalada, as atualizações e o estado do Auditor. Em ambiente corporativo, registre modelo, responsável, data, política de perfis e aplicativos aprovados.' },
];

const OPERATIONS = [
  { icon: RefreshCw, title: 'Atualização contínua', text: 'Patches são parte do controle, não manutenção opcional. Mantenha atualizações automáticas e defina prazo para retirar aparelhos sem suporte.' },
  { icon: Users, title: 'Separação por perfis', text: 'Isole vida pessoal, aplicativos corporativos e serviços Google conforme o risco. Perfis reduzem correlação e limitam o impacto de um aplicativo comprometido.' },
  { icon: RadioTower, title: 'Política de rede', text: 'Desative 2G quando a operadora oferecer VoLTE confiável. A medida reduz ataques por downgrade, mas não elimina IMSI catchers nem o rastreamento inerente à rede celular.' },
  { icon: Wrench, title: 'Resposta a incidentes', text: 'Defina revogação de sessões, troca de credenciais, preservação de evidências e restauração. Segurança móvel sem procedimento de incidente é apenas configuração.' },
];

const FAQ = [
  { q: 'Como o GrapheneOS mantém compatibilidade com aplicativos corporativos sem conceder privilégios de sistema ao Google?', a: 'O Sandboxed Google Play instala Play Services, Play Store e Google Services Framework como aplicativos comuns. Eles ficam submetidos ao sandbox e às permissões do Android, sem o acesso privilegiado recebido no sistema de fábrica. A rede continua disponível por padrão, e qualquer permissão concedida continua produzindo exposição. Para maior separação, a organização pode manter esses serviços em um perfil dedicado.' },
  { q: 'O isolamento de memória impede exploits zero-day?', a: 'Não. hardened_malloc e outras mitigações tornam diversas classes de corrupção de memória mais difíceis de explorar e podem converter uma exploração em falha controlada. Nenhum sistema elimina zero-days. O resultado depende da combinação entre redução da superfície de ataque, isolamento, patches rápidos, senha forte e disciplina operacional.' },
  { q: 'Por que o GrapheneOS exige um Google Pixel?', a: 'O suporte oficial depende de um conjunto raro de propriedades: bootloader desbloqueável e novamente bloqueável com chave de Verified Boot customizada, atualizações completas de firmware, elemento seguro, segurança física moderna e ciclo de suporte previsível. O Pixel reúne esses requisitos. A lista muda ao longo do tempo e deve ser confirmada no site oficial antes da aquisição.' },
  { q: 'Como Verified Boot e Titan M2 protegem o ativo?', a: 'Verified Boot valida criptograficamente cada estágio da inicialização e sinaliza alterações não autorizadas. O Titan M2 protege material criptográfico e apoia funções de atestação e resistência a ataques físicos. Essas camadas elevam a confiança no estado do dispositivo, mas dependem de firmware atualizado, configuração correta e uma cadeia de custódia controlada.' },
  { q: 'O GrapheneOS bloqueia IMSI catchers?', a: 'Não completamente. A opção de desativar 2G reduz ataques de downgrade para uma tecnologia mais fraca, mas interceptadores podem operar em gerações posteriores e a operadora continua conhecendo a localização aproximada do SIM. Eliminar essa exposição exige não usar a rede celular, não apenas trocar o sistema operacional.' },
  { q: 'Aplicativos bancários e governamentais funcionam?', a: 'Muitos funcionam, especialmente com Sandboxed Google Play, mas não existe garantia universal. Alguns exigem Play Integrity ou políticas de atestação que não reconhecem o GrapheneOS. Teste cada aplicativo crítico em um aparelho piloto antes de aprovar a migração e mantenha uma alternativa operacional documentada.' },
  { q: 'A randomização de MAC impede rastreamento por Wi-Fi?', a: 'Ela reduz a correlação entre redes ao apresentar identificadores diferentes do endereço físico. Por padrão, o Android moderno tende a manter um endereço aleatório persistente por rede salva. Fingerprinting, autenticação do portal e padrões de tráfego ainda podem correlacionar o dispositivo. É uma camada útil, não anonimato completo.' },
  { q: 'GrapheneOS substitui MDM, EDR ou política corporativa?', a: 'Não. O sistema fortalece o endpoint, mas governança exige inventário, identidade, política de acesso, gestão de aplicativos, logs compatíveis, resposta a incidentes e descarte seguro. Antes de adoção em escala, valide as funções exigidas pelo MDM ou EMM da organização em um piloto controlado.' },
  { q: 'É necessário instalar Google Play?', a: 'Não. O GrapheneOS funciona sem serviços Google. A instalação é opcional e deve responder a uma necessidade de compatibilidade identificada. Quanto menor o conjunto de aplicativos e permissões, menor a superfície operacional. A decisão deve ser tomada por perfil de uso, não por conveniência automática.' },
  { q: 'O que acontece quando um Pixel perde suporte?', a: 'Sem atualizações completas de firmware e segurança, o ativo deixa de atender ao objetivo de uma plataforma endurecida. A organização deve planejar substituição antes do fim de suporte, retirar credenciais, apagar o aparelho de forma segura e registrar o descarte ou a mudança de finalidade.' },
];

function Figure({ asset, alt, caption }: { asset: { url: string }; alt: string; caption: string }) {
  return (
    <motion.figure {...reveal(0.08)} className="group relative my-12 overflow-hidden rounded-lg graphene-image-shadow">
      <img src={asset.url} alt={alt} loading="lazy" decoding="async" width={1536} height={1024} className="h-[330px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035] md:h-[520px]" />
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-foreground/85 to-transparent px-6 pb-5 pt-16 text-sm font-semibold text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{caption}</figcaption>
    </motion.figure>
  );
}

function Heading({ chapter, title, accent, dark = false }: { chapter: string; title: string; accent: string; dark?: boolean }) {
  return (
    <motion.div {...reveal()} className="mb-14 max-w-5xl">
      <span className={dark ? 'graphene-copper-soft text-xs font-bold uppercase tracking-[0.3em]' : 'graphene-copper text-xs font-bold uppercase tracking-[0.3em]'}>{chapter}</span>
      <h2 className={dark ? 'mt-5 text-[clamp(2.4rem,6vw,5.7rem)] font-black leading-none tracking-normal text-background' : 'graphene-ink mt-5 text-[clamp(2.4rem,6vw,5.7rem)] font-black leading-none tracking-normal'}>
        {title} <span className={dark ? 'graphene-copper-soft font-editorial font-normal italic' : 'graphene-editorial'}>{accent}</span>
      </h2>
    </motion.div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 180]);
  return (
    <section className="relative min-h-[88vh] overflow-hidden graphene-teal">
      <motion.img style={{ y }} src={heroAsset.url} alt="Google Pixel em bancada profissional preparado para implantação do GrapheneOS" width={1920} height={1088} fetchPriority="high" decoding="async" className="absolute inset-0 h-[110%] w-full object-cover" />
      <div className="graphene-hero-overlay absolute inset-0" />
      <div className="relative z-10 flex min-h-[88vh] max-w-[1600px] flex-col justify-end px-6 pb-16 pt-36 md:px-12 md:pb-24 lg:px-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: EASE }} className="mb-7 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-background/95 p-2.5 shadow-xl"><img src={logoAsset.url} alt="Marca oficial do GrapheneOS" width={48} height={48} /></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-background/70">Segurança Mobile</p><p className="text-2xl font-black tracking-normal text-background">GrapheneOS</p></div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: .1, ease: EASE }} className="max-w-[15ch] text-[clamp(3rem,8vw,7.4rem)] font-black leading-[.92] tracking-normal text-background">
          GrapheneOS para segurança e privacidade móvel.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .35, ease: EASE }} className="mt-7 max-w-3xl text-lg leading-relaxed text-background/85 md:text-2xl">
          Controle o endpoint, reduza a superfície de ataque e trate dados móveis como ativos de governança. Um guia técnico de decisão, instalação e operação, escrito com a experiência de 11 anos de bancada.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="graphene-btn-dark graphene-focus h-13 px-7 text-sm font-bold"><a href="#decisao">Avaliar compatibilidade <ArrowRight /></a></Button>
          <Button asChild size="lg" variant="outline" className="graphene-focus h-13 border-background/35 bg-background/10 px-7 text-sm font-bold text-background hover:bg-background/20 hover:text-background"><a href="#instalacao">Planejar implantação</a></Button>
        </motion.div>
      </div>
    </section>
  );
}

export default function GrapheneOS() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'GrapheneOS: Segurança e Privacidade Mobile',
        description: 'Guia técnico do GrapheneOS: arquitetura, Pixels compatíveis, apps corporativos, instalação segura, governança móvel e limitações reais.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/grapheneos',
        primaryKeyword: 'GrapheneOS',
        lsiKeywords: ['segurança mobile corporativa', 'Android seguro', 'GrapheneOS Pixel', 'privacidade móvel', 'Sandboxed Google Play'],
        longTailKeywords: ['como instalar GrapheneOS com segurança', 'GrapheneOS funciona com app de banco', 'celular Pixel para empresa', 'GrapheneOS segurança corporativa'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'GrapheneOS', url: '/seguranca-mobile/grapheneos' }],
        schemaType: 'TechArticle', articleSection: 'Segurança Mobile',
        relatedPages: ['/seguranca-mobile/calyxos', '/soberania-organica/defesa-digital-pessoal', '/soberania-organica/comunicacao-segura'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />
      <main className="graphene-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero />

        <section className="px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="lg:col-span-3"><div className="sticky top-24"><span className="graphene-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Decisão executiva</span><div className="graphene-rule mt-5 h-0.5 w-16" /></div></motion.aside>
            <div className="lg:col-span-9">
              <motion.h2 {...reveal(.08)} className="graphene-ink text-[clamp(2.5rem,6vw,5.8rem)] font-black leading-none tracking-normal">Segurança móvel começa pelo <span className="graphene-editorial">controle do ativo.</span></motion.h2>
              <motion.div {...reveal(.14)} className="mt-10 grid gap-8 text-lg leading-[1.75] md:grid-cols-2 md:text-xl">
                <p>GrapheneOS é um sistema móvel de código aberto baseado no Android Open Source Project. Seu objetivo não é produzir aparência de segurança. É fortalecer isolamento, permissões, memória, inicialização e atualização contra adversários reais, preservando compatibilidade com aplicativos Android.</p>
                <p>No ambiente profissional, isso muda a pergunta. Em vez de aceitar a telemetria e os privilégios predefinidos pelo fornecedor, a organização define quais serviços existem, quais dados cada aplicativo alcança e quando o ativo deve ser substituído.</p>
              </motion.div>
              <Figure asset={bancadaAsset} alt="Técnico validando Google Pixel em bancada antiestática antes da instalação do GrapheneOS" caption="Onze anos de bancada aplicados à validação do ativo antes do primeiro comando." />
              <motion.blockquote {...reveal(.1)} className="graphene-ink border-l-4 graphene-border py-3 pl-8 font-editorial text-2xl italic leading-relaxed md:text-4xl">O objetivo não é confiar mais. É reduzir o que precisa ser confiado e tornar cada exceção visível.</motion.blockquote>
            </div>
          </div>
        </section>

        <section className="graphene-teal px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / Arquitetura de segurança" title="Defesas em camadas." accent="Sem promessas absolutas." dark />
            <div className="grid gap-5 md:grid-cols-2">
              {ARCHITECTURE.map((item, i) => <motion.article key={item.title} {...reveal(i * .07)} className="graphene-card-dark group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10"><item.icon className="graphene-copper-soft mb-6 h-7 w-7 transition-transform duration-500 group-hover:scale-110"/><h3 className="text-2xl font-black tracking-normal text-background">{item.title}</h3><p className="mt-4 text-base leading-relaxed text-background/75 md:text-lg">{item.text}</p></motion.article>)}
            </div>
            <Figure asset={arquiteturaAsset} alt="Representação física das camadas isoladas de aplicativos e perfis no GrapheneOS" caption="Isolamento útil é aquele que permanece verificável durante a operação." />
            <motion.div {...reveal(.1)} className="mt-10 flex gap-4 rounded-lg border border-background/15 bg-background/5 p-7"><TriangleAlert className="graphene-copper-soft mt-1 shrink-0"/><p className="text-lg leading-relaxed text-background/80"><strong className="text-background">Limite técnico:</strong> GrapheneOS dificulta exploração e reduz impacto. Não torna o aparelho invulnerável, não elimina zero-days e não substitui senha forte, atualização, treinamento e resposta a incidentes.</p></motion.div>
          </div>
        </section>

        <section id="decisao" className="scroll-mt-16 px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / Compatibilidade e aquisição" title="O aparelho correto é parte" accent="da política de segurança." />
            <p className="graphene-muted -mt-7 max-w-3xl text-lg leading-relaxed md:text-xl">A decisão não começa no instalador. Começa na procedência do Pixel, na possibilidade de bloquear novamente o bootloader e na janela restante de atualizações.</p>
            <div className="mt-12 grid gap-5 md:grid-cols-2">{DECISION.map((item, i) => <motion.article key={item.title} {...reveal(i * .07)} className="graphene-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"><span className="graphene-copper text-xs font-black tracking-[0.25em]">0{i + 1}</span><h3 className="graphene-ink mt-4 text-2xl font-black tracking-normal">{item.title}</h3><p className="mt-3 text-lg leading-relaxed">{item.text}</p></motion.article>)}</div>
            <Figure asset={pixelsAsset} alt="Quatro smartphones Google Pixel completos com telas ligadas para avaliação de compatibilidade" caption="Modelo, procedência e suporte restante precisam entrar no inventário antes da compra." />
            <Button asChild size="lg" className="graphene-btn-primary graphene-focus h-13 px-7 font-bold"><a href="https://grapheneos.org/faq#device-support" target="_blank" rel="noreferrer">Consultar dispositivos oficiais <ExternalLink /></a></Button>
          </div>
        </section>

        <section className="graphene-paper-deep px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / Aplicativos e governança" title="Compatibilidade controlada," accent="não privilégio invisível." />
            <div className="grid items-start gap-12 lg:grid-cols-12">
              <motion.div {...reveal()} className="space-y-7 text-lg leading-[1.75] lg:col-span-7 md:text-xl"><p>O GrapheneOS não inclui serviços Google. Quando uma necessidade corporativa exige essa dependência, o Sandboxed Google Play instala os componentes como aplicativos comuns, sem privilégios especiais no sistema.</p><p>Isso preserva compatibilidade com notificações, mapas e diversos aplicativos, mas não apaga o fornecedor da equação. Rede e permissões concedidas continuam permitindo coleta. A governança correta começa com necessidade documentada, perfil isolado e mínimo privilégio.</p><p>Apps bancários, governamentais e ferramentas com Play Integrity exigem piloto. Muitos funcionam, alguns recusam o ambiente e o comportamento pode mudar após uma atualização. Nenhuma implantação séria deve prometer compatibilidade universal.</p></motion.div>
              <motion.aside {...reveal(.12)} className="graphene-teal rounded-lg p-8 lg:col-span-5"><BriefcaseBusiness className="graphene-copper-soft h-8 w-8"/><h3 className="mt-6 text-2xl font-black tracking-normal text-background">Política mínima de aprovação</h3><ul className="mt-6 space-y-4 text-background/80">{['Finalidade e proprietário do aplicativo', 'Dados acessados e permissões necessárias', 'Dependência de Google Play e atestação', 'Perfil autorizado para instalação', 'Plano alternativo em caso de bloqueio'].map(item => <li key={item} className="flex gap-3"><CheckCircle2 className="graphene-copper-soft mt-0.5 h-5 w-5 shrink-0"/><span>{item}</span></li>)}</ul></motion.aside>
            </div>
            <Figure asset={appsAsset} alt="Smartphone corporativo com aplicativos separados por camadas de isolamento" caption="Aplicativo aprovado é aquele cuja finalidade, permissão e dependência foram avaliadas." />
          </div>
        </section>

        <section id="instalacao" className="graphene-teal scroll-mt-16 px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <div className="mx-auto max-w-[1400px]">
            <Heading chapter="05 / Implantação segura" title="Instalar é um procedimento." accent="Não uma tentativa." dark />
            <Figure asset={instalacaoAsset} alt="Pixel conectado por cabo de dados a computador executando instalador web" caption="Estação confiável, cabo estável e instalador oficial reduzem falhas evitáveis." />
            <div className="space-y-4">{INSTALL.map((step, i) => <motion.article key={step.title} {...reveal(i * .05)} className="graphene-card-dark group grid gap-5 rounded-lg border p-7 transition-transform duration-500 hover:translate-x-1 md:grid-cols-[72px_1fr] md:p-9"><div className="graphene-btn-primary flex h-14 w-14 items-center justify-center rounded-full text-lg font-black transition-transform duration-500 group-hover:scale-110">{i + 1}</div><div><h3 className="text-2xl font-black tracking-normal text-background">{step.title}</h3><p className="mt-3 text-lg leading-relaxed text-background/75">{step.text}</p></div></motion.article>)}</div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="graphene-btn-dark graphene-focus h-13 px-7 font-bold"><a href="https://grapheneos.org/install/web" target="_blank" rel="noreferrer">Abrir instalador oficial <ExternalLink /></a></Button><Button asChild size="lg" variant="outline" className="graphene-focus h-13 border-background/30 bg-transparent px-7 font-bold text-background hover:bg-background/10 hover:text-background"><a href="#faq">Revisar objeções técnicas</a></Button></div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="06 / Operação contínua" title="Segurança que não é mantida" accent="vira memória institucional." />
            <div className="grid gap-5 md:grid-cols-2">{OPERATIONS.map((item, i) => <motion.article key={item.title} {...reveal(i * .07)} className="graphene-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"><item.icon className="graphene-copper mb-5 h-7 w-7 transition-transform duration-500 group-hover:scale-110"/><h3 className="graphene-ink text-2xl font-black tracking-normal">{item.title}</h3><p className="mt-3 text-lg leading-relaxed">{item.text}</p></motion.article>)}</div>
            <Figure asset={redeAsset} alt="Configuração de rede celular em Pixel com 2G desativado e rede moderna ativa" caption="Desativar 2G reduz um vetor de downgrade, mas não torna a rede celular anônima." />
            <Figure asset={diagnosticoAsset} alt="Especialista conduzindo diagnóstico de integridade em Google Pixel" caption="Resposta a incidentes começa com evidência preservada e procedimento conhecido." />
          </div>
        </section>

        <section id="faq" className="graphene-paper-deep scroll-mt-16 px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="07 / FAQ técnico" title="Objeções complexas," accent="respostas abertas." />
            <p className="graphene-muted -mt-7 max-w-3xl text-lg leading-relaxed md:text-xl">Todas as respostas permanecem visíveis. Sem cliques adicionais, sem informação escondida e com profundidade suficiente para apoiar uma análise técnica.</p>
            <div className="mt-14 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">{FAQ.map((item, i) => <motion.article key={item.q} {...reveal((i % 3) * .06)} className={`graphene-card group rounded-lg border p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${i === 0 || i === 7 ? 'md:col-span-2' : ''}`}><div className="mb-5 flex items-center justify-between"><span className="graphene-copper text-xs font-black tracking-[0.25em]">FAQ {String(i + 1).padStart(2, '0')}</span><ShieldCheck className="graphene-copper h-5 w-5 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"/></div><h3 className="graphene-ink text-xl font-black leading-tight tracking-normal md:text-2xl">{item.q}</h3><p className="mt-5 text-base leading-[1.75] md:text-lg">{item.a}</p></motion.article>)}</div>
          </div>
        </section>

        <section className="graphene-teal px-6 py-24 md:px-12 md:py-32 lg:px-20">
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-2">
            <motion.div {...reveal()}><span className="graphene-copper-soft text-xs font-bold uppercase tracking-[0.3em]">Veredito técnico</span><h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] font-black leading-none tracking-normal text-background">Proteção superior exige <span className="graphene-copper-soft font-editorial font-normal italic">operação madura.</span></h2></motion.div>
            <motion.div {...reveal(.12)} className="space-y-6 text-lg leading-[1.75] text-background/80 md:text-xl"><p>GrapheneOS é uma base excepcional para quem precisa reduzir privilégios, controlar dependências e elevar a resistência do endpoint móvel. Seu valor aparece quando hardware, perfis, aplicativos, rede e ciclo de suporte entram na mesma política.</p><p>Não é solução mágica para interceptação celular, comportamento inseguro ou aplicativo mal projetado. É uma plataforma que torna boas decisões mais eficazes e decisões ruins mais visíveis.</p><p className="font-black text-background">O ganho real não está em instalar outro Android. Está em recuperar autoridade sobre o ativo.</p></motion.div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20"><div className="mx-auto max-w-[1600px]"><h2 className="graphene-ink text-4xl font-black tracking-normal">Continue sua trilha</h2><div className="mt-9 grid gap-5 md:grid-cols-3">{[
          { to: '/seguranca-mobile/calyxos', title: 'CalyxOS', text: 'Compare uma abordagem orientada ao equilíbrio entre privacidade e uso cotidiano.', icon: Smartphone },
          { to: '/seguranca-mobile/graphene-vs-calyx', title: 'GrapheneOS vs CalyxOS', text: 'Comparativo técnico em preparação para escolher pela necessidade, não pela torcida.', icon: Network },
          { to: '/soberania-organica/defesa-digital-pessoal', title: 'Defesa Digital Pessoal', text: 'Amplie o controle para identidade, credenciais, comunicação e comportamento.', icon: LockKeyhole },
        ].map((item, i) => <motion.div key={item.to} {...reveal(i * .07)}><Link to={item.to} className="graphene-card graphene-focus group block h-full rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"><item.icon className="graphene-copper h-7 w-7 transition-transform duration-500 group-hover:scale-110"/><h3 className="graphene-ink mt-6 text-2xl font-black tracking-normal">{item.title}</h3><p className="mt-3 text-lg leading-relaxed">{item.text}</p><span className="graphene-copper mt-6 inline-flex items-center gap-2 font-bold">Acessar conteúdo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></span></Link></motion.div>)}</div></div></section>
      </main>
    </>
  );
}