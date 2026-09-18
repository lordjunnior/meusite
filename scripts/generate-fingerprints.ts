// Motor 03, etapa determinística: gera a impressão digital de cada página real do site.
// Não usa IA. Percorre as rotas de src/App.tsx, abre o arquivo de página correspondente,
// extrai títulos, contagem de palavras e cruza com searchData, seoData e sidebarNavigation.
// Saída: src/data/pageFingerprints.json, consumido pelo painel de Inteligência da Biblioteca.
// Roda no hook prebuild.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

interface PageFingerprint {
  path: string;
  file: string;
  title: string;
  silo: string;
  navLabel?: string;
  wordCount: number;
  headings: string[];
  primaryKeyword?: string;
  lsi: string[];
  tags: string[];
  description?: string;
  terms: string[];
}

const app = readFileSync(resolve("src/App.tsx"), "utf-8");

// 1. componente -> arquivo
const fileByComponent = new Map<string, string>();
for (const m of app.matchAll(/const\s+([A-Za-z0-9_]+)\s*=\s*lazy\(\(\)\s*=>\s*import\("\.\/(pages\/[^"]+)"\)\)/g)) {
  fileByComponent.set(m[1], `src/${m[2]}.tsx`);
}
for (const m of app.matchAll(/^import\s+([A-Za-z0-9_]+)\s+from\s+"\.\/(pages\/[^"]+)";/gm)) {
  fileByComponent.set(m[1], `src/${m[2]}.tsx`);
}

// 2. rota -> componente
const excludedComponents = new Set(["LegacyRedirect", "Navigate", "NotFound"]);
const routes: { path: string; component: string }[] = [];
for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<([A-Za-z0-9_]+)/g)) {
  const [, path, component] = m;
  if (excludedComponents.has(component)) continue;
  if (path.includes(":") || path.includes("*")) continue;
  routes.push({ path, component });
}

// 3. dados auxiliares
const searchSrc = readFileSync(resolve("src/lib/searchData.ts"), "utf-8");
const seoSrc = readFileSync(resolve("src/lib/seoData.ts"), "utf-8");
const navSrc = readFileSync(resolve("src/lib/sidebarNavigation.ts"), "utf-8");

const searchByPath = new Map<string, { title: string; description: string; tags: string[]; category: string }>();
for (const m of searchSrc.matchAll(/\{\s*title:\s*"([^"]*)",\s*description:\s*"([^"]*)",\s*path:\s*"([^"]*)",\s*tags:\s*\[([^\]]*)\],\s*category:\s*"([^"]*)"/g)) {
  const [, title, description, path, tagsRaw, category] = m;
  const tags = [...tagsRaw.matchAll(/"([^"]*)"/g)].map((t) => t[1]);
  searchByPath.set(path, { title, description, tags, category });
}

// seoData: blocos por rota
const seoByPath = new Map<string, { title: string; description: string; primaryKeyword: string; lsi: string[] }>();
const seoBlockRe = /'([^']+)':\s*\{([\s\S]*?)\n  \},/g;
for (const m of seoSrc.matchAll(seoBlockRe)) {
  const [, path, body] = m;
  const title = body.match(/title:\s*'([^']*)'/)?.[1] ?? "";
  const description = body.match(/description:\s*'([^']*)'/)?.[1] ?? "";
  const primaryKeyword = body.match(/primaryKeyword:\s*'([^']*)'/)?.[1] ?? "";
  const lsiRaw = body.match(/lsiKeywords:\s*\[([^\]]*)\]/)?.[1] ?? "";
  const lsi = [...lsiRaw.matchAll(/'([^']*)'/g)].map((x) => x[1]);
  seoByPath.set(path, { title, description, primaryKeyword, lsi });
}

// sidebar: rota -> { silo, rótulo }
const navByPath = new Map<string, { silo: string; label: string }>();
{
  const groupRe = /\{\s*label:\s*"([^"]+)",\s*icon:[\s\S]*?items:\s*\[([\s\S]*?)\n    \],/g;
  for (const g of navSrc.matchAll(groupRe)) {
    const [, silo, items] = g;
    for (const it of items.matchAll(/label:\s*"([^"]+)",\s*route:\s*"([^"]+)"/g)) {
      navByPath.set(it[2], { silo, label: it[1] });
    }
  }
}

const STOPWORDS = new Set(
  ("a o e de da do das dos em no na nos nas um uma para por com que se ao aos as os sua seu suas seus " +
    "como qual quais mais menos sem sob sobre entre ou nao sim ja foi ser sao esta este isso pelo pela " +
    "the of and to in for you your").split(" "),
);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function extractHeadings(src: string): string[] {
  const out: string[] = [];
  // Texto direto dentro de h1..h3
  for (const m of src.matchAll(/<h[1-3][^>]*>([\s\S]{0,300}?)<\/h[1-3]>/g)) {
    const text = m[1]
      .replace(/\{[^}]*\}/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length > 2) out.push(text);
  }
  // Blocos de dados com title/titulo/pergunta, padrão das páginas editoriais
  for (const m of src.matchAll(/(?:title|titulo|pergunta|question|heading):\s*"([^"]{4,160})"/g)) {
    out.push(m[1]);
  }
  return [...new Set(out)].slice(0, 220);
}

function bodyText(src: string): string {
  const texts: string[] = [];
  for (const m of src.matchAll(/>([^<>{}]{12,})</g)) texts.push(m[1]);
  for (const m of src.matchAll(/"([^"\\]{25,})"/g)) texts.push(m[1]);
  return texts.join(" ");
}

function countWords(src: string): number {
  return bodyText(src).split(/\s+/).filter(Boolean).length;
}

/** Termos recorrentes do corpo, o que dá recall ao Coverage Engine sem confundir foco com menção. */
function bodyTerms(src: string): string[] {
  const freq = new Map<string, number>();
  for (const w of tokens(bodyText(src))) freq.set(w, (freq.get(w) ?? 0) + 1);
  return [...freq.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 400)
    .map(([w]) => w);
}

const fingerprints: PageFingerprint[] = [];
const missing: string[] = [];

for (const { path, component } of routes) {
  const file = fileByComponent.get(component);
  if (!file || !existsSync(resolve(file))) {
    missing.push(`${path} (${component})`);
    continue;
  }
  const src = readFileSync(resolve(file), "utf-8");
  const search = searchByPath.get(path);
  const seo = seoByPath.get(path);
  const nav = navByPath.get(path);

  const headings = extractHeadings(src);
  const title = seo?.title || search?.title || nav?.label || component;
  const tags = search?.tags ?? [];
  const lsi = seo?.lsi ?? [];
  const description = seo?.description || search?.description;

  const terms = [
    ...new Set([
      ...tokens(title),
      ...tokens(headings.join(" ")),
      ...tokens(tags.join(" ")),
      ...tokens(lsi.join(" ")),
      ...tokens(seo?.primaryKeyword ?? ""),
      ...tokens(description ?? ""),
      ...tokens(path.replace(/[/-]/g, " ")),
      ...bodyTerms(src),
    ]),
  ];

  fingerprints.push({
    path,
    file,
    title,
    silo: nav?.silo || search?.category || "Sem silo",
    navLabel: nav?.label,
    wordCount: countWords(src),
    headings,
    primaryKeyword: seo?.primaryKeyword,
    lsi,
    tags,
    description,
    terms,
  });
}

fingerprints.sort((a, b) => a.path.localeCompare(b.path));

const outDir = resolve("src/data");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(
  resolve("src/data/pageFingerprints.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), pages: fingerprints }, null, 0) + "\n",
);

console.log(`[fingerprints] ${fingerprints.length} páginas indexadas`);
if (missing.length) console.log(`[fingerprints] ${missing.length} rotas sem arquivo resolvido`);
