import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Thermometer, Wind, Droplets, AlertTriangle, ChevronDown, ArrowRight,
  Clock, ShieldAlert, Flame, Bandage, Moon, Salad, Stethoscope,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/protocolos-saude/hero-gripe.webp';
import chaImg from '@/assets/protocolos-saude/cha-repouso.webp';
import lavagemImg from '@/assets/protocolos-saude/lavagem-nasal.webp';
import termometroImg from '@/assets/protocolos-saude/termometro-febre.webp';

/**
 * /soberania-organica/protocolos-gripe-resfriado
 * Palavra-chave: "o que fazer nos primeiros sinais de gripe"
 * Paleta clara: #f4ede4 / #ece2d3 alternando com bloco escuro #0e3b3a.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

type Protocolo = {
  n: string;
  titulo: string;
  icon: any;
  primeiraHora: string;
  primeiroDia: string;
  evitar: string;
  sinaisVermelhos: string;
};

const PROTOCOLOS: Protocolo[] = [
  {
    n: '01',
    titulo: 'Primeiras 24 horas de gripe e resfriado',
    icon: Thermometer,
    primeiraHora:
      'Pare o que está fazendo assim que sentir o combo clássico (garganta arranhando, corpo pesado, calafrio leve). Hidrate com água morna, meça a temperatura para ter uma linha de base e já reduza o ritmo do dia. Esse é o momento em que o corpo está decidindo se a infecção vira um resfriado de dois dias ou uma gripe de uma semana, e o repouso precoce pesa mais do que qualquer remédio tomado depois.',
    primeiroDia:
      'Repouso de verdade, não repouso de celular na cama. Líquidos quentes a cada duas horas (água, chá, caldo salgado), alimentação leve, ambiente arejado e sem calefação seca. Se usar analgésico ou antitérmico de venda livre, siga a bula à risca e não empilhe substâncias diferentes para o mesmo sintoma. Anote a evolução da temperatura três vezes ao dia.',
    evitar:
      'Evitar exercício físico, álcool, treino em jejum forçado e a tentação de tomar antibiótico por conta própria. Gripe e resfriado comuns são causados por vírus; antibiótico não funciona contra vírus e seu uso indevido cria resistência bacteriana que prejudica você e a comunidade.',
    sinaisVermelhos:
      'Falta de ar em repouso, dor no peito, confusão mental, lábios ou unhas arroxeados, febre acima de 39,5°C que não cede com antitérmico, ou sintomas que pioram depois do quinto dia em vez de melhorar. Qualquer um desses pontos exige avaliação médica no mesmo dia.',
  },
  {
    n: '02',
    titulo: 'Dor de garganta',
    icon: Wind,
    primeiraHora:
      'Gargarejo com água morna e sal (uma colher de chá rasa de sal para um copo de 200 ml de água morna), repetido a cada três ou quatro horas. Chás mornos com mel (nunca em crianças menores de um ano) ajudam a aliviar o incômodo imediato e mantêm a mucosa hidratada.',
    primeiroDia:
      'Manter o gargarejo salino, evitar forçar a voz, usar pastilhas ou balas sem açúcar para estimular a salivação e manter ingestão de líquidos frequente. Um umidificador ou uma bacia de água no quarto ajuda em ambientes muito secos.',
    evitar:
      'Evitar bebidas muito ácidas, muito quentes ou gasosas, que irritam ainda mais a mucosa. Evitar fumar ou ficar perto de fumaça durante o quadro.',
    sinaisVermelhos:
      'Dificuldade para engolir líquidos, dificuldade para respirar, babação excessiva em criança, manchas brancas espessas na garganta, rigidez de pescoço ou dor de garganta muito intensa e unilateral. Esses sinais podem indicar quadro bacteriano ou obstrução e pedem avaliação presencial rápida.',
  },
  {
    n: '03',
    titulo: 'Tosse seca x tosse produtiva',
    icon: Wind,
    primeiraHora:
      'Identifique o tipo antes de tratar. Tosse seca (sem catarro, irritativa, pior à noite) responde bem a líquidos mornos e ambiente umidificado. Tosse produtiva (com catarro) não deve ser abafada à força, porque o catarro precisa ser eliminado; priorize hidratação para deixar a secreção mais fluida.',
    primeiroDia:
      'Para tosse seca, chá de mel com limão morno e evitar ar-condicionado direto no rosto. Para tosse produtiva, inalação de vapor de água quente (bacia com toalha sobre a cabeça, à distância segura do rosto) duas a três vezes ao dia, e observar cor e quantidade do catarro.',
    evitar:
      'Evitar xarope antitussígeno forte em tosse produtiva sem orientação, porque suprimir a tosse nesse caso retém secreção nos pulmões. Evitar fumar e ambientes com poluição intensa durante a recuperação.',
    sinaisVermelhos:
      'Catarro com sangue, catarro amarelo-esverdeado espesso persistente por mais de dez dias, tosse com chiado e falta de ar, ou febre alta associada à tosse produtiva. Esses sinais pedem avaliação médica para descartar pneumonia ou infecção bacteriana secundária.',
  },
  {
    n: '04',
    titulo: 'Congestão nasal e lavagem com solução salina caseira',
    icon: Droplets,
    primeiraHora:
      'Prepare a solução salina caseira: 1 copo de água filtrada ou fervida e já morna (240 ml) + meia colher de chá rasa de sal (sem iodo, se possível) + uma pitada de bicarbonato de sódio. Misture bem até dissolver. Use com seringa sem agulha, conta-gotas ou lavador nasal (neti pot), inclinando a cabeça sobre a pia.',
    primeiroDia:
      'Repita a lavagem nasal de duas a quatro vezes ao dia, sempre com solução recém-preparada (não guarde de um dia para o outro). Combine com vapor de água quente para soltar secreção espessa e mantenha a cabeceira da cama levemente elevada à noite para respirar melhor.',
    evitar:
      'Evitar usar água da torneira sem ferver ou filtrar, especialmente em lavagem nasal, pelo risco raro mas grave de contaminação. Evitar uso contínuo de descongestionante nasal em spray por mais de três dias seguidos, porque causa efeito rebote e piora a congestão.',
    sinaisVermelhos:
      'Secreção nasal com sangue frequente, dor facial intensa localizada (sinusite bacteriana), inchaço ao redor dos olhos ou febre alta associada à congestão. Procure atendimento se a congestão vier acompanhada de dor de cabeça forte e localizada por mais de setenta e duas horas.',
  },
  {
    n: '05',
    titulo: 'Febre: quando é aliada e quando é perigo',
    icon: Flame,
    primeiraHora:
      'Meça a temperatura corretamente (axilar, oral ou timpânica, seguindo o instrumento) e registre o horário. Febre é um mecanismo de defesa: o corpo eleva a temperatura para dificultar a replicação de vírus e bactérias. Febre baixa e moderada (até 38,5°C) em adulto saudável não precisa necessariamente de remédio imediato, apenas de hidratação e roupas leves.',
    primeiroDia:
      'Hidratação constante, compressas mornas (nunca geladas) na testa e pulsos se o desconforto for grande, e uso de antitérmico conforme bula se a febre ultrapassar 38,5°C ou se houver mal-estar intenso. Monitore a cada quatro a seis horas e observe o padrão: febre que sobe e desce em picos claros é diferente de febre constante.',
    evitar:
      'Evitar banho gelado ou álcool no corpo para "baixar a febre rápido": isso causa choque térmico e pode ser perigoso. Evitar agasalhar excessivamente uma criança ou idoso febril, o que impede a dissipação de calor.',
    sinaisVermelhos:
      'Febre acima de 39,5°C que não cede com antitérmico, convulsão febril, rigidez de nuca, confusão mental, manchas roxas na pele, febre em bebê com menos de três meses, ou febre persistente por mais de três dias sem melhora. Qualquer um desses pontos é motivo para pronto-socorro imediato.',
  },
  {
    n: '06',
    titulo: 'Diarreia e soro caseiro pela receita da OMS',
    icon: Droplets,
    primeiraHora:
      'A prioridade absoluta é repor líquidos e sais perdidos. Receita oficial da OMS para soro de reidratação oral caseiro: 1 litro de água filtrada ou fervida e resfriada + 6 colheres de chá rasas de açúcar + meia colher de chá rasa de sal. Misture até dissolver completamente e ofereça pequenos goles a cada dez ou quinze minutos.',
    primeiroDia:
      'Continuar o soro caseiro ao longo do dia, alimentação leve assim que tolerada (arroz, banana, torrada, maçã cozida), evitando forçar o jejum prolongado. Observe volume e frequência da urina como termômetro de hidratação: urina escura e escassa é sinal de alerta.',
    evitar:
      'Evitar refrigerante, suco industrializado muito doce e leite durante o quadro agudo, pois pioram a diarreia. Evitar antidiarreicos que travam o intestino sem orientação, especialmente se houver suspeita de infecção bacteriana, porque retêm a toxina dentro do corpo.',
    sinaisVermelhos:
      'Sangue nas fezes, diarreia com mais de seis episódios líquidos em vinte e quatro horas, sinais de desidratação grave (boca muito seca, olhos fundos, tontura ao levantar, urina ausente por mais de oito horas), febre alta associada ou diarreia que persiste por mais de três dias em criança pequena ou idoso. Isso exige atendimento médico imediato.',
  },
  {
    n: '07',
    titulo: 'Indigestão e azia',
    icon: Salad,
    primeiraHora:
      'Pare de comer, afrouxe roupas apertadas na cintura, sente-se ereto ou fique em pé (evite deitar logo após a crise). Um copo de água morna em pequenos goles ajuda a diluir o excesso ácido sem forçar nova digestão.',
    primeiroDia:
      'Refeições pequenas e frequentes em vez de grandes porções, evitar deitar nas duas horas seguintes às refeições, elevar a cabeceira da cama se a azia for noturna. Chá de gengibre ou camomila morno em pequenas quantidades costuma aliviar.',
    evitar:
      'Evitar frituras, café forte, álcool, refrigerante, alimentos muito condimentados e cigarro durante a crise. Evitar deitar de barriga cheia e evitar automedicar-se com antiácido todos os dias sem investigar a causa recorrente.',
    sinaisVermelhos:
      'Dor no peito que se espalha para braço, mandíbula ou costas, sudorese fria associada, vômito com sangue ou aspecto de borra de café, fezes muito escuras e pastosas, ou dor abdominal muito intensa e súbita. Qualquer um desses pontos pode indicar evento cardíaco ou sangramento digestivo, e exige pronto-socorro imediato, sem esperar melhorar sozinho.',
  },
  {
    n: '08',
    titulo: 'Dor de cabeça',
    icon: Stethoscope,
    primeiraHora:
      'Hidrate-se (a desidratação é uma das causas mais comuns e mais ignoradas), afaste-se de telas e luz forte, e descanse em ambiente silencioso por quinze a vinte minutos antes de qualquer decisão sobre remédio.',
    primeiroDia:
      'Analgésico simples conforme bula se necessário, compressa morna ou fria na testa e nuca (teste qual alivia mais no seu caso), refeições regulares sem pular horários e sono adequado na noite seguinte.',
    evitar:
      'Evitar uso de analgésico todos os dias por mais de dez dias no mês, pois isso pode causar a chamada cefaleia de rebote, em que o próprio remédio vira gatilho da dor. Evitar cafeína em excesso como automedicação contínua.',
    sinaisVermelhos:
      'Pior dor de cabeça da vida de início súbito, dor de cabeça com febre e rigidez de nuca, confusão mental, perda de força em um lado do corpo, alteração da fala ou da visão, ou dor de cabeça após uma pancada na cabeça. Esses sinais exigem pronto-socorro imediato.',
  },
  {
    n: '09',
    titulo: 'Insônia aguda',
    icon: Moon,
    primeiraHora:
      'Se não conseguir dormir depois de vinte minutos na cama, levante-se, vá para um ambiente com luz baixa e faça algo monótono e não estimulante (leitura leve, respiração lenta) até sentir sono de novo. Evite checar o relógio repetidamente, isso alimenta a ansiedade.',
    primeiroDia:
      'Mantenha horário fixo para acordar mesmo tendo dormido pouco, exponha-se à luz natural pela manhã, evite cochilos longos durante o dia e reserve a cama apenas para dormir. Respiração lenta (inspirar em quatro tempos, segurar em quatro, expirar em seis) ajuda a desacelerar o sistema nervoso antes de deitar.',
    evitar:
      'Evitar telas brilhantes, cafeína e álcool nas horas antes de dormir. Evitar tentar "forçar o sono" ficando na cama acordado por horas, o que associa a cama à frustração.',
    sinaisVermelhos:
      'Insônia que persiste por mais de três semanas seguidas, insônia acompanhada de pensamentos de desesperança ou de autolesão, ou insônia associada a dor no peito, falta de ar noturna ou ronco com pausas respiratórias observadas por outra pessoa. Esses casos merecem avaliação médica.',
  },
  {
    n: '10',
    titulo: 'Pequenas queimaduras e cortes',
    icon: Bandage,
    primeiraHora:
      'Para queimadura leve: água corrente fria (não gelada) por dez a vinte minutos, sem gelo direto na pele. Para corte: pressione com pano limpo para estancar o sangramento e lave a ferida com água limpa e sabão neutro assim que o sangramento diminuir.',
    primeiroDia:
      'Queimadura: cubra com curativo não aderente e limpo, sem estourar bolhas. Corte: mantenha limpo e seco, troque o curativo diariamente e observe sinais de infecção (vermelhidão crescente, calor local, secreção com odor). Verifique se a vacina antitetânica está em dia.',
    evitar:
      'Evitar pasta de dente, manteiga, clara de ovo ou qualquer remédio caseiro sobre queimadura. Evitar fechar corte profundo com fita adesiva improvisada em vez de procurar sutura quando indicado.',
    sinaisVermelhos:
      'Queimadura maior que a palma da mão, queimadura no rosto, mãos, genitais ou articulações, queimadura que forma bolhas grandes ou pele esbranquiçada e sem dor (queimadura profunda), corte profundo que expõe gordura, músculo ou osso, corte que não para de sangrar após dez minutos de pressão firme, ou corte por objeto enferrujado sem vacina antitetânica em dia. Todos esses casos exigem pronto-socorro.',
  },
];

const NAO_TRATAR_CASA = [
  { sintoma: 'Febre acima de 39,5°C sem resposta a antitérmico', motivo: 'Risco de complicação sistêmica; exige avaliação e possível investigação laboratorial.' },
  { sintoma: 'Falta de ar em repouso ou lábios arroxeados', motivo: 'Sinal de comprometimento respiratório grave; pode indicar pneumonia ou hipóxia.' },
  { sintoma: 'Dor no peito associada a sudorese fria', motivo: 'Possível evento cardíaco; cada minuto de atraso aumenta o risco.' },
  { sintoma: 'Vômito ou fezes com sangue', motivo: 'Sinal de sangramento digestivo ativo, que pode evoluir rápido.' },
  { sintoma: 'Rigidez de nuca com febre e confusão mental', motivo: 'Padrão compatível com meningite, emergência com desfecho tempo-dependente.' },
  { sintoma: 'Queimadura extensa ou em área nobre (rosto, mãos, genitais)', motivo: 'Risco de infecção grave e sequela funcional sem manejo especializado.' },
  { sintoma: 'Desidratação grave (urina ausente, olhos fundos, tontura ao levantar)', motivo: 'Reposição oral pode não ser suficiente; pode exigir hidratação venosa.' },
  { sintoma: 'Convulsão, perda de força ou alteração súbita da fala', motivo: 'Possível evento neurológico agudo; janela de tratamento é curta.' },
];

const FAQ = [
  {
    q: 'O que fazer nos primeiros sinais de gripe antes mesmo de ter certeza do diagnóstico?',
    a: 'Assim que sentir o combo de garganta arranhando, corpo pesado e calafrio, reduza o ritmo do dia, hidrate-se com líquidos mornos e meça a temperatura para ter uma referência. Repouso precoce nas primeiras horas é o fator que mais influencia se o quadro vira um resfriado curto ou uma gripe arrastada de vários dias.',
  },
  {
    q: 'Posso tomar antibiótico assim que sinto os primeiros sintomas de gripe?',
    a: 'Não. Gripe e resfriado comuns são causados por vírus, e antibiótico não age contra vírus. Usar antibiótico sem indicação médica não acelera a recuperação, ainda expõe o corpo a efeitos colaterais desnecessários e contribui para o problema global de resistência bacteriana.',
  },
  {
    q: 'Qual a proporção certa da solução salina caseira para lavagem nasal?',
    a: 'A proporção segura é meia colher de chá rasa de sal (preferencialmente sem iodo) para um copo de 240 ml de água filtrada ou fervida já morna, com uma pitada opcional de bicarbonato de sódio para reduzir o ardor. Use sempre solução recém-preparada e nunca reaproveite de um dia para o outro.',
  },
  {
    q: 'Como fazer o soro caseiro da OMS corretamente para diarreia?',
    a: 'A receita oficial da Organização Mundial da Saúde é 1 litro de água filtrada ou fervida e resfriada, 6 colheres de chá rasas de açúcar e meia colher de chá rasa de sal, misturados até dissolver totalmente. Ofereça o soro em pequenos goles frequentes, especialmente em crianças e idosos, que desidratam mais rápido.',
  },
  {
    q: 'Febre sempre precisa ser combatida imediatamente com remédio?',
    a: 'Não necessariamente. Febre é um mecanismo de defesa do corpo contra vírus e bactérias. Febre leve a moderada em adulto saudável pode ser acompanhada apenas com hidratação e roupas leves. O remédio antitérmico entra quando a febre ultrapassa cerca de 38,5°C ou quando o mal-estar é intenso, sempre seguindo a bula.',
  },
  {
    q: 'Qual a diferença no tratamento de tosse seca e tosse produtiva?',
    a: 'Tosse seca, sem catarro, costuma responder bem a líquidos mornos e ambiente umidificado. Tosse produtiva, com catarro, não deve ser suprimida à força, porque o organismo precisa eliminar a secreção; nesse caso, hidratação e inalação de vapor ajudam a fluidificar o catarro para ser expelido.',
  },
  {
    q: 'Quando uma dor de cabeça comum vira sinal de emergência?',
    a: 'Quando é a pior dor de cabeça da vida de início súbito, vem acompanhada de febre com rigidez de nuca, confusão mental, perda de força em um lado do corpo, alteração de fala ou visão, ou surge depois de uma pancada na cabeça. Nesses casos, o atendimento deve ser imediato, sem esperar em casa.',
  },
  {
    q: 'Pequenos cortes e queimaduras sempre podem ser tratados só em casa?',
    a: 'A maioria pode, com água corrente fria para queimadura leve e pressão mais limpeza para corte superficial. Mas queimaduras extensas ou em áreas nobres, cortes profundos que expõem gordura, músculo ou osso, e sangramento que não para após dez minutos de pressão firme exigem avaliação em pronto-socorro.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '86vh', minHeight: 640 }}>
      <img
        src={heroImg}
        alt="Chá quente e limão sobre mesa de madeira, cuidado caseiro nas primeiras horas de gripe e resfriado"
        width={1920}
        height={1229}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.35) 40%, rgba(14,59,58,0.9) 100%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(244,237,228,0.15)',
              color: '#f4ede4',
              border: '1px solid rgba(244,237,228,0.3)',
            }}
          >
            <Thermometer size={11} className="inline mr-2" /> Soberania Orgânica · Protocolos Caseiros
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,7.5vw,6.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          O que fazer nos primeiros sinais de gripe.{' '}
          <span
            style={{
              color: '#e8a36b',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(232,163,107,0.45), 0 0 80px rgba(232,163,107,0.25)',
            }}
          >
            Hora a hora, sem drama.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.9)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Dez protocolos práticos para as queixas mais comuns do dia a dia: primeira hora, primeiro dia, o que evitar e os sinais vermelhos que exigem pronto-socorro. Sem substituir avaliação médica, com clareza para agir enquanto ela não chega.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function ProtocolosGripeResfriado() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-organica/protocolos-gripe-resfriado"
        custom={{
          title: 'O Que Fazer nos Primeiros Sinais de Gripe: Protocolos Hora a Hora',
          description:
            'Protocolos práticos hora a hora para gripe, resfriado, dor de garganta, tosse, congestão nasal, febre, diarreia, indigestão, dor de cabeça, insônia e pequenos ferimentos. O que fazer, o que evitar e os sinais de alerta para pronto-socorro.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/protocolos-gripe-resfriado',
          primaryKeyword: 'o que fazer nos primeiros sinais de gripe',
          lsiKeywords: [
            'primeiros sintomas de gripe o que fazer',
            'soro caseiro receita OMS',
            'solução salina caseira para nariz entupido',
            'como baixar febre em casa',
            'tosse seca e tosse com catarro tratamento',
            'quando ir ao pronto-socorro com febre',
          ],
          longTailKeywords: [
            'o que fazer nas primeiras 24 horas de gripe',
            'receita de solução salina caseira para lavagem nasal',
            'receita de soro caseiro da OMS para diarreia',
            'quando febre é perigosa e exige pronto-socorro',
            'diferença entre tosse seca e tosse produtiva tratamento',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Protocolos Gripe e Resfriado', url: '/soberania-organica/protocolos-gripe-resfriado' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: [
            '/soberania-organica/primeiros-socorros',
            '/soberania-organica/avaliacao-sinais',
            '/soberania-organica/primeiros-socorros-taticos',
            '/soberania-organica',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div
        className="relative min-h-screen"
        style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}
      >
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* AVISO MÉDICO */}
        <section className="relative px-6 md:px-12 lg:px-20 py-10" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto flex gap-5 items-start p-6 md:p-8 rounded-2xl" style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(180,88,54,0.25)' }}>
            <ShieldAlert size={32} className="shrink-0 mt-1" style={{ color: '#b45836' }} />
            <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
              Este conteúdo é educativo e não substitui avaliação médica. Os protocolos aqui descritos servem para orientar a primeira resposta em casa diante de queixas comuns, mas não têm valor de diagnóstico nem de prescrição. Em qualquer dúvida sobre gravidade, sinais que pioram ou pessoas de grupo de risco (bebês, gestantes, idosos, imunossuprimidos), procure atendimento médico presencial sem demora.
            </p>
          </div>
        </section>

        {/* CAPÍTULO 1 — Introdução */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Por que agir na primeira hora importa
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.1rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Metade do sofrimento de um resfriado{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  vem da resposta atrasada.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Boa parte das queixas de saúde do dia a dia não é grave, mas exige resposta rápida e correta para não virar um problema maior. A mesma dor de garganta que melhora em dois dias com gargarejo salino pode se arrastar por uma semana inteira se for ignorada até virar insuportável. A mesma diarreia que se resolve com soro caseiro pode terminar em internação se a desidratação for subestimada.
                </p>
                <p>
                  Soberania sobre a própria saúde começa por saber diferenciar dois momentos: o momento de agir em casa com protocolo claro, e o momento de reconhecer que aquilo passou do ponto e precisa de avaliação profissional. Este guia existe para dar clareza nos dois lados dessa linha, protocolo por protocolo, hora a hora.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #b45836', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Não é sobre virar seu próprio médico. É sobre não ficar paralisado na primeira hora que mais importa.
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — 10 Protocolos */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 02 · Os dez protocolos
              </span>
              <h2 className="text-[clamp(2.1rem,5vw,4.5rem)] font-black leading-[1] tracking-tight">
                Primeira hora, primeiro dia,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  e o limite claro.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {PROTOCOLOS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.n}
                    {...fade(i * 0.03)}
                    className="rounded-3xl p-7 md:p-10"
                    style={{ backgroundColor: 'rgba(244,237,228,0.05)', border: '1px solid rgba(232,163,107,0.18)' }}
                  >
                    <div className="flex items-start gap-5 mb-8">
                      <div
                        className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(232,163,107,0.15)' }}
                      >
                        <Icon size={26} style={{ color: '#e8a36b' }} />
                      </div>
                      <div>
                        <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#e8a36b' }}>
                          Protocolo {p.n}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black leading-tight mt-1" style={{ color: '#f4ede4' }}>
                          {p.titulo}
                        </h3>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.04)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock size={16} style={{ color: '#e8a36b' }} />
                          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#e8a36b' }}>Primeira hora</span>
                        </div>
                        <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.9)' }}>{p.primeiraHora}</p>
                      </div>
                      <div className="p-5 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.04)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock size={16} style={{ color: '#e8a36b' }} />
                          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#e8a36b' }}>Primeiro dia</span>
                        </div>
                        <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.9)' }}>{p.primeiroDia}</p>
                      </div>
                      <div className="p-5 rounded-2xl" style={{ backgroundColor: 'rgba(180,88,54,0.1)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle size={16} style={{ color: '#ffb37a' }} />
                          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#ffb37a' }}>O que evitar</span>
                        </div>
                        <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.9)' }}>{p.evitar}</p>
                      </div>
                      <div className="p-5 rounded-2xl" style={{ backgroundColor: 'rgba(180,50,50,0.15)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <ShieldAlert size={16} style={{ color: '#ff9a8a' }} />
                          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#ff9a8a' }}>Sinais vermelhos</span>
                        </div>
                        <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.92)' }}>{p.sinaisVermelhos}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Solução salina em detalhe com imagem */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Capítulo 03 · Receita em detalhe
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Solução salina caseira,{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  proporção que funciona.
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                <p>
                  A proporção segura e eficaz para lavagem nasal caseira é: 1 copo de água filtrada ou fervida e já morna (240 ml), meia colher de chá rasa de sal sem iodo, e uma pitada opcional de bicarbonato de sódio para reduzir o ardor. Misture bem até dissolver completamente antes de usar.
                </p>
                <p>
                  Use com seringa sem agulha, conta-gotas ou lavador nasal específico, inclinando levemente a cabeça sobre a pia. Nunca use água da torneira sem ferver ou filtrar para essa finalidade, pelo risco raro mas grave de contaminação por microrganismos presentes na água não tratada.
                </p>
                <p>
                  Prepare solução nova a cada uso. Solução salina guardada de um dia para o outro perde a esterilidade relativa e pode se tornar meio de cultivo para bactérias.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] overflow-hidden rounded-3xl">
                <img
                  src={lavagemImg}
                  alt="Copo de água morna com sal para preparo de solução salina caseira usada em lavagem nasal"
                  loading="lazy"
                  width={1600}
                  height={1067}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Febre e chá com imagem */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6 lg:order-2">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Capítulo 04 · Febre e repouso
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Febre não é inimiga.{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  É aliada até certo ponto.
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                <p>
                  O corpo eleva a temperatura de propósito: um ambiente mais quente dificulta a replicação de muitos vírus e bactérias e acelera a resposta imune. Tratar toda febre como emergência, na maioria dos adultos saudáveis, é reação desproporcional que gera ansiedade sem benefício real.
                </p>
                <p>
                  O ponto de virada está na intensidade, na duração e nos sintomas associados. Febre moderada com bom estado geral pede repouso e hidratação. Febre muito alta, persistente ou acompanhada de confusão mental, rigidez de nuca ou manchas na pele muda completamente de categoria e pede pronto-socorro.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-6 lg:order-1">
              <div className="relative h-[420px] md:h-[520px] overflow-hidden rounded-3xl">
                <img
                  src={termometroImg}
                  alt="Termômetro sobre a mesa ao lado de manta quente, cuidado no monitoramento da febre em casa"
                  loading="lazy"
                  width={1600}
                  height={1280}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Repouso e imagem final grande */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Capítulo 05 · O papel do repouso
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                O remédio mais subestimado{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  ainda é parar.
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Boa parte dos quadros deste guia melhora mais rápido não pelo remédio certo, mas pela decisão simples de reduzir o ritmo assim que o primeiro sinal aparece. Quem trabalha até a exaustão com os primeiros sintomas de gripe costuma transformar dois dias de mal-estar em uma semana inteira de recuperação arrastada.
                </p>
                <p>
                  Chás mornos, hidratação constante e um ambiente calmo fazem parte do protocolo de quase todas as queixas listadas aqui, exatamente porque dão ao corpo o espaço que ele precisa para trabalhar.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] overflow-hidden rounded-3xl">
                <img
                  src={chaImg}
                  alt="Xícara de chá quente ao lado de manta e livro, cenário de repouso durante recuperação de gripe"
                  loading="lazy"
                  width={1600}
                  height={2208}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Tabela quando NÃO tratar em casa */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 06 · O limite claro
              </span>
              <h2 className="text-[clamp(2.1rem,5vw,4.5rem)] font-black leading-[1] tracking-tight">
                Quando{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  NÃO tratar em casa.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                Estes são os sinais que exigem avaliação médica imediata, sem tentativa de protocolo caseiro adicional.
              </p>
            </motion.div>

            <motion.div {...fade(0.1)} className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(232,163,107,0.2)' }}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ backgroundColor: 'rgba(232,163,107,0.12)' }}>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#e8a36b' }}>Sintoma ou sinal</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#e8a36b' }}>Por que exige pronto-socorro</th>
                  </tr>
                </thead>
                <tbody>
                  {NAO_TRATAR_CASA.map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid rgba(244,237,228,0.1)' }}>
                      <td className="p-5 text-base font-semibold align-top" style={{ color: '#f4ede4' }}>{row.sintoma}</td>
                      <td className="p-5 text-base font-light align-top" style={{ color: 'rgba(244,237,228,0.85)' }}>{row.motivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Capítulo 07 · Perguntas frequentes
              </span>
              <h2 className="text-[clamp(2.1rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Antes de agir,{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  a dúvida certa.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    {...fade(i * 0.03)}
                    className="rounded-2xl overflow-hidden"
                    style={{ backgroundColor: '#f4ede4', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left"
                    >
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown
                        size={22}
                        className="shrink-0 transition-transform duration-500"
                        style={{ color: '#b45836', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.5, ease: APPLE_EASE }}
                        className="px-6 md:px-8 pb-8"
                      >
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 8 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Um protocolo caseiro{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não substitui preparo completo.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  to: '/soberania-organica/primeiros-socorros',
                  titulo: 'Primeiros Socorros',
                  texto: 'As técnicas básicas de socorro para os casos em que minutos fazem diferença.',
                },
                {
                  to: '/soberania-organica/avaliacao-sinais',
                  titulo: 'Avaliação de Sinais',
                  texto: 'Como ler sinais fisiológicos do corpo para decidir com mais precisão quando agir.',
                },
                {
                  to: '/soberania-organica/primeiros-socorros-taticos',
                  titulo: 'Primeiros Socorros Táticos',
                  texto: 'Protocolos de trauma e estabilização para cenários mais graves e situações de emergência.',
                },
              ].map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="group p-8 rounded-2xl transition-all hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}
                >
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: '#e8a36b' }}>
                    Acessar <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
