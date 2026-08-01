import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, AlertTriangle, ShieldCheck, Fish } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/alimentar/aquaponia-hero.jpg';
import imgTilapia from '@/assets/alimentar/aquaponia-tilapia.jpg';
import imgLeca from '@/assets/alimentar/aquaponia-leca.jpg';
import imgBomba from '@/assets/alimentar/aquaponia-bomba.jpg';
import imgTeste from '@/assets/alimentar/aquaponia-teste.jpg';
import imgColheita from '@/assets/alimentar/aquaponia-colheita.jpg';
import imgAlimentacao from '@/assets/alimentar/aquaponia-alimentacao.jpg';
import imgSistema from '@/assets/alimentar/aquaponia-sistema.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const C = {
  page: 'hsl(36 30% 92%)',
  pageDeep: 'hsl(34 26% 87%)',
  ink: 'hsl(28 32% 14%)',
  body: 'hsl(28 18% 26%)',
  muted: 'hsl(28 10% 44%)',
  water: 'hsl(198 52% 38%)',
  waterSoft: 'hsl(198 50% 82%)',
  earth: 'hsl(22 52% 38%)',
  earthSoft: 'hsl(28 60% 82%)',
  forest: 'hsl(160 28% 18%)',
  forestDeep: 'hsl(160 32% 12%)',
  line: 'hsl(30 14% 72%)',
};

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.10  0 0 0 0 0.05  0 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const sectionBg = {
  earth: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 65% 55% at 6% 14%, hsl(198 50% 82% / 0.7), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 92% 86%, hsl(22 52% 38% / 0.25), transparent 55%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(36 30% 93%), hsl(34 26% 86%))',
    ].join(','),
    backgroundSize: 'auto, auto, 200px 200px, auto',
  },
  water: {
    backgroundColor: C.pageDeep,
    backgroundImage: [
      'radial-gradient(ellipse 70% 55% at 14% 22%, hsl(198 50% 82% / 0.85), transparent 50%)',
      'radial-gradient(ellipse 60% 50% at 88% 78%, hsl(198 52% 38% / 0.20), transparent 55%)',
      'repeating-linear-gradient(115deg, transparent 0, transparent 96px, hsl(198 52% 38% / 0.08) 97px, transparent 98px)',
      noiseSvg,
      'linear-gradient(180deg, hsl(34 28% 89%), hsl(32 24% 84%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 200px 200px, auto',
  },
  forest: {
    backgroundColor: C.forestDeep,
    backgroundImage: [
      'radial-gradient(ellipse 60% 50% at 12% 18%, hsl(198 52% 38% / 0.30), transparent 50%)',
      'radial-gradient(ellipse 55% 45% at 88% 82%, hsl(22 52% 38% / 0.20), transparent 55%)',
      'radial-gradient(circle at 50% 50%, hsl(160 28% 22% / 0.6), transparent 70%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(160 28% 16%), hsl(160 32% 11%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 220px 220px, auto',
  },
  fieldWash: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 65% 50% at 50% 0%, hsl(198 52% 38% / 0.22), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 10% 90%, hsl(22 52% 38% / 0.22), transparent 55%)',
      'radial-gradient(ellipse 50% 40% at 90% 60%, hsl(198 50% 82% / 0.6), transparent 55%)',
      noiseSvg,
      'linear-gradient(180deg, hsl(36 30% 92%), hsl(34 26% 87%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 200px 200px, auto',
  },
};

interface Pilar {
  num: string;
  titulo: string;
  subtitulo: string;
  imagem: string;
  paragrafos: string[];
  praticas: string[];
  tempo: string;
}

const pilares: Pilar[] = [
  {
    num: '01',
    titulo: 'O que é aquaponia, em uma frase',
    subtitulo: 'Peixe alimenta planta. Planta limpa a água do peixe. O ciclo se fecha.',
    imagem: imgSistema,
    paragrafos: [
      'Aquaponia é a junção de duas coisas antigas: criar peixe (aquicultura) e cultivar planta sem terra (hidroponia). Você coloca peixes em um tanque. Eles comem ração e produzem cocô. Esse cocô vira amônia na água, que para o peixe é veneno.',
      'Aí entram bactérias invisíveis que vivem nas pedras do canteiro. Elas comem a amônia e transformam em nitrato, que para a planta é o melhor adubo do mundo. As raízes absorvem o nitrato, devolvem a água limpa para o tanque. Ninguém compra adubo, ninguém troca a água. O sistema se sustenta sozinho.',
      'Para você entender o tamanho da coisa: 1.000 litros de tanque com tilápia alimentam um canteiro de 2 metros quadrados. Isso dá uma família de quatro pessoas em saladas semanais o ano inteiro, mais 30 a 50 quilos de peixe a cada 8 meses. Tudo no quintal, sem precisar de terra fértil, sem agrotóxico.',
    ],
    praticas: [
      'Visualize: tanque embaixo, canteiro em cima, cano levando água do tanque pro canteiro, cano devolvendo a água limpa pro tanque.',
      'Comece pequeno: um tanque de 200L com 5 a 10 peixinhos e meio metro quadrado de canteiro já te ensina tudo.',
      'Não precisa entender nada de química no começo. Só precisa entender a regra: peixe = adubo, planta = filtro.',
    ],
    tempo: '5 min para entender',
  },
  {
    num: '02',
    titulo: 'Os componentes que você vai precisar comprar',
    subtitulo: 'Lista de mercado, sem mistério, sem nome difícil',
    imagem: imgBomba,
    paragrafos: [
      'Você precisa de: um recipiente que segura água (tanque para o peixe), uma caixa rasa em cima dele (canteiro para as plantas), uma bomba submersa de aquário, mangueira ou cano de PVC fino, e pedras para encher o canteiro.',
      'O tanque mais barato e bom é a bombona azul de 200 litros do mercado livre, custa entre 80 e 150 reais. O canteiro pode ser uma caixa plástica grande de tampa, cortada na metade, que você compra pronta. A bomba é a mesma de fonte de jardim ou aquário, de 800 a 1500 litros por hora, custa de 70 a 200 reais. As pedras certas se chamam argila expandida (também conhecida como leca), você acha em loja de jardinagem.',
      'O orçamento honesto para começar bem é entre 400 e 800 reais para um sistema de 200 a 500 litros. Se quiser ir direto para 1.000 litros (capacidade familiar real), suba para 1.000 a 1.500 reais. É menos do que muito gente gasta em uma TV, e produz comida pelo resto da vida.',
    ],
    praticas: [
      'Lista exata: 1 bombona azul, 1 caixa plástica rasa, 1 bomba submersa, 3m de cano PVC 25mm, 1 saco de argila expandida, 1 timer de tomada.',
      'Onde comprar: bombona em ferro velho ou marketplace, bomba em loja de aquário, argila em loja de jardinagem ou hidroponia.',
      'O timer de tomada (15 reais) é o que liga e desliga a bomba sozinho a cada 15 minutos. Sem ele, você precisaria fazer isso na mão.',
    ],
    tempo: '1 tarde de compras',
  },
  {
    num: '03',
    titulo: 'Montagem do primeiro sistema, passo a passo',
    subtitulo: 'Em uma manhã de fim de semana você levanta o esqueleto inteiro',
    imagem: imgLeca,
    paragrafos: [
      'Primeiro: posicione a bombona em local que pegue sol direto pelo menos 4 horas por dia, mas não o dia todo (sol forte demais aquece a água). Quintal, varanda grande, terraço servem. Encha a bombona com água da torneira e deixe descansar 48 horas para o cloro evaporar (cloro mata peixe).',
      'Segundo: posicione o canteiro 30 a 50 cm acima do nível da bombona. Pode ser sobre uma estrutura de madeira simples, sobre uma bancada, ou suspenso. O importante é que o canteiro fique mais alto, para a água escoar de volta por gravidade. Lave a argila expandida em peneira até a água sair limpa, depois encha o canteiro até 5 cm da borda.',
      'Terceiro: instale a bomba dentro da bombona, ligada ao cano que sobe até o canteiro. O cano de retorno (saída do canteiro) é mais grosso e faz a água voltar pelo próprio peso. Ligue a bomba na tomada com timer programado para 15 minutos ligada, 15 desligada. Pronto, o sistema circula sozinho.',
    ],
    praticas: [
      'Teste o circuito antes de colocar peixe: deixe rodando 3 dias só com água, observe vazamentos, ajuste níveis.',
      'A altura entre canteiro e bombona não pode ser zero. Mínimo 20 cm para a água escoar bem por gravidade.',
      'Se a água do canteiro não desce, o problema é o cano de saída entupido com argila. Use uma tela fina como filtro.',
    ],
    tempo: '1 sábado completo',
  },
  {
    num: '04',
    titulo: 'Ciclagem da água antes do peixe entrar',
    subtitulo: 'O passo que ninguém explica e que mata 90% dos primeiros peixes',
    imagem: imgTeste,
    paragrafos: [
      'O sistema novo está com água, mas a água ainda não tem as bactérias boas que transformam amônia em nitrato. Se você jogar peixe agora, em uma semana a amônia acumulada mata todos. A solução se chama ciclagem: criar a colônia de bactérias antes do peixe chegar.',
      'O método mais simples para iniciante é o ciclagem com amônia pura. Compre amoníaco doméstico (sem perfume, sem aditivo) na farmácia. Adicione algumas gotas no tanque por dia, durante 3 a 4 semanas, mantendo o sistema circulando 24 horas. Compre um kit de teste de água de aquário (custa 50 a 80 reais, mede pH, amônia, nitrito, nitrato).',
      'Você vai ver os números: primeiro a amônia sobe, depois o nitrito sobe (e amônia cai), depois o nitrato sobe (e nitrito cai). Quando amônia e nitrito ficarem em zero e nitrato aparecer, está pronto. As bactérias se estabeleceram. Aí sim, no próximo final de semana, você compra os peixes e introduz devagar.',
    ],
    praticas: [
      'Compre o kit de teste no primeiro dia, ele é seu instrumento principal por toda a vida do sistema.',
      'pH ideal para tilápia e maioria das hortaliças: entre 6,5 e 7,5. Se subir ou descer disso, plantas e peixes sofrem.',
      'Atalho: peça meio litro de água de um amigo que já tem sistema rodando. As bactérias vão junto e a ciclagem cai pela metade do tempo.',
    ],
    tempo: '3 a 4 semanas de espera',
  },
  {
    num: '05',
    titulo: 'Escolha e introdução dos peixes',
    subtitulo: 'Tilápia, jundiá, carpa, kinguio: o que faz sentido para casa',
    imagem: imgTilapia,
    paragrafos: [
      'Para iniciante absoluto, a tilápia é a melhor opção: cresce rápido (de filhote a 500g em 6 a 8 meses), aguenta variação de temperatura (entre 18 e 30 graus), come ração comercial fácil de achar, e é deliciosa na grelha. O jundiá é uma boa segunda escolha em regiões mais frias.',
      'Para quem mora em apartamento ou só quer testar o sistema sem comer o peixe, use carpa ornamental ou kinguio (peixinho dourado). Eles fazem o mesmo trabalho biológico, vivem anos, são bonitos de olhar, e funcionam exatamente igual para alimentar as plantas. É a versão zero culpa para começar.',
      'A regra de densidade é uma só: 1 peixe por 20 litros de água. Em 200 litros, 10 peixinhos. Em 1.000 litros, 50 peixes. Compre filhotes de 5 a 10 cm em piscicultura (não em pet shop, é mais barato e mais saudável). Coloque o saco fechado boiando dentro do tanque por 30 minutos para a temperatura igualar, depois solte devagar.',
    ],
    praticas: [
      'Onde comprar: pesquise "piscicultura + sua cidade", quase toda região tem fornecedor de alevinos de tilápia.',
      'Custo dos peixes: alevinos de 5cm custam de 1 a 3 reais cada, 10 unidades saem por menos de 30 reais.',
      'Nas primeiras 2 semanas alimente pouco, observe muito. Se algum peixe morrer, retire imediatamente para não contaminar a água.',
    ],
    tempo: '1 hora de transporte e introdução',
  },
  {
    num: '06',
    titulo: 'Plantio e o que cresce melhor',
    subtitulo: 'Folha cresce em uma semana, fruto em três meses, raiz não cresce',
    imagem: imgColheita,
    paragrafos: [
      'Plantas de folha (alface, rúcula, espinafre, manjericão, hortelã, salsinha, cebolinha, agrião) são as campeãs absolutas da aquaponia. Crescem em 30 a 45 dias, ocupam pouco espaço, e você colhe folha por folha sem matar a planta. Esse é o seu pão diário.',
      'Plantas de fruto (tomate cereja, pimentão, pepino, morango) também funcionam muito bem mas demoram mais (2 a 4 meses até a primeira colheita) e precisam de mais nitrogênio, ou seja, mais peixes alimentados regularmente. Comece com folhas, evolua para frutos depois de 3 meses de sistema rodando estável.',
      'O que NÃO funciona em aquaponia: cenoura, beterraba, batata, mandioca, e qualquer raiz tuberosa. As raízes precisam de terra para engrossar, e na argila expandida elas só viram cabelo fino. Para tubérculos, mantenha um canteiro de terra em paralelo.',
    ],
    praticas: [
      'Comece com 6 mudas de alface e 3 pés de manjericão, custo total no viveiro: menos de 20 reais.',
      'Plante a muda direto na argila, abrindo um buraquinho, posicionando a raiz no fundo, e cobrindo com a argila ao redor.',
      'Em 7 a 10 dias as raízes brancas aparecem por baixo do canteiro, sinal de que a planta pegou e está absorvendo nutriente.',
    ],
    tempo: '20 min para plantar',
  },
  {
    num: '07',
    titulo: 'Rotina diária de 5 minutos',
    subtitulo: 'Aquaponia bem montada exige menos trabalho que um cachorro',
    imagem: imgAlimentacao,
    paragrafos: [
      'Alimentar os peixes uma a duas vezes por dia, sempre no mesmo horário. Quantidade: o que eles comerem em 5 minutos. Sobra de ração apodrece a água, sempre prefira dar pouco. Manhã e final de tarde são os horários ideais, peixe é como gente, tem hora de fome.',
      'Olhar a cor da água, escutar o som da bomba, conferir se há plantas murchas. Esses três sinais sensoriais avisam 95% dos problemas antes que se tornem crise. Água escura, bomba silenciosa, planta caída, todos pedem ação no mesmo dia.',
      'Uma vez por semana, faça o teste de água com o kit (5 minutos), corte folhas maduras para a salada do almoço (5 minutos), e dê uma checada visual no canteiro retirando folha morta ou qualquer praga. Total de manutenção semanal: meia hora.',
    ],
    praticas: [
      'Crie um caderninho de bordo: data, alimentação, pH, amônia, nitrato, observações. Em 3 meses você é um especialista no seu sistema.',
      'Compre ração extrusada de 32% proteína para tilápia (saco de 5kg dura meses). Não dá ração de cachorro, gato, ou peixe ornamental.',
      'Se viajar por uma semana, peça a alguém só para alimentar uma vez ao dia. As plantas e bactérias seguem funcionando sozinhas.',
    ],
    tempo: '5 min/dia + 30 min/semana',
  },
  {
    num: '08',
    titulo: 'Quando algo dá errado: o guia de socorro',
    subtitulo: 'Os 5 problemas que todo iniciante encontra e como resolver no mesmo dia',
    imagem: imgTeste,
    paragrafos: [
      'Problema 1: peixe boiando de boca aberta na superfície. Causa: falta de oxigênio. Solução imediata: ligue a bomba na potência máxima, ou jogue uma pedra de aerador de aquário no tanque. Se a temperatura passou dos 30 graus, sombreie com tela.',
      'Problema 2: planta amarelando ou parando de crescer. Causa: pouco nitrato (peixes ainda pequenos ou pouca ração). Solução: aumente um pouco a alimentação dos peixes ou adicione mais 3 a 5 peixinhos. Em uma semana as plantas voltam a crescer verde.',
      'Problema 3: água com cheiro forte. Causa: ração apodrecida no fundo ou peixe morto não retirado. Solução: retire imediatamente o que estiver podre, faça uma troca parcial de 20% da água com água sem cloro, e diminua a alimentação por 3 dias.',
    ],
    praticas: [
      'Mantenha sempre 2 a 3 pedras de aerador de reserva. Em emergência de oxigênio, é o que salva o lote inteiro.',
      'pH abaixo de 6 ou acima de 8: troque 30% da água. Não use produto químico para corrigir, isso destrói as bactérias.',
      'Em geadas ou frio extremo abaixo de 15 graus, cubra o tanque com lona ou plástico bolha. Tilápia para de comer e fica letárgica abaixo de 18 graus.',
    ],
    tempo: 'Resposta no mesmo dia',
  },
];

const armadilhas = [
  { titulo: 'Encher o tanque com água da torneira e jogar peixe na hora', desc: 'Cloro residencial mata peixe em horas. Sempre deixar a água descansar 48 horas exposta ao ar antes de introduzir peixe, ou usar produto anti-cloro de aquário.' },
  { titulo: 'Pular a fase de ciclagem porque está com pressa', desc: 'Sem as bactérias estabelecidas, a amônia produzida pelos peixes envenena o próprio tanque em 5 a 7 dias. Toda a primeira leva morre. As 4 semanas de paciência valem ouro.' },
  { titulo: 'Comprar peixe demais para parecer mais produtivo', desc: 'Densidade acima de 1 peixe por 20L gera competição por oxigênio, doença, e amônia além do que as bactérias conseguem processar. Menos peixe saudável produz mais que muito peixe doente.' },
  { titulo: 'Usar terra ou substrato comum no canteiro', desc: 'Terra entope o sistema, vira lama, mata as raízes por falta de oxigênio. Argila expandida ou pedra britada pequena são as únicas opções viáveis. Custa um pouco mais, dura para sempre.' },
  { titulo: 'Não medir a água por confiar no olho', desc: 'pH e amônia são invisíveis, mas matam silenciosamente. Em duas semanas a colônia de bactérias colapsa sem você perceber. Teste semanal de 5 minutos é seguro de vida do sistema.' },
  { titulo: 'Desligar a bomba à noite para economizar energia', desc: 'A bomba parada por horas mata as bactérias por falta de oxigênio na cama. Em 12 horas o sistema todo entra em colapso. Use timer com ciclos curtos, não desligue de vez.' },
];

const faq = [
  {
    q: 'Quanto custa para começar do zero?',
    a: 'Para um sistema de 200 litros (sistema didático que alimenta uma pessoa em folhas verdes), entre 400 e 600 reais com tudo incluso: bombona, canteiro, bomba, argila, timer, kit de teste e primeiros peixinhos. Para um sistema familiar de 1.000 litros (alimenta 4 pessoas em folhas e produz peixe semestral), entre 1.000 e 1.500 reais. É um investimento único: o sistema dura décadas, e depois disso você só compra ração e mudas.',
  },
  {
    q: 'Preciso entender muito de química e biologia?',
    a: 'Não. Você precisa decorar três regras: pH entre 6,5 e 7,5, amônia em zero, nitrato presente. Um kit de teste de aquário comum mostra isso em cores. Se as cores estão certas, o sistema está saudável. Se mudaram, você procura no Google ou em grupos de Facebook de aquaponia o que fazer. Em 3 meses você sabe interpretar tudo de cabeça.',
  },
  {
    q: 'Posso montar em apartamento, na varanda?',
    a: 'Sim, e milhares de pessoas fazem. Tanques menores (100 a 300 litros) com peixes ornamentais (carpa, kinguio) cabem em varandas e ainda enfeitam. As folhas crescem ali e vão direto pra cozinha. Não dá pra criar tilápia para abate em apartamento por barulho da bomba e peso da água, mas a parte vegetal funciona perfeito.',
  },
  {
    q: 'A tilápia produzida em casa é segura para comer?',
    a: 'Mais segura que a do supermercado. Você sabe exatamente o que ela comeu, sabe que não tomou antibiótico, sabe que cresceu em água sem agrotóxico. A carne fica firme, sabor limpo, sem aquele gosto de barro do peixe industrial. Ração extrusada certificada e abate humanitário (golpe seco na cabeça, sangria) garantem qualidade superior à de qualquer pescaria.',
  },
  {
    q: 'E quando faltar luz por horas, os peixes não morrem?',
    a: 'Em 4 a 6 horas sem bomba, os peixes começam a sofrer por falta de oxigênio. A solução barata é ter um aerador a pilha (custa 40 reais, dura 24h em pilhas comuns). Em queda de energia, ligue ele direto no tanque. Outra opção é um nobreak pequeno só para a bomba, que aguenta 2 a 4 horas. Para quem leva a sério, painel solar simples elimina o problema.',
  },
  {
    q: 'Quanto tempo até a primeira colheita?',
    a: 'Folhas verdes (alface, rúcula, manjericão): a primeira colheita acontece em 30 a 45 dias após o plantio das mudas. Frutos (tomate cereja, pimentão): 90 a 120 dias da muda até o primeiro fruto. Peixe (tilápia abate de 500g): 6 a 8 meses dos alevinos. No total, em 4 meses você já come folhas frescas semanalmente, em 8 meses faz o primeiro abate de peixe.',
  },
  {
    q: 'O sistema cheira mal? Atrai mosquito?',
    a: 'Aquaponia bem feita não cheira nada. Se cheirar, algo está errado (ração estragada, peixe morto, falta de oxigênio). Mosquito não procria em água com peixe, porque os peixes comem as larvas (tilápia adora). É um sistema mais limpo que vaso de planta comum, e a água em movimento espanta o pernilongo.',
  },
  {
    q: 'Vale começar em qualquer época do ano?',
    a: 'Sim, mas o ideal é começar na primavera ou no início do verão, quando as temperaturas estão entre 22 e 28 graus, perfeitas para a ciclagem rápida e crescimento dos peixes. No inverno em regiões frias, as bactérias trabalham mais devagar e a tilápia para de crescer. Comece quente, e quando o frio chegar você já tem o sistema maduro.',
  },
];

export default function AquaponiaResidencial() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.page }}>
      <SeoHead
        custom={{
          title: 'Aquaponia Residencial: Peixe e Verdura no Quintal | Soberania Alimentar',
          description: 'Manual prático de aquaponia para iniciantes absolutos: lista de compras, montagem passo a passo, ciclagem da água, escolha de peixes e plantio. Comida limpa do seu próprio quintal, ciclo fechado.',
          canonical: 'https://soberania.app/soberania-organica/aquaponia-residencial',
        }}
      />
      <BackToHome />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Sistema de aquaponia residencial em quintal ao pôr do sol com tanque azul e canteiro de hortaliças"
            width={1920}
            height={1280}
           
            className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20,12,6,0.38)' }} />
        </div>

        <div className="relative max-w-[1500px] mx-auto px-6 md:px-16 pb-20 md:pb-32 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="font-mono text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: C.waterSoft }}
          >
            Soberania Alimentar · Manual para iniciantes
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.2 }}
            className="font-black leading-[0.92] mb-10 max-w-5xl"
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.75rem, 8.5vw, 7.5rem)',
              color: '#f4ede0',
              textShadow: '0 4px 24px rgba(0,0,0,0.7)',
            }}
          >
            Comida viva no quintal,<br />
            <em style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700, color: C.waterSoft, textShadow: '0 0 40px hsl(198 52% 38% / 0.6), 0 4px 24px rgba(0,0,0,0.8)' }}>
              sem rótulo nem agrotóxico.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.4 }}
            className="text-lg md:text-2xl max-w-3xl leading-relaxed"
            style={{ color: '#e8dcc6', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            Cada alface de supermercado carrega o resíduo de seis a doze agrotóxicos
            diferentes, autorizados pela mesma lógica regulatória que aprova o remédio
            que vai tratar a doença causada por eles. Aquaponia é a saída: peixe que
            aduba, planta que filtra, ciclo fechado dentro de casa, comida real que
            nasce sem pedir licença a ninguém.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: C.waterSoft }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Role para começar</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* PROVOCAÇÃO */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.earth}>
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div {...fade()} className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.water }}>
                Manifesto · Comida sem custódia
              </p>
              <h2
                className="font-black leading-[0.95] mb-10"
                style={{
                  fontFamily: '"Inter Tight", sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 5.5vw, 4.75rem)',
                  color: C.ink,
                }}
              >
                Você terceiriza{' '}
                <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.water }}>
                  a comida da sua família
                </em>
                {' '}para quem te quer doente.
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                O Brasil é o maior consumidor de agrotóxico do planeta. Mais de quinhentos
                ingredientes ativos liberados, vários proibidos na Europa, todos passando
                diariamente pela alface, pelo tomate, pelo morango, pela mamadeira do
                bebê. A mesma indústria química que vende o veneno na lavoura vende a
                quimioterapia no hospital. Mesma matriz acionária, lucro nas duas pontas.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                Aquaponia é o equivalente ao Bitcoin minerado em casa: você produz a sua
                própria comida, no seu próprio nó, sem intermediário, sem rótulo, sem
                pacto com o cartel químico-farmacêutico. Mil litros de água, três metros
                quadrados, salada toda semana, proteína a cada semestre.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: C.ink }}>
                Quem planta o que come deixa de financiar quem o adoece.
              </p>
            </div>
            <div className="md:col-span-5">
              <motion.div {...fade(0.15)} className="relative">
                <img
                  src={imgColheita}
                  alt="Colheita de hortaliças frescas em sistema aquapônico"
                  width={1920} height={1280}
                  loading="lazy"
                  className="w-full h-auto rounded-sm"
                  style={{ boxShadow: '0 40px 80px -20px hsl(28 32% 14% / 0.5)' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PILARES — 50/50 alternado */}
      {pilares.map((p, i) => {
        const bgs = [sectionBg.water, sectionBg.forest, sectionBg.fieldWash, sectionBg.earth, sectionBg.water, sectionBg.forest, sectionBg.fieldWash, sectionBg.earth];
        const isDark = i === 1 || i === 5;
        const sectionBgStyle = bgs[i];
        const reverse = i % 2 === 1;
        const textColor = isDark ? '#f0e6d4' : C.ink;
        const bodyColor = isDark ? '#d8cdb6' : C.body;
        const accentColor = isDark ? C.waterSoft : C.water;
        const labelColor = isDark ? C.waterSoft : C.water;

        return (
          <section key={p.num} className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBgStyle}>
            <div className="max-w-[1500px] mx-auto relative">
              <div className={`grid md:grid-cols-12 gap-12 md:gap-20 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}>
                <motion.div {...fade()} className="md:col-span-6 md:[direction:ltr]">
                  <img
                    src={p.imagem}
                    alt={p.titulo}
                    width={1920} height={1280}
                    loading="lazy"
                    className="w-full h-auto rounded-sm"
                    style={{ boxShadow: isDark ? '0 40px 80px -20px rgba(0,0,0,0.7)' : '0 40px 80px -20px hsl(28 32% 14% / 0.45)' }}
                  />
                </motion.div>
                <motion.div {...fade(0.15)} className="md:col-span-6 md:[direction:ltr]">
                  <div className="flex items-baseline gap-6 mb-8">
                    <span className="font-mono text-7xl md:text-8xl font-black leading-none" style={{ color: accentColor, opacity: 0.85 }}>
                      {p.num}
                    </span>
                    <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: labelColor }}>
                      {p.tempo}
                    </span>
                  </div>
                  <h3
                    className="font-black leading-[0.95] mb-6"
                    style={{
                      fontFamily: '"Inter Tight", sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(1.875rem, 4.5vw, 3.75rem)',
                      color: textColor,
                    }}
                  >
                    {p.titulo}
                  </h3>
                  <p
                    className="mb-10 italic"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                      color: accentColor,
                      textShadow: isDark ? '0 0 24px hsl(198 52% 38% / 0.4)' : 'none',
                    }}
                  >
                    {p.subtitulo}
                  </p>
                  <div className="space-y-6 mb-10">
                    {p.paragrafos.map((par, idx) => (
                      <p key={idx} className="text-lg md:text-xl leading-relaxed" style={{ color: bodyColor }}>
                        {par}
                      </p>
                    ))}
                  </div>
                  <div className="border-l-2 pl-6" style={{ borderColor: accentColor }}>
                    <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: labelColor }}>
                      Práticas concretas
                    </p>
                    <ul className="space-y-3">
                      {p.praticas.map((pr, idx) => (
                        <li key={idx} className="flex gap-4 text-base md:text-lg leading-relaxed" style={{ color: bodyColor }}>
                          <span style={{ color: accentColor }} className="font-bold mt-1">·</span>
                          <span>{pr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ARMADILHAS */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.water}>
        <div className="max-w-[1500px] mx-auto relative">
          <motion.div {...fade()} className="text-center max-w-4xl mx-auto mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.water }}>
              <AlertTriangle className="inline w-4 h-4 mr-2 -mt-1" />
              Erros que matam o sistema na primeira semana
            </p>
            <h2
              className="font-black leading-[0.95]"
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 6vw, 5rem)',
                color: C.ink,
              }}
            >
              Seis armadilhas que{' '}
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.water }}>
                derrubam
              </em>{' '}
              o iniciante.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {armadilhas.map((a, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.05)}
                className="p-10 rounded-sm transition-all duration-500 hover:-translate-y-2"
                style={{
                  backgroundColor: 'hsl(36 30% 96% / 0.92)',
                  border: '1px solid hsl(30 14% 72% / 0.6)',
                  boxShadow: '0 20px 50px -20px hsl(28 32% 14% / 0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="font-mono text-sm font-bold" style={{ color: C.water }}>0{i + 1}</span>
                <h3
                  className="text-2xl md:text-3xl font-black mt-3 mb-5 leading-tight"
                  style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 900, color: C.ink }}
                >
                  {a.titulo}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: C.body }}>
                  {a.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.forest}>
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fade()} className="text-center mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.waterSoft }}>
              <Fish className="inline w-4 h-4 mr-2 -mt-1" />
              Perguntas honestas, respostas diretas
            </p>
            <h2
              className="font-black leading-[0.95]"
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 6vw, 5rem)',
                color: '#f4ede0',
              }}
            >
              O que todo iniciante{' '}
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.waterSoft, textShadow: '0 0 32px hsl(198 52% 38% / 0.6)' }}>
                pergunta primeiro
              </em>.
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.04)}
                className="rounded-sm overflow-hidden"
                style={{
                  border: '1px solid hsl(198 52% 38% / 0.2)',
                  backgroundColor: 'hsl(160 28% 20% / 0.7)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-7 md:p-9 flex justify-between items-start gap-6 transition-colors hover:bg-white/5"
                >
                  <span
                    className="text-lg md:text-xl font-bold leading-snug"
                    style={{ fontFamily: '"Inter Tight", sans-serif', color: '#f4ede0' }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    className="w-6 h-6 flex-shrink-0 mt-1 transition-transform duration-500"
                    style={{
                      color: C.waterSoft,
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5, ease: APPLE_EASE }}
                    className="px-7 md:px-9 pb-7 md:pb-9"
                  >
                    <p className="text-base md:text-lg leading-relaxed" style={{ color: '#d8cdb6' }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FECHO */}
      <section className="relative py-32 md:py-44 px-6 md:px-16 overflow-hidden" style={sectionBg.fieldWash}>
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div {...fade()}>
            <ShieldCheck className="w-12 h-12 mx-auto mb-10" style={{ color: C.water }} />
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.water }}>
              O quintal que vira despensa
            </p>
            <h2
              className="font-black leading-[0.95] mb-12"
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                color: C.ink,
              }}
            >
              Comprar comida é fácil.<br />
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.water }}>
                Produzir comida em ciclo fechado
              </em>
              <br />é o que separa quem depende de quem é livre.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: C.body }}>
              Comece com um sistema de 200 litros neste mês. Em 4 meses você está colhendo
              folha. Em 8 meses faz seu primeiro abate. Em um ano, sua família come do que
              o seu próprio quintal multiplica, sem mercado, sem agrotóxico, sem permissão.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}