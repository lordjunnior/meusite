import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert } from 'lucide-react';
import { Footprints } from 'lucide-react';
import { Hand } from 'lucide-react';
import { Target } from 'lucide-react';
import { AlertOctagon } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { Wind } from 'lucide-react';
import { Eye } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/defesa-hero.webp';
import imgMulher from '@/assets/saida/defesa-mulher.webp';
import imgUrbano from '@/assets/saida/defesa-urbano.webp';

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
  icon: typeof Shield;
}

const PILARES: Pilar[] = [
  {
    num: '01',
    nome: 'Postura e Base',
    contexto: 'A defesa começa antes do golpe. Postura desbalanceada gera queda imediata na primeira investida. O agressor experiente identifica em 2 segundos quem perdeu a base. Pés alinhados aos ombros, joelhos levemente flexionados, peso 60% perna trás, queixo retraído protege jugular e mandíbula.',
    passos: [
      'Pé dominante recuado em 45 graus, dedos alinhados ao calcanhar do pé frontal. Distância entre pés equivalente à largura dos ombros, nunca menor.',
      'Joelhos flexionados em 15 a 20 graus. Joelho travado é alvo prioritário em qualquer briga, perde mobilidade e quebra com chute lateral de 12 kg de força.',
      'Centro de gravidade abaixado e centralizado entre os pés. Tronco levemente inclinado para frente, ombros relaxados mas elevados protegendo o pescoço.',
      'Mãos em guarda alta: punho dominante na altura da maçã do rosto, punho de apoio na altura do queixo, cotovelos colados ao tronco protegendo costelas flutuantes.',
      'Queixo retraído contra o peito. Olhar fixo no torso do agressor (não no rosto, não nas mãos). O torso não mente sobre a direção do próximo movimento.',
    ],
    falhas: 'Pés paralelos (base zero), joelhos travados, mãos abaixo do queixo, queixo elevado expondo jugular, olhar nas mãos do agressor (gera atraso reativo de 0,3 segundos).',
    icon: Footprints,
  },
  {
    num: '02',
    nome: 'Distância e Gestão de Espaço',
    contexto: 'Quem controla a distância controla a luta. Existem 4 zonas mensuráveis: zona segura (acima de 3 metros, opção de fuga), zona crítica (1,5 a 3 metros, raio de chute), zona de impacto (0,5 a 1,5 metros, raio de soco), zona de agarre (abaixo de 0,5 metro, joelho, cotovelo, cabeçada). Cada zona exige resposta tática específica.',
    passos: [
      'Acima de 3 metros: olhe para rotas de fuga em ângulo de 270 graus, identifique objetos contundentes (pedra, garrafa, mochila), inicie deslocamento lateral, nunca recue em linha reta.',
      'Entre 1,5 e 3 metros: assuma postura de combate, mantenha mão fraca estendida em sinal universal de pare. Verbalize firme e alto: "Para. Não chega perto."',
      'Entre 0,5 e 1,5 metros: distância letal de soco. Não recue, avance lateralmente em 45 graus quebrando a linha de visão e cancelando o soco em preparação.',
      'Abaixo de 0,5 metro: zona de cotovelo, joelho e cabeçada. Soco perde força, mas cabeçada de testa contra nariz gera fratura imediata. Use clinch para neutralizar braços.',
      'Treine consciência espacial: caminhe em ambiente público estimando distância em metros até estranhos. Aos 30 dias, a estimativa fica precisa em margem de 0,3 m.',
    ],
    falhas: 'Recuo em linha reta (agressor avança em ritmo dobrado), cruzar pernas durante deslocamento (queda garantida), entrar em zona de agarre sem técnica de clinch.',
    icon: Target,
  },
  {
    num: '03',
    nome: 'Alvos Anatômicos Decisivos',
    contexto: 'Não existe luta justa em rua. Existem 7 alvos que param qualquer agressor independente de tamanho ou treinamento: olhos, garganta, plexo solar, virilha, joelho, peito do pé, têmpora. Esses alvos não respondem a condicionamento físico, são vulneráveis estruturais do corpo humano.',
    passos: [
      'Olhos: dedos em garra (polegar e indicador), movimento curto e direto. Não exige força, gera lacrimejamento incapacitante por 30 a 90 segundos. Janela suficiente para fuga.',
      'Garganta: golpe de mão aberta horizontal contra traqueia. 4 a 6 kg de força gera reflexo de tosse e bloqueio respiratório por 10 a 20 segundos.',
      'Plexo solar: soco curto reto na linha média, 5 cm acima do umbigo. Paralisa diafragma, agressor perde respiração por 5 a 15 segundos. Janela tática crítica.',
      'Virilha: chute frontal com peito do pé ou joelhada ascendente. Independe de gênero do agressor, gera dor reflexa neurológica que dobra o corpo automaticamente.',
      'Joelho: chute lateral com calcanhar contra lateral externa do joelho. 12 a 15 kg de força lateral causa hiperextensão ligamentar. Agressor perde mobilidade permanente na luta.',
      'Peito do pé: pisada vertical com calcanhar nos metatarsos. 26 ossos pequenos, qualquer fratura impede deslocamento e gera dor extrema.',
      'Têmpora: lateral do crânio entre olho e orelha. Osso fino, golpe de cotovelo gera concussão. Use apenas em ameaça à vida, pode ser letal.',
    ],
    falhas: 'Buscar alvos protegidos (estômago endurecido, mandíbula travada, peito musculoso). Esses golpes desperdiçam energia e revelam falta de técnica.',
    icon: AlertOctagon,
  },
  {
    num: '04',
    nome: 'Defesa Contra Agressor Armado',
    contexto: 'Faca, pedaço de madeira, garrafa quebrada, arma de fogo. A regra universal: distância é vida. Nunca tente desarmar agressor armado se houver rota de fuga. Desarme é último recurso após distância zero forçada. Lei brasileira (CP art. 25) ampara legítima defesa proporcional contra agressão injusta.',
    passos: [
      'Arma de fogo a mais de 5 metros: corra em zigue-zague para cobertura sólida (carro, parede, árvore grossa). Tiro a 5+ metros tem precisão drasticamente reduzida em movimento lateral.',
      'Arma de fogo abaixo de 2 metros: se o agressor exige patrimônio, entregue. Bens são reposíveis, vida não. Mantenha mãos visíveis, voz baixa, movimentos lentos.',
      'Faca: distância mínima de 4 metros. Em zona crítica, posicione mochila, jaqueta ou cadeira como escudo improvisado. Lâmina contra tecido espesso perde 60% da capacidade de corte.',
      'Bastão ou pedaço de madeira: avance no momento da elevação do braço (golpe nasce no ombro). Entre na zona morta colada ao agressor, neutralize cotovelo, controle a arma com duas mãos.',
      'Garrafa quebrada: nunca agarre o vidro. Desvie pelo lado externo do braço armado, controle pulso com a mão dominante, golpeie articulação do cotovelo com mão de apoio.',
      'Após desarme bem-sucedido: nunca contra-ataque com a arma capturada. Crie distância de 10 metros e fuja. Posse de arma do agressor pode descaracterizar legítima defesa.',
    ],
    falhas: 'Tentar negociar com armado em surto, encarar agressor olho no olho (gatilho psicológico de violência), virar as costas durante o deslocamento (agressor armado prefere alvo distraído).',
    icon: Shield,
  },
  {
    num: '05',
    nome: 'Fuga Tática',
    contexto: 'Fugir é vencer. A vitória em rua não é nocaute, é chegar em casa com a família intacta. Fuga tática exige planejamento espacial, gestão de adrenalina e leitura de rota. 80% dos confrontos de rua poderiam ser evitados com leitura ambiental adequada nos 30 segundos antecedentes.',
    passos: [
      'Identifique 3 rotas de fuga ao entrar em qualquer ambiente: principal, secundária, emergência. Memorize o tempo aproximado em segundos para cada uma.',
      'Em corrida de fuga, mude direção a cada 8 a 12 segundos. Mantenha velocidade alta nos primeiros 60 segundos, depois ritmo sustentado para conservar energia.',
      'Direção da fuga: sempre contra a mão do agressor (se destro, fuja para a esquerda dele). O ângulo cego dificulta perseguição e confunde mira de arma.',
      'Use ambiente: derrube objetos atrás de você (lixeira, cadeira, banca de rua), atravesse contra o fluxo de pessoas, entre em estabelecimento comercial movimentado.',
      'Verbalize alto durante a fuga: "Socorro, me ajuda, me ajuda." Voz aguda quebra inércia de testemunhas, ativa câmeras de celular ao redor.',
      'Após zona segura, ligue 190 imediatamente. Memorize características: altura aproximada, cor de roupa, direção da fuga do agressor, descrição de arma.',
    ],
    falhas: 'Fugir para áreas isoladas (becos, escadarias vazias), parar para pegar objeto pessoal caído (celular, mochila), atender ligação durante a fuga.',
    icon: Wind,
  },
  {
    num: '06',
    nome: 'Defesa para Mulheres',
    contexto: 'A maioria dos ataques contra mulheres no Brasil ocorre em zona de agarre (puxão de cabelo, abraço por trás, imobilização contra parede) por agressor 30 a 70% mais pesado. Técnicas convencionais de soco perdem eficácia. A defesa feminina prioriza alvos neurológicos, alavancas articulares e gritos taticamente direcionados.',
    passos: [
      'Agarre por trás (abraço de urso): pisada violenta no peito do pé, cabeçada para trás contra nariz, cotovelo retroativo no plexo solar, escape lateral em rotação de quadril.',
      'Puxão de cabelo: prenda a mão do agressor contra seu próprio crânio com as duas mãos, gire o corpo 180 graus em direção ao agressor invertendo a alavanca do cotovelo dele.',
      'Imobilização contra parede pelas duas mãos: joelhada ascendente na virilha (independe de força), seguida de cabeçada no nariz, escape lateral em 90 graus.',
      'Defesa contra estrangulamento frontal: mãos no rosto do agressor, polegares pressionando os olhos, joelhada simultânea na virilha. Estrangulamento perde força em 2 a 4 segundos.',
      'Verbalização tática: nunca grite "Socorro" (testemunhas hesitam). Grite "Fogo, fogo, fogo." Estudo de comportamento social mostra resposta de testemunhas 4x mais rápida.',
      'Treinamento mensal recomendado: Krav Maga feminino, Defesa Pessoal Brasileira (DPB), aulas específicas de mulheres em academias com instrutoras certificadas.',
    ],
    falhas: 'Tentar negociar verbalmente com agressor em fase de violência ativa, recuo passivo (agressor interpreta como submissão e escala), confiar em spray de pimenta sem treinamento prévio (vento contra, distância errada, ativação tardia).',
    icon: UserCheck,
  },
  {
    num: '07',
    nome: 'Contexto Urbano Brasileiro',
    contexto: 'O cenário brasileiro impõe ameaças específicas: motoboy armado em semáforo, abordagem em saída de banco, sequestro relâmpago, arrastão em transporte público, ataque em portaria de prédio. Cada contexto tem padrão de comportamento mapeável e contramedida testada por especialistas em segurança privada.',
    passos: [
      'Semáforo em zona de risco: deixe distância de 2 metros do veículo da frente, marcha engatada, olhos nos retrovisores. Em abordagem, acelere se houver brecha, nunca pare para entregar bens em movimento.',
      'Saída de banco ou caixa eletrônico: observe ambiente por 15 segundos antes de sair. Identifique veículos parados com motor ligado, pessoas em pé sem propósito aparente, motos com 2 ocupantes.',
      'Sequestro relâmpago: nunca resista no momento da abordagem. Memorize voz, sotaque, rota aproximada, paradas. Em parada para uso de cartão, gere atrito tático lento (digitar errado, fingir bloqueio, ganhar tempo).',
      'Transporte público em arrastão: posicione-se próximo às portas em horários de risco, mantenha celular em bolso interno, mochila à frente do corpo, evite uso de fones.',
      'Portaria de prédio: ao chegar de carro, observe o portão por 20 segundos antes de acionar o controle. Em abordagem na entrada, acelere para dentro do prédio, nunca pare de motor.',
      'Aplicativos de transporte: confira placa, modelo, foto do motorista antes de entrar. Compartilhe trajeto em tempo real com 2 contatos. Em desvio de rota, peça parada em local movimentado.',
    ],
    falhas: 'Uso de celular em semáforo (sinaliza distração para olheiros), sacar dinheiro à noite em região isolada, aceitar carona oferecida na rua, divulgar rotina em redes sociais.',
    icon: Eye,
  },
  {
    num: '08',
    nome: 'Mentalidade e Adrenalina',
    contexto: 'Em 80% dos ataques, a vítima congela por 3 a 8 segundos antes de reagir. Esse intervalo decide o desfecho. Treinamento mental sob estresse simulado reduz a janela de congelamento para abaixo de 1 segundo. A adrenalina aumenta força em 30%, reduz percepção de dor em 50%, mas anula coordenação fina e visão periférica.',
    passos: [
      'Treine respiração tática 4-4-4-4: inspire em 4 segundos, segure em 4, expire em 4, segure em 4. Pratique 5 minutos diários. Em situação real, reduz frequência cardíaca de 180 para 120 BPM em 15 segundos.',
      'Visualização mental diária: dedique 5 minutos antes de dormir simulando 3 cenários de ameaça (abordagem em rua, invasão domiciliar, agressão em ambiente fechado) e suas respostas táticas.',
      'Gatilho verbal de ativação: estabeleça uma palavra interna de comando ("Agora", "Move", "Ataca"). Em situação real, repetir mentalmente cancela paralisia cognitiva.',
      'Treinamento sob estresse: pratique técnicas após 30 segundos de polichinelos ou agachamentos. Simula adrenalina e ensina o corpo a responder sob fadiga.',
      'Aceitação prévia da violência: visualize antecipadamente que pode levar golpes, sangrar, ser machucado. A surpresa do primeiro impacto físico é o principal gatilho de paralisia.',
      'Pós-evento: independente do desfecho, busque acompanhamento psicológico nas primeiras 72 horas. Trauma agudo não tratado se cristaliza em TEPT em 4 a 6 semanas.',
    ],
    falhas: 'Subestimar agressor por aparência (idade, porte, gênero), fantasiar respostas heroicas sem treinamento, ignorar sinais de medo legítimos do próprio corpo (sinal evolutivo de detecção de ameaça).',
    icon: Hand,
  },
];

const ERROS_FATAIS = [
  { titulo: 'Encarar o agressor', detalhe: 'Olho no olho dispara escalada de violência testosterônica. Olhe sempre para o torso, leitura tática mais precisa.' },
  { titulo: 'Sacar arma sem treino', detalhe: 'Saque mal executado entrega arma para o agressor. Treinamento mínimo de 200 horas em estande qualifica porte responsável.' },
  { titulo: 'Filmar com celular', detalhe: 'Celular em mão durante abordagem é alvo prioritário. Memorize, não documente em tempo real. Fuga é prioridade absoluta.' },
  { titulo: 'Resistir por R$ 50', detalhe: 'A vida custa muito mais que o relógio, celular ou dinheiro. Bens são repostos, traumas físicos e psicológicos são vitalícios.' },
  { titulo: 'Subestimar mulher agressora', detalhe: 'Mulher armada (faca, arma de fogo) é tão ou mais letal que homem desarmado. Nunca avalie ameaça por gênero ou aparência.' },
  { titulo: 'Ignorar treinamento contínuo', detalhe: 'Defesa pessoal sem prática semanal degrada em 60 dias. Mínimo 2 sessões semanais de 40 minutos para manutenção neuromuscular.' },
];

const CHECKLIST = [
  'Mês 01 — Treine postura de combate, base e guarda alta diariamente por 10 minutos',
  'Mês 02 — Inicie aulas regulares de Krav Maga, Boxe ou DPB (mínimo 2x por semana)',
  'Mês 03 — Pratique respiração tática 4-4-4-4 diariamente, 5 minutos manhã e noite',
  'Mês 04 — Mapeie 3 rotas de fuga em todos os ambientes que frequenta semanalmente',
  'Mês 05 — Simule mentalmente 5 cenários de ameaça com respostas táticas detalhadas',
  'Mês 06 — Treine alvos anatômicos em saco de pancada ou parceiro com equipamento',
  'Mês 07 — Pratique defesa contra faca de borracha com instrutor certificado',
  'Mês 08 — Avalie aquisição legal de arma de fogo (se aplicável) e inicie 200h de treino',
  'Mês 09 — Curso de primeiros socorros táticos (TCCC ou similar) para pós-confronto',
  'Mês 10 — Treine fuga sob fadiga: corrida em zigue-zague após 50 polichinelos',
  'Mês 11 — Ensine fundamentos de defesa para cônjuge, filhos maiores de 12, pais idosos',
  'Mês 12 — Avaliação anual: spar controlado, teste de cardio, reforço de pontos fracos',
];

const FAQ = [
  {
    q: 'Vale a pena ter arma de fogo em casa para defesa?',
    a: 'Depende de treinamento, perfil familiar e contexto regional. Arma sem treino é risco maior que ausência de arma. Estatisticamente, 30% dos disparos defensivos no Brasil ocorrem por familiares (acidentes ou conflitos domésticos). Se optar por arma, exige porte legal, cofre biométrico, treinamento mínimo de 200 horas em estande qualificado e renovação anual de prática. Spray de pimenta, taser civil e bastão extensível são alternativas legais com curva de aprendizado menor.',
  },
  {
    q: 'Qual arte marcial mais eficaz para defesa pessoal real?',
    a: 'Para rua brasileira: Krav Maga (foco em ameaças armadas e múltiplos agressores), Boxe (gestão de distância e absorção de golpes), Muay Thai (clinch e joelhadas em zona próxima), Jiu-Jitsu (controle no solo, onde 70% das brigas terminam). Combinação ideal: Boxe ou Muay Thai em pé + Jiu-Jitsu no solo + Krav Maga para ameaças armadas. Evite estilos puramente competitivos (Boxe Olímpico clássico, Karatê de pontuação) que não treinam alvos vulneráveis ou agressões surpresa.',
  },
  {
    q: 'Como defender filhos pequenos durante uma abordagem?',
    a: 'Posicione a criança atrás do corpo, em ângulo de 45 graus do agressor. Mantenha mão dominante livre para resposta, mão fraca segurando firme a criança. Verbalize calma para o agressor: "Tenho criança comigo, vou cooperar." Entregue bens sem hesitação. Em ameaça à criança, a janela de tolerância acaba: alvos olho, garganta, virilha são prioritários e legítimos. Ensine a criança maior de 6 anos uma palavra-código que significa "corra para o adulto mais próximo e peça ajuda".',
  },
  {
    q: 'O que fazer após uma agressão? Devo registrar boletim?',
    a: 'Sim, sempre. Boletim de Ocorrência (BO) cria registro oficial, libera apoio jurídico, valida licenças médicas e abre caminho para indenização. Procure delegacia mais próxima nas primeiras 24 horas com testemunhas, fotos de lesões, descrição do agressor, rota aproximada de fuga. Solicite cópia do BO. Para casos graves, contrate advogado criminalista nas primeiras 48 horas. Mulheres podem acionar Lei Maria da Penha em delegacia especializada (DEAM) ou pelo 180.',
  },
  {
    q: 'Spray de pimenta é legal no Brasil?',
    a: 'Spray de pimenta civil (concentração até 1% de capsaicina) é legal para porte e uso defensivo no Brasil, sem necessidade de registro. Modelos militares (acima de 5%) exigem autorização do Exército. Eficácia depende de treinamento: distância ideal de 1,5 a 3 metros, jato direto nos olhos do agressor, contra o vento. Carregue em local de acesso rápido (não no fundo da bolsa), teste validade a cada 6 meses (o gás perde pressão), e pratique saque cego em ambiente seguro.',
  },
  {
    q: 'É verdade que reagir piora o assalto?',
    a: 'Estatisticamente sim, em 70% dos casos de assalto a patrimônio. Reação aumenta probabilidade de violência grave em 4x quando há arma de fogo envolvida. Porém, em situação de tentativa de sequestro, estupro ou ameaça à vida (não apenas patrimônio), a reação é justificada e legalmente amparada. Regra: bens entregar, vida defender. A leitura correta da intenção do agressor (apenas patrimônio vs ameaça à integridade) é a habilidade mais crítica e exige treinamento mental contínuo.',
  },
  {
    q: 'Como treinar defesa pessoal em casa sem academia?',
    a: 'Treinamento doméstico básico: 10 minutos diários de postura e guarda em frente ao espelho, 50 socos por mão em saco de pancada (ou em almofada presa em parede), 30 chutes baixos de cada perna, 20 joelhadas no ar, 5 minutos de respiração tática. Vídeos qualificados em canais como Krav Maga Global, Tony Blauer SPEAR, ICEBA. Limitação real: ausência de parceiro impede treino de gestão de distância e absorção de golpes, o que exige academia presencial em algum momento.',
  },
  {
    q: 'Defesa pessoal serve para idosos acima de 60 anos?',
    a: 'Sim, com adaptações. Foco em consciência ambiental (evitar zonas de risco), mobilidade adaptada (treino de equilíbrio com bastão), uso de objetos cotidianos (bengala, chaveiro tático, lanterna de alta potência como ofuscante), gestão verbal (vocalização firme afasta 60% dos agressores oportunistas), redes de apoio (códigos com vizinhos, aplicativos de pânico). Aulas específicas de defesa para terceira idade existem em escolas como SESC e prefeituras municipais com instrutores certificados em adaptação biomecânica.',
  },
];

const DefesaPessoal = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SeoHead
        path="/soberania-organica/defesa-pessoal"
        custom={{
          title: 'Defesa Pessoal Básica: Postura, Distância, Alvos e Fuga Tática no Brasil',
          description: 'Manual completo de defesa pessoal para o cenário brasileiro: postura de combate, gestão de distância, alvos anatômicos decisivos, defesa contra agressor armado, fuga tática, defesa feminina e contexto urbano.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/defesa-pessoal',
          primaryKeyword: 'defesa pessoal básica',
          lsiKeywords: ['postura de combate', 'alvos anatômicos', 'defesa contra faca', 'defesa contra arma de fogo', 'fuga tática', 'defesa feminina', 'krav maga brasileiro'],
          longTailKeywords: ['como se defender em assalto no Brasil', 'defesa pessoal para mulheres', 'o que fazer em sequestro relâmpago', 'defesa contra agressor armado em rua', 'treinamento de defesa pessoal em casa'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Defesa Pessoal Básica', url: '/soberania-organica/defesa-pessoal' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/edc', '/soberania-organica/primeiros-socorros-taticos', '/soberania-organica/kit-72h', '/soberania-organica/protocolo-fogo'],
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
          icon={ShieldAlert}
          phase="Soberania Orgânica · Resiliência Tática"
          title={
            <>
              Defesa Pessoal Básica:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">não existe luta justa em rua, existe técnica, distância e fuga</span>
            </>
          }
          subtitle="O Brasil registra mais de 50 mil mortes violentas por ano. 80% dos confrontos urbanos terminam em segundos. A diferença entre quem volta para casa e quem fica no asfalto não é força ou tamanho, é leitura ambiental, treinamento mental e domínio de 7 alvos anatômicos."
        />

        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 01 · Princípio operacional</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-8 text-foreground">A defesa começa antes do golpe</h2>
              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                <p>O Brasil registra mais de 50 mil mortes violentas por ano. A maioria das vítimas tem entre 15 e 49 anos, e 80% dos confrontos urbanos terminam em segundos, antes que a vítima reaja. A diferença entre quem volta para casa e quem fica no asfalto não é força ou tamanho, é leitura ambiental, treinamento mental e domínio de 7 alvos anatômicos.</p>
                <p>Este manual não substitui treinamento presencial com instrutor qualificado. Ele estabelece fundamentos, vocabulário tático e arquitetura mental para que o leitor inicie a jornada com base sólida. Sobreviver não é heroísmo, é planejamento executado sob pressão.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 02 · Pilares operacionais</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">8 fundamentos da defesa real</h2>
              <p className="text-lg text-foreground/70 font-light">Cada pilar com sequência operacional, falhas críticas e contexto biomecânico. Estude um por semana, treine diariamente.</p>
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
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 03 · Defesa feminina</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">Quando a força é assimétrica, a técnica decide</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>A maioria das agressões contra mulheres no Brasil ocorre por agressor 30 a 70% mais pesado, em zona de agarre. Técnicas convencionais de soco perdem eficácia. A resposta tática feminina prioriza alavancas articulares, alvos neurológicos e gritos taticamente direcionados.</p>
                <p>Pesquisa de comportamento social mostra que gritos de "Fogo, fogo, fogo" geram resposta de testemunhas 4 vezes mais rápida que "Socorro". O cérebro humano interpreta fogo como ameaça compartilhada, socorro como problema alheio.</p>
                <p>Treinamento mensal recomendado: Krav Maga feminino, Defesa Pessoal Brasileira (DPB), aulas em academias com instrutoras certificadas em biomecânica feminina.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="relative">
              <img
                src={imgMulher}
                alt="Mulher praticando técnica de defesa pessoal em rua urbana brasileira"
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
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 04 · Brasil urbano</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">O cenário brasileiro tem padrões mapeáveis</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Motoboy armado em semáforo, abordagem na saída de banco, sequestro relâmpago, arrastão em transporte público, ataque em portaria de prédio. Cada contexto tem comportamento previsível e contramedida testada por especialistas em segurança privada brasileira.</p>
                <p>O olheiro identifica vítima ideal em 4 a 7 segundos. Critérios usados: distração visual (celular na mão), postura submissa (ombros caídos, olhar baixo), ambiente isolado, ausência de consciência espacial. A primeira camada de defesa é parecer alvo difícil.</p>
                <p>Mude rotinas a cada 30 dias. Use rotas alternativas, horários variáveis, veículos diferentes quando possível. Padrão repetitivo é mapa para criminoso paciente.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:order-1 relative">
              <img
                src={imgUrbano}
                alt="Cenário urbano brasileiro noturno com motociclista, contexto de risco em semáforo"
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
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">6 falhas que matam mais que o agressor</h2>
              <p className="text-lg text-foreground/70 font-light">Padrões observados em laudos periciais e relatos de sobreviventes. Conhecer evita repetir.</p>
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
              <p className="text-lg text-foreground/70 font-light">Sem pressa, sem ego. Defesa pessoal real é construída em ciclos de 12 a 36 meses, com manutenção vitalícia.</p>
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
              <h2 className="text-4xl md:text-6xl font-display tracking-tight text-foreground">Dúvidas que decidem vidas</h2>
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
              <h2 className="text-3xl md:text-5xl font-display tracking-tight text-foreground mb-10">A defesa do corpo é apenas uma camada</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link to="/soberania-organica/edc" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">EDC Tático</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">O que carregar todo dia <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/primeiros-socorros-taticos" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Pós-confronto</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Primeiros socorros táticos <ArrowRight className="w-4 h-4" /></p>
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

export default DefesaPessoal;