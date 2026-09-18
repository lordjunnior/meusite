import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Zap } from 'lucide-react';
import { Droplets } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { Thermometer } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { Wind } from 'lucide-react';
import { Layers } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/fogo-hero.webp';
import imgUmido from '@/assets/saida/fogo-umido.webp';
import imgDiscreto from '@/assets/saida/fogo-discreto.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

interface Metodo {
  num: string;
  nome: string;
  contexto: string;
  passos: string[];
  falhas: string;
  icon: typeof Zap;
}

const METODOS: Metodo[] = [
  {
    num: '01',
    nome: 'Ferro Rod (Ferrocério)',
    contexto: 'Método primário. Funciona molhado, em altitude, com luvas, no escuro. Vida útil: 12.000+ ignições. Custo: USD 18 a 35.',
    icon: Zap,
    passos: [
      'Prepare o tinder antes. Algodão com vaselina, charcloth, cordão de fibra natural desfiado, casca de eucalipto seca. Sem tinder, ferro rod gera só luz.',
      'Posicione a lâmina (costas da faca, raspador serrilhado ou backup metálico) em ângulo de 45° contra o ferro rod.',
      'Mantenha o ferro rod firme contra o tinder. Mova a lâmina, não o ferro rod. Movimento curto e decisivo, 3 a 5 cm.',
      'Direcione as faíscas (3000 °C) diretamente sobre o tinder. Não para o ar, não para o lado.',
      'Após faísca pegar, sopre baixo e firme na base. Adicione gravetos finos progressivamente: pena de pinheiro, depois palitos de fósforo, depois lápis.',
    ],
    falhas: 'Erro fatal: usar tinder úmido ou genérico (folha verde, papel, capim molhado). Erro de movimento: empurrar o ferro rod contra a lâmina arrasta o tinder e desorganiza a pirâmide de gravetos.',
  },
  {
    num: '02',
    nome: 'Pederneira e Aço Carbono',
    contexto: 'Método ancestral. Pedra de sílex/quartzo + aço alto teor de carbono (lima velha, parte traseira de faca de carbono). Funciona indefinidamente. Custo: USD 0 a 25.',
    icon: Layers,
    passos: [
      'Use charcloth como tinder primário. Pano de algodão queimado em recipiente fechado vira o melhor receptor de centelha do mundo.',
      'Segure a pedra com a aresta viva voltada para cima, charcloth pressionado contra a aresta com o polegar.',
      'Bata o aço de cima para baixo contra a aresta da pedra em movimento de raspagem (não martelada). Ângulo de 30°.',
      'A centelha cai sobre o charcloth e gera ponto de brasa. Sopre suave para expandir.',
      'Transfira a brasa para um ninho de tinder fino (fibra de coco seca, capim seco esfregado, casca de bambu raspada). Sopre firme até chama.',
    ],
    falhas: 'Erro 1: aço inox (304/316) não gera centelha — só carbono. Erro 2: tinder errado, charcloth não pode estar molhado. Erro 3: bater de baixo para cima desperdiça a centelha no ar.',
  },
  {
    num: '03',
    nome: 'Lente Solar (Vidro, Acrílico, Gelo)',
    contexto: 'Método silencioso, sem fumaça, sem rastro químico. Requer sol direto. Útil em fuga discreta. Custo: USD 0 a 10.',
    icon: Flame,
    passos: [
      'Selecione a lente. Lente Fresnel de cartão (em loja de óptica), lupa de bolso, fundo de garrafa transparente cheia de água, lente de óculos hipermetropes (positivo).',
      'Monte um ninho de tinder negro: papel queimado, charcloth, fibra de coco torrada. Cor escura absorve calor mais rápido.',
      'Posicione a lente perpendicular ao sol e ajuste a distância até obter o ponto de luz menor possível (foco máximo).',
      'Mantenha o ponto fixo sobre o tinder por 15 a 60 segundos. Sem tremer. Apoie cotovelo no joelho.',
      'Quando aparecer fumaça, sopre baixo. A brasa formada precisa ser transferida para ninho maior em 30 segundos.',
    ],
    falhas: 'Erro 1: usar lente em sol parcial ou nebuloso, não funciona. Erro 2: tinder claro reflete em vez de absorver. Erro 3: tremer durante aquecimento dispersa o foco e zera a temperatura.',
  },
  {
    num: '04',
    nome: 'Bateria + Palha de Aço (#0000)',
    contexto: 'Improviso urbano em apagão. Pilha 9V ou bateria de celular Li-Ion + palha de aço fina gera ignição em 2 segundos. Custo: USD 2.',
    icon: Zap,
    passos: [
      'Use palha de aço grau #0000 (mais fina possível, vendida em ferragens). Palha grossa não pega.',
      'Estique uma fita fina da palha (10 cm) e apoie sobre o tinder seco preparado.',
      'Encoste simultaneamente os dois terminais da bateria (positivo e negativo) na palha. Curto-circuito gera resistência e brasa instantânea.',
      'Bateria de celular Li-Ion: extraia com cuidado, perfure suavemente, encoste fios. Cuidado: vapor tóxico, ventile.',
      'Após brasa, sopre baixo. Adicione gravetos finos. Descarte a palha usada (queima rápido demais para sustentar fogo).',
    ],
    falhas: 'Erro 1: palha grossa (#1, #2) não pega. Erro 2: bateria descarregada não gera corrente suficiente. Erro 3: perfurar Li-Ion sem ventilação intoxica em ambiente fechado.',
  },
  {
    num: '05',
    nome: 'Fricção Direta (Bow Drill)',
    contexto: 'Método primitivo de último recurso. Sem ferramentas industrializadas. Requer treino prévio (centenas de tentativas). Útil para fuga prolongada sem suprimentos.',
    icon: Wind,
    passos: [
      'Selecione madeira mole e seca para o board (cedro, salgueiro, sabugueiro) e madeira dura para o spindle (carvalho, jequitibá).',
      'Talhe o board com entalhe em V conectando o orifício circular à borda. Posicione folha seca por baixo para receber a brasa.',
      'Monte o arco com galho flexível e cordão (paracord, sisal, fibra natural torcida). O cordão dá uma volta no spindle.',
      'Pressione o spindle contra o board com mão livre (segurando uma pedra côncava por cima como cabeçote) e movimente o arco em vai e vem rápido e constante.',
      'Após 1 a 3 minutos, pó incandescente acumula no entalhe. Quando virar brasa, transfira para ninho de tinder e sopre.',
    ],
    falhas: 'Erro 1: madeira do board ou spindle úmida. Erro 2: cordão frouxo, não rotaciona o spindle com força. Erro 3: pressão insuficiente ou velocidade irregular do arco. Treine antes do colapso, não durante.',
  },
];

const FOGO_UMIDO = [
  {
    titulo: 'Feather Stick',
    desc: 'Galho seco descascado por dentro. Use a faca para fazer 30 a 50 raspas curvas, mantendo-as presas ao galho como uma pena. A superfície interna seca acende mesmo com chuva.',
  },
  {
    titulo: 'Fatwood (Lascas Resinosas)',
    desc: 'Cerne resinoso de pinheiro morto (base de tocos antigos). Acende molhado. Uma lasca de 10 cm queima 8 a 12 minutos. Estoque permanente em mochila tática.',
  },
  {
    titulo: 'Algodão + Vaselina',
    desc: 'Bola de algodão saturada com vaselina petrolato. Queima 4 a 7 minutos mesmo molhada. Custo: USD 0,15 por ignição. Armazenar em latinha de alumínio vedada.',
  },
  {
    titulo: 'Casca de Bétula / Eucalipto',
    desc: 'A casca externa contém óleo natural inflamável. Acende mesmo úmida. Eucalipto é abundante no Brasil. Colha somente a casca solta, não fira a árvore.',
  },
  {
    titulo: 'Plataforma Elevada',
    desc: 'Em solo encharcado, construa base com 4 a 6 galhos paralelos para isolar o fogo da umidade. Sem isso, o calor da brasa volta para o solo e mata a chama.',
  },
  {
    titulo: 'Refletor Térmico',
    desc: 'Parede improvisada com pedras, galhos verdes ou manta térmica espelhada atrás do fogo. Aumenta a temperatura útil em 30 a 45 % e protege da chuva lateral.',
  },
];

const DISCRICAO = [
  {
    titulo: 'Dakota Fire Hole',
    desc: 'Dois orifícios no solo conectados por túnel. Um para combustão, outro para entrada de ar. Chama escondida abaixo do nível do solo, fumaça mínima, brasa invisível à distância. Padrão militar.',
  },
  {
    titulo: 'Hobo Stove (Lata de Aço)',
    desc: 'Lata de leite em pó (ou similar) com furos na base e laterais. Fogo contido, combustão eficiente, controla luz e fumaça. Uso interno em apagão (com ventilação) ou externo em fuga.',
  },
  {
    titulo: 'Combustível Limpo',
    desc: 'Madeira seca dura (eucalipto, ipê seco) gera quase zero fumaça. Evite verde, resinoso ou úmido em cenário discreto. Álcool gel queima sem fumaça mas com cheiro fraco — boa opção interna.',
  },
  {
    titulo: 'Operação Noturna',
    desc: 'Fogo à noite é visível a quilômetros. Em fuga real, cozinhe ao amanhecer (4 a 6h) ou crepúsculo, quando luz ambiente camufla a chama. Apague antes da escuridão total.',
  },
  {
    titulo: 'Camuflagem de Local',
    desc: 'Após uso: dispersar cinza, soterrar carvão, devolver folhagem ao topo. Cratera de fogo identifica passagem por 3 a 6 meses para rastreador treinado.',
  },
  {
    titulo: 'Vela de Emergência',
    desc: 'Em apartamento durante apagão: vela de longa duração (Yankee, parafina pura, 60 a 100 h) gera luz e calor mínimo sem fumaça nem cheiro. Combinada com refletor de papel alumínio aquece 6 m².',
  },
];

const TERMICA = [
  {
    titulo: 'Camada Base · Roupa',
    desc: 'Lã merino ou polipropileno (não algodão). Algodão molha, perde isolamento e mata por hipotermia. Princípio: 3 camadas (base, isolamento, shell impermeável).',
  },
  {
    titulo: 'Manta Térmica Mylar',
    desc: 'Reflete 90 % do calor corporal. USD 3, 50 g, cabe na carteira. Use envolvendo o corpo por dentro do casaco ou como refletor atrás de fogo. Durabilidade: 1 a 3 usos.',
  },
  {
    titulo: 'Saco de Dormir Tático',
    desc: 'Bag classificado para -5 °C ou inferior. Mesmo no calor brasileiro, noite em altitude (Serra da Mantiqueira, Itatiaia, sul) cai abaixo de 5 °C. Modelo bivy resistente a água: 600 a 1200 g.',
  },
  {
    titulo: 'Vela + Vaso de Barro',
    desc: 'Em apartamento sem aquecimento: 4 velas longas dentro de vaso de barro invertido sobre suporte. Aquece ar circundante em 3 a 6 °C por 4 horas. Mito: o vaso não vira aquecedor real, mas reduz desconforto.',
  },
  {
    titulo: 'Pedra Aquecida',
    desc: 'Pedra grande aquecida no fogo, embrulhada em pano grosso, vai para o saco de dormir 30 min antes. Aquece o interior por 4 a 6 horas. Cuidado: pedra de rio rachada pode explodir.',
  },
  {
    titulo: 'Brasa Sobre Cinza',
    desc: 'Em apagão noturno prolongado: brasa coberta por cinza no fundo de panela de ferro mantém calor por 8 a 12 h e reacende ao amanhecer com sopro. Técnica andina e nórdica.',
  },
];

const SEGURANCA = [
  'Triângulo do fogo: combustível, oxigênio, calor. Quebre qualquer um e o fogo morre. Em incêndio doméstico, cobrir panela com tampa abafa em 5 segundos sem espalhar gordura.',
  'Extintores domésticos: ABC (pó químico) é o único que cobre sólidos, líquidos inflamáveis e elétricos. Tenha 1 por andar. Validade: 5 anos. Inspecione manômetro mensal.',
  'Cozinha: nunca jogue água em incêndio de óleo. Vapor explode gotículas de gordura para todo lado. Use tampa, sal grosso ou bicarbonato para abafar.',
  'Eletrodoméstico em chamas: desligue disjuntor antes de qualquer ação. Água em equipamento ligado eletrocuta. Pó químico ABC ou abafamento com manta de fogo (USD 25).',
  'Fumaça mata antes do fogo. 3 a 5 inalações em ambiente fechado já são fatais. Saia rastejando (ar mais limpo perto do chão), porta fechada atrás de você atrasa propagação 15 a 30 min.',
  'Detector de fumaça: 1 por dormitório + 1 por andar + 1 perto da cozinha (não dentro). Pilha trocada anualmente. Custo: USD 8 a 25 por unidade.',
  'Saída de emergência: planeje 2 rotas por cômodo. Pratique evacuação em 90 segundos. Em apartamento: nunca use elevador, escada de incêndio é obrigatória.',
  'Ponto de encontro: defina local externo (poste específico, esquina) onde a família se reúne após evacuação. Sem ponto definido, todos voltam para procurar quem ficou.',
];

const ERROS = [
  'Acender fogo dentro de barraca ou tenda fechada. Monóxido de carbono mata em 30 a 90 min sem aviso. Use só em ambiente ventilado.',
  'Estocar combustível líquido (gasolina, álcool) em garagem residencial sem ventilação. Vapor é mais explosivo que o líquido.',
  'Deixar fogo de bivouac aceso ao dormir. Brasa solta queima floresta inteira. Sempre apague com água ou terra antes de descansar.',
  'Usar gasolina para acelerar fogueira. Vapor inflama instantaneamente, queimadura de 2º e 3º grau na face e mãos. Use apenas tinder seco e técnica.',
  'Ignorar a direção do vento ao acender. Centelha leva fogo para áreas indesejadas. Sempre acenda com vento contra você, fogo afastado.',
  'Confiar em isqueiro Bic como sistema único. Falha em altitude, frio extremo, umidade. Sempre tenha 3 métodos: ferro rod (primário), isqueiro à prova d\u2019água (secundário), pederneira ou lente solar (terciário).',
];

const FAQ = [
  {
    q: 'Qual é o melhor método de ignição se eu só posso ter um?',
    a: 'Ferro rod (ferrocério). Funciona molhado, no frio, em altitude, com luvas, no escuro. Vida útil: 12.000+ ignições por bastão. Custo: USD 18 a 35. Modelos validados: Light My Fire Scout 2.0, Exotac nanoStriker XL, Überleben Zünden. Mas a regra do EDC é: nunca confie em apenas um sistema. Carregue ferro rod + isqueiro à prova d\u2019água + pederneira de backup.',
  },
  {
    q: 'Como acender fogo em chuva forte sem ter fatwood ou algodão com vaselina?',
    a: 'Procure madeira morta em pé (não no chão). Tronco vertical seca por dentro mesmo em chuva. Corte galho de 5 cm de diâmetro, descasque, faça feather stick com a parte interna seca. Use casca de eucalipto, bétula ou pinheiro como tinder. Construa plataforma elevada com 6 a 8 gravetos paralelos. Acenda com ferro rod direto na pena de feather stick. Em último caso, sacrifique 1 cm de paracord interno (cordão branco fino) — queima 3 minutos mesmo molhado.',
  },
  {
    q: 'Fogo dentro de apartamento em apagão é seguro?',
    a: 'Apenas com hobo stove de aço, sob coifa ligada (gerador) ou janela aberta com fluxo cruzado. Combustível: álcool gel ou madeira dura seca em pequena quantidade. Nunca: carvão (CO letal), gasolina (vapor explosivo), fogo aberto sem contenção. Alternativa segura: fogareiro a álcool gel comercial (USD 30, queima 90 min) + panela de fundo grosso. Detector de CO obrigatório no ambiente: USD 25.',
  },
  {
    q: 'Quantos métodos de ignição devo carregar no EDC?',
    a: 'Mínimo 3, princípio PACE (Primary, Alternate, Contingency, Emergency). Primário: isqueiro à prova d\u2019água (Zippo, Soto Pocket Torch). Alternativo: ferro rod com raspador. Contingência: pederneira pequena de bolso. Emergência: lente Fresnel de cartão (cabe na carteira). Total: peso 80 g, custo USD 60 a 90, ocupa zero espaço útil.',
  },
  {
    q: 'Como faço charcloth em casa?',
    a: 'Recipiente metálico fechado (latinha de chá Twinings ou similar) com 1 furo pequeno na tampa. Recheie com pano 100% algodão cortado em quadrados de 5 cm. Coloque sobre fogo médio por 8 a 12 min. Quando parar de sair fumaça do furo, retire, deixe esfriar fechada. Resultado: tecido preto, frágil, pega centelha instantânea. Armazene em recipiente seco. Validade: anos.',
  },
  {
    q: 'Vela aquece ambiente fechado de verdade?',
    a: 'Parcialmente. 1 vela tealight gera 30 a 40 W. Para aquecer 6 m² em +3 a +5 °C precisa de 4 a 6 velas em recipiente refratário (vaso de barro, pote de cerâmica). Não substitui aquecedor. Usar como complemento de manta térmica e isolamento de portas/janelas. Mito do vaso de barro como aquecedor: vaso aquece e irradia, mas energia total não muda. Vantagem real: distribui calor uniformemente em vez de concentrar no teto.',
  },
  {
    q: 'Qual extintor doméstico devo ter?',
    a: 'ABC pó químico de 4 a 6 kg, 1 por andar, próximo a saída (não dentro do cômodo de risco). Cobre sólidos (madeira, papel), líquidos (óleo, álcool) e elétricos (computador, eletrodoméstico). Validade: 5 anos. Recarga: USD 30 a 50. Custo unitário: USD 40 a 70. Adicional para cozinha: manta de fogo (USD 20 a 30) abafa panela de óleo em 3 segundos.',
  },
  {
    q: 'Como armazenar gasolina ou álcool em casa com segurança?',
    a: 'Galão metálico homologado UN (não plástico genérico), válvula de alívio de pressão. Volume máximo doméstico: 25 L gasolina, 50 L álcool, conforme NR-20. Local: ventilação cruzada, longe de chama, fonte de ignição e luz solar direta. Distância de moradia: 5 m mínimo. Estabilizador: STA-BIL (USD 10) prolonga validade da gasolina de 6 meses para 24. Álcool: validade indefinida em recipiente fechado.',
  },
];

const CHECKLIST = [
  'Dia 1-3: Audite o que tem em casa. Conte isqueiros funcionais, fósforos, velas, extintor, detector de fumaça, manta térmica.',
  'Dia 4-7: Compre kit base. 2 ferro rods (1 EDC, 1 mochila), 1 lente Fresnel de cartão, 50 algodões com vaselina em latinha, 1 extintor ABC 4 kg.',
  'Dia 8-14: Treine ignição com ferro rod. 30 ignições mínimo até dominar movimento. Teste em algodão/vaselina, depois em feather stick, depois em casca.',
  'Dia 15-20: Faça charcloth caseiro. Estoque em 3 latinhas vedadas (casa, mochila, carro). Custo: USD 0, leva 30 min.',
  'Dia 21-25: Pratique fogo em chuva simulada (regador no quintal). Aprenda feather stick, plataforma elevada, fatwood. Errar agora, não no colapso.',
  'Dia 26-30: Treine extinção. Tampa em panela de óleo, manta de fogo em chama controlada, uso correto de extintor (puxar pino, mirar base, apertar, varrer).',
  'Mês 2: Adicione redundância. Lente Fresnel, pederneira backup, hobo stove improvisado, vela de longa duração para apagão.',
  'Mês 3: Plano de evacuação familiar. 2 rotas por cômodo, ponto de encontro, simulado mensal cronometrado (meta: 90 segundos).',
  'Trimestral: Verifique extintor (manômetro verde), troque pilha de detector de fumaça anual, reponha algodão/vaselina consumido, afie raspador do ferro rod.',
  'Anual: Recarga de extintor se acionado, atualização de plano com mudanças na família, treino completo de ignição em 5 métodos diferentes.',
];

export default function ProtocoloFogo() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-organica/protocolo-fogo"
        custom={{
          title: 'Protocolo de Fogo: Ignição Sem Isqueiro, Fogo Úmido, Discreto e Térmica em Apagão',
          description: 'Manual completo de fogo tático: 5 métodos de ignição sem isqueiro, fogo em chuva, fogo discreto, manutenção térmica em apagão prolongado e segurança contra incêndio doméstico.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/protocolo-fogo',
          primaryKeyword: 'protocolo de fogo',
          lsiKeywords: ['como acender fogo sem isqueiro', 'ferro rod', 'pederneira', 'fogo na chuva', 'fogo discreto', 'aquecimento em apagão', 'segurança contra incêndio'],
          longTailKeywords: ['como fazer fogo sem isqueiro em chuva', 'ferro rod como usar', 'fogo discreto sem fumaça', 'aquecimento de emergência apartamento apagão', 'extintor doméstico qual comprar'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Protocolo de Fogo', url: '/soberania-organica/protocolo-fogo' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/kit-72h', '/soberania-organica/edc', '/soberania-organica/protocolos-apagao', '/soberania-organica/abrigo-emergencia'],
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
          phase="Soberania Orgânica · Resiliência Tática"
          title={
            <>
              Protocolo de Fogo:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">a primeira tecnologia humana, a última que você pode esquecer</span>
            </>
          }
          subtitle="Fogo é água quente, comida cozida, cauterização, sinalização, defesa contra hipotermia, esterilização. Quem depende de isqueiro Bic e fósforo de supermercado descobre, no apagão, que o sistema mais antigo do planeta foi terceirizado. Aqui você reconquista cinco métodos, fogo em chuva, fogo discreto, manutenção térmica e segurança doméstica."
          icon={Flame}
          accentColor="amber"
          backLink="/soberania-organica"
          backLabel="Soberania Orgânica"
        />

        {/* CAPÍTULO 1 */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)}>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-5">Capítulo 01</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 mb-8 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              O fogo é infraestrutura,{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">não conforto recreativo.</span>
            </h2>
            <div className="space-y-6 text-stone-300 text-lg leading-relaxed font-light max-w-3xl">
              <p>
                Quem cresceu com fogão a gás, isqueiro descartável, fósforo de papelaria e vela de aniversário desaprendeu a primeira tecnologia que separou o ser humano do resto dos primatas. Em apagão de 72 horas, em fuga rural, em colapso urbano de utilidades, esse esquecimento mata. Não por fogo, por hipotermia, por água contaminada não fervida, por comida crua que apodrece, por sinalização ausente em busca e resgate.
              </p>
              <p>
                Fogo é sistema. Tem combustível, ignição, oxigênio, controle térmico, contenção, descarte. Cada elemento falha de forma específica e cada falha tem solução técnica conhecida há séculos. Esta página reorganiza o conhecimento em cinco frentes operacionais: ignição sem isqueiro, fogo em ambiente úmido, fogo discreto, manutenção térmica em apagão prolongado e segurança contra incêndio doméstico.
              </p>
              <p className="text-stone-100 italic font-serif text-xl border-l-2 border-amber-500/40 pl-6">
                Quem depende do isqueiro de boteco depende da fábrica que produz o isqueiro, da rede que distribui, do banco que paga, do estado que regula. Quem domina ferro rod e charcloth depende de duas pedras e de um gesto.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CAPÍTULO 2 — 5 MÉTODOS DE IGNIÇÃO */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 02</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Cinco métodos de ignição{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">que funcionam quando o isqueiro falha.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Princípio PACE militar: Primário, Alternativo, Contingência, Emergência. Treine os cinco métodos antes do colapso. Em momento real, você usa o que dominou, não o que comprou.
            </p>
          </motion.div>

          <div className="space-y-10">
            {METODOS.map((m, i) => (
              <motion.div
                key={m.num}
                {...fade(i * 0.05)}
                className="rounded-sm border border-stone-800 bg-stone-950/60 p-6 md:p-10 hover:border-amber-500/30 transition-all duration-500"
              >
                <div className="grid md:grid-cols-12 gap-6 mb-8 pb-8 border-b border-stone-800">
                  <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                    <span className="text-7xl md:text-8xl font-black text-amber-400/90 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {m.num}
                    </span>
                    <div className="p-2.5 rounded bg-amber-500/[0.08] border border-amber-500/20 inline-flex">
                      <m.icon size={20} className="text-amber-400" />
                    </div>
                  </div>
                  <div className="md:col-span-9 space-y-3">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-stone-100 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {m.nome}
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed font-light italic">{m.contexto}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-7">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400 mb-4">Sequência operacional</p>
                    <ol className="space-y-3">
                      {m.passos.map((p, idx) => (
                        <li key={idx} className="flex gap-3 text-stone-300 text-sm leading-relaxed font-light">
                          <span className="text-amber-400 font-mono text-xs font-bold pt-0.5 flex-shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 mb-4">Modos de falha</p>
                    <div className="p-4 rounded-sm bg-red-950/20 border border-red-900/40">
                      <p className="text-stone-300 text-sm leading-relaxed font-light">{m.falhas}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM ÚMIDO */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[480px] md:h-[620px] border border-stone-900">
            <img
              src={imgUmido}
              alt="Fogo aceso sob chuva leve sobre pedra molhada com feather stick de madeira úmida, fatwood resinoso e algodão com vaselina pegando fogo, fotografia documental cinematográfica em tons frios."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.2) 50%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Capítulo 03 · Fogo Úmido</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Chuva não apaga fogo. Técnica errada apaga.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 3 — FOGO ÚMIDO */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 03</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Fogo úmido:{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">seis técnicas para chuva, garoa e solo encharcado.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Em ambiente molhado, ignição não é o problema, é a manutenção. A combinação certa de tinder, plataforma e refletor mantém chama mesmo em garoa contínua.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FOGO_UMIDO.map((f, i) => (
              <motion.div
                key={f.titulo}
                {...fade(i * 0.04)}
                className="group rounded-sm border border-amber-500/15 bg-stone-950/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/35"
              >
                <div className="p-2.5 rounded bg-amber-500/[0.08] border border-amber-500/20 inline-flex mb-4">
                  <Droplets size={18} className="text-amber-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-stone-100 leading-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {f.titulo}
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed font-light">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM DISCRETO */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[480px] md:h-[620px] border border-stone-900">
            <img
              src={imgDiscreto}
              alt="Hobo stove de aço improvisado em apartamento durante apagão, com chama controlada, kettle de aço inox aquecendo água e manta de lã ao lado, fotografia noir cinematográfica."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.2) 50%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Capítulo 04 · Fogo Discreto</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Fogo que aquece e não denuncia. Apartamento, mata, fuga.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 4 — DISCRIÇÃO */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 04</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Fogo discreto:{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">controlar luz, fumaça e cheiro.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Em fuga ou em apartamento durante apagão, fogo aberto é assinatura. Estas seis técnicas reduzem assinatura visual, térmica e olfativa.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DISCRICAO.map((d, i) => (
              <motion.div
                key={d.titulo}
                {...fade(i * 0.04)}
                className="group rounded-sm border border-amber-500/15 bg-stone-950/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/35"
              >
                <div className="p-2.5 rounded bg-amber-500/[0.08] border border-amber-500/20 inline-flex mb-4">
                  <EyeOff size={18} className="text-amber-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-stone-100 leading-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {d.titulo}
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed font-light">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 5 — TÉRMICA */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 05</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Manutenção térmica{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">em apagão prolongado.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Fogo aquece. Mas o sistema completo de defesa térmica combina vestuário, isolamento, refletor e brasa controlada. Hipotermia mata silenciosamente abaixo de 35 °C corporal.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TERMICA.map((t, i) => (
              <motion.div
                key={t.titulo}
                {...fade(i * 0.04)}
                className="group rounded-sm border border-amber-500/15 bg-stone-950/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/35"
              >
                <div className="p-2.5 rounded bg-amber-500/[0.08] border border-amber-500/20 inline-flex mb-4">
                  <Thermometer size={18} className="text-amber-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-stone-100 leading-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {t.titulo}
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed font-light">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 6 — SEGURANÇA DOMÉSTICA */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 06</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Segurança contra incêndio{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">doméstico.</span>
            </h2>
            <p className="text-stone-400 text-base leading-relaxed font-light max-w-3xl">
              Quem domina ignição precisa dominar extinção. Oito regras que separam pequeno susto de tragédia familiar.
            </p>
          </motion.div>

          <div className="space-y-3">
            {SEGURANCA.map((s, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.03)}
                className="flex gap-4 p-5 rounded-sm bg-stone-950/60 border border-stone-800 hover:border-amber-500/30 transition-all duration-500"
              >
                <ShieldAlert size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-stone-300 text-sm leading-relaxed font-light">{s}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 7 — ERROS FATAIS */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-red-400 font-bold block mb-4">Capítulo 07</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Seis erros fatais{' '}
              <span className="italic font-serif text-red-400 font-light normal-case tracking-tight">que matam mais que o próprio fogo.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {ERROS.map((e, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.04)}
                className="flex gap-4 p-5 rounded-sm bg-red-950/15 border border-red-900/40 hover:border-red-700/60 transition-all duration-500"
              >
                <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-stone-300 text-sm leading-relaxed font-light">{e}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 8 — CHECKLIST */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 08</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Checklist 30 dias{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">para reconquistar o fogo.</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {CHECKLIST.map((c, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.03)}
                className="flex gap-4 p-5 rounded-sm bg-stone-950/60 border border-stone-800 hover:border-amber-500/30 transition-all duration-500"
              >
                <CheckCircle2 size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-stone-300 text-sm leading-relaxed font-light">{c}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-12 text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Dúvidas Operacionais</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Perguntas frequentes
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.03)}
                className="rounded-sm border border-stone-800 bg-stone-950/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-stone-900/60 transition-colors"
                >
                  <span className="text-stone-100 text-base font-medium leading-snug">{f.q}</span>
                  <ChevronDown size={18} className={`text-amber-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-1">
                    <p className="text-stone-300 text-sm leading-relaxed font-light">{f.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="rounded-sm border border-amber-500/30 bg-gradient-to-br from-stone-950 via-stone-950 to-amber-950/20 p-8 md:p-14 text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Próximo Movimento</span>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-stone-100 leading-[0.95] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Fogo é o primeiro passo.{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">Água, abrigo e socorro vêm em seguida.</span>
            </h3>
            <p className="text-stone-400 max-w-2xl mx-auto text-base leading-relaxed font-light mb-8">
              O Protocolo de Fogo é um dos pilares da Resiliência Tática. Combine com purificação de água, abrigo de emergência, primeiros socorros e EDC para fechar o sistema.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/soberania-organica/edc" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors">
                EDC Tático <ArrowRight size={14} />
              </Link>
              <Link to="/soberania-organica/kit-72h" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-amber-500/40 text-amber-400 font-bold uppercase tracking-wider text-xs hover:bg-amber-500/10 transition-colors">
                Kit 72h <ArrowRight size={14} />
              </Link>
              <Link to="/soberania-organica/protocolos-apagao" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-stone-700 text-stone-300 font-bold uppercase tracking-wider text-xs hover:border-stone-500 transition-colors">
                Protocolos de Apagão <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
