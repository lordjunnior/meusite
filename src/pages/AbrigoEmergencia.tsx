import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Tent, Thermometer, Wind, Droplets, AlertTriangle, Shield, Home, TreePine, Layers, Heart, Brain, Sun, Trash2, Lightbulb, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgSoloIsolamento from '@/assets/abrigo-solo-isolamento.webp';
import imgReforcoJanela from '@/assets/abrigo-reforco-janela.webp';
import imgQuartoNucleo from '@/assets/abrigo-quarto-nucleo.webp';
import imgBanheiroImprovisado from '@/assets/abrigo-banheiro-improvisado.webp';
import imgResfriamentoPassivo from '@/assets/abrigo-resfriamento-passivo.webp';
import imgAFrame from '@/assets/abrigo-a-frame.webp';
import imgOrganizacao from '@/assets/abrigo-organizacao.webp';
import imgAquecedorVela from '@/assets/abrigo-aquecedor-vela.webp';
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

export default function AbrigoEmergencia() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Abrigo de Emergência: Proteção e Blindagem em Cenários Críticos | Lord Junnior</title>
        <meta name="description" content="Guia técnico para construção e adaptação de abrigos de emergência. Isolamento térmico, reforço estrutural, banheiro improvisado e ventilação passiva. Proteja sua família com protocolos de soberania física." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/abrigo-emergencia" />
        <meta property="og:title" content="Abrigo de Emergência: O Guia de Blindagem Física Urbana" />
        <meta property="og:description" content="Protocolos de abrigo, isolamento e proteção para quem não aceita ser vítima do caos. Soberania física real." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/abrigo-emergencia" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Como Construir um Abrigo de Emergência",
          "description": "Guia técnico para adaptação e construção de abrigos de emergência com isolamento térmico, reforço estrutural e saneamento improvisado.",
          "step": [
            { "@type": "HowToStep", "name": "Isolamento do solo", "text": "Crie barreira térmica entre o corpo e o chão usando camadas de material isolante." },
            { "@type": "HowToStep", "name": "Reforço estrutural", "text": "Proteja janelas e aberturas com materiais improvisados para segurança." },
            { "@type": "HowToStep", "name": "Quarto núcleo", "text": "Defina o menor cômodo como espaço central de sobrevivência." },
            { "@type": "HowToStep", "name": "Saneamento", "text": "Monte banheiro improvisado com balde, sacos e cal virgem." },
            { "@type": "HowToStep", "name": "Ventilação passiva", "text": "Mantenha circulação de ar para evitar acúmulo de CO₂." }
          ]
        })}</script>
      </Helmet>
    <div className="min-h-screen selection:bg-rose-300/30" style={{ background: '#050808' }}>
      <CinematicHero
        image="/heroes/abrigo-emergencia.webp"
        phase="Fase 01 · Base 72"
        title="Abrigo de Emergência"
        subtitle="Proteção térmica, estrutural, psicológica e sanitária em cenários de interrupção prolongada."
        icon={Tent}
        accentColor="rose"
      />

      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-12 pb-32">

          <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-2xl p-5 md:p-6 mb-4">
            <p className="text-stone-300 text-sm font-semibold mb-3">Abrigo não é apenas "ter um teto". É:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { icon: Thermometer, label: 'Controle térmico' },
                { icon: Wind, label: 'Proteção contra intempéries' },
                { icon: Layers, label: 'Organização logística' },
                { icon: Shield, label: 'Segurança estrutural' },
                { icon: Droplets, label: 'Higiene básica' },
                { icon: Brain, label: 'Estabilidade emocional' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white/[0.04] rounded-xl p-3 text-center">
                  <Icon size={16} className="text-rose-400 mx-auto mb-1.5" />
                  <span className="text-[11px] font-semibold text-stone-400">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-stone-500 text-xs mt-4 font-semibold">Se o abrigo falha, todo o restante do protocolo falha.</p>
          </div>

          {/* Fundamento Fisiológico */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-3">📌 Fundamento Fisiológico</h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-3">O corpo humano entra em declínio quando:</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Temperatura corporal < 35°C', 'Exposição contínua à umidade', 'Privação de sono', 'Estresse térmico prolongado'].map(item => (
                <div key={item} className="bg-red-500/[0.06] rounded-lg p-2.5">
                  <span className="text-xs text-stone-400">• {item}</span>
                </div>
              ))}
            </div>
            <p className="text-stone-400 text-sm mb-2 font-semibold">Abrigo bem feito reduz:</p>
            <Check items={['Perda calórica', 'Estresse metabólico', 'Gasto energético', 'Risco infeccioso']} />
          </div>

          {/* 6 Camadas */}
          <div className="mt-4 bg-stone-800 text-white rounded-2xl p-5 md:p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-rose-400">🔹 Camadas do Abrigo Eficiente</h3>
            <p className="text-stone-300 text-sm mb-4">Todo abrigo precisa funcionar em 6 camadas:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['1. Solo', '2. Estrutura', '3. Isolamento térmico', '4. Vedação', '5. Organização interna', '6. Segurança estrutural'].map(item => (
                <div key={item} className="bg-white/10 rounded-lg p-2.5 text-center">
                  <span className="text-xs font-semibold text-stone-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

        {/* 1 — CAMADA DO SOLO */}
        <Section num={1} title="Camada do Solo — Base Térmica">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            O solo é o <strong className="text-stone-200">maior dissipador de calor</strong>. Dormir direto no chão pode reduzir temperatura corporal rapidamente.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
            <img src={imgSoloIsolamento} alt="Isolamento do solo com papelão e cobertores" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <h3 className="text-base font-bold text-stone-200 mb-3">Técnicas Domésticas Aplicáveis</h3>
              <Check items={['3 camadas de papelão', 'Tapetes + cobertor inferior', 'Paletes reaproveitados', 'Estrado improvisado com madeira']} />
              <div className="mt-4 bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-xl p-3">
                <p className="text-amber-400 text-xs font-semibold">Espessura mínima recomendada: 5 cm de material isolante.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 2 — ESTRUTURA */}
        <Section num={2} title="Estrutura — Resistência ao Vento e Impacto">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            Mesmo dentro de casa, <strong className="text-stone-200">janelas são pontos frágeis</strong>.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
            <img src={imgReforcoJanela} alt="Janela reforçada com compensado e fita adesiva" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-rose-400 mb-2">Reforço Doméstico</h3>
                  <Check items={['Madeira ou compensado para janelas', 'Fita adesiva em "X" no vidro (reduz estilhaçamento)', 'Retirar objetos soltos próximos a janelas']} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-rose-400 mb-2">Abrigo Externo</h3>
                  <Check items={['Estrutura triangular (mais estável)', 'Fixação com estacas profundas', 'Evitar áreas baixas (risco de enchente)']} />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 3 — ISOLAMENTO TÉRMICO */}
        <Section num={3} title="Isolamento Térmico — Controle do Microclima">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            Objetivo: <strong className="text-stone-200">manter ar quente interno e impedir troca com ar frio externo</strong>.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
            <img src={imgQuartoNucleo} alt="Ambiente compacto isolado" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Home size={16} className="text-rose-400" />
                <h3 className="text-lg font-bold text-stone-200">Técnica do "Ambiente Compacto"</h3>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mb-4">
                Escolher o <strong className="text-stone-200">menor cômodo disponível</strong>. Reduzir volume de ar aumenta retenção térmica.
              </p>
              <h4 className="text-xs font-bold text-rose-400 mb-2">Vedação Completa</h4>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {['Toalhas nas frestas', 'Plástico grosso em janelas', 'Cortinas pesadas', 'Vedação inferior de portas'].map(item => (
                  <div key={item} className="bg-white/[0.04] rounded-lg p-2.5 flex items-center gap-2">
                    <Wind size={12} className="text-rose-400 shrink-0" />
                    <span className="text-xs text-stone-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Camadas corporais */}
          <div className="bg-rose-500/[0.06] border border-rose-500/[0.15] rounded-2xl p-5 md:p-6">
            <h3 className="text-base font-bold text-stone-200 mb-3">Estratégia de Camadas Corporais</h3>
            <p className="text-stone-400 text-sm mb-3"><strong className="text-stone-200">Nunca usar apenas uma peça grossa.</strong></p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: '1', label: 'Absorve suor' },
                { num: '2', label: 'Retém calor' },
                { num: '3', label: 'Bloqueia vento' },
              ].map(item => (
                <div key={item.num} className="bg-white/[0.04] rounded-xl p-3 text-center">
                  <span className="text-lg font-bold text-rose-400 block">{item.num}</span>
                  <span className="text-[11px] font-semibold text-stone-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aquecedor de vela */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mt-4">
            <img src={imgAquecedorVela} alt="Aquecedor artesanal de vela com vasos de cerâmica" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <h3 className="text-base font-bold text-stone-200 mb-3">Técnica Manual — Aquecedor de Vela Controlado</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-rose-400 block mb-2">Materiais</span>
                  <ul className="space-y-1">
                    {['2 vasos de cerâmica', '1 vela grossa', 'Base não inflamável'].map(m => (
                      <li key={m} className="text-stone-400 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-400 block mb-2">Montagem</span>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    Colocar vaso menor invertido sobre vela. Vaso maior cobrindo parcialmente. A cerâmica acumula calor e libera lentamente.
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-xl p-3">
                <p className="text-amber-400 text-xs font-semibold">⚠ Usar somente em ambiente ventilado e sob supervisão.</p>
              </div>
            </div>
          </div>

          {/* Alerta CO */}
          <div className="bg-red-500/[0.08] border border-red-500/[0.15] rounded-2xl p-5 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="text-sm font-bold text-red-400">Nunca usar carvão ou churrasqueira dentro de casa</span>
            </div>
            <p className="text-red-400/80 text-xs leading-relaxed">Monóxido de carbono é invisível e letal. Risco real em ambientes fechados.</p>
          </div>
        </Section>

        {/* 4 — VENTILAÇÃO */}
        <Section num={4} title="Ventilação Controlada">
          <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-2xl p-5 md:p-6">
            <p className="text-stone-300 text-sm font-semibold mb-3">Erro comum: fechar tudo completamente.</p>
            <p className="text-stone-400 text-sm leading-relaxed mb-3">Sem ventilação mínima:</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['Umidade aumenta', 'Mofo surge', 'CO₂ se acumula'].map(item => (
                <div key={item} className="bg-white/[0.04] rounded-lg p-2.5 text-center">
                  <span className="text-xs font-semibold text-stone-400">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/[0.03] rounded-xl p-4">
              <p className="text-stone-200 text-sm font-bold">Regra prática:</p>
              <p className="text-rose-400 text-sm font-semibold mt-1">Ventilar 5 a 10 minutos, 2x ao dia.</p>
            </div>
          </div>
        </Section>

        {/* 5 — HIGIENE */}
        <Section num={5} title="Higiene e Controle Sanitário">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            <strong className="text-stone-200">Abrigo mal higienizado gera surtos internos.</strong>
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6 mb-4">
            <h3 className="text-base font-bold text-stone-200 mb-3">Organizar</h3>
            <Check items={['Área para descarte de resíduos', 'Recipiente fechado para lixo', 'Água separada para higiene']} />
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
            <img src={imgBanheiroImprovisado} alt="Banheiro improvisado com balde e serragem" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Trash2 size={16} className="text-rose-400" />
                <h3 className="text-lg font-bold text-stone-200">Banheiro Improvisado</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-rose-400 block mb-2">Materiais</span>
                  <ul className="space-y-1">
                    {['Balde', 'Saco resistente', 'Serragem ou areia'].map(m => (
                      <li key={m} className="text-stone-400 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    <strong className="text-stone-200">Cobrir resíduos após cada uso</strong> reduz odor e contaminação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 6 — SEGURANÇA INTERNA */}
        <Section num={6} title="Segurança Interna">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            Durante crises, risco de quedas aumenta e iluminação precária causa acidentes.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <Check items={['Lanternas fixas em pontos estratégicos', 'Caminhos livres', 'Objetos cortantes organizados']} />
          </div>
        </Section>

        {/* 7 — PROTEÇÃO CONTRA CALOR */}
        <Section num={7} title="Proteção Contra Calor Excessivo">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            Abrigo também protege contra <strong className="text-stone-200">superaquecimento</strong>.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6 mb-4">
            <h3 className="text-base font-bold text-stone-200 mb-3">Em Ondas de Calor</h3>
            <Check items={['Ventilação cruzada', 'Cobrir janelas externas', 'Uso de panos úmidos para resfriamento evaporativo']} />
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
            <img src={imgResfriamentoPassivo} alt="Resfriamento passivo com pano úmido na janela" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sun size={16} className="text-rose-400" />
                <h3 className="text-lg font-bold text-stone-200">Técnica de Resfriamento Passivo</h3>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed">
                Pendurar pano úmido em janela com corrente de ar. <strong className="text-stone-200">Evaporação reduz temperatura local.</strong>
              </p>
            </div>
          </div>
        </Section>

        {/* 8 — ORGANIZAÇÃO LOGÍSTICA */}
        <Section num={8} title="Organização Logística Interna">
          <p className="text-stone-400 text-sm leading-relaxed mb-4">
            <strong className="text-stone-200">Caos aumenta estresse.</strong> Rotina reduz ansiedade.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
            <img src={imgOrganizacao} alt="Abrigo organizado com áreas definidas" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Layers, label: 'Dormir' },
                  { icon: Shield, label: 'Armazenar' },
                  { icon: Lightbulb, label: 'Iluminar' },
                  { icon: Thermometer, label: 'Preparar alimentos' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="bg-rose-500/[0.06] rounded-xl p-3 flex items-center gap-2">
                    <Icon size={14} className="text-rose-400 shrink-0" />
                    <span className="text-xs font-semibold text-stone-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 9 — PSICOLOGIA */}
        <Section num={9} title="Psicologia do Abrigo">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain size={16} className="text-rose-400" />
              <h3 className="text-base font-bold text-stone-200">Ambiente organizado:</h3>
            </div>
            <Check items={['Reduz cortisol', 'Aumenta sensação de controle', 'Mantém clareza mental']} />
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <h4 className="text-sm font-bold text-stone-200 mb-2">Pequenos hábitos que fazem diferença:</h4>
              <div className="grid grid-cols-3 gap-2">
                {['Horário fixo para dormir', 'Manter higiene básica', 'Organização visual'].map(item => (
                  <div key={item} className="bg-rose-500/[0.06] rounded-lg p-2.5 text-center">
                    <span className="text-[11px] font-semibold text-stone-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 10 — ERROS GRAVES */}
        <motion.section className="mb-14" {...fade()}>
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert size={20} className="text-red-500" />
            <h2 className="text-xl md:text-2xl font-bold text-stone-200">Erros Graves a Evitar</h2>
          </div>
          <div className="bg-red-500/[0.1] border border-red-500/[0.2] rounded-2xl p-5 md:p-6">
            <div className="space-y-2">
              {[
                'Usar carvão dentro de casa',
                'Dormir com roupa molhada',
                'Não isolar chão',
                'Improvisar aquecimento sem ventilação',
                'Deixar objetos soltos',
              ].map(err => (
                <div key={err} className="flex items-start gap-2">
                  <span className="text-red-500 text-sm mt-0.5">❌</span>
                  <span className="text-stone-300 text-sm font-medium">{err}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SINAIS DE ALERTA */}
        <motion.section className="mb-14" {...fade()}>
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle size={20} className="text-red-500" />
            <h2 className="text-xl md:text-2xl font-bold text-stone-200">Sinais de Alerta Fisiológico</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-amber-500/[0.1] border border-amber-500/[0.2] rounded-2xl p-5">
              <h3 className="text-base font-bold text-amber-300 mb-3">Hipotermia Leve</h3>
              <ul className="space-y-2">
                {['Tremores', 'Extremidades frias'].map(s => (
                  <li key={s} className="text-stone-300 text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-500/[0.1] border border-orange-500/[0.2] rounded-2xl p-5">
              <h3 className="text-base font-bold text-orange-300 mb-3">Moderada</h3>
              <ul className="space-y-2">
                {['Confusão', 'Fala lenta'].map(s => (
                  <li key={s} className="text-stone-300 text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/[0.1] border border-red-500/[0.2] rounded-2xl p-5">
              <h3 className="text-base font-bold text-red-300 mb-3">Grave</h3>
              <ul className="space-y-2">
                {['Sonolência', 'Pulso fraco'].map(s => (
                  <li key={s} className="text-stone-300 text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-red-500/[0.08] border border-red-500/[0.15] rounded-xl p-4">
            <p className="text-red-400 text-sm font-semibold flex items-start gap-2">
              <Heart size={16} className="shrink-0 mt-0.5" />
              Aquecimento deve ser gradual. Nunca água muito quente direta na pele fria.
            </p>
          </div>
        </motion.section>

        {/* ABRIGO EXTERNO (A-FRAME) */}
        <motion.section className="mb-14" {...fade()}>
          <div className="flex items-center gap-3 mb-6">
            <TreePine size={20} className="text-rose-400" />
            <h2 className="text-xl md:text-2xl font-bold text-stone-200">Abrigo Improvisado Fora de Casa</h2>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
            <img src={imgAFrame} alt="Abrigo A-Frame com lona" className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            <div className="p-5 md:p-6">
              <h3 className="text-lg font-bold text-stone-200 mb-3">Técnica A-Frame com Lona</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-rose-400 block mb-2">Materiais</span>
                  <ul className="space-y-1">
                    {['Lona', 'Corda', 'Galhos'].map(m => (
                      <li key={m} className="text-stone-400 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-400 block mb-2">Montagem</span>
                  <ol className="space-y-1">
                    {['Amarrar corda entre duas árvores', 'Estender lona formando triângulo', 'Fixar laterais ao solo', 'Isolar chão com folhas secas + plástico'].map((s, i) => (
                      <li key={i} className="text-stone-400 text-sm flex items-start gap-2">
                        <span className="text-rose-500 font-bold text-xs mt-0.5">{i + 1}.</span> {s}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.05] border border-white/[0.06] rounded-2xl p-5 md:p-6">
            <h3 className="text-base font-bold text-stone-200 mb-3">Material Urbano</h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-3">
              <strong className="text-stone-200">Criar barreira contra vento é prioridade maior que estética.</strong>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {['Paletes', 'Portas antigas', 'Placas de madeira', 'Estruturas metálicas'].map(item => (
                <div key={item} className="bg-white/[0.04] rounded-lg p-2.5 text-center">
                  <span className="text-xs font-semibold text-stone-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* PRINCÍPIO CENTRAL */}
        <motion.section className="mb-8" {...fade()}>
          <div className="bg-stone-800 text-white rounded-2xl p-6 md:p-8 text-center">
            <Tent size={28} className="mx-auto mb-4 text-rose-400" />
            <h2 className="text-xl md:text-2xl font-bold mb-3">Princípio Central</h2>
            <p className="text-stone-300 text-sm leading-relaxed max-w-lg mx-auto mb-4">
              Abrigo eficiente é engenharia térmica aplicada com recursos simples. É controle do ambiente. É preservação metabólica. É gestão inteligente da energia corporal.
            </p>
            <p className="text-rose-400 text-sm font-bold mb-2">Nos primeiros 3 dias, ele mantém:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-md mx-auto">
              {['Temperatura', 'Lucidez', 'Resistência física', 'Capacidade de decisão'].map(item => (
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
