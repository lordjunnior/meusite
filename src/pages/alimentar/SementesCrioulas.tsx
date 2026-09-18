import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, AlertTriangle, ShieldCheck, Sprout } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/alimentar/sementes-hero.jpg';
import imgBanco from '@/assets/alimentar/sementes-banco.jpg';
import imgExtracao from '@/assets/alimentar/sementes-extracao.jpg';
import imgSecagem from '@/assets/alimentar/sementes-secagem.jpg';
import imgArmazenamento from '@/assets/alimentar/sementes-armazenamento.jpg';
import imgGerminacao from '@/assets/alimentar/sementes-germinacao.jpg';
import imgJardim from '@/assets/alimentar/sementes-jardim.jpg';
import imgTroca from '@/assets/alimentar/sementes-troca.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

// Paleta — terra/folha/grão/colheita
const C = {
  page: 'hsl(36 30% 92%)',
  pageDeep: 'hsl(34 26% 87%)',
  ink: 'hsl(28 32% 14%)',
  body: 'hsl(28 18% 26%)',
  muted: 'hsl(28 10% 44%)',
  earth: 'hsl(22 52% 38%)',
  earthSoft: 'hsl(28 60% 82%)',
  harvest: 'hsl(38 78% 48%)',
  forest: 'hsl(120 22% 18%)',
  forestDeep: 'hsl(120 26% 12%)',
  line: 'hsl(30 14% 72%)',
};

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.10  0 0 0 0 0.05  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const sectionBg = {
  earth: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 65% 55% at 6% 14%, hsl(28 60% 82% / 0.95), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 92% 86%, hsl(22 52% 38% / 0.30), transparent 55%)',
      'radial-gradient(ellipse 40% 35% at 78% 22%, hsl(38 78% 48% / 0.18), transparent 60%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(36 30% 93%), hsl(34 26% 86%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 200px 200px, auto',
  },
  harvest: {
    backgroundColor: C.pageDeep,
    backgroundImage: [
      'radial-gradient(ellipse 70% 55% at 14% 22%, hsl(28 60% 82% / 0.92), transparent 50%)',
      'radial-gradient(ellipse 60% 50% at 88% 78%, hsl(22 52% 38% / 0.30), transparent 55%)',
      'repeating-linear-gradient(115deg, transparent 0, transparent 96px, hsl(22 52% 38% / 0.10) 97px, transparent 98px)',
      noiseSvg,
      'linear-gradient(180deg, hsl(34 28% 89%), hsl(32 24% 84%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 200px 200px, auto',
  },
  forest: {
    backgroundColor: C.forestDeep,
    backgroundImage: [
      'radial-gradient(ellipse 60% 50% at 12% 18%, hsl(22 52% 38% / 0.30), transparent 50%)',
      'radial-gradient(ellipse 55% 45% at 88% 82%, hsl(38 78% 48% / 0.20), transparent 55%)',
      'radial-gradient(circle at 50% 50%, hsl(120 22% 22% / 0.6), transparent 70%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(120 22% 16%), hsl(120 26% 11%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 220px 220px, auto',
  },
  fieldWash: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 65% 50% at 50% 0%, hsl(22 52% 38% / 0.26), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 10% 90%, hsl(38 78% 48% / 0.28), transparent 55%)',
      'radial-gradient(ellipse 50% 40% at 90% 60%, hsl(28 60% 82% / 0.7), transparent 55%)',
      noiseSvg,
      'linear-gradient(180deg, hsl(36 30% 92%), hsl(34 26% 87%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 200px 200px, auto',
  },
};

interface Pilar {
  num: string;
  titulo: string;
  subtitulo: string;
  imagem: string;
  paragrafos: string[];
  praticas: string[];
  tempo: string;
}

const pilares: Pilar[] = [
  {
    num: '01',
    titulo: 'O que é uma semente crioula',
    subtitulo: 'A diferença entre semente que se reproduz e semente que morre na sua mão',
    imagem: imgExtracao,
    paragrafos: [
      'Semente crioula é aquela que foi selecionada por gerações de agricultores na mesma região. Ela carrega o DNA original da planta, sem manipulação industrial, e o mais importante, suas filhas nascem iguais a ela. Você planta hoje, colhe amanhã, e a semente que sai do fruto vira a próxima safra.',
      'Já a semente híbrida (F1) que você compra no agropecuário é projetada para produzir só uma vez bem. Os filhos dela ou nascem fracos, ou nascem diferentes, ou nem nascem. É como um carro vendido sem motor de partida, funciona só na primeira ignição.',
      'A diferença política é brutal. Quem usa híbrida volta toda safra ao balcão para comprar. Quem usa crioula colhe sua própria semente do próprio quintal e nunca mais depende de empresa nenhuma. É a mesma lógica de autocustódia, só que aplicada à comida.',
    ],
    praticas: [
      'Procure feiras de agricultura familiar e bancos comunitários: lá moram as crioulas de verdade.',
      'Pergunte sempre se a variedade é "polinização aberta" (OP). Se a resposta for híbrida ou F1, fuja.',
      'Comece com tomate, feijão, abóbora, milho, alface: as mais fáceis de salvar semente em casa.',
    ],
    tempo: '20 min de pesquisa local',
  },
  {
    num: '02',
    titulo: 'O banco doméstico',
    subtitulo: 'Sua despensa de sementes é tão importante quanto sua despensa de comida',
    imagem: imgBanco,
    paragrafos: [
      'O banco pessoal de sementes é uma caixa, prateleira ou pequeno armário onde você organiza envelopes etiquetados de cada variedade que cultiva. Não precisa ser bonito, precisa ser seco, escuro e fresco.',
      'Pense numa biblioteca pequena: cada envelope é um livro, cada livro contém centenas de futuras refeições da sua família. Vinte variedades bem guardadas são vinte garantias contra a próxima crise alimentar, contra inflação no agropecuário, contra a próxima geada que destrói a colheita do vizinho.',
      'A regra é estoque rotativo. Toda safra você renova parte do banco com sementes recém-colhidas, e usa as antigas como semeio principal. Em três anos seu banco vira um sistema vivo, autossuficiente.',
    ],
    praticas: [
      'Caixa de madeira ou plástico opaco. Luz e umidade são os dois inimigos número um.',
      'Etiquete sempre: nome da variedade, mês e ano da colheita, origem (quem te deu).',
      'Inclua um saquinho de sílica gel ou arroz cru dentro de cada pote para absorver umidade.',
    ],
    tempo: '1h de organização inicial',
  },
  {
    num: '03',
    titulo: 'Extração e fermentação curta',
    subtitulo: 'Tirar a semente do fruto sem matar o embrião',
    imagem: imgSecagem,
    paragrafos: [
      'Para tomate, pepino, melão e abóbora, você abre o fruto maduro, retira as sementes com a polpa, coloca num pote com água e deixa fermentar dois ou três dias. Essa fermentação curta dissolve a camada gelatinosa que envolve a semente e mata fungos da casca.',
      'Pense numa lavagem profunda: a polpa é a sujeira que protege contra mofo no transporte, mas atrapalha a germinação. A fermentação faz o trabalho que a natureza faria no estômago de um animal silvestre que come o fruto e devolve a semente limpa ao solo.',
      'Para feijão, milho, girassol e abóbora, é mais simples ainda: deixa secar na própria planta, colhe quando a vagem ou cabeça está totalmente seca, debulha, e armazena. Cada cultura tem seu jeito, mas todos seguem o princípio: separar a semente da matéria viva que apodrece.',
    ],
    praticas: [
      'Tomate: 3 dias de fermentação a temperatura ambiente, depois lavar e secar em peneira.',
      'Feijão: deixar secar na planta até a vagem chocalhar quando agitada.',
      'Sempre escolha o melhor fruto da melhor planta para tirar semente, não o resto.',
    ],
    tempo: '15 min + 3 dias de espera',
  },
  {
    num: '04',
    titulo: 'Secagem completa, a chave da longevidade',
    subtitulo: 'Semente úmida não dura. Semente bem seca atravessa décadas',
    imagem: imgArmazenamento,
    paragrafos: [
      'Uma semente armazenada com qualquer umidade interna apodrece, mofa ou germina dentro do pote, e morre. A regra da longevidade é a mesma da despensa fermentada: controle de umidade obsessivo.',
      'Depois de extrair, você espalha as sementes num pano ou peneira, em local arejado e sombreado, e deixa secar de 5 a 14 dias dependendo do tamanho. Sol direto cozinha o embrião e mata. Sombra ventilada é o ponto certo.',
      'O teste é simples: dobre uma semente entre os dedos. Se quebra com estalo seco, está pronta. Se dobra sem quebrar, ainda tem água dentro. Esse detalhe é a diferença entre uma semente que dura 6 meses e uma que germina perfeita depois de 8 anos.',
    ],
    praticas: [
      'Local de secagem: prateleira interna, ventilada, sem sol direto, sem cozinha (vapor).',
      'Vire as sementes uma vez por dia para secar igualmente em todas as faces.',
      'Pote fechado com sílica gel mantém umidade controlada por anos sem geladeira.',
    ],
    tempo: '5 a 14 dias passivos',
  },
  {
    num: '05',
    titulo: 'Teste de germinação anual',
    subtitulo: 'A única forma de saber se sua semente ainda está viva',
    imagem: imgGerminacao,
    paragrafos: [
      'Toda semente perde força com o tempo. Algumas (alface, cebola) duram 1 a 2 anos. Outras (tomate, feijão, abóbora) duram 4 a 8 anos. Algumas (milho bem guardado) chegam a 10 anos. O único jeito de saber é testar.',
      'O teste é trivial: pegue 10 sementes de cada variedade, ponha entre dois papéis toalha úmidos num pratinho fechado, e espere 5 a 10 dias. Conte quantas germinaram. 8 ou mais é excelente. 5 a 7 é aceitável. Menos que 5, você usa essa safra rapidamente e renova o banco.',
      'Esse ritual anual evita o pior pesadelo do agricultor de quintal: chegar na época de plantio, descobrir que metade do banco morreu silenciosamente, e ficar sem semente exatamente na hora em que precisava plantar.',
    ],
    praticas: [
      'Faça o teste em janeiro ou fevereiro, antes do início do ciclo de plantio principal.',
      'Anote o resultado num caderno ano após ano. Em três safras você conhece sua linha.',
      'Se uma variedade despencou abaixo de 50%, plante toda essa safra e renove com a colheita.',
    ],
    tempo: '10 min de preparo + 7 dias',
  },
  {
    num: '06',
    titulo: 'A rede de troca informal',
    subtitulo: 'Sua semente vale mais quando circula entre vizinhos',
    imagem: imgTroca,
    paragrafos: [
      'Banco isolado eventualmente colapsa. Banco em rede é antifragil. Se sua casa tem um incêndio, alagamento ou mudança forçada, e você troca sementes regularmente com cinco ou dez pessoas, suas variedades favoritas continuam vivas em outro lugar.',
      'A troca informal é a tecnologia social mais antiga da agricultura humana. Sua avó trocava sementes com a vizinha sem perceber que estava operando um sistema descentralizado e à prova de censura, exatamente como uma carteira distribuída de bitcoin.',
      'Cada feira de pequenos produtores, cada grupo de WhatsApp regional, cada visita a outro agricultor é uma oportunidade de trocar três envelopes pequenos. Em poucos anos sua coleção dobra, sem gastar nada, e você passa a fazer parte de uma malha real de soberania alimentar.',
    ],
    praticas: [
      'Mantenha sempre 3 a 5 envelopes prontos para presentear quando alguém visita.',
      'Em cada troca pergunte a história: variedade, região, quantos anos a família cultiva.',
      'Documente a procedência. Memória oral também é semente, e ela morre se não passar adiante.',
    ],
    tempo: 'Habito mensal',
  },
];

const armadilhas = [
  { titulo: 'Confiar em "natural" do supermercado', desc: 'Embalagem que diz "natural" ou "orgânico" no agropecuário comum quase sempre é híbrido. Crioula só vem de banco comunitário, feira de agricultura familiar ou rede de trocas.' },
  { titulo: 'Guardar em pote transparente na luz', desc: 'Luz oxida o embrião. Sementes em vidro exposto na bancada da cozinha morrem em poucos meses. Pote opaco, escuro, fresco, sempre.' },
  { titulo: 'Misturar variedades no mesmo pote', desc: 'Você acha que vai lembrar. Não vai. Em três anos o banco vira um caos sem rastreabilidade e você perde a história de cada variedade. Um envelope, uma identidade.' },
  { titulo: 'Salvar semente do fruto pior', desc: 'Tirar semente do tomate menor, mais feio, mais doente, perpetua a fraqueza. Sempre o melhor fruto da melhor planta. Em 5 safras suas linhas ficam visivelmente mais fortes.' },
  { titulo: 'Esquecer de etiquetar a data', desc: 'Sem data, você não sabe se a semente tem 8 meses ou 8 anos. Não sabe se germina. Não sabe quando renovar. Etiqueta com mês e ano é inegociável.' },
  { titulo: 'Plantar tudo, não guardar nada', desc: 'Erro mais comum do iniciante. Comeu tudo, vendeu tudo, plantou tudo. Na próxima safra precisa comprar de novo. Reserve sempre 10% da colheita para o banco antes de qualquer outro destino.' },
];

const faq = [
  {
    q: 'Quanto tempo dura uma semente bem guardada?',
    a: 'Depende da espécie. Cebola e cebolinha: 1 a 2 anos. Cenoura, salsinha: 2 a 3 anos. Alface, repolho: 3 a 5 anos. Tomate, pimentão, berinjela: 4 a 6 anos. Feijão, ervilha, grão-de-bico: 5 a 8 anos. Abóbora, melancia, milho: 6 a 10 anos. Bem seca, em pote escuro fresco com sílica gel, esses números podem dobrar. Por isso o teste anual é tão importante.',
  },
  {
    q: 'Posso guardar semente de tomate comprado no mercado?',
    a: 'Pode tentar, mas a chance é baixa. Tomate de supermercado geralmente é híbrido F1 selecionado para resistir transporte, não para perpetuar. Os filhos saem desuniformes, frequentemente fracos ou estéreis. Se quer tomate crioulo de verdade, busque feira de agricultor familiar, banco de germoplasma ou troque com algum produtor local que cultiva variedades antigas.',
  },
  {
    q: 'Preciso ter quintal grande para começar?',
    a: 'Não. Você pode começar com 4 vasos no apartamento, salvando semente de tomate cereja, manjericão, alface e pimenta. O princípio é o mesmo, só a escala muda. O importante é entrar no ciclo: planta, colhe, separa, seca, guarda, planta de novo. Em duas safras você já entende a mecânica e pode escalar quando tiver mais espaço.',
  },
  {
    q: 'Sementes crioulas são proibidas no Brasil?',
    a: 'Não para uso pessoal e troca informal. A lei brasileira permite que agricultores familiares produzam, troquem e guardem sementes crioulas livremente. A regulação restritiva atinge comércio em escala industrial. Para banco doméstico, troca entre vizinhos e feiras locais, não há barreira legal nenhuma. É um direito histórico reconhecido.',
  },
  {
    q: 'E se vier um vizinho com plantação industrial perto?',
    a: 'Pode haver contaminação por pólen, especialmente em milho, abóbora e canola. As soluções são: distância (50 a 200m de barreira para a maioria), barreira física (cerca viva, telas de proteção em mudas críticas) ou ensacamento das flores antes da fecundação para garantir polinização controlada. Em quintal urbano isso é menos problema, em zona rural exige planejamento.',
  },
  {
    q: 'Posso congelar semente para durar mais?',
    a: 'Sim, e é a técnica que bancos profissionais usam. Semente seca abaixo de 8% de umidade, em pote hermético, no congelador comum, dura décadas. O pulo do gato é garantir que esteja MUITO seca antes, senão a água interna vira cristal de gelo e mata o embrião. Para uso doméstico, geladeira normal já estende a vida em 2 a 3 vezes versus despensa fresca.',
  },
  {
    q: 'Vale começar agora ou esperar ter mais experiência?',
    a: 'Comece agora, pequeno, com 3 a 5 variedades fáceis. Tomate cereja, feijão preto, abóbora, alface mimosa, manjericão. A experiência só vem fazendo, lendo livro nenhum substitui sentir a semente entre os dedos, ver a primeira germinação, descobrir qual variedade ama seu solo. O custo de errar é zero, a primeira safra te ensina o que dez livros não ensinam.',
  },
  {
    q: 'Como sei se um banco comunitário próximo existe?',
    a: 'Pesquise por "banco de sementes crioulas + sua cidade ou estado". Procure feiras agroecológicas, sindicatos rurais, grupos de agricultura urbana, associações de quilombolas e indígenas (que mantêm os bancos mais ricos do país), universidades federais com curso de agronomia e a rede da Embrapa. A maioria dessas iniciativas dá ou troca semente de graça com quem se compromete a multiplicar.',
  },
];

export default function SementesCrioulas() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.page }}>
      <SeoHead
        custom={{
          title: "Sementes Crioulas: Banco Pessoal | Autonomia Alimentar",
          description: "Manual completo de banco doméstico de sementes crioulas: extração, secagem, armazenamento e teste de germinação. Independência alimentar real, geração após geração.",
          canonical: "https://lordjunnior.com.br/soberania-organica/sementes-crioulas",
        }}
      />
      <BackToHome />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Mãos de agricultor segurando bacia com sementes crioulas variadas"
            width={1920}
            height={1280}
           
            className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20,12,6,0.38)' }} />
        </div>

        <div className="relative max-w-[1500px] mx-auto px-6 md:px-16 pb-20 md:pb-32 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="font-mono text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: C.earthSoft }}
          >
            Autonomia Alimentar · Manual editorial
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.2 }}
            className="font-black leading-[0.92] mb-10 max-w-5xl"
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.75rem, 8.5vw, 7.5rem)',
              color: '#f4ede0',
              textShadow: '0 4px 24px rgba(0,0,0,0.7)',
            }}
          >
            Quem guarda a semente,<br />
            <em style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700, color: C.earthSoft, textShadow: '0 0 40px hsl(22 52% 38% / 0.6), 0 4px 24px rgba(0,0,0,0.8)' }}>
              guarda a próxima safra
            </em>{' '}da família.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.4 }}
            className="text-lg md:text-2xl max-w-3xl leading-relaxed"
            style={{ color: '#e8dcc6', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            Semente híbrida é assinatura de aluguel da sua comida. Você compra, planta,
            colhe, e a planta nasce estéril, te obrigando a comprar tudo de novo no ano
            seguinte. Crioula é seed phrase comestível: gera filha igual à mãe, atravessa
            gerações, não pede permissão para germinar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: C.earthSoft }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Role para começar</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* PROVOCAÇÃO INICIAL */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.earth}>
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div {...fade()} className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.earth }}>
                Manifesto · Auto-custódia genética
              </p>
              <h2
                className="font-black leading-[0.95] mb-10"
                style={{
                  fontFamily: '"Inter Tight", sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 5.5vw, 4.75rem)',
                  color: C.ink,
                }}
              >
                Quatro empresas controlam{' '}
                <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.earth }}>
                  o que o mundo come.
                </em>
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                Bayer, Corteva, Syngenta e BASF detêm mais de 60% do mercado global de
                sementes. Vendem o pacote completo: semente híbrida que não regenera,
                fertilizante que ela exige, agrotóxico que mata o mato sem matar a planta
                geneticamente blindada para resistir. Você compra a comida, compra o veneno,
                compra a doença, e depois compra o remédio.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                Crioula quebra esse ciclo. É a versão biológica da auto-custódia: planta
                que produz a própria descendência, alimento que alimenta sem envenenar,
                independência que se replica sozinha a cada estação.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: C.ink }}>
                Toda semente guardada é um voto silencioso contra o cartel das primas.
              </p>
            </div>
            <div className="md:col-span-5">
              <motion.div {...fade(0.15)} className="relative">
                <img
                  src={imgJardim}
                  alt="Canteiro elevado com plantas indo para semente, ao pôr do sol"
                  width={1920} height={1280}
                  loading="lazy"
                  className="w-full h-auto rounded-sm"
                  style={{ boxShadow: '0 40px 80px -20px hsl(28 32% 14% / 0.5)' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PILARES — layout 50/50 alternado */}
      {pilares.map((p, i) => {
        const bgs = [sectionBg.harvest, sectionBg.forest, sectionBg.fieldWash, sectionBg.earth, sectionBg.forest, sectionBg.fieldWash];
        const isDark = i === 1 || i === 4;
        const sectionBgStyle = bgs[i];
        const reverse = i % 2 === 1;
        const textColor = isDark ? '#f0e6d4' : C.ink;
        const bodyColor = isDark ? '#d8cdb6' : C.body;
        const accentColor = isDark ? C.earthSoft : C.earth;
        const labelColor = isDark ? C.earthSoft : C.earth;

        return (
          <section key={p.num} className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBgStyle}>
            <div className="max-w-[1500px] mx-auto relative">
              <div className={`grid md:grid-cols-12 gap-12 md:gap-20 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}>
                <motion.div {...fade()} className="md:col-span-6 md:[direction:ltr]">
                  <img
                    src={p.imagem}
                    alt={p.titulo}
                    width={1920} height={1280}
                    loading="lazy"
                    className="w-full h-auto rounded-sm"
                    style={{ boxShadow: isDark ? '0 40px 80px -20px rgba(0,0,0,0.7)' : '0 40px 80px -20px hsl(28 32% 14% / 0.45)' }}
                  />
                </motion.div>
                <motion.div {...fade(0.15)} className="md:col-span-6 md:[direction:ltr]">
                  <div className="flex items-baseline gap-6 mb-8">
                    <span className="font-mono text-7xl md:text-8xl font-black leading-none" style={{ color: accentColor, opacity: 0.85 }}>
                      {p.num}
                    </span>
                    <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: labelColor }}>
                      {p.tempo}
                    </span>
                  </div>
                  <h3
                    className="font-black leading-[0.95] mb-6"
                    style={{
                      fontFamily: '"Inter Tight", sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(1.875rem, 4.5vw, 3.75rem)',
                      color: textColor,
                    }}
                  >
                    {p.titulo}
                  </h3>
                  <p
                    className="mb-10 italic"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                      color: accentColor,
                      textShadow: isDark ? '0 0 24px hsl(22 52% 38% / 0.4)' : 'none',
                    }}
                  >
                    {p.subtitulo}
                  </p>
                  <div className="space-y-6 mb-10">
                    {p.paragrafos.map((par, idx) => (
                      <p key={idx} className="text-lg md:text-xl leading-relaxed" style={{ color: bodyColor }}>
                        {par}
                      </p>
                    ))}
                  </div>
                  <div className="border-l-2 pl-6" style={{ borderColor: accentColor }}>
                    <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: labelColor }}>
                      Práticas concretas
                    </p>
                    <ul className="space-y-3">
                      {p.praticas.map((pr, idx) => (
                        <li key={idx} className="flex gap-4 text-base md:text-lg leading-relaxed" style={{ color: bodyColor }}>
                          <span style={{ color: accentColor }} className="font-bold mt-1">·</span>
                          <span>{pr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ARMADILHAS */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.harvest}>
        <div className="max-w-[1500px] mx-auto relative">
          <motion.div {...fade()} className="text-center max-w-4xl mx-auto mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.earth }}>
              <AlertTriangle className="inline w-4 h-4 mr-2 -mt-1" />
              Erros que destroem o banco inteiro
            </p>
            <h2
              className="font-black leading-[0.95]"
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 6vw, 5rem)',
                color: C.ink,
              }}
            >
              Seis armadilhas que{' '}
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.earth }}>
                anulam
              </em>{' '}
              o trabalho.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {armadilhas.map((a, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.05)}
                className="p-10 rounded-sm transition-all duration-500 hover:-translate-y-2"
                style={{
                  backgroundColor: 'hsl(36 30% 96% / 0.92)',
                  border: '1px solid hsl(30 14% 72% / 0.6)',
                  boxShadow: '0 20px 50px -20px hsl(28 32% 14% / 0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="font-mono text-sm font-bold" style={{ color: C.earth }}>0{i + 1}</span>
                <h3
                  className="text-2xl md:text-3xl font-black mt-3 mb-5 leading-tight"
                  style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 900, color: C.ink }}
                >
                  {a.titulo}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: C.body }}>
                  {a.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.forest}>
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fade()} className="text-center mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.earthSoft }}>
              <Sprout className="inline w-4 h-4 mr-2 -mt-1" />
              Perguntas honestas, respostas diretas
            </p>
            <h2
              className="font-black leading-[0.95]"
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 6vw, 5rem)',
                color: '#f4ede0',
              }}
            >
              O que todo iniciante{' '}
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.earthSoft, textShadow: '0 0 32px hsl(22 52% 38% / 0.6)' }}>
                pergunta primeiro
              </em>.
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.04)}
                className="rounded-sm overflow-hidden"
                style={{
                  border: '1px solid hsl(22 52% 38% / 0.2)',
                  backgroundColor: 'hsl(120 22% 20% / 0.7)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-7 md:p-9 flex justify-between items-start gap-6 transition-colors hover:bg-white/5"
                >
                  <span
                    className="text-lg md:text-xl font-bold leading-snug"
                    style={{ fontFamily: '"Inter Tight", sans-serif', color: '#f4ede0' }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    className="w-6 h-6 flex-shrink-0 mt-1 transition-transform duration-500"
                    style={{
                      color: C.earthSoft,
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5, ease: APPLE_EASE }}
                    className="px-7 md:px-9 pb-7 md:pb-9"
                  >
                    <p className="text-base md:text-lg leading-relaxed" style={{ color: '#d8cdb6' }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FECHO MANIFESTO */}
      <section className="relative py-32 md:py-44 px-6 md:px-16 overflow-hidden" style={sectionBg.fieldWash}>
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div {...fade()}>
            <ShieldCheck className="w-12 h-12 mx-auto mb-10" style={{ color: C.earth }} />
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.earth }}>
              O ato silencioso de soberania
            </p>
            <h2
              className="font-black leading-[0.95] mb-12"
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                color: C.ink,
              }}
            >
              Comprar semente é fácil.<br />
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.earth }}>
                Guardar semente que volta sozinha
              </em>
              <br />é o que separa um consumidor de um patriarca rural.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: C.body }}>
              Comece com três variedades neste mês. Em uma safra você prova o resultado. Em três
              safras seu banco está vivo, rotativo, autônomo. Em uma década sua família come do
              que ela mesma multiplica, sem balcão, sem rótulo, sem permissão.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
