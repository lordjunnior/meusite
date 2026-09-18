import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { DoorClosed } from 'lucide-react';
import { Layers } from 'lucide-react';
import { Lightbulb } from 'lucide-react';
import { Camera } from 'lucide-react';
import { Lock } from 'lucide-react';
import { Moon } from 'lucide-react';
import { Users } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/defesa-domiciliar-hero.webp';
import imgCofre from '@/assets/saida/defesa-domiciliar-cofre.webp';
import imgPerimetro from '@/assets/saida/defesa-domiciliar-perimetro.webp';

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
  icon: typeof Home;
}

const PILARES: Pilar[] = [
  {
    num: '01',
    nome: 'Blindagem de Portas',
    contexto: 'A porta de entrada é o ponto de falha número um. 73% das invasões residenciais no Brasil ocorrem pela porta principal, com tempo médio de arrombamento de 47 segundos em portas convencionais. Uma porta blindada bem instalada eleva esse tempo para 12 a 25 minutos, suficiente para acionamento de polícia e fuga interna pela rota secundária.',
    passos: [
      'Substitua porta de madeira maciça simples por porta blindada classe RC2 ou superior (norma ABNT NBR 11785). Espessura mínima de 5 cm, núcleo de aço estrutural, batente reforçado integrado ao concreto, mínimo 4 dobradiças anti-arrancamento.',
      'Fechadura multiponto com 5 a 7 pontos de travamento, cilindro de alta segurança classe A3 com sistema anti-bumping, anti-perfuração, anti-impressão. Marcas de referência: Mottura, Cisa, Mul-T-Lock, com chave restrita registrada.',
      'Instale olho mágico digital com tela LCD interna e gravação. Olho mágico convencional pode ser invertido com ferramenta específica, expondo o interior em 3 segundos.',
      'Reforce o batente com chapa de aço de 3 mm em volta de toda a moldura, fixada com parafusos passantes de 80 mm na alvenaria. 80% das invasões por arrombamento atacam o batente, não a porta.',
      'Adicione barra escora interna noturna (tipo travão de chão articulado). Em caso de falha da fechadura, escora suporta 1.500 kg de força de arrombamento por mais 8 minutos.',
      'Nunca instale fechadura eletrônica como ponto único. Sempre como camada secundária junto da fechadura mecânica multiponto. Falhas eletrônicas (bateria, firmware) acontecem em 4 a 7% dos casos anuais.',
    ],
    falhas: 'Porta de compensado pintada de marrom imitando madeira maciça, dobradiças visíveis pelo lado externo (basta serrar pinos), fechadura tetra-chave (sistema dos anos 80, picado em 90 segundos com gazua), chave reserva embaixo do tapete ou vaso.',
    icon: DoorClosed,
  },
  {
    num: '02',
    nome: 'Blindagem de Janelas',
    contexto: 'Janelas representam 18% dos pontos de invasão, com concentração em térreos e primeiros andares. Vidro convencional quebra com 2 kg de força aplicada com martelo de centro. Película de segurança 8 mil ou superior eleva resistência para 40 kg e mantém os fragmentos colados, gerando ruído sustentado durante a tentativa.',
    passos: [
      'Aplique película de segurança 8 mil em todas as janelas térreas e do primeiro andar. Investimento médio de R$ 180/m², instalação por profissional certificado em 2 a 4 horas.',
      'Grades fixas em ferro maciço de 16 mm em vãos térreos, com espaçamento máximo de 12 cm entre barras. Solda contínua, fixação com parafuso passante para o lado interno (nunca chumbador externo).',
      'Janelas de banheiro pequenas: substitua por elemento vazado tipo cobogó de concreto ou vidro fixo de 10 mm. Banheiro térreo é rota preferida em 23% das invasões por aparente "vão impossível".',
      'Sensores magnéticos de abertura em todas as janelas conectadas a alarme central. Custo unitário R$ 35 a R$ 80, instalação simples com fita 3M VHB, autonomia de bateria 18 a 24 meses.',
      'Persianas externas blindadas (tipo rolante de alumínio reforçado) em janelas de quarto principal. Resistência adicional de 8 a 12 minutos contra arrombamento e proteção térmica/acústica como bônus.',
      'Vidros antivandalismo classe P5A para fachadas voltadas para rua. Múltiplas camadas com PVB, resistência a 30 impactos consecutivos de 4 kg sem penetração.',
    ],
    falhas: 'Grades pintadas com tinta acrílica que esconde solda fria (corte com serra de 30 segundos), parafusos chumbador externo (saca-rosca neutraliza em 90 segundos), janela basculante de banheiro sem grade, vidro temperado simples (estilhaça inteiro com soco de cotovelo).',
    icon: Layers,
  },
  {
    num: '03',
    nome: 'Camadas Perimetrais',
    contexto: 'Defesa em camadas concentra obstáculos sequenciais entre o invasor e o núcleo familiar. Conceito militar: cada camada gera ruído, atraso e oportunidade de detecção. Residência sem camadas oferece 47 segundos de invasão. Residência com 4 camadas eleva esse tempo para 12 a 18 minutos, janela suficiente para resposta tática.',
    passos: [
      'Camada 1 (visual dissuasiva): muro alto de 2,5 a 3 metros, pintura clara para refletir luz noturna, ausência de vegetação alta encostada (escada natural). Topo com concertina, lança ou cerca elétrica visível.',
      'Camada 2 (perímetro ativo): cerca elétrica de 12.000 a 15.000 V (não letal, conforme norma ABNT NBR 16767), com central monitorada que dispara sirene ao primeiro contato. Custo médio R$ 120 por metro linear instalado.',
      'Camada 3 (jardim e iluminação): caminhos de pedrisco britado (gera som ao pisar), vegetação espinhosa em janelas (buganvília, pitanga, cica), iluminação automática por sensor PIR a cada 4 metros.',
      'Camada 4 (envoltória física): porta blindada, janelas com película e grade, portas internas de quartos com fechadura por dentro (refúgio temporário). Núcleo familiar concentrado em quarto seguro principal.',
      'Camada 5 (eletrônica): câmeras IP em pontos cegos (frente, fundos, laterais), alarme com sensores em portas e janelas, sirene externa de 120 dB, comunicação para celular via app local.',
      'Camada 6 (humana): grupo de WhatsApp com 4 a 6 vizinhos imediatos, código verbal compartilhado para emergência, rondas presenciais espontâneas em horários variados, conhecimento mútuo de rotinas e veículos.',
    ],
    falhas: 'Investir tudo em uma única camada (porta blindada, mas janela de vidro simples), vegetação alta encostada no muro (escada natural), portão automático sem chave manual reserva (falha elétrica deixa carro preso na rua).',
    icon: Layers,
  },
  {
    num: '04',
    nome: 'Iluminação Dissuasiva',
    contexto: 'Luz é a arma mais barata e mais subutilizada da defesa domiciliar. Criminoso opera em zona escura por necessidade operacional: anonimato, ocultação, fuga. Iluminação automática inteligente reduz tentativas de invasão em 67% segundo estudo do Instituto Sou da Paz. Investimento médio: R$ 800 a R$ 2.500 para casa térrea de 200 m².',
    passos: [
      'Refletores LED 30W com sensor PIR (movimento + presença) em todas as fachadas, ativados a 6 metros de distância, com tempo de iluminação ajustável de 30 segundos a 5 minutos.',
      'Iluminação contínua de baixo consumo (LED 5W) em corredores externos laterais, garagem, área de serviço. Funciona durante toda a noite, custo médio R$ 8 mensais por ponto.',
      'Spots embutidos no jardim (luz quente, 3000K) iluminando vegetação e caminhos. Estética dupla função: paisagismo elegante e eliminação de zonas de sombra.',
      'Lâmpadas inteligentes (Wi-Fi) no interior da casa programadas para acender e apagar em padrões variados durante viagens. Simulação de presença reduz tentativas em residências vazias em 83%.',
      'Sistema de backup com bateria estacionária para iluminação crítica em apagão. 4 a 6 horas de autonomia para refletor frontal e iluminação de quarto seguro.',
      'Lanternas táticas de 1.000 lúmens em pontos estratégicos (mesa de cabeceira, gaveta da sala, garagem). Função dupla: iluminação de emergência e ofuscante temporário em invasor.',
    ],
    falhas: 'Iluminação contínua excessiva (gera sombras duras e pontos cegos), refletor mal direcionado (ilumina o invasor para o morador, mas também o caminho do invasor), lâmpadas brancas frias 6500K no quarto (alteram ciclo circadiano e qualidade do sono).',
    icon: Lightbulb,
  },
  {
    num: '05',
    nome: 'Câmeras IP Locais',
    contexto: 'Câmera serve para 3 funções: dissuasão visual, registro pericial pós-evento, monitoramento ativo em tempo real. Sistemas em nuvem dependem de internet contínua e expõem imagens privadas a vazamentos. Câmera IP local (NVR próprio, sem dependência de servidor terceirizado) entrega segurança real sem comprometimento da privacidade familiar.',
    passos: [
      'Use câmeras IP com gravação local em NVR (Network Video Recorder) próprio, HD interno de 4 a 8 TB, retenção mínima de 30 dias em qualidade Full HD.',
      'Posicione câmeras em pontos de cobertura crítica: portão principal (placa do veículo legível), entrada da garagem, laterais externas, área de fundos, ponto cego entre janelas.',
      'Resolução mínima 4 MP (2K) para identificação facial. Câmeras 1080p geram imagens borradas em zoom digital, inutilizando registro pericial em juízo.',
      'Visão noturna infravermelha de 30 a 50 metros, com modo full color para câmeras frontais (recurso que dissuade invasor por revelar percepção em cores).',
      'Acesso remoto exclusivo via VPN local (WireGuard ou Tailscale), nunca via app de fabricante chinês. Empresas como Hikvision e Dahua sofreram vazamentos massivos em 2021 e 2023.',
      'Sirene IP integrada ao NVR com gatilho automático em detecção de movimento fora do horário programado. Sirene 110 dB externa cria impacto psicológico imediato em invasor.',
    ],
    falhas: 'Câmeras armazenando exclusivamente em nuvem chinesa (compromisso de privacidade e dependência de internet), Wi-Fi sem segregação (rede da câmera junto com rede principal expõe dados pessoais), câmera dummy falsa (criminoso experiente identifica em 5 segundos pela ausência de cabo de força).',
    icon: Camera,
  },
  {
    num: '06',
    nome: 'Cofres Ocultos e Compartimentação',
    contexto: 'Cofre evidente é alvo prioritário em invasão prolongada. Em 38% dos sequestros relâmpago domésticos, vítimas são torturadas por horas para revelar localização e senha. Compartimentação tática divide bens em 3 níveis: visível (sacrifício planejado), oculto operacional (acesso rápido), oculto profundo (último recurso, nunca revelado).',
    passos: [
      'Nível 1 (sacrifício): pequeno cofre eletrônico visível em armário de quarto, contendo R$ 200 a R$ 500 em dinheiro vivo, relógios baratos, joias falsas. Entregue rapidamente em invasão para encerrar busca.',
      'Nível 2 (operacional): cofre de chão fixado em laje de concreto ou em parede estrutural, oculto por mobília pesada (geladeira embutida, estante de livros, cama). Senha biométrica + PIN.',
      'Nível 3 (profundo): compartimento secreto sem aparência de cofre. Tampa de tomada falsa, livro escavado em estante, espaço sob piso elevado, falsa parede em armário. Para documentos críticos, hardware wallet, ouro físico.',
      'Cofre adquirido deve ter classificação ABNT NBR 13860 (resistência a fogo e arrombamento). Modelos baratos de aço fino são abertos com pé-de-cabra em 2 a 4 minutos.',
      'Nunca registre senha em papel próximo ao cofre, em celular sem criptografia ou em e-mail. Use sistema mnemônico ou aplicativo de senha local (KeePassXC, Bitwarden self-hosted).',
      'Hardware wallet bitcoin: nunca em cofre único. Use multisig 2 de 3 com chaves em locais geograficamente distintos (casa principal, casa de família, cofre bancário ou enterrado em propriedade rural).',
    ],
    falhas: 'Cofre embutido em parede de gesso (arrancado em 3 minutos), senha igual à data de aniversário do filho (publicada em redes sociais), seed phrase escrita em papel dentro do próprio cofre, posto único de armazenamento de bens críticos.',
    icon: Lock,
  },
  {
    num: '07',
    nome: 'Protocolo de Invasão Noturna',
    contexto: 'Invasão noturna explora o pior estado cognitivo da vítima: sono profundo, desorientação, adrenalina caótica. Resposta tática exige protocolo treinado e ensaiado em frio. Sem protocolo, 70% das vítimas tomam decisões erradas nos primeiros 30 segundos. Com protocolo treinado mensalmente, 80% conseguem executar fuga ou refúgio com sucesso.',
    passos: [
      'Detecção: ao primeiro ruído suspeito (vidro quebrando, porta forçada, sirene), nunca acenda luz central. Permaneça em silêncio absoluto, identifique posição do invasor pelo som por 10 a 20 segundos.',
      'Acionamento silencioso: mantenha celular sempre na mesa de cabeceira em modo silencioso. Disque 190 sem fala, deixe a linha aberta. Operador escuta o ambiente e despacha viatura por geolocalização.',
      'Refúgio em quarto seguro: o quarto principal deve ter porta com fechadura por dentro reforçada, janela com possibilidade de escape ou comunicação visual com vizinhos, lanterna tática de 1.000 lúmens, telefone fixo (não dependente de eletricidade), instrumento de defesa proporcional.',
      'Reagrupamento familiar: estabeleça previamente que toda a família corre para o quarto seguro em código de emergência. Crianças treinadas mensalmente em simulação executam em 45 segundos.',
      'Comunicação verbal estratégica: do quarto seguro, verbalize alto: "A polícia foi acionada e está a 3 minutos. Saiam agora." Não negocie, não revele número de pessoas, não abra a porta sob hipótese alguma.',
      'Pós-evento: ao confirmar saída do invasor (silêncio absoluto por 10 minutos + confirmação visual pela janela), saia pela rota secundária (fundos, laje, vizinho). Nunca pela rota principal sem confirmação policial.',
    ],
    falhas: 'Acender luz central na primeira detecção (revela posição e número de moradores), enfrentar invasor armado em corredor (zona de morte por excelência), abrir a porta do quarto para verificar (fim da única camada de proteção restante), chamar ou gritar nome de filhos pequenos (revela alvo prioritário ao invasor).',
    icon: Moon,
  },
  {
    num: '08',
    nome: 'Plano Familiar de Evacuação',
    contexto: 'Evacuação familiar planejada salva mais vidas que qualquer arma de fogo. Em 63% das invasões com vítimas fatais, ausência de plano predefinido foi fator determinante. Plano deve ser ensaiado mensalmente, ajustado por idade dos membros, simulado em diferentes horários e contextos (madrugada, ausência de adulto, presença de visita).',
    passos: [
      'Mapa familiar: desenhe planta da casa com 2 rotas de saída de cada cômodo, ponto de encontro externo principal (R$ 200 metros do imóvel), ponto secundário (1 km, casa de vizinho confiável), ponto terciário (delegacia mais próxima).',
      'Código familiar de emergência: palavra única (não comum no vocabulário diário) que dispara protocolo. Exemplo: "ALPHA" significa ir para quarto seguro. "OMEGA" significa fuga total imediata.',
      'Simulações mensais: pratique evacuação em diferentes contextos (madrugada, durante refeição, com criança no banho). Cronometre tempo, identifique falhas, ajuste protocolo.',
      'Bolsa de evacuação por morador: pequena mochila no armário com cópia de documentos, R$ 200 em dinheiro vivo, lanterna, carregador de celular, medicamento crítico, agasalho leve. Trocar a cada 6 meses.',
      'Contatos de emergência impressos: lista plastificada na geladeira com 190 (polícia), 192 (SAMU), 193 (bombeiros), advogado familiar, vizinho próximo, parente fora da cidade. Importante para idosos e crianças.',
      'Plano para crianças e idosos: criança maior de 5 anos sabe ir para o quarto seguro em 30 segundos. Idoso com mobilidade reduzida tem rota adaptada (sem escadas), lanterna individual, telefone fixo no quarto.',
    ],
    falhas: 'Plano só na cabeça do pai (família não treinada), ponto de encontro em local visível da casa (invasor identifica e bloqueia), simulações apenas verbais sem execução física, ignorar necessidades especiais de idosos e crianças pequenas.',
    icon: Users,
  },
];

const ERROS_FATAIS = [
  { titulo: 'Postar foto da casa em rede social', detalhe: 'Olheiro identifica padrão arquitetônico, número de janelas, modelo de fechadura e ausência de câmeras em 30 segundos de análise. Bloqueie metadados de geolocalização em todas as fotos.' },
  { titulo: 'Confiar em monitoramento terceirizado único', detalhe: 'Empresa de monitoramento tem tempo médio de resposta de 12 a 25 minutos no Brasil. Invasão profissional dura 8 a 14 minutos. A defesa real é em camadas próprias, nunca terceirizada.' },
  { titulo: 'Câmera sem manutenção semestral', detalhe: 'HD do NVR falha em média a cada 14 a 18 meses. Lente de câmera externa acumula poeira e teia de aranha em 90 dias. Verifique mensalmente, faça manutenção semestral.' },
  { titulo: 'Senha de alarme padrão de fábrica', detalhe: '1234, 0000, ano de instalação. 31% dos alarmes residenciais brasileiros mantêm senha padrão. Lista publicada em fóruns criminosos, neutraliza alarme em 8 segundos.' },
  { titulo: 'Cachorro como única defesa', detalhe: 'Cachorro grande envenenado por bife com veneno em 4 a 7 minutos. Cachorro pequeno latidor é silenciado com chute. Cão é elemento de defesa secundário, jamais primário.' },
  { titulo: 'Compartilhar viagem em tempo real', detalhe: 'Stories de aeroporto, Instagram de praia, check-in em hotel. Sinaliza casa vazia para olheiros. Publique apenas após retorno, com delay mínimo de 7 dias.' },
];

const CHECKLIST = [
  'Mês 01 — Audite a porta principal: substitua se for de compensado, instale fechadura multiponto e olho mágico digital',
  'Mês 02 — Aplique película de segurança 8 mil em janelas térreas, instale grades fixas reforçadas em vãos críticos',
  'Mês 03 — Mapeie zonas escuras externas, instale 4 a 6 refletores LED com sensor PIR cobrindo todo o perímetro',
  'Mês 04 — Adquira sistema de câmeras IP local com NVR próprio, gravação 30 dias, posicionamento em 4 pontos',
  'Mês 05 — Instale cerca elétrica certificada com sirene integrada, integre ao alarme central via central monitorada',
  'Mês 06 — Construa quarto seguro: reforce porta, adicione lanterna tática, telefone fixo, instrumento de defesa',
  'Mês 07 — Adquira cofre certificado ABNT, instale em local oculto, configure 3 níveis de compartimentação tática',
  'Mês 08 — Crie plano familiar escrito de evacuação, com mapa, rotas, pontos de encontro e código verbal',
  'Mês 09 — Execute primeira simulação familiar de invasão noturna, cronometre, identifique falhas, ajuste protocolo',
  'Mês 10 — Forme grupo de vigilância com 4 a 6 vizinhos imediatos, defina códigos compartilhados em WhatsApp',
  'Mês 11 — Configure VPN local para acesso remoto a câmeras, audite segurança da rede Wi-Fi residencial',
  'Mês 12 — Avaliação anual completa: revise fechaduras, baterias de sensores, validade de extintores, atualize plano',
];

const FAQ = [
  {
    q: 'Cerca elétrica residencial é legal e segura no Brasil?',
    a: 'Sim. A cerca elétrica residencial é legal e regulamentada pela ABNT NBR 16767, desde que opere em modo pulsado de baixa energia (não letal) entre 8.000 e 15.000 V. A norma exige placas de aviso visíveis a cada 10 metros, instalação por técnico certificado e altura mínima de 2,2 metros do solo. Equipamentos clandestinos com corrente contínua ou alta amperagem são ilegais e geram responsabilidade criminal em caso de morte ou lesão grave. Opte por marcas certificadas (Speed, GCP, JFL) com central monitorada e sirene integrada.',
  },
  {
    q: 'Vale a pena ter arma de fogo em casa para defesa?',
    a: 'Depende de treinamento contínuo, perfil familiar e contexto regional. Estatisticamente, 30% dos disparos defensivos no Brasil ocorrem por familiares (acidentes ou conflitos domésticos). Se optar por arma, exige porte legal regularizado, cofre biométrico de acesso restrito, treinamento mínimo de 200 horas em estande qualificado, renovação anual de prática. Para a maioria das famílias, camadas de defesa estrutural (porta blindada, alarme, câmeras, quarto seguro) entregam mais segurança real do que arma sem treinamento. Spray de pimenta civil, taser e bastão extensível são alternativas legais com curva de aprendizado menor.',
  },
  {
    q: 'Como proteger a casa quando viajo de férias?',
    a: 'Antes da viagem: configure lâmpadas inteligentes para acender e apagar em padrões variados, peça vizinho de confiança para retirar correspondência diariamente, programe carro estacionado na garagem (não no portão), avise apenas 1 ou 2 contatos críticos. Durante a viagem: nunca poste em redes sociais em tempo real, mantenha alarme armado em modo total, monitore câmeras IP via VPN local, mantenha celular em horário brasileiro para responder em caso de acionamento. Considere contratar empresa de monitoramento exclusivamente para o período da viagem.',
  },
  {
    q: 'Câmera com gravação em nuvem ou local? Qual é melhor?',
    a: 'Gravação local em NVR próprio é tecnicamente superior e mais segura para privacidade familiar. Gravação em nuvem depende de internet contínua (vulnerável a corte de cabo na rua), expõe imagens privadas a servidores terceirizados (com histórico de vazamentos massivos em 2021, 2022 e 2023), gera mensalidade contínua. NVR local com HD de 4 a 8 TB armazena 30 a 60 dias em Full HD, custo único, acesso remoto via VPN local própria (WireGuard, Tailscale). Para máxima resiliência, configure NVR em local oculto da casa (não junto às câmeras), com bateria nobreak e backup de gravações críticas em HD externo.',
  },
  {
    q: 'O que fazer durante uma invasão noturna em andamento?',
    a: 'Execute o protocolo treinado: silêncio absoluto, acionamento silencioso do 190 (ligue e deixe a linha aberta), reagrupamento familiar no quarto seguro com porta trancada por dentro, comunicação verbal estratégica para o invasor ("polícia acionada, saiam agora"), nunca abrir a porta sob hipótese alguma. Após silêncio absoluto por 10 minutos e confirmação visual de saída pela janela, evacue pela rota secundária (fundos, laje, vizinho). Nunca confronte invasor armado em corredor. Bens são repostos, vidas não. A única exceção legítima é defesa direta da vida em ameaça iminente conforme art. 25 do Código Penal.',
  },
  {
    q: 'Sistema de alarme é realmente eficaz no Brasil?',
    a: 'Sim, mas como camada integrada, nunca isoladamente. Alarme com sensores em todas as portas e janelas, sirene externa de 120 dB, central monitorada com resposta em até 15 minutos, comunicação dual (GPRS + Wi-Fi para evitar bloqueio por inibidor de sinal). Marcas de referência: JFL, Intelbras, PPA. Custo médio de instalação R$ 1.500 a R$ 4.000 para residência de 200 m², mensalidade de monitoramento R$ 80 a R$ 200. Importante: 73% dos invasores experientes tentam neutralizar o alarme antes de invadir. Configure backup com bateria interna de 24 horas e sirene oculta secundária no telhado, fora do alcance imediato.',
  },
  {
    q: 'Como proteger documentos críticos e bitcoin em casa?',
    a: 'Compartimente em 3 níveis. Documentos rotineiros (RG, CNH, CPF cópia) em pasta no escritório. Documentos críticos (escritura, contratos, testamento) em cofre certificado ABNT NBR 13860 oculto por mobília. Bens digitais (hardware wallet bitcoin, seed phrase) em sistema multisig 2 de 3 com chaves em locais geograficamente distintos: casa principal, casa de familiar de absoluta confiança, cofre bancário ou enterrado em propriedade rural. Nunca concentre seed phrase em um único ponto. Para bitcoin, use modelo de Multisig com Sparrow Wallet ou Specter, com hardware wallets distintas (Coldcard, Jade, Krux DIY) em jurisdições físicas separadas.',
  },
  {
    q: 'Vizinhança organizada substitui investimento em segurança?',
    a: 'Não substitui, complementa. Grupo de vizinhos atento reduz invasões em 41% segundo estudo da ABESE, mas não anula necessidade de blindagem física. A combinação ideal: 1) blindagem estrutural (porta, janelas, perímetro), 2) eletrônica (câmeras, alarme, iluminação), 3) humana (vizinhança organizada, código verbal, rondas espontâneas). Crie grupo de WhatsApp com 4 a 6 vizinhos imediatos, estabeleça códigos como "carro estranho na rua há 15 minutos" ou "movimento suspeito no muro dos fundos", organize rondas leves em horários variados, conheça nome e veículo de cada morador. A camada humana entrega o que tecnologia nunca alcança: julgamento contextual em tempo real.',
  },
];

const DefesaDomiciliar = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SeoHead
        path="/soberania-organica/defesa-domiciliar"
        custom={{
          title: 'Defesa Domiciliar: Blindagem, Perímetro, Câmeras IP e Quarto Seguro no Brasil',
          description: 'Manual completo de defesa domiciliar para o cenário brasileiro: blindagem de portas e janelas, camadas perimetrais, iluminação dissuasiva, câmeras IP locais, cofres ocultos, protocolo de invasão noturna e plano familiar de evacuação.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/defesa-domiciliar',
          primaryKeyword: 'defesa domiciliar',
          lsiKeywords: ['blindagem residencial', 'porta blindada', 'cerca elétrica', 'câmera IP local', 'quarto seguro', 'cofre oculto', 'plano de evacuação familiar'],
          longTailKeywords: ['como proteger minha casa de invasão', 'qual a melhor porta blindada residencial', 'sistema de câmeras IP sem nuvem', 'protocolo de invasão noturna em casa', 'plano de evacuação familiar contra assalto'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Defesa Domiciliar', url: '/soberania-organica/defesa-domiciliar' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/defesa-pessoal', '/soberania-organica/edc', '/soberania-organica/protocolos-apagao', '/soberania-organica/kit-72h'],
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
          icon={Home}
          phase="Soberania Orgânica · Resiliência Tática"
          title={
            <>
              Defesa Domiciliar:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">a casa não é refúgio por acaso, é refúgio por engenharia</span>
            </>
          }
          subtitle="O Brasil registra mais de 380 mil invasões residenciais por ano. 73% entram pela porta principal em menos de 47 segundos. A diferença entre uma casa que vira manchete e uma casa que vira fortaleza não é dinheiro, é arquitetura defensiva em camadas, treinamento familiar e protocolo executado sob pressão."
        />

        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 01 · Princípio operacional</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-8 text-foreground">A casa segura é construída em camadas, não em produtos isolados</h2>
              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                <p>Existem duas mentalidades de segurança residencial. A primeira investe em um único ponto caro (porta blindada de R$ 25 mil, cerca elétrica monitorada) e considera a casa segura. A segunda compreende que invasor profissional ataca a camada mais fraca, não a mais cara. Uma casa com porta blindada e janela de banheiro com vidro simples tem o mesmo nível de segurança de uma casa sem nada.</p>
                <p>Defesa em camadas concentra obstáculos sequenciais entre o invasor e o núcleo familiar. Cada camada gera ruído, atraso e oportunidade de detecção. Residência sem camadas oferece 47 segundos de invasão. Residência com 4 camadas eleva esse tempo para 12 a 18 minutos, janela suficiente para acionamento policial, fuga interna e refúgio em quarto seguro.</p>
                <p>Este manual estabelece a arquitetura completa: blindagem física, perímetro ativo, iluminação tática, câmeras IP locais, cofres compartimentados, protocolo de invasão noturna e plano familiar de evacuação. Implemente em ciclos de 12 meses, com auditoria anual obrigatória.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 02 · Pilares operacionais</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">8 camadas da defesa residencial real</h2>
              <p className="text-lg text-foreground/70 font-light">Cada camada com sequência operacional, custos médios e falhas críticas mais comuns. Estude uma por semana, implemente em ciclo anual.</p>
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
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 03 · Perímetro ativo</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">A primeira linha de defesa é visível, dissuasiva e silenciosa</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>O criminoso oportunista escolhe a casa mais fácil em um raio de 4 quadras. Levantamento de comportamento criminal mostra que 67% das invasões são abortadas em até 30 segundos quando o invasor identifica perímetro ativo: muro alto, cerca elétrica visível, refletores PIR ativados, câmeras posicionadas, vegetação espinhosa em janelas.</p>
                <p>O perímetro ativo opera em 3 camadas integradas: visual dissuasiva (muro, concertina, lança), eletrônica perimetral (cerca elétrica monitorada, sensores PIR), tática ambiental (caminhos de pedrisco, vegetação espinhosa, iluminação automática). A combinação correta multiplica por 8 o tempo de tentativa de invasão.</p>
                <p>Investimento médio para residência de 200 m² em fundo de quadra: R$ 8.000 a R$ 18.000 com instalação completa, cobrindo cerca elétrica, refletores LED PIR, câmeras IP locais, sensores magnéticos em janelas e portões. Manutenção anual de R$ 600 a R$ 1.200.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="relative">
              <img
                src={imgPerimetro}
                alt="Perímetro residencial brasileiro à noite com refletores LED, câmera IP e cerca elétrica ativos"
                width={1600}
                height={1000}
                loading="lazy"
                className="w-full h-auto rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
              />
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade(0)} className="lg:order-2">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 04 · Compartimentação tática</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">O cofre que salva é o que ninguém sabe que existe</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Cofre evidente é alvo prioritário em invasão prolongada. Em 38% dos sequestros relâmpago domésticos no Brasil, vítimas são torturadas por horas para revelar localização e senha de cofre. A defesa real não é o cofre mais resistente, é a compartimentação tática em 3 níveis.</p>
                <p>Nível 1 (sacrifício planejado): pequeno cofre eletrônico visível em armário de quarto, contendo R$ 200 a R$ 500 em dinheiro, relógios baratos, joias falsas. Entregue rapidamente em invasão para encerrar a busca.</p>
                <p>Nível 2 (operacional oculto): cofre certificado ABNT NBR 13860 fixado em laje de concreto, oculto por mobília pesada. Acesso biométrico + PIN. Para joias reais, dinheiro de reserva e documentos valiosos.</p>
                <p>Nível 3 (profundo invisível): compartimento secreto sem aparência de cofre. Tampa de tomada falsa, livro escavado, falsa parede em armário. Para hardware wallet bitcoin, seed phrase, ouro físico, escrituras originais.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:order-1 relative">
              <img
                src={imgCofre}
                alt="Cofre residencial oculto atrás de painel deslizante de estante com livros, iluminação tungstênio"
                width={1600}
                height={1000}
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
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">6 falhas que entregam a casa antes da invasão</h2>
              <p className="text-lg text-foreground/70 font-light">Padrões observados em laudos periciais e relatos de vítimas. Conhecer evita repetir.</p>
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
              <p className="text-lg text-foreground/70 font-light">Sem pressa, sem ego. Casa segura é construída em ciclos auditáveis, com manutenção semestral obrigatória.</p>
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
              <h2 className="text-4xl md:text-6xl font-display tracking-tight text-foreground">Dúvidas que decidem a integridade da família</h2>
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
              <h2 className="text-3xl md:text-5xl font-display tracking-tight text-foreground mb-10">A casa é apenas uma camada do refúgio</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link to="/soberania-organica/defesa-pessoal" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Defesa do corpo</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Defesa Pessoal Básica <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/protocolos-apagao" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Crise prolongada</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Protocolos de Apagão <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/kit-72h" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Resiliência base</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Kit Tático 72h <ArrowRight className="w-4 h-4" /></p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DefesaDomiciliar;
