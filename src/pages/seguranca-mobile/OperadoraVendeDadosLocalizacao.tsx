import { useEffect } from 'react';
import { Radio, RadioTower, ArrowRight, BatteryWarning, FileWarning, MapPin, Database, Server, Receipt, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/operadora/op-hero.webp';
import datacenterAsset from '@/assets/seguranca-mobile/operadora/op-datacenter.webp';
import simAsset from '@/assets/seguranca-mobile/operadora/op-sim.webp';
import mapaAsset from '@/assets/seguranca-mobile/operadora/op-mapa.webp';
import faturasAsset from '@/assets/seguranca-mobile/operadora/op-faturas.webp';
import janelaAsset from '@/assets/seguranca-mobile/operadora/op-janela.webp';

const REGISTRA = [
  'Onde você esteve, com precisão de antena. Cada conexão registra qual torre atendeu o seu aparelho, e por consequência em que raio de alguns quarteirões você estava, e a que horas.',
  'Com quem você falou e por quanto tempo. Números de origem e destino, duração e horário de ligações, metadados de SMS. O conteúdo da ligação não é gravado, o mapa dos seus relacionamentos é.',
  'Para onde seu tráfego aponta. Sem VPN, a operadora vê os destinos que você acessa. Com HTTPS ela não lê o conteúdo, mas a lista de serviços, horários e volumes desenha sua rotina.',
  'Quanto, quando e de que forma você consome. Volume de dados, tipo de rede, aparelho usado. Esse retrato vira insumo de perfilamento comercial.',
];

const PORQUE = [
  'Porque a lei manda guardar. Pelo Marco Civil da Internet, operadoras de telecom são obrigadas a manter registros de conexão por prazo determinado, hoje um ano, sob pena de sanção. Essa retenção existe para fins de investigação, mas o dado fica lá, disponível.',
  'Porque o dado vale dinheiro. Além do obrigatório por lei, o uso comercial de dados de clientes opera sob a LGPD, que exige base legal e consentimento para compartilhamento. Na prática, o mercado de dados cresce mais rápido do que a transparência sobre quem compra o quê.',
  'Porque o vazamento acontece fora da sua vista. Casos internacionais documentaram operadoras vendendo acesso a localização quase em tempo real para intermediários, que revendiam para qualquer pagante, inclusive caçadores de recompensas. Não é teoria, é processo judicial com multa aplicada.',
];

const MITIGA = [
  'Aceite o custo estrutural e reduza o marginal. Enquanto o aparelho se conecta à rede celular, a operadora sabe em qual antena você está. Isso não tem configuração que desligue. O que dá para reduzir é tudo ao redor.',
  'Use modo avião quando não precisa de rede. Menos tempo transmitindo, menos rastro de antena. Para quem não depende de mensagens instantâneas, o hábito muda pouco a rotina e muda muito o retrato.',
  'Entenda o que a VPN faz e não faz. Ela esconde da operadora o destino do seu tráfego, e por isso protege a lista de serviços que você usa. Ela não esconde a sua posição: a antena continua vendo o aparelho.',
  'Avalie um chip de dados com identidade mínima para uso cotidiano fora de casa, separado da linha principal onde ficam banco e recuperação de contas. Dividir contextos limita o que um único registro revela.',
  'Exercite seus direitos de titular na LGPD: pedir à operadora acesso, correção e eliminação dos dados que a lei permite eliminar, e recusar compartilhamentos para marketing quando o canal existir. O efeito individual é pequeno, o hábito não é.',
];

const FAQ = [
  { q: 'A operadora sabe o que eu escrevo e navego?', a: 'O conteúdo, não. Sites com HTTPS e apps com criptografia protegem o que trafega. A operadora vê metadados: horários, volumes, destinos de conexão, e a localização por antena. Em vigilância, metadado vale tanto quanto conteúdo, às vezes mais.' },
  { q: 'VPN esconde minha localização da operadora?', a: 'Não. A VPN esconde para onde você navega, não onde você está. Sua conexão continua passando pela antena mais próxima, e esse registro permanece. Quem promete anonimato de localização via VPN está vendendo o que não entrega.' },
  { q: 'Isso tudo é legal?', a: 'A retenção de registros de conexão é obrigação legal com finalidade declarada de investigação. O compartilhamento comercial depende de base legal e consentimento sob a LGPD. O que frequentemente ultrapassa o razoável é o uso secundário desses dados, e por isso auditorias, multas e processos existem no setor.' },
  { q: 'Chip pré-pago me torna anônimo?', a: 'Não. O cadastro de chip pré-pago é obrigatório no Brasil, vinculado a CPF. Pré-pago muda o modelo de cobrança, não o registro de identidade nem o rastro de antena.' },
  { q: 'Como reduzir o rastro sem virar eremita?', a: 'Combine camadas: modo avião fora de uso, VPN para esconder destinos, chip de dados com identidade mínima para contextos expostos, e revisão periódica das permissões e autorizações que você já concedeu. Perfeição não existe, proporção sim.' },
];

export default function OperadoraVendeDadosLocalizacao() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Como sua operadora vende seus dados de localização',
        description: 'Enquanto você usa o celular, a operadora registra onde você esteve, com quem falou e para onde navega: o que é obrigatório por lei, o que vira mercadoria, e como reduzir o rastro sem largar o celular.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/operadora-vende-dados-localizacao',
        primaryKeyword: 'operadora vende dados de localização',
        lsiKeywords: ['dados de localização operadora', 'metadados de celular', 'retenção de dados marco civil', 'LGPD operadora', 'venda de dados telefônicos', 'rastreamento por antena', 'privacidade celular Brasil'],
        longTailKeywords: ['operadora sabe onde eu estou', 'como operadora vende dados de localização', 'quanto tempo operadora guarda registros', 'como reduzir rastros da operadora'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Ameaças Específicas', url: '/seguranca-mobile/operadora-vende-dados-localizacao' }, { name: 'Operadora e localização', url: '/seguranca-mobile/operadora-vende-dados-localizacao' }],
        schemaType: 'Article', articleSection: 'Ameaças Específicas', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/imsi-catcher-como-funciona', '/seguranca-mobile/vpn-no-celular'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Antenas de telecomunicações sobre a skyline de uma cidade ao anoitecer" eyebrow="Segurança Mobile" category="Ameaças Específicas" icon={Radio} title="Sua Operadora Sabe Onde Você Esteve" lede="Cada antena que atendeu o seu celular deixou um registro. E esse registro tem mercado." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Cidade ao anoitecer vista de cima com antenas no telhado" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>Enquanto o seu celular está ligado e com sinal, a operadora mantém um diário. Qual antena te atendeu, a que horas, com quem você falou, quanto trafegou, para quais destinos. Não porque alguém está te perseguindo, mas porque é assim que a rede funciona, e porque a lei manda guardar boa parte disso.</p>
              <p className="mt-7">O que transforma esse diário em problema não é a existência do registro, é o destino dele. Entre a obrigação legal de reter e o mercado de dados que cresce ao redor, a sua localização e a sua rotina viraram ativo comercial, negociado com mais transparência para quem compra do que para quem é o dado.</p>
              <p className="mt-7">Esta página separa as três camadas: o que a operadora registra por necessidade técnica, o que retém por obrigação legal, e o que circula por interesse comercial. E o que, dentro disso, você consegue efetivamente reduzir.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={mapaAsset} alt="Mapa noturno de cidade visto de cima com marcador de localização brilhando" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / O que ela registra" dark>O diário que você <span className="smx-copper-soft font-editorial font-normal italic">não assina, mas assina.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              {REGISTRA.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card-dark group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between">{i % 2 === 0 ? <MapPin className="smx-copper-soft h-7 w-7" /> : <Database className="smx-copper-soft h-7 w-7" />}<span className="smx-copper-soft text-xs font-black tracking-[0.25em]">REGISTRO {String(i + 1).padStart(2, '0')}</span></div>
                  <p className="text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={mapaAsset} alt="Marcador de localização pulsando sobre mapa noturno de cidade" caption="A antena mais próxima é uma declaração de presença. Cada conexão é um ponto nesse mapa." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={datacenterAsset} alt="Corredor de servidores em data center com luzes azuis" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / Por que guardam e como vira dinheiro">Entre a lei <span className="smx-editorial">e o mercado.</span></Heading>
            <div className="grid gap-5">
              {PORQUE.map((text, i) => (
                <motion.article key={text} {...reveal(i * .06)} className="smx-card group grid gap-5 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full">{(() => { const Icon = i === 0 ? Server : i === 1 ? Receipt : MapPin; return <Icon className="h-6 w-6" />; })()}</div>
                  <p className="self-center text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={datacenterAsset} alt="Corredor de racks de servidores em data center" caption="Seu registro mora aqui dentro, entre milhares de outros. A pergunta relevante é quem além da operadora acessa." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={janelaAsset} alt="Pessoa ao lado de uma janela à noite com torres de telecom ao fundo" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / O que dá para reduzir" dark>Custo estrutural, <span className="smx-copper-soft font-editorial font-normal italic">hábito opcional.</span></Heading>
            <div className="grid gap-4">
              {MITIGA.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/vpn-no-celular">VPN no celular, o que cobre de verdade <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/bluetooth-wifi-rastreamento">O rastreamento por Bluetooth e Wi-Fi <ArrowRight /></Link></Button>
            </div>
            <Figure asset={janelaAsset} alt="Pessoa com celular ao lado de janela com torres de telecomunicações ao fundo" caption="A torre que te atende está sempre à vista. A decisão que resta é quanto tempo do dia você passa transmitindo." />
          </div>
        </section>

        <FaqSection asset={simAsset} alt="Mãos trocando chip SIM em balcão de loja" faq={FAQ} />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={faturasAsset} alt="Celular sobre pilha de faturas e documentos à mesa" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="05 / A fatura que ninguém lê">Seus dados <span className="smx-editorial">também têm contrato.</span></Heading>
            <motion.div {...reveal(.08)} className="max-w-4xl space-y-7 text-lg leading-[1.75] md:text-xl">
              <p>Antes de assinar ou renovar um plano, leia a política de privacidade da operadora com uma pergunta na cabeça: com quem vocês compartilham dados, para qual finalidade, e como eu recuso? As respostas existem, ainda que escritas para cansar o leitor.</p>
              <p>A LGPD dá a você, titular, o direito de acessar o que a operadora mantém sobre você, corrigir o que estiver errado e recusar usos que dependem de consentimento. Não é escudo perfeito, mas é o único instrumento formal que coloca você na conversa.</p>
            </motion.div>
            <Figure asset={faturasAsset} alt="Faturas e documentos empilhados sob um celular escuro" caption="A letra miúda do plano é onde a sua localização ganha cláusula comercial. Leia com a pergunta certa." />
          </div>
        </section>

        <Veredito headline={<>A rede cobra <span className="smx-copper-soft font-editorial font-normal italic">em dados.</span></>} paragraphs={[
          'Usar rede celular é aceitar que a operadora saiba, antena por antena, onde você esteve. Esse é o custo estrutural, e nenhuma configuração o elimina.',
          'O que está no seu alcance é cortar o excedente: menos tempo transmitindo, destinos de tráfego escondidos com VPN, contextos separados por chip, e uso dos direitos de titular que a lei já garante.',
          'Não se trata de desaparecer. Trata-se de decidir, com consciência, quanto do seu mapa a operadora recebe por padrão, e quanto você devolve por escolha.',
        ]} />

        <TrailSection chapter="Ameaças Específicas" cards={[
          { to: '/seguranca-mobile/bluetooth-wifi-rastreamento', title: 'Bluetooth e Wi-Fi', desc: 'O rastreamento que não depende de chip nem de antena da operadora.', icon: Plane },
          { to: '/seguranca-mobile/imsi-catcher-como-funciona', title: 'IMSI Catcher', desc: 'A antena falsa que transforma a rede celular em sensor.', icon: RadioTower },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: FileWarning },
        ]} />
      </main>
      <span className="hidden"><BatteryWarning /></span>
    </>
  );
}
