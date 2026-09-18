import { motion } from 'framer-motion';
import { Clock, Sun, Coffee, Utensils, MonitorSmartphone, Moon, AlertTriangle, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import imgDespertar from '@/assets/toxicos/momento-despertar.webp';
import imgCafe from '@/assets/toxicos/momento-cafe.webp';
import imgAlmoco from '@/assets/toxicos/momento-almoco.webp';
import imgExpediente from '@/assets/toxicos/momento-expediente.webp';
import imgDormir from '@/assets/toxicos/momento-dormir.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface Momento {
  hora: string;
  titulo: string;
  corpo: string;
  mente: string;
  comportamento: string;
  ambiente: string;
  icon: LucideIcon;
  accentFrom: string;
  accentTo: string;
  image: string;
  imageAlt: string;
}

const MOMENTOS: Momento[] = [
  {
    hora: '06:30', titulo: 'Despertar', icon: Sun,
    accentFrom: 'rgba(245,158,11,0.15)', accentTo: 'rgba(245,158,11,0.03)',
    image: imgDespertar,
    imageAlt: 'Pasta de dente e smartphone com notificações sobre bancada de banheiro ao amanhecer',
    corpo: 'Pasta de dente com triclosan (disruptor endócrino banido na UE em 2017, ainda vendido no Brasil). Desodorante com alumínio que atravessa a pele em 26 segundos.',
    mente: 'Primeiro reflexo: pegar o celular. Cortisol matinal é sequestrado por notificações projetadas para gerar urgência artificial.',
    comportamento: 'O algoritmo do feed já decidiu quais emoções você vai sentir nos próximos 20 minutos. Não é acaso. É A/B testing em escala.',
    ambiente: 'Ar do quarto fechado com formaldeído liberado por móveis MDF, colchão de espuma e cortinas sintéticas. 2 a 5× mais poluído que o ar externo (EPA).',
  },
  {
    hora: '08:00', titulo: 'Café da manhã', icon: Coffee,
    accentFrom: 'rgba(239,68,68,0.12)', accentTo: 'rgba(239,68,68,0.02)',
    image: imgCafe,
    imageAlt: 'Pão industrializado, margarina, suco de caixa e celular com notificação vermelha em mesa de café',
    corpo: 'Pão industrializado: propionato de cálcio + bromato de potássio (carcinógeno classe 2B). Margarina: gordura interesterificada que o fígado não reconhece. Suco de caixa: 14g de açúcar oculto por copo, rotulado como "sem adição".',
    mente: 'Telejornal de fundo: 73% das pautas são negativas (Media Tenor Institute). Design editorial calculado para manter estado de alerta e passividade.',
    comportamento: 'WhatsApp: 23 notificações acumuladas. Cada uma dispara micro-dose de dopamina. O cérebro já está fragmentado antes de começar a produzir.',
    ambiente: 'Detergente da louça: lauril sulfato de sódio (irritante dérmico crônico). Esponja sintética: libera micropartículas de nylon na água e nas mãos.',
  },
  {
    hora: '12:30', titulo: 'Almoço', icon: Utensils,
    accentFrom: 'rgba(168,85,247,0.12)', accentTo: 'rgba(168,85,247,0.02)',
    image: imgAlmoco,
    imageAlt: 'Marmita de isopor, refrigerante, celular com feed social e maquininha de cartão sob luz fluorescente',
    corpo: 'Restaurante por quilo: 78% dos pratos contêm glutamato monossódico (excitotoxina que supera a saciedade natural). Refrigerante: ácido fosfórico que dissolve cálcio ósseo em pH 2.5.',
    mente: 'Scroll de redes durante refeição: conteúdo é curado para maximizar tempo de tela, não para informar. O algoritmo recompensa indignação porque gera mais engajamento.',
    comportamento: 'Pagamento por aproximação: zero atrito cognitivo. O cérebro não registra a dor da perda financeira. Gasto 12-18% maior que com dinheiro físico (MIT Sloan).',
    ambiente: 'Embalagem de marmita: poliestireno aquecido no micro-ondas libera estireno (neurotóxico) diretamente na comida.',
  },
  {
    hora: '18:00', titulo: 'Fim do expediente', icon: MonitorSmartphone,
    accentFrom: 'rgba(6,182,212,0.12)', accentTo: 'rgba(6,182,212,0.02)',
    image: imgExpediente,
    imageAlt: 'Escritório vazio ao entardecer com múltiplos monitores brilhando em luz azul fria',
    corpo: 'Cortisol cronicamente elevado: 8+ horas sentado. Sistema linfático estagnado. Dor lombar que virou "normal". Visão deteriorando por exposição contínua a luz azul sem compensação.',
    mente: 'Fadiga decisória: após ~35.000 microdecisões diárias, o cérebro entra em modo automático. É exatamente quando propagandas e conteúdo persuasivo são mais eficazes.',
    comportamento: 'Netflix/streaming: autoplay projetado para eliminar o momento de decisão. A interface remove propositalmente o ponto de saída. Cada episódio termina com cliffhanger calibrado.',
    ambiente: 'Iluminação LED doméstica: 6500K de temperatura de cor. Suprime melatonina 2 horas antes do que luz natural faria. O relógio biológico não reconhece mais a noite.',
  },
  {
    hora: '23:00', titulo: 'Antes de dormir', icon: Moon,
    accentFrom: 'rgba(34,197,94,0.12)', accentTo: 'rgba(34,197,94,0.02)',
    image: imgDormir,
    imageAlt: 'Smartphone aceso sobre criado-mudo ao lado de cama em quarto à meia-noite',
    corpo: 'Corpo processou ~2kg de aditivos químicos no ano (FDA estimate). Fígado trabalhou em dobro para metabolizar o que não deveria ter entrado. Microbiota intestinal alterada por emulsificantes que corroem o muco protetor.',
    mente: 'Última coisa na tela: conteúdo otimizado para reter atenção, não para informar. O cérebro ainda está processando estímulos 40 minutos depois de desligar a tela.',
    comportamento: 'Alarme programado para 6h30. O ciclo recomeça. Mas agora o sono é interrompido por notificações (63% dos adultos dormem com o celular a menos de 1 metro da cabeça — Deloitte).',
    ambiente: 'Colchão retardante de chamas: PBDE (éteres difenílicos polibromados) são liberados como gás durante o sono. Classificados como poluentes orgânicos persistentes. Proibidos na UE. Legais no Brasil.',
  },
];

const VETORES = [
  { key: 'corpo' as const, label: 'Corpo', color: 'text-amber-400', dot: 'bg-amber-400' },
  { key: 'mente' as const, label: 'Mente', color: 'text-violet-400', dot: 'bg-violet-400' },
  { key: 'comportamento' as const, label: 'Comportamento', color: 'text-cyan-400', dot: 'bg-cyan-400' },
  { key: 'ambiente' as const, label: 'Ambiente', color: 'text-green-400', dot: 'bg-green-400' },
];

export default function TimelineDia() {
  return (
    <section className="relative z-10 py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: APPLE_EASE }}
          className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Clock size={14} className="text-red-400" />
            <span className="text-red-400/70 text-[10px] font-bold tracking-[0.5em] uppercase">Dossiê temporal</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            24 HORAS <span className="text-red-400">SOB INFLUÊNCIA</span>
          </h2>
          <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Um dia comum. Nenhuma decisão extrema. Nenhuma situação atípica. 
            Apenas o inventário honesto do que entra no corpo, na mente, no comportamento 
            e no ambiente de uma pessoa que acredita estar vivendo normalmente.
          </p>
        </motion.div>

        {/* Legenda vetores */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
          {VETORES.map(v => (
            <div key={v.key} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${v.dot}`} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${v.color}`}>{v.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-red-500/20 via-violet-500/20 to-green-500/20" />

          <div className="space-y-6 md:space-y-8">
            {MOMENTOS.map((m, idx) => (
              <motion.div key={m.hora}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: APPLE_EASE, delay: idx * 0.08 }}
                className="group relative pl-16 md:pl-24"
              >
                {/* Time marker */}
                <div className="absolute left-0 top-0 flex items-center gap-2">
                  <div className="w-12 md:w-20 flex items-center justify-end">
                    <span className="text-stone-600 text-xs md:text-sm font-black tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {m.hora}
                    </span>
                  </div>
                  <div className="relative z-10 w-3 h-3 rounded-full bg-stone-800 border-2 border-stone-600 group-hover:border-red-400 transition-colors" />
                </div>

                <div className="rounded-2xl border border-white/[0.06] overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${m.accentFrom}, ${m.accentTo})` }}>
                  {/* Cinematic image */}
                  <div className="relative w-full h-44 md:h-56 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.imageAlt}
                      loading="lazy"
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-stone-950/90" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="text-stone-300 text-[10px] font-bold uppercase tracking-[0.3em] bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                        {m.hora}
                      </span>
                    </div>
                  </div>

                  {/* Card header */}
                  <div className="px-6 md:px-8 pt-6 pb-4 border-b border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <m.icon size={18} className="text-stone-400" />
                      <h3 className="text-lg md:text-xl font-bold text-stone-200 tracking-tight">{m.titulo}</h3>
                    </div>
                  </div>

                  {/* 4 vetores grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.04]">
                    {VETORES.map(v => (
                      <div key={v.key} className="px-6 md:px-8 py-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
                          <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${v.color}`}>{v.label}</span>
                        </div>
                        <p className="text-stone-400 text-xs md:text-[13px] leading-relaxed">
                          {m[v.key]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing punch */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 text-center">
          <div className="inline-block border border-red-500/20 bg-red-500/[0.04] rounded-xl px-8 py-6">
            <p className="text-stone-300 text-sm md:text-base font-semibold mb-2">
              Nenhum desses momentos parece extraordinário.
            </p>
            <p className="text-red-400 text-lg md:text-xl font-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              É exatamente por isso que funcionam.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
