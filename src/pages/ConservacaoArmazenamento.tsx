import React, { useState, useEffect } from 'react';
import ContraAtaquePratico from '@/components/ContraAtaquePratico';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Package, Flame, Droplets, Wheat, Snowflake, Wind, Egg, Leaf, ShieldCheck, Clock, ChevronDown, ChevronUp, AlertTriangle, Beaker, Warehouse, Thermometer, Tag, Box, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import bgConservacao from '@/assets/backgrounds/bg-conservacao.jpg';

import imgHeroEstoque from '@/assets/conserva-hero-estoque.jpg';
import imgAlimentosEssenciais from '@/assets/conserva-alimentos-essenciais.jpg';
import imgMetodosPreservacao from '@/assets/conserva-metodos-preservacao.jpg';
import imgAlimentosDuradouros from '@/assets/conserva-alimentos-duradouros.jpg';
import imgArsenalAuxiliar from '@/assets/conserva-arsenal-auxiliar.jpg';
import BackToHome from '@/components/BackToHome';

/* ─── SEO: meta keywords target ───
   conservação de alimentos, armazenamento de alimentos, estoque de sobrevivência,
   alimentos de longa duração, métodos de conservação, desidratação de alimentos,
   fermentação caseira, defumação, salga de carnes, congelamento, arroz estoque,
   feijão armazenamento, mel sobrevivência, autossuficiência alimentar brasil,
   preparação emergência alimentos, segurança alimentar, soberania alimentar
─────────────────────────────────── */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: APPLE_EASE, delay: i * 0.08 },
  }),
};

/* ═══════════════════════════════════════════
   10 ALIMENTOS ESSENCIAIS
   ═══════════════════════════════════════════ */

interface Alimento {
  name: string;
  tagline: string;
  durability: string;
  calories: string;
  icon: typeof Wheat;
  keyFact: string;
  tips: string[];
  varieties?: string[];
  body: string;
}

const ALIMENTOS: Alimento[] = [
  {
    name: 'Arroz',
    tagline: 'O Alimento Base',
    durability: '25–30 anos',
    calories: '~130 kcal/100g cozido',
    icon: Wheat,
    keyFact: 'Arroz branco polido é a escolha ideal para armazenamento de longa duração — o integral oxida em meses.',
    tips: [
      'Recipientes herméticos de vidro ou baldes grau alimentício',
      'Absorvedores de oxigênio dentro dos recipientes',
      'Local seco, escuro e com temperatura estável',
      'Folhas de louro junto ao arroz repelem insetos naturalmente',
      'Etiquete com data de armazenamento para rotatividade',
    ],
    body: 'Carboidrato complexo de excepcional durabilidade. Serve como base para inúmeras preparações, combinando-se facilmente com feijão, carnes desidratadas e legumes em conserva. Exige apenas água e uma fonte de calor.',
  },
  {
    name: 'Feijão',
    tagline: 'Fonte de Proteína Duradoura',
    durability: '10–30 anos',
    calories: '~15g proteína/100g cozido',
    icon: Egg,
    keyFact: 'Quanto mais velho o feijão, maior o tempo de cozimento — rotação periódica garante eficiência energética.',
    tips: [
      'Manter completamente seco e protegido de insetos',
      'Recipientes herméticos com absorvedores de oxigênio',
      'Rotação periódica para eficiência energética no preparo',
    ],
    varieties: ['Preto: rico em antioxidantes', 'Carioca: versátil, cozimento rápido', 'Branco: excelente para sopas', 'Vermelho: textura firme, ideal para saladas', 'Fradinho: essencial para pratos tradicionais'],
    body: 'Rico em proteínas, fibras, ferro, magnésio, potássio e vitaminas do complexo B. Dezenas de variedades disponíveis permitem grande variação no cardápio mesmo com recursos limitados.',
  },
  {
    name: 'Mel',
    tagline: 'O Ouro Líquido da Sobrevivência',
    durability: 'Virtualmente infinito',
    calories: 'Energia rápida + antibacteriano',
    icon: Droplets,
    keyFact: 'Arqueólogos encontraram mel em tumbas egípcias com +3.000 anos que ainda permanecia comestível.',
    tips: [
      'Mel puro, não pasteurizado e sem aditivos',
      'Frascos de vidro bem vedados — evitar metal',
      'Local fresco, ao abrigo da luz direta',
      'Cristalização é natural — banho-maria devolve a consistência',
      'Diferentes tamanhos de embalagem para não contaminar o estoque',
    ],
    body: 'Alto teor de açúcares, baixa umidade e natureza ácida criam ambiente hostil para microrganismos. Propriedades antibacterianas e cicatrizantes comprovadas cientificamente. Alívio de tosse e dor de garganta. ALERTA: Nunca para crianças menores de 1 ano (risco de botulismo).',
  },
  {
    name: 'Sal',
    tagline: 'Conservante Natural e Mineral Essencial',
    durability: 'Ilimitado',
    calories: 'Eletrólito vital',
    icon: Beaker,
    keyFact: 'O sal foi usado como moeda de troca em civilizações antigas. Sua capacidade de desidratar alimentos por osmose é insubstituível.',
    tips: [
      'Recipientes herméticos longe de umidade',
      'Grãos de arroz absorvem umidade residual',
      'Estocar em quantidades generosas para conservação e troca',
    ],
    varieties: ['Refinado: conservação de alimentos', 'Grosso: salga de carnes e curas', 'Marinho: oligoelementos adicionais', 'Iodado: prevenção de distúrbios da tireoide'],
    body: 'Indispensável para transmissão nervosa, contração muscular e equilíbrio hídrico. Em emergências com esforço físico e sudorese, a reposição de eletrólitos previne hiponatremia. Método milenar de conservação por osmose.',
  },
  {
    name: 'Açúcar',
    tagline: 'Fonte de Energia de Longa Duração',
    durability: 'Indefinido',
    calories: '~4 kcal/g',
    icon: Package,
    keyFact: 'Açúcar branco refinado é o mais confiável para longuíssimo prazo. Mascavo tem mais nutrientes mas menor durabilidade.',
    tips: [
      'Recipientes herméticos de vidro, cerâmica ou plástico alimentício',
      'Ambiente seco e com temperatura estável',
      'Proteger da luz direta',
      'Verificar periodicamente compactação',
    ],
    body: 'Fonte concentrada de energia rapidamente disponível. Previne degradação proteica muscular em restrição alimentar extrema. Fundamental para conservação de frutas (compotas), fermentação e produção de vinagres. Em cenários avançados, base para etanol.',
  },
  {
    name: 'Óleo de Coco',
    tagline: 'Gordura Saudável e Estável',
    durability: 'Até 5 anos',
    calories: '~9 kcal/g',
    icon: Leaf,
    keyFact: 'Ácidos graxos de cadeia média saturados proporcionam estabilidade superior — supera soja, canola e girassol.',
    tips: [
      'Recipientes de vidro âmbar, sem luz solar direta',
      'Ambiente fresco e seco',
      'Solidificação abaixo de 24°C é normal e indica pureza',
    ],
    body: 'Triglicerídeos de cadeia média (TCM) são metabolizados como energia rápida. Uso multifuncional: hidratante para pele, lubrificante para ferramentas, base para sabões artesanais, combustível para lamparinas e repelente natural combinado com óleos essenciais.',
  },
  {
    name: 'Leite em Pó',
    tagline: 'Nutrição Concentrada',
    durability: '2–10 anos',
    calories: 'Proteína completa + cálcio',
    icon: Package,
    keyFact: 'Leite em pó desnatado dura mais, mas o integral oferece maior densidade energética em cenários de escassez.',
    tips: [
      'Transferir para recipientes herméticos com absorvedores de O₂',
      'Local fresco, seco e escuro',
      'Após aberto, consumir em até 6 meses',
      'Sistema de rotação para manter frescor',
    ],
    body: 'Concentra praticamente todos os benefícios do leite fresco: proteínas completas, cálcio biodisponível, vitaminas B, A e D. Particularmente valioso para crianças, idosos e gestantes. Versátil em panificação, sopas, molhos e bebidas quentes.',
  },
  {
    name: 'Aveia',
    tagline: 'Carboidrato Complexo e Nutritivo',
    durability: '2–30 anos (grãos inteiros)',
    calories: '~17% proteína em peso seco',
    icon: Wheat,
    keyFact: 'Grãos inteiros em ambiente anaeróbico podem durar 30 anos. Baixo índice glicêmico = saciedade duradoura com porções menores.',
    tips: [
      'Grãos inteiros para longuíssimo prazo, flocos para rotação frequente',
      'Recipientes herméticos com absorvedores de oxigênio',
      'Folhas de louro como repelente natural de pragas',
    ],
    body: 'Carboidratos complexos de liberação lenta. Teor proteico supera outros cereais. Rica em beta-glucanas que reduzem colesterol. Base para pães rústicos, espessante de sopas, extensor de carnes, barras energéticas caseiras e bebidas nutritivas.',
  },
  {
    name: 'Carne Seca',
    tagline: 'Proteína Preservada',
    durability: '6 meses–2 anos',
    calories: '~33g proteína/100g',
    icon: Flame,
    keyFact: 'A desidratação concentra quase o dobro da proteína encontrada na carne fresca.',
    tips: [
      'Embalagens a vácuo ou recipientes herméticos',
      'Absorvedores de oxigênio + sílica gel',
      'Ambiente fresco e seco',
      'Inspecionar periodicamente: odor, manchas, textura',
    ],
    body: 'Método milenar: charque, carne-de-sol e beef jerky. Preserva ferro heme de alta biodisponibilidade, zinco, vitaminas B12, creatina e carnosina. Preparação caseira permite controle total de ingredientes.',
  },
  {
    name: 'Nozes e Sementes',
    tagline: 'Nutrientes Compactos',
    durability: '6 meses–2 anos',
    calories: '~600 kcal/100g',
    icon: Leaf,
    keyFact: 'Sementes como girassol e abóbora têm potencial de cultivo — transcendem o consumo imediato e viram produção.',
    tips: [
      'Priorizar amêndoas e avelãs (menor oxidação)',
      'Recipientes herméticos com absorvedores de oxigênio',
      'Abaixo de 15°C ideal',
      'Rotatividade mais frequente que grãos e leguminosas',
    ],
    body: 'Gorduras saudáveis, proteínas completas e carboidratos de baixo IG. Densidade calórica excepcional para kits de evacuação. Vitamina E, magnésio, selênio, ômega-3 e fitoquímicos anti-inflamatórios. Potencial de cultivo em cenários de crise prolongada.',
  },
];

/* ═══════════════════════════════════════════
   18 MÉTODOS DE CONSERVAÇÃO
   ═══════════════════════════════════════════ */

interface Metodo {
  name: string;
  principle: string;
  icon: typeof Flame;
  summary: string;
  details: string[];
  safetyNote?: string;
}

const METODOS: Metodo[] = [
  {
    name: 'Enlatamento',
    principle: 'Esterilização térmica + vedação hermética',
    icon: Package,
    summary: 'Conserva por 1–30 anos. Banho-maria para ácidos (frutas, picles, pH < 4,6). Panela de pressão para baixa acidez (carnes, legumes, 115–121°C).',
    details: ['Receitas testadas e aprovadas são obrigatórias', 'Tempos e pressões específicos por alimento e altitude', 'Verificar vedação: tampas côncavas e firmes', 'Investimento em panela de pressão, vidros e funis de boca larga se paga com autonomia', 'Recipientes de vidro permitem reutilização virtualmente indefinida'],
    safetyNote: 'Alimentos de baixa acidez (pH > 4,6) EXIGEM panela de pressão para prevenir esporos de Clostridium botulinum.',
  },
  {
    name: 'Desidratação',
    principle: 'Redução de umidade para 10–20%',
    icon: Wind,
    summary: 'Reduz volume em até 1/6 e peso em até 1/3. Armazenamento de 1–5 anos. Concentra nutrientes e sabores.',
    details: ['Solar: econômico, depende do clima, exige proteção contra insetos', 'Forno doméstico: 55–70°C com porta levemente aberta', 'Desidratadores elétricos: temperatura e fluxo de ar controlados', 'Frutas: ácido ascórbico previne escurecimento', 'Vegetais: branqueamento prévio inativa enzimas', 'Carnes: remoção de gorduras + cura com sal obrigatória', 'Ervas: temperaturas mais baixas preservam aromas voláteis'],
  },
  {
    name: 'Fermentação',
    principle: 'Microrganismos benéficos criam ambiente hostil para patógenos',
    icon: Beaker,
    summary: 'Chucrute, kimchi, kombucha, kefir. Aumenta biodisponibilidade de nutrientes, gera probióticos vivos e vitaminas do complexo B.',
    details: ['Ácido lático reduz pH para níveis onde patógenos não proliferam', 'Aumenta biodisponibilidade de ferro e zinco', 'Reduz fatores antinutricionais como fitatos', 'Culturas (SCOBY, kefir, massa-mãe) são recursos permanentes e renováveis', 'Independe de eletricidade ou aditivos industriais', 'Sal de qualidade nas concentrações apropriadas para cada tipo'],
  },
  {
    name: 'Defumação',
    principle: 'Compostos fenólicos + desidratação parcial',
    icon: Flame,
    summary: 'Técnica de +80.000 anos. Quente (60–80°C, horas, cozinha parcialmente) ou fria (25–30°C, dias a semanas, permite maturação).',
    details: ['Frutíferas (macieira, cerejeira): fumaça suave para aves e peixes', 'Carvalho e nogueira: robusta para carnes vermelhas e embutidos', 'Mesquite e hickory: sabor intenso estilo churrasco americano', 'NUNCA usar madeiras resinosas (pinus, eucalipto) — compostos tóxicos', 'Controle de combustão lenta com boa oxigenação evita HPAs cancerígenos', 'Quando combinada com salga e cura, cria produtos estáveis à temperatura ambiente'],
  },
  {
    name: 'Salga',
    principle: 'Osmose + redução de atividade de água (Aw < 0,86)',
    icon: Beaker,
    summary: 'Método de +4.000 anos. Três variantes: seca (direta), úmida (salmoura) e mista (sequencial). Pilar da conservação de proteínas.',
    details: ['Seca: sal direto na superfície, migração rápida de umidade — ideal para bacalhau e charque', 'Úmida (salmoura): imersão em solução salina, penetração homogênea — para carnes delicadas', 'Mista: combinação sequencial para distribuição uniforme', 'Sal não iodado e sem aditivos para conservação', 'Temperaturas baixas (0–4°C ideal) nas etapas iniciais', 'Nitrito/nitrato de sódio (sal de cura) para carnes sem cocção posterior', 'Especiarias como alho, pimenta e louro agregam propriedades antimicrobianas'],
  },
  {
    name: 'Congelamento',
    principle: 'Conversão de água em cristais de gelo a -18°C',
    icon: Snowflake,
    summary: 'Mantém características próximas ao fresco. Carnes: 8–12 meses. Frutas/vegetais branqueados: 8–12 meses. Pratos prontos: 2–3 meses.',
    details: ['Congelamento rápido (-30°C) produz cristais menores = melhor textura', 'Embalagem hermética previne queima por congelamento e absorção de odores', 'Branqueamento de vegetais inativa enzimas antes de congelar', 'Peixes gordurosos têm vida útil mais curta (3–6 meses)', 'Primeiro nível de um sistema escalonado de conservação'],
    safetyNote: 'Limitação crítica: depende de energia elétrica contínua. Complementar SEMPRE com métodos independentes de refrigeração.',
  },
  {
    name: 'Conserva em Vinagre',
    principle: 'Acidificação (pH < 4,6, ideal 3,0–3,5)',
    icon: Droplets,
    summary: 'Ácido acético penetra membranas microbianas. Quick pickling (semanas) ou com processamento térmico (1–2 anos à temperatura ambiente).',
    details: ['Vinagres com mínimo 5% de ácido acético — álcool ou vinho branco destilado', 'Proporção vinagre:água de 1:1 ou mais concentrada', 'Sal a 1–2% potencializa conservação e sabor', 'Vegetais: pepinos, cenouras, beterrabas, cebolas, pimentões, couve-flor', 'Frutas: maçãs, peras, pêssegos em vinagres mais doces', 'Proteínas: ovos, peixes pequenos, carnes pré-cozidas', 'Aguardar 72h antes do consumo para penetração adequada da acidez', 'Esterilizar vidros e tampas para armazenamento prolongado'],
  },
  {
    name: 'Conserva em Açúcar',
    principle: 'Ambiente hiperosmótico (≥65% sólidos solúveis)',
    icon: Package,
    summary: 'Compotas, geleias, frutas cristalizadas e em calda. Alta concentração de açúcar extrai água das células microbianas por osmose.',
    details: ['Compotas e geleias: 65–68% açúcar, frequentemente com pectina e ácido', 'Frutas cristalizadas: impregnação progressiva com xarope em concentrações crescentes', 'Frutas em calda: pasteurizadas em xarope 30–50% em recipientes herméticos', 'Concentração mínima de 65% medida com refratômetro para conservação sem refrigeração', 'Esterilização de recipientes é fundamental', 'Tratamento térmico menos intenso preserva melhor vitaminas e antioxidantes', 'Variedade sensorial e prazer gustativo — psicologicamente relevante em crises prolongadas'],
  },
  {
    name: 'Conserva em Óleo',
    principle: 'Barreira anaeróbica contra oxigênio',
    icon: Droplets,
    summary: 'Tomates secos, berinjelas, alcachofras, queijos, pescados. O óleo cria camada protetora e absorve compostos aromáticos.',
    details: ['NUNCA usar alimentos frescos diretamente — sempre pré-tratar (acidificar, salgar, desidratar ou cozinhar)', 'Alimentos completamente submersos, sem bolsas de ar', 'Azeite de oliva extravirgem é o mais estável e aromático', 'Desidratação superficial completa antes da imersão', 'Colheres limpas e secas para retirada parcial', 'Óleos absorvem sabores e viram ingredientes valiosos por si só', 'Armazenar em local fresco e escuro para retardar oxidação'],
    safetyNote: 'Alho e ervas frescas em óleo à temperatura ambiente podem gerar toxina botulínica (Clostridium botulinum é anaeróbico). Acidificar ANTES ou refrigerar SEMPRE.',
  },
  {
    name: 'Liofilização',
    principle: 'Sublimação: água sólida → vapor (-40 a -60°C + vácuo)',
    icon: Snowflake,
    summary: 'Preserva 97% dos nutrientes, estrutura celular intacta. Vida útil de 10–25 anos. Reidratação em ~5 minutos. Reduz peso em até 90%.',
    details: ['Mantém aromas, cores e sabores originais excepcionalmente', 'Reidratação rápida e quase completa vs desidratação convencional', 'Equipamento complexo e caro — raramente acessível para uso doméstico', 'Processo lento: 24–48h por ciclo', 'Requer embalagem hermética e à prova de luz para máxima conservação', 'Produtos comerciais liofilizados são componentes valiosos em kits de emergência', 'Frutas, vegetais, carnes, peixes, ovos e refeições completas disponíveis comercialmente'],
  },
  {
    name: 'Embalagem a Vácuo',
    principle: 'Remoção de O₂ retarda oxidação e crescimento aeróbico',
    icon: Package,
    summary: 'Multiplica vida útil: carnes cruas 3–5 dias → 1–2 semanas. Grãos 6 meses → 1–2 anos. Queijos duros até 8 meses.',
    details: ['Seladora a vácuo é investimento que se paga rapidamente', 'Combinar com absorvedores de oxigênio para máximo efeito', 'Ideal para porcionamento de estoques grandes', 'Proteger pontas afiadas de ossos com papel-toalha', 'Trabalhar com alimentos resfriados para evitar condensação interna', 'Funciona como complemento — não substitui refrigeração para perecíveis', 'Café em grãos: preserva aromas por 2–3 meses vs 1–2 semanas'],
    safetyNote: 'C. botulinum é anaeróbico — vácuo sem refrigeração pode criar risco. Sempre complementar com frio, acidificação ou sal.',
  },
  {
    name: 'Pasteurização',
    principle: 'Calor controlado elimina patógenos sem esterilização total',
    icon: Flame,
    summary: 'HTST (72–75°C/15–20s), LTLT (63°C/30min), UHT (135–150°C/2–4s). Preserva melhor características sensoriais que enlatamento.',
    details: ['Nomeada em homenagem a Louis Pasteur (1864)', 'Não elimina todos os microrganismos — requer refrigeração posterior', 'Exceção: UHT permite armazenamento à temperatura ambiente', 'HPP (alta pressão): método não-térmico com 400–600 MPa', 'Aplicável a leites, sucos, ovos líquidos, cervejas, vinhos, polpas', 'Caseira viável com termômetro confiável e controle de tempo', 'UHT é componente valioso em estoques de emergência'],
  },
  {
    name: 'Cura',
    principle: 'Sal + nitrito/nitrato + tempo = proteção microbiológica',
    icon: Clock,
    summary: 'Base de embutidos tradicionais: linguiça, salame, presunto. Combinação química que preserva e desenvolve sabor complexo.',
    details: ['Sal de cura #1 (nitrito) para cura rápida', 'Sal de cura #2 (nitrato) para cura longa (se converte em nitrito lentamente)', 'Controle de temperatura e umidade é crítico', 'Peso exato dos ingredientes é inegociável — usar balança de precisão', 'Frequentemente seguida por defumação ou maturação'],
  },
  {
    name: 'Irradiação',
    principle: 'Radiação ionizante (gama, elétrons, raios X)',
    icon: ShieldCheck,
    summary: 'Aprovado por OMS, FAO e ANVISA. NÃO torna o alimento radioativo. Baixas doses inibem brotamento; altas esterilizam especiarias.',
    details: ['Baixas doses (até 1 kGy): inibir brotamento em batatas/cebolas, controlar parasitas', 'Doses médias (1–10 kGy): reduzir carga microbiana em carnes e frutos do mar', 'Altas doses (+10 kGy): esterilizar especiarias e alimentos para imunocomprometidos', 'Tratamento após embalagem final — sem risco de recontaminação', 'Mínima elevação de temperatura preserva nutrientes termossensíveis', 'Símbolo radura identifica alimentos irradiados', 'Infraestrutura especializada — inacessível para pequenos produtores'],
  },
  {
    name: 'Atmosfera Modificada',
    principle: 'Substituição do ar por N₂, CO₂ ou misturas específicas',
    icon: Wind,
    summary: 'Carnes vermelhas: 70–80% O₂ + 20–30% CO₂. Aves/peixes: baixo O₂ + 40–60% CO₂. Panificação: 100% CO₂.',
    details: ['Nitrogênio desloca oxigênio sem reagir com alimentos', 'CO₂ tem efeito bacteriostático adicional', 'Frutas/vegetais: 2–5% O₂ + 3–10% CO₂ — calibrados para reduzir respiração sem fermentação', 'Forma passiva: respiração do produto + permeabilidade controlada do filme', 'Combinar com refrigeração é obrigatório — falha na cadeia de frio anula benefícios', 'Adaptação caseira: flush de nitrogênio em baldes com vedação hermética'],
  },
  {
    name: 'Defumação Líquida',
    principle: 'Compostos de fumaça condensados aplicados ao alimento',
    icon: Droplets,
    summary: 'Alternativa moderna à defumação tradicional. Menor risco de HPAs cancerígenos. Dosagem precisa e reprodutível.',
    details: ['Sem exposição direta à combustão', 'Aplicação por imersão, spray ou injeção', 'Disponível comercialmente em forma concentrada', 'Sabor controlável e consistente entre lotes'],
  },
  {
    name: 'Confitagem',
    principle: 'Imersão e cozimento lento em gordura (80–90°C)',
    icon: Flame,
    summary: 'Técnica francesa clássica. Pato, porco e vegetais cozidos e preservados em sua própria gordura.',
    details: ['Gordura cria barreira contra oxigênio', 'Cozimento lento a baixa temperatura preserva textura', 'Armazenamento em recipiente coberto pela gordura', 'Sob refrigeração, conserva por meses'],
  },
  {
    name: 'Conservantes Naturais',
    principle: 'Compostos fitoquímicos antimicrobianos e antioxidantes',
    icon: Leaf,
    summary: 'Alho (alicina), cravo (eugenol), canela (cinnamaldeído), orégano (carvacrol), alecrim (ácido carnósico). Eficácia documentada cientificamente.',
    details: ['Alicina do alho: potente ação antibacteriana e antifúngica', 'Eugenol do cravo: eficaz contra amplo espectro de microrganismos', 'Timol do orégano/tomilho: eficácia comparável a conservantes sintéticos', 'Capsaicina da pimenta: inibe microrganismos deteriorantes', 'Aplicação: direta, infusão em óleos/vinagres, marinadas, crostas', 'Sempre como complemento — raramente método único para perecíveis', 'Cultivo de ervas conservantes = recurso renovável permanente'],
  },
  {
    name: 'Armazenamento em Silos',
    principle: 'Controle de umidade (12–14%), temperatura (<15°C) e atmosfera',
    icon: Warehouse,
    summary: 'Para grandes volumes de grãos. De simples estruturas ancestrais a sistemas com controle atmosférico. Preservação de 1–5 anos.',
    details: ['Umidade dos grãos: 12–14% para prevenir fungos e germinação prematura', 'Temperatura abaixo de 15°C — aeração noturna controlada', 'Hermeticidade: O₂ consumido pelos próprios grãos cria atmosfera rica em CO₂', 'Silos metálicos pequenos (100–500kg) para escala familiar', 'Técnica PICS (Purdue): triplos sacos plásticos sobrepostos — baixo custo, excelentes resultados', 'Tambores de 200L com revestimento interno e vedação', 'Limpeza, secagem uniforme e resfriamento antes do armazenamento', 'Terra diatomácea para proteção adicional contra insetos'],
  },
  {
    name: 'Câmaras Frias',
    principle: 'Controle preciso de temperatura + umidade relativa',
    icon: Thermometer,
    summary: 'Resfriamento (1–7°C), congelamento (-18 a -25°C), atmosfera controlada e câmaras de maturação. Preservação com mínima alteração.',
    details: ['Isolamento térmico com poliuretano ou poliestireno de alta densidade', 'Controle de umidade relativa específico por categoria de alimento', 'Sistemas redundantes para falhas energéticas prolongadas', 'Câmaras subterrâneas aproveitam estabilidade térmica do solo', 'Root cellars modernizados com controles de temperatura e umidade', 'Sistemas híbridos com energia solar reduzem dependência da rede', 'Pequenas câmaras modulares pré-fabricadas a partir de 3m³'],
    safetyNote: 'Dependência de energia elétrica contínua é vulnerabilidade significativa. Combinar SEMPRE com métodos independentes de refrigeração.',
  },
];

/* ═══════════════════════════════════════════
   EXPANDABLE CARD COMPONENT
   ═══════════════════════════════════════════ */

function AlimentoCard({ item, index }: { item: Alimento; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={index}
      className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden backdrop-blur-sm hover:border-white/[0.1] transition-shadow duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 md:p-8 flex items-start gap-4 group cursor-pointer"
      >
        <div className="p-3 bg-amber-500/[0.12] rounded-xl shrink-0 mt-0.5">
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

          <Icon className="text-amber-400" size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-stone-200 group-hover:text-amber-400 transition-colors">{item.name}</h3>
              <p className="text-amber-500 text-xs font-semibold uppercase tracking-wider mt-0.5">{item.tagline}</p>
            </div>
            <div className="shrink-0">
              {open ? <ChevronUp className="text-stone-500" size={18} /> : <ChevronDown className="text-stone-500" size={18} />}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/[0.12] text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/20">
              {item.durability}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/[0.04] text-stone-400 px-2.5 py-1 rounded-full border border-white/[0.08]">
              {item.calories}
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: APPLE_EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 border-t border-white/[0.06] pt-6">
              <p className="text-stone-400 text-sm leading-relaxed mb-4">{item.body}</p>
              
              <div className="bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-xl p-4 mb-4">
                <p className="text-amber-400 text-sm font-medium leading-relaxed">
                  <span className="font-bold">↳ </span>{item.keyFact}
                </p>
              </div>

              {item.varieties && (
                <div className="mb-4">
                  <p className="text-stone-500 text-[10px] font-bold uppercase tracking-wider mb-2">Variedades</p>
                  <div className="flex flex-wrap gap-2">
                    {item.varieties.map(v => (
                      <span key={v} className="text-xs text-stone-400 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-lg">{v}</span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-stone-500 text-[10px] font-bold uppercase tracking-wider mb-2">Protocolo de Armazenamento</p>
              <ul className="space-y-1.5">
                {item.tips.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span className="text-stone-500 text-xs leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MetodoCard({ item, index }: { item: Metodo; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={index}
      className="bg-white/[0.03] border border-emerald-500/[0.1] rounded-2xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/20 transition-shadow duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 md:p-6 flex items-start gap-4 group cursor-pointer"
      >
        <div className="p-2.5 bg-emerald-500/[0.12] rounded-xl shrink-0 mt-0.5">
          <Icon className="text-emerald-400" size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-stone-200 group-hover:text-emerald-400 transition-colors">{item.name}</h3>
            <div className="shrink-0">
              {open ? <ChevronUp className="text-stone-500" size={16} /> : <ChevronDown className="text-stone-500" size={16} />}
            </div>
          </div>
          <p className="text-emerald-500/80 text-[10px] font-bold uppercase tracking-wider mt-0.5">{item.principle}</p>
          <p className="text-stone-500 text-xs leading-relaxed mt-2">{item.summary}</p>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: APPLE_EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 border-t border-white/[0.06] pt-4">
              <ul className="space-y-1.5 mb-3">
                {item.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span className="text-stone-400 text-xs leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
              {item.safetyNote && (
                <div className="bg-rose-500/[0.08] border border-rose-500/[0.15] rounded-xl p-3 flex items-start gap-2">
                  <AlertTriangle className="text-rose-400 shrink-0 mt-0.5" size={14} />
                  <p className="text-rose-300 text-xs font-medium leading-relaxed">{item.safetyNote}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function ConservacaoArmazenamento() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Conservação e Armazenamento de Alimentos: Estoque Estratégico de Sobrevivência | Lord Junnior</title>
        <meta name="description" content="Guia completo de conservação de alimentos para autossuficiência. 10 alimentos essenciais, 18 métodos de preservação validados, desidratação, fermentação e estoque estratégico familiar." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/armazenamento-longo-prazo" />
        <meta property="og:title" content="Conservação de Alimentos: Estoque Estratégico Familiar" />
        <meta property="og:description" content="10 alimentos essenciais + 18 métodos de conservação. Construa um estoque que dura décadas." />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/armazenamento-longo-prazo" />
      </Helmet>
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 pb-32 relative overflow-hidden" style={{ background: '#050808' }}>
      <FixedThematicBackground image={bgConservacao} intensity="medium" />
      <CinematicHero
        image="/heroes/conservacao-armazenamento.webp"
        phase="Fase 03 · Soberania Alimentar"
        title="Conservação & Armazenamento"
        subtitle="Quem controla a conservação dos seus alimentos não depende da cadeia de frio industrial. Este módulo reúne os 10 alimentos essenciais, 20 métodos validados de preservação e o arsenal auxiliar completo."
        icon={Package}
        accentColor="amber"
        backLink="/soberania-organica"
        backLabel="Soberania Orgânica"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12">

        {/* ═══ FRAMEWORK VISUAL ═══ */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="bg-white/[0.03] border border-white/[0.06] p-8 md:p-10 rounded-2xl mb-20"
        >
          <p className="text-stone-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Critérios de seleção do estoque</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-stone-400">
            <div className="flex items-start gap-3">
              <Clock className="text-amber-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-stone-200 font-semibold mb-1">Durabilidade extrema</p>
                <p className="text-xs leading-relaxed">Armazenamento prolongado sem deterioração — muitos ultrapassam 5 anos.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Flame className="text-amber-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-stone-200 font-semibold mb-1">Densidade calórica</p>
                <p className="text-xs leading-relaxed">Alto teor calórico e nutricional. Energia sustentável em situações de escassez.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-amber-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-stone-200 font-semibold mb-1">Independência elétrica</p>
                <p className="text-xs leading-relaxed">Sem necessidade de refrigeração. Funciona em condições de falta de energia.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══ SEÇÃO 1: 10 ALIMENTOS ═══ */}
        <motion.section className="mb-28" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="mb-10">
            <span className="text-amber-500 text-[10px] font-bold tracking-[0.4em] uppercase">Bloco 01 — Estoque Estratégico</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 text-stone-100">
              Os 10 Alimentos <span className="text-amber-400">Essenciais</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mt-3 max-w-2xl">
              Selecionados por durabilidade, valor nutricional, versatilidade e custo acessível.
            </p>
          </div>

          <div className="space-y-4">
            {ALIMENTOS.map((item, i) => (
              <AlimentoCard key={item.name} item={item} index={i} />
            ))}
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mt-10 bg-amber-500/[0.08] border border-amber-500/[0.15] p-8 rounded-2xl text-center"
          >
            <p className="text-amber-400 text-sm font-semibold mb-2">O ambiente ideal é fresco, seco e escuro.</p>
            <p className="text-stone-500 text-xs max-w-lg mx-auto leading-relaxed">
              Temperatura e umidade elevadas são os principais inimigos. Recipientes herméticos, absorvedores de oxigênio e
              rotulagem adequada prolongam significativamente a vida útil.
            </p>
          </motion.div>
        </motion.section>

        <motion.section className="mb-28" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="mb-10">
            <span className="text-emerald-500 text-[10px] font-bold tracking-[0.4em] uppercase">Bloco 02 — Arsenal de Técnicas</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 text-stone-100">
              20 Métodos de <span className="text-emerald-400">Conservação</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mt-3 max-w-2xl">
              De técnicas milenares a tecnologias industriais. A combinação de diferentes métodos frequentemente proporciona resultados superiores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Redução de umidade', methods: 'Desidratação, Liofilização, Salga' },
              { label: 'Ambiente hostil', methods: 'Fermentação, Vinagre, Açúcar, Óleo, Conservantes Naturais' },
              { label: 'Calor', methods: 'Enlatamento, Pasteurização, Confitagem' },
              { label: 'Frio', methods: 'Congelamento, Câmaras Frias' },
              { label: 'Atmosfera', methods: 'Vácuo, Atmosfera Modificada, Silos' },
              { label: 'Especializados', methods: 'Irradiação, Cura, Defumação, Defumação Líquida' },
            ].map(cat => (
              <div key={cat.label} className="bg-emerald-500/[0.06] border border-emerald-500/[0.1] rounded-xl p-4">
                <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">{cat.label}</p>
                <p className="text-stone-500 text-xs">{cat.methods}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {METODOS.map((item, i) => (
              <MetodoCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </motion.section>

        {/* ═══ SEÇÃO 3: NATURALMENTE DURADOUROS ═══ */}
        <motion.section className="mb-28" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="mb-10">
            <span className="text-stone-500 text-[10px] font-bold tracking-[0.4em] uppercase">Bloco 03 — Longevidade Natural</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 text-stone-100">
              Alimentos <span className="text-emerald-400">Naturalmente Duradouros</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mt-3 max-w-2xl">
              A natureza desenvolveu alimentos com extraordinária capacidade de conservação intrínseca — sem intervenção tecnológica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Droplets, name: 'Vinagre', tagline: 'O Conservante Multifuncional', body: 'pH entre 2,4 e 3,4. Autoprotetor por acidez extrema.', details: ['Pickling, marinadas, condimentos estabilizados', 'Intensifica extração de minerais de ossos em caldos', 'Potencializa biodisponibilidade de cálcio', 'Produção caseira simples'] },
              { icon: Wheat, name: 'Grãos Integrais', tagline: 'Cápsulas Biológicas de Nutrição', body: 'Trigo: 15–30 anos. Milho requer nixtamalização.', details: ['Trigo, aveia, centeio, cevada, milho, quinoa', 'Umidade abaixo de 10%', 'Capacidade germinativa preservada', 'Capital biológico renovável'] },
              { icon: Egg, name: 'Leguminosas Secas', tagline: 'Proteína Vegetal de Longa Duração', body: '20–25% proteína. Armazenamento de 2–10 anos.', details: ['Feijões, grão-de-bico, lentilhas, ervilha seca', 'Complementaridade com grãos = nutrição completa', 'Baixo teor lipídico minimiza rancificação', 'Congelamento prévio elimina ovos de insetos'] },
              { icon: Package, name: 'Alimentos Enlatados', tagline: 'Praticidade e Décadas de Estabilidade', body: 'Esterilização comercial cria ambiente estéril.', details: ['Alta acidez: 3–5 anos oficialmente, décadas na prática', 'Proteínas inalteradas, minerais preservados', 'Vidros permitem reutilização', 'Sistema FIFO para rotatividade'] },
              { icon: Leaf, name: 'Raízes e Tubérculos Curados', tagline: 'Reserva Natural de 3–12 Meses', body: 'Inhames, batatas, mandioca, beterrabas.', details: ['Proteção contra oscilações de temperatura', 'Ventilação controlada', 'Potencial reprodutivo preservado', 'Estabilidade térmica natural'] },
              { icon: Leaf, name: 'Especiarias e Ervas Secas', tagline: 'Óleos Essenciais Conservantes', body: 'Ricas em óleos essenciais com propriedades conservantes.', details: ['Recurso renovável quando cultivadas', 'Valor de troca em cenários de escassez', 'Propriedades medicinais complementares', 'Recipientes herméticos ao abrigo da luz'] },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2.5 bg-emerald-500/[0.12] rounded-xl shrink-0">
                      <Icon className="text-emerald-400" size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-200">{item.name}</h3>
                      <p className="text-emerald-500/80 text-[10px] font-bold uppercase tracking-wider">{item.tagline}</p>
                    </div>
                  </div>
                  <p className="text-stone-400 text-sm leading-relaxed mb-3">{item.body}</p>
                  <ul className="space-y-1.5">
                    {item.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span className="text-stone-500 text-xs leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ═══ SEÇÃO 4: ARSENAL AUXILIAR ═══ */}
        {/* Section Image: Arsenal Auxiliar */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="relative rounded-3xl overflow-hidden mb-10 border border-white/[0.06]"
        >
          <img src={imgArsenalAuxiliar} alt="Arsenal auxiliar: seladora a vácuo, baldes herméticos, absorvedores de oxigênio" className="w-full h-48 md:h-72 object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-6 right-6">
            <p className="text-white/90 text-sm font-semibold">Equipamentos e insumos que multiplicam a eficiência do armazenamento.</p>
          </div>
        </motion.div>

        <motion.section className="mb-28" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="mb-10">
            <span className="text-stone-500 text-[10px] font-bold tracking-[0.4em] uppercase">Bloco 04 — Infraestrutura de Apoio</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 text-stone-100">
              Arsenal <span className="text-amber-400">Auxiliar</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mt-3 max-w-2xl">
              Equipamentos, insumos e acessórios que multiplicam a eficiência do sistema. 
              A seleção deve priorizar durabilidade, independência energética e multicontinuidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recipientes */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-amber-500/[0.12] rounded-xl">
                  <Box className="text-amber-400" size={18} />
                </div>
                <h3 className="text-base font-bold text-stone-200">Recipientes Herméticos</h3>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed mb-3">
                Primeira linha de defesa. Barreiras contra umidade, oxigênio, luz e pragas.
              </p>
              <ul className="space-y-1.5">
                {[
                  'Vidros de conserva com tampas específicas — reutilização indefinida',
                  'Baldes HDPE #2 grau alimentício (10–20L) com selo gamma',
                  'Sacos Mylar multicamadas (polietileno + alumínio + poliéster)',
                  'Inspeção de integridade → higienização em 3 etapas → verificação de selagem',
                  'Etiquetagem: conteúdo, data, método, prazo',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span className="text-stone-500 text-[11px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Absorvedores */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-amber-500/[0.12] rounded-xl">
                  <ShieldCheck className="text-amber-400" size={18} />
                </div>
                <h3 className="text-base font-bold text-stone-200">Absorvedores de Oxigênio</h3>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed mb-3">
                Ferro pulverizado + umidade = O₂ sequestrado abaixo de 0,01%. Multiplica vida útil por 3–5x.
              </p>
              <ul className="space-y-1.5">
                {[
                  '50cc: vidros 250–500ml | 300cc: vidros 1–2L | 1000cc+: baldes 10–20L',
                  'Manuseio rápido — começam absorção imediatamente ao abrir',
                  'Ineficazes em recipientes com qualquer vazamento',
                  'Desnecessários para sal, açúcar e mel (naturalmente estáveis)',
                  'Armazenar não utilizados em sacos aluminizados selados',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span className="text-stone-500 text-[11px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Rótulos */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-amber-500/[0.12] rounded-xl">
                  <Tag className="text-amber-400" size={18} />
                </div>
                <h3 className="text-base font-bold text-stone-200">Rótulos e Organização</h3>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed mb-3">
                Sistemas de informação completos. Impacta diretamente segurança alimentar e minimização de desperdício.
              </p>
              <ul className="space-y-1.5">
                {[
                  'Conteúdo + data + método + parâmetros + prazo + instruções de preparo',
                  'Etiquetas resistentes à umidade e UV, marcadores permanentes não-tóxicos',
                  'Posicionamento consistente + terminologia padronizada',
                  'Sistema FIFO: primeiro a entrar, primeiro a sair',
                  'Catálogo mestre centralizado — físico e digital',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span className="text-stone-500 text-[11px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Equipamentos essenciais */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mt-6 bg-white/[0.03] border border-white/[0.06] p-8 rounded-2xl"
          >
            <p className="text-stone-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Equipamentos complementares</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-500">
              <div><span className="text-stone-300 font-semibold block mb-1">Processamento</span>Desidratadores, panelas de pressão, seladores a vácuo, moinhos manuais</div>
              <div><span className="text-stone-300 font-semibold block mb-1">Monitoramento</span>Termômetros de precisão, medidores de pH, higrômetros, refratômetros</div>
              <div><span className="text-stone-300 font-semibold block mb-1">Insumos</span>Sílica gel, terra diatomácea, indicadores de umidade, sal de cura</div>
              <div><span className="text-stone-300 font-semibold block mb-1">Segurança</span>Luvas térmicas, óculos, aventais, kit primeiros socorros para cozinha</div>
            </div>
          </motion.div>
        </motion.section>

        {/* ═══ CTA FINAL — CONCLUSÃO ═══ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="text-center"
        >
          <div className="bg-stone-800 text-stone-100 p-10 md:p-14 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-emerald-600/10 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-amber-400 text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Engenharia de Resiliência Alimentar</p>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-6">
                Um estoque estático se esgota.<br />
                <span className="text-amber-400">Capacidades preservativas são permanentes.</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-10 max-w-3xl mx-auto">
                <div>
                  <ShieldCheck className="text-amber-400 mb-2" size={18} />
                  <p className="text-stone-300 text-xs font-semibold mb-1">Resiliência econômica</p>
                  <p className="text-stone-500 text-[11px] leading-relaxed">Proteção contra flutuações de preços e interrupções de abastecimento.</p>
                </div>
                <div>
                  <Leaf className="text-emerald-400 mb-2" size={18} />
                  <p className="text-stone-300 text-xs font-semibold mb-1">Sustentabilidade</p>
                  <p className="text-stone-500 text-[11px] leading-relaxed">Redução de desperdício alimentar. Preservação de excedentes sazonais.</p>
                </div>
                <div>
                  <BookOpen className="text-amber-400 mb-2" size={18} />
                  <p className="text-stone-300 text-xs font-semibold mb-1">Preservação cultural</p>
                  <p className="text-stone-500 text-[11px] leading-relaxed">Manutenção de técnicas tradicionais e sabedorias geracionais.</p>
                </div>
              </div>

              <p className="text-stone-400 text-sm max-w-xl mx-auto leading-relaxed mb-8">
                Quem conserva não desperdiça. Quem armazena não depende. Quem sabe não teme.<br />
                <span className="text-stone-500 mt-2 block text-xs">
                  A verdadeira segurança alimentar não reside na acumulação de produtos — reside no domínio de conhecimentos, 
                  habilidades e sistemas regenerativos que transformam fluxos sazonais de abundância em reservas estratégicas.
                </span>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/soberania-organica"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-stone-900 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-amber-400 transition-colors"
                >
                  <ArrowLeft size={14} /> Voltar ao Soberania Orgânica
                </Link>
                <Link
                  to="/soberania-organica/horta-urbana"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-stone-600 text-stone-300 font-bold text-xs uppercase tracking-widest rounded-lg hover:border-amber-500 hover:text-amber-400 transition-colors"
                >
                  Módulo: Horta Urbana <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        <ContraAtaquePratico
          theme="dark"
          title="A única conservação que sobrevive a um apagão longo"
          intro="Freezer e enlatado industrial dependem de energia e de indústria. Fermentação selvagem, cura e secagem são tecnologia ancestral de preservação calórica: funcionam por meses sem tomada, sem embalagem comprada e sem depender de ninguém."
          links={[
            { to: '/soberania-organica/conservas-fermentadas', kicker: 'Despensa viva', label: 'Conservas fermentadas: fermentação selvagem' },
            { to: '/soberania-organica/preservacao-ancestral', kicker: 'Cura e secagem', label: 'Preservação ancestral de alimentos' },
            { to: '/soberania-organica/sementes-crioulas', kicker: 'Reposição', label: 'Sementes crioulas: recomeçar o ciclo' },
          ]}
        />

        <MicroCtaResistencia variant="alimentar" />

      </div>
    </div>
    </>
  );
}
