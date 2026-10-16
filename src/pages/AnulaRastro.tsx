import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ShieldCheck, FileImage, Upload, LockKeyhole, Download, CheckCircle2,
  AlertTriangle, X, ArrowRight, Eye, Smartphone, HardDrive, RefreshCw,
  Info, ScanSearch, CircleHelp, ChevronDown
} from "lucide-react";

type CleanStatus = "ready" | "processing" | "done" | "unsupported" | "error";
type FileItem = {
  id: string;
  file: File;
  status: CleanStatus;
  note?: string;
  outputUrl?: string;
  outputName?: string;
  outputSize?: number;
};

const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ACCEPTED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function extensionOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

function isSupported(file: File) {
  return ACCEPTED_TYPES.has(file.type) || ACCEPTED_EXTENSIONS.has(extensionOf(file.name));
}

function safeOutputName(name: string, type: string) {
  const stem = name.replace(/\.[^.]+$/, "").replace(/[^\p{L}\p{N}._-]+/gu, "-").slice(0, 100) || "imagem";
  const ext = type === "image/jpeg" ? "jpg" : type === "image/png" ? "png" : "webp";
  return `${stem}-sem-metadados.${ext}`;
}

async function reconstructImage(file: File): Promise<{ blob: Blob; type: string }> {
  const sourceUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = sourceUrl;
    await image.decode();
    if (!image.naturalWidth || !image.naturalHeight) throw new Error("Não foi possível ler os pixels desta imagem.");
    if (image.naturalWidth * image.naturalHeight > 80_000_000) {
      throw new Error("Imagem muito grande para processamento seguro neste navegador (limite de 80 megapixels).");
    }

    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d", { alpha: file.type !== "image/jpeg" });
    if (!context) throw new Error("O navegador não disponibilizou o processamento gráfico.");
    if (file.type === "image/jpeg") {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(image, 0, 0);

    const outputType = ACCEPTED_TYPES.has(file.type) ? file.type : "image/png";
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => result ? resolve(result) : reject(new Error("Falha ao reconstruir a imagem.")), outputType, 0.94);
    });
    return { blob, type: blob.type || outputType };
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

export default function AnulaRastro() {
  const [items, setItems] = useState<FileItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [processingAll, setProcessingAll] = useState(false);
  const [showFaq, setShowFaq] = useState<number | null>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<FileItem[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => () => {
    itemsRef.current.forEach((item) => item.outputUrl && URL.revokeObjectURL(item.outputUrl));
  }, []);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const next = Array.from(incoming).map((file): FileItem => {
      const base = { id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`, file, status: "ready" };
      if (file.size > MAX_FILE_BYTES) return { ...base, status: "unsupported", note: "Limite de 20 MB por arquivo." };
      if (!isSupported(file)) return { ...base, status: "unsupported", note: "Formato ainda não processado nesta versão. Nenhum dado foi alterado." };
      return base;
    });
    setItems((current) => [...current, ...next].slice(0, 30));
  }, []);

  const processItem = useCallback(async (id: string) => {
    const item = itemsRef.current.find((entry) => entry.id === id);
    if (!item || !isSupported(item.file) || item.file.size > MAX_FILE_BYTES) return;
    setItems((current) => current.map((entry) => entry.id === id ? { ...entry, status: "processing", note: undefined } : entry));
    try {
      const { blob, type } = await reconstructImage(item.file);
      const outputUrl = URL.createObjectURL(blob);
      const outputName = safeOutputName(item.file.name, type);
      setItems((current) => current.map((entry) => {
        if (entry.id !== id) return entry;
        if (entry.outputUrl) URL.revokeObjectURL(entry.outputUrl);
        return { ...entry, status: "done", outputUrl, outputName, outputSize: blob.size, note: "Imagem reconstruída no navegador. O arquivo original não foi alterado." };
      }));
    } catch (error) {
      setItems((current) => current.map((entry) => entry.id === id ? {
        ...entry, status: "error", note: error instanceof Error ? error.message : "Não foi possível processar este arquivo."
      } : entry));
    }
  }, []);

  const processAll = async () => {
    setProcessingAll(true);
    const pending = itemsRef.current.filter((item) => item.status === "ready");
    for (const item of pending) await processItem(item.id);
    setProcessingAll(false);
  };

  const removeItem = (id: string) => {
    const item = itemsRef.current.find((entry) => entry.id === id);
    if (item?.outputUrl) URL.revokeObjectURL(item.outputUrl);
    setItems((current) => current.filter((entry) => entry.id !== id));
  };

  const clearAll = () => {
    itemsRef.current.forEach((item) => item.outputUrl && URL.revokeObjectURL(item.outputUrl));
    setItems([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const readyCount = items.filter((item) => item.status === "ready").length;
  const doneCount = items.filter((item) => item.status === "done").length;

  return (
    <main className="ar-page">
      <Helmet>
        <title>Anula-Rastro: Remova Metadados de Imagens no Próprio Dispositivo</title>
        <meta name="description" content="Reconstrua imagens JPG, PNG e WebP no navegador para reduzir metadados ocultos antes de publicar. Processamento local, sem envio de arquivos para um servidor." />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href="https://lordjunnior.com.br/anula-rastro" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Anula-Rastro | Higienização local de imagens" />
        <meta property="og:description" content="Prepare imagens para publicação sem enviar seus arquivos para um serviço de limpeza online." />
        <meta property="og:url" content="https://lordjunnior.com.br/anula-rastro" />
        <meta name="theme-color" content="#0f2e2b" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Anula-Rastro",
          url: "https://lordjunnior.com.br/anula-rastro",
          applicationCategory: "SecurityApplication",
          operatingSystem: "Any modern browser",
          inLanguage: "pt-BR",
          description: "Ferramenta de reconstrução local de imagens para reduzir metadados incorporados antes do compartilhamento.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
          featureList: ["Processamento local no navegador", "JPG, PNG e WebP", "O arquivo original permanece intacto"]
        })}</script>
      </Helmet>

      <div className="ar-topline"><span className="ar-brand-mark"><ShieldCheck size={18} /></span><span>ANULA<span className="ar-brand-accent">-RASTRO</span></span><span className="ar-topline-tag">PRIVACIDADE DE ARQUIVOS</span></div>

      <section className="ar-hero">
        <div className="ar-hero-copy">
          <div className="ar-eyebrow"><span className="ar-pulse" /> HIGIENIZAÇÃO LOCAL DE IMAGENS</div>
          <h1>Compartilhe a imagem.<br /><span>Não o rastro escondido nela.</span></h1>
          <p className="ar-lead">Fotos podem carregar informações que você nunca pretendeu publicar. Reconstrua imagens no próprio navegador antes de enviá-las para redes sociais, marketplaces ou grupos.</p>
          <div className="ar-trust-row">
            <span><LockKeyhole size={16} /> Arquivos não enviados</span>
            <span><HardDrive size={16} /> Processamento local</span>
            <span><ShieldCheck size={16} /> Original preservado</span>
          </div>
          <a className="ar-text-link" href="#limpar-arquivos">Limpar minhas imagens <ArrowRight size={16} /></a>
        </div>
        <div className="ar-hero-visual" aria-label="Ilustração de um arquivo sendo inspecionado e limpo">
          <div className="ar-orbit ar-orbit-one" /><div className="ar-orbit ar-orbit-two" />
          <div className="ar-file-card">
            <div className="ar-file-card-top"><FileImage size={18} /><span>IMAGEM.JPG</span><span className="ar-file-dot" /></div>
            <div className="ar-image-preview"><div className="ar-sun" /><div className="ar-hill ar-hill-back" /><div className="ar-hill ar-hill-front" /></div>
            <div className="ar-meta-row"><span>GPS / EXIF / XMP</span><span className="ar-meta-pill">POSSÍVEIS DADOS</span></div>
            <div className="ar-scan-line" />
          </div>
          <div className="ar-clean-stamp"><ShieldCheck size={20} /><span>RECONSTRUÇÃO<br /><strong>LOCAL</strong></span></div>
          <div className="ar-visual-caption">MENOS DADOS OCULTOS. MAIS CONTROLE.</div>
        </div>
      </section>

      <section className="ar-workspace" id="limpar-arquivos">
        <div className="ar-section-heading">
          <div><div className="ar-eyebrow">01 / ÁREA DE PROCESSAMENTO</div><h2>Prepare seus arquivos</h2><p>Selecione imagens e gere cópias reconstruídas sem alterar os originais.</p></div>
          <div className="ar-local-badge"><LockKeyhole size={15} /> Executado neste dispositivo</div>
        </div>
        <div
          className={`ar-dropzone ${dragging ? "is-dragging" : ""}`}
          onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => { event.preventDefault(); setDragging(false); if (event.dataTransfer.files) addFiles(event.dataTransfer.files); }}
        >
          <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" multiple hidden onChange={(event) => { if (event.target.files) addFiles(event.target.files); event.target.value = ""; }} />
          <div className="ar-upload-icon"><Upload size={25} /></div>
          <h3>Arraste suas imagens para cá</h3>
          <p>ou selecione arquivos diretamente do seu dispositivo</p>
          <button className="ar-primary-button" type="button" onClick={() => inputRef.current?.click()}><FileImage size={17} /> Selecionar imagens</button>
          <div className="ar-format-note">JPG, PNG ou WebP · até 20 MB por arquivo · máximo de 30 arquivos</div>
        </div>

        {items.length > 0 && <div className="ar-file-list">
          <div className="ar-list-heading"><div><strong>Arquivos selecionados</strong><span>{items.length} de 30 · {doneCount} processado(s)</span></div><button type="button" className="ar-quiet-button" onClick={clearAll}>Limpar lista</button></div>
          {items.map((item) => (
            <article className="ar-file-item" key={item.id}>
              <div className="ar-file-icon"><FileImage size={21} /></div>
              <div className="ar-file-info"><strong title={item.file.name}>{item.file.name}</strong><span>{formatBytes(item.file.size)}{item.outputSize ? ` → ${formatBytes(item.outputSize)}` : ""}</span>{item.note && <small className={item.status === "error" || item.status === "unsupported" ? "ar-note-warning" : "ar-note-success"}>{item.note}</small>}</div>
              <div className="ar-file-actions">
                {item.status === "ready" && <button type="button" className="ar-small-button" onClick={() => processItem(item.id)}>Reconstruir</button>}
                {item.status === "processing" && <span className="ar-status"><RefreshCw className="ar-spin" size={16} /> Processando</span>}
                {item.status === "done" && item.outputUrl && <a className="ar-download-button" href={item.outputUrl} download={item.outputName}><Download size={15} /> Baixar</a>}
                {item.status === "unsupported" && <span className="ar-status ar-status-warning"><AlertTriangle size={15} /> Não suportado</span>}
                {item.status === "error" && <button type="button" className="ar-small-button" onClick={() => processItem(item.id)}>Tentar novamente</button>}
                {item.status === "done" && <span className="ar-status ar-status-success"><CheckCircle2 size={15} /> Pronto</span>}
                <button type="button" className="ar-remove-button" aria-label={`Remover ${item.file.name}`} onClick={() => removeItem(item.id)}><X size={16} /></button>
              </div>
            </article>
          ))}
          <div className="ar-list-footer"><span><Info size={16} /> Os arquivos permanecem no seu dispositivo.</span><button className="ar-primary-button" type="button" onClick={processAll} disabled={processingAll || readyCount === 0}>{processingAll ? "Processando..." : `Reconstruir pendentes (${readyCount})`} <ArrowRight size={16} /></button></div>
        </div>}

        <div className="ar-honesty-note"><ShieldCheck size={20} /><p><strong>Transparência técnica:</strong> esta versão reconstrói imagens raster compatíveis no navegador. Ela não é uma solução universal de sanitização e não processa documentos, PDFs, áudio, vídeo ou arquivos compactados. Não use o resultado como garantia de anonimato.</p></div>
      </section>

      <section className="ar-how">
        <div className="ar-eyebrow">02 / COMO FUNCIONA</div><h2>Uma nova cópia, criada a partir dos pixels</h2><p className="ar-section-intro">Em vez de apenas procurar campos conhecidos para apagar, o navegador decodifica a imagem e cria outra a partir do conteúdo visual.</p>
        <div className="ar-steps">
          <div className="ar-step"><span className="ar-step-num">01</span><div className="ar-step-icon"><Upload size={22} /></div><h3>Selecione</h3><p>Escolha imagens no computador ou celular. O arquivo original não é sobrescrito.</p></div>
          <div className="ar-step"><span className="ar-step-num">02</span><div className="ar-step-icon"><ScanSearch size={22} /></div><h3>Reconstrua</h3><p>O navegador renderiza os pixels em uma nova imagem, sem copiar os metadados originais de forma intencional.</p></div>
          <div className="ar-step"><span className="ar-step-num">03</span><div className="ar-step-icon"><Download size={22} /></div><h3>Baixe e confira</h3><p>Salve a cópia e revise o arquivo antes de compartilhar. O conteúdo visual pode sofrer pequenas alterações.</p></div>
        </div>
      </section>

      <section className="ar-boundaries">
        <div className="ar-boundaries-copy"><div className="ar-eyebrow">03 / LIMITES E SEGURANÇA</div><h2>Privacidade real começa com expectativas corretas.</h2><p>A reconstrução pode reduzir metadados incorporados, mas não apaga informações visíveis na própria imagem, como placas, rostos, telas, documentos ou reflexos.</p><p>O resultado também pode continuar identificável por contexto, padrões visuais ou cópias publicadas em outros lugares.</p></div>
        <div className="ar-checklist">
          <div><CheckCircle2 size={19} /><span><strong>O que esta versão faz</strong><small>Reconstrói JPG, PNG e WebP compatíveis no navegador.</small></span></div>
          <div><CheckCircle2 size={19} /><span><strong>O que ela não faz</strong><small>Não desfoca rostos, não remove objetos e não oculta dados visíveis.</small></span></div>
          <div><AlertTriangle size={19} /><span><strong>O que você deve verificar</strong><small>Confira o conteúdo visual, a qualidade e o arquivo final antes de publicar.</small></span></div>
          <div><LockKeyhole size={19} /><span><strong>Onde ocorre o processamento</strong><small>Na sessão do navegador; não há upload intencional para um servidor nesta ferramenta.</small></span></div>
        </div>
      </section>

      <section className="ar-faq">
        <div className="ar-eyebrow">04 / DÚVIDAS FREQUENTES</div><h2>Antes de compartilhar</h2>
        {[
          ["O Anula-Rastro envia minhas fotos para algum servidor?", "O processamento desta página acontece no navegador. A ferramenta não envia intencionalmente o conteúdo dos arquivos para um servidor. Ainda assim, o navegador, extensões, sistema operacional ou ferramentas de monitoramento instaladas no dispositivo estão fora do controle desta página."],
          ["A reconstrução remove todos os metadados?", "A reconstrução por canvas não copia intencionalmente os metadados do arquivo original, mas não é uma prova formal de ausência de todo e qualquer dado. Formatos, navegadores e pipelines podem variar. Para casos sensíveis, valide a saída com uma ferramenta independente."],
          ["Quais formatos são aceitos?", "Nesta versão: JPEG/JPG, PNG e WebP, até 20 MB por arquivo. PDF, Office, HEIC, AVIF, GIF, SVG, áudio, vídeo, arquivos compactados e torrents ainda não são processados."],
          ["A imagem vai perder qualidade?", "Pode haver alteração. JPEG e WebP podem ser recomprimidos e a renderização pode mudar detalhes de cor ou perfil. Compare o resultado com o original antes de usar, especialmente em documentos ou imagens que exijam fidelidade."],
          ["Isso me torna anônimo?", "Não. Metadados são apenas uma parte do risco. O próprio conteúdo visual, nomes de arquivo, contexto da publicação, contas utilizadas e cópias anteriores também podem revelar informações."],
        ].map(([question, answer], index) => (
          <div className="ar-faq-item" key={question}>
            <button type="button" aria-expanded={showFaq === index} onClick={() => setShowFaq(showFaq === index ? null : index)}><span><CircleHelp size={18} />{question}</span><ChevronDown size={18} className={showFaq === index ? "ar-chevron-open" : ""} /></button>
            {showFaq === index && <p>{answer}</p>}
          </div>
        ))}
      </section>

      <section className="ar-final-cta"><div className="ar-final-icon"><Smartphone size={24} /></div><div><h2>Seu próximo compartilhamento começa aqui.</h2><p>Selecione uma imagem e gere uma cópia reconstruída no seu dispositivo.</p></div><a href="#limpar-arquivos" className="ar-primary-button">Começar agora <ArrowRight size={16} /></a></section>
      <footer className="ar-footer"><span>ANULA-RASTRO</span><span>Privacidade é processo, não promessa.</span><a href="https://lordjunnior.com.br/privacidade">Política de privacidade</a></footer>

      <style>{`
        .ar-page{--ar-ink:#16312e;--ar-muted:#61716e;--ar-teal:#0f2e2b;--ar-teal-2:#194943;--ar-gold:#c4a45b;--ar-paper:#f6f7f2;--ar-line:#dce3dc;--ar-white:#fff;min-height:100vh;background:var(--ar-paper);color:var(--ar-ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.55}
        .ar-page *{box-sizing:border-box}.ar-topline{height:72px;padding:0 clamp(20px,6vw,88px);display:flex;align-items:center;gap:10px;border-bottom:1px solid #dfe5de;background:#fbfcf8;font-weight:850;font-size:14px;letter-spacing:.11em}.ar-brand-mark{width:32px;height:32px;display:grid;place-items:center;background:var(--ar-teal);color:#fff;border-radius:9px}.ar-brand-accent{color:#a88942}.ar-topline-tag{margin-left:auto;color:#75837c;font-size:10px;letter-spacing:.15em;font-weight:700}
        .ar-hero{max-width:1240px;margin:auto;padding:78px clamp(22px,6vw,84px) 84px;display:grid;grid-template-columns:1.08fr .92fr;gap:50px;align-items:center}.ar-eyebrow{font-size:11px;font-weight:800;letter-spacing:.16em;color:#8c743d;display:flex;align-items:center;gap:10px}.ar-pulse{width:7px;height:7px;border-radius:50%;background:#3f927a;box-shadow:0 0 0 4px #dcece4}.ar-hero h1{font-size:clamp(40px,5.3vw,68px);letter-spacing:-.055em;line-height:1.03;margin:22px 0;color:var(--ar-teal);font-weight:850}.ar-hero h1 span{color:#9b8145}.ar-lead{font-size:17px;line-height:1.75;max-width:620px;color:#596b66;margin:0}.ar-trust-row{display:flex;flex-wrap:wrap;gap:18px;margin:28px 0;color:#31534b;font-size:12px;font-weight:700}.ar-trust-row span{display:flex;align-items:center;gap:7px}.ar-text-link{display:inline-flex;align-items:center;gap:9px;color:var(--ar-teal);font-size:14px;font-weight:800;text-decoration:none;border-bottom:1px solid #bba66c;padding:0 0 7px}.ar-hero-visual{height:380px;position:relative;display:grid;place-items:center;isolation:isolate}.ar-hero-visual:before{content:"";position:absolute;width:310px;height:310px;border-radius:50%;background:#e4ece2;z-index:-2}.ar-orbit{position:absolute;border:1px solid #c4d4c9;border-radius:50%;transform:rotate(-24deg)}.ar-orbit-one{width:390px;height:210px}.ar-orbit-two{width:340px;height:275px;transform:rotate(32deg)}.ar-file-card{width:min(310px,76%);padding:15px;background:#fff;border:1px solid #dce5dd;border-radius:15px;box-shadow:0 24px 60px #16312e1c;position:relative;overflow:hidden}.ar-file-card-top{display:flex;align-items:center;gap:9px;font-size:10px;font-weight:800;letter-spacing:.09em;color:#516760}.ar-file-dot{width:7px;height:7px;background:#d6b765;border-radius:50%;margin-left:auto}.ar-image-preview{height:170px;margin:14px 0 12px;overflow:hidden;position:relative;background:linear-gradient(#d9e7df,#f4e7c5 70%,#b7c7a8 71%)}.ar-sun{position:absolute;width:34px;height:34px;background:#e6c879;border-radius:50%;top:28px;right:44px}.ar-hill{position:absolute;left:-10%;width:120%;border-radius:50% 50% 0 0}.ar-hill-back{height:100px;bottom:-24px;background:#9ab7a2;transform:rotate(-7deg)}.ar-hill-front{height:80px;bottom:-35px;background:#648b78;transform:rotate(9deg)}.ar-meta-row{display:flex;justify-content:space-between;align-items:center;font-size:8px;letter-spacing:.08em;color:#6d7e76;font-weight:800}.ar-meta-pill{background:#f4eddb;color:#8e7339;padding:5px 7px;border-radius:5px}.ar-scan-line{position:absolute;left:0;right:0;top:38%;height:1px;background:#d3b86e;box-shadow:0 0 12px 2px #d3b86e88}.ar-clean-stamp{position:absolute;right:0;bottom:43px;display:flex;align-items:center;gap:9px;padding:12px 15px;background:var(--ar-teal);color:#fff;border:1px solid #3f6559;border-radius:10px;box-shadow:0 10px 25px #16312e25;font-size:9px;letter-spacing:.1em}.ar-clean-stamp svg{color:#d6bd7c}.ar-visual-caption{position:absolute;bottom:4px;left:0;right:0;text-align:center;color:#7b8b82;font-size:9px;letter-spacing:.2em;font-weight:800}
        .ar-workspace{background:#fff;border-top:1px solid #e2e7df;border-bottom:1px solid #e2e7df;padding:72px clamp(22px,6vw,84px);}.ar-section-heading{max-width:1070px;margin:0 auto 26px;display:flex;justify-content:space-between;align-items:end;gap:20px}.ar-section-heading h2,.ar-how h2,.ar-faq h2{font-size:clamp(30px,3.5vw,43px);line-height:1.12;letter-spacing:-.04em;color:var(--ar-teal);margin:12px 0 9px;font-weight:830}.ar-section-heading p,.ar-section-intro{margin:0;color:var(--ar-muted);font-size:14px}.ar-local-badge{display:flex;align-items:center;gap:8px;border:1px solid #d9e4d9;border-radius:30px;padding:9px 13px;color:#35675a;font-size:11px;font-weight:750;white-space:nowrap;background:#f8fbf7}.ar-dropzone{max-width:1070px;margin:auto;border:1.5px dashed #b7c9bd;border-radius:18px;min-height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px 18px;background:linear-gradient(135deg,#fbfcf8,#f4f8f1);transition:border-color .2s,background .2s}.ar-dropzone.is-dragging{border-color:#397d67;background:#edf7ef}.ar-upload-icon{width:54px;height:54px;display:grid;place-items:center;border-radius:16px;background:#e1eee4;color:#2d6757;margin-bottom:12px}.ar-dropzone h3{font-size:19px;letter-spacing:-.02em;margin:0 0 4px;color:var(--ar-teal)}.ar-dropzone p{font-size:13px;color:var(--ar-muted);margin:0 0 18px}.ar-primary-button{display:inline-flex;align-items:center;justify-content:center;gap:9px;border:0;border-radius:9px;background:var(--ar-teal);color:#fff;padding:13px 18px;font-size:12px;font-weight:800;text-decoration:none;cursor:pointer;transition:transform .18s,background .18s}.ar-primary-button:hover{background:#1d4b43;transform:translateY(-1px)}.ar-primary-button:disabled{opacity:.45;cursor:not-allowed;transform:none}.ar-format-note{font-size:10px;color:#7b8981;margin-top:13px}
        .ar-file-list{max-width:1070px;margin:24px auto 0;border:1px solid var(--ar-line);border-radius:14px;overflow:hidden}.ar-list-heading,.ar-list-footer{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:16px 19px;background:#f8faf6}.ar-list-heading{border-bottom:1px solid var(--ar-line)}.ar-list-heading>div{display:flex;flex-direction:column;gap:2px}.ar-list-heading strong{font-size:13px}.ar-list-heading span{font-size:11px;color:var(--ar-muted)}.ar-quiet-button{background:none;border:0;color:#687971;font-size:11px;text-decoration:underline;cursor:pointer}.ar-file-item{display:flex;align-items:center;gap:13px;padding:15px 18px;border-bottom:1px solid #edf0eb;min-width:0}.ar-file-icon{width:42px;height:42px;border-radius:10px;background:#edf3eb;display:grid;place-items:center;color:#39695a;flex-shrink:0}.ar-file-info{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}.ar-file-info strong{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ar-file-info>span{font-size:10px;color:#74817a}.ar-file-info small{font-size:10px;line-height:1.4}.ar-note-warning{color:#a65d2e}.ar-note-success{color:#36725d}.ar-file-actions{display:flex;align-items:center;gap:10px;flex-shrink:0}.ar-small-button,.ar-download-button{display:inline-flex;align-items:center;gap:6px;padding:8px 10px;border-radius:7px;border:1px solid #cbd9cd;background:#fff;color:#245447;font-size:10px;font-weight:800;cursor:pointer;text-decoration:none}.ar-status{display:inline-flex;align-items:center;gap:5px;color:#6c7c74;font-size:10px}.ar-status-success{color:#2c795b}.ar-status-warning{color:#a15d2d}.ar-remove-button{width:30px;height:30px;display:grid;place-items:center;border:0;background:transparent;color:#8b9890;cursor:pointer;border-radius:6px}.ar-remove-button:hover{background:#f6e9e5;color:#a64e3b}.ar-list-footer{border-top:1px solid var(--ar-line)}.ar-list-footer>span{display:flex;align-items:center;gap:7px;font-size:10px;color:#66776e}.ar-honesty-note{max-width:1070px;margin:18px auto 0;display:flex;gap:12px;align-items:flex-start;background:#f8f3e7;border:1px solid #e8dcc0;border-radius:10px;padding:15px 17px;color:#6e603e}.ar-honesty-note svg{flex-shrink:0;margin-top:2px}.ar-honesty-note p{font-size:11px;line-height:1.7;margin:0}.ar-honesty-note strong{color:#5d4c27}
        .ar-how{max-width:1240px;margin:auto;padding:82px clamp(22px,6vw,84px)}.ar-how h2{max-width:700px}.ar-section-intro{max-width:650px;line-height:1.8}.ar-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:17px;margin-top:35px}.ar-step{position:relative;border:1px solid #dce4da;border-radius:13px;padding:25px 22px;background:#fff;min-height:220px}.ar-step-num{position:absolute;right:18px;top:17px;color:#b2a16e;font-size:11px;font-weight:850;letter-spacing:.12em}.ar-step-icon{width:43px;height:43px;border-radius:11px;background:#e8f0e7;color:#3d6b5b;display:grid;place-items:center;margin-bottom:21px}.ar-step h3{font-size:16px;margin:0 0 8px;color:var(--ar-teal)}.ar-step p{font-size:12px;line-height:1.75;color:var(--ar-muted);margin:0}
        .ar-boundaries{background:var(--ar-teal);color:#fff;padding:76px clamp(22px,6vw,84px);display:grid;grid-template-columns:.9fr 1.1fr;gap:60px;align-items:center}.ar-boundaries .ar-eyebrow{color:#d6bd7c}.ar-boundaries h2{font-size:clamp(30px,3.4vw,42px);line-height:1.12;letter-spacing:-.04em;margin:13px 0 18px;max-width:520px}.ar-boundaries-copy p{font-size:13px;line-height:1.85;color:#c6d5ce;max-width:560px}.ar-checklist{display:grid;gap:0;border:1px solid #47645b;border-radius:13px;overflow:hidden}.ar-checklist>div{display:flex;gap:12px;padding:16px 18px;border-bottom:1px solid #36564d}.ar-checklist>div:last-child{border-bottom:0}.ar-checklist svg{flex-shrink:0;color:#d5bd7c;margin-top:2px}.ar-checklist>div:nth-child(3) svg{color:#efba78}.ar-checklist span{display:flex;flex-direction:column;gap:3px}.ar-checklist strong{font-size:12px}.ar-checklist small{font-size:11px;line-height:1.65;color:#bed0c7}
        .ar-faq{max-width:920px;margin:auto;padding:78px 24px}.ar-faq h2{margin-bottom:26px}.ar-faq-item{border-bottom:1px solid #dce4da}.ar-faq-item button{width:100%;display:flex;align-items:center;justify-content:space-between;gap:18px;text-align:left;border:0;background:transparent;padding:19px 0;color:var(--ar-teal);font-size:13px;font-weight:800;cursor:pointer}.ar-faq-item button span{display:flex;align-items:center;gap:10px}.ar-faq-item button span svg{flex-shrink:0;color:#a58b4c}.ar-faq-item>p{font-size:12px;line-height:1.85;color:#5c6d65;margin:-2px 30px 20px}.ar-faq-item button>svg{transition:transform .2s;flex-shrink:0}.ar-chevron-open{transform:rotate(180deg)}.ar-final-cta{margin:0 auto 70px;max-width:1120px;padding:28px 30px;background:#e9efe5;border:1px solid #d5e0d3;border-radius:15px;display:flex;align-items:center;gap:17px}.ar-final-icon{width:48px;height:48px;display:grid;place-items:center;border-radius:12px;background:#fff;color:#326454;flex-shrink:0}.ar-final-cta>div:nth-child(2){flex:1}.ar-final-cta h2{font-size:17px;letter-spacing:-.02em;margin:0 0 4px;color:var(--ar-teal)}.ar-final-cta p{font-size:12px;color:#607169;margin:0}.ar-footer{border-top:1px solid #dce4da;padding:22px clamp(20px,6vw,84px);display:flex;gap:22px;align-items:center;font-size:10px;color:#728078}.ar-footer span:first-child{font-weight:900;letter-spacing:.12em;color:var(--ar-teal)}.ar-footer span:nth-child(2){flex:1}.ar-footer a{color:#48675b;text-decoration:none}
        .ar-page button:focus-visible,.ar-page a:focus-visible{outline:3px solid #bba15b;outline-offset:3px}.ar-spin{animation:ar-spin 1s linear infinite}@keyframes ar-spin{to{transform:rotate(360deg)}}
        @media(max-width:850px){.ar-hero{grid-template-columns:1fr;gap:28px;padding-top:55px;padding-bottom:50px}.ar-hero-copy{max-width:700px}.ar-hero-visual{height:330px}.ar-section-heading{align-items:flex-start;flex-direction:column}.ar-boundaries{grid-template-columns:1fr;gap:28px}.ar-final-cta{margin-left:20px;margin-right:20px}.ar-topline{height:62px}.ar-steps{gap:12px}.ar-step{padding:20px 16px}}
        @media(max-width:600px){.ar-topline{padding:0 18px}.ar-topline-tag{font-size:8px;letter-spacing:.08em}.ar-hero{padding:45px 21px 40px}.ar-hero h1{font-size:clamp(38px,11vw,52px)}.ar-lead{font-size:15px}.ar-trust-row{gap:10px 15px;font-size:10px}.ar-hero-visual{height:285px}.ar-hero-visual:before{width:245px;height:245px}.ar-orbit-one{width:290px;height:160px}.ar-orbit-two{width:260px;height:210px}.ar-file-card{width:250px}.ar-image-preview{height:140px}.ar-clean-stamp{right:0;bottom:32px;padding:9px 10px;font-size:8px}.ar-workspace{padding:54px 17px}.ar-section-heading h2,.ar-how h2,.ar-faq h2{font-size:32px}.ar-dropzone{min-height:250px;padding:26px 13px}.ar-dropzone h3{font-size:17px}.ar-dropzone p{font-size:12px}.ar-format-note{max-width:250px;line-height:1.7}.ar-list-heading,.ar-list-footer{padding:13px}.ar-file-item{padding:13px 10px;gap:9px;align-items:flex-start;flex-wrap:wrap}.ar-file-icon{width:35px;height:35px}.ar-file-info{width:calc(100% - 50px);flex:auto}.ar-file-actions{width:100%;padding-left:44px;justify-content:flex-start;flex-wrap:wrap}.ar-list-footer{align-items:stretch;flex-direction:column}.ar-list-footer .ar-primary-button{width:100%}.ar-honesty-note{padding:13px}.ar-how{padding:55px 20px}.ar-steps{grid-template-columns:1fr}.ar-step{min-height:0}.ar-boundaries{padding:54px 21px}.ar-faq{padding:55px 20px}.ar-final-cta{margin:0 17px 45px;padding:20px;align-items:flex-start;flex-wrap:wrap}.ar-final-cta>div:nth-child(2){min-width:calc(100% - 70px)}.ar-final-cta .ar-primary-button{width:100%}.ar-footer{padding:20px;flex-wrap:wrap;gap:10px 18px}.ar-footer span:nth-child(2){flex-basis:100%;order:3}.ar-footer a{margin-left:auto}}
        @media(prefers-reduced-motion:reduce){.ar-page *{scroll-behavior:auto!important;animation:none!important;transition:none!important}}
      `}</style>
    </main>
  );
}
