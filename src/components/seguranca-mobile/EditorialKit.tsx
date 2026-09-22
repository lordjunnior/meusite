import type { ComponentType, ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.78, delay, ease: EASE },
});

export type IconType = ComponentType<{ className?: string }>;

type HeroProps = {
  asset: string;
  heroAlt: string;
  eyebrow: string;
  category: string;
  title: string;
  lede: string;
  icon: IconType;
};

export function Hero({ asset, heroAlt, eyebrow, category, title, lede, icon: Icon }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 180]);
  const opacity = useTransform(scrollY, [0, 650], [1, 0.22]);
  return (
    <section className="smx-hero relative min-h-[88vh] overflow-hidden">
      <motion.img style={{ y }} src={asset} alt={heroAlt} width={1920} height={1088} fetchPriority="high" decoding="async" className="absolute inset-0 h-[110%] w-full object-cover" />
      <div className="smx-hero-shade absolute inset-0" />
      <motion.div style={{ opacity }} className="relative z-10 flex min-h-[88vh] max-w-[1600px] flex-col justify-end px-6 pb-16 pt-36 md:px-12 md:pb-24 lg:px-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: EASE }} className="mb-7 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-background/25 bg-background/10 backdrop-blur-xl"><Icon className="h-7 w-7 text-background" /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-background/70">{eyebrow}</p>
            <p className="text-xl font-black uppercase tracking-normal text-background">{category}</p>
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: .1, ease: EASE }} className="max-w-[17ch] text-[clamp(2.75rem,7.3vw,7rem)] font-black uppercase leading-[.92] tracking-normal text-background">{title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .35, ease: EASE }} className="mt-7 max-w-3xl text-lg leading-relaxed text-background/90 md:text-2xl">{lede}</motion.p>
      </motion.div>
    </section>
  );
}

export function Heading({ chapter, children, dark = false }: { chapter: string; children: ReactNode; dark?: boolean }) {
  return (
    <motion.div {...reveal()} className="mb-12 md:mb-16">
      <span className={`text-xs font-bold uppercase tracking-[0.3em] ${dark ? 'smx-copper-soft' : 'smx-copper'}`}>{chapter}</span>
      <h2 className={`mt-5 max-w-5xl text-[clamp(2.35rem,5vw,5rem)] font-black uppercase leading-[.96] tracking-normal ${dark ? 'text-background' : 'smx-ink'}`}>{children}</h2>
    </motion.div>
  );
}

export function Backdrop({ asset, alt, light = false }: { asset: string; alt: string; light?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <>
      <motion.img src={asset} alt={alt} loading="lazy" decoding="async" width={1920} height={1088} animate={reduceMotion ? undefined : { scale: [1, 1.06, 1], x: ['0%', '-0.7%', '0%'] }} transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 -z-30 h-full w-full object-cover" />
      <div className={`${light ? 'smx-light-shade' : 'smx-dark-shade'} absolute inset-0 -z-20`} />
      <div className="smx-grid absolute inset-0 -z-10" />
    </>
  );
}

export function Figure({ asset, alt, caption }: { asset: string; alt: string; caption: string }) {
  return (
    <motion.figure {...reveal(.1)} className="smx-figure group relative mt-12 overflow-hidden rounded-lg">
      <img src={asset} alt={alt} loading="lazy" decoding="async" width={1536} height={1024} className="h-[50vh] min-h-[360px] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.035]" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-transparent to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-base font-semibold leading-relaxed text-background md:p-9 md:text-lg">{caption}</figcaption>
    </motion.figure>
  );
}

export type TrailCard = { to?: string; title: string; desc: string; icon: IconType; future?: string };

export function TrailSection({ chapter, cards }: { chapter: string; cards: TrailCard[] }) {
  return (
    <section className="relative isolate overflow-hidden px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-[1600px]">
        <Heading chapter={chapter}>Continue sua <span className="smx-editorial">trilha.</span></Heading>
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div key={card.title} {...reveal(i * .07)}>
              {card.to ? (
                <Link to={card.to} className="smx-card smx-focus group block h-full rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <card.icon className="smx-copper h-7 w-7" />
                  <h3 className="smx-ink mt-6 text-2xl font-black">{card.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed">{card.desc}</p>
                  <span className="smx-copper mt-6 inline-flex items-center gap-2 font-bold">Acessar <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ) : (
                <article className="smx-focus h-full rounded-lg border border-dashed p-8" style={{ background: 'hsl(40 15% 88% / .62)', borderColor: 'hsl(174 26% 9% / .24)' }}>
                  <card.icon className="smx-muted h-7 w-7" />
                  <h3 className="smx-ink mt-6 text-2xl font-black">{card.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed">{card.desc}</p>
                  <span className="smx-muted mt-6 inline-flex font-bold">{card.future ?? 'Em preparação'}</span>
                </article>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Veredito({ headline, paragraphs }: { headline: ReactNode; paragraphs: string[] }) {
  return (
    <section className="smx-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-2">
        <motion.div {...reveal()}>
          <span className="smx-copper-soft text-xs font-bold uppercase tracking-[0.3em]">Veredito</span>
          <h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] font-black uppercase leading-none tracking-normal text-background">{headline}</h2>
        </motion.div>
        <motion.div {...reveal(.12)} className="space-y-6 text-lg leading-[1.75] text-background/90 md:text-xl">
          {paragraphs.map((p, i) => i === paragraphs.length - 1 ? <p key={p} className="font-black text-background">{p}</p> : <p key={p}>{p}</p>)}
        </motion.div>
      </div>
    </section>
  );
}

export function FaqSection({ asset, alt, faq }: { asset: string; alt: string; faq: { q: string; a: string }[] }) {
  return (
    <section id="faq" className="relative isolate scroll-mt-16 overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
      <Backdrop asset={asset} alt={alt} />
      <div className="mx-auto max-w-[1600px]">
        <Heading chapter="FAQ estratégico" dark>Perguntas diretas, <span className="smx-copper-soft font-editorial font-normal italic">respostas abertas.</span></Heading>
        <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
          {faq.map((item, i) => (
            <motion.article key={item.q} {...reveal((i % 3) * .06)} className={`smx-glass group rounded-lg border p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-8 ${i === 0 || i === 4 ? 'md:col-span-2' : ''}`}>
              <div className="mb-5 flex items-center justify-between">
                <span className="smx-copper-soft text-xs font-black tracking-[0.25em]">FAQ {String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-xl font-black leading-tight tracking-normal text-background md:text-2xl">{item.q}</h3>
              <p className="mt-5 text-base font-medium leading-[1.75] text-background/90 md:text-lg">{item.a}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
