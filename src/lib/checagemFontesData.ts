export const origemQuestions = [
  { title: 'Quem assina?', text: 'Procure autor, instituição, expediente, contato e política de correção. Um perfil identificado oferece uma pista de responsabilidade, não um certificado de verdade. Conteúdo anônimo pode ser relevante, mas precisa de evidências verificáveis por outros meios.' },
  { title: 'Onde está a fonte primária?', text: 'Decisão judicial, artigo científico, base de dados, edital, gravação integral ou código do projeto. Anote título, data, versão e trecho que sustenta a afirmação. “Um estudo comprovou” sem nome, método e referência não permite verificar nada.' },
  { title: 'O autor estava em condição de saber?', text: 'Diferencie quem presenciou, quem mediu, quem teve acesso ao registro e quem apenas comenta. Formação ajuda a avaliar competência, mas um título não substitui evidência nem torna alguém especialista em todas as áreas.' },
  { title: 'O que o autor ganha com isso?', text: 'Venda, comissão, audiência, voto, doação ou disputa reputacional podem influenciar o recorte. Um interesse não torna a afirmação automaticamente falsa. Ele orienta quais documentos, conflitos de interesse e comparações independentes você deve procurar.' },
  { title: 'Como o autor lida com erros?', text: 'Examine se há atualizações datadas, correções visíveis e referências acessíveis. Um erro isolado não invalida tudo; erros repetidos sem correção enfraquecem a confiança. Ausência de histórico também não prova fraude: significa que há menos elementos para avaliar.' },
];

export const contextoTests = [
  { title: 'Data: publicação não é ocorrência', text: 'Separe a data do fato, a coleta dos dados, a publicação e a última atualização. Uma matéria republicada hoje pode descrever uma regra revogada ou uma pesquisa antiga. Em segurança digital, confira também versão do sistema, modelo do aparelho e situação atual da falha.' },
  { title: 'Lugar: a cena combina com a alegação?', text: 'Idioma, placas, arquitetura, paisagem e clima ajudam a levantar hipóteses, mas não fecham uma localização sozinhos. Procure registros independentes do mesmo evento e imagens mais abertas. Uma foto de outro país pode ser autêntica e não demonstrar nada sobre o lugar citado na legenda.' },
  { title: 'Recorte: o que ficou de fora?', text: 'Leia parágrafos anteriores e posteriores, perguntas feitas ao entrevistado, notas de rodapé e condições de aplicação. Um vídeo pode manter as palavras e eliminar a ressalva. Um título pode transformar possibilidade em certeza ou associação em causa.' },
  { title: 'Escala: percentual de quê?', text: 'Identifique base absoluta, período, denominador e unidade. Veja se o eixo do gráfico começa em zero, se houve mudança de método e se a comparação usa populações equivalentes. Um eixo recortado não é sempre errado, mas precisa ser explícito e não induzir uma leitura desproporcional.' },
];

export const vieses = [
  { title: 'Viés de confirmação', text: 'Quando a notícia confirma o que você já acredita, o filtro costuma relaxar. Procure a melhor evidência contrária e pergunte: eu aceitaria esse mesmo padrão de prova se a conclusão favorecesse meu adversário?' },
  { title: 'Familiaridade pela repetição', text: 'Uma frase repetida pode parecer mais confiável apenas por se tornar familiar. Rastreie a origem das cópias. Dez publicações reproduzindo o mesmo comunicado continuam dependendo de uma única fonte.' },
  { title: 'Prova social aparente', text: 'Curtidas, compartilhamentos e comentários medem circulação, não verdade. Podem refletir coordenação, automação ou apenas uma emoção compartilhada. Nenhuma dessas métricas substitui o documento que sustenta a afirmação.' },
  { title: 'Autoridade fora de escopo', text: 'Jaleco, estúdio, cargo ou currículo podem impressionar. Verifique a especialidade e o que foi efetivamente demonstrado. Uma opinião de autoridade continua sendo opinião quando não vem acompanhada de evidências adequadas.' },
];

export const checklistItems = [
  'Identifiquei a afirmação exata, sem confundir fato com opinião.',
  'Sei quem publicou e distingui o autor de quem apenas compartilhou.',
  'Localizei o registro primário ou anotei claramente que ele falta.',
  'Conferi o domínio e evitei links recebidos em mensagens suspeitas.',
  'Separei data do fato, publicação, atualização e versão aplicável.',
  'Li o contexto completo, incluindo método, recortes e limitações.',
  'Busquei confirmação independente e rastreei fontes que só se repetem.',
  'Considerei o dano possível, minhas emoções e as dúvidas que restam.',
];

export const tools = [
  { name: 'Google Lens', href: 'https://lens.google/', use: 'Pesquisar uma imagem inteira ou um detalhe para encontrar versões e contextos associados.', limit: 'Resultados visualmente semelhantes não provam a origem nem a autenticidade. Compare a cena, a data e a página que publicou.' },
  { name: 'TinEye', href: 'https://tineye.com/', use: 'Localizar correspondências de uma imagem e versões modificadas encontradas pelo serviço.', limit: 'O índice não cobre toda a internet. A captura mais antiga encontrada não é necessariamente a primeira publicação.' },
  { name: 'Wayback Machine', href: 'https://web.archive.org/', use: 'Consultar capturas antigas de uma página e comparar versões preservadas.', limit: 'Pode haver lacunas, arquivos ausentes e conteúdo dinâmico não capturado. Sem captura não significa que a página nunca existiu.' },
  { name: 'Registro.br', href: 'https://registro.br/tecnologia/ferramentas/whois/', use: 'Consultar informações disponíveis sobre domínios .br, como registro e datas.', limit: 'Alguns dados pessoais não ficam públicos. Um domínio antigo também pode mudar de controle ou ser comprometido.' },
  { name: 'InVID-WeVerify', href: 'https://weverify.eu/verification-plugin/', use: 'Extrair quadros-chave de vídeos compatíveis e apoiar busca reversa e inspeção de mídia.', limit: 'Recursos variam conforme a plataforma. Um detector ou artefato visual isolado não constitui laudo de falsificação.' },
  { name: 'Google Fact Check Explorer', href: 'https://toolbox.google.com/factcheck/explorer', use: 'Encontrar checagens já publicadas sobre uma afirmação.', limit: 'Abra os documentos citados e veja se a checagem trata da mesma versão da alegação. Ausência de resultado não confirma a notícia.' },
];

export const referencias = [
  { name: 'Digital Inquiry Group: leitura lateral', href: 'https://cor.inquirygroup.org/curriculum/collections/teaching-lateral-reading/', text: 'Investigação da fonte fora da página que está sendo avaliada.' },
  { name: 'TinEye: perguntas frequentes', href: 'https://tineye.com/faq', text: 'Funcionamento, correspondências e limites da busca reversa.' },
  { name: 'Internet Archive: informações sobre a Wayback Machine', href: 'https://help.archive.org/help/wayback-machine-general-information/', text: 'Capturas, arquivos preservados e limitações de acesso.' },
  { name: 'Registro.br: consulta WHOIS', href: 'https://registro.br/tecnologia/ferramentas/whois/', text: 'Consulta oficial de informações disponíveis de domínios .br.' },
  { name: 'TSE: pesquisas eleitorais', href: 'https://www.tse.jus.br/eleicoes/pesquisas-eleitorais', text: 'Consulta de pesquisas registradas e regras aplicáveis à divulgação.' },
  { name: 'InVID-WeVerify: plugin de verificação', href: 'https://weverify.eu/verification-plugin/', text: 'Ferramentas auxiliares para inspeção de imagens e vídeos.' },
];

export const fontesFaq = [
  { q: 'Checar fontes é uma forma de censura?', a: 'Aqui, checar significa examinar evidências antes de acreditar, agir ou compartilhar. Isso não impede ninguém de falar. Você pode discordar de uma interpretação e, ao mesmo tempo, exigir que os fatos usados para sustentá-la sejam verificáveis. Uma conclusão responsável explicita método, documentos e limites, sem pedir obediência.' },
  { q: 'Agências de checagem também podem ter viés?', a: 'Sim. Seleção de pautas, linguagem e interpretação podem refletir escolhas editoriais, e organizações podem errar. Use Lupa, Aos Fatos, Comprova, Estadão Verifica ou Fato ou Fake como pistas de investigação, não como substitutos do seu julgamento. Abra as fontes citadas, confira a versão da alegação e compare a metodologia.' },
  { q: 'E se a fonte oficial estiver errada ou omitindo algo?', a: 'Um documento oficial demonstra o que a instituição registrou ou declarou. Não prova sozinho que o registro é completo, imparcial ou correto. Compare metodologia, séries históricas, auditorias e dados independentes. Para contestar o documento, apresente evidência que trate do mesmo objeto e período, em vez de substituir uma autoridade por outra.' },
  { q: 'Dá para verificar tudo em 60 segundos?', a: 'Não. Um minuto pode servir para uma triagem inicial: identificar a afirmação, procurar a origem e perceber uma data incompatível. Autenticar mídia, conferir pesquisa ou avaliar uma orientação médica pode exigir muito mais tempo e ajuda especializada. O cronômetro não determina a confiabilidade; a suficiência da evidência e o risco determinam.' },
  { q: 'Como conversar com um familiar que compartilhou um boato?', a: 'Comece pela preocupação em comum e, quando fizer sentido, converse em privado: “Também achei preocupante. Você tem o link original? Encontrei este documento com outra data.” Discuta a afirmação, não a inteligência da pessoa. Se houver risco imediato para outras pessoas no grupo, uma correção pública objetiva pode ser necessária, sem humilhação e com a fonte acessível.' },
  { q: 'Posso usar inteligência artificial para checar fontes?', a: 'Como apoio para organizar perguntas, localizar termos de busca e comparar trechos, sim. Como árbitro de verdade, não. Uma resposta fluente pode conter referências inventadas, páginas inexistentes ou citações distorcidas. Abra cada documento, confirme a passagem e confira a data. Não envie seed phrase, documentos pessoais ou material confidencial a serviços de IA.' },
  { q: 'Se a busca reversa não encontrar nada, a imagem é falsa?', a: 'Não. A imagem pode ser nova, privada, pouco indexada ou ter sido modificada de um modo que a ferramenta não reconheça. Nenhum resultado significa apenas que aquele serviço não encontrou correspondência naquela consulta. Procure o publicador original, outras versões e registros independentes do evento.' },
  { q: 'Como aplicar esse método ao próprio site?', a: 'Use o mesmo rigor aqui. Confira links oficiais, versões, limitações e a diferença entre explicação e recomendação. Antes de movimentar Bitcoin, mudar uma configuração crítica ou tomar uma decisão de saúde, confirme a orientação na documentação atual e procure ajuda competente quando o risco exigir. Identidade do autor não substitui evidência.' },
  { q: 'Preciso esperar 24 horas antes de compartilhar?', a: 'Não existe um prazo universal que transforme uma afirmação em verdade. Espere quando a urgência for artificial e houver tempo para verificar. Em uma emergência real, priorize canais oficiais e medidas seguras; não atrase atendimento ou proteção para cumprir um cronômetro. Quando a evidência continuar insuficiente, não trate a alegação como fato confirmado.' },
];