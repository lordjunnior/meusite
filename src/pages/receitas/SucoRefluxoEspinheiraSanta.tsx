import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Clock, Users, BookOpen,
  Leaf, Mountain, AlertTriangle, CheckCircle2,
  ScrollText, ExternalLink, Compass, Sprout, FlaskConical, Droplet,
} from 'lucide-react';
import BackNav from '@/components/BackNav';
import ScrollToTop from '@/components/ScrollToTop';

import imgHero from '@/assets/receitas/hero-refluxo-azia-light.webp';
import imgEspinheira from '@/assets/receitas/ativo-espinheira-santa.webp';
import imgBatata from '@/assets/receitas/ativo-batata-inglesa.webp';
import imgCamomila from '@/assets/receitas/ativo-camomila.webp';
import imgBabosa from '@/assets/receitas/ativo-babosa.webp';

/**
 * /soberania-organica/cozinha-funcional/suco-refluxo-espinheira-santa
 * Receita ancestral indígena, popular e quilombola para refluxo e azia.
 * Espinheira-santa + Batata + Camomila + Babosa. Sem álcool. Padrão Light Editorial.
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
  { qtd: '15 a 20 g', nome: 'Folhas secas de espinheira-santa', detalhe: 'Maytenus ilicifolia (ou Monteverdia ilicifolia), 3 a 4 colheres de sopa. Dose validada em ensaios clínicos randomizados conduzidos pelo Programa de Pesquisa em Plantas Medicinais da Central de Medicamentos.' },
  { qtd: '1 unidade', nome: 'Batata inglesa orgânica média', detalhe: 'Solanum tuberosum, cerca de 150 a 200 g. Use crua, com casca limpa ou descascada. Nunca use batata com brotos ou partes esverdeadas (presença de solanina).' },
  { qtd: '200 ml', nome: 'Chá forte de camomila', detalhe: 'Matricaria chamomilla, 2 colheres de sopa de flores secas em 200 ml de água quente. Calmante da mucosa gástrica, ação anti-inflamatória e antiespasmódica.' },
  { qtd: '2 colheres de sopa', nome: 'Gel puro de babosa', detalhe: 'Aloe vera (parte interna transparente). Retire SEMPRE a aloína: corte a folha, deixe escorrer o líquido amarelo por 12 horas, depois retire só o gel cristalino central.' },
  { qtd: '600 ml', nome: 'Água filtrada', detalhe: 'Sem cloro. Use panela esmaltada, inox ou de barro para a infusão. Nunca alumínio.' },
];

const PREPARO = [
  { n: '01', titulo: 'Infusão da espinheira-santa', desc: 'Ferva 600 ml de água filtrada e desligue o fogo. Adicione as 15 a 20 g de folhas secas de espinheira-santa, tampe e deixe em infusão abafada por 10 a 12 minutos. Coe em coador fino. O líquido fica âmbar claro com leve amargor característico, isso é o tanino e a friedelina, exatamente os ativos gastroprotetores.' },
  { n: '02', titulo: 'Chá de camomila concentrado', desc: 'Em paralelo, ferva 200 ml de água, desligue e adicione 2 colheres de sopa de flores secas de camomila. Tampe, espere 8 a 10 minutos e coe. Vai entrar morno na mistura final.' },
  { n: '03', titulo: 'Suco de batata fresco', desc: 'Lave bem a batata, retire brotos e partes verdes. Rale crua (com ou sem casca, conforme tolerância) na hora do uso. Coloque em pano limpo de algodão e esprema com força para extrair o suco branco-leitoso. Rendimento: 100 a 150 ml. ATENÇÃO: o suco de batata oxida em poucos minutos, prepare na hora de tomar, nunca guarde.' },
  { n: '04', titulo: 'Preparo do gel de babosa', desc: 'Da folha previamente drenada por 12 horas, corte a casca grossa com faca limpa e retire só o gel cristalino central com colher. Descarte qualquer resíduo amarelado. Bata rapidamente no liquidificador para deixar líquido (5 segundos no máximo).' },
  { n: '05', titulo: 'Mistura final morna', desc: 'Misture na seguinte ordem em jarra de vidro: 600 ml do chá de espinheira-santa coado + 200 ml do chá de camomila + 2 colheres de sopa de gel de babosa. Mexa bem. Reserve em geladeira em vidro âmbar fechado. Validade: 3 a 4 dias.' },
  { n: '06', titulo: 'Dose de uso, com suco fresco da batata', desc: 'Na hora de tomar: aqueça levemente 200 ml da mistura (morna, nunca fervendo, para preservar a babosa) e acrescente o suco de batata recém-extraído (50 a 75 ml para cada 200 ml). Beba 20 a 30 minutos antes do almoço e do jantar. Sabor terroso, levemente amargo. Não adoce com açúcar.' },
];

const VARIACOES = [
  {
    icon: FlaskConical, cor: 'sage',
    titulo: 'Versão A · Suco diário ancestral', sub: 'Refluxo leve a moderado · 14 a 28 dias',
    pontos: [
      'A receita base, exatamente como descrita acima',
      'Dose adulta: 200 a 250 ml 2x ao dia, antes do almoço e do jantar',
      'Suco de batata sempre extraído na hora, nunca armazenado',
      'Forma mais próxima dos ensaios clínicos brasileiros (Geocze, Biavatti)',
      'Pausa de 7 a 10 dias após cada ciclo de 28 dias',
    ],
  },
  {
    icon: Sprout, cor: 'terra',
    titulo: 'Versão B · Gelatina gastroprotetora', sub: 'Para quem tem náusea ou não tolera líquidos',
    pontos: [
      'Dissolva 40 g de gelatina sem sabor incolor em 80 ml de chá quente de espinheira-santa',
      'Misture com 400 ml da mistura base já pronta, mais 1 colher de gel de babosa',
      'Despeje em forma e leve à geladeira por 4 horas. Corte em 8 quadrados',
      'Dose: 2 quadrados antes do almoço e 2 antes do jantar',
      'A textura ajuda a aderir à mucosa esofágica, ideal para refluxo noturno',
    ],
  },
  {
    icon: Droplet, cor: 'sage',
    titulo: 'Versão C · Compressa morna', sub: 'Apoio externo na crise de azia',
    pontos: [
      'Faça 300 ml de chá forte de espinheira-santa (use o dobro da erva)',
      'Mergulhe pano de algodão limpo, escorra o excesso',
      'Aplique morno sobre o epigástrio (boca do estômago) por 15 minutos',
      'Repouse semi-sentado, nunca deitado. Respire fundo',
      'Apoio sintomático para acalmar queimação aguda. Não substitui o uso interno.',
    ],
  },
];

const ATIVOS = [
  {
    n: '01', img: imgEspinheira, nome: 'Espinheira-santa', fonte: 'Maytenus ilicifolia · 15 a 20 g secas',
    icon: Leaf,
    alt: 'Folhas verde escuro brilhantes ovais com bordas espinhosas serrilhadas características de espinheira-santa Maytenus ilicifolia sobre toalha de linho cor creme em luz natural suave',
    tradicao: 'Planta nativa do Brasil meridional, usada há séculos por povos Guarani, Kaingang e Xokleng como remédio de primeira linha para "queimação no estômago", "fogo no peito" e úlcera. Conhecida na medicina popular como "erva cancerosa", "espinho-de-deus" ou "cancorosa-de-sete-espinhos". É um dos maiores ícones da farmacopeia indígena e popular brasileira, transmitida por benzedeiras e raizeiros como protetora gástrica universal antes da era do omeprazol.',
    sus: 'Listada na RENISUS (Relação Nacional de Plantas Medicinais de Interesse ao SUS), dispensada nas Farmácias Vivas e com monografia oficial na Farmacopeia Brasileira (Anvisa) para uso como antidispéptico e gastroprotetor.',
    mecanismo: 'Os taninos condensados, friedelina, friedelinol e flavonoides agem em três frentes: reduzem a secreção basal de ácido clorídrico (efeito antissecretor similar aos antagonistas H2), formam uma camada protetora sobre a mucosa gástrica (efeito citoprotetor), e aceleram cicatrização de microerosões. Estudo clínico brasileiro (Geocze et al.) demonstrou eficácia comparável ao cimetidine em dispepsia funcional, com perfil de segurança superior e ausência de rebote ácido ao suspender.',
    estudoAncora: 'Geocze, S. et al. (1988) e Biavatti, M. W. (2007), Revista Brasileira de Farmacognosia',
    achado: 'Ensaios clínicos brasileiros conduzidos no contexto da Central de Medicamentos confirmaram que extratos de Maytenus ilicifolia (400 a 860 mg/dia) reduzem significativamente sintomas de dispepsia, queimação retroesternal e dor epigástrica, com eficácia comparável à cimetidina e sem os efeitos rebote típicos dos inibidores de bomba de prótons.',
  },
  {
    n: '02', img: imgBatata, nome: 'Batata inglesa crua', fonte: 'Solanum tuberosum · 150 a 200 g',
    icon: Sprout,
    alt: 'Batata inglesa fresca inteira e outra cortada ao meio mostrando interior branco amiláceo ao lado de tigela de cerâmica com polpa de batata crua ralada sobre toalha de linho cor creme em luz natural',
    tradicao: 'Remédio popular rural e urbano brasileiro desde o século XIX, usado como "antiácido natural" antes da invenção dos antiácidos sintéticos. Avós, parteiras e benzedeiras prescreviam o suco branco-leitoso da batata crua espremida em pano para "queimação", "azia de gravidez" e "úlcera". É também tradição em Portugal, Alemanha e Europa Oriental, onde foi documentado em farmacopeias populares do século XIX e XX. A versão moderna brasileira incorpora o suco no jejum e antes das refeições.',
    sus: 'Não consta diretamente na RENISUS, mas o uso medicinal está documentado em compêndios de fitoterapia popular do Ministério da Saúde e em manuais de medicina tradicional. Reconhecido como adjuvante seguro em dispepsia e azia ocasional.',
    mecanismo: 'O suco fresco é alcalino (pH 6 a 7) e contém grande quantidade de amido e mucilagens que neutralizam o excesso de ácido clorídrico e formam película protetora sobre a mucosa esofágica e gástrica, similar ao mecanismo de antiácidos como hidróxido de alumínio, sem os efeitos colaterais (constipação, retenção). Contém também atropina-símile em traços e inibidores naturais de protease que reduzem irritação local. A evidência clínica é ainda preliminar (estudos pequenos), mas a evidência etnográfica é massiva.',
    estudoAncora: 'Vlachojannis, J. E. et al. (2010), Phytotherapy Research',
    achado: 'Revisão sistemática europeia confirma o uso tradicional do suco de batata crua (Solanum tuberosum) para gastrite e dispepsia em múltiplas tradições populares (alemã, eslava, brasileira), com plausibilidade biológica forte (alcalinidade, mucilagens, redução de pepsina) e segurança comprovada em uso de curto prazo.',
  },
  {
    n: '03', img: imgCamomila, nome: 'Camomila', fonte: 'Matricaria chamomilla · 2 colheres em 200 ml',
    icon: Sprout,
    alt: 'Flores secas de camomila Matricaria chamomilla com pétalas brancas e centro amarelo dourado espalhadas sobre toalha de linho cor creme com pequena colher de madeira em luz natural suave',
    tradicao: 'Trazida pelos colonizadores europeus e rapidamente adotada pela tradição indígena, popular e quilombola brasileira como calmante digestivo e do sistema nervoso. Conhecida como "macela" em algumas regiões. Benzedeiras a indicam para cólica de bebê, gastrite, refluxo, "estômago nervoso" e insônia leve. Faz parte da tríade clássica brasileira para distúrbios gastrintestinais ao lado de espinheira-santa e boldo.',
    sus: 'Listada na RENISUS. Possui monografia oficial na Farmacopeia Brasileira para uso digestivo, antiespasmódico e calmante leve. Dispensada em Farmácias Vivas em todo o país.',
    mecanismo: 'Os flavonoides (apigenina, luteolina) e o alfa-bisabolol têm ação anti-inflamatória direta sobre a mucosa gástrica, antiespasmódica sobre a musculatura lisa do trato digestivo e ansiolítica leve via receptores GABA. Reduz contração esofágica desordenada, principal gatilho do refluxo, e acalma o eixo cérebro-intestino, fundamental porque grande parte do refluxo funcional tem componente emocional (estresse e ansiedade aumentam relaxamento do esfíncter esofágico inferior).',
    estudoAncora: 'Srivastava, J. K.; Shankar, E.; Gupta, S. (2010), Molecular Medicine Reports',
    achado: 'Revisão científica abrangente confirma ações documentadas da camomila em dispepsia funcional, refluxo, cólicas e ansiedade somatizada no trato digestivo, com perfil de segurança excepcional e sinergia comprovada com outras plantas gastroprotetoras como espinheira-santa e gengibre.',
  },
  {
    n: '04', img: imgBabosa, nome: 'Babosa (Aloe vera)', fonte: 'Aloe vera · 2 colheres de gel puro',
    icon: Droplet,
    alt: 'Folha fresca de babosa Aloe vera cortada longitudinalmente expondo o gel transparente cristalino interior ao lado de tigela de cerâmica com gel escupado sobre toalha de linho cor creme em luz natural',
    tradicao: 'Usada por quilombolas, sertanejos e povos do semiárido nordestino para "acalmar o fogo interno", cicatrizar feridas externas e proteger mucosas. Conhecida como "babosa", "caraguatá" ou "erva-da-azia". Receita popular: bater 1 colher do gel transparente com água ou suco de fruta para queimação estomacal. ATENÇÃO ANCESTRAL importante: a tradição sempre orientou a "deixar escorrer o suco amarelo antes de usar", separando empiricamente a aloína (laxativa e potencialmente hepatotóxica) do gel terapêutico.',
    sus: 'Listada na RENISUS para uso tópico (queimaduras, feridas). O uso interno do gel descontaminado é reconhecido em fitoterapia tradicional e em manuais de Farmácia Viva, mas exige preparo correto (remoção total da aloína).',
    mecanismo: 'O gel cristalino contém polissacarídeos (acemanano), mucilagens e enzimas que formam película hidratante e cicatrizante sobre a mucosa esofágica e gástrica inflamada. Estudo clínico randomizado (Panahi et al., 2015) comparou suco de Aloe vera com omeprazol e ranitidina em pacientes com DRGE e demonstrou eficácia comparável na redução de azia, regurgitação, eructação e disfagia, sem efeitos adversos relevantes. Importante: SÓ o gel sem aloína é seguro para uso interno.',
    estudoAncora: 'Panahi, Y. et al. (2015), Journal of Traditional Chinese Medicine',
    achado: 'Ensaio clínico randomizado controlado com 79 pacientes com DRGE comparou Aloe vera (10 ml/dia) versus omeprazol (20 mg/dia) e ranitidina (300 mg/dia) durante 4 semanas. Aloe vera foi seguro e efetivo na redução de todos os sintomas avaliados, com perfil de tolerabilidade superior e sem efeitos adversos relevantes.',
  },
];

const FONTES = [
  { autor: 'Ministério da Saúde', ano: '2006', titulo: 'Política Nacional de Plantas Medicinais e Fitoterápicos (Decreto nº 5.813)', revista: 'Brasil', tipo: 'Marco regulatório oficial', link: 'https://bvsms.saude.gov.br/bvs/publicacoes/politica_nacional_fitoterapicos.pdf' },
  { autor: 'Ministério da Saúde', ano: '2009', titulo: 'RENISUS, Relação Nacional de Plantas Medicinais de Interesse ao SUS', revista: 'Brasil', tipo: 'Lista oficial de 71 plantas', link: 'https://www.gov.br/saude/pt-br/composicao/sectics/daf/pnpmf/plantas-medicinais-e-fitoterapicos-no-sus' },
  { autor: 'Geocze, S. et al.', ano: '1988', titulo: 'Estudo clínico de pacientes portadores de dispepsia alta funcional ou orgânica tratados com extrato de Maytenus ilicifolia (espinheira-santa)', revista: 'Estudos de Plantas Medicinais (CEME)', tipo: 'Ensaio clínico (espinheira-santa)', link: 'https://pesquisa.bvsalud.org/portal/resource/pt/lil-69091' },
  { autor: 'Biavatti, M. W. et al.', ano: '2007', titulo: 'Ethnopharmacology of Maytenus ilicifolia and related species, a review', revista: 'Revista Brasileira de Farmacognosia', tipo: 'Revisão etnofarmacológica', link: 'https://pubmed.ncbi.nlm.nih.gov/18516305/' },
  { autor: 'Panahi, Y. et al.', ano: '2015', titulo: 'Efficacy and safety of Aloe vera syrup for the treatment of gastroesophageal reflux disease, a pilot randomized positive-controlled trial', revista: 'Journal of Traditional Chinese Medicine', tipo: 'Ensaio clínico randomizado (babosa)', link: 'https://pubmed.ncbi.nlm.nih.gov/26591688/' },
  { autor: 'Srivastava, J. K.; Shankar, E.; Gupta, S.', ano: '2010', titulo: 'Chamomile, a herbal medicine of the past with a bright future', revista: 'Molecular Medicine Reports', tipo: 'Revisão científica (camomila)', link: 'https://pubmed.ncbi.nlm.nih.gov/21132119/' },
  { autor: 'Vlachojannis, J. E.; Cameron, M.; Chrubasik, S.', ano: '2010', titulo: 'Medicinal use of potato-derived products, a systematic review', revista: 'Phytotherapy Research', tipo: 'Revisão sistemática (batata)', link: 'https://pubmed.ncbi.nlm.nih.gov/20013822/' },
  { autor: 'Anvisa', ano: '2019', titulo: 'Farmacopeia Brasileira, 6ª edição, Volume II (Monografias de plantas medicinais)', revista: 'Anvisa', tipo: 'Monografia oficial', link: 'https://www.gov.br/anvisa/pt-br/assuntos/farmacopeia/farmacopeia-brasileira' },
];

const FAQ = [
  { q: 'Esse suco substitui o omeprazol ou pantoprazol?',
    a: 'Não substitui de imediato e nunca por conta própria. Funciona muito bem como apoio em refluxo leve a moderado, dispepsia funcional, "azia ocasional" e gastrite não erosiva, com efeito perceptível em 7 a 14 dias. Para esofagite erosiva grau C ou D, esôfago de Barrett, suspeita de úlcera ativa ou Helicobacter pylori confirmado, é apoio complementar e exige acompanhamento gastroenterológico. Quem já usa inibidor de bomba de prótons NUNCA deve suspender de uma vez (efeito rebote ácido), o desmame é gradual e supervisionado.' },
  { q: 'Em quanto tempo começa a fazer efeito?',
    a: 'Para azia ocasional e queimação leve, o alívio começa em 20 a 40 minutos após a primeira dose (efeito alcalinizante imediato da batata + babosa). Para refluxo crônico funcional, a melhora consistente aparece entre 7 e 14 dias de uso contínuo, com pico em 21 a 28 dias. A espinheira-santa age por mecanismo cumulativo (proteção e cicatrização da mucosa), por isso o tempo. Mudanças de hábito (elevar cabeceira, reduzir refeição noturna pesada, evitar deitar logo após comer) potencializam o protocolo.' },
  { q: 'Quem NÃO pode tomar?',
    a: 'Contraindicações absolutas: gestantes (espinheira-santa em doses altas tem efeito uterotônico documentado), lactantes (sem dados de segurança), crianças menores de 6 anos sem orientação pediátrica fitoterápica, pessoas com obstrução intestinal, alergia conhecida à família Celastraceae (espinheira-santa) ou Asteraceae (camomila), uso interno em quem tem doença hepática (pelo risco de aloína residual mal removida da babosa). Atenção: pessoas em uso de antiácidos, antagonistas H2 ou inibidores de bomba de prótons devem informar o médico (a espinheira-santa pode interferir na absorção de outros medicamentos).' },
  { q: 'Qual a dose certa por idade?',
    a: 'Adultos 18 a 65 anos: receita base completa, 200 a 250 ml 2x ao dia, totalizando 400 a 500 ml/dia, antes do almoço e do jantar. Idosos acima de 65 anos: reduza para 10 a 12 g de espinheira-santa, meia batata e 300 a 400 ml/dia (mucosa mais sensível, maior risco de hipersensibilidade). Adolescentes 12 a 17 anos: metade da dose adulta, 250 a 350 ml/dia. Crianças 6 a 11 anos: 1/4 da dose (5 a 7 g de espinheira-santa, 1/4 de batata) e 100 a 150 ml/dia, sempre com aval pediátrico fitoterápico. Crianças menores de 6 anos: não use sem pediatra especializado.' },
  { q: 'Por quanto tempo posso tomar sem parar?',
    a: 'Ciclo padrão validado em ensaios clínicos: 14 a 28 dias contínuos, depois pausa de 7 a 10 dias e reavaliação. Refluxo funcional que não cede em 28 dias completos exige investigação médica, endoscopia e pesquisa de Helicobacter pylori, pode haver causa estrutural (hérnia de hiato, esôfago de Barrett, úlcera) que precisa de tratamento específico. Não é para uso indefinido, é apoio dentro de uma estratégia maior de mudança de hábitos.' },
  { q: 'Por que retirar a aloína da babosa?',
    a: 'A folha da babosa tem duas partes muito diferentes: a casca verde grossa com a camada amarela imediatamente abaixo (líquido amarelo amargo) contém aloína, um composto laxante potente e potencialmente hepatotóxico em uso contínuo, classificado pela IARC como possível carcinógeno em altas doses. O gel cristalino do centro NÃO contém aloína e é seguro. A tradição quilombola e nordestina sempre orientou "deixar escorrer o suco amarelo por uma noite" antes de usar, separação empírica perfeita. Faça assim: corte a folha, mantenha em pé em vasilha por 12 horas para escorrer todo o líquido amarelo, depois corte a casca e retire só o gel cristalino do centro.' },
  { q: 'Posso comer normalmente tomando esse protocolo?',
    a: 'O protocolo só funciona acompanhado de mudanças de hábito. Obrigatório: elevar cabeceira da cama 15 cm (calços nos pés da cama, não travesseiros altos que pioram), última refeição 3 horas antes de deitar, reduzir café (no máximo 1 xícara antes do meio-dia), reduzir álcool, chocolate, frituras, pimenta forte, refrigerante, hortelã (relaxa o esfíncter esofágico). Mastigar devagar, comer porções menores, não usar roupa apertada na cintura. Sem essas mudanças, nenhum chá nem nenhum omeprazol resolve o refluxo de forma duradoura.' },
  { q: 'O suco da batata pode ser guardado?',
    a: 'Não. O suco fresco de batata oxida em poucos minutos, perde os mucilagens ativos e desenvolve compostos de oxidação que podem irritar a mucosa. Sempre prepare na hora: rale, esprema no pano, misture na dose já morna do chá base, beba imediatamente. A mistura base (espinheira-santa + camomila + babosa) sim pode ficar pronta na geladeira por 3 a 4 dias em vidro âmbar fechado.' },
];

const TRILHA = [
  { to: '/soberania-organica/cozinha-funcional', titulo: 'Hub Cozinha Funcional', desc: 'Volte para a coleção completa de receitas ancestrais brasileiras validadas pelo SUS.', label: 'Ver coleção' },
  { to: '/soberania-organica/cozinha-funcional/infusao-dor-inflamacao', titulo: 'Chá de gengibre e cúrcuma', desc: 'Apoio anti-inflamatório natural com mecanismo COX-2, alternativa à dipirona e à nimesulida.', label: 'Ler receita' },
  { to: '/soberania-organica/saude-preventiva', titulo: 'Saúde Preventiva', desc: 'Os pilares fisiológicos por trás do refluxo: postura, alimentação, sono, microbiota e estresse.', label: 'Estudar fisiologia' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[92vh] min-h-[680px] w-full overflow-hidden" style={{ backgroundColor: C.sage }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={imgHero}
          alt="Composição editorial vista de cima com batata inglesa cortada folhas de espinheira-santa flores secas de camomila em tigela de cerâmica babosa cortada com gel exposto e pilão de madeira sobre toalha de linho cor creme em luz natural quente"
          className="w-full h-full object-cover scale-110"
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
          <Droplet size={14} style={{ color: C.cream }} />
          <span className="text-[11px] md:text-xs font-bold" style={{ ...monoStyle, color: C.cream }}>
            Tradição indígena, popular e benzedeira · Validada pelo SUS · RENISUS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8vw,7rem)] max-w-[18ch]"
          style={{ ...display, color: C.cream, textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
          O suco ancestral que apaga a{' '}
          <span style={{ ...editorial, color: C.terraSoft, textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}>
            queimação sem rebote.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(250,246,240,0.95)', fontFamily: "'Inter Tight', sans-serif", textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}>
          Espinheira-santa, batata crua, camomila e babosa. Mesmo terreno do omeprazol (proteção, neutralização e cicatrização da mucosa), sem dependência e sem efeito rebote. Tradição indígena, benzedeira e popular brasileira com ensaios clínicos do CEME e do PubMed do lado.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: APPLE_EASE }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.9)' }}>
            <Clock size={14} style={{ color: C.terraSoft }} /> 25 min de preparo
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.9)' }}>
            <Users size={14} style={{ color: C.terraSoft }} /> 800 ml · 3 a 4 dias
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.9)' }}>
            <BookOpen size={14} style={{ color: C.terraSoft }} /> RENISUS · 8 referências
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function SucoRefluxoEspinheiraSanta() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Suco de Batata e Espinheira-santa para Refluxo e Azia (sem álcool) | Lord Junnior</title>
        <meta name="description" content="Receita ancestral indígena, popular e benzedeira para refluxo gastroesofágico e azia: espinheira-santa, batata crua, camomila e babosa. Mesmo terreno do omeprazol, sem rebote, com ensaios clínicos brasileiros." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/cozinha-funcional/suco-refluxo-espinheira-santa" />
        <meta property="og:title" content="O suco ancestral que apaga a queimação sem rebote" />
        <meta property="og:description" content="Espinheira-santa, batata, camomila e babosa. Tradição brasileira com CEME e PubMed do lado. Sem álcool, sem IBP, sem dependência." />
        <meta property="og:image" content="https://lordjunnior.com.br/og/suco-refluxo-espinheira-santa.jpg" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <html lang="pt-BR" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: 'Suco ancestral de Espinheira-santa, Batata, Camomila e Babosa para refluxo e azia',
            author: { '@type': 'Person', name: 'Lord Junnior' },
            description: 'Receita ancestral brasileira validada pelo SUS para refluxo gastroesofágico, azia e dispepsia funcional. Sem álcool.',
            image: 'https://lordjunnior.com.br/og/suco-refluxo-espinheira-santa.jpg',
            prepTime: 'PT10M', cookTime: 'PT15M', totalTime: 'PT25M',
            recipeCategory: 'Fitoterápico ancestral gastroprotetor',
            recipeCuisine: 'Indígena, popular, benzedeira e quilombola brasileira',
            keywords: 'espinheira-santa, batata crua, camomila, babosa, refluxo, azia, RENISUS, Farmácia Viva, fitoterapia brasileira, sem álcool',
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
                Antes do omeprazol,{' '}
                <span style={{ ...editorial, color: C.terracotta }}>existia a espinheira-santa.</span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                <p>
                  Refluxo e azia estão entre as queixas mais comuns na consulta clínica brasileira. A indústria farmacêutica vende bilhões em <strong style={{ color: C.terracotta }}>omeprazol, pantoprazol, esomeprazol e ranitidina</strong> todo ano, e o uso crônico de inibidores de bomba de prótons (IBPs) está associado a deficiência de B12 e magnésio, osteoporose, infecções intestinais (Clostridium difficile), pneumonia comunitária e demência em idosos, segundo metanálises recentes.
                </p>
                <p>
                  Antes desse mercado existir, povos Guarani, Kaingang e Xokleng do Sul do Brasil já preparavam infusões de "cancorosa" (espinheira-santa) para "queimação no estômago", úlcera e "fogo no peito". Avós e benzedeiras urbanas e rurais espremiam suco de batata crua em pano para "azia de gravidez". Quilombolas do Nordeste indicavam babosa para "acalmar o fogo interno". Não por superstição, porque <strong style={{ color: C.sage }}>funciona</strong>. Espinheira-santa reduz secreção ácida e protege a mucosa. Batata alcaliniza. Camomila acalma o esfíncter esofágico. Babosa cicatriza.
                </p>
                <p>
                  O <strong style={{ color: C.sage }}>Ministério da Saúde</strong>, em 2006, formalizou o que já era saber popular na Política Nacional de Plantas Medicinais e Fitoterápicos. <strong style={{ color: C.terracotta }}>Maytenus ilicifolia</strong>, <strong style={{ color: C.terracotta }}>Matricaria chamomilla</strong> e <strong style={{ color: C.terracotta }}>Aloe vera</strong> entraram na <strong style={{ color: C.sage }}>RENISUS</strong>. Ensaios clínicos brasileiros conduzidos pelo CEME (Central de Medicamentos) na década de 1980 confirmaram eficácia da espinheira-santa comparável à cimetidina em dispepsia. O ensaio de Panahi (2015) mostrou que a babosa tem eficácia comparável ao omeprazol em DRGE leve a moderada.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: `3px solid ${C.terracotta}`, color: C.sage, ...editorial }}>
                  Não é "chá da vovó para azia". É um protocolo etnofarmacológico gastroprotetor com ensaios clínicos brasileiros, RENISUS e PubMed do lado. Tradição com nome científico.
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
                  <p className="text-sm mb-8" style={{ color: C.inkSoft }}>800 ml · uso de 3 a 4 dias</p>
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
                Suco, gelatina{' '}
                <span style={{ ...editorial, color: C.terracotta }}>ou compressa morna.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: C.inkSoft }}>
                Três formas seguras, todas sem álcool, da mesma fórmula. O suco diário é a versão mais estudada cientificamente. A gelatina ajuda quem tem refluxo noturno. A compressa morna é apoio sintomático na crise de azia.
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
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terraSoft }}>Capítulo 04 · As quatro plantas</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={display}>
                Tradição,{' '}
                <span style={{ ...editorial, color: C.terraSoft }}>nome científico, RENISUS.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(250,246,240,0.78)' }}>
                Cada planta tem três camadas de validação: o uso ancestral indígena, popular, benzedeira e quilombola; a chancela oficial do SUS; e a evidência etnofarmacológica publicada em ensaios clínicos do CEME e meta-análises do PubMed.
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
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> 200 a 250 ml 2x ao dia, 20 a 30 minutos antes do almoço e do jantar</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Suco de batata sempre extraído e adicionado na hora de tomar</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Elevar cabeceira da cama 15 cm com calços nos pés</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Última refeição 3 horas antes de deitar, sem frituras à noite</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Ciclo de 14 a 28 dias, depois pausa de 7 a 10 dias e reavaliação</li>
                </ul>
              </motion.div>

              <motion.div {...fade(0.1)} className="p-8 md:p-10 rounded-3xl"
                style={{ backgroundColor: C.sand, border: `1px solid ${C.borderLight}` }}>
                <AlertTriangle size={32} style={{ color: '#a64a1f' }} className="mb-6" />
                <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>O que não esperar</h3>
                <ul className="space-y-4 text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Suspender omeprazol de uma vez por conta própria (rebote ácido grave)</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Resolver esofagite erosiva grau C ou D sem gastroenterologista</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Funcionar combinado a refeição noturna pesada e álcool</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Substituir investigação de Helicobacter pylori ou hérnia de hiato</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Usar babosa sem retirar a aloína (risco hepático e laxativo)</li>
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
                Documentos oficiais do SUS, marcos regulatórios brasileiros, ensaios clínicos do CEME e meta-análises indexadas no PubMed. Sem folclore, sem chute, sem influencer.
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
                A azia é só a porta.{' '}
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
              Não é "chá da vovó para azia". É um protocolo etnofarmacológico gastroprotetor, com PubMed do lado e RENISUS no rodapé.
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
                  Este conteúdo é educativo, baseado em saber tradicional indígena, popular, benzedeira e quilombola brasileiro, em documentos oficiais do SUS (Política Nacional de Plantas Medicinais e Fitoterápicos, RENISUS, Farmácias Vivas), em monografias da Farmacopeia Brasileira (Anvisa) e em literatura clínica indexada no PubMed (ensaios clínicos brasileiros do CEME, meta-análises de espinheira-santa, babosa e camomila). Não substitui exame, diagnóstico, prescrição ou acompanhamento médico. Refluxo crônico que não cede em 28 dias exige investigação médica, endoscopia e pesquisa de Helicobacter pylori. Quem usa inibidor de bomba de prótons (omeprazol, pantoprazol) NUNCA deve suspender por conta própria por risco de rebote ácido grave. Gestantes, lactantes, crianças menores de 6 anos e portadores de doença hepática ou obstrução intestinal devem buscar orientação profissional antes de iniciar.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
