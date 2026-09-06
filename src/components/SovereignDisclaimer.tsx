import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, ArrowRight, Users } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface SovereignDisclaimerProps {
  /** Type of page for contextual copy */
  variant?: 'exchange' | 'bank' | 'payment' | 'offshore' | 'surveillance';
}

const contextCopy: Record<string, { badge: string; title: string; body: string }> = {
  exchange: {
    badge: 'AVISO DE SOBERANIA',
    title: 'Eu não apoio e não uso corretoras centralizadas.',
    body: 'Este conteúdo só existe porque foi exaustivamente pedido nas redes por quem já teve conta bloqueada, valor retido ou acesso cortado ao próprio dinheiro. Não é recomendação de uso. É rota de contingência para quem já está dentro e precisa sair.',
  },
  bank: {
    badge: 'AVISO DE SOBERANIA',
    title: 'Conta internacional não substitui autocustódia.',
    body: 'Este guia foi criado porque a comunidade pediu ajuda para diversificar jurisdições depois de contas bloqueadas e valores retidos. Nenhuma conta bancária, nacional ou internacional, te dá posse real do seu dinheiro. Isso aqui é plano B tático, não destino final.',
  },
  payment: {
    badge: 'AVISO DE SOBERANIA',
    title: 'Pagar com cripto via Pix não é autocustódia.',
    body: 'Este tutorial existe por pedido exaustivo de quem já tem conta comprometida e precisa de uma rota alternativa para movimentar valor sem depender de banco. Manter fundos em corretora continua sendo risco de contraparte, não solução.',
  },
  offshore: {
    badge: 'AVISO DE SOBERANIA',
    title: 'Offshore é blindagem. Não é soberania.',
    body: 'Pedidos da comunidade motivaram este material: patrimônio retido, contas bloqueadas sem justificativa e medo real de confisco. Uma conta offshore diversifica jurisdição, mas não te dá controle absoluto. Para isso, você precisa de autocustódia.',
  },
  surveillance: {
    badge: 'ALERTA DE SOBERANIA',
    title: 'Vigilância financeira é real. Este conteúdo é defesa.',
    body: 'A comunidade pediu este material após enfrentar bloqueios, monitoramento e restrições reais. Aqui estão as ameaças documentadas e os protocolos práticos de proteção, sem teoria conspiratória.',
  },
};


export default function SovereignDisclaimer({ variant = 'exchange' }: SovereignDisclaimerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const copy = contextCopy[variant];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mx-auto max-w-4xl my-12 md:my-16"
    >
      <div className="relative overflow-hidden rounded-sm border border-amber-500/30 bg-amber-500/[0.04] backdrop-blur-md">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
        
        {/* Pulsing glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(245,158,11,0.06),_transparent_60%)]" />

        <div className="relative p-6 md:p-10">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-[ping_3s_ease-in-out_infinite]" />
              <AlertTriangle className="relative w-5 h-5 text-amber-500" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase font-bold">
              {copy.badge}
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            {copy.title}
          </h3>

          {/* Body */}
          <div className="flex items-start gap-3 mb-5">
            <Users className="w-5 h-5 text-amber-500/70 mt-0.5 shrink-0" />
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {copy.body}
            </p>
          </div>

          {/* Core message */}
          <div className="flex items-start gap-3 p-4 rounded-sm bg-card/60 border border-amber-500/15 mb-6">
            <Shield className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-sm text-foreground/90 leading-relaxed">
              <span className="font-bold text-amber-500">A tese deste site é uma só:</span>{' '}
              seu dinheiro só é seu quando está sob sua custódia direta, sem intermediários,
              sem permissão de terceiros, sem risco de confisco. Tudo que sai dessa premissa é
              ferramenta tática, não destino final.
            </p>
          </div>

          {/* CTA */}
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            Se você quer parar de se expor ao risco de confisco e vigilância, saia agora desta página
            e vá para o guia da migração.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/autocustodia/guia-migracao-corretora"
              className="group inline-flex items-center gap-3 py-3 px-6 rounded-sm border border-amber-500/40
                bg-amber-500/[0.12] hover:bg-amber-500/[0.22] hover:border-amber-500/60
                text-amber-500 font-semibold text-sm tracking-wide transition-all duration-300"
            >
              <Shield className="w-4 h-4" />
              Guia da Migração: sair da corretora
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
            <Link
              to="/autocustodia"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-sm border border-amber-500/20
                text-amber-500/80 hover:text-amber-500 hover:border-amber-500/40 font-medium text-sm transition-all duration-300"
            >
              Entenda a autocustódia
            </Link>
          </div>

        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      </div>
    </motion.section>
  );
}
