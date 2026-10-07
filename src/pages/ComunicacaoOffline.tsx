import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Siren, Radio, MapPin, Eye, Users, Battery, ShieldAlert, Lock, FileText, Clock, AlertTriangle, Check as CheckIcon, X, Lightbulb, Flashlight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgRadio from '@/assets/comms-radio-amfm.webp';
import imgMapa from '@/assets/comms-mapa-ptbr.jpg';
import imgSinal from '@/assets/comms-sinal-visual.webp';
import imgRecado from '@/assets/comms-recado-ptbr.jpg';
import BackToHome from '@/components/BackToHome';
import { AberturaComunicacao, Camadas, ErrosCriticos } from '@/components/editorial/ComunicacaoOfflinePanels';

const EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: EASE, delay },
});

const plate = 'rounded-2xl border border-white/[0.07] bg-[#0d1114]/90 backdrop-blur-md shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]';
const lift = 'transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-[0_30px_70px_-30px_rgba(224,166,74,0.35)]';

const SECTIONS = [
  'Rádio AM/FM', 'Ponto de encontro', 'Sinalização visual', 'Rádio amador',
  'Informações', 'Energia', 'Contingência', 'Segurança', 'Erros críticos',
];

const Section = ({ num, title, kicker, children }: { num: number; title: string; kicker?: string; children: React.ReactNode }) => (
  <motion.section id={`s${num}`} className="relative mb-28 scroll-mt-28" {...fade()}>
    <span aria-hidden className="pointer-events-none absolute -top-14 -left-2 select-none font-impact text-[9rem] font-black leading-none text-white/[0.035] md:text-[13rem]">
      {String(num).padStart(2, '0')}
    </span>
    <div className="relative mb-10 flex items-end gap-5 border-b border-white/[0.06] pb-5">
      <span className="font-mono text-xs tracking-[0.3em] text-amber-400/80">CANAL {String(num).padStart(2, '0')}</span>
      <div>
        {kicker && <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-teal-300/70">{kicker}</p>}
        <h2 className="font-impact text-3xl font-black tracking-tight text-stone-100 md:text-5xl">{title}</h2>
      </div>
    </div>
    {children}
  </motion.section>
);

const Check = ({ items, tone = 'teal' }: { items: string[]; tone?: 'teal' | 'amber' }) => (
  <ul className="space-y-2.5">
    {items.map(s => (
      <li key={s} className="group flex items-start gap-3">
        <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${tone === 'teal' ? 'border-teal-400/40 bg-teal-400/10 text-teal-300' : 'border-amber-400/40 bg-amber-400/10 text-amber-300'} transition-transform group-hover:scale-110`}>
          {tone === 'teal' ? <CheckIcon size={12} /> : <AlertTriangle size={11} />}
        </span>
        <span className="text-[15px] text-stone-300">{s}</span>
      </li>
    ))}
  </ul>
);

const Photo = ({ src, alt, tag }: { src: string; alt: string; tag: string }) => (
  <figure className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] ${lift}`}>
    <img src={src} alt={alt} loading="lazy" decoding="async" className="h-72 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 md:h-full md:min-h-[380px]" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#07090a] via-transparent to-transparent" />
    <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300 backdrop-blur">{tag}</figcaption>
  </figure>
);

const Tile = ({ children, accent = 'white' }: { children: React.ReactNode; accent?: 'white' | 'red' }) => (
  <div className={`rounded-xl border p-4 text-center text-sm font-semibold text-stone-300 ${lift} ${accent === 'red' ? 'border-red-400/15 bg-red-500/[0.07]' : 'border-white/[0.06] bg-white/[0.03]'}`}>{children}</div>
);

export default function ComunicacaoOffline() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const reduce = useReducedMotion();

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Comunicação Offline: Redes Mesh, Rádio e Protocolos no Apagão | Lord Junnior</title>
        <meta name="description" content="Como se comunicar sem internet e sem rede celular. Rádio AM/FM, sinais visuais, pontos de encontro e mensagens escritas. Coordenação familiar em cenários de colapso digital." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/comunicacao-offline" />
        <meta property="og:title" content="Comunicação Offline: Sobreviva ao Apagão Digital" />
        <meta property="og:description" content="Protocolos de comunicação sem internet para coordenação familiar em emergências. Rádio, sinais visuais e redes mesh." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/comunicacao-offline" />
      </Helmet>

      <div className="relative min-h-screen overflow-x-clip bg-[#07090a] selection:bg-amber-300/30">
        {/* Ambiente: malha milimétrica, ondas de rádio e brilho âmbar/teal */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#e0a64a 1px, transparent 1px), linear-gradient(90deg, #e0a64a 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="absolute -left-[20vw] top-[10vh] h-[70vmax] w-[70vmax] rounded-full" style={{ background: 'radial-gradient(circle, rgba(224,166,74,0.10), transparent 60%)' }} />
          <div className="absolute -right-[20vw] bottom-[-10vh] h-[70vmax] w-[70vmax] rounded-full" style={{ background: 'radial-gradient(circle, rgba(79,179,169,0.09), transparent 60%)' }} />
          {!reduce && [0, 1, 2].map(i => (
            <motion.div key={i} className="absolute right-[8vw] top-[30vh] h-[40vmax] w-[40vmax] -translate-y-1/2 translate-x-1/2 rounded-full border border-amber-300/10"
              initial={{ scale: 0.2, opacity: 0.6 }} animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 9, repeat: Infinity, delay: i * 3, ease: 'easeOut' }} />
          ))}
        </div>

        <div className="relative z-10">
          <CinematicHero
            image="/heroes/comunicacao-offline.webp"
            phase="Fase 01 · Base 72"
            title="Comunicação sem Internet"
            subtitle="Coordenação, informação e organização familiar quando redes móveis e internet estão indisponíveis."
            icon={Siren}
            accentColor="amber"
          />

          <div className="mx-auto grid w-full max-w-[1560px] gap-12 px-5 pb-32 pt-16 md:px-10 xl:grid-cols-[220px_1fr] xl:px-16">
            {/* Trilho lateral de canais */}
            <aside className="hidden xl:block" data-page-toc>
              <nav aria-label="Canais da página" className="sticky top-32 space-y-1 border-l border-white/[0.08] pl-4">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400/80">Frequências</p>
                {SECTIONS.map((s, i) => (
                  <a key={s} href={`#s${i + 1}`} className="group flex items-center gap-3 py-1.5 text-sm text-stone-500 transition-colors hover:text-amber-300">
                    <span className="font-mono text-[10px] text-stone-600 group-hover:text-amber-400">{String(i + 1).padStart(2, '0')}</span>
                    <span className="transition-transform group-hover:translate-x-1">{s}</span>
                  </a>
                ))}
              </nav>
            </aside>

            <main className="min-w-0">
              {/* Abertura com imagens e resposta ao leitor */}
              <motion.div {...fade()}><AberturaComunicacao /></motion.div>

              {/* 5 camadas */}
              <motion.div className="comms-architecture" {...fade(0.1)}>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-400">Arquitetura</p>
                    <h2 className="mt-2 font-impact text-3xl font-black text-stone-100 md:text-4xl">Camadas da Comunicação em Crise</h2>
                  </div>
                  <p className="text-stone-400">Sistema eficiente funciona em 5 níveis:</p>
                </div>
                <Camadas />
              </motion.div>

              <Section num={1} kicker="Informação passiva" title="Rádio AM/FM">
                <p className="mb-8 max-w-3xl text-lg leading-relaxed text-stone-400">
                  O rádio é o <strong className="text-stone-100">meio mais resiliente</strong>. Funciona com pilha, bateria, manivela ou energia solar portátil.
                </p>
                <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                  <Photo src={imgRadio} alt="Rádio AM/FM portátil com bloco de frequências" tag="Receptor de campo" />
                  <div className="grid gap-6">
                    <div className={`${plate} ${lift} p-7`}>
                      <div className="mb-4 flex items-center gap-2"><Radio size={18} className="text-amber-400" /><h3 className="text-xl font-bold text-stone-100">Como Escolher Rádio Adequado</h3></div>
                      <Check items={['AM/FM', 'Entrada para fone', 'Funcionar sem depender de tomada', 'Antena extensível']} />
                      <p className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/[0.07] p-3 text-sm font-semibold text-amber-300">Evitar rádios dependentes exclusivamente de energia elétrica.</p>
                    </div>
                    <div className={`${plate} ${lift} p-7`}>
                      <h3 className="mb-2 text-lg font-bold text-stone-100">Frequências Importantes</h3>
                      <p className="mb-4 text-sm text-stone-400">Antes de qualquer crise, identificar:</p>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {['Emissoras locais', 'Frequência da Defesa Civil', 'Rádio pública regional'].map(i => <Tile key={i}>{i}</Tile>)}
                      </div>
                      <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-stone-200"><FileText size={15} className="text-teal-300" />Anotar em papel e guardar no kit.</p>
                    </div>
                  </div>
                </div>
              </Section>

              <Section num={2} kicker="Comunicação familiar" title="Ponto de Encontro">
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-5">
                  <AlertTriangle size={18} className="text-red-400" />
                  <span className="font-bold text-red-300">Erro comum: depender apenas de celular.</span>
                </div>
                <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
                  <div className="grid gap-6">
                    <div className={`${plate} ${lift} p-7`}>
                      <div className="mb-4 flex items-center gap-2"><MapPin size={18} className="text-amber-400" /><h3 className="text-xl font-bold text-stone-100">Protocolo Básico Doméstico</h3></div>
                      <Check items={['Definir ponto primário', 'Definir ponto secundário', 'Definir horário fixo de reencontro']} />
                      <div className="mt-5 rounded-xl border border-teal-400/20 bg-teal-400/[0.05] p-5">
                        <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-teal-300">Exemplo Prático</h4>
                        <div className="space-y-2 text-[15px] text-stone-400">
                          <p><strong className="text-stone-100">Ponto 1:</strong> Casa de parente próximo</p>
                          <p><strong className="text-stone-100">Ponto 2:</strong> Praça central</p>
                          <p><strong className="text-stone-100">Horário:</strong> 18h independentemente de comunicação</p>
                        </div>
                        <p className="mt-3 font-editorial text-sm italic text-stone-500">Isso elimina decisões improvisadas.</p>
                      </div>
                    </div>
                    <div className={`${plate} ${lift} p-7`}>
                      <div className="mb-3 flex items-center gap-2"><Users size={18} className="text-amber-400" /><h3 className="text-lg font-bold text-stone-100">Regra dos 3 Contatos</h3></div>
                      <p className="mb-4 text-sm text-stone-400">Cada membro deve saber:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {['Contato local', 'Contato fora da cidade', 'Vizinho confiável'].map((l, i) => (
                          <Tile key={l}><span className="block font-impact text-2xl font-black text-amber-300">{i + 1}</span>{l}</Tile>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-stone-400">Em crises, às vezes <strong className="text-stone-100">chamadas interurbanas funcionam antes das locais</strong>.</p>
                    </div>
                  </div>
                  <Photo src={imgMapa} alt="Mapa com pontos de encontro marcados" tag="Mapa de reencontro" />
                </div>
              </Section>

              <Section num={3} kicker="Quando tudo cala" title="Sinalização Visual">
                <p className="mb-8 max-w-3xl text-lg leading-relaxed text-stone-400">
                  Se comunicação falhar completamente, <strong className="text-stone-100">sinalização visual orienta deslocamento</strong>.
                </p>
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-1"><Photo src={imgSinal} alt="Lençol branco em janela como sinal visual" tag="Sinal de janela" /></div>
                  <div className={`${plate} ${lift} p-7`}>
                    <div className="mb-4 flex items-center gap-2"><Eye size={18} className="text-amber-400" /><h3 className="text-xl font-bold text-stone-100">Métodos Simples e Eficazes</h3></div>
                    <Check items={['Lençol branco em janela = seguro', 'Lençol colorido = necessidade', 'Lanterna piscando à noite']} />
                  </div>
                  <div className={`${plate} p-7`}>
                    <h3 className="mb-5 text-xl font-bold text-stone-100">Código Doméstico Simples</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`rounded-xl border border-teal-400/20 bg-teal-400/[0.06] p-5 text-center ${lift}`}>
                        <Lightbulb className="mx-auto mb-3 text-teal-300" />
                        <span className="block font-bold text-stone-100">Luz fixa</span>
                        <span className="text-xs text-stone-400">= tudo bem</span>
                      </div>
                      <div className={`group rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-5 text-center ${lift}`}>
                        <Flashlight className="mx-auto mb-3 text-amber-300 motion-safe:animate-pulse" />
                        <span className="block font-bold text-stone-100">Luz piscando</span>
                        <span className="text-xs text-stone-400">= precisa de ajuda</span>
                      </div>
                    </div>
                    <p className="mt-4 text-center font-editorial text-sm italic text-stone-400">Criar código antes da necessidade.</p>
                  </div>
                </div>
              </Section>

              <Section num={4} kicker="Opcional" title="Comunicação por Rádio Amador">
                <div className={`${plate} p-8 md:p-10`}>
                  <p className="mb-8 max-w-3xl text-lg text-stone-400">
                    Para quem deseja nível avançado: <strong className="text-stone-100">rádio comunicador portátil (VHF/UHF)</strong>.
                  </p>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className={`rounded-xl border border-teal-400/15 bg-teal-400/[0.04] p-6 ${lift}`}>
                      <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-teal-300">Permite</h4>
                      <Check items={['Comunicação direta local', 'Coordenação comunitária', 'Alcance de alguns quilômetros']} />
                    </div>
                    <div className={`rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-6 ${lift}`}>
                      <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-300">Requer</h4>
                      <Check tone="amber" items={['Conhecimento básico', 'Frequências autorizadas', 'Treino prévio']} />
                    </div>
                  </div>
                </div>
              </Section>

              <div className="grid gap-x-8 lg:grid-cols-2">
                <Section num={5} title="Organização de Informações">
                  <div className={`${plate} p-7`}>
                    <p className="mb-6 font-editorial text-xl italic text-stone-200">Durante crise, rumores causam mais dano que a falta de informação.</p>
                    <h3 className="mb-4 font-bold text-stone-100">Regra prática: anotar</h3>
                    <div className="mb-5 grid grid-cols-2 gap-2 md:grid-cols-4">
                      {[{ icon: Clock, label: 'Data' }, { icon: Clock, label: 'Hora' }, { icon: Users, label: 'Fonte' }, { icon: FileText, label: 'Conteúdo' }].map(({ icon: Icon, label }) => (
                        <Tile key={label}><Icon size={18} className="mx-auto mb-2 text-amber-300" />{label}</Tile>
                      ))}
                    </div>
                    <p className="rounded-xl border border-red-400/20 bg-red-500/[0.08] p-3 text-sm font-semibold text-red-300">Nunca agir com base em informação única não confirmada.</p>
                  </div>
                </Section>
                <Section num={6} title="Gestão de Energia">
                  <div className={`${plate} ${lift} p-7`}>
                    <p className="mb-6 font-editorial text-xl italic text-stone-200">Comunicação consome energia.</p>
                    <div className="mb-4 flex items-center gap-2"><Battery size={18} className="text-teal-300" /><h3 className="font-bold text-stone-100">Estratégia</h3></div>
                    <Check items={['Uso do rádio em horários definidos', 'Lanternas com pilhas reservadas', 'Não manter aparelhos ligados continuamente']} />
                  </div>
                </Section>
              </div>

              <Section num={7} kicker="Se tudo falhar" title="Plano de Contingência sem Tecnologia">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                  <Photo src={imgRecado} alt="Recado escrito preso na porta" tag="Comunicação física" />
                  <div className={`${plate} p-7`}>
                    <p className="mb-6 text-lg text-stone-400">Se tudo falhar: <strong className="text-stone-100">comunicação física</strong>.</p>
                    <div className="mb-5 grid gap-2">
                      {['Recados escritos', 'Quadro na entrada da casa', 'Envelope em local combinado'].map(i => <Tile key={i}>{i}</Tile>)}
                    </div>
                    <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
                      <h4 className="mb-1 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-300">Exemplo</h4>
                      <p className="text-stone-300">Caixa específica onde mensagens são deixadas em local previamente combinado.</p>
                    </div>
                  </div>
                </div>
              </Section>

              <Section num={8} title="Segurança da Informação">
                <div className={`${plate} p-8`}>
                  <div className="mb-5 flex items-center gap-2"><Lock size={18} className="text-amber-400" /><h3 className="text-lg font-bold text-stone-100">Evitar divulgar:</h3></div>
                  <div className="mb-5 grid gap-3 sm:grid-cols-3">
                    {['Quantidade de recursos', 'Estoque de alimentos', 'Estratégias internas'].map(i => <Tile key={i} accent="red">{i}</Tile>)}
                  </div>
                  <p className="font-semibold text-stone-200">Comunicação deve ser objetiva e controlada.</p>
                </div>
              </Section>

              <Section num={9} title="Erros Críticos">
                <ErrosCriticos />
              </Section>

              <motion.section className="mb-12" {...fade()}>
                <div className={`${plate} relative overflow-hidden p-10 text-center md:p-16`}>
                  <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(224,166,74,0.18), transparent 60%)' }} />
                  <div className="relative">
                    <ShieldAlert size={30} className="mx-auto mb-5 text-amber-300" />
                    <h2 className="font-impact text-3xl font-black text-stone-100 md:text-5xl">Princípio Central</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-300">
                      Comunicação é estrutura de coordenação. Ela reduz pânico, evita deslocamentos desnecessários, mantém grupo unido e aumenta eficiência na tomada de decisão.
                    </p>
                    <p className="mx-auto mt-6 max-w-2xl font-editorial text-2xl italic text-amber-300">Nos primeiros 3 dias, comunicação organizada vale mais que tecnologia sofisticada.</p>
                    <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
                      {['Reduz pânico', 'Evita deslocamentos', 'Mantém grupo unido', 'Melhora decisões'].map(i => <Tile key={i}>{i}</Tile>)}
                    </div>
                  </div>
                </div>
              </motion.section>

              <MicroCtaResistencia variant="default" />

              <div className="pt-8 text-center">
                <Link to="/soberania-organica" className="inline-flex min-h-[44px] items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-amber-300">
                  <ArrowLeft size={14} /> Voltar ao Soberania Orgânica
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
