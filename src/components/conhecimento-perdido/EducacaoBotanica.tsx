import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Sprout, PenTool, Calendar, BookOpen, Map, Apple, Wind, Layers, GitBranch, FlaskConical, ClipboardList } from 'lucide-react';
import imgFamilia from '@/assets/cp-educacao-familiar.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const metodos = [
  {
    icon: Eye, title: 'Identificação Sensorial',
    desc: 'Ensinar formato da folha, cheiro e textura. Cada planta tem uma assinatura sensorial única — a criança aprende a reconhecer pelo toque, pelo aroma e pela forma antes de precisar de qualquer livro.',
  },
  {
    icon: Heart, title: 'Associação Funcional',
    desc: 'Vincular cada planta à função corporal simples. "Esta é a planta da barriga." "Esta é a planta do sono." Linguagem direta que cria memória permanente.',
  },
  {
    icon: Sprout, title: 'Participação Ativa',
    desc: 'Colher, preparar e observar resultados. A criança que participa do preparo de uma infusão entende o ciclo completo: da terra ao corpo. Isso é educação funcional.',
  },
  {
    icon: PenTool, title: 'Caderno de Campo',
    desc: 'Registro familiar com data, planta utilizada, forma de preparo e resposta do corpo. Cria um documento vivo de conhecimento prático que atravessa gerações.',
  },
];

const exerciciosAvancados = [
  {
    icon: Calendar, title: 'Reconhecimento Semanal',
    desc: 'Exercício semanal: escolher 3 plantas do quintal ou mercado. A família identifica juntas: nome popular, parte utilizada e 1 aplicação conhecida. Em 4 semanas, 12 plantas reconhecidas sem decorar — apenas pela prática repetida.',
    destaque: '12 plantas em 4 semanas',
  },
  {
    icon: BookOpen, title: 'Herbário Seco Familiar',
    desc: 'Coletar 1 amostra por semana: prensar entre folhas de jornal por 7 dias, colar em caderno com nome científico, data, local de coleta e uso tradicional. Herbário funcional cresce organicamente e vira referência familiar permanente.',
    destaque: 'Referência geracional',
  },
  {
    icon: Map, title: 'Mapa Botânico Regional',
    desc: 'Desenhar mapa do bairro/sítio marcando onde crescem plantas úteis. Incluir: terrenos baldios com ervas espontâneas (tanchagem, carqueja), árvores frutíferas, fontes de sementes. Esse mapa é recurso tático em cenário de escassez.',
    destaque: 'Recurso tático local',
  },
  {
    icon: Apple, title: 'Comestível vs Ornamental',
    desc: 'Exercício de diferenciação crítica: apresentar 5 plantas e classificar como comestível, medicinal ou ornamental/tóxica. Ensinar que beleza não indica segurança (lírio é tóxico, comigo-ninguém-pode é tóxica). Treinar o olhar para sobrevivência.',
    destaque: 'Segurança alimentar',
  },
  {
    icon: Wind, title: 'Treino Olfativo',
    desc: 'Vendas nos olhos. Apresentar 5 folhas aromáticas (hortelã, alecrim, capim-limão, manjericão, erva-cidreira). Identificar pelo aroma. Em 3 sessões, a criança reconhece sem hesitar. O olfato é a memória mais antiga do cérebro.',
    destaque: 'Memória olfativa',
  },
  {
    icon: Layers, title: 'Identificação por Sombra da Folha',
    desc: 'Colocar folhas diferentes sobre papel branco sob luz direta e traçar o contorno da sombra. A criança associa forma e proporção sem olhar diretamente para a planta. Depois, tenta nomear apenas pelo contorno. Treina percepção geométrica e cria referência visual abstrata que funciona mesmo sem cor ou textura.',
    destaque: 'Percepção visual avançada',
  },
  {
    icon: GitBranch, title: 'Reconhecimento por Nervura',
    desc: 'Cada folha tem um padrão de nervuras único: paralelas (gramíneas como capim-limão), reticuladas (boldo, camomila), palmadas (mamona). Ensinar a observar esse "mapa interno" da folha usando lupa ou contra-luz é uma habilidade que funciona mesmo sem flor, sem aroma e sem contexto. Nervura não mente.',
    destaque: 'Diagnóstico botânico preciso',
  },
  {
    icon: FlaskConical, title: 'Teste Comparativo entre Plantas Parecidas',
    desc: 'Exercício avançado: apresentar pares de plantas visualmente semelhantes (boldo-do-chile vs boldo-brasileiro, camomila vs falsa-camomila, capim-limão vs citronela). A família deve identificar diferenças por toque, aroma, formato de folha e uso. Este exercício previne erros que podem ser perigosos em cenário real.',
    destaque: 'Prevenção de erros críticos',
  },
  {
    icon: ClipboardList, title: 'Diário de Resposta Corporal',
    desc: 'Registro estruturado: data, sintoma inicial, planta utilizada, dose, horário, resposta em 1h, resposta em 24h, efeitos colaterais. Repetir por 4 semanas. Esse diário vira um banco de dados pessoal que revela padrões individuais — porque cada corpo responde diferente. É a base da automedicação responsável.',
    destaque: 'Autoconhecimento farmacológico',
  },
];

export function EducacaoBotanica() {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Parte 05</span>
        <div className="flex-1 h-px bg-emerald-800/30" />
      </div>
      <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-stone-200 mb-4 leading-tight"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        EDUCAÇÃO BOTÂNICA <span className="text-emerald-400">FAMILIAR</span>
      </h2>
      <p className="text-stone-500 text-sm md:text-base max-w-2xl leading-relaxed mb-8">
        Continuidade geracional. O conhecimento só sobrevive se for ensinado. 
        Não basta documentar — é preciso criar formação prática que uma criança de 8 anos consiga executar.
      </p>

      {/* Hero Image */}
      <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-14">
        <img src={imgFamilia} alt="Educação botânica familiar" className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/30 to-transparent" />
        <div className="absolute bottom-5 left-6">
          <p className="text-emerald-300/80 text-sm font-medium italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            "Quem ensina uma criança a reconhecer uma planta, planta autonomia para sempre."
          </p>
        </div>
      </div>

      {/* Métodos base */}
      <h3 className="text-lg font-bold text-stone-300 mb-5 uppercase tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        Fundamentos Pedagógicos
      </h3>
      <div className="grid md:grid-cols-2 gap-5 mb-16">
        {metodos.map((m, i) => (
          <motion.div key={m.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
            className="bg-emerald-950/30 border border-emerald-800/20 rounded-xl p-7 hover:border-emerald-600/30 transition-all duration-500">
            <div className="p-2.5 bg-emerald-800/20 rounded-xl w-fit mb-4">
              <m.icon className="text-emerald-500" size={20} />
            </div>
            <h4 className="text-base font-bold text-stone-200 mb-3">{m.title}</h4>
            <p className="text-stone-500 text-sm leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Exercícios avançados */}
      <h3 className="text-lg font-bold text-stone-300 mb-2 uppercase tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        Exercícios Práticos de Formação
      </h3>
      <p className="text-stone-500 text-sm mb-8 max-w-2xl">
        Atividades estruturadas que transformam teoria em habilidade. Cada exercício pode ser aplicado semanalmente, 
        com complexidade crescente conforme a idade e maturidade do participante.
      </p>

      <div className="space-y-4">
        {exerciciosAvancados.map((ex, i) => (
          <motion.div
            key={ex.title}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={i}
            className="bg-[#0f1a0f]/60 border border-emerald-800/15 rounded-xl p-6 md:p-8 hover:border-emerald-500/30 transition-all duration-500 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="p-2.5 bg-emerald-800/20 rounded-xl shrink-0">
                <ex.icon className="text-emerald-500" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-base font-bold text-stone-200">{ex.title}</h4>
                  <span className="text-[9px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 hidden sm:inline">
                    {ex.destaque}
                  </span>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed">{ex.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
