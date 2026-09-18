import cardEconomia from "@/assets/card-economia.webp";
import cardBitcoin from "@/assets/card-bitcoin.webp";
import cardFilosofia from "@/assets/card-filosofia.webp";
import cardEstrategias from "@/assets/card-estrategias.webp";

export interface PillarResource {
  type: "ebook" | "audio" | "tool";
  title: string;
  description: string;
  action: string;
  route?: string;
  anchorId?: string;
}

export interface PillarObjective {
  title: string;
  description: string;
}

export interface Pillar {
  slug: string;
  level: string;
  badge: string;
  title: string;
  subtitle: string;
  cover: string;
  impactText: string;
  impactSub: string;
  resources: PillarResource[];
  objectives?: PillarObjective[];
}

export const pillars: Pillar[] = [
  {
    slug: "economia",
    level: "NÍVEL 01",
    badge: "DESPERTAR MONETÁRIO",
    title: "A Lógica da Pilhagem",
    subtitle: "A base para entender como o sistema fiduciário rouba o tempo do indivíduo.",
    cover: cardEconomia,
    impactText: "A maioria das pessoas acredita que a economia é um sistema complexo demais para ser compreendido. Isso é um projeto. A complexidade serve apenas para esconder o fato de que a inflação é um imposto silencioso, cobrado sem votação e sem consentimento.",
    impactSub: "Seu dinheiro não está perdendo valor por 'forças de mercado'; ele está sendo diluído por design para financiar o agigantamento estatal e o curral bancário. Entender a matemática do dinheiro fiduciário é o primeiro passo para parar de ser a vítima preferencial do sistema.",
    resources: [
      {
        type: "ebook",
        title: "O Caminho da Soberania",
        description: "O guia de entrada para entender a transição do sistema de dívida para o sistema de capital real.",
        action: "Baixar Ebook",
        anchorId: "fundamentos",
      },
      {
        type: "audio",
        title: "Série: Mitos Econômicos",
        description: "Desmontando as mentiras sistemáticas sobre juros, inflação e PIB em áudios de 15 minutos.",
        action: "Ouvir Agora",
      },
      {
        type: "tool",
        title: "Calculadora da Verdade Salarial",
        description: "Coloque o valor da sua hora de trabalho e descubra quanto, em minutos, você trabalha por dia apenas para sustentar a máquina pública.",
        action: "Calcular Agora",
        route: "/ferramentas#verdade-salarial",
      },
    ],
    objectives: [
      {
        title: "Identificar o Roubo",
        description: "Aprender a ver a inflação como expropriação de tempo de vida.",
      },
      {
        title: "Mudar a Unidade de Conta",
        description: "Parar de medir seu patrimônio em uma moeda que derrete e começar a pensar em poder de compra real.",
      },
      {
        title: "Estabelecer Defesa",
        description: "Baixar o material de apoio para fundamentar sua saída estratégica.",
      },
    ],
  },
  {
    slug: "bitcoin",
    level: "NÍVEL 02",
    badge: "SOBERANIA BITCOIN",
    title: "Autocustódia e Proteção Real",
    subtitle: "A transição da teoria para a posse real do capital.",
    cover: cardBitcoin,
    impactText: "O Bitcoin não é um investimento para 'ficar rico rápido'; é a única propriedade privada no mundo que não depende da permissão de terceiros para existir ou ser transacionada. Se as suas moedas estão em uma corretora, você não possui Bitcoin, você possui uma promessa de pagamento de um banco digital que pode ser bloqueada a qualquer momento.",
    impactSub: "A soberania começa no momento em que você detém as suas próprias chaves privadas. Nesta etapa, vamos remover a complexidade técnica desnecessária e focar no que importa: tirar o seu capital do alcance de mãos estatais e colocá-lo sob o seu controle total e absoluto.",
    resources: [
      {
        type: "tool",
        title: "Simulador: Bitcoin vs Imóveis",
        description: "Uma análise matemática fria sobre qual ativo realmente preservou o seu esforço de vida contra a inflação na última década.",
        action: "Abrir Simulador",
        route: "/ferramentas#btc-vs-imoveis",
      },
      {
        type: "audio",
        title: "Guia de Autocustódia",
        description: "O passo a passo para configurar sua carteira e realizar o seu primeiro saque soberano.",
        action: "Ouvir Tutorial",
        anchorId: "autocustodia",
      },
      {
        type: "ebook",
        title: "O Padrão Bitcoin",
        description: "A leitura técnica obrigatória para entender por que o Bitcoin é o sucessor natural do padrão-ouro.",
        action: "Baixar Livro",
        anchorId: "node",
      },
    ],
    objectives: [
      {
        title: "Sair da Corretora",
        description: "Entender que exchange é apenas um balcão de troca, não um lugar de armazenamento.",
      },
      {
        title: "Gerar Entropia",
        description: "Aprender a criar suas 12 ou 24 palavras de segurança de forma offline e segura.",
      },
      {
        title: "Verificar, Não Confiar",
        description: "Utilizar a rede para validar suas próprias transações sem depender de gerentes ou governos.",
      },
    ],
  },
  {
    slug: "saida",
    level: "NÍVEL 03",
    badge: "DEFESA PATRIMONIAL",
    title: "Independência Operacional",
    subtitle: "Protocolos de herança, privacidade e liberdade geográfica.",
    cover: cardEstrategias,
    impactText: "A soberania intelectual é o começo, mas a soberania operacional é o que garante a sua sobrevivência em tempos de tirania financeira. Não basta possuir Bitcoin; é preciso saber utilizá-lo como uma ferramenta de saída do curral bancário.",
    impactSub: "Nesta etapa final, entregamos os protocolos para quem decidiu que a dependência estatal não é mais uma opção. Vamos configurar a sua liquidez imediata via Lightning, blindar a sua privacidade on-chain e estruturar a transferência do seu legado para a próxima geração sem a interferência de inventários ou impostos de sucessão.",
    resources: [
      {
        type: "tool",
        title: "PIX via Bitcoin (Lightning)",
        description: "O guia de execução para converter seus Satoshis em liquidez imediata no balcão do comércio local, sem pedir permissão a gerente de banco.",
        action: "Configurar Agora",
        anchorId: "lightning",
      },
      {
        type: "ebook",
        title: "Herança Cripto",
        description: "Como configurar chaves multisig e timelocks para garantir que seu patrimônio chegue aos seus herdeiros de forma privada e segura.",
        action: "Baixar Protocolo",
        anchorId: "heranca",
      },
      {
        type: "audio",
        title: "Privacidade On-chain",
        description: "Ferramentas e práticas de CoinJoin e nós (Nodes) próprios para apagar o seu rastro financeiro do sistema de vigilância.",
        action: "Ouvir Estudo",
        anchorId: "p2p",
      },
    ],
    objectives: [
      {
        title: "Liquidez Soberana",
        description: "Aprender a operar na rede Lightning para pagamentos do dia a dia com taxas microscópicas.",
      },
      {
        title: "Blindagem de Dados",
        description: "Remover o vínculo do seu CPF das suas moedas através de estratégias de privacidade avançadas.",
      },
      {
        title: "Continuidade do Capital",
        description: "Estruturar a custódia de longo prazo para que o seu esforço de vida seja inalcançável por bloqueios judiciais ou confiscos futuros.",
      },
    ],
  },
  {
    slug: "filosofia",
    level: "NÍVEL 04",
    badge: "COSMOVISÃO & DISCERNIMENTO",
    title: "Ética, Propriedade e Discernimento",
    subtitle: "Os fundamentos morais da soberania individual.",
    cover: cardFilosofia,
    impactText: "A liberdade não é um conceito abstrato; ela é a consequência direta do reconhecimento da propriedade privada sobre o próprio corpo e sobre os frutos do próprio trabalho. Sem o direito de posse absoluta, você não é um cidadão, é um súdito em liberdade condicional.",
    impactSub: "Nesta etapa, elevamos o debate para além do gráfico de preço. Vamos fundamentar o porquê da luta pela soberania através da ética da não-agressão e do discernimento sobre a verdadeira riqueza. Como mordomos do nosso tempo e recursos, a busca pela independência financeira é, antes de tudo, um imperativo moral para a proteção da família e do futuro.",
    resources: [
      {
        type: "ebook",
        title: "A Ética da Liberdade",
        description: "A obra definitiva de Murray Rothbard sobre os direitos de propriedade e a moralidade do livre mercado.",
        action: "Baixar Ebook",
        route: "/ebooks",
      },
      {
        type: "ebook",
        title: "Teologia do Trabalho",
        description: "Um mergulho profundo no discernimento bíblico sobre vocação, criação de valor e a responsabilidade cristã com o capital.",
        action: "Baixar Estudo",
        route: "/ebooks",
      },
      {
        type: "tool",
        title: "Cultura & Verdade",
        description: "Materiais focados em alinhar a sua visão de mundo com a realidade dos fatos, longe das narrativas de engenharia social.",
        action: "Acessar Biblioteca",
        route: "/ebooks",
      },
    ],
    objectives: [
      {
        title: "Auto-propriedade",
        description: "O reconhecimento de que nenhum coletivo ou Estado tem direitos sobre a sua vida ou esforço.",
      },
      {
        title: "Moralidade Monetária",
        description: "Entender que moedas honestas (como o Bitcoin) são extensões da verdade, enquanto moedas fiduciárias são extensões da mentira.",
      },
      {
        title: "Mordomia Cristã",
        description: "A visão de que a riqueza deve ser gerida com sabedoria e propósito eterno, e não apenas para consumo imediato.",
      },
    ],
  },
];
