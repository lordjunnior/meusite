import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Database, Mail, Clock, UserCheck, Server } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const Bloco: React.FC<{ titulo: string; icone: React.ReactNode; children: React.ReactNode }> = ({ titulo, icone, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, ease: APPLE_EASE }}
    className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">{icone}</div>
      <h2 className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{titulo}</h2>
    </div>
    <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-stone-400">{children}</div>
  </motion.section>
);

const Privacidade: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07080c]">
      <Helmet>
        <title>Política de Privacidade | Lord Junnior</title>
        <meta name="description" content="Quais dados este site coleta, por que coleta, por quanto tempo guarda e como você pede a exclusão. Política de privacidade em linguagem direta, conforme a LGPD." />
        <link rel="canonical" href={canonicalUrl('/privacidade')} />
        <meta property="og:title" content="Política de Privacidade | Lord Junnior" />
        <meta property="og:description" content="Quais dados este site coleta, por que coleta e como pedir exclusão. Conforme a LGPD." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl('/privacidade')} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <header className="relative overflow-hidden border-b border-white/[0.06] px-5 py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[130px] bg-amber-500 -top-40 left-1/3" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-500/70 mb-4">Documento legal</p>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Política de Privacidade
          </h1>
          <p className="mt-5 text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl">
            Este site trata de soberania e privacidade. Seria incoerente coletar dados sem explicar o que faz com eles.
            Abaixo está a descrição completa, sem letras miúdas.
          </p>
          <p className="mt-4 text-stone-600 text-xs tracking-wider uppercase">Última atualização: setembro de 2026</p>
        </div>
      </header>

      <main className="px-5 py-14 md:py-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <Bloco titulo="Quem é o responsável pelo tratamento" icone={<UserCheck size={18} />}>
            <p>
              O responsável pelo tratamento dos dados é o autor e mantenedor deste site, publicado em lordjunnior.com.br.
              O contato para qualquer assunto relacionado a dados pessoais é o e-mail informado no bloco de contato desta página.
            </p>
          </Bloco>

          <Bloco titulo="Quais dados são coletados" icone={<Database size={18} />}>
            <p>
              Somente os dados que você digita voluntariamente nos formulários do site:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-stone-200">Nome</strong>, para que o contato seja pessoal e não automático.</li>
              <li><strong className="text-stone-200">E-mail</strong>, para responder sua solicitação e enviar os materiais que você pediu.</li>
              <li><strong className="text-stone-200">WhatsApp</strong>, opcional, usado apenas quando você quer atendimento por mensagem em vez de e-mail.</li>
              <li><strong className="text-stone-200">Assunto de interesse</strong>, que identifica de qual página o pedido partiu.</li>
              <li><strong className="text-stone-200">Registro do consentimento</strong>, com data e hora do aceite, exigido pela LGPD.</li>
            </ul>
            <p>
              Não há cadastro obrigatório, não há login para ler o conteúdo, não há venda de dados e não existe compartilhamento
              com corretores de lista ou redes de anúncio.
            </p>
          </Bloco>

          <Bloco titulo="Para que os dados são usados" icone={<Mail size={18} />}>
            <p>
              A finalidade é uma só: responder você e enviar o material solicitado. O número de WhatsApp, quando informado, é usado
              exclusivamente para retorno direto sobre o assunto que você abriu. Ele não entra em grupo, não vira lista de disparo em massa
              e não é repassado a terceiros.
            </p>
            <p>
              A base legal é o seu consentimento, coletado por caixa de seleção no próprio formulário, conforme o artigo 7, inciso I,
              da Lei 13.709/2018.
            </p>
          </Bloco>

          <Bloco titulo="Onde os dados ficam guardados" icone={<Server size={18} />}>
            <p>
              Os registros são armazenados em banco de dados gerenciado com acesso restrito. A leitura dos leads é permitida apenas
              ao administrador do sistema. A configuração de segurança do banco nega, de forma explícita, qualquer tentativa de leitura,
              alteração ou exclusão feita a partir do navegador de visitantes.
            </p>
            <p>
              O site não usa cookies de rastreamento publicitário. O armazenamento local do navegador guarda apenas preferências de
              navegação e o controle de envios repetidos de formulário.
            </p>
          </Bloco>

          <Bloco titulo="Por quanto tempo são guardados" icone={<Clock size={18} />}>
            <p>
              Os dados de contato ficam armazenados enquanto durar a relação de atendimento ou até que você peça a exclusão.
              Pedidos sem retorno por 24 meses são apagados na revisão periódica da base.
            </p>
          </Bloco>

          <Bloco titulo="Seus direitos" icone={<ShieldCheck size={18} />}>
            <p>
              A qualquer momento você pode pedir confirmação de tratamento, acesso, correção, portabilidade, anonimização,
              revogação do consentimento e exclusão definitiva dos dados. O pedido pode ser feito por e-mail e é atendido em até
              15 dias corridos, sem que você precise justificar o motivo.
            </p>
            <p>
              A revogação do consentimento encerra o contato imediatamente e não gera nenhum prejuízo de acesso ao conteúdo do site,
              que permanece aberto e gratuito.
            </p>
          </Bloco>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
            className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 md:p-8"
          >
            <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Contato sobre dados pessoais</h2>
            <p className="text-sm text-stone-400 leading-relaxed">
              Envie o pedido para <a href="mailto:contato@lordjunnior.com.br" className="text-amber-400 hover:text-amber-300 underline underline-offset-4">contato@lordjunnior.com.br</a> com o assunto
              "LGPD". Informe apenas o e-mail usado no formulário. Nenhum documento pessoal é exigido para excluir dados.
            </p>
            <p className="mt-4 text-sm text-stone-500">
              Veja também os <Link to="/termos" className="text-amber-400 hover:text-amber-300 underline underline-offset-4">Termos de Uso</Link>.
            </p>
          </motion.div>
        </div>
      </main>

      <BackToHome />
    </div>
  );
};

export default Privacidade;
