import { useEffect } from 'react';
import { PhoneOff, ArrowRight, BatteryWarning, FileWarning, Landmark, RadioTower, KeyRound, MessageSquareOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/sim-swap/sim-hero.webp';
import bandejaAsset from '@/assets/seguranca-mobile/sim-swap/sim-bandeja.webp';
import callcenterAsset from '@/assets/seguranca-mobile/sim-swap/sim-callcenter.webp';
import sinalAsset from '@/assets/seguranca-mobile/sim-swap/sim-sinal.webp';
import documentosAsset from '@/assets/seguranca-mobile/sim-swap/sim-documentos.webp';
import bancoAsset from '@/assets/seguranca-mobile/sim-swap/sim-banco.webp';

const GOLPE = [
  'Coleta: o criminoso junta dados seus de vazamentos, redes sociais e phishing. Nome, CPF, endereço, às vezes a foto de um documento que você mesmo publicou.',
  'Persuasão: ele contata a operadora, por telefone, chat ou loja física, fingindo ser você. Apresenta documentos falsificados, repete informações que só você deveria saber, e em alguns casos conta com um funcionário corrompido do outro lado.',
  'Transferência: a operadora, acreditando falar com o dono da linha, ativa um novo SIM em mãos do criminoso e desativa o seu. O número dele passa a ser o seu número.',
  'Colheita: cada código por SMS, cada recuperação de senha, cada confirmação bancária começa a chegar no aparelho dele. O seu 2FA por SMS, que você achava que era proteção, virou a porta de entrada.',
];

const ALVO = [
  { icon: Landmark, title: 'Sua conta bancária', text: 'Chave PIX cadastrada no número, senha de acesso recuperada por SMS, limite de transação elevado por ligação de "confirmação". É o alvo imediato e o mais lucrativo.' },
  { icon: MessageSquareOff, title: 'Seu WhatsApp', text: 'Com o número, o criminoso recadastra o WhatsApp no aparelho dele e usa a sua agenda para aplicar o golpe da falsa transferência nos seus contatos, assinando com a sua cara.' },
  { icon: KeyRound, title: 'Seu e-mail e suas redes', text: 'Todo serviço que aceita "enviar código por SMS" como prova de identidade cai em cascata: e-mail, redes, nuvem, cartões. Um número vale um império de contas.' },
];

const AGIR = [
  'Perdeu o sinal de repente, sem motivo, com o aparelho funcionando? Trate como alerta máximo. Não espere "voltar sozinho".',
  'Ligue para a operadora de outro telefone e exija o bloqueio imediato da linha e a investigação de troca de SIM. Peça registro por escrito do protocolo.',
  'Ligue para o banco e bloquee transações. Avise que o número foi comprometido e que códigos por SMS não devem ser aceitos como validação.',
  'Use outro aparelho ou computador confiável para trocar senhas das contas críticas, começando pelo e-mail principal, e ative 2FA por aplicativo autenticador, nunca mais por SMS.',
  'Recupere o WhatsApp pelo número e ative a verificação em duas etapas com PIN, para impedir novo sequestro.',
];

const FAQ = [
  { q: 'SIM Swap e clonagem de chip são a mesma coisa?', a: 'Não. Clonagem é um ataque técnico que copia o chip em si, e é rara contra SIMs modernos. SIM Swap é fraude administrativa: ninguém clona nada, a própria operadora transfere o seu número para outro chip acreditando falar com você. Por isso é mais comum e mais eficaz.' },
  { q: 'eSIM me protege de SIM Swap?', a: 'Reduz a parte física, já que não existe chip para clonar ou furtar. Não resolve a parte humana: se o atendente aceitar a fraude, o eSIM também pode ser transferido para outro aparelho. A proteção principal continua sendo o bloqueio e a senha de portabilidade junto à operadora.' },
  { q: 'Qual a primeira coisa que eu faço ao suspeitar?', a: 'Ligar de outro telefone para a operadora e bloquear a linha, e em seguida para o banco. Minutos importam: o criminoso costuma agir na primeira hora, drenando PIX e redefinindo senhas enquanto você ainda tenta entender por que o celular está sem sinal.' },
  { q: '2FA por SMS ainda serve para alguma coisa?', a: 'Serve como última camada, nunca como principal. O padrão seguro é aplicativo autenticador ou chave física como fator principal, e SMS apenas onde não existe alternativa. Todo serviço importante que oferecer alternativa ao SMS, use a alternativa.' },
  { q: 'O banco devolve o dinheiro perdido em SIM Swap?', a: 'Depende da apuração de cada caso, do tipo de transação e dos prazos de contestação. Não existe garantia automática, e prometer devolução seria desonesto. O que está sob seu controle é reduzir a chance do golpe e agir nos primeiros minutos, que é onde a maior parte das perdas acontece.' },
];

export default function SimSwapComoFunciona() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'SIM Swap: como te roubam o número e a conta',
        description: 'O golpe que não toca no seu celular: engenharia social contra a operadora transfere o seu número para outro chip e drena bancos, WhatsApp e e-mails. Como funciona e como travar.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/sim-swap-como-funciona',
        primaryKeyword: 'sim swap',
        lsiKeywords: ['sim swap como funciona', 'golpe da portabilidade', 'roubo de número de celular', 'clonagem de chip', '2FA por SMS risco', 'chave PIX celular', 'conta sequestrada whatsapp'],
        longTailKeywords: ['como funciona o golpe sim swap', 'perdi o sinal do celular e o banco foi esvaziado', 'como proteger o número da operadora de sim swap', '2FA por SMS é seguro'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Ameaças Específicas', url: '/seguranca-mobile/sim-swap-como-funciona' }, { name: 'SIM Swap', url: '/seguranca-mobile/sim-swap-como-funciona' }],
        schemaType: 'Article', articleSection: 'Ameaças Específicas', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/imsi-catcher-como-funciona', '/seguranca-mobile/vpn-no-celular'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Mão tocando na tela de um celular que acende sobre a mesa em ambiente escuro" eyebrow="Segurança Mobile" category="Ameaças Específicas" icon={PhoneOff} title="SIM Swap, o Roubo que Começa na Operadora" lede="Ninguém hackeia o seu celular. Hackeiam o atendimento da operadora, e o seu número muda de mãos." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Celular sendo usado em ambiente escuro" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>SIM Swap é o golpe em que o criminoso convence a sua operadora de que ele é você, e transfere o seu número para um chip novo que ele controla. Nada é instalado no seu aparelho, nenhuma senha sua é quebrada. A falha explorada é humana, do outro lado do balcão ou da linha de atendimento.</p>
              <p className="mt-7">Por que isso é grave: o número de celular virou a chave de tudo no Brasil. É chave PIX, é método de recuperação de e-mail, é o segundo fator de autenticação do banco, é a identidade do WhatsApp. Quem controla o número herda, em minutos, a maior parte da sua vida digital.</p>
              <p className="mt-7">E por isso o ataque é silencioso no começo: o único sintoma que você percebe é o celular morrendo de sinal. Nesse momento o golpe já aconteceu, e a corrida é contra o relógio.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={callcenterAsset} alt="Central de atendimento à noite com operadores ao telefone" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / Como o golpe funciona" dark>Quatro passos contra <span className="smx-copper-soft font-editorial font-normal italic">o balcão, não contra você.</span></Heading>
            <div className="grid gap-4">
              {GOLPE.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={callcenterAsset} alt="Operadores de central telefônica trabalhando sob luzes quentes à noite" caption="A batalha inteira acontece no atendimento da operadora. O seu aparelho é apenas o último a saber." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={bancoAsset} alt="Mão se aproximando de celular com notificação acesa" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / O que o número abre">Um número, <span className="smx-editorial">três portas abertas.</span></Heading>
            <div className="grid gap-5 md:grid-cols-3">
              {ALVO.map((item, i) => (
                <motion.article key={item.title} {...reveal(i * .06)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                  <div className="mb-6 flex items-center justify-between"><item.icon className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">0{i + 1}</span></div>
                  <h3 className="text-xl font-black leading-tight md:text-2xl">{item.title}</h3>
                  <p className="mt-4 text-lg leading-[1.75]">{item.text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={bancoAsset} alt="Dedo a um centímetro da tela de um celular iluminado no escuro" caption="Cada notificação de código é uma decisão: quem está do outro lado digitando esse código?" />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={sinalAsset} alt="Celular sobre tecido escuro com símbolo de ausência de sinal" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / Se o sinal morrer, cada minuto conta" dark>O plano de <span className="smx-copper-soft font-editorial font-normal italic">primeiros minutos.</span></Heading>
            <div className="grid gap-4">
              {AGIR.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={sinalAsset} alt="Celular deitado sobre tecido escuro exibindo símbolo de sem sinal" caption="Celular sem sinal sem explicação é o alarme de incêndio da sua identidade digital. Trate assim." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={documentosAsset} alt="Documentos pessoais sobre mesa de madeira sob luz de abajur" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="05 / Blindagem antes do golpe">Trave a porta <span className="smx-editorial">enquanto está intacta.</span></Heading>
            <div className="grid gap-4">
              {[
                'Peça à operadora para cadastrar senha de atendimento e bloqueio de portabilidade no seu CPF. Sem essa senha, nenhuma troca de SIM deveria acontecer, nem presencialmente. Confirme que a trava está ativa com uma ligação de teste.',
                'Migre o 2FA das contas críticas para aplicativo autenticador. Cada conta que sai do SMS é uma conta que o SIM Swap não abre sozinho.',
                'Remova o número como método de recuperação do e-mail principal e do banco sempre que houver alternativa. O número deveria ser um meio de contato, não uma chave mestra.',
                'No banco, use biometria ou PIN forte, mantenha limite de PIX compatível com a sua rotina e desconfie de qualquer ligação que peça "confirmação de código".',
                'Reduza a exposição de documentos e dados pessoais: o material do golpe começa no que vazou de você. Foto de documento publicada, currículo completo, formulários duvidosos.',
              ].map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card group grid gap-5 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75]">{text}</p>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/2fa-authenticator-vs-sms">Autenticador ou SMS, o comparativo <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/autocustodia">Agora leve isso para a autocustódia <ArrowRight /></Link></Button>
            </div>
            <Figure asset={documentosAsset} alt="Documentos e cartão sobre mesa escura com luz cobre" caption="Os dados que alimentam o golpe vieram de algum lugar. Cada documento que você não expõe é um tijolo a menos na ponte do criminoso." />
          </div>
        </section>

        <FaqSection asset={bandejaAsset} alt="Gaveta de chip e chave de ejeção sobre mesa escura" faq={FAQ} />

        <Veredito headline={<>O elo fraco <span className="smx-copper-soft font-editorial font-normal italic">não é o chip.</span></>} paragraphs={[
          'SIM Swap não é um ataque ao seu celular, é um ataque ao processo de identificação da operadora. Nenhuma tecnologia no seu aparelho impede um atendente convencido.',
          'A defesa real é remover o número do centro da sua arquitetura de contas: 2FA por aplicativo, recuperação sem SMS, senha de portabilidade ativa e limite bancário sob controle.',
          'E memorize o sintoma: sinal morto sem explicação. Quem reage nos primeiros minutos costuma sair com prejuízo pequeno. Quem espera "melhorar sozinho" descobre a transferência no extrato.',
        ]} />

        <TrailSection chapter="Ameaças Específicas" cards={[
          { to: '/seguranca-mobile/imsi-catcher-como-funciona', title: 'IMSI Catcher', desc: 'A antena falsa que identifica e localiza aparelhos na área, e o que ela não consegue.', icon: RadioTower },
          { to: '/seguranca-mobile/stalkerware-apps-espioes', title: 'Stalkerware', desc: 'Apps espiões instalados por quem teve acesso físico ao seu aparelho.', icon: BatteryWarning },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: FileWarning },
        ]} />
      </main>
    </>
  );
}
