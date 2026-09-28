import { useEffect } from 'react';
import { KeyRound, ArrowRight, CheckCircle2, XCircle, Clock, HardDrive, Fingerprint, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/seguranca-mobile/2fa/tf-hero.webp';
import chaveAsset from '@/assets/seguranca-mobile/2fa/tf-chave.webp';
import phishingAsset from '@/assets/seguranca-mobile/2fa/tf-phishing.webp';
import smsAsset from '@/assets/seguranca-mobile/2fa/tf-sms.webp';
import cartaoAsset from '@/assets/seguranca-mobile/imsi-catcher/imsi-cartao.webp';
import dialAsset from '@/assets/seguranca-mobile/imei/im-dial.webp';

const POR_QUE = [
  'SIM Swap: o golpe administrativo que transfere seu número para um chip de terceiro. Toda proteção que depende de receber SMS no seu número cai junto com ele. É o vetor que invalida o segundo fator por SMS de uma vez.',
  'Interceptação: redes 2G e antenas falsas podem capturar SMS em trânsito. O código de verificação que viaja por rede rebaixada fica exposto antes de chegar ao seu aparelho.',
  'SS7: falhas estruturais na sinalização global de telecomunicações permitem desviar SMS entre operadoras. É um risco documentado, difícil de atacar individualmente, mas real em alvos de interesse.',
  'Máquina de phishing: o SMS aparece na tela com confiança herdada do canal. Mensagens que imitam bancos e serviços já treinaram o usuário a ler e agir rápido, e o código de verificação é o alvo natural.',
];

const TOTPS = [
  { icon: Clock, titulo: 'Código que expira', texto: 'O aplicativo gera um código novo a cada 30 segundos, calculado a partir de um segredo compartilhado. O código vale apenas para aquela janela, e não existe nada para interceptar em trânsito.' },
  { icon: HardDrive, titulo: 'Sem rede envolvida', texto: 'A geração é local. Não depende de sinal, de operadora, de entrega de mensagem ou de infraestrutura de SMS. Funciona em modo avião, e não cai quando seu número é roubado.' },
  { icon: Fingerprint, titulo: 'Segredo no aparelho', texto: 'O segredo compartilhado fica no aparelho, não no canal. Para obter, o atacante precisa do aparelho ou da foto do QR code de configuração, o que reduz o vetor a acesso físico ou engenharia social dirigida.' },
];

const CHAVE = [
  'A chave física usa um protocolo que valida o domínio real do site, não apenas o que aparece na tela. O ataque de phishing que funciona contra SMS e contra aplicativo autenticador não funciona contra a chave: ela simplesmente não assina um domínio falso.',
  'A chave não depende de bateria, de rede, de aparelho carregado ou de número ativo. É o segundo fator mais independente de infraestrutura que existe em uso prático.',
  'O custo é a fricção e a dependência de hardware: é preciso carregar a chave, e a perda dela exige plano de recuperação documentado antes do incidente, não depois.',
];

const FAQ = [
  { q: 'O authenticator realmente é mais seguro que SMS?', a: 'Sim, para o vetor que mais dói. O SMS depende do seu número chegar ao seu aparelho, e isso é exatamente o que o SIM Swap destrói. O authenticator gera o código localmente, sem rede, e não cai quando o número é roubado. Para interceptação em rede comprometida, o authenticator também vence, porque nada do código trafega.' },
  { q: 'E se eu perder o celular com o authenticator?', a: 'Este é o elo real, e é por isso que o processo de recuperação importa mais do que a escolha do segundo fator. Serviços sérios oferecem códigos de recuperação impressos ou backup criptografado do authenticator. Quem não planeja recuperação fica com o problema oposto: proteção demais no acesso, perda total quando algo sai do plano.' },
  { q: 'O authenticator pode ser phished?', a: 'Sim, e é a limitação real do método. Um site falso bem montado pode capturar o código no momento em que você o digita e usá-lo imediatamente. A chave física resolve esse vetor, porque valida o domínio real. Entre os dois, o authenticator continua sendo uma melhoria considerável sobre SMS, não uma solução completa.' },
  { q: 'A chave física substitui o authenticator?', a: 'Para quem está disposto a carregar hardware, sim, e é a camada mais alta de proteção contra phishing. Para a maioria, a combinação prática é: authenticator em tudo que aceita, chave física nos serviços de maior valor, e recuperação documentada em ambos.' },
  { q: 'Receber SMS de banco ainda vale como proteção?', a: 'Vale mais do que nada, e menos do que parece. É o segundo fator mais frágil por causa de SIM Swap e interceptação, mas continua sendo uma barreira contra acesso automático com senha vazada. A recomendação prática é: aceite SMS quando for a única opção, e troque para authenticator nos serviços que oferecem.' },
];

export default function AutenticadorVsSms() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: '2FA: app authenticator vs SMS',
        description: 'Comparação técnica entre autenticador (TOTP), SMS e chave física no segundo fator de autenticação: o que cada método protege, o que falha, e o papel do SIM Swap na decisão.',
        canonical: 'https://lordjunnior.com.br/seguranca-mobile/2fa-authenticator-vs-sms',
        primaryKeyword: '2fa authenticator vs sms',
        lsiKeywords: ['autenticação de dois fatores', 'totp authenticator', 'sms código de verificação', 'sim swap 2fa', 'chave de segurança física', 'phishing segunda senha', 'segurança de contas online'],
        longTailKeywords: ['autenticador ou sms qual é mais seguro', 'por que sms não é bom segundo fator', 'chave física substitui authenticator', 'como recuperar acesso se perder o authenticator'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Guias Práticos de Hardening', url: '/seguranca-mobile/2fa-authenticator-vs-sms' }, { name: '2FA: authenticator vs SMS', url: '/seguranca-mobile/2fa-authenticator-vs-sms' }],
        schemaType: 'Article', articleSection: 'Guias Práticos de Hardening', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/sim-swap-como-funciona', '/seguranca-mobile/signal-vs-whatsapp-vs-telegram'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Macro de tela de autenticador com caixas de código e cronômetro circular iluminado em cobre" eyebrow="Segurança Mobile" category="Guias Práticos de Hardening" icon={KeyRound} title="2FA: Authenticator ou SMS, o Que Protege de Verdade" lede="O código de verificação é a última barreira entre uma senha vazada e o acesso à sua conta. A escolha do segundo fator decide se essa barreira sobrevive a um SIM Swap, a um phishing e a uma rede comprometida." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Tela de autenticador com código e cronômetro em smartphone" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>O SMS é o segundo fator mais comum e o mais frágil. Ele depende de uma cadeia inteira, operadora, sinalização global, entrega em rede, para colocar um código de seis dígitos no seu aparelho. Qualquer elo dessa cadeia que falhe entrega o código a quem não deveria tê-lo. E o elo mais explorado, o SIM Swap, é um golpe administrativo que transfere seu número para um chip de terceiro sem tocar no seu aparelho.</p>
              <p className="mt-7">O aplicativo autenticador gera o código localmente, no seu aparelho, a partir de um segredo compartilhado no momento da configuração. Não existe mensagem viajando, não existe rede para interceptar, e o roubo do número não produz o código. É uma melhoria estrutural, não uma preferência.</p>
              <p className="mt-7">A chave física vai além: valida o domínio real do site, e o phishing que captura o código do authenticator não captura a assinatura da chave. Este guia compara os três métodos com honestidade sobre o que cada um resolve e o que cada um deixa passar.</p>
            </motion.div>
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={cartaoAsset} alt="Macro de chip de cartão SIM sobre superfície escura" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="02 / Por que SMS falha" dark>Quatro vetores, <span className="smx-copper-soft font-editorial font-normal italic">uma mesma cadeia.</span></Heading>
            <div className="grid gap-4">
              {POR_QUE.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={smsAsset} alt="Notificação de SMS com código de verificação em tela de smartphone" caption="O SMS entregou um código na tela. A pergunta que ele não responde é: a operadora entregou para quem, em qual rede, e sob qual identidade." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={heroAsset} alt="Tela de autenticador com caixas de código iluminadas" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="03 / O autenticador: como funciona">Código local, <span className="smx-editorial">rede ausente.</span></Heading>
            <div className="grid gap-5 md:grid-cols-3">
              {TOTPS.map((g, i) => (
                <motion.article key={g.titulo} {...reveal(i * .06)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1">
                  <div className="mb-6 flex items-center justify-between"><g.icon className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">{String(i + 1).padStart(2, '0')}</span></div>
                  <h3 className="text-xl font-black leading-tight tracking-normal">{g.titulo}</h3>
                  <p className="mt-4 text-lg leading-[1.75]">{g.texto}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={heroAsset} alt="Cronômetro circular e caixas de código em tela de autenticador" caption="O código de 30 segundos não atravessa rede alguma. É o único segundo fator que não depende de infraestrutura para funcionar." />
          </div>
        </section>

        <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={chaveAsset} alt="Chave física de segurança USB-C sobre mesa escura ao lado de smartphone" />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="04 / A chave física: o teto atual" dark>Assinatura do domínio, <span className="smx-copper-soft font-editorial font-normal italic">não da tela.</span></Heading>
            <div className="grid gap-4">
              {CHAVE.map((text, i) => (
                <motion.article key={text} {...reveal(i * .05)} className="smx-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8">
                  <div className="smx-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div>
                  <p className="self-center text-lg leading-[1.75] text-background/90">{text}</p>
                </motion.article>
              ))}
            </div>
            <Figure asset={chaveAsset} alt="Chave de segurança física com conector USB-C em macro" caption="A chave física é o único segundo fator que valida o domínio real. O phishing que captura códigos não captura assinatura de hardware." />
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
          <Backdrop asset={phishingAsset} alt="Página de login suspeita em tela de smartphone com seta apontando para link" light />
          <div className="mx-auto max-w-[1600px]">
            <Heading chapter="05 / A recuperação: o elo real">Proteção que vira <span className="smx-editorial">prisão própria.</span></Heading>
            <div className="grid gap-5 md:grid-cols-2">
              <motion.article {...reveal()} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><AlertTriangle className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">SEM PLANO</span></div>
                <p className="text-lg leading-[1.75]">Perder o aparelho com o authenticator sem códigos de recuperação é perder o acesso às contas protegidas. O serviço bloqueia, e a recuperação fica à mercê de suporte lento ou de prova de identidade invasiva. A proteção sem plano de saída é uma armadilha própria.</p>
              </motion.article>
              <motion.article {...reveal(.08)} className="smx-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div className="mb-6 flex items-center justify-between"><ShieldCheck className="smx-copper h-7 w-7" /><span className="smx-muted text-xs font-black tracking-[0.25em]">COM PLANO</span></div>
                <p className="text-lg leading-[1.75]">Códigos de recuperação impressos em papel e guardados em lugar físico seguro, backup criptografado do authenticator, e um segundo aparelho ou chave física para o caso extremo. O plano é o que transforma autenticação forte em proteção sustentável.</p>
              </motion.article>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/sim-swap-como-funciona">SIM Swap, como o golpe funciona <ArrowRight /></Link></Button>
              <Button asChild size="lg" className="smx-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/signal-vs-whatsapp-vs-telegram">Aplicativos de mensagem <ArrowRight /></Link></Button>
            </div>
          </div>
        </section>

        <FaqSection asset={phishingAsset} alt="Página de login suspeita em smartphone" faq={FAQ} />

        <Veredito headline={<>O melhor segundo fator é <span className="smx-copper-soft font-editorial font-normal italic">o que sobrevive ao plano.</span></>} paragraphs={[
          'O authenticator vence o SMS na camada que mais importa: independência de rede e resistência ao SIM Swap. A chave física vence os dois na camada de phishing, com custo de hardware e fricção. O SMS perde nos três cenários e ainda é melhor que nada.',
          'A decisão prática é por camada: authenticator em tudo que aceita, chave física nos serviços de maior valor, e SMS apenas onde não existe alternativa. Sem plano de recuperação, a proteção vira armadilha.',
          'A pergunta certa não é qual método é o mais seguro no papel. É se você consegue recuperar o acesso no dia em que o plano falha, porque ele vai falhar, e o que separa proteção de prisão é o plano.',
        ]} />

        <TrailSection chapter="Guias Práticos de Hardening" cards={[
          { to: '/seguranca-mobile/sim-swap-como-funciona', title: 'SIM Swap', desc: 'O golpe administrativo que rouba o seu número sem tocar no seu aparelho.', icon: AlertTriangle },
          { to: '/seguranca-mobile/checklist-permissoes-celular', title: 'Checklist de permissões', desc: 'Reveja câmera, microfone, localização e segundo plano em uma sessão de quinze minutos.', icon: ShieldCheck },
          { to: '/seguranca-mobile', title: 'Segurança Mobile', desc: 'Volte ao hub e escolha a próxima frente de proteção móvel.', icon: KeyRound },
        ]} />
      </main>
    </>
  );
}
