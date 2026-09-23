import { useEffect } from 'react';
import { RadioTower, ArrowRight, CheckCircle2, XCircle, Activity, ShieldCheck, SignalLow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/imsi-catcher/imsi-hero.webp';
import cartaoAsset from '@/assets/seguranca-mobile/imsi-catcher/imsi-cartao.webp';
import vanAsset from '@/assets/seguranca-mobile/imsi-catcher/imsi-van.webp';
import sinalAsset from '@/assets/seguranca-mobile/imsi-catcher/imsi-sinal.webp';
import antenasAsset from '@/assets/seguranca-mobile/imsi-catcher/imsi-antenas.webp';
import maosAsset from '@/assets/seguranca-mobile/imsi-catcher/imsi-maos.webp';

const CAN = [
  'Identificar quem está na área. Todo aparelho que conecta à antena falsa expõe o IMSI, que amarra o chip à sua linha, e o IMEI, que identifica o aparelho em si. Sem você digitar nada, sem você errar nada.',
  'Localizar com precisão um alvo específico. Combinando a intensidade do sinal em várias posições, o operador da antena falsa consegue apontar em qual prédio, em qual andar, o aparelho alvo está.',
  'Rebaixar sua conexão. Muitos kits forçam o celular a sair de 4G ou 5G e cair em 2G, uma tecnologia com criptografia antiga e quebrada, justamente para conseguir inspecionar o que trafega.',
  'Interceptar o que trafega sem proteção. Em uma conexão rebaixada para 2G, chamadas de voz e SMS podem ser capturados. É o cenário mais grave, e é real.',
];

const CANNOT = [
  'Decifrar tráfego HTTPS moderno. Seu banco, seu e-mail e a maioria dos sites negociam criptografia própria de ponta a ponta. A antena falsa vê que existe conexão, não o conteúdo dela.',
  'Ler mensagens de apps com criptografia ponta a ponta. O conteúdo de Signal, WhatsApp e afins continua protegido mesmo em rede comprometida. O que vaza é o metadado de quem fala com quem, e quando.',
  'Invadir o seu aparelho por si só. Uma antena falsa não instala nada no seu celular. Se o aparelho está atualizado e sem malware, o ataque fica restrito à camada de rede.',
  'Enganar quem não está transmitindo. Modo avião desligado ou aparelho desligado não conversa com nenhuma antena, verdadeira ou falsa. Silêncio de rádio é proteção real.',
];

const SINAIS = [
  'Queda repentina de 4G ou 5G para 2G, ou para a letra E no indicador, em um lugar onde a conexão sempre foi estável. Rebaixamento anômalo é o sinal número um.',
  'Chamadas com ruído, cortes e atraso fora do padrão que você conhece, sem explicação de local ou clima.',
  'Demora anormal para registrar na rede depois de ligar ou sair do modo avião, em área normalmente coberta.',
  'Falha recorrente para enviar SMS em região cheia de antenas, algo que não acontecia antes.',
];

const DEFESAS = [
  'Desligue o 2G no sistema. A partir do Android 12 existe um seletor para desativar 2G por aparelho, e no GrapheneOS o controle é ainda mais granular. Sem 2G, o rebaixamento que expõe chamadas e SMS perde o principal caminho.',
  'Use modo avião em contexto sensível. Reunião, deslocamento em ambiente hostil ou simplesmente momento em que você não precisa de rede: rádio celular desligado é a única resposta que nenhuma antena falsa contorna.',
  'Trate apps de mensagem com criptografia ponta a ponta como padrão. Se o conteúdo já viaja cifrado de ponta a ponta, o pior cenário do ataque vira apenas exposição de metadados.',
  'Mantenha o sistema atualizado. Correções de segurança na camada de rádio existem e chegam por atualização. Aparelho parado no tempo acumula fraquezas conhecidas.',
  'Não confie em "sinal cheio" como sinônimo de segurança. Sinal forte é justamente o que a antena falsa projeta para atrair você. Força de sinal nunca foi indicador de confiança.',
];

const FAQ = [
  { q: 'IMSI catcher é usado no Brasil?', a: 'O uso por autoridades é documentado em investigações, e kits do tipo circulam em mercado cinza. Não existe estatística pública confiável de quantos operam em cada cidade. A leitura honesta é: risco real e concentrado em contextos específicos, vigilância direcionada, alvos de interesse, não uma nuvem de perigo generalizada sobre cada esquina.' },
  { q: 'Como eu sei que estou perto de uma antena falsa?', a: 'Você não tem como ter certeza por um único sintoma. O padrão mais confiável é a combinação: rebaixamento anômalo de rede, chamadas degradadas e falhas de SMS em local onde nada disso acontecia. Aplicativos de detecção existem, mas operam com informação limitada pelo próprio sistema e não são garantia.' },
  { q: 'Desligar o 2G resolve o problema?', a: 'Resolve a parte pior do problema, que é o rebaixamento para criptografia quebrada e a interceptação de chamadas e SMS. Não resolve a identificação: quando o aparelho conecta em 3G, 4G ou 5G, a antena falsa ainda pode registrar o IMSI e o IMEI. Protege o conteúdo, não a presença.' },
  { q: 'Modo avião me protege?', a: 'Sim, na camada celular. Com o rádio celular desligado, não existe conexão para a antena falsa capturar. Atenção apenas ao detalhe: Wi-Fi e Bluetooth são rádios separados e podem permanecer ativos, então desligue cada um pelo que ele é.' },
  { q: 'Meu banco e meu WhatsApp estão em risco?', a: 'O conteúdo não. HTTPS e criptografia ponta a ponta seguem válidos mesmo sob antena falsa, e por isso desligar 2G já cobre o cenário mais grave. O que fica exposto é a camada de metadados: que você está ali, que se comunica com aqueles contatos, e em quais horários.' },
];

export default function ImsiCatcherComoFunciona() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'O que é IMSI Catcher e como funciona',
        description: 'A antena falsa que transforma o seu celular em um transmissor de identidade: como o ataque funciona, o que ele consegue, o que não consegue, e as defesas que realmente valem.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/imsi-catcher-como-funciona',
        primaryKeyword: 'o que é imsi catcher',
        lsiKeywords: ['imsi catcher como funciona', 'antena falsa celular', 'estação rádio base falsa', 'stingray celular', 'rastreamento por antena', '2G criptografia quebrada', 'interceptação de chamadas', 'desativar 2G android'],
        longTailKeywords: ['como funciona um imsi catcher', 'imsi catcher consegue ler mensagens', 'desativar 2g no celular protege de imsi catcher', 'como saber se há antena falsa por perto'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Ameaças Específicas', url: '/seguranca-mobile/imsi-catcher-como-funciona' }, { name: 'IMSI Catcher', url: '/seguranca-mobile/imsi-catcher-como-funciona' }],
        schemaType: 'Article', articleSection: 'Ameaças Específicas', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/grapheneos', '/seguranca-mobile/vpn-no-celular'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Antena de telecomunicações instalada no telhado de um prédio ao anoitecer, com o céu em tons de cobre" eyebrow="Segurança Mobile" category="Ameaças Específicas" icon={RadioTower} title="IMSI Catcher, a Antena que Não Devia Existir" lede="Ela finge ser a sua operadora. O seu celular acredita, e entrega quem você é sem você tocar em nada." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Antena de telecomunicações ao anoitecer" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>IMSI catcher é um equipamento que finge ser uma antena de operadora. Ele emite um sinal mais forte que as torres ao redor, e o seu celular, que foi projetado para sempre preferir o sinal mais forte, conecta nele sozinho, sem perguntar, sem avisar.</p>
              <p className="mt-7">A partir daí, todo aparelho conectado expõe o IMSI, o código que amarra o chip à sua linha, e o IMEI, que identifica o aparelho. O nome técnico é estação rádio base falsa. O efeito prático é transformar a rede celular que deveria te servir em um sensor que te observa.</p>
              <p className="mt-7">A boa notícia é que o ataque tem limites claros. Ele não é mágica, e a maior parte do que você protege com hábitos simples continua protegida. Vamos separar exatamente o que ele faz do que ele não faz, porque a propaganda de medo trabalha juntando os dois.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={cartaoAsset} alt="Macro de chip de cartão SIM sobre superfície escura" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / Como o ataque funciona" dark>Três passos, <span className="smx-copper-soft font-editorial font-normal italic">zero cliques seus.</span></Heading>
            <div className="grid gap-4">
              {[
                'Finge ser a sua operadora: emite sinal mais forte que as torres reais, e o celular conecta automaticamente, porque foi projetado para isso.',
                'Cataloga a área: registra IMSI e IMEI de todo aparelho que conecta, montando em tempo real a lista de quem está ali.',
                'Rebaixa a conexão quando interessa: empurra o aparelho de 4G ou 5G para 2G, onde a criptografia da rede é antiga e quebrada, para inspecionar chamadas e SMS.',
              ].map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={cartaoAsset} alt="Chip de cartão SIM em macro sobre superfície escura com luz cobre" caption="O IMSI amarra o chip à sua linha e fica exposto a qualquer estação base, verdadeira ou falsa, com que o aparelho conversa." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={vanAsset} alt="Van estacionada em rua à noite sob luz de poste" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / O que ela consegue e o que não consegue">Limite claro entre <span className="smx-editorial">presença e conteúdo.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {CAN.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between"><Activity className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">CONSEGUE {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {CANNOT.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between"><ShieldCheck className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">NÃO CONSEGUE {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={vanAsset} alt="Van branca com equipamentos no teto estacionada em rua escura" caption="Kits portáteis cabem em um veículo comum. O alvo raramente percebe qualquer coisa, até notar a degradação da rede." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={sinalAsset} alt="Celular na mão exibindo indicador de sinal fraco" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / Sinais de um possível ataque" dark>Seu celular <span className="smx-copper-soft font-editorial font-normal italic">sente antes de você.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {SINAIS.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between"><SignalLow className="smx-copper-soft h-7 w-7" /><span className="smx-copper-soft text-xs font-black tracking-[0.25em]">SINAL {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={sinalAsset} alt="Mão segurando celular com indicador de sinal fraco à noite" caption="Nenhum sintoma isolado prova um ataque. O padrão repetido, no mesmo lugar, é o que merece atenção." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={antenasAsset} alt="Torres de telecomunicações contra o céu noturno" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="05 / Defesas que realmente valem">Reduza a superfície, <span className="smx-editorial">não a sanidade.</span></Heading>
            <div className="grid gap-4">
              {DEFESAS.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card group grid gap-5 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/grapheneos">GrapheneOS e o controle de rádio <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/vpn-no-celular">VPN no celular, o que ela cobre <ArrowRight /></Link></Button>
            </div>
            <Figure asset={antenasAsset} alt="Conjunto de torres de telecomunicações ao anoitecer" caption="A rede celular foi desenhada para confiar nas antenas. A antena falsa explora exatamente essa confiança." />
          </div>
        </section>

        <FaqSection asset={maosAsset} alt="Mãos segurando celular com reflexo de luzes urbanas" faq={FAQ} />

        <Veredito headline={<>Risco real. <span className="smx-copper-soft font-editorial font-normal italic">Escopo real.</span></>} paragraphs={[
          'IMSI catcher não é lenda de cinema, mas também não é olho onipotente. Ele te localiza, te identifica e, no pior cenário, derruba sua conexão até uma criptografia quebrada.',
          'Desligar o 2G, usar criptografia ponta a ponta e fechar o rádio em contextos sensíveis cobrem a maior parte do dano possível. O que sobra, presença e metadados, é o custo estrutural de usar qualquer rede celular.',
          'A pergunta certa não é se existe uma antena falsa perto de você agora. É se o seu contexto justifica a camada extra de proteção, e se ela já está configurada antes de precisar dela.',
        ]} />

        <TrailSection chapter="Ameaças Específicas" cards={[
          { to: '/seguranca-mobile/sim-swap-como-funciona', title: 'SIM Swap', desc: 'O golpe administrativo que rouba o seu número sem tocar no seu aparelho.', icon: CheckCircle2 },
          { to: '/seguranca-mobile/operadora-vende-dados-localizacao', title: 'Operadora e localização', desc: 'O que a sua operadora registra, por quanto tempo, e como esse dado circula.', icon: XCircle },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: ShieldCheck },
        ]} />
      </main>
    </>
  );
}
