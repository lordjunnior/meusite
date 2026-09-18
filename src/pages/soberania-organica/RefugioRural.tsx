import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mountain, Hammer, Droplets, Sprout, Shield, Truck, Package, Users,
  FileText, ChevronDown, ArrowRight, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/refugio-hero.webp';
import imgTerreno from '@/assets/saida/refugio-terreno.webp';
import imgConstrucao from '@/assets/saida/refugio-construcao.webp';
import imgAgua from '@/assets/saida/refugio-agua.webp';
import imgAlimentar from '@/assets/saida/refugio-alimentar.webp';
import imgPerimetro from '@/assets/saida/refugio-perimetro.webp';
import imgLogistica from '@/assets/saida/refugio-logistica.webp';
import imgEstoque from '@/assets/saida/refugio-estoque.webp';
import imgComunidade from '@/assets/saida/refugio-comunidade.webp';
import imgLegal from '@/assets/saida/refugio-legal.webp';
import imgCotidiano from '@/assets/saida/refugio-cotidiano.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

interface Pilar {
  num: string;
  nome: string;
  contexto: string;
  passos: string[];
  falhas: string;
  icon: typeof Mountain;
  image: string;
  imageAlt: string;
}

const PILARES: Pilar[] = [
  {
    num: '01',
    nome: 'Critérios de escolha do terreno: água, acesso, vizinhança e risco',
    icon: Mountain,
    image: imgTerreno,
    imageAlt: 'Mapa topográfico aberto sobre mesa de madeira com bússola, GPS e amostras de solo, paisagem rural ao fundo',
    contexto: 'Terreno errado destrói o projeto inteiro antes da primeira pedra ser assentada. Critério mestre: água perene própria (nascente, poço artesiano, lago), acesso viável em qualquer estação (estrada principal a no máximo 30 km de asfalto, com plano B alternativo), vizinhança rural estável (não invasão, não conflito agrário ativo, não área de fronteira agrícola em disputa), distância segura de grandes centros (mínimo 80 km, ideal 150 a 250 km), elevação que evite enchente histórica e topografia que permita drenagem natural. Latitude e clima definem matriz produtiva: sul produz uva, maçã, trigo; centro-oeste produz grãos e gado; nordeste interior produz caju, mandioca, caprinos resilientes a seca. Valor de R$ 80 mil a R$ 600 mil para 2 a 20 hectares produtivos em regiões de Minas Gerais, Goiás, sul da Bahia, oeste de Santa Catarina e Paraná interior em 2025.',
    passos: [
      'Mapeie 3 a 5 mesorregiões candidatas no Brasil que combinem clima estável, baixo risco de enchente e seca extrema, infraestrutura básica próxima (hospital, comércio rural, oficina mecânica em até 40 km) e custo de terra acessível.',
      'Visite presencialmente em estação seca E em estação chuvosa antes de comprar. Estrada que parece ótima em julho vira atoleiro intransitável em janeiro. Erro típico: comprar em julho, descobrir em fevereiro que está ilhado por 4 meses.',
      'Análise de água: nascente perene com vazão mínima 500 L/h em estação seca, ou poço artesiano com laudo geofísico antes da compra. Sem água própria, refúgio rural não existe — depender de cisterna abastecida por carro-pipa é dependência fatal.',
      'Verificação documental completa: matrícula atualizada do CRI, ITR em dia, georreferenciamento (obrigatório para imóveis acima de 4 módulos fiscais), CAR (Cadastro Ambiental Rural), ausência de averbação de reserva legal sobreposta à área produtiva.',
      'Vizinhança: converse com 3 a 5 vizinhos imediatos antes da compra. Identifique conflitos históricos, disputas de cerca, problemas com invasão, posse irregular de áreas adjacentes. Vizinho hostil em zona rural é problema irreversível.',
    ],
    falhas: 'Comprar terreno barato em região com histórico de seca de 8 a 12 meses (Vale do Jequitinhonha, sertão do São Francisco, Cariri paraibano) sem fonte de água própria. Aceitar terreno sem georreferenciamento "porque está barato" (impossível registrar, financiar ou vender depois). Comprar em zona de fronteira agrícola ativa (Pará, sul do Amazonas, oeste do Maranhão) com risco de invasão e violência. Ignorar histórico de enchente do rio próximo (5 anos de retorno parece raro até acontecer no segundo ano).',
  },
  {
    num: '02',
    nome: 'Construção resiliente: materiais locais, estrutura passiva e durabilidade',
    icon: Hammer,
    image: imgConstrucao,
    imageAlt: 'Casa rural em construção com paredes de taipa de pilão e pedra, telhado cerâmico, beirais largos, pedreiros trabalhando no Brasil interior',
    contexto: 'Casa rural resiliente combina materiais de massa térmica (taipa de pilão, adobe estabilizado, pedra, tijolo maciço cerâmico) que estabilizam temperatura interna sem ar-condicionado, telhado cerâmico de duas águas com beirais largos (proteção solar e da chuva), fundação elevada 50 a 80 cm acima do solo (proteção contra umidade, cupins e enchente menor), portas e janelas em madeira de lei tratada (cumaru, ipê) ou alumínio anodizado de qualidade. Custo R$ 1.800 a R$ 3.500 por m² em construção própria com mão de obra local em 2025 (versus R$ 3.500 a R$ 6.000 do convencional urbano). Vida útil de 80 a 150 anos sem reformas estruturais. Conforto térmico passivo: variação interna de 4 a 8°C com 18 a 25°C externos — sem necessidade de climatização ativa em 80 por cento do ano.',
    passos: [
      'Projeto arquitetônico bioclimático: orientação solar (face longa Norte-Sul para minimizar carga térmica em janelas Leste/Oeste), pé-direito de 3,2 a 4 metros para circulação de ar, pátio interno ou pergolado para sombreamento, ventilação cruzada em todos os cômodos.',
      'Materiais locais: pedra de cantaria da região, argila para taipa, madeira de manejo sustentável certificado, telha cerâmica de olaria local. Reduz custo logístico em 40 a 60 por cento e cria casa que envelhece bem com a paisagem.',
      'Fundação reforçada: sapata corrida em concreto armado com impermeabilização dupla (manta asfáltica + aditivo cristalizante), respiros de ventilação no rodapé, calçada perimetral com 1,2 metro de largura para afastar umidade.',
      'Cobertura em duas águas com inclinação 30 a 40 por cento, beiral mínimo 1 metro, calhas em PVC reforçado conectadas direto ao sistema de captação de chuva. Telha cerâmica colonial sobre estrutura de madeira ou metálica galvanizada a fogo.',
      'Acabamento honesto: piso em cerâmica antiderrapante ou queimado de cimento, paredes em reboco com tinta mineral à base de cal, esquadrias em madeira ou alumínio. Evite drywall, MDF, PVC e materiais sintéticos que falham em 8 a 15 anos no clima rural.',
    ],
    falhas: 'Importar projeto de "casa contêiner" ou "tiny house" para sítio em região de chuva forte e calor intenso (vira sauna mortal no verão, geladeira sem isolamento no inverno). Usar madeira não tratada em estrutura ou esquadria (cupim destrói em 3 a 5 anos). Telhado de fibrocimento amianto reciclado (proibido, contaminação cancerígena). Construir em laje plana sem inclinação (vaza no primeiro verão).',
  },
  {
    num: '03',
    nome: 'Captação de água, reservatório e tratamento ponto de uso',
    icon: Droplets,
    image: imgAgua,
    imageAlt: 'Sistema de captação de água da chuva em sítio brasileiro com cisterna de concreto, filtro de gravidade, tubos de cobre e bananeiras ao redor',
    contexto: 'Água é o primeiro problema solucionado em refúgio rural — sem ela nada mais funciona. Estratégia de redundância tripla: captação de chuva (telhado de 100 m² capta 80 a 150 mil litros/ano em região com 1.200 mm anuais), poço artesiano ou cacimba (40 a 200 metros de profundidade dependendo do aquífero), e nascente própria quando disponível. Reservatório dimensionado para 2 a 4 meses de consumo familiar (família de 4 pessoas usa 300 a 600 L/dia, reservatório de 30 a 75 mil litros cobre 100 a 250 dias). Filtragem em camadas: filtro de areia + carvão ativado + UV ou prata coloidal para potabilização final. Análise de água trimestral em laboratório credenciado (R$ 80 a R$ 200 por análise) garante segurança contínua.',
    passos: [
      'Sistema de captação: calhas no telhado coletam água, primeiro fluxo descartado por dispositivo first-flush (carrega poeira, fezes de pássaro, folhas), restante segue para cisterna principal através de filtro grosseiro (tela inox 50 mesh).',
      'Reservatório: cisterna de concreto armado enterrada (estável termicamente, sem proliferação de algas) ou caixa elevada de fibra de vidro alimentar com cobertura opaca. Capacidade mínima 15 mil litros por pessoa para autonomia de 60 dias.',
      'Bombeamento solar: bomba submersa 12V/24V com painel solar dedicado de 200 a 600 W, ou bomba elétrica convencional com automação. Backup manual via bomba de roda dágua ou bomba alternativa de pistão (Vergnet, ARROW).',
      'Filtragem em estágios: filtro de areia (remove sedimentos), carvão ativado (remove cloro, odores, agrotóxicos), filtro de cerâmica de 0,2 micron (remove bactérias e protozoários), e UV germicida ou cloração final para vírus.',
      'Reuso de águas cinzas: água do banho e pia da cozinha (sem detergente sintético) filtrada em wetland construído com brita, areia e plantas (papiro, taboa) reaproveitada para irrigação de pomar e jardim. Reduz consumo total em 40 a 60 por cento.',
    ],
    falhas: 'Cisterna sem first-flush (água contaminada com fezes de morcego e pássaro entra direto no reservatório). Filtro de carvão sem troca regular (a cada 6 meses no máximo, vira foco de bactéria). Beber direto do poço sem análise periódica (contaminação por nitrato de fossa séptica próxima é silenciosa e cumulativa). Caixa dágua plástica preta exposta ao sol (gera proliferação de algas em 30 dias).',
  },
  {
    num: '04',
    nome: 'Autossuficiência alimentar local: agrofloresta, pomar e pequena criação',
    icon: Sprout,
    image: imgAlimentar,
    imageAlt: 'Horta produtiva em sítio brasileiro com canteiros elevados, árvores frutíferas, galinheiro ao fundo, colmeia de abelha lateral, pessoa colhendo verduras',
    contexto: 'Família de 4 pessoas precisa de cerca de 2.000 m² (0,2 hectare) bem manejados para produção de 60 a 80 por cento da alimentação anual. Sistema integra horta de hortaliças (300 m² de canteiros elevados em rotação), pomar com 20 a 40 árvores frutíferas de espécies adaptadas (manga, banana, abacate, jaca, jabuticaba, goiaba, citros), criação de galinhas caipiras (15 a 25 aves para ovos e carne ocasional), 1 a 2 colmeias de abelha melífera para mel e polinização, e área de grãos básicos (milho, feijão, mandioca em 1.000 a 2.000 m²). Investimento inicial R$ 8 a 25 mil para infraestrutura (cercas, galinheiro, mudas, ferramentas, sistema de irrigação por gotejamento). Produção real começa em 6 a 18 meses (hortaliças primeiro, frutíferas em 2 a 4 anos, agrofloresta madura em 5 a 8 anos).',
    passos: [
      'Diagnóstico do solo: análise química completa em laboratório (R$ 60 a R$ 150) identifica deficiência de macro e micronutrientes, pH, matéria orgânica. Correção com calcário, gesso agrícola e composto orgânico antes de qualquer plantio.',
      'Horta em canteiros elevados de 1,2 metro × 4 metros, altura 30 cm, com cobertura morta (palha, casca de arroz) permanente. Rotação de famílias botânicas a cada ciclo (folhas → raízes → frutos → leguminosas) preserva fertilidade.',
      'Pomar com espécies adaptadas ao clima local em consorciação (mangueira no estrato alto, citros no médio, banana no baixo, mandioca e abacaxi no rasteiro). Mínimo 8 espécies diferentes evita praga monocultural.',
      'Criação de galinhas: galpão coberto 4 m² para 20 aves, área externa cercada 60 a 100 m² com sombra natural. Raça caipira ou semicaipira (Embrapa 051, Pescoço Pelado) é resistente, produz 180 a 240 ovos/ano por ave.',
      'Colmeia de abelha melífera (Apis mellifera ou abelhas nativas como jataí, mandaçaia): 1 colmeia produz 15 a 35 kg de mel/ano, poliniza pomar inteiro, exige 4 a 6 horas de manejo mensal. Investimento inicial R$ 800 a R$ 2.000 por colmeia equipada.',
    ],
    falhas: 'Plantar variedades híbridas F1 sem guardar sementes próprias (depende de revenda urbana toda safra, que é exatamente a dependência que se quer eliminar). Galinheiro mal ventilado e úmido (Newcastle, coriza e bouba derrubam o plantel inteiro em semanas). Pomar com uma única espécie dominante (Sigatoka derruba bananal, greening derruba citros, tudo na mesma estação). Ignorar agrofloresta multi-estrato achando que monocultura de horta basta (solo se exaure em 3 a 4 anos).',
  },
  {
    num: '05',
    nome: 'Defesa perimetral: cerca, sinalização, vigilância e protocolo de invasão',
    icon: Shield,
    image: imgPerimetro,
    imageAlt: 'Cerca de mourão de madeira com arame farpado e cerca-viva espinhosa nativa em propriedade rural brasileira, câmera em poste, portão reforçado com cadeado',
    contexto: 'Defesa rural não é fortaleza militar — é dissuasão em camadas. Cerca perimetral física (mourão de madeira tratada ou eucalipto a cada 3 metros, 5 fios de arame farpado, ou cerca de tela ovelheira em zona com gado), reforçada por cerca viva espinhosa nativa (espinheira-santa, juá, palma forrageira em zona seca, sansão-do-campo em zona quente), portão principal com cadeado disco e corrente de elo grosso, sinalização clara de propriedade privada com nome do proprietário, número da matrícula e mensagem de monitoramento 24h. Câmeras IP solar autônomas com gravação local (DVR) em pontos estratégicos (entrada, currais, casa principal), iluminação perimetral com sensor de presença alimentada por solar, e acordo formal com vizinhos e polícia rural local. Em 90 por cento dos casos, dissuasão visível resolve sem confronto.',
    passos: [
      'Cerca física: mourão de eucalipto autoclavado ou madeira de lei tratada a cada 3 metros, 5 fios de arame farpado classe 1 ou tela ovelheira tipo Belgo. Custo R$ 18 a R$ 40 por metro linear instalado em 2025.',
      'Cerca viva complementar: plantio de espécies espinhosas nativas (juá, espinheira-santa, sansão-do-campo, gravatá) em fileira dupla a 50 cm da cerca física. Em 2 a 4 anos forma barreira impassável, sem manutenção e biodiversa.',
      'Portão e acessos: portão metálico galvanizado com cadeado disco protegido (CISA, Mottura, Pado de classe alta), corrente elo grosso 8 mm, sensores de abertura conectados a alarme local. Plano B: entrada secundária discreta para emergência.',
      'Vigilância passiva: 4 a 8 câmeras IP solar autônomas (Reolink Argus, EZVIZ BC1, ou DIY com Raspberry Pi) com gravação local em SD card e backup em NAS. Cobertura de entrada principal, perímetro lateral, casa, currais e depósito.',
      'Protocolo de contato com vizinhança e polícia rural: cadastro na patrulha rural da PM local, grupo de WhatsApp com vizinhos imediatos (10 a 20 propriedades), código de rádio combinado para emergência sem internet, contato direto com sub-tenente da região.',
    ],
    falhas: 'Instalar câmera IP em nuvem chinesa sem firewall (vira porta para invasão digital, dados de movimentação vazam). Cerca elétrica residencial em zona rural com fauna ativa (mata animais silvestres, gera multa ambiental, atrai justiceiros). Sinalização "cuidado cão bravo" sem cão real (vizinho descobre em 1 semana, vira piada). Confiar em arma de fogo como solução única sem treinamento legal e CRAF (gera mais risco para o proprietário do que defesa real).',
  },
  {
    num: '06',
    nome: 'Logística de chegada em crise: rota, veículo, combustível e timing',
    icon: Truck,
    image: imgLogistica,
    imageAlt: 'Caminhonete 4x4 com galões de combustível e equipamento de carga em estrada de terra vermelha rural ao amanhecer no interior do Brasil',
    contexto: 'Refúgio rural só funciona se a família consegue chegar nele em janela útil. Em crise urbana severa (apagão prolongado, desabastecimento, evento de violência sistêmica), as 12 a 48 primeiras horas têm trânsito caótico, postos sem combustível, rodovias bloqueadas. Plano de evacuação tem três janelas: amarela (sinal precoce, 3 a 7 dias antes — saída tranquila), laranja (crise iminente, 12 a 24 horas — saída noturna estratégica), vermelha (crise instalada, 0 a 12 horas — saída urgente com risco). Veículo dedicado ou com setup pronto (4x4 ou SUV com tanque cheio constante, galões aditivados de combustível para autonomia adicional 800 a 1.500 km, kit de pneu sobressalente duplo, ferramentas básicas, água, alimento e equipamento médico). Rota principal e 2 alternativas mapeadas e percorridas em condição normal antes da emergência.',
    passos: [
      'Veículo de evacuação: 4x4 (Toyota Hilux, Mitsubishi L200, Ford Ranger) ou SUV com bom espaço (Renegade, Compass, Duster) sempre acima de 70 por cento de combustível. Setup permanente no porta-malas: kit médico, água 20 L, alimento 72h, lanterna, rádio, manta térmica.',
      'Combustível adicional: 60 a 100 litros em galões qualificados (NATO ou similar) com aditivo Sta-Bil, armazenados em local ventilado fora de casa. Rotação trimestral (use no veículo, reabasteça galão).',
      'Rota principal: trajeto mais rápido em condição normal (2 a 4 horas direto). Documentado em mapa físico impresso (não confie só em Waze, que cai sem internet). Pontos de reabastecimento, parada e troca de motorista marcados.',
      'Rotas alternativas: mínimo 2 trajetos secundários por estradas rurais menos óbvias, percorridos pelo menos 1 vez por ano em condição normal para conhecer obstáculos reais (pontes em ruim estado, trechos sem cobertura, desvios sazonais).',
      'Protocolo de timing: matriz de decisão (sinais amarelos, laranjas, vermelhos) discutida em família. Quem decide a saída, quando, com quem se comunica antes, código de confirmação de chegada via SMS pré-combinado (não revela localização para terceiros).',
    ],
    falhas: 'Nunca testar a rota antes da emergência (descobre na hora que ponte caiu há 6 meses). Confiar 100 por cento em GPS sem mapa físico (sinal cai em zona rural rotineiramente). Combustível extra em galão plástico mal vedado (evapora 30 a 50 por cento em 6 meses, vira inútil). Veículo em revisão atrasada (quebra na metade do trajeto, vira pesadelo).',
  },
  {
    num: '07',
    nome: 'Estoque estratégico: alimento seco, medicamentos, sementes e reposições',
    icon: Package,
    image: imgEstoque,
    imageAlt: 'Despensa subterrânea de pedra rural com prateleiras de madeira, conservas em vidro, sacos de grãos, lampião pendurado, atmosfera de adega',
    contexto: 'Estoque de 6 a 12 meses para família de 4 é o padrão em refúgio rural maduro. Categorias: grãos básicos (arroz, feijão, milho, trigo) em recipientes herméticos com absorvedor de oxigênio (vida útil 10 a 25 anos), proteína em conserva (carne enlatada, peixe em óleo, atum) com vida útil 3 a 5 anos, óleo vegetal (girassol, milho) em galões fechados de 20 L com vida útil 18 a 24 meses, sal e açúcar (vida útil indefinida), café e chocolate em pó (1 a 3 anos), temperos secos. Medicamentos: estoque de 3 a 6 meses dos remédios contínuos da família, kit de primeiros socorros expandido, antibióticos veterinários equivalentes (uso emergencial responsável). Sementes próprias guardadas em geladeira a 5°C em embalagem hermética (vida útil 2 a 8 anos dependendo da espécie). Custo total de estoque inicial: R$ 8 a R$ 25 mil para família de 4.',
    passos: [
      'Inventário base: arroz 60 kg/pessoa/ano, feijão 30 kg, óleo 12 L, sal 5 kg, açúcar 15 kg, café 6 kg, leite em pó 8 kg. Para família de 4 = 240 kg arroz, 120 kg feijão, 48 L óleo etc. Despensa cobre 12 meses por R$ 4 a R$ 7 mil.',
      'Armazenamento correto: baldes alimentares 20 L com tampa hermética, absorvedor de oxigênio (sachê 2.000 cc) em cada balde, etiqueta com data de envasamento. Local fresco (até 22°C), seco e escuro. Vida útil real 8 a 15 anos.',
      'Rotação FIFO (First In First Out): use o mais antigo primeiro, reponha conforme consome. Sem rotação, em 3 anos metade do estoque está vencido e o investimento vai pro lixo.',
      'Medicamentos: estoque de 3 meses de remédios de uso contínuo (pressão, diabetes, tireoide), kit de primeiros socorros expandido (suturas, antissépticos profissionais, antiinflamatórios injetáveis com prescrição), repositórios de soro fisiológico, hidratantes orais.',
      'Sementes: variedades crioulas de hortaliças e grãos básicos guardadas em embalagem aluminizada hermética dentro de pote de vidro, refrigerado a 5°C. 50 a 100 espécies cobrem produção alimentar completa autônoma.',
    ],
    falhas: 'Estocar em embalagem original do supermercado (mariposa indiana e besouro do feijão destroem em 6 a 12 meses). Esquecer rotação (3 anos depois descobre que metade venceu). Estoque escondido em local úmido (mofo destrói tudo em estação chuvosa). Sementes híbridas F1 (geração seguinte não germina ou produz bizarramente diferente, dependência total).',
  },
  {
    num: '08',
    nome: 'Comunidade rural mínima: aliados, comércio local e protocolo de ajuda mútua',
    icon: Users,
    image: imgComunidade,
    imageAlt: 'Dois vizinhos rurais brasileiros conversando sobre cerca de madeira ao pôr do sol, aperto de mão, galinhas ao fundo, atmosfera de comunidade',
    contexto: 'Refúgio rural isolado e hostil ao entorno é insustentável. Família que ignora vizinhança rural não dura 5 anos — falta peão para colheita, mecânico para o trator, transporte de emergência médica, informação sobre clima e movimentação local. Estratégia: cultivar 8 a 15 vizinhos imediatos como aliados úteis (não amigos íntimos, mas relação de cooperação respeitosa), participar do comércio rural local (compra em mercearia, açougue e padaria do distrito ao invés de só supermercado urbano), conhecer profissionais essenciais por nome (mecânico, eletricista rural, pedreiro, veterinário, partikeira ou enfermeira local), ser visto como contribuição ativa (oferece trabalho remunerado, paga em dia, respeita costume local). Em crise, vizinhança rural é a primeira camada de defesa antes de qualquer infraestrutura instalada.',
    passos: [
      'Mapeamento: identifique 8 a 15 famílias vizinhas em raio de 5 km. Visite cada uma na chegada apresentando-se formalmente (cartão com nome, telefone, propriedade). Leve um pequeno presente (cesta de fruta da cidade) — gesto vale por décadas no campo.',
      'Comércio local: compre 60 a 80 por cento das necessidades semanais no comércio rural do distrito mais próximo. Padaria, açougue, mercearia, posto de gasolina rural, oficina mecânica. Conheça os donos por nome.',
      'Profissionais essenciais cadastrados: mecânico de trator, mecânico de carro 4x4, eletricista rural, pedreiro de confiança, veterinário, dentista de cidade próxima, médico de plantão da UPA mais próxima. Tenha 2 contatos de cada categoria.',
      'Participação comunitária discreta: missa de domingo no distrito, festa do padroeiro anual, leilão de gado em fazenda vizinha, grupo de WhatsApp de proprietários da região. Não precisa ser íntimo, precisa ser presente e respeitoso.',
      'Acordo de ajuda mútua informal: combine com 2 a 3 vizinhos próximos um protocolo de socorro mútuo em emergência médica, perda de eletricidade prolongada, animal escapado, suspeita de invasão. Não escreva, não formalize — palavra rural vale mais que contrato.',
    ],
    falhas: 'Chegar ao sítio com atitude urbana arrogante ("vou ensinar como faz certo"). Vizinhança rural rejeita imediatamente, isolamento permanente. Não comprar nada localmente "porque é mais barato no atacado da cidade" (comércio rural quebra, distrito morre, refúgio fica isolado). Nunca participar de evento comunitário ("não tenho tempo"). Em crise, ninguém aparece quando a família precisa.',
  },
];

const ERROS_FATAIS = [
  { titulo: 'Comprar terreno sem visita em estação chuvosa', desc: 'Estrada que parece ótima em julho vira atoleiro intransitável em janeiro. Refúgio fica ilhado por 4 a 6 meses por ano, evacuação impossível em emergência real.' },
  { titulo: 'Construir casa urbana de drywall em sítio', desc: 'Drywall, MDF e PVC falham em 3 a 8 anos no clima rural úmido. Cupim, mofo e dilatação destroem o investimento. Materiais locais com massa térmica duram 80 a 150 anos.' },
  { titulo: 'Depender de água externa (carro-pipa)', desc: 'Sem água própria (nascente, poço, captação), refúgio rural não existe. Em crise prolongada, carro-pipa para de circular ou cobra preços impagáveis. Independência hídrica é não-negociável.' },
  { titulo: 'Monocultura alimentar', desc: 'Pomar só de manga, horta só de alface, criação só de galinha — uma praga ou doença derruba 80 por cento da produção em uma estação. Diversidade botânica e zootécnica é a única defesa real.' },
  { titulo: 'Cerca elétrica residencial em zona com fauna', desc: 'Mata animais silvestres protegidos, gera multa ambiental, atrai justiceiros e vândalos. Cerca viva espinhosa nativa é mais eficaz, mais barata e respeitosa do bioma.' },
  { titulo: 'Nunca testar a rota de evacuação', desc: 'Confia em Google Maps até descobrir na hora da emergência que ponte caiu, estrada foi bloqueada, ou GPS não tem sinal. Rota principal e 2 alternativas devem ser percorridas anualmente em condição normal.' },
];

const CHECKLIST = [
  'Mês 01-02: definição de mesorregião, visita presencial em estação seca, primeiro contato com 5 corretores rurais locais',
  'Mês 03-04: visita em estação chuvosa, análise documental completa (matrícula, ITR, georreferenciamento, CAR), proposta',
  'Mês 05-06: fechamento, escritura, registro no CRI, primeira semana no terreno conhecendo vizinhos imediatos',
  'Mês 07-09: projeto arquitetônico bioclimático, fundação, captação de água da chuva e cisterna principal',
  'Mês 10-12: estrutura, cobertura, fechamento básico da casa principal, instalação elétrica e hidráulica',
  'Mês 13-15: acabamento, mobília básica, primeiros canteiros de horta com hortaliças de ciclo curto',
  'Mês 16-18: plantio de pomar com 25 a 40 mudas frutíferas, construção do galinheiro e início da criação',
  'Mês 19-21: cerca perimetral física, plantio de cerca viva espinhosa, instalação de câmeras solares',
  'Mês 22-24: estoque base de 6 a 12 meses, sementes próprias guardadas, kit médico expandido, rota de evacuação testada',
  'Ano 03: ampliação para agrofloresta multi-estrato, segunda colmeia, estoque ampliado para 12 a 18 meses',
  'Ano 04-05: maturidade do sistema, sementes próprias 100 por cento autônomas, comércio com vizinhança consolidado',
  'Manutenção contínua: rotação anual de estoque, manutenção semestral de cerca e cobertura, análise de água trimestral',
];

const FAQ = [
  {
    q: 'Quanto custa montar um refúgio rural completo no Brasil em 2025?',
    a: 'Para 2 a 5 hectares produtivos com casa principal de 80 a 120 m², infraestrutura básica (cisterna, fossa, eletricidade), cerca perimetral, pomar e horta funcionais, o investimento total fica entre R$ 250 mil e R$ 800 mil em 2025, dependendo da região e do padrão. Versão econômica em região de baixo custo (interior de Goiás, Tocantins, sul da Bahia) com construção própria em mutirão fica em R$ 180 a R$ 300 mil. Versão padrão classe média em região consolidada (sul de Minas, oeste de SC e PR, serra gaúcha) fica em R$ 400 a R$ 700 mil. Versão alto padrão com 10 a 20 hectares, casa de 200 m² e infraestrutura completa passa de R$ 1,5 milhão. Não inclui o veículo 4x4 (R$ 80 a R$ 250 mil) nem reserva financeira para 12 meses sem renda do projeto.',
  },
  {
    q: 'Qual o tamanho mínimo de terreno para autossuficiência alimentar?',
    a: 'Família de 4 pessoas precisa de aproximadamente 5.000 a 10.000 m² (0,5 a 1 hectare) bem manejados para 70 a 90 por cento de autossuficiência alimentar (hortaliças, frutas, ovos, mel, raízes, leguminosas e parte dos grãos). Se quiser produzir leite, carne bovina e cereais em escala completa, sobe para 5 a 20 hectares dependendo da região e do tipo de criação. Refúgio mínimo viável fica em 2 hectares (1 para casa, infraestrutura e pomar; 1 para horta intensiva, criação de pequenos animais e cultivo de ciclo curto). Abaixo de 1 hectare é difícil produzir mais de 30 a 40 por cento da alimentação familiar com qualidade e variedade.',
  },
  {
    q: 'Refúgio rural funciona se eu mantenho trabalho urbano remoto?',
    a: 'Sim, e essa é a configuração mais realista para 80 por cento das famílias em 2025. Internet via Starlink (R$ 184/mês com plano residencial em 2025) ou link de fibra de cooperativa rural cobre a maioria do interior do Brasil com latência aceitável para reuniões. Trabalho remoto pago em moeda forte (preferencialmente em USD ou Bitcoin via gateway) financia a operação rural durante os 3 a 5 anos de implementação. A casa precisa ter um escritório dedicado com energia estável (sistema híbrido solar) e ventilação. A vantagem: renda urbana sem custo urbano (sem aluguel alto, sem trânsito, sem violência). A desvantagem: exige disciplina para não virar refém da empresa em zona sem desligamento real.',
  },
  {
    q: 'Posso começar com terreno alugado ou arrendado para testar?',
    a: 'Sim, e é uma estratégia inteligente para reduzir risco. Arrendamento de sítio rural produtivo no interior do Brasil custa entre R$ 800 e R$ 4 mil por mês para 1 a 5 hectares, dependendo da região e da infraestrutura. Permite testar 12 a 24 meses se a família realmente se adapta à vida rural antes de comprar. Limitação: você não pode investir pesado em infraestrutura em terreno alugado (cisterna, casa, pomar permanente) porque não é seu. Estratégia híbrida: arrenda 2 a 3 anos para aprender, identifica a região e o perfil exato de terreno desejado, depois compra com conhecimento real do que precisa.',
  },
  {
    q: 'É seguro morar em zona rural isolada hoje no Brasil?',
    a: 'Depende muito da região. Sul de MG, sul de GO, oeste de SC e PR, serra gaúcha, sul da Bahia e norte do RJ são zonas com baixa criminalidade rural e patrulha rural ativa. Nordeste interior (Bahia, Pernambuco, Paraíba, Ceará interior) é majoritariamente seguro mas exige integração comunitária mais forte. Áreas a evitar: fronteira agrícola ativa (Pará, sul do Amazonas, oeste do Maranhão), zonas de conflito agrário ativo, regiões com histórico recente de quadrilha rural (oeste do Pará, sul de Rondônia). Em zona certa, com cerca perimetral, dissuasão visível, integração com vizinhança e cadastro na PM rural, segurança rural é melhor que segurança urbana média no Brasil.',
  },
  {
    q: 'Crianças se adaptam à vida rural se vêm da cidade grande?',
    a: 'Sim, mas a transição leva 6 a 18 meses. Crianças de até 10 anos se adaptam rápido (em 3 a 6 meses se sentem em casa). Adolescentes de 13 a 17 anos têm mais resistência inicial (saudade de amigos, falta de comércio, questões sociais). Estratégias que funcionam: matrícula em escola rural ou homeschool legalizado (Lei 14.301/2022), atividades com outras famílias rurais (igreja, festas comunitárias, grupos de jovens da região), visitas regulares à cidade grande para shopping, cinema e amigos antigos, internet de qualidade para manter conexão social. Crianças e adolescentes que permanecem 3 ou mais anos em ambiente rural raramente querem voltar para cidade grande na vida adulta.',
  },
  {
    q: 'Como financiar a compra do terreno e construção?',
    a: 'Quatro caminhos principais. (1) Recursos próprios + Bitcoin: ideal, sem juros, sem dependência bancária. Família que poupou em BTC nos últimos 3 a 7 anos tipicamente tem capital suficiente. (2) Financiamento imobiliário rural via Banco do Brasil, Sicredi ou Sicoob: juros de 9 a 14 por cento ao ano em 2025, prazo até 25 anos, exige comprovação de renda urbana ou rural. (3) Pronaf Mais Alimentos (para produtor familiar enquadrado): juros 4 a 7 por cento ao ano, prazo até 10 anos, exige DAP (Declaração de Aptidão ao Pronaf) e produção comprovada. (4) Venda de imóvel urbano: estratégia comum para classe média que troca apartamento de R$ 600 mil por sítio de R$ 400 mil + reserva de R$ 200 mil para construção e capital de giro. Evite financiar 100 por cento — entrada mínima de 30 a 50 por cento reduz risco financeiro em emergência.',
  },
  {
    q: 'O que é mais difícil de adaptação na transição cidade-campo?',
    a: 'Os 5 desafios mais reportados em entrevistas com famílias que migraram nos últimos 10 anos: (1) silêncio absoluto à noite, perturbador nas primeiras semanas — depois vira o maior bem; (2) ausência de delivery e comércio 24h, exige planejamento semanal de compras; (3) atendimento médico de emergência mais distante (15 a 60 minutos até UPA), exige kit médico expandido e curso de primeiros socorros; (4) custo cultural inicial (criança sem cinema, adolescente sem balada, adulto sem teatro), compensado por viagens mensais à cidade grande; (5) integração lenta à comunidade rural (não se vira "do lugar" em menos de 3 a 5 anos, exige paciência e respeito ao costume local). Adaptação completa leva 18 a 36 meses para a maioria das famílias urbanas que migram.',
  },
];

const RefugioRural = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SeoHead
        path="/soberania-organica/refugio-rural"
        custom={{
          title: 'Refúgio Rural Tático: Terreno, Construção, Água, Alimento, Defesa e Logística',
          description: 'Manual tático completo de refúgio rural no Brasil: critérios de terreno, construção resiliente, captação de água, autossuficiência alimentar, defesa perimetral, logística de chegada em crise e comunidade rural mínima.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/refugio-rural',
          primaryKeyword: 'refugio rural tatico',
          lsiKeywords: ['comprar sitio Brasil', 'autossuficiencia rural', 'construcao bioclimatica', 'captacao agua chuva', 'defesa rural', 'logistica evacuacao'],
          longTailKeywords: ['como escolher terreno rural seguro', 'construcao rural resiliente Brasil', 'autossuficiencia alimentar familia 4 pessoas', 'cerca perimetral rural eficaz', 'rota de evacuacao urbano para rural', 'quanto custa refugio rural completo'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Refúgio Rural', url: '/soberania-organica/refugio-rural' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/autonomia-energetica', '/soberania-organica/horta-urbana', '/soberania-organica/kit-72h', '/soberania-organica/abrigo-emergencia'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <FixedThematicBackground image={heroImg} intensity="soft" />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="min-h-screen text-foreground relative z-10">
        <CinematicHero
          image={heroImg}
          icon={Mountain}
          phase="Soberania Orgânica · Refúgio Rural"
          title={
            <>
              Refúgio Rural Tático:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">o lugar para onde a família vai quando a cidade deixa de servir</span>
            </>
          }
          subtitle="A cidade resolveu uma equação que não se sustenta mais: densidade alta, dependência total de infraestrutura externa, vulnerabilidade extrema a apagão, desabastecimento e violência sistêmica. Refúgio rural não é fuga romântica nem capricho de hippie tardio. É infraestrutura de continuidade familiar acima de 30 dias. Terreno certo, construção honesta, água própria, alimento próprio, defesa visível, rota testada e vizinhança real são os 8 pilares que separam projeto que dura 3 gerações de fantasia que custa caro e morre em 5 anos."
        />

        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 01 · Doutrina do refúgio</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-8 text-foreground">A cidade é arquitetura de cooperação forçada — refúgio rural é arquitetura de cooperação livre</h2>
              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                <p>O modo de vida urbano contemporâneo brasileiro é uma máquina de extrair tempo, dinheiro e atenção da família em troca de conveniência aparente. Aluguel ou financiamento de R$ 3 a R$ 12 mil por mês, escola particular de R$ 1,5 a R$ 6 mil por filho, supermercado de R$ 2 a R$ 6 mil mensais, plano de saúde de R$ 1,5 a R$ 5 mil, transporte de R$ 1 a R$ 3 mil — antes de qualquer outra despesa, a família já trabalha 200 a 280 horas por mês só para manter o status quo urbano de classe média.</p>
                <p>Refúgio rural reordena essa equação. Não é necessariamente substituição imediata da residência urbana — para a maioria das famílias, é a segunda residência operacional que vira primeira em 3 a 7 anos, na medida em que infraestrutura amadurece, renda remota se consolida e a percepção de qualidade de vida se inverte. Em região certa do Brasil, com terreno produtivo de 2 a 5 hectares, casa bem feita, autossuficiência alimentar parcial e renda mantida via trabalho remoto, custo total de vida cai 40 a 70 por cento e qualidade percebida sobe na mesma proporção.</p>
                <p>Este manual estabelece os 8 pilares do refúgio rural sério. Não é guia de turismo agro nem propaganda de loteamento. É arquitetura tática de continuidade familiar acima de 30 dias em qualquer cenário de degradação urbana — apagão prolongado, desabastecimento, violência sistêmica, colapso financeiro pessoal, ou simplesmente a percepção crescente de que a vida em metrópole brasileira deixou de fazer sentido para quem busca soberania real.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 02 · Pilares operacionais</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">8 protocolos do refúgio rural tático</h2>
              <p className="text-lg text-foreground/70 font-light">Cada protocolo com imagem real, sequência operacional, base técnica e falhas críticas. Estude um por mês, integre um por trimestre ao longo de 24 meses.</p>
            </motion.div>

            <div className="space-y-16">
              {PILARES.map((p, i) => {
                const Icon = p.icon;
                const reverse = i % 2 === 1;
                return (
                  <motion.article
                    key={p.num}
                    {...fade(0.05)}
                    className="border border-border/40 bg-card/40 backdrop-blur-sm rounded-3xl overflow-hidden hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)] transition-all duration-500"
                  >
                    <div className={`grid lg:grid-cols-2 gap-0 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                      <div className="relative min-h-[320px] lg:min-h-[560px] overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.imageAlt}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                          width={1600}
                          height={1000}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-card/50" />
                        <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 flex items-center gap-4">
                          <span className="text-6xl md:text-7xl font-display text-amber-400/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">{p.num}</span>
                          <Icon className="w-9 h-9 text-amber-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]" />
                        </div>
                      </div>
                      <div className="p-8 md:p-12 space-y-6">
                        <h3 className="text-2xl md:text-4xl font-display tracking-tight text-foreground">{p.nome}</h3>
                        <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-light">{p.contexto}</p>
                        <div>
                          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary/80 mb-4">Sequência operacional</p>
                          <ol className="space-y-3">
                            {p.passos.map((passo, j) => (
                              <li key={j} className="flex gap-4 text-sm md:text-base text-foreground/75 leading-relaxed">
                                <span className="font-mono text-primary/60 shrink-0">{String(j + 1).padStart(2, '0')}</span>
                                <span>{passo}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="border-l-2 border-destructive/60 pl-4 py-1">
                          <p className="text-xs font-mono uppercase tracking-[0.25em] text-destructive mb-2">Falhas críticas</p>
                          <p className="text-sm text-foreground/70 leading-relaxed">{p.falhas}</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade(0)}>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 03 · Documentação e formalização</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">Sem documento blindado, refúgio rural é castelo na areia jurídica</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Comprou terreno sem matrícula atualizada do Cartório de Registro de Imóveis, sem ITR em dia, sem georreferenciamento (obrigatório para imóveis acima de 4 módulos fiscais conforme Lei 10.267/2001), sem CAR (Cadastro Ambiental Rural conforme Código Florestal de 2012)? Você tem posse de fato mas não tem propriedade jurídica blindada. Em qualquer disputa futura — usucapião de invasor, ação de área protegida, conflito de divisa — a propriedade evapora.</p>
                <p>Documentação completa exige investimento de R$ 8 a R$ 35 mil em escritura, registro, georreferenciamento, CAR e regularização ambiental. Parece caro até comparar com perda de R$ 200 a R$ 800 mil em terreno disputado. Sem essa camada, o refúgio rural é uma promessa frágil — não uma fortaleza geracional.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)}>
              <img src={imgLegal} alt="Documentação rural sobre escrivaninha de madeira: matrícula do CRI, mapa georreferenciado, recibo de ITR, lupa e caneta, luz natural de janela" className="rounded-2xl border border-border/40 w-full" loading="lazy" width={1600} height={1000} />
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade(0.1)} className="order-2 lg:order-1">
              <img src={imgCotidiano} alt="Cozinha de fogão a lenha em casa de pedra rural com família preparando refeição, brilho do fogo, ervas secas penduradas, panelas de ferro, ambiente rural noturno" className="rounded-2xl border border-border/40 w-full" loading="lazy" width={1600} height={1000} />
            </motion.div>
            <motion.div {...fade(0)} className="order-1 lg:order-2">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 04 · O cotidiano que se forma</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">A vida que aparece quando a cidade deixa de mandar</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Em 18 a 36 meses de operação contínua no refúgio, a família percebe que o cotidiano se reorganiza em ritmos circadianos reais. Acordar com o sol às 5h30 da manhã, café da manhã com ovo da galinha do quintal e fruta da árvore plantada, trabalho remoto produtivo das 8h às 14h num escritório silencioso com vista para a serra, tarde dedicada à horta, ao pomar, à manutenção de infraestrutura ou ao convívio com a família, jantar simples preparado com ingredientes próprios, leitura à luz quente do fogão a lenha em vez de tela azul até meia-noite.</p>
                <p>Renda em moeda forte (Bitcoin, USD remoto) financia o que ainda precisa ser comprado fora — eletrônica, vestuário técnico, livros, viagens ocasionais à cidade. Crianças crescem com noção real de origem do alimento, de ciclo natural, de trabalho manual digno, de comunidade próxima. Adultos perdem o cansaço crônico urbano em 6 a 12 meses, recuperam sono profundo, reduzem ansiedade, reaprendem a contemplar sem culpa de produtividade. Não é volta romântica ao passado — é arquitetura deliberada de futuro com escolha real.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30 bg-destructive/5">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-destructive mb-6">Capítulo 05 · Erros que destroem o investimento</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">6 erros fatais que aparecem em todo refúgio rural mal planejado</h2>
              <p className="text-lg text-foreground/70 font-light">Padrão extraído de 100+ projetos rurais brasileiros visitados entre 2020 e 2025. Se um destes está no seu plano, urgência é absoluta antes de assinar escritura.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {ERROS_FATAIS.map((e, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.05)}
                  className="border border-destructive/30 bg-card/60 backdrop-blur-sm rounded-xl p-6 hover:border-destructive/60 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-display text-foreground mb-2">{e.titulo}</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 06 · Execução em 24 meses + maturidade</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">Plano de implementação progressiva</h2>
              <p className="text-lg text-foreground/70 font-light">Construção em 24 meses do refúgio operacional, mais 3 a 5 anos para maturidade plena do sistema. Sem pressa, sem desperdício, com cada etapa testada antes da seguinte.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {CHECKLIST.map((c, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.03)}
                  className="flex items-start gap-4 border border-border/40 bg-card/30 rounded-xl p-5 hover:border-primary/40 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed">{c}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fade(0)} className="mb-16">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 07 · Perguntas frequentes</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight text-foreground">Dúvidas que decidem se o refúgio dura 3 gerações ou morre em 5 anos</h2>
            </motion.div>
            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <motion.div key={i} {...fade(i * 0.04)} className="border border-border/40 bg-card/40 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-card/60 transition-colors"
                  >
                    <span className="text-base md:text-lg font-medium text-foreground">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openIdx === i && (
                    <div className="px-6 pb-6 text-sm md:text-base text-foreground/75 leading-relaxed font-light">{f.a}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fade(0)}>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Continue a jornada</p>
              <h2 className="text-3xl md:text-5xl font-display tracking-tight text-foreground mb-10">O refúgio é o ponto onde todas as camadas convergem</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link to="/soberania-organica/autonomia-energetica" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Energia da casa</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Autonomia Energética <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/horta-urbana" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Produção alimentar</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Horta Produtiva <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/kit-72h" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Evacuação imediata</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Kit 72h <ArrowRight className="w-4 h-4" /></p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/50 text-center">
              <FileText className="inline w-3 h-3 mr-2" />
              Conteúdo educacional · Não constitui aconselhamento jurídico, agronômico ou de segurança · Consulte profissionais qualificados antes de qualquer decisão patrimonial
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default RefugioRural;
