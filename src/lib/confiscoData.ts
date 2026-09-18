export const confiscoFaqData = [
  {
    question: "O que foi o confisco do Plano Collor?",
    answer: "Em 16 de março de 1990, o presidente Fernando Collor de Mello assinou uma Medida Provisória que bloqueou aproximadamente 80% de toda a liquidez do sistema financeiro brasileiro. Contas correntes, poupanças e aplicações financeiras acima de NCz$ 50.000 foram congeladas por 18 meses. O governo confiscou o equivalente a US$ 80 bilhões da população sem aviso prévio.",
  },
  {
    question: "O governo devolveu o dinheiro confiscado?",
    answer: "Oficialmente, o governo prometeu devolver o dinheiro bloqueado em 18 meses com correção monetária. Na prática, a devolução foi feita em parcelas ao longo de anos, com correção abaixo da inflação real. O poder de compra devolvido foi uma fração do valor original, configurando uma transferência forçada de riqueza da população para o Estado.",
  },
  {
    question: "O confisco da poupança pode acontecer novamente?",
    answer: "O artigo 62 da Constituição Federal, que permitiu o confisco via Medida Provisória em 1990, nunca foi revogado. O mecanismo jurídico continua ativo. Qualquer presidente pode, tecnicamente, usar o mesmo instrumento legal para bloquear ativos financeiros da população.",
  },
  {
    question: "Como o Bitcoin protege contra confisco governamental?",
    answer: "O Bitcoin é um ativo descentralizado que não depende de bancos ou instituições governamentais para ser armazenado. Quando mantido em autocustódia (com suas próprias chaves privadas), nenhum governo pode bloquear, congelar ou confiscar seus bitcoins. É a primeira tecnologia na história que permite soberania total sobre o próprio patrimônio.",
  },
  {
    question: "Quantas pessoas foram afetadas pelo Plano Collor?",
    answer: "Milhões de brasileiros foram diretamente afetados. O confisco bloqueou aproximadamente 80% de toda a liquidez do sistema financeiro. Pessoas perderam acesso a economias de uma vida inteira, empresários não conseguiam pagar salários, pequenos negócios fecharam e houve relatos de suicídios e mortes por falta de acesso a tratamentos médicos.",
  },
];

export const confiscoArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Confisco de 1990: A História Real do Plano Collor",
  description: "Em 16 de março de 1990, o governo brasileiro confiscou 80% do dinheiro da população com o Plano Collor. O confisco da poupança bloqueou US$ 80 bilhões.",
  author: {
    "@type": "Person",
    name: "Lord Junnior",
  },
  publisher: {
    "@type": "Organization",
    name: "Lord Junnior",
  },
  datePublished: "2026-03-07",
  dateModified: "2026-03-07",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://lordjunnior.com.br/confisco-1990",
  },
  keywords: "plano collor confisco, confisco poupança 1990, confisco da poupança brasil, história plano collor",
};

export const confiscoFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: confiscoFaqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const confiscoBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Início",
      item: "https://lordjunnior.com.br/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Alertas de Soberania",
      item: "https://lordjunnior.com.br/alertas",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Confisco de 1990",
      item: "https://lordjunnior.com.br/confisco-1990",
    },
  ],
};
