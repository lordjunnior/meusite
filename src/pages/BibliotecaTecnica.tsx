import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, BookMarked, CheckCircle2, CircleSlash, Compass, ExternalLink,
  FileSearch, Layers, Library, ShieldCheck, Sparkles,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { canonicalUrl } from '@/lib/site';
import BackToHome from '@/components/BackToHome';
import {
  CONFIANCA_INFO, DIMENSOES, FONTES_DESCOBERTA, KITS, NIVEL_INFO,
  STATUS_INFO, TOTAL_RECURSOS, ULTIMA_REVISAO,
  type Recurso, type StatusEditorial,
} from '@/data/bibliotecaTecnica';
import heroAsset from '@/assets/biblioteca-tecnica/hero-biblioteca-tecnica.jpg';
import curadoriaAsset from '@/assets/biblioteca-tecnica/curadoria-fonte-primaria.jpg';
import dispositivoAsset from '@/assets/biblioteca-tecnica/dispositivo-identidade.jpg';
import redeAsset from '@/assets/biblioteca-tecnica/rede-navegacao.jpg';
import dadosAsset from '@/assets/biblioteca-tecnica/dados-backup.jpg';
import pesquisaAsset from '@/assets/biblioteca-tecnica/pesquisa-verificacao.jpg';
import kitsAsset from '@/assets/biblioteca-tecnica/kits-autonomia.jpg';

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.75, delay, ease: EASE },
});

const DIMENSAO_ASSETS: Record<string, { src: string; alt: string }> = {
  dispositivo: { src: dispositivoAsset, alt: 'Celular apoiado sobre linho ao lado de chave física de autenticação e lupa de latão' },
  identidade: { src: dispositivoAsset, alt: 'Chave física de autenticação e celular sobre mesa clara, representando credenciais protegidas' },
  comunicacao: { src: curadoriaAsset, alt: 'Documentação técnica impressa aberta com lupa sobre a página' },
  navegacao: { src: redeAsset, alt: 'Cabos de rede organizados em feixes sobre painel de conexão, em ambiente iluminado' },
  dados: { src: dadosAsset, alt: 'Disco externo, placa de aço e envelope de arquivo sobre mesa clara, representando backup em camadas' },
  pesquisa: { src: pesquisaAsset, alt: 'Mesa de arquivo com pastas de documento, contatos fotográficos, lupa e luvas de algodão' },
};

const STATUS_STYLE: Record<StatusEditorial, string> = {
  verificado: 'border-emerald-700/40 bg-emerald-700/10 text-emerald-900',
  monitorado: 'border-amber-700/40 bg-amber-600/10 text-amber-900',
  arquivado: 'border-sky-800/35 bg-sky-800/10 text-sky-900',
  retirado: 'border-red-800/40 bg-red-800/10 text-red-900',
};

const FAQ = [
  {
    q: 'A Biblioteca Técnica é uma cópia do The Book of Secret Knowledge?',
    a: 'Não. Aquele repositório, licenciado em MIT, entra aqui apenas como fonte de descoberta de candidatos. Toda ficha publicada é escrita a partir da documentação oficial do projeto, com critério próprio de entrada, status editorial e motivo declarado.',
  },
  {
    q: 'Por que a organização começa pelo problema e não pela ferramenta?',
    a: 'Porque quem chega dizendo que quer proteger o celular não precisa saber o nome de nenhum aplicativo. A entrada é a capacidade, do tipo reduzir rastreamento na rede ou sair do segundo fator por SMS, e só depois aparecem os recursos que atendem aquela capacidade.',
  },
  {
    q: 'O que significa cada status editorial?',
    a: 'Verificado quer dizer fonte primária conferida e projeto em manutenção ativa. Monitorado quer dizer recurso válido, porém sujeito a mudança relevante de licença, governança ou manutenção. Arquivado quer dizer historicamente útil e não recomendado hoje. Retirado quer dizer problema documentado, como abandono ou falha de segurança.',
  },
  {
    q: 'Por que existe ficha de ferramenta que vocês não recomendam?',
    a: 'Porque tutorial desatualizado continua circulando. Registrar o que saiu de circulação, com o motivo escrito, evita que alguém instale hoje uma ferramenta abandonada há mais de dez anos.',
  },
  {
    q: 'A biblioteca publica ferramenta de invasão?',
    a: 'Não. A curadoria cobre defesa, diagnóstico e pesquisa legítima sobre informação pública. Procedimento ofensivo, ferramenta de intrusão e coleta abusiva de dado pessoal ficam de fora, mesmo quando aparecem em listas públicas.',
  },
  {
    q: 'Com que frequência as fichas são revisadas?',
    a: 'Cada ficha carrega a data da última verificação. Passados 180 dias sem conferência, ela entra em revisão obrigatória e pode cair para Monitorado até que a fonte primária seja checada de novo.',
  },
];

function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 160]);

  return (
    <section className="vpn-hero relative min-h-[88vh] overflow-hidden">
      <motion.img
        style={{ y }}
        src={heroAsset}
        alt="Sala de arquivo técnico ao entardecer, mesa de madeira com volumes de referência, desenhos técnicos enrolados e luminária de latão"
        width={1920}
        height={1088}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-[112%] w-full object-cover"
      />
      <div className="vpn-hero-shade absolute inset-0" />
      <div className="vpn-grid absolute inset-0" />
      <div className="relative z-10 flex min-h-[88vh] max-w-[1600px] flex-col justify-end px-6 pb-16 pt-36 md:px-12 md:pb-24 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-7 flex items-center gap-4"
        >
          <div className="vpn-brand-mark flex h-14 w-14 items-center justify-center rounded-md border border-background/25 bg-background/10 backdrop-blur-xl">
            <Library className="h-7 w-7 text-background" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-background/70">Biblioteca &amp; Educação</p>
            <p className="text-xl font-black uppercase text-background">Curadoria técnica própria</p>
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="max-w-[18ch] text-[clamp(2.6rem,7vw,6.6rem)] font-black uppercase leading-[.92] text-background"
        >
          Biblioteca Técnica da Autonomia Digital
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
          className="mt-7 max-w-3xl text-lg leading-relaxed text-background/90 md:text-2xl"
        >
          Não é uma lista de links. É curadoria com critério de entrada, fonte primária conferida, status editorial e motivo escrito em cada ficha.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-8 border-t border-background/20 pt-8 font-mono text-sm text-background/75"
        >
          <span>{TOTAL_RECURSOS} fichas publicadas</span>
          <span>{DIMENSOES.length} dimensões de autonomia</span>
          <span>revisão de {ULTIMA_REVISAO}</span>
        </motion.div>
      </div>
    </section>
  );
}

function Heading({ chapter, children, dark = false }: { chapter: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.div {...reveal()} className="mb-10">
      <p className={`mb-4 font-mono text-xs uppercase tracking-[0.34em] ${dark ? 'text-background/60' : 'vpn-muted'}`}>{chapter}</p>
      <h2 className={`max-w-[22ch] text-[clamp(1.9rem,4.1vw,3.4rem)] font-black uppercase leading-[.98] ${dark ? 'text-background' : 'vpn-ink'}`}>
        {children}
      </h2>
      <div className="vpn-rule mt-6 h-[3px] w-20" />
    </motion.div>
  );
}

function FichaCard({ recurso }: { recurso: Recurso }) {
  const [aberta, setAberta] = useState(false);
  const status = STATUS_INFO[recurso.status];
  const confianca = CONFIANCA_INFO[recurso.confianca];

  return (
    <motion.article
      {...reveal()}
      className="vpn-card group rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_-42px_hsl(var(--vpn-deep))] md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] vpn-muted">{recurso.capacidade}</p>
          <h3 className="mt-2 text-2xl font-black uppercase vpn-ink">{recurso.nome}</h3>
        </div>
        <span className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] ${STATUS_STYLE[recurso.status]}`}>
          {status.label}
        </span>
      </div>

      <p className="mt-5 text-base leading-relaxed vpn-ink/90">{recurso.paraQueServe}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] vpn-muted">Quando usar</p>
          <p className="mt-1 text-sm leading-relaxed vpn-ink">{recurso.quandoUsar}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] vpn-muted">Por que está aqui</p>
          <p className="mt-1 text-sm leading-relaxed vpn-ink">{recurso.porQueEstaAqui}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setAberta((v) => !v)}
        aria-expanded={aberta}
        className="vpn-focus mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-current/20 px-5 font-mono text-xs uppercase tracking-[0.2em] vpn-copper transition-colors hover:bg-current/5"
      >
        {aberta ? 'Recolher ficha completa' : 'Abrir ficha completa'}
        <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${aberta ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
      </button>

      {aberta && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-6 overflow-hidden border-t border-current/15 pt-6"
        >
          <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] vpn-muted">Tipo</dt><dd className="vpn-ink">{recurso.tipo}</dd></div>
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] vpn-muted">Nível</dt><dd className="vpn-ink">{NIVEL_INFO[recurso.nivel].label}</dd></div>
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] vpn-muted">Plataformas</dt><dd className="vpn-ink">{recurso.plataformas.join(', ')}</dd></div>
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] vpn-muted">Código aberto</dt><dd className="vpn-ink">{recurso.codigoAberto}</dd></div>
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] vpn-muted">Licença</dt><dd className="vpn-ink">{recurso.licenca}</dd></div>
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] vpn-muted">Última verificação</dt><dd className="vpn-ink">{recurso.ultimaVerificacao}</dd></div>
            <div className="sm:col-span-2"><dt className="font-mono text-[11px] uppercase tracking-[0.2em] vpn-muted">Confiança da fonte</dt><dd className="vpn-ink">{confianca.label}, {confianca.explicacao}</dd></div>
            <div className="sm:col-span-2"><dt className="font-mono text-[11px] uppercase tracking-[0.2em] vpn-muted">Motivo do status</dt><dd className="vpn-ink">{recurso.motivoStatus}</dd></div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={recurso.documentacao}
              target="_blank"
              rel="noopener noreferrer"
              className="vpn-focus inline-flex min-h-[44px] items-center gap-2 rounded-full border border-current/25 px-5 text-sm font-semibold vpn-ink transition-colors hover:bg-current/5"
            >
              Documentação oficial <ExternalLink className="h-4 w-4" />
            </a>
            {recurso.fonte !== recurso.documentacao && (
              <a
                href={recurso.fonte}
                target="_blank"
                rel="noopener noreferrer"
                className="vpn-focus inline-flex min-h-[44px] items-center gap-2 rounded-full border border-current/25 px-5 text-sm font-semibold vpn-ink transition-colors hover:bg-current/5"
              >
                Fonte primária <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {recurso.paginasRelacionadas.map((p) => (
              <Link
                key={p.route}
                to={p.route}
                className="vpn-focus inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-sm font-semibold vpn-copper transition-transform hover:translate-x-1"
              >
                {p.label} <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}

export default function BibliotecaTecnica() {
  const [dimensaoAtiva, setDimensaoAtiva] = useState(DIMENSOES[0].id);
  const dimensao = useMemo(
    () => DIMENSOES.find((d) => d.id === dimensaoAtiva) ?? DIMENSOES[0],
    [dimensaoAtiva],
  );
  const asset = DIMENSAO_ASSETS[dimensao.id] ?? DIMENSAO_ASSETS.dispositivo;

  return (
    <div className="vpn-page min-h-screen">
      <SeoHead
        path="/biblioteca-tecnica"
        custom={{
          title: 'Biblioteca Técnica da Autonomia Digital',
          description: 'Curadoria própria de recursos técnicos gratuitos, organizada por problema, com fonte primária conferida, status editorial e motivo escrito.',
          canonical: canonicalUrl('/biblioteca-tecnica'),
          primaryKeyword: 'biblioteca técnica autonomia digital',
          lsiKeywords: ['ferramentas de privacidade', 'segurança digital', 'curadoria técnica', 'código aberto', 'documentação oficial'],
          longTailKeywords: ['ferramentas gratuitas de privacidade e segurança', 'como escolher ferramenta de segurança digital'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Biblioteca & Educação', url: '/educacao' },
            { name: 'Biblioteca Técnica', url: '/biblioteca-tecnica' },
          ],
          schemaType: 'WebPage',
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <BackToHome />
      <Hero />

      <section className="vpn-deep px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <Heading chapter="O critério" dark>
            Ser popular não é critério de entrada
          </Heading>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div className="space-y-6 text-lg leading-relaxed text-background/85">
              <p>
                Uma lista aberta de ferramentas é ponto de partida, não destino. O que chega até aqui passa por dez critérios: fonte identificável, finalidade clara, documentação disponível, licença conhecida, manutenção verificável, segurança avaliada, relevância para um silo existente, utilidade concreta, ausência de duplicação e nenhuma cópia de conteúdo de terceiro.
              </p>
              <p>
                O <span className="vpn-editorial">The Book of Secret Knowledge</span> cumpre um papel específico neste fluxo, o de revelar candidatos. A ficha publicada nasce sempre da documentação oficial do projeto, nunca do resumo de outra pessoa.
              </p>
              <p>
                A biblioteca cobre defesa, diagnóstico e pesquisa sobre informação pública. Procedimento ofensivo e coleta abusiva de dado pessoal ficam de fora, porque constar em uma lista não transforma nada em recomendação operacional.
              </p>
            </div>
            <motion.figure {...reveal(0.12)} className="vpn-figure overflow-hidden rounded-2xl">
              <img
                src={curadoriaAsset}
                alt="Documentação técnica impressa aberta sobre a mesa com lupa e lápis, representando conferência de fonte primária"
                width={1600}
                height={1008}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[900ms] hover:scale-[1.04]"
              />
            </motion.figure>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(STATUS_INFO) as StatusEditorial[]).map((key, i) => (
              <motion.div key={key} {...reveal(i * 0.08)} className="vpn-card-dark rounded-xl border p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-background/60">Status</p>
                <p className="mt-2 text-xl font-black uppercase text-background">{STATUS_INFO[key].label}</p>
                <p className="mt-3 text-sm leading-relaxed text-background/75">{STATUS_INFO[key].explicacao}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <Heading chapter="A entrada">Comece pelo problema, não pelo nome da ferramenta</Heading>
          <p className="mb-10 max-w-3xl text-lg leading-relaxed vpn-ink/90">
            Quem chega dizendo que quer proteger o celular não precisa saber o nome de nenhum aplicativo. Escolha a dimensão, leia a capacidade e só então veja quais recursos atendem aquilo.
          </p>

          <div className="mb-12 flex flex-wrap gap-3" role="tablist" aria-label="Dimensões da autonomia digital">
            {DIMENSOES.map((d) => {
              const ativa = d.id === dimensao.id;
              return (
                <button
                  key={d.id}
                  role="tab"
                  aria-selected={ativa}
                  onClick={() => setDimensaoAtiva(d.id)}
                  className={`vpn-focus min-h-[44px] rounded-full border px-5 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 ${
                    ativa ? 'vpn-step border-transparent' : 'border-current/25 vpn-ink hover:bg-current/5'
                  }`}
                >
                  {d.titulo}
                </button>
              );
            })}
          </div>

          <div className="grid gap-10 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
            <motion.figure key={dimensao.id} {...reveal()} className="vpn-figure overflow-hidden rounded-2xl lg:sticky lg:top-24">
              <img
                src={asset.src}
                alt={asset.alt}
                width={1600}
                height={1008}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[900ms] hover:scale-[1.04]"
              />
              <figcaption className="vpn-card border-t p-5 text-sm leading-relaxed vpn-ink">
                <span className="font-black uppercase">{dimensao.titulo}.</span> {dimensao.descricao}
              </figcaption>
            </motion.figure>

            <div className="space-y-10">
              {dimensao.capacidades.map((cap) => (
                <div key={cap.id}>
                  <motion.div {...reveal()} className="vpn-card rounded-2xl border p-6 md:p-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] vpn-copper">Capacidade</p>
                    <p className="mt-3 text-2xl font-black uppercase vpn-ink">{cap.titulo}</p>
                    <p className="vpn-editorial mt-3 text-xl">{cap.pergunta}</p>
                    <p className="mt-4 text-base leading-relaxed vpn-ink/90">{cap.descricao}</p>
                  </motion.div>
                  <div className="mt-6 space-y-6">
                    {cap.recursos.map((r) => <FichaCard key={r.id} recurso={r} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="vpn-deep px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <Heading chapter="Sequência de leitura" dark>Quatro níveis, nesta ordem</Heading>
          <div className="mb-14 grid gap-4 md:grid-cols-3">
            {[
              { src: redeAsset, alt: 'Cabos de rede organizados em feixes sobre painel de conexão iluminado' },
              { src: dadosAsset, alt: 'Disco externo, placa de aço e envelope de arquivo sobre mesa clara' },
              { src: pesquisaAsset, alt: 'Mesa de arquivo com pastas, contatos fotográficos, lupa e luvas de algodão' },
            ].map((img, i) => (
              <motion.figure key={img.src} {...reveal(i * 0.08)} className="vpn-figure overflow-hidden rounded-xl">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={1600}
                  height={1008}
                  loading="lazy"
                  decoding="async"
                  className="h-56 w-full object-cover transition-transform duration-[900ms] hover:scale-[1.05]"
                />
              </motion.figure>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {(['entender', 'proteger', 'investigar', 'aprofundar'] as const).map((nivel, i) => (
              <motion.div key={nivel} {...reveal(i * 0.08)} className="vpn-card-dark rounded-xl border p-6">
                <span className="vpn-step inline-flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm">
                  {NIVEL_INFO[nivel].ordem}
                </span>
                <p className="mt-4 text-lg font-black uppercase text-background">{NIVEL_INFO[nivel].label}</p>
                <p className="mt-2 text-sm leading-relaxed text-background/75">
                  {nivel === 'entender' && 'Conceito primeiro. Sem entender a ameaça, qualquer ferramenta vira superstição.'}
                  {nivel === 'proteger' && 'Hardening e boas práticas, aplicadas no aparelho e nas contas que você usa todo dia.'}
                  {nivel === 'investigar' && 'Diagnóstico e análise defensiva, para quem já fez o básico e quer verificar o próprio ambiente.'}
                  {nivel === 'aprofundar' && 'Documentação técnica do projeto, quando a decisão exige ler a fonte, não o resumo.'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <Heading chapter="Kits">Roteiros por objetivo, não por catálogo</Heading>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
            <div className="space-y-6">
              {KITS.map((kit, i) => (
                <motion.div key={kit.id} {...reveal(i * 0.08)} className="vpn-card rounded-2xl border p-6 transition-transform duration-500 hover:-translate-y-1 md:p-8">
                  <div className="flex items-center gap-3">
                    <Compass className="h-5 w-5 vpn-copper" />
                    <h3 className="text-xl font-black uppercase vpn-ink">{kit.titulo}</h3>
                  </div>
                  <p className="vpn-editorial mt-3 text-lg">{kit.objetivo}</p>
                  <ol className="mt-5 space-y-3">
                    {kit.etapas.map((e, idx) => (
                      <li key={e.passo} className="flex gap-4">
                        <span className="font-mono text-xs vpn-copper">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="text-sm leading-relaxed vpn-ink">
                          <span className="font-bold uppercase">{e.passo}.</span> {e.detalhe}
                        </span>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              ))}
            </div>
            <motion.figure {...reveal(0.1)} className="vpn-figure overflow-hidden rounded-2xl lg:sticky lg:top-24">
              <img
                src={kitsAsset}
                alt="Kit organizado sobre linho, com caderno, lista impressa, lápis, placa de aço e celular virado para baixo"
                width={1600}
                height={1008}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[900ms] hover:scale-[1.04]"
              />
            </motion.figure>
          </div>
        </div>
      </section>

      <section className="vpn-deep px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <Heading chapter="Procedência" dark>De onde vem cada ficha</Heading>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-5">
              {FONTES_DESCOBERTA.map((f, i) => (
                <motion.div key={f.nome} {...reveal(i * 0.08)} className="vpn-card-dark rounded-xl border p-6">
                  <div className="flex items-start gap-3">
                    <FileSearch className="mt-1 h-5 w-5 text-background/70" />
                    <div>
                      <p className="text-lg font-black uppercase text-background">{f.nome}</p>
                      <p className="mt-2 text-sm leading-relaxed text-background/78">{f.papel}</p>
                      {f.url && (
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="vpn-focus mt-3 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-background/85 underline-offset-4 hover:underline"
                        >
                          Repositório de origem <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div {...reveal(0.12)} className="vpn-glass rounded-2xl border p-8">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-background/60">Fluxo de entrada</p>
              <ol className="mt-6 space-y-4 text-background/88">
                {['Descoberta em fonte aberta', 'Localização da fonte primária', 'Conferência de licença e manutenção', 'Avaliação de segurança e de risco de uso', 'Vínculo com um silo do site', 'Publicação com status e motivo'].map((etapa, i) => (
                  <li key={etapa} className="flex items-center gap-4">
                    <span className="vpn-step flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs">{i + 1}</span>
                    <span className="text-base">{etapa}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-background/70">
                <CircleSlash className="mt-0.5 h-4 w-4 shrink-0" />
                Recurso que não fortalece o conjunto de guias, busca, monitoramento e documentos fica fora, mesmo sendo popular.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1000px]">
          <Heading chapter="Perguntas frequentes">O que costuma ser perguntado</Heading>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <motion.details key={f.q} {...reveal(i * 0.05)} className="vpn-card group rounded-xl border p-6 transition-colors hover:border-current/30">
                <summary className="vpn-focus cursor-pointer list-none text-lg font-bold vpn-ink">
                  <span className="flex items-start gap-3">
                    <Sparkles className="mt-1 h-4 w-4 shrink-0 vpn-copper" />
                    {f.q}
                  </span>
                </summary>
                <p className="mt-4 pl-7 text-base leading-relaxed vpn-ink/85">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="vpn-deep px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <Heading chapter="Continue sua trilha" dark>Três caminhos a partir daqui</Heading>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { to: '/seguranca-mobile', icon: ShieldCheck, titulo: 'Segurança mobile', texto: 'O silo que trata o aparelho que você carrega o dia inteiro, do sistema às permissões.' },
              { to: '/autocustodia/backup-seed-phrase-guia', icon: Layers, titulo: 'Backup de seed phrase', texto: 'Custódia de segredo aplicada ao que não pode ser recuperado por suporte nenhum.' },
              { to: '/mapa-da-soberania', icon: BookMarked, titulo: 'Mapa da soberania', texto: 'A visão completa das trilhas do site, silo por silo.' },
            ].map((c, i) => (
              <motion.div key={c.to} {...reveal(i * 0.08)}>
                <Link
                  to={c.to}
                  className="vpn-focus vpn-card-dark group flex h-full flex-col rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-background/15"
                >
                  <c.icon className="h-6 w-6 text-background/80" />
                  <p className="mt-5 text-xl font-black uppercase text-background">{c.titulo}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-background/75">{c.texto}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-background/85">
                    Abrir <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...reveal(0.2)} className="vpn-glass mt-14 rounded-2xl border p-8 md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-background/60">Próximo passo único</p>
            <p className="mt-4 max-w-[36ch] text-[clamp(1.5rem,3vw,2.4rem)] font-black uppercase leading-tight text-background">
              Escolha uma capacidade e resolva uma só coisa hoje
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/85">
              Instalar dez ferramentas em uma tarde não aumenta autonomia nenhuma. Escolha a capacidade que representa seu maior risco atual, leia a documentação oficial do recurso indicado e conclua aquela etapa antes de abrir a próxima.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/seguranca-mobile" className="vpn-focus vpn-btn inline-flex min-h-[44px] items-center gap-2 rounded-full px-7 font-bold uppercase tracking-wide transition-transform hover:translate-x-1">
                Começar pelo celular <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/educacao" className="vpn-focus inline-flex min-h-[44px] items-center gap-2 rounded-full border border-background/30 px-7 font-bold uppercase tracking-wide text-background transition-colors hover:bg-background/10">
                Voltar para a biblioteca <CheckCircle2 className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
