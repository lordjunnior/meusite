import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Search, ShieldCheck } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Figure, Veredito, FaqSection, TrailSection } from '@/components/seguranca-mobile/EditorialKit';
import hero from '@/assets/biblioteca-tecnica/pesquisa-verificacao.jpg';
import fonte from '@/assets/biblioteca-tecnica/curadoria-fonte-primaria.jpg';
import documento from '@/assets/book-whitepaper.webp';
import identidade from '@/assets/biblioteca-tecnica/dispositivo-identidade.jpg';
import rede from '@/assets/biblioteca-tecnica/rede-navegacao.jpg';
import backup from '@/assets/biblioteca-tecnica/dados-backup.jpg';

const passos = [
  { n: '01', title: 'Localize a afirmação original', text: 'Antes de compartilhar um print ou manchete, procure o documento, a pesquisa ou a fala integral. Uma citação recortada pode inverter o sentido. Se não há origem verificável, suspenda o juízo.', image: fonte, alt: 'Documentos impressos organizados sobre uma mesa' },
  { n: '02', title: 'Confira a data e o contexto', text: 'Uma notícia verdadeira de outro ano pode ser falsa como notícia de hoje. Veja quando os dados foram coletados, o país a que se referem e se a regra ainda está em vigor. Em finanças e saúde, a vigência muda a decisão.', image: documento, alt: 'Cópia impressa do documento original do Bitcoin' },
  { n: '03', title: 'Separe evidência de interpretação', text: 'Um fabricante descreve recursos de seu produto; isso não demonstra ausência de falhas. Uma pesquisa observa uma população; isso não garante o mesmo efeito em cada pessoa. Procure metodologia, limites e o que os dados não medem.', image: identidade, alt: 'Dispositivo de segurança e materiais técnicos em bancada' },
  { n: '04', title: 'Busque confirmação independente', text: 'Compare com documentação oficial, estudos completos, registros públicos ou especialistas que explicam seu método. Vários sites copiando a mesma nota não são várias fontes. Procure quem mediu algo por conta própria.', image: rede, alt: 'Equipamentos de rede e navegação organizados' },
  { n: '05', title: 'Decida conforme o risco', text: 'Para uma curiosidade, basta uma checagem simples. Para mover bitcoins, alterar segurança do aparelho ou tomar decisões de saúde, pare e valide o procedimento na fonte oficial atual. Nunca entregue seed phrase nem faça testes em produção.', image: backup, alt: 'Dispositivos e mídia de backup sobre superfície de trabalho' },
];
const faq = [
  { q: 'O que é uma fonte primária?', a: 'É o registro mais próximo do fato: documento oficial, pesquisa original, código e documentação do projeto ou relato direto. Ainda pode conter erro ou viés; leia também método, data e limitações.' },
  { q: 'Uma notícia repetida em muitos sites está confirmada?', a: 'Não necessariamente. Muitos veículos podem repetir o mesmo comunicado. Rastreie a origem e procure verificação independente.' },
  { q: 'Como verificar uma informação sobre Bitcoin?', a: 'Compare a descrição com o código, a documentação do projeto e fontes técnicas independentes. Para operar uma carteira, confira ainda o endereço oficial e teste valores pequenos antes de qualquer transferência relevante.' },
  { q: 'Posso confiar em tudo que está neste site?', a: 'Não por autoridade. Use o mesmo método aqui: confira as fontes, observe a data, questione a interpretação e compare com registros primários antes de agir.' },
];

export default function ComoChecarFontes() {
  return <>
    <SeoHead custom={{
      title: 'Como checar fontes e verificar informações | Lord Junnior',
      description: 'Um método prático para verificar notícias, pesquisas e orientações sobre Bitcoin, privacidade e saúde: fonte original, data, contexto, confirmação independente e risco.',
      canonical: 'https://lordjunnior.com.br/centro-de-conhecimento/como-checar-fontes',
      primaryKeyword: 'como checar fontes',
      lsiKeywords: ['verificar informação', 'fonte primária', 'checagem de fatos'],
      longTailKeywords: ['como verificar se uma notícia é verdadeira', 'como conferir uma fonte antes de agir'],
      breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Centro de Conhecimento', url: '/centro-de-conhecimento' }, { name: 'Como checar fontes', url: '/centro-de-conhecimento/como-checar-fontes' }],
      schemaType: 'Article', articleSection: 'Pesquisa', relatedPages: ['/centro-de-conhecimento', '/biblioteca-tecnica'],
    }} faqItems={faq.map(({ q, a }) => ({ question: q, answer: a }))} />
    <main className="smx-page min-h-screen">
      <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
      <Hero asset={hero} heroAlt="Pessoa examinando documentos e anotações com lupa" eyebrow="Centro de Conhecimento / Pesquisa" category="Método de verificação" icon={Search} title="Como checar fontes" lede="Uma informação pode ser verdadeira e ainda assim levar você à decisão errada. Antes de agir, encontre a origem, confira o contexto e meça o risco." />
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20"><div className="mx-auto max-w-[1100px]"><Heading chapter="A pergunta que vem primeiro">Quem sabe, quem afirma e quem prova?</Heading><p className="max-w-3xl text-lg leading-[1.75] md:text-xl">Uma manchete não é um estudo. Um vídeo curto não é uma demonstração. E uma fonte oficial pode descrever sua própria versão dos fatos sem examinar todas as alternativas. O método abaixo não promete certeza absoluta; ele reduz o risco de tomar uma decisão com base em material incompleto.</p></div></section>
      {passos.map((passo, i) => <section key={passo.n} className={`px-6 py-16 md:px-12 md:py-24 lg:px-20 ${i % 2 ? 'bg-card' : ''}`}><div className={`mx-auto grid max-w-[1600px] items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}><Figure asset={passo.image} alt={passo.alt} caption={`${passo.n} / ${passo.title}`} /><div><Heading chapter={`Passo ${passo.n}`}>{passo.title}</Heading><p className="max-w-2xl text-lg leading-[1.75] md:text-xl">{passo.text}</p></div></div></section>)}
      <section className="smx-deep px-6 py-20 md:px-12 md:py-28 lg:px-20"><div className="mx-auto max-w-[1100px]"><Heading dark chapter="Antes de confiar">Uma checagem em cinco perguntas</Heading><ol className="grid gap-6 md:grid-cols-2">{['Onde está o registro original?', 'Quando e em que contexto isso aconteceu?', 'O que os dados demonstram e o que não demonstram?', 'Alguém conferiu de forma independente?', 'Qual o custo de estar errado?'].map((q, i) => <li key={q} className="border-l-2 border-current/40 pl-5 text-lg leading-relaxed text-background"><span className="smx-copper-soft mr-3 font-black">{String(i + 1).padStart(2, '0')}</span>{q}</li>)}</ol></div></section>
      <FaqSection asset={fonte} alt="Documentos de referência organizados para leitura" faq={faq} />
      <Veredito headline={<>Não terceirize <span className="smx-editorial">seu julgamento.</span></>} paragraphs={['A fonte é o começo, não o fim. Data, método, incentivos e consequências precisam caber na mesma leitura.', 'Quando não houver evidência suficiente, dizer “ainda não sei” é uma decisão melhor do que agir com falsa certeza.']} />
      <TrailSection chapter="Aplique o método" cards={[{ to: '/biblioteca-tecnica', title: 'Biblioteca Técnica', desc: 'Recursos com fontes oficiais e status de revisão.', icon: ShieldCheck }, { to: '/centro-de-conhecimento', title: 'Centro de Conhecimento', desc: 'Volte ao acervo organizado por área.', icon: BookOpen }]} />
      <div className="px-6 pb-24 text-center"><Button asChild className="smx-btn min-h-[44px]"><Link to="/biblioteca-tecnica">Conferir recursos <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
    </main>
  </>;
}
