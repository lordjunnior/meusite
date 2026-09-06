import { useEffect, useState } from 'react';
import ContraAtaquePratico from '@/components/ContraAtaquePratico';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Backpack } from 'lucide-react';
import { Key } from 'lucide-react';
import { Wallet } from 'lucide-react';
import { Smartphone } from 'lucide-react';
import { Flashlight } from 'lucide-react';
import { Scissors } from 'lucide-react';
import { Pen } from 'lucide-react';
import { Watch } from 'lucide-react';
import { Wrench } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Shield } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Layers } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Briefcase } from 'lucide-react';
import { Mountain } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { Plane } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/edc-hero.jpg';
import imgUrbano from '@/assets/saida/edc-urbano.jpg';
import imgGridDown from '@/assets/saida/edc-griddown.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

interface Tier {
  num: string;
  nome: string;
  contexto: string;
  perfil: string;
  pesoTotal: string;
  custoTotal: string;
  icon: typeof Briefcase;
  itens: { item: string; modelo: string; justificativa: string }[];
}

const TIERS: Tier[] = [
  {
    num: '01',
    nome: 'EDC Urbano Discreto',
    contexto: 'Trabalho corporativo, deslocamento urbano, ambientes com restrição legal a porte tático visível.',
    perfil: 'Para quem opera em escritório, transporte público, eventos sociais, restaurantes. Discrição absoluta. Nada que pareça tático ou militar. Tudo passa em revista de bolsa sem levantar suspeita.',
    pesoTotal: '380 a 520 g',
    custoTotal: 'USD 480 a 780',
    icon: Briefcase,
    itens: [
      { item: 'Carteira slim', modelo: 'Bellroy Hide & Seek ou Ekster Parliament (RFID)', justificativa: 'Bloqueio RFID protege contra skimming de cartões por aproximação. Slim profile evita volume incômodo no bolso.' },
      { item: 'Organizador de chaves', modelo: 'Orbitkey Active ou Keyport Pivot 2.0', justificativa: 'Chaves silenciosas, sem tilintar. Evita lesão de bolso e perda. Pode embutir mini-ferramenta, USB e LED.' },
      { item: 'Canivete sub-2,5"', modelo: 'CRKT Pilar III ou Boker Plus Atlas (lâmina <6,4 cm)', justificativa: 'Lâmina abaixo de 2,5" passa em maioria das jurisdições restritivas. EDC funcional sem violar lei municipal de porte de armas brancas.' },
      { item: 'Caneta tática discreta', modelo: 'Schrade Tactical Pen ou Smith & Wesson Refillable', justificativa: 'Funciona como caneta, mas serve para autodefesa em emergência (golpe em ponto de pressão). Aceita em ambientes corporativos.' },
      { item: 'Mini lanterna chaveiro', modelo: 'Olight i3T EOS ou Streamlight MicroStream', justificativa: '180 lúmens, 14 g, recarregável USB-C. Suficiente para apagão, túnel, escada de emergência, blecaute súbito.' },
      { item: 'Smartphone + Faraday pouch', modelo: 'Mission Darkness Faraday Bag ou GoDark', justificativa: 'Bloqueio de sinal celular, GPS e Wi-Fi quando você quer. Importante para reuniões sensíveis ou trânsito por zonas de risco.' },
      { item: 'Relógio mecânico', modelo: 'Seiko 5 SRPD, Casio Duro MDV-106 ou Hamilton Khaki Field', justificativa: 'Independente de bateria, GPS ou rede celular. Resistente a EMP. Funcional em apagão prolongado e em situação de fuga.' },
      { item: 'Notebook + caneta', modelo: 'Field Notes Pitch Black ou Moleskine Cahier', justificativa: 'Memorização escrita supera digital. Ferramenta de raciocínio sem rastro digital. Útil para anotar contatos, endereços, instruções off-grid.' },
    ],
  },
  {
    num: '02',
    nome: 'EDC Viagem & Mobilidade',
    contexto: 'Voos internacionais, layovers, jurisdições estrangeiras, deslocamento entre bandeiras.',
    perfil: 'Para quem opera em movimento entre países: passaporte, mobilidade financeira, comunicação criptografada, redundância de documentos. Cumpre regras TSA. Itens táticos vão no despachado.',
    pesoTotal: '850 g a 1,4 kg',
    custoTotal: 'USD 1.200 a 2.400',
    icon: Plane,
    itens: [
      { item: 'Carteira viagem RFID', modelo: 'Bellroy Travel Wallet ou Pacsafe RFIDsafe', justificativa: 'Compartimentos para passaporte, cartão de embarque, vacina, moeda local e USD em cash. Bloqueio RFID protege passaporte biométrico.' },
      { item: 'Money belt oculto', modelo: 'Eagle Creek Silk Undercover ou Pacsafe MoneyBelt', justificativa: 'USD 300-500 em cash, cópia digitalizada do passaporte e cartão de emergência abaixo da roupa. Sobrevive a furto de bagagem.' },
      { item: 'Hardware wallet', modelo: 'Jade Plus, Coldcard Q ou Trezor Safe 5', justificativa: 'Bitcoin acessível em qualquer jurisdição. Independente de exchange ou banco local. Backup metálico (seedplate) em mochila separada.' },
      { item: 'Smartphone limpo + e-SIM', modelo: 'iPhone secundário com Airalo, Holafly ou Saily', justificativa: 'Dispositivo separado do principal, sem aplicativos sensíveis, e-SIM ativada apenas no destino. Evita roaming internacional caro e expõe menos metadados.' },
      { item: 'Adaptador universal + carregador GaN', modelo: 'Anker 511 Nano ou EPICKA Universal', justificativa: 'Compatibilidade com 150+ países. GaN reduz peso e tamanho. USB-C PD 65W carrega notebook, celular, fones simultaneamente.' },
      { item: 'Powerbank 10.000 mAh USB-C PD', modelo: 'Anker 737 ou Nitecore NB10000 Gen2', justificativa: 'Aceito em cabine pela TSA (<100 Wh). Carrega celular 2,5x e notebook em emergência. Crítico em layover prolongado ou apagão de aeroporto.' },
      { item: 'Cabos curtos USB-C/Lightning', modelo: 'Anker PowerLine III ou Nomad Kevlar 30 cm', justificativa: 'Cabos compactos com proteção contra desgaste. Reduz emaranhamento na mochila e funcionam por anos sem falhar.' },
      { item: 'Notebook offline + Tails USB', modelo: 'Pendrive criptografado com Tails Linux', justificativa: 'Sistema operacional bootável anônimo, sem rastro local, com Tor pré-configurado. Usar em computadores públicos sem comprometer chaves ou identidade.' },
      { item: 'Cópia plastificada de documentos', modelo: 'Passaporte, RG, CNH, vacinas, contatos', justificativa: 'Backup analógico em jurisdição onde o digital pode falhar. Plastificada resiste à água. Guardada em compartimento separado da bagagem.' },
      { item: 'Mini IFAK de viagem', modelo: 'NAR Mini First Aid Kit ou Adventure Medical .5', justificativa: 'Curativos básicos, hemostático, analgésicos sem prescrição, repelente DEET. Atravessa controle TSA sem objeção (sem lâminas).' },
    ],
  },
  {
    num: '03',
    nome: 'EDC Grid-Down & Tático',
    contexto: 'Apagão prolongado, colapso urbano, áreas rurais isoladas, evacuação de emergência.',
    perfil: 'Para quem precisa operar quando água, energia, internet e sinal celular caem simultaneamente. Equipamento robusto, autônomo e redundante. Sobrevive a 72 horas sem reabastecimento.',
    pesoTotal: '1,8 a 2,8 kg',
    custoTotal: 'USD 950 a 1.700',
    icon: Mountain,
    itens: [
      { item: 'Faca fixa de sobrevivência', modelo: 'Morakniv Garberg, Benchmade Bushcrafter ou ESEE-4', justificativa: 'Lâmina full-tang, aço inoxidável, robustez para alavancar, cortar madeira, abrir lata, autodefesa. Bainha presa ao cinto ou mochila.' },
      { item: 'Multitool', modelo: 'Leatherman Wave Plus, MUT EOD ou Surge', justificativa: 'Alicate, serra, chave fenda, abridor, lâmina secundária. Resolve 80% dos problemas mecânicos. Aço resistente a sal e umidade.' },
      { item: 'Headlamp + lanterna principal', modelo: 'Petzl Tikka 350 lm + Olight Warrior 3S 2300 lm', justificativa: 'Headlamp libera as duas mãos. Lanterna principal com modo strobe para sinalização e desorientação tática. Recarregáveis USB-C.' },
      { item: 'Ferro rod fire starter', modelo: 'Light My Fire Army ou Bayite 6"', justificativa: 'Acende fogo em qualquer condição (vento, chuva, frio). Funciona por 12.000 ignições. Independente de combustível líquido ou isqueiro.' },
      { item: 'Filtro de água portátil', modelo: 'Sawyer Squeeze, LifeStraw Peak ou Katadyn BeFree', justificativa: 'Filtra 99,99% de bactérias e protozoários. 1.000 a 100.000 litros de capacidade. Resolve crise de água potável em qualquer fonte.' },
      { item: 'Paracord 550 (10m)', modelo: 'Rothco Mil-Spec Type III ou Atwood Rope 550', justificativa: 'Resistência 250 kg. Mil aplicações: amarrar, prender, sapatear, improvisar abrigo, faixa de torniquete (último recurso).' },
      { item: 'Bússola de campo', modelo: 'Suunto MC-2G ou Silva Ranger 2.0', justificativa: 'Navegação primária quando GPS falha. Espelho integrado para sinalização, lupa para mapa, ajuste de declinação magnética.' },
      { item: 'Manta térmica reforçada', modelo: 'SOL Emergency Bivvy ou AMK Heatsheets 2-Person', justificativa: 'Reflete 90% do calor corporal. Pesa 100 g. Diferença entre hipotermia e sobrevivência em noite fria desabrigado.' },
      { item: 'Apito sinalizador', modelo: 'Fox 40 Classic ou Storm Whistle', justificativa: '120 dB. Audível a 1,6 km. Sinaliza em colapso de prédio, busca em mata, situação de afogamento. Pesa 10 g.' },
      { item: 'Backup metálico de seed phrase', modelo: 'Seedplate Cypherwheel, Cryptotag Zeus ou Steelwallet', justificativa: 'Bitcoin sobrevive a fogo, água, EMP e queda. Aço inoxidável 304/316. Sem ele, a hardware wallet perdida = patrimônio perdido.' },
      { item: 'IFAK reduzido', modelo: 'NAR Tactical Med Pouch ou Helikon-Tex Mini Med', justificativa: 'Torniquete CAT, gaze hemostática, selo torácico, manta térmica. Versão compacta do IFAK completo. Suficiente para estabilização inicial.' },
      { item: 'Rádio portátil HF/UHF', modelo: 'Baofeng UV-5R com licença ou Yaesu FT-65', justificativa: 'Comunicação quando torres celulares caem. Frequências de emergência conhecidas. Carregável por painel solar ou USB-C.' },
    ],
  },
];

interface Categoria {
  nome: string;
  icon: typeof Scissors;
  descricao: string;
  cor: string;
}

const CATEGORIAS: Categoria[] = [
  { nome: 'Cortar', icon: Scissors, descricao: 'Canivete ou faca. Resolve embalagem, alimento, emergência médica improvisada e autodefesa.', cor: 'amber' },
  { nome: 'Iluminar', icon: Flashlight, descricao: 'Lanterna pessoal. Apagão dura minutos ou semanas. Smartphone como lanterna mata bateria.', cor: 'amber' },
  { nome: 'Pagar', icon: Wallet, descricao: 'Cash, cartão, cripto. Três camadas de redundância financeira para qualquer cenário.', cor: 'amber' },
  { nome: 'Comunicar', icon: Smartphone, descricao: 'Smartphone primário, faraday pouch, e em colapso, rádio HAM ou GMRS.', cor: 'amber' },
  { nome: 'Documentar', icon: Pen, descricao: 'Caneta + caderno. Registrar contatos, endereços, instruções sem rastro digital.', cor: 'amber' },
  { nome: 'Cronometrar', icon: Watch, descricao: 'Relógio mecânico ou solar. Funciona em apagão, EMP, colapso de rede celular.', cor: 'amber' },
  { nome: 'Acessar', icon: Key, descricao: 'Chaves de casa, carro, escritório, cofre. Organizador silencioso e sem perda.', cor: 'amber' },
  { nome: 'Reparar', icon: Wrench, descricao: 'Multitool ou mini ferramenta. Ajuste rápido em equipamento, móvel, infraestrutura.', cor: 'amber' },
];

const ERROS = [
  {
    titulo: 'Acumular itens sem treinar com eles',
    detalhe: 'Comprar lanterna tática de 2.000 lúmens, faca custosa, multitool premium e nunca aprender a usar em estresse é fetiche, não EDC. Treine ao menos 1 vez por mês cada item até o uso ser automático.',
  },
  {
    titulo: 'Carregar tudo, todos os dias, em todos os lugares',
    detalhe: 'EDC é contextual. Reunião corporativa pede tier 1. Voo internacional pede tier 2. Trilha em zona rural pede tier 3. Misturar resulta em mochila pesada, itens irrelevantes e fricção urbana (faca tática em metrô atrai atenção indesejada).',
  },
  {
    titulo: 'Comprar tudo Aliexpress',
    detalhe: 'Torniquete falso falha sob pressão crítica. Lanterna tática 50.000 lúmens é mentira óptica. Faca de aço macio quebra ao primeiro impacto. EDC é equipamento que sua vida depende. Compre de fornecedores tier-1 mesmo que custe 5x mais.',
  },
  {
    titulo: 'Ignorar legislação local de porte',
    detalhe: 'Lei brasileira: faca >7 cm fora de propriedade rural ou pesca = porte ilegal de arma branca. Spray de pimenta civil é regulamentado. Munição apreendida sem CR. Conheça o que é legal na sua jurisdição antes de equipar.',
  },
  {
    titulo: 'Não fazer manutenção periódica',
    detalhe: 'Pilhas vazam. Lanterna recarregável perde capacidade. Faca enferruja. Bateria de relógio digital morre sem aviso. Faça revisão mensal: testar tudo, recarregar, lubrificar, substituir consumíveis (gazes vencidas).',
  },
  {
    titulo: 'Esquecer redundância em 1 falha = colapso',
    detalhe: 'Único celular sem backup = se cair, perdeu contatos, mapas, dinheiro digital. Única lanterna = se quebrar, ficou no escuro. Regra militar: dois é um, um é nenhum. Sempre carregue redundância dos itens críticos (lanterna, fonte de fogo, faca).',
  },
];

const COMPARATIVO = [
  { criterio: 'Discrição', urbano: 'Máxima', viagem: 'Alta', griddown: 'Baixa' },
  { criterio: 'Peso médio', urbano: '380-520 g', viagem: '850-1400 g', griddown: '1,8-2,8 kg' },
  { criterio: 'Custo USD', urbano: '480-780', viagem: '1.200-2.400', griddown: '950-1.700' },
  { criterio: 'TSA-friendly', urbano: 'Sim', viagem: 'Sim', griddown: 'Não' },
  { criterio: 'Autonomia', urbano: '24h', viagem: '7-14 dias', griddown: '72h+' },
  { criterio: 'Foco principal', urbano: 'Discrição operacional', viagem: 'Mobilidade entre bandeiras', griddown: 'Sobrevivência autônoma' },
  { criterio: 'Onde usar', urbano: 'Cidade, escritório, social', viagem: 'Aeroporto, hotel, trânsito', griddown: 'Apagão, mata, evacuação' },
  { criterio: 'Curva de aprendizado', urbano: 'Baixa', viagem: 'Média', griddown: 'Alta' },
];

const FAQ = [
  {
    q: 'Por onde começar se nunca montei EDC?',
    a: 'Comece pelo tier 1 (Urbano Discreto). Carteira slim, organizador de chaves, mini lanterna, canivete legal e relógio mecânico. Investimento inicial USD 250-400. Carregue por 30 dias e ajuste o que não usa. EDC é evolutivo, não estático.',
  },
  {
    q: 'Faca em ambiente urbano é legal no Brasil?',
    a: 'A lei brasileira é ambígua. Decreto 11.366/2023 e jurisprudência interpretam que portar faca em via pública pode configurar contravenção penal (art. 19 LCP) se houver risco à segurança pública. Recomendação: lâmina <7 cm, uso utilitário evidente (modelo gentleman, sem agressividade visual), guardada (não exposta no cinto). Consulte advogado local para sua jurisdição específica.',
  },
  {
    q: 'Faraday pouch é paranoia ou faz sentido?',
    a: 'Faz sentido em três contextos: (1) reuniões com NDA real onde gravação por celular é risco, (2) trânsito por área de alto sequestro relâmpago (criminoso usa app do banco aberto), (3) viagens em jurisdições com vigilância governamental hostil. Para uso diário, basta o celular em modo avião. O pouch é ferramenta especializada, não item universal.',
  },
  {
    q: 'Hardware wallet faz parte de EDC ou fica em casa?',
    a: 'Depende do tier. Urbano: NÃO. Hardware wallet em mochila urbana é risco (assalto, perda, esquecimento). Use multisig com chaves geograficamente separadas. Viagem: SIM, com backup metálico em local separado da hardware. Grid-down: SIM, com backup metálico físico de seed phrase.',
  },
  {
    q: 'Posso passar EDC tier 2 em controle TSA?',
    a: 'Sim, se montado com regras TSA: nada de lâminas em mão, líquidos <100ml, powerbank <100Wh (10.000 mAh aproximadamente). Faca, multitool com lâmina e ferro rod vão obrigatoriamente em bagagem despachada. Caneta tática, lanterna, relógio, hardware wallet, headlamp, cabos e adaptadores passam normalmente.',
  },
  {
    q: 'Quanto tempo dura uma boa montagem EDC?',
    a: 'Tier 1 dura 5-10 anos com manutenção (substituir pilhas, afiar lâmina, atualizar carteira). Tier 2 acompanha vida útil dos eletrônicos (4-6 anos para celular, 3 anos para powerbank). Tier 3 dura 10+ anos (faca fixa, ferro rod, paracord, bússola). Investimento amortizado por uso prolongado.',
  },
  {
    q: 'Smartwatch substitui relógio mecânico?',
    a: 'Não para EDC sério. Smartwatch depende de bateria diária, sincronização com celular, atualizações, e morre em apagão prolongado ou EMP. Relógio mecânico dá hora certa por décadas sem fonte externa de energia. Recomendação: use smartwatch para fitness e relógio mecânico para EDC. Não há substituição, há complementaridade.',
  },
  {
    q: 'Onde comprar EDC tier 1 confiável no Brasil?',
    a: 'Lojas brasileiras: Knives Brasil, Tactical Black, Lojas Trovata, Caça e Pesca Forte, Faca de Bolso. Importação direta: Knifecenter (USA), Lamnia (Finlândia), Heinnie Haynes (UK). Para canetas e lanternas: Tatical Black ou direto da Olight Brasil. Hardware wallets: jadewallet.io e coinkite.com.',
  },
];

const CHECKLIST = [
  'Dia 1-3: Definir seu perfil dominante. Você é urbano corporativo? Viajante frequente? Mora em zona rural ou de risco? Escolha o tier principal.',
  'Dia 4-7: Audite o que já carrega. Liste tudo na bolsa, mochila ou bolsos hoje. Identifique redundâncias e lacunas.',
  'Dia 8-14: Comprar o tier 1 (Urbano Discreto). Comece pelos 4 essenciais: carteira slim, mini lanterna, canivete legal, organizador de chaves.',
  'Dia 15-20: Carregar diariamente. Sem fugir. EDC só funciona se virar hábito. Reposicione bolsos até ficar confortável.',
  'Dia 21-25: Treinar uso real. Acender lanterna no escuro com uma só mão. Abrir canivete em <2 segundos. Sacar caneta para anotação rápida.',
  'Dia 26-30: Ajustar e refinar. Remover o que não usou no mês. Substituir o que falhou. Anotar lições.',
  'Mês 2: Adicionar tier 2 (Viagem) se você viaja >3x/ano. Comprar Faraday pouch, hardware wallet com backup metálico, money belt.',
  'Mês 3-6: Construir tier 3 (Grid-Down). Faca fixa, headlamp, ferro rod, filtro de água, paracord, manta térmica. Guardar pronto na mochila tática.',
  'Trimestral: Manutenção. Substituir pilhas, afiar lâminas, recarregar powerbanks, verificar validade de gazes e medicamentos.',
  'Anual: Revisão completa. Atualizar documentos, trocar equipamento desgastado, atualizar e-SIMs, reavaliar perfil de risco e jurisdição.',
];

export default function EDC() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-organica/edc"
        custom={{
          title: 'EDC: O Que Carregar Todo Dia (Urbano · Viagem · Grid-Down)',
          description: 'Guia completo de EDC (Everyday Carry) civil em 3 tiers: urbano discreto, viagem internacional e grid-down. Loadout auditado, justificativa item a item, custos reais.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/edc',
          primaryKeyword: 'EDC everyday carry',
          lsiKeywords: ['EDC urbano', 'everyday carry brasil', 'loadout tático civil', 'EDC viagem', 'EDC grid down', 'kit dia a dia tático', 'mochila tática diária'],
          longTailKeywords: ['como montar EDC urbano discreto', 'o que carregar todo dia EDC', 'EDC viagem internacional o que levar', 'EDC grid down brasil completo', 'lista EDC tático civil'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'EDC: O Que Carregar', url: '/soberania-organica/edc' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/kit-72h', '/soberania-organica/primeiros-socorros-taticos', '/soberania-organica/abrigo-emergencia', '/soberania-organica'],
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
          phase="Soberania Orgânica · Loadout Diário"
          title={
            <>
              EDC:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">o que carregar todo dia, sem exceção</span>
            </>
          }
          subtitle="Everyday Carry não é fetiche tático nem coleção de canivetes. É a infraestrutura mínima para você operar em três cenários distintos: a cidade hostil, o trânsito entre bandeiras e o colapso prolongado. Três tiers, custo auditado, justificativa item a item."
          icon={Backpack}
          accentColor="amber"
          backLink="/soberania-organica"
          backLabel="Soberania Orgânica"
        />

        {/* CAPÍTULO 1 */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)}>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-5">Capítulo 01</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 mb-8 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              O kit que você não tem com você{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">não existe quando precisar.</span>
            </h2>
            <div className="space-y-6 text-stone-300 text-lg leading-relaxed font-light max-w-3xl">
              <p>
                EDC, Everyday Carry, é o conjunto de itens que você porta diariamente para resolver problemas previsíveis e imprevisíveis. Apagão repentino, falha de elevador, lesão própria ou de terceiros, perda de dinheiro digital por falha de rede, fuga emergencial de um ambiente, sequestro relâmpago, queda em trilha, evacuação forçada por enchente. A lista é longa. O ponto é único: o item que ficou em casa não vai te ajudar em momento nenhum.
              </p>
              <p>
                Esta página apresenta três tiers calibrados para contextos distintos. Misturar não funciona: faca de sobrevivência em metrô gera fricção urbana e legal, carteira slim em trilha de mata cai do bolso e some, kit grid-down em voo internacional é apreendido na TSA. EDC é contextual. Quem entende contexto opera leve. Quem não entende carrega 4 kg de coisa errada e usa zero.
              </p>
              <p className="text-stone-100 italic font-serif text-xl border-l-2 border-amber-500/40 pl-6">
                Equipamento sem uso é fetiche. Uso sem equipamento é teoria. Treine carregando, não estocando.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CAPÍTULO 2 — 8 CATEGORIAS */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24">
          <motion.div {...fade(0)} className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 02</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              As oito funções{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">que todo EDC resolve.</span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto mt-5 text-base leading-relaxed font-light">
              Não importa o tier. Todo EDC bem montado resolve estas oito funções essenciais. Faltou uma, faltou redundância para o cenário.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIAS.map((c, i) => (
              <motion.div
                key={c.nome}
                {...fade(i * 0.04)}
                className="group relative overflow-hidden rounded-sm border border-amber-500/15 bg-stone-950/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/35 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <span aria-hidden className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                <div className="p-2.5 rounded bg-amber-500/[0.08] border border-amber-500/20 inline-flex mb-4">
                  <c.icon size={18} className="text-amber-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-stone-100 leading-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {c.nome}
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed font-light">{c.descricao}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM URBANO */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[480px] md:h-[620px] border border-stone-900">
            <img
              src={imgUrbano}
              alt="EDC urbano discreto sobre mesa escura com carteira slim em couro, relógio mecânico, canivete folding compacto, smartphone em pouch faraday, caneta executiva e moedas, fotografia editorial cinematográfica com iluminação dramática lateral em tons âmbar."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.2) 50%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Tier 01 · Urbano Discreto</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Discrição operacional: o que cabe no bolso e ninguém vê.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 3 — TIERS */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 03</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Três tiers,{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">três contextos, zero sobreposição.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Cada tier resolve um cenário operacional distinto. Loadout completo, modelo recomendado e justificativa item a item. Sem afiliado, sem patrocínio.
            </p>
          </motion.div>

          <div className="space-y-12">
            {TIERS.map((t, i) => (
              <motion.div
                key={t.num}
                {...fade(i * 0.06)}
                className="rounded-sm border border-stone-800 bg-stone-950/60 p-6 md:p-10 hover:border-amber-500/30 transition-all duration-500"
              >
                <div className="grid md:grid-cols-12 gap-6 mb-8 pb-8 border-b border-stone-800">
                  <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                    <span className="text-7xl md:text-8xl font-black text-amber-400/90 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {t.num}
                    </span>
                    <div className="p-2.5 rounded bg-amber-500/[0.08] border border-amber-500/20 inline-flex">
                      <t.icon size={20} className="text-amber-400" />
                    </div>
                  </div>
                  <div className="md:col-span-9 space-y-4">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-stone-100 leading-tight mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {t.nome}
                      </h3>
                      <p className="text-stone-300 text-sm font-light italic">{t.contexto}</p>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed font-light max-w-3xl">{t.perfil}</p>
                    <div className="flex flex-wrap gap-6 pt-2">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Peso total</p>
                        <p className="text-amber-400 text-base font-bold font-mono">{t.pesoTotal}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Custo total</p>
                        <p className="text-amber-400 text-base font-bold font-mono">{t.custoTotal}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Itens</p>
                        <p className="text-amber-400 text-base font-bold font-mono">{t.itens.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {t.itens.map((it, idx) => (
                    <div key={idx} className="grid md:grid-cols-12 gap-4 p-4 rounded-sm bg-stone-900/40 border border-stone-800/50">
                      <div className="md:col-span-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400/80 block mb-1">{String(idx + 1).padStart(2, '0')} · Item</span>
                        <p className="text-stone-100 text-sm font-bold">{it.item}</p>
                      </div>
                      <div className="md:col-span-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 block mb-1">Modelo</span>
                        <p className="text-stone-300 text-xs leading-relaxed">{it.modelo}</p>
                      </div>
                      <div className="md:col-span-6">
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 block mb-1">Justificativa</span>
                        <p className="text-stone-300 text-xs leading-relaxed font-light">{it.justificativa}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM GRID-DOWN */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[480px] md:h-[620px] border border-stone-900">
            <img
              src={imgGridDown}
              alt="Loadout EDC grid-down sobre superfície de concreto bruto: faca fixa de sobrevivência, ferro rod, headlamp, paracord, filtro LifeStraw, bússola, backup metálico de seed phrase, mini IFAK e apito sinalizador, fotografia tática profissional com iluminação dramática."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.2) 50%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Tier 03 · Grid-Down</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Quando energia, água, sinal e socorro caem juntos. O kit que opera sozinho.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 4 — TABELA COMPARATIVA */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 04</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Comparativo objetivo{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">dos três tiers.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Critérios mensuráveis lado a lado. Use a tabela para definir qual tier prioritizar primeiro.
            </p>
          </motion.div>

          <div className="overflow-x-auto rounded-sm border border-stone-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-950 border-b border-stone-800">
                  <th className="text-left p-4 text-amber-400 font-mono text-[11px] uppercase tracking-[0.25em]">Critério</th>
                  <th className="text-left p-4 text-amber-400 font-mono text-[11px] uppercase tracking-[0.25em]">Tier 01 · Urbano</th>
                  <th className="text-left p-4 text-amber-400 font-mono text-[11px] uppercase tracking-[0.25em]">Tier 02 · Viagem</th>
                  <th className="text-left p-4 text-amber-400 font-mono text-[11px] uppercase tracking-[0.25em]">Tier 03 · Grid-Down</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.map((c, i) => (
                  <tr key={c.criterio} className={`border-b border-stone-900 ${i % 2 === 0 ? 'bg-stone-950/40' : 'bg-stone-950/20'}`}>
                    <td className="p-4 text-stone-400 text-xs font-mono uppercase tracking-wider">{c.criterio}</td>
                    <td className="p-4 text-stone-200 text-sm">{c.urbano}</td>
                    <td className="p-4 text-stone-200 text-sm">{c.viagem}</td>
                    <td className="p-4 text-stone-200 text-sm">{c.griddown}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CAPÍTULO 5 — ERROS */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 05</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Seis erros{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">que transformam EDC em fetiche.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              EDC é equipamento operacional. Estes erros transformam loadout funcional em coleção decorativa que falha no momento crítico.
            </p>
          </motion.div>

          <div className="space-y-4">
            {ERROS.map((e, i) => (
              <motion.div
                key={e.titulo}
                {...fade(i * 0.04)}
                className="rounded-sm border border-stone-800 bg-stone-950/60 p-6 md:p-8 hover:border-red-500/30 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-red-500/80 shrink-0 leading-none mt-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-stone-100 mb-2 leading-tight">{e.titulo}</h3>
                    <p className="text-stone-300 text-sm leading-relaxed font-light">{e.detalhe}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CHECKLIST */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="rounded-sm border border-amber-500/20 bg-stone-950/70 p-8 md:p-12">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Plano de execução</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Trinta dias{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">para EDC operacional.</span>
            </h2>
            <p className="text-stone-400 mb-8 text-base leading-relaxed font-light">
              Comece pelo tier 1, valide o hábito, depois expanda. EDC mal montado pesa, atrapalha e desmotiva. EDC bem calibrado vira segunda pele.
            </p>
            <ol className="space-y-3">
              {CHECKLIST.map((c, i) => (
                <li key={i} className="flex gap-4 text-stone-200 text-sm leading-relaxed">
                  <span className="text-amber-400 font-mono font-bold shrink-0 w-7">{String(i + 1).padStart(2, '0')}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Perguntas Frequentes</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Dúvidas{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">técnicas reais.</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <motion.div key={i} {...fade(i * 0.03)} className="rounded-sm border border-stone-800 bg-stone-950/60 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-stone-900/40 transition-colors"
                >
                  <span className="text-stone-100 font-semibold text-sm md:text-base leading-tight">{f.q}</span>
                  <ChevronDown size={18} className={`text-amber-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 text-stone-400 text-sm leading-relaxed font-light border-t border-stone-900 pt-4">
                    {f.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              EDC é a primeira camada.{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">A casa, o carro e a mochila vêm depois.</span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto mb-10 text-base leading-relaxed font-light">
              Continue para Kit 72h (mochila tática completa), Primeiros Socorros Táticos e Abrigo de Emergência. Camada por camada, redundância por redundância.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/soberania-organica/kit-72h" className="group inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-all">
                <Backpack size={14} /> Kit 72h <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/soberania-organica/primeiros-socorros-taticos" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-stone-700 text-stone-300 font-bold uppercase tracking-wider text-xs hover:border-amber-500/40 hover:text-stone-100 transition-all">
                <Shield size={14} /> Primeiros Socorros Táticos
              </Link>
              <Link to="/soberania-organica/abrigo-emergencia" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-stone-700 text-stone-300 font-bold uppercase tracking-wider text-xs hover:border-amber-500/40 hover:text-stone-100 transition-all">
                <MapPin size={14} /> Abrigo de Emergência
              </Link>
            </div>
          </motion.div>
        </section>

        <ContraAtaquePratico
          theme="dark"
          title="O suprimento médico do EDC não vem de farmácia"
          intro="Curativo e analgésico resolvem o primeiro minuto. Depois disso você depende do que sabe preparar. O estoque médico mais confiável é o de plantas puras e preparos próprios, com validade longa e reposição na sua mão."
          links={[
            { to: '/soberania-organica/farmacia-caseira-essencial', kicker: 'Base médica', label: 'Farmácia caseira essencial' },
            { to: '/soberania-organica/tinturas-xaropes-preparos', kicker: 'Preparo', label: 'Tinturas, xaropes e extrações' },
            { to: '/soberania-organica/rotina-diaria-imunidade', kicker: 'Prevenção', label: 'Rotina diária de imunidade' },
          ]}
        />
      </div>
    </>
  );
}
