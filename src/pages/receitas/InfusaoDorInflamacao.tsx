import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Clock, Users, BookOpen,
  Leaf, Mountain, AlertTriangle, CheckCircle2,
  ScrollText, ExternalLink, Compass, Sprout, FlaskConical, Flame,
} from 'lucide-react';
import BackNav from '@/components/BackNav';
import ScrollToTop from '@/components/ScrollToTop';

import imgHero from '@/assets/receitas/hero-dor-inflamacao-light.jpg';
import imgGengibre from '@/assets/receitas/ativo-gengibre-rizoma.jpg';
import imgCurcuma from '@/assets/receitas/ativo-curcuma-rizoma.jpg';
import imgCravo from '@/assets/receitas/ativo-cravo-india.jpg';

/**
 * /soberania-organica/cozinha-funcional/infusao-dor-inflamacao
 * Receita ancestral indígena, popular e quilombola para dor e inflamação.
 * Gengibre + Cúrcuma + Cravo. Sem álcool. Padrão Light Editorial.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const C = {
  cream: '#faf6f0',
  sand: '#f1e9dd',
  sandDeep: '#e8dcc8',
  sage: '#3d4a36',
  sageDark: '#2a3324',
  terracotta: '#c4632a',
  terraSoft: '#e09a6a',
  ink: '#1c2418',
  inkSoft: '#3d4a36',
  borderLight: '#dccfb6',
};

const display = { fontFamily: "'Inter Tight', sans-serif", fontWeight: 900 as const, letterSpacing: '-0.04em', lineHeight: 0.95 };
const editorial = { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' as const, fontWeight: 400 as const };
const monoStyle = { fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.3em', textTransform: 'uppercase' as const };

const INGREDIENTES = [
  { qtd: '3 a 4 cm', nome: 'Gengibre fresco ralado', detalhe: 'Zingiber officinale, cerca de 8 a 10 g de raiz fresca. Quanto mais fibrosa e perfumada, mais gingerol disponível.' },
  { qtd: '1 colher de chá', nome: 'Cúrcuma em pó orgânica', detalhe: 'Curcuma longa, cerca de 2 a 3 g. Substituível por 1 cm de raiz fresca ralada (cor laranja intensa).' },
  { qtd: '5 a 6 unidades', nome: 'Cravos da índia inteiros', detalhe: 'Syzygium aromaticum, sempre o botão seco inteiro. Evite cravo em pó (oxida rápido) e óleo essencial puro por via oral sem orientação.' },
  { qtd: '1 pitada', nome: 'Pimenta do reino moída na hora', detalhe: 'Piper nigrum. A piperina aumenta em até 20 vezes a biodisponibilidade da curcumina, conforme estudo clássico de Shoba (1998). Tradição quilombola adaptada à evidência.' },
  { qtd: '500 ml', nome: 'Água filtrada', detalhe: 'Sem cloro, sem alumínio. Use panela esmaltada, inox ou de barro para não reagir com a cúrcuma.' },
  { qtd: 'suco de ½ limão', nome: 'Limão fresco', detalhe: 'Adicionado depois de morno. Vitamina C aumenta absorção da curcumina e potencializa o efeito antioxidante.' },
  { qtd: 'opcional', nome: 'Mel cru ou rapadura', detalhe: '1 colher de chá, apenas para suavizar. Evite açúcar refinado, que alimenta inflamação sistêmica.' },
];

const PREPARO = [
  { n: '01', titulo: 'Decocção do gengibre e do cravo', desc: 'Em panela esmaltada, inox ou de barro, ferva 500 ml de água filtrada com o gengibre ralado e os 5 a 6 cravos por 8 a 10 minutos em fogo baixo. Esse cozimento lento libera gingeróis, shogaóis e eugenol, princípios ativos analgésicos e anti-inflamatórios estáveis ao calor.' },
  { n: '02', titulo: 'Infusão abafada da cúrcuma', desc: 'Apague o fogo. Acrescente 1 colher de chá rasa de cúrcuma em pó e 1 pitada de pimenta do reino moída na hora. Tampe e deixe em infusão abafada por 10 a 12 minutos. A pimenta do reino, segundo Shoba e colaboradores (1998), aumenta em 20 vezes a absorção da curcumina.' },
  { n: '03', titulo: 'Coe e acrescente o limão', desc: 'Coe em coador fino ou pano de algodão limpo. Espere amornar (abaixo de 60 °C) e acrescente o suco de meio limão. Acima dessa temperatura, parte da vitamina C é destruída. Mexa bem.' },
  { n: '04', titulo: 'Adoce com critério, ou nada', desc: 'Se quiser, dissolva 1 colher de chá de mel cru ou rapadura ralada. O mel cru preserva enzimas e potencializa o efeito anti-inflamatório. Açúcar refinado está vetado, é pró-inflamatório e anula parte do protocolo.' },
  { n: '05', titulo: 'Envase em vidro escuro', desc: 'Transfira para garrafa de vidro âmbar ou escuro esterilizada. A curcumina é fotossensível, luz forte degrada o ativo. Mantenha sempre na geladeira.' },
  { n: '06', titulo: 'Validade curta, lote pequeno', desc: 'Por ser sem álcool, dura de 2 a 3 dias na geladeira. Faça em lote pequeno, mais vezes. Se notar mudança de cor (de âmbar dourado para marrom escuro), cheiro azedo ou sabor estranho, descarte.' },
];

const VARIACOES = [
  {
    icon: FlaskConical, cor: 'terra',
    titulo: 'Versão A · Chá quente diário', sub: 'Dor leve a moderada · uso de 7 a 21 dias',
    pontos: [
      'A receita base, exatamente como descrita acima',
      'Dose adulta: 250 ml (1 xícara) 2x ao dia, manhã e fim de tarde',
      'Tomar morno ou quente, após refeição leve',
      'Cor âmbar dourado intenso, sabor picante e aromático',
      'Forma mais estudada em meta-análises de osteoartrite e dor menstrual',
    ],
  },
  {
    icon: Sprout, cor: 'sage',
    titulo: 'Versão B · Xarope concentrado', sub: 'Para guardar e levar na bolsa',
    pontos: [
      'Reduzir 500 ml de chá já coado em fogo baixo até 150 ml',
      'Acrescentar 2 colheres de sopa de mel cru fora do fogo, mexer bem',
      'Validade: 10 a 15 dias em vidro âmbar fechado na geladeira',
      'Dose: 1 colher de sopa diluída em meio copo de água, 2 a 3x ao dia',
      'Prático para quem trabalha fora ou viaja muito',
    ],
  },
  {
    icon: Flame, cor: 'terra',
    titulo: 'Versão C · Pasta tópica quilombola', sub: 'Dor localizada · joelho, lombar, ombro',
    pontos: [
      '1 colher de chá de cúrcuma em pó + 1 colher de chá de gengibre ralado',
      'Acrescentar 2 cravos macerados ou 3 gotas de óleo essencial de cravo',
      'Misturar com água quente até formar pasta espessa',
      'Aplicar morna na região dolorida, cobrir com pano de algodão limpo',
      'Deixar agir por 15 a 20 minutos, 2x ao dia. Atenção: cúrcuma mancha pele e tecido temporariamente',
    ],
  },
];

const ATIVOS = [
  {
    n: '01', img: imgGengibre, nome: 'Gengibre', fonte: 'Zingiber officinale · 8 a 10 g de raiz fresca',
    icon: Sprout,
    alt: 'Rizomas frescos de gengibre com casca bege rugosa e um pedaço cortado mostrando interior amarelo claro fibroso sobre toalha de linho cor creme em luz natural suave',
    tradicao: 'Adotado rapidamente por indígenas amazônicos e quilombolas após a chegada via colonização. Conhecido como "raiz quente" para dor no corpo, reumatismo, dor de cabeça e "frio nas juntas". Quilombolas do Nordeste e povos da Amazônia o associam à circulação e à expulsão de "umidade ruim". Também é base da medicina ayurvédica há mais de 5 mil anos.',
    sus: 'Listado na RENISUS (Relação Nacional de Plantas Medicinais de Interesse ao SUS) e em monografias da Anvisa para náuseas, dispepsia e dor.',
    mecanismo: 'Gingeróis e shogaóis inibem COX-2 e 5-LOX, exatamente o mesmo caminho enzimático bloqueado pelos AINEs (dipirona, nimesulida, ibuprofeno). Reduzem TNF-α, IL-6 e prostaglandinas inflamatórias. Meta-análises confirmam efeito comparável ao ibuprofeno em osteoartrite de joelho e dor menstrual primária, com perfil de segurança gastrointestinal muito superior.',
    estudoAncora: 'Bartels, E. M. et al. (2015), Osteoarthritis and Cartilage',
    achado: 'Meta-análise de 5 ensaios clínicos randomizados (n = 593) confirmou que a suplementação com gengibre reduz dor e incapacidade em pacientes com osteoartrite, com efeito estatisticamente significativo (SMD = -0,30; IC 95% -0,50 a -0,09) e boa tolerância.',
  },
  {
    n: '02', img: imgCurcuma, nome: 'Cúrcuma', fonte: 'Curcuma longa · 2 a 3 g em pó',
    icon: Leaf,
    alt: 'Rizomas de cúrcuma com casca alaranjada e um pedaço cortado mostrando interior laranja vivo intenso ao lado de tigela de madeira com pó dourado da raiz sobre toalha de linho cor creme',
    tradicao: 'Conhecida no Brasil como "açafrão da terra" ou "raiz amarela". Na medicina popular e quilombola é o "ouro da terra" para inflamação, feridas e dores crônicas. O uso segue a doutrina dos sinais indígena: a cor amarelo-ouro intensa indica ação para "limpar fígado e sangue". Tradição milenar na Índia, adotada por benzedeiras e parteiras brasileiras.',
    sus: 'Listada na RENISUS. Curcuma longa consta em fitoterápicos com registro pela Anvisa para apoio anti-inflamatório e dispepsia.',
    mecanismo: 'A curcumina é uma potente inibidora de NF-κB, COX-2, 5-LOX e citocinas pró-inflamatórias (TNF-α, IL-1β, IL-6). Modula vias inflamatórias crônicas envolvidas em artrite, doença inflamatória intestinal e dor crônica. Meta-análises 2022-2024 confirmam eficácia comparável a alguns AINEs em osteoartrite, com redução significativa de marcadores inflamatórios e perfil gastrointestinal seguro.',
    estudoAncora: 'Daily, J. W.; Yang, M.; Park, S. (2016), Journal of Medicinal Food',
    achado: 'Meta-análise de 8 ensaios clínicos randomizados (n = 606) demonstrou que extratos de cúrcuma (≈1.000 mg/dia de curcumina) reduzem sintomas de artrite com eficácia similar aos AINEs convencionais, sem os efeitos colaterais gástricos típicos da classe.',
  },
  {
    n: '03', img: imgCravo, nome: 'Cravo da índia', fonte: 'Syzygium aromaticum · 5 a 6 botões secos',
    icon: Mountain,
    alt: 'Botões secos de cravo da índia em formato de prego com cabeça arredondada e haste fina de cor castanho avermelhado escuro empilhados sobre toalha de linho cor creme em luz natural suave',
    tradicao: 'Usado por benzedeiras, parteiras e curandeiros tradicionais como analgésico local e anti-inflamatório. Mascar 1 cravo é receita popular brasileira para dor de dente desde o século XVIII. Combinado com gengibre e cúrcuma, é clássico em xaropes e unguentos quilombolas para "dor de origem quente", o nome popular para inflamação.',
    sus: 'Reconhecido pela Anvisa em monografias oficiais. Eugenol (ativo principal) é estudado em odontologia e dor inflamatória crônica.',
    mecanismo: 'Eugenol, principal ativo (compõe 70 a 90% do óleo essencial), atua como inibidor de COX-2 e bloqueador de canais de sódio em fibras nervosas, mecanismo similar a anestésicos locais. Ação analgésica direta e potencialização da ação anti-inflamatória do gengibre e da cúrcuma. Atividade antioxidante e antimicrobiana documentada.',
    estudoAncora: 'Kamatou, G. P. P. et al. (2012), Molecules',
    achado: 'Revisão sistemática mostra que o eugenol do cravo apresenta atividade analgésica, anti-inflamatória, antimicrobiana e antioxidante consistente em modelos pré-clínicos e clínicos, com mecanismos confirmados de inibição de COX-2 e modulação de canais iônicos em fibras nociceptivas.',
  },
];

const FONTES = [
  { autor: 'Ministério da Saúde', ano: '2006', titulo: 'Política Nacional de Plantas Medicinais e Fitoterápicos (Decreto nº 5.813)', revista: 'Brasil', tipo: 'Marco regulatório oficial', link: 'https://bvsms.saude.gov.br/bvs/publicacoes/politica_nacional_fitoterapicos.pdf' },
  { autor: 'Ministério da Saúde', ano: '2009', titulo: 'RENISUS, Relação Nacional de Plantas Medicinais de Interesse ao SUS', revista: 'Brasil', tipo: 'Lista oficial de 71 plantas', link: 'https://www.gov.br/saude/pt-br/composicao/sectics/daf/pnpmf/plantas-medicinais-e-fitoterapicos-no-sus' },
  { autor: 'Bartels, E. M. et al.', ano: '2015', titulo: 'Efficacy and safety of ginger in osteoarthritis patients: a meta-analysis of randomized placebo-controlled trials', revista: 'Osteoarthritis and Cartilage', tipo: 'Meta-análise (gengibre)', link: 'https://pubmed.ncbi.nlm.nih.gov/25300574/' },
  { autor: 'Daily, J. W.; Yang, M.; Park, S.', ano: '2016', titulo: 'Efficacy of turmeric extracts and curcumin for alleviating the symptoms of joint arthritis: a systematic review and meta-analysis of randomized clinical trials', revista: 'Journal of Medicinal Food', tipo: 'Meta-análise (cúrcuma)', link: 'https://pubmed.ncbi.nlm.nih.gov/27533649/' },
  { autor: 'Shoba, G. et al.', ano: '1998', titulo: 'Influence of piperine on the pharmacokinetics of curcumin in animals and human volunteers', revista: 'Planta Medica', tipo: 'Estudo clínico (piperina + curcumina)', link: 'https://pubmed.ncbi.nlm.nih.gov/9619120/' },
  { autor: 'Kamatou, G. P. P.; Vermaak, I.; Viljoen, A. M.', ano: '2012', titulo: 'Eugenol, from the remote Maluku Islands to the international market place: a review of a remarkable and versatile molecule', revista: 'Molecules', tipo: 'Revisão sistemática (cravo)', link: 'https://pubmed.ncbi.nlm.nih.gov/22634840/' },
  { autor: 'Hewlings, S. J.; Kalman, D. S.', ano: '2017', titulo: 'Curcumin: a review of its effects on human health', revista: 'Foods', tipo: 'Revisão clínica (curcumina)', link: 'https://pubmed.ncbi.nlm.nih.gov/29065496/' },
  { autor: 'Anh, N. H. et al.', ano: '2020', titulo: 'Ginger on human health: a comprehensive systematic review of 109 randomized controlled trials', revista: 'Nutrients', tipo: 'Revisão sistemática (gengibre)', link: 'https://pubmed.ncbi.nlm.nih.gov/32183201/' },
];

const FAQ = [
  { q: 'Esse chá substitui dipirona, nimesulida ou ibuprofeno?',
    a: 'Não substitui em crise aguda intensa, dor pós-cirúrgica, fratura, cólica renal ou enxaqueca incapacitante. É apoio anti-inflamatório natural com forte evidência clínica para dor muscular, dor articular crônica leve a moderada (osteoartrite de joelho, lombalgia mecânica), dor menstrual e inflamação de baixo grau. Para dor crônica, o efeito aparece de forma cumulativa entre 7 e 21 dias. Quem já usa AINE ou anticoagulante NUNCA deve suspender por conta própria, deve conversar com médico antes.' },
  { q: 'Em quanto tempo começa a fazer efeito?',
    a: 'Para dor aguda leve (cólica menstrual, dor muscular pós-treino, dor de cabeça tensional), o efeito começa em 30 a 90 minutos após tomar uma xícara quente. Para dor crônica (artrite, artrose, lombalgia recorrente), os benefícios cumulativos aparecem entre 7 e 21 dias de uso contínuo. O efeito é mais robusto quando combinado com alimentação anti-inflamatória, sono adequado e movimento diário leve.' },
  { q: 'Quem NÃO pode tomar?',
    a: 'Contraindicações absolutas: gestantes (cúrcuma e cravo em doses altas têm efeito uterotônico), pessoas com cálculo de vesícula ativa (cúrcuma estimula contração vesicular), úlcera gástrica ativa, alergia conhecida a qualquer ingrediente, pré-operatório (suspender 14 dias antes pelo risco de sangramento). Atenção redobrada: quem usa anticoagulante (varfarina, AAS, rivaroxabana), antidiabético oral, anti-hipertensivo, ou está em quimioterapia. Crianças menores de 6 anos: não recomendado sem pediatra fitoterapeuta.' },
  { q: 'Qual a dose certa por idade?',
    a: 'Adultos 18-65 anos: receita base completa, 500 ml/dia divididos em 2 doses. Idosos acima de 65 anos: reduza para 5 a 6 g de gengibre, 1 a 2 g de cúrcuma e 3 a 4 cravos por 500 ml, com 300 a 400 ml/dia (maior risco de irritação gástrica). Adolescentes 12-17 anos: metade da dose adulta, 250 ml/dia. Crianças 6-11 anos: 1/4 da dose adulta (2 a 3 g de gengibre, 0,5 g de cúrcuma, 2 cravos), 150 a 200 ml/dia, sempre com aval pediátrico. Não exceda 5 g totais de gengibre por dia em nenhuma faixa.' },
  { q: 'Por quanto tempo posso tomar sem parar?',
    a: 'Para dor aguda: 7 a 10 dias contínuos. Para dor crônica: 4 a 8 semanas, depois pausa de 7 dias e reavaliação. O objetivo é apoiar a recuperação e ganhar capacidade funcional, não criar uso indefinido sem reavaliar causas (sobrepeso, sedentarismo, alimentação pró-inflamatória, distúrbios autoimunes). Dor crônica que não cede em 8 semanas exige investigação médica.' },
  { q: 'Por que adicionar pimenta do reino?',
    a: 'O estudo clássico de Shoba e colaboradores (1998), publicado em Planta Medica, mostrou que a piperina (princípio ativo da pimenta do reino) aumenta em até 20 vezes a biodisponibilidade da curcumina em humanos. Sem piperina, a curcumina é mal absorvida pelo intestino e parte é excretada antes de fazer efeito. É uma adaptação simples e poderosa da tradição quilombola à evidência científica: 1 pitada já basta.' },
  { q: 'A cúrcuma mancha tudo. É normal?',
    a: 'Sim, é completamente normal. A cor amarelo-ouro intensa é da curcumina, exatamente o ativo que queremos. Mancha temporariamente bancadas, panelas plásticas, dentes e pele. Solução: use panela esmaltada, inox ou de barro (nunca alumínio); colher de pau ou inox; lave a louça imediatamente após o preparo. As manchas no dente saem com escovação normal. Vale a pena.' },
  { q: 'Posso adoçar com açúcar?',
    a: 'Não. Açúcar refinado é pró-inflamatório, eleva insulina, gera estresse oxidativo e anula parte do que o protocolo está tentando consertar. Se precisar adoçar, use 1 colher de chá de mel cru (preserva enzimas e tem ação anti-inflamatória própria) ou rapadura ralada. Stevia natural também serve. Evite adoçante artificial em uso crônico.' },
];

const TRILHA = [
  { to: '/soberania-organica/cozinha-funcional', titulo: 'Hub Cozinha Funcional', desc: 'Volte para a coleção completa de receitas ancestrais brasileiras validadas pelo SUS.', label: 'Ver coleção' },
  { to: '/soberania-organica/cozinha-funcional/cha-pressao-hibisco', titulo: 'Chá ancestral para pressão', desc: 'Hibisco, alho e limão. Apoio natural à hipertensão leve-moderada com mecanismo similar aos inibidores da ECA.', label: 'Ler receita' },
  { to: '/soberania-organica/saude-preventiva', titulo: 'Saúde Preventiva', desc: 'Os pilares fisiológicos por trás da inflamação crônica: alimentação, sono, movimento e microbiota.', label: 'Estudar fisiologia' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[92vh] min-h-[680px] w-full overflow-hidden" style={{ backgroundColor: C.sage }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={imgHero}
          alt="Caneca de vidro com chá quente e fumegante de gengibre cúrcuma e cravo de cor âmbar dourado ao lado de raiz de gengibre fresca tigela de cúrcuma em pó cravos espalhados meio limão e pote de mel cru sobre toalha de linho cor creme em luz natural"
          fetchPriority="high" className="w-full h-full object-cover scale-110"
          style={{ filter: 'saturate(1.05) contrast(1.02)' }} loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, rgba(28,38,24,0.35) 0%, rgba(28,38,24,0.45) 45%, rgba(28,38,24,0.78) 78%, rgba(20,28,18,0.92) 100%)`,
        }} />
        <div className="absolute inset-x-0 bottom-0 h-2 pointer-events-none" style={{ background: C.cream }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28" style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: APPLE_EASE }} className="mb-6">
          <Link to="/soberania-organica/cozinha-funcional" className="text-xs font-bold transition-opacity hover:opacity-80"
            style={{ ...monoStyle, color: 'rgba(250,246,240,0.9)' }}>
            Soberania Orgânica › Cozinha Funcional
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(250,246,240,0.18)', border: '1px solid rgba(250,246,240,0.28)' }}>
          <Flame size={14} style={{ color: C.cream }} />
          <span className="text-[11px] md:text-xs font-bold" style={{ ...monoStyle, color: C.cream }}>
            Tradição quilombola e indígena · Validada pelo SUS · RENISUS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8vw,7rem)] max-w-[18ch]"
          style={{ ...display, color: C.cream, textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
          A infusão ancestral que apaga a{' '}
          <span style={{ ...editorial, color: C.terraSoft, textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}>
            dor sem viciar.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(250,246,240,0.95)', fontFamily: "'Inter Tight', sans-serif", textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}>
          Gengibre, cúrcuma e cravo. Mesmo caminho enzimático da dipirona e da nimesulida (COX-2 e 5-LOX), sem dependência e sem destruir o estômago. Tradição quilombola, indígena e popular brasileira com meta-análises do PubMed do lado.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: APPLE_EASE }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.9)' }}>
            <Clock size={14} style={{ color: C.terraSoft }} /> 25 min de preparo
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.9)' }}>
            <Users size={14} style={{ color: C.terraSoft }} /> 500 ml · 2 a 3 dias
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.9)' }}>
            <BookOpen size={14} style={{ color: C.terraSoft }} /> RENISUS · 8 referências
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function InfusaoDorInflamacao() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Chá de Gengibre, Cúrcuma e Cravo para Dor e Inflamação (sem álcool) | Lord Junnior</title>
        <meta name="description" content="Receita ancestral indígena, popular e quilombola para dor e inflamação: gengibre, cúrcuma e cravo. Mesmo mecanismo de COX-2 da dipirona e nimesulida, sem dependência, com meta-análises do PubMed." />
        <link rel="canonical" href="https://www.lordjunnior.com.br/soberania-organica/cozinha-funcional/infusao-dor-inflamacao" />
        <meta property="og:title" content="A infusão ancestral que apaga a dor sem viciar" />
        <meta property="og:description" content="Gengibre, cúrcuma e cravo. Tradição quilombola e indígena com PubMed do lado. Sem álcool, sem AINE, sem dependência." />
        <meta property="og:image" content="https://www.lordjunnior.com.br/og/infusao-dor-inflamacao.jpg" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <html lang="pt-BR" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: 'Infusão Ancestral de Gengibre, Cúrcuma e Cravo para Dor e Inflamação',
            author: { '@type': 'Person', name: 'Lord Junnior' },
            description: 'Receita ancestral brasileira sem álcool, com gengibre, cúrcuma e cravo, para apoio natural à dor e à inflamação. Tradição indígena e quilombola validada pela RENISUS e por meta-análises clínicas.',
            recipeYield: '500 ml · 2 a 3 dias',
            prepTime: 'PT5M', cookTime: 'PT20M', totalTime: 'PT25M',
            recipeCategory: 'Fitoterápico ancestral analgésico e anti-inflamatório',
            recipeCuisine: 'Indígena, quilombola e popular brasileira',
            keywords: 'gengibre, cúrcuma, cravo, dor, inflamação, artrite, RENISUS, Farmácia Viva, fitoterapia brasileira, sem álcool',
            recipeIngredient: INGREDIENTES.map((i) => `${i.qtd} ${i.nome}`),
            recipeInstructions: PREPARO.map((p) => ({ '@type': 'HowToStep', name: p.titulo, text: p.desc })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question', name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })}
        </script>
      </Helmet>

      <div className="relative min-h-screen" style={{ backgroundColor: C.cream, color: C.ink, fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackNav backTo="/soberania-organica/cozinha-funcional" backLabel="Cozinha Funcional" />
        </div>
        <ScrollToTop />

        <Hero />

        {/* CAPÍTULO 1, Manifesto */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: C.terracotta }} />
                <p className="text-sm font-semibold" style={{ ...monoStyle, color: C.inkSoft }}>De onde vem essa receita</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight mb-10" style={{ ...display, color: C.sage }}>
                Antes da dipirona,{' '}
                <span style={{ ...editorial, color: C.terracotta }}>existia a raiz quente.</span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                <p>
                  Dor é o sintoma número um do brasileiro. Dor de cabeça, dor muscular, dor articular, cólica menstrual, lombalgia. A indústria farmacêutica vende bilhões em <strong style={{ color: C.terracotta }}>dipirona, nimesulida, ibuprofeno e diclofenaco</strong> todo ano, e o uso crônico desses anti-inflamatórios destrói o estômago, sobrecarrega rins, eleva pressão e está associado a infarto e AVC em uso prolongado.
                </p>
                <p>
                  Antes desse mercado existir, indígenas amazônicos e quilombolas do Nordeste já preparavam decocções de "raiz quente" (gengibre) e "raiz amarela" (cúrcuma) para "dor no corpo", artrite, dor de cabeça e "frio nas juntas". Não por superstição, porque <strong style={{ color: C.sage }}>funciona</strong>. Gengibre inibe a mesma enzima COX-2 atacada pelos AINEs. Cúrcuma bloqueia o NF-κB, o interruptor mestre da inflamação crônica. Cravo age como anestésico local via canais de sódio, mecanismo similar à lidocaína.
                </p>
                <p>
                  O <strong style={{ color: C.sage }}>Ministério da Saúde</strong>, em 2006, formalizou o que já era saber popular na Política Nacional de Plantas Medicinais e Fitoterápicos. <strong style={{ color: C.terracotta }}>Zingiber officinale</strong> e <strong style={{ color: C.terracotta }}>Curcuma longa</strong> entraram na <strong style={{ color: C.sage }}>RENISUS</strong>, lista oficial das 71 plantas reconhecidas pelo SUS. As mais de 600 Farmácias Vivas espalhadas pela rede pública dispensam essas plantas hoje. Meta-análises de 2015 a 2024, indexadas no PubMed, confirmam eficácia comparável a AINEs em osteoartrite, com perfil gastrointestinal seguro.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: `3px solid ${C.terracotta}`, color: C.sage, ...editorial }}>
                  Não é "chá quente para dor". É um protocolo etnofarmacológico anti-inflamatório, com PubMed do lado e RENISUS no rodapé. Tradição com nome científico.
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2, RECEITA */}
        <section id="receita" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 md:mb-20">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 02 · A receita</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                Como{' '}
                <span style={{ ...editorial, color: C.terracotta }}>fazer.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <motion.div {...fade(0)} className="lg:col-span-5">
                <div className="sticky top-8 rounded-3xl p-8 md:p-10" style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                  <h3 className="text-2xl mb-2" style={{ ...editorial, color: C.terracotta }}>
                    Ingredientes
                  </h3>
                  <p className="text-sm mb-8" style={{ color: C.inkSoft }}>500 ml · uso de 2 a 3 dias</p>
                  <ul className="space-y-6">
                    {INGREDIENTES.map((ing, i) => (
                      <li key={i} className="flex gap-5 pb-6" style={{ borderBottom: i < INGREDIENTES.length - 1 ? `1px solid ${C.borderLight}` : 'none' }}>
                        <span className="font-bold text-sm whitespace-nowrap min-w-[80px]" style={{ ...monoStyle, color: C.terracotta }}>
                          {ing.qtd}
                        </span>
                        <div>
                          <p className="font-semibold mb-1" style={{ color: C.sage }}>{ing.nome}</p>
                          <p className="text-sm leading-relaxed font-light" style={{ color: C.inkSoft }}>{ing.detalhe}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div {...fade(0.1)} className="lg:col-span-7">
                <h3 className="text-2xl mb-2" style={{ ...editorial, color: C.terracotta }}>
                  Modo de preparo
                </h3>
                <p className="text-sm mb-10" style={{ color: C.inkSoft }}>25 minutos do início ao fim</p>

                <ol className="space-y-8">
                  {PREPARO.map((p) => (
                    <li key={p.n} className="flex gap-6">
                      <span className="text-5xl md:text-6xl font-black tabular-nums shrink-0" style={{ ...display, color: C.terraSoft }}>
                        {p.n}
                      </span>
                      <div className="pt-2">
                        <h4 className="text-xl mb-2 font-semibold" style={{ color: C.sage }}>{p.titulo}</h4>
                        <p className="leading-relaxed font-light" style={{ color: C.inkSoft }}>{p.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3, TRÊS VERSÕES */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 03 · Três versões</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                Chá, xarope{' '}
                <span style={{ ...editorial, color: C.terracotta }}>ou pasta tópica.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: C.inkSoft }}>
                Três formas seguras, todas sem álcool, da mesma fórmula. O chá é a versão mais estudada cientificamente. O xarope concentrado serve para guardar e levar. A pasta tópica é a sabedoria quilombola para dor localizada de joelho, lombar e ombro.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {VARIACOES.map((v, i) => {
                const isTerra = v.cor === 'terra';
                const accent = isTerra ? C.terracotta : C.sage;
                return (
                  <motion.div key={i} {...fade(i * 0.1)} className="p-8 md:p-10 rounded-3xl"
                    style={{ backgroundColor: isTerra ? '#fff8ef' : C.sand, border: `1px solid ${C.borderLight}` }}>
                    <v.icon size={32} style={{ color: accent }} className="mb-6" />
                    <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: accent }}>{v.sub}</p>
                    <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>{v.titulo}</h3>
                    <ul className="space-y-4 text-base md:text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                      {v.pontos.map((p, j) => (
                        <li key={j} className="flex gap-3"><span style={{ color: accent }}>·</span> {p}</li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4, DOSSIÊ DAS PLANTAS */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sage, color: C.cream }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terraSoft }}>Capítulo 04 · As três plantas</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={display}>
                Tradição,{' '}
                <span style={{ ...editorial, color: C.terraSoft }}>nome científico, RENISUS.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(250,246,240,0.78)' }}>
                Cada planta tem três camadas de validação: o uso ancestral indígena, popular e quilombola; a chancela oficial do SUS; e a evidência etnofarmacológica publicada em meta-análises do PubMed.
              </p>
            </motion.div>

            <div className="space-y-16 md:space-y-24">
              {ATIVOS.map((a, i) => {
                const reversed = i % 2 === 1;
                return (
                  <motion.article key={a.n} {...fade(0)} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className={`lg:col-span-6 ${reversed ? 'lg:order-2' : ''}`}>
                      <div className="relative h-[360px] md:h-[480px] lg:h-[560px] overflow-hidden rounded-3xl group">
                        <img src={a.img} alt={a.alt} loading="lazy" width={1280} height={1280}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                        <div className="absolute top-6 left-6 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md"
                          style={{ ...monoStyle, backgroundColor: 'rgba(250,246,240,0.85)', color: C.sage }}>
                          <a.icon size={11} className="inline mr-2" /> Planta {a.n}
                        </div>
                      </div>
                    </div>
                    <div className={`lg:col-span-6 ${reversed ? 'lg:order-1' : ''}`}>
                      <p className="text-xs font-bold mb-4" style={{ ...monoStyle, color: C.terraSoft }}>
                        {a.fonte}
                      </p>
                      <h3 className="text-4xl md:text-6xl mb-8" style={{ ...display, color: C.cream }}>
                        {a.nome}
                      </h3>

                      <div className="p-5 rounded-xl mb-6" style={{ backgroundColor: 'rgba(250,246,240,0.06)', border: '1px solid rgba(250,246,240,0.12)' }}>
                        <p className="text-[10px] font-bold mb-2" style={{ ...monoStyle, color: C.terraSoft }}>Tradição ancestral</p>
                        <p className="font-light leading-relaxed" style={{ color: 'rgba(250,246,240,0.9)' }}>{a.tradicao}</p>
                      </div>

                      <div className="p-5 rounded-xl mb-6" style={{ backgroundColor: 'rgba(224,154,106,0.1)', borderLeft: `3px solid ${C.terraSoft}` }}>
                        <p className="text-[10px] font-bold mb-2" style={{ ...monoStyle, color: C.terraSoft }}>Validação SUS</p>
                        <p className="font-light leading-relaxed" style={{ color: C.cream }}>{a.sus}</p>
                      </div>

                      <p className="text-base md:text-lg leading-relaxed mb-6 font-light" style={{ color: 'rgba(250,246,240,0.85)' }}>
                        {a.mecanismo}
                      </p>

                      <div className="p-5 rounded-xl" style={{ backgroundColor: 'rgba(250,246,240,0.06)' }}>
                        <p className="text-[10px] font-bold mb-2" style={{ ...monoStyle, color: 'rgba(250,246,240,0.6)' }}>Estudo-âncora</p>
                        <p className="font-semibold mb-2" style={{ color: C.cream }}>{a.estudoAncora}</p>
                        <p className="text-sm leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.78)' }}>{a.achado}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5, PROTOCOLO DE USO */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 05 · Como tomar</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                O{' '}
                <span style={{ ...editorial, color: C.terracotta }}>protocolo.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <motion.div {...fade(0)} className="p-8 md:p-10 rounded-3xl"
                style={{ backgroundColor: '#fff8ef', border: `1px solid ${C.borderLight}` }}>
                <CheckCircle2 size={32} style={{ color: C.terracotta }} className="mb-6" />
                <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>O que fazer</h3>
                <ul className="space-y-4 text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> 250 ml 2x ao dia: manhã e fim de tarde, após refeição leve</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Sempre com 1 pitada de pimenta do reino para potencializar a curcumina</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Compressa morna na região dolorida 2x/dia para dor localizada</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Reduzir ultraprocessados, açúcar e frituras (pró-inflamatórios)</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Ciclo de 7 a 21 dias para dor aguda; 4 a 8 semanas para crônica, depois pausa de 7 dias</li>
                </ul>
              </motion.div>

              <motion.div {...fade(0.1)} className="p-8 md:p-10 rounded-3xl"
                style={{ backgroundColor: C.sand, border: `1px solid ${C.borderLight}` }}>
                <AlertTriangle size={32} style={{ color: '#a64a1f' }} className="mb-6" />
                <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>O que não esperar</h3>
                <ul className="space-y-4 text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Alívio imediato em fratura, cólica renal ou enxaqueca incapacitante</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Substituir AINE em pós-operatório ou dor aguda intensa por conta própria</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Tomar uma vez e esperar resolver dor crônica de anos</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Funcionar combinado a alimentação ultraprocessada e sedentarismo</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Resolver doença autoimune ou estrutural sem investigação médica</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6, BIBLIOTECA DE FONTES */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 06 · Biblioteca de evidências</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                As{' '}
                <span style={{ ...editorial, color: C.terracotta }}>fontes.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: C.inkSoft }}>
                Documentos oficiais do SUS, marcos regulatórios brasileiros e meta-análises indexadas no PubMed. Sem folclore, sem chute, sem influencer.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {FONTES.map((f, i) => (
                <motion.a key={i} {...fade(i * 0.05)} href={f.link} target="_blank" rel="noopener noreferrer"
                  className="group p-7 md:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <ScrollText size={16} style={{ color: C.terracotta }} />
                      <span className="text-xs font-bold" style={{ ...monoStyle, color: C.terracotta }}>{f.ano}</span>
                    </div>
                    <ExternalLink size={14} style={{ color: C.inkSoft }} className="transition-colors group-hover:translate-x-0.5" />
                  </div>
                  <p className="font-semibold text-lg mb-3 leading-snug" style={{ color: C.sage }}>{f.titulo}</p>
                  <p className="text-sm mb-3" style={{ color: C.inkSoft }}>{f.autor}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    <span style={{ ...editorial, color: C.sage }}>{f.revista}</span>
                    <span className="font-bold" style={{ ...monoStyle, color: C.terracotta }}>{f.tipo}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Perguntas honestas</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                O que perguntam{' '}
                <span style={{ ...editorial, color: C.terracotta }}>antes de começar.</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((item, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)}
                    className="rounded-2xl overflow-hidden transition-all"
                    style={{ backgroundColor: open ? '#fff8ef' : C.sand, border: `1px solid ${open ? C.terracotta : C.borderLight}` }}>
                    <button onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-6"
                      aria-expanded={open}>
                      <span className="text-lg md:text-2xl font-semibold leading-snug pr-4" style={{ color: C.sage }}>{item.q}</span>
                      <ChevronDown size={26} className="shrink-0 mt-1 transition-transform duration-500"
                        style={{ color: C.terracotta, transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.4, ease: APPLE_EASE }} className="overflow-hidden">
                        <div className="px-6 md:px-8 pb-8 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTINUE SUA TRILHA */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <Compass size={32} style={{ color: C.terracotta }} className="mb-6" />
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Continue sua trilha</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                A dor é só a porta.{' '}
                <span style={{ ...editorial, color: C.terracotta }}>A farmácia ancestral é vasta.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {TRILHA.map((t, i) => (
                <motion.div key={t.to} {...fade(i * 0.08)}>
                  <Link to={t.to} className="group block h-full p-8 md:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                    <Mountain size={24} style={{ color: C.terracotta }} className="mb-6" />
                    <h3 className="text-2xl md:text-3xl mb-4 leading-tight" style={{ ...display, color: C.sage }}>
                      {t.titulo}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed font-light mb-8" style={{ color: C.inkSoft }}>
                      {t.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-bold transition-all group-hover:gap-4"
                      style={{ ...monoStyle, color: C.terracotta }}>
                      {t.label} <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + DISCLAIMER */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sage, color: C.cream }}>
          <motion.div {...fade(0)} className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-2xl md:text-4xl leading-[1.4] font-light mb-12"
              style={{ ...editorial, color: C.cream }}>
              Não é "chá quente para dor". É um protocolo etnofarmacológico anti-inflamatório, com PubMed do lado e RENISUS no rodapé.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/soberania-organica/cozinha-funcional"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: C.terracotta, color: C.cream }}>
                Outras receitas <ArrowRight size={18} />
              </Link>
              <Link to="/soberania-organica"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: 'transparent', color: C.cream, border: `2px solid ${C.cream}` }}>
                Ver as 7 frentes
              </Link>
            </div>
          </motion.div>

          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-start gap-5 p-8 rounded-2xl" style={{ backgroundColor: 'rgba(250,246,240,0.06)', border: '1px solid rgba(250,246,240,0.15)' }}>
              <AlertTriangle size={24} style={{ color: C.terraSoft }} className="shrink-0 mt-1" />
              <div>
                <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: C.terraSoft }}>Disclaimer · Saúde · YMYL</p>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.85)' }}>
                  Este conteúdo é educativo, baseado em saber tradicional indígena, popular e quilombola brasileiro, em documentos oficiais do SUS (Política Nacional de Plantas Medicinais e Fitoterápicos, RENISUS, Farmácias Vivas) e em literatura etnofarmacológica indexada no PubMed (meta-análises de gengibre, cúrcuma e cravo). Não substitui exame, diagnóstico, prescrição ou acompanhamento médico. Dor crônica que não cede em 8 semanas exige investigação médica. Quem usa AINE, anticoagulante, antidiabético ou anti-hipertensivo NUNCA deve suspender por conta própria. Gestantes, lactantes, crianças menores de 6 anos, pessoas com cálculo de vesícula ativa, úlcera gástrica ativa ou em pré-operatório devem buscar orientação profissional antes de iniciar.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
