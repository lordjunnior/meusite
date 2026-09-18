import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartPulse, AlertTriangle, Activity, Wind, Snowflake, Package, ChevronDown,
  ArrowRight, Shield, Stethoscope, Bone, Flame, Droplets, Clock, Hand
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/socorros-taticos-hero.webp';
import imgTorniquete from '@/assets/saida/socorros-taticos-torniquete.webp';
import imgMarch from '@/assets/saida/socorros-taticos-march.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

interface MarchStep {
  letra: string;
  titulo: string;
  significado: string;
  prioridade: string;
  acoes: string[];
  tempoCritico: string;
  errosFatais: string;
}

const MARCH: MarchStep[] = [
  {
    letra: 'M',
    titulo: 'Massive Hemorrhage',
    significado: 'Hemorragia Massiva',
    prioridade: 'PRIORIDADE ABSOLUTA · 0 a 3 minutos',
    tempoCritico: 'Sangramento arterial mata em 2-5 minutos. Não há segunda chance.',
    acoes: [
      'Identificar fonte: jato pulsátil vermelho-vivo (artéria) ou fluxo escuro contínuo (veia).',
      'Pressão direta forte com a mão enluvada por no mínimo 3 minutos sem aliviar.',
      'Em extremidade (braço ou perna): aplicar torniquete CAT a 5-7 cm acima do ferimento, NUNCA sobre articulação.',
      'Apertar o windlass até o sangramento parar completamente. Se não parou, segundo torniquete acima do primeiro.',
      'Marcar a hora exata da aplicação na testa do paciente ou no torniquete (TQ + HH:MM).',
      'Em ferimento de tronco ou junção (axila, virilha): hemostático QuikClot Combat Gauze empacotado fundo + pressão por 3 min.',
    ],
    errosFatais: 'Aliviar a pressão para "ver se parou" reinicia o sangramento. Torniquete frouxo aumenta perda de sangue por bloquear apenas o retorno venoso.',
  },
  {
    letra: 'A',
    titulo: 'Airway',
    significado: 'Via Aérea',
    prioridade: 'CRÍTICO · 0 a 5 minutos',
    tempoCritico: 'Cérebro sem oxigênio = lesão irreversível em 4-6 minutos.',
    acoes: [
      'Verificar consciência: chamar pelo nome, estímulo doloroso no esterno.',
      'Se inconsciente: posicionar em decúbito lateral de segurança (PLS) para evitar aspiração.',
      'Manobra de chin-lift (elevação do queixo) ou jaw-thrust se suspeita de trauma cervical.',
      'Inspecionar boca: remover sangue, vômito, próteses, dentes soltos ou objetos estranhos com varredura digital.',
      'Cânula nasofaríngea (NPA): lubrificar, inserir na narina mais ampla com bisel para o septo, ângulo paralelo ao palato.',
      'Se trauma facial maciço impede via aérea: posicionamento sentado inclinado para frente para drenagem por gravidade.',
    ],
    errosFatais: 'Hiperextender o pescoço em vítima de trauma pode lesionar medula. Cânula orofaríngea em paciente consciente induz vômito e aspiração.',
  },
  {
    letra: 'R',
    titulo: 'Respiration',
    significado: 'Respiração',
    prioridade: 'CRÍTICO · 5 a 10 minutos',
    tempoCritico: 'Pneumotórax hipertensivo causa colapso cardiovascular em 10-20 minutos.',
    acoes: [
      'Expor o tórax completamente. Inspecionar 360° (frente, costas, axilas).',
      'Identificar ferimentos penetrantes: bala, faca, fragmento. Todo ferimento entre umbigo e clavícula é suspeito de tórax.',
      'Selo torácico vented (Halo, HyFin) sobre TODOS os ferimentos torácicos abertos. Limpar a pele antes para aderência.',
      'Reavaliar a cada 5 min: se aparecer dispneia progressiva, ingurgitamento jugular, desvio de traqueia ou hipotensão = pneumotórax hipertensivo.',
      'Pneumotórax hipertensivo é descompressão por agulha (NDC) no 2º espaço intercostal linha hemiclavicular, ou 5º EIC linha axilar anterior. Procedimento médico.',
      'Contar frequência respiratória: <10 ou >30 = sinal de alarme.',
    ],
    errosFatais: 'Selo oclusivo SEM válvula transforma pneumotórax simples em hipertensivo. Improvisar com plástico de embalagem é arriscado se você não souber criar válvula unidirecional com fita em 3 lados.',
  },
  {
    letra: 'C',
    titulo: 'Circulation',
    significado: 'Circulação',
    prioridade: 'IMPORTANTE · 10 a 20 minutos',
    tempoCritico: 'Choque hemorrágico classe III começa com perda de 30-40% da volemia.',
    acoes: [
      'Reavaliar todos os torniquetes e hemostáticos aplicados. Sangramento secundário é comum.',
      'Avaliar perfusão: pulso radial presente = pressão sistólica >80 mmHg. Pulso radial ausente + carotídeo presente = sistólica 60-80 mmHg = choque grave.',
      'Tempo de enchimento capilar: pressionar leito ungueal por 3 seg. Retorno >3 seg = perfusão comprometida.',
      'Sinais de choque: pele fria, pegajosa, pálida, taquicardia (>100 bpm), confusão mental, sede intensa.',
      'Posicionar em decúbito dorsal, elevar membros inferiores 30° (Trendelenburg modificado), cobrir com manta térmica.',
      'NÃO oferecer líquidos por via oral em vítima inconsciente, com trauma abdominal ou suspeita de cirurgia iminente.',
    ],
    errosFatais: 'Hidratação oral excessiva em choque pode causar aspiração se nível de consciência cair. Trendelenburg total (cabeça abaixo) piora função respiratória.',
  },
  {
    letra: 'H',
    titulo: 'Hypothermia / Head Injury',
    significado: 'Hipotermia e Trauma Craniano',
    prioridade: 'IMPORTANTE · 20 minutos em diante',
    tempoCritico: 'Tríade letal: hipotermia + acidose + coagulopatia. Cada 1°C abaixo de 35°C dobra a mortalidade.',
    acoes: [
      'Manta térmica de emergência (mylar) cobrindo TODO o corpo, incluindo cabeça. Trocar roupas molhadas.',
      'Isolar do solo frio com mochila, casaco ou qualquer barreira. O solo rouba mais calor que o ar.',
      'Aquecimento ativo com bolsas químicas (HotHands) em axilas, virilha, pescoço (grandes vasos).',
      'Trauma craniano: avaliar Escala de Glasgow simplificada — abre olhos? fala coerente? movimenta membros sob comando?',
      'Sinais de hipertensão intracraniana: pupilas anisocóricas (uma maior), vômito em jato, perda de consciência progressiva.',
      'Manter cabeça elevada 30° em trauma craniano isolado (sem suspeita de lesão cervical).',
    ],
    errosFatais: 'Esfregar membros congelados causa lesão tecidual. Aquecimento agressivo demais (banho quente) causa vasodilatação periférica e choque distributivo.',
  },
];

interface KitItem {
  categoria: string;
  itens: string[];
  custo: string;
  fonte: string;
}

const KIT_IFAK: KitItem[] = [
  {
    categoria: 'Hemorragia (Tier 1 - inegociável)',
    itens: [
      'Torniquete CAT Gen 7 (CoTCCC aprovado) — 2 unidades',
      'Israeli Emergency Bandage 4" — 2 unidades',
      'QuikClot Combat Gauze (hemostático) — 2 pacotes',
      'Gaze compactada (Z-fold) estéril — 4 unidades',
      'Bandagem elástica autoaderente (Coban) — 2 rolos',
    ],
    custo: 'USD 180 a 240',
    fonte: 'North American Rescue, Tactical Medical Solutions, Chinook Medical',
  },
  {
    categoria: 'Via Aérea e Respiração',
    itens: [
      'Cânula nasofaríngea (NPA) 28Fr e 32Fr — 1 de cada',
      'Lubrificante hidrossolúvel (sachê) — 4 unidades',
      'Selo torácico vented HyFin Chest Seal — 1 par',
      'Agulha de descompressão 14G x 3,25" (ARS) — 1 unidade (uso médico)',
    ],
    custo: 'USD 80 a 120',
    fonte: 'NAR, H&H Medical, Skedco',
  },
  {
    categoria: 'Trauma Geral e Suporte',
    itens: [
      'Tesoura trauma EMT (corta cinto, jeans, bota) — 1',
      'Luvas de nitrila tamanho L — 4 pares',
      'Manta térmica mylar Heatsheets — 1',
      'Esparadrapo médico 1" — 1 rolo',
      'Marcador permanente vermelho (marcar TQ) — 1',
      'Lanterna tática SureFire ou similar 200+ lúmens — 1',
    ],
    custo: 'USD 60 a 100',
    fonte: 'Adventure Medical Kits, NAR, lojas táticas',
  },
  {
    categoria: 'Queimaduras e Curativos',
    itens: [
      'Burn dressing Water-Jel 4x4" — 2 unidades',
      'Curativos não-aderentes Telfa — 6 unidades',
      'Solução salina estéril 250ml — 2 frascos',
      'Bandagens triangulares (sling/imobilização) — 3',
    ],
    custo: 'USD 40 a 70',
    fonte: 'Water-Jel, Coloplast, farmácia hospitalar',
  },
  {
    categoria: 'Container e Organização',
    itens: [
      'Pouch IFAK rip-away MOLLE 7x5x3" — 1',
      'Velcro panel interno organizador — 1',
      'Cartão de informação médica (alergias, tipo sanguíneo) plastificado — 1',
    ],
    custo: 'USD 35 a 60',
    fonte: 'Condor, 5.11 Tactical, Helikon-Tex',
  },
];

interface Cenario {
  nome: string;
  descricao: string;
  intervencao: string;
  erro: string;
  icon: typeof HeartPulse;
}

const CENARIOS: Cenario[] = [
  {
    nome: 'Hemorragia em coxa por arma branca',
    descricao: 'Ferimento profundo na face medial da coxa, jato pulsátil vermelho-vivo. Suspeita de lesão de artéria femoral.',
    intervencao: 'Pressão manual imediata enquanto o segundo socorrista prepara torniquete CAT. Aplicar TQ na raiz da coxa, o mais alto possível, apertar windlass até cessar pulso distal. Marcar hora. Se ferimento em junção (virilha), pressão direta + QuikClot empacotado por 3 min antes do TQ funcionar.',
    erro: 'Aplicar torniquete sobre a articulação do joelho ou abaixo do ferimento. TQ deve ficar entre o ferimento e o coração.',
    icon: Droplets,
  },
  {
    nome: 'Ferimento penetrante no tórax',
    descricao: 'Vítima consciente, ferimento de bala em região peitoral direita, ruído de sucção a cada respiração ("sucking chest wound").',
    intervencao: 'Selo torácico vented (HyFin ou Halo) sobre o ferimento APÓS limpar a pele com compressa seca. Procurar ferimento de saída nas costas e selar também. Reavaliar a cada 5 min para sinais de pneumotórax hipertensivo: jugular ingurgitada, desvio de traqueia, hipotensão progressiva.',
    erro: 'Usar plástico simples sem criar válvula unidirecional. Sem ventilação, o selo aprisiona o ar e converte pneumotórax aberto em hipertensivo (mais letal).',
    icon: Wind,
  },
  {
    nome: 'Queimadura de 2º grau por água fervente',
    descricao: 'Adulto com queimadura em 8% da superfície corporal (membro superior completo), bolhas formadas, dor intensa.',
    intervencao: 'Resfriar com água corrente em temperatura ambiente (15-25°C) por 20 minutos. NÃO usar gelo. Cobrir com Water-Jel ou plástico filme limpo (não estéril mas seguro). Não estourar bolhas. Hidratação oral se consciente. Encaminhar a serviço médico em até 6 horas para queimadura >5% em adulto.',
    erro: 'Aplicar gelo, manteiga, pasta de dente, óleo, creme dental. Estourar bolhas (porta de entrada para infecção).',
    icon: Flame,
  },
  {
    nome: 'Fratura exposta de tíbia',
    descricao: 'Acidente de moto, fratura visível com osso exposto, sangramento moderado, dor 10/10.',
    intervencao: 'Estabilizar membro na posição encontrada (NÃO realinhar). Controlar sangramento com pressão direta sem comprimir o osso exposto. Cobrir ferimento com gaze estéril umedecida em soro fisiológico. Imobilização rígida (tala) acima e abaixo da fratura. Avaliar pulso distal antes e depois da imobilização.',
    erro: 'Tentar "encaixar" o osso de volta. Lavar a ferida com água não estéril (aumenta risco de osteomielite).',
    icon: Bone,
  },
  {
    nome: 'Choque hipovolêmico após acidente',
    descricao: 'Vítima de colisão, pele fria e pegajosa, taquicardia 130 bpm, sistólica estimada 70 mmHg, confusão mental.',
    intervencao: 'Decúbito dorsal, elevar membros inferiores 30°, manta térmica completa. Controlar fontes de sangramento ativo. NÃO oferecer líquidos por via oral. Reavaliar pulso radial a cada 2 min. Transporte rápido — choque hemorrágico classe III/IV requer reposição de volume e cirurgia em até 60 min ("golden hour").',
    erro: 'Trendelenburg total (cabeça mais baixa que tronco) compromete respiração. Hidratar agressivamente piora coagulopatia diluicional.',
    icon: Activity,
  },
  {
    nome: 'Parada respiratória em afogamento',
    descricao: 'Vítima resgatada de afogamento, inconsciente, sem respiração espontânea, pulso carotídeo presente fraco.',
    intervencao: 'Posicionar em superfície rígida. Abrir via aérea (chin-lift). 2 ventilações de resgate (boca-a-boca ou com pocket mask) observando elevação do tórax. Reavaliar pulso a cada 2 min. Se pulso ausente: RCP 30:2 imediatamente. Em afogados, ventilação tem prioridade sobre compressão (etiologia hipóxica).',
    erro: 'Compressões abdominais para "expulsar água" são contraindicadas: causam vômito e aspiração.',
    icon: Wind,
  },
];

interface Erro {
  titulo: string;
  detalhe: string;
}

const ERROS_FATAIS: Erro[] = [
  {
    titulo: 'Aplicar torniquete improvisado com cinto ou cordão fino',
    detalhe: 'Cinto de couro, cabo de carregador, gravata ou corda fina NÃO geram pressão suficiente para ocluir artéria femoral ou braquial. Pior: causam lesão tecidual sem hemostasia. Use SEMPRE torniquete CAT, SOFTT-W ou RATS comerciais. Custam USD 30 cada. Não há substituto improvisado seguro para hemorragia massiva em extremidade.',
  },
  {
    titulo: 'Remover objeto encravado',
    detalhe: 'Faca, vergalhão, fragmento metálico ou pedaço de vidro encravado funcionam como tampão hemostático. Removê-los abre a hemorragia. Conduta correta: estabilizar o objeto com gazes ao redor formando "donut", fixar com bandagem sem comprimir a base, transportar com o objeto in situ. Remoção é responsabilidade do cirurgião em ambiente controlado.',
  },
  {
    titulo: 'Mover vítima de trauma cervical sem imobilização',
    detalhe: 'Toda vítima de queda de altura, acidente automobilístico, mergulho em água rasa ou trauma craniano é suspeita de lesão cervical. Movimentação inadequada pode converter fratura estável em lesão medular irreversível. Conduta: estabilização cervical manual (mãos no occipital e mandíbula), colar cervical se disponível, prancha rígida para movimentação em bloco (técnica log-roll).',
  },
  {
    titulo: 'Oferecer água, café ou álcool a vítima inconsciente',
    detalhe: 'Líquidos por via oral em paciente inconsciente, com trauma facial, vômito ou rebaixamento de consciência causam aspiração para vias aéreas. Pneumonia aspirativa tem mortalidade alta. Conduta: nada por via oral até avaliação médica. Hidratação só por via parenteral (IV), procedimento de profissional.',
  },
  {
    titulo: 'Ignorar sinais de choque por estarem "andando e falando"',
    detalhe: 'Choque compensado mantém pressão arterial às custas de vasoconstrição periférica e taquicardia. A vítima parece estável até descompensar abruptamente (queda da PA, perda de consciência). Sinais precoces: pele fria pegajosa, pulso fino e rápido (>100), sede intensa, confusão sutil, palidez. Trate o choque ANTES da hipotensão aparecer.',
  },
  {
    titulo: 'Confiar em fórmulas de "kit pronto" de drogaria',
    detalhe: 'A maioria dos kits de primeiros socorros vendidos em farmácia, mochila escolar ou camping tem band-aid, micropore, esparadrapo e pomada antisséptica. Não tem torniquete, hemostático, selo torácico, NPA ou gazes para empacotamento. São inúteis para trauma real. Monte seu IFAK com itens auditados de fornecedores tier-1 (NAR, TacMed, Chinook) ou compre IFAK pronto da NAR/TacMed.',
  },
];

const TIMELINE_60MIN = [
  { tempo: '0-1 min', titulo: 'Cena segura?', descricao: 'Verificar segurança do local antes de aproximar. Cena instável = chame ajuda primeiro.' },
  { tempo: '1-3 min', titulo: 'Hemorragia massiva', descricao: 'Pressão direta + torniquete em extremidade. Marcar hora exata da aplicação.' },
  { tempo: '3-5 min', titulo: 'Via aérea + respiração', descricao: 'Posicionamento, NPA se inconsciente, selo torácico em ferimentos abertos.' },
  { tempo: '5-10 min', titulo: 'Acionar SAMU 192', descricao: 'Endereço completo, número de vítimas, mecanismo de trauma, estado de consciência.' },
  { tempo: '10-20 min', titulo: 'Reavaliar circulação', descricao: 'Pulso radial, tempo de enchimento capilar, sinais de choque, manter aquecido.' },
  { tempo: '20-40 min', titulo: 'Estabilização secundária', descricao: 'Imobilização de fraturas, curativos definitivos, anotar evolução, preparar transporte.' },
  { tempo: '40-60 min', titulo: 'Golden Hour', descricao: 'Vítima de trauma maior tem 60 min para chegar ao centro cirúrgico. Defina prioridade de transporte.' },
];

const FAQ = [
  {
    q: 'Vale a pena montar IFAK se eu não tenho treinamento médico?',
    a: 'Sim, com ressalva. Torniquete, pressão direta, selo torácico e manta térmica são intervenções aprendíveis em curso de 8 horas (Stop the Bleed, TECC para civis). Procedimentos invasivos como descompressão por agulha exigem treinamento formal. Tenha o kit completo, mas use apenas o que você foi treinado para usar. Equipamento sem treinamento gera falsa segurança.',
  },
  {
    q: 'Diferença entre primeiros socorros básicos e táticos?',
    a: 'Primeiros socorros básicos focam em chamar o SAMU, posicionar, conter sangramentos pequenos e manter a vítima estável até chegada do serviço. Táticos (TCCC/TECC) assumem cenário hostil, recursos limitados e tempo prolongado até evacuação. Inclui controle de hemorragia massiva com torniquete, manejo de via aérea avançado, descompressão torácica e priorização MARCH. Treinamento e equipamento são significativamente diferentes.',
  },
  {
    q: 'Onde fazer treinamento de Stop the Bleed no Brasil?',
    a: 'Curso oficial Stop the Bleed (American College of Surgeons) é gratuito e tem instrutores certificados em São Paulo, Rio de Janeiro, Brasília e Porto Alegre. Bombeiros militares de vários estados oferecem cursos de APH (Atendimento Pré-Hospitalar) abertos ao público. Cruz Vermelha Brasileira oferece curso básico mensalmente. Para nível tático avançado, cursos militares de TCCC (raros para civis) ou cursos de empresas privadas como Ten Eight Tactical, Direct Action Group.',
  },
  {
    q: 'Torniquete deixa sequela permanente?',
    a: 'Aplicado corretamente, torniquete pode permanecer até 2 horas sem risco significativo de necrose ou lesão neurológica. Estudos militares (Iraque, Afeganistão) mostram baixíssima taxa de amputação por TQ até 4-6h. O risco real é não aplicar em hemorragia massiva e a vítima morrer por exsanguinação em minutos. Sempre marque a hora exata da aplicação na testa do paciente.',
  },
  {
    q: 'Posso comprar IFAK pronto ou tenho que montar?',
    a: 'Ambos funcionam. IFAK pronto da North American Rescue (NAR M-FAK Mini, NAR Combat Casualty Response Kit) ou Tactical Medical Solutions custa USD 200-400 e vem auditado com itens CoTCCC aprovados. Montar você mesmo permite customização ao seu treinamento, mas exige conhecimento sobre o que comprar. Recomendação para iniciante: compre IFAK pronto de fornecedor tier-1, faça curso de Stop the Bleed e depois customize.',
  },
  {
    q: 'IFAK no carro, na mochila ou no cinto?',
    a: 'Camadas. Cinto/mochila tática (always-on): kit mínimo com 1 torniquete e 1 hemostático. Mochila do dia: IFAK completo com selos torácicos e curativos. Carro: kit expandido com manta térmica grande, talas, soro fisiológico e equipamentos pesados. Casa: trauma kit + medicamentos básicos + kit pediátrico se houver crianças. A regra é: o kit que você não tem com você não existe quando precisar.',
  },
  {
    q: 'Crianças exigem técnica diferente?',
    a: 'Sim. Pediátrico tem reservas fisiológicas menores, descompensação mais rápida e referências anatômicas diferentes. Torniquete pediátrico SOFTT-W com pressão calibrada é o padrão. Compressões em RCP infantil: 1/3 do diâmetro do tórax. Dose de medicamentos por peso. Recomendação: se há crianças no domicílio, faça curso específico de PALS (Pediatric Advanced Life Support) ou Suporte Básico Pediátrico do SAMU.',
  },
  {
    q: 'O que NÃO comprar para o IFAK?',
    a: 'Evite: torniquetes genéricos sem aprovação CoTCCC (pulseiras de borracha, tourniquets chineses Aliexpress falham na pressão crítica), pomadas antibióticas (não cabem no contexto de trauma agudo), gazes não estéreis (risco de infecção), selos torácicos sem ventilação (causam pneumotórax hipertensivo), kits "tudo em um" de drogaria (curativos pequenos, sem trauma real). Use apenas equipamento auditado.',
  },
];

const CHECKLIST_30D = [
  'Dia 1-3: Listar perfil de risco — você dirige? trabalha em obra? tem filhos pequenos? mora em zona rural? mora em zona urbana violenta?',
  'Dia 4-7: Inscrever-se em curso Stop the Bleed (gratuito) ou APH básico de bombeiro militar do seu estado.',
  'Dia 8-14: Comprar IFAK pronto NAR M-FAK Mini ou equivalente (USD 200-280). Comprar de fornecedor verificado, não Aliexpress.',
  'Dia 15-18: Praticar aplicação de torniquete CAT em si mesmo e em parceiro até conseguir aplicar em <30 segundos com uma só mão.',
  'Dia 19-22: Praticar empacotamento de ferimento com gaze hemostática (use frango cru ou modelo de treinamento).',
  'Dia 23-25: Memorizar protocolo MARCH em ordem. Repetir até automático em estado de pânico.',
  'Dia 26-28: Distribuir kits — 1 sempre com você (mochila, bolsa), 1 no carro, 1 em casa em local fixo conhecido por toda a família.',
  'Dia 29-30: Cadastrar contato de emergência no celular (campo "ICE" ou similar), SAMU 192 e bombeiros 193 em discagem rápida.',
  'Mensal: Verificar validade dos itens do kit (gazes, hemostáticos têm validade de 3-5 anos). Reabastecer o que usou.',
  'Trimestral: Revisar manobras com vídeo. Habilidade decai sem prática deliberada.',
];

export default function PrimeirosSocorrosTaticos() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-organica/primeiros-socorros-taticos"
        custom={{
          title: 'Primeiros Socorros Táticos: Protocolo MARCH e IFAK Civil',
          description: 'Guia completo de primeiros socorros táticos para civis: protocolo MARCH, hemorragia massiva, torniquete CAT, selo torácico, IFAK auditado. TCCC adaptado para emergências reais.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/primeiros-socorros-taticos',
          primaryKeyword: 'primeiros socorros táticos',
          lsiKeywords: ['protocolo MARCH', 'IFAK civil', 'torniquete CAT', 'TCCC civil', 'hemorragia massiva', 'selo torácico', 'TECC', 'stop the bleed brasil'],
          longTailKeywords: ['como montar IFAK civil completo', 'protocolo MARCH primeiros socorros', 'torniquete CAT como aplicar', 'kit trauma civil brasil', 'curso primeiros socorros táticos brasil'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Primeiros Socorros Táticos', url: '/soberania-organica/primeiros-socorros-taticos' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/primeiros-socorros', '/soberania-organica/kit-72h', '/soberania-organica/saude-preventiva', '/soberania-organica/abrigo-emergencia'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <FixedThematicBackground image={heroImg} intensity="heavy" />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="min-h-screen text-stone-100 relative z-10">
        <CinematicHero
          image={heroImg}
          phase="Soberania Orgânica · Trauma Civil Avançado"
          title={
            <>
              Primeiros socorros táticos:{' '}
              <span className="italic font-serif text-rose-400 font-light tracking-tight">o protocolo que mantém vivo até o socorro chegar</span>
            </>
          }
          subtitle="Quando o SAMU demora 40 minutos e a hemorragia mata em 5, o conhecimento de TCCC adaptado para civis deixa de ser hobby e vira responsabilidade. Protocolo MARCH, IFAK auditado e os erros fatais que ninguém ensina em curso de drogaria."
          icon={HeartPulse}
          accentColor="rose"
          backLink="/soberania-organica"
          backLabel="Soberania Orgânica"
        />

        {/* CAPÍTULO 1 */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)}>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-rose-400 font-bold block mb-5">Capítulo 01</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 mb-8 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              O socorro não vem em cinco minutos.{' '}
              <span className="italic font-serif text-rose-400 font-light normal-case tracking-tight">A morte vem.</span>
            </h2>
            <div className="space-y-6 text-stone-300 text-lg leading-relaxed font-light max-w-3xl">
              <p>
                Hemorragia em artéria femoral mata em 3 a 5 minutos. Pneumotórax hipertensivo causa colapso cardiovascular em 10 a 20 minutos. Obstrução completa de via aérea leva à morte cerebral em 4 a 6 minutos. Tempo médio de chegada do SAMU em capitais brasileiras é de 18 minutos. Em zonas rurais ou periferias, passa de 40. A matemática não fecha sem alguém treinado no local.
              </p>
              <p>
                Esta página não substitui curso presencial. Substitui a ilusão de que band-aid e álcool resolvem trauma. O conteúdo é uma adaptação civil do TCCC (Tactical Combat Casualty Care) e TECC (Tactical Emergency Casualty Care), os protocolos militares e civis usados em medicina de combate desde a Guerra do Iraque, validados em mais de 1 milhão de casos reais e responsáveis pela maior queda de mortalidade evitável da história da medicina pré-hospitalar.
              </p>
              <p className="text-stone-100 italic font-serif text-xl border-l-2 border-rose-500/40 pl-6">
                Equipamento sem treinamento é peso morto. Treinamento sem equipamento é teoria. Autonomia biológica exige os dois.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CAPÍTULO 2 — MARCH */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-rose-400 font-bold block mb-4">Capítulo 02</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Protocolo MARCH:{' '}
              <span className="italic font-serif text-rose-400 font-light normal-case tracking-tight">a ordem que salva vidas.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Cinco letras, cinco prioridades, uma sequência inegociável. Trate na ordem certa: hemorragia massiva primeiro, sempre. Ignorar a ordem mata mais que ignorar o trauma.
            </p>
          </motion.div>

          <div className="space-y-4">
            {MARCH.map((m, i) => (
              <motion.div
                key={m.letra}
                {...fade(i * 0.05)}
                className="group rounded-sm border border-stone-800 bg-stone-950/60 p-6 md:p-10 hover:border-rose-500/30 hover:bg-stone-950/80 transition-all duration-500"
              >
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-2">
                    <span className="text-7xl md:text-8xl font-black text-rose-400/90 leading-none block" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {m.letra}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mt-2 block">{m.titulo}</span>
                  </div>
                  <div className="md:col-span-10 space-y-5">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-stone-100 leading-tight mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {m.significado}
                      </h3>
                      <p className="text-rose-400 text-xs font-mono uppercase tracking-[0.2em] font-bold mb-2">{m.prioridade}</p>
                      <p className="text-stone-300 text-sm italic font-serif border-l-2 border-rose-500/30 pl-4">{m.tempoCritico}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-3">Conduta passo-a-passo</p>
                      <ul className="space-y-2">
                        {m.acoes.map((a, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-stone-300 leading-relaxed">
                            <span className="text-rose-400 font-mono shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-950/30 border-l-2 border-red-500/60 p-4 rounded-sm">
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 mb-1">Erro fatal</p>
                      <p className="text-stone-200 text-sm leading-relaxed">{m.errosFatais}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM TORNIQUETE */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[480px] md:h-[620px] border border-stone-900">
            <img
              src={imgTorniquete}
              alt="Aplicação de torniquete CAT Combat Application Tourniquet em braço de adulto durante treinamento tático, mãos enluvadas apertando o windlass, iluminação dramática vermelha indicando urgência e contexto de hemorragia massiva."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.2) 50%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-rose-400 font-bold block mb-2">Torniquete CAT · Tier 1</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Trinta segundos entre a vida e a morte. O windlass não negocia.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 3 — KIT IFAK */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-rose-400 font-bold block mb-4">Capítulo 03</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              IFAK auditado:{' '}
              <span className="italic font-serif text-rose-400 font-light normal-case tracking-tight">o kit que funciona em campo real.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Individual First Aid Kit. Cinco categorias, custo total entre USD 395 e 590. Cada item validado em uso militar ou civil de trauma. Sem placebo, sem item decorativo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {KIT_IFAK.map((k, i) => (
              <motion.div
                key={k.categoria}
                {...fade(i * 0.05)}
                className="rounded-sm border border-stone-800 bg-stone-950/60 p-6 md:p-8 hover:border-rose-500/30 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-stone-800">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-stone-100 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {k.categoria}
                  </h3>
                  <span className="text-rose-400 text-xs font-mono font-bold whitespace-nowrap ml-3">{k.custo}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {k.itens.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-stone-300 leading-relaxed font-light">
                      <span className="text-rose-400 shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-stone-800">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Fontes confiáveis</p>
                  <p className="text-stone-400 text-xs leading-relaxed">{k.fonte}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM MARCH */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[480px] md:h-[620px] border border-stone-900">
            <img
              src={imgMarch}
              alt="Itens de IFAK civil dispostos sobre superfície escura: pacote de QuikClot Combat Gauze hemostático, rolo de gaze compactada, selo torácico Halo vented e cânula nasofaríngea, fotografia tática profissional com iluminação dramática."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.2) 50%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-rose-400 font-bold block mb-2">Hemostático · Selo · Via Aérea</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                O kit que cabe na mochila e pesa menos que um livro. Custa menos que um sapato.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 4 — CENÁRIOS */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-rose-400 font-bold block mb-4">Capítulo 04</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Seis cenários reais.{' '}
              <span className="italic font-serif text-rose-400 font-light normal-case tracking-tight">A conduta correta e o erro que mata.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Casos clínicos adaptados de protocolos PHTLS, ATLS e TCCC. Cada cenário traz a intervenção correta e o erro mais comum cometido por quem não foi treinado.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {CENARIOS.map((c, i) => (
              <motion.div
                key={c.nome}
                {...fade(i * 0.05)}
                className="rounded-sm border border-stone-800 bg-stone-950/60 p-6 md:p-8 hover:border-rose-500/30 transition-all duration-500"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2.5 rounded bg-rose-500/[0.08] border border-rose-500/20 shrink-0">
                    <c.icon size={18} className="text-rose-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-stone-100 leading-tight pt-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {c.nome}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Cenário</p>
                    <p className="text-stone-300 text-sm leading-relaxed font-light">{c.descricao}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400/80 mb-1">Conduta correta</p>
                    <p className="text-stone-200 text-sm leading-relaxed">{c.intervencao}</p>
                  </div>
                  <div className="bg-red-950/30 border-l-2 border-red-500/60 p-3 rounded-sm">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 mb-1">Erro fatal</p>
                    <p className="text-stone-200 text-xs leading-relaxed">{c.erro}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 5 — ERROS FATAIS */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-rose-400 font-bold block mb-4">Capítulo 05</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Seis erros que matam.{' '}
              <span className="italic font-serif text-rose-400 font-light normal-case tracking-tight">Cometidos por bem intencionados.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              A intenção de ajudar não é desculpa. Estes erros aparecem em laudos de óbito como "atendimento pré-hospitalar inadequado". Conheça-os antes de cometer.
            </p>
          </motion.div>

          <div className="space-y-4">
            {ERROS_FATAIS.map((e, i) => (
              <motion.div
                key={e.titulo}
                {...fade(i * 0.04)}
                className="rounded-sm border border-stone-800 bg-stone-950/60 p-6 md:p-8 hover:border-red-500/30 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-red-500/80 shrink-0 leading-none mt-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-stone-100 mb-2 leading-tight">{e.titulo}</h3>
                    <p className="text-stone-300 text-sm leading-relaxed font-light">{e.detalhe}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 6 — TIMELINE GOLDEN HOUR */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-rose-400 font-bold block mb-4">Capítulo 06</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Os primeiros 60 minutos.{' '}
              <span className="italic font-serif text-rose-400 font-light normal-case tracking-tight">Golden Hour não é metáfora.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Vítima de trauma maior que chega ao centro cirúrgico em até 60 min tem mortalidade significativamente menor. Sua conduta no local define se ela chega.
            </p>
          </motion.div>

          <div className="relative pl-8 border-l-2 border-rose-500/30 space-y-8">
            {TIMELINE_60MIN.map((t, i) => (
              <motion.div key={t.tempo} {...fade(i * 0.05)} className="relative">
                <span className="absolute -left-[2.4rem] top-1 w-4 h-4 rounded-full bg-rose-500 border-4 border-stone-950" />
                <span className="font-mono text-xs text-rose-400 uppercase tracking-[0.3em] font-bold block mb-1">{t.tempo}</span>
                <h3 className="text-xl md:text-2xl font-bold text-stone-100 mb-2 leading-tight">{t.titulo}</h3>
                <p className="text-stone-400 text-sm leading-relaxed font-light">{t.descricao}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CHECKLIST 30 DIAS */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="rounded-sm border border-rose-500/20 bg-stone-950/70 p-8 md:p-12">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-rose-400 font-bold block mb-4">Plano de execução</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Trinta dias para autonomia{' '}
              <span className="italic font-serif text-rose-400 font-light normal-case tracking-tight">médica básica.</span>
            </h2>
            <p className="text-stone-400 mb-8 text-base leading-relaxed font-light">
              Sequência objetiva para sair de zero a operacional em um mês. Sem pressa, com método.
            </p>
            <ol className="space-y-3">
              {CHECKLIST_30D.map((c, i) => (
                <li key={i} className="flex gap-4 text-stone-200 text-sm leading-relaxed">
                  <span className="text-rose-400 font-mono font-bold shrink-0 w-7">{String(i + 1).padStart(2, '0')}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-rose-400 font-bold block mb-4">Perguntas Frequentes</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Dúvidas{' '}
              <span className="italic font-serif text-rose-400 font-light normal-case tracking-tight">técnicas reais.</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <motion.div key={i} {...fade(i * 0.03)} className="rounded-sm border border-stone-800 bg-stone-950/60 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-stone-900/40 transition-colors"
                >
                  <span className="text-stone-100 font-semibold text-sm md:text-base leading-tight">{f.q}</span>
                  <ChevronDown size={18} className={`text-rose-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 text-stone-400 text-sm leading-relaxed font-light border-t border-stone-900 pt-4">
                    {f.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Autonomia médica é a base.{' '}
              <span className="italic font-serif text-rose-400 font-light normal-case tracking-tight">Sem ela, todas as outras caem.</span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto mb-10 text-base leading-relaxed font-light">
              Continue a trilha autônoma com kits de 72h, abrigo de emergência e protocolos para apagão. O sistema falha. Você não pode.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/soberania-organica/kit-72h" className="group inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-rose-500 text-stone-950 font-bold uppercase tracking-wider text-xs hover:bg-rose-400 transition-all">
                <Package size={14} /> Kit 72 horas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/soberania-organica/primeiros-socorros" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-stone-700 text-stone-300 font-bold uppercase tracking-wider text-xs hover:border-rose-500/40 hover:text-stone-100 transition-all">
                <Stethoscope size={14} /> Primeiros Socorros (Básico)
              </Link>
              <Link to="/soberania-organica/protocolos-apagao" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-stone-700 text-stone-300 font-bold uppercase tracking-wider text-xs hover:border-rose-500/40 hover:text-stone-100 transition-all">
                <Shield size={14} /> Protocolos de Apagão
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
