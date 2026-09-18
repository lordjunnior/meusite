import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, AlertTriangle, Leaf, Wind, Brain, Stethoscope, Bone, Shield, Clock, CheckCircle2, XCircle, Activity, Zap, Thermometer, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerChild, viewportOnce } from '@/lib/motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';

import bgFitoterapia from '@/assets/bg-fitoterapia.webp';
import imgRespiratorio from '@/assets/fito-respiratorio.webp';
import imgDigestivo from '@/assets/fito-digestivo.webp';
import imgNervoso from '@/assets/fito-nervoso.webp';
import imgMusculo from '@/assets/fito-musculo.webp';
import imgImunologico from '@/assets/fito-imunologico.webp';
import imgCriancaGarganta from '@/assets/fito-crianca-garganta.webp';
import imgTosseProdutiva from '@/assets/fito-tosse-produtiva.webp';
import imgCongestaoNasal from '@/assets/fito-congestao-nasal.webp';
import imgMaDigestao from '@/assets/fito-ma-digestao.webp';
import imgGases from '@/assets/fito-gases.webp';
import imgConstipacao from '@/assets/fito-constipacao.webp';
import imgInsonia from '@/assets/fito-insonia.webp';
import imgAnsiedade from '@/assets/fito-ansiedade.webp';
import imgFadigaMental from '@/assets/fito-fadiga-mental.webp';
import imgDorMuscular from '@/assets/fito-dor-muscular.webp';
import imgArticulacao from '@/assets/fito-articulacao.webp';
import imgResfriado from '@/assets/fito-resfriado.webp';
import imgImunePreventivo from '@/assets/fito-imune-preventivo.webp';
import imgRecuperacao from '@/assets/fito-recuperacao.webp';

interface Protocolo {
  condicao: string;
  imagem?: string;
  plantas: string[];
  forma: string;
  ciclo: string;
  ajusteIdade: string;
  criterioInterrupcao: string;
  alerta?: string;
}

interface SistemaCorporal {
  nome: string;
  icon: typeof Wind;
  imagem: string;
  cor: { accent: string; bg: string; border: string; pill: string; glow: string };
  descricao: string;
  protocolos: Protocolo[];
}

const SISTEMAS: SistemaCorporal[] = [
  {
    nome: 'Sistema Respiratório',
    icon: Wind,
    imagem: imgRespiratorio,
    cor: { accent: 'text-sky-400', bg: 'from-sky-500/15 to-sky-600/5', border: 'border-sky-500/25', pill: 'bg-sky-500/15 text-sky-300 border-sky-500/20', glow: 'hover:shadow-sky-500/20' },
    descricao: 'Protocolos para congestão, tosse produtiva e irritação de vias aéreas superiores.',
    protocolos: [
      { condicao: 'Tosse produtiva leve', imagem: imgTosseProdutiva, plantas: ['Guaco (broncodilatador)', 'Gengibre (anti-inflamatório)', 'Hortelã (descongestionante)'], forma: 'Infusão de guaco com gengibre ralado fresco (manhã e tarde). Inalação com hortelã à noite.', ciclo: '5 a 7 dias. Se não houver melhora, reavaliar.', ajusteIdade: 'Crianças acima de 6 anos: 50% da dose. Idosos: dose padrão com observação.', criterioInterrupcao: 'Suspender se surgir falta de ar, febre acima de 38,5°C ou escarro com sangue.', alerta: 'Não usar guaco por mais de 10 dias consecutivos (cumarina).' },
      { condicao: 'Congestão nasal e sinusite leve', imagem: imgCongestaoNasal, plantas: ['Hortelã (mentol descongestionante)', 'Alecrim (anti-inflamatório)', 'Gengibre (vasoativo)'], forma: 'Inalação com vapor: folhas de hortelã com alecrim em água quente por 10 min, 2x/dia. Chá de gengibre com limão 2x/dia.', ciclo: '3 a 5 dias.', ajusteIdade: 'Crianças: inalação supervisionada apenas. Evitar gengibre em excesso em menores de 6 anos.', criterioInterrupcao: 'Suspender se houver dor facial intensa, febre ou secreção purulenta.' },
      { condicao: 'Irritação de garganta', imagem: imgCriancaGarganta, plantas: ['Tanchagem (película protetora)', 'Camomila (anti-inflamatória)', 'Gengibre (analgésico leve)'], forma: 'Gargarejo com infusão de tanchagem com camomila morna, 3x/dia. Decocção leve de gengibre para beber. Em crianças, substituir gargarejo por chá de camomila morno adoçado com mel (apenas acima de 1 ano).', ciclo: '3 a 5 dias.', ajusteIdade: 'Gargarejo apenas para maiores de 5 anos. Crianças menores: chá morno de camomila em pequenos goles.', criterioInterrupcao: 'Suspender se dor aumentar, surgir dificuldade para engolir, febre ou placas brancas na garganta.' },
    ],
  },
  {
    nome: 'Sistema Digestivo',
    icon: Activity,
    imagem: imgDigestivo,
    cor: { accent: 'text-amber-400', bg: 'from-amber-500/15 to-amber-600/5', border: 'border-amber-500/25', pill: 'bg-amber-500/15 text-amber-300 border-amber-500/20', glow: 'hover:shadow-amber-500/20' },
    descricao: 'Protocolos para desconforto gástrico, gases, má digestão e irregularidade intestinal.',
    protocolos: [
      { condicao: 'Má digestão e peso pós-refeição', imagem: imgMaDigestao, plantas: ['Boldo (colerético)', 'Hortelã (antiespasmódico)', 'Erva-doce (carminativo)'], forma: 'Infusão de boldo 30 min após refeição (1 xícara). Chá de hortelã com erva-doce entre refeições.', ciclo: '3 a 5 dias. Máximo 5 dias de boldo consecutivo.', ajusteIdade: 'Idosos: iniciar com metade da dose de boldo. Crianças: apenas hortelã com erva-doce.', criterioInterrupcao: 'Suspender boldo se surgir náusea intensa, urina escura ou dor abdominal aguda.', alerta: 'Boldo é contraindicado em gestantes e pessoas com obstrução biliar.' },
      { condicao: 'Gases e distensão abdominal', imagem: imgGases, plantas: ['Erva-doce (anetol relaxante)', 'Hortelã (mentol antiespasmódico)', 'Gengibre (procinético)'], forma: 'Infusão combinada de erva-doce com hortelã após almoço e jantar. Gengibre ralado em água morna pela manhã.', ciclo: '5 a 7 dias. Pausa de 3 dias e reavaliar.', ajusteIdade: 'Seguro para crianças acima de 3 anos na metade da dose.', criterioInterrupcao: 'Suspender se houver cólica intensa, vômito ou alteração significativa no hábito intestinal.' },
      { condicao: 'Constipação leve', imagem: imgConstipacao, plantas: ['Babosa Aloe vera (aloína laxativa)', 'Erva-doce (relaxante intestinal)'], forma: 'Gel de babosa fresco (2 cm) em água pela manhã em jejum. Chá de erva-doce 2x/dia.', ciclo: 'Máximo 3 dias consecutivos de babosa oral.', ajusteIdade: 'Babosa oral: apenas adultos. Crianças: somente erva-doce.', criterioInterrupcao: 'Suspender babosa oral imediatamente se surgir cólica intensa ou diarreia.', alerta: 'Babosa oral é contraindicada em gestantes, lactantes e doença intestinal inflamatória.' },
    ],
  },
  {
    nome: 'Sistema Nervoso',
    icon: Brain,
    imagem: imgNervoso,
    cor: { accent: 'text-purple-400', bg: 'from-purple-500/15 to-purple-600/5', border: 'border-purple-500/25', pill: 'bg-purple-500/15 text-purple-300 border-purple-500/20', glow: 'hover:shadow-purple-500/20' },
    descricao: 'Protocolos para insônia leve, ansiedade situacional, tensão e fadiga mental.',
    protocolos: [
      { condicao: 'Insônia leve', imagem: imgInsonia, plantas: ['Camomila (apigenina, receptor GABA)', 'Capim-limão (citral sedativo)', 'Passiflora (flavonoides ansiolíticos)'], forma: 'Infusão combinada de camomila com capim-limão 1h antes de dormir. Tintura de passiflora (30 gotas) 30 min antes de deitar.', ciclo: '10 a 14 dias. Pausa de 7 dias. Reavaliar necessidade.', ajusteIdade: 'Crianças acima de 5 anos: apenas camomila com capim-limão (50% dose). Idosos: dose padrão.', criterioInterrupcao: 'Suspender se surgir sonolência diurna excessiva, confusão ou piora do sono.', alerta: 'Não combinar com benzodiazepínicos ou antidepressivos sedativos sem orientação médica.' },
      { condicao: 'Ansiedade situacional', imagem: imgAnsiedade, plantas: ['Camomila (calmante leve)', 'Capim-limão (sedativo)', 'Alecrim (estimulante leve para equilíbrio)'], forma: 'Camomila com capim-limão pela manhã e à tarde. Alecrim em dose leve pela manhã para evitar prostração.', ciclo: '7 a 10 dias. Avaliar resposta.', ajusteIdade: 'Seguro em dose reduzida para crianças acima de 6 anos.', criterioInterrupcao: 'Suspender se ansiedade piorar, surgir palpitação ou crise de pânico.' },
      { condicao: 'Fadiga mental e falta de concentração', imagem: imgFadigaMental, plantas: ['Alecrim (ácido rosmarínico, circulação cerebral)', 'Gengibre (estimulante metabólico)'], forma: 'Infusão de alecrim pela manhã. Gengibre ralado em água morna no início da tarde.', ciclo: '5 a 7 dias. Pausa de 3 dias.', ajusteIdade: 'Evitar alecrim em hipertensos não controlados.', criterioInterrupcao: 'Suspender se surgir cefaleia, agitação ou taquicardia.' },
    ],
  },
  {
    nome: 'Sistema Músculo-Esquelético',
    icon: Bone,
    imagem: imgMusculo,
    cor: { accent: 'text-orange-400', bg: 'from-orange-500/15 to-orange-600/5', border: 'border-orange-500/25', pill: 'bg-orange-500/15 text-orange-300 border-orange-500/20', glow: 'hover:shadow-orange-500/20' },
    descricao: 'Protocolos para dor muscular, contusões, inflamação articular e recuperação pós-esforço.',
    protocolos: [
      { condicao: 'Dor muscular pós-esforço', imagem: imgDorMuscular, plantas: ['Arnica (helenalina, uso tópico)', 'Gengibre (gingerol anti-inflamatório)', 'Alecrim (circulação local)'], forma: 'Pomada de arnica na região afetada 3x/dia. Decocção de gengibre para beber 2x/dia. Compressas mornas com infusão de alecrim.', ciclo: '3 a 5 dias.', ajusteIdade: 'Arnica tópica: segura para todas as idades. Gengibre oral: crianças acima de 6 anos (50% dose).', criterioInterrupcao: 'Suspender se surgir inchaço significativo, deformidade ou incapacidade funcional.', alerta: 'NUNCA ingerir arnica. Não aplicar arnica em feridas abertas.' },
      { condicao: 'Inflamação articular leve', imagem: imgArticulacao, plantas: ['Gengibre (anti-inflamatório sistêmico)', 'Calêndula (anti-inflamatória tópica)', 'Camomila (modulação inflamatória)'], forma: 'Decocção de gengibre 2x/dia. Compressas de calêndula na articulação 2x/dia. Camomila à noite para reduzir inflamação basal.', ciclo: '7 a 10 dias. Pausa de 5 dias e reavaliar.', ajusteIdade: 'Idosos: dose padrão com monitoramento.', criterioInterrupcao: 'Suspender se houver aumento do edema, calor local intenso ou limitação progressiva de movimento.' },
    ],
  },
  {
    nome: 'Sistema Imunológico',
    icon: Shield,
    imagem: imgImunologico,
    cor: { accent: 'text-emerald-400', bg: 'from-emerald-500/15 to-emerald-600/5', border: 'border-emerald-500/25', pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20', glow: 'hover:shadow-emerald-500/20' },
    descricao: 'Protocolos para fortalecimento imune preventivo e suporte durante infecções leves.',
    protocolos: [
      { condicao: 'Resfriado leve no início', imagem: imgResfriado, plantas: ['Gengibre (imunoestimulante)', 'Guaco (broncodilatador)', 'Camomila (anti-inflamatória)'], forma: 'Decocção forte de gengibre com limão e mel, 3x/dia. Guaco em infusão 2x/dia. Camomila à noite.', ciclo: '5 a 7 dias. Se febre persistir mais de 48h, buscar atendimento.', ajusteIdade: 'Crianças acima de 6 anos: 50% dose de gengibre e guaco. Mel proibido para menores de 1 ano.', criterioInterrupcao: 'Suspender se febre acima de 38,5°C por mais de 48h, falta de ar ou prostração.' },
      { condicao: 'Fortalecimento imune preventivo (sazonalidade)', imagem: imgImunePreventivo, plantas: ['Gengibre (gingerol)', 'Alecrim (antioxidante)', 'Camomila (modulação imune)'], forma: 'Rotação semanal. Semana 1: gengibre diário. Semana 2: alecrim diário. Semana 3: camomila diária. Semana 4: pausa total.', ciclo: 'Ciclo de 4 semanas. Repetir conforme sazonalidade.', ajusteIdade: 'Seguro para adultos e crianças acima de 6 anos (dose ajustada).', criterioInterrupcao: 'Não é protocolo de tratamento. Suspender se surgir qualquer reação adversa.' },
      { condicao: 'Recuperação pós-infecção', imagem: imgRecuperacao, plantas: ['Alecrim (restaurador)', 'Gengibre (anti-inflamatório)', 'Erva-doce (digestivo)'], forma: 'Alecrim com erva-doce pela manhã (restauração). Gengibre leve à tarde. Descanso e hidratação como prioridade.', ciclo: '5 a 7 dias pós-recuperação.', ajusteIdade: 'Dose padrão.', criterioInterrupcao: 'Suspender se sintomas retornarem.' },
    ],
  },
];

const FAQ = [
  { q: 'Posso combinar plantas de sistemas diferentes ao mesmo tempo?', a: 'Sim, desde que respeite o limite de 3 plantas por momento e observe a janela de uso. Por exemplo: alecrim pela manhã (cognitivo), gengibre à tarde (digestivo) e camomila à noite (sono). O risco aumenta quando há sobreposição de plantas com ação semelhante (sedativos com sedativos, anti-inflamatórios fortes em conjunto).' },
  { q: 'Por quanto tempo posso seguir um protocolo sem pausa?', a: 'A regra geral é máximo de 14 dias contínuos para qualquer protocolo. Plantas com alcaloides (boldo, babosa oral) têm janela menor (3 a 5 dias). Após o ciclo, faça pausa equivalente a metade do tempo de uso antes de retomar.' },
  { q: 'Os protocolos servem para crianças?', a: 'Apenas com ajustes claros. Crianças acima de 5 anos podem usar a maioria das plantas suaves (camomila, hortelã, erva-doce, capim-limão) com 50% da dose adulta. Crianças menores de 2 anos não devem usar nenhum protocolo sem orientação médica direta. Mel é proibido em menores de 1 ano.' },
  { q: 'Posso continuar tomando minha medicação contínua durante o protocolo?', a: 'Em medicação contínua, consulte profissional antes. Plantas com ação cardiovascular (alecrim, gengibre em altas doses), sedativa (camomila, passiflora) ou anticoagulante (alho, gengibre) podem interagir com medicamentos prescritos.' },
  { q: 'O que diferencia este módulo do Suporte Fitoterápico?', a: 'O Suporte Fitoterápico é a biblioteca técnica de plantas individuais com fichas de segurança. A Fitoterapia Aplicada é a estratégia de combinação por condição: define quais plantas usar juntas, em qual ordem, por quanto tempo e quando interromper.' },
  { q: 'Posso usar essas combinações em quadros graves ou crônicos?', a: 'Não. Os protocolos foram estruturados para sintomas leves, agudos e delimitados. Quadros crônicos, recorrentes ou graves exigem investigação clínica. A função do protocolo doméstico é dar autonomia diante do desconforto comum, nunca substituir diagnóstico.' },
];

const FitoterapiaAplicada = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Fitoterapia Aplicada: Protocolos Combinados por Sistema Corporal | Lord Junnior</title>
        <meta name="description" content="Protocolos fitoterápicos estratégicos organizados por sistema corporal. Sinergia entre plantas, ciclos de uso, ajuste por idade e critérios de interrupção documentados em padrão técnico." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/fitoterapia-aplicada" />
        <meta property="og:title" content="Fitoterapia Aplicada: Protocolos Terapêuticos Combinados" />
        <meta property="og:description" content="Combinação estratégica de plantas medicinais por condição. Ciclos, dosagem por idade e critérios de segurança." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/fitoterapia-aplicada" />
        <meta property="og:image" content="https://lordjunnior.com.br/og/fitoterapia-aplicada.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Fitoterapia Aplicada: Protocolos Combinados por Sistema Corporal",
          "description": "Protocolos fitoterápicos por sistema corporal com sinergia, ciclo, ajuste etário e critério de interrupção.",
          "url": "https://lordjunnior.com.br/soberania-organica/fitoterapia-aplicada",
          "author": { "@type": "Person", "name": "Lord Junnior" },
          "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
          "lastReviewed": "2026-04-20",
          "disclaimer": "Conteúdo educacional. Não substitui consulta médica."
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ.map(({ q, a }) => ({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": { "@type": "Answer", "text": a }
          }))
        })}</script>
      </Helmet>

      <FixedThematicBackground image={bgFitoterapia} intensity="heavy" />

      <div className="relative z-10 min-h-screen text-stone-100">
        <div className="px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <CinematicHero
          image={bgFitoterapia}
          phase="Fase 02 · Autonomia Biológica · Capítulo 02"
          title="Fitoterapia Aplicada"
          subtitle="Estratégia terapêutica organizada. Protocolos combinados por sistema corporal, com sinergia, ciclo, ajuste etário e critério de interrupção definidos."
          icon={Leaf}
          accentColor="emerald"
          backLink="/soberania-organica"
          backLabel="Soberania Orgânica"
        />

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 space-y-32">

          {/* INTRO */}
          <motion.section initial="hidden" animate="visible" variants={stagger(0.1)} className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div variants={staggerChild} className="lg:col-span-7 space-y-5 text-stone-300 leading-relaxed text-base md:text-lg">
              <span className="text-emerald-500 text-[11px] font-bold tracking-[0.4em] uppercase">Capítulo 02</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-stone-100" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Da informação isolada à <span className="text-emerald-400">estratégia terapêutica</span>
              </h2>
              <p>
                Este módulo vai além do uso individual de plantas. Aqui, cada condição recebe um <span className="text-stone-100 font-semibold">protocolo estruturado</span> com combinação de plantas, forma de uso, duração, ajuste por idade e critérios claros de interrupção.
              </p>
              <p>
                A planta isolada informa. A combinação correta resolve. A diferença está no <span className="text-emerald-400 font-semibold">desenho do protocolo</span>: dose, sinergia, ciclo e parada.
              </p>
            </motion.div>

            <motion.div variants={staggerChild} className="lg:col-span-5">
              <div className="grid sm:grid-cols-1 gap-4">
                <div className="group bg-emerald-950/40 border border-emerald-700/25 p-6 rounded-2xl backdrop-blur-sm hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500">
                  <p className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-[0.3em] mb-3">Suporte Fitoterápico</p>
                  <p className="text-stone-300">Biblioteca técnica de plantas individuais. Uso isolado, dosagem conservadora, segurança.</p>
                  <Link to="/soberania-organica/autonomia-biologica" className="text-xs text-emerald-400 hover:underline mt-3 inline-flex items-center gap-1">Ver módulo <ChevronRight size={12} /></Link>
                </div>
                <div className="group bg-purple-950/40 border border-purple-500/30 p-6 rounded-2xl backdrop-blur-sm">
                  <p className="text-[10px] font-mono text-purple-400/80 uppercase tracking-[0.3em] mb-3">Fitoterapia Aplicada</p>
                  <p className="text-stone-200 font-medium">Protocolos combinados por condição. Sinergia, ciclos e ajustes estratégicos.</p>
                  <span className="text-xs text-purple-300 mt-3 inline-block">Você está aqui</span>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* AVISO */}
          <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-red-950/30 backdrop-blur-sm border border-red-500/30 p-7 md:p-9 rounded-2xl">
            <div className="flex items-start gap-4">
              <AlertTriangle size={24} className="text-red-400 shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="text-lg text-stone-100"><span className="text-red-400 font-bold">Não substitui tratamento médico.</span> Os protocolos aqui são estratégias complementares para quadros leves e delimitados.</p>
                <p className="text-sm text-stone-400">Cada protocolo inclui critérios objetivos de interrupção e indicação para buscar atendimento profissional.</p>
              </div>
            </div>
          </motion.section>

          {/* PRINCÍPIOS */}
          <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)}>
            <motion.div variants={staggerChild} className="mb-10">
              <span className="text-stone-500 text-[11px] font-bold tracking-[0.4em] uppercase">Fundamentos</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-100 mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Princípios dos Protocolos</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Leaf, title: 'Sinergia', desc: 'Plantas combinadas potencializam efeitos. A associação correta supera o uso isolado.' },
                { icon: Clock, title: 'Ciclos', desc: 'Cada protocolo tem duração definida. Uso contínuo indefinido não é estratégia, é negligência.' },
                { icon: Zap, title: 'Ajuste por Idade', desc: 'Doses e plantas variam por faixa etária. Crianças, adultos e idosos respondem diferente.' },
                { icon: Thermometer, title: 'Avaliação de Resposta', desc: 'Monitorar sinais objetivos durante o ciclo. Sem melhora em 48 a 72h, reavaliar.' },
                { icon: XCircle, title: 'Critérios de Interrupção', desc: 'Todo protocolo tem gatilho de parada. Saber quando parar é tão importante quanto começar.' },
                { icon: Stethoscope, title: 'Encaminhamento', desc: 'Limites claros entre suporte fitoterápico e necessidade de atendimento profissional.' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={staggerChild}
                  className="group bg-emerald-950/30 backdrop-blur-sm border border-emerald-700/25 p-6 rounded-2xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500"
                >
                  <item.icon size={28} className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-stone-100 text-lg mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h4>
                  <p className="text-sm text-stone-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* PROTOCOLOS POR SISTEMA */}
          {SISTEMAS.map((sistema, sIdx) => (
            <motion.section key={sistema.nome} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.06)}>
              {/* Header com imagem cinematográfica horizontal */}
              <motion.div variants={staggerChild} className="relative rounded-3xl overflow-hidden mb-10 group">
                <div className="aspect-[21/8] md:aspect-[21/6] relative">
                  <img
                    src={sistema.imagem}
                    alt={`Imagem cinematográfica representativa do ${sistema.nome}`}
                    width={1600}
                    height={900}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="relative h-full flex items-center px-8 md:px-14">
                    <div className="max-w-xl">
                      <span className="text-stone-400 text-[11px] font-bold tracking-[0.4em] uppercase">Sistema {String(sIdx + 1).padStart(2, '0')}</span>
                      <div className="flex items-center gap-3 mt-3 mb-4">
                        <sistema.icon size={32} className={sistema.cor.accent} />
                        <h2 className={`text-3xl md:text-5xl font-black tracking-tight text-stone-100`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{sistema.nome}</h2>
                      </div>
                      <p className="text-stone-300 text-base md:text-lg leading-relaxed">{sistema.descricao}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-6">
                {sistema.protocolos.map((proto, pIdx) => (
                  <motion.article
                    key={proto.condicao}
                    variants={staggerChild}
                    className={`group bg-gradient-to-br ${sistema.cor.bg} backdrop-blur-sm border ${sistema.cor.border} rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl ${sistema.cor.glow} transition-all duration-500`}
                  >
                    {proto.imagem && (
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <img
                          src={proto.imagem}
                          alt={`Imagem ilustrativa do protocolo ${proto.condicao}`}
                          width={1200}
                          height={675}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}

                    <div className="p-6 md:p-8 space-y-5">
                      <div>
                        <span className="text-[10px] font-mono text-stone-500 tracking-wider">Protocolo {sIdx + 1}.{pIdx + 1}</span>
                        <h3 className={`text-2xl font-bold mt-1 ${sistema.cor.accent}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{proto.condicao}</h3>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 flex items-center gap-1.5 mb-3">
                          <Leaf size={11} className={sistema.cor.accent} /> Combinação de plantas
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {proto.plantas.map((p) => (
                            <span key={p} className={`text-xs border px-3 py-1.5 rounded-full ${sistema.cor.pill}`}>{p}</span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/[0.04] border border-white/[0.06] p-4 rounded-xl">
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500">Forma de uso</span>
                        <p className="text-sm text-stone-200 mt-2 leading-relaxed">{proto.forma}</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="border-l-2 border-white/15 pl-3">
                          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 flex items-center gap-1">
                            <Clock size={10} /> Ciclo
                          </span>
                          <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">{proto.ciclo}</p>
                        </div>
                        <div className="border-l-2 border-white/15 pl-3">
                          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 flex items-center gap-1">
                            <Zap size={10} /> Ajuste por idade
                          </span>
                          <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">{proto.ajusteIdade}</p>
                        </div>
                      </div>

                      <div className="bg-red-500/10 border border-red-500/25 p-4 rounded-xl">
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400/90 flex items-center gap-1.5">
                          <XCircle size={11} /> Critério de interrupção
                        </span>
                        <p className="text-xs text-stone-200 mt-2 leading-relaxed">{proto.criterioInterrupcao}</p>
                      </div>

                      {proto.alerta && (
                        <div className="flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/25 p-4 rounded-xl">
                          <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-200/90 leading-relaxed">{proto.alerta}</p>
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          ))}

          {/* REGRAS GERAIS */}
          <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)}>
            <motion.div variants={staggerChild} className="mb-10">
              <span className="text-stone-500 text-[11px] font-bold tracking-[0.4em] uppercase">Segurança</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-100 mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Regras Gerais dos Protocolos</h2>
            </motion.div>

            <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/40 to-transparent backdrop-blur-sm border border-red-700/30 p-8 md:p-12 rounded-2xl">
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  'Nunca combinar mais de 3 plantas sem conhecimento avançado',
                  'Sempre iniciar com dose mínima e observar resposta',
                  'Respeitar pausas entre ciclos. Nunca uso contínuo indefinido',
                  'Gestantes e lactantes: consultar profissional antes de qualquer protocolo',
                  'Crianças menores de 2 anos: nenhum protocolo sem orientação médica',
                  'Interação medicamentosa: se usa medicação contínua, consultar antes',
                ].map((regra) => (
                  <div key={regra} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 size={16} className="text-red-400 shrink-0 mt-0.5" />
                    <span className="text-stone-200 leading-relaxed">{regra}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-7">
                <h4 className="text-base font-bold text-stone-100 mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Buscar atendimento médico imediatamente se:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Febre acima de 38,5°C persistente por mais de 48h',
                    'Reação alérgica (inchaço, coceira, falta de ar)',
                    'Piora progressiva dos sintomas',
                    'Confusão mental ou prostração',
                    'Dor intensa que não cede',
                    'Qualquer sangramento inesperado',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm bg-red-500/10 border border-red-500/25 p-3 rounded-xl">
                      <XCircle size={14} className="text-red-400 shrink-0" />
                      <span className="text-stone-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* FAQ */}
          <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.06)}>
            <motion.div variants={staggerChild} className="mb-10">
              <span className="text-stone-500 text-[11px] font-bold tracking-[0.4em] uppercase">Dúvidas frequentes</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-100 mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Perguntas que separam o curioso do estrategista</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {FAQ.map((item, idx) => (
                <motion.details
                  key={item.q}
                  variants={staggerChild}
                  className="group bg-emerald-950/30 backdrop-blur-sm border border-emerald-700/25 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-500"
                >
                  <summary className="cursor-pointer p-6 flex items-start gap-4 list-none">
                    <span className="text-emerald-500 font-mono text-xs tracking-wider mt-1">{String(idx + 1).padStart(2, '0')}</span>
                    <h3 className="flex-1 text-lg font-bold text-stone-100 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.q}</h3>
                    <ChevronRight size={20} className="text-emerald-400 shrink-0 mt-1 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-6 pl-[3.75rem]">
                    <p className="text-stone-300 leading-relaxed text-sm md:text-base">{item.a}</p>
                  </div>
                </motion.details>
              ))}
            </div>
          </motion.section>

          {/* DISCLAIMER */}
          <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-amber-950/30 backdrop-blur-sm border border-amber-700/30 p-7 rounded-2xl">
            <div className="flex items-start gap-4">
              <AlertTriangle size={22} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-base font-bold text-amber-300 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Aviso Legal</p>
                <p className="text-sm text-stone-300 leading-relaxed">
                  Este conteúdo é de caráter educativo e informativo, baseado em uso tradicional documentado e referências fitoterapêuticas reconhecidas. Não substitui consulta médica, diagnóstico ou tratamento profissional.
                </p>
              </div>
            </div>
          </motion.section>

          <MicroCtaResistencia variant="saude" />

          {/* NAV FOOTER */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t border-white/[0.08]">
            <Link to="/soberania-organica" className="group text-stone-400 hover:text-emerald-400 transition-colors text-sm font-mono flex items-center gap-2">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Soberania Orgânica
            </Link>
            <Link to="/soberania-organica/autonomia-biologica" className="group text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-mono flex items-center gap-2">
              Suporte Fitoterápico
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </main>

        <ScrollToTop />
      </div>
    </>
  );
};

export default FitoterapiaAplicada;
