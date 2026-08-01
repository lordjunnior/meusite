import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, AlertTriangle, ShieldCheck, Droplets } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import RelatedHooks from '@/components/RelatedHooks';
import heroImg from '@/assets/agua/agua-hero.jpg';
import imgCaptacao from '@/assets/agua/agua-captacao.jpg';
import imgFiltragem from '@/assets/agua/agua-filtragem.jpg';
import imgCinzas from '@/assets/agua/agua-cinzas.jpg';
import imgIrrigacao from '@/assets/agua/agua-irrigacao.jpg';
import imgSodis from '@/assets/agua/agua-sodis.jpg';
import imgSwale from '@/assets/agua/agua-swale.jpg';
import imgAuditoria from '@/assets/agua/agua-auditoria.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const C = {
  page: 'hsl(206 32% 93%)',
  pageDeep: 'hsl(206 26% 86%)',
  ink: 'hsl(210 38% 14%)',
  body: 'hsl(210 22% 28%)',
  muted: 'hsl(210 14% 44%)',
  ocean: 'hsl(198 70% 38%)',
  oceanSoft: 'hsl(198 60% 80%)',
  deep: 'hsl(210 60% 22%)',
  deepSoft: 'hsl(206 28% 70%)',
  storm: 'hsl(210 22% 16%)',
  stormDeep: 'hsl(210 28% 10%)',
  line: 'hsl(206 14% 72%)',
};

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.10  0 0 0 0 0.18  0 0 0 0 0.25  0 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const sectionBg = {
  ocean: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 65% 55% at 6% 14%, hsl(198 60% 80% / 0.7), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 92% 86%, hsl(198 70% 38% / 0.22), transparent 55%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(206 32% 94%), hsl(206 26% 85%))',
    ].join(','),
    backgroundSize: 'auto, auto, 200px 200px, auto',
  },
  sky: {
    backgroundColor: C.pageDeep,
    backgroundImage: [
      'radial-gradient(ellipse 70% 55% at 14% 22%, hsl(198 70% 88% / 0.85), transparent 50%)',
      'radial-gradient(ellipse 60% 50% at 88% 78%, hsl(210 60% 22% / 0.18), transparent 55%)',
      noiseSvg,
      'linear-gradient(180deg, hsl(206 28% 90%), hsl(206 22% 84%))',
    ].join(','),
    backgroundSize: 'auto, auto, 200px 200px, auto',
  },
  storm: {
    backgroundColor: C.stormDeep,
    backgroundImage: [
      'radial-gradient(ellipse 60% 50% at 12% 18%, hsl(198 70% 38% / 0.30), transparent 50%)',
      'radial-gradient(ellipse 55% 45% at 88% 82%, hsl(206 50% 50% / 0.18), transparent 55%)',
      'radial-gradient(circle at 50% 50%, hsl(210 24% 18% / 0.6), transparent 70%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(210 22% 14%), hsl(210 28% 9%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 220px 220px, auto',
  },
  rain: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 65% 50% at 50% 0%, hsl(198 70% 38% / 0.18), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 10% 90%, hsl(210 60% 22% / 0.18), transparent 55%)',
      'radial-gradient(ellipse 50% 40% at 90% 60%, hsl(198 70% 88% / 0.55), transparent 55%)',
      noiseSvg,
      'linear-gradient(180deg, hsl(206 32% 93%), hsl(206 26% 87%))',
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
    titulo: 'Auditoria de água: descubra para onde sua água está indo',
    subtitulo: 'Antes de captar, filtrar e reutilizar, você precisa saber quanto consome e onde gasta',
    imagem: imgAuditoria,
    paragrafos: [
      'Família brasileira de quatro pessoas em casa urbana consome em média 600 a 900 litros de água por dia. Desse total, aproximadamente 35% vai para vaso sanitário, 30% para banho, 15% para lavagem de roupa, 10% para cozinha, 5% para jardim e 5% para outros usos. Sem entender essa distribuição, você não consegue priorizar onde a captação e o reuso vão fazer mais diferença.',
      'A auditoria caseira leva uma semana e custa zero. Anote a leitura do hidrômetro toda manhã às 7h. No final de sete dias, divida o total por sete e por quatro pessoas: você descobre seu consumo real per capita. Em paralelo, faça três medições simples com um jarro de 1 litro e um cronômetro: vazão da torneira da cozinha, do chuveiro e da descarga (volume por acionamento). Multiplique pelos minutos ou usos por dia.',
      'O resultado típico choca: o vaso sanitário consome de 6 a 12 litros por descarga e é acionado de 4 a 6 vezes por pessoa por dia. Uma família de quatro joga de 100 a 280 litros de água potável literalmente no esgoto, todos os dias, só para descargas. Essa água pode ser substituída por água de chuva captada, sem nenhum prejuízo de função.',
    ],
    praticas: [
      'Faça a leitura do hidrômetro por 7 dias seguidos no mesmo horário. A diferença entre a primeira e a última leitura, dividida por 7, é seu consumo médio diário real.',
      'Meça a vazão dos pontos críticos: tempo para encher 1 litro na torneira da cozinha, no chuveiro, e volume da caixa de descarga. Anota tudo. Você vai usar para dimensionar o sistema.',
      'Identifique os 3 maiores consumos da casa. Ataque eles primeiro. Captação de chuva resolve descarga e jardim. Reuso de água cinza resolve descarga e irrigação. Aerador de torneira reduz cozinha em 50% sem trocar nada.',
    ],
    tempo: '7 dias de medição',
  },
  {
    num: '02',
    titulo: 'Captação de chuva: o telhado é uma mina de água potável',
    subtitulo: 'Cada metro quadrado de telhado captura 1 litro a cada 1mm de chuva. Faça a conta da sua casa.',
    imagem: imgCaptacao,
    paragrafos: [
      'A fórmula é simples e cabe na cabeça: área do telhado em metros quadrados x precipitação anual em milímetros x 0,8 (eficiência de captação) = litros captáveis por ano. Casa urbana com 100m² de telhado em São Paulo (1400mm/ano de chuva) capta 112 mil litros por ano. Quase metade do consumo da família. Em Salvador (1900mm/ano) o mesmo telhado capta 152 mil litros, mais que o consumo total.',
      'O sistema mínimo funcional: calhas no perímetro do telhado, condutor vertical descendo até 30cm acima do solo, dispositivo de descarte da primeira água (first-flush, que descarta os primeiros 20 litros que vêm sujos com poeira e fezes de pássaro), filtro de tela na entrada da cisterna (retém folhas) e cisterna fechada para evitar mosquito e luz (que faz alga crescer). Investimento total para casa urbana: R$ 800 a R$ 2.500 incluindo cisterna de 1.000 litros.',
      'A cisterna não precisa ser enterrada nem cara. Caixa d\'água de polietileno de 1.000L (R$ 350 a R$ 500), elevada 50cm do chão sobre quatro tijolos, conectada à calha por PVC marrom de 75mm, é uma cisterna funcional. Para apartamento com varanda coberta de 8m², um único barril de 200L já capta 8.000L por ano em SP, suficiente para regar plantas e lavar varanda o ano inteiro.',
    ],
    praticas: [
      'Cálculo rápido: meça a área do seu telhado em metros quadrados (comprimento x largura da projeção horizontal). Multiplique pela chuva anual da sua cidade em mm. Multiplique por 0,8. Divida por 365. É o que você capta por dia em média.',
      'First-flush caseiro: PVC vertical de 100mm tampado embaixo, com torneira de bola para esvaziar entre chuvas. A primeira água da chuva enche este tubo (carregando a sujeira) antes de transbordar para a cisterna. Esvazie após cada chuva.',
      'Use água de chuva sem tratamento para descarga, lavar carro, lavar quintal, regar plantas e lavar roupa. Para beber, cozinhar e tomar banho, ela precisa passar pelo filtro biológico (próximo módulo) e por fervura ou desinfecção solar.',
    ],
    tempo: '1 fim de semana para montar',
  },
  {
    num: '03',
    titulo: 'Filtro biológico de areia: água potável sem energia elétrica',
    subtitulo: 'Bactérias boas, areia, carvão e gravidade — o filtro caseiro que remove 99% dos patógenos',
    imagem: imgFiltragem,
    paragrafos: [
      'O filtro de areia bioativo (biosand filter) é uma tecnologia desenvolvida nos anos 1990 pela Universidade de Calgary e usada hoje por mais de 1 milhão de famílias no mundo todo, sem qualquer manutenção elétrica. Ele combina três barreiras: filtragem física (camadas de areia retêm partículas), filtragem química (carvão ativado adsorve metais e cloro) e filtragem biológica (uma fina camada de microorganismos benignos no topo, chamada schmutzdecke, devora bactérias patogênicas e vírus).',
      'Construção caseira em barril de 200 litros: na base, 10cm de pedra britada nº 1 (drenagem), em cima 5cm de areia grossa (transição), depois 50cm de areia fina lavada (filtro principal), 10cm de carvão ativado (granular, comprado em loja de aquário) e mais 5cm de areia fina por cima. Tubo de saída de PVC pelo lado, com curva em U interna, mantém sempre 5cm de água acima da areia (essencial para a camada biológica viver). Custo total: R$ 200 a R$ 400.',
      'Nas duas primeiras semanas o filtro ainda não está maduro: a camada biológica precisa formar. Use água tratada ou fervida nesse período para alimentar o filtro (despeja por cima, recolhe por baixo). A partir do dia 14, o schmutzdecke está formado e o filtro remove 95% a 99% das bactérias patogênicas (E. coli, Salmonella, Vibrio cholerae) e 90% dos vírus. Capacidade: 30 a 60 litros por dia, sem energia, sem reposição de filtro.',
    ],
    praticas: [
      'Lave a areia até a água de lavagem sair completamente cristalina. Areia não lavada compromete o filtro inteiro com lama. Use peneira fina e água corrente até o líquido sair limpo após 5 enxágues seguidos.',
      'Manutenção: a cada 2 a 3 meses, faça o "swirl and dump", agite delicadamente os 2cm superiores da areia com a mão e tire a água turva. Não desmonte o filtro nunca, isso destrói a colônia biológica e exige 14 dias de re-maturação.',
      'Para garantia extra contra vírus em situação de emergência: depois do filtro biológico, faça desinfecção solar (próximo módulo) ou fervura por 1 minuto. A combinação filtro + SODIS ou fervura resolve até cólera, hepatite A e rotavírus.',
    ],
    tempo: '1 dia para montar + 14 dias para maturar',
  },
  {
    num: '04',
    titulo: 'Reuso de águas cinzas: o esgoto da pia que vira jardim',
    subtitulo: 'Água do banho, da pia e da máquina pode regar 100% do seu quintal',
    imagem: imgCinzas,
    paragrafos: [
      'Águas cinzas (greywater) são todas as águas usadas em casa que não passaram pelo vaso sanitário: pia, chuveiro, máquina de lavar, tanque. Representam 50% a 70% do esgoto doméstico, contêm sabão, gordura e fibras, mas zero patógenos fecais. Direcionadas corretamente, regam jardim, pomar e horta sem prejuízo nenhum às plantas, pelo contrário, o sabão biodegradável até serve como adubo nitrogenado leve.',
      'Sistema mais simples (laundry-to-landscape): tubulação de PVC de 50mm sai direto da máquina de lavar e desce, por gravidade, até uma vala de mulch (galhos triturados ou casca de pinus) plantada com bananeiras, taioba, helicônia ou outras plantas que adoram água. A vala filtra qualquer resíduo, as plantas absorvem nutrientes e água. Sem bomba, sem caixa, sem manutenção. Investimento: R$ 200 em PVC e conexões.',
      'Para água de chuveiro e pia (que tem mais gordura): adicione um filtro de gordura simples (caixa de PVC com tela de aço inox a 45 graus) antes da vala de mulch. Esvazie a tela 1 vez por mês. O resto do sistema é igual. Família de 4 pessoas que reutiliza cinzas reduz consumo da rede em 200 a 400 litros por dia, e mantém um pomar de bananeira, mamoeiro e helicônia florescendo sem esforço.',
    ],
    praticas: [
      'Use APENAS sabão biodegradável (à base de coco, sem sódio em excesso) na máquina e no chuveiro se for reusar. Marca de confiança: Ecover, Bioz, Sabão de coco em barra. Sabão comum salga o solo em 6 meses.',
      'Nunca direcione água cinza para verduras de folha que se comem cruas (alface, rúcula, couve). Direcione sempre para árvores frutíferas, raízes (mandioca, batata-doce) e plantas ornamentais. As frutas e raízes não absorvem o sabão.',
      'A vala de mulch trabalha sozinha por anos. Reabasteça o mulch (galhos triturados) a cada 12 meses, eles se decompõem e viram húmus, melhorando o solo embaixo. Resultado prático: 2 anos depois você tem 30cm de terra preta riquíssima onde antes era barro.',
    ],
    tempo: '1 fim de semana + 50m de PVC',
  },
  {
    num: '05',
    titulo: 'Desinfecção solar (SODIS): água potável com garrafa PET e sol',
    subtitulo: 'Validado pela OMS, UV-A e calor matam todos os patógenos em 6 horas',
    imagem: imgSodis,
    paragrafos: [
      'SODIS (Solar Water Disinfection) é o método mais barato e eficaz do mundo para desinfetar água sem energia: encha uma garrafa PET transparente com água filtrada (passou pelo filtro biológico ou por pano + filtro de papel), deite ela na horizontal sobre uma superfície reflexiva (telhado de alumínio, papel-alumínio, chapa metálica) e deixe ao sol forte por 6 horas. Os raios UV-A do sol e o calor combinados matam 99,9% das bactérias, vírus e protozoários patogênicos. Validado pela OMS e usado por 5 milhões de pessoas em mais de 50 países.',
      'A garrafa precisa ser PET transparente (a marca de reciclagem 1 dentro do triângulo, na base). Vidro deixa passar muito menos UV. A água precisa estar relativamente limpa antes (turbidez baixa, dá para enxergar pelo menos 10cm dentro): se estiver turva, faça pré-filtragem com pano de algodão dobrado em 4 camadas, ou pelo filtro biológico. A exposição mínima é de 6 horas em dia ensolarado, ou 2 dias completos se estiver nublado.',
      'Em emergência hídrica (apagão prolongado, contaminação da rede, isolamento): SODIS é seu protocolo de salvação. 30 garrafas de 1,5L expostas no telhado por 6 horas geram 45 litros de água segura por dia, suficiente para hidratação e cozimento de 4 a 6 pessoas. Custo: zero (garrafas reaproveitadas). Equipamento: nenhum. Confiabilidade: validada por décadas de uso em campo.',
    ],
    praticas: [
      'Marque cada garrafa com a data e horário de exposição com caneta permanente. Após 6h, transfira para garrafa escura ou jarra opaca para consumo (UV degrada a água armazenada se ficar exposta indefinidamente).',
      'Reaproveite cada garrafa PET por até 6 meses. Após isso o plástico começa a degradar e fica frágil, descarte e reponha. Garrafas riscadas ou opacas reduzem a eficácia, troque imediatamente.',
      'Combinação ouro: chuva captada → filtro biológico → SODIS → consumo. Você tem água potável segura sem nenhuma dependência de rede elétrica, de cloro, ou de filtro industrial. Família autônoma em água o ano inteiro.',
    ],
    tempo: '6 horas de sol',
  },
  {
    num: '06',
    titulo: 'Swales e curvas de nível: a paisagem que bebe a chuva',
    subtitulo: 'Para quem tem terreno: capture a chuva no solo antes que ela escorra para o rio',
    imagem: imgSwale,
    paragrafos: [
      'Swale é uma vala rasa cavada no contorno do terreno, seguindo a curva de nível, com a terra retirada acumulada do lado de baixo (formando uma berm, ou camalhão). Quando a chuva cai, em vez de escorrer ladeira abaixo levando o solo embora, ela é interceptada pela vala, infiltra no solo lentamente, e umidade fica retida por semanas ou meses no subsolo. É a técnica mais antiga e poderosa de armazenar água sem cisterna: você guarda no próprio solo.',
      'Construção em terreno rural ou sítio: identifique a curva de nível com mangueira d\'água de 10 a 20 metros (método A-frame, gratuito). Marque a linha com estacas. Cave uma vala de 30cm a 50cm de profundidade e 60cm a 100cm de largura, depositando a terra do lado de baixo da encosta. Plante a berm com gramíneas e árvores frutíferas (banana, manga, abacate, cacau) que vão buscar a água armazenada com as raízes profundas.',
      'Resultado em 2 a 5 anos: o lençol freático sobe localmente, nascentes que estavam secas voltam a brotar, o pomar plantado na berm produz 3 a 5 vezes mais que pomar plano sem swale, e o terreno vira esponja: aguenta 30 dias de seca sem irrigação artificial nenhuma. É a tecnologia que regenerou bacias inteiras na Austrália, Índia e Sertão brasileiro através do PISF e dos sistemas Cisternas no Semiárido.',
    ],
    praticas: [
      'A-frame caseiro custa zero: 3 ripas de madeira em forma de "A" com um peso pendurado no vértice. Quando o peso bate no centro do travessão horizontal, os dois pés estão na mesma altura. Caminha pelo terreno marcando a curva.',
      'Espace múltiplos swales paralelos a cada 5 a 15 metros de queda vertical no terreno. Quanto mais íngreme, mais próximos. Em terreno suave (até 10% de inclinação), 1 swale a cada 15m de distância vertical resolve.',
      'Plante na berm árvores frutíferas e gramíneas perenes na mesma estação que cava a vala. As raízes consolidam a estrutura e impedem erosão, e em 2 anos a infraestrutura desaparece visualmente, vira pomar.',
    ],
    tempo: '1 fim de semana por 50m de swale',
  },
  {
    num: '07',
    titulo: 'Irrigação por gravidade: água que sai sozinha quando a planta precisa',
    subtitulo: 'Cisterna elevada + mangueira gotejadora = horta irrigada sem bomba elétrica',
    imagem: imgIrrigacao,
    paragrafos: [
      'Cada metro de altura entre a cisterna e a horta gera 0,1 bar de pressão por gravidade. Cisterna elevada 3 metros (em cima de uma estrutura de madeira ou no telhado) gera 0,3 bar, pressão suficiente para alimentar até 50 metros de mangueira gotejadora ou microaspersão sem nenhuma bomba elétrica. É irrigação 100% passiva, funciona durante apagão, e a horta nunca seca enquanto houver água na cisterna.',
      'Sistema mínimo: cisterna de 500 a 1.000 litros elevada 2 a 3 metros (em palanques de eucalipto, estrutura metálica ou no telhado), tubo de PVC de 25mm descendo até a horta, derivações com registro para cada canteiro, e fitas gotejadoras de 16mm com gotejadores espaçados a cada 30cm. Investimento: R$ 300 a R$ 800 para horta de 30m². Você liga o registro de manhã, ele goteja por 2 horas (regulado pela vazão da fita), regam 3 canteiros, fecha. Sem energia, sem bomba.',
      'Programador de irrigação por gravidade existe e funciona com pilha AA: timer mecânico (R$ 80 a R$ 150) abre o registro nos horários programados e fecha sozinho. Dura 2 anos com 4 pilhas. Sua horta vira sistema autônomo: você programa rega às 6h e às 18h, e a planta recebe água nos horários certos sem você precisar estar em casa. Combinado com captação de chuva, vira ciclo fechado real: chove no telhado, enche a cisterna, gravidade leva à horta, planta cresce, você colhe.',
    ],
    praticas: [
      'Para calcular a altura mínima da cisterna: para 30m de fita gotejadora, eleve a cisterna no mínimo 1,5m. Para 50m, eleve 2,5m. Para 100m, eleve 4m ou use bomba.',
      'Use sempre filtro de disco ou tela na saída da cisterna (R$ 30 a R$ 60). Areia ou folhas entopem gotejadores em 1 mês. O filtro lava em 2 minutos e dura anos.',
      'Combine com mulch (cobertura morta de palha, capim seco ou serragem) sobre o solo da horta. Reduz evaporação em 50% a 70%. A mesma cisterna que durava 5 dias passa a durar 10 a 15.',
    ],
    tempo: '1 fim de semana para instalar',
  },
  {
    num: '08',
    titulo: 'Reserva estratégica: quanta água armazenar para emergência',
    subtitulo: 'A regra dos 3-3-3: 3 litros por dia por pessoa, 3 semanas de autonomia',
    imagem: imgCaptacao,
    paragrafos: [
      'A recomendação clássica de 4 litros por pessoa por dia em emergência (2 para hidratação, 2 para higiene básica e cozimento) sustenta uma pessoa em modo conservativo. Para família de 4 pessoas com 21 dias de autonomia (cobrindo apagão prolongado, contaminação da rede, isolamento por enchente ou crise logística), são 336 litros mínimos armazenados, separados do sistema doméstico normal. Em uma única caixa d\'água de 500L você cobre 30 dias de autonomia para uma família.',
      'Armazenamento correto: água potável (filtrada e desinfectada por SODIS ou cloro 0,002%) em recipientes opacos (azuis ou pretos, blocando luz que faz alga crescer), com tampa hermética, mantidos em local fresco entre 15 e 25 graus. Trocar a cada 6 meses (despeja na horta, enche de novo). Galões de 20L empilháveis (R$ 35 cada) são a opção urbana mais prática: 17 galões empilhados num canto da despensa equivalem a 340L de reserva ocupando 1m² de chão.',
      'A reserva estratégica não é luxo: é o que separa quem aguenta uma crise hídrica de 3 semanas com tranquilidade de quem entra em pânico após 48 horas. Eventos reais documentados nos últimos 10 anos no Brasil incluem: crise hídrica de SP em 2014-2015 (pressão zero por dias inteiros em bairros inteiros), enchente do Rio Grande do Sul em 2024 (água da rede contaminada por esgoto por semanas), apagões de Manaus, Macapá e Amapá (sem energia para bombear água por 22 dias em 2020). A reserva é seguro, não paranoia.',
    ],
    praticas: [
      'Cálculo mínimo de reserva: 4 litros x número de pessoas x dias de autonomia desejada. Família de 4 com 21 dias = 336 litros. Família de 6 com 30 dias = 720 litros (1 caixa d\'água ou 2 cisternas pequenas).',
      'Rotação semestral: marque na agenda do celular trocar a água a cada 6 meses. A água velha vai para o jardim ou descarga (não desperdiça). Reabasteça com água filtrada + 2 gotas de cloro 2,5% por litro (ou faça SODIS).',
      'Mantenha sempre 10 garrafas PET de 1,5L cheias e prontas para SODIS. Em emergência você consegue gerar mais 15L de água segura por dia só com sol e telhado, complementando a reserva por tempo indefinido.',
    ],
    tempo: '1 tarde para montar reserva inicial',
  },
];

const armadilhas = [
  { titulo: 'Captar de telhado de amianto', desc: 'Telhas de amianto liberam fibras cancerígenas na água. Substitua antes de captar para consumo, ou use só para regar plantas ornamentais (não comestíveis). Telha cerâmica, metal e fibrocimento sem amianto são seguras.' },
  { titulo: 'Esquecer o first-flush', desc: 'A primeira água da chuva carrega poeira, fezes de pássaro e sujeira do telhado. Sem o dispositivo de descarte, essa sujeira contamina sua cisterna inteira em 1 chuva. First-flush de 20L é obrigatório.' },
  { titulo: 'Cisterna sem tampa hermética', desc: 'Cisterna aberta vira criadouro de Aedes aegypti em 7 dias. Tampe sempre com tela mosquiteiro fina (1mm) e tampa rígida. Inspeção visual mensal é mandatória.' },
  { titulo: 'Reuso de cinzas com sabão comum', desc: 'Sabão de roupa convencional contém sódio e fosfatos que salinizam o solo em 6 a 12 meses, matando as plantas. Use só sabão biodegradável (coco, ecológico).' },
  { titulo: 'Beber água de filtro biológico sem maturação', desc: 'Filtro novo (menos de 14 dias de uso) ainda não tem a camada biológica formada. Não confie nele para água potável até completar 2 semanas. Use água tratada nesse período.' },
  { titulo: 'Garrafa PET reutilizada por mais de 6 meses no SODIS', desc: 'Após 6 meses de exposição solar, o PET começa a liberar microplásticos e antimônio na água. Troque as garrafas a cada semestre, custa zero, vidas valem mais.' },
];

const faq = [
  {
    q: 'Funciona em apartamento, ou é só para sítio e casa com quintal?',
    a: 'Funciona em apartamento, com adaptações. Captação de chuva: barril de 100L na varanda capta a chuva da própria varanda (suficiente para regar plantas e lavar piso por meses). Filtro biológico de bancada: versão pequena em garrafão de 20L cabe debaixo da pia. SODIS: 6 garrafas PET na varanda ensolarada geram 9L de água segura por dia. Reserva estratégica: 17 galões empilháveis ocupam 1m² do canto da despensa e dão 30 dias de autonomia. Reuso de cinzas é o único módulo que exige obra (mas vale para casas geminadas, sobrados e cobertura).',
  },
  {
    q: 'É legalizado? Posso ter problema com a prefeitura ou companhia de água?',
    a: 'Captação de chuva é incentivada por lei em SP, Curitiba, Florianópolis, Porto Alegre, Belo Horizonte e dezenas de outras cidades. Algumas oferecem desconto no IPTU. Reuso de águas cinzas é regulamentado pela NBR 13969 e permitido em todo o país. Filtro biológico, SODIS e reserva estratégica são uso doméstico e não requerem autorização nenhuma. Em nenhum cenário você terá problema com a companhia de água, pelo contrário, você reduz a sobrecarga da rede.',
  },
  {
    q: 'Quanto custa montar todo o sistema?',
    a: 'Sistema completo para casa de 100m²: captação de chuva com cisterna 1000L (R$ 1.200), filtro biológico em barril 200L (R$ 350), reuso de cinzas com vala de mulch e PVC (R$ 250), irrigação por gravidade com timer mecânico (R$ 600), reserva estratégica de 340L em galões (R$ 600). Total: R$ 3.000 que se paga em 24 a 36 meses só pela redução da conta de água. Para apartamento, o investimento cai para R$ 400 a R$ 800 (filtro de bancada, SODIS, reserva em galões, barril de varanda).',
  },
  {
    q: 'Quanto tempo leva para a família ficar autônoma em água?',
    a: 'Autonomia parcial em 1 fim de semana (reserva estratégica + SODIS já te dão 30 dias de autonomia em emergência). Autonomia operacional em 1 mês (captação de chuva + filtro maturado + reuso de cinzas). Autonomia plena com regeneração da paisagem (swales + irrigação por gravidade + ciclo fechado) em 6 a 24 meses, dependendo do tamanho do projeto. A maioria das famílias urbanas atinge 50% de redução do consumo da rede em 90 dias.',
  },
  {
    q: 'A água de chuva é segura para tomar banho e lavar roupa sem tratamento?',
    a: 'Sim, desde que tenha passado pelo first-flush e por filtro de tela na entrada da cisterna. Água de chuva é naturalmente macia (sem cálcio), o que economiza sabão e melhora muito o cabelo e a pele em comparação com água da rede. Para descarga, lavar carro, lavar quintal e regar plantas, vai sem tratamento nenhum. Para beber e cozinhar, sempre passe pelo filtro biológico e SODIS ou fervura.',
  },
  {
    q: 'E se eu morar em região de seca? Vale a pena captar chuva mesmo assim?',
    a: 'Vale ainda mais. No semiárido nordestino com 600mm/ano, telhado de 100m² capta 48 mil litros/ano. Esse volume, armazenado em cisterna de 16 mil litros (programa Cisternas no Semiárido), garante água potável para família de 5 pessoas durante toda a estiagem. Em região de seca, captar chuva não é opcional, é a única solução estruturalmente sustentável. Mais de 1,2 milhão de cisternas já foram instaladas no Sertão por esse método.',
  },
  {
    q: 'O que faço se a luz cair por uma semana e a bomba da rua parar?',
    a: 'Se você tem reserva estratégica (336L mínimos), está coberto por 21 dias para 4 pessoas. Se tem captação de chuva com cisterna cheia (1000L), está coberto por mais 60 dias. Se tem filtro biológico maturado, processa 30L/dia de qualquer fonte de água (rio, poço, tanque público, chuva nova). Se tem SODIS pronto, gera 15L/dia adicionais. Cumulativo: você opera com tranquilidade por 90+ dias sem rede elétrica nem rede de água. É o que o Kit 72h pretende cobrir nas primeiras 72h, esse manual estende para meses.',
  },
  {
    q: 'Por onde começar se eu nunca fiz nada disso?',
    a: 'Comece pela auditoria (módulo 01): mede o consumo por 7 dias e identifica os 3 maiores gastos. Em paralelo, monte a reserva estratégica (módulo 08): 17 galões de 20L na despensa em 1 tarde. Esses dois passos custam menos de R$ 700 e te dão imediatamente o conhecimento e o seguro mínimo. Depois, no segundo mês, instale captação de chuva com 1 barril de 200L. No terceiro mês, monte o filtro biológico. Em 90 dias você está rodando o sistema completo em escala inicial.',
  },
];

export default function GestaoAguaMicro() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.page }}>
      <SeoHead
        custom={{
          title: 'Gestão de Água em Escala Micro: Captação, Filtragem e Reuso | Soberania Hídrica',
          description: 'Manual prático para captação de chuva, filtro biológico de areia, reuso de águas cinzas, desinfecção solar (SODIS), swales e irrigação por gravidade. Sistema doméstico de água autônomo da rede elétrica para iniciantes.',
          canonical: 'https://soberania.app/soberania-organica/gestao-agua-micro',
        }}
      />
      <BackToHome />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Água da chuva caindo de calha em barril azul de captação ao entardecer"
            width={1920}
            height={1080}
            fetchPriority="high"
            className="w-full h-full object-cover" loading="lazy" decoding="async" />
          {/* Apenas darken plano para legibilidade. Sem fade artístico. */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(8,16,24,0.38)' }} />
        </div>

        <div className="relative max-w-[1500px] mx-auto px-6 md:px-16 pb-20 md:pb-32 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="font-mono text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: C.oceanSoft }}
          >
            Soberania Hídrica · Manual para iniciantes
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.2 }}
            className="font-black leading-[0.92] mb-10 max-w-5xl"
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.75rem, 8.5vw, 7.5rem)',
              color: '#eaf3fa',
              textShadow: '0 4px 24px rgba(0,0,0,0.7)',
            }}
          >
            Água da chuva é sua.<br />
            <em style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700, color: C.oceanSoft, textShadow: '0 0 40px hsl(198 70% 38% / 0.6), 0 4px 24px rgba(0,0,0,0.8)' }}>
              A concessionária só cobra
            </em>{' '}o que você esquece de captar.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.4 }}
            className="text-lg md:text-2xl max-w-3xl leading-relaxed"
            style={{ color: '#d9e6f0', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            A mesma lógica do Bitcoin aplicada ao recurso mais essencial: tirar da custódia,
            guardar em casa, depender de ninguém. Captação de chuva, filtro biológico, reuso
            de cinzas e desinfecção solar. Reduz 50 a 90% da conta, opera 90 dias sem energia,
            sobrevive a qualquer racionamento decretado por concessionária ou Estado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: C.oceanSoft }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Role para começar</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* PROVOCAÇÃO */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.ocean}>
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div {...fade()} className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.ocean }}>
                Manifesto · Auto-custódia hídrica
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
                Quem controla sua torneira{' '}
                <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.ocean }}>
                  controla sua família.
                </em>
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                Caixa d\'água da maioria das casas urbanas dura dois dias. Quarenta e oito
                horas é todo o colchão entre você e a sede absoluta. Concessionária faz
                manutenção sem aviso, racionamento vira política pública, escassez vira
                preço, e o cidadão obediente espera com balde na mão.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                Captar chuva é o equivalente hídrico de tirar Bitcoin da exchange. Você
                deixa de pedir permissão para beber, deixa de pagar pela mesma água que
                cai de graça do céu, e blinda a família contra qualquer interrupção.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: C.ink }}>
                Soberania não é luxo: é não depender de quem pode te cortar.
              </p>
            </div>
            <div className="md:col-span-5">
              <motion.div {...fade(0.15)} className="relative">
                <img
                  src={imgCaptacao}
                  alt="Sistema completo de captação de chuva em telhado com cisternas conectadas"
                  width={1600} height={1200}
                  loading="lazy"
                  className="w-full h-auto rounded-sm"
                  style={{ boxShadow: '0 40px 80px -20px hsl(210 38% 14% / 0.5)' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PILARES */}
      {pilares.map((p, i) => {
        const bgs = [sectionBg.sky, sectionBg.storm, sectionBg.rain, sectionBg.ocean, sectionBg.storm, sectionBg.sky, sectionBg.rain, sectionBg.ocean];
        const isDark = i === 1 || i === 4;
        const sectionBgStyle = bgs[i];
        const reverse = i % 2 === 1;
        const textColor = isDark ? '#eaf3fa' : C.ink;
        const bodyColor = isDark ? '#c5d3e0' : C.body;
        const accentColor = isDark ? C.oceanSoft : C.ocean;
        const labelColor = isDark ? C.oceanSoft : C.ocean;

        return (
          <section key={p.num} className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBgStyle}>
            <div className="max-w-[1500px] mx-auto relative">
              <div className={`grid md:grid-cols-12 gap-12 md:gap-20 items-start ${reverse ? 'md:[direction:rtl]' : ''}`}>
                <motion.div {...fade()} className="md:col-span-7 md:[direction:ltr]">
                  <img
                    src={p.imagem}
                    alt={p.titulo}
                    width={1600} height={1200}
                    loading="lazy"
                    className="w-full h-auto rounded-sm sticky top-24"
                    style={{ boxShadow: isDark ? '0 40px 80px -20px rgba(0,0,0,0.7)' : '0 40px 80px -20px hsl(210 38% 14% / 0.45)' }}
                  />
                </motion.div>
                <motion.div {...fade(0.15)} className="md:col-span-5 md:[direction:ltr]">
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
                      textShadow: isDark ? '0 0 24px hsl(198 70% 38% / 0.4)' : 'none',
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
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.sky}>
        <div className="max-w-[1500px] mx-auto relative">
          <motion.div {...fade()} className="text-center max-w-4xl mx-auto mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.ocean }}>
              <AlertTriangle className="inline w-4 h-4 mr-2 -mt-1" />
              Erros que comprometem o sistema todo
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
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.ocean }}>
                contaminam
              </em>{' '}
              o esforço inteiro.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {armadilhas.map((a, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.05)}
                className="p-10 rounded-sm transition-all duration-500 hover:-translate-y-2"
                style={{
                  backgroundColor: 'hsl(206 32% 96% / 0.92)',
                  border: '1px solid hsl(206 14% 72% / 0.6)',
                  boxShadow: '0 20px 50px -20px hsl(210 38% 14% / 0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="font-mono text-sm font-bold" style={{ color: C.ocean }}>0{i + 1}</span>
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
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.storm}>
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fade()} className="text-center mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.oceanSoft }}>
              <Droplets className="inline w-4 h-4 mr-2 -mt-1" />
              Perguntas honestas, respostas diretas
            </p>
            <h2
              className="font-black leading-[0.95]"
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 6vw, 5rem)',
                color: '#eaf3fa',
              }}
            >
              O que todo iniciante{' '}
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.oceanSoft, textShadow: '0 0 32px hsl(198 70% 38% / 0.6)' }}>
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
                  border: '1px solid hsl(198 70% 38% / 0.2)',
                  backgroundColor: 'hsl(210 22% 20% / 0.7)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-7 md:p-9 flex justify-between items-start gap-6 transition-colors hover:bg-white/5"
                >
                  <span
                    className="text-lg md:text-xl font-bold leading-snug"
                    style={{ fontFamily: '"Inter Tight", sans-serif', color: '#eaf3fa' }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    className="w-6 h-6 flex-shrink-0 mt-1 transition-transform duration-500"
                    style={{
                      color: C.oceanSoft,
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
                    <p className="text-base md:text-lg leading-relaxed" style={{ color: '#c5d3e0' }}>
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
      <section className="relative py-32 md:py-44 px-6 md:px-16 overflow-hidden" style={sectionBg.rain}>
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div {...fade()}>
            <ShieldCheck className="w-12 h-12 mx-auto mb-10" style={{ color: C.ocean }} />
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.ocean }}>
              A casa que bebe do próprio céu
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
              Concessionária é conveniência.<br />
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.ocean }}>
                Captar a própria água
              </em>
              <br />é soberania.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: C.body }}>
              Comece pela auditoria nesta semana. No mês que vem instale o primeiro
              barril de captação. Em três meses você opera 50% sem rede. Em um ano,
              90 dias de autonomia hídrica completa, da chuva à xícara, sem nenhuma
              dependência da concessionária.
            </p>
          </motion.div>
        </div>
      </section>

      <RelatedHooks
        tema="light"
        titulo="A trilha completa da soberania doméstica"
        subtitulo="Água é a base. Estes módulos formam a infraestrutura completa para quem quer reduzir dependência da cidade ou se preparar para sair para o campo."
        hooks={[
          {
            titulo: 'Kit 72h',
            descricao: 'A primeira camada de proteção. Mochila e despensa prontas para 72 horas de autonomia imediata em qualquer crise.',
            rota: '/soberania-organica/kit-72h',
            selo: 'Comece aqui',
          },
          {
            titulo: 'Purificação de Água',
            descricao: 'Aprofundamento técnico em métodos de purificação de emergência: cloro, fervura, filtros químicos e mecânicos.',
            rota: '/soberania-organica/purificacao-agua',
          },
          {
            titulo: 'Preservação Ancestral',
            descricao: 'A água que você captou e filtrou vai cozinhar e hidratar suas conservas. Despensa autônoma para 6 meses sem geladeira.',
            rota: '/soberania-organica/preservacao-ancestral',
          },
          {
            titulo: 'Aquaponia Residencial',
            descricao: 'Sistema de água e proteína integrados: peixes, vegetais e ciclo fechado. A água da aquaponia consome 90% menos que horta tradicional.',
            rota: '/soberania-organica/aquaponia-residencial',
          },
          {
            titulo: 'Autonomia Energética',
            descricao: 'A bomba para elevar água da cisterna ou do poço pode rodar com painel solar dedicado. Sistema completo de energia para a casa autônoma.',
            rota: '/soberania-organica/autonomia-energetica',
          },
          {
            titulo: 'Refúgio Rural Tático',
            descricao: 'Pensa em sair da cidade? Este é o protocolo de avaliação, escolha e estruturação do refúgio rural com base nos sistemas autônomos.',
            rota: '/soberania-organica/refugio-rural',
          },
        ]}
      />
    </div>
  );
}