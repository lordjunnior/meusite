import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { Newspaper } from 'lucide-react';
import { Moon } from 'lucide-react';
import { Activity } from 'lucide-react';
import { Wind } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { HeartPulse } from 'lucide-react';
import { Sun } from 'lucide-react';
import { Users } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/higiene-mental-hero.webp';
import imgSono from '@/assets/saida/higiene-mental-sono.webp';
import imgDiario from '@/assets/saida/higiene-mental-diario.webp';

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
  icon: typeof Brain;
}

const PILARES: Pilar[] = [
  {
    num: '01',
    nome: 'Detox de Notícias',
    contexto: 'O cérebro humano não foi desenhado para processar 6 mil estímulos negativos diários vindos de portais, redes sociais e grupos de WhatsApp. Estudo da APA (American Psychological Association) confirma que consumo contínuo de notícias eleva cortisol em até 47%, gera ansiedade generalizada em 68% dos consumidores compulsivos e reduz capacidade de foco profundo em 31% após 90 dias. Detox de notícias não é alienação, é seleção crítica de inputs cognitivos.',
    passos: [
      'Bloqueio absoluto de portais nas primeiras 2 horas após acordar e nas últimas 2 horas antes de dormir. Esses períodos definem o tom emocional de toda a jornada cognitiva diária.',
      'Desinstale aplicativos de notícias do celular. Mantenha acesso somente via navegador desktop, no escritório, em janela de tempo definida (15 a 30 minutos no fim do dia).',
      'Saia de todos os grupos de WhatsApp dedicados a política, economia em colapso e tragédias. Mantenha apenas grupos operacionais (família, trabalho, vizinhança).',
      'Use leitor RSS próprio (Feedly, Inoreader) com 5 a 10 fontes curadas e técnicas. Evite manchetes de portal, vá direto para fontes primárias (Banco Central, IBGE, papers acadêmicos).',
      'Defina jejum de notícias semanal: 24 horas sem nenhum input externo, idealmente domingo. Reconecte com livros físicos, caminhada, conversa presencial.',
      'Estabeleça rituais de saída: ao consumir notícia que gere ansiedade, execute respiração 4-7-8 (inspire 4, segure 7, expire 8) por 3 ciclos. Quebra o estado emocional reativo.',
    ],
    falhas: 'Acordar e abrir Instagram (sequestro de dopamina e cortisol simultâneos), notificações push de portais ativadas, dormir com celular na cabeceira (luz azul + tentação de scroll), usar notícia como entretenimento em filas e transporte (ocupa o vácuo necessário ao cérebro).',
    icon: Newspaper,
  },
  {
    num: '02',
    nome: 'Sono Profundo',
    contexto: 'Sono é a infraestrutura biológica de todo desempenho cognitivo, emocional e imunológico. 7 a 9 horas de sono profundo diário (com mínimo 90 minutos de fase REM) consolidam memória, regulam cortisol, reparam tecidos e processam trauma diário. Privação crônica abaixo de 6 horas eleva risco cardiovascular em 48%, diabetes tipo 2 em 30%, depressão em 4 vezes. O sono brasileiro médio em 2024 é de 6h12, segundo Fundação Oswaldo Cruz.',
    passos: [
      'Quarto absolutamente escuro: blackout em janelas, eliminação de LEDs de aparelhos (TV, ar-condicionado, despertador digital). Lúmen residual abaixo de 1 lux preserva produção de melatonina natural.',
      'Temperatura entre 18 e 20 graus Celsius. Cérebro só entra em fase profunda quando temperatura corporal cai 1 a 2 graus. Quartos quentes acima de 24 graus comprometem fase REM.',
      'Eliminação total de telas 90 minutos antes de dormir. Luz azul (415-455 nm) bloqueia produção de melatonina por 2 a 4 horas. Use óculos blueblock se houver inevitável uso noturno.',
      'Última refeição mínimo 3 horas antes do sono. Digestão ativa eleva temperatura corporal e bloqueia entrada em fase profunda. Jejum noturno facilita autofagia cerebral durante o sono.',
      'Horário fixo de dormir e acordar, inclusive fim de semana. Variação de mais de 60 minutos no ciclo desregula ritmo circadiano, gerando jet lag social em segunda-feira.',
      'Suplementação tática (com orientação médica): magnésio bisglicinato 300-400 mg, glicina 3 g, melatonina 0,3 mg em casos de jet lag ou trabalho noturno. Nunca como muleta crônica.',
    ],
    falhas: 'Cafeína após 14 horas (vida média de 6 horas, presente no organismo até 2 da manhã), exercício físico intenso após 20 horas (eleva cortisol por 4 horas), álcool antes de dormir (bloqueia fase REM apesar da sensação de sonolência), dormir com celular na cabeceira.',
    icon: Moon,
  },
  {
    num: '03',
    nome: 'Dieta Dopaminérgica',
    contexto: 'Dopamina é o neurotransmissor central da motivação, foco e prazer. O cérebro moderno é hijackeado por estímulos artificialmente potentes: scroll infinito, jogos, pornografia, açúcar, redes sociais. Cada exposição libera picos de dopamina seguidos de vales de baixa, gerando anedonia (incapacidade de sentir prazer com estímulos naturais). Dieta dopaminérgica reset o sistema em 14 a 30 dias, restaurando capacidade de foco e prazer real.',
    passos: [
      'Identifique seus 3 disparadores principais (scroll Instagram, doce, jogos, pornografia, séries em maratona, fofoca). Honestidade radical é pré-requisito para qualquer reset.',
      'Eliminação total dos disparadores por 14 dias consecutivos. Não redução, eliminação. O cérebro precisa de janela mínima de 14 dias para regular receptores D2 dopaminérgicos.',
      'Substituição por estímulos naturais lentos: leitura de livro físico, caminhada na natureza, conversa profunda presencial, exercício moderado, prática de instrumento musical, jardinagem.',
      'Banhos frios diários de 2 a 5 minutos (água abaixo de 15 graus). Estudo da Universidade de Praga confirma elevação sustentada de dopamina em 250% por até 4 horas após exposição.',
      'Jejum dopaminérgico semanal: 24 horas sem qualquer estímulo digital, açúcar refinado, conversas socialmente exigentes. Idealmente em ambiente natural (sítio, praia isolada, trilha).',
      'Reintrodução gradual após 14 dias, com regras claras: redes sociais máximo 30 minutos diários em janela única, doces apenas em refeição principal, séries no máximo 1 episódio por dia.',
    ],
    falhas: 'Achar que pode "controlar com força de vontade" sem eliminar gatilho ambiental (pornografia salva no celular, doce dentro do armário, app de jogo no início da tela), reset incompleto de 3 dias (insuficiente para regulação real), substituição por outro vício (trocar Instagram por TikTok).',
    icon: Activity,
  },
  {
    num: '04',
    nome: 'Meditação Tática',
    contexto: 'Meditação não é misticismo nem relaxamento passivo. É treinamento neurocientífico documentado em mais de 6 mil papers que reorganiza o córtex pré-frontal, reduz volume da amígdala (centro do medo) e fortalece a ínsula (autoconsciência corporal). 12 minutos diários durante 8 semanas geram alterações estruturais visíveis em ressonância magnética. Para quem opera sob pressão constante (empreendedores, militares, médicos), meditação é arma cognitiva de primeira linha.',
    passos: [
      'Inicie com sessões de 5 minutos diários, sempre no mesmo horário (preferencialmente após acordar e antes do café). Consistência supera duração nos primeiros 30 dias.',
      'Postura: sentado em cadeira firme, coluna ereta sem rigidez, pés apoiados no chão, mãos sobre as coxas, olhos fechados ou semi-cerrados em ponto fixo no chão à 1,5 m.',
      'Foco em respiração natural, sem controlar ritmo. Conte mentalmente cada expiração de 1 a 10. Ao perder a contagem (vai perder), retorne ao 1 sem julgamento. Esse retorno é o treino real.',
      'Aumente progressivamente: semana 2 vá para 8 minutos, semana 4 para 12, semana 8 para 20. Não tente longas sessões iniciais que sabotam consistência.',
      'Use aplicativos guiados nos primeiros 60 dias: Insight Timer (gratuito, sem agenda comercial), Waking Up de Sam Harris (denso, técnico), 10% Happier de Dan Harris.',
      'Após 90 dias, integre meditação em movimento: caminhada consciente, respiração tática durante exercício, pausas de 60 segundos a cada 90 minutos de trabalho focado.',
    ],
    falhas: 'Esperar resultados em 7 dias (mudança neuroestrutural exige 8 semanas mínimo), abandonar nos primeiros 14 dias por considerar "improdutivo" (efeito real começa em silêncio), tentar 30 minutos no primeiro dia (sabotagem de consistência), praticar antes de dormir (efeito ativador, pode atrapalhar sono).',
    icon: Wind,
  },
  {
    num: '05',
    nome: 'Jornal de Gratidão',
    contexto: 'Jornal de gratidão é a intervenção comportamental mais barata e mais bem documentada da psicologia positiva. Estudos do Greater Good Science Center (UC Berkeley) mostram que 21 dias de prática diária reduzem sintomas depressivos em 35%, aumentam qualidade do sono em 25% e fortalecem relações em 19%. O mecanismo neurológico é o reposicionamento ativo da atenção do córtex pré-frontal sobre eventos positivos negligenciados pelo viés de negatividade.',
    passos: [
      'Use caderno físico, sempre o mesmo, idealmente com couro ou capa que dure anos. Caderno digital reduz eficácia em 40%, segundo pesquisa de Mueller e Oppenheimer (Princeton, 2014).',
      'Sempre na mesma hora, idealmente noturna (20 minutos antes de dormir). Prepara o cérebro para entrada em sono profundo com estado emocional positivo.',
      'Liste 3 a 5 eventos específicos do dia (não generalidades). "Conversa de 20 minutos com meu pai sobre infância dele" supera "minha família".',
      'Para cada item, escreva o porquê em 1 a 2 frases. O porquê ativa engajamento emocional real, sem ele a prática vira automatismo morto.',
      'Inclua gratidão por dificuldades superadas no dia (reframing tático). "Grato pelo trânsito de 1h porque consegui ouvir audiobook que adiei por meses".',
      'Releia entradas antigas em 90, 180 e 365 dias. A perspectiva temporal revela padrões e demonstra evolução pessoal invisível no dia a dia.',
    ],
    falhas: 'Listas genéricas e vazias ("família, saúde, trabalho"), prática em aplicativo (sem o impacto motor do escrever à mão), pular 3 dias seguidos (quebra a continuidade neuroquímica), tornar obrigação mecânica sem engajamento emocional.',
    icon: BookOpen,
  },
  {
    num: '06',
    nome: 'Protocolo Anti-Ansiedade',
    contexto: 'Ansiedade é o mecanismo evolutivo de antecipação de ameaça desregulado pela vida moderna. Em pequenas doses melhora desempenho. Em doses crônicas degrada cognição, sistema imune e qualidade de vida. 26% dos brasileiros adultos vivem com ansiedade clínica diagnosticada, segundo OMS 2023. Protocolo anti-ansiedade combina intervenções fisiológicas imediatas e cognitivas estruturais. Quando crise aguda chega, técnica treinada fria salva.',
    passos: [
      'Respiração diafragmática 4-7-8 em crise aguda: inspire pelo nariz 4 segundos, segure 7 segundos, expire pela boca em 8 segundos. Faça 4 ciclos. Reduz frequência cardíaca em 20 bpm.',
      'Técnica 5-4-3-2-1 para ataques de pânico: identifique 5 coisas que você vê, 4 que toca, 3 que ouve, 2 que cheira, 1 que prova. Reancora cérebro no momento presente.',
      'Imersão facial em água fria por 30 segundos (mergulho de cara em bacia com água gelada). Ativa reflexo de mergulho, reduz frequência cardíaca em 25% imediatamente.',
      'Exercício aeróbico moderado 30 a 45 minutos diários (corrida leve, caminhada rápida, ciclismo). Reduz sintomas ansiosos em 40% em 4 semanas, com efeito comparável a sertralina.',
      'Restrição absoluta de cafeína em ansiosos: 90% dos quadros ansiosos têm melhora significativa com eliminação completa de cafeína por 30 dias. Substitua por água com limão ou chá de camomila.',
      'Acompanhamento profissional em quadros persistentes: terapia cognitivo-comportamental (TCC) tem eficácia documentada em 75% dos casos. Em quadros moderados a graves, avaliação psiquiátrica é obrigatória.',
    ],
    falhas: 'Tratar ansiedade com álcool ou cannabis (gera dependência e piora quadro em médio prazo), evitar situações ansiogênicas (reforça circuito de medo), automedicação com benzodiazepínicos sem prescrição (alta dependência em 14 a 21 dias), buscar terapia apenas em crise extrema.',
    icon: HeartPulse,
  },
  {
    num: '07',
    nome: 'Exposição Solar e Ritmo Circadiano',
    contexto: 'Luz solar matinal é o regulador mais potente do ritmo circadiano humano. 10 a 30 minutos de exposição direta (sem óculos escuros, sem janela) nas primeiras 2 horas após acordar sincroniza produção de cortisol matutino e melatonina noturna. Brasileiros urbanos passam 90% do tempo em ambientes fechados, gerando epidemia silenciosa de desregulação circadiana, depressão sazonal e sono fragmentado.',
    passos: [
      'Exposição solar direta de 10 a 30 minutos pela manhã, idealmente entre 6h30 e 9h. Pele exposta (rosto, antebraços), sem filtro solar nesse período curto.',
      'Caminhada matinal de 20 minutos no bairro, parque ou varanda. Combina luz solar, movimento e ar livre, três sinalizadores circadianos potentes.',
      'Trabalhe próximo de janela durante o dia. Ambientes internos com 200 lux são equivalentes a noite avançada para o cérebro humano (luz solar de meio-dia entrega 100.000 lux).',
      'Reduza luz artificial após o pôr do sol. Use lâmpadas warm white 2700K, evite teto branco frio. Após 21h, lâmpadas vermelhas (650 nm) preservam produção de melatonina.',
      'Defina hora limite de TV e celular: idealmente 90 minutos antes de dormir. Em uso inevitável, configure modo noturno automático (Night Shift no iOS, modo escuro no Android).',
      'Suplementação de vitamina D em quadros confirmados por exame: dosagem orientada por médico, geralmente 2000 a 5000 UI diárias. Brasileiros urbanos têm deficiência em 60% dos casos.',
    ],
    falhas: 'Acordar no escuro e abrir tela de celular como primeira luz do dia (inverte ritmo circadiano), passar dia inteiro em escritório sem janela, exposição solar apenas em horário de almoço (já tarde para regulação circadiana), uso de óculos escuros no início da manhã (bloqueia sinal circadiano).',
    icon: Sun,
  },
  {
    num: '08',
    nome: 'Conexão Humana Real',
    contexto: 'Solidão crônica eleva risco de mortalidade equivalente ao tabagismo de 15 cigarros diários, segundo metanálise de Holt-Lunstad (2015) com 308 mil participantes. Conexão humana real, presencial e profunda, é necessidade fisiológica do mesmo nível que sono e alimentação. Substitutos digitais (redes sociais, mensagens) ativam apenas 12% das vias neurais ativadas em conversa presencial, gerando paradoxo da hiperconectividade isolada.',
    passos: [
      'Estabeleça 3 a 5 relações profundas mantidas com encontro presencial mínimo mensal. Quantidade nunca substitui profundidade. Vínculos reais exigem tempo investido, não apenas curtidas.',
      'Refeições compartilhadas em família ou amigos pelo menos 4 vezes por semana, sem celulares na mesa. Conversa profunda exige 90 minutos mínimos de presença total.',
      'Voluntariado regular (mensal ou quinzenal): comprovadamente reduz depressão em 23%, aumenta senso de propósito em 41%. Comunidades religiosas, ONGs, projetos sociais.',
      'Conversa profunda semanal com pessoa de confiança: 60 a 90 minutos sobre temas significativos (medos, ambições, dificuldades). Não fofoca, não trabalho, não política.',
      'Limitação tática de redes sociais: 30 minutos diários máximo, em janela única. Substitua scroll por mensagens privadas profundas para 1 ou 2 pessoas relevantes.',
      'Conexão intergeracional: relações com pessoas 20 anos mais velhas e 20 anos mais novas. Perspectiva temporal reduz ansiedade existencial e depressão circunstancial.',
    ],
    falhas: 'Substituir conexão presencial por chamada de vídeo (entrega 60% do efeito), grupos de WhatsApp como única forma de socialização, manutenção de relações tóxicas por inércia (custo emocional alto, retorno zero), isolamento prolongado por trabalho remoto sem compensação social.',
    icon: Users,
  },
];

const ERROS_FATAIS = [
  { titulo: 'Acordar com celular na mão', detalhe: 'Sequestro de dopamina e cortisol simultâneos. As primeiras 90 minutos definem o estado neuroquímico de todo o dia. Substitua por luz solar, água e silêncio.' },
  { titulo: 'Dormir com TV ligada', detalhe: 'Luz azul e ruído fragmentam fases REM mesmo com olhos fechados. Sono parece longo, mas qualidade é equivalente a 4 horas de sono profundo real.' },
  { titulo: 'Café puro com estômago vazio', detalhe: 'Pico de cortisol matinal artificial seguido de vale energético em 3 horas. Resultado: ansiedade contínua e fome compulsiva por carboidrato refinado.' },
  { titulo: 'Maratonar série em busca de relaxamento', detalhe: 'Estímulo dopaminérgico passivo gera fadiga cognitiva acumulada. Sensação de cansaço mental aumenta, não diminui. Leitura ou caminhada entregam relaxamento real.' },
  { titulo: 'Compensar ansiedade com álcool', detalhe: 'Bloqueio de fase REM por 4 a 6 horas após consumo. Sono parece profundo, mas restauração cognitiva é nula. Ansiedade rebote 12 horas depois é pior que original.' },
  { titulo: 'Adiar terapia até crise aguda', detalhe: 'Saúde mental é manutenção preventiva, não cirurgia de emergência. Acompanhamento profissional regular previne 80% dos quadros que se cristalizam em crise.' },
];

const CHECKLIST = [
  'Mês 01 — Estabeleça rotina matinal sem celular nas primeiras 60 minutos, com luz solar direta e água',
  'Mês 02 — Implemente blackout no quarto, elimine LEDs e ajuste temperatura entre 18 e 20 graus para sono profundo',
  'Mês 03 — Inicie meditação diária de 5 minutos com aplicativo guiado, sempre no mesmo horário',
  'Mês 04 — Comece jornal de gratidão físico, 3 itens específicos por noite com porquê emocional',
  'Mês 05 — Execute primeiro reset dopaminérgico de 14 dias, eliminando 3 disparadores principais identificados',
  'Mês 06 — Inicie banhos frios de 2 a 5 minutos diários, alternando manhã e fim do dia',
  'Mês 07 — Configure detox de notícias completo: bloqueio total nas 2h matinais e 2h noturnas, sem grupos políticos',
  'Mês 08 — Estabeleça 3 a 5 conexões humanas profundas com encontro presencial mensal mínimo',
  'Mês 09 — Inicie exercício aeróbico moderado 30 a 45 minutos diários, 5 vezes por semana',
  'Mês 10 — Implemente jejum dopaminérgico semanal de 24 horas, idealmente domingo em ambiente natural',
  'Mês 11 — Avalie início de terapia cognitivo-comportamental para consolidação estrutural dos hábitos',
  'Mês 12 — Auditoria anual: revise sono, ansiedade, conexões, ajuste protocolo para próximo ciclo de 12 meses',
];

const FAQ = [
  {
    q: 'Quanto tempo até notar mudanças reais com essas práticas?',
    a: 'Mudanças subjetivas (sensação de calma, energia matinal, melhor sono) aparecem em 7 a 14 dias com adesão consistente. Mudanças estruturais cerebrais (alteração de massa cinzenta no córtex pré-frontal e amígdala) exigem 8 semanas mínimo, comprovadas em ressonância magnética. Mudanças comportamentais profundas (eliminação real de gatilhos ansiosos, restauração da capacidade de foco profundo) consolidam-se entre 90 e 180 dias. A regra: subestime impacto em 30 dias, superestime em 12 meses.',
  },
  {
    q: 'Banho frio é seguro para todo mundo?',
    a: 'Não. Banho frio (água abaixo de 15 graus) é contraindicado para hipertensos não controlados, cardiopatas, gestantes, pessoas com Raynaud severo, idosos acima de 75 anos sem orientação médica. Para a maioria adulta saudável, é seguro e benéfico, mas exige progressão: comece com 30 segundos no fim do banho morno, progrida para 1 minuto na semana 2, 3 minutos na semana 4. Nunca mergulho súbito em água gelada sem adaptação. Se sentir tontura, dor torácica ou falta de ar, interrompa imediatamente e procure orientação médica.',
  },
  {
    q: 'Meditação substitui terapia ou medicação psiquiátrica?',
    a: 'Não substitui em nenhuma hipótese. Meditação é prática complementar comprovadamente eficaz para ansiedade leve a moderada, manutenção de saúde mental e prevenção de recaídas. Quadros depressivos moderados a graves, transtornos de ansiedade clínica, transtorno bipolar, esquizofrenia, TEPT severo exigem acompanhamento psiquiátrico e psicoterápico estruturado. Meditação intensiva (retiros longos) pode inclusive desencadear crises em pessoas com vulnerabilidade prévia. Use como ferramenta de saúde, não como substituto de tratamento médico.',
  },
  {
    q: 'É possível fazer detox de notícias sem ficar desinformado?',
    a: 'Sim, e o resultado é informação melhor, não pior. Substitua portais sensacionalistas por fontes primárias e curadoria técnica: leitores RSS com 5 a 10 fontes selecionadas (jornalismo investigativo de qualidade, papers acadêmicos, relatórios de bancos centrais), newsletters semanais de analistas confiáveis (lidas em janela única no fim do dia), 1 a 2 podcasts longos de entrevistas profundas. O ruído reduz em 90%, a profundidade aumenta em 4 vezes. Você ficará melhor informado sobre o que importa, ignorando o que é irrelevante.',
  },
  {
    q: 'Jornal de gratidão funciona mesmo? Não é autoengano?',
    a: 'Funciona, e a base é neurocientífica, não positivista vazia. O cérebro humano tem viés evolutivo de negatividade: registra ameaças com peso 5 vezes maior que recompensas. Jornal de gratidão reposiciona ativamente a atenção, fortalecendo circuitos do córtex pré-frontal medial e da ínsula. Não é negar dificuldades, é equilibrar a percepção. Estudos com mais de 4 mil participantes (Emmons, McCullough, 2003 a 2023) mostram redução consistente de 28% em sintomas depressivos após 21 dias. Funciona em pessoas céticas igualmente, desde que praticado com especificidade (não generalidades vazias).',
  },
  {
    q: 'Quantas horas de sono são realmente necessárias?',
    a: 'Para 97% dos adultos, 7 a 9 horas. Apenas 3% têm gene DEC2 que permite funcionamento adequado com 6 horas (rara mutação genética confirmada). A maioria que afirma "dormir bem com 5 horas" na verdade está em estado de privação compensada por cafeína e adrenalina, com déficits cognitivos mensuráveis em testes de tempo de reação. Crianças exigem 9 a 11 horas, adolescentes 8 a 10, idosos acima de 65 mantêm necessidade de 7 a 8. Qualidade importa tanto quanto quantidade: 6 horas de sono profundo ininterrupto superam 8 horas fragmentadas.',
  },
  {
    q: 'Como manter higiene mental em ambiente de trabalho tóxico?',
    a: 'Estratégias de mitigação: estabeleça microrituais protetivos (5 minutos de respiração antes de reuniões críticas, caminhada de 10 minutos no almoço, headphones com ruído branco em open space), defina limites claros de horário (não responda mensagens fora do expediente, exceto emergências reais), invista em rede profissional fora da empresa (LinkedIn, eventos do setor, mentores), construa reserva financeira de 6 meses para ter poder real de saída. Em casos de assédio moral comprovado, busque orientação jurídica trabalhista. Nenhuma técnica de respiração compensa um ambiente que destrói saúde mental cronicamente. Saída planejada é, às vezes, a única solução real.',
  },
  {
    q: 'Crianças e adolescentes precisam de higiene mental também?',
    a: 'Mais ainda. Cérebro em desenvolvimento (até 25 anos) é mais vulnerável e mais maleável. Limite estrito de telas (máximo 1h por dia para 6 a 12 anos, máximo 2h para adolescentes), proibição de redes sociais antes dos 14 anos (evidência crescente da pediatria americana e australiana), refeições em família sem celulares, atividade física diária mínima de 60 minutos, sono de 9 a 11 horas para crianças e 8 a 10 para adolescentes. Construa rituais de conversa profunda semanal pai/mãe-filho. Adolescentes com sinais de ansiedade ou depressão (isolamento, mudança brusca de humor, queda escolar) exigem avaliação psicológica imediata, não esperar passar.',
  },
];

const HigieneMental = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SeoHead
        path="/soberania-organica/higiene-mental"
        custom={{
          title: 'Higiene Mental e Resiliência Psicológica: Sono, Detox, Meditação e Anti-Ansiedade',
          description: 'Manual completo de higiene mental para o brasileiro moderno: detox de notícias, sono profundo, dieta dopaminérgica, meditação tática, jornal de gratidão, protocolo anti-ansiedade, exposição solar e conexão humana real.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/higiene-mental',
          primaryKeyword: 'higiene mental',
          lsiKeywords: ['detox digital', 'sono profundo', 'dieta dopaminérgica', 'meditação tática', 'jornal de gratidão', 'protocolo anti-ansiedade', 'ritmo circadiano'],
          longTailKeywords: ['como fazer detox de notícias', 'como melhorar qualidade do sono', 'como reduzir ansiedade sem remédio', 'protocolo de meditação para iniciantes', 'reset de dopamina em 14 dias'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Higiene Mental', url: '/soberania-organica/higiene-mental' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/saude-preventiva', '/soberania-organica/sabedoria-ancestral', '/soberania-organica/defesa-pessoal', '/soberania-organica/kit-72h'],
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
          icon={Brain}
          phase="Soberania Orgânica · Resiliência Psicológica"
          title={
            <>
              Higiene Mental:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">a arquitetura cognitiva é mais decisiva que qualquer cofre, arma ou bitcoin</span>
            </>
          }
          subtitle="26% dos brasileiros adultos vivem com ansiedade clínica diagnosticada. 38% dormem menos de 6 horas. 71% começam o dia com celular na mão. A diferença entre uma mente que opera no pico e uma mente em colapso silencioso não é genética, é higiene cognitiva diária e protocolos treinados antes da crise chegar."
        />

        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 01 · Princípio operacional</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-8 text-foreground">A mente é a infraestrutura de toda outra autonomia</h2>
              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                <p>De nada serve cofre blindado, bitcoin em multisig e horta produtiva se a mente entra em colapso na primeira pressão real. A higiene mental não é luxo de quem tem tempo. É infraestrutura cognitiva que sustenta todas as outras decisões financeiras, biológicas e familiares.</p>
                <p>O cérebro humano não foi desenhado para 6 mil estímulos diários, scroll infinito, jornadas de 12 horas em ambiente artificial e conexão humana mediada por tela. A epidemia silenciosa de ansiedade, depressão e burnout no Brasil contemporâneo não é fraqueza moral, é desadaptação evolutiva entre biologia ancestral e ambiente moderno saturado.</p>
                <p>Este manual estabelece 8 protocolos integrados, cada um com sequência operacional treinada, base científica documentada e falhas críticas mapeadas. Implemente em ciclos de 12 meses, com auditoria semestral. Resultados subjetivos em 14 dias. Resultados estruturais em 90 dias. Transformação consolidada em 12 meses.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 02 · Pilares operacionais</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">8 protocolos da resiliência mental real</h2>
              <p className="text-lg text-foreground/70 font-light">Cada protocolo com sequência operacional, base científica e falhas críticas. Estude um por semana, integre um por mês.</p>
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
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 03 · Sono profundo</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">O quarto é a infraestrutura mais negligenciada da autonomia</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>O sono brasileiro médio em 2024 caiu para 6h12 minutos, segundo Fundação Oswaldo Cruz. 38% da população adulta dorme menos de 6 horas, gerando epidemia silenciosa de inflamação crônica, desregulação hormonal, queda imunitária e fragilização cognitiva mensurável em testes de atenção sustentada.</p>
                <p>O quarto deve ser engenharia ambiental dedicada: blackout absoluto, temperatura entre 18 e 20 graus, ausência total de LEDs, eliminação de telas 90 minutos antes de dormir. Cama exclusiva para sono e intimidade, nunca para trabalho ou consumo de mídia.</p>
                <p>O retorno do investimento é desproporcional. Uma noite de sono profundo restaura cognição, regula cortisol, reduz inflamação e processa trauma emocional. Privação crônica acumulada durante 90 dias gera estado equivalente à embriaguez leve permanente, com queda de 31% em capacidade de decisão complexa.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="relative">
              <img
                src={imgSono}
                alt="Quarto preparado para sono profundo: blackout, lâmpada amber, despertador analógico e ausência de telas"
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
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 04 · Jornal de gratidão</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">A intervenção mais barata da psicologia documentada</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Estudos do Greater Good Science Center da Universidade da Califórnia em Berkeley confirmam: 21 dias de prática diária de jornal de gratidão reduzem sintomas depressivos em 35%, aumentam qualidade do sono em 25%, fortalecem relações em 19% e elevam senso de propósito em 41%.</p>
                <p>O mecanismo neurológico é a reorientação ativa da atenção contra o viés evolutivo de negatividade. O cérebro humano registra ameaças com peso 5 vezes maior que recompensas (essencial para sobrevivência ancestral, devastador no ambiente moderno). Jornal de gratidão é o contrapeso treinado.</p>
                <p>Use caderno físico, sempre o mesmo, idealmente com couro durável. 3 a 5 entradas específicas por noite, com porquê emocional em 1 a 2 frases. Releia em 90, 180 e 365 dias. A perspectiva temporal revela padrões invisíveis no dia a dia e demonstra evolução pessoal silenciosa.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:order-1 relative">
              <img
                src={imgDiario}
                alt="Caderno de couro aberto sobre mesa de madeira escura com caneta tinteiro e luz tungstênio quente"
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
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">6 falhas que sabotam a higiene mental antes da crise chegar</h2>
              <p className="text-lg text-foreground/70 font-light">Padrões observados em consultórios psiquiátricos brasileiros e em pesquisas longitudinais de saúde mental. Conhecer evita repetir.</p>
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
              <p className="text-lg text-foreground/70 font-light">Sem pressa, sem ego. Higiene mental real é construída em ciclos sucessivos, com manutenção vitalícia e auditoria semestral.</p>
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
              <h2 className="text-4xl md:text-6xl font-display tracking-tight text-foreground">Dúvidas que decidem a integridade cognitiva</h2>
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
              <h2 className="text-3xl md:text-5xl font-display tracking-tight text-foreground mb-10">A mente é apenas uma camada do refúgio</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link to="/soberania-organica/saude-preventiva" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Corpo blindado</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Saúde Preventiva <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/sabedoria-ancestral" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Raízes vivas</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Sabedoria Ancestral <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/defesa-pessoal" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Defesa do corpo</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Defesa Pessoal Básica <ArrowRight className="w-4 h-4" /></p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HigieneMental;
