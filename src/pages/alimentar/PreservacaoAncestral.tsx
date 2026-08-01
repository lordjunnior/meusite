import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import RelatedHooks from '@/components/RelatedHooks';
import heroImg from '@/assets/alimentar/preservacao-hero.jpg';
import imgDesidratacao from '@/assets/alimentar/preservacao-desidratacao.jpg';
import imgSalga from '@/assets/alimentar/preservacao-salga.jpg';
import imgDefumacao from '@/assets/alimentar/preservacao-defumacao.jpg';
import imgFermentacao from '@/assets/alimentar/preservacao-fermentacao.jpg';
import imgArmazenamento from '@/assets/alimentar/preservacao-armazenamento.jpg';
import imgCera from '@/assets/alimentar/preservacao-cera.jpg';
import imgConservas from '@/assets/alimentar/preservacao-conservas.jpg';

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
  ember: 'hsl(18 62% 42%)',
  emberSoft: 'hsl(28 60% 82%)',
  earth: 'hsl(22 52% 38%)',
  earthSoft: 'hsl(28 60% 82%)',
  smoke: 'hsl(28 14% 18%)',
  smokeDeep: 'hsl(28 18% 12%)',
  line: 'hsl(30 14% 72%)',
};

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.10  0 0 0 0 0.05  0 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const sectionBg = {
  earth: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 65% 55% at 6% 14%, hsl(28 60% 82% / 0.7), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 92% 86%, hsl(22 52% 38% / 0.25), transparent 55%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(36 30% 93%), hsl(34 26% 86%))',
    ].join(','),
    backgroundSize: 'auto, auto, 200px 200px, auto',
  },
  amber: {
    backgroundColor: C.pageDeep,
    backgroundImage: [
      'radial-gradient(ellipse 70% 55% at 14% 22%, hsl(40 70% 78% / 0.85), transparent 50%)',
      'radial-gradient(ellipse 60% 50% at 88% 78%, hsl(18 62% 42% / 0.20), transparent 55%)',
      noiseSvg,
      'linear-gradient(180deg, hsl(34 28% 89%), hsl(32 24% 84%))',
    ].join(','),
    backgroundSize: 'auto, auto, 200px 200px, auto',
  },
  smoke: {
    backgroundColor: C.smokeDeep,
    backgroundImage: [
      'radial-gradient(ellipse 60% 50% at 12% 18%, hsl(18 62% 42% / 0.30), transparent 50%)',
      'radial-gradient(ellipse 55% 45% at 88% 82%, hsl(40 50% 50% / 0.18), transparent 55%)',
      'radial-gradient(circle at 50% 50%, hsl(28 18% 22% / 0.6), transparent 70%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(28 16% 16%), hsl(28 20% 11%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 220px 220px, auto',
  },
  fieldWash: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 65% 50% at 50% 0%, hsl(18 62% 42% / 0.18), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 10% 90%, hsl(22 52% 38% / 0.22), transparent 55%)',
      'radial-gradient(ellipse 50% 40% at 90% 60%, hsl(40 70% 78% / 0.55), transparent 55%)',
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
    titulo: 'Tabela mestra: qual alimento, qual método, quanto tempo dura',
    subtitulo: 'Mapa rápido de decisão para escolher o método certo para cada alimento',
    imagem: imgConservas,
    paragrafos: [
      'Esta é a primeira referência que você consulta antes de começar qualquer preservação. A tabela cruza o alimento com o método mais eficiente, o tempo realista de conservação fora da geladeira e a forma prática de usar depois. Os métodos detalhados aparecem nos blocos seguintes.',
      'Carnes vermelhas duram 2 a 3 meses em charque (salga + sol), 6 meses em confit (cozidas e seladas em gordura), 30 dias defumadas. Peixes duram 4 meses em bacalhau (salga seca pesada), 30 dias defumados a frio. Frangos duram 4 meses em confit, 15 dias defumados.',
      'Vegetais folhosos e raízes duram 3 a 6 meses fermentados em salmoura (chucrute, picles, kimchi), 4 a 8 meses em adega de raízes (batata, cebola, abóbora), 1 ano desidratados em flocos. Frutas duram 6 meses desidratadas, 12 a 18 meses em geleia ou compota, 1 ano em frutas secas ao sol.',
      'Como usar depois: charque hidrata 2h em água antes de cozinhar; bacalhau pede 24h de molho com troca de água a cada 6h; fermentados vão direto na mesa como acompanhamento; confit aquece e serve com pão; geleia abre o vidro e consome em 30 dias na temperatura ambiente.',
    ],
    praticas: [
      'Proteína de longo prazo (3+ meses sem energia): foque em charque, bacalhau caseiro e confit. São os 3 que sustentam família por estação inteira.',
      'Vitamina viva o ano todo (probiótico): foque em chucrute e picles fermentado. Não precisa de cozimento, dura meses, melhora o intestino.',
      'Carboidrato e calorias do dia a dia: adega de raízes para batata, cebola, abóbora. Compra na safra, paga 1/3 do preço, come 6 meses.',
      'Fruta da safra o ano todo: geleia (vidros lacrados a quente) e desidratação. 1 tarde de cozinha rende 6 a 12 vidros.',
    ],
    tempo: 'Consulta rápida',
  },
  {
    num: '02',
    titulo: 'Desidratação solar e ao forno: o método mais simples',
    subtitulo: 'Tomate, ervas, cogumelos, frutas e até carne, tudo dura meses sem geladeira',
    imagem: imgDesidratacao,
    paragrafos: [
      'Desidratar é tirar a água do alimento até sobrar de 10% a 20% da umidade original. Sem água, microorganismo nenhum sobrevive. Funciona com tomate, manjericão, orégano, hortelã, pimenta, cogumelo, banana, maçã, manga, e até carne em tiras finas (charque caseiro).',
      'Método solar (mais antigo e barato): corte o alimento em fatias finas (3 a 5 mm), espalhe em uma tela ou pano limpo sobre uma bandeja, cubra com gaze fina (para não pousar mosca), e deixe ao sol direto por 2 a 5 dias. Recolha à noite para a umidade não voltar. Pronto quando a peça quebra ao dobrar (frutas e ervas) ou fica dura como couro (tomate e carne).',
      'Método forno (em dias chuvosos ou inverno): forno na temperatura mínima (60 a 80 graus), porta entreaberta com uma colher de pau na fresta, alimento em assadeira espalhado em camada única. Tempo: 4 a 12 horas dependendo do que for. Vire a cada 2 horas. Pronto no mesmo critério: quebra ou couro.',
    ],
    praticas: [
      'Tomate desidratado caseiro custa 5x menos que o do supermercado e fica infinitamente melhor. Conservado em vidro com azeite, dura 6 meses fora da geladeira.',
      'Para ervas (manjericão, orégano, alecrim): pendure em molhinhos amarrados de cabeça para baixo em local arejado e sombreado. Em 7 a 14 dias estão prontas. Triture e guarde em vidro escuro.',
      'Charque caseiro: tiras finas de carne magra, salgadas grosseiramente, deixadas ao sol por 2 a 3 dias até endurecerem. Dura 2 a 3 meses pendurada em local seco. É proteína que viaja na mochila.',
    ],
    tempo: '2 a 5 dias de espera',
  },
  {
    num: '03',
    titulo: 'Salga e cura: o método que salvou a Europa medieval',
    subtitulo: 'Sal puxa a água de dentro do alimento e mata o que tenta crescer',
    imagem: imgSalga,
    paragrafos: [
      'Sal grosso é o conservante mais antigo e poderoso da humanidade. Quando você cobre carne, peixe ou queijo com sal, ele puxa toda a água de dentro do alimento por osmose. Sem água, microorganismo morre. A peça fica firme, salgada, e dura semanas a meses sem refrigeração.',
      'Salga seca para carne (bacalhau, presunto cru, charque): cubra a peça inteira com sal grosso em uma bandeja de cerâmica ou inox (nunca alumínio). Deixe na geladeira ou em local fresco e arejado por 7 a 21 dias dependendo do tamanho. Vire a cada 2 dias. A peça perde até 30% do peso e fica firme. Para usar, deixa de molho em água trocando 3 vezes para tirar o excesso de sal.',
      'Salmoura líquida para vegetais (azeitona, picles, conserva de mandioca): dissolva 50g de sal grosso em 1 litro de água fervida e fria. Submerja o vegetal em vidros bem lavados, com um peso por cima para manter tudo abaixo da água. Tampe e deixe em local escuro de 7 a 30 dias. Está pronto quando o vegetal fica firme, levemente ácido, e a água fica turva (sinal de fermentação saudável).',
    ],
    praticas: [
      'Use sempre sal grosso sem aditivo (não use sal refinado de mesa, ele tem antiumectantes que atrapalham). Sal marinho ou rosa do Himalaia funcionam ainda melhor.',
      'Para 1kg de carne: use 200g a 300g de sal grosso. Para salmoura: 5% de sal sobre o peso da água (50g por litro).',
      'Bacalhau caseiro: peça inteira de pescada ou tainha, salgada por 10 dias virando a cada 2 dias, depois pendurada para secar mais 5 dias. Dura 4 meses pendurada em local seco e ventilado.',
    ],
    tempo: '7 a 21 dias',
  },
  {
    num: '04',
    titulo: 'Fermentação: bactérias boas que protegem o alimento',
    subtitulo: 'Chucrute, kimchi, picles, kombucha, saúde intestinal e despensa eterna',
    imagem: imgFermentacao,
    paragrafos: [
      'Fermentar é colocar bactérias boas (lactobacilos) para dominarem o alimento antes que as ruins cheguem. Os lactobacilos comem o açúcar do vegetal e produzem ácido lático, que conserva tudo e ainda enriquece a comida com probióticos vivos. É o oposto da pasteurização: você quer os bichos vivos lá dentro.',
      'Receita universal de chucrute (repolho fermentado, base de tudo): pique 1 repolho médio finíssimo, misture com 20g de sal grosso (2% do peso), aperte com as mãos por 10 minutos até soltar bastante água. Empurre tudo para um vidro grande, garantindo que a água cubra todas as folhas. Tampe sem apertar muito (precisa sair gás). Deixe na bancada por 7 a 14 dias. Está pronto quando borbulha menos e tem cheiro azedo agradável.',
      'O mesmo método funciona para kimchi (repolho com pimenta, alho e gengibre), picles fermentado de pepino, conserva fermentada de cenoura, beterraba, rabanete, vagem, e qualquer vegetal duro. Depois de pronto, vai para a geladeira ou local fresco e dura de 3 a 6 meses só melhorando de sabor.',
    ],
    praticas: [
      'Para fermentar bem você precisa de: vidro limpo (não esterilizado, isso mata as bactérias boas), peso para afundar o vegetal (uma pedra limpa ou saquinho de água), e paciência.',
      'Sinais de fermentação saudável: borbulhas, cheiro levemente azedo, água turva. Sinais de problema: mofo na superfície (retire e jogue fora), cheiro podre (descarte tudo).',
      'Comece com chucrute simples. Em 2 semanas você tem 1kg de probiótico vivo gastando 5 reais em repolho e sal.',
    ],
    tempo: '7 a 14 dias',
  },
  {
    num: '05',
    titulo: 'Defumação: a fumaça que conserva e dá sabor',
    subtitulo: 'Carne, peixe, queijo defumados duram meses e ganham sabor de fogo',
    imagem: imgDefumacao,
    paragrafos: [
      'Fumaça de madeira tem dezenas de compostos químicos que matam bactéria, repelem inseto, e formam uma camada protetora na superfície do alimento. Defumar é deixar a peça (já salgada) exposta a uma fumaça fria e contínua por horas a dias. O resultado é proteína que dura meses sem refrigeração, com aquele sabor profundo de churrasco lento.',
      'Defumador caseiro mais simples (caixão de chapa): uma caixa metálica grande (pode ser tonel cortado, churrasqueira velha, ou caixa improvisada) com a fonte de fumaça embaixo (cavacos de madeira queimando devagar) e os ganchos com alimento em cima. A fumaça sobe, envolve o alimento, sai por aberturas no topo. Mantém a temperatura entre 30 e 70 graus dependendo do método.',
      'Defumação a frio (entre 20 e 30 graus, durante 1 a 5 dias): para queijos, peixes magros, presunto cru. Conserva mas não cozinha. Defumação a quente (entre 60 e 90 graus, durante 4 a 12 horas): para frango, costela, linguiça. Cozinha e conserva ao mesmo tempo. Em ambos os métodos, a peça precisa ser salgada antes (passo 03) por algumas horas.',
    ],
    praticas: [
      'Use só madeiras duras e sem resina: goiabeira, jabuticabeira, eucalipto bem seco, oliveira, cerejeira. Nunca pinheiro ou eucalipto verde (resina amarga e tóxica).',
      'Defumador caseiro completo se monta em 1 sábado com sucata de R$ 100 (tonel velho, ganchos, tela metálica, isqueiro).',
      'Linguiça defumada caseira (carne moída temperada, embutida em tripa, salgada por 1 dia, defumada por 6 horas): dura 30 dias pendurada em local seco. Sabor que supermercado nenhum vende.',
    ],
    tempo: '4h a 5 dias',
  },
  {
    num: '06',
    titulo: 'Conservação em gordura, cera e óleo: selo total contra oxigênio',
    subtitulo: 'Banha, manteiga clarificada, azeite, cera de abelha, embalagens ancestrais',
    imagem: imgCera,
    paragrafos: [
      'Microorganismo precisa de oxigênio para viver. Se você seliar a comida sob uma camada de gordura, óleo ou cera, o oxigênio não entra, e nada cresce ali dentro. Funciona para queijo, ovo cozido, carne cozida, peixe fritado, conserva de cebola e pimenta. Dura de 2 a 12 meses sem geladeira.',
      'Confit é o método clássico francês: cozinhe a carne (tradicionalmente pato, mas funciona com porco, frango, coelho) lentamente na própria gordura, em fogo baixíssimo, por 3 a 5 horas, até desmanchar. Coloque a carne em pote de vidro, cubra completamente com a gordura derretida, deixe esfriar e selar. Conservado fora da geladeira, dura 6 meses, e fica mais saboroso com o tempo.',
      'Para queijos pequenos e frescos: derreta cera de abelha pura em banho-maria, mergulhe o queijo segurando pelo barbante, deixe escorrer, mergulhe de novo. 3 camadas formam um selo perfeito. O queijo dentro envelhece sem mofar nem secar. Era assim que se transportava queijo da Idade Média para o exército em campanha.',
    ],
    praticas: [
      'Cera de abelha pura compra em apicultor, custa R$ 40 a 80/kg, dá para selar 30 a 50 queijos pequenos. É reutilizável: derrete e usa de novo.',
      'Para confit caseiro use banha de porco (mais barata, mais fácil de derreter) ou óleo de coco (vegetal, dura ainda mais).',
      'Cebola e pimenta em conserva: doure a cebola e a pimenta no azeite, coloque em pote de vidro com mais azeite por cima cobrindo tudo. Dura 4 meses na bancada e dá sabor a qualquer prato.',
    ],
    tempo: '1 tarde de cozinha',
  },
  {
    num: '07',
    titulo: 'Adega de raízes: a despensa que respira sozinha',
    subtitulo: 'Batata, cebola, abóbora, maçã: 6 meses guardadas sem geladeira nenhuma',
    imagem: imgArmazenamento,
    paragrafos: [
      'Raízes (batata inglesa, batata doce, mandioca, inhame, beterraba, cenoura) e tubérculos (cebola, alho), além de abóboras e maçãs, têm vida longa fora da geladeira se forem guardados em local fresco (10 a 15 graus), úmido (60 a 80% de umidade), escuro e ventilado. É a chamada adega de raízes, ou root cellar em inglês, técnica usada há séculos por agricultores em todo o hemisfério norte.',
      'Em casa urbana você não precisa cavar uma adega. Um cantinho fresco da despensa, um armário externo na varanda coberta, ou uma caixa de madeira no chão do quarto mais frio da casa fazem o trabalho. Coloque cada vegetal separado (cebola pode acelerar a brotação da batata se ficarem juntas), em camadas de areia seca ou serragem (que absorve umidade extra e isola).',
      'Resultados práticos: batata bem armazenada dura 4 a 6 meses sem brotar. Cebola dura 3 a 5 meses. Abóbora cabotiá ou japonesa dura 4 a 8 meses. Maçã dura 2 a 4 meses. Você compra (ou colhe) na safra quando está barato e abundante, e come o ano inteiro pagando preço de safra.',
    ],
    praticas: [
      'Caixa de madeira simples (50x30x20 cm), fundo forrado com jornal, batata em camadas separadas por jornal entre elas, deixada no chão do quarto mais fresco. Já é uma adega funcional.',
      'Não armazene batata e maçã juntas, a maçã libera etileno que faz a batata brotar mais rápido.',
      'Faça inspeção semanal de 2 minutos: tire qualquer peça murcha ou com sinal de podridão. Uma única peça ruim pode contaminar a caixa inteira em 3 dias.',
    ],
    tempo: '20 min para montar',
  },
  {
    num: '08',
    titulo: 'Doces e geleias: açúcar como conservante natural',
    subtitulo: 'Geleia, compota, marmelada, frutas em calda, fruta da safra o ano todo',
    imagem: imgConservas,
    paragrafos: [
      'Açúcar em concentração alta (acima de 60%) tem o mesmo efeito do sal: puxa a água do alimento e impede o crescimento microbiano. É o segredo das geleias, doces de fruta, marmelada e frutas em calda, técnicas que fazem fruta da safra durar 1 a 2 anos sem geladeira.',
      'Receita universal de geleia: 1kg de fruta limpa (qualquer fruta, mas as ácidas como laranja, maracujá, jabuticaba, framboesa funcionam melhor), 700g a 1kg de açúcar, suco de meio limão. Cozinhe em fogo médio mexendo sempre por 30 a 60 minutos, até engrossar (teste do prato: pinga uma gota num prato gelado, se não escorre quando vira, está pronto). Embale ainda quente em vidros esterilizados, feche bem e vire de cabeça para baixo por 5 minutos (cria vácuo natural).',
      'O mesmo princípio para frutas em calda: corte a fruta, cozinhe em xarope grosso de açúcar (1kg de açúcar para 1L de água) por 10 a 20 minutos, embale em vidro fechando ainda quente. Dura 12 a 18 meses na despensa. Pera, pêssego, figo, abacaxi e jabuticaba ficam excelentes assim.',
    ],
    praticas: [
      'Esterilizar vidros é simples: lave com água e sabão, ferva em água por 10 minutos junto com as tampas, escorra de boca para baixo num pano limpo. Pronto.',
      'Vácuo natural: enche o vidro até 1cm da boca com a calda fervendo, fecha e vira de cabeça para baixo por 5 a 10 minutos. Quando volta o vidro, a tampa fica côncava (sinal do vácuo).',
      'Compre fruta na época: jabuticaba em outubro, manga em janeiro, laranja em junho. Faz a geleia, e tem a fruta dessa safra na mesa em qualquer mês.',
    ],
    tempo: '1 tarde de cozinha',
  },
];

const armadilhas = [
  { titulo: 'Usar sal refinado de mesa em conservas', desc: 'O sal de mesa tem antiumectantes (silicato) que turvam a salmoura e atrapalham a fermentação. Use sempre sal grosso puro, sem aditivo, ou sal marinho.' },
  { titulo: 'Esterilizar tudo na fermentação', desc: 'Fermentação precisa das bactérias boas vivas. Se você esteriliza demais, mata também os lactobacilos e o processo não acontece. Lavar bem é suficiente, esterilização é só para conservas em calor.' },
  { titulo: 'Defumar com madeira resinosa ou tratada', desc: 'Pinheiro, eucalipto verde, madeira de obra ou pallet liberam compostos tóxicos quando queimam. Use só madeiras duras e secas: goiabeira, oliveira, jabuticabeira, cerejeira.' },
  { titulo: 'Guardar batata e cebola juntas', desc: 'A cebola libera gases que aceleram a brotação da batata. Sempre separe em caixas diferentes. O mesmo vale para maçã e qualquer raiz.' },
  { titulo: 'Confiar no aspecto sem testar a vedação', desc: 'Conserva em vidro mal fechada cria condição perfeita para botulismo, doença grave e potencialmente fatal. Sempre confira se a tampa fica côncava (vácuo). Sem vácuo, ferva o conteúdo antes de comer.' },
  { titulo: 'Achar que desidratado mole está pronto', desc: 'Alimento desidratado mas ainda flexível tem umidade demais e mofa em 2 semanas. Tem que estar quebradiço (frutas, ervas) ou duro como couro (tomate, carne). Se dobra sem rachar, leva mais sol ou mais forno.' },
];

const faq = [
  {
    q: 'Esses métodos funcionam mesmo em apartamento na cidade?',
    a: 'Sim, todos os 8. Desidratação solar acontece numa janela ensolarada ou no telhado do prédio. Salga e cura precisam só de 1 metro de bancada na cozinha. Fermentação é um vidro deixado num cantinho. Defumação requer área externa ou churrasqueira (única limitação). Conservas em gordura e doces se fazem no fogão. Adega de raízes vira uma caixa no chão do quarto mais frio. Sua despensa pode ficar autônoma sem mexer em nada da estrutura do apartamento.',
  },
  {
    q: 'É seguro? Não tem risco de intoxicação alimentar?',
    a: 'É mais seguro que comida de supermercado se você seguir a regra de ouro: sentidos sempre ativos. Cheiro ruim, cor estranha, mofo aparente, gosto amargo: descarte. Comida bem preservada tem cheiro agradável (ácido na fermentação, defumado na carne, doce nas geleias) e cor estável. Estatisticamente, intoxicações graves vêm muito mais de conservas industriais com lote contaminado do que de comida feita em casa com atenção.',
  },
  {
    q: 'Quanto custa para começar?',
    a: 'Praticamente nada. Você já tem fogão, panela e vidro vazio. Compras únicas: sal grosso (R$ 5/kg), açúcar (R$ 5/kg), cera de abelha pura (R$ 40 vão durar anos), kit de 6 vidros com tampa (R$ 30). Total para começar com tudo: R$ 80. Depois disso, só compra ingrediente fresco da safra, que custa metade do preço por estar na época.',
  },
  {
    q: 'Quanto tempo cada conserva realmente dura?',
    a: 'Desidratado em vidro fechado: 6 a 12 meses. Salgado seco (charque, bacalhau): 4 a 8 meses pendurado em local seco. Fermentado em vidro tampado: 6 meses na geladeira ou local fresco. Defumado: 1 a 3 meses pendurado em local seco. Confit em gordura selada: 6 a 12 meses. Geleias e doces em vidro com vácuo: 12 a 18 meses. Adega de raízes: 3 a 8 meses dependendo do vegetal.',
  },
  {
    q: 'E se faltar luz por uma semana, a comida da minha despensa serve?',
    a: 'Esse é exatamente o ponto. Tudo que está desidratado, fermentado, salgado, defumado, em conserva ou na adega de raízes não se importa com a falta de luz. Continua bom como sempre. Sua despensa autônoma é o seguro contra qualquer apagão prolongado, falha logística, ou interrupção de cadeia de abastecimento. Quem só depende de geladeira fica com 3 dias de comida útil.',
  },
  {
    q: 'Por onde começar se eu nunca conservei nada?',
    a: 'Comece pelo método 04 (chucrute, fermentação simples). Em 2 semanas você tem 1 vidro de probiótico fresco, gastando 5 reais em repolho e sal. Depois vá para o método 02 (desidratação de tomate ao sol ou no forno). Esses dois sozinhos já te ensinam 80% dos princípios e te dão segurança para o resto. Em 3 meses dominando os 8 métodos, sua despensa se torna outra coisa: você passa a comprar comida fresca uma vez por mês em vez de toda semana.',
  },
  {
    q: 'Preciso de equipamento profissional? Forno especial, desidratador elétrico?',
    a: 'Não. Tudo neste manual se faz com o que já existe na sua cozinha: panela, vidro, forno comum, fogão. Desidratador elétrico é um conforto (acelera o processo), não uma necessidade. Defumador é a única exceção: vale a pena montar um caseiro com sucata, mas dá para começar usando uma churrasqueira fechada com tampa.',
  },
  {
    q: 'E se eu produzir mais do que minha família consome?',
    a: 'Aí começa a economia paralela: troca direta de comida com vizinhos e família. Você dá um vidro de chucrute, recebe meia dúzia de ovos. Dá um charque, recebe queijo. É a economia que funcionou por 9 mil anos antes do supermercado existir, e que volta a fazer sentido total quando o sistema falha. Conserva caseira é também moeda.',
  },
];

export default function PreservacaoAncestral() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.page }}>
      <SeoHead
        custom={{
          title: 'Preservação Ancestral: Conservar Comida Sem Eletricidade | Soberania Alimentar',
          description: 'Manual prático dos 8 métodos ancestrais de conservação de alimentos: desidratação, salga, fermentação, defumação, confit, cera, adega de raízes e doces. Despensa autônoma sem geladeira para iniciantes.',
          canonical: 'https://soberania.app/soberania-organica/preservacao-ancestral',
        }}
      />
      <BackToHome />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Despensa ancestral com vidros de conservas, carnes curadas e potes de barro em luz quente"
            width={1920}
            height={1080}
            fetchPriority="high"
            className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20,12,6,0.38)' }} />
        </div>

        <div className="relative max-w-[1500px] mx-auto px-6 md:px-16 pb-20 md:pb-32 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="font-mono text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: C.emberSoft }}
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
            Sua bisavó conservava<br />
            <em style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700, color: C.emberSoft, textShadow: '0 0 40px hsl(18 62% 42% / 0.6), 0 4px 24px rgba(0,0,0,0.8)' }}>
              sem rótulo e sem indústria.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.4 }}
            className="text-lg md:text-2xl max-w-3xl leading-relaxed"
            style={{ color: '#e8dcc6', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            Sal, fumaça, sol, salmoura, mel, banha, cinza, gelo de inverno. Oito métodos
            que sustentaram a humanidade por dez mil anos antes de existir geladeira,
            código de barras ou conservante químico. Reconquistar essa técnica é tirar
            a despensa da custódia da indústria alimentícia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: C.emberSoft }}
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
              <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.ember }}>
                Manifesto · Despensa fora do sistema
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
                Conservante industrial{' '}
                <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.ember }}>
                  preserva o lucro,
                </em>
                {' '}não a sua saúde.
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                Nitrito industrial, BHA, BHT, glutamato, sorbato, benzoato. A lista de
                aditivos do salame de supermercado é maior que a receita inteira de um
                presunto curado em casa. Cada nome impronunciável é um passo a mais na
                escada que termina na bula do remédio. Indústria alimentícia formula a
                doença, indústria farmacêutica vende o tratamento contínuo.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                Sal, fumaça, sol, mel e tempo conservam há milênios sem nenhum desses
                venenos. Curar a própria carne, secar a própria fruta, salgar o próprio
                peixe é o gesto mais antigo de auto-custódia: a despensa que ninguém
                fabrica, ninguém recolhe, ninguém pode envenenar pelas suas costas.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: C.ink }}>
                Comida ancestral é remédio que sua bisavó já sabia preparar.
              </p>
            </div>
            <div className="md:col-span-5">
              <motion.div {...fade(0.15)} className="relative">
                <img
                  src={imgArmazenamento}
                  alt="Adega tradicional de raízes com batatas, cebolas e abóboras armazenadas"
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

      {/* PILARES */}
      {pilares.map((p, i) => {
        const bgs = [sectionBg.amber, sectionBg.smoke, sectionBg.fieldWash, sectionBg.earth, sectionBg.smoke, sectionBg.amber, sectionBg.fieldWash, sectionBg.earth];
        const isDark = i === 1 || i === 4;
        const sectionBgStyle = bgs[i];
        const reverse = i % 2 === 1;
        const textColor = isDark ? '#f0e6d4' : C.ink;
        const bodyColor = isDark ? '#d8cdb6' : C.body;
        const accentColor = isDark ? C.emberSoft : C.ember;
        const labelColor = isDark ? C.emberSoft : C.ember;

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
                      textShadow: isDark ? '0 0 24px hsl(18 62% 42% / 0.4)' : 'none',
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
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.amber}>
        <div className="max-w-[1500px] mx-auto relative">
          <motion.div {...fade()} className="text-center max-w-4xl mx-auto mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.ember }}>
              <AlertTriangle className="inline w-4 h-4 mr-2 -mt-1" />
              Erros que estragam o lote inteiro
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
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.ember }}>
                desperdiçam
              </em>{' '}
              o seu trabalho.
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
                <span className="font-mono text-sm font-bold" style={{ color: C.ember }}>0{i + 1}</span>
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
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.smoke}>
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fade()} className="text-center mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.emberSoft }}>
              <Flame className="inline w-4 h-4 mr-2 -mt-1" />
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
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.emberSoft, textShadow: '0 0 32px hsl(18 62% 42% / 0.6)' }}>
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
                  border: '1px solid hsl(18 62% 42% / 0.2)',
                  backgroundColor: 'hsl(28 18% 20% / 0.7)',
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
                      color: C.emberSoft,
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
            <ShieldCheck className="w-12 h-12 mx-auto mb-10" style={{ color: C.ember }} />
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.ember }}>
              A despensa que não precisa de tomada
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
              Geladeira é conforto.<br />
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.ember }}>
                Despensa autônoma
              </em>
              <br />é soberania.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: C.body }}>
              Comece pela fermentação esta semana. No mês que vem desidrate sua primeira
              fornada de tomate. Em três meses sua despensa contém comida real para meses,
              independente da rede, independente da safra, independente da próxima crise.
              É a infraestrutura mais antiga e mais robusta da humanidade.
            </p>
          </motion.div>
        </div>
      </section>

      <RelatedHooks
        tema="light"
        titulo="Continue construindo a despensa autônoma"
        subtitulo="Estes módulos completam o protocolo de soberania alimentar e de água, do kit de 72 horas à colheita do próprio quintal."
        hooks={[
          {
            titulo: 'Kit 72h',
            descricao: 'O ponto de partida. O que você precisa ter pronto e ao alcance da mão antes de qualquer crise prolongada.',
            rota: '/soberania-organica/kit-72h',
            selo: 'Comece aqui',
          },
          {
            titulo: 'Conservação de Alimentos',
            descricao: 'Princípios complementares de armazenagem segura: embalagem, controle de pragas e rotação da despensa.',
            rota: '/soberania-organica/conservacao',
          },
          {
            titulo: 'Gestão de Água em Escala Micro',
            descricao: 'Captação de chuva, filtragem biológica e reuso de águas cinzas, a água que vai cozinhar e hidratar suas conservas.',
            rota: '/soberania-organica/gestao-agua-micro',
            selo: 'Próximo passo',
          },
          {
            titulo: 'Sementes Crioulas',
            descricao: 'Banco de sementes próprio para reproduzir a safra ano após ano, a fonte do alimento que vai virar conserva.',
            rota: '/soberania-organica/sementes-crioulas',
          },
          {
            titulo: 'Conservas Fermentadas',
            descricao: 'Aprofundamento técnico em fermentação láctica: chucrute, kimchi e picles em escala familiar.',
            rota: '/soberania-organica/conservas-fermentadas',
          },
          {
            titulo: 'Aquaponia Residencial',
            descricao: 'Proteína fresca em ciclo fechado para complementar a proteína curada e desidratada da despensa.',
            rota: '/soberania-organica/aquaponia-residencial',
          },
        ]}
      />
    </div>
  );
}
