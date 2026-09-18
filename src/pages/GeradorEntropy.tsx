import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  WifiOff, Wifi, RefreshCw, Eye, EyeOff, Trash2,
  ShieldCheck, AlertTriangle, MousePointerClick, Fingerprint, Cpu, Dices, ArrowRight,
} from 'lucide-react';
import { entropyToMnemonic, validateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english.js';
import { sha256 } from '@noble/hashes/sha2';
import { hmac } from '@noble/hashes/hmac';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';
import { SITE_URL } from '@/lib/site';

const PAGE_URL = `${SITE_URL}/ferramentas/entropy`;

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

/* ═══════════════════════════════════════════════════════════════
   NÚCLEO CRIPTOGRÁFICO
   Toda a segurança vem de crypto.getRandomValues (CSPRNG do sistema
   operacional). O movimento do ponteiro entra como chave de um HMAC
   sobre essa saída: contribui de verdade, mas nunca substitui o CSPRNG.
   A lista de palavras é a BIP-39 oficial com 2048 entradas e o
   mnemônico sai com checksum válido.
═══════════════════════════════════════════════════════════════ */

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function deriveMnemonic(pool: Uint8Array, strengthBytes: 16 | 32) {
  // 1. Aleatoriedade do sistema operacional, criptograficamente segura.
  const systemRandom = new Uint8Array(32);
  crypto.getRandomValues(systemRandom);

  // 2. Entropia física coletada do ponteiro, condensada em 32 bytes.
  const humanKey = sha256(pool);

  // 3. Mistura irreversível das duas fontes.
  const mixed = hmac(sha256, humanKey, systemRandom);

  const entropy = mixed.slice(0, strengthBytes);
  const mnemonic = entropyToMnemonic(entropy, wordlist);

  return {
    words: mnemonic.split(' '),
    valid: validateMnemonic(mnemonic, wordlist),
    fingerprint: bytesToHex(sha256(mixed)).slice(0, 16),
    bits: strengthBytes * 8,
  };
}

const TARGET_SAMPLES = 200;

const GeradorEntropy: React.FC = () => {
  const [wordCount, setWordCount] = useState<12 | 24>(24);
  const [samples, setSamples] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof deriveMnemonic> | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  const poolRef = useRef<number[]>([]);
  const areaRef = useRef<HTMLDivElement>(null);
  const lastSample = useRef(0);
  const trailId = useRef(0);

  const progress = Math.min((samples / TARGET_SAMPLES) * 100, 100);
  const ready = samples >= TARGET_SAMPLES;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  // A seed nunca sobrevive à saída da página.
  useEffect(() => () => { poolRef.current = []; }, []);

  const collect = useCallback((clientX: number, clientY: number, pressure: number) => {
    const now = performance.now();
    if (now - lastSample.current < 16) return;
    lastSample.current = now;

    const frac = now % 1;
    poolRef.current.push(
      clientX, clientY,
      Math.floor(now), Math.floor(frac * 1e6),
      Math.floor(pressure * 1e4),
    );

    setSamples((prev) => (prev >= TARGET_SAMPLES ? prev : prev + 1));

    const rect = areaRef.current?.getBoundingClientRect();
    if (rect) {
      trailId.current += 1;
      setTrail((prev) => [
        ...prev.slice(-16),
        {
          x: ((clientX - rect.left) / rect.width) * 100,
          y: ((clientY - rect.top) / rect.height) * 100,
          id: trailId.current,
        },
      ]);
    }
  }, []);

  const handlePointer = (e: React.PointerEvent) => {
    if (ready) return;
    collect(e.clientX, e.clientY, e.pressure || 0.5);
  };

  const generate = () => {
    if (!ready) return;
    const samplesBuffer = new Float64Array(poolRef.current);
    const pool = new Uint8Array(samplesBuffer.buffer.slice(0));
    setResult(deriveMnemonic(pool, wordCount === 24 ? 32 : 16));
    setRevealed(false);
  };

  const reset = () => {
    poolRef.current = [];
    setSamples(0);
    setResult(null);
    setRevealed(false);
    setTrail([]);
  };

  const changeCount = (count: 12 | 24) => {
    setWordCount(count);
    setResult(null);
    setRevealed(false);
  };

  const faq = [
    {
      question: 'Este gerador usa Math.random()?',
      answer: 'Não. A aleatoriedade vem de crypto.getRandomValues, a interface criptográfica do navegador alimentada pelo gerador do sistema operacional. Math.random é previsível a partir do estado interno do motor JavaScript e nunca deve tocar em material de chave.',
    },
    {
      question: 'A lista de palavras é a BIP-39 oficial?',
      answer: 'Sim. São as 2048 palavras da wordlist inglesa oficial, e o mnemônico é montado com o checksum exigido pelo padrão. Ele é aceito por Ledger, Trezor, Coldcard, Sparrow, Electrum e qualquer carteira compatível.',
    },
    {
      question: 'O movimento do ponteiro serve para alguma coisa?',
      answer: 'Serve como entrada adicional. Posições, tempos com resolução de microssegundo e pressão são condensados em um hash SHA-256 que vira chave de um HMAC aplicado sobre a saída do gerador do sistema. A entropia humana soma, mas a segurança não depende dela.',
    },
    {
      question: 'Posso guardar Bitcoin em uma seed gerada no navegador?',
      answer: 'Para quantias relevantes, não. O navegador roda em um sistema de uso geral, com extensões, memória paginada em disco e histórico de malware. Gere a seed dentro de uma hardware wallet ou com dados físicos. Use esta ferramenta para estudo, para carteiras de teste e para entender o padrão.',
    },
    {
      question: 'Alguma palavra sai desta página?',
      answer: 'Não. Todo o cálculo acontece no seu dispositivo, sem requisição de rede, sem armazenamento local e sem telemetria. Ao sair da página ou clicar em apagar, o material é descartado da memória.',
    },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Gerador de Entropia BIP-39',
      description: 'Ferramenta client-side que gera mnemônicos BIP-39 válidos usando crypto.getRandomValues, wordlist oficial de 2048 palavras e checksum real, com entropia adicional coletada do ponteiro.',
      url: PAGE_URL,
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      author: { '@type': 'Person', name: 'Lord Junnior', url: SITE_URL },
      inLanguage: 'pt-BR',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];

  return (
    <div
      className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/40 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      <Helmet>
        <title>Gerador de Entropia BIP-39 Client-Side | Lord Junnior</title>
        <meta
          name="description"
          content="Gerador de mnemônico BIP-39 com crypto.getRandomValues, wordlist oficial de 2048 palavras e checksum válido. Client-side, sem rede, com o aviso honesto de quando usar hardware wallet."
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Gerador de Entropia BIP-39 Client-Side" />
        <meta property="og:description" content="Aleatoriedade do sistema operacional, wordlist BIP-39 completa e checksum real. Nada sai do seu dispositivo." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/heroes/og-gerador-seed.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gerador de Entropia BIP-39 Client-Side" />
        <meta name="twitter:description" content="CSPRNG do sistema, 2048 palavras oficiais e checksum válido, tudo no seu dispositivo." />
        <meta name="twitter:image" content={`${SITE_URL}/heroes/og-gerador-seed.png`} />
        {schemas.map((schema, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>

      <ScrollToTop />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* Grão de filme */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      <style>{`
        @keyframes trailFade { 0%{opacity:.55;transform:scale(1)} 100%{opacity:0;transform:scale(2.4)} }
        .trail-dot { animation: trailFade 1.1s ease-out forwards; }
        @keyframes wordSlide { from{opacity:0;transform:translateY(8px) scale(.96);filter:blur(4px)} to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)} }
        .word-reveal { animation: wordSlide .45s cubic-bezier(0.22,1,0.36,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .trail-dot, .word-reveal { animation: none !important; }
        }
      `}</style>

      <CinematicHero
        image="/heroes/gerador-entropy.webp"
        phase="Ferramenta de Segurança"
        title="Gerador de Entropia"
        subtitle="Mnemônico BIP-39 com aleatoriedade do sistema operacional, wordlist oficial de 2048 palavras e checksum válido. Tudo calculado no seu dispositivo."
        icon={Fingerprint}
        accentColor="emerald"
        backLink="/ferramentas"
        backLabel="Torre de Controle"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-10 pb-32">

        {/* Cabeçalho e status de rede */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Cpu size={22} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Geração auditável
              </h2>
              <p className="text-stone-500 text-sm">
                crypto.getRandomValues, HMAC-SHA256 com entropia do ponteiro e checksum BIP-39.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp} custom={1}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition-colors ${
              isOnline
                ? 'bg-amber-500/8 border-amber-500/20 text-amber-400'
                : 'bg-emerald-500/8 border-emerald-500/20 text-emerald-400'
            }`}
          >
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            {isOnline ? 'Prefira desconectar a internet' : 'Dispositivo offline'}
          </motion.div>
        </motion.div>

        {/* Posição editorial */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <motion.div
            variants={fadeUp} custom={0}
            className="bg-amber-500/[0.04] border border-amber-500/15 rounded-2xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/15">
                <AlertTriangle size={16} className="text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-amber-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Onde esta ferramenta serve e onde ela não serve
              </h3>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              O mnemônico produzido aqui é tecnicamente válido: entropia de 128 ou 256 bits vinda do gerador
              criptográfico do sistema operacional, as 2048 palavras oficiais da BIP-39 e checksum correto.
              Qualquer carteira compatível vai aceitar essas palavras.
            </p>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              O elo fraco não é a matemática, é o ambiente. Um navegador roda sobre um sistema de uso geral, com
              extensões, memória que pode ir para o disco e um histórico farto de malware que procura exatamente
              por sequências de palavras. Por isso a regra da casa continua a mesma: para guardar valor de verdade,
              a seed nasce dentro de uma hardware wallet ou de dados físicos, nunca de uma aba aberta.
            </p>
            <div className="bg-amber-950/20 border border-amber-500/10 rounded-xl p-4">
              <p className="text-amber-400 text-[11px] font-bold leading-relaxed">
                Use esta página para estudar o padrão, conferir implementações e criar carteiras de teste.
                Para fundos reais, gere na hardware wallet, escreva em papel ou metal e nunca fotografe.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coleta */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] text-stone-500 uppercase tracking-[0.3em] font-bold">Palavras</span>
              <div className="flex rounded-xl border border-white/[0.06] overflow-hidden">
                {([12, 24] as const).map((count) => (
                  <button
                    key={count}
                    onClick={() => changeCount(count)}
                    className={`px-5 py-2 text-sm font-bold transition-all duration-300 ${
                      wordCount === count
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-white/[0.02] text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-stone-600">
                {wordCount === 24 ? '256 bits de entropia' : '128 bits de entropia'}
              </span>
            </div>

            <div
              ref={areaRef}
              onPointerMove={handlePointer}
              className="flex-1 border border-white/[0.06] bg-white/[0.02] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[320px] transition-all duration-500 relative overflow-hidden cursor-crosshair backdrop-blur-sm touch-none"
              style={{
                borderColor: progress > 0 ? `rgba(16,185,129,${Math.min(progress / 250, 0.32)})` : undefined,
              }}
            >
              {!ready && trail.map((point) => (
                <div
                  key={point.id}
                  className="trail-dot absolute w-2 h-2 rounded-full bg-emerald-400/40 pointer-events-none"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                />
              ))}

              {!ready ? (
                <div className="text-center relative z-10 pointer-events-none">
                  <MousePointerClick
                    size={40}
                    className="text-stone-600 mx-auto mb-6"
                    style={{ opacity: 0.3 + progress / 200 }}
                  />
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Mova o cursor ou o dedo aqui
                  </h3>
                  <p className="text-stone-500 text-sm max-w-xs mx-auto">
                    Cada amostra registra posição, tempo em microssegundos e pressão. Esse material entra como
                    chave do HMAC aplicado sobre a aleatoriedade do sistema.
                  </p>
                </div>
              ) : (
                <div className="text-center relative z-10">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                    <ShieldCheck size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Amostras suficientes
                  </h3>
                  <p className="text-emerald-400 font-mono text-sm mb-8">
                    {TARGET_SAMPLES} amostras coletadas
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={generate}
                      className="px-6 py-2.5 bg-emerald-500/15 border border-emerald-500/25 rounded-xl text-emerald-400 text-sm font-bold flex items-center gap-2 hover:bg-emerald-500/25 transition-all"
                    >
                      <Fingerprint size={14} />
                      {result ? 'Gerar outro mnemônico' : 'Gerar mnemônico'}
                    </button>
                    <button
                      onClick={reset}
                      className="px-6 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-stone-400 text-sm font-bold flex items-center gap-2 hover:bg-white/[0.08] transition-all"
                    >
                      <RefreshCw size={14} /> Recomeçar a coleta
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-stone-600">
                <span>Amostras de entropia física</span>
                <span className={ready ? 'text-emerald-400' : ''}>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Saída */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8 flex flex-col backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-stone-500" />
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Mnemônico BIP-39 de {wordCount} palavras
                </h3>
              </div>
              {result && (
                <button
                  onClick={() => setRevealed((v) => !v)}
                  className="px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-stone-300 text-xs font-bold flex items-center gap-2 hover:bg-white/[0.07] transition-all"
                >
                  {revealed ? <EyeOff size={14} /> : <Eye size={14} />}
                  {revealed ? 'Ocultar' : 'Revelar'}
                </button>
              )}
            </div>

            <div className={`grid gap-2.5 mb-6 flex-1 ${wordCount === 24 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3'}`}>
              {!result
                ? Array.from({ length: wordCount }).map((_, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/[0.04] rounded-xl py-3 px-4 flex gap-3 opacity-20">
                      <span className="text-stone-600 font-mono text-sm">{i + 1}.</span>
                      <div className="w-full bg-white/[0.03] rounded h-4 mt-0.5" />
                    </div>
                  ))
                : result.words.map((word, i) => (
                    <div
                      key={`${word}-${i}`}
                      className="word-reveal bg-white/[0.03] border border-white/[0.06] rounded-xl py-3 px-4 flex gap-3 items-center"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <span className="text-stone-600 font-mono text-xs font-bold w-5 text-right">{i + 1}.</span>
                      <span
                        className="text-white font-mono font-bold text-sm tracking-wide transition-all"
                        style={revealed ? undefined : { filter: 'blur(6px)', userSelect: 'none' }}
                      >
                        {word}
                      </span>
                    </div>
                  ))}
            </div>

            {result && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-stone-600 font-bold mb-1">Entropia</p>
                  <p className="text-emerald-400 font-mono text-sm font-bold">{result.bits} bits</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-stone-600 font-bold mb-1">Checksum</p>
                  <p className={`font-mono text-sm font-bold ${result.valid ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.valid ? 'Válido' : 'Inválido'}
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-stone-600 font-bold mb-1">Impressão</p>
                  <p className="text-stone-300 font-mono text-[11px] break-all">{result.fingerprint}</p>
                </div>
              </div>
            )}

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 mb-6">
              <p className="text-stone-400 text-xs leading-relaxed">
                Não existe botão de copiar aqui, e isso é proposital. A área de transferência é lida por
                extensões e por outros aplicativos. Se você for usar estas palavras, escreva à mão, confira
                duas vezes e apague da tela em seguida.
              </p>
            </div>

            <button
              onClick={reset}
              disabled={!result}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-wider text-sm ${
                !result
                  ? 'bg-white/[0.03] text-stone-700 cursor-not-allowed border border-white/[0.05]'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] text-stone-300 border border-white/[0.1]'
              }`}
            >
              <Trash2 size={16} />
              Apagar da memória
            </button>
          </div>
        </div>

        {/* Como funciona */}
        <section className="mt-24 max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-500/60 font-bold mb-4">Sob o capô</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Como a seed é construída, passo a passo
          </h2>
          <div className="space-y-6 text-stone-400 text-sm md:text-base leading-relaxed">
            <p>
              <strong className="text-white">Primeiro, a fonte de aleatoriedade.</strong> A chamada
              crypto.getRandomValues entrega 32 bytes vindos do gerador do sistema operacional, o mesmo que
              protege conexões TLS. Math.random fica de fora do processo inteiro, porque sua saída é derivada de
              um estado interno que pode ser reconstruído por quem observa alguns valores.
            </p>
            <p>
              <strong className="text-white">Depois, a entropia humana.</strong> As amostras do ponteiro passam
              por SHA-256 e viram uma chave. Essa chave alimenta um HMAC-SHA256 sobre os bytes do sistema. Se a
              coleta humana for pobre, nada se perde, porque o resultado continua tão forte quanto a fonte do
              sistema. Se ela for rica, soma uma camada que um atacante remoto não consegue reproduzir.
            </p>
            <p>
              <strong className="text-white">Por fim, o padrão.</strong> Os primeiros 16 ou 32 bytes do HMAC
              viram o material de entropia da BIP-39. A biblioteca converte esse material em índices da wordlist
              oficial de 2048 palavras e acrescenta o checksum exigido pela especificação. O mnemônico é então
              revalidado na tela antes de ser exibido.
            </p>
          </div>
        </section>

        {/* O jeito realmente seguro */}
        <section className="mt-20 max-w-4xl">
          <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] p-8 md:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/15">
                <Dices size={16} className="text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O caminho recomendado para fundos reais
              </h2>
            </div>
            <ol className="space-y-3 text-stone-400 text-sm leading-relaxed list-decimal pl-5">
              <li>Gere a seed dentro de uma hardware wallet, com o dispositivo lacrado conferido e firmware verificado.</li>
              <li>Prefira modelos que aceitem entropia por dados físicos, onde você rola o dado e confere o resultado.</li>
              <li>Registre as palavras em papel para conferência imediata e transfira para metal na sequência.</li>
              <li>Teste a restauração com um valor pequeno antes de confiar qualquer quantia relevante à carteira.</li>
              <li>Guarde as cópias em locais separados e nunca em serviços de nuvem, foto ou gerenciador de senhas.</li>
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/comparativos/melhores-hardware-wallets"
                className="px-5 py-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-300 text-sm font-bold flex items-center gap-2 hover:bg-emerald-500/20 transition-all"
              >
                Comparativo de hardware wallets <ArrowRight size={15} />
              </Link>
              <Link
                to="/autocustodia/backup-seed-phrase-guia"
                className="px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-stone-300 text-sm font-bold flex items-center gap-2 hover:bg-white/[0.07] transition-all"
              >
                Guia de backup de seed phrase <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* Perguntas frequentes */}
        <section className="mt-20 max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Perguntas frequentes
          </h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h3 className="text-white font-bold text-base mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.question}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/[0.05] mt-20 pt-12 text-center">
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default GeradorEntropy;
