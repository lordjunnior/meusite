import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AlertTriangle } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';
import RapeHookCard from '@/components/RapeHookCard';
import SaudePreventivaHero from '@/components/editorial/SaudePreventivaHero';
import { Inflamacao, PilarSection, Protocolo, Faq, FooterNav } from '@/components/editorial/SaudePreventivaBody';
import folhas from '@/assets/saude/sp-ref-folhas.png';
import imgSol from '@/assets/saude/hero-sol.webp';
import imgSono from '@/assets/saude/hero-sono.webp';
import imgMovimento from '@/assets/saude/hero-movimento.webp';
import imgAlimentacao from '@/assets/saude/hero-alimentacao.webp';
import imgCortisol from '@/assets/saude/hero-cortisol.webp';

interface Pilar {
  numero: string;
  titulo: string;
  destaque: string;
  imagem: string;
  legenda: string;
  abertura: string;
  beneficios: string[];
  riscos: string[];
  fechamento?: string;
}

const PILARES: Pilar[] = [
  {
    numero: "01",
    titulo: "Exposição Solar",
    destaque: "imune",
    imagem: imgSol,
    legenda: "Quinze minutos de sol direto pela manhã regulam mais sistemas que qualquer suplemento isolado",
    abertura: "A vitamina D não é um nutriente. É um hormônio esteroide que regula a expressão de mais de 1.000 genes ligados a imunidade, humor e metabolismo ósseo.",
    beneficios: [
      "Reduz citocinas inflamatórias circulantes",
      "Melhora resposta antiviral inata",
      "Regula expressão genética imunológica",
      "Sincroniza ritmo circadiano e produção de melatonina",
    ],
    riscos: [
      "Infecções recorrentes",
      "Estados depressivos persistentes",
      "Osteopenia e perda mineral",
      "Fadiga crônica sem causa aparente",
    ],
    fechamento: "Filtro solar nos primeiros 15 minutos de exposição matinal anula praticamente toda a síntese cutânea. Pele exposta, sem química, durante a janela solar baixa.",
  },
  {
    numero: "02",
    titulo: "Sono Reparador",
    destaque: "homeostase",
    imagem: imgSono,
    legenda: "Sem sono profundo, nenhuma estratégia anti-inflamatória se sustenta. Esta é a base inegociável.",
    abertura: "Durante o sono profundo (N3) o sistema glinfático cerebral expulsa proteínas neurotóxicas acumuladas no dia. Sem essa janela, o cérebro acumula resíduos.",
    beneficios: [
      "Liberação de hormônio do crescimento",
      "Reparação celular sistêmica",
      "Regulação completa do eixo HPA",
      "Consolidação de memória e plasticidade neural",
    ],
    riscos: [
      "IL-6 cronicamente elevada",
      "Cortisol matinal alterado",
      "PCR ultrasensível em ascenção",
      "Resistência à insulina acelerada",
    ],
    fechamento: "Quarto absolutamente escuro, temperatura entre 18 e 20 graus, zero exposição a luz azul nas duas horas anteriores ao deitar. Higiene de sono é estrutural, não comportamental.",
  },
  {
    numero: "03",
    titulo: "Movimento Estruturado",
    destaque: "anti-inflamatório",
    imagem: imgMovimento,
    legenda: "Movimento moderado e consistente vence treinos heroicos sem recuperação",
    abertura: "Exercício moderado libera mioquinas pelas fibras musculares. Essas moléculas funcionam como anti-inflamatórios sistêmicos endógenos, sem efeito colateral.",
    beneficios: [
      "Redução documentada de TNF-alfa",
      "Sensibilidade à insulina restaurada",
      "Biogênese mitocondrial aumentada",
      "Redução de gordura visceral inflamatória",
    ],
    riscos: [
      "Excesso sem recuperação eleva inflamação",
      "Overtraining suprime função imune",
      "Cardio crônico sem força perde músculo",
      "Falta de movimento acelera senescência",
    ],
    fechamento: "Caminhada diária mais dois blocos de força semanais batem qualquer plano de academia genérico. Constância vence intensidade.",
  },
  {
    numero: "04",
    titulo: "Alimentação Funcional",
    destaque: "metabolismo",
    imagem: imgAlimentacao,
    legenda: "70% do sistema imune está ligado ao intestino. Ali se decide a inflamação basal do corpo inteiro.",
    abertura: "Picos glicêmicos pós-refeição geram estresse oxidativo cumulativo. Cada pico repetido empurra o corpo para resistência insulínica e inflamação de baixo grau.",
    beneficios: [
      "Proteína antes do carboidrato achata picos",
      "Fibras solúveis nutrem microbiota",
      "Caminhada de 10 minutos pós-refeição",
      "Fermentados naturais regulam disbiose",
    ],
    riscos: [
      "Carboidrato isolado dispara glicose",
      "Ultraprocessados destroem microbiota",
      "Adoçantes artificiais desregulam saciedade",
      "Jejum mal aplicado piora cortisol",
    ],
    fechamento: "Magnésio, zinco, ômega 3, vitamina C e curcumina formam o piso de micronutrição anti-inflamatória. Sempre dentro de faixa segura, sem megadoses cegas.",
  },
  {
    numero: "05",
    titulo: "Controle de Cortisol",
    destaque: "vagal",
    imagem: imgCortisol,
    legenda: "Cortisol cronicamente elevado sabota toda estratégia. Sem regulação vagal, o corpo permanece em alerta.",
    abertura: "O eixo HPA regula a resposta ao estresse. Quando ativado de forma crônica, o cortisol elevado dissolve massa muscular, acumula gordura visceral e suprime imunidade adquirida.",
    beneficios: [
      "Respiração nasal lenta a 4 a 6 ciclos por minuto",
      "Caminhada matinal ao ar livre",
      "Exposição solar matinal regulando ritmo",
      "Sono regular com horário consistente",
    ],
    riscos: [
      "Resistência à insulina progressiva",
      "Catabolismo muscular acelerado",
      "Gordura abdominal hormonal",
      "Supressão imune adquirida",
    ],
    fechamento: "Estimulação vagal via respiração diafragmática lenta é o atalho mais subestimado. Dois blocos de cinco minutos por dia alteram a variabilidade da frequência cardíaca em poucas semanas.",
  },
];

const FAQ = [
  {
    q: "Por onde começar se eu nunca cuidei de nada disso?",
    a: "Sono e exposição solar matinal. Esses dois pilares destravam todos os outros. Sem sono, não há recuperação muscular. Sem sol matinal, o ritmo circadiano fica desregulado e o sono nunca aprofunda.",
  },
  {
    q: "Suplementação substitui essa rotina?",
    a: "Não. Suplemento é complemento. Vitamina D em cápsula sem exposição solar real entrega o nutriente isolado, sem o sinal hormonal completo que o corpo lê quando a pele recebe UVB direto.",
  },
  {
    q: "Quanto tempo até notar mudança real?",
    a: "Marcadores subjetivos como energia, humor e qualidade do sono mudam em duas a quatro semanas. Marcadores laboratoriais como PCR, glicemia e perfil lipídico levam de 8 a 12 semanas de consistência.",
  },
  {
    q: "Posso aplicar tudo isso com doença crônica diagnosticada?",
    a: "Cada pilar exige adaptação individual. Diabéticos, autoimunes, cardiopatas e gestantes precisam de orientação médica antes de modificar exposição solar prolongada, jejum, suplementação ou intensidade de exercício.",
  },
  {
    q: "Existe um marcador único que indica blindagem?",
    a: "Não existe métrica única. PCR ultrasensível abaixo de 1, HOMA-IR abaixo de 1.5, vitamina D entre 50 e 80 ng/ml, variabilidade de frequência cardíaca dentro da faixa de idade e sono profundo acima de 90 minutos por noite formam o painel mínimo.",
  },
];

const SaudePreventiva = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "name": "Saúde Preventiva: Blindagem Imunológica e Anti-Inflamatória",
        "url": "https://lordjunnior.com.br/soberania-organica/saude-preventiva",
        "description": "Cinco pilares de soberania biológica: sol, sono, movimento, alimentação e cortisol. Protocolo técnico contra inflamação crônica.",
        "lastReviewed": "2026-04-20",
        "medicalAudience": "Patients",
        "about": [
          { "@type": "Thing", "name": "Inflamação crônica" },
          { "@type": "Thing", "name": "Saúde preventiva" },
          { "@type": "Thing", "name": "Eixo HPA e cortisol" },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQ.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Saúde Preventiva: 5 Pilares de Blindagem Imunológica | Lord Junnior</title>
        <meta name="description" content="Sol, sono, movimento, alimentação e cortisol: protocolo técnico de saúde preventiva contra inflamação crônica. Sem dependência do sistema convencional." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/saude-preventiva" />
        <meta property="og:title" content="Saúde Preventiva: 5 Pilares de Blindagem Imunológica" />
        <meta property="og:description" content="Cinco pilares biológicos validados contra inflamação crônica e disfunção metabólica." />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <SaudePreventivaHero />

      <div className="sp-body">
      <Inflamacao folhas={folhas} />
      {PILARES.map((p, i) => <PilarSection key={p.numero} p={p} i={i} />)}
      <Protocolo />
      <Faq items={FAQ} />

      <section className="sp-sec sp-sec-cream" style={{ paddingTop: 0 }}>
        <div className="sp-wrap">
          <div className="sp-notice">
            <AlertTriangle size={22} />
            <p style={{ margin: 0 }}><strong>Aviso legal.</strong> Este conteúdo é educacional e informativo. Não substitui avaliação médica profissional,
              diagnóstico ou tratamento. Consulte sempre um profissional de saúde antes de modificar
              sua rotina, especialmente se possui condições pré-existentes.</p>
          </div>
        </div>
      </section>

      {/* RAPÉ HOOK */}
      <section className="sp-sec sp-sec-black" style={{ paddingBlock: 64 }}>
        <div className="sp-wrap">
          <RapeHookCard
            variant="saude"
            title="RAPÉ: Modulação Vagal Ancestral"
            hook="Antes da meditação virar app, povos amazônicos já regulavam o eixo HPA com um pó cerimonial. Não é misticismo, é bioquímica do nervo vago documentada em literatura técnica. O dossiê está aqui."
          />
        </div>
      </section>

      <FooterNav />
      </div>

      <MicroCtaResistencia variant="saude" />
      <ScrollToTop />
    </div>
  );
};

export default SaudePreventiva;
