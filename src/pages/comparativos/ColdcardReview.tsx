import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Lock, KeyRound, Cable, ChevronDown, ArrowRight,
  CheckCircle2, XCircle, AlertTriangle, Flame, Eye, Scale,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/bitcoin-hardware-wallet.webp';
import setupImg from '@/assets/infra-hardware-wallet.webp';
import seedImg from '@/assets/btc-seed-backup.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const PROS = [
  'Air-gap total via cartão microSD: a Coldcard nunca precisa de cabo USB conectado a um computador online para assinar transações.',
  'Duress PIN: um PIN de emergência que abre uma carteira falsa com saldo baixo, útil sob coação física.',
  'Brick Me PIN: um PIN que apaga o dispositivo por completo, protegendo contra tentativa de força bruta ou apreensão.',
  'Anti-phishing words: palavras únicas configuradas por você que aparecem no dispositivo, confirmando que não é um clone falsificado.',
  'Elemento seguro duplo, com dois chips independentes que precisam concordar antes de liberar qualquer assinatura.',
  'Suporte nativo e maduro a multisig e PSBT, testado por anos pela comunidade técnica de Bitcoin.',
  'Foco só em Bitcoin, sem suporte a outras moedas, reduzindo superfície de ataque no firmware.',
];

const CONTRAS = [
  'Interface pouco amigável para iniciantes: menus em texto, sem os floreios visuais de concorrentes mais modernos.',
  'Curva de aprendizado real. Configurar direito exige ler a documentação, não só seguir um app bonito.',
  'Preço elevado para quem está começando com pouco capital em Bitcoin.',
  'Tela pequena em modelos anteriores ao Q, dificultando a verificação de endereços longos.',
  'Dependência de cartão microSD como meio de transporte de dados, o que exige um leitor de cartão no computador ou celular usado.',
];

const NAO_SERVE = [
  'Quem quer comprar, configurar em cinco minutos e nunca mais ler nada sobre segurança.',
  'Quem pretende usar a mesma carteira para múltiplas criptomoedas além de Bitcoin.',
  'Quem tem pavor de qualquer processo técnico e prefere pagar por suporte humano constante.',
  'Quem guarda valores muito pequenos, para os quais uma carteira de software bem configurada já seria suficiente.',
];

const PASSOS = [
  { n: '01', titulo: 'Verifique o lacre físico', texto: 'Antes de ligar, confira o lacre de segurança da caixa e compare com as instruções no site oficial. Qualquer sinal de violação, devolva imediatamente e não configure o dispositivo.' },
  { n: '02', titulo: 'Gere a seed dentro do próprio dispositivo', texto: 'Nunca aceite uma seed já pronta vinda de fora. A Coldcard gera as 24 palavras usando fonte de aleatoriedade própria, sem depender do seu computador ou celular.' },
  { n: '03', titulo: 'Anote a seed em papel e depois em aço', texto: 'A anotação em papel é só o primeiro passo. Para proteção real contra fogo e água, transfira depois para uma placa de backup em aço inoxidável.' },
  { n: '04', titulo: 'Configure PIN principal, duress PIN e brick me', texto: 'Defina um PIN forte para uso diário, um duress PIN para cenários de coação e, se desejar, um brick me PIN para apagamento de emergência. Anote a lógica de cada um em local seguro e separado da seed.' },
  { n: '05', titulo: 'Ative as anti-phishing words', texto: 'Configure as palavras de verificação que só você e o dispositivo original conhecem. Isso impede clones físicos de te enganar durante o uso.' },
  { n: '06', titulo: 'Teste a recuperação antes de mover valor relevante', texto: 'Simule a recuperação da seed em outro dispositivo compatível com padrão BIP39, com um valor pequeno primeiro. Só depois disso movimente o grosso do patrimônio.' },
  { n: '07', titulo: 'Configure PSBT com a carteira coordenadora', texto: 'Use Sparrow, Electrum ou o app oficial para gerar a transação (PSBT), transferir via microSD para a Coldcard, assinar offline e devolver o arquivo assinado para transmissão.' },
];

const FAQ = [
  { q: 'A Coldcard é realmente 100% air-gap?', a: 'Sim, na configuração recomendada. Toda transferência de dados de transação acontece via cartão microSD ou, nos modelos Q, também por QR Code e NFC opcional. O dispositivo nunca precisa se conectar por cabo USB a um computador online para assinar.' },
  { q: 'O que acontece se eu digitar o duress PIN por engano?', a: 'O dispositivo abre uma carteira alternativa, com saldo que você mesmo definiu previamente, sem indicar que existe uma carteira principal escondida. É uma camada de proteção contra coação, não um erro de configuração.' },
  { q: 'Posso perder tudo se usar o brick me PIN sem querer?', a: 'Sim, esse é o propósito dele: apagar o dispositivo de forma irreversível. Por isso ele deve ser memorizado com extremo cuidado e nunca anotado junto da seed, para evitar apagamento acidental.' },
  { q: 'A Coldcard funciona bem em arranjo multisig com outras marcas?', a: 'Sim. Por seguir o padrão PSBT e ter suporte robusto a multisig, a Coldcard combina bem com Jade Core, Trezor e outras carteiras compatíveis com o mesmo padrão, formando arranjos 2 de 3 entre marcas diferentes.' },
  { q: 'Vale a pena comprar Coldcard usada para economizar?', a: 'Não é recomendado. Supply chain comprometida é o maior risco de uma hardware wallet de terceiro, mesmo com lacre aparentemente intacto. Compre sempre de canal oficial ou revendedor autorizado.' },
  { q: 'Preciso saber programar para usar a Coldcard?', a: 'Não é necessário programar, mas é necessário ler a documentação oficial com atenção. A curva de aprendizado é real, e quem tenta configurar sem entender os conceitos corre risco de errar backup ou PIN.' },
];

function Selo({ ok }: { ok: boolean }) {
  return ok ? <CheckCircle2 size={20} style={{ color: '#0e3b3a' }} /> : <XCircle size={20} style={{ color: '#b45836' }} />;
}

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Hardware wallet Bitcoin escura em macro fotografia sobre superfície de madeira, representando a Coldcard focada em air-gap total"
        width={1024}
        height={1024}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,59,58,0.6) 0%, rgba(14,59,58,0.4) 40%, rgba(14,59,58,0.92) 100%)' }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-3 mb-8">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md" style={{ backgroundColor: 'rgba(244,237,228,0.15)', color: '#f4ede4', border: '1px solid rgba(244,237,228,0.3)' }}>
            <Scale size={11} className="inline mr-2" /> Comparativos · Review
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tight max-w-[18ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Coldcard, a review{' '}
          <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(232,163,107,0.45)' }}>
            sem filtro.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Air-gap total via microSD, duress PIN, brick me e anti-phishing words. A régua de segurança da indústria, com prós, contras e para quem ela definitivamente não serve.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function ColdcardReview() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/comparativos/coldcard-review"
        custom={{
          title: 'Coldcard Review 2026: Air-gap Total, Duress PIN e Brick Me',
          description: 'Review completa e honesta da Coldcard: air-gap via microSD, PSBT, duress PIN, brick me, anti-phishing words, prós, contras e para quem não serve.',
          canonical: 'https://lordjunnior.com.br/comparativos/coldcard-review',
          primaryKeyword: 'coldcard review',
          lsiKeywords: ['coldcard air-gap', 'duress pin coldcard', 'brick me coldcard', 'coldcard mk4', 'coldcard q', 'hardware wallet só bitcoin'],
          longTailKeywords: ['vale a pena comprar coldcard', 'como configurar coldcard primeira vez', 'coldcard é segura mesmo'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Comparativos', url: '/comparativos' },
            { name: 'Coldcard Review', url: '/comparativos/coldcard-review' },
          ],
          schemaType: 'Article',
          articleSection: 'Comparativos',
          relatedPages: ['/comparativos/melhores-hardware-wallets', '/comparativos/trezor-review', '/autocustodia/seed-phrase-em-aco', '/multisig-bitcoin'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>O que é a Coldcard</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                A carteira que{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não facilita nada de graça.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  A Coldcard é produzida pela Coinkite e existe desde 2019 com um objetivo declarado: ser a hardware wallet mais paranoica do mercado para quem só usa Bitcoin. Não existe versão multi-moeda, não existe aplicativo bonito com onboarding gamificado, não existe atalho fácil.
                </p>
                <p>
                  O modelo Mk4 trouxe elemento seguro duplo e conector para bateria removível. O modelo Q, mais recente, adicionou teclado físico completo e câmera para leitura de QR Code, ampliando as formas de transferência de dados sem abrir mão do air-gap.
                </p>
                <p>
                  Não é produto para quem quer resolver Bitcoin em cinco minutos. É produto para quem está disposto a estudar um pouco de criptografia aplicada em troca de uma das cadeias de segurança mais robustas já construídas para autocustódia pessoal.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Air-gap e recursos de segurança */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 02</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8">
                Air-gap real,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>não de marketing.</span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                <p>
                  Toda a assinatura de transação acontece com o dispositivo fisicamente desconectado de qualquer computador online. A transação não assinada (PSBT) é gravada num cartão microSD pela carteira coordenadora, você insere o cartão na Coldcard, confere os detalhes na tela, assina, e devolve o arquivo assinado para transmissão.
                </p>
                <p>
                  Nos modelos Q, o mesmo fluxo pode acontecer por QR Code, eliminando até a necessidade do cartão físico. Nenhum malware instalado no seu computador consegue extrair a chave privada por esse caminho, porque simplesmente não existe caminho elétrico entre as duas pontas.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)}>
              <img
                src={setupImg}
                alt="Cartão microSD sendo inserido em hardware wallet Bitcoin escura para transferência de transação assinada offline"
                width={1024}
                height={768}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Duress PIN, Brick Me, Anti-phishing */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 03</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Três recursos que{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>quase nenhuma concorrente tem.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: KeyRound, titulo: 'Duress PIN', texto: 'PIN de emergência que abre uma carteira alternativa com saldo baixo definido por você. Útil em cenário de coação física, quando negar que existe carteira principal não é opção segura.' },
                { icon: Flame, titulo: 'Brick Me PIN', texto: 'PIN que apaga permanentemente todos os dados do dispositivo. Última linha de defesa contra apreensão ou tentativa de força bruta prolongada.' },
                { icon: Eye, titulo: 'Anti-phishing words', texto: 'Frase única configurada por você, exibida pelo dispositivo antes de pedir o PIN. Se a palavra não aparecer, o hardware pode ser um clone falsificado, e você deve interromper o uso na hora.' },
              ].map((c) => (
                <motion.div key={c.titulo} {...fade(0.05)} className="p-8 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                  <c.icon size={28} style={{ color: '#c97a3d' }} className="mb-5" />
                  <h3 className="text-xl font-black mb-3" style={{ color: '#0e3b3a' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Prós e contras */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 04</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Prós e contras{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>sem meio-termo.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div {...fade(0.05)}>
                <h3 className="text-lg font-black uppercase tracking-wider mb-6" style={{ color: '#e8a36b' }}>Pontos fortes</h3>
                <div className="space-y-4">
                  {PROS.map((p, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle2 size={20} className="shrink-0 mt-1" style={{ color: '#e8a36b' }} />
                      <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{p}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...fade(0.1)}>
                <h3 className="text-lg font-black uppercase tracking-wider mb-6" style={{ color: '#e0a98a' }}>Pontos fracos</h3>
                <div className="space-y-4">
                  {CONTRAS.map((p, i) => (
                    <div key={i} className="flex gap-3">
                      <XCircle size={20} className="shrink-0 mt-1" style={{ color: '#e0a98a' }} />
                      <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{p}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Para quem não serve */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 05</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Honestidade antes da venda</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Para quem a Coldcard{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>não serve.</span>
              </h2>
              <div className="space-y-5">
                {NAO_SERVE.map((n, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                    <AlertTriangle size={22} className="shrink-0 mt-1" style={{ color: '#b45836' }} />
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{n}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Passo a passo */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-start">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 06</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Primeiro uso,{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>passo a passo.</span>
              </h2>
              <img
                src={seedImg}
                alt="Seed phrase de Bitcoin anotada em papel ao lado de placa de backup em aço, etapa crítica da configuração da Coldcard"
                width={1024}
                height={1024}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <div className="space-y-4">
              {PASSOS.map((p, i) => (
                <motion.div key={p.n} {...fade(i * 0.04)} className="p-6 rounded-2xl flex gap-5" style={{ backgroundColor: '#fff' }}>
                  <span className="text-3xl font-black shrink-0" style={{ color: '#c97a3d', fontFamily: "'Playfair Display', serif" }}>{p.n}</span>
                  <div>
                    <h3 className="text-lg font-black mb-2" style={{ color: '#0e3b3a' }}>{p.titulo}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{p.texto}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 07</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Perguntas frequentes{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>sobre a Coldcard.</span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#ece2d3', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-500" style={{ color: '#c97a3d', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
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

        {/* CAPÍTULO 8 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Continue sua trilha</span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Antes de comprar,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>compare as outras opções.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { to: '/comparativos/melhores-hardware-wallets', titulo: 'Comparativo completo de hardware wallets', texto: 'Coldcard, Trezor, Jade, Krux e Foundation lado a lado, critério por critério.' },
                { to: '/comparativos/trezor-review', titulo: 'Review completa: Trezor', texto: 'Safe 3, Safe 5, o vazamento de 2017 e para quem ela serve.' },
                { to: '/multisig-bitcoin', titulo: 'Multisig Bitcoin', texto: 'Como combinar Coldcard com outras marcas num arranjo 2 de 3.' },
                { to: '/dicionario-cripto', titulo: 'Glossario de soberania', texto: 'Do UTXO ao domicilio fiscal: todos os termos tecnicos deste site explicados em uma pagina.' },
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
