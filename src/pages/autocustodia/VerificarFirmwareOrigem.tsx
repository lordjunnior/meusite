import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, ShieldAlert, Terminal, KeyRound, Fingerprint,
  AlertTriangle, ChevronDown, ArrowRight, PackageX, Lock,
  Cpu, FileWarning, Wrench, ExternalLink,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/firmware-origem/firmware-hero.webp';
import lacreImg from '@/assets/firmware-origem/firmware-lacre-hash.webp';
import terminalImg from '@/assets/firmware-origem/firmware-terminal-verificacao.webp';
import kruxImg from '@/assets/firmware-origem/firmware-krux-diy.webp';

/**
 * /autocustodia/verificar-firmware-origem
 * Padrão editorial Soberania: Sand #f4ede4/#ece2d3, Deep Teal #0e3b3a, cobre #e8a36b.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const SINAIS_ALERTA = [
  {
    n: '01',
    titulo: 'Lacre já rompido ou colado com cola diferente do resto da caixa',
    icon: PackageX,
    descricao:
      'Fabricantes sérios usam adesivos de segurança com padrão de fratura visível quando removidos. Se a etiqueta parece reaplicada, se a cola escorreu para fora da borda ou se o holograma está opaco em vez de refletir luz em ângulos diferentes, o aparelho já passou por mãos que não deveriam tocá-lo antes da sua.',
  },
  {
    n: '02',
    titulo: 'Dispositivo chega ligado, configurado ou com seed impressa',
    icon: FileWarning,
    descricao:
      'Nenhuma hardware wallet legítima sai de fábrica com PIN definido, seed gerada ou papel de recuperação já preenchido dentro da caixa. Se alguém "generosamente" já fez a configuração inicial para você, ou incluiu uma frase de doze palavras impressa, essa frase é conhecida por quem a escreveu. Não existe atalho seguro para pular a geração de seed no seu próprio dispositivo, na sua própria tela, sem testemunhas.',
  },
  {
    n: '03',
    titulo: 'Preço abaixo do mercado em marketplace aberto',
    icon: ShieldAlert,
    descricao:
      'Um desconto de 40% sobre o preço oficial não é sorte, é isca. Vendedores de hardware wallet falsificada ou adulterada competem em preço porque o custo real da operação é baixo: compram unidades genuínas, abrem, plantam firmware malicioso ou componente espião, fecham com lacre falsificado e revendem com margem alta mesmo "barateando" para o comprador.',
  },
  {
    n: '04',
    titulo: 'Compra feita fora do site oficial do fabricante',
    icon: PackageX,
    descricao:
      'Marketplace, loja de terceiro, perfil de rede social vendendo "com desconto" ou até unidade de segunda mão de alguém que você não conhece pessoalmente: qualquer elo entre a fábrica e sua mão que não seja o canal oficial é uma janela de tempo em que o aparelho pode ter sido interceptado. Quanto mais links na cadeia, maior a superfície de ataque.',
  },
];

const ETAPAS_VERIFICACAO = [
  {
    n: '01',
    titulo: 'Baixe o firmware apenas do repositório oficial',
    icon: Terminal,
    descricao:
      'GitHub oficial do fabricante ou site institucional, nunca um link recebido por mensagem, nunca um espelho de terceiro. Confira a URL letra por letra antes de clicar em download.',
  },
  {
    n: '02',
    titulo: 'Confira o hash SHA256 do arquivo baixado',
    icon: Fingerprint,
    descricao:
      'O hash é a impressão digital do arquivo. Se um único byte for alterado, o hash muda por completo. Compare o valor gerado localmente com o valor publicado pelo fabricante, nunca confie em hash copiado de um terceiro site.',
  },
  {
    n: '03',
    titulo: 'Verifique a assinatura PGP com a chave pública oficial',
    icon: KeyRound,
    descricao:
      'O hash confere autenticidade de conteúdo, mas não de origem. A assinatura PGP prova que quem assinou o arquivo possui a chave privada do fabricante. Importe a chave pública publicada nos canais oficiais e valide a assinatura antes de instalar qualquer coisa no dispositivo.',
  },
  {
    n: '04',
    titulo: 'Confirme o attestation no próprio dispositivo',
    icon: Cpu,
    descricao:
      'Coldcard, Trezor e Jade têm mecanismos próprios de verificação de autenticidade que rodam dentro do hardware, comparando um certificado gravado em fábrica com um desafio criptográfico. Esse é o único teste que valida a genuinidade do silício, não apenas do arquivo de firmware.',
  },
];

const DISPOSITIVOS = [
  {
    nome: 'Coldcard',
    descricao:
      'A Coldcard implementa verificação de autenticidade baseada em elemento seguro com certificado gravado em fábrica. No menu de segurança do dispositivo existe a opção de checagem de genuinidade, que desafia o chip seguro e confirma se a resposta corresponde ao certificado esperado, sem depender de conexão com internet. Além disso, todo firmware oficial é assinado e o dispositivo recusa instalar imagem sem assinatura válida das chaves da fabricante.',
  },
  {
    nome: 'Trezor',
    descricao:
      'Os modelos com elemento seguro (Trezor Safe) fazem attestation via certificado de fábrica verificável pelo Trezor Suite, que confirma a origem do chip antes de liberar o uso normal. O firmware é assinado digitalmente e o próprio dispositivo mostra um alerta explícito na tela caso detecte firmware não oficial ou não assinado durante o boot.',
  },
  {
    nome: 'Blockstream Jade',
    descricao:
      'O Jade utiliza attestation em conjunto com o esquema de "PIN server" e assinatura de firmware verificada no momento do boot. O dispositivo também expõe o hash do firmware instalado na própria tela, permitindo comparação manual contra o valor publicado pela Blockstream antes de qualquer operação com fundos.',
  },
];

const COMANDOS = [
  {
    sistema: 'Linux',
    comando: 'sha256sum firmware.bin\ngpg --verify firmware.bin.sig firmware.bin',
    nota: 'Importe a chave pública oficial antes com gpg --import chave-publica.asc e confirme o fingerprint publicado no site do fabricante.',
  },
  {
    sistema: 'macOS',
    comando: 'shasum -a 256 firmware.bin\ngpg --verify firmware.bin.sig firmware.bin',
    nota: 'Instale gnupg via Homebrew (brew install gnupg) caso o comando gpg não exista no terminal padrão.',
  },
  {
    sistema: 'Windows',
    comando: 'CertUtil -hashfile firmware.bin SHA256\ngpg --verify firmware.bin.sig firmware.bin',
    nota: 'Use Gpg4win para obter o binário gpg no PowerShell. Rode o CertUtil no mesmo diretório do arquivo baixado.',
  },
];

const SE_FALHAR = [
  'Não instale o firmware sob nenhuma circunstância, mesmo que o dispositivo pareça funcionar normalmente sem ele.',
  'Não conecte o dispositivo a nenhuma seed real, nem para testes, nem "só para ver como funciona".',
  'Fotografe o lacre, a embalagem, o hash divergente e a saída completa do terminal antes de mexer em qualquer coisa.',
  'Contate o suporte oficial do fabricante pelo canal público do site institucional, nunca por link recebido de terceiro.',
  'Solicite reembolso ou troca informando claramente que a verificação de assinatura falhou, com as evidências coletadas.',
  'Denuncie o vendedor caso a compra tenha sido feita fora do canal oficial, para reduzir o alcance da fraude a outros compradores.',
];

const FAQ = [
  {
    q: 'Como verificar se a hardware wallet é original antes mesmo de abrir a caixa?',
    a: 'Compre exclusivamente no site oficial do fabricante ou em revendedor autorizado listado publicamente por ele. Ao receber, confira se o lacre está intacto, sem sinais de reaplicação, se o holograma muda de padrão em diferentes ângulos de luz e se o número de série da caixa corresponde ao exibido no menu do dispositivo, quando o fabricante disponibiliza essa checagem.',
  },
  {
    q: 'Um lacre holográfico intacto garante que o dispositivo é genuíno?',
    a: 'Não. O lacre é apenas evidência de manuseio, não prova criptográfica de autenticidade. Falsificadores replicam hologramas com qualidade suficiente para enganar a olho nu. A única verificação que realmente prova genuinidade é o attestation criptográfico feito pelo próprio dispositivo contra o certificado gravado em fábrica, combinado com a checagem de assinatura do firmware.',
  },
  {
    q: 'Por que uma seed que já vem escrita dentro da caixa é sempre fraude?',
    a: 'Porque a seed precisa ser gerada dentro do próprio dispositivo, na hora, usando entropia interna que nunca sai daquele hardware. Se uma frase de recuperação já está impressa quando a caixa chega até você, alguém teve acesso a ela antes de você, o que elimina qualquer garantia de exclusividade. Uma seed pré-existente é, por definição, uma seed comprometida.',
  },
  {
    q: 'É seguro comprar hardware wallet usada de segunda mão?',
    a: 'Não é recomendado, mesmo que o vendedor pareça confiável. É impossível confirmar remotamente se o firmware foi adulterado, se houve troca de componente interno ou se a seed anterior foi realmente apagada de forma segura. Para valores que vão proteger patrimônio relevante, o custo de um dispositivo novo lacrado é irrisório perto do risco de herdar um ataque de cadeia de suprimentos de terceiro.',
  },
  {
    q: 'O que fazer se o hash do firmware baixado não bater com o publicado pelo fabricante?',
    a: 'Pare imediatamente. Não instale o arquivo, não force a atualização e não conecte o dispositivo a nenhuma seed real. Divergência de hash indica arquivo corrompido no download ou, no pior cenário, uma tentativa de distribuir firmware malicioso. Baixe novamente de fonte oficial, refaça a verificação e, se o problema persistir, contate o suporte do fabricante pelo canal público.',
  },
  {
    q: 'Attestation e verificação de assinatura PGP são a mesma coisa?',
    a: 'Não. A assinatura PGP prova que o arquivo de firmware que você baixou foi realmente publicado pelo fabricante e não foi alterado no caminho. O attestation é uma prova diferente, feita dentro do próprio chip do dispositivo, que confirma que o hardware físico em suas mãos é genuíno e não uma clonagem ou unidade adulterada. Uma verificação de segurança completa exige as duas checagens, não apenas uma.',
  },
  {
    q: 'Um Krux montado por mim mesmo elimina totalmente a necessidade de confiar no fabricante?',
    a: 'Reduz drasticamente, mas não elimina por completo. Ao montar um Krux com hardware genérico (ESP32 e leitor de câmera comprados separadamente) e compilar o firmware open source você mesmo a partir do código-fonte auditável, você corta a dependência de confiar em um fabricante único de hardware wallet fechado. Ainda assim, resta a necessidade de confiar na cadeia de suprimentos dos componentes genéricos e na sua própria disciplina ao compilar e verificar o código.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Textura macro escura de circuito e selo de segurança representando verificação de origem de hardware wallet"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.35) 40%, rgba(14,59,58,0.9) 100%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(244,237,228,0.15)',
              color: '#f4ede4',
              border: '1px solid rgba(244,237,228,0.3)',
            }}
          >
            <ShieldCheck size={11} className="inline mr-2" /> Autocustódia · Cadeia de Suprimentos
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Como verificar se a hardware wallet é{' '}
          <span
            style={{
              color: '#e8a36b',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(232,163,107,0.45), 0 0 80px rgba(232,163,107,0.25)',
            }}
          >
            original.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Um lacre bonito não prova nada. A verificação real acontece no hash, na assinatura PGP e no attestation dentro do próprio silício. Este é o processo completo, sem atalho, para confirmar que o dispositivo que vai guardar sua seed nunca passou por mãos erradas.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function VerificarFirmwareOrigem() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/autocustodia/verificar-firmware-origem"
        custom={{
          title: 'Como Verificar se a Hardware Wallet É Original: Guia Completo',
          description:
            'Como verificar se a hardware wallet é original: ataque de cadeia de suprimentos, lacre holográfico, attestation em Coldcard, Trezor e Jade, hash SHA256, assinatura PGP e a alternativa DIY com Krux.',
          canonical: 'https://lordjunnior.com.br/autocustodia/verificar-firmware-origem',
          primaryKeyword: 'como verificar se a hardware wallet é original',
          lsiKeywords: [
            'ataque de cadeia de suprimentos hardware wallet',
            'attestation Coldcard Trezor Jade',
            'verificar hash firmware carteira Bitcoin',
            'assinatura PGP firmware hardware wallet',
            'lacre holográfico hardware wallet falso',
            'Krux hardware wallet DIY',
          ],
          longTailKeywords: [
            'como saber se minha Coldcard é original',
            'como verificar assinatura PGP do firmware Trezor',
            'o que fazer se comprei hardware wallet de marketplace',
            'seed já escrita na caixa é golpe',
            'como verificar hash SHA256 no Windows Linux macOS',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Autocustódia', url: '/autocustodia' },
            { name: 'Verificar Firmware e Origem', url: '/autocustodia/verificar-firmware-origem' },
          ],
          schemaType: 'Article',
          articleSection: 'Autocustódia',
          relatedPages: [
            '/comparativos/melhores-hardware-wallets',
            '/comparativos/coldcard-review',
            '/comparativos/trezor-review',
            '/autocustodia/hardware-wallet-diy-bitcoin',
            '/autocustodia/backup-seed-phrase-guia',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div
        className="relative min-h-screen"
        style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}
      >
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — A analogia do ataque de cadeia de suprimentos */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  O ataque de cadeia de suprimentos
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Imagine um cofre entregue{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  com a chave já copiada.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Pense num cofre de banco entregue na sua casa por um motoboy terceirizado. A porta parece intacta, o lacre da fábrica está lá, o manual está no lugar certo. Só que, em algum ponto entre a fábrica e a sua porta, alguém abriu o cofre, copiou a combinação, fechou tudo de novo com um lacre idêntico e mandou seguir viagem. Você recebe um objeto que parece perfeito e que já está comprometido antes mesmo de você tocar nele.
                </p>
                <p>
                  É exatamente isso que um ataque de cadeia de suprimentos faz com uma hardware wallet. O invasor não precisa hackear seu computador nem adivinhar sua senha. Ele intercepta o produto em algum elo entre a fábrica e você: um funcionário desonesto na distribuição, um revendedor que abre a caixa para "testar", um marketplace que revende unidade devolvida sem controle de origem, ou até um vendedor que monta uma operação inteira só para clonar e reembalar dispositivos genuínos com componente espião ou firmware malicioso plantado.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #e8a36b', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  A caixa lacrada prova que alguém fechou a caixa. Não prova quem, nem com o quê.
                </blockquote>
                <p>
                  O resultado prático de um ataque bem-sucedido é sempre o mesmo: a seed que você gera "dentro" do dispositivo comprometido já é conhecida por quem plantou a armadilha, ou o firmware modificado assina transações de um jeito diferente do que a tela mostra, desviando fundos no momento exato em que você acha que está protegendo seu patrimônio. Por isso a verificação de origem não é paranoia de entusiasta técnico. É a etapa mais barata e mais ignorada de toda a jornada de autocustódia.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Sinais de alerta (faixa escura) */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 02 · Sinais de alerta
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Quatro sinais que{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  ninguém deveria ignorar.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(244,237,228,0.75)' }}>
                Antes de qualquer verificação técnica, existem indícios visíveis que já bastam para rejeitar o dispositivo e pedir reembolso.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(244,237,228,0.15)' }}>
              {SINAIS_ALERTA.map((e, i) => (
                <motion.div key={e.n} {...fade(i * 0.06)} className="group relative p-8 md:p-10 transition-all duration-500" style={{ backgroundColor: '#0e3b3a' }}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-xl transition-transform group-hover:scale-110 duration-500" style={{ backgroundColor: 'rgba(232,163,107,0.15)', border: '1px solid rgba(232,163,107,0.3)' }}>
                      <e.icon size={22} style={{ color: '#e8a36b' }} />
                    </div>
                    <span className="text-2xl font-black" style={{ color: '#e8a36b' }}>{e.n}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-4" style={{ color: '#f4ede4' }}>{e.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.78)' }}>{e.descricao}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Marketplace e revendedor desconhecido + imagem lacre */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 03 · Onde nunca comprar
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Marketplace é vitrine{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  de qualquer um.
                </span>
              </h2>
              <div className="space-y-6 text-lg md:text-xl font-light leading-[1.7]" style={{ color: '#2d3a37' }}>
                <p>
                  Plataformas de marketplace aberto não fabricam nem inspecionam o que é vendido nelas. Qualquer pessoa cria uma conta de vendedor hoje e anuncia amanhã. Isso significa que uma hardware wallet anunciada como "nova, lacrada, com nota fiscal" pode ter passado pelas mãos de quem abriu, adulterou e refechou o pacote sem que a plataforma tenha qualquer meio de detectar isso antes do envio.
                </p>
                <p>
                  O mesmo vale para revendedor desconhecido fora do canal oficial: loja física sem contrato de distribuição publicado pelo fabricante, perfil de rede social vendendo "com desconto exclusivo", ou grupo de mensagens oferecendo unidade "importada direto". Nenhum desses canais garante rastreabilidade de origem. A única forma confiável de comprar é diretamente pelo site institucional do fabricante ou por um distribuidor listado oficialmente por ele, com nota fiscal e canal de suporte verificável.
                </p>
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl group">
                <img
                  src={lacreImg}
                  alt="Macro escura de lacre de segurança holográfico e trilhas de circuito, simbolizando verificação de hash e origem de firmware"
                  loading="lazy"
                  width={1600}
                  height={1100}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(14,59,58,0.85) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: 'rgba(244,237,228,0.7)' }}>
                    Lacre não é prova criptográfica
                  </p>
                  <p className="text-2xl md:text-4xl font-light italic max-w-3xl" style={{ color: '#f4ede4', fontFamily: "'Playfair Display', serif" }}>
                    O único selo que importa de verdade fica dentro do chip, não na etiqueta.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Pré-inicializado e seed pré-escrita (faixa clara escura) */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(232,163,107,0.15)', color: '#b5651d' }}>
                <AlertTriangle size={14} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Capítulo 04 · Fraude explícita</span>
              </div>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Se a seed já está escrita,{' '}
                <span style={{ color: '#b5651d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  o golpe já aconteceu.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div {...fade(0)} className="p-8 md:p-10 rounded-2xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(14,59,58,0.08)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <Lock size={22} style={{ color: '#b5651d' }} />
                  <p className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: '#b5651d' }}>O que é um aparelho pré-inicializado</p>
                </div>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  É um dispositivo que chega até você já configurado: PIN definido, seed gerada e, em alguns casos, até carteiras de teste criadas. A promessa por trás disso costuma ser "praticidade, já vem pronto para usar". Na prática, isso destrói a única garantia real de uma hardware wallet, que é a geração de entropia acontecer dentro do chip, na sua presença, sem que ninguém mais tenha visto o processo.
                </p>
              </motion.div>
              <motion.div {...fade(0.06)} className="p-8 md:p-10 rounded-2xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(14,59,58,0.08)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <FileWarning size={22} style={{ color: '#b5651d' }} />
                  <p className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: '#b5651d' }}>Por que a seed pré-escrita é sempre fraude</p>
                </div>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  Uma frase de recuperação só tem valor de segurança se for única e desconhecida por qualquer pessoa além de você. Se ela já está impressa no cartão dentro da caixa quando o produto chega, isso significa que alguém a gerou e a registrou antes de você. Não importa o quão convincente seja a embalagem ou o discurso de venda: qualquer fundo enviado para uma carteira aberta com essa seed pode ser drenado a qualquer momento por quem a escreveu.
                </p>
              </motion.div>
            </div>

            <motion.div {...fade(0.1)} className="mt-10 p-8 md:p-10 rounded-2xl" style={{ backgroundColor: '#0e3b3a' }}>
              <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.9)' }}>
                <span className="font-bold" style={{ color: '#e8a36b' }}>Regra sem exceção: </span>
                a única seed segura é aquela gerada por você, na tela do próprio dispositivo, depois da verificação de origem, e anotada com a própria caneta em material físico resistente. Qualquer variação disso, por mais conveniente que pareça, é vetor de roubo.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Lacres holográficos não bastam */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                  Capítulo 05
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Por que o lacre não basta
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Holograma engana o olho,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não engana o hash.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Lacres holográficos e adesivos com padrão de fratura são úteis como primeira camada de suspeita, mas técnicas de falsificação de embalagem evoluíram junto com a indústria. Existem operações capazes de replicar hologramas, reimprimir caixas e reproduzir até o cheiro do plástico de vedação original. Confiar apenas na inspeção visual do lacre é, na prática, confiar num truque de mágica: convincente, mas irrelevante para o que realmente importa dentro do chip.
                </p>
                <p>
                  A verificação que de fato prova genuinidade não depende de nenhuma etiqueta externa. Ela acontece em duas camadas técnicas, uma sobre o arquivo de firmware baixado no computador e outra sobre o próprio hardware, feita pelo chip seguro dentro do dispositivo. Essas duas camadas são o que os próximos capítulos detalham: hash e assinatura PGP de um lado, attestation de fábrica do outro.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Attestation por dispositivo (faixa escura) */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 06 · Verificação por dispositivo
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Attestation em{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Coldcard, Trezor e Jade.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(244,237,228,0.75)' }}>
                Cada fabricante implementa a checagem de forma diferente, mas o princípio é o mesmo: comparar uma resposta criptográfica do chip com um certificado gravado na linha de produção.
              </p>
            </motion.div>

            <div className="space-y-4">
              {DISPOSITIVOS.map((d, i) => (
                <motion.div key={d.nome} {...fade(i * 0.06)} className="p-8 md:p-10 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.15)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck size={22} style={{ color: '#e8a36b' }} />
                    <h3 className="text-2xl font-black" style={{ color: '#f4ede4' }}>{d.nome}</h3>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{d.descricao}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Etapas de verificação (grid) */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 07 · O processo completo
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Quatro etapas,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  zero atalho.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {ETAPAS_VERIFICACAO.map((v, i) => (
                <motion.div key={v.n} {...fade(i * 0.05)} className="p-8 md:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-1" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(14,59,58,0.08)' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <v.icon size={22} style={{ color: '#b5651d' }} />
                    <p className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: '#b5651d' }}>Etapa {v.n}</p>
                  </div>
                  <h3 className="text-2xl md:text-[1.7rem] font-black leading-tight mb-4" style={{ color: '#0e3b3a' }}>{v.titulo}</h3>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{v.descricao}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 8 — Comandos por sistema operacional + imagem terminal */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6 lg:order-2">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 08 · Comandos reais
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                O terminal não mente,{' '}
                <span style={{ color: '#b5651d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  a caixa pode mentir.
                </span>
              </h2>
              <p className="text-lg md:text-xl font-light leading-[1.7] mb-8" style={{ color: '#2d3a37' }}>
                O comando para gerar o hash é idêntico em espírito nos três sistemas: transformar o arquivo em uma sequência única de caracteres e compará-la, byte a byte, com a publicada oficialmente.
              </p>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-6 lg:order-1">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={terminalImg}
                  alt="Textura macro escura de terminal com linhas de código representando verificação de hash e assinatura de firmware"
                  loading="lazy"
                  width={1600}
                  height={1100}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          <div className="max-w-[1600px] mx-auto mt-16 grid md:grid-cols-3 gap-6">
            {COMANDOS.map((c, i) => (
              <motion.div key={c.sistema} {...fade(i * 0.06)} className="p-8 rounded-2xl" style={{ backgroundColor: '#0e3b3a' }}>
                <p className="text-xs uppercase tracking-[0.3em] font-bold mb-4" style={{ color: '#e8a36b' }}>{c.sistema}</p>
                <pre
                  className="text-sm md:text-base font-mono leading-relaxed whitespace-pre-wrap p-4 rounded-xl mb-4"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', color: '#f4ede4', border: '1px solid rgba(232,163,107,0.2)' }}
                >
                  {c.comando}
                </pre>
                <p className="text-sm leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.nota}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 9 — O que fazer se a verificação falhar (faixa escura, armadilhas) */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(232,163,107,0.12)', color: '#e8a36b' }}>
                <AlertTriangle size={14} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Capítulo 09 · Se algo falhar</span>
              </div>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Se o hash não bater,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  o próximo passo é parar.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {SE_FALHAR.map((a, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="flex gap-6 p-6 md:p-8 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.15)' }}>
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black" style={{ backgroundColor: 'rgba(232,163,107,0.2)', color: '#e8a36b' }}>{i + 1}</div>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.92)' }}>{a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 10 — DIY com Krux + imagem */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 10 · A alternativa DIY
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Krux: eliminar a confiança{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  no fabricante.
                </span>
              </h2>
              <div className="space-y-6 text-lg md:text-xl font-light leading-[1.7] mb-8" style={{ color: '#2d3a37' }}>
                <p>
                  Toda a discussão sobre lacre, hash e attestation parte de uma premissa incômoda: em algum grau, você está confiando num fabricante único que projeta e produz um hardware fechado. O Krux propõe outro caminho. É um projeto de código aberto que transforma um módulo genérico ESP32, comprado separadamente de qualquer loja de eletrônicos, em uma hardware wallet completa, funcionando de forma isolada, sem conexão permanente à internet.
                </p>
                <p>
                  Como você mesmo escolhe o hardware genérico, compila o firmware a partir do código-fonte publicado e verifica cada etapa da montagem, a superfície de ataque de cadeia de suprimentos praticamente desaparece: não existe um fabricante centralizado interessado em plantar um backdoor específico para o seu modelo, porque não existe "o seu modelo" fabricado em série por uma única empresa. O preço dessa independência é técnico: exige disciplina para compilar corretamente, entender o processo de gravação de firmware e aceitar uma curva de aprendizado maior do que a de um dispositivo comercial pronto para usar.
                </p>
              </div>
              <Link
                to="/autocustodia/hardware-wallet-diy-bitcoin"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wide uppercase transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}
              >
                <Wrench size={16} /> Ver o guia completo de montagem DIY
              </Link>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={kruxImg}
                  alt="Macro escura de componentes eletrônicos genéricos e trilhas de placa, representando a montagem DIY de uma hardware wallet Krux"
                  loading="lazy"
                  width={1600}
                  height={1100}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 11 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 11 · Perguntas que importam
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Antes de conectar,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  a dúvida certa.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#f4ede4', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-500" style={{ color: '#e8a36b', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5, ease: APPLE_EASE }} className="px-6 md:px-8 pb-8">
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 12 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Um dispositivo genuíno{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não sustenta autocustódia sozinho.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { to: '/comparativos/melhores-hardware-wallets', titulo: 'Melhores hardware wallets em 2026', texto: 'Comparativo completo entre modelos, preços e níveis de segurança disponíveis hoje.' },
                { to: '/comparativos/coldcard-review', titulo: 'Coldcard: review completo', texto: 'Attestation, air gap e por que a Coldcard lidera em segurança para quem guarda valor real.' },
                { to: '/comparativos/trezor-review', titulo: 'Trezor: review completo', texto: 'Elemento seguro, verificação de firmware e usabilidade do modelo mais conhecido do mercado.' },
                { to: '/autocustodia/hardware-wallet-diy-bitcoin', titulo: 'Hardware wallet DIY com Krux', texto: 'O guia completo de montagem para quem quer eliminar a confiança em fabricante único.' },
                { to: '/autocustodia/backup-seed-phrase-guia', titulo: 'Backup de seed phrase: guia definitivo', texto: 'Como armazenar fisicamente sua frase de recuperação depois de gerar a seed com segurança.' },
                { to: '/dicionario-cripto', titulo: 'Dicionário Cripto', texto: 'Attestation, air gap, entropia e todos os termos técnicos deste guia explicados em uma página.' },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group p-8 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: '#e8a36b' }}>
                    Acessar <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
