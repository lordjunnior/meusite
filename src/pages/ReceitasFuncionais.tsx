import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ChevronDown, FlaskConical, BookOpen, Clock, Users,
  Leaf, ChefHat, Salad, AlertTriangle, CheckCircle2, Compass, Apple,
  Sprout, Mountain, ScrollText,
} from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';

import imgHubHero from '@/assets/receitas/hub-cozinha-ancestral-light.jpg';
import imgSobremesa from '@/assets/receitas/hero-sobremesa-light.jpg';
import imgGelatinaAntipara from '@/assets/receitas/hero-gelatina-antiparasitaria-light.jpg';
import imgGarrafada from '@/assets/receitas/hero-garrafada-ancestral-light.jpg';
import imgPressao from '@/assets/receitas/hero-pressao-hibisco-light.jpg';
import imgDor from '@/assets/receitas/hero-dor-inflamacao-light.jpg';
import imgRefluxo from '@/assets/receitas/hero-refluxo-azia-light.jpg';

/**
 * /soberania-organica/cozinha-funcional
 * 7ª frente da Soberania Orgânica.
 * Padrão editorial CLARO obrigatório (sand+sage+terracotta), referência Jurisdições Amigáveis.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

// PALETA: Cream sand + Sage profundo + Terracotta
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

const RECEITAS = [
  {
    slug: 'sobremesa-substitui-rivotril',
    titulo: 'A Sobremesa que Substitui o Rivotril',
    pretitulo: 'Sono · Cortisol · Ansiedade',
    resumo: 'Quatro ativos com ensaio clínico. Glicina (3 g), Passiflora, camomila e chia hidratada. Comer 30 a 60 minutos antes de dormir, por 7 a 14 dias.',
    img: imgSobremesa,
    tempo: '15 min de preparo',
    porcoes: '4 porções',
    estudos: '8 estudos primários',
    disponivel: true,
    alt: 'Quatro potinhos de gelatina de maracujá com camada de chia hidratada decorados com flores de camomila e folhas de melissa sobre toalha de linho cor creme',
  },
  {
    slug: 'gelatina-antiparasitaria',
    titulo: 'A Gelatina que Expulsa os Parasitas',
    pretitulo: 'Intestino · Vermífugo natural',
    resumo: 'Sementes de mamão, sementes de abóbora e chá de cravo em formato palatável. Carpaína e cucurbitacina com evidência clínica contra Ascaris e Strongyloides. Ciclo de 7 a 10 dias.',
    img: imgGelatinaAntipara,
    tempo: '20 min de preparo',
    porcoes: '8 a 10 doses',
    estudos: '7 estudos primários',
    disponivel: true,
    alt: 'Pote de vidro com gelatina translúcida cor âmbar contendo sementes de mamão e abóbora visíveis ao lado de cravos da índia espalhados e xícara de chá quente sobre toalha de linho creme',
  },
  {
    slug: 'garrafada-digestiva-ancestral',
    titulo: 'Xarope Ancestral de Boldo, Guaco e Aroeira',
    pretitulo: 'Fígado · Digestão · Tosse · Imunidade',
    resumo: 'Infusão concentrada com mel cru, sem álcool, sem dependência. Fórmula indígena e popular brasileira em duas versões seguras: uso digestivo diário e xarope para tosse. Boldo, guaco e aroeira constam na RENISUS.',
    img: imgGarrafada,
    tempo: '35 min de preparo',
    porcoes: '500 ml · 7 a 10 dias',
    estudos: 'RENISUS · 6 referências',
    disponivel: true,
    alt: 'Garrafa de vidro âmbar contendo infusão de boldo guaco e aroeira ao lado de folhas frescas e pote de mel cru sobre toalha de linho cor creme',
  },
  {
    slug: 'cha-pressao-hibisco',
    titulo: 'O Chá que Apoia a Pressão sem Tarja Preta',
    pretitulo: 'Coração · Pressão arterial · Endotélio',
    resumo: 'Hibisco, alho fresco e limão taiti. Mesmo mecanismo dos inibidores da ECA (losartana, enalapril), sem dependência. Apoio natural à hipertensão leve-moderada com evidência clínica e dispensação no SUS.',
    img: imgPressao,
    tempo: '20 min de preparo',
    porcoes: '1 litro · 4 dias',
    estudos: 'RENISUS · 7 referências',
    disponivel: true,
    alt: 'Jarra de vidro com chá vermelho rubi de hibisco fumegante ao lado de bulbos de alho descascados cálices secos de hibisco e limões taiti sobre toalha de linho cor creme',
  },
  {
    slug: 'infusao-dor-inflamacao',
    titulo: 'A Infusão Ancestral que Apaga a Dor sem Viciar',
    pretitulo: 'Dor · Inflamação · Articulações · Músculos',
    resumo: 'Gengibre, cúrcuma e cravo. Mesmo caminho enzimático da dipirona e da nimesulida (COX-2 e 5-LOX), sem destruir o estômago. Tradição quilombola e indígena com meta-análises do PubMed do lado.',
    img: imgDor,
    tempo: '25 min de preparo',
    porcoes: '500 ml · 2 a 3 dias',
    estudos: 'RENISUS · 8 referências',
    disponivel: true,
    alt: 'Caneca de vidro com chá quente fumegante de gengibre cúrcuma e cravo de cor âmbar dourado ao lado de raiz de gengibre fresca tigela de cúrcuma em pó cravos espalhados meio limão e pote de mel cru sobre toalha de linho cor creme',
  },
  {
    slug: 'suco-refluxo-espinheira-santa',
    titulo: 'O Suco Ancestral que Apaga a Queimação sem Rebote',
    pretitulo: 'Refluxo · Azia · Gastrite · Mucosa',
    resumo: 'Espinheira-santa, batata crua, camomila e babosa. Mesmo terreno do omeprazol (proteção, neutralização e cicatrização da mucosa), sem dependência e sem efeito rebote. Tradição indígena, benzedeira e popular com ensaios clínicos do CEME.',
    img: imgRefluxo,
    tempo: '25 min de preparo',
    porcoes: '800 ml · 3 a 4 dias',
    estudos: 'RENISUS · 8 referências',
    disponivel: true,
    alt: 'Composição vista de cima com batata inglesa cortada folhas de espinheira-santa flores de camomila em tigela de cerâmica e folha de babosa cortada com gel exposto sobre toalha de linho cor creme em luz natural quente',
  },
];

const PILARES = [
  { icon: Mountain, titulo: 'Raiz indígena, popular e quilombola', desc: 'Cada receita resgata o uso ancestral brasileiro: cartilhas Kaxinawá, Pataxó, garrafadas do interior, chás de quintal e fórmulas das benzedeiras. Mais de 12 mil anos de uso documentado.' },
  { icon: ScrollText, titulo: 'Validada pela ciência e pelo SUS', desc: 'Boldo, guaco, aroeira, sementes de mamão, Passiflora e camomila constam na RENISUS, lista oficial do SUS de plantas medicinais. As Farmácias Vivas (Política Nacional desde 2006) usam essas mesmas fórmulas.' },
  { icon: Sprout, titulo: 'Cada receita é um dossiê honesto', desc: 'Tradição, mecanismo, dose, contraindicação, evidência. Sem modismo, sem influencer, sem promessa de cura mágica. Natureza é poderosa, mas não substitui exame ou médico em quadro grave.' },
];

const FAQ = [
  { q: 'O que é Cozinha Funcional dentro da Soberania Orgânica?',
    a: 'É a 7ª frente. Aqui resgatamos o conhecimento ancestral da natureza brasileira (indígena, popular, quilombola) para cuidar da saúde com plantas, chás, xaropes, gelatinas e fórmulas que nossos avós e povos originários já usavam, sempre sem álcool e sem nada que crie dependência, cruzados com evidência científica e com a Política Nacional de Plantas Medicinais e Fitoterápicos do SUS (RENISUS, Farmácias Vivas, desde 2006).' },
  { q: 'É medicina alternativa, esotérica ou anticientífica?',
    a: 'Não. É etnofarmacologia: o estudo científico do que os povos tradicionais já sabiam. Boldo, guaco, aroeira, Passiflora, camomila, sementes de mamão e dezenas de outras plantas usadas aqui constam na RENISUS, a lista oficial de plantas medicinais do SUS. O Brasil tem mais de 600 Farmácias Vivas espalhadas pelo SUS dispensando essas mesmas fórmulas.' },
  { q: 'Substitui medicamento prescrito?',
    a: 'Não. Natureza é poderosa, mas não é mágica. Receitas ancestrais funcionam muito bem para apoio digestivo, sono, ansiedade leve, parasitas leves, tosse, imunidade e cicatrização. Não substituem antibiótico em infecção grave, antineoplásico em câncer, anti-hipertensivo, insulina ou qualquer prescrição médica em uso. Doenças crônicas diagnosticadas exigem médico.' },
  { q: 'De onde vêm as receitas desta coleção?',
    a: 'De três fontes cruzadas: (1) cartilhas indígenas como a Rau Xarabu dos Kaxinawá e materiais do Pataxó, Guarani e Yanomami; (2) tradição popular brasileira (garrafadas do interior, chás de quintal, benzeduras com fórmula); (3) documentos do Ministério da Saúde, RENISUS, Farmácias Vivas e estudos etnofarmacológicos publicados em revistas indexadas.' },
  { q: 'Posso seguir mesmo morando em apartamento sem horta?',
    a: 'Sim. Boa parte das ervas é comprável em mercado, feira, empório ou em Farmácia Viva pública. A horta é a 3ª frente da Soberania Orgânica e é um avanço posterior. Aqui você começa pela cozinha, com o que já está perto. Quando puder, planta uma muda de boldo, hortelã, capim-cidreira no vaso da janela.' },
  { q: 'Quem não deve seguir estas receitas?',
    a: 'Gestantes, lactantes, crianças sem orientação pediátrica, pessoas em uso contínuo de medicação (anticoagulante, anti-hipertensivo, psiquiátrico, oncológico), portadores de doença hepática ou renal e alérgicos conhecidos. Em qualquer dúvida, fale com médico, fitoterapeuta ou enfermeiro de Farmácia Viva antes de iniciar.' },
];

const TRILHA = [
  { to: '/soberania-organica', titulo: 'Soberania Orgânica', desc: 'O hub das sete frentes. Volte para o mapa completo da blindagem biológica.', label: 'Voltar ao hub' },
  { to: '/soberania-organica/saude-preventiva', titulo: 'Saúde Preventiva', desc: 'Os pilares fisiológicos que sustentam toda comida funcional: sono, glicemia, cortisol, microbiota.', label: 'Continuar' },
  { to: '/soberania-organica/horta-urbana', titulo: 'Horta Urbana', desc: 'Cultive em casa os ingredientes que aparecem em cada receita: ervas, microverdes, chás vivos.', label: 'Avançar' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: C.sage }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={imgHubHero} alt="" fetchPriority="high" className="w-full h-full object-cover scale-110" style={{ filter: 'saturate(1.05) contrast(1.02)' }} loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, rgba(28,38,24,0.35) 0%, rgba(28,38,24,0.45) 45%, rgba(28,38,24,0.78) 78%, rgba(20,28,18,0.92) 100%)`,
        }} />
        <div className="absolute inset-x-0 bottom-0 h-2 pointer-events-none" style={{ background: C.cream }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28" style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(250,246,240,0.18)', border: '1px solid rgba(250,246,240,0.28)' }}>
          <Mountain size={16} style={{ color: C.cream }} />
          <span className="text-[11px] md:text-xs font-bold" style={{ ...monoStyle, color: C.cream }}>
            Tradição ancestral · Validada pelo SUS · RENISUS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] max-w-[18ch]"
          style={{ ...display, color: C.cream, textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
          A farmácia viva do{' '}
          <span style={{ ...editorial, color: C.terraSoft, fontWeight: 400, textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}>
            Brasil ancestral.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(250,246,240,0.95)', fontFamily: "'Inter Tight', sans-serif", textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}>
          Resgate vivo do conhecimento ancestral brasileiro: cartilhas Kaxinawá e Pataxó, garrafadas do interior, chás de quintal, fórmulas de benzedeiras. Cruzado com a RENISUS, Farmácias Vivas do SUS e literatura etnofarmacológica.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function ReceitasFuncionais() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Cozinha Funcional: Receitas Ancestrais Brasileiras | Lord Junnior</title>
        <meta name="description" content="Resgate do conhecimento indígena, popular e quilombola: garrafadas, chás, gelatinas funcionais validados pela RENISUS e Farmácias Vivas do SUS. 12 mil anos de tradição." />
        <link rel="canonical" href="https://www.lordjunnior.com.br/soberania-organica/cozinha-funcional" />
        <meta property="og:title" content="Cozinha Funcional: Sabedoria Ancestral Brasileira" />
        <meta property="og:description" content="Receitas indígenas, populares e quilombolas validadas pelo SUS. Boldo, guaco, aroeira, sementes de mamão, Passiflora. Tradição com PubMed do lado." />
        <meta property="og:image" content="https://www.lordjunnior.com.br/og/cozinha-funcional.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <html lang="pt-BR" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Cozinha Funcional, Receitas ancestrais brasileiras validadas pelo SUS',
            description: 'Coleção de receitas indígenas, populares e quilombolas para cuidar da saúde sem dependência da indústria farmacêutica. Cruzada com RENISUS, Farmácias Vivas e literatura etnofarmacológica.',
            url: 'https://www.lordjunnior.com.br/soberania-organica/cozinha-funcional',
            isPartOf: { '@type': 'WebSite', name: 'Lord Junnior', url: 'https://www.lordjunnior.com.br' },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.lordjunnior.com.br' },
                { '@type': 'ListItem', position: 2, name: 'Soberania Orgânica', item: 'https://www.lordjunnior.com.br/soberania-organica' },
                { '@type': 'ListItem', position: 3, name: 'Cozinha Funcional', item: 'https://www.lordjunnior.com.br/soberania-organica/cozinha-funcional' },
              ],
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })}
        </script>
      </Helmet>

      <div className="relative min-h-screen" style={{ backgroundColor: C.cream, color: C.ink, fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
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
                <p className="text-sm font-semibold" style={{ ...monoStyle, color: C.inkSoft }}>O ponto de virada</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight mb-10" style={{ ...display, color: C.sage }}>
                Doze mil anos{' '}
                <span style={{ ...editorial, color: C.terracotta }}>de farmácia viva.</span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                <p>
                  Antes do paracetamol existir, o brasileiro já sabia que folha de boldo cuida do fígado. Antes do xarope industrial, o guaco já abria o peito. Antes do vermífugo de farmácia, semente de mamão já punha verme para fora. Esse conhecimento não é folclore: tem mais de doze mil anos de uso documentado por nossos povos originários.
                </p>
                <p>
                  Em 2006 o próprio Ministério da Saúde formalizou o que os anciãos já sabiam, na <strong style={{ color: C.sage }}>Política Nacional de Plantas Medicinais e Fitoterápicos</strong>. A <strong style={{ color: C.terracotta }}>RENISUS</strong> lista 71 plantas com uso reconhecido pelo SUS. Existem mais de 600 <strong style={{ color: C.sage }}>Farmácias Vivas</strong> espalhadas pela rede pública dispensando garrafadas, chás e pomadas dessas mesmas plantas.
                </p>
                <p>
                  Esta coleção resgata essas fórmulas. Indígena (Kaxinawá, Pataxó, Guarani), popular (garrafadas do interior, benzeduras, chás de quintal), quilombola e oficial (RENISUS, Farmácias Vivas). Sem misticismo, sem promessa de cura mágica, sem influencer vendendo e-book. Tradição com PubMed do lado.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: `3px solid ${C.terracotta}`, color: C.sage, ...editorial }}>
                  Sou neto de índio. Esse saber não é exótico, é meu. E é seu também, brasileiro.
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2, TRÊS PILARES (faixa sage escura, alto contraste) */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sage, color: C.cream }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terraSoft }}>Capítulo 02 · Fundamento</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={display}>
                Três raízes,{' '}
                <span style={{ ...editorial, color: C.terraSoft }}>uma farmácia viva.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(250,246,240,0.78)' }}>
                Toda receita publicada aqui precisa passar pelas três raízes antes de entrar na coleção. Sem uma delas, vira modismo de internet.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(250,246,240,0.12)' }}>
              {PILARES.map((p, i) => (
                <motion.div key={p.titulo} {...fade(i * 0.06)}
                  className="group relative p-8 md:p-10 transition-all duration-500"
                  style={{ backgroundColor: C.sage }}>
                  <div className="p-3 rounded-xl mb-8 inline-block transition-transform group-hover:scale-110 duration-500"
                    style={{ backgroundColor: 'rgba(224,154,106,0.18)', border: '1px solid rgba(224,154,106,0.32)' }}>
                    <p.icon size={22} style={{ color: C.terraSoft }} />
                  </div>
                  <h3 className="text-2xl md:text-[1.7rem] font-black leading-tight mb-4" style={{ color: C.cream }}>
                    {p.titulo}
                  </h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.72)' }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3, RECEITAS DISPONÍVEIS */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-20 flex items-end justify-between flex-wrap gap-8">
              <div className="max-w-3xl">
                <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 03 · Coleção</span>
                <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                  Protocolos{' '}
                  <span style={{ ...editorial, color: C.terracotta }}>disponíveis.</span>
                </h2>
              </div>
              <p className="text-base md:text-lg max-w-md font-light leading-relaxed" style={{ color: C.inkSoft }}>
                {RECEITAS.length} receita{RECEITAS.length !== 1 && 's'} ativa{RECEITAS.length !== 1 && 's'}. Cada novo protocolo só entra depois de passar pelos três pilares.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {RECEITAS.map((r, i) => (
                <motion.article key={r.slug} {...fade(i * 0.1)} className="lg:col-span-6">
                  <Link to={`/soberania-organica/cozinha-funcional/${r.slug}`}
                    className="group block h-full rounded-3xl overflow-hidden transition-all duration-700"
                    style={{ backgroundColor: C.sand, border: `1px solid ${C.borderLight}` }}>
                    <div className="relative h-[320px] md:h-[420px] overflow-hidden">
                      <img src={r.img} alt={r.alt} loading="lazy" width={1920} height={1080}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                      <div className="absolute top-6 left-6 flex items-center gap-3">
                        <span className="px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md"
                          style={{ ...monoStyle, backgroundColor: 'rgba(250,246,240,0.85)', color: C.sage }}>
                          {r.pretitulo}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 md:p-10">
                      <h3 className="text-3xl md:text-4xl mb-5 leading-[1.05]" style={{ ...display, color: C.sage }}>
                        {r.titulo}
                      </h3>
                      <p className="text-base md:text-lg leading-relaxed font-light mb-7" style={{ color: C.inkSoft }}>
                        {r.resumo}
                      </p>
                      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 pb-8 border-b" style={{ borderColor: C.borderLight }}>
                        <span className="flex items-center gap-2 text-sm" style={{ color: C.inkSoft }}>
                          <Clock size={14} style={{ color: C.terracotta }} /> {r.tempo}
                        </span>
                        <span className="flex items-center gap-2 text-sm" style={{ color: C.inkSoft }}>
                          <Users size={14} style={{ color: C.terracotta }} /> {r.porcoes}
                        </span>
                        <span className="flex items-center gap-2 text-sm" style={{ color: C.inkSoft }}>
                          <BookOpen size={14} style={{ color: C.terracotta }} /> {r.estudos}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-3 text-sm font-bold transition-all group-hover:gap-5"
                        style={{ ...monoStyle, color: C.terracotta }}>
                        Abrir protocolo <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}

              {/* Slot reservado */}
              <motion.div {...fade(0.2)} className="lg:col-span-12">
                <div className="h-full min-h-[180px] rounded-3xl flex flex-col md:flex-row items-center justify-center gap-6 p-10 text-center md:text-left"
                  style={{ backgroundColor: C.sandDeep, border: `2px dashed ${C.borderLight}` }}>
                  <FlaskConical size={32} style={{ color: C.terracotta }} />
                  <div>
                    <p className="text-xs font-bold mb-2" style={{ ...monoStyle, color: C.terracotta }}>Próximo protocolo</p>
                    <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ ...editorial, color: C.inkSoft }}>
                      Em validação clínica. A coleção cresce devagar para entregar profundo.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4, CHECKLIST */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 04 · Operação</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                Antes de abrir a primeira receita,{' '}
                <span style={{ ...editorial, color: C.terracotta }}>monte sua cozinha.</span>
              </h2>
            </motion.div>

            <ol className="space-y-4">
              {[
                'Limpe a geladeira: descarte ou doe ultraprocessados, refrigerante, embutidos com nitrito e doces de pacote.',
                'Estoque base: gelatina sem sabor, chia, mel cru, gengibre fresco, limão, sal de boa procedência, leite vegetal sem açúcar.',
                'Compre ervas vivas ou em sachê de boa origem: camomila, melissa, hortelã, cidreira. Evite chá em pó industrial.',
                'Tenha 4 a 6 potes de vidro pequenos com tampa para porcionar receitas de geladeira da semana inteira.',
                'Defina dois dias fixos de preparo: domingo e quarta. Receita funcional só funciona com repetição, não com inspiração.',
                'Anote sono, disposição e desejo por doce noturno por 14 dias antes e depois de iniciar qualquer protocolo.',
              ].map((item, i) => (
                <motion.li key={i} {...fade(i * 0.04)}
                  className="flex items-start gap-6 p-6 md:p-7 rounded-2xl transition-all duration-500 hover:translate-x-2"
                  style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl font-black"
                    style={{ backgroundColor: C.terracotta, color: C.cream }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-lg md:text-xl leading-relaxed font-light pt-1.5" style={{ color: C.inkSoft }}>{item}</p>
                </motion.li>
              ))}
            </ol>
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
                A cozinha é uma camada.{' '}
                <span style={{ ...editorial, color: C.terracotta }}>Existem outras seis.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {TRILHA.map((t, i) => (
                <motion.div key={t.to} {...fade(i * 0.08)}>
                  <Link to={t.to} className="group block h-full p-8 md:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                    <Salad size={24} style={{ color: C.terracotta }} className="mb-6" />
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

        {/* DISCLAIMER + CTA */}
        <section className="relative py-20 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sage, color: C.cream }}>
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-start gap-5 p-8 rounded-2xl" style={{ backgroundColor: 'rgba(250,246,240,0.06)', border: '1px solid rgba(250,246,240,0.15)' }}>
              <AlertTriangle size={24} style={{ color: C.terraSoft }} className="shrink-0 mt-1" />
              <div>
                <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: C.terraSoft }}>Disclaimer · Saúde</p>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.85)' }}>
                  Este conteúdo é educativo, baseado em literatura científica indexada. Não substitui diagnóstico, prescrição ou acompanhamento médico. Distúrbios persistentes do sono, ansiedade clínica e uso de medicação contínua exigem avaliação profissional. Não interrompa nem altere prescrição médica por conta própria.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
