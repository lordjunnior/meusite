import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Search, BookOpen, ArrowRight, Zap, Copy, Check, X,
  QrCode, Hash, Shield, Lock, Globe, Cpu, TrendingUp,
  AlertTriangle, Eye, Layers, ChevronDown, ChevronUp
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import qrCodeImage from '@/assets/qrcode-lightning.jpeg';
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

/* ─── CONSTANTS ─── */
const LIGHTNING_ADDRESS = "securecorn53@walletofsatoshi.com";
const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const BG_DARK = '#050808';
const BG_ALT = '#070b0b';

/* ─── ANIMATIONS ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.08 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

/* ─── DICTIONARY DATA ─── */
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

const tagColors: Record<string, string> = {
  bitcoin: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  mercado: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  trading: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  tecnologia: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
  segurança: 'bg-red-500/15 text-red-400 border-red-500/25',
  mineração: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  carteira: 'bg-teal-500/15 text-teal-400 border-teal-500/25',
  hardware: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  infraestrutura: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25',
  regulação: 'bg-rose-500/15 text-rose-400 border-rose-500/25',
  finanças: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  moeda: 'bg-lime-500/15 text-lime-400 border-lime-500/25',
  filosofia: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  privacidade: 'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/25',
  ethereum: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
  soberania: 'bg-yellow-600/15 text-yellow-300 border-yellow-600/25',
  offshore: 'bg-emerald-600/15 text-emerald-300 border-emerald-600/25',
  fiscal: 'bg-orange-600/15 text-orange-300 border-orange-600/25',
  imigração: 'bg-blue-600/15 text-blue-300 border-blue-600/25',
  p2p: 'bg-pink-500/15 text-pink-400 border-pink-500/25',
  autocustódia: 'bg-teal-600/15 text-teal-300 border-teal-600/25',
};

/* ─── FLOATING PARTICLES ─── */
const CryptoParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-px h-px rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: i % 3 === 0 ? 'rgba(234,179,8,0.3)' : i % 3 === 1 ? 'rgba(16,185,129,0.2)' : 'rgba(139,92,246,0.2)',
          boxShadow: `0 0 ${4 + Math.random() * 8}px ${i % 3 === 0 ? 'rgba(234,179,8,0.15)' : 'rgba(16,185,129,0.1)'}`,
        }}
        animate={{
          y: [0, -80 - Math.random() * 120, 0],
          x: [0, (Math.random() - 0.5) * 60, 0],
          opacity: [0, 0.6, 0],
          scale: [0.5, 1.5, 0.5],
        }}
        transition={{
          duration: 8 + Math.random() * 12,
          repeat: Infinity,
          delay: Math.random() * 8,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

/* ─── ALPHABET NAV ─── */
const AlphabetNav = ({ letters, activeLetter, onSelect }: { letters: string[]; activeLetter: string; onSelect: (l: string) => void }) => (
  <div className="flex flex-wrap justify-center gap-1.5">
    {letters.map((l) => (
      <button
        key={l}
        onClick={() => onSelect(l)}
        className={`w-9 h-9 rounded-lg text-xs font-bold tracking-wider transition-all duration-300
          ${activeLetter === l
            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.15)]'
            : 'bg-white/[0.03] text-stone-500 border border-white/[0.06] hover:bg-white/[0.06] hover:text-stone-300'
          }`}
      >
        {l}
      </button>
    ))}
  </div>
);

/* ─── TERM CARD ─── */
const TermCard = ({ term, index }: { term: Term; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className="group relative"
    >
      <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 
                      hover:bg-white/[0.04] hover:border-yellow-500/15 
                      transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.04)]">
        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <h3 className="font-['Bebas_Neue'] text-xl text-yellow-400/90 tracking-wide mb-2">
            {term.term}
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed font-['Space_Grotesk']">
            {term.definition}
          </p>
          {term.tags && term.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {term.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tagColors[tag] || 'bg-white/5 text-stone-500 border-white/10'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {term.link && (
            <Link
              to={term.link.to}
              className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-bold uppercase tracking-widest text-yellow-500/80 hover:text-yellow-400 transition-colors"
            >
              {term.link.label}
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── LETTER SECTION ─── */
const LetterSection = ({ group, sectionIndex }: { group: LetterGroup; sectionIndex: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      id={`letter-${group.letter}`}
      custom={0}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={scaleIn}
      className="scroll-mt-32"
    >
      {/* Letter Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 
                        border border-yellow-500/20 flex items-center justify-center
                        shadow-[0_0_30px_rgba(234,179,8,0.08)]">
          <span className="font-['Bebas_Neue'] text-3xl text-yellow-400">{group.letter}</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/20 via-yellow-500/5 to-transparent" />
        <span className="text-stone-600 text-[10px] font-bold tracking-widest uppercase">
          {group.terms.length} {group.terms.length === 1 ? 'termo' : 'termos'}
        </span>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {group.terms.map((term, i) => (
          <TermCard key={term.term} term={term} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

/* ─── MAIN PAGE ─── */
const DicionarioCripto = () => {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeLetter, setActiveLetter] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const allLetters = dictionary.map(g => g.letter);

  const filteredDictionary = useMemo(() => {
    return dictionary
      .map((group) => ({
        ...group,
        terms: group.terms.filter((t) => {
          const matchSearch = search === '' ||
            t.term.toLowerCase().includes(search.toLowerCase()) ||
            t.definition.toLowerCase().includes(search.toLowerCase());
          const matchTag = !activeTag || (t.tags && t.tags.includes(activeTag));
          return matchSearch && matchTag;
        }),
      }))
      .filter((group) => group.terms.length > 0);
  }, [search, activeTag]);

  const filteredCount = filteredDictionary.reduce((acc, g) => acc + g.terms.length, 0);

  const handleLetterSelect = useCallback((letter: string) => {
    setActiveLetter(letter);
    setSearch('');
    setActiveTag(null);
    const el = document.getElementById(`letter-${letter}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(LIGHTNING_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": dictionary.flatMap(g =>
      g.terms.slice(0, 3).map(t => ({
        "@type": "Question",
        "name": `O que significa ${t.term} no mundo cripto?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t.definition,
        },
      }))
    ).slice(0, 20),
  };

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden" style={{ background: BG_DARK }}>
      <Helmet>
        <link rel="canonical" href={canonicalUrl('/dicionario-cripto')} />
        <meta property="og:url" content={canonicalUrl('/dicionario-cripto')} />
        <title>Alfabeto Cripto – Dicionário Cripto Completo | Lord Junnior</title>
        <meta name="description" content="Dicionário cripto completo com mais de 100 termos, siglas e gírias do universo das criptomoedas. De HODL a Halving, de Satoshi a Smart Contract. O guia definitivo para decodificar o mundo cripto." />
        <meta name="keywords" content="alfabeto cripto, dicionário cripto, glossário bitcoin, termos criptomoedas, siglas cripto, HODL, halving, blockchain, satoshi, altcoin" />
        <meta property="og:title" content="Alfabeto Cripto – Dicionário Cripto Completo" />
        <meta property="og:description" content="Mais de 100 termos, siglas e gírias do universo cripto explicados de forma direta e sem enrolação." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
      <CryptoParticles />

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ background: 'linear-gradient(125deg, transparent 25%, rgba(234,179,8,0.08) 50%, transparent 75%)' }} />
      </div>

      {/* ─── BREATHING ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[10%] w-[600px] h-[600px] rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-yellow-500/30 to-transparent blur-3xl" />
        </motion.div>
        <motion.div
          className="absolute top-[50%] right-[5%] w-[500px] h-[500px] rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-emerald-500/25 to-transparent blur-3xl" />
        </motion.div>
        <motion.div
          className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 6 }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-violet-500/20 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* ─── HERO ─── */}
      <CinematicHero
        image="/heroes/dicionario-cripto.webp"
        phase="ALFABETO CRIPTO"
        title="ALFABETO CRIPTO"
        subtitle="O dicionário definitivo do universo cripto"
        icon={BookOpen}
        accentColor="yellow"
        backLink="/educacao"
        backLabel="Educação"
      />

      {/* ─── INTRO ─── */}
      <section className="relative py-20 lg:py-28" style={{ background: BG_ALT }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
              PREPARAMOS UM DICIONÁRIO CRIPTO PARA VOCÊ
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <h2 className="font-['Bebas_Neue'] text-3xl lg:text-5xl text-foreground leading-tight mb-6">
              Entenda todos os termos e gírias<br />
              <span className="text-yellow-400">utilizadas no mundo cripto</span>
            </h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
            <p className="text-stone-400 text-base lg:text-lg leading-relaxed font-['Space_Grotesk'] max-w-3xl mx-auto">
              Ao longo dos 10 anos de existência dos ativos digitais, surgiram diversas criptomoedas e com elas 
              centenas de termos técnicos e gírias utilizadas para embasar uma comunicação mais específica no mundo 
              da criptoeconomia. Este é o seu guia definitivo.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { value: `${TOTAL_TERMS}+`, label: 'Termos' },
              { value: `${allLetters.length}`, label: 'Letras' },
              { value: `${ALL_TAGS.length}`, label: 'Categorias' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-['Bebas_Neue'] text-4xl text-yellow-400">{stat.value}</div>
                <div className="text-stone-600 text-[9px] font-bold tracking-[0.3em] uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Section glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-yellow-500/[0.03] rounded-full blur-3xl" />
      </section>

      {/* ─── SEARCH & FILTERS ─── */}
      <section className="relative py-12 sticky top-0 z-40 backdrop-blur-2xl border-b border-white/[0.05]" 
               style={{ background: `${BG_DARK}ee` }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar termo, sigla ou conceito..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-3.5 pl-12 pr-4
                         text-foreground text-sm font-['Space_Grotesk'] placeholder:text-stone-600
                         focus:outline-none focus:border-yellow-500/30 focus:shadow-[0_0_20px_rgba(234,179,8,0.06)]
                         transition-all duration-300"
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-400 transition-colors">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Alphabet Nav */}
          <AlphabetNav letters={allLetters} activeLetter={activeLetter} onSelect={handleLetterSelect} />

          {/* Filter Toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-stone-500 text-xs hover:text-stone-300 transition-colors"
            >
              <Layers size={12} />
              Filtrar por categoria
              {showFilters ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>

          {/* Tags */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap justify-center gap-2 mt-4 overflow-hidden"
              >
                <button
                  onClick={() => setActiveTag(null)}
                  className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300
                    ${!activeTag ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-white/[0.03] text-stone-500 border-white/[0.06] hover:bg-white/[0.06]'}`}
                >
                  Todos
                </button>
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300
                      ${activeTag === tag
                        ? tagColors[tag] || 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        : 'bg-white/[0.03] text-stone-500 border-white/[0.06] hover:bg-white/[0.06]'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Count */}
          {(search || activeTag) && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center text-stone-600 text-xs mt-4">
              {filteredCount} {filteredCount === 1 ? 'termo encontrado' : 'termos encontrados'}
            </motion.p>
          )}
        </div>
      </section>

      {/* ─── DICTIONARY CONTENT ─── */}
      <section className="relative py-16 lg:py-24" style={{ background: BG_DARK }}>
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          {filteredDictionary.length === 0 ? (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
              className="text-center py-20">
              <Search size={48} className="mx-auto text-stone-700 mb-4" />
              <p className="text-stone-500 text-lg font-['Space_Grotesk']">
                Nenhum termo encontrado para "<span className="text-yellow-400">{search}</span>"
              </p>
              <p className="text-stone-600 text-sm mt-2">Tente outro termo ou limpe os filtros</p>
            </motion.div>
          ) : (
            filteredDictionary.map((group, i) => (
              <LetterSection key={group.letter} group={group} sectionIndex={i} />
            ))
          )}
        </div>

        {/* Background glow effects */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-yellow-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute top-2/3 right-0 w-64 h-64 bg-emerald-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-violet-500/[0.015] rounded-full blur-3xl" />
      </section>

      {/* ─── TRIO DA BLINDAGEM — SEO + PNL + CTA ─── */}
      <section className="relative py-20 lg:py-28" style={{ background: BG_ALT }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-center mb-16">
            <p className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
              POR QUE ESTE DICIONÁRIO EXISTE
            </p>
            <h2 className="font-['Bebas_Neue'] text-3xl lg:text-5xl text-foreground leading-tight">
              Conhecimento é a primeira<br />
              <span className="text-yellow-400">camada de proteção</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Blindagem Cognitiva',
                desc: 'Dominar o vocabulário cripto é a primeira linha de defesa contra golpistas, scams e a desinformação estatal que busca afastar você da soberania financeira.',
                accent: 'yellow',
              },
              {
                icon: Eye,
                title: 'Decodificação de Mercado',
                desc: 'Quando você entende o que significa HODL, Bearish, Pump e Dump, deixa de ser manipulado pelas emoções do mercado e passa a operar com inteligência tática.',
                accent: 'emerald',
              },
              {
                icon: Lock,
                title: 'Soberania Linguística',
                desc: 'Cada termo que você domina é um passo a menos na dependência de "especialistas" que lucram com a sua ignorância. A linguagem é poder.',
                accent: 'violet',
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="group"
              >
                <div className={`relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8
                                hover:border-${pillar.accent}-500/20 transition-all duration-500
                                hover:shadow-[0_0_40px_rgba(234,179,8,0.04)]`}>
                  <div className={`w-14 h-14 rounded-xl bg-${pillar.accent}-500/10 border border-${pillar.accent}-500/20
                                  flex items-center justify-center mb-5`}>
                    <pillar.icon size={24} className={`text-${pillar.accent}-400`} />
                  </div>
                  <h3 className="font-['Bebas_Neue'] text-xl text-foreground tracking-wide mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed font-['Space_Grotesk']">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* PNL Warning */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="relative bg-yellow-500/[0.03] border border-yellow-500/15 rounded-2xl p-8 text-center
                            shadow-[0_0_60px_rgba(234,179,8,0.04)]">
              <AlertTriangle size={24} className="mx-auto text-yellow-500/60 mb-4" />
              <p className="text-stone-300 text-sm lg:text-base leading-relaxed font-['Space_Grotesk'] italic">
                "Quem não domina a linguagem do dinheiro será sempre dominado por quem a domina. 
                O sistema foi projetado para que você não entenda as regras do jogo. 
                Este dicionário é a sua arma de decodificação."
              </p>
              <p className="text-yellow-500/50 text-[10px] font-bold tracking-[0.3em] uppercase mt-4">
                LORD JUNNIOR
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA LINKS ─── */}
      <section className="relative py-16 lg:py-20" style={{ background: BG_DARK }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-center mb-10">
            <h2 className="font-['Bebas_Neue'] text-2xl lg:text-4xl text-foreground">
              Continue sua <span className="text-yellow-400">jornada soberana</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { to: '/blockchain', label: 'Entenda a Blockchain', icon: Layers },
              { to: '/bitcoin/o-que-e', label: 'O Que é o Bitcoin?', icon: Hash },
              { to: '/lightning', label: 'Lightning Network', icon: Zap },
              { to: '/blindagem-golpes', label: 'Blindagem contra Golpes', icon: Shield },
            ].map((link, i) => (
              <motion.div key={link.to} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={link.to}
                  className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-6 py-4
                             hover:bg-white/[0.06] hover:border-yellow-500/15 transition-all duration-500 group">
                  <link.icon size={20} className="text-yellow-500/60 group-hover:text-yellow-400 transition-colors" />
                  <span className="text-stone-300 text-sm font-bold uppercase tracking-wider group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight size={14} className="ml-auto text-stone-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOAÇÃO LIGHTNING ─── */}
      <section className="relative py-20 lg:py-28" style={{ background: BG_ALT }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}>
            <div className="relative bg-gradient-to-b from-yellow-500/[0.04] to-transparent border border-yellow-500/10 rounded-3xl p-10 lg:p-14
                            shadow-[0_0_80px_rgba(234,179,8,0.05)]">
              {/* Glow ring */}
              <div className="absolute -top-px -left-px -right-px -bottom-px rounded-3xl bg-gradient-to-b from-yellow-500/10 to-transparent opacity-50 blur-sm" />
              
              <div className="relative z-10">
                <Zap size={40} className="mx-auto text-yellow-500/60 mb-6" />
                <p className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
                  APOIE ESTE PROJETO
                </p>
                <h2 className="font-['Bebas_Neue'] text-3xl lg:text-4xl text-foreground leading-tight mb-4">
                  Este conteúdo é gratuito.<br />
                  <span className="text-yellow-400">Sua contribuição o mantém vivo.</span>
                </h2>
                <p className="text-stone-400 text-sm leading-relaxed font-['Space_Grotesk'] mb-8 max-w-xl mx-auto">
                  Se este dicionário te ajudou a entender melhor o universo cripto, considere enviar alguns satoshis 
                  via Lightning Network. Cada contribuição fortalece a produção de conteúdo livre e soberano. 
                  Sugestão: de 1.000 a 10.000 sats.
                </p>

                {/* QR Code */}
                <div className="inline-block mb-6">
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="group relative"
                  >
                    <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-yellow-500/20 
                                    group-hover:border-yellow-500/40 transition-all duration-500
                                    shadow-[0_0_40px_rgba(234,179,8,0.08)] group-hover:shadow-[0_0_60px_rgba(234,179,8,0.12)]">
                      <img src={qrCodeImage} alt="QR Code Lightning" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="absolute inset-0 bg-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <QrCode size={32} className="text-yellow-400" />
                    </div>
                  </button>
                </div>

                {/* Address */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2
                               hover:bg-white/[0.06] hover:border-yellow-500/20 transition-all duration-300"
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-stone-500" />}
                    <span className="text-stone-400 text-xs font-mono">{LIGHTNING_ADDRESS}</span>
                  </button>
                </div>

                <p className="text-stone-600 text-[9px] font-bold tracking-[0.3em] uppercase">
                  ⚡ LIGHTNING NETWORK · INSTANTÂNEO · SEM INTERMEDIÁRIOS
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.05] py-12 text-center" style={{ background: BG_DARK }}>
        <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
      </footer>

      {/* ─── QR MODAL ─── */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => setShowQrModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-stone-950 border border-yellow-500/20 rounded-2xl p-8 max-w-sm w-full text-center relative
                         shadow-[0_0_60px_rgba(234,179,8,0.08)]">
              <button onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-stone-600 hover:text-white transition-colors">
                <X size={18} />
              </button>
              <img src={qrCodeImage} alt="QR Code Lightning Network" className="w-64 h-64 mx-auto rounded-xl mb-4" loading="lazy" />
              <p className="text-white text-sm font-bold mb-2">Escaneie com sua carteira Lightning</p>
              <button onClick={handleCopy}
                className="flex items-center gap-2 mx-auto text-yellow-500/70 text-xs hover:text-yellow-400 transition-colors">
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span className="font-mono">{LIGHTNING_ADDRESS}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DicionarioCripto;
