import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import { ArrowLeft, Shield, AlertTriangle, ArrowRight, DollarSign, Wallet, Lock, CheckCircle, ExternalLink, Smartphone, Eye, ShieldCheck, Bluetooth, Key, Banknote, Globe, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReadingTime from "@/components/ReadingTime";
import ShareButtons from "@/components/ShareButtons";
import MobileNav from "@/components/MobileNav";
import SovereignDisclaimer from "@/components/SovereignDisclaimer";
import { ChapterBlock, MacroStep, DollarHero, Infrastructure, DollarPanels, OperationalPosition, DollarFaq, dollarFaq } from "@/components/editorial/DolarVirtualEditorial";
import heroImg from "@/assets/dolar-virtual-hero.webp";
import reservaImg from "@/assets/dolar-virtual/estudo-reservas.jpg";
import carteiraImg from "@/assets/dolar-virtual/carteira-fisica.jpg";
import seedImg from "@/assets/dolar-virtual/backup-ptbr.jpg";
import alfredImg from "@/assets/dolar-virtual/conferencia-ptbr.jpg";
import segurancaImg from "@/assets/dolar-virtual/camadas-seguranca.jpg";
import "./dolar-virtual.css";
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como Comprar Dólar Virtual (USDT) com Jade Wallet e AlfredP2P",
  description: "Guia completo para comprar USDT (stablecoins) de forma prática usando a Jade hardware wallet e a plataforma AlfredP2P. Inclui setup da carteira, compra via Liquid Network e segurança.",
  totalTime: "PT45M",
  tool: [
    { "@type": "HowToTool", name: "Jade Hardware Wallet" },
    { "@type": "HowToTool", name: "Blockstream Green App" },
    { "@type": "HowToTool", name: "AlfredP2P" },
  ],
  step: [
    { "@type": "HowToStep", name: "Configurar a Jade Wallet", text: "Conecte a Jade via USB em um carregador, baixe o app Blockstream Green e emparelhe via Bluetooth" },
    { "@type": "HowToStep", name: "Criar carteira e anotar seed", text: "Crie uma nova carteira, anote as 12 palavras de recuperação no papel e confirme cada palavra" },
    { "@type": "HowToStep", name: "Criar PIN de proteção", text: "Defina o PIN da Jade. O PIN protege o dispositivo e não é uma 13ª palavra da seed." },
    { "@type": "HowToStep", name: "Comprar USDT no AlfredP2P", text: "Acesse alfredp2p.io, selecione USDT na rede Liquid, cole seu endereço da carteira e pague via PIX" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: dollarFaq.map(({ q, a }) => ({
    "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://lordjunnior.com.br" },
    { "@type": "ListItem", position: 2, name: "Bitcoin", item: "https://lordjunnior.com.br/bitcoin" },
    { "@type": "ListItem", position: 3, name: "Dólar Virtual (USDT)", item: "https://lordjunnior.com.br/dolar-virtual" },
  ],
};

export default function DolarVirtual() {
  return <MotionConfig reducedMotion="user"><main className="smx-page dv-page">
    <Helmet>
      <title>Como Comprar USDT: Jade, Liquid e Riscos | Dólar Virtual</title>
      <meta name="description" content="Estude como comprar USDT na Liquid com Jade e AlfredP2P. Tutorial completo, riscos do emissor e limites de privacidade do PIX, sem endosso ao ativo." />
      <link rel="canonical" href="https://lordjunnior.com.br/dolar-virtual" />
      <meta property="og:title" content="Dólar Virtual: USDT, Jade e os Riscos da Operação" />
      <meta property="og:description" content="Autocustódia não elimina o emissor. Entenda o procedimento completo e os riscos antes de operar USDT na Liquid." />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://lordjunnior.com.br/dolar-virtual" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
    <div className="dv-mobile-nav"><MobileNav /></div>
    <DollarHero />
    <Infrastructure />
    <nav data-page-toc aria-label="Capítulos do guia" className="dv-toc dv-container">
      {[['o-que-sao','Conceito'],['regulamentacao','Lastro'],['por-que-usar','Limites'],['jade-wallet','Jade'],['comprando-usdt','P2P'],['seguranca','Segurança'],['faq','Dúvidas']].map(([id,title],i)=><a key={id} href={`#${id}`}><span>0{i+1}</span>{title}<ArrowRight size={14}/></a>)}
    </nav>
    <div className="dv-container dv-reading"><ReadingTime minutes={14}/><ShareButtons title="Como Comprar Dólar Virtual (USDT)"/></div>
    <OperationalPosition />
    <section className="dv-warning dv-band" aria-labelledby="pix-alerta"><div className="dv-container dv-warning-grid">
      <div><span className="dv-kicker"><AlertTriangle size={18}/> Transparência antes da operação</span><h2 id="pix-alerta">PIX NÃO É PRIVADO.<br/>NÃO É ANÔNIMO.</h2></div>
      <div className="dv-prose"><p>O método demonstrado neste guia utiliza <strong>PIX como forma de pagamento</strong>, vinculado à sua identidade bancária e com registros rastreáveis. Não existe anonimato real ao usar PIX.</p><p>Este conteúdo foi criado a pedido de seguidores no Instagram. O objetivo é <strong>educação e estudo</strong>, não uma rota de privacidade.</p><Button asChild variant="link" className="dv-text-link"><Link to="/comprar-bitcoin-com-privacidade">Estudar Bitcoin via RoboSats + Tor <ArrowRight/></Link></Button></div>
    </div></section>
    <DollarPanels />
          <ChapterBlock
            id="o-que-sao"
            phase="Capítulo 01"
            title="O QUE SÃO STABLECOINS?"
            icon={DollarSign}
            image={reservaImg}
            imageAlt="Representação visual de stablecoins atreladas ao dólar americano"
            index={0}
          >
            <p>
              Imagine que você pode pegar uma nota de dólar e criar um equivalente digital, um token que <span className="text-foreground font-medium">busca acompanhar o valor</span> do dólar no mundo físico.
            </p>
            <p>
              Isso são as <span className="text-primary font-semibold">stablecoins</span>. No caso do USDT (Tether), cada unidade busca a paridade de 1:1 com o dólar americano. Diferente do Bitcoin, o USDT foi desenhado para reduzir a oscilação frente ao dólar, mas pode perder essa paridade. Esse é o objetivo de quem quer <span className="text-foreground font-medium">entrar no ecossistema cripto sem enfrentar a volatilidade</span>.
            </p>
            <p>
              É uma ferramenta de liquidez denominada em dólar, não uma reserva soberana. A carteira própria reduz a dependência da custódia de uma corretora, mas não elimina o emissor, a federação da Liquid, o risco de perda de paridade ou a correlação de dados.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: DollarSign, title: "Paridade 1:1", desc: "Meta de 1 USDT ≈ 1 dólar americano. A paridade pode se perder." },
                { icon: Layers, title: "Ecossistema Cripto", desc: "Movimentação digital com riscos próprios de emissor e infraestrutura." },
                { icon: Globe, title: "Sem Fronteiras", desc: "Envie dólares digitais para qualquer lugar do mundo." },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-sm border border-border/30 bg-card/40">
                  <item.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-foreground text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </ChapterBlock>

          {/* ═══ CAPÍTULO 2, REGULAMENTAÇÃO ═══ */}
          <ChapterBlock
            id="regulamentacao"
            phase="Capítulo 02"
            title="REGULAMENTAÇÃO E LASTRO"
            icon={ShieldCheck}
            image={segurancaImg}
            imageAlt="Dispositivos físicos e camadas de proteção da operação"
            index={1}
          >
            <p>
              Para uma stablecoin operar de forma legítima, a empresa emissora precisa cumprir demandas regulatórias rigorosas. No caso da Tether (USDT), dois marcos legislativos mudaram o jogo:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-5 rounded-sm border border-primary/20 bg-primary/[0.04]">
                <p className="text-primary font-mono text-[10px] tracking-wider mb-1">ESTADOS UNIDOS</p>
                <p className="text-foreground font-bold text-sm">GENIUS Act</p>
                <p className="text-xs text-muted-foreground mt-2">Estabelece um regime para emissores de stablecoins de pagamento nos EUA, incluindo reservas e supervisão. Não transforma toda operação em transação comercial nem elimina obrigações tributárias.</p>
              </div>
              <div className="p-5 rounded-sm border border-primary/20 bg-primary/[0.04]">
                <p className="text-primary font-mono text-[10px] tracking-wider mb-1">EUROPA</p>
                <p className="text-foreground font-bold text-sm">MiCA Regulation</p>
                <p className="text-xs text-muted-foreground mt-2">Define requisitos europeus para emissores, reservas, resgate e proteção ao consumidor. A existência do MiCA não significa que todo token, incluindo USDT, esteja autorizado ou disponível em toda plataforma europeia.</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-sm border border-border/30 bg-card/40">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">Reserva 1:1:</span> Se a Tether emite 10 bilhões de USDT, ela precisa ter 10 bilhões de dólares em reservas auditáveis. A composição, liquidez e verificação das reservas importam. Atestações não equivalem a uma auditoria completa, e reservas declaradas não garantem a paridade em toda condição de mercado.
              </p>
            </div>
          </ChapterBlock>

          {/* ═══ CAPÍTULO 3, POR QUE USAR ═══ */}
          <ChapterBlock
            id="por-que-usar"
            phase="Capítulo 03"
            title="POR QUE USAR USDT EM VEZ DA MOEDA ORIGINAL?"
            icon={Wallet}
            image={carteiraImg}
            imageAlt="Carteira física e celular sobre uma mesa"
            index={2}
          >
            <p>
              A pergunta óbvia: por que não simplesmente transferir dólares de banco para banco? A resposta está nos benefícios do ecossistema cripto:
            </p>
            <ul className="space-y-3 mt-4">
              {[
                "Sua própria carteira, sem deixar as chaves em um banco ou corretora; emissor e federação continuam presentes",
                "Chaves sob seu controle, mas com dependência do emissor do token e da infraestrutura da Liquid",
                "Pseudo-anonimato não é anonimato: endereços, pagamentos e dados externos podem ser correlacionados",
                "Velocidade: blocos da Liquid são produzidos em aproximadamente um minuto; aguarde as confirmações exigidas",
                "Sem fronteiras: envie dólares digitais para qualquer pessoa no mundo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-sm border border-destructive/30 bg-destructive/[0.04]">
              <p className="text-sm">
                <AlertTriangle className="w-4 h-4 text-destructive inline mr-2" />
                <span className="text-foreground font-semibold">Não use corretoras.</span> Entenda os riscos da custódia de terceiros e da correlação de documentos com suas operações. P2P não elimina registros bancários nem obrigações legais.
              </p>
            </div>
          </ChapterBlock>

          {/* ═══ CAPÍTULO 4, JADE WALLET SETUP ═══ */}
          <ChapterBlock
            id="jade-wallet"
            phase="Capítulo 04"
            title="JADE WALLET, SETUP COMPLETO"
            icon={Lock}
            image={seedImg}
            imageAlt="Anotação de seed phrase em papel para backup da carteira Jade"
            index={3}
          >
            <p>
              A <span className="text-primary font-semibold">Jade</span> é uma hardware wallet da Blockstream, pequena, open-source e altamente recomendada. Ela funciona como uma <span className="text-foreground font-medium">validadora de transações</span>: você recebe na carteira Liquid e usa a Jade física e o PIN para assinar no fluxo descrito. A seed também permite restaurar e movimentar os fundos em outro dispositivo compatível.
            </p>

            <div className="space-y-4 mt-6">
              <MacroStep
                number={1}
                title="Conectar a Jade"
                summary="Ligue via USB em um carregador de celular, nunca em um computador"
                icon={Smartphone}
                defaultOpen
              >
                <p className="text-sm text-muted-foreground">
                  Conecte o cabo USB diretamente em um <span className="text-foreground font-medium">carregador de tomada</span>. Não coloque a Jade em contato com computadores ou dispositivos com dados. Em seguida, baixe o aplicativo <span className="text-primary font-semibold">Blockstream Green</span> no celular.
                </p>
              </MacroStep>

              <MacroStep
                number={2}
                title="Emparelhar via Bluetooth"
                summary="Ative o Bluetooth na Jade e conecte ao app Blockstream Green"
                icon={Bluetooth}
              >
                <p className="text-sm text-muted-foreground">
                  Na Jade, vá em <span className="text-foreground font-medium">Settings → Bluetooth → Enabled</span>. No app, toque em "Connect Jade". O sistema encontrará o dispositivo automaticamente. Confirme o código de emparelhamento nos dois dispositivos.
                </p>
              </MacroStep>

              <MacroStep
                number={3}
                title="Criar carteira e anotar seed"
                summary="12 palavras que são a chave da sua soberania, anote no papel"
                icon={Key}
              >
                <p className="text-sm text-muted-foreground">
                  Selecione "Criar nova carteira". A Jade gerará <span className="text-foreground font-medium">12 palavras de recuperação</span>. Anote-as <span className="text-destructive font-semibold">à mão</span> no recovery sheet que acompanha a caixa.
                </p>
                <div className="p-3 rounded-sm border border-destructive/30 bg-destructive/[0.04] mt-2">
                  <p className="text-xs text-muted-foreground">
                    <AlertTriangle className="w-3 h-3 text-destructive inline mr-1" />
                    <strong className="text-foreground">Nunca</strong> tire foto, nunca salve no computador, nunca envie por mensagem. Papel e caneta. Ponto.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  A Jade pedirá para confirmar palavras aleatórias (ex: "Confirme a palavra 3"). Isso verifica as palavras solicitadas; confira também a ordem e a integridade de todo o backup.
                </p>
              </MacroStep>

              <MacroStep
                number={4}
                title="Definir PIN de segurança"
                summary="Protege o acesso ao dispositivo, não substitui a seed"
                icon={Shield}
              >
                <p className="text-sm text-muted-foreground">
                  Crie um PIN único de 6 dígitos. Este PIN protege o acesso à Jade e é distinto da senha do aplicativo. Não é uma 13ª palavra nem uma passphrase BIP39. Quem obtiver a seed pode restaurar a carteira sem esse PIN. Mantenha a seed protegida e separada do dispositivo.
                </p>
              </MacroStep>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="dv-action"><a
                href="https://dseclab.io/br/products/jade-wallet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 py-4 px-6 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.18] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
              >
                <Shield className="w-5 h-5" />
                CONHECER A JADE
                <ExternalLink className="w-4 h-4" />
              </a></Button>
            </div>
          </ChapterBlock>

          {/* ═══ CAPÍTULO 5, COMPRANDO USDT ═══ */}
          <ChapterBlock
            id="comprando-usdt"
            phase="Capítulo 05"
            title="COMPRANDO USDT VIA ALFREDP2P"
            icon={Banknote}
            image={alfredImg}
            imageAlt="Conferência ilustrativa de endereço Liquid em português"
            index={4}
          >
            <p>
              Agora que a carteira está pronta, é hora de colocar dólares digitais nela. Usaremos o <span className="text-primary font-semibold">AlfredP2P</span>, uma plataforma peer-to-peer. Confira os requisitos atuais de cadastro e de documentação; eles podem mudar.
            </p>

            <div className="space-y-4 mt-6">
              <MacroStep
                number={1}
                title="Acessar AlfredP2P"
                summary="Entre em alfredp2p.io e selecione 'Comprar'"
                icon={Globe}
                defaultOpen
              >
                <p className="text-sm text-muted-foreground">
                  Acesse <a href="https://www.alfredp2p.io/p2p" target="_blank" rel="noopener noreferrer" className="dv-inline-link">alfredp2p.io/p2p<ExternalLink size={13} aria-hidden="true"/></a>. Selecione que deseja <span className="text-foreground font-medium">comprar USDT</span>, defina o valor em reais e selecione a <span className="text-primary font-semibold">rede Liquid</span> para transações mais rápidas e privadas.
                </p>
              </MacroStep>

              <MacroStep
                number={2}
                title="Copiar endereço Liquid da Jade"
                summary="Na carteira Blockstream Green, vá em Receive e copie o endereço"
                icon={Wallet}
              >
                <p className="text-sm text-muted-foreground">
                  No app Blockstream Green, toque em <span className="text-foreground font-medium">Receive → Tether USD (Liquid Network)</span>. Copie o endereço gerado. Cole-o no campo de endereço do AlfredP2P, a indicação visual de formato não comprova que o endereço é seu. Confira o endereço na tela da Jade, a rede Liquid e o ativo; não envie para uma rede incompatível.
                </p>
              </MacroStep>

              <MacroStep
                number={3}
                title="Pagar e aguardar"
                summary="Faça o pagamento via PIX e receba USDT na sua carteira"
                icon={Banknote}
              >
                <p className="text-sm text-muted-foreground">
                  Verifique os requisitos atuais de cadastro do AlfredP2P, os termos, a contraparte e a disponibilidade de USDT na Liquid antes de pagar. Usuário e senha não tornam uma operação anônima. Após gerar o QR Code do PIX, faça o pagamento. Acompanhe o identificador da transação e aguarde as confirmações. O prazo depende do serviço e da rede, não é garantido em segundos.
                </p>
                <div className="p-3 rounded-sm border border-destructive/30 bg-destructive/[0.04] mt-2">
                  <p className="text-xs text-muted-foreground">
                    <Eye className="w-3 h-3 text-destructive inline mr-1" />
                    <strong className="text-foreground">Lembrete:</strong> O PIX está vinculado ao seu CPF. Este método <strong className="text-destructive">não é anônimo</strong>.
                  </p>
                </div>
              </MacroStep>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="dv-action"><a
                href="https://www.alfredp2p.io/p2p"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 py-4 px-6 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.18] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
              >
                <DollarSign className="w-5 h-5" />
                ESTUDAR A PLATAFORMA P2P
                <ExternalLink className="w-4 h-4" />
              </a></Button>
            </div>
          </ChapterBlock>

          {/* ═══ CAPÍTULO 6, SEGURANÇA ═══ */}
          <ChapterBlock
            id="seguranca"
            phase="Capítulo 06"
            title="SEGURANÇA E CAMADAS DE PROTEÇÃO"
            icon={Shield}
            image={segurancaImg}
            imageAlt="Camadas de segurança para proteção de stablecoins USDT"
            index={5}
          >
            <p>
              A combinação <span className="text-primary font-semibold">Jade + Blockstream Green + Liquid</span> cria múltiplas camadas de segurança:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                { title: "Hardware Wallet", desc: "A Jade assina sem expor as chaves ao celular no uso normal. Confira os dados na tela física. Uma seed comprometida permite restaurar a carteira em outro dispositivo.", icon: Lock },
                { title: "PIN de 6 Dígitos", desc: "O PIN protege o acesso à Jade. Não é uma palavra adicional da seed e não protege uma seed comprometida.", icon: Key },
                { title: "Seed Phrase (12 Palavras)", desc: "O backup universal. Com essas 12 palavras, você recupera sua carteira em qualquer dispositivo compatível, em qualquer lugar do mundo.", icon: Shield },
                { title: "Rede Liquid", desc: "No fluxo confidencial, valores e tipos de ativos são ocultados de observadores sem a chave de visualização. Endereços e registros bancários ainda podem ser correlacionados.", icon: Layers },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-sm border border-border/30 bg-card/40">
                  <item.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-foreground text-sm font-bold">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-sm border border-primary/20 bg-primary/[0.04]">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-foreground font-bold">Sobre as taxas:</span> Compare spread, tarifa do serviço e taxa da rede. Pagar mais não comprova privacidade ou segurança. Na Liquid, a taxa de rede é paga em L-BTC; confirme como o aplicativo fornece esse saldo. <span className="text-primary font-semibold">Confira o custo total antes de autorizar.</span>
              </p>
            </div>
          </ChapterBlock>


    <section className="dv-band dv-risk"><div className="dv-container"><span className="dv-kicker">Critério de decisão</span><h2>Sem esta base,<br/><span className="smx-editorial">o que acontece?</span></h2><div className="dv-risk-grid">{[
      ['Exposição ao real','Patrimônio 100% em reais, exposto à desvalorização da moeda brasileira.'],
      ['Dependência de terceiros','Bancos e fintechs podem restringir seu acesso. USDT também mantém dependência de emissor e infraestrutura.'],
      ['Operação sem domínio','Sem conhecer redes, taxas e endereços, você pode perder fundos ao movimentar dólares digitais.'],
      ['Risco de confisco','O confisco de 1990 mostra o risco da concentração bancária. Stablecoins não são proteção garantida contra bloqueios.'],
      ['Ferramenta antes da urgência','A experiência prática deve vir antes da necessidade. Estude os limites, não apenas os benefícios.']
    ].map(([title,text],i)=><details key={title}><summary><span>0{i+1}</span><h3>{title}</h3><ArrowRight size={20}/></summary><p>{text}</p></details>)}</div></div></section>
    <DollarFaq />
    <section className="dv-band dv-closing"><div className="dv-container dv-closing-grid"><figure><img src={heroImg} alt="Dispositivo físico de assinatura para estudo de autocustódia" width={1366} height={768} loading="lazy"/></figure><div><span className="dv-kicker">A ferramenta não substitui a tese</span><h2>Nenhuma solução fácil<br/><span className="smx-editorial">entrega soberania.</span></h2><p>O caminho é mais tortuoso, mais difícil. Mas é seu. Comece com um valor pequeno que você possa perder em um teste. O que importa é dominar a ferramenta antes que você precise dela de verdade, sem tratar USDT como reserva soberana.</p><div className="dv-actions"><Button asChild size="lg"><Link to="/autocustodia">Aprender autocustódia <ArrowRight/></Link></Button><Button asChild variant="outline" size="lg"><a href="https://dseclab.io/br/products/jade-wallet" target="_blank" rel="noopener noreferrer">Conhecer a Jade <ExternalLink/></a></Button></div></div></div></section>
    <section className="dv-band"><div className="dv-container"><h2>Continue sua <span className="smx-editorial">trilha.</span></h2><div className="dv-related">{[['/autocustodia','Autocustódia','A base: chaves, backup e verificação.'],['/comprar-bitcoin-com-privacidade','Bitcoin com privacidade','Entenda RoboSats, Tor e os limites do pagamento.'],['/bitcoin','Bitcoin','O fundamento da tese, além da ferramenta de curto prazo.']].map(([to,title,desc])=><Link key={to} to={to}><h3>{title}</h3><p>{desc}</p><ArrowRight/></Link>)}</div><SovereignDisclaimer variant="payment"/><Button asChild variant="link" className="dv-text-link"><Link to="/"> <ArrowLeft/> Voltar ao início</Link></Button></div></section>
  </main></MotionConfig>;
}
