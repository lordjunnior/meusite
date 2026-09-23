import { useEffect } from 'react';
import { Bluetooth, ArrowRight, Wifi, BatteryWarning, FileWarning, Store, ScanLine, Cpu, Radar, Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/bt-wifi/bt-hero.webp';
import roteadorAsset from '@/assets/seguranca-mobile/bt-wifi/bt-roteador.webp';
import scanAsset from '@/assets/seguranca-mobile/bt-wifi/bt-scan.webp';
import cafeteriaAsset from '@/assets/seguranca-mobile/bt-wifi/bt-cafeteria.webp';
import beaconAsset from '@/assets/seguranca-mobile/bt-wifi/bt-beacon.webp';
import placaAsset from '@/assets/seguranca-mobile/bt-wifi/bt-placa.webp';

const SEM_VOCE_SABER = [
  'Seu celular procura redes que conhece. Mesmo sem conectar, ele emite sondas perguntando "alguma das minhas redes salvas está aqui?". Em sistemas antigos, essas sondas carregavam o nome das redes salvas, e um observador com antena portátil montava o seu histórico de deslocamentos só com isso.',
  'Lojas medem quem passa. Beacons Bluetooth instalados no varejo registram a passagem de aparelhos com Bluetooth ativo, cronometram quanto tempo você ficou na frente de qual vitrine, e cruzam com visitas anteriores. Você entrou para tomar café, saiu com um perfil de comportamento.',
  'Rastreadores de objeto viram instrumento de perseguição. A mesma rede que ajuda a achar chaves perdidas serve para esconder um rastreador na sua bolsa ou no seu carro. Os casos de perseguição via rastreador comercial são documentados e cresceram junto com a popularidade dos dispositivos.',
  'O Wi-Fi que você aceita grátis tem preço. Cadastro com e-mail, permissões excessivas no portal de login, e às vezes rastreio de sessão entre estabelecimentos da mesma rede. O café foi barato, o metadado não foi.',
];

const LIMITES = [
  'Randomização de MAC é padrão nos sistemas modernos: o aparelho apresenta um endereço diferente por rede, e isso quebrou boa parte do rastreio passivo por Wi-Fi. Mas não é anonimato: tráfego em conta logada, apps com identidade e comportamento de rotina continuam te desenhando.',
  'Redes salvas com nomes pessoais vazam por si só. Se a sua rede de casa se chama "Apartamento do Joao 1203", a sondagem do aparelho entrega o endereço mesmo com MAC aleatório.',
  'O Bluetooth também randomiza, porém o que identifica não é só o endereço: padrões de anúncio, combinação de aparelhos ao seu redor e horários repetidos permitem correlacionar. Isoladamente nada te entrega; o conjunto te desenha.',
  'Desligado, o rádio não emite nada. É a única configuração sem ressalva técnica: rádio desligado não gera sonda, não anuncia presença, não responde beacon.',
];

const DEFESAS = [
  'Desligue Wi-Fi e Bluetooth quando não estiver usando. Não é paranoia, é higiene de rádio: menos emissão, menos superfície. O custo é apertar dois interruptores, o ganho é sair da malha de sensores.',
  'Desative a busca automática de redes Wi-Fi nas configurações. O aparelho para de sondar ambientes em busca de redes conhecidas enquanto você anda.',
  'Esqueça redes que não usa mais, e desconfie de redes abertas com portal de cadastro. Cada rede salva é um nome que o aparelho pode procurar, e um portal que pode pedir dados.',
  'Ative e conheça o aviso de rastreador desconhecido. iOS e Android modernos avisam sobre rastreadores de terceiros se movendo junto com você. Descubra onde fica essa configuração antes de precisar dela.',
  'Revise a lista de itens pareados no Bluetooth e remova o que não reconhece. Um dispositivo "estranho" pareado é uma anomalia que merece investigação, não tolerância.',
  'Em contexto de risco real de perseguição, trate o tema com profundidade: inspeção de veículos e pertences, e apoio especializado. A técnica cobre o sintoma, o plano cobre a causa.',
];

const FAQ = [
  { q: 'O celular escaneia redes mesmo com o Wi-Fi "desligado"?', a: 'Depende de como está configurado. Em muitos aparelhos, o Wi-Fi continua disponível para busca automática mesmo com o interruptor em off, porque o sistema usa o rádio para recursos como localização assistida. A busca automática precisa ser desativada em configurações para o rádio realmente parar de sondar.' },
  { q: 'Rastreadores como AirTag podem me seguir?', a: 'Sim, e é um caso de uso abusivo documentado. A contramedida nativa existe: iOS e Android avisam quando um rastreador de terceiros se move com você. Mantenha o recurso ativo e aprenda a localizá-lo nas configurações de segurança.' },
  { q: 'MAC aleatório me esconde de vez?', a: 'Reduz muito o rastreio passivo por Wi-Fi, mas não é anonimato. Logins em contas, apps identificados e a própria rotina de horários e lugares te correlacionam. Trate como uma camada útil, nunca como invisibilidade.' },
  { q: 'Desligar o Bluetooth resolve o problema dos beacons?', a: 'Resolve o lado emissão: sem rádio ativo, o beacon não vê seu aparelho. O que permanece é o rastreamento por outros meios, câmeras, pagamento, celular conectado a rede. Bluetooth off é camada, não imunidade.' },
  { q: 'Usar o Wi-Fi do café com VPN é suficiente?', a: 'A VPN protege o conteúdo do seu tráfego de quem observa a rede local, e isso já justifica usá-la em Wi-Fi público. Ela não protege sua presença: o estabelecimento continua sabendo que um aparelho se conectou, e o cadastro do portal continua valendo.' },
];

export default function BluetoothWifiRastreamento() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Bluetooth e Wi-Fi: o rastreamento que você não percebe',
        description: 'Sem chip e sem antena de operadora, seu celular anuncia presença por Wi-Fi e Bluetooth: sondas de redes salvas, beacons de loja e rastreadores abusivos. Como funciona e como reduzir a emissão.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/bluetooth-wifi-rastreamento',
        primaryKeyword: 'rastreamento por bluetooth e wifi',
        lsiKeywords: ['sonda de rede wifi celular', 'beacon bluetooth loja', 'mac aleatório', 'rastreador desconhecido', 'airtag perseguição', 'wifi público privacidade', 'rastreamento em shopping'],
        longTailKeywords: ['o celular me rastreia pelo wifi e bluetooth', 'como funcionam beacons bluetooth em lojas', 'mac aleatório protege privacidade', 'aviso de rastreador desconhecido android'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Ameaças Específicas', url: '/seguranca-mobile/bluetooth-wifi-rastreamento' }, { name: 'Bluetooth e Wi-Fi', url: '/seguranca-mobile/bluetooth-wifi-rastreamento' }],
        schemaType: 'Article', articleSection: 'Ameaças Específicas', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/operadora-vende-dados-localizacao', '/seguranca-mobile/vpn-no-celular'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Homem caminhando à noite com sutil aura de sinal ao redor do bolso do celular" eyebrow="Segurança Mobile" category="Ameaças Específicas" icon={Bluetooth} title="O Rastreamento que Não Precisa de Chip" lede="Sem ligar para nenhuma operadora, o seu celular anuncia a cada esquina que ele está ali." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Pessoa caminhando à noite em calçada molhada" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>Todo mundo discute a antena da operadora e esquece os dois rádios mais faladores do aparelho: Wi-Fi e Bluetooth. Eles funcionam independentemente de chip, de plano e de sinal de celular, e foram projetados para procurar e anunciar. É o que fazem bem.</p>
              <p className="mt-7">O Wi-Fi do seu celular sondando redes conhecidas, o Bluetooth anunciando presença para beacons de loja, os rastreadores comerciais abusando de redes de localização: nenhum disso precisa da sua permissão explícita, só do interruptor que você nunca desligou.</p>
              <p className="mt-7">A boa notícia: essa é a camada de rastreamento com defesa mais barata de todas. Não exige sistema alternativo, não exige hardware, exige dois interruptores e alguns hábitos de configuração.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={cafeteriaAsset} alt="Mesa de cafeteria vista de cima com laptops e celulares" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / O que acontece sem você perceber" dark>Três rádios, <span className="smx-copper-soft font-editorial font-normal italic">muitos ouvintes.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {SEM_VOCE_SABER.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between">{i < 2 ? <Wifi className="smx-copper-soft h-7 w-7" /> : <Radar className="smx-copper-soft h-7 w-7" />}<span className="smx-copper-soft text-xs font-black tracking-[0.25em]">FONTE {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={cafeteriaAsset} alt="Pessoas trabalhando em laptops numa cafeteria vista de cima" caption="Em qualquer mesa cheia de aparelhos, cada um deles está conversando com o ambiente. A pergunta é com quem." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={placaAsset} alt="Macro de placa de circuito com trilhas cobre" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / O que a aleatorização resolve e o que não resolve">MAC aleatório <span className="smx-editorial">não é anonimato.</span></Heading>
            <div className="grid gap-5">
              {LIMITES.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card group grid gap-5 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full">{i === 0 ? <Fingerprint className="h-6 w-6" /> : i === 3 ? <Cpu className="h-6 w-6" /> : <ScanLine className="h-6 w-6" />}</div>
                  <p className="self-center text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={placaAsset} alt="Trilhas de cobre e componentes em macro de placa eletrônica" caption="A aleatorização troca o endereço, não o comportamento. Quem te desenha há tempos não olha o MAC, olha a rotina." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={roteadorAsset} alt="Roteador Wi-Fi sobre prateleira de madeira com luzes de status" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / Higiene de rádio, sem drama" dark>Dois interruptores, <span className="smx-copper-soft font-editorial font-normal italic">seis hábitos.</span></Heading>
            <div className="grid gap-4">
              {DEFESAS.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/vpn-no-celular">VPN no Wi-Fi público, o que cobre <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/operadora-vende-dados-localizacao">O rastro da operadora, a outra frente <ArrowRight /></Link></Button>
            </div>
            <Figure asset={roteadorAsset} alt="Roteador doméstico com LEDs de status acesos" caption="Cada rede que o seu aparelho conhece é um nome que ele repete em voz alta em ambiente novo." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={beaconAsset} alt="Sensor pequeno instalado próximo ao teto de loja" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="05 / O varejo e o sensor no teto">Você entrou <span className="smx-editorial">medido por minuto.</span></Heading>
            <motion.div {...reveal(.08)} className="max-w-4xl space-y-7 text-lg leading-[1.75] md:text-xl">
              <p>Beacons Bluetooth são hardware barato e legalmente instalável: medem fluxo de pessoas, tempo de permanência e retorno de clientes. O problema não é o sensor no teto, é a assimetria: o estabelecimento sabe, você não. E o dado raramente fica só no estabelecimento.</p>
              <p>Com Bluetooth desativado em ambientes de varejo, essa camada de medição simplesmente não te enxerga. É a defesa mais simples e mais negligenciada de toda a segurança móvel: um interruptor que você desliga ao entrar e liga ao sair, se precisar dele no carro.</p>
            </motion.div>
            <Figure asset={beaconAsset} alt="Pequeno sensor branco montado no teto de ambiente comercial" caption="Do tamanho de uma caixa de fósforos, ele cronometra a sua visita sem pedir licença." />
          </div>
        </section>

        <FaqSection asset={scanAsset} alt="Tela de celular com lista abstrata de redes sem texto legível" faq={FAQ} />

        <Veredito headline={<>Menos emissão, <span className="smx-copper-soft font-editorial font-normal italic">menos perfil.</span></>} paragraphs={[
          'Wi-Fi e Bluetooth são os rádios mais baratos de fechar e os mais negligenciados. Desligados, eles não sondam, não anunciam e não respondem a beacon. Nenhuma exceção técnica contorna rádio morto.',
          'A aleatorização de endereços moderna é ganho real, mas trate pelo que é: uma camada. O que continua te identificando é comportamento, contas logadas e rotina, e isso é gerenciado por hábito, não por configuração.',
          'Se você saiu desta página com uma única mudança, que seja esta: rádio desligado quando não está em uso. O rastreamento mais comum é o que você mesmo transmite sem saber.',
        ]} />

        <TrailSection chapter="Ameaças Específicas" cards={[
          { to: '/seguranca-mobile/operadora-vende-dados-localizacao', title: 'Operadora e localização', desc: 'O diário de antenas que a rede mantém sobre você, e como reduzir.', icon: Wifi },
          { to: '/seguranca-mobile/vpn-no-celular', title: 'VPN no celular', desc: 'O que a VPN realmente protege, e onde ela vira só teatro.', icon: Store },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: FileWarning },
        ]} />
      </main>
      <span className="hidden"><BatteryWarning /></span>
    </>
  );
}
