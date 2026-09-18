import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Coins, Layers, Scale, Eye, ChevronDown, ArrowRight,
  AlertTriangle, CheckCircle2, XCircle, Fingerprint, Split, Wallet,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/autocustodia/coinjoin-hero.jpg';
import analogiaImg from '@/assets/autocustodia/coinjoin-analogia.jpg';
import misturaImg from '@/assets/autocustodia/coinjoin-mistura.jpg';

/**
 * /autocustodia/utxo-consolidacao
 * Página pilar: o que é UTXO, consolidação, dust e coin control.
 * Padrão editorial Soberania: Sand #f4ede4 / Deep Teal #0e3b3a / Cobre-âmbar #c97a3d.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const ANALOGIA_NOTAS = [
  { icon: Coins, titulo: 'Notas e moedas na carteira', texto: 'O saldo de uma carteira física de Bitcoin não é um número único guardado num cofre, é uma coleção de notas de valores distintos, cada uma criada num momento diferente. Você não tem "0,5 BTC", você tem um punhado de cédulas separadas que somadas chegam a 0,5 BTC.' },
  { icon: Split, titulo: 'Cada recebimento cria uma nota nova', texto: 'Toda vez que alguém te paga, minera um bloco, faz um swap ou você compra em uma corretora e saca, uma nova nota é impressa e colocada na sua carteira. Com o tempo, sem nenhuma organização, a carteira acumula dezenas ou centenas de notas de tamanhos aleatórios.' },
  { icon: Scale, titulo: 'Gastar exige juntar notas até fechar o valor', texto: 'Quando você paga algo, sua carteira precisa escolher, entre as notas disponíveis, um conjunto cuja soma seja suficiente para cobrir o valor da despesa. Se você tem só notas pequenas, precisa juntar muitas delas para pagar algo grande, exatamente como aconteceria numa carteira de papel.' },
];

const TROCO_EXPLICACAO = [
  'Assim como no dinheiro físico, quando você usa uma nota de valor maior do que a despesa, recebe troco. No Bitcoin, esse troco não volta fisicamente para o mesmo lugar: a transação cria uma nova UTXO, geralmente endereçada a um endereço novo controlado pela própria carteira, com o valor excedente.',
  'Esse mecanismo de troco é a razão pela qual uma carteira ativa nunca para de gerar UTXOs novas. Cada transação de saída que não gasta o valor exato de uma UTXO existente produz, no mínimo, mais uma UTXO de troco, que entra de volta no conjunto disponível para gastos futuros.',
  'É esse ciclo constante de recebimento mais troco que faz o número de UTXOs numa carteira crescer com o tempo, especialmente para quem compra Bitcoin em pequenos aportes regulares ou realiza muitas transações pequenas.',
];

const UTXO_DEFINICAO_TECNICA = [
  { titulo: 'UTXO é a sigla de Unspent Transaction Output', texto: 'Traduzindo, "saída de transação não gasta". É a unidade fundamental de contabilidade do Bitcoin: não existe um registro de "saldo da conta fulano", existe um conjunto global de UTXOs, cada uma com um valor em satoshis e uma condição de gasto (normalmente, a assinatura de uma chave privada específica).' },
  { titulo: 'O saldo da carteira é a soma das UTXOs que ela controla', texto: 'Quando um software de carteira mostra "você tem 0,347 BTC", ele está, por trás dos panos, somando o valor de todas as UTXOs cujo endereço de destino pertence às chaves derivadas daquela seed. Não existe um número armazenado em lugar nenhum, o saldo é sempre recalculado a partir do conjunto de UTXOs.' },
  { titulo: 'Gastar uma UTXO significa consumi-la por inteiro', texto: 'Diferente de uma conta bancária, onde você pode debitar um valor parcial de um saldo contínuo, uma UTXO no Bitcoin é atômica: ou ela é gasta inteira numa transação, ou não é gasta. Se você precisa pagar um valor menor do que a UTXO disponível, o excedente vira troco em uma UTXO nova, como descrito acima.' },
];

const DUST_TOPICOS = [
  { titulo: 'O que é dust (poeira)', texto: 'Dust é o termo usado para UTXOs de valor tão baixo que o custo em taxa de mineração para gastá-las se aproxima ou ultrapassa o próprio valor da UTXO. Uma UTXO de 200 satoshis, por exemplo, pode custar mais do que isso em taxa para ser incluída como entrada numa transação, tornando-a economicamente inútil de gastar isoladamente.' },
  { titulo: 'Por que dust se acumula sozinho', texto: 'Trocos muito pequenos, recebimentos de centavos em serviços de recompensa, sobras de swaps ou de compras fracionadas em exchanges geram UTXOs minúsculas que ficam paradas na carteira. Cada uma delas, isoladamente, não compensa o custo de mover, mas juntas ocupam espaço no índice UTXO do seu software e do próprio nó completo da rede.' },
  { titulo: 'Dust attack: quando a poeira é armadilha de privacidade', texto: 'Existe uma técnica de vigilância chamada dust attack, na qual um agente malicioso envia quantias minúsculas de satoshis para milhares de endereços aleatórios, incluindo os seus, na esperança de que você um dia gaste essa poeira junto com outras UTXOs suas legítimas. Se isso acontecer, o atacante consegue correlacionar aquele endereço de dust com o restante do seu patrimônio, ligando identidades e quebrando a separação entre suas UTXOs.' },
  { titulo: 'Como reagir a uma UTXO de dust suspeita', texto: 'A resposta correta a um dust attack não é gastar a poeira tentando "se livrar dela", e sim simplesmente ignorá-la, deixando-a parada e nunca combinando-a numa mesma transação com UTXOs que você quer manter privadas. Boas carteiras já sinalizam UTXOs suspeitas de dust attack e permitem congelá-las (freeze) para que nunca sejam selecionadas automaticamente.' },
];

const CUSTO_MUITAS_UTXOS = [
  'Cada UTXO usada como entrada (input) numa transação Bitcoin ocupa espaço em vbytes, a unidade de medida de "peso" de uma transação usada para calcular a taxa de mineração. Uma entrada P2WPKH nativa (SegWit) típica consome cerca de 68 vbytes; uma entrada Taproot consome cerca de 57,5 vbytes; formatos legados (P2PKH) chegam a consumir mais de 148 vbytes por entrada.',
  'Uma transação com uma única entrada e duas saídas (destino e troco) em SegWit nativo pesa algo em torno de 141 a 150 vbytes. Já uma transação que precisa juntar 20 UTXOs pequenas para fechar um pagamento pode facilmente ultrapassar 1.500 vbytes, só de entradas, antes mesmo de contar as saídas.',
  'Isso significa que o custo em taxa não depende apenas do valor em bitcoin que você está movendo, depende, sobretudo, de quantas UTXOs você precisa consumir para chegar naquele valor. Uma carteira com poucas UTXOs de valor alto paga taxas muito menores do que uma carteira do mesmo saldo total fragmentada em centenas de UTXOs pequenas.',
  'Esse efeito se agrava justamente nos momentos de rede congestionada, quando a taxa por vbyte (sat/vb) dispara. Uma transação de 1.500 vbytes a 80 sat/vb custa 120.000 satoshis só de taxa, contra 11.280 satoshis para a mesma transação de 141 vbytes com poucas entradas, uma diferença de mais de dez vezes pelo mesmo valor final transferido.',
];

const CALCULO_EXEMPLOS = [
  {
    cenario: 'Carteira com 1 UTXO, pagamento simples',
    detalhe: '1 entrada SegWit (68 vb) + 2 saídas (31 vb cada) + overhead (10,5 vb) ≈ 141 vbytes.',
    conta: 'A 15 sat/vb: 141 × 15 = 2.115 satoshis de taxa.',
  },
  {
    cenario: 'Carteira com 10 UTXOs pequenas, mesmo pagamento',
    detalhe: '10 entradas SegWit (680 vb) + 2 saídas (62 vb) + overhead (10,5 vb) ≈ 752 vbytes.',
    conta: 'A 15 sat/vb: 752 × 15 = 11.280 satoshis de taxa, mais de 5 vezes o custo anterior pelo mesmo pagamento.',
  },
  {
    cenario: 'Consolidação de 30 UTXOs de DCA semanal em uma só',
    detalhe: '30 entradas SegWit (2.040 vb) + 1 saída (31 vb) + overhead (10,5 vb) ≈ 2.081,5 vbytes.',
    conta: 'A 2 sat/vb (mempool vazia): 2.081,5 × 2 ≈ 4.163 satoshis. A 80 sat/vb (rede congestionada): 2.081,5 × 80 ≈ 166.520 satoshis, quase 40 vezes mais caro.',
  },
];

const QUANDO_CONSOLIDAR = [
  { titulo: 'Mempool vazia e taxa de mineração baixa', texto: 'O melhor momento para consolidar é quando a mempool está esvaziada, geralmente em finais de semana ou madrugadas, e a taxa recomendada cai para 1 a 3 sat/vb. Consolidar 20 ou 30 UTXOs pequenas nesses momentos pode custar uma fração do que custaria num pico de congestionamento.' },
  { titulo: 'Antes de um período de alta demanda esperado', texto: 'Se você sabe que vai precisar movimentar fundos rapidamente em breve (venda planejada, pagamento programado), consolidar UTXOs pequenas com antecedência, num momento de taxa baixa, evita ter que pagar caro por uma transação grande de última hora sob pressão de tempo.' },
  { titulo: 'Quando as UTXOs já compartilham a mesma origem de proveniência', texto: 'Se um conjunto de UTXOs já veio da mesma exchange, do mesmo endereço de recebimento recorrente ou já foi visivelmente associado entre si (por exemplo, todas vieram do mesmo serviço de folha de pagamento em bitcoin), consolidá-las não revela informação nova relevante, porque a ligação entre elas já era pública ou já era conhecida pela contraparte.' },
  { titulo: 'Para reduzir custo futuro de gasto de dust acumulado', texto: 'Se você identificou várias UTXOs pequenas, mas que não são de dust attack suspeito (por exemplo, sobras de troco de anos de uso), consolidá-las num momento de taxa baixa é uma forma de "limpar" a carteira antes que o custo relativo de gastá-las suba ainda mais no futuro.' },
];

const QUANDO_NAO_CONSOLIDAR = [
  { titulo: 'Você revela que UTXOs distintas pertencem à mesma pessoa', texto: 'Ao juntar duas ou mais UTXOs como entradas de uma mesma transação, você está assinando publicamente, na blockchain, uma afirmação matemática de que ambas pertencem ao mesmo dono. Isso é chamado de "common input ownership heuristic" e é a base de praticamente toda análise de blockchain comercial usada por exchanges, órgãos de investigação e empresas de chain analysis.' },
  { titulo: 'UTXOs vindas de contextos que você quer manter separados', texto: 'Se uma UTXO veio de um pagamento recebido de um cliente e outra veio de uma compra numa exchange que passou por KYC, consolidá-las revela ao mundo que a mesma pessoa por trás da identidade verificada na exchange também recebeu aquele pagamento específico, uma ligação que talvez você preferisse nunca tornar pública.' },
  { titulo: 'UTXOs que já passaram por CoinJoin', texto: 'Uma UTXO que saiu de uma rodada de CoinJoin tem, por definição, ambiguidade de propriedade em relação às demais UTXOs da mesma rodada. Consolidar essa UTXO com outra UTXO comum sua, fora do contexto do CoinJoin, desfaz parcialmente esse ganho de privacidade, ligando de volta a UTXO "anonimizada" a um padrão de gasto identificável seu.' },
  { titulo: 'Quando o valor em jogo não justifica o risco de correlação', texto: 'Para valores pequenos, às vezes vale mais a pena simplesmente conviver com mais UTXOs fragmentadas do que aceitar o risco de correlação de privacidade que a consolidação impõe. Segurança operacional e privacidade têm custo, e esse custo às vezes é maior do que os satoshis economizados em taxa.' },
];

const COIN_CONTROL_SPARROW = [
  'Abra a aba UTxOs dentro da carteira selecionada no Sparrow Wallet. Ali aparece a lista completa de UTXOs disponíveis, com colunas de valor, data, número de confirmações, endereço de origem e, quando configurado, o label atribuído.',
  'Use os filtros de coluna para ordenar por valor ou por data, identificando visualmente quais UTXOs são pequenas o suficiente para considerar dust e quais compartilham a mesma origem ou label.',
  'Selecione manualmente (com Ctrl ou Shift clicando nas linhas) o conjunto exato de UTXOs que deseja gastar numa transação, em vez de deixar a seleção automática do software escolher por você.',
  'Clique com o botão direito sobre uma UTXO para acessar as opções de "Freeze" (congelar, impedindo que ela seja usada em qualquer seleção automática futura) e "Edit Label" (atribuir um rótulo explicando a origem daquela UTXO).',
  'Antes de enviar, revise na tela de construção da transação (Send) o campo de vbytes estimados e a taxa em sat/vb, ajustando manualmente se o Sparrow sugerir um valor acima do necessário para o horário de baixa demanda da rede.',
];

const COIN_CONTROL_ELECTRUM = [
  'No Electrum, acesse a aba Coins dentro da janela principal da carteira, que lista cada UTXO individualmente com valor, endereço e status de confirmação.',
  'Clique com o botão direito sobre uma ou mais UTXOs selecionadas para escolher "Spend from" (gastar a partir destas), forçando o Electrum a usar exatamente aquele conjunto como entradas da próxima transação, em vez da seleção automática por algoritmo interno.',
  'Use a opção de congelamento (Freeze) disponível no menu de contexto para marcar UTXOs de dust suspeito ou UTXOs que você deseja manter separadas por motivo de privacidade, impedindo seleção acidental.',
  'Na aba History, é possível atribuir labels a transações e endereços específicos, criando um sistema pessoal de etiquetagem que ajuda a lembrar a origem e o propósito de cada UTXO meses ou anos depois.',
  'Ao montar uma transação de consolidação deliberada, confira o resumo de taxa estimada antes de assinar, e prefira fazer isso em horários de mempool historicamente mais vazia, como madrugadas de domingo, horário de Brasília.',
];

const LABELS_TOPICOS = [
  'Etiquetar (label) uma UTXO significa anexar um texto descritivo, guardado localmente no seu software de carteira, explicando de onde ela veio ou para que ela deve ser reservada: "salário fevereiro", "troco de compra hardware wallet", "aporte DCA semana 12", por exemplo.',
  'Labels não vão para a blockchain, existem apenas no seu ambiente local (ou sincronizados de forma criptografada entre seus próprios dispositivos, dependendo do software), e por isso não comprometem privacidade nenhuma perante terceiros.',
  'O padrão BIP329 define um formato de exportação e importação de labels entre carteiras diferentes, permitindo migrar de um software para outro (por exemplo, de Electrum para Sparrow) sem perder todo o histórico de organização mental construído sobre suas UTXOs.',
  'Uma disciplina simples de etiquetar toda UTXO recebida no momento em que ela chega evita, meses depois, ter que reconstruir de memória qual UTXO pode ser consolidada com segurança e qual precisa ficar isolada por motivo de proveniência.',
];

const COINJOIN_RELACAO = [
  'CoinJoin é uma transação colaborativa onde várias pessoas combinam suas UTXOs numa única transação com múltiplas entradas e múltiplas saídas de valores iguais, de forma que um observador externo não consiga determinar com certeza qual saída pertence a qual participante original.',
  'A relação entre consolidação e CoinJoin é, em essência, oposta: consolidação de UTXOs próprias reduz a ambiguidade de propriedade (você está afirmando publicamente que duas UTXOs eram suas), enquanto CoinJoin aumenta deliberadamente essa ambiguidade, misturando sua UTXO com as de estranhos.',
  'Depois de participar de um CoinJoin, a prática recomendada é gastar as UTXOs resultantes de forma isolada, uma de cada vez, ou combiná-las apenas com outras UTXOs que também vieram do mesmo CoinJoin, nunca as consolidando de volta com UTXOs antigas e claramente identificáveis, sob risco de anular o ganho de privacidade obtido.',
  'Pense em consolidação e CoinJoin como dois botões opostos do mesmo painel: um concentra e liga informação, o outro dispersa e desliga a ligação. Usar os dois na hora certa, e nunca na hora errada, é o que diferencia uma gestão de UTXOs madura de uma gestão amadora.',
];

const DCA_ESTRATEGIA = [
  { titulo: 'O problema estrutural do DCA semanal', texto: 'Quem compra Bitcoin toda semana, mesmo que numa mesma exchange ou corretora, recebe uma UTXO nova a cada saque. Em um ano, isso já são 52 UTXOs potencialmente pequenas, todas competindo por espaço na carteira e, futuramente, encarecendo qualquer gasto que precise juntar várias delas.' },
  { titulo: 'Consolidar em lote, não a cada recebimento', texto: 'Em vez de consolidar toda semana (o que gera taxa toda semana, o pior dos dois mundos), a estratégia recomendada é acumular as UTXOs semanais e consolidá-las em lote, a cada 2 ou 3 meses, especificamente num momento identificado de taxa de mineração baixa.' },
  { titulo: 'Aproveitar a origem já comum das UTXOs de DCA', texto: 'Se todas as UTXOs semanais vieram da mesma exchange, com o mesmo processo de KYC já associado ao seu nome legal, consolidá-las entre si normalmente não adiciona novo vazamento de privacidade relevante, porque a ligação de propriedade entre elas já era conhecida pela exchange e, potencialmente, por quem tem acesso aos dados dela.' },
  { titulo: 'Separar o que veio de KYC do que não veio', texto: 'Se, além do DCA via exchange, você também recebe Bitcoin de outras fontes (pagamento por serviço, presente, P2P sem KYC), mantenha essas UTXOs em carteiras ou ao menos em contas separadas dentro do mesmo software, para nunca consolidá-las junto com o lote de origem identificada da exchange.' },
];

const ERROS_COMUNS = [
  { erro: 'Deixar a seleção automática de UTXOs decidir tudo', texto: 'A maioria das carteiras, por padrão, escolhe automaticamente quais UTXOs usar para compor uma transação, priorizando geralmente menor número de entradas ou menor taxa. Isso é conveniente, mas pode juntar UTXOs de proveniências diferentes sem você perceber, revelando ligações de propriedade que você preferiria não revelar.' },
  { erro: 'Consolidar tudo de uma vez, sem olhar a taxa do momento', texto: 'Consolidar 40 UTXOs pequenas numa hora de pico de congestionamento, só porque "hoje deu vontade de organizar a carteira", pode custar dezenas ou centenas de milhares de satoshis a mais do que consolidar o mesmo lote numa madrugada de mempool vazia.' },
  { erro: 'Gastar dust de origem desconhecida junto com UTXOs legítimas', texto: 'Combinar uma UTXO de poeira suspeita, recebida sem motivo aparente, com o restante do seu patrimônio numa mesma transação é o erro clássico que transforma um dust attack de curiosidade estatística em vazamento efetivo de identidade.' },
  { erro: 'Nunca etiquetar nada e depender só da memória', texto: 'Sem labels, depois de um ou dois anos de uso ativo, fica praticamente impossível lembrar qual UTXO veio de onde, e a tendência natural é consolidar tudo de forma displicente só para "simplificar a vida", justamente o oposto do cuidado que o modelo UTXO exige.' },
  { erro: 'Ignorar completamente a consolidação por medo de errar', texto: 'O extremo oposto também é um erro: acumular centenas de UTXOs por anos, sem nunca consolidar nada por receio de cometer um erro de privacidade, resulta em custos de taxa cada vez mais altos no dia em que finalmente for necessário gastar o patrimônio inteiro, por exemplo numa herança ou numa venda grande.' },
];

const FAQ = [
  { q: 'O que é UTXO, em uma frase simples?', a: 'UTXO é a sigla de "Unspent Transaction Output", uma saída de transação Bitcoin ainda não gasta, funcionando como uma nota ou moeda física de valor específico que compõe, junto com outras UTXOs, o saldo total de uma carteira.' },
  { q: 'Ter muitas UTXOs pequenas é sempre ruim?', a: 'Não necessariamente para privacidade, mas quase sempre para custo. Muitas UTXOs pequenas custam mais caro para gastar, porque cada uma consumida como entrada adiciona vbytes à transação e, portanto, mais taxa de mineração, especialmente em momentos de rede congestionada.' },
  { q: 'Consolidar UTXOs reduz minha privacidade?', a: 'Sim, na maioria dos casos. Consolidar UTXOs numa mesma transação afirma publicamente na blockchain que elas pertencem à mesma pessoa, o que é a base da heurística de propriedade comum usada por empresas de análise de blockchain. Consolide apenas UTXOs cuja ligação de proveniência já é conhecida ou aceitável de ser revelada.' },
  { q: 'Quando é o melhor momento para consolidar UTXOs?', a: 'Idealmente quando a mempool está vazia e a taxa recomendada está baixa, algo entre 1 e 5 sat/vb, geralmente em finais de semana ou madrugadas. Consolidar num momento de congestionamento pode custar dezenas de vezes mais caro pela mesma operação.' },
  { q: 'O que é dust e por que ele é perigoso?', a: 'Dust é uma UTXO de valor tão baixo que o custo de taxa para gastá-la se aproxima ou ultrapassa seu próprio valor. Além do desperdício econômico, dust recebido sem motivo aparente pode ser parte de um dust attack, uma técnica de vigilância para tentar ligar seu endereço a outras UTXOs suas caso você o gaste junto com elas.' },
  { q: 'Coin control é só para usuários avançados?', a: 'Não. Coin control, disponível em softwares como Sparrow Wallet e Electrum, é a capacidade de escolher manualmente quais UTXOs usar em cada transação. Qualquer pessoa que já entende o básico de Bitcoin se beneficia de aprender esse recurso, porque ele é a ferramenta central tanto para economizar em taxa quanto para proteger privacidade.' },
  { q: 'CoinJoin e consolidação de UTXOs são a mesma coisa?', a: 'Não, são práticas opostas em efeito. Consolidação junta suas próprias UTXOs, revelando que pertencem à mesma pessoa. CoinJoin junta UTXOs de várias pessoas diferentes numa mesma transação, criando ambiguidade sobre qual saída pertence a qual participante, aumentando a privacidade em vez de reduzi-la.' },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Representação visual de múltiplas UTXOs de Bitcoin sendo organizadas e combinadas, simbolizando o modelo de notas e moedas da rede"
        width={1264}
        height={848}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,59,58,0.6) 0%, rgba(14,59,58,0.4) 40%, rgba(14,59,58,0.92) 100%)' }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-3 mb-8">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md" style={{ backgroundColor: 'rgba(244,237,228,0.15)', color: '#f4ede4', border: '1px solid rgba(244,237,228,0.3)' }}>
            <ShieldCheck size={11} className="inline mr-2" /> Autocustódia · Guia Pilar
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          O que é UTXO{' '}
          <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(232,163,107,0.45)' }}>
            e por que consolidar sem cuidado sai caro.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Sua carteira de Bitcoin não guarda um saldo, guarda notas e moedas de tamanhos diferentes. Este guia cobre o modelo UTXO completo: troco, dust, cálculo real de taxa, quando consolidar, quando jamais consolidar por privacidade, coin control em Sparrow e Electrum, e a estratégia certa para quem faz DCA.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function UtxoConsolidacao() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/autocustodia/utxo-consolidacao"
        custom={{
          title: 'O que é UTXO: Guia Completo de Consolidação e Coin Control',
          description: 'O que é UTXO no Bitcoin, como funciona troco e dust, cálculo real de vbytes e taxa, quando consolidar UTXOs, riscos de privacidade e coin control em Sparrow e Electrum.',
          canonical: 'https://lordjunnior.com.br/autocustodia/utxo-consolidacao',
          primaryKeyword: 'o que é UTXO',
          lsiKeywords: [
            'consolidação de UTXO bitcoin',
            'coin control sparrow wallet',
            'coin control electrum',
            'dust attack bitcoin',
            'vbytes e taxa de mineração',
            'privacidade bitcoin UTXO',
            'labels de UTXO BIP329',
          ],
          longTailKeywords: [
            'o que é UTXO no bitcoin explicado de forma simples',
            'quando devo consolidar minhas UTXOs',
            'como calcular taxa de transação bitcoin em vbytes',
            'como usar coin control no sparrow wallet',
            'o que é dust attack e como se proteger',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Autocustódia', url: '/autocustodia' },
            { name: 'UTXO e Consolidação', url: '/autocustodia/utxo-consolidacao' },
          ],
          schemaType: 'Article',
          articleSection: 'Autocustódia',
          relatedPages: [
            '/autocustodia/coinjoin-privacidade',
            '/autocustodia/backup-seed-phrase-guia',
            '/autocustodia/hardware-wallet-diy-bitcoin',
            '/comparativos/melhores-hardware-wallets',
            '/multisig-bitcoin',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — O que é UTXO */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>O que é UTXO</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Sua carteira não tem saldo,{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  tem um punhado de moedas.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  O Bitcoin não usa um modelo de contas com saldo contínuo, como um banco tradicional. Ele usa o modelo UTXO, sigla de Unspent Transaction Output, ou "saída de transação não gasta". Cada UTXO é um pedaço discreto de valor, com dono e tamanho definidos, e o saldo que você vê num aplicativo de carteira é apenas a soma de todas as UTXOs que pertencem às chaves derivadas da sua seed.
                </p>
                <p>
                  Essa diferença estrutural em relação a um banco tem consequências práticas enormes, que a maioria dos usuários nunca aprende porque as carteiras escondem essa complexidade atrás de um número único e simpático no topo da tela. Entender UTXO é entender por que algumas transações custam caro, por que privacidade em Bitcoin exige cuidado ativo, e por que "juntar tudo numa transação só" não é sempre a decisão certa.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light" style={{ borderLeft: '3px solid #c97a3d', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  Entender UTXO é a diferença entre gastar em Bitcoin como quem entende dinheiro, e gastar como quem apenas confia no número da tela.
                </blockquote>
                <p>
                  Este guia cobre o modelo UTXO do começo ao fim: a analogia com notas e moedas físicas, o mecanismo de troco, o problema do dust, o cálculo real de vbytes e taxa, quando consolidar e, principalmente, quando jamais consolidar por causa de privacidade.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Analogia de notas e moedas */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 02</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(244,237,228,0.7)' }}>A analogia de notas e moedas</p>
                <img src={analogiaImg} alt="Notas e moedas físicas representando a analogia do modelo UTXO no Bitcoin" width={640} height={480} loading="lazy" decoding="async" className="mt-8 rounded-2xl w-full h-auto object-cover hidden lg:block" style={{ border: '1px solid rgba(232,163,107,0.2)' }} />
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10">
                Pense na carteira{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>como um bolso de cédulas.</span>
              </h2>
              <div className="space-y-10">
                {ANALOGIA_NOTAS.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <motion.div key={i} {...fade(i * 0.08)} className="flex gap-6">
                      <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(232,163,107,0.12)', border: '1px solid rgba(232,163,107,0.3)' }}>
                        <Icon size={24} style={{ color: '#e8a36b' }} />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{a.titulo}</h3>
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{a.texto}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Definição técnica */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 03</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>A definição técnica</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Do ponto de vista do protocolo,{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>não existe conta.</span>
              </h2>
              <div className="space-y-8">
                {UTXO_DEFINICAO_TECNICA.map((d, i) => (
                  <motion.div key={i} {...fade(i * 0.08)} className="p-7 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                    <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: '#0e3b3a' }}>{d.titulo}</h3>
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{d.texto}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Troco */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 04</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Como funciona o troco</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Toda transação sem valor exato{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>gera uma UTXO nova.</span>
              </h2>
              <div className="space-y-7 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                {TROCO_EXPLICACAO.map((t, i) => <p key={i}>{t}</p>)}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Dust */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 05</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Dust: quando a UTXO{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>vale menos que a taxa para movê-la.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {DUST_TOPICOS.map((d, i) => (
                <motion.div key={i} {...fade(i * 0.08)} className="p-8 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0e3b3a' }}>{d.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{d.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Por que muitas UTXOs custam caro */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 06</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(244,237,228,0.7)' }}>O custo de fragmentação</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10">
                Cada entrada numa transação{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>tem um preço em vbytes.</span>
              </h2>
              <div className="space-y-7 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.88)' }}>
                {CUSTO_MUITAS_UTXOS.map((c, i) => <p key={i}>{c}</p>)}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Cálculo prático */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 07</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Três exemplos numéricos{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>de vbytes e taxa.</span>
              </h2>
            </motion.div>
            <div className="space-y-6">
              {CALCULO_EXEMPLOS.map((c, i) => (
                <motion.div key={i} {...fade(i * 0.08)} className="p-8 rounded-2xl grid md:grid-cols-3 gap-6" style={{ backgroundColor: '#ece2d3' }}>
                  <div>
                    <span className="text-xs font-bold tracking-[0.3em] uppercase block mb-2" style={{ color: '#c97a3d' }}>Cenário</span>
                    <p className="text-lg font-bold" style={{ color: '#0e3b3a' }}>{c.cenario}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-[0.3em] uppercase block mb-2" style={{ color: '#c97a3d' }}>Composição</span>
                    <p className="text-base font-light leading-relaxed" style={{ color: '#2d3a37' }}>{c.detalhe}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-[0.3em] uppercase block mb-2" style={{ color: '#c97a3d' }}>Cálculo</span>
                    <p className="text-base font-light leading-relaxed" style={{ color: '#2d3a37' }}>{c.conta}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p {...fade(0.2)} className="mt-8 text-sm font-light italic" style={{ color: '#5a6664' }}>
              Valores aproximados, considerando entradas e saídas em formato SegWit nativo (P2WPKH) e overhead padrão de transação. Formatos Taproot tendem a reduzir levemente o peso por entrada.
            </motion.p>
          </div>
        </section>

        {/* CAPÍTULO 8 — Quando consolidar */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 08</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Quando faz sentido{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>consolidar UTXOs.</span>
              </h2>
            </motion.div>
            <div className="space-y-5">
              {QUANDO_CONSOLIDAR.map((q, i) => (
                <motion.div key={i} {...fade(i * 0.07)} className="flex gap-5 p-7 rounded-2xl" style={{ backgroundColor: '#f4ede4' }}>
                  <CheckCircle2 size={26} className="shrink-0 mt-1" style={{ color: '#0e3b3a' }} />
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#0e3b3a' }}>{q.titulo}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{q.texto}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 9 — Quando NÃO consolidar (privacidade) */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 09</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(244,237,228,0.7)' }}>Quando não consolidar</p>
                <img src={misturaImg} alt="Representação visual de UTXOs sendo mantidas separadas para preservar privacidade" width={640} height={480} loading="lazy" decoding="async" className="mt-8 rounded-2xl w-full h-auto object-cover hidden lg:block" style={{ border: '1px solid rgba(232,163,107,0.2)' }} />
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10">
                Unir UTXOs revela{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>ligação de propriedade.</span>
              </h2>
              <div className="space-y-6">
                {QUANDO_NAO_CONSOLIDAR.map((q, i) => (
                  <motion.div key={i} {...fade(i * 0.07)} className="flex gap-5 p-7 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                    <XCircle size={26} className="shrink-0 mt-1" style={{ color: '#e8a36b' }} />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">{q.titulo}</h3>
                      <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{q.texto}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 10 — Coin control Sparrow */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 10</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Coin control no Sparrow Wallet</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Escolher manualmente,{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>passo a passo, no Sparrow.</span>
              </h2>
              <ol className="space-y-6">
                {COIN_CONTROL_SPARROW.map((s, i) => (
                  <motion.li key={i} {...fade(i * 0.06)} className="flex gap-5">
                    <span className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-black" style={{ backgroundColor: '#0e3b3a', color: '#e8a36b' }}>{i + 1}</span>
                    <p className="text-base md:text-lg leading-relaxed font-light pt-1" style={{ color: '#2d3a37' }}>{s}</p>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 11 — Coin control Electrum */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 11</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Coin control no Electrum</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                O mesmo controle,{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>em outro software veterano.</span>
              </h2>
              <ol className="space-y-6">
                {COIN_CONTROL_ELECTRUM.map((s, i) => (
                  <motion.li key={i} {...fade(i * 0.06)} className="flex gap-5">
                    <span className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-black" style={{ backgroundColor: '#0e3b3a', color: '#e8a36b' }}>{i + 1}</span>
                    <p className="text-base md:text-lg leading-relaxed font-light pt-1" style={{ color: '#2d3a37' }}>{s}</p>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 12 — Labels */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 12</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(244,237,228,0.7)' }}>Labels e etiquetagem</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10">
                Sem etiqueta, sua memória{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>é seu único registro.</span>
              </h2>
              <div className="space-y-7 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.88)' }}>
                {LABELS_TOPICOS.map((l, i) => <p key={i}>{l}</p>)}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 13 — CoinJoin */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 13</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Consolidação e CoinJoin{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>são forças opostas.</span>
              </h2>
            </motion.div>
            <div className="space-y-7 text-lg leading-[1.7] font-light max-w-4xl" style={{ color: '#2d3a37' }}>
              {COINJOIN_RELACAO.map((c, i) => <p key={i}>{c}</p>)}
            </div>
            <motion.div {...fade(0.2)} className="mt-10">
              <Link to="/autocustodia/coinjoin-privacidade" className="inline-flex items-center gap-2 text-base font-bold tracking-wide" style={{ color: '#0e3b3a' }}>
                Aprofunde no guia completo de CoinJoin e privacidade <ArrowRight size={18} style={{ color: '#c97a3d' }} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 14 — DCA semanal */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 14</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Estratégia de UTXO{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>para quem faz DCA semanal.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {DCA_ESTRATEGIA.map((d, i) => (
                <motion.div key={i} {...fade(i * 0.08)} className="p-8 rounded-2xl" style={{ backgroundColor: '#f4ede4' }}>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0e3b3a' }}>{d.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{d.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 15 — Erros comuns */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 15</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight">
                Erros comuns{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>na gestão de UTXOs.</span>
              </h2>
            </motion.div>
            <div className="space-y-5">
              {ERROS_COMUNS.map((e, i) => (
                <motion.div key={i} {...fade(i * 0.06)} className="flex gap-5 p-7 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <AlertTriangle size={24} className="shrink-0 mt-1" style={{ color: '#e8a36b' }} />
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2">{e.erro}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{e.texto}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 16 — Checklist final */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 16</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Checklist final{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>de gestão de UTXOs.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Sei distinguir, na minha carteira, quais UTXOs vieram de exchange com KYC e quais vieram de outras origens.',
                'Uso coin control (Sparrow ou Electrum) em vez de deixar a seleção automática decidir todas as minhas transações.',
                'Etiqueto (label) toda UTXO relevante no momento em que ela chega, não meses depois de memória.',
                'Congelo (freeze) UTXOs de dust suspeito e nunca as combino com o restante do meu patrimônio.',
                'Só consolido UTXOs quando a mempool está vazia e a taxa em sat/vb está historicamente baixa.',
                'Não consolido UTXOs de proveniências que quero manter separadas por motivo de privacidade.',
                'Nunca combino UTXOs pós-CoinJoin com UTXOs comuns identificáveis fora daquele CoinJoin.',
                'Tenho uma rotina periódica (a cada 2 ou 3 meses) para revisar e, se fizer sentido, consolidar meu DCA acumulado.',
              ].map((c, i) => (
                <motion.div key={i} {...fade(i * 0.04)} className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                  <CheckCircle2 size={22} className="shrink-0 mt-0.5" style={{ color: '#c97a3d' }} />
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 17 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 17</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Perguntas frequentes{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>sobre UTXO.</span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#f4ede4', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-500" style={{ color: '#c97a3d', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
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

        {/* CAPÍTULO 18 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Continue sua trilha</span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Entender UTXO é a base,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>agora reforce o resto.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { to: '/autocustodia/coinjoin-privacidade', titulo: 'CoinJoin e privacidade', texto: 'Como misturar UTXOs com outras pessoas para aumentar ambiguidade de propriedade.' },
                { to: '/autocustodia/backup-seed-phrase-guia', titulo: 'Backup de seed phrase', texto: 'A base de tudo: como proteger fisicamente a origem de todas as suas UTXOs.' },
                { to: '/autocustodia/hardware-wallet-diy-bitcoin', titulo: 'Hardware wallet DIY', texto: 'Como montar sua própria carteira de hardware com peças auditáveis.' },
                { to: '/comparativos/melhores-hardware-wallets', titulo: 'Melhores hardware wallets', texto: 'Coldcard, Trezor, Jade e Krux lado a lado, critério por critério.' },
                { to: '/dicionario-cripto', titulo: 'Glossario de soberania', texto: 'Do UTXO ao domicilio fiscal: todos os termos tecnicos deste site explicados em uma pagina.' },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group p-8 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <h3 className="text-lg md:text-xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-sm leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
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
