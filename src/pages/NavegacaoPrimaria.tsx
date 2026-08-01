import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Wind, Sun, Compass, Mountain, Building, Route, MapPinned, Moon, AlertTriangle, ShieldAlert, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgSombra from '@/assets/nav-metodo-sombra.jpg';
import imgBussola from '@/assets/nav-bussola.jpg';
import imgUrbana from '@/assets/nav-referencia-urbana.jpg';
import imgNoturna from '@/assets/nav-noturna.jpg';
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

export default function NavegacaoPrimaria() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Navegação Primária: Orientação por Bússola, Sol e Terreno Sem GPS | Lord Junnior</title>
        <meta name="description" content="Como se orientar sem GPS. Método da sombra, bússola improvisada, navegação noturna por estrelas e referências urbanas. Deslocamento seguro sem dependência digital." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/navegacao-primaria" />
        <meta property="og:title" content="Navegação Primária: Orientação Sem Tecnologia" />
        <meta property="og:description" content="Técnicas ancestrais de navegação por sol, estrelas e terreno. Autonomia de deslocamento quando a tecnologia falha." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/navegacao-primaria" />
      </Helmet>
    <div className="min-h-screen selection:bg-teal-300/30" style={{ background: '#050808' }}>
      <CinematicHero
        image="/heroes/navegacao-primaria.webp"
        phase="Fase 01 · Base 72"
        title="Navegação Primária"
        subtitle="Orientação por bússola, sol, terreno e referências naturais. Deslocamento seguro sem dependência digital."
        icon={Wind}
        accentColor="emerald"
      />

      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-12 pb-32">

          <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-2xl p-5 md:p-6 mb-4">
            <p className="text-stone-300 text-sm font-semibold mb-3">Perder a orientação em cenário crítico aumenta:</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {['Exposição', 'Gasto energético', 'Risco físico', 'Desidratação', 'Ansiedade'].map(item => (
                <div key={item} className="bg-white/[0.04] rounded-xl p-3 text-center">
                  <span className="text-[11px] font-semibold text-stone-400">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-stone-500 text-xs mt-4 font-semibold">Navegação primária não é aventura. É preservação estratégica de energia e direção.</p>
          </div>

          {/* Fundamento */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6 mb-4">
            <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-3">📌 Fundamento Biológico e Operacional</h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-3">O cérebro humano depende de referências espaciais claras. Quando você não sabe onde está:</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['O cortisol sobe', 'O raciocínio piora', 'Decisões se tornam impulsivas'].map(item => (
                <div key={item} className="bg-red-500/[0.06] rounded-lg p-2.5 text-center">
                  <span className="text-xs text-stone-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-3">
              <p className="text-stone-200 text-sm font-bold flex items-center gap-2">
                <Brain size={14} className="text-rose-400" /> Direção clara mantém estabilidade cognitiva.
              </p>
            </div>
          </div>

          {/* 5 Camadas */}
          <div className="bg-stone-800 text-white rounded-2xl p-5 md:p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-rose-400">🔹 Camadas da Navegação Primária</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {[
                { num: '1', icon: Sun, label: 'Orientação solar' },
                { num: '2', icon: Compass, label: 'Uso da bússola' },
                { num: '3', icon: Mountain, label: 'Leitura de terreno' },
                { num: '4', icon: Building, label: 'Referências urbanas' },
                { num: '5', icon: Route, label: 'Planejamento' },
              ].map(item => (
                <div key={item.num} className="bg-white/10 rounded-lg p-3 text-center">
                  <item.icon size={18} className="text-rose-400 mx-auto mb-1" />
                  <span className="text-lg font-bold text-rose-400 block">{item.num}</span>
                  <span className="text-[11px] font-semibold text-stone-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        {/* 1 — ORIENTAÇÃO SOLAR */}
        <Section num={1} title="Orientação Solar">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            O sol nasce aproximadamente no <strong className="text-stone-200">Leste</strong> e se põe no <strong className="text-stone-200">Oeste</strong>.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-xl p-4 text-center">
              <Sun size={20} className="text-amber-400 mx-auto mb-2" />
              <span className="text-sm font-bold text-stone-200 block">Manhã</span>
              <span className="text-xs text-stone-400">Sol está a Leste</span>
            </div>
            <div className="bg-orange-500/[0.08] border border-orange-500/[0.15] rounded-xl p-4 text-center">
              <Sun size={20} className="text-orange-400 mx-auto mb-2" />
              <span className="text-sm font-bold text-stone-200 block">Tarde</span>
              <span className="text-xs text-stone-400">Sol está a Oeste</span>
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-4">
            <p className="text-stone-400 text-sm">Ao meio-dia (aproximado), no Brasil: <strong className="text-stone-200">o sol tende a estar mais ao Norte</strong>.</p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
            <img src={imgSombra} alt="Método da sombra com bastão" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <h3 className="text-lg font-bold text-stone-200 mb-3">Técnica da Sombra (Método do Bastão)</h3>
              <p className="text-stone-400 text-sm mb-4">Funciona sem qualquer equipamento.</p>
              <ol className="space-y-2">
                {[
                  'Finque um bastão reto no solo',
                  'Marque a ponta da sombra',
                  'Espere 15 a 20 minutos',
                  'Marque novamente a ponta da nova sombra',
                  'Trace uma linha entre os dois pontos',
                ].map((s, i) => (
                  <li key={i} className="text-stone-400 text-sm flex items-start gap-2">
                    <span className="text-rose-500 font-bold text-xs mt-0.5">{i + 1}.</span> {s}
                  </li>
                ))}
              </ol>
              <div className="mt-4 bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-4">
                <p className="text-stone-200 text-sm font-semibold">A linha indica aproximadamente Oeste → Leste.</p>
                <p className="text-stone-400 text-xs mt-1">Primeiro ponto = Oeste · Segundo ponto = Leste</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 2 — BÚSSOLA */}
        <Section num={2} title="Uso Correto da Bússola">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            A bússola aponta para o <strong className="text-stone-200">Norte magnético</strong>.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
            <img src={imgBussola} alt="Bússola nivelada em campo aberto" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-rose-400 mb-2">Partes Principais</h4>
                  <div className="space-y-1">
                    {['Agulha magnética', 'Rosa dos ventos', 'Linha de direção'].map(item => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span className="text-stone-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-400 mb-2">Como Usar</h4>
                  <ol className="space-y-1">
                    {['Segure nivelada', 'Espere a agulha estabilizar', 'Gire o corpo até alinhar Norte', 'Defina direção desejada'].map((s, i) => (
                      <li key={i} className="text-stone-400 text-sm flex items-start gap-2">
                        <span className="text-rose-500 font-bold text-xs mt-0.5">{i + 1}.</span> {s}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-500/[0.1] border border-red-500/[0.2] rounded-2xl p-5">
            <h4 className="text-sm font-bold text-red-300 mb-2">Erros Comuns</h4>
            <div className="space-y-1.5">
              {['Aproximar de celular', 'Usar perto de metal', 'Não nivelar corretamente'].map(err => (
                <div key={err} className="flex items-start gap-2">
                  <span className="text-red-500 text-sm">❌</span>
                  <span className="text-stone-300 text-sm font-medium">{err}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 3 — LEITURA DE TERRENO */}
        <Section num={3} title="Leitura de Terreno">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            O terreno fornece <strong className="text-stone-200">pistas naturais de direção e segurança</strong>.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <h4 className="text-sm font-bold text-stone-200 mb-3 flex items-center gap-2">
                <Mountain size={14} className="text-rose-400" /> Em Áreas Rurais
              </h4>
              <Check items={['Rios normalmente descem para áreas mais baixas', 'Vegetação mais densa pode indicar água', 'Encostas voltadas ao Norte recebem mais sol no Brasil']} />
            </div>
            <div className="bg-red-500/[0.06] border border-red-500/[0.15] rounded-2xl p-5">
              <h4 className="text-sm font-bold text-red-400 mb-3">Evitar</h4>
              <div className="space-y-1.5">
                {['Vales profundos em chuvas', 'Encostas instáveis', 'Trilhas de animais como única referência'].map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-red-500 text-sm">•</span>
                    <span className="text-stone-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 4 — REFERÊNCIAS URBANAS */}
        <Section num={4} title="Referências Urbanas">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            Mesmo sem GPS, <strong className="text-stone-200">cidades oferecem orientação</strong>.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
            <img src={imgUrbana} alt="Horizonte urbano com referências de orientação" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                {['Igrejas', 'Torres', 'Morros', 'Linhas de transmissão', 'Estradas principais'].map(item => (
                  <div key={item} className="bg-white/[0.04] rounded-xl p-2.5 text-center">
                    <span className="text-xs font-semibold text-stone-400">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-4">
                <p className="text-stone-200 text-sm font-semibold mb-2">Sempre identificar:</p>
                <div className="grid grid-cols-3 gap-2">
                  {['1 ponto alto', '1 via principal', '1 referência fixa'].map(item => (
                    <div key={item} className="bg-white/[0.04] rounded-lg p-2 text-center">
                      <span className="text-xs font-semibold text-rose-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 5 — PLANEJAMENTO */}
        <Section num={5} title="Planejamento de Deslocamento">
          <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-2xl p-5 md:p-6 mb-4">
            <p className="text-stone-200 text-sm font-bold mb-4 flex items-center gap-2">
              <Route size={16} className="text-rose-400" /> Regra de ouro: nunca andar sem objetivo definido.
            </p>
            <h4 className="text-xs font-bold text-rose-400 mb-2">Antes de sair:</h4>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Definir destino', 'Estimar distância', 'Calcular tempo', 'Avaliar rota alternativa'].map(item => (
                <div key={item} className="bg-white/[0.04] rounded-xl p-3 text-center">
                  <span className="text-xs font-semibold text-stone-400">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <h3 className="text-base font-bold text-stone-200 mb-3">Ritmo Seguro de Caminhada</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.04] rounded-xl p-4 text-center">
                <span className="text-2xl font-bold text-stone-200 block">4–5</span>
                <span className="text-xs text-stone-500">km/h em terreno plano</span>
              </div>
              <div className="bg-amber-500/[0.08] rounded-xl p-4 text-center">
                <span className="text-2xl font-bold text-amber-400 block">~3</span>
                <span className="text-xs text-stone-500">km/h em crise</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 6 — MARCAÇÃO */}
        <Section num={6} title="Marcação de Caminho">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">Se precisar retornar:</p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <Check items={['Pedras organizadas discretamente', 'Galhos inclinados', 'Marcação em papel']} />
            <div className="mt-4 bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-xl p-3">
              <p className="text-amber-400 text-xs font-semibold">⚠ Nunca deixar sinais óbvios que exponham rota.</p>
            </div>
          </div>
        </Section>

        {/* 7 — NAVEGAÇÃO NOTURNA */}
        <Section num={7} title="Navegação Noturna">
          <div className="bg-red-500/[0.08] border border-red-500/[0.15] rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="text-sm font-bold text-red-400">Evitar sempre que possível.</span>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
            <img src={imgNoturna} alt="Navegação noturna com lanterna" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Moon size={16} className="text-rose-400" />
                <h3 className="text-lg font-bold text-stone-200">Se inevitável:</h3>
              </div>
              <Check items={['Caminhar devagar', 'Usar luz baixa', 'Evitar terrenos desconhecidos']} />
            </div>
          </div>
        </Section>

        {/* 8 — SINAIS DE DESORIENTAÇÃO */}
        <Section num={8} title="Sinais de Desorientação">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">Se perceber:</p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {['Andando em círculos', 'Dúvida constante de direção', 'Irritação crescente'].map(item => (
              <div key={item} className="bg-amber-500/[0.1] border border-amber-500/[0.2] rounded-xl p-3 text-center">
                <span className="text-xs font-bold text-stone-200">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-stone-800 text-white rounded-2xl p-5 md:p-6 text-center">
            <p className="text-lg font-bold mb-2">Pare imediatamente.</p>
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
              {['Sente', 'Reavalie', 'Reoriente'].map(item => (
                <div key={item} className="bg-white/10 rounded-xl p-3">
                  <span className="text-sm font-bold text-rose-400">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-stone-400 text-xs mt-3">Reoriente com método solar ou bússola.</p>
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
                'Andar sem referência',
                'Ignorar cansaço',
                'Subestimar distância',
                'Confiar apenas na memória',
                'Seguir multidão sem saber destino',
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
            <Wind size={28} className="mx-auto mb-4 text-rose-400" />
            <h2 className="text-xl md:text-2xl font-bold mb-3">Princípio Central</h2>
            <p className="text-stone-300 text-sm leading-relaxed max-w-lg mx-auto mb-4">
              Navegação primária é conservação de energia, redução de risco, controle psicológico e decisão estratégica.
            </p>
            <p className="text-rose-400 text-sm font-bold mb-2">Nos primeiros 3 dias, saber para onde ir vale mais que correr rápido.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-md mx-auto mt-4">
              {['Conservação de energia', 'Redução de risco', 'Controle psicológico', 'Decisão estratégica'].map(item => (
                <div key={item} className="bg-white/10 rounded-lg p-2">
                  <span className="text-xs font-semibold text-stone-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <MicroCtaResistencia variant="default" />

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
