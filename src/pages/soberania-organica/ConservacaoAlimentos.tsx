import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, AlertTriangle, ShieldCheck, Archive } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import RelatedHooks from '@/components/RelatedHooks';
import heroImg from '@/assets/conservacao/conservacao-hero.jpg';
import imgFermentacao from '@/assets/conservacao/conservacao-fermentacao.jpg';
import imgSolar from '@/assets/conservacao/conservacao-solar.jpg';
import imgEletrica from '@/assets/conservacao/conservacao-eletrica.jpg';
import imgCura from '@/assets/conservacao/conservacao-cura.jpg';
import imgDefumacao from '@/assets/conservacao/conservacao-defumacao.jpg';
import imgCanning from '@/assets/conservacao/conservacao-canning.jpg';
import imgVacuo from '@/assets/conservacao/conservacao-vacuo.jpg';
import imgCongelamento from '@/assets/conservacao/conservacao-congelamento.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

// Paleta sand + amber + clay (clara, padrão Jurisdições aprovado)
const C = {
  sand: 'hsl(36 32% 92%)',
  sandDeep: 'hsl(34 26% 86%)',
  cream: 'hsl(38 36% 96%)',
  ink: 'hsl(28 34% 14%)',
  body: 'hsl(28 18% 30%)',
  muted: 'hsl(28 12% 46%)',
  amber: 'hsl(28 72% 42%)',
  amberSoft: 'hsl(32 60% 64%)',
  ember: 'hsl(18 64% 40%)',
  line: 'hsl(28 14% 76%)',
};

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.30  0 0 0 0 0.22  0 0 0 0 0.14  0 0 0 0 0.45 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const sectionBg = {
  sand: {
    backgroundColor: C.sand,
    backgroundImage: [
      'radial-gradient(ellipse 65% 55% at 6% 14%, hsl(34 50% 84% / 0.7), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 92% 86%, hsl(28 60% 70% / 0.22), transparent 55%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(36 32% 93%), hsl(34 26% 86%))',
    ].join(','),
    backgroundSize: 'auto, auto, 200px 200px, auto',
  },
  cream: {
    backgroundColor: C.cream,
    backgroundImage: [
      'radial-gradient(ellipse 70% 55% at 14% 22%, hsl(38 60% 92% / 0.8), transparent 50%)',
      'radial-gradient(ellipse 60% 50% at 88% 78%, hsl(28 60% 72% / 0.18), transparent 55%)',
      noiseSvg,
      'linear-gradient(180deg, hsl(38 36% 96%), hsl(36 30% 90%))',
    ].join(','),
    backgroundSize: 'auto, auto, 200px 200px, auto',
  },
};

interface Metodo {
  num: string;
  nome: string;
  imagem: string;
  contexto: string;
  validade: string;
  custo: string;
  energia: string;
  passos: string[];
  alimentos: string;
  riscos: string;
}

const METODOS: Metodo[] = [
  {
    num: '01',
    nome: 'Fermentação Láctica',
    imagem: imgFermentacao,
    contexto: 'Conservação ancestral por bactérias do gênero Lactobacillus em ambiente anaeróbico salgado. Não exige energia elétrica nem cocção. Aumenta biodisponibilidade de nutrientes, gera probióticos vivos, preserva enzimas.',
    validade: '6 a 24 meses em ambiente fresco e escuro. Após aberto, 2 a 6 meses sob refrigeração.',
    custo: 'USD 0,30 a 0,80 por litro produzido. Pote de vidro reutilizável + sal grosso + vegetal.',
    energia: 'Zero. Apenas temperatura ambiente entre 18 e 24 °C nos primeiros 7 a 14 dias.',
    passos: [
      'Selecione vegetais firmes e frescos: repolho, cenoura, beterraba, pepino, rabanete, pimentão, gengibre, alho. Lave bem mas não esterilize, as bactérias selvagens da casca são parte do processo.',
      'Calcule a salmoura: 2 a 3 % de sal sobre o peso total do vegetal. Para 1 kg de repolho, use 20 a 30 g de sal grosso sem iodo (sal refinado iodado inibe a fermentação).',
      'Macere ou triture o vegetal misturado ao sal por 10 a 15 minutos. Para vegetais inteiros, prepare salmoura líquida na mesma proporção: 30 g de sal por litro de água filtrada.',
      'Empacote firme em pote de vidro de boca larga, eliminando bolhas de ar. Pressione até o líquido cobrir totalmente. Use peso (pedra esterilizada, saquinho de água, disco de fermentação) para manter submerso.',
      'Cubra com pano respirável ou tampa com airlock. Mantenha em local escuro, 18 a 24 °C. Verifique diariamente nos primeiros 3 dias para liberar gás. Pronto entre 7 e 21 dias dependendo da temperatura.',
      'Após o gosto desejado (azedo limpo, crocância preservada), transfira para refrigerador ou despensa fresca. Fermentação não para, apenas desacelera dramaticamente.',
    ],
    alimentos: 'Repolho (chucrute, kimchi), pepino (picles fermentados), beterraba, cenoura, rabanete, alho preto, pimenta (molho fermentado), missô, kombuchá, kefir, iogurte tradicional.',
    riscos: 'Mofo branco na superfície é parte do processo (kahm yeast), retire e prossiga. Mofo colorido (verde, preto, rosa, azul) ou cheiro pútrido descarte tudo. Salmoura insuficiente (abaixo de 1,5 %) gera proliferação de Clostridium botulinum em vegetais não ácidos. Nunca abaixe de 2 %.',
  },
  {
    num: '02',
    nome: 'Desidratação Solar',
    imagem: imgSolar,
    contexto: 'Método mais antigo registrado, usado por povos indígenas, beduínos e andinos. Energia solar gratuita, zero infraestrutura elétrica. Funciona em climas quentes, secos e ventilados. Depende de luz e ausência de chuva.',
    validade: '6 meses a 2 anos em recipientes vedados ao abrigo de luz e umidade.',
    custo: 'USD 30 a 80 para construir secador solar caseiro com madeira, vidro e tela mosquiteira inox.',
    energia: 'Zero elétrica. Sol direto por 5 a 8 horas/dia durante 2 a 5 dias.',
    passos: [
      'Construa o secador solar: caixa de madeira (60 x 40 x 15 cm), pintada de preto fosco interno, tampa de vidro inclinada 30°, telas de mosquiteiro inox empilhadas em 2 a 3 níveis com espaçamento de 4 cm. Aberturas inferior (entrada de ar) e superior (saída de vapor).',
      'Selecione alimentos maduros e firmes. Lave, descasque se necessário e fatie em espessura uniforme: frutas em 4 a 6 mm, vegetais em 3 a 5 mm, carne em tiras finas de 4 a 6 mm.',
      'Pré-tratamento opcional: frutas (mergulho rápido em água com limão evita escurecimento), vegetais (branqueamento de 2 min em água fervente preserva cor e vitaminas), carne (marinada com sal, pimenta, alho por 6 a 12 h).',
      'Distribua sem sobreposição nas telas. Mantenha o secador exposto ao sol entre 9h e 16h, com inclinação seguindo o sol. Recolha à noite para evitar reabsorção de umidade.',
      'Verifique progressivamente: frutas devem ficar coriáceas e flexíveis (sem umidade ao apertar). Vegetais quebradiços. Carne (jerky) seca, dobrável sem rachar. Tempo: 2 a 5 dias dependendo de umidade ambiente.',
      'Armazene em vidro vedado com sachê absorvente (ou um grão de arroz) ao abrigo de luz. Para conservação máxima, embale a vácuo após estabilização de 24 h em ambiente fechado.',
    ],
    alimentos: 'Frutas (banana, manga, abacaxi, uva, maçã), vegetais (tomate, cebola, pimentão, abobrinha, ervas), carne magra (jerky bovino, peixe, frango). Evite alimentos gordurosos, gordura ranço rapidamente.',
    riscos: 'Umidade residual acima de 10 % gera mofo. Insetos: tela mosquiteiro fina é obrigatória. Carne mal seca proporciona crescimento de Salmonella e E. coli, alcance temperatura interna mínima de 71 °C antes de iniciar secagem.',
  },
  {
    num: '03',
    nome: 'Desidratação Elétrica',
    imagem: imgEletrica,
    contexto: 'Versão controlada com temperatura constante e ventilação forçada. Reduz tempo de 5 dias para 6 a 24 horas. Independência de clima. Custo elétrico baixo.',
    validade: '1 a 3 anos em embalagem vedada com absorvente de oxigênio.',
    custo: 'USD 80 a 350 (desidratador 5 a 10 bandejas). Operação: USD 0,15 a 0,40 por kg processado.',
    energia: 'Elétrica. Consumo: 300 a 800 W por 6 a 12 h em ciclo típico.',
    passos: [
      'Equipamento recomendado: desidratador com ventilação horizontal forçada (Excalibur, Cosori), termostato regulável de 35 a 75 °C e timer.',
      'Temperatura por categoria: ervas (35 a 40 °C), frutas (55 a 60 °C), vegetais (50 a 55 °C), carne (60 a 70 °C). Temperaturas mais altas selam a superfície e impedem a saída de umidade interna.',
      'Espessura uniforme é crítica. Use mandolin ou faca afiada. Variação acima de 2 mm gera diferença de tempo de secagem e produto inconsistente.',
      'Não sobreponha. Espaço de 3 a 5 mm entre fatias para circulação do ar. Rode bandejas a cada 2 a 3 h em desidratadores com ventilação vertical.',
      'Teste de finalização: frutas devem dobrar sem quebrar, vegetais quebradiços, carne quebradiça mas elástica. Resfrie em ambiente fechado por 24 h antes de embalar para igualar umidade.',
      'Armazene em sacos plásticos foil (mylar) com absorvente de oxigênio (oxygen absorber) e sachê de sílica. Vida útil: 3 a 5 anos para grãos e leguminosas em preparação, 1 a 2 anos para frutas e vegetais.',
    ],
    alimentos: 'Tudo que vai no solar com qualidade superior: cogumelos, beef jerky, salmão defumado parcial, banana chips, morango, ervas finas, sopas instantâneas (caldo desidratado), frutas para granola, milho cozido para reidratação.',
    riscos: 'Temperatura insuficiente (abaixo de 50 °C) gera ambiente ideal para Salmonella em carnes. Embalagem sem oxygen absorber permite oxidação e perda de cor, aroma e nutrientes em 6 a 12 meses.',
  },
  {
    num: '04',
    nome: 'Salga e Cura',
    imagem: imgCura,
    contexto: 'Método milenar de remoção de água por osmose. O sal puro inibe a maioria dos microrganismos. Curas com nitrato e nitrito (sal de cura rosa #1 e #2) eliminam Clostridium botulinum em embutidos e presuntos.',
    validade: '6 meses a vários anos. Bacalhau seco salgado: 1 a 2 anos. Presunto cru tipo Parma: 18 a 36 meses.',
    custo: 'USD 0,50 a 2 por kg processado. Sal grosso, sal de cura, especiarias. Câmara de cura é opcional.',
    energia: 'Zero a baixa. Câmara de cura controlada: 50 W contínuos.',
    passos: [
      'Salga seca: cubra completamente o alimento (peixe, carne, vegetal) com sal grosso sem iodo. Proporção: 30 a 50 % do peso do alimento. Empilhe em recipiente perfurado para drenagem do líquido extraído.',
      'Salga úmida (salmoura): mergulhe em solução de 18 a 25 % de sal por 6 a 48 h dependendo da espessura. Acelera o processo, gera produto mais uniforme.',
      'Cura curta (5 a 10 dias): bacon, salmão gravlax, peito de pato (magret). Use sal de cura #1 (cloreto de sódio + nitrito de sódio 6,25 %) na proporção exata de 2,5 g por kg de carne.',
      'Cura longa (semanas a meses): presunto cru, copa, lombo curado. Sal de cura #2 (cloreto + nitrito + nitrato) em proporção 2,5 g/kg. Câmara controlada: 12 a 16 °C, 70 a 85 % UR, ventilação suave.',
      'Lavagem e secagem: após cura, lave em água fria, seque com pano. Pendure em ambiente fresco e ventilado para perda de água adicional (30 a 40 % do peso original) durante 2 a 12 meses.',
      'Armazene fatiado a vácuo ou inteiro envolto em pano de algodão em despensa fresca. Bacon defumado/curado: 6 meses refrigerado, 1 a 2 anos congelado. Presunto cru inteiro: indefinido em ambiente correto.',
    ],
    alimentos: 'Bacalhau (cura por 7 a 30 dias), carne seca brasileira (charque), bacon, presunto cru (Parma, Serrano, prosciutto), copa, peito de pato, salmão gravlax, anchovas em sal, ovos curados em gema.',
    riscos: 'Subdosagem de nitrito em embutido fechado: risco extremo de botulismo (Clostridium botulinum, toxina mortal em 1 mcg). Use balança de precisão 0,1 g e siga proporções exatas. Nunca improvise sal de cura. Compre em fornecedor especializado.',
  },
  {
    num: '05',
    nome: 'Defumação',
    imagem: imgDefumacao,
    contexto: 'Combinação de calor controlado, fumaça antibacteriana (compostos fenólicos) e desidratação parcial. Defumação a frio (15 a 30 °C) preserva, defumação a quente (60 a 90 °C) cozinha e preserva.',
    validade: 'Defumação a frio (após cura): 2 a 6 meses refrigerado, 1 a 2 anos congelado. Defumação a quente: 1 a 2 semanas refrigerado.',
    custo: 'USD 100 a 600 (defumador caseiro). Lenha de qualidade: USD 5 a 20 por kg.',
    energia: 'Madeira/serragem como combustível principal. Termômetro digital para controle.',
    passos: [
      'Pré-cura obrigatória para defumação a frio: salga seca ou salmoura por 8 a 48 h conforme tipo. Sem cura prévia, alimento estraga durante o processo.',
      'Tipos de madeira: nogueira (pecan, hickory) para carnes vermelhas, macieira/cerejeira para aves e peixes brancos, carvalho neutro para tudo, ipê para sabor brasileiro intenso. Evite madeiras resinosas (pinus, eucalipto cru) que geram fumaça tóxica.',
      'Defumação a frio (15 a 30 °C): gerador de fumaça externo conectado por duto, separando fonte de calor da câmara. Tempo: 6 a 24 h, em ciclos de 4 a 6 h por dia, com pausa para evitar acúmulo excessivo de fenóis.',
      'Defumação a quente (60 a 90 °C): caixa única com fonte de calor e madeira na base. Termômetro de sonda no centro da peça. Tempo: 3 a 8 h até alcançar temperatura interna segura: 71 °C frango, 63 °C carne, 71 °C porco moído, 60 °C peixe.',
      'Resfriamento controlado: deixe descansar em ambiente fresco por 12 a 24 h após defumação para estabilizar sabor e textura. Não corte quente, perde umidade.',
      'Armazene a vácuo refrigerado ou congelado. Defumação não é conservação completa em alimentos frescos, é etapa adicional após cura.',
    ],
    alimentos: 'Salmão, truta, bacon, costela suína, peito de peru, presunto cozido tipo bratwurst, queijo (defumação a frio em <25 °C), pimentão (paprica defumada artesanal), sal e pimenta defumados.',
    riscos: 'Defumação a frio em alimento sem cura prévia gera Listeria e Salmonella. Madeira tratada quimicamente (compensado, móvel descartado, MDF) libera formaldeído e dioxinas cancerígenas. Use exclusivamente madeira limpa de fornecedor culinário.',
  },
  {
    num: '06',
    nome: 'Conservas Pressurizadas (Canning)',
    imagem: imgCanning,
    contexto: 'Esterilização térmica em recipientes vedados sob pressão. Único método doméstico que destrói esporos de Clostridium botulinum em alimentos pouco ácidos (carne, vegetais, sopas).',
    validade: '1 a 5 anos em local fresco, escuro e seco. Carne: 2 a 5 anos. Vegetais: 1 a 3 anos.',
    custo: 'USD 200 a 500 (panela de pressão para canning de boca larga). Frascos Mason: USD 1 a 3/unidade reutilizáveis.',
    energia: 'Elétrica/gás. Operação intensa por 60 a 90 min por ciclo.',
    passos: [
      'Equipamento essencial: panela de pressão calibrada para canning (não pressão comum), frascos Mason de boca larga ou estreita, tampas de duas peças (anel + disco com selo), pinça para frascos quentes, funil largo, manômetro calibrado anualmente.',
      'Esterilize frascos: ferver por 10 min ou ciclo completo no lava-louças com calor alto. Mantenha quentes até preencher.',
      'Preparação do alimento: cozinhe parcialmente carne ou vegetal. Encha frasco quente deixando 2 a 3 cm de espaço livre na borda. Adicione sal não iodado se desejado (1 colher de chá por litro). Limpe a borda com pano úmido.',
      'Posicione tampa e anel sem apertar excessivamente (apenas firmeza de dedos). Coloque frascos na panela com 2 a 3 cm de água no fundo + grade de apoio. Não submerja frascos.',
      'Pressurize: 11 PSI para altitudes <300 m (10 lb), 12 PSI 300 a 600 m, 13 PSI 600 a 900 m. Tempo: vegetais 25 a 90 min, carne 75 a 90 min, sopas 60 a 75 min. Consulte tabelas USDA específicas por alimento.',
      'Resfriamento natural: deixe a pressão cair sozinha (45 a 60 min). Nunca abra panela ainda quente. Após retirar frascos, descanse por 24 h em pano. Verifique selagem: tampa côncava firme e sem flexibilidade ao apertar.',
    ],
    alimentos: 'Carne bovina e suína em cubos, frango desossado, ensopados, sopas (sem laticínios e sem amido), feijão cozido, milho, ervilha, cenoura, batata, cogumelos, caldo de osso, pasta de tomate concentrada.',
    riscos: 'Botulismo é a ameaça #1. Sintomas surgem 12 a 36 h após ingestão: visão turva, dificuldade de fala, paralisia descendente, morte por insuficiência respiratória. Frasco com tampa abaulada, líquido turvo, gás ao abrir, cheiro estranho: descarte sem provar. Nunca use banho-maria comum para alimentos pouco ácidos.',
  },
  {
    num: '07',
    nome: 'Embalagem a Vácuo',
    imagem: imgVacuo,
    contexto: 'Remoção de oxigênio em embalagem vedada. Não é conservação por si só, é multiplicador de validade dos outros métodos. Reduz oxidação, queimaduras de freezer e proliferação de bactérias aeróbicas.',
    validade: 'Multiplica em 3 a 5x a validade do método base. Carne fresca refrigerada: 5 a 7 dias vs 2 dias. Carne congelada: 2 a 3 anos vs 6 meses. Café em grão: 12 meses vs 3 meses.',
    custo: 'USD 80 a 400 (seladora doméstica). Sacos texturizados: USD 0,15 a 0,40/unidade.',
    energia: 'Baixíssima. 200 a 500 W por 30 a 60 segundos por ciclo.',
    passos: [
      'Selecione seladora a vácuo: modelos externos (FoodSaver, Anova) para uso doméstico, modelos de câmara (chamber sealer) para grandes volumes ou líquidos.',
      'Saco compatível: texturizado (canais permitem aspiração), espessura mínima 90 microns. Sacos lisos comuns não funcionam em seladoras externas.',
      'Pré-congele líquidos e alimentos macios (sopas, frutas vermelhas) por 1 h antes de selar. Caso contrário, vácuo suga líquido e contamina selo.',
      'Posicione alimento no saco deixando 7 a 10 cm livres na boca. Limpe a borda interna do saco antes de selar (gordura ou umidade impedem selo perfeito).',
      'Acione vácuo + selo. Verifique selagem com inspeção visual: linha de selo contínua e firme, sem dobras ou bolhas.',
      'Combine com refrigeração ou congelamento para máxima validade. A vácuo em temperatura ambiente: apenas para alimentos secos (cereais, café, ervas, jerky, biscoitos).',
    ],
    alimentos: 'Carne, peixe, queijo curado, café, café verde, ervas secas, jerky, frutas desidratadas, sementes, cereais, refeições preparadas (sous vide), tabaco, hardware sensível.',
    riscos: 'Falsa segurança: vácuo não esteriliza nem mata bactérias anaeróbicas (Clostridium, Listeria). Em alimentos úmidos não cozidos a vácuo refrigerado, pode acelerar produção de toxinas. Combine sempre com cura, cozimento, congelamento ou desidratação.',
  },
  {
    num: '08',
    nome: 'Congelamento Estratégico',
    imagem: imgCongelamento,
    contexto: 'Congelamento abaixo de -18 °C para a maioria dos alimentos, -25 °C para conservação prolongada. Não destrói bactérias, apenas paralisa multiplicação. Após descongelar, contagem retoma.',
    validade: 'Carne vermelha: 6 a 12 meses (até 24 meses a vácuo). Aves: 4 a 9 meses. Peixe gordo: 2 a 3 meses (oxida rápido). Vegetais branqueados: 8 a 12 meses. Pão: 1 a 3 meses.',
    custo: 'Freezer vertical 200 L: USD 400 a 800. Operação: USD 4 a 12/mês de eletricidade.',
    energia: 'Contínua. 100 a 250 W médios em ciclo. Backup com gerador ou solar é estratégia avançada.',
    passos: [
      'Branqueamento de vegetais: ferva por 1 a 5 min (depende do tamanho), choque térmico em água com gelo por igual tempo, escorra. Sem branqueamento, enzimas continuam ativas no freezer e degradam textura, cor e nutrientes.',
      'Embale por porção de uso individual. Saquinhos ziplock + extração manual de ar, ou embalagem a vácuo. Etiquete com nome e data (caneta permanente). Use FIFO (primeiro a entrar, primeiro a sair).',
      'Resfrie alimento cozido completamente antes de congelar. Calor residual eleva temperatura do freezer e degrada produtos vizinhos.',
      'Distribua em camadas finas para congelamento rápido (cristais menores preservam textura). Após sólido, empilhe e organize.',
      'Mantenha o freezer 2/3 cheio. Mais vazio gera flutuação térmica, mais cheio impede circulação. Se faltar conteúdo, complete com garrafas de água (também serve como backup em queda de energia).',
      'Plano de queda de energia: freezer fechado mantém temperatura por 24 a 48 h. Tenha gerador a gasolina (3 a 5 kW), inversor solar com bateria de 100 Ah, ou plano de cozimento emergencial dos alimentos prioritários.',
    ],
    alimentos: 'Carne, peixe, aves, frutas (banana descascada, frutas vermelhas), vegetais branqueados, ervas em cubo de azeite, ensopados, pão fatiado, manteiga, queijos duros, gelo, água potável armazenada.',
    riscos: 'Recongelar alimento descongelado dobra a carga bacteriana. Apenas recongele se ainda contém cristais de gelo (parcialmente descongelado). Queimadura de freezer: oxidação superficial por contato com ar, indica embalagem inadequada. Falha elétrica acima de 48 h: descongele e cozinhe imediatamente, ou descarte.',
  },
];

const ERROS = [
  { titulo: 'Sal iodado em fermentação', desc: 'O iodo inibe os Lactobacillus e mata o processo. Use somente sal grosso, marinho ou rocha sem iodo.' },
  { titulo: 'Banho-maria em alimento pouco ácido', desc: 'Carne ou vegetal sem vinagre em banho-maria comum: risco crítico de botulismo. Apenas pressão a 116 °C garante destruição dos esporos.' },
  { titulo: 'Sal de cura sem balança de precisão', desc: 'Improvisar nitrito para presunto/embutido sem pesar com 0,1 g de exatidão: subdose mata e sobredose intoxica.' },
  { titulo: 'Defumar carne crua sem pré-cura', desc: 'Defumação a frio em alimento sem salga prévia: ambiente perfeito para Listeria, Salmonella e Clostridium.' },
  { titulo: 'Recongelar carne descongelada', desc: 'A contagem bacteriana dobra a cada 20 min entre 4 e 60 °C. Apenas recongele se ainda houver cristais de gelo.' },
  { titulo: 'Conserva caseira em armário quente', desc: 'Temperaturas acima de 25 °C aceleram degradação e podem reativar esporos sobreviventes. Despensa fresca é mandatória.' },
];

const FAQ = [
  {
    q: 'Qual o método mais seguro para iniciante?',
    a: 'Fermentação láctica de vegetais (chucrute, kimchi, picles fermentados). O ambiente ácido gerado pelos Lactobacillus inibe quase todos os patógenos perigosos. Risco de botulismo é praticamente nulo em vegetais corretamente salgados (2 a 3 % de sal). Em segundo lugar, congelamento e desidratação solar de frutas. Evite conservas pressurizadas, salga de carne crua e defumação até dominar os fundamentos.',
  },
  {
    q: 'Posso fazer conserva de carne em panela de pressão comum?',
    a: 'Não. Panela de pressão comum atinge cerca de 110 °C com tampa fechada, mas não mantém pressão constante por 75 a 90 min, e não tem manômetro calibrado. Para canning de carne é obrigatório usar panela específica (Presto, All American), com capacidade para frascos de 1 L em pé e manômetro testado anualmente. Investimento: USD 200 a 500 vs risco de botulismo letal.',
  },
  {
    q: 'Como saber se um vegetal fermentado estragou?',
    a: 'Sinais de fermentação saudável: cheiro azedo limpo (lembra picles), borbulhamento moderado nos primeiros dias, líquido turvo é normal, mofo branco superficial (kahm yeast) é inofensivo. Sinais de descarte: mofo colorido (preto, verde, rosa, azul), cheiro pútrido ou de podridão, textura pegajosa ou gelatinosa, gás excessivo após 21 dias. Em dúvida, descarte. Nunca prove para confirmar suspeita.',
  },
  {
    q: 'Sal rosa do Himalaia substitui sal de cura?',
    a: 'Não, é o erro mais perigoso da conservação caseira. Sal rosa do Himalaia é cloreto de sódio com traços de minerais. Sal de cura #1 e #2 contém nitrito e nitrato de sódio em proporção exata (6,25 % de nitrito), únicos compostos que destroem Clostridium botulinum em embutidos fechados. Compre em fornecedores específicos como Defumare, Ataua, Sosa, Modernist Pantry ou similares.',
  },
  {
    q: 'Quanto tempo dura comida desidratada solar?',
    a: 'Dependendo do alimento e do armazenamento: frutas 6 a 12 meses em vidro vedado, vegetais 1 a 2 anos com absorvente de oxigênio, carne (jerky) 1 a 6 meses sem refrigeração, 1 a 2 anos refrigerado ou congelado. Vida útil duplica ou triplica com embalagem a vácuo + sachê de sílica. Sempre armazene ao abrigo de luz, calor e umidade.',
  },
  {
    q: 'Existe risco de botulismo em alimento fermentado?',
    a: 'Em vegetais fermentados (chucrute, kimchi) com sal correto (acima de 2 %): praticamente zero. O ambiente ácido gerado por Lactobacillus (pH abaixo de 4,6) inibe Clostridium botulinum. Em fermentações de baixa acidez (peixe fermentado tradicional, carne crua, alho cru em óleo): risco real. Evite alho cru em óleo sem refrigeração ou acidificação prévia (vinagre).',
  },
  {
    q: 'Vale a pena ter freezer em zona com queda elétrica frequente?',
    a: 'Sim, mas com plano de redundância. Freezer fechado mantém temperatura segura por 24 a 48 h. Plano completo: gerador a gasolina (USD 600 a 1500), inversor solar com 200 a 400 W painel + bateria 100 Ah (USD 1500 a 3000), ou estratégia mista de congelamento + desidratação + fermentação para diversificar dependência. Em zona de mais de 4 quedas/mês acima de 6 h, priorize fermentação e desidratação como primários.',
  },
  {
    q: 'Como começar do zero com baixo investimento?',
    a: 'Tier 1 (USD 50): 6 potes Mason 1 L, 5 kg sal grosso sem iodo, balança digital 0,1 g, repolho, beterraba, cenoura, cúrcuma, pimenta. Faça 4 fermentações em 30 dias. Tier 2 (USD 200): adicione desidratador 5 bandejas. Tier 3 (USD 800): seladora a vácuo, congelador horizontal 200 L. Tier 4 (USD 2000+): panela de pressão para canning, defumador caseiro, gerador, inversor solar.',
  },
];

export default function ConservacaoAlimentos() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.sand }}>
      <SeoHead
        path="/soberania-organica/conservacao"
        custom={{
          title: 'Conservação de Alimentos: Fermentação, Desidratação, Cura, Defumação e Conservas',
          description: 'Manual completo de conservação alimentar: fermentação láctica, desidratação solar e elétrica, salga, cura, defumação, conservas pressurizadas, vácuo e congelamento estratégico.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/conservacao',
          primaryKeyword: 'conservação de alimentos',
          lsiKeywords: ['fermentação láctica', 'desidratação solar', 'salga e cura de carne', 'defumação caseira', 'conserva pressurizada', 'embalagem a vácuo', 'congelamento estratégico'],
          longTailKeywords: ['como conservar alimentos sem energia', 'fermentação láctica passo a passo', 'desidratação solar caseira', 'cura de bacon caseiro', 'conserva de carne em panela de pressão', 'como fazer chucrute caseiro'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Conservação de Alimentos', url: '/soberania-organica/conservacao' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <BackToHome />

      {/* HERO GIGANTE FULL-BLEED */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Despensa rústica de soberania alimentar com conservas em vidro, ervas penduradas e carnes curadas ao entardecer"
            width={1920}
            height={1280}
            fetchPriority="high"
            className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
          {/* Apenas darken sutil para legibilidade do texto, SEM fade artístico */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20,12,4,0.32)' }} />
        </div>

        <div className="relative max-w-[1500px] mx-auto px-6 md:px-16 pb-20 md:pb-32 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="font-mono text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: 'hsl(36 50% 84%)' }}
          >
            Sobrevivência & Resiliência · Manual completo
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.2 }}
            className="font-black leading-[0.9] mb-10 max-w-5xl"
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.75rem, 8.5vw, 7.5rem)',
              color: '#fbf3e8',
              textShadow: '0 4px 28px rgba(0,0,0,0.65)',
            }}
          >
            Tire sua comida{' '}
            <em style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700, color: 'hsl(32 80% 72%)', textShadow: '0 0 40px hsl(28 60% 30% / 0.7), 0 4px 24px rgba(0,0,0,0.8)' }}>
              da custódia
            </em>{' '}
            do supermercado.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.4 }}
            className="text-lg md:text-2xl max-w-3xl leading-relaxed"
            style={{ color: '#f0e4d4', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            Toda lata de conserva industrial é uma exchange custodiando seu próximo prato.
            Toda prateleira de ultraprocessado é o combustível que paga a indústria farmacêutica
            depois. Aqui você aprende oito métodos para guardar comida em casa, sem geladeira,
            sem rótulo, sem dependência das duas primas que mandam no mundo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: 'hsl(32 80% 72%)' }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Role para começar</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* PROVOCAÇÃO */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.cream}>
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div {...fade()} className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.amber }}>
                Manifesto · As duas primas que mandam no mundo
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
                Uma te adoece pela boca.{' '}
                <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.amber }}>
                  A outra te vende a pílula.
                </em>
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                Refrigerante, embutido, fast food, biscoito recheado, margarina, pão de saco.
                A indústria alimentícia projeta cada produto para criar a doença que a indústria
                farmacêutica vai tratar com remédio contínuo. E o remédio do primeiro vira efeito
                colateral que precisa de um segundo remédio. E assim por diante até o fim da vida.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                Conservar a própria comida é o equivalente alimentar de tirar Bitcoin da exchange.
                Você deixa de ser cliente cativo, deixa de ler rótulo de coisa que não devia comer,
                deixa de pagar pelo marketing do veneno e pelo plano de saúde que vem depois.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: C.ink }}>
                Soberania alimentar não é hobby. É auto-custódia biológica. É a versão comestível
                da sua seed phrase: ninguém pode confiscar o que está na sua despensa.
              </p>
            </div>
            <div className="md:col-span-5">
              <motion.div {...fade(0.15)} className="relative">
                <img
                  src={imgFermentacao}
                  alt="Conservas fermentadas de chucrute e cenoura em potes de vidro com sal grosso"
                  width={1600} height={1100}
                  loading="lazy"
                  className="w-full h-auto rounded-sm"
                  style={{ boxShadow: '0 40px 80px -20px hsl(28 34% 14% / 0.45)' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MÉTODOS — 8 blocos 50/50 alternados, imagem GIGANTE em cada um */}
      {METODOS.map((m, i) => {
        const bg = i % 2 === 0 ? sectionBg.sand : sectionBg.cream;
        const reverse = i % 2 === 1;
        return (
          <section key={m.num} className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={bg}>
            <div className="max-w-[1500px] mx-auto relative">
              <div className={`grid md:grid-cols-12 gap-12 md:gap-20 items-start ${reverse ? 'md:[direction:rtl]' : ''}`}>
                <motion.div {...fade()} className="md:col-span-6 md:[direction:ltr]">
                  <img
                    src={m.imagem}
                    alt={`${m.nome} — ${m.contexto.slice(0, 80)}`}
                    width={1600} height={1100}
                    loading="lazy"
                    className="w-full h-auto rounded-sm sticky top-24"
                    style={{ boxShadow: '0 40px 80px -20px hsl(28 34% 14% / 0.45)' }}
                  />
                </motion.div>

                <motion.div {...fade(0.15)} className="md:col-span-6 md:[direction:ltr]">
                  <div className="flex items-baseline gap-6 mb-8">
                    <span className="font-mono text-7xl md:text-8xl font-black leading-none" style={{ color: C.amber, opacity: 0.85 }}>
                      {m.num}
                    </span>
                    <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: C.amber }}>
                      Método
                    </span>
                  </div>

                  <h3
                    className="font-black leading-[0.95] mb-6"
                    style={{
                      fontFamily: '"Inter Tight", sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(1.875rem, 4.5vw, 3.75rem)',
                      color: C.ink,
                    }}
                  >
                    {m.nome}
                  </h3>

                  <p
                    className="mb-10 italic"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      fontSize: 'clamp(1.15rem, 1.9vw, 1.5rem)',
                      color: C.ember,
                      lineHeight: 1.45,
                    }}
                  >
                    {m.contexto}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 p-6 rounded-sm" style={{ backgroundColor: 'hsl(36 30% 96% / 0.7)', border: `1px solid ${C.line}` }}>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-2" style={{ color: C.muted }}>Validade</p>
                      <p className="text-sm font-bold leading-snug" style={{ color: C.ink }}>{m.validade}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-2" style={{ color: C.muted }}>Custo</p>
                      <p className="text-sm font-bold leading-snug" style={{ color: C.ink }}>{m.custo}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-2" style={{ color: C.muted }}>Energia</p>
                      <p className="text-sm font-bold leading-snug" style={{ color: C.ink }}>{m.energia}</p>
                    </div>
                  </div>

                  <div className="border-l-2 pl-6 mb-8" style={{ borderColor: C.amber }}>
                    <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-5" style={{ color: C.amber }}>
                      Sequência operacional
                    </p>
                    <ol className="space-y-4">
                      {m.passos.map((p, idx) => (
                        <li key={idx} className="flex gap-4 text-base md:text-lg leading-relaxed" style={{ color: C.body }}>
                          <span className="font-mono text-xs font-bold pt-1 flex-shrink-0" style={{ color: C.amber }}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-3" style={{ color: C.muted }}>Alimentos compatíveis</p>
                    <p className="text-base leading-relaxed" style={{ color: C.body }}>{m.alimentos}</p>
                  </div>

                  <div className="p-5 rounded-sm" style={{ backgroundColor: 'hsl(8 50% 94%)', border: '1px solid hsl(8 50% 78%)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle size={16} style={{ color: 'hsl(8 70% 38%)' }} />
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold" style={{ color: 'hsl(8 70% 38%)' }}>Riscos críticos</p>
                    </div>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'hsl(8 40% 22%)' }}>{m.riscos}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ARMADILHAS */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.cream}>
        <div className="max-w-[1500px] mx-auto relative">
          <motion.div {...fade()} className="text-center max-w-4xl mx-auto mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: 'hsl(8 70% 38%)' }}>
              <AlertTriangle className="inline w-4 h-4 mr-2 -mt-1" />
              Erros que matam mais que comida estragada
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
              Seis armadilhas{' '}
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.amber }}>
                fatais
              </em>{' '}
              que comprometem tudo.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ERROS.map((e, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.05)}
                className="p-10 rounded-sm transition-all duration-500 hover:-translate-y-2"
                style={{
                  backgroundColor: 'hsl(38 36% 96% / 0.92)',
                  border: `1px solid ${C.line}`,
                  boxShadow: '0 20px 50px -20px hsl(28 34% 14% / 0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="font-mono text-sm font-bold" style={{ color: 'hsl(8 70% 38%)' }}>0{i + 1}</span>
                <h3
                  className="text-2xl md:text-3xl font-black mt-3 mb-5 leading-tight"
                  style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 900, color: C.ink }}
                >
                  {e.titulo}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: C.body }}>
                  {e.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.sand}>
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fade()} className="text-center mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.amber }}>
              <Archive className="inline w-4 h-4 mr-2 -mt-1" />
              Perguntas honestas, respostas diretas
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
              O que todo iniciante{' '}
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.amber }}>
                pergunta primeiro
              </em>.
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.04)}
                className="rounded-sm overflow-hidden"
                style={{
                  border: `1px solid ${C.line}`,
                  backgroundColor: 'hsl(38 36% 96% / 0.85)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-7 md:p-9 flex justify-between items-start gap-6 transition-colors hover:bg-amber-50/40"
                >
                  <span
                    className="text-lg md:text-xl font-bold leading-snug"
                    style={{ fontFamily: '"Inter Tight", sans-serif', color: C.ink }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    className="w-6 h-6 flex-shrink-0 mt-1 transition-transform duration-500"
                    style={{
                      color: C.amber,
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
                    <p className="text-base md:text-lg leading-relaxed" style={{ color: C.body }}>
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
      <section className="relative py-32 md:py-44 px-6 md:px-16 overflow-hidden" style={sectionBg.cream}>
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div {...fade()}>
            <ShieldCheck className="w-12 h-12 mx-auto mb-10" style={{ color: C.amber }} />
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.amber }}>
              A despensa que atravessa o ano
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
              Geladeira é conveniência.<br />
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.amber }}>
                Despensa cheia
              </em>
              <br />é soberania.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: C.body }}>
              Comece pela fermentação nesta semana. No mês que vem adicione desidratação solar.
              Em três meses você opera com seis meses de despensa real.
              Em um ano, autonomia alimentar de doze a trinta e seis meses sem nenhuma dependência da rede.
            </p>
          </motion.div>
        </div>
      </section>

      <RelatedHooks
        tema="light"
        titulo="A trilha completa da sobrevivência"
        subtitulo="Despensa cheia é a segunda camada. Estes módulos formam o protocolo completo, do kit de 72 horas ao refúgio rural autônomo."
        hooks={[
          {
            titulo: 'Kit 72 Horas',
            descricao: 'A primeira camada de proteção. Mochila e despensa prontas para 72 horas de autonomia imediata em qualquer crise.',
            rota: '/soberania-organica/kit-72h',
            selo: 'Comece aqui',
          },
          {
            titulo: 'Preservação Ancestral',
            descricao: 'Quais alimentos preservar, por quanto tempo e como usar. A tabela mestra de despensa sem geladeira.',
            rota: '/soberania-organica/preservacao-ancestral',
          },
          {
            titulo: 'Gestão de Água em Escala Micro',
            descricao: 'Captação de chuva, filtro biológico e SODIS. A água que cozinha as conservas e hidrata a família por noventa dias sem rede.',
            rota: '/soberania-organica/gestao-agua-micro',
          },
          {
            titulo: 'Horta Urbana',
            descricao: 'A safra que vai virar conserva. Fonte primária dos alimentos que você fermenta, desidrata e enlata.',
            rota: '/soberania-organica/horta-urbana',
          },
          {
            titulo: 'Protocolo de Fogo',
            descricao: 'Cozinhar e esterilizar sem rede elétrica. Métodos de fogo controlado para preparar e conservar em qualquer cenário.',
            rota: '/soberania-organica/protocolo-fogo',
          },
          {
            titulo: 'Refúgio Rural Tático',
            descricao: 'Pensa em sair da cidade? Protocolo de avaliação, escolha e estruturação do refúgio rural com sistemas autônomos completos.',
            rota: '/soberania-organica/refugio-rural',
          },
        ]}
      />
    </div>
  );
}