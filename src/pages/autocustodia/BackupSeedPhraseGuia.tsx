import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Flame, Droplets, Clock, Users, Split, KeyRound,
  ChevronDown, ArrowRight, AlertTriangle, CheckCircle2, XCircle,
  FileText, Eye, Layers, Fingerprint, Scale, Home,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/seed-backup/seed-hero.jpg';
import gravacaoImg from '@/assets/autocustodia/seed-aco-gravacao.jpg';
import cofreImg from '@/assets/autocustodia/heranca-cofre.jpg';

/**
 * /autocustodia/backup-seed-phrase-guia
 * Página pilar: como fazer backup de seed phrase.
 * Padrão editorial Soberania: Sand #f4ede4 / Deep Teal #0e3b3a / Cobre-âmbar #c97a3d.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const AMEACAS_PAPEL = [
  { icon: Flame, titulo: 'Fogo', texto: 'Um incêndio doméstico comum já destrói papel em poucos minutos, sob temperaturas que mal arranham metal. Não é hipótese remota: incêndios residenciais são a causa mais frequente de perda irreversível de seed phrase em papel.' },
  { icon: Droplets, titulo: 'Água', texto: 'Enchente, vazamento de cano, chuva entrando pelo telhado. Tinta em papel comum borra e desaparece em contato prolongado com água, e a seed inteira vira um borrão ilegível justamente no momento em que você mais precisaria dela.' },
  { icon: Clock, titulo: 'Tempo', texto: 'Papel amarelece, resseca, é atacado por fungo e por traça em poucos anos, mesmo guardado com cuidado. Uma seed que vai proteger patrimônio por décadas não pode depender de um material com validade de poucos anos.' },
  { icon: Home, titulo: 'Mudança e esquecimento', texto: 'A causa mais banal de todas: o papel fica dentro de um livro, uma gaveta trocada de casa, uma caixa doada por engano. Ninguém perde Bitcoin para hacker com a mesma frequência com que perde para uma mudança de endereço mal planejada.' },
  { icon: Eye, titulo: 'Curiosos e visitas', texto: 'Papel solto ou mal escondido é visível para qualquer pessoa que entre em casa: parente, prestador de serviço, faxineira, sobrinho curioso. Segurança de seed não é só sobre hacker remoto, é sobre quem tem acesso físico ao ambiente.' },
];

const ACO_VS_PAPEL = [
  { criterio: 'Resistência a fogo', papel: false, aco: true },
  { criterio: 'Resistência a água e enchente', papel: false, aco: true },
  { criterio: 'Durabilidade acima de 20 anos', papel: false, aco: true },
  { criterio: 'Resistência a corrosão (aço inoxidável)', papel: false, aco: true },
  { criterio: 'Custo baixo de aquisição', papel: true, aco: false },
  { criterio: 'Facilidade de esconder discretamente', papel: true, aco: true },
  { criterio: 'Resistência a impacto físico e queda', papel: false, aco: true },
];

const METODOS_GRAVACAO = [
  { titulo: 'Gravação manual com ponta de aço', texto: 'Placas simples onde você grava letra por letra com um punção ou stylus de aço, encostando as palavras completas ou as quatro primeiras letras de cada uma (padrão BIP39 permite identificar a palavra só pelas quatro primeiras letras). Barato, funcional, mas exige pulso firme e tempo.' },
  { titulo: 'Punção e martelo em placas com grade', texto: 'Placas de aço perfuradas com uma grade de letras predefinida. Você usa um punção e um martelo para marcar a letra correspondente em cada posição. Resultado mais uniforme que a gravação manual livre, ideal para quem tem pouca habilidade manuscrita.' },
  { titulo: 'Placas com arruelas ou pinos móveis', texto: 'Sistemas modulares onde você empilha arruelas numeradas ou letradas representando cada palavra pelo índice na lista BIP39. Reversível e reconfigurável, mas com mais peças soltas que podem se perder ou ser desmontadas por acidente.' },
  { titulo: 'Serviços de gravação a laser por terceiros', texto: 'Existem empresas que gravam a placa a laser mediante envio da seed. Esse método é desaconselhado neste guia: você nunca deve enviar sua seed, nem fragmentada, para terceiro nenhum. A gravação tem que acontecer com suas próprias mãos, em ambiente que você controla.' },
];

const REGRA_321 = [
  { n: '3', titulo: 'Três cópias', texto: 'Nunca dependa de uma única cópia física da seed. Três cópias reduzem drasticamente a chance de um evento único (incêndio, enchente, roubo) apagar seu acesso ao patrimônio de uma vez.' },
  { n: '2', titulo: 'Dois materiais ou meios diferentes', texto: 'Pelo menos uma cópia em aço e, se desejar redundância adicional, uma cópia em papel plastificado como camada extra, nunca como substituto do aço. Meios diferentes reduzem a chance de uma mesma causa destruir todas as cópias ao mesmo tempo.' },
  { n: '1', titulo: 'Uma cópia fora do imóvel principal', texto: 'Pelo menos uma das cópias precisa estar fisicamente fora da sua residência principal: casa de um familiar de confiança, cofre de banco, segunda propriedade. Se todas as cópias estão sob o mesmo teto, você não tem backup, tem uma ilusão de backup.', }
];

const ERROS_DIVISAO = [
  'Dividir as 24 palavras em pedaços consecutivos (por exemplo, 12 palavras num local e 12 palavras em outro) parece inteligente, mas na prática reduz drasticamente o espaço de busca de quem encontra metade. Um atacante com metade das palavras BIP39 corretas, na ordem correta, já reduz o problema de força bruta de anos para minutos.',
  'Esquemas caseiros de divisão por posição (guardar palavras pares num lugar e ímpares em outro) sofrem do mesmo problema: quem tem acesso a qualquer metade sabe exatamente quais posições faltam, e o espaço de busca cai de forma não linear.',
  'A ideia intuitiva de "separar para proteger" só funciona quando o esquema usado foi desenhado matematicamente para isso, como o SLIP39 (Shamir Secret Sharing), e não como um corte arbitrário feito à mão.',
  'Dividir a seed também multiplica o número de lugares que podem falhar. Cada fragmento perdido, corroído ou incompreendido é, na prática, perda total de acesso, porque um fragmento de seed cortado sem SLIP39 não recupera nada sozinho.',
];

const SLIP39_MULTISIG = [
  { titulo: 'SLIP39 e Shamir Secret Sharing', texto: 'Divide matematicamente a seed em N fragmentos (shares), dos quais um subconjunto mínimo M é necessário para reconstruir a seed original, sem que nenhum fragmento isolado revele informação útil sobre a chave. Um esquema 3 de 5, por exemplo, exige três dos cinco fragmentos, e qualquer combinação de dois fragmentos, sozinha, não revela nada. É a forma correta de "dividir" uma seed, ao contrário do corte manual em pedaços.' },
  { titulo: 'Multisig como alternativa (e muitas vezes superior)', texto: 'Em vez de fragmentar uma única chave, o multisig cria várias chaves privadas completas e independentes, cada uma em um dispositivo diferente, exigindo M de N assinaturas para mover fundos. Diferente do SLIP39, cada chave de um multisig pode ter sua própria seed, seu próprio backup e até seu próprio local geográfico, sem depender de reconstrução matemática de um segredo único.' },
];

const FAQ = [
  { q: 'Papel plastificado já é seguro o suficiente para guardar minha seed phrase?', a: 'Papel plastificado resiste melhor à água do que papel comum, mas continua vulnerável a fogo, a calor intenso e à degradação da tinta em décadas. Ele pode servir como uma camada complementar, nunca como a cópia principal. A cópia principal deve estar em aço.' },
  { q: 'Qual a diferença prática entre gravar a seed inteira e gravar só as quatro primeiras letras de cada palavra?', a: 'O padrão BIP39 garante que as quatro primeiras letras de cada palavra da lista de 2048 palavras são suficientes para identificar a palavra de forma única. Gravar só as quatro primeiras letras economiza espaço na placa de aço sem perder nenhuma informação necessária para a recuperação.' },
  { q: 'Devo anotar a passphrase (25ª palavra) junto com a seed de 24 palavras?', a: 'Não. A passphrase deve ser guardada separada fisicamente da seed, de preferência memorizada ou anotada em local totalmente distinto. Se as duas informações forem encontradas juntas, a proteção adicional que a passphrase oferece deixa de existir.' },
  { q: 'É seguro guardar uma cópia da seed na casa de um parente?', a: 'Pode ser parte de uma estratégia de divisão geográfica válida, desde que essa pessoa não saiba o que está guardando (idealmente dentro de um envelope lacrado ou cofre) e que você confie na integridade física do local. O objetivo é reduzir o risco de perda por incêndio ou enchente no seu próprio imóvel, não delegar conhecimento sobre o conteúdo.' },
  { q: 'O que é o "ataque da chave de 5 dólares" e por que ele importa mais que criptografia?', a: 'É a referência humorística e ao mesmo tempo séria de que é mais barato coagir fisicamente alguém a entregar a seed do que quebrar a criptografia por força bruta. Isso muda completamente o modelo de ameaça: sua segurança operacional (quem sabe que você tem Bitcoin, onde você fala sobre isso, como você se comporta) importa tanto quanto o material da placa de backup.' },
  { q: 'Preciso testar a restauração da seed mesmo se tenho certeza que anotei certo?', a: 'Sim, sempre. Erros de transcrição, palavras trocadas de posição, letras confundidas (como a diferença entre certas palavras parecidas da lista BIP39) são a causa mais comum de perda de acesso definitivo. Teste a restauração num dispositivo diferente, com um valor pequeno primeiro, antes de mover o patrimônio principal.' },
  { q: 'Como deixar Bitcoin para herdeiros sem expor a seed em vida?', a: 'A prática recomendada é uma carta de instruções separada da seed, explicando o que é Bitcoin, onde estão as cópias físicas (sem revelar o conteúdo) e como proceder, entregue a um advogado de confiança ou lacrada em cartório, combinada com um arranjo multisig que distribua chaves entre herdeiros ou entre herdeiro e um custodiante de confiança.' },
  { q: 'Vale a pena usar as duas coisas, SLIP39 e multisig, ao mesmo tempo?', a: 'Para a maioria das pessoas isso é complexidade desnecessária que aumenta o risco de erro operacional. Multisig tende a ser a escolha mais robusta e mais testada pela comunidade técnica para quantias relevantes. SLIP39 é uma alternativa válida quando o usuário entende bem o esquema mínimo M de N e mantém disciplina rígida de teste periódico.' },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Placa de backup de seed phrase em aço inoxidável gravada à mão, macro fotografia escura representando segurança física de longo prazo"
        width={1264}
        height={848}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,59,58,0.6) 0%, rgba(14,59,58,0.4) 40%, rgba(14,59,58,0.92) 100%)' }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-3 mb-8">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md" style={{ backgroundColor: 'rgba(244,237,228,0.15)', color: '#f4ede4', border: '1px solid rgba(244,237,228,0.3)' }}>
            <ShieldCheck size={11} className="inline mr-2" /> Autocustódia · Guia Pilar
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Como fazer backup de seed phrase{' '}
          <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(232,163,107,0.45)' }}>
            sem depender de sorte.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Papel queima, molha e some numa mudança. Este guia cobre a régua completa de backup de seed phrase: aço, esquema 3-2-1, divisão geográfica, o erro de fragmentar sem matemática, passphrase, teste de restauração e herança.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function BackupSeedPhraseGuia() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/autocustodia/backup-seed-phrase-guia"
        custom={{
          title: 'Como Fazer Backup de Seed Phrase: Guia Completo 2026',
          description: 'Como fazer backup de seed phrase de forma correta: aço vs papel, esquema 3-2-1, o erro de dividir a seed em pedaços, SLIP39, passphrase e teste de restauração.',
          canonical: 'https://lordjunnior.com.br/autocustodia/backup-seed-phrase-guia',
          primaryKeyword: 'como fazer backup de seed phrase',
          lsiKeywords: [
            'backup seed phrase bitcoin',
            'seed phrase em aço',
            'BIP39 backup',
            'SLIP39 shamir secret sharing',
            'passphrase 25ª palavra',
            'esquema 3-2-1 backup bitcoin',
            'herança bitcoin carta de instruções',
          ],
          longTailKeywords: [
            'como fazer backup de seed phrase de bitcoin com segurança',
            'aço ou papel para guardar seed phrase',
            'como dividir seed phrase entre lugares diferentes',
            'o que é passphrase 25ª palavra bitcoin',
            'como testar restauração de carteira bitcoin',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Autocustódia', url: '/autocustodia' },
            { name: 'Backup de Seed Phrase', url: '/autocustodia/backup-seed-phrase-guia' },
          ],
          schemaType: 'Article',
          articleSection: 'Autocustódia',
          relatedPages: [
            '/autocustodia/seed-phrase-em-aco',
            '/autocustodia/krux-passphrase-bluewallet',
            '/autocustodia/hardware-wallet-diy-bitcoin',
            '/comparativos/melhores-hardware-wallets',
            '/multisig-bitcoin',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — O que é a seed (BIP39) */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>O que é a seed phrase</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Doze ou vinte e quatro palavras{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  são todo o seu patrimônio.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  A seed phrase, definida pelo padrão BIP39, é uma sequência de 12 ou 24 palavras retiradas de uma lista fixa de 2048 termos em inglês, que codifica de forma legível por humanos a entropia usada para gerar todas as chaves privadas de uma carteira Bitcoin. Ela não é uma senha de acesso a um serviço, é a própria origem matemática do seu dinheiro.
                </p>
                <p>
                  Quem tem a seed, tem o Bitcoin, independentemente de onde ele esteja registrado na blockchain. Não existe suporte, não existe "recuperar conta por e-mail", não existe central de atendimento. A seed é a chave e o cofre ao mesmo tempo, e por isso o backup dela precisa ser tratado com o rigor que se dá a uma escritura de imóvel, não com o descuido que se dá a uma senha de streaming.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light" style={{ borderLeft: '3px solid #c97a3d', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  Backup de seed phrase não é sobre lembrar. É sobre sobreviver a fogo, água, tempo e à própria distração humana.
                </blockquote>
                <p>
                  Este guia não é sobre onde comprar uma hardware wallet. É sobre o que fazer depois que ela já gerou sua seed: como registrá-la, onde guardá-la, como dividi-la sem se enganar e como garantir que, daqui a vinte anos, ela ainda funcione exatamente como no primeiro dia.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Por que papel falha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 02</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Cinco formas de{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>o papel te trair.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AMEACAS_PAPEL.map((a, i) => (
                <motion.div key={a.titulo} {...fade(i * 0.05)} className="p-8 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <a.icon size={28} style={{ color: '#e8a36b' }} className="mb-5" />
                  <h3 className="text-xl font-black mb-3">{a.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.8)' }}>{a.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Aço vs papel */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 03</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Aço não é luxo,{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>é o mínimo.</span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Uma placa de aço inoxidável resiste a incêndios que facilmente ultrapassam 800°C, a enchentes, a corrosão e a décadas de armazenamento sem degradação perceptível. O investimento é de dezenas a poucas centenas de reais, uma fração irrisória perto do valor que ela protege.
                </p>
                <p>
                  Comparar aço com papel não é sobre qual é mais bonito ou mais barato. É sobre qual sobrevive ao pior cenário plausível, porque backup de seed phrase só é testado de verdade no dia em que algo já deu errado.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)}>
              <img
                src={gravacaoImg}
                alt="Mãos gravando manualmente palavras de uma seed phrase em placa de aço inoxidável com punção, macro fotografia escura"
                width={1200}
                height={896}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
          <div className="max-w-[1600px] mx-auto mt-16 overflow-x-auto">
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr>
                  <th className="text-left p-4 text-sm font-bold uppercase tracking-wider" style={{ color: '#5a6664' }}>Critério</th>
                  <th className="text-center p-4 text-sm font-bold uppercase tracking-wider" style={{ color: '#5a6664' }}>Papel</th>
                  <th className="text-center p-4 text-sm font-bold uppercase tracking-wider" style={{ color: '#5a6664' }}>Aço</th>
                </tr>
              </thead>
              <tbody>
                {ACO_VS_PAPEL.map((r, i) => (
                  <tr key={r.criterio} style={{ backgroundColor: i % 2 === 0 ? '#ece2d3' : 'transparent' }}>
                    <td className="p-4 text-base font-medium" style={{ color: '#0e3b3a' }}>{r.criterio}</td>
                    <td className="p-4 text-center">{r.papel ? <CheckCircle2 size={20} className="inline" style={{ color: '#0e3b3a' }} /> : <XCircle size={20} className="inline" style={{ color: '#b45836' }} />}</td>
                    <td className="p-4 text-center">{r.aco ? <CheckCircle2 size={20} className="inline" style={{ color: '#0e3b3a' }} /> : <XCircle size={20} className="inline" style={{ color: '#b45836' }} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CAPÍTULO 4 — Métodos de gravação */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 04</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Gravação manual, punção{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>ou placas prontas.</span>
              </h2>
            </motion.div>
            <div className="space-y-4">
              {METODOS_GRAVACAO.map((m, i) => (
                <motion.div key={m.titulo} {...fade(i * 0.05)} className="p-7 rounded-2xl flex gap-6" style={{ backgroundColor: '#fff' }}>
                  <span className="text-2xl font-black shrink-0" style={{ color: '#c97a3d', fontFamily: "'Playfair Display', serif" }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-lg font-black mb-2" style={{ color: '#0e3b3a' }}>{m.titulo}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{m.texto}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Esquema 3-2-1 */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 05</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                O esquema 3-2-1 aplicado{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>à sua seed.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed font-light max-w-2xl" style={{ color: '#2d3a37' }}>
                Emprestado da prática de backup de dados corporativos, o esquema 3-2-1 se aplica quase sem adaptação à segurança de seed phrase.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {REGRA_321.map((r, i) => (
                <motion.div key={r.n} {...fade(i * 0.08)} className="p-9 rounded-2xl" style={{ backgroundColor: '#0e3b3a' }}>
                  <span className="text-6xl font-black block mb-5" style={{ color: '#e8a36b', fontFamily: "'Playfair Display', serif" }}>{r.n}</span>
                  <h3 className="text-xl font-black mb-3" style={{ color: '#f4ede4' }}>{r.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.8)' }}>{r.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Divisão geográfica e o erro de dividir de forma criativa */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 06</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8">
                Divisão geográfica sim,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>corte criativo não.</span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                <p>
                  Distribuir cópias completas da seed em locais geográficos diferentes (residência, casa de familiar, cofre de banco) protege contra eventos localizados como incêndio, enchente ou roubo pontual, sem alterar em nada a informação que cada cópia carrega. Cada cópia continua sendo a seed inteira, íntegra, capaz de restaurar a carteira sozinha.
                </p>
                <p>
                  O erro comum, e perigoso, é confundir "distribuir cópias completas" com "cortar a seed em pedaços". São operações matematicamente diferentes com consequências de segurança opostas.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)}>
              <h3 className="text-lg font-black uppercase tracking-wider mb-6" style={{ color: '#e8a36b' }}>Por que dividir de forma criativa reduz segurança</h3>
              <div className="space-y-4">
                {ERROS_DIVISAO.map((e, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                    <AlertTriangle size={20} className="shrink-0 mt-1" style={{ color: '#e8a36b' }} />
                    <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{e}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — SLIP39/Shamir vs multisig */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 07</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Se você quer mesmo dividir,{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>faça com matemática.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {SLIP39_MULTISIG.map((s, i) => (
                <motion.div key={s.titulo} {...fade(i * 0.08)} className="p-9 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                  <Layers size={26} style={{ color: '#c97a3d' }} className="mb-5" />
                  <h3 className="text-xl font-black mb-4" style={{ color: '#0e3b3a' }}>{s.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{s.texto}</p>
                </motion.div>
              ))}
            </div>
            <motion.div {...fade(0.15)} className="mt-10 p-8 rounded-2xl" style={{ backgroundColor: '#0e3b3a' }}>
              <p className="text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.9)' }}>
                Na dúvida entre os dois, o <Link to="/multisig-bitcoin" className="underline font-semibold" style={{ color: '#e8a36b' }}>multisig</Link> costuma ser a escolha mais robusta para quantias relevantes, por não depender de reconstrução matemática de um único segredo e por permitir que cada chave viva num dispositivo e local totalmente independentes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 8 — Passphrase */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 08</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                A passphrase, ou{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>25ª palavra.</span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  A passphrase é uma palavra ou frase adicional, definida por você, que se combina com a seed BIP39 para gerar uma carteira completamente diferente. A mesma seed de 24 palavras, com passphrases diferentes, gera carteiras distintas e independentes, cada uma com seu próprio conjunto de endereços e saldo.
                </p>
                <p>
                  Isso cria uma camada de proteção conhecida como carteira oculta (hidden wallet): quem encontra apenas a seed de 24 palavras, sem a passphrase, acessa no máximo uma carteira vazia ou com saldo residual, enquanto o patrimônio real fica invisível sem o segundo fator.
                </p>
                <p>
                  A regra de guarda é simples e não negociável: a passphrase nunca deve ficar no mesmo local físico que a seed. Memorizá-la é a opção mais segura; se precisar anotá-la, faça isso separado, em outro material, outro cômodo, outra cidade.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)}>
              <img
                src={cofreImg}
                alt="Cofre físico escuro entreaberto representando armazenamento seguro e separado de passphrase e seed phrase de Bitcoin"
                width={1920}
                height={1080}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 9 — Teste de restauração obrigatório */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 09</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Teste de restauração</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Backup não testado{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>é backup fictício.</span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Testar a restauração significa pegar a seed anotada (em papel ou aço), inserir num dispositivo diferente daquele que a gerou, e confirmar que os mesmos endereços e o mesmo saldo aparecem. É o único jeito de confirmar, de forma objetiva, que não houve erro de transcrição, palavra trocada de posição ou letra confundida.
                </p>
                <p>
                  Faça esse teste com um valor pequeno primeiro, antes de mover o grosso do patrimônio para aquela seed. Depois de validado o processo, repita o teste periodicamente, especialmente após qualquer manuseio físico da placa de backup (mudança, limpeza, revisão do cofre).
                </p>
                <p>
                  Erros de transcrição são a causa mais comum e mais evitável de perda definitiva de Bitcoin. Não é falha de criptografia, é falha de processo humano, e o teste de restauração é a única forma de fechar esse buraco antes que ele custe caro.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 10 — Herança e carta de instruções */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 10</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Herança sem expor{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>a seed em vida.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: FileText, titulo: 'Carta de instruções', texto: 'Documento separado da seed, explicando o que é Bitcoin, que ele existe, onde estão fisicamente as cópias (sem revelar palavras) e os passos gerais de acesso. Entregue a um advogado de confiança ou lacrada em cartório.' },
                { icon: Users, titulo: 'Multisig entre herdeiros', texto: 'Um arranjo 2 de 3 ou 3 de 5 distribuindo chaves entre herdeiros e, opcionalmente, um custodiante profissional, evita que uma única pessoa precise guardar sozinha o acesso completo ao patrimônio.' },
                { icon: Fingerprint, titulo: 'Nunca revele a seed em vida', texto: 'O objetivo da carta e do multisig é permitir acesso após um evento definido (morte, incapacidade), sem que ninguém precise conhecer a seed enquanto você está plenamente capaz de administrá-la.' },
              ].map((c) => (
                <motion.div key={c.titulo} {...fade(0.05)} className="p-8 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <c.icon size={26} style={{ color: '#e8a36b' }} className="mb-5" />
                  <h3 className="text-xl font-black mb-3">{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.8)' }}>{c.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 11 — Ataque da chave de 5 dólares */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 11</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                O ataque da{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>chave de 5 dólares.</span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  A referência, que virou clássico na comunidade de segurança, ilustra uma verdade incômoda: é mais barato e mais rápido coagir fisicamente alguém a entregar a seed (com uma chave inglesa de 5 dólares, figurativamente) do que quebrar qualquer criptografia moderna por força bruta.
                </p>
                <p>
                  Isso muda o modelo de ameaça real para a maioria das pessoas. O inimigo mais provável não é um hacker remoto genial, é alguém que sabe, por indiscrição sua, que você guarda Bitcoin, e sabe aproximadamente onde procurar. Falar sobre saldo em redes sociais, comentar em festa de família, deixar hardware wallet visível: tudo isso aumenta o risco físico muito mais do que qualquer vulnerabilidade técnica.
                </p>
                <p>
                  Segurança operacional (discrição, compartimentação de informação, escolha cuidadosa de quem sabe o quê) é parte inseparável do backup de seed phrase, não um adendo opcional.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)} className="p-9 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
              <Scale size={28} style={{ color: '#c97a3d' }} className="mb-5" />
              <h3 className="text-lg font-black mb-4" style={{ color: '#0e3b3a' }}>Regras práticas de discrição</h3>
              <ul className="space-y-4 text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                <li className="flex gap-3"><CheckCircle2 size={18} className="shrink-0 mt-1" style={{ color: '#c97a3d' }} /> Nunca comente saldo, corretora usada ou estratégia com pessoas fora do círculo estritamente necessário.</li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="shrink-0 mt-1" style={{ color: '#c97a3d' }} /> Guarde hardware wallet e placas de backup fora de locais visíveis a visitas ou prestadores de serviço.</li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="shrink-0 mt-1" style={{ color: '#c97a3d' }} /> Considere um duress PIN ou carteira de fachada em dispositivos que suportam esse recurso.</li>
                <li className="flex gap-3"><CheckCircle2 size={18} className="shrink-0 mt-1" style={{ color: '#c97a3d' }} /> Trate segurança física com o mesmo rigor que segurança digital.</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 12 — Checklist final */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 12</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Checklist final{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>de backup.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Gravei a seed em pelo menos uma placa de aço inoxidável, testada contra corrosão.',
                'Tenho no mínimo três cópias físicas completas, sem nenhuma dividida de forma arbitrária.',
                'Pelo menos uma cópia está fisicamente fora da minha residência principal.',
                'Não usei corte manual criativo; se dividi, usei SLIP39 com esquema M de N documentado.',
                'A passphrase, se existir, está guardada separada fisicamente da seed.',
                'Já testei a restauração completa em dispositivo diferente, com valor pequeno primeiro.',
                'Tenho uma carta de instruções para herdeiros, sem revelar a seed em vida.',
                'Nenhuma pessoa fora do círculo essencial sabe que guardo Bitcoin ou onde.',
              ].map((c, i) => (
                <motion.div key={i} {...fade(i * 0.04)} className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <CheckCircle2 size={22} className="shrink-0 mt-0.5" style={{ color: '#e8a36b' }} />
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.9)' }}>{c}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 12.5 — Ambiente de gravação seguro */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo extra</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Ambiente de gravação</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Onde e como gerar e gravar{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>a seed, na prática.</span>
              </h2>
              <div className="space-y-7 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  A seed deve ser gerada sempre dentro do próprio hardware wallet, nunca em um site, aplicativo de celular conectado à internet ou gerador online, por mais confiável que pareça. Qualquer geração fora de um dispositivo air-gap dedicado introduz risco de captura por malware ou de comprometimento da fonte de aleatoriedade.
                </p>
                <p>
                  No momento da gravação em aço, escolha um ambiente sem câmeras próximas, sem assistentes de voz ligados no cômodo e sem outras pessoas presentes além de quem realmente precisa participar do processo. Fotografar a seed, mesmo que "só para conferir depois", é um dos erros mais comuns e mais graves: qualquer foto sincronizada com nuvem se torna uma cópia digital permanente e exposta.
                </p>
                <p>
                  Depois de concluída a gravação, confira palavra por palavra comparando com a tela do dispositivo, de preferência duas vezes, em momentos diferentes. Só então guarde a placa definitivamente e prossiga para o teste de restauração, descrito no capítulo anterior.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 13 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 13</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Perguntas frequentes{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>sobre backup de seed.</span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#ece2d3', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-500" style={{ color: '#c97a3d', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5, ease: APPLE_EASE }} className="px-6 md:px-8 pb-8">
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 14 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Continue sua trilha</span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Backup é a base,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>agora reforce o resto.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { to: '/autocustodia/seed-phrase-em-aco', titulo: 'Seed phrase em aço', texto: 'Comparativo detalhado de placas de aço e métodos de gravação.' },
                { to: '/autocustodia/krux-passphrase-bluewallet', titulo: 'Krux, passphrase e BlueWallet', texto: 'Como configurar a 25ª palavra na prática com dispositivo air-gap.' },
                { to: '/autocustodia/hardware-wallet-diy-bitcoin', titulo: 'Hardware wallet DIY', texto: 'Como montar sua própria carteira de hardware com peças auditáveis.' },
                { to: '/comparativos/melhores-hardware-wallets', titulo: 'Melhores hardware wallets', texto: 'Coldcard, Trezor, Jade e Krux lado a lado, critério por critério.' },
                { to: '/dicionario-cripto', titulo: 'Glossario de soberania', texto: 'Do UTXO ao domicilio fiscal: todos os termos tecnicos deste site explicados em uma pagina.' },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group p-8 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <h3 className="text-lg md:text-xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-sm leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: '#e8a36b' }}>
                    Acessar <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
