import { useEffect } from 'react';
import { Hash, ArrowRight, ShieldCheck, Fingerprint, ScanLine, RadioTower, Wifi, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/imei/im-hero.webp';
import dialAsset from '@/assets/seguranca-mobile/imei/im-dial.webp';
import bandejaAsset from '@/assets/seguranca-mobile/imei/im-bandeja.webp';
import caixaAsset from '@/assets/seguranca-mobile/imei/im-caixa.webp';
import antenasAsset from '@/assets/seguranca-mobile/imsi-catcher/imsi-antenas.webp';
import cartaoAsset from '@/assets/seguranca-mobile/imsi-catcher/imsi-cartao.webp';

const O_QUE_E = [
  'IMEI é o número de identidade do aparelho, não do usuário e não da linha. Ele é gravado no hardware no momento da fabricação, e sobrevive a trocas de chip, de operadora e de sistema.',
  'Cada aparelho conectado à rede celular apresenta o IMEI para se registrar. A rede precisa dele para funcionar: é por esse identificador que operadoras e fabricantes bloqueiam aparelhos roubados.',
  'Ele circula em vários lugares: gravado na carcaça ou em etiqueta, na caixa do produto, nos registros do fabricante, nos sistemas de cada operadora que o aparelho já usou e em chamadas de emergência.',
];

const SEM_CHIP = [
  'O rádio pode continuar escaneando. Com SIM removido, muitos aparelhos continuam buscando redes e podendo se registrar parcialmente, o que expõe o IMEI a qualquer estação base que ouça a tentativa.',
  'Chamadas de emergência funcionam sem chip. Os números de emergência são uma exceção projetada no padrão: o aparelho transmite mesmo sem linha, e essa transmissão carrega o IMEI.',
  'Wi-Fi e Bluetooth mantêm suas próprias identidades. Nenhum dos dois usa IMEI, mas ambos têm identificadores próprios que redes locais podem usar para associar presença, e a conta Google ou Apple conecta tudo ao seu perfil.',
  'Serviços do fabricante continuam vinculados: apps de sistema, atualizações e serviços em nuvem se comunicam pela rede de dados e carregam identificadores, inclusive quando o chip celular está ausente.',
];

const QUEM_VE = [
  'Operadoras e autoridades com respaldo: dentro da rede celular, o IMEI aparece nos registros das operadoras e pode ser consultado por autoridades com ordem judicial. A associação IMEI para linha é feita no momento da conexão.',
  'Redes locais, não: Wi-Fi e Bluetooth não usam IMEI. Rastreamento por essas redes depende de endereço MAC e de beacons, que é um capítulo próprio deste silo.',
  'Fabricantes, por outro caminho: apps de sistema e serviços do fabricante podem identificar o aparelho por identificadores próprios, e alguns desses canais funcionam mesmo sem chip celular.',
  'Mercado paralelo: IMEI pode ser usado para verificar histórico de aparelho em serviços de checagem, e também pode ser manipulado por quem quer mascarar um aparelho roubado. O número é identificável, não é senha.',
];

const FAQ = [
  { q: 'IMEI pode me rastrear sem chip?', a: 'Na rede celular, o rastreamento exige que o aparelho se comunique com alguma estação base. Sem chip, o aparelho pode ainda escanear redes e se registrar parcialmente, expondo o IMEI. E chamadas de emergência transmitem mesmo sem linha. Mas o IMEI por si só não localiza ninguém: ele identifica o aparelho; a localização vem da rede que o vê.' },
  { q: 'Com o aparelho desligado, o IMEI ainda é rastreado?', a: 'Não em tempo real. Aparelho desligado não transmite. O que permanece é o histórico: cada rede e operadora que já viu esse IMEI registrou quando e onde ele esteve, e esses registros existem independentemente do estado atual do aparelho.' },
  { q: 'O IMEI aparece para sites e aplicativos?', a: 'Aplicativos comuns não têm acesso direto ao IMEI nas versões modernas dos sistemas. Eles usam identificadores de publicidade e identificadores próprios do app. O IMEI aparece em registros de rede celular, em chamadas de emergência e em sistemas das operadoras e do fabricante.' },
  { q: 'Trocar o chip muda o IMEI?', a: 'Não. IMEI identifica o aparelho, o chip identifica a linha. Trocar o chip não muda o primeiro, e é justamente por isso que aparelhos roubados são bloqueados pelo IMEI na rede.' },
  { q: 'Posso "limpar" meu IMEI?', a: 'A resposta honesta: manipular IMEI é crime em várias jurisdições e tecnicamente inviável na maioria dos aparelhos modernos. A defesa real é minimizar a exposição, não tentar apagar um identificador gravado na fábrica.' },
];

export default function ImeiRastreiaSemChip() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Número de IMEI pode te rastrear mesmo sem chip?',
        description: 'Como IMEI, rede celular, Wi-Fi e outros identificadores se relacionam com rastreamento: o que cada um revela, e quando.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/imei-rastreia-sem-chip',
        primaryKeyword: 'imei rastreia sem chip',
        lsiKeywords: ['rastreamento por imei', 'imei sem chip celular', 'imei chamada emergência', 'identificadores de hardware', 'imei bloqueio aparelho roubado', 'trocar chip muda imei', 'imei operadora registro'],
        longTailKeywords: ['o imei pode rastrear o celular sem chip', 'imei funciona mesmo sem chip', 'quem pode ver o imei do meu celular', 'trocar o chip muda o imei do aparelho'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Curiosidades / Mitos', url: '/seguranca-mobile/imei-rastreia-sem-chip' }, { name: 'IMEI', url: '/seguranca-mobile/imei-rastreia-sem-chip' }],
        schemaType: 'Article', articleSection: 'Curiosidades / Mitos', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/imsi-catcher-como-funciona', '/seguranca-mobile/bluetooth-wifi-rastreamento'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Etiqueta de identificação na parte traseira de um smartphone iluminada por luz cobre" eyebrow="Segurança Mobile" category="Curiosidades / Mitos" icon={Hash} title="IMEI Pode te Rastrear sem Chip?" lede="O número é a identidade do aparelho, gravada no metal. O que ele revela, e para quem, depende de qual rede está olhando." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Etiqueta de identificação do aparelho em macro" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>O IMEI identifica o aparelho, não você e não a sua linha. Ele existe para a rede saber com que hardware está conversando, e por isso funciona independentemente do chip: remova o SIM e o número continua lá, gravado no hardware.</p>
              <p className="mt-7">Rastreamento por IMEI tem um requisito: que o aparelho se comunique com alguma rede que o veja. Sem chip, a rede celular ainda pode captar o IMEI em escaneamentos e em chamadas de emergência. Aparelho desligado de verdade, não: silêncio de rádio é silêncio de rastro em tempo real.</p>
              <p className="mt-7">E uma nuance que o mito ignora: Wi-Fi, Bluetooth e serviços em nuvem rastreiam por identificadores próprios, não pelo IMEI. O aparelho sem chip continua sendo identificável por outras vias, e o IMEI é apenas uma delas.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={caixaAsset} alt="Caixa de smartphone com etiqueta de número de série" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / O que é o IMEI e onde ele vive" dark>Um número, <span className="smx-copper-soft font-editorial font-normal italic">muitas cópias.</span></Heading>
            <div className="grid gap-4">
              {O_QUE_E.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full"><Fingerprint className="h-6 w-6" /></div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={caixaAsset} alt="Etiqueta com código de barras na caixa de um smartphone" caption="O IMEI é gravado na fábrica e impresso na caixa. Ele acompanha o aparelho onde quer que ele vá, inclusive sem linha ativa." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={bandejaAsset} alt="Bandeja de chip e cartão SIM sobre bancada escura" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / O que acontece sem chip">O rádio <span className="smx-editorial">não dorme sozinho.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {SEM_CHIP.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between">{i === 2 ? <Wifi className="smx-copper h-7 w-7" /> : <ScanLine className="smx-copper h-7 w-7" />}<span className="smx-muted text-xs font-black tracking-[0.25em]">SEM CHIP {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={bandejaAsset} alt="Bandeja de SIM e chip nano sobre superfície escura com luz cobre" caption="Remover o chip encerra a linha, não a identidade do hardware. O rádio segue presente, e o IMEI com ele." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={antenasAsset} alt="Torres de telecomunicações contra o céu noturno" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / Quem pode ver o seu IMEI" dark>Acesso restrito, <span className="smx-copper-soft font-editorial font-normal italic">rastro permanente.</span></Heading>
            <div className="grid gap-4">
              {QUEM_VE.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full">{i === 3 ? <Server className="h-6 w-6" /> : <RadioTower className="h-6 w-6" />}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/imsi-catcher-como-funciona">IMSI catcher: a antena que cataloga <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/bluetooth-wifi-rastreamento">Rastreamento por Wi-Fi e Bluetooth <ArrowRight /></Link></Button>
            </div>
            <Figure asset={antenasAsset} alt="Conjunto de antenas de telecomunicações ao anoitecer" caption="A rede celular vê o IMEI a cada registro do aparelho. É o custo estrutural de usar rádio, com ou sem chip." />
          </div>
        </section>

        <FaqSection asset={cartaoAsset} alt="Chip de cartão SIM em macro sobre superfície escura" faq={FAQ} />

        <Veredito headline={<>Identidade do <span className="smx-copper-soft font-editorial font-normal italic">hardware.</span></>} paragraphs={[
          'O IMEI rastreia o aparelho onde ele é visto: rede celular, registros de operadora, chamadas de emergência. Sem chip, a exposição continua em escaneamentos e serviços. Aparelho desligado de verdade é o único estado que encerra o rastro em tempo real.',
          'Wi-Fi, Bluetooth e serviços em nuvem rastreiam por outros identificadores, e a conta que você mantém conectada é o elo que amarra tudo a você.',
          'O número é gravado na fábrica e não é apagável por decisão do usuário. A defesa real está em entender quem vê o quê, e em reduzir a superfície que você não precisa expor.',
        ]} />

        <TrailSection chapter="Curiosidades / Mitos" cards={[
          { to: '/seguranca-mobile/imsi-catcher-como-funciona', title: 'O que é IMSI Catcher', desc: 'A antena falsa que captura IMEI e IMSI de todo aparelho que conecta.', icon: ShieldCheck },
          { to: '/seguranca-mobile/modo-aviao-desliga-rastreamento', title: 'Modo avião', desc: 'O que o rádio silenciado realmente corta, e o que permanece ativo.', icon: Hash },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: RadioTower },
        ]} />
      </main>
    </>
  );
}
