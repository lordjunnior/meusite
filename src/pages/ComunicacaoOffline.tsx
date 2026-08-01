import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Siren, Radio, MapPin, Eye, Users, Battery, ShieldAlert, Lock, FileText, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgRadio from '@/assets/comms-radio-amfm.jpg';
import imgMapa from '@/assets/comms-mapa-encontro.jpg';
import imgSinal from '@/assets/comms-sinal-visual.jpg';
import imgRecado from '@/assets/comms-recado-escrito.jpg';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, ease: APPLE_EASE, delay },
});

const Section = ({ num, title, children }: { num: number; title: string; children: React.ReactNode }) => (
  <motion.section className="mb-14" {...fade()}>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold">{num}</div>
      <h2 className="text-xl md:text-2xl font-bold text-stone-200">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const Check = ({ items }: { items: string[] }) => (
  <div className="space-y-2">
    {items.map(s => (
      <div key={s} className="flex items-start gap-2">
        <span className="text-rose-500 text-sm mt-0.5">✔</span>
        <span className="text-stone-400 text-sm">{s}</span>
      </div>
    ))}
  </div>
);

export default function ComunicacaoOffline() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

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
    <div className="min-h-screen selection:bg-rose-300/30" style={{ background: '#050808' }}>
      <CinematicHero
        image="/heroes/comunicacao-offline.webp"
        phase="Fase 01 · Base 72"
        title="Comunicação sem Internet"
        subtitle="Coordenação, informação e organização familiar quando redes móveis e internet estão indisponíveis."
        icon={Siren}
        accentColor="amber"
      />

      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-12 pb-32">

          <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-2xl p-5 md:p-6 mb-4">
            <p className="text-stone-300 text-sm font-semibold mb-3">Comunicação em crise não é conversa. É sobrevivência estratégica.</p>
            <p className="text-stone-400 text-sm mb-3">Sem comunicação:</p>
            <div className="grid grid-cols-2 gap-2">
              {['Não há coordenação', 'Não há reencontro', 'Não há decisão informada', 'Não há prevenção de risco'].map(item => (
                <div key={item} className="bg-white/[0.04] rounded-xl p-3 text-center">
                  <span className="text-[11px] font-semibold text-stone-400">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fundamento Operacional */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6 mb-4">
            <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-3">📌 Fundamento Operacional</h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-3">Após desastres históricos:</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Redes móveis saturam nas primeiras 2 horas', 'Energia elétrica falha', 'Dados móveis tornam-se instáveis', 'Informações falsas se espalham rapidamente'].map(item => (
                <div key={item} className="bg-red-500/[0.06] rounded-lg p-2.5">
                  <span className="text-xs text-stone-400">• {item}</span>
                </div>
              ))}
            </div>
            <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-3">
              <p className="text-stone-200 text-sm font-bold">O sistema precisa ser independente de internet e rede celular.</p>
            </div>
          </div>

          {/* 5 Camadas */}
          <div className="bg-stone-800 text-white rounded-2xl p-5 md:p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-rose-400">🔹 Camadas da Comunicação em Crise</h3>
            <p className="text-stone-300 text-sm mb-4">Sistema eficiente funciona em 5 níveis:</p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {[
                { num: '1', label: 'Informação passiva' },
                { num: '2', label: 'Comunicação familiar' },
                { num: '3', label: 'Sinalização local' },
                { num: '4', label: 'Ponto de encontro' },
                { num: '5', label: 'Contingência' },
              ].map(item => (
                <div key={item.num} className="bg-white/10 rounded-lg p-3 text-center">
                  <span className="text-lg font-bold text-rose-400 block">{item.num}</span>
                  <span className="text-[11px] font-semibold text-stone-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        {/* 1 — RÁDIO AM/FM */}
        <Section num={1} title="Informação Passiva — Rádio AM/FM">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            O rádio é o <strong className="text-stone-200">meio mais resiliente</strong>. Funciona com pilha, bateria, manivela ou energia solar portátil.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
            <img src={imgRadio} alt="Rádio AM/FM portátil com bloco de frequências" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Radio size={16} className="text-rose-400" />
                <h3 className="text-lg font-bold text-stone-200">Como Escolher Rádio Adequado</h3>
              </div>
              <Check items={['AM/FM', 'Entrada para fone', 'Funcionar sem depender de tomada', 'Antena extensível']} />
              <div className="mt-4 bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-xl p-3">
                <p className="text-amber-400 text-xs font-semibold">Evitar rádios dependentes exclusivamente de energia elétrica.</p>
              </div>
            </div>
          </div>

          <div className="bg-rose-500/[0.06] border border-rose-500/[0.15] rounded-2xl p-5 md:p-6">
            <h3 className="text-base font-bold text-stone-200 mb-3">Frequências Importantes</h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-3">Antes de qualquer crise, identificar:</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {['Emissoras locais', 'Frequência da Defesa Civil', 'Rádio pública regional'].map(item => (
                <div key={item} className="bg-white/[0.04] rounded-lg p-2.5 text-center">
                  <span className="text-xs font-semibold text-stone-400">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/[0.03] rounded-xl p-3">
              <p className="text-stone-200 text-sm font-semibold">📝 Anotar em papel e guardar no kit.</p>
            </div>
          </div>
        </Section>

        {/* 2 — COMUNICAÇÃO FAMILIAR */}
        <Section num={2} title="Comunicação Familiar e Ponto de Encontro">
          <div className="bg-red-500/[0.08] border border-red-500/[0.15] rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="text-sm font-bold text-red-400">Erro comum: depender apenas de celular.</span>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
            <img src={imgMapa} alt="Mapa com pontos de encontro marcados" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-rose-400" />
                <h3 className="text-lg font-bold text-stone-200">Protocolo Básico Doméstico</h3>
              </div>
              <Check items={['Definir ponto primário', 'Definir ponto secundário', 'Definir horário fixo de reencontro']} />

              <div className="mt-4 bg-white/[0.04] border border-white/[0.06] rounded-xl p-4">
                <h4 className="text-xs font-bold text-rose-400 mb-2">Exemplo Prático</h4>
                <div className="space-y-1.5">
                  <p className="text-stone-400 text-sm"><strong className="text-stone-200">Ponto 1:</strong> Casa de parente próximo</p>
                  <p className="text-stone-400 text-sm"><strong className="text-stone-200">Ponto 2:</strong> Praça central</p>
                  <p className="text-stone-400 text-sm"><strong className="text-stone-200">Horário:</strong> 18h independentemente de comunicação</p>
                </div>
                <p className="text-stone-500 text-xs mt-2 italic">Isso elimina decisões improvisadas.</p>
              </div>
            </div>
          </div>

          {/* Regra dos 3 Contatos */}
          <div className="bg-rose-500/[0.06] border border-rose-500/[0.15] rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-rose-400" />
              <h3 className="text-base font-bold text-stone-200">📌 Regra dos 3 Contatos</h3>
            </div>
            <p className="text-stone-400 text-sm mb-3">Cada membro deve saber:</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { num: '1', label: 'Contato local' },
                { num: '2', label: 'Contato fora da cidade' },
                { num: '3', label: 'Vizinho confiável' },
              ].map(item => (
                <div key={item.num} className="bg-white/[0.04] rounded-xl p-3 text-center">
                  <span className="text-lg font-bold text-rose-400 block">{item.num}</span>
                  <span className="text-[11px] font-semibold text-stone-400">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-white/[0.03] rounded-xl p-3">
              <p className="text-stone-400 text-xs">Em crises, às vezes <strong className="text-stone-200">chamadas interurbanas funcionam antes das locais</strong>.</p>
            </div>
          </div>
        </Section>

        {/* 3 — SINALIZAÇÃO VISUAL */}
        <Section num={3} title="Sinalização Visual">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            Se comunicação falhar completamente, <strong className="text-stone-200">sinalização visual orienta deslocamento</strong>.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
            <img src={imgSinal} alt="Lençol branco em janela como sinal visual" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Eye size={16} className="text-rose-400" />
                <h3 className="text-lg font-bold text-stone-200">Métodos Simples e Eficazes</h3>
              </div>
              <Check items={['Lençol branco em janela = seguro', 'Lençol colorido = necessidade', 'Lanterna piscando à noite']} />
            </div>
          </div>

          <div className="bg-stone-800 text-white rounded-2xl p-5 md:p-6">
            <h3 className="text-base font-bold mb-3 text-rose-400">Código Doméstico Simples</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <span className="text-2xl block mb-2">💡</span>
                <span className="text-sm font-bold text-stone-200">Luz fixa</span>
                <span className="text-xs text-stone-400 block mt-1">= tudo bem</span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <span className="text-2xl block mb-2">🔦</span>
                <span className="text-sm font-bold text-stone-200">Luz piscando</span>
                <span className="text-xs text-stone-400 block mt-1">= precisa de ajuda</span>
              </div>
            </div>
            <p className="text-stone-400 text-xs mt-3 text-center">Criar código antes da necessidade.</p>
          </div>
        </Section>

        {/* 4 — RÁDIO AMADOR */}
        <Section num={4} title="Comunicação por Rádio Amador (Opcional)">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              Para quem deseja nível avançado: <strong className="text-stone-200">rádio comunicador portátil (VHF/UHF)</strong>.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold text-rose-400 mb-2">Permite</h4>
                <Check items={['Comunicação direta local', 'Coordenação comunitária', 'Alcance de alguns quilômetros']} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-rose-400 mb-2">Requer</h4>
                <div className="space-y-2">
                  {['Conhecimento básico', 'Frequências autorizadas', 'Treino prévio'].map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="text-amber-500 text-sm mt-0.5">⚠</span>
                      <span className="text-stone-400 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 5 — ORGANIZAÇÃO DE INFORMAÇÕES */}
        <Section num={5} title="Organização de Informações">
          <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-2xl p-5 md:p-6">
            <p className="text-stone-300 text-sm font-semibold mb-4">
              Durante crise, rumores causam mais dano que a falta de informação.
            </p>
            <h3 className="text-base font-bold text-stone-200 mb-3">Regra prática — Anotar:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {[
                { icon: Clock, label: 'Data' },
                { icon: Clock, label: 'Hora' },
                { icon: Users, label: 'Fonte' },
                { icon: FileText, label: 'Conteúdo' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white/[0.04] rounded-xl p-3 text-center">
                  <Icon size={16} className="text-amber-400 mx-auto mb-1.5" />
                  <span className="text-xs font-semibold text-stone-400">{label}</span>
                </div>
              ))}
            </div>
            <div className="bg-red-500/[0.08] border border-red-500/[0.15] rounded-xl p-3">
              <p className="text-red-400 text-xs font-semibold">Nunca agir com base em informação única não confirmada.</p>
            </div>
          </div>
        </Section>

        {/* 6 — GESTÃO DE ENERGIA */}
        <Section num={6} title="Gestão de Energia">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            <strong className="text-stone-200">Comunicação consome energia.</strong>
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Battery size={16} className="text-rose-400" />
              <h3 className="text-base font-bold text-stone-200">Estratégia</h3>
            </div>
            <Check items={['Uso do rádio em horários definidos', 'Lanternas com pilhas reservadas', 'Não manter aparelhos ligados continuamente']} />
          </div>
        </Section>

        {/* 7 — CONTINGÊNCIA SEM TECNOLOGIA */}
        <Section num={7} title="Plano de Contingência sem Tecnologia">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            Se tudo falhar: <strong className="text-stone-200">comunicação física</strong>.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
            <img src={imgRecado} alt="Recado escrito preso na porta" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['Recados escritos', 'Quadro na entrada da casa', 'Envelope em local combinado'].map(item => (
                  <div key={item} className="bg-white/[0.04] rounded-xl p-3 text-center">
                    <span className="text-xs font-semibold text-stone-400">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-4">
                <h4 className="text-xs font-bold text-rose-400 mb-1">Exemplo</h4>
                <p className="text-stone-400 text-sm">Caixa específica onde mensagens são deixadas em local previamente combinado.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 8 — SEGURANÇA DA INFORMAÇÃO */}
        <Section num={8} title="Segurança da Informação">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={16} className="text-rose-400" />
              <h3 className="text-base font-bold text-stone-200">Evitar divulgar:</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['Quantidade de recursos', 'Estoque de alimentos', 'Estratégias internas'].map(item => (
                <div key={item} className="bg-red-500/[0.06] rounded-xl p-3 text-center">
                  <span className="text-xs font-semibold text-stone-400">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-stone-300 text-sm font-semibold">Comunicação deve ser objetiva e controlada.</p>
          </div>
        </Section>

        {/* ERROS CRÍTICOS */}
        <motion.section className="mb-14" {...fade()}>
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert size={20} className="text-red-500" />
            <h2 className="text-xl md:text-2xl font-bold text-stone-200">Erros Críticos</h2>
          </div>
          <div className="bg-red-500/[0.1] border border-red-500/[0.2] rounded-2xl p-5 md:p-6">
            <div className="space-y-2">
              {[
                'Confiar apenas em grupo de mensagens',
                'Não definir ponto de encontro',
                'Deixar rádio sem pilha reserva',
                'Agir com base em boatos',
                'Não treinar antes',
              ].map(err => (
                <div key={err} className="flex items-start gap-2">
                  <span className="text-red-500 text-sm mt-0.5">❌</span>
                  <span className="text-stone-300 text-sm font-medium">{err}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* PRINCÍPIO CENTRAL */}
        <motion.section className="mb-8" {...fade()}>
          <div className="bg-stone-800 text-white rounded-2xl p-6 md:p-8 text-center">
            <Siren size={28} className="mx-auto mb-4 text-rose-400" />
            <h2 className="text-xl md:text-2xl font-bold mb-3">Princípio Central</h2>
            <p className="text-stone-300 text-sm leading-relaxed max-w-lg mx-auto mb-4">
              Comunicação é estrutura de coordenação. Ela reduz pânico, evita deslocamentos desnecessários, mantém grupo unido e aumenta eficiência na tomada de decisão.
            </p>
            <p className="text-rose-400 text-sm font-bold mb-2">Nos primeiros 3 dias, comunicação organizada vale mais que tecnologia sofisticada.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-md mx-auto mt-4">
              {['Reduz pânico', 'Evita deslocamentos', 'Mantém grupo unido', 'Melhora decisões'].map(item => (
                <div key={item} className="bg-white/10 rounded-lg p-2">
                  <span className="text-xs font-semibold text-stone-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <MicroCtaResistencia variant="default" />

        {/* Back bottom */}
        <div className="text-center pt-8">
          <Link to="/soberania-organica" className="inline-flex items-center gap-2 text-stone-500 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
            <ArrowLeft size={14} /> Voltar ao Soberania Orgânica
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
