import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, ArrowRight, Copy, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Figure, Veredito } from '@/components/seguranca-mobile/EditorialKit';
import qrCodeImage from '@/assets/qrcode-lightning.webp';
import heroAsset from '@/assets/biblioteca-tecnica/hero-biblioteca-tecnica.jpg';
import referenceAsset from '@/assets/biblioteca-tecnica/curadoria-fonte-primaria.jpg';
import documentAsset from '@/assets/book-whitepaper.webp';
import backupAsset from '@/assets/biblioteca-tecnica/dados-backup.jpg';
import hardwareAsset from '@/assets/biblioteca-tecnica/kits-autonomia.jpg';
import researchAsset from '@/assets/biblioteca-tecnica/pesquisa-verificacao.jpg';

const LIGHTNING_ADDRESS = 'securecorn53@walletofsatoshi.com';

interface Term {
  term: string;
  definition: string;
  tags?: string[];
  link?: { label: string; to: string };
}

interface LetterGroup {
  letter: string;
  terms: Term[];
}

const dictionary: LetterGroup[] = [
  {
    letter: 'A',
    terms: [
      { term: 'Alienação', definition: 'Termo fiscal para qualquer venda, troca, permuta ou uso de bitcoin como pagamento. É a alienação, e não a valorização, que gera o fato gerador do imposto no Brasil.', tags: ['fiscal'], link: { label: 'Como declarar bitcoin', to: '/imposto-renda/declarar-bitcoin-2026' } },
      { term: 'Air-gapped', definition: 'Dispositivo que nunca toca a internet. A assinatura da transação acontece offline e viaja por cartão SD ou QR Code, eliminando a superfície de ataque remota.', tags: ['autocustódia', 'segurança'], link: { label: 'Melhores hardware wallets', to: '/comparativos/melhores-hardware-wallets' } },
      { term: 'Ágio', definition: 'Prêmio pago acima da cotação de mercado em negociações P2P. É o preço da privacidade e da liquidez imediata fora do sistema bancário.', tags: ['p2p'], link: { label: 'Como vender bitcoin P2P', to: '/p2p/como-vender-bitcoin-p2p' } },
      { term: 'Arbitragem fiscal', definition: 'Estratégia legal de organizar residência, empresa e ativos entre jurisdições diferentes para reduzir carga tributária dentro da lei.', tags: ['fiscal', 'offshore'] },
      { term: 'Addy', definition: 'Endereço de uma carteira de criptomoeda.', tags: ['carteira'] },
      { term: 'Altcoin', definition: 'Nome dado às moedas alternativas ao Bitcoin. Exemplo: Litecoin, Dogecoin, Dash, etc.', tags: ['moeda'] },
      { term: 'AML', definition: 'Sigla de Anti-Money Laundering, em português: Anti-Lavagem de Dinheiro. São técnicas utilizadas para barrar a lavagem de dinheiro, como receber dinheiro apenas via transferência bancária e do próprio titular da conta, como as exchanges brasileiras já fazem.', tags: ['regulação'] },
      { term: 'ASIC', definition: 'Sigla Application Specific Integrated Circuit, em português: Circuitos Integrado de Aplicação Específica. Chip criado especificamente para realizar uma tarefa, exemplo, no caso do bitcoin, os ASICs foram criados para processar um hash SHA-256 e minerar bitcoins.', tags: ['mineração', 'hardware'] },
      { term: 'ATH', definition: 'O preço máximo que uma determinada criptomoeda já atingiu.', tags: ['mercado'] },
      { term: 'Ativos', definition: 'Se refere a qualquer pertence que componha os bens de uma pessoa. Por exemplo, se você possui R$ 3.000,00 em sua conta bancária, esses são os seus ativos nesse banco. No caso das criptomoedas, chamamos de "Ativos Digitais".', tags: ['finanças'] },
      { term: 'ATM', definition: 'Automated Teller Machine, que significa: Caixa Eletrônico. No caso do Bitcoin, às vezes são chamados de BTM, permite que os usuários façam compra e venda de bitcoins, usando dinheiro físico ou cartões de débito.', tags: ['infraestrutura'] },
    ],
  },
  {
    letter: 'B',
    terms: [
      { term: 'Bisq', definition: 'Rede descentralizada de troca P2P que roda sobre Tor, sem empresa, sem cadastro e sem custódia de terceiros sobre suas moedas.', tags: ['p2p', 'privacidade'], link: { label: 'Guia completo do Bisq', to: '/p2p/bisq-guia-completo' } },
      { term: 'BIP39', definition: 'Padrão que transforma a chave mestra da carteira em 12 ou 24 palavras legíveis. É o que permite restaurar seus bitcoins em qualquer aparelho compatível.', tags: ['autocustódia'], link: { label: 'Backup da seed phrase', to: '/autocustodia/backup-seed-phrase-guia' } },
      { term: 'Beneficiário final', definition: 'Pessoa física que realmente controla uma empresa ou estrutura, mesmo quando o nome no papel é de outro. Base dos registros de transparência exigidos por bancos.', tags: ['offshore', 'regulação'] },
      { term: 'Baleia', definition: 'Detentor de grande parte de uma determinada moeda, a baleia é um usuário que centraliza a moeda controlando o preço dela.', tags: ['mercado'] },
      { term: 'Bear', definition: 'Do inglês, "Urso". O "Bear" é o investidor que crê na queda do preço da criptomoeda a qualquer momento. Com isso, o Bear vende seus ativos antes que desvalorizem demais. Quando dizemos que um mercado é "Bearish", quer dizer que naquele momento há mais ordens de venda do que de compra.', tags: ['mercado'] },
      { term: 'Bearish', definition: 'É um comportamento agressivo do gráfico de cima para baixo (caracterizado por uma descida grande e uma subida curta).', tags: ['mercado'] },
      { term: 'Bid', definition: 'O Bid é o preço mais alto que um determinado comprador está disposto a pagar naquela transação. Ele é o valor que os compradores oferecem para o ativo.', tags: ['trading'] },
      { term: 'bitcoin', definition: 'Iniciando com letra minúscula, representa a unidade monetária do protocolo Bitcoin.', tags: ['bitcoin'] },
      { term: 'Bitcoin', definition: 'Iniciando com letra maiúscula, representa o protocolo criado por Satoshi Nakamoto.', tags: ['bitcoin'] },
      { term: 'Block Explorer', definition: 'Também conhecido como Blockchain Browser, é um site ou programa de computador que permite você visualizar as transações, endereços, blocos e qualquer informação de uma blockchain e de uma criptomoeda específica.', tags: ['infraestrutura'] },
      { term: 'Blockchain', definition: 'A blockchain também conhecida por protocolo de confiança, é uma tecnologia de registro distribuído que visa a descentralização como medida de segurança. É vista como a principal inovação tecnológica do Bitcoin visto que é a prova de todas as transações na rede.', tags: ['tecnologia'] },
      { term: 'Blockchain.info', definition: 'Empresa que oferece serviço de carteira e explorador de blocos, confundida com a cadeia de blocos do bitcoin.', tags: ['infraestrutura'] },
      { term: 'Bloco Genesis', definition: 'O primeiro bloco do Bitcoin, minerado por Satoshi Nakamoto.', tags: ['bitcoin'] },
      { term: 'BTC', definition: 'Abreviação da unidade monetária do bitcoin.', tags: ['bitcoin'] },
      { term: 'Bull', definition: 'Do inglês, significa "Touro" e é exatamente o contrário do "Bear". O bull é o investidor que crê na evolução do preço da criptomoeda. Esse usuário aposta em comprar a moeda na baixa para fazer lucro quando o valor subir.', tags: ['mercado'] },
      { term: 'Bullish', definition: 'É um comportamento agressivo do gráfico de baixo pra cima (caracterizado por uma subida grande e uma descida curta).', tags: ['mercado'] },
    ],
  },
  {
    letter: 'C',
    terms: [
      { term: 'Cidadania por investimento', definition: 'Programa em que um país concede passaporte ou residência em troca de investimento imobiliário, doação ou aporte produtivo.', tags: ['imigração', 'soberania'], link: { label: 'Melhores países para brasileiros', to: '/saida/melhores-paises-brasileiros' } },
      { term: 'Coin control', definition: 'Recurso da carteira que permite escolher exatamente quais moedas serão gastas em cada transação, protegendo o histórico dos demais fundos.', tags: ['privacidade', 'autocustódia'], link: { label: 'UTXO e consolidação', to: '/autocustodia/utxo-consolidacao' } },
      { term: 'CRS', definition: 'Common Reporting Standard: acordo global de troca automática de informações financeiras entre países. É por ele que contas no exterior chegam ao fisco brasileiro.', tags: ['fiscal', 'offshore'] },
      { term: 'Carné-leão', definition: 'Recolhimento mensal obrigatório do imposto sobre ganhos que ultrapassam a faixa isenta, pago até o último dia útil do mês seguinte à venda.', tags: ['fiscal'], link: { label: 'Isenção de 35 mil', to: '/imposto-renda/isencao-35-mil' } },
      { term: 'Candlestick', definition: 'Candlestick é uma representação gráfica do preço de um ativo. Isso permite que seja possível visualizar os preços de abertura, alta, baixa e fechamento dentro de um período de tempo no gráfico.', tags: ['trading'] },
      { term: 'Carteira', definition: 'Em inglês "wallet" é onde o investidor pode guardar suas moedas digitais de forma mais segura até o momento de venda e/ou troca.', tags: ['carteira'] },
      { term: 'Cold Storage', definition: 'Movimentação de criptomoedas offline, ou seja, armazenar as criptos em carteiras de papel.', tags: ['segurança', 'carteira'] },
      { term: 'CPU', definition: 'Central Processing Unit, em português, Unidade Central de Processamento, é o cérebro do computador. Onde a maior parte dos cálculos é feito.', tags: ['hardware'] },
      { term: 'Criptografia', definition: 'A criptografia é um conjunto de codificações feitas para proteger uma informação de modo que apenas o emissor e o receptor possam compreender.', tags: ['segurança'] },
      { term: 'Criptomoeda', definition: 'O termo criptomoeda, é utilizado para referir-se a moedas digitais como por exemplo o Bitcoin, que usa constantemente a criptografia para vários fins. Um deles é garantir que todas as transações sejam feitas de forma 100% segura.', tags: ['moeda'] },
      { term: 'Custódia', definition: 'O termo vem de custodiar, ou seja, possuir uma propriedades de ativos que tenha o seu controle. Ter sob custódia uma carteira ou ativos, também pode significar manter suas chaves privadas e em sigilo.', tags: ['segurança'] },
      { term: 'Cypherpunk', definition: 'Cypherpunk é uma comunidade de defensores da privacidade e do anonimato online. Seu lema é Cypherpunks write code (Cypherpunks escrevem códigos) e acreditam que aqueles que desejam privacidade devem ir buscá-la por conta própria em vez de esperar que os outros façam para si.', tags: ['filosofia'] },
    ],
  },
  {
    letter: 'D',
    terms: [
      { term: 'Domicílio fiscal', definition: 'País que considera você contribuinte. Sair do Brasil sem comunicar a saída definitiva mantém a obrigação de declarar renda mundial.', tags: ['fiscal', 'imigração'], link: { label: 'Melhores países para brasileiros', to: '/saida/melhores-paises-brasileiros' } },
      { term: 'Descentralização', definition: 'Ausência de ponto único de controle ou de falha. Nenhuma empresa, servidor ou governo pode desligar, censurar ou reescrever a rede.', tags: ['filosofia', 'soberania'] },
      { term: 'Day Trader', definition: 'Trader que faz movimentações diárias, comprando e vendendo.', tags: ['trading'] },
      { term: 'DDoS', definition: 'Distributed Denial of Service, em português: Ataque Distribuído de Negação de Serviços. Este ataque utiliza um grande número de computadores sob o controle de um atacante para enviar pequenas quantidades de tráfegos pela internet com o objetivo de congestionar o acesso e drenar recursos de um servidor alvo.', tags: ['segurança'] },
      { term: 'Dump', definition: 'Quando o preço de uma criptomoeda desce inesperadamente.', tags: ['mercado'] },
      { term: 'Dust Transaction', definition: 'Transação com uma pequena quantidade de bitcoins, com baixo valor financeiro, mas que ocupa espaço no blockchain.', tags: ['bitcoin'] },
    ],
  },
  {
    letter: 'E',
    terms: [
      { term: 'ETH', definition: 'Símbolo ticker da criptomoeda Ethereum.', tags: ['moeda'] },
      { term: 'Escrow', definition: 'Nome dado pelo ato de manter fundos em posse de terceiros, a fim de se proteger durante uma operação.', tags: ['trading'] },
      { term: 'Ether', definition: 'Unidade monetária do Ethereum, usada para pagar as taxas da sua blockchain.', tags: ['moeda'] },
      { term: 'Ethereum', definition: 'Ethereum é uma plataforma que permite a programação de aplicativos descentralizados, contratos inteligentes e transações da criptomoeda Ether e vários tokens.', tags: ['tecnologia'] },
      { term: 'Exchange', definition: 'Local utilizado para troca entre criptomoedas e outros ativos, por exemplo, trocar real por bitcoin. Exchange de bitcoins são utilizadas para trocar bitcoin por moedas FIAT ou outras criptomoedas.', tags: ['infraestrutura'] },
    ],
  },
  {
    letter: 'F',
    terms: [
      { term: 'FATCA', definition: 'Lei americana que obriga instituições financeiras do mundo inteiro a reportar contas ligadas a pessoas com vínculo fiscal nos Estados Unidos.', tags: ['fiscal', 'offshore'] },
      { term: 'Ficha de bens e direitos', definition: 'Seção da declaração anual onde o bitcoin é informado pelo custo de aquisição, e não pela cotação do dia.', tags: ['fiscal'], link: { label: 'Como declarar bitcoin', to: '/imposto-renda/declarar-bitcoin-2026' } },
      { term: 'Faucet', definition: 'Sites que oferecem recompensas em bitcoin a partir de cliques em propagandas ou realizar pequenas tarefas. Exemplo: responder pesquisas.', tags: ['bitcoin'] },
      { term: 'Fee', definition: 'Refere-se a taxas, que pode ser taxa de conversão, transferência ou de saque, etc.', tags: ['finanças'] },
      { term: 'Fiat', definition: 'É o dinheiro fiduciário, ou seja, aquele que não é criptomoeda, como o Real, Dólar, Euro, Iene, etc.', tags: ['finanças'] },
      { term: 'FOMO', definition: 'Fear of missing out, em português: medo de perder uma oportunidade que pode gerar lucro.', tags: ['mercado'] },
      { term: 'Fork', definition: 'Atualizações nos códigos de criptografia das moedas geram uma bifurcação, chamada de Fork. Uma nova moeda gerada a partir de outra, como o Bitcoin Gold que é um fork do Bitcoin.', tags: ['tecnologia'] },
      { term: 'Full Node', definition: 'É o programa que contém as regras de consenso da rede do Bitcoin e uma cópia completa do Blockchain. Nem todo full node é minerador, mas todo minerador é um full node.', tags: ['infraestrutura', 'bitcoin'] },
    ],
  },
  {
    letter: 'G',
    terms: [
      { term: 'Gas', definition: 'O termo Gas se refere a um mecanismo que precifica na rede Ethereum. Ele calcula as taxas para executar uma transação ou executar uma operação de contrato inteligente.', tags: ['ethereum'] },
      { term: 'GPU', definition: 'Graphical Processing Unit, em português: Unidade de Processamento Gráfico. Chip projetado para processar cálculos matemáticos complexos, necessário para rodar jogos e softwares que utilizam muitos recursos gráficos.', tags: ['hardware'] },
    ],
  },
  {
    letter: 'H',
    terms: [
      { term: 'Hardware wallet', definition: 'Aparelho dedicado a guardar chaves privadas fora do computador e do celular, assinando transações em ambiente isolado.', tags: ['autocustódia', 'hardware'], link: { label: 'Melhores hardware wallets', to: '/comparativos/melhores-hardware-wallets' } },
      { term: 'Herança digital', definition: 'Plano documentado que permite à família acessar os fundos sem expor a seed enquanto você está vivo.', tags: ['autocustódia', 'soberania'], link: { label: 'Backup da seed phrase', to: '/autocustodia/backup-seed-phrase-guia' } },
      { term: 'Halving', definition: 'O halving do Bitcoin, é uma característica que está encravada dentro do código da criptomoeda. Diferente dos sistemas monetários atuais nos quais os governos imprimem dinheiro sem parar, o bitcoin reduz sua emissão a cada 4 anos.', tags: ['bitcoin'] },
      { term: 'Hash', definition: 'É um algoritmo utilizado pelo protocolo do bitcoin e de outras criptomoedas para transformar um grande número de informações em uma sequência numérica hexadecimal de tamanho fixo.', tags: ['tecnologia'] },
      { term: 'Hash Rate', definition: 'Número de hashes processados por um minerador em um determinado período de tempo.', tags: ['mineração'] },
      { term: 'HODL', definition: 'É um meme, o correto seria Hold – de "segurar", do inglês, que é quando você mantém seus ativos, mesmo na baixa de preço, pois acredita que será valorizado futuramente.', tags: ['mercado'] },
      { term: 'Hot Wallet', definition: 'É uma carteira de criptomoedas que está online e conectada com a Internet.', tags: ['carteira'] },
      { term: 'Hype', definition: 'É uma palavra usada sempre que algo está na nova onda popular. Por exemplo: "O Bitcoin é a nova hype do momento".', tags: ['mercado'] },
    ],
  },
  {
    letter: 'I',
    terms: [
      { term: 'IN 1888', definition: 'Obrigação acessória que exige informar operações com criptoativos feitas fora de exchanges brasileiras quando o mês ultrapassa o limite estabelecido.', tags: ['fiscal', 'regulação'], link: { label: 'Como declarar bitcoin', to: '/imposto-renda/declarar-bitcoin-2026' } },
      { term: 'Isenção mensal', definition: 'Faixa de alienação mensal sem imposto sobre o ganho. Contada por mês-calendário e somando todas as vendas, em qualquer plataforma.', tags: ['fiscal'], link: { label: 'Isenção de 35 mil', to: '/imposto-renda/isencao-35-mil' } },
      { term: 'ICO', definition: 'Initial Coin Offering, em português, Oferta Inicial de Moeda. É um sistema criado para arrecadar fundos para uma start-up ou empresa. Normalmente elas surgem com "ideias revolucionárias ou únicas" que são aplicadas em cima de uma blockchain. Atenção: ICOs também podem ser Scams.', tags: ['mercado'] },
      { term: 'Input', definition: 'Endereço de origem de uma transação bitcoin. Uma única transação pode ter múltiplos endereços de origem.', tags: ['bitcoin'] },
    ],
  },
  {
    letter: 'J',
    terms: [
      { term: 'Jurisdição', definition: 'Conjunto de leis, tribunais e bancos de um território. Escolher jurisdição é escolher quem tem poder sobre seu patrimônio.', tags: ['offshore', 'soberania'], link: { label: 'Melhores países para brasileiros', to: '/saida/melhores-paises-brasileiros' } },
    ],
  },
  {
    letter: 'K',
    terms: [
      { term: 'Kilohashes/sec – kH/s', definition: 'Número de tentativas possíveis de resolver um hash em um dado segundo, medido em milhares de hashes.', tags: ['mineração'] },
      { term: 'KYC', definition: 'Know Your Customer, em português: Conheça seu Cliente. São políticas que instituições governamentais impõe a empresas para conhecer com quem estão fazendo negócios, ou seja, possuem dados e documentos de seus clientes.', tags: ['regulação'] },
    ],
  },
  {
    letter: 'L',
    terms: [
      { term: 'Lastro', definition: 'É um ativo que tem como objetivo dar uma garantia, ou seja, ele relaciona um ativo a princípio sem valor, com algo que possua um valor implícito.', tags: ['finanças'] },
      { term: 'Ledger', definition: 'O ledger é um registro compartilhado de informações, a exemplo um livro caixa de um banco, onde ficam registradas as transações feitas por criptomoedas, que passam pela Blockchain.', tags: ['tecnologia'] },
      { term: 'Liquidez', definition: 'É a capacidade de comprar ou vender um ativo facilmente, mesmo em grandes quantidades.', tags: ['mercado'] },
    ],
  },
  {
    letter: 'M',
    terms: [
      { term: 'Multisig', definition: 'Esquema em que a movimentação exige várias assinaturas independentes, eliminando o ponto único de falha de uma única seed.', tags: ['autocustódia', 'segurança'], link: { label: 'Melhores hardware wallets', to: '/comparativos/melhores-hardware-wallets' } },
      { term: 'Maleabilidade', definition: 'Habilidade de modificar transações não confirmadas sem fazê-las inválidas.', tags: ['tecnologia'] },
      { term: 'Maker', definition: 'Maker é um termo usado quando inclui uma ordem e ela não é negociada imediatamente. Onde ela permanece no livro de ofertas e aguarda que outra pessoa envie uma ordem contrária para que ela seja executada.', tags: ['trading'] },
      { term: 'Marketcap', definition: 'Em português: capitalização de mercado. Quantidade de criptomoeda circulante × preço da cripto.', tags: ['mercado'] },
      { term: 'Megahashes/sec – MH/s', definition: 'Número de tentativas possíveis de resolver um hash em um dado segundo, medido em milhões de hashes.', tags: ['mineração'] },
      { term: 'MicroBit – μBTC', definition: 'Milionésima parte de 1 bitcoin ou 0.000001 BTC.', tags: ['bitcoin'] },
      { term: 'MilliBit – mBTC', definition: 'Milésima parte de 1 bitcoin ou 0.001 BTC.', tags: ['bitcoin'] },
      { term: 'Mineração', definition: 'É o ato de realizar cálculos matemáticos. Quando um computador realiza esse cálculo criptográfico ele recebe uma recompensa, X Bitcoin. Dizemos que ele está minerando e permitindo que surja mais Bitcoin.', tags: ['mineração'] },
      { term: 'Mixer', definition: 'Serviço utilizado para embaralhar input e output de transações, a fim de manter a privacidade e diminuir o nível de rastreamento.', tags: ['privacidade'] },
    ],
  },
  {
    letter: 'N',
    terms: [
      { term: 'Não-KYC', definition: 'Aquisição de bitcoin sem entregar documentos e biometria a intermediários. Reduz vazamentos de dados e rastreabilidade permanente.', tags: ['privacidade', 'p2p'], link: { label: 'Como vender bitcoin P2P', to: '/p2p/como-vender-bitcoin-p2p' } },
      { term: 'Nômade fiscal', definition: 'Pessoa que organiza residência, renda e ativos em países distintos para minimizar dependência de um único Estado.', tags: ['imigração', 'offshore'] },
      { term: 'Nó', definition: 'Dispositivo conectado à rede Bitcoin que utiliza um programa de computador para retransmitir transações para outros nós, criando uma rede descentralizada.', tags: ['infraestrutura'] },
    ],
  },
  {
    letter: 'O',
    terms: [
      { term: 'Offshore', definition: 'Estrutura ou conta situada fora do país de residência. É legal quando declarada, e serve à diversificação de risco jurisdicional.', tags: ['offshore'] },
      { term: 'Ordem MARKET', definition: 'Ordem de mercado que realizará aquela compra independente do preço que estiver.', tags: ['trading'] },
      { term: 'Ordem STOP-LIMIT', definition: 'Funciona assim: você escolhe um preço e diz pro sistema "no momento em que a moeda atingir X dólares você colocará uma ordem LIMITADA de Y dólares".', tags: ['trading'] },
      { term: 'Output', definition: 'Endereço destino de uma transação bitcoin. É possível que uma transação tenha múltiplos outputs.', tags: ['bitcoin'] },
    ],
  },
  {
    letter: 'P',
    terms: [
      { term: 'Passaporte fiscal', definition: 'Combinação de residência legal e comprovante de tributação em outro país, exigida por bancos para abrir contas sem retenções.', tags: ['imigração', 'offshore'], link: { label: 'Residência no Chile', to: '/saida/cedula-residencia-chile' } },
      { term: 'Passphrase', definition: 'Palavra extra somada à seed que cria uma carteira totalmente separada. Sem ela, as 24 palavras não abrem nada.', tags: ['autocustódia', 'segurança'], link: { label: 'Backup da seed phrase', to: '/autocustodia/backup-seed-phrase-guia' } },
      { term: 'P2P', definition: 'P2P significa peer-to-peer, em português: ponto-a-ponto. O Bitcoin foi projetado como um sistema peer-to-peer, ou seja, que não precisa de intermediários, como bancos centrais, para intermediar uma transação entre duas pessoas.', tags: ['bitcoin'] },
      { term: 'Paper Wallet', definition: 'É considerado um meio muito seguro de guardar suas criptomoedas, pois não correm tanto risco, justamente por ser offline. É basicamente um pedaço de papel contendo suas chaves privadas e públicas.', tags: ['carteira', 'segurança'] },
      { term: 'Phishing', definition: 'O phishing acontece quando o usuário clica ou baixa um arquivo falso que rouba algum tipo de informação. Devido à popularização das criptomoedas, é cada vez mais comum a circulação de e-mails falsos e anúncios fraudulentos.', tags: ['segurança'] },
      { term: 'Pool', definition: 'Coleção de mineradores que se agrupam para minerar coletivamente um bloco, e depois dividir a recompensa entre eles. Pools de mineração são uma ótima maneira para aumentar a probabilidade de êxito conforme a dificuldade for aumentando.', tags: ['mineração'] },
      { term: 'PoW', definition: 'É a prova de que uma transação foi validada e é legítima. Por meio de uma função matemática (a SHA-256), as transações são codificadas e enviadas para a rede, onde os mineradores competem entre si para decodificá-las.', tags: ['tecnologia'] },
      { term: 'Preço Ask', definition: 'Ele é o preço mínimo que alguém estaria disposto a vender seu ativo.', tags: ['trading'] },
      { term: 'Profit', definition: 'Lucros obtidos.', tags: ['finanças'] },
      { term: 'Pump', definition: 'Quando o preço de uma moeda sobe inesperadamente.', tags: ['mercado'] },
    ],
  },
  {
    letter: 'Q',
    terms: [
      { term: 'QR Code', definition: 'Código de barras bidimensional que pode ser convertido em texto, URL, número de telefone, geolocalização, etc. É muito utilizado para codificar e facilitar a leitura de chaves privadas e endereços bitcoin, por ser facilmente escaneado é muito usado em telefones celulares equipados com câmera.', tags: ['infraestrutura'] },
    ],
  },
  {
    letter: 'R',
    terms: [
      { term: 'Residência fiscal', definition: 'Status que define em qual país você paga imposto sobre renda mundial. Depende de dias de permanência, vínculos e comunicação de saída.', tags: ['fiscal', 'imigração'], link: { label: 'Melhores países para brasileiros', to: '/saida/melhores-paises-brasileiros' } },
      { term: 'RoboSats', definition: 'Plataforma P2P sobre Lightning e Tor, sem cadastro, com garantia por depósito temporário e liquidação em segundos.', tags: ['p2p', 'privacidade'], link: { label: 'Como vender bitcoin P2P', to: '/p2p/como-vender-bitcoin-p2p' } },
      { term: 'Rekt', definition: 'Não queira ser um Rekt! O Rekt é uma palavra em inglês escrito com erros de ortografia – o correto seria "Wrecked", que significa "Naufragado/náufrago". É o investidor que perdeu tudo com a queda de um preço, arruinando seu patrimônio.', tags: ['mercado'] },
      { term: 'ROI', definition: 'O retorno que se tem baseado no quanto você investiu.', tags: ['finanças'] },
    ],
  },
  {
    letter: 'S',
    terms: [
      { term: 'Saída definitiva', definition: 'Comunicação e declaração que encerram formalmente sua residência fiscal no Brasil. Sem ela, o país continua cobrando sobre renda mundial.', tags: ['fiscal', 'imigração'], link: { label: 'Melhores países para brasileiros', to: '/saida/melhores-paises-brasileiros' } },
      { term: 'Seed phrase', definition: 'As 12 ou 24 palavras que representam todas as suas chaves. Quem as tem, tem o dinheiro. Nunca em foto, nuvem ou aplicativo de notas.', tags: ['autocustódia', 'segurança'], link: { label: 'Backup da seed phrase', to: '/autocustodia/backup-seed-phrase-guia' } },
      { term: 'Soberania financeira', definition: 'Capacidade de guardar, mover e receber valor sem depender de autorização de banco, empresa ou governo.', tags: ['filosofia', 'soberania'] },
      { term: 'Shamir Backup', definition: 'Divisão da chave em várias partes, exigindo um número mínimo delas para restaurar. Reduz o risco de um único esconderijo comprometido.', tags: ['autocustódia'], link: { label: 'Backup da seed phrase', to: '/autocustodia/backup-seed-phrase-guia' } },
      { term: 'Satoshi', definition: 'Menor divisão de um Bitcoin = 0,00000001 BTC. Quando alguém fala que tem 10 Satoshis, significa que possui 0,00000010 BTC.', tags: ['bitcoin'] },
      { term: 'Satoshi Nakamoto', definition: 'Pseudônimo usado para o criador do Bitcoin.', tags: ['bitcoin'] },
      { term: 'Scam', definition: 'Gíria para golpe ou sites fraudulentos. São sites que surgem na internet prometendo altos rendimentos com investimentos em várias tipos de plataformas. Normalmente duram dias, meses ou, quando muito, anos até que sumam com o dinheiro de seus investidores.', tags: ['segurança'] },
      { term: 'Scamcoin', definition: 'Altcoin criada com objetivos de dar golpe nos usuários e enriquecer os criadores.', tags: ['segurança'] },
      { term: 'Scrypt', definition: 'Criptografia alternativa designada para ser mais utilizada por CPUs e GPUs, oferecendo uma resistência aos ASICs.', tags: ['tecnologia'] },
      { term: 'SEPA', definition: 'Single European Payments Area, em português, Área Única de Pagamentos Europeus, é um sistema de pagamento integrado entre os países da Zona do Euro, que permite transferir fundos entre bancos e países diferentes.', tags: ['finanças'] },
      { term: 'SHA-256', definition: 'Função matemática do tipo hash utilizando no bitcoin em diversos contextos, inclusive durante o processo de mineração.', tags: ['tecnologia'] },
      { term: 'ShitCoin', definition: 'É o termo utilizado para classificar moedas scams, com baixa ou nenhuma reputação na comunidade.', tags: ['mercado'] },
      { term: 'Smart Contract', definition: 'Um smart contract — também conhecido como contrato inteligente ou contrato digital — é um código de computador autoexecutável desenvolvido para facilitar, efetivar e proteger as operações financeiras no Blockchain.', tags: ['tecnologia'] },
      { term: 'Spread', definition: 'Diferença entre o preço de compra e o preço de venda no livro de ofertas (book).', tags: ['trading'] },
      { term: 'Soft Fork', definition: 'Atualização de uma moeda que não exige que o sistema da mesma seja reiniciado com uma nova blockchain. Normalmente acontece sem que percebamos.', tags: ['tecnologia'] },
      { term: 'Swingtrader', definition: 'Estratégia de trade com poucas operações ao longo do tempo. Se aproveita das ondas (swings) do mercado.', tags: ['trading'] },
    ],
  },
  {
    letter: 'T',
    terms: [
      { term: 'Tributação na fonte', definition: 'Retenção feita pelo pagador antes de o dinheiro chegar até você. Varia conforme o tratado entre o país de origem e o de residência.', tags: ['fiscal', 'offshore'] },
      { term: 'Territorial', definition: 'Regime em que o país tributa apenas a renda gerada dentro dele, deixando a renda estrangeira livre de imposto local.', tags: ['fiscal', 'offshore'], link: { label: 'Melhores países para brasileiros', to: '/saida/melhores-paises-brasileiros' } },
      { term: 'Taker', definition: 'Taker é o investidor que possui uma ordem que é instantaneamente executada pois encontra outra ordem contrária.', tags: ['trading'] },
      { term: 'Tag Destination', definition: 'A tag destination é um código atribuído a cada conta do XRP. É usada para identificar o destinatário da transação, como se fosse o número da sua residência quando é entregue uma encomenda.', tags: ['tecnologia'] },
      { term: 'Tempo de Confirmação', definition: 'É o tempo percorrido entre o momento em que uma transação é enviada à rede e o tempo em que é registrada em um bloco. Basicamente, é o tempo que um usuário precisa esperar até que sua transação seja confirmada na rede.', tags: ['bitcoin'] },
      { term: 'Terahashes/sec – TH/s', definition: 'Número de tentativas possíveis de resolver um hash em um dado segundo, medido em trilhões de hashes.', tags: ['mineração'] },
      { term: 'Testnet', definition: 'Uma rede alternativa ao Bitcoin usada para testes.', tags: ['infraestrutura'] },
      { term: 'Ticker', definition: 'É o nome dado aos símbolos das moedas: BTC (Bitcoin), ETH (Ethereum), LTC (Litecoin), XRP (Ripple), ADA (Cardano).', tags: ['mercado'] },
      { term: 'Token', definition: 'Normalmente os tokens são confundidos com criptomoedas, porém existem diferenças. As criptomoedas são moedas criadas com o propósito de serem moedas, já os tokens são criados para serem distribuídos a pessoas com promessas de valerem algo no futuro.', tags: ['tecnologia'] },
      { term: 'TOR', definition: 'Sigla de The Onion Router, em português: O Roteador Cebola. É um protocolo de roteamento, usado por pessoas que querem manter sua privacidade na rede.', tags: ['privacidade'] },
      { term: 'Trade', definition: 'Operação de compra e venda de alguma criptomoeda. Quando você deposita 100 reais, compra X Bitcoin e depois vende, você está fazendo uma operação de trading.', tags: ['trading'] },
      { term: 'TXID', definition: 'Mais conhecido como hash da transação. Este é um identificador usado para referenciar transações em uma blockchain.', tags: ['bitcoin'] },
    ],
  },
  {
    letter: 'U',
    terms: [
      { term: 'UTXO', definition: 'Cada pedaço de bitcoin recebido é uma moeda inteira e indivisível na contabilidade da rede. Entender isso é entender taxas e privacidade.', tags: ['bitcoin', 'privacidade'], link: { label: 'UTXO e consolidação', to: '/autocustodia/utxo-consolidacao' } },
    ],
  },
  {
    letter: 'V',
    terms: [
      { term: 'Vbyte', definition: 'Unidade de tamanho de uma transação. A taxa é paga por vbyte, e não pelo valor enviado: mil reais e um milhão custam o mesmo.', tags: ['bitcoin'], link: { label: 'UTXO e consolidação', to: '/autocustodia/utxo-consolidacao' } },
      { term: 'Volatilidade', definition: 'Movimentos dos preços de um ativo. Se o valor do ativo sobe e desce com muita frequência, às vezes até de diferenças de preço grandes, diz-se que o ativo tem alta volatilidade.', tags: ['mercado'] },
    ],
  },
  {
    letter: 'W',
    terms: [
      { term: 'Wallet', definition: 'Em português "carteira" é onde o investidor pode guardar suas moedas digitais de forma mais segura até o momento de venda e/ou troca.', tags: ['carteira'] },
      { term: 'Withdrawal', definition: 'Retirada de algum valor, como um saque.', tags: ['finanças'] },
    ],
  },
  {
    letter: 'X',
    terms: [
      { term: 'XBT', definition: 'Representa a unidade monetária do bitcoin.', tags: ['bitcoin'] },
      { term: 'XRP', definition: 'Símbolo ticker da criptomoeda Ripple.', tags: ['moeda'] },
    ],
  },
];


const ALL_TAGS = Array.from(new Set(dictionary.flatMap(g => g.terms.flatMap(t => t.tags || [])))).sort();
const TOTAL_TERMS = dictionary.reduce((acc, g) => acc + g.terms.length, 0);
const INTERLUDES = [
  { asset: referenceAsset, alt: 'Documentos técnicos organizados para consulta', caption: 'Palavras têm origem. Procure a fonte antes de repetir uma promessa.' },
  { asset: documentAsset, alt: 'Cópia impressa do documento original do Bitcoin', caption: 'O protocolo deve ser entendido pelo que faz, não pelo que prometem sobre ele.' },
  { asset: backupAsset, alt: 'Dispositivos e mídia de backup organizados sobre bancada', caption: 'Custódia começa quando o vocabulário vira prática verificável.' },
  { asset: hardwareAsset, alt: 'Equipamentos e cabos de segurança digital em bancada', caption: 'Cada escolha técnica tem um modelo de ameaça e um limite.' },
  { asset: researchAsset, alt: 'Pessoa conferindo documentos com lupa e anotações', caption: 'O que você entende pode conferir. O que não entende merece pausa.' },
];

export default function DicionarioCripto() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    if (!showQrModal) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setShowQrModal(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showQrModal]);

  const filtered = useMemo(() => dictionary.map(group => ({
    ...group,
    terms: group.terms.filter(t =>
      (!search || `${t.term} ${t.definition}`.toLocaleLowerCase('pt-BR').includes(search.trim().toLocaleLowerCase('pt-BR'))) &&
      (!activeTag || t.tags?.includes(activeTag))
    ),
  })).filter(group => group.terms.length), [search, activeTag]);
  const count = filtered.reduce((sum, group) => sum + group.terms.length, 0);
  const copy = async () => {
    try { await navigator.clipboard.writeText(LIGHTNING_ADDRESS); setCopied(true); window.setTimeout(() => setCopied(false), 2000); } catch { setCopied(false); }
  };
  const jump = (letter: string) => {
    setSearch(''); setActiveTag(null);
    window.setTimeout(() => document.getElementById(`letter-${letter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  return <>
    <SeoHead custom={{
      title: 'Alfabeto Cripto: glossário de Bitcoin e autocustódia | Lord Junnior',
      description: `Consulte ${TOTAL_TERMS} termos de Bitcoin, custódia, privacidade, mercado e tributação. Busque por palavra, navegue por letra e aprofunde os conceitos nos guias.`,
      canonical: 'https://lordjunnior.com.br/dicionario-cripto',
      primaryKeyword: 'alfabeto cripto', lsiKeywords: ['glossário bitcoin', 'termos de autocustódia', 'dicionário de bitcoin'],
      longTailKeywords: ['o que significa seed phrase', 'o que é UTXO', 'termos de Bitcoin explicados'],
      breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Centro de Conhecimento', url: '/centro-de-conhecimento' }, { name: 'Alfabeto Cripto', url: '/dicionario-cripto' }],
      schemaType: 'Article', articleSection: 'Educação Bitcoin', relatedPages: ['/bitcoin/o-que-e', '/autocustodia', '/centro-de-conhecimento'],
    }} />
    <main className="smx-page min-h-screen">
      <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
      <Hero asset={heroAsset} heroAlt="Livros e documentação técnica em estante iluminada" eyebrow="Centro de Conhecimento / Referência" category="Bitcoin em linguagem clara" title="Alfabeto Cripto" lede="Da primeira pergunta à decisão de guardar suas próprias chaves. Um vocabulário para ler com clareza, sem precisar confiar em quem fala mais alto." icon={BookOpen} />
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20"><div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20"><div><span className="smx-copper text-xs font-bold uppercase">00 / O que há aqui</span><div className="smx-rule mt-5 h-0.5 w-16" /></div><div><Heading chapter="Antes do primeiro termo">Entender muda a próxima decisão.</Heading><p className="max-w-3xl text-lg leading-[1.75] md:text-xl">Este alfabeto reúne termos de Bitcoin, autocustódia, finanças e legislação. Algumas palavras descrevem outros ativos apenas para que você reconheça o contexto. Nenhuma definição substitui documentação técnica, orientação profissional ou a conferência da regra vigente.</p><p className="smx-muted mt-6 text-sm font-semibold">{TOTAL_TERMS} verbetes · {dictionary.length} letras · {ALL_TAGS.length} assuntos</p></div></div></section>

      <section id="consulta" className="sticky top-0 z-40 border-b border-border bg-background/95 px-6 py-4 backdrop-blur-xl md:px-12 lg:px-20" aria-label="Busca no alfabeto">
        <div className="mx-auto max-w-[1600px]">
          <div className="relative max-w-2xl"><Search className="smx-muted pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" aria-hidden /><label htmlFor="dictionary-search" className="sr-only">Buscar termo, sigla ou definição</label><input id="dictionary-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar termo, sigla ou definição" className="smx-focus min-h-[48px] w-full rounded-md border border-border bg-card py-3 pl-12 pr-14 text-base text-foreground placeholder:text-muted-foreground" />{search && <Button variant="ghost" size="icon" className="smx-focus absolute right-1 top-1/2 min-h-[44px] min-w-[44px] -translate-y-1/2" aria-label="Limpar busca" onClick={() => setSearch('')}><X className="h-5 w-5" /></Button>}</div>
          <div className="mt-4 flex gap-1 overflow-x-auto pb-2" aria-label="Ir para letra">{dictionary.map(group => <Button key={group.letter} variant="ghost" size="icon" className="smx-focus min-h-[44px] min-w-[44px] shrink-0 border border-border font-black" onClick={() => jump(group.letter)} aria-label={`Ir para letra ${group.letter}`}>{group.letter}</Button>)}</div>
          <Button variant="ghost" className="smx-focus mt-2 min-h-[44px] gap-2" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters} aria-controls="dictionary-filters">Filtrar por assunto {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</Button>
          {showFilters && <div id="dictionary-filters" className="mt-2 flex max-h-40 flex-wrap gap-2 overflow-y-auto pb-2"><Button size="sm" variant={activeTag === null ? 'default' : 'outline'} className="smx-focus min-h-[44px]" onClick={() => setActiveTag(null)}>Todos</Button>{ALL_TAGS.map(tag => <Button key={tag} size="sm" variant={activeTag === tag ? 'default' : 'outline'} className="smx-focus min-h-[44px]" onClick={() => setActiveTag(activeTag === tag ? null : tag)}>{tag}</Button>)}</div>}
          <p className="smx-muted mt-2 text-sm" aria-live="polite">{count} {count === 1 ? 'verbete encontrado' : 'verbetes encontrados'}</p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20" aria-label="Verbetes"><div className="mx-auto max-w-[1600px]">
        {filtered.length === 0 && <div className="py-20 text-center"><h2 className="text-2xl font-black">Nenhum verbete encontrado</h2><p className="smx-muted mt-3">Tente outra palavra ou retire o filtro.</p><Button variant="outline" className="smx-focus mt-6 min-h-[44px]" onClick={() => { setSearch(''); setActiveTag(null); }}>Limpar filtros</Button></div>}
        {filtered.map((group, index) => <div key={group.letter}>
          <section id={`letter-${group.letter}`} className="scroll-mt-64 border-t border-border py-12 md:py-16" aria-labelledby={`heading-${group.letter}`}>
            <div className="mb-9 flex items-baseline justify-between gap-4"><h2 id={`heading-${group.letter}`} className="smx-ink text-6xl font-black uppercase md:text-8xl">{group.letter}<span className="smx-copper">.</span></h2><span className="smx-muted text-sm">{group.terms.length} {group.terms.length === 1 ? 'verbete' : 'verbetes'}</span></div>
            <div className="grid gap-x-12 md:grid-cols-2">{group.terms.map(term => <article key={term.term} className="border-t border-border py-6"><h3 className="text-xl font-black leading-tight md:text-2xl">{term.term}</h3><p className="mt-3 text-base leading-[1.7]">{term.definition}</p>{term.tags && <div className="mt-4 flex flex-wrap gap-2">{term.tags.map(tag => <span key={tag} className="smx-muted border-l border-border pl-2 text-xs font-semibold uppercase">{tag}</span>)}</div>}{term.link && <Link className="smx-focus smx-copper mt-4 inline-flex min-h-[44px] items-center gap-2 font-bold underline underline-offset-4" to={term.link.to}>{term.link.label}<ArrowRight className="h-4 w-4" aria-hidden /></Link>}</article>)}</div>
          </section>
          {!search && !activeTag && [3, 7, 11, 15, 19].includes(index) && <div className="pb-16"><Figure asset={INTERLUDES[[3, 7, 11, 15, 19].indexOf(index)].asset} alt={INTERLUDES[[3, 7, 11, 15, 19].indexOf(index)].alt} caption={INTERLUDES[[3, 7, 11, 15, 19].indexOf(index)].caption} /></div>}
        </div>)}
      </div></section>
      <Veredito headline={<>O termo certo abre <span className="smx-editorial">a pergunta certa.</span></>} paragraphs={['Conhecer a palavra não encerra a investigação. Confira documentação, riscos e limites antes de usar qualquer ferramenta ou tomar uma decisão financeira.', 'Comece pela base de Bitcoin e volte a este alfabeto sempre que um conceito pedir clareza.']} />
      <section className="px-6 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1600px]"><Heading chapter="Continue a leitura">Da palavra à prática.</Heading><div className="grid gap-4 md:grid-cols-2">{[{ to: '/bitcoin/o-que-e', title: 'O que é Bitcoin?', desc: 'Entenda o protocolo antes de avaliar promessas.' }, { to: '/autocustodia', title: 'Autocustódia', desc: 'O que muda quando você controla suas próprias chaves.' }].map(item => <Link key={item.to} to={item.to} className="smx-focus block min-h-[120px] border-t border-border py-6"><h3 className="text-2xl font-black">{item.title} <ArrowRight className="smx-copper inline h-5 w-5" /></h3><p className="mt-2 text-base">{item.desc}</p></Link>)}</div></div></section>
      <section className="smx-deep px-6 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[800px] text-center"><h2 className="text-3xl font-black uppercase md:text-5xl">Apoie este acervo</h2><p className="mt-5 text-lg leading-relaxed text-background/90">O conteúdo é gratuito. Se esta consulta ajudou você, pode contribuir via Lightning.</p><Button variant="outline" className="smx-focus mt-8 min-h-[44px]" onClick={() => setShowQrModal(true)}>Mostrar QR Lightning</Button></div></section>
      {showQrModal && <div role="presentation" className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 px-6" onClick={() => setShowQrModal(false)}><div role="dialog" aria-modal="true" aria-label="Apoio Lightning" onClick={e => e.stopPropagation()} className="smx-page relative w-full max-w-sm border border-border bg-background p-6 text-center"><Button variant="ghost" size="icon" className="smx-focus absolute right-2 top-2 min-h-[44px] min-w-[44px]" onClick={() => setShowQrModal(false)} aria-label="Fechar"><X /></Button><h2 className="mt-8 text-2xl font-black">Apoio Lightning</h2><img src={qrCodeImage} alt="Código QR para pagamento Lightning" className="mx-auto my-6 aspect-square w-56 object-contain" /><Button variant="outline" className="smx-focus min-h-[44px] max-w-full gap-2 text-xs" onClick={copy}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}<span className="truncate">{LIGHTNING_ADDRESS}</span></Button></div></div>}
    </main>
  </>;
}
