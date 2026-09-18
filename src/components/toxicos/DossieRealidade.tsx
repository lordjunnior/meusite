import { motion } from 'framer-motion';
import { FileWarning, ExternalLink, BookOpen, Beaker, Scale, TrendingUp, Factory, ShieldAlert, Quote } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import imgGlifosato from '@/assets/toxicos/dossie-glifosato.webp';
import imgUltra from '@/assets/toxicos/dossie-ultraprocessados.webp';
import imgAlgoritmo from '@/assets/toxicos/dossie-algoritmo.webp';
import imgBernays from '@/assets/toxicos/dossie-bernays.webp';
import imgAtencao from '@/assets/toxicos/dossie-atencao.webp';
import imgDarkPatterns from '@/assets/toxicos/dossie-darkpatterns.webp';
import imgMicroplasticos from '@/assets/toxicos/dossie-microplasticos.webp';
import imgArInterno from '@/assets/toxicos/dossie-arinterno.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface Evidencia {
  vetor: 'corpo' | 'mente' | 'comportamento' | 'ambiente';
  titulo: string;
  fato: string;
  fonte: string;
  impacto: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
}

const EVIDENCIAS: Evidencia[] = [
  {
    vetor: 'corpo', icon: Beaker,
    image: imgGlifosato, imageAlt: 'Mamadeira de leite ao lado de borrifador químico em laboratório com plantação de milho ao fundo',
    titulo: 'Glifosato no leite materno',
    fato: 'Estudo publicado na Environmental Health (2014) detectou glifosato no leite materno de mulheres americanas em concentrações até 1.600× acima do permitido na água potável europeia. O herbicida mais vendido do mundo atravessa a cadeia alimentar inteira e chega ao primeiro alimento de um recém-nascido.',
    fonte: 'Honeycutt & Rowlands, Environmental Health 2014; IARC Monograph 112 (OMS)',
    impacto: 'Classificado como "provavelmente carcinógeno para humanos" (Grupo 2A) pela Agência Internacional de Pesquisa sobre Câncer da OMS. Brasil é o maior consumidor mundial.',
  },
  {
    vetor: 'corpo', icon: Factory,
    image: imgUltra, imageAlt: 'Pilha de embalagens coloridas de alimentos ultraprocessados sob luz dramática lateral em fundo escuro',
    titulo: 'Ultraprocessados e mortalidade',
    fato: 'Coorte NHANES com 44.551 adultos acompanhados por 19 anos (JAMA Internal Medicine, 2024): cada 10% de aumento no consumo de ultraprocessados eleva em 14% o risco de morte por todas as causas. Brasil tem 20% das calorias vindas de ultraprocessados — e subindo.',
    fonte: 'Wang et al., JAMA Internal Medicine, Feb 2024; IBGE POF 2018',
    impacto: 'Não é opinião nutricional. É risco de mortalidade medido em escala populacional com quase duas décadas de dados.',
  },
  {
    vetor: 'mente', icon: Scale,
    image: imgAlgoritmo, imageAlt: 'Smartphone com feed de redes sociais glitchado em tons de violeta e vermelho',
    titulo: 'A máquina de consenso algorítmico',
    fato: 'Pesquisa do MIT (Science, 2018): notícias falsas se espalham 6× mais rápido que notícias verdadeiras no Twitter. Não por bots — por humanos. O algoritmo amplifica conteúdo com alta carga emocional porque gera mais engajamento. A verdade é estruturalmente menos viral que a mentira.',
    fonte: 'Vosoughi, Roy & Aral, Science 359(6380), 2018',
    impacto: 'O modelo de negócios das plataformas sociais está matematicamente alinhado contra informação precisa. Não é falha — é design.',
  },
  {
    vetor: 'mente', icon: TrendingUp,
    image: imgBernays, imageAlt: 'Prensa tipográfica antiga com pilhas de jornais e cartazes de propaganda em tons sépia',
    titulo: 'Engenharia de consentimento: 100 anos de ciência',
    fato: 'Edward Bernays, sobrinho de Freud, publicou "Propaganda" em 1928 e criou as relações públicas modernas. Ele fez mulheres americanas fumarem usando marchas feministas — cada cigarro era uma "tocha da liberdade". O mesmo framework é usado hoje por governos e corporações para moldar percepções coletivas.',
    fonte: 'Bernays, E. "Propaganda" (1928); Tye, L. "The Father of Spin" (1998)',
    impacto: 'As técnicas de manipulação de massa não são teoria conspiratória. Estão documentadas, ensinadas em MBAs e aplicadas por departamentos de comunicação governamental com orçamentos bilionários.',
  },
  {
    vetor: 'comportamento', icon: ShieldAlert,
    image: imgAtencao, imageAlt: 'Smartphone sobre mesa de madeira ao lado de caderno fechado com sombra em forma de cérebro',
    titulo: 'O experimento de atenção roubada',
    fato: 'Estudo da University of Texas (2017): a mera presença do smartphone sobre a mesa — mesmo desligado — reduz a capacidade cognitiva. Chamaram de "brain drain". Pessoas com o celular em outra sala tiveram desempenho significativamente superior em memória de trabalho e raciocínio fluido.',
    fonte: 'Ward, Duke, Gneezy & Bos, Journal of the Association for Consumer Research, 2017',
    impacto: 'Não é necessário usar o celular para que ele reduza sua capacidade de pensar. A simples proximidade do dispositivo consome recursos cognitivos.',
  },
  {
    vetor: 'comportamento', icon: BookOpen,
    image: imgDarkPatterns, imageAlt: 'Tela de monitor com interface de checkout glitchada e contagem regressiva falsa em ambiente escuro',
    titulo: 'Dark patterns: manipulação de interface certificada',
    fato: 'Pesquisa de Princeton (2019) analisou 11.000 sites de e-commerce e encontrou dark patterns em 11,1% deles: botões que confundem, contagens regressivas falsas, itens adicionados ao carrinho sem consentimento. A FTC (EUA) começou a multar empresas por isso em 2022. No Brasil, zero regulação específica.',
    fonte: 'Mathur et al., Proceedings of ACM CSCW, 2019; FTC Enforcement Actions 2022-2024',
    impacto: 'A interface do app que você usa todo dia foi projetada por equipes de psicólogos comportamentais para maximizar extração — de atenção, dinheiro ou dados.',
  },
  {
    vetor: 'ambiente', icon: Beaker,
    image: imgMicroplasticos, imageAlt: 'Tubo de ensaio com sangue vermelho contendo micropartículas de plástico flutuando',
    titulo: 'Microplásticos no sangue humano',
    fato: 'Estudo publicado na Environment International (2022): microplásticos foram encontrados no sangue de 77% das pessoas testadas. PET, polietileno e poliestireno circulando dentro do corpo humano. Em 2023, foram encontrados em placentas, pulmões e até no cérebro.',
    fonte: 'Leslie et al., Environment International 163, 2022; Jenner et al., Science of the Total Environment, 2022',
    impacto: 'Não é poluição externa. É contaminação interna. Partículas de plástico estão dentro de você agora enquanto lê isto. A ciência ainda não sabe o efeito de longo prazo.',
  },
  {
    vetor: 'ambiente', icon: Factory,
    image: imgArInterno, imageAlt: 'Sala de estar moderna com partículas de poeira visíveis em feixe de luz através da janela',
    titulo: 'O ar da sua casa é mais tóxico que o da rua',
    fato: 'A EPA (Environmental Protection Agency, EUA) estima que o ar interno é 2 a 5× mais poluído que o externo. Em alguns casos, até 100× pior. Fontes: formaldeído de móveis, VOCs de tintas e vernizes, retardantes de chamas de eletrônicos e estofados, partículas de produtos de limpeza.',
    fonte: 'US EPA, "Indoor Air Quality" (updated 2023); WHO Guidelines for Indoor Air Quality, 2010',
    impacto: 'A pessoa média passa 90% do tempo em ambientes fechados. O espaço que você considera seguro — sua casa — pode ser o mais quimicamente contaminado do seu dia.',
  },
];

const VETOR_CONFIG = {
  corpo: { label: 'Corpo', color: 'text-amber-400', border: 'border-amber-500/15', bg: 'bg-amber-500/[0.03]', dot: 'bg-amber-400' },
  mente: { label: 'Mente', color: 'text-violet-400', border: 'border-violet-500/15', bg: 'bg-violet-500/[0.03]', dot: 'bg-violet-400' },
  comportamento: { label: 'Comportamento', color: 'text-cyan-400', border: 'border-cyan-500/15', bg: 'bg-cyan-500/[0.03]', dot: 'bg-cyan-400' },
  ambiente: { label: 'Ambiente', color: 'text-green-400', border: 'border-green-500/15', bg: 'bg-green-500/[0.03]', dot: 'bg-green-400' },
};

export default function DossieRealidade() {
  return (
    <section className="relative z-10 py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: APPLE_EASE }}
          className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileWarning size={14} className="text-red-400" />
            <span className="text-red-400/70 text-[10px] font-bold tracking-[0.5em] uppercase">Evidências verificáveis</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            DOSSIÊ DE <span className="text-red-400">REALIDADE</span>
          </h2>
          <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-4">
            Cada afirmação abaixo vem de estudos publicados em periódicos revisados por pares, 
            órgãos reguladores oficiais ou documentos de acesso público. 
            Nada aqui é opinião. Tudo é rastreável.
          </p>
          <p className="text-stone-600 text-xs max-w-xl mx-auto">
            Leia as fontes. Verifique por conta própria. Se algum dado estiver errado, ele cai sozinho. 
            Se estiver certo, a pergunta que resta é: por que ninguém te contou antes?
          </p>
        </motion.div>

        {/* Provocação central */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.2 }}
          className="my-16 relative">
          <div className="border border-white/[0.06] rounded-2xl bg-gradient-to-br from-stone-900/50 to-stone-950/80 p-8 md:p-12 text-center">
            <Quote size={24} className="text-stone-700 mx-auto mb-6" />
            <p className="text-xl md:text-2xl lg:text-3xl font-black text-stone-200 leading-snug tracking-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "A forma mais eficiente de controle não é a que proíbe.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl font-black text-red-400 leading-snug tracking-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              É a que convence a vítima de que ela está escolhendo livremente."
            </p>
            <p className="text-stone-600 text-xs uppercase tracking-[0.3em]">Princípio de engenharia social</p>
          </div>
        </motion.div>

        {/* Evidence cards */}
        <div className="space-y-5">
          {EVIDENCIAS.map((ev, idx) => {
            const cfg = VETOR_CONFIG[ev.vetor];
            return (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: APPLE_EASE, delay: idx * 0.05 }}
                className={`group rounded-2xl border ${cfg.border} ${cfg.bg} overflow-hidden hover:border-white/20 transition-colors duration-500`}
              >
                {/* Cinematic image */}
                <div className="relative w-full h-48 md:h-64 overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.imageAlt}
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-stone-950/95" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    <span className={`text-[9px] font-bold uppercase tracking-[0.4em] ${cfg.color} bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10`}>
                      {cfg.label}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {/* Icon */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="ml-auto p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                      <ev.icon size={14} className="text-stone-500" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-stone-200 tracking-tight mb-4">{ev.titulo}</h3>

                  {/* Fact */}
                  <p className="text-stone-400 text-sm md:text-[13px] leading-relaxed mb-5">{ev.fato}</p>

                  {/* Impact */}
                  <div className="border-l-2 border-red-500/30 pl-4 mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-400/60 mb-1">Implicação</p>
                    <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-medium">{ev.impacto}</p>
                  </div>

                  {/* Source */}
                  <div className="flex items-start gap-2 pt-4 border-t border-white/[0.04]">
                    <BookOpen size={12} className="text-stone-600 mt-0.5 shrink-0" />
                    <p className="text-stone-600 text-[10px] md:text-[11px] leading-relaxed italic">{ev.fonte}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 text-center space-y-4">
          <p className="text-stone-300 text-base md:text-lg font-bold tracking-tight">
            Estes são apenas 8 exemplos.
          </p>
          <p className="text-stone-500 text-sm leading-relaxed max-w-2xl mx-auto">
            Cada módulo abaixo expande um vetor inteiro com dezenas de evidências, mecanismos detalhados e protocolos de defesa. 
            O dossiê acima existe para uma única finalidade: mostrar que o problema é real, documentado e verificável — 
            antes que você decida se quer investigar a fundo ou não.
          </p>
          <p className="text-red-400/60 text-xs font-semibold uppercase tracking-[0.3em] pt-4">
            A escolha de investigar já é um ato de autonomia
          </p>
        </motion.div>
      </div>
    </section>
  );
}
