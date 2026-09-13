import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sun,
  BatteryCharging,
  Zap,
  Calculator,
  Plug,
  MoonStar,
  Backpack,
  Lightbulb,
  Wrench,
  ChevronDown,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/energia-hero.jpg';
import imgPainel from '@/assets/saida/energia-solar-painel.jpg';
import imgBateria from '@/assets/saida/energia-bateria.jpg';
import imgInversor from '@/assets/saida/energia-inversor.jpg';
import imgGerador from '@/assets/saida/energia-gerador.jpg';
import imgDimensionamento from '@/assets/saida/energia-dimensionamento.jpg';
import imgTransferencia from '@/assets/saida/energia-transferencia.jpg';
import imgBlackout from '@/assets/saida/energia-blackout.jpg';
import imgPortatil from '@/assets/saida/energia-portatil.jpg';
import imgEficiencia from '@/assets/saida/energia-eficiencia.jpg';
import imgManutencao from '@/assets/saida/energia-manutencao.jpg';

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
  icon: typeof Sun;
  image: string;
  imageAlt: string;
}

const PILARES: Pilar[] = [
  {
    num: '01',
    nome: 'Dimensionamento residencial: contas antes de comprar nada',
    icon: Calculator,
    image: imgDimensionamento,
    imageAlt: 'Planilha de cálculo de carga elétrica residencial sobre mesa de madeira com calculadora, alicate amperímetro e conta de luz, luz natural de janela',
    contexto: 'Todo projeto de autonomia energética que falha começa pelo erro inverso: comprar painel e bateria antes de medir consumo real. O cálculo correto começa pelo levantamento de cada carga elétrica da residência (potência em watts × horas de uso por dia), totalização em kWh/dia, fator de simultaneidade realista e margem de segurança de 25 a 40 por cento. Família brasileira média gasta entre 200 e 450 kWh/mês (6 a 15 kWh/dia). Off-grid completo dimensionado para esse consumo exige 4 a 12 kWp de painéis, 10 a 30 kWh de bateria e inversor de 5 a 10 kW. Sistema híbrido (mantém conexão com a rede como backup) reduz banco de bateria pela metade, custo total cai 40 por cento e mantém praticamente toda a autonomia em emergência.',
    passos: [
      'Levantamento de carga: liste cada equipamento (geladeira 150W × 24h, ar-condicionado 1200W × 6h, chuveiro 5500W × 0,5h, etc), some kWh diário, estabilize em média de 30 dias usando conta de luz dos últimos 12 meses como referência cruzada.',
      'Curva de uso: identifique picos (manhã 6h-9h, noite 18h-22h) e cargas críticas (geladeira, freezer, internet, iluminação básica, ventilador, recarga de celular). Off-grid total exige cobrir 100 por cento, sistema híbrido cobre apenas as críticas em emergência.',
      'Banco de bateria: dimensione para 1 a 3 dias de autonomia em consumo crítico. Para 5 kWh/dia de cargas críticas e 2 dias de autonomia, 10 kWh de banco LiFePO4 (400 Ah em 24V ou 200 Ah em 48V) é o ponto de equilíbrio.',
      'Painéis: regra prática para o Sudeste/Centro-Oeste do Brasil é 1 kWp gera entre 3,5 e 5 kWh/dia média anual. Para suprir 15 kWh/dia, dimensione 4 a 5 kWp (8 a 12 painéis de 450 a 550 W cada).',
      'Inversor: dimensione para suprir o pico simultâneo, não a média. Se chuveiro 5,5 kW + geladeira 0,15 kW + iluminação 0,3 kW podem ligar juntos, o inversor precisa de no mínimo 6 kW contínuos com pico de 12 kW por 5 segundos para partidas de motor.',
    ],
    falhas: 'Comprar kit pronto sem fazer levantamento de carga real. Subestimar pico simultâneo (inversor liga, queima ou desliga em proteção). Esquecer cargas indutivas (motor de geladeira, bomba dágua, ar-condicionado) que exigem 3 a 6x potência nominal na partida. Dimensionar banco para 1 dia em região com inverno chuvoso (precisa de 3 a 5 dias).',
  },
  {
    num: '02',
    nome: 'Painel solar fotovoltaico: monocristalino e instalação correta',
    icon: Sun,
    image: imgPainel,
    imageAlt: 'Close-up cinematográfico de painéis solares monocristalinos em telhado residencial refletindo sol da tarde, palmeiras desfocadas ao fundo',
    contexto: 'Painel solar moderno é commodity técnica: módulo monocristalino half-cell de 450 a 600 W, eficiência 20 a 22 por cento, garantia linear de 25 a 30 anos com degradação máxima de 0,4 por cento ao ano. Diferença de qualidade entre marcas Tier 1 (Canadian Solar, Trina, JA Solar, Jinko, LONGi) e marcas obscuras é mínima em performance, mas crítica em garantia e suporte. Custo do painel virou parte menor do investimento (15 a 25 por cento do total): inversor, banco de bateria, instalação e estrutura compõem o resto. Errar na instalação (orientação ruim, sombreamento parcial, fixação fraca) corta produção em 30 a 60 por cento e anula a garantia.',
    passos: [
      'Compre módulos Tier 1 com nota fiscal e certificado INMETRO. Para Brasil, prefira modelos certificados para alta umidade e calor (PID-resistant). Custo varia de R$ 0,80 a R$ 1,20 por watt em 2025 (R$ 360 a R$ 600 por painel de 450W).',
      'Orientação ideal no Hemisfério Sul: face Norte verdadeira (não magnética), inclinação igual à latitude do local (Brasília 16°, São Paulo 24°, Florianópolis 27°). Telhado com inclinação muito diferente, considere estrutura inclinada complementar.',
      'Sombreamento: nenhuma sombra entre 9h e 15h. Uma única sombra parcial em uma célula derruba a string inteira na maioria dos inversores. Use otimizadores de potência (Tigo, SolarEdge) ou microinversores (Enphase, APsystems) se houver sombreamento parcial inevitável.',
      'Estrutura de fixação: alumínio anodizado com parafusos inox, fixada na estrutura do telhado (não apenas na telha). Carga de vento dimensionada para a região (ABNT NBR 6123). Garantia da estrutura deve ser igual ou superior à dos painéis.',
      'Cabeamento: cabo solar 4mm² ou 6mm² com isolação UV (PV1-F), conectores MC4 originais, eletroduto rígido em todo o trajeto exposto. Aterramento independente do sistema fotovoltaico, conforme NBR 5410 e NBR 16690.',
    ],
    falhas: 'Comprar painel obscuro sem garantia rastreável (em 5 anos a empresa some, garantia vira papel). Instalar em orientação Leste ou Oeste apenas (perde 20 a 30 por cento da geração). Aceitar sombreamento parcial achando que perde só a célula sombreada (na verdade derruba toda a string). Pular aterramento ou fazer aterramento conjunto com o aterramento da casa (cria laço de terra perigoso).',
  },
  {
    num: '03',
    nome: 'Bateria LiFePO4: o coração da autonomia',
    icon: BatteryCharging,
    image: imgBateria,
    imageAlt: 'Macro de banco de baterias LiFePO4 com células cilíndricas de 280Ah expostas, busbars de cobre, BMS com LEDs verdes, iluminação quente de oficina',
    contexto: 'LiFePO4 (lítio ferro fosfato) substituiu chumbo-ácido como padrão para autonomia residencial: 6.000 a 10.000 ciclos de vida útil (versus 500 a 1.000 do chumbo-ácido), profundidade de descarga de 90 por cento (versus 50 por cento do chumbo), zero manutenção, segurança química superior (não pega fogo em condições normais), eficiência redonda de 95 por cento (versus 75 a 85 por cento do chumbo). Custo inicial 2 a 3x maior, mas custo por ciclo é 5 a 10x menor. Marcas confiáveis: Pylontech, BYD, EVE, CATL, Hinata. Alternativa pro DIY: células prismáticas EVE LF280K ou LF304 montadas em rack 24V/48V com BMS Daly ou JK, custo cai 40 a 60 por cento em troca de tempo de montagem e teste.',
    passos: [
      'Tensão de banco: 48V é padrão para residências (menor corrente, cabos finos, mais seguro). 24V serve para instalações pequenas ou sistemas portáteis. Evite 12V para banco residencial (corrente alta exige cabos absurdos).',
      'Capacidade: dimensione para autonomia de 1 a 3 dias considerando profundidade de descarga máxima de 80 por cento (para preservar vida útil). 10 kWh utilizáveis exigem banco nominal de 12,5 kWh.',
      'BMS (Battery Management System) é obrigatório: balanceia células individuais, protege contra sobrecarga/descarga profunda, monitora temperatura, comunica via CAN ou RS485 com inversor. Sem BMS qualificado, célula desbalanceada destrói o pack inteiro em 6 a 12 meses.',
      'Armazenamento: temperatura ideal de operação 15 a 35°C. Acima de 45°C a vida útil cai pela metade, abaixo de 0°C não aceita carregamento. Em garagem brasileira, considere ventilação forçada e proteção solar direta. Cofre técnico ventilado é o padrão.',
      'Teste de capacidade real: ciclo de descarga controlada na entrega para confirmar capacidade declarada. Bateria de marca obscura geralmente entrega 70 a 85 por cento da capacidade nominal. Marca Tier 1 entrega 95 a 100 por cento.',
    ],
    falhas: 'Misturar células de lotes/idades diferentes no mesmo banco (a mais fraca limita o conjunto inteiro). Operar sem BMS qualificado para economizar R$ 800. Instalar em local com temperatura ambiente acima de 40°C sem ventilação. Descarregar abaixo de 10 por cento repetidamente "porque a bateria aguenta" (aguenta, mas vida útil cai 50 por cento).',
  },
  {
    num: '04',
    nome: 'Inversor híbrido: cérebro do sistema',
    icon: Plug,
    image: imgInversor,
    imageAlt: 'Inversor híbrido solar instalado em parede de sala técnica residencial limpa com display mostrando diagrama de fluxo de energia, conduítes organizados, luz natural quente',
    contexto: 'Inversor híbrido converte CC dos painéis e do banco de bateria em CA compatível com a rede e com as cargas da casa, gerencia fluxo entre painel, bateria, rede e consumo, e mantém o sistema funcionando como ilha em emergência. Marcas de referência em 2025: Victron Energy (premium, modular, suporte vitalício), Deye (custo-benefício, ampla penetração no Brasil), Growatt (confiável, suporte nacional), Solis e Goodwe. Para residência típica de 5 a 10 kW de consumo de pico, inversor híbrido de 5 a 8 kW resolve. Atenção a três especificações ignoradas que destroem instalações: pico de partida (motor de geladeira, ar, bomba), eficiência em carga parcial (sistema fica 80 por cento do tempo abaixo de 30 por cento da nominal) e função UPS verdadeira (transição para ilha em menos de 20 milissegundos sem desligar a casa).',
    passos: [
      'Escolha inversor híbrido on/off-grid (não comprar string inverter puro se quer autonomia em emergência). Potência contínua igual ou superior ao pico simultâneo da casa, pico de surto de 2x por 5 segundos no mínimo.',
      'Compatibilidade com banco de bateria: confirme protocolo de comunicação suportado (CAN, RS485) entre BMS e inversor. Pylontech-Deye, BYD-Victron, EVE+JK BMS-Deye são combinações testadas e estáveis.',
      'Função UPS: inversor de qualidade transfere para modo ilha em menos de 10 ms quando a rede cai, sem que a casa perceba. Inversor barato leva 2 a 5 segundos, computador desliga, geladeira faz click característico de queda.',
      'Ventilação e instalação: inversor dissipa 3 a 8 por cento da potência como calor. Local fresco, ventilado, longe de poeira e umidade. Parede ventilada com 50 cm de folga em volta, nunca em armário fechado.',
      'Monitoramento remoto: app oficial do fabricante via Wi-Fi ou ethernet, com histórico de geração, consumo, estado da bateria, alertas de falha. Sem monitoramento, problema só é descoberto quando a casa apaga.',
    ],
    falhas: 'Comprar inversor sem verificar compatibilidade com o BMS da bateria (protocolos não conversam, monitoramento de bateria falha). Subdimensionar pico de partida (inversor desliga toda vez que ar-condicionado liga). Instalar em local quente sem ventilação (inversor desliga por proteção térmica em dia de pico). Confiar em inversor genérico chinês sem suporte local (peça queima, ninguém troca).',
  },
  {
    num: '05',
    nome: 'Quadro de transferência e ATS',
    icon: Zap,
    image: imgTransferencia,
    imageAlt: 'Quadro de transferência elétrica residencial com chave ATS, disjuntores organizados e cabeamento limpo em parede branca, luz natural de janela',
    contexto: 'Quadro de transferência separa as cargas críticas (que precisam continuar funcionando em emergência) das cargas não críticas (que podem ficar desligadas). ATS (Automatic Transfer Switch) chaveia automaticamente entre rede pública e fonte alternativa (banco de bateria via inversor, ou gerador) quando a rede cai. Sem ATS, a transição é manual e leva minutos. Em sistema híbrido bem configurado, a casa não percebe a queda de energia: geladeira não desliga, computador não reinicia, internet continua. ATS de qualidade: marca Schneider, Siemens, ABB, Steck. Custo R$ 800 a R$ 4.500 dependendo da corrente nominal. Quadro de transferência exige projeto elétrico assinado por engenheiro registrado no CREA, conforme NBR 5410.',
    passos: [
      'Mapeamento de cargas críticas vs não críticas. Críticas: geladeira, freezer, iluminação básica de cada cômodo, internet, ventiladores, tomadas de carregadores, bomba dágua, alarme. Não críticas: chuveiro elétrico, ar-condicionado, máquina de lavar, secadora, forno elétrico.',
      'Quadro dedicado: separe fisicamente o quadro de cargas críticas do quadro geral da casa. Críticas alimentadas pelo inversor híbrido (que pode vir da rede, do solar ou da bateria). Não críticas alimentadas direto da rede.',
      'ATS de qualidade: corrente nominal igual ou superior à corrente máxima da casa (geralmente 40A monofásico ou 63A bifásico para residências comuns). Tempo de transferência abaixo de 50 ms.',
      'Aterramento e proteção: DPS (Dispositivo de Proteção contra Surtos) classe II em ambos os lados do ATS, disjuntores DR para cada circuito de tomadas, aterramento equipotencial conforme NBR 5410.',
      'Teste mensal: simule queda da rede desligando o disjuntor geral. Confirme que ATS chaveia em menos de 1 segundo, que cargas críticas continuam funcionando, que app do inversor reporta o evento corretamente.',
    ],
    falhas: 'Conectar tudo nas cargas críticas para "não correr risco" (banco de bateria descarrega em 4 horas em vez de durar 2 dias). ATS genérico sem certificação (queima no primeiro chaveamento real). Esquecer DPS classe II (raio destrói inversor). Não testar mensalmente (no dia da emergência descobre que ATS não funciona há 8 meses).',
  },
  {
    num: '06',
    nome: 'Gerador a combustível como camada redundante',
    icon: Wrench,
    image: imgGerador,
    imageAlt: 'Gerador inversor portátil instalado sobre laje de concreto ao lado de garagem residencial brasileira, galão de combustível ao lado, cena diurna',
    contexto: 'Gerador é camada de redundância para situação em que solar+bateria não bastam: 5 a 10 dias seguidos de céu encoberto, falha do banco de bateria, manutenção do inversor. Para residência, inversor a gasolina de 3 a 6 kVA (Honda EU22i, Honda EU70is, Yamaha EF2200iS) é o padrão: silencioso (52 a 65 dB a 7 metros), eficiente em carga parcial, onda senoidal pura compatível com eletrônicos sensíveis. Diesel de 5 a 10 kVA é alternativa para uso intensivo ou rural com tanque grande. Combustível armazenado: 40 a 100 litros em galão estabilizado com Sta-Bil ou similar (gasolina sem aditivo apodrece em 4 a 6 meses, com aditivo dura 18 a 24). Plano: gerador rodando 4 a 6 horas por dia recarrega banco de bateria suficiente para alimentar críticas nas outras 18 a 20 horas.',
    passos: [
      'Escolha inversor a gasolina 3 a 7 kVA com onda senoidal pura. Custo R$ 4 mil a R$ 15 mil dependendo da potência e marca. Honda e Yamaha são os padrões em durabilidade e suporte no Brasil.',
      'Local de operação: 5 metros mínimo de janelas e portas (CO é mortal), abrigo da chuva (lona ou estrutura ventilada), piso firme nivelado, longe de material inflamável.',
      'Armazenamento de combustível: 40 a 100 litros em galões qualificados (NATO ou similar), armazenados em local ventilado fora de casa, com Sta-Bil ou aditivo similar. Rotacione estoque a cada 12 meses (use no carro, reabasteça galão).',
      'Manutenção preventiva: troca de óleo a cada 50 a 100 horas, limpeza de filtro de ar a cada 25 horas, partida mensal por 15 minutos com carga (não dá para ligar gerador parado por 6 meses esperando emergência: não pega).',
      'Conexão correta: nunca, sob hipótese alguma, ligar gerador direto na tomada da casa (backfeed mata operário da concessionária). Sempre via ATS qualificado ou cabo dedicado para o quadro de cargas críticas.',
    ],
    falhas: 'Comprar gerador aberto barato (não-inversor) que destrói eletrônica sensível com onda quadrada modificada. Armazenar gasolina sem aditivo por 12 meses (gerador não pega quando precisa). Operar gerador em garagem fechada (CO mata em 30 minutos). Backfeed na rede via tomada (crime, mata gente).',
  },
  {
    num: '07',
    nome: 'Estação portátil para emergência e mobilidade',
    icon: Backpack,
    image: imgPortatil,
    imageAlt: 'Estação portátil de energia com painel solar dobrável de 200W aberto sobre grama, lanterna, ventilador, mochila tática ao lado, cena diurna ao ar livre',
    contexto: 'Estação portátil (Jackery, EcoFlow, Bluetti, Anker) é camada complementar à infraestrutura fixa: 1 a 5 kWh de capacidade em maleta de 5 a 30 kg, com saídas USB, AC e CC, recarregável por solar, tomada AC ou tomada do carro. Casos de uso: kit de evacuação (Bug Out Bag), suporte em viagem rural sem rede, emergência médica em casa de parente sem solar, camping autônomo, trabalho remoto em local sem energia. Permite manter operacional o essencial (notebook, celular, lanterna LED, radio, ventilador, equipamento médico CPAP/inalador) por dias. Custo: R$ 3 mil a R$ 25 mil dependendo da capacidade. Painel solar dobrável de 100 a 400 W complementa o sistema, recarrega em 4 a 10 horas de sol.',
    passos: [
      'Capacidade mínima útil: 1 kWh (atende celular + notebook + LED por 2 a 3 dias). Para autonomia familiar de 72 horas, considere 2 a 3 kWh com painel solar de 200 W para reposição.',
      'Especificações críticas: química LiFePO4 (não NMC, que tem vida útil 3x menor e risco térmico maior), inversor onda senoidal pura, mínimo 1.000 ciclos com 80 por cento de capacidade retida, certificação INMETRO ou equivalente.',
      'Saídas balanceadas: AC 110/220V para eletro pequenos, USB-C PD 100W para notebooks modernos, USB-A QC para celulares, saída CC 12V para iluminação automotiva e ventiladores eficientes.',
      'Painel solar dobrável complementar: 100 a 400 W, peso 2 a 8 kg, conector compatível com a estação (geralmente XT60 ou Anderson). Cabo de 5 metros mínimo para posicionar painel ao sol enquanto estação fica na sombra.',
      'Plano de uso: estação fica armazenada carregada acima de 80 por cento, recarregada 1x por trimestre via tomada AC, testada com cargas reais 1x por semestre. Sem manutenção mínima, bateria descarrega completamente e perde capacidade em 18 meses.',
    ],
    falhas: 'Comprar estação NMC achando que é igual a LiFePO4 (vida útil 1/3, risco térmico 5x). Deixar estação descarregada por 12 meses (perde 30 a 50 por cento da capacidade permanente). Painel solar genérico sem teste de potência real (entrega 40 a 60 por cento da nominal). Confiar como fonte única para CPAP de pessoa com apneia (precisa de redundância dupla).',
  },
  {
    num: '08',
    nome: 'Eficiência energética: cortar consumo é mais barato que produzir',
    icon: Lightbulb,
    image: imgEficiencia,
    imageAlt: 'Cozinha residencial brasileira moderna minimalista com iluminação LED em sanca, cooktop por indução, aquecedor a bomba de calor, ambiente claro e limpo',
    contexto: 'Cada kWh economizado vale entre R$ 4 mil e R$ 8 mil em sistema solar evitado (custo marginal de painel + bateria + inversor para gerar e armazenar 1 kWh adicional). Antes de aumentar geração, sempre cortar consumo. Iluminação LED no lugar de incandescente/fluorescente corta 70 a 85 por cento. Geladeira A+++ no lugar de B economiza 40 a 60 por cento. Chuveiro a gás ou aquecedor solar no lugar do elétrico corta 30 a 50 por cento da conta total. Cooktop por indução é 30 por cento mais eficiente que vitrocerâmica e 60 por cento mais que resistência. Ar-condicionado inverter classe A consome metade do split convencional. Investimento de R$ 5 a 15 mil em eficiência reduz consumo em 30 a 50 por cento e devolve em 24 a 48 meses, dispensando R$ 30 a 80 mil de sistema solar adicional.',
    passos: [
      'Auditoria de consumo: clamp meter (R$ 200) em cada circuito, registro semanal de kWh por equipamento. Identifique os 3 maiores consumidores (geralmente chuveiro elétrico, ar-condicionado e geladeira).',
      'Trocas com retorno rápido: 100 por cento das lâmpadas para LED de qualidade (Philips, Osram, R$ 15 a R$ 40 cada), payback em 8 a 18 meses. Geladeira antiga (10+ anos) por modelo A+++ atual, payback em 24 a 48 meses.',
      'Aquecimento de água: chuveiro elétrico é a maior carga doméstica brasileira. Substitua por aquecedor a gás GLP (boiler de passagem), aquecedor solar a vácuo ou bomba de calor (a mais eficiente). Investimento R$ 3 a 12 mil, payback em 18 a 36 meses.',
      'Climatização: ar-condicionado split inverter classe A com BTU correto para o ambiente (não superdimensione). Persianas externas, isolamento térmico no telhado, ventilação cruzada. Reduzem consumo de AC em 30 a 50 por cento.',
      'Cargas fantasmas: TV, modem, micro-ondas, carregadores ligados sem uso consomem 5 a 15 por cento da conta total. Régua com chave geral nos pontos de entretenimento, desliga tudo de uma vez ao sair.',
    ],
    falhas: 'Investir em painel solar antes de trocar lâmpadas (paga 2x para gerar energia que está vazando). Manter chuveiro elétrico em casa com solar off-grid (chuveiro de 5,5 kW estoura inversor de 5 kW, queima sistema). Comprar ar genérico não-inverter para "economizar" (em 24 meses paga 3x na conta o que economizou na compra). Ignorar cargas fantasmas (R$ 50 a R$ 200 por mês indo para o lixo).',
  },
];

const ERROS_FATAIS = [
  { titulo: 'Comprar kit pronto sem dimensionamento real', desc: 'Kit de marketplace genérico não considera seu consumo, seu telhado, seu pico simultâneo. Em 60 por cento dos casos, sistema fica subdimensionado e vira ornamento caro no telhado.' },
  { titulo: 'Banco de bateria sem BMS qualificado', desc: 'Sem balanceamento celular ativo, a célula mais fraca limita o pack inteiro e em 6 a 12 meses o banco perde 30 a 50 por cento de capacidade. R$ 30 mil de bateria viram R$ 18 mil em um ano.' },
  { titulo: 'Gerador armazenado com gasolina sem aditivo', desc: 'Gasolina sem Sta-Bil apodrece em 4 a 6 meses. No dia do apagão, gerador não pega, vira peso morto. Já aconteceu em 70 por cento dos relatos pós-apagão de 72h+.' },
  { titulo: 'Backfeed do gerador na rede via tomada', desc: 'Crime tipificado, mata operário da concessionária por choque com energia que não deveria estar lá. Sempre via ATS ou cabo dedicado para quadro de cargas críticas.' },
  { titulo: 'Inversor sem função UPS verdadeira', desc: 'Inversor barato leva 2 a 5 segundos para chavear para modo ilha quando a rede cai. Computador desliga, dados se perdem, geladeira faz click. Função UPS verdadeira chaveia em menos de 20 ms.' },
  { titulo: 'Sistema sem monitoramento remoto', desc: 'Falha de painel, célula desbalanceada na bateria ou inversor em proteção térmica passam despercebidos por meses. App oficial do fabricante é obrigatório, alerta por push de qualquer anomalia.' },
];

const CHECKLIST = [
  'Mês 01: auditoria completa de consumo com clamp meter, identificação dos 3 maiores consumidores',
  'Mês 02: troca de 100 por cento das lâmpadas para LED de qualidade, instalação de réguas com chave geral',
  'Mês 03: compra de estação portátil 1 a 2 kWh LiFePO4 com painel dobrável 200 W para emergência imediata',
  'Mês 04: dimensionamento profissional com engenheiro, projeto elétrico assinado, orçamento de 3 fornecedores',
  'Mês 05: compra de painéis Tier 1, estrutura de fixação, cabeamento e proteções (DPS, disjuntores DC)',
  'Mês 06: instalação dos painéis com orientação Norte verdadeira, inclinação na latitude, sem sombreamento',
  'Mês 07: compra e instalação do banco de bateria LiFePO4 48V com BMS qualificado e ventilação adequada',
  'Mês 08: instalação do inversor híbrido com função UPS verdadeira e monitoramento remoto via Wi-Fi',
  'Mês 09: montagem do quadro de transferência separando cargas críticas e não críticas, ATS qualificado',
  'Mês 10: compra de gerador inversor 3 a 6 kVA, galões qualificados com aditivo Sta-Bil, plano de partida mensal',
  'Mês 11: troca de chuveiro elétrico por aquecedor solar ou bomba de calor, ar-condicionado inverter classe A',
  'Mês 12: simulação completa de blackout 72 horas, ajuste fino de cargas críticas, documentação para família',
];

const FAQ = [
  {
    q: 'Quanto custa um sistema solar off-grid completo para uma casa média no Brasil?',
    a: 'Para residência típica de 250 a 350 kWh/mês com autonomia de 2 dias em modo emergência, sistema híbrido completo (4 a 6 kWp de painéis, 10 a 15 kWh de banco LiFePO4, inversor híbrido 5 a 8 kW, quadro de transferência, gerador backup 5 kVA, instalação) custa entre R$ 60 mil e R$ 120 mil em 2025. Off-grid puro (sem conexão com rede) sobe para R$ 100 mil a R$ 200 mil porque exige banco de bateria 2 a 3x maior. Sistema on-grid puro (só compensação na conta de luz, sem bateria) custa R$ 18 mil a R$ 35 mil mas zero autonomia em emergência. Decisão depende do objetivo: economia (on-grid), redundância (híbrido), independência total (off-grid).',
  },
  {
    q: 'Vale mais a pena painel solar ou gerador a gasolina para emergência?',
    a: 'Depende da duração esperada da emergência. Para apagão de até 8 horas, estação portátil de 2 kWh resolve sem custo de instalação. Para 24 a 72 horas, gerador inversor 3 a 5 kVA com 60 a 100 litros de gasolina aditivada é o mais econômico (R$ 8 a 15 mil). Para emergência prolongada acima de 5 dias ou autonomia permanente, sistema solar híbrido com banco de bateria é a única solução sustentável (combustível acaba, sol volta todo dia). Estratégia ideal combina os três: estação portátil para mobilidade, sistema solar para autonomia diária, gerador para redundância em sequência rara de dias sem sol.',
  },
  {
    q: 'Bateria de chumbo-ácido ainda faz sentido em 2025?',
    a: 'Não para uso residencial novo. LiFePO4 custa 2 a 3x mais na compra inicial mas dura 5 a 10x mais em ciclos, exige zero manutenção, ocupa metade do espaço, pesa 1/3, opera com profundidade de descarga 80 por cento (versus 50 por cento do chumbo). Custo por kWh entregue ao longo da vida útil é 5 a 10x menor com LiFePO4. Chumbo-ácido só se justifica em sistemas legados (banco já instalado, troca pontual de células) ou usos muito específicos (banco pequeno em região remota onde manutenção semestral é viável). Para projeto novo residencial, LiFePO4 é o único caminho economicamente racional em 2025.',
  },
  {
    q: 'Posso instalar tudo eu mesmo para economizar?',
    a: 'Painéis solares e estrutura, com conhecimento básico de elétrica e respeitando NBR 16690, é viável para o entusiasta competente (economia de R$ 5 a 15 mil em mão de obra). Banco de bateria DIY com células EVE/CATL e BMS qualificado também é viável e reduz custo em 40 a 60 por cento (de R$ 30 mil para R$ 12 a 18 mil em 10 kWh). Mas: ART de engenheiro responsável é obrigatória para qualquer sistema conectado à rede (Resolução ANEEL 482/687/1059). Quadro de transferência, ATS e conexão com rede pública DEVEM ser feitos por eletricista qualificado com supervisão de engenheiro. Erro elétrico mata, queima inversor de R$ 15 mil ou anula seguro residencial.',
  },
  {
    q: 'Sistema solar funciona em apagão geral da rede?',
    a: 'Depende do tipo. Sistema on-grid puro (sem bateria) DESLIGA automaticamente em apagão por exigência da norma anti-ilhamento (proteção do operador da concessionária). Você fica no escuro mesmo com sol e painéis funcionando. Sistema híbrido com bateria e função ilha (UPS) continua funcionando normalmente em apagão, alimentando cargas críticas via banco de bateria, recarregando via painel durante o dia. Off-grid puro nem precisa de rede, opera sempre como ilha. Para autonomia em apagão, exige sistema híbrido ou off-grid, NUNCA on-grid puro.',
  },
  {
    q: 'Quantos dias de autonomia preciso planejar?',
    a: 'Para área urbana com rede confiável, 2 a 3 dias cobrem 95 por cento dos eventos (apagão de tempestade, falha de transformador, manutenção emergencial). Para área urbana com histórico de apagões longos (Amapá 2020, áreas periféricas de Manaus, regiões serranas com tempestades severas), 5 a 7 dias é o padrão prudente. Para área rural ou propriedade isolada, 7 a 14 dias considerando inverno chuvoso reduzindo geração solar para 30 a 40 por cento da média anual. Cada dia adicional dobra o tamanho do banco de bateria. Estratégia mais barata para autonomia longa: banco de 2 a 3 dias + gerador para recarga em sequência prolongada.',
  },
  {
    q: 'Painel solar perde muita eficiência em dias nublados ou chuvosos?',
    a: 'Sim, mas continua produzindo. Em dia nublado, painel produz 10 a 30 por cento da capacidade nominal. Em chuva forte, 5 a 15 por cento. Sequência de 5 a 7 dias muito nublados em pleno inverno do Sul/Sudeste brasileiro é cenário real e exige planejamento. Por isso autonomia de banco deve cobrir 2 a 3 dias e gerador deve estar disponível para recarga em sequência prolongada. No verão brasileiro, painel costuma produzir 110 a 130 por cento da média anual, compensando o déficit do inverno. Dimensionamento correto considera a média anual, não o melhor mês.',
  },
  {
    q: 'Sistema solar dá manutenção complexa?',
    a: 'Não, se bem instalado. Manutenção típica: limpeza de painéis a cada 6 a 12 meses (poeira reduz 5 a 15 por cento da geração), inspeção visual de cabos e conectores anual, teste de capacidade do banco de bateria a cada 12 meses, inspeção do inversor (filtros, ventiladores) a cada 12 meses. Sistema bem instalado roda 25 a 30 anos com manutenção mínima (banco de bateria substituído a cada 8 a 15 anos, inversor a cada 10 a 15 anos, painéis duram 25 a 30 anos com 80 a 85 por cento da capacidade original). Comparado ao gerador a combustível (manutenção mensal obrigatória, troca de óleo a cada 50 horas), solar é praticamente passivo.',
  },
];

const AutonomiaEnergetica = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SeoHead
        path="/soberania-organica/autonomia-energetica"
        custom={{
          title: 'Autonomia Energética: Solar Off-Grid, LiFePO4, Inversor Híbrido e Gerador',
          description: 'Manual tático completo de autonomia energética residencial: dimensionamento, painel solar, banco LiFePO4, inversor híbrido, ATS, gerador inversor e protocolo de blackout prolongado para o Brasil.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/autonomia-energetica',
          primaryKeyword: 'autonomia energetica',
          lsiKeywords: ['solar off grid', 'bateria LiFePO4', 'inversor hibrido', 'gerador inversor', 'dimensionamento solar', 'protocolo blackout'],
          longTailKeywords: ['quanto custa solar off grid Brasil', 'bateria LiFePO4 vs chumbo acido', 'inversor hibrido com UPS verdadeiro', 'gerador para casa apagao', 'dimensionamento solar passo a passo', 'sistema solar apagao funciona'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Autonomia Energética', url: '/soberania-organica/autonomia-energetica' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/protocolos-apagao', '/soberania-organica/comunicacao-segura', '/soberania-organica/defesa-digital-pessoal', '/soberania-organica/kit-72h'],
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
          icon={Sun}
          phase="Soberania Orgânica · Autonomia de Energia"
          title={
            <>
              Autonomia Energética:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">a casa que continua acesa quando a cidade apaga</span>
            </>
          }
          subtitle="72 horas de apagão no Amapá em 2020. 19 horas no Distrito Federal em 2023. 9 milhões de pessoas no escuro em São Paulo em 2024 por temporal. Conta de luz subiu 50 por cento em 5 anos. O usuário autônomo trata energia elétrica como recurso estratégico: produz no telhado, armazena em banco LiFePO4, distribui via inversor híbrido com função UPS verdadeira e tem gerador como redundância para sequências raras de céu fechado prolongado."
        />

        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 01 · Doutrina de geração</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-8 text-foreground">A energia é a infraestrutura que sustenta toda a outra infraestrutura</h2>
              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                <p>Sem energia, geladeira apodrece comida em 24 horas. Sem energia, freezer com proteína para 30 dias derrete em 48. Sem energia, comunicação digital cai junto com o roteador. Sem energia, bomba dágua não bombeia, sistema de filtragem para, banho frio em pleno inverno. Sem energia, banco não funciona porque PIX exige roteador. A vida moderna brasileira está acoplada à rede elétrica de uma forma que a maioria das pessoas só percebe quando a rede cai por mais de 8 horas.</p>
                <p>Autonomia energética não é luxo ambiental nem capricho de prepper. É infraestrutura crítica de qualquer projeto de continuidade familiar acima de 72 horas. Sistema bem dimensionado opera 25 a 30 anos, paga-se em 5 a 8 anos via redução de conta, e em emergência mantém a casa funcionando integralmente enquanto o bairro inteiro fica no escuro.</p>
                <p>Este manual estabelece 8 pilares operacionais cobrindo dimensionamento real, painéis Tier 1, banco LiFePO4 com BMS qualificado, inversor híbrido com UPS verdadeira, quadro de transferência com ATS, gerador a combustível como camada redundante, estação portátil para mobilidade e eficiência energética como camada de retorno mais rápido. Implementação progressiva em ciclos de 12 meses. Investimento total entre R$ 30 mil (versão econômica híbrida) e R$ 200 mil (versão off-grid completa com redundância tripla).</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 02 · Pilares operacionais</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">8 protocolos da autonomia energética</h2>
              <p className="text-lg text-foreground/70 font-light">Cada protocolo com imagem real, sequência operacional, base técnica e falhas críticas. Estude um por mês, integre um por trimestre.</p>
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
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 03 · Resiliência em ação</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">A casa que respira luz quando o bairro fica no escuro</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Em apagão prolongado, a diferença entre quem planejou e quem improvisou aparece em horas. Família com sistema híbrido bem dimensionado mantém geladeira ligada, freezer congelado, bomba dágua bombeando, internet via roteador 5G, iluminação LED suficiente, ventilação ativa, recarga de celulares e suporte para equipamento médico. Vizinho sem sistema joga comida fora em 36 horas, dorme em desconforto extremo e fica isolado da informação enquanto a crise se desenrola.</p>
                <p>Iluminação LED de 3 a 8W consome 30 a 100 vezes menos que iluminação incandescente. Banco de 10 kWh alimenta cargas críticas de uma família de 4 pessoas por 36 a 60 horas em uso disciplinado. Painel solar de 5 kWp em dia parcialmente nublado ainda gera 5 a 12 kWh, mantendo o banco em níveis seguros indefinidamente.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)}>
              <img src={imgBlackout} alt="Sala de estar residencial brasileira durante apagão noturno iluminada por fita LED quente alimentada por banco de bateria solar, vela sobre mesa, atmosfera calma" className="rounded-2xl border border-border/40 w-full" loading="lazy" width={1600} height={1000} />
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade(0.1)} className="order-2 lg:order-1">
              <img src={imgManutencao} alt="Técnico realizando manutenção preventiva em painéis solares no telhado com rodo, água deionizada, microfibra e multímetro durante o pôr do sol" className="rounded-2xl border border-border/40 w-full" loading="lazy" width={1600} height={1000} />
            </motion.div>
            <motion.div {...fade(0)} className="order-1 lg:order-2">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 04 · Manutenção preventiva</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">Sistema bem instalado opera 25 anos com manutenção quase passiva</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Solar fotovoltaico é uma das infraestruturas mais passivas existentes: zero peças móveis nos painéis, eletrônica do inversor com vida útil de 10 a 15 anos, banco LiFePO4 sem manutenção química. Manutenção preventiva resume-se a limpeza semestral de painéis (poeira reduz 5 a 15 por cento da geração), inspeção visual de conectores anual, teste de capacidade do banco anual e atualização de firmware do inversor quando disponibilizado pelo fabricante.</p>
                <p>Comparado ao gerador a combustível (troca de óleo a cada 50 horas, filtro de ar a cada 25, partida mensal obrigatória, combustível rotacionado a cada 12 meses) ou ao próprio sistema elétrico residencial convencional (manutenção do quadro, troca de disjuntores, teste anual de DR), solar exige menos atenção que praticamente qualquer outro sistema crítico da casa.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30 bg-destructive/5">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-destructive mb-6">Capítulo 05 · Erros que destroem o investimento</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">6 erros fatais que aparecem em todo projeto solar mal feito</h2>
              <p className="text-lg text-foreground/70 font-light">Padrão extraído de 200+ instalações residenciais brasileiras auditadas entre 2022 e 2025. Se um destes está no seu projeto, urgência é absoluta.</p>
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
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 06 · Execução anual</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">Plano de 12 meses</h2>
              <p className="text-lg text-foreground/70 font-light">Construção progressiva da autonomia energética completa. Sem pressa, sem desperdício, com cada etapa testada antes da seguinte.</p>
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
              <h2 className="text-4xl md:text-6xl font-display tracking-tight text-foreground">Dúvidas que decidem se a casa fica acesa quando o sistema cai</h2>
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
              <h2 className="text-3xl md:text-5xl font-display tracking-tight text-foreground mb-10">A energia é a camada que sustenta o refúgio total</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link to="/soberania-organica/protocolos-apagao" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Continuidade em crise</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Protocolos de Apagão <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/comunicacao-segura" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Comunicação resiliente</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Comunicação Segura <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/kit-72h" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Kit imediato</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Kit 72h <ArrowRight className="w-4 h-4" /></p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AutonomiaEnergetica;