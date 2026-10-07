import { useState } from 'react';
import { Plus, Minus, AlertTriangle, Radio, MapPin, Eye, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import imgRadio from '@/assets/comms-radio-amfm.webp';
import imgMapa from '@/assets/comms-mapa-ptbr.jpg';
import imgSinal from '@/assets/comms-sinal-visual.webp';
import imgRecado from '@/assets/comms-recado-ptbr.jpg';
import imgFamilia from '@/assets/comms-plano-familiar.jpg';
import './ComunicacaoOfflinePanels.css';

type ImagePanel = { title: string; description: string; image: string; action?: string };

const layers: ImagePanel[] = [
  { title: 'Informação passiva', description: 'Rádio AM/FM a pilha ou manivela. Você recebe sem depender de rede.', image: imgRadio },
  { title: 'Comunicação familiar', description: 'Pontos de encontro, horários fixos e a regra dos 3 contatos.', image: imgFamilia },
  { title: 'Sinalização local', description: 'Lençóis, luzes e códigos combinados antes da crise.', image: imgSinal },
  { title: 'Ponto de encontro', description: 'Primário, secundário e horário que não depende de mensagem.', image: imgMapa },
  { title: 'Contingência', description: 'Recados escritos e envelopes em local previamente combinado.', image: imgRecado },
];

const errors: ImagePanel[] = [
  { title: 'Confiar apenas em grupo de mensagens', description: 'Quando a rede cai, o grupo deixa de ser um plano.', action: 'Combine horários, locais e um canal independente.', image: imgFamilia },
  { title: 'Não definir ponto de encontro', description: 'Sem um destino combinado, cada pessoa improvisa uma rota.', action: 'Defina ponto primário, secundário e horário fixo.', image: imgMapa },
  { title: 'Deixar rádio sem pilha reserva', description: 'O receptor mais útil não informa nada sem energia.', action: 'Guarde pilhas reservadas junto ao rádio.', image: imgRadio },
  { title: 'Agir com base em boatos', description: 'Uma informação não confirmada pode levar à decisão errada.', action: 'Anote a fonte e confirme antes de agir.', image: imgRecado },
  { title: 'Não treinar antes', description: 'Um protocolo que ninguém praticou vira improviso na crise.', action: 'Ensaie o reencontro e os sinais com sua família.', image: imgSinal },
];

function ImagePanels({ items, danger = false }: { items: ImagePanel[]; danger?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  return <div className={`comms-interactive comms-panel-row ${danger ? 'comms-panel-row--danger' : ''}`} onMouseLeave={() => setActive(null)}>
    {items.map((item, index) => <Button key={item.title} variant="ghost" className="comms-image-panel" data-active={active === index} aria-expanded={active === index} aria-label={item.title}
      onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} onClick={() => setActive(index)}>
      <img src={item.image} alt="" loading="lazy" decoding="async" width={768} height={768} />
      <span className="comms-panel-copy">
        <span className="comms-panel-index"><span>{String(index + 1).padStart(2, '0')}</span>{active === index ? <Minus aria-hidden size={16} /> : <Plus aria-hidden size={16} />}</span>
        <span className="comms-panel-title">{item.title}</span>
        <span className="comms-panel-detail"><span><span className="block mt-3 text-sm leading-relaxed font-normal">{item.description}</span>{item.action && <strong>{item.action}</strong>}</span></span>
      </span>
    </Button>)}
  </div>;
}

export const Camadas = () => <ImagePanels items={layers} />;
export const ErrosCriticos = () => <ImagePanels items={errors} danger />;

export function AberturaComunicacao() {
  return <div className="comms-interactive mb-6 grid gap-6 lg:grid-cols-2">
    <article className="comms-opening" aria-label="Diagnóstico">
      <div className="comms-opening-photo"><img src={imgRadio} alt="Rádio portátil para receber informação sem internet" loading="lazy" /></div>
      <div className="comms-opening-body">
        <p className="font-mono text-xs uppercase">Diagnóstico</p>
        <p className="comms-opening-title mt-4">Comunicação em crise não é conversa. É sobrevivência estratégica.</p>
        <p className="mt-6 text-sm uppercase">Sem comunicação:</p>
        <div className="comms-opening-list">{[
          [Users, 'Não há coordenação'], [MapPin, 'Não há reencontro'], [Radio, 'Não há decisão informada'], [Eye, 'Não há prevenção de risco'],
        ].map(([Icon, text]) => { const ItemIcon = Icon as typeof Users; return <div key={String(text)}><ItemIcon size={18} /><span>{String(text)}</span></div>; })}</div>
      </div>
    </article>
    <article className="comms-opening comms-opening--safe" aria-label="Fundamento Operacional">
      <div className="comms-opening-photo"><img src={imgFamilia} alt="Família preparando mapa, rádio e lanterna para um plano de emergência" loading="lazy" width={1200} height={800} /></div>
      <div className="comms-opening-body">
        <p className="font-mono text-xs uppercase">Fundamento Operacional</p>
        <p className="mt-4 text-lg">Após desastres históricos:</p>
        <div className="comms-opening-list">{['Redes móveis saturam nas primeiras 2 horas', 'Energia elétrica falha', 'Dados móveis tornam-se instáveis', 'Informações falsas se espalham rapidamente'].map(item => <div key={item}><AlertTriangle size={18} /><span>{item}</span></div>)}</div>
        <p className="comms-opening-footer"><FileText className="inline mr-2" size={18} />O sistema precisa ser independente de internet e rede celular.</p>
      </div>
    </article>
  </div>;
}