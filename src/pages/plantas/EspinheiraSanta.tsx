import PlantaIndividualLayout, { PlantaIndividualData } from '@/components/plantas/PlantaIndividualLayout';
import heroImg from '@/assets/plantas-individuais/espinheira-santa-hero.webp';
import comparativoImg from '@/assets/plantas-individuais/espinheira-santa-comparativo.webp';

const data: PlantaIndividualData = {
  slug: 'espinheira-santa',
  nome: 'Espinheira-Santa',
  cientifico: 'Maytenus ilicifolia Mart. ex Reissek',
  familia: 'Celastraceae',
  sistema: 'Gástrico e digestivo',
  capituloLabel: 'Plantas Subutilizadas, Ficha 03',
  heroImage: heroImg,
  comparativoImage: comparativoImg,
  metaTitle: 'Espinheira-Santa (Maytenus ilicifolia): Proteção Gástrica | Ficha',
  metaDescription: 'Espinheira-Santa regenera mucosa gástrica, reduz acidez e protege contra úlcera. Fitoquímica, dose, janela, contraindicações e identificação botânica.',
  keywords: 'espinheira santa, Maytenus ilicifolia, gastrite natural, úlcera gástrica, refluxo, mucosa estômago, taninos, friedelinas, fitoterapia gástrica, Anvisa',
  heroTitle: <>A planta com <span className="text-emerald-400">eficácia gástrica</span> reconhecida pela Anvisa.</>,
  heroLead: 'Maytenus ilicifolia é um dos raros casos de fitoterápico com fitomedicamento registrado pela Anvisa para gastrite e úlcera. Taninos, triterpenos e flavonoides que regeneram mucosa, modulam acidez e protegem o estômago. Ficha técnica completa abaixo.',
  reframing: {
    paragrafos: [
      'A Espinheira-Santa é uma das plantas brasileiras com maior nível de evidência científica para um problema epidêmico: gastrite, refluxo e úlcera péptica. A Anvisa reconhece a indicação terapêutica e há fitomedicamento registrado em farmácia, com bula formal.',
      'O paradoxo é cruel: a planta funciona tão bem que virou fitomedicamento caro, enquanto a infusão da folha continua disponível por preço quase nulo em qualquer herbanário. A diferença entre os dois não está na planta, está no marketing.',
      'Esta ficha entrega o que a bula não detalha: princípio ativo, dose, janela, sinergia, contraindicação real e como identificar a planta certa em meio a falsificações comuns no mercado brasileiro.',
    ],
  },
  fitoquimica: {
    intro: 'A ação gastroprotetora da Espinheira-Santa vem da combinação entre taninos (efeito de adstringência local), triterpenos (regeneração da mucosa) e flavonoides (proteção antioxidante).',
    compostos: [
      { nome: 'Taninos catéquicos', acao: 'Formam película protetora sobre a mucosa lesada, reduzem inflamação local e bloqueiam a ação irritativa do ácido sobre úlceras existentes.' },
      { nome: 'Friedelina e friedelinol', acao: 'Triterpenos com ação cicatrizante documentada sobre mucosa gástrica, estimulam regeneração de células epiteliais.' },
      { nome: 'Flavonoides (kaempferol, quercitrina)', acao: 'Antioxidantes que protegem células gástricas contra dano oxidativo gerado por anti-inflamatórios e refluxo crônico.' },
      { nome: 'Maitenina', acao: 'Triterpeno com ação moduladora sobre proliferação celular gástrica, estudada por seu potencial coadjuvante em lesões pré-malignas.' },
    ],
    farmacocinetica: 'Os taninos atuam diretamente na mucosa por contato local antes mesmo de qualquer absorção sistêmica. Os triterpenos têm absorção parcial e ação local prolongada. A combinação justifica o uso antes das refeições, quando o estômago está vazio e o contato é mais direto com a mucosa.',
  },
  funcaoBiologica: [
    { titulo: 'Regenera mucosa gástrica', descricao: 'Estimula a renovação de células epiteliais do estômago, acelerando cicatrização de úlceras leves a moderadas.' },
    { titulo: 'Reduz acidez funcional', descricao: 'Modula a secreção ácida do estômago sem bloqueio total, evitando os efeitos colaterais dos inibidores de bomba de prótons.' },
    { titulo: 'Protege contra agressores', descricao: 'Forma película protetora sobre a mucosa, blindando contra álcool, anti-inflamatórios e refluxo recorrente.' },
    { titulo: 'Modula H. pylori', descricao: 'Estudos mostram efeito coadjuvante na modulação da carga de Helicobacter pylori, sem substituir antibioticoterapia.' },
  ],
  posologia: {
    parteUsada: 'Folhas secas (jamais usar folhas frescas em alta concentração, podem irritar).',
    preparo: 'Infusão: 1 colher de sopa (cerca de 2 g) em 200 ml de água fervente, abafar 10 a 15 minutos, coar.',
    dose: '1 xícara (150 a 200 ml) por tomada.',
    frequencia: '2 a 3 vezes ao dia, sempre 30 minutos antes das refeições principais.',
    janela: '30 a 60 dias seguidos para protocolo de regeneração de mucosa.',
    pausa: '15 dias de pausa antes de novo ciclo. Para uso de manutenção, alternar com chás neutros.',
  },
  identificacao: {
    autentica: {
      titulo: 'Espinheira-Santa autêntica',
      marcadores: [
        'Folhas pequenas, coriáceas (de textura firme), com brilho leve na face superior.',
        'Margem da folha com espinhos pequenos e firmes (parecendo um azevinho miniatura).',
        'Cor verde escura intensa, com nervura central marcada.',
        'Sabor levemente adstringente ao mascar a folha (efeito tânico).',
      ],
    },
    falsa: {
      titulo: 'Risco de confusão grave',
      alerta: 'A Sorocea bonplandii é vendida frequentemente como Espinheira-Santa em feiras e herbanários informais. Tem folhas LISAS, sem espinhos, e NÃO possui ação gastroprotetora. Outras espécies do gênero Maytenus podem ter composição diferente. Sem espinhos na borda da folha, NÃO é Espinheira-Santa. Compre apenas em farmácia de manipulação séria ou herbanários com identificação científica do lote.',
    },
  },
  contraindicacoes: [
    'Gestação (relato de efeito sobre musculatura uterina).',
    'Lactação (passagem para o leite e redução de produção láctea).',
    'Crianças abaixo de 6 anos.',
    'Hipotensão grave.',
    'Pacientes em uso de imunossupressores sem orientação.',
  ],
  interacoes: [
    'Inibidores de bomba de prótons (omeprazol, pantoprazol): pode reduzir necessidade da medicação ao longo do tempo, exigindo ajuste médico.',
    'Anti-inflamatórios não esteroidais: efeito gastroprotetor pode mascarar dano da medicação.',
    'Anti-hipertensivos: leve potencialização de efeito hipotensor.',
    'Hipoglicemiantes: relato isolado de redução glicêmica.',
  ],
  errosComuns: [
    'Comprar de fonte não identificada e receber Sorocea bonplandii (sem ação).',
    'Usar folha fresca em alta concentração, irritando a mucosa.',
    'Tomar depois das refeições, perdendo o contato direto com a mucosa.',
    'Suspender medicação prescrita por conta própria achando que a planta substitui.',
    'Não respeitar janela de 30 a 60 dias, esperando efeito imediato em uma semana.',
  ],
  faq: [
    { question: 'Espinheira-Santa cura úlcera?', answer: 'Auxilia a cicatrização de úlceras leves a moderadas e há fitomedicamento registrado pela Anvisa com essa indicação. Em úlceras associadas a Helicobacter pylori, NÃO substitui o tratamento antibiótico padrão. Em úlceras simples por excesso de ácido ou uso de anti-inflamatórios, pode ser tratamento principal sob orientação. Diagnóstico endoscópico é obrigatório antes de qualquer protocolo.' },
    { question: 'Posso usar Espinheira-Santa todos os dias por meses?', answer: 'Sim, é uma das poucas plantas medicinais com perfil seguro para uso prolongado. O protocolo padrão é de 30 a 60 dias seguidos com pausa de 15 dias. Estudos clínicos suportam segurança em até 90 dias contínuos sob acompanhamento. Mesmo assim, ciclos com pausa preservam a sensibilidade do organismo ao princípio ativo.' },
    { question: 'Substitui omeprazol?', answer: 'Em casos leves a moderados, pode substituir gradualmente sob orientação médica. Em casos graves ou crônicos com refluxo erosivo, atua como coadjuvante e permite redução progressiva da dose do inibidor de bomba. NUNCA suspender medicação prescrita por conta própria. Coordenar com médico que aceite plano de transição.' },
    { question: 'Tem efeito sobre H. pylori?', answer: 'Há estudos mostrando ação modulatória sobre a carga bacteriana, mas o efeito não é suficiente para erradicação. Em infecção comprovada por H. pylori, o tratamento padrão (tríplice ou quádruplo esquema antibiótico) continua sendo o padrão de cuidado. A Espinheira-Santa entra como suporte de mucosa durante e após o tratamento.' },
    { question: 'Crianças podem tomar?', answer: 'Acima de 6 anos, em dose reduzida (metade da dose adulta) e sob orientação profissional. Abaixo de 6 anos, evitar. Em adolescentes com gastrite funcional, pode ser usada em ciclos curtos (21 dias) com pausa.' },
    { question: 'Como saber se a planta que comprei é verdadeira?', answer: 'O marcador definitivo são os espinhos pequenos e firmes na borda das folhas. Folha lisa, sem espinhos, NÃO é Espinheira-Santa, é provavelmente Sorocea bonplandii (planta sem efeito gastroprotetor). Compre em farmácia de manipulação com certificado de lote e nome científico (Maytenus ilicifolia) declarado no rótulo.' },
  ],
};

export default function EspinheiraSanta() {
  return <PlantaIndividualLayout data={data} />;
}