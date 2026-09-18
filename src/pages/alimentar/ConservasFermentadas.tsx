import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, AlertTriangle, ShieldCheck, Beaker } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/alimentar/conservas-hero.jpg';
import imgChucrute from '@/assets/alimentar/conservas-chucrute.jpg';
import imgKombucha from '@/assets/alimentar/conservas-kombucha.jpg';
import imgKimchi from '@/assets/alimentar/conservas-kimchi.jpg';
import imgSal from '@/assets/alimentar/conservas-sal.jpg';
import imgDespensa from '@/assets/alimentar/conservas-despensa.jpg';
import imgAirlock from '@/assets/alimentar/conservas-airlock.jpg';
import imgMesa from '@/assets/alimentar/conservas-mesa.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

// Paleta — barro/cobre/sal/musgo
const C = {
  page: 'hsl(34 32% 92%)',
  pageDeep: 'hsl(32 28% 87%)',
  ink: 'hsl(20 28% 14%)',
  body: 'hsl(20 16% 26%)',
  muted: 'hsl(20 10% 44%)',
  copper: 'hsl(20 60% 46%)',
  copperSoft: 'hsl(28 70% 84%)',
  brine: 'hsl(45 78% 52%)',
  moss: 'hsl(110 18% 22%)',
  mossDeep: 'hsl(110 22% 14%)',
  line: 'hsl(30 14% 72%)',
};

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.10  0 0 0 0 0.05  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const sectionBg = {
  clay: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 65% 55% at 6% 14%, hsl(28 70% 84% / 0.95), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 92% 86%, hsl(20 60% 46% / 0.30), transparent 55%)',
      'radial-gradient(ellipse 40% 35% at 78% 22%, hsl(45 78% 52% / 0.18), transparent 60%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(34 32% 93%), hsl(32 26% 86%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 200px 200px, auto',
  },
  copper: {
    backgroundColor: C.pageDeep,
    backgroundImage: [
      'radial-gradient(ellipse 70% 55% at 14% 22%, hsl(28 70% 84% / 0.92), transparent 50%)',
      'radial-gradient(ellipse 60% 50% at 88% 78%, hsl(20 60% 46% / 0.30), transparent 55%)',
      'repeating-linear-gradient(115deg, transparent 0, transparent 96px, hsl(20 60% 46% / 0.10) 97px, transparent 98px)',
      noiseSvg,
      'linear-gradient(180deg, hsl(32 30% 89%), hsl(30 26% 84%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 200px 200px, auto',
  },
  moss: {
    backgroundColor: C.mossDeep,
    backgroundImage: [
      'radial-gradient(ellipse 60% 50% at 12% 18%, hsl(20 60% 46% / 0.30), transparent 50%)',
      'radial-gradient(ellipse 55% 45% at 88% 82%, hsl(45 78% 52% / 0.20), transparent 55%)',
      'radial-gradient(circle at 50% 50%, hsl(110 18% 26% / 0.6), transparent 70%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(110 22% 14%), hsl(110 24% 10%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 220px 220px, auto',
  },
  brineWash: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 65% 50% at 50% 0%, hsl(20 60% 46% / 0.26), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 10% 90%, hsl(45 78% 52% / 0.28), transparent 55%)',
      'radial-gradient(ellipse 50% 40% at 90% 60%, hsl(28 70% 84% / 0.7), transparent 55%)',
      noiseSvg,
      'linear-gradient(180deg, hsl(34 32% 92%), hsl(32 26% 87%))',
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
    titulo: 'A bactéria boa que protege a comida',
    subtitulo: 'Como uma cidade pequena defende o portão contra invasores',
    imagem: imgChucrute,
    paragrafos: [
      'Na fermentação lacto, bactérias do bem (lactobacillus) chegam primeiro, comem o açúcar do vegetal e devolvem ácido lático no lugar. Esse ácido baixa o pH e cria um ambiente onde nada que apodrece consegue sobreviver.',
      'Pense numa cidade pequena que ocupa rapidamente o portão. Quando o invasor (mofo, bactéria ruim) chega, já não tem espaço nem comida disponível. A defesa não é química industrial, é ecologia: quem chega primeiro vence.',
      'Por isso uma conserva fermentada bem feita dura meses sem geladeira, sem conservante, sem nada. O próprio ácido das bactérias é o escudo. É a tecnologia mais antiga e mais elegante de preservação alimentar humana.',
    ],
    praticas: [
      'Use vegetais firmes e frescos: repolho, cenoura, pepino, beterraba, rabanete, aipo.',
      'Lave sem sabão. Resíduo químico mata as bactérias boas que você precisa.',
      'Não esterilize tudo. Você quer que os micro-organismos do próprio vegetal trabalhem.',
    ],
    tempo: '15 min de preparo',
  },
  {
    num: '02',
    titulo: 'O sal certo na medida certa',
    subtitulo: '2% do peso dos vegetais. Nem mais, nem menos',
    imagem: imgSal,
    paragrafos: [
      'A regra é matemática. Pese os vegetais já cortados. Multiplique por 0,02. Esse é o peso de sal que você adiciona. Um quilo de repolho recebe vinte gramas de sal grosso sem refino.',
      'Pouco sal deixa as bactérias erradas crescerem e a conserva apodrece. Sal demais inibe até as boas e o processo nunca começa. Dois por cento é o ponto cego onde só a fermentação saudável prospera.',
      'Use sal marinho não refinado ou sal rosa do Himalaia. Sal de cozinha com iodo e antiumectante atrapalha a colônia. Pequena diferença, resultado totalmente diferente no fim.',
    ],
    praticas: [
      'Compre uma balança digital de cozinha. Investimento único, dura anos.',
      'Anote num caderno: peso, sal usado, data de início, sabor final. Você melhora rápido.',
      'Sal grosso natural é mais barato a longo prazo do que sal de mesa industrial.',
    ],
    tempo: '5 min de cálculo',
  },
  {
    num: '03',
    titulo: 'Submersão é segurança',
    subtitulo: 'Tudo que fica acima da água atrai mofo. Tudo que fica abaixo, fermenta',
    imagem: imgAirlock,
    paragrafos: [
      'A regra de ouro: vegetal exposto ao ar mofa. Vegetal coberto de salmoura prospera. Toda técnica de fermentação no fundo serve para garantir que nada flutue para cima.',
      'A pressão do peso submerge os vegetais na própria água que sai deles ao salgar. Pense num porão alagado: o que está debaixo da água é preservado pela falta de oxigênio, o que sobra acima estraga.',
      'Por isso os fermentadores artesanais usam pesos de cerâmica, sacos plásticos cheios de salmoura, ou folhas grandes de repolho dobradas como tampa. Qualquer coisa que mantenha o vegetal mergulhado funciona.',
    ],
    praticas: [
      'Use um saco zip cheio de água da própria salmoura como peso natural.',
      'Folha grande de repolho como "tampa interna" antes do peso evita pedaços flutuando.',
      'Se ver mofo na superfície, retire com colher e tudo embaixo continua bom.',
    ],
    tempo: '2 min de ajuste diário',
  },
  {
    num: '04',
    titulo: 'Tempo, temperatura e paciência',
    subtitulo: 'Quanto mais frio, mais lento e mais saboroso',
    imagem: imgKimchi,
    paragrafos: [
      'Fermentação é um relógio biológico. A 25°C, um chucrute fica pronto em 5 a 7 dias. A 18°C, demora duas semanas. Na geladeira, demora meses, mas desenvolve sabor muito mais complexo.',
      'O calor acelera as bactérias mas também encurta a vida da conserva. O frio devagar é o que produz aqueles fermentados de restaurante coreano que duram um ano e ganham profundidade.',
      'Você pode iniciar quente (3 dias na bancada) e depois mover para o frio (geladeira ou despensa fresca). Esse método híbrido é o mais adotado em casas tropicais como o Brasil.',
    ],
    praticas: [
      'Bancada longe do fogão e da janela ensolarada. 18 a 22°C é o ideal.',
      'Após 5 dias, prove. Se está borbulhando e ácido, está pronto. Vai pra geladeira.',
      'Anote temperatura média do ambiente. Cozinha de verão e cozinha de inverno mudam tudo.',
    ],
    tempo: '5 a 21 dias de espera',
  },
  {
    num: '05',
    titulo: 'A despensa viva sem geladeira',
    subtitulo: 'Conservas que sobrevivem a quedas de energia, mudanças e crises',
    imagem: imgDespensa,
    paragrafos: [
      'O ponto político da fermentação é este: você passa a ter comida funcional que não depende de eletricidade. Numa queda de energia, no apagão prolongado, na mudança de cidade, sua despensa continua de pé.',
      'Vinte potes de vidro com chucrute, kimchi, picles, beterraba lacto, pasta de pimenta fermentada, kombucha em garrafa. É vitamina C, probiótico, sabor, calorias e segurança alimentar para semanas inteiras sem precisar de mercado.',
      'Cada pote é um seguro silencioso. Não precisa marketing, não precisa rótulo, não precisa data de validade. Cuidado básico, sal correto, paciência: a comida defende a si mesma.',
    ],
    praticas: [
      'Padronize potes de boca larga (Weck, Le Parfait, ou marca brasileira similar).',
      'Etiquete com data e tipo. Não confie na memória depois de seis meses.',
      'Rotacione: o pote mais antigo na frente da prateleira, sempre o mais novo atrás.',
    ],
    tempo: 'Construção contínua',
  },
  {
    num: '06',
    titulo: 'Kombucha, o vinagre de chá',
    subtitulo: 'Uma colônia viva que transforma açúcar em probiótico líquido',
    imagem: imgKombucha,
    paragrafos: [
      'Kombucha é chá adoçado fermentado por uma colônia gelatinosa chamada SCOBY (cultura simbiótica de bactérias e leveduras). Em 7 a 14 dias, a colônia come o açúcar e devolve uma bebida ligeiramente ácida, gaseificada e cheia de probióticos vivos.',
      'A colônia é como uma planta: você ganha de alguém, cuida, e ela se multiplica para você presentear outros. Uma única SCOBY rende kombucha para a vida inteira da família e ainda gera filhotes mensais.',
      'É a alternativa direta a refrigerantes industriais. Custa centavos por litro, não tem rótulo, não tem corante, não depende de cadeia de distribuição. Sua geladeira passa a ter bebida fermentada feita por você.',
    ],
    praticas: [
      'Comece com chá preto puro adoçado a 8% (80g de açúcar por litro de chá).',
      'SCOBY você consegue de graça em grupos locais ou compra online uma vez só.',
      'Segunda fermentação com fruta cortada na garrafa fechada gera o gás natural.',
    ],
    tempo: '10 min/semana de manejo',
  },
];

const armadilhas = [
  { titulo: 'Tampa fechada total', desc: 'Fermentação produz gás CO2. Pote hermético sem alívio explode em poucos dias. Use airlock ou abra a tampa diariamente para liberar pressão.' },
  { titulo: 'Sal iodado e refinado', desc: 'Iodo e antiumectante matam ou inibem as bactérias boas. A fermentação trava ou apodrece. Sal grosso natural sem aditivo é regra inegociável.' },
  { titulo: 'Cloro na água', desc: 'A água da torneira tem cloro que esteriliza tudo. Use água filtrada, mineral ou deixe descansar 24h em jarra aberta para o cloro evaporar antes da salmoura.' },
  { titulo: 'Pote pequeno demais', desc: 'A fermentação levanta o nível. Encha no máximo até 80% do pote. Vegetal pressionado contra a tampa empurra a salmoura para fora e contamina.' },
  { titulo: 'Vegetais murchos', desc: 'Vegetal velho tem menos água própria, libera pouca salmoura, fica exposto ao ar e estraga. Use sempre o mais fresco que você conseguir comprar ou colher.' },
  { titulo: 'Esquecer de provar', desc: 'Fermentação não tem cronograma fixo. A 28°C fica pronto em 4 dias, a 16°C em 18. Prove a partir do quarto dia. O sabor te diz, não o calendário.' },
];

const faq = [
  {
    q: 'Fermentado é seguro mesmo? Não dá intoxicação?',
    a: 'A fermentação lacto é uma das técnicas mais seguras de conservação que a humanidade desenvolveu. O ácido lático produzido pelas bactérias boas baixa o pH a níveis (3,5 a 4,0) que impedem fisicamente o crescimento de bactérias patogênicas como salmonella, listeria e clostridium. Nunca houve um caso documentado de botulismo em fermentação lacto bem executada com 2% de sal.',
  },
  {
    q: 'Apareceu uma camada branca por cima. Estragou?',
    a: 'Quase sempre não. É kahm yeast, uma levedura branca, plana, sem pelos, que aparece na superfície quando o pote ficou muito tempo aberto ou exposto. Retire com colher, descarte essa camada, e o que está embaixo da salmoura continua perfeito. Mofo verdadeiro tem cor (verde, preto, rosa) e pelos visíveis: aí joga fora.',
  },
  {
    q: 'Posso usar qualquer vegetal?',
    a: 'A grande maioria sim. Repolho (verde, roxo), cenoura, beterraba, rabanete, pepino, vagem, couve-flor, brócolis, pimenta, alho, gengibre, cebola. Evite vegetais muito moles (tomate maduro, abobrinha) que viram papa. Evite folhas verdes finas (alface, espinafre) que se desfazem. Comece pelo chucrute simples, é o mais perdoador.',
  },
  {
    q: 'Quanto tempo dura na geladeira?',
    a: 'Bem feito, com 2% de sal e armazenado em pote de vidro fechado na geladeira (após a fermentação inicial), um chucrute dura tranquilamente 6 meses, frequentemente até 12 meses. O sabor evolui, fica mais ácido e complexo. Kimchi e picles seguem o mesmo padrão. A própria acidez é o conservante.',
  },
  {
    q: 'Crianças e idosos podem comer?',
    a: 'Sim, com bom senso. Crianças a partir de 1 ano, em pequenas porções para ir adaptando o paladar e a flora intestinal. Idosos costumam se beneficiar muito (digestão, imunidade). Quem tem histórico de problema renal ou pressão deve atentar à quantidade de sódio. Para imunossuprimidos sob tratamento sério, consulte o médico antes.',
  },
  {
    q: 'Preciso de equipamento caro?',
    a: 'Não. Pote de vidro de boca larga (qualquer maionese reaproveitada serve), uma faca, uma tábua, uma balança de cozinha barata. O airlock e os pesos cerâmicos são luxo, não necessidade. O chucrute alemão tradicional é feito em pote de barro com pedra em cima há 2.000 anos.',
  },
  {
    q: 'E se eu errar e ficar ruim?',
    a: 'O olfato resolve. Fermentado bom cheira a ácido limpo, salmoura, vinagre suave, picles. Estragado cheira a podre, a esgoto, a algo errado. Seu nariz sabe. No primeiro pote ruim você joga fora, refaz com mais atenção ao sal e à submersão, e raramente erra de novo. É uma habilidade que se calibra rápido.',
  },
  {
    q: 'Onde guardo a despensa fermentada se faltar luz?',
    a: 'O grande ponto é exatamente esse: depois de prontos, fermentados ficam estáveis em despensa fresca (15 a 20°C) por meses sem geladeira. Porão, despensa interna sem janela, armário no chão da cozinha. Geladeira só acelera mais a longevidade, mas não é obrigatória depois de finalizada a fermentação inicial.',
  },
];

export default function ConservasFermentadas() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.page }}>
      <SeoHead
        custom={{
          title: "Conservas Fermentadas: Despensa Viva | Autonomia Alimentar",
          description: "Manual completo de fermentação lacto: chucrute, kimchi, kombucha e picles que duram meses sem energia. Soberania alimentar real, técnica milenar.",
          canonical: "https://lordjunnior.com.br/soberania-organica/conservas-fermentadas",
        }}
      />
      <BackToHome />

      {/* HERO — imagem MASSIVA com fade na base */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Crock cerâmico com vegetais lacto-fermentados borbulhando"
            width={1920}
            height={1280}
           
            className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20,12,8,0.38)' }} />
        </div>

        <div className="relative max-w-[1500px] mx-auto px-6 md:px-16 pb-20 md:pb-32 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="font-mono text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: C.copperSoft }}
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
            A bactéria certa<br />
            <em style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700, color: C.copperSoft, textShadow: '0 0 40px hsl(20 60% 46% / 0.6), 0 4px 24px rgba(0,0,0,0.8)' }}>
              te livra do remédio
            </em>{' '}da próxima década.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.4 }}
            className="text-lg md:text-2xl max-w-3xl leading-relaxed"
            style={{ color: '#e8dcc6', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            Toda doença crônica moderna passa pelo intestino arrasado por ultraprocessado
            e antibiótico. Fermentado vivo é o oposto: microbioma reconstruído, imunidade
            restaurada, comida que cura sem rótulo, sem indústria, sem prescrição.
            Soberania alimentar e biológica no mesmo pote de vidro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: C.copperSoft }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Role para começar</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* PROVOCAÇÃO INICIAL */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.clay}>
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div {...fade()} className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.copper }}>
                Manifesto · Microbioma é soberania
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
                Probiótico de farmácia{' '}
                <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.copper }}>
                  custa caro porque é remédio.
                </em>
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                A indústria farmacêutica vende cápsula de Lactobacillus a cento e cinquenta
                reais o frasco. A indústria alimentícia destrói a flora intestinal com
                emulsificante, conservante e açúcar refinado, garantindo que você precise
                comprar a cápsula. As duas primas trabalham juntas, e o consumidor paga
                duas vezes pelo mesmo problema.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed mb-6" style={{ color: C.body }}>
                Um pote de chucrute fermentado em casa contém mais cepas vivas, em
                concentração maior, do que qualquer suplemento de prateleira. Custa o preço
                de um repolho. Restaura microbioma, blinda imunidade, regula humor e
                inflamação sistêmica. É comida e medicina no mesmo gesto.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: C.ink }}>
                Fermentar em casa é tirar o intestino da custódia da indústria.
              </p>
            </div>
            <div className="md:col-span-5">
              <motion.div {...fade(0.15)} className="relative">
                <img
                  src={imgChucrute}
                  alt="Pote de vidro com chucrute roxo fermentando"
                  width={1920} height={1280}
                  loading="lazy"
                  className="w-full h-auto rounded-sm"
                  style={{ boxShadow: '0 40px 80px -20px hsl(20 28% 14% / 0.5)' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PILARES — imagens FULL-BLEED gigantes com fade vertical */}
      {pilares.map((p, i) => {
        const bgs = [sectionBg.copper, sectionBg.moss, sectionBg.brineWash, sectionBg.clay, sectionBg.moss, sectionBg.brineWash];
        const isDark = i === 1 || i === 4;
        const sectionBgStyle = bgs[i];
        const reverse = i % 2 === 1;
        const textColor = isDark ? '#f0e6d4' : C.ink;
        const bodyColor = isDark ? '#d8cdb6' : C.body;
        const accentColor = isDark ? C.copperSoft : C.copper;
        const labelColor = isDark ? C.copperSoft : C.copper;

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
                    style={{ boxShadow: isDark ? '0 40px 80px -20px rgba(0,0,0,0.7)' : '0 40px 80px -20px hsl(20 28% 14% / 0.45)' }}
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
                      textShadow: isDark ? '0 0 24px hsl(20 60% 46% / 0.4)' : 'none',
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
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.copper}>
        <div className="max-w-[1500px] mx-auto relative">
          <motion.div {...fade()} className="text-center max-w-4xl mx-auto mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.copper }}>
              <AlertTriangle className="inline w-4 h-4 mr-2 -mt-1" />
              Erros que destroem o pote inteiro
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
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.copper }}>
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
                  backgroundColor: 'hsl(34 32% 96% / 0.92)',
                  border: '1px solid hsl(30 14% 72% / 0.6)',
                  boxShadow: '0 20px 50px -20px hsl(20 28% 14% / 0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="font-mono text-sm font-bold" style={{ color: C.copper }}>0{i + 1}</span>
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
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.moss}>
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fade()} className="text-center mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.copperSoft }}>
              <Beaker className="inline w-4 h-4 mr-2 -mt-1" />
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
              O que toda família{' '}
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.copperSoft, textShadow: '0 0 32px hsl(20 60% 46% / 0.6)' }}>
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
                  border: '1px solid hsl(20 60% 46% / 0.2)',
                  backgroundColor: 'hsl(110 18% 20% / 0.7)',
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
                      color: C.copperSoft,
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
      <section className="relative py-32 md:py-44 px-6 md:px-16 overflow-hidden" style={sectionBg.brineWash}>
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div {...fade()} className="grid md:grid-cols-12 gap-12 items-center mb-20">
            <div className="md:col-span-6">
              <img
                src={imgMesa}
                alt="Mesa familiar com fermentados compartilhados entre gerações"
                width={1920} height={1280}
                loading="lazy"
                className="w-full h-auto rounded-sm"
                style={{ boxShadow: '0 40px 80px -20px hsl(20 28% 14% / 0.45)' }}
              />
            </div>
            <div className="md:col-span-6"></div>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div {...fade()}>
            <ShieldCheck className="w-12 h-12 mx-auto mb-10" style={{ color: C.copper }} />
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.copper }}>
              O ato cotidiano de soberania
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
              Comprar comida é fácil.<br />
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.copper }}>
                Garantir que ela atravesse a próxima crise
              </em>
              <br />é o que separa quem paga do que fabrica.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: C.body }}>
              Comece com um pote de chucrute neste fim de semana. Em duas semanas você prova
              o resultado. Em três meses sua despensa muda de natureza. Em um ano sua família
              come diferente, com saúde diferente, com segurança diferente.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
