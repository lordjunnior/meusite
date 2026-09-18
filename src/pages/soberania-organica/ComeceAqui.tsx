import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplets, Sprout, Sun, Leaf, FlaskConical, UtensilsCrossed, ShieldCheck,
  AlertTriangle, ChevronDown, ArrowRight, Wallet, CalendarCheck, Compass,
  Wheat, Package, Flame,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/organica-comece/hero.jpg';
import aguaImg from '@/assets/organica-comece/agua.jpg';
import hortaImg from '@/assets/organica-comece/horta.jpg';
import conservasImg from '@/assets/organica-comece/conservas.jpg';

/**
 * /soberania-organica/comece-aqui
 * Hub de entrada da trilha de Soberania Orgânica.
 * Paleta: Sand #f4ede4 / Verde profundo #0e3b3a / Cobre-âmbar #b45836.
 * Padrão editorial Apple, alternância clara/escura, hero 92vh.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

interface Fase {
  n: string;
  titulo: string;
  icon: typeof Droplets;
  explicacao: string[];
  semana: string[];
  erros: string[];
  links: { label: string; to: string }[];
}

const FASES: Fase[] = [
  {
    n: '01',
    titulo: 'Diagnóstico do que te envenena',
    icon: AlertTriangle,
    explicacao: [
      'Antes de plantar qualquer coisa, é preciso mapear o que já entra na sua casa todos os dias sem você perceber: água tratada com contaminantes residuais, embalagem plástica em contato com comida quente, ultraprocessado disfarçado de saudável, agrotóxico em fruta que parece limpa. Soberania orgânica não começa na horta, começa no inventário do que está te adoecendo devagar.',
      'Esse diagnóstico é o filtro que orienta todas as fases seguintes. Sem ele, você troca um veneno por outro e chama de progresso. Com ele, cada decisão de compra, plantio e preparo passa a ter critério.',
    ],
    semana: [
      'Liste os 10 itens que mais aparecem na sua geladeira e despensa e verifique rótulo, origem e embalagem de cada um.',
      'Troque recipiente plástico usado para esquentar comida por vidro ou inox.',
      'Descubra a origem da água que você bebe: rede pública, poço, mineral engarrafada, e peça ou pesquise o laudo de qualidade.',
    ],
    erros: [
      'Achar que "natural" no rótulo significa livre de contaminação.',
      'Trocar tudo de uma vez e desistir na terceira semana por excesso de restrição.',
      'Ignorar a água porque parece limpa a olho nu.',
    ],
    links: [
      { label: 'Tóxicos ocultos no dia a dia', to: '/soberania-organica/toxicos-ocultos' },
      { label: 'Toxinas alimentares', to: '/soberania-organica/toxicos-ocultos/toxinas-alimentares' },
      { label: 'Toxinas ambientais', to: '/soberania-organica/toxicos-ocultos/toxinas-ambientais' },
    ],
  },
  {
    n: '02',
    titulo: 'Água como fundação',
    icon: Droplets,
    explicacao: [
      'Água é o primeiro sistema que precisa de autonomia real, porque sem ela nenhuma outra fase se sustenta por mais de três dias. Isso não significa perfurar poço artesiano no fundo do quintal. Significa entender de onde vem sua água, como filtrar de verdade e como armazenar um volume mínimo que aguenta um apagão, uma interrupção de rede ou uma contaminação pontual.',
      'A maioria das famílias urbanas tem zero reserva de água tratada em casa. Um galão de 20 litros já muda o jogo em uma emergência de 48 horas.',
    ],
    semana: [
      'Compre ou monte um sistema de filtragem em camadas (carvão ativado + cerâmica ou osmose reversa, conforme orçamento).',
      'Separe reservatório de emergência com no mínimo 20 litros por pessoa, trocado a cada 6 meses.',
      'Teste um método de purificação sem eletricidade, como fervura ou pastilha, apenas para saber que funciona.',
    ],
    erros: [
      'Confiar cegamente em filtro de jarra sem trocar o refil no prazo.',
      'Guardar água em garrafa PET reutilizada por meses sem rotação.',
      'Achar que gestão de água é assunto só de sítio, não de apartamento.',
    ],
    links: [
      { label: 'Purificação de água', to: '/soberania-organica/purificacao-agua' },
      { label: 'Gestão de água em microespaço', to: '/soberania-organica/gestao-agua-micro' },
      { label: 'Protocolos de apagão', to: '/soberania-organica/protocolos-apagao' },
    ],
  },
  {
    n: '03',
    titulo: 'Comida e horta',
    icon: Sprout,
    explicacao: [
      'A horta não precisa de terreno. Precisa de método. Um vaso de 30 centímetros produz tempero fresco todo mês. Uma parede de garrafas PET vira sistema vertical de folhosas. O que trava a maioria das pessoas não é espaço, é a crença de que produção de comida exige sítio, trator e décadas de experiência.',
      'Solo fértil é o ativo mais barato que existe e o mais ignorado. Compostagem doméstica transforma resto de cozinha em adubo em semanas, fechando o primeiro ciclo de autonomia alimentar real.',
    ],
    semana: [
      'Plante três ervas de ciclo curto (manjericão, cebolinha, hortelã) em vasos na varanda ou peitoril.',
      'Comece uma composteira simples com resto de cozinha, mesmo em apartamento (compostagem em balde ou minhocário).',
      'Avalie o solo disponível: textura, drenagem e histórico de uso antes de plantar em maior escala.',
    ],
    erros: [
      'Comprar mudas caras antes de entender luz e água disponíveis no espaço.',
      'Regar em excesso achando que mais água acelera crescimento.',
      'Pular a etapa de solo e plantar direto em terra compactada.',
    ],
    links: [
      { label: 'Horta urbana', to: '/soberania-organica/horta-urbana' },
      { label: 'Solo e fertilidade', to: '/soberania-organica/solo-fertilidade' },
      { label: 'Produção em pequenos espaços', to: '/soberania-organica/producao-pequenos-espacos' },
      { label: 'Proteína sustentável', to: '/soberania-organica/proteina-sustentavel' },
      { label: 'Sementes crioulas', to: '/soberania-organica/sementes-crioulas' },
      { label: 'Aquaponia residencial', to: '/soberania-organica/aquaponia-residencial' },
    ],
  },
  {
    n: '04',
    titulo: 'Preservação sem eletricidade',
    icon: Package,
    explicacao: [
      'Produzir comida sem saber preservar é desperdiçar metade do esforço. Técnicas de conservação que não dependem de freezer existem há milênios: fermentação, defumação, salga, desidratação ao sol, conserva em vinagre ou óleo. Nenhuma delas exige energia elétrica constante, o que as torna resilientes a qualquer apagão.',
      'Essa fase é onde a horta deixa de ser hobby de fim de semana e vira despensa de verdade, capaz de atravessar meses de entressafra.',
    ],
    semana: [
      'Faça uma conserva fermentada simples (repolho, cenoura ou pepino em salmoura) e observe o processo por 5 a 7 dias.',
      'Desidrate um lote pequeno de ervas ou frutas usando sol ou forno em temperatura baixa.',
      'Organize um espaço fresco e escuro da casa como despensa de armazenamento de longo prazo.',
    ],
    erros: [
      'Usar recipiente de metal reativo em fermentação e conserva ácida.',
      'Armazenar grãos sem embalagem hermética e sem controle de umidade.',
      'Achar que qualquer conserva caseira dura indefinidamente sem inspeção regular.',
    ],
    links: [
      { label: 'Conservas fermentadas', to: '/soberania-organica/conservas-fermentadas' },
      { label: 'Armazenamento de longo prazo', to: '/soberania-organica/armazenamento-longo-prazo' },
      { label: 'Preservação ancestral', to: '/soberania-organica/preservacao-ancestral' },
      { label: 'Conservação de alimentos', to: '/soberania-organica/conservacao' },
    ],
  },
  {
    n: '05',
    titulo: 'Farmácia viva e plantas medicinais',
    icon: Leaf,
    explicacao: [
      'Toda casa que planta comida deveria plantar remédio junto. Espinheira-santa para o refluxo, guaco para a tosse, jurubeba para o fígado, quebra-pedra para o rim. São plantas subutilizadas, baratas, fáceis de cultivar em vaso e documentadas por gerações antes de qualquer farmácia industrial existir.',
      'Fitoterapia aplicada não substitui diagnóstico médico em quadro grave, mas reduz dependência de solução industrial para desconforto do cotidiano, e devolve à família o conhecimento de como cuidar do corpo com o que cresce no quintal.',
    ],
    semana: [
      'Escolha duas plantas medicinais de uso comprovado e plante em vaso próximo à cozinha.',
      'Monte um caderno simples de sabedoria ancestral com receitas de chá, tintura e cataplasma testadas.',
      'Aprenda a identificar corretamente uma planta antes de consumir (evite confundir espécies tóxicas).',
    ],
    erros: [
      'Consumir planta medicinal sem confirmar identificação botânica correta.',
      'Ignorar interação entre fitoterápico e medicação de uso contínuo.',
      'Confundir dose terapêutica com dose de risco em plantas potentes.',
    ],
    links: [
      { label: 'Fitoterapia aplicada', to: '/soberania-organica/fitoterapia-aplicada' },
      { label: 'Plantas subutilizadas', to: '/soberania-organica/plantas-subutilizadas' },
      { label: 'Sabedoria ancestral', to: '/soberania-organica/sabedoria-ancestral' },
      { label: 'Saúde preventiva', to: '/soberania-organica/saude-preventiva' },
      { label: 'Própolis', to: '/soberania-organica/propolis' },
    ],
  },
  {
    n: '06',
    titulo: 'Cozinha funcional',
    icon: UtensilsCrossed,
    explicacao: [
      'Cozinha funcional é o ponto onde comida, planta medicinal e conhecimento ancestral se encontram no prato. Não é dieta restritiva, é usar ingrediente de verdade com intenção: um chá que ajuda na pressão, uma gelatina caseira com propriedade antiparasitária, uma garrafada digestiva que substitui remédio de prateleira para desconforto leve.',
      'Essa fase também é onde você desmonta a engenharia do vício alimentar, entendendo por que certos produtos industrializados são desenhados para criar dependência de consumo.',
    ],
    semana: [
      'Prepare uma receita funcional simples da trilha (chá, garrafada ou suco) usando planta que você já cultiva.',
      'Substitua um snack industrializado da semana por versão caseira equivalente.',
      'Leia sobre engenharia do vício alimentar para identificar gatilhos de consumo compulsivo na sua própria despensa.',
    ],
    erros: [
      'Achar que "funcional" significa complicado ou caro.',
      'Preparar receita medicinal sem respeitar dosagem e frequência recomendadas.',
      'Substituir tudo de uma vez e não sustentar o hábito além de uma semana.',
    ],
    links: [
      { label: 'Cozinha funcional', to: '/soberania-organica/cozinha-funcional' },
      { label: 'Garrafada digestiva ancestral', to: '/soberania-organica/cozinha-funcional/garrafada-digestiva-ancestral' },
      { label: 'Chá para pressão (hibisco)', to: '/soberania-organica/cozinha-funcional/cha-pressao-hibisco' },
      { label: 'Gelatina antiparasitária', to: '/soberania-organica/cozinha-funcional/gelatina-antiparasitaria' },
      { label: 'Engenharia do vício alimentar', to: '/soberania-organica/engenharia-vicio-alimentar' },
    ],
  },
  {
    n: '07',
    titulo: 'Autonomia total',
    icon: Sun,
    explicacao: [
      'A última fase junta tudo em um sistema coeso: energia própria para manter freezer, filtro e iluminação funcionando sem depender só da rede; abrigo preparado para emergência; comunicação que funciona mesmo com internet fora do ar; e biologia entendida a fundo o suficiente para tomar decisões de saúde com autonomia real.',
      'Autonomia total não é isolamento nem sobrevivencialismo de bunker. É a soma de pequenas independências construídas fase a fase, que juntas tiram sua família da dependência total de sistemas frágeis.',
    ],
    semana: [
      'Avalie sua matriz energética doméstica e simule 24 horas sem rede elétrica: o que continuaria funcionando?',
      'Monte um kit básico de 72 horas com água, comida não perecível, luz e primeiros socorros.',
      'Teste um canal de comunicação alternativo (rádio, app offline, rede mesh) com pessoas da sua confiança.',
    ],
    erros: [
      'Investir em painel solar caro antes de resolver água e comida.',
      'Montar kit de emergência e nunca revisar validade dos itens.',
      'Tratar autonomia total como projeto de um mês em vez de trajetória contínua.',
    ],
    links: [
      { label: 'Autonomia energética', to: '/soberania-organica/autonomia-energetica' },
      { label: 'Kit 72 horas', to: '/soberania-organica/kit-72h' },
      { label: 'Abrigo de emergência', to: '/soberania-organica/abrigo-emergencia' },
      { label: 'Comunicação offline', to: '/soberania-organica/comunicacao-offline' },
      { label: 'Autonomia biológica', to: '/soberania-organica/autonomia-biologica' },
      { label: 'Refúgio rural', to: '/soberania-organica/refugio-rural' },
    ],
  },
];

const CUSTOS = [
  { item: 'Vasos, terra e sementes crioulas para começar (fase 3)', valor: 'R$ 60 a R$ 180' },
  { item: 'Filtro de água em camadas (carvão + cerâmica)', valor: 'R$ 120 a R$ 450' },
  { item: 'Reservatório de água de emergência (20 a 50 litros)', valor: 'R$ 40 a R$ 150' },
  { item: 'Potes de vidro para conserva e fermentação', valor: 'R$ 30 a R$ 100' },
  { item: 'Mudas de plantas medicinais (2 a 4 espécies)', valor: 'R$ 20 a R$ 80' },
  { item: 'Kit 72 horas básico (água, luz, primeiros socorros)', valor: 'R$ 150 a R$ 400' },
  { item: 'Investimento total para iniciar as 3 primeiras fases', valor: 'R$ 250 a R$ 800' },
];

const MINIMO_30_DIAS = [
  {
    semana: 'Semana 1',
    foco: 'Diagnóstico e água',
    acoes: [
      'Fazer o inventário do que entra na sua casa (fase 1).',
      'Resolver filtragem básica de água para beber.',
      'Separar reservatório mínimo de emergência.',
    ],
  },
  {
    semana: 'Semana 2',
    foco: 'Primeiro plantio',
    acoes: [
      'Plantar três ervas de ciclo curto em vaso.',
      'Começar composteira doméstica simples.',
      'Escolher duas plantas medicinais para cultivar.',
    ],
  },
  {
    semana: 'Semana 3',
    foco: 'Preservação e cozinha',
    acoes: [
      'Fazer a primeira conserva fermentada.',
      'Testar uma receita funcional da trilha.',
      'Organizar despensa fresca e escura.',
    ],
  },
  {
    semana: 'Semana 4',
    foco: 'Consolidação',
    acoes: [
      'Revisar o que funcionou e o que travou nas três semanas.',
      'Montar o kit básico de 72 horas.',
      'Escolher a próxima fase para aprofundar no mês seguinte.',
    ],
  },
];

const FAQ = [
  {
    q: 'Preciso ter sítio ou quintal grande para começar a trilha de soberania orgânica?',
    a: 'Não. A maior parte da fase de horta e produção de alimentos foi desenhada para varanda, peitoril de janela e apartamento pequeno. Vasos, sistemas verticais e compostagem em balde produzem resultado real sem exigir terreno. Terreno maior acelera escala, mas não é pré-requisito para começar.',
  },
  {
    q: 'Por onde devo começar se não sei nada sobre horta, água ou plantas medicinais?',
    a: 'Comece pela fase 1, diagnóstico do que te envenena, e pela fase 2, água. Essas duas fases exigem pouco investimento, geram clareza imediata sobre prioridades e criam a base para que as fases seguintes (horta, preservação, farmácia viva) façam sentido prático na sua rotina.',
  },
  {
    q: 'Quanto tempo leva para ver resultado real da trilha?',
    a: 'Resultados pequenos aparecem em semanas: tempero fresco em 20 a 30 dias, primeira conserva fermentada pronta em uma semana, água filtrada desde o primeiro dia. Resultados estruturais, como despensa autossuficiente por meses ou sistema de energia própria, levam de 6 meses a 2 anos de construção contínua.',
  },
  {
    q: 'É seguro usar plantas medicinais sem acompanhamento médico?',
    a: 'Uso de fitoterápico para desconforto leve e prevenção é seguro quando há identificação botânica correta, dose adequada e atenção a interação com medicação contínua. Para qualquer quadro grave, persistente ou em uso de medicação controlada, acompanhamento médico continua sendo indispensável. A trilha existe para reduzir dependência do trivial, não para substituir emergência.',
  },
  {
    q: 'Qual a diferença entre essa trilha e conteúdo genérico de sustentabilidade na internet?',
    a: 'A trilha conecta diagnóstico, água, comida, preservação, farmácia viva, cozinha e autonomia energética como um sistema único e progressivo, com páginas técnicas reais para cada etapa, erros comuns documentados e roteiro semanal aplicável. Conteúdo genérico costuma tratar cada tema isolado, sem sequência lógica nem critério de prioridade.',
  },
  {
    q: 'Preciso seguir as 7 fases na ordem exata?',
    a: 'A ordem sugerida (diagnóstico, água, comida, preservação, farmácia viva, cozinha, autonomia total) segue uma lógica de dependência: cada fase sustenta a seguinte. É possível adaptar ao seu contexto, mas pular direto para autonomia energética sem resolver água e comida costuma gerar investimento desperdiçado.',
  },
  {
    q: 'Isso funciona para quem mora em apartamento e cidade grande?',
    a: 'Sim. As fases de água, horta em pequenos espaços, preservação em despensa e cozinha funcional foram pensadas justamente para o contexto urbano. Autonomia total em ambiente rural amplia o alcance, mas não é condição para começar a trilha em apartamento de qualquer metragem.',
  },
  {
    q: 'Quanto custa realmente começar do zero?',
    a: 'Com foco nas três primeiras fases (diagnóstico, água e primeiro plantio), o investimento inicial fica entre R$ 250 e R$ 800, incluindo filtro de água, reservatório de emergência, vasos, sementes e mudas de plantas medicinais. É possível reduzir ainda mais reaproveitando recipientes e trocando sementes com vizinhos.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Mãos cultivando terra fértil ao amanhecer, símbolo do início da trilha de soberania orgânica"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.35) 40%, rgba(14,59,58,0.9) 100%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(244,237,228,0.15)',
              color: '#f4ede4',
              border: '1px solid rgba(244,237,228,0.3)',
            }}
          >
            <Compass size={11} className="inline mr-2" /> Soberania Orgânica · Comece aqui
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Como começar horta e autonomia alimentar em casa.{' '}
          <span
            style={{
              color: '#ffb37a',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(255,179,122,0.45), 0 0 80px rgba(255,179,122,0.25)',
            }}
          >
            Um roteiro, não uma promessa.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Sete fases progressivas para sair da dependência total de supermercado, farmácia e rede elétrica: diagnóstico, água, comida, preservação, farmácia viva, cozinha funcional e autonomia total. Comece pela primeira semana, não pela fase sete.
        </motion.p>
      </motion.div>
    </section>
  );
}

function FaseCard({ fase, index }: { fase: Fase; index: number }) {
  const Icon = fase.icon;
  const escura = index % 2 === 1;
  return (
    <section
      className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32"
      style={{ backgroundColor: escura ? '#0e3b3a' : '#f4ede4' }}
    >
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
        <motion.aside {...fade(0)} className="lg:col-span-4">
          <div className="sticky top-24">
            <span
              className="text-xs font-bold tracking-[0.4em] uppercase block mb-4"
              style={{ color: '#b45836' }}
            >
              Fase {fase.n}
            </span>
            <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
              style={{
                backgroundColor: escura ? 'rgba(180,88,54,0.18)' : 'rgba(180,88,54,0.1)',
                border: '1px solid rgba(180,88,54,0.35)',
              }}
            >
              <Icon size={24} color="#b45836" />
            </div>
            <p
              className="text-sm uppercase tracking-[0.2em] font-semibold"
              style={{ color: escura ? 'rgba(244,237,228,0.6)' : '#5a6664' }}
            >
              {fase.titulo}
            </p>
          </div>
        </motion.aside>

        <motion.div {...fade(0.1)} className="lg:col-span-8">
          <h2
            className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05] tracking-tight mb-10"
            style={{ color: escura ? '#f4ede4' : '#0e3b3a' }}
          >
            {fase.titulo}
          </h2>

          <div
            className="space-y-6 text-lg md:text-xl leading-[1.7] font-light mb-12"
            style={{ color: escura ? 'rgba(244,237,228,0.85)' : '#2d3a37' }}
          >
            {fase.explicacao.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3
                className="flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase mb-4"
                style={{ color: '#b45836' }}
              >
                <CalendarCheck size={16} /> O que fazer nesta semana
              </h3>
              <ul className="space-y-3">
                {fase.semana.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-base leading-relaxed font-light"
                    style={{ color: escura ? 'rgba(244,237,228,0.82)' : '#2d3a37' }}
                  >
                    <span style={{ color: '#b45836' }}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3
                className="flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase mb-4"
                style={{ color: '#b45836' }}
              >
                <AlertTriangle size={16} /> Erros comuns
              </h3>
              <ul className="space-y-3">
                {fase.erros.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-base leading-relaxed font-light"
                    style={{ color: escura ? 'rgba(244,237,228,0.7)' : '#5a6664' }}
                  >
                    <span style={{ color: '#b45836' }}>×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3
              className="text-sm font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: escura ? 'rgba(244,237,228,0.6)' : '#5a6664' }}
            >
              Páginas desta fase
            </h3>
            <div className="flex flex-wrap gap-3">
              {fase.links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all hover:gap-3"
                  style={{
                    backgroundColor: escura ? 'rgba(244,237,228,0.08)' : '#ffffff',
                    color: escura ? '#f4ede4' : '#0e3b3a',
                    border: `1px solid ${escura ? 'rgba(244,237,228,0.25)' : 'rgba(14,59,58,0.15)'}`,
                  }}
                >
                  {l.label} <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ComeceAqui() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-organica/comece-aqui"
        custom={{
          title: 'Comece Aqui: Como Começar Horta e Autonomia Alimentar em Casa',
          description:
            'Roteiro progressivo em 7 fases para sair da dependência de supermercado, farmácia e rede elétrica. Diagnóstico, água, horta, preservação, farmácia viva, cozinha funcional e autonomia total.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/comece-aqui',
          primaryKeyword: 'como começar horta e autonomia alimentar em casa',
          lsiKeywords: [
            'autonomia alimentar em casa',
            'horta para iniciantes',
            'soberania orgânica passo a passo',
            'como plantar horta em apartamento',
            'autonomia hídrica doméstica',
            'farmácia viva plantas medicinais',
            'preservação de alimentos sem geladeira',
          ],
          longTailKeywords: [
            'como começar horta e autonomia alimentar em casa do zero',
            'roteiro de 30 dias para autonomia alimentar',
            'quanto custa começar uma horta em casa',
            'passo a passo soberania orgânica para iniciantes',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Comece aqui', url: '/soberania-organica/comece-aqui' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: [
            '/soberania-organica',
            '/soberania-organica/horta-urbana',
            '/soberania-organica/purificacao-agua',
            '/soberania-organica/conservas-fermentadas',
            '/soberania-organica/fitoterapia-aplicada',
            '/soberania-organica/cozinha-funcional',
            '/soberania-organica/autonomia-energetica',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div
        className="relative min-h-screen"
        style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}
      >
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — Por que um roteiro e não uma lista de tarefas */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Antes de começar
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Por que fase, não lista
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2
                className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10"
                style={{ color: '#0e3b3a' }}
              >
                Não é uma lista de tarefas.{' '}
                <span
                  style={{
                    color: '#b45836',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  É uma sequência que sustenta a próxima.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  A maioria das pessoas que tenta soberania orgânica começa pela parte mais visível e vistosa: a horta bonita, o painel solar, a despensa cheia de conserva artesanal. O problema é que nenhuma dessas coisas se sustenta sem os alicerces invisíveis por trás: diagnóstico do que já está entrando em casa, água segura para regar e beber, solo que não vai matar a planta em três semanas.
                </p>
                <p>
                  Este hub organiza a trilha em sete fases que se apoiam umas nas outras. Você pode entrar em qualquer ponto, mas quem pula direto para autonomia energética sem resolver água e comida costuma abandonar o projeto no primeiro imprevisto, porque construiu o telhado antes da fundação.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{
                    borderLeft: '3px solid #b45836',
                    color: '#0e3b3a',
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                  }}
                >
                  Autonomia não se compra em uma tarde. Se constrói em camadas, na ordem certa.
                </blockquote>
                <p>
                  As fotografias que acompanham este roteiro mostram o que a trilha realmente é: mão na terra, água em recipiente simples, comida guardada sem depender de energia constante. Nada de promessa de bunker perfeito em 24 horas. O que funciona é o que se repete toda semana.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Imagem editorial 1 — água */}
        <section className="relative w-full" style={{ height: '60vh', minHeight: 420 }}>
          <img
            src={aguaImg}
            alt="Água corrente clara sobre pedras, representando a fase de purificação e reserva hídrica"
            width={1400}
            height={933}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(14,59,58,0.55) 0%, transparent 60%)' }} />
        </section>

        {/* As 7 fases */}
        {FASES.map((fase, i) => (
          <FaseCard key={fase.n} fase={fase} index={i} />
        ))}

        {/* Imagem editorial 2 — horta */}
        <section className="relative w-full" style={{ height: '60vh', minHeight: 420 }}>
          <img
            src={hortaImg}
            alt="Canteiro de horta orgânica com hortaliças em fileiras, luz natural de fim de tarde"
            width={1400}
            height={985}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(14,59,58,0.55) 0%, transparent 60%)' }} />
        </section>

        {/* Quanto custa começar */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Investimento real
              </span>
              <h2
                className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-6"
                style={{ color: '#f4ede4' }}
              >
                Quanto custa{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  começar de verdade.
                </span>
              </h2>
              <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.8)' }}>
                Nenhuma das três primeiras fases exige investimento alto. O valor sobe conforme você amplia escala, mas o ponto de entrada é acessível para a maioria dos orçamentos domésticos.
              </p>
            </motion.div>

            <motion.div {...fade(0.1)} className="overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(244,237,228,0.15)' }}>
              {CUSTOS.map((c, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-6 md:px-10 py-6"
                  style={{
                    backgroundColor: i % 2 === 0 ? 'rgba(244,237,228,0.04)' : 'transparent',
                    borderBottom: i < CUSTOS.length - 1 ? '1px solid rgba(244,237,228,0.1)' : 'none',
                    fontWeight: i === CUSTOS.length - 1 ? 700 : 400,
                  }}
                >
                  <span className="text-base md:text-lg" style={{ color: '#f4ede4' }}>{c.item}</span>
                  <span className="text-base md:text-lg font-bold" style={{ color: '#ffb37a' }}>{c.valor}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mínimo viável em 30 dias */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Roteiro de execução
              </span>
              <h2
                className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-6"
                style={{ color: '#0e3b3a' }}
              >
                O mínimo viável{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  em 30 dias.
                </span>
              </h2>
              <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                Se você só tem um mês para provar a si mesmo que a trilha funciona, siga este roteiro semana a semana. Não é o caminho completo, é o suficiente para sair da teoria.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MINIMO_30_DIAS.map((s, i) => (
                <motion.div
                  key={s.semana}
                  {...fade(i * 0.08)}
                  className="p-8 rounded-2xl"
                  style={{ backgroundColor: '#ffffff', border: '1px solid rgba(14,59,58,0.1)' }}
                >
                  <span className="text-xs font-bold tracking-[0.3em] uppercase block mb-2" style={{ color: '#b45836' }}>
                    {s.semana}
                  </span>
                  <h3 className="text-xl font-black mb-4" style={{ color: '#0e3b3a' }}>
                    {s.foco}
                  </h3>
                  <ul className="space-y-2">
                    {s.acoes.map((a, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                        <span style={{ color: '#b45836' }}>›</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Imagem editorial 3 — conservas */}
        <section className="relative w-full" style={{ height: '60vh', minHeight: 420 }}>
          <img
            src={conservasImg}
            alt="Potes de conserva e fermentado alinhados em prateleira de despensa, luz natural lateral"
            width={1400}
            height={2114}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(14,59,58,0.6) 0%, transparent 60%)' }} />
        </section>

        {/* Mapa completo da trilha */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Visão geral
              </span>
              <h2
                className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-6"
                style={{ color: '#f4ede4' }}
              >
                O mapa completo{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  da trilha orgânica.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: 'Hub principal', to: '/soberania-organica', icon: Compass },
                { label: 'Primeiros socorros', to: '/soberania-organica/primeiros-socorros', icon: ShieldCheck },
                { label: 'Avaliação de sinais', to: '/soberania-organica/avaliacao-sinais', icon: FlaskConical },
                { label: 'Controle de vetores', to: '/soberania-organica/controle-vetores', icon: Leaf },
                { label: 'Babosa e acemannan', to: '/soberania-organica/babosa-acemannan', icon: Sprout },
                { label: 'Óleo de rícino biohacker', to: '/soberania-organica/oleo-ricino-biohacker', icon: FlaskConical },
                { label: 'Conhecimento perdido', to: '/soberania-organica/conhecimento-perdido', icon: Wheat },
                { label: 'Abrigo de emergência', to: '/soberania-organica/abrigo-emergencia', icon: ShieldCheck },
                { label: 'Navegação primária', to: '/soberania-organica/navegacao-primaria', icon: Compass },
                { label: 'EDC essencial', to: '/soberania-organica/edc', icon: Package },
                { label: 'Protocolo de fogo', to: '/soberania-organica/protocolo-fogo', icon: Flame },
                { label: 'Higiene mental', to: '/soberania-organica/higiene-mental', icon: ShieldCheck },
              ].map((l) => {
                const LIcon = l.icon;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="flex items-center gap-3 p-5 rounded-xl transition-all hover:translate-x-1"
                    style={{
                      backgroundColor: 'rgba(244,237,228,0.05)',
                      border: '1px solid rgba(244,237,228,0.15)',
                      color: '#f4ede4',
                    }}
                  >
                    <LIcon size={18} color="#ffb37a" />
                    <span className="text-sm font-semibold">{l.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Perguntas frequentes
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <h2 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: '#0e3b3a' }}>
                  Dúvidas antes de começar.
                </h2>
              </div>
            </motion.aside>
            <div className="lg:col-span-8 space-y-4">
              {FAQ.map((f, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.05)}
                  className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: '#ffffff', border: '1px solid rgba(14,59,58,0.1)' }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left"
                  >
                    <span className="text-lg md:text-xl font-bold" style={{ color: '#0e3b3a' }}>
                      {f.q}
                    </span>
                    <ChevronDown
                      size={22}
                      color="#b45836"
                      style={{
                        transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="px-7 pb-7"
                    >
                      <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="max-w-[1600px] mx-auto text-center">
            <motion.div {...fade(0)}>
              <Wallet size={36} color="#ffb37a" className="mx-auto mb-6" />
              <h2
                className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-8 max-w-4xl mx-auto"
                style={{ color: '#f4ede4' }}
              >
                A trilha inteira começa com{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  um vaso e um filtro de água.
                </span>
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light" style={{ color: 'rgba(244,237,228,0.8)' }}>
                Escolha a fase 1 agora e volte a este hub sempre que precisar de direção. Autonomia real é construída em semanas, não em um único fim de semana de entusiasmo.
              </p>
              <Link
                to="/soberania-organica"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold transition-all hover:gap-4"
                style={{ backgroundColor: '#b45836', color: '#f4ede4' }}
              >
                Voltar ao hub Soberania Orgânica <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
