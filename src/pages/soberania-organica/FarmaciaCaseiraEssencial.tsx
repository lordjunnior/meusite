import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, ShieldCheck, Package, AlertTriangle, ChevronDown, ArrowRight,
  Thermometer, Wallet, Box, ClipboardList, ShoppingBag, XCircle,
  CheckCircle2, Leaf, Droplets,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/farmacia-caseira/hero.webp';
import gengibreImg from '@/assets/farmacia-caseira/ginger.webp';
import carvaoImg from '@/assets/farmacia-caseira/carvao.webp';
import argilaImg from '@/assets/farmacia-caseira/argila.webp';

/**
 * /soberania-organica/farmacia-caseira-essencial
 * Palavra-chave: "farmácia caseira natural"
 * Paleta clara #f4ede4 / #ece2d3 alternando com escura #0e3b3a, padrão editorial Apple.
 * Conteúdo YMYL: educativo, não substitui avaliação médica.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.75, ease: APPLE_EASE, delay },
});

interface ItemEssencial {
  n: string;
  nome: string;
  paraQue: string;
  dose: string;
  armazenamento: string;
  validade: string;
  custo: string;
}

const ITENS_ESSENCIAIS: ItemEssencial[] = [
  {
    n: '01',
    nome: 'Mel cru (não pasteurizado)',
    paraQue: 'Cicatrizante de feridas superficiais, calmante de tosse seca e base para xaropes caseiros. Ação antibacteriana comprovada em mel de baixa umidade.',
    dose: '1 colher de chá pura ou diluída em água morna, até 3x ao dia para tosse. Uso tópico fino em ferimento limpo.',
    armazenamento: 'Pote de vidro escuro, tampa bem fechada, temperatura ambiente, longe de luz direta e umidade.',
    validade: 'Praticamente indefinida se mantido seco e fechado; cristalização não indica perda de qualidade.',
    custo: 'R$ 35 a R$ 70 o pote de 500g de mel cru rastreável.',
  },
  {
    n: '02',
    nome: 'Própolis (extrato ou tintura)',
    paraQue: 'Suporte imunológico, dor de garganta e pequenas lesões na mucosa oral. Consulte o dossiê completo para composição e evidências.',
    dose: '15 a 20 gotas diluídas em água ou mel, 2 a 3x ao dia. Uso tópico direto em afta, com cautela por causar ardência.',
    armazenamento: 'Frasco âmbar bem fechado, ao abrigo de luz e calor, de preferência dentro do armário e não na geladeira.',
    validade: '2 a 3 anos lacrado; após aberto, 12 meses mantendo boas condições de conservação.',
    custo: 'R$ 25 a R$ 60 o frasco de 30ml de extrato padronizado.',
  },
  {
    n: '03',
    nome: 'Óleo de rícino prensado a frio',
    paraQue: 'Compressas abdominais, hidratação de cutículas e couro cabeludo, uso tradicional em constipação leve pontual. Veja o dossiê dedicado ao tema.',
    dose: 'Compressa: pano embebido sobre a pele por 30 a 60 minutos. Uso oral pontual apenas com orientação profissional pela potência laxativa.',
    armazenamento: 'Frasco de vidro âmbar bem vedado, longe de luz e calor, sem necessidade de refrigeração.',
    validade: '2 anos lacrado; após aberto, 12 a 18 meses se guardado corretamente.',
    custo: 'R$ 40 a R$ 90 o litro prensado a frio de qualidade orgânica.',
  },
  {
    n: '04',
    nome: 'Babosa in natura ou gel estabilizado',
    paraQue: 'Queimaduras leves, irritações de pele, pós-sol e hidratação de mucosas. Rico em acemannan, detalhado no dossiê Babosa & Acemannan.',
    dose: 'Aplicação tópica generosa 2 a 4x ao dia sobre a área afetada, sempre limpa e seca.',
    armazenamento: 'Folha in natura na geladeira envolta em papel; gel estabilizado em pote opaco fechado fora da geladeira.',
    validade: 'Folha fresca dura 5 a 7 dias refrigerada; gel estabilizado comercial dura 12 a 24 meses lacrado.',
    custo: 'Gratuito se cultivada em vaso próprio; gel comercial R$ 20 a R$ 45 o pote de 200g.',
  },
  {
    n: '05',
    nome: 'Gengibre fresco',
    paraQue: 'Náusea, enjoo de viagem, digestão lenta e efeito termogênico leve. Base de chás e infusões de uso diário.',
    dose: 'Rodela de 2cm fervida em 300ml de água por 8 minutos, até 3 xícaras ao dia.',
    armazenamento: 'Raiz fresca na gaveta de vegetais da geladeira, seca e sem contato com água até o uso.',
    validade: '3 a 4 semanas refrigerado; congelado ralado dura até 6 meses.',
    custo: 'R$ 8 a R$ 15 o quilo em feira ou hortifruti.',
  },
  {
    n: '06',
    nome: 'Alho fresco',
    paraQue: 'Suporte imunológico e circulatório tradicional, propriedades antimicrobianas quando esmagado e deixado repousar antes do consumo.',
    dose: '1 a 2 dentes esmagados por dia, in natura ou levemente aquecidos em mel.',
    armazenamento: 'Local seco, arejado e escuro, fora da geladeira, em cesto ventilado.',
    validade: '3 a 5 meses inteiro em local seco; descartar se brotar ou mofar.',
    custo: 'R$ 15 a R$ 25 o quilo dependendo da safra e origem.',
  },
  {
    n: '07',
    nome: 'Cúrcuma em pó ou raiz',
    paraQue: 'Anti-inflamatório tradicional de uso culinário e em compressas, sempre combinada com pimenta-do-reino para melhor absorção da curcumina.',
    dose: '1 colher de chá em leite morno ou água com uma pitada de pimenta-do-reino, 1 a 2x ao dia.',
    armazenamento: 'Pote de vidro opaco bem fechado, longe de luz e umidade.',
    validade: '2 anos em pó lacrado; raiz fresca dura 3 semanas refrigerada.',
    custo: 'R$ 12 a R$ 30 o pacote de 100g em pó orgânico.',
  },
  {
    n: '08',
    nome: 'Carvão ativado',
    paraQue: 'Adsorção em casos de intoxicação alimentar leve e gases excessivos, sempre como medida de apoio e não substituto de atendimento médico em emergência.',
    dose: '500mg a 1g em água, longe de refeições e de outros medicamentos por pelo menos 2 horas.',
    armazenamento: 'Frasco fechado, seco, longe de umidade que compromete a capacidade de adsorção.',
    validade: '3 a 5 anos lacrado; verificar validade impressa no rótulo do fabricante.',
    custo: 'R$ 20 a R$ 40 o frasco de 60 cápsulas.',
  },
  {
    n: '09',
    nome: 'Sal marinho não refinado',
    paraQue: 'Gargarejo para dor de garganta, soro caseiro de reidratação e banho de imersão para dores musculares.',
    dose: 'Gargarejo: 1 colher de chá em 200ml de água morna. Soro caseiro: seguir proporção padrão de sal e açúcar orientada por profissional de saúde.',
    armazenamento: 'Pote hermético em local seco, imune a umidade que empedra o sal.',
    validade: 'Indefinida se mantido seco.',
    custo: 'R$ 10 a R$ 25 o quilo de sal marinho não refinado.',
  },
  {
    n: '10',
    nome: 'Bicarbonato de sódio',
    paraQue: 'Alívio de azia ocasional, pasta para picada de inseto e gargarejo bucal. Uso pontual, não recomendado de forma contínua.',
    dose: 'Meia colher de chá dissolvida em copo de água para azia ocasional, uso esporádico.',
    armazenamento: 'Recipiente fechado, longe de umidade, validade impressa na embalagem original.',
    validade: '2 anos lacrado; perde eficácia com exposição prolongada ao ar.',
    custo: 'R$ 5 a R$ 12 o pacote de 500g.',
  },
  {
    n: '11',
    nome: 'Argila verde ou branca',
    paraQue: 'Cataplasmas para inflamações localizadas, picadas de inseto e máscaras de limpeza de pele.',
    dose: 'Pasta com água filtrada aplicada em camada fina sobre a área, deixar agir 15 a 20 minutos e remover com água morna.',
    armazenamento: 'Pote de vidro ou plástico não metálico, longe de umidade e de contato com metal ao misturar.',
    validade: '2 a 3 anos em pó lacrado se mantida seca.',
    custo: 'R$ 15 a R$ 35 o pacote de 500g de argila cosmética.',
  },
  {
    n: '12',
    nome: 'Óleo de coco extra virgem',
    paraQue: 'Hidratante de pele e cabelo, base para pomadas caseiras e uso culinário ocasional.',
    dose: 'Aplicação tópica conforme necessidade; uso culinário em substituição pontual a outras gorduras.',
    armazenamento: 'Pote fechado em temperatura ambiente; solidifica abaixo de 24°C, o que é normal.',
    validade: '18 a 24 meses lacrado em local fresco e seco.',
    custo: 'R$ 25 a R$ 50 o pote de 500ml extra virgem prensado a frio.',
  },
  {
    n: '13',
    nome: 'Camomila seca',
    paraQue: 'Chá calmante para ansiedade leve e insônia ocasional, além de compressa ocular para irritação leve.',
    dose: '1 colher de sopa de flores secas em 250ml de água quente, infusão de 5 a 8 minutos, 1 a 2 xícaras à noite.',
    armazenamento: 'Pote de vidro opaco bem fechado, longe de luz e umidade que degradam os óleos essenciais da flor.',
    validade: '12 meses para preservar aroma e potência; depois disso perde eficácia gradualmente.',
    custo: 'R$ 10 a R$ 20 o pacote de 50g em flores secas de qualidade.',
  },
  {
    n: '14',
    nome: 'Hortelã fresca ou seca',
    paraQue: 'Chá digestivo para gases e desconforto abdominal, além de alívio de congestão nasal por inalação de vapor.',
    dose: '1 colher de sopa de folhas em 250ml de água quente, infusão de 5 minutos, até 3 xícaras ao dia.',
    armazenamento: 'Fresca: geladeira envolta em papel úmido. Seca: pote de vidro opaco fechado.',
    validade: 'Fresca dura 1 semana refrigerada; seca dura 12 meses lacrada.',
    custo: 'R$ 3 a R$ 8 o maço fresco; R$ 10 a R$ 18 o pacote seco de 50g.',
  },
  {
    n: '15',
    nome: 'Tintura de equinácea',
    paraQue: 'Suporte imunológico nos primeiros sinais de resfriado, uso por período curto e não contínuo.',
    dose: '20 a 30 gotas diluídas em água, 3x ao dia, por no máximo 10 a 14 dias consecutivos.',
    armazenamento: 'Frasco âmbar com conta-gotas, bem fechado, longe de luz e calor direto.',
    validade: '2 a 3 anos lacrado; verificar turbidez ou odor alterado antes de usar após esse período.',
    custo: 'R$ 30 a R$ 55 o frasco de 30ml em tintura padronizada.',
  },
];

const KIT_MINIMO = [
  'Mel cru', 'Própolis', 'Sal marinho não refinado', 'Bicarbonato de sódio',
  'Gengibre fresco', 'Alho fresco', 'Babosa (vaso próprio)', 'Camomila seca',
];

const KIT_COMPLETO = [
  'Todos os itens do kit mínimo', 'Óleo de rícino prensado a frio', 'Cúrcuma em pó',
  'Carvão ativado', 'Argila verde', 'Óleo de coco extra virgem', 'Hortelã fresca',
  'Tintura de equinácea', 'Termômetro digital', 'Luvas descartáveis e gaze estéril',
];

const ONDE_COMPRAR = [
  {
    titulo: 'Feiras orgânicas certificadas e produtores locais',
    texto: 'Prioridade para gengibre, alho, hortelã e camomila frescos. Pergunte sempre sobre manejo e peça nota ou comprovante de procedência.',
  },
  {
    titulo: 'Cooperativas de apicultores registradas',
    texto: 'Para mel cru e própolis, busque cooperativas com registro sanitário e rótulo com lote, origem floral e data de extração. Desconfie de preço muito abaixo do mercado.',
  },
  {
    titulo: 'Farmácias de manipulação com boa reputação',
    texto: 'Tinturas, extratos padronizados e óleo de rícino prensado a frio ganham em controle de qualidade quando manipulados sob boas práticas farmacêuticas.',
  },
  {
    titulo: 'Lojas de produtos naturais com nota fiscal',
    texto: 'Argila cosmética, carvão ativado e óleo de coco devem ter registro de lote, validade impressa e nota fiscal. Evite vendedores informais sem rastreabilidade.',
  },
];

const SINAIS_FRAUDE = [
  'Preço muito abaixo da média de mercado para o mesmo item, especialmente mel e própolis.',
  'Ausência de rótulo com lote, validade e informações do fabricante ou produtor.',
  'Promessas de cura milagrosa ou substituição de tratamento médico na embalagem ou no discurso de venda.',
  'Vendedor que se recusa a fornecer nota fiscal ou comprovante de origem quando solicitado.',
  'Embalagem violada, lacre rompido ou aspecto de produto reembalado sem procedência clara.',
];

const ORGANIZACAO = [
  {
    titulo: 'Zona fria e escura para tinturas e extratos',
    texto: 'Própolis, equinácea e óleo de rícino ficam mais estáveis longe de luz e variação de temperatura. Uma prateleira fechada de armário é suficiente, sem necessidade de geladeira.',
  },
  {
    titulo: 'Zona de refrigeração para itens frescos',
    texto: 'Gengibre, alho, hortelã fresca e folha de babosa in natura pedem geladeira. Separe um compartimento específico para não misturar com alimentos de cheiro forte.',
  },
  {
    titulo: 'Zona seca para pós e sais',
    texto: 'Bicarbonato, sal marinho, cúrcuma em pó, carvão ativado e argila precisam de ambiente seco e hermético. Umidade é o principal inimigo desses itens.',
  },
  {
    titulo: 'Etiquetagem com data de compra e validade',
    texto: 'Cole uma etiqueta simples em cada frasco com a data de compra e a validade estimada. Revise o armário a cada 3 meses e descarte o que já perdeu potência.',
  },
];

const ERROS_COMUNS = [
  'Guardar tinturas e óleos perto do fogão, onde calor e vapor aceleram a degradação.',
  'Comprar em grande quantidade item que tem prazo curto, como gengibre e hortelã frescos, gerando desperdício.',
  'Misturar carvão ativado com o horário de outros suplementos ou medicamentos, reduzindo a absorção de ambos.',
  'Usar mel cru em crianças menores de 1 ano, faixa etária com risco de botulismo infantil documentado na literatura médica.',
  'Achar que farmácia caseira substitui atendimento de emergência em quadros graves, como falta de ar, sangramento intenso ou febre alta persistente.',
  'Deixar de anotar validade e esquecer o item no fundo do armário até perder totalmente a potência.',
];

const CHECKLIST = [
  'Mel cru rastreável em pote de vidro escuro',
  'Própolis em extrato ou tintura padronizada',
  'Óleo de rícino prensado a frio',
  'Babosa em vaso próprio ou gel estabilizado',
  'Gengibre fresco na gaveta de vegetais',
  'Alho fresco em local seco e ventilado',
  'Cúrcuma em pó com pimenta-do-reino por perto',
  'Carvão ativado com validade visível',
  'Sal marinho não refinado em pote hermético',
  'Bicarbonato de sódio dentro da validade',
  'Argila verde ou branca em pó seco',
  'Óleo de coco extra virgem lacrado',
  'Camomila seca em pote opaco',
  'Hortelã fresca ou seca por perto',
  'Tintura de equinácea com conta-gotas',
  'Termômetro digital funcionando',
  'Gaze estéril e luvas descartáveis',
  'Etiquetas com data de compra em cada frasco',
];

const FAQ = [
  {
    q: 'O que é, na prática, uma farmácia caseira natural?',
    a: 'É um conjunto pequeno e bem escolhido de itens naturais, guardados de forma organizada em casa, voltados para apoio em desconfortos leves do dia a dia como gases, dor de garganta, pele irritada e enjoo. Não é substituto de farmácia convencional nem de atendimento médico, é complemento para situações simples e previsíveis.',
  },
  {
    q: 'Farmácia caseira natural substitui remédio de farmácia?',
    a: 'Não. Este conteúdo é educativo e não substitui avaliação médica, diagnóstico ou tratamento profissional. Itens naturais têm papel de apoio em quadros leves e bem conhecidos pela pessoa. Sintomas persistentes, febre alta, dor intensa ou qualquer sinal de gravidade exigem avaliação de profissional de saúde sem demora.',
  },
  {
    q: 'Quanto custa montar uma farmácia caseira completa?',
    a: 'O kit mínimo de 8 itens fica entre R$ 150 e R$ 280 dependendo da região e da qualidade escolhida. O kit completo de 15 itens mais acessórios básicos costuma somar entre R$ 400 e R$ 650, com boa parte durando de 1 a 3 anos sem necessidade de reposição.',
  },
  {
    q: 'Como saber se um vendedor de mel ou própolis é confiável?',
    a: 'Peça rótulo completo com lote, origem floral, data de extração e registro sanitário quando aplicável. Prefira cooperativas de apicultores conhecidas na região. Preço muito abaixo da média e ausência de nota fiscal são os dois sinais mais comuns de produto adulterado ou de origem duvidosa.',
  },
  {
    q: 'Mel cru pode ser dado para bebês?',
    a: 'Não. Mel cru não deve ser oferecido a crianças menores de 1 ano pelo risco documentado de botulismo infantil, uma intoxicação grave causada por esporos que podem estar presentes no mel. Essa é uma das poucas contraindicações absolutas dentro da farmácia caseira.',
  },
  {
    q: 'Qual a diferença entre kit mínimo e kit completo?',
    a: 'O kit mínimo cobre os desconfortos mais comuns do dia a dia com 8 itens de baixo custo e fácil reposição. O kit completo de 15 itens amplia a cobertura para dores musculares, inflamações localizadas e suporte imunológico mais robusto, exigindo um pouco mais de espaço e investimento inicial.',
  },
  {
    q: 'Onde encontro protocolos mais detalhados de plantas específicas?',
    a: 'Este guia foca em organização prática, custo e armazenamento dos 15 itens essenciais. Para protocolos completos por sistema do corpo, consulte o dossiê de Fitoterapia Aplicada. Para o dossiê completo sobre babosa e acemannan, com composição e estudos, veja a página dedicada à Babosa.',
  },
  {
    q: 'Preciso de refrigeração para todos os itens da farmácia caseira?',
    a: 'Não. Apenas itens frescos como gengibre, alho recém-comprado, hortelã fresca e folha de babosa in natura precisam de geladeira. Tinturas, extratos, pós e óleos se conservam melhor em temperatura ambiente, dentro de armário fechado, longe de luz e calor direto.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '90vh', minHeight: 680 }}>
      <img
        src={heroImg}
        alt="Potes de mel e ingredientes naturais organizados sobre superfície de madeira, base de uma farmácia caseira natural"
        width={1920}
        height={1280}
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
            <Home size={11} className="inline mr-2" /> Soberania Orgânica · Farmácia Caseira
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Farmácia caseira natural.{' '}
          <span
            style={{
              color: '#e8a36b',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(232,163,107,0.45), 0 0 80px rgba(232,163,107,0.25)',
            }}
          >
            15 itens, um armário, autonomia real.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Para que serve cada item, dose usual, prazo de validade, custo real em reais e onde comprar sem cair em fraude. Kit mínimo, kit completo e organização física do armário, tudo pronto para aplicar hoje.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function FarmaciaCaseiraEssencial() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-organica/farmacia-caseira-essencial"
        custom={{
          title: 'Farmácia Caseira Natural: os 15 Itens Essenciais em Casa',
          description:
            'Guia prático de farmácia caseira natural: para que serve cada item, dose usual, validade, custo em reais, onde comprar sem fraude e checklist de organização do armário.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/farmacia-caseira-essencial',
          primaryKeyword: 'farmácia caseira natural',
          lsiKeywords: [
            'remédios naturais em casa',
            'kit de primeiros socorros natural',
            'itens essenciais de farmácia caseira',
            'como montar farmácia natural em casa',
            'remédios caseiros seguros',
            'armário de ervas medicinais',
          ],
          longTailKeywords: [
            'lista de itens de farmácia caseira natural',
            'como organizar armário de remédios naturais',
            'quanto custa montar farmácia caseira natural',
            'onde comprar mel própolis e tinturas sem fraude',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Farmácia Caseira Essencial', url: '/soberania-organica/farmacia-caseira-essencial' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: [
            '/soberania-organica',
            '/soberania-organica/fitoterapia-aplicada',
            '/soberania-organica/babosa-acemannan',
            '/soberania-organica/oleo-ricino-biohacker',
            '/soberania-organica/propolis',
            '/soberania-organica/primeiros-socorros',
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

        {/* AVISO YMYL */}
        <section className="px-6 md:px-12 lg:px-20 py-8" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto flex items-start gap-4">
            <AlertTriangle size={22} className="shrink-0 mt-1" style={{ color: '#b45836' }} />
            <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
              Este conteúdo tem finalidade educativa e informativa. Ele não substitui avaliação, diagnóstico ou
              tratamento de profissional de saúde qualificado. Em caso de sintomas persistentes, dor intensa, febre
              alta ou qualquer sinal de gravidade, procure atendimento médico imediatamente.
            </p>
          </div>
        </section>

        {/* CAPÍTULO 1 — Por que ter uma farmácia caseira */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Por que ter uma farmácia caseira
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Autonomia começa{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  no armário de casa.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  A maior parte dos desconfortos do dia a dia, uma dor de garganta que começa à noite, um corte
                  superficial, um enjoo depois de comer errado, não precisa de pronto-socorro nem de farmácia 24 horas.
                  Precisa de um item certo, guardado no lugar certo, dentro da validade. Farmácia caseira natural é
                  exatamente isso: previsibilidade para o comum, com bom senso sobre quando procurar ajuda profissional.
                </p>
                <p>
                  O problema de quem tenta montar isso sozinho não é falta de vontade, é excesso de informação solta.
                  Vídeo aqui, receita ali, nenhum lugar que diga dose, prazo de validade e custo real. Este guia resolve
                  esse ponto: 15 itens, critério de escolha, organização física e um checklist para revisar o armário
                  a cada 3 meses sem depender de memória.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #b45836', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Soberania de saúde não é rejeitar a medicina. É não depender dela para o que você mesmo pode resolver bem.
                </blockquote>
                <p>
                  Para protocolos mais profundos por sistema do corpo (respiratório, digestivo, nervoso, muscular e
                  imunológico), o dossiê de{' '}
                  <Link to="/soberania-organica/fitoterapia-aplicada" className="underline font-semibold" style={{ color: '#b45836' }}>
                    Fitoterapia Aplicada
                  </Link>{' '}
                  detalha ciclos de uso, ajuste por idade e critério de interrupção planta a planta. E para entender a
                  fundo a composição e os estudos por trás da babosa, o dossiê{' '}
                  <Link to="/soberania-organica/babosa-acemannan" className="underline font-semibold" style={{ color: '#b45836' }}>
                    Babosa & Acemannan
                  </Link>{' '}
                  é leitura complementar direta a este guia.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Os 15 itens essenciais */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                  Capítulo 02
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(244,237,228,0.7)' }}>
                  Os 15 itens essenciais
                </p>
                <img
                  src={gengibreImg}
                  alt="Gengibre fresco fatiado sobre superfície de madeira, um dos 15 itens essenciais da farmácia caseira natural"
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="w-full rounded-2xl mt-10 object-cover"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#f4ede4' }}>
                Para que serve,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  dose, validade e custo.
                </span>
              </h2>
              <div className="space-y-6">
                {ITENS_ESSENCIAIS.map((it) => (
                  <motion.div
                    key={it.n}
                    {...fade(0)}
                    className="rounded-2xl p-6 md:p-8"
                    style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}
                  >
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-sm font-black" style={{ color: '#e8a36b' }}>{it.n}</span>
                      <h3 className="text-xl md:text-2xl font-black leading-tight" style={{ color: '#f4ede4' }}>{it.nome}</h3>
                    </div>
                    <p className="text-base leading-relaxed font-light mb-4" style={{ color: 'rgba(244,237,228,0.85)' }}>
                      {it.paraQue}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex gap-2">
                        <Droplets size={16} className="shrink-0 mt-0.5" style={{ color: '#e8a36b' }} />
                        <span style={{ color: 'rgba(244,237,228,0.75)' }}><strong style={{ color: '#e8a36b' }}>Dose usual:</strong> {it.dose}</span>
                      </div>
                      <div className="flex gap-2">
                        <Box size={16} className="shrink-0 mt-0.5" style={{ color: '#e8a36b' }} />
                        <span style={{ color: 'rgba(244,237,228,0.75)' }}><strong style={{ color: '#e8a36b' }}>Armazenar:</strong> {it.armazenamento}</span>
                      </div>
                      <div className="flex gap-2">
                        <Thermometer size={16} className="shrink-0 mt-0.5" style={{ color: '#e8a36b' }} />
                        <span style={{ color: 'rgba(244,237,228,0.75)' }}><strong style={{ color: '#e8a36b' }}>Validade:</strong> {it.validade}</span>
                      </div>
                      <div className="flex gap-2">
                        <Wallet size={16} className="shrink-0 mt-0.5" style={{ color: '#e8a36b' }} />
                        <span style={{ color: 'rgba(244,237,228,0.75)' }}><strong style={{ color: '#e8a36b' }}>Custo:</strong> {it.custo}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Kit mínimo x kit completo */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 03
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Kit mínimo x kit completo
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Comece pequeno,{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  cresça com critério.
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-2xl p-8" style={{ backgroundColor: '#ece2d3' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <Package size={22} style={{ color: '#b45836' }} />
                    <h3 className="text-xl font-black" style={{ color: '#0e3b3a' }}>Kit mínimo (8 itens)</h3>
                  </div>
                  <ul className="space-y-3">
                    {KIT_MINIMO.map((k) => (
                      <li key={k} className="flex items-center gap-3 text-base font-light" style={{ color: '#2d3a37' }}>
                        <CheckCircle2 size={16} style={{ color: '#b45836' }} className="shrink-0" /> {k}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm font-semibold" style={{ color: '#5a6664' }}>Investimento aproximado: R$ 150 a R$ 280.</p>
                </div>
                <div className="rounded-2xl p-8" style={{ backgroundColor: '#0e3b3a' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <Package size={22} style={{ color: '#e8a36b' }} />
                    <h3 className="text-xl font-black" style={{ color: '#f4ede4' }}>Kit completo (15 itens +)</h3>
                  </div>
                  <ul className="space-y-3">
                    {KIT_COMPLETO.map((k) => (
                      <li key={k} className="flex items-center gap-3 text-base font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                        <CheckCircle2 size={16} style={{ color: '#e8a36b' }} className="shrink-0" /> {k}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm font-semibold" style={{ color: '#e8a36b' }}>Investimento aproximado: R$ 400 a R$ 650.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Organização física do armário */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                  Capítulo 04
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(244,237,228,0.7)' }}>
                  Organização física do armário
                </p>
                <img
                  src={argilaImg}
                  alt="Argila em pó natural em recipiente, item guardado na zona seca do armário de farmácia caseira"
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="w-full rounded-2xl mt-10 object-cover"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#f4ede4' }}>
                Quatro zonas,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  zero bagunça.
                </span>
              </h2>
              <div className="space-y-6">
                {ORGANIZACAO.map((o) => (
                  <div key={o.titulo} className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                    <h3 className="text-lg md:text-xl font-black mb-3" style={{ color: '#f4ede4' }}>{o.titulo}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{o.texto}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Onde comprar sem fraude */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 05
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Onde comprar sem fraude
                </p>
                <img
                  src={carvaoImg}
                  alt="Carvão ativado em pó, item que exige atenção à validade e à procedência no momento da compra"
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="w-full rounded-2xl mt-10 object-cover"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Procedência{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  importa mais que preço.
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {ONDE_COMPRAR.map((o) => (
                  <div key={o.titulo} className="rounded-2xl p-6" style={{ backgroundColor: '#ece2d3' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <ShoppingBag size={18} style={{ color: '#b45836' }} />
                      <h3 className="text-base md:text-lg font-black" style={{ color: '#0e3b3a' }}>{o.titulo}</h3>
                    </div>
                    <p className="text-sm leading-relaxed font-light" style={{ color: '#2d3a37' }}>{o.texto}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl p-8" style={{ backgroundColor: '#0e3b3a' }}>
                <div className="flex items-center gap-3 mb-5">
                  <ShieldCheck size={22} style={{ color: '#e8a36b' }} />
                  <h3 className="text-xl font-black" style={{ color: '#f4ede4' }}>Sinais de fraude a evitar</h3>
                </div>
                <ul className="space-y-3">
                  {SINAIS_FRAUDE.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-base font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                      <XCircle size={16} style={{ color: '#e8a36b' }} className="shrink-0 mt-1" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Checklist imprimível */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 06
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Checklist imprimível
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Cole na porta{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  do armário.
                </span>
              </h2>
              <div className="rounded-2xl p-8 md:p-10 bg-white/60">
                <div className="flex items-center gap-3 mb-6">
                  <ClipboardList size={22} style={{ color: '#b45836' }} />
                  <p className="text-sm uppercase tracking-[0.2em] font-bold" style={{ color: '#5a6664' }}>
                    Checklist dos 18 pontos essenciais
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {CHECKLIST.map((c) => (
                    <label key={c} className="flex items-start gap-3 text-base font-light cursor-pointer" style={{ color: '#2d3a37' }}>
                      <input type="checkbox" className="mt-1.5 w-4 h-4 accent-[#b45836]" />
                      {c}
                    </label>
                  ))}
                </div>
                <p className="mt-8 text-sm font-semibold" style={{ color: '#5a6664' }}>
                  Selecione tudo com o navegador e imprima, ou copie o texto para um bloco de notas. Revise a cada 3 meses.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Erros comuns */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 07
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Erros comuns
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                O que quase todo mundo{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  faz errado.
                </span>
              </h2>
              <div className="space-y-4">
                {ERROS_COMUNS.map((e, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-2xl p-6" style={{ backgroundColor: '#ece2d3' }}>
                    <AlertTriangle size={20} className="shrink-0 mt-0.5" style={{ color: '#b45836' }} />
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{e}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Perguntas frequentes
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight" style={{ color: '#f4ede4' }}>
                Antes de montar,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  tire a dúvida certa.
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
                    style={{ backgroundColor: '#f4ede4', boxShadow: open ? '0 8px 24px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.08)' }}
                  >
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-500" style={{ color: '#b45836', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5, ease: APPLE_EASE }} className="px-6 md:px-8 pb-8">
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Um armário{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  é só o começo da autonomia.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  to: '/soberania-organica/fitoterapia-aplicada',
                  titulo: 'Fitoterapia Aplicada',
                  texto: 'Protocolos completos por sistema do corpo: respiratório, digestivo, nervoso, muscular e imunológico.',
                  icon: Leaf,
                },
                {
                  to: '/soberania-organica/babosa-acemannan',
                  titulo: 'Babosa & Acemannan',
                  texto: 'O dossiê completo sobre composição, estudos e uso da babosa, item presente na sua farmácia caseira.',
                  icon: Leaf,
                },
                {
                  to: '/soberania-organica/primeiros-socorros',
                  titulo: 'Primeiros Socorros',
                  texto: 'O que fazer nos primeiros minutos de uma emergência real, antes e além da farmácia caseira.',
                  icon: ShieldCheck,
                },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group p-8 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <c.icon size={22} className="mb-4" style={{ color: '#e8a36b' }} />
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
