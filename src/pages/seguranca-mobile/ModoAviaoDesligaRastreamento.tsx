import { useEffect } from 'react';
import { Plane, ArrowRight, WifiOff, ShieldCheck, Bluetooth, MapPin, RadioTower } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/modo-aviao/ma-hero.webp';
import cabineAsset from '@/assets/seguranca-mobile/modo-aviao/ma-cabine.webp';
import torreAsset from '@/assets/seguranca-mobile/modo-aviao/ma-torre.webp';
import configAsset from '@/assets/seguranca-mobile/modo-aviao/ma-config.webp';
import radarAsset from '@/assets/seguranca-mobile/modo-aviao/ma-radar.webp';
import scanAsset from '@/assets/seguranca-mobile/bt-wifi/bt-scan.webp';

const DESLIGA = [
  'O rádio celular: a conexão com antenas de operadora para, de voz e de dados. Sem transmissão celular, a rede não registra sua presença, não troca mensagens de sinalização com o aparelho e não atualiza sua célula de rede.',
  'A busca por rede: o aparelho para de escanear antenas, o que encerra o envio dos identificadores que uma estação base, verdadeira ou falsa, capturaria.',
  'O tráfego de voz e dados móveis: chamadas, SMS e internet pela rede da operadora param de circular enquanto o modo permanece ativo.',
];

const NAO_DESLIGA = [
  'O GPS do aparelho. O receptor de satélite não transmite nada, por isso ele continua funcionando no modo avião: você pode navegar com mapas baixados, e o registro da sua posição pode continuar sendo gravado no aparelho por aplicativos que têm permissão para isso.',
  'Wi-Fi e Bluetooth em muitos aparelhos. Em versões modernas, religar Wi-Fi ou Bluetooth manualmente volta a reativar esses rádios sem pedir autorização de novo. Eles são rastreamento separado, com seus próprios identificadores.',
  'O que já foi registrado antes. Todo o histórico que a operadora acumulou até o momento em que você ativou o modo avião permanece existindo. Silenciar agora não apaga o passado.',
  'Aplicativos em segundo plano que usam dados previamente armazenados ou sincronizam quando qualquer conexão volta.',
];

const CONTEXTOS = [
  'Em voo: a regra é técnica e regulatória, e o modo avião desliga de fato o rádio celular. Se Wi-Fi do voo estiver ligado, esse rádio está ativo de novo por decisão sua.',
  'Em ambiente hostil: rádio celular silenciado é a proteção mais forte contra antena falsa, IMSI catcher e associação de local por rede. É o único estado que nenhuma técnica de rede contorna.',
  'No dia a dia: manter o modo avião permanente elimina a utilidade do telefone e não protege contra rastreamento por Wi-Fi, Bluetooth ou aplicativos com permissão de localização.',
  'Desligado de verdade: aparelho com bateria removida ou desligado de fábrica é o estado mais limpo. Aparelho que apenas aparenta estar desligado, com firmware comprometido, não entra nessa categoria.',
];

const FAQ = [
  { q: 'O modo avião desliga o GPS?', a: 'Não. O GPS é um receptor, não um transmissor: ele escuta satélites e não emite sinal. Por isso navegação offline funciona em voo. O que muda é que aplicativos com permissão de localização podem continuar registrando posição no aparelho, mesmo sem conectividade.' },
  { q: 'A operadora percebe que entrei em modo avião?', a: 'Ela percebe o desaparecimento do aparelho da rede, não o comando em si. Em rede celular, a antena deixa de ver o aparelho transmitir. Não existe um registro do tipo "modo avião ativado", existe apenas a ausência de atividade, que é exatamente o que muitas outras causas também produzem.' },
  { q: 'Wi-Fi e Bluetooth voltam sozinhos?', a: 'Em versões recentes dos sistemas, sim: ao desativar o modo avião, ou mesmo durante ele, ligar Wi-Fi manualmente pode religar também o Bluetooth. A recomendação é conferir cada rádio individualmente, porque cada um é um vetor de rastreamento próprio.' },
  { q: 'Modo avião me protege de IMSI catcher?', a: 'Na camada celular, sim: sem rádio celular ativo, não existe conexão para a antena falsa capturar. Atenção apenas a Wi-Fi e Bluetooth, que são redes separadas e podem continuar emitindo identificadores.' },
  { q: 'Enquanto estou em voo, alguém rastreia o aparelho?', a: 'A rede celular não vê nada enquanto o rádio está desligado. Mas o GPS continua calculando posição, e qualquer app com permissão de localização pode armazenar essa trilha localmente para sincronizar depois que a conexão voltar.' },
];

export default function ModoAviaoDesligaRastreamento() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Modo avião realmente desliga o rastreamento?',
        description: 'O que é desligado, o que pode continuar ativo e quais rastros permanecem no aparelho: a resposta técnica, sem simplificação.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/modo-aviao-desliga-rastreamento',
        primaryKeyword: 'modo avião desliga o rastreamento',
        lsiKeywords: ['modo avião gps funciona', 'wi-fi no modo avião', 'bluetooth modo avião', 'rastreamento celular sem rede', 'operadora modo avião', 'proteção antena falsa', 'gps receptor passivo'],
        longTailKeywords: ['modo avião desliga o rastreamento ou não', 'gps funciona com modo avião ativado', 'wi-fi volta sozinho ao desativar modo avião', 'modo avião protege de imsi catcher'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Curiosidades / Mitos', url: '/seguranca-mobile/modo-aviao-desliga-rastreamento' }, { name: 'Modo Avião', url: '/seguranca-mobile/modo-aviao-desliga-rastreamento' }],
        schemaType: 'Article', articleSection: 'Curiosidades / Mitos', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/imsi-catcher-como-funciona', '/seguranca-mobile/bluetooth-wifi-rastreamento'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Tela de smartphone em ambiente noturno com painel de controles exibindo o seletor de modo avião em destaque" eyebrow="Segurança Mobile" category="Curiosidades / Mitos" icon={Plane} title="Modo Avião Realmente Desliga o Rastreamento?" lede="Ele desliga o rádio celular. Isso já é muito. Mas não é tudo, e entender a diferença muda o que você espera dessa proteção." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Painel de controles do celular com modo avião ativo" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>Sim, o modo avião desliga o rádio celular. Sem ele ativo, o aparelho não transmite para antenas de operadora, e a rede celular deixa de registrar sua presença em tempo real. Essa é a parte mais forte da proteção, e ela é real.</p>
              <p className="mt-7">O que o mito ignora é o que fica de fora: o receptor de GPS continua calculando sua posição, Wi-Fi e Bluetooth são rádios separados que podem permanecer ou voltar a ficar ativos, e todo o histórico que a operadora registrou até aquele momento continua existindo, intacto, nos servidores dela.</p>
              <p className="mt-7">Rastreamento não é uma coisa só. É um conjunto de camadas: rede celular, rede local, satélite, aplicativos. O modo avião corta uma dessas camadas com precisão, e a pergunta correta é saber exatamente qual.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={torreAsset} alt="Torre de telecomunicações ao anoitecer" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / O que é desligado de fato" dark>O rádio celular <span className="smx-copper-soft font-editorial font-normal italic">realmente cessa.</span></Heading>
            <div className="grid gap-4">
              {DESLIGA.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full"><WifiOff className="h-6 w-6" /></div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={torreAsset} alt="Torre de telecomunicações contra o céu ao anoitecer" caption="Sem rádio celular ativo, a rede não vê o aparelho. Essa é a proteção central do modo avião, e ela é verdadeira." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={cabineAsset} alt="Interior de cabine de avião à noite com smartphone sobre a mesinha" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / O que continua ativo">A silhueta <span className="smx-editorial">que permanece.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {NAO_DESLIGA.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between">{i === 1 ? <Bluetooth className="smx-copper h-7 w-7" /> : <MapPin className="smx-copper h-7 w-7" />}<span className="smx-muted text-xs font-black tracking-[0.25em]">ATIVO {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={cabineAsset} alt="Smartphone sobre a mesinha de um avião à noite" caption="Dentro da cabine, o rádio celular está mudo. O GPS segue calculando, e os rádios locais seguem à disposição de quem os religar." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={radarAsset} alt="Radar e torre de controle de aeroporto na neblina" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / Por contexto" dark>A ferramenta certa <span className="smx-copper-soft font-editorial font-normal italic">para cada cenário.</span></Heading>
            <div className="grid gap-4">
              {CONTEXTOS.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full"><RadioTower className="h-6 w-6" /></div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/imsi-catcher-como-funciona">IMSI catcher e o rádio silenciado <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/bluetooth-wifi-rastreamento">Rastreamento por Wi-Fi e Bluetooth <ArrowRight /></Link></Button>
            </div>
            <Figure asset={radarAsset} alt="Torre de controle de aeroporto envolta em neblina" caption="Em contexto sensível, rádio silenciado é a resposta que nenhuma técnica de rede contorna. Fora desse contexto, o custo é abrir mão da utilidade do telefone." />
          </div>
        </section>

        <FaqSection asset={configAsset} alt="Tela de configurações de smartphone com seletores de conexão" faq={FAQ} />

        <Veredito headline={<>Proteção real, <span className="smx-copper-soft font-editorial font-normal italic">escopo restrito.</span></>} paragraphs={[
          'O modo avião corta a camada celular com precisão cirúrgica. Para quem está em voo, ou quer desaparecer da rede celular por um período, é a ferramenta correta e honesta.',
          'O que ele não faz: apagar o passado registrado, silenciar Wi-Fi e Bluetooth por padrão em todos os aparelhos, ou impedir que aplicativos continuem calculando e armazenando sua posição.',
          'Quem entende esse escopo usa a ferramenta no momento certo, sem falsa sensação de invisibilidade, e combina com o controle dos rádios restantes quando o contexto exige.',
        ]} />

        <TrailSection chapter="Curiosidades / Mitos" cards={[
          { to: '/seguranca-mobile/imsi-catcher-como-funciona', title: 'O que é IMSI Catcher', desc: 'A antena falsa que o rádio silenciado deixa sem alvo.', icon: ShieldCheck },
          { to: '/seguranca-mobile/imei-rastreia-sem-chip', title: 'IMEI rastreia sem chip?', desc: 'O que identifica o aparelho quando a linha não está presente.', icon: Plane },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: WifiOff },
        ]} />
      </main>
    </>
  );
}
