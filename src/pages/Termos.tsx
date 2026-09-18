import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ScrollText, AlertTriangle, BookOpen, Coins, Link2, Gavel } from 'lucide-react';
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

const Termos: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07080c]">
      <Helmet>
        <title>Termos de Uso | Lord Junnior</title>
        <meta name="description" content="Condições de uso do conteúdo, natureza educacional do material, ausência de recomendação de investimento, responsabilidade sobre autocustódia e regras de reprodução." />
        <link rel="canonical" href={canonicalUrl('/termos')} />
        <meta property="og:title" content="Termos de Uso | Lord Junnior" />
        <meta property="og:description" content="Condições de uso, natureza educacional do conteúdo e limites de responsabilidade." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl('/termos')} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <header className="relative overflow-hidden border-b border-white/[0.06] px-5 py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[130px] bg-amber-500 -top-40 right-1/3" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-500/70 mb-4">Documento legal</p>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Termos de Uso
          </h1>
          <p className="mt-5 text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl">
            O que você pode esperar deste site, o que ele não é, e onde começa a sua responsabilidade ao aplicar qualquer
            procedimento descrito aqui.
          </p>
          <p className="mt-4 text-stone-600 text-xs tracking-wider uppercase">Última atualização: setembro de 2026</p>
        </div>
      </header>

      <main className="px-5 py-14 md:py-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <Bloco titulo="Aceite das condições" icone={<ScrollText size={18} />}>
            <p>
              Ao navegar por este site você concorda com as condições descritas nesta página e na
              {' '}<Link to="/privacidade" className="text-amber-400 hover:text-amber-300 underline underline-offset-4">Política de Privacidade</Link>.
              Se discordar de qualquer ponto, basta encerrar a navegação.
            </p>
          </Bloco>

          <Bloco titulo="Natureza do conteúdo" icone={<BookOpen size={18} />}>
            <p>
              Todo o material publicado tem finalidade educacional e informativa. Os textos descrevem conceitos, procedimentos técnicos
              e experiências práticas de segurança, privacidade e custódia de Bitcoin.
            </p>
            <p>
              Nada aqui constitui recomendação de investimento, consultoria financeira, aconselhamento jurídico, tributário ou médico.
              Decisões sobre patrimônio, saúde e mobilidade são pessoais e devem considerar a sua situação específica.
            </p>
          </Bloco>

          <Bloco titulo="Risco e autocustódia" icone={<Coins size={18} />}>
            <p>
              Autocustódia significa que ninguém além de você controla as chaves. Isso elimina o risco de terceiros e transfere para você
              o risco de erro, perda de backup, falha de hardware e engenharia social.
            </p>
            <p>
              Teste qualquer procedimento com valores irrelevantes antes de mover quantias reais. O autor não se responsabiliza por perdas
              decorrentes de execução incorreta, de falhas em programas de terceiros ou de decisões tomadas a partir do conteúdo publicado.
            </p>
          </Bloco>

          <Bloco titulo="Ferramentas disponibilizadas" icone={<AlertTriangle size={18} />}>
            <p>
              As ferramentas deste site funcionam no próprio navegador e não enviam dados para servidores. Ainda assim, um navegador é um
              ambiente compartilhado com extensões e outros programas, e por isso não é o lugar indicado para gerar ou guardar chaves que
              protegem valor relevante. Cada ferramenta traz esse aviso no próprio contexto de uso.
            </p>
          </Bloco>

          <Bloco titulo="Links externos e indicações" icone={<Link2 size={18} />}>
            <p>
              Alguns textos citam serviços, lojas e fabricantes de terceiros. Parte desses links pode ser de afiliado, o que significa que uma
              compra feita por eles pode gerar comissão sem custo adicional para você. A indicação segue critério técnico, nunca valor de comissão,
              e limitações conhecidas de cada serviço são descritas junto com a recomendação.
            </p>
            <p>
              O site não controla o conteúdo, as políticas nem a disponibilidade de páginas externas.
            </p>
          </Bloco>

          <Bloco titulo="Propriedade intelectual e foro" icone={<Gavel size={18} />}>
            <p>
              Textos, imagens e materiais autorais publicados aqui pertencem ao autor. Citações com crédito e link são permitidas.
              Reprodução integral, republicação e uso comercial dependem de autorização prévia por escrito.
            </p>
            <p>
              Estes termos são regidos pela legislação brasileira. Eventuais controvérsias serão tratadas no foro do domicílio do autor,
              salvo disposição legal em contrário aplicável a relações de consumo.
            </p>
          </Bloco>
        </div>
      </main>

      <BackToHome />
    </div>
  );
};

export default Termos;
