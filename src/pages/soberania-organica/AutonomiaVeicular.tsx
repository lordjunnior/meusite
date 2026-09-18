import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';
import { Shield } from 'lucide-react';
import { Wrench } from 'lucide-react';
import { Siren } from 'lucide-react';
import { Eye } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Fuel } from 'lucide-react';
import { Radio } from 'lucide-react';
import { Package } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/soberania-veicular-hero.webp';
import imgKit from '@/assets/saida/soberania-veicular-kit.webp';
import imgSemaforo from '@/assets/saida/soberania-veicular-semaforo.webp';

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
  icon: typeof Car;
}

const PILARES: Pilar[] = [
  {
    num: '01',
    nome: 'Blindagem Leve e Engenharia Defensiva',
    contexto: 'Blindagem nível IIIA (resiste a calibre .44 magnum, 9mm, .357) é o padrão urbano brasileiro homologado pelo Exército. Custa entre R$ 35 mil e R$ 90 mil dependendo do veículo, e adiciona de 180 a 320 kg ao peso bruto. Mas blindagem é apenas 1 das 7 camadas de proteção veicular. Película de segurança de 4 mil micras, reforço estrutural em colunas A/B/C, fechaduras blindadas, vidros de policarbonato e travas elétricas reforçadas compõem o sistema completo. Sem o ecossistema integrado, blindagem isolada cria falsa sensação de segurança.',
    passos: [
      'Avaliação técnica: contrate engenheiro automotivo independente para auditar pontos de vulnerabilidade do seu veículo. Cada modelo tem zonas críticas distintas (colunas, soleiras, teto solar, porta-malas).',
      'Empresa homologada: exija certificado válido do Exército Brasileiro (Diretoria de Fiscalização de Produtos Controlados). Empresas piratas blindam com material inferior, anulando proteção real em situação crítica.',
      'Películas de segurança 4 mil micras nos vidros (não confundir com película solar). Mantém vidro inteiro mesmo após múltiplos impactos, dificultando arrombamento e projétil de baixa velocidade.',
      'Travas elétricas reforçadas com fechaduras blindadas em todas as 4 portas. Travamento automático ao iniciar movimento (acima de 10 km/h). Destravamento manual interno deve permanecer operacional para emergência.',
      'Suspensão e freios reforçados: 320 kg adicionais exigem amortecedores de carga, freios de cerâmica e pneus com índice de carga compatível. Blindar sem reforçar suspensão compromete dirigibilidade e segurança ativa.',
      'Manutenção semestral obrigatória: empresas homologadas oferecem revisão anual de selantes, vedação e integridade de painéis. Blindagem mal mantida degrada em 30% após 5 anos sem revisão.',
    ],
    falhas: 'Blindar carro popular sem reforço estrutural (chassi não suporta carga e gera falha mecânica grave), confiar exclusivamente em vidro blindado sem película (arrombamento por estilhaço), empresa não homologada (material falsificado), esquecer reforço de portas traseiras (passageiros expostos), bagagem de armas no porta-malas sem cofre fixo (acessível em colisão).',
    icon: Shield,
  },
  {
    num: '02',
    nome: 'Kit de Emergência Veicular Completo',
    contexto: 'O brasileiro médio carrega no porta-malas estepe murcho, macaco enferrujado e triângulo. Em uma pane real, 73% dos motoristas não conseguem trocar pneu sem ajuda externa segundo SEST/SENAT. Kit veicular completo é a infraestrutura mínima para resolver 90% das ocorrências comuns sem depender de serviço externo, especialmente em rodovias isoladas, madrugada ou regiões sem cobertura celular. Custo total: R$ 800 a R$ 2 mil. Manutenção: revisão a cada 90 dias.',
    passos: [
      'Trauma kit veicular: torniquete CAT, gaze hemostática (QuikClot), bandagens elásticas, soro fisiológico 500 ml, tesoura paramédica, luvas nitrílicas. Treinamento prévio em primeiros socorros é obrigatório, equipamento sem treino é inútil.',
      'Iluminação tática: lanterna headlamp 1.000 lúmens com pilhas alcalinas reservas, lanterna de mão 500 lúmens, sinalizador LED estroboscópico vermelho (visível a 2 km).',
      'Ferramentas mecânicas: multitool Leatherman ou Gerber, chave de roda telescópica, macaco hidráulico tipo jacaré, calços de roda, par de luvas de couro reforçadas, fita silver tape, abraçadeiras plásticas variadas.',
      'Energia e partida: cabo de chupeta calibre 6 AWG mínimo (não os finos de bazar), jump starter portátil 12V com bateria de lítio 12.000 mAh, carregador USB com inversor 12V para celular.',
      'Hidratação e proteína: 4 garrafas de água 500 ml, barras de proteína 30 g cada, sachês de gel energético, kit alimentação para 24 horas mínimo. Renovação a cada 6 meses (calor degrada).',
      'Quebra-vidros e cortador de cinto: martelo Lifehammer ou similar fixado em local acessível (não no porta-malas). Em capotamento ou submersão, é a diferença entre escapar em 30 segundos ou afogar.',
      'Extintor de incêndio classe ABC 2 kg (revisão anual obrigatória), tow strap de 5 toneladas para reboque, manta térmica espacial, capa de chuva descartável, kit de primeiros socorros básico.',
    ],
    falhas: 'Kit no porta-malas sem acesso pelo banco (em capotamento, fica inalcançável), pilhas dentro do equipamento (corrosão em 6 meses), sem treinamento prévio em uso (pânico anula equipamento), validade vencida em medicamentos e alimentos, ferramentas baratas que quebram no primeiro uso real.',
    icon: Package,
  },
  {
    num: '03',
    nome: 'Fuga em Assalto a Semáforo',
    contexto: 'Assalto a veículo em semáforo é a segunda modalidade mais comum no Brasil urbano (atrás apenas de roubo de celular), com 312 mil ocorrências em 2024 segundo Anuário Brasileiro de Segurança Pública. 84% acontecem entre 19h e 23h, 67% em cruzamentos sem outras testemunhas, 71% por motociclista armado em dupla. Reação correta nos primeiros 3 segundos define o desfecho. Reação errada eleva probabilidade de óbito em 8 vezes.',
    passos: [
      'Posicionamento preventivo: pare sempre a 3 metros do veículo da frente. Distância suficiente para esterçar e sair sem dar ré. Veja sempre as rodas dianteiras do carro à frente, garantia de saída.',
      'Vigilância tática: olhar móvel a cada 5 segundos para retrovisores e laterais. Posicione celular no apoio fixo, nunca na mão visível externamente. Bolsa, mochila e equipamentos sempre no chão do banco traseiro, nunca no banco do passageiro.',
      'Detecção precoce: aproximação de motocicleta em dupla pelo lado do motorista a baixa velocidade é sinal vermelho absoluto. Acelere imediatamente, mesmo violando lei de trânsito (multa é resolvível, óbito não).',
      'Reação na abordagem: se já está sob arma apontada, NÃO REAJA. Mantenha mãos visíveis no volante, olhar baixo, voz calma. Entregue tudo solicitado. 91% dos óbitos em assalto ocorrem por reação física do motorista, não por execução planejada.',
      'Após entrega: NÃO siga o veículo. NÃO grave o agressor. NÃO confronte. Saia da cena imediatamente em direção contrária, registre boletim em 6 horas em delegacia ou online via portal estadual.',
      'Treinamento prévio: faça pelo menos um curso de direção defensiva e antiassalto com instrutor certificado (Tactical Driving, Stunt Brasil, escolas militares oferecem). Custo de R$ 1.500 a R$ 3 mil, retorno vitalício.',
    ],
    falhas: 'Reagir com arma de fogo em situação de surpresa (agressor já tem vantagem de 3 segundos), olhar fixamente para agressor (sinal de identificação ameaçador), tentar acelerar com agressor pendurado (arrasto e tiro reflexo), gravar com celular durante abordagem (gatilho para execução), seguir agressor após assalto.',
    icon: Siren,
  },
  {
    num: '04',
    nome: 'Antirrastreamento e Privacidade Veicular',
    contexto: 'Veículo moderno é dispositivo de vigilância sobre rodas. Sistemas OnStar, Connected Car e telemática transmitem em tempo real localização, velocidade, padrões de uso e até áudio interno (em alguns modelos). Operadoras vendem dados para seguradoras, governo e empresas de marketing. Rastreador instalado por terceiros (cônjuge, perseguidor, criminoso) é detectável em 95% dos casos com varredura técnica adequada. Privacidade veicular é direito básico de autonomia pessoal.',
    passos: [
      'Auditoria inicial: contrate empresa especializada em varredura eletrônica veicular (TSCM automotivo). Custo de R$ 800 a R$ 2 mil, identifica rastreadores GPS, microfones e dispositivos GSM clandestinos em 2 a 4 horas de inspeção.',
      'Bloqueio de telemática: desconecte módulos de comunicação (eCall, OnStar, Connected) via software ou desconexão física do módulo TCU. Mantém funcionalidade de navegação local sem transmissão externa.',
      'Pneus sem chip RFID: pneus modernos contêm chip RFID legível a distância. Em pneus de uso operacional discreto, prefira modelos asiáticos sem chip (verifique especificação técnica antes da compra).',
      'Pagamento de pedágio sem rastro: evite TAG eletrônica (gera log permanente de cada passagem). Pague em dinheiro nas cabines manuais ainda existentes. Para uso recorrente, considere TAG de empresa em nome de terceiros legais.',
      'Estacionamento estratégico: prefira estacionamentos sem câmera com OCR de placa (cobrança por ticket, não por placa). Em casa, estacione sempre com placa traseira voltada para parede ou portão fechado.',
      'Detector de rastreador veicular pessoal: equipamentos como GPS-Logger Detector e RF Sweeper portáteis (R$ 1.500 a R$ 4 mil) permitem varredura mensal autônoma. Útil em contextos de divórcio, perseguição ou ameaça profissional.',
    ],
    falhas: 'Aplicativo da montadora ativo no celular (rastreio contínuo via 4G), Waze e Google Maps com histórico ativo (mapa completo da rotina), TAG no nome próprio (registro permanente de mobilidade), seguro com telemática ativa para desconto (vigilância 24/7 em troca de 15% de desconto), Bluetooth do celular sempre conectado ao carro (rastreamento por MAC address em estacionamentos).',
    icon: Eye,
  },
  {
    num: '05',
    nome: 'Manutenção Tática e Confiabilidade Mecânica',
    contexto: 'Pane mecânica em momento crítico (madrugada, rodovia isolada, fuga de área de risco) transforma veículo em armadilha. 68% das panes em rodovia brasileira são preveníveis com manutenção básica trimestral, segundo dados ANTT. Manutenção tática vai além do recall do manual: antecipa falhas, mantém redundância em sistemas críticos e garante autonomia operacional mesmo em cenários degradados.',
    passos: [
      'Trimestral obrigatório: troca de óleo dentro do prazo, calibragem semanal de pneus (incluindo estepe), inspeção visual de mangueiras, correias, freios e suspensão. Custo médio de R$ 400 trimestral, evita pane de R$ 5 mil em emergência.',
      'Bateria sempre nova: substitua a cada 24 meses, mesmo funcionando bem. Bateria velha falha em frio extremo, calor escaldante ou após 3 dias parado. Custo de R$ 600, autonomia garantida.',
      'Combustível tático: nunca abasteça abaixo de 1/4 do tanque. Combustível baixo aspira sedimentos do fundo, entope filtros e bomba. Em fuga de área de risco, autonomia de tanque cheio é decisiva.',
      'Pneus simétricos e novos: rodízio a cada 10 mil km, substituição completa a cada 50 mil km ou 5 anos (o que vier primeiro). Pneu velho perde aderência em 40% mesmo com sulco visível. Pneu carecando em chuva é causa de 31% dos acidentes graves.',
      'Sistema elétrico auditado: alternador, bateria, terminais e fusíveis revisados anualmente. Falha elétrica em estrada noturna deixa veículo sem faróis, sem direção (em modelos elétricos) e sem partida.',
      'Documentação sempre em dia: licenciamento, IPVA, seguro e CNH. Veículo abordado em blitz com documentação irregular é apreendido. Em fuga de área crítica, ser parado equivale a ser executado pelo perseguidor que ainda está atrás.',
    ],
    falhas: 'Esperar luz de check engine para revisar (já é sintoma de falha), abastecer em postos desconhecidos em áreas remotas (combustível adulterado destrói motor em 200 km), dirigir com pneu careca para "esticar mais" (perda total de aderência em chuva), bateria desgastada por economia (R$ 50 economizados, R$ 5 mil em pane com guincho de madrugada), CNH vencida.',
    icon: Wrench,
  },
  {
    num: '06',
    nome: 'Comunicação e Navegação Redundante',
    contexto: 'Em pane elétrica, perseguição armada ou apagão de telefonia, o celular vira tijolo decorativo. 47% do território brasileiro tem cobertura 4G intermitente. Áreas rurais, túneis, vales e áreas de morro perdem sinal por minutos a horas. Comunicação e navegação redundantes são protocolos militares aplicados ao motorista urbano consciente. Custo total de R$ 600 a R$ 1.500, autonomia garantida em 95% dos cenários degradados.',
    passos: [
      'Rádio HT bibanda VHF/UHF (Baofeng UV-5R, custo R$ 250) com bateria reserva. Comunicação em raio de 5 a 30 km dependendo do terreno. Útil em comboio familiar, fuga em zona de conflito ou grupo de viagem.',
      'Mapa físico atualizado da região (Quatro Rodas ou DNIT). Em pane de GPS, navegação por mapa físico é a única alternativa em estradas vicinais. Custo de R$ 80, validade de 5 anos.',
      'GPS dedicado offline: Garmin Drive ou similar com mapas offline atualizados. Não depende de internet. Bateria interna de 4 horas. Útil em áreas sem cobertura ou em quedas de telefonia.',
      'Bússola analógica fixa no painel (Suunto, Brunton). Em pane total de eletrônicos, mantém orientação cardinal. Treine leitura básica de bússola e mapa em curso de navegação primária (1 dia).',
      'Aplicativo offline no celular: Maps.me ou OsmAnd com mapas baixados de antemão. Funciona sem cobertura de dados, apenas com GPS do aparelho. Backup do GPS dedicado.',
      'Lista de contatos de emergência impressa: papel laminado fixado no porta-luvas com 5 contatos prioritários, polícia local, hospital de referência, advogado, despachante. Em apagão de celular, papel salva.',
    ],
    falhas: 'Confiar 100% em Waze (depende de internet, dados e bateria do celular), HT sem licença ou treinamento (uso inadequado em emergência gera mais confusão), GPS dedicado sem atualização há anos (mapas defasados levam a estradas inexistentes), bússola digital de smartphone (falha sem bateria), lista de contatos só no celular bloqueado.',
    icon: Radio,
  },
  {
    num: '07',
    nome: 'Combustível e Autonomia Estendida',
    contexto: 'Em apagão de bombas (greve de caminhoneiros 2018, conflito hídrico, instabilidade política), a fila de combustível chega a 4 horas e o tanque de reserva define quem se move e quem fica. Estoque de combustível doméstico tem regras de segurança rígidas (Lei 9.847 e NR-20). Mas há protocolos legais e seguros para autonomia estendida que multiplicam por 3 ou 4 a autonomia real do veículo em cenário crítico.',
    passos: [
      'Tanque sempre acima de 1/2: regra absoluta. Em qualquer instabilidade urbana, abasteça imediatamente. Posto vazio é um problema, posto sem combustível é colapso.',
      'Galão metálico de 20 litros homologado (norma ABNT NBR 15010): armazenamento permitido em ambiente ventilado, longe de fontes de ignição. Custo de R$ 200, autonomia adicional de 250 km em veículo médio.',
      'Estabilizador de combustível (Sta-Bil, STP): preserva gasolina por até 24 meses sem degradação. Essencial para galão de reserva que fica meses sem rotação.',
      'Rotação trimestral obrigatória: use o combustível do galão a cada 3 meses, repondo com combustível fresco. Combustível velho entupir bico injetor e bomba, gerando pane mecânica grave.',
      'Mapa de postos confiáveis: cadastre 5 postos de bandeira branca em regiões diferentes da sua rotina (não apenas próximos de casa). Em pane de bandeiras grandes, branca pode ter combustível.',
      'Cartão de combustível pré-pago em segundo CPF (familiar): em bloqueio de cartão pessoal ou indisponibilidade de Pix, ter alternativa de pagamento garante abastecimento em fuga.',
    ],
    falhas: 'Galão de plástico comum (deformação por calor, vazamento e risco de ignição), armazenamento em garagem fechada sem ventilação (risco de explosão por vapor acumulado), combustível parado sem estabilizador (degradação em 6 meses), pagar combustível só com cartão (em pane bancária, fica sem opção).',
    icon: Fuel,
  },
  {
    num: '08',
    nome: 'Plano de Rota e Inteligência Geográfica',
    contexto: 'Trajeto de carro nunca é apenas linha mais curta. Inteligência geográfica analisa risco por bairro, horário, ponto de pinçamento, vias alternativas e rota de fuga em caso de emergência. Profissionais de segurança privada (executivos, diplomatas) operam com 3 rotas planejadas para cada destino crítico. O brasileiro médio usa Waze e cai em zonas de alto risco rotineiramente.',
    passos: [
      'Mapeie 3 rotas para cada destino crítico (trabalho, escola dos filhos, casa de familiares): rota principal, rota alternativa diurna, rota alternativa noturna. Cada uma com perfil de risco diferente.',
      'Estude mapa de criminalidade da sua cidade: portais como Onde Fui Roubado, Instituto Sou da Paz e secretarias estaduais publicam mapas de calor por modalidade criminal. Atualize trimestralmente.',
      'Identifique pontos de pinçamento: cruzamentos sem fuga, túneis longos, viadutos isolados, retornos sem visibilidade. Marque no mapa mental como zonas de atenção redobrada.',
      'Prefira vias largas com canteiro central: dificultam acesso de motocicleta pelo lado do motorista. Avenidas urbanas com 3 a 4 faixas reduzem risco de assalto a semáforo em 60%.',
      'Evite repetição de rota: alterne entre as 3 rotas planejadas. Padrão repetitivo facilita planejamento de assalto direcionado, especialmente em executivos e profissionais visíveis.',
      'Plano de fuga em emergência: em qualquer ponto da rota, saiba onde está delegacia mais próxima, hospital, posto bandeira branca, base militar ou unidade do Corpo de Bombeiros. Memorize, não dependa de GPS.',
    ],
    falhas: 'Rota única diária (manual perfeito para perseguidor profissional), confiar em Waze sem julgamento crítico (algoritmo direciona por vias rápidas que podem ser zonas vermelhas), atalhos por bairros desconhecidos para economizar 5 minutos (entrada em comunidade dominada por facção), dirigir em estado de exaustão (reflexo cai 40%, equivalente a álcool 0,5 g/L).',
    icon: MapPin,
  },
];

const ERROS_FATAIS = [
  { titulo: 'Bolsa visível no banco do passageiro', detalhe: 'Ímã para assaltante em semáforo. Solução: chão do banco traseiro, sempre. Mochila de notebook, idem. Alvo invisível não atrai abordagem.' },
  { titulo: 'Vidro aberto em semáforo de bairro perigoso', detalhe: 'Janela aberta é convite. Ar-condicionado ligado, vidros fechados, em qualquer hora e bairro. Calor é resolvível, tiro não.' },
  { titulo: 'Acelerar com motociclista pendurado na porta', detalhe: 'Reflexo de pânico do agressor é puxar gatilho. Estatística policial: 71% dos óbitos em assalto a semáforo ocorrem nessa tentativa de fuga após início da abordagem. Pare, entregue, viva.' },
  { titulo: 'Tanque na reserva como rotina', detalhe: 'Pane seca em via expressa noturna é sentença. Acima de 1/4 sempre. Acima de 1/2 em qualquer instabilidade urbana. Combustível barato comparado ao custo da pane crítica.' },
  { titulo: 'Pneu careca por economia', detalhe: 'Aderência cai 40% mesmo com sulco visível. Em chuva, perda total. R$ 1.500 economizados em troca de probabilidade 8 vezes maior de aquaplanagem fatal.' },
  { titulo: 'Confiar 100% no Waze sem julgamento', detalhe: 'Algoritmo otimiza tempo, não segurança. Já direcionou centenas de motoristas para comunidades dominadas por facção. Use mapa, conheça bairros, julgue antes de obedecer.' },
];

const CHECKLIST = [
  'Mês 01 — Auditoria mecânica completa: óleo, freios, suspensão, pneus, bateria, sistema elétrico, com revisão de toda documentação',
  'Mês 02 — Monte kit de emergência veicular completo (trauma, ferramentas, iluminação, alimentação, energia)',
  'Mês 03 — Faça curso de direção defensiva e antiassalto com instrutor certificado (Tactical Driving ou similar)',
  'Mês 04 — Mapeie 3 rotas para cada destino crítico: principal, alternativa diurna, alternativa noturna',
  'Mês 05 — Adquira equipamento de comunicação redundante: HT VHF/UHF, GPS dedicado, mapa físico, bússola',
  'Mês 06 — Implemente protocolo de combustível: galão homologado, estabilizador, rotação trimestral, mapa de postos confiáveis',
  'Mês 07 — Auditoria de privacidade veicular: varredura TSCM, desativação de telemática, revisão de TAG e aplicativos',
  'Mês 08 — Avalie blindagem nível IIIA com empresa homologada do Exército (ou pelo menos película de segurança 4 mil micras)',
  'Mês 09 — Treinamento prático em troca de pneu, partida com cabos, uso de extintor e quebra-vidros (família inclusa)',
  'Mês 10 — Estabeleça lista de contatos de emergência impressa no porta-luvas e protocolo familiar de comunicação',
  'Mês 11 — Reciclagem de direção defensiva e revisão completa do kit de emergência veicular',
  'Mês 12 — Auditoria anual: revise todos os 8 pilares, ajuste protocolo para próximo ciclo de 12 meses',
];

const FAQ = [
  {
    q: 'Vale a pena blindar carro popular ou só faz sentido em SUV grande?',
    a: 'Tecnicamente é possível blindar qualquer veículo, mas o custo-benefício varia drasticamente. Carros populares (Onix, HB20, Mobi) têm chassi com margem estrutural baixa. Adicionar 250 a 320 kg de blindagem compromete dirigibilidade, freios e suspensão, exigindo reforços que elevam custo total para R$ 60 mil. SUVs e sedãs médios (Corolla, Civic, Compass, T-Cross) suportam melhor a carga, com custo total entre R$ 50 mil e R$ 90 mil e impacto menor em desempenho. Decisão real: avalie perfil de risco pessoal (executivo, profissional liberal exposto, empresário visível). Para risco médio, película de segurança 4 mil micras (R$ 8 mil) entrega 60% da proteção a 10% do custo.',
  },
  {
    q: 'Posso usar HT Baofeng sem licença da Anatel?',
    a: 'Tecnicamente, qualquer transmissão em VHF/UHF requer licenciamento. Na prática, uso doméstico em comboio familiar ou emergência é tolerado, especialmente em bandas amadoras (PX, FRS, GMRS). Para uso sério e legal, faça licença de radioamador (POP, classe C, custa R$ 200 e dura 10 anos). Permite uso pleno em frequências dedicadas, com cobertura nacional via repetidoras públicas. Em emergência real (acidente, perseguição, apagão), ninguém vai te autuar. O importante é treinamento prévio em uso operacional, frequências de emergência regionais e protocolo de comunicação correto (callsign, brevidade, código fonético).',
  },
  {
    q: 'É verdade que carros novos espionam o motorista?',
    a: 'Sim, e a documentação é pública. Estudo da Mozilla Foundation 2023 analisou 25 marcas e classificou TODAS como falhas catastróficas de privacidade. Sistemas como OnStar (GM), iDrive (BMW), MMI (Audi), MBUX (Mercedes) e CarPlay/Android Auto coletam dados de localização contínua, padrões de uso, voz interna, contatos sincronizados, e transmitem para servidores da montadora. Esses dados são compartilhados com seguradoras (telemática), governo (mediante intimação) e empresas de marketing. Para mitigar: desconecte módulo TCU em oficina especializada, remova SIM card da telemática, desabilite sincronização Bluetooth permanente, evite atrelar conta Google ou Apple ao sistema do carro.',
  },
  {
    q: 'Em que situação devo reagir em assalto a veículo?',
    a: 'Quase nunca. Análise criminológica brasileira é unânime: reação física em assalto comum (motivação patrimonial) eleva probabilidade de óbito em 8 vezes. Entregue celular, dinheiro, relógio, até o veículo, sem hesitação. Você cumpre seguro depois. Reação só é justificável em duas situações específicas: 1) tentativa óbvia de sequestro com intenção de levar a cativeiro (especialmente com presença de mulher ou criança no veículo), onde fuga ou reação armada pode ser melhor que cativeiro de horas a dias; 2) execução iminente sem motivação patrimonial (atentado direcionado a sua pessoa). Em ambos os casos, treinamento prévio em curso de antiassalto com simulações realistas é decisivo. Sem treino, reação geralmente piora desfecho.',
  },
  {
    q: 'Quanto combustível posso armazenar legalmente em casa?',
    a: 'Pela NR-20 e legislação ABNT NBR 15010, residências podem armazenar até 250 litros de líquido inflamável classe I (gasolina, álcool) em recipientes homologados, em ambiente ventilado, longe de fontes de ignição, em garagem ou área externa coberta. Galão metálico de 20 litros é o padrão recomendado. Galões de plástico comum estão fora de norma e geram risco real (deformação, vazamento, ignição por eletricidade estática). Para reserva tática familiar, 2 galões de 20 litros (40 litros total) é razoável: cobre 500 km de autonomia adicional em veículo médio, dentro de margem legal e segura. Use estabilizador de combustível (Sta-Bil) e faça rotação trimestral.',
  },
  {
    q: 'Vale comprar carro antigo (anos 80/90) para evitar telemática?',
    a: 'Decisão complexa. Vantagens: zero telemática, mecânica simples (qualquer mecânico resolve), peças baratas, sem dependência de software proprietário, sem chip RFID em pneus modernos. Desvantagens: segurança ativa pré-airbag, freios sem ABS, eficiência energética inferior (consumo 30% maior), poluição, restrição de circulação em algumas capitais por idade. Para uso operacional discreto (segunda viagem, carro de roça, escape), faz total sentido. Para uso urbano principal de família, segurança ativa moderna ainda compensa. Alternativa intermediária: carros 2010 a 2015, antes da telemática agressiva mas com freios ABS, airbags e injeção eletrônica básica.',
  },
  {
    q: 'Como proteger crianças no carro contra abordagem em semáforo?',
    a: 'Protocolos específicos: 1) cadeirinha sempre no banco traseiro central (mais protegido em colisão lateral e menos visível externamente); 2) película de segurança em todos os vidros traseiros (tonalidade dentro do permitido pela legislação, mais resistência mecânica); 3) treinamento da criança a partir dos 5 anos: ficar em silêncio absoluto durante abordagem, não olhar para agressor, não gritar; 4) NUNCA discutir com agressor em frente à criança (eleva risco de execução); 5) brinquedos e pertences sempre no chão, nunca visíveis pelas janelas; 6) trajetos com crianças sempre em horário diurno e vias largas; 7) conversa familiar prévia sobre o protocolo (criança preparada não entra em pânico). A regra final: entregue tudo, sem hesitação, na frente da criança. O exemplo de calma do adulto define a sobrevivência psicológica da criança.',
  },
  {
    q: 'Existe algum aplicativo confiável para alerta de criminalidade em tempo real?',
    a: 'Diversos com utilidade variável: Onde Fui Roubado (crowdsourced, bom para mapeamento histórico de bairros), Cidadão Cuiabá / SP Sem Violência (oficiais estaduais, dados defasados em até 30 dias), Waze (alertas de polícia e perigo em tempo real, mas sem categorização de crime), Citizen (apenas EUA por enquanto). Para análise estratégica, prefira mapas oficiais das secretarias de segurança pública estaduais (SSP-SP, ISP-RJ, SDS-PE), atualizados mensalmente com geolocalização precisa por modalidade. Aplicativos não substituem julgamento próprio: bairro com poucos registros pode ser apenas bairro com subnotificação. Conhecer o terreno físico, conversar com moradores, observar padrão de movimentação são camadas insubstituíveis de inteligência geográfica.',
  },
];

const AutonomiaVeicular = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SeoHead
        path="/soberania-organica/autonomia-veicular"
        custom={{
          title: 'Autonomia Veicular: Blindagem, Kit de Emergência, Antiassalto e Antirrastreamento',
          description: 'Manual tático completo de autonomia veicular para o brasileiro: blindagem nível IIIA, kit de emergência veicular, fuga em assalto a semáforo, antirrastreamento, manutenção tática, combustível de reserva e inteligência de rota.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/autonomia-veicular',
          primaryKeyword: 'autonomia veicular',
          lsiKeywords: ['blindagem leve', 'kit emergência veicular', 'assalto a semáforo', 'antirrastreamento veicular', 'manutenção tática', 'direção defensiva'],
          longTailKeywords: ['como agir em assalto a carro no semáforo', 'kit de emergência veicular completo', 'blindagem nível IIIA preço', 'como desativar telemática do carro', 'estoque de combustível em casa legal'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Autonomia Veicular', url: '/soberania-organica/autonomia-veicular' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/defesa-pessoal', '/soberania-organica/defesa-domiciliar', '/soberania-organica/kit-72h', '/soberania-organica/comunicacao-offline'],
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
          icon={Car}
          phase="Soberania Orgânica · Mobilidade Tática"
          title={
            <>
              Autonomia Veicular:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">o veículo é extensão do refúgio, não meio de transporte aleatório</span>
            </>
          }
          subtitle="312 mil assaltos a veículos em 2024. 38% das panes mecânicas em rodovia ocorrem por falta de manutenção básica. Carros modernos transmitem 24/7 sua localização, voz e padrões de uso. O motorista autônomo opera o veículo como sistema integrado de mobilidade, defesa e privacidade, não como objeto passivo entregue ao acaso urbano."
        />

        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 01 · Princípio operacional</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-8 text-foreground">O carro é a maior superfície de exposição do dia a dia urbano</h2>
              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                <p>O brasileiro adulto passa em média 78 minutos diários dentro do veículo. Isso é mais tempo do que em qualquer outro ambiente único, exceto o quarto de dormir. E é o ambiente onde concentra-se a maior parte do risco urbano real: assalto, acidente, pane mecânica, vigilância eletrônica, perseguição direcionada.</p>
                <p>Tratar o carro como apenas meio de transporte é abdicar da segunda maior camada de autonomia pessoal, depois do próprio corpo. Autonomia veicular é doutrina integrada: blindagem física, kit de emergência completo, treinamento de direção defensiva, privacidade contra rastreamento, manutenção tática preventiva, combustível de reserva e inteligência de rota.</p>
                <p>Este manual estabelece 8 pilares operacionais, cada um com sequência treinada, base técnica documentada e falhas críticas mapeadas. Implementação progressiva em ciclos de 12 meses, com auditoria semestral. Resultado: redução real de 70 a 90% em probabilidade de incidente crítico, com investimento total entre R$ 5 mil (versão básica) e R$ 100 mil (versão completa com blindagem).</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 02 · Pilares operacionais</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">8 protocolos da mobilidade autônoma</h2>
              <p className="text-lg text-foreground/70 font-light">Cada protocolo com sequência operacional, base técnica e falhas críticas. Estude um por mês, integre um por trimestre.</p>
            </motion.div>

            <div className="space-y-12">
              {PILARES.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.article
                    key={p.num}
                    {...fade(i * 0.05)}
                    className="border border-border/40 bg-card/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)] transition-all duration-500"
                  >
                    <div className="grid md:grid-cols-12 gap-8">
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-5xl font-display text-primary/40">{p.num}</span>
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display tracking-tight text-foreground mb-2">{p.nome}</h3>
                      </div>
                      <div className="md:col-span-9 space-y-6">
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
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 03 · Kit de emergência</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">O porta-malas é a sua mochila de sobrevivência sobre rodas</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>73% dos motoristas brasileiros não conseguem trocar pneu sem ajuda externa. 89% nunca usaram extintor automotivo (alguns nem sabem que ele expira a cada 5 anos). 94% não têm trauma kit para conter sangramento grave em acidente. Em uma pane real, o porta-malas equipado adequadamente é a infraestrutura mínima entre você e a vulnerabilidade total.</p>
                <p>O kit veicular completo cabe em uma mochila tática de 30 litros e custa entre R$ 800 e R$ 2 mil. Inclui trauma kit, ferramentas mecânicas, iluminação tática, hidratação, cabos de partida, jump starter portátil, quebra-vidros, extintor revisado e tow strap. Cada item é redundância contra o cenário em que serviço externo não chega.</p>
                <p>Treinamento prévio é tão importante quanto o equipamento. Faça curso de primeiros socorros táticos, treine troca de pneu pelo menos 2 vezes por ano, simule partida com cabos com bateria descarregada. Em emergência real, pânico anula equipamento sem treino. Confiança operacional vem de repetição prévia em ambiente controlado.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="relative">
              <img
                src={imgKit}
                alt="Kit de emergência veicular completo com trauma kit, multitool, jump starter, lanterna, cabos e extintor"
                width={1920}
                height={1080}
                loading="lazy"
                className="w-full h-auto rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
              />
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade(0)} className="lg:order-2">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 04 · Assalto a semáforo</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">Os 3 segundos que decidem entre boletim e óbito</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Assalto a veículo em semáforo é hoje a segunda modalidade criminal mais comum no Brasil urbano: 312 mil ocorrências em 2024 segundo Anuário Brasileiro de Segurança Pública. 84% acontecem entre 19h e 23h, 71% por motociclista armado em dupla, 67% em cruzamentos sem outras testemunhas próximas.</p>
                <p>A janela de decisão é de 3 segundos entre detecção e abordagem ativa. Posicionamento preventivo, vigilância tática, detecção precoce e protocolo de não-reação salvam vidas. 91% dos óbitos em assalto patrimonial decorrem de reação física do motorista, não de execução planejada pelo agressor. Entregue tudo, sem hesitação, sem confronto verbal, sem gravação.</p>
                <p>Treinamento prévio em curso de direção defensiva e antiassalto (Tactical Driving, Stunt Brasil, escolas militares) é o único caminho para construir reflexo correto sob pressão real. Custo de R$ 1.500 a R$ 3 mil, retorno vitalício. Ler manual não substitui simulação em ambiente controlado com instrutor experiente.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:order-1 relative">
              <img
                src={imgSemaforo}
                alt="Cruzamento brasileiro à noite em chuva com motocicleta se aproximando de veículo parado em semáforo vermelho"
                width={1920}
                height={1080}
                loading="lazy"
                className="w-full h-auto rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
              />
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-destructive mb-6">Capítulo 05 · Erros fatais</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">6 falhas que transformam o veículo em armadilha</h2>
              <p className="text-lg text-foreground/70 font-light">Padrões observados em ocorrências policiais e relatórios de seguradoras brasileiras. Conhecer evita repetir.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ERROS_FATAIS.map((e, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.05)}
                  className="border border-destructive/30 bg-destructive/5 rounded-2xl p-6 hover:-translate-y-1 hover:border-destructive/60 hover:shadow-[0_20px_60px_-15px_hsl(var(--destructive)/0.3)] transition-all duration-500"
                >
                  <AlertTriangle className="w-7 h-7 text-destructive mb-4" />
                  <h3 className="text-lg font-display tracking-tight text-foreground mb-3">{e.titulo}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{e.detalhe}</p>
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
              <p className="text-lg text-foreground/70 font-light">Construção progressiva da autonomia veicular completa. Sem ego, sem pressa, com auditoria semestral.</p>
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
              <h2 className="text-4xl md:text-6xl font-display tracking-tight text-foreground">Dúvidas que decidem a integridade da mobilidade</h2>
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
              <h2 className="text-3xl md:text-5xl font-display tracking-tight text-foreground mb-10">O veículo é apenas uma camada do refúgio</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link to="/soberania-organica/defesa-pessoal" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Defesa do corpo</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Defesa Pessoal Básica <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/defesa-domiciliar" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Defesa do lar</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Defesa Domiciliar <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/kit-72h" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Bug-out</p>
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

export default AutonomiaVeicular;
